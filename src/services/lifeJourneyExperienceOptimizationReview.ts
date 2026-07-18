import type {
  LifeJourneyExperienceOptimizationReview,
  LifeJourneyExperienceOptimizationReviewBlocked,
  LifeJourneyExperienceOptimizationReviewBlockedReason,
  LifeJourneyExperienceOptimizationReviewBoundary,
  LifeJourneyExperienceOptimizationReviewInput,
  LifeJourneyExperienceOptimizationReviewResult,
  LifeJourneyExperienceOptimizationReviewState,
  LifeJourneyExperienceOptimizationReviewUnavailable,
  LifeJourneyExperienceOptimizationReviewUnavailableReason,
} from "../types/lifeJourneyExperienceOptimizationReview";

export const LIFE_JOURNEY_OPTIMIZATION_SEQUENCE = Object.freeze([
  "ENTRY",
  "GENESIS",
  "RECOGNITION",
  "REALITY_ENTRY",
  "PRESSURE",
  "GRAVITY",
  "CHOICE",
  "CRYSTAL",
  "JOURNEY_COMPLETE",
] as const);

export const LIFE_JOURNEY_OPTIMIZATION_PRIORITY = Object.freeze([
  "SEMANTIC_CONSISTENCY",
  "LIFE_EXPERIENCE_CONTINUITY",
  "VISUAL_EXPRESSION",
  "INTERACTION_DETAIL",
  "ENGINEERING_OPTIMIZATION",
] as const);

export const LIFE_JOURNEY_EXPERIENCE_OPTIMIZATION_REVIEW_BOUNDARY: LifeJourneyExperienceOptimizationReviewBoundary =
  Object.freeze({
    reviewOnly: true,
    manualObservationOnly: true,
    noAutomaticOptimization: true,
    noUserProfile: true,
    noDataAnalysis: true,
    noCommercialMetrics: true,
    noRuntimeMutation: true,
    noUIMutation: true,
    noVisualStateMutation: true,
    noEngineMutation: true,
    noStorage: true,
    noArchive: true,
  });

const unavailable = (
  input: LifeJourneyExperienceOptimizationReviewInput,
  reason: LifeJourneyExperienceOptimizationReviewUnavailableReason,
): LifeJourneyExperienceOptimizationReviewUnavailable =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    reviewStatus: "UNAVAILABLE" as const,
    source: "life_journey_experience_optimization_review" as const,
    reason,
    input,
    review: null,
    boundary: LIFE_JOURNEY_EXPERIENCE_OPTIMIZATION_REVIEW_BOUNDARY,
  });

const blocked = (
  input: LifeJourneyExperienceOptimizationReviewInput,
  reason: LifeJourneyExperienceOptimizationReviewBlockedReason,
): LifeJourneyExperienceOptimizationReviewBlocked =>
  Object.freeze({
    status: "BLOCKED" as const,
    reviewStatus: "BLOCKED" as const,
    source: "life_journey_experience_optimization_review" as const,
    reason,
    input,
    review: null,
    boundary: LIFE_JOURNEY_EXPERIENCE_OPTIMIZATION_REVIEW_BOUNDARY,
  });

const hasValidBoundary = (): boolean =>
  Object.values(LIFE_JOURNEY_EXPERIENCE_OPTIMIZATION_REVIEW_BOUNDARY).every(
    (value) => value === true,
  );

const hasCompleteP40Acceptance = (
  input: LifeJourneyExperienceOptimizationReviewInput,
): boolean => {
  const result = input.fullLoopAcceptance;
  return (
    result !== null &&
    result.status === "READY" &&
    result.review.journeyIntegrity === "PASS" &&
    result.review.journeyCompleteReachable === true &&
    result.review.sequence.every(
      (stage, index) => stage === LIFE_JOURNEY_OPTIMIZATION_SEQUENCE[index],
    )
  );
};

export function reviewLifeJourneyExperienceOptimization(
  input: LifeJourneyExperienceOptimizationReviewInput,
): LifeJourneyExperienceOptimizationReviewResult {
  if (input.fullLoopAcceptance === null) {
    return unavailable(input, "FULL_LOOP_ACCEPTANCE_REQUIRED");
  }
  if (input.fullLoopAcceptance.status === "UNAVAILABLE") {
    return blocked(input, "FULL_LOOP_ACCEPTANCE_UNAVAILABLE");
  }
  if (input.fullLoopAcceptance.status === "BLOCKED") {
    return blocked(input, "FULL_LOOP_ACCEPTANCE_BLOCKED");
  }
  if (!hasCompleteP40Acceptance(input)) {
    return blocked(input, "FULL_LOOP_SEQUENCE_INVALID");
  }
  if (!hasValidBoundary()) {
    return blocked(input, "OPTIMIZATION_REVIEW_BOUNDARY_INVALID");
  }

  const review: LifeJourneyExperienceOptimizationReviewState = Object.freeze({
    firstEntryExperience: input.firstEntryExperience ?? "PENDING",
    genesisExperienceQuality: input.genesisExperienceQuality ?? "PENDING",
    recognitionExperienceQuality:
      input.recognitionExperienceQuality ?? "PENDING",
    realityTransitionQuality: input.realityTransitionQuality ?? "PENDING",
    agencyExperienceQuality: input.agencyExperienceQuality ?? "PENDING",
    crystalExperienceQuality: input.crystalExperienceQuality ?? "PENDING",
    optimizationIssues: Object.freeze([...(input.optimizationIssues ?? [])]),
    sequenceReference: LIFE_JOURNEY_OPTIMIZATION_SEQUENCE,
    optimizationPriority: LIFE_JOURNEY_OPTIMIZATION_PRIORITY,
    automaticOptimizationConclusion: false,
  });

  const result: LifeJourneyExperienceOptimizationReview = {
    firstEntryExperience: review.firstEntryExperience,
    genesisExperienceQuality: review.genesisExperienceQuality,
    recognitionExperienceQuality: review.recognitionExperienceQuality,
    realityTransitionQuality: review.realityTransitionQuality,
    agencyExperienceQuality: review.agencyExperienceQuality,
    crystalExperienceQuality: review.crystalExperienceQuality,
    optimizationIssues: review.optimizationIssues,
    sequenceReference: review.sequenceReference,
    optimizationPriority: review.optimizationPriority,
    automaticOptimizationConclusion: review.automaticOptimizationConclusion,
  };

  return Object.freeze({
    status: "READY" as const,
    reviewStatus: "PENDING_MANUAL_REVIEW" as const,
    source: "life_journey_experience_optimization_review" as const,
    input,
    review: result,
    boundary: LIFE_JOURNEY_EXPERIENCE_OPTIMIZATION_REVIEW_BOUNDARY,
  });
}
