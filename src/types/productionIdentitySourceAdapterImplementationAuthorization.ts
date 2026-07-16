import type { ProductionIdentitySourceAdapterBridgeImplementationContractResult } from "./productionIdentitySourceAdapterBridgeImplementationContract";

export type ProductionIdentitySourceAdapterImplementationAuthorizationInput = Readonly<{
  contractResult: ProductionIdentitySourceAdapterBridgeImplementationContractResult | null;
}>;

export type ProductionIdentitySourceAdapterImplementationAuthorizationUnavailableReason =
  | "CONTRACT_RESULT_REQUIRED"
  | "CONTRACT_RESULT_UNAVAILABLE";

export type ProductionIdentitySourceAdapterImplementationAuthorizationBlockedReason =
  | "CONTRACT_RESULT_BLOCKED"
  | "CONTRACT_BOUNDARY_INVALID"
  | "CONTRACT_REFERENCE_INVALID";

export type ProductionIdentitySourceAdapterImplementationAuthorizationBoundary = Readonly<{
  authorizationReviewOnly: true;
  isolatedImplementationOnly: true;
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

export type ProductionIdentitySourceAdapterImplementationAuthorizationReference = Readonly<{
  referenceType: "FORMAL_IDENTITY_SOURCE_ADAPTER_ISOLATED_IMPLEMENTATION_AUTHORIZATION";
  referenceId: string;
  contractReference: Extract<
    ProductionIdentitySourceAdapterBridgeImplementationContractResult,
    { status: "READY" }
  >["contractReference"];
  authorizationScope: "ISOLATED_FORMAL_IDENTITY_SOURCE_ADAPTER_IMPLEMENTATION_ONLY";
  implementationAuthorization: "AUTHORIZED_FOR_ISOLATED_ADAPTER_IMPLEMENTATION";
  userBindingAuthorization: false;
  productIntegrationAuthorization: false;
  adapterInvocation: "NOT_PERFORMED";
  engineInvocation: "NOT_PERFORMED";
  referenceOnly: true;
  noRendererInvocation: true;
  noStorageWrite: true;
  noIdentityRecalculation: true;
  noLifeStateMutation: true;
}>;

export type ProductionIdentitySourceAdapterImplementationAuthorizationAuthorized = Readonly<{
  status: "AUTHORIZED";
  authorization: "AUTHORIZED_FOR_ISOLATED_ADAPTER_IMPLEMENTATION";
  source: "production_identity_source_adapter_implementation_authorization";
  input: ProductionIdentitySourceAdapterImplementationAuthorizationInput;
  authorizationReference: ProductionIdentitySourceAdapterImplementationAuthorizationReference;
  boundary: ProductionIdentitySourceAdapterImplementationAuthorizationBoundary;
}>;

export type ProductionIdentitySourceAdapterImplementationAuthorizationUnavailable = Readonly<{
  status: "UNAVAILABLE";
  authorization: "UNAVAILABLE";
  source: "production_identity_source_adapter_implementation_authorization";
  reason: ProductionIdentitySourceAdapterImplementationAuthorizationUnavailableReason;
  input: ProductionIdentitySourceAdapterImplementationAuthorizationInput;
  authorizationReference: null;
  boundary: ProductionIdentitySourceAdapterImplementationAuthorizationBoundary;
}>;

export type ProductionIdentitySourceAdapterImplementationAuthorizationBlocked = Readonly<{
  status: "BLOCKED";
  authorization: "BLOCKED";
  source: "production_identity_source_adapter_implementation_authorization";
  reason: ProductionIdentitySourceAdapterImplementationAuthorizationBlockedReason;
  input: ProductionIdentitySourceAdapterImplementationAuthorizationInput;
  authorizationReference: null;
  boundary: ProductionIdentitySourceAdapterImplementationAuthorizationBoundary;
}>;

export type ProductionIdentitySourceAdapterImplementationAuthorizationResult =
  | ProductionIdentitySourceAdapterImplementationAuthorizationAuthorized
  | ProductionIdentitySourceAdapterImplementationAuthorizationUnavailable
  | ProductionIdentitySourceAdapterImplementationAuthorizationBlocked;
