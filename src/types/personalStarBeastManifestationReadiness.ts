import type { LifeArchetypeProfile } from "./originalSelfLifeSchema";
import type { StarBeastIdentitySource } from "./starBeastIdentitySource";
import type { StarBeastGenesisOriginCoordinateReference } from "./starBeastGenesisExperience";
import type {
  StarBeastGenesisFourSymbolResultReference,
  StarBeastGenesisMansionResultReference,
  StarBeastGenesisMotherCodeProfileReference,
} from "./starBeastGenesisSourceIdentity";
import type { StarMansionLifeTrajectorySource } from "./starMansionLifeTrajectory";

export type PersonalStarBeastManifestationReadinessInput = Readonly<{
  starMansionLifeTrajectorySourceReference:
    | StarMansionLifeTrajectorySource
    | null;
  starBeastIdentitySourceReference: StarBeastIdentitySource | null;
  originCoordinateReference: StarBeastGenesisOriginCoordinateReference | null;
  mansionResultReference: StarBeastGenesisMansionResultReference | null;
  fourSymbolResultReference: StarBeastGenesisFourSymbolResultReference | null;
  motherCodeProfileReference: StarBeastGenesisMotherCodeProfileReference | null;
  lifeArchetypeProfileReference: LifeArchetypeProfile | null;
}>;

export type PersonalStarBeastManifestationReadinessUnavailableReason =
  | "STAR_MANSION_LIFE_TRAJECTORY_SOURCE_REQUIRED"
  | "STAR_BEAST_IDENTITY_SOURCE_REQUIRED"
  | "ORIGIN_COORDINATE_REFERENCE_REQUIRED"
  | "MANSION_RESULT_REFERENCE_REQUIRED"
  | "FOUR_SYMBOL_RESULT_REFERENCE_REQUIRED"
  | "MOTHER_CODE_PROFILE_REFERENCE_REQUIRED"
  | "LIFE_ARCHETYPE_PROFILE_REFERENCE_REQUIRED";

export type PersonalStarBeastManifestationReadinessBlockedReason =
  | "STAR_MANSION_LIFE_TRAJECTORY_SOURCE_INVALID"
  | "STAR_BEAST_IDENTITY_SOURCE_INVALID"
  | "STAR_BEAST_IDENTITY_SOURCE_MISMATCH"
  | "ORIGIN_COORDINATE_SOURCE_MISMATCH"
  | "MANSION_RESULT_SOURCE_MISMATCH"
  | "FOUR_SYMBOL_RESULT_SOURCE_MISMATCH"
  | "MOTHER_CODE_PROFILE_SOURCE_MISMATCH"
  | "LIFE_ARCHETYPE_PROFILE_SOURCE_MISMATCH"
  | "MANSION_FOUR_SYMBOL_SOURCE_MISMATCH"
  | "MOTHER_CODE_LIFE_ARCHETYPE_SOURCE_MISMATCH"
  | "PERSONAL_STAR_BEAST_IDENTITY_CONVERGENCE_INVALID";

export type PersonalStarBeastManifestationReadinessBoundary = Readonly<{
  readinessOnly: true;
  referenceOnly: true;
  noPersonalStarBeastCreation: true;
  noManifestationDesign: true;
  noVisualParameterGeneration: true;
  noAssetCreation: true;
  noRendererInvocation: true;
  noCanvasInvocation: true;
  noLifeStateMutation: true;
  noRuntimeIntegration: true;
  noUIIntegration: true;
  noStorageWrite: true;
}>;

export type PersonalStarBeastManifestationReadinessReady = Readonly<{
  status: "READY";
  readiness: "READY_FOR_PERSONAL_STAR_BEAST_MANIFESTATION_DESIGN";
  source: "personal_star_beast_manifestation_readiness";
  input: PersonalStarBeastManifestationReadinessInput;
  personalStarBeastIdentityReference:
    StarBeastIdentitySource["personalStarBeastReference"];
  boundary: PersonalStarBeastManifestationReadinessBoundary;
}>;

export type PersonalStarBeastManifestationReadinessUnavailable = Readonly<{
  status: "UNAVAILABLE";
  readiness: "UNAVAILABLE";
  source: "personal_star_beast_manifestation_readiness";
  reason: PersonalStarBeastManifestationReadinessUnavailableReason;
  input: PersonalStarBeastManifestationReadinessInput;
  personalStarBeastIdentityReference: null;
  boundary: PersonalStarBeastManifestationReadinessBoundary;
}>;

export type PersonalStarBeastManifestationReadinessBlocked = Readonly<{
  status: "BLOCKED";
  readiness: "BLOCKED";
  source: "personal_star_beast_manifestation_readiness";
  reason: PersonalStarBeastManifestationReadinessBlockedReason;
  input: PersonalStarBeastManifestationReadinessInput;
  personalStarBeastIdentityReference: null;
  boundary: PersonalStarBeastManifestationReadinessBoundary;
}>;

export type PersonalStarBeastManifestationReadinessResult =
  | PersonalStarBeastManifestationReadinessReady
  | PersonalStarBeastManifestationReadinessUnavailable
  | PersonalStarBeastManifestationReadinessBlocked;
