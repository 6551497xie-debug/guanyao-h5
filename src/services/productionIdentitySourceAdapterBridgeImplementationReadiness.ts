import type { ProductionIdentitySourceNormalizedReferenceBridgeReady } from "../types/productionIdentitySourceNormalizedReferenceBridge";
import type {
  ProductionIdentitySourceAdapterBridgeImplementationReadinessBlockedReason,
  ProductionIdentitySourceAdapterBridgeImplementationReadinessBoundary,
  ProductionIdentitySourceAdapterBridgeImplementationReadinessInput,
  ProductionIdentitySourceAdapterBridgeImplementationReadinessResult,
  ProductionIdentitySourceAdapterBridgeImplementationReadinessUnavailableReason,
} from "../types/productionIdentitySourceAdapterBridgeImplementationReadiness";

const READINESS_BOUNDARY: ProductionIdentitySourceAdapterBridgeImplementationReadinessBoundary =
  Object.freeze({
    implementationReadinessOnly: true,
    referenceOnly: true,
    noAdapterInvocation: true,
    noEngineInvocation: true,
    noUserInputBinding: true,
    noProductIntegration: true,
    noRendererInvocation: true,
    noStorageWrite: true,
    noIdentityRecalculation: true,
    noLifeStateMutation: true,
  });

const unavailable = (
  input: ProductionIdentitySourceAdapterBridgeImplementationReadinessInput,
  reason: ProductionIdentitySourceAdapterBridgeImplementationReadinessUnavailableReason,
): ProductionIdentitySourceAdapterBridgeImplementationReadinessResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    readiness: "UNAVAILABLE" as const,
    source: "production_identity_source_adapter_bridge_implementation_readiness" as const,
    reason,
    input,
    implementationReference: null,
    boundary: READINESS_BOUNDARY,
  });

const blocked = (
  input: ProductionIdentitySourceAdapterBridgeImplementationReadinessInput,
  reason: ProductionIdentitySourceAdapterBridgeImplementationReadinessBlockedReason,
): ProductionIdentitySourceAdapterBridgeImplementationReadinessResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    readiness: "BLOCKED" as const,
    source: "production_identity_source_adapter_bridge_implementation_readiness" as const,
    reason,
    input,
    implementationReference: null,
    boundary: READINESS_BOUNDARY,
  });

function isReadyBridge(
  result: ProductionIdentitySourceAdapterBridgeImplementationReadinessInput["bridgeReviewResult"],
): result is ProductionIdentitySourceNormalizedReferenceBridgeReady {
  if (result === null || result.status !== "READY") return false;
  const reference = result.bridgeReference;
  const normalized = reference.normalizedReference;
  const expectation = reference.downstreamExpectation;
  return (
    result.bridgeStatus === "READY_FOR_FORMAL_IDENTITY_SOURCE_ADAPTER_BRIDGE_REVIEW" &&
    result.source === "production_identity_source_normalized_reference_bridge" &&
    result.boundary.bridgeOnly === true &&
    result.boundary.referenceOnly === true &&
    result.boundary.noAdapterInvocation === true &&
    result.boundary.noEngineInvocation === true &&
    result.boundary.noUserInputBinding === true &&
    result.boundary.noProductIntegration === true &&
    result.boundary.noRendererInvocation === true &&
    result.boundary.noStorageWrite === true &&
    result.boundary.noIdentityRecalculation === true &&
    result.boundary.noLifeStateMutation === true &&
    reference.referenceType === "FORMAL_IDENTITY_SOURCE_ADAPTER_BRIDGE_REVIEW" &&
    reference.bridgeScope === "FUTURE_FORMAL_IDENTITY_SOURCE_ADAPTER_INPUT_ONLY" &&
    reference.bridgeOnly === true &&
    reference.referenceOnly === true &&
    reference.noAdapterInvocation === true &&
    reference.noEngineInvocation === true &&
    normalized.referenceType === "FORMAL_IDENTITY_SOURCE_NORMALIZATION_REFERENCE" &&
    normalized.normalized === true &&
    normalized.referenceOnly === true &&
    expectation.normalizedDateSource === "LUNAR_BIRTH_DATE_FROM_NORMALIZATION" &&
    expectation.normalizedTimeSource === "HOUR_BRANCH_FROM_NORMALIZATION" &&
    expectation.locationContextSource === "CONTEXT_REFERENCE_ONLY" &&
    expectation.downstreamInputRole === "FORMAL_IDENTITY_SOURCE_ADAPTER_INPUT"
  );
}

export function resolveProductionIdentitySourceAdapterBridgeImplementationReadiness(
  input: ProductionIdentitySourceAdapterBridgeImplementationReadinessInput,
): ProductionIdentitySourceAdapterBridgeImplementationReadinessResult {
  const bridge = input.bridgeReviewResult;
  if (bridge === null) return unavailable(input, "BRIDGE_REVIEW_REQUIRED");
  if (bridge.status === "UNAVAILABLE") {
    return unavailable(input, "BRIDGE_REVIEW_UNAVAILABLE");
  }
  if (bridge.status === "BLOCKED") {
    return blocked(input, "BRIDGE_REVIEW_BLOCKED");
  }
  if (!isReadyBridge(bridge)) {
    return blocked(input, "BRIDGE_REVIEW_BOUNDARY_INVALID");
  }

  return Object.freeze({
    status: "READY" as const,
    readiness: "READY_FOR_FORMAL_IDENTITY_SOURCE_ADAPTER_BRIDGE_IMPLEMENTATION" as const,
    source: "production_identity_source_adapter_bridge_implementation_readiness" as const,
    input,
    implementationReference: Object.freeze({
      referenceType: "FORMAL_IDENTITY_SOURCE_ADAPTER_BRIDGE_IMPLEMENTATION_READINESS" as const,
      referenceId: `formal-identity-source-adapter-bridge-implementation:${bridge.bridgeReference.referenceId}`,
      sourceBridgeReviewReference: bridge.bridgeReference,
      implementationScope: "FUTURE_ADAPTER_IMPLEMENTATION_ONLY" as const,
      implementationAuthorized: false as const,
      adapterInvocation: "NOT_PERFORMED" as const,
      engineInvocation: "NOT_PERFORMED" as const,
      referenceOnly: true as const,
      noUserInputBinding: true as const,
      noProductIntegration: true as const,
      noRendererInvocation: true as const,
      noStorageWrite: true as const,
      noIdentityRecalculation: true as const,
      noLifeStateMutation: true as const,
    }),
    boundary: READINESS_BOUNDARY,
  });
}
