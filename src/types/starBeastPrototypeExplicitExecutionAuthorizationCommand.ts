import type {
  StarBeastPrototypeRendererExecutionReadinessBlocked,
  StarBeastPrototypeRendererExecutionReadinessReady,
  StarBeastPrototypeRendererExecutionReadinessResult,
  StarBeastPrototypeRendererExecutionReadinessUnavailable,
} from "./starBeastPrototypeRendererExecutionReadiness";

export type StarBeastPrototypeExecutionAuthorityReference = Readonly<{
  referenceType: "STAR_BEAST_PROTOTYPE_EXECUTION_AUTHORITY";
  referenceId: string;
  authorityScope: "ISOLATED_PROTOTYPE_EXECUTION_ONLY";
}>;

export type StarBeastPrototypeExplicitExecutionAuthorizationDecision =
  "AUTHORIZE_ISOLATED_PROTOTYPE_EXECUTION";

export type StarBeastPrototypeExplicitExecutionAuthorizationCommandInput =
  Readonly<{
    readinessResultReference:
      | StarBeastPrototypeRendererExecutionReadinessResult
      | null;
    authorityReference: StarBeastPrototypeExecutionAuthorityReference | null;
    decision:
      | StarBeastPrototypeExplicitExecutionAuthorizationDecision
      | null;
  }>;

type StarBeastPrototypeExplicitExecutionAuthorizationCommandBoundary =
  Readonly<{
    commandOnly: true;
    notExecutionAuthorization: true;
    executionAuthorizationDeferred: true;
    noRendererInvocation: true;
    noRenderExecution: true;
    noDrawCommands: true;
    noBackendSelection: true;
    noRenderPlanGeneration: true;
    noCanvasConnection: true;
    noStarbeastLabConnection: true;
    noRuntimeIntegration: true;
    noStorageWrite: true;
  }>;

export type StarBeastPrototypeExplicitExecutionAuthorizationCommand =
  Readonly<{
    source: "explicit_isolated_prototype_execution_authorization_decision";
    semanticRole:
      "STAR_BEAST_PROTOTYPE_EXPLICIT_EXECUTION_AUTHORIZATION_COMMAND";
    authorityReference: StarBeastPrototypeExecutionAuthorityReference;
    decision: "AUTHORIZE_ISOLATED_PROTOTYPE_EXECUTION";
    authorizationIntent:
      "AUTHORIZE_FUTURE_ISOLATED_PROTOTYPE_EXECUTION_RESOLUTION";
    readinessReference: StarBeastPrototypeRendererExecutionReadinessReady;
    inputContractReference:
      StarBeastPrototypeRendererExecutionReadinessReady["inputContractReference"];
    executionSliceReference:
      StarBeastPrototypeRendererExecutionReadinessReady["executionSliceReference"];
    executionStopReference:
      StarBeastPrototypeRendererExecutionReadinessReady["executionStopReference"];
    authorityConfirmed: true;
    explicit: true;
    boundary: StarBeastPrototypeExplicitExecutionAuthorizationCommandBoundary;
  }>;

export type StarBeastPrototypeExplicitExecutionAuthorizationCommandAvailable =
  Readonly<{
    status: "AVAILABLE";
    source: "star_beast_prototype_explicit_execution_authorization_command";
    input: StarBeastPrototypeExplicitExecutionAuthorizationCommandInput;
    readinessReference: StarBeastPrototypeRendererExecutionReadinessReady;
    command: StarBeastPrototypeExplicitExecutionAuthorizationCommand;
  }>;

export type StarBeastPrototypeExplicitExecutionAuthorizationCommandNotReadyReason =
  | "PROTOTYPE_EXECUTION_AUTHORITY_REFERENCE_REQUIRED"
  | "PROTOTYPE_EXECUTION_AUTHORITY_REFERENCE_INVALID"
  | "EXPLICIT_ISOLATED_PROTOTYPE_EXECUTION_DECISION_REQUIRED";

export type StarBeastPrototypeExplicitExecutionAuthorizationCommandNotReady =
  Readonly<{
    status: "NOT_READY";
    source: "star_beast_prototype_explicit_execution_authorization_command";
    reason: StarBeastPrototypeExplicitExecutionAuthorizationCommandNotReadyReason;
    input: StarBeastPrototypeExplicitExecutionAuthorizationCommandInput;
    readinessReference: StarBeastPrototypeRendererExecutionReadinessReady;
    noCommand: true;
    boundary: StarBeastPrototypeExplicitExecutionAuthorizationCommandBoundary;
  }>;

export type StarBeastPrototypeExplicitExecutionAuthorizationCommandUnavailableReason =
  | "PROTOTYPE_EXECUTION_READINESS_RESULT_REQUIRED"
  | "PROTOTYPE_EXECUTION_READINESS_UNAVAILABLE";

export type StarBeastPrototypeExplicitExecutionAuthorizationCommandUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    source: "star_beast_prototype_explicit_execution_authorization_command";
    reason: StarBeastPrototypeExplicitExecutionAuthorizationCommandUnavailableReason;
    input: StarBeastPrototypeExplicitExecutionAuthorizationCommandInput;
    readinessReference:
      | StarBeastPrototypeRendererExecutionReadinessUnavailable
      | null;
    sourceReadinessReason:
      | StarBeastPrototypeRendererExecutionReadinessUnavailable["reason"]
      | null;
    noCommand: true;
    boundary: StarBeastPrototypeExplicitExecutionAuthorizationCommandBoundary;
  }>;

export type StarBeastPrototypeExplicitExecutionAuthorizationCommandBlocked =
  Readonly<{
    status: "BLOCKED";
    source: "star_beast_prototype_explicit_execution_authorization_command";
    reason: "PROTOTYPE_EXECUTION_READINESS_BLOCKED";
    input: StarBeastPrototypeExplicitExecutionAuthorizationCommandInput;
    readinessReference: StarBeastPrototypeRendererExecutionReadinessBlocked;
    sourceReadinessReason:
      StarBeastPrototypeRendererExecutionReadinessBlocked["reason"];
    noCommand: true;
    boundary: StarBeastPrototypeExplicitExecutionAuthorizationCommandBoundary;
  }>;

export type StarBeastPrototypeExplicitExecutionAuthorizationCommandResult =
  | StarBeastPrototypeExplicitExecutionAuthorizationCommandAvailable
  | StarBeastPrototypeExplicitExecutionAuthorizationCommandNotReady
  | StarBeastPrototypeExplicitExecutionAuthorizationCommandUnavailable
  | StarBeastPrototypeExplicitExecutionAuthorizationCommandBlocked;
