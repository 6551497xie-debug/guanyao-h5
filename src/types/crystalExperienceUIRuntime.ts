export type CrystalExperienceStageState =
  | "TRANSFORMATION_RECOGNITION"
  | "LIFE_IMPRINT"
  | "CRYSTAL_PRESENCE"
  | "FUTURE_CARRY"
  | "JOURNEY_COMPLETE";

export type CrystalTransformationReference =
  "CHOICE_EXPERIENCE_UI_RUNTIME";

export type LifeImprintState = "UNSEEN" | "EMERGING" | "ACKNOWLEDGED";

export type CrystalPresenceState = "ABSENT" | "PRESENT" | "STABLE";

export type FutureCarryState =
  | "NOT_READY"
  | "VISIBLE"
  | "ACKNOWLEDGED";

export type CrystalExperienceInteractionAvailability =
  | "NONE"
  | "CRYSTAL_RECOGNITION_CONFIRM";

export type CrystalExperienceUIRuntimeBoundary = Readonly<{
  crystalExperienceOnly: true;
  noReward: true;
  noScore: true;
  noLevel: true;
  noBadge: true;
  noAchievement: true;
  noStorageRecord: true;
  noArchiveRecord: true;
  noUserJudgement: true;
  noIdentitySource: true;
  noEngineInvocation: true;
}>;

export type CrystalExperienceUIRuntime = Readonly<{
  semanticRole: "CRYSTAL_EXPERIENCE_UI_RUNTIME";
  crystalStageState: CrystalExperienceStageState;
  transformationReference: CrystalTransformationReference;
  lifeImprintState: LifeImprintState;
  crystalPresenceState: CrystalPresenceState;
  futureCarryState: FutureCarryState;
  interactionAvailability: CrystalExperienceInteractionAvailability;
  crystalRecognitionConfirmed: boolean;
  boundary: CrystalExperienceUIRuntimeBoundary;
}>;

export type CrystalExperienceUIRuntimeInput = Readonly<{
  crystalReady: boolean;
  crystalRecognitionConfirmed: boolean;
}>;

export type CrystalExperienceUIRuntimeUnavailableReason =
  | "CRYSTAL_READY_REQUIRED";

export type CrystalExperienceUIRuntimeBlockedReason =
  | "CRYSTAL_RECOGNITION_BEFORE_CRYSTAL_READY";

export type CrystalExperienceUIRuntimeReviewBoundary = Readonly<{
  crystalExperienceReviewOnly: true;
  noReward: true;
  noScore: true;
  noLevel: true;
  noBadge: true;
  noAchievement: true;
  noStorage: true;
  noArchive: true;
  noCrystalExecution: true;
}>;

export type CrystalExperienceUIRuntimeReady = Readonly<{
  status: "READY";
  source: "crystal_experience_ui_runtime";
  uiRuntime: CrystalExperienceUIRuntime;
  input: CrystalExperienceUIRuntimeInput;
  boundary: CrystalExperienceUIRuntimeReviewBoundary;
}>;

export type CrystalExperienceUIRuntimeUnavailable = Readonly<{
  status: "UNAVAILABLE";
  source: "crystal_experience_ui_runtime";
  reason: CrystalExperienceUIRuntimeUnavailableReason;
  uiRuntime: null;
  input: CrystalExperienceUIRuntimeInput;
  boundary: CrystalExperienceUIRuntimeReviewBoundary;
}>;

export type CrystalExperienceUIRuntimeBlocked = Readonly<{
  status: "BLOCKED";
  source: "crystal_experience_ui_runtime";
  reason: CrystalExperienceUIRuntimeBlockedReason;
  uiRuntime: CrystalExperienceUIRuntime;
  input: CrystalExperienceUIRuntimeInput;
  boundary: CrystalExperienceUIRuntimeReviewBoundary;
}>;

export type CrystalExperienceUIRuntimeResult =
  | CrystalExperienceUIRuntimeReady
  | CrystalExperienceUIRuntimeUnavailable
  | CrystalExperienceUIRuntimeBlocked;
