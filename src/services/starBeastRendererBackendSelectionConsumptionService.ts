import type {
  StarBeastRendererBackendSelectionConsumption,
  StarBeastRendererBackendSelectionConsumptionInput,
  StarBeastRendererBackendSelectionConsumptionResult,
} from "../types/starBeastRendererBackendSelectionConsumption";

export function consumeStarBeastRendererBackendSelection(
  input: StarBeastRendererBackendSelectionConsumptionInput,
): StarBeastRendererBackendSelectionConsumptionResult {
  const sourceSelectionResult = input.selectionResult;

  if (sourceSelectionResult === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_renderer_backend_selection_consumption",
      reason: "BACKEND_SELECTION_RESULT_REQUIRED",
      input,
      sourceSelectionResult: null,
      sourceSelectionReason: null,
      noSelectionConsumption: true,
      noBackendActivation: true,
      noRendererCreation: true,
      noRenderExecution: true,
    });
  }

  if (sourceSelectionResult.status === "UNAVAILABLE") {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_renderer_backend_selection_consumption",
      reason: "BACKEND_SELECTION_UNAVAILABLE",
      input,
      sourceSelectionResult,
      sourceSelectionReason: sourceSelectionResult.reason,
      noSelectionConsumption: true,
      noBackendActivation: true,
      noRendererCreation: true,
      noRenderExecution: true,
    });
  }

  if (sourceSelectionResult.status === "NOT_READY") {
    return Object.freeze({
      status: "NOT_READY",
      source: "star_beast_renderer_backend_selection_consumption",
      reason: "BACKEND_SELECTION_NOT_READY",
      input,
      sourceSelectionResult,
      sourceSelectionReason: sourceSelectionResult.reason,
      noSelectionConsumption: true,
      noBackendActivation: true,
      noRendererCreation: true,
      noRenderExecution: true,
    });
  }

  const selectionReference = sourceSelectionResult.selection;
  const consumption: StarBeastRendererBackendSelectionConsumption =
    Object.freeze({
      semanticRole: "STAR_BEAST_RENDERER_BACKEND_SELECTION_CONSUMPTION",
      selectionReference,
      sourceSelectionResult,
      sourceCommandReference: selectionReference.sourceCommandReference,
      authorityReference: selectionReference.authorityReference,
      candidateReference: selectionReference.candidateReference,
      readinessReference: selectionReference.readinessReference,
      authorizationEndpointGovernanceReference:
        selectionReference.authorizationEndpointGovernanceReference,
      consumptionStatus:
        "AVAILABLE_FOR_FUTURE_RENDERER_BACKEND_SELECTION_ENDPOINT",
      selectionConsumedOnly: true,
      candidateReferenceOnly: true,
      candidateResolutionDeferred: true,
      backendSelectionEndpointDeferred: true,
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
    status: "AVAILABLE",
    source: "star_beast_renderer_backend_selection_consumption",
    input,
    consumption,
  });
}
