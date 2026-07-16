import type {
  ProductionIdentitySourceInputNormalizationReviewResult,
} from "./productionIdentitySourceInputNormalizationReview";

export type ProductionIdentitySourceInputNormalizerContractInput = Readonly<{
  reviewResult:
    ProductionIdentitySourceInputNormalizationReviewResult | null;
}>;

export type ProductionIdentitySourceInputNormalizerContractUnavailableReason =
  | "REVIEW_RESULT_REQUIRED"
  | "REVIEW_RESULT_UNAVAILABLE";

export type ProductionIdentitySourceInputNormalizerContractBlockedReason =
  | "REVIEW_RESULT_BLOCKED"
  | "REVIEW_RESULT_INVALID"
  | "REVIEW_BOUNDARY_INVALID"
  | "NORMALIZER_POLICY_INVALID";

export type ProductionIdentitySourceInputNormalizerContractBoundary = Readonly<{
  contractOnly: true;
  referenceOnly: true;
  noRawUserData: true;
  noUserInputBinding: true;
  noCalendarCalculation: true;
  noHourBranchCalculation: true;
  noIdentityRecalculation: true;
  noProductIntegration: true;
  noUiIntegration: true;
  noRendererIntegration: true;
  noStorageWrite: true;
}>;

export type ProductionIdentitySourceInputNormalizerInputContract = Readonly<{
  acceptedInputShape: "GREGORIAN_DATE_TIME_WITH_LOCATION_CONTEXT";
  dateInputRequired: true;
  timeInputRequired: true;
  locationContextOptional: true;
  dateFormat: "ISO_GREGORIAN_DATE";
  timeFormat: "LOCAL_CLOCK_TIME";
  locationRole: "BIRTH_LOCATION_CONTEXT_ONLY";
  rawInputPersisted: false;
}>;

export type ProductionIdentitySourceInputNormalizerOutputContract = Readonly<{
  outputReferenceType: "FORMAL_IDENTITY_SOURCE_NORMALIZATION_REFERENCE";
  calendarResolutionSource:
    "GREGORIAN_TO_CHINESE_LUNISOLAR_EXISTING_ENGINE";
  timeResolutionSource: "LOCAL_BIRTH_TIME_TO_HOUR_BRANCH_EXISTING_ENGINE";
  lunarDateIsCanonicalCalculationInput: true;
  locationContextPreserved: true;
  locationExcludedFromStarBeastDerivation: true;
  locationExcludedFromMotherCodeDerivation: true;
  outputIsNotIdentityResult: true;
  outputIsReferenceOnly: true;
}>;

export type ProductionIdentitySourceInputNormalizerErrorContract = Readonly<{
  missingDate: "UNAVAILABLE";
  missingTime: "UNAVAILABLE";
  invalidDate: "BLOCKED";
  invalidTime: "BLOCKED";
  invalidLocationContext: "BLOCKED";
  calendarEngineUnavailable: "UNAVAILABLE";
  hourBranchEngineUnavailable: "UNAVAILABLE";
}>;

export type ProductionIdentitySourceInputNormalizerContractReference =
  Readonly<{
    referenceType: "FORMAL_IDENTITY_SOURCE_INPUT_NORMALIZER_CONTRACT";
    referenceId: string;
    contractVersion: "V1";
    reviewReference: NonNullable<
      Extract<
        ProductionIdentitySourceInputNormalizationReviewResult,
        { status: "READY" }
      >["normalizationReference"]
    >;
    inputContract: ProductionIdentitySourceInputNormalizerInputContract;
    outputContract: ProductionIdentitySourceInputNormalizerOutputContract;
    errorContract: ProductionIdentitySourceInputNormalizerErrorContract;
    contractOnly: true;
    referenceOnly: true;
    noRawUserData: true;
    noUserInputBinding: true;
    noCalendarCalculation: true;
    noHourBranchCalculation: true;
    noIdentityRecalculation: true;
    noProductIntegration: true;
    noUiIntegration: true;
    noRendererIntegration: true;
    noStorageWrite: true;
  }>;

export type ProductionIdentitySourceInputNormalizerContractReady = Readonly<{
  status: "READY";
  contractStatus: "FORMAL_INPUT_NORMALIZER_CONTRACT_READY";
  source: "production_identity_source_input_normalizer_contract";
  input: ProductionIdentitySourceInputNormalizerContractInput;
  contractReference: ProductionIdentitySourceInputNormalizerContractReference;
  boundary: ProductionIdentitySourceInputNormalizerContractBoundary;
}>;

export type ProductionIdentitySourceInputNormalizerContractUnavailable = Readonly<{
  status: "UNAVAILABLE";
  contractStatus: "UNAVAILABLE";
  source: "production_identity_source_input_normalizer_contract";
  reason: ProductionIdentitySourceInputNormalizerContractUnavailableReason;
  input: ProductionIdentitySourceInputNormalizerContractInput;
  contractReference: null;
  boundary: ProductionIdentitySourceInputNormalizerContractBoundary;
}>;

export type ProductionIdentitySourceInputNormalizerContractBlocked = Readonly<{
  status: "BLOCKED";
  contractStatus: "BLOCKED";
  source: "production_identity_source_input_normalizer_contract";
  reason: ProductionIdentitySourceInputNormalizerContractBlockedReason;
  input: ProductionIdentitySourceInputNormalizerContractInput;
  contractReference: null;
  boundary: ProductionIdentitySourceInputNormalizerContractBoundary;
}>;

export type ProductionIdentitySourceInputNormalizerContractResult =
  | ProductionIdentitySourceInputNormalizerContractReady
  | ProductionIdentitySourceInputNormalizerContractUnavailable
  | ProductionIdentitySourceInputNormalizerContractBlocked;
