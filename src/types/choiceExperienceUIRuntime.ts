export type ChoiceExperienceStageState =
  | "RESPONSE_GAP"
  | "ALTERNATIVE_RESPONSE_AWARENESS"
  | "CHOICE_ACTIVE_RESPONSE"
  | "CRYSTAL_READY";

export type ChoiceInertiaReference = "GRAVITY_EXPERIENCE_UI_RUNTIME";

export type ResponseGapState = "WAITING_FOR_GRAVITY" | "OPEN" | "ACKNOWLEDGED";

export type AlternativeResponseState = "UNSEEN" | "VISIBLE" | "ACKNOWLEDGED";

export type ChoiceCrystalReadiness = "NOT_READY" | "READY";

export type ChoiceExperienceInteractionAvailability =
  | "NONE"
  | "CHOICE_ACTIVE_RESPONSE";

export type ChoiceExperienceUIRuntimeBoundary = Readonly<{
  choiceSpaceOnly: true;
  noRecommendedAction: true;
  noBestChoice: true;
  noBehaviorScore: true;
  noUserJudgement: true;
  noCrystalResult: true;
  noIdentitySource: true;
  noStorage: true;
  noAccount: true;
  noEngineInvocation: true;
}>;

export type ChoiceExperienceUIRuntime = Readonly<{
  semanticRole: "CHOICE_EXPERIENCE_UI_RUNTIME";
  choiceStageState: ChoiceExperienceStageState;
  inertiaReference: ChoiceInertiaReference;
  responseGapState: ResponseGapState;
  alternativeResponseState: AlternativeResponseState;
  crystalReadiness: ChoiceCrystalReadiness;
  interactionAvailability: ChoiceExperienceInteractionAvailability;
  choiceActiveResponseConfirmed: boolean;
  boundary: ChoiceExperienceUIRuntimeBoundary;
}>;

export type ChoiceExperienceUIRuntimeInput = Readonly<{
  choiceReady: boolean;
  choiceActiveResponseConfirmed: boolean;
}>;

export type ChoiceExperienceUIRuntimeUnavailableReason =
  | "CHOICE_READY_REQUIRED";

export type ChoiceExperienceUIRuntimeBlockedReason =
  | "CHOICE_BEFORE_CHOICE_READY";

export type ChoiceExperienceUIRuntimeReviewBoundary = Readonly<{
  choiceSpaceReviewOnly: true;
  noRecommendedAction: true;
  noBestChoice: true;
  noBehaviorScore: true;
  noUserJudgement: true;
  noCrystalExecution: true;
  noStorage: true;
  noAccount: true;
}>;

export type ChoiceExperienceUIRuntimeReady = Readonly<{
  status: "READY";
  source: "choice_experience_ui_runtime";
  uiRuntime: ChoiceExperienceUIRuntime;
  input: ChoiceExperienceUIRuntimeInput;
  boundary: ChoiceExperienceUIRuntimeReviewBoundary;
}>;

export type ChoiceExperienceUIRuntimeUnavailable = Readonly<{
  status: "UNAVAILABLE";
  source: "choice_experience_ui_runtime";
  reason: ChoiceExperienceUIRuntimeUnavailableReason;
  uiRuntime: null;
  input: ChoiceExperienceUIRuntimeInput;
  boundary: ChoiceExperienceUIRuntimeReviewBoundary;
}>;

export type ChoiceExperienceUIRuntimeBlocked = Readonly<{
  status: "BLOCKED";
  source: "choice_experience_ui_runtime";
  reason: ChoiceExperienceUIRuntimeBlockedReason;
  uiRuntime: ChoiceExperienceUIRuntime;
  input: ChoiceExperienceUIRuntimeInput;
  boundary: ChoiceExperienceUIRuntimeReviewBoundary;
}>;

export type ChoiceExperienceUIRuntimeResult =
  | ChoiceExperienceUIRuntimeReady
  | ChoiceExperienceUIRuntimeUnavailable
  | ChoiceExperienceUIRuntimeBlocked;
