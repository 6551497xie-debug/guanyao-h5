import type { RealityProductionRouteActivationAuthorization } from "./realityProductionRouteAuthorization";
import type { RealityRouteDeliveryOrchestrationBridgeResult } from "./realityRouteDeliveryOrchestrationBridge";

export type RealityProductionPressureHostInputContractBoundary = Readonly<{
  productionPressureHostInputOnly: true;
  authorizedRealityRouteOnly: true;
  readyRouteDeliveryOnly: true;
  immutableInputOnly: true;
  sourceReferenceContinuityRequired: true;
  deliveryReferenceTraceabilityRequired: true;
  consumerInputForwardingOnly: true;
  noFixtureSource: true;
  noPrototypeSource: true;
  noDefaultSource: true;
  noReferenceOnlySource: true;
  noSourceFallback: true;
  noEngineInvocation: true;
  noSourceRecalculation: true;
  noCandidateSelection: true;
  noCaptureExecution: true;
  noPressureSeedConsumerInvocation: true;
  noGravityIntegration: true;
  noUiMutation: true;
  noRendererInvocation: true;
  noNavigationInvocation: true;
  noStorageRead: true;
  noStorageWrite: true;
}>;

export type RealityProductionPressureHostInputContractInput = Readonly<{
  routeAuthorization: RealityProductionRouteActivationAuthorization;
  routeDeliveryResult: RealityRouteDeliveryOrchestrationBridgeResult;
}>;

export type RealityProductionPressureHostInput = Readonly<{
  schemaVersion: "GUANYAO_REALITY_PRODUCTION_PRESSURE_HOST_INPUT_V1";
  source: "reality_production_pressure_host_input_contract";
  sourceExperienceMode: "REAL_USER_EXPERIENCE";
  sourceProvenance: "REAL_USER_SESSION";
  sourceReferenceId: string;
  routeActivationContextReferenceId: string;
  candidateActivationContextReferenceId: string;
  deliverySession: Extract<
    RealityRouteDeliveryOrchestrationBridgeResult,
    { status: "READY" }
  >["deliverySession"];
  consumerInput: Extract<
    RealityRouteDeliveryOrchestrationBridgeResult,
    { status: "READY" }
  >["consumerInput"];
  provenance: Readonly<{
    routeDeliverySource: "REALITY_ROUTE_DELIVERY_ORCHESTRATION_BRIDGE";
    consumerInputSource: "REALITY_PRODUCTION_PRESSURE_SEED_CONSUMER_INITIALIZE_INPUT";
    sourceReferenceId: string;
    consumerNotExecuted: true;
  }>;
  boundary: RealityProductionPressureHostInputContractBoundary;
}>;

export type RealityProductionPressureHostInputBlockedReason =
  | "REALITY_ROUTE_AUTHORIZATION_REQUIRED"
  | "ROUTE_DELIVERY_NOT_READY"
  | "ROUTE_DELIVERY_INVALID"
  | "FORBIDDEN_SOURCE_REFERENCE"
  | "SOURCE_REFERENCE_MISMATCH";

export type RealityProductionPressureHostInputContractResult =
  | Readonly<{
      status: "READY";
      input: RealityProductionPressureHostInput;
      reason: null;
      boundary: RealityProductionPressureHostInputContractBoundary;
    }>
  | Readonly<{
      status: "SOURCE_NOT_READY" | "BLOCKED";
      input: null;
      reason: RealityProductionPressureHostInputBlockedReason;
      boundary: RealityProductionPressureHostInputContractBoundary;
    }>;
