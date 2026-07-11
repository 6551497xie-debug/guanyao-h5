import type { ChangeExperienceUnit } from "../../types/changeExperience";

export const actionFiveAwarenessChangeExperienceUnit: ChangeExperienceUnit = {
  dimension: "action",
  context: {
    pressureContext: "结果不确定、必须推进，现实压力要求你快速行动。",
    currentSituation: "你正在一个需要突破方向、但结果尚未确定的局面。",
  },
  recognition: {
    oldReaction: "你习惯通过行动快速恢复掌控。",
    protectionMeaning: "行动力曾经帮助你突破困难。",
    rootProtection: "掌控感",
    manifestBehavior: "快速推进",
  },
  revision: {
    newResponse: "先判断真正要解决的问题，再采取行动。",
    transformationMoment: "从急于推进，移动到有意识选择行动方向。",
    changeType: "behavior_shift",
  },
  meaning: {
    growthMeaning: "行动模式升级。",
    crystalImprint: "这一局留下了更有方向感的行动方式。",
  },
};
