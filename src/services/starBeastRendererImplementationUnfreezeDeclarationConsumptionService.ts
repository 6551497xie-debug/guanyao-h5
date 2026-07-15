import type {
  StarBeastRendererImplementationUnfreezeDeclarationConsumption,
  StarBeastRendererImplementationUnfreezeDeclarationConsumptionInput,
  StarBeastRendererImplementationUnfreezeDeclarationConsumptionResult,
} from "../types/starBeastRendererImplementationUnfreezeDeclarationConsumption";

export function consumeStarBeastRendererImplementationUnfreezeDeclaration(
  input: StarBeastRendererImplementationUnfreezeDeclarationConsumptionInput,
): StarBeastRendererImplementationUnfreezeDeclarationConsumptionResult {
  const sourceDeclarationResult = input.declarationResult;

  if (sourceDeclarationResult === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      source:
        "star_beast_renderer_implementation_unfreeze_declaration_consumption",
      reason: "IMPLEMENTATION_UNFREEZE_DECLARATION_RESULT_REQUIRED",
      input,
      sourceDeclarationResult: null,
      sourceDeclarationReason: null,
      noDeclarationConsumption: true,
      noUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  if (sourceDeclarationResult.status === "UNAVAILABLE") {
    return Object.freeze({
      status: "UNAVAILABLE",
      source:
        "star_beast_renderer_implementation_unfreeze_declaration_consumption",
      reason: "IMPLEMENTATION_UNFREEZE_DECLARATION_UNAVAILABLE",
      input,
      sourceDeclarationResult,
      sourceDeclarationReason: sourceDeclarationResult.reason,
      noDeclarationConsumption: true,
      noUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  if (sourceDeclarationResult.status === "NOT_READY") {
    return Object.freeze({
      status: "NOT_READY",
      source:
        "star_beast_renderer_implementation_unfreeze_declaration_consumption",
      reason: "IMPLEMENTATION_UNFREEZE_DECLARATION_NOT_READY",
      input,
      sourceDeclarationResult,
      sourceDeclarationReason: sourceDeclarationResult.reason,
      noDeclarationConsumption: true,
      noUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  const declarationReference = sourceDeclarationResult.declaration;
  const consumption: StarBeastRendererImplementationUnfreezeDeclarationConsumption =
    Object.freeze({
      semanticRole:
        "STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_DECLARATION_CONSUMPTION",
      declarationReference,
      sourceDeclarationResult,
      sourceCommandReference: declarationReference.sourceCommandReference,
      authorityReference: declarationReference.authorityReference,
      readinessReference: declarationReference.readinessReference,
      authorizationEndpointGovernanceReference:
        declarationReference.authorizationEndpointGovernanceReference,
      implementationScenarioReference:
        declarationReference.implementationScenarioReference,
      backendCandidateReferences:
        declarationReference.backendCandidateReferences,
      fallbackStrategyReference: declarationReference.fallbackStrategyReference,
      acceptanceScopeReference: declarationReference.acceptanceScopeReference,
      consumptionStatus:
        "AVAILABLE_FOR_FUTURE_IMPLEMENTATION_UNFREEZE_ENDPOINT",
      declarationConsumedOnly: true,
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
      "star_beast_renderer_implementation_unfreeze_declaration_consumption",
    input,
    consumption,
  });
}
