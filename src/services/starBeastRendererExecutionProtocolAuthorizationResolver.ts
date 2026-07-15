import type {
  StarBeastRendererExecutionProtocolAuthorization,
  StarBeastRendererExecutionProtocolAuthorizationInput,
  StarBeastRendererExecutionProtocolAuthorizationResult,
} from "../types/starBeastRendererExecutionProtocolAuthorization";

export function resolveStarBeastRendererExecutionProtocolAuthorization(
  input: StarBeastRendererExecutionProtocolAuthorizationInput,
): StarBeastRendererExecutionProtocolAuthorizationResult {
  const commandResult = input.commandResult;

  if (commandResult === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_renderer_execution_protocol_authorization_resolver",
      reason:
        "EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND_RESULT_REQUIRED",
      input,
      commandResult: null,
      sourceCommandReason: null,
      noAuthorization: true,
      noBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
    });
  }

  if (commandResult.status === "UNAVAILABLE") {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_renderer_execution_protocol_authorization_resolver",
      reason:
        "EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND_UNAVAILABLE",
      input,
      commandResult,
      sourceCommandReason: commandResult.reason,
      noAuthorization: true,
      noBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
    });
  }

  if (commandResult.status === "NOT_READY") {
    return Object.freeze({
      status: "NOT_READY",
      source: "star_beast_renderer_execution_protocol_authorization_resolver",
      reason:
        "EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND_NOT_READY",
      input,
      commandResult,
      sourceCommandReason: commandResult.reason,
      noAuthorization: true,
      noBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
    });
  }

  const { command, readiness } = commandResult;
  const isValidExplicitCommand =
    command.source ===
      "explicit_renderer_execution_protocol_authorization_decision" &&
    command.semanticRole ===
      "STAR_BEAST_RENDERER_EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND" &&
    command.authorityReference.referenceType ===
      "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORITY" &&
    command.authorityReference.referenceId.trim().length > 0 &&
    command.decision === "AUTHORIZE_RENDERER_EXECUTION_PROTOCOL" &&
    command.authorizationIntent ===
      "AUTHORIZE_STAR_BEAST_RENDERER_EXECUTION_PROTOCOL" &&
    command.authorityConfirmed === true &&
    command.explicit === true &&
    command.commandOnly === true &&
    command.notExecutionProtocolAuthorization === true &&
    command.readinessReference === readiness &&
    command.executionUnfreezeEndpointGovernanceReference ===
      readiness.executionUnfreezeEndpointGovernanceReference &&
    command.backendSelectionAuthorityReference ===
      readiness.backendSelectionAuthorityReference &&
    command.executionSliceReference === readiness.executionSliceReference &&
    command.failureStopReference === readiness.failureStopReference &&
    command.rollbackReference === readiness.rollbackReference &&
    command.acceptanceReference === readiness.acceptanceReference;

  if (!isValidExplicitCommand) {
    return Object.freeze({
      status: "NOT_READY",
      source: "star_beast_renderer_execution_protocol_authorization_resolver",
      reason: "EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND_INVALID",
      input,
      commandResult,
      sourceCommandReason: null,
      noAuthorization: true,
      noBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
    });
  }

  const authorization: StarBeastRendererExecutionProtocolAuthorization =
    Object.freeze({
      source: "explicit_renderer_execution_protocol_authorization_command",
      semanticRole: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION",
      authorizationStatus: "AUTHORIZED_FOR_RENDERER_EXECUTION_PROTOCOL",
      authorizationScope: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL",
      sourceCommandReference: command,
      authorityReference: command.authorityReference,
      readinessReference: command.readinessReference,
      executionUnfreezeEndpointGovernanceReference:
        command.executionUnfreezeEndpointGovernanceReference,
      backendSelectionAuthorityReference:
        command.backendSelectionAuthorityReference,
      executionSliceReference: command.executionSliceReference,
      failureStopReference: command.failureStopReference,
      rollbackReference: command.rollbackReference,
      acceptanceReference: command.acceptanceReference,
      authorizationDecision: command.decision,
      explicitAuthorityConfirmed: true,
      authorizationOnly: true,
      noAutomaticExecution: true,
      executionProtocolActivationDeferred: true,
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
    status: "AUTHORIZED",
    source: "star_beast_renderer_execution_protocol_authorization_resolver",
    input,
    commandResult,
    authorization,
  });
}
