import type {
  GenesisHexagramVisualMappingBlockedReason,
  GenesisHexagramVisualMappingBoundary,
  GenesisHexagramVisualMappingInput,
  GenesisHexagramVisualMappingResult,
  GenesisHexagramVisualMappingUnavailableReason,
  GenesisHexagramVisualState,
} from "../types/genesisHexagramVisualState";

const MAPPING_BOUNDARY: GenesisHexagramVisualMappingBoundary = Object.freeze({
  hexagramLayerOnly: true,
  symbolLayerConsumedAsUpstream: true,
  moonLayerUntouched: true,
  starLayerUntouched: true,
  timeLayerUntouched: true,
  forceLayerUntouched: true,
  beastLayerUntouched: true,
  identityUntouched: true,
  fourSymbolUntouched: true,
  hexagramCalculationUntouched: true,
  motherCodeUntouched: true,
  lifeArchetypeUntouched: true,
  engineUntouched: true,
  sceneModelUntouched: true,
  renderPlanUntouched: true,
  rendererUntouched: true,
  uiFlowUntouched: true,
  storageUntouched: true,
});

const unavailable = (
  input: GenesisHexagramVisualMappingInput,
  reason: GenesisHexagramVisualMappingUnavailableReason,
): GenesisHexagramVisualMappingResult => Object.freeze({
  status: "UNAVAILABLE" as const,
  mappingStatus: "UNAVAILABLE" as const,
  source: "genesis_hexagram_visual_mapping" as const,
  reason,
  input,
  state: null,
  boundary: MAPPING_BOUNDARY,
});

const blocked = (
  input: GenesisHexagramVisualMappingInput,
  reason: GenesisHexagramVisualMappingBlockedReason,
): GenesisHexagramVisualMappingResult => Object.freeze({
  status: "BLOCKED" as const,
  mappingStatus: "BLOCKED" as const,
  source: "genesis_hexagram_visual_mapping" as const,
  reason,
  input,
  state: null,
  boundary: MAPPING_BOUNDARY,
});

export function mapGenesisHexagramVisualState(
  input: GenesisHexagramVisualMappingInput,
): GenesisHexagramVisualMappingResult {
  const symbol = input.symbolVisualState;
  if (symbol === null) {
    return unavailable(input, "SYMBOL_VISUAL_STATE_REQUIRED");
  }
  if (
    symbol.symbolFieldPresence !== "SYMBOL_FIELD_EMERGING" ||
    symbol.sevenMansionAggregation !== "SEVEN_MANSION_RELATIONS_GATHERING" ||
    symbol.spatialMorphology !== "FOUR_DIRECTIONAL_MOTION_FIELD" ||
    symbol.symbolicRhythm !== "SLOW_SYMBOLIC_DRIFT" ||
    symbol.alignmentState !== "SYMBOL_FIELD_STABILIZED" ||
    symbol.identityBlind !== true ||
    symbol.noIdentity !== true ||
    symbol.noBirthMansionResult !== true ||
    symbol.noFourSymbolResult !== true ||
    symbol.noHexagram !== true ||
    symbol.noMotherCode !== true ||
    symbol.noPersonalStarBeast !== true ||
    symbol.noEngineInvocation !== true ||
    symbol.noSceneModelInvocation !== true ||
    symbol.noRenderPlanInvocation !== true ||
    symbol.noRendererInvocation !== true
  ) {
    return blocked(input, "SYMBOL_VISUAL_REFERENCE_INVALID");
  }

  const state: GenesisHexagramVisualState = Object.freeze({
    changePatternPresence: "CHANGE_PATTERN_EMERGING",
    yinYangRhythmExpression: "CONTRACTION_EXPANSION_ALTERNATION",
    yaoStructureExpression: "SIX_LAYER_TRANSFORMATION_STRUCTURE",
    transformationTrace: "CONTINUOUS_STATE_TRANSITION_TRACE",
    imprintState: "LIFE_CHANGE_IMPRINT_FORMING",
    changeRhythmModes: [
      "CONTRACTION",
      "EXPANSION",
      "BRIGHTENING",
      "DIMMING",
      "CONTINUITY",
      "BREAK",
    ] as const,
    symbolVisualReference: symbol,
    visualOnly: true,
    identityBlind: true,
    noIdentity: true,
    noFourSymbolResult: true,
    noHexagramCalculationResult: true,
    noMotherCode: true,
    noLifeArchetype: true,
    noPersonalStarBeast: true,
    noEngineInvocation: true,
    noHexagramCalculationInvocation: true,
    noSceneModelInvocation: true,
    noRenderPlanInvocation: true,
    noRendererInvocation: true,
  });

  return Object.freeze({
    status: "READY" as const,
    mappingStatus: "HEXAGRAM_VISUAL_MAPPING_READY" as const,
    source: "genesis_hexagram_visual_mapping" as const,
    input,
    state,
    boundary: MAPPING_BOUNDARY,
  });
}
