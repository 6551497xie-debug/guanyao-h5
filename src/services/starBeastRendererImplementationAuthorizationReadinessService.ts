import type {
  StarBeastRendererImplementationAuthorizationReadinessInput,
  StarBeastRendererImplementationAuthorizationReadinessResult,
} from "../types/starBeastRendererImplementationAuthorizationReadiness";

const STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION_GUARDRAILS =
  Object.freeze({
    explicitAuthorizationRequired: true,
    authorizationDeferred: true,
    noAuthorizationIssued: true,
    noBackendSelection: true,
    noRenderExecution: true,
  } as const);

export function resolveStarBeastRendererImplementationAuthorizationReadiness(
  input: StarBeastRendererImplementationAuthorizationReadinessInput,
): StarBeastRendererImplementationAuthorizationReadinessResult {
  const bindingResult = input.bindingResult;

  if (bindingResult === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      readiness: "UNAVAILABLE",
      source:
        "star_beast_renderer_implementation_authorization_readiness",
      reason: "CAPABILITY_BINDING_RESULT_REQUIRED",
      input,
      sourceBindingResult: null,
      sourceBindingReason: null,
      ...STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION_GUARDRAILS,
    });
  }

  if (bindingResult.status === "UNAVAILABLE") {
    return Object.freeze({
      status: "UNAVAILABLE",
      readiness: "UNAVAILABLE",
      source:
        "star_beast_renderer_implementation_authorization_readiness",
      reason: "CAPABILITY_BINDING_UNAVAILABLE",
      input,
      sourceBindingResult: bindingResult,
      sourceBindingReason: bindingResult.reason,
      ...STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION_GUARDRAILS,
    });
  }

  if (bindingResult.status === "NOT_READY") {
    return Object.freeze({
      status: "NOT_READY",
      readiness: "NOT_READY",
      source:
        "star_beast_renderer_implementation_authorization_readiness",
      reason: "CAPABILITY_BINDING_NOT_READY",
      input,
      sourceBindingResult: bindingResult,
      sourceBindingReason: bindingResult.reason,
      explicitAuthorizationRequired: true,
      authorizationDeferred: true,
      noAuthorizationIssued: true,
      noRenderExecution: true,
    });
  }

  return Object.freeze({
    status: "READY",
    readiness: "READY_FOR_EXPLICIT_RENDERER_IMPLEMENTATION_AUTHORIZATION",
    source: "star_beast_renderer_implementation_authorization_readiness",
    input,
    sourceBindingResult: bindingResult,
    bindingReference: bindingResult.binding,
    explicitAuthorizationRequired: true,
    authorizationDeferred: true,
    noAuthorizationIssued: true,
    noBackendSelection: true,
    noRenderExecution: true,
    noUIIntegration: true,
    noRuntimeIntegration: true,
    noStorageWrite: true,
  });
}
