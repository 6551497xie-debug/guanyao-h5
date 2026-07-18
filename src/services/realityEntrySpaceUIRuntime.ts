import type {
  RealityEntrySpaceEntryState,
  RealityEntrySpaceInteractionAvailability,
  RealityEntrySpaceReadiness,
  RealityEntrySpaceTransitionPresentation,
  RealityEntrySpaceUIRuntime,
  RealityEntrySpaceUIRuntimeBlockedReason,
  RealityEntrySpaceUIRuntimeInput,
  RealityEntrySpaceUIRuntimeResult,
  RealityEntrySpaceUIRuntimeReviewBoundary,
  RealityEntrySpaceUIRuntimeUnavailableReason,
} from "../types/realityEntrySpaceUIRuntime";

const REVIEW_BOUNDARY: RealityEntrySpaceUIRuntimeReviewBoundary = Object.freeze({
  readinessReviewOnly: true,
  noPressureExecution: true,
  noGravityExecution: true,
  noChoiceExecution: true,
  noCrystalExecution: true,
  noStorage: true,
  noAccount: true,
});

const UI_BOUNDARY = Object.freeze({
  realityEntrySpaceOnly: true,
  transitionPresentationOnly: true,
  noPressureResult: true,
  noGravityResult: true,
  noChoiceResult: true,
  noCrystalResult: true,
  noUserProfile: true,
  noIdentitySource: true,
  noStorage: true,
  noAccount: true,
  noEngineInvocation: true,
  noRealityAnalysis: true,
} as const);

const createRuntime = (
  input: RealityEntrySpaceUIRuntimeInput,
  values: Readonly<{
    entryState: RealityEntrySpaceEntryState;
    realityReadiness: RealityEntrySpaceReadiness;
    transitionPresentation: RealityEntrySpaceTransitionPresentation;
    pressureReadiness: RealityEntrySpaceReadiness;
    interactionAvailability: RealityEntrySpaceInteractionAvailability;
  }>,
): RealityEntrySpaceUIRuntime =>
  Object.freeze({
    semanticRole: "REALITY_ENTRY_SPACE_UI_RUNTIME" as const,
    entryState: values.entryState,
    recognitionReference: "RECOGNITION_SPACE_RUNTIME" as const,
    realityReadiness: values.realityReadiness,
    transitionPresentation: values.transitionPresentation,
    pressureReadiness: values.pressureReadiness,
    interactionAvailability: values.interactionAvailability,
    realityEntryConfirmed: input.realityEntryConfirmed,
    boundary: UI_BOUNDARY,
  });

const unavailable = (
  input: RealityEntrySpaceUIRuntimeInput,
  reason: RealityEntrySpaceUIRuntimeUnavailableReason,
): RealityEntrySpaceUIRuntimeResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    source: "reality_entry_space_ui_runtime" as const,
    reason,
    uiRuntime: null,
    input,
    boundary: REVIEW_BOUNDARY,
  });

const blocked = (
  input: RealityEntrySpaceUIRuntimeInput,
  reason: RealityEntrySpaceUIRuntimeBlockedReason,
  runtime: RealityEntrySpaceUIRuntime,
): RealityEntrySpaceUIRuntimeResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    source: "reality_entry_space_ui_runtime" as const,
    reason,
    uiRuntime: runtime,
    input,
    boundary: REVIEW_BOUNDARY,
  });

export function resolveRealityEntrySpaceUIRuntime(
  input: RealityEntrySpaceUIRuntimeInput,
): RealityEntrySpaceUIRuntimeResult {
  if (!input.recognitionConfirmed) {
    if (input.realityEntryConfirmed) {
      return blocked(
        input,
        "ENTER_REALITY_BEFORE_RECOGNITION",
        createRuntime(input, {
          entryState: "RECOGNITION_CONFIRMED",
          realityReadiness: "NOT_READY",
          transitionPresentation: "COMPANION_CONTINUES",
          pressureReadiness: "NOT_READY",
          interactionAvailability: "ENTER_REALITY",
        }),
      );
    }
    return unavailable(input, "RECOGNITION_CONFIRMATION_REQUIRED");
  }
  if (!input.presenceAvailable) {
    if (input.realityEntryConfirmed) {
      return blocked(
        input,
        "ENTER_REALITY_WITHOUT_PRESENCE",
        createRuntime(input, {
          entryState: "RECOGNITION_CONFIRMED",
          realityReadiness: "NOT_READY",
          transitionPresentation: "COMPANION_CONTINUES",
          pressureReadiness: "NOT_READY",
          interactionAvailability: "ENTER_REALITY",
        }),
      );
    }
    return unavailable(input, "PRESENCE_REFERENCE_REQUIRED");
  }

  const runtime = createRuntime(input, {
    entryState: input.realityEntryConfirmed ? "REALITY_READY" : "TRANSITIONING",
    realityReadiness: input.realityEntryConfirmed ? "READY" : "NOT_READY",
    transitionPresentation: input.realityEntryConfirmed
      ? "REALITY_GATE_OPEN"
      : "WORLD_APPROACHES",
    pressureReadiness: input.realityEntryConfirmed ? "READY" : "NOT_READY",
    interactionAvailability: input.realityEntryConfirmed ? "NONE" : "ENTER_REALITY",
  });

  return Object.freeze({
    status: "READY" as const,
    source: "reality_entry_space_ui_runtime" as const,
    uiRuntime: runtime,
    input,
    boundary: REVIEW_BOUNDARY,
  });
}
