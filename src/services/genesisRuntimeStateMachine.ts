import type {
  GenesisRuntimeExperienceReadinessResult,
} from "../types/genesisRuntimeExperienceReadiness";
import type {
  GenesisRuntimeStage,
  GenesisRuntimeStateMachine,
  GenesisRuntimeStateMachineBlockedReason,
  GenesisRuntimeStateMachineBoundary,
  GenesisRuntimeStateMachineInput,
  GenesisRuntimeStateMachineOperation,
  GenesisRuntimeStateMachineResult,
  GenesisRuntimeStageTransitionInput,
  GenesisRuntimeTransitionState,
} from "../types/genesisRuntimeStateMachine";

const RUNTIME_BOUNDARY: GenesisRuntimeStateMachineBoundary = Object.freeze({
  stateMachineOnly: true,
  sequenceOrchestrationOnly: true,
  noVisualStateMutation: true,
  noVisualStateCreation: true,
  noIdentity: true,
  noUserData: true,
  noEngineResult: true,
  noRendererCommand: true,
  noRendererInvocation: true,
  noSceneModelMutation: true,
  noRenderPlanMutation: true,
  noReality: true,
  noGravity: true,
  noChoice: true,
  noCrystal: true,
  noStorage: true,
  noParallelGenesisStages: true,
  noStageReordering: true,
  userInputOnlyAtTimeResonance: true,
});

const STAGE_SEQUENCE = Object.freeze([
  "MOON_ORIGIN",
  "STAR_RIVER",
  "TIME_RESONANCE",
  "SYMBOL_REVEAL",
  "HEXAGRAM_IMPRINT",
  "LIFE_FORCE",
  "STAR_BEAST_REVEAL",
  "COMPLETION",
] as const);

const unavailable = (
  operation: GenesisRuntimeStateMachineOperation,
  reason: "READINESS_RESULT_REQUIRED" | "READINESS_RESULT_UNAVAILABLE",
): GenesisRuntimeStateMachineResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    operation,
    source: "genesis_runtime_state_machine" as const,
    reason,
    state: null,
    boundary: RUNTIME_BOUNDARY,
  });

const blocked = (
  operation: GenesisRuntimeStateMachineOperation,
  reason: GenesisRuntimeStateMachineBlockedReason,
  state: GenesisRuntimeStateMachine,
): GenesisRuntimeStateMachineResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    operation,
    source: "genesis_runtime_state_machine" as const,
    reason,
    state,
    boundary: RUNTIME_BOUNDARY,
  });

const ready = (
  operation: GenesisRuntimeStateMachineOperation,
  state: GenesisRuntimeStateMachine,
): GenesisRuntimeStateMachineResult =>
  Object.freeze({
    status: "READY" as const,
    operation,
    source: "genesis_runtime_state_machine" as const,
    state,
    boundary: RUNTIME_BOUNDARY,
  });

const nextStageFor = (
  stage: GenesisRuntimeStage,
): GenesisRuntimeStage | null => {
  const index = STAGE_SEQUENCE.indexOf(stage);
  return index === -1 || index === STAGE_SEQUENCE.length - 1
    ? null
    : STAGE_SEQUENCE[index + 1];
};

const isValidReadiness = (
  result: GenesisRuntimeExperienceReadinessResult,
): boolean =>
  result.status === "READY" &&
  result.readiness === "READY_FOR_RUNTIME_EXPERIENCE_IMPLEMENTATION" &&
  result.readinessContract.runtimeSequenceContract ===
    "MOON_TO_COMPLETION_IN_ORDER" &&
  result.readinessContract.visualStateConsumption ===
    "READ_ONLY_UPSTREAM_GENESIS_VISUAL_STATES" &&
  result.readinessContract.transitionContract ===
    "CAUSALLY_CONTINUOUS_SLOW_REVEAL" &&
  result.readinessContract.interactionBoundary === "TIME_DELIVERY_ONLY" &&
  result.readinessContract.rendererConsumptionBoundary ===
    "VISUAL_STATE_TO_RENDERER_ONLY" &&
  result.boundary.readinessReviewOnly === true &&
  result.boundary.noFormalRuntimeIntegration === true &&
  result.boundary.noRendererInvocation === true &&
  result.boundary.noUiRendering === true &&
  result.boundary.noUserInputHandling === true &&
  result.boundary.noIdentityCalculation === true &&
  result.boundary.noEngineResultConsumption === true &&
  result.boundary.noStorageState === true &&
  result.boundary.noRealityPressure === true &&
  result.boundary.noGravity === true &&
  result.boundary.noChoice === true &&
  result.boundary.noCrystal === true &&
  result.boundary.noVisualStateMutation === true;

const isValidMachineBoundary = (
  machine: GenesisRuntimeStateMachine,
): boolean =>
  machine.boundary.stateMachineOnly === true &&
  machine.boundary.sequenceOrchestrationOnly === true &&
  machine.boundary.noVisualStateMutation === true &&
  machine.boundary.noVisualStateCreation === true &&
  machine.boundary.noIdentity === true &&
  machine.boundary.noUserData === true &&
  machine.boundary.noEngineResult === true &&
  machine.boundary.noRendererCommand === true &&
  machine.boundary.noRendererInvocation === true &&
  machine.boundary.noSceneModelMutation === true &&
  machine.boundary.noRenderPlanMutation === true &&
  machine.boundary.noReality === true &&
  machine.boundary.noGravity === true &&
  machine.boundary.noChoice === true &&
  machine.boundary.noCrystal === true &&
  machine.boundary.noStorage === true &&
  machine.boundary.noParallelGenesisStages === true &&
  machine.boundary.noStageReordering === true &&
  machine.boundary.userInputOnlyAtTimeResonance === true;

const withState = (
  machine: GenesisRuntimeStateMachine,
  values: Partial<{
    currentStage: GenesisRuntimeStage;
    previousStage: GenesisRuntimeStage | null;
    nextStage: GenesisRuntimeStage | null;
    transitionState: GenesisRuntimeTransitionState;
    sequenceStatus: "RUNNING" | "COMPLETED";
  }>,
): GenesisRuntimeStateMachine =>
  Object.freeze({
    currentStage: values.currentStage ?? machine.currentStage,
    previousStage:
      values.previousStage === undefined
        ? machine.previousStage
        : values.previousStage,
    nextStage:
      values.nextStage === undefined ? machine.nextStage : values.nextStage,
    transitionState: values.transitionState ?? machine.transitionState,
    sequenceStatus: values.sequenceStatus ?? machine.sequenceStatus,
    readinessReference: machine.readinessReference,
    boundary: RUNTIME_BOUNDARY,
  });

export function initializeGenesisRuntimeStateMachine(
  input: GenesisRuntimeStateMachineInput,
): GenesisRuntimeStateMachineResult {
  const readiness = input.readinessResult;
  if (readiness === null) {
    return unavailable("INITIALIZE", "READINESS_RESULT_REQUIRED");
  }
  if (readiness.status === "UNAVAILABLE") {
    return unavailable("INITIALIZE", "READINESS_RESULT_UNAVAILABLE");
  }
  if (readiness.status === "BLOCKED") {
    return blocked(
      "INITIALIZE",
      "READINESS_RESULT_BLOCKED",
      Object.freeze({
        currentStage: "MOON_ORIGIN",
        previousStage: null,
        nextStage: "STAR_RIVER",
        transitionState: "ENTERING",
        sequenceStatus: "RUNNING",
        readinessReference: readiness,
        boundary: RUNTIME_BOUNDARY,
      }),
    );
  }
  if (!isValidReadiness(readiness)) {
    return blocked(
      "INITIALIZE",
      "READINESS_BOUNDARY_INVALID",
      Object.freeze({
        currentStage: "MOON_ORIGIN",
        previousStage: null,
        nextStage: "STAR_RIVER",
        transitionState: "ENTERING",
        sequenceStatus: "RUNNING",
        readinessReference: readiness,
        boundary: RUNTIME_BOUNDARY,
      }),
    );
  }

  return ready(
    "INITIALIZE",
    Object.freeze({
      currentStage: "MOON_ORIGIN",
      previousStage: null,
      nextStage: "STAR_RIVER",
      transitionState: "ENTERING",
      sequenceStatus: "RUNNING",
      readinessReference: readiness,
      boundary: RUNTIME_BOUNDARY,
    }),
  );
}

export function activateGenesisRuntimeStage(
  machine: GenesisRuntimeStateMachine,
): GenesisRuntimeStateMachineResult {
  if (!isValidMachineBoundary(machine)) {
    return blocked("ACTIVATE_STAGE", "STATE_BOUNDARY_INVALID", machine);
  }
  if (machine.sequenceStatus === "COMPLETED") {
    return blocked("ACTIVATE_STAGE", "SEQUENCE_ALREADY_COMPLETED", machine);
  }
  if (machine.transitionState !== "ENTERING") {
    return blocked("ACTIVATE_STAGE", "STAGE_NOT_ENTERING", machine);
  }
  return ready("ACTIVATE_STAGE", withState(machine, { transitionState: "ACTIVE" }));
}

export function completeGenesisRuntimeStage(
  machine: GenesisRuntimeStateMachine,
): GenesisRuntimeStateMachineResult {
  if (!isValidMachineBoundary(machine)) {
    return blocked("COMPLETE_STAGE", "STATE_BOUNDARY_INVALID", machine);
  }
  if (machine.sequenceStatus === "COMPLETED") {
    return blocked("COMPLETE_STAGE", "SEQUENCE_ALREADY_COMPLETED", machine);
  }
  if (machine.transitionState !== "ACTIVE") {
    return blocked("COMPLETE_STAGE", "STAGE_NOT_ACTIVE", machine);
  }
  return ready(
    "COMPLETE_STAGE",
    withState(machine, {
      transitionState: "COMPLETED",
      sequenceStatus:
        machine.currentStage === "COMPLETION" ? "COMPLETED" : "RUNNING",
    }),
  );
}

export function beginGenesisRuntimeTransition(
  input: GenesisRuntimeStageTransitionInput,
): GenesisRuntimeStateMachineResult {
  const { machine, targetStage, trigger } = input;
  if (!isValidMachineBoundary(machine)) {
    return blocked("BEGIN_TRANSITION", "STATE_BOUNDARY_INVALID", machine);
  }
  if (machine.sequenceStatus === "COMPLETED") {
    return blocked("BEGIN_TRANSITION", "SEQUENCE_ALREADY_COMPLETED", machine);
  }
  if (machine.transitionState !== "COMPLETED") {
    return blocked("BEGIN_TRANSITION", "STAGE_NOT_COMPLETED", machine);
  }
  if (machine.nextStage !== targetStage) {
    return blocked("BEGIN_TRANSITION", "INVALID_NEXT_STAGE", machine);
  }
  if (machine.currentStage === "TIME_RESONANCE" && trigger !== "TIME_DELIVERY") {
    return blocked("BEGIN_TRANSITION", "TIME_DELIVERY_REQUIRED", machine);
  }
  if (machine.currentStage !== "TIME_RESONANCE" && trigger === "TIME_DELIVERY") {
    return blocked(
      "BEGIN_TRANSITION",
      "TIME_DELIVERY_ONLY_AT_TIME_RESONANCE",
      machine,
    );
  }
  return ready(
    "BEGIN_TRANSITION",
    withState(machine, { transitionState: "TRANSITIONING" }),
  );
}

export function completeGenesisRuntimeTransition(
  machine: GenesisRuntimeStateMachine,
): GenesisRuntimeStateMachineResult {
  if (!isValidMachineBoundary(machine)) {
    return blocked("COMPLETE_TRANSITION", "STATE_BOUNDARY_INVALID", machine);
  }
  if (machine.transitionState !== "TRANSITIONING" || machine.nextStage === null) {
    return blocked("COMPLETE_TRANSITION", "TRANSITION_NOT_IN_PROGRESS", machine);
  }
  const currentStage = machine.nextStage;
  return ready(
    "COMPLETE_TRANSITION",
    withState(machine, {
      currentStage,
      previousStage: machine.currentStage,
      nextStage: nextStageFor(currentStage),
      transitionState: "ENTERING",
    }),
  );
}
