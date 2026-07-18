import type {
  RecognitionSpaceInteractionAvailability,
  RecognitionSpaceRealityEntryAvailability,
  RecognitionSpaceRecognitionState,
  RecognitionSpaceUIRuntime,
  RecognitionSpaceUIRuntimeBlockedReason,
  RecognitionSpaceUIRuntimeReviewBoundary,
  RecognitionSpaceUIRuntimeInput,
  RecognitionSpaceUIRuntimeResult,
  RecognitionSpaceUIRuntimeUnavailableReason,
} from "../types/recognitionSpaceUIRuntime";

const REVIEW_BOUNDARY: RecognitionSpaceUIRuntimeReviewBoundary = Object.freeze({
  readinessReviewOnly: true,
  noRealityExecution: true,
  noStorage: true,
  noAccount: true,
  noOwnershipBinding: true,
  noEngineResult: true,
});

const UI_BOUNDARY = Object.freeze({
  recognitionSpaceOnly: true,
  presentationAndReadinessOnly: true,
  noIdentityBinding: true,
  noUserAccount: true,
  noStorageRecord: true,
  noStorageWrite: true,
  noEngineResult: true,
  noOwnershipData: true,
  noRealityExecution: true,
  noStarBeastMutation: true,
  noGenesisMutation: true,
  noResultExplanation: true,
} as const);

const createRuntime = (
  input: RecognitionSpaceUIRuntimeInput,
  values: Readonly<{
    recognitionState: RecognitionSpaceRecognitionState;
    realityEntryAvailability: RecognitionSpaceRealityEntryAvailability;
    interactionAvailability: RecognitionSpaceInteractionAvailability;
  }>,
): RecognitionSpaceUIRuntime =>
  Object.freeze({
    semanticRole: "RECOGNITION_SPACE_UI_RUNTIME" as const,
    recognitionState: values.recognitionState,
    presenceReference: "PERSONAL_STAR_BEAST_PRESENCE_VISUAL_STATE" as const,
    completionReference: "GENESIS_COMPLETION_MOMENT" as const,
    realityEntryAvailability: values.realityEntryAvailability,
    interactionAvailability: values.interactionAvailability,
    recognitionConfirmed: input.recognitionConfirmed,
    boundary: UI_BOUNDARY,
  });

const unavailable = (
  input: RecognitionSpaceUIRuntimeInput,
  reason: RecognitionSpaceUIRuntimeUnavailableReason,
): RecognitionSpaceUIRuntimeResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    source: "recognition_space_ui_runtime" as const,
    reason,
    uiRuntime: null,
    input,
    boundary: REVIEW_BOUNDARY,
  });

const blocked = (
  input: RecognitionSpaceUIRuntimeInput,
  reason: RecognitionSpaceUIRuntimeBlockedReason,
  runtime: RecognitionSpaceUIRuntime,
): RecognitionSpaceUIRuntimeResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    source: "recognition_space_ui_runtime" as const,
    reason,
    uiRuntime: runtime,
    input,
    boundary: REVIEW_BOUNDARY,
  });

export function resolveRecognitionSpaceUIRuntime(
  input: RecognitionSpaceUIRuntimeInput,
): RecognitionSpaceUIRuntimeResult {
  if (!input.genesisCompleted) {
    if (input.recognitionConfirmed) {
      return blocked(
        input,
        "RECOGNITION_CONFIRMATION_BEFORE_COMPLETION",
        createRuntime(input, {
          recognitionState: "RECOGNITION_READY",
          realityEntryAvailability: "NOT_READY",
          interactionAvailability: "RECOGNITION_CONFIRM",
        }),
      );
    }
    return unavailable(input, "GENESIS_COMPLETION_REQUIRED");
  }
  if (!input.presenceAvailable) {
    if (input.recognitionConfirmed) {
      return blocked(
        input,
        "RECOGNITION_CONFIRMATION_WITHOUT_PRESENCE",
        createRuntime(input, {
          recognitionState: "RECOGNITION_READY",
          realityEntryAvailability: "NOT_READY",
          interactionAvailability: "RECOGNITION_CONFIRM",
        }),
      );
    }
    return unavailable(input, "PRESENCE_STATE_REQUIRED");
  }

  const runtime = createRuntime(input, {
    recognitionState: input.recognitionConfirmed
      ? "REALITY_ENTRY_READY"
      : "RECOGNITION_READY",
    realityEntryAvailability: input.recognitionConfirmed ? "READY" : "NOT_READY",
    interactionAvailability: input.recognitionConfirmed
      ? "NONE"
      : "RECOGNITION_CONFIRM",
  });

  return Object.freeze({
    status: "READY" as const,
    source: "recognition_space_ui_runtime" as const,
    uiRuntime: runtime,
    input,
    boundary: REVIEW_BOUNDARY,
  });
}
