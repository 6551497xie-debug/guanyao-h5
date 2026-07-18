import type {
  FirstLifeJourneyProductFlow,
  FirstLifeJourneyProductFlowResult,
} from "./firstLifeJourneyProductFlow";

export type LifeJourneyUIRuntimeExperienceRuntimeReference = Readonly<{
  semanticRole: "UI_RUNTIME_EXPERIENCE_RUNTIME_REFERENCE";
  source: "FIRST_LIFE_JOURNEY_PRODUCT_FLOW";
  runtimeInput: "PRODUCT_FLOW_RUNTIME_STATE_VISUAL_STATE";
  runtimeOutput: "CURRENT_STAGE_AND_ALLOWED_USER_ACTION";
  noLifeCalculation: true;
  noIdentityRead: true;
  noEngineResult: true;
  noStorageState: true;
}>;

export type LifeJourneyUIRuntimeConsumptionBoundary = Readonly<{
  semanticRole: "UI_RUNTIME_CONSUMPTION_BOUNDARY";
  consumes: "RUNTIME_STATE_AND_VISUAL_STATE";
  presentationOnly: true;
  interactionSurfaceOnly: true;
  noLifeDefinition: true;
  noEngineInvocation: true;
  noIdentitySourceRead: true;
  noStorageRead: true;
}>;

export type LifeJourneyUIRuntimeInteractionBoundary = Readonly<{
  semanticRole: "UI_RUNTIME_INTERACTION_BOUNDARY";
  allowedUserActions: readonly ["TIME_DELIVERY", "CHOICE_ACTIVE_RESPONSE"];
  automaticStages: readonly [
    "ENTRY_TO_GUANYAO",
    "GENESIS_REVEAL",
    "LIFE_RECOGNITION",
    "REALITY_ENTRY",
    "PRESSURE_RECOGNITION",
    "GRAVITY",
    "CRYSTAL_SETTLING",
  ];
  actionResponseRoute: "USER_ACTION_TO_RUNTIME_RESPONSE";
  noLifeSourceEditing: true;
  noAnimalSelection: true;
  noFourSymbolSelection: true;
  noHexagramSelection: true;
  noForceSelection: true;
}>;

export type LifeJourneyUIRuntimeVisualPresentationBoundary = Readonly<{
  semanticRole: "UI_RUNTIME_VISUAL_PRESENTATION_BOUNDARY";
  consumes: "VISUAL_STATE_REFERENCE";
  presentationOnly: true;
  noVisualSemanticCreation: true;
  noRendererCalculation: true;
  noIdentityRead: true;
  noEngineRead: true;
  noVisualStateMutation: true;
}>;

export type LifeJourneyUIRuntimeNavigationBoundary = Readonly<{
  semanticRole: "UI_RUNTIME_NAVIGATION_BOUNDARY";
  navigationMode: "EXPERIENCE_STAGE_TRANSITION_ONLY";
  spaces: readonly [
    "GENESIS_SPACE",
    "RECOGNITION_SPACE",
    "REALITY_SPACE",
    "CRYSTAL_SPACE",
  ];
  noRouteImplementation: true;
  noPageNavigation: true;
  noExternalNavigation: true;
  noBusinessFlow: true;
}>;

export type LifeJourneyUIRuntimeSpaceStructure = Readonly<{
  semanticRole: "LIFE_JOURNEY_SPACE_STRUCTURE";
  genesisSpace: "MOON_TO_STAR_BEAST_WITH_TIME_DELIVERY";
  recognitionSpace: "LIFE_RECOGNITION_WITH_REALITY_ENTRY_CONFIRMATION";
  realitySpace: "PRESSURE_TO_GRAVITY_TO_CHOICE";
  crystalSpace: "CHANGE_DEPOSITION_OBSERVATION";
  noPageComponentDefinition: true;
  noRouteDefinition: true;
}>;

export type LifeJourneyUIRuntimeImplementationBoundary = Readonly<{
  uiRuntimeReadinessOnly: true;
  noReactComponentImplementation: true;
  noPageImplementation: true;
  noRouteImplementation: true;
  noUiRendering: true;
  noStorageImplementation: true;
  noSessionPersistence: true;
  noUserAccount: true;
  noAuthentication: true;
  noPayment: true;
  noGenesisMutation: true;
  noRealityEngineImplementation: true;
  noGravityEngineImplementation: true;
  noChoiceEngineImplementation: true;
  noCrystalEngineImplementation: true;
  noProductionIntegration: true;
  isolatedReadinessReviewOnly: true;
}>;

export type LifeJourneyUIRuntimeReadinessState =
  "READY_FOR_UI_RUNTIME_IMPLEMENTATION";

export type LifeJourneyUIRuntimeReadiness = Readonly<{
  semanticRole: "LIFE_JOURNEY_UI_RUNTIME_READINESS";
  experienceRuntimeReference: LifeJourneyUIRuntimeExperienceRuntimeReference;
  uiConsumptionBoundary: LifeJourneyUIRuntimeConsumptionBoundary;
  interactionBoundary: LifeJourneyUIRuntimeInteractionBoundary;
  visualPresentationBoundary: LifeJourneyUIRuntimeVisualPresentationBoundary;
  navigationBoundary: LifeJourneyUIRuntimeNavigationBoundary;
  spaceStructure: LifeJourneyUIRuntimeSpaceStructure;
  experienceSequence: readonly [
    "ENTRY_TO_GUANYAO",
    "GENESIS",
    "LIFE_RECOGNITION",
    "REALITY_ENTRY",
    "PRESSURE_RECOGNITION",
    "GRAVITY",
    "CHOICE",
    "CRYSTAL",
  ];
  productFlowReference: FirstLifeJourneyProductFlow;
  readinessState: LifeJourneyUIRuntimeReadinessState;
  boundary: LifeJourneyUIRuntimeImplementationBoundary;
}>;

export type LifeJourneyUIRuntimeReadinessInput = Readonly<{
  firstLifeJourneyProductFlow: FirstLifeJourneyProductFlowResult | null;
}>;

export type LifeJourneyUIRuntimeReadinessUnavailableReason =
  | "FIRST_LIFE_JOURNEY_PRODUCT_FLOW_REQUIRED"
  | "FIRST_LIFE_JOURNEY_PRODUCT_FLOW_UNAVAILABLE";

export type LifeJourneyUIRuntimeReadinessBlockedReason =
  | "FIRST_LIFE_JOURNEY_PRODUCT_FLOW_BLOCKED"
  | "FIRST_LIFE_JOURNEY_PRODUCT_FLOW_BOUNDARY_INVALID"
  | "UI_RUNTIME_SEQUENCE_INVALID"
  | "UI_RUNTIME_INTERACTION_BOUNDARY_INVALID";

export type LifeJourneyUIRuntimeReadinessBoundary = Readonly<{
  readinessReviewOnly: true;
  noUiImplementation: true;
  noPageImplementation: true;
  noRouteImplementation: true;
  noStorage: true;
  noUserAccount: true;
  noAuthentication: true;
  noEngineResult: true;
  noProductionIntegration: true;
}>;

export type LifeJourneyUIRuntimeReadinessReady = Readonly<{
  status: "READY";
  readiness: LifeJourneyUIRuntimeReadinessState;
  source: "life_journey_ui_runtime_readiness";
  input: LifeJourneyUIRuntimeReadinessInput;
  readinessContract: LifeJourneyUIRuntimeReadiness;
  boundary: LifeJourneyUIRuntimeReadinessBoundary;
}>;

export type LifeJourneyUIRuntimeReadinessUnavailable = Readonly<{
  status: "UNAVAILABLE";
  readiness: "UNAVAILABLE";
  source: "life_journey_ui_runtime_readiness";
  reason: LifeJourneyUIRuntimeReadinessUnavailableReason;
  input: LifeJourneyUIRuntimeReadinessInput;
  readinessContract: null;
  boundary: LifeJourneyUIRuntimeReadinessBoundary;
}>;

export type LifeJourneyUIRuntimeReadinessBlocked = Readonly<{
  status: "BLOCKED";
  readiness: "BLOCKED";
  source: "life_journey_ui_runtime_readiness";
  reason: LifeJourneyUIRuntimeReadinessBlockedReason;
  input: LifeJourneyUIRuntimeReadinessInput;
  readinessContract: null;
  boundary: LifeJourneyUIRuntimeReadinessBoundary;
}>;

export type LifeJourneyUIRuntimeReadinessResult =
  | LifeJourneyUIRuntimeReadinessReady
  | LifeJourneyUIRuntimeReadinessUnavailable
  | LifeJourneyUIRuntimeReadinessBlocked;
