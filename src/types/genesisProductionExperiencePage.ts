import type { GenesisProductionRouteActivationAuthorization } from "./genesisProductionRouteAuthorization";
import type { GenesisProductionVisualCalibrationBundle } from "./genesisProductionVisualCalibrationBridge";
import type { GenesisVisualConsumerSourceResult } from "./genesisVisualConsumerSource";

export type GenesisProductionCanvasHostState =
  | "STARTING"
  | "RENDERING"
  | "FALLBACK_REQUIRED"
  | "BLOCKED";

export type GenesisProductionCanvasHostBoundary = Readonly<{
  productionCanvasHostOnly: true;
  authorizedRouteInputOnly: true;
  realUserConsumerSourceOnly: true;
  productionRendererHostOnly: true;
  manualFrameDriverOnly: true;
  rendererLifecycleOwned: true;
  contextLossHandledByRendererCore: true;
  noFixtureSource: true;
  noPrototypeAuthorization: true;
  noEngineInvocation: true;
  noRendererCoreInvocation: true;
  noRenderPlanMutation: true;
  noProjectionMutation: true;
  noVisualCalibrationMutation: true;
  noTimelineMutation: true;
  noRouteRegistration: true;
  noNavigationMutation: true;
  noStorageWrite: true;
}>;

export type GenesisProductionRendererCanvasHostProps = Readonly<{
  routeAuthorization: Extract<
    GenesisProductionRouteActivationAuthorization,
    { status: "READY" }
  >;
  consumerSourceResult: Extract<
    GenesisVisualConsumerSourceResult,
    { status: "READY" }
  >;
  visualCalibrationBundle: GenesisProductionVisualCalibrationBundle;
  onStateChange?: (state: GenesisProductionCanvasHostState) => void;
}>;

export type GenesisProductionExperiencePageProps = Readonly<{
  sourceReferenceId: string | null;
}>;

export type GenesisProductionExperiencePageBoundary = Readonly<{
  productionExperiencePageOnly: true;
  productionRouteAuthorizationRequired: true;
  realUserSourceResolutionOnly: true;
  productionTimelineOrchestrationOnly: true;
  timeDeliveryOnlyInteraction: true;
  completionRecognitionHoldRequired: true;
  productionRecognitionRealityBridgeOnly: true;
  explicitRealityEntryRequired: true;
  noAutomaticRealityEntry: true;
  sourceNotReadyStopsRendering: true;
  noFixtureFallback: true;
  noPrototypeHarness: true;
  noPreviewRuntime: true;
  noEngineInvocation: true;
  noRouteRegistration: true;
  noNavigationMutation: true;
  noReality: true;
  noPressure: true;
  noGravity: true;
  noChoice: true;
  noCrystal: true;
  noStorageWrite: true;
}>;
