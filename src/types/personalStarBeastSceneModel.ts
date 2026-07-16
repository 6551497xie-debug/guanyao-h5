import type { PersonalStarBeastIdentityReference } from "./starBeastIdentitySource";
import type { StarBeastCrystalVisualReference } from "./starBeastVisualState";

export type PersonalStarBeastManifestationReadinessReference = Readonly<{
  referenceType: "PERSONAL_STAR_BEAST_MANIFESTATION_READINESS";
  referenceId: string;
  readiness: "READY_FOR_PERSONAL_STAR_BEAST_MANIFESTATION_DESIGN";
}>;

export type PersonalStarBeastManifestationGrammarReference = Readonly<{
  referenceType: "PERSONAL_STAR_BEAST_MANIFESTATION_GRAMMAR";
  referenceId: string;
  protocolVersion: "GUANYAO_VISUAL_MANIFESTATION_GRAMMAR_V1";
  sourceIdentityReference: PersonalStarBeastIdentityReference;
  referenceOnly: true;
  noIdentityCalculation: true;
}>;

export type PersonalStarBeastMansionSeedStructureReference = Readonly<{
  referenceType: "PERSONAL_STAR_BEAST_MANSION_SEED_STRUCTURE";
  referenceId: string;
  sourceIdentityReference: PersonalStarBeastIdentityReference;
}>;

export type PersonalStarBeastFourSymbolSpatialFieldReference = Readonly<{
  referenceType: "PERSONAL_STAR_BEAST_FOUR_SYMBOL_SPATIAL_FIELD";
  referenceId: string;
  sourceIdentityReference: PersonalStarBeastIdentityReference;
  notFourSymbolAnimalAsset: true;
}>;

export type PersonalStarBeastLifeForceModulationReference = Readonly<{
  referenceType: "PERSONAL_STAR_BEAST_LIFE_FORCE_MODULATION";
  referenceId: string;
  sourceIdentityReference: PersonalStarBeastIdentityReference;
  noBeastFormGeneration: true;
}>;

export type PersonalStarBeastManifestationStageReference = Readonly<{
  referenceType: "PERSONAL_STAR_BEAST_MANIFESTATION_STAGE";
  referenceId: string;
}>;

export type PersonalStarBeastSceneQualityProfileReference = Readonly<{
  referenceType: "PERSONAL_STAR_BEAST_SCENE_QUALITY_PROFILE";
  referenceId: string;
  expressionQualityOnly: true;
  noIdentityEffect: true;
}>;

export type PersonalStarBeastSceneModelInput = Readonly<{
  manifestationReadinessReference:
    PersonalStarBeastManifestationReadinessReference;
  identityReference: PersonalStarBeastIdentityReference;
  manifestationGrammarReference:
    PersonalStarBeastManifestationGrammarReference;
  mansionSeedStructureReference:
    PersonalStarBeastMansionSeedStructureReference;
  fourSymbolSpatialFieldReference:
    PersonalStarBeastFourSymbolSpatialFieldReference;
  lifeForceModulationReference:
    PersonalStarBeastLifeForceModulationReference;
  crystalImprintReference: StarBeastCrystalVisualReference | null;
  manifestationStageReference:
    PersonalStarBeastManifestationStageReference;
  qualityProfileReference: PersonalStarBeastSceneQualityProfileReference;
}>;

export type PersonalStarBeastSceneModel = Readonly<{
  semanticRole: "PERSONAL_STAR_BEAST_RENDERER_NEUTRAL_SCENE_MODEL";
  sourceIdentityReference: PersonalStarBeastIdentityReference;
  sourceManifestationGrammarReference:
    PersonalStarBeastManifestationGrammarReference;
  sourceReadinessReference:
    PersonalStarBeastManifestationReadinessReference;
  sceneReferences: Readonly<{
    mansionSeedStructure:
      PersonalStarBeastMansionSeedStructureReference;
    fourSymbolSpatialField:
      PersonalStarBeastFourSymbolSpatialFieldReference;
    lifeForceModulation:
      PersonalStarBeastLifeForceModulationReference;
    crystalImprint: StarBeastCrystalVisualReference | null;
    manifestationStage:
      PersonalStarBeastManifestationStageReference;
    qualityProfile: PersonalStarBeastSceneQualityProfileReference;
  }>;
  visualStateSpecialization: true;
  rendererNeutral: true;
  referenceOnly: true;
  noLifeFactCopy: true;
  noIdentityCalculation: true;
  noCoordinateData: true;
  noParticleParameters: true;
  noAnimationParameters: true;
  noShaderDefinition: true;
  noMaterialDefinition: true;
  noAssetGeneration: true;
  noDrawCommands: true;
  noRendererInvocation: true;
  noDeviceDetection: true;
  noRuntimeIntegration: true;
  noUIIntegration: true;
  noStorageWrite: true;
}>;

export type PersonalStarBeastSceneModelBoundary = Readonly<{
  contractOnly: true;
  sceneModelIsVisualStateSpecialization: true;
  identityToManifestationToSceneModelToRenderer: true;
  futureP40AdapterRequired: true;
  directRendererConsumptionForbidden: true;
  backendSelectionDeferred: true;
  webGLPrototypeAuthorizationDeferred: true;
}>;
