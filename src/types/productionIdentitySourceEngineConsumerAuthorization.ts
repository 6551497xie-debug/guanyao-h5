import type { ProductionIdentitySourceEngineConsumerContractResult } from "./productionIdentitySourceEngineConsumerContract";

export type ProductionIdentitySourceEngineConsumerAuthorizationInput = Readonly<{
  contractResult: ProductionIdentitySourceEngineConsumerContractResult | null;
}>;

export type ProductionIdentitySourceEngineConsumerAuthorizationUnavailableReason =
  | "CONTRACT_RESULT_REQUIRED"
  | "CONTRACT_RESULT_UNAVAILABLE";

export type ProductionIdentitySourceEngineConsumerAuthorizationBlockedReason =
  | "CONTRACT_RESULT_BLOCKED"
  | "CONTRACT_BOUNDARY_INVALID"
  | "CONTRACT_REFERENCE_INVALID";

export type ProductionIdentitySourceEngineConsumerAuthorizationBoundary = Readonly<{
  authorizationReviewOnly: true;
  isolatedEngineConsumptionOnly: true;
  referenceOnly: true;
  noEngineInvocation: true;
  noUserInputBinding: true;
  noProductIntegration: true;
  noRendererInvocation: true;
  noStorageWrite: true;
  noIdentityRecalculation: true;
  noLifeStateMutation: true;
}>;

export type ProductionIdentitySourceEngineConsumerAuthorizationReference = Readonly<{
  referenceType: "FORMAL_IDENTITY_SOURCE_ENGINE_ISOLATED_CONSUMPTION_AUTHORIZATION";
  referenceId: string;
  contractReference: Extract<
    ProductionIdentitySourceEngineConsumerContractResult,
    { status: "READY" }
  >["contractReference"];
  authorizationScope: "ISOLATED_FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION_ONLY";
  engineConsumptionAuthorization: "AUTHORIZED_FOR_ISOLATED_ENGINE_CONSUMPTION";
  userBindingAuthorization: false;
  productIntegrationAuthorization: false;
  engineInvocation: "NOT_PERFORMED";
  referenceOnly: true;
  noRendererInvocation: true;
  noStorageWrite: true;
  noIdentityRecalculation: true;
  noLifeStateMutation: true;
}>;

export type ProductionIdentitySourceEngineConsumerAuthorizationAuthorized = Readonly<{
  status: "AUTHORIZED";
  authorization: "AUTHORIZED_FOR_ISOLATED_ENGINE_CONSUMPTION";
  source: "production_identity_source_engine_consumer_authorization";
  input: ProductionIdentitySourceEngineConsumerAuthorizationInput;
  authorizationReference: ProductionIdentitySourceEngineConsumerAuthorizationReference;
  boundary: ProductionIdentitySourceEngineConsumerAuthorizationBoundary;
}>;

export type ProductionIdentitySourceEngineConsumerAuthorizationUnavailable = Readonly<{
  status: "UNAVAILABLE";
  authorization: "UNAVAILABLE";
  source: "production_identity_source_engine_consumer_authorization";
  reason: ProductionIdentitySourceEngineConsumerAuthorizationUnavailableReason;
  input: ProductionIdentitySourceEngineConsumerAuthorizationInput;
  authorizationReference: null;
  boundary: ProductionIdentitySourceEngineConsumerAuthorizationBoundary;
}>;

export type ProductionIdentitySourceEngineConsumerAuthorizationBlocked = Readonly<{
  status: "BLOCKED";
  authorization: "BLOCKED";
  source: "production_identity_source_engine_consumer_authorization";
  reason: ProductionIdentitySourceEngineConsumerAuthorizationBlockedReason;
  input: ProductionIdentitySourceEngineConsumerAuthorizationInput;
  authorizationReference: null;
  boundary: ProductionIdentitySourceEngineConsumerAuthorizationBoundary;
}>;

export type ProductionIdentitySourceEngineConsumerAuthorizationResult =
  | ProductionIdentitySourceEngineConsumerAuthorizationAuthorized
  | ProductionIdentitySourceEngineConsumerAuthorizationUnavailable
  | ProductionIdentitySourceEngineConsumerAuthorizationBlocked;
