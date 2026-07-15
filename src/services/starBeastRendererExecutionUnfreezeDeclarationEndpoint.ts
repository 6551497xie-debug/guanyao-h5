import type {
  StarBeastRendererExecutionUnfreezeDeclarationEndpoint,
  StarBeastRendererExecutionUnfreezeDeclarationEndpointInput,
  StarBeastRendererExecutionUnfreezeDeclarationEndpointResult,
} from "../types/starBeastRendererExecutionUnfreezeDeclarationEndpoint";

export function resolveStarBeastRendererExecutionUnfreezeDeclarationEndpoint(
  input: StarBeastRendererExecutionUnfreezeDeclarationEndpointInput,
): StarBeastRendererExecutionUnfreezeDeclarationEndpointResult {
  const sourceConsumptionResult = input.consumptionResult;

  if (sourceConsumptionResult === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_renderer_execution_unfreeze_declaration_endpoint",
      reason:
        "EXECUTION_UNFREEZE_DECLARATION_CONSUMPTION_RESULT_REQUIRED",
      input,
      sourceConsumptionResult: null,
      sourceConsumptionReason: null,
      noEndpoint: true,
      noExecutionUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  if (sourceConsumptionResult.status === "UNAVAILABLE") {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_renderer_execution_unfreeze_declaration_endpoint",
      reason: "EXECUTION_UNFREEZE_DECLARATION_CONSUMPTION_UNAVAILABLE",
      input,
      sourceConsumptionResult,
      sourceConsumptionReason: sourceConsumptionResult.reason,
      noEndpoint: true,
      noExecutionUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  if (sourceConsumptionResult.status === "NOT_READY") {
    return Object.freeze({
      status: "NOT_READY",
      source: "star_beast_renderer_execution_unfreeze_declaration_endpoint",
      reason: "EXECUTION_UNFREEZE_DECLARATION_CONSUMPTION_NOT_READY",
      input,
      sourceConsumptionResult,
      sourceConsumptionReason: sourceConsumptionResult.reason,
      noEndpoint: true,
      noExecutionUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  const declarationConsumptionReference = sourceConsumptionResult.consumption;
  const endpoint: StarBeastRendererExecutionUnfreezeDeclarationEndpoint =
    Object.freeze({
      semanticRole:
        "STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_DECLARATION_ENDPOINT",
      sourceConsumptionResult,
      declarationConsumptionReference,
      declarationReference:
        declarationConsumptionReference.declarationReference,
      sourceCommandReference:
        declarationConsumptionReference.sourceCommandReference,
      authorityReference: declarationConsumptionReference.authorityReference,
      readinessReference: declarationConsumptionReference.readinessReference,
      unfreezeDeclarationEndpointGovernanceReference:
        declarationConsumptionReference.unfreezeDeclarationEndpointGovernanceReference,
      authorizationEndpointGovernanceReference:
        declarationConsumptionReference.authorizationEndpointGovernanceReference,
      executionScopeReference:
        declarationConsumptionReference.executionScopeReference,
      runtimeBoundaryReference:
        declarationConsumptionReference.runtimeBoundaryReference,
      rollbackStrategyReference:
        declarationConsumptionReference.rollbackStrategyReference,
      acceptanceScopeReference:
        declarationConsumptionReference.acceptanceScopeReference,
      endpointStatus:
        "AVAILABLE_FOR_RENDERER_EXECUTION_UNFREEZE_GOVERNANCE_HANDOFF",
      declarationHandoffOnly: true,
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
    source: "star_beast_renderer_execution_unfreeze_declaration_endpoint",
    input,
    endpoint,
  });
}
