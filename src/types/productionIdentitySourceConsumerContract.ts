import type {
  ProductionIdentitySourceConsumerReadinessReady,
  ProductionIdentitySourceConsumerReadinessReference,
  ProductionIdentitySourceConsumerReadinessResult,
} from "./productionIdentitySourceConsumerReadiness";

export type ProductionIdentitySourceConsumerContractInput = Readonly<{
  readinessResult: ProductionIdentitySourceConsumerReadinessResult | null;
}>;

export type ProductionIdentitySourceConsumerContractUnavailableReason =
  | "READINESS_RESULT_REQUIRED"
  | "READINESS_RESULT_UNAVAILABLE";

export type ProductionIdentitySourceConsumerContractBlockedReason =
  | "READINESS_RESULT_BLOCKED"
  | "READINESS_RESULT_INVALID"
  | "READINESS_BOUNDARY_INVALID"
  | "CONTRACT_REFERENCE_INVALID";

export type ProductionIdentitySourceConsumerContractBoundary = Readonly<{
  contractOnly: true;
  referenceOnly: true;
  noConsumerCreation: true;
  noUserInputBinding: true;
  noProductIntegration: true;
  noSourceMutation: true;
  noSceneModelCreation: true;
  noRendererInvocation: true;
  noLifeStateMutation: true;
  noStorageWrite: true;
}>;

export type ProductionIdentitySourceConsumerInputContract = Readonly<{
  acceptedReferenceType: "FORMAL_IDENTITY_SOURCE_CONSUMER_READINESS";
  requiredReadiness: "READY_FOR_FORMAL_IDENTITY_SOURCE_CONSUMER_REVIEW";
  sourceReferenceOnly: true;
  noUserInputBinding: true;
  noProductIntegration: true;
}>;

export type ProductionIdentitySourceConsumerOutputContract = Readonly<{
  outputReferenceType: "FORMAL_IDENTITY_SOURCE_CONSUMPTION_REFERENCE";
  futureConsumerOnly: true;
  referenceOnly: true;
  noIdentityRecalculation: true;
  noSourceMutation: true;
  noSceneModelCreation: true;
  noRendererInvocation: true;
  noStorageWrite: true;
}>;

export type ProductionIdentitySourceConsumerContractReference = Readonly<{
  referenceType: "FORMAL_IDENTITY_SOURCE_CONSUMER_CONTRACT";
  referenceId: string;
  contractVersion: "V1";
  consumerScope: "FUTURE_FORMAL_IDENTITY_CONSUMER_ONLY";
  readinessReference: ProductionIdentitySourceConsumerReadinessReference;
  inputContract: ProductionIdentitySourceConsumerInputContract;
  outputContract: ProductionIdentitySourceConsumerOutputContract;
  contractOnly: true;
  referenceOnly: true;
  noConsumerCreation: true;
  noUserInputBinding: true;
  noProductIntegration: true;
  noSourceMutation: true;
  noSceneModelCreation: true;
  noRendererInvocation: true;
  noLifeStateMutation: true;
  noStorageWrite: true;
}>;

export type ProductionIdentitySourceConsumerContractReady = Readonly<{
  status: "READY";
  contractStatus: "FORMAL_IDENTITY_SOURCE_CONSUMER_CONTRACT_READY";
  source: "production_identity_source_consumer_contract";
  input: ProductionIdentitySourceConsumerContractInput;
  contractReference: ProductionIdentitySourceConsumerContractReference;
  boundary: ProductionIdentitySourceConsumerContractBoundary;
}>;

export type ProductionIdentitySourceConsumerContractUnavailable = Readonly<{
  status: "UNAVAILABLE";
  contractStatus: "UNAVAILABLE";
  source: "production_identity_source_consumer_contract";
  reason: ProductionIdentitySourceConsumerContractUnavailableReason;
  input: ProductionIdentitySourceConsumerContractInput;
  contractReference: null;
  boundary: ProductionIdentitySourceConsumerContractBoundary;
}>;

export type ProductionIdentitySourceConsumerContractBlocked = Readonly<{
  status: "BLOCKED";
  contractStatus: "BLOCKED";
  source: "production_identity_source_consumer_contract";
  reason: ProductionIdentitySourceConsumerContractBlockedReason;
  input: ProductionIdentitySourceConsumerContractInput;
  contractReference: null;
  boundary: ProductionIdentitySourceConsumerContractBoundary;
}>;

export type ProductionIdentitySourceConsumerContractResult =
  | ProductionIdentitySourceConsumerContractReady
  | ProductionIdentitySourceConsumerContractUnavailable
  | ProductionIdentitySourceConsumerContractBlocked;

export type ProductionIdentitySourceConsumerContractReadiness =
  ProductionIdentitySourceConsumerReadinessReady;
