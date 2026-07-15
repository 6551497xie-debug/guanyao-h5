import type { StarBeastPrototypeGeometryProfile } from "./starBeastPrototypeGeometry";
import type { StarBeastPrototypeMotionProfile } from "./starBeastPrototypeMotion";

export type StarBeastPrototypeFrameInput = Readonly<{
  geometryProfile: StarBeastPrototypeGeometryProfile;
  motionProfile: StarBeastPrototypeMotionProfile;
  timeSeconds: number;
}>;

export type StarBeastPrototypeFrameState = Readonly<{
  semanticRole: "STAR_BEAST_PROTOTYPE_FRAME_STATE";
  sourceGeometryReference: StarBeastPrototypeGeometryProfile;
  sourceMotionReference: StarBeastPrototypeMotionProfile;
  sampleTimeSeconds: number;
  breathingOffset: number;
  starCorePulse: number;
  tail: Readonly<{
    pathId: "tail-spiral";
    phase: number;
    amplitude: number;
  }>;
  stardust: Readonly<{
    flowPhase: number;
    orbitAmplitude: number;
  }>;
  crystal: Readonly<{
    enabled: boolean;
    pulseScale: number;
  }>;
  boundaryShimmerScale: number;
  normalizedFrame: true;
  deterministicSample: true;
  projectionAligned: true;
  prototypeOnly: true;
  noLifeStateMutation: true;
  noBusinessInference: true;
  noStorageWrite: true;
}>;
