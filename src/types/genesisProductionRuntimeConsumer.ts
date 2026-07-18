import type { GenesisProductionRouteActivationAuthorization } from "./genesisProductionRouteAuthorization";
import type { GenesisRuntimeStage } from "./genesisRuntimeStateMachine";
import type { GenesisTransitionTimelineStage } from "./genesisTransitionTimeline";

export type GenesisProductionRuntimeTrigger =
  | "AUTO_ADVANCE"
  | "TIME_DELIVERY";

export type GenesisProductionRuntimeInteraction =
  | "NONE"
  | "TIME_DELIVERY"
  | "RECOGNITION_HOLD";

export type GenesisProductionRuntimeStatus =
  | "RUNNING"
  | "RECOGNITION_HOLD";

export type GenesisProductionRuntimeConsumerBoundary = Readonly<{
  productionRuntimeConsumerOnly: true;
  authorizedProductionGenesisOnly: true;
  immutableSessionOnly: true;
  frozenStageOrderOnly: true;
  frozenTimelineSemanticsOnly: true;
  timeDeliveryOnlyInteraction: true;
  completionRecognitionHoldRequired: true;
  noPreviewFixture: true;
  noVisualStateCreation: true;
  noRenderPlanConsumption: true;
  noProjectionMutation: true;
  noEngineResult: true;
  noUserData: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noRendererCoreInvocation: true;
  noRouteRegistration: true;
  noNavigationMutation: true;
  noReality: true;
  noPressure: true;
  noGravity: true;
  noChoice: true;
  noCrystal: true;
  noStorageWrite: true;
}>;

export type GenesisProductionRuntimeSession = Readonly<{
  schemaVersion: "GUANYAO_GENESIS_PRODUCTION_RUNTIME_SESSION_V1";
  source: "genesis_production_runtime_consumer";
  sourceExperienceMode: "REAL_USER_EXPERIENCE";
  sourceProvenance: "REAL_USER_SESSION";
  sourceReferenceId: string;
  currentStage: GenesisRuntimeStage;
  previousStage: GenesisRuntimeStage | null;
  nextStage: GenesisRuntimeStage | null;
  timelineState: GenesisTransitionTimelineStage;
  interactionAvailability: GenesisProductionRuntimeInteraction;
  runtimeStatus: GenesisProductionRuntimeStatus;
  boundary: GenesisProductionRuntimeConsumerBoundary;
}>;

export type GenesisProductionRuntimeInitializeInput = Readonly<{
  routeAuthorization: Extract<
    GenesisProductionRouteActivationAuthorization,
    { status: "READY" }
  >;
}>;

export type GenesisProductionRuntimeAdvanceInput = Readonly<{
  session: GenesisProductionRuntimeSession;
  trigger: GenesisProductionRuntimeTrigger;
}>;

export type GenesisProductionRuntimeOperation = "INITIALIZE" | "ADVANCE";

export type GenesisProductionRuntimeBlockedReason =
  | "ROUTE_AUTHORIZATION_INVALID"
  | "SOURCE_REFERENCE_INVALID"
  | "RUNTIME_SESSION_INVALID"
  | "SEQUENCE_ALREADY_AT_RECOGNITION_HOLD"
  | "TIME_DELIVERY_REQUIRED"
  | "TIME_DELIVERY_ONLY_AT_TIME_RESONANCE";

export type GenesisProductionRuntimeConsumerResult =
  | Readonly<{
      status: "READY";
      operation: GenesisProductionRuntimeOperation;
      source: "genesis_production_runtime_consumer";
      session: GenesisProductionRuntimeSession;
      boundary: GenesisProductionRuntimeConsumerBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      operation: GenesisProductionRuntimeOperation;
      source: "genesis_production_runtime_consumer";
      reason: GenesisProductionRuntimeBlockedReason;
      session: GenesisProductionRuntimeSession | null;
      boundary: GenesisProductionRuntimeConsumerBoundary;
    }>;
