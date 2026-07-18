import type { RealityPressureCandidateActivationContext } from "./realityPressureCandidateActivationContext";
import type { RealityPressureCandidateDeliverySession } from "./realityPressureCandidateDeliverySession";
import type {
  RealityPressureCandidateRequestContext,
  RealityPressureCandidateRequestContextBridgeBlockedReason,
} from "./realityPressureCandidateRequestContextBridge";

export type RealityPressureActivationCandidateRequestBridgeBoundary =
  Readonly<{
    activationToRequestBridgeOnly: true;
    existingActivationContextOnly: true;
    existingCandidateRequestBridgeOnly: true;
    optionalExistingDeliverySessionOnly: true;
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
    noAutomaticSelection: true;
    noCaptureExecution: true;
    noPressureConsumerIntegration: true;
    noGravityIntegration: true;
    noUiIntegration: true;
    noRendererInvocation: true;
    noRouteMutation: true;
    noNavigationMutation: true;
    noStorageRead: true;
    noStorageWrite: true;
  }>;

export type RealityPressureActivationCandidateRequestBridgeInput = Readonly<{
  activationContext: RealityPressureCandidateActivationContext;
  deliverySession: RealityPressureCandidateDeliverySession | null;
}>;

export type RealityPressureActivationCandidateRequestContext = Readonly<{
  schemaVersion: "GUANYAO_REALITY_PRESSURE_ACTIVATION_CANDIDATE_REQUEST_CONTEXT_V1";
  source: "reality_pressure_activation_candidate_request_bridge";
  sourceExperienceMode: "REAL_USER_EXPERIENCE";
  sourceProvenance: "REAL_USER_SESSION";
  sourceReferenceId: string;
  activationContextReferenceId: string;
  deliveryStateSource: "INITIAL_ACTIVATION" | "DELIVERY_SESSION";
  candidateRequestContext: RealityPressureCandidateRequestContext;
  provenance: Readonly<{
    activationSource: "REALITY_PRESSURE_CANDIDATE_ACTIVATION_CONTEXT";
    requestBridgeSource: "REALITY_PRESSURE_CANDIDATE_REQUEST_CONTEXT_BRIDGE";
    sourceReferenceId: string;
    noPressureInference: true;
    noCandidateSelection: true;
  }>;
  boundary: RealityPressureActivationCandidateRequestBridgeBoundary;
}>;

export type RealityPressureActivationCandidateRequestBridgeBlockedReason =
  | "ACTIVATION_CONTEXT_INVALID"
  | "DELIVERY_SESSION_INVALID"
  | "FORBIDDEN_SOURCE_REFERENCE"
  | "SOURCE_REFERENCE_MISMATCH"
  | "CANDIDATE_REQUEST_BRIDGE_NOT_READY";

export type RealityPressureActivationCandidateRequestBridgeResult =
  | Readonly<{
      status: "READY";
      context: RealityPressureActivationCandidateRequestContext;
      reason: null;
      requestBridgeReason: null;
      boundary: RealityPressureActivationCandidateRequestBridgeBoundary;
    }>
  | Readonly<{
      status: "SOURCE_NOT_READY" | "BLOCKED";
      context: null;
      reason: RealityPressureActivationCandidateRequestBridgeBlockedReason;
      requestBridgeReason: RealityPressureCandidateRequestContextBridgeBlockedReason | null;
      boundary: RealityPressureActivationCandidateRequestBridgeBoundary;
    }>;
