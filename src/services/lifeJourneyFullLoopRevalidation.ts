import type {
  LifeJourneyFullLoopRevalidation,
  LifeJourneyFullLoopRevalidationBlocked,
  LifeJourneyFullLoopRevalidationBlockedReason,
  LifeJourneyFullLoopRevalidationBoundary,
  LifeJourneyFullLoopRevalidationDimension,
  LifeJourneyFullLoopRevalidationInput,
  LifeJourneyFullLoopRevalidationResult,
  LifeJourneyFullLoopRevalidationReview,
  LifeJourneyFullLoopRevalidationUnavailable,
  LifeJourneyFullLoopRevalidationUnavailableReason,
} from "../types/lifeJourneyFullLoopRevalidation";

export const LIFE_JOURNEY_FULL_LOOP_REVALIDATION_SEQUENCE = Object.freeze([
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

export const LIFE_JOURNEY_FULL_LOOP_REVALIDATION_ACTIONS = Object.freeze([
  "TIME_DELIVERY",
  "CHOICE_ACTIVE_RESPONSE",
  "CRYSTAL_RECOGNITION_CONFIRM",
] as const);

export const LIFE_JOURNEY_FULL_LOOP_REVALIDATION_BOUNDARY: LifeJourneyFullLoopRevalidationBoundary =
  Object.freeze({
    revalidationReviewOnly: true,
    manualObservationOnly: true,
    noAutomaticRepair: true,
    noRuntimeMutation: true,
    noUIMutation: true,
    noVisualStateMutation: true,
    noGenesisMutation: true,
    noRealityMutation: true,
    noCrystalMutation: true,
    noUserData: true,
    noProductMetrics: true,
    noStorageData: true,
    noEngineResult: true,
    noProductionIntegration: true,
  });

const unavailable = (
  input: LifeJourneyFullLoopRevalidationInput,
  reason: LifeJourneyFullLoopRevalidationUnavailableReason,
): LifeJourneyFullLoopRevalidationUnavailable =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    reviewStatus: "UNAVAILABLE" as const,
    source: "life_journey_full_loop_revalidation" as const,
    reason,
    input,
    review: null,
    boundary: LIFE_JOURNEY_FULL_LOOP_REVALIDATION_BOUNDARY,
  });

const blocked = (
  input: LifeJourneyFullLoopRevalidationInput,
  reason: LifeJourneyFullLoopRevalidationBlockedReason,
): LifeJourneyFullLoopRevalidationBlocked =>
  Object.freeze({
    status: "BLOCKED" as const,
    reviewStatus: "BLOCKED" as const,
    source: "life_journey_full_loop_revalidation" as const,
    reason,
    input,
    review: null,
    boundary: LIFE_JOURNEY_FULL_LOOP_REVALIDATION_BOUNDARY,
  });

const hasExpectedValues = (
  observed: readonly string[],
  expected: readonly string[],
): boolean =>
  observed.length === expected.length &&
  observed.every((value, index) => value === expected[index]);

const hasValidBoundary = (): boolean =>
  Object.values(LIFE_JOURNEY_FULL_LOOP_REVALIDATION_BOUNDARY).every(
    (value) => value === true,
  );

const dimension = (
  value: LifeJourneyFullLoopRevalidationDimension | undefined,
): LifeJourneyFullLoopRevalidationDimension => value ?? "PENDING";

const hasCompleteP40Acceptance = (
  input: LifeJourneyFullLoopRevalidationInput,
): boolean => {
  const acceptance = input.fullLoopAcceptance;
  return (
    acceptance !== null &&
    acceptance.status === "READY" &&
    acceptance.review.journeyIntegrity === "PASS" &&
    acceptance.review.journeyCompleteReachable === true &&
    hasExpectedValues(
      acceptance.review.sequence,
      LIFE_JOURNEY_FULL_LOOP_REVALIDATION_SEQUENCE,
    )
  );
};

const hasContinuousP42Bridge = (
  input: LifeJourneyFullLoopRevalidationInput,
): boolean => {
  const bridgeResult = input.bridgeFix;
  return (
    bridgeResult !== null &&
    bridgeResult.status === "READY" &&
    bridgeResult.bridge.bridgeState === "BRIDGE_READY" &&
    bridgeResult.bridge.bridgeIntegrity === "CONTINUOUS" &&
    bridgeResult.bridge.realityEntryState === "REALITY_ENTRY_READY" &&
    bridgeResult.bridge.pressureReadiness === "PRESSURE_READY"
  );
};

export function reviewLifeJourneyFullLoopRevalidation(
  input: LifeJourneyFullLoopRevalidationInput,
): LifeJourneyFullLoopRevalidationResult {
  if (input.fullLoopAcceptance === null) {
    return unavailable(input, "FULL_LOOP_ACCEPTANCE_REQUIRED");
  }
  if (input.bridgeFix === null) {
    return unavailable(input, "BRIDGE_FIX_REQUIRED");
  }
  if (input.fullLoopAcceptance.status === "UNAVAILABLE") {
    return blocked(input, "FULL_LOOP_ACCEPTANCE_UNAVAILABLE");
  }
  if (input.fullLoopAcceptance.status === "BLOCKED") {
    return blocked(input, "FULL_LOOP_ACCEPTANCE_BLOCKED");
  }
  if (input.bridgeFix.status === "UNAVAILABLE") {
    return blocked(input, "BRIDGE_FIX_UNAVAILABLE");
  }
  if (input.bridgeFix.status === "BLOCKED") {
    return blocked(input, "BRIDGE_FIX_BLOCKED");
  }
  if (
    !hasExpectedValues(
      input.observedStages,
      LIFE_JOURNEY_FULL_LOOP_REVALIDATION_SEQUENCE,
    )
  ) {
    return blocked(input, "FULL_LOOP_SEQUENCE_INVALID");
  }
  if (
    !hasExpectedValues(
      input.observedActions,
      LIFE_JOURNEY_FULL_LOOP_REVALIDATION_ACTIONS,
    )
  ) {
    return blocked(input, "USER_ACTION_SEQUENCE_INVALID");
  }
  if (!hasContinuousP42Bridge(input)) {
    return blocked(input, "P42_BRIDGE_NOT_CONTINUOUS");
  }
  if (!hasValidBoundary()) {
    return blocked(input, "REVALIDATION_BOUNDARY_INVALID");
  }

  const reviewDimensions = Object.freeze({
    genesisContinuity: dimension(input.genesisContinuity),
    recognitionContinuity: dimension(input.recognitionContinuity),
    realityEntryContinuity: dimension(input.realityEntryContinuity),
    pressureExperienceState: dimension(input.pressureExperienceState),
    gravityExperienceState: dimension(input.gravityExperienceState),
    choiceAgencyState: dimension(input.choiceAgencyState),
    crystalCompletionState: dimension(input.crystalCompletionState),
  });
  const overallJourneyState = Object.values(reviewDimensions).every(
    (value) => value === "PASS",
  )
    ? "PASS"
    : "NEEDS_REVIEW";
  const revalidationIssues = Object.freeze([...(input.revalidationIssues ?? [])]);
  const issueTypes = Object.freeze(
    Array.from(new Set(revalidationIssues.map((issue) => issue.issueType))),
  );
  const review: LifeJourneyFullLoopRevalidationReview = Object.freeze({
    ...reviewDimensions,
    overallJourneyState,
    sequence: LIFE_JOURNEY_FULL_LOOP_REVALIDATION_SEQUENCE,
    actions: LIFE_JOURNEY_FULL_LOOP_REVALIDATION_ACTIONS,
    bridgeState: "BRIDGE_READY",
    bridgeIntegrity: "CONTINUOUS",
    noGenesisReset: true,
    noPrematureRealityEntry: true,
    journeyCompleteReachable: true,
    revalidationIssues,
    issueTypes,
  });
  const result: LifeJourneyFullLoopRevalidation = {
    ...review,
  };

  return Object.freeze({
    status: "READY" as const,
    reviewStatus:
      overallJourneyState === "PASS"
        ? ("REVALIDATED" as const)
        : ("PENDING_HUMAN_REVALIDATION" as const),
    source: "life_journey_full_loop_revalidation" as const,
    input,
    review: result,
    boundary: LIFE_JOURNEY_FULL_LOOP_REVALIDATION_BOUNDARY,
  });
}
