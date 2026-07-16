import type {
  ProductionIdentitySourceConsumerImplementationAuthorizationResult,
} from "./productionIdentitySourceConsumerImplementationAuthorization";

export type ProductionIdentitySourceInputNormalizationReviewInput = Readonly<{
  authorizationResult:
    ProductionIdentitySourceConsumerImplementationAuthorizationResult | null;
}>;

export type ProductionIdentitySourceInputNormalizationReviewUnavailableReason =
  | "AUTHORIZATION_RESULT_REQUIRED"
  | "AUTHORIZATION_RESULT_UNAVAILABLE";

export type ProductionIdentitySourceInputNormalizationReviewBlockedReason =
  | "AUTHORIZATION_RESULT_BLOCKED"
  | "AUTHORIZATION_RESULT_INVALID"
  | "AUTHORIZATION_BOUNDARY_INVALID"
  | "INPUT_POLICY_REFERENCE_INVALID";

export type ProductionIdentitySourceInputNormalizationBoundary = Readonly<{
  reviewOnly: true;
  policyOnly: true;
  noRawUserData: true;
  noUserInputBinding: true;
  noCalendarCalculation: true;
  noHourBranchCalculation: true;
  noIdentityRecalculation: true;
  noProductIntegration: true;
  noUiIntegration: true;
  noStorageWrite: true;
}>;

export type ProductionIdentitySourceInputNormalizationPolicy = Readonly<{
  acceptedInputShape: "GREGORIAN_DATE_TIME_WITH_LOCATION_CONTEXT";
  calendarPolicy: "GREGORIAN_TO_CHINESE_LUNISOLAR_EXISTING_ENGINE";
  timePolicy: "LOCAL_BIRTH_TIME_TO_HOUR_BRANCH_EXISTING_ENGINE";
  dateRequired: true;
  timeRequired: true;
  locationRole: "BIRTH_LOCATION_CONTEXT_ONLY";
  locationParticipatesInStarBeastDerivation: false;
  locationParticipatesInMotherCodeDerivation: false;
  lunarDateIsCanonicalCalculationInput: true;
  noRawUserDataPersisted: true;
}>;

export type ProductionIdentitySourceInputNormalizationReviewReference =
  Readonly<{
    referenceType: "FORMAL_IDENTITY_SOURCE_INPUT_NORMALIZATION_REVIEW";
    referenceId: string;
    reviewScope: "FUTURE_FORMAL_INPUT_NORMALIZER_ONLY";
    authorizationReference: NonNullable<
      Extract<
        ProductionIdentitySourceConsumerImplementationAuthorizationResult,
        { status: "AUTHORIZED" }
      >["authorizationReference"]
    >;
    policy: ProductionIdentitySourceInputNormalizationPolicy;
    reviewOnly: true;
    policyOnly: true;
    noRawUserData: true;
    noUserInputBinding: true;
    noCalendarCalculation: true;
    noHourBranchCalculation: true;
    noIdentityRecalculation: true;
    noProductIntegration: true;
    noUiIntegration: true;
    noStorageWrite: true;
  }>;

export type ProductionIdentitySourceInputNormalizationReviewReady = Readonly<{
  status: "READY";
  reviewStatus: "READY_FOR_FORMAL_INPUT_NORMALIZER_REVIEW";
  source: "production_identity_source_input_normalization_review";
  input: ProductionIdentitySourceInputNormalizationReviewInput;
  normalizationReference: ProductionIdentitySourceInputNormalizationReviewReference;
  boundary: ProductionIdentitySourceInputNormalizationBoundary;
}>;

export type ProductionIdentitySourceInputNormalizationReviewUnavailable = Readonly<{
  status: "UNAVAILABLE";
  reviewStatus: "UNAVAILABLE";
  source: "production_identity_source_input_normalization_review";
  reason: ProductionIdentitySourceInputNormalizationReviewUnavailableReason;
  input: ProductionIdentitySourceInputNormalizationReviewInput;
  normalizationReference: null;
  boundary: ProductionIdentitySourceInputNormalizationBoundary;
}>;

export type ProductionIdentitySourceInputNormalizationReviewBlocked = Readonly<{
  status: "BLOCKED";
  reviewStatus: "BLOCKED";
  source: "production_identity_source_input_normalization_review";
  reason: ProductionIdentitySourceInputNormalizationReviewBlockedReason;
  input: ProductionIdentitySourceInputNormalizationReviewInput;
  normalizationReference: null;
  boundary: ProductionIdentitySourceInputNormalizationBoundary;
}>;

export type ProductionIdentitySourceInputNormalizationReviewResult =
  | ProductionIdentitySourceInputNormalizationReviewReady
  | ProductionIdentitySourceInputNormalizationReviewUnavailable
  | ProductionIdentitySourceInputNormalizationReviewBlocked;
