export type RealityPressureEntryState =
  | "REALITY_ENTRY_RECEIVED"
  | "PRESSURE_RECOGNITION_NOT_STARTED";

export type RealitySignalLayer = Readonly<{
  semanticRole: "REALITY_SIGNAL_OBSERVATION";
  observationMode: "OBSERVE_REALITY_INFLUENCES";
  userQuestion: "WHAT_IS_ACTING_ON_ME";
  noPressureCalculation: true;
  noDiagnosis: true;
  noUserJudgment: true;
}>;

export type RealityPressureObservationScope =
  | "RELATION_TENSION"
  | "GOAL_TENSION"
  | "ENVIRONMENTAL_CHANGE"
  | "INNER_OUTER_CONFLICT";

export type PressureObservationLayer = Readonly<{
  semanticRole: "PRESSURE_TENSION_OBSERVATION";
  observationMode: "USER_PARTICIPATORY_OBSERVATION";
  observationScopes: readonly [
    "RELATION_TENSION",
    "GOAL_TENSION",
    "ENVIRONMENTAL_CHANGE",
    "INNER_OUTER_CONFLICT",
  ];
  outputMode: "OBSERVATION_NOT_CONCLUSION";
  noPersonalityLabel: true;
  noDestinyJudgment: true;
}>;

export type InertiaPreparationLayer = Readonly<{
  semanticRole: "INERTIA_OBSERVATION_PREPARATION";
  preparationMode: "OBSERVE_PRIOR_RESPONSE";
  gravityPreparationOnly: true;
  noCriticism: true;
  noBehaviorAdvice: true;
  noChoiceResolution: true;
}>;

export type PressureRecognitionInterventionBoundary = Readonly<{
  pressureRecognitionOnly: true;
  noPressureCalculation: true;
  noPressureSeedMatching: true;
  noUserJudgment: true;
  noPersonalityConclusion: true;
  noDestinyJudgment: true;
  noBehaviorAdvice: true;
  noGravityInvocation: true;
  noChoiceInvocation: true;
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

export type RealityExperienceArchitectureReference = Readonly<{
  referenceType: "REALITY_EXPERIENCE_ARCHITECTURE_REFERENCE";
  referenceId: string;
  sourceRole: "REALITY_EXPERIENCE_ARCHITECTURE";
  realityStage: "REALITY_ENTRY";
  genesisBoundary: "GENESIS_COMPLETION_HELD";
  pressureRecognitionNotStarted: true;
  noPressureResult: true;
  noGravityResult: true;
  noChoiceResult: true;
  noCrystalResult: true;
  noUserProfile: true;
}>;

export type RealityPressureRecognitionReadiness =
  | "PRESSURE_RECOGNITION_REVIEW_PENDING"
  | "PRESSURE_RECOGNITION_BOUNDARY_READY";

export type RealityPressureRecognitionArchitecture = Readonly<{
  semanticRole: "REALITY_PRESSURE_RECOGNITION_ARCHITECTURE";
  pressureEntryState: RealityPressureEntryState;
  realitySignalLayer: RealitySignalLayer;
  pressureObservationLayer: PressureObservationLayer;
  inertiaPreparationLayer: InertiaPreparationLayer;
  interventionBoundary: PressureRecognitionInterventionBoundary;
  readinessState: RealityPressureRecognitionReadiness;
  realityExperienceArchitectureReference: RealityExperienceArchitectureReference;
  genesisBoundary: "GENESIS_COMPLETION_HELD_AND_NOT_REDEFINED";
}>;

export type RealityPressureRecognitionArchitectureInput = Readonly<{
  realityExperienceArchitectureReference: RealityExperienceArchitectureReference | null;
}>;

export type RealityPressureRecognitionArchitectureUnavailableReason =
  | "REALITY_EXPERIENCE_ARCHITECTURE_REFERENCE_REQUIRED"
  | "REALITY_EXPERIENCE_ARCHITECTURE_REVIEW_UNAVAILABLE";

export type RealityPressureRecognitionArchitectureBlockedReason =
  | "REALITY_EXPERIENCE_ARCHITECTURE_REFERENCE_INVALID"
  | "GENESIS_BOUNDARY_INVALID"
  | "PRESSURE_RECOGNITION_SCOPE_INVALID";

export type RealityPressureRecognitionArchitectureBoundary = Readonly<{
  architectureReviewOnly: true;
  pressureRecognitionSemanticOnly: true;
  noPressureEngine: true;
  noPressureSeedMatching: true;
  noDiagnosis: true;
  noUserJudgment: true;
  noGravity: true;
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

export type RealityPressureRecognitionArchitectureReady = Readonly<{
  status: "READY";
  readiness: "PRESSURE_RECOGNITION_BOUNDARY_READY";
  source: "reality_pressure_recognition_architecture";
  input: RealityPressureRecognitionArchitectureInput;
  architecture: RealityPressureRecognitionArchitecture;
  boundary: RealityPressureRecognitionArchitectureBoundary;
}>;

export type RealityPressureRecognitionArchitectureUnavailable = Readonly<{
  status: "UNAVAILABLE";
  readiness: "UNAVAILABLE";
  source: "reality_pressure_recognition_architecture";
  reason: RealityPressureRecognitionArchitectureUnavailableReason;
  input: RealityPressureRecognitionArchitectureInput;
  architecture: null;
  boundary: RealityPressureRecognitionArchitectureBoundary;
}>;

export type RealityPressureRecognitionArchitectureBlocked = Readonly<{
  status: "BLOCKED";
  readiness: "BLOCKED";
  source: "reality_pressure_recognition_architecture";
  reason: RealityPressureRecognitionArchitectureBlockedReason;
  input: RealityPressureRecognitionArchitectureInput;
  architecture: null;
  boundary: RealityPressureRecognitionArchitectureBoundary;
}>;

export type RealityPressureRecognitionArchitectureResult =
  | RealityPressureRecognitionArchitectureReady
  | RealityPressureRecognitionArchitectureUnavailable
  | RealityPressureRecognitionArchitectureBlocked;
