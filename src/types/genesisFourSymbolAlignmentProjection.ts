import type { GenesisBirthMansionIgnitionProjection } from "./genesisBirthMansionIgnitionProjection";
import type { StarBeastGenesisFourSymbolResultReference } from "./starBeastGenesisSourceIdentity";

export type GenesisFourSymbolAlignmentInput = Readonly<{
  birthMansionIgnitionProjection: GenesisBirthMansionIgnitionProjection | null;
  fourSymbolResultReference: StarBeastGenesisFourSymbolResultReference | null;
}>;

export type GenesisFourSymbolAlignmentStage =
  | "WAITING_FOR_SEED_CLAIM"
  | "FIELD_FORMING"
  | "FIELD_ALIGNED";

export type GenesisFourSymbolFieldMode =
  | "EXTENDING_ARC"
  | "RISING_FLOW"
  | "CONVERGING_BOUNDARY"
  | "ENCLOSING_DEPTH";

export type GenesisFourSymbolAlignmentProjection = Readonly<{
  semanticRole: "GENESIS_FOUR_SYMBOL_ALIGNMENT_PROJECTION";
  birthMansionIgnitionReferenceId: string;
  sourceResultReferenceId: string;
  morphologicalFieldExpression: Readonly<{
    fieldMode: GenesisFourSymbolFieldMode;
    spatialBias: number;
    directionalFlow: number;
    boundaryBehavior: number;
    postureBias: number;
    envelopeScale: number;
    noAnimalGeometry: true;
  }>;
  cosmicRecognitionExpression: Readonly<{
    fieldVisibility: number;
    seedToFieldContinuity: number;
    backgroundRelationship: number;
    universeAttention: number;
  }>;
  alignmentStage: GenesisFourSymbolAlignmentStage;
  temporalRhythm: Readonly<{
    periodSeconds: number;
    phaseOffset: number;
    breathingAmplitude: number;
    noCountdown: true;
  }>;
  presenceIntensity: number;
  sourceRole: "FORMAL_FOUR_SYMBOL_RESULT_REFERENCE_ONLY";
  referenceOnly: true;
  identityBlind: true;
  noAnimalIdentity: true;
  noAnimalGeometry: true;
  noMotherCodeExpression: true;
  noPersonalStarBeastReveal: true;
  noLifeFactCopy: true;
  noRendererInvocation: true;
  noLifeStateMutation: true;
  noRuntimeIntegration: true;
}>;

export type GenesisFourSymbolAlignmentUnavailableReason =
  | "BIRTH_MANSION_IGNITION_REQUIRED"
  | "BIRTH_MANSION_SEED_NOT_CLAIMED"
  | "FOUR_SYMBOL_RESULT_REFERENCE_REQUIRED";

export type GenesisFourSymbolAlignmentBlockedReason =
  | "BIRTH_MANSION_IGNITION_REFERENCE_INVALID"
  | "FOUR_SYMBOL_RESULT_REFERENCE_INVALID"
  | "FOUR_SYMBOL_RESULT_NOT_READY";

type GenesisFourSymbolAlignmentBoundary = Readonly<{
  projectionOnly: true;
  referenceOnly: true;
  morphologicalFieldOnly: true;
  noAnimalModelGeneration: true;
  noMotherCodeCalculation: true;
  noPersonalStarBeastGeneration: true;
  noRendererInvocation: true;
  noUIIntegration: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
}>;

export type GenesisFourSymbolAlignmentProjectionResult =
  | Readonly<{
      status: "AVAILABLE";
      projection: GenesisFourSymbolAlignmentProjection;
      input: GenesisFourSymbolAlignmentInput;
      boundary: GenesisFourSymbolAlignmentBoundary;
    }>
  | Readonly<{
      status: "UNAVAILABLE";
      reason: GenesisFourSymbolAlignmentUnavailableReason;
      projection: null;
      input: GenesisFourSymbolAlignmentInput;
      boundary: GenesisFourSymbolAlignmentBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      reason: GenesisFourSymbolAlignmentBlockedReason;
      projection: null;
      input: GenesisFourSymbolAlignmentInput;
      boundary: GenesisFourSymbolAlignmentBoundary;
    }>;
