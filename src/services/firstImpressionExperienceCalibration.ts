import type {
  FirstImpressionCalibrationIssue,
  FirstImpressionCalibrationQuality,
  FirstImpressionCalibrationStatus,
  FirstImpressionExperienceCalibration,
  FirstImpressionExperienceCalibrationBlocked,
  FirstImpressionExperienceCalibrationBlockedReason,
  FirstImpressionExperienceCalibrationBoundary,
  FirstImpressionExperienceCalibrationInput,
  FirstImpressionExperienceCalibrationResult,
  FirstImpressionExperienceCalibrationUnavailable,
  FirstImpressionExperienceCalibrationUnavailableReason,
} from "../types/firstImpressionExperienceCalibration";

export const FIRST_IMPRESSION_UPSTREAM_REVIEW_REFERENCES = Object.freeze([
  "P40_FULL_LOOP_ACCEPTANCE",
  "P41_EXPERIENCE_OPTIMIZATION_REVIEW",
  "P43_FULL_LOOP_REVALIDATION",
  "P44_SPATIAL_DISTANCE_CALIBRATION",
  "P45_PRESENCE_CARRY",
  "P46_REALITY_CONTINUITY",
  "P47_REALITY_FULL_EXPERIENCE_ACCEPTANCE",
] as const);

export const FIRST_IMPRESSION_EXPERIENCE_SEQUENCE = Object.freeze([
  "ENTRY",
  "GENESIS",
  "RECOGNITION",
  "REALITY_ENTRY",
  "PRESSURE",
  "GRAVITY",
  "CHOICE",
  "CRYSTAL",
] as const);

export const FIRST_IMPRESSION_EXPERIENCE_CALIBRATION_BOUNDARY: FirstImpressionExperienceCalibrationBoundary =
  Object.freeze({
    calibrationReviewOnly: true,
    manualObservationOnly: true,
    noAutomaticOptimization: true,
    noRuntimeMutation: true,
    noUIMutation: true,
    noVisualStateMutation: true,
    noLifeSystemMutation: true,
    noGenesisMutation: true,
    noRealityMutation: true,
    noEngineMutation: true,
    noStorage: true,
    noArchive: true,
    noUserProfile: true,
    noConversionMetric: true,
    noPayment: true,
    noMarketingFunnel: true,
  });

const unavailable = (
  input: FirstImpressionExperienceCalibrationInput,
  reason: FirstImpressionExperienceCalibrationUnavailableReason,
): FirstImpressionExperienceCalibrationUnavailable =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    reviewStatus: "UNAVAILABLE" as const,
    source: "first_impression_experience_calibration" as const,
    reason,
    input,
    review: null,
    boundary: FIRST_IMPRESSION_EXPERIENCE_CALIBRATION_BOUNDARY,
  });

const blocked = (
  input: FirstImpressionExperienceCalibrationInput,
  reason: FirstImpressionExperienceCalibrationBlockedReason,
): FirstImpressionExperienceCalibrationBlocked =>
  Object.freeze({
    status: "BLOCKED" as const,
    reviewStatus: "BLOCKED" as const,
    source: "first_impression_experience_calibration" as const,
    reason,
    input,
    review: null,
    boundary: FIRST_IMPRESSION_EXPERIENCE_CALIBRATION_BOUNDARY,
  });

const hasExpectedValues = (
  observed: readonly string[],
  expected: readonly string[],
): boolean =>
  observed.length === expected.length &&
  observed.every((value, index) => value === expected[index]);

const qualityFor = (
  entryAtmosphere: string,
  expectationAlignment: string,
  identityDistance: string,
  curiosityState: string,
  firstActionClarity: string,
  issues: readonly FirstImpressionCalibrationIssue[],
): FirstImpressionCalibrationQuality => {
  if (issues.length > 0) return "NEEDS_REVIEW";
  if (
    entryAtmosphere === "COSMIC_LIFE_ENTRY" &&
    expectationAlignment === "LIFE_JOURNEY" &&
    identityDistance === "DISTANT_FROM_TESTING" &&
    curiosityState === "AWAKENED" &&
    firstActionClarity === "TIME_DELIVERY_CLEAR"
  ) {
    return "CALIBRATED";
  }
  if (
    entryAtmosphere === "NOT_REVIEWED" ||
    expectationAlignment === "NOT_REVIEWED" ||
    identityDistance === "NOT_REVIEWED" ||
    curiosityState === "NOT_REVIEWED" ||
    firstActionClarity === "NOT_REVIEWED"
  ) {
    return "PENDING";
  }
  return "NEEDS_REVIEW";
};

const statusFor = (
  overallQuality: FirstImpressionCalibrationQuality,
): FirstImpressionCalibrationStatus => {
  if (overallQuality === "CALIBRATED") return "CALIBRATED";
  if (overallQuality === "NEEDS_REVIEW") return "NEEDS_REVIEW";
  return "PENDING_MANUAL_CALIBRATION";
};

const hasValidBoundary = (): boolean =>
  Object.values(FIRST_IMPRESSION_EXPERIENCE_CALIBRATION_BOUNDARY).every(
    (value) => value === true,
  );

const issueTypesFor = (
  issues: readonly FirstImpressionCalibrationIssue[],
): readonly FirstImpressionCalibrationIssue["issueType"][] =>
  Object.freeze(Array.from(new Set(issues.map((issue) => issue.issueType))));

export function reviewFirstImpressionExperienceCalibration(
  input: FirstImpressionExperienceCalibrationInput,
): FirstImpressionExperienceCalibrationResult {
  if (input.upstreamReviewReferences.length === 0) {
    return unavailable(input, "UPSTREAM_REVIEW_REFERENCES_REQUIRED");
  }
  if (input.observedStages.length === 0) {
    return unavailable(input, "OBSERVED_ENTRY_SEQUENCE_REQUIRED");
  }
  if (
    !hasExpectedValues(
      input.upstreamReviewReferences,
      FIRST_IMPRESSION_UPSTREAM_REVIEW_REFERENCES,
    )
  ) {
    return blocked(input, "UPSTREAM_REVIEW_REFERENCE_INVALID");
  }
  if (
    !hasExpectedValues(input.observedStages, FIRST_IMPRESSION_EXPERIENCE_SEQUENCE)
  ) {
    return blocked(input, "OBSERVED_ENTRY_SEQUENCE_INVALID");
  }
  if (!input.timeDeliveryAvailable) {
    return blocked(input, "TIME_DELIVERY_BOUNDARY_MISSING");
  }
  if (!hasValidBoundary()) {
    return blocked(input, "FIRST_IMPRESSION_CALIBRATION_BOUNDARY_INVALID");
  }

  const entryAtmosphere = input.entryAtmosphere ?? "NOT_REVIEWED";
  const expectationAlignment = input.expectationAlignment ?? "NOT_REVIEWED";
  const identityDistance = input.identityDistance ?? "NOT_REVIEWED";
  const curiosityState = input.curiosityState ?? "NOT_REVIEWED";
  const firstActionClarity = input.firstActionClarity ?? "NOT_REVIEWED";
  const issues = Object.freeze([...(input.issues ?? [])]);
  const overallQuality = qualityFor(
    entryAtmosphere,
    expectationAlignment,
    identityDistance,
    curiosityState,
    firstActionClarity,
    issues,
  );
  const review: FirstImpressionExperienceCalibration = Object.freeze({
    entryAtmosphere,
    expectationAlignment,
    identityDistance,
    curiosityState,
    firstActionClarity,
    journeyReference: FIRST_IMPRESSION_EXPERIENCE_SEQUENCE,
    timeDeliveryBoundary: "TIME_DELIVERY_ONLY",
    overallQuality,
    issues,
    issueTypes: issueTypesFor(issues),
    noTestFlow: true,
    noCommercialFlow: true,
  });

  return Object.freeze({
    status: "READY" as const,
    reviewStatus: statusFor(overallQuality),
    source: "first_impression_experience_calibration" as const,
    input,
    review,
    boundary: FIRST_IMPRESSION_EXPERIENCE_CALIBRATION_BOUNDARY,
  });
}
