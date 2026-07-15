import type {
  StarBeastRendererImplementationAuthorizationConsumption,
  StarBeastRendererImplementationAuthorizationConsumptionAvailable,
  StarBeastRendererImplementationAuthorizationConsumptionNotReady,
  StarBeastRendererImplementationAuthorizationConsumptionResult,
  StarBeastRendererImplementationAuthorizationConsumptionUnavailable,
} from "./starBeastRendererImplementationAuthorizationConsumption";

export type StarBeastRendererImplementationAuthorizationEndpointInput =
  Readonly<{
    consumptionResult: StarBeastRendererImplementationAuthorizationConsumptionResult | null;
  }>;

export type StarBeastRendererImplementationAuthorizationEndpoint = Readonly<{
  semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION_ENDPOINT";
  sourceConsumptionResult: StarBeastRendererImplementationAuthorizationConsumptionAvailable;
  authorizationConsumptionReference: StarBeastRendererImplementationAuthorizationConsumption;
  authorizationReference: StarBeastRendererImplementationAuthorizationConsumption["authorizationReference"];
  sourceCommandReference: StarBeastRendererImplementationAuthorizationConsumption["sourceCommandReference"];
  authorityReference: StarBeastRendererImplementationAuthorizationConsumption["authorityReference"];
  bindingReference: StarBeastRendererImplementationAuthorizationConsumption["bindingReference"];
  endpointStatus: "AVAILABLE_FOR_IMPLEMENTATION_PROTOCOL_HANDOFF";
  authorizationHandoffOnly: true;
  implementationDeferred: true;
  noBackendSelection: true;
  noRendererCreation: true;
  noRenderExecution: true;
  noUIIntegration: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
}>;

export type StarBeastRendererImplementationAuthorizationEndpointAvailable =
  Readonly<{
    status: "AVAILABLE";
    source: "star_beast_renderer_implementation_authorization_endpoint";
    input: StarBeastRendererImplementationAuthorizationEndpointInput;
    endpoint: StarBeastRendererImplementationAuthorizationEndpoint;
  }>;

export type StarBeastRendererImplementationAuthorizationEndpointNotReady =
  Readonly<{
    status: "NOT_READY";
    source: "star_beast_renderer_implementation_authorization_endpoint";
    reason: "AUTHORIZATION_CONSUMPTION_NOT_READY";
    input: StarBeastRendererImplementationAuthorizationEndpointInput;
    sourceConsumptionResult: StarBeastRendererImplementationAuthorizationConsumptionNotReady;
    sourceConsumptionReason: StarBeastRendererImplementationAuthorizationConsumptionNotReady["reason"];
    noEndpoint: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererImplementationAuthorizationEndpointUnavailableReason =
  | "AUTHORIZATION_CONSUMPTION_RESULT_REQUIRED"
  | "AUTHORIZATION_CONSUMPTION_UNAVAILABLE";

export type StarBeastRendererImplementationAuthorizationEndpointUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    source: "star_beast_renderer_implementation_authorization_endpoint";
    reason: StarBeastRendererImplementationAuthorizationEndpointUnavailableReason;
    input: StarBeastRendererImplementationAuthorizationEndpointInput;
    sourceConsumptionResult: StarBeastRendererImplementationAuthorizationConsumptionUnavailable | null;
    sourceConsumptionReason: StarBeastRendererImplementationAuthorizationConsumptionUnavailable["reason"] | null;
    noEndpoint: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererImplementationAuthorizationEndpointResult =
  | StarBeastRendererImplementationAuthorizationEndpointAvailable
  | StarBeastRendererImplementationAuthorizationEndpointNotReady
  | StarBeastRendererImplementationAuthorizationEndpointUnavailable;
