import type {
  GenesisRuntimeStage,
  GenesisRuntimeStateMachine,
} from "./genesisRuntimeStateMachine";

export type GenesisRhythmProfile = "DEEP" | "FLOW" | "RESPONSE";

export type GenesisStageDuration =
  | "DEEPLY_HELD"
  | "SLOWLY_FLOWING"
  | "RESPONSE_WINDOW"
  | "COMPLETION_HOLD";

export type GenesisTransitionDuration =
  | "LONG"
  | "GRADUAL"
  | "PATIENT"
  | "NO_AUTOMATIC_TRANSITION";

export type GenesisTransitionEasing =
  | "QUIET_DISSOLVE"
  | "STEADY_EXPANSION"
  | "PATIENT_RESPONSE"
  | "GRADUAL_AGGREGATION"
  | "SLOW_IMPRINT"
  | "GENTLE_AWAKENING"
  | "QUIET_RETURN"
  | "NO_AUTOMATIC_TRANSITION";

export type GenesisUserPauseWindow =
  | "OBSERVATION_WINDOW"
  | "TIME_DELIVERY_WINDOW"
  | "RECOGNITION_WINDOW"
  | "NO_USER_ACTION";

export type GenesisCompletionHold = "LONG_RECOGNITION_HOLD";

export type GenesisTransitionTimelineStage = Readonly<{
  stage: GenesisRuntimeStage;
  stageDuration: GenesisStageDuration;
  transitionDuration: GenesisTransitionDuration;
  rhythmProfile: GenesisRhythmProfile;
  transitionEasing: GenesisTransitionEasing;
  userPauseWindow: GenesisUserPauseWindow;
}>;

export type GenesisTransitionTimelineBoundary = Readonly<{
  timelineDefinitionOnly: true;
  noFastRhythm: true;
  noRendererAnimation: true;
  noWebGL: true;
  noShader: true;
  noParticleParameters: true;
  noVisualStateMutation: true;
  noIdentityMutation: true;
  noEngineInvocation: true;
  noStorageWrite: true;
  noUserFlowIntegration: true;
  noReality: true;
  noGravity: true;
  noChoice: true;
  noCrystal: true;
}>;

export type GenesisTransitionTimeline = Readonly<{
  stages: readonly [
    GenesisTransitionTimelineStage,
    GenesisTransitionTimelineStage,
    GenesisTransitionTimelineStage,
    GenesisTransitionTimelineStage,
    GenesisTransitionTimelineStage,
    GenesisTransitionTimelineStage,
    GenesisTransitionTimelineStage,
    GenesisTransitionTimelineStage,
  ];
  completionHold: GenesisCompletionHold;
  runtimeStateMachineReference: GenesisRuntimeStateMachine;
  boundary: GenesisTransitionTimelineBoundary;
}>;

export type GenesisTransitionTimelineInput = Readonly<{
  stateMachineReference: GenesisRuntimeStateMachine | null;
}>;

export type GenesisTransitionTimelineUnavailableReason =
  | "STATE_MACHINE_REFERENCE_REQUIRED"
  | "STATE_MACHINE_REFERENCE_UNAVAILABLE";

export type GenesisTransitionTimelineBlockedReason =
  | "STATE_MACHINE_SEQUENCE_INVALID"
  | "STATE_MACHINE_BOUNDARY_INVALID"
  | "TIMELINE_SEQUENCE_INVALID"
  | "FAST_RHYTHM_FORBIDDEN"
  | "USER_PAUSE_WINDOW_MISSING"
  | "COMPLETION_HOLD_MISSING"
  | "TIMELINE_BOUNDARY_INVALID";

export type GenesisTransitionTimelineReady = Readonly<{
  status: "READY";
  timelineStatus: "GENESIS_TRANSITION_TIMELINE_READY";
  source: "genesis_transition_timeline";
  input: GenesisTransitionTimelineInput;
  timeline: GenesisTransitionTimeline;
  boundary: GenesisTransitionTimelineBoundary;
}>;

export type GenesisTransitionTimelineUnavailable = Readonly<{
  status: "UNAVAILABLE";
  timelineStatus: "UNAVAILABLE";
  source: "genesis_transition_timeline";
  reason: GenesisTransitionTimelineUnavailableReason;
  input: GenesisTransitionTimelineInput;
  timeline: null;
  boundary: GenesisTransitionTimelineBoundary;
}>;

export type GenesisTransitionTimelineBlocked = Readonly<{
  status: "BLOCKED";
  timelineStatus: "BLOCKED";
  source: "genesis_transition_timeline";
  reason: GenesisTransitionTimelineBlockedReason;
  input: GenesisTransitionTimelineInput;
  timeline: null;
  boundary: GenesisTransitionTimelineBoundary;
}>;

export type GenesisTransitionTimelineResult =
  | GenesisTransitionTimelineReady
  | GenesisTransitionTimelineUnavailable
  | GenesisTransitionTimelineBlocked;
