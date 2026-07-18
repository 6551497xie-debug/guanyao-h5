import type { GenesisRuntimeStage } from "../types/genesisRuntimeStateMachine";
import type {
  GenesisVisualHarness,
  GenesisVisualHarnessAdvanceInput,
  GenesisVisualHarnessBlockedReason,
  GenesisVisualHarnessBoundary,
  GenesisVisualHarnessInput,
  GenesisVisualHarnessResult,
  GenesisVisualHarnessUnavailableReason,
} from "../types/genesisVisualHarness";

export const GENESIS_VISUAL_HARNESS_BOUNDARY: GenesisVisualHarnessBoundary =
  Object.freeze({
    isolatedPreviewOnly: true,
    devOnly: true,
    noProductionRoute: true,
    noProductionBuildConsumption: true,
    noIdentity: true,
    noUserData: true,
    noEngineResult: true,
    noEngineInvocation: true,
    noStorageReference: true,
    noReality: true,
    noGravity: true,
    noChoice: true,
    noCrystal: true,
    noVisualStateMutation: true,
    noVisualStateCreation: true,
    noSceneModelMutation: true,
    noRenderPlanMutation: true,
    noRendererSemanticMutation: true,
    noParallelStages: true,
    noStageSkipping: true,
    noAutomaticLoop: true,
    completionRequired: true,
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

const nextStageFor = (stage: GenesisRuntimeStage): GenesisRuntimeStage | null => {
  const index = STAGE_SEQUENCE.indexOf(stage);
  return index === -1 || index === STAGE_SEQUENCE.length - 1
    ? null
    : STAGE_SEQUENCE[index + 1];
};

const unavailable = (
  operation: "START" | "ADVANCE" | "END",
  reason: GenesisVisualHarnessUnavailableReason,
): GenesisVisualHarnessResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    operation,
    source: "genesis_visual_harness" as const,
    reason,
    harness: null,
    boundary: GENESIS_VISUAL_HARNESS_BOUNDARY,
  });

const blocked = (
  operation: "START" | "ADVANCE" | "END",
  reason: GenesisVisualHarnessBlockedReason,
  harness: GenesisVisualHarness | null = null,
): GenesisVisualHarnessResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    operation,
    source: "genesis_visual_harness" as const,
    reason,
    harness,
    boundary: GENESIS_VISUAL_HARNESS_BOUNDARY,
  });

const hasRuntimeBoundary = (
  runtime: GenesisVisualHarnessInput["runtimeSequenceReference"],
): boolean =>
  runtime !== null &&
  runtime.readinessReference.status === "READY" &&
  runtime.boundary.stateMachineOnly === true &&
  runtime.boundary.sequenceOrchestrationOnly === true &&
  runtime.boundary.noVisualStateMutation === true &&
  runtime.boundary.noVisualStateCreation === true &&
  runtime.boundary.noIdentity === true &&
  runtime.boundary.noUserData === true &&
  runtime.boundary.noEngineResult === true &&
  runtime.boundary.noRendererCommand === true &&
  runtime.boundary.noRendererInvocation === true &&
  runtime.boundary.noSceneModelMutation === true &&
  runtime.boundary.noRenderPlanMutation === true &&
  runtime.boundary.noReality === true &&
  runtime.boundary.noGravity === true &&
  runtime.boundary.noChoice === true &&
  runtime.boundary.noCrystal === true &&
  runtime.boundary.noStorage === true &&
  runtime.boundary.noParallelGenesisStages === true &&
  runtime.boundary.noStageReordering === true &&
  runtime.boundary.userInputOnlyAtTimeResonance === true;

const hasTimelineBoundary = (
  timeline: GenesisVisualHarnessInput["timelineReference"],
): boolean =>
  timeline !== null &&
  timeline.boundary.timelineDefinitionOnly === true &&
  timeline.boundary.noFastRhythm === true &&
  timeline.boundary.noRendererAnimation === true &&
  timeline.boundary.noWebGL === true &&
  timeline.boundary.noShader === true &&
  timeline.boundary.noParticleParameters === true &&
  timeline.boundary.noVisualStateMutation === true &&
  timeline.boundary.noIdentityMutation === true &&
  timeline.boundary.noEngineInvocation === true &&
  timeline.boundary.noStorageWrite === true &&
  timeline.boundary.noUserFlowIntegration === true &&
  timeline.boundary.noReality === true &&
  timeline.boundary.noGravity === true &&
  timeline.boundary.noChoice === true &&
  timeline.boundary.noCrystal === true;

const hasRendererConsumerBoundary = (
  consumer: GenesisVisualHarnessInput["rendererConsumerReference"],
): boolean =>
  consumer !== null &&
  consumer.runtimeStage === consumer.visualStateReference.stage &&
  consumer.runtimeStage === consumer.timelineState.stage &&
  consumer.transitionProgress >= 0 &&
  consumer.transitionProgress <= 1;

const hasHarnessInputBoundary = (
  input: GenesisVisualHarnessInput,
): boolean => {
  const runtime = input.runtimeSequenceReference;
  const timeline = input.timelineReference;
  const consumer = input.rendererConsumerReference;
  return (
    runtime !== null &&
    timeline !== null &&
    consumer !== null &&
    timeline.runtimeStateMachineReference === runtime &&
    consumer.runtimeStage === runtime.currentStage &&
    consumer.timelineState.stage === runtime.currentStage &&
    consumer.visualStateReference.stage === runtime.currentStage
  );
};

const hasSessionBoundary = (session: GenesisVisualHarness): boolean =>
  session.harnessMode === "ISOLATED_GENESIS_PREVIEW" &&
  session.boundary.isolatedPreviewOnly === true &&
  session.boundary.devOnly === true &&
  session.boundary.noProductionRoute === true &&
  session.boundary.noProductionBuildConsumption === true &&
  session.boundary.noIdentity === true &&
  session.boundary.noUserData === true &&
  session.boundary.noEngineResult === true &&
  session.boundary.noEngineInvocation === true &&
  session.boundary.noStorageReference === true &&
  session.boundary.noReality === true &&
  session.boundary.noGravity === true &&
  session.boundary.noChoice === true &&
  session.boundary.noCrystal === true &&
  session.boundary.noVisualStateMutation === true &&
  session.boundary.noVisualStateCreation === true &&
  session.boundary.noSceneModelMutation === true &&
  session.boundary.noRenderPlanMutation === true &&
  session.boundary.noRendererSemanticMutation === true &&
  session.boundary.noParallelStages === true &&
  session.boundary.noStageSkipping === true &&
  session.boundary.noAutomaticLoop === true &&
  session.boundary.completionRequired === true;

const createSession = (
  input: GenesisVisualHarnessInput,
): GenesisVisualHarness => {
  const runtime = input.runtimeSequenceReference!;
  const timeline = input.timelineReference!;
  const consumer = input.rendererConsumerReference!;
  return Object.freeze({
    harnessMode: "ISOLATED_GENESIS_PREVIEW" as const,
    runtimeSequenceReference: runtime,
    timelineReference: timeline,
    rendererConsumerReference: consumer,
    previewState: Object.freeze({
      lifecycle: "START" as const,
      currentStep: "START" as const,
      currentStage: runtime.currentStage,
      transitionState: runtime.transitionState,
      timelineState: consumer.timelineState,
      rendererConsumerInput: consumer,
    }),
    boundary: GENESIS_VISUAL_HARNESS_BOUNDARY,
  });
};

export function startGenesisVisualHarness(
  input: GenesisVisualHarnessInput,
): GenesisVisualHarnessResult {
  if (input.runtimeSequenceReference === null) {
    return unavailable("START", "RUNTIME_SEQUENCE_REFERENCE_REQUIRED");
  }
  if (input.timelineReference === null) {
    return unavailable("START", "TIMELINE_REFERENCE_REQUIRED");
  }
  if (input.rendererConsumerReference === null) {
    return unavailable("START", "RENDERER_CONSUMER_REFERENCE_REQUIRED");
  }
  if (!hasRuntimeBoundary(input.runtimeSequenceReference)) {
    return blocked("START", "RUNTIME_SEQUENCE_BOUNDARY_INVALID");
  }
  if (!hasTimelineBoundary(input.timelineReference)) {
    return blocked("START", "TIMELINE_BOUNDARY_INVALID");
  }
  if (!hasRendererConsumerBoundary(input.rendererConsumerReference)) {
    return blocked("START", "RENDERER_CONSUMER_BOUNDARY_INVALID");
  }
  if (!hasHarnessInputBoundary(input)) {
    return blocked("START", "RUNTIME_TIMELINE_REFERENCE_MISMATCH");
  }
  if (
    input.runtimeSequenceReference.currentStage !== "MOON_ORIGIN" ||
    input.rendererConsumerReference.runtimeStage !== "MOON_ORIGIN"
  ) {
    return blocked("START", "HARNESS_STAGE_INVALID");
  }

  return Object.freeze({
    status: "READY" as const,
    operation: "START" as const,
    source: "genesis_visual_harness" as const,
    harness: createSession(input),
    boundary: GENESIS_VISUAL_HARNESS_BOUNDARY,
  });
}

export function advanceGenesisVisualHarness(
  input: GenesisVisualHarnessAdvanceInput,
): GenesisVisualHarnessResult {
  const session = input.session;
  const nextRuntime = input.nextRuntimeSequenceReference;
  const nextTimeline = input.nextTimelineReference;
  const nextConsumer = input.nextRendererConsumerReference;
  if (!hasSessionBoundary(session)) {
    return blocked("ADVANCE", "HARNESS_BOUNDARY_INVALID", session);
  }
  if (session.previewState.lifecycle === "END") {
    return blocked("ADVANCE", "COMPLETION_ALREADY_REACHED", session);
  }
  if (nextRuntime === null) {
    return unavailable("ADVANCE", "NEXT_RUNTIME_SEQUENCE_REFERENCE_REQUIRED");
  }
  if (nextTimeline === null) {
    return unavailable("ADVANCE", "NEXT_TIMELINE_REFERENCE_REQUIRED");
  }
  if (nextConsumer === null) {
    return unavailable("ADVANCE", "NEXT_RENDERER_CONSUMER_REFERENCE_REQUIRED");
  }
  const nextInput: GenesisVisualHarnessInput = {
    runtimeSequenceReference: nextRuntime,
    timelineReference: nextTimeline,
    rendererConsumerReference: nextConsumer,
  };
  if (!hasRuntimeBoundary(nextRuntime)) {
    return blocked("ADVANCE", "RUNTIME_SEQUENCE_BOUNDARY_INVALID", session);
  }
  if (!hasTimelineBoundary(nextTimeline)) {
    return blocked("ADVANCE", "TIMELINE_BOUNDARY_INVALID", session);
  }
  if (!hasRendererConsumerBoundary(nextConsumer)) {
    return blocked("ADVANCE", "RENDERER_CONSUMER_BOUNDARY_INVALID", session);
  }
  if (!hasHarnessInputBoundary(nextInput)) {
    return blocked("ADVANCE", "RUNTIME_RENDERER_CONSUMER_REFERENCE_MISMATCH", session);
  }
  const expectedStage = nextStageFor(session.runtimeSequenceReference.currentStage);
  if (expectedStage === null) {
    return blocked("ADVANCE", "COMPLETION_ALREADY_REACHED", session);
  }
  if (nextRuntime.currentStage !== expectedStage) {
    return blocked("ADVANCE", "HARNESS_STAGE_SKIP_FORBIDDEN", session);
  }
  if (nextRuntime.previousStage !== session.runtimeSequenceReference.currentStage) {
    return blocked("ADVANCE", "HARNESS_PARALLEL_STAGE_FORBIDDEN", session);
  }
  const lifecycle = expectedStage === "COMPLETION" ? "COMPLETED" : "RUNNING";
  const nextSession: GenesisVisualHarness = Object.freeze({
    harnessMode: "ISOLATED_GENESIS_PREVIEW" as const,
    runtimeSequenceReference: nextRuntime,
    timelineReference: nextTimeline,
    rendererConsumerReference: nextConsumer,
    previewState: Object.freeze({
      lifecycle,
      currentStep: expectedStage,
      currentStage: nextRuntime.currentStage,
      transitionState: nextRuntime.transitionState,
      timelineState: nextConsumer.timelineState,
      rendererConsumerInput: nextConsumer,
    }),
    boundary: GENESIS_VISUAL_HARNESS_BOUNDARY,
  });
  return Object.freeze({
    status: "READY" as const,
    operation: "ADVANCE" as const,
    source: "genesis_visual_harness" as const,
    harness: nextSession,
    boundary: GENESIS_VISUAL_HARNESS_BOUNDARY,
  });
}

export function endGenesisVisualHarness(
  session: GenesisVisualHarness,
): GenesisVisualHarnessResult {
  if (!hasSessionBoundary(session)) {
    return blocked("END", "HARNESS_BOUNDARY_INVALID", session);
  }
  if (session.previewState.currentStage !== "COMPLETION") {
    return blocked("END", "COMPLETION_REQUIRED", session);
  }
  if (session.previewState.lifecycle !== "COMPLETED") {
    return blocked("END", "HARNESS_NOT_COMPLETED", session);
  }
  const endedSession: GenesisVisualHarness = Object.freeze({
    ...session,
    previewState: Object.freeze({
      ...session.previewState,
      lifecycle: "END" as const,
      currentStep: "END" as const,
    }),
  });
  return Object.freeze({
    status: "READY" as const,
    operation: "END" as const,
    source: "genesis_visual_harness" as const,
    harness: endedSession,
    boundary: GENESIS_VISUAL_HARNESS_BOUNDARY,
  });
}
