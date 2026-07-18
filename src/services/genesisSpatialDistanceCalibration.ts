import type {
  GenesisSpatialDistanceCalibration,
  GenesisSpatialDistanceCalibrationBlockedReason,
  GenesisSpatialDistanceCalibrationBoundary,
  GenesisSpatialDistanceCalibrationInput,
  GenesisSpatialDistanceCalibrationResult,
  GenesisSpatialDistanceCalibrationUnavailableReason,
  GenesisSpatialDistanceLayer,
} from "../types/genesisSpatialDistanceCalibration";

export const GENESIS_SPATIAL_DISTANCE_CALIBRATION_BOUNDARY: GenesisSpatialDistanceCalibrationBoundary =
  Object.freeze({
    rendererVisualOptimizationOnly: true,
    spatialDistanceOnly: true,
    noBlurSubstitution: true,
    semanticUntouched: true,
    visualStateUntouched: true,
    genesisRuntimeUntouched: true,
    runtimeUntouched: true,
    timelineUntouched: true,
    identityUntouched: true,
    userDataUntouched: true,
    engineUntouched: true,
    animalizationForbidden: true,
    productionIntegration: false,
    isolatedPrototypeOnly: true,
  });

const unavailable = (
  input: GenesisSpatialDistanceCalibrationInput,
  reason: GenesisSpatialDistanceCalibrationUnavailableReason,
): GenesisSpatialDistanceCalibrationResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    calibrationStatus: "UNAVAILABLE" as const,
    source: "genesis_spatial_distance_calibration" as const,
    reason,
    input,
    calibration: null,
    boundary: GENESIS_SPATIAL_DISTANCE_CALIBRATION_BOUNDARY,
  });

const blocked = (
  input: GenesisSpatialDistanceCalibrationInput,
  reason: GenesisSpatialDistanceCalibrationBlockedReason,
): GenesisSpatialDistanceCalibrationResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    calibrationStatus: "BLOCKED" as const,
    source: "genesis_spatial_distance_calibration" as const,
    reason,
    input,
    calibration: null,
    boundary: GENESIS_SPATIAL_DISTANCE_CALIBRATION_BOUNDARY,
  });

const hasVisualBoundary = (input: GenesisSpatialDistanceCalibrationInput): boolean => {
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

const hasPerspectiveBoundary = (input: GenesisSpatialDistanceCalibrationInput): boolean => {
  const perspective = input.perspectiveCalibration;
  return (
    perspective !== null &&
    perspective.rendererOnly === true &&
    perspective.visualStateConsumed === true &&
    perspective.noSemanticMutation === true &&
    perspective.noIdentity === true &&
    perspective.noEngineInvocation === true &&
    perspective.noRuntimeMutation === true &&
    perspective.noTimelineMutation === true &&
    perspective.isolatedPrototypeOnly === true
  );
};

const hasPresenceBoundary = (input: GenesisSpatialDistanceCalibrationInput): boolean => {
  const presence = input.presenceRecognitionCalibration;
  return (
    presence !== null &&
    presence.rendererOnly === true &&
    presence.perspectiveCalibrationConsumed === true &&
    presence.noIdentity === true &&
    presence.noUserData === true &&
    presence.noAnimalType === true &&
    presence.noCreatureModel === true &&
    presence.noEngineResult === true &&
    presence.noVisualStateMutation === true &&
    presence.noRuntimeMutation === true &&
    presence.noTimelineMutation === true &&
    presence.isolatedPrototypeOnly === true
  );
};

const layerFor = (
  activeVisualLayer: NonNullable<GenesisSpatialDistanceCalibrationInput["visualRealization"]>["activeVisualLayer"],
): GenesisSpatialDistanceLayer =>
  activeVisualLayer === "SYMBOL_REVEAL"
    ? "SYMBOLIC_FORMATION"
    : activeVisualLayer === "HEXAGRAM_IMPRINT"
      ? "CHANGE_MEMORY"
      : activeVisualLayer === "LIFE_FORCE"
        ? "LIFE_MOVEMENT"
        : activeVisualLayer === "STAR_BEAST_REVEAL"
          ? "BEAST_SUBJECT_FORMATION"
          : activeVisualLayer === "COMPLETION"
            ? "PRESENCE_RECOGNITION"
            : activeVisualLayer;

const profileFor = (
  activeLayer: GenesisSpatialDistanceLayer,
  transitionProgress: number,
): Omit<GenesisSpatialDistanceCalibration, "activeLayer" | "rendererOnly" | "visualStateConsumed" | "perspectiveCalibrationConsumed" | "presenceCalibrationConsumed" | "noBlurSubstitution" | "noSemanticMutation" | "noIdentity" | "noUserData" | "noEngineResult" | "noVisualStateMutation" | "noGenesisRuntimeMutation" | "noRuntimeMutation" | "noTimelineMutation" | "noAnimalization" | "isolatedPrototypeOnly"> => {
  if (activeLayer === "MOON_ORIGIN") {
    return {
      spatialDepth: "DEEP_COSMIC_DISTANCE",
      celestialDistance: "REMOTE_MOON_SURFACE",
      lifePresenceDistance: "LIFE_NOT_YET_FORMED",
      focusTransition: "WIDE_COSMIC_FOCUS",
      approachState: "REMOTE_EXISTENCE",
      depthScale: 1.22,
      contrast: 0.72,
      edgeDefinition: 0.92,
      focusStrength: 0.28,
      approachProgress: 0.08 + transitionProgress * 0.08,
      presenceCarry: 0.2,
    };
  }
  if (activeLayer === "STAR_RIVER") {
    return {
      spatialDepth: "LAYERED_CELESTIAL_DISTANCE",
      celestialDistance: "ORDERED_STAR_RIVER_DEPTH",
      lifePresenceDistance: "REMOTE_STRUCTURED_PRESENCE",
      focusTransition: "ORDERED_FIELD_FOCUS",
      approachState: "REMOTE_EXISTENCE",
      depthScale: 1.28,
      contrast: 0.62,
      edgeDefinition: 0.84,
      focusStrength: 0.44,
      approachProgress: 0.18 + transitionProgress * 0.1,
      presenceCarry: 0.32,
    };
  }
  if (activeLayer === "TIME_RESONANCE") {
    return {
      spatialDepth: "LAYERED_CELESTIAL_DISTANCE",
      celestialDistance: "TIME_RESPONSE_FIELD",
      lifePresenceDistance: "REMOTE_STRUCTURED_PRESENCE",
      focusTransition: "ORDERED_FIELD_FOCUS",
      approachState: "GRADUAL_APPROACH",
      depthScale: 1.2,
      contrast: 0.68,
      edgeDefinition: 0.86,
      focusStrength: 0.56,
      approachProgress: 0.3 + transitionProgress * 0.14,
      presenceCarry: 0.42,
    };
  }
  if (activeLayer === "SYMBOLIC_FORMATION") {
    return {
      spatialDepth: "LAYERED_CELESTIAL_DISTANCE",
      celestialDistance: "FORMING_LIFE_FIELD",
      lifePresenceDistance: "REMOTE_STRUCTURED_PRESENCE",
      focusTransition: "LIFE_FORM_FOCUS",
      approachState: "STRUCTURE_EMERGING",
      depthScale: 1.12,
      contrast: 0.72,
      edgeDefinition: 0.9,
      focusStrength: 0.7,
      approachProgress: 0.46 + transitionProgress * 0.14,
      presenceCarry: 0.56,
    };
  }
  if (activeLayer === "CHANGE_MEMORY") {
    return {
      spatialDepth: "LAYERED_CELESTIAL_DISTANCE",
      celestialDistance: "FORMING_LIFE_FIELD",
      lifePresenceDistance: "APPROACHING_STRUCTURED_PRESENCE",
      focusTransition: "LIFE_FORM_FOCUS",
      approachState: "STRUCTURE_EMERGING",
      depthScale: 1.04,
      contrast: 0.7,
      edgeDefinition: 0.92,
      focusStrength: 0.8,
      approachProgress: 0.58 + transitionProgress * 0.14,
      presenceCarry: 0.68,
    };
  }
  if (activeLayer === "LIFE_MOVEMENT") {
    return {
      spatialDepth: "APPROACHING_LIFE_DISTANCE",
      celestialDistance: "FORMING_LIFE_FIELD",
      lifePresenceDistance: "APPROACHING_STRUCTURED_PRESENCE",
      focusTransition: "LIFE_FORM_FOCUS",
      approachState: "GRADUAL_APPROACH",
      depthScale: 0.96,
      contrast: 0.76,
      edgeDefinition: 0.94,
      focusStrength: 0.88,
      approachProgress: 0.72 + transitionProgress * 0.14,
      presenceCarry: 0.8,
    };
  }
  if (activeLayer === "BEAST_SUBJECT_FORMATION") {
    return {
      spatialDepth: "APPROACHING_LIFE_DISTANCE",
      celestialDistance: "LIFE_PRESENCE_APPROACH",
      lifePresenceDistance: "APPROACHING_STRUCTURED_PRESENCE",
      focusTransition: "LIFE_SUBJECT_FOCUS",
      approachState: "GRADUAL_APPROACH",
      depthScale: 0.86,
      contrast: 0.8,
      edgeDefinition: 0.96,
      focusStrength: 0.94,
      approachProgress: 0.86 + transitionProgress * 0.12,
      presenceCarry: 0.94,
    };
  }
  return {
    spatialDepth: "RECOGNITION_HOLD_DISTANCE",
    celestialDistance: "LIFE_PRESENCE_NEAR_HOLD",
    lifePresenceDistance: "RECOGNIZED_PRESENCE",
    focusTransition: "LIFE_SUBJECT_FOCUS",
    approachState: "RECOGNITION_HOLD",
    depthScale: 0.78,
    contrast: 0.82,
    edgeDefinition: 1,
    focusStrength: 1,
    approachProgress: 1,
    presenceCarry: 1,
  };
};

export function mapGenesisSpatialDistanceCalibration(
  input: GenesisSpatialDistanceCalibrationInput,
): GenesisSpatialDistanceCalibrationResult {
  if (input.visualRealization === null) {
    return unavailable(input, "VISUAL_REALIZATION_REQUIRED");
  }
  if (input.perspectiveCalibration === null) {
    return unavailable(input, "PERSPECTIVE_CALIBRATION_REQUIRED");
  }
  if (!hasVisualBoundary(input) || !hasPerspectiveBoundary(input)) {
    return blocked(input, "SPATIAL_DISTANCE_BOUNDARY_INVALID");
  }
  if (
    !Number.isFinite(input.visualRealization.transitionProgress) ||
    input.visualRealization.transitionProgress < 0 ||
    input.visualRealization.transitionProgress > 1
  ) {
    return blocked(input, "TRANSITION_PROGRESS_INVALID");
  }

  const activeLayer = layerFor(input.visualRealization.activeVisualLayer);
  if (activeLayer === "BEAST_SUBJECT_FORMATION" || activeLayer === "PRESENCE_RECOGNITION") {
    if (input.presenceRecognitionCalibration === null) {
      return unavailable(input, "PRESENCE_RECOGNITION_CALIBRATION_REQUIRED");
    }
    if (!hasPresenceBoundary(input)) {
      return blocked(input, "SPATIAL_DISTANCE_BOUNDARY_INVALID");
    }
  }
  if (
    activeLayer !== "MOON_ORIGIN" &&
    activeLayer !== "STAR_RIVER" &&
    activeLayer !== "TIME_RESONANCE" &&
    activeLayer !== "SYMBOLIC_FORMATION" &&
    activeLayer !== "CHANGE_MEMORY" &&
    activeLayer !== "LIFE_MOVEMENT" &&
    activeLayer !== "BEAST_SUBJECT_FORMATION" &&
    activeLayer !== "PRESENCE_RECOGNITION"
  ) {
    return blocked(input, "SPATIAL_DISTANCE_LAYER_OUT_OF_SCOPE");
  }

  const profile = profileFor(activeLayer, input.visualRealization.transitionProgress);
  const calibration: GenesisSpatialDistanceCalibration = Object.freeze({
    activeLayer,
    ...profile,
    rendererOnly: true,
    visualStateConsumed: true,
    perspectiveCalibrationConsumed: true,
    presenceCalibrationConsumed: input.presenceRecognitionCalibration !== null,
    noBlurSubstitution: true,
    noSemanticMutation: true,
    noIdentity: true,
    noUserData: true,
    noEngineResult: true,
    noVisualStateMutation: true,
    noGenesisRuntimeMutation: true,
    noRuntimeMutation: true,
    noTimelineMutation: true,
    noAnimalization: true,
    isolatedPrototypeOnly: true,
  });

  return Object.freeze({
    status: "READY" as const,
    calibrationStatus: "GENESIS_SPATIAL_DISTANCE_CALIBRATION_READY" as const,
    source: "genesis_spatial_distance_calibration" as const,
    input,
    calibration,
    boundary: GENESIS_SPATIAL_DISTANCE_CALIBRATION_BOUNDARY,
  });
}
