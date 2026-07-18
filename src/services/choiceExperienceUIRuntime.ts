import type {
  AlternativeResponseState,
  ChoiceCrystalReadiness,
  ChoiceExperienceInteractionAvailability,
  ChoiceExperienceStageState,
  ChoiceExperienceUIRuntime,
  ChoiceExperienceUIRuntimeBlocked,
  ChoiceExperienceUIRuntimeBlockedReason,
  ChoiceExperienceUIRuntimeInput,
  ChoiceExperienceUIRuntimeResult,
  ChoiceExperienceUIRuntimeReviewBoundary,
  ChoiceExperienceUIRuntimeUnavailable,
  ChoiceExperienceUIRuntimeUnavailableReason,
  ResponseGapState,
} from "../types/choiceExperienceUIRuntime";

const REVIEW_BOUNDARY: ChoiceExperienceUIRuntimeReviewBoundary = Object.freeze({
  choiceSpaceReviewOnly: true,
  noRecommendedAction: true,
  noBestChoice: true,
  noBehaviorScore: true,
  noUserJudgement: true,
  noCrystalExecution: true,
  noStorage: true,
  noAccount: true,
});

const UI_BOUNDARY = Object.freeze({
  choiceSpaceOnly: true,
  noRecommendedAction: true,
  noBestChoice: true,
  noBehaviorScore: true,
  noUserJudgement: true,
  noCrystalResult: true,
  noIdentitySource: true,
  noStorage: true,
  noAccount: true,
  noEngineInvocation: true,
} as const);

const createRuntime = (
  input: ChoiceExperienceUIRuntimeInput,
  values: Readonly<{
    choiceStageState: ChoiceExperienceStageState;
    responseGapState: ResponseGapState;
    alternativeResponseState: AlternativeResponseState;
    crystalReadiness: ChoiceCrystalReadiness;
    interactionAvailability: ChoiceExperienceInteractionAvailability;
  }>,
): ChoiceExperienceUIRuntime =>
  Object.freeze({
    semanticRole: "CHOICE_EXPERIENCE_UI_RUNTIME" as const,
    choiceStageState: values.choiceStageState,
    inertiaReference: "GRAVITY_EXPERIENCE_UI_RUNTIME" as const,
    responseGapState: values.responseGapState,
    alternativeResponseState: values.alternativeResponseState,
    crystalReadiness: values.crystalReadiness,
    interactionAvailability: values.interactionAvailability,
    choiceActiveResponseConfirmed: input.choiceActiveResponseConfirmed,
    boundary: UI_BOUNDARY,
  });

const unavailable = (
  input: ChoiceExperienceUIRuntimeInput,
  reason: ChoiceExperienceUIRuntimeUnavailableReason,
): ChoiceExperienceUIRuntimeUnavailable =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    source: "choice_experience_ui_runtime" as const,
    reason,
    uiRuntime: null,
    input,
    boundary: REVIEW_BOUNDARY,
  });

const blocked = (
  input: ChoiceExperienceUIRuntimeInput,
  reason: ChoiceExperienceUIRuntimeBlockedReason,
  runtime: ChoiceExperienceUIRuntime,
): ChoiceExperienceUIRuntimeBlocked =>
  Object.freeze({
    status: "BLOCKED" as const,
    source: "choice_experience_ui_runtime" as const,
    reason,
    uiRuntime: runtime,
    input,
    boundary: REVIEW_BOUNDARY,
  });

export function resolveChoiceExperienceUIRuntime(
  input: ChoiceExperienceUIRuntimeInput,
): ChoiceExperienceUIRuntimeResult {
  if (!input.choiceReady) {
    if (input.choiceActiveResponseConfirmed) {
      return blocked(
        input,
        "CHOICE_BEFORE_CHOICE_READY",
        createRuntime(input, {
          choiceStageState: "RESPONSE_GAP",
          responseGapState: "WAITING_FOR_GRAVITY",
          alternativeResponseState: "UNSEEN",
          crystalReadiness: "NOT_READY",
          interactionAvailability: "CHOICE_ACTIVE_RESPONSE",
        }),
      );
    }
    return unavailable(input, "CHOICE_READY_REQUIRED");
  }

  const confirmed = input.choiceActiveResponseConfirmed;
  return Object.freeze({
    status: "READY" as const,
    source: "choice_experience_ui_runtime" as const,
    uiRuntime: createRuntime(input, {
      choiceStageState: confirmed
        ? "CRYSTAL_READY"
        : "ALTERNATIVE_RESPONSE_AWARENESS",
      responseGapState: confirmed ? "ACKNOWLEDGED" : "OPEN",
      alternativeResponseState: confirmed ? "ACKNOWLEDGED" : "VISIBLE",
      crystalReadiness: confirmed ? "READY" : "NOT_READY",
      interactionAvailability: confirmed ? "NONE" : "CHOICE_ACTIVE_RESPONSE",
    }),
    input,
    boundary: REVIEW_BOUNDARY,
  });
}
