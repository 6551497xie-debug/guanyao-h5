import type {
  StarBeastRendererImplementationAuthorizationConsumption,
  StarBeastRendererImplementationAuthorizationConsumptionInput,
  StarBeastRendererImplementationAuthorizationConsumptionResult,
} from "../types/starBeastRendererImplementationAuthorizationConsumption";

export function consumeStarBeastRendererImplementationAuthorization(
  input: StarBeastRendererImplementationAuthorizationConsumptionInput,
): StarBeastRendererImplementationAuthorizationConsumptionResult {
  const sourceAuthorizationResult = input.authorizationResult;

  if (sourceAuthorizationResult === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_renderer_implementation_authorization_consumption",
      reason: "IMPLEMENTATION_AUTHORIZATION_RESULT_REQUIRED",
      input,
      sourceAuthorizationResult: null,
      sourceAuthorizationReason: null,
      noAuthorizationConsumption: true,
      noRenderExecution: true,
    });
  }

  if (sourceAuthorizationResult.status === "UNAVAILABLE") {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_renderer_implementation_authorization_consumption",
      reason: "IMPLEMENTATION_AUTHORIZATION_UNAVAILABLE",
      input,
      sourceAuthorizationResult,
      sourceAuthorizationReason: sourceAuthorizationResult.reason,
      noAuthorizationConsumption: true,
      noRenderExecution: true,
    });
  }

  if (sourceAuthorizationResult.status === "NOT_READY") {
    return Object.freeze({
      status: "NOT_READY",
      source: "star_beast_renderer_implementation_authorization_consumption",
      reason: "IMPLEMENTATION_AUTHORIZATION_NOT_READY",
      input,
      sourceAuthorizationResult,
      sourceAuthorizationReason: sourceAuthorizationResult.reason,
      noAuthorizationConsumption: true,
      noRenderExecution: true,
    });
  }

  const authorizationReference = sourceAuthorizationResult.authorization;
  const consumption: StarBeastRendererImplementationAuthorizationConsumption =
    Object.freeze({
      semanticRole:
        "STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION_CONSUMPTION",
      authorizationReference,
      sourceAuthorizationResult,
      sourceCommandReference: authorizationReference.sourceCommandReference,
      authorityReference: authorizationReference.authorityReference,
      bindingReference: authorizationReference.bindingReference,
      consumptionStatus: "AVAILABLE_FOR_FUTURE_IMPLEMENTATION_ENDPOINT",
      authorizationConsumedOnly: true,
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
    source: "star_beast_renderer_implementation_authorization_consumption",
    input,
    consumption,
  });
}
