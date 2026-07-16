import type { StarBeastGenesisOriginCoordinateReference } from "./starBeastGenesisExperience";
import type {
  StarBeastGenesisFourSymbolResultReference,
  StarBeastGenesisMansionResultReference,
  StarBeastGenesisMotherCodeProfileReference,
} from "./starBeastGenesisSourceIdentity";
import type { LifeArchetypeProfile } from "./originalSelfLifeSchema";
import type {
  PersonalStarBeastIdentityReference,
  StarBeastIdentitySource,
} from "./starBeastIdentitySource";
import type { StarMansionLifeTrajectorySource } from "./starMansionLifeTrajectory";

export type ProductionIdentitySourceAdapterReadinessInput = Readonly<{
  sourceTrajectoryReference: StarMansionLifeTrajectorySource | null;
}>;

export type ProductionIdentitySourceAdapterReadinessUnavailableReason =
  | "SOURCE_TRAJECTORY_REFERENCE_REQUIRED";

export type ProductionIdentitySourceAdapterReadinessBlockedReason =
  | "SOURCE_TRAJECTORY_REFERENCE_INVALID"
  | "ORIGIN_COORDINATE_REFERENCE_INVALID"
  | "MANSION_RESULT_REFERENCE_INVALID"
  | "FOUR_SYMBOL_RESULT_REFERENCE_INVALID"
  | "MOTHER_CODE_PROFILE_REFERENCE_INVALID"
  | "LIFE_ARCHETYPE_PROFILE_REFERENCE_INVALID"
  | "IDENTITY_SOURCE_REFERENCE_INVALID"
  | "SOURCE_COMPONENT_REFERENCE_MISMATCH"
  | "MANSION_FOUR_SYMBOL_SOURCE_MISMATCH"
  | "MOTHER_CODE_LIFE_ARCHETYPE_SOURCE_MISMATCH"
  | "PERSONAL_IDENTITY_CONVERGENCE_INVALID";

export type ProductionIdentitySourceAdapterReadinessBoundary = Readonly<{
  readinessOnly: true;
  referenceOnly: true;
  noIdentityRecalculation: true;
  noUserInputBinding: true;
  noProductIntegration: true;
  noSceneModelCreation: true;
  noRendererInvocation: true;
  noLifeStateMutation: true;
  noStorageWrite: true;
}>;

export type ProductionIdentitySourceAdapterReference = Readonly<{
  referenceType: "PRODUCTION_IDENTITY_SOURCE_ENTRY";
  referenceId: string;
  sourceRole: "FORMAL_LIFE_IDENTITY_ENTRY";
  sourceTrajectoryReference: StarMansionLifeTrajectorySource;
  originCoordinateReference: StarBeastGenesisOriginCoordinateReference;
  mansionResultReference: StarBeastGenesisMansionResultReference;
  fourSymbolResultReference: StarBeastGenesisFourSymbolResultReference;
  motherCodeProfileReference: StarBeastGenesisMotherCodeProfileReference;
  lifeArchetypeProfileReference: LifeArchetypeProfile;
  identitySourceReference: StarBeastIdentitySource;
  personalStarBeastIdentityReference: PersonalStarBeastIdentityReference;
  referenceOnly: true;
  noUserInputBinding: true;
  noProductIntegration: true;
  noSceneModelCreation: true;
  noRendererInvocation: true;
  noStorageWrite: true;
}>;

export type ProductionIdentitySourceAdapterReadinessReady = Readonly<{
  status: "READY";
  readiness: "READY_FOR_FORMAL_IDENTITY_SOURCE_ADAPTER";
  source: "production_identity_source_adapter_readiness";
  input: ProductionIdentitySourceAdapterReadinessInput;
  identitySourceEntryReference: ProductionIdentitySourceAdapterReference;
  boundary: ProductionIdentitySourceAdapterReadinessBoundary;
}>;

export type ProductionIdentitySourceAdapterReadinessUnavailable = Readonly<{
  status: "UNAVAILABLE";
  readiness: "UNAVAILABLE";
  source: "production_identity_source_adapter_readiness";
  reason: ProductionIdentitySourceAdapterReadinessUnavailableReason;
  input: ProductionIdentitySourceAdapterReadinessInput;
  identitySourceEntryReference: null;
  boundary: ProductionIdentitySourceAdapterReadinessBoundary;
}>;

export type ProductionIdentitySourceAdapterReadinessBlocked = Readonly<{
  status: "BLOCKED";
  readiness: "BLOCKED";
  source: "production_identity_source_adapter_readiness";
  reason: ProductionIdentitySourceAdapterReadinessBlockedReason;
  input: ProductionIdentitySourceAdapterReadinessInput;
  identitySourceEntryReference: null;
  boundary: ProductionIdentitySourceAdapterReadinessBoundary;
}>;

export type ProductionIdentitySourceAdapterReadinessResult =
  | ProductionIdentitySourceAdapterReadinessReady
  | ProductionIdentitySourceAdapterReadinessUnavailable
  | ProductionIdentitySourceAdapterReadinessBlocked;
