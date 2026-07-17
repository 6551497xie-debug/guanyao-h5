import type {
  GenesisLifeForceVisualMappingBlockedReason,
  GenesisLifeForceVisualMappingBoundary,
  GenesisLifeForceVisualMappingInput,
  GenesisLifeForceVisualMappingResult,
  GenesisLifeForceVisualMappingUnavailableReason,
  GenesisLifeForceVisualState,
} from "../types/genesisLifeForceVisualState";

const MAPPING_BOUNDARY: GenesisLifeForceVisualMappingBoundary = Object.freeze({
  forceLayerOnly: true,
  hexagramLayerConsumedAsUpstream: true,
  moonLayerUntouched: true,
  starLayerUntouched: true,
  timeLayerUntouched: true,
  symbolLayerUntouched: true,
  beastLayerUntouched: true,
  identityUntouched: true,
  motherCodeUntouched: true,
  lifeArchetypeUntouched: true,
  eightArchetypeNamesUntouched: true,
  hexagramUntouched: true,
  engineUntouched: true,
  sceneModelUntouched: true,
  renderPlanUntouched: true,
  rendererUntouched: true,
  uiFlowUntouched: true,
  storageUntouched: true,
});

const unavailable = (
  input: GenesisLifeForceVisualMappingInput,
  reason: GenesisLifeForceVisualMappingUnavailableReason,
): GenesisLifeForceVisualMappingResult => Object.freeze({
  status: "UNAVAILABLE" as const,
  mappingStatus: "UNAVAILABLE" as const,
  source: "genesis_life_force_visual_mapping" as const,
  reason,
  input,
  state: null,
  boundary: MAPPING_BOUNDARY,
});

const blocked = (
  input: GenesisLifeForceVisualMappingInput,
  reason: GenesisLifeForceVisualMappingBlockedReason,
): GenesisLifeForceVisualMappingResult => Object.freeze({
  status: "BLOCKED" as const,
  mappingStatus: "BLOCKED" as const,
  source: "genesis_life_force_visual_mapping" as const,
  reason,
  input,
  state: null,
  boundary: MAPPING_BOUNDARY,
});

export function mapGenesisLifeForceVisualState(
  input: GenesisLifeForceVisualMappingInput,
): GenesisLifeForceVisualMappingResult {
  const hexagram = input.hexagramVisualState;
  if (hexagram === null) {
    return unavailable(input, "HEXAGRAM_VISUAL_STATE_REQUIRED");
  }
  if (
    hexagram.changePatternPresence !== "CHANGE_PATTERN_EMERGING" ||
    hexagram.yinYangRhythmExpression !== "CONTRACTION_EXPANSION_ALTERNATION" ||
    hexagram.yaoStructureExpression !== "SIX_LAYER_TRANSFORMATION_STRUCTURE" ||
    hexagram.transformationTrace !== "CONTINUOUS_STATE_TRANSITION_TRACE" ||
    hexagram.imprintState !== "LIFE_CHANGE_IMPRINT_FORMING" ||
    hexagram.identityBlind !== true ||
    hexagram.noIdentity !== true ||
    hexagram.noFourSymbolResult !== true ||
    hexagram.noHexagramCalculationResult !== true ||
    hexagram.noMotherCode !== true ||
    hexagram.noLifeArchetype !== true ||
    hexagram.noPersonalStarBeast !== true ||
    hexagram.noEngineInvocation !== true ||
    hexagram.noHexagramCalculationInvocation !== true ||
    hexagram.noSceneModelInvocation !== true ||
    hexagram.noRenderPlanInvocation !== true ||
    hexagram.noRendererInvocation !== true
  ) {
    return blocked(input, "HEXAGRAM_VISUAL_REFERENCE_INVALID");
  }

  const state: GenesisLifeForceVisualState = Object.freeze({
    forcePresence: "LIFE_FORCE_AWAKENING",
    rhythmExpression: "LIFE_RHYTHM_RECONFIGURING",
    movementExpression: "DYNAMIC_TENDENCY_EMERGING",
    coreActivation: "STAR_CORE_BREATH_REAWAKENING",
    forceInfluence: "STRUCTURE_RESPONDS_TO_FORCE",
    forceExpressionModes: [
      "BREATH_RATE_SHIFT",
      "AGGREGATION_RHYTHM_SHIFT",
      "LIGHT_FLOW_RHYTHM_SHIFT",
      "STRUCTURE_RESPONSE_SHIFT",
    ] as const,
    hexagramVisualReference: hexagram,
    visualOnly: true,
    identityBlind: true,
    noIdentity: true,
    noMotherCode: true,
    noLifeArchetype: true,
    noEightArchetypeNames: true,
    noPersonalStarBeast: true,
    noEngineInvocation: true,
    noMotherCodeEngineInvocation: true,
    noLifeArchetypeEngineInvocation: true,
    noHexagramMutation: true,
    noSceneModelInvocation: true,
    noRenderPlanInvocation: true,
    noRendererInvocation: true,
  });

  return Object.freeze({
    status: "READY" as const,
    mappingStatus: "LIFE_FORCE_VISUAL_MAPPING_READY" as const,
    source: "genesis_life_force_visual_mapping" as const,
    input,
    state,
    boundary: MAPPING_BOUNDARY,
  });
}
