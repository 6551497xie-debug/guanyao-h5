import type { ProductionIdentitySourceEngineConsumerReadinessReady } from "../types/productionIdentitySourceEngineConsumerReadiness";
import type {
  ProductionIdentitySourceEngineConsumerContractBlockedReason,
  ProductionIdentitySourceEngineConsumerContractBoundary,
  ProductionIdentitySourceEngineConsumerContractInput,
  ProductionIdentitySourceEngineConsumerContractResult,
  ProductionIdentitySourceEngineConsumerContractUnavailableReason,
} from "../types/productionIdentitySourceEngineConsumerContract";

const CONTRACT_BOUNDARY: ProductionIdentitySourceEngineConsumerContractBoundary =
  Object.freeze({
    contractOnly: true,
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
  input: ProductionIdentitySourceEngineConsumerContractInput,
  reason: ProductionIdentitySourceEngineConsumerContractUnavailableReason,
): ProductionIdentitySourceEngineConsumerContractResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    contractStatus: "UNAVAILABLE" as const,
    source: "production_identity_source_engine_consumer_contract" as const,
    reason,
    input,
    contractReference: null,
    boundary: CONTRACT_BOUNDARY,
  });

const blocked = (
  input: ProductionIdentitySourceEngineConsumerContractInput,
  reason: ProductionIdentitySourceEngineConsumerContractBlockedReason,
): ProductionIdentitySourceEngineConsumerContractResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    contractStatus: "BLOCKED" as const,
    source: "production_identity_source_engine_consumer_contract" as const,
    reason,
    input,
    contractReference: null,
    boundary: CONTRACT_BOUNDARY,
  });

function isReadyReadiness(
  result: ProductionIdentitySourceEngineConsumerContractInput["readinessResult"],
): result is ProductionIdentitySourceEngineConsumerReadinessReady {
  if (result === null || result.status !== "READY") return false;
  const reference = result.consumerReference;
  const adapter = reference.adapterReference;
  return (
    result.readiness === "READY_FOR_FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION" &&
    result.source === "production_identity_source_engine_consumer_readiness" &&
    result.boundary.consumerReadinessOnly === true &&
    result.boundary.referenceOnly === true &&
    result.boundary.noEngineInvocation === true &&
    result.boundary.noUserInputBinding === true &&
    result.boundary.noProductIntegration === true &&
    result.boundary.noRendererInvocation === true &&
    result.boundary.noStorageWrite === true &&
    result.boundary.noIdentityRecalculation === true &&
    result.boundary.noLifeStateMutation === true &&
    reference.referenceType === "FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMER_READINESS" &&
    reference.consumerScope === "FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION_ONLY" &&
    reference.inputRole === "FORMAL_IDENTITY_SOURCE_ENGINE_INPUT_REFERENCE" &&
    reference.engineInvocation === "NOT_PERFORMED" &&
    reference.productionIntegration === false &&
    reference.userBinding === false &&
    reference.referenceOnly === true &&
    adapter.referenceType === "ISOLATED_FORMAL_IDENTITY_SOURCE_ADAPTER_OUTPUT" &&
    adapter.outputRole === "FORMAL_IDENTITY_SOURCE_ENGINE_INPUT_REFERENCE" &&
    adapter.referenceOnly === true &&
    adapter.noEngineInvocation === true
  );
}

export function reviewProductionIdentitySourceEngineConsumerContract(
  input: ProductionIdentitySourceEngineConsumerContractInput,
): ProductionIdentitySourceEngineConsumerContractResult {
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
    contractStatus: "FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION_CONTRACT_READY" as const,
    source: "production_identity_source_engine_consumer_contract" as const,
    input,
    contractReference: Object.freeze({
      referenceType: "FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION_CONTRACT" as const,
      referenceId: `formal-identity-source-engine-contract:${readiness.consumerReference.referenceId}`,
      readinessReference: readiness.consumerReference,
      inputShape: "FORMAL_IDENTITY_SOURCE_ENGINE_INPUT_REFERENCE" as const,
      sourceMapping: Object.freeze({
        lunarBirthDate: "NORMALIZED_REFERENCE_LUNAR_BIRTH_DATE" as const,
        hourBranch: "NORMALIZED_REFERENCE_HOUR_BRANCH" as const,
        hourBranchOrdinal: "NORMALIZED_REFERENCE_HOUR_BRANCH_ORDINAL" as const,
        locationContext: "NORMALIZED_REFERENCE_LOCATION_CONTEXT_ONLY" as const,
      }),
      consumerScope: "FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION_ONLY" as const,
      contractOnly: true as const,
      referenceOnly: true as const,
      engineInvocation: "NOT_PERFORMED" as const,
      productionIntegration: false as const,
      userBinding: false as const,
      noProductIntegration: true as const,
      noRendererInvocation: true as const,
      noStorageWrite: true as const,
      noIdentityRecalculation: true as const,
      noLifeStateMutation: true as const,
    }),
    boundary: CONTRACT_BOUNDARY,
  });
}
