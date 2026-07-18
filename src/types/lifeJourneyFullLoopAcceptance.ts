export type LifeJourneyFullLoopStage =
  | "ENTRY"
  | "GENESIS"
  | "RECOGNITION"
  | "REALITY_ENTRY"
  | "PRESSURE"
  | "GRAVITY"
  | "CHOICE"
  | "CRYSTAL"
  | "JOURNEY_COMPLETE";

export type LifeJourneyFullLoopAction =
  | "TIME_DELIVERY"
  | "CHOICE_ACTIVE_RESPONSE"
  | "CRYSTAL_RECOGNITION_CONFIRM";

export type LifeJourneyExperienceIssueCategory =
  | "ENTRY_DISCONNECTION"
  | "GENESIS_DISRUPTION"
  | "RECOGNITION_WEAK"
  | "REALITY_TRANSITION_BREAK"
  | "CHOICE_AGENCY_WEAK"
  | "CRYSTAL_IMPRINT_WEAK";

export type LifeJourneyAcceptanceDimension =
  | "PENDING"
  | "PASS"
  | "NEEDS_REVIEW";

export type LifeJourneyFullLoopAcceptanceStatus =
  | "PENDING_HUMAN_REVIEW"
  | "ACCEPTED"
  | "NEEDS_REVIEW";

export type LifeJourneyFullLoopAcceptanceBoundary = Readonly<{
  acceptanceReviewOnly: true;
  noUserData: true;
  noStorageRecord: true;
  noEngineResult: true;
  noProductMetrics: true;
  noRuntimeMutation: true;
  noUIMutation: true;
  noVisualStateMutation: true;
  noGenesisMutation: true;
  noRealityMutation: true;
  noCrystalMutation: true;
  noProductionIntegration: true;
}>;

export type LifeJourneyFullLoopAcceptanceInput = Readonly<{
  observedStages: readonly LifeJourneyFullLoopStage[];
  observedActions: readonly LifeJourneyFullLoopAction[];
  entryExperience?: LifeJourneyAcceptanceDimension;
  genesisContinuity?: LifeJourneyAcceptanceDimension;
  recognitionExperience?: LifeJourneyAcceptanceDimension;
  realityTransition?: LifeJourneyAcceptanceDimension;
  transformationFlow?: LifeJourneyAcceptanceDimension;
  crystalCompletion?: LifeJourneyAcceptanceDimension;
  issueCategories?: readonly LifeJourneyExperienceIssueCategory[];
}>;

export type LifeJourneyFullLoopAcceptanceReview = Readonly<{
  entryExperience: LifeJourneyAcceptanceDimension;
  genesisContinuity: LifeJourneyAcceptanceDimension;
  recognitionExperience: LifeJourneyAcceptanceDimension;
  realityTransition: LifeJourneyAcceptanceDimension;
  transformationFlow: LifeJourneyAcceptanceDimension;
  crystalCompletion: LifeJourneyAcceptanceDimension;
  journeyIntegrity: "PASS";
  sequence: readonly [
    "ENTRY",
    "GENESIS",
    "RECOGNITION",
    "REALITY_ENTRY",
    "PRESSURE",
    "GRAVITY",
    "CHOICE",
    "CRYSTAL",
    "JOURNEY_COMPLETE",
  ];
  actions: readonly [
    "TIME_DELIVERY",
    "CHOICE_ACTIVE_RESPONSE",
    "CRYSTAL_RECOGNITION_CONFIRM",
  ];
  journeyCompleteReachable: true;
  issueCategories: readonly LifeJourneyExperienceIssueCategory[];
}>;

export type LifeJourneyFullLoopAcceptance = LifeJourneyFullLoopAcceptanceReview;

export type LifeJourneyFullLoopAcceptanceReady = Readonly<{
  status: "READY";
  reviewStatus: LifeJourneyFullLoopAcceptanceStatus;
  source: "life_journey_full_loop_acceptance";
  input: LifeJourneyFullLoopAcceptanceInput;
  review: LifeJourneyFullLoopAcceptanceReview;
  boundary: LifeJourneyFullLoopAcceptanceBoundary;
}>;

export type LifeJourneyFullLoopAcceptanceUnavailableReason =
  | "OBSERVED_SEQUENCE_REQUIRED"
  | "OBSERVED_ACTIONS_REQUIRED";

export type LifeJourneyFullLoopAcceptanceBlockedReason =
  | "FULL_LOOP_SEQUENCE_INVALID"
  | "JOURNEY_COMPLETE_NOT_REACHABLE"
  | "USER_ACTION_SEQUENCE_INVALID"
  | "FULL_LOOP_ACCEPTANCE_BOUNDARY_INVALID"
  | "PRODUCTION_INTEGRATION_PRESENT";

export type LifeJourneyFullLoopAcceptanceUnavailable = Readonly<{
  status: "UNAVAILABLE";
  reviewStatus: "UNAVAILABLE";
  source: "life_journey_full_loop_acceptance";
  reason: LifeJourneyFullLoopAcceptanceUnavailableReason;
  input: LifeJourneyFullLoopAcceptanceInput;
  review: null;
  boundary: LifeJourneyFullLoopAcceptanceBoundary;
}>;

export type LifeJourneyFullLoopAcceptanceBlocked = Readonly<{
  status: "BLOCKED";
  reviewStatus: "BLOCKED";
  source: "life_journey_full_loop_acceptance";
  reason: LifeJourneyFullLoopAcceptanceBlockedReason;
  input: LifeJourneyFullLoopAcceptanceInput;
  review: null;
  boundary: LifeJourneyFullLoopAcceptanceBoundary;
}>;

export type LifeJourneyFullLoopAcceptanceResult =
  | LifeJourneyFullLoopAcceptanceReady
  | LifeJourneyFullLoopAcceptanceUnavailable
  | LifeJourneyFullLoopAcceptanceBlocked;
