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
      lifeAxisStrength: 0.06,
      morphologicalTension: 0.12,
      memorySedimentation: 0,
      forceRhythm: 0.16,
      innerMotionDifference: 0.08,
      formationContinuity: 0.86,
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
      lifeAxisStrength: 0.2,
      morphologicalTension: 0.28,
      memorySedimentation: 0.04,
      forceRhythm: 0.28,
      innerMotionDifference: 0.16,
      formationContinuity: 0.92,
    });
  }
  if (layer === "TIME_RESONANCE") {
    return Object.freeze({
      moonWeight: 0.72,
      starWeight: 0.88,
      timeResponseWeight: 0.96,
      coreSuppression: 0.6,
      backgroundDepth: 0.94,
      responseIntensity: 0.94,
      lifeAxisStrength: 0.28,
      morphologicalTension: 0.36,
      memorySedimentation: 0.12,
      forceRhythm: 0.64,
      innerMotionDifference: 0.3,
      formationContinuity: 0.96,
    });
  }
  if (layer === "SYMBOLIC_FORMATION") {
    return Object.freeze({
      moonWeight: 0.5,
      starWeight: 0.82,
      timeResponseWeight: 0.46,
      coreSuppression: 0.42,
      backgroundDepth: 0.86,
      responseIntensity: 0.52,
      lifeAxisStrength: 0.94,
      morphologicalTension: 0.86,
      memorySedimentation: 0.18,
      forceRhythm: 0.34,
      innerMotionDifference: 0.28,
      formationContinuity: 0.96,
    });
  }
  if (layer === "CHANGE_MEMORY") {
    return Object.freeze({
      moonWeight: 0.42,
      starWeight: 0.72,
      timeResponseWeight: 0.58,
      coreSuppression: 0.46,
      backgroundDepth: 0.82,
      responseIntensity: 0.7,
      lifeAxisStrength: 0.74,
      morphologicalTension: 0.58,
      memorySedimentation: 0.94,
      forceRhythm: 0.52,
      innerMotionDifference: 0.58,
      formationContinuity: 0.98,
    });
  }
  if (layer === "LIFE_MOVEMENT") {
    return Object.freeze({
      moonWeight: 0.36,
      starWeight: 0.68,
      timeResponseWeight: 0.68,
      coreSuppression: 0.38,
      backgroundDepth: 0.8,
      responseIntensity: 0.82,
      lifeAxisStrength: 0.88,
      morphologicalTension: 0.64,
      memorySedimentation: 0.62,
      forceRhythm: 0.96,
      innerMotionDifference: 0.94,
      formationContinuity: 0.99,
    });
  }
  return Object.freeze({
    moonWeight: 0.72,
    starWeight: 0.88,
    timeResponseWeight: 0.96,
    coreSuppression: 0.6,
    backgroundDepth: 0.94,
    responseIntensity: 0.94,
    lifeAxisStrength: 0.28,
    morphologicalTension: 0.36,
    memorySedimentation: 0.12,
    forceRhythm: 0.64,
    innerMotionDifference: 0.3,
    formationContinuity: 0.96,
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
  const calibrationLayer =
    layer === "SYMBOL_REVEAL"
      ? "SYMBOLIC_FORMATION"
      : layer === "HEXAGRAM_IMPRINT"
        ? "CHANGE_MEMORY"
        : layer === "LIFE_FORCE"
          ? "LIFE_MOVEMENT"
          : layer;
  if (
    calibrationLayer !== "MOON_ORIGIN" &&
    calibrationLayer !== "STAR_RIVER" &&
    calibrationLayer !== "TIME_RESONANCE" &&
    calibrationLayer !== "SYMBOLIC_FORMATION" &&
    calibrationLayer !== "CHANGE_MEMORY" &&
    calibrationLayer !== "LIFE_MOVEMENT"
  ) {
    return blocked(input, "P18_LAYER_OUT_OF_SCOPE");
  }

  const calibration: GenesisPerspectiveCalibration = Object.freeze({
    activeVisualLayer: calibrationLayer,
    transitionProgress: input.visualRealization.transitionProgress,
    cosmicPerspective: "TAIYIN_MOTHER_COSMOS",
    focalHierarchy: "MOON_MOTHER_STAR_ORDER_TIME_RESPONSE",
    moonRole: "TAIYIN_TEMPORAL_MOTHER",
    starRole: "COSMIC_ORDER_FIELD",
    timeRole: "LIFE_RESPONSE_TO_COSMOS",
    presenceBalance: balanceByLayer(calibrationLayer as GenesisPerspectiveCalibration["activeVisualLayer"]),
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
