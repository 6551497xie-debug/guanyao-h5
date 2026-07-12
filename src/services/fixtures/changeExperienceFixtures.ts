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
    growthMeaning: "情绪反应升级。",
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

export const bodyAwarenessChangeExperienceUnit: ChangeExperienceUnit = {
  dimension: "body",
  context: {
    pressureContext: "压力进入时，身体先进入警觉状态。",
    currentSituation: "身体已经开始响应压力，但意识还未完全识别。",
  },
  recognition: {
    oldReaction: "身体自动进入紧绷、防御。",
    protectionMeaning: "身体警觉曾帮助你快速应对变化。",
    rootProtection: "安全感",
    manifestBehavior: "紧绷、屏息、提前准备。",
  },
  revision: {
    newResponse: "先感知身体信号，再选择回应。",
    transformationMoment: "从身体自动紧绷，移动到能够感受身体并选择回应。",
    changeType: "body_shift",
  },
  meaning: {
    growthMeaning: "身体感知升级。",
    crystalImprint: "这一局，你开始让身体成为提醒，而不是命令。",
  },
};

export const memoryWisdomChangeExperienceUnit: ChangeExperienceUnit = {
  dimension: "memory",
  context: {
    pressureContext: "当前局面触发过去经验，旧经验参与现在判断。",
    currentSituation: "过去经历正在影响当前选择。",
  },
  recognition: {
    oldReaction: "用过去经验预测现在。",
    protectionMeaning: "经验曾帮助用户减少风险、避免重复受伤。",
    rootProtection: "安全感",
    manifestBehavior: "提前判断、套用旧路径。",
  },
  revision: {
    newResponse: "区分这是过去经验，还是现在真实发生。",
    transformationMoment: "从过去覆盖现在，移动到让经验服务现在。",
    changeType: "memory_shift",
  },
  meaning: {
    growthMeaning: "经验智慧升级。",
    crystalImprint: "这一局，你没有否定过去，你让经验成为参考。",
  },
};

export const motivationDriveChangeExperienceUnit: ChangeExperienceUnit = {
  dimension: "motivation",
  context: {
    pressureContext: "现实压力触碰深层价值、安全感、方向感。",
    currentSituation: "表面解决问题，深层是某种力量推动自己。",
  },
  recognition: {
    oldReaction: "通过结果、认可、控制确认自身价值。",
    protectionMeaning: "这种动力曾帮助用户保持方向和安全。",
    rootProtection: "价值感",
    manifestBehavior: "证明、控制、不断向前。",
  },
  revision: {
    newResponse: "先看见驱动自己的力量，再选择如何使用它。",
    transformationMoment: "从被外部结果牵引，移动到理解并主动使用内在动力。",
    changeType: "motivation_shift",
  },
  meaning: {
    growthMeaning: "我开始看见驱动自己的力量。",
    crystalImprint: "这一局，你重新认识了推动自己的力量。",
  },
};
