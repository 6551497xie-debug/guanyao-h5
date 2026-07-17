import type { GenesisHexagramVisualState } from "../types/genesisHexagramVisualState";
import type { GenesisLifeForceVisualState } from "../types/genesisLifeForceVisualState";
import type { GenesisMoonOriginVisualState } from "../types/genesisMoonOriginVisualState";
import type { GenesisStarRiverVisualState } from "../types/genesisStarRiverVisualState";
import type { GenesisSymbolVisualState } from "../types/genesisSymbolVisualState";
import type { GenesisTimeResonanceVisualState } from "../types/genesisTimeResonanceVisualState";
import type {
  GenesisPersonalStarBeastRevealVisualMappingBlockedReason,
  GenesisPersonalStarBeastRevealVisualMappingBoundary,
  GenesisPersonalStarBeastRevealVisualMappingInput,
  GenesisPersonalStarBeastRevealVisualMappingResult,
  GenesisPersonalStarBeastRevealVisualMappingUnavailableReason,
  GenesisPersonalStarBeastRevealVisualState,
} from "../types/genesisPersonalStarBeastRevealVisualState";

const MAPPING_BOUNDARY: GenesisPersonalStarBeastRevealVisualMappingBoundary = Object.freeze({
  beastLayerOnly: true,
  moonLayerConsumedAsUpstream: true,
  starLayerConsumedAsUpstream: true,
  timeLayerConsumedAsUpstream: true,
  symbolLayerConsumedAsUpstream: true,
  hexagramLayerConsumedAsUpstream: true,
  forceLayerConsumedAsUpstream: true,
  identityUntouched: true,
  identitySourceUntouched: true,
  mansionUntouched: true,
  fourSymbolEngineUntouched: true,
  motherCodeUntouched: true,
  lifeArchetypeUntouched: true,
  hexagramEngineUntouched: true,
  realityPressureUntouched: true,
  crystalUntouched: true,
  engineUntouched: true,
  sceneModelUntouched: true,
  renderPlanUntouched: true,
  rendererUntouched: true,
  uiFlowUntouched: true,
  storageUntouched: true,
  productionUntouched: true,
});

const unavailable = (
  input: GenesisPersonalStarBeastRevealVisualMappingInput,
  reason: GenesisPersonalStarBeastRevealVisualMappingUnavailableReason,
): GenesisPersonalStarBeastRevealVisualMappingResult => Object.freeze({
  status: "UNAVAILABLE" as const,
  mappingStatus: "UNAVAILABLE" as const,
  source: "genesis_personal_star_beast_reveal_visual_mapping" as const,
  reason,
  input,
  state: null,
  boundary: MAPPING_BOUNDARY,
});

const blocked = (
  input: GenesisPersonalStarBeastRevealVisualMappingInput,
  reason: GenesisPersonalStarBeastRevealVisualMappingBlockedReason,
): GenesisPersonalStarBeastRevealVisualMappingResult => Object.freeze({
  status: "BLOCKED" as const,
  mappingStatus: "BLOCKED" as const,
  source: "genesis_personal_star_beast_reveal_visual_mapping" as const,
  reason,
  input,
  state: null,
  boundary: MAPPING_BOUNDARY,
});

const isValidVisualChain = (
  moon: GenesisMoonOriginVisualState,
  star: GenesisStarRiverVisualState,
  time: GenesisTimeResonanceVisualState,
  symbol: GenesisSymbolVisualState,
  hexagram: GenesisHexagramVisualState,
  force: GenesisLifeForceVisualState,
): boolean => (
  moon.lunarPresence === "TAIYIN_PRESENT" &&
  moon.moonPhaseExpression === "QUIET_ROUND_MOON" &&
  moon.identityBlind === true &&
  moon.noIdentity === true &&
  moon.noBirthData === true &&
  moon.noMansion === true &&
  moon.noFourSymbol === true &&
  moon.noMotherCode === true &&
  moon.noStarBeast === true &&
  star.starFieldPresence === "STELLAR_FIELD_PRESENT" &&
  star.stellarOrderExpression === "ORDERED_STELLAR_RELATIONS" &&
  star.mansionGroupExpression === "SEVEN_POINT_GROUP_TENDENCY" &&
  star.identityBlind === true &&
  star.noIdentity === true &&
  star.noMansionResult === true &&
  star.noFourSymbolResult === true &&
  star.noMotherCode === true &&
  star.noPersonalStarBeast === true &&
  star.moonOriginReference === moon &&
  time.temporalEntryState === "LIFE_TIME_DELIVERED_TO_STARS" &&
  time.moonPhaseTransitionExpression === "MOONLIGHT_GATHERS_TO_TIME" &&
  time.starFieldResponse === "STELLAR_RHYTHM_RESPONDS" &&
  time.identityBlind === true &&
  time.noIdentity === true &&
  time.noBirthMansionResult === true &&
  time.noFourSymbolResult === true &&
  time.noHexagram === true &&
  time.noMotherCode === true &&
  time.noPersonalStarBeast === true &&
  time.starRiverReference === star &&
  symbol.symbolFieldPresence === "SYMBOL_FIELD_EMERGING" &&
  symbol.sevenMansionAggregation === "SEVEN_MANSION_RELATIONS_GATHERING" &&
  symbol.spatialMorphology === "FOUR_DIRECTIONAL_MOTION_FIELD" &&
  symbol.celestialSkeleton === "STAR_BONE_STRUCTURE_FORMING" &&
  symbol.identityBlind === true &&
  symbol.noIdentity === true &&
  symbol.noBirthMansionResult === true &&
  symbol.noFourSymbolResult === true &&
  symbol.noHexagram === true &&
  symbol.noMotherCode === true &&
  symbol.noPersonalStarBeast === true &&
  symbol.timeResonanceReference === time &&
  hexagram.changePatternPresence === "CHANGE_PATTERN_EMERGING" &&
  hexagram.yinYangRhythmExpression === "CONTRACTION_EXPANSION_ALTERNATION" &&
  hexagram.yaoStructureExpression === "SIX_LAYER_TRANSFORMATION_STRUCTURE" &&
  hexagram.identityBlind === true &&
  hexagram.noIdentity === true &&
  hexagram.noFourSymbolResult === true &&
  hexagram.noHexagramCalculationResult === true &&
  hexagram.noMotherCode === true &&
  hexagram.noLifeArchetype === true &&
  hexagram.noPersonalStarBeast === true &&
  hexagram.symbolVisualReference === symbol &&
  force.forcePresence === "LIFE_FORCE_AWAKENING" &&
  force.rhythmExpression === "LIFE_RHYTHM_RECONFIGURING" &&
  force.movementExpression === "DYNAMIC_TENDENCY_EMERGING" &&
  force.coreActivation === "STAR_CORE_BREATH_REAWAKENING" &&
  force.forceInfluence === "STRUCTURE_RESPONDS_TO_FORCE" &&
  force.identityBlind === true &&
  force.noIdentity === true &&
  force.noMotherCode === true &&
  force.noLifeArchetype === true &&
  force.noPersonalStarBeast === true &&
  force.hexagramVisualReference === hexagram
);

export function mapGenesisPersonalStarBeastRevealVisualState(
  input: GenesisPersonalStarBeastRevealVisualMappingInput,
): GenesisPersonalStarBeastRevealVisualMappingResult {
  const { moonOriginVisualState, starRiverVisualState, timeResonanceVisualState, symbolVisualState, hexagramVisualState, lifeForceVisualState } = input;
  if (
    moonOriginVisualState === null ||
    starRiverVisualState === null ||
    timeResonanceVisualState === null ||
    symbolVisualState === null ||
    hexagramVisualState === null ||
    lifeForceVisualState === null
  ) {
    return unavailable(input, "UPSTREAM_VISUAL_STATES_REQUIRED");
  }
  if (!isValidVisualChain(moonOriginVisualState, starRiverVisualState, timeResonanceVisualState, symbolVisualState, hexagramVisualState, lifeForceVisualState)) {
    return blocked(input, "UPSTREAM_VISUAL_CHAIN_INVALID");
  }

  const state: GenesisPersonalStarBeastRevealVisualState = Object.freeze({
    revealPresence: "LIFE_PRESENCE_RETURNING",
    stellarBodyFormation: "STELLAR_LIFE_STRUCTURE_FORMED",
    symbolicEmbodiment: "SYMBOLIC_FIELD_CARRIED",
    forceExpression: "LIFE_FORCE_RHYTHM_EMBODIED",
    lifePresenceRhythm: "QUIET_LIFE_PRESENCE_RHYTHM",
    revealCompletion: "PERSONAL_STAR_BEAST_REVEAL_COMPLETE",
    revealRhythmStages: ["PRESENCE", "FORMATION", "RETURN"] as const,
    moonOriginVisualReference: moonOriginVisualState,
    starRiverVisualReference: starRiverVisualState,
    timeResonanceVisualReference: timeResonanceVisualState,
    symbolVisualReference: symbolVisualState,
    hexagramVisualReference: hexagramVisualState,
    lifeForceVisualReference: lifeForceVisualState,
    visualOnly: true,
    identityBlind: true,
    noIdentityId: true,
    noMansionName: true,
    noFourSymbolName: true,
    noMotherCodeId: true,
    noLifeArchetypeId: true,
    noUserData: true,
    noAnimalType: true,
    noFourSymbolResult: true,
    noMotherCodeResult: true,
    noLifeArchetypeResult: true,
    noRealityPressure: true,
    noCrystal: true,
    noEngineInvocation: true,
    noIdentitySourceInvocation: true,
    noRendererInvocation: true,
    noSceneModelInvocation: true,
    noRenderPlanInvocation: true,
    noStorageWrite: true,
  });

  return Object.freeze({
    status: "READY" as const,
    mappingStatus: "PERSONAL_STAR_BEAST_REVEAL_VISUAL_MAPPING_READY" as const,
    source: "genesis_personal_star_beast_reveal_visual_mapping" as const,
    input,
    state,
    boundary: MAPPING_BOUNDARY,
  });
}
