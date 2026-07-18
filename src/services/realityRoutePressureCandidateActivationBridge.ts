import type {
  RealityRoutePressureCandidateActivationBridgeBlockedReason,
  RealityRoutePressureCandidateActivationBridgeBoundary,
  RealityRoutePressureCandidateActivationBridgeInput,
  RealityRoutePressureCandidateActivationBridgeResult,
} from "../types/realityRoutePressureCandidateActivationBridge";
import type { RealityPressureCandidateActivationContextBlockedReason } from "../types/realityPressureCandidateActivationContext";
import type { RealityRouteActivationSourceContext } from "../types/realityRouteActivationSourceContext";
import { createRealityPressureCandidateActivationContext } from "./realityPressureCandidateActivationContext";
import { REALITY_ROUTE_ACTIVATION_SOURCE_CONTEXT_BOUNDARY } from "./realityRouteActivationSourceContext";

export const REALITY_ROUTE_PRESSURE_CANDIDATE_ACTIVATION_BRIDGE_BOUNDARY:
  RealityRoutePressureCandidateActivationBridgeBoundary = Object.freeze({
    routeSourceToExistingCandidateActivationOnly: true,
    authorizedRealityRouteOnly: true,
    existingRouteActivationSourceContextOnly: true,
    existingCandidateActivationContextOnly: true,
    sourceReferenceContinuityRequired: true,
    immutableOutputOnly: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noReferenceOnlySource: true,
    noSourceFallback: true,
    noEngineInvocation: true,
    noSourceRecalculation: true,
    noCandidateRequestBridgeInvocation: true,
    noCandidateSourceInvocation: true,
    noCandidateAssembly: true,
    noCandidateSelection: true,
    noDeliveryOrchestration: true,
    noConsumerInvocation: true,
    noGravityIntegration: true,
    noUiIntegration: true,
    noRendererInvocation: true,
    noNavigationInvocation: true,
    noStorageRead: true,
    noStorageWrite: true,
  });

const forbiddenSourceMarkers = [
  "fixture",
  "prototype",
  "default",
  "referenceonly",
] as const;

const hasForbiddenSourceReference = (sourceReferenceId: string): boolean => {
  const normalized = sourceReferenceId.toLowerCase();
  return forbiddenSourceMarkers.some((marker) => normalized.includes(marker));
};

const unavailable = (
  status: "SOURCE_NOT_READY" | "BLOCKED",
  sourceReferenceId: string | null,
  routeActivationContextReferenceId: string | null,
  reason: RealityRoutePressureCandidateActivationBridgeBlockedReason,
  activationReason: RealityPressureCandidateActivationContextBlockedReason | null = null,
): RealityRoutePressureCandidateActivationBridgeResult => Object.freeze({
  status,
  sourceReferenceId,
  routeActivationContextReferenceId,
  candidateActivationContext: null,
  provenance: null,
  reason,
  activationReason,
  boundary: REALITY_ROUTE_PRESSURE_CANDIDATE_ACTIVATION_BRIDGE_BOUNDARY,
});

const isRouteActivationSourceContextValid = (
  context: RealityRouteActivationSourceContext | null | undefined,
): context is RealityRouteActivationSourceContext =>
  Boolean(
    context &&
      Object.isFrozen(context) &&
      Object.isFrozen(context.realityEntryContext) &&
      Object.isFrozen(context.lifeSourceSession) &&
      Object.isFrozen(context.requestDateSource) &&
      Object.isFrozen(context.provenance) &&
      context.schemaVersion ===
        "GUANYAO_REALITY_ROUTE_ACTIVATION_SOURCE_CONTEXT_V1" &&
      context.source === "reality_route_activation_source_context" &&
      context.sourceExperienceMode === "REAL_USER_EXPERIENCE" &&
      context.sourceProvenance === "REAL_USER_SESSION" &&
      context.activationBoundary === "EXPLICIT_ENTER_REALITY" &&
      context.sourceReferenceId.trim().length > 0 &&
      context.sourceReferenceId ===
        context.realityEntryContext.sourceReferenceId &&
      context.sourceReferenceId === context.lifeSourceSession.sourceReferenceId &&
      context.sourceReferenceId === context.requestDateSource.sourceReferenceId &&
      context.provenance.sourceReferenceId === context.sourceReferenceId &&
      context.provenance.noPressureInference === true &&
      context.provenance.noCandidateSelection === true &&
      context.boundary === REALITY_ROUTE_ACTIVATION_SOURCE_CONTEXT_BOUNDARY,
  );

export function bridgeRealityRouteToPressureCandidateActivation(
  input: RealityRoutePressureCandidateActivationBridgeInput,
): RealityRoutePressureCandidateActivationBridgeResult {
  const authorization = input?.routeAuthorization;
  if (
    authorization?.status !== "READY" ||
    authorization.authorizationState !==
      "AUTHORIZED_PRODUCTION_REALITY_SOURCE" ||
    authorization.routeTarget !== "/reality" ||
    authorization.sourceContext.sourceExperienceMode !==
      "REAL_USER_EXPERIENCE" ||
    authorization.sourceContext.sourceProvenance !== "REAL_USER_SESSION"
  ) {
    return unavailable(
      "SOURCE_NOT_READY",
      authorization?.sourceReferenceId ?? null,
      null,
      "REALITY_ROUTE_AUTHORIZATION_REQUIRED",
    );
  }

  const routeSourceContext = input.routeActivationSourceContext;
  if (!isRouteActivationSourceContextValid(routeSourceContext)) {
    return unavailable(
      "SOURCE_NOT_READY",
      authorization.sourceReferenceId,
      null,
      "ROUTE_ACTIVATION_SOURCE_CONTEXT_INVALID",
    );
  }
  const sourceReferenceId = authorization.sourceReferenceId;
  if (hasForbiddenSourceReference(sourceReferenceId)) {
    return unavailable(
      "BLOCKED",
      sourceReferenceId,
      routeSourceContext.contextReferenceId,
      "FORBIDDEN_SOURCE_REFERENCE",
    );
  }
  if (routeSourceContext.sourceReferenceId !== sourceReferenceId) {
    return unavailable(
      "BLOCKED",
      sourceReferenceId,
      routeSourceContext.contextReferenceId,
      "SOURCE_REFERENCE_MISMATCH",
    );
  }

  const activationResult = createRealityPressureCandidateActivationContext({
    routeAuthorization: authorization,
    lifeSourceSession: routeSourceContext.lifeSourceSession,
    requestDateSource: routeSourceContext.requestDateSource,
  });
  if (activationResult.status !== "READY") {
    return unavailable(
      activationResult.status,
      sourceReferenceId,
      routeSourceContext.contextReferenceId,
      "CANDIDATE_ACTIVATION_NOT_READY",
      activationResult.reason,
    );
  }

  return Object.freeze({
    status: "READY" as const,
    sourceReferenceId,
    routeActivationContextReferenceId:
      routeSourceContext.contextReferenceId,
    candidateActivationContext: activationResult.context,
    provenance: Object.freeze({
      routeAuthorizationSource:
        "REALITY_PRODUCTION_ROUTE_AUTHORIZATION" as const,
      routeActivationSource:
        "REALITY_ROUTE_ACTIVATION_SOURCE_CONTEXT" as const,
      candidateActivationSource:
        "REALITY_PRESSURE_CANDIDATE_ACTIVATION_CONTEXT" as const,
      sourceReferenceId,
      noCandidateSelection: true as const,
    }),
    reason: null,
    activationReason: null,
    boundary: REALITY_ROUTE_PRESSURE_CANDIDATE_ACTIVATION_BRIDGE_BOUNDARY,
  });
}

export const RealityRoutePressureCandidateActivationBridgeService =
  Object.freeze({
    bridge: bridgeRealityRouteToPressureCandidateActivation,
    boundary: REALITY_ROUTE_PRESSURE_CANDIDATE_ACTIVATION_BRIDGE_BOUNDARY,
  });
