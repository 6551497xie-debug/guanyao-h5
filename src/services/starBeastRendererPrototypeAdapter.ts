import type { StarBeastRenderPlan } from "../types/starBeastRendererContract";
import type { StarBeastPrototypeRenderProjection } from "../types/starBeastRendererPrototypeAdapter";

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

const BREATHING_RATE: Readonly<
  Record<StarBeastRenderPlan["channels"]["energy"]["breathingRhythm"], number>
> = Object.freeze({
  SLOW: 0.55,
  HELD: 0.28,
  RECOVERING: 0.8,
  RESONANT: 1,
});

const ENERGY_DRIFT: Readonly<
  Record<StarBeastRenderPlan["channels"]["energy"]["flow"], number>
> = Object.freeze({
  RESTING: 0.25,
  RESTRICTED: 0.12,
  RECOVERING: 0.62,
  INTEGRATED: 0.88,
});

export function adaptStarBeastRenderPlanToPrototype(
  renderPlan: StarBeastRenderPlan,
): StarBeastPrototypeRenderProjection {
  const intensity = clamp01(renderPlan.channels.light.intensity);
  const particleDensity = clamp01(
    renderPlan.channels.starField.particleDensity,
  );
  const complexity = clamp01(
    renderPlan.channels.starField.constellationComplexity,
  );
  const crystalVisible =
    renderPlan.channels.crystal.presence === "PRESENT";

  return Object.freeze({
    semanticRole: "STAR_BEAST_PROTOTYPE_RENDER_PROJECTION",
    sourceRenderPlanReference: renderPlan,
    layers: Object.freeze({
      starCore: Object.freeze({
        intensity,
        radiusScale: 0.8 + intensity * 0.55,
        pulseRate:
          BREATHING_RATE[renderPlan.channels.energy.breathingRhythm],
      }),
      starPattern: Object.freeze({
        opacity: 0.22 + intensity * 0.58,
        lineWeight: 1 + complexity * 1.15,
        complexity,
      }),
      boundaryLight: Object.freeze({
        opacity: 0.18 + intensity * 0.56,
        blurRadius: 5 + intensity * 12,
        flowDirection: renderPlan.channels.light.direction,
      }),
      internalStardust: Object.freeze({
        density: particleDensity,
        driftRate: ENERGY_DRIFT[renderPlan.channels.energy.flow],
      }),
      crystalNodes: Object.freeze({
        visible: crystalVisible,
        count: crystalVisible ? Math.max(1, Math.round(2 + complexity * 4)) : 0,
        intensity: crystalVisible ? intensity : 0,
      }),
    }),
    canvas2dPrototypeCompatible: true,
    prototypeOnly: true,
    noLifeStateMutation: true,
    noBusinessInference: true,
    noStorageWrite: true,
  });
}
