import type { GenesisRendererConsumerContract } from "./genesisRendererConsumerContract";

export type GenesisRendererVisualRealizationLayer =
  | "MOON_ORIGIN"
  | "STAR_RIVER"
  | "TIME_RESONANCE"
  | "SYMBOL_REVEAL"
  | "HEXAGRAM_IMPRINT"
  | "LIFE_FORCE";

export type GenesisRendererVisualExpressionMode =
  | "TAIYIN_MOON_ENTRY"
  | "ORDERED_STAR_RIVER"
  | "TIME_RESONANCE"
  | "SYMBOLIC_FIELD"
  | "CHANGE_IMPRINT"
  | "LIFE_FORCE_MOTION";

export type GenesisRendererEnvironmentalState = Readonly<{
  cosmicDepth:
    | "UNLOCATED_DEEP_SPACE"
    | "DEEP_LAYERED_COSMOS"
    | "SYMBOLIC_FIELD_SPACE"
    | "CHANGE_LAYERED_SPACE"
    | "LIFE_FORCE_SPACE";
  moonlight: "SOFT_TAIYIN_FIELD" | "MOONLIGHT_GATHERS_TO_TIME";
  stellarOrder:
    | "QUIET_BACKGROUND"
    | "ORDERED_RELATIONS"
    | "MORPHOLOGICAL_RELATIONS"
    | "CHANGE_SEDIMENTATION"
    | "FORCE_RESPONSIVE";
  temporalResponse:
    | "SLOW_ENTRY"
    | "SLOW_DRIFT"
    | "TIME_GATHERING"
    | "SYMBOLIC_AGGREGATION"
    | "CHANGE_SEDIMENTATION"
    | "LIFE_FORCE_AWAKENING";
}>;

export type GenesisRendererFocalElementState = Readonly<{
  focalElement:
    | "MOON_DISC"
    | "STELLAR_RELATIONS"
    | "TIME_ALIGNMENT"
    | "SYMBOLIC_FIELD"
    | "CHANGE_IMPRINT"
    | "LIFE_FORCE";
  coreLightSuppression: number;
  ambientFocus: number;
}>;

export type GenesisRendererVisualRealization = Readonly<{
  activeVisualLayer: GenesisRendererVisualRealizationLayer;
  visualExpressionMode: GenesisRendererVisualExpressionMode;
  transitionProgress: number;
  environmentalState: GenesisRendererEnvironmentalState;
  focalElementState: GenesisRendererFocalElementState;
  rendererOnly: true;
  visualStateConsumed: true;
  runtimeConsumed: true;
  timelineConsumed: true;
  identityBlind: true;
  noIdentity: true;
  noEngineInvocation: true;
  noVisualStateMutation: true;
  noRuntimeMutation: true;
  noTimelineMutation: true;
  noLifeFactCopy: true;
  noRendererSemanticCreation: true;
  isolatedPrototypeOnly: true;
}>;

export type GenesisRendererVisualRealizationInput = Readonly<{
  rendererConsumerContract: GenesisRendererConsumerContract | null;
}>;

export type GenesisRendererVisualRealizationUnavailableReason =
  | "RENDERER_CONSUMER_CONTRACT_REQUIRED"
  | "VISUAL_STATE_REFERENCE_REQUIRED";

export type GenesisRendererVisualRealizationBlockedReason =
  | "CONSUMER_BOUNDARY_INVALID"
  | "P17_A_LAYER_OUT_OF_SCOPE"
  | "P17_B_LAYER_OUT_OF_SCOPE"
  | "CONSUMER_STAGE_REFERENCE_MISMATCH"
  | "TRANSITION_PROGRESS_INVALID";

export type GenesisRendererVisualRealizationBoundary = Readonly<{
  rendererRealizationOnly: true;
  visualStateConsumed: true;
  runtimeConsumed: true;
  timelineConsumed: true;
  identityUntouched: true;
  engineUntouched: true;
  sceneModelUntouched: true;
  renderPlanUntouched: true;
  visualStateUntouched: true;
  runtimeUntouched: true;
  timelineUntouched: true;
  rendererSemanticCreationForbidden: true;
  productionIntegration: false;
  isolatedPrototypeOnly: true;
}>;

export type GenesisRendererVisualRealizationReady = Readonly<{
  status: "READY";
  realizationStatus: "GENESIS_RENDERER_VISUAL_REALIZATION_READY";
  source: "genesis_renderer_visual_realization";
  input: GenesisRendererVisualRealizationInput;
  realization: GenesisRendererVisualRealization;
  boundary: GenesisRendererVisualRealizationBoundary;
}>;

export type GenesisRendererVisualRealizationUnavailable = Readonly<{
  status: "UNAVAILABLE";
  realizationStatus: "UNAVAILABLE";
  source: "genesis_renderer_visual_realization";
  reason: GenesisRendererVisualRealizationUnavailableReason;
  input: GenesisRendererVisualRealizationInput;
  realization: null;
  boundary: GenesisRendererVisualRealizationBoundary;
}>;

export type GenesisRendererVisualRealizationBlocked = Readonly<{
  status: "BLOCKED";
  realizationStatus: "BLOCKED";
  source: "genesis_renderer_visual_realization";
  reason: GenesisRendererVisualRealizationBlockedReason;
  input: GenesisRendererVisualRealizationInput;
  realization: null;
  boundary: GenesisRendererVisualRealizationBoundary;
}>;

export type GenesisRendererVisualRealizationResult =
  | GenesisRendererVisualRealizationReady
  | GenesisRendererVisualRealizationUnavailable
  | GenesisRendererVisualRealizationBlocked;
