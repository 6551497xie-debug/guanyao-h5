import type {
  RecognitionRealityEntryBridgeBoundary,
  RecognitionRealityEntryBridgeFix,
  RecognitionRealityEntryBridgeFixBlocked,
  RecognitionRealityEntryBridgeFixBlockedReason,
  RecognitionRealityEntryBridgeFixInput,
  RecognitionRealityEntryBridgeFixResult,
  RecognitionRealityEntryBridgeFixUnavailable,
  RecognitionRealityEntryBridgeFixUnavailableReason,
} from "../types/recognitionRealityEntryBridgeFix";

export const RECOGNITION_REALITY_ENTRY_BRIDGE_FIX_BOUNDARY: RecognitionRealityEntryBridgeBoundary =
  Object.freeze({
    experienceRuntimeBridgeOnly: true,
    noGenesisMutation: true,
    noIdentity: true,
    noStorage: true,
    noUserAccount: true,
    noEngineResult: true,
    noPressureExecution: true,
    noGravityExecution: true,
    noChoiceExecution: true,
    noCrystalExecution: true,
  });

const unavailable = (
  input: RecognitionRealityEntryBridgeFixInput,
  reason: RecognitionRealityEntryBridgeFixUnavailableReason,
): RecognitionRealityEntryBridgeFixUnavailable =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    source: "recognition_reality_entry_bridge_fix" as const,
    reason,
    bridge: null,
    input,
    boundary: RECOGNITION_REALITY_ENTRY_BRIDGE_FIX_BOUNDARY,
  });

const createBridge = (
  input: RecognitionRealityEntryBridgeFixInput,
  values: Pick<
    RecognitionRealityEntryBridgeFix,
    | "recognitionCompletionState"
    | "transitionEventState"
    | "realityEntryState"
    | "pressureReadiness"
    | "bridgeState"
    | "bridgeIntegrity"
  >,
): RecognitionRealityEntryBridgeFix =>
  Object.freeze({
    semanticRole: "RECOGNITION_REALITY_ENTRY_BRIDGE_FIX" as const,
    recognitionCompletionState: values.recognitionCompletionState,
    transitionEventState: values.transitionEventState,
    realityEntryState: values.realityEntryState,
    pressureReadiness: values.pressureReadiness,
    sessionContinuityState: input.sessionContinuityState,
    bridgeState: values.bridgeState,
    bridgeIntegrity: values.bridgeIntegrity,
    boundary: RECOGNITION_REALITY_ENTRY_BRIDGE_FIX_BOUNDARY,
  });

const blocked = (
  input: RecognitionRealityEntryBridgeFixInput,
  reason: RecognitionRealityEntryBridgeFixBlockedReason,
  bridge: RecognitionRealityEntryBridgeFix,
): RecognitionRealityEntryBridgeFixBlocked =>
  Object.freeze({
    status: "BLOCKED" as const,
    source: "recognition_reality_entry_bridge_fix" as const,
    reason,
    bridge,
    input,
    boundary: RECOGNITION_REALITY_ENTRY_BRIDGE_FIX_BOUNDARY,
  });

export function resolveRecognitionRealityEntryBridgeFix(
  input: RecognitionRealityEntryBridgeFixInput,
): RecognitionRealityEntryBridgeFixResult {
  if (input.sessionContinuityState === "RESET_DETECTED") {
    return blocked(
      input,
      "GENESIS_RESET_DETECTED",
      createBridge(input, {
        recognitionCompletionState: input.genesisCompleted
          ? "GENESIS_COMPLETE"
          : "GENESIS_COMPLETION_REQUIRED",
        transitionEventState: "NONE",
        realityEntryState: "NOT_READY",
        pressureReadiness: "NOT_READY",
        bridgeState: "BRIDGE_BROKEN",
        bridgeIntegrity: "BROKEN",
      }),
    );
  }

  if (!input.genesisCompleted) {
    return unavailable(input, "GENESIS_COMPLETION_REQUIRED");
  }

  if (input.realityEntryConfirmed && !input.recognitionConfirmed) {
    return blocked(
      input,
      "REALITY_ENTRY_BEFORE_RECOGNITION",
      createBridge(input, {
        recognitionCompletionState: "GENESIS_COMPLETE",
        transitionEventState: "ENTER_REALITY",
        realityEntryState: "NOT_READY",
        pressureReadiness: "NOT_READY",
        bridgeState: "BRIDGE_BROKEN",
        bridgeIntegrity: "BROKEN",
      }),
    );
  }

  if (!input.recognitionConfirmed) {
    return Object.freeze({
      status: "READY" as const,
      source: "recognition_reality_entry_bridge_fix" as const,
      bridge: createBridge(input, {
        recognitionCompletionState: "GENESIS_COMPLETE",
        transitionEventState: "RECOGNITION_CONFIRM",
        realityEntryState: "NOT_READY",
        pressureReadiness: "NOT_READY",
        bridgeState: "BRIDGE_HELD",
        bridgeIntegrity: "HELD",
      }),
      input,
      boundary: RECOGNITION_REALITY_ENTRY_BRIDGE_FIX_BOUNDARY,
    });
  }

  if (!input.realityEntryConfirmed) {
    return Object.freeze({
      status: "READY" as const,
      source: "recognition_reality_entry_bridge_fix" as const,
      bridge: createBridge(input, {
        recognitionCompletionState: "RECOGNITION_CONFIRMED",
        transitionEventState: "ENTER_REALITY",
        realityEntryState: "TRANSITIONING",
        pressureReadiness: "NOT_READY",
        bridgeState: "BRIDGE_HELD",
        bridgeIntegrity: "HELD",
      }),
      input,
      boundary: RECOGNITION_REALITY_ENTRY_BRIDGE_FIX_BOUNDARY,
    });
  }

  return Object.freeze({
    status: "READY" as const,
    source: "recognition_reality_entry_bridge_fix" as const,
    bridge: createBridge(input, {
      recognitionCompletionState: "RECOGNITION_CONFIRMED",
      transitionEventState: "NONE",
      realityEntryState: "REALITY_ENTRY_READY",
      pressureReadiness: "PRESSURE_READY",
      bridgeState: "BRIDGE_READY",
      bridgeIntegrity: "CONTINUOUS",
    }),
    input,
    boundary: RECOGNITION_REALITY_ENTRY_BRIDGE_FIX_BOUNDARY,
  });
}
