import type { RealityPressureCandidateActivationContext } from "../types/realityPressureCandidateActivationContext";
import type { RealityPressureCandidateDeliverySession } from "../types/realityPressureCandidateDeliverySession";
import type {
  RealityPressureActivationCandidateRequestBridgeBlockedReason,
  RealityPressureActivationCandidateRequestBridgeBoundary,
  RealityPressureActivationCandidateRequestBridgeInput,
  RealityPressureActivationCandidateRequestBridgeResult,
} from "../types/realityPressureActivationCandidateRequestBridge";
import type { RealityPressureCandidateRequestContextBridgeBlockedReason } from "../types/realityPressureCandidateRequestContextBridge";
import { REALITY_PRESSURE_CANDIDATE_ACTIVATION_CONTEXT_BOUNDARY } from "./realityPressureCandidateActivationContextContract";
import { bridgeRealityPressureCandidateRequestContext } from "./realityPressureCandidateRequestContextBridge";

export const REALITY_PRESSURE_ACTIVATION_CANDIDATE_REQUEST_BRIDGE_BOUNDARY:
  RealityPressureActivationCandidateRequestBridgeBoundary = Object.freeze({
    activationToRequestBridgeOnly: true,
    existingActivationContextOnly: true,
    existingCandidateRequestBridgeOnly: true,
    optionalExistingDeliverySessionOnly: true,
    sourceReferenceContinuityRequired: true,
    activationReferenceTraceabilityRequired: true,
    immutableOutputOnly: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noReferenceOnlySource: true,
    noSourceFallback: true,
    noSystemClock: true,
    noEngineInvocation: true,
    noSourceRecalculation: true,
    noCandidateSourceInvocation: true,
    noCandidateAssembly: true,
    noAutomaticSelection: true,
    noCaptureExecution: true,
    noPressureConsumerIntegration: true,
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

const unavailable = (
  status: "SOURCE_NOT_READY" | "BLOCKED",
  reason: RealityPressureActivationCandidateRequestBridgeBlockedReason,
  requestBridgeReason: RealityPressureCandidateRequestContextBridgeBlockedReason | null = null,
): RealityPressureActivationCandidateRequestBridgeResult => Object.freeze({
  status,
  context: null,
  reason,
  requestBridgeReason,
  boundary: REALITY_PRESSURE_ACTIVATION_CANDIDATE_REQUEST_BRIDGE_BOUNDARY,
});

const isActivationContextValid = (
  context: RealityPressureCandidateActivationContext,
): boolean =>
  Object.isFrozen(context) &&
  Object.isFrozen(context.requestDateSource) &&
  Object.isFrozen(context.excludedCandidateIds) &&
  Object.isFrozen(context.provenance) &&
  context.schemaVersion ===
    "GUANYAO_REALITY_PRESSURE_CANDIDATE_ACTIVATION_CONTEXT_V1" &&
  context.source === "reality_pressure_candidate_activation_context" &&
  context.contextReferenceId.trim().length > 0 &&
  context.sourceMode === "REAL_USER_EXPERIENCE" &&
  context.sourceExperienceMode === "REAL_USER_EXPERIENCE" &&
  context.sourceProvenance === "REAL_USER_SESSION" &&
  context.activationBoundary === "REALITY_ROUTE_ACTIVATION" &&
  context.activationEligibility === "ELIGIBLE" &&
  context.candidateCursor === null &&
  context.excludedCandidateIds.length === 0 &&
  context.sourceReferenceId === context.lifeSourceSession.sourceReferenceId &&
  context.sourceReferenceId === context.requestDateSource.sourceReferenceId &&
  context.provenance.sourceReferenceId === context.sourceReferenceId &&
  context.provenance.noPressureInference === true &&
  context.provenance.noCandidateSelection === true &&
  context.boundary ===
    REALITY_PRESSURE_CANDIDATE_ACTIVATION_CONTEXT_BOUNDARY;

const isDeliverySessionValid = (
  session: RealityPressureCandidateDeliverySession,
): boolean =>
  Object.isFrozen(session) &&
  Object.isFrozen(session.deliveredCandidateReferenceIds) &&
  session.schemaVersion ===
    "GUANYAO_REALITY_PRESSURE_CANDIDATE_DELIVERY_SESSION_V1" &&
  session.source === "reality_pressure_candidate_delivery_session" &&
  session.sourceExperienceMode === "REAL_USER_EXPERIENCE" &&
  session.sourceProvenance === "REAL_USER_SESSION" &&
  session.sourceReferenceId.trim().length > 0 &&
  session.deliveryState === "BUNDLE_READY" &&
  session.deliverySequence > 0 &&
  session.deliveredCandidateReferenceIds.length ===
    session.deliverySequence * 3 &&
  new Set(session.deliveredCandidateReferenceIds).size ===
    session.deliveredCandidateReferenceIds.length;

export function bridgeRealityPressureActivationCandidateRequestContext(
  input: RealityPressureActivationCandidateRequestBridgeInput,
): RealityPressureActivationCandidateRequestBridgeResult {
  const activationContext = input?.activationContext;
  if (!activationContext || !isActivationContextValid(activationContext)) {
    return unavailable("SOURCE_NOT_READY", "ACTIVATION_CONTEXT_INVALID");
  }
  const sourceReferenceId = activationContext.sourceReferenceId;
  if (hasForbiddenSourceReference(sourceReferenceId)) {
    return unavailable("BLOCKED", "FORBIDDEN_SOURCE_REFERENCE");
  }

  const deliverySession = input.deliverySession;
  if (
    deliverySession &&
    !isDeliverySessionValid(deliverySession)
  ) {
    return unavailable("BLOCKED", "DELIVERY_SESSION_INVALID");
  }
  if (
    deliverySession &&
    deliverySession.sourceReferenceId !== sourceReferenceId
  ) {
    return unavailable("BLOCKED", "SOURCE_REFERENCE_MISMATCH");
  }

  const requestBridgeResult = bridgeRealityPressureCandidateRequestContext({
    lifeSourceSession: activationContext.lifeSourceSession,
    asOfDate: activationContext.requestDateSource.asOfDate,
    candidateCursor:
      deliverySession?.nextCandidateCursor ?? activationContext.candidateCursor,
    excludedCandidateReferenceIds:
      deliverySession?.deliveredCandidateReferenceIds ??
      activationContext.excludedCandidateIds,
  });
  if (requestBridgeResult.status !== "READY") {
    return unavailable(
      requestBridgeResult.status,
      "CANDIDATE_REQUEST_BRIDGE_NOT_READY",
      requestBridgeResult.reason,
    );
  }
  if (
    requestBridgeResult.context.sourceReferenceId !== sourceReferenceId ||
    requestBridgeResult.context.candidateRequest.sourceReferenceId !==
      sourceReferenceId
  ) {
    return unavailable("BLOCKED", "SOURCE_REFERENCE_MISMATCH");
  }

  const provenance = Object.freeze({
    activationSource:
      "REALITY_PRESSURE_CANDIDATE_ACTIVATION_CONTEXT" as const,
    requestBridgeSource:
      "REALITY_PRESSURE_CANDIDATE_REQUEST_CONTEXT_BRIDGE" as const,
    sourceReferenceId,
    noPressureInference: true as const,
    noCandidateSelection: true as const,
  });
  const context = Object.freeze({
    schemaVersion:
      "GUANYAO_REALITY_PRESSURE_ACTIVATION_CANDIDATE_REQUEST_CONTEXT_V1" as const,
    source:
      "reality_pressure_activation_candidate_request_bridge" as const,
    sourceExperienceMode: "REAL_USER_EXPERIENCE" as const,
    sourceProvenance: "REAL_USER_SESSION" as const,
    sourceReferenceId,
    activationContextReferenceId: activationContext.contextReferenceId,
    deliveryStateSource: deliverySession
      ? ("DELIVERY_SESSION" as const)
      : ("INITIAL_ACTIVATION" as const),
    candidateRequestContext: requestBridgeResult.context,
    provenance,
    boundary: REALITY_PRESSURE_ACTIVATION_CANDIDATE_REQUEST_BRIDGE_BOUNDARY,
  });

  return Object.freeze({
    status: "READY" as const,
    context,
    reason: null,
    requestBridgeReason: null,
    boundary: REALITY_PRESSURE_ACTIVATION_CANDIDATE_REQUEST_BRIDGE_BOUNDARY,
  });
}
