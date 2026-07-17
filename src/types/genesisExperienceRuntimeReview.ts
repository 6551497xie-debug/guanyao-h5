import type {
  GenesisFullSequenceReview,
  GenesisFullSequenceReviewResult,
} from "./genesisFullSequenceReview";

export type GenesisExperienceRuntimeLayer =
  | "MOON"
  | "STAR"
  | "TIME"
  | "SYMBOL"
  | "HEXAGRAM"
  | "FORCE"
  | "BEAST";

export type GenesisExperienceRuntimeTransition =
  | "MOON_TO_STAR"
  | "STAR_TO_TIME"
  | "TIME_TO_SYMBOL"
  | "SYMBOL_TO_HEXAGRAM"
  | "HEXAGRAM_TO_FORCE"
  | "FORCE_TO_BEAST";

export type GenesisExperienceRuntimeTransitionState =
  | "CAUSALLY_CONTINUOUS"
  | "TRANSITION_REVIEW_BLOCKED";
export type GenesisExperienceRuntimeTemporalFlow = "SLOW_CONTINUOUS_REVEAL";
export type GenesisExperienceRuntimeUserParticipationPoint =
  | "TIME_DELIVERY_ONLY";
export type GenesisExperienceRuntimeRevealJourneyState =
  | "SEVEN_LAYER_REVEAL_RUNTIME_REVIEW_READY";

export type GenesisExperienceRuntimeBoundary = Readonly<{
  reviewOnly: true;
  visualStateOrchestrationOnly: true;
  timelineDefinitionOnly: true;
  transitionDefinitionOnly: true;
  userExperienceDefinitionOnly: true;
  noIdentityCalculation: true;
  noEngineResultConsumption: true;
  noRendererCommand: true;
  noStorageState: true;
  noRealityPressure: true;
  noGravity: true;
  noChoice: true;
  noCrystal: true;
  noUserBinding: true;
  noFormalRuntimeIntegration: true;
  noUiMutation: true;
  noVisualStateMutation: true;
}>;

export type GenesisExperienceRuntimeReview = Readonly<{
  experienceSequence: readonly [
    "MOON",
    "STAR",
    "TIME",
    "SYMBOL",
    "HEXAGRAM",
    "FORCE",
    "BEAST",
  ];
  transitionState: GenesisExperienceRuntimeTransitionState;
  temporalFlow: GenesisExperienceRuntimeTemporalFlow;
  userParticipationPoint: GenesisExperienceRuntimeUserParticipationPoint;
  revealJourneyState: GenesisExperienceRuntimeRevealJourneyState;
  transitions: readonly [
    "MOON_TO_STAR",
    "STAR_TO_TIME",
    "TIME_TO_SYMBOL",
    "SYMBOL_TO_HEXAGRAM",
    "HEXAGRAM_TO_FORCE",
    "FORCE_TO_BEAST",
  ];
  fullSequenceReviewReference: GenesisFullSequenceReview;
  runtimeBoundary: GenesisExperienceRuntimeBoundary;
}>;

export type GenesisExperienceRuntimeReviewInput = Readonly<{
  fullSequenceReviewResult: GenesisFullSequenceReviewResult | null;
}>;

export type GenesisExperienceRuntimeReviewUnavailableReason =
  | "FULL_SEQUENCE_REVIEW_REQUIRED"
  | "FULL_SEQUENCE_REVIEW_UNAVAILABLE";

export type GenesisExperienceRuntimeReviewBlockedReason =
  | "FULL_SEQUENCE_REVIEW_BLOCKED"
  | "EXPERIENCE_SEQUENCE_ORDER_INVALID"
  | "EXPERIENCE_TRANSITION_STATE_INVALID"
  | "EXPERIENCE_RUNTIME_BOUNDARY_INVALID"
  | "MULTIPLE_USER_PARTICIPATION_POINTS";

export type GenesisExperienceRuntimeReviewResultReady = Readonly<{
  status: "READY";
  reviewStatus: "GENESIS_EXPERIENCE_RUNTIME_REVIEW_READY";
  source: "genesis_experience_runtime_review";
  input: GenesisExperienceRuntimeReviewInput;
  review: GenesisExperienceRuntimeReview;
  runtimeBoundary: GenesisExperienceRuntimeBoundary;
}>;

export type GenesisExperienceRuntimeReviewResultUnavailable = Readonly<{
  status: "UNAVAILABLE";
  reviewStatus: "UNAVAILABLE";
  source: "genesis_experience_runtime_review";
  reason: GenesisExperienceRuntimeReviewUnavailableReason;
  input: GenesisExperienceRuntimeReviewInput;
  review: null;
  runtimeBoundary: GenesisExperienceRuntimeBoundary;
}>;

export type GenesisExperienceRuntimeReviewResultBlocked = Readonly<{
  status: "BLOCKED";
  reviewStatus: "BLOCKED";
  source: "genesis_experience_runtime_review";
  reason: GenesisExperienceRuntimeReviewBlockedReason;
  input: GenesisExperienceRuntimeReviewInput;
  review: null;
  runtimeBoundary: GenesisExperienceRuntimeBoundary;
}>;

export type GenesisExperienceRuntimeReviewResult =
  | GenesisExperienceRuntimeReviewResultReady
  | GenesisExperienceRuntimeReviewResultUnavailable
  | GenesisExperienceRuntimeReviewResultBlocked;
