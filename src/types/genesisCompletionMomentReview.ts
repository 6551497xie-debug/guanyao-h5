import type { GenesisExperienceRuntimeReviewResult } from "./genesisExperienceRuntimeReview";

export type GenesisCompletionState = "GENESIS_PRESENCE_STABILIZED";
export type GenesisRecognitionMoment = "PERSONAL_STAR_BEAST_RECOGNITION_OPEN";
export type GenesisPresenceStability = "QUIET_PRESENCE_STABLE";
export type GenesisTransitionReadiness = "REALITY_ENTRY_REVIEW_PENDING";
export type GenesisEmotionalClosure = "GENESIS_CLOSURE_OPEN_NOT_FINAL";
export type GenesisToRealityBoundary = "GENESIS_TO_REALITY_BOUNDARY_HELD";

export type GenesisCompletionRuntimeBoundary = Readonly<{
  completionReviewOnly: true;
  genesisLayerOnly: true;
  realityEntryBoundaryHeld: true;
  noRealityCalculation: true;
  noPressureAnalysis: true;
  noGravity: true;
  noChoice: true;
  noCrystal: true;
  noStorage: true;
  noUserProfile: true;
  noIdentityMutation: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noUiFlowMutation: true;
  noVisualStateMutation: true;
  noNewGenesisLayer: true;
}>;

export type GenesisCompletionMomentReview = Readonly<{
  completionState: GenesisCompletionState;
  recognitionMoment: GenesisRecognitionMoment;
  presenceStability: GenesisPresenceStability;
  transitionReadiness: GenesisTransitionReadiness;
  emotionalClosure: GenesisEmotionalClosure;
  genesisToRealityBoundary: GenesisToRealityBoundary;
  experienceRuntimeReviewReference: GenesisExperienceRuntimeReviewResult;
  runtimeBoundary: GenesisCompletionRuntimeBoundary;
}>;

export type GenesisCompletionMomentReviewInput = Readonly<{
  experienceRuntimeReviewResult: GenesisExperienceRuntimeReviewResult | null;
}>;

export type GenesisCompletionMomentReviewUnavailableReason =
  | "EXPERIENCE_RUNTIME_REVIEW_REQUIRED"
  | "EXPERIENCE_RUNTIME_REVIEW_UNAVAILABLE";

export type GenesisCompletionMomentReviewBlockedReason =
  | "EXPERIENCE_RUNTIME_REVIEW_BLOCKED"
  | "COMPLETION_BOUNDARY_INVALID"
  | "GENESIS_RUNTIME_SEQUENCE_INVALID"
  | "REALITY_LAYER_REQUESTED_TOO_EARLY";

export type GenesisCompletionMomentReviewReady = Readonly<{
  status: "READY";
  reviewStatus: "GENESIS_COMPLETION_MOMENT_REVIEW_READY";
  source: "genesis_completion_moment_review";
  input: GenesisCompletionMomentReviewInput;
  review: GenesisCompletionMomentReview;
  runtimeBoundary: GenesisCompletionRuntimeBoundary;
}>;

export type GenesisCompletionMomentReviewUnavailable = Readonly<{
  status: "UNAVAILABLE";
  reviewStatus: "UNAVAILABLE";
  source: "genesis_completion_moment_review";
  reason: GenesisCompletionMomentReviewUnavailableReason;
  input: GenesisCompletionMomentReviewInput;
  review: null;
  runtimeBoundary: GenesisCompletionRuntimeBoundary;
}>;

export type GenesisCompletionMomentReviewBlocked = Readonly<{
  status: "BLOCKED";
  reviewStatus: "BLOCKED";
  source: "genesis_completion_moment_review";
  reason: GenesisCompletionMomentReviewBlockedReason;
  input: GenesisCompletionMomentReviewInput;
  review: null;
  runtimeBoundary: GenesisCompletionRuntimeBoundary;
}>;

export type GenesisCompletionMomentReviewResult =
  | GenesisCompletionMomentReviewReady
  | GenesisCompletionMomentReviewUnavailable
  | GenesisCompletionMomentReviewBlocked;
