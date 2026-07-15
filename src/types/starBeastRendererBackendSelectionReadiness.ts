export type StarBeastRendererExecutionProtocolAuthorizationEndpointGovernanceReference =
  Readonly<{
    referenceType: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION_ENDPOINT_GOVERNANCE";
    referenceId: string;
  }>;

export type StarBeastRendererBackendSelectionReadinessInput = Readonly<{
  authorizationEndpointGovernanceReference:
    | StarBeastRendererExecutionProtocolAuthorizationEndpointGovernanceReference
    | null;
}>;

export type StarBeastRendererBackendSelectionReadinessReady = Readonly<{
  status: "READY";
  readiness: "READY_FOR_EXPLICIT_RENDERER_BACKEND_SELECTION";
  source: "star_beast_renderer_backend_selection_readiness";
  input: StarBeastRendererBackendSelectionReadinessInput;
  authorizationEndpointGovernanceReference: StarBeastRendererExecutionProtocolAuthorizationEndpointGovernanceReference;
  explicitBackendSelectionRequired: true;
  backendSelectionDeferred: true;
  governanceReferenceOnly: true;
  noP71ResultConsumption: true;
  noFrozenEndpointResultConsumption: true;
  noBackendCandidate: true;
  noBackendSelection: true;
  noCapabilityProbe: true;
  noDeviceDetection: true;
  noRendererCreation: true;
  noRenderExecution: true;
  noUIIntegration: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
}>;

export type StarBeastRendererBackendSelectionReadinessUnavailableReason =
  | "EXECUTION_PROTOCOL_AUTHORIZATION_ENDPOINT_GOVERNANCE_REFERENCE_REQUIRED"
  | "EXECUTION_PROTOCOL_AUTHORIZATION_ENDPOINT_GOVERNANCE_REFERENCE_INVALID";

export type StarBeastRendererBackendSelectionReadinessUnavailable = Readonly<{
  status: "UNAVAILABLE";
  readiness: "UNAVAILABLE";
  source: "star_beast_renderer_backend_selection_readiness";
  reason: StarBeastRendererBackendSelectionReadinessUnavailableReason;
  input: StarBeastRendererBackendSelectionReadinessInput;
  explicitBackendSelectionRequired: true;
  backendSelectionDeferred: true;
  governanceReferenceOnly: true;
  noP71ResultConsumption: true;
  noFrozenEndpointResultConsumption: true;
  noBackendCandidate: true;
  noBackendSelection: true;
  noCapabilityProbe: true;
  noDeviceDetection: true;
  noRendererCreation: true;
  noRenderExecution: true;
}>;

export type StarBeastRendererBackendSelectionReadinessResult =
  | StarBeastRendererBackendSelectionReadinessReady
  | StarBeastRendererBackendSelectionReadinessUnavailable;
