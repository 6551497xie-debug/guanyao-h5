import type {
  GenesisPresenceRecognitionCalibration,
  GenesisPresenceRecognitionCalibrationBlockedReason,
  GenesisPresenceRecognitionCalibrationBoundary,
  GenesisPresenceRecognitionCalibrationInput,
  GenesisPresenceRecognitionCalibrationResult,
  GenesisPresenceRecognitionCalibrationUnavailableReason,
} from "../types/genesisPresenceRecognitionCalibration";

export const GENESIS_PRESENCE_RECOGNITION_CALIBRATION_BOUNDARY: GenesisPresenceRecognitionCalibrationBoundary =
  Object.freeze({
    rendererVisualCalibrationOnly: true,
    presenceRecognitionOnly: true,
    semanticUntouched: true,
    identityUntouched: true,
    userDataUntouched: true,
    animalizationForbidden: true,
    engineUntouched: true,
    runtimeUntouched: true,
    timelineUntouched: true,
    productionIntegration: false,
    isolatedPrototypeOnly: true,
  });

const unavailable = (
  input: GenesisPresenceRecognitionCalibrationInput,
  reason: GenesisPresenceRecognitionCalibrationUnavailableReason,
): GenesisPresenceRecognitionCalibrationResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    calibrationStatus: "UNAVAILABLE" as const,
    source: "genesis_presence_recognition_calibration" as const,
    reason,
    input,
    calibration: null,
    boundary: GENESIS_PRESENCE_RECOGNITION_CALIBRATION_BOUNDARY,
  });

const blocked = (
  input: GenesisPresenceRecognitionCalibrationInput,
  reason: GenesisPresenceRecognitionCalibrationBlockedReason,
): GenesisPresenceRecognitionCalibrationResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    calibrationStatus: "BLOCKED" as const,
    source: "genesis_presence_recognition_calibration" as const,
    reason,
    input,
    calibration: null,
    boundary: GENESIS_PRESENCE_RECOGNITION_CALIBRATION_BOUNDARY,
  });

const hasPerspectiveBoundary = (
  input: GenesisPresenceRecognitionCalibrationInput,
): boolean => {
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

export function mapGenesisPresenceRecognitionCalibration(
  input: GenesisPresenceRecognitionCalibrationInput,
): GenesisPresenceRecognitionCalibrationResult {
  if (input.perspectiveCalibration === null) {
    return unavailable(input, "PERSPECTIVE_CALIBRATION_REQUIRED");
  }
  if (!hasPerspectiveBoundary(input)) {
    return blocked(input, "PRESENCE_RECOGNITION_BOUNDARY_INVALID");
  }

  const activeLayer = input.perspectiveCalibration.activeVisualLayer;
  if (activeLayer !== "BEAST_SUBJECT_FORMATION" && activeLayer !== "PRESENCE_RECOGNITION") {
    return blocked(input, "PRESENCE_RECOGNITION_LAYER_OUT_OF_SCOPE");
  }

  const isCompletion = activeLayer === "PRESENCE_RECOGNITION";
  const calibration: GenesisPresenceRecognitionCalibration = Object.freeze({
    activeLayer,
    subjectHierarchy: "LIFE_SUBJECT_FOREGROUND",
    lifeCenter: "STABLE_BREATHING_CENTER",
    cosmicSupport: "COSMOS_SUPPORTS_LIFE",
    recognitionState: "QUIET_RECOGNITION_HOLD",
    presenceStability: isCompletion
      ? "RECOGNITION_PRESENCE_STABLE"
      : "FORMING_PRESENCE_STABLE",
    subjectWeight: isCompletion ? 1.24 : 1.16,
    cosmicSupportWeight: isCompletion ? 0.56 : 0.68,
    centerInfluence: isCompletion ? 1.06 : 0.98,
    recognitionHold: isCompletion ? 1 : 0.72,
    stillness: isCompletion ? 0.98 : 0.74,
    rendererOnly: true,
    perspectiveCalibrationConsumed: true,
    noIdentity: true,
    noUserData: true,
    noAnimalType: true,
    noCreatureModel: true,
    noEngineResult: true,
    noVisualStateMutation: true,
    noRuntimeMutation: true,
    noTimelineMutation: true,
    isolatedPrototypeOnly: true,
  });

  return Object.freeze({
    status: "READY" as const,
    calibrationStatus: "GENESIS_PRESENCE_RECOGNITION_CALIBRATION_READY" as const,
    source: "genesis_presence_recognition_calibration" as const,
    input,
    calibration,
    boundary: GENESIS_PRESENCE_RECOGNITION_CALIBRATION_BOUNDARY,
  });
}
