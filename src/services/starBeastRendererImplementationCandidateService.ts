import type {
  StarBeastRendererImplementationCandidate,
  StarBeastRendererImplementationCandidateInput,
  StarBeastRendererImplementationCandidateResult,
  StarBeastRendererImplementationCandidateUnavailableReason,
} from "../types/starBeastRendererImplementationCandidate";

const unavailable = (
  input: StarBeastRendererImplementationCandidateInput,
  reason: StarBeastRendererImplementationCandidateUnavailableReason,
): StarBeastRendererImplementationCandidateResult =>
  Object.freeze({
    status: "UNAVAILABLE",
    source: "star_beast_renderer_implementation_candidate",
    reason,
    input,
    sourceReadinessResult:
      input.readinessResult?.status === "UNAVAILABLE"
        ? input.readinessResult
        : null,
    noCandidate: true,
    noRenderExecution: true,
  });

export function resolveStarBeastRendererImplementationCandidate(
  input: StarBeastRendererImplementationCandidateInput,
): StarBeastRendererImplementationCandidateResult {
  const readinessResult = input.readinessResult;

  if (readinessResult === null) {
    return unavailable(input, "RENDERER_READINESS_RESULT_REQUIRED");
  }

  if (readinessResult.status === "UNAVAILABLE") {
    return unavailable(input, "RENDERER_READINESS_UNAVAILABLE");
  }

  if (readinessResult.status === "NOT_READY") {
    return Object.freeze({
      status: "NOT_READY",
      source: "star_beast_renderer_implementation_candidate",
      reason: "RENDERER_READINESS_NOT_READY",
      input,
      sourceReadinessResult: readinessResult,
      noCandidate: true,
      noRenderExecution: true,
    });
  }

  if (input.implementationRequestReference === null) {
    return unavailable(input, "IMPLEMENTATION_REQUEST_REFERENCE_REQUIRED");
  }

  if (input.backendCapabilityReference === null) {
    return unavailable(input, "BACKEND_CAPABILITY_REFERENCE_REQUIRED");
  }

  const candidate: StarBeastRendererImplementationCandidate = Object.freeze({
    semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_CANDIDATE",
    sourceReadinessReference: readinessResult,
    renderPlanConsumptionReference:
      readinessResult.renderPlanConsumptionReference,
    renderPlanReference: readinessResult.renderPlanReference,
    sourceRequestReference: readinessResult.sourceRequestReference,
    implementationRequestReference: input.implementationRequestReference,
    backendCapabilityReference: input.backendCapabilityReference,
    candidateOnly: true,
    backendAgnostic: true,
    noBackendSelection: true,
    rendererImplementationDeferred: true,
    noRenderExecution: true,
    noUIIntegration: true,
    noRuntimeIntegration: true,
    noStorageWrite: true,
  });

  return Object.freeze({
    status: "AVAILABLE",
    source: "star_beast_renderer_implementation_candidate",
    input,
    candidate,
  });
}
