import type {
  GenesisCompletionMomentReviewResult,
} from "./genesisCompletionMomentReview";

export type GenesisRealityEntryRecognitionState =
  | "GENESIS_RECOGNITION_HELD"
  | "LIFE_SEEN_BEFORE_REALITY";

export type GenesisRealityEntryReadiness =
  | "REALITY_ENTRY_REVIEW_PENDING"
  | "REALITY_ENTRY_BOUNDARY_READY";

export type GenesisRealityEntryTransitionIntent =
  | "CARRY_RECOGNITION_FORWARD"
  | "BEGIN_REALITY_AFTER_COMPLETION";

export type GenesisRealityEntryBridgeState =
  | "GENESIS_COMPLETION_HELD"
  | "REALITY_ENTRY_BRIDGE_READY";

export type GenesisRealityEntryBridgeBoundary = Readonly<{
  experienceBridgeOnly: true;
  genesisCompletionConsumed: true;
  realityEntryBoundaryOnly: true;
  noRealityCalculation: true;
  noPressureCalculation: true;
  noGravityCalculation: true;
  noChoiceCalculation: true;
  noCrystalGeneration: true;
  noArchiveWrite: true;
  noIdentityMutation: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noVisualStateMutation: true;
  noRuntimeMutation: true;
  noStorageWrite: true;
  productionIntegration: false;
  isolatedPrototypeOnly: true;
}>;

export type GenesisRealityEntryBridge = Readonly<{
  genesisCompletionReference: GenesisCompletionMomentReviewResult;
  recognitionState: GenesisRealityEntryRecognitionState;
  realityEntryReadiness: GenesisRealityEntryReadiness;
  transitionIntent: GenesisRealityEntryTransitionIntent;
  bridgeState: GenesisRealityEntryBridgeState;
  boundary: GenesisRealityEntryBridgeBoundary;
}>;

export type GenesisRealityEntryBridgeInput = Readonly<{
  genesisCompletionReference: GenesisCompletionMomentReviewResult | null;
}>;

export type GenesisRealityEntryBridgeUnavailableReason =
  | "GENESIS_COMPLETION_REFERENCE_REQUIRED"
  | "GENESIS_COMPLETION_REVIEW_UNAVAILABLE";

export type GenesisRealityEntryBridgeBlockedReason =
  | "GENESIS_COMPLETION_REVIEW_BLOCKED"
  | "GENESIS_COMPLETION_BOUNDARY_INVALID"
  | "REALITY_ENTRY_REQUESTED_TOO_EARLY";

export type GenesisRealityEntryBridgeReady = Readonly<{
  status: "READY";
  bridgeStatus: "GENESIS_REALITY_ENTRY_BRIDGE_READY";
  source: "genesis_reality_entry_bridge";
  input: GenesisRealityEntryBridgeInput;
  bridge: GenesisRealityEntryBridge;
  boundary: GenesisRealityEntryBridgeBoundary;
}>;

export type GenesisRealityEntryBridgeUnavailable = Readonly<{
  status: "UNAVAILABLE";
  bridgeStatus: "UNAVAILABLE";
  source: "genesis_reality_entry_bridge";
  reason: GenesisRealityEntryBridgeUnavailableReason;
  input: GenesisRealityEntryBridgeInput;
  bridge: null;
  boundary: GenesisRealityEntryBridgeBoundary;
}>;

export type GenesisRealityEntryBridgeBlocked = Readonly<{
  status: "BLOCKED";
  bridgeStatus: "BLOCKED";
  source: "genesis_reality_entry_bridge";
  reason: GenesisRealityEntryBridgeBlockedReason;
  input: GenesisRealityEntryBridgeInput;
  bridge: null;
  boundary: GenesisRealityEntryBridgeBoundary;
}>;

export type GenesisRealityEntryBridgeResult =
  | GenesisRealityEntryBridgeReady
  | GenesisRealityEntryBridgeUnavailable
  | GenesisRealityEntryBridgeBlocked;
