import type {
  GenesisTimeResonanceVisualMappingBlockedReason,
  GenesisTimeResonanceVisualMappingBoundary,
  GenesisTimeResonanceVisualMappingInput,
  GenesisTimeResonanceVisualMappingResult,
  GenesisTimeResonanceVisualMappingUnavailableReason,
  GenesisTimeResonanceVisualState,
} from "../types/genesisTimeResonanceVisualState";

const MAPPING_BOUNDARY: GenesisTimeResonanceVisualMappingBoundary = Object.freeze({
  timeLayerOnly: true,
  starLayerConsumedAsUpstream: true,
  moonLayerUntouched: true,
  symbolLayerUntouched: true,
  hexagramLayerUntouched: true,
  forceLayerUntouched: true,
  beastLayerUntouched: true,
  identityUntouched: true,
  birthDataUntouched: true,
  engineUntouched: true,
  sceneModelUntouched: true,
  renderPlanUntouched: true,
  rendererUntouched: true,
  uiFlowUntouched: true,
  storageUntouched: true,
});

const unavailable = (
  input: GenesisTimeResonanceVisualMappingInput,
  reason: GenesisTimeResonanceVisualMappingUnavailableReason,
): GenesisTimeResonanceVisualMappingResult => Object.freeze({
  status: "UNAVAILABLE" as const,
  mappingStatus: "UNAVAILABLE" as const,
  source: "genesis_time_resonance_visual_mapping" as const,
  reason,
  input,
  state: null,
  boundary: MAPPING_BOUNDARY,
});

const blocked = (
  input: GenesisTimeResonanceVisualMappingInput,
  reason: GenesisTimeResonanceVisualMappingBlockedReason,
): GenesisTimeResonanceVisualMappingResult => Object.freeze({
  status: "BLOCKED" as const,
  mappingStatus: "BLOCKED" as const,
  source: "genesis_time_resonance_visual_mapping" as const,
  reason,
  input,
  state: null,
  boundary: MAPPING_BOUNDARY,
});

export function mapGenesisTimeResonanceVisualState(
  input: GenesisTimeResonanceVisualMappingInput,
): GenesisTimeResonanceVisualMappingResult {
  const starRiver = input.starRiverVisualState;
  if (starRiver === null) {
    return unavailable(input, "STAR_RIVER_VISUAL_STATE_REQUIRED");
  }
  if (
    starRiver.starFieldPresence !== "STELLAR_FIELD_PRESENT" ||
    starRiver.stellarOrderExpression !== "ORDERED_STELLAR_RELATIONS" ||
    starRiver.celestialMotionRhythm !== "SLOW_CELESTIAL_DRIFT" ||
    starRiver.identityBlind !== true ||
    starRiver.noIdentity !== true ||
    starRiver.noBirthTime !== true ||
    starRiver.noMansionResult !== true ||
    starRiver.noFourSymbolResult !== true ||
    starRiver.noMotherCode !== true ||
    starRiver.noPersonalStarBeast !== true ||
    starRiver.noEngineInvocation !== true ||
    starRiver.noSceneModelInvocation !== true ||
    starRiver.noRenderPlanInvocation !== true ||
    starRiver.noRendererInvocation !== true
  ) {
    return blocked(input, "STAR_RIVER_REFERENCE_INVALID");
  }

  const state: GenesisTimeResonanceVisualState = Object.freeze({
    temporalEntryState: "LIFE_TIME_DELIVERED_TO_STARS",
    moonPhaseTransitionExpression: "MOONLIGHT_GATHERS_TO_TIME",
    starFieldResponse: "STELLAR_RHYTHM_RESPONDS",
    temporalRhythm: "SLOW_TIME_RESONANCE",
    alignmentState: "TEMPORAL_MOMENT_STABILIZED",
    starRiverReference: starRiver,
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
    mappingStatus: "TIME_RESONANCE_VISUAL_MAPPING_READY" as const,
    source: "genesis_time_resonance_visual_mapping" as const,
    input,
    state,
    boundary: MAPPING_BOUNDARY,
  });
}
