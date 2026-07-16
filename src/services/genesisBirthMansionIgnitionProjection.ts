import type {
  GenesisBirthMansionIgnitionBlockedReason,
  GenesisBirthMansionIgnitionInput,
  GenesisBirthMansionIgnitionProjection,
  GenesisBirthMansionIgnitionProjectionResult,
  GenesisBirthMansionIgnitionUnavailableReason,
} from "../types/genesisBirthMansionIgnitionProjection";

const PROJECTION_BOUNDARY = Object.freeze({
  projectionOnly: true,
  referenceOnly: true,
  noMansionCalculation: true,
  noFourSymbolCalculation: true,
  noMotherCodeCalculation: true,
  noPersonalStarBeastGeneration: true,
  noRendererInvocation: true,
  noUIIntegration: true,
  noRuntimeIntegration: true,
  noStorageWrite: true,
});

const unavailable = (
  input: GenesisBirthMansionIgnitionInput,
  reason: GenesisBirthMansionIgnitionUnavailableReason,
): GenesisBirthMansionIgnitionProjectionResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    reason,
    projection: null,
    input,
    boundary: PROJECTION_BOUNDARY,
  });

const blocked = (
  input: GenesisBirthMansionIgnitionInput,
  reason: GenesisBirthMansionIgnitionBlockedReason,
): GenesisBirthMansionIgnitionProjectionResult =>
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

export function projectGenesisBirthMansionIgnition(
  input: GenesisBirthMansionIgnitionInput,
): GenesisBirthMansionIgnitionProjectionResult {
  const timeProjection = input.timeSequenceRecognitionProjection;
  if (timeProjection === null) {
    return unavailable(input, "TIME_SEQUENCE_RECOGNITION_REQUIRED");
  }
  if (
    timeProjection.semanticRole !==
      "GENESIS_TIME_SEQUENCE_RECOGNITION_PROJECTION" ||
    timeProjection.identityBlind !== true ||
    timeProjection.noLifeFactCopy !== true ||
    timeProjection.noMansionReveal !== true ||
    timeProjection.noFourSymbolReveal !== true ||
    timeProjection.noMotherCodeExpression !== true ||
    timeProjection.noPersonalStarBeastReveal !== true
  ) {
    return blocked(input, "TIME_SEQUENCE_REFERENCE_INVALID");
  }
  if (timeProjection.recognitionStage === "WAITING") {
    return unavailable(input, "TIME_SEQUENCE_NOT_RECOGNIZED");
  }

  const mansion = input.mansionResultReference;
  if (mansion === null) {
    return unavailable(input, "MANSION_RESULT_REFERENCE_REQUIRED");
  }
  if (
    mansion.referenceType !== "STAR_BEAST_GENESIS_MANSION" ||
    mansion.referenceId.trim().length === 0
  ) {
    return blocked(input, "MANSION_RESULT_REFERENCE_INVALID");
  }
  if (mansion.sourceStarbeastDerivationReference.status !== "READY") {
    return blocked(input, "MANSION_RESULT_NOT_READY");
  }

  const mansionUnit = referenceUnit(mansion.referenceId);
  const alignment = timeProjection.timeAlignmentExpression.alignmentStrength;
  const response = timeProjection.cosmicResponseExpression.responseStrength;
  const claimStrength = 0.34 + alignment * 0.28 + response * 0.24 + mansionUnit * 0.1;
  const seedVisibility = 0.18 + claimStrength * 0.42;
  const ignitionStage =
    timeProjection.recognitionStage === "RECOGNIZED"
      ? "SEED_CLAIMED"
      : "SEED_APPROACHING";

  const projection: GenesisBirthMansionIgnitionProjection = Object.freeze({
    semanticRole: "GENESIS_BIRTH_MANSION_IGNITION_PROJECTION",
    timeSequenceRecognitionReferenceId:
      timeProjection.timeSequenceReferenceId,
    mansionSeedReferenceId: mansion.referenceId,
    seedClaimExpression: Object.freeze({
      claimStrength,
      anchorPresence: 0.32 + response * 0.44,
      localAttention: 0.24 + alignment * 0.48,
      seedVisibility,
    }),
    cosmicRecognitionExpression: Object.freeze({
      fieldConvergence: 0.2 + claimStrength * 0.48,
      quietingRadius: 0.54 + claimStrength * 0.4,
      responseDirection:
        timeProjection.cosmicResponseExpression.directionalDrift,
      backgroundAttenuation: 0.08 + claimStrength * 0.16,
    }),
    ignitionStage,
    temporalRhythm: Object.freeze({
      periodSeconds: 8.4 + alignment * 2.4,
      phaseOffset:
        timeProjection.temporalRhythm.phaseOffset + mansionUnit * 0.34,
      breathingAmplitude: 0.014 + claimStrength * 0.024,
      noCountdown: true,
    }),
    presenceIntensity: 0.2 + claimStrength * 0.46,
    sourceRole: "FORMAL_MANSION_RESULT_REFERENCE_ONLY",
    referenceOnly: true,
    identityBlind: true,
    noMansionFactCopy: true,
    noMansionName: true,
    noFourSymbolReveal: true,
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
