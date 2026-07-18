import type {
  PressureObservationState,
  PressureRecognitionGravityReadiness,
  PressureRecognitionInteractionAvailability,
  PressureRecognitionStageState,
  PressureTensionAwareness,
} from "./pressureRecognitionUIRuntime";
import type {
  RealityProductionRouteActivationAuthorization,
} from "./realityProductionRouteAuthorization";

export type RealityProductionPressureEvent =
  "PRESSURE_OBSERVATION_CONFIRM";

export type RealityProductionPressureConsumerBoundary = Readonly<{
  productionPressureConsumerOnly: true;
  authorizedRealitySourceOnly: true;
  existingPressureStateResolverOnly: true;
  reviewRuntimeResultNotExposed: true;
  sourceReferenceContinuityRequired: true;
  immutableSessionOnly: true;
  explicitObservationConfirmationRequired: true;
  gravityReadinessOutputOnly: true;
  noFixtureSource: true;
  noPrototypeSource: true;
  noDefaultSource: true;
  noPressureEngine: true;
  noPressureSeedMatching: true;
  noPressureResult: true;
  noDiagnosis: true;
  noPersonalityLabel: true;
  noGravityExecution: true;
  noChoiceExecution: true;
  noCrystalExecution: true;
  noRendererInvocation: true;
  noUiIntegration: true;
  noRouteMutation: true;
  noNavigationMutation: true;
  noStorageRead: true;
  noStorageWrite: true;
}>;

export type RealityProductionPressureSession = Readonly<{
  schemaVersion: "GUANYAO_REALITY_PRODUCTION_PRESSURE_SESSION_V1";
  source: "reality_production_pressure_consumer";
  sourceExperienceMode: "REAL_USER_EXPERIENCE";
  sourceProvenance: "REAL_USER_SESSION";
  sourceReferenceId: string;
  realityEntryEligibility: "ELIGIBLE";
  stateResolverReference: "pressure_recognition_ui_runtime";
  pressureStageState: PressureRecognitionStageState;
  observationState: PressureObservationState;
  tensionAwareness: PressureTensionAwareness;
  gravityReadiness: PressureRecognitionGravityReadiness;
  interactionAvailability: PressureRecognitionInteractionAvailability;
  pressureObservationConfirmed: boolean;
  boundary: RealityProductionPressureConsumerBoundary;
}>;

export type RealityProductionPressureConsumerInitializeInput = Readonly<{
  routeAuthorization: RealityProductionRouteActivationAuthorization;
}>;

export type RealityProductionPressureConsumerAdvanceInput = Readonly<{
  session: RealityProductionPressureSession;
  event: RealityProductionPressureEvent;
}>;

export type RealityProductionPressureConsumerBlockedReason =
  | "REALITY_ROUTE_AUTHORIZATION_REQUIRED"
  | "REALITY_SOURCE_CONTEXT_INVALID"
  | "FORBIDDEN_SOURCE_REFERENCE"
  | "SOURCE_REFERENCE_MISMATCH"
  | "PRESSURE_STATE_RESOLVER_NOT_READY"
  | "PRESSURE_SESSION_INVALID"
  | "PRESSURE_OBSERVATION_CONFIRM_NOT_AVAILABLE"
  | "PRESSURE_OBSERVATION_ALREADY_CONFIRMED";

export type RealityProductionPressureConsumerResult =
  | Readonly<{
      status: "READY";
      operation: "INITIALIZE" | "ADVANCE";
      session: RealityProductionPressureSession;
      reason: null;
      boundary: RealityProductionPressureConsumerBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      operation: "INITIALIZE" | "ADVANCE";
      session: RealityProductionPressureSession | null;
      reason: RealityProductionPressureConsumerBlockedReason;
      boundary: RealityProductionPressureConsumerBoundary;
    }>;
