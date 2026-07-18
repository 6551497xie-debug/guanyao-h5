import type {
  RealityPressureRecognitionArchitecture,
} from "./realityPressureRecognitionArchitecture";

export type GravityEntryState =
  | "PRESSURE_RECOGNITION_COMPLETED"
  | "GRAVITY_OBSERVATION_OPEN";

export type InertiaObservationLayer = Readonly<{
  semanticRole: "INERTIA_OBSERVATION";
  observationMode: "OBSERVE_PAST_RESPONSES";
  noBehaviorScoring: true;
  noPersonalityLabel: true;
  noUserConclusion: true;
}>;

export type AutomaticResponseLayer = Readonly<{
  semanticRole: "AUTOMATIC_RESPONSE_OBSERVATION";
  responseScope: "BODY_EMOTION_THOUGHT";
  outputMode: "OBSERVATION_NOT_ERROR_ANALYSIS";
  noCorrection: true;
  noBehaviorPrediction: true;
}>;

export type PatternRecognitionLayer = Readonly<{
  semanticRole: "REPEATED_LIFE_PATTERN_OBSERVATION";
  recognitionMode: "NOTICE_REPETITION";
  noPersonalityLabel: true;
  noDeficitConclusion: true;
  noDestinyJudgment: true;
}>;

export type InertiaTensionLayer = Readonly<{
  semanticRole: "INERTIA_REALITY_TENSION_OBSERVATION";
  tensionMode: "OBSERVE_OLD_RESPONSE_AGAINST_REALITY";
  noAnxietyManufacture: true;
  noBlame: true;
  noBehaviorAdvice: true;
}>;

export type ChoicePreparationBoundary = Readonly<{
  semanticRole: "CHOICE_SPACE_PREPARATION";
  choiceReadiness: "SPACE_OPEN_NOT_CHOICE";
  noChoiceResult: true;
  noNewBehavior: true;
  noBehaviorAdvice: true;
}>;

export type GravityExperienceInterventionBoundary = Readonly<{
  gravityExperienceOnly: true;
  noInertiaCalculation: true;
  noBehaviorScoring: true;
  noBehaviorPrediction: true;
  noUserEvaluation: true;
  noPersonalityJudgment: true;
  noUserConclusion: true;
  noBehaviorAdvice: true;
  noPressureMutation: true;
  noChoiceInvocation: true;
  noChoiceResult: true;
  noCrystalGeneration: true;
  noGenesisMutation: true;
  noIdentityMutation: true;
  noUserProfile: true;
  noStorageWrite: true;
  noUiIntegration: true;
  noRendererInvocation: true;
  noProductionIntegration: true;
  isolatedReviewOnly: true;
}>;

export type GravityExperienceReadiness =
  | "GRAVITY_EXPERIENCE_REVIEW_PENDING"
  | "CHOICE_READINESS_BOUNDARY_READY";

export type RealityGravityExperienceArchitecture = Readonly<{
  semanticRole: "REALITY_GRAVITY_EXPERIENCE_ARCHITECTURE";
  gravityEntryState: GravityEntryState;
  inertiaObservationLayer: InertiaObservationLayer;
  automaticResponseLayer: AutomaticResponseLayer;
  patternRecognitionLayer: PatternRecognitionLayer;
  inertiaTensionLayer: InertiaTensionLayer;
  choicePreparationBoundary: ChoicePreparationBoundary;
  interventionBoundary: GravityExperienceInterventionBoundary;
  readinessState: GravityExperienceReadiness;
  pressureRecognitionReference: RealityPressureRecognitionArchitecture;
  pressureGravityBoundary: "PRESSURE_OBSERVATION_TO_INERTIA_OBSERVATION";
  genesisBoundary: "GENESIS_REMAINS_ISOLATED";
}>;

export type RealityGravityExperienceArchitectureInput = Readonly<{
  pressureRecognitionArchitecture: RealityPressureRecognitionArchitecture | null;
}>;

export type RealityGravityExperienceArchitectureUnavailableReason =
  | "PRESSURE_RECOGNITION_ARCHITECTURE_REQUIRED"
  | "PRESSURE_RECOGNITION_ARCHITECTURE_UNAVAILABLE";

export type RealityGravityExperienceArchitectureBlockedReason =
  | "PRESSURE_RECOGNITION_ARCHITECTURE_INVALID"
  | "PRESSURE_GRAVITY_BOUNDARY_INVALID"
  | "GRAVITY_SCOPE_INVALID";

export type RealityGravityExperienceArchitectureBoundary = Readonly<{
  architectureReviewOnly: true;
  gravitySemanticOnly: true;
  noInertiaEngine: true;
  noBehaviorScoring: true;
  noBehaviorPrediction: true;
  noUserEvaluation: true;
  noPersonalityJudgment: true;
  noUserConclusion: true;
  noBehaviorAdvice: true;
  noPressureMutation: true;
  noChoice: true;
  noCrystal: true;
  noGenesisMutation: true;
  noIdentityMutation: true;
  noUserProfile: true;
  noStorage: true;
  noUi: true;
  noRenderer: true;
  noProductionIntegration: true;
}>;

export type RealityGravityExperienceArchitectureReady = Readonly<{
  status: "READY";
  readiness: "CHOICE_READINESS_BOUNDARY_READY";
  source: "reality_gravity_experience_architecture";
  input: RealityGravityExperienceArchitectureInput;
  architecture: RealityGravityExperienceArchitecture;
  boundary: RealityGravityExperienceArchitectureBoundary;
}>;

export type RealityGravityExperienceArchitectureUnavailable = Readonly<{
  status: "UNAVAILABLE";
  readiness: "UNAVAILABLE";
  source: "reality_gravity_experience_architecture";
  reason: RealityGravityExperienceArchitectureUnavailableReason;
  input: RealityGravityExperienceArchitectureInput;
  architecture: null;
  boundary: RealityGravityExperienceArchitectureBoundary;
}>;

export type RealityGravityExperienceArchitectureBlocked = Readonly<{
  status: "BLOCKED";
  readiness: "BLOCKED";
  source: "reality_gravity_experience_architecture";
  reason: RealityGravityExperienceArchitectureBlockedReason;
  input: RealityGravityExperienceArchitectureInput;
  architecture: null;
  boundary: RealityGravityExperienceArchitectureBoundary;
}>;

export type RealityGravityExperienceArchitectureResult =
  | RealityGravityExperienceArchitectureReady
  | RealityGravityExperienceArchitectureUnavailable
  | RealityGravityExperienceArchitectureBlocked;
