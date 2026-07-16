import type {
  GenesisFourSymbolAlignmentBlockedReason,
  GenesisFourSymbolAlignmentInput,
  GenesisFourSymbolAlignmentProjection,
  GenesisFourSymbolAlignmentProjectionResult,
  GenesisFourSymbolAlignmentUnavailableReason,
  GenesisFourSymbolFieldMode,
} from "../types/genesisFourSymbolAlignmentProjection";

const PROJECTION_BOUNDARY = Object.freeze({
  projectionOnly: true,
  referenceOnly: true,
  morphologicalFieldOnly: true,
  noAnimalModelGeneration: true,
  noMotherCodeCalculation: true,
  noPersonalStarBeastGeneration: true,
  noRendererInvocation: true,
  noUIIntegration: true,
  noRuntimeIntegration: true,
  noStorageWrite: true,
});

const unavailable = (
  input: GenesisFourSymbolAlignmentInput,
  reason: GenesisFourSymbolAlignmentUnavailableReason,
): GenesisFourSymbolAlignmentProjectionResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    reason,
    projection: null,
    input,
    boundary: PROJECTION_BOUNDARY,
  });

const blocked = (
  input: GenesisFourSymbolAlignmentInput,
  reason: GenesisFourSymbolAlignmentBlockedReason,
): GenesisFourSymbolAlignmentProjectionResult =>
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

type FieldProfile = Readonly<{
  fieldMode: GenesisFourSymbolFieldMode;
  spatialBias: number;
  directionalFlow: number;
  boundaryBehavior: number;
  postureBias: number;
  envelopeScale: number;
}>;

const FIELD_PROFILE_BY_DIRECTION: Readonly<
  Record<"东" | "南" | "西" | "北", FieldProfile>
> = Object.freeze({
  东: Object.freeze({
    fieldMode: "EXTENDING_ARC",
    spatialBias: 0.88,
    directionalFlow: 0.18 * Math.PI,
    boundaryBehavior: 0.34,
    postureBias: 0.5,
    envelopeScale: 1.14,
  }),
  南: Object.freeze({
    fieldMode: "RISING_FLOW",
    spatialBias: 0.62,
    directionalFlow: 0.62 * Math.PI,
    boundaryBehavior: 0.28,
    postureBias: 0.84,
    envelopeScale: 1.05,
  }),
  西: Object.freeze({
    fieldMode: "CONVERGING_BOUNDARY",
    spatialBias: 0.28,
    directionalFlow: Math.PI,
    boundaryBehavior: 0.82,
    postureBias: -0.34,
    envelopeScale: 0.86,
  }),
  北: Object.freeze({
    fieldMode: "ENCLOSING_DEPTH",
    spatialBias: -0.22,
    directionalFlow: -0.5 * Math.PI,
    boundaryBehavior: 0.94,
    postureBias: -0.72,
    envelopeScale: 0.9,
  }),
});

export function projectGenesisFourSymbolAlignment(
  input: GenesisFourSymbolAlignmentInput,
): GenesisFourSymbolAlignmentProjectionResult {
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
    return blocked(input, "BIRTH_MANSION_IGNITION_REFERENCE_INVALID");
  }
  if (ignition.ignitionStage !== "SEED_CLAIMED") {
    return unavailable(input, "BIRTH_MANSION_SEED_NOT_CLAIMED");
  }

  const symbolResult = input.fourSymbolResultReference;
  if (symbolResult === null) {
    return unavailable(input, "FOUR_SYMBOL_RESULT_REFERENCE_REQUIRED");
  }
  if (
    symbolResult.referenceType !==
      "STAR_BEAST_GENESIS_FOUR_SYMBOL_ENGINE_RESULT" ||
    symbolResult.sourceEngine !== "guanyao_starbeast_engine" ||
    symbolResult.resultReference.status !== "READY"
  ) {
    return blocked(input, "FOUR_SYMBOL_RESULT_REFERENCE_INVALID");
  }

  const direction = symbolResult.resultReference.direction;
  const fieldProfile = FIELD_PROFILE_BY_DIRECTION[direction];
  if (fieldProfile === undefined) {
    return blocked(input, "FOUR_SYMBOL_RESULT_REFERENCE_INVALID");
  }

  const referenceUnitValue = referenceUnit(symbolResult.resultReference.mansion);
  const claimStrength = ignition.seedClaimExpression.claimStrength;
  const fieldVisibility = 0.28 + claimStrength * 0.42;
  const alignmentNoise = (referenceUnitValue - 0.5) * 0.08;
  const projection: GenesisFourSymbolAlignmentProjection = Object.freeze({
    semanticRole: "GENESIS_FOUR_SYMBOL_ALIGNMENT_PROJECTION",
    birthMansionIgnitionReferenceId: ignition.mansionSeedReferenceId,
    sourceResultReferenceId: symbolResult.referenceType,
    morphologicalFieldExpression: Object.freeze({
      fieldMode: fieldProfile.fieldMode,
      spatialBias: fieldProfile.spatialBias + alignmentNoise,
      directionalFlow: fieldProfile.directionalFlow + alignmentNoise,
      boundaryBehavior: fieldProfile.boundaryBehavior,
      postureBias: fieldProfile.postureBias + alignmentNoise,
      envelopeScale: fieldProfile.envelopeScale + alignmentNoise * 0.18,
      noAnimalGeometry: true,
    }),
    cosmicRecognitionExpression: Object.freeze({
      fieldVisibility,
      seedToFieldContinuity: 0.44 + claimStrength * 0.36,
      backgroundRelationship: 0.24 + fieldProfile.boundaryBehavior * 0.34,
      universeAttention: 0.32 + claimStrength * 0.42,
    }),
    alignmentStage: "FIELD_ALIGNED",
    temporalRhythm: Object.freeze({
      periodSeconds: 9.4 + fieldProfile.boundaryBehavior * 1.8,
      phaseOffset: ignition.temporalRhythm.phaseOffset + alignmentNoise,
      breathingAmplitude: 0.012 + fieldVisibility * 0.024,
      noCountdown: true,
    }),
    presenceIntensity: 0.18 + fieldVisibility * 0.48,
    sourceRole: "FORMAL_FOUR_SYMBOL_RESULT_REFERENCE_ONLY",
    referenceOnly: true,
    identityBlind: true,
    noAnimalIdentity: true,
    noAnimalGeometry: true,
    noMotherCodeExpression: true,
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
