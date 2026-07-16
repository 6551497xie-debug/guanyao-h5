import type {
  ProductionIdentitySourceInputNormalizerContractResult,
} from "./productionIdentitySourceInputNormalizerContract";

export type ProductionIdentitySourceInputNormalizerImplementationReadinessInput =
  Readonly<{
    contractResult:
      ProductionIdentitySourceInputNormalizerContractResult | null;
  }>;

export type ProductionIdentitySourceInputNormalizerImplementationReadinessUnavailableReason =
  | "CONTRACT_RESULT_REQUIRED"
  | "CONTRACT_RESULT_UNAVAILABLE";

export type ProductionIdentitySourceInputNormalizerImplementationReadinessBlockedReason =
  | "CONTRACT_RESULT_BLOCKED"
  | "CONTRACT_RESULT_INVALID"
  | "CONTRACT_BOUNDARY_INVALID"
  | "IMPLEMENTATION_SCOPE_INVALID";

export type ProductionIdentitySourceInputNormalizerImplementationReadinessBoundary =
  Readonly<{
    readinessOnly: true;
    referenceOnly: true;
    implementationNotStarted: true;
    noRawUserData: true;
    noUserInputBinding: true;
    noProductIntegration: true;
    noUiIntegration: true;
    noRendererIntegration: true;
    noStorageWrite: true;
    noIdentityRecalculation: true;
}>;

export type ProductionIdentitySourceInputNormalizerImplementationScope = Readonly<{
  scope: "FORMAL_INPUT_NORMALIZER_ONLY";
  mayReadExistingCalendarEngine: true;
  mayReadExistingHourBranchEngine: true;
  mayProduceNormalizationReference: true;
  mayCreateIdentityResult: false;
  mayBindRealUser: false;
  mayIntegrateProduct: false;
  mayIntegrateUi: false;
  mayIntegrateRenderer: false;
  mayWriteStorage: false;
}>;

export type ProductionIdentitySourceInputNormalizerImplementationReadinessReference =
  Readonly<{
    referenceType: "FORMAL_IDENTITY_SOURCE_INPUT_NORMALIZER_IMPLEMENTATION_READINESS";
    referenceId: string;
    readinessScope: "FUTURE_FORMAL_INPUT_NORMALIZER_IMPLEMENTATION_ONLY";
    contractReference: NonNullable<
      Extract<
        ProductionIdentitySourceInputNormalizerContractResult,
        { status: "READY" }
      >["contractReference"]
    >;
    implementationScope: ProductionIdentitySourceInputNormalizerImplementationScope;
    readinessOnly: true;
    referenceOnly: true;
    implementationNotStarted: true;
    noRawUserData: true;
    noUserInputBinding: true;
    noProductIntegration: true;
    noUiIntegration: true;
    noRendererIntegration: true;
    noStorageWrite: true;
    noIdentityRecalculation: true;
  }>;

export type ProductionIdentitySourceInputNormalizerImplementationReadinessReady =
  Readonly<{
    status: "READY";
    readiness: "READY_FOR_FORMAL_INPUT_NORMALIZER_IMPLEMENTATION";
    source: "production_identity_source_input_normalizer_implementation_readiness";
    input: ProductionIdentitySourceInputNormalizerImplementationReadinessInput;
    readinessReference: ProductionIdentitySourceInputNormalizerImplementationReadinessReference;
    boundary: ProductionIdentitySourceInputNormalizerImplementationReadinessBoundary;
  }>;

export type ProductionIdentitySourceInputNormalizerImplementationReadinessUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    readiness: "UNAVAILABLE";
    source: "production_identity_source_input_normalizer_implementation_readiness";
    reason: ProductionIdentitySourceInputNormalizerImplementationReadinessUnavailableReason;
    input: ProductionIdentitySourceInputNormalizerImplementationReadinessInput;
    readinessReference: null;
    boundary: ProductionIdentitySourceInputNormalizerImplementationReadinessBoundary;
  }>;

export type ProductionIdentitySourceInputNormalizerImplementationReadinessBlocked =
  Readonly<{
    status: "BLOCKED";
    readiness: "BLOCKED";
    source: "production_identity_source_input_normalizer_implementation_readiness";
    reason: ProductionIdentitySourceInputNormalizerImplementationReadinessBlockedReason;
    input: ProductionIdentitySourceInputNormalizerImplementationReadinessInput;
    readinessReference: null;
    boundary: ProductionIdentitySourceInputNormalizerImplementationReadinessBoundary;
  }>;

export type ProductionIdentitySourceInputNormalizerImplementationReadinessResult =
  | ProductionIdentitySourceInputNormalizerImplementationReadinessReady
  | ProductionIdentitySourceInputNormalizerImplementationReadinessUnavailable
  | ProductionIdentitySourceInputNormalizerImplementationReadinessBlocked;
