import type { ProductionIdentitySourceAdapterImplementationAuthorizationResult } from "./productionIdentitySourceAdapterImplementationAuthorization";
import type { ProductionIdentitySourceAdapterBridgeImplementationContractResult } from "./productionIdentitySourceAdapterBridgeImplementationContract";

export type ProductionIdentitySourceNormalizedReferenceAdapterInput = Readonly<{
  authorizationResult: ProductionIdentitySourceAdapterImplementationAuthorizationResult | null;
  contractResult: ProductionIdentitySourceAdapterBridgeImplementationContractResult | null;
}>;

export type ProductionIdentitySourceNormalizedReferenceAdapterUnavailableReason =
  | "AUTHORIZATION_RESULT_REQUIRED"
  | "AUTHORIZATION_RESULT_UNAVAILABLE"
  | "CONTRACT_RESULT_REQUIRED"
  | "CONTRACT_RESULT_UNAVAILABLE";

export type ProductionIdentitySourceNormalizedReferenceAdapterBlockedReason =
  | "AUTHORIZATION_RESULT_BLOCKED"
  | "AUTHORIZATION_BOUNDARY_INVALID"
  | "CONTRACT_RESULT_BLOCKED"
  | "CONTRACT_BOUNDARY_INVALID"
  | "AUTHORIZATION_CONTRACT_REFERENCE_MISMATCH";

export type ProductionIdentitySourceNormalizedReferenceAdapterBoundary = Readonly<{
  adapterOnly: true;
  isolatedImplementationOnly: true;
  referenceOnly: true;
  noEngineInvocation: true;
  noUserInputBinding: true;
  noProductIntegration: true;
  noRendererInvocation: true;
  noStorageWrite: true;
  noIdentityRecalculation: true;
  noLifeStateMutation: true;
}>;

export type ProductionIdentitySourceNormalizedReferenceAdapterReference = Readonly<{
  referenceType: "ISOLATED_FORMAL_IDENTITY_SOURCE_ADAPTER_OUTPUT";
  referenceId: string;
  sourceContractReference: Extract<
    ProductionIdentitySourceAdapterBridgeImplementationContractResult,
    { status: "READY" }
  >["contractReference"];
  normalizedReference: Extract<
    ProductionIdentitySourceAdapterBridgeImplementationContractResult,
    { status: "READY" }
  >["contractReference"]["readinessReference"]["sourceBridgeReviewReference"]["normalizedReference"];
  adapterScope: "ISOLATED_FORMAL_IDENTITY_SOURCE_ADAPTER_ONLY";
  outputRole: "FORMAL_IDENTITY_SOURCE_ENGINE_INPUT_REFERENCE";
  referenceOnly: true;
  noEngineInvocation: true;
  noUserInputBinding: true;
  noProductIntegration: true;
  noRendererInvocation: true;
  noStorageWrite: true;
  noIdentityRecalculation: true;
  noLifeStateMutation: true;
}>;

export type ProductionIdentitySourceNormalizedReferenceAdapterAvailable = Readonly<{
  status: "AVAILABLE";
  adapterStatus: "ISOLATED_FORMAL_IDENTITY_SOURCE_ADAPTER_AVAILABLE";
  source: "production_identity_source_normalized_reference_adapter";
  input: ProductionIdentitySourceNormalizedReferenceAdapterInput;
  adapterReference: ProductionIdentitySourceNormalizedReferenceAdapterReference;
  boundary: ProductionIdentitySourceNormalizedReferenceAdapterBoundary;
}>;

export type ProductionIdentitySourceNormalizedReferenceAdapterUnavailable = Readonly<{
  status: "UNAVAILABLE";
  adapterStatus: "UNAVAILABLE";
  source: "production_identity_source_normalized_reference_adapter";
  reason: ProductionIdentitySourceNormalizedReferenceAdapterUnavailableReason;
  input: ProductionIdentitySourceNormalizedReferenceAdapterInput;
  adapterReference: null;
  boundary: ProductionIdentitySourceNormalizedReferenceAdapterBoundary;
}>;

export type ProductionIdentitySourceNormalizedReferenceAdapterBlocked = Readonly<{
  status: "BLOCKED";
  adapterStatus: "BLOCKED";
  source: "production_identity_source_normalized_reference_adapter";
  reason: ProductionIdentitySourceNormalizedReferenceAdapterBlockedReason;
  input: ProductionIdentitySourceNormalizedReferenceAdapterInput;
  adapterReference: null;
  boundary: ProductionIdentitySourceNormalizedReferenceAdapterBoundary;
}>;

export type ProductionIdentitySourceNormalizedReferenceAdapterResult =
  | ProductionIdentitySourceNormalizedReferenceAdapterAvailable
  | ProductionIdentitySourceNormalizedReferenceAdapterUnavailable
  | ProductionIdentitySourceNormalizedReferenceAdapterBlocked;
