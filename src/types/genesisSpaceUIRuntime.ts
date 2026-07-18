import type { GenesisRuntimeStage } from "./genesisRuntimeStateMachine";

export type GenesisSpaceUIRuntimePresentationState =
  | "ENTERING"
  | "OBSERVING"
  | "TIME_RESONANCE_WAITING"
  | "REVEALING"
  | "GENESIS_COMPLETED";

export type GenesisSpaceUIInteractionAvailability =
  | "NONE"
  | "TIME_DELIVERY"
  | "RECOGNITION_ENTRY";

export type GenesisSpaceUIRecognitionEntryState =
  | "NOT_READY"
  | "RECOGNITION_READY"
  | "RECOGNITION_ENTERED";

export type GenesisSpaceUIRuntimeContractBoundary = Readonly<{
  genesisSpaceOnly: true;
  uiPresentationOnly: true;
  noIdentity: true;
  noEngineResult: true;
  noMotherCode: true;
  noLifeArchetype: true;
  noStorage: true;
  noAccount: true;
  noReality: true;
  noRuntimeRuleMutation: true;
  noEngineInvocation: true;
  noVisualStateMutation: true;
  timeDeliveryOnlyUserInput: true;
  recognitionEntryOnlyAfterCompletion: true;
}>;

export type GenesisSpaceUIRuntime = Readonly<{
  semanticRole: "GENESIS_SPACE_UI_RUNTIME";
  currentGenesisStage: GenesisRuntimeStage;
  runtimePresentationState: GenesisSpaceUIRuntimePresentationState;
  interactionAvailability: GenesisSpaceUIInteractionAvailability;
  visualConsumptionReference: "GENESIS_RUNTIME_AND_VISUAL_STATE";
  recognitionEntryState: GenesisSpaceUIRecognitionEntryState;
  timeDelivered: boolean;
  boundary: GenesisSpaceUIRuntimeContractBoundary;
}>;

export type GenesisSpaceUIRuntimeInput = Readonly<{
  currentGenesisStage: GenesisRuntimeStage;
  previewLifecycle: "INITIALIZED" | "RUNNING" | "PAUSED" | "RESET" | "COMPLETED";
  timeDelivered: boolean;
  recognitionEntered: boolean;
  visualStateAvailable: boolean;
}>;

export type GenesisSpaceUIRuntimeUnavailableReason =
  | "VISUAL_STATE_REQUIRED"
  | "GENESIS_STAGE_REQUIRED";

export type GenesisSpaceUIRuntimeBlockedReason =
  | "RECOGNITION_BEFORE_COMPLETION"
  | "INVALID_TIME_DELIVERY_STAGE"
  | "COMPLETED_PREVIEW_NOT_AT_COMPLETION";

export type GenesisSpaceUIRuntimeBoundary = Readonly<{
  runtimeReviewOnly: true;
  noReality: true;
  noStorage: true;
  noAccount: true;
  noEngineResult: true;
  noIdentity: true;
}>;

export type GenesisSpaceUIRuntimeReady = Readonly<{
  status: "READY";
  source: "genesis_space_ui_runtime";
  uiRuntime: GenesisSpaceUIRuntime;
  input: GenesisSpaceUIRuntimeInput;
  boundary: GenesisSpaceUIRuntimeBoundary;
}>;

export type GenesisSpaceUIRuntimeUnavailable = Readonly<{
  status: "UNAVAILABLE";
  source: "genesis_space_ui_runtime";
  reason: GenesisSpaceUIRuntimeUnavailableReason;
  uiRuntime: null;
  input: GenesisSpaceUIRuntimeInput;
  boundary: GenesisSpaceUIRuntimeBoundary;
}>;

export type GenesisSpaceUIRuntimeBlocked = Readonly<{
  status: "BLOCKED";
  source: "genesis_space_ui_runtime";
  reason: GenesisSpaceUIRuntimeBlockedReason;
  uiRuntime: GenesisSpaceUIRuntime;
  input: GenesisSpaceUIRuntimeInput;
  boundary: GenesisSpaceUIRuntimeBoundary;
}>;

export type GenesisSpaceUIRuntimeResult =
  | GenesisSpaceUIRuntimeReady
  | GenesisSpaceUIRuntimeUnavailable
  | GenesisSpaceUIRuntimeBlocked;
