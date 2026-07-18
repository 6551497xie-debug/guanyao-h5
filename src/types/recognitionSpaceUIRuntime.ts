export type RecognitionSpaceRecognitionState =
  | "PRESENCE"
  | "RECOGNITION_READY"
  | "REALITY_ENTRY_READY";

export type RecognitionSpaceRealityEntryAvailability = "NOT_READY" | "READY";

export type RecognitionSpaceInteractionAvailability =
  | "NONE"
  | "RECOGNITION_CONFIRM";

export type RecognitionSpaceUIRuntimeBoundary = Readonly<{
  recognitionSpaceOnly: true;
  presentationAndReadinessOnly: true;
  noIdentityBinding: true;
  noUserAccount: true;
  noStorageRecord: true;
  noStorageWrite: true;
  noEngineResult: true;
  noOwnershipData: true;
  noRealityExecution: true;
  noStarBeastMutation: true;
  noGenesisMutation: true;
  noResultExplanation: true;
}>;

export type RecognitionSpaceUIRuntime = Readonly<{
  semanticRole: "RECOGNITION_SPACE_UI_RUNTIME";
  recognitionState: RecognitionSpaceRecognitionState;
  presenceReference: "PERSONAL_STAR_BEAST_PRESENCE_VISUAL_STATE";
  completionReference: "GENESIS_COMPLETION_MOMENT";
  realityEntryAvailability: RecognitionSpaceRealityEntryAvailability;
  interactionAvailability: RecognitionSpaceInteractionAvailability;
  recognitionConfirmed: boolean;
  boundary: RecognitionSpaceUIRuntimeBoundary;
}>;

export type RecognitionSpaceUIRuntimeInput = Readonly<{
  genesisCompleted: boolean;
  presenceAvailable: boolean;
  recognitionConfirmed: boolean;
}>;

export type RecognitionSpaceUIRuntimeUnavailableReason =
  | "GENESIS_COMPLETION_REQUIRED"
  | "PRESENCE_STATE_REQUIRED";

export type RecognitionSpaceUIRuntimeBlockedReason =
  | "RECOGNITION_CONFIRMATION_BEFORE_COMPLETION"
  | "RECOGNITION_CONFIRMATION_WITHOUT_PRESENCE";

export type RecognitionSpaceUIRuntimeReviewBoundary = Readonly<{
  readinessReviewOnly: true;
  noRealityExecution: true;
  noStorage: true;
  noAccount: true;
  noOwnershipBinding: true;
  noEngineResult: true;
}>;

export type RecognitionSpaceUIRuntimeReady = Readonly<{
  status: "READY";
  source: "recognition_space_ui_runtime";
  uiRuntime: RecognitionSpaceUIRuntime;
  input: RecognitionSpaceUIRuntimeInput;
  boundary: RecognitionSpaceUIRuntimeReviewBoundary;
}>;

export type RecognitionSpaceUIRuntimeUnavailable = Readonly<{
  status: "UNAVAILABLE";
  source: "recognition_space_ui_runtime";
  reason: RecognitionSpaceUIRuntimeUnavailableReason;
  uiRuntime: null;
  input: RecognitionSpaceUIRuntimeInput;
  boundary: RecognitionSpaceUIRuntimeReviewBoundary;
}>;

export type RecognitionSpaceUIRuntimeBlocked = Readonly<{
  status: "BLOCKED";
  source: "recognition_space_ui_runtime";
  reason: RecognitionSpaceUIRuntimeBlockedReason;
  uiRuntime: RecognitionSpaceUIRuntime;
  input: RecognitionSpaceUIRuntimeInput;
  boundary: RecognitionSpaceUIRuntimeReviewBoundary;
}>;

export type RecognitionSpaceUIRuntimeResult =
  | RecognitionSpaceUIRuntimeReady
  | RecognitionSpaceUIRuntimeUnavailable
  | RecognitionSpaceUIRuntimeBlocked;
