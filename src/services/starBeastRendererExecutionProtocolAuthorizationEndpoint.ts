import type {
  StarBeastRendererExecutionProtocolAuthorizationEndpoint,
  StarBeastRendererExecutionProtocolAuthorizationEndpointInput,
  StarBeastRendererExecutionProtocolAuthorizationEndpointResult,
} from "../types/starBeastRendererExecutionProtocolAuthorizationEndpoint";

export function resolveStarBeastRendererExecutionProtocolAuthorizationEndpoint(
  input: StarBeastRendererExecutionProtocolAuthorizationEndpointInput,
): StarBeastRendererExecutionProtocolAuthorizationEndpointResult {
  const sourceConsumptionResult = input.consumptionResult;

  if (sourceConsumptionResult === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      source:
        "star_beast_renderer_execution_protocol_authorization_endpoint",
      reason:
        "EXECUTION_PROTOCOL_AUTHORIZATION_CONSUMPTION_RESULT_REQUIRED",
      input,
      sourceConsumptionResult: null,
      sourceConsumptionReason: null,
      noEndpoint: true,
      noBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
    });
  }

  if (sourceConsumptionResult.status === "UNAVAILABLE") {
    return Object.freeze({
      status: "UNAVAILABLE",
      source:
        "star_beast_renderer_execution_protocol_authorization_endpoint",
      reason: "EXECUTION_PROTOCOL_AUTHORIZATION_CONSUMPTION_UNAVAILABLE",
      input,
      sourceConsumptionResult,
      sourceConsumptionReason: sourceConsumptionResult.reason,
      noEndpoint: true,
      noBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
    });
  }

  if (sourceConsumptionResult.status === "NOT_READY") {
    return Object.freeze({
      status: "NOT_READY",
      source:
        "star_beast_renderer_execution_protocol_authorization_endpoint",
      reason: "EXECUTION_PROTOCOL_AUTHORIZATION_CONSUMPTION_NOT_READY",
      input,
      sourceConsumptionResult,
      sourceConsumptionReason: sourceConsumptionResult.reason,
      noEndpoint: true,
      noBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
    });
  }

  const authorizationConsumptionReference =
    sourceConsumptionResult.consumption;
  const endpoint: StarBeastRendererExecutionProtocolAuthorizationEndpoint =
    Object.freeze({
      semanticRole:
        "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION_ENDPOINT",
      sourceConsumptionResult,
      authorizationConsumptionReference,
      authorizationReference:
        authorizationConsumptionReference.authorizationReference,
      sourceCommandReference:
        authorizationConsumptionReference.sourceCommandReference,
      authorityReference:
        authorizationConsumptionReference.authorityReference,
      readinessReference:
        authorizationConsumptionReference.readinessReference,
      executionUnfreezeEndpointGovernanceReference:
        authorizationConsumptionReference.executionUnfreezeEndpointGovernanceReference,
      backendSelectionAuthorityReference:
        authorizationConsumptionReference.backendSelectionAuthorityReference,
      executionSliceReference:
        authorizationConsumptionReference.executionSliceReference,
      failureStopReference:
        authorizationConsumptionReference.failureStopReference,
      rollbackReference: authorizationConsumptionReference.rollbackReference,
      acceptanceReference:
        authorizationConsumptionReference.acceptanceReference,
      endpointStatus:
        "AVAILABLE_FOR_RENDERER_EXECUTION_PROTOCOL_GOVERNANCE_HANDOFF",
      authorizationHandoffOnly: true,
      executionProtocolActivationDeferred: true,
      noAutomaticExecution: true,
      noP65ResultConsumption: true,
      noFrozenEndpointResultConsumption: true,
      noBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
      noUIIntegration: true,
      noRuntimeIntegration: true,
      noStorageWrite: true,
    });

  return Object.freeze({
    status: "AVAILABLE",
    source: "star_beast_renderer_execution_protocol_authorization_endpoint",
    input,
    endpoint,
  });
}
