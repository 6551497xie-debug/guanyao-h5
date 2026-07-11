import type {
  PersonaTransmissionMappingInput,
  PersonaTransmissionRuntimeUnit,
} from "../../types/personaTransmission";

export const ACTION_FIVE_AWARENESS_FIXTURE_ID = "action-five-awareness";

export const actionFiveAwarenessRuntimeUnit: PersonaTransmissionRuntimeUnit = {
  identity: {
    unitId: ACTION_FIVE_AWARENESS_FIXTURE_ID,
  },
  dimension: "action",
  yaoStage: "awareness",
  triggerContext: {
    pressureSeed: "面对必须推进、但结果仍不确定的现实局，用户试图通过立即行动恢复掌控。",
    pressureField: "movement_under_uncertainty",
    motherCodeInfluence: "用户容易通过行动重新获得掌控感，也用行动确认自己的价值。",
    motherCodeName: "fixture-mother-code",
    currentHexagramProfile: "这一局形成在需要推进，但方向尚未完全清楚的位置。",
    currentHexagramName: "fixture-current-hexagram",
    source: "fixture",
  },
  oldModel: "在结果不确定时，通过马上行动恢复掌控感。",
  inertiaPattern: "越不确定，越想立刻推进。",
  insight: "面对这局不确定的推进压力，你已经习惯先行动，让自己重新获得掌控感。",
  revisionDirection: "先判断，再行动。",
  microAction: "下一次急着推进前，先确认真正要解决的问题。",
  beastCue: {
    before: "方向光轨过快外射。",
    after: "方向重新稳定展开。",
    cue: "星兽从向前急冲，转为先稳住方向。",
  },
  crystalTrace: {
    traceLine: "从用行动压下不确定，转向先判断再行动。",
    shouldDepositToCrystal: true,
    shouldDepositToRingLite: true,
  },
  guardrails: {
    noStorageWrite: true,
    noLongTermProfile: true,
    noRawEngineLanguage: true,
    no384Yao: true,
    noArchive: true,
  },
};

export const actionFiveAwarenessMappingInput: PersonaTransmissionMappingInput = {
  yaoTransmissionProfile: {
    yaoPosition: 5,
    yaoName: "五爻 · 觉察",
    yaoLayer: "behavior",
    layerLabel: "行动",
    layerQuestion: "旧模型如何变成行为？",
    pressureReading: "一个需要推进，但结果不确定的现实局面正在形成。",
    motherCodeInfluence: "用户倾向通过行动获得掌控感。",
    hexagramInfluence: "当前处境激活了行动模型，但方向尚未完全清楚。",
    transmissionReading: "压力进入行动空间，并暴露出用行动压下不确定的旧模型。",
    inertiaSignal: "遇到不确定时立即行动。",
    antiInstinctHint: "行动前先确认真正要解决的问题。",
    cutPotential: 0.74,
    interventionPotential: 0.82,
    pauseSignal: "clear",
    pauseReason: "行动冲动出现前存在可介入的判断点。",
    userFacingPausePrompt: "先确认真正要解决的问题。",
    userFacingContinuePrompt: "确认后再行动。",
  },
  pressureContext: {
    pressureSeedId: ACTION_FIVE_AWARENESS_FIXTURE_ID,
    pressureSeed: "面对必须推进、但结果仍不确定的现实局，用户试图通过立即行动恢复掌控。",
    pressureField: "movement_under_uncertainty",
  },
  currentContext: {
    motherCodeProfile: "fixture-mother-code-profile",
    motherCodeName: "fixture-mother-code",
    motherCodeInfluence: "用户容易通过行动重新获得掌控感，也用行动确认自己的价值。",
    currentHexagramProfile: "这一局形成在需要推进，但方向尚未完全清楚的位置。",
    currentHexagramName: "fixture-current-hexagram",
  },
  cutContext: {
    userAgency: 0.8,
  },
  source: "fixture",
};
