import type { GenesisSymbolVisualState } from "./genesisSymbolVisualState";

export type GenesisChangePatternPresence = "CHANGE_PATTERN_EMERGING";
export type GenesisYinYangRhythmExpression = "CONTRACTION_EXPANSION_ALTERNATION";
export type GenesisYaoStructureExpression = "SIX_LAYER_TRANSFORMATION_STRUCTURE";
export type GenesisTransformationTrace = "CONTINUOUS_STATE_TRANSITION_TRACE";
export type GenesisImprintState = "LIFE_CHANGE_IMPRINT_FORMING";

export type GenesisChangeRhythmMode =
  | "CONTRACTION"
  | "EXPANSION"
  | "BRIGHTENING"
  | "DIMMING"
  | "CONTINUITY"
  | "BREAK";

export type GenesisHexagramVisualState = Readonly<{
  changePatternPresence: GenesisChangePatternPresence;
  yinYangRhythmExpression: GenesisYinYangRhythmExpression;
  yaoStructureExpression: GenesisYaoStructureExpression;
  transformationTrace: GenesisTransformationTrace;
  imprintState: GenesisImprintState;
  changeRhythmModes: readonly [
    "CONTRACTION",
    "EXPANSION",
    "BRIGHTENING",
    "DIMMING",
    "CONTINUITY",
    "BREAK",
  ];
  symbolVisualReference: GenesisSymbolVisualState;
  visualOnly: true;
  identityBlind: true;
  noIdentity: true;
  noFourSymbolResult: true;
  noHexagramCalculationResult: true;
  noMotherCode: true;
  noLifeArchetype: true;
  noPersonalStarBeast: true;
  noEngineInvocation: true;
  noHexagramCalculationInvocation: true;
  noSceneModelInvocation: true;
  noRenderPlanInvocation: true;
  noRendererInvocation: true;
}>;

export type GenesisHexagramVisualMappingInput = Readonly<{
  symbolVisualState: GenesisSymbolVisualState | null;
}>;

export type GenesisHexagramVisualMappingUnavailableReason =
  | "SYMBOL_VISUAL_STATE_REQUIRED"
  | "SYMBOL_VISUAL_STATE_UNAVAILABLE";

export type GenesisHexagramVisualMappingBlockedReason =
  | "SYMBOL_VISUAL_REFERENCE_INVALID"
  | "HEXAGRAM_VISUAL_MAPPING_BOUNDARY_INVALID"
  | "LATER_GENESIS_LAYER_REQUESTED";

export type GenesisHexagramVisualMappingBoundary = Readonly<{
  hexagramLayerOnly: true;
  symbolLayerConsumedAsUpstream: true;
  moonLayerUntouched: true;
  starLayerUntouched: true;
  timeLayerUntouched: true;
  forceLayerUntouched: true;
  beastLayerUntouched: true;
  identityUntouched: true;
  fourSymbolUntouched: true;
  hexagramCalculationUntouched: true;
  motherCodeUntouched: true;
  lifeArchetypeUntouched: true;
  engineUntouched: true;
  sceneModelUntouched: true;
  renderPlanUntouched: true;
  rendererUntouched: true;
  uiFlowUntouched: true;
  storageUntouched: true;
}>;

export type GenesisHexagramVisualMappingReady = Readonly<{
  status: "READY";
  mappingStatus: "HEXAGRAM_VISUAL_MAPPING_READY";
  source: "genesis_hexagram_visual_mapping";
  input: GenesisHexagramVisualMappingInput;
  state: GenesisHexagramVisualState;
  boundary: GenesisHexagramVisualMappingBoundary;
}>;

export type GenesisHexagramVisualMappingUnavailable = Readonly<{
  status: "UNAVAILABLE";
  mappingStatus: "UNAVAILABLE";
  source: "genesis_hexagram_visual_mapping";
  reason: GenesisHexagramVisualMappingUnavailableReason;
  input: GenesisHexagramVisualMappingInput;
  state: null;
  boundary: GenesisHexagramVisualMappingBoundary;
}>;

export type GenesisHexagramVisualMappingBlocked = Readonly<{
  status: "BLOCKED";
  mappingStatus: "BLOCKED";
  source: "genesis_hexagram_visual_mapping";
  reason: GenesisHexagramVisualMappingBlockedReason;
  input: GenesisHexagramVisualMappingInput;
  state: null;
  boundary: GenesisHexagramVisualMappingBoundary;
}>;

export type GenesisHexagramVisualMappingResult =
  | GenesisHexagramVisualMappingReady
  | GenesisHexagramVisualMappingUnavailable
  | GenesisHexagramVisualMappingBlocked;
