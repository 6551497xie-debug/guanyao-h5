import type {
  StarBeastRendererImplementationCapabilityBindingAvailable,
  StarBeastRendererImplementationCapabilityBindingNotReady,
  StarBeastRendererImplementationCapabilityBindingResult,
  StarBeastRendererImplementationCapabilityBindingUnavailable,
  StarBeastRendererImplementationCapabilityBindingUnavailableReason,
} from "./starBeastRendererImplementationCapabilityBinding";

export type StarBeastRendererImplementationAuthorizationReadinessInput =
  Readonly<{
    bindingResult: StarBeastRendererImplementationCapabilityBindingResult | null;
  }>;

export type StarBeastRendererImplementationAuthorizationReadinessReady =
  Readonly<{
    status: "READY";
    readiness: "READY_FOR_EXPLICIT_RENDERER_IMPLEMENTATION_AUTHORIZATION";
    source: "star_beast_renderer_implementation_authorization_readiness";
    input: StarBeastRendererImplementationAuthorizationReadinessInput;
    sourceBindingResult: StarBeastRendererImplementationCapabilityBindingAvailable;
    bindingReference: StarBeastRendererImplementationCapabilityBindingAvailable["binding"];
    explicitAuthorizationRequired: true;
    authorizationDeferred: true;
    noAuthorizationIssued: true;
    noBackendSelection: true;
    noRenderExecution: true;
    noUIIntegration: true;
    noRuntimeIntegration: true;
    noStorageWrite: true;
  }>;

export type StarBeastRendererImplementationAuthorizationReadinessNotReady =
  Readonly<{
    status: "NOT_READY";
    readiness: "NOT_READY";
    source: "star_beast_renderer_implementation_authorization_readiness";
    reason: "CAPABILITY_BINDING_NOT_READY";
    input: StarBeastRendererImplementationAuthorizationReadinessInput;
    sourceBindingResult: StarBeastRendererImplementationCapabilityBindingNotReady;
    sourceBindingReason: StarBeastRendererImplementationCapabilityBindingNotReady["reason"];
    explicitAuthorizationRequired: true;
    authorizationDeferred: true;
    noAuthorizationIssued: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererImplementationAuthorizationReadinessUnavailableReason =
  | "CAPABILITY_BINDING_RESULT_REQUIRED"
  | "CAPABILITY_BINDING_UNAVAILABLE";

export type StarBeastRendererImplementationAuthorizationReadinessUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    readiness: "UNAVAILABLE";
    source: "star_beast_renderer_implementation_authorization_readiness";
    reason: StarBeastRendererImplementationAuthorizationReadinessUnavailableReason;
    input: StarBeastRendererImplementationAuthorizationReadinessInput;
    sourceBindingResult: StarBeastRendererImplementationCapabilityBindingUnavailable | null;
    sourceBindingReason: StarBeastRendererImplementationCapabilityBindingUnavailableReason | null;
    explicitAuthorizationRequired: true;
    authorizationDeferred: true;
    noAuthorizationIssued: true;
    noBackendSelection: true;
    noRenderExecution: true;
  }>;

export type StarBeastRendererImplementationAuthorizationReadinessResult =
  | StarBeastRendererImplementationAuthorizationReadinessReady
  | StarBeastRendererImplementationAuthorizationReadinessNotReady
  | StarBeastRendererImplementationAuthorizationReadinessUnavailable;
