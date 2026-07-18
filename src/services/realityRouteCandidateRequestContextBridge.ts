import type { RealityPressureActivationCandidateRequestBridgeBlockedReason } from "../types/realityPressureActivationCandidateRequestBridge";
import type {
  RealityRouteCandidateRequestContextBridgeBlockedReason,
  RealityRouteCandidateRequestContextBridgeBoundary,
  RealityRouteCandidateRequestContextBridgeInput,
  RealityRouteCandidateRequestContextBridgeResult,
} from "../types/realityRouteCandidateRequestContextBridge";
import type { RealityRoutePressureCandidateActivationBridgeResult } from "../types/realityRoutePressureCandidateActivationBridge";
import { bridgeRealityPressureActivationCandidateRequestContext } from "./realityPressureActivationCandidateRequestBridge";
import { REALITY_ROUTE_PRESSURE_CANDIDATE_ACTIVATION_BRIDGE_BOUNDARY } from "./realityRoutePressureCandidateActivationBridge";

export const REALITY_ROUTE_CANDIDATE_REQUEST_CONTEXT_BRIDGE_BOUNDARY:
  RealityRouteCandidateRequestContextBridgeBoundary = Object.freeze({
    routeCandidateActivationToExistingRequestBridgeOnly: true,
    readyRouteCandidateActivationOnly: true,
    existingActivationCandidateRequestBridgeOnly: true,
    initialDeliverySessionMustBeNull: true,
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
  candidateActivationContextReferenceId: string | null,
  reason: RealityRouteCandidateRequestContextBridgeBlockedReason,
  requestBridgeReason: RealityPressureActivationCandidateRequestBridgeBlockedReason | null = null,
): RealityRouteCandidateRequestContextBridgeResult => Object.freeze({
  status,
  sourceReferenceId,
  routeActivationContextReferenceId,
  candidateActivationContextReferenceId,
  candidateRequestContext: null,
  provenance: null,
  reason,
  requestBridgeReason,
  boundary: REALITY_ROUTE_CANDIDATE_REQUEST_CONTEXT_BRIDGE_BOUNDARY,
});

const isReadyRouteCandidateActivation = (
  result: RealityRoutePressureCandidateActivationBridgeResult,
): boolean =>
  result.status === "READY" &&
  Object.isFrozen(result) &&
  Object.isFrozen(result.candidateActivationContext) &&
  Object.isFrozen(result.provenance) &&
  result.sourceReferenceId.trim().length > 0 &&
  result.routeActivationContextReferenceId.trim().length > 0 &&
  result.sourceReferenceId ===
    result.candidateActivationContext.sourceReferenceId &&
  result.candidateActivationContext.contextReferenceId.trim().length > 0 &&
  result.provenance.sourceReferenceId === result.sourceReferenceId &&
  result.provenance.noCandidateSelection === true &&
  result.boundary ===
    REALITY_ROUTE_PRESSURE_CANDIDATE_ACTIVATION_BRIDGE_BOUNDARY;

export function bridgeRealityRouteCandidateRequestContext(
  input: RealityRouteCandidateRequestContextBridgeInput,
): RealityRouteCandidateRequestContextBridgeResult {
  const activationResult = input?.routeCandidateActivationResult;
  if (!activationResult || activationResult.status !== "READY") {
    return unavailable(
      "SOURCE_NOT_READY",
      activationResult?.sourceReferenceId ?? null,
      activationResult?.routeActivationContextReferenceId ?? null,
      null,
      "ROUTE_CANDIDATE_ACTIVATION_NOT_READY",
    );
  }
  if (!isReadyRouteCandidateActivation(activationResult)) {
    return unavailable(
      "BLOCKED",
      activationResult.sourceReferenceId,
      activationResult.routeActivationContextReferenceId,
      activationResult.candidateActivationContext.contextReferenceId,
      "ROUTE_CANDIDATE_ACTIVATION_INVALID",
    );
  }
  const sourceReferenceId = activationResult.sourceReferenceId;
  const routeActivationContextReferenceId =
    activationResult.routeActivationContextReferenceId;
  const candidateActivationContextReferenceId =
    activationResult.candidateActivationContext.contextReferenceId;
  if (hasForbiddenSourceReference(sourceReferenceId)) {
    return unavailable(
      "BLOCKED",
      sourceReferenceId,
      routeActivationContextReferenceId,
      candidateActivationContextReferenceId,
      "FORBIDDEN_SOURCE_REFERENCE",
    );
  }

  const requestResult =
    bridgeRealityPressureActivationCandidateRequestContext({
      activationContext: activationResult.candidateActivationContext,
      deliverySession: null,
    });
  if (requestResult.status !== "READY") {
    return unavailable(
      requestResult.status,
      sourceReferenceId,
      routeActivationContextReferenceId,
      candidateActivationContextReferenceId,
      "ACTIVATION_REQUEST_BRIDGE_NOT_READY",
      requestResult.reason,
    );
  }
  if (
    requestResult.context.sourceReferenceId !== sourceReferenceId ||
    requestResult.context.activationContextReferenceId !==
      candidateActivationContextReferenceId ||
    requestResult.context.deliveryStateSource !== "INITIAL_ACTIVATION"
  ) {
    return unavailable(
      "BLOCKED",
      sourceReferenceId,
      routeActivationContextReferenceId,
      candidateActivationContextReferenceId,
      "SOURCE_REFERENCE_MISMATCH",
    );
  }

  return Object.freeze({
    status: "READY" as const,
    sourceReferenceId,
    routeActivationContextReferenceId,
    candidateActivationContextReferenceId,
    candidateRequestContext: requestResult.context,
    provenance: Object.freeze({
      routeCandidateActivationSource:
        "REALITY_ROUTE_PRESSURE_CANDIDATE_ACTIVATION_BRIDGE" as const,
      activationRequestSource:
        "REALITY_PRESSURE_ACTIVATION_CANDIDATE_REQUEST_BRIDGE" as const,
      deliveryStateSource: "INITIAL_ACTIVATION" as const,
      sourceReferenceId,
      noCandidateSelection: true as const,
    }),
    reason: null,
    requestBridgeReason: null,
    boundary: REALITY_ROUTE_CANDIDATE_REQUEST_CONTEXT_BRIDGE_BOUNDARY,
  });
}

export const RealityRouteCandidateRequestContextBridgeService = Object.freeze({
  bridge: bridgeRealityRouteCandidateRequestContext,
  boundary: REALITY_ROUTE_CANDIDATE_REQUEST_CONTEXT_BRIDGE_BOUNDARY,
});
