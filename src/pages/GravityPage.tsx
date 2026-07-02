/**
 * GravityPage = passive UI visualization layer for presenting existing causal state transitions
 * without any influence on engine or data flow.
 */
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { CausalRail } from "../components/causal/CausalRail";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { getGuanyaoR8ReadModel } from "../adapters/guanyaoR8ReadModelAdapter";
import { guanyaoHexagramAssetLibrary } from "../data/guanyaoHexagramAssetLibrary";
import { getPressureSeedSixSpaceProjection } from "../data/guanyaoPressureSeedSixSpaceProjectionRegistry";
import {
  generateSixDimensionalTuningDialogue,
  type GuanyaoLanguageDimension,
  type GuanyaoStarBeastName,
} from "../expression/guanyaoLanguageSystem";
import { getDemoDynamicsResult } from "../services/guanyaoInteractionService";
import { buildMotherCodeAssetLines, getMotherCodeAsset } from "../services/guanyaoMotherCodeAssetService";
import { getSession } from "../services/sessionService";
import { buildMotherCodeResult } from "../services/motherCodeService";
import {
  createDormantCosmicBotanicsSixDimensionState,
  runCosmicBotanicsRuntimeEngine,
  settleCosmicBotanicsBloomState,
  type CosmicBotanicsSixDimensionState,
  type CosmicPetalState,
  type StarbeastFeedback,
  type StarFlowerForm,
  type StarFlowerGrowthState,
} from "../services/guanyaoCosmicBotanicsRuntimeEngine";
import { getCollapseYaoTexts, getGravityYaoTexts } from "../services/yaoTextService";
import { appendInteractiveYaoChoice, generateMockAutoYaoPath, getAutoYaoPath, getInteractiveYaoPath, resetInteractiveYaoPath } from "../services/trajectoryService";
import type { GuanyaoSession, MotherCodeResult, SceneSlice, YaoBit } from "../types";
import type { PressureSeedSixSpaceProjection, PressureSeedSpaceProjection } from "../types/guanyaoPressureSeed";
import { LegacyDynamicsDormant } from "./legacy/LegacyDynamicsDormant";

const USE_HEXAGRAM_DELIVERY_SHELL = true;
const USE_COSMIC_BOTANICS_SIX_SPACE = true;
// DEPRECATED / ISOLATED / NOT IN ACTIVE 1.0 FLOW.
// Legacy six-space, weapon, annular-asset, and demo dynamics branches remain in source only for review.
// They must not become the /dynamics forward user flow while GUANYAO 1.0 uses Cosmic Botanics.
const LEGACY_DYNAMICS_FLOW_ISOLATED = true;
const LEGACY_R1_DEMO_DYNAMICS_ISOLATED = true;
type HexagramAssetCode = keyof typeof guanyaoHexagramAssetLibrary;

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
    reverseGap: "1 · 防线尚未确认",
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
  surface?: string;
  shell?: string;
};

type BodyIntensity = "yao1" | "yao2" | "yao3";
type BodySpaceStep = "entry" | "breakthrough" | "weapon" | "completed";
type BodyWeapon = "pause" | "breath";
type EmotionIntensity = "yao1" | "yao2" | "yao3";
type EmotionSpaceStep = "entry" | "breakthrough" | "weapon" | "completed";
type EmotionWeapon = "pause" | "name";
type BreakthroughStep = 0 | 1 | 2;
type SixSpaceId = "body" | "emotion" | "thought" | "action" | "memory" | "goal";
type SixSpaceRuntimeStep = "entry" | "breakthrough" | "weapon" | "completed";
type SixSpaceIntensity = "yao1" | "yao2" | "yao3";
type SixSpaceWeaponId = string;
type AssetStep = "preview" | "confirm" | "unlocked";
type ActionArtifactStage = "interact" | "break" | "front" | "flipping" | "back" | "sandify";
type MemoryArtifactStage = "interact" | "break" | "front" | "flipping" | "back" | "sandify";
type GoalFinalStage = "interact" | "break" | "front" | "flipping" | "back" | "sandify";
type PersonaStarOrigin = {
  index?: number;
  intensity?: number;
  resonance?: number;
};
type PersonaOutputSnapshotView = {
  motherCode?: string;
  direction?: string;
  starOrigin?: PersonaStarOrigin | string;
  trigram?: string;
};
type RuntimeCoreStar = readonly [number, number, number];
type AssetFuseStage = "interact" | "break" | "crystal";
type SixSpaceWeapon = {
  id: SixSpaceWeaponId;
  name: string;
  cost: 1 | 2;
  description: string;
  completionLines: string[];
};
type SixSpaceConfig = {
  id: SixSpaceId;
  no: number;
  code: string;
  name: string;
  headline: string;
  transformation: string;
  intensityOptions: Array<{ value: SixSpaceIntensity; label: string }>;
  oldReaction: string;
  breakthroughSteps: Array<{ title: string; lines: string[]; rightHint: string }>;
  weapons: SixSpaceWeapon[];
  completedRightHint: string;
};

type AwakenedWeaponAsset = {
  space: string;
  spaceId: SixSpaceId;
  weaponId: string;
  weaponName: string;
  actionText: string;
};
type TriggerDefenseCard = {
  triggerScene: string;
  oldReaction: string;
  takeoverWarning: string;
  defenseAction: string;
  awakenedWeaponName?: string;
};
type FirstAction72h = {
  actionTitle: string;
  actionTiming: string;
  actionScene: string;
  actionInstruction: string;
  antiInstinctPoint: string;
  linkedWeaponName?: string;
};

const bodyIntensityOptions: Array<{ value: BodyIntensity; label: string }> = [
  { value: "yao1", label: "有一点，但不明显" },
  { value: "yao2", label: "能感觉到，还能撑" },
  { value: "yao3", label: "身体已经在反应了" },
];

const bodyLoadCaliperLevels: Array<{
  value: BodyIntensity;
  mark: string;
  title: string;
  line: string;
}> = [
  {
    value: "yao1",
    mark: "Ⅰ",
    title: "有一点，但不明显",
    line: "你的身体在悄悄报警，但你的理智选择假装听不见。",
  },
  {
    value: "yao2",
    mark: "Ⅱ",
    title: "能感觉到，还能撑",
    line: "你的肩背已经开始收紧，正在靠意志力继续压住。",
  },
  {
    value: "yao3",
    mark: "Ⅲ",
    title: "身体已经在反应了",
    line: "你的旧反应是：撑着，假装没事。直到手心已经全是冷汗。",
  },
];

function getBodyCaliperIndex(progress: number) {
  if (progress < 0.34) return 0;
  if (progress < 0.67) return 1;
  return 2;
}

function getBodyCaliperProgress(value: BodyIntensity | null) {
  if (value === "yao1") return 0.24;
  if (value === "yao3") return 0.76;
  return 0.5;
}

const bodyCaliperMarkProgress = [0.24, 0.5, 0.76] as const;

const thoughtLoadCaliperLevels: Array<{
  value: SixSpaceIntensity;
  mark: string;
  title: string;
  line: string;
}> = [
  {
    value: "yao1",
    mark: "Ⅰ",
    title: "有一点，但还能停",
    line: "脑子里在隐蔽自证，但如果你强行闭嘴，空转还能被理智刹住。",
  },
  {
    value: "yao2",
    mark: "Ⅱ",
    title: "一直在转，停不下来",
    line: "逻辑黑洞开始吞噬现实。你表面沉默，内心已经大战了一百回合。",
  },
  {
    value: "yao3",
    mark: "Ⅲ",
    title: "已经在替你回答问题了",
    line: "你的旧反应是：把解释当成证明。还没开口，行为已经僵死。",
  },
];

function getThoughtCaliperIndex(progress: number) {
  if (progress < 0.36) return 0;
  if (progress < 0.71) return 1;
  return 2;
}

const thoughtRailSegments = [
  { start: 0, end: 0.14, y: -4 },
  { start: 0.14, end: 0.28, y: 4 },
  { start: 0.28, end: 0.42, y: -2 },
  { start: 0.42, end: 0.56, y: 5 },
  { start: 0.56, end: 0.7, y: -5 },
  { start: 0.7, end: 0.84, y: 3 },
  { start: 0.84, end: 1, y: -3 },
] as const;

function getThoughtRailYOffset(progress: number) {
  const segment = thoughtRailSegments.find((item) => progress >= item.start && progress <= item.end);
  return segment?.y ?? thoughtRailSegments[thoughtRailSegments.length - 1].y;
}

function getActionGravityCurveX(progress: number) {
  const controlX = 52 - progress * 76;
  return (1 - progress) * (1 - progress) * 52 + 2 * (1 - progress) * progress * controlX + progress * progress * 52;
}

function getMemorySmokeRailY(progress: number) {
  return 40 + Math.sin((1 - progress) * Math.PI) * 24;
}

function getGoalTearCurveY(progress: number) {
  return 40 - Math.sin(progress * Math.PI) * 28;
}

const bodyWeaponOptions: Array<{ value: BodyWeapon; label: string; cost: number; line: string; completedLines: string[] }> = [
  {
    value: "pause",
    label: "停一下",
    cost: 1,
    line: "在身体准备防御时，故意不绷紧。",
    completedLines: ["下一次身体准备防御时，", "故意不绷紧。"],
  },
  {
    value: "breath",
    label: "松一口气，再开口",
    cost: 2,
    line: "下一次被质疑时，先松一口气，再开口。",
    completedLines: ["下一次被质疑时，", "先松一口气，", "再开口。"],
  },
];

const bodyBreakthroughScenes: Array<{ title: string; lines: string[] }> = [
  {
    title: "它开始应激了。",
    lines: ["一道命令，", "一个眼神，", "身体瞬间绷直，", "准备好防御。"],
  },
  {
    title: "它认输了。",
    lines: ["你的身体，比你先认输了。", "不是不够强，", "是它替你撑了太久。"],
  },
  {
    title: "它问你：",
    lines: ["这口气，", "还要顶到什么时候？", "如果不想再这样撑下去，", "左滑，选择武器。"],
  },
];

const emotionIntensityOptions: Array<{ value: EmotionIntensity; label: string }> = [
  { value: "yao1", label: "有一点，但不明显" },
  { value: "yao2", label: "能感觉到，还能压" },
  { value: "yao3", label: "情绪已经在接管了" },
];

const emotionLoadCaliperLevels: Array<{
  value: EmotionIntensity;
  mark: string;
  title: string;
  line: string;
}> = [
  {
    value: "yao1",
    mark: "Ⅰ",
    title: "有一点，但不明显",
    line: "你的潜意识在压制，表面说挺好的，内核已经开始排异。",
  },
  {
    value: "yao2",
    mark: "Ⅱ",
    title: "能感觉到，还能压",
    line: "你在脑子里寻找解释来换安全，但无名火已经在胸口翻滚。",
  },
  {
    value: "yao3",
    mark: "Ⅲ",
    title: "情绪已经在接管了",
    line: "你的旧反应是：用解释换安全。一个眼神，就足够让内核破功。",
  },
];

function getEmotionCaliperIndex(progress: number) {
  if (progress < 0.36) return 0;
  if (progress < 0.71) return 1;
  return 2;
}

function getEmotionCaliperProgress(value: EmotionIntensity | null) {
  if (value === "yao1") return 0.24;
  if (value === "yao3") return 0.76;
  return 0.5;
}

const emotionWeaponOptions: Array<{ value: EmotionWeapon; label: string; cost: number; line: string; completedLines: string[] }> = [
  {
    value: "pause",
    label: "停一下",
    cost: 1,
    line: "在情绪接管前，故意等三秒。",
    completedLines: ["下一次情绪准备接管时，", "故意等三秒。", "先停住，", "再开口。"],
  },
  {
    value: "name",
    label: "命名它",
    cost: 2,
    line: "下一次恐惧来时，先说出它的名字。",
    completedLines: ["下一次恐惧来时，", "先说出它的名字：", "这是恐惧，", "不是事实。"],
  },
];

const emotionBreakthroughScenes: Array<{ title: string; lines: string[] }> = [
  {
    title: "它开始恐惧了。",
    lines: ["一句质疑，", "一个眼神，", "恐惧已经从胃底升上来。"],
  },
  {
    title: "它压不住了。",
    lines: ["你开始解释，", "开始讨好，", "开始把别人的评价当成安全感。"],
  },
  {
    title: "它问你：",
    lines: ["你怕的，", "到底是什么？", "如果不想再靠解释换安全，", "左滑，选择武器。"],
  },
];

const sixSpaceConfigs: SixSpaceConfig[] = [
  {
    id: "body",
    no: 1,
    code: "BODY",
    name: "身体空间",
    headline: "你的身体，比你先认输了。",
    transformation: "它一进身体，\n最先变成了肩背收紧、呼吸变浅、还没开口就开始紧张。",
    intensityOptions: bodyIntensityOptions,
    oldReaction: "你的旧反应是：撑着，假装没事。",
    breakthroughSteps: bodyBreakthroughScenes.map((scene, index) => ({
      ...scene,
      rightHint: index === 0 ? "右滑，继续看它怎么接管你" : index === 1 ? "右滑，继续" : "右滑，停在这里",
    })),
    weapons: bodyWeaponOptions.map((weapon) => ({
      id: weapon.value,
      name: weapon.label,
      cost: weapon.cost as 1 | 2,
      description: weapon.line,
      completionLines: weapon.completedLines,
    })),
    completedRightHint: "右滑，进入下一空间",
  },
  {
    id: "emotion",
    no: 2,
    code: "EMOTION",
    name: "情绪空间",
    headline: "你被不安接管了。",
    transformation: "你还没反应过来，\n情绪已经先到了。",
    intensityOptions: emotionIntensityOptions,
    oldReaction: "你的旧反应是：用解释换安全。",
    breakthroughSteps: emotionBreakthroughScenes.map((scene, index) => ({
      ...scene,
      rightHint: index === 0 ? "右滑，继续看它怎么接管你" : index === 1 ? "右滑，继续" : "右滑，停在这里",
    })),
    weapons: emotionWeaponOptions.map((weapon) => ({
      id: weapon.value,
      name: weapon.label,
      cost: weapon.cost as 1 | 2,
      description: weapon.line,
      completionLines: weapon.completedLines,
    })),
    completedRightHint: "右滑，进入下一空间",
  },
  {
    id: "thought",
    no: 3,
    code: "THOUGHT",
    name: "思维空间",
    headline: "你又在反复解释了。",
    transformation: "你还没说完，\n脑子里已经开始组织下一句解释了。",
    intensityOptions: [
      { value: "yao1", label: "有一点，但还能停" },
      { value: "yao2", label: "一直在转，停不下来" },
      { value: "yao3", label: "已经在替你回答问题了" },
    ],
    oldReaction: "你的旧反应是：把解释，当成了证明。",
    breakthroughSteps: [
      {
        title: "它开始自动解释了。",
        lines: ["对方还没开口，", "你的脑子已经把答案准备好了。"],
        rightHint: "右滑，继续",
      },
      {
        title: "它停不下来了。",
        lines: ["你反复想：", "“如果当时这样说就好了。”", "把过去的事，", "重放了一遍又一遍。"],
        rightHint: "右滑，继续",
      },
      {
        title: "它问你：",
        lines: ["你解释的，", "到底是谁的问题？", "如果不想再被思维拖着走，", "左滑，选择武器。"],
        rightHint: "右滑，停在这里",
      },
    ],
    weapons: [
      {
        id: "pause",
        name: "停一下",
        cost: 1,
        description: "在解释之前，先问一句：他真的在听吗？",
        completionLines: ["下一次想解释之前，", "先问一句：", "他真的在听吗？"],
      },
      {
        id: "name",
        name: "命名它",
        cost: 2,
        description: "认出‘我在解释’，然后停下来。",
        completionLines: ["下一次开始反复解释时，", "先认出它：", "我在解释。", "然后停下来。"],
      },
    ],
    completedRightHint: "右滑，进入下一空间",
  },
  {
    id: "action",
    no: 4,
    code: "ACTION",
    name: "行为空间",
    headline: "你想做，但卡住了。",
    transformation: "你脑子里想了无数遍，\n手还在原处。",
    intensityOptions: [
      { value: "yao1", label: "有一点犹豫" },
      { value: "yao2", label: "想做，但不敢" },
      { value: "yao3", label: "已经卡住很久了" },
    ],
    oldReaction: "你的旧反应是：把想法，卡成永远。",
    breakthroughSteps: [
      {
        title: "它开始犹豫了。",
        lines: ["你想动，", "但有一个声音说：", "再等等。"],
        rightHint: "右滑，继续",
      },
      {
        title: "它卡住了。",
        lines: ["你准备好了，", "但手按不下发送。"],
        rightHint: "右滑，继续",
      },
      {
        title: "它问你：",
        lines: ["你在等的，", "到底是什么？", "如果不想再卡下去，", "左滑，选择武器。"],
        rightHint: "右滑，停在这里",
      },
    ],
    weapons: [
      {
        id: "small-step",
        name: "止动盾",
        cost: 2,
        description: "把想法从脑内推出最小一步。",
        completionLines: ["今天，只做最小的一步。", "不解释，", "不说服，", "让手先动起来。"],
      },
      {
        id: "name",
        name: "命名它",
        cost: 1,
        description: "认出‘我在等’，然后按下去。",
        completionLines: ["当你又开始等时，", "先认出它：", "我在等。", "然后按下去。"],
      },
    ],
    completedRightHint: "右滑，进入下一空间",
  },
  {
    id: "memory",
    no: 5,
    code: "MEMORY",
    name: "记忆空间",
    headline: "以前也这样过。",
    transformation: "你还没反应，\n记忆已经先替你回答了。",
    intensityOptions: [
      { value: "yao1", label: "偶尔想起" },
      { value: "yao2", label: "经常回来" },
      { value: "yao3", label: "已经在替你判断了" },
    ],
    oldReaction: "你的旧反应是：用过去的失败，预判现在的结果。",
    breakthroughSteps: [
      {
        title: "它开始回放了。",
        lines: ["一个类似的场景，", "一种熟悉的难受。"],
        rightHint: "右滑，继续",
      },
      {
        title: "它替你回答了。",
        lines: ["“上次也是这样，", "你不行。”"],
        rightHint: "右滑，继续",
      },
      {
        title: "它问你：",
        lines: ["上次是上次，", "这次还是吗？", "如果不想再被记忆绑架，", "左滑，选择武器。"],
        rightHint: "右滑，停在这里",
      },
    ],
    weapons: [
      {
        id: "wind-cutter",
        name: "听风刀",
        cost: 2,
        description: "把旧失败从眼前切开。",
        completionLines: ["这一次，", "先听见现在的风，", "不要让过去替你回答。"],
      },
      {
        id: "name",
        name: "命名它",
        cost: 1,
        description: "认出‘这是记忆，不是事实’。",
        completionLines: ["当旧经验开始替你判断时，", "先认出它：", "这是记忆，", "不是事实。"],
      },
    ],
    completedRightHint: "右滑，进入下一空间",
  },
  {
    id: "goal",
    no: 6,
    code: "GOAL",
    name: "目标空间",
    headline: "你不知道该往哪走。",
    transformation: "你停在原地，\n不是因为不想走。",
    intensityOptions: [
      { value: "yao1", label: "有一点模糊" },
      { value: "yao2", label: "看不清，但还在动" },
      { value: "yao3", label: "已经很久不知道了" },
    ],
    oldReaction: "你的旧反应是：假装不需要，就不怕得不到。",
    breakthroughSteps: [
      {
        title: "它开始模糊了。",
        lines: ["你以前知道想要什么，", "现在不确定了。"],
        rightHint: "右滑，继续",
      },
      {
        title: "它遮蔽了方向。",
        lines: ["你停在原地，", "不是不想走，", "是不知道往哪走。"],
        rightHint: "右滑，继续",
      },
      {
        title: "它问你：",
        lines: ["你真正在乎的，", "到底是什么？", "如果你想重新看清方向，", "左滑，选择武器。"],
        rightHint: "右滑，停在这里",
      },
    ],
    weapons: [
      {
        id: "look-back",
        name: "往回看",
        cost: 1,
        description: "你曾经最在乎的是什么？",
        completionLines: ["写下你曾经最在乎的一件事。", "不问对错，", "只写。"],
      },
      {
        id: "look-forward",
        name: "往前看",
        cost: 2,
        description: "你希望一年后的自己是什么样？",
        completionLines: ["写下一年后的自己。", "不求完整，", "只写一句。"],
      },
    ],
    completedRightHint: "右滑，完成本次推演",
  },
];

const sixSpacePatternSummary = [
  { space: "身体", pattern: "撑着，假装没事" },
  { space: "情绪", pattern: "用解释换安全" },
  { space: "思维", pattern: "把解释，当成了证明" },
  { space: "行为", pattern: "把想法，卡成永远" },
  { space: "记忆", pattern: "用过去的失败，预判现在的结果" },
  { space: "目标", pattern: "假装不需要，就不怕得不到" },
];

const assetPackItems = [
  "母码资产",
  "卦码资产",
  "六维旧路径地图",
  "已唤醒武器卡",
  "下次触发防御卡",
  "72小时第一动作",
  "年轮墙永久记录",
];

const sixSpacePathMap = [
  "身体先紧张",
  "情绪开始不安",
  "思维开始解释",
  "行动开始卡住",
  "记忆拿过去做判断",
  "目标变得模糊",
];

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

function buildSpaceRecord<T>(value: T): Record<SixSpaceId, T> {
  return {
    body: value,
    emotion: value,
    thought: value,
    action: value,
    memory: value,
    goal: value,
  };
}

function resolveHexagramAssetCode({
  hexagramCode,
  hexagramName,
}: {
  hexagramCode?: string;
  hexagramName?: string;
}): HexagramAssetCode | null {
  const normalizedCode = hexagramCode?.trim().replace(/^NO\./i, "").padStart(3, "0") ?? "";
  if (normalizedCode in guanyaoHexagramAssetLibrary) {
    return normalizedCode as HexagramAssetCode;
  }

  const byName = Object.values(guanyaoHexagramAssetLibrary).find((asset) => asset.name === hexagramName?.trim());
  return byName ? (byName.code as HexagramAssetCode) : null;
}

function buildHexagramAssetLines(asset: (typeof guanyaoHexagramAssetLibrary)[HexagramAssetCode] | null) {
  if (!asset) {
    return ["本局卦码资产正在沉积，暂未完成读取。"];
  }

  return [
    `本局处境：${asset.situation}`,
    `困住你的旧方式：${asset.trappedPattern}`,
    `这一局要你看见：${asset.changeReminder}`,
    `资产回收：${asset.assetReturn}`,
  ];
}

function cleanOldReaction(reaction: string) {
  return reaction.replace(/^你的旧反应是：/, "").replace(/。$/, "");
}

function buildTriggerDefenseCard({
  seedSurface,
  awakenedWeapons,
}: {
  seedSurface: string;
  awakenedWeapons: AwakenedWeaponAsset[];
}): TriggerDefenseCard {
  const lastAwakenedWeapon = awakenedWeapons[awakenedWeapons.length - 1];
  const oldReaction = sixSpaceConfigs
    .map((space) => `${space.name.replace("空间", "")}：${cleanOldReaction(space.oldReaction)}`)
    .join("；");
  const triggerScene = `下次再遇到「${seedSurface}」这类刺时。`;

  if (lastAwakenedWeapon) {
    return {
      triggerScene,
      oldReaction,
      takeoverWarning: "旧反应会先接管。你可能还没开口，就已经开始解释、证明、撑住或退回熟悉的路。",
      defenseAction: lastAwakenedWeapon.actionText,
      awakenedWeaponName: lastAwakenedWeapon.weaponName,
    };
  }

  return {
    triggerScene,
    oldReaction,
    takeoverWarning: "旧反应会先接管。你可能会沿着熟悉路径继续反应。",
    defenseAction: "先停一秒，不立刻沿旧反应走下去。",
  };
}

function buildFirstAction72h({
  triggerDefenseCard,
  awakenedWeapons,
}: {
  triggerDefenseCard: TriggerDefenseCard;
  awakenedWeapons: AwakenedWeaponAsset[];
}): FirstAction72h {
  const lastAwakenedWeapon = awakenedWeapons[awakenedWeapons.length - 1];

  if (lastAwakenedWeapon) {
    return {
      actionTitle: `先调用「${lastAwakenedWeapon.weaponName}」`,
      actionTiming: "未来72小时内",
      actionScene: triggerDefenseCard.triggerScene,
      actionInstruction: lastAwakenedWeapon.actionText || triggerDefenseCard.defenseAction,
      antiInstinctPoint: "不立刻解释、证明、撑住或退回熟悉的路，先让本局武器插进旧反应里。",
      linkedWeaponName: lastAwakenedWeapon.weaponName,
    };
  }

  return {
    actionTitle: "先停一秒",
    actionTiming: "未来72小时内",
    actionScene: triggerDefenseCard.triggerScene,
    actionInstruction: "当这根刺再次出现时，先停一秒，不立刻沿旧反应走下去。",
    antiInstinctPoint: "不急着解释、证明、撑住或退回熟悉的路。",
  };
}

function getSelectedWeaponStorageKey(spaceId: SixSpaceId) {
  return `guanyao:selected${spaceId[0].toUpperCase()}${spaceId.slice(1)}Weapon`;
}

function getLegacySelectedWeaponStorageKeys(spaceId: SixSpaceId) {
  if (spaceId === "body") return ["guanyao:selectedBodyWeapon"];
  if (spaceId === "emotion") return ["guanyao:selectedEmotionWeapon"];

  return [getSelectedWeaponStorageKey(spaceId)];
}

function normalizeWeaponId(spaceId: SixSpaceId, weaponId: string | null | undefined) {
  if (!weaponId) return null;

  const aliases: Record<string, Record<string, string>> = {
    action: {
      smallStep: "small-step",
    },
    goal: {
      lookBack: "look-back",
      lookForward: "look-forward",
    },
  };

  return aliases[spaceId]?.[weaponId] ?? weaponId;
}

function readStringFromStorage(keys: string[]) {
  if (typeof window === "undefined") return null;

  for (const key of keys) {
    const value = window.localStorage.getItem(key);
    if (value) return value;
  }

  return null;
}

function readBooleanFromStorage(keys: string[]) {
  if (typeof window === "undefined") return false;

  return keys.some((key) => window.localStorage.getItem(key) === "true");
}

function getAwakenedWeapons(args: {
  configs: SixSpaceConfig[];
  selectedBodyWeapon: BodyWeapon | null;
  selectedEmotionWeapon: EmotionWeapon | null;
  selectedSpaceWeapons: Record<SixSpaceId, SixSpaceWeaponId | null>;
  bodySpaceStep: BodySpaceStep;
  emotionSpaceStep: EmotionSpaceStep;
  spaceSteps: Record<SixSpaceId, SixSpaceRuntimeStep>;
}): AwakenedWeaponAsset[] {
  return args.configs.flatMap((config) => {
    const completed = readBooleanFromStorage([`guanyao:${config.id}BreakthroughCompleted`]) ||
      (config.id === "body" && args.bodySpaceStep === "completed") ||
      (config.id === "emotion" && args.emotionSpaceStep === "completed") ||
      args.spaceSteps[config.id] === "completed";
    const stateWeaponId =
      config.id === "body"
        ? args.selectedBodyWeapon || args.selectedSpaceWeapons.body
        : config.id === "emotion"
          ? args.selectedEmotionWeapon || args.selectedSpaceWeapons.emotion
          : args.selectedSpaceWeapons[config.id];
    const storedWeaponId = readStringFromStorage(getLegacySelectedWeaponStorageKeys(config.id));
    const selectedWeaponId = normalizeWeaponId(config.id, stateWeaponId || storedWeaponId);
    const weapon = config.weapons.find((candidate) => candidate.id === selectedWeaponId);

    if (!completed || !weapon) return [];

    return [
      {
        space: config.name.replace("空间", ""),
        spaceId: config.id,
        weaponId: weapon.id,
        weaponName: weapon.name,
        actionText: weapon.completionLines.join(""),
      },
    ];
  });
}

function getUsableHexagramText(values: Array<string | undefined>, fallback: string) {
  for (const value of values) {
    const trimmed = value?.trim();
    if (!trimmed) continue;
    if (trimmed === "本局卦码" || trimmed === "本局读取" || trimmed === "读取中") continue;
    return trimmed;
  }

  return fallback;
}

function getMotherCodeFromSession(session: GuanyaoSession): MotherCodeResult {
  return session.currentMotherCode ?? session.motherCodeResult ?? session.motherCode ?? buildMotherCodeResult(session);
}

function getProjectionForYaoLayer(
  projection: PressureSeedSixSpaceProjection,
  yaoLayer?: string,
): PressureSeedSpaceProjection | undefined {
  if (yaoLayer === "body") return projection.body;
  if (yaoLayer === "emotion") return projection.emotion;
  if (yaoLayer === "thought") return projection.thought;
  if (yaoLayer === "behavior") return projection.action;
  if (yaoLayer === "memory") return projection.memory;
  if (yaoLayer === "motivation") return projection.motive;

  return undefined;
}

function buildSpaceNarrativeLines(projection?: PressureSeedSpaceProjection) {
  return [projection?.takeover, projection?.reaction]
    .map((line) => line?.trim())
    .filter((line): line is string => Boolean(line))
    .slice(0, 3);
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

function resolveCosmicStarBeastName(starFlowerForm: StarFlowerForm): GuanyaoStarBeastName {
  const starBeastNameByForm: Record<StarFlowerForm, GuanyaoStarBeastName> = {
    qinglong: "青龙",
    baihu: "白虎",
    zhuque: "朱雀",
    xuanwu: "玄武",
  };

  return starBeastNameByForm[starFlowerForm];
}

function resolveCosmicNarrativeDimension(spaceId: SixSpaceId | undefined): GuanyaoLanguageDimension {
  if (spaceId === "action") return "behavior";
  if (spaceId === "goal") return "motivation";
  return spaceId ?? "body";
}

function hashPersonaStarInput(input: string) {
  let hash = 2166136261;

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return Math.abs(hash >>> 0);
}

function resolveStarOriginSeed(snapshot: PersonaOutputSnapshotView | null) {
  const origin = snapshot?.starOrigin;

  if (origin && typeof origin === "object") {
    return {
      index: origin.index ?? 0,
      intensity: origin.intensity ?? 1,
      resonance: origin.resonance ?? 1,
    };
  }

  const fallbackSeed = hashPersonaStarInput(
    `${snapshot?.motherCode ?? "MOTHER_PENDING"}|${snapshot?.direction ?? "白虎"}|${snapshot?.trigram ?? "兑"}|${origin ?? ""}`,
  );

  return {
    index: fallbackSeed % 28,
    intensity: (fallbackSeed % 7) + 1,
    resonance: (fallbackSeed % 5) + 1,
  };
}

function buildRuntimeBaiHuCoreStars(snapshot: PersonaOutputSnapshotView | null): RuntimeCoreStar[] {
  const starOrigin = resolveStarOriginSeed(snapshot);
  const directionSeed = hashPersonaStarInput(`${snapshot?.direction ?? "白虎"}|${snapshot?.motherCode ?? ""}`);
  const phase = (starOrigin.index % 7) - 3;
  const lift = (starOrigin.resonance - 3) * 0.72;
  const stretch = 1 + (starOrigin.intensity - 4) * 0.012;
  const tailRise = (directionSeed % 4) * 0.8;
  const baseStars: RuntimeCoreStar[] = [
    [20, 42, 6.2],
    [31, 35, 5.2],
    [44, 31, 5.6],
    [58, 28, 6.8],
    [70, 31, 5.4],
    [79, 36, 5.8],
    [86, 42, 5.2],
  ];

  return baseStars.map(([x, y, size], index) => {
    const spineWave = Math.sin((index + phase) * 0.84) * 1.8;
    const tailBias = index >= 5 ? -tailRise * (index - 4) : 0;
    const shoulderBias = index === 1 || index === 2 ? -starOrigin.intensity * 0.16 : 0;

    return [
      50 + (x - 50) * stretch,
      y + spineWave + lift + tailBias + shoulderBias,
      size + (index === starOrigin.index % 7 ? 1.1 : 0),
    ] as RuntimeCoreStar;
  });
}

type CosmicNarrativePhase = "field_intro" | "seed_visible" | "beast_guide" | "node_active" | "node_complete";

type BaiHuConstellationLayerProps = {
  toneColor: string;
  narrativePhase: CosmicNarrativePhase;
  activeNodeIndex: number;
  onCoreStarClick: () => void;
  coreStars: RuntimeCoreStar[];
};

function BaiHuConstellationLayer({ toneColor, narrativePhase, activeNodeIndex, onCoreStarClick, coreStars }: BaiHuConstellationLayerProps) {
  const reveal = narrativePhase === "field_intro" ? 0.34 : narrativePhase === "seed_visible" ? 0.66 : 1;
  const bodyAlpha = narrativePhase === "beast_guide" || narrativePhase === "node_active" || narrativePhase === "node_complete" ? 0.82 : 0.2;
  const nodeCharge = Math.min(1, Math.max(0, activeNodeIndex / 6));
  const coreGlow = 0.26 + reveal * 0.24 + nodeCharge * 0.22;
  const coreLineAlpha = 0.04 + reveal * 0.14 + nodeCharge * 0.06;
  const headShape = [
    [7, 44, 1.7], [9, 39, 1.6], [12, 35, 1.7], [15, 32, 1.8], [19, 33, 1.6],
    [22, 36, 1.8], [24, 40, 1.7], [23, 44, 1.5], [20, 48, 1.5], [17, 51, 1.7],
    [13, 52, 1.6], [9, 50, 1.8], [5, 48, 1.4], [4, 43, 1.2], [6, 38, 1.3],
    [10, 34, 1.4], [13, 29, 1.5], [17, 29, 1.4], [21, 31, 1.3], [26, 37, 1.2],
    [6, 53, 1.2], [10, 56, 1.4], [15, 56, 1.5], [20, 53, 1.3], [20, 42, 3.3],
    [12, 41, 1.7], [14, 45, 1.6], [16, 39, 1.4], [18, 36, 1.3],
  ] as const;
  const headDust = headShape.map(([left, top, size], index) => ({
    left,
    top,
    size,
    delay: (index % 8) * 115,
    alpha: index === headShape.length - 1 ? 0.68 : 0.26 + ((index * 5) % 9) / 78,
  }));
  const backDust = Array.from({ length: 38 }).map((_, index) => {
    const t = index / 37;
    return {
      left: 24 + t * 59,
      top: 42 - Math.sin(t * Math.PI) * 16 + Math.sin(t * 14) * 1.2,
      size: 1.4 + (index % 4) * 0.25,
      delay: (index % 10) * 110,
      alpha: 0.2 + ((index * 7) % 8) / 86,
    };
  });
  const bellyDust = Array.from({ length: 18 }).map((_, index) => {
    const t = index / 17;
    return {
      left: 25 + t * 49,
      top: 56 + Math.sin(t * Math.PI) * 5 + Math.cos(t * 13) * 1.8,
      size: 1.2 + (index % 3) * 0.3,
      delay: (index % 9) * 125,
      alpha: 0.15 + ((index * 3) % 8) / 100,
    };
  });
  const legDust = [
    ...Array.from({ length: 9 }).map((_, index) => ({ left: 29 + index * 0.35 + Math.sin(index * 0.8) * 2, top: 56 + index * 3.4, group: 0 })),
    ...Array.from({ length: 8 }).map((_, index) => ({ left: 42 + index * 0.75 - Math.sin(index * 0.7) * 1.7, top: 55 + index * 3.3, group: 1 })),
    ...Array.from({ length: 10 }).map((_, index) => ({ left: 60 + index * 0.45 + Math.sin(index * 0.65) * 2.2, top: 55 + index * 3.6, group: 2 })),
    ...Array.from({ length: 8 }).map((_, index) => ({ left: 75 + index * 0.92 - Math.sin(index * 0.75) * 1.6, top: 53 + index * 3.2, group: 3 })),
  ].map((particle, index) => ({
    left: particle.left,
    top: particle.top,
    size: 1.25 + (particle.group % 2) * 0.34,
    delay: (index % 12) * 95,
    alpha: 0.18 + ((index * 4) % 8) / 96,
  }));
  const tailDust = Array.from({ length: 38 }).map((_, index) => {
    const t = index / 37;
    const angle = t * Math.PI * 1.92;
    return {
      left: 78 + Math.sin(angle) * 13 + t * 12,
      top: 42 - Math.sin(t * Math.PI) * 39 + Math.cos(angle) * 5,
      size: 1.1 + (index % 4) * 0.25,
      delay: (index % 10) * 105,
      alpha: 0.16 + ((index * 6) % 8) / 100,
    };
  });
  const tailTipDust = [
    [95, 21, 2.5],
    [97, 17, 1.7],
    [93, 14, 1.5],
    [90, 18, 1.3],
    [91, 24, 1.4],
  ] as const;
  const tailTipParticles = tailTipDust.map(([left, top, size], index) => ({
    left,
    top,
    size,
    delay: index * 130,
    alpha: index === 0 ? 0.54 : 0.24 + index * 0.04,
  }));
  const silhouetteDust = [...headDust, ...backDust, ...bellyDust, ...legDust, ...tailDust, ...tailTipParticles];
  const innerDust = Array.from({ length: 32 }).map((_, index) => ({
    left: 27 + ((index * 17) % 48),
    top: 39 + ((index * 19) % 19),
    size: 1.2 + (index % 3) * 0.45,
    delay: (index % 9) * 170,
    alpha: 0.08 + nodeCharge * 0.16 + ((index * 5) % 8) / 110,
  }));

  return (
    <div
      aria-label="白虎七星"
      style={{
        position: "absolute",
        left: "50%",
        top: "18%",
        width: 242,
        height: 146,
        transform: "translate(-50%, -50%)",
        opacity: 0.62 + reveal * 0.3,
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "visible",
          filter: `drop-shadow(0 0 ${10 + nodeCharge * 14}px rgba(${toneColor},${coreGlow}))`,
        }}
      >
        <path
          d={coreStars.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`).join(" ")}
          fill="none"
          stroke={`rgba(${toneColor},${coreLineAlpha})`}
          strokeWidth="0.42"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            animation:
              narrativePhase === "seed_visible" || narrativePhase === "beast_guide"
                ? "gy-starbeast-line 680ms ease-out both"
                : "none",
            }}
          />
      </svg>

      {silhouetteDust.map((particle, index) => (
        <span
          key={`silhouette-${index}`}
          style={{
            position: "absolute",
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
            borderRadius: 999,
            transform: "translate(-50%, -50%)",
            background: `rgba(255,248,224,${particle.alpha + bodyAlpha * 0.34})`,
            boxShadow: `0 0 ${5 + nodeCharge * 5}px rgba(${toneColor},${0.14 + bodyAlpha * 0.16})`,
            animation: `gy-starbeast-dust 3.4s ease-in-out infinite ${particle.delay}ms`,
          }}
        />
      ))}

      {innerDust.map((particle, index) => (
        <span
          key={`inner-${index}`}
          style={{
            position: "absolute",
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
            borderRadius: 999,
            transform: "translate(-50%, -50%)",
            background: `rgba(${toneColor},${particle.alpha + reveal * 0.08})`,
            boxShadow: `0 0 ${4 + nodeCharge * 8}px rgba(${toneColor},${0.12 + nodeCharge * 0.16})`,
            animation: `gy-starbeast-inner-breathe 4.2s ease-in-out infinite ${particle.delay}ms`,
          }}
        />
      ))}

      {coreStars.map(([left, top, size], index) => (
        <span
          key={`core-${index}`}
          role="button"
          tabIndex={0}
          onClick={onCoreStarClick}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onCoreStarClick();
            }
          }}
          style={{
            position: "absolute",
            left: `${left}%`,
            top: `${top}%`,
            width: size + nodeCharge * 1.8,
            height: size + nodeCharge * 1.8,
            borderRadius: 999,
            transform: "translate(-50%, -50%)",
            background: `rgba(255,247,220,${0.54 + reveal * 0.36})`,
            boxShadow: `0 0 ${10 + reveal * 14 + nodeCharge * 16}px rgba(${toneColor},${coreGlow})`,
            animation: `gy-starbeast-ignite 760ms ease both ${index * 90}ms`,
            cursor: "pointer",
            pointerEvents: "auto",
          }}
        />
      ))}

      <span
        style={{
          position: "absolute",
          left: "55%",
          top: "49%",
          width: 116 + nodeCharge * 18,
          height: 58 + nodeCharge * 12,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(ellipse, rgba(${toneColor},${0.08 + bodyAlpha * 0.12}), transparent 68%)`,
          filter: "blur(3px)",
          animation: "gy-starbeast-breathe 4.8s ease-in-out infinite",
        }}
      />

      {narrativePhase === "node_active" || narrativePhase === "node_complete" ? (
        <span
          style={{
            position: "absolute",
            left: "55%",
            top: "50%",
            width: 126 + nodeCharge * 18,
            height: 70 + nodeCharge * 10,
            borderRadius: "50%",
            border: `1px solid rgba(${toneColor},${0.18 + nodeCharge * 0.14})`,
            animation: "gy-starbeast-ripple 1.8s ease-out infinite",
          }}
        />
      ) : null}
    </div>
  );
}

function CosmicBotanicsField({
  configs,
  currentStep,
  pressureSeedSurface,
  petalStates,
  pollenBursts,
  starbeast,
  starFlowerForm,
  starFlowerState,
  hexagramReadiness,
  activeNodeIndex,
  narrativePhase,
  onNodeBloom,
  coreStars,
}: {
  configs: SixSpaceConfig[];
  currentStep: number;
  pressureSeedSurface: string;
  petalStates: Record<SixSpaceId, CosmicPetalState>;
  pollenBursts: Record<SixSpaceId, number>;
  starbeast: StarbeastFeedback;
  starFlowerForm: StarFlowerForm;
  starFlowerState: StarFlowerGrowthState;
  hexagramReadiness: number;
  activeNodeIndex: number;
  narrativePhase: CosmicNarrativePhase;
  onNodeBloom: () => void;
  coreStars: RuntimeCoreStar[];
}) {
  const seedTone = pressureSeedSurface.length % 3;
  const toneColor = seedTone === 0 ? "199,169,107" : seedTone === 1 ? "222,196,154" : "176,210,206";
  const activeConfig = configs[Math.max(0, Math.min(configs.length - 1, currentStep - 1))] ?? configs[0];
  const activePetalState = activeConfig ? petalStates[activeConfig.id] : "active";
  const narrative = generateSixDimensionalTuningDialogue({
    pressureSeedText: pressureSeedSurface,
    starBeastName: resolveCosmicStarBeastName(starFlowerForm),
    dimension: resolveCosmicNarrativeDimension(activeConfig?.id),
  });
  const nodeFlow = narrative.nodes;
  const activeNode = nodeFlow[Math.min(activeNodeIndex, nodeFlow.length - 1)];
  const showBlackholeStatus = narrativePhase === "seed_visible" || narrativePhase === "beast_guide";
  const showPressureText = narrativePhase === "seed_visible" || narrativePhase === "beast_guide";
  const showBeastIntro = narrativePhase === "beast_guide";
  const showNodePanel = narrativePhase === "node_active" || narrativePhase === "node_complete";
  const showFieldStatus = narrativePhase === "node_complete";
  const shortPetalNames = ["身体", "情绪", "思维", "行为", "记忆", "目标"];
  const coreReadiness = Math.max(hexagramReadiness, activeNodeIndex / Math.max(1, nodeFlow.length));
  const coreVisible = narrativePhase === "node_active" || narrativePhase === "node_complete";
  const coreGlow = 0.1 + starbeast.glowIntensity * 0.14 + coreReadiness * 0.12;
  const coreTone = starFlowerState === "blooming" || starFlowerState === "rebirth" ? toneColor : "176,210,206";

  return (
    <section
      aria-label="六维宇宙花冠"
      style={{
        position: "relative",
        minHeight: 536,
        border: "1px solid rgba(199,169,107,0.16)",
        borderRadius: 24,
        overflow: "hidden",
        padding: "18px 16px",
        background:
          `radial-gradient(circle at 52% 24%, rgba(80,58,120,0.2), transparent 28%), radial-gradient(circle at 50% 58%, rgba(${toneColor},0.14), rgba(5,6,7,0.12) 36%, rgba(5,6,7,0.04) 100%)`,
        boxShadow: activePetalState === "blooming" ? `0 0 30px rgba(${toneColor},0.12)` : "none",
      }}
    >
      <style>{`
        @keyframes gy-nebula-drift {
          0%, 100% { transform: translate3d(-1%, -1%, 0) scale(1); opacity: 0.48; }
          50% { transform: translate3d(1%, 1%, 0) scale(1.04); opacity: 0.68; }
        }
        @keyframes gy-blackhole-spin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes gy-stardust-drift {
          0%, 100% { transform: translateX(-2px); opacity: 0.42; }
          50% { transform: translateX(4px); opacity: 0.78; }
        }
        @keyframes gy-petal-bloom {
          0% { transform: translate(-50%, -50%) rotate(var(--petal-rotate)) scale(0.92); opacity: 0.62; }
          45% { transform: translate(-50%, -50%) rotate(var(--petal-rotate)) scale(1.08); opacity: 1; }
          100% { transform: translate(-50%, -50%) rotate(var(--petal-rotate)) scale(1); opacity: 0.88; }
        }
        @keyframes gy-petal-float {
          0%, 100% { transform: translate(-50%, -50%) rotate(var(--petal-rotate)) scale(1); }
          50% { transform: translate(-50%, calc(-50% - 4px)) rotate(var(--petal-rotate)) scale(1.03); }
        }
        @keyframes gy-pollen-rise {
          0% { transform: translate(-50%, -50%) scale(0.2); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translate(calc(-50% + var(--pollen-x)), calc(-50% + var(--pollen-y))) scale(1); opacity: 0; }
        }
        @keyframes gy-node-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.82; }
          50% { transform: translate(-50%, -50%) scale(1.16); opacity: 1; }
        }
        @keyframes gy-starbeast-ignite {
          0% { opacity: 0.18; transform: translate(-50%, -50%) scale(0.72); }
          55% { opacity: 1; transform: translate(-50%, -50%) scale(1.18); }
          100% { opacity: 0.86; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes gy-starbeast-line {
          0% { stroke-dashoffset: 220; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes gy-starbeast-breathe {
          0%, 100% { transform: translate(-50%, -50%) scale(0.98); opacity: 0.72; }
          50% { transform: translate(-50%, calc(-50% - 3px)) scale(1.03); opacity: 0.92; }
        }
        @keyframes gy-starbeast-ripple {
          0% { transform: translate(-50%, -50%) scale(0.92); opacity: 0.34; }
          100% { transform: translate(-50%, -50%) scale(1.32); opacity: 0; }
        }
        @keyframes gy-starbeast-dust {
          0%, 100% { transform: translate(-50%, -50%) scale(0.82); opacity: 0.36; }
          50% { transform: translate(calc(-50% + 2px), calc(-50% - 2px)) scale(1.08); opacity: 0.86; }
        }
        @keyframes gy-starbeast-inner-breathe {
          0%, 100% { transform: translate(-50%, -50%) scale(0.72); opacity: 0.24; }
          50% { transform: translate(-50%, -50%) scale(1.08); opacity: 0.72; }
        }
        @keyframes gy-copy-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          inset: "-10%",
          background:
            `radial-gradient(circle at 28% 30%, rgba(${toneColor},0.1), transparent 24%), radial-gradient(circle at 74% 62%, rgba(120,92,150,0.12), transparent 28%), radial-gradient(circle at 50% 50%, rgba(176,210,206,0.08), transparent 34%)`,
          filter: "blur(12px)",
          animation: "gy-nebula-drift 8s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "absolute", inset: 0, opacity: 0.38, pointerEvents: "none" }}>
        {Array.from({ length: 28 }).map((_, index) => {
          const left = 8 + ((index * 17) % 84);
          const top = 10 + ((index * 29) % 78);
          return (
            <span
              key={index}
              style={{
                position: "absolute",
                left: `${left}%`,
                top: `${top}%`,
                width: index % 7 === 0 ? 3 : 2,
                height: index % 7 === 0 ? 3 : 2,
                borderRadius: 999,
                background: "rgba(245,245,245,0.62)",
                boxShadow: "0 0 10px rgba(245,245,245,0.36)",
              }}
            />
          );
        })}
      </div>

      <BaiHuConstellationLayer
        toneColor={toneColor}
        narrativePhase={narrativePhase}
        activeNodeIndex={activeNodeIndex}
        onCoreStarClick={onNodeBloom}
        coreStars={coreStars}
      />

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "32%",
          width: "78%",
          minHeight: 108,
          transform: "translateX(-50%)",
          display: showBlackholeStatus ? "grid" : "none",
          placeItems: "center",
          color: "rgba(245,245,245,0.86)",
          pointerEvents: "none",
          textAlign: "center",
          animation: "gy-copy-fade-in 360ms ease both",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 124,
            height: 124,
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(5,6,7,0.92) 0 27%, rgba(40,22,64,0.72) 44%, rgba(199,169,107,0.1) 58%, transparent 72%)",
            boxShadow: "inset 0 0 32px rgba(5,6,7,0.9), 0 0 38px rgba(80,58,120,0.34)",
          }}
        />
        <span
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 148,
            height: 148,
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            border: "1px solid rgba(199,169,107,0.12)",
            borderTopColor: "rgba(176,210,206,0.28)",
            animation: "gy-blackhole-spin 12s linear infinite",
          }}
        />
        <span
          style={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            placeItems: "center",
            gap: 6,
            width: "100%",
            maxWidth: 188,
            color: "rgba(245,245,245,0.82)",
            fontSize: 12,
            lineHeight: 1.46,
            fontWeight: 520,
            textShadow: `0 0 16px rgba(${toneColor},0.18)`,
            animation: "gy-stardust-drift 4s ease-in-out infinite",
          }}
        >
          <span>{narrative.blackholeStatus}</span>
        </span>
      </div>

      <p
        style={{
          position: "absolute",
          left: 28,
          right: 28,
          top: "43%",
          zIndex: 1,
          margin: 0,
          color: "rgba(245,245,245,0.78)",
          fontSize: 13,
          lineHeight: 1.52,
          fontWeight: 560,
          textAlign: "center",
          pointerEvents: "none",
          display: showPressureText ? "block" : "none",
          animation: "gy-copy-fade-in 360ms ease both",
        }}
      >
        {narrative.pressureText}
      </p>

      <div
        style={{
          position: "absolute",
          left: 22,
          right: 22,
          bottom: 18,
          gap: 6,
          pointerEvents: "none",
          padding: "11px 13px 10px",
          borderRadius: 14,
          background: "linear-gradient(180deg, rgba(5,6,7,0.5), rgba(5,6,7,0.18))",
          border: `1px solid rgba(${toneColor},0.14)`,
          backdropFilter: "blur(4px)",
          display: showNodePanel ? "grid" : "none",
          animation: "gy-copy-fade-in 360ms ease both",
        }}
      >
        <GuanyaoText size="eyebrow" tone="gold">
          {activeNode.title}
        </GuanyaoText>
        <p style={{ margin: 0, whiteSpace: "pre-line", color: "rgba(245,245,245,0.76)", fontSize: 12, lineHeight: 1.46 }}>
          {activeNode.text}
        </p>
        <GuanyaoText size="eyebrow" tone="gold">
          {activeNode.actionText}
        </GuanyaoText>
      </div>

      <p
        style={{
          position: "absolute",
          left: 22,
          right: 22,
          top: "47%",
          zIndex: 1,
          margin: 0,
          whiteSpace: "pre-line",
          color: `rgba(${toneColor},0.72)`,
          fontSize: 11,
          lineHeight: 1.5,
          pointerEvents: "none",
          display: showBeastIntro ? "block" : "none",
          animation: "gy-copy-fade-in 360ms ease both",
        }}
      >
        {narrative.beastIntro}
      </p>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "57%",
          width: 104 + coreReadiness * 14,
          height: 104 + coreReadiness * 14,
          transform: `translate(-50%, -50%) scale(${coreVisible ? 1 : 0.9})`,
          pointerEvents: "none",
          opacity: coreVisible ? 0.38 + coreReadiness * 0.24 : 0,
          filter: `drop-shadow(0 0 ${14 + coreReadiness * 12}px rgba(${coreTone},${coreGlow}))`,
          transition: "opacity 360ms ease, width 360ms ease, height 360ms ease, transform 360ms ease, filter 360ms ease",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 18 + coreReadiness * 8,
            height: 18 + coreReadiness * 8,
            borderRadius: 999,
            transform: "translate(-50%, -50%)",
            background: `rgba(${coreTone},${0.32 + coreReadiness * 0.16})`,
            boxShadow: `0 0 ${18 + coreReadiness * 20}px rgba(${coreTone},${coreGlow})`,
            transition: "width 360ms ease, height 360ms ease, background 360ms ease, box-shadow 360ms ease",
          }}
        />
        {Array.from({ length: 6 }).map((_, index) => {
          const angle = -90 + index * 60;
          const isComplete = index < activeNodeIndex;
          const isCurrent = index === Math.min(activeNodeIndex, nodeFlow.length - 1);
          const nodeAlpha = isComplete ? 0.62 : isCurrent ? 0.78 : 0.2;
          const nodeSize = isCurrent ? 9 : isComplete ? 7 : 5;
          return (
            <span
              key={`flower-core-${index}`}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: nodeSize,
                height: 26 + coreReadiness * 13,
                borderRadius: 999,
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(${-28 - coreReadiness * 8}px)`,
                transformOrigin: `50% ${28 + coreReadiness * 8}px`,
                background: `linear-gradient(180deg, rgba(${coreTone},${nodeAlpha}), rgba(${coreTone},0.03))`,
                boxShadow: isComplete || isCurrent ? `0 0 ${12 + coreReadiness * 10}px rgba(${coreTone},${coreGlow})` : "none",
                transition: "width 360ms ease, height 360ms ease, transform 360ms ease, background 360ms ease, box-shadow 360ms ease",
              }}
            />
          );
        })}
      </div>

      {coreVisible && activeNodeIndex > 0 ? (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            top: "45%",
            width: 42,
            height: 104,
            transform: "translateX(-50%)",
            pointerEvents: "none",
            opacity: 0.34 + coreReadiness * 0.18,
          }}
        >
          {Array.from({ length: Math.min(6, activeNodeIndex + 1) }).map((_, index) => (
            <span
              key={`return-flow-${index}`}
              style={{
                "--pollen-x": `${(index % 2 === 0 ? -1 : 1) * (4 + index)}px`,
                "--pollen-y": `${-44 - index * 6}px`,
                position: "absolute",
                left: `${44 + ((index * 7) % 16)}%`,
                top: `${76 - index * 13}%`,
                width: 2 + (index % 2),
                height: 2 + (index % 2),
                borderRadius: 999,
                background: `rgba(${coreTone},${0.34 + coreReadiness * 0.18})`,
                boxShadow: `0 0 10px rgba(${coreTone},${coreGlow})`,
                animation: `gy-pollen-rise ${900 + index * 90}ms ease-out infinite ${index * 120}ms`,
              } as CSSProperties}
            />
          ))}
        </div>
      ) : null}

      {configs.map((config, index) => {
        const angle = -90 + index * 60;
        const rad = (angle * Math.PI) / 180;
        const isActive = config.id === activeConfig?.id;
        const state = petalStates[config.id];
        const left = 50 + Math.cos(rad) * 32;
        const top = 58 + Math.sin(rad) * 18;

        return (
          <span
            key={config.id}
            style={{
              "--petal-rotate": `${angle + 90}deg`,
              position: "absolute",
              left: `${left}%`,
              top: `${top}%`,
              width: isActive ? 64 : 50,
              height: isActive ? 26 : 20,
              borderRadius: "50%",
              transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`,
              background: `linear-gradient(90deg, rgba(${toneColor},${isActive ? 0.28 : 0.08}), rgba(245,245,245,${state === "blooming" ? 0.16 : 0.04}))`,
              border: `1px solid rgba(${toneColor},${isActive ? 0.42 : 0.14})`,
              boxShadow: isActive ? `0 0 24px rgba(${toneColor},0.22)` : "none",
              opacity: isActive ? 0.96 : 0.54,
              pointerEvents: "none",
              animation: "gy-petal-float 4.6s ease-in-out infinite",
            } as CSSProperties}
          >
            <span
              style={{
                display: "block",
                transform: `rotate(${-angle - 90}deg)`,
                color: isActive ? "rgba(245,245,245,0.72)" : "rgba(245,245,245,0.32)",
                fontSize: 9,
                lineHeight: "26px",
                textAlign: "center",
                letterSpacing: "0.04em",
              }}
            >
              {shortPetalNames[index]}
            </span>
          </span>
        );
      })}

      <div style={{ position: "absolute", left: 18, bottom: 16, right: 18, display: "grid", gap: 5 }}>
        {showFieldStatus ? (
          <GuanyaoText size="eyebrow" tone="gold">
            {narrative.completionText}
          </GuanyaoText>
        ) : null}
      </div>
    </section>
  );
}

function HexagramCodeDeliveryShell() {
  const [sixDimensionStep, setSixDimensionStep] = useState(1);
  const [selectedSpaceAction, setSelectedSpaceAction] = useState<{
    spaceIndex: number;
    spaceName: string;
    yaoLayer: string;
    pauseSignal: string;
    pauseReason: string;
    transmissionReading: string;
  } | null>(null);
  const [bodyIntensity, setBodyIntensity] = useState<BodyIntensity | null>(() =>
    readJsonFromStorage<BodyIntensity>("guanyao:sixSpace:bodyIntensity"),
  );
  const bodyCaliperRailRef = useRef<HTMLDivElement | null>(null);
  const bodyCaliperLockTimerRef = useRef<number | null>(null);
  const bodyCaliperAdvanceTimerRef = useRef<number | null>(null);
  const [bodyCaliperProgress, setBodyCaliperProgress] = useState(0);
  const [isBodyCaliperDragging, setIsBodyCaliperDragging] = useState(false);
  const [isBodyCaliperLocked, setIsBodyCaliperLocked] = useState(false);
  const [isBodyCaliperSandifying, setIsBodyCaliperSandifying] = useState(false);
  const [bodyCaliperPassedIndex, setBodyCaliperPassedIndex] = useState(0);
  const [bodySpaceStep, setBodySpaceStep] = useState<BodySpaceStep>("entry");
  const [bodyBreakthroughStep, setBodyBreakthroughStep] = useState<BreakthroughStep>(0);
  const [selectedBodyWeapon, setSelectedBodyWeapon] = useState<BodyWeapon | null>(() =>
    readJsonFromStorage<BodyWeapon>("guanyao:selectedBodyWeapon"),
  );
  const [bodySpaceHint, setBodySpaceHint] = useState("");
  const [emotionIntensity, setEmotionIntensity] = useState<EmotionIntensity | null>(() =>
    readJsonFromStorage<EmotionIntensity>("guanyao:sixSpace:emotionIntensity"),
  );
  const emotionCaliperRailRef = useRef<HTMLDivElement | null>(null);
  const emotionCaliperLockTimerRef = useRef<number | null>(null);
  const emotionCaliperAdvanceTimerRef = useRef<number | null>(null);
  const [emotionCaliperProgress, setEmotionCaliperProgress] = useState(0);
  const [isEmotionCaliperDragging, setIsEmotionCaliperDragging] = useState(false);
  const [isEmotionCaliperLocked, setIsEmotionCaliperLocked] = useState(false);
  const [isEmotionCaliperSandifying, setIsEmotionCaliperSandifying] = useState(false);
  const [emotionCaliperPassedIndex, setEmotionCaliperPassedIndex] = useState(0);
  const [emotionSpaceStep, setEmotionSpaceStep] = useState<EmotionSpaceStep>("entry");
  const [emotionBreakthroughStep, setEmotionBreakthroughStep] = useState<BreakthroughStep>(0);
  const [selectedEmotionWeapon, setSelectedEmotionWeapon] = useState<EmotionWeapon | null>(() =>
    readJsonFromStorage<EmotionWeapon>("guanyao:selectedEmotionWeapon"),
  );
  const [emotionSpaceHint, setEmotionSpaceHint] = useState("");
  const [spaceSteps, setSpaceSteps] = useState<Record<SixSpaceId, SixSpaceRuntimeStep>>(() =>
    buildSpaceRecord<SixSpaceRuntimeStep>("entry"),
  );
  const [spaceBreakthroughSteps, setSpaceBreakthroughSteps] = useState<Record<SixSpaceId, BreakthroughStep>>(() =>
    buildSpaceRecord<BreakthroughStep>(0),
  );
  const [spaceIntensities, setSpaceIntensities] = useState<Record<SixSpaceId, SixSpaceIntensity | null>>(() => ({
    body: readJsonFromStorage<SixSpaceIntensity>("guanyao:sixSpace:body:intensity"),
    emotion: readJsonFromStorage<SixSpaceIntensity>("guanyao:sixSpace:emotion:intensity"),
    thought: readJsonFromStorage<SixSpaceIntensity>("guanyao:sixSpace:thought:intensity"),
    action: readJsonFromStorage<SixSpaceIntensity>("guanyao:sixSpace:action:intensity"),
    memory: readJsonFromStorage<SixSpaceIntensity>("guanyao:sixSpace:memory:intensity"),
    goal: readJsonFromStorage<SixSpaceIntensity>("guanyao:sixSpace:goal:intensity"),
  }));
  const thoughtCaliperRailRef = useRef<HTMLDivElement | null>(null);
  const thoughtCaliperLockTimerRef = useRef<number | null>(null);
  const thoughtCaliperAdvanceTimerRef = useRef<number | null>(null);
  const [thoughtCaliperProgress, setThoughtCaliperProgress] = useState(0);
  const [isThoughtCaliperDragging, setIsThoughtCaliperDragging] = useState(false);
  const [isThoughtCaliperLocked, setIsThoughtCaliperLocked] = useState(false);
  const [isThoughtCaliperSandifying, setIsThoughtCaliperSandifying] = useState(false);
  const [thoughtCaliperPassedIndex, setThoughtCaliperPassedIndex] = useState(0);
  const actionGravityRailRef = useRef<HTMLDivElement | null>(null);
  const actionGravityLockTimerRef = useRef<number | null>(null);
  const actionGravityCompleteTimerRef = useRef<number | null>(null);
  const actionArtifactFlipTimerRef = useRef<number | null>(null);
  const actionArtifactExitTimerRef = useRef<number | null>(null);
  const memorySmokeRailRef = useRef<HTMLDivElement | null>(null);
  const memorySmokeLockTimerRef = useRef<number | null>(null);
  const memorySmokeExitTimerRef = useRef<number | null>(null);
  const memorySmokeProgressRef = useRef(1);
  const memorySmokeDragStartRef = useRef<{ clientX: number; progress: number } | null>(null);
  const goalTearRailRef = useRef<HTMLDivElement | null>(null);
  const goalTearLockTimerRef = useRef<number | null>(null);
  const goalTearExitTimerRef = useRef<number | null>(null);
  const goalTearProgressRef = useRef(0);
  const assetFuseRailRef = useRef<HTMLDivElement | null>(null);
  const assetFuseTimerRef = useRef<number | null>(null);
  const assetFuseProgressRef = useRef(0);
  const [actionGravityProgress, setActionGravityProgress] = useState(0);
  const [isActionGravityDragging, setIsActionGravityDragging] = useState(false);
  const [isActionGravityLocked, setIsActionGravityLocked] = useState(false);
  const [isActionGravitySandifying, setIsActionGravitySandifying] = useState(false);
  const [actionArtifactStage, setActionArtifactStage] = useState<ActionArtifactStage>("interact");
  const [memorySmokeProgress, setMemorySmokeProgress] = useState(1);
  const [isMemorySmokeDragging, setIsMemorySmokeDragging] = useState(false);
  const [isMemorySmokeLocked, setIsMemorySmokeLocked] = useState(false);
  const [isMemorySmokeSandifying, setIsMemorySmokeSandifying] = useState(false);
  const [memoryArtifactStage, setMemoryArtifactStage] = useState<MemoryArtifactStage>("interact");
  const [goalTearProgress, setGoalTearProgress] = useState(0);
  const [isGoalTearDragging, setIsGoalTearDragging] = useState(false);
  const [isGoalTearLocked, setIsGoalTearLocked] = useState(false);
  const [isGoalTearSandifying, setIsGoalTearSandifying] = useState(false);
  const [goalFinalStage, setGoalFinalStage] = useState<GoalFinalStage>("interact");
  const [assetFuseProgress, setAssetFuseProgress] = useState(0);
  const [isAssetFuseDragging, setIsAssetFuseDragging] = useState(false);
  const [isAssetFuseLocked, setIsAssetFuseLocked] = useState(false);
  const [assetFuseStage, setAssetFuseStage] = useState<AssetFuseStage>("interact");
  const [cosmicSixDimensionState, setCosmicSixDimensionState] = useState<CosmicBotanicsSixDimensionState>(() =>
    createDormantCosmicBotanicsSixDimensionState(),
  );
  const [cosmicNodeStep, setCosmicNodeStep] = useState(0);
  const [cosmicNarrativePhase, setCosmicNarrativePhase] = useState<CosmicNarrativePhase>("field_intro");
  const [selectedSpaceWeapons, setSelectedSpaceWeapons] = useState<Record<SixSpaceId, SixSpaceWeaponId | null>>(() => ({
    body: readJsonFromStorage<SixSpaceWeaponId>(getSelectedWeaponStorageKey("body")),
    emotion: readJsonFromStorage<SixSpaceWeaponId>(getSelectedWeaponStorageKey("emotion")),
    thought: readJsonFromStorage<SixSpaceWeaponId>(getSelectedWeaponStorageKey("thought")),
    action: readJsonFromStorage<SixSpaceWeaponId>(getSelectedWeaponStorageKey("action")),
    memory: readJsonFromStorage<SixSpaceWeaponId>(getSelectedWeaponStorageKey("memory")),
    goal: readJsonFromStorage<SixSpaceWeaponId>(getSelectedWeaponStorageKey("goal")),
  }));
  const [spaceHints, setSpaceHints] = useState<Record<SixSpaceId, string>>(() => buildSpaceRecord(""));
  const [assetStep, setAssetStep] = useState<AssetStep>("preview");
  const [currentAssetId] = useState(() => `asset-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
  const [isCurrentAssetSaved, setIsCurrentAssetSaved] = useState(false);
  const [readModel] = useState(() => getGuanyaoR8ReadModel());
  const [selectedPressureSeedContext] = useState(() =>
    readJsonFromStorage<GravitySelectedPressureSeedContext>("guanyao:selectedPressureSeedContext"),
  );
  const [personaOutputSnapshot] = useState(() =>
    readJsonFromStorage<PersonaOutputSnapshotView>("guanyao:personaOutputSnapshot"),
  );
  const [pressureSeedProjection] = useState(() =>
    getPressureSeedSixSpaceProjection(selectedPressureSeedContext?.selectedPressureSeedId ?? "unknown-selected-pressure-seed"),
  );
  const hexagramDisplay = readModel.hexagramStage;
  const displayCode = getUsableHexagramText([hexagramDisplay.hexagramCode, hexagramDisplay.displayCode], "");
  const displayName = getUsableHexagramText([hexagramDisplay.hexagramName, hexagramDisplay.displayName], "本局");
  const hexagramAssetCode = resolveHexagramAssetCode({ hexagramCode: displayCode, hexagramName: displayName });
  const hexagramAsset = hexagramAssetCode ? guanyaoHexagramAssetLibrary[hexagramAssetCode] : null;
  const hexagramAssetTitle = hexagramAsset ? `「${hexagramAsset.name}」\n《${hexagramAsset.title}》` : "";
  const hexagramAssetLines = buildHexagramAssetLines(hexagramAsset);
  const motherCodeAsset = getMotherCodeAsset(readModel.motherCodeStage);
  const motherCodeAssetName = motherCodeAsset?.name ?? "";
  const motherCodeAssetLines = buildMotherCodeAssetLines(motherCodeAsset);
  const selectedPressureSeedSurface = selectedPressureSeedContext?.surface || "这件事刚刚发生过。";
  const currentSpace = sixDimensionStep >= 1 && sixDimensionStep <= 6 ? readModel.yaoStage.transmissions[sixDimensionStep - 1] : null;
  const currentSixSpaceConfig = sixDimensionStep >= 1 && sixDimensionStep <= 6 ? sixSpaceConfigs[sixDimensionStep - 1] : null;
  const canTreatCurrentSpace = currentSpace?.pauseSignal === "clear" || currentSpace?.pauseSignal === "strong";
  const currentProjection = getProjectionForYaoLayer(pressureSeedProjection, currentSpace?.yaoLayer);
  const currentCutSignal = currentProjection?.hook ?? "这一层已经留下反应。";
  const currentNarrativeLines = buildSpaceNarrativeLines(currentProjection);
  const currentSpaceSignal =
    canTreatCurrentSpace
      ? "切口信号已显影。"
      : currentSpace?.pauseSignal === "soft"
        ? "轻微信号已显影。"
        : "继续进入下一空间。";
  const awakenedWeapons = getAwakenedWeapons({
    configs: sixSpaceConfigs,
    selectedBodyWeapon,
    selectedEmotionWeapon,
    selectedSpaceWeapons,
    bodySpaceStep,
    emotionSpaceStep,
    spaceSteps,
  });
  const triggerDefenseCard = buildTriggerDefenseCard({
    seedSurface: selectedPressureSeedSurface,
    awakenedWeapons,
  });
  const firstAction72h = buildFirstAction72h({
    triggerDefenseCard,
    awakenedWeapons,
  });
  const currentAssetCard = {
    id: currentAssetId,
    createdAt: new Date().toISOString(),
    seedSurface: selectedPressureSeedSurface,
    motherCodeName: motherCodeAssetName,
    motherCodeAssetText: motherCodeAssetLines.join(""),
    hexagramName: hexagramAsset?.name ?? "",
    hexagramTitle: hexagramAsset?.title ?? "",
    hexagramCode: hexagramAsset?.code ?? "",
    hexagramAssetText: hexagramAssetLines.join(""),
    sixSpacePathMap,
    sixSpacePatterns: sixSpacePatternSummary,
    awakenedWeapons,
    triggerDefenseCard,
    firstAction72h,
    unlocked: assetStep === "unlocked",
  };

  const cosmicBotanicsRuntime = runCosmicBotanicsRuntimeEngine({
    pressureSeed: selectedPressureSeedSurface,
    sixDimensionState: cosmicSixDimensionState,
  });
  const baiHuRuntimeCoreStars = buildRuntimeBaiHuCoreStars(personaOutputSnapshot);

  const visiblePetalStates = sixSpaceConfigs.reduce<Record<SixSpaceId, CosmicPetalState>>((acc, config, index) => {
    const baseState = cosmicBotanicsRuntime.sixDimensionState[config.id].petalState;
    const isCurrent = sixDimensionStep === index + 1;
    const isCompleted =
      config.id === "body"
        ? bodySpaceStep === "completed"
        : config.id === "emotion"
          ? emotionSpaceStep === "completed"
          : spaceSteps[config.id] === "completed";
    acc[config.id] = isCompleted ? "blooming" : isCurrent && baseState === "dormant" ? "active" : baseState;
    return acc;
  }, buildSpaceRecord<CosmicPetalState>("dormant"));
  const cosmicPollenBursts = sixSpaceConfigs.reduce<Record<SixSpaceId, number>>((acc, config) => {
    acc[config.id] = cosmicBotanicsRuntime.sixDimensionState[config.id].bloomCount;
    return acc;
  }, buildSpaceRecord(0));

  function bloomCosmicNode() {
    const activeSpaceId = currentSixSpaceConfig?.id ?? "body";
    const nextNodeStep = Math.min(6, cosmicNodeStep + 1);

    setCosmicNodeStep(nextNodeStep);
    setCosmicSixDimensionState((current) => {
      const nextState: CosmicBotanicsSixDimensionState = {
        ...current,
        [activeSpaceId]: {
          petalState: "blooming",
          bloomCount: current[activeSpaceId].bloomCount + 1,
        },
      };

      if (nextNodeStep >= 6) {
        sixSpaceConfigs.forEach((config) => {
          nextState[config.id] = {
            petalState: "blooming",
            bloomCount: Math.max(nextState[config.id].bloomCount, 1),
          };
        });
      }

      return nextState;
    });

    window.setTimeout(() => {
      setCosmicSixDimensionState((current) => {
        if (nextNodeStep >= 6) {
          return current;
        }

        return settleCosmicBotanicsBloomState(current, activeSpaceId);
      });
    }, 1400);
  }

  const activeBodyCaliperIndex = getBodyCaliperIndex(bodyCaliperProgress);
  const activeBodyCaliperLevel = bodyLoadCaliperLevels[activeBodyCaliperIndex];
  const activeEmotionCaliperIndex = getEmotionCaliperIndex(emotionCaliperProgress);
  const activeEmotionCaliperLevel = emotionLoadCaliperLevels[activeEmotionCaliperIndex];
  const activeThoughtCaliperIndex = getThoughtCaliperIndex(thoughtCaliperProgress);
  const activeThoughtCaliperLevel = thoughtLoadCaliperLevels[activeThoughtCaliperIndex];

  useEffect(() => {
    if (!USE_COSMIC_BOTANICS_SIX_SPACE) return;

    if (cosmicNodeStep >= 6) {
      setCosmicNarrativePhase("node_complete");
      return;
    }

    if (cosmicNodeStep > 0) {
      setCosmicNarrativePhase("node_active");
      return;
    }

    setCosmicNarrativePhase("field_intro");
    const seedTimer = window.setTimeout(() => setCosmicNarrativePhase("seed_visible"), 950);
    const beastTimer = window.setTimeout(() => setCosmicNarrativePhase("beast_guide"), 2400);
    const nodeTimer = window.setTimeout(() => setCosmicNarrativePhase("node_active"), 3600);

    return () => {
      window.clearTimeout(seedTimer);
      window.clearTimeout(beastTimer);
      window.clearTimeout(nodeTimer);
    };
  }, [cosmicNodeStep, selectedPressureSeedSurface, sixDimensionStep]);

  useEffect(() => {
    return () => {
      if (bodyCaliperLockTimerRef.current) {
        window.clearTimeout(bodyCaliperLockTimerRef.current);
      }
      if (bodyCaliperAdvanceTimerRef.current) {
        window.clearTimeout(bodyCaliperAdvanceTimerRef.current);
      }
      if (emotionCaliperLockTimerRef.current) {
        window.clearTimeout(emotionCaliperLockTimerRef.current);
      }
      if (emotionCaliperAdvanceTimerRef.current) {
        window.clearTimeout(emotionCaliperAdvanceTimerRef.current);
      }
      if (thoughtCaliperLockTimerRef.current) {
        window.clearTimeout(thoughtCaliperLockTimerRef.current);
      }
      if (thoughtCaliperAdvanceTimerRef.current) {
        window.clearTimeout(thoughtCaliperAdvanceTimerRef.current);
      }
      if (actionGravityLockTimerRef.current) {
        window.clearTimeout(actionGravityLockTimerRef.current);
      }
      if (actionGravityCompleteTimerRef.current) {
        window.clearTimeout(actionGravityCompleteTimerRef.current);
      }
      if (actionArtifactFlipTimerRef.current) {
        window.clearTimeout(actionArtifactFlipTimerRef.current);
      }
      if (actionArtifactExitTimerRef.current) {
        window.clearTimeout(actionArtifactExitTimerRef.current);
      }
      if (memorySmokeLockTimerRef.current) {
        window.clearTimeout(memorySmokeLockTimerRef.current);
      }
      if (memorySmokeExitTimerRef.current) {
        window.clearTimeout(memorySmokeExitTimerRef.current);
      }
      if (goalTearLockTimerRef.current) {
        window.clearTimeout(goalTearLockTimerRef.current);
      }
      if (goalTearExitTimerRef.current) {
        window.clearTimeout(goalTearExitTimerRef.current);
      }
      if (assetFuseTimerRef.current) {
        window.clearTimeout(assetFuseTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (sixDimensionStep !== 2 || emotionSpaceStep !== "entry" || !isEmotionCaliperSandifying) return;
    const fallbackTimer = window.setTimeout(advanceFromEmotionCaliper, 900);
    return () => window.clearTimeout(fallbackTimer);
  }, [sixDimensionStep, emotionSpaceStep, isEmotionCaliperSandifying]);

  function handleNextSpace() {
    setSelectedSpaceAction(null);
    setSixDimensionStep((currentStep) => Math.min(currentStep + 1, 7));
  }

  function handleNextSpaceFromBody() {
    setBodySpaceStep("entry");
    setBodyBreakthroughStep(0);
    setBodySpaceHint("");
    handleNextSpace();
  }

  function handleNextSpaceFromEmotion() {
    setEmotionSpaceStep("entry");
    setEmotionBreakthroughStep(0);
    setEmotionSpaceHint("");
    handleNextSpace();
  }

  function advanceFromEmotionCaliper() {
    setIsEmotionCaliperLocked(false);
    setIsEmotionCaliperSandifying(false);
    setEmotionSpaceHint("");
    setEmotionCaliperProgress(0);
    setEmotionCaliperPassedIndex(0);
    handleNextSpace();
  }

  function selectBodyIntensity(value: BodyIntensity) {
    setBodyIntensity(value);
    setBodyCaliperProgress(getBodyCaliperProgress(value));
    setBodySpaceHint("");
  }

  function getBodyCaliperProgressFromPointer(event: ReactPointerEvent<HTMLDivElement>) {
    const rect = bodyCaliperRailRef.current?.getBoundingClientRect();
    if (!rect || rect.width <= 0) return bodyCaliperProgress;
    return Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
  }

  function updateBodyCaliperFromPointer(event: ReactPointerEvent<HTMLDivElement>) {
    if (isBodyCaliperLocked) return;
    const nextProgress = getBodyCaliperProgressFromPointer(event);
    setBodyCaliperProgress(nextProgress);
    const nextIndex = getBodyCaliperIndex(nextProgress);
    if (nextIndex !== bodyCaliperPassedIndex) {
      setBodyCaliperPassedIndex(nextIndex);
      if ("vibrate" in navigator) {
        navigator.vibrate(nextIndex === 2 ? [8, 12, 8] : 7);
      }
    }
  }

  function handleBodyCaliperPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (isBodyCaliperLocked) return;
    const rect = bodyCaliperRailRef.current?.getBoundingClientRect();
    if (!rect || rect.width <= 0) return;
    const knobX = rect.left + rect.width * bodyCaliperProgress;
    if (Math.abs(event.clientX - knobX) > 34) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsBodyCaliperDragging(true);
    setBodySpaceHint("");
  }

  function handleBodyCaliperPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!isBodyCaliperDragging) return;
    updateBodyCaliperFromPointer(event);
  }

  function handleBodyCaliperPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (!isBodyCaliperDragging || isBodyCaliperLocked) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    setIsBodyCaliperDragging(false);
    const finalProgress = getBodyCaliperProgressFromPointer(event);
    const index = getBodyCaliperIndex(finalProgress);
    const lockedLevel = bodyLoadCaliperLevels[index];
    const lockedProgress = bodyCaliperMarkProgress[index];
    setBodyCaliperProgress(lockedProgress);
    selectBodyIntensity(lockedLevel.value);
    setIsBodyCaliperLocked(true);
    setBodySpaceHint("身体负荷代码已锁止。");
    if ("vibrate" in navigator) {
      navigator.vibrate([12, 18, 24]);
    }
    bodyCaliperLockTimerRef.current = window.setTimeout(() => {
      setIsBodyCaliperSandifying(true);
      bodyCaliperAdvanceTimerRef.current = window.setTimeout(() => {
        setIsBodyCaliperLocked(false);
        setIsBodyCaliperSandifying(false);
        setBodySpaceHint("");
        setBodyCaliperProgress(0);
        setBodyCaliperPassedIndex(0);
        handleNextSpace();
      }, 780);
    }, 1500);
  }

  function requireBodyIntensity() {
    setBodySpaceHint("先看见它到了什么程度。");
  }

  function handleBodyNextSpace() {
    if (!bodyIntensity) {
      requireBodyIntensity();
      return;
    }

    handleNextSpace();
  }

  function handleBodyBreakSpace() {
    if (!bodyIntensity) {
      requireBodyIntensity();
      return;
    }

    setBodySpaceHint("");
    setBodyBreakthroughStep(0);
    setBodySpaceStep("breakthrough");
  }

  function handleOpenBodyWeaponStep() {
    if (bodyBreakthroughStep !== 2) {
      setBodySpaceHint("先看完它怎么接管你。");
      return;
    }

    setBodySpaceHint("");
    setSelectedBodyWeapon(null);
    setBodySpaceStep("weapon");
  }

  function handleBodyBreakthroughNext() {
    setBodySpaceHint("");
    if (bodyBreakthroughStep === 0) {
      setBodyBreakthroughStep(1);
      return;
    }
    if (bodyBreakthroughStep === 1) {
      setBodyBreakthroughStep(2);
      return;
    }

    setBodySpaceHint("左滑，选择武器。");
  }

  function handleCancelBodyWeapon() {
    setBodySpaceHint("");
    setSelectedBodyWeapon(null);
    setBodySpaceStep("entry");
  }

  function handleWakeBodyWeapon() {
    if (!selectedBodyWeapon) {
      setBodySpaceHint("先选一件武器。");
      return;
    }

    setBodySpaceHint("");
    setBodySpaceStep("completed");
  }

  function selectEmotionIntensity(value: EmotionIntensity) {
    setEmotionIntensity(value);
    setEmotionCaliperProgress(getEmotionCaliperProgress(value));
    setEmotionSpaceHint("");
  }

  function getEmotionCaliperProgressFromPointer(event: ReactPointerEvent<HTMLDivElement>) {
    const rect = emotionCaliperRailRef.current?.getBoundingClientRect();
    if (!rect || rect.width <= 0) return emotionCaliperProgress;
    const linearProgress = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    return Math.pow(linearProgress, 1.18);
  }

  function updateEmotionCaliperFromPointer(event: ReactPointerEvent<HTMLDivElement>) {
    if (isEmotionCaliperLocked) return;
    const nextProgress = getEmotionCaliperProgressFromPointer(event);
    setEmotionCaliperProgress(nextProgress);
    const nextIndex = getEmotionCaliperIndex(nextProgress);
    if (nextIndex !== emotionCaliperPassedIndex) {
      setEmotionCaliperPassedIndex(nextIndex);
      if ("vibrate" in navigator) {
        navigator.vibrate(nextIndex === 2 ? [10, 18, 10] : [6, 10]);
      }
    }
  }

  function handleEmotionCaliperPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (isEmotionCaliperLocked) return;
    const rect = emotionCaliperRailRef.current?.getBoundingClientRect();
    if (!rect || rect.width <= 0) return;
    const knobX = rect.left + rect.width * emotionCaliperProgress;
    if (Math.abs(event.clientX - knobX) > 36) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsEmotionCaliperDragging(true);
    setEmotionSpaceHint("");
  }

  function handleEmotionCaliperPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!isEmotionCaliperDragging) return;
    updateEmotionCaliperFromPointer(event);
  }

  function handleEmotionCaliperPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (!isEmotionCaliperDragging || isEmotionCaliperLocked) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    setIsEmotionCaliperDragging(false);
    const finalProgress = getEmotionCaliperProgressFromPointer(event);
    const index = getEmotionCaliperIndex(finalProgress);
    const lockedLevel = emotionLoadCaliperLevels[index];
    const lockedProgress = bodyCaliperMarkProgress[index];
    setEmotionCaliperProgress(lockedProgress);
    selectEmotionIntensity(lockedLevel.value);
    setIsEmotionCaliperLocked(true);
    setEmotionSpaceHint("情绪负荷代码已锁止。");
    if ("vibrate" in navigator) {
      navigator.vibrate([10, 16, 28]);
    }
    emotionCaliperLockTimerRef.current = window.setTimeout(() => {
      setIsEmotionCaliperSandifying(true);
      emotionCaliperAdvanceTimerRef.current = window.setTimeout(advanceFromEmotionCaliper, 780);
    }, 1200);
  }

  function requireEmotionIntensity() {
    setEmotionSpaceHint("先看见它到了什么程度。");
  }

  function handleEmotionNextSpace() {
    if (!emotionIntensity) {
      requireEmotionIntensity();
      return;
    }

    handleNextSpace();
  }

  function handleEmotionBreakSpace() {
    if (!emotionIntensity) {
      requireEmotionIntensity();
      return;
    }

    setEmotionSpaceHint("");
    setEmotionBreakthroughStep(0);
    setEmotionSpaceStep("breakthrough");
  }

  function getThoughtCaliperProgressFromPointer(event: ReactPointerEvent<HTMLDivElement>) {
    const rect = thoughtCaliperRailRef.current?.getBoundingClientRect();
    if (!rect || rect.width <= 0) return thoughtCaliperProgress;
    const linearProgress = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    return Math.round(linearProgress * 18) / 18;
  }

  function updateThoughtCaliperFromPointer(event: ReactPointerEvent<HTMLDivElement>) {
    if (isThoughtCaliperLocked) return;
    const nextProgress = getThoughtCaliperProgressFromPointer(event);
    setThoughtCaliperProgress(nextProgress);
    const nextIndex = getThoughtCaliperIndex(nextProgress);
    if (nextIndex !== thoughtCaliperPassedIndex) {
      setThoughtCaliperPassedIndex(nextIndex);
      if ("vibrate" in navigator) {
        navigator.vibrate(6);
      }
    }
  }

  function handleThoughtCaliperPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (isThoughtCaliperLocked) return;
    const rect = thoughtCaliperRailRef.current?.getBoundingClientRect();
    if (!rect || rect.width <= 0) return;
    const knobX = rect.left + rect.width * thoughtCaliperProgress;
    if (Math.abs(event.clientX - knobX) > 36) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsThoughtCaliperDragging(true);
    setGenericSpaceHint("thought", "");
  }

  function handleThoughtCaliperPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!isThoughtCaliperDragging) return;
    updateThoughtCaliperFromPointer(event);
  }

  function handleThoughtCaliperPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (!isThoughtCaliperDragging || isThoughtCaliperLocked) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    setIsThoughtCaliperDragging(false);
    const finalProgress = getThoughtCaliperProgressFromPointer(event);
    const index = getThoughtCaliperIndex(finalProgress);
    const lockedLevel = thoughtLoadCaliperLevels[index];
    const lockedProgress = bodyCaliperMarkProgress[index];
    setThoughtCaliperProgress(lockedProgress);
    selectGenericIntensity("thought", lockedLevel.value);
    setIsThoughtCaliperLocked(true);
    setGenericSpaceHint("thought", "规律负荷已锁止。");
    if ("vibrate" in navigator) {
      navigator.vibrate([8, 16, 34]);
    }
    thoughtCaliperLockTimerRef.current = window.setTimeout(() => {
      setIsThoughtCaliperSandifying(true);
      thoughtCaliperAdvanceTimerRef.current = window.setTimeout(() => {
        setIsThoughtCaliperLocked(false);
        setIsThoughtCaliperSandifying(false);
        setGenericSpaceHint("thought", "");
        setThoughtCaliperProgress(0);
        setThoughtCaliperPassedIndex(0);
        setSpaceSteps((current) => ({ ...current, action: "entry" }));
        setSpaceBreakthroughSteps((current) => ({ ...current, action: 0 }));
        setGenericSpaceHint("action", "");
        setActionArtifactStage("interact");
        handleNextSpace();
      }, 820);
    }, 1200);
  }

  function getActionGravityProgressFromPointer(event: ReactPointerEvent<HTMLDivElement>) {
    const rect = actionGravityRailRef.current?.getBoundingClientRect();
    if (!rect || rect.height <= 0) return actionGravityProgress;
    const linearProgress = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    return Math.pow(linearProgress, 1.24);
  }

  function handleActionGravityPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (isActionGravityLocked || actionArtifactStage !== "interact") return;
    const rect = actionGravityRailRef.current?.getBoundingClientRect();
    if (!rect || rect.height <= 0) return;
    const knobY = rect.top + rect.height * actionGravityProgress;
    if (Math.abs(event.clientY - knobY) > 42) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsActionGravityDragging(true);
    setGenericSpaceHint("action", "");
  }

  function handleActionGravityPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!isActionGravityDragging || isActionGravityLocked || actionArtifactStage !== "interact") return;
    setActionGravityProgress(getActionGravityProgressFromPointer(event));
  }

  function handleActionGravityPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (!isActionGravityDragging || isActionGravityLocked) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    setIsActionGravityDragging(false);
    const finalProgress = getActionGravityProgressFromPointer(event);

    if (finalProgress < 0.92) {
      setActionGravityProgress(0);
      setGenericSpaceHint("action", "还没有拉断。");
      if ("vibrate" in navigator) {
        navigator.vibrate(8);
      }
      return;
    }

    setActionGravityProgress(1);
    selectGenericIntensity("action", "yao3");
    setSelectedSpaceWeapons((current) => ({ ...current, action: "small-step" }));
    setIsActionGravityLocked(true);
    setActionArtifactStage("break");
    setGenericSpaceHint("action", "止动盾已唤醒。");
    if ("vibrate" in navigator) {
      navigator.vibrate([18, 24, 42]);
    }
    actionGravityLockTimerRef.current = window.setTimeout(() => {
      setActionArtifactStage("front");
      setGenericSpaceHint("action", "");
    }, 1400);
  }

  function handleActionArtifactFlip() {
    if (actionArtifactStage !== "front") return;
    setActionArtifactStage("flipping");
    if ("vibrate" in navigator) {
      navigator.vibrate(10);
    }
    actionArtifactFlipTimerRef.current = window.setTimeout(() => {
      setActionArtifactStage("back");
    }, 520);
  }

  function handleActionArtifactExit() {
    if (actionArtifactStage !== "back") return;
    setActionArtifactStage("sandify");
    setIsActionGravitySandifying(true);
    actionArtifactExitTimerRef.current = window.setTimeout(() => {
      setIsActionGravityLocked(false);
      setIsActionGravitySandifying(false);
      setActionGravityProgress(0);
      setGenericSpaceHint("action", "");
      setSpaceSteps((current) => ({ ...current, action: "completed" }));
      setSpaceSteps((current) => ({ ...current, memory: "entry" }));
      setSpaceBreakthroughSteps((current) => ({ ...current, memory: 0 }));
      setGenericSpaceHint("memory", "");
      setMemoryArtifactStage("interact");
      updateMemorySmokeProgress(1);
      setIsMemorySmokeLocked(false);
      setIsMemorySmokeSandifying(false);
      handleNextSpace();
    }, 760);
  }

  function getMemorySmokeProgressFromPointer(event: ReactPointerEvent<HTMLDivElement>) {
    const rect = memorySmokeRailRef.current?.getBoundingClientRect();
    if (!rect || rect.width <= 0) return memorySmokeProgressRef.current;
    return Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
  }

  function updateMemorySmokeProgress(nextProgress: number) {
    const clampedProgress = Math.max(0, Math.min(1, nextProgress));
    memorySmokeProgressRef.current = clampedProgress;
    setMemorySmokeProgress(clampedProgress);
  }

  function handleMemorySmokePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (isMemorySmokeLocked || memoryArtifactStage !== "interact") return;
    event.currentTarget.setPointerCapture(event.pointerId);
    memorySmokeDragStartRef.current = {
      clientX: event.clientX,
      progress: memorySmokeProgressRef.current,
    };
    setIsMemorySmokeDragging(true);
    setGenericSpaceHint("memory", "");
  }

  function handleMemorySmokePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!isMemorySmokeDragging || isMemorySmokeLocked || memoryArtifactStage !== "interact") return;
    const rect = memorySmokeRailRef.current?.getBoundingClientRect();
    const dragStart = memorySmokeDragStartRef.current;
    if (!rect || rect.width <= 0 || !dragStart) return;
    const dragDelta = (event.clientX - dragStart.clientX) / rect.width;
    updateMemorySmokeProgress(dragStart.progress + dragDelta);
  }

  function handleMemorySmokePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (!isMemorySmokeDragging || isMemorySmokeLocked) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    setIsMemorySmokeDragging(false);
    memorySmokeDragStartRef.current = null;
    const finalProgress = memorySmokeProgressRef.current;

    if (finalProgress > 0.18) {
      updateMemorySmokeProgress(1);
      setGenericSpaceHint("memory", "还没有切开。");
      if ("vibrate" in navigator) {
        navigator.vibrate(8);
      }
      return;
    }

    updateMemorySmokeProgress(0);
    selectGenericIntensity("memory", "yao3");
    setSelectedSpaceWeapons((current) => ({ ...current, memory: "wind-cutter" }));
    setIsMemorySmokeLocked(true);
    setMemoryArtifactStage("break");
    setGenericSpaceHint("memory", "听风刀已唤醒。");
    if ("vibrate" in navigator) {
      navigator.vibrate([14, 22, 38]);
    }
    memorySmokeLockTimerRef.current = window.setTimeout(() => {
      setMemoryArtifactStage("front");
      setGenericSpaceHint("memory", "");
    }, 1280);
  }

  function handleMemoryArtifactExit() {
    if (memoryArtifactStage === "front") {
      setMemoryArtifactStage("flipping");
      if ("vibrate" in navigator) {
        navigator.vibrate(10);
      }
      memorySmokeExitTimerRef.current = window.setTimeout(() => {
        setMemoryArtifactStage("back");
      }, 520);
      return;
    }
    if (memoryArtifactStage !== "back") return;
    setMemoryArtifactStage("sandify");
    setIsMemorySmokeSandifying(true);
    memorySmokeExitTimerRef.current = window.setTimeout(() => {
      setIsMemorySmokeLocked(false);
      setIsMemorySmokeSandifying(false);
      updateMemorySmokeProgress(1);
      setGenericSpaceHint("memory", "");
      setSpaceSteps((current) => ({ ...current, memory: "completed" }));
      setSpaceSteps((current) => ({ ...current, goal: "entry" }));
      setSpaceBreakthroughSteps((current) => ({ ...current, goal: 0 }));
      setGenericSpaceHint("goal", "");
      updateGoalTearProgress(0);
      setGoalFinalStage("interact");
      setIsGoalTearLocked(false);
      setIsGoalTearSandifying(false);
      handleNextSpace();
    }, 760);
  }

  function updateGoalTearProgress(nextProgress: number) {
    const clampedProgress = Math.max(0, Math.min(1, nextProgress));
    goalTearProgressRef.current = clampedProgress;
    setGoalTearProgress(clampedProgress);
  }

  function getGoalTearProgressFromPointer(event: ReactPointerEvent<HTMLDivElement>) {
    const rect = goalTearRailRef.current?.getBoundingClientRect();
    if (!rect || rect.width <= 0) return goalTearProgressRef.current;
    const centerX = rect.left + rect.width * 0.5;
    return Math.max(0, Math.min(1, Math.abs(event.clientX - centerX) / (rect.width * 0.5)));
  }

  function handleGoalTearPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (isGoalTearLocked || goalFinalStage !== "interact") return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsGoalTearDragging(true);
    updateGoalTearProgress(getGoalTearProgressFromPointer(event));
    setGenericSpaceHint("goal", "");
  }

  function handleGoalTearPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!isGoalTearDragging || isGoalTearLocked || goalFinalStage !== "interact") return;
    updateGoalTearProgress(getGoalTearProgressFromPointer(event));
    if (goalTearProgressRef.current > 0.58 && "vibrate" in navigator) {
      navigator.vibrate(4);
    }
  }

  function handleGoalTearPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (!isGoalTearDragging || isGoalTearLocked) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    setIsGoalTearDragging(false);

    if (goalTearProgressRef.current < 0.82) {
      updateGoalTearProgress(0);
      setGenericSpaceHint("goal", "还没有撕开。");
      if ("vibrate" in navigator) {
        navigator.vibrate(8);
      }
      return;
    }

    updateGoalTearProgress(1);
    selectGenericIntensity("goal", "yao3");
    setSelectedSpaceWeapons((current) => ({ ...current, goal: "look-forward" }));
    setIsGoalTearLocked(true);
    setGoalFinalStage("break");
    setGenericSpaceHint("goal", "终局剧本已撕开。");
    if ("vibrate" in navigator) {
      navigator.vibrate([18, 28, 46]);
    }
    goalTearLockTimerRef.current = window.setTimeout(() => {
      setGoalFinalStage("front");
      setGenericSpaceHint("goal", "");
    }, 1050);
  }

  function handleGoalFinalPaywall() {
    if (goalFinalStage === "front") {
      setGoalFinalStage("flipping");
      if ("vibrate" in navigator) {
        navigator.vibrate(10);
      }
      goalTearExitTimerRef.current = window.setTimeout(() => {
        setGoalFinalStage("back");
      }, 520);
      return;
    }
    if (goalFinalStage !== "back") return;
    setGoalFinalStage("sandify");
    setIsGoalTearSandifying(true);
    goalTearExitTimerRef.current = window.setTimeout(() => {
      setIsGoalTearLocked(false);
      setIsGoalTearSandifying(false);
      updateGoalTearProgress(0);
      setGenericSpaceHint("goal", "");
      setSpaceSteps((current) => ({ ...current, goal: "completed" }));
      setAssetStep("preview");
      setAssetFuseStage("interact");
      setIsAssetFuseLocked(false);
      updateAssetFuseProgress(0);
      setSixDimensionStep(7);
    }, 860);
  }

  function updateAssetFuseProgress(nextProgress: number) {
    const clampedProgress = Math.max(0, Math.min(1, nextProgress));
    assetFuseProgressRef.current = clampedProgress;
    setAssetFuseProgress(clampedProgress);
  }

  function getAssetFuseProgressFromPointer(event: ReactPointerEvent<HTMLDivElement>) {
    const rect = assetFuseRailRef.current?.getBoundingClientRect();
    if (!rect || rect.width <= 0) return assetFuseProgressRef.current;
    return Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
  }

  function handleAssetFusePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (isAssetFuseLocked || assetStep !== "preview") return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsAssetFuseDragging(true);
    updateAssetFuseProgress(getAssetFuseProgressFromPointer(event));
  }

  function handleAssetFusePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!isAssetFuseDragging || isAssetFuseLocked || assetStep !== "preview") return;
    const nextProgress = getAssetFuseProgressFromPointer(event);
    updateAssetFuseProgress(nextProgress);
    if (nextProgress > 0.14 && "vibrate" in navigator) {
      navigator.vibrate(3);
    }
  }

  function handleAssetFusePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (!isAssetFuseDragging || isAssetFuseLocked) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    setIsAssetFuseDragging(false);

    if (assetFuseProgressRef.current < 0.94) {
      updateAssetFuseProgress(0);
      return;
    }

    updateAssetFuseProgress(1);
    setIsAssetFuseLocked(true);
    setAssetFuseStage("break");
    if ("vibrate" in navigator) {
      navigator.vibrate([18, 22, 42]);
    }
    assetFuseTimerRef.current = window.setTimeout(() => {
      setAssetFuseStage("crystal");
      handleConfirmAssetUnlock();
    }, 980);
  }

  function handleExitCondensedAsset() {
    setIsCurrentAssetSaved(true);
  }

  function handleOpenEmotionWeaponStep() {
    if (emotionBreakthroughStep !== 2) {
      setEmotionSpaceHint("先看完它怎么接管你。");
      return;
    }

    setEmotionSpaceHint("");
    setSelectedEmotionWeapon(null);
    setEmotionSpaceStep("weapon");
  }

  function handleEmotionBreakthroughNext() {
    setEmotionSpaceHint("");
    if (emotionBreakthroughStep === 0) {
      setEmotionBreakthroughStep(1);
      return;
    }
    if (emotionBreakthroughStep === 1) {
      setEmotionBreakthroughStep(2);
      return;
    }

    setEmotionSpaceHint("左滑，选择武器。");
  }

  function handleCancelEmotionWeapon() {
    setEmotionSpaceHint("");
    setSelectedEmotionWeapon(null);
    setEmotionSpaceStep("entry");
  }

  function handleWakeEmotionWeapon() {
    if (!selectedEmotionWeapon) {
      setEmotionSpaceHint("先选一件武器。");
      return;
    }

    setEmotionSpaceHint("");
    setEmotionSpaceStep("completed");
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

  function setGenericSpaceHint(spaceId: SixSpaceId, hint: string) {
    setSpaceHints((current) => ({ ...current, [spaceId]: hint }));
  }

  function selectGenericIntensity(spaceId: SixSpaceId, value: SixSpaceIntensity) {
    setSpaceIntensities((current) => ({ ...current, [spaceId]: value }));
    setGenericSpaceHint(spaceId, "");
  }

  function requireGenericIntensity(spaceId: SixSpaceId) {
    setGenericSpaceHint(spaceId, "先看见它到了什么程度。");
  }

  function handleGenericNextSpace(spaceId: SixSpaceId) {
    if (!spaceIntensities[spaceId]) {
      requireGenericIntensity(spaceId);
      return;
    }

    setSpaceSteps((current) => ({ ...current, [spaceId]: "entry" }));
    setSpaceBreakthroughSteps((current) => ({ ...current, [spaceId]: 0 }));
    setGenericSpaceHint(spaceId, "");
    handleNextSpace();
  }

  function handleGenericBreakSpace(spaceId: SixSpaceId) {
    if (!spaceIntensities[spaceId]) {
      requireGenericIntensity(spaceId);
      return;
    }

    setSpaceBreakthroughSteps((current) => ({ ...current, [spaceId]: 0 }));
    setSpaceSteps((current) => ({ ...current, [spaceId]: "breakthrough" }));
    setGenericSpaceHint(spaceId, "");
  }

  function handleGenericBreakthroughNext(spaceId: SixSpaceId) {
    setGenericSpaceHint(spaceId, "");
    const currentStep = spaceBreakthroughSteps[spaceId];

    if (currentStep === 0) {
      setSpaceBreakthroughSteps((current) => ({ ...current, [spaceId]: 1 }));
      return;
    }
    if (currentStep === 1) {
      setSpaceBreakthroughSteps((current) => ({ ...current, [spaceId]: 2 }));
      return;
    }

    setGenericSpaceHint(spaceId, "左滑，选择武器。");
  }

  function handleOpenGenericWeaponStep(spaceId: SixSpaceId) {
    if (spaceBreakthroughSteps[spaceId] !== 2) {
      setGenericSpaceHint(spaceId, "先看完它怎么接管你。");
      return;
    }

    setSelectedSpaceWeapons((current) => ({ ...current, [spaceId]: null }));
    setSpaceSteps((current) => ({ ...current, [spaceId]: "weapon" }));
    setGenericSpaceHint(spaceId, "");
  }

  function selectGenericWeapon(spaceId: SixSpaceId, weaponId: SixSpaceWeaponId) {
    setSelectedSpaceWeapons((current) => ({ ...current, [spaceId]: weaponId }));
    setGenericSpaceHint(spaceId, "");
  }

  function handleCancelGenericWeapon(spaceId: SixSpaceId) {
    setSelectedSpaceWeapons((current) => ({ ...current, [spaceId]: null }));
    setSpaceSteps((current) => ({ ...current, [spaceId]: "entry" }));
    setGenericSpaceHint(spaceId, "");
  }

  function handleWakeGenericWeapon(spaceId: SixSpaceId) {
    const selectedWeapon = selectedSpaceWeapons[spaceId];

    if (!selectedWeapon) {
      setGenericSpaceHint(spaceId, "先选一件武器。");
      return;
    }

    setSpaceSteps((current) => ({ ...current, [spaceId]: "completed" }));
    setGenericSpaceHint(spaceId, "");
  }

  function handleGenericCompletedNext(spaceId: SixSpaceId) {
    setSpaceSteps((current) => ({ ...current, [spaceId]: "entry" }));
    setSpaceBreakthroughSteps((current) => ({ ...current, [spaceId]: 0 }));
    setGenericSpaceHint(spaceId, "");
    handleNextSpace();
  }

  function handleConfirmAssetUnlock() {
    setIsCurrentAssetSaved(true);
    setAssetStep("unlocked");
  }

  if (USE_COSMIC_BOTANICS_SIX_SPACE || LEGACY_DYNAMICS_FLOW_ISOLATED) {
    const activeCosmicConfig = sixSpaceConfigs[Math.max(0, Math.min(sixSpaceConfigs.length - 1, sixDimensionStep - 1))] ?? sixSpaceConfigs[0];
    const cosmicPageCopy = generateSixDimensionalTuningDialogue({
      pressureSeedText: selectedPressureSeedSurface,
      starBeastName: resolveCosmicStarBeastName(cosmicBotanicsRuntime.starFlower.form),
      dimension: resolveCosmicNarrativeDimension(activeCosmicConfig?.id),
    });
    const cosmicTopCopyOpacity =
      cosmicNarrativePhase === "field_intro"
        ? 1
        : cosmicNarrativePhase === "seed_visible"
          ? 0.82
          : cosmicNarrativePhase === "beast_guide"
            ? 0.42
            : 0;

    return (
      <main
        style={{
          minHeight: "100dvh",
          width: "100%",
          boxSizing: "border-box",
          padding: "46px 20px calc(34px + env(safe-area-inset-bottom))",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 22,
          background:
            "radial-gradient(circle at 50% 28%, rgba(199,169,107,0.08), transparent 32%), radial-gradient(circle at 50% 64%, rgba(0,184,212,0.05), transparent 42%), #050607",
          color: "#f5f5f5",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5 }}>
          {Array.from({ length: 42 }).map((_, index) => (
            <span
              key={index}
              style={{
                position: "absolute",
                left: `${4 + ((index * 19) % 92)}%`,
                top: `${5 + ((index * 31) % 88)}%`,
                width: index % 9 === 0 ? 3 : 2,
                height: index % 9 === 0 ? 3 : 2,
                borderRadius: 999,
                background: index % 6 === 0 ? "rgba(199,169,107,0.5)" : "rgba(245,245,245,0.32)",
                boxShadow: index % 6 === 0 ? "0 0 12px rgba(199,169,107,0.32)" : "0 0 8px rgba(245,245,245,0.18)",
              }}
            />
          ))}
        </div>

        <section
          style={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gap: 18,
            opacity: cosmicTopCopyOpacity,
            transition: "opacity 360ms ease",
            pointerEvents: cosmicTopCopyOpacity > 0 ? "auto" : "none",
          }}
        >
          <span
            style={{
              color: "rgba(199,169,107,0.76)",
              fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              fontSize: 12,
              letterSpacing: "0.16em",
            }}
          >
            FIELD 04 / 6D ALIGNMENT
          </span>

          <p style={{ margin: 0, maxWidth: 292, color: "rgba(245,245,245,0.64)", fontSize: 15, lineHeight: 1.6 }}>
            {cosmicPageCopy.fieldTitle}
          </p>
        </section>

        <section
          style={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gap: 18,
          }}
        >
          <CosmicBotanicsField
            configs={sixSpaceConfigs}
            currentStep={sixDimensionStep}
            pressureSeedSurface={selectedPressureSeedSurface}
            petalStates={visiblePetalStates}
            pollenBursts={cosmicPollenBursts}
            starbeast={cosmicBotanicsRuntime.starbeast}
            starFlowerForm={cosmicBotanicsRuntime.starFlower.form}
            starFlowerState={cosmicBotanicsRuntime.starFlower.growthState}
            hexagramReadiness={cosmicBotanicsRuntime.hexagramCardGeneration.readiness}
            activeNodeIndex={cosmicNodeStep}
            narrativePhase={cosmicNarrativePhase}
            onNodeBloom={bloomCosmicNode}
            coreStars={baiHuRuntimeCoreStars}
          />
        </section>

        <footer
          style={{
            position: "relative",
            zIndex: 1,
            display: "block",
            color: "rgba(245,245,245,0.5)",
            fontSize: 12,
            lineHeight: 1.55,
          }}
        >
          {cosmicNarrativePhase === "node_complete" ? cosmicPageCopy.completionText : ""}
        </footer>
      </main>
    );
  }

  // DEPRECATED / ISOLATED / NOT IN ACTIVE 1.0 FLOW.
  // Legacy six-space / weapon / annular-asset JSX is physically isolated outside the active 1.0 surface.
  return <LegacyDynamicsDormant branch="six-space-weapon-annular-asset" />;
}

export function GravityPage() {
  if (!USE_HEXAGRAM_DELIVERY_SHELL && !LEGACY_R1_DEMO_DYNAMICS_ISOLATED) {
    return <LegacyDynamicsDormant branch="r1-demo-dynamics" />;
  }

  return <HexagramCodeDeliveryShell />;
}
