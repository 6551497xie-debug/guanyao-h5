import type { ProductionIdentitySourceAdapterImplementationAuthorizationAuthorized } from "../types/productionIdentitySourceAdapterImplementationAuthorization";
import type { ProductionIdentitySourceAdapterBridgeImplementationContractReady } from "../types/productionIdentitySourceAdapterBridgeImplementationContract";
import type {
  ProductionIdentitySourceNormalizedReferenceAdapterBlockedReason,
  ProductionIdentitySourceNormalizedReferenceAdapterBoundary,
  ProductionIdentitySourceNormalizedReferenceAdapterInput,
  ProductionIdentitySourceNormalizedReferenceAdapterResult,
  ProductionIdentitySourceNormalizedReferenceAdapterUnavailableReason,
} from "../types/productionIdentitySourceNormalizedReferenceAdapter";

const ADAPTER_BOUNDARY: ProductionIdentitySourceNormalizedReferenceAdapterBoundary =
  Object.freeze({
    adapterOnly: true,
    isolatedImplementationOnly: true,
    referenceOnly: true,
    noEngineInvocation: true,
    noUserInputBinding: true,
    noProductIntegration: true,
    noRendererInvocation: true,
    noStorageWrite: true,
    noIdentityRecalculation: true,
    noLifeStateMutation: true,
  });

const unavailable = (
  input: ProductionIdentitySourceNormalizedReferenceAdapterInput,
  reason: ProductionIdentitySourceNormalizedReferenceAdapterUnavailableReason,
): ProductionIdentitySourceNormalizedReferenceAdapterResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    adapterStatus: "UNAVAILABLE" as const,
    source: "production_identity_source_normalized_reference_adapter" as const,
    reason,
    input,
    adapterReference: null,
    boundary: ADAPTER_BOUNDARY,
  });

const blocked = (
  input: ProductionIdentitySourceNormalizedReferenceAdapterInput,
  reason: ProductionIdentitySourceNormalizedReferenceAdapterBlockedReason,
): ProductionIdentitySourceNormalizedReferenceAdapterResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    adapterStatus: "BLOCKED" as const,
    source: "production_identity_source_normalized_reference_adapter" as const,
    reason,
    input,
    adapterReference: null,
    boundary: ADAPTER_BOUNDARY,
  });

function isAuthorized(
  result: ProductionIdentitySourceNormalizedReferenceAdapterInput["authorizationResult"],
): result is ProductionIdentitySourceAdapterImplementationAuthorizationAuthorized {
  if (result === null || result.status !== "AUTHORIZED") return false;
  const reference = result.authorizationReference;
  return (
    result.authorization === "AUTHORIZED_FOR_ISOLATED_ADAPTER_IMPLEMENTATION" &&
    result.source === "production_identity_source_adapter_implementation_authorization" &&
    result.boundary.authorizationReviewOnly === true &&
    result.boundary.isolatedImplementationOnly === true &&
    result.boundary.referenceOnly === true &&
    result.boundary.noAdapterInvocation === true &&
    result.boundary.noEngineInvocation === true &&
    result.boundary.noUserInputBinding === true &&
    result.boundary.noProductIntegration === true &&
    result.boundary.noRendererInvocation === true &&
    result.boundary.noStorageWrite === true &&
    result.boundary.noIdentityRecalculation === true &&
    result.boundary.noLifeStateMutation === true &&
    reference.implementationAuthorization === "AUTHORIZED_FOR_ISOLATED_ADAPTER_IMPLEMENTATION" &&
    reference.authorizationScope === "ISOLATED_FORMAL_IDENTITY_SOURCE_ADAPTER_IMPLEMENTATION_ONLY" &&
    reference.userBindingAuthorization === false &&
    reference.productIntegrationAuthorization === false &&
    reference.adapterInvocation === "NOT_PERFORMED" &&
    reference.engineInvocation === "NOT_PERFORMED" &&
    reference.referenceOnly === true
  );
}

function isReadyContract(
  result: ProductionIdentitySourceNormalizedReferenceAdapterInput["contractResult"],
): result is ProductionIdentitySourceAdapterBridgeImplementationContractReady {
  if (result === null || result.status !== "READY") return false;
  const reference = result.contractReference;
  return (
    result.contractStatus === "FORMAL_IDENTITY_SOURCE_ADAPTER_INPUT_CONSUMPTION_CONTRACT_READY" &&
    result.source === "production_identity_source_adapter_bridge_implementation_contract" &&
    result.boundary.contractOnly === true &&
    result.boundary.referenceOnly === true &&
    result.boundary.noAdapterInvocation === true &&
    result.boundary.noEngineInvocation === true &&
    result.boundary.noUserInputBinding === true &&
    result.boundary.noProductIntegration === true &&
    result.boundary.noRendererInvocation === true &&
    result.boundary.noStorageWrite === true &&
    result.boundary.noIdentityRecalculation === true &&
    result.boundary.noLifeStateMutation === true &&
    reference.inputShape === "NORMALIZED_LUNAR_DATE_HOUR_BRANCH_WITH_LOCATION_CONTEXT_REFERENCE" &&
    reference.sourceMapping.lunarBirthDate === "NORMALIZED_REFERENCE_LUNAR_BIRTH_DATE" &&
    reference.sourceMapping.hourBranch === "NORMALIZED_REFERENCE_HOUR_BRANCH" &&
    reference.sourceMapping.hourBranchOrdinal === "NORMALIZED_REFERENCE_HOUR_BRANCH_ORDINAL" &&
    reference.sourceMapping.locationContext === "NORMALIZED_REFERENCE_LOCATION_CONTEXT_ONLY" &&
    reference.contractOnly === true &&
    reference.referenceOnly === true &&
    reference.adapterInvocation === "NOT_PERFORMED" &&
    reference.engineInvocation === "NOT_PERFORMED"
  );
}

export function adaptProductionIdentitySourceNormalizedReference(
  input: ProductionIdentitySourceNormalizedReferenceAdapterInput,
): ProductionIdentitySourceNormalizedReferenceAdapterResult {
  const authorization = input.authorizationResult;
  if (authorization === null) return unavailable(input, "AUTHORIZATION_RESULT_REQUIRED");
  if (authorization.status === "UNAVAILABLE") {
    return unavailable(input, "AUTHORIZATION_RESULT_UNAVAILABLE");
  }
  if (authorization.status === "BLOCKED") {
    return blocked(input, "AUTHORIZATION_RESULT_BLOCKED");
  }
  if (!isAuthorized(authorization)) {
    return blocked(input, "AUTHORIZATION_BOUNDARY_INVALID");
  }

  const contract = input.contractResult;
  if (contract === null) return unavailable(input, "CONTRACT_RESULT_REQUIRED");
  if (contract.status === "UNAVAILABLE") {
    return unavailable(input, "CONTRACT_RESULT_UNAVAILABLE");
  }
  if (contract.status === "BLOCKED") {
    return blocked(input, "CONTRACT_RESULT_BLOCKED");
  }
  if (!isReadyContract(contract)) {
    return blocked(input, "CONTRACT_BOUNDARY_INVALID");
  }
  if (authorization.authorizationReference.contractReference !== contract.contractReference) {
    return blocked(input, "AUTHORIZATION_CONTRACT_REFERENCE_MISMATCH");
  }

  return Object.freeze({
    status: "AVAILABLE" as const,
    adapterStatus: "ISOLATED_FORMAL_IDENTITY_SOURCE_ADAPTER_AVAILABLE" as const,
    source: "production_identity_source_normalized_reference_adapter" as const,
    input,
    adapterReference: Object.freeze({
      referenceType: "ISOLATED_FORMAL_IDENTITY_SOURCE_ADAPTER_OUTPUT" as const,
      referenceId: `isolated-formal-identity-source-adapter:${contract.contractReference.referenceId}`,
      sourceContractReference: contract.contractReference,
      normalizedReference: contract.contractReference.readinessReference.sourceBridgeReviewReference.normalizedReference,
      adapterScope: "ISOLATED_FORMAL_IDENTITY_SOURCE_ADAPTER_ONLY" as const,
      outputRole: "FORMAL_IDENTITY_SOURCE_ENGINE_INPUT_REFERENCE" as const,
      referenceOnly: true as const,
      noEngineInvocation: true as const,
      noUserInputBinding: true as const,
      noProductIntegration: true as const,
      noRendererInvocation: true as const,
      noStorageWrite: true as const,
      noIdentityRecalculation: true as const,
      noLifeStateMutation: true as const,
    }),
    boundary: ADAPTER_BOUNDARY,
  });
}
