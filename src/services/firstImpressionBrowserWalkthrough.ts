import type {
  FirstImpressionBrowserWalkthrough,
  FirstImpressionBrowserWalkthroughBlocked,
  FirstImpressionBrowserWalkthroughBlockedReason,
  FirstImpressionBrowserWalkthroughInput,
  FirstImpressionBrowserWalkthroughResult,
  FirstImpressionBrowserWalkthroughUnavailable,
  FirstImpressionBrowserWalkthroughUnavailableReason,
  FirstImpressionWalkthroughBoundary,
  FirstImpressionWalkthroughIssue,
  FirstImpressionWalkthroughStatus,
} from "../types/firstImpressionBrowserWalkthrough";

export const FIRST_IMPRESSION_WALKTHROUGH_UPSTREAM_REFERENCES = Object.freeze([
  "P40_FULL_LOOP_ACCEPTANCE",
  "P41_EXPERIENCE_OPTIMIZATION_REVIEW",
  "P43_FULL_LOOP_REVALIDATION",
  "P44_SPATIAL_DISTANCE_CALIBRATION",
  "P45_PRESENCE_CARRY",
  "P46_REALITY_CONTINUITY",
  "P47_REALITY_FULL_EXPERIENCE_ACCEPTANCE",
  "P48_FIRST_IMPRESSION_CALIBRATION",
  "P49_RELEASE_GATE_ALIGNMENT",
] as const);

export const FIRST_IMPRESSION_BROWSER_WALKTHROUGH_SEQUENCE = Object.freeze([
  "ENTRY",
  "GENESIS",
  "RECOGNITION",
  "REALITY_ENTRY",
  "PRESSURE_READY",
] as const);

export const FIRST_IMPRESSION_BROWSER_WALKTHROUGH_BOUNDARY: FirstImpressionWalkthroughBoundary =
  Object.freeze({
    walkthroughReviewOnly: true,
    manualObservationOnly: true,
    noAutomaticRepair: true,
    noRuntimeMutation: true,
    noUIMutation: true,
    noVisualStateMutation: true,
    noGenesisMutation: true,
    noRealityMutation: true,
    noEngineMutation: true,
    noStorage: true,
    noArchive: true,
    noUserProfile: true,
    noProductMetrics: true,
    noCommercialFlow: true,
  });

const unavailable = (
  input: FirstImpressionBrowserWalkthroughInput,
  reason: FirstImpressionBrowserWalkthroughUnavailableReason,
): FirstImpressionBrowserWalkthroughUnavailable =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    reviewStatus: "UNAVAILABLE" as const,
    source: "first_impression_browser_walkthrough" as const,
    reason,
    input,
    review: null,
    boundary: FIRST_IMPRESSION_BROWSER_WALKTHROUGH_BOUNDARY,
  });

const blocked = (
  input: FirstImpressionBrowserWalkthroughInput,
  reason: FirstImpressionBrowserWalkthroughBlockedReason,
): FirstImpressionBrowserWalkthroughBlocked =>
  Object.freeze({
    status: "BLOCKED" as const,
    reviewStatus: "BLOCKED" as const,
    source: "first_impression_browser_walkthrough" as const,
    reason,
    input,
    review: null,
    boundary: FIRST_IMPRESSION_BROWSER_WALKTHROUGH_BOUNDARY,
  });

const hasExpectedValues = (
  observed: readonly string[],
  expected: readonly string[],
): boolean =>
  observed.length === expected.length &&
  observed.every((value, index) => value === expected[index]);

const dimensionStatus = (
  entryFirstView: string,
  genesisJourneyFeeling: string,
  timeDeliveryClarity: string,
  recognitionFeeling: string,
  realityTransitionFeeling: string,
  issues: readonly FirstImpressionWalkthroughIssue[],
): FirstImpressionWalkthroughStatus => {
  if (issues.length > 0) return "NEEDS_REVIEW";
  if (
    entryFirstView === "LIFE_OBSERVATION_SPACE" &&
    genesisJourneyFeeling === "COSMIC_LIFE_JOURNEY" &&
    timeDeliveryClarity === "LIFE_TIME_DELIVERY" &&
    recognitionFeeling === "LIFE_RECOGNITION" &&
    realityTransitionFeeling === "PRESENCE_CARRIES_INTO_REALITY"
  ) {
    return "WALKTHROUGH_COMPLETE";
  }
  if (
    entryFirstView === "NOT_REVIEWED" ||
    genesisJourneyFeeling === "NOT_REVIEWED" ||
    timeDeliveryClarity === "NOT_REVIEWED" ||
    recognitionFeeling === "NOT_REVIEWED" ||
    realityTransitionFeeling === "NOT_REVIEWED"
  ) {
    return "PENDING_HUMAN_WALKTHROUGH";
  }
  return "NEEDS_REVIEW";
};

const hasValidBoundary = (): boolean =>
  Object.values(FIRST_IMPRESSION_BROWSER_WALKTHROUGH_BOUNDARY).every(
    (value) => value === true,
  );

export function reviewFirstImpressionBrowserWalkthrough(
  input: FirstImpressionBrowserWalkthroughInput,
): FirstImpressionBrowserWalkthroughResult {
  if (input.upstreamReferences.length === 0) {
    return unavailable(input, "UPSTREAM_REFERENCES_REQUIRED");
  }
  if (input.observedStages.length === 0) {
    return unavailable(input, "OBSERVED_STAGES_REQUIRED");
  }
  if (
    !hasExpectedValues(
      input.upstreamReferences,
      FIRST_IMPRESSION_WALKTHROUGH_UPSTREAM_REFERENCES,
    )
  ) {
    return blocked(input, "UPSTREAM_REFERENCE_INVALID");
  }
  if (
    !hasExpectedValues(
      input.observedStages,
      FIRST_IMPRESSION_BROWSER_WALKTHROUGH_SEQUENCE,
    )
  ) {
    return blocked(input, "OBSERVED_SEQUENCE_INVALID");
  }
  if (!hasValidBoundary()) {
    return blocked(input, "WALKTHROUGH_BOUNDARY_INVALID");
  }

  const entryFirstView = input.entryFirstView ?? "NOT_REVIEWED";
  const genesisJourneyFeeling =
    input.genesisJourneyFeeling ?? "NOT_REVIEWED";
  const timeDeliveryClarity =
    input.timeDeliveryClarity ?? "NOT_REVIEWED";
  const recognitionFeeling = input.recognitionFeeling ?? "NOT_REVIEWED";
  const realityTransitionFeeling =
    input.realityTransitionFeeling ?? "NOT_REVIEWED";
  const blockingIssues = Object.freeze([...(input.blockingIssues ?? [])]);
  const issueTypes = Object.freeze(
    Array.from(new Set(blockingIssues.map((issue) => issue.issueType))),
  );
  const reviewStatus = dimensionStatus(
    entryFirstView,
    genesisJourneyFeeling,
    timeDeliveryClarity,
    recognitionFeeling,
    realityTransitionFeeling,
    blockingIssues,
  );
  const review: FirstImpressionBrowserWalkthrough = Object.freeze({
    entryFirstView,
    genesisJourneyFeeling,
    timeDeliveryClarity,
    recognitionFeeling,
    realityTransitionFeeling,
    blockingIssues,
    issueTypes,
    journeyReference: FIRST_IMPRESSION_BROWSER_WALKTHROUGH_SEQUENCE,
    noAutomaticRepair: true,
    noRuntimeMutation: true,
    noProductMetrics: true,
  });

  return Object.freeze({
    status: "READY" as const,
    reviewStatus,
    source: "first_impression_browser_walkthrough" as const,
    input,
    review,
    boundary: FIRST_IMPRESSION_BROWSER_WALKTHROUGH_BOUNDARY,
  });
}
