import type { GenesisMoonOriginVisualState } from "./genesisMoonOriginVisualState";

export type GenesisStarFieldPresence = "STELLAR_FIELD_PRESENT";
export type GenesisStellarOrderExpression = "ORDERED_STELLAR_RELATIONS";
export type GenesisMansionGroupExpression = "SEVEN_POINT_GROUP_TENDENCY";
export type GenesisCelestialMotionRhythm = "SLOW_CELESTIAL_DRIFT";
export type GenesisSpatialDepthExpression = "DEEP_LAYERED_COSMOS";
export type GenesisObservationState = "QUIET_OBSERVATION";

export type GenesisStarRiverVisualState = Readonly<{
  starFieldPresence: GenesisStarFieldPresence;
  stellarOrderExpression: GenesisStellarOrderExpression;
  mansionGroupExpression: GenesisMansionGroupExpression;
  celestialMotionRhythm: GenesisCelestialMotionRhythm;
  spatialDepthExpression: GenesisSpatialDepthExpression;
  observationState: GenesisObservationState;
  moonOriginReference: GenesisMoonOriginVisualState;
  visualOnly: true;
  identityBlind: true;
  noIdentity: true;
  noBirthTime: true;
  noMansionResult: true;
  noFourSymbolResult: true;
  noMotherCode: true;
  noPersonalStarBeast: true;
  noEngineInvocation: true;
  noSceneModelInvocation: true;
  noRenderPlanInvocation: true;
  noRendererInvocation: true;
}>;

export type GenesisStarRiverVisualMappingInput = Readonly<{
  moonOriginVisualState: GenesisMoonOriginVisualState | null;
}>;

export type GenesisStarRiverVisualMappingUnavailableReason =
  | "MOON_ORIGIN_VISUAL_STATE_REQUIRED"
  | "MOON_ORIGIN_VISUAL_STATE_UNAVAILABLE";

export type GenesisStarRiverVisualMappingBlockedReason =
  | "MOON_ORIGIN_REFERENCE_INVALID"
  | "STAR_RIVER_MAPPING_BOUNDARY_INVALID"
  | "LATER_GENESIS_LAYER_REQUESTED";

export type GenesisStarRiverVisualMappingBoundary = Readonly<{
  starLayerOnly: true;
  moonLayerConsumedAsUpstream: true;
  timeLayerUntouched: true;
  symbolLayerUntouched: true;
  hexagramLayerUntouched: true;
  forceLayerUntouched: true;
  beastLayerUntouched: true;
  identityUntouched: true;
  engineUntouched: true;
  sceneModelUntouched: true;
  renderPlanUntouched: true;
  rendererUntouched: true;
  uiFlowUntouched: true;
  storageUntouched: true;
}>;

export type GenesisStarRiverVisualMappingReady = Readonly<{
  status: "READY";
  mappingStatus: "STAR_RIVER_VISUAL_MAPPING_READY";
  source: "genesis_star_river_visual_mapping";
  input: GenesisStarRiverVisualMappingInput;
  state: GenesisStarRiverVisualState;
  boundary: GenesisStarRiverVisualMappingBoundary;
}>;

export type GenesisStarRiverVisualMappingUnavailable = Readonly<{
  status: "UNAVAILABLE";
  mappingStatus: "UNAVAILABLE";
  source: "genesis_star_river_visual_mapping";
  reason: GenesisStarRiverVisualMappingUnavailableReason;
  input: GenesisStarRiverVisualMappingInput;
  state: null;
  boundary: GenesisStarRiverVisualMappingBoundary;
}>;

export type GenesisStarRiverVisualMappingBlocked = Readonly<{
  status: "BLOCKED";
  mappingStatus: "BLOCKED";
  source: "genesis_star_river_visual_mapping";
  reason: GenesisStarRiverVisualMappingBlockedReason;
  input: GenesisStarRiverVisualMappingInput;
  state: null;
  boundary: GenesisStarRiverVisualMappingBoundary;
}>;

export type GenesisStarRiverVisualMappingResult =
  | GenesisStarRiverVisualMappingReady
  | GenesisStarRiverVisualMappingUnavailable
  | GenesisStarRiverVisualMappingBlocked;
