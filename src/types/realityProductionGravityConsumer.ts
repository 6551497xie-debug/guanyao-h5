import type {
  AutomaticResponseState,
  GravityChoiceReadiness,
  GravityExperienceInteractionAvailability,
  GravityExperienceStageState,
  PatternAwarenessState,
} from "./gravityExperienceUIRuntime";
import type {
  RealityProductionPressureSession,
} from "./realityProductionPressureConsumer";

export type RealityProductionGravityEvent = "GRAVITY_OBSERVATION_CONFIRM";

export type RealityProductionGravityConsumerBoundary = Readonly<{
  productionGravityConsumerOnly: true;
  confirmedPressureSessionOnly: true;
  existingGravityStateResolverOnly: true;
  reviewRuntimeResultNotExposed: true;
  sourceReferenceContinuityRequired: true;
  immutableSessionOnly: true;
  explicitObservationConfirmationRequired: true;
  choiceReadinessOutputOnly: true;
  noFixtureSource: true;
  noPrototypeSource: true;
  noDefaultSource: true;
  noInertiaEngine: true;
  noBehaviorScoring: true;
  noBehaviorPrediction: true;
  noUserDiagnosis: true;
  noPersonalityLabel: true;
  noPressureMutation: true;
  noChoiceExecution: true;
  noCrystalExecution: true;
  noRendererInvocation: true;
  noUiIntegration: true;
  noRouteMutation: true;
  noNavigationMutation: true;
  noStorageRead: true;
  noStorageWrite: true;
}>;

export type RealityProductionGravityPressureSessionReference = Readonly<{
  schemaVersion: "GUANYAO_REALITY_PRODUCTION_PRESSURE_SESSION_V1";
  source: "reality_production_pressure_consumer";
  sourceReferenceId: string;
  pressureObservationConfirmed: true;
  gravityReadiness: "READY";
}>;

export type RealityProductionGravitySession = Readonly<{
  schemaVersion: "GUANYAO_REALITY_PRODUCTION_GRAVITY_SESSION_V1";
  source: "reality_production_gravity_consumer";
  sourceExperienceMode: "REAL_USER_EXPERIENCE";
  sourceProvenance: "REAL_USER_SESSION";
  sourceReferenceId: string;
  pressureSessionReference: RealityProductionGravityPressureSessionReference;
  stateResolverReference: "gravity_experience_ui_runtime";
  gravityStageState: GravityExperienceStageState;
  automaticResponseState: AutomaticResponseState;
  patternAwarenessState: PatternAwarenessState;
  choiceReadiness: GravityChoiceReadiness;
  interactionAvailability: GravityExperienceInteractionAvailability;
  gravityObservationConfirmed: boolean;
  boundary: RealityProductionGravityConsumerBoundary;
}>;

export type RealityProductionGravityConsumerInitializeInput = Readonly<{
  pressureSession: RealityProductionPressureSession;
}>;

export type RealityProductionGravityConsumerAdvanceInput = Readonly<{
  session: RealityProductionGravitySession;
  event: RealityProductionGravityEvent;
}>;

export type RealityProductionGravityConsumerBlockedReason =
  | "PRESSURE_SESSION_INVALID"
  | "FORBIDDEN_SOURCE_REFERENCE"
  | "GRAVITY_NOT_READY"
  | "GRAVITY_STATE_RESOLVER_NOT_READY"
  | "GRAVITY_SESSION_INVALID"
  | "GRAVITY_OBSERVATION_CONFIRM_NOT_AVAILABLE"
  | "GRAVITY_OBSERVATION_ALREADY_CONFIRMED";

export type RealityProductionGravityConsumerResult =
  | Readonly<{
      status: "READY";
      operation: "INITIALIZE" | "ADVANCE";
      session: RealityProductionGravitySession;
      reason: null;
      boundary: RealityProductionGravityConsumerBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      operation: "INITIALIZE" | "ADVANCE";
      session: RealityProductionGravitySession | null;
      reason: RealityProductionGravityConsumerBlockedReason;
      boundary: RealityProductionGravityConsumerBoundary;
    }>;
