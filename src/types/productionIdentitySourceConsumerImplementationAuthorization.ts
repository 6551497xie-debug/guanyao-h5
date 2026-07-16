import type {
  ProductionIdentitySourceConsumerContractReference,
  ProductionIdentitySourceConsumerContractResult,
} from "./productionIdentitySourceConsumerContract";

export type ProductionIdentitySourceConsumerImplementationAuthorizationInput =
  Readonly<{
    contractResult: ProductionIdentitySourceConsumerContractResult | null;
  }>;

export type ProductionIdentitySourceConsumerImplementationAuthorizationUnavailableReason =
  | "CONTRACT_RESULT_REQUIRED"
  | "CONTRACT_RESULT_UNAVAILABLE";

export type ProductionIdentitySourceConsumerImplementationAuthorizationBlockedReason =
  | "CONTRACT_RESULT_BLOCKED"
  | "CONTRACT_RESULT_INVALID"
  | "CONTRACT_BOUNDARY_INVALID"
  | "AUTHORIZATION_REFERENCE_INVALID";

export type ProductionIdentitySourceConsumerImplementationAuthorizationBoundary =
  Readonly<{
    authorizationOnly: true;
    referenceOnly: true;
    noConsumerCreation: true;
    noRealUserBinding: true;
    noUiIntegration: true;
    noProductRuntimeIntegration: true;
    noRendererIntegration: true;
    noStorageWrite: true;
    noSourceMutation: true;
  }>;

export type ProductionIdentitySourceConsumerImplementationAuthorizationReference =
  Readonly<{
    referenceType: "FORMAL_IDENTITY_SOURCE_CONSUMER_IMPLEMENTATION_AUTHORIZATION";
    referenceId: string;
    authorizationScope: "FUTURE_FORMAL_IDENTITY_SOURCE_CONSUMER_IMPLEMENTATION_ONLY";
    contractReference: ProductionIdentitySourceConsumerContractReference;
    productConsumptionQualified: true;
    authorizationOnly: true;
    referenceOnly: true;
    noConsumerCreation: true;
    noRealUserBinding: true;
    noUiIntegration: true;
    noProductRuntimeIntegration: true;
    noRendererIntegration: true;
    noStorageWrite: true;
    noSourceMutation: true;
  }>;

export type ProductionIdentitySourceConsumerImplementationAuthorizationAuthorized =
  Readonly<{
    status: "AUTHORIZED";
    authorizationStatus: "AUTHORIZED_FOR_FORMAL_IDENTITY_SOURCE_CONSUMER_IMPLEMENTATION_REVIEW";
    source: "production_identity_source_consumer_implementation_authorization";
    input: ProductionIdentitySourceConsumerImplementationAuthorizationInput;
    authorizationReference: ProductionIdentitySourceConsumerImplementationAuthorizationReference;
    boundary: ProductionIdentitySourceConsumerImplementationAuthorizationBoundary;
  }>;

export type ProductionIdentitySourceConsumerImplementationAuthorizationUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    authorizationStatus: "UNAVAILABLE";
    source: "production_identity_source_consumer_implementation_authorization";
    reason: ProductionIdentitySourceConsumerImplementationAuthorizationUnavailableReason;
    input: ProductionIdentitySourceConsumerImplementationAuthorizationInput;
    authorizationReference: null;
    boundary: ProductionIdentitySourceConsumerImplementationAuthorizationBoundary;
  }>;

export type ProductionIdentitySourceConsumerImplementationAuthorizationBlocked =
  Readonly<{
    status: "BLOCKED";
    authorizationStatus: "BLOCKED";
    source: "production_identity_source_consumer_implementation_authorization";
    reason: ProductionIdentitySourceConsumerImplementationAuthorizationBlockedReason;
    input: ProductionIdentitySourceConsumerImplementationAuthorizationInput;
    authorizationReference: null;
    boundary: ProductionIdentitySourceConsumerImplementationAuthorizationBoundary;
  }>;

export type ProductionIdentitySourceConsumerImplementationAuthorizationResult =
  | ProductionIdentitySourceConsumerImplementationAuthorizationAuthorized
  | ProductionIdentitySourceConsumerImplementationAuthorizationUnavailable
  | ProductionIdentitySourceConsumerImplementationAuthorizationBlocked;
