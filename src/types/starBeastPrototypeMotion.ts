import type { StarBeastPrototypeRenderProjection } from "./starBeastRendererPrototypeAdapter";

export type StarBeastPrototypeMotionProfile = Readonly<{
  semanticRole: "STAR_BEAST_PROTOTYPE_MOTION_PROFILE";
  sourceProjectionReference: StarBeastPrototypeRenderProjection;
  breathing: Readonly<{
    amplitude: number;
    frequencyHz: number;
  }>;
  tail: Readonly<{
    amplitude: number;
    frequencyHz: number;
    phaseOffset: number;
  }>;
  stardust: Readonly<{
    driftRate: number;
    orbitAmplitude: number;
  }>;
  crystalPulse: Readonly<{
    enabled: boolean;
    amplitude: number;
    frequencyHz: number;
  }>;
  boundaryShimmer: Readonly<{
    amplitude: number;
    frequencyHz: number;
  }>;
  normalizedMotion: true;
  prototypeOnly: true;
  noLifeStateMutation: true;
  noBusinessInference: true;
  noStorageWrite: true;
}>;
