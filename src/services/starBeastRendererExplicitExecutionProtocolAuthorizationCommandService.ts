import type {
  StarBeastRendererExplicitExecutionProtocolAuthorizationCommand,
  StarBeastRendererExplicitExecutionProtocolAuthorizationCommandInput,
  StarBeastRendererExplicitExecutionProtocolAuthorizationCommandResult,
} from "../types/starBeastRendererExplicitExecutionProtocolAuthorizationCommand";

const isValidAuthorityReference = (
  reference: StarBeastRendererExplicitExecutionProtocolAuthorizationCommandInput["authorityReference"],
): reference is NonNullable<
  StarBeastRendererExplicitExecutionProtocolAuthorizationCommandInput["authorityReference"]
> =>
  reference !== null &&
  reference.referenceType ===
    "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORITY" &&
  reference.referenceId.trim().length > 0;

export function resolveStarBeastRendererExplicitExecutionProtocolAuthorizationCommand(
  input: StarBeastRendererExplicitExecutionProtocolAuthorizationCommandInput,
): StarBeastRendererExplicitExecutionProtocolAuthorizationCommandResult {
  const readiness = input.readinessResult;

  if (readiness === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      source:
        "star_beast_renderer_explicit_execution_protocol_authorization_command",
      reason: "EXECUTION_PROTOCOL_READINESS_RESULT_REQUIRED",
      input,
      readiness: null,
      sourceReadinessReason: null,
      noCommand: true,
      notExecutionProtocolAuthorization: true,
      noBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
    });
  }

  if (readiness.status === "UNAVAILABLE") {
    return Object.freeze({
      status: "UNAVAILABLE",
      source:
        "star_beast_renderer_explicit_execution_protocol_authorization_command",
      reason: "EXECUTION_PROTOCOL_READINESS_UNAVAILABLE",
      input,
      readiness,
      sourceReadinessReason: readiness.reason,
      noCommand: true,
      notExecutionProtocolAuthorization: true,
      noBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
    });
  }

  if (readiness.status === "NOT_READY") {
    return Object.freeze({
      status: "NOT_READY",
      source:
        "star_beast_renderer_explicit_execution_protocol_authorization_command",
      reason: "EXECUTION_PROTOCOL_READINESS_NOT_READY",
      input,
      readiness,
      sourceReadinessReason: readiness.reason,
      noCommand: true,
      notExecutionProtocolAuthorization: true,
      noBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
    });
  }

  if (input.authorityReference === null) {
    return Object.freeze({
      status: "NOT_READY",
      source:
        "star_beast_renderer_explicit_execution_protocol_authorization_command",
      reason: "EXECUTION_PROTOCOL_AUTHORITY_REFERENCE_REQUIRED",
      input,
      readiness,
      sourceReadinessReason: null,
      noCommand: true,
      notExecutionProtocolAuthorization: true,
      noBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
    });
  }

  if (!isValidAuthorityReference(input.authorityReference)) {
    return Object.freeze({
      status: "NOT_READY",
      source:
        "star_beast_renderer_explicit_execution_protocol_authorization_command",
      reason: "EXECUTION_PROTOCOL_AUTHORITY_REFERENCE_INVALID",
      input,
      readiness,
      sourceReadinessReason: null,
      noCommand: true,
      notExecutionProtocolAuthorization: true,
      noBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
    });
  }

  if (input.decision !== "AUTHORIZE_RENDERER_EXECUTION_PROTOCOL") {
    return Object.freeze({
      status: "NOT_READY",
      source:
        "star_beast_renderer_explicit_execution_protocol_authorization_command",
      reason: "EXPLICIT_AUTHORIZE_EXECUTION_PROTOCOL_DECISION_REQUIRED",
      input,
      readiness,
      sourceReadinessReason: null,
      noCommand: true,
      notExecutionProtocolAuthorization: true,
      noBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
    });
  }

  const command: StarBeastRendererExplicitExecutionProtocolAuthorizationCommand =
    Object.freeze({
      source: "explicit_renderer_execution_protocol_authorization_decision",
      semanticRole:
        "STAR_BEAST_RENDERER_EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND",
      authorityReference: input.authorityReference,
      decision: input.decision,
      authorizationIntent:
        "AUTHORIZE_STAR_BEAST_RENDERER_EXECUTION_PROTOCOL",
      readinessReference: readiness,
      executionUnfreezeEndpointGovernanceReference:
        readiness.executionUnfreezeEndpointGovernanceReference,
      backendSelectionAuthorityReference:
        readiness.backendSelectionAuthorityReference,
      executionSliceReference: readiness.executionSliceReference,
      failureStopReference: readiness.failureStopReference,
      rollbackReference: readiness.rollbackReference,
      acceptanceReference: readiness.acceptanceReference,
      authorityConfirmed: true,
      explicit: true,
      commandOnly: true,
      notExecutionProtocolAuthorization: true,
      executionProtocolAuthorizationDeferred: true,
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
      "star_beast_renderer_explicit_execution_protocol_authorization_command",
    input,
    readiness,
    command,
  });
}
