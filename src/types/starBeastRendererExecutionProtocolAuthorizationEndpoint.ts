import type {
  StarBeastRendererExecutionProtocolAuthorizationConsumption,
  StarBeastRendererExecutionProtocolAuthorizationConsumptionAvailable,
  StarBeastRendererExecutionProtocolAuthorizationConsumptionNotReady,
  StarBeastRendererExecutionProtocolAuthorizationConsumptionResult,
  StarBeastRendererExecutionProtocolAuthorizationConsumptionUnavailable,
} from "./starBeastRendererExecutionProtocolAuthorizationConsumption";

export type StarBeastRendererExecutionProtocolAuthorizationEndpointInput =
  Readonly<{
    consumptionResult: StarBeastRendererExecutionProtocolAuthorizationConsumptionResult | null;
  }>;

export type StarBeastRendererExecutionProtocolAuthorizationEndpoint =
  Readonly<{
    semanticRole: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION_ENDPOINT";
    sourceConsumptionResult: StarBeastRendererExecutionProtocolAuthorizationConsumptionAvailable;
    authorizationConsumptionReference: StarBeastRendererExecutionProtocolAuthorizationConsumption;
    authorizationReference: StarBeastRendererExecutionProtocolAuthorizationConsumption["authorizationReference"];
    sourceCommandReference: StarBeastRendererExecutionProtocolAuthorizationConsumption["sourceCommandReference"];
    authorityReference: StarBeastRendererExecutionProtocolAuthorizationConsumption["authorityReference"];
    readinessReference: StarBeastRendererExecutionProtocolAuthorizationConsumption["readinessReference"];
    executionUnfreezeEndpointGovernanceReference: StarBeastRendererExecutionProtocolAuthorizationConsumption["executionUnfreezeEndpointGovernanceReference"];
    backendSelectionAuthorityReference: StarBeastRendererExecutionProtocolAuthorizationConsumption["backendSelectionAuthorityReference"];
    executionSliceReference: StarBeastRendererExecutionProtocolAuthorizationConsumption["executionSliceReference"];
    failureStopReference: StarBeastRendererExecutionProtocolAuthorizationConsumption["failureStopReference"];
    rollbackReference: StarBeastRendererExecutionProtocolAuthorizationConsumption["rollbackReference"];
    acceptanceReference: StarBeastRendererExecutionProtocolAuthorizationConsumption["acceptanceReference"];
    endpointStatus: "AVAILABLE_FOR_RENDERER_EXECUTION_PROTOCOL_GOVERNANCE_HANDOFF";
    authorizationHandoffOnly: true;
    executionProtocolActivationDeferred: true;
    noAutomaticExecution: true;
    noP65ResultConsumption: true;
    noFrozenEndpointResultConsumption: true;
    noBackendSelection: true;
    noRendererCreation: true;
    noRenderExecution: true;
    noUIIntegration: true;
    noRuntimeIntegration: true;
    noStorageWrite: true;
  }>;

export type StarBeastRendererExecutionProtocolAuthorizationEndpointAvailable =
  Readonly<{
    status: "AVAILABLE";
    source: "star_beast_renderer_execution_protocol_authorization_endpoint";
    input: StarBeastRendererExecutionProtocolAuthorizationEndpointInput;
    endpoint: StarBeastRendererExecutionProtocolAuthorizationEndpoint;
  }>;

export type StarBeastRendererExecutionProtocolAuthorizationEndpointNotReady =
  Readonly<{
    status: "NOT_READY";
    source: "star_beast_renderer_execution_protocol_authorization_endpoint";
    reason: "EXECUTION_PROTOCOL_AUTHORIZATION_CONSUMPTION_NOT_READY";
    input: StarBeastRendererExecutionProtocolAuthorizationEndpointInput;
    sourceConsumptionResult: StarBeastRendererExecutionProtocolAuthorizationConsumptionNotReady;
    sourceConsumptionReason: StarBeastRendererExecutionProtocolAuthorizationConsumptionNotReady["reason"];
    noEndpoint: true;
    noBackendSelection: true;
    noRendererCreation: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererExecutionProtocolAuthorizationEndpointUnavailableReason =
  | "EXECUTION_PROTOCOL_AUTHORIZATION_CONSUMPTION_RESULT_REQUIRED"
  | "EXECUTION_PROTOCOL_AUTHORIZATION_CONSUMPTION_UNAVAILABLE";

export type StarBeastRendererExecutionProtocolAuthorizationEndpointUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    source: "star_beast_renderer_execution_protocol_authorization_endpoint";
    reason: StarBeastRendererExecutionProtocolAuthorizationEndpointUnavailableReason;
    input: StarBeastRendererExecutionProtocolAuthorizationEndpointInput;
    sourceConsumptionResult: StarBeastRendererExecutionProtocolAuthorizationConsumptionUnavailable | null;
    sourceConsumptionReason: StarBeastRendererExecutionProtocolAuthorizationConsumptionUnavailable["reason"] | null;
    noEndpoint: true;
    noBackendSelection: true;
    noRendererCreation: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererExecutionProtocolAuthorizationEndpointResult =
  | StarBeastRendererExecutionProtocolAuthorizationEndpointAvailable
  | StarBeastRendererExecutionProtocolAuthorizationEndpointNotReady
  | StarBeastRendererExecutionProtocolAuthorizationEndpointUnavailable;
