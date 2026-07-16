import type {
  GenesisPersonalRevealBlockedReason,
  GenesisPersonalRevealInput,
  GenesisPersonalRevealProjection,
  GenesisPersonalRevealProjectionResult,
  GenesisPersonalRevealUnavailableReason,
} from "../types/genesisPersonalRevealProjection";

const PROJECTION_BOUNDARY = Object.freeze({
  projectionOnly: true,
  referenceOnly: true,
  threeSourceConvergenceOnly: true,
  noIdentityFactCopy: true,
  noAnimalModelGeneration: true,
  noAssetGeneration: true,
  noMotherCodeCalculation: true,
  noFourSymbolMutation: true,
  noRendererInvocation: true,
  noUIIntegration: true,
  noRuntimeIntegration: true,
  noStorageWrite: true,
});

const unavailable = (
  input: GenesisPersonalRevealInput,
  reason: GenesisPersonalRevealUnavailableReason,
): GenesisPersonalRevealProjectionResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    reason,
    projection: null,
    input,
    boundary: PROJECTION_BOUNDARY,
  });

const blocked = (
  input: GenesisPersonalRevealInput,
  reason: GenesisPersonalRevealBlockedReason,
): GenesisPersonalRevealProjectionResult =>
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

export function projectGenesisPersonalReveal(
  input: GenesisPersonalRevealInput,
): GenesisPersonalRevealProjectionResult {
  const ignition = input.birthMansionIgnitionProjection;
  if (ignition === null) {
    return unavailable(input, "BIRTH_MANSION_IGNITION_REQUIRED");
  }
  if (
    ignition.semanticRole !== "GENESIS_BIRTH_MANSION_IGNITION_PROJECTION" ||
    ignition.identityBlind !== true ||
    ignition.noMansionFactCopy !== true ||
    ignition.noFourSymbolReveal !== true ||
    ignition.noMotherCodeExpression !== true ||
    ignition.noPersonalStarBeastReveal !== true
  ) {
    return blocked(input, "BIRTH_MANSION_REFERENCE_INVALID");
  }
  if (ignition.ignitionStage !== "SEED_CLAIMED") {
    return unavailable(input, "BIRTH_MANSION_IGNITION_REQUIRED");
  }

  const field = input.morphologicalFieldAlignmentProjection;
  if (field === null) {
    return unavailable(input, "MORPHOLOGICAL_FIELD_ALIGNMENT_REQUIRED");
  }
  if (
    field.semanticRole !== "GENESIS_FOUR_SYMBOL_ALIGNMENT_PROJECTION" ||
    field.identityBlind !== true ||
    field.noAnimalGeometry !== true ||
    field.noMotherCodeExpression !== true ||
    field.noPersonalStarBeastReveal !== true
  ) {
    return blocked(input, "MORPHOLOGICAL_FIELD_REFERENCE_INVALID");
  }
  if (field.alignmentStage !== "FIELD_ALIGNED") {
    return unavailable(input, "MORPHOLOGICAL_FIELD_ALIGNMENT_REQUIRED");
  }

  const lifeForce = input.lifeForceInfusionProjection;
  if (lifeForce === null) {
    return unavailable(input, "LIFE_FORCE_INFUSION_REQUIRED");
  }
  if (
    lifeForce.semanticRole !== "GENESIS_LIFE_FORCE_INFUSION_PROJECTION" ||
    lifeForce.identityBlind !== true ||
    lifeForce.noFourSymbolMutation !== true ||
    lifeForce.noAnimalGeometry !== true ||
    lifeForce.noPersonalStarBeastReveal !== true
  ) {
    return blocked(input, "LIFE_FORCE_REFERENCE_INVALID");
  }
  if (lifeForce.infusionStage !== "FORCE_INFUSED") {
    return unavailable(input, "LIFE_FORCE_NOT_INFUSED");
  }

  const identity = input.personalStarBeastIdentityReference;
  if (identity === null) {
    return unavailable(input, "PERSONAL_IDENTITY_REFERENCE_REQUIRED");
  }
  if (
    identity.referenceType !== "PERSONAL_STAR_BEAST_IDENTITY_SOURCE" ||
    identity.referenceId.trim().length === 0 ||
    identity.semanticRole !== "MANSION_SEED_FIELD_FORCE_CONVERGENCE" ||
    identity.notFourSymbolAnimal !== true ||
    identity.notGeneratedAsset !== true ||
    identity.notLifeState !== true
  ) {
    return blocked(input, "PERSONAL_IDENTITY_REFERENCE_INVALID");
  }

  const referenceSeed = `${identity.referenceId}:${field.sourceResultReferenceId}:${lifeForce.motherCodeProfileReferenceId}`;
  const sourceUnit = referenceUnit(referenceSeed);
  const fieldIntegration =
    0.48 +
    field.cosmicRecognitionExpression.fieldVisibility * 0.22 +
    field.morphologicalFieldExpression.boundaryBehavior * 0.16;
  const forceIntegration =
    0.46 +
    lifeForce.cosmicRecognitionExpression.forceVisibility * 0.2 +
    lifeForce.lifeForceExpression.stability * 0.2;
  const seedContinuity = 0.52 + ignition.seedClaimExpression.claimStrength * 0.26;
  const coreConvergence =
    0.42 +
    fieldIntegration * 0.18 +
    forceIntegration * 0.24;
  const revealOpacity = 0.34 + coreConvergence * 0.42;
  const projection: GenesisPersonalRevealProjection = Object.freeze({
    semanticRole: "GENESIS_PERSONAL_STAR_BEAST_REVEAL_PROJECTION",
    birthMansionSeedReferenceId: ignition.mansionSeedReferenceId,
    morphologicalFieldReferenceId: field.sourceResultReferenceId,
    lifeForceReferenceId: lifeForce.motherCodeProfileReferenceId,
    identityReferenceId: identity.referenceId,
    revealExpression: Object.freeze({
      presenceMode:
        revealOpacity >= 0.64
          ? "PERSONAL_PRESENCE"
          : revealOpacity >= 0.5
            ? "FIELD_FORCE_COHERENCE"
            : "SEED_CONTINUITY",
      seedContinuity,
      fieldIntegration,
      forceIntegration,
      coreConvergence,
      boundaryContinuity: 0.42 + field.morphologicalFieldExpression.boundaryBehavior * 0.38,
      revealOpacity,
      noAnimalIdentity: true,
      noAnimalGeometry: true,
    }),
    cosmicRecognitionExpression: Object.freeze({
      personalAttention: 0.36 + sourceUnit * 0.18 + coreConvergence * 0.3,
      sourceConvergence: 0.42 + (seedContinuity + fieldIntegration + forceIntegration) * 0.18,
      quietReveal: 0.56 + (1 - sourceUnit) * 0.18,
    }),
    revealStage: "PERSONAL_STAR_BEAST_REVEALED",
    temporalRhythm: Object.freeze({
      periodSeconds: 11.2 + lifeForce.lifeForceExpression.stability * 2.4,
      phaseOffset:
        ignition.temporalRhythm.phaseOffset +
        field.temporalRhythm.phaseOffset * 0.2 +
        sourceUnit * 0.26,
      breathingAmplitude: 0.012 + coreConvergence * 0.022,
      noCountdown: true,
    }),
    presenceIntensity: 0.26 + revealOpacity * 0.48,
    sourceRole: "FORMAL_THREE_SOURCE_PERSONAL_IDENTITY_REFERENCE_ONLY",
    referenceOnly: true,
    identityBlind: true,
    noIdentityFactCopy: true,
    noFourSymbolMutation: true,
    noMotherCodeCalculation: true,
    noAnimalIdentity: true,
    noAnimalGeometry: true,
    noAssetGeneration: true,
    noLifeStateMutation: true,
    noRendererInvocation: true,
    noRuntimeIntegration: true,
  });

  return Object.freeze({
    status: "AVAILABLE" as const,
    projection,
    input,
    boundary: PROJECTION_BOUNDARY,
  });
}
