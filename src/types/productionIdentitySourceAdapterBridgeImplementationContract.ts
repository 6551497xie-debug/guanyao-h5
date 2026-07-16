import type { ProductionIdentitySourceAdapterBridgeImplementationReadinessResult } from "./productionIdentitySourceAdapterBridgeImplementationReadiness";

export type ProductionIdentitySourceAdapterBridgeImplementationContractInput = Readonly<{
  readinessResult: ProductionIdentitySourceAdapterBridgeImplementationReadinessResult | null;
}>;

export type ProductionIdentitySourceAdapterBridgeImplementationContractUnavailableReason =
  | "READINESS_RESULT_REQUIRED"
  | "READINESS_RESULT_UNAVAILABLE";

export type ProductionIdentitySourceAdapterBridgeImplementationContractBlockedReason =
  | "READINESS_RESULT_BLOCKED"
  | "READINESS_BOUNDARY_INVALID"
  | "READINESS_REFERENCE_INVALID";

export type ProductionIdentitySourceAdapterBridgeImplementationContractBoundary =
  Readonly<{
    contractOnly: true;
    referenceOnly: true;
    noAdapterInvocation: true;
    noEngineInvocation: true;
    noUserInputBinding: true;
    noProductIntegration: true;
    noRendererInvocation: true;
    noStorageWrite: true;
    noIdentityRecalculation: true;
    noLifeStateMutation: true;
  }>;

export type ProductionIdentitySourceAdapterBridgeImplementationContractReference =
  Readonly<{
    referenceType: "FORMAL_IDENTITY_SOURCE_ADAPTER_INPUT_CONSUMPTION_CONTRACT";
    referenceId: string;
    readinessReference: Extract<
      ProductionIdentitySourceAdapterBridgeImplementationReadinessResult,
      { status: "READY" }
    >["implementationReference"];
    inputShape: "NORMALIZED_LUNAR_DATE_HOUR_BRANCH_WITH_LOCATION_CONTEXT_REFERENCE";
    sourceMapping: Readonly<{
      lunarBirthDate: "NORMALIZED_REFERENCE_LUNAR_BIRTH_DATE";
      hourBranch: "NORMALIZED_REFERENCE_HOUR_BRANCH";
      hourBranchOrdinal: "NORMALIZED_REFERENCE_HOUR_BRANCH_ORDINAL";
      locationContext: "NORMALIZED_REFERENCE_LOCATION_CONTEXT_ONLY";
    }>;
    contractOnly: true;
    referenceOnly: true;
    adapterInvocation: "NOT_PERFORMED";
    engineInvocation: "NOT_PERFORMED";
    noUserInputBinding: true;
    noProductIntegration: true;
    noRendererInvocation: true;
    noStorageWrite: true;
    noIdentityRecalculation: true;
    noLifeStateMutation: true;
  }>;

export type ProductionIdentitySourceAdapterBridgeImplementationContractReady = Readonly<{
  status: "READY";
  contractStatus: "FORMAL_IDENTITY_SOURCE_ADAPTER_INPUT_CONSUMPTION_CONTRACT_READY";
  source: "production_identity_source_adapter_bridge_implementation_contract";
  input: ProductionIdentitySourceAdapterBridgeImplementationContractInput;
  contractReference: ProductionIdentitySourceAdapterBridgeImplementationContractReference;
  boundary: ProductionIdentitySourceAdapterBridgeImplementationContractBoundary;
}>;

export type ProductionIdentitySourceAdapterBridgeImplementationContractUnavailable = Readonly<{
  status: "UNAVAILABLE";
  contractStatus: "UNAVAILABLE";
  source: "production_identity_source_adapter_bridge_implementation_contract";
  reason: ProductionIdentitySourceAdapterBridgeImplementationContractUnavailableReason;
  input: ProductionIdentitySourceAdapterBridgeImplementationContractInput;
  contractReference: null;
  boundary: ProductionIdentitySourceAdapterBridgeImplementationContractBoundary;
}>;

export type ProductionIdentitySourceAdapterBridgeImplementationContractBlocked = Readonly<{
  status: "BLOCKED";
  contractStatus: "BLOCKED";
  source: "production_identity_source_adapter_bridge_implementation_contract";
  reason: ProductionIdentitySourceAdapterBridgeImplementationContractBlockedReason;
  input: ProductionIdentitySourceAdapterBridgeImplementationContractInput;
  contractReference: null;
  boundary: ProductionIdentitySourceAdapterBridgeImplementationContractBoundary;
}>;

export type ProductionIdentitySourceAdapterBridgeImplementationContractResult =
  | ProductionIdentitySourceAdapterBridgeImplementationContractReady
  | ProductionIdentitySourceAdapterBridgeImplementationContractUnavailable
  | ProductionIdentitySourceAdapterBridgeImplementationContractBlocked;
