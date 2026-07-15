import type {
  StarBeastRendererImplementationUnfreezeDeclarationConsumption,
  StarBeastRendererImplementationUnfreezeDeclarationConsumptionAvailable,
  StarBeastRendererImplementationUnfreezeDeclarationConsumptionNotReady,
  StarBeastRendererImplementationUnfreezeDeclarationConsumptionResult,
  StarBeastRendererImplementationUnfreezeDeclarationConsumptionUnavailable,
} from "./starBeastRendererImplementationUnfreezeDeclarationConsumption";

export type StarBeastRendererImplementationUnfreezeDeclarationEndpointInput =
  Readonly<{
    consumptionResult: StarBeastRendererImplementationUnfreezeDeclarationConsumptionResult | null;
  }>;

export type StarBeastRendererImplementationUnfreezeDeclarationEndpoint =
  Readonly<{
    semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_DECLARATION_ENDPOINT";
    sourceConsumptionResult: StarBeastRendererImplementationUnfreezeDeclarationConsumptionAvailable;
    declarationConsumptionReference: StarBeastRendererImplementationUnfreezeDeclarationConsumption;
    declarationReference: StarBeastRendererImplementationUnfreezeDeclarationConsumption["declarationReference"];
    sourceCommandReference: StarBeastRendererImplementationUnfreezeDeclarationConsumption["sourceCommandReference"];
    authorityReference: StarBeastRendererImplementationUnfreezeDeclarationConsumption["authorityReference"];
    readinessReference: StarBeastRendererImplementationUnfreezeDeclarationConsumption["readinessReference"];
    authorizationEndpointGovernanceReference: StarBeastRendererImplementationUnfreezeDeclarationConsumption["authorizationEndpointGovernanceReference"];
    implementationScenarioReference: StarBeastRendererImplementationUnfreezeDeclarationConsumption["implementationScenarioReference"];
    backendCandidateReferences: StarBeastRendererImplementationUnfreezeDeclarationConsumption["backendCandidateReferences"];
    fallbackStrategyReference: StarBeastRendererImplementationUnfreezeDeclarationConsumption["fallbackStrategyReference"];
    acceptanceScopeReference: StarBeastRendererImplementationUnfreezeDeclarationConsumption["acceptanceScopeReference"];
    endpointStatus: "AVAILABLE_FOR_IMPLEMENTATION_UNFREEZE_GOVERNANCE_HANDOFF";
    declarationHandoffOnly: true;
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

export type StarBeastRendererImplementationUnfreezeDeclarationEndpointAvailable =
  Readonly<{
    status: "AVAILABLE";
    source: "star_beast_renderer_implementation_unfreeze_declaration_endpoint";
    input: StarBeastRendererImplementationUnfreezeDeclarationEndpointInput;
    endpoint: StarBeastRendererImplementationUnfreezeDeclarationEndpoint;
  }>;

export type StarBeastRendererImplementationUnfreezeDeclarationEndpointNotReady =
  Readonly<{
    status: "NOT_READY";
    source: "star_beast_renderer_implementation_unfreeze_declaration_endpoint";
    reason: "UNFREEZE_DECLARATION_CONSUMPTION_NOT_READY";
    input: StarBeastRendererImplementationUnfreezeDeclarationEndpointInput;
    sourceConsumptionResult: StarBeastRendererImplementationUnfreezeDeclarationConsumptionNotReady;
    sourceConsumptionReason: StarBeastRendererImplementationUnfreezeDeclarationConsumptionNotReady["reason"];
    noEndpoint: true;
    noUnfreezeIssued: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererImplementationUnfreezeDeclarationEndpointUnavailableReason =
  | "UNFREEZE_DECLARATION_CONSUMPTION_RESULT_REQUIRED"
  | "UNFREEZE_DECLARATION_CONSUMPTION_UNAVAILABLE";

export type StarBeastRendererImplementationUnfreezeDeclarationEndpointUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    source: "star_beast_renderer_implementation_unfreeze_declaration_endpoint";
    reason: StarBeastRendererImplementationUnfreezeDeclarationEndpointUnavailableReason;
    input: StarBeastRendererImplementationUnfreezeDeclarationEndpointInput;
    sourceConsumptionResult: StarBeastRendererImplementationUnfreezeDeclarationConsumptionUnavailable | null;
    sourceConsumptionReason: StarBeastRendererImplementationUnfreezeDeclarationConsumptionUnavailable["reason"] | null;
    noEndpoint: true;
    noUnfreezeIssued: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererImplementationUnfreezeDeclarationEndpointResult =
  | StarBeastRendererImplementationUnfreezeDeclarationEndpointAvailable
  | StarBeastRendererImplementationUnfreezeDeclarationEndpointNotReady
  | StarBeastRendererImplementationUnfreezeDeclarationEndpointUnavailable;
