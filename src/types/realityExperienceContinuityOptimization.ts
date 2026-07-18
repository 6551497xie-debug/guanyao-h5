import type { PresenceCarryRealityTransition } from "./presenceCarryRealityTransition";
import type { PressureRecognitionUIRuntime } from "./pressureRecognitionUIRuntime";
import type { GravityExperienceUIRuntime } from "./gravityExperienceUIRuntime";
import type { ChoiceExperienceUIRuntime } from "./choiceExperienceUIRuntime";

export type RealityPressureContinuity =
  | "NOT_READY"
  | "OBSERVING"
  | "ACKNOWLEDGED";

export type RealityGravityContinuity =
  | "WAITING_FOR_PRESSURE"
  | "OBSERVING"
  | "ACKNOWLEDGED";

export type RealityChoiceContinuity =
  | "WAITING_FOR_GRAVITY"
  | "RESPONSE_GAP_OPEN"
  | "ACTIVE_RESPONSE";

export type RealityExperienceFlowIntegrity =
  | "NOT_READY"
  | "CONTINUOUS"
  | "BROKEN";

export type RealityExperienceObservationMode =
  | "REALITY_SIGNAL_OBSERVATION"
  | "INERTIA_AWARENESS"
  | "RESPONSE_SPACE"
  | "RESPONSE_ACKNOWLEDGED";

export type RealityExperienceContinuityOptimizationBoundary = Readonly<{
  experienceOptimizationOnly: true;
  noPressureMutation: true;
  noGravityMutation: true;
  noChoiceMutation: true;
  noGenesisMutation: true;
  noVisualStateMutation: true;
  noUserDiagnosis: true;
  noBehaviorScore: true;
  noUserProfile: true;
  noIdentity: true;
  noEngineResult: true;
  noStorage: true;
}>;

export type RealityExperienceContinuityOptimizationInput = Readonly<{
  presenceCarry: PresenceCarryRealityTransition | null;
  pressureRuntime: PressureRecognitionUIRuntime | null;
  gravityRuntime: GravityExperienceUIRuntime | null;
  choiceRuntime: ChoiceExperienceUIRuntime | null;
  pressureObservationConfirmed: boolean;
  gravityObservationConfirmed: boolean;
  choiceActiveResponseConfirmed: boolean;
}>;

export type RealityExperienceContinuityOptimization = Readonly<{
  semanticRole: "REALITY_EXPERIENCE_CONTINUITY_OPTIMIZATION";
  pressureContinuity: RealityPressureContinuity;
  gravityContinuity: RealityGravityContinuity;
  choiceContinuity: RealityChoiceContinuity;
  presenceCarryReference: "PRESENCE_CARRY_REALITY_TRANSITION";
  realityFlowIntegrity: RealityExperienceFlowIntegrity;
  observationMode: RealityExperienceObservationMode;
  boundary: RealityExperienceContinuityOptimizationBoundary;
}>;

export type RealityExperienceContinuityOptimizationReady = Readonly<{
  status: "READY";
  source: "reality_experience_continuity_optimization";
  continuity: RealityExperienceContinuityOptimization;
  input: RealityExperienceContinuityOptimizationInput;
  boundary: RealityExperienceContinuityOptimizationBoundary;
}>;

export type RealityExperienceContinuityOptimizationUnavailableReason =
  | "PRESENCE_CARRY_REQUIRED"
  | "PRESSURE_RUNTIME_REQUIRED";

export type RealityExperienceContinuityOptimizationBlockedReason =
  | "PRESENCE_CARRY_DISCONTINUITY"
  | "GRAVITY_RUNTIME_BEFORE_PRESSURE"
  | "CHOICE_RUNTIME_BEFORE_GRAVITY"
  | "REALITY_RUNTIME_STATE_MISMATCH";

export type RealityExperienceContinuityOptimizationUnavailable = Readonly<{
  status: "UNAVAILABLE";
  source: "reality_experience_continuity_optimization";
  reason: RealityExperienceContinuityOptimizationUnavailableReason;
  continuity: null;
  input: RealityExperienceContinuityOptimizationInput;
  boundary: RealityExperienceContinuityOptimizationBoundary;
}>;

export type RealityExperienceContinuityOptimizationBlocked = Readonly<{
  status: "BLOCKED";
  source: "reality_experience_continuity_optimization";
  reason: RealityExperienceContinuityOptimizationBlockedReason;
  continuity: RealityExperienceContinuityOptimization;
  input: RealityExperienceContinuityOptimizationInput;
  boundary: RealityExperienceContinuityOptimizationBoundary;
}>;

export type RealityExperienceContinuityOptimizationResult =
  | RealityExperienceContinuityOptimizationReady
  | RealityExperienceContinuityOptimizationUnavailable
  | RealityExperienceContinuityOptimizationBlocked;
