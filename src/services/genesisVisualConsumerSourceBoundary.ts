import type { GenesisVisualConsumerSourceBoundary } from "../types/genesisVisualConsumerSource";

export const GENESIS_VISUAL_CONSUMER_SOURCE_BOUNDARY:
  GenesisVisualConsumerSourceBoundary = Object.freeze({
    consumerSourceSelectionOnly: true,
    explicitExperienceModeRequired: true,
    realUserContextOnly: true,
    fixturePreviewOnly: true,
    noCrossModeFallback: true,
    noEngineInvocation: true,
    noRendererInvocation: true,
    rendererInputShapePreserved: true,
    noRenderPlanMutation: true,
    noProjectionMutation: true,
    noVisualCalibrationMutation: true,
    noTimelineMutation: true,
    noUIMutation: true,
    noStorageWrite: true,
    productionRendererActivation: false,
  });
