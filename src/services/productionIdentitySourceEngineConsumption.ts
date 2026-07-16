import { runMotherCodeLandingEngine } from "./guanyaoLunarMotherCodeLandingAdapter";
import { resolveStarbeastFromBirthDate } from "./guanyaoStarbeastEngineService";
import type { ProductionIdentitySourceEngineConsumerAuthorizationAuthorized } from "../types/productionIdentitySourceEngineConsumerAuthorization";
import type { ProductionIdentitySourceEngineConsumerContractReady } from "../types/productionIdentitySourceEngineConsumerContract";
import type {
  ProductionIdentitySourceEngineConsumptionBlockedReason,
  ProductionIdentitySourceEngineConsumptionBoundary,
  ProductionIdentitySourceEngineConsumptionInput,
  ProductionIdentitySourceEngineConsumptionResult,
  ProductionIdentitySourceEngineConsumptionUnavailableReason,
} from "../types/productionIdentitySourceEngineConsumption";
import type { ProductionIdentitySourceNormalizedReferenceAdapterAvailable } from "../types/productionIdentitySourceNormalizedReferenceAdapter";

const EXECUTED_BOUNDARY: ProductionIdentitySourceEngineConsumptionBoundary =
  Object.freeze({
    engineConsumerOnly: true,
    isolatedExecutionOnly: true,
    referenceOnly: true,
    engineInvocationPerformed: true,
    noUserInputBinding: true,
    noProductIntegration: true,
    noRendererInvocation: true,
    noStorageWrite: true,
    noIdentityConvergence: true,
    noPersonalStarBeastCreation: true,
    noLifeStateMutation: true,
  });

const NOT_EXECUTED_BOUNDARY = Object.freeze({
  ...EXECUTED_BOUNDARY,
  engineInvocationPerformed: false as const,
});

const unavailable = (
  input: ProductionIdentitySourceEngineConsumptionInput,
  reason: ProductionIdentitySourceEngineConsumptionUnavailableReason,
): ProductionIdentitySourceEngineConsumptionResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    consumptionStatus: "UNAVAILABLE" as const,
    source: "production_identity_source_engine_consumption" as const,
    reason,
    input,
    consumptionReference: null,
    boundary: NOT_EXECUTED_BOUNDARY,
  });

const blocked = (
  input: ProductionIdentitySourceEngineConsumptionInput,
  reason: ProductionIdentitySourceEngineConsumptionBlockedReason,
): ProductionIdentitySourceEngineConsumptionResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    consumptionStatus: "BLOCKED" as const,
    source: "production_identity_source_engine_consumption" as const,
    reason,
    input,
    consumptionReference: null,
    boundary: NOT_EXECUTED_BOUNDARY,
  });

function isAuthorized(
  result: ProductionIdentitySourceEngineConsumptionInput["authorizationResult"],
): result is ProductionIdentitySourceEngineConsumerAuthorizationAuthorized {
  if (result === null || result.status !== "AUTHORIZED") return false;
  const reference = result.authorizationReference;
  return (
    result.authorization === "AUTHORIZED_FOR_ISOLATED_ENGINE_CONSUMPTION" &&
    result.source === "production_identity_source_engine_consumer_authorization" &&
    result.boundary.authorizationReviewOnly === true &&
    result.boundary.isolatedEngineConsumptionOnly === true &&
    result.boundary.referenceOnly === true &&
    result.boundary.noEngineInvocation === true &&
    result.boundary.noUserInputBinding === true &&
    result.boundary.noProductIntegration === true &&
    result.boundary.noRendererInvocation === true &&
    result.boundary.noStorageWrite === true &&
    result.boundary.noIdentityRecalculation === true &&
    result.boundary.noLifeStateMutation === true &&
    reference.engineConsumptionAuthorization === "AUTHORIZED_FOR_ISOLATED_ENGINE_CONSUMPTION" &&
    reference.authorizationScope === "ISOLATED_FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION_ONLY" &&
    reference.userBindingAuthorization === false &&
    reference.productIntegrationAuthorization === false &&
    reference.engineInvocation === "NOT_PERFORMED" &&
    reference.referenceOnly === true
  );
}

function isReadyContract(
  result: ProductionIdentitySourceEngineConsumptionInput["contractResult"],
): result is ProductionIdentitySourceEngineConsumerContractReady {
  if (result === null || result.status !== "READY") return false;
  const reference = result.contractReference;
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
    reference.engineInvocation === "NOT_PERFORMED" &&
    reference.productionIntegration === false &&
    reference.userBinding === false
  );
}

function isAvailableAdapter(
  result: ProductionIdentitySourceEngineConsumptionInput["adapterResult"],
): result is ProductionIdentitySourceNormalizedReferenceAdapterAvailable {
  if (result === null || result.status !== "AVAILABLE") return false;
  const reference = result.adapterReference;
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
    reference.outputRole === "FORMAL_IDENTITY_SOURCE_ENGINE_INPUT_REFERENCE" &&
    reference.referenceOnly === true &&
    reference.noEngineInvocation === true
  );
}

function parseGregorianDate(reference: string): { year: number; month: number; day: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(reference);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) return null;
  return { year, month, day };
}

export function consumeProductionIdentitySourceEngine(
  input: ProductionIdentitySourceEngineConsumptionInput,
): ProductionIdentitySourceEngineConsumptionResult {
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
    return blocked(input, "AUTHORIZATION_CONTRACT_MISMATCH");
  }

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
  if (
    contract.contractReference.readinessReference.adapterReference !==
    adapter.adapterReference
  ) {
    return blocked(input, "ADAPTER_CONTRACT_MISMATCH");
  }

  const normalized = adapter.adapterReference.normalizedReference;
  const date = parseGregorianDate(normalized.gregorianBirthDate);
  if (date === null) return blocked(input, "NORMALIZED_DATE_REFERENCE_INVALID");

  const mansionResult = resolveStarbeastFromBirthDate(date);
  if (mansionResult.status !== "READY") {
    return blocked(input, "MANSION_ENGINE_NOT_READY");
  }

  let motherCodeResult;
  try {
    motherCodeResult = runMotherCodeLandingEngine({
      year: date.year,
      month: date.month,
      day: date.day,
      hourBranch: normalized.hourBranch,
    });
  } catch {
    return blocked(input, "MOTHER_CODE_ENGINE_NOT_READY");
  }

  return Object.freeze({
    status: "AVAILABLE" as const,
    consumptionStatus: "FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION_AVAILABLE" as const,
    source: "production_identity_source_engine_consumption" as const,
    input,
    consumptionReference: Object.freeze({
      referenceType: "FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION" as const,
      referenceId: `formal-identity-source-engine-consumption:${contract.contractReference.referenceId}`,
      contractReference: contract.contractReference,
      mansionEngineResultReference: mansionResult,
      motherCodeEngineResultReference: motherCodeResult,
      engineInvocation: "PERFORMED_ISOLATED" as const,
      identityConvergence: "NOT_PERFORMED" as const,
      personalStarBeastCreation: false as const,
      productionIntegration: false as const,
      userBinding: false as const,
      referenceOnly: true as const,
      noRendererInvocation: true as const,
      noStorageWrite: true as const,
      noLifeStateMutation: true as const,
    }),
    boundary: EXECUTED_BOUNDARY,
  });
}
