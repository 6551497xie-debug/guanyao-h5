import type {
  StarBeastRendererImplementationAuthorizationReadinessNotReady,
  StarBeastRendererImplementationAuthorizationReadinessReady,
  StarBeastRendererImplementationAuthorizationReadinessResult,
  StarBeastRendererImplementationAuthorizationReadinessUnavailable,
} from "./starBeastRendererImplementationAuthorizationReadiness";

export type StarBeastRendererImplementationAuthorityReference = Readonly<{
  referenceType: "STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORITY";
  referenceId: string;
}>;

export type StarBeastRendererExplicitImplementationAuthorizationDecision =
  "AUTHORIZE";

export type StarBeastRendererExplicitImplementationAuthorizationCommandInput =
  Readonly<{
    readinessResult: StarBeastRendererImplementationAuthorizationReadinessResult | null;
    authorityReference: StarBeastRendererImplementationAuthorityReference | null;
    decision: StarBeastRendererExplicitImplementationAuthorizationDecision | null;
  }>;

export type StarBeastRendererExplicitImplementationAuthorizationCommand =
  Readonly<{
    source: "explicit_renderer_implementation_authorization_decision";
    semanticRole: "STAR_BEAST_RENDERER_EXPLICIT_IMPLEMENTATION_AUTHORIZATION_COMMAND";
    authorityReference: StarBeastRendererImplementationAuthorityReference;
    decision: "AUTHORIZE";
    authorizationIntent: "AUTHORIZE_STAR_BEAST_RENDERER_IMPLEMENTATION";
    readinessReference: StarBeastRendererImplementationAuthorizationReadinessReady;
    bindingReference: StarBeastRendererImplementationAuthorizationReadinessReady["bindingReference"];
    authorityConfirmed: true;
    explicit: true;
    commandOnly: true;
    notAuthorization: true;
    noAutomaticImplementation: true;
    noBackendSelection: true;
    noRendererCreation: true;
    noRenderExecution: true;
    noUIIntegration: true;
    noRuntimeIntegration: true;
    noStorageWrite: true;
  }>;

export type StarBeastRendererExplicitImplementationAuthorizationCommandAvailable =
  Readonly<{
    status: "AVAILABLE";
    source: "star_beast_renderer_explicit_implementation_authorization_command";
    input: StarBeastRendererExplicitImplementationAuthorizationCommandInput;
    readiness: StarBeastRendererImplementationAuthorizationReadinessReady;
    command: StarBeastRendererExplicitImplementationAuthorizationCommand;
  }>;

export type StarBeastRendererExplicitImplementationAuthorizationCommandNotReadyReason =
  | "AUTHORIZATION_READINESS_NOT_READY"
  | "IMPLEMENTATION_AUTHORITY_REFERENCE_REQUIRED"
  | "EXPLICIT_AUTHORIZE_DECISION_REQUIRED";

export type StarBeastRendererExplicitImplementationAuthorizationCommandNotReady =
  Readonly<{
    status: "NOT_READY";
    source: "star_beast_renderer_explicit_implementation_authorization_command";
    reason: StarBeastRendererExplicitImplementationAuthorizationCommandNotReadyReason;
    input: StarBeastRendererExplicitImplementationAuthorizationCommandInput;
    readiness:
      | StarBeastRendererImplementationAuthorizationReadinessReady
      | StarBeastRendererImplementationAuthorizationReadinessNotReady;
    sourceReadinessReason: StarBeastRendererImplementationAuthorizationReadinessNotReady["reason"] | null;
    noCommand: true;
    notAuthorization: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererExplicitImplementationAuthorizationCommandUnavailableReason =
  | "AUTHORIZATION_READINESS_RESULT_REQUIRED"
  | "AUTHORIZATION_READINESS_UNAVAILABLE";

export type StarBeastRendererExplicitImplementationAuthorizationCommandUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    source: "star_beast_renderer_explicit_implementation_authorization_command";
    reason: StarBeastRendererExplicitImplementationAuthorizationCommandUnavailableReason;
    input: StarBeastRendererExplicitImplementationAuthorizationCommandInput;
    readiness: StarBeastRendererImplementationAuthorizationReadinessUnavailable | null;
    sourceReadinessReason: StarBeastRendererImplementationAuthorizationReadinessUnavailable["reason"] | null;
    noCommand: true;
    notAuthorization: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererExplicitImplementationAuthorizationCommandResult =
  | StarBeastRendererExplicitImplementationAuthorizationCommandAvailable
  | StarBeastRendererExplicitImplementationAuthorizationCommandNotReady
  | StarBeastRendererExplicitImplementationAuthorizationCommandUnavailable;
