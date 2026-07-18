import type {
  GenesisPerspectiveCalibration,
  GenesisPerspectiveCalibrationBlockedReason,
  GenesisPerspectiveCalibrationBoundary,
  GenesisPerspectiveCalibrationInput,
  GenesisPerspectiveCalibrationResult,
  GenesisPerspectiveCalibrationUnavailableReason,
} from "../types/genesisPerspectiveCalibration";

export const GENESIS_PERSPECTIVE_CALIBRATION_BOUNDARY: GenesisPerspectiveCalibrationBoundary =
  Object.freeze({
    rendererVisualCalibrationOnly: true,
    visualStateConsumed: true,
    semanticUntouched: true,
    identityUntouched: true,
    engineUntouched: true,
    runtimeUntouched: true,
    timelineUntouched: true,
    productionIntegration: false,
    isolatedPrototypeOnly: true,
  });

const unavailable = (
  input: GenesisPerspectiveCalibrationInput,
  reason: GenesisPerspectiveCalibrationUnavailableReason,
): GenesisPerspectiveCalibrationResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    calibrationStatus: "UNAVAILABLE" as const,
    source: "genesis_perspective_calibration" as const,
    reason,
    input,
    calibration: null,
    boundary: GENESIS_PERSPECTIVE_CALIBRATION_BOUNDARY,
  });

const blocked = (
  input: GenesisPerspectiveCalibrationInput,
  reason: GenesisPerspectiveCalibrationBlockedReason,
): GenesisPerspectiveCalibrationResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    calibrationStatus: "BLOCKED" as const,
    source: "genesis_perspective_calibration" as const,
    reason,
    input,
    calibration: null,
    boundary: GENESIS_PERSPECTIVE_CALIBRATION_BOUNDARY,
  });

const hasVisualBoundary = (input: GenesisPerspectiveCalibrationInput): boolean => {
  const realization = input.visualRealization;
  return (
    realization !== null &&
    realization.rendererOnly === true &&
    realization.visualStateConsumed === true &&
    realization.runtimeConsumed === true &&
    realization.timelineConsumed === true &&
    realization.identityBlind === true &&
    realization.noIdentity === true &&
    realization.noEngineInvocation === true &&
    realization.noVisualStateMutation === true &&
    realization.noRuntimeMutation === true &&
    realization.noTimelineMutation === true &&
    realization.noRendererSemanticCreation === true &&
    realization.isolatedPrototypeOnly === true
  );
};

const balanceByLayer = (
  layer: GenesisPerspectiveCalibration["activeVisualLayer"],
): GenesisPerspectiveCalibration["presenceBalance"] => {
  if (layer === "MOON_ORIGIN") {
    return Object.freeze({
      moonWeight: 0.94,
      starWeight: 0.3,
      timeResponseWeight: 0.16,
      coreSuppression: 0.78,
      backgroundDepth: 0.72,
      responseIntensity: 0.18,
    });
  }
  if (layer === "STAR_RIVER") {
    return Object.freeze({
      moonWeight: 0.58,
      starWeight: 0.94,
      timeResponseWeight: 0.34,
      coreSuppression: 0.52,
      backgroundDepth: 0.98,
      responseIntensity: 0.4,
    });
  }
  return Object.freeze({
    moonWeight: 0.72,
    starWeight: 0.88,
    timeResponseWeight: 0.96,
    coreSuppression: 0.6,
    backgroundDepth: 0.94,
    responseIntensity: 0.94,
  });
};

export function mapGenesisPerspectiveCalibration(
  input: GenesisPerspectiveCalibrationInput,
): GenesisPerspectiveCalibrationResult {
  if (input.visualRealization === null) {
    return unavailable(input, "VISUAL_REALIZATION_REQUIRED");
  }
  if (!hasVisualBoundary(input)) {
    return blocked(input, "PERSPECTIVE_BOUNDARY_INVALID");
  }
  if (
    !Number.isFinite(input.visualRealization.transitionProgress) ||
    input.visualRealization.transitionProgress < 0 ||
    input.visualRealization.transitionProgress > 1
  ) {
    return blocked(input, "TRANSITION_PROGRESS_INVALID");
  }
  const layer = input.visualRealization.activeVisualLayer;
  if (layer !== "MOON_ORIGIN" && layer !== "STAR_RIVER" && layer !== "TIME_RESONANCE") {
    return blocked(input, "P18_LAYER_OUT_OF_SCOPE");
  }

  const calibration: GenesisPerspectiveCalibration = Object.freeze({
    activeVisualLayer: layer,
    transitionProgress: input.visualRealization.transitionProgress,
    cosmicPerspective: "TAIYIN_MOTHER_COSMOS",
    focalHierarchy: "MOON_MOTHER_STAR_ORDER_TIME_RESPONSE",
    moonRole: "TAIYIN_TEMPORAL_MOTHER",
    starRole: "COSMIC_ORDER_FIELD",
    timeRole: "LIFE_RESPONSE_TO_COSMOS",
    presenceBalance: balanceByLayer(layer),
    rendererOnly: true,
    visualStateConsumed: true,
    noSemanticMutation: true,
    noIdentity: true,
    noEngineInvocation: true,
    noRuntimeMutation: true,
    noTimelineMutation: true,
    isolatedPrototypeOnly: true,
  });

  return Object.freeze({
    status: "READY" as const,
    calibrationStatus: "GENESIS_PERSPECTIVE_CALIBRATION_READY" as const,
    source: "genesis_perspective_calibration" as const,
    input,
    calibration,
    boundary: GENESIS_PERSPECTIVE_CALIBRATION_BOUNDARY,
  });
}
