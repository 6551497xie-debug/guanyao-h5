import type {
  StarBeastRendererExplicitBackendSelectionCommand,
  StarBeastRendererExplicitBackendSelectionCommandInput,
  StarBeastRendererExplicitBackendSelectionCommandResult,
} from "../types/starBeastRendererExplicitBackendSelectionCommand";

const isValidAuthorityReference = (
  reference: StarBeastRendererExplicitBackendSelectionCommandInput["authorityReference"],
): reference is NonNullable<
  StarBeastRendererExplicitBackendSelectionCommandInput["authorityReference"]
> =>
  reference !== null &&
  reference.referenceType ===
    "STAR_BEAST_RENDERER_BACKEND_SELECTION_AUTHORITY" &&
  reference.referenceId.trim().length > 0;

const isValidCandidateReference = (
  reference: StarBeastRendererExplicitBackendSelectionCommandInput["candidateReference"],
): reference is NonNullable<
  StarBeastRendererExplicitBackendSelectionCommandInput["candidateReference"]
> =>
  reference !== null &&
  reference.referenceType === "STAR_BEAST_RENDERER_BACKEND_CANDIDATE" &&
  reference.referenceId.trim().length > 0;

export function resolveStarBeastRendererExplicitBackendSelectionCommand(
  input: StarBeastRendererExplicitBackendSelectionCommandInput,
): StarBeastRendererExplicitBackendSelectionCommandResult {
  const readiness = input.readinessResult;

  if (readiness === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_renderer_explicit_backend_selection_command",
      reason: "BACKEND_SELECTION_READINESS_RESULT_REQUIRED",
      input,
      readiness: null,
      sourceReadinessReason: null,
      noCommand: true,
      notBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
    });
  }

  if (readiness.status === "UNAVAILABLE") {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_renderer_explicit_backend_selection_command",
      reason: "BACKEND_SELECTION_READINESS_UNAVAILABLE",
      input,
      readiness,
      sourceReadinessReason: readiness.reason,
      noCommand: true,
      notBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
    });
  }

  if (input.authorityReference === null) {
    return Object.freeze({
      status: "NOT_READY",
      source: "star_beast_renderer_explicit_backend_selection_command",
      reason: "BACKEND_SELECTION_AUTHORITY_REFERENCE_REQUIRED",
      input,
      readiness,
      sourceReadinessReason: null,
      noCommand: true,
      notBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
    });
  }

  if (!isValidAuthorityReference(input.authorityReference)) {
    return Object.freeze({
      status: "NOT_READY",
      source: "star_beast_renderer_explicit_backend_selection_command",
      reason: "BACKEND_SELECTION_AUTHORITY_REFERENCE_INVALID",
      input,
      readiness,
      sourceReadinessReason: null,
      noCommand: true,
      notBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
    });
  }

  if (input.candidateReference === null) {
    return Object.freeze({
      status: "NOT_READY",
      source: "star_beast_renderer_explicit_backend_selection_command",
      reason: "BACKEND_CANDIDATE_REFERENCE_REQUIRED",
      input,
      readiness,
      sourceReadinessReason: null,
      noCommand: true,
      notBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
    });
  }

  if (!isValidCandidateReference(input.candidateReference)) {
    return Object.freeze({
      status: "NOT_READY",
      source: "star_beast_renderer_explicit_backend_selection_command",
      reason: "BACKEND_CANDIDATE_REFERENCE_INVALID",
      input,
      readiness,
      sourceReadinessReason: null,
      noCommand: true,
      notBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
    });
  }

  if (input.decision !== "SELECT_RENDERER_BACKEND") {
    return Object.freeze({
      status: "NOT_READY",
      source: "star_beast_renderer_explicit_backend_selection_command",
      reason: "EXPLICIT_BACKEND_SELECTION_DECISION_REQUIRED",
      input,
      readiness,
      sourceReadinessReason: null,
      noCommand: true,
      notBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
    });
  }

  const command: StarBeastRendererExplicitBackendSelectionCommand =
    Object.freeze({
      source: "explicit_renderer_backend_selection_decision",
      semanticRole: "STAR_BEAST_RENDERER_EXPLICIT_BACKEND_SELECTION_COMMAND",
      authorityReference: input.authorityReference,
      candidateReference: input.candidateReference,
      decision: input.decision,
      selectionIntent: "SELECT_STAR_BEAST_RENDERER_BACKEND_CANDIDATE",
      readinessReference: readiness,
      authorizationEndpointGovernanceReference:
        readiness.authorizationEndpointGovernanceReference,
      authorityConfirmed: true,
      explicit: true,
      commandOnly: true,
      candidateReferenceOnly: true,
      notBackendSelection: true,
      backendSelectionDeferred: true,
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
    status: "AVAILABLE",
    source: "star_beast_renderer_explicit_backend_selection_command",
    input,
    readiness,
    command,
  });
}
