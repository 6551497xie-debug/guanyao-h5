import type {
  RealityGravityExperienceArchitecture,
} from "./realityGravityExperienceArchitecture";

export type ChoiceEntryState =
  | "GRAVITY_OBSERVATION_COMPLETED"
  | "CHOICE_SPACE_OPEN";

export type InertiaAwarenessLayer = Readonly<{
  semanticRole: "INERTIA_AWARENESS";
  awarenessMode: "RECOGNIZE_AUTOMATIC_RESPONSE";
  noBehaviorRecommendation: true;
  noUserScoring: true;
  noPersonalityJudgment: true;
}>;

export type ResponseGapLayer = Readonly<{
  semanticRole: "RESPONSE_GAP_OPENING";
  gapMode: "STIMULUS_TO_RESPONSE_SPACE";
  agencyMode: "USER_OWNED_PAUSE";
  noImmediateChangeRequired: true;
  noSystemDecision: true;
}>;

export type AlternativeResponseLayer = Readonly<{
  semanticRole: "ALTERNATIVE_RESPONSE_POSSIBILITY";
  possibilityMode: "MULTIPLE_RESPONSES_MAY_EXIST";
  noSingleAnswer: true;
  noBehaviorPlan: true;
  noRecommendation: true;
}>;

export type ActiveChoiceLayer = Readonly<{
  semanticRole: "USER_OWNED_ACTIVE_CHOICE";
  agencyMode: "USER_DECIDES_WHETHER_TO_TRY";
  noAiSubstitution: true;
  noForcedAction: true;
  noTaskAssignment: true;
}>;

export type ChoiceReadinessBoundary = Readonly<{
  semanticRole: "CHOICE_READINESS_BOUNDARY";
  choiceReadiness: "USER_DECISION_NOT_SYSTEM_DECISION";
  noRecommendedAnswer: true;
  noBehaviorPlan: true;
  noChoiceResult: true;
  noCrystalResult: true;
}>;

export type CrystalPreparationBoundary = Readonly<{
  semanticRole: "CRYSTAL_PREPARATION_BOUNDARY";
  preparationMode: "FUTURE_DEPOSIT_ONLY";
  noCrystalGeneration: true;
  noArchiveGeneration: true;
}>;

export type ChoiceExperienceInterventionBoundary = Readonly<{
  choiceExperienceOnly: true;
  noBehaviorGeneration: true;
  noDecisionAdvice: true;
  noTaskAssignment: true;
  noResultPrediction: true;
  noAiSubstitution: true;
  noGravityMutation: true;
  noCrystalGeneration: true;
  noArchiveGeneration: true;
  noGenesisMutation: true;
  noIdentityMutation: true;
  noUserProfile: true;
  noStorageWrite: true;
  noUiIntegration: true;
  noRendererInvocation: true;
  noProductionIntegration: true;
  isolatedReviewOnly: true;
}>;

export type ChoiceExperienceReadiness =
  | "CHOICE_EXPERIENCE_REVIEW_PENDING"
  | "CRYSTAL_READINESS_BOUNDARY_READY";

export type RealityChoiceExperienceArchitecture = Readonly<{
  semanticRole: "REALITY_CHOICE_EXPERIENCE_ARCHITECTURE";
  choiceEntryState: ChoiceEntryState;
  inertiaAwarenessLayer: InertiaAwarenessLayer;
  responseGapLayer: ResponseGapLayer;
  alternativeResponseLayer: AlternativeResponseLayer;
  activeChoiceLayer: ActiveChoiceLayer;
  choiceReadinessBoundary: ChoiceReadinessBoundary;
  crystalPreparationBoundary: CrystalPreparationBoundary;
  interventionBoundary: ChoiceExperienceInterventionBoundary;
  readinessState: ChoiceExperienceReadiness;
  gravityReference: RealityGravityExperienceArchitecture;
  gravityChoiceBoundary: "INERTIA_OBSERVATION_TO_RESPONSE_SPACE";
  genesisBoundary: "GENESIS_REMAINS_ISOLATED";
}>;

export type RealityChoiceExperienceArchitectureInput = Readonly<{
  gravityExperienceArchitecture: RealityGravityExperienceArchitecture | null;
}>;

export type RealityChoiceExperienceArchitectureUnavailableReason =
  | "GRAVITY_EXPERIENCE_ARCHITECTURE_REQUIRED"
  | "GRAVITY_EXPERIENCE_ARCHITECTURE_UNAVAILABLE";

export type RealityChoiceExperienceArchitectureBlockedReason =
  | "GRAVITY_EXPERIENCE_ARCHITECTURE_INVALID"
  | "GRAVITY_CHOICE_BOUNDARY_INVALID"
  | "CHOICE_SCOPE_INVALID";

export type RealityChoiceExperienceArchitectureBoundary = Readonly<{
  architectureReviewOnly: true;
  choiceSemanticOnly: true;
  noBehaviorEngine: true;
  noDecisionAdvice: true;
  noTaskAssignment: true;
  noResultPrediction: true;
  noAiSubstitution: true;
  noGravityMutation: true;
  noCrystal: true;
  noArchive: true;
  noGenesisMutation: true;
  noIdentityMutation: true;
  noUserProfile: true;
  noStorage: true;
  noUi: true;
  noRenderer: true;
  noProductionIntegration: true;
}>;

export type RealityChoiceExperienceArchitectureReady = Readonly<{
  status: "READY";
  readiness: "CRYSTAL_READINESS_BOUNDARY_READY";
  source: "reality_choice_experience_architecture";
  input: RealityChoiceExperienceArchitectureInput;
  architecture: RealityChoiceExperienceArchitecture;
  boundary: RealityChoiceExperienceArchitectureBoundary;
}>;

export type RealityChoiceExperienceArchitectureUnavailable = Readonly<{
  status: "UNAVAILABLE";
  readiness: "UNAVAILABLE";
  source: "reality_choice_experience_architecture";
  reason: RealityChoiceExperienceArchitectureUnavailableReason;
  input: RealityChoiceExperienceArchitectureInput;
  architecture: null;
  boundary: RealityChoiceExperienceArchitectureBoundary;
}>;

export type RealityChoiceExperienceArchitectureBlocked = Readonly<{
  status: "BLOCKED";
  readiness: "BLOCKED";
  source: "reality_choice_experience_architecture";
  reason: RealityChoiceExperienceArchitectureBlockedReason;
  input: RealityChoiceExperienceArchitectureInput;
  architecture: null;
  boundary: RealityChoiceExperienceArchitectureBoundary;
}>;

export type RealityChoiceExperienceArchitectureResult =
  | RealityChoiceExperienceArchitectureReady
  | RealityChoiceExperienceArchitectureUnavailable
  | RealityChoiceExperienceArchitectureBlocked;
