import type { GenesisFourSymbolAlignmentProjection } from "./genesisFourSymbolAlignmentProjection";
import type { GenesisLifeForceInfusionProjection } from "./genesisLifeForceInfusionProjection";
import type { GenesisBirthMansionIgnitionProjection } from "./genesisBirthMansionIgnitionProjection";
import type { PersonalStarBeastIdentityReference } from "./starBeastIdentitySource";

export type GenesisPersonalRevealInput = Readonly<{
  birthMansionIgnitionProjection: GenesisBirthMansionIgnitionProjection | null;
  morphologicalFieldAlignmentProjection: GenesisFourSymbolAlignmentProjection | null;
  lifeForceInfusionProjection: GenesisLifeForceInfusionProjection | null;
  personalStarBeastIdentityReference: PersonalStarBeastIdentityReference | null;
}>;

export type GenesisPersonalRevealStage =
  | "WAITING_FOR_FORCE_INFUSION"
  | "PERSONAL_FORM_EMERGING"
  | "PERSONAL_STAR_BEAST_REVEALED";

export type GenesisPersonalRevealPresenceMode =
  | "SEED_CONTINUITY"
  | "FIELD_FORCE_COHERENCE"
  | "PERSONAL_PRESENCE";

export type GenesisPersonalRevealProjection = Readonly<{
  semanticRole: "GENESIS_PERSONAL_STAR_BEAST_REVEAL_PROJECTION";
  birthMansionSeedReferenceId: string;
  morphologicalFieldReferenceId: string;
  lifeForceReferenceId: string;
  identityReferenceId: string;
  revealExpression: Readonly<{
    presenceMode: GenesisPersonalRevealPresenceMode;
    seedContinuity: number;
    fieldIntegration: number;
    forceIntegration: number;
    coreConvergence: number;
    boundaryContinuity: number;
    revealOpacity: number;
    noAnimalIdentity: true;
    noAnimalGeometry: true;
  }>;
  cosmicRecognitionExpression: Readonly<{
    personalAttention: number;
    sourceConvergence: number;
    quietReveal: number;
  }>;
  revealStage: GenesisPersonalRevealStage;
  temporalRhythm: Readonly<{
    periodSeconds: number;
    phaseOffset: number;
    breathingAmplitude: number;
    noCountdown: true;
  }>;
  presenceIntensity: number;
  sourceRole: "FORMAL_THREE_SOURCE_PERSONAL_IDENTITY_REFERENCE_ONLY";
  referenceOnly: true;
  identityBlind: true;
  noIdentityFactCopy: true;
  noFourSymbolMutation: true;
  noMotherCodeCalculation: true;
  noAnimalIdentity: true;
  noAnimalGeometry: true;
  noAssetGeneration: true;
  noLifeStateMutation: true;
  noRendererInvocation: true;
  noRuntimeIntegration: true;
}>;

export type GenesisPersonalRevealUnavailableReason =
  | "BIRTH_MANSION_IGNITION_REQUIRED"
  | "MORPHOLOGICAL_FIELD_ALIGNMENT_REQUIRED"
  | "LIFE_FORCE_INFUSION_REQUIRED"
  | "PERSONAL_IDENTITY_REFERENCE_REQUIRED"
  | "LIFE_FORCE_NOT_INFUSED";

export type GenesisPersonalRevealBlockedReason =
  | "BIRTH_MANSION_REFERENCE_INVALID"
  | "MORPHOLOGICAL_FIELD_REFERENCE_INVALID"
  | "LIFE_FORCE_REFERENCE_INVALID"
  | "PERSONAL_IDENTITY_REFERENCE_INVALID"
  | "PERSONAL_IDENTITY_SOURCE_BOUNDARY_INVALID";

type GenesisPersonalRevealBoundary = Readonly<{
  projectionOnly: true;
  referenceOnly: true;
  threeSourceConvergenceOnly: true;
  noIdentityFactCopy: true;
  noAnimalModelGeneration: true;
  noAssetGeneration: true;
  noMotherCodeCalculation: true;
  noFourSymbolMutation: true;
  noRendererInvocation: true;
  noUIIntegration: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
}>;

export type GenesisPersonalRevealProjectionResult =
  | Readonly<{
      status: "AVAILABLE";
      projection: GenesisPersonalRevealProjection;
      input: GenesisPersonalRevealInput;
      boundary: GenesisPersonalRevealBoundary;
    }>
  | Readonly<{
      status: "UNAVAILABLE";
      reason: GenesisPersonalRevealUnavailableReason;
      projection: null;
      input: GenesisPersonalRevealInput;
      boundary: GenesisPersonalRevealBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      reason: GenesisPersonalRevealBlockedReason;
      projection: null;
      input: GenesisPersonalRevealInput;
      boundary: GenesisPersonalRevealBoundary;
    }>;
