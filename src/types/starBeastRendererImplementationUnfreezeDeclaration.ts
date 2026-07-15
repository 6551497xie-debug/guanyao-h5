import type {
  StarBeastRendererExplicitImplementationUnfreezeDeclarationCommand,
  StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandAvailable,
  StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandNotReady,
  StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandResult,
  StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandUnavailable,
} from "./starBeastRendererExplicitImplementationUnfreezeDeclarationCommand";

export type StarBeastRendererImplementationUnfreezeDeclarationInput =
  Readonly<{
    commandResult: StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandResult | null;
  }>;

export type StarBeastRendererImplementationUnfreezeDeclaration = Readonly<{
  source: "explicit_renderer_implementation_unfreeze_declaration_command";
  semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_DECLARATION";
  declarationStatus: "DECLARED_FOR_IMPLEMENTATION_UNFREEZE_PROTOCOL";
  declarationScope: "STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_PROTOCOL";
  sourceCommandReference: StarBeastRendererExplicitImplementationUnfreezeDeclarationCommand;
  authorityReference: StarBeastRendererExplicitImplementationUnfreezeDeclarationCommand["authorityReference"];
  readinessReference: StarBeastRendererExplicitImplementationUnfreezeDeclarationCommand["readinessReference"];
  authorizationEndpointGovernanceReference: StarBeastRendererExplicitImplementationUnfreezeDeclarationCommand["authorizationEndpointGovernanceReference"];
  implementationScenarioReference: StarBeastRendererExplicitImplementationUnfreezeDeclarationCommand["implementationScenarioReference"];
  backendCandidateReferences: StarBeastRendererExplicitImplementationUnfreezeDeclarationCommand["backendCandidateReferences"];
  fallbackStrategyReference: StarBeastRendererExplicitImplementationUnfreezeDeclarationCommand["fallbackStrategyReference"];
  acceptanceScopeReference: StarBeastRendererExplicitImplementationUnfreezeDeclarationCommand["acceptanceScopeReference"];
  unfreezeDecision: "DECLARE_UNFREEZE";
  explicitAuthorityConfirmed: true;
  declarationOnly: true;
  unfreezeExecutionDeferred: true;
  noUnfreezeIssued: true;
  noAuthorizationEndpointConsumption: true;
  noFinalBackendSelection: true;
  noRendererCreation: true;
  noRenderExecution: true;
  noUIIntegration: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
}>;

export type StarBeastRendererImplementationUnfreezeDeclarationDeclared =
  Readonly<{
    status: "DECLARED";
    source: "star_beast_renderer_implementation_unfreeze_declaration_resolver";
    input: StarBeastRendererImplementationUnfreezeDeclarationInput;
    commandResult: StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandAvailable;
    declaration: StarBeastRendererImplementationUnfreezeDeclaration;
  }>;

export type StarBeastRendererImplementationUnfreezeDeclarationNotReadyReason =
  | "EXPLICIT_UNFREEZE_DECLARATION_COMMAND_NOT_READY"
  | "EXPLICIT_UNFREEZE_DECLARATION_COMMAND_INVALID";

export type StarBeastRendererImplementationUnfreezeDeclarationNotReady =
  Readonly<{
    status: "NOT_READY";
    source: "star_beast_renderer_implementation_unfreeze_declaration_resolver";
    reason: StarBeastRendererImplementationUnfreezeDeclarationNotReadyReason;
    input: StarBeastRendererImplementationUnfreezeDeclarationInput;
    commandResult:
      | StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandAvailable
      | StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandNotReady;
    sourceCommandReason: StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandNotReady["reason"] | null;
    noDeclaration: true;
    noUnfreezeIssued: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererImplementationUnfreezeDeclarationUnavailableReason =
  | "EXPLICIT_UNFREEZE_DECLARATION_COMMAND_RESULT_REQUIRED"
  | "EXPLICIT_UNFREEZE_DECLARATION_COMMAND_UNAVAILABLE";

export type StarBeastRendererImplementationUnfreezeDeclarationUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    source: "star_beast_renderer_implementation_unfreeze_declaration_resolver";
    reason: StarBeastRendererImplementationUnfreezeDeclarationUnavailableReason;
    input: StarBeastRendererImplementationUnfreezeDeclarationInput;
    commandResult: StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandUnavailable | null;
    sourceCommandReason: StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandUnavailable["reason"] | null;
    noDeclaration: true;
    noUnfreezeIssued: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererImplementationUnfreezeDeclarationResult =
  | StarBeastRendererImplementationUnfreezeDeclarationDeclared
  | StarBeastRendererImplementationUnfreezeDeclarationNotReady
  | StarBeastRendererImplementationUnfreezeDeclarationUnavailable;
