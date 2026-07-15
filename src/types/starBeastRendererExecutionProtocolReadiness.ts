export type StarBeastRendererExecutionUnfreezeEndpointGovernanceReference =
  Readonly<{
    referenceType: "STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_ENDPOINT_GOVERNANCE";
    referenceId: string;
  }>;

export type StarBeastRendererBackendSelectionAuthorityReference = Readonly<{
  referenceType: "STAR_BEAST_RENDERER_BACKEND_SELECTION_AUTHORITY";
  referenceId: string;
}>;

export type StarBeastRendererExecutionSliceReference = Readonly<{
  referenceType: "STAR_BEAST_RENDERER_EXECUTION_SLICE";
  referenceId: string;
}>;

export type StarBeastRendererExecutionFailureStopReference = Readonly<{
  referenceType: "STAR_BEAST_RENDERER_EXECUTION_FAILURE_STOP";
  referenceId: string;
}>;

export type StarBeastRendererExecutionProtocolRollbackReference = Readonly<{
  referenceType: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_ROLLBACK";
  referenceId: string;
}>;

export type StarBeastRendererExecutionProtocolAcceptanceReference = Readonly<{
  referenceType: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_ACCEPTANCE";
  referenceId: string;
}>;

export type StarBeastRendererExecutionProtocolReadinessInput = Readonly<{
  executionUnfreezeEndpointGovernanceReference:
    | StarBeastRendererExecutionUnfreezeEndpointGovernanceReference
    | null;
  backendSelectionAuthorityReference:
    | StarBeastRendererBackendSelectionAuthorityReference
    | null;
  executionSliceReference: StarBeastRendererExecutionSliceReference | null;
  failureStopReference:
    | StarBeastRendererExecutionFailureStopReference
    | null;
  rollbackReference:
    | StarBeastRendererExecutionProtocolRollbackReference
    | null;
  acceptanceReference:
    | StarBeastRendererExecutionProtocolAcceptanceReference
    | null;
}>;

export type StarBeastRendererExecutionProtocolReadinessReady = Readonly<{
  status: "READY";
  readiness: "READY_FOR_EXPLICIT_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION";
  source: "star_beast_renderer_execution_protocol_readiness";
  input: StarBeastRendererExecutionProtocolReadinessInput;
  executionUnfreezeEndpointGovernanceReference: StarBeastRendererExecutionUnfreezeEndpointGovernanceReference;
  backendSelectionAuthorityReference: StarBeastRendererBackendSelectionAuthorityReference;
  executionSliceReference: StarBeastRendererExecutionSliceReference;
  failureStopReference: StarBeastRendererExecutionFailureStopReference;
  rollbackReference: StarBeastRendererExecutionProtocolRollbackReference;
  acceptanceReference: StarBeastRendererExecutionProtocolAcceptanceReference;
  explicitExecutionProtocolAuthorizationRequired: true;
  executionProtocolAuthorizationDeferred: true;
  noP65ResultConsumption: true;
  noFrozenEndpointResultConsumption: true;
  noBackendSelection: true;
  noRendererCreation: true;
  noRenderExecution: true;
  noUIIntegration: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
}>;

export type StarBeastRendererExecutionProtocolReadinessNotReadyReason =
  | "BACKEND_SELECTION_AUTHORITY_REFERENCE_REQUIRED"
  | "BACKEND_SELECTION_AUTHORITY_REFERENCE_INVALID"
  | "EXECUTION_SLICE_REFERENCE_REQUIRED"
  | "EXECUTION_SLICE_REFERENCE_INVALID"
  | "FAILURE_STOP_REFERENCE_REQUIRED"
  | "FAILURE_STOP_REFERENCE_INVALID"
  | "EXECUTION_PROTOCOL_ROLLBACK_REFERENCE_REQUIRED"
  | "EXECUTION_PROTOCOL_ROLLBACK_REFERENCE_INVALID"
  | "EXECUTION_PROTOCOL_ACCEPTANCE_REFERENCE_REQUIRED"
  | "EXECUTION_PROTOCOL_ACCEPTANCE_REFERENCE_INVALID";

export type StarBeastRendererExecutionProtocolReadinessNotReady = Readonly<{
  status: "NOT_READY";
  readiness: "NOT_READY";
  source: "star_beast_renderer_execution_protocol_readiness";
  reason: StarBeastRendererExecutionProtocolReadinessNotReadyReason;
  input: StarBeastRendererExecutionProtocolReadinessInput;
  explicitExecutionProtocolAuthorizationRequired: true;
  executionProtocolAuthorizationDeferred: true;
  noP65ResultConsumption: true;
  noFrozenEndpointResultConsumption: true;
  noBackendSelection: true;
  noRendererCreation: true;
  noRenderExecution: true;
}>;

export type StarBeastRendererExecutionProtocolReadinessUnavailableReason =
  | "EXECUTION_UNFREEZE_ENDPOINT_GOVERNANCE_REFERENCE_REQUIRED"
  | "EXECUTION_UNFREEZE_ENDPOINT_GOVERNANCE_REFERENCE_INVALID";

export type StarBeastRendererExecutionProtocolReadinessUnavailable = Readonly<{
  status: "UNAVAILABLE";
  readiness: "UNAVAILABLE";
  source: "star_beast_renderer_execution_protocol_readiness";
  reason: StarBeastRendererExecutionProtocolReadinessUnavailableReason;
  input: StarBeastRendererExecutionProtocolReadinessInput;
  explicitExecutionProtocolAuthorizationRequired: true;
  executionProtocolAuthorizationDeferred: true;
  noP65ResultConsumption: true;
  noFrozenEndpointResultConsumption: true;
  noBackendSelection: true;
  noRendererCreation: true;
  noRenderExecution: true;
}>;

export type StarBeastRendererExecutionProtocolReadinessResult =
  | StarBeastRendererExecutionProtocolReadinessReady
  | StarBeastRendererExecutionProtocolReadinessNotReady
  | StarBeastRendererExecutionProtocolReadinessUnavailable;
