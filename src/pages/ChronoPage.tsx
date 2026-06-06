import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { useNavigate } from "react-router-dom";
import { GuanyaoButton } from "../components/visual/GuanyaoButton";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { buildYuanCodeResult } from "../services/codeContractService";
import { setChronoProfile } from "../services/sessionService";
import type { ChronoAgeRange, ChronoProfile, ChronoPrototypeCard } from "../types";

const minBirthYear = 1955;
const maxBirthYear = 2008;
const defaultBirthYear = 1995;
const defaultBirthMonth = 6;
const defaultBirthDay = 2;

type ChronoAxis = "year" | "month" | "day" | "time";
type YuanHotzone = {
  label: string;
  value: string;
  note: string;
};

const sourceDrawerItems: YuanHotzone[] = [
  {
    label: "启动方式",
    value: "先动起来",
    note: "你不是先想清楚再行动。\n一旦现实失重，你会先用动作把自己从坠落感里拽出来。",
  },
  {
    label: "安全补偿",
    value: "忙就安全",
    note: "忙碌对你来说不是效率，而是一种安全补偿。\n只要身体还在推进，你就暂时不用面对停下来的空洞。",
  },
  {
    label: "失控误判",
    value: "停下=坠落",
    note: "你真正害怕的不是慢。\n是一旦停下，就会感觉局面正在失控。",
  },
  {
    label: "第一撞点",
    value: "被评价",
    note: "这股原力最容易被“别人怎么看我”点燃。\n一旦进入评价场，你会立刻启动证明自己的动作。",
  },
];

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

const yuanInstrumentProfiles: Record<string, { sequence: string; coreImpulse: string; shadowInertia: string; assertion: string[]; hotzones: YuanHotzone[] }> = {
  qian: {
    sequence: "SOURCE_01",
    coreImpulse: "主控开局",
    shadowInertia: "加码证明",
    assertion: ["你习惯在失重时先抓回主控，", "用更大的目标维持心智的安全感。", "你不是必须一直向上。", "你只是把停下误认为失控。"],
    hotzones: [
      { label: "初始原力", value: "创世者", note: "你进入沙盒时，第一反应是先定方向、先把盘面拉回手里。" },
      { label: "核心脉冲", value: "主控开局", note: "你习惯用启动和建构抵消失重，让世界重新围绕一个中心运转。" },
      { label: "脉冲惯性", value: "加码证明", note: "压力升高时，你会用更大的目标证明自己还没有失控。" },
      { label: "压力权重", value: "主控秩序", note: "现实对你的拉扯，常落在目标、位置、评价和控制权上。" },
    ],
  },
  kun: {
    sequence: "SOURCE_02",
    coreImpulse: "先行承接",
    shadowInertia: "过度托底",
    assertion: ["你习惯在失重时先把重量接住，", "用持续承载维持局面的表面稳定。", "你不是必须一直退让。", "你只是把不扛误认为崩塌。"],
    hotzones: [
      { label: "初始原力", value: "承载者", note: "你进入沙盒时，第一反应不是争夺，而是先把缺口托住。" },
      { label: "核心脉冲", value: "先行承接", note: "你习惯用退让和容纳延缓失重，让局面暂时不散。" },
      { label: "脉冲惯性", value: "过度托底", note: "压力升高时，你会把更多不属于你的重量接到自己身上。" },
      { label: "压力权重", value: "关系责任", note: "现实对你的拉扯，常落在家庭责任、关系稳定和长期消耗上。" },
    ],
  },
  zhen: {
    sequence: "SOURCE_03",
    coreImpulse: "先发动作",
    shadowInertia: "盲目忙碌",
    assertion: ["你习惯在失重时先动起来，", "用高频动作维持心智的安全感。", "你不是必须一直加速。", "你只是把刹车误认为坠落。"],
    hotzones: [
      { label: "启动方式", value: "先动起来", note: "你不是先想清楚再行动。\n一旦现实失重，你会先用动作把自己从坠落感里拽出来。" },
      { label: "安全补偿", value: "忙就安全", note: "忙碌对你来说不是效率，而是一种安全补偿。\n只要身体还在推进，你就暂时不用面对停下来的空洞。" },
      { label: "失控误判", value: "停下=坠落", note: "你真正害怕的不是慢。\n是一旦停下，就会感觉局面正在失控。" },
      { label: "第一撞点", value: "被评价", note: "这股原力最容易被“别人怎么看我”点燃。\n一旦进入评价场，你会立刻启动证明自己的动作。" },
    ],
  },
  xun: {
    sequence: "SOURCE_04",
    coreImpulse: "顺势绕行",
    shadowInertia: "长期让位",
    assertion: ["你习惯在失重时先降低姿态，", "用绕行换取继续存在的空间。", "你不是没有立场。", "你只是把正面表态误认为绝路。"],
    hotzones: [
      { label: "初始原力", value: "适应者", note: "你进入沙盒时，第一反应是先看风向，再寻找能通过的缝隙。" },
      { label: "核心脉冲", value: "顺势绕行", note: "你习惯用局部调整抵消阻力，把自己放到更安全的位置。" },
      { label: "脉冲惯性", value: "长期让位", note: "压力升高时，你会把一次次退让误认为还能继续前行。" },
      { label: "压力权重", value: "关系风向", note: "现实对你的拉扯，常落在风向、评价、边界和位置感上。" },
    ],
  },
  kan: {
    sequence: "SOURCE_05",
    coreImpulse: "先行下潜",
    shadowInertia: "隔绝确认",
    assertion: ["你习惯在失重时先沉下去，", "用隔绝和确认维持最低限度的安全。", "你不是必须独自下沉。", "你只是把开口误认为危险。"],
    hotzones: [
      { label: "初始原力", value: "深渊者", note: "你进入沙盒时，第一反应是先让外部危险够不到自己。" },
      { label: "核心脉冲", value: "先行下潜", note: "你习惯用沉默和距离抵消冲击，让问题先停在外面。" },
      { label: "脉冲惯性", value: "隔绝确认", note: "压力升高时，你会反复确认危险，却迟迟不真正打开它。" },
      { label: "压力权重", value: "暗处逼近", note: "现实对你的拉扯，常落在信用、风险、孤立和未说出口的压力上。" },
    ],
  },
  li: {
    sequence: "SOURCE_06",
    coreImpulse: "先行显影",
    shadowInertia: "外部续光",
    assertion: ["你习惯在失重时先让自己被看见，", "用外部光源维持人格轮廓。", "你不是必须一直发光。", "你只是把暗下来误认为消失。"],
    hotzones: [
      { label: "初始原力", value: "燃烧者", note: "你进入沙盒时，第一反应是先显影、先表达、先被看见。" },
      { label: "核心脉冲", value: "先行显影", note: "你习惯用表达和亮度抵消失重，确认自己仍然存在。" },
      { label: "脉冲惯性", value: "外部续光", note: "压力升高时，你会更依赖外部回应来证明自己的价值。" },
      { label: "压力权重", value: "外部评价", note: "现实对你的拉扯，常落在曝光、标签、体面和被看见上。" },
    ],
  },
  gen: {
    sequence: "SOURCE_07",
    coreImpulse: "先行停住",
    shadowInertia: "封存拖延",
    assertion: ["你习惯在失重时先停下来，", "用封存边界保存最后的自我。", "你不是必须一直不动。", "你只是把往前一步误认为再次受伤。"],
    hotzones: [
      { label: "初始原力", value: "停滞者", note: "你进入沙盒时，第一反应是先把自己停在不会继续受伤的位置。" },
      { label: "核心脉冲", value: "先行停住", note: "你习惯用收束和阻断抵消冲击，让现实先停在门外。" },
      { label: "脉冲惯性", value: "封存拖延", note: "压力升高时，你会把不打开问题误认为问题还没发生。" },
      { label: "压力权重", value: "边界逼近", note: "现实对你的拉扯，常落在责任、决定、数字和无法再拖的结果上。" },
    ],
  },
  dui: {
    sequence: "SOURCE_08",
    coreImpulse: "先找回应",
    shadowInertia: "关系缓冲",
    assertion: ["你习惯在失重时先寻找回应，", "用连接稀释即将爆发的对抗。", "你不是必须一直缓和。", "你只是把冷场误认为关系断裂。"],
    hotzones: [
      { label: "初始原力", value: "连接者", note: "你进入沙盒时，第一反应是先确认还有没有回应。" },
      { label: "核心脉冲", value: "先找回应", note: "你习惯用连接和缓和抵消失重，让现实不那么硬。" },
      { label: "脉冲惯性", value: "关系缓冲", note: "压力升高时，你会用更多回应换取关系还在的感觉。" },
      { label: "压力权重", value: "关系回响", note: "现实对你的拉扯，常落在关系、气氛、边界和别人是否回应上。" },
    ],
  },
};

function getYuanInstrumentProfile(key?: string) {
  return yuanInstrumentProfiles[key ?? ""] ?? yuanInstrumentProfiles.zhen;
}

function formatYuanSectionName(name: string) {
  const [trigram, archetype] = name.split("｜");
  return trigram && archetype ? `${trigram}｜${archetype}` : name;
}

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
  const [activeYuanHotzone, setActiveYuanHotzone] = useState<string | null>(null);
  const activeMeta = chronoAxisMeta[activeAxis];
  const activeValue = activeAxis === "year" ? birthYear : activeAxis === "month" ? birthMonth : activeAxis === "day" ? birthDay : timeIndex;
  const progress = ((activeValue - activeMeta.min) / (activeMeta.max - activeMeta.min)) * 100;
  const chronoAxisTicks =
    activeAxis === "year"
      ? ["1970", "1980", "1990", "2000", "2010", "2020"]
      : activeAxis === "month"
        ? ["01", "03", "06", "09", "12"]
        : activeAxis === "day"
          ? ["01", "10", "20", "31"]
          : ["子", "卯", "午", "酉", "亥"];

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
  const generatedYuanCode = chronoProfile ? buildYuanCodeResult(chronoProfile) : null;
  const yuanInstrument = getYuanInstrumentProfile(generatedYuanCode?.trigramKey ?? generatedCard?.trigramId);
  const activeYuanHotzoneIndex = yuanInstrument.hotzones.findIndex((hotzone) => hotzone.label === activeYuanHotzone);
  const yuanCodeName =
    generatedYuanCode?.userFacingName ??
    (generatedCard ? `${generatedCard.trigramSymbol} ${generatedCard.trigramName}｜${generatedCard.archetypeName}` : "☳ 震｜行动者");

  useEffect(() => {
    document.body.classList.toggle("gy-source-generated-mode", Boolean(chronoProfile));
    document.body.classList.toggle("gy-chrono-r1-mode", !chronoProfile);
    return () => {
      document.body.classList.remove("gy-source-generated-mode");
      document.body.classList.remove("gy-chrono-r1-mode");
    };
  }, [chronoProfile]);

  return (
    <GuanyaoShell density="compact">
      <section
        className={`gy-front-screen gy-front-instrument gy-chrono-screen gy-causal-line gy-causal-line-anchor${chronoProfile ? "" : " gy-chrono-r1"}`}
        data-generated={chronoProfile ? "true" : "false"}
        data-intensity="quiet"
      >
        {!chronoProfile ? (
          <header className="gy-chrono-r1-header gyFadeRise">
            <span>GY / 00-FIX / CHRONO</span>
            <strong>时 序 装 填</strong>
          </header>
        ) : null}

        {!chronoProfile ? (
          <div
            className="gy-chrono-r1-axis"
            ref={trackRef}
            role="slider"
            aria-label="时序校准轴"
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
            <div className="gy-chrono-r1-axis-line" />
            {chronoAxisTicks.map((tick) => (
              <span key={tick}>
                {tick}
              </span>
            ))}
            <i />
          </div>
        ) : null}

        <div className="gy-chrono-readout gyFadeRise" aria-live="polite" data-dragging={isDragging}>
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
                <span>｜{currentTimeRange.label}断面</span>
              </button>
            </div>
          </div>
        </div>

        <div className="gy-chrono-control-grid" aria-label="校准对象">
          {(["year", "month", "day", "time"] as ChronoAxis[]).map((axis) => (
            <button key={axis} type="button" data-active={activeAxis === axis} onClick={() => setActiveAxis(axis)}>
              {axis === "time" ? "时" : chronoAxisMeta[axis].label}轨.TRACK
            </button>
          ))}
        </div>

        {!chronoProfile ? (
          <GuanyaoText className="gy-text-muted-coord gy-launch-chrono-axis" size="eyebrow" tone="faint">
            {activeMeta.hint}
          </GuanyaoText>
        ) : null}

        <div className="gy-front-lines gy-chrono-bottom-note">
          {["时空重力初速度已就位", "不允许任何自嗨式解释"].map((line) => (
            <GuanyaoText key={line} size="body" tone="faint">
              {line}
            </GuanyaoText>
          ))}
        </div>

        {chronoProfile && generatedCard && generatedYuanCode ? (
          <article className="gy-source-shell gyFadeRise" aria-label="观爻元码初始原力装填">
            <header className="gy-source-header">
              <span>{yuanInstrument.sequence}</span>
              <span>初始动作模式已识别</span>
              <strong>{formatYuanSectionName(yuanCodeName)}</strong>
            </header>

            <main className="gy-source-main">
              <div
                className="gy-source-card"
                data-active-hotzone={activeYuanHotzoneIndex >= 0 ? activeYuanHotzoneIndex + 1 : 0}
                aria-hidden="true"
              >
                <span className="gy-source-card-code">{yuanInstrument.sequence}</span>
                <div className="gy-source-sigil" data-trigram={generatedYuanCode.trigramKey}>
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <span className="gy-source-card-seal">{generatedYuanCode.code8 ?? generatedCard.trigramSymbol}</span>
              </div>

              <div className="gy-source-assertion">
                <p>
                  你习惯在失重时高频动作，
                  <br />
                  借由<span>「不断启动」</span>来维持心智安全感。
                </p>
                <p>
                  你不是一直加速，
                  <br />
                  而是把<strong>「刹车」</strong>误认为<strong>「坠落」</strong>。
                </p>
              </div>
            </main>

            <section className="gy-source-drawer-grid" aria-label="元码参数热区">
              {sourceDrawerItems.map((hotzone) => {
                const isActive = activeYuanHotzone === hotzone.label;
                return (
                  <button
                    key={hotzone.label}
                    className="gy-source-drawer"
                    type="button"
                    aria-expanded={isActive}
                    data-active={isActive}
                    onClick={() => setActiveYuanHotzone(isActive ? null : hotzone.label)}
                  >
                    <span>{hotzone.label}</span>
                    <strong>{hotzone.value}</strong>
                    {isActive ? <em>{hotzone.note}</em> : null}
                  </button>
                );
              })}
            </section>
          </article>
        ) : null}

        <div className={chronoProfile ? "gy-source-gate" : "gy-chrono-r1-gate"}>
          {!chronoProfile ? (
            <GuanyaoButton className="gy-chrono-r1-gate-button" variant="ghost" onClick={handleGenerate}>
              <span>点火，装填我的观爻元码</span>
            </GuanyaoButton>
          ) : (
            <>
              <GuanyaoText className="gy-source-gate-note" size="body" tone="faint">
                极核已装填。第一组人格映照碎片等待抓取。
              </GuanyaoText>
              <GuanyaoButton className="gy-source-gate-button" variant="ghost" onClick={() => navigate("/identity")}>
                拉断第一阀门，抓取人格映照碎片
              </GuanyaoButton>
            </>
          )}
        </div>
      </section>
    </GuanyaoShell>
  );
}
