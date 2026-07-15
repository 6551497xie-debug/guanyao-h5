import type {
  StarBeastRendererExecutionUnfreezeDeclaration,
  StarBeastRendererExecutionUnfreezeDeclarationInput,
  StarBeastRendererExecutionUnfreezeDeclarationResult,
} from "../types/starBeastRendererExecutionUnfreezeDeclaration";

export function resolveStarBeastRendererExecutionUnfreezeDeclaration(
  input: StarBeastRendererExecutionUnfreezeDeclarationInput,
): StarBeastRendererExecutionUnfreezeDeclarationResult {
  const commandResult = input.commandResult;

  if (commandResult === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_renderer_execution_unfreeze_declaration_resolver",
      reason:
        "EXPLICIT_EXECUTION_UNFREEZE_DECLARATION_COMMAND_RESULT_REQUIRED",
      input,
      commandResult: null,
      sourceCommandReason: null,
      noDeclaration: true,
      noExecutionUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  if (commandResult.status === "UNAVAILABLE") {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_renderer_execution_unfreeze_declaration_resolver",
      reason: "EXPLICIT_EXECUTION_UNFREEZE_DECLARATION_COMMAND_UNAVAILABLE",
      input,
      commandResult,
      sourceCommandReason: commandResult.reason,
      noDeclaration: true,
      noExecutionUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  if (commandResult.status === "NOT_READY") {
    return Object.freeze({
      status: "NOT_READY",
      source: "star_beast_renderer_execution_unfreeze_declaration_resolver",
      reason: "EXPLICIT_EXECUTION_UNFREEZE_DECLARATION_COMMAND_NOT_READY",
      input,
      commandResult,
      sourceCommandReason: commandResult.reason,
      noDeclaration: true,
      noExecutionUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  const { command, readiness } = commandResult;
  const isValidExplicitCommand =
    command.source === "explicit_renderer_execution_unfreeze_decision" &&
    command.semanticRole ===
      "STAR_BEAST_RENDERER_EXPLICIT_EXECUTION_UNFREEZE_DECLARATION_COMMAND" &&
    command.authorityReference.referenceType ===
      "STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_AUTHORITY" &&
    command.authorityReference.referenceId.trim().length > 0 &&
    command.decision === "DECLARE_EXECUTION_UNFREEZE" &&
    command.declarationIntent ===
      "DECLARE_STAR_BEAST_RENDERER_EXECUTION_UNFREEZE" &&
    command.authorityConfirmed === true &&
    command.explicit === true &&
    command.commandOnly === true &&
    command.notExecutionUnfreezeDeclaration === true &&
    command.noExecutionUnfreezeIssued === true &&
    command.noP53ResultConsumption === true &&
    command.noP59ResultConsumption === true &&
    command.noFrozenEndpointResultConsumption === true &&
    command.readinessReference === readiness &&
    command.unfreezeDeclarationEndpointGovernanceReference ===
      readiness.unfreezeDeclarationEndpointGovernanceReference &&
    command.authorizationEndpointGovernanceReference ===
      readiness.authorizationEndpointGovernanceReference &&
    command.executionScopeReference === readiness.executionScopeReference &&
    command.runtimeBoundaryReference === readiness.runtimeBoundaryReference &&
    command.rollbackStrategyReference === readiness.rollbackStrategyReference &&
    command.acceptanceScopeReference === readiness.acceptanceScopeReference;

  if (!isValidExplicitCommand) {
    return Object.freeze({
      status: "NOT_READY",
      source: "star_beast_renderer_execution_unfreeze_declaration_resolver",
      reason: "EXPLICIT_EXECUTION_UNFREEZE_DECLARATION_COMMAND_INVALID",
      input,
      commandResult,
      sourceCommandReason: null,
      noDeclaration: true,
      noExecutionUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  const declaration: StarBeastRendererExecutionUnfreezeDeclaration =
    Object.freeze({
      source: "explicit_renderer_execution_unfreeze_declaration_command",
      semanticRole: "STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_DECLARATION",
      declarationStatus:
        "DECLARED_FOR_RENDERER_EXECUTION_UNFREEZE_PROTOCOL",
      declarationScope: "STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_PROTOCOL",
      sourceCommandReference: command,
      authorityReference: command.authorityReference,
      readinessReference: command.readinessReference,
      unfreezeDeclarationEndpointGovernanceReference:
        command.unfreezeDeclarationEndpointGovernanceReference,
      authorizationEndpointGovernanceReference:
        command.authorizationEndpointGovernanceReference,
      executionScopeReference: command.executionScopeReference,
      runtimeBoundaryReference: command.runtimeBoundaryReference,
      rollbackStrategyReference: command.rollbackStrategyReference,
      acceptanceScopeReference: command.acceptanceScopeReference,
      executionUnfreezeDecision: command.decision,
      explicitAuthorityConfirmed: true,
      declarationOnly: true,
      executionUnfreezeDeferred: true,
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
    status: "DECLARED",
    source: "star_beast_renderer_execution_unfreeze_declaration_resolver",
    input,
    commandResult,
    declaration,
  });
}
