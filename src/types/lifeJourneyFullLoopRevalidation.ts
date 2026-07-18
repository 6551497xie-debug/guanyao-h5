import type {
  LifeJourneyFullLoopAcceptanceResult,
  LifeJourneyFullLoopAction,
  LifeJourneyFullLoopStage,
} from "./lifeJourneyFullLoopAcceptance";
import type { LifeJourneyOptimizationIssueType } from "./lifeJourneyExperienceOptimizationReview";
import type { RecognitionRealityEntryBridgeFixResult } from "./recognitionRealityEntryBridgeFix";

export type LifeJourneyFullLoopRevalidationDimension =
  | "PENDING"
  | "PASS"
  | "NEEDS_REVIEW";

export type LifeJourneyFullLoopRevalidationOverallState =
  | "PASS"
  | "NEEDS_REVIEW";

export type LifeJourneyFullLoopRevalidationStatus =
  | "PENDING_HUMAN_REVALIDATION"
  | "REVALIDATED"
  | "NEEDS_REVIEW";

export type LifeJourneyFullLoopRevalidationIssue = Readonly<{
  stage: LifeJourneyFullLoopStage;
  issueType: LifeJourneyOptimizationIssueType;
  observation: string;
  manualAcceptanceNote: string;
}>;

export type LifeJourneyFullLoopRevalidationBoundary = Readonly<{
  revalidationReviewOnly: true;
  manualObservationOnly: true;
  noAutomaticRepair: true;
  noRuntimeMutation: true;
  noUIMutation: true;
  noVisualStateMutation: true;
  noGenesisMutation: true;
  noRealityMutation: true;
  noCrystalMutation: true;
  noUserData: true;
  noProductMetrics: true;
  noStorageData: true;
  noEngineResult: true;
  noProductionIntegration: true;
}>;

export type LifeJourneyFullLoopRevalidationInput = Readonly<{
  fullLoopAcceptance: LifeJourneyFullLoopAcceptanceResult | null;
  bridgeFix: RecognitionRealityEntryBridgeFixResult | null;
  observedStages: readonly LifeJourneyFullLoopStage[];
  observedActions: readonly LifeJourneyFullLoopAction[];
  genesisContinuity?: LifeJourneyFullLoopRevalidationDimension;
  recognitionContinuity?: LifeJourneyFullLoopRevalidationDimension;
  realityEntryContinuity?: LifeJourneyFullLoopRevalidationDimension;
  pressureExperienceState?: LifeJourneyFullLoopRevalidationDimension;
  gravityExperienceState?: LifeJourneyFullLoopRevalidationDimension;
  choiceAgencyState?: LifeJourneyFullLoopRevalidationDimension;
  crystalCompletionState?: LifeJourneyFullLoopRevalidationDimension;
  revalidationIssues?: readonly LifeJourneyFullLoopRevalidationIssue[];
}>;

export type LifeJourneyFullLoopRevalidationReview = Readonly<{
  genesisContinuity: LifeJourneyFullLoopRevalidationDimension;
  recognitionContinuity: LifeJourneyFullLoopRevalidationDimension;
  realityEntryContinuity: LifeJourneyFullLoopRevalidationDimension;
  pressureExperienceState: LifeJourneyFullLoopRevalidationDimension;
  gravityExperienceState: LifeJourneyFullLoopRevalidationDimension;
  choiceAgencyState: LifeJourneyFullLoopRevalidationDimension;
  crystalCompletionState: LifeJourneyFullLoopRevalidationDimension;
  overallJourneyState: LifeJourneyFullLoopRevalidationOverallState;
  sequence: readonly [
    "ENTRY",
    "GENESIS",
    "RECOGNITION",
    "REALITY_ENTRY",
    "PRESSURE",
    "GRAVITY",
    "CHOICE",
    "CRYSTAL",
    "JOURNEY_COMPLETE",
  ];
  actions: readonly [
    "TIME_DELIVERY",
    "CHOICE_ACTIVE_RESPONSE",
    "CRYSTAL_RECOGNITION_CONFIRM",
  ];
  bridgeState: "BRIDGE_READY";
  bridgeIntegrity: "CONTINUOUS";
  noGenesisReset: true;
  noPrematureRealityEntry: true;
  journeyCompleteReachable: true;
  revalidationIssues: readonly LifeJourneyFullLoopRevalidationIssue[];
  issueTypes: readonly LifeJourneyOptimizationIssueType[];
}>;

export type LifeJourneyFullLoopRevalidation =
  LifeJourneyFullLoopRevalidationReview;

export type LifeJourneyFullLoopRevalidationReady = Readonly<{
  status: "READY";
  reviewStatus: LifeJourneyFullLoopRevalidationStatus;
  source: "life_journey_full_loop_revalidation";
  input: LifeJourneyFullLoopRevalidationInput;
  review: LifeJourneyFullLoopRevalidationReview;
  boundary: LifeJourneyFullLoopRevalidationBoundary;
}>;

export type LifeJourneyFullLoopRevalidationUnavailableReason =
  | "FULL_LOOP_ACCEPTANCE_REQUIRED"
  | "BRIDGE_FIX_REQUIRED";

export type LifeJourneyFullLoopRevalidationBlockedReason =
  | "FULL_LOOP_ACCEPTANCE_UNAVAILABLE"
  | "FULL_LOOP_ACCEPTANCE_BLOCKED"
  | "BRIDGE_FIX_UNAVAILABLE"
  | "BRIDGE_FIX_BLOCKED"
  | "FULL_LOOP_SEQUENCE_INVALID"
  | "USER_ACTION_SEQUENCE_INVALID"
  | "P42_BRIDGE_NOT_CONTINUOUS"
  | "REVALIDATION_BOUNDARY_INVALID";

export type LifeJourneyFullLoopRevalidationUnavailable = Readonly<{
  status: "UNAVAILABLE";
  reviewStatus: "UNAVAILABLE";
  source: "life_journey_full_loop_revalidation";
  reason: LifeJourneyFullLoopRevalidationUnavailableReason;
  input: LifeJourneyFullLoopRevalidationInput;
  review: null;
  boundary: LifeJourneyFullLoopRevalidationBoundary;
}>;

export type LifeJourneyFullLoopRevalidationBlocked = Readonly<{
  status: "BLOCKED";
  reviewStatus: "BLOCKED";
  source: "life_journey_full_loop_revalidation";
  reason: LifeJourneyFullLoopRevalidationBlockedReason;
  input: LifeJourneyFullLoopRevalidationInput;
  review: null;
  boundary: LifeJourneyFullLoopRevalidationBoundary;
}>;

export type LifeJourneyFullLoopRevalidationResult =
  | LifeJourneyFullLoopRevalidationReady
  | LifeJourneyFullLoopRevalidationUnavailable
  | LifeJourneyFullLoopRevalidationBlocked;
