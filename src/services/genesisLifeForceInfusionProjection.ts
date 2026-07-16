import type {
  GenesisLifeForceInfusionBlockedReason,
  GenesisLifeForceInfusionInput,
  GenesisLifeForceInfusionProjection,
  GenesisLifeForceInfusionProjectionResult,
  GenesisLifeForceInfusionUnavailableReason,
  GenesisLifeForceExpressionMode,
} from "../types/genesisLifeForceInfusionProjection";

const PROJECTION_BOUNDARY = Object.freeze({
  projectionOnly: true,
  referenceOnly: true,
  lifeForceExpressionOnly: true,
  noMotherCodeCalculation: true,
  noFourSymbolMutation: true,
  noPersonalStarBeastGeneration: true,
  noRendererInvocation: true,
  noUIIntegration: true,
  noRuntimeIntegration: true,
  noStorageWrite: true,
});

const unavailable = (
  input: GenesisLifeForceInfusionInput,
  reason: GenesisLifeForceInfusionUnavailableReason,
): GenesisLifeForceInfusionProjectionResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    reason,
    projection: null,
    input,
    boundary: PROJECTION_BOUNDARY,
  });

const blocked = (
  input: GenesisLifeForceInfusionInput,
  reason: GenesisLifeForceInfusionBlockedReason,
): GenesisLifeForceInfusionProjectionResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    reason,
    projection: null,
    input,
    boundary: PROJECTION_BOUNDARY,
  });

const hashReference = (referenceId: string): number => {
  let hash = 2166136261;
  for (let index = 0; index < referenceId.length; index += 1) {
    hash ^= referenceId.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

const referenceUnit = (referenceId: string): number =>
  hashReference(referenceId) / 0xffffffff;

const EXPRESSION_MODE_BY_CODE: Readonly<
  Record<
    "QIAN" | "KUN" | "ZHEN" | "XUN" | "KAN" | "LI" | "GEN" | "DUI",
    GenesisLifeForceExpressionMode
  >
> = Object.freeze({
  QIAN: "DIRECTED_CORE",
  KUN: "DEEP_SUPPORT",
  ZHEN: "SPARK_RISE",
  XUN: "DIFFUSE_FLOW",
  KAN: "DEEP_RESERVE",
  LI: "RADIANT_PRESENCE",
  GEN: "STILL_CORE",
  DUI: "OPEN_EXCHANGE",
});

export function projectGenesisLifeForceInfusion(
  input: GenesisLifeForceInfusionInput,
): GenesisLifeForceInfusionProjectionResult {
  const field = input.morphologicalFieldAlignmentProjection;
  if (field === null) {
    return unavailable(input, "MORPHOLOGICAL_FIELD_ALIGNMENT_REQUIRED");
  }
  if (
    field.semanticRole !== "GENESIS_FOUR_SYMBOL_ALIGNMENT_PROJECTION" ||
    field.identityBlind !== true ||
    field.noAnimalGeometry !== true ||
    field.noMotherCodeExpression !== true ||
    field.noPersonalStarBeastReveal !== true ||
    field.alignmentStage !== "FIELD_ALIGNED"
  ) {
    if (field.alignmentStage !== "FIELD_ALIGNED") {
      return unavailable(input, "MORPHOLOGICAL_FIELD_NOT_ALIGNED");
    }
    return blocked(input, "MORPHOLOGICAL_FIELD_REFERENCE_INVALID");
  }

  const motherCode = input.motherCodeProfileReference;
  if (motherCode === null) {
    return unavailable(input, "MOTHER_CODE_PROFILE_REFERENCE_REQUIRED");
  }
  if (
    motherCode.referenceType !== "STAR_BEAST_GENESIS_MOTHER_CODE_PROFILE" ||
    motherCode.sourceEngine !== "guanyao_lunar_mother_code_landing" ||
    motherCode.landingResultReference.status !== "READY" ||
    motherCode.profileReference.motherCodeId.trim().length === 0 ||
    motherCode.landingResultReference.motherCodeProfile.motherCodeId !==
      motherCode.profileReference.motherCodeId
  ) {
    return blocked(input, "MOTHER_CODE_PROFILE_REFERENCE_INVALID");
  }

  const lifeArchetype = input.lifeArchetypeProfileReference;
  if (lifeArchetype === null) {
    return unavailable(input, "LIFE_ARCHETYPE_PROFILE_REFERENCE_REQUIRED");
  }
  if (
    lifeArchetype.source !== "mother_code_profile" ||
    lifeArchetype.semanticRole !== "ORIGINAL_LIFE_FORCE" ||
    lifeArchetype.nonFinalIdentity !== true ||
    lifeArchetype.notHexagram !== true ||
    lifeArchetype.notPersonalityLabel !== true
  ) {
    return blocked(input, "LIFE_ARCHETYPE_PROFILE_REFERENCE_INVALID");
  }
  if (
    lifeArchetype.sourceMotherCodeId !== motherCode.profileReference.motherCodeId
  ) {
    return blocked(input, "LIFE_ARCHETYPE_SOURCE_MISMATCH");
  }

  const referenceSeed = `${motherCode.profileReference.motherCodeId}:${field.sourceResultReferenceId}`;
  const sourceUnit = referenceUnit(referenceSeed);
  const codeUnit = referenceUnit(lifeArchetype.code);
  const stability = 0.48 + sourceUnit * 0.34;
  const fieldVisibility = field.cosmicRecognitionExpression.fieldVisibility;
  const continuity = 0.48 + fieldVisibility * 0.34;
  const projection: GenesisLifeForceInfusionProjection = Object.freeze({
    semanticRole: "GENESIS_LIFE_FORCE_INFUSION_PROJECTION",
    morphologicalFieldAlignmentReferenceId: field.sourceResultReferenceId,
    motherCodeProfileReferenceId: motherCode.referenceType,
    lifeArchetypeProfileReferenceId: lifeArchetype.source,
    lifeForceExpression: Object.freeze({
      mode: EXPRESSION_MODE_BY_CODE[lifeArchetype.code],
      corePull: 0.42 + codeUnit * 0.38,
      energyRhythm: 0.18 + sourceUnit * 0.26,
      aggregationStrength: 0.42 + stability * 0.42,
      stability,
      directionalBias: (sourceUnit - 0.5) * 0.54,
      noAnimalGeometry: true,
    }),
    cosmicRecognitionExpression: Object.freeze({
      forceVisibility: 0.22 + fieldVisibility * 0.48,
      fieldToForceContinuity: continuity,
      coreAttention: 0.28 + stability * 0.42,
    }),
    infusionStage: "FORCE_INFUSED",
    temporalRhythm: Object.freeze({
      periodSeconds: 10.2 + stability * 2.8,
      phaseOffset:
        field.temporalRhythm.phaseOffset + sourceUnit * 0.42,
      breathingAmplitude: 0.012 + stability * 0.024,
      noCountdown: true,
    }),
    presenceIntensity: 0.2 + continuity * 0.46,
    sourceRole: "FORMAL_MOTHER_CODE_AND_LIFE_ARCHETYPE_REFERENCE_ONLY",
    referenceOnly: true,
    identityBlind: true,
    noFourSymbolMutation: true,
    noAnimalIdentity: true,
    noAnimalGeometry: true,
    noPersonalStarBeastReveal: true,
    noLifeFactCopy: true,
    noRendererInvocation: true,
    noLifeStateMutation: true,
    noRuntimeIntegration: true,
  });

  return Object.freeze({
    status: "AVAILABLE" as const,
    projection,
    input,
    boundary: PROJECTION_BOUNDARY,
  });
}
