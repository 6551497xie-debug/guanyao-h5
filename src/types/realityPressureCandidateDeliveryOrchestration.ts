import type { RealityPressureCandidateDeliverySession } from "./realityPressureCandidateDeliverySession";
import type { RealityPressureCandidateRequestContext } from "./realityPressureCandidateRequestContextBridge";
import type { RealityPressureSeedCandidateSourceContext } from "./realityPressureSeedCandidateSource";
import type {
  RealityProductionPressureSeedConsumerAdvanceInput,
  RealityProductionPressureSeedConsumerInitializeInput,
  RealityProductionPressureSeedSession,
} from "./realityProductionPressureSeedConsumer";
import type { RealityProductionRouteActivationAuthorization } from "./realityProductionRouteAuthorization";

export type RealityPressureCandidateDeliveryOrchestrationBoundary = Readonly<{
  productionDeliveryOrchestrationOnly: true;
  authorizedRealitySourceOnly: true;
  realCandidateRequestContextOnly: true;
  existingCandidateSourceOnly: true;
  existingDeliverySessionOnly: true;
  consumerInputAssemblyOnly: true;
  sourceReferenceContinuityRequired: true;
  candidateCursorContinuityRequired: true;
  immutableOutputOnly: true;
  noFixtureSource: true;
  noPrototypeSource: true;
  noDefaultSource: true;
  noReferenceOnlySource: true;
  noSourceFallback: true;
  noNewPressureEngine: true;
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

export type RealityPressureCandidateDeliveryOrchestrationInitializeInput =
  Readonly<{
    routeAuthorization: RealityProductionRouteActivationAuthorization;
    candidateRequestContext: RealityPressureCandidateRequestContext;
  }>;

export type RealityPressureCandidateDeliveryOrchestrationAdvanceInput =
  Readonly<{
    deliverySession: RealityPressureCandidateDeliverySession;
    pressureSeedSession: RealityProductionPressureSeedSession;
    candidateRequestContext: RealityPressureCandidateRequestContext;
  }>;

export type RealityPressureCandidateDeliveryOrchestrationBlockedReason =
  | "REALITY_ROUTE_AUTHORIZATION_REQUIRED"
  | "CANDIDATE_REQUEST_CONTEXT_INVALID"
  | "FORBIDDEN_SOURCE_REFERENCE"
  | "SOURCE_REFERENCE_MISMATCH"
  | "CANDIDATE_CURSOR_MISMATCH"
  | "DELIVERY_HISTORY_MISMATCH"
  | "CANDIDATE_SOURCE_NOT_READY"
  | "DELIVERY_SESSION_BLOCKED"
  | "PRESSURE_SEED_SESSION_INVALID";

export type RealityPressureCandidateDeliveryOrchestrationResult =
  | Readonly<{
      status: "READY";
      operation: "INITIALIZE";
      sourceReferenceId: string;
      deliverySession: RealityPressureCandidateDeliverySession;
      candidateSourceContext: RealityPressureSeedCandidateSourceContext;
      consumerInput: RealityProductionPressureSeedConsumerInitializeInput;
      reason: null;
      boundary: RealityPressureCandidateDeliveryOrchestrationBoundary;
    }>
  | Readonly<{
      status: "READY";
      operation: "ADVANCE";
      sourceReferenceId: string;
      deliverySession: RealityPressureCandidateDeliverySession;
      candidateSourceContext: RealityPressureSeedCandidateSourceContext;
      consumerInput: RealityProductionPressureSeedConsumerAdvanceInput;
      reason: null;
      boundary: RealityPressureCandidateDeliveryOrchestrationBoundary;
    }>
  | Readonly<{
      status: "BLOCKED" | "SOURCE_NOT_READY";
      operation: "INITIALIZE" | "ADVANCE";
      sourceReferenceId: string | null;
      deliverySession: RealityPressureCandidateDeliverySession | null;
      candidateSourceContext: null;
      consumerInput: null;
      reason: RealityPressureCandidateDeliveryOrchestrationBlockedReason;
      boundary: RealityPressureCandidateDeliveryOrchestrationBoundary;
    }>;
