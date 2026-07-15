import type {
  StarBeastRendererReadinessNotReady,
  StarBeastRendererReadinessReady,
  StarBeastRendererReadinessResult,
  StarBeastRendererReadinessUnavailable,
} from "./starBeastRendererReadiness";
import type { StarBeastRendererBackendCapabilityReference } from "./starBeastRendererBackendCapability";

export type StarBeastRendererImplementationRequestReference = Readonly<{
  referenceType: "STAR_BEAST_RENDERER_IMPLEMENTATION_REQUEST";
  referenceId: string;
}>;

export type StarBeastRendererImplementationCandidateInput = Readonly<{
  readinessResult: StarBeastRendererReadinessResult | null;
  implementationRequestReference: StarBeastRendererImplementationRequestReference | null;
  backendCapabilityReference: StarBeastRendererBackendCapabilityReference | null;
}>;

export type StarBeastRendererImplementationCandidate = Readonly<{
  semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_CANDIDATE";
  sourceReadinessReference: StarBeastRendererReadinessReady;
  renderPlanConsumptionReference: StarBeastRendererReadinessReady["renderPlanConsumptionReference"];
  renderPlanReference: StarBeastRendererReadinessReady["renderPlanReference"];
  sourceRequestReference: StarBeastRendererReadinessReady["sourceRequestReference"];
  implementationRequestReference: StarBeastRendererImplementationRequestReference;
  backendCapabilityReference: StarBeastRendererBackendCapabilityReference;
  candidateOnly: true;
  backendAgnostic: true;
  noBackendSelection: true;
  rendererImplementationDeferred: true;
  noRenderExecution: true;
  noUIIntegration: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
}>;

export type StarBeastRendererImplementationCandidateAvailable = Readonly<{
  status: "AVAILABLE";
  source: "star_beast_renderer_implementation_candidate";
  input: StarBeastRendererImplementationCandidateInput;
  candidate: StarBeastRendererImplementationCandidate;
}>;

export type StarBeastRendererImplementationCandidateNotReady = Readonly<{
  status: "NOT_READY";
  source: "star_beast_renderer_implementation_candidate";
  reason: "RENDERER_READINESS_NOT_READY";
  input: StarBeastRendererImplementationCandidateInput;
  sourceReadinessResult: StarBeastRendererReadinessNotReady;
  noCandidate: true;
  noRenderExecution: true;
}>;

export type StarBeastRendererImplementationCandidateUnavailableReason =
  | "RENDERER_READINESS_RESULT_REQUIRED"
  | "RENDERER_READINESS_UNAVAILABLE"
  | "IMPLEMENTATION_REQUEST_REFERENCE_REQUIRED"
  | "BACKEND_CAPABILITY_REFERENCE_REQUIRED";

export type StarBeastRendererImplementationCandidateUnavailable = Readonly<{
  status: "UNAVAILABLE";
  source: "star_beast_renderer_implementation_candidate";
  reason: StarBeastRendererImplementationCandidateUnavailableReason;
  input: StarBeastRendererImplementationCandidateInput;
  sourceReadinessResult: StarBeastRendererReadinessUnavailable | null;
  noCandidate: true;
  noRenderExecution: true;
}>;

export type StarBeastRendererImplementationCandidateResult =
  | StarBeastRendererImplementationCandidateAvailable
  | StarBeastRendererImplementationCandidateNotReady
  | StarBeastRendererImplementationCandidateUnavailable;
