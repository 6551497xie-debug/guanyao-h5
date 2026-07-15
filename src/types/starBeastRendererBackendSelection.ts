import type {
  StarBeastRendererExplicitBackendSelectionCommand,
  StarBeastRendererExplicitBackendSelectionCommandAvailable,
  StarBeastRendererExplicitBackendSelectionCommandNotReady,
  StarBeastRendererExplicitBackendSelectionCommandResult,
  StarBeastRendererExplicitBackendSelectionCommandUnavailable,
} from "./starBeastRendererExplicitBackendSelectionCommand";

export type StarBeastRendererBackendSelectionInput = Readonly<{
  commandResult: StarBeastRendererExplicitBackendSelectionCommandResult | null;
}>;

export type StarBeastRendererBackendSelection = Readonly<{
  source: "explicit_renderer_backend_selection_command";
  semanticRole: "STAR_BEAST_RENDERER_BACKEND_SELECTION";
  selectionStatus: "SELECTED_FOR_RENDERER_BACKEND_GOVERNANCE";
  selectionScope: "STAR_BEAST_RENDERER_BACKEND_CANDIDATE_REFERENCE";
  sourceCommandReference: StarBeastRendererExplicitBackendSelectionCommand;
  authorityReference: StarBeastRendererExplicitBackendSelectionCommand["authorityReference"];
  candidateReference: StarBeastRendererExplicitBackendSelectionCommand["candidateReference"];
  readinessReference: StarBeastRendererExplicitBackendSelectionCommand["readinessReference"];
  authorizationEndpointGovernanceReference: StarBeastRendererExplicitBackendSelectionCommand["authorizationEndpointGovernanceReference"];
  selectionDecision: "SELECT_RENDERER_BACKEND";
  explicitAuthorityConfirmed: true;
  backendSelectionOnly: true;
  candidateReferenceOnly: true;
  candidateResolutionDeferred: true;
  backendActivationDeferred: true;
  noAutomaticActivation: true;
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

export type StarBeastRendererBackendSelectionSelected = Readonly<{
  status: "SELECTED";
  source: "star_beast_renderer_backend_selection_resolver";
  input: StarBeastRendererBackendSelectionInput;
  commandResult: StarBeastRendererExplicitBackendSelectionCommandAvailable;
  selection: StarBeastRendererBackendSelection;
}>;

export type StarBeastRendererBackendSelectionNotReadyReason =
  | "EXPLICIT_BACKEND_SELECTION_COMMAND_NOT_READY"
  | "EXPLICIT_BACKEND_SELECTION_COMMAND_INVALID";

export type StarBeastRendererBackendSelectionNotReady = Readonly<{
  status: "NOT_READY";
  source: "star_beast_renderer_backend_selection_resolver";
  reason: StarBeastRendererBackendSelectionNotReadyReason;
  input: StarBeastRendererBackendSelectionInput;
  commandResult:
    | StarBeastRendererExplicitBackendSelectionCommandAvailable
    | StarBeastRendererExplicitBackendSelectionCommandNotReady;
  sourceCommandReason: StarBeastRendererExplicitBackendSelectionCommandNotReady["reason"] | null;
  noBackendSelection: true;
  noRendererCreation: true;
  noRenderExecution: true;
}>;

export type StarBeastRendererBackendSelectionUnavailableReason =
  | "EXPLICIT_BACKEND_SELECTION_COMMAND_RESULT_REQUIRED"
  | "EXPLICIT_BACKEND_SELECTION_COMMAND_UNAVAILABLE";

export type StarBeastRendererBackendSelectionUnavailable = Readonly<{
  status: "UNAVAILABLE";
  source: "star_beast_renderer_backend_selection_resolver";
  reason: StarBeastRendererBackendSelectionUnavailableReason;
  input: StarBeastRendererBackendSelectionInput;
  commandResult: StarBeastRendererExplicitBackendSelectionCommandUnavailable | null;
  sourceCommandReason: StarBeastRendererExplicitBackendSelectionCommandUnavailable["reason"] | null;
  noBackendSelection: true;
  noRendererCreation: true;
  noRenderExecution: true;
}>;

export type StarBeastRendererBackendSelectionResult =
  | StarBeastRendererBackendSelectionSelected
  | StarBeastRendererBackendSelectionNotReady
  | StarBeastRendererBackendSelectionUnavailable;
