import type {
  StarBeastRendererBackendSelectionReadinessReady,
  StarBeastRendererBackendSelectionReadinessResult,
  StarBeastRendererBackendSelectionReadinessUnavailable,
} from "./starBeastRendererBackendSelectionReadiness";
import type { StarBeastRendererBackendSelectionAuthorityReference } from "./starBeastRendererExecutionProtocolReadiness";
import type { StarBeastRendererBackendCandidateReference } from "./starBeastRendererImplementationUnfreezeReadiness";

export type StarBeastRendererExplicitBackendSelectionDecision =
  "SELECT_RENDERER_BACKEND";

export type StarBeastRendererExplicitBackendSelectionCommandInput = Readonly<{
  readinessResult: StarBeastRendererBackendSelectionReadinessResult | null;
  authorityReference: StarBeastRendererBackendSelectionAuthorityReference | null;
  candidateReference: StarBeastRendererBackendCandidateReference | null;
  decision: StarBeastRendererExplicitBackendSelectionDecision | null;
}>;

export type StarBeastRendererExplicitBackendSelectionCommand = Readonly<{
  source: "explicit_renderer_backend_selection_decision";
  semanticRole: "STAR_BEAST_RENDERER_EXPLICIT_BACKEND_SELECTION_COMMAND";
  authorityReference: StarBeastRendererBackendSelectionAuthorityReference;
  candidateReference: StarBeastRendererBackendCandidateReference;
  decision: "SELECT_RENDERER_BACKEND";
  selectionIntent: "SELECT_STAR_BEAST_RENDERER_BACKEND_CANDIDATE";
  readinessReference: StarBeastRendererBackendSelectionReadinessReady;
  authorizationEndpointGovernanceReference: StarBeastRendererBackendSelectionReadinessReady["authorizationEndpointGovernanceReference"];
  authorityConfirmed: true;
  explicit: true;
  commandOnly: true;
  candidateReferenceOnly: true;
  notBackendSelection: true;
  backendSelectionDeferred: true;
  noP71ResultConsumption: true;
  noFrozenEndpointResultConsumption: true;
  noCapabilityProbe: true;
  noDeviceDetection: true;
  noRendererCreation: true;
  noRenderExecution: true;
  noUIIntegration: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
}>;

export type StarBeastRendererExplicitBackendSelectionCommandAvailable =
  Readonly<{
    status: "AVAILABLE";
    source: "star_beast_renderer_explicit_backend_selection_command";
    input: StarBeastRendererExplicitBackendSelectionCommandInput;
    readiness: StarBeastRendererBackendSelectionReadinessReady;
    command: StarBeastRendererExplicitBackendSelectionCommand;
  }>;

export type StarBeastRendererExplicitBackendSelectionCommandNotReadyReason =
  | "BACKEND_SELECTION_AUTHORITY_REFERENCE_REQUIRED"
  | "BACKEND_SELECTION_AUTHORITY_REFERENCE_INVALID"
  | "BACKEND_CANDIDATE_REFERENCE_REQUIRED"
  | "BACKEND_CANDIDATE_REFERENCE_INVALID"
  | "EXPLICIT_BACKEND_SELECTION_DECISION_REQUIRED";

export type StarBeastRendererExplicitBackendSelectionCommandNotReady =
  Readonly<{
    status: "NOT_READY";
    source: "star_beast_renderer_explicit_backend_selection_command";
    reason: StarBeastRendererExplicitBackendSelectionCommandNotReadyReason;
    input: StarBeastRendererExplicitBackendSelectionCommandInput;
    readiness: StarBeastRendererBackendSelectionReadinessReady;
    sourceReadinessReason: null;
    noCommand: true;
    notBackendSelection: true;
    noRendererCreation: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererExplicitBackendSelectionCommandUnavailableReason =
  | "BACKEND_SELECTION_READINESS_RESULT_REQUIRED"
  | "BACKEND_SELECTION_READINESS_UNAVAILABLE";

export type StarBeastRendererExplicitBackendSelectionCommandUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    source: "star_beast_renderer_explicit_backend_selection_command";
    reason: StarBeastRendererExplicitBackendSelectionCommandUnavailableReason;
    input: StarBeastRendererExplicitBackendSelectionCommandInput;
    readiness: StarBeastRendererBackendSelectionReadinessUnavailable | null;
    sourceReadinessReason: StarBeastRendererBackendSelectionReadinessUnavailable["reason"] | null;
    noCommand: true;
    notBackendSelection: true;
    noRendererCreation: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererExplicitBackendSelectionCommandResult =
  | StarBeastRendererExplicitBackendSelectionCommandAvailable
  | StarBeastRendererExplicitBackendSelectionCommandNotReady
  | StarBeastRendererExplicitBackendSelectionCommandUnavailable;
