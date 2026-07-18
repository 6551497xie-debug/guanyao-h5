import type { GenesisProductionRendererHostAuthorization } from "./genesisProductionRendererHost";

export type GenesisProductionRouteTarget = "/genesis";

export type GenesisProductionRouteAuthorizationInput = Readonly<{
  routeTarget: string;
  sourceReferenceId: string | null;
}>;

export type GenesisProductionRouteGuardReason =
  | "ROUTE_TARGET_NOT_AUTHORIZED"
  | "FORBIDDEN_SOURCE_REFERENCE"
  | "SOURCE_CONTEXT_NOT_AVAILABLE"
  | "SOURCE_REFERENCE_REQUIRED"
  | "SOURCE_MODE_INVALID"
  | "SOURCE_PROVENANCE_INVALID"
  | "SOURCE_SESSION_REFERENCE_MISMATCH"
  | "SOURCE_REFERENCE_MISMATCH";

export type GenesisProductionRouteAuthorizationBoundary = Readonly<{
  routeAuthorizationOnly: true;
  explicitRouteTargetRequired: true;
  realUserSourceContextOnly: true;
  realUserSessionProvenanceOnly: true;
  sourceReferenceContinuityRequired: true;
  productionHostEligibilityOnly: true;
  noEngineResult: true;
  noUserData: true;
  noRenderPlan: true;
  noFixtureSource: true;
  noPrototypeSource: true;
  noDefaultSource: true;
  noReferenceOnlySource: true;
  noSourceFallback: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noRendererCoreInvocation: true;
  noRouteRegistration: true;
  noNavigationMutation: true;
  noUIIntegration: true;
  noStorageWrite: true;
}>;

export type GenesisProductionRouteActivationAuthorization =
  | Readonly<{
      status: "READY";
      source: "genesis_production_route_authorization";
      routeTarget: GenesisProductionRouteTarget;
      sourceExperienceMode: "REAL_USER_EXPERIENCE";
      sourceProvenance: "REAL_USER_SESSION";
      sourceReferenceId: string;
      authorizationState: "AUTHORIZED_PRODUCTION_GENESIS";
      guardReason: null;
      productionRendererAuthorization: GenesisProductionRendererHostAuthorization;
      boundary: GenesisProductionRouteAuthorizationBoundary;
    }>
  | Readonly<{
      status: "SOURCE_NOT_READY";
      source: "genesis_production_route_authorization";
      routeTarget: GenesisProductionRouteTarget;
      sourceExperienceMode: "REAL_USER_EXPERIENCE";
      sourceProvenance: "REAL_USER_SESSION";
      sourceReferenceId: string | null;
      authorizationState: "SOURCE_NOT_READY";
      guardReason: Exclude<
        GenesisProductionRouteGuardReason,
        "ROUTE_TARGET_NOT_AUTHORIZED" | "FORBIDDEN_SOURCE_REFERENCE"
      >;
      productionRendererAuthorization: null;
      boundary: GenesisProductionRouteAuthorizationBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      source: "genesis_production_route_authorization";
      routeTarget: string;
      sourceExperienceMode: "REAL_USER_EXPERIENCE";
      sourceProvenance: "REAL_USER_SESSION";
      sourceReferenceId: string | null;
      authorizationState: "BLOCKED";
      guardReason:
        | "ROUTE_TARGET_NOT_AUTHORIZED"
        | "FORBIDDEN_SOURCE_REFERENCE";
      productionRendererAuthorization: null;
      boundary: GenesisProductionRouteAuthorizationBoundary;
    }>;
