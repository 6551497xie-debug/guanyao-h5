import type {
  StarBeastPrototypeExplicitExecutionAuthorizationCommand,
  StarBeastPrototypeExplicitExecutionAuthorizationCommandInput,
  StarBeastPrototypeExplicitExecutionAuthorizationCommandResult,
} from "../types/starBeastPrototypeExplicitExecutionAuthorizationCommand";

const COMMAND_BOUNDARY = Object.freeze({
  commandOnly: true,
  notExecutionAuthorization: true,
  executionAuthorizationDeferred: true,
  noRendererInvocation: true,
  noRenderExecution: true,
  noDrawCommands: true,
  noBackendSelection: true,
  noRenderPlanGeneration: true,
  noCanvasConnection: true,
  noStarbeastLabConnection: true,
  noRuntimeIntegration: true,
  noStorageWrite: true,
});

const isValidAuthorityReference = (
  reference: StarBeastPrototypeExplicitExecutionAuthorizationCommandInput["authorityReference"],
): reference is NonNullable<
  StarBeastPrototypeExplicitExecutionAuthorizationCommandInput["authorityReference"]
> =>
  reference !== null &&
  reference.referenceType === "STAR_BEAST_PROTOTYPE_EXECUTION_AUTHORITY" &&
  reference.referenceId.trim().length > 0 &&
  reference.authorityScope === "ISOLATED_PROTOTYPE_EXECUTION_ONLY";

export function resolveStarBeastPrototypeExplicitExecutionAuthorizationCommand(
  input: StarBeastPrototypeExplicitExecutionAuthorizationCommandInput,
): StarBeastPrototypeExplicitExecutionAuthorizationCommandResult {
  const readiness = input.readinessResultReference;

  if (readiness === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_prototype_explicit_execution_authorization_command",
      reason: "PROTOTYPE_EXECUTION_READINESS_RESULT_REQUIRED",
      input,
      readinessReference: null,
      sourceReadinessReason: null,
      noCommand: true,
      boundary: COMMAND_BOUNDARY,
    });
  }
  if (readiness.status === "UNAVAILABLE") {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_prototype_explicit_execution_authorization_command",
      reason: "PROTOTYPE_EXECUTION_READINESS_UNAVAILABLE",
      input,
      readinessReference: readiness,
      sourceReadinessReason: readiness.reason,
      noCommand: true,
      boundary: COMMAND_BOUNDARY,
    });
  }
  if (readiness.status === "BLOCKED") {
    return Object.freeze({
      status: "BLOCKED",
      source: "star_beast_prototype_explicit_execution_authorization_command",
      reason: "PROTOTYPE_EXECUTION_READINESS_BLOCKED",
      input,
      readinessReference: readiness,
      sourceReadinessReason: readiness.reason,
      noCommand: true,
      boundary: COMMAND_BOUNDARY,
    });
  }
  if (input.authorityReference === null) {
    return Object.freeze({
      status: "NOT_READY",
      source: "star_beast_prototype_explicit_execution_authorization_command",
      reason: "PROTOTYPE_EXECUTION_AUTHORITY_REFERENCE_REQUIRED",
      input,
      readinessReference: readiness,
      noCommand: true,
      boundary: COMMAND_BOUNDARY,
    });
  }
  if (!isValidAuthorityReference(input.authorityReference)) {
    return Object.freeze({
      status: "NOT_READY",
      source: "star_beast_prototype_explicit_execution_authorization_command",
      reason: "PROTOTYPE_EXECUTION_AUTHORITY_REFERENCE_INVALID",
      input,
      readinessReference: readiness,
      noCommand: true,
      boundary: COMMAND_BOUNDARY,
    });
  }
  if (input.decision !== "AUTHORIZE_ISOLATED_PROTOTYPE_EXECUTION") {
    return Object.freeze({
      status: "NOT_READY",
      source: "star_beast_prototype_explicit_execution_authorization_command",
      reason: "EXPLICIT_ISOLATED_PROTOTYPE_EXECUTION_DECISION_REQUIRED",
      input,
      readinessReference: readiness,
      noCommand: true,
      boundary: COMMAND_BOUNDARY,
    });
  }

  const command: StarBeastPrototypeExplicitExecutionAuthorizationCommand =
    Object.freeze({
      source: "explicit_isolated_prototype_execution_authorization_decision",
      semanticRole:
        "STAR_BEAST_PROTOTYPE_EXPLICIT_EXECUTION_AUTHORIZATION_COMMAND",
      authorityReference: input.authorityReference,
      decision: input.decision,
      authorizationIntent:
        "AUTHORIZE_FUTURE_ISOLATED_PROTOTYPE_EXECUTION_RESOLUTION",
      readinessReference: readiness,
      inputContractReference: readiness.inputContractReference,
      executionSliceReference: readiness.executionSliceReference,
      executionStopReference: readiness.executionStopReference,
      authorityConfirmed: true,
      explicit: true,
      boundary: COMMAND_BOUNDARY,
    });

  return Object.freeze({
    status: "AVAILABLE",
    source: "star_beast_prototype_explicit_execution_authorization_command",
    input,
    readinessReference: readiness,
    command,
  });
}
