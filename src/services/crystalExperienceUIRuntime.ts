import type {
  CrystalExperienceInteractionAvailability,
  CrystalExperienceStageState,
  CrystalExperienceUIRuntime,
  CrystalExperienceUIRuntimeBlocked,
  CrystalExperienceUIRuntimeBlockedReason,
  CrystalExperienceUIRuntimeInput,
  CrystalExperienceUIRuntimeResult,
  CrystalExperienceUIRuntimeReviewBoundary,
  CrystalExperienceUIRuntimeUnavailable,
  CrystalExperienceUIRuntimeUnavailableReason,
  CrystalPresenceState,
  FutureCarryState,
  LifeImprintState,
} from "../types/crystalExperienceUIRuntime";

const REVIEW_BOUNDARY: CrystalExperienceUIRuntimeReviewBoundary = Object.freeze({
  crystalExperienceReviewOnly: true,
  noReward: true,
  noScore: true,
  noLevel: true,
  noBadge: true,
  noAchievement: true,
  noStorage: true,
  noArchive: true,
  noCrystalExecution: true,
});

const UI_BOUNDARY = Object.freeze({
  crystalExperienceOnly: true,
  noReward: true,
  noScore: true,
  noLevel: true,
  noBadge: true,
  noAchievement: true,
  noStorageRecord: true,
  noArchiveRecord: true,
  noUserJudgement: true,
  noIdentitySource: true,
  noEngineInvocation: true,
} as const);

const createRuntime = (
  input: CrystalExperienceUIRuntimeInput,
  values: Readonly<{
    crystalStageState: CrystalExperienceStageState;
    lifeImprintState: LifeImprintState;
    crystalPresenceState: CrystalPresenceState;
    futureCarryState: FutureCarryState;
    interactionAvailability: CrystalExperienceInteractionAvailability;
  }>,
): CrystalExperienceUIRuntime =>
  Object.freeze({
    semanticRole: "CRYSTAL_EXPERIENCE_UI_RUNTIME" as const,
    crystalStageState: values.crystalStageState,
    transformationReference: "CHOICE_EXPERIENCE_UI_RUNTIME" as const,
    lifeImprintState: values.lifeImprintState,
    crystalPresenceState: values.crystalPresenceState,
    futureCarryState: values.futureCarryState,
    interactionAvailability: values.interactionAvailability,
    crystalRecognitionConfirmed: input.crystalRecognitionConfirmed,
    boundary: UI_BOUNDARY,
  });

const unavailable = (
  input: CrystalExperienceUIRuntimeInput,
  reason: CrystalExperienceUIRuntimeUnavailableReason,
): CrystalExperienceUIRuntimeUnavailable =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    source: "crystal_experience_ui_runtime" as const,
    reason,
    uiRuntime: null,
    input,
    boundary: REVIEW_BOUNDARY,
  });

const blocked = (
  input: CrystalExperienceUIRuntimeInput,
  reason: CrystalExperienceUIRuntimeBlockedReason,
  runtime: CrystalExperienceUIRuntime,
): CrystalExperienceUIRuntimeBlocked =>
  Object.freeze({
    status: "BLOCKED" as const,
    source: "crystal_experience_ui_runtime" as const,
    reason,
    uiRuntime: runtime,
    input,
    boundary: REVIEW_BOUNDARY,
  });

export function resolveCrystalExperienceUIRuntime(
  input: CrystalExperienceUIRuntimeInput,
): CrystalExperienceUIRuntimeResult {
  // P39 sequence: TRANSFORMATION_RECOGNITION → LIFE_IMPRINT → CRYSTAL_PRESENCE → FUTURE_CARRY.
  if (!input.crystalReady) {
    if (input.crystalRecognitionConfirmed) {
      return blocked(
        input,
        "CRYSTAL_RECOGNITION_BEFORE_CRYSTAL_READY",
        createRuntime(input, {
          crystalStageState: "TRANSFORMATION_RECOGNITION",
          lifeImprintState: "UNSEEN",
          crystalPresenceState: "ABSENT",
          futureCarryState: "NOT_READY",
          interactionAvailability: "CRYSTAL_RECOGNITION_CONFIRM",
        }),
      );
    }
    return unavailable(input, "CRYSTAL_READY_REQUIRED");
  }

  const confirmed = input.crystalRecognitionConfirmed;
  return Object.freeze({
    status: "READY" as const,
    source: "crystal_experience_ui_runtime" as const,
    uiRuntime: createRuntime(input, {
      crystalStageState: confirmed
        ? "JOURNEY_COMPLETE"
        : "TRANSFORMATION_RECOGNITION",
      lifeImprintState: confirmed ? "ACKNOWLEDGED" : "EMERGING",
      crystalPresenceState: confirmed ? "STABLE" : "PRESENT",
      futureCarryState: confirmed ? "ACKNOWLEDGED" : "VISIBLE",
      interactionAvailability: confirmed
        ? "NONE"
        : "CRYSTAL_RECOGNITION_CONFIRM",
    }),
    input,
    boundary: REVIEW_BOUNDARY,
  });
}
