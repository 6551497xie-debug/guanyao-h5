import type {
  StarBeastRendererExecutionUnfreezeDeclaration,
  StarBeastRendererExecutionUnfreezeDeclarationDeclared,
  StarBeastRendererExecutionUnfreezeDeclarationNotReady,
  StarBeastRendererExecutionUnfreezeDeclarationResult,
  StarBeastRendererExecutionUnfreezeDeclarationUnavailable,
} from "./starBeastRendererExecutionUnfreezeDeclaration";

export type StarBeastRendererExecutionUnfreezeDeclarationConsumptionInput =
  Readonly<{
    declarationResult: StarBeastRendererExecutionUnfreezeDeclarationResult | null;
  }>;

export type StarBeastRendererExecutionUnfreezeDeclarationConsumption =
  Readonly<{
    semanticRole: "STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_DECLARATION_CONSUMPTION";
    declarationReference: StarBeastRendererExecutionUnfreezeDeclaration;
    sourceDeclarationResult: StarBeastRendererExecutionUnfreezeDeclarationDeclared;
    sourceCommandReference: StarBeastRendererExecutionUnfreezeDeclaration["sourceCommandReference"];
    authorityReference: StarBeastRendererExecutionUnfreezeDeclaration["authorityReference"];
    readinessReference: StarBeastRendererExecutionUnfreezeDeclaration["readinessReference"];
    unfreezeDeclarationEndpointGovernanceReference: StarBeastRendererExecutionUnfreezeDeclaration["unfreezeDeclarationEndpointGovernanceReference"];
    authorizationEndpointGovernanceReference: StarBeastRendererExecutionUnfreezeDeclaration["authorizationEndpointGovernanceReference"];
    executionScopeReference: StarBeastRendererExecutionUnfreezeDeclaration["executionScopeReference"];
    runtimeBoundaryReference: StarBeastRendererExecutionUnfreezeDeclaration["runtimeBoundaryReference"];
    rollbackStrategyReference: StarBeastRendererExecutionUnfreezeDeclaration["rollbackStrategyReference"];
    acceptanceScopeReference: StarBeastRendererExecutionUnfreezeDeclaration["acceptanceScopeReference"];
    consumptionStatus: "AVAILABLE_FOR_FUTURE_RENDERER_EXECUTION_UNFREEZE_ENDPOINT";
    declarationConsumedOnly: true;
    executionUnfreezeDeferred: true;
    noExecutionUnfreezeIssued: true;
    noP53ResultConsumption: true;
    noP59ResultConsumption: true;
    noFrozenEndpointResultConsumption: true;
    noFinalBackendSelection: true;
    noRendererCreation: true;
    noRenderExecution: true;
    noUIIntegration: true;
    noRuntimeIntegration: true;
    noStorageWrite: true;
  }>;

export type StarBeastRendererExecutionUnfreezeDeclarationConsumptionAvailable =
  Readonly<{
    status: "AVAILABLE";
    source: "star_beast_renderer_execution_unfreeze_declaration_consumption";
    input: StarBeastRendererExecutionUnfreezeDeclarationConsumptionInput;
    consumption: StarBeastRendererExecutionUnfreezeDeclarationConsumption;
  }>;

export type StarBeastRendererExecutionUnfreezeDeclarationConsumptionNotReady =
  Readonly<{
    status: "NOT_READY";
    source: "star_beast_renderer_execution_unfreeze_declaration_consumption";
    reason: "EXECUTION_UNFREEZE_DECLARATION_NOT_READY";
    input: StarBeastRendererExecutionUnfreezeDeclarationConsumptionInput;
    sourceDeclarationResult: StarBeastRendererExecutionUnfreezeDeclarationNotReady;
    sourceDeclarationReason: StarBeastRendererExecutionUnfreezeDeclarationNotReady["reason"];
    noDeclarationConsumption: true;
    noExecutionUnfreezeIssued: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererExecutionUnfreezeDeclarationConsumptionUnavailableReason =
  | "EXECUTION_UNFREEZE_DECLARATION_RESULT_REQUIRED"
  | "EXECUTION_UNFREEZE_DECLARATION_UNAVAILABLE";

export type StarBeastRendererExecutionUnfreezeDeclarationConsumptionUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    source: "star_beast_renderer_execution_unfreeze_declaration_consumption";
    reason: StarBeastRendererExecutionUnfreezeDeclarationConsumptionUnavailableReason;
    input: StarBeastRendererExecutionUnfreezeDeclarationConsumptionInput;
    sourceDeclarationResult: StarBeastRendererExecutionUnfreezeDeclarationUnavailable | null;
    sourceDeclarationReason: StarBeastRendererExecutionUnfreezeDeclarationUnavailable["reason"] | null;
    noDeclarationConsumption: true;
    noExecutionUnfreezeIssued: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererExecutionUnfreezeDeclarationConsumptionResult =
  | StarBeastRendererExecutionUnfreezeDeclarationConsumptionAvailable
  | StarBeastRendererExecutionUnfreezeDeclarationConsumptionNotReady
  | StarBeastRendererExecutionUnfreezeDeclarationConsumptionUnavailable;
