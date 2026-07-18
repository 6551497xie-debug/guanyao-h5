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
  if (contract.runtimeStage === "COMPLETION") {
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

  if (contract.runtimeStage === "SYMBOL_REVEAL") {
    return Object.freeze({
      status: "READY" as const,
      realizationStatus: "GENESIS_RENDERER_VISUAL_REALIZATION_READY" as const,
      source: "genesis_renderer_visual_realization" as const,
      input,
      realization: Object.freeze({
        ...common,
        activeVisualLayer: "SYMBOL_REVEAL" as const,
        visualExpressionMode: "SYMBOLIC_FIELD" as const,
        environmentalState: Object.freeze({
          cosmicDepth: "SYMBOLIC_FIELD_SPACE" as const,
          moonlight: "SOFT_TAIYIN_FIELD" as const,
          stellarOrder: "MORPHOLOGICAL_RELATIONS" as const,
          temporalResponse: "SYMBOLIC_AGGREGATION" as const,
        }),
        focalElementState: Object.freeze({
          focalElement: "SYMBOLIC_FIELD" as const,
          coreLightSuppression: 0.4,
          ambientFocus: 0.86,
        }),
      }),
      boundary: GENESIS_RENDERER_VISUAL_REALIZATION_BOUNDARY,
    });
  }

  if (contract.runtimeStage === "HEXAGRAM_IMPRINT") {
    return Object.freeze({
      status: "READY" as const,
      realizationStatus: "GENESIS_RENDERER_VISUAL_REALIZATION_READY" as const,
      source: "genesis_renderer_visual_realization" as const,
      input,
      realization: Object.freeze({
        ...common,
        activeVisualLayer: "HEXAGRAM_IMPRINT" as const,
        visualExpressionMode: "CHANGE_IMPRINT" as const,
        environmentalState: Object.freeze({
          cosmicDepth: "CHANGE_LAYERED_SPACE" as const,
          moonlight: "SOFT_TAIYIN_FIELD" as const,
          stellarOrder: "CHANGE_SEDIMENTATION" as const,
          temporalResponse: "CHANGE_SEDIMENTATION" as const,
        }),
        focalElementState: Object.freeze({
          focalElement: "CHANGE_IMPRINT" as const,
          coreLightSuppression: 0.28,
          ambientFocus: 0.92,
        }),
      }),
      boundary: GENESIS_RENDERER_VISUAL_REALIZATION_BOUNDARY,
    });
  }

  if (contract.runtimeStage === "LIFE_FORCE") {
    return Object.freeze({
      status: "READY" as const,
      realizationStatus: "GENESIS_RENDERER_VISUAL_REALIZATION_READY" as const,
      source: "genesis_renderer_visual_realization" as const,
      input,
      realization: Object.freeze({
        ...common,
        activeVisualLayer: "LIFE_FORCE" as const,
        visualExpressionMode: "LIFE_FORCE_MOTION" as const,
        environmentalState: Object.freeze({
          cosmicDepth: "LIFE_FORCE_SPACE" as const,
          moonlight: "MOONLIGHT_GATHERS_TO_TIME" as const,
          stellarOrder: "FORCE_RESPONSIVE" as const,
          temporalResponse: "LIFE_FORCE_AWAKENING" as const,
        }),
        focalElementState: Object.freeze({
          focalElement: "LIFE_FORCE" as const,
          coreLightSuppression: 0.2,
          ambientFocus: 0.98,
        }),
      }),
      boundary: GENESIS_RENDERER_VISUAL_REALIZATION_BOUNDARY,
    });
  }

  if (contract.runtimeStage === "STAR_BEAST_REVEAL") {
    return Object.freeze({
      status: "READY" as const,
      realizationStatus: "GENESIS_RENDERER_VISUAL_REALIZATION_READY" as const,
      source: "genesis_renderer_visual_realization" as const,
      input,
      realization: Object.freeze({
        ...common,
        activeVisualLayer: "STAR_BEAST_REVEAL" as const,
        visualExpressionMode: "LIFE_PRESENCE" as const,
        environmentalState: Object.freeze({
          cosmicDepth: "LIFE_PRESENCE_SPACE" as const,
          moonlight: "MOONLIGHT_GATHERS_TO_TIME" as const,
          stellarOrder: "LIFE_PRESENCE_RELATIONS" as const,
          temporalResponse: "LIFE_PRESENCE_BREATH" as const,
        }),
        focalElementState: Object.freeze({
          focalElement: "LIFE_PRESENCE" as const,
          coreLightSuppression: 0.12,
          ambientFocus: 1,
        }),
      }),
      boundary: GENESIS_RENDERER_VISUAL_REALIZATION_BOUNDARY,
    });
  }

  if (contract.runtimeStage === "COMPLETION") {
    return Object.freeze({
      status: "READY" as const,
      realizationStatus: "GENESIS_RENDERER_VISUAL_REALIZATION_READY" as const,
      source: "genesis_renderer_visual_realization" as const,
      input,
      realization: Object.freeze({
        ...common,
        activeVisualLayer: "COMPLETION" as const,
        visualExpressionMode: "RECOGNITION_HOLD" as const,
        environmentalState: Object.freeze({
          cosmicDepth: "STABLE_COSMOS" as const,
          moonlight: "MOONLIGHT_STABLE" as const,
          stellarOrder: "STABLE_RELATIONS" as const,
          temporalResponse: "RECOGNITION_HOLD" as const,
        }),
        focalElementState: Object.freeze({
          focalElement: "RECOGNITION_HOLD" as const,
          coreLightSuppression: 0.1,
          ambientFocus: 0.96,
        }),
      }),
      boundary: GENESIS_RENDERER_VISUAL_REALIZATION_BOUNDARY,
    });
  }

  return blocked(input, "P17_C_LAYER_OUT_OF_SCOPE");
}
