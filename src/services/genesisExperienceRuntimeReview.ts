import type {
  GenesisExperienceRuntimeBoundary,
  GenesisExperienceRuntimeReview,
  GenesisExperienceRuntimeReviewBlockedReason,
  GenesisExperienceRuntimeReviewInput,
  GenesisExperienceRuntimeReviewResult,
  GenesisExperienceRuntimeReviewUnavailableReason,
} from "../types/genesisExperienceRuntimeReview";

const RUNTIME_BOUNDARY: GenesisExperienceRuntimeBoundary = Object.freeze({
  reviewOnly: true,
  visualStateOrchestrationOnly: true,
  timelineDefinitionOnly: true,
  transitionDefinitionOnly: true,
  userExperienceDefinitionOnly: true,
  noIdentityCalculation: true,
  noEngineResultConsumption: true,
  noRendererCommand: true,
  noStorageState: true,
  noRealityPressure: true,
  noGravity: true,
  noChoice: true,
  noCrystal: true,
  noUserBinding: true,
  noFormalRuntimeIntegration: true,
  noUiMutation: true,
  noVisualStateMutation: true,
});

const EXPERIENCE_SEQUENCE = Object.freeze([
  "MOON",
  "STAR",
  "TIME",
  "SYMBOL",
  "HEXAGRAM",
  "FORCE",
  "BEAST",
] as const);

const EXPERIENCE_TRANSITIONS = Object.freeze([
  "MOON_TO_STAR",
  "STAR_TO_TIME",
  "TIME_TO_SYMBOL",
  "SYMBOL_TO_HEXAGRAM",
  "HEXAGRAM_TO_FORCE",
  "FORCE_TO_BEAST",
] as const);

const unavailable = (
  input: GenesisExperienceRuntimeReviewInput,
  reason: GenesisExperienceRuntimeReviewUnavailableReason,
): GenesisExperienceRuntimeReviewResult => Object.freeze({
  status: "UNAVAILABLE" as const,
  reviewStatus: "UNAVAILABLE" as const,
  source: "genesis_experience_runtime_review" as const,
  reason,
  input,
  review: null,
  runtimeBoundary: RUNTIME_BOUNDARY,
});

const blocked = (
  input: GenesisExperienceRuntimeReviewInput,
  reason: GenesisExperienceRuntimeReviewBlockedReason,
): GenesisExperienceRuntimeReviewResult => Object.freeze({
  status: "BLOCKED" as const,
  reviewStatus: "BLOCKED" as const,
  source: "genesis_experience_runtime_review" as const,
  reason,
  input,
  review: null,
  runtimeBoundary: RUNTIME_BOUNDARY,
});

const hasExpectedSequence = (values: readonly string[], expected: readonly string[]): boolean =>
  values.length === expected.length && values.every((value, index) => value === expected[index]);

const hasValidFullSequenceReview = (
  input: GenesisExperienceRuntimeReviewInput,
): boolean => {
  const result = input.fullSequenceReviewResult;
  if (result === null || result.status !== "READY") return false;
  const review = result.review;
  return (
    hasExpectedSequence(review.sequence, EXPERIENCE_SEQUENCE) &&
    hasExpectedSequence(review.transitions, EXPERIENCE_TRANSITIONS) &&
    review.sequenceIntegrity === "SEVEN_LAYER_SEQUENCE_INTACT" &&
    review.transitionQuality === "CAUSALLY_CONTINUOUS" &&
    review.semanticContinuity === "LIFE_JOURNEY_CONTINUOUS" &&
    review.visualCausality === "UPSTREAM_VISUAL_STATE_DRIVES_NEXT_LAYER" &&
    review.revealJourneyState === "PERSONAL_STAR_BEAST_PRESENCE_ARRIVED" &&
    result.boundary.genesisIntegrationOnly === true &&
    result.boundary.visualStatesConsumedAsUpstream === true &&
    result.boundary.identityUntouched === true &&
    result.boundary.userDataUntouched === true &&
    result.boundary.engineResultsUntouched === true &&
    result.boundary.rendererCommandsUntouched === true &&
    result.boundary.realityUntouched === true &&
    result.boundary.gravityUntouched === true &&
    result.boundary.choiceUntouched === true &&
    result.boundary.crystalUntouched === true &&
    result.boundary.storageUntouched === true
  );
};

export function reviewGenesisExperienceRuntime(
  input: GenesisExperienceRuntimeReviewInput,
): GenesisExperienceRuntimeReviewResult {
  const sequenceResult = input.fullSequenceReviewResult;
  if (sequenceResult === null) {
    return unavailable(input, "FULL_SEQUENCE_REVIEW_REQUIRED");
  }
  if (sequenceResult.status === "UNAVAILABLE") {
    return unavailable(input, "FULL_SEQUENCE_REVIEW_UNAVAILABLE");
  }
  if (sequenceResult.status === "BLOCKED") {
    return blocked(input, "FULL_SEQUENCE_REVIEW_BLOCKED");
  }
  if (!hasValidFullSequenceReview(input)) {
    return blocked(input, "EXPERIENCE_TRANSITION_STATE_INVALID");
  }

  const review: GenesisExperienceRuntimeReview = Object.freeze({
    experienceSequence: EXPERIENCE_SEQUENCE,
    transitionState: "CAUSALLY_CONTINUOUS",
    temporalFlow: "SLOW_CONTINUOUS_REVEAL",
    userParticipationPoint: "TIME_DELIVERY_ONLY",
    revealJourneyState: "SEVEN_LAYER_REVEAL_RUNTIME_REVIEW_READY",
    transitions: EXPERIENCE_TRANSITIONS,
    fullSequenceReviewReference: sequenceResult.review,
    runtimeBoundary: RUNTIME_BOUNDARY,
  });

  return Object.freeze({
    status: "READY" as const,
    reviewStatus: "GENESIS_EXPERIENCE_RUNTIME_REVIEW_READY" as const,
    source: "genesis_experience_runtime_review" as const,
    input,
    review,
    runtimeBoundary: RUNTIME_BOUNDARY,
  });
}
