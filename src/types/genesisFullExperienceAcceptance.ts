import type { GenesisCompletionMomentReviewResult } from "./genesisCompletionMomentReview";
import type { GenesisPreviewIntegrationResult } from "./genesisPreviewIntegration";

export type GenesisFullExperienceAcceptanceStage =
  | "MOON_ORIGIN"
  | "STAR_RIVER"
  | "TIME_RESONANCE"
  | "SYMBOL_REVEAL"
  | "HEXAGRAM_IMPRINT"
  | "LIFE_FORCE"
  | "STAR_BEAST_REVEAL"
  | "COMPLETION";

export type GenesisExperienceIssueCategory =
  | "SEMANTIC_MISMATCH"
  | "VISUAL_WEIGHT_IMBALANCE"
  | "TRANSITION_BREAK"
  | "LIFE_PRESENCE_WEAK"
  | "OVER_EXPLANATION";

export type GenesisAcceptanceDimension = "PENDING" | "PASS" | "NEEDS_CALIBRATION";
export type GenesisFullExperienceAcceptanceStatus =
  | "PENDING_HUMAN_REVIEW"
  | "ACCEPTED"
  | "NEEDS_CALIBRATION";

export type GenesisFullExperienceAcceptanceBoundary = Readonly<{
  acceptanceReviewOnly: true;
  eightStageSequenceOnly: true;
  noIdentity: true;
  noUserData: true;
  noEngineResult: true;
  noProductionState: true;
  noVisualStateMutation: true;
  noRuntimeMutation: true;
  noTimelineMutation: true;
  noRendererMutation: true;
  noReality: true;
  noGravity: true;
  noChoice: true;
  noCrystal: true;
  noStorage: true;
}>;

export type GenesisFullExperienceAcceptanceInput = Readonly<{
  completionMomentReviewResult: GenesisCompletionMomentReviewResult | null;
  previewIntegrationResult: GenesisPreviewIntegrationResult | null;
  observedSequence: readonly GenesisFullExperienceAcceptanceStage[];
  firstImpression?: GenesisAcceptanceDimension;
  journeyContinuity?: GenesisAcceptanceDimension;
  lifeRecognition?: GenesisAcceptanceDimension;
  emotionalCompletion?: GenesisAcceptanceDimension;
  issueCategories?: readonly GenesisExperienceIssueCategory[];
}>;

export type GenesisFullExperienceAcceptanceReview = Readonly<{
  firstImpression: GenesisAcceptanceDimension;
  journeyContinuity: GenesisAcceptanceDimension;
  lifeRecognition: GenesisAcceptanceDimension;
  emotionalCompletion: GenesisAcceptanceDimension;
  systemIntegrity: "PASS";
  sequence: readonly [
    "MOON_ORIGIN",
    "STAR_RIVER",
    "TIME_RESONANCE",
    "SYMBOL_REVEAL",
    "HEXAGRAM_IMPRINT",
    "LIFE_FORCE",
    "STAR_BEAST_REVEAL",
    "COMPLETION",
  ];
  completionReachable: true;
  issueCategories: readonly GenesisExperienceIssueCategory[];
  completionMomentReviewReference: GenesisCompletionMomentReviewResult;
  previewIntegrationReference: GenesisPreviewIntegrationResult;
}>;

export type GenesisFullExperienceAcceptance = GenesisFullExperienceAcceptanceReview;

export type GenesisFullExperienceAcceptanceReady = Readonly<{
  status: "READY";
  reviewStatus: GenesisFullExperienceAcceptanceStatus;
  source: "genesis_full_experience_acceptance";
  input: GenesisFullExperienceAcceptanceInput;
  review: GenesisFullExperienceAcceptanceReview;
  boundary: GenesisFullExperienceAcceptanceBoundary;
}>;

export type GenesisFullExperienceAcceptanceUnavailableReason =
  | "COMPLETION_MOMENT_REVIEW_REQUIRED"
  | "PREVIEW_INTEGRATION_REQUIRED"
  | "OBSERVED_SEQUENCE_REQUIRED";

export type GenesisFullExperienceAcceptanceBlockedReason =
  | "COMPLETION_MOMENT_REVIEW_UNAVAILABLE"
  | "COMPLETION_MOMENT_REVIEW_BLOCKED"
  | "PREVIEW_INTEGRATION_UNAVAILABLE"
  | "PREVIEW_INTEGRATION_BLOCKED"
  | "EIGHT_STAGE_SEQUENCE_INVALID"
  | "COMPLETION_NOT_REACHABLE"
  | "GENESIS_ACCEPTANCE_BOUNDARY_INVALID"
  | "PRODUCTION_INTEGRATION_PRESENT";

export type GenesisFullExperienceAcceptanceUnavailable = Readonly<{
  status: "UNAVAILABLE";
  reviewStatus: "UNAVAILABLE";
  source: "genesis_full_experience_acceptance";
  reason: GenesisFullExperienceAcceptanceUnavailableReason;
  input: GenesisFullExperienceAcceptanceInput;
  review: null;
  boundary: GenesisFullExperienceAcceptanceBoundary;
}>;

export type GenesisFullExperienceAcceptanceBlocked = Readonly<{
  status: "BLOCKED";
  reviewStatus: "BLOCKED";
  source: "genesis_full_experience_acceptance";
  reason: GenesisFullExperienceAcceptanceBlockedReason;
  input: GenesisFullExperienceAcceptanceInput;
  review: null;
  boundary: GenesisFullExperienceAcceptanceBoundary;
}>;

export type GenesisFullExperienceAcceptanceResult =
  | GenesisFullExperienceAcceptanceReady
  | GenesisFullExperienceAcceptanceUnavailable
  | GenesisFullExperienceAcceptanceBlocked;
