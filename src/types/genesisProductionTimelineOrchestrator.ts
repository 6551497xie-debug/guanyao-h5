import type { GenesisProductionRuntimeSession } from "./genesisProductionRuntimeConsumer";

export type GenesisProductionTimelineDirective =
  | Readonly<{
      behavior: "AUTO_ADVANCE";
      stage: Exclude<
        GenesisProductionRuntimeSession["currentStage"],
        "TIME_RESONANCE" | "COMPLETION"
      >;
      delayMs: number;
    }>
  | Readonly<{
      behavior: "WAIT_FOR_TIME_DELIVERY";
      stage: "TIME_RESONANCE";
      delayMs: null;
    }>
  | Readonly<{
      behavior: "RECOGNITION_HOLD";
      stage: "COMPLETION";
      delayMs: null;
    }>;

export type GenesisProductionTimelineOrchestratorBoundary = Readonly<{
  productionTimelineOrchestrationOnly: true;
  frozenTimingValuesOnly: true;
  runtimeSessionConsumed: true;
  timeDeliveryOnlyInteraction: true;
  completionRecognitionHoldRequired: true;
  noFixtureSource: true;
  noPreviewRuntime: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noCalibrationMutation: true;
  noTimelineSemanticMutation: true;
  noRouteRegistration: true;
  noNavigationMutation: true;
  noStorageWrite: true;
}>;

export type GenesisProductionTimelineOrchestrationResult =
  | Readonly<{
      status: "READY";
      directive: GenesisProductionTimelineDirective;
      boundary: GenesisProductionTimelineOrchestratorBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      reason: "RUNTIME_SESSION_INVALID" | "TIMELINE_SEMANTIC_INVALID";
      directive: null;
      boundary: GenesisProductionTimelineOrchestratorBoundary;
    }>;
