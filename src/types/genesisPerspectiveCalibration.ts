import type { GenesisRendererVisualRealization } from "./genesisRendererVisualRealization";

export type GenesisPerspectiveCalibrationLayer =
  | "MOON_ORIGIN"
  | "STAR_RIVER"
  | "TIME_RESONANCE"
  | "SYMBOLIC_FORMATION"
  | "CHANGE_MEMORY"
  | "LIFE_MOVEMENT";

export type GenesisCosmicPerspective = "TAIYIN_MOTHER_COSMOS";

export type GenesisFocalHierarchy = "MOON_MOTHER_STAR_ORDER_TIME_RESPONSE";

export type GenesisMoonRole = "TAIYIN_TEMPORAL_MOTHER";

export type GenesisStarRole = "COSMIC_ORDER_FIELD";

export type GenesisTimeRole = "LIFE_RESPONSE_TO_COSMOS";

export type GenesisPerspectivePresenceBalance = Readonly<{
  moonWeight: number;
  starWeight: number;
  timeResponseWeight: number;
  coreSuppression: number;
  backgroundDepth: number;
  responseIntensity: number;
  lifeAxisStrength: number;
  morphologicalTension: number;
  memorySedimentation: number;
  forceRhythm: number;
  innerMotionDifference: number;
  formationContinuity: number;
}>;

export type GenesisPerspectiveCalibration = Readonly<{
  activeVisualLayer: GenesisPerspectiveCalibrationLayer;
  transitionProgress: number;
  cosmicPerspective: GenesisCosmicPerspective;
  focalHierarchy: GenesisFocalHierarchy;
  moonRole: GenesisMoonRole;
  starRole: GenesisStarRole;
  timeRole: GenesisTimeRole;
  presenceBalance: GenesisPerspectivePresenceBalance;
  rendererOnly: true;
  visualStateConsumed: true;
  noSemanticMutation: true;
  noIdentity: true;
  noEngineInvocation: true;
  noRuntimeMutation: true;
  noTimelineMutation: true;
  isolatedPrototypeOnly: true;
}>;

export type GenesisPerspectiveCalibrationInput = Readonly<{
  visualRealization: GenesisRendererVisualRealization | null;
}>;

export type GenesisPerspectiveCalibrationUnavailableReason =
  | "VISUAL_REALIZATION_REQUIRED";

export type GenesisPerspectiveCalibrationBlockedReason =
  | "P18_LAYER_OUT_OF_SCOPE"
  | "PERSPECTIVE_BOUNDARY_INVALID"
  | "TRANSITION_PROGRESS_INVALID";

export type GenesisPerspectiveCalibrationBoundary = Readonly<{
  rendererVisualCalibrationOnly: true;
  visualStateConsumed: true;
  semanticUntouched: true;
  identityUntouched: true;
  engineUntouched: true;
  runtimeUntouched: true;
  timelineUntouched: true;
  productionIntegration: false;
  isolatedPrototypeOnly: true;
}>;

export type GenesisPerspectiveCalibrationReady = Readonly<{
  status: "READY";
  calibrationStatus: "GENESIS_PERSPECTIVE_CALIBRATION_READY";
  source: "genesis_perspective_calibration";
  input: GenesisPerspectiveCalibrationInput;
  calibration: GenesisPerspectiveCalibration;
  boundary: GenesisPerspectiveCalibrationBoundary;
}>;

export type GenesisPerspectiveCalibrationUnavailable = Readonly<{
  status: "UNAVAILABLE";
  calibrationStatus: "UNAVAILABLE";
  source: "genesis_perspective_calibration";
  reason: GenesisPerspectiveCalibrationUnavailableReason;
  input: GenesisPerspectiveCalibrationInput;
  calibration: null;
  boundary: GenesisPerspectiveCalibrationBoundary;
}>;

export type GenesisPerspectiveCalibrationBlocked = Readonly<{
  status: "BLOCKED";
  calibrationStatus: "BLOCKED";
  source: "genesis_perspective_calibration";
  reason: GenesisPerspectiveCalibrationBlockedReason;
  input: GenesisPerspectiveCalibrationInput;
  calibration: null;
  boundary: GenesisPerspectiveCalibrationBoundary;
}>;

export type GenesisPerspectiveCalibrationResult =
  | GenesisPerspectiveCalibrationReady
  | GenesisPerspectiveCalibrationUnavailable
  | GenesisPerspectiveCalibrationBlocked;
