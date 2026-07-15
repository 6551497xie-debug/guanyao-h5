import type {
  StarBeastRendererExecutionProtocolReadinessNotReady,
  StarBeastRendererExecutionProtocolReadinessReady,
  StarBeastRendererExecutionProtocolReadinessResult,
  StarBeastRendererExecutionProtocolReadinessUnavailable,
} from "./starBeastRendererExecutionProtocolReadiness";

export type StarBeastRendererExecutionProtocolAuthorityReference = Readonly<{
  referenceType: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORITY";
  referenceId: string;
}>;

export type StarBeastRendererExplicitExecutionProtocolAuthorizationDecision =
  "AUTHORIZE_RENDERER_EXECUTION_PROTOCOL";

export type StarBeastRendererExplicitExecutionProtocolAuthorizationCommandInput =
  Readonly<{
    readinessResult: StarBeastRendererExecutionProtocolReadinessResult | null;
    authorityReference: StarBeastRendererExecutionProtocolAuthorityReference | null;
    decision:
      | StarBeastRendererExplicitExecutionProtocolAuthorizationDecision
      | null;
  }>;

export type StarBeastRendererExplicitExecutionProtocolAuthorizationCommand =
  Readonly<{
    source: "explicit_renderer_execution_protocol_authorization_decision";
    semanticRole: "STAR_BEAST_RENDERER_EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND";
    authorityReference: StarBeastRendererExecutionProtocolAuthorityReference;
    decision: "AUTHORIZE_RENDERER_EXECUTION_PROTOCOL";
    authorizationIntent: "AUTHORIZE_STAR_BEAST_RENDERER_EXECUTION_PROTOCOL";
    readinessReference: StarBeastRendererExecutionProtocolReadinessReady;
    executionUnfreezeEndpointGovernanceReference: StarBeastRendererExecutionProtocolReadinessReady["executionUnfreezeEndpointGovernanceReference"];
    backendSelectionAuthorityReference: StarBeastRendererExecutionProtocolReadinessReady["backendSelectionAuthorityReference"];
    executionSliceReference: StarBeastRendererExecutionProtocolReadinessReady["executionSliceReference"];
    failureStopReference: StarBeastRendererExecutionProtocolReadinessReady["failureStopReference"];
    rollbackReference: StarBeastRendererExecutionProtocolReadinessReady["rollbackReference"];
    acceptanceReference: StarBeastRendererExecutionProtocolReadinessReady["acceptanceReference"];
    authorityConfirmed: true;
    explicit: true;
    commandOnly: true;
    notExecutionProtocolAuthorization: true;
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

export type StarBeastRendererExplicitExecutionProtocolAuthorizationCommandAvailable =
  Readonly<{
    status: "AVAILABLE";
    source: "star_beast_renderer_explicit_execution_protocol_authorization_command";
    input: StarBeastRendererExplicitExecutionProtocolAuthorizationCommandInput;
    readiness: StarBeastRendererExecutionProtocolReadinessReady;
    command: StarBeastRendererExplicitExecutionProtocolAuthorizationCommand;
  }>;

export type StarBeastRendererExplicitExecutionProtocolAuthorizationCommandNotReadyReason =
  | "EXECUTION_PROTOCOL_READINESS_NOT_READY"
  | "EXECUTION_PROTOCOL_AUTHORITY_REFERENCE_REQUIRED"
  | "EXECUTION_PROTOCOL_AUTHORITY_REFERENCE_INVALID"
  | "EXPLICIT_AUTHORIZE_EXECUTION_PROTOCOL_DECISION_REQUIRED";

export type StarBeastRendererExplicitExecutionProtocolAuthorizationCommandNotReady =
  Readonly<{
    status: "NOT_READY";
    source: "star_beast_renderer_explicit_execution_protocol_authorization_command";
    reason: StarBeastRendererExplicitExecutionProtocolAuthorizationCommandNotReadyReason;
    input: StarBeastRendererExplicitExecutionProtocolAuthorizationCommandInput;
    readiness:
      | StarBeastRendererExecutionProtocolReadinessReady
      | StarBeastRendererExecutionProtocolReadinessNotReady;
    sourceReadinessReason: StarBeastRendererExecutionProtocolReadinessNotReady["reason"] | null;
    noCommand: true;
    notExecutionProtocolAuthorization: true;
    noBackendSelection: true;
    noRendererCreation: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererExplicitExecutionProtocolAuthorizationCommandUnavailableReason =
  | "EXECUTION_PROTOCOL_READINESS_RESULT_REQUIRED"
  | "EXECUTION_PROTOCOL_READINESS_UNAVAILABLE";

export type StarBeastRendererExplicitExecutionProtocolAuthorizationCommandUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    source: "star_beast_renderer_explicit_execution_protocol_authorization_command";
    reason: StarBeastRendererExplicitExecutionProtocolAuthorizationCommandUnavailableReason;
    input: StarBeastRendererExplicitExecutionProtocolAuthorizationCommandInput;
    readiness: StarBeastRendererExecutionProtocolReadinessUnavailable | null;
    sourceReadinessReason: StarBeastRendererExecutionProtocolReadinessUnavailable["reason"] | null;
    noCommand: true;
    notExecutionProtocolAuthorization: true;
    noBackendSelection: true;
    noRendererCreation: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererExplicitExecutionProtocolAuthorizationCommandResult =
  | StarBeastRendererExplicitExecutionProtocolAuthorizationCommandAvailable
  | StarBeastRendererExplicitExecutionProtocolAuthorizationCommandNotReady
  | StarBeastRendererExplicitExecutionProtocolAuthorizationCommandUnavailable;
