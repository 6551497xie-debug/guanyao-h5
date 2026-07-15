import type {
  StarBeastRendererImplementationCapabilityBinding,
  StarBeastRendererImplementationCapabilityBindingInput,
  StarBeastRendererImplementationCapabilityBindingResult,
  StarBeastRendererImplementationCapabilityBindingUnavailableReason,
} from "../types/starBeastRendererImplementationCapabilityBinding";

const unavailable = (
  input: StarBeastRendererImplementationCapabilityBindingInput,
  reason: StarBeastRendererImplementationCapabilityBindingUnavailableReason,
): StarBeastRendererImplementationCapabilityBindingResult =>
  Object.freeze({
    status: "UNAVAILABLE",
    source: "star_beast_renderer_implementation_capability_binding",
    reason,
    input,
    sourceCandidateResult:
      input.candidateResult?.status === "UNAVAILABLE"
        ? input.candidateResult
        : null,
    sourceCapabilityResult:
      input.backendCapabilityResult?.status === "UNAVAILABLE"
        ? input.backendCapabilityResult
        : null,
    noBinding: true,
    noImplementationAuthorization: true,
    noBackendSelection: true,
    noRenderExecution: true,
  });

export function resolveStarBeastRendererImplementationCapabilityBinding(
  input: StarBeastRendererImplementationCapabilityBindingInput,
): StarBeastRendererImplementationCapabilityBindingResult {
  const candidateResult = input.candidateResult;

  if (candidateResult === null) {
    return unavailable(input, "IMPLEMENTATION_CANDIDATE_RESULT_REQUIRED");
  }

  if (candidateResult.status === "UNAVAILABLE") {
    return unavailable(input, "IMPLEMENTATION_CANDIDATE_UNAVAILABLE");
  }

  if (candidateResult.status === "NOT_READY") {
    return Object.freeze({
      status: "NOT_READY",
      source: "star_beast_renderer_implementation_capability_binding",
      reason: "IMPLEMENTATION_CANDIDATE_NOT_READY",
      input,
      sourceCandidateResult: candidateResult,
      noBinding: true,
      noImplementationAuthorization: true,
      noRenderExecution: true,
    });
  }

  const backendCapabilityResult = input.backendCapabilityResult;

  if (backendCapabilityResult === null) {
    return unavailable(input, "BACKEND_CAPABILITY_RESULT_REQUIRED");
  }

  if (backendCapabilityResult.status === "UNAVAILABLE") {
    return unavailable(input, "BACKEND_CAPABILITY_UNAVAILABLE");
  }

  const candidateCapabilityReference =
    candidateResult.candidate.backendCapabilityReference;
  const declarationCapabilityReference =
    backendCapabilityResult.declaration.declarationReference;
  const referencesMatch =
    candidateCapabilityReference.referenceType ===
      declarationCapabilityReference.referenceType &&
    candidateCapabilityReference.referenceId ===
      declarationCapabilityReference.referenceId;

  if (!referencesMatch) {
    return unavailable(input, "BACKEND_CAPABILITY_REFERENCE_MISMATCH");
  }

  const binding: StarBeastRendererImplementationCapabilityBinding =
    Object.freeze({
      semanticRole:
        "STAR_BEAST_RENDERER_IMPLEMENTATION_CAPABILITY_BINDING",
      sourceCandidateReference: candidateResult.candidate,
      sourceCapabilityDeclarationReference:
        backendCapabilityResult.declaration,
      bindingStatus: "BACKEND_CAPABILITY_REFERENCE_MATCHED",
      referenceMatched: true,
      capabilityDeclarationVerified: true,
      bindingOnly: true,
      noImplementationAuthorization: true,
      noBackendSelection: true,
      noRenderExecution: true,
      noUIIntegration: true,
      noRuntimeIntegration: true,
      noStorageWrite: true,
    });

  return Object.freeze({
    status: "AVAILABLE",
    source: "star_beast_renderer_implementation_capability_binding",
    input,
    sourceCandidateResult: candidateResult,
    sourceCapabilityResult: backendCapabilityResult,
    binding,
  });
}
