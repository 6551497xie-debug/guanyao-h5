import type { LifeJourneyFullLoopAcceptanceResult } from "./lifeJourneyFullLoopAcceptance";

export type LifeJourneyOptimizationStage =
  | "ENTRY"
  | "GENESIS"
  | "RECOGNITION"
  | "REALITY_ENTRY"
  | "PRESSURE"
  | "GRAVITY"
  | "CHOICE"
  | "CRYSTAL"
  | "JOURNEY_COMPLETE";

export type LifeJourneyOptimizationIssueType =
  | "SEMANTIC_DRIFT"
  | "VISUAL_WEIGHT_IMBALANCE"
  | "IMMERSION_BREAK"
  | "INTERACTION_MECHANICAL"
  | "LIFE_PRESENCE_WEAK"
  | "REALITY_TRANSITION_WEAK"
  | "CHOICE_AGENCY_WEAK"
  | "CRYSTAL_MEANING_WEAK"
  | "PRESENCE_CARRY_BREAK"
  | "DISTANCE_LANGUAGE_MISMATCH";

export type LifeJourneyOptimizationReviewDimension =
  | "PENDING"
  | "PASS"
  | "NEEDS_REVIEW";

export type LifeJourneyOptimizationIssue = Readonly<{
  stage: LifeJourneyOptimizationStage;
  issueType: LifeJourneyOptimizationIssueType;
  observation: string;
  manualOptimizationSuggestion: string;
}>;

export type LifeJourneyExperienceOptimizationReviewBoundary = Readonly<{
  reviewOnly: true;
  manualObservationOnly: true;
  noAutomaticOptimization: true;
  noUserProfile: true;
  noDataAnalysis: true;
  noCommercialMetrics: true;
  noRuntimeMutation: true;
  noUIMutation: true;
  noVisualStateMutation: true;
  noEngineMutation: true;
  noStorage: true;
  noArchive: true;
}>;

export type LifeJourneyExperienceOptimizationReviewInput = Readonly<{
  fullLoopAcceptance: LifeJourneyFullLoopAcceptanceResult | null;
  firstEntryExperience?: LifeJourneyOptimizationReviewDimension;
  genesisExperienceQuality?: LifeJourneyOptimizationReviewDimension;
  recognitionExperienceQuality?: LifeJourneyOptimizationReviewDimension;
  realityTransitionQuality?: LifeJourneyOptimizationReviewDimension;
  agencyExperienceQuality?: LifeJourneyOptimizationReviewDimension;
  crystalExperienceQuality?: LifeJourneyOptimizationReviewDimension;
  optimizationIssues?: readonly LifeJourneyOptimizationIssue[];
}>;

export type LifeJourneyExperienceOptimizationReviewStatus =
  | "PENDING_MANUAL_REVIEW"
  | "REVIEWED";

export type LifeJourneyExperienceOptimizationReviewState = Readonly<{
  firstEntryExperience: LifeJourneyOptimizationReviewDimension;
  genesisExperienceQuality: LifeJourneyOptimizationReviewDimension;
  recognitionExperienceQuality: LifeJourneyOptimizationReviewDimension;
  realityTransitionQuality: LifeJourneyOptimizationReviewDimension;
  agencyExperienceQuality: LifeJourneyOptimizationReviewDimension;
  crystalExperienceQuality: LifeJourneyOptimizationReviewDimension;
  optimizationIssues: readonly LifeJourneyOptimizationIssue[];
  sequenceReference: readonly [
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
  optimizationPriority: readonly [
    "SEMANTIC_CONSISTENCY",
    "LIFE_EXPERIENCE_CONTINUITY",
    "VISUAL_EXPRESSION",
    "INTERACTION_DETAIL",
    "ENGINEERING_OPTIMIZATION",
  ];
  automaticOptimizationConclusion: false;
}>;

export type LifeJourneyExperienceOptimizationReview =
  LifeJourneyExperienceOptimizationReviewState;

export type LifeJourneyExperienceOptimizationReviewReady = Readonly<{
  status: "READY";
  reviewStatus: LifeJourneyExperienceOptimizationReviewStatus;
  source: "life_journey_experience_optimization_review";
  input: LifeJourneyExperienceOptimizationReviewInput;
  review: LifeJourneyExperienceOptimizationReviewState;
  boundary: LifeJourneyExperienceOptimizationReviewBoundary;
}>;

export type LifeJourneyExperienceOptimizationReviewUnavailableReason =
  | "FULL_LOOP_ACCEPTANCE_REQUIRED";

export type LifeJourneyExperienceOptimizationReviewBlockedReason =
  | "FULL_LOOP_ACCEPTANCE_UNAVAILABLE"
  | "FULL_LOOP_ACCEPTANCE_BLOCKED"
  | "FULL_LOOP_SEQUENCE_INVALID"
  | "OPTIMIZATION_REVIEW_BOUNDARY_INVALID";

export type LifeJourneyExperienceOptimizationReviewUnavailable = Readonly<{
  status: "UNAVAILABLE";
  reviewStatus: "UNAVAILABLE";
  source: "life_journey_experience_optimization_review";
  reason: LifeJourneyExperienceOptimizationReviewUnavailableReason;
  input: LifeJourneyExperienceOptimizationReviewInput;
  review: null;
  boundary: LifeJourneyExperienceOptimizationReviewBoundary;
}>;

export type LifeJourneyExperienceOptimizationReviewBlocked = Readonly<{
  status: "BLOCKED";
  reviewStatus: "BLOCKED";
  source: "life_journey_experience_optimization_review";
  reason: LifeJourneyExperienceOptimizationReviewBlockedReason;
  input: LifeJourneyExperienceOptimizationReviewInput;
  review: null;
  boundary: LifeJourneyExperienceOptimizationReviewBoundary;
}>;

export type LifeJourneyExperienceOptimizationReviewResult =
  | LifeJourneyExperienceOptimizationReviewReady
  | LifeJourneyExperienceOptimizationReviewUnavailable
  | LifeJourneyExperienceOptimizationReviewBlocked;
