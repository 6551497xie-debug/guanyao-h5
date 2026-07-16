import type {
  GenesisTimeSequenceRecognitionBlockedReason,
  GenesisTimeSequenceRecognitionInput,
  GenesisTimeSequenceRecognitionProjection,
  GenesisTimeSequenceRecognitionProjectionResult,
  GenesisTimeSequenceRecognitionUnavailableReason,
} from "../types/genesisTimeSequenceRecognitionProjection";

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
  input: GenesisTimeSequenceRecognitionInput,
  reason: GenesisTimeSequenceRecognitionUnavailableReason,
): GenesisTimeSequenceRecognitionProjectionResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    reason,
    projection: null,
    input,
    boundary: PROJECTION_BOUNDARY,
  });

const blocked = (
  input: GenesisTimeSequenceRecognitionInput,
  reason: GenesisTimeSequenceRecognitionBlockedReason,
): GenesisTimeSequenceRecognitionProjectionResult =>
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

export function projectGenesisTimeSequenceRecognition(
  input: GenesisTimeSequenceRecognitionInput,
): GenesisTimeSequenceRecognitionProjectionResult {
  const origin = input.originCoordinateReference;
  if (origin === null) {
    return unavailable(input, "ORIGIN_COORDINATE_REFERENCE_REQUIRED");
  }
  if (
    origin.referenceType !== "STAR_BEAST_GENESIS_ORIGIN_COORDINATE" ||
    origin.referenceId.trim().length === 0 ||
    origin.sourceRole !== "SHARED_TEMPORAL_BIRTH_COORDINATE" ||
    origin.birthLocationContextOnly !== true ||
    origin.birthLocationExcludedFromStarBeastDerivation !== true
  ) {
    return blocked(input, "ORIGIN_COORDINATE_REFERENCE_INVALID");
  }

  const timeSequence = input.timeSequenceReference;
  if (timeSequence === null) {
    return unavailable(input, "TIME_SEQUENCE_REFERENCE_REQUIRED");
  }
  if (
    timeSequence.referenceType !== "GENESIS_TIME_SEQUENCE_REFERENCE" ||
    timeSequence.referenceId.trim().length === 0
  ) {
    return blocked(input, "TIME_SEQUENCE_REFERENCE_INVALID");
  }

  const originUnit = referenceUnit(origin.referenceId);
  const timeUnit = referenceUnit(timeSequence.referenceId);
  const sequencePhase = (originUnit * 0.36 + timeUnit * 0.64) % 1;
  const alignmentStrength = 0.26 + sequencePhase * 0.58;
  const trajectoryBias = (timeUnit - 0.5) * 0.72;
  const responseStrength = 0.24 + alignmentStrength * 0.72;
  const fieldGathering = 0.12 + alignmentStrength * 0.56;
  const directionalDrift = trajectoryBias * Math.PI;
  const recognitionStage =
    responseStrength >= 0.72
      ? "RECOGNIZED"
      : responseStrength >= 0.48
        ? "APPROACHING"
        : "WAITING";

  const projection: GenesisTimeSequenceRecognitionProjection = Object.freeze({
    semanticRole: "GENESIS_TIME_SEQUENCE_RECOGNITION_PROJECTION",
    originCoordinateReferenceId: origin.referenceId,
    timeSequenceReferenceId: timeSequence.referenceId,
    timeAlignmentExpression: Object.freeze({
      sequencePhase,
      alignmentStrength,
      trajectoryBias,
    }),
    cosmicResponseExpression: Object.freeze({
      responseStrength,
      fieldGathering,
      directionalDrift,
    }),
    recognitionStage,
    temporalRhythm: Object.freeze({
      periodSeconds: 7.2 + sequencePhase * 2.6,
      phaseOffset: sequencePhase * Math.PI * 2,
      breathingAmplitude: 0.012 + alignmentStrength * 0.028,
      noCountdown: true,
    }),
    presenceIntensity: 0.14 + responseStrength * 0.54,
    sourceRole: "LIFE_ARRIVAL_COORDINATE_ONLY",
    referenceOnly: true,
    identityBlind: true,
    noMansionReveal: true,
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
