import type { ProductionIdentitySourceAdapterBridgeImplementationContractReady } from "../types/productionIdentitySourceAdapterBridgeImplementationContract";
import type {
  ProductionIdentitySourceAdapterImplementationAuthorizationBlockedReason,
  ProductionIdentitySourceAdapterImplementationAuthorizationBoundary,
  ProductionIdentitySourceAdapterImplementationAuthorizationInput,
  ProductionIdentitySourceAdapterImplementationAuthorizationResult,
  ProductionIdentitySourceAdapterImplementationAuthorizationUnavailableReason,
} from "../types/productionIdentitySourceAdapterImplementationAuthorization";

const AUTHORIZATION_BOUNDARY: ProductionIdentitySourceAdapterImplementationAuthorizationBoundary =
  Object.freeze({
    authorizationReviewOnly: true,
    isolatedImplementationOnly: true,
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
  input: ProductionIdentitySourceAdapterImplementationAuthorizationInput,
  reason: ProductionIdentitySourceAdapterImplementationAuthorizationUnavailableReason,
): ProductionIdentitySourceAdapterImplementationAuthorizationResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    authorization: "UNAVAILABLE" as const,
    source: "production_identity_source_adapter_implementation_authorization" as const,
    reason,
    input,
    authorizationReference: null,
    boundary: AUTHORIZATION_BOUNDARY,
  });

const blocked = (
  input: ProductionIdentitySourceAdapterImplementationAuthorizationInput,
  reason: ProductionIdentitySourceAdapterImplementationAuthorizationBlockedReason,
): ProductionIdentitySourceAdapterImplementationAuthorizationResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    authorization: "BLOCKED" as const,
    source: "production_identity_source_adapter_implementation_authorization" as const,
    reason,
    input,
    authorizationReference: null,
    boundary: AUTHORIZATION_BOUNDARY,
  });

function isReadyContract(
  result: ProductionIdentitySourceAdapterImplementationAuthorizationInput["contractResult"],
): result is ProductionIdentitySourceAdapterBridgeImplementationContractReady {
  if (result === null || result.status !== "READY") return false;
  const reference = result.contractReference;
  const readiness = reference.readinessReference;
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
    reference.referenceType === "FORMAL_IDENTITY_SOURCE_ADAPTER_INPUT_CONSUMPTION_CONTRACT" &&
    reference.inputShape === "NORMALIZED_LUNAR_DATE_HOUR_BRANCH_WITH_LOCATION_CONTEXT_REFERENCE" &&
    reference.contractOnly === true &&
    reference.referenceOnly === true &&
    reference.adapterInvocation === "NOT_PERFORMED" &&
    reference.engineInvocation === "NOT_PERFORMED" &&
    reference.noUserInputBinding === true &&
    reference.noProductIntegration === true &&
    readiness.referenceType === "FORMAL_IDENTITY_SOURCE_ADAPTER_BRIDGE_IMPLEMENTATION_READINESS" &&
    readiness.implementationAuthorized === false &&
    readiness.adapterInvocation === "NOT_PERFORMED" &&
    readiness.engineInvocation === "NOT_PERFORMED"
  );
}

export function reviewProductionIdentitySourceAdapterImplementationAuthorization(
  input: ProductionIdentitySourceAdapterImplementationAuthorizationInput,
): ProductionIdentitySourceAdapterImplementationAuthorizationResult {
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

  return Object.freeze({
    status: "AUTHORIZED" as const,
    authorization: "AUTHORIZED_FOR_ISOLATED_ADAPTER_IMPLEMENTATION" as const,
    source: "production_identity_source_adapter_implementation_authorization" as const,
    input,
    authorizationReference: Object.freeze({
      referenceType: "FORMAL_IDENTITY_SOURCE_ADAPTER_ISOLATED_IMPLEMENTATION_AUTHORIZATION" as const,
      referenceId: `formal-identity-source-adapter-authorization:${contract.contractReference.referenceId}`,
      contractReference: contract.contractReference,
      authorizationScope: "ISOLATED_FORMAL_IDENTITY_SOURCE_ADAPTER_IMPLEMENTATION_ONLY" as const,
      implementationAuthorization: "AUTHORIZED_FOR_ISOLATED_ADAPTER_IMPLEMENTATION" as const,
      userBindingAuthorization: false as const,
      productIntegrationAuthorization: false as const,
      adapterInvocation: "NOT_PERFORMED" as const,
      engineInvocation: "NOT_PERFORMED" as const,
      referenceOnly: true as const,
      noRendererInvocation: true as const,
      noStorageWrite: true as const,
      noIdentityRecalculation: true as const,
      noLifeStateMutation: true as const,
    }),
    boundary: AUTHORIZATION_BOUNDARY,
  });
}
