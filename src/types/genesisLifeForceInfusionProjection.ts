import type { LifeArchetypeProfile } from "./originalSelfLifeSchema";
import type { GenesisFourSymbolAlignmentProjection } from "./genesisFourSymbolAlignmentProjection";
import type { StarBeastGenesisMotherCodeProfileReference } from "./starBeastGenesisSourceIdentity";

export type GenesisLifeForceInfusionInput = Readonly<{
  morphologicalFieldAlignmentProjection: GenesisFourSymbolAlignmentProjection | null;
  motherCodeProfileReference: StarBeastGenesisMotherCodeProfileReference | null;
  lifeArchetypeProfileReference: LifeArchetypeProfile | null;
}>;

export type GenesisLifeForceInfusionStage =
  | "WAITING_FOR_FIELD_ALIGNMENT"
  | "FORCE_APPROACHING"
  | "FORCE_INFUSED";

export type GenesisLifeForceExpressionMode =
  | "DIRECTED_CORE"
  | "DEEP_SUPPORT"
  | "SPARK_RISE"
  | "DIFFUSE_FLOW"
  | "DEEP_RESERVE"
  | "RADIANT_PRESENCE"
  | "STILL_CORE"
  | "OPEN_EXCHANGE";

export type GenesisLifeForceInfusionProjection = Readonly<{
  semanticRole: "GENESIS_LIFE_FORCE_INFUSION_PROJECTION";
  morphologicalFieldAlignmentReferenceId: string;
  motherCodeProfileReferenceId: string;
  lifeArchetypeProfileReferenceId: string;
  lifeForceExpression: Readonly<{
    mode: GenesisLifeForceExpressionMode;
    corePull: number;
    energyRhythm: number;
    aggregationStrength: number;
    stability: number;
    directionalBias: number;
    noAnimalGeometry: true;
  }>;
  cosmicRecognitionExpression: Readonly<{
    forceVisibility: number;
    fieldToForceContinuity: number;
    coreAttention: number;
  }>;
  infusionStage: GenesisLifeForceInfusionStage;
  temporalRhythm: Readonly<{
    periodSeconds: number;
    phaseOffset: number;
    breathingAmplitude: number;
    noCountdown: true;
  }>;
  presenceIntensity: number;
  sourceRole: "FORMAL_MOTHER_CODE_AND_LIFE_ARCHETYPE_REFERENCE_ONLY";
  referenceOnly: true;
  identityBlind: true;
  noFourSymbolMutation: true;
  noAnimalIdentity: true;
  noAnimalGeometry: true;
  noPersonalStarBeastReveal: true;
  noLifeFactCopy: true;
  noRendererInvocation: true;
  noLifeStateMutation: true;
  noRuntimeIntegration: true;
}>;

export type GenesisLifeForceInfusionUnavailableReason =
  | "MORPHOLOGICAL_FIELD_ALIGNMENT_REQUIRED"
  | "MORPHOLOGICAL_FIELD_NOT_ALIGNED"
  | "MOTHER_CODE_PROFILE_REFERENCE_REQUIRED"
  | "LIFE_ARCHETYPE_PROFILE_REFERENCE_REQUIRED";

export type GenesisLifeForceInfusionBlockedReason =
  | "MORPHOLOGICAL_FIELD_REFERENCE_INVALID"
  | "MOTHER_CODE_PROFILE_REFERENCE_INVALID"
  | "MOTHER_CODE_PROFILE_NOT_READY"
  | "LIFE_ARCHETYPE_PROFILE_REFERENCE_INVALID"
  | "LIFE_ARCHETYPE_SOURCE_MISMATCH";

type GenesisLifeForceInfusionBoundary = Readonly<{
  projectionOnly: true;
  referenceOnly: true;
  lifeForceExpressionOnly: true;
  noMotherCodeCalculation: true;
  noFourSymbolMutation: true;
  noPersonalStarBeastGeneration: true;
  noRendererInvocation: true;
  noUIIntegration: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
}>;

export type GenesisLifeForceInfusionProjectionResult =
  | Readonly<{
      status: "AVAILABLE";
      projection: GenesisLifeForceInfusionProjection;
      input: GenesisLifeForceInfusionInput;
      boundary: GenesisLifeForceInfusionBoundary;
    }>
  | Readonly<{
      status: "UNAVAILABLE";
      reason: GenesisLifeForceInfusionUnavailableReason;
      projection: null;
      input: GenesisLifeForceInfusionInput;
      boundary: GenesisLifeForceInfusionBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      reason: GenesisLifeForceInfusionBlockedReason;
      projection: null;
      input: GenesisLifeForceInfusionInput;
      boundary: GenesisLifeForceInfusionBoundary;
    }>;
