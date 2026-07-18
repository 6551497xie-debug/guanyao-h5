export type FirstImpressionAtmosphere =
  | "COSMIC_LIFE_ENTRY"
  | "TOOL_LIKE"
  | "NOT_REVIEWED";

export type FirstImpressionExpectationAlignment =
  | "LIFE_JOURNEY"
  | "TEST_ORIENTED"
  | "UNALIGNED"
  | "NOT_REVIEWED";

export type FirstImpressionIdentityDistance =
  | "DISTANT_FROM_TESTING"
  | "TESTING_PRESENT"
  | "NOT_REVIEWED";

export type FirstImpressionCuriosityState =
  | "AWAKENED"
  | "QUIET"
  | "NOT_REVIEWED";

export type FirstImpressionFirstActionClarity =
  | "TIME_DELIVERY_CLEAR"
  | "TIME_DELIVERY_UNCLEAR"
  | "NOT_REVIEWED";

export type FirstImpressionCalibrationQuality =
  | "PENDING"
  | "CALIBRATED"
  | "NEEDS_REVIEW";

export type FirstImpressionCalibrationStatus =
  | "PENDING_MANUAL_CALIBRATION"
  | "CALIBRATED"
  | "NEEDS_REVIEW";

export type FirstImpressionStage = "ENTRY" | "GENESIS" | "TIME_DELIVERY";

export type FirstImpressionUpstreamReviewReference =
  | "P40_FULL_LOOP_ACCEPTANCE"
  | "P41_EXPERIENCE_OPTIMIZATION_REVIEW"
  | "P43_FULL_LOOP_REVALIDATION"
  | "P44_SPATIAL_DISTANCE_CALIBRATION"
  | "P45_PRESENCE_CARRY"
  | "P46_REALITY_CONTINUITY"
  | "P47_REALITY_FULL_EXPERIENCE_ACCEPTANCE";

export type FirstImpressionJourneyStage =
  | "ENTRY"
  | "GENESIS"
  | "RECOGNITION"
  | "REALITY_ENTRY"
  | "PRESSURE"
  | "GRAVITY"
  | "CHOICE"
  | "CRYSTAL";

export type FirstImpressionIssueType =
  | "TEST_PERCEPTION_DRIFT"
  | "ENTRY_MEANING_WEAK"
  | "FIRST_ACTION_UNCLEAR"
  | "COSMIC_SCALE_WEAK"
  | "LIFE_JOURNEY_UNDERSTANDING_WEAK";

export type FirstImpressionCalibrationIssue = Readonly<{
  stage: FirstImpressionStage;
  issueType: FirstImpressionIssueType;
  observation: string;
  manualCalibrationNote: string;
}>;

export type FirstImpressionExperienceCalibrationBoundary = Readonly<{
  calibrationReviewOnly: true;
  manualObservationOnly: true;
  noAutomaticOptimization: true;
  noRuntimeMutation: true;
  noUIMutation: true;
  noVisualStateMutation: true;
  noLifeSystemMutation: true;
  noGenesisMutation: true;
  noRealityMutation: true;
  noEngineMutation: true;
  noStorage: true;
  noArchive: true;
  noUserProfile: true;
  noConversionMetric: true;
  noPayment: true;
  noMarketingFunnel: true;
}>;

export type FirstImpressionExperienceCalibrationInput = Readonly<{
  upstreamReviewReferences: readonly FirstImpressionUpstreamReviewReference[];
  observedStages: readonly FirstImpressionJourneyStage[];
  timeDeliveryAvailable: boolean;
  entryAtmosphere?: FirstImpressionAtmosphere;
  expectationAlignment?: FirstImpressionExpectationAlignment;
  identityDistance?: FirstImpressionIdentityDistance;
  curiosityState?: FirstImpressionCuriosityState;
  firstActionClarity?: FirstImpressionFirstActionClarity;
  issues?: readonly FirstImpressionCalibrationIssue[];
}>;

export type FirstImpressionExperienceCalibrationReview = Readonly<{
  entryAtmosphere: FirstImpressionAtmosphere;
  expectationAlignment: FirstImpressionExpectationAlignment;
  identityDistance: FirstImpressionIdentityDistance;
  curiosityState: FirstImpressionCuriosityState;
  firstActionClarity: FirstImpressionFirstActionClarity;
  journeyReference: readonly [
    "ENTRY",
    "GENESIS",
    "RECOGNITION",
    "REALITY_ENTRY",
    "PRESSURE",
    "GRAVITY",
    "CHOICE",
    "CRYSTAL",
  ];
  timeDeliveryBoundary: "TIME_DELIVERY_ONLY";
  overallQuality: FirstImpressionCalibrationQuality;
  issues: readonly FirstImpressionCalibrationIssue[];
  issueTypes: readonly FirstImpressionIssueType[];
  noTestFlow: true;
  noCommercialFlow: true;
}>;

export type FirstImpressionExperienceCalibration =
  FirstImpressionExperienceCalibrationReview;

export type FirstImpressionExperienceCalibrationReady = Readonly<{
  status: "READY";
  reviewStatus: FirstImpressionCalibrationStatus;
  source: "first_impression_experience_calibration";
  input: FirstImpressionExperienceCalibrationInput;
  review: FirstImpressionExperienceCalibrationReview;
  boundary: FirstImpressionExperienceCalibrationBoundary;
}>;

export type FirstImpressionExperienceCalibrationUnavailableReason =
  | "UPSTREAM_REVIEW_REFERENCES_REQUIRED"
  | "OBSERVED_ENTRY_SEQUENCE_REQUIRED";

export type FirstImpressionExperienceCalibrationBlockedReason =
  | "UPSTREAM_REVIEW_REFERENCE_INVALID"
  | "OBSERVED_ENTRY_SEQUENCE_INVALID"
  | "TIME_DELIVERY_BOUNDARY_MISSING"
  | "FIRST_IMPRESSION_CALIBRATION_BOUNDARY_INVALID";

export type FirstImpressionExperienceCalibrationUnavailable = Readonly<{
  status: "UNAVAILABLE";
  reviewStatus: "UNAVAILABLE";
  source: "first_impression_experience_calibration";
  reason: FirstImpressionExperienceCalibrationUnavailableReason;
  input: FirstImpressionExperienceCalibrationInput;
  review: null;
  boundary: FirstImpressionExperienceCalibrationBoundary;
}>;

export type FirstImpressionExperienceCalibrationBlocked = Readonly<{
  status: "BLOCKED";
  reviewStatus: "BLOCKED";
  source: "first_impression_experience_calibration";
  reason: FirstImpressionExperienceCalibrationBlockedReason;
  input: FirstImpressionExperienceCalibrationInput;
  review: null;
  boundary: FirstImpressionExperienceCalibrationBoundary;
}>;

export type FirstImpressionExperienceCalibrationResult =
  | FirstImpressionExperienceCalibrationReady
  | FirstImpressionExperienceCalibrationUnavailable
  | FirstImpressionExperienceCalibrationBlocked;
