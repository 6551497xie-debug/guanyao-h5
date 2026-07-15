import type {
  StarBeastRendererExecutionUnfreezeDeclarationConsumption,
  StarBeastRendererExecutionUnfreezeDeclarationConsumptionInput,
  StarBeastRendererExecutionUnfreezeDeclarationConsumptionResult,
} from "../types/starBeastRendererExecutionUnfreezeDeclarationConsumption";

export function consumeStarBeastRendererExecutionUnfreezeDeclaration(
  input: StarBeastRendererExecutionUnfreezeDeclarationConsumptionInput,
): StarBeastRendererExecutionUnfreezeDeclarationConsumptionResult {
  const sourceDeclarationResult = input.declarationResult;

  if (sourceDeclarationResult === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_renderer_execution_unfreeze_declaration_consumption",
      reason: "EXECUTION_UNFREEZE_DECLARATION_RESULT_REQUIRED",
      input,
      sourceDeclarationResult: null,
      sourceDeclarationReason: null,
      noDeclarationConsumption: true,
      noExecutionUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  if (sourceDeclarationResult.status === "UNAVAILABLE") {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_renderer_execution_unfreeze_declaration_consumption",
      reason: "EXECUTION_UNFREEZE_DECLARATION_UNAVAILABLE",
      input,
      sourceDeclarationResult,
      sourceDeclarationReason: sourceDeclarationResult.reason,
      noDeclarationConsumption: true,
      noExecutionUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  if (sourceDeclarationResult.status === "NOT_READY") {
    return Object.freeze({
      status: "NOT_READY",
      source: "star_beast_renderer_execution_unfreeze_declaration_consumption",
      reason: "EXECUTION_UNFREEZE_DECLARATION_NOT_READY",
      input,
      sourceDeclarationResult,
      sourceDeclarationReason: sourceDeclarationResult.reason,
      noDeclarationConsumption: true,
      noExecutionUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  const declarationReference = sourceDeclarationResult.declaration;
  const consumption: StarBeastRendererExecutionUnfreezeDeclarationConsumption =
    Object.freeze({
      semanticRole:
        "STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_DECLARATION_CONSUMPTION",
      declarationReference,
      sourceDeclarationResult,
      sourceCommandReference: declarationReference.sourceCommandReference,
      authorityReference: declarationReference.authorityReference,
      readinessReference: declarationReference.readinessReference,
      unfreezeDeclarationEndpointGovernanceReference:
        declarationReference.unfreezeDeclarationEndpointGovernanceReference,
      authorizationEndpointGovernanceReference:
        declarationReference.authorizationEndpointGovernanceReference,
      executionScopeReference: declarationReference.executionScopeReference,
      runtimeBoundaryReference: declarationReference.runtimeBoundaryReference,
      rollbackStrategyReference: declarationReference.rollbackStrategyReference,
      acceptanceScopeReference: declarationReference.acceptanceScopeReference,
      consumptionStatus:
        "AVAILABLE_FOR_FUTURE_RENDERER_EXECUTION_UNFREEZE_ENDPOINT",
      declarationConsumedOnly: true,
      executionUnfreezeDeferred: true,
      noExecutionUnfreezeIssued: true,
      noP53ResultConsumption: true,
      noP59ResultConsumption: true,
      noFrozenEndpointResultConsumption: true,
      noFinalBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
      noUIIntegration: true,
      noRuntimeIntegration: true,
      noStorageWrite: true,
    });

  return Object.freeze({
    status: "AVAILABLE",
    source: "star_beast_renderer_execution_unfreeze_declaration_consumption",
    input,
    consumption,
  });
}
