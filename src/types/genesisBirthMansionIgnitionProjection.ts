import type { GenesisTimeSequenceRecognitionProjection } from "./genesisTimeSequenceRecognitionProjection";
import type { StarBeastGenesisMansionReference } from "./starBeastGenesisExperience";

export type GenesisBirthMansionIgnitionInput = Readonly<{
  timeSequenceRecognitionProjection: GenesisTimeSequenceRecognitionProjection | null;
  mansionResultReference: StarBeastGenesisMansionReference | null;
}>;

export type GenesisBirthMansionIgnitionStage =
  | "WAITING_FOR_TIME_RECOGNITION"
  | "SEED_APPROACHING"
  | "SEED_CLAIMED";

export type GenesisBirthMansionIgnitionProjection = Readonly<{
  semanticRole: "GENESIS_BIRTH_MANSION_IGNITION_PROJECTION";
  timeSequenceRecognitionReferenceId: string;
  mansionSeedReferenceId: string;
  seedClaimExpression: Readonly<{
    claimStrength: number;
    anchorPresence: number;
    localAttention: number;
    seedVisibility: number;
  }>;
  cosmicRecognitionExpression: Readonly<{
    fieldConvergence: number;
    quietingRadius: number;
    responseDirection: number;
    backgroundAttenuation: number;
  }>;
  ignitionStage: GenesisBirthMansionIgnitionStage;
  temporalRhythm: Readonly<{
    periodSeconds: number;
    phaseOffset: number;
    breathingAmplitude: number;
    noCountdown: true;
  }>;
  presenceIntensity: number;
  sourceRole: "FORMAL_MANSION_RESULT_REFERENCE_ONLY";
  referenceOnly: true;
  identityBlind: true;
  noMansionFactCopy: true;
  noMansionName: true;
  noFourSymbolReveal: true;
  noMotherCodeExpression: true;
  noPersonalStarBeastReveal: true;
  noLifeFactCopy: true;
  noRendererInvocation: true;
  noLifeStateMutation: true;
  noRuntimeIntegration: true;
}>;

export type GenesisBirthMansionIgnitionUnavailableReason =
  | "TIME_SEQUENCE_RECOGNITION_REQUIRED"
  | "TIME_SEQUENCE_NOT_RECOGNIZED"
  | "MANSION_RESULT_REFERENCE_REQUIRED";

export type GenesisBirthMansionIgnitionBlockedReason =
  | "TIME_SEQUENCE_REFERENCE_INVALID"
  | "MANSION_RESULT_REFERENCE_INVALID"
  | "MANSION_RESULT_NOT_READY";

type GenesisBirthMansionIgnitionBoundary = Readonly<{
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

export type GenesisBirthMansionIgnitionProjectionResult =
  | Readonly<{
      status: "AVAILABLE";
      projection: GenesisBirthMansionIgnitionProjection;
      input: GenesisBirthMansionIgnitionInput;
      boundary: GenesisBirthMansionIgnitionBoundary;
    }>
  | Readonly<{
      status: "UNAVAILABLE";
      reason: GenesisBirthMansionIgnitionUnavailableReason;
      projection: null;
      input: GenesisBirthMansionIgnitionInput;
      boundary: GenesisBirthMansionIgnitionBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      reason: GenesisBirthMansionIgnitionBlockedReason;
      projection: null;
      input: GenesisBirthMansionIgnitionInput;
      boundary: GenesisBirthMansionIgnitionBoundary;
    }>;
