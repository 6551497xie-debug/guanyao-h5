import type {
  StarBeastRendererExplicitExecutionProtocolAuthorizationCommand,
  StarBeastRendererExplicitExecutionProtocolAuthorizationCommandAvailable,
  StarBeastRendererExplicitExecutionProtocolAuthorizationCommandNotReady,
  StarBeastRendererExplicitExecutionProtocolAuthorizationCommandResult,
  StarBeastRendererExplicitExecutionProtocolAuthorizationCommandUnavailable,
} from "./starBeastRendererExplicitExecutionProtocolAuthorizationCommand";

export type StarBeastRendererExecutionProtocolAuthorizationInput = Readonly<{
  commandResult: StarBeastRendererExplicitExecutionProtocolAuthorizationCommandResult | null;
}>;

export type StarBeastRendererExecutionProtocolAuthorization = Readonly<{
  source: "explicit_renderer_execution_protocol_authorization_command";
  semanticRole: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION";
  authorizationStatus: "AUTHORIZED_FOR_RENDERER_EXECUTION_PROTOCOL";
  authorizationScope: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL";
  sourceCommandReference: StarBeastRendererExplicitExecutionProtocolAuthorizationCommand;
  authorityReference: StarBeastRendererExplicitExecutionProtocolAuthorizationCommand["authorityReference"];
  readinessReference: StarBeastRendererExplicitExecutionProtocolAuthorizationCommand["readinessReference"];
  executionUnfreezeEndpointGovernanceReference: StarBeastRendererExplicitExecutionProtocolAuthorizationCommand["executionUnfreezeEndpointGovernanceReference"];
  backendSelectionAuthorityReference: StarBeastRendererExplicitExecutionProtocolAuthorizationCommand["backendSelectionAuthorityReference"];
  executionSliceReference: StarBeastRendererExplicitExecutionProtocolAuthorizationCommand["executionSliceReference"];
  failureStopReference: StarBeastRendererExplicitExecutionProtocolAuthorizationCommand["failureStopReference"];
  rollbackReference: StarBeastRendererExplicitExecutionProtocolAuthorizationCommand["rollbackReference"];
  acceptanceReference: StarBeastRendererExplicitExecutionProtocolAuthorizationCommand["acceptanceReference"];
  authorizationDecision: "AUTHORIZE_RENDERER_EXECUTION_PROTOCOL";
  explicitAuthorityConfirmed: true;
  authorizationOnly: true;
  noAutomaticExecution: true;
  executionProtocolActivationDeferred: true;
  noP65ResultConsumption: true;
  noFrozenEndpointResultConsumption: true;
  noBackendSelection: true;
  noRendererCreation: true;
  noRenderExecution: true;
  noUIIntegration: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
}>;

export type StarBeastRendererExecutionProtocolAuthorizationAuthorized =
  Readonly<{
    status: "AUTHORIZED";
    source: "star_beast_renderer_execution_protocol_authorization_resolver";
    input: StarBeastRendererExecutionProtocolAuthorizationInput;
    commandResult: StarBeastRendererExplicitExecutionProtocolAuthorizationCommandAvailable;
    authorization: StarBeastRendererExecutionProtocolAuthorization;
  }>;

export type StarBeastRendererExecutionProtocolAuthorizationNotReadyReason =
  | "EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND_NOT_READY"
  | "EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND_INVALID";

export type StarBeastRendererExecutionProtocolAuthorizationNotReady =
  Readonly<{
    status: "NOT_READY";
    source: "star_beast_renderer_execution_protocol_authorization_resolver";
    reason: StarBeastRendererExecutionProtocolAuthorizationNotReadyReason;
    input: StarBeastRendererExecutionProtocolAuthorizationInput;
    commandResult:
      | StarBeastRendererExplicitExecutionProtocolAuthorizationCommandAvailable
      | StarBeastRendererExplicitExecutionProtocolAuthorizationCommandNotReady;
    sourceCommandReason: StarBeastRendererExplicitExecutionProtocolAuthorizationCommandNotReady["reason"] | null;
    noAuthorization: true;
    noBackendSelection: true;
    noRendererCreation: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererExecutionProtocolAuthorizationUnavailableReason =
  | "EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND_RESULT_REQUIRED"
  | "EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND_UNAVAILABLE";

export type StarBeastRendererExecutionProtocolAuthorizationUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    source: "star_beast_renderer_execution_protocol_authorization_resolver";
    reason: StarBeastRendererExecutionProtocolAuthorizationUnavailableReason;
    input: StarBeastRendererExecutionProtocolAuthorizationInput;
    commandResult: StarBeastRendererExplicitExecutionProtocolAuthorizationCommandUnavailable | null;
    sourceCommandReason: StarBeastRendererExplicitExecutionProtocolAuthorizationCommandUnavailable["reason"] | null;
    noAuthorization: true;
    noBackendSelection: true;
    noRendererCreation: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererExecutionProtocolAuthorizationResult =
  | StarBeastRendererExecutionProtocolAuthorizationAuthorized
  | StarBeastRendererExecutionProtocolAuthorizationNotReady
  | StarBeastRendererExecutionProtocolAuthorizationUnavailable;
