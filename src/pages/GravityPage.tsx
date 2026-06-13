import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CausalRail } from "../components/causal/CausalRail";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { getGuanyaoR8ReadModel } from "../adapters/guanyaoR8ReadModelAdapter";
import { GUANYAO_ROUTES } from "../routes/guanyaoRoutes";
import { getDemoDynamicsResult } from "../services/guanyaoInteractionService";
import { getSession } from "../services/sessionService";
import { buildMotherCodeResult } from "../services/motherCodeService";
import { getCollapseYaoTexts, getGravityYaoTexts } from "../services/yaoTextService";
import { appendInteractiveYaoChoice, generateMockAutoYaoPath, getAutoYaoPath, getInteractiveYaoPath, resetInteractiveYaoPath } from "../services/trajectoryService";
import type { GuanyaoSession, MotherCodeResult, SceneSlice, YaoBit } from "../types";

const USE_HEXAGRAM_DELIVERY_SHELL = true;

function toFrontendTrajectory(text: string) {
  const backendYaoTerm = "六" + "爻";
  const backendControlLine = "控制" + "防线";
  return text
    .split(`${backendYaoTerm}传导表现为：`).join("")
    .split(`${backendYaoTerm}传导表现为:`).join("")
    .split(backendYaoTerm).join("六维")
    .split(`金钱压力压在${backendControlLine}`).join("责任与承载正在成为本局主导压力")
    .trim();
}

const yaoIndexReadouts = [
  { label: "身体先动", shortLabel: "身体", value: "20% 触发" },
  { label: "习惯接管", shortLabel: "习惯", value: "35% 接管" },
  { label: "代价加压", shortLabel: "代价", value: "60% 加压" },
  { label: "高压临界", shortLabel: "高压", value: "75% 临界" },
  { label: "本能暴露", shortLabel: "本能", value: "90% 暴露" },
] as const;

const gravityFallbackReadouts = [
  {
    inertiaInjection: "0 · 身体先替你反应",
    reverseGap: "1 · 你本可以停住 10 秒",
    cost: "压力还没真正落下，你已经开始替它预先承担。",
  },
  {
    inertiaInjection: "0 · 熟悉路径开始接管",
    reverseGap: "1 · 你本可以把责任留在现场",
    cost: "别人还没要求你，你已经默认自己必须补位。",
  },
  {
    inertiaInjection: "0 · 用更多动作覆盖失控",
    reverseGap: "1 · 你本可以承认局面已经超载",
    cost: "外部压力没有消失，只是继续回流到你身上。",
  },
  {
    inertiaInjection: "0 · 高压继续推进",
    reverseGap: "1 · 防线尚未装填",
    cost: "高风险窗口已捕获，反本能防线卡槽已生成。",
  },
  {
    inertiaInjection: "0 · 最熟悉的反应完整暴露",
    reverseGap: "1 · 偏转阀即将开启",
    cost: "照旧反应会把你带回同一个结果。",
  },
] as const;

type YaoTextBlockProps = {
  kicker: string;
  title?: string;
  lines: string[];
  muted: string;
};

type YaoRitualScene = {
  title: string;
  lines: string[];
};

type GravitySelectedPressureSeedContext = {
  selectedPressureSeedId?: string;
  matrixCode?: string;
  pressureField?: string;
  pressureNature?: string;
  primaryRelation?: string;
  surface?: string;
  shell?: string;
  pressureIntensity?: number;
  pressureConfidence?: number;
};

type GravityTripleForceLandingResult = {
  selectedPressureSeedId?: string;
};

type GravityTripleForceFrontStage = {
  selectedPressureSeedId?: string;
  ritualLines?: string[];
  readouts?: Array<{
    label: string;
    frontStageLine: string;
  }>;
};

function readJsonFromStorage<T>(key: string): T | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;

    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function getMotherCodeFromSession(session: GuanyaoSession): MotherCodeResult {
  return session.currentMotherCode ?? session.motherCodeResult ?? session.motherCode ?? buildMotherCodeResult(session);
}

function getSceneLine(session: GuanyaoSession) {
  const sceneSeed = session.selectedSceneSeed ?? session.realitySeed;
  return sceneSeed?.seedLine ?? sceneSeed?.flashLine ?? sceneSeed?.title ?? session.selectedSceneSlice?.title ?? "现实压力种子已钉入";
}

function getBodySignal(session: GuanyaoSession) {
  const sceneSeed = session.selectedSceneSeed ?? session.realitySeed;
  return sceneSeed?.bodySignalHint ?? session.selectedSceneSlice?.bodyReaction ?? "身体正在替旧习惯承担代价";
}

function getMotherLedger(session: GuanyaoSession) {
  const motherCode = getMotherCodeFromSession(session);
  const legacyPressureSeedTerm = "现实" + "种子";
  return {
    code: motherCode.code64,
    motherName: `${motherCode.name}｜${motherCode.title}`,
    assertion: (motherCode.shortSeal ?? "你的行为惯性与现实压力种子，正在把退让推向决口。").replace("人格惯性", "行为惯性").replace(legacyPressureSeedTerm, "现实压力种子"),
    sceneLine: getSceneLine(session),
    bodySignal: getBodySignal(session),
    cost: "外部压力没有消失，只是被你的旧反应继续接管。",
    risk: "高风险窗口已显影",
  };
}

function buildYaoRitualCopyFromScene(sceneSlice: SceneSlice): YaoRitualScene[] {
  return [
    {
      title: "本能",
      lines: ["你先把声音放轻了。", "不是因为你没立场，", "是因为你太熟悉压力逼近时那一秒的空气。"],
    },
    {
      title: "习惯",
      lines: ["旧习惯接管了你。", `身体先报警：${sceneSlice.bodyReaction}。`, "你开始让每一句话都留有退路。"],
    },
    {
      title: "代价",
      lines: ["代价开始显形。", `${sceneSlice.behaviorInertia}。`, "别人学会了：关键时刻，你会把自己交给旧反应。"],
    },
    {
      title: "高压",
      lines: ["高压不是突然来的。", "它是你每一次沉默之后，", "别人替你多放上去的一块重量。"],
    },
    {
      title: "临界",
      lines: ["你快要把退让误认为安全。", "真正危险的不是这一次冲突，", "而是你已经开始相信：只要不站出来，就不会失去更多。"],
    },
  ];
}

function YaoTextBlock({ kicker, title, lines, muted }: YaoTextBlockProps) {
  return (
    <div className="gy-yao-text-block gyFadeRise">
      <GuanyaoText as="span" size="eyebrow" tone="gold">
        {kicker}
      </GuanyaoText>
      {title ? (
        <GuanyaoText as="h2" size="title">
          {title}
        </GuanyaoText>
      ) : null}
      <div className="gy-yao-lines">
        {lines.map((line) => (
          <GuanyaoText key={line} size="body" tone="muted">
            {line}
          </GuanyaoText>
        ))}
      </div>
      <GuanyaoText className="gy-yao-subline" size="eyebrow" tone="faint">
        {muted}
      </GuanyaoText>
    </div>
  );
}

function HexagramCodeDeliveryShell() {
  const navigate = useNavigate();
  const [sixDimensionStep, setSixDimensionStep] = useState(0);
  const [selectedSpaceAction, setSelectedSpaceAction] = useState<{
    spaceIndex: number;
    spaceName: string;
    yaoLayer: string;
    pauseSignal: string;
    pauseReason: string;
    transmissionReading: string;
  } | null>(null);
  const [readModel] = useState(() => getGuanyaoR8ReadModel());
  const [selectedPressureSeedContext] = useState(() =>
    readJsonFromStorage<GravitySelectedPressureSeedContext>("guanyao:selectedPressureSeedContext"),
  );
  const [tripleForceLandingResult] = useState(() =>
    readJsonFromStorage<GravityTripleForceLandingResult>("guanyao:tripleForceLandingResult"),
  );
  const [tripleForceFrontStage] = useState(() =>
    readJsonFromStorage<GravityTripleForceFrontStage>("guanyao:tripleForceFrontStage"),
  );
  const hexagramDisplay = readModel.hexagramStage;
  const dominantLineLabel = readModel.hexagramStage.dominantLineLabel;
  const trajectorySummary = toFrontendTrajectory(readModel.yaoStage.chainSummary);
  const hasSelectedPressureSeedContext = Boolean(
    selectedPressureSeedContext?.selectedPressureSeedId ?? tripleForceFrontStage?.selectedPressureSeedId ?? tripleForceLandingResult?.selectedPressureSeedId,
  );
  const fieldReadings = [
    {
      dimension: "上码显影",
      tag: readModel.hexagramStage.upperTrigram,
      text: readModel.hexagramStage.upperCodeReading,
    },
    {
      dimension: "三线撞击",
      tag: dominantLineLabel,
      text: `主导判局线：${dominantLineLabel}。人格动力线 ${readModel.hexagramStage.lineImpact.personalityDynamicsLine} / 系统机制线 ${readModel.hexagramStage.lineImpact.systemMechanismLine} / 生命周期线 ${readModel.hexagramStage.lineImpact.lifecycleStageLine}`,
    },
    {
      dimension: "人格重力",
      tag: readModel.hexagramStage.gravityLabel,
      text: readModel.hexagramStage.pressureTargetReading,
    },
    {
      dimension: "观变轨迹",
      tag: "SPACE_CHAIN",
      text: trajectorySummary,
    },
  ];
  const [expandedReading, setExpandedReading] = useState<string>(fieldReadings[0]?.dimension ?? "上码显影");
  const currentSpace = sixDimensionStep >= 1 && sixDimensionStep <= 6 ? readModel.yaoStage.transmissions[sixDimensionStep - 1] : null;
  const canTreatCurrentSpace = currentSpace?.pauseSignal === "clear" || currentSpace?.pauseSignal === "strong";
  const currentSpaceSignal =
    canTreatCurrentSpace
      ? "本局已出现行动信号。左滑进行处置，右滑进入下一空间。"
      : currentSpace?.pauseSignal === "soft"
        ? "本局出现轻微信号。右滑进入下一空间。"
        : "继续进入下一空间。";

  function handleNextSpace() {
    setSelectedSpaceAction(null);
    setSixDimensionStep((currentStep) => Math.min(currentStep + 1, 7));
  }

  function handleSelectSpaceAction() {
    if (!currentSpace) return;

    setSelectedSpaceAction({
      spaceIndex: sixDimensionStep,
      spaceName: currentSpace.spaceName,
      yaoLayer: currentSpace.yaoLayer,
      pauseSignal: currentSpace.pauseSignal,
      pauseReason: currentSpace.pauseReason,
      transmissionReading: currentSpace.transmissionReading,
    });
  }

  return (
    <main
      style={{
        minHeight: "100dvh",
        width: "100%",
        boxSizing: "border-box",
        padding: "48px 20px calc(42px + env(safe-area-inset-bottom))",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        background: "#050607",
        color: "#f5f5f5",
        overflowX: "hidden",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <span
        style={{
          color: "rgba(199,169,107,0.72)",
          fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontSize: 12,
          letterSpacing: "0.16em",
        }}
      >
        {sixDimensionStep === 0 ? "05｜本局卦码生成" : sixDimensionStep === 7 ? "05｜六维观变完成" : `GY / SPACE-0${sixDimensionStep} / ${currentSpace?.spaceCode ?? "SPACE"}`}
      </span>

      {sixDimensionStep === 0 ? (
        <>
          <section
            aria-label="本局卦码卡"
            style={{
              display: "grid",
              gap: 12,
              padding: "22px 18px",
              border: "1px solid rgba(199,169,107,0.42)",
              background:
                "linear-gradient(180deg, rgba(199,169,107,0.07), rgba(199,169,107,0.014)), radial-gradient(circle at 50% 45%, rgba(199,169,107,0.09), transparent 60%)",
            }}
          >
            <span
              style={{
                color: "rgba(199,169,107,0.78)",
                fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                fontSize: 11,
                letterSpacing: "0.16em",
              }}
            >
              [ 本局卦码卡 ]
            </span>
            <span style={{ color: "rgba(245,245,245,0.38)", fontSize: 12, lineHeight: 1.4 }}>
              {hexagramDisplay.displayCode ? `No.${hexagramDisplay.displayCode}` : "CODE_RENDERING"}
            </span>
            <strong style={{ color: "rgba(245,245,245,0.88)", fontSize: 30, fontWeight: 380, lineHeight: 1.15 }}>
              {hexagramDisplay.displayName}
            </strong>
            {hexagramDisplay.displayTitle ? (
              <span style={{ color: "rgba(199,169,107,0.76)", fontSize: 17, lineHeight: 1.4 }}>
                《{hexagramDisplay.displayTitle}》
              </span>
            ) : null}
            <span
              style={{
                color: "rgba(245,245,245,0.64)",
                fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                fontSize: 12,
                letterSpacing: "0.1em",
              }}
            >
              上{readModel.hexagramStage.upperTrigram} 下{readModel.hexagramStage.lowerTrigram}｜{readModel.hexagramStage.gravityLabel}
            </span>
            <span
              style={{
                color: "rgba(245,245,245,0.34)",
                fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                fontSize: 11,
                letterSpacing: "0.13em",
              }}
            >
              HEXAGRAM_CODE_RENDERED
            </span>
          </section>
          {hasSelectedPressureSeedContext ? (
            <section
              aria-label="真实压力入口"
              style={{
                display: "grid",
                gap: 10,
                padding: "14px 0",
                borderTop: "1px solid rgba(0,184,212,0.24)",
                borderBottom: "1px solid rgba(85,85,85,0.32)",
                background: "linear-gradient(90deg, rgba(0,184,212,0.045), transparent 70%)",
              }}
            >
              <span
                style={{
                  color: "rgba(0,184,212,0.74)",
                  fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  fontSize: 11,
                  letterSpacing: "0.13em",
                }}
              >
                本局压力入口已接入
              </span>
              {selectedPressureSeedContext?.surface ? (
                <p style={{ margin: 0, color: "rgba(245,245,245,0.78)", fontSize: 15, lineHeight: 1.6 }}>
                  现实种子：{selectedPressureSeedContext.surface}
                </p>
              ) : null}
              {selectedPressureSeedContext?.shell ? (
                <p style={{ margin: 0, color: "rgba(245,245,245,0.56)", fontSize: 13, lineHeight: 1.58 }}>
                  {selectedPressureSeedContext.shell}
                </p>
              ) : null}
              {tripleForceFrontStage?.readouts?.map((readout) => (
                <div key={readout.label} style={{ display: "grid", gap: 4 }}>
                  <span
                    style={{
                      color: "rgba(0,184,212,0.64)",
                      fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                      fontSize: 10,
                      letterSpacing: "0.12em",
                    }}
                  >
                    {readout.label}
                  </span>
                  <p style={{ margin: 0, color: "rgba(245,245,245,0.6)", fontSize: 13, lineHeight: 1.52 }}>
                    {readout.frontStageLine}
                  </p>
                </div>
              ))}
              {tripleForceFrontStage?.ritualLines?.length ? (
                <p style={{ margin: 0, color: "rgba(245,245,245,0.46)", fontSize: 12, lineHeight: 1.55 }}>
                  {tripleForceFrontStage.ritualLines.join(" ")}
                </p>
              ) : null}
            </section>
          ) : null}
          <h1 style={{ margin: 0, color: "rgba(245,245,245,0.88)", fontSize: "clamp(26px, 8vw, 38px)", lineHeight: 1.12, fontWeight: 420 }}>
            本局现场读数
          </h1>
          <section
            style={{
              display: "grid",
              gap: 12,
              padding: "14px 0",
              borderTop: "1px solid rgba(199,169,107,0.34)",
              borderBottom: "1px solid rgba(85,85,85,0.42)",
            }}
          >
            {[
              ["上码显影", readModel.hexagramStage.upperCodeReading],
              ["三线撞击", `主导判局线：${dominantLineLabel}`],
              ["人格重力", readModel.hexagramStage.gravityLabel],
              ["观变轨迹", trajectorySummary],
            ].map(([label, value]) => (
              <div key={label} style={{ display: "grid", gap: 5 }}>
                <span style={{ color: "rgba(199,169,107,0.72)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11, letterSpacing: "0.12em" }}>
                  {label}
                </span>
                <p style={{ margin: 0, color: "rgba(245,245,245,0.72)", fontSize: 15, lineHeight: 1.62 }}>
                  {value}
                </p>
              </div>
            ))}
          </section>
          <section style={{ display: "grid", gap: 10 }}>
            {fieldReadings.map((reading) => (
              <article
                key={reading.dimension}
                style={{
                  display: "grid",
                  gap: expandedReading === reading.dimension ? 8 : 0,
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(85,85,85,0.34)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setExpandedReading((current) => (current === reading.dimension ? "" : reading.dimension))}
                  style={{
                    width: "100%",
                    minHeight: 42,
                    border: 0,
                    background: "transparent",
                    color: "rgba(199,169,107,0.72)",
                    fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <span>
                    {reading.dimension} // {reading.tag}
                  </span>
                  <span style={{ color: "rgba(245,245,245,0.32)" }}>{expandedReading === reading.dimension ? "COLLAPSE" : "OPEN"}</span>
                </button>
                {expandedReading === reading.dimension ? (
                  <p style={{ margin: 0, color: "rgba(245,245,245,0.66)", fontSize: 14, lineHeight: 1.6 }}>
                    {reading.text}
                  </p>
                ) : null}
              </article>
            ))}
          </section>
          <p style={{ margin: "4px 0 0", color: "rgba(245,245,245,0.72)", fontSize: 15, lineHeight: 1.68 }}>
            六维人格空间已经打开。下一步进入逐屏观变。
          </p>
          <CausalRail statusLabel="进入六维人格空间" rightHint="右滑进入六维人格空间" onRight={handleNextSpace} />
        </>
      ) : null}

      {currentSpace ? (
        <>
          <header style={{ display: "grid", gap: 10 }}>
            <h1 style={{ margin: 0, color: "rgba(245,245,245,0.9)", fontSize: "clamp(28px, 8vw, 40px)", lineHeight: 1.12, fontWeight: 390 }}>
              {currentSpace.spaceName}
            </h1>
            <p style={{ margin: 0, color: "rgba(245,245,245,0.58)", fontSize: 15, lineHeight: 1.68 }}>
              {currentSpace.spaceSubtitle}
            </p>
            <p style={{ margin: 0, color: "rgba(0,184,212,0.68)", fontSize: 14, lineHeight: 1.62 }}>
              {currentSpace.causalBridge}
            </p>
          </header>

          <section
            aria-label={`${currentSpace.spaceName}读数`}
            style={{
              display: "grid",
              gap: 14,
              padding: "16px 0",
              borderTop: "1px solid rgba(199,169,107,0.34)",
              borderBottom: "1px solid rgba(85,85,85,0.38)",
            }}
          >
            <div style={{ display: "grid", gap: 6 }}>
              <span style={{ color: "rgba(199,169,107,0.72)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11, letterSpacing: "0.13em" }}>
                主读数
              </span>
              <p style={{ margin: 0, color: "rgba(245,245,245,0.78)", fontSize: 16, lineHeight: 1.68 }}>
                {currentSpace.transmissionReading}
              </p>
            </div>
            <div style={{ display: "grid", gap: 6 }}>
              <span style={{ color: "rgba(199,169,107,0.72)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11, letterSpacing: "0.13em" }}>
                惯性信号
              </span>
              <p style={{ margin: 0, color: "rgba(245,245,245,0.68)", fontSize: 15, lineHeight: 1.62 }}>
                {currentSpace.inertiaSignal}
              </p>
            </div>
            <div style={{ display: "grid", gap: 6 }}>
              <span style={{ color: "rgba(199,169,107,0.72)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11, letterSpacing: "0.13em" }}>
                如果—那么模式
              </span>
              <p style={{ margin: 0, color: "rgba(245,245,245,0.6)", fontSize: 14, lineHeight: 1.6 }}>
                {currentSpace.ifThenPattern}
              </p>
            </div>
          </section>

          <section
            aria-label="行动信号"
            style={{
              display: "grid",
              gap: 8,
              padding: "14px 0",
              borderBottom: "1px solid rgba(85,85,85,0.28)",
            }}
          >
            <span style={{ color: "rgba(245,245,245,0.4)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11, letterSpacing: "0.13em" }}>
              ACTION_SIGNAL // {currentSpace.pauseSignal.toUpperCase()} // {currentSpace.interventionPotential}
            </span>
            <p style={{ margin: 0, color: "rgba(245,245,245,0.76)", fontSize: 15, lineHeight: 1.62 }}>
              {currentSpaceSignal}
            </p>
            {currentSpace.pauseSignal !== "none" ? (
              <p style={{ margin: 0, color: "rgba(245,245,245,0.56)", fontSize: 14, lineHeight: 1.56 }}>
                {currentSpace.pauseReason}
              </p>
            ) : null}
          </section>

          {selectedSpaceAction ? (
            <section
              aria-label="处置确认"
              style={{
                display: "grid",
                gap: 8,
                padding: "14px 0",
                borderTop: "1px solid rgba(0,184,212,0.34)",
                borderBottom: "1px solid rgba(0,184,212,0.2)",
              }}
            >
              <p style={{ margin: 0, color: "rgba(245,245,245,0.82)", fontSize: 16, lineHeight: 1.62 }}>
                你选择停在：
                <br />
                {selectedSpaceAction.spaceName}
              </p>
              <p style={{ margin: 0, color: "rgba(245,245,245,0.56)", fontSize: 14, lineHeight: 1.56 }}>
                系统将把这一空间作为后续处置入口。
              </p>
            </section>
          ) : null}

          <CausalRail
            statusLabel={currentSpaceSignal}
            leftHint={!selectedSpaceAction && canTreatCurrentSpace ? "左滑进行处置" : undefined}
            rightHint="右滑进入下一空间"
            onLeft={!selectedSpaceAction && canTreatCurrentSpace ? handleSelectSpaceAction : undefined}
            onRight={handleNextSpace}
          />
        </>
      ) : null}

      {sixDimensionStep === 7 ? (
        <>
          <header style={{ display: "grid", gap: 10 }}>
            <h1 style={{ margin: 0, color: "rgba(245,245,245,0.9)", fontSize: "clamp(28px, 8vw, 40px)", lineHeight: 1.12, fontWeight: 390 }}>
              六维观变完成。
            </h1>
            <p style={{ margin: 0, color: "rgba(245,245,245,0.66)", fontSize: 15, lineHeight: 1.68 }}>
              系统已标记最能改写旧反应的位置。
            </p>
          </header>

          <section
            aria-label="行动信号总览"
            style={{
              display: "grid",
              gap: 12,
              padding: "16px 0",
              borderTop: "1px solid rgba(199,169,107,0.34)",
              borderBottom: "1px solid rgba(85,85,85,0.38)",
            }}
          >
            {[
              ["主要行动点", readModel.yaoStage.mainCut.spaceName, readModel.yaoStage.mainCut.completionReason],
              ["辅助行动点", readModel.yaoStage.secondaryCut.spaceName, readModel.yaoStage.secondaryCut.completionReason],
              ["深层保护点", readModel.yaoStage.rootCut.spaceName, readModel.yaoStage.rootCut.completionReason],
            ].map(([label, spaceName, value]) => (
              <div key={label} style={{ display: "grid", gap: 6, borderTop: "1px solid rgba(85,85,85,0.22)", paddingTop: 10 }}>
                <span style={{ color: "rgba(199,169,107,0.72)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11, letterSpacing: "0.13em" }}>
                  {label}
                </span>
                <strong style={{ color: "rgba(245,245,245,0.82)", fontSize: 17, lineHeight: 1.35, fontWeight: 360 }}>
                  {spaceName}
                </strong>
                <p style={{ margin: 0, color: "rgba(245,245,245,0.68)", fontSize: 14, lineHeight: 1.6 }}>
                  {value}
                </p>
              </div>
            ))}
          </section>

          <CausalRail statusLabel="进入处置页" rightHint="右滑进入处置页" onRight={() => navigate(GUANYAO_ROUTES.breachScan)} />
        </>
      ) : null}
    </main>
  );
}

export function GravityPage() {
  if (USE_HEXAGRAM_DELIVERY_SHELL) {
    return <HexagramCodeDeliveryShell />;
  }

  const navigate = useNavigate();
  const [autoYaoPath] = useState<YaoBit[]>(() => {
    const session = getSession();
    const currentPath = getAutoYaoPath();
    return currentPath.length < 5 ? generateMockAutoYaoPath({ realitySeed: session.realitySeed }) : currentPath;
  });
  const [interactivePath, setInteractivePath] = useState<YaoBit[]>(() => getInteractiveYaoPath());
  const [isGateVisible, setIsGateVisible] = useState(false);
  const [completedScene, setCompletedScene] = useState<number | null>(null);
  const [demoDynamics] = useState(() => getDemoDynamicsResult());
  const [motherLedger] = useState(() => getMotherLedger(getSession()));
  const [ritualScenes] = useState(() => {
    const session = getSession();
    const selectedSceneSlice = session.selectedSceneSlice;

    if (selectedSceneSlice) {
      return buildYaoRitualCopyFromScene(selectedSceneSlice);
    }

    const context = {
      selectedFragment: session.selectedFragment,
      realitySeed: session.realitySeed,
      autoYaoPath,
    };

    return [...getGravityYaoTexts(context), ...getCollapseYaoTexts(context)];
  });

  useEffect(() => {
    document.body.classList.add("gy-gravity-r1-mode");
    return () => document.body.classList.remove("gy-gravity-r1-mode");
  }, []);

  useEffect(() => {
    resetInteractiveYaoPath();
    setInteractivePath([]);
  }, []);

  const activeScene = Math.min(interactivePath.length, 4);
  const isComplete = interactivePath.length >= 5;

  useEffect(() => {
    setIsGateVisible(false);
    if (isComplete) {
      return;
    }

    const timer = window.setTimeout(() => setIsGateVisible(true), 1200);

    return () => window.clearTimeout(timer);
  }, [activeScene, isComplete]);

  function advanceTransmission() {
    navigate(GUANYAO_ROUTES.breachScan);
  }

  const currentScene = ritualScenes[activeScene];
  const currentYaoLabel = yaoIndexReadouts[activeScene] ?? yaoIndexReadouts[4];
  const currentFallback = gravityFallbackReadouts[activeScene] ?? gravityFallbackReadouts[2];
  const gateCopy = "扫描本局破口";

  return (
    <GuanyaoShell className="gy-gravity-shell" density="compact">
      <div className="gy-gravity-screen gy-gravity-r1-screen" data-intensity="gravity">
        <header className="gy-gravity-r1-header">
          <GuanyaoText as="span" size="eyebrow" tone="gold">
            GY / 05 / DYNAMICS
          </GuanyaoText>
          <GuanyaoText as="span" size="eyebrow" tone="faint">
            现实压力已钉入｜人格行为动力场正在展开
          </GuanyaoText>
          <GuanyaoText as="span" size="eyebrow" tone="faint">
            旧惯性正在漏沙｜人格行为动力学演化中
          </GuanyaoText>
          <GuanyaoText as="h1" size="title">
            {demoDynamics.title}
          </GuanyaoText>
          <GuanyaoText size="body" tone="muted">
            {demoDynamics.summary}
          </GuanyaoText>
        </header>

        <main className="gy-gravity-r1-main">
          <aside className="gy-gravity-r2-ledger" aria-label="母码因果账本摘要">
            <div className="gy-gravity-r2-ledger-summary" aria-label="母码账本折叠读数">
              <span>母码账本 //</span>
              <strong>{motherLedger.motherName} · 现实压力种子已钉入 · 高风险窗口已显影</strong>
            </div>
            <GuanyaoText as="span" size="eyebrow" tone="gold">
              母码全景账本
            </GuanyaoText>
            <div className="gy-gravity-r2-ledger-code">
              <span>母型断面</span>
              <strong>{motherLedger.motherName}</strong>
              <em>No.{motherLedger.code}</em>
            </div>
            <div className="gy-gravity-r2-ledger-list">
              <div>
                <span>账本断言</span>
                <strong>{motherLedger.assertion}</strong>
              </div>
              <div>
                <span>钉入信号</span>
                <strong>{motherLedger.sceneLine}</strong>
              </div>
              <div>
                <span>身体信号</span>
                <strong>{motherLedger.bodySignal}</strong>
              </div>
              <div>
                <span>现实代价</span>
                <strong>{motherLedger.cost}</strong>
              </div>
              <div className="gy-gravity-r2-ledger-risk">
                <span>高风险窗口</span>
                <strong>{motherLedger.risk}</strong>
              </div>
            </div>
          </aside>

          <section className="gy-gravity-r2-transmission" aria-label="旧惯性链纵向演化轴">
            <div className="gy-gravity-r1-axis">
              {Array.from({ length: 5 }, (_, index) => {
                const lockedBit = interactivePath[index];
                const isCurrent = !isComplete && index === activeScene;
                const isLocked = lockedBit === 0 || lockedBit === 1;
                const state = isLocked ? "locked" : isCurrent ? "current" : "pending";

                return (
                  <div className={`gy-gravity-r1-node gy-gravity-r1-node--${state} ${completedScene === index ? "gy-gravity-r1-node--pulse" : ""}`} data-yao={index + 1} key={index}>
                    <span className="gy-gravity-r1-node-index">0{index + 1} {yaoIndexReadouts[index].shortLabel}</span>
                    <span className="gy-gravity-r1-node-dot" aria-hidden="true" />
                    <div className="gy-gravity-r1-node-copy">
                      <strong>{yaoIndexReadouts[index].label}</strong>
                      <em>{isLocked ? `${yaoIndexReadouts[index].value}｜${lockedBit === 0 ? "阴" : "阳"}` : isCurrent ? `${yaoIndexReadouts[index].value}｜当前` : `${yaoIndexReadouts[index].value}｜待命`}</em>
                    </div>
                  </div>
                );
              })}
            </div>

            <article
              className={`gy-gravity-r1-readout ${activeScene === 3 && !isComplete ? "gy-gravity-r1-readout--critical" : ""} ${
                activeScene >= 4 || isComplete ? "gy-gravity-r1-readout--fifth" : ""
              } ${completedScene === activeScene ? "is-complete" : ""}`}
            >
              {!isComplete && activeScene < 3 ? (
                <>
                  <GuanyaoText as="span" size="eyebrow" tone="gold">
                    当前节点：NODE_0{activeScene + 1} / {currentYaoLabel.label}
                  </GuanyaoText>
                  <GuanyaoText as="h2" size="title">
                    {currentScene.title}
                  </GuanyaoText>
                  <div className="gy-gravity-r2-binary-readouts">
                    <div>
                      <span>旧反应显影 //</span>
                      <strong>{demoDynamics.oldReaction}</strong>
                    </div>
                    <div>
                      <span>压力模式 //</span>
                      <strong>{demoDynamics.pressurePattern}</strong>
                    </div>
                    <div>
                      <span>行为惯性 //</span>
                      <strong>{demoDynamics.behaviorInertia}</strong>
                    </div>
                  </div>
                </>
              ) : null}

              {!isComplete && activeScene === 3 ? (
                <>
                  <GuanyaoText as="span" size="eyebrow" tone="gold">
                    NODE_04 / 高压临界
                  </GuanyaoText>
                  <GuanyaoText className="gy-gravity-r2-overheat-tag" as="span" size="eyebrow" tone="gold">
                    CRITICAL OVERHEAT
                  </GuanyaoText>
                  <div className="gy-gravity-r2-risk-window">
                    <p>系统捕获到高风险复发窗口。</p>
                    <p>3 张反本能防线卡槽已生成。</p>
                  </div>
                  <div className="gy-gravity-r2-binary-readouts gy-gravity-r2-binary-readouts--critical">
                    <div>
                      <span>惯性注入 //</span>
                      <strong>{gravityFallbackReadouts[3].inertiaInjection}</strong>
                    </div>
                    <div>
                      <span>反向缺口 //</span>
                      <strong>{gravityFallbackReadouts[3].reverseGap}</strong>
                    </div>
                    <div>
                      <span>代价读数 //</span>
                      <strong>{gravityFallbackReadouts[3].cost}</strong>
                    </div>
                  </div>
                  <div className="gy-gravity-r2-defense-slots">
                    <span>LOCKED 01｜暂停接手</span>
                    <span>LOCKED 02｜边界归位</span>
                    <span>LOCKED 03｜代价显影</span>
                  </div>
                  <GuanyaoText className="gy-gravity-r1-muted" size="eyebrow" tone="faint">
                    完整防御本将在基础修复卡压印后解锁。
                  </GuanyaoText>
                </>
              ) : null}

              {!isComplete && activeScene >= 4 ? (
                <>
                  <GuanyaoText as="span" size="eyebrow" tone="gold">
                    NODE_05 / 本能暴露
                  </GuanyaoText>
                  <GuanyaoText as="h2" size="title">
                    旧惯性链已走完
                  </GuanyaoText>
                  <div className="gy-gravity-r2-binary-readouts">
                    <div>
                      <span>惯性注入 //</span>
                      <strong>{gravityFallbackReadouts[4].inertiaInjection}</strong>
                    </div>
                    <div>
                      <span>反向缺口 //</span>
                      <strong>{gravityFallbackReadouts[4].reverseGap}</strong>
                    </div>
                    <div>
                      <span>代价读数 //</span>
                      <strong>{gravityFallbackReadouts[4].cost}</strong>
                    </div>
                  </div>
                  <GuanyaoText className="gy-gravity-r2-threshold" size="body" tone="muted">
                    下一步，只剩破口阵列扫描。
                  </GuanyaoText>
                </>
              ) : null}

              {isComplete ? (
                <>
                  <GuanyaoText as="span" size="eyebrow" tone="gold">
                    NODE_05 / 本能暴露
                  </GuanyaoText>
                  <GuanyaoText as="h2" size="title">
                    旧惯性链已走完
                  </GuanyaoText>
                  <div className="gy-gravity-r2-binary-readouts">
                    <div>
                      <span>惯性注入 //</span>
                      <strong>{gravityFallbackReadouts[4].inertiaInjection}</strong>
                    </div>
                    <div>
                      <span>反向缺口 //</span>
                      <strong>{gravityFallbackReadouts[4].reverseGap}</strong>
                    </div>
                    <div>
                      <span>代价读数 //</span>
                      <strong>{gravityFallbackReadouts[4].cost}</strong>
                    </div>
                  </div>
                  <GuanyaoText className="gy-gravity-r2-threshold" size="body" tone="muted">
                    下一步，只剩破口阵列扫描。
                  </GuanyaoText>
                  <GuanyaoText className="gy-gravity-r1-muted" size="eyebrow" tone="faint">
                    本局结构已经形成，等待用户选择处置入口。
                  </GuanyaoText>
                </>
              ) : null}
            </article>
          </section>
        </main>

        <footer className="gy-gravity-r1-gate">
          <GuanyaoText size="eyebrow" tone="faint">
            {activeScene === 3 && !isComplete ? "高风险窗口已显影，但动力演化继续。" : isComplete ? "破口阵列扫描待命。" : "人格行为动力学演化中。"}
          </GuanyaoText>
          <button className="gy-gravity-r1-gate-button" type="button" onClick={advanceTransmission}>
            <span>{gateCopy}</span>
          </button>
        </footer>
      </div>
    </GuanyaoShell>
  );
}
