import type { GenesisPersonalStarBeastRevealVisualState } from "./genesisPersonalStarBeastRevealVisualState";

export type GenesisPresenceState = "LIFE_PRESENCE_ESTABLISHED";
export type GenesisLifeOrientation = "PRIMARY_AXIS_EMERGING";
export type GenesisBreathingRhythm = "SLOW_LIFE_BREATH";
export type GenesisStellarBodyCohesion = "STELLAR_BODY_COHESION_FORMING";
export type GenesisSilhouetteEmergence = "NON_LITERAL_SILHOUETTE_EMERGING";
export type GenesisCompanionPresence = "QUIET_COMPANIONSHIP";

export type GenesisPresenceExpressionMode =
  | "AXIS_DIRECTION"
  | "COHESIVE_STAR_BONE"
  | "SLOW_BREATH_RESPONSE"
  | "SILENT_COMPANIONSHIP";

export type GenesisPersonalStarBeastPresenceVisualState = Readonly<{
  presenceState: GenesisPresenceState;
  lifeOrientation: GenesisLifeOrientation;
  breathingRhythm: GenesisBreathingRhythm;
  stellarBodyCohesion: GenesisStellarBodyCohesion;
  silhouetteEmergence: GenesisSilhouetteEmergence;
  companionPresence: GenesisCompanionPresence;
  presenceExpressionModes: readonly [
    "AXIS_DIRECTION",
    "COHESIVE_STAR_BONE",
    "SLOW_BREATH_RESPONSE",
    "SILENT_COMPANIONSHIP",
  ];
  revealVisualReference: GenesisPersonalStarBeastRevealVisualState;
  visualOnly: true;
  identityBlind: true;
  noIdentityId: true;
  noMansionName: true;
  noFourSymbolName: true;
  noMotherCodeId: true;
  noLifeArchetypeId: true;
  noAnimalType: true;
  noRealityPressure: true;
  noCrystal: true;
  noEngineInvocation: true;
  noIdentitySourceInvocation: true;
  noSceneModelInvocation: true;
  noRenderPlanInvocation: true;
  noRendererInvocation: true;
  noStorageWrite: true;
}>;

export type GenesisPersonalStarBeastPresenceVisualMappingInput = Readonly<{
  revealVisualState: GenesisPersonalStarBeastRevealVisualState | null;
}>;

export type GenesisPersonalStarBeastPresenceVisualMappingUnavailableReason =
  | "REVEAL_VISUAL_STATE_REQUIRED"
  | "REVEAL_VISUAL_STATE_UNAVAILABLE";

export type GenesisPersonalStarBeastPresenceVisualMappingBlockedReason =
  | "REVEAL_VISUAL_REFERENCE_INVALID"
  | "PERSONAL_STAR_BEAST_PRESENCE_MAPPING_BOUNDARY_INVALID"
  | "LATER_EXPERIENCE_LAYER_REQUESTED";

export type GenesisPersonalStarBeastPresenceVisualMappingBoundary = Readonly<{
  presenceLayerOnly: true;
  revealLayerConsumedAsUpstream: true;
  identityUntouched: true;
  identitySourceUntouched: true;
  mansionUntouched: true;
  fourSymbolEngineUntouched: true;
  motherCodeUntouched: true;
  lifeArchetypeUntouched: true;
  hexagramEngineUntouched: true;
  realityUntouched: true;
  gravityUntouched: true;
  choiceUntouched: true;
  crystalUntouched: true;
  engineUntouched: true;
  sceneModelUntouched: true;
  renderPlanUntouched: true;
  rendererUntouched: true;
  uiFlowUntouched: true;
  storageUntouched: true;
  productionUntouched: true;
}>;

export type GenesisPersonalStarBeastPresenceVisualMappingReady = Readonly<{
  status: "READY";
  mappingStatus: "PERSONAL_STAR_BEAST_PRESENCE_VISUAL_MAPPING_READY";
  source: "genesis_personal_star_beast_presence_visual_mapping";
  input: GenesisPersonalStarBeastPresenceVisualMappingInput;
  state: GenesisPersonalStarBeastPresenceVisualState;
  boundary: GenesisPersonalStarBeastPresenceVisualMappingBoundary;
}>;

export type GenesisPersonalStarBeastPresenceVisualMappingUnavailable = Readonly<{
  status: "UNAVAILABLE";
  mappingStatus: "UNAVAILABLE";
  source: "genesis_personal_star_beast_presence_visual_mapping";
  reason: GenesisPersonalStarBeastPresenceVisualMappingUnavailableReason;
  input: GenesisPersonalStarBeastPresenceVisualMappingInput;
  state: null;
  boundary: GenesisPersonalStarBeastPresenceVisualMappingBoundary;
}>;

export type GenesisPersonalStarBeastPresenceVisualMappingBlocked = Readonly<{
  status: "BLOCKED";
  mappingStatus: "BLOCKED";
  source: "genesis_personal_star_beast_presence_visual_mapping";
  reason: GenesisPersonalStarBeastPresenceVisualMappingBlockedReason;
  input: GenesisPersonalStarBeastPresenceVisualMappingInput;
  state: null;
  boundary: GenesisPersonalStarBeastPresenceVisualMappingBoundary;
}>;

export type GenesisPersonalStarBeastPresenceVisualMappingResult =
  | GenesisPersonalStarBeastPresenceVisualMappingReady
  | GenesisPersonalStarBeastPresenceVisualMappingUnavailable
  | GenesisPersonalStarBeastPresenceVisualMappingBlocked;
