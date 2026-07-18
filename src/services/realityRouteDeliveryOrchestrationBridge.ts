import type { RealityPressureActivationDeliveryOrchestrationBridgeBlockedReason } from "../types/realityPressureActivationDeliveryOrchestrationBridge";
import type { RealityPressureCandidateDeliverySession } from "../types/realityPressureCandidateDeliverySession";
import type {
  RealityRouteDeliveryOrchestrationBridgeBlockedReason,
  RealityRouteDeliveryOrchestrationBridgeBoundary,
  RealityRouteDeliveryOrchestrationBridgeInput,
  RealityRouteDeliveryOrchestrationBridgeResult,
} from "../types/realityRouteDeliveryOrchestrationBridge";
import type { RealityRouteCandidateRequestContextBridgeResult } from "../types/realityRouteCandidateRequestContextBridge";
import { initializeRealityPressureActivationDeliveryOrchestration } from "./realityPressureActivationDeliveryOrchestrationBridge";
import { REALITY_ROUTE_CANDIDATE_REQUEST_CONTEXT_BRIDGE_BOUNDARY } from "./realityRouteCandidateRequestContextBridge";

export const REALITY_ROUTE_DELIVERY_ORCHESTRATION_BRIDGE_BOUNDARY:
  RealityRouteDeliveryOrchestrationBridgeBoundary = Object.freeze({
    routeCandidateRequestToExistingDeliveryBridgeOnly: true,
    authorizedRealityRouteOnly: true,
    readyRouteCandidateRequestOnly: true,
    existingActivationDeliveryOrchestrationOnly: true,
    initializeOperationOnly: true,
    sourceReferenceContinuityRequired: true,
    activationReferenceTraceabilityRequired: true,
    consumerInputForwardingOnly: true,
    immutableOutputOnly: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noReferenceOnlySource: true,
    noSourceFallback: true,
    noSystemClock: true,
    noEngineInvocation: true,
    noSourceRecalculation: true,
    noCandidateSelection: true,
    noCaptureExecution: true,
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
  candidateActivationContextReferenceId: string | null,
  deliverySession: RealityPressureCandidateDeliverySession | null,
  reason: RealityRouteDeliveryOrchestrationBridgeBlockedReason,
  deliveryBridgeReason: RealityPressureActivationDeliveryOrchestrationBridgeBlockedReason | null = null,
): RealityRouteDeliveryOrchestrationBridgeResult => Object.freeze({
  status,
  operation: "INITIALIZE" as const,
  sourceReferenceId,
  routeActivationContextReferenceId,
  candidateActivationContextReferenceId,
  deliverySession,
  candidateSourceContext: null,
  consumerInput: null,
  provenance: null,
  reason,
  deliveryBridgeReason,
  boundary: REALITY_ROUTE_DELIVERY_ORCHESTRATION_BRIDGE_BOUNDARY,
});

const isReadyRouteCandidateRequest = (
  result: RealityRouteCandidateRequestContextBridgeResult,
): boolean =>
  result.status === "READY" &&
  Object.isFrozen(result) &&
  Object.isFrozen(result.candidateRequestContext) &&
  Object.isFrozen(result.provenance) &&
  result.sourceReferenceId.trim().length > 0 &&
  result.routeActivationContextReferenceId.trim().length > 0 &&
  result.candidateActivationContextReferenceId.trim().length > 0 &&
  result.sourceReferenceId === result.candidateRequestContext.sourceReferenceId &&
  result.candidateActivationContextReferenceId ===
    result.candidateRequestContext.activationContextReferenceId &&
  result.candidateRequestContext.deliveryStateSource === "INITIAL_ACTIVATION" &&
  result.provenance.sourceReferenceId === result.sourceReferenceId &&
  result.provenance.deliveryStateSource === "INITIAL_ACTIVATION" &&
  result.provenance.noCandidateSelection === true &&
  result.boundary === REALITY_ROUTE_CANDIDATE_REQUEST_CONTEXT_BRIDGE_BOUNDARY;

export function bridgeRealityRouteDeliveryOrchestration(
  input: RealityRouteDeliveryOrchestrationBridgeInput,
): RealityRouteDeliveryOrchestrationBridgeResult {
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
      null,
      null,
      "REALITY_ROUTE_AUTHORIZATION_REQUIRED",
    );
  }

  const requestResult = input.routeCandidateRequestResult;
  if (!requestResult || requestResult.status !== "READY") {
    return unavailable(
      "SOURCE_NOT_READY",
      requestResult?.sourceReferenceId ?? authorization.sourceReferenceId,
      requestResult?.routeActivationContextReferenceId ?? null,
      requestResult?.candidateActivationContextReferenceId ?? null,
      null,
      "ROUTE_CANDIDATE_REQUEST_NOT_READY",
    );
  }
  if (!isReadyRouteCandidateRequest(requestResult)) {
    return unavailable(
      "BLOCKED",
      requestResult.sourceReferenceId,
      requestResult.routeActivationContextReferenceId,
      requestResult.candidateActivationContextReferenceId,
      null,
      "ROUTE_CANDIDATE_REQUEST_INVALID",
    );
  }

  const sourceReferenceId = requestResult.sourceReferenceId;
  if (hasForbiddenSourceReference(sourceReferenceId)) {
    return unavailable(
      "BLOCKED",
      sourceReferenceId,
      requestResult.routeActivationContextReferenceId,
      requestResult.candidateActivationContextReferenceId,
      null,
      "FORBIDDEN_SOURCE_REFERENCE",
    );
  }
  if (authorization.sourceReferenceId !== sourceReferenceId) {
    return unavailable(
      "BLOCKED",
      sourceReferenceId,
      requestResult.routeActivationContextReferenceId,
      requestResult.candidateActivationContextReferenceId,
      null,
      "SOURCE_REFERENCE_MISMATCH",
    );
  }

  const deliveryResult =
    initializeRealityPressureActivationDeliveryOrchestration({
      routeAuthorization: authorization,
      activationRequestContext: requestResult.candidateRequestContext,
    });
  if (
    deliveryResult.status !== "READY" ||
    deliveryResult.operation !== "INITIALIZE"
  ) {
    return unavailable(
      deliveryResult.status === "READY" ? "BLOCKED" : deliveryResult.status,
      sourceReferenceId,
      requestResult.routeActivationContextReferenceId,
      requestResult.candidateActivationContextReferenceId,
      deliveryResult.deliverySession,
      "DELIVERY_ORCHESTRATION_NOT_READY",
      deliveryResult.status === "READY" ? null : deliveryResult.reason,
    );
  }
  if (
    deliveryResult.sourceReferenceId !== sourceReferenceId ||
    deliveryResult.activationContextReferenceId !==
      requestResult.candidateActivationContextReferenceId ||
    deliveryResult.deliverySession.sourceReferenceId !== sourceReferenceId
  ) {
    return unavailable(
      "BLOCKED",
      sourceReferenceId,
      requestResult.routeActivationContextReferenceId,
      requestResult.candidateActivationContextReferenceId,
      deliveryResult.deliverySession,
      "SOURCE_REFERENCE_MISMATCH",
    );
  }

  return Object.freeze({
    status: "READY" as const,
    operation: "INITIALIZE" as const,
    sourceReferenceId,
    routeActivationContextReferenceId:
      requestResult.routeActivationContextReferenceId,
    candidateActivationContextReferenceId:
      requestResult.candidateActivationContextReferenceId,
    deliverySession: deliveryResult.deliverySession,
    candidateSourceContext: deliveryResult.candidateSourceContext,
    consumerInput: deliveryResult.consumerInput,
    provenance: Object.freeze({
      routeCandidateRequestSource:
        "REALITY_ROUTE_CANDIDATE_REQUEST_CONTEXT_BRIDGE" as const,
      deliveryOrchestrationSource:
        "REALITY_PRESSURE_ACTIVATION_DELIVERY_ORCHESTRATION_BRIDGE" as const,
      sourceReferenceId,
      noCandidateSelection: true as const,
      consumerNotExecuted: true as const,
    }),
    reason: null,
    deliveryBridgeReason: null,
    boundary: REALITY_ROUTE_DELIVERY_ORCHESTRATION_BRIDGE_BOUNDARY,
  });
}

export const RealityRouteDeliveryOrchestrationBridgeService = Object.freeze({
  bridge: bridgeRealityRouteDeliveryOrchestration,
  boundary: REALITY_ROUTE_DELIVERY_ORCHESTRATION_BRIDGE_BOUNDARY,
});
