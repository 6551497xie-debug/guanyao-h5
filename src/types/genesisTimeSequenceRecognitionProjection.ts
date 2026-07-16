import type { StarBeastGenesisOriginCoordinateReference } from "./starBeastGenesisExperience";

export type GenesisTimeSequenceReference = Readonly<{
  referenceType: "GENESIS_TIME_SEQUENCE_REFERENCE";
  referenceId: string;
}>;

export type GenesisTimeSequenceRecognitionInput = Readonly<{
  originCoordinateReference: StarBeastGenesisOriginCoordinateReference | null;
  timeSequenceReference: GenesisTimeSequenceReference | null;
}>;

export type GenesisTimeSequenceRecognitionStage =
  | "WAITING"
  | "APPROACHING"
  | "RECOGNIZED";

export type GenesisTimeSequenceRecognitionProjection = Readonly<{
  semanticRole: "GENESIS_TIME_SEQUENCE_RECOGNITION_PROJECTION";
  originCoordinateReferenceId: string;
  timeSequenceReferenceId: string;
  timeAlignmentExpression: Readonly<{
    sequencePhase: number;
    alignmentStrength: number;
    trajectoryBias: number;
  }>;
  cosmicResponseExpression: Readonly<{
    responseStrength: number;
    fieldGathering: number;
    directionalDrift: number;
  }>;
  recognitionStage: GenesisTimeSequenceRecognitionStage;
  temporalRhythm: Readonly<{
    periodSeconds: number;
    phaseOffset: number;
    breathingAmplitude: number;
    noCountdown: true;
  }>;
  presenceIntensity: number;
  sourceRole: "LIFE_ARRIVAL_COORDINATE_ONLY";
  referenceOnly: true;
  identityBlind: true;
  noMansionReveal: true;
  noFourSymbolReveal: true;
  noMotherCodeExpression: true;
  noPersonalStarBeastReveal: true;
  noLifeFactCopy: true;
  noRendererInvocation: true;
  noLifeStateMutation: true;
  noRuntimeIntegration: true;
}>;

export type GenesisTimeSequenceRecognitionUnavailableReason =
  | "ORIGIN_COORDINATE_REFERENCE_REQUIRED"
  | "TIME_SEQUENCE_REFERENCE_REQUIRED";

export type GenesisTimeSequenceRecognitionBlockedReason =
  | "ORIGIN_COORDINATE_REFERENCE_INVALID"
  | "TIME_SEQUENCE_REFERENCE_INVALID";

type GenesisTimeSequenceRecognitionBoundary = Readonly<{
  projectionOnly: true;
  referenceOnly: true;
  noMansionCalculation: true;
  noFourSymbolCalculation: true;
  noMotherCodeCalculation: true;
  noPersonalStarBeastGeneration: true;
  noRendererInvocation: true;
  noUIIntegration: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
}>;

export type GenesisTimeSequenceRecognitionProjectionResult =
  | Readonly<{
      status: "AVAILABLE";
      projection: GenesisTimeSequenceRecognitionProjection;
      input: GenesisTimeSequenceRecognitionInput;
      boundary: GenesisTimeSequenceRecognitionBoundary;
    }>
  | Readonly<{
      status: "UNAVAILABLE";
      reason: GenesisTimeSequenceRecognitionUnavailableReason;
      projection: null;
      input: GenesisTimeSequenceRecognitionInput;
      boundary: GenesisTimeSequenceRecognitionBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      reason: GenesisTimeSequenceRecognitionBlockedReason;
      projection: null;
      input: GenesisTimeSequenceRecognitionInput;
      boundary: GenesisTimeSequenceRecognitionBoundary;
    }>;
