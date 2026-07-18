import type { GenesisRendererConsumerContract } from "./genesisRendererConsumerContract";
import type { GenesisVisualHarness } from "./genesisVisualHarness";

export type GenesisPreviewMode = "ISOLATED_GENESIS_PREVIEW";

export type GenesisPreviewLifecycle =
  | "INITIALIZED"
  | "RUNNING"
  | "PAUSED"
  | "RESET"
  | "COMPLETED";

export type GenesisPreviewIntegrationBoundary = Readonly<{
  isolatedPreviewOnly: true;
  devOnly: true;
  noProductionRoute: true;
  noProductionNavigation: true;
  noProductionBuildConsumption: true;
  noIdentity: true;
  noUserData: true;
  noEngineResult: true;
  noEngineInvocation: true;
  noStorage: true;
  noReality: true;
  noGravity: true;
  noChoice: true;
  noCrystal: true;
  noVisualStateMutation: true;
  noRuntimeStateMachineMutation: true;
  noTimelineMutation: true;
  noRendererSemanticMutation: true;
  noAutomaticLoop: true;
  completionRequired: true;
}>;

export type GenesisPreviewIntegration = Readonly<{
  previewMode: GenesisPreviewMode;
  runtimeSession: GenesisVisualHarness;
  rendererConsumerState: GenesisRendererConsumerContract;
  previewLifecycle: GenesisPreviewLifecycle;
  initialRuntimeSession: GenesisVisualHarness;
  initialRendererConsumerState: GenesisRendererConsumerContract;
  boundary: GenesisPreviewIntegrationBoundary;
}>;

export type GenesisPreviewIntegrationInput = Readonly<{
  runtimeSession: GenesisVisualHarness | null;
  rendererConsumerState: GenesisRendererConsumerContract | null;
}>;

export type GenesisPreviewIntegrationOperation =
  | "INITIALIZE"
  | "START"
  | "PAUSE"
  | "RESET"
  | "COMPLETE";

export type GenesisPreviewIntegrationUnavailableReason =
  | "RUNTIME_SESSION_REQUIRED"
  | "RENDERER_CONSUMER_STATE_REQUIRED";

export type GenesisPreviewIntegrationBlockedReason =
  | "HARNESS_BOUNDARY_INVALID"
  | "RENDERER_CONSUMER_BOUNDARY_INVALID"
  | "HARNESS_CONSUMER_REFERENCE_MISMATCH"
  | "PREVIEW_MODE_INVALID"
  | "PREVIEW_BOUNDARY_INVALID"
  | "PREVIEW_ALREADY_COMPLETED"
  | "PREVIEW_NOT_RUNNING"
  | "PREVIEW_NOT_PAUSED"
  | "COMPLETION_STAGE_REQUIRED"
  | "COMPLETION_HOLD_REQUIRED";

export type GenesisPreviewIntegrationReady = Readonly<{
  status: "READY";
  operation: GenesisPreviewIntegrationOperation;
  source: "genesis_preview_integration";
  integration: GenesisPreviewIntegration;
  boundary: GenesisPreviewIntegrationBoundary;
}>;

export type GenesisPreviewIntegrationUnavailable = Readonly<{
  status: "UNAVAILABLE";
  operation: GenesisPreviewIntegrationOperation;
  source: "genesis_preview_integration";
  reason: GenesisPreviewIntegrationUnavailableReason;
  integration: null;
  boundary: GenesisPreviewIntegrationBoundary;
}>;

export type GenesisPreviewIntegrationBlocked = Readonly<{
  status: "BLOCKED";
  operation: GenesisPreviewIntegrationOperation;
  source: "genesis_preview_integration";
  reason: GenesisPreviewIntegrationBlockedReason;
  integration: GenesisPreviewIntegration | null;
  boundary: GenesisPreviewIntegrationBoundary;
}>;

export type GenesisPreviewIntegrationResult =
  | GenesisPreviewIntegrationReady
  | GenesisPreviewIntegrationUnavailable
  | GenesisPreviewIntegrationBlocked;
