import type {
  StarBeastRendererExecutionUnfreezeDeclarationConsumption,
  StarBeastRendererExecutionUnfreezeDeclarationConsumptionAvailable,
  StarBeastRendererExecutionUnfreezeDeclarationConsumptionNotReady,
  StarBeastRendererExecutionUnfreezeDeclarationConsumptionResult,
  StarBeastRendererExecutionUnfreezeDeclarationConsumptionUnavailable,
} from "./starBeastRendererExecutionUnfreezeDeclarationConsumption";

export type StarBeastRendererExecutionUnfreezeDeclarationEndpointInput =
  Readonly<{
    consumptionResult: StarBeastRendererExecutionUnfreezeDeclarationConsumptionResult | null;
  }>;

export type StarBeastRendererExecutionUnfreezeDeclarationEndpoint = Readonly<{
  semanticRole: "STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_DECLARATION_ENDPOINT";
  sourceConsumptionResult: StarBeastRendererExecutionUnfreezeDeclarationConsumptionAvailable;
  declarationConsumptionReference: StarBeastRendererExecutionUnfreezeDeclarationConsumption;
  declarationReference: StarBeastRendererExecutionUnfreezeDeclarationConsumption["declarationReference"];
  sourceCommandReference: StarBeastRendererExecutionUnfreezeDeclarationConsumption["sourceCommandReference"];
  authorityReference: StarBeastRendererExecutionUnfreezeDeclarationConsumption["authorityReference"];
  readinessReference: StarBeastRendererExecutionUnfreezeDeclarationConsumption["readinessReference"];
  unfreezeDeclarationEndpointGovernanceReference: StarBeastRendererExecutionUnfreezeDeclarationConsumption["unfreezeDeclarationEndpointGovernanceReference"];
  authorizationEndpointGovernanceReference: StarBeastRendererExecutionUnfreezeDeclarationConsumption["authorizationEndpointGovernanceReference"];
  executionScopeReference: StarBeastRendererExecutionUnfreezeDeclarationConsumption["executionScopeReference"];
  runtimeBoundaryReference: StarBeastRendererExecutionUnfreezeDeclarationConsumption["runtimeBoundaryReference"];
  rollbackStrategyReference: StarBeastRendererExecutionUnfreezeDeclarationConsumption["rollbackStrategyReference"];
  acceptanceScopeReference: StarBeastRendererExecutionUnfreezeDeclarationConsumption["acceptanceScopeReference"];
  endpointStatus: "AVAILABLE_FOR_RENDERER_EXECUTION_UNFREEZE_GOVERNANCE_HANDOFF";
  declarationHandoffOnly: true;
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

export type StarBeastRendererExecutionUnfreezeDeclarationEndpointAvailable =
  Readonly<{
    status: "AVAILABLE";
    source: "star_beast_renderer_execution_unfreeze_declaration_endpoint";
    input: StarBeastRendererExecutionUnfreezeDeclarationEndpointInput;
    endpoint: StarBeastRendererExecutionUnfreezeDeclarationEndpoint;
  }>;

export type StarBeastRendererExecutionUnfreezeDeclarationEndpointNotReady =
  Readonly<{
    status: "NOT_READY";
    source: "star_beast_renderer_execution_unfreeze_declaration_endpoint";
    reason: "EXECUTION_UNFREEZE_DECLARATION_CONSUMPTION_NOT_READY";
    input: StarBeastRendererExecutionUnfreezeDeclarationEndpointInput;
    sourceConsumptionResult: StarBeastRendererExecutionUnfreezeDeclarationConsumptionNotReady;
    sourceConsumptionReason: StarBeastRendererExecutionUnfreezeDeclarationConsumptionNotReady["reason"];
    noEndpoint: true;
    noExecutionUnfreezeIssued: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererExecutionUnfreezeDeclarationEndpointUnavailableReason =
  | "EXECUTION_UNFREEZE_DECLARATION_CONSUMPTION_RESULT_REQUIRED"
  | "EXECUTION_UNFREEZE_DECLARATION_CONSUMPTION_UNAVAILABLE";

export type StarBeastRendererExecutionUnfreezeDeclarationEndpointUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    source: "star_beast_renderer_execution_unfreeze_declaration_endpoint";
    reason: StarBeastRendererExecutionUnfreezeDeclarationEndpointUnavailableReason;
    input: StarBeastRendererExecutionUnfreezeDeclarationEndpointInput;
    sourceConsumptionResult: StarBeastRendererExecutionUnfreezeDeclarationConsumptionUnavailable | null;
    sourceConsumptionReason: StarBeastRendererExecutionUnfreezeDeclarationConsumptionUnavailable["reason"] | null;
    noEndpoint: true;
    noExecutionUnfreezeIssued: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererExecutionUnfreezeDeclarationEndpointResult =
  | StarBeastRendererExecutionUnfreezeDeclarationEndpointAvailable
  | StarBeastRendererExecutionUnfreezeDeclarationEndpointNotReady
  | StarBeastRendererExecutionUnfreezeDeclarationEndpointUnavailable;
