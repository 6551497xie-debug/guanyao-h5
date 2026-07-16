import type { LifeArchetypeProfile } from "./originalSelfLifeSchema";
import type { StarBeastIdentitySource } from "./starBeastIdentitySource";
import type { StarBeastGenesisOriginCoordinateReference } from "./starBeastGenesisExperience";
import type {
  StarBeastGenesisFourSymbolResultReference,
  StarBeastGenesisMansionResultReference,
  StarBeastGenesisMotherCodeProfileReference,
} from "./starBeastGenesisSourceIdentity";

export type StarMansionLifeTrajectoryStage =
  | "COSMIC_SKY"
  | "TWENTY_EIGHT_MANSION_REVEAL"
  | "LIFE_ARRIVAL_COORDINATE"
  | "TIME_SEQUENCE_ALIGNMENT"
  | "BIRTH_MANSION_IGNITION"
  | "FOUR_SYMBOL_ALIGNMENT"
  | "MOTHER_CODE_INFUSION"
  | "PERSONAL_STAR_BEAST_REVEAL"
  | "REALITY_PRESSURE"
  | "GRAVITY_SIX_SPACE_EXPERIENCE"
  | "CHOICE_PERSONA_MIGRATION"
  | "CRYSTAL_IMPRINT";

export type StarMansionLifeTrajectoryPath = readonly [
  "COSMIC_SKY",
  "TWENTY_EIGHT_MANSION_REVEAL",
  "LIFE_ARRIVAL_COORDINATE",
  "TIME_SEQUENCE_ALIGNMENT",
  "BIRTH_MANSION_IGNITION",
  "FOUR_SYMBOL_ALIGNMENT",
  "MOTHER_CODE_INFUSION",
  "PERSONAL_STAR_BEAST_REVEAL",
  "REALITY_PRESSURE",
  "GRAVITY_SIX_SPACE_EXPERIENCE",
  "CHOICE_PERSONA_MIGRATION",
  "CRYSTAL_IMPRINT",
];

export type StarMansionLifeTrajectorySourceFreezeInput = Readonly<{
  originCoordinateReference: StarBeastGenesisOriginCoordinateReference | null;
  mansionResultReference: StarBeastGenesisMansionResultReference | null;
  fourSymbolResultReference: StarBeastGenesisFourSymbolResultReference | null;
  motherCodeProfileReference: StarBeastGenesisMotherCodeProfileReference | null;
  lifeArchetypeProfileReference: LifeArchetypeProfile | null;
}>;

export type StarMansionLifeTrajectorySource = Readonly<{
  semanticRole: "STAR_MANSION_LIFE_TRAJECTORY_SOURCE";
  trajectoryPath: StarMansionLifeTrajectoryPath;
  originCoordinateReference: StarBeastGenesisOriginCoordinateReference;
  mansionResultReference: StarBeastGenesisMansionResultReference;
  fourSymbolResultReference: StarBeastGenesisFourSymbolResultReference;
  motherCodeProfileReference: StarBeastGenesisMotherCodeProfileReference;
  lifeArchetypeProfileReference: LifeArchetypeProfile;
  starBeastIdentitySource: StarBeastIdentitySource;
  boundary: Readonly<{
    sourceFreezeOnly: true;
    referenceOnly: true;
    presentationTrajectoryNotCalculationDependency: true;
    noJourneyProgression: true;
    noRealityPressureCreation: true;
    noGravityInvocation: true;
    noChoiceOrMigrationExecution: true;
    noCrystalCreation: true;
    noEngineMutation: true;
    noRendererMutation: true;
    noUIIntegration: true;
    noStorageWrite: true;
  }>;
}>;

export type StarMansionLifeTrajectorySourceFreezeUnavailableReason =
  | "ORIGIN_COORDINATE_REFERENCE_REQUIRED"
  | "MANSION_RESULT_REFERENCE_REQUIRED"
  | "FOUR_SYMBOL_RESULT_REFERENCE_REQUIRED"
  | "MOTHER_CODE_PROFILE_REFERENCE_REQUIRED"
  | "LIFE_ARCHETYPE_PROFILE_REFERENCE_REQUIRED";

export type StarMansionLifeTrajectorySourceFreezeBlockedReason =
  | "ORIGIN_COORDINATE_REFERENCE_INVALID"
  | "MANSION_ENGINE_REFERENCE_INVALID"
  | "FOUR_SYMBOL_ENGINE_REFERENCE_INVALID"
  | "MANSION_FOUR_SYMBOL_SOURCE_MISMATCH"
  | "MOTHER_CODE_PROFILE_REFERENCE_INVALID"
  | "LIFE_ARCHETYPE_PROFILE_REFERENCE_INVALID"
  | "MOTHER_CODE_LIFE_ARCHETYPE_SOURCE_MISMATCH";

export type StarMansionLifeTrajectorySourceFreezeResult =
  | Readonly<{
      status: "AVAILABLE";
      input: StarMansionLifeTrajectorySourceFreezeInput;
      source: StarMansionLifeTrajectorySource;
    }>
  | Readonly<{
      status: "UNAVAILABLE";
      reason: StarMansionLifeTrajectorySourceFreezeUnavailableReason;
      input: StarMansionLifeTrajectorySourceFreezeInput;
      source: null;
    }>
  | Readonly<{
      status: "BLOCKED";
      reason: StarMansionLifeTrajectorySourceFreezeBlockedReason;
      input: StarMansionLifeTrajectorySourceFreezeInput;
      source: null;
    }>;
