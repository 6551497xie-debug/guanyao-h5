export type ReleaseBaselineGateReference =
  "P109_FIRST_IMPRESSION_TEMPO_CALIBRATION";

export type ReleaseBaselineTimingContract = Readonly<{
  arrivalEndMs: 1400;
  presenceStartMs: 3800;
  phaseContract: '"ARRIVAL" | "FORMATION" | "PRESENCE"';
}>;

export type ReleaseBaselineAlignmentState =
  | "ALIGNED"
  | "MISALIGNED"
  | "PENDING";

export type ReleaseBaselineAlignmentBoundary = Readonly<{
  engineeringStabilityOnly: true;
  noRuntimeMutation: true;
  noUIMutation: true;
  noGenesisMutation: true;
  noRealityMutation: true;
  noExperienceLogicChange: true;
  noUserData: true;
  noStorage: true;
  noEngineResult: true;
}>;

export type ReleaseBaselineAlignmentInput = Readonly<{
  gateReference: ReleaseBaselineGateReference | null;
  expectedContract: ReleaseBaselineTimingContract | null;
  currentContract: ReleaseBaselineTimingContract | null;
}>;

export type ReleaseBaselineAlignment = Readonly<{
  gateReference: ReleaseBaselineGateReference;
  expectedContract: ReleaseBaselineTimingContract;
  currentContract: ReleaseBaselineTimingContract;
  alignmentState: Exclude<ReleaseBaselineAlignmentState, "PENDING">;
  compatibilityResult: "COMPATIBLE" | "INCOMPATIBLE";
  noExperienceLogicChange: true;
  noRuntimeMutation: true;
  noUIFlowChange: true;
}>;

export type ReleaseBaselineAlignmentReady = Readonly<{
  status: "READY";
  source: "release_baseline_alignment";
  input: ReleaseBaselineAlignmentInput;
  alignment: ReleaseBaselineAlignment;
  boundary: ReleaseBaselineAlignmentBoundary;
}>;

export type ReleaseBaselineAlignmentUnavailableReason =
  | "GATE_REFERENCE_REQUIRED"
  | "EXPECTED_CONTRACT_REQUIRED"
  | "CURRENT_CONTRACT_REQUIRED";

export type ReleaseBaselineAlignmentBlockedReason =
  | "GATE_REFERENCE_INVALID"
  | "BASELINE_CONTRACT_MISMATCH"
  | "ALIGNMENT_BOUNDARY_INVALID";

export type ReleaseBaselineAlignmentUnavailable = Readonly<{
  status: "UNAVAILABLE";
  source: "release_baseline_alignment";
  reason: ReleaseBaselineAlignmentUnavailableReason;
  input: ReleaseBaselineAlignmentInput;
  alignment: null;
  boundary: ReleaseBaselineAlignmentBoundary;
}>;

export type ReleaseBaselineAlignmentBlocked = Readonly<{
  status: "BLOCKED";
  source: "release_baseline_alignment";
  reason: ReleaseBaselineAlignmentBlockedReason;
  input: ReleaseBaselineAlignmentInput;
  alignment: null;
  boundary: ReleaseBaselineAlignmentBoundary;
}>;

export type ReleaseBaselineAlignmentResult =
  | ReleaseBaselineAlignmentReady
  | ReleaseBaselineAlignmentUnavailable
  | ReleaseBaselineAlignmentBlocked;
