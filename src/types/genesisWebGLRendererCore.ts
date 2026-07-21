import type { GenesisBirthMansionIgnitionProjection } from "./genesisBirthMansionIgnitionProjection";
import type { GenesisFourSymbolAlignmentProjection } from "./genesisFourSymbolAlignmentProjection";
import type { GenesisLifeForceInfusionProjection } from "./genesisLifeForceInfusionProjection";
import type { GenesisPersonalRevealProjection } from "./genesisPersonalRevealProjection";
import type { GenesisRealityPressureProjection } from "./genesisRealityPressureProjection";
import type {
  GenesisPerspectiveCalibrationCore,
  GenesisPresenceRecognitionCalibrationCore,
  GenesisRendererVisualRealizationCore,
  GenesisSpatialDistanceCalibrationCore,
} from "./genesisProductionVisualCalibrationBridge";
import type { GenesisTimeSequenceRecognitionProjection } from "./genesisTimeSequenceRecognitionProjection";
import type {
  GenesisTwentyEightMansionCoordinateProjection,
  GenesisTwentyEightMansionCoordinateSlot,
} from "./genesisTwentyEightMansionCoordinateProjection";
import type { PersonalStarBeastLifePresenceProjection } from "./personalStarBeastLifePresenceProjection";
import type { PersonalStarBeastLifeStarCoreProjection } from "./personalStarBeastLifeStarCoreProjection";
import type { PersonalStarBeastRenderPlan } from "./personalStarBeastRenderPlan";

export type GenesisWebGLRendererCoreSceneProjection = Readonly<{
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
  mansionCoordinateField: Readonly<{
    coordinateSystem: "GENESIS_NORMALIZED_MANSION_ORBIT";
    coordinateCount: 28;
    coordinates: readonly GenesisTwentyEightMansionCoordinateSlot[];
    birthCoordinateIndex: number;
    sourceProjectionConsumed: true;
    noMansionName: true;
    noIdentityCalculation: true;
  }> | null;
  lifePresence: PersonalStarBeastLifePresenceProjection;
  lifeStarCore: PersonalStarBeastLifeStarCoreProjection;
  timeSequenceRecognition: GenesisTimeSequenceRecognitionProjection | null;
  birthMansionIgnition: GenesisBirthMansionIgnitionProjection | null;
  morphologicalFieldAlignment: GenesisFourSymbolAlignmentProjection | null;
  lifeForceInfusion: GenesisLifeForceInfusionProjection | null;
  personalReveal: GenesisPersonalRevealProjection | null;
  realityPressure: GenesisRealityPressureProjection | null;
  genesisVisualRealization: GenesisRendererVisualRealizationCore | null;
  genesisPerspectiveCalibration: GenesisPerspectiveCalibrationCore | null;
  genesisPresenceRecognitionCalibration: GenesisPresenceRecognitionCalibrationCore | null;
  genesisSpatialDistanceCalibration: GenesisSpatialDistanceCalibrationCore | null;
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

export type GenesisWebGLRendererCoreInput = Readonly<{
  canvas: HTMLCanvasElement | null;
  renderPlan: PersonalStarBeastRenderPlan | null;
  width: number;
  height: number;
  pixelRatio: number;
  reducedMotion: boolean;
  twentyEightMansionCoordinateProjection?: GenesisTwentyEightMansionCoordinateProjection | null;
  timeSequenceRecognitionProjection?: GenesisTimeSequenceRecognitionProjection | null;
  birthMansionIgnitionProjection?: GenesisBirthMansionIgnitionProjection | null;
  morphologicalFieldAlignmentProjection?: GenesisFourSymbolAlignmentProjection | null;
  lifeForceInfusionProjection?: GenesisLifeForceInfusionProjection | null;
  personalRevealProjection?: GenesisPersonalRevealProjection | null;
  realityPressureProjection?: GenesisRealityPressureProjection | null;
  genesisVisualRealization?: GenesisRendererVisualRealizationCore | null;
  genesisPerspectiveCalibration?: GenesisPerspectiveCalibrationCore | null;
  genesisPresenceRecognitionCalibration?: GenesisPresenceRecognitionCalibrationCore | null;
  genesisSpatialDistanceCalibration?: GenesisSpatialDistanceCalibrationCore | null;
}>;

export type GenesisWebGLRendererCoreContextState =
  | "ACTIVE"
  | "LOST"
  | "RESTORED"
  | "DISPOSED";

export type GenesisWebGLRendererCoreSnapshot = Readonly<{
  sourceRenderPlanReferenceId: string;
  contextState: GenesisWebGLRendererCoreContextState;
  frameCount: number;
  width: number;
  height: number;
  disposed: boolean;
}>;

export type GenesisWebGLRendererCoreController = Readonly<{
  sceneProjection: GenesisWebGLRendererCoreSceneProjection;
  renderFrame: (elapsedMilliseconds: number) => void;
  resize: (width: number, height: number, pixelRatio?: number) => void;
  getSnapshot: () => GenesisWebGLRendererCoreSnapshot;
  dispose: () => void;
}>;

export type GenesisWebGLRendererCoreFallback = Readonly<{
  mode: "SEMANTIC_STATIC_FALLBACK";
  reason:
    | "CANVAS_REQUIRED"
    | "WEBGL2_UNAVAILABLE"
    | "REDUCED_MOTION_REQUESTED"
    | "RENDERER_INITIALIZATION_FAILED";
  sceneProjection: GenesisWebGLRendererCoreSceneProjection;
  preservesRenderPlanSemantics: true;
  noIdentityRecalculation: true;
}>;

export type GenesisWebGLRendererCoreBlockedReason =
  | "RENDER_PLAN_REQUIRED"
  | "RENDER_PLAN_BOUNDARY_INVALID"
  | "MANSION_COORDINATE_PROJECTION_INVALID"
  | "VIEWPORT_INVALID";

export type GenesisWebGLRendererCoreBoundary = Readonly<{
  rendererCoreOnly: true;
  renderPlanOnly: true;
  authorizationExternal: true;
  manualFrameDriverOnly: true;
  noIdentityInput: true;
  noEngineInvocation: true;
  noSceneModelInput: true;
  noAnimationLoopOwnership: true;
  noSourceSelection: true;
  noAuthorizationDecision: true;
  noUIIntegration: true;
  noStorageWrite: true;
}>;

export type GenesisWebGLRendererCoreResult =
  | Readonly<{
      status: "READY";
      source: "genesis_webgl_renderer_core";
      controller: GenesisWebGLRendererCoreController;
      boundary: GenesisWebGLRendererCoreBoundary;
    }>
  | Readonly<{
      status: "FALLBACK_REQUIRED";
      source: "genesis_webgl_renderer_core";
      fallback: GenesisWebGLRendererCoreFallback;
      boundary: GenesisWebGLRendererCoreBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      source: "genesis_webgl_renderer_core";
      reason: GenesisWebGLRendererCoreBlockedReason;
      noRenderer: true;
      boundary: GenesisWebGLRendererCoreBoundary;
    }>;
