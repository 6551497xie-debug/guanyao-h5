export type StarBeastRendererAuthorizationEndpointGovernanceReference =
  Readonly<{
    referenceType: "STAR_BEAST_RENDERER_AUTHORIZATION_ENDPOINT_GOVERNANCE";
    referenceId: string;
  }>;

export type StarBeastRendererImplementationScenarioReference = Readonly<{
  referenceType: "STAR_BEAST_RENDERER_IMPLEMENTATION_SCENARIO";
  referenceId: string;
}>;

export type StarBeastRendererBackendCandidateReference = Readonly<{
  referenceType: "STAR_BEAST_RENDERER_BACKEND_CANDIDATE";
  referenceId: string;
}>;

export type StarBeastRendererFallbackStrategyReference = Readonly<{
  referenceType: "STAR_BEAST_RENDERER_FALLBACK_STRATEGY";
  referenceId: string;
}>;

export type StarBeastRendererImplementationAcceptanceScopeReference = Readonly<{
  referenceType: "STAR_BEAST_RENDERER_IMPLEMENTATION_ACCEPTANCE_SCOPE";
  referenceId: string;
}>;

export type StarBeastRendererImplementationUnfreezeReadinessInput = Readonly<{
  authorizationEndpointGovernanceReference:
    | StarBeastRendererAuthorizationEndpointGovernanceReference
    | null;
  implementationScenarioReference:
    | StarBeastRendererImplementationScenarioReference
    | null;
  backendCandidateReferences: readonly StarBeastRendererBackendCandidateReference[];
  fallbackStrategyReference: StarBeastRendererFallbackStrategyReference | null;
  acceptanceScopeReference:
    | StarBeastRendererImplementationAcceptanceScopeReference
    | null;
}>;

export type StarBeastRendererImplementationUnfreezeReadinessReady = Readonly<{
  status: "READY";
  readiness: "READY_FOR_EXPLICIT_IMPLEMENTATION_UNFREEZE_DECLARATION";
  source: "star_beast_renderer_implementation_unfreeze_readiness";
  input: StarBeastRendererImplementationUnfreezeReadinessInput;
  authorizationEndpointGovernanceReference: StarBeastRendererAuthorizationEndpointGovernanceReference;
  implementationScenarioReference: StarBeastRendererImplementationScenarioReference;
  backendCandidateReferences: readonly StarBeastRendererBackendCandidateReference[];
  fallbackStrategyReference: StarBeastRendererFallbackStrategyReference;
  acceptanceScopeReference: StarBeastRendererImplementationAcceptanceScopeReference;
  explicitUnfreezeDeclarationRequired: true;
  unfreezeDeferred: true;
  noUnfreezeIssued: true;
  noAuthorizationEndpointConsumption: true;
  noFinalBackendSelection: true;
  noRendererCreation: true;
  noRenderExecution: true;
  noUIIntegration: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
}>;

export type StarBeastRendererImplementationUnfreezeReadinessNotReadyReason =
  | "IMPLEMENTATION_SCENARIO_REFERENCE_REQUIRED"
  | "IMPLEMENTATION_SCENARIO_REFERENCE_INVALID"
  | "BACKEND_CANDIDATE_REFERENCES_REQUIRED"
  | "BACKEND_CANDIDATE_REFERENCES_INVALID"
  | "FALLBACK_STRATEGY_REFERENCE_REQUIRED"
  | "FALLBACK_STRATEGY_REFERENCE_INVALID"
  | "ACCEPTANCE_SCOPE_REFERENCE_REQUIRED"
  | "ACCEPTANCE_SCOPE_REFERENCE_INVALID";

export type StarBeastRendererImplementationUnfreezeReadinessNotReady =
  Readonly<{
    status: "NOT_READY";
    readiness: "NOT_READY";
    source: "star_beast_renderer_implementation_unfreeze_readiness";
    reason: StarBeastRendererImplementationUnfreezeReadinessNotReadyReason;
    input: StarBeastRendererImplementationUnfreezeReadinessInput;
    explicitUnfreezeDeclarationRequired: true;
    unfreezeDeferred: true;
    noUnfreezeIssued: true;
    noAuthorizationEndpointConsumption: true;
    noFinalBackendSelection: true;
    noRendererCreation: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererImplementationUnfreezeReadinessUnavailableReason =
  | "AUTHORIZATION_ENDPOINT_GOVERNANCE_REFERENCE_REQUIRED"
  | "AUTHORIZATION_ENDPOINT_GOVERNANCE_REFERENCE_INVALID";

export type StarBeastRendererImplementationUnfreezeReadinessUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    readiness: "UNAVAILABLE";
    source: "star_beast_renderer_implementation_unfreeze_readiness";
    reason: StarBeastRendererImplementationUnfreezeReadinessUnavailableReason;
    input: StarBeastRendererImplementationUnfreezeReadinessInput;
    explicitUnfreezeDeclarationRequired: true;
    unfreezeDeferred: true;
    noUnfreezeIssued: true;
    noAuthorizationEndpointConsumption: true;
    noFinalBackendSelection: true;
    noRendererCreation: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererImplementationUnfreezeReadinessResult =
  | StarBeastRendererImplementationUnfreezeReadinessReady
  | StarBeastRendererImplementationUnfreezeReadinessNotReady
  | StarBeastRendererImplementationUnfreezeReadinessUnavailable;
