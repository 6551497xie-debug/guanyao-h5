import type {
  StarBeastRendererImplementationAuthorizationEndpoint,
  StarBeastRendererImplementationAuthorizationEndpointInput,
  StarBeastRendererImplementationAuthorizationEndpointResult,
} from "../types/starBeastRendererImplementationAuthorizationEndpoint";

export function resolveStarBeastRendererImplementationAuthorizationEndpoint(
  input: StarBeastRendererImplementationAuthorizationEndpointInput,
): StarBeastRendererImplementationAuthorizationEndpointResult {
  const sourceConsumptionResult = input.consumptionResult;

  if (sourceConsumptionResult === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_renderer_implementation_authorization_endpoint",
      reason: "AUTHORIZATION_CONSUMPTION_RESULT_REQUIRED",
      input,
      sourceConsumptionResult: null,
      sourceConsumptionReason: null,
      noEndpoint: true,
      noRenderExecution: true,
    });
  }

  if (sourceConsumptionResult.status === "UNAVAILABLE") {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_renderer_implementation_authorization_endpoint",
      reason: "AUTHORIZATION_CONSUMPTION_UNAVAILABLE",
      input,
      sourceConsumptionResult,
      sourceConsumptionReason: sourceConsumptionResult.reason,
      noEndpoint: true,
      noRenderExecution: true,
    });
  }

  if (sourceConsumptionResult.status === "NOT_READY") {
    return Object.freeze({
      status: "NOT_READY",
      source: "star_beast_renderer_implementation_authorization_endpoint",
      reason: "AUTHORIZATION_CONSUMPTION_NOT_READY",
      input,
      sourceConsumptionResult,
      sourceConsumptionReason: sourceConsumptionResult.reason,
      noEndpoint: true,
      noRenderExecution: true,
    });
  }

  const authorizationConsumptionReference =
    sourceConsumptionResult.consumption;
  const endpoint: StarBeastRendererImplementationAuthorizationEndpoint =
    Object.freeze({
      semanticRole:
        "STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION_ENDPOINT",
      sourceConsumptionResult,
      authorizationConsumptionReference,
      authorizationReference:
        authorizationConsumptionReference.authorizationReference,
      sourceCommandReference:
        authorizationConsumptionReference.sourceCommandReference,
      authorityReference: authorizationConsumptionReference.authorityReference,
      bindingReference: authorizationConsumptionReference.bindingReference,
      endpointStatus: "AVAILABLE_FOR_IMPLEMENTATION_PROTOCOL_HANDOFF",
      authorizationHandoffOnly: true,
      implementationDeferred: true,
      noBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
      noUIIntegration: true,
      noRuntimeIntegration: true,
      noStorageWrite: true,
    });

  return Object.freeze({
    status: "AVAILABLE",
    source: "star_beast_renderer_implementation_authorization_endpoint",
    input,
    endpoint,
  });
}
