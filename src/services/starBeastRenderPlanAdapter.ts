import type {
  StarBeastRenderPlan,
  StarBeastRendererCapability,
  StarBeastRendererInput,
  StarBeastRendererOutput,
} from "../types/starBeastRendererContract";

export const STAR_BEAST_REQUIRED_RENDERER_CAPABILITIES: readonly StarBeastRendererCapability[] =
  Object.freeze([
    "MANIFESTATION_LAYER",
    "ENERGY_FLOW_CHANNEL",
    "LIGHT_FLOW_CHANNEL",
    "BREATHING_CHANNEL",
    "STAR_FIELD_CHANNEL",
    "CRYSTAL_PRESENCE_CHANNEL",
  ]);

export function adaptStarBeastRendererInputToRenderPlan(
  input: StarBeastRendererInput,
): StarBeastRendererOutput {
  const hasRequiredCapabilities =
    STAR_BEAST_REQUIRED_RENDERER_CAPABILITIES.every((capability) =>
      input.capabilityDeclaration.capabilities.includes(capability),
    );

  if (!hasRequiredCapabilities) {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_renderer_contract",
      reason: "RENDERER_CAPABILITY_UNAVAILABLE",
      input,
      noRenderPlan: true,
    });
  }

  const visualState = input.visualStateReference;
  const plan: StarBeastRenderPlan = Object.freeze({
    semanticRole: "STAR_BEAST_RENDER_PLAN",
    sourceVisualStateReference: visualState,
    channels: Object.freeze({
      manifestation: Object.freeze({
        depth: visualState.manifestationDepth,
        presence: visualState.presenceState,
      }),
      energy: Object.freeze({
        flow: visualState.energyFlowState,
        breathingRhythm: visualState.expression.breathingRhythm,
      }),
      light: Object.freeze({
        state: visualState.lightState,
        direction: visualState.expression.lightFlowDirection,
        intensity: visualState.expression.intensity,
      }),
      starField: Object.freeze({
        pattern: visualState.starPatternState,
        particleDensity: visualState.expression.particleDensity,
        constellationComplexity:
          visualState.expression.constellationComplexity,
      }),
      crystal: Object.freeze({
        presence: visualState.crystalPresenceState,
      }),
    }),
    rendererNeutral: true,
    semanticChannelsOnly: true,
    noPixelOutput: true,
    noDrawCommands: true,
    noAssetGeneration: true,
  });

  return Object.freeze({
    status: "PLANNED",
    source: "star_beast_renderer_contract",
    input,
    plan,
  });
}
