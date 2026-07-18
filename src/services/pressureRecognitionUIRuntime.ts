import type {
  PressureObservationState,
  PressureRecognitionGravityReadiness,
  PressureRecognitionInteractionAvailability,
  PressureRecognitionStageState,
  PressureRecognitionUIRuntime,
  PressureRecognitionUIRuntimeBlocked,
  PressureRecognitionUIRuntimeBlockedReason,
  PressureRecognitionUIRuntimeInput,
  PressureRecognitionUIRuntimeResult,
  PressureRecognitionUIRuntimeReviewBoundary,
  PressureRecognitionUIRuntimeUnavailable,
  PressureRecognitionUIRuntimeUnavailableReason,
  PressureTensionAwareness,
} from "../types/pressureRecognitionUIRuntime";

const REVIEW_BOUNDARY: PressureRecognitionUIRuntimeReviewBoundary = Object.freeze({
  observationReviewOnly: true,
  noPressureExecution: true,
  noUserDiagnosis: true,
  noPersonalityLabel: true,
  noGravityExecution: true,
  noChoiceExecution: true,
  noCrystalExecution: true,
  noStorage: true,
  noAccount: true,
});

const UI_BOUNDARY = Object.freeze({
  pressureObservationOnly: true,
  noPressureResult: true,
  noUserDiagnosis: true,
  noPersonalityLabel: true,
  noGravityResult: true,
  noChoiceResult: true,
  noCrystalResult: true,
  noIdentitySource: true,
  noStorage: true,
  noAccount: true,
  noEngineInvocation: true,
} as const);

const createRuntime = (
  input: PressureRecognitionUIRuntimeInput,
  values: Readonly<{
    pressureStageState: PressureRecognitionStageState;
    observationState: PressureObservationState;
    tensionAwareness: PressureTensionAwareness;
    gravityReadiness: PressureRecognitionGravityReadiness;
    interactionAvailability: PressureRecognitionInteractionAvailability;
  }>,
): PressureRecognitionUIRuntime =>
  Object.freeze({
    semanticRole: "PRESSURE_RECOGNITION_UI_RUNTIME" as const,
    pressureStageState: values.pressureStageState,
    realitySignalReference: "REALITY_ENTRY_SPACE_RUNTIME" as const,
    observationState: values.observationState,
    tensionAwareness: values.tensionAwareness,
    gravityReadiness: values.gravityReadiness,
    interactionAvailability: values.interactionAvailability,
    pressureObservationConfirmed: input.pressureObservationConfirmed,
    boundary: UI_BOUNDARY,
  });

const unavailable = (
  input: PressureRecognitionUIRuntimeInput,
  reason: PressureRecognitionUIRuntimeUnavailableReason,
): PressureRecognitionUIRuntimeUnavailable =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    source: "pressure_recognition_ui_runtime" as const,
    reason,
    uiRuntime: null,
    input,
    boundary: REVIEW_BOUNDARY,
  });

const blocked = (
  input: PressureRecognitionUIRuntimeInput,
  reason: PressureRecognitionUIRuntimeBlockedReason,
  runtime: PressureRecognitionUIRuntime,
): PressureRecognitionUIRuntimeBlocked =>
  Object.freeze({
    status: "BLOCKED" as const,
    source: "pressure_recognition_ui_runtime" as const,
    reason,
    uiRuntime: runtime,
    input,
    boundary: REVIEW_BOUNDARY,
  });

export function resolvePressureRecognitionUIRuntime(
  input: PressureRecognitionUIRuntimeInput,
): PressureRecognitionUIRuntimeResult {
  if (!input.realityReady) {
    if (input.pressureObservationConfirmed) {
      return blocked(
        input,
        "PRESSURE_OBSERVATION_BEFORE_REALITY_READY",
        createRuntime(input, {
          pressureStageState: "REALITY_SIGNAL_OBSERVATION",
          observationState: "WAITING_FOR_REALITY",
          tensionAwareness: "UNSEEN",
          gravityReadiness: "NOT_READY",
          interactionAvailability: "PRESSURE_OBSERVATION_CONFIRM",
        }),
      );
    }
    return unavailable(input, "REALITY_READY_REQUIRED");
  }

  const confirmed = input.pressureObservationConfirmed;
  return Object.freeze({
    status: "READY" as const,
    source: "pressure_recognition_ui_runtime" as const,
    uiRuntime: createRuntime(input, {
      pressureStageState: confirmed
        ? "GRAVITY_READY"
        : "PRESSURE_TENSION_OBSERVATION",
      observationState: confirmed ? "TENSION_ACKNOWLEDGED" : "OBSERVING_SIGNALS",
      tensionAwareness: confirmed ? "ACKNOWLEDGED" : "PRESENT",
      gravityReadiness: confirmed ? "READY" : "NOT_READY",
      interactionAvailability: confirmed
        ? "NONE"
        : "PRESSURE_OBSERVATION_CONFIRM",
    }),
    input,
    boundary: REVIEW_BOUNDARY,
  });
}
