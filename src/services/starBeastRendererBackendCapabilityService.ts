import type {
  StarBeastRendererBackendCapability,
  StarBeastRendererBackendCapabilityDeclaration,
  StarBeastRendererBackendCapabilityDeclarationInput,
  StarBeastRendererBackendCapabilityResult,
  StarBeastRendererBackendCapabilityUnavailableReason,
} from "../types/starBeastRendererBackendCapability";

export const STAR_BEAST_REQUIRED_BACKEND_CAPABILITIES: readonly StarBeastRendererBackendCapability[] =
  Object.freeze([
    "SEMANTIC_RENDER_PLAN_INPUT",
    "MANIFESTATION_CHANNEL_PROJECTION",
    "ENERGY_CHANNEL_PROJECTION",
    "LIGHT_CHANNEL_PROJECTION",
    "STAR_FIELD_CHANNEL_PROJECTION",
    "CRYSTAL_CHANNEL_PROJECTION",
    "REDUCED_MOTION_FALLBACK",
    "STATIC_FRAME_FALLBACK",
  ]);

const unavailable = (
  input: StarBeastRendererBackendCapabilityDeclarationInput,
  reason: StarBeastRendererBackendCapabilityUnavailableReason,
): StarBeastRendererBackendCapabilityResult =>
  Object.freeze({
    status: "UNAVAILABLE",
    source: "star_beast_renderer_backend_capability_schema",
    reason,
    input,
    noDeclaration: true,
    noBackendSelection: true,
    noRenderExecution: true,
  });

export function resolveStarBeastRendererBackendCapabilityDeclaration(
  input: StarBeastRendererBackendCapabilityDeclarationInput,
): StarBeastRendererBackendCapabilityResult {
  if (input.declarationReference === null) {
    return unavailable(
      input,
      "BACKEND_CAPABILITY_DECLARATION_REFERENCE_REQUIRED",
    );
  }

  const hasRequiredCapabilities =
    STAR_BEAST_REQUIRED_BACKEND_CAPABILITIES.every((capability) =>
      input.capabilities.includes(capability),
    );

  if (!hasRequiredCapabilities) {
    return unavailable(input, "BACKEND_CAPABILITY_SET_INCOMPLETE");
  }

  const declaration: StarBeastRendererBackendCapabilityDeclaration =
    Object.freeze({
      semanticRole: "STAR_BEAST_RENDERER_BACKEND_CAPABILITY_DECLARATION",
      declarationReference: input.declarationReference,
      capabilities: Object.freeze([...input.capabilities]),
      consumesSemanticRenderPlanOnly: true,
      rendererNeutral: true,
      backendUnspecified: true,
      noBackendSelection: true,
      noDeviceDetection: true,
      noRuntimeProbe: true,
      noRenderExecution: true,
      noUIIntegration: true,
      noStorageWrite: true,
    });

  return Object.freeze({
    status: "AVAILABLE",
    source: "star_beast_renderer_backend_capability_schema",
    input,
    declaration,
  });
}
