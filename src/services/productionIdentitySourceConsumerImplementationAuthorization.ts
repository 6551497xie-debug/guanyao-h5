import type {
  ProductionIdentitySourceConsumerImplementationAuthorizationBlockedReason,
  ProductionIdentitySourceConsumerImplementationAuthorizationBoundary,
  ProductionIdentitySourceConsumerImplementationAuthorizationInput,
  ProductionIdentitySourceConsumerImplementationAuthorizationResult,
  ProductionIdentitySourceConsumerImplementationAuthorizationUnavailableReason,
} from "../types/productionIdentitySourceConsumerImplementationAuthorization";

const AUTHORIZATION_BOUNDARY: ProductionIdentitySourceConsumerImplementationAuthorizationBoundary =
  Object.freeze({
    authorizationOnly: true,
    referenceOnly: true,
    noConsumerCreation: true,
    noRealUserBinding: true,
    noUiIntegration: true,
    noProductRuntimeIntegration: true,
    noRendererIntegration: true,
    noStorageWrite: true,
    noSourceMutation: true,
  });

const unavailable = (
  input: ProductionIdentitySourceConsumerImplementationAuthorizationInput,
  reason: ProductionIdentitySourceConsumerImplementationAuthorizationUnavailableReason,
): ProductionIdentitySourceConsumerImplementationAuthorizationResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    authorizationStatus: "UNAVAILABLE" as const,
    source:
      "production_identity_source_consumer_implementation_authorization" as const,
    reason,
    input,
    authorizationReference: null,
    boundary: AUTHORIZATION_BOUNDARY,
  });

const blocked = (
  input: ProductionIdentitySourceConsumerImplementationAuthorizationInput,
  reason: ProductionIdentitySourceConsumerImplementationAuthorizationBlockedReason,
): ProductionIdentitySourceConsumerImplementationAuthorizationResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    authorizationStatus: "BLOCKED" as const,
    source:
      "production_identity_source_consumer_implementation_authorization" as const,
    reason,
    input,
    authorizationReference: null,
    boundary: AUTHORIZATION_BOUNDARY,
  });

export function reviewProductionIdentitySourceConsumerImplementationAuthorization(
  input: ProductionIdentitySourceConsumerImplementationAuthorizationInput,
): ProductionIdentitySourceConsumerImplementationAuthorizationResult {
  const contract = input.contractResult;
  if (contract === null) {
    return unavailable(input, "CONTRACT_RESULT_REQUIRED");
  }
  if (contract.status === "UNAVAILABLE") {
    return unavailable(input, "CONTRACT_RESULT_UNAVAILABLE");
  }
  if (contract.status === "BLOCKED") {
    return blocked(input, "CONTRACT_RESULT_BLOCKED");
  }

  if (
    contract.status !== "READY" ||
    contract.contractStatus !==
      "FORMAL_IDENTITY_SOURCE_CONSUMER_CONTRACT_READY" ||
    contract.source !== "production_identity_source_consumer_contract" ||
    contract.boundary.contractOnly !== true ||
    contract.boundary.referenceOnly !== true ||
    contract.boundary.noConsumerCreation !== true ||
    contract.boundary.noUserInputBinding !== true ||
    contract.boundary.noProductIntegration !== true ||
    contract.boundary.noSourceMutation !== true ||
    contract.boundary.noSceneModelCreation !== true ||
    contract.boundary.noRendererInvocation !== true ||
    contract.boundary.noLifeStateMutation !== true ||
    contract.boundary.noStorageWrite !== true
  ) {
    return blocked(input, "CONTRACT_BOUNDARY_INVALID");
  }

  const contractReference = contract.contractReference;
  if (
    contractReference.referenceType !==
      "FORMAL_IDENTITY_SOURCE_CONSUMER_CONTRACT" ||
    contractReference.contractVersion !== "V1" ||
    contractReference.consumerScope !==
      "FUTURE_FORMAL_IDENTITY_CONSUMER_ONLY" ||
    contractReference.inputContract.acceptedReferenceType !==
      "FORMAL_IDENTITY_SOURCE_CONSUMER_READINESS" ||
    contractReference.inputContract.requiredReadiness !==
      "READY_FOR_FORMAL_IDENTITY_SOURCE_CONSUMER_REVIEW" ||
    contractReference.inputContract.sourceReferenceOnly !== true ||
    contractReference.inputContract.noUserInputBinding !== true ||
    contractReference.inputContract.noProductIntegration !== true ||
    contractReference.outputContract.outputReferenceType !==
      "FORMAL_IDENTITY_SOURCE_CONSUMPTION_REFERENCE" ||
    contractReference.outputContract.futureConsumerOnly !== true ||
    contractReference.outputContract.referenceOnly !== true ||
    contractReference.outputContract.noIdentityRecalculation !== true ||
    contractReference.outputContract.noSourceMutation !== true ||
    contractReference.outputContract.noSceneModelCreation !== true ||
    contractReference.outputContract.noRendererInvocation !== true ||
    contractReference.outputContract.noStorageWrite !== true ||
    contractReference.contractOnly !== true ||
    contractReference.referenceOnly !== true ||
    contractReference.noConsumerCreation !== true ||
    contractReference.noUserInputBinding !== true ||
    contractReference.noProductIntegration !== true ||
    contractReference.noSourceMutation !== true ||
    contractReference.noSceneModelCreation !== true ||
    contractReference.noRendererInvocation !== true ||
    contractReference.noLifeStateMutation !== true ||
    contractReference.noStorageWrite !== true
  ) {
    return blocked(input, "AUTHORIZATION_REFERENCE_INVALID");
  }

  return Object.freeze({
    status: "AUTHORIZED" as const,
    authorizationStatus:
      "AUTHORIZED_FOR_FORMAL_IDENTITY_SOURCE_CONSUMER_IMPLEMENTATION_REVIEW" as const,
    source:
      "production_identity_source_consumer_implementation_authorization" as const,
    input,
    authorizationReference: Object.freeze({
      referenceType:
        "FORMAL_IDENTITY_SOURCE_CONSUMER_IMPLEMENTATION_AUTHORIZATION" as const,
      referenceId: `formal-identity-source-consumer-authorization:${contractReference.referenceId}`,
      authorizationScope:
        "FUTURE_FORMAL_IDENTITY_SOURCE_CONSUMER_IMPLEMENTATION_ONLY" as const,
      contractReference,
      productConsumptionQualified: true as const,
      authorizationOnly: true as const,
      referenceOnly: true as const,
      noConsumerCreation: true as const,
      noRealUserBinding: true as const,
      noUiIntegration: true as const,
      noProductRuntimeIntegration: true as const,
      noRendererIntegration: true as const,
      noStorageWrite: true as const,
      noSourceMutation: true as const,
    }),
    boundary: AUTHORIZATION_BOUNDARY,
  });
}
