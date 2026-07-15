import type {
  StarBeastRendererExecutionUnfreezeReadinessNotReady,
  StarBeastRendererExecutionUnfreezeReadinessReady,
  StarBeastRendererExecutionUnfreezeReadinessResult,
  StarBeastRendererExecutionUnfreezeReadinessUnavailable,
} from "./starBeastRendererExecutionUnfreezeReadiness";

export type StarBeastRendererExecutionUnfreezeAuthorityReference = Readonly<{
  referenceType: "STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_AUTHORITY";
  referenceId: string;
}>;

export type StarBeastRendererExplicitExecutionUnfreezeDecision =
  "DECLARE_EXECUTION_UNFREEZE";

export type StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandInput =
  Readonly<{
    readinessResult: StarBeastRendererExecutionUnfreezeReadinessResult | null;
    authorityReference: StarBeastRendererExecutionUnfreezeAuthorityReference | null;
    decision: StarBeastRendererExplicitExecutionUnfreezeDecision | null;
  }>;

export type StarBeastRendererExplicitExecutionUnfreezeDeclarationCommand =
  Readonly<{
    source: "explicit_renderer_execution_unfreeze_decision";
    semanticRole: "STAR_BEAST_RENDERER_EXPLICIT_EXECUTION_UNFREEZE_DECLARATION_COMMAND";
    authorityReference: StarBeastRendererExecutionUnfreezeAuthorityReference;
    decision: "DECLARE_EXECUTION_UNFREEZE";
    declarationIntent: "DECLARE_STAR_BEAST_RENDERER_EXECUTION_UNFREEZE";
    readinessReference: StarBeastRendererExecutionUnfreezeReadinessReady;
    unfreezeDeclarationEndpointGovernanceReference: StarBeastRendererExecutionUnfreezeReadinessReady["unfreezeDeclarationEndpointGovernanceReference"];
    authorizationEndpointGovernanceReference: StarBeastRendererExecutionUnfreezeReadinessReady["authorizationEndpointGovernanceReference"];
    executionScopeReference: StarBeastRendererExecutionUnfreezeReadinessReady["executionScopeReference"];
    runtimeBoundaryReference: StarBeastRendererExecutionUnfreezeReadinessReady["runtimeBoundaryReference"];
    rollbackStrategyReference: StarBeastRendererExecutionUnfreezeReadinessReady["rollbackStrategyReference"];
    acceptanceScopeReference: StarBeastRendererExecutionUnfreezeReadinessReady["acceptanceScopeReference"];
    authorityConfirmed: true;
    explicit: true;
    commandOnly: true;
    notExecutionUnfreezeDeclaration: true;
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

export type StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandAvailable =
  Readonly<{
    status: "AVAILABLE";
    source: "star_beast_renderer_explicit_execution_unfreeze_declaration_command";
    input: StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandInput;
    readiness: StarBeastRendererExecutionUnfreezeReadinessReady;
    command: StarBeastRendererExplicitExecutionUnfreezeDeclarationCommand;
  }>;

export type StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandNotReadyReason =
  | "EXECUTION_UNFREEZE_READINESS_NOT_READY"
  | "EXECUTION_UNFREEZE_AUTHORITY_REFERENCE_REQUIRED"
  | "EXECUTION_UNFREEZE_AUTHORITY_REFERENCE_INVALID"
  | "EXPLICIT_DECLARE_EXECUTION_UNFREEZE_DECISION_REQUIRED";

export type StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandNotReady =
  Readonly<{
    status: "NOT_READY";
    source: "star_beast_renderer_explicit_execution_unfreeze_declaration_command";
    reason: StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandNotReadyReason;
    input: StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandInput;
    readiness:
      | StarBeastRendererExecutionUnfreezeReadinessReady
      | StarBeastRendererExecutionUnfreezeReadinessNotReady;
    sourceReadinessReason: StarBeastRendererExecutionUnfreezeReadinessNotReady["reason"] | null;
    noCommand: true;
    notExecutionUnfreezeDeclaration: true;
    noExecutionUnfreezeIssued: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandUnavailableReason =
  | "EXECUTION_UNFREEZE_READINESS_RESULT_REQUIRED"
  | "EXECUTION_UNFREEZE_READINESS_UNAVAILABLE";

export type StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    source: "star_beast_renderer_explicit_execution_unfreeze_declaration_command";
    reason: StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandUnavailableReason;
    input: StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandInput;
    readiness: StarBeastRendererExecutionUnfreezeReadinessUnavailable | null;
    sourceReadinessReason: StarBeastRendererExecutionUnfreezeReadinessUnavailable["reason"] | null;
    noCommand: true;
    notExecutionUnfreezeDeclaration: true;
    noExecutionUnfreezeIssued: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandResult =
  | StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandAvailable
  | StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandNotReady
  | StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandUnavailable;
