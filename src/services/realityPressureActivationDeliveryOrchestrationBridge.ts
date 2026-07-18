import type { RealityPressureActivationCandidateRequestContext } from "../types/realityPressureActivationCandidateRequestBridge";
import type { RealityPressureCandidateDeliverySession } from "../types/realityPressureCandidateDeliverySession";
import type {
  RealityPressureActivationDeliveryOrchestrationAdvanceInput,
  RealityPressureActivationDeliveryOrchestrationBridgeBlockedReason,
  RealityPressureActivationDeliveryOrchestrationBridgeBoundary,
  RealityPressureActivationDeliveryOrchestrationBridgeResult,
  RealityPressureActivationDeliveryOrchestrationInitializeInput,
} from "../types/realityPressureActivationDeliveryOrchestrationBridge";
import type { RealityPressureCandidateDeliveryOrchestrationBlockedReason } from "../types/realityPressureCandidateDeliveryOrchestration";
import {
  advanceRealityPressureCandidateDeliveryOrchestration,
  initializeRealityPressureCandidateDeliveryOrchestration,
} from "./realityPressureCandidateDeliveryOrchestration";

export const REALITY_PRESSURE_ACTIVATION_DELIVERY_ORCHESTRATION_BRIDGE_BOUNDARY:
  RealityPressureActivationDeliveryOrchestrationBridgeBoundary = Object.freeze({
    activationRequestToDeliveryOrchestrationOnly: true,
    existingActivationRequestContextOnly: true,
    existingDeliveryOrchestrationOnly: true,
    consumerInputForwardingOnly: true,
    sourceReferenceContinuityRequired: true,
    activationReferenceTraceabilityRequired: true,
    immutableOutputOnly: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noReferenceOnlySource: true,
    noSourceFallback: true,
    noEngineInvocation: true,
    noSourceRecalculation: true,
    noCandidateSourceDirectInvocation: true,
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

const unavailable = (
  status: "SOURCE_NOT_READY" | "BLOCKED",
  operation: "INITIALIZE" | "ADVANCE",
  sourceReferenceId: string | null,
  activationContextReferenceId: string | null,
  deliverySession: RealityPressureCandidateDeliverySession | null,
  reason: RealityPressureActivationDeliveryOrchestrationBridgeBlockedReason,
  orchestrationReason: RealityPressureCandidateDeliveryOrchestrationBlockedReason | null = null,
): RealityPressureActivationDeliveryOrchestrationBridgeResult => Object.freeze({
  status,
  operation,
  sourceReferenceId,
  activationContextReferenceId,
  deliverySession,
  candidateSourceContext: null,
  consumerInput: null,
  provenance: null,
  reason,
  orchestrationReason,
  boundary: REALITY_PRESSURE_ACTIVATION_DELIVERY_ORCHESTRATION_BRIDGE_BOUNDARY,
});

const isActivationRequestContextValid = (
  context: RealityPressureActivationCandidateRequestContext,
): boolean =>
  Object.isFrozen(context) &&
  Object.isFrozen(context.candidateRequestContext) &&
  Object.isFrozen(context.provenance) &&
  context.schemaVersion ===
    "GUANYAO_REALITY_PRESSURE_ACTIVATION_CANDIDATE_REQUEST_CONTEXT_V1" &&
  context.source ===
    "reality_pressure_activation_candidate_request_bridge" &&
  context.sourceExperienceMode === "REAL_USER_EXPERIENCE" &&
  context.sourceProvenance === "REAL_USER_SESSION" &&
  context.sourceReferenceId.trim().length > 0 &&
  context.activationContextReferenceId.trim().length > 0 &&
  context.sourceReferenceId ===
    context.candidateRequestContext.sourceReferenceId &&
  context.sourceReferenceId ===
    context.candidateRequestContext.candidateRequest.sourceReferenceId &&
  context.provenance.sourceReferenceId === context.sourceReferenceId &&
  context.provenance.noPressureInference === true &&
  context.provenance.noCandidateSelection === true;

const createProvenance = (sourceReferenceId: string) => Object.freeze({
  activationRequestSource:
    "REALITY_PRESSURE_ACTIVATION_CANDIDATE_REQUEST_CONTEXT" as const,
  deliveryOrchestrationSource:
    "REALITY_PRESSURE_CANDIDATE_DELIVERY_ORCHESTRATION" as const,
  sourceReferenceId,
  noCandidateSelection: true as const,
});

export function initializeRealityPressureActivationDeliveryOrchestration(
  input: RealityPressureActivationDeliveryOrchestrationInitializeInput,
): RealityPressureActivationDeliveryOrchestrationBridgeResult {
  const activationRequestContext = input?.activationRequestContext;
  if (
    !activationRequestContext ||
    !isActivationRequestContextValid(activationRequestContext)
  ) {
    return unavailable(
      "SOURCE_NOT_READY",
      "INITIALIZE",
      null,
      null,
      null,
      "ACTIVATION_REQUEST_CONTEXT_INVALID",
    );
  }
  const sourceReferenceId = activationRequestContext.sourceReferenceId;
  const activationContextReferenceId =
    activationRequestContext.activationContextReferenceId;
  if (hasForbiddenSourceReference(sourceReferenceId)) {
    return unavailable(
      "BLOCKED",
      "INITIALIZE",
      sourceReferenceId,
      activationContextReferenceId,
      null,
      "FORBIDDEN_SOURCE_REFERENCE",
    );
  }
  if (input.routeAuthorization.sourceReferenceId !== sourceReferenceId) {
    return unavailable(
      "BLOCKED",
      "INITIALIZE",
      sourceReferenceId,
      activationContextReferenceId,
      null,
      "SOURCE_REFERENCE_MISMATCH",
    );
  }

  const orchestrationResult =
    initializeRealityPressureCandidateDeliveryOrchestration({
      routeAuthorization: input.routeAuthorization,
      candidateRequestContext:
        activationRequestContext.candidateRequestContext,
    });
  if (
    orchestrationResult.status !== "READY" ||
    orchestrationResult.operation !== "INITIALIZE"
  ) {
    return unavailable(
      orchestrationResult.status === "READY"
        ? "BLOCKED"
        : orchestrationResult.status,
      "INITIALIZE",
      sourceReferenceId,
      activationContextReferenceId,
      orchestrationResult.deliverySession,
      "DELIVERY_ORCHESTRATION_NOT_READY",
      orchestrationResult.status === "READY"
        ? null
        : orchestrationResult.reason,
    );
  }

  return Object.freeze({
    status: "READY" as const,
    operation: "INITIALIZE" as const,
    sourceReferenceId,
    activationContextReferenceId,
    deliverySession: orchestrationResult.deliverySession,
    candidateSourceContext: orchestrationResult.candidateSourceContext,
    consumerInput: orchestrationResult.consumerInput,
    provenance: createProvenance(sourceReferenceId),
    reason: null,
    orchestrationReason: null,
    boundary:
      REALITY_PRESSURE_ACTIVATION_DELIVERY_ORCHESTRATION_BRIDGE_BOUNDARY,
  });
}

export function advanceRealityPressureActivationDeliveryOrchestration(
  input: RealityPressureActivationDeliveryOrchestrationAdvanceInput,
): RealityPressureActivationDeliveryOrchestrationBridgeResult {
  const activationRequestContext = input?.activationRequestContext;
  const deliverySession = input?.deliverySession ?? null;
  if (
    !activationRequestContext ||
    !isActivationRequestContextValid(activationRequestContext)
  ) {
    return unavailable(
      "SOURCE_NOT_READY",
      "ADVANCE",
      deliverySession?.sourceReferenceId ?? null,
      null,
      deliverySession,
      "ACTIVATION_REQUEST_CONTEXT_INVALID",
    );
  }
  const sourceReferenceId = activationRequestContext.sourceReferenceId;
  const activationContextReferenceId =
    activationRequestContext.activationContextReferenceId;
  if (hasForbiddenSourceReference(sourceReferenceId)) {
    return unavailable(
      "BLOCKED",
      "ADVANCE",
      sourceReferenceId,
      activationContextReferenceId,
      deliverySession,
      "FORBIDDEN_SOURCE_REFERENCE",
    );
  }
  if (
    deliverySession.sourceReferenceId !== sourceReferenceId ||
    input.pressureSeedSession.sourceReferenceId !== sourceReferenceId
  ) {
    return unavailable(
      "BLOCKED",
      "ADVANCE",
      sourceReferenceId,
      activationContextReferenceId,
      deliverySession,
      "SOURCE_REFERENCE_MISMATCH",
    );
  }

  const orchestrationResult =
    advanceRealityPressureCandidateDeliveryOrchestration({
      deliverySession,
      pressureSeedSession: input.pressureSeedSession,
      candidateRequestContext:
        activationRequestContext.candidateRequestContext,
    });
  if (
    orchestrationResult.status !== "READY" ||
    orchestrationResult.operation !== "ADVANCE"
  ) {
    return unavailable(
      orchestrationResult.status === "READY"
        ? "BLOCKED"
        : orchestrationResult.status,
      "ADVANCE",
      sourceReferenceId,
      activationContextReferenceId,
      orchestrationResult.deliverySession,
      "DELIVERY_ORCHESTRATION_NOT_READY",
      orchestrationResult.status === "READY"
        ? null
        : orchestrationResult.reason,
    );
  }

  return Object.freeze({
    status: "READY" as const,
    operation: "ADVANCE" as const,
    sourceReferenceId,
    activationContextReferenceId,
    deliverySession: orchestrationResult.deliverySession,
    candidateSourceContext: orchestrationResult.candidateSourceContext,
    consumerInput: orchestrationResult.consumerInput,
    provenance: createProvenance(sourceReferenceId),
    reason: null,
    orchestrationReason: null,
    boundary:
      REALITY_PRESSURE_ACTIVATION_DELIVERY_ORCHESTRATION_BRIDGE_BOUNDARY,
  });
}
