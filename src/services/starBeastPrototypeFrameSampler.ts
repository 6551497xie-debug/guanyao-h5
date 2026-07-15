import type {
  StarBeastPrototypeFrameInput,
  StarBeastPrototypeFrameState,
} from "../types/starBeastPrototypeFrame";

const TAU = Math.PI * 2;

export function sampleStarBeastPrototypeFrame(
  input: StarBeastPrototypeFrameInput,
): StarBeastPrototypeFrameState {
  if (!Number.isFinite(input.timeSeconds) || input.timeSeconds < 0) {
    throw new RangeError("Prototype frame time must be finite and non-negative");
  }
  if (
    input.geometryProfile.sourceProjectionReference !==
    input.motionProfile.sourceProjectionReference
  ) {
    throw new Error("Prototype geometry and motion must share one projection");
  }

  const { motionProfile, timeSeconds } = input;
  const breathingWave = Math.sin(
    timeSeconds * TAU * motionProfile.breathing.frequencyHz,
  );
  const crystalWave = Math.sin(
    timeSeconds * TAU * motionProfile.crystalPulse.frequencyHz,
  );
  const boundaryWave = Math.sin(
    timeSeconds * TAU * motionProfile.boundaryShimmer.frequencyHz,
  );

  return Object.freeze({
    semanticRole: "STAR_BEAST_PROTOTYPE_FRAME_STATE",
    sourceGeometryReference: input.geometryProfile,
    sourceMotionReference: motionProfile,
    sampleTimeSeconds: timeSeconds,
    breathingOffset:
      breathingWave * motionProfile.breathing.amplitude,
    starCorePulse: 0.5 + breathingWave * 0.5,
    tail: Object.freeze({
      pathId: "tail-spiral",
      phase:
        timeSeconds * TAU * motionProfile.tail.frequencyHz +
        motionProfile.tail.phaseOffset,
      amplitude: motionProfile.tail.amplitude,
    }),
    stardust: Object.freeze({
      flowPhase: timeSeconds * motionProfile.stardust.driftRate,
      orbitAmplitude: motionProfile.stardust.orbitAmplitude,
    }),
    crystal: Object.freeze({
      enabled: motionProfile.crystalPulse.enabled,
      pulseScale: motionProfile.crystalPulse.enabled
        ? 1 + crystalWave * motionProfile.crystalPulse.amplitude
        : 1,
    }),
    boundaryShimmerScale:
      1 + boundaryWave * motionProfile.boundaryShimmer.amplitude,
    normalizedFrame: true,
    deterministicSample: true,
    projectionAligned: true,
    prototypeOnly: true,
    noLifeStateMutation: true,
    noBusinessInference: true,
    noStorageWrite: true,
  });
}
