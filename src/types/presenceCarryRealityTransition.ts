import type {
  RecognitionRealityEntryBridgeFix,
} from "./recognitionRealityEntryBridgeFix";
import type { RecognitionSpaceUIRuntime } from "./recognitionSpaceUIRuntime";
import type { RealityEntrySpaceUIRuntime } from "./realityEntrySpaceUIRuntime";
import type { PressureRecognitionUIRuntime } from "./pressureRecognitionUIRuntime";

export type PresenceCarryRecognitionPresenceState =
  | "NOT_READY"
  | "PRESENCE_HELD"
  | "RECOGNITION_CONFIRMED";

export type PresenceCarryTransitionState =
  | "NOT_STARTED"
  | "READY_TO_CARRY"
  | "CARRYING_PRESENCE"
  | "PRESENCE_CONTINUES";

export type PresenceCarryRealityArrivalState =
  | "NOT_READY"
  | "REALITY_APPROACHING"
  | "REALITY_PRESENT"
  | "PRESSURE_CONTEXT_READY";

export type PresenceCarryContinuity =
  | "NOT_READY"
  | "HELD"
  | "CONTINUOUS"
  | "BROKEN";

export type PresenceCarryRealityTransitionBoundary = Readonly<{
  experienceContinuityOnly: true;
  noGenesisMutation: true;
  noVisualStateMutation: true;
  noPressureMutation: true;
  noIdentity: true;
  noUserData: true;
  noStorage: true;
  noEngineResult: true;
  noLifeGeneration: true;
  noRuntimeRuleMutation: true;
}>;

export type PresenceCarryRealityTransitionInput = Readonly<{
  recognitionSpaceRuntime: RecognitionSpaceUIRuntime | null;
  bridgeFix: RecognitionRealityEntryBridgeFix | null;
  realityEntryRuntime: RealityEntrySpaceUIRuntime | null;
  pressureRuntime: PressureRecognitionUIRuntime | null;
  recognitionEntered: boolean;
  realityEntryConfirmed: boolean;
  pressureObservationConfirmed: boolean;
}>;

export type PresenceCarryRealityTransition = Readonly<{
  semanticRole: "PRESENCE_CARRY_REALITY_TRANSITION";
  recognitionPresenceState: PresenceCarryRecognitionPresenceState;
  transitionCarryState: PresenceCarryTransitionState;
  realityArrivalState: PresenceCarryRealityArrivalState;
  presenceContinuity: PresenceCarryContinuity;
  presenceReference: "PERSONAL_STAR_BEAST_PRESENCE_VISUAL_STATE";
  recognitionReference: "RECOGNITION_SPACE_RUNTIME";
  realityEntryReference: "REALITY_ENTRY_SPACE_RUNTIME";
  pressureObservationContext: "PRESSURE_OBSERVATION_CONTEXT";
  spatialRelationship: "PRESENCE_WITH_USER" | "PRESENCE_APPROACHES_REALITY" | "PRESENCE_IN_REALITY";
  visualCarryMode: "LOW_CONTRAST_CONTINUITY" | "LOW_CONTRAST_REALITY_ARRIVAL";
  boundary: PresenceCarryRealityTransitionBoundary;
}>;

export type PresenceCarryRealityTransitionReady = Readonly<{
  status: "READY";
  source: "presence_carry_reality_transition";
  transition: PresenceCarryRealityTransition;
  input: PresenceCarryRealityTransitionInput;
  boundary: PresenceCarryRealityTransitionBoundary;
}>;

export type PresenceCarryRealityTransitionUnavailableReason =
  | "RECOGNITION_ENTRY_REQUIRED"
  | "RECOGNITION_PRESENCE_REQUIRED"
  | "BRIDGE_FIX_REQUIRED"
  | "REALITY_ENTRY_CONTEXT_REQUIRED";

export type PresenceCarryRealityTransitionBlockedReason =
  | "BRIDGE_CONTINUITY_BROKEN"
  | "REALITY_ENTRY_BEFORE_RECOGNITION"
  | "PRESSURE_CONTEXT_BEFORE_REALITY";

export type PresenceCarryRealityTransitionUnavailable = Readonly<{
  status: "UNAVAILABLE";
  source: "presence_carry_reality_transition";
  reason: PresenceCarryRealityTransitionUnavailableReason;
  transition: null;
  input: PresenceCarryRealityTransitionInput;
  boundary: PresenceCarryRealityTransitionBoundary;
}>;

export type PresenceCarryRealityTransitionBlocked = Readonly<{
  status: "BLOCKED";
  source: "presence_carry_reality_transition";
  reason: PresenceCarryRealityTransitionBlockedReason;
  transition: PresenceCarryRealityTransition;
  input: PresenceCarryRealityTransitionInput;
  boundary: PresenceCarryRealityTransitionBoundary;
}>;

export type PresenceCarryRealityTransitionResult =
  | PresenceCarryRealityTransitionReady
  | PresenceCarryRealityTransitionUnavailable
  | PresenceCarryRealityTransitionBlocked;
