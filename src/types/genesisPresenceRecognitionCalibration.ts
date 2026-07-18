import type { GenesisPerspectiveCalibration } from "./genesisPerspectiveCalibration";

export type GenesisPresenceRecognitionLayer =
  | "BEAST_SUBJECT_FORMATION"
  | "PRESENCE_RECOGNITION";

export type GenesisPresenceSubjectHierarchy = "LIFE_SUBJECT_FOREGROUND";
export type GenesisLifeCenterState = "STABLE_BREATHING_CENTER";
export type GenesisCosmicSupportState = "COSMOS_SUPPORTS_LIFE";
export type GenesisPresenceRecognitionState = "QUIET_RECOGNITION_HOLD";
export type GenesisPresenceStabilityState =
  | "FORMING_PRESENCE_STABLE"
  | "RECOGNITION_PRESENCE_STABLE";

export type GenesisPresenceRecognitionCalibration = Readonly<{
  activeLayer: GenesisPresenceRecognitionLayer;
  subjectHierarchy: GenesisPresenceSubjectHierarchy;
  lifeCenter: GenesisLifeCenterState;
  cosmicSupport: GenesisCosmicSupportState;
  recognitionState: GenesisPresenceRecognitionState;
  presenceStability: GenesisPresenceStabilityState;
  subjectWeight: number;
  cosmicSupportWeight: number;
  centerInfluence: number;
  recognitionHold: number;
  stillness: number;
  rendererOnly: true;
  perspectiveCalibrationConsumed: true;
  noIdentity: true;
  noUserData: true;
  noAnimalType: true;
  noCreatureModel: true;
  noEngineResult: true;
  noVisualStateMutation: true;
  noRuntimeMutation: true;
  noTimelineMutation: true;
  isolatedPrototypeOnly: true;
}>;

export type GenesisPresenceRecognitionCalibrationInput = Readonly<{
  perspectiveCalibration: GenesisPerspectiveCalibration | null;
}>;

export type GenesisPresenceRecognitionCalibrationUnavailableReason =
  | "PERSPECTIVE_CALIBRATION_REQUIRED";

export type GenesisPresenceRecognitionCalibrationBlockedReason =
  | "PRESENCE_RECOGNITION_LAYER_OUT_OF_SCOPE"
  | "PRESENCE_RECOGNITION_BOUNDARY_INVALID";

export type GenesisPresenceRecognitionCalibrationBoundary = Readonly<{
  rendererVisualCalibrationOnly: true;
  presenceRecognitionOnly: true;
  semanticUntouched: true;
  identityUntouched: true;
  userDataUntouched: true;
  animalizationForbidden: true;
  engineUntouched: true;
  runtimeUntouched: true;
  timelineUntouched: true;
  productionIntegration: false;
  isolatedPrototypeOnly: true;
}>;

export type GenesisPresenceRecognitionCalibrationReady = Readonly<{
  status: "READY";
  calibrationStatus: "GENESIS_PRESENCE_RECOGNITION_CALIBRATION_READY";
  source: "genesis_presence_recognition_calibration";
  input: GenesisPresenceRecognitionCalibrationInput;
  calibration: GenesisPresenceRecognitionCalibration;
  boundary: GenesisPresenceRecognitionCalibrationBoundary;
}>;

export type GenesisPresenceRecognitionCalibrationUnavailable = Readonly<{
  status: "UNAVAILABLE";
  calibrationStatus: "UNAVAILABLE";
  source: "genesis_presence_recognition_calibration";
  reason: GenesisPresenceRecognitionCalibrationUnavailableReason;
  input: GenesisPresenceRecognitionCalibrationInput;
  calibration: null;
  boundary: GenesisPresenceRecognitionCalibrationBoundary;
}>;

export type GenesisPresenceRecognitionCalibrationBlocked = Readonly<{
  status: "BLOCKED";
  calibrationStatus: "BLOCKED";
  source: "genesis_presence_recognition_calibration";
  reason: GenesisPresenceRecognitionCalibrationBlockedReason;
  input: GenesisPresenceRecognitionCalibrationInput;
  calibration: null;
  boundary: GenesisPresenceRecognitionCalibrationBoundary;
}>;

export type GenesisPresenceRecognitionCalibrationResult =
  | GenesisPresenceRecognitionCalibrationReady
  | GenesisPresenceRecognitionCalibrationUnavailable
  | GenesisPresenceRecognitionCalibrationBlocked;
