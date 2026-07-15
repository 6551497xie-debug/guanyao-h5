import type {
  StarBeastRendererImplementationUnfreezeDeclarationEndpoint,
  StarBeastRendererImplementationUnfreezeDeclarationEndpointInput,
  StarBeastRendererImplementationUnfreezeDeclarationEndpointResult,
} from "../types/starBeastRendererImplementationUnfreezeDeclarationEndpoint";

export function resolveStarBeastRendererImplementationUnfreezeDeclarationEndpoint(
  input: StarBeastRendererImplementationUnfreezeDeclarationEndpointInput,
): StarBeastRendererImplementationUnfreezeDeclarationEndpointResult {
  const sourceConsumptionResult = input.consumptionResult;

  if (sourceConsumptionResult === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      source:
        "star_beast_renderer_implementation_unfreeze_declaration_endpoint",
      reason: "UNFREEZE_DECLARATION_CONSUMPTION_RESULT_REQUIRED",
      input,
      sourceConsumptionResult: null,
      sourceConsumptionReason: null,
      noEndpoint: true,
      noUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  if (sourceConsumptionResult.status === "UNAVAILABLE") {
    return Object.freeze({
      status: "UNAVAILABLE",
      source:
        "star_beast_renderer_implementation_unfreeze_declaration_endpoint",
      reason: "UNFREEZE_DECLARATION_CONSUMPTION_UNAVAILABLE",
      input,
      sourceConsumptionResult,
      sourceConsumptionReason: sourceConsumptionResult.reason,
      noEndpoint: true,
      noUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  if (sourceConsumptionResult.status === "NOT_READY") {
    return Object.freeze({
      status: "NOT_READY",
      source:
        "star_beast_renderer_implementation_unfreeze_declaration_endpoint",
      reason: "UNFREEZE_DECLARATION_CONSUMPTION_NOT_READY",
      input,
      sourceConsumptionResult,
      sourceConsumptionReason: sourceConsumptionResult.reason,
      noEndpoint: true,
      noUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  const declarationConsumptionReference =
    sourceConsumptionResult.consumption;
  const endpoint: StarBeastRendererImplementationUnfreezeDeclarationEndpoint =
    Object.freeze({
      semanticRole:
        "STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_DECLARATION_ENDPOINT",
      sourceConsumptionResult,
      declarationConsumptionReference,
      declarationReference:
        declarationConsumptionReference.declarationReference,
      sourceCommandReference:
        declarationConsumptionReference.sourceCommandReference,
      authorityReference: declarationConsumptionReference.authorityReference,
      readinessReference: declarationConsumptionReference.readinessReference,
      authorizationEndpointGovernanceReference:
        declarationConsumptionReference.authorizationEndpointGovernanceReference,
      implementationScenarioReference:
        declarationConsumptionReference.implementationScenarioReference,
      backendCandidateReferences:
        declarationConsumptionReference.backendCandidateReferences,
      fallbackStrategyReference:
        declarationConsumptionReference.fallbackStrategyReference,
      acceptanceScopeReference:
        declarationConsumptionReference.acceptanceScopeReference,
      endpointStatus:
        "AVAILABLE_FOR_IMPLEMENTATION_UNFREEZE_GOVERNANCE_HANDOFF",
      declarationHandoffOnly: true,
      unfreezeExecutionDeferred: true,
      noUnfreezeIssued: true,
      noAuthorizationEndpointConsumption: true,
      noFinalBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
      noUIIntegration: true,
      noRuntimeIntegration: true,
      noStorageWrite: true,
    });

  return Object.freeze({
    status: "AVAILABLE",
    source:
      "star_beast_renderer_implementation_unfreeze_declaration_endpoint",
    input,
    endpoint,
  });
}
