import type { ProductionIdentitySourceNormalizedReferenceAdapterResult } from "./productionIdentitySourceNormalizedReferenceAdapter";

export type ProductionIdentitySourceEngineConsumerReadinessInput = Readonly<{
  adapterResult: ProductionIdentitySourceNormalizedReferenceAdapterResult | null;
}>;

export type ProductionIdentitySourceEngineConsumerReadinessUnavailableReason =
  | "ADAPTER_RESULT_REQUIRED"
  | "ADAPTER_RESULT_UNAVAILABLE";

export type ProductionIdentitySourceEngineConsumerReadinessBlockedReason =
  | "ADAPTER_RESULT_BLOCKED"
  | "ADAPTER_BOUNDARY_INVALID"
  | "ADAPTER_REFERENCE_INVALID";

export type ProductionIdentitySourceEngineConsumerReadinessBoundary = Readonly<{
  consumerReadinessOnly: true;
  referenceOnly: true;
  noEngineInvocation: true;
  noUserInputBinding: true;
  noProductIntegration: true;
  noRendererInvocation: true;
  noStorageWrite: true;
  noIdentityRecalculation: true;
  noLifeStateMutation: true;
}>;

export type ProductionIdentitySourceEngineConsumerReadinessReference = Readonly<{
  referenceType: "FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMER_READINESS";
  referenceId: string;
  adapterReference: Extract<
    ProductionIdentitySourceNormalizedReferenceAdapterResult,
    { status: "AVAILABLE" }
  >["adapterReference"];
  consumerScope: "FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION_ONLY";
  inputRole: "FORMAL_IDENTITY_SOURCE_ENGINE_INPUT_REFERENCE";
  engineInvocation: "NOT_PERFORMED";
  productionIntegration: false;
  userBinding: false;
  referenceOnly: true;
  noProductIntegration: true;
  noRendererInvocation: true;
  noStorageWrite: true;
  noIdentityRecalculation: true;
  noLifeStateMutation: true;
}>;

export type ProductionIdentitySourceEngineConsumerReadinessReady = Readonly<{
  status: "READY";
  readiness: "READY_FOR_FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION";
  source: "production_identity_source_engine_consumer_readiness";
  input: ProductionIdentitySourceEngineConsumerReadinessInput;
  consumerReference: ProductionIdentitySourceEngineConsumerReadinessReference;
  boundary: ProductionIdentitySourceEngineConsumerReadinessBoundary;
}>;

export type ProductionIdentitySourceEngineConsumerReadinessUnavailable = Readonly<{
  status: "UNAVAILABLE";
  readiness: "UNAVAILABLE";
  source: "production_identity_source_engine_consumer_readiness";
  reason: ProductionIdentitySourceEngineConsumerReadinessUnavailableReason;
  input: ProductionIdentitySourceEngineConsumerReadinessInput;
  consumerReference: null;
  boundary: ProductionIdentitySourceEngineConsumerReadinessBoundary;
}>;

export type ProductionIdentitySourceEngineConsumerReadinessBlocked = Readonly<{
  status: "BLOCKED";
  readiness: "BLOCKED";
  source: "production_identity_source_engine_consumer_readiness";
  reason: ProductionIdentitySourceEngineConsumerReadinessBlockedReason;
  input: ProductionIdentitySourceEngineConsumerReadinessInput;
  consumerReference: null;
  boundary: ProductionIdentitySourceEngineConsumerReadinessBoundary;
}>;

export type ProductionIdentitySourceEngineConsumerReadinessResult =
  | ProductionIdentitySourceEngineConsumerReadinessReady
  | ProductionIdentitySourceEngineConsumerReadinessUnavailable
  | ProductionIdentitySourceEngineConsumerReadinessBlocked;
