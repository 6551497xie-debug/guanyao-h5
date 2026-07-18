export type GravityExperienceStageState =
  | "INERTIA_OBSERVATION"
  | "AUTOMATIC_RESPONSE_AWARENESS"
  | "CHOICE_READY";

export type InertiaObservationReference = "PRESSURE_RECOGNITION_UI_RUNTIME";

export type AutomaticResponseState =
  | "WAITING_FOR_GRAVITY"
  | "VISIBLE"
  | "ACKNOWLEDGED";

export type PatternAwarenessState = "UNSEEN" | "EMERGING" | "ACKNOWLEDGED";

export type GravityChoiceReadiness = "NOT_READY" | "READY";

export type GravityExperienceInteractionAvailability =
  | "NONE"
  | "GRAVITY_OBSERVATION_CONFIRM";

export type GravityExperienceUIRuntimeBoundary = Readonly<{
  inertiaObservationOnly: true;
  noBehaviorScore: true;
  noPersonalityLabel: true;
  noUserDiagnosis: true;
  noChoiceResult: true;
  noCrystalResult: true;
  noIdentitySource: true;
  noStorage: true;
  noAccount: true;
  noEngineInvocation: true;
}>;

export type GravityExperienceUIRuntime = Readonly<{
  semanticRole: "GRAVITY_EXPERIENCE_UI_RUNTIME";
  gravityStageState: GravityExperienceStageState;
  inertiaObservationReference: InertiaObservationReference;
  automaticResponseState: AutomaticResponseState;
  patternAwarenessState: PatternAwarenessState;
  choiceReadiness: GravityChoiceReadiness;
  interactionAvailability: GravityExperienceInteractionAvailability;
  gravityObservationConfirmed: boolean;
  boundary: GravityExperienceUIRuntimeBoundary;
}>;

export type GravityExperienceUIRuntimeInput = Readonly<{
  gravityReady: boolean;
  gravityObservationConfirmed: boolean;
}>;

export type GravityExperienceUIRuntimeUnavailableReason =
  | "GRAVITY_READY_REQUIRED";

export type GravityExperienceUIRuntimeBlockedReason =
  | "GRAVITY_OBSERVATION_BEFORE_GRAVITY_READY";

export type GravityExperienceUIRuntimeReviewBoundary = Readonly<{
  inertiaReviewOnly: true;
  noBehaviorScore: true;
  noPersonalityLabel: true;
  noUserDiagnosis: true;
  noChoiceExecution: true;
  noCrystalExecution: true;
  noStorage: true;
  noAccount: true;
}>;

export type GravityExperienceUIRuntimeReady = Readonly<{
  status: "READY";
  source: "gravity_experience_ui_runtime";
  uiRuntime: GravityExperienceUIRuntime;
  input: GravityExperienceUIRuntimeInput;
  boundary: GravityExperienceUIRuntimeReviewBoundary;
}>;

export type GravityExperienceUIRuntimeUnavailable = Readonly<{
  status: "UNAVAILABLE";
  source: "gravity_experience_ui_runtime";
  reason: GravityExperienceUIRuntimeUnavailableReason;
  uiRuntime: null;
  input: GravityExperienceUIRuntimeInput;
  boundary: GravityExperienceUIRuntimeReviewBoundary;
}>;

export type GravityExperienceUIRuntimeBlocked = Readonly<{
  status: "BLOCKED";
  source: "gravity_experience_ui_runtime";
  reason: GravityExperienceUIRuntimeBlockedReason;
  uiRuntime: GravityExperienceUIRuntime;
  input: GravityExperienceUIRuntimeInput;
  boundary: GravityExperienceUIRuntimeReviewBoundary;
}>;

export type GravityExperienceUIRuntimeResult =
  | GravityExperienceUIRuntimeReady
  | GravityExperienceUIRuntimeUnavailable
  | GravityExperienceUIRuntimeBlocked;
