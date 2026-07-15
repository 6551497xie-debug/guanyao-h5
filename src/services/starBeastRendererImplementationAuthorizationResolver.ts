import type {
  StarBeastRendererImplementationAuthorization,
  StarBeastRendererImplementationAuthorizationInput,
  StarBeastRendererImplementationAuthorizationResult,
} from "../types/starBeastRendererImplementationAuthorization";

export function resolveStarBeastRendererImplementationAuthorization(
  input: StarBeastRendererImplementationAuthorizationInput,
): StarBeastRendererImplementationAuthorizationResult {
  const commandResult = input.commandResult;

  if (commandResult === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_renderer_implementation_authorization_resolver",
      reason: "EXPLICIT_AUTHORIZATION_COMMAND_RESULT_REQUIRED",
      input,
      commandResult: null,
      sourceCommandReason: null,
      noAuthorization: true,
      noRenderExecution: true,
    });
  }

  if (commandResult.status === "UNAVAILABLE") {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_renderer_implementation_authorization_resolver",
      reason: "EXPLICIT_AUTHORIZATION_COMMAND_UNAVAILABLE",
      input,
      commandResult,
      sourceCommandReason: commandResult.reason,
      noAuthorization: true,
      noRenderExecution: true,
    });
  }

  if (commandResult.status === "NOT_READY") {
    return Object.freeze({
      status: "NOT_READY",
      source: "star_beast_renderer_implementation_authorization_resolver",
      reason: "EXPLICIT_AUTHORIZATION_COMMAND_NOT_READY",
      input,
      commandResult,
      sourceCommandReason: commandResult.reason,
      noAuthorization: true,
      noRenderExecution: true,
    });
  }

  const { command, readiness } = commandResult;
  const isValidExplicitCommand =
    command.source === "explicit_renderer_implementation_authorization_decision" &&
    command.semanticRole ===
      "STAR_BEAST_RENDERER_EXPLICIT_IMPLEMENTATION_AUTHORIZATION_COMMAND" &&
    command.authorityReference.referenceType ===
      "STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORITY" &&
    command.decision === "AUTHORIZE" &&
    command.authorizationIntent ===
      "AUTHORIZE_STAR_BEAST_RENDERER_IMPLEMENTATION" &&
    command.authorityConfirmed === true &&
    command.explicit === true &&
    command.commandOnly === true &&
    command.notAuthorization === true &&
    command.readinessReference === readiness &&
    command.bindingReference === readiness.bindingReference;

  if (!isValidExplicitCommand) {
    return Object.freeze({
      status: "NOT_READY",
      source: "star_beast_renderer_implementation_authorization_resolver",
      reason: "EXPLICIT_AUTHORIZATION_COMMAND_INVALID",
      input,
      commandResult,
      sourceCommandReason: null,
      noAuthorization: true,
      noRenderExecution: true,
    });
  }

  const authorization: StarBeastRendererImplementationAuthorization =
    Object.freeze({
      source: "explicit_renderer_implementation_authorization_command",
      semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION",
      authorizationStatus: "AUTHORIZED_FOR_IMPLEMENTATION_PROTOCOL",
      authorizationScope: "STAR_BEAST_RENDERER_IMPLEMENTATION_PROTOCOL",
      sourceCommandReference: command,
      authorityReference: command.authorityReference,
      readinessReference: command.readinessReference,
      bindingReference: command.bindingReference,
      authorizationDecision: command.decision,
      explicitAuthorityConfirmed: true,
      authorizationOnly: true,
      noAutomaticImplementation: true,
      noBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
      noUIIntegration: true,
      noRuntimeIntegration: true,
      noStorageWrite: true,
    });

  return Object.freeze({
    status: "AUTHORIZED",
    source: "star_beast_renderer_implementation_authorization_resolver",
    input,
    commandResult,
    authorization,
  });
}
