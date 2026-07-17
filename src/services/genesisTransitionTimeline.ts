import type { GenesisRuntimeStage } from "../types/genesisRuntimeStateMachine";
import type {
  GenesisRhythmProfile,
  GenesisStageDuration,
  GenesisTransitionDuration,
  GenesisTransitionEasing,
  GenesisTransitionTimeline,
  GenesisTransitionTimelineBlockedReason,
  GenesisTransitionTimelineBoundary,
  GenesisTransitionTimelineInput,
  GenesisTransitionTimelineResult,
  GenesisTransitionTimelineStage,
  GenesisTransitionTimelineUnavailableReason,
  GenesisUserPauseWindow,
} from "../types/genesisTransitionTimeline";

const TIMELINE_BOUNDARY: GenesisTransitionTimelineBoundary = Object.freeze({
  timelineDefinitionOnly: true,
  noFastRhythm: true,
  noRendererAnimation: true,
  noWebGL: true,
  noShader: true,
  noParticleParameters: true,
  noVisualStateMutation: true,
  noIdentityMutation: true,
  noEngineInvocation: true,
  noStorageWrite: true,
  noUserFlowIntegration: true,
  noReality: true,
  noGravity: true,
  noChoice: true,
  noCrystal: true,
});

const TIMELINE_STAGES = Object.freeze([
  Object.freeze({
    stage: "MOON_ORIGIN",
    stageDuration: "DEEPLY_HELD",
    transitionDuration: "LONG",
    rhythmProfile: "DEEP",
    transitionEasing: "QUIET_DISSOLVE",
    userPauseWindow: "OBSERVATION_WINDOW",
  }),
  Object.freeze({
    stage: "STAR_RIVER",
    stageDuration: "SLOWLY_FLOWING",
    transitionDuration: "GRADUAL",
    rhythmProfile: "FLOW",
    transitionEasing: "STEADY_EXPANSION",
    userPauseWindow: "OBSERVATION_WINDOW",
  }),
  Object.freeze({
    stage: "TIME_RESONANCE",
    stageDuration: "RESPONSE_WINDOW",
    transitionDuration: "PATIENT",
    rhythmProfile: "RESPONSE",
    transitionEasing: "PATIENT_RESPONSE",
    userPauseWindow: "TIME_DELIVERY_WINDOW",
  }),
  Object.freeze({
    stage: "SYMBOL_REVEAL",
    stageDuration: "SLOWLY_FLOWING",
    transitionDuration: "GRADUAL",
    rhythmProfile: "FLOW",
    transitionEasing: "GRADUAL_AGGREGATION",
    userPauseWindow: "OBSERVATION_WINDOW",
  }),
  Object.freeze({
    stage: "HEXAGRAM_IMPRINT",
    stageDuration: "RESPONSE_WINDOW",
    transitionDuration: "PATIENT",
    rhythmProfile: "RESPONSE",
    transitionEasing: "SLOW_IMPRINT",
    userPauseWindow: "OBSERVATION_WINDOW",
  }),
  Object.freeze({
    stage: "LIFE_FORCE",
    stageDuration: "SLOWLY_FLOWING",
    transitionDuration: "GRADUAL",
    rhythmProfile: "FLOW",
    transitionEasing: "GENTLE_AWAKENING",
    userPauseWindow: "OBSERVATION_WINDOW",
  }),
  Object.freeze({
    stage: "STAR_BEAST_REVEAL",
    stageDuration: "DEEPLY_HELD",
    transitionDuration: "LONG",
    rhythmProfile: "DEEP",
    transitionEasing: "QUIET_RETURN",
    userPauseWindow: "OBSERVATION_WINDOW",
  }),
  Object.freeze({
    stage: "COMPLETION",
    stageDuration: "COMPLETION_HOLD",
    transitionDuration: "NO_AUTOMATIC_TRANSITION",
    rhythmProfile: "DEEP",
    transitionEasing: "NO_AUTOMATIC_TRANSITION",
    userPauseWindow: "RECOGNITION_WINDOW",
  }),
] as const);

const STAGE_ORDER = Object.freeze([
  "MOON_ORIGIN",
  "STAR_RIVER",
  "TIME_RESONANCE",
  "SYMBOL_REVEAL",
  "HEXAGRAM_IMPRINT",
  "LIFE_FORCE",
  "STAR_BEAST_REVEAL",
  "COMPLETION",
] as const);

const unavailable = (
  input: GenesisTransitionTimelineInput,
  reason: GenesisTransitionTimelineUnavailableReason,
): GenesisTransitionTimelineResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    timelineStatus: "UNAVAILABLE" as const,
    source: "genesis_transition_timeline" as const,
    reason,
    input,
    timeline: null,
    boundary: TIMELINE_BOUNDARY,
  });

const blocked = (
  input: GenesisTransitionTimelineInput,
  reason: GenesisTransitionTimelineBlockedReason,
): GenesisTransitionTimelineResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    timelineStatus: "BLOCKED" as const,
    source: "genesis_transition_timeline" as const,
    reason,
    input,
    timeline: null,
    boundary: TIMELINE_BOUNDARY,
  });

const hasExpectedSequence = (
  values: readonly string[],
  expected: readonly string[],
): boolean =>
  values.length === expected.length &&
  values.every((value, index) => value === expected[index]);

const hasValidStateMachine = (
  input: GenesisTransitionTimelineInput,
): boolean => {
  const machine = input.stateMachineReference;
  if (machine === null || machine.readinessReference.status !== "READY") {
    return false;
  }
  return (
    machine.currentStage !== undefined &&
    machine.boundary.stateMachineOnly === true &&
    machine.boundary.sequenceOrchestrationOnly === true &&
    machine.boundary.noVisualStateMutation === true &&
    machine.boundary.noVisualStateCreation === true &&
    machine.boundary.noIdentity === true &&
    machine.boundary.noUserData === true &&
    machine.boundary.noEngineResult === true &&
    machine.boundary.noRendererCommand === true &&
    machine.boundary.noRendererInvocation === true &&
    machine.boundary.noSceneModelMutation === true &&
    machine.boundary.noRenderPlanMutation === true &&
    machine.boundary.noReality === true &&
    machine.boundary.noGravity === true &&
    machine.boundary.noChoice === true &&
    machine.boundary.noCrystal === true &&
    machine.boundary.noStorage === true &&
    machine.boundary.noParallelGenesisStages === true &&
    machine.boundary.noStageReordering === true &&
    machine.boundary.userInputOnlyAtTimeResonance === true
  );
};

const hasValidStageTimeline = (
  stages: readonly GenesisTransitionTimelineStage[],
): boolean =>
  hasExpectedSequence(stages.map((entry) => entry.stage), STAGE_ORDER) &&
  stages.every(
    (entry) =>
      entry.stageDuration !== undefined &&
      entry.transitionDuration !== undefined &&
      entry.rhythmProfile !== undefined &&
      entry.transitionEasing !== undefined &&
      entry.userPauseWindow !== undefined &&
      entry.rhythmProfile !== ("FAST" as GenesisRhythmProfile) &&
      entry.stageDuration !== ("FAST" as GenesisStageDuration) &&
      entry.transitionDuration !== ("FAST" as GenesisTransitionDuration) &&
      entry.transitionEasing !== ("FAST" as GenesisTransitionEasing) &&
      entry.userPauseWindow !== ("FAST" as GenesisUserPauseWindow)
  ) &&
  stages[0]?.rhythmProfile === "DEEP" &&
  stages[1]?.rhythmProfile === "FLOW" &&
  stages[2]?.rhythmProfile === "RESPONSE" &&
  stages[3]?.rhythmProfile === "FLOW" &&
  stages[4]?.rhythmProfile === "RESPONSE" &&
  stages[5]?.rhythmProfile === "FLOW" &&
  stages[6]?.rhythmProfile === "DEEP" &&
  stages[7]?.rhythmProfile === "DEEP" &&
  stages[2]?.userPauseWindow === "TIME_DELIVERY_WINDOW" &&
  stages[7]?.userPauseWindow === "RECOGNITION_WINDOW" &&
  stages[7]?.stageDuration === "COMPLETION_HOLD" &&
  stages[7]?.transitionDuration === "NO_AUTOMATIC_TRANSITION";

export function resolveGenesisTransitionTimeline(
  input: GenesisTransitionTimelineInput,
): GenesisTransitionTimelineResult {
  const machine = input.stateMachineReference;
  if (machine === null) {
    return unavailable(input, "STATE_MACHINE_REFERENCE_REQUIRED");
  }
  if (machine.readinessReference.status === "UNAVAILABLE") {
    return unavailable(input, "STATE_MACHINE_REFERENCE_UNAVAILABLE");
  }
  if (machine.readinessReference.status === "BLOCKED") {
    return blocked(input, "STATE_MACHINE_SEQUENCE_INVALID");
  }
  if (!hasValidStateMachine(input)) {
    return blocked(input, "STATE_MACHINE_BOUNDARY_INVALID");
  }
  if (!hasValidStageTimeline(TIMELINE_STAGES)) {
    return blocked(input, "TIMELINE_SEQUENCE_INVALID");
  }
  if (TIMELINE_STAGES.some((entry) => entry.rhythmProfile === ("FAST" as GenesisRhythmProfile))) {
    return blocked(input, "FAST_RHYTHM_FORBIDDEN");
  }
  if (
    TIMELINE_STAGES.some(
      (entry) =>
        (entry.userPauseWindow as GenesisUserPauseWindow) ===
        "NO_USER_ACTION"
    )
  ) {
    return blocked(input, "USER_PAUSE_WINDOW_MISSING");
  }
  if (TIMELINE_STAGES[7]?.stageDuration !== "COMPLETION_HOLD") {
    return blocked(input, "COMPLETION_HOLD_MISSING");
  }
  if (
    TIMELINE_BOUNDARY.timelineDefinitionOnly !== true ||
    TIMELINE_BOUNDARY.noFastRhythm !== true ||
    TIMELINE_BOUNDARY.noRendererAnimation !== true ||
    TIMELINE_BOUNDARY.noWebGL !== true ||
    TIMELINE_BOUNDARY.noShader !== true ||
    TIMELINE_BOUNDARY.noParticleParameters !== true ||
    TIMELINE_BOUNDARY.noVisualStateMutation !== true ||
    TIMELINE_BOUNDARY.noIdentityMutation !== true ||
    TIMELINE_BOUNDARY.noEngineInvocation !== true ||
    TIMELINE_BOUNDARY.noStorageWrite !== true ||
    TIMELINE_BOUNDARY.noUserFlowIntegration !== true ||
    TIMELINE_BOUNDARY.noReality !== true ||
    TIMELINE_BOUNDARY.noGravity !== true ||
    TIMELINE_BOUNDARY.noChoice !== true ||
    TIMELINE_BOUNDARY.noCrystal !== true
  ) {
    return blocked(input, "TIMELINE_BOUNDARY_INVALID");
  }

  const timeline: GenesisTransitionTimeline = Object.freeze({
    stages: TIMELINE_STAGES,
    completionHold: "LONG_RECOGNITION_HOLD",
    runtimeStateMachineReference: machine,
    boundary: TIMELINE_BOUNDARY,
  });

  return Object.freeze({
    status: "READY" as const,
    timelineStatus: "GENESIS_TRANSITION_TIMELINE_READY" as const,
    source: "genesis_transition_timeline" as const,
    input,
    timeline,
    boundary: TIMELINE_BOUNDARY,
  });
}
