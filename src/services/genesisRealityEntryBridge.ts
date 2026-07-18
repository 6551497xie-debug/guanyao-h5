import type {
  GenesisRealityEntryBridge,
  GenesisRealityEntryBridgeBlockedReason,
  GenesisRealityEntryBridgeBoundary,
  GenesisRealityEntryBridgeInput,
  GenesisRealityEntryBridgeResult,
  GenesisRealityEntryBridgeUnavailableReason,
} from "../types/genesisRealityEntryBridge";

export const GENESIS_REALITY_ENTRY_BRIDGE_BOUNDARY: GenesisRealityEntryBridgeBoundary =
  Object.freeze({
    experienceBridgeOnly: true,
    genesisCompletionConsumed: true,
    realityEntryBoundaryOnly: true,
    noRealityCalculation: true,
    noPressureCalculation: true,
    noGravityCalculation: true,
    noChoiceCalculation: true,
    noCrystalGeneration: true,
    noArchiveWrite: true,
    noIdentityMutation: true,
    noEngineInvocation: true,
    noRendererInvocation: true,
    noVisualStateMutation: true,
    noRuntimeMutation: true,
    noStorageWrite: true,
    productionIntegration: false,
    isolatedPrototypeOnly: true,
  });

const unavailable = (
  input: GenesisRealityEntryBridgeInput,
  reason: GenesisRealityEntryBridgeUnavailableReason,
): GenesisRealityEntryBridgeResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    bridgeStatus: "UNAVAILABLE" as const,
    source: "genesis_reality_entry_bridge" as const,
    reason,
    input,
    bridge: null,
    boundary: GENESIS_REALITY_ENTRY_BRIDGE_BOUNDARY,
  });

const blocked = (
  input: GenesisRealityEntryBridgeInput,
  reason: GenesisRealityEntryBridgeBlockedReason,
): GenesisRealityEntryBridgeResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    bridgeStatus: "BLOCKED" as const,
    source: "genesis_reality_entry_bridge" as const,
    reason,
    input,
    bridge: null,
    boundary: GENESIS_REALITY_ENTRY_BRIDGE_BOUNDARY,
  });

const hasCompletionBoundary = (
  input: GenesisRealityEntryBridgeInput,
): boolean => {
  const completion = input.genesisCompletionReference;
  if (completion === null || completion.status !== "READY") return false;
  const review = completion.review;
  const boundary = review.runtimeBoundary;
  return (
    review.genesisToRealityBoundary === "GENESIS_TO_REALITY_BOUNDARY_HELD" &&
    review.transitionReadiness === "REALITY_ENTRY_REVIEW_PENDING" &&
    review.recognitionMoment === "PERSONAL_STAR_BEAST_RECOGNITION_OPEN" &&
    boundary.completionReviewOnly === true &&
    boundary.genesisLayerOnly === true &&
    boundary.realityEntryBoundaryHeld === true &&
    boundary.noRealityCalculation === true &&
    boundary.noPressureAnalysis === true &&
    boundary.noGravity === true &&
    boundary.noChoice === true &&
    boundary.noCrystal === true &&
    boundary.noStorage === true &&
    boundary.noIdentityMutation === true &&
    boundary.noEngineInvocation === true &&
    boundary.noRendererInvocation === true &&
    boundary.noVisualStateMutation === true
  );
};

export function reviewGenesisRealityEntryBridge(
  input: GenesisRealityEntryBridgeInput,
): GenesisRealityEntryBridgeResult {
  const completion = input.genesisCompletionReference;
  if (completion === null) {
    return unavailable(input, "GENESIS_COMPLETION_REFERENCE_REQUIRED");
  }
  if (completion.status === "UNAVAILABLE") {
    return unavailable(input, "GENESIS_COMPLETION_REVIEW_UNAVAILABLE");
  }
  if (completion.status === "BLOCKED") {
    return blocked(input, "GENESIS_COMPLETION_REVIEW_BLOCKED");
  }
  if (!hasCompletionBoundary(input)) {
    return blocked(input, "GENESIS_COMPLETION_BOUNDARY_INVALID");
  }

  const bridge: GenesisRealityEntryBridge = Object.freeze({
    genesisCompletionReference: completion,
    recognitionState: "GENESIS_RECOGNITION_HELD",
    realityEntryReadiness: "REALITY_ENTRY_REVIEW_PENDING",
    transitionIntent: "CARRY_RECOGNITION_FORWARD",
    bridgeState: "REALITY_ENTRY_BRIDGE_READY",
    boundary: GENESIS_REALITY_ENTRY_BRIDGE_BOUNDARY,
  });

  return Object.freeze({
    status: "READY" as const,
    bridgeStatus: "GENESIS_REALITY_ENTRY_BRIDGE_READY" as const,
    source: "genesis_reality_entry_bridge" as const,
    input,
    bridge,
    boundary: GENESIS_REALITY_ENTRY_BRIDGE_BOUNDARY,
  });
}
