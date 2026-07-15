import type {
  StarBeastRendererImplementationAuthorization,
  StarBeastRendererImplementationAuthorizationAuthorized,
  StarBeastRendererImplementationAuthorizationNotReady,
  StarBeastRendererImplementationAuthorizationResult,
  StarBeastRendererImplementationAuthorizationUnavailable,
} from "./starBeastRendererImplementationAuthorization";

export type StarBeastRendererImplementationAuthorizationConsumptionInput =
  Readonly<{
    authorizationResult: StarBeastRendererImplementationAuthorizationResult | null;
  }>;

export type StarBeastRendererImplementationAuthorizationConsumption = Readonly<{
  semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION_CONSUMPTION";
  authorizationReference: StarBeastRendererImplementationAuthorization;
  sourceAuthorizationResult: StarBeastRendererImplementationAuthorizationAuthorized;
  sourceCommandReference: StarBeastRendererImplementationAuthorization["sourceCommandReference"];
  authorityReference: StarBeastRendererImplementationAuthorization["authorityReference"];
  bindingReference: StarBeastRendererImplementationAuthorization["bindingReference"];
  consumptionStatus: "AVAILABLE_FOR_FUTURE_IMPLEMENTATION_ENDPOINT";
  authorizationConsumedOnly: true;
  implementationDeferred: true;
  noBackendSelection: true;
  noRendererCreation: true;
  noRenderExecution: true;
  noUIIntegration: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
}>;

export type StarBeastRendererImplementationAuthorizationConsumptionAvailable =
  Readonly<{
    status: "AVAILABLE";
    source: "star_beast_renderer_implementation_authorization_consumption";
    input: StarBeastRendererImplementationAuthorizationConsumptionInput;
    consumption: StarBeastRendererImplementationAuthorizationConsumption;
  }>;

export type StarBeastRendererImplementationAuthorizationConsumptionNotReady =
  Readonly<{
    status: "NOT_READY";
    source: "star_beast_renderer_implementation_authorization_consumption";
    reason: "IMPLEMENTATION_AUTHORIZATION_NOT_READY";
    input: StarBeastRendererImplementationAuthorizationConsumptionInput;
    sourceAuthorizationResult: StarBeastRendererImplementationAuthorizationNotReady;
    sourceAuthorizationReason: StarBeastRendererImplementationAuthorizationNotReady["reason"];
    noAuthorizationConsumption: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererImplementationAuthorizationConsumptionUnavailableReason =
  | "IMPLEMENTATION_AUTHORIZATION_RESULT_REQUIRED"
  | "IMPLEMENTATION_AUTHORIZATION_UNAVAILABLE";

export type StarBeastRendererImplementationAuthorizationConsumptionUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    source: "star_beast_renderer_implementation_authorization_consumption";
    reason: StarBeastRendererImplementationAuthorizationConsumptionUnavailableReason;
    input: StarBeastRendererImplementationAuthorizationConsumptionInput;
    sourceAuthorizationResult: StarBeastRendererImplementationAuthorizationUnavailable | null;
    sourceAuthorizationReason: StarBeastRendererImplementationAuthorizationUnavailable["reason"] | null;
    noAuthorizationConsumption: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererImplementationAuthorizationConsumptionResult =
  | StarBeastRendererImplementationAuthorizationConsumptionAvailable
  | StarBeastRendererImplementationAuthorizationConsumptionNotReady
  | StarBeastRendererImplementationAuthorizationConsumptionUnavailable;
