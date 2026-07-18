import type {
  RealityPressureActivationCandidateRequestBridgeBlockedReason,
  RealityPressureActivationCandidateRequestContext,
} from "./realityPressureActivationCandidateRequestBridge";
import type { RealityRoutePressureCandidateActivationBridgeResult } from "./realityRoutePressureCandidateActivationBridge";

export type RealityRouteCandidateRequestContextBridgeBoundary = Readonly<{
  routeCandidateActivationToExistingRequestBridgeOnly: true;
  readyRouteCandidateActivationOnly: true;
  existingActivationCandidateRequestBridgeOnly: true;
  initialDeliverySessionMustBeNull: true;
  sourceReferenceContinuityRequired: true;
  activationReferenceTraceabilityRequired: true;
  immutableOutputOnly: true;
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
  noCandidateSelection: true;
  noDeliveryOrchestration: true;
  noConsumerInvocation: true;
  noGravityIntegration: true;
  noUiIntegration: true;
  noRendererInvocation: true;
  noNavigationInvocation: true;
  noStorageRead: true;
  noStorageWrite: true;
}>;

export type RealityRouteCandidateRequestContextBridgeInput = Readonly<{
  routeCandidateActivationResult: RealityRoutePressureCandidateActivationBridgeResult;
}>;

export type RealityRouteCandidateRequestContextBridgeBlockedReason =
  | "ROUTE_CANDIDATE_ACTIVATION_NOT_READY"
  | "ROUTE_CANDIDATE_ACTIVATION_INVALID"
  | "FORBIDDEN_SOURCE_REFERENCE"
  | "SOURCE_REFERENCE_MISMATCH"
  | "ACTIVATION_REQUEST_BRIDGE_NOT_READY";

export type RealityRouteCandidateRequestContextBridgeResult =
  | Readonly<{
      status: "READY";
      sourceReferenceId: string;
      routeActivationContextReferenceId: string;
      candidateActivationContextReferenceId: string;
      candidateRequestContext: RealityPressureActivationCandidateRequestContext;
      provenance: Readonly<{
        routeCandidateActivationSource: "REALITY_ROUTE_PRESSURE_CANDIDATE_ACTIVATION_BRIDGE";
        activationRequestSource: "REALITY_PRESSURE_ACTIVATION_CANDIDATE_REQUEST_BRIDGE";
        deliveryStateSource: "INITIAL_ACTIVATION";
        sourceReferenceId: string;
        noCandidateSelection: true;
      }>;
      reason: null;
      requestBridgeReason: null;
      boundary: RealityRouteCandidateRequestContextBridgeBoundary;
    }>
  | Readonly<{
      status: "SOURCE_NOT_READY" | "BLOCKED";
      sourceReferenceId: string | null;
      routeActivationContextReferenceId: string | null;
      candidateActivationContextReferenceId: string | null;
      candidateRequestContext: null;
      provenance: null;
      reason: RealityRouteCandidateRequestContextBridgeBlockedReason;
      requestBridgeReason: RealityPressureActivationCandidateRequestBridgeBlockedReason | null;
      boundary: RealityRouteCandidateRequestContextBridgeBoundary;
    }>;
