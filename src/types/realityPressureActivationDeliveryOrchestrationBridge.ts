import type { RealityPressureActivationCandidateRequestContext } from "./realityPressureActivationCandidateRequestBridge";
import type { RealityPressureCandidateDeliverySession } from "./realityPressureCandidateDeliverySession";
import type { RealityPressureCandidateDeliveryOrchestrationBlockedReason } from "./realityPressureCandidateDeliveryOrchestration";
import type { RealityPressureSeedCandidateSourceContext } from "./realityPressureSeedCandidateSource";
import type {
  RealityProductionPressureSeedConsumerAdvanceInput,
  RealityProductionPressureSeedConsumerInitializeInput,
  RealityProductionPressureSeedSession,
} from "./realityProductionPressureSeedConsumer";
import type { RealityProductionRouteActivationAuthorization } from "./realityProductionRouteAuthorization";

export type RealityPressureActivationDeliveryOrchestrationBridgeBoundary =
  Readonly<{
    activationRequestToDeliveryOrchestrationOnly: true;
    existingActivationRequestContextOnly: true;
    existingDeliveryOrchestrationOnly: true;
    consumerInputForwardingOnly: true;
    sourceReferenceContinuityRequired: true;
    activationReferenceTraceabilityRequired: true;
    immutableOutputOnly: true;
    noFixtureSource: true;
    noPrototypeSource: true;
    noDefaultSource: true;
    noReferenceOnlySource: true;
    noSourceFallback: true;
    noEngineInvocation: true;
    noSourceRecalculation: true;
    noCandidateSourceDirectInvocation: true;
    noCandidateAssembly: true;
    noAutomaticSelection: true;
    noCaptureExecution: true;
    noPressureConsumerExecution: true;
    noGravityIntegration: true;
    noUiIntegration: true;
    noRendererInvocation: true;
    noRouteMutation: true;
    noNavigationMutation: true;
    noStorageRead: true;
    noStorageWrite: true;
  }>;

export type RealityPressureActivationDeliveryOrchestrationInitializeInput =
  Readonly<{
    routeAuthorization: RealityProductionRouteActivationAuthorization;
    activationRequestContext: RealityPressureActivationCandidateRequestContext;
  }>;

export type RealityPressureActivationDeliveryOrchestrationAdvanceInput =
  Readonly<{
    deliverySession: RealityPressureCandidateDeliverySession;
    pressureSeedSession: RealityProductionPressureSeedSession;
    activationRequestContext: RealityPressureActivationCandidateRequestContext;
  }>;

export type RealityPressureActivationDeliveryOrchestrationBridgeBlockedReason =
  | "ACTIVATION_REQUEST_CONTEXT_INVALID"
  | "FORBIDDEN_SOURCE_REFERENCE"
  | "SOURCE_REFERENCE_MISMATCH"
  | "DELIVERY_ORCHESTRATION_NOT_READY";

export type RealityPressureActivationDeliveryOrchestrationBridgeResult =
  | Readonly<{
      status: "READY";
      operation: "INITIALIZE";
      sourceReferenceId: string;
      activationContextReferenceId: string;
      deliverySession: RealityPressureCandidateDeliverySession;
      candidateSourceContext: RealityPressureSeedCandidateSourceContext;
      consumerInput: RealityProductionPressureSeedConsumerInitializeInput;
      provenance: Readonly<{
        activationRequestSource: "REALITY_PRESSURE_ACTIVATION_CANDIDATE_REQUEST_CONTEXT";
        deliveryOrchestrationSource: "REALITY_PRESSURE_CANDIDATE_DELIVERY_ORCHESTRATION";
        sourceReferenceId: string;
        noCandidateSelection: true;
      }>;
      reason: null;
      orchestrationReason: null;
      boundary: RealityPressureActivationDeliveryOrchestrationBridgeBoundary;
    }>
  | Readonly<{
      status: "READY";
      operation: "ADVANCE";
      sourceReferenceId: string;
      activationContextReferenceId: string;
      deliverySession: RealityPressureCandidateDeliverySession;
      candidateSourceContext: RealityPressureSeedCandidateSourceContext;
      consumerInput: RealityProductionPressureSeedConsumerAdvanceInput;
      provenance: Readonly<{
        activationRequestSource: "REALITY_PRESSURE_ACTIVATION_CANDIDATE_REQUEST_CONTEXT";
        deliveryOrchestrationSource: "REALITY_PRESSURE_CANDIDATE_DELIVERY_ORCHESTRATION";
        sourceReferenceId: string;
        noCandidateSelection: true;
      }>;
      reason: null;
      orchestrationReason: null;
      boundary: RealityPressureActivationDeliveryOrchestrationBridgeBoundary;
    }>
  | Readonly<{
      status: "SOURCE_NOT_READY" | "BLOCKED";
      operation: "INITIALIZE" | "ADVANCE";
      sourceReferenceId: string | null;
      activationContextReferenceId: string | null;
      deliverySession: RealityPressureCandidateDeliverySession | null;
      candidateSourceContext: null;
      consumerInput: null;
      provenance: null;
      reason: RealityPressureActivationDeliveryOrchestrationBridgeBlockedReason;
      orchestrationReason: RealityPressureCandidateDeliveryOrchestrationBlockedReason | null;
      boundary: RealityPressureActivationDeliveryOrchestrationBridgeBoundary;
    }>;
