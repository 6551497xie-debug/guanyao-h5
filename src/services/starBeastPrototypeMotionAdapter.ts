import type { StarBeastPrototypeMotionProfile } from "../types/starBeastPrototypeMotion";
import type { StarBeastPrototypeRenderProjection } from "../types/starBeastRendererPrototypeAdapter";

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

export function adaptStarBeastPrototypeProjectionToMotion(
  projection: StarBeastPrototypeRenderProjection,
): StarBeastPrototypeMotionProfile {
  const coreIntensity = clamp01(projection.layers.starCore.intensity);
  const pulseRate = clamp01(projection.layers.starCore.pulseRate);
  const complexity = clamp01(projection.layers.starPattern.complexity);
  const boundaryOpacity = clamp01(projection.layers.boundaryLight.opacity);
  const stardustDensity = clamp01(
    projection.layers.internalStardust.density,
  );
  const stardustDrift = clamp01(
    projection.layers.internalStardust.driftRate,
  );
  const crystalIntensity = clamp01(
    projection.layers.crystalNodes.intensity,
  );

  return Object.freeze({
    semanticRole: "STAR_BEAST_PROTOTYPE_MOTION_PROFILE",
    sourceProjectionReference: projection,
    breathing: Object.freeze({
      amplitude: 0.003 + coreIntensity * 0.005,
      frequencyHz: 0.16 + pulseRate * 0.14,
    }),
    tail: Object.freeze({
      amplitude: 0.006 + stardustDrift * 0.012,
      frequencyHz: 0.11 + complexity * 0.09,
      phaseOffset: 0.9,
    }),
    stardust: Object.freeze({
      driftRate: 0.45 + stardustDrift * 1.1,
      orbitAmplitude: 2 + stardustDensity * 7,
    }),
    crystalPulse: Object.freeze({
      enabled:
        projection.layers.crystalNodes.visible &&
        projection.layers.crystalNodes.count > 0,
      amplitude: crystalIntensity * 0.65,
      frequencyHz: 0.25 + pulseRate * 0.35,
    }),
    boundaryShimmer: Object.freeze({
      amplitude: 0.04 + boundaryOpacity * 0.12,
      frequencyHz: 0.15 + stardustDrift * 0.25,
    }),
    normalizedMotion: true,
    prototypeOnly: true,
    noLifeStateMutation: true,
    noBusinessInference: true,
    noStorageWrite: true,
  });
}
