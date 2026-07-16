import type { LunarMotherCodeLandingResult } from "./guanyaoLunarMotherCode";
import type { StarbeastDerivationReady } from "./guanyaoStarbeast";
import type { ProductionIdentitySourceEngineConsumptionResult } from "./productionIdentitySourceEngineConsumption";

export type ProductionIdentitySourceConvergenceReadinessInput = Readonly<{
  engineConsumptionResult: ProductionIdentitySourceEngineConsumptionResult | null;
}>;

export type ProductionIdentitySourceConvergenceReadinessUnavailableReason =
  | "ENGINE_CONSUMPTION_RESULT_REQUIRED"
  | "ENGINE_CONSUMPTION_RESULT_UNAVAILABLE";

export type ProductionIdentitySourceConvergenceReadinessBlockedReason =
  | "ENGINE_CONSUMPTION_RESULT_BLOCKED"
  | "ENGINE_CONSUMPTION_BOUNDARY_INVALID"
  | "MANSION_SOURCE_NOT_READY"
  | "FOUR_SYMBOL_SOURCE_NOT_READY"
  | "MOTHER_CODE_SOURCE_NOT_READY"
  | "SOURCE_INDEPENDENCE_INVALID"
  | "CONSUMPTION_REFERENCE_INVALID";

export type ProductionIdentitySourceConvergenceReadinessBoundary = Readonly<{
  readinessOnly: true;
  convergenceContractOnly: true;
  referenceOnly: true;
  noEngineInvocation: true;
  noIdentityConvergence: true;
  noPersonalStarBeastCreation: true;
  noUserInputBinding: true;
  noProductIntegration: true;
  noRendererInvocation: true;
  noStorageWrite: true;
  noLifeStateMutation: true;
}>;

export type ProductionIdentitySourceConvergenceReadinessReference = Readonly<{
  referenceType: "FORMAL_IDENTITY_SOURCE_CONVERGENCE_READINESS";
  referenceId: string;
  engineConsumptionReference: Extract<
    ProductionIdentitySourceEngineConsumptionResult,
    { status: "AVAILABLE" }
  >["consumptionReference"];
  mansionSeedReference: StarbeastDerivationReady;
  fourSymbolFieldReference: StarbeastDerivationReady;
  motherCodeForceReference: LunarMotherCodeLandingResult;
  sourceIndependence: Readonly<{
    mansionAndFourSymbolFromSameFormalEngine: true;
    motherCodeFromIndependentFormalEngine: true;
    fourSymbolDoesNotDeriveMotherCode: true;
    motherCodeDoesNotDeriveFourSymbol: true;
  }>;
  convergence: "NOT_PERFORMED";
  personalStarBeastCreation: false;
  productionIntegration: false;
  userBinding: false;
  referenceOnly: true;
}>;

export type ProductionIdentitySourceConvergenceReadinessReady = Readonly<{
  status: "READY";
  readiness: "READY_FOR_FORMAL_IDENTITY_SOURCE_CONVERGENCE";
  source: "production_identity_source_convergence_readiness";
  input: ProductionIdentitySourceConvergenceReadinessInput;
  readinessReference: ProductionIdentitySourceConvergenceReadinessReference;
  boundary: ProductionIdentitySourceConvergenceReadinessBoundary;
}>;

export type ProductionIdentitySourceConvergenceReadinessUnavailable = Readonly<{
  status: "UNAVAILABLE";
  readiness: "UNAVAILABLE";
  source: "production_identity_source_convergence_readiness";
  reason: ProductionIdentitySourceConvergenceReadinessUnavailableReason;
  input: ProductionIdentitySourceConvergenceReadinessInput;
  readinessReference: null;
  boundary: ProductionIdentitySourceConvergenceReadinessBoundary;
}>;

export type ProductionIdentitySourceConvergenceReadinessBlocked = Readonly<{
  status: "BLOCKED";
  readiness: "BLOCKED";
  source: "production_identity_source_convergence_readiness";
  reason: ProductionIdentitySourceConvergenceReadinessBlockedReason;
  input: ProductionIdentitySourceConvergenceReadinessInput;
  readinessReference: null;
  boundary: ProductionIdentitySourceConvergenceReadinessBoundary;
}>;

export type ProductionIdentitySourceConvergenceReadinessResult =
  | ProductionIdentitySourceConvergenceReadinessReady
  | ProductionIdentitySourceConvergenceReadinessUnavailable
  | ProductionIdentitySourceConvergenceReadinessBlocked;
