import type {
  StarBeastRendererBackendCapabilityAvailable,
  StarBeastRendererBackendCapabilityDeclaration,
  StarBeastRendererBackendCapabilityResult,
  StarBeastRendererBackendCapabilityUnavailable,
} from "./starBeastRendererBackendCapability";
import type {
  StarBeastRendererImplementationCandidate,
  StarBeastRendererImplementationCandidateAvailable,
  StarBeastRendererImplementationCandidateNotReady,
  StarBeastRendererImplementationCandidateResult,
  StarBeastRendererImplementationCandidateUnavailable,
} from "./starBeastRendererImplementationCandidate";

export type StarBeastRendererImplementationCapabilityBindingInput = Readonly<{
  candidateResult: StarBeastRendererImplementationCandidateResult | null;
  backendCapabilityResult: StarBeastRendererBackendCapabilityResult | null;
}>;

export type StarBeastRendererImplementationCapabilityBinding = Readonly<{
  semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_CAPABILITY_BINDING";
  sourceCandidateReference: StarBeastRendererImplementationCandidate;
  sourceCapabilityDeclarationReference: StarBeastRendererBackendCapabilityDeclaration;
  bindingStatus: "BACKEND_CAPABILITY_REFERENCE_MATCHED";
  referenceMatched: true;
  capabilityDeclarationVerified: true;
  bindingOnly: true;
  noImplementationAuthorization: true;
  noBackendSelection: true;
  noRenderExecution: true;
  noUIIntegration: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
}>;

export type StarBeastRendererImplementationCapabilityBindingAvailable =
  Readonly<{
    status: "AVAILABLE";
    source: "star_beast_renderer_implementation_capability_binding";
    input: StarBeastRendererImplementationCapabilityBindingInput;
    sourceCandidateResult: StarBeastRendererImplementationCandidateAvailable;
    sourceCapabilityResult: StarBeastRendererBackendCapabilityAvailable;
    binding: StarBeastRendererImplementationCapabilityBinding;
  }>;

export type StarBeastRendererImplementationCapabilityBindingNotReady =
  Readonly<{
    status: "NOT_READY";
    source: "star_beast_renderer_implementation_capability_binding";
    reason: "IMPLEMENTATION_CANDIDATE_NOT_READY";
    input: StarBeastRendererImplementationCapabilityBindingInput;
    sourceCandidateResult: StarBeastRendererImplementationCandidateNotReady;
    noBinding: true;
    noImplementationAuthorization: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererImplementationCapabilityBindingUnavailableReason =
  | "IMPLEMENTATION_CANDIDATE_RESULT_REQUIRED"
  | "IMPLEMENTATION_CANDIDATE_UNAVAILABLE"
  | "BACKEND_CAPABILITY_RESULT_REQUIRED"
  | "BACKEND_CAPABILITY_UNAVAILABLE"
  | "BACKEND_CAPABILITY_REFERENCE_MISMATCH";

export type StarBeastRendererImplementationCapabilityBindingUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    source: "star_beast_renderer_implementation_capability_binding";
    reason: StarBeastRendererImplementationCapabilityBindingUnavailableReason;
    input: StarBeastRendererImplementationCapabilityBindingInput;
    sourceCandidateResult: StarBeastRendererImplementationCandidateUnavailable | null;
    sourceCapabilityResult: StarBeastRendererBackendCapabilityUnavailable | null;
    noBinding: true;
    noImplementationAuthorization: true;
    noBackendSelection: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererImplementationCapabilityBindingResult =
  | StarBeastRendererImplementationCapabilityBindingAvailable
  | StarBeastRendererImplementationCapabilityBindingNotReady
  | StarBeastRendererImplementationCapabilityBindingUnavailable;
