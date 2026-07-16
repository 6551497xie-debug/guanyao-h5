import type { LifeArchetypeProfile } from "./originalSelfLifeSchema";
import type { StarBeastAssetDefinition } from "./starBeastAssetArchitecture";
import type { StarbeastDerivationReady } from "./guanyaoStarbeast";

export type StarBeastGenesisStage =
  | "COSMIC_ORIGIN"
  | "ORIGIN_COORDINATE"
  | "STAR_MANSION_ALIGNMENT"
  | "FOUR_SYMBOL_FORMATION"
  | "LIFE_ARCHETYPE_INFUSION"
  | "STAR_BEAST_REVEAL";

export type StarBeastGenesisOriginCoordinateReference = Readonly<{
  referenceType: "STAR_BEAST_GENESIS_ORIGIN_COORDINATE";
  referenceId: string;
  sourceRole: "SHARED_TEMPORAL_BIRTH_COORDINATE";
  birthLocationContextOnly: true;
  birthLocationExcludedFromStarBeastDerivation: true;
}>;

export type StarBeastGenesisMansionReference = Readonly<{
  referenceType: "STAR_BEAST_GENESIS_MANSION";
  referenceId: string;
  sourceStarbeastDerivationReference: StarbeastDerivationReady;
}>;

export type StarBeastGenesisFourSymbolReference = Readonly<{
  referenceType: "STAR_BEAST_GENESIS_FOUR_SYMBOL";
  referenceId: string;
  sourceMansionReference: StarBeastGenesisMansionReference;
}>;

export type StarBeastGenesisLifeArchetypeReference = Readonly<{
  referenceType: "STAR_BEAST_GENESIS_LIFE_ARCHETYPE";
  referenceId: string;
  sourceRole: "MOTHER_CODE_PROFILE_ONLY";
  sourceLifeArchetypeProfileReference: LifeArchetypeProfile;
}>;

export type StarBeastGenesisAssetReference = Readonly<{
  referenceType: "STAR_BEAST_GENESIS_ASSET";
  referenceId: string;
  sourceAssetDefinitionReference: StarBeastAssetDefinition;
}>;

export type StarBeastGenesisExperienceState = Readonly<{
  semanticRole: "STAR_BEAST_GENESIS_EXPERIENCE_STATE";
  currentStage: StarBeastGenesisStage;
  originCoordinateReference: StarBeastGenesisOriginCoordinateReference | null;
  mansionReference: StarBeastGenesisMansionReference | null;
  fourSymbolReference: StarBeastGenesisFourSymbolReference | null;
  lifeArchetypeReference: StarBeastGenesisLifeArchetypeReference | null;
  starBeastAssetReference: StarBeastGenesisAssetReference | null;
  presentationSequenceOnly: true;
  notCausalDerivationSequence: true;
}>;

export type StarBeastGenesisExperienceInput = Readonly<{
  originCoordinateReference: StarBeastGenesisOriginCoordinateReference | null;
  mansionReference: StarBeastGenesisMansionReference | null;
  fourSymbolReference: StarBeastGenesisFourSymbolReference | null;
  lifeArchetypeReference: StarBeastGenesisLifeArchetypeReference | null;
  starBeastAssetReference: StarBeastGenesisAssetReference | null;
}>;

type StarBeastGenesisExperienceBoundary = Readonly<{
  experienceSchemaOnly: true;
  referenceOnly: true;
  noFourSymbolToLifeArchetypeInference: true;
  noBirthLocationToStarBeastDerivation: true;
  noStarBeastGeneration: true;
  noAssetMutation: true;
  noLifeStateMutation: true;
  noRendererInvocation: true;
  noCanvasConnection: true;
  noUIIntegration: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
}>;

export type StarBeastGenesisRevealReady = Readonly<{
  status: "READY";
  revealStatus: "READY_FOR_FUTURE_GENESIS_EXPERIENCE_PRESENTATION";
  source: "star_beast_genesis_experience_mapping";
  input: StarBeastGenesisExperienceInput;
  experienceState: StarBeastGenesisExperienceState &
    Readonly<{
      currentStage: "STAR_BEAST_REVEAL";
      originCoordinateReference: StarBeastGenesisOriginCoordinateReference;
      mansionReference: StarBeastGenesisMansionReference;
      fourSymbolReference: StarBeastGenesisFourSymbolReference;
      lifeArchetypeReference: StarBeastGenesisLifeArchetypeReference;
      starBeastAssetReference: StarBeastGenesisAssetReference;
    }>;
  boundary: StarBeastGenesisExperienceBoundary;
}>;

export type StarBeastGenesisRevealUnavailableReason =
  | "ORIGIN_COORDINATE_REFERENCE_REQUIRED"
  | "MANSION_REFERENCE_REQUIRED"
  | "FOUR_SYMBOL_REFERENCE_REQUIRED"
  | "LIFE_ARCHETYPE_REFERENCE_REQUIRED"
  | "STAR_BEAST_ASSET_REFERENCE_REQUIRED";

export type StarBeastGenesisRevealUnavailable = Readonly<{
  status: "UNAVAILABLE";
  revealStatus: "UNAVAILABLE";
  source: "star_beast_genesis_experience_mapping";
  reason: StarBeastGenesisRevealUnavailableReason;
  input: StarBeastGenesisExperienceInput;
  experienceState: StarBeastGenesisExperienceState;
  boundary: StarBeastGenesisExperienceBoundary;
}>;

export type StarBeastGenesisRevealBlockedReason =
  | "ORIGIN_COORDINATE_REFERENCE_INVALID"
  | "MANSION_SOURCE_REFERENCE_INVALID"
  | "FOUR_SYMBOL_SOURCE_REFERENCE_MISMATCH"
  | "LIFE_ARCHETYPE_SOURCE_REFERENCE_INVALID"
  | "STAR_BEAST_ASSET_SOURCE_REFERENCE_INVALID"
  | "STAR_BEAST_ASSET_ARCHETYPE_REFERENCE_MISMATCH";

export type StarBeastGenesisRevealBlocked = Readonly<{
  status: "BLOCKED";
  revealStatus: "BLOCKED";
  source: "star_beast_genesis_experience_mapping";
  reason: StarBeastGenesisRevealBlockedReason;
  input: StarBeastGenesisExperienceInput;
  experienceState: StarBeastGenesisExperienceState;
  boundary: StarBeastGenesisExperienceBoundary;
}>;

export type StarBeastGenesisRevealResult =
  | StarBeastGenesisRevealReady
  | StarBeastGenesisRevealUnavailable
  | StarBeastGenesisRevealBlocked;
