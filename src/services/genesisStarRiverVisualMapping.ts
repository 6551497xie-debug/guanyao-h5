import type {
  GenesisStarRiverVisualMappingBlockedReason,
  GenesisStarRiverVisualMappingBoundary,
  GenesisStarRiverVisualMappingInput,
  GenesisStarRiverVisualMappingResult,
  GenesisStarRiverVisualMappingUnavailableReason,
  GenesisStarRiverVisualState,
} from "../types/genesisStarRiverVisualState";

const MAPPING_BOUNDARY: GenesisStarRiverVisualMappingBoundary = Object.freeze({
  starLayerOnly: true,
  moonLayerConsumedAsUpstream: true,
  timeLayerUntouched: true,
  symbolLayerUntouched: true,
  hexagramLayerUntouched: true,
  forceLayerUntouched: true,
  beastLayerUntouched: true,
  identityUntouched: true,
  engineUntouched: true,
  sceneModelUntouched: true,
  renderPlanUntouched: true,
  rendererUntouched: true,
  uiFlowUntouched: true,
  storageUntouched: true,
});

const unavailable = (
  input: GenesisStarRiverVisualMappingInput,
  reason: GenesisStarRiverVisualMappingUnavailableReason,
): GenesisStarRiverVisualMappingResult => Object.freeze({
  status: "UNAVAILABLE" as const,
  mappingStatus: "UNAVAILABLE" as const,
  source: "genesis_star_river_visual_mapping" as const,
  reason,
  input,
  state: null,
  boundary: MAPPING_BOUNDARY,
});

const blocked = (
  input: GenesisStarRiverVisualMappingInput,
  reason: GenesisStarRiverVisualMappingBlockedReason,
): GenesisStarRiverVisualMappingResult => Object.freeze({
  status: "BLOCKED" as const,
  mappingStatus: "BLOCKED" as const,
  source: "genesis_star_river_visual_mapping" as const,
  reason,
  input,
  state: null,
  boundary: MAPPING_BOUNDARY,
});

export function mapGenesisStarRiverVisualState(
  input: GenesisStarRiverVisualMappingInput,
): GenesisStarRiverVisualMappingResult {
  const moon = input.moonOriginVisualState;
  if (moon === null) {
    return unavailable(input, "MOON_ORIGIN_VISUAL_STATE_REQUIRED");
  }
  if (
    moon.lunarPresence !== "TAIYIN_PRESENT" ||
    moon.moonPhaseExpression !== "QUIET_ROUND_MOON" ||
    moon.temporalRhythm !== "SLOW_STABLE_BREATH" ||
    moon.identityBlind !== true ||
    moon.noIdentity !== true ||
    moon.noBirthData !== true ||
    moon.noMansion !== true ||
    moon.noFourSymbol !== true ||
    moon.noMotherCode !== true ||
    moon.noStarBeast !== true ||
    moon.noEngineInvocation !== true ||
    moon.noSceneModelInvocation !== true ||
    moon.noRenderPlanInvocation !== true ||
    moon.noRendererInvocation !== true
  ) {
    return blocked(input, "MOON_ORIGIN_REFERENCE_INVALID");
  }

  const state: GenesisStarRiverVisualState = Object.freeze({
    starFieldPresence: "STELLAR_FIELD_PRESENT",
    stellarOrderExpression: "ORDERED_STELLAR_RELATIONS",
    mansionGroupExpression: "SEVEN_POINT_GROUP_TENDENCY",
    celestialMotionRhythm: "SLOW_CELESTIAL_DRIFT",
    spatialDepthExpression: "DEEP_LAYERED_COSMOS",
    observationState: "QUIET_OBSERVATION",
    moonOriginReference: moon,
    visualOnly: true,
    identityBlind: true,
    noIdentity: true,
    noBirthTime: true,
    noMansionResult: true,
    noFourSymbolResult: true,
    noMotherCode: true,
    noPersonalStarBeast: true,
    noEngineInvocation: true,
    noSceneModelInvocation: true,
    noRenderPlanInvocation: true,
    noRendererInvocation: true,
  });

  return Object.freeze({
    status: "READY" as const,
    mappingStatus: "STAR_RIVER_VISUAL_MAPPING_READY" as const,
    source: "genesis_star_river_visual_mapping" as const,
    input,
    state,
    boundary: MAPPING_BOUNDARY,
  });
}
