import type { LifeJourneyArchitecture } from "./lifeJourneyArchitecture";

export type FirstLifeJourneyStage =
  | "ENTRY_TO_GUANYAO"
  | "GENESIS"
  | "LIFE_RECOGNITION"
  | "REALITY_ENTRY"
  | "PRESSURE_RECOGNITION"
  | "GRAVITY"
  | "CHOICE"
  | "CRYSTAL";

export type FirstLifeJourneyEntryExperience = Readonly<{
  semanticRole: "GUANYAO_ENTRY_EXPERIENCE";
  userState: "CURIOSITY";
  goal: "ENTER_LIFE_OBSERVATION_SPACE";
  noTestEntry: true;
  noQuestionnaireEntry: true;
  noCommercialFlow: true;
}>;

export type FirstLifeJourneyGenesisJourney = Readonly<{
  semanticRole: "FIRST_GENESIS_JOURNEY";
  visualSequence: readonly [
    "MOON",
    "STAR",
    "TIME",
    "SYMBOL",
    "HEXAGRAM",
    "FORCE",
    "BEAST",
  ];
  userState: "EXPLORATION";
  userParticipation: "TIME_DELIVERY_ONLY";
  rhythm: "SLOW_STATIC_ENTERING";
  noUserAnimalChoice: true;
  noUserFourSymbolChoice: true;
  noUserHexagramChoice: true;
  noUserMotherCodeChoice: true;
}>;

export type FirstLifeJourneyRecognitionMoment = Readonly<{
  semanticRole: "LIFE_RECOGNITION_MOMENT";
  userState: "CONFIRMATION";
  experience: "SEE_PERSONAL_LIFE_FORM";
  outputMode: "RECOGNITION_NOT_RESULT_REPORT";
  noResultReport: true;
  noCollectionAction: true;
}>;

export type FirstLifeJourneyRealityTransition = Readonly<{
  semanticRole: "GENESIS_TO_REALITY_TRANSITION";
  userState: "PREPARATION";
  transitionIntent: "CARRY_RECOGNITION_INTO_WORLD";
  outputMode: "BRIDGE_NOT_ANALYSIS";
  noImmediateProblemAnalysis: true;
  noPressureResult: true;
}>;

export type FirstLifeJourneyRealityJourney = Readonly<{
  semanticRole: "FIRST_REALITY_JOURNEY";
  stages: readonly [
    "PRESSURE_RECOGNITION",
    "GRAVITY",
    "CHOICE",
  ];
  userStates: readonly ["OBSERVATION", "AWARENESS", "SPACE_OPENING"];
  rhythm: "OBSERVE_AWARE_CHOOSE";
  noTaskFlow: true;
  noGameProgression: true;
}>;

export type FirstLifeJourneyTransformationMoment = Readonly<{
  semanticRole: "FIRST_TRANSFORMATION_MOMENT";
  userState: "ACTIVE_RESPONSE";
  choiceParticipation: "CHOICE_ACTIVE_RESPONSE";
  outputMode: "NEW_RESPONSE_NOT_SYSTEM_ANSWER";
  noSystemDecision: true;
  noBehaviorRecommendation: true;
}>;

export type FirstLifeJourneyCompletionState = Readonly<{
  semanticRole: "FIRST_CRYSTAL_COMPLETION";
  userState: "SETTLING";
  experience: "CHANGE_LEAVES_A_TRACE";
  outputMode: "DEPOSITION_NOT_REWARD";
  noReward: true;
  noLevel: true;
  noStorageRecord: true;
}>;

export type FirstLifeJourneyExperienceBoundary = Readonly<{
  experienceFlowReviewOnly: true;
  noUiIntegration: true;
  noRouteIntegration: true;
  noUserAccount: true;
  noStorageWrite: true;
  noPayment: true;
  noIdentityCalculation: true;
  noEngineResult: true;
  noPageNavigation: true;
  noBusinessLogic: true;
  noGenesisMutation: true;
  noRealityCalculation: true;
  noCrystalGeneration: true;
  noArchiveGeneration: true;
  noRendererInvocation: true;
  noProductionIntegration: true;
  isolatedReviewOnly: true;
}>;

export type FirstLifeJourneyExperienceFlow = Readonly<{
  semanticRole: "FIRST_LIFE_JOURNEY_EXPERIENCE_FLOW";
  entryExperience: FirstLifeJourneyEntryExperience;
  genesisJourney: FirstLifeJourneyGenesisJourney;
  recognitionMoment: FirstLifeJourneyRecognitionMoment;
  realityTransition: FirstLifeJourneyRealityTransition;
  realityJourney: FirstLifeJourneyRealityJourney;
  transformationMoment: FirstLifeJourneyTransformationMoment;
  completionState: FirstLifeJourneyCompletionState;
  stageSequence: readonly [
    "ENTRY_TO_GUANYAO",
    "GENESIS",
    "LIFE_RECOGNITION",
    "REALITY_ENTRY",
    "PRESSURE_RECOGNITION",
    "GRAVITY",
    "CHOICE",
    "CRYSTAL",
  ];
  activeParticipationNodes: readonly ["TIME_DELIVERY", "CHOICE_ACTIVE_RESPONSE"];
  lifeJourneyArchitectureReference: LifeJourneyArchitecture;
  boundary: FirstLifeJourneyExperienceBoundary;
}>;

export type FirstLifeJourneyExperienceFlowInput = Readonly<{
  lifeJourneyArchitecture: LifeJourneyArchitecture | null;
}>;

export type FirstLifeJourneyExperienceFlowUnavailableReason =
  | "LIFE_JOURNEY_ARCHITECTURE_REQUIRED"
  | "LIFE_JOURNEY_ARCHITECTURE_UNAVAILABLE";

export type FirstLifeJourneyExperienceFlowBlockedReason =
  | "LIFE_JOURNEY_ARCHITECTURE_INVALID"
  | "FIRST_LIFE_JOURNEY_SEQUENCE_INVALID"
  | "ACTIVE_PARTICIPATION_BOUNDARY_INVALID";

export type FirstLifeJourneyExperienceFlowBoundary = Readonly<{
  flowReviewOnly: true;
  noUi: true;
  noRoute: true;
  noUserAccount: true;
  noStorage: true;
  noPayment: true;
  noIdentityCalculation: true;
  noEngineResult: true;
  noBusinessLogic: true;
  noGenesisMutation: true;
  noRealityCalculation: true;
  noCrystalGeneration: true;
  noArchiveGeneration: true;
  noProductionIntegration: true;
}>;

export type FirstLifeJourneyExperienceFlowReady = Readonly<{
  status: "READY";
  readiness: "FUTURE_PRODUCT_EXPERIENCE_DESIGN_READY";
  source: "first_life_journey_experience_flow";
  input: FirstLifeJourneyExperienceFlowInput;
  flow: FirstLifeJourneyExperienceFlow;
  boundary: FirstLifeJourneyExperienceFlowBoundary;
}>;

export type FirstLifeJourneyExperienceFlowUnavailable = Readonly<{
  status: "UNAVAILABLE";
  readiness: "UNAVAILABLE";
  source: "first_life_journey_experience_flow";
  reason: FirstLifeJourneyExperienceFlowUnavailableReason;
  input: FirstLifeJourneyExperienceFlowInput;
  flow: null;
  boundary: FirstLifeJourneyExperienceFlowBoundary;
}>;

export type FirstLifeJourneyExperienceFlowBlocked = Readonly<{
  status: "BLOCKED";
  readiness: "BLOCKED";
  source: "first_life_journey_experience_flow";
  reason: FirstLifeJourneyExperienceFlowBlockedReason;
  input: FirstLifeJourneyExperienceFlowInput;
  flow: null;
  boundary: FirstLifeJourneyExperienceFlowBoundary;
}>;

export type FirstLifeJourneyExperienceFlowResult =
  | FirstLifeJourneyExperienceFlowReady
  | FirstLifeJourneyExperienceFlowUnavailable
  | FirstLifeJourneyExperienceFlowBlocked;
