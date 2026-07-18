import type {
  RealityChoiceExperienceArchitecture,
} from "./realityChoiceExperienceArchitecture";

export type TransformationEntryState =
  | "CHOICE_RESPONSE_OCCURRED"
  | "TRANSFORMATION_OBSERVATION_OPEN";

export type ResponseChangeLayer = Readonly<{
  semanticRole: "RESPONSE_CHANGE";
  changeMode: "NEW_RESPONSE_OCCURRED";
  noTaskCompletion: true;
  noBehaviorScore: true;
  noChoiceEvaluation: true;
}>;

export type LifeImprintLayer = Readonly<{
  semanticRole: "LIFE_IMPRINT";
  imprintMode: "STRUCTURAL_CHANGE_OBSERVED";
  noLabel: true;
  noFixedPersonality: true;
  noValueJudgment: true;
}>;

export type CrystalFormationLayer = Readonly<{
  semanticRole: "CRYSTAL_FORMATION_OBSERVATION";
  formationMode: "CHANGE_DEPOSIT_OBSERVED";
  noReward: true;
  noCollection: true;
  noAssetCreation: true;
  noStorageRecord: true;
}>;

export type FutureCarryLayer = Readonly<{
  semanticRole: "FUTURE_CARRY";
  carryMode: "CHANGE_CARRIED_FORWARD";
  noFixedIdentity: true;
  noGenesisMutation: true;
  noUserValueJudgment: true;
}>;

export type CrystalExperienceInterventionBoundary = Readonly<{
  crystalExperienceOnly: true;
  noCrystalGeneration: true;
  noStorageWrite: true;
  noArchiveGeneration: true;
  noRewardLogic: true;
  noLevelLogic: true;
  noBadgeLogic: true;
  noAssetPersistence: true;
  noChoiceMutation: true;
  noChoiceEvaluation: true;
  noGenesisMutation: true;
  noIdentityMutation: true;
  noUserProfile: true;
  noUiIntegration: true;
  noRendererInvocation: true;
  noProductionIntegration: true;
  isolatedReviewOnly: true;
}>;

export type CrystalExperienceReadiness =
  | "CRYSTAL_EXPERIENCE_REVIEW_PENDING"
  | "FUTURE_CRYSTAL_EXPERIENCE_BOUNDARY_READY";

export type RealityCrystalExperienceArchitecture = Readonly<{
  semanticRole: "REALITY_CRYSTAL_EXPERIENCE_ARCHITECTURE";
  transformationEntryState: TransformationEntryState;
  responseChangeLayer: ResponseChangeLayer;
  lifeImprintLayer: LifeImprintLayer;
  crystalFormationLayer: CrystalFormationLayer;
  futureCarryLayer: FutureCarryLayer;
  interventionBoundary: CrystalExperienceInterventionBoundary;
  readinessState: CrystalExperienceReadiness;
  choiceReference: RealityChoiceExperienceArchitecture;
  choiceCrystalBoundary: "CHOICE_RESPONSE_TO_CHANGE_DEPOSIT";
  genesisBoundary: "GENESIS_SOURCE_REMAINS_UNCHANGED";
}>;

export type RealityCrystalExperienceArchitectureInput = Readonly<{
  choiceExperienceArchitecture: RealityChoiceExperienceArchitecture | null;
}>;

export type RealityCrystalExperienceArchitectureUnavailableReason =
  | "CHOICE_EXPERIENCE_ARCHITECTURE_REQUIRED"
  | "CHOICE_EXPERIENCE_ARCHITECTURE_UNAVAILABLE";

export type RealityCrystalExperienceArchitectureBlockedReason =
  | "CHOICE_EXPERIENCE_ARCHITECTURE_INVALID"
  | "CHOICE_CRYSTAL_BOUNDARY_INVALID"
  | "CRYSTAL_SCOPE_INVALID";

export type RealityCrystalExperienceArchitectureBoundary = Readonly<{
  architectureReviewOnly: true;
  crystalSemanticOnly: true;
  noCrystalEngine: true;
  noStorage: true;
  noArchive: true;
  noReward: true;
  noLevel: true;
  noBadge: true;
  noScore: true;
  noChoiceMutation: true;
  noChoiceEvaluation: true;
  noGenesisMutation: true;
  noIdentityMutation: true;
  noUserProfile: true;
  noUi: true;
  noRenderer: true;
  noProductionIntegration: true;
}>;

export type RealityCrystalExperienceArchitectureReady = Readonly<{
  status: "READY";
  readiness: "FUTURE_CRYSTAL_EXPERIENCE_BOUNDARY_READY";
  source: "reality_crystal_experience_architecture";
  input: RealityCrystalExperienceArchitectureInput;
  architecture: RealityCrystalExperienceArchitecture;
  boundary: RealityCrystalExperienceArchitectureBoundary;
}>;

export type RealityCrystalExperienceArchitectureUnavailable = Readonly<{
  status: "UNAVAILABLE";
  readiness: "UNAVAILABLE";
  source: "reality_crystal_experience_architecture";
  reason: RealityCrystalExperienceArchitectureUnavailableReason;
  input: RealityCrystalExperienceArchitectureInput;
  architecture: null;
  boundary: RealityCrystalExperienceArchitectureBoundary;
}>;

export type RealityCrystalExperienceArchitectureBlocked = Readonly<{
  status: "BLOCKED";
  readiness: "BLOCKED";
  source: "reality_crystal_experience_architecture";
  reason: RealityCrystalExperienceArchitectureBlockedReason;
  input: RealityCrystalExperienceArchitectureInput;
  architecture: null;
  boundary: RealityCrystalExperienceArchitectureBoundary;
}>;

export type RealityCrystalExperienceArchitectureResult =
  | RealityCrystalExperienceArchitectureReady
  | RealityCrystalExperienceArchitectureUnavailable
  | RealityCrystalExperienceArchitectureBlocked;
