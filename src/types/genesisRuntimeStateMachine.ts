import type { GenesisRuntimeExperienceReadinessResult } from "./genesisRuntimeExperienceReadiness";

export type GenesisRuntimeStage =
  | "MOON_ORIGIN"
  | "STAR_RIVER"
  | "TIME_RESONANCE"
  | "SYMBOL_REVEAL"
  | "HEXAGRAM_IMPRINT"
  | "LIFE_FORCE"
  | "STAR_BEAST_REVEAL"
  | "COMPLETION";

export type GenesisRuntimeTransitionState =
  | "ENTERING"
  | "ACTIVE"
  | "TRANSITIONING"
  | "COMPLETED";

export type GenesisRuntimeSequenceStatus = "RUNNING" | "COMPLETED";
export type GenesisRuntimeTransitionTrigger = "AUTO_ADVANCE" | "TIME_DELIVERY";

export type GenesisRuntimeStateMachineBoundary = Readonly<{
  stateMachineOnly: true;
  sequenceOrchestrationOnly: true;
  noVisualStateMutation: true;
  noVisualStateCreation: true;
  noIdentity: true;
  noUserData: true;
  noEngineResult: true;
  noRendererCommand: true;
  noRendererInvocation: true;
  noSceneModelMutation: true;
  noRenderPlanMutation: true;
  noReality: true;
  noGravity: true;
  noChoice: true;
  noCrystal: true;
  noStorage: true;
  noParallelGenesisStages: true;
  noStageReordering: true;
  userInputOnlyAtTimeResonance: true;
}>;

export type GenesisRuntimeStateMachine = Readonly<{
  currentStage: GenesisRuntimeStage;
  previousStage: GenesisRuntimeStage | null;
  nextStage: GenesisRuntimeStage | null;
  transitionState: GenesisRuntimeTransitionState;
  sequenceStatus: GenesisRuntimeSequenceStatus;
  readinessReference: GenesisRuntimeExperienceReadinessResult;
  boundary: GenesisRuntimeStateMachineBoundary;
}>;

export type GenesisRuntimeStateMachineInput = Readonly<{
  readinessResult: GenesisRuntimeExperienceReadinessResult | null;
}>;

export type GenesisRuntimeStageTransitionInput = Readonly<{
  machine: GenesisRuntimeStateMachine;
  targetStage: GenesisRuntimeStage;
  trigger: GenesisRuntimeTransitionTrigger;
}>;

export type GenesisRuntimeStateMachineOperation =
  | "INITIALIZE"
  | "ACTIVATE_STAGE"
  | "COMPLETE_STAGE"
  | "BEGIN_TRANSITION"
  | "COMPLETE_TRANSITION";

export type GenesisRuntimeStateMachineUnavailableReason =
  | "READINESS_RESULT_REQUIRED"
  | "READINESS_RESULT_UNAVAILABLE";

export type GenesisRuntimeStateMachineBlockedReason =
  | "READINESS_RESULT_BLOCKED"
  | "READINESS_BOUNDARY_INVALID"
  | "STATE_BOUNDARY_INVALID"
  | "STAGE_NOT_ENTERING"
  | "STAGE_NOT_ACTIVE"
  | "STAGE_NOT_COMPLETED"
  | "TRANSITION_NOT_IN_PROGRESS"
  | "INVALID_NEXT_STAGE"
  | "TIME_DELIVERY_REQUIRED"
  | "TIME_DELIVERY_ONLY_AT_TIME_RESONANCE"
  | "SEQUENCE_ALREADY_COMPLETED";

export type GenesisRuntimeStateMachineReady = Readonly<{
  status: "READY";
  operation: GenesisRuntimeStateMachineOperation;
  source: "genesis_runtime_state_machine";
  state: GenesisRuntimeStateMachine;
  boundary: GenesisRuntimeStateMachineBoundary;
}>;

export type GenesisRuntimeStateMachineUnavailable = Readonly<{
  status: "UNAVAILABLE";
  operation: GenesisRuntimeStateMachineOperation;
  source: "genesis_runtime_state_machine";
  reason: GenesisRuntimeStateMachineUnavailableReason;
  state: null;
  boundary: GenesisRuntimeStateMachineBoundary;
}>;

export type GenesisRuntimeStateMachineBlocked = Readonly<{
  status: "BLOCKED";
  operation: GenesisRuntimeStateMachineOperation;
  source: "genesis_runtime_state_machine";
  reason: GenesisRuntimeStateMachineBlockedReason;
  state: GenesisRuntimeStateMachine;
  boundary: GenesisRuntimeStateMachineBoundary;
}>;

export type GenesisRuntimeStateMachineResult =
  | GenesisRuntimeStateMachineReady
  | GenesisRuntimeStateMachineUnavailable
  | GenesisRuntimeStateMachineBlocked;
