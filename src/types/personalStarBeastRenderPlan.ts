import type { PersonalStarBeastSceneModel } from "./personalStarBeastSceneModel";

export type PersonalStarBeastRenderExpressionChannel =
  | "MANIFESTATION_STAGE"
  | "STRUCTURE_DENSITY"
  | "ANCHOR_BEHAVIOR"
  | "FORMATION_PATTERN"
  | "SPATIAL_BIAS"
  | "BOUNDARY_BEHAVIOR"
  | "FLOW_DIRECTION"
  | "CORE_LIGHT"
  | "BOUNDARY_LIGHT"
  | "ENERGY_RHYTHM"
  | "CORE_BEHAVIOR"
  | "AGGREGATION_MODE"
  | "CRYSTAL_IMPRINT"
  | "QUALITY_PROFILE";

export type PersonalStarBeastRenderExpressionReference = Readonly<{
  referenceType: "PERSONAL_STAR_BEAST_RENDER_EXPRESSION";
  referenceId: string;
  channel: PersonalStarBeastRenderExpressionChannel;
  semanticOnly: true;
  backendNeutral: true;
}>;

export type PersonalStarBeastRenderPlan = Readonly<{
  semanticRole: "PERSONAL_STAR_BEAST_RENDER_PLAN";
  manifestationStage: Readonly<{
    expressionMode: "DECLARED_STAGE_REFERENCE";
    stageExpression: PersonalStarBeastRenderExpressionReference;
  }>;
  spatialExpression: Readonly<{
    structureDensity: PersonalStarBeastRenderExpressionReference;
    anchorBehavior: PersonalStarBeastRenderExpressionReference;
    formationPattern: PersonalStarBeastRenderExpressionReference;
  }>;
  fieldBehavior: Readonly<{
    spatialBias: PersonalStarBeastRenderExpressionReference;
    boundaryBehavior: PersonalStarBeastRenderExpressionReference;
    flowDirection: PersonalStarBeastRenderExpressionReference;
    noAnimalSilhouetteInstruction: true;
  }>;
  lightExpression: Readonly<{
    coreLight: PersonalStarBeastRenderExpressionReference;
    boundaryLight: PersonalStarBeastRenderExpressionReference;
  }>;
  motionExpression: Readonly<{
    energyRhythm: PersonalStarBeastRenderExpressionReference;
    coreBehavior: PersonalStarBeastRenderExpressionReference;
    aggregationMode: PersonalStarBeastRenderExpressionReference;
    noModelGeneration: true;
  }>;
  crystalExpression: Readonly<{
    imprintLayer: PersonalStarBeastRenderExpressionReference;
    baseStructureInvariant: true;
  }> | null;
  qualityProfile: Readonly<{
    expressionReference: PersonalStarBeastRenderExpressionReference;
    expressionQualityOnly: true;
    noDeviceSelection: true;
  }>;
  fallbackProfile: Readonly<{
    canvas: "SEMANTIC_2D_FALLBACK";
    static: "SEMANTIC_STATIC_FALLBACK";
    preserveManifestationSequence: true;
    preserveSemanticExpression: true;
    noLifeRuleFallback: true;
  }>;
  rendererNeutral: true;
  expressionOnly: true;
  identityBlind: true;
  semanticChannelsOnly: true;
  noLifeFactCopy: true;
  noIdentityCalculation: true;
  noCoordinateData: true;
  noPixelOutput: true;
  noDrawCommands: true;
  noAssetGeneration: true;
  noRendererInvocation: true;
  noBackendSelection: true;
  noWebGLActivation: true;
  noRuntimeIntegration: true;
  noUIIntegration: true;
  noStorageWrite: true;
}>;

export type PersonalStarBeastRenderPlanAdapterBlockedReason =
  | "SCENE_MODEL_REQUIRED"
  | "SCENE_MODEL_BOUNDARY_INVALID"
  | "MANIFESTATION_GRAMMAR_REFERENCE_INVALID"
  | "SCENE_EXPRESSION_REFERENCE_INVALID";

export type PersonalStarBeastRenderPlanAdapterResult =
  | Readonly<{
      status: "PLANNED";
      source: "personal_star_beast_scene_model_adapter";
      sourceSceneModelReference: PersonalStarBeastSceneModel;
      plan: PersonalStarBeastRenderPlan;
      boundary: PersonalStarBeastRenderPlanAdapterBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      source: "personal_star_beast_scene_model_adapter";
      reason: PersonalStarBeastRenderPlanAdapterBlockedReason;
      sourceSceneModelReference: PersonalStarBeastSceneModel | null;
      noRenderPlan: true;
      boundary: PersonalStarBeastRenderPlanAdapterBoundary;
    }>;

export type PersonalStarBeastRenderPlanAdapterBoundary = Readonly<{
  sceneModelToRenderPlanOnly: true;
  sameAdapterForAllFormalIdentities: true;
  outputPlanIsIdentityBlind: true;
  sourceSceneModelNotEmbeddedInPlan: true;
  noIdentityCalculation: true;
  noEngineInvocation: true;
  noSceneModelMutation: true;
  noRendererInvocation: true;
  noP40ContractMutation: true;
  noWebGLActivation: true;
  noCanvasInvocation: true;
  noRuntimeIntegration: true;
  noUIIntegration: true;
  noStorageWrite: true;
}>;
