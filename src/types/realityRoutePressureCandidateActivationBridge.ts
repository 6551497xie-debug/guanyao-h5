import type {
  RealityPressureCandidateActivationContext,
  RealityPressureCandidateActivationContextBlockedReason,
} from "./realityPressureCandidateActivationContext";
import type { RealityProductionRouteActivationAuthorization } from "./realityProductionRouteAuthorization";
import type { RealityRouteActivationSourceContext } from "./realityRouteActivationSourceContext";

export type RealityRoutePressureCandidateActivationBridgeBoundary = Readonly<{
  routeSourceToExistingCandidateActivationOnly: true;
  authorizedRealityRouteOnly: true;
  existingRouteActivationSourceContextOnly: true;
  existingCandidateActivationContextOnly: true;
  sourceReferenceContinuityRequired: true;
  immutableOutputOnly: true;
  noFixtureSource: true;
  noPrototypeSource: true;
  noDefaultSource: true;
  noReferenceOnlySource: true;
  noSourceFallback: true;
  noEngineInvocation: true;
  noSourceRecalculation: true;
  noCandidateRequestBridgeInvocation: true;
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

export type RealityRoutePressureCandidateActivationBridgeInput = Readonly<{
  routeAuthorization: RealityProductionRouteActivationAuthorization;
  routeActivationSourceContext: RealityRouteActivationSourceContext;
}>;

export type RealityRoutePressureCandidateActivationBridgeBlockedReason =
  | "REALITY_ROUTE_AUTHORIZATION_REQUIRED"
  | "ROUTE_ACTIVATION_SOURCE_CONTEXT_INVALID"
  | "FORBIDDEN_SOURCE_REFERENCE"
  | "SOURCE_REFERENCE_MISMATCH"
  | "CANDIDATE_ACTIVATION_NOT_READY";

export type RealityRoutePressureCandidateActivationBridgeResult =
  | Readonly<{
      status: "READY";
      sourceReferenceId: string;
      routeActivationContextReferenceId: string;
      candidateActivationContext: RealityPressureCandidateActivationContext;
      provenance: Readonly<{
        routeAuthorizationSource: "REALITY_PRODUCTION_ROUTE_AUTHORIZATION";
        routeActivationSource: "REALITY_ROUTE_ACTIVATION_SOURCE_CONTEXT";
        candidateActivationSource: "REALITY_PRESSURE_CANDIDATE_ACTIVATION_CONTEXT";
        sourceReferenceId: string;
        noCandidateSelection: true;
      }>;
      reason: null;
      activationReason: null;
      boundary: RealityRoutePressureCandidateActivationBridgeBoundary;
    }>
  | Readonly<{
      status: "SOURCE_NOT_READY" | "BLOCKED";
      sourceReferenceId: string | null;
      routeActivationContextReferenceId: string | null;
      candidateActivationContext: null;
      provenance: null;
      reason: RealityRoutePressureCandidateActivationBridgeBlockedReason;
      activationReason: RealityPressureCandidateActivationContextBlockedReason | null;
      boundary: RealityRoutePressureCandidateActivationBridgeBoundary;
    }>;
