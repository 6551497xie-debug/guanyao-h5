import type {
  GenesisFullExperienceAcceptance,
  GenesisFullExperienceAcceptanceBlockedReason,
  GenesisFullExperienceAcceptanceBoundary,
  GenesisFullExperienceAcceptanceInput,
  GenesisFullExperienceAcceptanceResult,
  GenesisFullExperienceAcceptanceUnavailableReason,
  GenesisFullExperienceAcceptanceReview,
} from "../types/genesisFullExperienceAcceptance";

export const GENESIS_FULL_EXPERIENCE_SEQUENCE = Object.freeze([
  "MOON_ORIGIN",
  "STAR_RIVER",
  "TIME_RESONANCE",
  "SYMBOL_REVEAL",
  "HEXAGRAM_IMPRINT",
  "LIFE_FORCE",
  "STAR_BEAST_REVEAL",
  "COMPLETION",
] as const);

export const GENESIS_FULL_EXPERIENCE_ACCEPTANCE_BOUNDARY: GenesisFullExperienceAcceptanceBoundary =
  Object.freeze({
    acceptanceReviewOnly: true,
    eightStageSequenceOnly: true,
    noIdentity: true,
    noUserData: true,
    noEngineResult: true,
    noProductionState: true,
    noVisualStateMutation: true,
    noRuntimeMutation: true,
    noTimelineMutation: true,
    noRendererMutation: true,
    noReality: true,
    noGravity: true,
    noChoice: true,
    noCrystal: true,
    noStorage: true,
  });

const unavailable = (
  input: GenesisFullExperienceAcceptanceInput,
  reason: GenesisFullExperienceAcceptanceUnavailableReason,
): GenesisFullExperienceAcceptanceResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    reviewStatus: "UNAVAILABLE" as const,
    source: "genesis_full_experience_acceptance" as const,
    reason,
    input,
    review: null,
    boundary: GENESIS_FULL_EXPERIENCE_ACCEPTANCE_BOUNDARY,
  });

const blocked = (
  input: GenesisFullExperienceAcceptanceInput,
  reason: GenesisFullExperienceAcceptanceBlockedReason,
): GenesisFullExperienceAcceptanceResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    reviewStatus: "BLOCKED" as const,
    source: "genesis_full_experience_acceptance" as const,
    reason,
    input,
    review: null,
    boundary: GENESIS_FULL_EXPERIENCE_ACCEPTANCE_BOUNDARY,
  });

const hasExpectedSequence = (values: readonly string[]): boolean =>
  values.length === GENESIS_FULL_EXPERIENCE_SEQUENCE.length &&
  values.every((value, index) => value === GENESIS_FULL_EXPERIENCE_SEQUENCE[index]);

const hasValidBoundary = (): boolean =>
  Object.values(GENESIS_FULL_EXPERIENCE_ACCEPTANCE_BOUNDARY).every((value) => value === true);

const hasIsolatedPreview = (input: GenesisFullExperienceAcceptanceInput): boolean => {
  const result = input.previewIntegrationResult;
  if (result === null || result.status !== "READY") return false;
  const integration = result.integration;
  return (
    integration.previewMode === "ISOLATED_GENESIS_PREVIEW" &&
    integration.previewLifecycle === "COMPLETED" &&
    integration.boundary.isolatedPreviewOnly === true &&
    integration.boundary.devOnly === true &&
    integration.boundary.noProductionRoute === true &&
    integration.boundary.noProductionNavigation === true &&
    integration.boundary.noProductionBuildConsumption === true &&
    integration.boundary.noIdentity === true &&
    integration.boundary.noUserData === true &&
    integration.boundary.noEngineResult === true &&
    integration.boundary.noEngineInvocation === true &&
    integration.boundary.noStorage === true &&
    integration.boundary.noReality === true &&
    integration.boundary.noGravity === true &&
    integration.boundary.noChoice === true &&
    integration.boundary.noCrystal === true &&
    integration.boundary.completionRequired === true
  );
};

const hasValidCompletionReview = (input: GenesisFullExperienceAcceptanceInput): boolean => {
  const result = input.completionMomentReviewResult;
  if (result === null || result.status !== "READY") return false;
  const review = result.review;
  return (
    review.completionState === "GENESIS_PRESENCE_STABILIZED" &&
    review.recognitionMoment === "PERSONAL_STAR_BEAST_RECOGNITION_OPEN" &&
    review.presenceStability === "QUIET_PRESENCE_STABLE" &&
    review.genesisToRealityBoundary === "GENESIS_TO_REALITY_BOUNDARY_HELD" &&
    result.runtimeBoundary.completionReviewOnly === true &&
    result.runtimeBoundary.genesisLayerOnly === true &&
    result.runtimeBoundary.realityEntryBoundaryHeld === true &&
    result.runtimeBoundary.noRealityCalculation === true &&
    result.runtimeBoundary.noPressureAnalysis === true &&
    result.runtimeBoundary.noGravity === true &&
    result.runtimeBoundary.noChoice === true &&
    result.runtimeBoundary.noCrystal === true &&
    result.runtimeBoundary.noStorage === true &&
    result.runtimeBoundary.noUserProfile === true &&
    result.runtimeBoundary.noIdentityMutation === true &&
    result.runtimeBoundary.noEngineInvocation === true &&
    result.runtimeBoundary.noRendererInvocation === true &&
    result.runtimeBoundary.noVisualStateMutation === true &&
    result.runtimeBoundary.noNewGenesisLayer === true
  );
};

const issueCategories = (input: GenesisFullExperienceAcceptanceInput) =>
  Object.freeze([...(input.issueCategories ?? [])]);

export function reviewGenesisFullExperience(
  input: GenesisFullExperienceAcceptanceInput,
): GenesisFullExperienceAcceptanceResult {
  if (input.completionMomentReviewResult === null) {
    return unavailable(input, "COMPLETION_MOMENT_REVIEW_REQUIRED");
  }
  if (input.previewIntegrationResult === null) {
    return unavailable(input, "PREVIEW_INTEGRATION_REQUIRED");
  }
  if (input.observedSequence.length === 0) {
    return unavailable(input, "OBSERVED_SEQUENCE_REQUIRED");
  }
  if (input.completionMomentReviewResult.status === "UNAVAILABLE") {
    return blocked(input, "COMPLETION_MOMENT_REVIEW_UNAVAILABLE");
  }
  if (input.completionMomentReviewResult.status === "BLOCKED") {
    return blocked(input, "COMPLETION_MOMENT_REVIEW_BLOCKED");
  }
  if (input.previewIntegrationResult.status === "UNAVAILABLE") {
    return blocked(input, "PREVIEW_INTEGRATION_UNAVAILABLE");
  }
  if (input.previewIntegrationResult.status === "BLOCKED") {
    return blocked(input, "PREVIEW_INTEGRATION_BLOCKED");
  }
  if (!hasExpectedSequence(input.observedSequence)) {
    return blocked(input, "EIGHT_STAGE_SEQUENCE_INVALID");
  }
  if (input.observedSequence[input.observedSequence.length - 1] !== "COMPLETION") {
    return blocked(input, "COMPLETION_NOT_REACHABLE");
  }
  if (!hasValidCompletionReview(input)) {
    return blocked(input, "GENESIS_ACCEPTANCE_BOUNDARY_INVALID");
  }
  if (!hasIsolatedPreview(input)) {
    return blocked(input, "PRODUCTION_INTEGRATION_PRESENT");
  }
  if (!hasValidBoundary()) {
    return blocked(input, "GENESIS_ACCEPTANCE_BOUNDARY_INVALID");
  }

  const review: GenesisFullExperienceAcceptanceReview = Object.freeze({
    firstImpression: input.firstImpression ?? "PENDING",
    journeyContinuity: input.journeyContinuity ?? "PENDING",
    lifeRecognition: input.lifeRecognition ?? "PENDING",
    emotionalCompletion: input.emotionalCompletion ?? "PENDING",
    systemIntegrity: "PASS",
    sequence: GENESIS_FULL_EXPERIENCE_SEQUENCE,
    completionReachable: true,
    issueCategories: issueCategories(input),
    completionMomentReviewReference: input.completionMomentReviewResult,
    previewIntegrationReference: input.previewIntegrationResult,
  });

  const result: GenesisFullExperienceAcceptance = {
    firstImpression: review.firstImpression,
    journeyContinuity: review.journeyContinuity,
    lifeRecognition: review.lifeRecognition,
    emotionalCompletion: review.emotionalCompletion,
    systemIntegrity: review.systemIntegrity,
    sequence: review.sequence,
    completionReachable: review.completionReachable,
    issueCategories: review.issueCategories,
    completionMomentReviewReference: review.completionMomentReviewReference,
    previewIntegrationReference: review.previewIntegrationReference,
  };

  return Object.freeze({
    status: "READY" as const,
    reviewStatus: "PENDING_HUMAN_REVIEW" as const,
    source: "genesis_full_experience_acceptance" as const,
    input,
    review: result,
    boundary: GENESIS_FULL_EXPERIENCE_ACCEPTANCE_BOUNDARY,
  });
}
