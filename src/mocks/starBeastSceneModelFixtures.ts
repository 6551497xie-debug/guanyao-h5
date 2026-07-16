import type { ChronoCoordinate } from "../types/guanyaoCausalEngine";
import type {
  PersonalStarBeastManifestationGrammarReference,
  PersonalStarBeastManifestationReadinessReference,
  PersonalStarBeastSceneModel,
} from "../types/personalStarBeastSceneModel";
import type { PersonalStarBeastSceneModelFixture } from "../types/personalStarBeastSceneModelFixture";
import type { StarBeastGenesisOriginCoordinateReference } from "../types/starBeastGenesisExperience";
import { runMotherCodeLandingEngine } from "../services/guanyaoLunarMotherCodeLandingAdapter";
import { resolveStarbeastFromBirthDate } from "../services/guanyaoStarbeastEngineService";
import { resolveLifeArchetypeProfileFromMotherCode } from "../services/motherCodeLifeArchetypeSource";
import { resolvePersonalStarBeastManifestationReadiness } from "../services/personalStarBeastManifestationReadiness";
import { calibrateStarBeastGenesisSource } from "../services/starBeastGenesisSourceCalibration";
import { freezeStarMansionLifeTrajectorySource } from "../services/starMansionLifeTrajectorySourceFreeze";

const MANIFESTATION_GRAMMAR_REFERENCE_ID =
  "guanyao:visual-manifestation-grammar:v1";

type FormalFixtureSeed = Readonly<{
  fixtureId: string;
  birthInput: ChronoCoordinate;
}>;

const createOriginCoordinateReference = (
  fixtureId: string,
): StarBeastGenesisOriginCoordinateReference =>
  Object.freeze({
    referenceType: "STAR_BEAST_GENESIS_ORIGIN_COORDINATE",
    referenceId: `fixture:${fixtureId}:origin-coordinate`,
    sourceRole: "SHARED_TEMPORAL_BIRTH_COORDINATE",
    birthLocationContextOnly: true,
    birthLocationExcludedFromStarBeastDerivation: true,
  });

const buildFormalFixture = (
  seed: FormalFixtureSeed,
): PersonalStarBeastSceneModelFixture => {
  const starbeastResult = resolveStarbeastFromBirthDate(seed.birthInput);
  const motherCodeLandingResult = runMotherCodeLandingEngine(seed.birthInput);
  const originCoordinateReference = createOriginCoordinateReference(
    seed.fixtureId,
  );
  const calibration = calibrateStarBeastGenesisSource(
    Object.freeze({
      originCoordinateReference,
      starbeastDerivationResultReference: starbeastResult,
      motherCodeLandingResultReference: motherCodeLandingResult,
    }),
  );

  if (calibration.status !== "AVAILABLE") {
    throw new Error(`Formal source calibration failed for ${seed.fixtureId}`);
  }

  const archetype = resolveLifeArchetypeProfileFromMotherCode(
    calibration.sourceIdentity.motherCodeProfileReference.profileReference,
  );
  if (archetype.status !== "READY") {
    throw new Error(`Formal life archetype source failed for ${seed.fixtureId}`);
  }

  const frozenSource = freezeStarMansionLifeTrajectorySource(
    Object.freeze({
      originCoordinateReference:
        calibration.sourceIdentity.originCoordinateReference,
      mansionResultReference:
        calibration.sourceIdentity.mansionResultReference,
      fourSymbolResultReference:
        calibration.sourceIdentity.fourSymbolResultReference,
      motherCodeProfileReference:
        calibration.sourceIdentity.motherCodeProfileReference,
      lifeArchetypeProfileReference: archetype.lifeArchetypeProfile,
    }),
  );
  if (frozenSource.status !== "AVAILABLE") {
    throw new Error(`Formal trajectory source failed for ${seed.fixtureId}`);
  }

  const trajectory = frozenSource.source;
  const readiness = resolvePersonalStarBeastManifestationReadiness(
    Object.freeze({
      starMansionLifeTrajectorySourceReference: trajectory,
      starBeastIdentitySourceReference: trajectory.starBeastIdentitySource,
      originCoordinateReference: trajectory.originCoordinateReference,
      mansionResultReference: trajectory.mansionResultReference,
      fourSymbolResultReference: trajectory.fourSymbolResultReference,
      motherCodeProfileReference: trajectory.motherCodeProfileReference,
      lifeArchetypeProfileReference: trajectory.lifeArchetypeProfileReference,
    }),
  );
  if (readiness.status !== "READY") {
    throw new Error(`Formal manifestation readiness failed for ${seed.fixtureId}`);
  }

  const identitySourceReference = trajectory.starBeastIdentitySource;
  const identityReference = readiness.personalStarBeastIdentityReference;
  const readinessReference: PersonalStarBeastManifestationReadinessReference =
    Object.freeze({
      referenceType: "PERSONAL_STAR_BEAST_MANIFESTATION_READINESS",
      referenceId: `fixture:${seed.fixtureId}:manifestation-readiness`,
      readiness: "READY_FOR_PERSONAL_STAR_BEAST_MANIFESTATION_DESIGN",
    });
  const manifestationGrammarReference: PersonalStarBeastManifestationGrammarReference =
    Object.freeze({
      referenceType: "PERSONAL_STAR_BEAST_MANIFESTATION_GRAMMAR",
      referenceId: MANIFESTATION_GRAMMAR_REFERENCE_ID,
      protocolVersion: "GUANYAO_VISUAL_MANIFESTATION_GRAMMAR_V1",
      sourceIdentityReference: identityReference,
      referenceOnly: true,
      noIdentityCalculation: true,
    });

  const mansionSeedStructureReference = Object.freeze({
    referenceType: "PERSONAL_STAR_BEAST_MANSION_SEED_STRUCTURE" as const,
    referenceId: `fixture:${seed.fixtureId}:mansion-seed-structure`,
    sourceIdentityReference: identityReference,
  });
  const fourSymbolSpatialFieldReference = Object.freeze({
    referenceType: "PERSONAL_STAR_BEAST_FOUR_SYMBOL_SPATIAL_FIELD" as const,
    referenceId: `fixture:${seed.fixtureId}:four-symbol-spatial-field`,
    sourceIdentityReference: identityReference,
    notFourSymbolAnimalAsset: true as const,
  });
  const lifeForceModulationReference = Object.freeze({
    referenceType: "PERSONAL_STAR_BEAST_LIFE_FORCE_MODULATION" as const,
    referenceId: `fixture:${seed.fixtureId}:life-force-modulation`,
    sourceIdentityReference: identityReference,
    noBeastFormGeneration: true as const,
  });

  const sceneModelReference: PersonalStarBeastSceneModel = Object.freeze({
    semanticRole: "PERSONAL_STAR_BEAST_RENDERER_NEUTRAL_SCENE_MODEL",
    sourceIdentityReference: identityReference,
    sourceManifestationGrammarReference: manifestationGrammarReference,
    sourceReadinessReference: readinessReference,
    sceneReferences: Object.freeze({
      mansionSeedStructure: mansionSeedStructureReference,
      fourSymbolSpatialField: fourSymbolSpatialFieldReference,
      lifeForceModulation: lifeForceModulationReference,
      crystalImprint: null,
      manifestationStage: Object.freeze({
        referenceType: "PERSONAL_STAR_BEAST_MANIFESTATION_STAGE",
        referenceId: `fixture:${seed.fixtureId}:initial-reveal-stage`,
      }),
      qualityProfile: Object.freeze({
        referenceType: "PERSONAL_STAR_BEAST_SCENE_QUALITY_PROFILE",
        referenceId: "fixture:isolated-prototype:neutral-quality",
        expressionQualityOnly: true,
        noIdentityEffect: true,
      }),
    }),
    visualStateSpecialization: true,
    rendererNeutral: true,
    referenceOnly: true,
    noLifeFactCopy: true,
    noIdentityCalculation: true,
    noCoordinateData: true,
    noParticleParameters: true,
    noAnimationParameters: true,
    noShaderDefinition: true,
    noMaterialDefinition: true,
    noAssetGeneration: true,
    noDrawCommands: true,
    noRendererInvocation: true,
    noDeviceDetection: true,
    noRuntimeIntegration: true,
    noUIIntegration: true,
    noStorageWrite: true,
  });

  return Object.freeze({
    fixtureId: seed.fixtureId,
    identitySourceReference,
    mansionSeedReference: identitySourceReference.mansionSeed,
    fourSymbolFieldReference: identitySourceReference.fourSymbolField,
    lifeArchetypeReference: identitySourceReference.lifeArchetypeForce,
    sceneModelReference,
    validationScope: "ISOLATED_PROTOTYPE_ONLY",
  });
};

export const PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A =
  buildFormalFixture(
    Object.freeze({
      fixtureId: "personal-star-beast-scene-model-case-a",
      birthInput: Object.freeze({
        year: 1979,
        month: 4,
        day: 15,
        hourBranch: "未时",
      }),
    }),
  );

export const PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B =
  buildFormalFixture(
    Object.freeze({
      fixtureId: "personal-star-beast-scene-model-case-b",
      birthInput: Object.freeze({
        year: 2024,
        month: 2,
        day: 10,
        hourBranch: "子时",
      }),
    }),
  );

export const PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURES = Object.freeze([
  PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A,
  PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B,
] as const);
