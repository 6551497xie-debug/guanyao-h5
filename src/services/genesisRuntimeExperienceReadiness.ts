import type {
  GenesisRuntimeExperienceReadiness,
  GenesisRuntimeExperienceReadinessBlockedReason,
  GenesisRuntimeExperienceReadinessBoundary,
  GenesisRuntimeExperienceReadinessInput,
  GenesisRuntimeExperienceReadinessResult,
  GenesisRuntimeExperienceReadinessUnavailableReason,
} from "../types/genesisRuntimeExperienceReadiness";

const READINESS_BOUNDARY: GenesisRuntimeExperienceReadinessBoundary =
  Object.freeze({
    readinessReviewOnly: true,
    noFormalRuntimeIntegration: true,
    noRendererInvocation: true,
    noUiRendering: true,
    noUserInputHandling: true,
    noIdentityCalculation: true,
    noEngineResultConsumption: true,
    noStorageState: true,
    noRealityPressure: true,
    noGravity: true,
    noChoice: true,
    noCrystal: true,
    noUserBinding: true,
    noIdentityMutation: true,
    noSceneModelMutation: true,
    noRenderPlanMutation: true,
    noVisualStateMutation: true,
    rendererConsumesVisualStateOnly: true,
  });

const RUNTIME_SEQUENCE = Object.freeze([
  "MOON",
  "STAR",
  "TIME",
  "SYMBOL",
  "HEXAGRAM",
  "FORCE",
  "BEAST",
  "COMPLETION",
] as const);

const RUNTIME_TRANSITIONS = Object.freeze([
  "MOON_TO_STAR",
  "STAR_TO_TIME",
  "TIME_TO_SYMBOL",
  "SYMBOL_TO_HEXAGRAM",
  "HEXAGRAM_TO_FORCE",
  "FORCE_TO_BEAST",
  "BEAST_TO_COMPLETION",
] as const);

const unavailable = (
  input: GenesisRuntimeExperienceReadinessInput,
  reason: GenesisRuntimeExperienceReadinessUnavailableReason,
): GenesisRuntimeExperienceReadinessResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    readiness: "UNAVAILABLE" as const,
    source: "genesis_runtime_experience_readiness" as const,
    reason,
    input,
    readinessContract: null,
    boundary: READINESS_BOUNDARY,
  });

const blocked = (
  input: GenesisRuntimeExperienceReadinessInput,
  reason: GenesisRuntimeExperienceReadinessBlockedReason,
): GenesisRuntimeExperienceReadinessResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    readiness: "BLOCKED" as const,
    source: "genesis_runtime_experience_readiness" as const,
    reason,
    input,
    readinessContract: null,
    boundary: READINESS_BOUNDARY,
  });

const hasExpectedSequence = (
  values: readonly string[],
  expected: readonly string[],
): boolean =>
  values.length === expected.length &&
  values.every((value, index) => value === expected[index]);

const hasValidCompletionReview = (
  input: GenesisRuntimeExperienceReadinessInput,
): boolean => {
  const completionResult = input.completionMomentReviewResult;
  if (completionResult === null || completionResult.status !== "READY") {
    return false;
  }

  const completion = completionResult.review;
  const runtimeResult = completion.experienceRuntimeReviewReference;
  if (runtimeResult.status !== "READY") return false;

  const runtime = runtimeResult.review;
  return (
    completion.completionState === "GENESIS_PRESENCE_STABILIZED" &&
    completion.recognitionMoment === "PERSONAL_STAR_BEAST_RECOGNITION_OPEN" &&
    completion.presenceStability === "QUIET_PRESENCE_STABLE" &&
    completion.transitionReadiness === "REALITY_ENTRY_REVIEW_PENDING" &&
    completion.emotionalClosure === "GENESIS_CLOSURE_OPEN_NOT_FINAL" &&
    completion.genesisToRealityBoundary ===
      "GENESIS_TO_REALITY_BOUNDARY_HELD" &&
    hasExpectedSequence(runtime.experienceSequence, [
      "MOON",
      "STAR",
      "TIME",
      "SYMBOL",
      "HEXAGRAM",
      "FORCE",
      "BEAST",
    ]) &&
    hasExpectedSequence(runtime.transitions, [
      "MOON_TO_STAR",
      "STAR_TO_TIME",
      "TIME_TO_SYMBOL",
      "SYMBOL_TO_HEXAGRAM",
      "HEXAGRAM_TO_FORCE",
      "FORCE_TO_BEAST",
    ]) &&
    runtime.transitionState === "CAUSALLY_CONTINUOUS" &&
    runtime.temporalFlow === "SLOW_CONTINUOUS_REVEAL" &&
    runtime.userParticipationPoint === "TIME_DELIVERY_ONLY" &&
    runtime.revealJourneyState ===
      "SEVEN_LAYER_REVEAL_RUNTIME_REVIEW_READY" &&
    runtimeResult.runtimeBoundary.reviewOnly === true &&
    runtimeResult.runtimeBoundary.visualStateOrchestrationOnly === true &&
    runtimeResult.runtimeBoundary.timelineDefinitionOnly === true &&
    runtimeResult.runtimeBoundary.transitionDefinitionOnly === true &&
    runtimeResult.runtimeBoundary.userExperienceDefinitionOnly === true &&
    runtimeResult.runtimeBoundary.noIdentityCalculation === true &&
    runtimeResult.runtimeBoundary.noEngineResultConsumption === true &&
    runtimeResult.runtimeBoundary.noRendererCommand === true &&
    runtimeResult.runtimeBoundary.noStorageState === true &&
    runtimeResult.runtimeBoundary.noRealityPressure === true &&
    runtimeResult.runtimeBoundary.noGravity === true &&
    runtimeResult.runtimeBoundary.noChoice === true &&
    runtimeResult.runtimeBoundary.noCrystal === true &&
    runtimeResult.runtimeBoundary.noUserBinding === true &&
    runtimeResult.runtimeBoundary.noFormalRuntimeIntegration === true &&
    runtimeResult.runtimeBoundary.noUiMutation === true &&
    runtimeResult.runtimeBoundary.noVisualStateMutation === true &&
    completionResult.runtimeBoundary.completionReviewOnly === true &&
    completionResult.runtimeBoundary.genesisLayerOnly === true &&
    completionResult.runtimeBoundary.realityEntryBoundaryHeld === true &&
    completionResult.runtimeBoundary.noRealityCalculation === true &&
    completionResult.runtimeBoundary.noPressureAnalysis === true &&
    completionResult.runtimeBoundary.noGravity === true &&
    completionResult.runtimeBoundary.noChoice === true &&
    completionResult.runtimeBoundary.noCrystal === true &&
    completionResult.runtimeBoundary.noStorage === true &&
    completionResult.runtimeBoundary.noUserProfile === true &&
    completionResult.runtimeBoundary.noIdentityMutation === true &&
    completionResult.runtimeBoundary.noEngineInvocation === true &&
    completionResult.runtimeBoundary.noRendererInvocation === true &&
    completionResult.runtimeBoundary.noUiFlowMutation === true &&
    completionResult.runtimeBoundary.noVisualStateMutation === true &&
    completionResult.runtimeBoundary.noNewGenesisLayer === true
  );
};

export function reviewGenesisRuntimeExperienceReadiness(
  input: GenesisRuntimeExperienceReadinessInput,
): GenesisRuntimeExperienceReadinessResult {
  const completionResult = input.completionMomentReviewResult;
  if (completionResult === null) {
    return unavailable(input, "COMPLETION_MOMENT_REVIEW_REQUIRED");
  }
  if (completionResult.status === "UNAVAILABLE") {
    return unavailable(input, "COMPLETION_MOMENT_REVIEW_UNAVAILABLE");
  }
  if (completionResult.status === "BLOCKED") {
    return blocked(input, "COMPLETION_MOMENT_REVIEW_BLOCKED");
  }
  if (!hasValidCompletionReview(input)) {
    return blocked(input, "COMPLETION_RUNTIME_BOUNDARY_INVALID");
  }

  const readinessContract: GenesisRuntimeExperienceReadiness = Object.freeze({
    runtimeSequenceContract: "MOON_TO_COMPLETION_IN_ORDER",
    visualStateConsumption: "READ_ONLY_UPSTREAM_GENESIS_VISUAL_STATES",
    transitionContract: "CAUSALLY_CONTINUOUS_SLOW_REVEAL",
    interactionBoundary: "TIME_DELIVERY_ONLY",
    rendererConsumptionBoundary: "VISUAL_STATE_TO_RENDERER_ONLY",
    readinessState: "READY_FOR_RUNTIME_EXPERIENCE_IMPLEMENTATION",
    runtimeSequence: RUNTIME_SEQUENCE,
    transitions: RUNTIME_TRANSITIONS,
    completionMomentReviewReference: completionResult,
    boundary: READINESS_BOUNDARY,
  });

  return Object.freeze({
    status: "READY" as const,
    readiness: "READY_FOR_RUNTIME_EXPERIENCE_IMPLEMENTATION" as const,
    source: "genesis_runtime_experience_readiness" as const,
    input,
    readinessContract,
    boundary: READINESS_BOUNDARY,
  });
}
