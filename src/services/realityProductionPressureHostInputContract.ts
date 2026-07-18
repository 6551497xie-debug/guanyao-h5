import type {
  RealityProductionPressureHostInput,
  RealityProductionPressureHostInputBlockedReason,
  RealityProductionPressureHostInputContractBoundary,
  RealityProductionPressureHostInputContractInput,
  RealityProductionPressureHostInputContractResult,
} from "../types/realityProductionPressureHostInputContract";
import type { RealityRouteDeliveryOrchestrationBridgeResult } from "../types/realityRouteDeliveryOrchestrationBridge";
import { REALITY_ROUTE_DELIVERY_ORCHESTRATION_BRIDGE_BOUNDARY } from "./realityRouteDeliveryOrchestrationBridge";

export const REALITY_PRODUCTION_PRESSURE_HOST_INPUT_CONTRACT_BOUNDARY:
  RealityProductionPressureHostInputContractBoundary = Object.freeze({
    productionPressureHostInputOnly: true,
    authorizedRealityRouteOnly: true,
    readyRouteDeliveryOnly: true,
    immutableInputOnly: true,
    sourceReferenceContinuityRequired: true,
    deliveryReferenceTraceabilityRequired: true,
    consumerInputForwardingOnly: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noReferenceOnlySource: true,
    noSourceFallback: true,
    noEngineInvocation: true,
    noSourceRecalculation: true,
    noCandidateSelection: true,
    noCaptureExecution: true,
    noPressureSeedConsumerInvocation: true,
    noGravityIntegration: true,
    noUiMutation: true,
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
  reason: RealityProductionPressureHostInputBlockedReason,
): RealityProductionPressureHostInputContractResult => Object.freeze({
  status,
  input: null,
  reason,
  boundary: REALITY_PRODUCTION_PRESSURE_HOST_INPUT_CONTRACT_BOUNDARY,
});

const isReadyRouteDelivery = (
  result: RealityRouteDeliveryOrchestrationBridgeResult,
): boolean =>
  result.status === "READY" &&
  result.operation === "INITIALIZE" &&
  Object.isFrozen(result) &&
  Object.isFrozen(result.deliverySession) &&
  Object.isFrozen(result.candidateSourceContext) &&
  Object.isFrozen(result.consumerInput) &&
  Object.isFrozen(result.provenance) &&
  result.sourceReferenceId.trim().length > 0 &&
  result.routeActivationContextReferenceId.trim().length > 0 &&
  result.candidateActivationContextReferenceId.trim().length > 0 &&
  result.deliverySession.sourceReferenceId === result.sourceReferenceId &&
  result.candidateSourceContext.sourceReferenceId === result.sourceReferenceId &&
  result.consumerInput.candidateSourceContext === result.candidateSourceContext &&
  result.provenance.sourceReferenceId === result.sourceReferenceId &&
  result.provenance.noCandidateSelection === true &&
  result.provenance.consumerNotExecuted === true &&
  result.boundary === REALITY_ROUTE_DELIVERY_ORCHESTRATION_BRIDGE_BOUNDARY;

export function resolveRealityProductionPressureHostInput(
  contractInput: RealityProductionPressureHostInputContractInput,
): RealityProductionPressureHostInputContractResult {
  const authorization = contractInput?.routeAuthorization;
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
      "REALITY_ROUTE_AUTHORIZATION_REQUIRED",
    );
  }
  const deliveryResult = contractInput.routeDeliveryResult;
  if (!deliveryResult || deliveryResult.status !== "READY") {
    return unavailable("SOURCE_NOT_READY", "ROUTE_DELIVERY_NOT_READY");
  }
  if (!isReadyRouteDelivery(deliveryResult)) {
    return unavailable("BLOCKED", "ROUTE_DELIVERY_INVALID");
  }
  const sourceReferenceId = deliveryResult.sourceReferenceId;
  if (hasForbiddenSourceReference(sourceReferenceId)) {
    return unavailable("BLOCKED", "FORBIDDEN_SOURCE_REFERENCE");
  }
  if (
    authorization.sourceReferenceId !== sourceReferenceId ||
    deliveryResult.consumerInput.routeAuthorization.sourceReferenceId !==
      sourceReferenceId
  ) {
    return unavailable("BLOCKED", "SOURCE_REFERENCE_MISMATCH");
  }

  const input: RealityProductionPressureHostInput = Object.freeze({
    schemaVersion: "GUANYAO_REALITY_PRODUCTION_PRESSURE_HOST_INPUT_V1" as const,
    source: "reality_production_pressure_host_input_contract" as const,
    sourceExperienceMode: "REAL_USER_EXPERIENCE" as const,
    sourceProvenance: "REAL_USER_SESSION" as const,
    sourceReferenceId,
    routeActivationContextReferenceId:
      deliveryResult.routeActivationContextReferenceId,
    candidateActivationContextReferenceId:
      deliveryResult.candidateActivationContextReferenceId,
    deliverySession: deliveryResult.deliverySession,
    consumerInput: deliveryResult.consumerInput,
    provenance: Object.freeze({
      routeDeliverySource:
        "REALITY_ROUTE_DELIVERY_ORCHESTRATION_BRIDGE" as const,
      consumerInputSource:
        "REALITY_PRODUCTION_PRESSURE_SEED_CONSUMER_INITIALIZE_INPUT" as const,
      sourceReferenceId,
      consumerNotExecuted: true as const,
    }),
    boundary: REALITY_PRODUCTION_PRESSURE_HOST_INPUT_CONTRACT_BOUNDARY,
  });

  return Object.freeze({
    status: "READY" as const,
    input,
    reason: null,
    boundary: REALITY_PRODUCTION_PRESSURE_HOST_INPUT_CONTRACT_BOUNDARY,
  });
}

export function isRealityProductionPressureHostInputReady(
  input: RealityProductionPressureHostInput,
  sourceReferenceId: string,
): boolean {
  return Boolean(
    input &&
      Object.isFrozen(input) &&
      Object.isFrozen(input.deliverySession) &&
      Object.isFrozen(input.consumerInput) &&
      Object.isFrozen(input.provenance) &&
      input.schemaVersion ===
        "GUANYAO_REALITY_PRODUCTION_PRESSURE_HOST_INPUT_V1" &&
      input.source === "reality_production_pressure_host_input_contract" &&
      input.sourceExperienceMode === "REAL_USER_EXPERIENCE" &&
      input.sourceProvenance === "REAL_USER_SESSION" &&
      input.sourceReferenceId === sourceReferenceId &&
      input.deliverySession.sourceReferenceId === sourceReferenceId &&
      input.consumerInput.routeAuthorization.sourceReferenceId ===
        sourceReferenceId &&
      input.consumerInput.candidateSourceContext.sourceReferenceId ===
        sourceReferenceId &&
      input.provenance.sourceReferenceId === sourceReferenceId &&
      input.provenance.consumerNotExecuted === true &&
      input.boundary ===
        REALITY_PRODUCTION_PRESSURE_HOST_INPUT_CONTRACT_BOUNDARY,
  );
}

export const RealityProductionPressureHostInputContractService = Object.freeze({
  resolve: resolveRealityProductionPressureHostInput,
  validate: isRealityProductionPressureHostInputReady,
  boundary: REALITY_PRODUCTION_PRESSURE_HOST_INPUT_CONTRACT_BOUNDARY,
});
