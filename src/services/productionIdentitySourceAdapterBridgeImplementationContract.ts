import type { ProductionIdentitySourceAdapterBridgeImplementationReadinessReady } from "../types/productionIdentitySourceAdapterBridgeImplementationReadiness";
import type {
  ProductionIdentitySourceAdapterBridgeImplementationContractBlockedReason,
  ProductionIdentitySourceAdapterBridgeImplementationContractBoundary,
  ProductionIdentitySourceAdapterBridgeImplementationContractInput,
  ProductionIdentitySourceAdapterBridgeImplementationContractResult,
  ProductionIdentitySourceAdapterBridgeImplementationContractUnavailableReason,
} from "../types/productionIdentitySourceAdapterBridgeImplementationContract";

const CONTRACT_BOUNDARY: ProductionIdentitySourceAdapterBridgeImplementationContractBoundary =
  Object.freeze({
    contractOnly: true,
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
  input: ProductionIdentitySourceAdapterBridgeImplementationContractInput,
  reason: ProductionIdentitySourceAdapterBridgeImplementationContractUnavailableReason,
): ProductionIdentitySourceAdapterBridgeImplementationContractResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    contractStatus: "UNAVAILABLE" as const,
    source: "production_identity_source_adapter_bridge_implementation_contract" as const,
    reason,
    input,
    contractReference: null,
    boundary: CONTRACT_BOUNDARY,
  });

const blocked = (
  input: ProductionIdentitySourceAdapterBridgeImplementationContractInput,
  reason: ProductionIdentitySourceAdapterBridgeImplementationContractBlockedReason,
): ProductionIdentitySourceAdapterBridgeImplementationContractResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    contractStatus: "BLOCKED" as const,
    source: "production_identity_source_adapter_bridge_implementation_contract" as const,
    reason,
    input,
    contractReference: null,
    boundary: CONTRACT_BOUNDARY,
  });

function isReadyReadiness(
  result: ProductionIdentitySourceAdapterBridgeImplementationContractInput["readinessResult"],
): result is ProductionIdentitySourceAdapterBridgeImplementationReadinessReady {
  if (result === null || result.status !== "READY") return false;
  const implementation = result.implementationReference;
  const bridge = implementation.sourceBridgeReviewReference;
  return (
    result.readiness === "READY_FOR_FORMAL_IDENTITY_SOURCE_ADAPTER_BRIDGE_IMPLEMENTATION" &&
    result.source === "production_identity_source_adapter_bridge_implementation_readiness" &&
    result.boundary.implementationReadinessOnly === true &&
    result.boundary.referenceOnly === true &&
    result.boundary.noAdapterInvocation === true &&
    result.boundary.noEngineInvocation === true &&
    result.boundary.noUserInputBinding === true &&
    result.boundary.noProductIntegration === true &&
    result.boundary.noRendererInvocation === true &&
    result.boundary.noStorageWrite === true &&
    result.boundary.noIdentityRecalculation === true &&
    result.boundary.noLifeStateMutation === true &&
    implementation.referenceType === "FORMAL_IDENTITY_SOURCE_ADAPTER_BRIDGE_IMPLEMENTATION_READINESS" &&
    implementation.implementationScope === "FUTURE_ADAPTER_IMPLEMENTATION_ONLY" &&
    implementation.implementationAuthorized === false &&
    implementation.adapterInvocation === "NOT_PERFORMED" &&
    implementation.engineInvocation === "NOT_PERFORMED" &&
    implementation.referenceOnly === true &&
    bridge.referenceType === "FORMAL_IDENTITY_SOURCE_ADAPTER_BRIDGE_REVIEW" &&
    bridge.bridgeScope === "FUTURE_FORMAL_IDENTITY_SOURCE_ADAPTER_INPUT_ONLY" &&
    bridge.referenceOnly === true
  );
}

export function reviewProductionIdentitySourceAdapterBridgeImplementationContract(
  input: ProductionIdentitySourceAdapterBridgeImplementationContractInput,
): ProductionIdentitySourceAdapterBridgeImplementationContractResult {
  const readiness = input.readinessResult;
  if (readiness === null) return unavailable(input, "READINESS_RESULT_REQUIRED");
  if (readiness.status === "UNAVAILABLE") {
    return unavailable(input, "READINESS_RESULT_UNAVAILABLE");
  }
  if (readiness.status === "BLOCKED") {
    return blocked(input, "READINESS_RESULT_BLOCKED");
  }
  if (!isReadyReadiness(readiness)) {
    return blocked(input, "READINESS_BOUNDARY_INVALID");
  }

  return Object.freeze({
    status: "READY" as const,
    contractStatus: "FORMAL_IDENTITY_SOURCE_ADAPTER_INPUT_CONSUMPTION_CONTRACT_READY" as const,
    source: "production_identity_source_adapter_bridge_implementation_contract" as const,
    input,
    contractReference: Object.freeze({
      referenceType: "FORMAL_IDENTITY_SOURCE_ADAPTER_INPUT_CONSUMPTION_CONTRACT" as const,
      referenceId: `formal-identity-source-adapter-input-contract:${readiness.implementationReference.referenceId}`,
      readinessReference: readiness.implementationReference,
      inputShape: "NORMALIZED_LUNAR_DATE_HOUR_BRANCH_WITH_LOCATION_CONTEXT_REFERENCE" as const,
      sourceMapping: Object.freeze({
        lunarBirthDate: "NORMALIZED_REFERENCE_LUNAR_BIRTH_DATE" as const,
        hourBranch: "NORMALIZED_REFERENCE_HOUR_BRANCH" as const,
        hourBranchOrdinal: "NORMALIZED_REFERENCE_HOUR_BRANCH_ORDINAL" as const,
        locationContext: "NORMALIZED_REFERENCE_LOCATION_CONTEXT_ONLY" as const,
      }),
      contractOnly: true as const,
      referenceOnly: true as const,
      adapterInvocation: "NOT_PERFORMED" as const,
      engineInvocation: "NOT_PERFORMED" as const,
      noUserInputBinding: true as const,
      noProductIntegration: true as const,
      noRendererInvocation: true as const,
      noStorageWrite: true as const,
      noIdentityRecalculation: true as const,
      noLifeStateMutation: true as const,
    }),
    boundary: CONTRACT_BOUNDARY,
  });
}
