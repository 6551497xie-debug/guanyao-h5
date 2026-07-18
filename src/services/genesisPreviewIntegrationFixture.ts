import type { GenesisRendererConsumerContract } from "../types/genesisRendererConsumerContract";
import type { GenesisRuntimeStage } from "../types/genesisRuntimeStateMachine";
import type { GenesisPreviewIntegrationInput } from "../types/genesisPreviewIntegration";
import type { GenesisVisualHarness } from "../types/genesisVisualHarness";

const STAGES = Object.freeze([
  "MOON_ORIGIN",
  "STAR_RIVER",
  "TIME_RESONANCE",
  "SYMBOL_REVEAL",
  "HEXAGRAM_IMPRINT",
  "LIFE_FORCE",
  "STAR_BEAST_REVEAL",
  "COMPLETION",
] as const);

const timelineStageFor = (stage: GenesisRuntimeStage) =>
  Object.freeze({
    stage,
    stageDuration: stage === "COMPLETION" ? "COMPLETION_HOLD" : "SLOWLY_FLOWING",
    transitionDuration: stage === "COMPLETION" ? "NO_AUTOMATIC_TRANSITION" : "GRADUAL",
    rhythmProfile: stage === "TIME_RESONANCE" || stage === "HEXAGRAM_IMPRINT" ? "RESPONSE" : "FLOW",
    transitionEasing: stage === "COMPLETION" ? "NO_AUTOMATIC_TRANSITION" : "QUIET_DISSOLVE",
    userPauseWindow: stage === "TIME_RESONANCE" ? "TIME_DELIVERY_WINDOW" : stage === "COMPLETION" ? "RECOGNITION_WINDOW" : "OBSERVATION_WINDOW",
  });

const createConsumer = (stage: GenesisRuntimeStage): GenesisRendererConsumerContract => {
  const timelineState = timelineStageFor(stage);
  const visualState =
    stage === "COMPLETION"
      ? Object.freeze({
          completionState: "GENESIS_PRESENCE_STABILIZED",
          recognitionMoment: "PERSONAL_STAR_BEAST_RECOGNITION_OPEN",
          presenceStability: "QUIET_PRESENCE_STABLE",
          transitionReadiness: "REALITY_ENTRY_REVIEW_PENDING",
          emotionalClosure: "GENESIS_CLOSURE_OPEN_NOT_FINAL",
          genesisToRealityBoundary: "GENESIS_TO_REALITY_BOUNDARY_HELD",
          runtimeBoundary: Object.freeze({
            completionReviewOnly: true,
            genesisLayerOnly: true,
            realityEntryBoundaryHeld: true,
            noRealityCalculation: true,
            noPressureAnalysis: true,
            noGravity: true,
            noChoice: true,
            noCrystal: true,
            noStorage: true,
            noUserProfile: true,
            noIdentityMutation: true,
            noEngineInvocation: true,
            noRendererInvocation: true,
            noUiFlowMutation: true,
            noVisualStateMutation: true,
            noNewGenesisLayer: true,
          }),
        })
      : Object.freeze({
          visualOnly: true,
          identityBlind: true,
          noIdentity: true,
          noEngineInvocation: true,
          noSceneModelInvocation: true,
          noRenderPlanInvocation: true,
          noRendererInvocation: true,
        });
  return Object.freeze({
    runtimeStage: stage,
    visualStateReference: Object.freeze({
      stage,
      referenceType:
        stage === "COMPLETION"
          ? ("GENESIS_COMPLETION_MOMENT_REVIEW" as const)
          : ("MOON_ORIGIN_VISUAL_STATE" as const),
      state: visualState,
    }) as GenesisRendererConsumerContract["visualStateReference"],
    timelineState,
    renderIntent:
      stage === "MOON_ORIGIN"
        ? "TAIYIN_ENTRY"
        : stage === "STAR_RIVER"
          ? "STELLAR_ORDER"
          : stage === "TIME_RESONANCE"
            ? "TIME_RESPONSE"
            : stage === "SYMBOL_REVEAL"
              ? "SYMBOLIC_FIELD"
              : stage === "HEXAGRAM_IMPRINT"
                ? "CHANGE_IMPRINT"
                : stage === "LIFE_FORCE"
                  ? "LIFE_FORCE_MOTION"
                  : stage === "STAR_BEAST_REVEAL"
                    ? "LIFE_PRESENCE"
                    : "RECOGNITION_HOLD",
    transitionProgress: stage === "COMPLETION" ? 1 : 0,
  });
};

export function createGenesisPreviewIntegrationFixture(
  stage: GenesisRuntimeStage,
): GenesisPreviewIntegrationInput {
  const currentIndex = STAGES.indexOf(stage);
  const rendererConsumerState = createConsumer(stage);
  const runtimeSequenceReference = Object.freeze({
    currentStage: stage,
    previousStage: currentIndex > 0 ? STAGES[currentIndex - 1] : null,
    nextStage: currentIndex < STAGES.length - 1 ? STAGES[currentIndex + 1] : null,
    transitionState: stage === "COMPLETION" ? "COMPLETED" : "ACTIVE",
    sequenceStatus: stage === "COMPLETION" ? "COMPLETED" : "RUNNING",
    readinessReference: Object.freeze({ status: "READY" }),
    boundary: Object.freeze({
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
    }),
  });
  const timelineReference = Object.freeze({
    stages: [timelineStageFor(stage)],
    completionHold: "LONG_RECOGNITION_HOLD",
    runtimeStateMachineReference: runtimeSequenceReference,
    boundary: Object.freeze({
      timelineDefinitionOnly: true,
      noFastRhythm: true,
      noRendererAnimation: true,
      noWebGL: true,
      noShader: true,
      noParticleParameters: true,
      noVisualStateMutation: true,
      noIdentityMutation: true,
      noEngineInvocation: true,
      noStorageWrite: true,
      noUserFlowIntegration: true,
      noReality: true,
      noGravity: true,
      noChoice: true,
      noCrystal: true,
    }),
  });
  const runtimeSession = Object.freeze({
    harnessMode: "ISOLATED_GENESIS_PREVIEW" as const,
    runtimeSequenceReference,
    timelineReference,
    rendererConsumerReference: rendererConsumerState,
    previewState: Object.freeze({
      lifecycle: stage === "COMPLETION" ? "COMPLETED" : "RUNNING",
      currentStep: stage,
      currentStage: stage,
      transitionState: runtimeSequenceReference.transitionState,
      timelineState: rendererConsumerState.timelineState,
      rendererConsumerInput: rendererConsumerState,
    }),
    boundary: Object.freeze({
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
    }),
  });
  return Object.freeze({
    runtimeSession: runtimeSession as unknown as GenesisVisualHarness,
    rendererConsumerState,
  });
}
