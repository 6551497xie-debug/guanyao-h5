import type {
  StarBeastRendererExplicitImplementationAuthorizationCommand,
  StarBeastRendererExplicitImplementationAuthorizationCommandAvailable,
  StarBeastRendererExplicitImplementationAuthorizationCommandNotReady,
  StarBeastRendererExplicitImplementationAuthorizationCommandResult,
  StarBeastRendererExplicitImplementationAuthorizationCommandUnavailable,
} from "./starBeastRendererExplicitImplementationAuthorizationCommand";

export type StarBeastRendererImplementationAuthorizationInput = Readonly<{
  commandResult: StarBeastRendererExplicitImplementationAuthorizationCommandResult | null;
}>;

export type StarBeastRendererImplementationAuthorization = Readonly<{
  source: "explicit_renderer_implementation_authorization_command";
  semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION";
  authorizationStatus: "AUTHORIZED_FOR_IMPLEMENTATION_PROTOCOL";
  authorizationScope: "STAR_BEAST_RENDERER_IMPLEMENTATION_PROTOCOL";
  sourceCommandReference: StarBeastRendererExplicitImplementationAuthorizationCommand;
  authorityReference: StarBeastRendererExplicitImplementationAuthorizationCommand["authorityReference"];
  readinessReference: StarBeastRendererExplicitImplementationAuthorizationCommand["readinessReference"];
  bindingReference: StarBeastRendererExplicitImplementationAuthorizationCommand["bindingReference"];
  authorizationDecision: "AUTHORIZE";
  explicitAuthorityConfirmed: true;
  authorizationOnly: true;
  noAutomaticImplementation: true;
  noBackendSelection: true;
  noRendererCreation: true;
  noRenderExecution: true;
  noUIIntegration: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
}>;

export type StarBeastRendererImplementationAuthorizationAuthorized = Readonly<{
  status: "AUTHORIZED";
  source: "star_beast_renderer_implementation_authorization_resolver";
  input: StarBeastRendererImplementationAuthorizationInput;
  commandResult: StarBeastRendererExplicitImplementationAuthorizationCommandAvailable;
  authorization: StarBeastRendererImplementationAuthorization;
}>;

export type StarBeastRendererImplementationAuthorizationNotReadyReason =
  | "EXPLICIT_AUTHORIZATION_COMMAND_NOT_READY"
  | "EXPLICIT_AUTHORIZATION_COMMAND_INVALID";

export type StarBeastRendererImplementationAuthorizationNotReady = Readonly<{
  status: "NOT_READY";
  source: "star_beast_renderer_implementation_authorization_resolver";
  reason: StarBeastRendererImplementationAuthorizationNotReadyReason;
  input: StarBeastRendererImplementationAuthorizationInput;
  commandResult:
    | StarBeastRendererExplicitImplementationAuthorizationCommandAvailable
    | StarBeastRendererExplicitImplementationAuthorizationCommandNotReady;
  sourceCommandReason: StarBeastRendererExplicitImplementationAuthorizationCommandNotReady["reason"] | null;
  noAuthorization: true;
  noRenderExecution: true;
}>;

export type StarBeastRendererImplementationAuthorizationUnavailableReason =
  | "EXPLICIT_AUTHORIZATION_COMMAND_RESULT_REQUIRED"
  | "EXPLICIT_AUTHORIZATION_COMMAND_UNAVAILABLE";

export type StarBeastRendererImplementationAuthorizationUnavailable = Readonly<{
  status: "UNAVAILABLE";
  source: "star_beast_renderer_implementation_authorization_resolver";
  reason: StarBeastRendererImplementationAuthorizationUnavailableReason;
  input: StarBeastRendererImplementationAuthorizationInput;
  commandResult: StarBeastRendererExplicitImplementationAuthorizationCommandUnavailable | null;
  sourceCommandReason: StarBeastRendererExplicitImplementationAuthorizationCommandUnavailable["reason"] | null;
  noAuthorization: true;
  noRenderExecution: true;
}>;

export type StarBeastRendererImplementationAuthorizationResult =
  | StarBeastRendererImplementationAuthorizationAuthorized
  | StarBeastRendererImplementationAuthorizationNotReady
  | StarBeastRendererImplementationAuthorizationUnavailable;
