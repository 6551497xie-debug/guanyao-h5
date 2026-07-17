import type {
  GenesisCompletionMomentReview,
  GenesisCompletionMomentReviewBlockedReason,
  GenesisCompletionMomentReviewInput,
  GenesisCompletionMomentReviewResult,
  GenesisCompletionMomentReviewUnavailableReason,
  GenesisCompletionRuntimeBoundary,
} from "../types/genesisCompletionMomentReview";

const COMPLETION_BOUNDARY: GenesisCompletionRuntimeBoundary = Object.freeze({
  completionReviewOnly: true,
  genesisLayerOnly: true,
  realityEntryBoundaryHeld: true,
  noRealityCalculation: true,
  noPressureAnalysis: true,
  noGravity: true,
  noChoice: true,
  noCrystal: true,
  noStorage: true,
  noUserProfile: true,
  noIdentityMutation: true,
  noEngineInvocation: true,
  noRendererInvocation: true,
  noUiFlowMutation: true,
  noVisualStateMutation: true,
  noNewGenesisLayer: true,
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
  input: GenesisCompletionMomentReviewInput,
  reason: GenesisCompletionMomentReviewUnavailableReason,
): GenesisCompletionMomentReviewResult => Object.freeze({
  status: "UNAVAILABLE" as const,
  reviewStatus: "UNAVAILABLE" as const,
  source: "genesis_completion_moment_review" as const,
  reason,
  input,
  review: null,
  runtimeBoundary: COMPLETION_BOUNDARY,
});

const blocked = (
  input: GenesisCompletionMomentReviewInput,
  reason: GenesisCompletionMomentReviewBlockedReason,
): GenesisCompletionMomentReviewResult => Object.freeze({
  status: "BLOCKED" as const,
  reviewStatus: "BLOCKED" as const,
  source: "genesis_completion_moment_review" as const,
  reason,
  input,
  review: null,
  runtimeBoundary: COMPLETION_BOUNDARY,
});

const hasSequence = (values: readonly string[], expected: readonly string[]): boolean =>
  values.length === expected.length && values.every((value, index) => value === expected[index]);

const hasValidRuntimeReview = (
  input: GenesisCompletionMomentReviewInput,
): boolean => {
  const runtimeResult = input.experienceRuntimeReviewResult;
  if (runtimeResult === null || runtimeResult.status !== "READY") return false;
  const runtimeReview = runtimeResult.review;
  return (
    hasSequence(runtimeReview.experienceSequence, EXPERIENCE_SEQUENCE) &&
    hasSequence(runtimeReview.transitions, EXPERIENCE_TRANSITIONS) &&
    runtimeReview.transitionState === "CAUSALLY_CONTINUOUS" &&
    runtimeReview.temporalFlow === "SLOW_CONTINUOUS_REVEAL" &&
    runtimeReview.userParticipationPoint === "TIME_DELIVERY_ONLY" &&
    runtimeReview.revealJourneyState === "SEVEN_LAYER_REVEAL_RUNTIME_REVIEW_READY" &&
    runtimeResult.runtimeBoundary.reviewOnly === true &&
    runtimeResult.runtimeBoundary.noFormalRuntimeIntegration === true &&
    runtimeResult.runtimeBoundary.noRealityPressure === true &&
    runtimeResult.runtimeBoundary.noGravity === true &&
    runtimeResult.runtimeBoundary.noChoice === true &&
    runtimeResult.runtimeBoundary.noCrystal === true &&
    runtimeResult.runtimeBoundary.noStorageState === true
  );
};

export function reviewGenesisCompletionMoment(
  input: GenesisCompletionMomentReviewInput,
): GenesisCompletionMomentReviewResult {
  const runtimeResult = input.experienceRuntimeReviewResult;
  if (runtimeResult === null) {
    return unavailable(input, "EXPERIENCE_RUNTIME_REVIEW_REQUIRED");
  }
  if (runtimeResult.status === "UNAVAILABLE") {
    return unavailable(input, "EXPERIENCE_RUNTIME_REVIEW_UNAVAILABLE");
  }
  if (runtimeResult.status === "BLOCKED") {
    return blocked(input, "EXPERIENCE_RUNTIME_REVIEW_BLOCKED");
  }
  if (!hasValidRuntimeReview(input)) {
    return blocked(input, "GENESIS_RUNTIME_SEQUENCE_INVALID");
  }

  const review: GenesisCompletionMomentReview = Object.freeze({
    completionState: "GENESIS_PRESENCE_STABILIZED",
    recognitionMoment: "PERSONAL_STAR_BEAST_RECOGNITION_OPEN",
    presenceStability: "QUIET_PRESENCE_STABLE",
    transitionReadiness: "REALITY_ENTRY_REVIEW_PENDING",
    emotionalClosure: "GENESIS_CLOSURE_OPEN_NOT_FINAL",
    genesisToRealityBoundary: "GENESIS_TO_REALITY_BOUNDARY_HELD",
    experienceRuntimeReviewReference: runtimeResult,
    runtimeBoundary: COMPLETION_BOUNDARY,
  });

  return Object.freeze({
    status: "READY" as const,
    reviewStatus: "GENESIS_COMPLETION_MOMENT_REVIEW_READY" as const,
    source: "genesis_completion_moment_review" as const,
    input,
    review,
    runtimeBoundary: COMPLETION_BOUNDARY,
  });
}
