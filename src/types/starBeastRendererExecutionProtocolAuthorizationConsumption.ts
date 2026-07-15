import type {
  StarBeastRendererExecutionProtocolAuthorization,
  StarBeastRendererExecutionProtocolAuthorizationAuthorized,
  StarBeastRendererExecutionProtocolAuthorizationNotReady,
  StarBeastRendererExecutionProtocolAuthorizationResult,
  StarBeastRendererExecutionProtocolAuthorizationUnavailable,
} from "./starBeastRendererExecutionProtocolAuthorization";

export type StarBeastRendererExecutionProtocolAuthorizationConsumptionInput =
  Readonly<{
    authorizationResult: StarBeastRendererExecutionProtocolAuthorizationResult | null;
  }>;

export type StarBeastRendererExecutionProtocolAuthorizationConsumption =
  Readonly<{
    semanticRole: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION_CONSUMPTION";
    authorizationReference: StarBeastRendererExecutionProtocolAuthorization;
    sourceAuthorizationResult: StarBeastRendererExecutionProtocolAuthorizationAuthorized;
    sourceCommandReference: StarBeastRendererExecutionProtocolAuthorization["sourceCommandReference"];
    authorityReference: StarBeastRendererExecutionProtocolAuthorization["authorityReference"];
    readinessReference: StarBeastRendererExecutionProtocolAuthorization["readinessReference"];
    executionUnfreezeEndpointGovernanceReference: StarBeastRendererExecutionProtocolAuthorization["executionUnfreezeEndpointGovernanceReference"];
    backendSelectionAuthorityReference: StarBeastRendererExecutionProtocolAuthorization["backendSelectionAuthorityReference"];
    executionSliceReference: StarBeastRendererExecutionProtocolAuthorization["executionSliceReference"];
    failureStopReference: StarBeastRendererExecutionProtocolAuthorization["failureStopReference"];
    rollbackReference: StarBeastRendererExecutionProtocolAuthorization["rollbackReference"];
    acceptanceReference: StarBeastRendererExecutionProtocolAuthorization["acceptanceReference"];
    consumptionStatus: "AVAILABLE_FOR_FUTURE_RENDERER_EXECUTION_PROTOCOL_ENDPOINT";
    authorizationConsumedOnly: true;
    executionProtocolEndpointDeferred: true;
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

export type StarBeastRendererExecutionProtocolAuthorizationConsumptionAvailable =
  Readonly<{
    status: "AVAILABLE";
    source: "star_beast_renderer_execution_protocol_authorization_consumption";
    input: StarBeastRendererExecutionProtocolAuthorizationConsumptionInput;
    consumption: StarBeastRendererExecutionProtocolAuthorizationConsumption;
  }>;

export type StarBeastRendererExecutionProtocolAuthorizationConsumptionNotReady =
  Readonly<{
    status: "NOT_READY";
    source: "star_beast_renderer_execution_protocol_authorization_consumption";
    reason: "EXECUTION_PROTOCOL_AUTHORIZATION_NOT_READY";
    input: StarBeastRendererExecutionProtocolAuthorizationConsumptionInput;
    sourceAuthorizationResult: StarBeastRendererExecutionProtocolAuthorizationNotReady;
    sourceAuthorizationReason: StarBeastRendererExecutionProtocolAuthorizationNotReady["reason"];
    noAuthorizationConsumption: true;
    noBackendSelection: true;
    noRendererCreation: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererExecutionProtocolAuthorizationConsumptionUnavailableReason =
  | "EXECUTION_PROTOCOL_AUTHORIZATION_RESULT_REQUIRED"
  | "EXECUTION_PROTOCOL_AUTHORIZATION_UNAVAILABLE";

export type StarBeastRendererExecutionProtocolAuthorizationConsumptionUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    source: "star_beast_renderer_execution_protocol_authorization_consumption";
    reason: StarBeastRendererExecutionProtocolAuthorizationConsumptionUnavailableReason;
    input: StarBeastRendererExecutionProtocolAuthorizationConsumptionInput;
    sourceAuthorizationResult: StarBeastRendererExecutionProtocolAuthorizationUnavailable | null;
    sourceAuthorizationReason: StarBeastRendererExecutionProtocolAuthorizationUnavailable["reason"] | null;
    noAuthorizationConsumption: true;
    noBackendSelection: true;
    noRendererCreation: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererExecutionProtocolAuthorizationConsumptionResult =
  | StarBeastRendererExecutionProtocolAuthorizationConsumptionAvailable
  | StarBeastRendererExecutionProtocolAuthorizationConsumptionNotReady
  | StarBeastRendererExecutionProtocolAuthorizationConsumptionUnavailable;
