import { useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { useNavigate } from "react-router-dom";
import { GuanyaoButton } from "../components/visual/GuanyaoButton";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { setChronoProfile } from "../services/sessionService";
import type { ChronoAgeRange, ChronoProfile, ChronoPrototypeCard } from "../types";

const minBirthYear = 1955;
const maxBirthYear = 2008;
const defaultBirthYear = 1995;
const defaultBirthMonth = 6;
const defaultBirthDay = 2;

type ChronoAxis = "year" | "month" | "day" | "time";

const chronoAxisMeta: Record<ChronoAxis, { label: string; hint: string; min: number; max: number }> = {
  year: { label: "年", hint: "轴向滑动 · 定位年份", min: minBirthYear, max: maxBirthYear },
  month: { label: "月", hint: "轴向滑动 · 定位月份", min: 1, max: 12 },
  day: { label: "日", hint: "轴向滑动 · 定位日期", min: 1, max: 31 },
  time: { label: "时段", hint: "轴向滑动 · 定位时段", min: 0, max: 11 },
};

const birthTimeRanges = [
  { range: "23:00—01:00", branch: "zi", label: "子时" },
  { range: "01:00—03:00", branch: "chou", label: "丑时" },
  { range: "03:00—05:00", branch: "yin", label: "寅时" },
  { range: "05:00—07:00", branch: "mao", label: "卯时" },
  { range: "07:00—09:00", branch: "chen", label: "辰时" },
  { range: "09:00—11:00", branch: "si", label: "巳时" },
  { range: "11:00—13:00", branch: "wu", label: "午时" },
  { range: "13:00—15:00", branch: "wei", label: "未时" },
  { range: "15:00—17:00", branch: "shen", label: "申时" },
  { range: "17:00—19:00", branch: "you", label: "酉时" },
  { range: "19:00—21:00", branch: "xu", label: "戌时" },
  { range: "21:00—23:00", branch: "hai", label: "亥时" },
] as const;

const chronoStageProfiles: Record<ChronoAgeRange, Omit<ChronoProfile, "birthYear" | "birthMonth" | "birthDay" | "birthDate" | "birthTimeRange" | "birthHourBranch" | "birthHourBranchLabel" | "chronoHash" | "ageRange" | "chronoPrototypeCard">> = {
  "18_22": {
    lifeStageLabel: "初入成人世界",
    pressureField: ["校园关系", "身份形成", "专业选择", "经济试探"],
    sceneWeightTags: ["campus", "identity", "peer_pressure", "early_debt"],
  },
  "23_31": {
    lifeStageLabel: "职场加速期",
    pressureField: ["职场评价", "边界消耗", "城市生存", "关系比较"],
    sceneWeightTags: ["workplace", "performance", "overtime", "rental_life"],
  },
  "32_39": {
    lifeStageLabel: "责任叠压期",
    pressureField: ["家庭责任", "职业瓶颈", "亲密关系", "资产压力"],
    sceneWeightTags: ["family", "career_pressure", "relationship", "asset_pressure"],
  },
  "40_52": {
    lifeStageLabel: "信用与家庭承压期",
    pressureField: ["信用压力", "团队责任", "家庭支出", "债务风险"],
    sceneWeightTags: ["credit", "mortgage", "team_risk", "family_expense"],
  },
  "53_plus": {
    lifeStageLabel: "重构与回看期",
    pressureField: ["身份重构", "健康信号", "家庭关系", "价值回看"],
    sceneWeightTags: ["reconstruction", "health_signal", "family_relation", "life_review"],
  },
};

const trigramPrototypes = [
  {
    trigramId: "qian",
    trigramSymbol: "☰",
    trigramName: "乾",
    archetypeName: "创世者",
    prototypeName: "启动原型",
    shortReading: "你不是天生强大。你只是太害怕一停下来，世界就不再听你的。",
    shadowReading: "一旦失控逼近，你会本能地用掌控感压住恐惧。",
  },
  {
    trigramId: "kun",
    trigramSymbol: "☷",
    trigramName: "坤",
    archetypeName: "承载者",
    prototypeName: "托底原型",
    shortReading: "你不是没有边界。你只是太熟练地把自己的边界让给别人使用。",
    shadowReading: "你会把承受包装成稳定，直到身体先替你报警。",
  },
  {
    trigramId: "zhen",
    trigramSymbol: "☳",
    trigramName: "震",
    archetypeName: "行动者",
    prototypeName: "冲击原型",
    shortReading: "你不是热爱行动。你只是太害怕一停下来，就看见真正的问题还在原地。",
    shadowReading: "动作越多，越容易把真正的问题继续推远。",
  },
  {
    trigramId: "xun",
    trigramSymbol: "☴",
    trigramName: "巽",
    archetypeName: "适应者",
    prototypeName: "绕行原型",
    shortReading: "你不是灵活。你是在冲突面前，把自己的立场交给风向。",
    shadowReading: "你越会绕开冲突，越容易失去自己的站位。",
  },
  {
    trigramId: "kan",
    trigramSymbol: "☵",
    trigramName: "坎",
    archetypeName: "深渊者",
    prototypeName: "下沉原型",
    shortReading: "你不是冷静。你是在用沉默，把自己一点点埋回深处。",
    shadowReading: "沉默越久，越容易把真实盘面拖进更深的位置。",
  },
  {
    trigramId: "li",
    trigramSymbol: "☲",
    trigramName: "离",
    archetypeName: "燃烧者",
    prototypeName: "显影原型",
    shortReading: "你不是在发光。你是在用更亮的光，遮住正在过热的自己。",
    shadowReading: "越需要体面，越容易把真实裂缝藏到最后。",
  },
  {
    trigramId: "gen",
    trigramSymbol: "☶",
    trigramName: "艮",
    archetypeName: "停滞者",
    prototypeName: "冻结原型",
    shortReading: "你不是稳。你是在变化面前，把自己锁成一块石头。",
    shadowReading: "你会把停住说成谨慎，把错过说成等待。",
  },
  {
    trigramId: "dui",
    trigramSymbol: "☱",
    trigramName: "兑",
    archetypeName: "连接者",
    prototypeName: "缓冲原型",
    shortReading: "你不是会连接。你是在硬压力面前，向关系网求一次缓冲。",
    shadowReading: "关系越像缓冲垫，越容易替你拖住真正的问题。",
  },
] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getAgeRangeFromBirthYear(birthYear: number): ChronoAgeRange {
  const age = new Date().getFullYear() - birthYear;

  if (age <= 22) return "18_22";
  if (age <= 31) return "23_31";
  if (age <= 39) return "32_39";
  if (age <= 52) return "40_52";
  return "53_plus";
}

function padDateUnit(value: number) {
  return String(value).padStart(2, "0");
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function buildChronoHash(birthYear: number, birthMonth: number, birthDay: number, branch: string) {
  return `GY_CHRONO_${birthYear}${padDateUnit(birthMonth)}${padDateUnit(birthDay)}_${branch.toUpperCase()}`;
}

function getValueFromPointer(clientX: number, element: HTMLDivElement, min: number, max: number) {
  const rect = element.getBoundingClientRect();
  const progress = rect.width > 0 ? (clientX - rect.left) / rect.width : 0;
  return Math.round(min + clamp(progress, 0, 1) * (max - min));
}

function buildChronoPrototypeCard(ageRange: ChronoAgeRange, timeIndex: number, pressureField: string[], timeRange: string, hourBranch: string): ChronoPrototypeCard {
  const ageOffset: Record<ChronoAgeRange, number> = {
    "18_22": 0,
    "23_31": 2,
    "32_39": 3,
    "40_52": 5,
    "53_plus": 6,
  };
  const prototype = trigramPrototypes[(ageOffset[ageRange] + timeIndex) % trigramPrototypes.length];

  return {
    trigramId: prototype.trigramId,
    trigramSymbol: prototype.trigramSymbol,
    trigramName: prototype.trigramName,
    archetypeName: prototype.archetypeName,
    timeRange,
    hourBranch,
    prototypeName: prototype.prototypeName,
    pressureWeights: pressureField.slice(0, 3),
    shortReading: prototype.shortReading,
    shadowReading: prototype.shadowReading,
  };
}

function buildChronoProfile(birthYear: number, birthMonth: number, birthDay: number, timeIndex: number): ChronoProfile {
  const safeMonth = clamp(birthMonth, 1, 12);
  const safeDay = clamp(birthDay, 1, getDaysInMonth(birthYear, safeMonth));
  const birthTime = birthTimeRanges[clamp(timeIndex, 0, birthTimeRanges.length - 1)];
  const ageRange = getAgeRangeFromBirthYear(birthYear);
  const stage = chronoStageProfiles[ageRange];
  const chronoHash = buildChronoHash(birthYear, safeMonth, safeDay, birthTime.branch);
  const chronoPrototypeCard = buildChronoPrototypeCard(ageRange, timeIndex, stage.pressureField, birthTime.range, birthTime.branch);

  return {
    birthYear,
    birthMonth: safeMonth,
    birthDay: safeDay,
    birthDate: `${birthYear}-${padDateUnit(safeMonth)}-${padDateUnit(safeDay)}`,
    birthTimeRange: birthTime.range,
    birthHourBranch: birthTime.branch,
    birthHourBranchLabel: birthTime.label,
    chronoHash,
    ageRange,
    ...stage,
    chronoPrototypeCard,
  };
}

export function ChronoPage() {
  const navigate = useNavigate();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [birthYear, setBirthYear] = useState(defaultBirthYear);
  const [birthMonth, setBirthMonth] = useState(defaultBirthMonth);
  const [birthDay, setBirthDay] = useState(defaultBirthDay);
  const [timeIndex, setTimeIndex] = useState(0);
  const [activeAxis, setActiveAxis] = useState<ChronoAxis>("year");
  const [isDragging, setIsDragging] = useState(false);
  const [chronoProfile, setGeneratedChronoProfile] = useState<ChronoProfile | null>(null);
  const activeMeta = chronoAxisMeta[activeAxis];
  const activeValue = activeAxis === "year" ? birthYear : activeAxis === "month" ? birthMonth : activeAxis === "day" ? birthDay : timeIndex;
  const progress = ((activeValue - activeMeta.min) / (activeMeta.max - activeMeta.min)) * 100;

  function updateChronoValueFromPointer(clientX: number) {
    if (!trackRef.current) return;

    const nextValue = getValueFromPointer(clientX, trackRef.current, activeMeta.min, activeMeta.max);
    setGeneratedChronoProfile(null);

    if (activeAxis === "year") {
      const nextYear = clamp(nextValue, minBirthYear, maxBirthYear);
      setBirthYear(nextYear);
      setBirthDay((currentDay) => clamp(currentDay, 1, getDaysInMonth(nextYear, birthMonth)));
      return;
    }

    if (activeAxis === "month") {
      const nextMonth = clamp(nextValue, 1, 12);
      setBirthMonth(nextMonth);
      setBirthDay((currentDay) => clamp(currentDay, 1, getDaysInMonth(birthYear, nextMonth)));
      return;
    }

    if (activeAxis === "day") {
      setBirthDay(clamp(nextValue, 1, getDaysInMonth(birthYear, birthMonth)));
      return;
    }

    setTimeIndex(clamp(nextValue, 0, birthTimeRanges.length - 1));
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    updateChronoValueFromPointer(event.clientX);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    updateChronoValueFromPointer(event.clientX);
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    setIsDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function handleGenerate() {
    const profile = buildChronoProfile(birthYear, birthMonth, birthDay, timeIndex);
    setChronoProfile(profile);
    setGeneratedChronoProfile(profile);
  }

  const currentTimeRange = birthTimeRanges[timeIndex];
  const generatedCard = chronoProfile?.chronoPrototypeCard;

  return (
    <GuanyaoShell density="compact">
      <section className="gy-front-screen gy-front-instrument gy-chrono-screen gy-causal-line gy-causal-line-anchor" data-intensity="quiet">
        <div className="gy-front-copy gyFadeRise">
          <GuanyaoText className="gy-text-muted-coord" as="span" size="eyebrow" tone="faint">
            GY / 00-FIX / CHRONO
          </GuanyaoText>
          <GuanyaoText className="gy-text-instrument" as="span" size="eyebrow" tone="gold">
            时序装填
          </GuanyaoText>
          <GuanyaoText as="h2" size="title">
            时间年轮
          </GuanyaoText>
          <div className="gy-front-lines gy-chrono-copy">
            {["把你的出生坐标", "放回这条时间轴"].map((line) => (
              <GuanyaoText key={line} size="body" tone="muted">
                {line}
              </GuanyaoText>
            ))}
          </div>
        </div>

        <div className="gy-chrono-wheel" aria-hidden="true">
          <span className="gy-chrono-wheel-year gy-chrono-wheel-year--1970">1970</span>
          <span className="gy-chrono-wheel-year gy-chrono-wheel-year--1980">1980</span>
          <span className="gy-chrono-wheel-year gy-chrono-wheel-year--1990">1990</span>
          <span className="gy-chrono-wheel-year gy-chrono-wheel-year--2000">2000</span>
          <span className="gy-chrono-wheel-year gy-chrono-wheel-year--2010">2010</span>
          <span className="gy-chrono-wheel-pin" />
        </div>

        <div className="gy-chrono-readout gyFadeRise" aria-live="polite" data-dragging={isDragging}>
          <GuanyaoText className="gy-text-muted-coord" as="span" size="eyebrow" tone="faint">
            出生坐标
          </GuanyaoText>
          <div className="gy-chrono-current">
            <div className="gy-chrono-date-readout" aria-label="出生坐标">
              <div className="gy-chrono-date-primary">
                <button className="gy-chrono-date-part" type="button" data-active={activeAxis === "year"} onClick={() => setActiveAxis("year")}>
                  {birthYear}
                </button>
                <span className="gy-chrono-date-separator">/</span>
                <button className="gy-chrono-date-part" type="button" data-active={activeAxis === "month"} onClick={() => setActiveAxis("month")}>
                  {padDateUnit(birthMonth)}
                </button>
                <span className="gy-chrono-date-separator">/</span>
                <button className="gy-chrono-date-part" type="button" data-active={activeAxis === "day"} onClick={() => setActiveAxis("day")}>
                  {padDateUnit(birthDay)}
                </button>
              </div>
              <button className="gy-chrono-date-part gy-chrono-date-part--time" type="button" data-active={activeAxis === "time"} onClick={() => setActiveAxis("time")}>
                {currentTimeRange.range}
                <span>{currentTimeRange.label}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="gy-chrono-axis-tabs" aria-label="校准对象">
          {(["year", "month", "day", "time"] as ChronoAxis[]).map((axis) => (
            <button key={axis} type="button" data-active={activeAxis === axis} onClick={() => setActiveAxis(axis)}>
              {chronoAxisMeta[axis].label}
            </button>
          ))}
        </div>

        <GuanyaoText className="gy-text-muted-coord gy-launch-chrono-axis" size="eyebrow" tone="faint">
          {activeMeta.hint}
        </GuanyaoText>

        <div
          className="gy-chrono-scale gyFadeRise"
          ref={trackRef}
          role="slider"
          aria-label="出生坐标校准轴"
          aria-valuemin={activeMeta.min}
          aria-valuemax={activeMeta.max}
          aria-valuenow={activeValue}
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ "--gy-chrono-progress": `${progress}%` } as CSSProperties}
        >
          <div className="gy-chrono-scale-line" />
          <div className="gy-chrono-scale-marks" aria-hidden="true" />
          <div className="gy-chrono-cursor" />
        </div>

        <div className="gy-chrono-scale-labels" aria-hidden="true">
          <span>1970</span>
          <span>1980</span>
          <span>1990</span>
          <span>2000</span>
          <span>2010</span>
          <span>2020</span>
        </div>

        <div className="gy-front-lines gy-chrono-bottom-note">
          {["不是为了定义你", "是为了让现实切片找到它的重力"].map((line) => (
            <GuanyaoText key={line} size="body" tone="faint">
              {line}
            </GuanyaoText>
          ))}
        </div>

        {chronoProfile && generatedCard ? (
          <article className="gy-front-panel gy-chrono-prototype-card gyFadeRise">
            <GuanyaoText className="gy-text-instrument" as="span" size="eyebrow" tone="gold">
              时序原型已生成
            </GuanyaoText>
            <div className="gy-front-lines">
              <GuanyaoText size="body" tone="muted">
                出生坐标 {chronoProfile.birthYear} / {padDateUnit(chronoProfile.birthMonth)} / {padDateUnit(chronoProfile.birthDay)} / {chronoProfile.birthTimeRange}
              </GuanyaoText>
              <GuanyaoText size="body" tone="muted">
                时辰读数 {chronoProfile.birthHourBranchLabel}
              </GuanyaoText>
            </div>
            <GuanyaoText as="h3" size="title">
              {generatedCard.trigramSymbol} {generatedCard.trigramName}｜{generatedCard.archetypeName}
            </GuanyaoText>
            <div className="gy-front-lines">
              {["元码已生成，沙漏已点亮", "本次行为因果推演开始", "系统捕获到的 不是性格", "是一股正在推动你反复行动的力量", generatedCard.shortReading, generatedCard.shadowReading].map((line) => (
                <GuanyaoText key={line} size="body" tone="muted">
                  {line}
                </GuanyaoText>
              ))}
            </div>
            <GuanyaoText className="gy-text-muted-coord" size="eyebrow" tone="faint">
              现实分位 {chronoProfile.lifeStageLabel}
            </GuanyaoText>
            <GuanyaoText className="gy-text-muted-coord" size="eyebrow" tone="faint">
              压力权重 {generatedCard.pressureWeights.join(" / ")}
            </GuanyaoText>
          </article>
        ) : null}

        <div className="gy-front-actions">
          {!chronoProfile ? (
            <GuanyaoButton className="gy-front-gate gy-behavior-gate gy-behavior-gate-primary" variant="ghost" onClick={handleGenerate}>
              生成时序原型
            </GuanyaoButton>
          ) : (
            <GuanyaoButton className="gy-front-gate gy-behavior-gate gy-behavior-gate-primary" variant="ghost" onClick={() => navigate("/identity")}>
              进入人格切片
            </GuanyaoButton>
          )}
        </div>
      </section>
    </GuanyaoShell>
  );
}
