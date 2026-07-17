import type { GenesisRuntimeStage } from "../types/genesisRuntimeStateMachine";
import type {
  GenesisRendererConsumerBlockedReason,
  GenesisRendererConsumerBoundary,
  GenesisRendererConsumerInput,
  GenesisRendererConsumerResult,
  GenesisRendererConsumerUnavailableReason,
  GenesisRendererRenderIntent,
  GenesisRendererVisualStateReference,
} from "../types/genesisRendererConsumerContract";

export const GENESIS_RENDERER_CONSUMER_BOUNDARY: GenesisRendererConsumerBoundary =
  Object.freeze({
    rendererConsumerOnly: true,
    runtimeStageConsumed: true,
    timelineStateConsumed: true,
    visualStateConsumed: true,
    noVisualStateMutation: true,
    noVisualStateCreation: true,
    noIdentity: true,
    noBirthData: true,
    noEngineResult: true,
    noEngineInvocation: true,
    noRendererInvocation: true,
    noRendererCreation: true,
    noSceneModel: true,
    noRenderPlan: true,
    noUserData: true,
    noStorage: true,
    noReality: true,
    noGravity: true,
    noChoice: true,
    noCrystal: true,
    isolatedGenesisRuntimeConsumerOnly: true,
    productionIntegration: false,
  });

const RENDER_INTENT_BY_STAGE: Readonly<Record<GenesisRuntimeStage, GenesisRendererRenderIntent>> =
  Object.freeze({
    MOON_ORIGIN: "TAIYIN_ENTRY",
    STAR_RIVER: "STELLAR_ORDER",
    TIME_RESONANCE: "TIME_RESPONSE",
    SYMBOL_REVEAL: "SYMBOLIC_FIELD",
    HEXAGRAM_IMPRINT: "CHANGE_IMPRINT",
    LIFE_FORCE: "LIFE_FORCE_MOTION",
    STAR_BEAST_REVEAL: "LIFE_PRESENCE",
    COMPLETION: "RECOGNITION_HOLD",
  });

const unavailable = (
  input: GenesisRendererConsumerInput,
  reason: GenesisRendererConsumerUnavailableReason,
): GenesisRendererConsumerResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    consumerStatus: "UNAVAILABLE" as const,
    source: "genesis_renderer_consumer" as const,
    reason,
    input,
    contract: null,
    boundary: GENESIS_RENDERER_CONSUMER_BOUNDARY,
  });

const blocked = (
  input: GenesisRendererConsumerInput,
  reason: GenesisRendererConsumerBlockedReason,
): GenesisRendererConsumerResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    consumerStatus: "BLOCKED" as const,
    source: "genesis_renderer_consumer" as const,
    reason,
    input,
    contract: null,
    boundary: GENESIS_RENDERER_CONSUMER_BOUNDARY,
  });

const hasRuntimeBoundary = (input: GenesisRendererConsumerInput): boolean => {
  const runtime = input.runtimeStateMachineReference;
  return (
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
    runtime.boundary.userInputOnlyAtTimeResonance === true
  );
};

const hasTimelineBoundary = (input: GenesisRendererConsumerInput): boolean => {
  const timeline = input.transitionTimelineReference;
  return (
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
    timeline.boundary.noCrystal === true
  );
};

const hasVisualStateBoundary = (
  reference: GenesisRendererVisualStateReference,
): boolean => {
  const state = reference.state as unknown as Record<string, unknown>;
  if (reference.stage === "COMPLETION") {
    const runtimeBoundary = state.runtimeBoundary as Record<string, unknown> | undefined;
    return (
      runtimeBoundary?.genesisLayerOnly === true &&
      runtimeBoundary.noIdentityMutation === true &&
      runtimeBoundary.noEngineInvocation === true &&
      runtimeBoundary.noRendererInvocation === true &&
      runtimeBoundary.noVisualStateMutation === true &&
      runtimeBoundary.noRealityCalculation === true &&
      runtimeBoundary.noCrystal === true &&
      runtimeBoundary.noStorage === true
    );
  }
  return (
    state.visualOnly === true &&
    state.identityBlind === true &&
    state.noEngineInvocation === true &&
    state.noSceneModelInvocation === true &&
    state.noRenderPlanInvocation === true &&
    state.noRendererInvocation === true &&
    (state.noIdentity === true || state.noIdentityId === true)
  );
};

const referenceForStage = (
  stage: GenesisRuntimeStage,
  input: GenesisRendererConsumerInput,
): GenesisRendererVisualStateReference | null => {
  const references = input.visualStateReferences;
  switch (stage) {
    case "MOON_ORIGIN":
      return references.moonOrigin === null
        ? null
        : Object.freeze({
            stage,
            referenceType: "MOON_ORIGIN_VISUAL_STATE" as const,
            state: references.moonOrigin,
          });
    case "STAR_RIVER":
      return references.starRiver === null
        ? null
        : Object.freeze({
            stage,
            referenceType: "STAR_RIVER_VISUAL_STATE" as const,
            state: references.starRiver,
          });
    case "TIME_RESONANCE":
      return references.timeResonance === null
        ? null
        : Object.freeze({
            stage,
            referenceType: "TIME_RESONANCE_VISUAL_STATE" as const,
            state: references.timeResonance,
          });
    case "SYMBOL_REVEAL":
      return references.symbol === null
        ? null
        : Object.freeze({
            stage,
            referenceType: "SYMBOL_VISUAL_STATE" as const,
            state: references.symbol,
          });
    case "HEXAGRAM_IMPRINT":
      return references.hexagram === null
        ? null
        : Object.freeze({
            stage,
            referenceType: "HEXAGRAM_VISUAL_STATE" as const,
            state: references.hexagram,
          });
    case "LIFE_FORCE":
      return references.lifeForce === null
        ? null
        : Object.freeze({
            stage,
            referenceType: "LIFE_FORCE_VISUAL_STATE" as const,
            state: references.lifeForce,
          });
    case "STAR_BEAST_REVEAL":
      return references.starBeastPresence === null
        ? null
        : Object.freeze({
            stage,
            referenceType: "PERSONAL_STAR_BEAST_PRESENCE_VISUAL_STATE" as const,
            state: references.starBeastPresence,
          });
    case "COMPLETION":
      return references.completion === null
        ? null
        : Object.freeze({
            stage,
            referenceType: "GENESIS_COMPLETION_MOMENT_REVIEW" as const,
            state: references.completion,
          });
  }
};

export function resolveGenesisRendererConsumer(
  input: GenesisRendererConsumerInput,
): GenesisRendererConsumerResult {
  const runtime = input.runtimeStateMachineReference;
  const timeline = input.transitionTimelineReference;
  if (runtime === null) {
    return unavailable(input, "RUNTIME_STATE_REFERENCE_REQUIRED");
  }
  if (timeline === null) {
    return unavailable(input, "TRANSITION_TIMELINE_REFERENCE_REQUIRED");
  }
  if (!hasRuntimeBoundary(input)) {
    return blocked(input, "RUNTIME_BOUNDARY_INVALID");
  }
  if (!hasTimelineBoundary(input)) {
    return blocked(input, "TIMELINE_BOUNDARY_INVALID");
  }
  if (timeline.runtimeStateMachineReference !== runtime) {
    return blocked(input, "RUNTIME_TIMELINE_REFERENCE_MISMATCH");
  }
  if (!Number.isFinite(input.transitionProgress) || input.transitionProgress < 0 || input.transitionProgress > 1) {
    return blocked(input, "TRANSITION_PROGRESS_INVALID");
  }

  const timelineState = timeline.stages.find(
    (stage) => stage.stage === runtime.currentStage,
  );
  if (timelineState === undefined) {
    return blocked(input, "STAGE_TIMELINE_MISMATCH");
  }
  const visualStateReference = referenceForStage(runtime.currentStage, input);
  if (visualStateReference === null) {
    return unavailable(input, "VISUAL_STATE_REFERENCE_REQUIRED");
  }
  if (!hasVisualStateBoundary(visualStateReference)) {
    return blocked(input, "VISUAL_STATE_BOUNDARY_INVALID");
  }

  return Object.freeze({
    status: "READY" as const,
    consumerStatus: "GENESIS_RENDERER_CONSUMER_READY" as const,
    source: "genesis_renderer_consumer" as const,
    input,
    contract: Object.freeze({
      runtimeStage: runtime.currentStage,
      visualStateReference,
      timelineState,
      renderIntent: RENDER_INTENT_BY_STAGE[runtime.currentStage],
      transitionProgress: input.transitionProgress,
    }),
    boundary: GENESIS_RENDERER_CONSUMER_BOUNDARY,
  });
}
