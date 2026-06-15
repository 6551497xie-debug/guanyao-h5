import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CausalRail } from "../components/causal/CausalRail";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { getGuanyaoR8ReadModel } from "../adapters/guanyaoR8ReadModelAdapter";
import { getPressureSeedSixSpaceProjection } from "../data/guanyaoPressureSeedSixSpaceProjectionRegistry";
import { GUANYAO_ROUTES } from "../routes/guanyaoRoutes";
import { getDemoDynamicsResult } from "../services/guanyaoInteractionService";
import { getSession } from "../services/sessionService";
import { buildMotherCodeResult } from "../services/motherCodeService";
import { getCollapseYaoTexts, getGravityYaoTexts } from "../services/yaoTextService";
import { appendInteractiveYaoChoice, generateMockAutoYaoPath, getAutoYaoPath, getInteractiveYaoPath, resetInteractiveYaoPath } from "../services/trajectoryService";
import type { GuanyaoSession, MotherCodeResult, SceneSlice, YaoBit } from "../types";
import type { PressureSeedSixSpaceProjection, PressureSeedSpaceProjection } from "../types/guanyaoPressureSeed";

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
  surface?: string;
  shell?: string;
};

type HexagramPageStage = "card" | "read";
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

const bodyIntensityOptions: Array<{ value: BodyIntensity; label: string }> = [
  { value: "yao1", label: "有一点，但不明显" },
  { value: "yao2", label: "能感觉到，还能撑" },
  { value: "yao3", label: "身体已经在反应了" },
];

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
        name: "先做最小的一步",
        cost: 2,
        description: "今天，只说一句话。",
        completionLines: ["今天，只说一句话。", "不解释，", "不说服，", "只是说出来。"],
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
        id: "interrupt",
        name: "打断它",
        cost: 2,
        description: "当‘以前也这样’出现时，说‘这次不一样’。",
        completionLines: ["当“以前也这样”出现时，", "对自己说：", "这次不一样。"],
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

const motherCodeAssetText = [
  "你天生会在僵住的局面里，",
  "寻找让事情重新流动的缝隙。",
  "压力来临前，",
  "你会先缓和，",
  "再转开，",
  "最后把真实感受藏起来。",
  "这不是缺点。",
  "这是你的原力在保护你。",
  "但当它被压力压住时，",
  "你会把“转开”",
  "误用成“逃离自己”。",
];

const hexagramAssetText = [
  "这一局不是要你继续撑住，",
  "而是让你看见：",
  "你把太多“应该”",
  "压在了自己身上。",
  "你以为自己是在负责，",
  "但身体、情绪、思维和行动，",
  "已经开始替你承受代价。",
];

const sixSpacePathMap = [
  "身体先紧张",
  "情绪开始不安",
  "思维开始解释",
  "行动开始卡住",
  "记忆拿过去做判断",
  "目标变得模糊",
];

const triggerDefenseCard = "当别人质疑你、催促你、否定你时，你最容易先解释，再证明，最后卡住。你的第一信号不是情绪，而是身体先紧。";
const firstAction72h = "72小时内，只做一件事：下一次你想解释时，先停三秒。然后问自己：他真的在听吗？";

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

function getSelectedWeaponStorageKey(spaceId: SixSpaceId) {
  return `guanyao:selected${spaceId[0].toUpperCase()}${spaceId.slice(1)}Weapon`;
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

function HexagramCodeDeliveryShell() {
  const navigate = useNavigate();
  const [hexagramPageStage, setHexagramPageStage] = useState<HexagramPageStage>("card");
  const [sixDimensionStep, setSixDimensionStep] = useState(0);
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
  const [bodySpaceStep, setBodySpaceStep] = useState<BodySpaceStep>("entry");
  const [bodyBreakthroughStep, setBodyBreakthroughStep] = useState<BreakthroughStep>(0);
  const [selectedBodyWeapon, setSelectedBodyWeapon] = useState<BodyWeapon | null>(() =>
    readJsonFromStorage<BodyWeapon>("guanyao:selectedBodyWeapon"),
  );
  const [bodySpaceHint, setBodySpaceHint] = useState("");
  const [emotionIntensity, setEmotionIntensity] = useState<EmotionIntensity | null>(() =>
    readJsonFromStorage<EmotionIntensity>("guanyao:sixSpace:emotionIntensity"),
  );
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
  const displayCode = hexagramDisplay.displayCode || "019";
  const displayName = hexagramDisplay.displayName || "地泽临";
  const displayTitle = hexagramDisplay.displayTitle || "悬崖边";
  const hexagramBoundaryLine = "你被架在责任与自我的边界上。";
  const motherCodeAssetName = readModel.motherCodeStage.motherCodeName || "兑｜转化者";
  const selectedPressureSeedSurface = selectedPressureSeedContext?.surface || "这件事刚刚发生过。";
  const hexagramReadAnchor =
    hexagramDisplay.displayCode && hexagramDisplay.displayName && hexagramDisplay.displayTitle
      ? `NO.${hexagramDisplay.displayCode} · ${hexagramDisplay.displayName}《${hexagramDisplay.displayTitle}》`
      : "本局卦码读取中";
  const hexagramReadTension = "这一局，正在照见你此刻被压住的位置。";
  const motherCodeNarrative = readModel.motherCodeStage.motherCodeName
    ? `你的${readModel.motherCodeStage.motherCodeName}\n${readModel.motherCodeStage.baseDrive || "该项读数正在生成。"}`
    : "该项读数正在生成。";
  const pressureSeedNarrative = selectedPressureSeedContext?.surface
    ? `但${selectedPressureSeedContext.surface}\n${readModel.hexagramStage.upperCodeReading || "该项读数正在生成。"}`
    : readModel.hexagramStage.upperCodeReading || "该项读数正在生成。";
  const hexagramFieldNarrative =
    readModel.hexagramStage.interactionReading
      ? readModel.hexagramStage.displayTitle && !readModel.hexagramStage.interactionReading.includes(readModel.hexagramStage.displayTitle)
        ? `${readModel.hexagramStage.interactionReading}\n这就是《${readModel.hexagramStage.displayTitle}》。`
        : readModel.hexagramStage.interactionReading
      : "该项读数正在生成。";
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
  const awakenedWeapons = sixSpaceConfigs.flatMap((config) => {
    const storedCompleted =
      typeof window !== "undefined"
        ? window.localStorage.getItem(`guanyao:${config.id}BreakthroughCompleted`) === "true"
        : false;
    const isCompleted =
      storedCompleted ||
      (config.id === "body" && bodySpaceStep === "completed") ||
      (config.id === "emotion" && emotionSpaceStep === "completed") ||
      spaceSteps[config.id] === "completed";
    const selectedWeaponId =
      config.id === "body"
        ? selectedBodyWeapon || selectedSpaceWeapons.body
        : config.id === "emotion"
          ? selectedEmotionWeapon || selectedSpaceWeapons.emotion
          : selectedSpaceWeapons[config.id];
    const weapon = config.weapons.find((candidate) => candidate.id === selectedWeaponId);

    if (!isCompleted || !weapon) return [];

    return [
      {
        space: config.name.replace("空间", ""),
        weaponName: weapon.name,
        actionText: weapon.completionLines.join(""),
      },
    ];
  });
  const currentAssetCard = {
    id: currentAssetId,
    createdAt: new Date().toISOString(),
    seedSurface: selectedPressureSeedSurface,
    motherCodeName: motherCodeAssetName,
    motherCodeAssetText: motherCodeAssetText.join(""),
    hexagramName: displayName,
    hexagramTitle: displayTitle,
    hexagramCode: displayCode,
    hexagramAssetText: [hexagramBoundaryLine, ...hexagramAssetText].join(""),
    sixSpacePathMap,
    sixSpacePatterns: sixSpacePatternSummary,
    awakenedWeapons,
    triggerDefenseCard,
    firstAction72h,
    unlocked: assetStep === "unlocked",
  };

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

  function selectBodyIntensity(value: BodyIntensity) {
    setBodyIntensity(value);
    setBodySpaceHint("");
    if (typeof window !== "undefined") {
      window.localStorage.setItem("guanyao:sixSpace:bodyIntensity", value);
    }
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

    if (typeof window !== "undefined") {
      window.localStorage.setItem("guanyao:selectedBreakSpace", "body");
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
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("guanyao:selectedBodyWeapon");
    }
    setBodySpaceStep("entry");
  }

  function handleWakeBodyWeapon() {
    if (!selectedBodyWeapon) {
      setBodySpaceHint("先选一件武器。");
      return;
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem("guanyao:selectedBodyWeapon", selectedBodyWeapon);
      window.localStorage.setItem("guanyao:selectedBreakSpace", "body");
      window.localStorage.setItem("guanyao:bodyBreakthroughCompleted", "true");
    }
    setBodySpaceHint("");
    setBodySpaceStep("completed");
  }

  function selectEmotionIntensity(value: EmotionIntensity) {
    setEmotionIntensity(value);
    setEmotionSpaceHint("");
    if (typeof window !== "undefined") {
      window.localStorage.setItem("guanyao:sixSpace:emotionIntensity", value);
    }
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

    if (typeof window !== "undefined") {
      window.localStorage.setItem("guanyao:selectedBreakSpace", "emotion");
    }
    setEmotionSpaceHint("");
    setEmotionBreakthroughStep(0);
    setEmotionSpaceStep("breakthrough");
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
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("guanyao:selectedEmotionWeapon");
    }
    setEmotionSpaceStep("entry");
  }

  function handleWakeEmotionWeapon() {
    if (!selectedEmotionWeapon) {
      setEmotionSpaceHint("先选一件武器。");
      return;
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem("guanyao:selectedBreakSpace", "emotion");
      window.localStorage.setItem("guanyao:selectedEmotionWeapon", selectedEmotionWeapon);
      window.localStorage.setItem("guanyao:emotionBreakthroughCompleted", "true");
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
    if (typeof window !== "undefined") {
      window.localStorage.setItem(`guanyao:sixSpace:${spaceId}:intensity`, value);
    }
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

    if (typeof window !== "undefined") {
      window.localStorage.setItem("guanyao:selectedBreakSpace", spaceId);
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
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(getSelectedWeaponStorageKey(spaceId));
    }
  }

  function handleWakeGenericWeapon(spaceId: SixSpaceId) {
    const selectedWeapon = selectedSpaceWeapons[spaceId];

    if (!selectedWeapon) {
      setGenericSpaceHint(spaceId, "先选一件武器。");
      return;
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem("guanyao:selectedBreakSpace", spaceId);
      window.localStorage.setItem(getSelectedWeaponStorageKey(spaceId), selectedWeapon);
      window.localStorage.setItem(`guanyao:${spaceId}BreakthroughCompleted`, "true");
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
    if (typeof window !== "undefined") {
      const unlockedAssetCard = { ...currentAssetCard, unlocked: true };
      window.localStorage.setItem("guanyao:currentAssetUnlocked", "true");
      window.localStorage.setItem("guanyao:currentAssetCard", JSON.stringify(unlockedAssetCard));

      const existingArchive = readJsonFromStorage<Array<typeof unlockedAssetCard>>("guanyao:assetArchive") ?? [];
      const nextArchive = existingArchive.some((asset) => asset.id === unlockedAssetCard.id)
        ? existingArchive.map((asset) => (asset.id === unlockedAssetCard.id ? unlockedAssetCard : asset))
        : [...existingArchive, unlockedAssetCard];
      window.localStorage.setItem("guanyao:assetArchive", JSON.stringify(nextArchive));
    }

    setIsCurrentAssetSaved(true);
    setAssetStep("unlocked");
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
        {sixDimensionStep === 0
          ? "05｜卦码生成"
          : sixDimensionStep === 7
            ? "GY / ASSET / CURRENT"
            : `GY / SPACE-0${sixDimensionStep} / ${currentSixSpaceConfig?.code ?? currentSpace?.spaceCode ?? "SPACE"}`}
      </span>

      {sixDimensionStep === 0 && hexagramPageStage === "card" ? (
        <>
          <header style={{ display: "grid", gap: 10 }}>
            <p style={{ margin: 0, color: "rgba(245,245,245,0.52)", fontSize: 16, lineHeight: 1.6 }}>
              它叫
            </p>
            <h1 style={{ margin: 0, color: "rgba(245,245,245,0.9)", fontSize: "clamp(34px, 10vw, 52px)", lineHeight: 1.08, fontWeight: 390 }}>
              「{displayName}」
            </h1>
            <p style={{ margin: 0, color: "rgba(199,169,107,0.78)", fontSize: 22, lineHeight: 1.35 }}>
              《{displayTitle}》
            </p>
            <p style={{ margin: "4px 0 0", color: "rgba(245,245,245,0.64)", fontSize: 16, lineHeight: 1.7 }}>
              {hexagramBoundaryLine}
            </p>
          </header>
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
              NO.{displayCode}
            </span>
            <strong style={{ color: "rgba(245,245,245,0.88)", fontSize: 30, fontWeight: 380, lineHeight: 1.15 }}>
              {displayName}
            </strong>
            <span style={{ color: "rgba(199,169,107,0.76)", fontSize: 17, lineHeight: 1.4 }}>
              《{displayTitle}》
            </span>
          </section>
          <CausalRail statusLabel="这一局已成形" rightHint="右滑，看它卡在哪里？" onRight={handleNextSpace} />
        </>
      ) : null}

      {sixDimensionStep === 0 && hexagramPageStage === "read" ? (
        <>
          <h1 style={{ margin: 0, color: "rgba(245,245,245,0.88)", fontSize: "clamp(28px, 8vw, 40px)", lineHeight: 1.12, fontWeight: 390 }}>
            这一局，为什么正在说你？
          </h1>
          <section
            aria-label="本局说明卡"
            style={{
              display: "grid",
              gap: 18,
              padding: "18px 0 20px",
              borderTop: "1px solid rgba(199,169,107,0.34)",
              borderBottom: "1px solid rgba(85,85,85,0.38)",
              background:
                "linear-gradient(90deg, rgba(199,169,107,0.05), transparent 74%), radial-gradient(circle at 50% 24%, rgba(199,169,107,0.07), transparent 58%)",
            }}
          >
            <span
              style={{
                color: "rgba(199,169,107,0.72)",
                fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                fontSize: 11,
                letterSpacing: "0.16em",
              }}
            >
              [ 这一局正在说你 ]
            </span>
            <div style={{ display: "grid", gap: 8 }}>
              <p
                style={{
                  margin: 0,
                  color: "rgba(245,245,245,0.88)",
                  fontSize: "clamp(18px, 5vw, 24px)",
                  lineHeight: 1.34,
                  fontWeight: 390,
                  overflowWrap: "anywhere",
                }}
              >
                {hexagramReadAnchor}
              </p>
              <p style={{ margin: 0, color: "rgba(245,245,245,0.52)", fontSize: 14, lineHeight: 1.62 }}>
                {hexagramReadTension}
              </p>
            </div>
            <div style={{ height: 1, background: "linear-gradient(90deg, rgba(199,169,107,0.36), transparent)" }} />
            {[motherCodeNarrative, pressureSeedNarrative, hexagramFieldNarrative].map((paragraph, index) => (
              <p
                key={`${index}-${paragraph}`}
                style={{
                  margin: 0,
                  color: "rgba(245,245,245,0.7)",
                  fontSize: 15,
                  lineHeight: 1.7,
                  maxWidth: "100%",
                  whiteSpace: "pre-line",
                  overflowWrap: "anywhere",
                  wordBreak: "break-word",
                }}
              >
                {paragraph}
              </p>
            ))}
            <div style={{ height: 1, background: "linear-gradient(90deg, rgba(199,169,107,0.24), transparent)" }} />
          </section>
          <CausalRail statusLabel="看它卡在哪里" rightHint="右滑，看它卡在哪里" onRight={handleNextSpace} />
        </>
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

            <p style={{ margin: 0, color: "rgba(245,245,245,0.68)", fontSize: 16, lineHeight: 1.74 }}>
              它一进身体，
              <br />
              最先变成了肩背收紧、呼吸变浅、还没开口就开始紧张。
            </p>

            <div style={{ height: 1, background: "linear-gradient(90deg, rgba(199,169,107,0.3), transparent)" }} />

            <div style={{ display: "grid", gap: 10 }}>
              <p style={{ margin: 0, color: "rgba(245,245,245,0.78)", fontSize: 16, lineHeight: 1.6 }}>
                它到了什么程度？
              </p>
              <div style={{ display: "grid", gap: 8 }}>
                {bodyIntensityOptions.map((option) => {
                  const isSelected = bodyIntensity === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => selectBodyIntensity(option.value)}
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
              你的旧反应是：撑着，假装没事。
            </p>
            {bodySpaceHint ? (
              <p style={{ margin: 0, color: "rgba(0,184,212,0.78)", fontSize: 14, lineHeight: 1.58 }}>
                {bodySpaceHint}
              </p>
            ) : null}
          </section>

          <CausalRail
            statusLabel={bodySpaceHint || "先看见它到了什么程度。"}
            leftHint="左滑，选择破局点"
            rightHint="右滑，进入下一空间"
            onLeft={handleBodyBreakSpace}
            onRight={handleBodyNextSpace}
          />
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

            <p style={{ margin: 0, color: "rgba(245,245,245,0.68)", fontSize: 16, lineHeight: 1.74 }}>
              你还没反应过来，
              <br />
              情绪已经先到了。
            </p>

            <div style={{ height: 1, background: "linear-gradient(90deg, rgba(199,169,107,0.3), transparent)" }} />

            <div style={{ display: "grid", gap: 10 }}>
              <p style={{ margin: 0, color: "rgba(245,245,245,0.78)", fontSize: 16, lineHeight: 1.6 }}>
                它到了什么程度？
              </p>
              <div style={{ display: "grid", gap: 8 }}>
                {emotionIntensityOptions.map((option) => {
                  const isSelected = emotionIntensity === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => selectEmotionIntensity(option.value)}
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
              你的旧反应是：用解释换安全。
            </p>
            {emotionSpaceHint ? (
              <p style={{ margin: 0, color: "rgba(0,184,212,0.78)", fontSize: 14, lineHeight: 1.58 }}>
                {emotionSpaceHint}
              </p>
            ) : null}
          </section>

          <CausalRail
            statusLabel={emotionSpaceHint || "先看见它到了什么程度。"}
            leftHint="左滑，选择破局点"
            rightHint="右滑，进入下一空间"
            onLeft={handleEmotionBreakSpace}
            onRight={handleEmotionNextSpace}
          />
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

      {currentSixSpaceConfig && sixDimensionStep >= 3 && sixDimensionStep <= 6 && spaceSteps[currentSixSpaceConfig.id] === "entry" ? (
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
            rightHint={currentSixSpaceConfig.id === "goal" ? "右滑，完成本次推演" : "右滑，进入下一空间"}
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

      {currentSixSpaceConfig && sixDimensionStep >= 3 && sixDimensionStep <= 6 && spaceSteps[currentSixSpaceConfig.id] === "completed" ? (
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
                <p style={{ margin: 0, color: "rgba(245,245,245,0.7)", fontSize: 16, lineHeight: 1.74, whiteSpace: "pre-line" }}>
                  这根刺，
                  {"\n"}已经走完六个空间。
                  {"\n"}你不是只看完了一段推演。
                  {"\n"}你已经看见它如何接管你。
                </p>
              </header>

              <section
                aria-label="资产包预览"
                style={{
                  display: "grid",
                  gap: 12,
                  padding: "16px 0",
                  borderTop: "1px solid rgba(199,169,107,0.34)",
                  borderBottom: "1px solid rgba(85,85,85,0.38)",
                }}
              >
                <span style={{ color: "rgba(199,169,107,0.72)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11, letterSpacing: "0.13em" }}>
                  本局资产已生成
                </span>
                <p style={{ margin: 0, color: "rgba(245,245,245,0.76)", fontSize: 16, lineHeight: 1.62 }}>
                  可沉积为：
                </p>
                {assetPackItems.map((item) => (
                  <p key={item} style={{ margin: 0, color: "rgba(245,245,245,0.68)", fontSize: 15, lineHeight: 1.52 }}>
                    ○ {item}
                  </p>
                ))}
              </section>

              <section
                aria-label="已唤醒武器简表"
                style={{
                  display: "grid",
                  gap: 12,
                  padding: "16px 0",
                  borderTop: "1px solid rgba(199,169,107,0.24)",
                  borderBottom: "1px solid rgba(85,85,85,0.28)",
                }}
              >
                <span style={{ color: "rgba(199,169,107,0.72)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11, letterSpacing: "0.13em" }}>
                  你这局已经唤醒：
                </span>
                {awakenedWeapons.length > 0 ? (
                  awakenedWeapons.map((weapon) => (
                    <p key={`${weapon.space}-${weapon.weaponName}`} style={{ margin: 0, color: "rgba(245,245,245,0.82)", fontSize: 16, lineHeight: 1.58 }}>
                      ○ {weapon.space}｜{weapon.weaponName}
                    </p>
                  ))
                ) : (
                  <p style={{ margin: 0, color: "rgba(245,245,245,0.64)", fontSize: 15, lineHeight: 1.72 }}>
                    你这次没有唤醒武器。
                    <br />
                    但你已经看见这根刺，
                    <br />
                    如何穿过六个空间。
                  </p>
                )}
              </section>

              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  style={{
                    appearance: "none",
                    border: "1px solid rgba(245,245,245,0.18)",
                    background: "transparent",
                    color: "rgba(245,245,245,0.58)",
                    minHeight: 42,
                    padding: "9px 14px",
                    font: "inherit",
                  }}
                >
                  暂不沉积
                </button>
                <button
                  type="button"
                  onClick={() => setAssetStep("confirm")}
                  style={{
                    appearance: "none",
                    border: "1px solid rgba(0,184,212,0.72)",
                    background: "rgba(0,184,212,0.08)",
                    color: "rgba(245,245,245,0.88)",
                    minHeight: 42,
                    padding: "9px 14px",
                    font: "inherit",
                  }}
                >
                  沉积为年轮资产
                </button>
              </div>

              <CausalRail statusLabel="本局资产已生成" leftHint="左滑，暂不沉积" rightHint="右滑，沉积为年轮资产" onLeft={() => navigate("/")} onRight={() => setAssetStep("confirm")} />
            </>
          ) : null}

          {assetStep === "confirm" ? (
            <>
              <header style={{ display: "grid", gap: 10 }}>
                <h1 style={{ margin: 0, color: "rgba(245,245,245,0.9)", fontSize: "clamp(28px, 8vw, 40px)", lineHeight: 1.12, fontWeight: 390 }}>
                  沉积为年轮资产
                </h1>
              </header>

              <section
                aria-label="沉积确认"
                style={{
                  display: "grid",
                  gap: 12,
                  padding: "16px 0",
                  borderTop: "1px solid rgba(199,169,107,0.34)",
                  borderBottom: "1px solid rgba(85,85,85,0.38)",
                }}
              >
                <p style={{ margin: 0, color: "rgba(245,245,245,0.76)", fontSize: 16, lineHeight: 1.62 }}>
                  你将把这一局沉积为：
                </p>
                {assetPackItems.map((item) => (
                  <p key={item} style={{ margin: 0, color: "rgba(245,245,245,0.68)", fontSize: 15, lineHeight: 1.52 }}>
                    ○ {item}
                  </p>
                ))}
                <div style={{ height: 1, background: "linear-gradient(90deg, rgba(199,169,107,0.3), transparent)" }} />
                <span style={{ color: "rgba(199,169,107,0.78)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 12, letterSpacing: "0.08em" }}>
                  将消耗 ⌛ 3
                </span>
                <p style={{ margin: 0, color: "rgba(245,245,245,0.76)", fontSize: 16, lineHeight: 1.7 }}>
                  沉积这份本局资产包。
                  <br />
                  这不是一份报告。
                  <br />
                  这是你下次还能回来使用的观变资产。
                </p>
              </section>

              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <button
                  type="button"
                  onClick={() => setAssetStep("preview")}
                  style={{
                    appearance: "none",
                    border: "1px solid rgba(245,245,245,0.18)",
                    background: "transparent",
                    color: "rgba(245,245,245,0.58)",
                    minHeight: 42,
                    padding: "9px 18px",
                    font: "inherit",
                  }}
                >
                  取消
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAssetUnlock}
                  style={{
                    appearance: "none",
                    border: "1px solid rgba(0,184,212,0.72)",
                    background: "rgba(0,184,212,0.08)",
                    color: "rgba(245,245,245,0.88)",
                    minHeight: 42,
                    padding: "9px 18px",
                    font: "inherit",
                  }}
                >
                  确认沉积
                </button>
              </div>
            </>
          ) : null}

          {assetStep === "unlocked" ? (
            <>
              <header style={{ display: "grid", gap: 10 }}>
                <h1 style={{ margin: 0, color: "rgba(245,245,245,0.9)", fontSize: "clamp(28px, 8vw, 40px)", lineHeight: 1.12, fontWeight: 390 }}>
                  本局资产已沉积。
                </h1>
                <p style={{ margin: 0, color: "rgba(245,245,245,0.7)", fontSize: 16, lineHeight: 1.74 }}>
                  你的母码、卦码、旧路径和武器，
                  <br />
                  已经存入年轮墙。
                </p>
              </header>

              {[
                ["一｜母码资产", `「${motherCodeAssetName}」`, motherCodeAssetText],
                ["二｜卦码资产", `「${displayName || "本局"}」\n《${displayTitle || "观变档案"}》`, [hexagramBoundaryLine, ...hexagramAssetText]],
                ["三｜六维旧路径地图", "", [sixSpacePathMap.join("\n→ ")]],
                ["五｜下次触发防御卡", "", triggerDefenseCard.split("。").filter(Boolean).map((line) => `${line}。`)],
                ["六｜72小时第一动作", "", firstAction72h.split("。").filter(Boolean).map((line) => `${line}。`)],
              ].map(([label, title, lines]) => (
                <section
                  key={label as string}
                  aria-label={label as string}
                  style={{
                    display: "grid",
                    gap: 10,
                    padding: "16px 0",
                    borderTop: "1px solid rgba(199,169,107,0.34)",
                    borderBottom: "1px solid rgba(85,85,85,0.3)",
                  }}
                >
                  <span style={{ color: "rgba(199,169,107,0.72)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11, letterSpacing: "0.13em" }}>
                    {label as string}
                  </span>
                  {title ? (
                    <p style={{ margin: 0, color: "rgba(245,245,245,0.82)", fontSize: 18, lineHeight: 1.48, whiteSpace: "pre-line" }}>
                      {title as string}
                    </p>
                  ) : null}
                  {(lines as string[]).map((line) => (
                    <p key={line} style={{ margin: 0, color: "rgba(245,245,245,0.64)", fontSize: 15, lineHeight: 1.68, whiteSpace: "pre-line" }}>
                      {line}
                    </p>
                  ))}
                </section>
              ))}

              <section
                aria-label="已唤醒武器卡"
                style={{
                  display: "grid",
                  gap: 12,
                  padding: "16px 0",
                  borderTop: "1px solid rgba(199,169,107,0.34)",
                  borderBottom: "1px solid rgba(85,85,85,0.3)",
                }}
              >
                <span style={{ color: "rgba(199,169,107,0.72)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11, letterSpacing: "0.13em" }}>
                  四｜已唤醒武器
                </span>
                {awakenedWeapons.length > 0 ? (
                  awakenedWeapons.map((weapon) => (
                    <div key={`${weapon.space}-${weapon.weaponName}`} style={{ display: "grid", gap: 5 }}>
                      <p style={{ margin: 0, color: "rgba(245,245,245,0.82)", fontSize: 16, lineHeight: 1.5 }}>
                        ○ {weapon.space}｜{weapon.weaponName}
                      </p>
                      <p style={{ margin: 0, color: "rgba(245,245,245,0.58)", fontSize: 14, lineHeight: 1.58 }}>
                        {weapon.actionText}
                      </p>
                    </div>
                  ))
                ) : (
                  <p style={{ margin: 0, color: "rgba(245,245,245,0.64)", fontSize: 15, lineHeight: 1.68 }}>
                    本局未唤醒武器。
                    <br />
                    但旧路径已经被记录。
                  </p>
                )}
              </section>

              <p style={{ margin: 0, color: "rgba(199,169,107,0.76)", fontSize: 16, lineHeight: 1.62 }}>
                已存入你的年轮墙。
              </p>

              <CausalRail statusLabel="已存入你的年轮墙" rightHint="右滑，返回首页" onRight={() => navigate("/")} />
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
