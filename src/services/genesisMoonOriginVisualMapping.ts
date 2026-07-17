import type {
  GenesisMoonOriginFirstScreenCopy,
  GenesisMoonOriginVisualMappingBlockedReason,
  GenesisMoonOriginVisualMappingBoundary,
  GenesisMoonOriginVisualMappingInput,
  GenesisMoonOriginVisualMappingResult,
  GenesisMoonOriginVisualMappingUnavailableReason,
  GenesisMoonOriginVisualState,
} from "../types/genesisMoonOriginVisualState";

const MAPPING_BOUNDARY: GenesisMoonOriginVisualMappingBoundary = Object.freeze({
  moonLayerOnly: true,
  laterGenesisLayersUntouched: true,
  identityUntouched: true,
  engineUntouched: true,
  sceneModelUntouched: true,
  renderPlanUntouched: true,
  rendererUntouched: true,
  uiFlowUntouched: true,
  storageUntouched: true,
});

const FIRST_SCREEN_COPY: GenesisMoonOriginFirstScreenCopy = Object.freeze({
  primary: "日月运行，星辰有序。",
  secondary: "你的星位，映照了你来到这个世界时的样子。",
});

const unavailable = (
  input: GenesisMoonOriginVisualMappingInput,
  reason: GenesisMoonOriginVisualMappingUnavailableReason,
): GenesisMoonOriginVisualMappingResult => Object.freeze({
  status: "UNAVAILABLE" as const,
  mappingStatus: "UNAVAILABLE" as const,
  source: "genesis_moon_origin_visual_mapping" as const,
  reason,
  input,
  state: null,
  boundary: MAPPING_BOUNDARY,
});

const blocked = (
  input: GenesisMoonOriginVisualMappingInput,
  reason: GenesisMoonOriginVisualMappingBlockedReason,
): GenesisMoonOriginVisualMappingResult => Object.freeze({
  status: "BLOCKED" as const,
  mappingStatus: "BLOCKED" as const,
  source: "genesis_moon_origin_visual_mapping" as const,
  reason,
  input,
  state: null,
  boundary: MAPPING_BOUNDARY,
});

export function mapGenesisMoonOriginVisualState(
  input: GenesisMoonOriginVisualMappingInput,
): GenesisMoonOriginVisualMappingResult {
  const mapping = input.semanticMapping;
  if (mapping === null) {
    return unavailable(input, "MOON_SEMANTIC_MAPPING_REQUIRED");
  }
  if (mapping.semanticLayer !== "MOON") {
    return blocked(input, "SEMANTIC_LAYER_NOT_MOON");
  }
  if (
    mapping.visualOnly !== true ||
    mapping.identityBlind !== true ||
    mapping.noIdentityCalculation !== true ||
    mapping.noEngineInvocation !== true ||
    mapping.noRendererInvocation !== true ||
    mapping.noSceneModelInvocation !== true ||
    mapping.noRenderPlanInvocation !== true ||
    mapping.allowedExpression.length === 0 ||
    mapping.forbiddenExpression.length === 0
  ) {
    return blocked(input, "MOON_MAPPING_BOUNDARY_INVALID");
  }
  const semanticText = [
    mapping.semanticIntent,
    mapping.visualIntent,
    ...mapping.allowedExpression,
  ].join(" ");
  if (["生命结果", "星兽", "Identity", "Mansion", "Four Symbol", "MotherCode"].some((marker) => semanticText.includes(marker))) {
    return blocked(input, "MOON_MAPPING_CONTAINS_LIFE_RESULT");
  }

  const state: GenesisMoonOriginVisualState = Object.freeze({
    lunarPresence: "TAIYIN_PRESENT",
    moonPhaseExpression: "QUIET_ROUND_MOON",
    cosmicDepth: "UNLOCATED_DEEP_SPACE",
    moonlightField: "SOFT_TAIYIN_FIELD",
    temporalRhythm: "SLOW_STABLE_BREATH",
    entranceState: "ENTERING_TAIYIN_REALM",
    firstScreenCopy: FIRST_SCREEN_COPY,
    semanticMappingReference: mapping,
    visualOnly: true,
    identityBlind: true,
    noIdentity: true,
    noBirthData: true,
    noMansion: true,
    noFourSymbol: true,
    noMotherCode: true,
    noStarBeast: true,
    noEngineInvocation: true,
    noSceneModelInvocation: true,
    noRenderPlanInvocation: true,
    noRendererInvocation: true,
  });

  return Object.freeze({
    status: "READY" as const,
    mappingStatus: "MOON_ORIGIN_VISUAL_MAPPING_READY" as const,
    source: "genesis_moon_origin_visual_mapping" as const,
    input,
    state,
    boundary: MAPPING_BOUNDARY,
  });
}
