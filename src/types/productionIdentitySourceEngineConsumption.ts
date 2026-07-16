import type { ProductionIdentitySourceEngineConsumerAuthorizationResult } from "./productionIdentitySourceEngineConsumerAuthorization";
import type { ProductionIdentitySourceEngineConsumerContractResult } from "./productionIdentitySourceEngineConsumerContract";
import type { LunarMotherCodeLandingResult } from "./guanyaoLunarMotherCode";
import type { StarbeastDerivationResult } from "./guanyaoStarbeast";
import type { ProductionIdentitySourceNormalizedReferenceAdapterResult } from "./productionIdentitySourceNormalizedReferenceAdapter";

export type ProductionIdentitySourceEngineConsumptionInput = Readonly<{
  authorizationResult: ProductionIdentitySourceEngineConsumerAuthorizationResult | null;
  contractResult: ProductionIdentitySourceEngineConsumerContractResult | null;
  adapterResult: ProductionIdentitySourceNormalizedReferenceAdapterResult | null;
}>;

export type ProductionIdentitySourceEngineConsumptionUnavailableReason =
  | "AUTHORIZATION_RESULT_REQUIRED"
  | "AUTHORIZATION_RESULT_UNAVAILABLE"
  | "CONTRACT_RESULT_REQUIRED"
  | "CONTRACT_RESULT_UNAVAILABLE"
  | "ADAPTER_RESULT_REQUIRED"
  | "ADAPTER_RESULT_UNAVAILABLE";

export type ProductionIdentitySourceEngineConsumptionBlockedReason =
  | "AUTHORIZATION_RESULT_BLOCKED"
  | "AUTHORIZATION_BOUNDARY_INVALID"
  | "CONTRACT_RESULT_BLOCKED"
  | "CONTRACT_BOUNDARY_INVALID"
  | "ADAPTER_RESULT_BLOCKED"
  | "ADAPTER_BOUNDARY_INVALID"
  | "AUTHORIZATION_CONTRACT_MISMATCH"
  | "ADAPTER_CONTRACT_MISMATCH"
  | "NORMALIZED_DATE_REFERENCE_INVALID"
  | "MANSION_ENGINE_NOT_READY"
  | "MOTHER_CODE_ENGINE_NOT_READY";

export type ProductionIdentitySourceEngineConsumptionBoundary = Readonly<{
  engineConsumerOnly: true;
  isolatedExecutionOnly: true;
  referenceOnly: true;
  engineInvocationPerformed: true;
  noUserInputBinding: true;
  noProductIntegration: true;
  noRendererInvocation: true;
  noStorageWrite: true;
  noIdentityConvergence: true;
  noPersonalStarBeastCreation: true;
  noLifeStateMutation: true;
}>;

export type ProductionIdentitySourceEngineConsumptionReference = Readonly<{
  referenceType: "FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION";
  referenceId: string;
  contractReference: Extract<
    ProductionIdentitySourceEngineConsumerContractResult,
    { status: "READY" }
  >["contractReference"];
  mansionEngineResultReference: StarbeastDerivationResult;
  motherCodeEngineResultReference: LunarMotherCodeLandingResult;
  engineInvocation: "PERFORMED_ISOLATED";
  identityConvergence: "NOT_PERFORMED";
  personalStarBeastCreation: false;
  productionIntegration: false;
  userBinding: false;
  referenceOnly: true;
  noRendererInvocation: true;
  noStorageWrite: true;
  noLifeStateMutation: true;
}>;

export type ProductionIdentitySourceEngineConsumptionAvailable = Readonly<{
  status: "AVAILABLE";
  consumptionStatus: "FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION_AVAILABLE";
  source: "production_identity_source_engine_consumption";
  input: ProductionIdentitySourceEngineConsumptionInput;
  consumptionReference: ProductionIdentitySourceEngineConsumptionReference;
  boundary: ProductionIdentitySourceEngineConsumptionBoundary;
}>;

export type ProductionIdentitySourceEngineConsumptionUnavailable = Readonly<{
  status: "UNAVAILABLE";
  consumptionStatus: "UNAVAILABLE";
  source: "production_identity_source_engine_consumption";
  reason: ProductionIdentitySourceEngineConsumptionUnavailableReason;
  input: ProductionIdentitySourceEngineConsumptionInput;
  consumptionReference: null;
  boundary: Omit<ProductionIdentitySourceEngineConsumptionBoundary, "engineInvocationPerformed"> & {
    engineInvocationPerformed: false;
  };
}>;

export type ProductionIdentitySourceEngineConsumptionBlocked = Readonly<{
  status: "BLOCKED";
  consumptionStatus: "BLOCKED";
  source: "production_identity_source_engine_consumption";
  reason: ProductionIdentitySourceEngineConsumptionBlockedReason;
  input: ProductionIdentitySourceEngineConsumptionInput;
  consumptionReference: null;
  boundary: Omit<ProductionIdentitySourceEngineConsumptionBoundary, "engineInvocationPerformed"> & {
    engineInvocationPerformed: false;
  };
}>;

export type ProductionIdentitySourceEngineConsumptionResult =
  | ProductionIdentitySourceEngineConsumptionAvailable
  | ProductionIdentitySourceEngineConsumptionUnavailable
  | ProductionIdentitySourceEngineConsumptionBlocked;
