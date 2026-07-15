import type {
  StarBeastRendererExplicitImplementationAuthorizationCommand,
  StarBeastRendererExplicitImplementationAuthorizationCommandInput,
  StarBeastRendererExplicitImplementationAuthorizationCommandResult,
} from "../types/starBeastRendererExplicitImplementationAuthorizationCommand";

export function resolveStarBeastRendererExplicitImplementationAuthorizationCommand(
  input: StarBeastRendererExplicitImplementationAuthorizationCommandInput,
): StarBeastRendererExplicitImplementationAuthorizationCommandResult {
  const readiness = input.readinessResult;

  if (readiness === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      source:
        "star_beast_renderer_explicit_implementation_authorization_command",
      reason: "AUTHORIZATION_READINESS_RESULT_REQUIRED",
      input,
      readiness: null,
      sourceReadinessReason: null,
      noCommand: true,
      notAuthorization: true,
      noRenderExecution: true,
    });
  }

  if (readiness.status === "UNAVAILABLE") {
    return Object.freeze({
      status: "UNAVAILABLE",
      source:
        "star_beast_renderer_explicit_implementation_authorization_command",
      reason: "AUTHORIZATION_READINESS_UNAVAILABLE",
      input,
      readiness,
      sourceReadinessReason: readiness.reason,
      noCommand: true,
      notAuthorization: true,
      noRenderExecution: true,
    });
  }

  if (readiness.status === "NOT_READY") {
    return Object.freeze({
      status: "NOT_READY",
      source:
        "star_beast_renderer_explicit_implementation_authorization_command",
      reason: "AUTHORIZATION_READINESS_NOT_READY",
      input,
      readiness,
      sourceReadinessReason: readiness.reason,
      noCommand: true,
      notAuthorization: true,
      noRenderExecution: true,
    });
  }

  if (input.authorityReference === null) {
    return Object.freeze({
      status: "NOT_READY",
      source:
        "star_beast_renderer_explicit_implementation_authorization_command",
      reason: "IMPLEMENTATION_AUTHORITY_REFERENCE_REQUIRED",
      input,
      readiness,
      sourceReadinessReason: null,
      noCommand: true,
      notAuthorization: true,
      noRenderExecution: true,
    });
  }

  if (input.decision !== "AUTHORIZE") {
    return Object.freeze({
      status: "NOT_READY",
      source:
        "star_beast_renderer_explicit_implementation_authorization_command",
      reason: "EXPLICIT_AUTHORIZE_DECISION_REQUIRED",
      input,
      readiness,
      sourceReadinessReason: null,
      noCommand: true,
      notAuthorization: true,
      noRenderExecution: true,
    });
  }

  const command: StarBeastRendererExplicitImplementationAuthorizationCommand =
    Object.freeze({
      source: "explicit_renderer_implementation_authorization_decision",
      semanticRole:
        "STAR_BEAST_RENDERER_EXPLICIT_IMPLEMENTATION_AUTHORIZATION_COMMAND",
      authorityReference: input.authorityReference,
      decision: input.decision,
      authorizationIntent:
        "AUTHORIZE_STAR_BEAST_RENDERER_IMPLEMENTATION",
      readinessReference: readiness,
      bindingReference: readiness.bindingReference,
      authorityConfirmed: true,
      explicit: true,
      commandOnly: true,
      notAuthorization: true,
      noAutomaticImplementation: true,
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
      "star_beast_renderer_explicit_implementation_authorization_command",
    input,
    readiness,
    command,
  });
}
