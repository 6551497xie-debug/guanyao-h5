import type {
  PersonalStarBeastManifestationGrammarReference,
  PersonalStarBeastManifestationReadinessReference,
  PersonalStarBeastSceneModel,
} from "../types/personalStarBeastSceneModel";
import type {
  RealLifeVisualSourceAdapterBlockedReason,
  RealLifeVisualSourceAdapterBoundary,
  RealLifeVisualSourceAdapterInput,
  RealLifeVisualSourceAdapterResult,
  RealLifeVisualSourceProvenance,
} from "../types/realLifeVisualSourceAdapter";
import type { StarBeastGenesisOriginCoordinateReference } from "../types/starBeastGenesisExperience";
import type { GenesisRealityPressureReference } from "../types/genesisRealityPressureProjection";
import { projectGenesisBirthMansionIgnition } from "./genesisBirthMansionIgnitionProjection";
import { projectGenesisFourSymbolAlignment } from "./genesisFourSymbolAlignmentProjection";
import { projectGenesisFourSymbolLifeDirection } from "./genesisFourSymbolLifeDirectionProjection";
import { projectGenesisLifeArchetype } from "./genesisLifeArchetypeProjection";
import { resolveGenesisStarBeastManifestationSource } from "./genesisStarBeastManifestationSource";
import { projectGenesisLifeForceInfusion } from "./genesisLifeForceInfusionProjection";
import { projectGenesisPersonalReveal } from "./genesisPersonalRevealProjection";
import { projectGenesisRealityPressure } from "./genesisRealityPressureProjection";
import { projectGenesisTimeSequenceRecognition } from "./genesisTimeSequenceRecognitionProjection";
import { projectGenesisTwentyEightMansionCoordinates } from "./genesisTwentyEightMansionCoordinateProjection";
import { resolveLifeArchetypeProfileFromMotherCode } from "./motherCodeLifeArchetypeSource";
import { resolvePersonalStarBeastManifestationReadiness } from "./personalStarBeastManifestationReadiness";
import { adaptPersonalStarBeastSceneModelToRenderPlan } from "./personalStarBeastRenderPlanAdapter";
import { calibrateStarBeastGenesisSource } from "./starBeastGenesisSourceCalibration";
import { freezeStarMansionLifeTrajectorySource } from "./starMansionLifeTrajectorySourceFreeze";

const MANIFESTATION_GRAMMAR_REFERENCE_ID =
  "guanyao:visual-manifestation-grammar:v1";

const SHARED_TIME_ORIGIN_REFERENCE = Object.freeze({
  referenceType: "STAR_BEAST_GENESIS_ORIGIN_COORDINATE" as const,
  referenceId: "prototype:life-arrival:shared",
  sourceRole: "SHARED_TEMPORAL_BIRTH_COORDINATE" as const,
  birthLocationContextOnly: true as const,
  birthLocationExcludedFromStarBeastDerivation: true as const,
});

const SHARED_TIME_SEQUENCE_REFERENCE = Object.freeze({
  referenceType: "GENESIS_TIME_SEQUENCE_REFERENCE" as const,
  referenceId: "prototype:time-sequence:arrival",
});

export const REAL_LIFE_VISUAL_SOURCE_ADAPTER_BOUNDARY: RealLifeVisualSourceAdapterBoundary =
  Object.freeze({
    sourceAssemblyOnly: true,
    existingEngineResultsOnly: true,
    noEngineInvocation: true,
    noIdentityRecalculation: true,
    noStarBeastGeneration: true,
    noPressureCalculation: true,
    noHexagramCalculation: true,
    noCrystalCalculation: true,
    noRendererInvocation: true,
    noRuntimeMutation: true,
    noVisualCalibrationMutation: true,
    noUIIntegration: true,
    noStorageWrite: true,
  });

const blocked = (
  input: RealLifeVisualSourceAdapterInput,
  reason: RealLifeVisualSourceAdapterBlockedReason,
): RealLifeVisualSourceAdapterResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    source: "real_life_visual_source_adapter" as const,
    reason,
    input,
    visualSource: null,
    boundary: REAL_LIFE_VISUAL_SOURCE_ADAPTER_BOUNDARY,
  });

const namespaceFor = (
  sourceKind: RealLifeVisualSourceAdapterInput["sourceKind"],
  sourceReferenceId: string,
): string =>
  sourceKind === "ISOLATED_FIXTURE_ENGINE_RESULT"
    ? `fixture:${sourceReferenceId}`
    : `real-life:${sourceReferenceId}`;

const createOriginCoordinateReference = (
  namespace: string,
): StarBeastGenesisOriginCoordinateReference =>
  Object.freeze({
    referenceType: "STAR_BEAST_GENESIS_ORIGIN_COORDINATE",
    referenceId: `${namespace}:origin-coordinate`,
    sourceRole: "SHARED_TEMPORAL_BIRTH_COORDINATE",
    birthLocationContextOnly: true,
    birthLocationExcludedFromStarBeastDerivation: true,
  });

const createRealityPressureReference = (
  input: RealLifeVisualSourceAdapterInput,
  sourceReferenceId: string,
): GenesisRealityPressureReference | null => {
  const selectedPressureSeedId =
    input.selectedPressureSeedContext?.selectedPressureSeedId?.trim();

  if (selectedPressureSeedId) {
    return Object.freeze({
      referenceType: "GENESIS_REALITY_PRESSURE_REFERENCE" as const,
      referenceId: `real-life:reality-pressure:${selectedPressureSeedId}`,
      sourceRole: "REALITY_PRESSURE_ENGINE_REFERENCE" as const,
      pressureReferenceOnly: true as const,
      noRawPressureCopy: true as const,
    });
  }

  if (input.sourceKind !== "ISOLATED_FIXTURE_ENGINE_RESULT") return null;

  return Object.freeze({
    referenceType: "GENESIS_REALITY_PRESSURE_REFERENCE" as const,
    referenceId: `prototype:reality-pressure:${sourceReferenceId}`,
    sourceRole: "REALITY_PRESSURE_ENGINE_REFERENCE" as const,
    pressureReferenceOnly: true as const,
    noRawPressureCopy: true as const,
  });
};

export function adaptRealLifeVisualSource(
  input: RealLifeVisualSourceAdapterInput,
): RealLifeVisualSourceAdapterResult {
  const sourceReferenceId = input.sourceReferenceId.trim();
  if (!sourceReferenceId) return blocked(input, "SOURCE_REFERENCE_ID_REQUIRED");

  const namespace = namespaceFor(input.sourceKind, sourceReferenceId);
  const originCoordinateReference = createOriginCoordinateReference(namespace);
  const calibration = calibrateStarBeastGenesisSource(
    Object.freeze({
      originCoordinateReference,
      starbeastDerivationResultReference:
        input.starbeastDerivationResult,
      motherCodeLandingResultReference: input.motherCodeLandingResult,
    }),
  );
  if (calibration.status !== "AVAILABLE") {
    return blocked(input, "SOURCE_CALIBRATION_FAILED");
  }

  const mansionCoordinateResult = projectGenesisTwentyEightMansionCoordinates(
    Object.freeze({
      sourceKind: input.sourceKind,
      sourceReferenceId,
      mansionResultReference:
        calibration.sourceIdentity.mansionResultReference,
    }),
  );
  if (mansionCoordinateResult.status !== "AVAILABLE") {
    return blocked(input, "MANSION_COORDINATE_PROJECTION_FAILED");
  }

  const fourSymbolLifeDirectionResult =
    projectGenesisFourSymbolLifeDirection(
      Object.freeze({
        sourceReferenceId,
        mansionCoordinateProjection: mansionCoordinateResult.projection,
        fourSymbolResultReference:
          calibration.sourceIdentity.fourSymbolResultReference,
      }),
    );
  if (fourSymbolLifeDirectionResult.status !== "AVAILABLE") {
    return blocked(input, "FOUR_SYMBOL_LIFE_DIRECTION_PROJECTION_FAILED");
  }

  const archetype = resolveLifeArchetypeProfileFromMotherCode(
    calibration.sourceIdentity.motherCodeProfileReference.profileReference,
  );
  if (archetype.status !== "READY") {
    return blocked(input, "LIFE_ARCHETYPE_SOURCE_FAILED");
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
    return blocked(input, "TRAJECTORY_SOURCE_FAILED");
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
    return blocked(input, "MANIFESTATION_READINESS_FAILED");
  }

  const identitySourceReference = trajectory.starBeastIdentitySource;
  const identityReference = readiness.personalStarBeastIdentityReference;
  const readinessReference: PersonalStarBeastManifestationReadinessReference =
    Object.freeze({
      referenceType: "PERSONAL_STAR_BEAST_MANIFESTATION_READINESS",
      referenceId: `${namespace}:manifestation-readiness`,
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

  const lifeArchetypeResult = projectGenesisLifeArchetype(
    Object.freeze({
      sourceReferenceId,
      fourSymbolDirectionProjection:
        fourSymbolLifeDirectionResult.projection,
      motherCodeProfileReference: trajectory.motherCodeProfileReference,
      lifeArchetypeProfileReference:
        trajectory.lifeArchetypeProfileReference,
      manifestationReadinessReference: readinessReference,
    }),
  );
  if (lifeArchetypeResult.status !== "AVAILABLE") {
    return blocked(input, "LIFE_ARCHETYPE_PROJECTION_FAILED");
  }

  const starBeastManifestationSourceResult =
    resolveGenesisStarBeastManifestationSource(
      Object.freeze({
        sourceReferenceId,
        mansionCoordinateProjection: mansionCoordinateResult.projection,
        fourSymbolDirectionProjection:
          fourSymbolLifeDirectionResult.projection,
        lifeArchetypeProjection: lifeArchetypeResult.projection,
        starBeastIdentitySourceReference: identitySourceReference,
      }),
    );
  if (starBeastManifestationSourceResult.status !== "AVAILABLE") {
    return blocked(input, "STAR_BEAST_MANIFESTATION_SOURCE_FAILED");
  }

  const sceneModel: PersonalStarBeastSceneModel = Object.freeze({
    semanticRole: "PERSONAL_STAR_BEAST_RENDERER_NEUTRAL_SCENE_MODEL",
    sourceIdentityReference: identityReference,
    sourceManifestationGrammarReference: manifestationGrammarReference,
    sourceReadinessReference: readinessReference,
    sceneReferences: Object.freeze({
      mansionSeedStructure: Object.freeze({
        referenceType: "PERSONAL_STAR_BEAST_MANSION_SEED_STRUCTURE",
        referenceId: `${namespace}:mansion-seed-structure`,
        sourceIdentityReference: identityReference,
      }),
      fourSymbolSpatialField: Object.freeze({
        referenceType: "PERSONAL_STAR_BEAST_FOUR_SYMBOL_SPATIAL_FIELD",
        referenceId: `${namespace}:four-symbol-spatial-field`,
        sourceIdentityReference: identityReference,
        notFourSymbolAnimalAsset: true,
      }),
      lifeForceModulation: Object.freeze({
        referenceType: "PERSONAL_STAR_BEAST_LIFE_FORCE_MODULATION",
        referenceId: `${namespace}:life-force-modulation`,
        sourceIdentityReference: identityReference,
        noBeastFormGeneration: true,
      }),
      crystalImprint: null,
      manifestationStage: Object.freeze({
        referenceType: "PERSONAL_STAR_BEAST_MANIFESTATION_STAGE",
        referenceId: `${namespace}:initial-reveal-stage`,
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

  const renderPlanResult =
    adaptPersonalStarBeastSceneModelToRenderPlan(sceneModel);
  if (renderPlanResult.status !== "PLANNED") {
    return blocked(input, "RENDER_PLAN_ADAPTER_FAILED");
  }

  const timeSequenceResult = projectGenesisTimeSequenceRecognition(
    Object.freeze({
      originCoordinateReference: SHARED_TIME_ORIGIN_REFERENCE,
      timeSequenceReference: SHARED_TIME_SEQUENCE_REFERENCE,
    }),
  );
  if (timeSequenceResult.status !== "AVAILABLE") {
    return blocked(input, "TIME_SEQUENCE_PROJECTION_FAILED");
  }

  const birthMansionResult = projectGenesisBirthMansionIgnition(
    Object.freeze({
      timeSequenceRecognitionProjection: timeSequenceResult.projection,
      mansionResultReference: Object.freeze({
        referenceType: "STAR_BEAST_GENESIS_MANSION" as const,
        referenceId:
          input.sourceKind === "ISOLATED_FIXTURE_ENGINE_RESULT"
            ? `prototype:birth-mansion:${sourceReferenceId}`
            : `real-life:birth-mansion:${sourceReferenceId}`,
        sourceStarbeastDerivationReference:
          input.starbeastDerivationResult,
      }),
    }),
  );
  if (birthMansionResult.status !== "AVAILABLE") {
    return blocked(input, "BIRTH_MANSION_PROJECTION_FAILED");
  }

  const fourSymbolResult = projectGenesisFourSymbolAlignment(
    Object.freeze({
      birthMansionIgnitionProjection: birthMansionResult.projection,
      fourSymbolResultReference:
        trajectory.fourSymbolResultReference,
    }),
  );
  if (fourSymbolResult.status !== "AVAILABLE") {
    return blocked(input, "FOUR_SYMBOL_PROJECTION_FAILED");
  }

  const lifeForceResult = projectGenesisLifeForceInfusion(
    Object.freeze({
      morphologicalFieldAlignmentProjection: fourSymbolResult.projection,
      motherCodeProfileReference:
        trajectory.motherCodeProfileReference,
      lifeArchetypeProfileReference:
        trajectory.lifeArchetypeProfileReference,
    }),
  );
  if (lifeForceResult.status !== "AVAILABLE") {
    return blocked(input, "LIFE_FORCE_PROJECTION_FAILED");
  }

  const personalRevealResult = projectGenesisPersonalReveal(
    Object.freeze({
      birthMansionIgnitionProjection: birthMansionResult.projection,
      morphologicalFieldAlignmentProjection: fourSymbolResult.projection,
      lifeForceInfusionProjection: lifeForceResult.projection,
      personalStarBeastIdentityReference: identityReference,
    }),
  );
  if (personalRevealResult.status !== "AVAILABLE") {
    return blocked(input, "PERSONAL_REVEAL_PROJECTION_FAILED");
  }

  const realityPressureReference = createRealityPressureReference(
    input,
    sourceReferenceId,
  );
  const realityPressureResult = realityPressureReference
    ? projectGenesisRealityPressure(
        Object.freeze({
          personalRevealProjection: personalRevealResult.projection,
          realityPressureReference,
        }),
      )
    : null;
  if (
    realityPressureResult?.status !== undefined &&
    realityPressureResult.status !== "AVAILABLE"
  ) {
    return blocked(input, "REALITY_PRESSURE_PROJECTION_FAILED");
  }

  const selectedPressureSeedId =
    input.selectedPressureSeedContext?.selectedPressureSeedId?.trim() || null;
  const provenance: RealLifeVisualSourceProvenance = Object.freeze({
    sourceKind: input.sourceKind,
    sourceReferenceId,
    starbeastEngine: "guanyao_starbeast_engine",
    motherCodeEngine: "guanyao_lunar_mother_code_landing",
    gregorianBirthDate:
      input.starbeastDerivationResult.gregorianBirthDate,
    mansion: input.starbeastDerivationResult.mansion,
    fourSymbol: input.starbeastDerivationResult.fourSymbol,
    motherCodeId:
      input.motherCodeLandingResult.motherCodeProfile.motherCodeId,
    selectedPressureSeedId,
  });

  return Object.freeze({
    status: "AVAILABLE" as const,
    source: "real_life_visual_source_adapter" as const,
    input,
    visualSource: Object.freeze({
      provenance,
      sourceIdentity: calibration.sourceIdentity,
      trajectorySource: trajectory,
      identitySourceReference,
      sceneModel,
      renderPlan: renderPlanResult.plan,
      renderPlanResult,
      projectionBundle: Object.freeze({
        twentyEightMansionCoordinateProjection:
          mansionCoordinateResult.projection,
        fourSymbolLifeDirectionProjection:
          fourSymbolLifeDirectionResult.projection,
        lifeArchetypeProjection: lifeArchetypeResult.projection,
        starBeastManifestationSource:
          starBeastManifestationSourceResult.source,
        timeSequenceRecognitionProjection: timeSequenceResult.projection,
        birthMansionIgnitionProjection: birthMansionResult.projection,
        morphologicalFieldAlignmentProjection: fourSymbolResult.projection,
        lifeForceInfusionProjection: lifeForceResult.projection,
        personalRevealProjection: personalRevealResult.projection,
        realityPressureProjection:
          realityPressureResult?.status === "AVAILABLE"
            ? realityPressureResult.projection
            : null,
      }),
    }),
    boundary: REAL_LIFE_VISUAL_SOURCE_ADAPTER_BOUNDARY,
  });
}

export const RealLifeVisualSourceAdapter = Object.freeze({
  adapt: adaptRealLifeVisualSource,
  boundary: REAL_LIFE_VISUAL_SOURCE_ADAPTER_BOUNDARY,
});
