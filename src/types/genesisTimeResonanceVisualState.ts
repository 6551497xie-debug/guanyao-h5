import type { GenesisStarRiverVisualState } from "./genesisStarRiverVisualState";

export type GenesisTemporalEntryState = "LIFE_TIME_DELIVERED_TO_STARS";
export type GenesisMoonPhaseTransitionExpression = "MOONLIGHT_GATHERS_TO_TIME";
export type GenesisStarFieldResponse = "STELLAR_RHYTHM_RESPONDS";
export type GenesisTimeTemporalRhythm = "SLOW_TIME_RESONANCE";
export type GenesisTimeAlignmentState = "TEMPORAL_MOMENT_STABILIZED";

export type GenesisTimeResonanceVisualState = Readonly<{
  temporalEntryState: GenesisTemporalEntryState;
  moonPhaseTransitionExpression: GenesisMoonPhaseTransitionExpression;
  starFieldResponse: GenesisStarFieldResponse;
  temporalRhythm: GenesisTimeTemporalRhythm;
  alignmentState: GenesisTimeAlignmentState;
  starRiverReference: GenesisStarRiverVisualState;
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

export type GenesisTimeResonanceVisualMappingInput = Readonly<{
  starRiverVisualState: GenesisStarRiverVisualState | null;
}>;

export type GenesisTimeResonanceVisualMappingUnavailableReason =
  | "STAR_RIVER_VISUAL_STATE_REQUIRED"
  | "STAR_RIVER_VISUAL_STATE_UNAVAILABLE";

export type GenesisTimeResonanceVisualMappingBlockedReason =
  | "STAR_RIVER_REFERENCE_INVALID"
  | "TIME_RESONANCE_MAPPING_BOUNDARY_INVALID"
  | "LATER_GENESIS_LAYER_REQUESTED";

export type GenesisTimeResonanceVisualMappingBoundary = Readonly<{
  timeLayerOnly: true;
  starLayerConsumedAsUpstream: true;
  moonLayerUntouched: true;
  symbolLayerUntouched: true;
  hexagramLayerUntouched: true;
  forceLayerUntouched: true;
  beastLayerUntouched: true;
  identityUntouched: true;
  birthDataUntouched: true;
  engineUntouched: true;
  sceneModelUntouched: true;
  renderPlanUntouched: true;
  rendererUntouched: true;
  uiFlowUntouched: true;
  storageUntouched: true;
}>;

export type GenesisTimeResonanceVisualMappingReady = Readonly<{
  status: "READY";
  mappingStatus: "TIME_RESONANCE_VISUAL_MAPPING_READY";
  source: "genesis_time_resonance_visual_mapping";
  input: GenesisTimeResonanceVisualMappingInput;
  state: GenesisTimeResonanceVisualState;
  boundary: GenesisTimeResonanceVisualMappingBoundary;
}>;

export type GenesisTimeResonanceVisualMappingUnavailable = Readonly<{
  status: "UNAVAILABLE";
  mappingStatus: "UNAVAILABLE";
  source: "genesis_time_resonance_visual_mapping";
  reason: GenesisTimeResonanceVisualMappingUnavailableReason;
  input: GenesisTimeResonanceVisualMappingInput;
  state: null;
  boundary: GenesisTimeResonanceVisualMappingBoundary;
}>;

export type GenesisTimeResonanceVisualMappingBlocked = Readonly<{
  status: "BLOCKED";
  mappingStatus: "BLOCKED";
  source: "genesis_time_resonance_visual_mapping";
  reason: GenesisTimeResonanceVisualMappingBlockedReason;
  input: GenesisTimeResonanceVisualMappingInput;
  state: null;
  boundary: GenesisTimeResonanceVisualMappingBoundary;
}>;

export type GenesisTimeResonanceVisualMappingResult =
  | GenesisTimeResonanceVisualMappingReady
  | GenesisTimeResonanceVisualMappingUnavailable
  | GenesisTimeResonanceVisualMappingBlocked;
