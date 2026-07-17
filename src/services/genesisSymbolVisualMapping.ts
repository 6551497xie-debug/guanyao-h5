import type {
  GenesisSymbolVisualMappingBlockedReason,
  GenesisSymbolVisualMappingBoundary,
  GenesisSymbolVisualMappingInput,
  GenesisSymbolVisualMappingResult,
  GenesisSymbolVisualMappingUnavailableReason,
  GenesisSymbolVisualState,
} from "../types/genesisSymbolVisualState";

const MAPPING_BOUNDARY: GenesisSymbolVisualMappingBoundary = Object.freeze({
  symbolLayerOnly: true,
  timeLayerConsumedAsUpstream: true,
  moonLayerUntouched: true,
  starLayerUntouched: true,
  hexagramLayerUntouched: true,
  forceLayerUntouched: true,
  beastLayerUntouched: true,
  identityUntouched: true,
  birthMansionUntouched: true,
  fourSymbolCalculationUntouched: true,
  motherCodeUntouched: true,
  engineUntouched: true,
  sceneModelUntouched: true,
  renderPlanUntouched: true,
  rendererUntouched: true,
  uiFlowUntouched: true,
  storageUntouched: true,
});

const unavailable = (
  input: GenesisSymbolVisualMappingInput,
  reason: GenesisSymbolVisualMappingUnavailableReason,
): GenesisSymbolVisualMappingResult => Object.freeze({
  status: "UNAVAILABLE" as const,
  mappingStatus: "UNAVAILABLE" as const,
  source: "genesis_symbol_visual_mapping" as const,
  reason,
  input,
  state: null,
  boundary: MAPPING_BOUNDARY,
});

const blocked = (
  input: GenesisSymbolVisualMappingInput,
  reason: GenesisSymbolVisualMappingBlockedReason,
): GenesisSymbolVisualMappingResult => Object.freeze({
  status: "BLOCKED" as const,
  mappingStatus: "BLOCKED" as const,
  source: "genesis_symbol_visual_mapping" as const,
  reason,
  input,
  state: null,
  boundary: MAPPING_BOUNDARY,
});

export function mapGenesisSymbolVisualState(
  input: GenesisSymbolVisualMappingInput,
): GenesisSymbolVisualMappingResult {
  const timeResonance = input.timeResonanceVisualState;
  if (timeResonance === null) {
    return unavailable(input, "TIME_RESONANCE_VISUAL_STATE_REQUIRED");
  }
  if (
    timeResonance.temporalEntryState !== "LIFE_TIME_DELIVERED_TO_STARS" ||
    timeResonance.starFieldResponse !== "STELLAR_RHYTHM_RESPONDS" ||
    timeResonance.temporalRhythm !== "SLOW_TIME_RESONANCE" ||
    timeResonance.alignmentState !== "TEMPORAL_MOMENT_STABILIZED" ||
    timeResonance.identityBlind !== true ||
    timeResonance.noIdentity !== true ||
    timeResonance.noBirthMansionResult !== true ||
    timeResonance.noFourSymbolResult !== true ||
    timeResonance.noHexagram !== true ||
    timeResonance.noMotherCode !== true ||
    timeResonance.noPersonalStarBeast !== true ||
    timeResonance.noEngineInvocation !== true ||
    timeResonance.noSceneModelInvocation !== true ||
    timeResonance.noRenderPlanInvocation !== true ||
    timeResonance.noRendererInvocation !== true
  ) {
    return blocked(input, "TIME_RESONANCE_REFERENCE_INVALID");
  }

  const state: GenesisSymbolVisualState = Object.freeze({
    symbolFieldPresence: "SYMBOL_FIELD_EMERGING",
    sevenMansionAggregation: "SEVEN_MANSION_RELATIONS_GATHERING",
    spatialMorphology: "FOUR_DIRECTIONAL_MOTION_FIELD",
    celestialSkeleton: "STAR_BONE_STRUCTURE_FORMING",
    symbolicRhythm: "SLOW_SYMBOLIC_DRIFT",
    alignmentState: "SYMBOL_FIELD_STABILIZED",
    symbolicMotionModes: [
      "SPROUTING_EXTENSION_CONNECTION",
      "CONVERGENT_BOUNDARY_CONDENSATION",
      "ASCENDING_EXPRESSION_REVEAL",
      "WRAPPED_CARRYING_SINKING",
    ] as const,
    timeResonanceReference: timeResonance,
    visualOnly: true,
    identityBlind: true,
    noIdentity: true,
    noBirthMansionResult: true,
    noFourSymbolResult: true,
    noHexagram: true,
    noMotherCode: true,
    noPersonalStarBeast: true,
    noEngineInvocation: true,
    noSceneModelInvocation: true,
    noRenderPlanInvocation: true,
    noRendererInvocation: true,
  });

  return Object.freeze({
    status: "READY" as const,
    mappingStatus: "SYMBOL_VISUAL_MAPPING_READY" as const,
    source: "genesis_symbol_visual_mapping" as const,
    input,
    state,
    boundary: MAPPING_BOUNDARY,
  });
}
