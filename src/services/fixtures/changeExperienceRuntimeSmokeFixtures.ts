import type { SelectedPressureSeedContext } from "../guanyaoPrimaryPetalResolver";
import type { MotherCodeProfile } from "../../types/guanyaoCausalEngine";
import {
  actionFiveAwarenessChangeExperiencePresentation,
  bodyAwarenessChangeExperiencePresentation,
  emotionChangeAwarenessChangeExperiencePresentation,
  memoryWisdomChangeExperiencePresentation,
  motivationDriveChangeExperiencePresentation,
  thoughtChangeCognitionChangeExperiencePresentation,
} from "./changeExperiencePresentationFixtures";
import { actionFiveAwarenessRuntimeUnit } from "./personaTransmissionFixtures";

export type StoredMotherCodeProfile = Partial<MotherCodeProfile> & {
  motherCodeName?: string;
  motherCodeTitle?: string;
  trigram?: string;
  lowerTrigram?: string;
  trigramSymbol?: string;
  baseDrive?: string;
};

export type StoredPersonaOutputSnapshot = {
  motherCode?: string;
  motherCodeName?: string;
  trigram?: string;
  trigramSymbol?: string;
  fourBeast?: string;
  direction?: string;
};

export type ChangeExperienceRuntimeSmokeRevisionAction = Readonly<{
  layerLabel: string;
  yaoName: string;
  actionLine: string;
  sourceReason: string;
  interventionPotential: number;
  userAgency: number;
}>;

export type ChangeExperienceRuntimeSmokeFixture = Readonly<{
  fixtureKey: string;
  smokeKeys: readonly string[];
  pressureContext: SelectedPressureSeedContext;
  motherCodeProfile: StoredMotherCodeProfile;
  personaOutputSnapshot: StoredPersonaOutputSnapshot;
  revisionAction: ChangeExperienceRuntimeSmokeRevisionAction;
}>;

export const changeExperienceRuntimeSmokeFixtures: readonly ChangeExperienceRuntimeSmokeFixture[] = [
  {
    fixtureKey: "body",
    smokeKeys: ["body-awareness", "body"],
    revisionAction: {
      layerLabel: "身体",
      yaoName: "五爻 · 觉察",
      actionLine: bodyAwarenessChangeExperiencePresentation.revision.newResponse,
      sourceReason: bodyAwarenessChangeExperiencePresentation.recognition.oldReaction,
      interventionPotential: 0.76,
      userAgency: 0.74,
    },
    pressureContext: {
      selectedPressureSeedId: "body-awareness",
      surface: "压力进入时，身体先收紧、屏息，提前为尚未发生的变化做准备。",
      pressureField: "BODY",
      pressureNature: "SAFETY",
      scenarioDomain: "SELF",
      bodySignal: "身体自动紧绷、屏息，进入防御。",
      semanticTags: ["body-awareness", "somatic_alert", "change-experience-smoke"],
    },
    motherCodeProfile: {
      motherCodeId: "dev-body-awareness-mother-kun",
      motherCodeName: "坤",
      motherCodeTitle: "承载者",
      trigram: "坤",
      lowerTrigram: "坤",
      trigramSymbol: "☷",
      baseForce: "承载、感知、让身体重新稳定。",
      defaultReactionPattern: "压力进入时，身体会先收紧并进入防御。",
      defaultReactionChain: "压力进入 → 身体收紧 → 提前防御 → 等待安全信号",
      pressureEntry: "压力会先进入身体感知。",
      behaviorBias: "把身体警觉当成必须立刻服从的命令。",
      shadowInertia: "越不确定，身体越容易提前进入防御。",
      defenseTendency: "用紧绷和屏息保护安全感。",
      pressureSensitiveZones: ["身体警觉", "安全感", "提前防御"],
    },
    personaOutputSnapshot: {
      motherCode: "坤",
      motherCodeName: "坤",
      trigram: "坤",
      trigramSymbol: "☷",
      fourBeast: "白虎",
      direction: "白虎",
    },
  },
  {
    fixtureKey: "emotion",
    smokeKeys: ["emotion-change", "emotion"],
    revisionAction: {
      layerLabel: "情绪",
      yaoName: "五爻 · 觉察",
      actionLine: emotionChangeAwarenessChangeExperiencePresentation.revision.newResponse,
      sourceReason: emotionChangeAwarenessChangeExperiencePresentation.recognition.oldReaction,
      interventionPotential: 0.78,
      userAgency: 0.76,
    },
    pressureContext: {
      selectedPressureSeedId: "emotion-change-awareness",
      surface: "关系结果还不确定，对方回应、距离、态度变化让情绪比事实更早抵达。",
      pressureField: "EMOTION",
      pressureNature: "RELATIONSHIP_UNCERTAINTY",
      scenarioDomain: "PARTNER_ROMANTIC",
      emotionalTone: "fear",
      semanticTags: ["emotion-change-awareness", "relationship_uncertainty", "change-experience-smoke"],
    },
    motherCodeProfile: {
      motherCodeId: "dev-emotion-change-mother-dui",
      motherCodeName: "兑",
      motherCodeTitle: "感应者",
      trigram: "兑",
      lowerTrigram: "兑",
      trigramSymbol: "☱",
      baseForce: "感受、回应、辨认关系信号。",
      defaultReactionPattern: "关系不确定时，情绪会先替事实下结论。",
      defaultReactionChain: "关系变化 → 情绪提前抵达 → 预判风险 → 急于确认",
      pressureEntry: "压力会先进入情绪判断。",
      behaviorBias: "通过提前揣测降低关系不确定。",
      shadowInertia: "越不确定，越容易让情绪先替事实回答。",
      defenseTendency: "用情绪预判保护自己不受伤。",
      pressureSensitiveZones: ["关系压力", "态度变化", "避免受伤"],
    },
    personaOutputSnapshot: {
      motherCode: "兑",
      motherCodeName: "兑",
      trigram: "兑",
      trigramSymbol: "☱",
      fourBeast: "玄武",
      direction: "玄武",
    },
  },
  {
    fixtureKey: "thought",
    smokeKeys: ["thought-change", "thought"],
    revisionAction: {
      layerLabel: "思想",
      yaoName: "五爻 · 觉察",
      actionLine: thoughtChangeCognitionChangeExperiencePresentation.revision.newResponse,
      sourceReason: thoughtChangeCognitionChangeExperiencePresentation.recognition.oldReaction,
      interventionPotential: 0.8,
      userAgency: 0.78,
    },
    pressureContext: {
      selectedPressureSeedId: "thought-change-cognition",
      surface: "现实结果没有按照预期发生，投入与反馈不一致，你开始寻找解释让局面重新确定。",
      pressureField: "THOUGHT",
      pressureNature: "UNCERTAINTY",
      scenarioDomain: "SELF",
      thoughtPattern: "快速下结论，用解释重新获得确定感。",
      semanticTags: ["thought-change-cognition", "interpretation_under_uncertainty", "change-experience-smoke"],
    },
    motherCodeProfile: {
      motherCodeId: "dev-thought-change-mother-kan",
      motherCodeName: "坎",
      motherCodeTitle: "辨认者",
      trigram: "坎",
      lowerTrigram: "坎",
      trigramSymbol: "☵",
      baseForce: "辨认、解释、在不确定中寻找确定。",
      defaultReactionPattern: "现实不符合预期时，会用解释快速稳定局面。",
      defaultReactionChain: "结果落差 → 快速解释 → 寻找证据 → 获得确定感",
      pressureEntry: "压力会先进入思想解释。",
      behaviorBias: "把解释当成现实。",
      shadowInertia: "越不确定，越容易相信自己的解释就是事实。",
      defenseTendency: "用解释维持确定感。",
      pressureSensitiveZones: ["现实落差", "反馈不一致", "确定感"],
    },
    personaOutputSnapshot: {
      motherCode: "坎",
      motherCodeName: "坎",
      trigram: "坎",
      trigramSymbol: "☵",
      fourBeast: "青龙",
      direction: "青龙",
    },
  },
  {
    fixtureKey: "behavior",
    smokeKeys: ["action-five"],
    revisionAction: {
      layerLabel: "行动",
      yaoName: "五爻 · 觉察",
      actionLine: actionFiveAwarenessChangeExperiencePresentation.revision.newResponse,
      sourceReason: actionFiveAwarenessRuntimeUnit.inertiaPattern,
      interventionPotential: 0.82,
      userAgency: 0.8,
    },
    pressureContext: {
      selectedPressureSeedId: "action-five-awareness",
      surface: "面对必须推进、但结果仍不确定的现实局，你试图通过立即行动恢复掌控。",
      pressureField: "ACTION",
      pressureNature: "CONTROL",
      scenarioDomain: "SELF",
      behaviorBlock: "越不确定，越想立刻推进。",
      semanticTags: ["action-five-awareness", "movement_under_uncertainty", "persona-transmission-smoke"],
    },
    motherCodeProfile: {
      motherCodeId: "dev-action-five-mother-gen",
      motherCodeName: "艮",
      motherCodeTitle: "停滞者",
      trigram: "艮",
      lowerTrigram: "艮",
      trigramSymbol: "☶",
      baseForce: "停住、承载、重新判断。",
      defaultReactionPattern: "遇到不确定时先停住局面，再用行动找回掌控。",
      defaultReactionChain: "不确定 → 停住 → 推进行动 → 恢复掌控感",
      pressureEntry: "压力会先进入行动判断。",
      behaviorBias: "通过立刻推进压住不确定。",
      shadowInertia: "越不确定，越想马上行动。",
      defenseTendency: "用行动维持安全感。",
      pressureSensitiveZones: ["推进压力", "结果不确定", "控制感"],
    },
    personaOutputSnapshot: {
      motherCode: "艮",
      motherCodeName: "艮",
      trigram: "艮",
      trigramSymbol: "☶",
      fourBeast: "朱雀",
      direction: "朱雀",
    },
  },
  {
    fixtureKey: "memory",
    smokeKeys: ["memory-wisdom", "memory"],
    revisionAction: {
      layerLabel: "记忆",
      yaoName: "五爻 · 觉察",
      actionLine: memoryWisdomChangeExperiencePresentation.revision.newResponse,
      sourceReason: memoryWisdomChangeExperiencePresentation.recognition.oldReaction,
      interventionPotential: 0.72,
      userAgency: 0.7,
    },
    pressureContext: {
      selectedPressureSeedId: "memory-wisdom",
      surface: "当前局面触发了过去经验，旧路径比眼前事实更早参与判断。",
      pressureField: "MEMORY",
      pressureNature: "PAST_EXPERIENCE",
      scenarioDomain: "SELF",
      memoryEcho: "过去经历正在覆盖现在的判断。",
      semanticTags: ["memory-wisdom", "past_experience_echo", "change-experience-smoke"],
    },
    motherCodeProfile: {
      motherCodeId: "dev-memory-wisdom-mother-kan",
      motherCodeName: "坎",
      motherCodeTitle: "溯源者",
      trigram: "坎",
      lowerTrigram: "坎",
      trigramSymbol: "☵",
      baseForce: "回看、辨认、让经验重新服务现在。",
      defaultReactionPattern: "相似局面出现时，会用过去经验提前判断现在。",
      defaultReactionChain: "相似触发 → 旧经验回响 → 提前判断 → 套用旧路径",
      pressureEntry: "压力会先唤起记忆中的旧经验。",
      behaviorBias: "把过去发生过的事当成现在必然发生的事。",
      shadowInertia: "越像过去，越容易忽略当下已经不同。",
      defenseTendency: "用旧经验减少风险、避免再次受伤。",
      pressureSensitiveZones: ["过去经验", "相似触发", "避免受伤"],
    },
    personaOutputSnapshot: {
      motherCode: "坎",
      motherCodeName: "坎",
      trigram: "坎",
      trigramSymbol: "☵",
      fourBeast: "玄武",
      direction: "玄武",
    },
  },
  {
    fixtureKey: "motivation",
    smokeKeys: ["motivation-drive", "motivation"],
    revisionAction: {
      layerLabel: "动机",
      yaoName: "五爻 · 觉察",
      actionLine: motivationDriveChangeExperiencePresentation.revision.newResponse,
      sourceReason: motivationDriveChangeExperiencePresentation.recognition.oldReaction,
      interventionPotential: 0.74,
      userAgency: 0.72,
    },
    pressureContext: {
      selectedPressureSeedId: "motivation-drive",
      surface: "现实压力碰到价值感和方向感，你开始通过结果、认可与控制确认自己。",
      pressureField: "MOTIVATION",
      pressureNature: "VALUE_DIRECTION",
      scenarioDomain: "SELF",
      motivationLoss: "外部结果正在拉扯内在方向。",
      semanticTags: ["motivation-drive", "value_direction", "change-experience-smoke"],
    },
    motherCodeProfile: {
      motherCodeId: "dev-motivation-drive-mother-zhen",
      motherCodeName: "震",
      motherCodeTitle: "启动者",
      trigram: "震",
      lowerTrigram: "震",
      trigramSymbol: "☳",
      baseForce: "启动、辨认方向、把力量带回自身。",
      defaultReactionPattern: "方向不稳时，会通过结果和认可确认自身价值。",
      defaultReactionChain: "方向动摇 → 追逐结果 → 寻求认可 → 暂时确认价值",
      pressureEntry: "压力会先触碰价值感与方向感。",
      behaviorBias: "把外部结果当成内在价值的唯一证明。",
      shadowInertia: "越不确定方向，越容易不断向前证明自己。",
      defenseTendency: "用结果、认可和控制维持价值感。",
      pressureSensitiveZones: ["价值感", "方向感", "外部认可"],
    },
    personaOutputSnapshot: {
      motherCode: "震",
      motherCodeName: "震",
      trigram: "震",
      trigramSymbol: "☳",
      fourBeast: "青龙",
      direction: "青龙",
    },
  },
];

export const resolveChangeExperienceRuntimeSmokeFixture = (
  smokeKey: string | null,
): ChangeExperienceRuntimeSmokeFixture | null => {
  if (!smokeKey) return null;

  return changeExperienceRuntimeSmokeFixtures.find((fixture) => fixture.smokeKeys.includes(smokeKey)) ?? null;
};

export const resolveChangeExperienceRuntimeSmokeRevisionAction = (
  smokeKey: string | null,
): ChangeExperienceRuntimeSmokeRevisionAction | null =>
  resolveChangeExperienceRuntimeSmokeFixture(smokeKey)?.revisionAction ?? null;
