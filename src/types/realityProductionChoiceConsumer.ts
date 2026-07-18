import type {
  AlternativeResponseState,
  ChoiceCrystalReadiness,
  ChoiceExperienceInteractionAvailability,
  ChoiceExperienceStageState,
  ResponseGapState,
} from "./choiceExperienceUIRuntime";
import type {
  RealityProductionGravitySession,
} from "./realityProductionGravityConsumer";

export type RealityProductionChoiceEvent = "CHOICE_ACTIVE_RESPONSE";

export type RealityProductionChoiceConsumerBoundary = Readonly<{
  productionChoiceConsumerOnly: true;
  confirmedGravitySessionOnly: true;
  existingChoiceStateResolverOnly: true;
  reviewRuntimeResultNotExposed: true;
  sourceReferenceContinuityRequired: true;
  immutableSessionOnly: true;
  explicitActiveResponseRequired: true;
  crystalReadinessOutputOnly: true;
  userOwnedResponseOnly: true;
  noFixtureSource: true;
  noPrototypeSource: true;
  noDefaultSource: true;
  noBehaviorEngine: true;
  noRecommendedAction: true;
  noBestChoice: true;
  noBehaviorScore: true;
  noUserJudgement: true;
  noGravityMutation: true;
  noCrystalExecution: true;
  noRendererInvocation: true;
  noUiIntegration: true;
  noRouteMutation: true;
  noNavigationMutation: true;
  noStorageRead: true;
  noStorageWrite: true;
}>;

export type RealityProductionChoiceGravitySessionReference = Readonly<{
  schemaVersion: "GUANYAO_REALITY_PRODUCTION_GRAVITY_SESSION_V1";
  source: "reality_production_gravity_consumer";
  sourceReferenceId: string;
  gravityObservationConfirmed: true;
  choiceReadiness: "READY";
}>;

export type RealityProductionChoiceSession = Readonly<{
  schemaVersion: "GUANYAO_REALITY_PRODUCTION_CHOICE_SESSION_V1";
  source: "reality_production_choice_consumer";
  sourceExperienceMode: "REAL_USER_EXPERIENCE";
  sourceProvenance: "REAL_USER_SESSION";
  sourceReferenceId: string;
  gravitySessionReference: RealityProductionChoiceGravitySessionReference;
  stateResolverReference: "choice_experience_ui_runtime";
  choiceStageState: ChoiceExperienceStageState;
  responseGapState: ResponseGapState;
  alternativeResponseState: AlternativeResponseState;
  crystalReadiness: ChoiceCrystalReadiness;
  interactionAvailability: ChoiceExperienceInteractionAvailability;
  choiceActiveResponseConfirmed: boolean;
  boundary: RealityProductionChoiceConsumerBoundary;
}>;

export type RealityProductionChoiceConsumerInitializeInput = Readonly<{
  gravitySession: RealityProductionGravitySession;
}>;

export type RealityProductionChoiceConsumerAdvanceInput = Readonly<{
  session: RealityProductionChoiceSession;
  event: RealityProductionChoiceEvent;
}>;

export type RealityProductionChoiceConsumerBlockedReason =
  | "GRAVITY_SESSION_INVALID"
  | "FORBIDDEN_SOURCE_REFERENCE"
  | "CHOICE_NOT_READY"
  | "CHOICE_STATE_RESOLVER_NOT_READY"
  | "CHOICE_SESSION_INVALID"
  | "CHOICE_ACTIVE_RESPONSE_NOT_AVAILABLE"
  | "CHOICE_ACTIVE_RESPONSE_ALREADY_CONFIRMED";

export type RealityProductionChoiceConsumerResult =
  | Readonly<{
      status: "READY";
      operation: "INITIALIZE" | "ADVANCE";
      session: RealityProductionChoiceSession;
      reason: null;
      boundary: RealityProductionChoiceConsumerBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      operation: "INITIALIZE" | "ADVANCE";
      session: RealityProductionChoiceSession | null;
      reason: RealityProductionChoiceConsumerBlockedReason;
      boundary: RealityProductionChoiceConsumerBoundary;
    }>;
