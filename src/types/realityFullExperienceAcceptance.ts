import type { ChoiceExperienceUIRuntime } from "./choiceExperienceUIRuntime";
import type { CrystalExperienceUIRuntime } from "./crystalExperienceUIRuntime";
import type { GravityExperienceUIRuntime } from "./gravityExperienceUIRuntime";
import type { PresenceCarryRealityTransition } from "./presenceCarryRealityTransition";
import type { PressureRecognitionUIRuntime } from "./pressureRecognitionUIRuntime";
import type { RealityExperienceContinuityOptimization } from "./realityExperienceContinuityOptimization";

export type RealityFullExperienceAcceptanceStage =
  | "PRESENCE_CARRY"
  | "PRESSURE"
  | "GRAVITY"
  | "CHOICE"
  | "CRYSTAL_READY";

export type RealityFullExperienceAcceptanceQuality =
  | "PENDING"
  | "PASS"
  | "NEEDS_REVIEW";

export type RealityFullExperienceAcceptanceOverallState =
  | "PASS"
  | "NEEDS_REVIEW";

export type RealityFullExperienceAcceptanceStatus =
  | "PENDING_HUMAN_ACCEPTANCE"
  | "ACCEPTED"
  | "NEEDS_REVIEW";

export type RealityFullExperienceAcceptanceIssueType =
  | "PRESSURE_ANALYSIS_DRIFT"
  | "GRAVITY_JUDGEMENT_DRIFT"
  | "CHOICE_AGENCY_WEAK"
  | "PRESENCE_CARRY_BREAK"
  | "CRYSTAL_REWARD_DRIFT";

export type RealityFullExperienceAcceptanceIssue = Readonly<{
  stage: RealityFullExperienceAcceptanceStage;
  issueType: RealityFullExperienceAcceptanceIssueType;
  observation: string;
  manualAcceptanceNote: string;
}>;

export type RealityFullExperienceAcceptanceBoundary = Readonly<{
  acceptanceReviewOnly: true;
  manualObservationOnly: true;
  noAutomaticRepair: true;
  noRuntimeMutation: true;
  noUIMutation: true;
  noVisualStateMutation: true;
  noEngineMutation: true;
  noGenesisMutation: true;
  noPressureMutation: true;
  noGravityMutation: true;
  noChoiceMutation: true;
  noCrystalMutation: true;
  noUserData: true;
  noDiagnosis: true;
  noMetrics: true;
  noStorage: true;
  noProductionIntegration: true;
}>;

export type RealityFullExperienceAcceptanceInput = Readonly<{
  presenceCarry: PresenceCarryRealityTransition | null;
  continuity: RealityExperienceContinuityOptimization | null;
  pressureRuntime: PressureRecognitionUIRuntime | null;
  gravityRuntime: GravityExperienceUIRuntime | null;
  choiceRuntime: ChoiceExperienceUIRuntime | null;
  crystalRuntime: CrystalExperienceUIRuntime | null;
  observedStages: readonly RealityFullExperienceAcceptanceStage[];
  presenceCarryQuality?: RealityFullExperienceAcceptanceQuality;
  pressureObservationQuality?: RealityFullExperienceAcceptanceQuality;
  gravityAwarenessQuality?: RealityFullExperienceAcceptanceQuality;
  choiceAgencyQuality?: RealityFullExperienceAcceptanceQuality;
  crystalTransitionReadiness?: RealityFullExperienceAcceptanceQuality;
  realityJourneyIntegrity?: RealityFullExperienceAcceptanceQuality;
  issues?: readonly RealityFullExperienceAcceptanceIssue[];
}>;

export type RealityFullExperienceAcceptanceReview = Readonly<{
  presenceCarryQuality: RealityFullExperienceAcceptanceQuality;
  pressureObservationQuality: RealityFullExperienceAcceptanceQuality;
  gravityAwarenessQuality: RealityFullExperienceAcceptanceQuality;
  choiceAgencyQuality: RealityFullExperienceAcceptanceQuality;
  crystalTransitionReadiness: RealityFullExperienceAcceptanceQuality;
  realityJourneyIntegrity: RealityFullExperienceAcceptanceQuality;
  overallJourneyState: RealityFullExperienceAcceptanceOverallState;
  sequence: readonly [
    "PRESENCE_CARRY",
    "PRESSURE",
    "GRAVITY",
    "CHOICE",
    "CRYSTAL_READY",
  ];
  presenceCarryContinuity: "CONTINUOUS";
  pressureBoundary: "OBSERVATION_ONLY";
  gravityBoundary: "INERTIA_OBSERVATION_ONLY";
  choiceBoundary: "RESPONSE_SPACE_ONLY";
  crystalBoundary: "TRANSFORMATION_RECOGNITION_READY";
  noEngineMutation: true;
  noStorage: true;
  issues: readonly RealityFullExperienceAcceptanceIssue[];
  issueTypes: readonly RealityFullExperienceAcceptanceIssueType[];
}>;

export type RealityFullExperienceAcceptance =
  RealityFullExperienceAcceptanceReview;

export type RealityFullExperienceAcceptanceReady = Readonly<{
  status: "READY";
  reviewStatus: RealityFullExperienceAcceptanceStatus;
  source: "reality_full_experience_acceptance";
  input: RealityFullExperienceAcceptanceInput;
  review: RealityFullExperienceAcceptanceReview;
  boundary: RealityFullExperienceAcceptanceBoundary;
}>;

export type RealityFullExperienceAcceptanceUnavailableReason =
  | "PRESENCE_CARRY_REQUIRED"
  | "REALITY_CONTINUITY_REQUIRED"
  | "PRESSURE_RUNTIME_REQUIRED"
  | "GRAVITY_RUNTIME_REQUIRED"
  | "CHOICE_RUNTIME_REQUIRED"
  | "CRYSTAL_RUNTIME_REQUIRED";

export type RealityFullExperienceAcceptanceBlockedReason =
  | "REALITY_SEQUENCE_INVALID"
  | "PRESENCE_CARRY_DISCONTINUOUS"
  | "REALITY_FLOW_BROKEN"
  | "PRESSURE_BOUNDARY_INCOMPLETE"
  | "GRAVITY_BOUNDARY_INCOMPLETE"
  | "CHOICE_BOUNDARY_INCOMPLETE"
  | "CRYSTAL_BOUNDARY_INCOMPLETE"
  | "REALITY_ACCEPTANCE_BOUNDARY_INVALID";

export type RealityFullExperienceAcceptanceUnavailable = Readonly<{
  status: "UNAVAILABLE";
  reviewStatus: "UNAVAILABLE";
  source: "reality_full_experience_acceptance";
  reason: RealityFullExperienceAcceptanceUnavailableReason;
  input: RealityFullExperienceAcceptanceInput;
  review: null;
  boundary: RealityFullExperienceAcceptanceBoundary;
}>;

export type RealityFullExperienceAcceptanceBlocked = Readonly<{
  status: "BLOCKED";
  reviewStatus: "BLOCKED";
  source: "reality_full_experience_acceptance";
  reason: RealityFullExperienceAcceptanceBlockedReason;
  input: RealityFullExperienceAcceptanceInput;
  review: null;
  boundary: RealityFullExperienceAcceptanceBoundary;
}>;

export type RealityFullExperienceAcceptanceResult =
  | RealityFullExperienceAcceptanceReady
  | RealityFullExperienceAcceptanceUnavailable
  | RealityFullExperienceAcceptanceBlocked;
