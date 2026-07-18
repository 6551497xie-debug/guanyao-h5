import type { GenesisPresenceRecognitionCalibration } from "./genesisPresenceRecognitionCalibration";
import type { GenesisPerspectiveCalibration } from "./genesisPerspectiveCalibration";
import type { GenesisRendererVisualRealization } from "./genesisRendererVisualRealization";

export type GenesisSpatialDistanceLayer =
  | "MOON_ORIGIN"
  | "STAR_RIVER"
  | "TIME_RESONANCE"
  | "SYMBOLIC_FORMATION"
  | "CHANGE_MEMORY"
  | "LIFE_MOVEMENT"
  | "BEAST_SUBJECT_FORMATION"
  | "PRESENCE_RECOGNITION";

export type GenesisSpatialDepth =
  | "DEEP_COSMIC_DISTANCE"
  | "LAYERED_CELESTIAL_DISTANCE"
  | "APPROACHING_LIFE_DISTANCE"
  | "RECOGNITION_HOLD_DISTANCE";

export type GenesisCelestialDistance =
  | "REMOTE_MOON_SURFACE"
  | "ORDERED_STAR_RIVER_DEPTH"
  | "TIME_RESPONSE_FIELD"
  | "FORMING_LIFE_FIELD"
  | "LIFE_PRESENCE_APPROACH"
  | "LIFE_PRESENCE_NEAR_HOLD";

export type GenesisLifePresenceDistance =
  | "LIFE_NOT_YET_FORMED"
  | "REMOTE_STRUCTURED_PRESENCE"
  | "APPROACHING_STRUCTURED_PRESENCE"
  | "RECOGNIZED_PRESENCE";

export type GenesisFocusTransition =
  | "WIDE_COSMIC_FOCUS"
  | "ORDERED_FIELD_FOCUS"
  | "LIFE_FORM_FOCUS"
  | "LIFE_SUBJECT_FOCUS";

export type GenesisApproachState =
  | "REMOTE_EXISTENCE"
  | "GRADUAL_APPROACH"
  | "STRUCTURE_EMERGING"
  | "RECOGNITION_HOLD";

export type GenesisSpatialDistanceCalibration = Readonly<{
  activeLayer: GenesisSpatialDistanceLayer;
  spatialDepth: GenesisSpatialDepth;
  celestialDistance: GenesisCelestialDistance;
  lifePresenceDistance: GenesisLifePresenceDistance;
  focusTransition: GenesisFocusTransition;
  approachState: GenesisApproachState;
  depthScale: number;
  contrast: number;
  edgeDefinition: number;
  focusStrength: number;
  approachProgress: number;
  presenceCarry: number;
  rendererOnly: true;
  visualStateConsumed: true;
  perspectiveCalibrationConsumed: true;
  presenceCalibrationConsumed: boolean;
  noBlurSubstitution: true;
  noSemanticMutation: true;
  noIdentity: true;
  noUserData: true;
  noEngineResult: true;
  noVisualStateMutation: true;
  noGenesisRuntimeMutation: true;
  noRuntimeMutation: true;
  noTimelineMutation: true;
  noAnimalization: true;
  isolatedPrototypeOnly: true;
}>;

export type GenesisSpatialDistanceCalibrationInput = Readonly<{
  visualRealization: GenesisRendererVisualRealization | null;
  perspectiveCalibration: GenesisPerspectiveCalibration | null;
  presenceRecognitionCalibration: GenesisPresenceRecognitionCalibration | null;
}>;

export type GenesisSpatialDistanceCalibrationUnavailableReason =
  | "VISUAL_REALIZATION_REQUIRED"
  | "PERSPECTIVE_CALIBRATION_REQUIRED"
  | "PRESENCE_RECOGNITION_CALIBRATION_REQUIRED";

export type GenesisSpatialDistanceCalibrationBlockedReason =
  | "SPATIAL_DISTANCE_BOUNDARY_INVALID"
  | "SPATIAL_DISTANCE_LAYER_OUT_OF_SCOPE"
  | "TRANSITION_PROGRESS_INVALID";

export type GenesisSpatialDistanceCalibrationBoundary = Readonly<{
  rendererVisualOptimizationOnly: true;
  spatialDistanceOnly: true;
  noBlurSubstitution: true;
  semanticUntouched: true;
  visualStateUntouched: true;
  genesisRuntimeUntouched: true;
  runtimeUntouched: true;
  timelineUntouched: true;
  identityUntouched: true;
  userDataUntouched: true;
  engineUntouched: true;
  animalizationForbidden: true;
  productionIntegration: false;
  isolatedPrototypeOnly: true;
}>;

export type GenesisSpatialDistanceCalibrationReady = Readonly<{
  status: "READY";
  calibrationStatus: "GENESIS_SPATIAL_DISTANCE_CALIBRATION_READY";
  source: "genesis_spatial_distance_calibration";
  input: GenesisSpatialDistanceCalibrationInput;
  calibration: GenesisSpatialDistanceCalibration;
  boundary: GenesisSpatialDistanceCalibrationBoundary;
}>;

export type GenesisSpatialDistanceCalibrationUnavailable = Readonly<{
  status: "UNAVAILABLE";
  calibrationStatus: "UNAVAILABLE";
  source: "genesis_spatial_distance_calibration";
  reason: GenesisSpatialDistanceCalibrationUnavailableReason;
  input: GenesisSpatialDistanceCalibrationInput;
  calibration: null;
  boundary: GenesisSpatialDistanceCalibrationBoundary;
}>;

export type GenesisSpatialDistanceCalibrationBlocked = Readonly<{
  status: "BLOCKED";
  calibrationStatus: "BLOCKED";
  source: "genesis_spatial_distance_calibration";
  reason: GenesisSpatialDistanceCalibrationBlockedReason;
  input: GenesisSpatialDistanceCalibrationInput;
  calibration: null;
  boundary: GenesisSpatialDistanceCalibrationBoundary;
}>;

export type GenesisSpatialDistanceCalibrationResult =
  | GenesisSpatialDistanceCalibrationReady
  | GenesisSpatialDistanceCalibrationUnavailable
  | GenesisSpatialDistanceCalibrationBlocked;
