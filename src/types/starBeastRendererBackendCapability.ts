export type StarBeastRendererBackendCapabilityReference = Readonly<{
  referenceType: "STAR_BEAST_RENDERER_BACKEND_CAPABILITY_DECLARATION";
  referenceId: string;
}>;

export type StarBeastRendererBackendCapability =
  | "SEMANTIC_RENDER_PLAN_INPUT"
  | "MANIFESTATION_CHANNEL_PROJECTION"
  | "ENERGY_CHANNEL_PROJECTION"
  | "LIGHT_CHANNEL_PROJECTION"
  | "STAR_FIELD_CHANNEL_PROJECTION"
  | "CRYSTAL_CHANNEL_PROJECTION"
  | "REDUCED_MOTION_FALLBACK"
  | "STATIC_FRAME_FALLBACK";

export type StarBeastRendererBackendCapabilityDeclarationInput = Readonly<{
  declarationReference: StarBeastRendererBackendCapabilityReference | null;
  capabilities: readonly StarBeastRendererBackendCapability[];
}>;

export type StarBeastRendererBackendCapabilityDeclaration = Readonly<{
  semanticRole: "STAR_BEAST_RENDERER_BACKEND_CAPABILITY_DECLARATION";
  declarationReference: StarBeastRendererBackendCapabilityReference;
  capabilities: readonly StarBeastRendererBackendCapability[];
  consumesSemanticRenderPlanOnly: true;
  rendererNeutral: true;
  backendUnspecified: true;
  noBackendSelection: true;
  noDeviceDetection: true;
  noRuntimeProbe: true;
  noRenderExecution: true;
  noUIIntegration: true;
  noStorageWrite: true;
}>;

export type StarBeastRendererBackendCapabilityAvailable = Readonly<{
  status: "AVAILABLE";
  source: "star_beast_renderer_backend_capability_schema";
  input: StarBeastRendererBackendCapabilityDeclarationInput;
  declaration: StarBeastRendererBackendCapabilityDeclaration;
}>;

export type StarBeastRendererBackendCapabilityUnavailableReason =
  | "BACKEND_CAPABILITY_DECLARATION_REFERENCE_REQUIRED"
  | "BACKEND_CAPABILITY_SET_INCOMPLETE";

export type StarBeastRendererBackendCapabilityUnavailable = Readonly<{
  status: "UNAVAILABLE";
  source: "star_beast_renderer_backend_capability_schema";
  reason: StarBeastRendererBackendCapabilityUnavailableReason;
  input: StarBeastRendererBackendCapabilityDeclarationInput;
  noDeclaration: true;
  noBackendSelection: true;
  noRenderExecution: true;
}>;

export type StarBeastRendererBackendCapabilityResult =
  | StarBeastRendererBackendCapabilityAvailable
  | StarBeastRendererBackendCapabilityUnavailable;
