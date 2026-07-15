import type {
  StarBeastRendererImplementationUnfreezeDeclaration,
  StarBeastRendererImplementationUnfreezeDeclarationDeclared,
  StarBeastRendererImplementationUnfreezeDeclarationNotReady,
  StarBeastRendererImplementationUnfreezeDeclarationResult,
  StarBeastRendererImplementationUnfreezeDeclarationUnavailable,
} from "./starBeastRendererImplementationUnfreezeDeclaration";

export type StarBeastRendererImplementationUnfreezeDeclarationConsumptionInput =
  Readonly<{
    declarationResult: StarBeastRendererImplementationUnfreezeDeclarationResult | null;
  }>;

export type StarBeastRendererImplementationUnfreezeDeclarationConsumption =
  Readonly<{
    semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_DECLARATION_CONSUMPTION";
    declarationReference: StarBeastRendererImplementationUnfreezeDeclaration;
    sourceDeclarationResult: StarBeastRendererImplementationUnfreezeDeclarationDeclared;
    sourceCommandReference: StarBeastRendererImplementationUnfreezeDeclaration["sourceCommandReference"];
    authorityReference: StarBeastRendererImplementationUnfreezeDeclaration["authorityReference"];
    readinessReference: StarBeastRendererImplementationUnfreezeDeclaration["readinessReference"];
    authorizationEndpointGovernanceReference: StarBeastRendererImplementationUnfreezeDeclaration["authorizationEndpointGovernanceReference"];
    implementationScenarioReference: StarBeastRendererImplementationUnfreezeDeclaration["implementationScenarioReference"];
    backendCandidateReferences: StarBeastRendererImplementationUnfreezeDeclaration["backendCandidateReferences"];
    fallbackStrategyReference: StarBeastRendererImplementationUnfreezeDeclaration["fallbackStrategyReference"];
    acceptanceScopeReference: StarBeastRendererImplementationUnfreezeDeclaration["acceptanceScopeReference"];
    consumptionStatus: "AVAILABLE_FOR_FUTURE_IMPLEMENTATION_UNFREEZE_ENDPOINT";
    declarationConsumedOnly: true;
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

export type StarBeastRendererImplementationUnfreezeDeclarationConsumptionAvailable =
  Readonly<{
    status: "AVAILABLE";
    source: "star_beast_renderer_implementation_unfreeze_declaration_consumption";
    input: StarBeastRendererImplementationUnfreezeDeclarationConsumptionInput;
    consumption: StarBeastRendererImplementationUnfreezeDeclarationConsumption;
  }>;

export type StarBeastRendererImplementationUnfreezeDeclarationConsumptionNotReady =
  Readonly<{
    status: "NOT_READY";
    source: "star_beast_renderer_implementation_unfreeze_declaration_consumption";
    reason: "IMPLEMENTATION_UNFREEZE_DECLARATION_NOT_READY";
    input: StarBeastRendererImplementationUnfreezeDeclarationConsumptionInput;
    sourceDeclarationResult: StarBeastRendererImplementationUnfreezeDeclarationNotReady;
    sourceDeclarationReason: StarBeastRendererImplementationUnfreezeDeclarationNotReady["reason"];
    noDeclarationConsumption: true;
    noUnfreezeIssued: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererImplementationUnfreezeDeclarationConsumptionUnavailableReason =
  | "IMPLEMENTATION_UNFREEZE_DECLARATION_RESULT_REQUIRED"
  | "IMPLEMENTATION_UNFREEZE_DECLARATION_UNAVAILABLE";

export type StarBeastRendererImplementationUnfreezeDeclarationConsumptionUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    source: "star_beast_renderer_implementation_unfreeze_declaration_consumption";
    reason: StarBeastRendererImplementationUnfreezeDeclarationConsumptionUnavailableReason;
    input: StarBeastRendererImplementationUnfreezeDeclarationConsumptionInput;
    sourceDeclarationResult: StarBeastRendererImplementationUnfreezeDeclarationUnavailable | null;
    sourceDeclarationReason: StarBeastRendererImplementationUnfreezeDeclarationUnavailable["reason"] | null;
    noDeclarationConsumption: true;
    noUnfreezeIssued: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererImplementationUnfreezeDeclarationConsumptionResult =
  | StarBeastRendererImplementationUnfreezeDeclarationConsumptionAvailable
  | StarBeastRendererImplementationUnfreezeDeclarationConsumptionNotReady
  | StarBeastRendererImplementationUnfreezeDeclarationConsumptionUnavailable;
