import type { ProductionIdentitySourceNormalizedReferenceAdapterAvailable } from "../types/productionIdentitySourceNormalizedReferenceAdapter";
import type {
  ProductionIdentitySourceEngineConsumerReadinessBlockedReason,
  ProductionIdentitySourceEngineConsumerReadinessBoundary,
  ProductionIdentitySourceEngineConsumerReadinessInput,
  ProductionIdentitySourceEngineConsumerReadinessResult,
  ProductionIdentitySourceEngineConsumerReadinessUnavailableReason,
} from "../types/productionIdentitySourceEngineConsumerReadiness";

const READINESS_BOUNDARY: ProductionIdentitySourceEngineConsumerReadinessBoundary =
  Object.freeze({
    consumerReadinessOnly: true,
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
  input: ProductionIdentitySourceEngineConsumerReadinessInput,
  reason: ProductionIdentitySourceEngineConsumerReadinessUnavailableReason,
): ProductionIdentitySourceEngineConsumerReadinessResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    readiness: "UNAVAILABLE" as const,
    source: "production_identity_source_engine_consumer_readiness" as const,
    reason,
    input,
    consumerReference: null,
    boundary: READINESS_BOUNDARY,
  });

const blocked = (
  input: ProductionIdentitySourceEngineConsumerReadinessInput,
  reason: ProductionIdentitySourceEngineConsumerReadinessBlockedReason,
): ProductionIdentitySourceEngineConsumerReadinessResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    readiness: "BLOCKED" as const,
    source: "production_identity_source_engine_consumer_readiness" as const,
    reason,
    input,
    consumerReference: null,
    boundary: READINESS_BOUNDARY,
  });

function isAvailableAdapter(
  result: ProductionIdentitySourceEngineConsumerReadinessInput["adapterResult"],
): result is ProductionIdentitySourceNormalizedReferenceAdapterAvailable {
  if (result === null || result.status !== "AVAILABLE") return false;
  const reference = result.adapterReference;
  const normalized = reference.normalizedReference;
  return (
    result.adapterStatus === "ISOLATED_FORMAL_IDENTITY_SOURCE_ADAPTER_AVAILABLE" &&
    result.source === "production_identity_source_normalized_reference_adapter" &&
    result.boundary.adapterOnly === true &&
    result.boundary.isolatedImplementationOnly === true &&
    result.boundary.referenceOnly === true &&
    result.boundary.noEngineInvocation === true &&
    result.boundary.noUserInputBinding === true &&
    result.boundary.noProductIntegration === true &&
    result.boundary.noRendererInvocation === true &&
    result.boundary.noStorageWrite === true &&
    result.boundary.noIdentityRecalculation === true &&
    result.boundary.noLifeStateMutation === true &&
    reference.referenceType === "ISOLATED_FORMAL_IDENTITY_SOURCE_ADAPTER_OUTPUT" &&
    reference.adapterScope === "ISOLATED_FORMAL_IDENTITY_SOURCE_ADAPTER_ONLY" &&
    reference.outputRole === "FORMAL_IDENTITY_SOURCE_ENGINE_INPUT_REFERENCE" &&
    reference.referenceOnly === true &&
    reference.noEngineInvocation === true &&
    reference.noUserInputBinding === true &&
    reference.noProductIntegration === true &&
    normalized.referenceType === "FORMAL_IDENTITY_SOURCE_NORMALIZATION_REFERENCE" &&
    normalized.normalized === true &&
    normalized.referenceOnly === true
  );
}

export function resolveProductionIdentitySourceEngineConsumerReadiness(
  input: ProductionIdentitySourceEngineConsumerReadinessInput,
): ProductionIdentitySourceEngineConsumerReadinessResult {
  const adapter = input.adapterResult;
  if (adapter === null) return unavailable(input, "ADAPTER_RESULT_REQUIRED");
  if (adapter.status === "UNAVAILABLE") {
    return unavailable(input, "ADAPTER_RESULT_UNAVAILABLE");
  }
  if (adapter.status === "BLOCKED") {
    return blocked(input, "ADAPTER_RESULT_BLOCKED");
  }
  if (!isAvailableAdapter(adapter)) {
    return blocked(input, "ADAPTER_BOUNDARY_INVALID");
  }

  return Object.freeze({
    status: "READY" as const,
    readiness: "READY_FOR_FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION" as const,
    source: "production_identity_source_engine_consumer_readiness" as const,
    input,
    consumerReference: Object.freeze({
      referenceType: "FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMER_READINESS" as const,
      referenceId: `formal-identity-source-engine-consumer:${adapter.adapterReference.referenceId}`,
      adapterReference: adapter.adapterReference,
      consumerScope: "FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION_ONLY" as const,
      inputRole: "FORMAL_IDENTITY_SOURCE_ENGINE_INPUT_REFERENCE" as const,
      engineInvocation: "NOT_PERFORMED" as const,
      productionIntegration: false as const,
      userBinding: false as const,
      referenceOnly: true as const,
      noProductIntegration: true as const,
      noRendererInvocation: true as const,
      noStorageWrite: true as const,
      noIdentityRecalculation: true as const,
      noLifeStateMutation: true as const,
    }),
    boundary: READINESS_BOUNDARY,
  });
}
