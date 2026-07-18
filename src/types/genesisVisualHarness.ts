import type { GenesisRendererConsumerContract } from "./genesisRendererConsumerContract";
import type {
  GenesisRuntimeStage,
  GenesisRuntimeStateMachine,
  GenesisRuntimeTransitionState,
} from "./genesisRuntimeStateMachine";
import type {
  GenesisTransitionTimeline,
  GenesisTransitionTimelineStage,
} from "./genesisTransitionTimeline";

export type GenesisVisualHarnessMode = "ISOLATED_GENESIS_PREVIEW";

export type GenesisVisualHarnessLifecycle =
  | "START"
  | "RUNNING"
  | "COMPLETED"
  | "END";

export type GenesisVisualHarnessStep =
  | "START"
  | GenesisRuntimeStage
  | "END";

export type GenesisVisualHarnessPreviewState = Readonly<{
  lifecycle: GenesisVisualHarnessLifecycle;
  currentStep: GenesisVisualHarnessStep;
  currentStage: GenesisRuntimeStage;
  transitionState: GenesisRuntimeTransitionState;
  timelineState: GenesisTransitionTimelineStage;
  rendererConsumerInput: GenesisRendererConsumerContract;
}>;

export type GenesisVisualHarnessBoundary = Readonly<{
  isolatedPreviewOnly: true;
  devOnly: true;
  noProductionRoute: true;
  noProductionBuildConsumption: true;
  noIdentity: true;
  noUserData: true;
  noEngineResult: true;
  noEngineInvocation: true;
  noStorageReference: true;
  noReality: true;
  noGravity: true;
  noChoice: true;
  noCrystal: true;
  noVisualStateMutation: true;
  noVisualStateCreation: true;
  noSceneModelMutation: true;
  noRenderPlanMutation: true;
  noRendererSemanticMutation: true;
  noParallelStages: true;
  noStageSkipping: true;
  noAutomaticLoop: true;
  completionRequired: true;
}>;

export type GenesisVisualHarness = Readonly<{
  harnessMode: GenesisVisualHarnessMode;
  runtimeSequenceReference: GenesisRuntimeStateMachine;
  timelineReference: GenesisTransitionTimeline;
  rendererConsumerReference: GenesisRendererConsumerContract;
  previewState: GenesisVisualHarnessPreviewState;
  boundary: GenesisVisualHarnessBoundary;
}>;

export type GenesisVisualHarnessInput = Readonly<{
  runtimeSequenceReference: GenesisRuntimeStateMachine | null;
  timelineReference: GenesisTransitionTimeline | null;
  rendererConsumerReference: GenesisRendererConsumerContract | null;
}>;

export type GenesisVisualHarnessAdvanceInput = Readonly<{
  session: GenesisVisualHarness;
  nextRuntimeSequenceReference: GenesisRuntimeStateMachine | null;
  nextTimelineReference: GenesisTransitionTimeline | null;
  nextRendererConsumerReference: GenesisRendererConsumerContract | null;
}>;

export type GenesisVisualHarnessOperation = "START" | "ADVANCE" | "END";

export type GenesisVisualHarnessUnavailableReason =
  | "RUNTIME_SEQUENCE_REFERENCE_REQUIRED"
  | "TIMELINE_REFERENCE_REQUIRED"
  | "RENDERER_CONSUMER_REFERENCE_REQUIRED"
  | "NEXT_RUNTIME_SEQUENCE_REFERENCE_REQUIRED"
  | "NEXT_TIMELINE_REFERENCE_REQUIRED"
  | "NEXT_RENDERER_CONSUMER_REFERENCE_REQUIRED";

export type GenesisVisualHarnessBlockedReason =
  | "HARNESS_BOUNDARY_INVALID"
  | "RUNTIME_SEQUENCE_BOUNDARY_INVALID"
  | "TIMELINE_BOUNDARY_INVALID"
  | "RENDERER_CONSUMER_BOUNDARY_INVALID"
  | "RUNTIME_TIMELINE_REFERENCE_MISMATCH"
  | "RUNTIME_RENDERER_CONSUMER_REFERENCE_MISMATCH"
  | "HARNESS_STAGE_INVALID"
  | "HARNESS_STAGE_SKIP_FORBIDDEN"
  | "HARNESS_PARALLEL_STAGE_FORBIDDEN"
  | "COMPLETION_REQUIRED"
  | "COMPLETION_ALREADY_REACHED"
  | "HARNESS_NOT_COMPLETED";

export type GenesisVisualHarnessReady = Readonly<{
  status: "READY";
  operation: GenesisVisualHarnessOperation;
  source: "genesis_visual_harness";
  harness: GenesisVisualHarness;
  boundary: GenesisVisualHarnessBoundary;
}>;

export type GenesisVisualHarnessUnavailable = Readonly<{
  status: "UNAVAILABLE";
  operation: GenesisVisualHarnessOperation;
  source: "genesis_visual_harness";
  reason: GenesisVisualHarnessUnavailableReason;
  harness: null;
  boundary: GenesisVisualHarnessBoundary;
}>;

export type GenesisVisualHarnessBlocked = Readonly<{
  status: "BLOCKED";
  operation: GenesisVisualHarnessOperation;
  source: "genesis_visual_harness";
  reason: GenesisVisualHarnessBlockedReason;
  harness: GenesisVisualHarness | null;
  boundary: GenesisVisualHarnessBoundary;
}>;

export type GenesisVisualHarnessResult =
  | GenesisVisualHarnessReady
  | GenesisVisualHarnessUnavailable
  | GenesisVisualHarnessBlocked;
