import type {
  ReleaseBaselineAlignment,
  ReleaseBaselineAlignmentBlocked,
  ReleaseBaselineAlignmentBlockedReason,
  ReleaseBaselineAlignmentBoundary,
  ReleaseBaselineAlignmentInput,
  ReleaseBaselineAlignmentResult,
  ReleaseBaselineAlignmentUnavailable,
  ReleaseBaselineAlignmentUnavailableReason,
} from "../types/releaseBaselineAlignment";

export const P109_FIRST_IMPRESSION_TIMING_CONTRACT = Object.freeze({
  arrivalEndMs: 1400,
  presenceStartMs: 3800,
  phaseContract: '"ARRIVAL" | "FORMATION" | "PRESENCE"' as const,
});

export const RELEASE_BASELINE_UPSTREAM_REFERENCES = Object.freeze([
  "P40_FULL_LOOP_ACCEPTANCE",
  "P41_EXPERIENCE_OPTIMIZATION_REVIEW",
  "P43_FULL_LOOP_REVALIDATION",
  "P44_SPATIAL_DISTANCE_CALIBRATION",
  "P45_PRESENCE_CARRY",
  "P46_REALITY_CONTINUITY",
  "P47_REALITY_FULL_EXPERIENCE_ACCEPTANCE",
] as const);

export const RELEASE_BASELINE_ALIGNMENT_BOUNDARY: ReleaseBaselineAlignmentBoundary =
  Object.freeze({
    engineeringStabilityOnly: true,
    noRuntimeMutation: true,
    noUIMutation: true,
    noGenesisMutation: true,
    noRealityMutation: true,
    noExperienceLogicChange: true,
    noUserData: true,
    noStorage: true,
    noEngineResult: true,
  });

const unavailable = (
  input: ReleaseBaselineAlignmentInput,
  reason: ReleaseBaselineAlignmentUnavailableReason,
): ReleaseBaselineAlignmentUnavailable =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    source: "release_baseline_alignment" as const,
    reason,
    input,
    alignment: null,
    boundary: RELEASE_BASELINE_ALIGNMENT_BOUNDARY,
  });

const blocked = (
  input: ReleaseBaselineAlignmentInput,
  reason: ReleaseBaselineAlignmentBlockedReason,
): ReleaseBaselineAlignmentBlocked =>
  Object.freeze({
    status: "BLOCKED" as const,
    source: "release_baseline_alignment" as const,
    reason,
    input,
    alignment: null,
    boundary: RELEASE_BASELINE_ALIGNMENT_BOUNDARY,
  });

const contractsMatch = (
  expected: ReleaseBaselineAlignmentInput["expectedContract"],
  current: ReleaseBaselineAlignmentInput["currentContract"],
): boolean =>
  expected !== null &&
  current !== null &&
  expected.arrivalEndMs === current.arrivalEndMs &&
  expected.presenceStartMs === current.presenceStartMs &&
  expected.phaseContract === current.phaseContract;

const boundaryIsValid = (): boolean =>
  Object.values(RELEASE_BASELINE_ALIGNMENT_BOUNDARY).every(
    (value) => value === true,
  );

export function resolveReleaseBaselineAlignment(
  input: ReleaseBaselineAlignmentInput,
): ReleaseBaselineAlignmentResult {
  if (input.gateReference === null) {
    return unavailable(input, "GATE_REFERENCE_REQUIRED");
  }
  if (input.expectedContract === null) {
    return unavailable(input, "EXPECTED_CONTRACT_REQUIRED");
  }
  if (input.currentContract === null) {
    return unavailable(input, "CURRENT_CONTRACT_REQUIRED");
  }
  if (input.gateReference !== "P109_FIRST_IMPRESSION_TEMPO_CALIBRATION") {
    return blocked(input, "GATE_REFERENCE_INVALID");
  }
  if (!contractsMatch(input.expectedContract, input.currentContract)) {
    return blocked(input, "BASELINE_CONTRACT_MISMATCH");
  }
  if (!boundaryIsValid()) {
    return blocked(input, "ALIGNMENT_BOUNDARY_INVALID");
  }

  const alignment: ReleaseBaselineAlignment = Object.freeze({
    gateReference: input.gateReference,
    expectedContract: input.expectedContract,
    currentContract: input.currentContract,
    alignmentState: "ALIGNED",
    compatibilityResult: "COMPATIBLE",
    noExperienceLogicChange: true,
    noRuntimeMutation: true,
    noUIFlowChange: true,
  });

  return Object.freeze({
    status: "READY" as const,
    source: "release_baseline_alignment" as const,
    input,
    alignment,
    boundary: RELEASE_BASELINE_ALIGNMENT_BOUNDARY,
  });
}

export const alignReleaseBaseline = resolveReleaseBaselineAlignment;
