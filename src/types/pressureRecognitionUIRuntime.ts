export type PressureRecognitionStageState =
  | "REALITY_SIGNAL_OBSERVATION"
  | "PRESSURE_TENSION_OBSERVATION"
  | "GRAVITY_READY";

export type RealitySignalReference = "REALITY_ENTRY_SPACE_RUNTIME";

export type PressureObservationState =
  | "WAITING_FOR_REALITY"
  | "OBSERVING_SIGNALS"
  | "TENSION_ACKNOWLEDGED";

export type PressureTensionAwareness = "UNSEEN" | "PRESENT" | "ACKNOWLEDGED";

export type PressureRecognitionGravityReadiness = "NOT_READY" | "READY";

export type PressureRecognitionInteractionAvailability =
  | "NONE"
  | "PRESSURE_OBSERVATION_CONFIRM";

export type PressureRecognitionUIRuntimeBoundary = Readonly<{
  pressureObservationOnly: true;
  noPressureResult: true;
  noUserDiagnosis: true;
  noPersonalityLabel: true;
  noGravityResult: true;
  noChoiceResult: true;
  noCrystalResult: true;
  noIdentitySource: true;
  noStorage: true;
  noAccount: true;
  noEngineInvocation: true;
}>;

export type PressureRecognitionUIRuntime = Readonly<{
  semanticRole: "PRESSURE_RECOGNITION_UI_RUNTIME";
  pressureStageState: PressureRecognitionStageState;
  realitySignalReference: RealitySignalReference;
  observationState: PressureObservationState;
  tensionAwareness: PressureTensionAwareness;
  gravityReadiness: PressureRecognitionGravityReadiness;
  interactionAvailability: PressureRecognitionInteractionAvailability;
  pressureObservationConfirmed: boolean;
  boundary: PressureRecognitionUIRuntimeBoundary;
}>;

export type PressureRecognitionUIRuntimeInput = Readonly<{
  realityReady: boolean;
  pressureObservationConfirmed: boolean;
}>;

export type PressureRecognitionUIRuntimeUnavailableReason =
  | "REALITY_READY_REQUIRED";

export type PressureRecognitionUIRuntimeBlockedReason =
  | "PRESSURE_OBSERVATION_BEFORE_REALITY_READY";

export type PressureRecognitionUIRuntimeReviewBoundary = Readonly<{
  observationReviewOnly: true;
  noPressureExecution: true;
  noUserDiagnosis: true;
  noPersonalityLabel: true;
  noGravityExecution: true;
  noChoiceExecution: true;
  noCrystalExecution: true;
  noStorage: true;
  noAccount: true;
}>;

export type PressureRecognitionUIRuntimeReady = Readonly<{
  status: "READY";
  source: "pressure_recognition_ui_runtime";
  uiRuntime: PressureRecognitionUIRuntime;
  input: PressureRecognitionUIRuntimeInput;
  boundary: PressureRecognitionUIRuntimeReviewBoundary;
}>;

export type PressureRecognitionUIRuntimeUnavailable = Readonly<{
  status: "UNAVAILABLE";
  source: "pressure_recognition_ui_runtime";
  reason: PressureRecognitionUIRuntimeUnavailableReason;
  uiRuntime: null;
  input: PressureRecognitionUIRuntimeInput;
  boundary: PressureRecognitionUIRuntimeReviewBoundary;
}>;

export type PressureRecognitionUIRuntimeBlocked = Readonly<{
  status: "BLOCKED";
  source: "pressure_recognition_ui_runtime";
  reason: PressureRecognitionUIRuntimeBlockedReason;
  uiRuntime: PressureRecognitionUIRuntime;
  input: PressureRecognitionUIRuntimeInput;
  boundary: PressureRecognitionUIRuntimeReviewBoundary;
}>;

export type PressureRecognitionUIRuntimeResult =
  | PressureRecognitionUIRuntimeReady
  | PressureRecognitionUIRuntimeUnavailable
  | PressureRecognitionUIRuntimeBlocked;
