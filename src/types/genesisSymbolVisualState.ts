import type { GenesisTimeResonanceVisualState } from "./genesisTimeResonanceVisualState";

export type GenesisSymbolFieldPresence = "SYMBOL_FIELD_EMERGING";
export type GenesisSevenMansionAggregation = "SEVEN_MANSION_RELATIONS_GATHERING";
export type GenesisSpatialMorphology = "FOUR_DIRECTIONAL_MOTION_FIELD";
export type GenesisCelestialSkeleton = "STAR_BONE_STRUCTURE_FORMING";
export type GenesisSymbolicRhythm = "SLOW_SYMBOLIC_DRIFT";
export type GenesisSymbolAlignmentState = "SYMBOL_FIELD_STABILIZED";

export type GenesisSymbolicMotionProfile =
  | "SPROUTING_EXTENSION_CONNECTION"
  | "CONVERGENT_BOUNDARY_CONDENSATION"
  | "ASCENDING_EXPRESSION_REVEAL"
  | "WRAPPED_CARRYING_SINKING";

export type GenesisSymbolVisualState = Readonly<{
  symbolFieldPresence: GenesisSymbolFieldPresence;
  sevenMansionAggregation: GenesisSevenMansionAggregation;
  spatialMorphology: GenesisSpatialMorphology;
  celestialSkeleton: GenesisCelestialSkeleton;
  symbolicRhythm: GenesisSymbolicRhythm;
  alignmentState: GenesisSymbolAlignmentState;
  symbolicMotionModes: readonly [
    "SPROUTING_EXTENSION_CONNECTION",
    "CONVERGENT_BOUNDARY_CONDENSATION",
    "ASCENDING_EXPRESSION_REVEAL",
    "WRAPPED_CARRYING_SINKING",
  ];
  timeResonanceReference: GenesisTimeResonanceVisualState;
  visualOnly: true;
  identityBlind: true;
  noIdentity: true;
  noBirthMansionResult: true;
  noFourSymbolResult: true;
  noHexagram: true;
  noMotherCode: true;
  noPersonalStarBeast: true;
  noEngineInvocation: true;
  noSceneModelInvocation: true;
  noRenderPlanInvocation: true;
  noRendererInvocation: true;
}>;

export type GenesisSymbolVisualMappingInput = Readonly<{
  timeResonanceVisualState: GenesisTimeResonanceVisualState | null;
}>;

export type GenesisSymbolVisualMappingUnavailableReason =
  | "TIME_RESONANCE_VISUAL_STATE_REQUIRED"
  | "TIME_RESONANCE_VISUAL_STATE_UNAVAILABLE";

export type GenesisSymbolVisualMappingBlockedReason =
  | "TIME_RESONANCE_REFERENCE_INVALID"
  | "SYMBOL_VISUAL_MAPPING_BOUNDARY_INVALID"
  | "LATER_GENESIS_LAYER_REQUESTED";

export type GenesisSymbolVisualMappingBoundary = Readonly<{
  symbolLayerOnly: true;
  timeLayerConsumedAsUpstream: true;
  moonLayerUntouched: true;
  starLayerUntouched: true;
  hexagramLayerUntouched: true;
  forceLayerUntouched: true;
  beastLayerUntouched: true;
  identityUntouched: true;
  birthMansionUntouched: true;
  fourSymbolCalculationUntouched: true;
  motherCodeUntouched: true;
  engineUntouched: true;
  sceneModelUntouched: true;
  renderPlanUntouched: true;
  rendererUntouched: true;
  uiFlowUntouched: true;
  storageUntouched: true;
}>;

export type GenesisSymbolVisualMappingReady = Readonly<{
  status: "READY";
  mappingStatus: "SYMBOL_VISUAL_MAPPING_READY";
  source: "genesis_symbol_visual_mapping";
  input: GenesisSymbolVisualMappingInput;
  state: GenesisSymbolVisualState;
  boundary: GenesisSymbolVisualMappingBoundary;
}>;

export type GenesisSymbolVisualMappingUnavailable = Readonly<{
  status: "UNAVAILABLE";
  mappingStatus: "UNAVAILABLE";
  source: "genesis_symbol_visual_mapping";
  reason: GenesisSymbolVisualMappingUnavailableReason;
  input: GenesisSymbolVisualMappingInput;
  state: null;
  boundary: GenesisSymbolVisualMappingBoundary;
}>;

export type GenesisSymbolVisualMappingBlocked = Readonly<{
  status: "BLOCKED";
  mappingStatus: "BLOCKED";
  source: "genesis_symbol_visual_mapping";
  reason: GenesisSymbolVisualMappingBlockedReason;
  input: GenesisSymbolVisualMappingInput;
  state: null;
  boundary: GenesisSymbolVisualMappingBoundary;
}>;

export type GenesisSymbolVisualMappingResult =
  | GenesisSymbolVisualMappingReady
  | GenesisSymbolVisualMappingUnavailable
  | GenesisSymbolVisualMappingBlocked;
