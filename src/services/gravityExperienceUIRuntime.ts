import type {
  AutomaticResponseState,
  GravityChoiceReadiness,
  GravityExperienceInteractionAvailability,
  GravityExperienceStageState,
  GravityExperienceUIRuntime,
  GravityExperienceUIRuntimeBlocked,
  GravityExperienceUIRuntimeBlockedReason,
  GravityExperienceUIRuntimeInput,
  GravityExperienceUIRuntimeResult,
  GravityExperienceUIRuntimeReviewBoundary,
  GravityExperienceUIRuntimeUnavailable,
  GravityExperienceUIRuntimeUnavailableReason,
  PatternAwarenessState,
} from "../types/gravityExperienceUIRuntime";

const REVIEW_BOUNDARY: GravityExperienceUIRuntimeReviewBoundary = Object.freeze({
  inertiaReviewOnly: true,
  noBehaviorScore: true,
  noPersonalityLabel: true,
  noUserDiagnosis: true,
  noChoiceExecution: true,
  noCrystalExecution: true,
  noStorage: true,
  noAccount: true,
});

const UI_BOUNDARY = Object.freeze({
  inertiaObservationOnly: true,
  noBehaviorScore: true,
  noPersonalityLabel: true,
  noUserDiagnosis: true,
  noChoiceResult: true,
  noCrystalResult: true,
  noIdentitySource: true,
  noStorage: true,
  noAccount: true,
  noEngineInvocation: true,
} as const);

const createRuntime = (
  input: GravityExperienceUIRuntimeInput,
  values: Readonly<{
    gravityStageState: GravityExperienceStageState;
    automaticResponseState: AutomaticResponseState;
    patternAwarenessState: PatternAwarenessState;
    choiceReadiness: GravityChoiceReadiness;
    interactionAvailability: GravityExperienceInteractionAvailability;
  }>,
): GravityExperienceUIRuntime =>
  Object.freeze({
    semanticRole: "GRAVITY_EXPERIENCE_UI_RUNTIME" as const,
    gravityStageState: values.gravityStageState,
    inertiaObservationReference: "PRESSURE_RECOGNITION_UI_RUNTIME" as const,
    automaticResponseState: values.automaticResponseState,
    patternAwarenessState: values.patternAwarenessState,
    choiceReadiness: values.choiceReadiness,
    interactionAvailability: values.interactionAvailability,
    gravityObservationConfirmed: input.gravityObservationConfirmed,
    boundary: UI_BOUNDARY,
  });

const unavailable = (
  input: GravityExperienceUIRuntimeInput,
  reason: GravityExperienceUIRuntimeUnavailableReason,
): GravityExperienceUIRuntimeUnavailable =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    source: "gravity_experience_ui_runtime" as const,
    reason,
    uiRuntime: null,
    input,
    boundary: REVIEW_BOUNDARY,
  });

const blocked = (
  input: GravityExperienceUIRuntimeInput,
  reason: GravityExperienceUIRuntimeBlockedReason,
  runtime: GravityExperienceUIRuntime,
): GravityExperienceUIRuntimeBlocked =>
  Object.freeze({
    status: "BLOCKED" as const,
    source: "gravity_experience_ui_runtime" as const,
    reason,
    uiRuntime: runtime,
    input,
    boundary: REVIEW_BOUNDARY,
  });

export function resolveGravityExperienceUIRuntime(
  input: GravityExperienceUIRuntimeInput,
): GravityExperienceUIRuntimeResult {
  if (!input.gravityReady) {
    if (input.gravityObservationConfirmed) {
      return blocked(
        input,
        "GRAVITY_OBSERVATION_BEFORE_GRAVITY_READY",
        createRuntime(input, {
          gravityStageState: "INERTIA_OBSERVATION",
          automaticResponseState: "WAITING_FOR_GRAVITY",
          patternAwarenessState: "UNSEEN",
          choiceReadiness: "NOT_READY",
          interactionAvailability: "GRAVITY_OBSERVATION_CONFIRM",
        }),
      );
    }
    return unavailable(input, "GRAVITY_READY_REQUIRED");
  }

  const confirmed = input.gravityObservationConfirmed;
  return Object.freeze({
    status: "READY" as const,
    source: "gravity_experience_ui_runtime" as const,
    uiRuntime: createRuntime(input, {
      gravityStageState: confirmed
        ? "CHOICE_READY"
        : "AUTOMATIC_RESPONSE_AWARENESS",
      automaticResponseState: confirmed ? "ACKNOWLEDGED" : "VISIBLE",
      patternAwarenessState: confirmed ? "ACKNOWLEDGED" : "EMERGING",
      choiceReadiness: confirmed ? "READY" : "NOT_READY",
      interactionAvailability: confirmed
        ? "NONE"
        : "GRAVITY_OBSERVATION_CONFIRM",
    }),
    input,
    boundary: REVIEW_BOUNDARY,
  });
}
