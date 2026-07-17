export type GenesisVisualSemanticLayer =
  | "MOON"
  | "STAR"
  | "TIME"
  | "SYMBOL"
  | "HEXAGRAM"
  | "FORCE"
  | "BEAST";

export type GenesisVisualSemanticMapping = Readonly<{
  semanticLayer: GenesisVisualSemanticLayer;
  semanticIntent: string;
  visualIntent: string;
  allowedExpression: readonly string[];
  forbiddenExpression: readonly string[];
  rendererDirection: string;
  visualOnly: true;
  identityBlind: true;
  noIdentityCalculation: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noSceneModelInvocation: true;
  noRenderPlanInvocation: true;
}>;

export type GenesisVisualSemanticMappingReviewInput = Readonly<{
  mappings: readonly GenesisVisualSemanticMapping[] | null;
}>;

export type GenesisVisualSemanticMappingUnavailableReason =
  | "MAPPING_INPUT_REQUIRED"
  | "MAPPING_INPUT_EMPTY";

export type GenesisVisualSemanticMappingBlockedReason =
  | "MAPPING_LAYER_ORDER_INVALID"
  | "MAPPING_LAYER_DUPLICATED"
  | "MAPPING_BOUNDARY_INVALID"
  | "ANIMAL_IDENTITY_HARDCODED";

export type GenesisVisualSemanticMappingReviewBoundary = Readonly<{
  semanticMappingOnly: true;
  visualGovernanceOnly: true;
  identitySourceUntouched: true;
  engineUntouched: true;
  sceneModelUntouched: true;
  renderPlanUntouched: true;
  rendererUntouched: true;
  uiUntouched: true;
  storageUntouched: true;
}>;

export type GenesisVisualSemanticMappingReady = Readonly<{
  status: "READY";
  reviewStatus: "GENESIS_VISUAL_SEMANTIC_MAPPING_READY";
  source: "genesis_visual_semantic_mapping";
  input: GenesisVisualSemanticMappingReviewInput;
  mappings: readonly GenesisVisualSemanticMapping[];
  boundary: GenesisVisualSemanticMappingReviewBoundary;
}>;

export type GenesisVisualSemanticMappingUnavailable = Readonly<{
  status: "UNAVAILABLE";
  reviewStatus: "UNAVAILABLE";
  source: "genesis_visual_semantic_mapping";
  reason: GenesisVisualSemanticMappingUnavailableReason;
  input: GenesisVisualSemanticMappingReviewInput;
  mappings: null;
  boundary: GenesisVisualSemanticMappingReviewBoundary;
}>;

export type GenesisVisualSemanticMappingBlocked = Readonly<{
  status: "BLOCKED";
  reviewStatus: "BLOCKED";
  source: "genesis_visual_semantic_mapping";
  reason: GenesisVisualSemanticMappingBlockedReason;
  input: GenesisVisualSemanticMappingReviewInput;
  mappings: null;
  boundary: GenesisVisualSemanticMappingReviewBoundary;
}>;

export type GenesisVisualSemanticMappingReviewResult =
  | GenesisVisualSemanticMappingReady
  | GenesisVisualSemanticMappingUnavailable
  | GenesisVisualSemanticMappingBlocked;
