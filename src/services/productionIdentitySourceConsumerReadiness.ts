import type {
  ProductionIdentitySourceConsumerReadinessBlockedReason,
  ProductionIdentitySourceConsumerReadinessBoundary,
  ProductionIdentitySourceConsumerReadinessInput,
  ProductionIdentitySourceConsumerReadinessResult,
  ProductionIdentitySourceConsumerReadinessUnavailableReason,
} from "../types/productionIdentitySourceConsumerReadiness";

const READINESS_BOUNDARY: ProductionIdentitySourceConsumerReadinessBoundary =
  Object.freeze({
    readinessOnly: true,
    referenceOnly: true,
    noConsumerCreation: true,
    noUserInputBinding: true,
    noProductIntegration: true,
    noSceneModelCreation: true,
    noRendererInvocation: true,
    noLifeStateMutation: true,
    noStorageWrite: true,
  });

const unavailable = (
  input: ProductionIdentitySourceConsumerReadinessInput,
  reason: ProductionIdentitySourceConsumerReadinessUnavailableReason,
): ProductionIdentitySourceConsumerReadinessResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    readiness: "UNAVAILABLE" as const,
    source: "production_identity_source_consumer_readiness" as const,
    reason,
    input,
    consumerReadinessReference: null,
    boundary: READINESS_BOUNDARY,
  });

const blocked = (
  input: ProductionIdentitySourceConsumerReadinessInput,
  reason: ProductionIdentitySourceConsumerReadinessBlockedReason,
): ProductionIdentitySourceConsumerReadinessResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    readiness: "BLOCKED" as const,
    source: "production_identity_source_consumer_readiness" as const,
    reason,
    input,
    consumerReadinessReference: null,
    boundary: READINESS_BOUNDARY,
  });

export function resolveProductionIdentitySourceConsumerReadiness(
  input: ProductionIdentitySourceConsumerReadinessInput,
): ProductionIdentitySourceConsumerReadinessResult {
  const adapterResult = input.adapterResult;
  if (adapterResult === null) {
    return unavailable(input, "ADAPTER_RESULT_REQUIRED");
  }
  if (adapterResult.status === "UNAVAILABLE") {
    return unavailable(input, "ADAPTER_RESULT_UNAVAILABLE");
  }
  if (adapterResult.status === "BLOCKED") {
    return blocked(input, "ADAPTER_RESULT_BLOCKED");
  }

  if (
    adapterResult.status !== "AVAILABLE" ||
    adapterResult.adapterStatus !== "FORMAL_IDENTITY_SOURCE_ADAPTER_READY" ||
    adapterResult.source !== "production_identity_source_adapter" ||
    adapterResult.boundary.adapterOnly !== true ||
    adapterResult.boundary.referenceOnly !== true ||
    adapterResult.boundary.noIdentityRecalculation !== true ||
    adapterResult.boundary.noUserInputBinding !== true ||
    adapterResult.boundary.noProductIntegration !== true ||
    adapterResult.boundary.noSceneModelCreation !== true ||
    adapterResult.boundary.noRendererInvocation !== true ||
    adapterResult.boundary.noLifeStateMutation !== true ||
    adapterResult.boundary.noStorageWrite !== true
  ) {
    return blocked(input, "ADAPTER_BOUNDARY_INVALID");
  }

  const adapterReference = adapterResult.adapterReference;
  if (
    adapterReference.referenceType !== "FORMAL_IDENTITY_SOURCE_ADAPTER_ENTRY" ||
    adapterReference.sourceRole !== "FORMAL_LIFE_IDENTITY_SOURCE" ||
    adapterReference.adapterOnly !== true ||
    adapterReference.referenceOnly !== true ||
    adapterReference.noIdentityRecalculation !== true ||
    adapterReference.noUserInputBinding !== true ||
    adapterReference.noProductIntegration !== true ||
    adapterReference.noSceneModelCreation !== true ||
    adapterReference.noRendererInvocation !== true ||
    adapterReference.noLifeStateMutation !== true ||
    adapterReference.noStorageWrite !== true
  ) {
    return blocked(input, "FORMAL_REFERENCE_INVALID");
  }

  if (
    adapterReference.identitySourceEntryReference.sourceTrajectoryReference !==
    adapterReference.sourceReadinessReference.input.sourceTrajectoryReference
  ) {
    return blocked(input, "FORMAL_REFERENCE_DRIFT");
  }

  return Object.freeze({
    status: "READY" as const,
    readiness: "READY_FOR_FORMAL_IDENTITY_SOURCE_CONSUMER_REVIEW" as const,
    source: "production_identity_source_consumer_readiness" as const,
    input,
    consumerReadinessReference: Object.freeze({
      referenceType: "FORMAL_IDENTITY_SOURCE_CONSUMER_READINESS" as const,
      referenceId: `formal-identity-source-consumer:${adapterReference.referenceId}`,
      consumerScope: "FUTURE_FORMAL_IDENTITY_CONSUMER_ONLY" as const,
      adapterReference,
      readinessOnly: true as const,
      referenceOnly: true as const,
      noConsumerCreation: true as const,
      noUserInputBinding: true as const,
      noProductIntegration: true as const,
      noSceneModelCreation: true as const,
      noRendererInvocation: true as const,
      noLifeStateMutation: true as const,
      noStorageWrite: true as const,
    }),
    boundary: READINESS_BOUNDARY,
  });
}
