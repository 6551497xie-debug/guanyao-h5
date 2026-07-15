import type {
  StarBeastRendererImplementationUnfreezeDeclaration,
  StarBeastRendererImplementationUnfreezeDeclarationInput,
  StarBeastRendererImplementationUnfreezeDeclarationResult,
} from "../types/starBeastRendererImplementationUnfreezeDeclaration";

export function resolveStarBeastRendererImplementationUnfreezeDeclaration(
  input: StarBeastRendererImplementationUnfreezeDeclarationInput,
): StarBeastRendererImplementationUnfreezeDeclarationResult {
  const commandResult = input.commandResult;

  if (commandResult === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      source:
        "star_beast_renderer_implementation_unfreeze_declaration_resolver",
      reason: "EXPLICIT_UNFREEZE_DECLARATION_COMMAND_RESULT_REQUIRED",
      input,
      commandResult: null,
      sourceCommandReason: null,
      noDeclaration: true,
      noUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  if (commandResult.status === "UNAVAILABLE") {
    return Object.freeze({
      status: "UNAVAILABLE",
      source:
        "star_beast_renderer_implementation_unfreeze_declaration_resolver",
      reason: "EXPLICIT_UNFREEZE_DECLARATION_COMMAND_UNAVAILABLE",
      input,
      commandResult,
      sourceCommandReason: commandResult.reason,
      noDeclaration: true,
      noUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  if (commandResult.status === "NOT_READY") {
    return Object.freeze({
      status: "NOT_READY",
      source:
        "star_beast_renderer_implementation_unfreeze_declaration_resolver",
      reason: "EXPLICIT_UNFREEZE_DECLARATION_COMMAND_NOT_READY",
      input,
      commandResult,
      sourceCommandReason: commandResult.reason,
      noDeclaration: true,
      noUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  const { command, readiness } = commandResult;
  const isValidExplicitCommand =
    command.source === "explicit_renderer_implementation_unfreeze_decision" &&
    command.semanticRole ===
      "STAR_BEAST_RENDERER_EXPLICIT_IMPLEMENTATION_UNFREEZE_DECLARATION_COMMAND" &&
    command.authorityReference.referenceType ===
      "STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_AUTHORITY" &&
    command.authorityReference.referenceId.trim().length > 0 &&
    command.decision === "DECLARE_UNFREEZE" &&
    command.declarationIntent ===
      "DECLARE_STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE" &&
    command.authorityConfirmed === true &&
    command.explicit === true &&
    command.commandOnly === true &&
    command.notUnfreezeDeclaration === true &&
    command.noUnfreezeIssued === true &&
    command.readinessReference === readiness &&
    command.authorizationEndpointGovernanceReference ===
      readiness.authorizationEndpointGovernanceReference &&
    command.implementationScenarioReference ===
      readiness.implementationScenarioReference &&
    command.backendCandidateReferences === readiness.backendCandidateReferences &&
    command.fallbackStrategyReference === readiness.fallbackStrategyReference &&
    command.acceptanceScopeReference === readiness.acceptanceScopeReference;

  if (!isValidExplicitCommand) {
    return Object.freeze({
      status: "NOT_READY",
      source:
        "star_beast_renderer_implementation_unfreeze_declaration_resolver",
      reason: "EXPLICIT_UNFREEZE_DECLARATION_COMMAND_INVALID",
      input,
      commandResult,
      sourceCommandReason: null,
      noDeclaration: true,
      noUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  const declaration: StarBeastRendererImplementationUnfreezeDeclaration =
    Object.freeze({
      source: "explicit_renderer_implementation_unfreeze_declaration_command",
      semanticRole:
        "STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_DECLARATION",
      declarationStatus: "DECLARED_FOR_IMPLEMENTATION_UNFREEZE_PROTOCOL",
      declarationScope: "STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_PROTOCOL",
      sourceCommandReference: command,
      authorityReference: command.authorityReference,
      readinessReference: command.readinessReference,
      authorizationEndpointGovernanceReference:
        command.authorizationEndpointGovernanceReference,
      implementationScenarioReference: command.implementationScenarioReference,
      backendCandidateReferences: command.backendCandidateReferences,
      fallbackStrategyReference: command.fallbackStrategyReference,
      acceptanceScopeReference: command.acceptanceScopeReference,
      unfreezeDecision: command.decision,
      explicitAuthorityConfirmed: true,
      declarationOnly: true,
      unfreezeExecutionDeferred: true,
      noUnfreezeIssued: true,
      noAuthorizationEndpointConsumption: true,
      noFinalBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
      noUIIntegration: true,
      noRuntimeIntegration: true,
      noStorageWrite: true,
    });

  return Object.freeze({
    status: "DECLARED",
    source: "star_beast_renderer_implementation_unfreeze_declaration_resolver",
    input,
    commandResult,
    declaration,
  });
}
