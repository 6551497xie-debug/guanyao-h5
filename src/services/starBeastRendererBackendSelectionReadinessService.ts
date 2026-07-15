import type {
  StarBeastRendererBackendSelectionReadinessInput,
  StarBeastRendererBackendSelectionReadinessResult,
} from "../types/starBeastRendererBackendSelectionReadiness";

const BACKEND_SELECTION_READINESS_GUARDRAILS = Object.freeze({
  explicitBackendSelectionRequired: true,
  backendSelectionDeferred: true,
  governanceReferenceOnly: true,
  noP71ResultConsumption: true,
  noFrozenEndpointResultConsumption: true,
  noBackendCandidate: true,
  noBackendSelection: true,
  noCapabilityProbe: true,
  noDeviceDetection: true,
  noRendererCreation: true,
  noRenderExecution: true,
} as const);

export function resolveStarBeastRendererBackendSelectionReadiness(
  input: StarBeastRendererBackendSelectionReadinessInput,
): StarBeastRendererBackendSelectionReadinessResult {
  const governanceReference =
    input.authorizationEndpointGovernanceReference;

  if (governanceReference === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      readiness: "UNAVAILABLE",
      source: "star_beast_renderer_backend_selection_readiness",
      reason:
        "EXECUTION_PROTOCOL_AUTHORIZATION_ENDPOINT_GOVERNANCE_REFERENCE_REQUIRED",
      input,
      ...BACKEND_SELECTION_READINESS_GUARDRAILS,
    });
  }

  if (
    governanceReference.referenceType !==
      "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION_ENDPOINT_GOVERNANCE" ||
    governanceReference.referenceId.trim().length === 0
  ) {
    return Object.freeze({
      status: "UNAVAILABLE",
      readiness: "UNAVAILABLE",
      source: "star_beast_renderer_backend_selection_readiness",
      reason:
        "EXECUTION_PROTOCOL_AUTHORIZATION_ENDPOINT_GOVERNANCE_REFERENCE_INVALID",
      input,
      ...BACKEND_SELECTION_READINESS_GUARDRAILS,
    });
  }

  return Object.freeze({
    status: "READY",
    readiness: "READY_FOR_EXPLICIT_RENDERER_BACKEND_SELECTION",
    source: "star_beast_renderer_backend_selection_readiness",
    input,
    authorizationEndpointGovernanceReference: governanceReference,
    explicitBackendSelectionRequired: true,
    backendSelectionDeferred: true,
    governanceReferenceOnly: true,
    noP71ResultConsumption: true,
    noFrozenEndpointResultConsumption: true,
    noBackendCandidate: true,
    noBackendSelection: true,
    noCapabilityProbe: true,
    noDeviceDetection: true,
    noRendererCreation: true,
    noRenderExecution: true,
    noUIIntegration: true,
    noRuntimeIntegration: true,
    noStorageWrite: true,
  });
}
