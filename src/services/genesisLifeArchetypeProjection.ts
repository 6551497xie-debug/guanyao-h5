import type {
  LifeArchetypeCode,
  LifeArchetypeProfile,
} from "../types/originalSelfLifeSchema";
import type {
  GenesisLifeArchetypeDirection,
  GenesisLifeArchetypeName,
  GenesisLifeArchetypeProjection,
  GenesisLifeArchetypeProjectionBlockedReason,
  GenesisLifeArchetypeProjectionBoundary,
  GenesisLifeArchetypeProjectionInput,
  GenesisLifeArchetypeProjectionResult,
} from "../types/genesisLifeArchetypeProjection";

const PROJECTION_BOUNDARY: GenesisLifeArchetypeProjectionBoundary =
  Object.freeze({
    projectionOnly: true,
    existingLifeArchetypeProfileOnly: true,
    existingMotherCodeProfileOnly: true,
    existingFourSymbolDirectionProjectionOnly: true,
    noLifeArchetypeCalculation: true,
    noMotherCodeCalculation: true,
    noFourSymbolCalculation: true,
    noStarBeastGeneration: true,
    noRendererInvocation: true,
    noRendererInputMutation: true,
    noTimelineMutation: true,
    noVisualCalibrationMutation: true,
    noUIIntegration: true,
    noRuntimeIntegration: true,
    noStorageWrite: true,
    noFallback: true,
  });

const blocked = (
  input: GenesisLifeArchetypeProjectionInput,
  reason: GenesisLifeArchetypeProjectionBlockedReason,
): GenesisLifeArchetypeProjectionResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    reason,
    projection: null,
    input,
    boundary: PROJECTION_BOUNDARY,
  });

type ArchetypeMeaning = Readonly<{
  archetypeName: GenesisLifeArchetypeName;
  archetypeDirection: GenesisLifeArchetypeDirection;
}>;

const ARCHETYPE_MEANING_BY_CODE: Readonly<
  Record<LifeArchetypeCode, ArchetypeMeaning>
> = Object.freeze({
  QIAN: Object.freeze({ archetypeName: "创世者", archetypeDirection: "创造" }),
  KUN: Object.freeze({ archetypeName: "承载者", archetypeDirection: "承载" }),
  ZHEN: Object.freeze({ archetypeName: "行动者", archetypeDirection: "启动" }),
  XUN: Object.freeze({ archetypeName: "渗透者", archetypeDirection: "融入" }),
  KAN: Object.freeze({ archetypeName: "深潜者", archetypeDirection: "穿越" }),
  LI: Object.freeze({ archetypeName: "照见者", archetypeDirection: "显明" }),
  GEN: Object.freeze({ archetypeName: "守望者", archetypeDirection: "守护" }),
  DUI: Object.freeze({ archetypeName: "连接者", archetypeDirection: "连接" }),
});

const isLifeArchetypeProfile = (
  profile: LifeArchetypeProfile,
): profile is LifeArchetypeProfile =>
  profile.source === "mother_code_profile" &&
  profile.semanticRole === "ORIGINAL_LIFE_FORCE" &&
  profile.nonFinalIdentity === true &&
  profile.notHexagram === true &&
  profile.notPersonalityLabel === true;

export function projectGenesisLifeArchetype(
  input: GenesisLifeArchetypeProjectionInput,
): GenesisLifeArchetypeProjectionResult {
  const sourceReferenceId = input.sourceReferenceId.trim();
  if (!sourceReferenceId) {
    return blocked(input, "SOURCE_REFERENCE_ID_REQUIRED");
  }

  const directionProjection = input.fourSymbolDirectionProjection;
  if (directionProjection === null) {
    return blocked(input, "FOUR_SYMBOL_DIRECTION_PROJECTION_REQUIRED");
  }
  if (
    directionProjection.semanticRole !==
      "GENESIS_FOUR_SYMBOL_LIFE_DIRECTION_PROJECTION" ||
    directionProjection.sourceReferenceId !== sourceReferenceId ||
    directionProjection.provenance.sourceReferenceId !== sourceReferenceId ||
    directionProjection.noFallback !== true
  ) {
    return blocked(input, "FOUR_SYMBOL_DIRECTION_PROJECTION_INVALID");
  }

  const motherCode = input.motherCodeProfileReference;
  if (motherCode === null) {
    return blocked(input, "MOTHER_CODE_PROFILE_REFERENCE_REQUIRED");
  }
  if (
    motherCode.referenceType !== "STAR_BEAST_GENESIS_MOTHER_CODE_PROFILE" ||
    motherCode.sourceEngine !== "guanyao_lunar_mother_code_landing" ||
    motherCode.profileReference !== motherCode.landingResultReference.motherCodeProfile
  ) {
    return blocked(input, "MOTHER_CODE_PROFILE_REFERENCE_INVALID");
  }

  const lifeArchetype = input.lifeArchetypeProfileReference;
  if (lifeArchetype === null) {
    return blocked(input, "LIFE_ARCHETYPE_PROFILE_REFERENCE_REQUIRED");
  }
  if (!isLifeArchetypeProfile(lifeArchetype)) {
    return blocked(input, "LIFE_ARCHETYPE_PROFILE_REFERENCE_INVALID");
  }
  if (lifeArchetype.sourceMotherCodeId !== motherCode.profileReference.motherCodeId) {
    return blocked(input, "MOTHER_CODE_LIFE_ARCHETYPE_SOURCE_MISMATCH");
  }

  const readinessReference = input.manifestationReadinessReference;
  if (readinessReference === null) {
    return blocked(input, "MANIFESTATION_READINESS_REFERENCE_REQUIRED");
  }
  if (
    readinessReference.referenceType !==
      "PERSONAL_STAR_BEAST_MANIFESTATION_READINESS" ||
    readinessReference.referenceId.trim().length === 0 ||
    readinessReference.readiness !==
      "READY_FOR_PERSONAL_STAR_BEAST_MANIFESTATION_DESIGN"
  ) {
    return blocked(input, "MANIFESTATION_READINESS_REFERENCE_INVALID");
  }

  const meaning = ARCHETYPE_MEANING_BY_CODE[lifeArchetype.code];
  if (meaning === undefined) {
    return blocked(input, "LIFE_ARCHETYPE_MAPPING_INVALID");
  }

  const projection: GenesisLifeArchetypeProjection = Object.freeze({
    semanticRole: "GENESIS_LIFE_ARCHETYPE_PROJECTION",
    sourceReferenceId,
    fourSymbolDirectionReference: directionProjection,
    lifeArchetype: lifeArchetype.code,
    archetypeName: meaning.archetypeName,
    archetypeDirection: meaning.archetypeDirection,
    originalForce: lifeArchetype.originalForce,
    lifeIntention: lifeArchetype.lifeIntention,
    shadowPattern: lifeArchetype.shadowPattern,
    awakeningDirection: lifeArchetype.awakeningDirection,
    starBeastManifestationReadiness:
      "READY_FOR_PERSONAL_STAR_BEAST_MANIFESTATION_DESIGN",
    starBeastManifestationReadinessReference: readinessReference,
    provenance: Object.freeze({
      sourceReferenceId,
      fourSymbolDirectionSourceReferenceId:
        directionProjection.sourceReferenceId,
      motherCodeProfileReferenceType: motherCode.referenceType,
      motherCodeProfileReferenceId: motherCode.profileReference.motherCodeId,
      motherCodeSourceEngine: motherCode.sourceEngine,
      lifeArchetypeSource: lifeArchetype.source,
      lifeArchetypeCode: lifeArchetype.code,
      lifeArchetypeSourceMotherCodeId: lifeArchetype.sourceMotherCodeId,
    }),
    sourceLifeArchetypeProfileReference: lifeArchetype,
    sourceMotherCodeProfileReference: motherCode.profileReference,
    existingLifeArchetypeProfileOnly: true,
    existingMotherCodeProfileOnly: true,
    existingFourSymbolDirectionProjectionOnly: true,
    noLifeArchetypeCalculation: true,
    noMotherCodeCalculation: true,
    noFourSymbolCalculation: true,
    noStarBeastGeneration: true,
    noRendererParameters: true,
    noTimelineMutation: true,
    noVisualCalibrationMutation: true,
    noFallback: true,
  });

  return Object.freeze({
    status: "AVAILABLE" as const,
    projection,
    input,
    boundary: PROJECTION_BOUNDARY,
  });
}
