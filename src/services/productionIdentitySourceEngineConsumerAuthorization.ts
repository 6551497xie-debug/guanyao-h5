import type { ProductionIdentitySourceEngineConsumerContractReady } from "../types/productionIdentitySourceEngineConsumerContract";
import type {
  ProductionIdentitySourceEngineConsumerAuthorizationBlockedReason,
  ProductionIdentitySourceEngineConsumerAuthorizationBoundary,
  ProductionIdentitySourceEngineConsumerAuthorizationInput,
  ProductionIdentitySourceEngineConsumerAuthorizationResult,
  ProductionIdentitySourceEngineConsumerAuthorizationUnavailableReason,
} from "../types/productionIdentitySourceEngineConsumerAuthorization";

const AUTHORIZATION_BOUNDARY: ProductionIdentitySourceEngineConsumerAuthorizationBoundary =
  Object.freeze({
    authorizationReviewOnly: true,
    isolatedEngineConsumptionOnly: true,
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
  input: ProductionIdentitySourceEngineConsumerAuthorizationInput,
  reason: ProductionIdentitySourceEngineConsumerAuthorizationUnavailableReason,
): ProductionIdentitySourceEngineConsumerAuthorizationResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    authorization: "UNAVAILABLE" as const,
    source: "production_identity_source_engine_consumer_authorization" as const,
    reason,
    input,
    authorizationReference: null,
    boundary: AUTHORIZATION_BOUNDARY,
  });

const blocked = (
  input: ProductionIdentitySourceEngineConsumerAuthorizationInput,
  reason: ProductionIdentitySourceEngineConsumerAuthorizationBlockedReason,
): ProductionIdentitySourceEngineConsumerAuthorizationResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    authorization: "BLOCKED" as const,
    source: "production_identity_source_engine_consumer_authorization" as const,
    reason,
    input,
    authorizationReference: null,
    boundary: AUTHORIZATION_BOUNDARY,
  });

function isReadyContract(
  result: ProductionIdentitySourceEngineConsumerAuthorizationInput["contractResult"],
): result is ProductionIdentitySourceEngineConsumerContractReady {
  if (result === null || result.status !== "READY") return false;
  const reference = result.contractReference;
  const readiness = reference.readinessReference;
  return (
    result.contractStatus === "FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION_CONTRACT_READY" &&
    result.source === "production_identity_source_engine_consumer_contract" &&
    result.boundary.contractOnly === true &&
    result.boundary.referenceOnly === true &&
    result.boundary.noEngineInvocation === true &&
    result.boundary.noUserInputBinding === true &&
    result.boundary.noProductIntegration === true &&
    result.boundary.noRendererInvocation === true &&
    result.boundary.noStorageWrite === true &&
    result.boundary.noIdentityRecalculation === true &&
    result.boundary.noLifeStateMutation === true &&
    reference.referenceType === "FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION_CONTRACT" &&
    reference.inputShape === "FORMAL_IDENTITY_SOURCE_ENGINE_INPUT_REFERENCE" &&
    reference.consumerScope === "FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION_ONLY" &&
    reference.contractOnly === true &&
    reference.referenceOnly === true &&
    reference.engineInvocation === "NOT_PERFORMED" &&
    reference.productionIntegration === false &&
    reference.userBinding === false &&
    readiness.referenceType === "FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMER_READINESS" &&
    readiness.engineInvocation === "NOT_PERFORMED" &&
    readiness.productionIntegration === false &&
    readiness.userBinding === false
  );
}

export function reviewProductionIdentitySourceEngineConsumerAuthorization(
  input: ProductionIdentitySourceEngineConsumerAuthorizationInput,
): ProductionIdentitySourceEngineConsumerAuthorizationResult {
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
    authorization: "AUTHORIZED_FOR_ISOLATED_ENGINE_CONSUMPTION" as const,
    source: "production_identity_source_engine_consumer_authorization" as const,
    input,
    authorizationReference: Object.freeze({
      referenceType: "FORMAL_IDENTITY_SOURCE_ENGINE_ISOLATED_CONSUMPTION_AUTHORIZATION" as const,
      referenceId: `formal-identity-source-engine-authorization:${contract.contractReference.referenceId}`,
      contractReference: contract.contractReference,
      authorizationScope: "ISOLATED_FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION_ONLY" as const,
      engineConsumptionAuthorization: "AUTHORIZED_FOR_ISOLATED_ENGINE_CONSUMPTION" as const,
      userBindingAuthorization: false as const,
      productIntegrationAuthorization: false as const,
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
