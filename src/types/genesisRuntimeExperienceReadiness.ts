import type { GenesisCompletionMomentReviewResult } from "./genesisCompletionMomentReview";

export type GenesisRuntimeExperienceSequence = readonly [
  "MOON",
  "STAR",
  "TIME",
  "SYMBOL",
  "HEXAGRAM",
  "FORCE",
  "BEAST",
  "COMPLETION",
];

export type GenesisRuntimeExperienceTransition =
  | "MOON_TO_STAR"
  | "STAR_TO_TIME"
  | "TIME_TO_SYMBOL"
  | "SYMBOL_TO_HEXAGRAM"
  | "HEXAGRAM_TO_FORCE"
  | "FORCE_TO_BEAST"
  | "BEAST_TO_COMPLETION";

export type GenesisRuntimeSequenceContract = "MOON_TO_COMPLETION_IN_ORDER";
export type GenesisRuntimeVisualStateConsumption =
  "READ_ONLY_UPSTREAM_GENESIS_VISUAL_STATES";
export type GenesisRuntimeTransitionContract =
  "CAUSALLY_CONTINUOUS_SLOW_REVEAL";
export type GenesisRuntimeInteractionBoundary = "TIME_DELIVERY_ONLY";
export type GenesisRuntimeRendererConsumptionBoundary =
  "VISUAL_STATE_TO_RENDERER_ONLY";
export type GenesisRuntimeExperienceReadinessState =
  "READY_FOR_RUNTIME_EXPERIENCE_IMPLEMENTATION";

export type GenesisRuntimeExperienceReadinessBoundary = Readonly<{
  readinessReviewOnly: true;
  noFormalRuntimeIntegration: true;
  noRendererInvocation: true;
  noUiRendering: true;
  noUserInputHandling: true;
  noIdentityCalculation: true;
  noEngineResultConsumption: true;
  noStorageState: true;
  noRealityPressure: true;
  noGravity: true;
  noChoice: true;
  noCrystal: true;
  noUserBinding: true;
  noIdentityMutation: true;
  noSceneModelMutation: true;
  noRenderPlanMutation: true;
  noVisualStateMutation: true;
  rendererConsumesVisualStateOnly: true;
}>;

export type GenesisRuntimeExperienceReadiness = Readonly<{
  runtimeSequenceContract: GenesisRuntimeSequenceContract;
  visualStateConsumption: GenesisRuntimeVisualStateConsumption;
  transitionContract: GenesisRuntimeTransitionContract;
  interactionBoundary: GenesisRuntimeInteractionBoundary;
  rendererConsumptionBoundary: GenesisRuntimeRendererConsumptionBoundary;
  readinessState: GenesisRuntimeExperienceReadinessState;
  runtimeSequence: GenesisRuntimeExperienceSequence;
  transitions: readonly [
    "MOON_TO_STAR",
    "STAR_TO_TIME",
    "TIME_TO_SYMBOL",
    "SYMBOL_TO_HEXAGRAM",
    "HEXAGRAM_TO_FORCE",
    "FORCE_TO_BEAST",
    "BEAST_TO_COMPLETION",
  ];
  completionMomentReviewReference: GenesisCompletionMomentReviewResult;
  boundary: GenesisRuntimeExperienceReadinessBoundary;
}>;

export type GenesisRuntimeExperienceReadinessInput = Readonly<{
  completionMomentReviewResult: GenesisCompletionMomentReviewResult | null;
}>;

export type GenesisRuntimeExperienceReadinessUnavailableReason =
  | "COMPLETION_MOMENT_REVIEW_REQUIRED"
  | "COMPLETION_MOMENT_REVIEW_UNAVAILABLE";

export type GenesisRuntimeExperienceReadinessBlockedReason =
  | "COMPLETION_MOMENT_REVIEW_BLOCKED"
  | "GENESIS_RUNTIME_SEQUENCE_CONTRACT_INVALID"
  | "VISUAL_STATE_CONSUMPTION_BOUNDARY_INVALID"
  | "TRANSITION_CONTRACT_INVALID"
  | "INTERACTION_BOUNDARY_INVALID"
  | "RENDERER_CONSUMPTION_BOUNDARY_INVALID"
  | "COMPLETION_RUNTIME_BOUNDARY_INVALID";

export type GenesisRuntimeExperienceReadinessReady = Readonly<{
  status: "READY";
  readiness: GenesisRuntimeExperienceReadinessState;
  source: "genesis_runtime_experience_readiness";
  input: GenesisRuntimeExperienceReadinessInput;
  readinessContract: GenesisRuntimeExperienceReadiness;
  boundary: GenesisRuntimeExperienceReadinessBoundary;
}>;

export type GenesisRuntimeExperienceReadinessUnavailable = Readonly<{
  status: "UNAVAILABLE";
  readiness: "UNAVAILABLE";
  source: "genesis_runtime_experience_readiness";
  reason: GenesisRuntimeExperienceReadinessUnavailableReason;
  input: GenesisRuntimeExperienceReadinessInput;
  readinessContract: null;
  boundary: GenesisRuntimeExperienceReadinessBoundary;
}>;

export type GenesisRuntimeExperienceReadinessBlocked = Readonly<{
  status: "BLOCKED";
  readiness: "BLOCKED";
  source: "genesis_runtime_experience_readiness";
  reason: GenesisRuntimeExperienceReadinessBlockedReason;
  input: GenesisRuntimeExperienceReadinessInput;
  readinessContract: null;
  boundary: GenesisRuntimeExperienceReadinessBoundary;
}>;

export type GenesisRuntimeExperienceReadinessResult =
  | GenesisRuntimeExperienceReadinessReady
  | GenesisRuntimeExperienceReadinessUnavailable
  | GenesisRuntimeExperienceReadinessBlocked;
