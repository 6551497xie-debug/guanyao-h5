import type { RealityExperienceArchitectureReference } from "./realityPressureRecognitionArchitecture";

export type RealityProductionRouteTarget = "/reality";

export type RealityProductionRouteAuthorizationInput = Readonly<{
  routeTarget: string;
  sourceReferenceId: string | null;
}>;

export type RealityProductionRouteGuardReason =
  | "ROUTE_TARGET_NOT_AUTHORIZED"
  | "FORBIDDEN_SOURCE_REFERENCE"
  | "SOURCE_REFERENCE_REQUIRED"
  | "REALITY_ENTRY_CONTEXT_NOT_AVAILABLE"
  | "SOURCE_PROVENANCE_INVALID"
  | "REALITY_ENTRY_NOT_ELIGIBLE"
  | "REALITY_ENTRY_SESSION_INVALID"
  | "SOURCE_REFERENCE_MISMATCH";

export type RealityProductionRouteAuthorizationBoundary = Readonly<{
  routeAuthorizationAndSourceAssemblyOnly: true;
  explicitRealityEntryRequired: true;
  realUserSessionProvenanceOnly: true;
  sourceReferenceContinuityRequired: true;
  immutableSourceContextOnly: true;
  pressureRecognitionNotStarted: true;
  noFixtureSource: true;
  noPrototypeSource: true;
  noDefaultSource: true;
  noReferenceOnlySource: true;
  noSourceFallback: true;
  noEngineInvocation: true;
  noPressureExecution: true;
  noGravityExecution: true;
  noChoiceExecution: true;
  noCrystalExecution: true;
  noRendererInvocation: true;
  noRouteRegistration: true;
  noNavigationMutation: true;
  noUiIntegration: true;
  noStorageWrite: true;
}>;

export type RealityProductionSourceContext = Readonly<{
  schemaVersion: "GUANYAO_REALITY_PRODUCTION_SOURCE_CONTEXT_V1";
  source: "reality_production_source_context";
  sourceExperienceMode: "REAL_USER_EXPERIENCE";
  sourceProvenance: "REAL_USER_SESSION";
  sourceReferenceId: string;
  realityEntryEligibility: "ELIGIBLE";
  genesisCompletionReference: Readonly<{
    stage: "COMPLETION";
    sourceReferenceId: string;
  }>;
  recognitionConfirmationReference: Readonly<{
    confirmed: true;
    sourceReferenceId: string;
  }>;
  pressureRecognitionState: "NOT_STARTED";
  realityExperienceArchitectureReference: RealityExperienceArchitectureReference;
  boundary: RealityProductionRouteAuthorizationBoundary;
}>;

export type RealityProductionRouteActivationAuthorization =
  | Readonly<{
      status: "READY";
      source: "reality_production_route_authorization";
      routeTarget: RealityProductionRouteTarget;
      sourceReferenceId: string;
      authorizationState: "AUTHORIZED_PRODUCTION_REALITY_SOURCE";
      guardReason: null;
      sourceContext: RealityProductionSourceContext;
      boundary: RealityProductionRouteAuthorizationBoundary;
    }>
  | Readonly<{
      status: "SOURCE_NOT_READY";
      source: "reality_production_route_authorization";
      routeTarget: RealityProductionRouteTarget;
      sourceReferenceId: string | null;
      authorizationState: "SOURCE_NOT_READY";
      guardReason: Exclude<
        RealityProductionRouteGuardReason,
        "ROUTE_TARGET_NOT_AUTHORIZED" | "FORBIDDEN_SOURCE_REFERENCE"
      >;
      sourceContext: null;
      boundary: RealityProductionRouteAuthorizationBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      source: "reality_production_route_authorization";
      routeTarget: string;
      sourceReferenceId: string | null;
      authorizationState: "BLOCKED";
      guardReason:
        | "ROUTE_TARGET_NOT_AUTHORIZED"
        | "FORBIDDEN_SOURCE_REFERENCE";
      sourceContext: null;
      boundary: RealityProductionRouteAuthorizationBoundary;
    }>;
