import type {
  ProductionIdentitySourceInputNormalizerContractBlockedReason,
  ProductionIdentitySourceInputNormalizerContractBoundary,
  ProductionIdentitySourceInputNormalizerContractInput,
  ProductionIdentitySourceInputNormalizerContractResult,
  ProductionIdentitySourceInputNormalizerContractUnavailableReason,
} from "../types/productionIdentitySourceInputNormalizerContract";

const CONTRACT_BOUNDARY: ProductionIdentitySourceInputNormalizerContractBoundary =
  Object.freeze({
    contractOnly: true,
    referenceOnly: true,
    noRawUserData: true,
    noUserInputBinding: true,
    noCalendarCalculation: true,
    noHourBranchCalculation: true,
    noIdentityRecalculation: true,
    noProductIntegration: true,
    noUiIntegration: true,
    noRendererIntegration: true,
    noStorageWrite: true,
  });

const unavailable = (
  input: ProductionIdentitySourceInputNormalizerContractInput,
  reason: ProductionIdentitySourceInputNormalizerContractUnavailableReason,
): ProductionIdentitySourceInputNormalizerContractResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    contractStatus: "UNAVAILABLE" as const,
    source: "production_identity_source_input_normalizer_contract" as const,
    reason,
    input,
    contractReference: null,
    boundary: CONTRACT_BOUNDARY,
  });

const blocked = (
  input: ProductionIdentitySourceInputNormalizerContractInput,
  reason: ProductionIdentitySourceInputNormalizerContractBlockedReason,
): ProductionIdentitySourceInputNormalizerContractResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    contractStatus: "BLOCKED" as const,
    source: "production_identity_source_input_normalizer_contract" as const,
    reason,
    input,
    contractReference: null,
    boundary: CONTRACT_BOUNDARY,
  });

export function reviewProductionIdentitySourceInputNormalizerContract(
  input: ProductionIdentitySourceInputNormalizerContractInput,
): ProductionIdentitySourceInputNormalizerContractResult {
  const review = input.reviewResult;
  if (review === null) {
    return unavailable(input, "REVIEW_RESULT_REQUIRED");
  }
  if (review.status === "UNAVAILABLE") {
    return unavailable(input, "REVIEW_RESULT_UNAVAILABLE");
  }
  if (review.status === "BLOCKED") {
    return blocked(input, "REVIEW_RESULT_BLOCKED");
  }

  if (
    review.status !== "READY" ||
    review.reviewStatus !== "READY_FOR_FORMAL_INPUT_NORMALIZER_REVIEW" ||
    review.source !== "production_identity_source_input_normalization_review" ||
    review.boundary.reviewOnly !== true ||
    review.boundary.policyOnly !== true ||
    review.boundary.noRawUserData !== true ||
    review.boundary.noUserInputBinding !== true ||
    review.boundary.noCalendarCalculation !== true ||
    review.boundary.noHourBranchCalculation !== true ||
    review.boundary.noIdentityRecalculation !== true ||
    review.boundary.noProductIntegration !== true ||
    review.boundary.noUiIntegration !== true ||
    review.boundary.noStorageWrite !== true
  ) {
    return blocked(input, "REVIEW_BOUNDARY_INVALID");
  }

  const reviewReference = review.normalizationReference;
  if (
    reviewReference.referenceType !==
      "FORMAL_IDENTITY_SOURCE_INPUT_NORMALIZATION_REVIEW" ||
    reviewReference.reviewScope !== "FUTURE_FORMAL_INPUT_NORMALIZER_ONLY" ||
    reviewReference.reviewOnly !== true ||
    reviewReference.policyOnly !== true ||
    reviewReference.noRawUserData !== true ||
    reviewReference.noUserInputBinding !== true ||
    reviewReference.noCalendarCalculation !== true ||
    reviewReference.noHourBranchCalculation !== true ||
    reviewReference.noIdentityRecalculation !== true ||
    reviewReference.noProductIntegration !== true ||
    reviewReference.noUiIntegration !== true ||
    reviewReference.noStorageWrite !== true ||
    reviewReference.policy.acceptedInputShape !==
      "GREGORIAN_DATE_TIME_WITH_LOCATION_CONTEXT" ||
    reviewReference.policy.calendarPolicy !==
      "GREGORIAN_TO_CHINESE_LUNISOLAR_EXISTING_ENGINE" ||
    reviewReference.policy.timePolicy !==
      "LOCAL_BIRTH_TIME_TO_HOUR_BRANCH_EXISTING_ENGINE" ||
    reviewReference.policy.dateRequired !== true ||
    reviewReference.policy.timeRequired !== true ||
    reviewReference.policy.locationRole !== "BIRTH_LOCATION_CONTEXT_ONLY" ||
    reviewReference.policy.locationParticipatesInStarBeastDerivation !== false ||
    reviewReference.policy.locationParticipatesInMotherCodeDerivation !== false ||
    reviewReference.policy.lunarDateIsCanonicalCalculationInput !== true ||
    reviewReference.policy.noRawUserDataPersisted !== true
  ) {
    return blocked(input, "NORMALIZER_POLICY_INVALID");
  }

  return Object.freeze({
    status: "READY" as const,
    contractStatus: "FORMAL_INPUT_NORMALIZER_CONTRACT_READY" as const,
    source: "production_identity_source_input_normalizer_contract" as const,
    input,
    contractReference: Object.freeze({
      referenceType:
        "FORMAL_IDENTITY_SOURCE_INPUT_NORMALIZER_CONTRACT" as const,
      referenceId: `formal-identity-source-input-normalizer-contract:${reviewReference.referenceId}`,
      contractVersion: "V1" as const,
      reviewReference,
      inputContract: Object.freeze({
        acceptedInputShape:
          "GREGORIAN_DATE_TIME_WITH_LOCATION_CONTEXT" as const,
        dateInputRequired: true as const,
        timeInputRequired: true as const,
        locationContextOptional: true as const,
        dateFormat: "ISO_GREGORIAN_DATE" as const,
        timeFormat: "LOCAL_CLOCK_TIME" as const,
        locationRole: "BIRTH_LOCATION_CONTEXT_ONLY" as const,
        rawInputPersisted: false as const,
      }),
      outputContract: Object.freeze({
        outputReferenceType:
          "FORMAL_IDENTITY_SOURCE_NORMALIZATION_REFERENCE" as const,
        calendarResolutionSource:
          "GREGORIAN_TO_CHINESE_LUNISOLAR_EXISTING_ENGINE" as const,
        timeResolutionSource:
          "LOCAL_BIRTH_TIME_TO_HOUR_BRANCH_EXISTING_ENGINE" as const,
        lunarDateIsCanonicalCalculationInput: true as const,
        locationContextPreserved: true as const,
        locationExcludedFromStarBeastDerivation: true as const,
        locationExcludedFromMotherCodeDerivation: true as const,
        outputIsNotIdentityResult: true as const,
        outputIsReferenceOnly: true as const,
      }),
      errorContract: Object.freeze({
        missingDate: "UNAVAILABLE" as const,
        missingTime: "UNAVAILABLE" as const,
        invalidDate: "BLOCKED" as const,
        invalidTime: "BLOCKED" as const,
        invalidLocationContext: "BLOCKED" as const,
        calendarEngineUnavailable: "UNAVAILABLE" as const,
        hourBranchEngineUnavailable: "UNAVAILABLE" as const,
      }),
      contractOnly: true as const,
      referenceOnly: true as const,
      noRawUserData: true as const,
      noUserInputBinding: true as const,
      noCalendarCalculation: true as const,
      noHourBranchCalculation: true as const,
      noIdentityRecalculation: true as const,
      noProductIntegration: true as const,
      noUiIntegration: true as const,
      noRendererIntegration: true as const,
      noStorageWrite: true as const,
    }),
    boundary: CONTRACT_BOUNDARY,
  });
}
