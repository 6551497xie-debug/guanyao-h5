import type { RealityPressureActivationCandidateRequestContext } from "./realityPressureActivationCandidateRequestBridge";
import type { RealityPressureActivationCandidateRequestBridgeResult } from "./realityPressureActivationCandidateRequestBridge";
import type { RealityPressureActivationDeliveryOrchestrationBridgeResult } from "./realityPressureActivationDeliveryOrchestrationBridge";
import type { RealityPressureCandidateActivationContext } from "./realityPressureCandidateActivationContext";
import type { RealityPressureCandidateDeliverySession } from "./realityPressureCandidateDeliverySession";
import type { RealityPressureSeedCandidateSourceContext } from "./realityPressureSeedCandidateSource";
import type {
  RealityProductionPressureSeedConsumerInitializeInput,
  RealityProductionPressureSeedConsumerAdvanceInput,
  RealityProductionPressureSeedConsumerResult,
  RealityProductionPressureSeedSession,
} from "./realityProductionPressureSeedConsumer";
import type { RealityProductionRouteActivationAuthorization } from "./realityProductionRouteAuthorization";
import type { RealityRouteCandidateRequestContextBridgeResult } from "./realityRouteCandidateRequestContextBridge";
import type { RealityRouteDeliveryOrchestrationBridgeResult } from "./realityRouteDeliveryOrchestrationBridge";
import type { RealityRoutePressureCandidateActivationBridgeResult } from "./realityRoutePressureCandidateActivationBridge";

export type RealityPressureSeedContinuationContextBoundary = Readonly<{
  continuationCarrierOnly: true;
  authorizedRealityRouteOnly: true;
  existingRouteResultsOnly: true;
  existingPressureSeedSessionOnly: true;
  initialConsumerSessionMustBeNull: true;
  sourceReferenceContinuityRequired: true;
  bundleReferenceContinuityRequired: true;
  immutableContextOnly: true;
  explicitUserRecognitionRequired: true;
  noFixtureSource: true;
  noPrototypeSource: true;
  noDefaultSource: true;
  noReferenceOnlySource: true;
  noSourceFallback: true;
  noSystemClock: true;
  noEngineInvocation: true;
  noSourceRecalculation: true;
  noCandidateSourceInvocation: true;
  noCandidateAssembly: true;
  noConsumerInvocation: true;
  noCaptureExecution: true;
  noCandidateSelection: true;
  noGravityIntegration: true;
  noUiIntegration: true;
  noRendererInvocation: true;
  noNavigationInvocation: true;
  noStorageRead: true;
  noStorageWrite: true;
}>;

type RealityPressureSeedContinuationContextCommon = Readonly<{
  schemaVersion: "GUANYAO_REALITY_PRESSURE_SEED_CONTINUATION_CONTEXT_V1";
  source: "reality_pressure_seed_continuation_context";
  contextReferenceId: string;
  sourceExperienceMode: "REAL_USER_EXPERIENCE";
  sourceProvenance: "REAL_USER_SESSION";
  sourceReferenceId: string;
  routeAuthorization: Extract<
    RealityProductionRouteActivationAuthorization,
    { status: "READY" }
  >;
  candidateActivationContext: RealityPressureCandidateActivationContext;
  activationRequestContext: RealityPressureActivationCandidateRequestContext;
  deliverySession: RealityPressureCandidateDeliverySession;
  candidateSourceContext: RealityPressureSeedCandidateSourceContext;
  provenance: Readonly<{
    routeCandidateActivationSource: "REALITY_ROUTE_PRESSURE_CANDIDATE_ACTIVATION_BRIDGE";
    routeCandidateRequestSource: "REALITY_ROUTE_CANDIDATE_REQUEST_CONTEXT_BRIDGE";
    routeDeliverySource: "REALITY_ROUTE_DELIVERY_ORCHESTRATION_BRIDGE";
    sourceReferenceId: string;
    userRecognitionRequired: true;
    noCandidateSelection: true;
  }>;
  boundary: RealityPressureSeedContinuationContextBoundary;
}>;

export type RealityPressureSeedContinuationContext =
  | (RealityPressureSeedContinuationContextCommon &
      Readonly<{
        phase: "READY_FOR_CONSUMER_INITIALIZATION";
        consumerInput: RealityProductionPressureSeedConsumerInitializeInput;
        pressureSeedSession: null;
      }>)
  | (RealityPressureSeedContinuationContextCommon &
      Readonly<{
        phase: "ACTIVE";
        consumerInput:
          | RealityProductionPressureSeedConsumerInitializeInput
          | RealityProductionPressureSeedConsumerAdvanceInput;
        pressureSeedSession: RealityProductionPressureSeedSession;
      }>);

export type RealityPressureSeedContinuationContextInput = Readonly<{
  routeAuthorization: RealityProductionRouteActivationAuthorization;
  routeCandidateActivationResult: RealityRoutePressureCandidateActivationBridgeResult;
  routeCandidateRequestResult: RealityRouteCandidateRequestContextBridgeResult;
  routeDeliveryResult: RealityRouteDeliveryOrchestrationBridgeResult;
}>;

export type RealityPressureSeedContinuationSessionInput = Readonly<{
  context: RealityPressureSeedContinuationContext;
  consumerResult: RealityProductionPressureSeedConsumerResult;
}>;

export type RealityPressureSeedContinuationAdvanceInput = Readonly<{
  context: Extract<RealityPressureSeedContinuationContext, { phase: "ACTIVE" }>;
  activationRequestResult: RealityPressureActivationCandidateRequestBridgeResult;
  deliveryResult: RealityPressureActivationDeliveryOrchestrationBridgeResult;
  consumerResult: RealityProductionPressureSeedConsumerResult;
}>;

export type RealityPressureSeedContinuationContextBlockedReason =
  | "REALITY_ROUTE_AUTHORIZATION_REQUIRED"
  | "ROUTE_CANDIDATE_ACTIVATION_NOT_READY"
  | "ROUTE_CANDIDATE_REQUEST_NOT_READY"
  | "ROUTE_DELIVERY_NOT_READY"
  | "CONTINUATION_CONTEXT_INVALID"
  | "PRESSURE_SEED_SESSION_NOT_READY"
  | "ACTIVATION_REQUEST_NOT_READY"
  | "DELIVERY_ADVANCE_NOT_READY"
  | "FORBIDDEN_SOURCE_REFERENCE"
  | "SOURCE_REFERENCE_MISMATCH"
  | "ACTIVATION_REFERENCE_MISMATCH"
  | "BUNDLE_REFERENCE_MISMATCH";

export type RealityPressureSeedContinuationContextResult =
  | Readonly<{
      status: "READY";
      context: RealityPressureSeedContinuationContext;
      reason: null;
      boundary: RealityPressureSeedContinuationContextBoundary;
    }>
  | Readonly<{
      status: "SOURCE_NOT_READY" | "BLOCKED";
      context: null;
      reason: RealityPressureSeedContinuationContextBlockedReason;
      boundary: RealityPressureSeedContinuationContextBoundary;
    }>;
