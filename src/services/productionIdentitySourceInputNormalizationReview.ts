import type {
  ProductionIdentitySourceInputNormalizationBoundary,
  ProductionIdentitySourceInputNormalizationReviewBlockedReason,
  ProductionIdentitySourceInputNormalizationReviewInput,
  ProductionIdentitySourceInputNormalizationReviewResult,
  ProductionIdentitySourceInputNormalizationReviewUnavailableReason,
} from "../types/productionIdentitySourceInputNormalizationReview";

const REVIEW_BOUNDARY: ProductionIdentitySourceInputNormalizationBoundary =
  Object.freeze({
    reviewOnly: true,
    policyOnly: true,
    noRawUserData: true,
    noUserInputBinding: true,
    noCalendarCalculation: true,
    noHourBranchCalculation: true,
    noIdentityRecalculation: true,
    noProductIntegration: true,
    noUiIntegration: true,
    noStorageWrite: true,
  });

const unavailable = (
  input: ProductionIdentitySourceInputNormalizationReviewInput,
  reason: ProductionIdentitySourceInputNormalizationReviewUnavailableReason,
): ProductionIdentitySourceInputNormalizationReviewResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    reviewStatus: "UNAVAILABLE" as const,
    source: "production_identity_source_input_normalization_review" as const,
    reason,
    input,
    normalizationReference: null,
    boundary: REVIEW_BOUNDARY,
  });

const blocked = (
  input: ProductionIdentitySourceInputNormalizationReviewInput,
  reason: ProductionIdentitySourceInputNormalizationReviewBlockedReason,
): ProductionIdentitySourceInputNormalizationReviewResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    reviewStatus: "BLOCKED" as const,
    source: "production_identity_source_input_normalization_review" as const,
    reason,
    input,
    normalizationReference: null,
    boundary: REVIEW_BOUNDARY,
  });

export function reviewProductionIdentitySourceInputNormalization(
  input: ProductionIdentitySourceInputNormalizationReviewInput,
): ProductionIdentitySourceInputNormalizationReviewResult {
  const authorization = input.authorizationResult;
  if (authorization === null) {
    return unavailable(input, "AUTHORIZATION_RESULT_REQUIRED");
  }
  if (authorization.status === "UNAVAILABLE") {
    return unavailable(input, "AUTHORIZATION_RESULT_UNAVAILABLE");
  }
  if (authorization.status === "BLOCKED") {
    return blocked(input, "AUTHORIZATION_RESULT_BLOCKED");
  }

  if (
    authorization.status !== "AUTHORIZED" ||
    authorization.authorizationStatus !==
      "AUTHORIZED_FOR_FORMAL_IDENTITY_SOURCE_CONSUMER_IMPLEMENTATION_REVIEW" ||
    authorization.source !==
      "production_identity_source_consumer_implementation_authorization" ||
    authorization.boundary.authorizationOnly !== true ||
    authorization.boundary.referenceOnly !== true ||
    authorization.boundary.noConsumerCreation !== true ||
    authorization.boundary.noRealUserBinding !== true ||
    authorization.boundary.noUiIntegration !== true ||
    authorization.boundary.noProductRuntimeIntegration !== true ||
    authorization.boundary.noRendererIntegration !== true ||
    authorization.boundary.noStorageWrite !== true ||
    authorization.boundary.noSourceMutation !== true
  ) {
    return blocked(input, "AUTHORIZATION_BOUNDARY_INVALID");
  }

  const authorizationReference = authorization.authorizationReference;
  if (
    authorizationReference.referenceType !==
      "FORMAL_IDENTITY_SOURCE_CONSUMER_IMPLEMENTATION_AUTHORIZATION" ||
    authorizationReference.authorizationScope !==
      "FUTURE_FORMAL_IDENTITY_SOURCE_CONSUMER_IMPLEMENTATION_ONLY" ||
    authorizationReference.productConsumptionQualified !== true ||
    authorizationReference.authorizationOnly !== true ||
    authorizationReference.referenceOnly !== true ||
    authorizationReference.noConsumerCreation !== true ||
    authorizationReference.noRealUserBinding !== true ||
    authorizationReference.noUiIntegration !== true ||
    authorizationReference.noProductRuntimeIntegration !== true ||
    authorizationReference.noRendererIntegration !== true ||
    authorizationReference.noStorageWrite !== true ||
    authorizationReference.noSourceMutation !== true
  ) {
    return blocked(input, "INPUT_POLICY_REFERENCE_INVALID");
  }

  return Object.freeze({
    status: "READY" as const,
    reviewStatus: "READY_FOR_FORMAL_INPUT_NORMALIZER_REVIEW" as const,
    source: "production_identity_source_input_normalization_review" as const,
    input,
    normalizationReference: Object.freeze({
      referenceType:
        "FORMAL_IDENTITY_SOURCE_INPUT_NORMALIZATION_REVIEW" as const,
      referenceId: `formal-identity-source-input-normalization:${authorizationReference.referenceId}`,
      reviewScope: "FUTURE_FORMAL_INPUT_NORMALIZER_ONLY" as const,
      authorizationReference,
      policy: Object.freeze({
        acceptedInputShape:
          "GREGORIAN_DATE_TIME_WITH_LOCATION_CONTEXT" as const,
        calendarPolicy:
          "GREGORIAN_TO_CHINESE_LUNISOLAR_EXISTING_ENGINE" as const,
        timePolicy:
          "LOCAL_BIRTH_TIME_TO_HOUR_BRANCH_EXISTING_ENGINE" as const,
        dateRequired: true as const,
        timeRequired: true as const,
        locationRole: "BIRTH_LOCATION_CONTEXT_ONLY" as const,
        locationParticipatesInStarBeastDerivation: false as const,
        locationParticipatesInMotherCodeDerivation: false as const,
        lunarDateIsCanonicalCalculationInput: true as const,
        noRawUserDataPersisted: true as const,
      }),
      reviewOnly: true as const,
      policyOnly: true as const,
      noRawUserData: true as const,
      noUserInputBinding: true as const,
      noCalendarCalculation: true as const,
      noHourBranchCalculation: true as const,
      noIdentityRecalculation: true as const,
      noProductIntegration: true as const,
      noUiIntegration: true as const,
      noStorageWrite: true as const,
    }),
    boundary: REVIEW_BOUNDARY,
  });
}
