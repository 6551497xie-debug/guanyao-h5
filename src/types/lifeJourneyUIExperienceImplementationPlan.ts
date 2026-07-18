import type {
  LifeJourneyUIRuntimeReadiness,
  LifeJourneyUIRuntimeReadinessResult,
} from "./lifeJourneyUIRuntimeReadiness";

export type LifeJourneyUIExperienceSpaceArchitecture = Readonly<{
  semanticRole: "LIFE_JOURNEY_UI_SPACE_ARCHITECTURE";
  spaces: readonly [
    "GENESIS_SPACE",
    "RECOGNITION_SPACE",
    "REALITY_SPACE",
    "CRYSTAL_SPACE",
  ];
  genesisSpace: Readonly<{
    purpose: "LIFE_REVELATION_SPACE";
    consumes: readonly ["GENESIS_RUNTIME_STATE", "GENESIS_VISUAL_STATE"];
    presentation: "MOON_TO_STAR_BEAST";
    allowedInteraction: "TIME_DELIVERY";
    noLifeFormSelection: true;
    noGenesisEditing: true;
  }>;
  recognitionSpace: Readonly<{
    purpose: "LIFE_RECOGNITION_SPACE";
    consumes: readonly ["COMPLETION_STATE", "PRESENCE_STATE"];
    presentation: "PERSONAL_STAR_BEAST_PRESENCE_AND_RECOGNITION";
    allowedInteraction: "CONFIRM_REALITY_ENTRY";
    noResultReport: true;
  }>;
  realitySpace: Readonly<{
    purpose: "REALITY_EXPERIENCE_SPACE";
    consumes: readonly ["PRESSURE_STATE", "GRAVITY_STATE", "CHOICE_STATE"];
    presentation: "PRESSURE_TO_GRAVITY_TO_CHOICE";
    allowedInteraction: "CHOICE_ACTIVE_RESPONSE";
    noAiChoice: true;
  }>;
  crystalSpace: Readonly<{
    purpose: "CHANGE_DEPOSITION_SPACE";
    consumes: "CRYSTAL_EXPERIENCE_STATE";
    presentation: readonly ["CHANGE_IMPRINT", "FUTURE_CARRY"];
    allowedInteraction: "OBSERVE";
    noRewardPresentation: true;
  }>;
  noPageComponentDefinition: true;
  noRouteDefinition: true;
}>;

export type LifeJourneyUIExperienceStagePresentation = Readonly<{
  semanticRole: "UI_STAGE_PRESENTATION_RULE";
  source: "RUNTIME_STATE_AND_VISUAL_STATE";
  presentationOnly: true;
  stageOrder: readonly [
    "ENTRY_TO_GUANYAO",
    "GENESIS",
    "LIFE_RECOGNITION",
    "REALITY_ENTRY",
    "PRESSURE_RECOGNITION",
    "GRAVITY",
    "CHOICE",
    "CRYSTAL",
  ];
  noLifeDefinition: true;
  noIdentityInterpretation: true;
}>;

export type LifeJourneyUIExperienceInteractionMapping = Readonly<{
  semanticRole: "UI_INTERACTION_MAPPING";
  timeDelivery: Readonly<{
    inputStage: "TIME_RESONANCE";
    userAction: "TIME_DELIVERY";
    runtimeEvent: "TIME_DELIVERY_EVENT";
    response: "ADVANCE_GENESIS_RUNTIME";
  }>;
  recognitionConfirmation: Readonly<{
    inputStage: "LIFE_RECOGNITION";
    userAction: "CONFIRM_REALITY_ENTRY";
    runtimeEvent: "REALITY_ENTRY_CONFIRMATION_EVENT";
    response: "ADVANCE_REALITY_ENTRY";
  }>;
  choiceResponse: Readonly<{
    inputStage: "CHOICE";
    userAction: "CHOICE_ACTIVE_RESPONSE";
    runtimeEvent: "CHOICE_ACTIVE_RESPONSE_EVENT";
    response: "ADVANCE_TRANSFORMATION";
  }>;
  automaticStages: readonly [
    "ENTRY_TO_GUANYAO",
    "GENESIS_REVEAL",
    "PRESSURE_RECOGNITION",
    "GRAVITY",
    "CRYSTAL_SETTLING",
  ];
  noEngineInvocation: true;
  noStageMutation: true;
}>;

export type LifeJourneyUIExperienceRuntimeConsumption = Readonly<{
  semanticRole: "UI_RUNTIME_CONSUMPTION_MAPPING";
  input: "RUNTIME_STATE";
  output: "UI_PRESENTATION_AND_INTERACTION_EVENT";
  responsePath: "RUNTIME_EVENT_TO_RUNTIME_RESPONSE";
  runtimeOwnsStage: true;
  runtimeOwnsTransition: true;
  uiDoesNotAdvanceStage: true;
  uiDoesNotCallEngine: true;
}>;

export type LifeJourneyUIExperienceVisualConsumption = Readonly<{
  semanticRole: "UI_VISUAL_CONSUMPTION_MAPPING";
  input: "VISUAL_STATE_REFERENCE";
  output: "PRESENTATION_ONLY";
  noVisualSemanticCreation: true;
  noRendererCommandCreation: true;
  noVisualStateMutation: true;
}>;

export type LifeJourneyUIExperienceImplementationBoundary = Readonly<{
  implementationPlanOnly: true;
  noUiComponentCode: true;
  noPageImplementation: true;
  noRouteImplementation: true;
  noRuntimeWiring: true;
  noStorageSchema: true;
  noStorageWrite: true;
  noSessionPersistence: true;
  noUserAccount: true;
  noAuthentication: true;
  noPayment: true;
  noEngineResult: true;
  noGenesisMutation: true;
  noRealityMutation: true;
  noCrystalGeneration: true;
  noProductionIntegration: true;
  isolatedPlanOnly: true;
}>;

export type LifeJourneyUIExperienceImplementationScope = Readonly<{
  firstVersion: readonly [
    "GENESIS_SPACE",
    "RECOGNITION_SPACE",
    "REALITY_ENTRY",
  ];
  deferred: readonly [
    "COMPLETE_REALITY_EXPERIENCE",
    "CRYSTAL_PERSISTENCE",
    "ARCHIVE",
    "USER_ACCOUNT",
  ];
  rationale: "COMPLETE_FIRST_LIFE_RECOGNITION_BEFORE_LONG_TERM_SYSTEMS";
}>;

export type LifeJourneyUIExperienceImplementationPlan = Readonly<{
  semanticRole: "LIFE_JOURNEY_UI_EXPERIENCE_IMPLEMENTATION_PLAN";
  spaceArchitecture: LifeJourneyUIExperienceSpaceArchitecture;
  stagePresentation: LifeJourneyUIExperienceStagePresentation;
  interactionMapping: LifeJourneyUIExperienceInteractionMapping;
  runtimeConsumption: LifeJourneyUIExperienceRuntimeConsumption;
  visualConsumption: LifeJourneyUIExperienceVisualConsumption;
  implementationBoundary: LifeJourneyUIExperienceImplementationBoundary;
  implementationScope: LifeJourneyUIExperienceImplementationScope;
  uiRuntimeReadinessReference: LifeJourneyUIRuntimeReadiness;
  readinessState: "READY_FOR_UI_EXPERIENCE_IMPLEMENTATION";
}>;

export type LifeJourneyUIExperienceImplementationPlanInput = Readonly<{
  uiRuntimeReadiness: LifeJourneyUIRuntimeReadinessResult | null;
}>;

export type LifeJourneyUIExperienceImplementationPlanUnavailableReason =
  | "UI_RUNTIME_READINESS_REQUIRED"
  | "UI_RUNTIME_READINESS_UNAVAILABLE";

export type LifeJourneyUIExperienceImplementationPlanBlockedReason =
  | "UI_RUNTIME_READINESS_BLOCKED"
  | "UI_RUNTIME_READINESS_BOUNDARY_INVALID"
  | "UI_EXPERIENCE_SEQUENCE_INVALID"
  | "UI_INTERACTION_MAPPING_INVALID";

export type LifeJourneyUIExperienceImplementationPlanReviewBoundary = Readonly<{
  planReviewOnly: true;
  noUiImplementation: true;
  noRouteImplementation: true;
  noStorage: true;
  noUserAccount: true;
  noAuthentication: true;
  noEngineResult: true;
  noProductionIntegration: true;
}>;

export type LifeJourneyUIExperienceImplementationPlanReady = Readonly<{
  status: "READY";
  readiness: "READY_FOR_UI_EXPERIENCE_IMPLEMENTATION";
  source: "life_journey_ui_experience_implementation_plan";
  input: LifeJourneyUIExperienceImplementationPlanInput;
  plan: LifeJourneyUIExperienceImplementationPlan;
  boundary: LifeJourneyUIExperienceImplementationPlanReviewBoundary;
}>;

export type LifeJourneyUIExperienceImplementationPlanUnavailable = Readonly<{
  status: "UNAVAILABLE";
  readiness: "UNAVAILABLE";
  source: "life_journey_ui_experience_implementation_plan";
  reason: LifeJourneyUIExperienceImplementationPlanUnavailableReason;
  input: LifeJourneyUIExperienceImplementationPlanInput;
  plan: null;
  boundary: LifeJourneyUIExperienceImplementationPlanReviewBoundary;
}>;

export type LifeJourneyUIExperienceImplementationPlanBlocked = Readonly<{
  status: "BLOCKED";
  readiness: "BLOCKED";
  source: "life_journey_ui_experience_implementation_plan";
  reason: LifeJourneyUIExperienceImplementationPlanBlockedReason;
  input: LifeJourneyUIExperienceImplementationPlanInput;
  plan: null;
  boundary: LifeJourneyUIExperienceImplementationPlanReviewBoundary;
}>;

export type LifeJourneyUIExperienceImplementationPlanResult =
  | LifeJourneyUIExperienceImplementationPlanReady
  | LifeJourneyUIExperienceImplementationPlanUnavailable
  | LifeJourneyUIExperienceImplementationPlanBlocked;
