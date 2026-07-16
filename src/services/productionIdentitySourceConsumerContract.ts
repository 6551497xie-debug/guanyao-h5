import type {
  ProductionIdentitySourceConsumerContractBlockedReason,
  ProductionIdentitySourceConsumerContractBoundary,
  ProductionIdentitySourceConsumerContractInput,
  ProductionIdentitySourceConsumerContractResult,
  ProductionIdentitySourceConsumerContractUnavailableReason,
} from "../types/productionIdentitySourceConsumerContract";

const CONTRACT_BOUNDARY: ProductionIdentitySourceConsumerContractBoundary =
  Object.freeze({
    contractOnly: true,
    referenceOnly: true,
    noConsumerCreation: true,
    noUserInputBinding: true,
    noProductIntegration: true,
    noSourceMutation: true,
    noSceneModelCreation: true,
    noRendererInvocation: true,
    noLifeStateMutation: true,
    noStorageWrite: true,
  });

const unavailable = (
  input: ProductionIdentitySourceConsumerContractInput,
  reason: ProductionIdentitySourceConsumerContractUnavailableReason,
): ProductionIdentitySourceConsumerContractResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    contractStatus: "UNAVAILABLE" as const,
    source: "production_identity_source_consumer_contract" as const,
    reason,
    input,
    contractReference: null,
    boundary: CONTRACT_BOUNDARY,
  });

const blocked = (
  input: ProductionIdentitySourceConsumerContractInput,
  reason: ProductionIdentitySourceConsumerContractBlockedReason,
): ProductionIdentitySourceConsumerContractResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    contractStatus: "BLOCKED" as const,
    source: "production_identity_source_consumer_contract" as const,
    reason,
    input,
    contractReference: null,
    boundary: CONTRACT_BOUNDARY,
  });

export function reviewProductionIdentitySourceConsumerContract(
  input: ProductionIdentitySourceConsumerContractInput,
): ProductionIdentitySourceConsumerContractResult {
  const readiness = input.readinessResult;
  if (readiness === null) {
    return unavailable(input, "READINESS_RESULT_REQUIRED");
  }
  if (readiness.status === "UNAVAILABLE") {
    return unavailable(input, "READINESS_RESULT_UNAVAILABLE");
  }
  if (readiness.status === "BLOCKED") {
    return blocked(input, "READINESS_RESULT_BLOCKED");
  }

  if (
    readiness.status !== "READY" ||
    readiness.readiness !== "READY_FOR_FORMAL_IDENTITY_SOURCE_CONSUMER_REVIEW" ||
    readiness.source !== "production_identity_source_consumer_readiness" ||
    readiness.boundary.readinessOnly !== true ||
    readiness.boundary.referenceOnly !== true ||
    readiness.boundary.noConsumerCreation !== true ||
    readiness.boundary.noUserInputBinding !== true ||
    readiness.boundary.noProductIntegration !== true ||
    readiness.boundary.noSceneModelCreation !== true ||
    readiness.boundary.noRendererInvocation !== true ||
    readiness.boundary.noLifeStateMutation !== true ||
    readiness.boundary.noStorageWrite !== true
  ) {
    return blocked(input, "READINESS_BOUNDARY_INVALID");
  }

  const readinessReference = readiness.consumerReadinessReference;
  if (
    readinessReference.referenceType !==
      "FORMAL_IDENTITY_SOURCE_CONSUMER_READINESS" ||
    readinessReference.consumerScope !==
      "FUTURE_FORMAL_IDENTITY_CONSUMER_ONLY" ||
    readinessReference.readinessOnly !== true ||
    readinessReference.referenceOnly !== true ||
    readinessReference.noConsumerCreation !== true ||
    readinessReference.noUserInputBinding !== true ||
    readinessReference.noProductIntegration !== true ||
    readinessReference.noSceneModelCreation !== true ||
    readinessReference.noRendererInvocation !== true ||
    readinessReference.noLifeStateMutation !== true ||
    readinessReference.noStorageWrite !== true
  ) {
    return blocked(input, "CONTRACT_REFERENCE_INVALID");
  }

  return Object.freeze({
    status: "READY" as const,
    contractStatus:
      "FORMAL_IDENTITY_SOURCE_CONSUMER_CONTRACT_READY" as const,
    source: "production_identity_source_consumer_contract" as const,
    input,
    contractReference: Object.freeze({
      referenceType:
        "FORMAL_IDENTITY_SOURCE_CONSUMER_CONTRACT" as const,
      referenceId: `formal-identity-source-consumer-contract:${readinessReference.referenceId}`,
      contractVersion: "V1" as const,
      consumerScope: "FUTURE_FORMAL_IDENTITY_CONSUMER_ONLY" as const,
      readinessReference,
      inputContract: Object.freeze({
        acceptedReferenceType:
          "FORMAL_IDENTITY_SOURCE_CONSUMER_READINESS" as const,
        requiredReadiness:
          "READY_FOR_FORMAL_IDENTITY_SOURCE_CONSUMER_REVIEW" as const,
        sourceReferenceOnly: true as const,
        noUserInputBinding: true as const,
        noProductIntegration: true as const,
      }),
      outputContract: Object.freeze({
        outputReferenceType:
          "FORMAL_IDENTITY_SOURCE_CONSUMPTION_REFERENCE" as const,
        futureConsumerOnly: true as const,
        referenceOnly: true as const,
        noIdentityRecalculation: true as const,
        noSourceMutation: true as const,
        noSceneModelCreation: true as const,
        noRendererInvocation: true as const,
        noStorageWrite: true as const,
      }),
      contractOnly: true as const,
      referenceOnly: true as const,
      noConsumerCreation: true as const,
      noUserInputBinding: true as const,
      noProductIntegration: true as const,
      noSourceMutation: true as const,
      noSceneModelCreation: true as const,
      noRendererInvocation: true as const,
      noLifeStateMutation: true as const,
      noStorageWrite: true as const,
    }),
    boundary: CONTRACT_BOUNDARY,
  });
}
