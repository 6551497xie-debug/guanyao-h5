export type FirstImpressionWalkthroughJourneyStage =
  | "ENTRY"
  | "GENESIS"
  | "RECOGNITION"
  | "REALITY_ENTRY"
  | "PRESSURE_READY";

export type FirstImpressionWalkthroughDimension =
  | "PENDING"
  | "PASS"
  | "NEEDS_REVIEW";

export type FirstImpressionWalkthroughStatus =
  | "PENDING_HUMAN_WALKTHROUGH"
  | "WALKTHROUGH_COMPLETE"
  | "NEEDS_REVIEW";

export type FirstImpressionEntryFirstView =
  | "LIFE_OBSERVATION_SPACE"
  | "TEST_TOOL_PERCEPTION"
  | "NOT_REVIEWED";

export type FirstImpressionGenesisJourneyFeeling =
  | "COSMIC_LIFE_JOURNEY"
  | "ANIMATION_OR_TOOL"
  | "NOT_REVIEWED";

export type FirstImpressionTimeDeliveryClarity =
  | "LIFE_TIME_DELIVERY"
  | "FORM_SUBMISSION"
  | "NOT_REVIEWED";

export type FirstImpressionRecognitionFeeling =
  | "LIFE_RECOGNITION"
  | "RESULT_GENERATION"
  | "NOT_REVIEWED";

export type FirstImpressionRealityTransitionFeeling =
  | "PRESENCE_CARRIES_INTO_REALITY"
  | "SEPARATE_ANALYSIS_SPACE"
  | "NOT_REVIEWED";

export type FirstImpressionWalkthroughIssueType =
  | "FIRST_IMPRESSION_GAP"
  | "GENESIS_SEMANTIC_DRIFT"
  | "TIME_DELIVERY_CONFUSION"
  | "RECOGNITION_EMOTION_WEAK"
  | "REALITY_ENTRY_TRANSITION_WEAK";

export type FirstImpressionWalkthroughIssue = Readonly<{
  stage: FirstImpressionWalkthroughJourneyStage;
  issueType: FirstImpressionWalkthroughIssueType;
  observation: string;
  manualReviewNote: string;
}>;

export type FirstImpressionWalkthroughBoundary = Readonly<{
  walkthroughReviewOnly: true;
  manualObservationOnly: true;
  noAutomaticRepair: true;
  noRuntimeMutation: true;
  noUIMutation: true;
  noVisualStateMutation: true;
  noGenesisMutation: true;
  noRealityMutation: true;
  noEngineMutation: true;
  noStorage: true;
  noArchive: true;
  noUserProfile: true;
  noProductMetrics: true;
  noCommercialFlow: true;
}>;

export type FirstImpressionWalkthroughUpstreamReference =
  | "P40_FULL_LOOP_ACCEPTANCE"
  | "P41_EXPERIENCE_OPTIMIZATION_REVIEW"
  | "P43_FULL_LOOP_REVALIDATION"
  | "P44_SPATIAL_DISTANCE_CALIBRATION"
  | "P45_PRESENCE_CARRY"
  | "P46_REALITY_CONTINUITY"
  | "P47_REALITY_FULL_EXPERIENCE_ACCEPTANCE"
  | "P48_FIRST_IMPRESSION_CALIBRATION"
  | "P49_RELEASE_GATE_ALIGNMENT";

export type FirstImpressionBrowserWalkthroughInput = Readonly<{
  upstreamReferences: readonly FirstImpressionWalkthroughUpstreamReference[];
  observedStages: readonly FirstImpressionWalkthroughJourneyStage[];
  entryFirstView?: FirstImpressionEntryFirstView;
  genesisJourneyFeeling?: FirstImpressionGenesisJourneyFeeling;
  timeDeliveryClarity?: FirstImpressionTimeDeliveryClarity;
  recognitionFeeling?: FirstImpressionRecognitionFeeling;
  realityTransitionFeeling?: FirstImpressionRealityTransitionFeeling;
  blockingIssues?: readonly FirstImpressionWalkthroughIssue[];
}>;

export type FirstImpressionBrowserWalkthroughReview = Readonly<{
  entryFirstView: FirstImpressionEntryFirstView;
  genesisJourneyFeeling: FirstImpressionGenesisJourneyFeeling;
  timeDeliveryClarity: FirstImpressionTimeDeliveryClarity;
  recognitionFeeling: FirstImpressionRecognitionFeeling;
  realityTransitionFeeling: FirstImpressionRealityTransitionFeeling;
  blockingIssues: readonly FirstImpressionWalkthroughIssue[];
  issueTypes: readonly FirstImpressionWalkthroughIssueType[];
  journeyReference: readonly [
    "ENTRY",
    "GENESIS",
    "RECOGNITION",
    "REALITY_ENTRY",
    "PRESSURE_READY",
  ];
  noAutomaticRepair: true;
  noRuntimeMutation: true;
  noProductMetrics: true;
}>;

export type FirstImpressionBrowserWalkthrough =
  FirstImpressionBrowserWalkthroughReview;

export type FirstImpressionBrowserWalkthroughReady = Readonly<{
  status: "READY";
  reviewStatus: FirstImpressionWalkthroughStatus;
  source: "first_impression_browser_walkthrough";
  input: FirstImpressionBrowserWalkthroughInput;
  review: FirstImpressionBrowserWalkthroughReview;
  boundary: FirstImpressionWalkthroughBoundary;
}>;

export type FirstImpressionBrowserWalkthroughUnavailableReason =
  | "UPSTREAM_REFERENCES_REQUIRED"
  | "OBSERVED_STAGES_REQUIRED";

export type FirstImpressionBrowserWalkthroughBlockedReason =
  | "UPSTREAM_REFERENCE_INVALID"
  | "OBSERVED_SEQUENCE_INVALID"
  | "WALKTHROUGH_BOUNDARY_INVALID";

export type FirstImpressionBrowserWalkthroughUnavailable = Readonly<{
  status: "UNAVAILABLE";
  reviewStatus: "UNAVAILABLE";
  source: "first_impression_browser_walkthrough";
  reason: FirstImpressionBrowserWalkthroughUnavailableReason;
  input: FirstImpressionBrowserWalkthroughInput;
  review: null;
  boundary: FirstImpressionWalkthroughBoundary;
}>;

export type FirstImpressionBrowserWalkthroughBlocked = Readonly<{
  status: "BLOCKED";
  reviewStatus: "BLOCKED";
  source: "first_impression_browser_walkthrough";
  reason: FirstImpressionBrowserWalkthroughBlockedReason;
  input: FirstImpressionBrowserWalkthroughInput;
  review: null;
  boundary: FirstImpressionWalkthroughBoundary;
}>;

export type FirstImpressionBrowserWalkthroughResult =
  | FirstImpressionBrowserWalkthroughReady
  | FirstImpressionBrowserWalkthroughUnavailable
  | FirstImpressionBrowserWalkthroughBlocked;
