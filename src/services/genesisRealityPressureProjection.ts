import type {
  GenesisRealityPressureBlockedReason,
  GenesisRealityPressureInput,
  GenesisRealityPressureProjection,
  GenesisRealityPressureProjectionResult,
  GenesisRealityPressureUnavailableReason,
} from "../types/genesisRealityPressureProjection";

const PROJECTION_BOUNDARY = Object.freeze({
  projectionOnly: true,
  referenceOnly: true,
  noIdentityCalculation: true,
  noFourSymbolMutation: true,
  noMotherCodeCalculation: true,
  noGravityInvocation: true,
  noChoiceCalculation: true,
  noCrystalGeneration: true,
  noRendererInvocation: true,
  noUIIntegration: true,
  noRuntimeIntegration: true,
  noStorageWrite: true,
});

const unavailable = (
  input: GenesisRealityPressureInput,
  reason: GenesisRealityPressureUnavailableReason,
): GenesisRealityPressureProjectionResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    reason,
    projection: null,
    input,
    boundary: PROJECTION_BOUNDARY,
  });

const blocked = (
  input: GenesisRealityPressureInput,
  reason: GenesisRealityPressureBlockedReason,
): GenesisRealityPressureProjectionResult =>
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

export function projectGenesisRealityPressure(
  input: GenesisRealityPressureInput,
): GenesisRealityPressureProjectionResult {
  const personalReveal = input.personalRevealProjection;
  if (personalReveal === null) {
    return unavailable(input, "PERSONAL_REVEAL_REQUIRED");
  }
  if (
    personalReveal.semanticRole !==
      "GENESIS_PERSONAL_STAR_BEAST_REVEAL_PROJECTION" ||
    personalReveal.revealStage !== "PERSONAL_STAR_BEAST_REVEALED" ||
    personalReveal.identityBlind !== true ||
    personalReveal.noIdentityFactCopy !== true ||
    personalReveal.noAnimalIdentity !== true ||
    personalReveal.noAnimalGeometry !== true ||
    personalReveal.noLifeStateMutation !== true
  ) {
    return blocked(input, "PERSONAL_REVEAL_REFERENCE_INVALID");
  }

  const pressure = input.realityPressureReference;
  if (pressure === null) {
    return unavailable(input, "REALITY_PRESSURE_REFERENCE_REQUIRED");
  }
  if (
    pressure.referenceType !== "GENESIS_REALITY_PRESSURE_REFERENCE" ||
    pressure.referenceId.trim().length === 0 ||
    pressure.sourceRole !== "REALITY_PRESSURE_ENGINE_REFERENCE" ||
    pressure.pressureReferenceOnly !== true ||
    pressure.noRawPressureCopy !== true
  ) {
    return blocked(input, "REALITY_PRESSURE_REFERENCE_INVALID");
  }

  const sourceUnit = referenceUnit(
    `${pressure.referenceId}:${personalReveal.identityReferenceId}`,
  );
  const revealUnit = personalReveal.revealExpression.revealOpacity;
  const fieldCompression = 0.18 + sourceUnit * 0.22 + revealUnit * 0.2;
  const boundaryLoad = 0.24 + sourceUnit * 0.38;
  const coreResistance = 0.32 + personalReveal.revealExpression.coreConvergence * 0.42;
  const flowDeflection = (sourceUnit - 0.5) * 0.58;
  const temporalWeight = 0.2 + (1 - sourceUnit) * 0.32;

  const projection: GenesisRealityPressureProjection = Object.freeze({
    semanticRole: "GENESIS_REALITY_PRESSURE_PROJECTION",
    personalRevealReferenceId: personalReveal.identityReferenceId,
    pressureReferenceId: pressure.referenceId,
    pressureExpression: Object.freeze({
      fieldCompression,
      boundaryLoad,
      coreResistance,
      flowDeflection,
      temporalWeight,
      noIdentityExpression: true,
      noAnimalGeometry: true,
    }),
    presenceResponse: Object.freeze({
      pressureAttention: 0.32 + sourceUnit * 0.26,
      structureResponse: 0.26 + fieldCompression * 0.62,
      coreResponse: 0.28 + coreResistance * 0.58,
      quietPersistence: 0.54 + (1 - boundaryLoad) * 0.24,
    }),
    pressureStage: "PRESSURE_PRESENT",
    sourceRole: "FORMAL_REALITY_PRESSURE_REFERENCE_ONLY",
    referenceOnly: true,
    identityBlind: true,
    noIdentityFactCopy: true,
    noFourSymbolMutation: true,
    noMotherCodeCalculation: true,
    noGravityInvocation: true,
    noChoiceCalculation: true,
    noCrystalGeneration: true,
    noAnimalIdentity: true,
    noAnimalGeometry: true,
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
