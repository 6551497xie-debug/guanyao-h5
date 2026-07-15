import type {
  StarBeastRendererBackendSelection,
  StarBeastRendererBackendSelectionInput,
  StarBeastRendererBackendSelectionResult,
} from "../types/starBeastRendererBackendSelection";

export function resolveStarBeastRendererBackendSelection(
  input: StarBeastRendererBackendSelectionInput,
): StarBeastRendererBackendSelectionResult {
  const commandResult = input.commandResult;

  if (commandResult === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_renderer_backend_selection_resolver",
      reason: "EXPLICIT_BACKEND_SELECTION_COMMAND_RESULT_REQUIRED",
      input,
      commandResult: null,
      sourceCommandReason: null,
      noBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
    });
  }

  if (commandResult.status === "UNAVAILABLE") {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_renderer_backend_selection_resolver",
      reason: "EXPLICIT_BACKEND_SELECTION_COMMAND_UNAVAILABLE",
      input,
      commandResult,
      sourceCommandReason: commandResult.reason,
      noBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
    });
  }

  if (commandResult.status === "NOT_READY") {
    return Object.freeze({
      status: "NOT_READY",
      source: "star_beast_renderer_backend_selection_resolver",
      reason: "EXPLICIT_BACKEND_SELECTION_COMMAND_NOT_READY",
      input,
      commandResult,
      sourceCommandReason: commandResult.reason,
      noBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
    });
  }

  const { command, readiness } = commandResult;
  const sourceInput = commandResult.input;
  const isValidExplicitCommand =
    command.source === "explicit_renderer_backend_selection_decision" &&
    command.semanticRole ===
      "STAR_BEAST_RENDERER_EXPLICIT_BACKEND_SELECTION_COMMAND" &&
    command.authorityReference.referenceType ===
      "STAR_BEAST_RENDERER_BACKEND_SELECTION_AUTHORITY" &&
    command.authorityReference.referenceId.trim().length > 0 &&
    command.candidateReference.referenceType ===
      "STAR_BEAST_RENDERER_BACKEND_CANDIDATE" &&
    command.candidateReference.referenceId.trim().length > 0 &&
    command.decision === "SELECT_RENDERER_BACKEND" &&
    command.selectionIntent ===
      "SELECT_STAR_BEAST_RENDERER_BACKEND_CANDIDATE" &&
    command.authorityConfirmed === true &&
    command.explicit === true &&
    command.commandOnly === true &&
    command.candidateReferenceOnly === true &&
    command.notBackendSelection === true &&
    command.backendSelectionDeferred === true &&
    command.noP71ResultConsumption === true &&
    command.noFrozenEndpointResultConsumption === true &&
    command.noCapabilityProbe === true &&
    command.noDeviceDetection === true &&
    command.noRendererCreation === true &&
    command.noRenderExecution === true &&
    command.readinessReference === readiness &&
    command.authorizationEndpointGovernanceReference ===
      readiness.authorizationEndpointGovernanceReference &&
    sourceInput.readinessResult === readiness &&
    sourceInput.authorityReference === command.authorityReference &&
    sourceInput.candidateReference === command.candidateReference &&
    sourceInput.decision === command.decision;

  if (!isValidExplicitCommand) {
    return Object.freeze({
      status: "NOT_READY",
      source: "star_beast_renderer_backend_selection_resolver",
      reason: "EXPLICIT_BACKEND_SELECTION_COMMAND_INVALID",
      input,
      commandResult,
      sourceCommandReason: null,
      noBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
    });
  }

  const selection: StarBeastRendererBackendSelection = Object.freeze({
    source: "explicit_renderer_backend_selection_command",
    semanticRole: "STAR_BEAST_RENDERER_BACKEND_SELECTION",
    selectionStatus: "SELECTED_FOR_RENDERER_BACKEND_GOVERNANCE",
    selectionScope: "STAR_BEAST_RENDERER_BACKEND_CANDIDATE_REFERENCE",
    sourceCommandReference: command,
    authorityReference: command.authorityReference,
    candidateReference: command.candidateReference,
    readinessReference: command.readinessReference,
    authorizationEndpointGovernanceReference:
      command.authorizationEndpointGovernanceReference,
    selectionDecision: command.decision,
    explicitAuthorityConfirmed: true,
    backendSelectionOnly: true,
    candidateReferenceOnly: true,
    candidateResolutionDeferred: true,
    backendActivationDeferred: true,
    noAutomaticActivation: true,
    noP71ResultConsumption: true,
    noFrozenEndpointResultConsumption: true,
    noCapabilityProbe: true,
    noDeviceDetection: true,
    noRendererCreation: true,
    noRenderExecution: true,
    noUIIntegration: true,
    noRuntimeIntegration: true,
    noStorageWrite: true,
  });

  return Object.freeze({
    status: "SELECTED",
    source: "star_beast_renderer_backend_selection_resolver",
    input,
    commandResult,
    selection,
  });
}
