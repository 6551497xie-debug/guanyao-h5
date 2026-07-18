import type { FirstLifeJourneyExperienceFlowResult } from "./firstLifeJourneyExperienceFlow";
import type { FirstLifeJourneyExperienceFlow } from "./firstLifeJourneyExperienceFlow";

export type FirstLifeJourneyProductFlowEntryStage = Readonly<{
  stage: "ENTRY_TO_GUANYAO";
  userPsychology: "CURIOSITY";
  experienceGoal: "ENTER_LIFE_OBSERVATION_SPACE";
  systemResponse: "OPEN_OBSERVATION_SPACE";
  userAction: "NONE_AUTOMATIC_ENTRY";
  noTestFeeling: true;
  noQuestionnaireFeeling: true;
  noCommercialFlow: true;
}>;

export type FirstLifeJourneyProductFlowGenesisStage = Readonly<{
  stage: "GENESIS";
  userPsychology: "EXPLORATION";
  visualSequence: readonly [
    "MOON",
    "STAR",
    "TIME",
    "SYMBOL",
    "HEXAGRAM",
    "FORCE",
    "BEAST",
  ];
  userAction: "TIME_DELIVERY";
  autoReveal: true;
  rhythm: "ENTERING";
  noAnimalSelection: true;
  noFourSymbolSelection: true;
  noHexagramSelection: true;
  noForceSelection: true;
  recognitionMoment: Readonly<{
    stage: "LIFE_RECOGNITION";
    userPsychology: "CONFIRMATION";
    experience: "SEE_PERSONAL_LIFE_FORM";
    outputMode: "RECOGNITION_NOT_RESULT_REPORT";
    noResultReport: true;
  }>;
}>;

export type FirstLifeJourneyProductFlowRealityTransitionStage = Readonly<{
  stage: "REALITY_ENTRY";
  userPsychology: "PREPARATION";
  experience: "CARRY_RECOGNITION_INTO_REALITY";
  systemResponse: "BRIDGE_TO_REALITY";
  noImmediateProblemAnalysis: true;
  noPressureResult: true;
}>;

export type FirstLifeJourneyProductFlowRealityExperienceStage = Readonly<{
  stage: "REALITY_EXPERIENCE";
  pressure: Readonly<{
    stage: "PRESSURE_RECOGNITION";
    userPsychology: "OBSERVATION";
    experience: "REALITY_TENSION_APPEARS";
    systemRole: "REFLECT_REALITY_SIGNALS";
  }>;
  gravity: Readonly<{
    stage: "GRAVITY";
    userPsychology: "AWARENESS";
    experience: "SEE_INERTIA_IN_OPERATION";
    systemRole: "REFLECT_AUTOMATIC_RESPONSE";
  }>;
  choice: Readonly<{
    stage: "CHOICE";
    userPsychology: "ACTIVE";
    experience: "NEW_RESPONSE_BECOMES_POSSIBLE";
    userAction: "CHOICE_ACTIVE_RESPONSE";
    systemRole: "OPEN_RESPONSE_SPACE";
  }>;
  noTaskFlow: true;
  noGameProgression: true;
  noStrongGuidance: true;
}>;

export type FirstLifeJourneyProductFlowTransformationStage = Readonly<{
  stage: "TRANSFORMATION";
  userPsychology: "ACTIVE";
  userAction: "CHOICE_ACTIVE_RESPONSE";
  experience: "A_NEW_RESPONSE_OCCURS";
  systemRole: "WITNESS_CHANGE_NOT_EVALUATE";
  noSystemAnswer: true;
  noBehaviorRecommendation: true;
}>;

export type FirstLifeJourneyProductFlowCompletionStage = Readonly<{
  stage: "CRYSTAL";
  userPsychology: "SETTLING";
  experience: "CHANGE_LEAVES_AN_IMPRINT";
  systemResponse: "DEPOSIT_CHANGE_NOT_REWARD";
  noRewardFeeling: true;
  noLevelFeeling: true;
  noCollectionFeeling: true;
}>;

export type FirstLifeJourneyProductFlowBoundary = Readonly<{
  productFlowDesignOnly: true;
  noUiStructure: true;
  noPageComponents: true;
  noRouteNavigation: true;
  noStorageSchema: true;
  noStorageWrite: true;
  noUserAccount: true;
  noAuthentication: true;
  noPayment: true;
  noSessionImplementation: true;
  noPersistence: true;
  noGenesisMutation: true;
  noRealityEngineImplementation: true;
  noGravityEngineImplementation: true;
  noChoiceEngineImplementation: true;
  noCrystalEngineImplementation: true;
  noProductionIntegration: true;
  isolatedDesignOnly: true;
}>;

export type FirstLifeJourneyProductFlow = Readonly<{
  semanticRole: "FIRST_LIFE_JOURNEY_PRODUCT_FLOW";
  entryStage: FirstLifeJourneyProductFlowEntryStage;
  genesisExperienceStage: FirstLifeJourneyProductFlowGenesisStage;
  realityTransitionStage: FirstLifeJourneyProductFlowRealityTransitionStage;
  realityExperienceStage: FirstLifeJourneyProductFlowRealityExperienceStage;
  transformationStage: FirstLifeJourneyProductFlowTransformationStage;
  completionStage: FirstLifeJourneyProductFlowCompletionStage;
  userInteractionPoints: readonly ["TIME_DELIVERY", "CHOICE_ACTIVE_RESPONSE"];
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
  firstLifeJourneyExperienceFlowReference: FirstLifeJourneyExperienceFlow;
  boundary: FirstLifeJourneyProductFlowBoundary;
}>;

export type FirstLifeJourneyProductFlowInput = Readonly<{
  firstLifeJourneyExperienceFlow: FirstLifeJourneyExperienceFlowResult | null;
}>;

export type FirstLifeJourneyProductFlowUnavailableReason =
  | "FIRST_LIFE_JOURNEY_EXPERIENCE_FLOW_REQUIRED"
  | "FIRST_LIFE_JOURNEY_EXPERIENCE_FLOW_UNAVAILABLE";

export type FirstLifeJourneyProductFlowBlockedReason =
  | "FIRST_LIFE_JOURNEY_EXPERIENCE_FLOW_BLOCKED"
  | "FIRST_LIFE_JOURNEY_EXPERIENCE_FLOW_BOUNDARY_INVALID"
  | "FIRST_PRODUCT_FLOW_SEQUENCE_INVALID"
  | "FIRST_PRODUCT_FLOW_INTERACTION_BOUNDARY_INVALID";

export type FirstLifeJourneyProductFlowReviewBoundary = Readonly<{
  flowDesignReviewOnly: true;
  noUiImplementation: true;
  noRouteImplementation: true;
  noStorage: true;
  noUserAccount: true;
  noAuthentication: true;
  noPayment: true;
  noEngineResult: true;
  noProductionIntegration: true;
}>;

export type FirstLifeJourneyProductFlowReady = Readonly<{
  status: "READY";
  readiness: "READY_FOR_FIRST_PRODUCT_EXPERIENCE_DESIGN";
  source: "first_life_journey_product_flow";
  input: FirstLifeJourneyProductFlowInput;
  productFlow: FirstLifeJourneyProductFlow;
  boundary: FirstLifeJourneyProductFlowReviewBoundary;
}>;

export type FirstLifeJourneyProductFlowUnavailable = Readonly<{
  status: "UNAVAILABLE";
  readiness: "UNAVAILABLE";
  source: "first_life_journey_product_flow";
  reason: FirstLifeJourneyProductFlowUnavailableReason;
  input: FirstLifeJourneyProductFlowInput;
  productFlow: null;
  boundary: FirstLifeJourneyProductFlowReviewBoundary;
}>;

export type FirstLifeJourneyProductFlowBlocked = Readonly<{
  status: "BLOCKED";
  readiness: "BLOCKED";
  source: "first_life_journey_product_flow";
  reason: FirstLifeJourneyProductFlowBlockedReason;
  input: FirstLifeJourneyProductFlowInput;
  productFlow: null;
  boundary: FirstLifeJourneyProductFlowReviewBoundary;
}>;

export type FirstLifeJourneyProductFlowResult =
  | FirstLifeJourneyProductFlowReady
  | FirstLifeJourneyProductFlowUnavailable
  | FirstLifeJourneyProductFlowBlocked;
