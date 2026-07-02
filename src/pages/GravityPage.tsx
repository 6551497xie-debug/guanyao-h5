/**
 * GravityPage = passive UI visualization layer for presenting existing causal state transitions
 * without any influence on engine or data flow.
 */
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { CausalRail } from "../components/causal/CausalRail";
import {
  BaiHuStarFlowerComponent,
  QingLongStarFlowerComponent,
  XuanWuStarFlowerComponent,
  ZhuQueStarFlowerComponent,
} from "../components/cosmic-botanics/StarFlowerComponents";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { getGuanyaoR8ReadModel } from "../adapters/guanyaoR8ReadModelAdapter";
import { guanyaoHexagramAssetLibrary } from "../data/guanyaoHexagramAssetLibrary";
import { getPressureSeedSixSpaceProjection } from "../data/guanyaoPressureSeedSixSpaceProjectionRegistry";
import {
  generateCosmicBotanicsNarrative,
  type CosmicBotanicsNarrativeBeastName,
  type CosmicBotanicsNarrativeDimension,
} from "../expression/cosmicBotanicsNarrativeEngine";
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

const USE_HEXAGRAM_DELIVERY_SHELL = true;
const USE_COSMIC_BOTANICS_SIX_SPACE = true;
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

function resolveCosmicStarBeastName(starFlowerForm: StarFlowerForm): CosmicBotanicsNarrativeBeastName {
  const starBeastNameByForm: Record<StarFlowerForm, CosmicBotanicsNarrativeBeastName> = {
    qinglong: "青龙",
    baihu: "白虎",
    zhuque: "朱雀",
    xuanwu: "玄武",
  };

  return starBeastNameByForm[starFlowerForm];
}

function resolveCosmicNarrativeDimension(spaceId: SixSpaceId | undefined): CosmicBotanicsNarrativeDimension {
  if (spaceId === "action") return "behavior";
  if (spaceId === "goal") return "motivation";
  return spaceId ?? "body";
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
  onNodeBloom,
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
  onNodeBloom: () => void;
}) {
  const seedTone = pressureSeedSurface.length % 3;
  const toneColor = seedTone === 0 ? "199,169,107" : seedTone === 1 ? "222,196,154" : "176,210,206";
  const activeConfig = configs[Math.max(0, Math.min(configs.length - 1, currentStep - 1))] ?? configs[0];
  const activePetalState = activeConfig ? petalStates[activeConfig.id] : "active";
  const activePollenBurst = activeConfig ? pollenBursts[activeConfig.id] : 0;
  const narrative = generateCosmicBotanicsNarrative({
    pressureSeedText: pressureSeedSurface,
    starBeastName: resolveCosmicStarBeastName(starFlowerForm),
    currentDimension: resolveCosmicNarrativeDimension(activeConfig?.id),
  });
  const nodeFlow = narrative.nodeSteps;
  const activeNode = nodeFlow[Math.min(activeNodeIndex, nodeFlow.length - 1)];
  const readinessTone =
    hexagramReadiness >= 0.98
      ? "它正在开成一束光"
      : activeNodeIndex > 0
        ? "它正在慢慢开花"
        : "星兽正在接住它";
  const shortPetalNames = ["身体", "情绪", "思维", "行为", "记忆", "目标"];
  const starFlowerComponentProps = {
    toneColor,
    starbeast,
    growthState: starFlowerState,
    readiness: hexagramReadiness,
  };

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

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "22%",
          width: "78%",
          minHeight: 120,
          transform: "translateX(-50%)",
          display: "grid",
          placeItems: "center",
          color: "rgba(245,245,245,0.86)",
          pointerEvents: "none",
          textAlign: "center",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 142,
            height: 142,
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
            width: 168,
            height: 168,
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
            maxWidth: 246,
            color: "rgba(245,245,245,0.82)",
            fontSize: 12,
            lineHeight: 1.46,
            fontWeight: 520,
            textShadow: `0 0 16px rgba(${toneColor},0.18)`,
            animation: "gy-stardust-drift 4s ease-in-out infinite",
          }}
        >
          <span style={{ color: `rgba(${toneColor},0.76)`, fontSize: 10, letterSpacing: "0.08em" }}>
            {narrative.fieldTitle}
          </span>
          <span>{narrative.pressureText}</span>
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          left: 22,
          right: 22,
          bottom: 40,
          display: "grid",
          gap: 8,
          pointerEvents: "none",
          padding: "14px 14px 13px",
          borderRadius: 16,
          background: "linear-gradient(180deg, rgba(5,6,7,0.54), rgba(5,6,7,0.22))",
          border: `1px solid rgba(${toneColor},0.14)`,
          backdropFilter: "blur(4px)",
        }}
      >
        <GuanyaoText size="eyebrow" tone="gold">
          {activeNode.title}
        </GuanyaoText>
        <p style={{ margin: 0, whiteSpace: "pre-line", color: "rgba(245,245,245,0.76)", fontSize: 13, lineHeight: 1.58 }}>
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
          top: "39%",
          zIndex: 1,
          margin: 0,
          whiteSpace: "pre-line",
          color: "rgba(245,245,245,0.62)",
          fontSize: 12,
          lineHeight: 1.55,
          pointerEvents: "none",
        }}
      >
        {narrative.beastIntro}
      </p>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "58%",
          width: 210,
          height: 210,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      >
        {starFlowerForm === "qinglong" ? <QingLongStarFlowerComponent {...starFlowerComponentProps} /> : null}
        {starFlowerForm === "baihu" ? <BaiHuStarFlowerComponent {...starFlowerComponentProps} /> : null}
        {starFlowerForm === "zhuque" ? <ZhuQueStarFlowerComponent {...starFlowerComponentProps} /> : null}
        {starFlowerForm === "xuanwu" ? <XuanWuStarFlowerComponent {...starFlowerComponentProps} /> : null}
      </div>

      {configs.map((config, index) => {
        const angle = -90 + index * 60;
        const rad = (angle * Math.PI) / 180;
        const isActive = config.id === activeConfig?.id;
        const state = petalStates[config.id];
        const left = 50 + Math.cos(rad) * 34;
        const top = 58 + Math.sin(rad) * 22;

        return (
          <span
            key={config.id}
            style={{
              "--petal-rotate": `${angle + 90}deg`,
              position: "absolute",
              left: `${left}%`,
              top: `${top}%`,
              width: isActive ? 68 : 54,
              height: isActive ? 28 : 22,
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

      <button
        type="button"
        onClick={onNodeBloom}
        aria-label={`${activeConfig?.name ?? "当前"}六星连珠`}
        style={{
          position: "absolute",
          left: "50%",
          top: "75%",
          width: "84%",
          height: "34%",
          transform: "translate(-50%, -50%)",
          border: "0",
          background: "transparent",
          color: "inherit",
          cursor: "pointer",
          padding: 0,
        }}
      >
        {nodeFlow.map((node, index) => {
          const positions = [
            [18, 58],
            [32, 43],
            [47, 55],
            [58, 36],
            [72, 48],
            [84, 30],
          ];
          const [left, top] = positions[index];
          const isLit = index < activeNodeIndex;
          const isNext = index === activeNodeIndex;
          const alpha = isLit ? 0.96 : isNext ? 0.74 : 0.28;
          const size = isLit ? 10 : isNext ? 9 : 6;

          return (
            <span
              key={node.title}
              style={{
                position: "absolute",
                left: `${left}%`,
                top: `${top}%`,
                width: size,
                height: size,
                borderRadius: 999,
                transform: "translate(-50%, -50%)",
                background: `rgba(${toneColor},${alpha})`,
                boxShadow: isLit || isNext ? `0 0 18px rgba(${toneColor},0.46)` : `0 0 8px rgba(${toneColor},0.14)`,
                animation: isNext ? "gy-node-pulse 1.4s ease-in-out infinite" : "none",
                transition: "width 260ms ease, height 260ms ease, opacity 260ms ease, box-shadow 260ms ease",
              }}
            >
              {index > 0 ? (
                <span
                  style={{
                    position: "absolute",
                    right: "50%",
                    top: "50%",
                    width: 58,
                    height: 1,
                    transform: `rotate(${index % 2 === 0 ? -26 : 24}deg)`,
                    transformOrigin: "right center",
                    background: `linear-gradient(90deg, rgba(${toneColor},${isLit ? 0.48 : 0.14}), transparent)`,
                  }}
                />
              ) : null}
            </span>
          );
        })}

        {activePollenBurst > 0
          ? Array.from({ length: 12 }).map((_, pollenIndex) => (
              <span
                key={`${activePollenBurst}-${pollenIndex}`}
                    style={{
                  "--pollen-x": `${Math.cos((pollenIndex / 12) * Math.PI * 2) * (36 + (pollenIndex % 4) * 10)}px`,
                  "--pollen-y": `${Math.sin((pollenIndex / 12) * Math.PI * 2) * (28 + (pollenIndex % 3) * 8)}px`,
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      width: 3,
                      height: 3,
                      borderRadius: 999,
                      background: `rgba(${toneColor},0.92)`,
                      boxShadow: `0 0 8px rgba(${toneColor},0.56)`,
                      pointerEvents: "none",
                      animation: "gy-pollen-rise 920ms ease-out both",
                    } as CSSProperties}
                  />
                ))
          : null}
      </button>

      <div style={{ position: "absolute", left: 18, bottom: 16, right: 18, display: "grid", gap: 5 }}>
        <GuanyaoText size="eyebrow" tone="gold">
          {activeNodeIndex >= 6 ? narrative.completionText : readinessTone}
        </GuanyaoText>
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

  if (USE_COSMIC_BOTANICS_SIX_SPACE) {
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

        <section style={{ position: "relative", zIndex: 1, display: "grid", gap: 18 }}>
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
            当前时空坐标遭遇风暴。先别急着判断，我们一起把光送回去。
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
            onNodeBloom={bloomCosmicNode}
          />
        </section>

        <footer
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            gap: 16,
            color: "rgba(245,245,245,0.5)",
            fontSize: 12,
            lineHeight: 1.55,
          }}
        >
          <span>
            {cosmicNodeStep >= 6 ? "这一局，已经开始结晶。" : "轻触星点，慢慢点亮这片花。"}
          </span>
          <span
            style={{
              color: cosmicNodeStep > 0 ? "rgba(199,169,107,0.82)" : "rgba(245,245,245,0.42)",
              letterSpacing: "0.04em",
            }}
          >
            {cosmicNodeStep >= 6 ? "这片花冠已替你亮起。" : "一点点往前。"}
          </span>
        </footer>
      </main>
    );
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
        {sixDimensionStep === 7
            ? "GY / ASSET / CURRENT"
            : sixDimensionStep === 4
              ? "04｜行为空间｜破心魔"
            : `GY / SPACE-0${sixDimensionStep} / ${currentSixSpaceConfig?.code ?? currentSpace?.spaceCode ?? "SPACE"}`}
      </span>

      {sixDimensionStep >= 1 && sixDimensionStep <= 6 ? (
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
            onNodeBloom={bloomCosmicNode}
          />
      ) : null}

      {currentSpace && sixDimensionStep === 1 && bodySpaceStep === "entry" ? (
        <>
          <header style={{ display: "grid", gap: 10 }}>
            <h1 style={{ margin: 0, color: "rgba(245,245,245,0.9)", fontSize: "clamp(34px, 10vw, 52px)", lineHeight: 1.08, fontWeight: 390 }}>
              身体空间
            </h1>
            <p style={{ margin: 0, color: "rgba(245,245,245,0.78)", fontSize: 18, lineHeight: 1.65 }}>
              “你的身体，比你先认输了。”
            </p>
          </header>

          <section
            aria-label="身体空间感知层"
            style={{
              display: "grid",
              gap: 20,
              minHeight: "54dvh",
              alignContent: "space-between",
              padding: "18px 0 4px",
              opacity: isBodyCaliperSandifying ? 0 : 1,
              transform: isBodyCaliperSandifying ? "translateY(22px)" : "translateY(0)",
              filter: isBodyCaliperSandifying ? "blur(1.5px)" : "none",
              transition: "opacity 520ms ease, transform 520ms ease, filter 520ms ease",
            }}
          >
            <div style={{ display: "grid", gap: 14 }}>
              <div style={{ display: "grid", gap: 7 }}>
                <span style={{ color: "rgba(245,245,245,0.28)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 10 }}>
                  01 ｜ 身体空间 · 负荷卡尺
                </span>
                <span style={{ color: "rgba(0,184,212,0.68)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11 }}>
                  当前承载压力之刺
                </span>
                <p style={{ margin: 0, color: "rgba(245,245,245,0.66)", fontSize: 15, lineHeight: 1.68 }}>
                  {selectedPressureSeedSurface}
                </p>
              </div>

              <p style={{ margin: 0, color: "rgba(245,245,245,0.62)", fontSize: 15, lineHeight: 1.72 }}>
                它一进身体，
                <br />
                最先变成肩背收紧、呼吸变浅，
                <br />
                还没开口就开始紧张。
              </p>
            </div>

            <div style={{ display: "grid", gap: 14 }}>
              <div
                style={{
                  minHeight: 126,
                  display: "grid",
                  alignContent: "center",
                  gap: 12,
                  color: isBodyCaliperLocked ? "#fff" : bodyCaliperProgress > 0.02 ? "#00B8D4" : "rgba(245,245,245,0.34)",
                  transition: "color 180ms ease",
                }}
              >
                <p style={{ margin: 0, fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 13, lineHeight: 1.5, color: "currentColor" }}>
                  【 {activeBodyCaliperLevel.mark} 档 ｜ {activeBodyCaliperLevel.title} 】
                </p>
                <p
                  style={{
                    margin: 0,
                    color: isBodyCaliperLocked ? "rgba(245,245,245,0.9)" : `rgba(245,245,245,${0.58 + bodyCaliperProgress * 0.22})`,
                    fontSize: 16 + bodyCaliperProgress * 2,
                    lineHeight: 1.72,
                    fontWeight: 700,
                    transition: isBodyCaliperDragging ? "none" : "color 160ms ease, font-size 160ms ease",
                  }}
                >
                  {activeBodyCaliperLevel.line}
                </p>
              </div>
            </div>

            <div style={{ display: "grid", gap: 10, paddingBottom: 4 }}>
              <div
                ref={bodyCaliperRailRef}
                role="slider"
                aria-label="身体负荷卡尺"
                aria-valuemin={1}
                aria-valuemax={3}
                aria-valuenow={activeBodyCaliperIndex + 1}
                onPointerDown={handleBodyCaliperPointerDown}
                onPointerMove={handleBodyCaliperPointerMove}
                onPointerUp={handleBodyCaliperPointerUp}
                onPointerCancel={handleBodyCaliperPointerUp}
                style={{
                  position: "relative",
                  height: 50,
                  touchAction: "none",
                  cursor: isBodyCaliperLocked ? "default" : "grab",
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 24,
                    height: 1,
                    background: isBodyCaliperLocked ? "rgba(255,255,255,0.92)" : "rgba(245,245,245,0.3)",
                    boxShadow: isBodyCaliperLocked ? "0 0 18px rgba(255,255,255,0.36)" : "none",
                    transform: isBodyCaliperDragging ? `translateY(${Math.sin(bodyCaliperProgress * Math.PI) * -8}px)` : "translateY(0)",
                    transition: isBodyCaliperDragging ? "none" : "transform 220ms ease, background 180ms ease, box-shadow 180ms ease",
                  }}
                />
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 24,
                    width: `${bodyCaliperProgress * 100}%`,
                    height: 1,
                    background: isBodyCaliperLocked ? "#fff" : "#00B8D4",
                    boxShadow: isBodyCaliperLocked ? "0 0 18px rgba(255,255,255,0.38)" : "0 0 14px rgba(0,184,212,0.32)",
                    transform: isBodyCaliperDragging ? `translateY(${Math.sin(bodyCaliperProgress * Math.PI) * -8}px)` : "translateY(0)",
                    transition: isBodyCaliperDragging ? "none" : "width 180ms ease, transform 220ms ease, background 180ms ease",
                  }}
                />
                {bodyCaliperMarkProgress.map((markProgress, index) => {
                  const isActive = activeBodyCaliperIndex === index;
                  return (
                    <span
                      key={markProgress}
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        left: `${markProgress * 100}%`,
                        top: 18,
                        width: isActive ? 7 : 3,
                        height: isActive ? 7 : 3,
                        transform: "translateX(-50%)",
                        border: isActive ? "1px solid rgba(0,184,212,0.92)" : "none",
                        background: isActive ? "transparent" : "rgba(245,245,245,0.22)",
                        boxShadow: isActive ? "0 0 12px rgba(0,184,212,0.35)" : "none",
                      }}
                    />
                  );
                })}
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: `${bodyCaliperProgress * 100}%`,
                    top: 24,
                    width: isBodyCaliperLocked ? 8 : 9,
                    height: isBodyCaliperLocked ? 8 : 9,
                    transform: "translate(-50%, -50%)",
                    border: `1px solid ${isBodyCaliperLocked ? "#fff" : "#00B8D4"}`,
                    background: isBodyCaliperLocked ? "#fff" : "#00B8D4",
                    boxShadow: isBodyCaliperLocked ? "0 0 16px rgba(255,255,255,0.42)" : "0 0 14px rgba(0,184,212,0.42)",
                    transition: isBodyCaliperDragging ? "none" : "left 220ms ease, border 180ms ease, background 180ms ease, box-shadow 180ms ease",
                  }}
                />
              </div>
              <p style={{ margin: 0, color: isBodyCaliperLocked ? "rgba(255,255,255,0.8)" : "rgba(245,245,245,0.34)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 10, lineHeight: 1.5 }}>
                {isBodyCaliperLocked
                  ? "［ ➔ 身体负荷代码已锁止，正在突防进入 02 情绪空间 ］"
                  : bodyCaliperProgress > 0.02
                    ? `［ ${activeBodyCaliperLevel.mark} · 身体空间 ｜ 轴向滑动测量负荷程度 ］`
                    : "［ 身体空间 ｜ 从左向右推动卡尺，测量负荷程度 ］"}
              </p>
              {bodySpaceHint ? (
                <p style={{ margin: 0, color: "rgba(0,184,212,0.76)", fontSize: 13, lineHeight: 1.55 }}>
                  {bodySpaceHint}
                </p>
              ) : null}
            </div>
          </section>
        </>
      ) : null}

      {currentSpace && sixDimensionStep === 1 && bodySpaceStep === "breakthrough" ? (
        <>
          <header style={{ display: "grid", gap: 10 }}>
            <h1 style={{ margin: 0, color: "rgba(245,245,245,0.9)", fontSize: "clamp(30px, 8vw, 42px)", lineHeight: 1.1, fontWeight: 390 }}>
              身体空间 · 破局推演
            </h1>
          </header>

          <section
            aria-label="身体空间破局推演"
            style={{
              display: "grid",
              gap: 18,
              padding: "18px 0",
              borderTop: "1px solid rgba(199,169,107,0.34)",
              borderBottom: "1px solid rgba(85,85,85,0.38)",
            }}
          >
            <div style={{ display: "grid", gap: 10 }}>
              <p style={{ margin: 0, color: "rgba(245,245,245,0.82)", fontSize: 18, lineHeight: 1.6 }}>
                {bodyBreakthroughScenes[bodyBreakthroughStep].title}
              </p>
              <div style={{ display: "grid", gap: 6 }}>
                {bodyBreakthroughScenes[bodyBreakthroughStep].lines.map((line) => (
                  <p key={line} style={{ margin: 0, color: "rgba(245,245,245,0.66)", fontSize: 16, lineHeight: 1.72 }}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
            {bodySpaceHint ? (
              <p style={{ margin: 0, color: "rgba(0,184,212,0.78)", fontSize: 14, lineHeight: 1.58 }}>
                {bodySpaceHint}
              </p>
            ) : null}
          </section>

          <CausalRail
            statusLabel={bodySpaceHint || `${bodyBreakthroughStep + 1} / 3`}
            leftHint={bodyBreakthroughStep === 2 ? "左滑，选择武器" : "左滑，暂不进入"}
            rightHint={bodyBreakthroughStep === 0 ? "右滑，继续看它怎么接管你" : bodyBreakthroughStep === 1 ? "右滑，继续" : "右滑，停在这里"}
            onLeft={handleOpenBodyWeaponStep}
            onRight={handleBodyBreakthroughNext}
          />
        </>
      ) : null}

      {currentSpace && sixDimensionStep === 1 && bodySpaceStep === "weapon" ? (
        <>
          <header style={{ display: "grid", gap: 10 }}>
            <h1 style={{ margin: 0, color: "rgba(245,245,245,0.9)", fontSize: "clamp(30px, 8vw, 42px)", lineHeight: 1.1, fontWeight: 390 }}>
              身体空间 · 破局点
            </h1>
            <p style={{ margin: 0, color: "rgba(245,245,245,0.72)", fontSize: 18, lineHeight: 1.6 }}>
              你需要什么武器？
            </p>
          </header>

          <section
            aria-label="身体空间武器选择"
            style={{
              display: "grid",
              gap: 12,
              padding: "18px 0",
              borderTop: "1px solid rgba(199,169,107,0.34)",
              borderBottom: "1px solid rgba(85,85,85,0.38)",
            }}
          >
            {bodyWeaponOptions.map((weapon) => {
              const isSelected = selectedBodyWeapon === weapon.value;

              return (
                <button
                  key={weapon.value}
                  type="button"
                  onClick={() => {
                    setSelectedBodyWeapon(weapon.value);
                    setBodySpaceHint("");
                  }}
                  style={{
                    appearance: "none",
                    border: `1px solid ${isSelected ? "rgba(0,184,212,0.78)" : "rgba(245,245,245,0.18)"}`,
                    background: isSelected ? "rgba(0,184,212,0.08)" : "rgba(245,245,245,0.02)",
                    color: "rgba(245,245,245,0.74)",
                    display: "grid",
                    gap: 7,
                    padding: "14px 12px",
                    textAlign: "left",
                    font: "inherit",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 10, color: isSelected ? "rgba(245,245,245,0.9)" : "rgba(245,245,245,0.72)" }}>
                    <span
                      aria-hidden="true"
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: "50%",
                        border: `1px solid ${isSelected ? "rgba(0,184,212,0.95)" : "rgba(245,245,245,0.42)"}`,
                        background: isSelected ? "rgba(0,184,212,0.9)" : "transparent",
                        boxShadow: isSelected ? "0 0 12px rgba(0,184,212,0.36)" : "none",
                        flex: "0 0 auto",
                      }}
                    />
                    {weapon.label}
                  </span>
                  <span style={{ color: "rgba(245,245,245,0.58)", fontSize: 14, lineHeight: 1.58 }}>
                    “{weapon.line}”
                  </span>
                </button>
              );
            })}

            {bodyWeaponOptions
              .filter((weapon) => weapon.value === selectedBodyWeapon)
              .map((weapon) => (
                <div
                  key={`confirm-${weapon.value}`}
                  style={{
                    display: "grid",
                    gap: 6,
                    padding: "12px 12px",
                    border: "1px solid rgba(199,169,107,0.28)",
                    background: "rgba(199,169,107,0.045)",
                  }}
                >
                  <span style={{ color: "rgba(199,169,107,0.78)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 12, letterSpacing: "0.08em" }}>
                    将消耗 ⌛ {weapon.cost}
                  </span>
                  <p style={{ margin: 0, color: "rgba(245,245,245,0.76)", fontSize: 15, lineHeight: 1.58 }}>
                    唤醒「{weapon.label}」。
                  </p>
                  <p style={{ margin: 0, color: "rgba(245,245,245,0.56)", fontSize: 14, lineHeight: 1.58 }}>
                    这是一次反本能动作。
                  </p>
                </div>
              ))}

            {bodySpaceHint ? (
              <p style={{ margin: 0, color: "rgba(0,184,212,0.78)", fontSize: 14, lineHeight: 1.58 }}>
                {bodySpaceHint}
              </p>
            ) : null}

            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, paddingTop: 6 }}>
              <button
                type="button"
                onClick={handleCancelBodyWeapon}
                style={{
                  appearance: "none",
                  border: "1px solid rgba(245,245,245,0.18)",
                  background: "transparent",
                  color: "rgba(245,245,245,0.58)",
                  minHeight: 40,
                  padding: "8px 18px",
                  font: "inherit",
                }}
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleWakeBodyWeapon}
                style={{
                  appearance: "none",
                  border: "1px solid rgba(0,184,212,0.72)",
                  background: "rgba(0,184,212,0.08)",
                  color: "rgba(245,245,245,0.88)",
                  minHeight: 40,
                  padding: "8px 18px",
                  font: "inherit",
                }}
              >
                唤醒
              </button>
            </div>
          </section>
        </>
      ) : null}

      {currentSpace && sixDimensionStep === 1 && bodySpaceStep === "completed" ? (
        <>
          <header style={{ display: "grid", gap: 10 }}>
            <h1 style={{ margin: 0, color: "rgba(245,245,245,0.9)", fontSize: "clamp(30px, 8vw, 42px)", lineHeight: 1.1, fontWeight: 390 }}>
              器法已落成。
            </h1>
          </header>

          <section
            aria-label="身体空间器法落成"
            style={{
              display: "grid",
              gap: 14,
              padding: "18px 0",
              borderTop: "1px solid rgba(199,169,107,0.34)",
              borderBottom: "1px solid rgba(85,85,85,0.38)",
            }}
          >
            <p style={{ margin: 0, color: "rgba(245,245,245,0.78)", fontSize: 18, lineHeight: 1.62 }}>
              你唤醒了「{bodyWeaponOptions.find((weapon) => weapon.value === selectedBodyWeapon)?.label ?? "一件武器"}」。
            </p>
            <div style={{ height: 1, background: "linear-gradient(90deg, rgba(199,169,107,0.3), transparent)" }} />
            <span style={{ color: "rgba(199,169,107,0.72)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11, letterSpacing: "0.13em" }}>
              今日可做的动作：
            </span>
            {(bodyWeaponOptions.find((weapon) => weapon.value === selectedBodyWeapon)?.completedLines ?? bodyWeaponOptions[0].completedLines).map((line) => (
              <p key={line} style={{ margin: 0, color: "rgba(245,245,245,0.76)", fontSize: 18, lineHeight: 1.62 }}>
                {line}
              </p>
            ))}
            <div style={{ height: 1, background: "linear-gradient(90deg, rgba(199,169,107,0.3), transparent)" }} />
            <p style={{ margin: "4px 0 0", color: "rgba(199,169,107,0.76)", fontSize: 16, lineHeight: 1.62 }}>
              已存入你的武器库。
            </p>
          </section>

          <CausalRail
            statusLabel="器法已落成"
            rightHint="右滑，进入下一空间"
            onRight={handleNextSpaceFromBody}
          />
        </>
      ) : null}

      {currentSpace && sixDimensionStep === 2 && emotionSpaceStep === "entry" ? (
        <>
          <header style={{ display: "grid", gap: 10 }}>
            <h1 style={{ margin: 0, color: "rgba(245,245,245,0.9)", fontSize: "clamp(34px, 10vw, 52px)", lineHeight: 1.08, fontWeight: 390 }}>
              情绪空间
            </h1>
            <p style={{ margin: 0, color: "rgba(245,245,245,0.78)", fontSize: 18, lineHeight: 1.65 }}>
              “你被不安接管了。”
            </p>
          </header>

          <section
            aria-label="情绪空间感知层"
            style={{
              display: "grid",
              gap: 20,
              minHeight: "54dvh",
              alignContent: "space-between",
              padding: "18px 0 4px",
              opacity: isEmotionCaliperSandifying ? 0 : 1,
              transform: isEmotionCaliperSandifying ? "translateY(22px)" : "translateY(0)",
              filter: isEmotionCaliperSandifying ? "blur(1.5px)" : "none",
              transition: "opacity 520ms ease, transform 520ms ease, filter 520ms ease",
            }}
          >
            <div style={{ display: "grid", gap: 14 }}>
              <div style={{ display: "grid", gap: 7 }}>
                <span style={{ color: "rgba(245,245,245,0.28)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 10 }}>
                  02 ｜ 情绪空间 · 流体线轨
                </span>
                <span style={{ color: "rgba(0,184,212,0.68)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11 }}>
                  当前承载压力之刺
                </span>
                <p style={{ margin: 0, color: "rgba(245,245,245,0.66)", fontSize: 15, lineHeight: 1.68 }}>
                  {selectedPressureSeedSurface}
                </p>
              </div>

              <p style={{ margin: 0, color: "rgba(245,245,245,0.62)", fontSize: 15, lineHeight: 1.72 }}>
                你还没反应过来，
                <br />
                情绪已经先到了。
                <br />
                它正在试图用解释换安全。
              </p>
            </div>

            <div style={{ display: "grid", gap: 14 }}>
              <div
                style={{
                  minHeight: 126,
                  display: "grid",
                  alignContent: "center",
                  gap: 12,
                  color: isEmotionCaliperLocked ? "#fff" : emotionCaliperProgress > 0.02 ? "#00B8D4" : "rgba(245,245,245,0.34)",
                  transition: "color 180ms ease",
                }}
              >
                <p style={{ margin: 0, fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 13, lineHeight: 1.5, color: "currentColor" }}>
                  【 {activeEmotionCaliperLevel.mark} 档 ｜ {activeEmotionCaliperLevel.title} 】
                </p>
                <p
                  style={{
                    margin: 0,
                    color: isEmotionCaliperLocked ? "rgba(245,245,245,0.9)" : `rgba(245,245,245,${0.58 + emotionCaliperProgress * 0.22})`,
                    fontSize: 16 + emotionCaliperProgress * 2,
                    lineHeight: 1.72,
                    fontWeight: 700,
                    transition: isEmotionCaliperDragging ? "none" : "color 160ms ease, font-size 160ms ease",
                  }}
                >
                  {activeEmotionCaliperLevel.line}
                </p>
              </div>
            </div>

            <div style={{ display: "grid", gap: 10, paddingBottom: 4 }}>
              <div
                ref={emotionCaliperRailRef}
                role="slider"
                aria-label="情绪负荷流体线"
                aria-valuemin={1}
                aria-valuemax={3}
                aria-valuenow={activeEmotionCaliperIndex + 1}
                onPointerDown={handleEmotionCaliperPointerDown}
                onPointerMove={handleEmotionCaliperPointerMove}
                onPointerUp={handleEmotionCaliperPointerUp}
                onPointerCancel={handleEmotionCaliperPointerUp}
                style={{
                  position: "relative",
                  height: 58,
                  touchAction: "none",
                  cursor: isEmotionCaliperLocked ? "default" : "grab",
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 28,
                    height: 1,
                    background: isEmotionCaliperLocked
                      ? "rgba(255,255,255,0.92)"
                      : `linear-gradient(90deg, rgba(245,245,245,0.18), rgba(0,184,212,${0.16 + emotionCaliperProgress * 0.22}), rgba(245,245,245,0.18))`,
                    boxShadow: isEmotionCaliperLocked ? "0 0 18px rgba(255,255,255,0.36)" : "0 0 14px rgba(0,184,212,0.16)",
                    transform: isEmotionCaliperDragging
                      ? `translateY(${Math.sin(emotionCaliperProgress * Math.PI) * -10}px) skewY(${Math.sin(emotionCaliperProgress * Math.PI) * -1.4}deg)`
                      : `translateY(${Math.sin(Date.now() / 900) * 1.2}px)`,
                    transition: isEmotionCaliperDragging ? "none" : "transform 260ms ease, background 180ms ease, box-shadow 180ms ease",
                  }}
                />
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 28,
                    width: `${emotionCaliperProgress * 100}%`,
                    height: 1,
                    background: isEmotionCaliperLocked ? "#fff" : "#00B8D4",
                    boxShadow: isEmotionCaliperLocked ? "0 0 18px rgba(255,255,255,0.38)" : "0 0 16px rgba(0,184,212,0.34)",
                    transform: isEmotionCaliperDragging ? `translateY(${Math.sin(emotionCaliperProgress * Math.PI) * -10}px)` : "translateY(0)",
                    transition: isEmotionCaliperDragging ? "none" : "width 200ms ease, transform 260ms ease, background 180ms ease",
                  }}
                />
                {bodyCaliperMarkProgress.map((markProgress, index) => {
                  const isActive = activeEmotionCaliperIndex === index;
                  return (
                    <span
                      key={markProgress}
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        left: `${markProgress * 100}%`,
                        top: 22,
                        width: isActive ? 7 : 3,
                        height: isActive ? 7 : 3,
                        transform: "translateX(-50%)",
                        border: isActive ? "1px solid rgba(0,184,212,0.92)" : "none",
                        background: isActive ? "transparent" : "rgba(245,245,245,0.22)",
                        boxShadow: isActive ? "0 0 12px rgba(0,184,212,0.35)" : "none",
                      }}
                    />
                  );
                })}
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: `${emotionCaliperProgress * 100}%`,
                    top: 28,
                    width: isEmotionCaliperLocked ? 8 : 9,
                    height: isEmotionCaliperLocked ? 8 : 9,
                    transform: "translate(-50%, -50%)",
                    border: `1px solid ${isEmotionCaliperLocked ? "#fff" : "#00B8D4"}`,
                    background: isEmotionCaliperLocked ? "#fff" : "#00B8D4",
                    boxShadow: isEmotionCaliperLocked ? "0 0 16px rgba(255,255,255,0.42)" : "0 0 16px rgba(0,184,212,0.46)",
                    transition: isEmotionCaliperDragging ? "none" : "left 220ms ease, border 180ms ease, background 180ms ease, box-shadow 180ms ease",
                  }}
                />
              </div>
              <p style={{ margin: 0, color: isEmotionCaliperLocked ? "rgba(255,255,255,0.8)" : "rgba(245,245,245,0.34)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 10, lineHeight: 1.5 }}>
                {isEmotionCaliperLocked
                  ? "［ ➔ 情绪负荷代码已锁止，正在突防进入 03 思维空间 ］"
                  : emotionCaliperProgress > 0.02
                    ? `［ ${activeEmotionCaliperLevel.mark} · 情绪空间 ｜ 轴向滑动测量负荷程度 ］`
                    : "［ 情绪空间 ｜ 从左向右推动流体线，测量负荷程度 ］"}
              </p>
              {emotionSpaceHint ? (
                <p style={{ margin: 0, color: "rgba(0,184,212,0.76)", fontSize: 13, lineHeight: 1.55 }}>
                  {emotionSpaceHint}
                </p>
              ) : null}
            </div>
          </section>
        </>
      ) : null}

      {currentSpace && sixDimensionStep === 2 && emotionSpaceStep === "breakthrough" ? (
        <>
          <header style={{ display: "grid", gap: 10 }}>
            <h1 style={{ margin: 0, color: "rgba(245,245,245,0.9)", fontSize: "clamp(30px, 8vw, 42px)", lineHeight: 1.1, fontWeight: 390 }}>
              情绪空间 · 破局推演
            </h1>
          </header>

          <section
            aria-label="情绪空间破局推演"
            style={{
              display: "grid",
              gap: 18,
              padding: "18px 0",
              borderTop: "1px solid rgba(199,169,107,0.34)",
              borderBottom: "1px solid rgba(85,85,85,0.38)",
            }}
          >
            <div style={{ display: "grid", gap: 10 }}>
              <p style={{ margin: 0, color: "rgba(245,245,245,0.82)", fontSize: 18, lineHeight: 1.6 }}>
                {emotionBreakthroughScenes[emotionBreakthroughStep].title}
              </p>
              <div style={{ display: "grid", gap: 6 }}>
                {emotionBreakthroughScenes[emotionBreakthroughStep].lines.map((line) => (
                  <p key={line} style={{ margin: 0, color: "rgba(245,245,245,0.66)", fontSize: 16, lineHeight: 1.72 }}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
            {emotionSpaceHint ? (
              <p style={{ margin: 0, color: "rgba(0,184,212,0.78)", fontSize: 14, lineHeight: 1.58 }}>
                {emotionSpaceHint}
              </p>
            ) : null}
          </section>

          <CausalRail
            statusLabel={emotionSpaceHint || `${emotionBreakthroughStep + 1} / 3`}
            leftHint={emotionBreakthroughStep === 2 ? "左滑，选择武器" : "左滑，暂不进入"}
            rightHint={emotionBreakthroughStep === 0 ? "右滑，继续看它怎么接管你" : emotionBreakthroughStep === 1 ? "右滑，继续" : "右滑，停在这里"}
            onLeft={handleOpenEmotionWeaponStep}
            onRight={handleEmotionBreakthroughNext}
          />
        </>
      ) : null}

      {currentSpace && sixDimensionStep === 2 && emotionSpaceStep === "weapon" ? (
        <>
          <header style={{ display: "grid", gap: 10 }}>
            <h1 style={{ margin: 0, color: "rgba(245,245,245,0.9)", fontSize: "clamp(30px, 8vw, 42px)", lineHeight: 1.1, fontWeight: 390 }}>
              情绪空间 · 破局点
            </h1>
            <p style={{ margin: 0, color: "rgba(245,245,245,0.72)", fontSize: 18, lineHeight: 1.6 }}>
              你需要什么武器？
            </p>
          </header>

          <section
            aria-label="情绪空间武器选择"
            style={{
              display: "grid",
              gap: 12,
              padding: "18px 0",
              borderTop: "1px solid rgba(199,169,107,0.34)",
              borderBottom: "1px solid rgba(85,85,85,0.38)",
            }}
          >
            {emotionWeaponOptions.map((weapon) => {
              const isSelected = selectedEmotionWeapon === weapon.value;

              return (
                <button
                  key={weapon.value}
                  type="button"
                  onClick={() => {
                    setSelectedEmotionWeapon(weapon.value);
                    setEmotionSpaceHint("");
                  }}
                  style={{
                    appearance: "none",
                    border: `1px solid ${isSelected ? "rgba(0,184,212,0.78)" : "rgba(245,245,245,0.18)"}`,
                    background: isSelected ? "rgba(0,184,212,0.08)" : "rgba(245,245,245,0.02)",
                    color: "rgba(245,245,245,0.74)",
                    display: "grid",
                    gap: 7,
                    padding: "14px 12px",
                    textAlign: "left",
                    font: "inherit",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 10, color: isSelected ? "rgba(245,245,245,0.9)" : "rgba(245,245,245,0.72)" }}>
                    <span
                      aria-hidden="true"
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: "50%",
                        border: `1px solid ${isSelected ? "rgba(0,184,212,0.95)" : "rgba(245,245,245,0.42)"}`,
                        background: isSelected ? "rgba(0,184,212,0.9)" : "transparent",
                        boxShadow: isSelected ? "0 0 12px rgba(0,184,212,0.36)" : "none",
                        flex: "0 0 auto",
                      }}
                    />
                    {weapon.label}
                  </span>
                  <span style={{ color: "rgba(245,245,245,0.58)", fontSize: 14, lineHeight: 1.58 }}>
                    “{weapon.line}”
                  </span>
                </button>
              );
            })}

            {emotionWeaponOptions
              .filter((weapon) => weapon.value === selectedEmotionWeapon)
              .map((weapon) => (
                <div
                  key={`confirm-${weapon.value}`}
                  style={{
                    display: "grid",
                    gap: 6,
                    padding: "12px 12px",
                    border: "1px solid rgba(199,169,107,0.28)",
                    background: "rgba(199,169,107,0.045)",
                  }}
                >
                  <span style={{ color: "rgba(199,169,107,0.78)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 12, letterSpacing: "0.08em" }}>
                    将消耗 ⌛ {weapon.cost}
                  </span>
                  <p style={{ margin: 0, color: "rgba(245,245,245,0.76)", fontSize: 15, lineHeight: 1.58 }}>
                    唤醒「{weapon.label}」。
                  </p>
                  <p style={{ margin: 0, color: "rgba(245,245,245,0.56)", fontSize: 14, lineHeight: 1.58 }}>
                    这是一次反本能动作。
                  </p>
                </div>
              ))}

            {emotionSpaceHint ? (
              <p style={{ margin: 0, color: "rgba(0,184,212,0.78)", fontSize: 14, lineHeight: 1.58 }}>
                {emotionSpaceHint}
              </p>
            ) : null}

            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, paddingTop: 6 }}>
              <button
                type="button"
                onClick={handleCancelEmotionWeapon}
                style={{
                  appearance: "none",
                  border: "1px solid rgba(245,245,245,0.18)",
                  background: "transparent",
                  color: "rgba(245,245,245,0.58)",
                  minHeight: 40,
                  padding: "8px 18px",
                  font: "inherit",
                }}
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleWakeEmotionWeapon}
                style={{
                  appearance: "none",
                  border: "1px solid rgba(0,184,212,0.72)",
                  background: "rgba(0,184,212,0.08)",
                  color: "rgba(245,245,245,0.88)",
                  minHeight: 40,
                  padding: "8px 18px",
                  font: "inherit",
                }}
              >
                唤醒
              </button>
            </div>
          </section>
        </>
      ) : null}

      {currentSpace && sixDimensionStep === 2 && emotionSpaceStep === "completed" ? (
        <>
          <header style={{ display: "grid", gap: 10 }}>
            <h1 style={{ margin: 0, color: "rgba(245,245,245,0.9)", fontSize: "clamp(30px, 8vw, 42px)", lineHeight: 1.1, fontWeight: 390 }}>
              器法已落成。
            </h1>
          </header>

          <section
            aria-label="情绪空间器法落成"
            style={{
              display: "grid",
              gap: 14,
              padding: "18px 0",
              borderTop: "1px solid rgba(199,169,107,0.34)",
              borderBottom: "1px solid rgba(85,85,85,0.38)",
            }}
          >
            <p style={{ margin: 0, color: "rgba(245,245,245,0.78)", fontSize: 18, lineHeight: 1.62 }}>
              你唤醒了「{emotionWeaponOptions.find((weapon) => weapon.value === selectedEmotionWeapon)?.label ?? "一件武器"}」。
            </p>
            <div style={{ height: 1, background: "linear-gradient(90deg, rgba(199,169,107,0.3), transparent)" }} />
            <span style={{ color: "rgba(199,169,107,0.72)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11, letterSpacing: "0.13em" }}>
              今日可做的动作：
            </span>
            {(emotionWeaponOptions.find((weapon) => weapon.value === selectedEmotionWeapon)?.completedLines ?? emotionWeaponOptions[0].completedLines).map((line) => (
              <p key={line} style={{ margin: 0, color: "rgba(245,245,245,0.76)", fontSize: 18, lineHeight: 1.62 }}>
                {line}
              </p>
            ))}
            <div style={{ height: 1, background: "linear-gradient(90deg, rgba(199,169,107,0.3), transparent)" }} />
            <p style={{ margin: "4px 0 0", color: "rgba(199,169,107,0.76)", fontSize: 16, lineHeight: 1.62 }}>
              已存入你的武器库。
            </p>
          </section>

          <CausalRail
            statusLabel="器法已落成"
            rightHint="右滑，进入下一空间"
            onRight={handleNextSpaceFromEmotion}
          />
        </>
      ) : null}

      {currentSixSpaceConfig && sixDimensionStep === 3 && currentSixSpaceConfig.id === "thought" && spaceSteps.thought === "entry" ? (
        <>
          <header style={{ display: "grid", gap: 10 }}>
            <h1 style={{ margin: 0, color: "rgba(245,245,245,0.9)", fontSize: "clamp(34px, 10vw, 52px)", lineHeight: 1.08, fontWeight: 390 }}>
              思维空间
            </h1>
            <p style={{ margin: 0, color: "rgba(245,245,245,0.78)", fontSize: 18, lineHeight: 1.65 }}>
              “你又在反复解释了。”
            </p>
          </header>

          <section
            aria-label="思维空间感知层"
            style={{
              display: "grid",
              gap: 20,
              minHeight: "54dvh",
              alignContent: "space-between",
              padding: "18px 0 4px",
              opacity: isThoughtCaliperSandifying ? 0 : 1,
              transform: isThoughtCaliperSandifying ? "translateY(22px)" : "translateY(0)",
              filter: isThoughtCaliperSandifying ? "blur(1.5px)" : "none",
              transition: "opacity 520ms ease, transform 520ms ease, filter 520ms ease",
            }}
          >
            <div style={{ display: "grid", gap: 14 }}>
              <div style={{ display: "grid", gap: 7 }}>
                <span style={{ color: "rgba(245,245,245,0.28)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 10 }}>
                  03 ｜ 思维空间 · 错位栅栏
                </span>
                <span style={{ color: "rgba(0,184,212,0.68)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11 }}>
                  当前承载压力之刺
                </span>
                <p style={{ margin: 0, color: "rgba(245,245,245,0.66)", fontSize: 15, lineHeight: 1.68 }}>
                  {selectedPressureSeedSurface}
                </p>
              </div>

              <p style={{ margin: 0, color: "rgba(245,245,245,0.62)", fontSize: 15, lineHeight: 1.72 }}>
                你还没说完，
                <br />
                脑子里已经开始组织下一句解释。
                <br />
                你把解释，当成了证明。
              </p>
            </div>

            <div style={{ display: "grid", gap: 14 }}>
              <div
                style={{
                  minHeight: 126,
                  display: "grid",
                  alignContent: "center",
                  gap: 12,
                  color: isThoughtCaliperLocked ? "#C7A96B" : thoughtCaliperProgress > 0.02 ? "#00B8D4" : "rgba(245,245,245,0.34)",
                  transition: "color 120ms steps(2, end)",
                }}
              >
                <p style={{ margin: 0, fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 13, lineHeight: 1.5, color: "currentColor" }}>
                  【 {activeThoughtCaliperLevel.mark} 档 ｜ {activeThoughtCaliperLevel.title} 】
                </p>
                <p
                  style={{
                    margin: 0,
                    color: isThoughtCaliperLocked ? "rgba(199,169,107,0.92)" : `rgba(245,245,245,${0.58 + thoughtCaliperProgress * 0.22})`,
                    fontSize: 16 + thoughtCaliperProgress * 2,
                    lineHeight: 1.72,
                    fontWeight: 700,
                    transition: isThoughtCaliperDragging ? "none" : "color 80ms steps(2, end), font-size 80ms steps(2, end)",
                  }}
                >
                  {activeThoughtCaliperLevel.line}
                </p>
              </div>
            </div>

            <div style={{ display: "grid", gap: 10, paddingBottom: 4 }}>
              <div
                ref={thoughtCaliperRailRef}
                role="slider"
                aria-label="思维负荷错位线"
                aria-valuemin={1}
                aria-valuemax={3}
                aria-valuenow={activeThoughtCaliperIndex + 1}
                onPointerDown={handleThoughtCaliperPointerDown}
                onPointerMove={handleThoughtCaliperPointerMove}
                onPointerUp={handleThoughtCaliperPointerUp}
                onPointerCancel={handleThoughtCaliperPointerUp}
                style={{
                  position: "relative",
                  height: 58,
                  touchAction: "none",
                  cursor: isThoughtCaliperLocked ? "default" : "grab",
                }}
              >
                {thoughtRailSegments.map((segment, index) => (
                  <span
                    key={`${segment.start}-${segment.end}`}
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: `${segment.start * 100}%`,
                      top: 28 + segment.y,
                      width: `${(segment.end - segment.start) * 100}%`,
                      height: 1,
                      background: isThoughtCaliperLocked ? "rgba(199,169,107,0.92)" : "rgba(245,245,245,0.3)",
                      boxShadow: isThoughtCaliperLocked ? "0 0 16px rgba(199,169,107,0.36)" : "none",
                      transform: `skewY(${index % 2 === 0 ? -2 : 2}deg)`,
                    }}
                  />
                ))}
                {thoughtRailSegments.map((segment, index) => {
                  const segmentProgress = Math.max(0, Math.min(1, (thoughtCaliperProgress - segment.start) / (segment.end - segment.start)));
                  if (segmentProgress <= 0) return null;
                  return (
                    <span
                      key={`active-${segment.start}-${segment.end}`}
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        left: `${segment.start * 100}%`,
                        top: 28 + segment.y,
                        width: `${(segment.end - segment.start) * segmentProgress * 100}%`,
                        height: 1,
                        background: isThoughtCaliperLocked ? "#C7A96B" : "#00B8D4",
                        boxShadow: isThoughtCaliperLocked ? "0 0 18px rgba(199,169,107,0.38)" : "0 0 12px rgba(0,184,212,0.3)",
                        transform: `skewY(${index % 2 === 0 ? -2 : 2}deg)`,
                        transition: isThoughtCaliperDragging ? "none" : "width 70ms steps(2, end), background 120ms ease",
                      }}
                    />
                  );
                })}
                {bodyCaliperMarkProgress.map((markProgress, index) => {
                  const isActive = activeThoughtCaliperIndex === index;
                  return (
                    <span
                      key={markProgress}
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        left: `${markProgress * 100}%`,
                        top: 22 + getThoughtRailYOffset(markProgress),
                        width: isActive ? 7 : 3,
                        height: isActive ? 7 : 3,
                        transform: "translateX(-50%) rotate(45deg)",
                        border: isActive ? `1px solid ${isThoughtCaliperLocked ? "rgba(199,169,107,0.95)" : "rgba(0,184,212,0.92)"}` : "none",
                        background: isActive ? "transparent" : "rgba(245,245,245,0.22)",
                        boxShadow: isActive ? "0 0 12px rgba(0,184,212,0.35)" : "none",
                      }}
                    />
                  );
                })}
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: `${thoughtCaliperProgress * 100}%`,
                    top: 28 + getThoughtRailYOffset(thoughtCaliperProgress),
                    width: isThoughtCaliperLocked ? 8 : 9,
                    height: isThoughtCaliperLocked ? 8 : 9,
                    transform: "translate(-50%, -50%) rotate(45deg)",
                    border: `1px solid ${isThoughtCaliperLocked ? "#C7A96B" : "#00B8D4"}`,
                    background: isThoughtCaliperLocked ? "#C7A96B" : "#00B8D4",
                    boxShadow: isThoughtCaliperLocked ? "0 0 16px rgba(199,169,107,0.42)" : "0 0 14px rgba(0,184,212,0.42)",
                    transition: isThoughtCaliperDragging ? "none" : "left 70ms steps(2, end), border 120ms ease, background 120ms ease, box-shadow 120ms ease",
                  }}
                />
              </div>
              <p style={{ margin: 0, color: isThoughtCaliperLocked ? "rgba(199,169,107,0.86)" : "rgba(245,245,245,0.34)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 10, lineHeight: 1.5 }}>
                {isThoughtCaliperLocked
                  ? "［ ⚡ 规律负荷已锁止 ｜ 观爻因果大盘换挡 ➔ 挺进 04 行为空间 ］"
                  : thoughtCaliperProgress > 0.02
                    ? `［ ${activeThoughtCaliperLevel.mark} · 思维空间 ｜ 轴向滑动测量负荷程度 ］`
                    : "［ 思维空间 ｜ 从左向右推动错位栅栏，测量负荷程度 ］"}
              </p>
              {spaceHints.thought ? (
                <p style={{ margin: 0, color: "rgba(0,184,212,0.76)", fontSize: 13, lineHeight: 1.55 }}>
                  {spaceHints.thought}
                </p>
              ) : null}
            </div>
          </section>
        </>
      ) : null}

      {currentSixSpaceConfig && sixDimensionStep === 4 && currentSixSpaceConfig.id === "action" && spaceSteps.action !== "completed" ? (
        <>
          <header style={{ display: actionArtifactStage === "front" || actionArtifactStage === "flipping" || actionArtifactStage === "back" ? "none" : "grid", gap: 10 }}>
            <h1 style={{ margin: 0, color: "rgba(245,245,245,0.9)", fontSize: "clamp(34px, 10vw, 52px)", lineHeight: 1.08, fontWeight: 390 }}>
              行为空间
            </h1>
            <p style={{ margin: 0, color: "rgba(245,245,245,0.78)", fontSize: 18, lineHeight: 1.65 }}>
              “{currentProjection?.hook ?? "你想做点什么，但卡住了。"}”
            </p>
          </header>

          <section
            aria-label="行为空间破心魔拉杆"
            style={{
              position: "relative",
              minHeight: "58dvh",
              padding: "10px 0 4px",
              opacity: isActionGravitySandifying ? 0 : 1,
              transform: isActionGravitySandifying ? "translateY(26px)" : "translateY(0)",
              filter: isActionGravitySandifying ? "blur(1.6px)" : "none",
              transition: "opacity 520ms ease, transform 520ms ease, filter 520ms ease",
            }}
          >
            {actionArtifactStage === "interact" || actionArtifactStage === "break" ? (
            <div style={{ display: "grid", gap: 22, width: "66%", paddingTop: 52 }}>
              <p style={{ margin: 0, color: "rgba(199,169,107,0.72)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 10, lineHeight: 1.65 }}>
                当前承载压力之刺
              </p>
              <p style={{ margin: 0, color: "rgba(245,245,245,0.58)", fontSize: 15, lineHeight: 1.78 }}>
                {selectedPressureSeedSurface}
              </p>
              <p style={{ margin: 0, color: "rgba(245,245,245,0.66)", fontSize: 15, lineHeight: 1.78 }}>
                {currentNarrativeLines[0] ?? "你脑子里想了无数遍，手还在原处。"}
              </p>
              <p style={{ margin: 0, color: "rgba(245,245,245,0.82)", fontSize: 19, lineHeight: 1.74, fontWeight: 760 }}>
                {currentNarrativeLines[1] ?? "把想法，卡成永远。"}
                <br />
                现在从手里拉断。
              </p>
              {spaceHints.action ? (
                <p style={{ margin: 0, color: isActionGravityLocked ? "rgba(199,169,107,0.9)" : "rgba(245,245,245,0.45)", fontSize: 13, lineHeight: 1.58 }}>
                  {spaceHints.action}
                </p>
              ) : null}
            </div>
            ) : null}

            {actionArtifactStage === "interact" || actionArtifactStage === "break" ? (
            <div
              ref={actionGravityRailRef}
              role="slider"
              aria-label="行为空间垂直重力秤"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(actionGravityProgress * 100)}
              onPointerDown={handleActionGravityPointerDown}
              onPointerMove={handleActionGravityPointerMove}
              onPointerUp={handleActionGravityPointerUp}
              onPointerCancel={handleActionGravityPointerUp}
              style={{
                position: "absolute",
                right: "7%",
                top: "11%",
                height: "68%",
                width: 78,
                touchAction: "none",
                cursor: isActionGravityLocked ? "default" : "grab",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  right: 50,
                  top: 0,
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  color: isActionGravityLocked ? "rgba(255,255,255,0.82)" : "rgba(199,169,107,0.72)",
                  fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  fontSize: 10,
                  lineHeight: 1.45,
                  letterSpacing: "0.08em",
                  whiteSpace: "nowrap",
                }}
              >
                {isActionGravityLocked ? "止动盾正在打印｜行动魔咒已断裂" : "向下拉断此线｜偏转行动卡死"}
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 78 360"
                preserveAspectRatio="none"
                style={{
                  position: "absolute",
                  inset: 0,
                  overflow: "visible",
                }}
              >
                {isActionGravityLocked ? (
                  <>
                    <path
                      d="M52 0 Q-18 82 30 164"
                      fill="none"
                      stroke="rgba(255,255,255,0.86)"
                      strokeWidth="1"
                      strokeLinecap="round"
                      style={{ filter: "drop-shadow(0 0 12px rgba(255,255,255,0.3))" }}
                    />
                    <path
                      d="M72 196 Q-12 272 52 360"
                      fill="none"
                      stroke="rgba(199,169,107,0.92)"
                      strokeWidth="1"
                      strokeLinecap="round"
                      style={{ filter: "drop-shadow(0 0 14px rgba(199,169,107,0.34))" }}
                    />
                    <path d="M28 177 L46 171" stroke="rgba(199,169,107,0.98)" strokeWidth="1" />
                    <path d="M56 189 L74 183" stroke="rgba(199,169,107,0.98)" strokeWidth="1" />
                  </>
                ) : (
                  <path
                    d={`M52 0 Q${52 - actionGravityProgress * 76} 180 52 360`}
                    fill="none"
                    stroke="rgba(199,169,107,0.72)"
                    strokeWidth="1"
                    strokeLinecap="round"
                    style={{
                      filter: "drop-shadow(0 0 12px rgba(199,169,107,0.22))",
                      transition: isActionGravityDragging ? "none" : "stroke 160ms ease, filter 160ms ease",
                    }}
                  />
                )}
                {!isActionGravityLocked ? (
                  <circle
                    cx={getActionGravityCurveX(actionGravityProgress)}
                    cy={actionGravityProgress * 360}
                    r="4.8"
                    fill="#C7A96B"
                    style={{
                      filter: "drop-shadow(0 0 16px rgba(199,169,107,0.48))",
                      transition: isActionGravityDragging ? "none" : "cx 220ms cubic-bezier(.16,1,.3,1), cy 220ms cubic-bezier(.16,1,.3,1)",
                    }}
                  />
                ) : null}
              </svg>
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: 52,
                  bottom: -2,
                  width: 18,
                  height: 1,
                  transform: "translateX(-50%)",
                  background: isActionGravityLocked ? "rgba(255,255,255,0.78)" : "rgba(199,169,107,0.52)",
                }}
              />
            </div>
            ) : null}

            {actionArtifactStage === "front" || actionArtifactStage === "flipping" || actionArtifactStage === "back" || actionArtifactStage === "sandify" ? (
              <div
                role={actionArtifactStage === "front" || actionArtifactStage === "back" ? "button" : undefined}
                tabIndex={actionArtifactStage === "front" || actionArtifactStage === "back" ? 0 : -1}
                onClick={actionArtifactStage === "front" ? handleActionArtifactFlip : actionArtifactStage === "back" ? handleActionArtifactExit : undefined}
                onKeyDown={(event) => {
                  if (event.key !== "Enter" && event.key !== " ") return;
                  if (actionArtifactStage === "front") handleActionArtifactFlip();
                  if (actionArtifactStage === "back") handleActionArtifactExit();
                }}
                style={{
                  minHeight: "58dvh",
                  display: "grid",
                  placeItems: "center",
                  perspective: 900,
                  cursor: actionArtifactStage === "front" || actionArtifactStage === "back" ? "pointer" : "default",
                  opacity: actionArtifactStage === "sandify" ? 0 : 1,
                  transform: actionArtifactStage === "sandify" ? "translateY(28px)" : "translateY(0)",
                  transition: "opacity 520ms ease, transform 520ms ease",
                  outline: "none",
                }}
              >
                <div
                  style={{
                    width: "min(74vw, 310px)",
                    aspectRatio: "0.68",
                    position: "relative",
                    transformStyle: "preserve-3d",
                    transform:
                      actionArtifactStage === "back"
                        ? "rotateY(180deg)"
                        : actionArtifactStage === "flipping"
                          ? "rotateY(92deg) scale(1.02)"
                          : "rotateY(0deg)",
                    transition: "transform 520ms cubic-bezier(.16,1,.3,1)",
                  }}
                >
                  <div
                    aria-hidden={actionArtifactStage === "back"}
                    style={{
                      position: "absolute",
                      inset: 0,
                      border: "1px solid rgba(199,169,107,0.82)",
                      background: "radial-gradient(circle at 50% 42%, rgba(199,169,107,0.12), rgba(0,0,0,0.92) 58%)",
                      boxShadow: "0 0 36px rgba(199,169,107,0.16), inset 0 0 30px rgba(199,169,107,0.06)",
                      backfaceVisibility: "hidden",
                      display: "grid",
                      alignContent: "space-between",
                      padding: "22px 20px",
                    }}
                  >
                    <div style={{ display: "grid", gap: 6 }}>
                      <span style={{ color: "rgba(199,169,107,0.72)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 10 }}>
                        爻器卡 / 04
                      </span>
                      <strong style={{ color: "rgba(245,245,245,0.92)", fontSize: 28, lineHeight: 1.12, fontWeight: 760 }}>
                        止动盾
                      </strong>
                    </div>

                    <div style={{ display: "grid", placeItems: "center", gap: 14 }}>
                      <svg width="126" height="126" viewBox="0 0 126 126" aria-hidden="true" style={{ filter: "drop-shadow(0 0 18px rgba(199,169,107,0.28))" }}>
                        <path d="M63 12 L102 28 L96 70 C91 94 75 108 63 115 C51 108 35 94 30 70 L24 28 Z" fill="none" stroke="#C7A96B" strokeWidth="1" />
                        <path d="M63 26 L88 37 L84 68 C80 84 70 94 63 99 C56 94 46 84 42 68 L38 37 Z" fill="none" stroke="rgba(245,245,245,0.74)" strokeWidth="1" />
                        <path d="M43 63 H83 M63 31 V98 M47 46 L79 80 M79 46 L47 80" stroke="#C7A96B" strokeWidth="1" />
                      </svg>
                      <span style={{ color: "rgba(199,169,107,0.72)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 10, textAlign: "center", lineHeight: 1.55 }}>
                        WEAPON_TYPE: ACTION_SHIELD
                        <br />
                        DEF_RATE: 99%
                      </span>
                    </div>

                    <p style={{ margin: 0, color: "rgba(245,245,245,0.46)", fontSize: 12, lineHeight: 1.55 }}>
                      轻触爻器卡，翻面读取器法。
                    </p>
                  </div>

                  <div
                    aria-hidden={actionArtifactStage !== "back"}
                    style={{
                      position: "absolute",
                      inset: 0,
                      border: "1px solid rgba(245,245,245,0.72)",
                      background: "linear-gradient(180deg, rgba(199,169,107,0.12), rgba(0,0,0,0.94))",
                      boxShadow: "0 0 36px rgba(245,245,245,0.12), inset 0 0 28px rgba(199,169,107,0.08)",
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      display: "grid",
                      alignContent: "center",
                      gap: 18,
                      padding: "24px 22px",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ color: "rgba(199,169,107,0.82)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11 }}>
                      止动盾｜器法
                    </span>
                    <p style={{ margin: 0, color: "rgba(245,245,245,0.94)", fontSize: 20, lineHeight: 1.7, fontWeight: 740 }}>
                      今天，只做最小的一步：
                    </p>
                    <p style={{ margin: 0, color: "rgba(245,245,245,0.78)", fontSize: 17, lineHeight: 1.78 }}>
                      不解释，
                      <br />
                      不说服，
                      <br />
                      让手先动起来。
                    </p>
                    <p style={{ margin: "14px 0 0", color: "rgba(199,169,107,0.72)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 10, lineHeight: 1.65 }}>
                      行为法器已封存入库
                      <br />
                      再次轻触，进入 05 记忆空间
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </section>
        </>
      ) : null}

      {currentSixSpaceConfig && sixDimensionStep === 5 && currentSixSpaceConfig.id === "memory" && spaceSteps.memory !== "completed" ? (
        <>
          {memoryArtifactStage === "interact" || memoryArtifactStage === "break" ? (
            <header style={{ display: "grid", gap: 10 }}>
              <h1 style={{ margin: 0, color: "rgba(245,245,245,0.9)", fontSize: "clamp(34px, 10vw, 52px)", lineHeight: 1.08, fontWeight: 390 }}>
                记忆空间
              </h1>
              <p style={{ margin: 0, color: "rgba(245,245,245,0.78)", fontSize: 18, lineHeight: 1.65 }}>
                “{currentProjection?.hook ?? "以前也这样过。"}”
              </p>
            </header>
          ) : null}

          <section
            aria-label="记忆空间烟雾轴"
            style={{
              position: "relative",
              minHeight: "58dvh",
              padding: "12px 0 4px",
              opacity: isMemorySmokeSandifying ? 0 : 1,
              transform: isMemorySmokeSandifying ? "translateY(28px)" : "translateY(0)",
              filter: isMemorySmokeSandifying ? "blur(1.8px)" : "none",
              transition: "opacity 520ms ease, transform 520ms ease, filter 520ms ease",
            }}
          >
            {memoryArtifactStage === "interact" || memoryArtifactStage === "break" ? (
              <div style={{ display: "grid", gap: 20, width: "74%", paddingTop: 26 }}>
                <p style={{ margin: 0, color: "rgba(199,169,107,0.58)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 10, lineHeight: 1.65 }}>
                  当前承载压力之刺
                </p>
                <p style={{ margin: 0, color: "rgba(245,245,245,0.56)", fontSize: 15, lineHeight: 1.78 }}>
                  {selectedPressureSeedSurface}
                </p>
                <p style={{ margin: 0, color: "rgba(245,245,245,0.7)", fontSize: 17, lineHeight: 1.76, fontWeight: 650 }}>
                  {currentNarrativeLines[0] ?? "你还没反应，记忆已经先替你回答了。"}
                </p>
                <p style={{ margin: 0, color: "rgba(245,245,245,0.84)", fontSize: 18, lineHeight: 1.74, fontWeight: 760 }}>
                  {currentNarrativeLines[1] ?? "用过去的失败，预判现在的结果。"}
                  <br />
                  现在向左切开。
                </p>
                {spaceHints.memory ? (
                  <p style={{ margin: 0, color: isMemorySmokeLocked ? "rgba(199,169,107,0.9)" : "rgba(245,245,245,0.45)", fontSize: 13, lineHeight: 1.58 }}>
                    {spaceHints.memory}
                  </p>
                ) : null}
              </div>
            ) : null}

            {memoryArtifactStage === "interact" || memoryArtifactStage === "break" ? (
              <div
                ref={memorySmokeRailRef}
                role="slider"
                aria-label="记忆空间像素烟雾轴"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(memorySmokeProgress * 100)}
                onPointerDown={handleMemorySmokePointerDown}
                onPointerMove={handleMemorySmokePointerMove}
                onPointerUp={handleMemorySmokePointerUp}
                onPointerCancel={handleMemorySmokePointerUp}
                style={{
                  position: "absolute",
                  left: "8%",
                  right: "8%",
                  bottom: "11%",
                  height: 112,
                  touchAction: "none",
                  cursor: isMemorySmokeLocked ? "default" : "grab",
                }}
              >
                <p
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    margin: 0,
                    color: isMemorySmokeLocked ? "rgba(199,169,107,0.88)" : "rgba(199,169,107,0.56)",
                    fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: 10,
                    lineHeight: 1.45,
                    letterSpacing: "0.06em",
                  }}
                >
                  {isMemorySmokeLocked ? "［ 听风刀已封存 ］" : "［ 向左滑断 ］"}
                </p>

                <svg
                  aria-hidden="true"
                  viewBox="0 0 320 70"
                  preserveAspectRatio="none"
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: "100%",
                    height: 70,
                    overflow: "visible",
                  }}
                >
                  {isMemorySmokeLocked ? (
                    <>
                      <path
                        d="M0 40 Q68 16 154 36"
                        fill="none"
                        stroke="rgba(199,169,107,0.9)"
                        strokeWidth="1"
                        strokeLinecap="round"
                        style={{ filter: "drop-shadow(0 0 12px rgba(199,169,107,0.25))" }}
                      />
                      <path
                        d="M166 44 Q248 66 320 40"
                        fill="none"
                        stroke="rgba(245,245,245,0.72)"
                        strokeWidth="1"
                        strokeLinecap="round"
                        style={{ filter: "drop-shadow(0 0 10px rgba(245,245,245,0.18))" }}
                      />
                      <path d="M154 37 L160 31 M166 43 L172 37" stroke="rgba(199,169,107,0.95)" strokeWidth="1" />
                    </>
                  ) : (
                    <path
                      d={`M0 40 Q${320 * memorySmokeProgress} ${40 + Math.sin((1 - memorySmokeProgress) * Math.PI) * 24} 320 40`}
                      fill="none"
                      stroke="rgba(199,169,107,0.72)"
                      strokeWidth="1"
                      strokeLinecap="round"
                      style={{
                        filter: "drop-shadow(0 0 10px rgba(199,169,107,0.2))",
                        transition: isMemorySmokeDragging ? "none" : "d 220ms cubic-bezier(.16,1,.3,1)",
                      }}
                    />
                  )}
                </svg>

                {Array.from({ length: 14 }).map((_, index) => {
                  const dragAmount = 1 - memorySmokeProgress;
                  const left = `${Math.max(0, Math.min(100, memorySmokeProgress * 100 + index * 2.8))}%`;
                  const opacity = isMemorySmokeDragging ? Math.max(0, dragAmount - index * 0.035) : 0;
                  return (
                    <span
                      key={`memory-smoke-${index}`}
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        left,
                        bottom: 34 + ((index % 5) - 2) * 2,
                        width: index % 3 === 0 ? 2 : 1,
                        height: index % 4 === 0 ? 2 : 1,
                        background: index % 5 === 0 ? "rgba(199,169,107,0.8)" : "rgba(245,245,245,0.52)",
                        opacity,
                        transform: `translateX(${index * 5}px)`,
                        transition: "opacity 120ms ease",
                      }}
                    />
                  );
                })}

                {!isMemorySmokeLocked ? (
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: `${memorySmokeProgress * 100}%`,
                      bottom: 70 - getMemorySmokeRailY(memorySmokeProgress),
                      width: 9,
                      height: 9,
                      transform: "translate(-50%, -50%) rotate(45deg)",
                      border: "1px solid rgba(199,169,107,0.86)",
                      background: "#C7A96B",
                      boxShadow: "0 0 14px rgba(199,169,107,0.38)",
                      transition: isMemorySmokeDragging ? "none" : "left 260ms cubic-bezier(.16,1,.3,1)",
                    }}
                  />
                ) : null}
              </div>
            ) : null}

            {memoryArtifactStage === "front" || memoryArtifactStage === "flipping" || memoryArtifactStage === "back" || memoryArtifactStage === "sandify" ? (
              <div
                role={memoryArtifactStage === "front" || memoryArtifactStage === "back" ? "button" : undefined}
                tabIndex={memoryArtifactStage === "front" || memoryArtifactStage === "back" ? 0 : -1}
                onClick={handleMemoryArtifactExit}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") handleMemoryArtifactExit();
                }}
                style={{
                  minHeight: "58dvh",
                  display: "grid",
                  placeItems: "center",
                  perspective: 900,
                  cursor: memoryArtifactStage === "front" || memoryArtifactStage === "back" ? "pointer" : "default",
                  opacity: memoryArtifactStage === "sandify" ? 0 : 1,
                  transform: memoryArtifactStage === "sandify" ? "translateY(28px)" : "translateY(0)",
                  transition: "opacity 520ms ease, transform 520ms ease",
                  outline: "none",
                }}
              >
                <div
                  style={{
                    width: "min(72vw, 300px)",
                    aspectRatio: "0.68",
                    position: "relative",
                    transformStyle: "preserve-3d",
                    transform:
                      memoryArtifactStage === "back"
                        ? "rotateY(180deg)"
                        : memoryArtifactStage === "flipping"
                          ? "rotateY(92deg) scale(1.02)"
                          : "rotateY(0deg)",
                    transition: "transform 520ms cubic-bezier(.16,1,.3,1)",
                  }}
                >
                  <div
                    aria-hidden={memoryArtifactStage === "back"}
                    style={{
                      position: "absolute",
                      inset: 0,
                      border: "1px solid rgba(199,169,107,0.82)",
                      background: "radial-gradient(circle at 50% 40%, rgba(199,169,107,0.11), rgba(0,0,0,0.94) 60%)",
                      boxShadow: "0 0 36px rgba(199,169,107,0.16), inset 0 0 28px rgba(199,169,107,0.06)",
                      backfaceVisibility: "hidden",
                      display: "grid",
                      alignContent: "space-between",
                      padding: "22px 20px",
                    }}
                  >
                    <div style={{ display: "grid", gap: 6 }}>
                      <span style={{ color: "rgba(199,169,107,0.72)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 10 }}>
                        爻器卡 / 05
                      </span>
                      <strong style={{ color: "rgba(245,245,245,0.92)", fontSize: 28, lineHeight: 1.12, fontWeight: 760 }}>
                        听风刀
                      </strong>
                    </div>

                    <div style={{ display: "grid", placeItems: "center", gap: 14 }}>
                      <svg width="132" height="132" viewBox="0 0 132 132" aria-hidden="true" style={{ filter: "drop-shadow(0 0 18px rgba(199,169,107,0.26))" }}>
                        <path d="M28 92 C48 68 62 42 104 24 C86 60 61 80 36 104 Z" fill="none" stroke="#C7A96B" strokeWidth="1" />
                        <path d="M42 92 C60 80 78 62 94 38" fill="none" stroke="rgba(245,245,245,0.72)" strokeWidth="1" />
                        <path d="M31 95 L20 106 M39 104 L28 116 M76 55 L104 24" stroke="#C7A96B" strokeWidth="1" />
                        <path d="M28 70 H54 M72 40 H100 M46 55 H66" stroke="rgba(245,245,245,0.36)" strokeWidth="1" />
                      </svg>
                      <span style={{ color: "rgba(199,169,107,0.72)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 10, textAlign: "center", lineHeight: 1.55 }}>
                        WEAPON_CODE: #MEM_CUTTER
                        <br />
                        MEMORY_BREAK: TRUE
                      </span>
                    </div>

                    <p style={{ margin: 0, color: "rgba(245,245,245,0.46)", fontSize: 12, lineHeight: 1.55 }}>
                      轻触爻器卡，翻面读取器法。
                    </p>
                  </div>

                  <div
                    aria-hidden={memoryArtifactStage !== "back"}
                    style={{
                      position: "absolute",
                      inset: 0,
                      border: "1px solid rgba(245,245,245,0.72)",
                      background: "linear-gradient(180deg, rgba(199,169,107,0.12), rgba(0,0,0,0.94))",
                      boxShadow: "0 0 36px rgba(245,245,245,0.12), inset 0 0 28px rgba(199,169,107,0.08)",
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      display: "grid",
                      alignContent: "center",
                      gap: 18,
                      padding: "24px 22px",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ color: "rgba(199,169,107,0.82)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11 }}>
                      听风刀｜器法
                    </span>
                    <p style={{ margin: 0, color: "rgba(245,245,245,0.94)", fontSize: 20, lineHeight: 1.7, fontWeight: 740 }}>
                      这一次，先听见风向：
                    </p>
                    <p style={{ margin: 0, color: "rgba(245,245,245,0.78)", fontSize: 17, lineHeight: 1.78 }}>
                      不用过去的失败，
                      <br />
                      预判现在的结果。
                      <br />
                      先让眼前发生一次。
                    </p>
                    <p style={{ margin: "14px 0 0", color: "rgba(199,169,107,0.72)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 10, lineHeight: 1.65 }}>
                      记忆法器已封存入库
                      <br />
                      再次轻触，进入 06 目标空间
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </section>
        </>
      ) : null}

      {currentSixSpaceConfig && sixDimensionStep === 6 && currentSixSpaceConfig.id === "goal" && spaceSteps.goal !== "completed" ? (
        <>
          {goalFinalStage === "interact" || goalFinalStage === "break" ? (
            <header style={{ display: "grid", gap: 10 }}>
              <h1 style={{ margin: 0, color: "rgba(245,245,245,0.9)", fontSize: "clamp(32px, 9vw, 48px)", lineHeight: 1.08, fontWeight: 390 }}>
                目标空间
              </h1>
              <p style={{ margin: 0, color: "rgba(199,169,107,0.82)", fontSize: 18, lineHeight: 1.65 }}>
                “你不知道该往哪走。”
              </p>
            </header>
          ) : null}

          <section
            aria-label="目标空间终局撕裂"
            style={{
              position: "relative",
              minHeight: "58dvh",
              padding: "12px 0 4px",
              opacity: isGoalTearSandifying ? 0 : 1,
              transform: isGoalTearSandifying ? "translateY(30px)" : "translateY(0)",
              filter: isGoalTearSandifying ? "blur(1.8px)" : "none",
              transition: "opacity 520ms ease, transform 520ms ease, filter 520ms ease",
            }}
          >
            {goalFinalStage === "interact" || goalFinalStage === "break" ? (
              <div style={{ display: "grid", gap: 20, width: "78%", paddingTop: 22 }}>
                <p style={{ margin: 0, color: "rgba(199,169,107,0.64)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 10, lineHeight: 1.65 }}>
                  06 ｜ 目标空间 · 终局撕裂
                </p>
                <p style={{ margin: 0, color: "rgba(245,245,245,0.6)", fontSize: 15, lineHeight: 1.78 }}>
                  {selectedPressureSeedSurface}
                </p>
                <p style={{ margin: 0, color: "rgba(245,245,245,0.72)", fontSize: 17, lineHeight: 1.74, fontWeight: 650 }}>
                  你停在原地，不是因为不想走。
                </p>
                <p style={{ margin: 0, color: "rgba(245,245,245,0.88)", fontSize: 18, lineHeight: 1.74, fontWeight: 760 }}>
                  你的旧反应是：
                  <br />
                  假装不需要，就不怕得不到。
                </p>
                {spaceHints.goal ? (
                  <p style={{ margin: 0, color: isGoalTearLocked ? "rgba(199,169,107,0.92)" : "rgba(245,245,245,0.46)", fontSize: 13, lineHeight: 1.58 }}>
                    {spaceHints.goal}
                  </p>
                ) : null}
              </div>
            ) : null}

            {goalFinalStage === "interact" || goalFinalStage === "break" ? (
              <div
                ref={goalTearRailRef}
                role="slider"
                aria-label="目标空间终局撕裂轴"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(goalTearProgress * 100)}
                onPointerDown={handleGoalTearPointerDown}
                onPointerMove={handleGoalTearPointerMove}
                onPointerUp={handleGoalTearPointerUp}
                onPointerCancel={handleGoalTearPointerUp}
                style={{
                  position: "absolute",
                  left: "8%",
                  right: "8%",
                  bottom: "11%",
                  height: 112,
                  touchAction: "none",
                  cursor: isGoalTearLocked ? "default" : "grab",
                }}
              >
                <p
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    margin: 0,
                    color: isGoalTearLocked ? "rgba(199,169,107,0.9)" : "rgba(199,169,107,0.58)",
                    fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: 10,
                    lineHeight: 1.45,
                    letterSpacing: "0.06em",
                  }}
                >
                  {isGoalTearLocked ? "［ 终局剧本已撕开 ］" : "［ 向两端撕裂 ］"}
                </p>

                <svg
                  aria-hidden="true"
                  viewBox="0 0 320 70"
                  preserveAspectRatio="none"
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: "100%",
                    height: 70,
                    overflow: "visible",
                  }}
                >
                  {isGoalTearLocked ? (
                    <>
                      <path d="M0 40 Q78 6 151 36" fill="none" stroke="rgba(199,169,107,0.95)" strokeWidth="1" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 14px rgba(199,169,107,0.34))" }} />
                      <path d="M169 44 Q242 74 320 40" fill="none" stroke="rgba(199,169,107,0.95)" strokeWidth="1" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 14px rgba(199,169,107,0.34))" }} />
                      <path d="M151 36 L158 29 M169 44 L176 37" stroke="rgba(245,245,245,0.78)" strokeWidth="1" />
                    </>
                  ) : (
                    <path
                      d={`M0 40 Q160 ${getGoalTearCurveY(goalTearProgress)} 320 40`}
                      fill="none"
                      stroke="rgba(199,169,107,0.82)"
                      strokeWidth="1"
                      strokeLinecap="round"
                      style={{
                        filter: `drop-shadow(0 0 ${10 + goalTearProgress * 12}px rgba(199,169,107,${0.18 + goalTearProgress * 0.16}))`,
                        transition: isGoalTearDragging ? "none" : "d 240ms cubic-bezier(.16,1,.3,1)",
                      }}
                    />
                  )}
                </svg>

                {!isGoalTearLocked ? (
                  <>
                    <span
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        left: `${50 - goalTearProgress * 50}%`,
                        bottom: 70 - getGoalTearCurveY(goalTearProgress),
                        width: 8,
                        height: 8,
                        transform: "translate(-50%, -50%) rotate(45deg)",
                        background: "#C7A96B",
                        boxShadow: "0 0 14px rgba(199,169,107,0.42)",
                        transition: isGoalTearDragging ? "none" : "left 240ms cubic-bezier(.16,1,.3,1), bottom 240ms cubic-bezier(.16,1,.3,1)",
                      }}
                    />
                    <span
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        left: `${50 + goalTearProgress * 50}%`,
                        bottom: 70 - getGoalTearCurveY(goalTearProgress),
                        width: 8,
                        height: 8,
                        transform: "translate(-50%, -50%) rotate(45deg)",
                        background: "#C7A96B",
                        boxShadow: "0 0 14px rgba(199,169,107,0.42)",
                        transition: isGoalTearDragging ? "none" : "left 240ms cubic-bezier(.16,1,.3,1), bottom 240ms cubic-bezier(.16,1,.3,1)",
                      }}
                    />
                  </>
                ) : null}
              </div>
            ) : null}

            {goalFinalStage === "front" || goalFinalStage === "flipping" || goalFinalStage === "back" || goalFinalStage === "sandify" ? (
              <div
                role="button"
                tabIndex={0}
                onClick={handleGoalFinalPaywall}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") handleGoalFinalPaywall();
                }}
                style={{
                  minHeight: "58dvh",
                  display: "grid",
                  placeItems: "center",
                  perspective: 900,
                  opacity: goalFinalStage === "sandify" ? 0 : 1,
                  transform: goalFinalStage === "sandify" ? "translateY(30px)" : "translateY(0)",
                  transition: "opacity 520ms ease, transform 520ms ease",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: "min(74vw, 310px)",
                    aspectRatio: "0.68",
                    position: "relative",
                    transformStyle: "preserve-3d",
                    transform:
                      goalFinalStage === "back"
                        ? "rotateY(180deg)"
                        : goalFinalStage === "flipping"
                          ? "rotateY(92deg) scale(1.02)"
                          : "rotateY(0deg)",
                    transition: "transform 520ms cubic-bezier(.16,1,.3,1)",
                  }}
                >
                  <div
                    aria-hidden={goalFinalStage === "back"}
                    style={{
                      position: "absolute",
                      inset: 0,
                      border: "1px solid rgba(199,169,107,0.86)",
                      background: "radial-gradient(circle at 50% 40%, rgba(199,169,107,0.14), rgba(0,0,0,0.94) 62%)",
                      boxShadow: "0 0 40px rgba(199,169,107,0.2), inset 0 0 32px rgba(199,169,107,0.07)",
                      backfaceVisibility: "hidden",
                      display: "grid",
                      alignContent: "space-between",
                      padding: "22px 20px",
                    }}
                  >
                    <div style={{ display: "grid", gap: 6 }}>
                      <span style={{ color: "rgba(199,169,107,0.76)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 10 }}>
                        爻器卡 / 06
                      </span>
                      <strong style={{ color: "rgba(245,245,245,0.92)", fontSize: 27, lineHeight: 1.18, fontWeight: 760 }}>
                        终局防线
                      </strong>
                    </div>

                    <div aria-label="因果武器轴线阵列" style={{ display: "grid", gap: 10 }}>
                      {(awakenedWeapons.length > 0 ? awakenedWeapons : [{ space: "行为空间", weaponName: "止动盾" }, { space: "记忆空间", weaponName: "听风刀" }, { space: "目标空间", weaponName: "终局防线" }]).slice(0, 4).map((weapon, index) => (
                        <div
                          key={`${weapon.space}-${weapon.weaponName}-${index}`}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "30px 1fr",
                            alignItems: "center",
                            gap: 9,
                            minHeight: 25,
                          }}
                        >
                          <span
                            aria-hidden="true"
                            style={{
                              height: 1,
                              background: "linear-gradient(90deg, rgba(199,169,107,0.92), rgba(199,169,107,0.12))",
                              boxShadow: "0 0 10px rgba(199,169,107,0.2)",
                            }}
                          />
                          <span style={{ color: "rgba(245,245,245,0.72)", fontSize: 12, lineHeight: 1.35 }}>
                            <span style={{ color: "rgba(199,169,107,0.7)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 10 }}>
                              {String(index + 1).padStart(2, "0")} /
                            </span>{" "}
                            {weapon.space}｜{weapon.weaponName}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p style={{ margin: 0, color: "rgba(245,245,245,0.46)", fontSize: 12, lineHeight: 1.55 }}>
                      轻触爻器卡，翻面读取终局器法。
                    </p>
                  </div>

                  <div
                    aria-hidden={goalFinalStage !== "back"}
                    style={{
                      position: "absolute",
                      inset: 0,
                      border: "1px solid rgba(245,245,245,0.72)",
                      background: "linear-gradient(180deg, rgba(199,169,107,0.13), rgba(0,0,0,0.95))",
                      boxShadow: "0 0 38px rgba(245,245,245,0.12), inset 0 0 30px rgba(199,169,107,0.08)",
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      display: "grid",
                      alignContent: "center",
                      gap: 16,
                      padding: "24px 22px",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ color: "rgba(199,169,107,0.82)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11 }}>
                      终局防线｜器法
                    </span>
                    <p style={{ margin: 0, color: "rgba(245,245,245,0.94)", fontSize: 20, lineHeight: 1.68, fontWeight: 740 }}>
                      未来 90 天，
                      <br />
                      先守住一个方向。
                    </p>
                    <p style={{ margin: 0, color: "rgba(245,245,245,0.72)", fontSize: 15, lineHeight: 1.72 }}>
                      384 分之一终局爻码
                      <br />
                      90 天风险防御本
                      <br />
                      反本能武器卡阵列
                    </p>
                    <p style={{ margin: "12px 0 0", color: "rgba(199,169,107,0.78)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 10, lineHeight: 1.65 }}>
                      再次轻触，沉积为年轮资产
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </section>
        </>
      ) : null}

      {currentSixSpaceConfig && sixDimensionStep === 6 && currentSixSpaceConfig.id !== "goal" && spaceSteps[currentSixSpaceConfig.id] === "entry" ? (
        <>
          <header style={{ display: "grid", gap: 10 }}>
            <h1 style={{ margin: 0, color: "rgba(245,245,245,0.9)", fontSize: "clamp(34px, 10vw, 52px)", lineHeight: 1.08, fontWeight: 390 }}>
              {currentSixSpaceConfig.name}
            </h1>
            <p style={{ margin: 0, color: "rgba(245,245,245,0.78)", fontSize: 18, lineHeight: 1.65 }}>
              “{currentSixSpaceConfig.headline}”
            </p>
          </header>

          <section
            aria-label={`${currentSixSpaceConfig.name}感知层`}
            style={{
              display: "grid",
              gap: 18,
              padding: "18px 0",
              borderTop: "1px solid rgba(199,169,107,0.34)",
              borderBottom: "1px solid rgba(85,85,85,0.38)",
            }}
          >
            <div style={{ display: "grid", gap: 8 }}>
              <span style={{ color: "rgba(199,169,107,0.72)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11, letterSpacing: "0.13em" }}>
                现实之刺：
              </span>
              <p style={{ margin: 0, color: "rgba(245,245,245,0.78)", fontSize: 16, lineHeight: 1.7 }}>
                {selectedPressureSeedSurface}
              </p>
            </div>

            <p style={{ margin: 0, color: "rgba(245,245,245,0.68)", fontSize: 16, lineHeight: 1.74, whiteSpace: "pre-line" }}>
              {currentSixSpaceConfig.transformation}
            </p>

            <div style={{ height: 1, background: "linear-gradient(90deg, rgba(199,169,107,0.3), transparent)" }} />

            <div style={{ display: "grid", gap: 10 }}>
              <p style={{ margin: 0, color: "rgba(245,245,245,0.78)", fontSize: 16, lineHeight: 1.6 }}>
                它到了什么程度？
              </p>
              <div style={{ display: "grid", gap: 8 }}>
                {currentSixSpaceConfig.intensityOptions.map((option) => {
                  const isSelected = spaceIntensities[currentSixSpaceConfig.id] === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => selectGenericIntensity(currentSixSpaceConfig.id, option.value)}
                      style={{
                        appearance: "none",
                        border: `1px solid ${isSelected ? "rgba(0,184,212,0.78)" : "rgba(245,245,245,0.18)"}`,
                        background: isSelected ? "rgba(0,184,212,0.08)" : "rgba(245,245,245,0.02)",
                        color: isSelected ? "rgba(245,245,245,0.88)" : "rgba(245,245,245,0.62)",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        minHeight: 42,
                        padding: "10px 12px",
                        textAlign: "left",
                        font: "inherit",
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          width: 9,
                          height: 9,
                          borderRadius: "50%",
                          border: `1px solid ${isSelected ? "rgba(0,184,212,0.95)" : "rgba(245,245,245,0.42)"}`,
                          background: isSelected ? "rgba(0,184,212,0.9)" : "transparent",
                          boxShadow: isSelected ? "0 0 12px rgba(0,184,212,0.36)" : "none",
                          flex: "0 0 auto",
                        }}
                      />
                      <span>{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ height: 1, background: "linear-gradient(90deg, rgba(199,169,107,0.3), transparent)" }} />

            <p style={{ margin: 0, color: "rgba(245,245,245,0.72)", fontSize: 16, lineHeight: 1.7 }}>
              {currentSixSpaceConfig.oldReaction}
            </p>
            {spaceHints[currentSixSpaceConfig.id] ? (
              <p style={{ margin: 0, color: "rgba(0,184,212,0.78)", fontSize: 14, lineHeight: 1.58 }}>
                {spaceHints[currentSixSpaceConfig.id]}
              </p>
            ) : null}
          </section>

          <CausalRail
            statusLabel={spaceHints[currentSixSpaceConfig.id] || "先看见它到了什么程度。"}
            leftHint="左滑，选择破局点"
            rightHint="右滑，进入下一空间"
            onLeft={() => handleGenericBreakSpace(currentSixSpaceConfig.id)}
            onRight={() => handleGenericNextSpace(currentSixSpaceConfig.id)}
          />
        </>
      ) : null}

      {currentSixSpaceConfig && sixDimensionStep >= 3 && sixDimensionStep <= 6 && spaceSteps[currentSixSpaceConfig.id] === "breakthrough" ? (
        <>
          <header style={{ display: "grid", gap: 10 }}>
            <h1 style={{ margin: 0, color: "rgba(245,245,245,0.9)", fontSize: "clamp(30px, 8vw, 42px)", lineHeight: 1.1, fontWeight: 390 }}>
              {currentSixSpaceConfig.name} · 破局推演
            </h1>
          </header>

          <section
            aria-label={`${currentSixSpaceConfig.name}破局推演`}
            style={{
              display: "grid",
              gap: 18,
              padding: "18px 0",
              borderTop: "1px solid rgba(199,169,107,0.34)",
              borderBottom: "1px solid rgba(85,85,85,0.38)",
            }}
          >
            <div style={{ display: "grid", gap: 10 }}>
              <p style={{ margin: 0, color: "rgba(245,245,245,0.82)", fontSize: 18, lineHeight: 1.6 }}>
                {currentSixSpaceConfig.breakthroughSteps[spaceBreakthroughSteps[currentSixSpaceConfig.id]].title}
              </p>
              <div style={{ display: "grid", gap: 6 }}>
                {currentSixSpaceConfig.breakthroughSteps[spaceBreakthroughSteps[currentSixSpaceConfig.id]].lines.map((line) => (
                  <p key={line} style={{ margin: 0, color: "rgba(245,245,245,0.66)", fontSize: 16, lineHeight: 1.72 }}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
            {spaceHints[currentSixSpaceConfig.id] ? (
              <p style={{ margin: 0, color: "rgba(0,184,212,0.78)", fontSize: 14, lineHeight: 1.58 }}>
                {spaceHints[currentSixSpaceConfig.id]}
              </p>
            ) : null}
          </section>

          <CausalRail
            statusLabel={spaceHints[currentSixSpaceConfig.id] || `${spaceBreakthroughSteps[currentSixSpaceConfig.id] + 1} / 3`}
            leftHint={spaceBreakthroughSteps[currentSixSpaceConfig.id] === 2 ? "左滑，选择武器" : "左滑，暂不进入"}
            rightHint={currentSixSpaceConfig.breakthroughSteps[spaceBreakthroughSteps[currentSixSpaceConfig.id]].rightHint}
            onLeft={() => handleOpenGenericWeaponStep(currentSixSpaceConfig.id)}
            onRight={() => handleGenericBreakthroughNext(currentSixSpaceConfig.id)}
          />
        </>
      ) : null}

      {currentSixSpaceConfig && sixDimensionStep >= 3 && sixDimensionStep <= 6 && spaceSteps[currentSixSpaceConfig.id] === "weapon" ? (
        <>
          <header style={{ display: "grid", gap: 10 }}>
            <h1 style={{ margin: 0, color: "rgba(245,245,245,0.9)", fontSize: "clamp(30px, 8vw, 42px)", lineHeight: 1.1, fontWeight: 390 }}>
              {currentSixSpaceConfig.name} · 破局点
            </h1>
            <p style={{ margin: 0, color: "rgba(245,245,245,0.72)", fontSize: 18, lineHeight: 1.6 }}>
              你需要什么武器？
            </p>
          </header>

          <section
            aria-label={`${currentSixSpaceConfig.name}武器选择`}
            style={{
              display: "grid",
              gap: 12,
              padding: "18px 0",
              borderTop: "1px solid rgba(199,169,107,0.34)",
              borderBottom: "1px solid rgba(85,85,85,0.38)",
            }}
          >
            {currentSixSpaceConfig.weapons.map((weapon) => {
              const isSelected = selectedSpaceWeapons[currentSixSpaceConfig.id] === weapon.id;

              return (
                <button
                  key={weapon.id}
                  type="button"
                  onClick={() => selectGenericWeapon(currentSixSpaceConfig.id, weapon.id)}
                  style={{
                    appearance: "none",
                    border: `1px solid ${isSelected ? "rgba(0,184,212,0.78)" : "rgba(245,245,245,0.18)"}`,
                    background: isSelected ? "rgba(0,184,212,0.08)" : "rgba(245,245,245,0.02)",
                    color: "rgba(245,245,245,0.74)",
                    display: "grid",
                    gap: 7,
                    padding: "14px 12px",
                    textAlign: "left",
                    font: "inherit",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 10, color: isSelected ? "rgba(245,245,245,0.9)" : "rgba(245,245,245,0.72)" }}>
                    <span
                      aria-hidden="true"
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: "50%",
                        border: `1px solid ${isSelected ? "rgba(0,184,212,0.95)" : "rgba(245,245,245,0.42)"}`,
                        background: isSelected ? "rgba(0,184,212,0.9)" : "transparent",
                        boxShadow: isSelected ? "0 0 12px rgba(0,184,212,0.36)" : "none",
                        flex: "0 0 auto",
                      }}
                    />
                    {weapon.name}
                  </span>
                  <span style={{ color: "rgba(245,245,245,0.58)", fontSize: 14, lineHeight: 1.58 }}>
                    “{weapon.description}”
                  </span>
                </button>
              );
            })}

            {currentSixSpaceConfig.weapons
              .filter((weapon) => weapon.id === selectedSpaceWeapons[currentSixSpaceConfig.id])
              .map((weapon) => (
                <div
                  key={`confirm-${weapon.id}`}
                  style={{
                    display: "grid",
                    gap: 6,
                    padding: "12px 12px",
                    border: "1px solid rgba(199,169,107,0.28)",
                    background: "rgba(199,169,107,0.045)",
                  }}
                >
                  <span style={{ color: "rgba(199,169,107,0.78)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 12, letterSpacing: "0.08em" }}>
                    将消耗 ⌛ {weapon.cost}
                  </span>
                  <p style={{ margin: 0, color: "rgba(245,245,245,0.76)", fontSize: 15, lineHeight: 1.58 }}>
                    唤醒「{weapon.name}」。
                  </p>
                  <p style={{ margin: 0, color: "rgba(245,245,245,0.56)", fontSize: 14, lineHeight: 1.58 }}>
                    这是一次反本能动作。
                  </p>
                </div>
              ))}

            {spaceHints[currentSixSpaceConfig.id] ? (
              <p style={{ margin: 0, color: "rgba(0,184,212,0.78)", fontSize: 14, lineHeight: 1.58 }}>
                {spaceHints[currentSixSpaceConfig.id]}
              </p>
            ) : null}

            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, paddingTop: 6 }}>
              <button
                type="button"
                onClick={() => handleCancelGenericWeapon(currentSixSpaceConfig.id)}
                style={{
                  appearance: "none",
                  border: "1px solid rgba(245,245,245,0.18)",
                  background: "transparent",
                  color: "rgba(245,245,245,0.58)",
                  minHeight: 40,
                  padding: "8px 18px",
                  font: "inherit",
                }}
              >
                取消
              </button>
              <button
                type="button"
                onClick={() => handleWakeGenericWeapon(currentSixSpaceConfig.id)}
                style={{
                  appearance: "none",
                  border: "1px solid rgba(0,184,212,0.72)",
                  background: "rgba(0,184,212,0.08)",
                  color: "rgba(245,245,245,0.88)",
                  minHeight: 40,
                  padding: "8px 18px",
                  font: "inherit",
                }}
              >
                唤醒
              </button>
            </div>
          </section>
        </>
      ) : null}

      {currentSixSpaceConfig &&
      sixDimensionStep >= 3 &&
      sixDimensionStep <= 6 &&
      currentSixSpaceConfig.id !== "action" &&
      currentSixSpaceConfig.id !== "memory" &&
      spaceSteps[currentSixSpaceConfig.id] === "completed" ? (
        <>
          <header style={{ display: "grid", gap: 10 }}>
            <h1 style={{ margin: 0, color: "rgba(245,245,245,0.9)", fontSize: "clamp(30px, 8vw, 42px)", lineHeight: 1.1, fontWeight: 390 }}>
              器法已落成。
            </h1>
          </header>

          <section
            aria-label={`${currentSixSpaceConfig.name}器法落成`}
            style={{
              display: "grid",
              gap: 14,
              padding: "18px 0",
              borderTop: "1px solid rgba(199,169,107,0.34)",
              borderBottom: "1px solid rgba(85,85,85,0.38)",
            }}
          >
            <p style={{ margin: 0, color: "rgba(245,245,245,0.78)", fontSize: 18, lineHeight: 1.62 }}>
              你唤醒了「{currentSixSpaceConfig.weapons.find((weapon) => weapon.id === selectedSpaceWeapons[currentSixSpaceConfig.id])?.name ?? "一件武器"}」。
            </p>
            <div style={{ height: 1, background: "linear-gradient(90deg, rgba(199,169,107,0.3), transparent)" }} />
            <span style={{ color: "rgba(199,169,107,0.72)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11, letterSpacing: "0.13em" }}>
              今日可做的动作：
            </span>
            {(currentSixSpaceConfig.weapons.find((weapon) => weapon.id === selectedSpaceWeapons[currentSixSpaceConfig.id])?.completionLines ?? currentSixSpaceConfig.weapons[0].completionLines).map((line) => (
              <p key={line} style={{ margin: 0, color: "rgba(245,245,245,0.76)", fontSize: 18, lineHeight: 1.62 }}>
                {line}
              </p>
            ))}
            <div style={{ height: 1, background: "linear-gradient(90deg, rgba(199,169,107,0.3), transparent)" }} />
            <p style={{ margin: "4px 0 0", color: "rgba(199,169,107,0.76)", fontSize: 16, lineHeight: 1.62 }}>
              已存入你的武器库。
            </p>
          </section>

          <CausalRail
            statusLabel={currentSixSpaceConfig.id === "goal" ? "本次推演已完成" : "器法已落成"}
            rightHint={currentSixSpaceConfig.completedRightHint}
            onRight={() => handleGenericCompletedNext(currentSixSpaceConfig.id)}
          />
        </>
      ) : null}

      {sixDimensionStep === 7 ? (
        <>
          {assetStep === "preview" ? (
            <>
              <header style={{ display: "grid", gap: 10 }}>
                <h1 style={{ margin: 0, color: "rgba(245,245,245,0.9)", fontSize: "clamp(28px, 8vw, 40px)", lineHeight: 1.12, fontWeight: 390 }}>
                  你走完了这一局。
                </h1>
                <p style={{ margin: 0, color: "rgba(245,245,245,0.68)", fontSize: 15, lineHeight: 1.72 }}>
                  这根刺，已经走完六个空间。
                  <br />
                  你不是只看完了一段推演。
                  <br />
                  你已经看见它如何接管你。
                </p>
              </header>

              <section
                aria-label="资产熔断沉积"
                style={{
                  position: "relative",
                  minHeight: "58dvh",
                  padding: "12px 0 4px",
                  opacity: assetFuseStage === "break" ? 0.5 : 1,
                  transform: assetFuseStage === "break" ? "translateY(18px)" : "translateY(0)",
                  filter: assetFuseStage === "break" ? "blur(1.2px)" : "none",
                  transition: "opacity 420ms ease, transform 420ms ease, filter 420ms ease",
                }}
              >
                <div style={{ display: "grid", gap: 10, width: "82%", paddingTop: 8 }}>
                  <span style={{ color: "rgba(199,169,107,0.66)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 10, letterSpacing: "0.12em" }}>
                    07 ｜ 年轮资产 · 因果清算
                  </span>
                  <div style={{ display: "grid", gap: 10, paddingTop: 18 }}>
                    {assetPackItems.map((item, index) => {
                      const threshold = (index + 1) / assetPackItems.length;
                      const isLocked = assetFuseProgress >= threshold || isAssetFuseLocked;
                      return (
                        <div key={item} style={{ display: "grid", gridTemplateColumns: "38px 1fr", alignItems: "center", gap: 10 }}>
                          <span
                            aria-hidden="true"
                            style={{
                              height: 1,
                              background: isLocked ? "rgba(199,169,107,0.92)" : "rgba(245,245,245,0.14)",
                              boxShadow: isLocked ? "0 0 10px rgba(199,169,107,0.3)" : "none",
                              transform: isLocked ? "scaleX(1)" : "scaleX(0.45)",
                              transformOrigin: "left center",
                              transition: "background 140ms ease, transform 180ms ease, box-shadow 140ms ease",
                            }}
                          />
                          <span style={{ color: isLocked ? "rgba(245,245,245,0.84)" : "rgba(245,245,245,0.28)", fontSize: 12, lineHeight: 1.45 }}>
                            {item}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div
                  ref={assetFuseRailRef}
                  role="slider"
                  aria-label="本局资产熔断器"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(assetFuseProgress * 100)}
                  onPointerDown={handleAssetFusePointerDown}
                  onPointerMove={handleAssetFusePointerMove}
                  onPointerUp={handleAssetFusePointerUp}
                  onPointerCancel={handleAssetFusePointerUp}
                  style={{
                    position: "absolute",
                    left: "8%",
                    right: "8%",
                    bottom: "11%",
                    height: 94,
                    touchAction: "none",
                    cursor: isAssetFuseLocked ? "default" : "grab",
                  }}
                >
                  <svg aria-hidden="true" viewBox="0 0 320 62" preserveAspectRatio="none" style={{ position: "absolute", left: 0, right: 0, bottom: 0, width: "100%", height: 62, overflow: "visible" }}>
                    {isAssetFuseLocked ? (
                      <>
                        <path d="M0 36 Q74 14 158 34" fill="none" stroke="rgba(199,169,107,0.96)" strokeWidth="1" strokeLinecap="round" />
                        <path d="M162 38 Q246 58 320 36" fill="none" stroke="rgba(199,169,107,0.96)" strokeWidth="1" strokeLinecap="round" />
                      </>
                    ) : (
                      <>
                        <path d="M0 36 L320 36" fill="none" stroke="rgba(245,245,245,0.18)" strokeWidth="1" />
                        <path d={`M0 36 L${320 * assetFuseProgress} 36`} fill="none" stroke="rgba(199,169,107,0.92)" strokeWidth="1" style={{ filter: "drop-shadow(0 0 12px rgba(199,169,107,0.32))" }} />
                      </>
                    )}
                  </svg>
                  {!isAssetFuseLocked ? (
                    <span
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        left: `${assetFuseProgress * 100}%`,
                        bottom: 31,
                        width: 9,
                        height: 9,
                        transform: "translate(-50%, -50%) rotate(45deg)",
                        background: "#C7A96B",
                        boxShadow: "0 0 14px rgba(199,169,107,0.42)",
                        transition: isAssetFuseDragging ? "none" : "left 220ms cubic-bezier(.16,1,.3,1)",
                      }}
                    />
                  ) : null}
                  <p style={{ position: "absolute", left: 0, bottom: 0, margin: 0, color: "rgba(199,169,107,0.62)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 10, lineHeight: 1.45 }}>
                    ［ 右滑充能｜熔断本局因果，沉淀为年轮资产 ］
                  </p>
                </div>
              </section>
            </>
          ) : null}

          {assetStep === "unlocked" ? (
            <>
              <section
                aria-label="年轮资产卡"
                style={{
                  minHeight: "76dvh",
                  display: "grid",
                  alignContent: "center",
                  gap: 20,
                  outline: "none",
                }}
              >
                <div
                  style={{
                    width: "min(76vw, 320px)",
                    aspectRatio: "0.68",
                    justifySelf: "center",
                    border: "1px solid rgba(199,169,107,0.82)",
                    background: "radial-gradient(circle at 50% 38%, rgba(199,169,107,0.12), rgba(0,0,0,0.94) 62%)",
                    boxShadow: "0 0 38px rgba(199,169,107,0.16), inset 0 0 30px rgba(199,169,107,0.06)",
                    display: "grid",
                    alignContent: "center",
                    gap: 16,
                    padding: "24px 20px",
                    textAlign: "center",
                  }}
                >
                  <span style={{ color: "rgba(199,169,107,0.72)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 10, letterSpacing: "0.1em" }}>
                    年轮资产
                  </span>
                  <strong style={{ color: "rgba(245,245,245,0.94)", fontSize: 24, lineHeight: 1.35, fontWeight: 760 }}>
                    观爻 · 行为年轮
                  </strong>
                  <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(199,169,107,0.8), transparent)" }} />
                  <p style={{ margin: 0, color: "rgba(245,245,245,0.62)", fontSize: 13, lineHeight: 1.7 }}>
                    本局因果已沉积为永久年轮数据。
                    <br />
                    未来 90 天行为防线本已生成。
                  </p>
                  <p style={{ margin: 0, color: "rgba(199,169,107,0.7)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 10, lineHeight: 1.65 }}>
                    MOTHER: {motherCodeAssetName || "LOCKED"}
                    <br />
                    HEXAGRAM: {hexagramAsset?.name ?? displayName}
                    <br />
                    WEAPONS: {awakenedWeapons.length}
                  </p>
                </div>
                <p style={{ margin: 0, color: "rgba(199,169,107,0.82)", fontSize: 14, lineHeight: 1.62, textAlign: "center", fontWeight: 700 }}>
                  这一局已沉淀
                </p>
                <button
                  type="button"
                  onClick={handleExitCondensedAsset}
                  style={{
                    appearance: "none",
                    border: 0,
                    background: "transparent",
                    color: "rgba(199,169,107,0.72)",
                    display: "grid",
                    gap: 8,
                    padding: "6px 0 0",
                    font: "inherit",
                    cursor: "pointer",
                  }}
                >
                  <span aria-hidden="true" style={{ height: 1, background: "linear-gradient(90deg, rgba(199,169,107,0.9), rgba(199,169,107,0.18))" }} />
                  <span style={{ fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 10, lineHeight: 1.55, textAlign: "left" }}>
                    ［ 退出仪器 ］
                  </span>
                </button>
              </section>
            </>
          ) : null}
        </>
      ) : null}
    </main>
  );
}

export function GravityPage() {
  if (USE_HEXAGRAM_DELIVERY_SHELL) {
    return <HexagramCodeDeliveryShell />;
  }

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
    setIsGateVisible(false);
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
