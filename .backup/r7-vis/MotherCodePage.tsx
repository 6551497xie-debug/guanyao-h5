import { useMemo, useRef, useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { GuanyaoButton } from "../components/visual/GuanyaoButton";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { GyCausalRail, GyStage, GySystemReadout } from "../components/visual/GyVisualChain";
import { GUANYAO_ROUTES } from "../routes/guanyaoRoutes";
import { buildMotherCodeResult } from "../services/motherCodeService";
import { getSession, setMotherCodeResult } from "../services/sessionService";

type ChronoAxis = "year" | "month" | "day" | "hour";

const hourBranches = ["子时", "丑时", "寅时", "卯时", "辰时", "巳时", "午时", "未时", "申时", "酉时", "戌时", "亥时"];
const chronoAxisMeta: Record<ChronoAxis, { label: string; range: string; min: number; max: number }> = {
  year: { label: "year", range: "1970—2008", min: 1970, max: 2008 },
  month: { label: "month", range: "01—12", min: 1, max: 12 },
  day: { label: "day", range: "01—31", min: 1, max: 31 },
  hour: { label: "hour", range: "十二时辰", min: 0, max: 11 },
};

function padDateUnit(value: number) {
  return String(value).padStart(2, "0");
}

function getMotherTypeName(motherCode: any) {
  const source = `${motherCode?.name ?? ""}${motherCode?.hexagramName ?? ""}${motherCode?.title ?? ""}`;
  if (source.includes("艮") || source.includes("停")) return "惯性制动型";
  if (source.includes("震") || source.includes("动")) return "压力行动型";
  if (source.includes("乾") || source.includes("创")) return "高压开创型";
  if (source.includes("坤") || source.includes("承")) return "持续承担型";
  if (source.includes("坎") || source.includes("陷") || source.includes("低")) return "深层防御型";
  if (source.includes("离") || source.includes("显")) return "外显燃烧型";
  if (source.includes("巽") || source.includes("渗")) return "柔性适应型";
  if (source.includes("兑") || source.includes("表达")) return "关系外放型";
  if (source.includes("夬") || source.includes("决")) return "临界决断型";
  if (source.includes("噬嗑") || source.includes("硬骨")) return "硬骨咬合型";
  return "行为惯性母型";
}

function getMotherSignature(motherCode: any) {
  const source = `${motherCode?.code64 ?? ""}${motherCode?.name ?? ""}${motherCode?.hexagramName ?? ""}${motherCode?.title ?? ""}`;

  if (source.includes("043") || source.includes("夬") || source.includes("决")) {
    return {
      sequence: "01001",
      stateName: "风险决口态",
      field: "拉扯已经结束，惯性正在把你推向一次明确切断。",
      dimensions: ["逼近临界", "忍到决口", "必须表态", "边界破裂"],
      assertion: [
        "你的行为惯性与现实触发证据，正在把退让推到决口。",
        "拉扯已经结束，它正在把你推向一次明确的切断。",
      ],
      hotzones: [
        ["时序惯性", "临界", "时间不再给你缓冲，所有拖延都在逼近一个必须表态的点。"],
        ["行为反应", "决口", "你不是突然爆发，而是已经忍到再退一步就会失守。"],
        ["母码驱动", "表态", "你的行动力不再用于维持局面，而是在逼你切开局面。"],
        ["现实触发", "破裂", "现实不是在提醒你，而是在把边界直接撕开。"],
      ],
    };
  }

  if (source.includes("052") || source.includes("艮") || source.includes("停")) {
    return {
      sequence: "00100",
      stateName: "惯性制动态",
      field: "你不是冷静下来，而是已经把自己停在不敢往前的位置。",
      dimensions: ["被迫停住", "原地冻结", "收紧动作", "问题逼近"],
      assertion: [
        motherCode?.shortSeal ?? "你最难的不是继续行动，而是在惯性要求你动的时候停住。",
        "停住不是答案，它只是惯性把你锁在原地的方式。",
      ],
      hotzones: [
        ["时序惯性", "停顿", "时间没有真的停下，只是你先把自己按在原地。"],
        ["行为反应", "冻结", "你不是没有反应，而是不敢让下一步变成事实。"],
        ["母码驱动", "收紧", "你的力正在把所有动作压回身体里。"],
        ["现实触发", "逼近", "现实越靠近，你越想让它先停在门外。"],
      ],
    };
  }

  if (source.includes("029") || source.includes("坎") || source.includes("低")) {
    return {
      sequence: "01010",
      stateName: "深层防御态",
      field: "你不是看不见危险，而是先把自己沉到别人够不到的地方。",
      dimensions: ["压力下沉", "沉默防御", "反复确认", "暗处逼近"],
      assertion: [
        motherCode?.shortSeal ?? "你被推到更深的低处，开始看见自己反复回到同一种反应。",
        "真正困住你的不是危险本身，而是你先把自己沉下去。",
      ],
      hotzones: [
        ["时序惯性", "下沉", "压力一出现，时间就开始往低处坠。"],
        ["行为反应", "沉默", "你把不开口当成保护，把隔绝当成清醒。"],
        ["母码驱动", "确认", "你反复确认危险，却迟迟没有真正打开它。"],
        ["现实触发", "暗涌", "现实没有爆开，但它一直在暗处逼近。"],
      ],
    };
  }

  if (source.includes("021") || source.includes("噬嗑") || source.includes("硬骨")) {
    return {
      sequence: "10101",
      stateName: "硬骨咬合态",
      field: "真正卡住你的不是外部压力，而是那块迟迟没有咬开的硬骨。",
      dimensions: ["硬点显形", "迟迟不咬", "必须处理", "阻力成形"],
      assertion: [
        motherCode?.shortSeal ?? "真正的阻力不是外部压力，而是你迟迟没有咬开的那块硬骨。",
        "它不会自己消失，只会在每一次回避后变得更硬。",
      ],
      hotzones: [
        ["时序惯性", "硬点", "时间把问题压成硬块，不再允许你绕过去。"],
        ["行为反应", "回避", "你一直绕开那一口，直到它开始反过来咬住你。"],
        ["母码驱动", "处理", "你的力不再适合维持表面，只适合处理硬点。"],
        ["现实触发", "咬合", "现实已经咬住缺口，拖延只会加深阻力。"],
      ],
    };
  }

  return {
    sequence: "00000",
    stateName: "行为母型已结晶",
    field: "本局母码已经显影，惯性正在等待展开。",
    dimensions: ["时序压迫", "惯性接管", "母码驱动", "现实逼近"],
    assertion: [
      motherCode?.shortSeal ?? "本局母码已经压印。",
      "它还没有展开成完整干预链，只是先把当前惯性固定下来。",
    ],
    hotzones: [
      ["时序惯性", "收束", "时间已经把这次惯性收束成一个固定入口。"],
      ["行为反应", "压印", "你的反应已经留下痕迹，等待被推进。"],
        ["母码驱动", "锁定", "背后的驱动已经定住，下一步会进入爻器生成轴。"],
      ["现实触发", "逼近", "现实压力已经靠近，不再只是背景。"],
    ],
  };
}

function renderCoreAssertion(line: string) {
  if (line.includes("退让") && line.includes("决口")) {
    return (
      <>
        你的行为惯性与现实触发证据，
        <br />
        正在把「<mark>退让</mark>」推到「<mark>决口</mark>」。
      </>
    );
  }

  if (line.includes("拉扯") && line.includes("切断")) {
    return (
      <>
        <mark>拉扯</mark>已经结束。
        <br />
        它正在把你推向一次明确的「<mark>切断</mark>」。
      </>
    );
  }

  return line;
}

const paidDiagnostic = {
  matrixHash: "GY_MATRIX_043_DEC_01001",
  code: "043",
  guaName: "夬｜决口",
  archetype: "风险决口态",
  status: "已付费解锁",
  label: "观爻母码｜全景读数",
  sections: [
    {
      id: "matrix",
      title: "01 状态矩阵解密",
      subtitle: "原始源点 × 内部解释 × 外部压力",
      lines: [
        "系统读取你的根资产、母码线索与现实触发证据后，生成当前变化结构：风险决口态。",
        "你带着先发动作、强占主控的源点驱动，撞上了一枚持续加压的现实触发证据。",
        "两股力在盘面里交汇后，没有形成缓冲，而是把你推向一次必须表态的决口。",
      ],
    },
    {
      id: "profile",
      title: "02 人物场域剖面",
      subtitle: "足够锋利，但不定罪",
      lines: [
        "你不是突然想撕破什么。",
        "你只是已经忍到身体先于语言进入紧绷。",
        "很多话没有说出口，很多边界没有真正划下去，于是代价被你吞回身体里。",
        "沉默看起来像体面，但在这个局里，它已经开始变成决口前的蓄水。",
      ],
    },
    {
      id: "defect",
      title: "03 底层缺陷诊断",
      subtitle: "动作太急，底牌太虚",
      lines: [
        "你的问题不是不够果断，而是动作太急，底牌太虚。",
        "你正在用连续推进和持续加码，掩盖自己不敢停下来的失重感。",
        "如果这个习惯不被打断，你的行为惯性会把你推向一次现实层面的明确切断。",
      ],
    },
    {
      id: "gate",
      title: "04 因果飞轮闸门",
      subtitle: "启动人格行为动力学演化",
      lines: [
        "系统不给你命运的判词。",
        "观爻只把改写结局的执笔权交还给你。",
        "当前母码已经显影。接下来，按住底部 1px 因果闸门。",
        "你将看到这条行为惯性如何生成爻器，并在破口阵列里出现一次下刀位置。",
      ],
    },
  ],
};

export function MotherCodePage() {
  const navigate = useNavigate();
  const [isChronoEmbedded, setIsChronoEmbedded] = useState(() => window.localStorage.getItem("GY_CHRONO_1995060200") === "locked");
  const [activeAxis, setActiveAxis] = useState<ChronoAxis>("year");
  const [chronoValues, setChronoValues] = useState({
    year: 1995,
    month: 6,
    day: 2,
    hourIndex: 0,
  });
  const [lockedAxes, setLockedAxes] = useState<Record<ChronoAxis, boolean>>({
    year: false,
    month: false,
    day: false,
    hour: false,
  });
  const [activeHotzone, setActiveHotzone] = useState<string | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);
  const [isHoldingGate, setIsHoldingGate] = useState(false);
  const holdTimerRef = useRef<number | null>(null);
  const session = getSession();
  const injectedSceneSeed = session.selectedSceneSeed ?? session.realitySeed;
  const injectedSceneLine = injectedSceneSeed?.seedLine ?? injectedSceneSeed?.flashLine ?? injectedSceneSeed?.title ?? null;
  const motherCode = useMemo(() => {
    const currentMotherCode = session.currentMotherCode ?? session.motherCodeResult ?? session.motherCode ?? buildMotherCodeResult(session);
    setMotherCodeResult(currentMotherCode);
    return currentMotherCode;
  }, [session]);
  const motherTypeName = getMotherTypeName(motherCode);
  const motherSignature = getMotherSignature(motherCode);
  const activeHotzoneIndex = motherSignature.hotzones.findIndex(([label]) => label === activeHotzone);
  const chronoValves = [
    { id: "year" as const, value: String(chronoValues.year) },
    { id: "month" as const, value: padDateUnit(chronoValues.month) },
    { id: "day" as const, value: padDateUnit(chronoValues.day) },
    { id: "hour" as const, value: hourBranches[chronoValues.hourIndex] },
  ];
  const activeMeta = chronoAxisMeta[activeAxis];
  const activeValue = activeAxis === "hour" ? chronoValues.hourIndex : chronoValues[activeAxis];
  const activeProgress = ((activeValue - activeMeta.min) / (activeMeta.max - activeMeta.min)) * 100;
  const isAllAxesLocked = Object.values(lockedAxes).every(Boolean);

  function updateActiveAxisValue(value: number) {
    setChronoValues((current) => {
      if (activeAxis === "year") return { ...current, year: value };
      if (activeAxis === "month") return { ...current, month: value };
      if (activeAxis === "day") return { ...current, day: value };
      return { ...current, hourIndex: value };
    });
    setLockedAxes((current) => ({ ...current, [activeAxis]: false }));
  }

  function handleValveClick(axis: ChronoAxis) {
    if (axis !== activeAxis) {
      setActiveAxis(axis);
      return;
    }

    setLockedAxes((current) => ({ ...current, [axis]: !current[axis] }));
  }

  function embedChronoCoordinates() {
    if (!isAllAxesLocked) return;

    window.localStorage.setItem("GY_CHRONO_1995060200", "locked");
    window.localStorage.setItem(
      "GY_CHRONO_COORDINATES",
      JSON.stringify({
        year: chronoValues.year,
        month: chronoValues.month,
        day: chronoValues.day,
        hour: hourBranches[chronoValues.hourIndex],
      }),
    );
    setIsChronoEmbedded(true);
  }

  const releaseCausalGate = () => {
    if (holdTimerRef.current !== null) {
      window.clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    setIsHoldingGate(false);
  };

  const holdCausalGate = () => {
    releaseCausalGate();
    setIsHoldingGate(true);
    holdTimerRef.current = window.setTimeout(() => {
      holdTimerRef.current = null;
      setIsHoldingGate(false);
      navigate(GUANYAO_ROUTES.dynamics);
    }, 1500);
  };

  if (!isChronoEmbedded) {
    return (
      <GyStage className="gy-mother-chrono-stage" variant="instrument">
        <GySystemReadout code="GY / 00-FIX / CHRONO" status="COORDINATE_VALVES_STANDBY" />

        <h1 className="gy-mother-chrono-title">时 序 装 填</h1>

        <section className="gy-mother-chrono-valves" aria-label="初始坐标阀门">
          {chronoValves.map((valve) => {
            const isActive = activeAxis === valve.id;
            const isLocked = lockedAxes[valve.id];
            return (
              <button
                className="gy-mother-chrono-valve"
                data-active={isActive}
                data-locked={isLocked}
                key={valve.id}
                type="button"
                onClick={() => handleValveClick(valve.id)}
              >
                <span>{chronoAxisMeta[valve.id].label}</span>
                <strong>{valve.value}</strong>
              </button>
            );
          })}
        </section>

        <section
          className={`gy-mother-chrono-axis${lockedAxes[activeAxis] ? " is-locked" : ""}`}
          style={{ "--gy-axis-progress": `${activeProgress}%` } as CSSProperties}
          aria-label={`${activeMeta.label} 坐标轨`}
        >
          <span className="gy-mother-chrono-axis__range">{activeMeta.range}</span>
          <span className="gy-mother-chrono-axis__track" />
          <input
            className="gy-mother-chrono-axis__input"
            type="range"
            min={activeMeta.min}
            max={activeMeta.max}
            step={1}
            value={activeValue}
            onChange={(event) => updateActiveAxisValue(Number(event.target.value))}
          />
          <span className="gy-mother-chrono-axis__hint">{lockedAxes[activeAxis] ? "当前阀门已锁定" : "再次点击当前阀门完成锁定"}</span>
        </section>

        <div className="gy-mother-chrono-rail">
          <GyCausalRail
            active={isAllAxesLocked}
            disabled={!isAllAxesLocked}
            hint={isAllAxesLocked ? "进入 02 母码显影" : "四段坐标待锁定"}
            label={isAllAxesLocked ? "确认填装 · 显影母码" : "等待坐标阀门锁定"}
            onClick={embedChronoCoordinates}
          />
        </div>

        <span className="gy-launch-system-status">INITIAL_COORDINATES_LOADING</span>
      </GyStage>
    );
  }

  return (
    <GuanyaoShell className="gy-mother-reactor-shell" density="compact">
      <section className={`gy-mother-reactor gyFadeRise ${isUnlocked ? "gy-mother-reactor--unlocked" : ""}`}>
        <div className="gy-mother-reactor-main">
          {!isUnlocked ? (
            <div className={`gy-mother-asset-card gy-mother-asset-card--hotzone-${Math.max(activeHotzoneIndex, 0)}`}>
              <div className="gy-mother-sequence">{motherSignature.sequence}</div>
              <div className="gy-mother-sigil" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className="gy-mother-card-footer">No.{motherCode.code64}</div>
            </div>
          ) : null}

          <div className="gy-mother-reactor-readout">
            {!isUnlocked ? (
              <>
                <GuanyaoText className="gy-text-instrument" as="span" size="eyebrow" tone="gold">
                  观爻母码｜64
                </GuanyaoText>
                <GuanyaoText className="gy-mother-system-status" as="span" size="eyebrow" tone="faint">
                  状态：本局母码已显影
                </GuanyaoText>

                <div className="gy-mother-state-code">
                  <span>No.{motherCode.code64}</span>
                  <strong>// {motherSignature.stateName}</strong>
                  <em>{motherSignature.sequence}</em>
                </div>

                <div className="gy-mother-current-type">
                  <span>{motherCode.name}｜{motherCode.title}</span>
                </div>

                <div className="gy-mother-core-assertion">
                  {motherSignature.assertion.map((line, index) => (
                    <p className={index > 0 ? "gy-mother-core-assertion-break" : ""} key={line}>
                      {renderCoreAssertion(line)}
                    </p>
                  ))}
                </div>

                <div className="gy-mother-hotzone-grid">
                  {motherSignature.hotzones.map(([label, value, note]) => {
                    const isActive = activeHotzone === label;
                    return (
                      <button
                        className={`gy-mother-hotzone ${isActive ? "gy-mother-hotzone--active" : ""}`}
                        key={label}
                        type="button"
                        onClick={() => setActiveHotzone(isActive ? null : label)}
                      >
                        <span>{label}</span>
                        <strong>// {value}</strong>
                        {isActive ? <em>{note}</em> : null}
                      </button>
                    );
                  })}
                </div>

                <GuanyaoText className="gy-mother-not-fixed" size="eyebrow" tone="faint">
                  这不是你是谁。这是本次现实钉入后，显影出来的变化结构。
                </GuanyaoText>

                <div className="gy-mother-scene-bridge" aria-label="现实触发证据钉入承接">
                  <GuanyaoText as="span" size="eyebrow" tone="faint">
                    现实触发证据已钉入。
                    <br />
                    母码显影开始成形。
                  </GuanyaoText>
                  {injectedSceneLine ? (
                    <GuanyaoText as="span" size="eyebrow" tone="faint">
                      钉入证据：{injectedSceneLine}
                    </GuanyaoText>
                  ) : null}
                </div>
              </>
            ) : (
              <div className="gy-mother-paid-panel">
                <GuanyaoText className="gy-text-instrument" as="span" size="eyebrow" tone="gold">
                  {paidDiagnostic.label}
                </GuanyaoText>
                <div className="gy-mother-paid-matrix">
                  <span>{paidDiagnostic.matrixHash}</span>
                  <strong>
                    {paidDiagnostic.code} {paidDiagnostic.guaName}
                  </strong>
                  <em>
                    {paidDiagnostic.archetype}｜{paidDiagnostic.status}
                  </em>
                </div>

                <div className="gy-mother-diagnostic-drawers">
                  {paidDiagnostic.sections.map((section) => {
                    const isActive = activeDrawer === section.id;
                    return (
                      <button
                        className={`gy-mother-diagnostic-drawer ${isActive ? "gy-mother-diagnostic-drawer--active" : ""}`}
                        key={section.id}
                        type="button"
                        onClick={() => setActiveDrawer(isActive ? null : section.id)}
                      >
                        <span>{section.title}</span>
                        <strong>{section.subtitle}</strong>
                        {isActive ? (
                          <div className="gy-mother-diagnostic-body">
                            {section.lines.map((line) => (
                              <p key={line}>{line}</p>
                            ))}
                          </div>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="gy-mother-lockwall">
          <div className="gy-mother-lockline" />
          {!isUnlocked ? (
            <>
              <GuanyaoText className="gy-mother-record-status" size="body" tone="muted">
                因果沙盘已锁定。
                <br />
                  爻器生成轴处于断路状态。
              </GuanyaoText>
              <GuanyaoButton className="gy-behavior-gate gy-behavior-gate-primary gy-mother-unlock-button" variant="gate" onClick={() => setIsUnlocked(true)}>
                🔒 支付 9.9 元 · 生成本局爻器与器法
              </GuanyaoButton>
              <GuanyaoText className="gy-mother-unlock-note" size="eyebrow" tone="faint">
                含：母码全景读数 / 爻器生成轴 / 基础器法 / 行为修复资产沉积
              </GuanyaoText>
            </>
          ) : (
            <>
              <GuanyaoText className="gy-mother-record-status" size="body" tone="muted">
                母码全景读数已展开。
                <br />
                长按底部因果闸门，启动爻器生成轴。
              </GuanyaoText>
              <button
                className={`gy-mother-causal-hold ${isHoldingGate ? "gy-mother-causal-hold--charging" : ""}`}
                type="button"
                onContextMenu={(event) => event.preventDefault()}
                onMouseDown={holdCausalGate}
                onMouseLeave={releaseCausalGate}
                onMouseUp={releaseCausalGate}
                onPointerCancel={releaseCausalGate}
                onPointerDown={holdCausalGate}
                onPointerLeave={releaseCausalGate}
                onPointerUp={releaseCausalGate}
                onTouchCancel={releaseCausalGate}
                onTouchEnd={releaseCausalGate}
                onTouchStart={holdCausalGate}
              >
                <span>⚡ 爻器生成轴已复活 · 长按启动人格行为动力学演化</span>
                <i />
              </button>
            </>
          )}
        </div>
      </section>
    </GuanyaoShell>
  );
}
