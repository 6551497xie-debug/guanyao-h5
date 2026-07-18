export type RecognitionCompletionState =
  | "GENESIS_COMPLETION_REQUIRED"
  | "GENESIS_COMPLETE"
  | "RECOGNITION_CONFIRMED";

export type RecognitionRealityEntryTransitionEvent =
  | "RECOGNITION_CONFIRM"
  | "ENTER_REALITY"
  | "NONE";

export type RecognitionRealityEntryState =
  | "NOT_READY"
  | "TRANSITIONING"
  | "REALITY_ENTRY_READY";

export type RecognitionRealityEntryPressureReadiness =
  | "NOT_READY"
  | "PRESSURE_READY";

export type RecognitionRealityEntrySessionContinuityState =
  | "CONTINUOUS"
  | "RESET_DETECTED";

export type RecognitionRealityEntryBridgeState =
  | "BRIDGE_NOT_READY"
  | "BRIDGE_HELD"
  | "BRIDGE_READY"
  | "BRIDGE_BROKEN";

export type RecognitionRealityEntryBridgeIntegrity =
  | "PENDING"
  | "HELD"
  | "CONTINUOUS"
  | "BROKEN";

export type RecognitionRealityEntryBridgeBoundary = Readonly<{
  experienceRuntimeBridgeOnly: true;
  noGenesisMutation: true;
  noIdentity: true;
  noStorage: true;
  noUserAccount: true;
  noEngineResult: true;
  noPressureExecution: true;
  noGravityExecution: true;
  noChoiceExecution: true;
  noCrystalExecution: true;
}>;

export type RecognitionRealityEntryBridgeFixInput = Readonly<{
  genesisCompleted: boolean;
  recognitionConfirmed: boolean;
  realityEntryConfirmed: boolean;
  sessionContinuityState: RecognitionRealityEntrySessionContinuityState;
}>;

export type RecognitionRealityEntryBridgeFix = Readonly<{
  semanticRole: "RECOGNITION_REALITY_ENTRY_BRIDGE_FIX";
  recognitionCompletionState: RecognitionCompletionState;
  transitionEventState: RecognitionRealityEntryTransitionEvent;
  realityEntryState: RecognitionRealityEntryState;
  pressureReadiness: RecognitionRealityEntryPressureReadiness;
  sessionContinuityState: RecognitionRealityEntrySessionContinuityState;
  bridgeState: RecognitionRealityEntryBridgeState;
  bridgeIntegrity: RecognitionRealityEntryBridgeIntegrity;
  boundary: RecognitionRealityEntryBridgeBoundary;
}>;

export type RecognitionRealityEntryBridgeFixReady = Readonly<{
  status: "READY";
  source: "recognition_reality_entry_bridge_fix";
  bridge: RecognitionRealityEntryBridgeFix;
  input: RecognitionRealityEntryBridgeFixInput;
  boundary: RecognitionRealityEntryBridgeBoundary;
}>;

export type RecognitionRealityEntryBridgeFixUnavailableReason =
  | "GENESIS_COMPLETION_REQUIRED";

export type RecognitionRealityEntryBridgeFixBlockedReason =
  | "GENESIS_RESET_DETECTED"
  | "REALITY_ENTRY_BEFORE_RECOGNITION";

export type RecognitionRealityEntryBridgeFixUnavailable = Readonly<{
  status: "UNAVAILABLE";
  source: "recognition_reality_entry_bridge_fix";
  reason: RecognitionRealityEntryBridgeFixUnavailableReason;
  bridge: null;
  input: RecognitionRealityEntryBridgeFixInput;
  boundary: RecognitionRealityEntryBridgeBoundary;
}>;

export type RecognitionRealityEntryBridgeFixBlocked = Readonly<{
  status: "BLOCKED";
  source: "recognition_reality_entry_bridge_fix";
  reason: RecognitionRealityEntryBridgeFixBlockedReason;
  bridge: RecognitionRealityEntryBridgeFix;
  input: RecognitionRealityEntryBridgeFixInput;
  boundary: RecognitionRealityEntryBridgeBoundary;
}>;

export type RecognitionRealityEntryBridgeFixResult =
  | RecognitionRealityEntryBridgeFixReady
  | RecognitionRealityEntryBridgeFixUnavailable
  | RecognitionRealityEntryBridgeFixBlocked;
