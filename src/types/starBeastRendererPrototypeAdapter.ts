import type { StarBeastRenderPlan } from "./starBeastRendererContract";

export type StarBeastPrototypeRenderProjection = Readonly<{
  semanticRole: "STAR_BEAST_PROTOTYPE_RENDER_PROJECTION";
  sourceRenderPlanReference: StarBeastRenderPlan;
  layers: Readonly<{
    starCore: Readonly<{
      intensity: number;
      radiusScale: number;
      pulseRate: number;
    }>;
    starPattern: Readonly<{
      opacity: number;
      lineWeight: number;
      complexity: number;
    }>;
    boundaryLight: Readonly<{
      opacity: number;
      blurRadius: number;
      flowDirection: StarBeastRenderPlan["channels"]["light"]["direction"];
    }>;
    internalStardust: Readonly<{
      density: number;
      driftRate: number;
    }>;
    crystalNodes: Readonly<{
      visible: boolean;
      count: number;
      intensity: number;
    }>;
  }>;
  canvas2dPrototypeCompatible: true;
  prototypeOnly: true;
  noLifeStateMutation: true;
  noBusinessInference: true;
  noStorageWrite: true;
}>;
