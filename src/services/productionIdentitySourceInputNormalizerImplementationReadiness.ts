import type {
  ProductionIdentitySourceInputNormalizerImplementationReadinessBlockedReason,
  ProductionIdentitySourceInputNormalizerImplementationReadinessBoundary,
  ProductionIdentitySourceInputNormalizerImplementationReadinessInput,
  ProductionIdentitySourceInputNormalizerImplementationReadinessResult,
  ProductionIdentitySourceInputNormalizerImplementationReadinessUnavailableReason,
} from "../types/productionIdentitySourceInputNormalizerImplementationReadiness";

const READINESS_BOUNDARY: ProductionIdentitySourceInputNormalizerImplementationReadinessBoundary =
  Object.freeze({
    readinessOnly: true,
    referenceOnly: true,
    implementationNotStarted: true,
    noRawUserData: true,
    noUserInputBinding: true,
    noProductIntegration: true,
    noUiIntegration: true,
    noRendererIntegration: true,
    noStorageWrite: true,
    noIdentityRecalculation: true,
  });

const unavailable = (
  input: ProductionIdentitySourceInputNormalizerImplementationReadinessInput,
  reason: ProductionIdentitySourceInputNormalizerImplementationReadinessUnavailableReason,
): ProductionIdentitySourceInputNormalizerImplementationReadinessResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    readiness: "UNAVAILABLE" as const,
    source:
      "production_identity_source_input_normalizer_implementation_readiness" as const,
    reason,
    input,
    readinessReference: null,
    boundary: READINESS_BOUNDARY,
  });

const blocked = (
  input: ProductionIdentitySourceInputNormalizerImplementationReadinessInput,
  reason: ProductionIdentitySourceInputNormalizerImplementationReadinessBlockedReason,
): ProductionIdentitySourceInputNormalizerImplementationReadinessResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    readiness: "BLOCKED" as const,
    source:
      "production_identity_source_input_normalizer_implementation_readiness" as const,
    reason,
    input,
    readinessReference: null,
    boundary: READINESS_BOUNDARY,
  });

export function resolveProductionIdentitySourceInputNormalizerImplementationReadiness(
  input: ProductionIdentitySourceInputNormalizerImplementationReadinessInput,
): ProductionIdentitySourceInputNormalizerImplementationReadinessResult {
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
    contract.contractStatus !== "FORMAL_INPUT_NORMALIZER_CONTRACT_READY" ||
    contract.source !== "production_identity_source_input_normalizer_contract" ||
    contract.boundary.contractOnly !== true ||
    contract.boundary.referenceOnly !== true ||
    contract.boundary.noRawUserData !== true ||
    contract.boundary.noUserInputBinding !== true ||
    contract.boundary.noCalendarCalculation !== true ||
    contract.boundary.noHourBranchCalculation !== true ||
    contract.boundary.noIdentityRecalculation !== true ||
    contract.boundary.noProductIntegration !== true ||
    contract.boundary.noUiIntegration !== true ||
    contract.boundary.noRendererIntegration !== true ||
    contract.boundary.noStorageWrite !== true
  ) {
    return blocked(input, "CONTRACT_BOUNDARY_INVALID");
  }

  const contractReference = contract.contractReference;
  if (
    contractReference.referenceType !==
      "FORMAL_IDENTITY_SOURCE_INPUT_NORMALIZER_CONTRACT" ||
    contractReference.contractVersion !== "V1" ||
    contractReference.inputContract.acceptedInputShape !==
      "GREGORIAN_DATE_TIME_WITH_LOCATION_CONTEXT" ||
    contractReference.inputContract.dateInputRequired !== true ||
    contractReference.inputContract.timeInputRequired !== true ||
    contractReference.inputContract.locationContextOptional !== true ||
    contractReference.inputContract.dateFormat !== "ISO_GREGORIAN_DATE" ||
    contractReference.inputContract.timeFormat !== "LOCAL_CLOCK_TIME" ||
    contractReference.inputContract.locationRole !==
      "BIRTH_LOCATION_CONTEXT_ONLY" ||
    contractReference.inputContract.rawInputPersisted !== false ||
    contractReference.outputContract.outputReferenceType !==
      "FORMAL_IDENTITY_SOURCE_NORMALIZATION_REFERENCE" ||
    contractReference.outputContract.calendarResolutionSource !==
      "GREGORIAN_TO_CHINESE_LUNISOLAR_EXISTING_ENGINE" ||
    contractReference.outputContract.timeResolutionSource !==
      "LOCAL_BIRTH_TIME_TO_HOUR_BRANCH_EXISTING_ENGINE" ||
    contractReference.outputContract.lunarDateIsCanonicalCalculationInput !==
      true ||
    contractReference.outputContract.locationContextPreserved !== true ||
    contractReference.outputContract.locationExcludedFromStarBeastDerivation !==
      true ||
    contractReference.outputContract.locationExcludedFromMotherCodeDerivation !==
      true ||
    contractReference.outputContract.outputIsNotIdentityResult !== true ||
    contractReference.outputContract.outputIsReferenceOnly !== true ||
    contractReference.errorContract.missingDate !== "UNAVAILABLE" ||
    contractReference.errorContract.missingTime !== "UNAVAILABLE" ||
    contractReference.errorContract.invalidDate !== "BLOCKED" ||
    contractReference.errorContract.invalidTime !== "BLOCKED" ||
    contractReference.errorContract.invalidLocationContext !== "BLOCKED" ||
    contractReference.errorContract.calendarEngineUnavailable !== "UNAVAILABLE" ||
    contractReference.errorContract.hourBranchEngineUnavailable !==
      "UNAVAILABLE" ||
    contractReference.contractOnly !== true ||
    contractReference.referenceOnly !== true ||
    contractReference.noRawUserData !== true ||
    contractReference.noUserInputBinding !== true ||
    contractReference.noCalendarCalculation !== true ||
    contractReference.noHourBranchCalculation !== true ||
    contractReference.noIdentityRecalculation !== true ||
    contractReference.noProductIntegration !== true ||
    contractReference.noUiIntegration !== true ||
    contractReference.noRendererIntegration !== true ||
    contractReference.noStorageWrite !== true
  ) {
    return blocked(input, "IMPLEMENTATION_SCOPE_INVALID");
  }

  return Object.freeze({
    status: "READY" as const,
    readiness:
      "READY_FOR_FORMAL_INPUT_NORMALIZER_IMPLEMENTATION" as const,
    source:
      "production_identity_source_input_normalizer_implementation_readiness" as const,
    input,
    readinessReference: Object.freeze({
      referenceType:
        "FORMAL_IDENTITY_SOURCE_INPUT_NORMALIZER_IMPLEMENTATION_READINESS" as const,
      referenceId: `formal-identity-source-input-normalizer-readiness:${contractReference.referenceId}`,
      readinessScope:
        "FUTURE_FORMAL_INPUT_NORMALIZER_IMPLEMENTATION_ONLY" as const,
      contractReference,
      implementationScope: Object.freeze({
        scope: "FORMAL_INPUT_NORMALIZER_ONLY" as const,
        mayReadExistingCalendarEngine: true as const,
        mayReadExistingHourBranchEngine: true as const,
        mayProduceNormalizationReference: true as const,
        mayCreateIdentityResult: false as const,
        mayBindRealUser: false as const,
        mayIntegrateProduct: false as const,
        mayIntegrateUi: false as const,
        mayIntegrateRenderer: false as const,
        mayWriteStorage: false as const,
      }),
      readinessOnly: true as const,
      referenceOnly: true as const,
      implementationNotStarted: true as const,
      noRawUserData: true as const,
      noUserInputBinding: true as const,
      noProductIntegration: true as const,
      noUiIntegration: true as const,
      noRendererIntegration: true as const,
      noStorageWrite: true as const,
      noIdentityRecalculation: true as const,
    }),
    boundary: READINESS_BOUNDARY,
  });
}
