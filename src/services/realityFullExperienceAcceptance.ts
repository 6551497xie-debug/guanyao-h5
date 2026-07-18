import type {
  RealityFullExperienceAcceptance,
  RealityFullExperienceAcceptanceBlocked,
  RealityFullExperienceAcceptanceBlockedReason,
  RealityFullExperienceAcceptanceBoundary,
  RealityFullExperienceAcceptanceInput,
  RealityFullExperienceAcceptanceIssue,
  RealityFullExperienceAcceptanceQuality,
  RealityFullExperienceAcceptanceResult,
  RealityFullExperienceAcceptanceStatus,
  RealityFullExperienceAcceptanceUnavailable,
  RealityFullExperienceAcceptanceUnavailableReason,
} from "../types/realityFullExperienceAcceptance";

export const REALITY_FULL_EXPERIENCE_ACCEPTANCE_SEQUENCE = Object.freeze([
  "PRESENCE_CARRY",
  "PRESSURE",
  "GRAVITY",
  "CHOICE",
  "CRYSTAL_READY",
] as const);

export const REALITY_FULL_EXPERIENCE_ACCEPTANCE_BOUNDARY: RealityFullExperienceAcceptanceBoundary =
  Object.freeze({
    acceptanceReviewOnly: true,
    manualObservationOnly: true,
    noAutomaticRepair: true,
    noRuntimeMutation: true,
    noUIMutation: true,
    noVisualStateMutation: true,
    noEngineMutation: true,
    noGenesisMutation: true,
    noPressureMutation: true,
    noGravityMutation: true,
    noChoiceMutation: true,
    noCrystalMutation: true,
    noUserData: true,
    noDiagnosis: true,
    noMetrics: true,
    noStorage: true,
    noProductionIntegration: true,
  });

const unavailable = (
  input: RealityFullExperienceAcceptanceInput,
  reason: RealityFullExperienceAcceptanceUnavailableReason,
): RealityFullExperienceAcceptanceUnavailable =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    reviewStatus: "UNAVAILABLE" as const,
    source: "reality_full_experience_acceptance" as const,
    reason,
    input,
    review: null,
    boundary: REALITY_FULL_EXPERIENCE_ACCEPTANCE_BOUNDARY,
  });

const blocked = (
  input: RealityFullExperienceAcceptanceInput,
  reason: RealityFullExperienceAcceptanceBlockedReason,
): RealityFullExperienceAcceptanceBlocked =>
  Object.freeze({
    status: "BLOCKED" as const,
    reviewStatus: "BLOCKED" as const,
    source: "reality_full_experience_acceptance" as const,
    reason,
    input,
    review: null,
    boundary: REALITY_FULL_EXPERIENCE_ACCEPTANCE_BOUNDARY,
  });

const hasExpectedValues = (
  observed: readonly string[],
  expected: readonly string[],
): boolean =>
  observed.length === expected.length &&
  observed.every((value, index) => value === expected[index]);

const quality = (
  value: RealityFullExperienceAcceptanceQuality | undefined,
): RealityFullExperienceAcceptanceQuality => value ?? "PENDING";

const hasValidBoundary = (): boolean =>
  Object.values(REALITY_FULL_EXPERIENCE_ACCEPTANCE_BOUNDARY).every(
    (value) => value === true,
  );

const issueList = (
  issues: readonly RealityFullExperienceAcceptanceIssue[] | undefined,
): readonly RealityFullExperienceAcceptanceIssue[] =>
  Object.freeze([...(issues ?? [])]);

const issueTypesFor = (
  issues: readonly RealityFullExperienceAcceptanceIssue[],
): readonly RealityFullExperienceAcceptanceIssue["issueType"][] =>
  Object.freeze(Array.from(new Set(issues.map((issue) => issue.issueType))));

const overallStateFor = (
  qualities: readonly RealityFullExperienceAcceptanceQuality[],
  issues: readonly RealityFullExperienceAcceptanceIssue[],
) =>
  qualities.every((value) => value === "PASS") && issues.length === 0
    ? ("PASS" as const)
    : ("NEEDS_REVIEW" as const);

const reviewStatusFor = (
  overallJourneyState: "PASS" | "NEEDS_REVIEW",
  qualities: readonly RealityFullExperienceAcceptanceQuality[],
  issues: readonly RealityFullExperienceAcceptanceIssue[],
): RealityFullExperienceAcceptanceStatus => {
  if (overallJourneyState === "PASS") return "ACCEPTED";
  if (issues.length > 0 || qualities.includes("NEEDS_REVIEW")) {
    return "NEEDS_REVIEW";
  }
  return "PENDING_HUMAN_ACCEPTANCE";
};

export function reviewRealityFullExperienceAcceptance(
  input: RealityFullExperienceAcceptanceInput,
): RealityFullExperienceAcceptanceResult {
  if (input.presenceCarry === null) {
    return unavailable(input, "PRESENCE_CARRY_REQUIRED");
  }
  if (input.continuity === null) {
    return unavailable(input, "REALITY_CONTINUITY_REQUIRED");
  }
  if (input.pressureRuntime === null) {
    return unavailable(input, "PRESSURE_RUNTIME_REQUIRED");
  }
  if (input.gravityRuntime === null) {
    return unavailable(input, "GRAVITY_RUNTIME_REQUIRED");
  }
  if (input.choiceRuntime === null) {
    return unavailable(input, "CHOICE_RUNTIME_REQUIRED");
  }
  if (input.crystalRuntime === null) {
    return unavailable(input, "CRYSTAL_RUNTIME_REQUIRED");
  }
  if (
    !hasExpectedValues(
      input.observedStages,
      REALITY_FULL_EXPERIENCE_ACCEPTANCE_SEQUENCE,
    )
  ) {
    return blocked(input, "REALITY_SEQUENCE_INVALID");
  }
  if (input.presenceCarry.presenceContinuity !== "CONTINUOUS") {
    return blocked(input, "PRESENCE_CARRY_DISCONTINUOUS");
  }
  if (input.continuity.realityFlowIntegrity !== "CONTINUOUS") {
    return blocked(input, "REALITY_FLOW_BROKEN");
  }
  if (input.continuity.pressureContinuity !== "ACKNOWLEDGED") {
    return blocked(input, "PRESSURE_BOUNDARY_INCOMPLETE");
  }
  if (input.continuity.gravityContinuity !== "ACKNOWLEDGED") {
    return blocked(input, "GRAVITY_BOUNDARY_INCOMPLETE");
  }
  if (input.continuity.choiceContinuity !== "ACTIVE_RESPONSE") {
    return blocked(input, "CHOICE_BOUNDARY_INCOMPLETE");
  }
  if (!hasValidBoundary()) {
    return blocked(input, "REALITY_ACCEPTANCE_BOUNDARY_INVALID");
  }

  const qualities = Object.freeze([
    quality(input.presenceCarryQuality),
    quality(input.pressureObservationQuality),
    quality(input.gravityAwarenessQuality),
    quality(input.choiceAgencyQuality),
    quality(input.crystalTransitionReadiness),
    quality(input.realityJourneyIntegrity),
  ]);
  const issues = issueList(input.issues);
  const overallJourneyState = overallStateFor(qualities, issues);
  const reviewStatus = reviewStatusFor(
    overallJourneyState,
    qualities,
    issues,
  );
  const review: RealityFullExperienceAcceptance = Object.freeze({
    presenceCarryQuality: qualities[0],
    pressureObservationQuality: qualities[1],
    gravityAwarenessQuality: qualities[2],
    choiceAgencyQuality: qualities[3],
    crystalTransitionReadiness: qualities[4],
    realityJourneyIntegrity: qualities[5],
    overallJourneyState,
    sequence: REALITY_FULL_EXPERIENCE_ACCEPTANCE_SEQUENCE,
    presenceCarryContinuity: "CONTINUOUS",
    pressureBoundary: "OBSERVATION_ONLY",
    gravityBoundary: "INERTIA_OBSERVATION_ONLY",
    choiceBoundary: "RESPONSE_SPACE_ONLY",
    crystalBoundary: "TRANSFORMATION_RECOGNITION_READY",
    noEngineMutation: true,
    noStorage: true,
    issues,
    issueTypes: issueTypesFor(issues),
  });

  return Object.freeze({
    status: "READY" as const,
    reviewStatus,
    source: "reality_full_experience_acceptance" as const,
    input,
    review,
    boundary: REALITY_FULL_EXPERIENCE_ACCEPTANCE_BOUNDARY,
  });
}
