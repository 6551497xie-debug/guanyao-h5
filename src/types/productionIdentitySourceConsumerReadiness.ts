import type {
  ProductionIdentitySourceAdapterAvailable,
  ProductionIdentitySourceAdapterBlocked,
  ProductionIdentitySourceAdapterResult,
  ProductionIdentitySourceAdapterUnavailable,
  ProductionIdentitySourceAdapterFormalReference,
} from "./productionIdentitySourceAdapter";

export type ProductionIdentitySourceConsumerReadinessInput = Readonly<{
  adapterResult: ProductionIdentitySourceAdapterResult | null;
}>;

export type ProductionIdentitySourceConsumerReadinessUnavailableReason =
  | "ADAPTER_RESULT_REQUIRED"
  | "ADAPTER_RESULT_UNAVAILABLE";

export type ProductionIdentitySourceConsumerReadinessBlockedReason =
  | "ADAPTER_RESULT_BLOCKED"
  | "ADAPTER_RESULT_INVALID"
  | "ADAPTER_BOUNDARY_INVALID"
  | "FORMAL_REFERENCE_INVALID"
  | "FORMAL_REFERENCE_DRIFT";

export type ProductionIdentitySourceConsumerReadinessBoundary = Readonly<{
  readinessOnly: true;
  referenceOnly: true;
  noConsumerCreation: true;
  noUserInputBinding: true;
  noProductIntegration: true;
  noSceneModelCreation: true;
  noRendererInvocation: true;
  noLifeStateMutation: true;
  noStorageWrite: true;
}>;

export type ProductionIdentitySourceConsumerReadinessReference = Readonly<{
  referenceType: "FORMAL_IDENTITY_SOURCE_CONSUMER_READINESS";
  referenceId: string;
  consumerScope: "FUTURE_FORMAL_IDENTITY_CONSUMER_ONLY";
  adapterReference: ProductionIdentitySourceAdapterFormalReference;
  readinessOnly: true;
  referenceOnly: true;
  noConsumerCreation: true;
  noUserInputBinding: true;
  noProductIntegration: true;
  noSceneModelCreation: true;
  noRendererInvocation: true;
  noLifeStateMutation: true;
  noStorageWrite: true;
}>;

export type ProductionIdentitySourceConsumerReadinessReady = Readonly<{
  status: "READY";
  readiness: "READY_FOR_FORMAL_IDENTITY_SOURCE_CONSUMER_REVIEW";
  source: "production_identity_source_consumer_readiness";
  input: ProductionIdentitySourceConsumerReadinessInput;
  consumerReadinessReference: ProductionIdentitySourceConsumerReadinessReference;
  boundary: ProductionIdentitySourceConsumerReadinessBoundary;
}>;

export type ProductionIdentitySourceConsumerReadinessUnavailable = Readonly<{
  status: "UNAVAILABLE";
  readiness: "UNAVAILABLE";
  source: "production_identity_source_consumer_readiness";
  reason: ProductionIdentitySourceConsumerReadinessUnavailableReason;
  input: ProductionIdentitySourceConsumerReadinessInput;
  consumerReadinessReference: null;
  boundary: ProductionIdentitySourceConsumerReadinessBoundary;
}>;

export type ProductionIdentitySourceConsumerReadinessBlocked = Readonly<{
  status: "BLOCKED";
  readiness: "BLOCKED";
  source: "production_identity_source_consumer_readiness";
  reason: ProductionIdentitySourceConsumerReadinessBlockedReason;
  input: ProductionIdentitySourceConsumerReadinessInput;
  consumerReadinessReference: null;
  boundary: ProductionIdentitySourceConsumerReadinessBoundary;
}>;

export type ProductionIdentitySourceConsumerReadinessResult =
  | ProductionIdentitySourceConsumerReadinessReady
  | ProductionIdentitySourceConsumerReadinessUnavailable
  | ProductionIdentitySourceConsumerReadinessBlocked;

export type ProductionIdentitySourceConsumerReadinessAdapterAvailable =
  ProductionIdentitySourceAdapterAvailable;

export type ProductionIdentitySourceConsumerReadinessAdapterUnavailable =
  ProductionIdentitySourceAdapterUnavailable;

export type ProductionIdentitySourceConsumerReadinessAdapterBlocked =
  ProductionIdentitySourceAdapterBlocked;
