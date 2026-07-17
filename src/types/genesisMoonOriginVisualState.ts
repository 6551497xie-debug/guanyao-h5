import type { GenesisVisualSemanticMapping } from "./genesisVisualSemanticMapping";

export type GenesisMoonLunarPresence = "TAIYIN_PRESENT";
export type GenesisMoonPhaseExpression = "QUIET_ROUND_MOON";
export type GenesisMoonCosmicDepth = "UNLOCATED_DEEP_SPACE";
export type GenesisMoonlightField = "SOFT_TAIYIN_FIELD";
export type GenesisMoonTemporalRhythm = "SLOW_STABLE_BREATH";
export type GenesisMoonEntranceState = "ENTERING_TAIYIN_REALM";

export type GenesisMoonOriginFirstScreenCopy = Readonly<{
  primary: "日月运行，星辰有序。";
  secondary: "你的星位，映照了你来到这个世界时的样子。";
}>;

export type GenesisMoonOriginVisualState = Readonly<{
  lunarPresence: GenesisMoonLunarPresence;
  moonPhaseExpression: GenesisMoonPhaseExpression;
  cosmicDepth: GenesisMoonCosmicDepth;
  moonlightField: GenesisMoonlightField;
  temporalRhythm: GenesisMoonTemporalRhythm;
  entranceState: GenesisMoonEntranceState;
  firstScreenCopy: GenesisMoonOriginFirstScreenCopy;
  semanticMappingReference: GenesisVisualSemanticMapping;
  visualOnly: true;
  identityBlind: true;
  noIdentity: true;
  noBirthData: true;
  noMansion: true;
  noFourSymbol: true;
  noMotherCode: true;
  noStarBeast: true;
  noEngineInvocation: true;
  noSceneModelInvocation: true;
  noRenderPlanInvocation: true;
  noRendererInvocation: true;
}>;

export type GenesisMoonOriginVisualMappingInput = Readonly<{
  semanticMapping: GenesisVisualSemanticMapping | null;
}>;

export type GenesisMoonOriginVisualMappingUnavailableReason =
  | "MOON_SEMANTIC_MAPPING_REQUIRED"
  | "MOON_SEMANTIC_MAPPING_UNAVAILABLE";

export type GenesisMoonOriginVisualMappingBlockedReason =
  | "SEMANTIC_LAYER_NOT_MOON"
  | "MOON_MAPPING_BOUNDARY_INVALID"
  | "MOON_MAPPING_CONTAINS_LIFE_RESULT";

export type GenesisMoonOriginVisualMappingBoundary = Readonly<{
  moonLayerOnly: true;
  laterGenesisLayersUntouched: true;
  identityUntouched: true;
  engineUntouched: true;
  sceneModelUntouched: true;
  renderPlanUntouched: true;
  rendererUntouched: true;
  uiFlowUntouched: true;
  storageUntouched: true;
}>;

export type GenesisMoonOriginVisualMappingReady = Readonly<{
  status: "READY";
  mappingStatus: "MOON_ORIGIN_VISUAL_MAPPING_READY";
  source: "genesis_moon_origin_visual_mapping";
  input: GenesisMoonOriginVisualMappingInput;
  state: GenesisMoonOriginVisualState;
  boundary: GenesisMoonOriginVisualMappingBoundary;
}>;

export type GenesisMoonOriginVisualMappingUnavailable = Readonly<{
  status: "UNAVAILABLE";
  mappingStatus: "UNAVAILABLE";
  source: "genesis_moon_origin_visual_mapping";
  reason: GenesisMoonOriginVisualMappingUnavailableReason;
  input: GenesisMoonOriginVisualMappingInput;
  state: null;
  boundary: GenesisMoonOriginVisualMappingBoundary;
}>;

export type GenesisMoonOriginVisualMappingBlocked = Readonly<{
  status: "BLOCKED";
  mappingStatus: "BLOCKED";
  source: "genesis_moon_origin_visual_mapping";
  reason: GenesisMoonOriginVisualMappingBlockedReason;
  input: GenesisMoonOriginVisualMappingInput;
  state: null;
  boundary: GenesisMoonOriginVisualMappingBoundary;
}>;

export type GenesisMoonOriginVisualMappingResult =
  | GenesisMoonOriginVisualMappingReady
  | GenesisMoonOriginVisualMappingUnavailable
  | GenesisMoonOriginVisualMappingBlocked;
