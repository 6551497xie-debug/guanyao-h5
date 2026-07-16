import type {
  ProductionIdentitySourceConvergenceReadinessBlockedReason,
  ProductionIdentitySourceConvergenceReadinessBoundary,
  ProductionIdentitySourceConvergenceReadinessInput,
  ProductionIdentitySourceConvergenceReadinessResult,
  ProductionIdentitySourceConvergenceReadinessUnavailableReason,
} from "../types/productionIdentitySourceConvergenceReadiness";
import type { ProductionIdentitySourceEngineConsumptionAvailable } from "../types/productionIdentitySourceEngineConsumption";

const READINESS_BOUNDARY: ProductionIdentitySourceConvergenceReadinessBoundary =
  Object.freeze({
    readinessOnly: true,
    convergenceContractOnly: true,
    referenceOnly: true,
    noEngineInvocation: true,
    noIdentityConvergence: true,
    noPersonalStarBeastCreation: true,
    noUserInputBinding: true,
    noProductIntegration: true,
    noRendererInvocation: true,
    noStorageWrite: true,
    noLifeStateMutation: true,
  });

const unavailable = (
  input: ProductionIdentitySourceConvergenceReadinessInput,
  reason: ProductionIdentitySourceConvergenceReadinessUnavailableReason,
): ProductionIdentitySourceConvergenceReadinessResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    readiness: "UNAVAILABLE" as const,
    source: "production_identity_source_convergence_readiness" as const,
    reason,
    input,
    readinessReference: null,
    boundary: READINESS_BOUNDARY,
  });

const blocked = (
  input: ProductionIdentitySourceConvergenceReadinessInput,
  reason: ProductionIdentitySourceConvergenceReadinessBlockedReason,
): ProductionIdentitySourceConvergenceReadinessResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    readiness: "BLOCKED" as const,
    source: "production_identity_source_convergence_readiness" as const,
    reason,
    input,
    readinessReference: null,
    boundary: READINESS_BOUNDARY,
  });

function isAvailableConsumption(
  result: ProductionIdentitySourceConvergenceReadinessInput["engineConsumptionResult"],
): result is ProductionIdentitySourceEngineConsumptionAvailable {
  if (result === null || result.status !== "AVAILABLE") return false;
  const reference = result.consumptionReference;
  return (
    result.consumptionStatus ===
      "FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION_AVAILABLE" &&
    result.source === "production_identity_source_engine_consumption" &&
    result.boundary.engineConsumerOnly === true &&
    result.boundary.isolatedExecutionOnly === true &&
    result.boundary.referenceOnly === true &&
    result.boundary.engineInvocationPerformed === true &&
    result.boundary.noUserInputBinding === true &&
    result.boundary.noProductIntegration === true &&
    result.boundary.noRendererInvocation === true &&
    result.boundary.noStorageWrite === true &&
    result.boundary.noIdentityConvergence === true &&
    result.boundary.noPersonalStarBeastCreation === true &&
    result.boundary.noLifeStateMutation === true &&
    reference.referenceType === "FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION" &&
    reference.engineInvocation === "PERFORMED_ISOLATED" &&
    reference.identityConvergence === "NOT_PERFORMED" &&
    reference.personalStarBeastCreation === false &&
    reference.productionIntegration === false &&
    reference.userBinding === false &&
    reference.referenceOnly === true
  );
}

export function resolveProductionIdentitySourceConvergenceReadiness(
  input: ProductionIdentitySourceConvergenceReadinessInput,
): ProductionIdentitySourceConvergenceReadinessResult {
  const consumption = input.engineConsumptionResult;
  if (consumption === null) {
    return unavailable(input, "ENGINE_CONSUMPTION_RESULT_REQUIRED");
  }
  if (consumption.status === "UNAVAILABLE") {
    return unavailable(input, "ENGINE_CONSUMPTION_RESULT_UNAVAILABLE");
  }
  if (consumption.status === "BLOCKED") {
    return blocked(input, "ENGINE_CONSUMPTION_RESULT_BLOCKED");
  }
  if (!isAvailableConsumption(consumption)) {
    return blocked(input, "ENGINE_CONSUMPTION_BOUNDARY_INVALID");
  }

  const mansion = consumption.consumptionReference.mansionEngineResultReference;
  if (mansion.status !== "READY") {
    return blocked(input, "MANSION_SOURCE_NOT_READY");
  }
  if (mansion.fourSymbol === undefined || mansion.direction === undefined) {
    return blocked(input, "FOUR_SYMBOL_SOURCE_NOT_READY");
  }

  const motherCode = consumption.consumptionReference.motherCodeEngineResultReference;
  if (motherCode.status !== "READY") {
    return blocked(input, "MOTHER_CODE_SOURCE_NOT_READY");
  }
  if (
    mansion.locationIndependent !== true ||
    mansion.birthTimeIndependent !== true ||
    consumption.consumptionReference.identityConvergence !== "NOT_PERFORMED"
  ) {
    return blocked(input, "SOURCE_INDEPENDENCE_INVALID");
  }

  const reference = Object.freeze({
    referenceType: "FORMAL_IDENTITY_SOURCE_CONVERGENCE_READINESS" as const,
    referenceId: `formal-identity-source-convergence-readiness:${consumption.consumptionReference.referenceId}`,
    engineConsumptionReference: consumption.consumptionReference,
    mansionSeedReference: mansion,
    fourSymbolFieldReference: mansion,
    motherCodeForceReference: motherCode,
    sourceIndependence: Object.freeze({
      mansionAndFourSymbolFromSameFormalEngine: true as const,
      motherCodeFromIndependentFormalEngine: true as const,
      fourSymbolDoesNotDeriveMotherCode: true as const,
      motherCodeDoesNotDeriveFourSymbol: true as const,
    }),
    convergence: "NOT_PERFORMED" as const,
    personalStarBeastCreation: false as const,
    productionIntegration: false as const,
    userBinding: false as const,
    referenceOnly: true as const,
  });

  return Object.freeze({
    status: "READY" as const,
    readiness: "READY_FOR_FORMAL_IDENTITY_SOURCE_CONVERGENCE" as const,
    source: "production_identity_source_convergence_readiness" as const,
    input,
    readinessReference: reference,
    boundary: READINESS_BOUNDARY,
  });
}
