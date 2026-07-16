import type { PersonalStarBeastSceneModel } from "../types/personalStarBeastSceneModel";
import type {
  PersonalStarBeastRenderExpressionChannel,
  PersonalStarBeastRenderExpressionReference,
  PersonalStarBeastRenderPlan,
  PersonalStarBeastRenderPlanAdapterBlockedReason,
  PersonalStarBeastRenderPlanAdapterResult,
} from "../types/personalStarBeastRenderPlan";

const ADAPTER_BOUNDARY = Object.freeze({
  sceneModelToRenderPlanOnly: true,
  sameAdapterForAllFormalIdentities: true,
  outputPlanIsIdentityBlind: true,
  sourceSceneModelNotEmbeddedInPlan: true,
  noIdentityCalculation: true,
  noEngineInvocation: true,
  noSceneModelMutation: true,
  noRendererInvocation: true,
  noP40ContractMutation: true,
  noWebGLActivation: true,
  noCanvasInvocation: true,
  noRuntimeIntegration: true,
  noUIIntegration: true,
  noStorageWrite: true,
} as const);

const createOpaqueReferenceId = (
  sourceReferenceId: string,
  channel: PersonalStarBeastRenderExpressionChannel,
): string => {
  const input = `${channel}:${sourceReferenceId}`;
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `psb-expression:${(hash >>> 0).toString(36)}`;
};

const createExpressionReference = (
  sourceReferenceId: string,
  channel: PersonalStarBeastRenderExpressionChannel,
): PersonalStarBeastRenderExpressionReference =>
  Object.freeze({
    referenceType: "PERSONAL_STAR_BEAST_RENDER_EXPRESSION",
    referenceId: createOpaqueReferenceId(sourceReferenceId, channel),
    channel,
    semanticOnly: true,
    backendNeutral: true,
  });

const blocked = (
  sourceSceneModelReference: PersonalStarBeastSceneModel | null,
  reason: PersonalStarBeastRenderPlanAdapterBlockedReason,
): PersonalStarBeastRenderPlanAdapterResult =>
  Object.freeze({
    status: "BLOCKED",
    source: "personal_star_beast_scene_model_adapter",
    reason,
    sourceSceneModelReference,
    noRenderPlan: true,
    boundary: ADAPTER_BOUNDARY,
  });

const hasValidSceneExpressionReferences = (
  sceneModel: PersonalStarBeastSceneModel,
): boolean => {
  const references = sceneModel.sceneReferences;
  return (
    references.mansionSeedStructure.referenceType ===
      "PERSONAL_STAR_BEAST_MANSION_SEED_STRUCTURE" &&
    references.mansionSeedStructure.referenceId.trim().length > 0 &&
    references.fourSymbolSpatialField.referenceType ===
      "PERSONAL_STAR_BEAST_FOUR_SYMBOL_SPATIAL_FIELD" &&
    references.fourSymbolSpatialField.referenceId.trim().length > 0 &&
    references.lifeForceModulation.referenceType ===
      "PERSONAL_STAR_BEAST_LIFE_FORCE_MODULATION" &&
    references.lifeForceModulation.referenceId.trim().length > 0 &&
    references.manifestationStage.referenceType ===
      "PERSONAL_STAR_BEAST_MANIFESTATION_STAGE" &&
    references.manifestationStage.referenceId.trim().length > 0 &&
    references.qualityProfile.referenceType ===
      "PERSONAL_STAR_BEAST_SCENE_QUALITY_PROFILE" &&
    references.qualityProfile.referenceId.trim().length > 0
  );
};

export function adaptPersonalStarBeastSceneModelToRenderPlan(
  sceneModel: PersonalStarBeastSceneModel | null,
): PersonalStarBeastRenderPlanAdapterResult {
  if (sceneModel === null) return blocked(null, "SCENE_MODEL_REQUIRED");

  if (
    sceneModel.semanticRole !==
      "PERSONAL_STAR_BEAST_RENDERER_NEUTRAL_SCENE_MODEL" ||
    sceneModel.rendererNeutral !== true ||
    sceneModel.referenceOnly !== true ||
    sceneModel.noLifeFactCopy !== true ||
    sceneModel.noIdentityCalculation !== true ||
    sceneModel.noDrawCommands !== true ||
    sceneModel.noRendererInvocation !== true
  ) {
    return blocked(sceneModel, "SCENE_MODEL_BOUNDARY_INVALID");
  }

  if (
    sceneModel.sourceManifestationGrammarReference.referenceType !==
      "PERSONAL_STAR_BEAST_MANIFESTATION_GRAMMAR" ||
    sceneModel.sourceManifestationGrammarReference.protocolVersion !==
      "GUANYAO_VISUAL_MANIFESTATION_GRAMMAR_V1" ||
    sceneModel.sourceManifestationGrammarReference.referenceId.trim().length ===
      0
  ) {
    return blocked(sceneModel, "MANIFESTATION_GRAMMAR_REFERENCE_INVALID");
  }

  if (!hasValidSceneExpressionReferences(sceneModel)) {
    return blocked(sceneModel, "SCENE_EXPRESSION_REFERENCE_INVALID");
  }

  const references = sceneModel.sceneReferences;
  const mansionSeedReferenceId = references.mansionSeedStructure.referenceId;
  const fieldReferenceId = references.fourSymbolSpatialField.referenceId;
  const forceReferenceId = references.lifeForceModulation.referenceId;

  const plan: PersonalStarBeastRenderPlan = Object.freeze({
    semanticRole: "PERSONAL_STAR_BEAST_RENDER_PLAN",
    manifestationStage: Object.freeze({
      expressionMode: "DECLARED_STAGE_REFERENCE",
      stageExpression: createExpressionReference(
        references.manifestationStage.referenceId,
        "MANIFESTATION_STAGE",
      ),
    }),
    spatialExpression: Object.freeze({
      structureDensity: createExpressionReference(
        mansionSeedReferenceId,
        "STRUCTURE_DENSITY",
      ),
      anchorBehavior: createExpressionReference(
        mansionSeedReferenceId,
        "ANCHOR_BEHAVIOR",
      ),
      formationPattern: createExpressionReference(
        mansionSeedReferenceId,
        "FORMATION_PATTERN",
      ),
    }),
    fieldBehavior: Object.freeze({
      spatialBias: createExpressionReference(fieldReferenceId, "SPATIAL_BIAS"),
      boundaryBehavior: createExpressionReference(
        fieldReferenceId,
        "BOUNDARY_BEHAVIOR",
      ),
      flowDirection: createExpressionReference(
        fieldReferenceId,
        "FLOW_DIRECTION",
      ),
      noAnimalSilhouetteInstruction: true,
    }),
    lightExpression: Object.freeze({
      coreLight: createExpressionReference(forceReferenceId, "CORE_LIGHT"),
      boundaryLight: createExpressionReference(
        fieldReferenceId,
        "BOUNDARY_LIGHT",
      ),
    }),
    motionExpression: Object.freeze({
      energyRhythm: createExpressionReference(forceReferenceId, "ENERGY_RHYTHM"),
      coreBehavior: createExpressionReference(forceReferenceId, "CORE_BEHAVIOR"),
      aggregationMode: createExpressionReference(
        forceReferenceId,
        "AGGREGATION_MODE",
      ),
      noModelGeneration: true,
    }),
    crystalExpression:
      references.crystalImprint === null
        ? null
        : Object.freeze({
            imprintLayer: createExpressionReference(
              references.crystalImprint.referenceId,
              "CRYSTAL_IMPRINT",
            ),
            baseStructureInvariant: true,
          }),
    qualityProfile: Object.freeze({
      expressionReference: createExpressionReference(
        references.qualityProfile.referenceId,
        "QUALITY_PROFILE",
      ),
      expressionQualityOnly: true,
      noDeviceSelection: true,
    }),
    fallbackProfile: Object.freeze({
      canvas: "SEMANTIC_2D_FALLBACK",
      static: "SEMANTIC_STATIC_FALLBACK",
      preserveManifestationSequence: true,
      preserveSemanticExpression: true,
      noLifeRuleFallback: true,
    }),
    rendererNeutral: true,
    expressionOnly: true,
    identityBlind: true,
    semanticChannelsOnly: true,
    noLifeFactCopy: true,
    noIdentityCalculation: true,
    noCoordinateData: true,
    noPixelOutput: true,
    noDrawCommands: true,
    noAssetGeneration: true,
    noRendererInvocation: true,
    noBackendSelection: true,
    noWebGLActivation: true,
    noRuntimeIntegration: true,
    noUIIntegration: true,
    noStorageWrite: true,
  });

  return Object.freeze({
    status: "PLANNED",
    source: "personal_star_beast_scene_model_adapter",
    sourceSceneModelReference: sceneModel,
    plan,
    boundary: ADAPTER_BOUNDARY,
  });
}
