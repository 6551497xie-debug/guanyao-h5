import type {
  StarBeastRendererImplementationUnfreezeReadinessNotReady,
  StarBeastRendererImplementationUnfreezeReadinessReady,
  StarBeastRendererImplementationUnfreezeReadinessResult,
  StarBeastRendererImplementationUnfreezeReadinessUnavailable,
} from "./starBeastRendererImplementationUnfreezeReadiness";

export type StarBeastRendererImplementationUnfreezeAuthorityReference =
  Readonly<{
    referenceType: "STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_AUTHORITY";
    referenceId: string;
  }>;

export type StarBeastRendererExplicitImplementationUnfreezeDecision =
  "DECLARE_UNFREEZE";

export type StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandInput =
  Readonly<{
    readinessResult: StarBeastRendererImplementationUnfreezeReadinessResult | null;
    authorityReference: StarBeastRendererImplementationUnfreezeAuthorityReference | null;
    decision: StarBeastRendererExplicitImplementationUnfreezeDecision | null;
  }>;

export type StarBeastRendererExplicitImplementationUnfreezeDeclarationCommand =
  Readonly<{
    source: "explicit_renderer_implementation_unfreeze_decision";
    semanticRole: "STAR_BEAST_RENDERER_EXPLICIT_IMPLEMENTATION_UNFREEZE_DECLARATION_COMMAND";
    authorityReference: StarBeastRendererImplementationUnfreezeAuthorityReference;
    decision: "DECLARE_UNFREEZE";
    declarationIntent: "DECLARE_STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE";
    readinessReference: StarBeastRendererImplementationUnfreezeReadinessReady;
    authorizationEndpointGovernanceReference: StarBeastRendererImplementationUnfreezeReadinessReady["authorizationEndpointGovernanceReference"];
    implementationScenarioReference: StarBeastRendererImplementationUnfreezeReadinessReady["implementationScenarioReference"];
    backendCandidateReferences: StarBeastRendererImplementationUnfreezeReadinessReady["backendCandidateReferences"];
    fallbackStrategyReference: StarBeastRendererImplementationUnfreezeReadinessReady["fallbackStrategyReference"];
    acceptanceScopeReference: StarBeastRendererImplementationUnfreezeReadinessReady["acceptanceScopeReference"];
    authorityConfirmed: true;
    explicit: true;
    commandOnly: true;
    notUnfreezeDeclaration: true;
    noUnfreezeIssued: true;
    noAuthorizationEndpointConsumption: true;
    noFinalBackendSelection: true;
    noRendererCreation: true;
    noRenderExecution: true;
    noUIIntegration: true;
    noRuntimeIntegration: true;
    noStorageWrite: true;
  }>;

export type StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandAvailable =
  Readonly<{
    status: "AVAILABLE";
    source: "star_beast_renderer_explicit_implementation_unfreeze_declaration_command";
    input: StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandInput;
    readiness: StarBeastRendererImplementationUnfreezeReadinessReady;
    command: StarBeastRendererExplicitImplementationUnfreezeDeclarationCommand;
  }>;

export type StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandNotReadyReason =
  | "UNFREEZE_READINESS_NOT_READY"
  | "UNFREEZE_AUTHORITY_REFERENCE_REQUIRED"
  | "UNFREEZE_AUTHORITY_REFERENCE_INVALID"
  | "EXPLICIT_DECLARE_UNFREEZE_DECISION_REQUIRED";

export type StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandNotReady =
  Readonly<{
    status: "NOT_READY";
    source: "star_beast_renderer_explicit_implementation_unfreeze_declaration_command";
    reason: StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandNotReadyReason;
    input: StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandInput;
    readiness:
      | StarBeastRendererImplementationUnfreezeReadinessReady
      | StarBeastRendererImplementationUnfreezeReadinessNotReady;
    sourceReadinessReason: StarBeastRendererImplementationUnfreezeReadinessNotReady["reason"] | null;
    noCommand: true;
    notUnfreezeDeclaration: true;
    noUnfreezeIssued: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandUnavailableReason =
  | "UNFREEZE_READINESS_RESULT_REQUIRED"
  | "UNFREEZE_READINESS_UNAVAILABLE";

export type StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    source: "star_beast_renderer_explicit_implementation_unfreeze_declaration_command";
    reason: StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandUnavailableReason;
    input: StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandInput;
    readiness: StarBeastRendererImplementationUnfreezeReadinessUnavailable | null;
    sourceReadinessReason: StarBeastRendererImplementationUnfreezeReadinessUnavailable["reason"] | null;
    noCommand: true;
    notUnfreezeDeclaration: true;
    noUnfreezeIssued: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandResult =
  | StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandAvailable
  | StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandNotReady
  | StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandUnavailable;
