import type { RealityPressureActivationDeliveryOrchestrationBridgeBlockedReason } from "./realityPressureActivationDeliveryOrchestrationBridge";
import type { RealityPressureCandidateDeliverySession } from "./realityPressureCandidateDeliverySession";
import type { RealityPressureSeedCandidateSourceContext } from "./realityPressureSeedCandidateSource";
import type { RealityProductionPressureSeedConsumerInitializeInput } from "./realityProductionPressureSeedConsumer";
import type { RealityProductionRouteActivationAuthorization } from "./realityProductionRouteAuthorization";
import type { RealityRouteCandidateRequestContextBridgeResult } from "./realityRouteCandidateRequestContextBridge";

export type RealityRouteDeliveryOrchestrationBridgeBoundary = Readonly<{
  routeCandidateRequestToExistingDeliveryBridgeOnly: true;
  authorizedRealityRouteOnly: true;
  readyRouteCandidateRequestOnly: true;
  existingActivationDeliveryOrchestrationOnly: true;
  initializeOperationOnly: true;
  sourceReferenceContinuityRequired: true;
  activationReferenceTraceabilityRequired: true;
  consumerInputForwardingOnly: true;
  immutableOutputOnly: true;
  noFixtureSource: true;
  noPrototypeSource: true;
  noDefaultSource: true;
  noReferenceOnlySource: true;
  noSourceFallback: true;
  noSystemClock: true;
  noEngineInvocation: true;
  noSourceRecalculation: true;
  noCandidateSelection: true;
  noCaptureExecution: true;
  noConsumerInvocation: true;
  noGravityIntegration: true;
  noUiIntegration: true;
  noRendererInvocation: true;
  noNavigationInvocation: true;
  noStorageRead: true;
  noStorageWrite: true;
}>;

export type RealityRouteDeliveryOrchestrationBridgeInput = Readonly<{
  routeAuthorization: RealityProductionRouteActivationAuthorization;
  routeCandidateRequestResult: RealityRouteCandidateRequestContextBridgeResult;
}>;

export type RealityRouteDeliveryOrchestrationBridgeBlockedReason =
  | "REALITY_ROUTE_AUTHORIZATION_REQUIRED"
  | "ROUTE_CANDIDATE_REQUEST_NOT_READY"
  | "ROUTE_CANDIDATE_REQUEST_INVALID"
  | "FORBIDDEN_SOURCE_REFERENCE"
  | "SOURCE_REFERENCE_MISMATCH"
  | "DELIVERY_ORCHESTRATION_NOT_READY";

export type RealityRouteDeliveryOrchestrationBridgeResult =
  | Readonly<{
      status: "READY";
      operation: "INITIALIZE";
      sourceReferenceId: string;
      routeActivationContextReferenceId: string;
      candidateActivationContextReferenceId: string;
      deliverySession: RealityPressureCandidateDeliverySession;
      candidateSourceContext: RealityPressureSeedCandidateSourceContext;
      consumerInput: RealityProductionPressureSeedConsumerInitializeInput;
      provenance: Readonly<{
        routeCandidateRequestSource: "REALITY_ROUTE_CANDIDATE_REQUEST_CONTEXT_BRIDGE";
        deliveryOrchestrationSource: "REALITY_PRESSURE_ACTIVATION_DELIVERY_ORCHESTRATION_BRIDGE";
        sourceReferenceId: string;
        noCandidateSelection: true;
        consumerNotExecuted: true;
      }>;
      reason: null;
      deliveryBridgeReason: null;
      boundary: RealityRouteDeliveryOrchestrationBridgeBoundary;
    }>
  | Readonly<{
      status: "SOURCE_NOT_READY" | "BLOCKED";
      operation: "INITIALIZE";
      sourceReferenceId: string | null;
      routeActivationContextReferenceId: string | null;
      candidateActivationContextReferenceId: string | null;
      deliverySession: RealityPressureCandidateDeliverySession | null;
      candidateSourceContext: null;
      consumerInput: null;
      provenance: null;
      reason: RealityRouteDeliveryOrchestrationBridgeBlockedReason;
      deliveryBridgeReason: RealityPressureActivationDeliveryOrchestrationBridgeBlockedReason | null;
      boundary: RealityRouteDeliveryOrchestrationBridgeBoundary;
    }>;
