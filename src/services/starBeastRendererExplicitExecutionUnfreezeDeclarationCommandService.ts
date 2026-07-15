import type {
  StarBeastRendererExplicitExecutionUnfreezeDeclarationCommand,
  StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandInput,
  StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandResult,
} from "../types/starBeastRendererExplicitExecutionUnfreezeDeclarationCommand";

const isValidAuthorityReference = (
  reference: StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandInput["authorityReference"],
): reference is NonNullable<
  StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandInput["authorityReference"]
> =>
  reference !== null &&
  reference.referenceType ===
    "STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_AUTHORITY" &&
  reference.referenceId.trim().length > 0;

export function resolveStarBeastRendererExplicitExecutionUnfreezeDeclarationCommand(
  input: StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandInput,
): StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandResult {
  const readiness = input.readinessResult;

  if (readiness === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      source:
        "star_beast_renderer_explicit_execution_unfreeze_declaration_command",
      reason: "EXECUTION_UNFREEZE_READINESS_RESULT_REQUIRED",
      input,
      readiness: null,
      sourceReadinessReason: null,
      noCommand: true,
      notExecutionUnfreezeDeclaration: true,
      noExecutionUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  if (readiness.status === "UNAVAILABLE") {
    return Object.freeze({
      status: "UNAVAILABLE",
      source:
        "star_beast_renderer_explicit_execution_unfreeze_declaration_command",
      reason: "EXECUTION_UNFREEZE_READINESS_UNAVAILABLE",
      input,
      readiness,
      sourceReadinessReason: readiness.reason,
      noCommand: true,
      notExecutionUnfreezeDeclaration: true,
      noExecutionUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  if (readiness.status === "NOT_READY") {
    return Object.freeze({
      status: "NOT_READY",
      source:
        "star_beast_renderer_explicit_execution_unfreeze_declaration_command",
      reason: "EXECUTION_UNFREEZE_READINESS_NOT_READY",
      input,
      readiness,
      sourceReadinessReason: readiness.reason,
      noCommand: true,
      notExecutionUnfreezeDeclaration: true,
      noExecutionUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  if (input.authorityReference === null) {
    return Object.freeze({
      status: "NOT_READY",
      source:
        "star_beast_renderer_explicit_execution_unfreeze_declaration_command",
      reason: "EXECUTION_UNFREEZE_AUTHORITY_REFERENCE_REQUIRED",
      input,
      readiness,
      sourceReadinessReason: null,
      noCommand: true,
      notExecutionUnfreezeDeclaration: true,
      noExecutionUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  if (!isValidAuthorityReference(input.authorityReference)) {
    return Object.freeze({
      status: "NOT_READY",
      source:
        "star_beast_renderer_explicit_execution_unfreeze_declaration_command",
      reason: "EXECUTION_UNFREEZE_AUTHORITY_REFERENCE_INVALID",
      input,
      readiness,
      sourceReadinessReason: null,
      noCommand: true,
      notExecutionUnfreezeDeclaration: true,
      noExecutionUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  if (input.decision !== "DECLARE_EXECUTION_UNFREEZE") {
    return Object.freeze({
      status: "NOT_READY",
      source:
        "star_beast_renderer_explicit_execution_unfreeze_declaration_command",
      reason: "EXPLICIT_DECLARE_EXECUTION_UNFREEZE_DECISION_REQUIRED",
      input,
      readiness,
      sourceReadinessReason: null,
      noCommand: true,
      notExecutionUnfreezeDeclaration: true,
      noExecutionUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  const command: StarBeastRendererExplicitExecutionUnfreezeDeclarationCommand =
    Object.freeze({
      source: "explicit_renderer_execution_unfreeze_decision",
      semanticRole:
        "STAR_BEAST_RENDERER_EXPLICIT_EXECUTION_UNFREEZE_DECLARATION_COMMAND",
      authorityReference: input.authorityReference,
      decision: input.decision,
      declarationIntent:
        "DECLARE_STAR_BEAST_RENDERER_EXECUTION_UNFREEZE",
      readinessReference: readiness,
      unfreezeDeclarationEndpointGovernanceReference:
        readiness.unfreezeDeclarationEndpointGovernanceReference,
      authorizationEndpointGovernanceReference:
        readiness.authorizationEndpointGovernanceReference,
      executionScopeReference: readiness.executionScopeReference,
      runtimeBoundaryReference: readiness.runtimeBoundaryReference,
      rollbackStrategyReference: readiness.rollbackStrategyReference,
      acceptanceScopeReference: readiness.acceptanceScopeReference,
      authorityConfirmed: true,
      explicit: true,
      commandOnly: true,
      notExecutionUnfreezeDeclaration: true,
      noExecutionUnfreezeIssued: true,
      noP53ResultConsumption: true,
      noP59ResultConsumption: true,
      noFrozenEndpointResultConsumption: true,
      noFinalBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
      noUIIntegration: true,
      noRuntimeIntegration: true,
      noStorageWrite: true,
    });

  return Object.freeze({
    status: "AVAILABLE",
    source:
      "star_beast_renderer_explicit_execution_unfreeze_declaration_command",
    input,
    readiness,
    command,
  });
}
