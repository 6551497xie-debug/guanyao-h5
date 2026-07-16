import type { ProductionIdentitySourceEngineConsumerReadinessResult } from "./productionIdentitySourceEngineConsumerReadiness";

export type ProductionIdentitySourceEngineConsumerContractInput = Readonly<{
  readinessResult: ProductionIdentitySourceEngineConsumerReadinessResult | null;
}>;

export type ProductionIdentitySourceEngineConsumerContractUnavailableReason =
  | "READINESS_RESULT_REQUIRED"
  | "READINESS_RESULT_UNAVAILABLE";

export type ProductionIdentitySourceEngineConsumerContractBlockedReason =
  | "READINESS_RESULT_BLOCKED"
  | "READINESS_BOUNDARY_INVALID"
  | "READINESS_REFERENCE_INVALID";

export type ProductionIdentitySourceEngineConsumerContractBoundary = Readonly<{
  contractOnly: true;
  referenceOnly: true;
  noEngineInvocation: true;
  noUserInputBinding: true;
  noProductIntegration: true;
  noRendererInvocation: true;
  noStorageWrite: true;
  noIdentityRecalculation: true;
  noLifeStateMutation: true;
}>;

export type ProductionIdentitySourceEngineConsumerContractReference = Readonly<{
  referenceType: "FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION_CONTRACT";
  referenceId: string;
  readinessReference: Extract<
    ProductionIdentitySourceEngineConsumerReadinessResult,
    { status: "READY" }
  >["consumerReference"];
  inputShape: "FORMAL_IDENTITY_SOURCE_ENGINE_INPUT_REFERENCE";
  sourceMapping: Readonly<{
    lunarBirthDate: "NORMALIZED_REFERENCE_LUNAR_BIRTH_DATE";
    hourBranch: "NORMALIZED_REFERENCE_HOUR_BRANCH";
    hourBranchOrdinal: "NORMALIZED_REFERENCE_HOUR_BRANCH_ORDINAL";
    locationContext: "NORMALIZED_REFERENCE_LOCATION_CONTEXT_ONLY";
  }>;
  consumerScope: "FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION_ONLY";
  contractOnly: true;
  referenceOnly: true;
  engineInvocation: "NOT_PERFORMED";
  productionIntegration: false;
  userBinding: false;
  noProductIntegration: true;
  noRendererInvocation: true;
  noStorageWrite: true;
  noIdentityRecalculation: true;
  noLifeStateMutation: true;
}>;

export type ProductionIdentitySourceEngineConsumerContractReady = Readonly<{
  status: "READY";
  contractStatus: "FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION_CONTRACT_READY";
  source: "production_identity_source_engine_consumer_contract";
  input: ProductionIdentitySourceEngineConsumerContractInput;
  contractReference: ProductionIdentitySourceEngineConsumerContractReference;
  boundary: ProductionIdentitySourceEngineConsumerContractBoundary;
}>;

export type ProductionIdentitySourceEngineConsumerContractUnavailable = Readonly<{
  status: "UNAVAILABLE";
  contractStatus: "UNAVAILABLE";
  source: "production_identity_source_engine_consumer_contract";
  reason: ProductionIdentitySourceEngineConsumerContractUnavailableReason;
  input: ProductionIdentitySourceEngineConsumerContractInput;
  contractReference: null;
  boundary: ProductionIdentitySourceEngineConsumerContractBoundary;
}>;

export type ProductionIdentitySourceEngineConsumerContractBlocked = Readonly<{
  status: "BLOCKED";
  contractStatus: "BLOCKED";
  source: "production_identity_source_engine_consumer_contract";
  reason: ProductionIdentitySourceEngineConsumerContractBlockedReason;
  input: ProductionIdentitySourceEngineConsumerContractInput;
  contractReference: null;
  boundary: ProductionIdentitySourceEngineConsumerContractBoundary;
}>;

export type ProductionIdentitySourceEngineConsumerContractResult =
  | ProductionIdentitySourceEngineConsumerContractReady
  | ProductionIdentitySourceEngineConsumerContractUnavailable
  | ProductionIdentitySourceEngineConsumerContractBlocked;
