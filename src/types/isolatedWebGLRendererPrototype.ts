import type { IsolatedWebGLRendererPrototypeAuthorization } from "./isolatedWebGLRendererPrototypeAuthorization";
import type { GenesisTimeSequenceRecognitionProjection } from "./genesisTimeSequenceRecognitionProjection";
import type { GenesisBirthMansionIgnitionProjection } from "./genesisBirthMansionIgnitionProjection";
import type { PersonalStarBeastLifePresenceProjection } from "./personalStarBeastLifePresenceProjection";
import type { PersonalStarBeastLifeStarCoreProjection } from "./personalStarBeastLifeStarCoreProjection";
import type { PersonalStarBeastRenderPlan } from "./personalStarBeastRenderPlan";

export type IsolatedWebGLRendererPrototypeSceneProjection = Readonly<{
  semanticRole: "ISOLATED_WEBGL_LIFE_MANIFESTATION_SCENE";
  sourceRenderPlanReferenceId: string;
  cosmicField: Readonly<{
    particleCount: number;
    spread: number;
    opacity: number;
  }>;
  mansionStructure: Readonly<{
    anchorCount: number;
    radius: number;
    lineOpacity: number;
  }>;
  lifePresence: PersonalStarBeastLifePresenceProjection;
  lifeStarCore: PersonalStarBeastLifeStarCoreProjection;
  timeSequenceRecognition: GenesisTimeSequenceRecognitionProjection | null;
  birthMansionIgnition: GenesisBirthMansionIgnitionProjection | null;
  formField: Readonly<{
    hue: number;
    boundaryScale: number;
    flowSpeed: number;
  }>;
  lifeCore: Readonly<{
    hue: number;
    intensity: number;
    breathingAmplitude: number;
  }>;
  motion: Readonly<{
    rotationSpeed: number;
    driftAmplitude: number;
  }>;
  crystal: Readonly<{
    visible: boolean;
    nodeCount: number;
  }>;
  rendererParametersOnly: true;
  identityBlind: true;
  noLifeFactCopy: true;
}>;

export type IsolatedWebGLRendererPrototypeInput = Readonly<{
  canvas: HTMLCanvasElement | null;
  renderPlan: PersonalStarBeastRenderPlan | null;
  authorization: IsolatedWebGLRendererPrototypeAuthorization | null;
  width: number;
  height: number;
  pixelRatio: number;
  reducedMotion: boolean;
  timeSequenceRecognitionProjection?: GenesisTimeSequenceRecognitionProjection | null;
  birthMansionIgnitionProjection?: GenesisBirthMansionIgnitionProjection | null;
}>;

export type IsolatedWebGLRendererPrototypeContextState =
  | "ACTIVE"
  | "LOST"
  | "RESTORED"
  | "DISPOSED";

export type IsolatedWebGLRendererPrototypeSnapshot = Readonly<{
  sourceRenderPlanReferenceId: string;
  contextState: IsolatedWebGLRendererPrototypeContextState;
  frameCount: number;
  width: number;
  height: number;
  disposed: boolean;
}>;

export type IsolatedWebGLRendererPrototypeController = Readonly<{
  sceneProjection: IsolatedWebGLRendererPrototypeSceneProjection;
  renderFrame: (elapsedMilliseconds: number) => void;
  resize: (width: number, height: number, pixelRatio?: number) => void;
  getSnapshot: () => IsolatedWebGLRendererPrototypeSnapshot;
  dispose: () => void;
}>;

export type IsolatedWebGLRendererPrototypeFallback = Readonly<{
  mode: "SEMANTIC_STATIC_FALLBACK";
  reason:
    | "CANVAS_REQUIRED"
    | "WEBGL2_UNAVAILABLE"
    | "REDUCED_MOTION_REQUESTED"
    | "RENDERER_INITIALIZATION_FAILED";
  sceneProjection: IsolatedWebGLRendererPrototypeSceneProjection;
  preservesRenderPlanSemantics: true;
  noIdentityRecalculation: true;
}>;

export type IsolatedWebGLRendererPrototypeBlockedReason =
  | "AUTHORIZATION_REQUIRED"
  | "AUTHORIZATION_SCOPE_INVALID"
  | "RENDER_PLAN_REQUIRED"
  | "RENDER_PLAN_BOUNDARY_INVALID"
  | "RENDER_PLAN_NOT_AUTHORIZED"
  | "VIEWPORT_INVALID";

export type IsolatedWebGLRendererPrototypeResult =
  | Readonly<{
      status: "READY";
      source: "isolated_webgl_renderer_prototype";
      controller: IsolatedWebGLRendererPrototypeController;
      boundary: IsolatedWebGLRendererPrototypeBoundary;
    }>
  | Readonly<{
      status: "FALLBACK_REQUIRED";
      source: "isolated_webgl_renderer_prototype";
      fallback: IsolatedWebGLRendererPrototypeFallback;
      boundary: IsolatedWebGLRendererPrototypeBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      source: "isolated_webgl_renderer_prototype";
      reason: IsolatedWebGLRendererPrototypeBlockedReason;
      noRenderer: true;
      boundary: IsolatedWebGLRendererPrototypeBoundary;
    }>;

export type IsolatedWebGLRendererPrototypeBoundary = Readonly<{
  experimentOnly: true;
  renderPlanOnly: true;
  authorizationRequired: true;
  manualFrameDriverOnly: true;
  noIdentityInput: true;
  noEngineInvocation: true;
  noSceneModelInput: true;
  noAnimationLoopOwnership: true;
  noProductionIntegration: true;
  noUIIntegration: true;
  noFormalUserIntegration: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
}>;
