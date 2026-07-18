import type {
  LifeJourneyFullLoopAcceptance,
  LifeJourneyFullLoopAcceptanceBlockedReason,
  LifeJourneyFullLoopAcceptanceBoundary,
  LifeJourneyFullLoopAcceptanceInput,
  LifeJourneyFullLoopAcceptanceResult,
  LifeJourneyFullLoopAcceptanceReview,
  LifeJourneyFullLoopAcceptanceUnavailableReason,
} from "../types/lifeJourneyFullLoopAcceptance";

export const LIFE_JOURNEY_FULL_LOOP_SEQUENCE = Object.freeze([
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

export const LIFE_JOURNEY_FULL_LOOP_ACTIONS = Object.freeze([
  "TIME_DELIVERY",
  "CHOICE_ACTIVE_RESPONSE",
  "CRYSTAL_RECOGNITION_CONFIRM",
] as const);

export const LIFE_JOURNEY_FULL_LOOP_ACCEPTANCE_BOUNDARY: LifeJourneyFullLoopAcceptanceBoundary =
  Object.freeze({
    acceptanceReviewOnly: true,
    noUserData: true,
    noStorageRecord: true,
    noEngineResult: true,
    noProductMetrics: true,
    noRuntimeMutation: true,
    noUIMutation: true,
    noVisualStateMutation: true,
    noGenesisMutation: true,
    noRealityMutation: true,
    noCrystalMutation: true,
    noProductionIntegration: true,
  });

const unavailable = (
  input: LifeJourneyFullLoopAcceptanceInput,
  reason: LifeJourneyFullLoopAcceptanceUnavailableReason,
): LifeJourneyFullLoopAcceptanceResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    reviewStatus: "UNAVAILABLE" as const,
    source: "life_journey_full_loop_acceptance" as const,
    reason,
    input,
    review: null,
    boundary: LIFE_JOURNEY_FULL_LOOP_ACCEPTANCE_BOUNDARY,
  });

const blocked = (
  input: LifeJourneyFullLoopAcceptanceInput,
  reason: LifeJourneyFullLoopAcceptanceBlockedReason,
): LifeJourneyFullLoopAcceptanceResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    reviewStatus: "BLOCKED" as const,
    source: "life_journey_full_loop_acceptance" as const,
    reason,
    input,
    review: null,
    boundary: LIFE_JOURNEY_FULL_LOOP_ACCEPTANCE_BOUNDARY,
  });

const hasExpectedValues = (
  observed: readonly string[],
  expected: readonly string[],
): boolean =>
  observed.length === expected.length &&
  observed.every((value, index) => value === expected[index]);

const hasValidBoundary = (): boolean =>
  Object.values(LIFE_JOURNEY_FULL_LOOP_ACCEPTANCE_BOUNDARY).every(
    (value) => value === true,
  );

export function reviewLifeJourneyFullLoop(
  input: LifeJourneyFullLoopAcceptanceInput,
): LifeJourneyFullLoopAcceptanceResult {
  if (input.observedStages.length === 0) {
    return unavailable(input, "OBSERVED_SEQUENCE_REQUIRED");
  }
  if (input.observedActions.length === 0) {
    return unavailable(input, "OBSERVED_ACTIONS_REQUIRED");
  }
  if (!hasExpectedValues(input.observedStages, LIFE_JOURNEY_FULL_LOOP_SEQUENCE)) {
    return blocked(input, "FULL_LOOP_SEQUENCE_INVALID");
  }
  if (input.observedStages[input.observedStages.length - 1] !== "JOURNEY_COMPLETE") {
    return blocked(input, "JOURNEY_COMPLETE_NOT_REACHABLE");
  }
  if (!hasExpectedValues(input.observedActions, LIFE_JOURNEY_FULL_LOOP_ACTIONS)) {
    return blocked(input, "USER_ACTION_SEQUENCE_INVALID");
  }
  if (!hasValidBoundary()) {
    return blocked(input, "FULL_LOOP_ACCEPTANCE_BOUNDARY_INVALID");
  }

  const review: LifeJourneyFullLoopAcceptanceReview = Object.freeze({
    entryExperience: input.entryExperience ?? "PENDING",
    genesisContinuity: input.genesisContinuity ?? "PENDING",
    recognitionExperience: input.recognitionExperience ?? "PENDING",
    realityTransition: input.realityTransition ?? "PENDING",
    transformationFlow: input.transformationFlow ?? "PENDING",
    crystalCompletion: input.crystalCompletion ?? "PENDING",
    journeyIntegrity: "PASS",
    sequence: LIFE_JOURNEY_FULL_LOOP_SEQUENCE,
    actions: LIFE_JOURNEY_FULL_LOOP_ACTIONS,
    journeyCompleteReachable: true,
    issueCategories: Object.freeze([...(input.issueCategories ?? [])]),
  });

  const result: LifeJourneyFullLoopAcceptance = {
    entryExperience: review.entryExperience,
    genesisContinuity: review.genesisContinuity,
    recognitionExperience: review.recognitionExperience,
    realityTransition: review.realityTransition,
    transformationFlow: review.transformationFlow,
    crystalCompletion: review.crystalCompletion,
    journeyIntegrity: review.journeyIntegrity,
    sequence: review.sequence,
    actions: review.actions,
    journeyCompleteReachable: review.journeyCompleteReachable,
    issueCategories: review.issueCategories,
  };

  return Object.freeze({
    status: "READY" as const,
    reviewStatus: "PENDING_HUMAN_REVIEW" as const,
    source: "life_journey_full_loop_acceptance" as const,
    input,
    review: result,
    boundary: LIFE_JOURNEY_FULL_LOOP_ACCEPTANCE_BOUNDARY,
  });
}
