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

export const emotionChangeAwarenessChangeExperienceUnit: ChangeExperienceUnit = {
  dimension: "emotion",
  context: {
    pressureContext: "关系结果不确定，对方回应、距离、态度变化触发情绪防御。",
    currentSituation: "你处在关系走向还不清楚的位置，情绪比事实更早抵达。",
  },
  recognition: {
    oldReaction: "情绪替事实下结论。",
    protectionMeaning: "情绪曾帮助你提前发现关系风险，提前保护自己。",
    rootProtection: "避免受伤",
    manifestBehavior: "反复揣测、提前失望、急于确认",
  },
  revision: {
    newResponse: "先看见情绪，再确认事实。",
    transformationMoment: "从被情绪推动判断，移动到能够观察情绪并重新选择回应。",
    changeType: "emotion_shift",
  },
  meaning: {
    growthMeaning: "情绪觉察升级。",
    crystalImprint: "这一局，你没有压下情绪，你让情绪成为信号，而不是结论。",
  },
};

export const thoughtChangeCognitionChangeExperienceUnit: ChangeExperienceUnit = {
  dimension: "thought",
  context: {
    pressureContext: "现实结果没有按照预期发生，投入与反馈不一致，未来方向不确定。",
    currentSituation: "你进入一个现实结果与内在预期不一致的位置，正在寻找解释让局面重新确定。",
  },
  recognition: {
    oldReaction: "解释等同现实。",
    protectionMeaning: "这种解释方式曾帮助你快速理解环境，在不确定中获得确定感。",
    rootProtection: "确定感",
    manifestBehavior: "快速下结论、寻找证明判断正确的证据、用过去经验预测未来",
  },
  revision: {
    newResponse: "先看事实，再看解释。",
    transformationMoment: "从相信自己的解释就是现实，移动到能够观察自己的解释方式。",
    changeType: "cognition_shift",
  },
  meaning: {
    growthMeaning: "认知升级。",
    crystalImprint: "这一局，你没有改变现实，你改变了看见现实的方式。",
  },
};
