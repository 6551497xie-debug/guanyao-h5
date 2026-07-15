import type {
  StarBeastRendererExecutionProtocolAuthorizationConsumption,
  StarBeastRendererExecutionProtocolAuthorizationConsumptionInput,
  StarBeastRendererExecutionProtocolAuthorizationConsumptionResult,
} from "../types/starBeastRendererExecutionProtocolAuthorizationConsumption";

export function consumeStarBeastRendererExecutionProtocolAuthorization(
  input: StarBeastRendererExecutionProtocolAuthorizationConsumptionInput,
): StarBeastRendererExecutionProtocolAuthorizationConsumptionResult {
  const sourceAuthorizationResult = input.authorizationResult;

  if (sourceAuthorizationResult === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      source:
        "star_beast_renderer_execution_protocol_authorization_consumption",
      reason: "EXECUTION_PROTOCOL_AUTHORIZATION_RESULT_REQUIRED",
      input,
      sourceAuthorizationResult: null,
      sourceAuthorizationReason: null,
      noAuthorizationConsumption: true,
      noBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
    });
  }

  if (sourceAuthorizationResult.status === "UNAVAILABLE") {
    return Object.freeze({
      status: "UNAVAILABLE",
      source:
        "star_beast_renderer_execution_protocol_authorization_consumption",
      reason: "EXECUTION_PROTOCOL_AUTHORIZATION_UNAVAILABLE",
      input,
      sourceAuthorizationResult,
      sourceAuthorizationReason: sourceAuthorizationResult.reason,
      noAuthorizationConsumption: true,
      noBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
    });
  }

  if (sourceAuthorizationResult.status === "NOT_READY") {
    return Object.freeze({
      status: "NOT_READY",
      source:
        "star_beast_renderer_execution_protocol_authorization_consumption",
      reason: "EXECUTION_PROTOCOL_AUTHORIZATION_NOT_READY",
      input,
      sourceAuthorizationResult,
      sourceAuthorizationReason: sourceAuthorizationResult.reason,
      noAuthorizationConsumption: true,
      noBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
    });
  }

  const authorizationReference = sourceAuthorizationResult.authorization;
  const consumption: StarBeastRendererExecutionProtocolAuthorizationConsumption =
    Object.freeze({
      semanticRole:
        "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION_CONSUMPTION",
      authorizationReference,
      sourceAuthorizationResult,
      sourceCommandReference: authorizationReference.sourceCommandReference,
      authorityReference: authorizationReference.authorityReference,
      readinessReference: authorizationReference.readinessReference,
      executionUnfreezeEndpointGovernanceReference:
        authorizationReference.executionUnfreezeEndpointGovernanceReference,
      backendSelectionAuthorityReference:
        authorizationReference.backendSelectionAuthorityReference,
      executionSliceReference: authorizationReference.executionSliceReference,
      failureStopReference: authorizationReference.failureStopReference,
      rollbackReference: authorizationReference.rollbackReference,
      acceptanceReference: authorizationReference.acceptanceReference,
      consumptionStatus:
        "AVAILABLE_FOR_FUTURE_RENDERER_EXECUTION_PROTOCOL_ENDPOINT",
      authorizationConsumedOnly: true,
      executionProtocolEndpointDeferred: true,
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
    source:
      "star_beast_renderer_execution_protocol_authorization_consumption",
    input,
    consumption,
  });
}
