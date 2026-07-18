export type RealityEntrySpaceEntryState =
  | "RECOGNITION_CONFIRMED"
  | "TRANSITIONING"
  | "REALITY_READY";

export type RealityEntrySpaceTransitionPresentation =
  | "COMPANION_CONTINUES"
  | "WORLD_APPROACHES"
  | "REALITY_GATE_OPEN";

export type RealityEntrySpaceReadiness = "NOT_READY" | "READY";

export type RealityEntrySpaceInteractionAvailability =
  | "NONE"
  | "ENTER_REALITY";

export type RealityEntrySpaceUIRuntimeBoundary = Readonly<{
  realityEntrySpaceOnly: true;
  transitionPresentationOnly: true;
  noPressureResult: true;
  noGravityResult: true;
  noChoiceResult: true;
  noCrystalResult: true;
  noUserProfile: true;
  noIdentitySource: true;
  noStorage: true;
  noAccount: true;
  noEngineInvocation: true;
  noRealityAnalysis: true;
}>;

export type RealityEntrySpaceUIRuntime = Readonly<{
  semanticRole: "REALITY_ENTRY_SPACE_UI_RUNTIME";
  entryState: RealityEntrySpaceEntryState;
  recognitionReference: "RECOGNITION_SPACE_RUNTIME";
  realityReadiness: RealityEntrySpaceReadiness;
  transitionPresentation: RealityEntrySpaceTransitionPresentation;
  pressureReadiness: RealityEntrySpaceReadiness;
  interactionAvailability: RealityEntrySpaceInteractionAvailability;
  realityEntryConfirmed: boolean;
  boundary: RealityEntrySpaceUIRuntimeBoundary;
}>;

export type RealityEntrySpaceUIRuntimeInput = Readonly<{
  recognitionConfirmed: boolean;
  presenceAvailable: boolean;
  realityEntryConfirmed: boolean;
}>;

export type RealityEntrySpaceUIRuntimeUnavailableReason =
  | "RECOGNITION_CONFIRMATION_REQUIRED"
  | "PRESENCE_REFERENCE_REQUIRED";

export type RealityEntrySpaceUIRuntimeBlockedReason =
  | "ENTER_REALITY_BEFORE_RECOGNITION"
  | "ENTER_REALITY_WITHOUT_PRESENCE";

export type RealityEntrySpaceUIRuntimeReviewBoundary = Readonly<{
  readinessReviewOnly: true;
  noPressureExecution: true;
  noGravityExecution: true;
  noChoiceExecution: true;
  noCrystalExecution: true;
  noStorage: true;
  noAccount: true;
}>;

export type RealityEntrySpaceUIRuntimeReady = Readonly<{
  status: "READY";
  source: "reality_entry_space_ui_runtime";
  uiRuntime: RealityEntrySpaceUIRuntime;
  input: RealityEntrySpaceUIRuntimeInput;
  boundary: RealityEntrySpaceUIRuntimeReviewBoundary;
}>;

export type RealityEntrySpaceUIRuntimeUnavailable = Readonly<{
  status: "UNAVAILABLE";
  source: "reality_entry_space_ui_runtime";
  reason: RealityEntrySpaceUIRuntimeUnavailableReason;
  uiRuntime: null;
  input: RealityEntrySpaceUIRuntimeInput;
  boundary: RealityEntrySpaceUIRuntimeReviewBoundary;
}>;

export type RealityEntrySpaceUIRuntimeBlocked = Readonly<{
  status: "BLOCKED";
  source: "reality_entry_space_ui_runtime";
  reason: RealityEntrySpaceUIRuntimeBlockedReason;
  uiRuntime: RealityEntrySpaceUIRuntime;
  input: RealityEntrySpaceUIRuntimeInput;
  boundary: RealityEntrySpaceUIRuntimeReviewBoundary;
}>;

export type RealityEntrySpaceUIRuntimeResult =
  | RealityEntrySpaceUIRuntimeReady
  | RealityEntrySpaceUIRuntimeUnavailable
  | RealityEntrySpaceUIRuntimeBlocked;
