import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { GUANYAO_ROUTES } from "../routes/guanyaoRoutes";
import { getDemoDynamicsResult, getDemoHexagramFieldReading } from "../services/guanyaoInteractionService";
import { getSession } from "../services/sessionService";
import { buildMotherCodeResult } from "../services/motherCodeService";
import { getCollapseYaoTexts, getGravityYaoTexts } from "../services/yaoTextService";
import { appendInteractiveYaoChoice, generateMockAutoYaoPath, getAutoYaoPath, getInteractiveYaoPath, resetInteractiveYaoPath } from "../services/trajectoryService";
import type { GuanyaoSession, HexagramFieldReading, MotherCodeResult, SceneSlice, YaoBit } from "../types";

const USE_HEXAGRAM_DELIVERY_SHELL = true;

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
  const [stage, setStage] = useState<"ritual" | "card" | "reading">("ritual");
  const [fieldReading] = useState(() => getDemoHexagramFieldReading());
  const [expandedReading, setExpandedReading] = useState<HexagramFieldReading["fieldReadings"][number]["dimension"] | "">(
    fieldReading.fieldReadings[0]?.dimension ?? "母码惯性",
  );

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
        05｜本局卦码生成
      </span>

      {stage === "ritual" ? (
        <>
          <section
            style={{
              display: "grid",
              gap: 12,
              padding: "16px 0",
              borderTop: "1px solid rgba(199,169,107,0.34)",
              borderBottom: "1px solid rgba(85,85,85,0.46)",
            }}
          >
            <p style={{ margin: 0, color: "rgba(245,245,245,0.76)", fontSize: 17, lineHeight: 1.72 }}>
              下卦，已入底。
              <br />
              上卦，已压顶。
            </p>
            <p style={{ margin: 0, color: "rgba(245,245,245,0.66)", fontSize: 15, lineHeight: 1.72 }}>
              母码与压力场，
              <br />
              正在发生对撞。
            </p>
            <p style={{ margin: 0, color: "rgba(245,245,245,0.72)", fontSize: 16, lineHeight: 1.62 }}>
              卦场正在闭合。
            </p>
          </section>
          <span
            style={{
              color: "rgba(245,245,245,0.34)",
              fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              fontSize: 11,
              letterSpacing: "0.13em",
            }}
          >
            HEXAGRAM_FIELD_COLLIDING
          </span>
          <button
            type="button"
            onClick={() => setStage("card")}
            style={{
              width: "100%",
              minHeight: 52,
              marginTop: "auto",
              border: "1px solid rgba(199,169,107,0.52)",
              borderRadius: 0,
              background: "transparent",
              color: "rgba(245,245,245,0.9)",
              fontSize: 15,
              letterSpacing: "0.04em",
            }}
          >
            立即查看本局卦码
          </button>
        </>
      ) : null}

      {stage === "card" ? (
        <>
          <p style={{ margin: 0, color: "rgba(245,245,245,0.76)", fontSize: 17, lineHeight: 1.68 }}>
            本局卦码已生成。
          </p>
          <p style={{ margin: 0, color: "rgba(245,245,245,0.64)", fontSize: 15, lineHeight: 1.72 }}>
            卦码不是答案。
            <br />
            这是你当前所处的人格行为场域。
          </p>
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
              No.{fieldReading.identity.hexagramNo}
            </span>
            <strong style={{ color: "rgba(245,245,245,0.88)", fontSize: 30, fontWeight: 380, lineHeight: 1.15 }}>
              {fieldReading.identity.hexagramName}
            </strong>
            <span style={{ color: "rgba(199,169,107,0.76)", fontSize: 17, lineHeight: 1.4 }}>
              《{fieldReading.identity.fieldTitle}》
            </span>
            <span
              style={{
                color: "rgba(245,245,245,0.64)",
                fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                fontSize: 12,
                letterSpacing: "0.1em",
              }}
            >
              {fieldReading.scriptState.scriptName}
            </span>
            <span
              style={{
                color: "rgba(245,245,245,0.34)",
                fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                fontSize: 11,
                letterSpacing: "0.13em",
              }}
            >
              {fieldReading.identity.renderStatus}
            </span>
          </section>
          <button
            type="button"
            onClick={() => setStage("reading")}
            style={{
              width: "100%",
              minHeight: 52,
              marginTop: "auto",
              border: "1px solid rgba(199,169,107,0.52)",
              borderRadius: 0,
              background: "transparent",
              color: "rgba(245,245,245,0.9)",
              fontSize: 15,
              letterSpacing: "0.04em",
            }}
          >
            向下查看本局现场读数
          </button>
        </>
      ) : null}

      {stage === "reading" ? (
        <>
          <h1 style={{ margin: 0, color: "rgba(245,245,245,0.88)", fontSize: "clamp(26px, 8vw, 38px)", lineHeight: 1.12, fontWeight: 420 }}>
            本局现场读数
          </h1>
          <section
            style={{
              display: "grid",
              gap: 8,
              padding: "14px 0",
              borderTop: "1px solid rgba(199,169,107,0.34)",
              borderBottom: "1px solid rgba(85,85,85,0.42)",
            }}
          >
            <p style={{ margin: 0, color: "rgba(245,245,245,0.78)", fontSize: 16, lineHeight: 1.62 }}>
              {fieldReading.hitText.line1}
              <br />
              {fieldReading.hitText.line2}
              {fieldReading.hitText.line3 ? (
                <>
                  <br />
                  {fieldReading.hitText.line3}
                </>
              ) : null}
            </p>
          </section>
          <section style={{ display: "grid", gap: 10 }}>
            {fieldReading.fieldReadings.map((reading) => (
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
            {fieldReading.next.prompt}
          </p>
          <button
            type="button"
            onClick={() => navigate(GUANYAO_ROUTES.breachScan)}
            style={{
              width: "100%",
              minHeight: 52,
              marginTop: "auto",
              border: "1px solid rgba(199,169,107,0.52)",
              borderRadius: 0,
              background: "transparent",
              color: "rgba(245,245,245,0.9)",
              fontSize: 15,
              letterSpacing: "0.04em",
            }}
          >
            {fieldReading.next.cta}
          </button>
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
                    本局结构已经形成，等待用户选择下刀。
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
