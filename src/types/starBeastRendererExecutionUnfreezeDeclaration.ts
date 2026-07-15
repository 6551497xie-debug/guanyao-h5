import type {
  StarBeastRendererExplicitExecutionUnfreezeDeclarationCommand,
  StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandAvailable,
  StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandNotReady,
  StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandResult,
  StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandUnavailable,
} from "./starBeastRendererExplicitExecutionUnfreezeDeclarationCommand";

export type StarBeastRendererExecutionUnfreezeDeclarationInput = Readonly<{
  commandResult: StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandResult | null;
}>;

export type StarBeastRendererExecutionUnfreezeDeclaration = Readonly<{
  source: "explicit_renderer_execution_unfreeze_declaration_command";
  semanticRole: "STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_DECLARATION";
  declarationStatus: "DECLARED_FOR_RENDERER_EXECUTION_UNFREEZE_PROTOCOL";
  declarationScope: "STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_PROTOCOL";
  sourceCommandReference: StarBeastRendererExplicitExecutionUnfreezeDeclarationCommand;
  authorityReference: StarBeastRendererExplicitExecutionUnfreezeDeclarationCommand["authorityReference"];
  readinessReference: StarBeastRendererExplicitExecutionUnfreezeDeclarationCommand["readinessReference"];
  unfreezeDeclarationEndpointGovernanceReference: StarBeastRendererExplicitExecutionUnfreezeDeclarationCommand["unfreezeDeclarationEndpointGovernanceReference"];
  authorizationEndpointGovernanceReference: StarBeastRendererExplicitExecutionUnfreezeDeclarationCommand["authorizationEndpointGovernanceReference"];
  executionScopeReference: StarBeastRendererExplicitExecutionUnfreezeDeclarationCommand["executionScopeReference"];
  runtimeBoundaryReference: StarBeastRendererExplicitExecutionUnfreezeDeclarationCommand["runtimeBoundaryReference"];
  rollbackStrategyReference: StarBeastRendererExplicitExecutionUnfreezeDeclarationCommand["rollbackStrategyReference"];
  acceptanceScopeReference: StarBeastRendererExplicitExecutionUnfreezeDeclarationCommand["acceptanceScopeReference"];
  executionUnfreezeDecision: "DECLARE_EXECUTION_UNFREEZE";
  explicitAuthorityConfirmed: true;
  declarationOnly: true;
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

export type StarBeastRendererExecutionUnfreezeDeclarationDeclared = Readonly<{
  status: "DECLARED";
  source: "star_beast_renderer_execution_unfreeze_declaration_resolver";
  input: StarBeastRendererExecutionUnfreezeDeclarationInput;
  commandResult: StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandAvailable;
  declaration: StarBeastRendererExecutionUnfreezeDeclaration;
}>;

export type StarBeastRendererExecutionUnfreezeDeclarationNotReadyReason =
  | "EXPLICIT_EXECUTION_UNFREEZE_DECLARATION_COMMAND_NOT_READY"
  | "EXPLICIT_EXECUTION_UNFREEZE_DECLARATION_COMMAND_INVALID";

export type StarBeastRendererExecutionUnfreezeDeclarationNotReady = Readonly<{
  status: "NOT_READY";
  source: "star_beast_renderer_execution_unfreeze_declaration_resolver";
  reason: StarBeastRendererExecutionUnfreezeDeclarationNotReadyReason;
  input: StarBeastRendererExecutionUnfreezeDeclarationInput;
  commandResult:
    | StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandAvailable
    | StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandNotReady;
  sourceCommandReason: StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandNotReady["reason"] | null;
  noDeclaration: true;
  noExecutionUnfreezeIssued: true;
  noRenderExecution: true;
}>;

export type StarBeastRendererExecutionUnfreezeDeclarationUnavailableReason =
  | "EXPLICIT_EXECUTION_UNFREEZE_DECLARATION_COMMAND_RESULT_REQUIRED"
  | "EXPLICIT_EXECUTION_UNFREEZE_DECLARATION_COMMAND_UNAVAILABLE";

export type StarBeastRendererExecutionUnfreezeDeclarationUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    source: "star_beast_renderer_execution_unfreeze_declaration_resolver";
    reason: StarBeastRendererExecutionUnfreezeDeclarationUnavailableReason;
    input: StarBeastRendererExecutionUnfreezeDeclarationInput;
    commandResult: StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandUnavailable | null;
    sourceCommandReason: StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandUnavailable["reason"] | null;
    noDeclaration: true;
    noExecutionUnfreezeIssued: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererExecutionUnfreezeDeclarationResult =
  | StarBeastRendererExecutionUnfreezeDeclarationDeclared
  | StarBeastRendererExecutionUnfreezeDeclarationNotReady
  | StarBeastRendererExecutionUnfreezeDeclarationUnavailable;
