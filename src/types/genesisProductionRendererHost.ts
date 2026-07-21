import type {
  GenesisWebGLRendererCoreController,
  GenesisWebGLRendererCoreFallback,
  GenesisWebGLRendererCoreInput,
} from "./genesisWebGLRendererCore";
import type { GenesisVisualConsumerSourceResult } from "./genesisVisualConsumerSource";

export type GenesisProductionRendererHostAuthorization = Readonly<{
  authorizationId: "GUANYAO_GENESIS_PRODUCTION_RENDERER_HOST_AUTHORIZATION_V2";
  classification: "PRODUCTION";
  authorizedRouteTarget: "/genesis";
  routeActivationEligibility: "ELIGIBLE";
  authorizedTarget: "GENESIS_PRODUCTION_RENDERER_HOST";
  authorizedRendererCore: "GENESIS_WEBGL_RENDERER_CORE";
  authorizedSourceMode: "REAL_USER_EXPERIENCE";
  authorizedSourceProvenance: "REAL_USER_SESSION";
  authorizedSourceReferenceId: string;
  productionRenderingStatus: "AUTHORIZED";
  formalUserSourceStatus: "AUTHORIZED";
  fixtureSourceStatus: "FORBIDDEN";
  prototypeAuthorizationStatus: "NOT_ACCEPTED";
  routeIntegrationStatus: "AUTHORIZED_EXPLICIT_ROUTE_ACTIVATION";
  fallbackRequired: true;
}>;

export type GenesisProductionRendererHostInput = Readonly<
  Omit<
    GenesisWebGLRendererCoreInput,
    | "renderPlan"
    | "twentyEightMansionCoordinateProjection"
    | "timeSequenceRecognitionProjection"
    | "birthMansionIgnitionProjection"
    | "morphologicalFieldAlignmentProjection"
    | "lifeForceInfusionProjection"
    | "personalRevealProjection"
    | "realityPressureProjection"
  > & {
    authorization: GenesisProductionRendererHostAuthorization | null;
    consumerSourceResult: GenesisVisualConsumerSourceResult | null;
  }
>;

export type GenesisProductionRendererHostBlockedReason =
  | "AUTHORIZATION_REQUIRED"
  | "AUTHORIZATION_SCOPE_INVALID"
  | "SOURCE_NOT_READY"
  | "SOURCE_MODE_INVALID"
  | "SOURCE_PROVENANCE_INVALID"
  | "SOURCE_REFERENCE_NOT_AUTHORIZED"
  | "SOURCE_BOUNDARY_INVALID"
  | "MANSION_COORDINATE_SOURCE_INVALID"
  | "RENDER_PLAN_REQUIRED"
  | "RENDER_PLAN_BOUNDARY_INVALID"
  | "VIEWPORT_INVALID";

export type GenesisProductionRendererHostBoundary = Readonly<{
  productionRendererHostOnly: true;
  explicitProductionAuthorizationRequired: true;
  realUserSessionSourceOnly: true;
  renderPlanAndProjectionPassThroughOnly: true;
  sharedRendererCoreDelegationOnly: true;
  manualFrameDriverOnly: true;
  noPrototypeAuthorization: true;
  noFixtureSource: true;
  noSourceResolution: true;
  noSourceFallback: true;
  noEngineInvocation: true;
  noIdentityRecalculation: true;
  noRenderPlanMutation: true;
  noProjectionMutation: true;
  noVisualCalibrationMutation: true;
  noTimelineMutation: true;
  noRouteIntegration: true;
  noUIIntegration: true;
  noAnimationLoopOwnership: true;
  noStorageWrite: true;
}>;

export type GenesisProductionRendererHostResult =
  | Readonly<{
      status: "READY";
      source: "genesis_production_renderer_host";
      sourceReferenceId: string;
      sourceProvenance: "REAL_USER_SESSION";
      controller: GenesisWebGLRendererCoreController;
      boundary: GenesisProductionRendererHostBoundary;
    }>
  | Readonly<{
      status: "FALLBACK_REQUIRED";
      source: "genesis_production_renderer_host";
      sourceReferenceId: string;
      sourceProvenance: "REAL_USER_SESSION";
      fallback: GenesisWebGLRendererCoreFallback;
      boundary: GenesisProductionRendererHostBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      source: "genesis_production_renderer_host";
      reason: GenesisProductionRendererHostBlockedReason;
      noRenderer: true;
      boundary: GenesisProductionRendererHostBoundary;
    }>;
