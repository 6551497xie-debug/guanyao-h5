import type {
  StarBeastRendererBackendSelection,
  StarBeastRendererBackendSelectionNotReady,
  StarBeastRendererBackendSelectionResult,
  StarBeastRendererBackendSelectionSelected,
  StarBeastRendererBackendSelectionUnavailable,
} from "./starBeastRendererBackendSelection";

export type StarBeastRendererBackendSelectionConsumptionInput = Readonly<{
  selectionResult: StarBeastRendererBackendSelectionResult | null;
}>;

export type StarBeastRendererBackendSelectionConsumption = Readonly<{
  semanticRole: "STAR_BEAST_RENDERER_BACKEND_SELECTION_CONSUMPTION";
  selectionReference: StarBeastRendererBackendSelection;
  sourceSelectionResult: StarBeastRendererBackendSelectionSelected;
  sourceCommandReference: StarBeastRendererBackendSelection["sourceCommandReference"];
  authorityReference: StarBeastRendererBackendSelection["authorityReference"];
  candidateReference: StarBeastRendererBackendSelection["candidateReference"];
  readinessReference: StarBeastRendererBackendSelection["readinessReference"];
  authorizationEndpointGovernanceReference: StarBeastRendererBackendSelection["authorizationEndpointGovernanceReference"];
  consumptionStatus: "AVAILABLE_FOR_FUTURE_RENDERER_BACKEND_SELECTION_ENDPOINT";
  selectionConsumedOnly: true;
  candidateReferenceOnly: true;
  candidateResolutionDeferred: true;
  backendSelectionEndpointDeferred: true;
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

export type StarBeastRendererBackendSelectionConsumptionAvailable = Readonly<{
  status: "AVAILABLE";
  source: "star_beast_renderer_backend_selection_consumption";
  input: StarBeastRendererBackendSelectionConsumptionInput;
  consumption: StarBeastRendererBackendSelectionConsumption;
}>;

export type StarBeastRendererBackendSelectionConsumptionNotReady = Readonly<{
  status: "NOT_READY";
  source: "star_beast_renderer_backend_selection_consumption";
  reason: "BACKEND_SELECTION_NOT_READY";
  input: StarBeastRendererBackendSelectionConsumptionInput;
  sourceSelectionResult: StarBeastRendererBackendSelectionNotReady;
  sourceSelectionReason: StarBeastRendererBackendSelectionNotReady["reason"];
  noSelectionConsumption: true;
  noBackendActivation: true;
  noRendererCreation: true;
  noRenderExecution: true;
}>;

export type StarBeastRendererBackendSelectionConsumptionUnavailableReason =
  | "BACKEND_SELECTION_RESULT_REQUIRED"
  | "BACKEND_SELECTION_UNAVAILABLE";

export type StarBeastRendererBackendSelectionConsumptionUnavailable = Readonly<{
  status: "UNAVAILABLE";
  source: "star_beast_renderer_backend_selection_consumption";
  reason: StarBeastRendererBackendSelectionConsumptionUnavailableReason;
  input: StarBeastRendererBackendSelectionConsumptionInput;
  sourceSelectionResult: StarBeastRendererBackendSelectionUnavailable | null;
  sourceSelectionReason: StarBeastRendererBackendSelectionUnavailable["reason"] | null;
  noSelectionConsumption: true;
  noBackendActivation: true;
  noRendererCreation: true;
  noRenderExecution: true;
}>;

export type StarBeastRendererBackendSelectionConsumptionResult =
  | StarBeastRendererBackendSelectionConsumptionAvailable
  | StarBeastRendererBackendSelectionConsumptionNotReady
  | StarBeastRendererBackendSelectionConsumptionUnavailable;
