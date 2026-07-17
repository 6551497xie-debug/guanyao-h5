import type { GenesisHexagramVisualState } from "./genesisHexagramVisualState";

export type GenesisForcePresence = "LIFE_FORCE_AWAKENING";
export type GenesisForceRhythmExpression = "LIFE_RHYTHM_RECONFIGURING";
export type GenesisForceMovementExpression = "DYNAMIC_TENDENCY_EMERGING";
export type GenesisForceCoreActivation = "STAR_CORE_BREATH_REAWAKENING";
export type GenesisForceInfluence = "STRUCTURE_RESPONDS_TO_FORCE";

export type GenesisForceExpressionMode =
  | "BREATH_RATE_SHIFT"
  | "AGGREGATION_RHYTHM_SHIFT"
  | "LIGHT_FLOW_RHYTHM_SHIFT"
  | "STRUCTURE_RESPONSE_SHIFT";

export type GenesisLifeForceVisualState = Readonly<{
  forcePresence: GenesisForcePresence;
  rhythmExpression: GenesisForceRhythmExpression;
  movementExpression: GenesisForceMovementExpression;
  coreActivation: GenesisForceCoreActivation;
  forceInfluence: GenesisForceInfluence;
  forceExpressionModes: readonly [
    "BREATH_RATE_SHIFT",
    "AGGREGATION_RHYTHM_SHIFT",
    "LIGHT_FLOW_RHYTHM_SHIFT",
    "STRUCTURE_RESPONSE_SHIFT",
  ];
  hexagramVisualReference: GenesisHexagramVisualState;
  visualOnly: true;
  identityBlind: true;
  noIdentity: true;
  noMotherCode: true;
  noLifeArchetype: true;
  noEightArchetypeNames: true;
  noPersonalStarBeast: true;
  noEngineInvocation: true;
  noMotherCodeEngineInvocation: true;
  noLifeArchetypeEngineInvocation: true;
  noHexagramMutation: true;
  noSceneModelInvocation: true;
  noRenderPlanInvocation: true;
  noRendererInvocation: true;
}>;

export type GenesisLifeForceVisualMappingInput = Readonly<{
  hexagramVisualState: GenesisHexagramVisualState | null;
}>;

export type GenesisLifeForceVisualMappingUnavailableReason =
  | "HEXAGRAM_VISUAL_STATE_REQUIRED"
  | "HEXAGRAM_VISUAL_STATE_UNAVAILABLE";

export type GenesisLifeForceVisualMappingBlockedReason =
  | "HEXAGRAM_VISUAL_REFERENCE_INVALID"
  | "LIFE_FORCE_VISUAL_MAPPING_BOUNDARY_INVALID"
  | "LATER_GENESIS_LAYER_REQUESTED";

export type GenesisLifeForceVisualMappingBoundary = Readonly<{
  forceLayerOnly: true;
  hexagramLayerConsumedAsUpstream: true;
  moonLayerUntouched: true;
  starLayerUntouched: true;
  timeLayerUntouched: true;
  symbolLayerUntouched: true;
  beastLayerUntouched: true;
  identityUntouched: true;
  motherCodeUntouched: true;
  lifeArchetypeUntouched: true;
  eightArchetypeNamesUntouched: true;
  hexagramUntouched: true;
  engineUntouched: true;
  sceneModelUntouched: true;
  renderPlanUntouched: true;
  rendererUntouched: true;
  uiFlowUntouched: true;
  storageUntouched: true;
}>;

export type GenesisLifeForceVisualMappingReady = Readonly<{
  status: "READY";
  mappingStatus: "LIFE_FORCE_VISUAL_MAPPING_READY";
  source: "genesis_life_force_visual_mapping";
  input: GenesisLifeForceVisualMappingInput;
  state: GenesisLifeForceVisualState;
  boundary: GenesisLifeForceVisualMappingBoundary;
}>;

export type GenesisLifeForceVisualMappingUnavailable = Readonly<{
  status: "UNAVAILABLE";
  mappingStatus: "UNAVAILABLE";
  source: "genesis_life_force_visual_mapping";
  reason: GenesisLifeForceVisualMappingUnavailableReason;
  input: GenesisLifeForceVisualMappingInput;
  state: null;
  boundary: GenesisLifeForceVisualMappingBoundary;
}>;

export type GenesisLifeForceVisualMappingBlocked = Readonly<{
  status: "BLOCKED";
  mappingStatus: "BLOCKED";
  source: "genesis_life_force_visual_mapping";
  reason: GenesisLifeForceVisualMappingBlockedReason;
  input: GenesisLifeForceVisualMappingInput;
  state: null;
  boundary: GenesisLifeForceVisualMappingBoundary;
}>;

export type GenesisLifeForceVisualMappingResult =
  | GenesisLifeForceVisualMappingReady
  | GenesisLifeForceVisualMappingUnavailable
  | GenesisLifeForceVisualMappingBlocked;
