import type {
  GenesisRendererVisualRealizationBlockedReason,
  GenesisRendererVisualRealizationBoundary,
  GenesisRendererVisualRealizationInput,
  GenesisRendererVisualRealizationResult,
  GenesisRendererVisualRealizationUnavailableReason,
} from "../types/genesisRendererVisualRealization";

export const GENESIS_RENDERER_VISUAL_REALIZATION_BOUNDARY: GenesisRendererVisualRealizationBoundary =
  Object.freeze({
    rendererRealizationOnly: true,
    visualStateConsumed: true,
    runtimeConsumed: true,
    timelineConsumed: true,
    identityUntouched: true,
    engineUntouched: true,
    sceneModelUntouched: true,
    renderPlanUntouched: true,
    visualStateUntouched: true,
    runtimeUntouched: true,
    timelineUntouched: true,
    rendererSemanticCreationForbidden: true,
    productionIntegration: false,
    isolatedPrototypeOnly: true,
  });

const unavailable = (
  input: GenesisRendererVisualRealizationInput,
  reason: GenesisRendererVisualRealizationUnavailableReason,
): GenesisRendererVisualRealizationResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    realizationStatus: "UNAVAILABLE" as const,
    source: "genesis_renderer_visual_realization" as const,
    reason,
    input,
    realization: null,
    boundary: GENESIS_RENDERER_VISUAL_REALIZATION_BOUNDARY,
  });

const blocked = (
  input: GenesisRendererVisualRealizationInput,
  reason: GenesisRendererVisualRealizationBlockedReason,
): GenesisRendererVisualRealizationResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    realizationStatus: "BLOCKED" as const,
    source: "genesis_renderer_visual_realization" as const,
    reason,
    input,
    realization: null,
    boundary: GENESIS_RENDERER_VISUAL_REALIZATION_BOUNDARY,
  });

const hasConsumerBoundary = (
  contract: NonNullable<GenesisRendererVisualRealizationInput["rendererConsumerContract"]>,
): boolean => {
  const state = contract.visualStateReference.state as unknown as Record<
    string,
    unknown
  >;
  return (
    contract.visualStateReference.stage === contract.runtimeStage &&
    contract.timelineState.stage === contract.runtimeStage &&
    state.visualOnly === true &&
    state.identityBlind === true &&
    state.noEngineInvocation === true &&
    state.noRendererInvocation === true &&
    (state.noIdentity === true || state.noIdentityId === true)
  );
};

export function mapGenesisRendererVisualRealization(
  input: GenesisRendererVisualRealizationInput,
): GenesisRendererVisualRealizationResult {
  const contract = input.rendererConsumerContract;
  if (contract === null) {
    return unavailable(input, "RENDERER_CONSUMER_CONTRACT_REQUIRED");
  }
  if (!hasConsumerBoundary(contract)) {
    return blocked(input, "CONSUMER_BOUNDARY_INVALID");
  }
  if (
    !Number.isFinite(contract.transitionProgress) ||
    contract.transitionProgress < 0 ||
    contract.transitionProgress > 1
  ) {
    return blocked(input, "TRANSITION_PROGRESS_INVALID");
  }

  const common = {
    transitionProgress: contract.transitionProgress,
    rendererOnly: true as const,
    visualStateConsumed: true as const,
    runtimeConsumed: true as const,
    timelineConsumed: true as const,
    identityBlind: true as const,
    noIdentity: true as const,
    noEngineInvocation: true as const,
    noVisualStateMutation: true as const,
    noRuntimeMutation: true as const,
    noTimelineMutation: true as const,
    noLifeFactCopy: true as const,
    noRendererSemanticCreation: true as const,
    isolatedPrototypeOnly: true as const,
  };

  if (contract.runtimeStage === "MOON_ORIGIN") {
    return Object.freeze({
      status: "READY" as const,
      realizationStatus: "GENESIS_RENDERER_VISUAL_REALIZATION_READY" as const,
      source: "genesis_renderer_visual_realization" as const,
      input,
      realization: Object.freeze({
        ...common,
        activeVisualLayer: "MOON_ORIGIN" as const,
        visualExpressionMode: "TAIYIN_MOON_ENTRY" as const,
        environmentalState: Object.freeze({
          cosmicDepth: "UNLOCATED_DEEP_SPACE" as const,
          moonlight: "SOFT_TAIYIN_FIELD" as const,
          stellarOrder: "QUIET_BACKGROUND" as const,
          temporalResponse: "SLOW_ENTRY" as const,
        }),
        focalElementState: Object.freeze({
          focalElement: "MOON_DISC" as const,
          coreLightSuppression: 0.72,
          ambientFocus: 0.42,
        }),
      }),
      boundary: GENESIS_RENDERER_VISUAL_REALIZATION_BOUNDARY,
    });
  }

  if (contract.runtimeStage === "STAR_RIVER") {
    return Object.freeze({
      status: "READY" as const,
      realizationStatus: "GENESIS_RENDERER_VISUAL_REALIZATION_READY" as const,
      source: "genesis_renderer_visual_realization" as const,
      input,
      realization: Object.freeze({
        ...common,
        activeVisualLayer: "STAR_RIVER" as const,
        visualExpressionMode: "ORDERED_STAR_RIVER" as const,
        environmentalState: Object.freeze({
          cosmicDepth: "DEEP_LAYERED_COSMOS" as const,
          moonlight: "SOFT_TAIYIN_FIELD" as const,
          stellarOrder: "ORDERED_RELATIONS" as const,
          temporalResponse: "SLOW_DRIFT" as const,
        }),
        focalElementState: Object.freeze({
          focalElement: "STELLAR_RELATIONS" as const,
          coreLightSuppression: 0.48,
          ambientFocus: 0.72,
        }),
      }),
      boundary: GENESIS_RENDERER_VISUAL_REALIZATION_BOUNDARY,
    });
  }

  if (contract.runtimeStage === "TIME_RESONANCE") {
    return Object.freeze({
      status: "READY" as const,
      realizationStatus: "GENESIS_RENDERER_VISUAL_REALIZATION_READY" as const,
      source: "genesis_renderer_visual_realization" as const,
      input,
      realization: Object.freeze({
        ...common,
        activeVisualLayer: "TIME_RESONANCE" as const,
        visualExpressionMode: "TIME_RESONANCE" as const,
        environmentalState: Object.freeze({
          cosmicDepth: "DEEP_LAYERED_COSMOS" as const,
          moonlight: "MOONLIGHT_GATHERS_TO_TIME" as const,
          stellarOrder: "ORDERED_RELATIONS" as const,
          temporalResponse: "TIME_GATHERING" as const,
        }),
        focalElementState: Object.freeze({
          focalElement: "TIME_ALIGNMENT" as const,
          coreLightSuppression: 0.56,
          ambientFocus: 0.8,
        }),
      }),
      boundary: GENESIS_RENDERER_VISUAL_REALIZATION_BOUNDARY,
    });
  }

  return blocked(input, "P17_A_LAYER_OUT_OF_SCOPE");
}
