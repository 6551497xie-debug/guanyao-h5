import type { LaunchLifeSourceSession } from "./launchLifeSourceSession";
import type { RealityProductionRouteActivationAuthorization } from "./realityProductionRouteAuthorization";

export type RealityPressureExplicitRequestDateSource = Readonly<{
  schemaVersion: "GUANYAO_REALITY_PRESSURE_REQUEST_DATE_SOURCE_V1";
  source: "reality_pressure_explicit_request_date_source";
  sourceExperienceMode: "REAL_USER_EXPERIENCE";
  sourceProvenance: "EXPLICIT_CALLER_PROVIDED";
  sourceReferenceId: string;
  asOfDate: string;
  captureBoundary: "REALITY_ROUTE_ACTIVATION";
}>;

export type RealityPressureCandidateActivationContextBoundary = Readonly<{
  contractOnly: true;
  contextImplementationOnly: true;
  authorizedRealityRouteOnly: true;
  existingLaunchLifeSourceSessionOnly: true;
  explicitRequestDateSourceOnly: true;
  requestDateCapturedOnceOnly: true;
  sourceReferenceContinuityRequired: true;
  immutableActivationContextRequired: true;
  initialCandidateDeliveryStateOnly: true;
  noFixtureSource: true;
  noPrototypeSource: true;
  noDefaultSource: true;
  noReferenceOnlySource: true;
  noSourceFallback: true;
  noImplicitSystemClock: true;
  noEngineInvocation: true;
  noSourceRecalculation: true;
  noCandidateRequestBridgeInvocation: true;
  noCandidateSourceInvocation: true;
  noCandidateAssembly: true;
  noDeliverySessionActivation: true;
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

export type RealityPressureCandidateActivationContext = Readonly<{
  schemaVersion: "GUANYAO_REALITY_PRESSURE_CANDIDATE_ACTIVATION_CONTEXT_V1";
  source: "reality_pressure_candidate_activation_context";
  contextReferenceId: string;
  sourceMode: "REAL_USER_EXPERIENCE";
  sourceExperienceMode: "REAL_USER_EXPERIENCE";
  sourceProvenance: "REAL_USER_SESSION";
  sourceReferenceId: string;
  routeTarget: "/reality";
  authorizationState: "AUTHORIZED_PRODUCTION_REALITY_SOURCE";
  activationEligibility: "ELIGIBLE";
  activationBoundary: "REALITY_ROUTE_ACTIVATION";
  lifeSourceSession: LaunchLifeSourceSession;
  requestDateSource: RealityPressureExplicitRequestDateSource;
  candidateCursor: null;
  excludedCandidateIds: readonly [];
  provenance: Readonly<{
    routeAuthorizationSource: "REALITY_PRODUCTION_ROUTE_AUTHORIZATION";
    lifeSource: "LAUNCH_LIFE_SOURCE_SESSION";
    requestDateSource: "EXPLICIT_REQUEST_DATE_SOURCE";
    sourceReferenceId: string;
    noPressureInference: true;
    noCandidateSelection: true;
  }>;
  boundary: RealityPressureCandidateActivationContextBoundary;
}>;

export type RealityPressureCandidateActivationContextInput = Readonly<{
  routeAuthorization: RealityProductionRouteActivationAuthorization;
  lifeSourceSession: LaunchLifeSourceSession;
  requestDateSource: RealityPressureExplicitRequestDateSource;
}>;

export type RealityPressureCandidateActivationContextBlockedReason =
  | "REALITY_ROUTE_AUTHORIZATION_REQUIRED"
  | "REAL_LIFE_SOURCE_SESSION_REQUIRED"
  | "EXPLICIT_REQUEST_DATE_REQUIRED"
  | "REQUEST_DATE_INVALID"
  | "FORBIDDEN_SOURCE_REFERENCE"
  | "SOURCE_REFERENCE_MISMATCH"
  | "SOURCE_PROVENANCE_INVALID";

export type RealityPressureCandidateActivationContextResult =
  | Readonly<{
      status: "READY";
      context: RealityPressureCandidateActivationContext;
      reason: null;
      boundary: RealityPressureCandidateActivationContextBoundary;
    }>
  | Readonly<{
      status: "SOURCE_NOT_READY" | "BLOCKED";
      context: null;
      reason: RealityPressureCandidateActivationContextBlockedReason;
      boundary: RealityPressureCandidateActivationContextBoundary;
    }>;

export type RealityPressureCandidateActivationContextContract = Readonly<{
  schemaVersion: "GUANYAO_REALITY_PRESSURE_CANDIDATE_ACTIVATION_CONTRACT_V1";
  semanticRole: "REALITY_PRESSURE_CANDIDATE_ACTIVATION_CONTEXT_CONTRACT";
  routeTarget: "/reality";
  sourceExperienceMode: "REAL_USER_EXPERIENCE";
  sourceProvenance: "REAL_USER_SESSION";
  requiredRouteAuthorization: "AUTHORIZED_PRODUCTION_REALITY_SOURCE";
  requiredLifeSource: "LAUNCH_LIFE_SOURCE_SESSION";
  requiredRequestDateProvenance: "EXPLICIT_CALLER_PROVIDED";
  requestDateCaptureBoundary: "REALITY_ROUTE_ACTIVATION";
  initialCandidateCursor: null;
  initialExcludedCandidateReferenceIds: readonly [];
  boundary: RealityPressureCandidateActivationContextBoundary;
}>;
