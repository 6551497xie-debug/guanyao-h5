import type {
  FirstLifeJourneyExperienceFlow,
  FirstLifeJourneyExperienceFlowResult,
} from "./firstLifeJourneyExperienceFlow";

export type ProductExperienceRuntimeBoundary = Readonly<{
  semanticRole: "PRODUCT_EXPERIENCE_RUNTIME_BOUNDARY";
  consumes: "FIRST_LIFE_JOURNEY_EXPERIENCE_FLOW";
  owns: "EXPERIENCE_SEQUENCE_AND_CURRENT_STAGE";
  temporaryStateOnly: true;
  noLifeCalculation: true;
  noIdentityCalculation: true;
  noEngineResult: true;
  noGenesisMutation: true;
  noRealityCalculation: true;
  noCrystalGeneration: true;
}>;

export type ProductExperienceUIConsumptionBoundary = Readonly<{
  semanticRole: "PRODUCT_EXPERIENCE_UI_CONSUMPTION_BOUNDARY";
  consumes: "EXPERIENCE_FLOW_RUNTIME_STATE_VISUAL_STATE";
  presentationAndInteractionOnly: true;
  noLifeDefinition: true;
  noIdentitySourceRead: true;
  noEngineRead: true;
  noStorageRead: true;
  noStageDefinition: true;
}>;

export type ProductExperienceSessionBoundary = Readonly<{
  semanticRole: "PRODUCT_EXPERIENCE_SESSION_BOUNDARY";
  sessionMode: "ONE_FIRST_LIFE_JOURNEY_SESSION";
  temporaryState: readonly [
    "CURRENT_JOURNEY_STAGE",
    "CURRENT_TRANSITION",
    "CURRENT_CHOICE_WINDOW",
  ];
  noLongTermPersistence: true;
  noAccountRequired: true;
  noStorageWrite: true;
  noArchiveBrowsing: true;
}>;

export type ProductExperiencePersistenceBoundary = Readonly<{
  semanticRole: "FUTURE_PERSISTENCE_BOUNDARY";
  futureScope: readonly ["CRYSTAL", "ARCHIVE_BOUNDARY"];
  implementationState: "NOT_IMPLEMENTED";
  noStorageSchema: true;
  noStorageWrite: true;
  noDataPersistence: true;
  noArchiveImplementation: true;
}>;

export type ProductExperienceUserOwnershipBoundary = Readonly<{
  semanticRole: "FUTURE_USER_OWNERSHIP_BOUNDARY";
  ownershipState: "NOT_IMPLEMENTED";
  futureRelation: "USER_TO_LIFE_JOURNEY";
  noUserAccount: true;
  noAuthentication: true;
  noUserBinding: true;
  noIdentityMutation: true;
}>;

export type ProductExperienceImplementationBoundary = Readonly<{
  implementationReadinessOnly: true;
  noUiImplementation: true;
  noRouteImplementation: true;
  noSessionImplementation: true;
  noStorageImplementation: true;
  noUserAccountImplementation: true;
  noAuthenticationImplementation: true;
  noPayment: true;
  noGenesisMutation: true;
  noRealityEngineImplementation: true;
  noGravityEngineImplementation: true;
  noChoiceEngineImplementation: true;
  noCrystalEngineImplementation: true;
  noProductionIntegration: true;
  isolatedBoundaryReviewOnly: true;
}>;

export type ProductExperienceReadinessState =
  "READY_FOR_PRODUCT_EXPERIENCE_IMPLEMENTATION_DESIGN";

export type ProductExperienceImplementationReadiness = Readonly<{
  semanticRole: "PRODUCT_EXPERIENCE_IMPLEMENTATION_READINESS";
  experienceRuntimeBoundary: ProductExperienceRuntimeBoundary;
  uiConsumptionBoundary: ProductExperienceUIConsumptionBoundary;
  sessionBoundary: ProductExperienceSessionBoundary;
  persistenceBoundary: ProductExperiencePersistenceBoundary;
  userOwnershipBoundary: ProductExperienceUserOwnershipBoundary;
  firstExperienceSequence: readonly [
    "ENTRY_TO_GUANYAO",
    "GENESIS",
    "LIFE_RECOGNITION",
    "REALITY_ENTRY",
    "PRESSURE_RECOGNITION",
    "GRAVITY",
    "CHOICE",
    "CRYSTAL",
  ];
  activeParticipationNodes: readonly [
    "TIME_DELIVERY",
    "CHOICE_ACTIVE_RESPONSE",
  ];
  firstLifeJourneyExperienceFlowReference: FirstLifeJourneyExperienceFlow;
  readinessState: ProductExperienceReadinessState;
  boundary: ProductExperienceImplementationBoundary;
}>;

export type ProductExperienceImplementationReadinessInput = Readonly<{
  firstLifeJourneyExperienceFlow: FirstLifeJourneyExperienceFlowResult | null;
}>;

export type ProductExperienceImplementationReadinessUnavailableReason =
  | "FIRST_LIFE_JOURNEY_EXPERIENCE_FLOW_REQUIRED"
  | "FIRST_LIFE_JOURNEY_EXPERIENCE_FLOW_UNAVAILABLE";

export type ProductExperienceImplementationReadinessBlockedReason =
  | "FIRST_LIFE_JOURNEY_EXPERIENCE_FLOW_BLOCKED"
  | "FIRST_LIFE_JOURNEY_FLOW_BOUNDARY_INVALID"
  | "PRODUCT_EXPERIENCE_SEQUENCE_INVALID"
  | "PRODUCT_EXPERIENCE_PARTICIPATION_BOUNDARY_INVALID"
  | "PRODUCT_UI_CONSUMPTION_BOUNDARY_INVALID"
  | "PRODUCT_SESSION_BOUNDARY_INVALID"
  | "PRODUCT_PERSISTENCE_BOUNDARY_INVALID"
  | "PRODUCT_USER_OWNERSHIP_BOUNDARY_INVALID";

export type ProductExperienceImplementationReadinessBoundary = Readonly<{
  readinessReviewOnly: true;
  noUiImplementation: true;
  noRouteImplementation: true;
  noUserAccount: true;
  noAuthentication: true;
  noStorage: true;
  noPayment: true;
  noLifeCalculation: true;
  noEngineResult: true;
  noProductionIntegration: true;
}>;

export type ProductExperienceImplementationReadinessReady = Readonly<{
  status: "READY";
  readiness: ProductExperienceReadinessState;
  source: "product_experience_implementation_readiness";
  input: ProductExperienceImplementationReadinessInput;
  readinessContract: ProductExperienceImplementationReadiness;
  boundary: ProductExperienceImplementationReadinessBoundary;
}>;

export type ProductExperienceImplementationReadinessUnavailable = Readonly<{
  status: "UNAVAILABLE";
  readiness: "UNAVAILABLE";
  source: "product_experience_implementation_readiness";
  reason: ProductExperienceImplementationReadinessUnavailableReason;
  input: ProductExperienceImplementationReadinessInput;
  readinessContract: null;
  boundary: ProductExperienceImplementationReadinessBoundary;
}>;

export type ProductExperienceImplementationReadinessBlocked = Readonly<{
  status: "BLOCKED";
  readiness: "BLOCKED";
  source: "product_experience_implementation_readiness";
  reason: ProductExperienceImplementationReadinessBlockedReason;
  input: ProductExperienceImplementationReadinessInput;
  readinessContract: null;
  boundary: ProductExperienceImplementationReadinessBoundary;
}>;

export type ProductExperienceImplementationReadinessResult =
  | ProductExperienceImplementationReadinessReady
  | ProductExperienceImplementationReadinessUnavailable
  | ProductExperienceImplementationReadinessBlocked;
