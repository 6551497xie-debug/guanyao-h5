import type { GenesisHexagramVisualState } from "./genesisHexagramVisualState";
import type { GenesisLifeForceVisualState } from "./genesisLifeForceVisualState";
import type { GenesisMoonOriginVisualState } from "./genesisMoonOriginVisualState";
import type { GenesisStarRiverVisualState } from "./genesisStarRiverVisualState";
import type { GenesisSymbolVisualState } from "./genesisSymbolVisualState";
import type { GenesisTimeResonanceVisualState } from "./genesisTimeResonanceVisualState";

export type GenesisRevealPresence = "LIFE_PRESENCE_RETURNING";
export type GenesisStellarBodyFormation = "STELLAR_LIFE_STRUCTURE_FORMED";
export type GenesisSymbolicEmbodiment = "SYMBOLIC_FIELD_CARRIED";
export type GenesisRevealForceExpression = "LIFE_FORCE_RHYTHM_EMBODIED";
export type GenesisLifePresenceRhythm = "QUIET_LIFE_PRESENCE_RHYTHM";
export type GenesisRevealCompletion = "PERSONAL_STAR_BEAST_REVEAL_COMPLETE";

export type GenesisRevealRhythmStage = "PRESENCE" | "FORMATION" | "RETURN";

export type GenesisPersonalStarBeastRevealVisualState = Readonly<{
  revealPresence: GenesisRevealPresence;
  stellarBodyFormation: GenesisStellarBodyFormation;
  symbolicEmbodiment: GenesisSymbolicEmbodiment;
  forceExpression: GenesisRevealForceExpression;
  lifePresenceRhythm: GenesisLifePresenceRhythm;
  revealCompletion: GenesisRevealCompletion;
  revealRhythmStages: readonly ["PRESENCE", "FORMATION", "RETURN"];
  moonOriginVisualReference: GenesisMoonOriginVisualState;
  starRiverVisualReference: GenesisStarRiverVisualState;
  timeResonanceVisualReference: GenesisTimeResonanceVisualState;
  symbolVisualReference: GenesisSymbolVisualState;
  hexagramVisualReference: GenesisHexagramVisualState;
  lifeForceVisualReference: GenesisLifeForceVisualState;
  visualOnly: true;
  identityBlind: true;
  noIdentityId: true;
  noMansionName: true;
  noFourSymbolName: true;
  noMotherCodeId: true;
  noLifeArchetypeId: true;
  noUserData: true;
  noAnimalType: true;
  noFourSymbolResult: true;
  noMotherCodeResult: true;
  noLifeArchetypeResult: true;
  noRealityPressure: true;
  noCrystal: true;
  noEngineInvocation: true;
  noIdentitySourceInvocation: true;
  noRendererInvocation: true;
  noSceneModelInvocation: true;
  noRenderPlanInvocation: true;
  noStorageWrite: true;
}>;

export type GenesisPersonalStarBeastRevealVisualMappingInput = Readonly<{
  moonOriginVisualState: GenesisMoonOriginVisualState | null;
  starRiverVisualState: GenesisStarRiverVisualState | null;
  timeResonanceVisualState: GenesisTimeResonanceVisualState | null;
  symbolVisualState: GenesisSymbolVisualState | null;
  hexagramVisualState: GenesisHexagramVisualState | null;
  lifeForceVisualState: GenesisLifeForceVisualState | null;
}>;

export type GenesisPersonalStarBeastRevealVisualMappingUnavailableReason =
  | "UPSTREAM_VISUAL_STATES_REQUIRED"
  | "UPSTREAM_VISUAL_STATE_UNAVAILABLE";

export type GenesisPersonalStarBeastRevealVisualMappingBlockedReason =
  | "UPSTREAM_VISUAL_CHAIN_INVALID"
  | "PERSONAL_STAR_BEAST_REVEAL_MAPPING_BOUNDARY_INVALID"
  | "LATER_EXPERIENCE_LAYER_REQUESTED";

export type GenesisPersonalStarBeastRevealVisualMappingBoundary = Readonly<{
  beastLayerOnly: true;
  moonLayerConsumedAsUpstream: true;
  starLayerConsumedAsUpstream: true;
  timeLayerConsumedAsUpstream: true;
  symbolLayerConsumedAsUpstream: true;
  hexagramLayerConsumedAsUpstream: true;
  forceLayerConsumedAsUpstream: true;
  identityUntouched: true;
  identitySourceUntouched: true;
  mansionUntouched: true;
  fourSymbolEngineUntouched: true;
  motherCodeUntouched: true;
  lifeArchetypeUntouched: true;
  hexagramEngineUntouched: true;
  realityPressureUntouched: true;
  crystalUntouched: true;
  engineUntouched: true;
  sceneModelUntouched: true;
  renderPlanUntouched: true;
  rendererUntouched: true;
  uiFlowUntouched: true;
  storageUntouched: true;
  productionUntouched: true;
}>;

export type GenesisPersonalStarBeastRevealVisualMappingReady = Readonly<{
  status: "READY";
  mappingStatus: "PERSONAL_STAR_BEAST_REVEAL_VISUAL_MAPPING_READY";
  source: "genesis_personal_star_beast_reveal_visual_mapping";
  input: GenesisPersonalStarBeastRevealVisualMappingInput;
  state: GenesisPersonalStarBeastRevealVisualState;
  boundary: GenesisPersonalStarBeastRevealVisualMappingBoundary;
}>;

export type GenesisPersonalStarBeastRevealVisualMappingUnavailable = Readonly<{
  status: "UNAVAILABLE";
  mappingStatus: "UNAVAILABLE";
  source: "genesis_personal_star_beast_reveal_visual_mapping";
  reason: GenesisPersonalStarBeastRevealVisualMappingUnavailableReason;
  input: GenesisPersonalStarBeastRevealVisualMappingInput;
  state: null;
  boundary: GenesisPersonalStarBeastRevealVisualMappingBoundary;
}>;

export type GenesisPersonalStarBeastRevealVisualMappingBlocked = Readonly<{
  status: "BLOCKED";
  mappingStatus: "BLOCKED";
  source: "genesis_personal_star_beast_reveal_visual_mapping";
  reason: GenesisPersonalStarBeastRevealVisualMappingBlockedReason;
  input: GenesisPersonalStarBeastRevealVisualMappingInput;
  state: null;
  boundary: GenesisPersonalStarBeastRevealVisualMappingBoundary;
}>;

export type GenesisPersonalStarBeastRevealVisualMappingResult =
  | GenesisPersonalStarBeastRevealVisualMappingReady
  | GenesisPersonalStarBeastRevealVisualMappingUnavailable
  | GenesisPersonalStarBeastRevealVisualMappingBlocked;
