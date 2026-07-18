import type {
  GenesisProductionRouteActivationAuthorization,
  GenesisProductionRouteAuthorizationBoundary,
  GenesisProductionRouteAuthorizationInput,
  GenesisProductionRouteGuardReason,
} from "../types/genesisProductionRouteAuthorization";
import type { GenesisProductionRendererHostAuthorization } from "../types/genesisProductionRendererHost";
import { readRealUserGenesisVisualSourceContext } from "./realUserGenesisVisualSourceContext";

export const GENESIS_PRODUCTION_ROUTE_TARGET = "/genesis" as const;

export const GENESIS_PRODUCTION_ROUTE_AUTHORIZATION_BOUNDARY:
  GenesisProductionRouteAuthorizationBoundary = Object.freeze({
    routeAuthorizationOnly: true,
    explicitRouteTargetRequired: true,
    realUserSourceContextOnly: true,
    realUserSessionProvenanceOnly: true,
    sourceReferenceContinuityRequired: true,
    productionHostEligibilityOnly: true,
    noEngineResult: true,
    noUserData: true,
    noRenderPlan: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noReferenceOnlySource: true,
    noSourceFallback: true,
    noEngineInvocation: true,
    noRendererInvocation: true,
    noRendererCoreInvocation: true,
    noRouteRegistration: true,
    noNavigationMutation: true,
    noUIIntegration: true,
    noStorageWrite: true,
  });

const sourceNotReady = (
  sourceReferenceId: string | null,
  guardReason: Exclude<
    GenesisProductionRouteGuardReason,
    "ROUTE_TARGET_NOT_AUTHORIZED" | "FORBIDDEN_SOURCE_REFERENCE"
  >,
): GenesisProductionRouteActivationAuthorization =>
  Object.freeze({
    status: "SOURCE_NOT_READY" as const,
    source: "genesis_production_route_authorization" as const,
    routeTarget: GENESIS_PRODUCTION_ROUTE_TARGET,
    sourceExperienceMode: "REAL_USER_EXPERIENCE" as const,
    sourceProvenance: "REAL_USER_SESSION" as const,
    sourceReferenceId,
    authorizationState: "SOURCE_NOT_READY" as const,
    guardReason,
    productionRendererAuthorization: null,
    boundary: GENESIS_PRODUCTION_ROUTE_AUTHORIZATION_BOUNDARY,
  });

const blocked = (
  input: GenesisProductionRouteAuthorizationInput,
  guardReason: "ROUTE_TARGET_NOT_AUTHORIZED" | "FORBIDDEN_SOURCE_REFERENCE",
): GenesisProductionRouteActivationAuthorization =>
  Object.freeze({
    status: "BLOCKED" as const,
    source: "genesis_production_route_authorization" as const,
    routeTarget: input.routeTarget,
    sourceExperienceMode: "REAL_USER_EXPERIENCE" as const,
    sourceProvenance: "REAL_USER_SESSION" as const,
    sourceReferenceId: input.sourceReferenceId,
    authorizationState: "BLOCKED" as const,
    guardReason,
    productionRendererAuthorization: null,
    boundary: GENESIS_PRODUCTION_ROUTE_AUTHORIZATION_BOUNDARY,
  });

const hasForbiddenSourceReference = (sourceReferenceId: string): boolean => {
  const normalizedReference = sourceReferenceId.toLowerCase();
  return ["fixture", "prototype", "default", "referenceonly"].some(
    (forbiddenMarker) => normalizedReference.includes(forbiddenMarker),
  );
};

export function authorizeGenesisProductionRoute(
  input: GenesisProductionRouteAuthorizationInput,
): GenesisProductionRouteActivationAuthorization {
  if (input.routeTarget !== GENESIS_PRODUCTION_ROUTE_TARGET) {
    return blocked(input, "ROUTE_TARGET_NOT_AUTHORIZED");
  }

  const requestedReference = input.sourceReferenceId?.trim() ?? "";
  if (requestedReference.length === 0) {
    return sourceNotReady(null, "SOURCE_REFERENCE_REQUIRED");
  }
  if (hasForbiddenSourceReference(requestedReference)) {
    return blocked(input, "FORBIDDEN_SOURCE_REFERENCE");
  }

  const context = readRealUserGenesisVisualSourceContext();
  if (context === null) {
    return sourceNotReady(requestedReference, "SOURCE_CONTEXT_NOT_AVAILABLE");
  }
  if (context.sourceMode !== "REAL_USER_EXPERIENCE") {
    return sourceNotReady(requestedReference, "SOURCE_MODE_INVALID");
  }

  const contextReference = context.sourceReferenceId;
  if (
    context.source !== "real_user_genesis_visual_source_context" ||
    context.boundary.realUserSourceOnly !== true ||
    context.boundary.existingLifeSourceSessionOnly !== true ||
    context.boundary.existingVisualSourceOnly !== true ||
    context.boundary.noFixtureFallback !== true ||
    context.lifeSourceSession.sourceKind !== "REAL_ENGINE_RESULT" ||
    context.visualSourceAdapterInput.sourceKind !== "REAL_ENGINE_RESULT" ||
    context.visualSource.provenance.sourceKind !== "REAL_ENGINE_RESULT"
  ) {
    return sourceNotReady(requestedReference, "SOURCE_PROVENANCE_INVALID");
  }
  if (
    context.lifeSourceSession.sourceReferenceId !== contextReference ||
    context.visualSourceAdapterInput.sourceReferenceId !== contextReference ||
    context.visualSource.provenance.sourceReferenceId !== contextReference
  ) {
    return sourceNotReady(
      requestedReference,
      "SOURCE_SESSION_REFERENCE_MISMATCH",
    );
  }
  if (requestedReference !== contextReference) {
    return sourceNotReady(requestedReference, "SOURCE_REFERENCE_MISMATCH");
  }

  const productionRendererAuthorization:
    GenesisProductionRendererHostAuthorization = Object.freeze({
      authorizationId:
        "GUANYAO_GENESIS_PRODUCTION_RENDERER_HOST_AUTHORIZATION_V1",
      classification: "PRODUCTION",
      authorizedTarget: "GENESIS_PRODUCTION_RENDERER_HOST",
      authorizedRendererCore: "GENESIS_WEBGL_RENDERER_CORE",
      authorizedSourceMode: "REAL_USER_EXPERIENCE",
      authorizedSourceProvenance: "REAL_USER_SESSION",
      authorizedSourceReferenceId: contextReference,
      productionRenderingStatus: "AUTHORIZED",
      formalUserSourceStatus: "AUTHORIZED",
      fixtureSourceStatus: "FORBIDDEN",
      prototypeAuthorizationStatus: "NOT_ACCEPTED",
      routeIntegrationStatus:
        "FORBIDDEN_PENDING_EXPLICIT_ROUTE_ACTIVATION",
      fallbackRequired: true,
    });

  return Object.freeze({
    status: "READY" as const,
    source: "genesis_production_route_authorization" as const,
    routeTarget: GENESIS_PRODUCTION_ROUTE_TARGET,
    sourceExperienceMode: "REAL_USER_EXPERIENCE" as const,
    sourceProvenance: "REAL_USER_SESSION" as const,
    sourceReferenceId: contextReference,
    authorizationState: "AUTHORIZED_PRODUCTION_GENESIS" as const,
    guardReason: null,
    productionRendererAuthorization,
    boundary: GENESIS_PRODUCTION_ROUTE_AUTHORIZATION_BOUNDARY,
  });
}
