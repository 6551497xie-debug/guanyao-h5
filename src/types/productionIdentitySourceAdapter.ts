import type {
  ProductionIdentitySourceAdapterReadinessBlocked,
  ProductionIdentitySourceAdapterReadinessResult,
  ProductionIdentitySourceAdapterReadinessUnavailable,
  ProductionIdentitySourceAdapterReadinessReady,
  ProductionIdentitySourceAdapterReference,
} from "./productionIdentitySourceAdapterReadiness";

export type ProductionIdentitySourceAdapterInput = Readonly<{
  readinessResult: ProductionIdentitySourceAdapterReadinessResult | null;
}>;

export type ProductionIdentitySourceAdapterUnavailableReason =
  | "READINESS_RESULT_REQUIRED"
  | "SOURCE_READINESS_UNAVAILABLE";

export type ProductionIdentitySourceAdapterBlockedReason =
  | "SOURCE_READINESS_BLOCKED"
  | "READINESS_RESULT_INVALID"
  | "READINESS_BOUNDARY_INVALID"
  | "IDENTITY_ENTRY_REFERENCE_INVALID"
  | "SOURCE_ENTRY_REFERENCE_DRIFT";

export type ProductionIdentitySourceAdapterBoundary = Readonly<{
  adapterOnly: true;
  referenceOnly: true;
  noIdentityRecalculation: true;
  noUserInputBinding: true;
  noProductIntegration: true;
  noSceneModelCreation: true;
  noRendererInvocation: true;
  noLifeStateMutation: true;
  noStorageWrite: true;
}>;

export type ProductionIdentitySourceAdapterFormalReference = Readonly<{
  referenceType: "FORMAL_IDENTITY_SOURCE_ADAPTER_ENTRY";
  referenceId: string;
  sourceRole: "FORMAL_LIFE_IDENTITY_SOURCE";
  sourceReadinessReference: ProductionIdentitySourceAdapterReadinessReady;
  identitySourceEntryReference: ProductionIdentitySourceAdapterReference;
  adapterOnly: true;
  referenceOnly: true;
  noIdentityRecalculation: true;
  noUserInputBinding: true;
  noProductIntegration: true;
  noSceneModelCreation: true;
  noRendererInvocation: true;
  noLifeStateMutation: true;
  noStorageWrite: true;
}>;

export type ProductionIdentitySourceAdapterAvailable = Readonly<{
  status: "AVAILABLE";
  adapterStatus: "FORMAL_IDENTITY_SOURCE_ADAPTER_READY";
  source: "production_identity_source_adapter";
  input: ProductionIdentitySourceAdapterInput;
  adapterReference: ProductionIdentitySourceAdapterFormalReference;
  boundary: ProductionIdentitySourceAdapterBoundary;
}>;

export type ProductionIdentitySourceAdapterUnavailable = Readonly<{
  status: "UNAVAILABLE";
  adapterStatus: "UNAVAILABLE";
  source: "production_identity_source_adapter";
  reason: ProductionIdentitySourceAdapterUnavailableReason;
  input: ProductionIdentitySourceAdapterInput;
  adapterReference: null;
  boundary: ProductionIdentitySourceAdapterBoundary;
}>;

export type ProductionIdentitySourceAdapterBlocked = Readonly<{
  status: "BLOCKED";
  adapterStatus: "BLOCKED";
  source: "production_identity_source_adapter";
  reason: ProductionIdentitySourceAdapterBlockedReason;
  input: ProductionIdentitySourceAdapterInput;
  adapterReference: null;
  boundary: ProductionIdentitySourceAdapterBoundary;
}>;

export type ProductionIdentitySourceAdapterResult =
  | ProductionIdentitySourceAdapterAvailable
  | ProductionIdentitySourceAdapterUnavailable
  | ProductionIdentitySourceAdapterBlocked;

export type ProductionIdentitySourceAdapterSourceReadinessUnavailable =
  ProductionIdentitySourceAdapterReadinessUnavailable;

export type ProductionIdentitySourceAdapterSourceReadinessBlocked =
  ProductionIdentitySourceAdapterReadinessBlocked;
