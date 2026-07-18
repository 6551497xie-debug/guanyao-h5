import type { RealityPressureCandidateDeliverySession } from "../types/realityPressureCandidateDeliverySession";
import type { RealityPressureCandidateRequestContext } from "../types/realityPressureCandidateRequestContextBridge";
import type {
  RealityPressureCandidateDeliveryOrchestrationAdvanceInput,
  RealityPressureCandidateDeliveryOrchestrationBlockedReason,
  RealityPressureCandidateDeliveryOrchestrationBoundary,
  RealityPressureCandidateDeliveryOrchestrationInitializeInput,
  RealityPressureCandidateDeliveryOrchestrationResult,
} from "../types/realityPressureCandidateDeliveryOrchestration";
import {
  advanceRealityPressureCandidateDeliverySession,
  initializeRealityPressureCandidateDeliverySession,
} from "./realityPressureCandidateDeliverySession";
import { resolveRealityPressureSeedCandidateSource } from "./realityPressureSeedCandidateSource";

export const REALITY_PRESSURE_CANDIDATE_DELIVERY_ORCHESTRATION_BOUNDARY:
  RealityPressureCandidateDeliveryOrchestrationBoundary = Object.freeze({
    productionDeliveryOrchestrationOnly: true,
    authorizedRealitySourceOnly: true,
    realCandidateRequestContextOnly: true,
    existingCandidateSourceOnly: true,
    existingDeliverySessionOnly: true,
    consumerInputAssemblyOnly: true,
    sourceReferenceContinuityRequired: true,
    candidateCursorContinuityRequired: true,
    immutableOutputOnly: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noReferenceOnlySource: true,
    noSourceFallback: true,
    noNewPressureEngine: true,
    noCandidateAssembly: true,
    noAutomaticSelection: true,
    noCaptureExecution: true,
    noPressureConsumerExecution: true,
    noGravityIntegration: true,
    noUiIntegration: true,
    noRendererInvocation: true,
    noRouteMutation: true,
    noNavigationMutation: true,
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

const arraysEqual = (
  left: readonly string[],
  right: readonly string[],
): boolean =>
  left.length === right.length &&
  left.every((value, index) => value === right[index]);

const unavailable = (
  status: "BLOCKED" | "SOURCE_NOT_READY",
  operation: "INITIALIZE" | "ADVANCE",
  sourceReferenceId: string | null,
  deliverySession: RealityPressureCandidateDeliverySession | null,
  reason: RealityPressureCandidateDeliveryOrchestrationBlockedReason,
): RealityPressureCandidateDeliveryOrchestrationResult => Object.freeze({
  status,
  operation,
  sourceReferenceId,
  deliverySession,
  candidateSourceContext: null,
  consumerInput: null,
  reason,
  boundary: REALITY_PRESSURE_CANDIDATE_DELIVERY_ORCHESTRATION_BOUNDARY,
});

const isCandidateRequestContextValid = (
  context: RealityPressureCandidateRequestContext,
): boolean =>
  Object.isFrozen(context) &&
  Object.isFrozen(context.candidateRequest) &&
  Object.isFrozen(context.candidateRequest.excludedCandidateReferenceIds) &&
  Object.isFrozen(context.provenance) &&
  context.schemaVersion ===
    "GUANYAO_REALITY_PRESSURE_CANDIDATE_REQUEST_CONTEXT_V1" &&
  context.source === "reality_pressure_candidate_request_context_bridge" &&
  context.sourceExperienceMode === "REAL_USER_EXPERIENCE" &&
  context.sourceProvenance === "REAL_USER_SESSION" &&
  context.sourceReferenceId.trim().length > 0 &&
  !hasForbiddenSourceReference(context.sourceReferenceId) &&
  context.sourceReferenceId === context.candidateRequest.sourceReferenceId &&
  context.ageSegment === context.candidateRequest.ageSegment &&
  context.ageSegmentRole === "CATALOG_ROUTING_ONLY" &&
  context.candidateRequest.ageSegmentRole === "CATALOG_ROUTING_ONLY" &&
  context.provenance.lifeSource === "LAUNCH_LIFE_SOURCE_SESSION" &&
  context.provenance.birthSource === "LAUNCH_USER_CONFIRMED" &&
  context.provenance.noPressureInference === true;

export function initializeRealityPressureCandidateDeliveryOrchestration(
  input: RealityPressureCandidateDeliveryOrchestrationInitializeInput,
): RealityPressureCandidateDeliveryOrchestrationResult {
  const authorization = input.routeAuthorization;
  if (
    authorization.status !== "READY" ||
    authorization.authorizationState !==
      "AUTHORIZED_PRODUCTION_REALITY_SOURCE" ||
    authorization.routeTarget !== "/reality" ||
    authorization.sourceContext.sourceExperienceMode !==
      "REAL_USER_EXPERIENCE" ||
    authorization.sourceContext.sourceProvenance !== "REAL_USER_SESSION"
  ) {
    return unavailable(
      "BLOCKED",
      "INITIALIZE",
      authorization.sourceReferenceId,
      null,
      "REALITY_ROUTE_AUTHORIZATION_REQUIRED",
    );
  }
  const requestContext = input.candidateRequestContext;
  if (!isCandidateRequestContextValid(requestContext)) {
    return unavailable(
      "BLOCKED",
      "INITIALIZE",
      requestContext.sourceReferenceId ?? null,
      null,
      "CANDIDATE_REQUEST_CONTEXT_INVALID",
    );
  }
  if (authorization.sourceReferenceId !== requestContext.sourceReferenceId) {
    return unavailable(
      "BLOCKED",
      "INITIALIZE",
      requestContext.sourceReferenceId,
      null,
      "SOURCE_REFERENCE_MISMATCH",
    );
  }

  const sourceResult = resolveRealityPressureSeedCandidateSource(
    requestContext.candidateRequest,
  );
  if (sourceResult.status !== "READY") {
    return unavailable(
      "SOURCE_NOT_READY",
      "INITIALIZE",
      requestContext.sourceReferenceId,
      null,
      "CANDIDATE_SOURCE_NOT_READY",
    );
  }
  const deliveryResult = initializeRealityPressureCandidateDeliverySession({
    candidateSourceResult: sourceResult,
  });
  if (deliveryResult.status !== "READY") {
    return unavailable(
      "BLOCKED",
      "INITIALIZE",
      requestContext.sourceReferenceId,
      null,
      "DELIVERY_SESSION_BLOCKED",
    );
  }

  const consumerInput = Object.freeze({
    routeAuthorization: authorization,
    candidateSourceContext: sourceResult.context,
  });
  return Object.freeze({
    status: "READY" as const,
    operation: "INITIALIZE" as const,
    sourceReferenceId: requestContext.sourceReferenceId,
    deliverySession: deliveryResult.session,
    candidateSourceContext: sourceResult.context,
    consumerInput,
    reason: null,
    boundary: REALITY_PRESSURE_CANDIDATE_DELIVERY_ORCHESTRATION_BOUNDARY,
  });
}

export function advanceRealityPressureCandidateDeliveryOrchestration(
  input: RealityPressureCandidateDeliveryOrchestrationAdvanceInput,
): RealityPressureCandidateDeliveryOrchestrationResult {
  const { deliverySession, pressureSeedSession, candidateRequestContext } =
    input;
  if (!isCandidateRequestContextValid(candidateRequestContext)) {
    return unavailable(
      "BLOCKED",
      "ADVANCE",
      candidateRequestContext.sourceReferenceId ?? null,
      deliverySession,
      "CANDIDATE_REQUEST_CONTEXT_INVALID",
    );
  }
  if (
    candidateRequestContext.sourceReferenceId !==
      deliverySession.sourceReferenceId ||
    candidateRequestContext.sourceReferenceId !==
      pressureSeedSession.sourceReferenceId
  ) {
    return unavailable(
      "BLOCKED",
      "ADVANCE",
      candidateRequestContext.sourceReferenceId,
      deliverySession,
      "SOURCE_REFERENCE_MISMATCH",
    );
  }
  if (
    !Object.isFrozen(pressureSeedSession) ||
    pressureSeedSession.sourceExperienceMode !== "REAL_USER_EXPERIENCE" ||
    pressureSeedSession.sourceProvenance !== "REAL_USER_SESSION" ||
    pressureSeedSession.candidateBundleReferenceId !==
      deliverySession.currentBundleReferenceId ||
    !pressureSeedSession.availableEvents.includes(
      "PRESSURE_SEED_REQUEST_NEXT_BUNDLE",
    )
  ) {
    return unavailable(
      "BLOCKED",
      "ADVANCE",
      candidateRequestContext.sourceReferenceId,
      deliverySession,
      "PRESSURE_SEED_SESSION_INVALID",
    );
  }
  if (
    candidateRequestContext.candidateRequest.candidateCursor !==
      deliverySession.nextCandidateCursor
  ) {
    return unavailable(
      "BLOCKED",
      "ADVANCE",
      candidateRequestContext.sourceReferenceId,
      deliverySession,
      "CANDIDATE_CURSOR_MISMATCH",
    );
  }
  if (
    !arraysEqual(
      candidateRequestContext.candidateRequest
        .excludedCandidateReferenceIds,
      deliverySession.deliveredCandidateReferenceIds,
    )
  ) {
    return unavailable(
      "BLOCKED",
      "ADVANCE",
      candidateRequestContext.sourceReferenceId,
      deliverySession,
      "DELIVERY_HISTORY_MISMATCH",
    );
  }

  const sourceResult = resolveRealityPressureSeedCandidateSource(
    candidateRequestContext.candidateRequest,
  );
  if (sourceResult.status !== "READY") {
    return unavailable(
      "SOURCE_NOT_READY",
      "ADVANCE",
      candidateRequestContext.sourceReferenceId,
      deliverySession,
      "CANDIDATE_SOURCE_NOT_READY",
    );
  }
  const deliveryResult = advanceRealityPressureCandidateDeliverySession({
    session: deliverySession,
    candidateSourceResult: sourceResult,
  });
  if (deliveryResult.status !== "READY") {
    return unavailable(
      "BLOCKED",
      "ADVANCE",
      candidateRequestContext.sourceReferenceId,
      deliverySession,
      "DELIVERY_SESSION_BLOCKED",
    );
  }

  const command = Object.freeze({
    event: "PRESSURE_SEED_REQUEST_NEXT_BUNDLE" as const,
    sourceReferenceId: candidateRequestContext.sourceReferenceId,
    candidateBundleReferenceId: sourceResult.context.bundleReferenceId,
    recognizedCandidateReferenceId: null,
  });
  const consumerInput = Object.freeze({
    session: pressureSeedSession,
    candidateSourceContext: sourceResult.context,
    command,
  });
  return Object.freeze({
    status: "READY" as const,
    operation: "ADVANCE" as const,
    sourceReferenceId: candidateRequestContext.sourceReferenceId,
    deliverySession: deliveryResult.session,
    candidateSourceContext: sourceResult.context,
    consumerInput,
    reason: null,
    boundary: REALITY_PRESSURE_CANDIDATE_DELIVERY_ORCHESTRATION_BOUNDARY,
  });
}
