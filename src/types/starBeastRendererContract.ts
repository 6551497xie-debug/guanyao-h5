import type { StarBeastVisualState } from "./starBeastVisualState";

export type StarBeastRenderRequestReference = Readonly<{
  referenceType: "STAR_BEAST_RENDER_REQUEST";
  referenceId: string;
}>;

export type StarBeastRendererCapability =
  | "MANIFESTATION_LAYER"
  | "ENERGY_FLOW_CHANNEL"
  | "LIGHT_FLOW_CHANNEL"
  | "BREATHING_CHANNEL"
  | "STAR_FIELD_CHANNEL"
  | "CRYSTAL_PRESENCE_CHANNEL";

export type StarBeastRendererCapabilityDeclaration = Readonly<{
  capabilities: readonly StarBeastRendererCapability[];
  consumesVisualStateOnly: true;
  producesRenderPlanOnly: true;
  noLifeStateInference: true;
  noLifeStateMutation: true;
  noMemoryInference: true;
  noGrowthInference: true;
}>;

export type StarBeastRendererInput = Readonly<{
  requestReference: StarBeastRenderRequestReference;
  visualStateReference: StarBeastVisualState;
  capabilityDeclaration: StarBeastRendererCapabilityDeclaration;
}>;

export type StarBeastRenderPlan = Readonly<{
  semanticRole: "STAR_BEAST_RENDER_PLAN";
  sourceVisualStateReference: StarBeastVisualState;
  channels: Readonly<{
    manifestation: Readonly<{
      depth: StarBeastVisualState["manifestationDepth"];
      presence: StarBeastVisualState["presenceState"];
    }>;
    energy: Readonly<{
      flow: StarBeastVisualState["energyFlowState"];
      breathingRhythm: StarBeastVisualState["expression"]["breathingRhythm"];
    }>;
    light: Readonly<{
      state: StarBeastVisualState["lightState"];
      direction: StarBeastVisualState["expression"]["lightFlowDirection"];
      intensity: StarBeastVisualState["expression"]["intensity"];
    }>;
    starField: Readonly<{
      pattern: StarBeastVisualState["starPatternState"];
      particleDensity: StarBeastVisualState["expression"]["particleDensity"];
      constellationComplexity: StarBeastVisualState["expression"]["constellationComplexity"];
    }>;
    crystal: Readonly<{
      presence: StarBeastVisualState["crystalPresenceState"];
    }>;
  }>;
  rendererNeutral: true;
  semanticChannelsOnly: true;
  noPixelOutput: true;
  noDrawCommands: true;
  noAssetGeneration: true;
}>;

export type StarBeastRendererPlanned = Readonly<{
  status: "PLANNED";
  source: "star_beast_renderer_contract";
  input: StarBeastRendererInput;
  plan: StarBeastRenderPlan;
}>;

export type StarBeastRendererUnavailableReason =
  | "VISUAL_STATE_REQUIRED"
  | "CAPABILITY_DECLARATION_REQUIRED"
  | "RENDERER_CAPABILITY_UNAVAILABLE";

export type StarBeastRendererUnavailable = Readonly<{
  status: "UNAVAILABLE";
  source: "star_beast_renderer_contract";
  reason: StarBeastRendererUnavailableReason;
  input: StarBeastRendererInput | null;
  noRenderPlan: true;
}>;

export type StarBeastRendererOutput =
  | StarBeastRendererPlanned
  | StarBeastRendererUnavailable;

export type StarBeastRendererBoundary = Readonly<{
  inputVisualStateOnly: true;
  outputRenderPlanOnly: true;
  rendererImplementationDeferred: true;
  noCanvasImplementation: true;
  noWebGLImplementation: true;
  noThreeJsImplementation: true;
  noAnimationTimeline: true;
  noAssetDependency: true;
  noUIIntegration: true;
  noRuntimeIntegration: true;
  noPersistence: true;
}>;
