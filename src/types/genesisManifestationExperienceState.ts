import type { GenesisLifeForceManifestationBridge } from "./genesisLifeForceManifestationBridge";
import type { GenesisProductionRuntimeSession } from "./genesisProductionRuntimeConsumer";
import type { GenesisRuntimeStage } from "./genesisRuntimeStateMachine";

export type GenesisManifestationExperienceState =
  | "DORMANT"
  | "TIME_ACCEPTED"
  | "COORDINATE_SEEKING"
  | "COORDINATE_FOUND"
  | "DIRECTION_AWAKENING"
  | "FORCE_CONDENSING"
  | "PRESENCE_APPROACHING"
  | "PRESENCE_RECOGNIZED";

export type GenesisManifestationExperienceTrigger =
  | "AUTO_ADVANCE"
  | "TIME_DELIVERY"
  | "RECOGNITION_HOLD";

export type GenesisManifestationExperienceCopyKey =
  | "WAIT_FOR_TIME_DELIVERY"
  | "STAR_RIVER_RESPONDS"
  | "FIND_MY_POSITION"
  | "MANSION_COORDINATE_FOUND"
  | "FOUR_SYMBOL_DIRECTION_AWAKENS"
  | "LIFE_FORCE_CONDENSES"
  | "STAR_BEAST_APPROACHES"
  | "RECOGNIZE_EXISTING_PRESENCE";

export type GenesisManifestationExperienceStateBoundary = Readonly<{
  experienceStateOnly: true;
  sourceContinuityRequired: true;
  immutableSessionOnly: true;
  frozenExperienceOrderOnly: true;
  timeDeliveryOnlyUserAction: true;
  noEngineInvocation: true;
  noEngineResultMutation: true;
  noSourceMutation: true;
  noProjectionMutation: true;
  noVisualStateMutation: true;
  noRendererInvocation: true;
  noRendererInputMutation: true;
  noTimelineSpeedMutation: true;
  noTimelineReordering: true;
  noFixtureSource: true;
  noReality: true;
  noPressure: true;
  noGravity: true;
  noChoice: true;
  noCrystal: true;
  noStorageWrite: true;
}>;

export type GenesisManifestationExperienceStateSession = Readonly<{
  semanticRole: "GENESIS_MANIFESTATION_EXPERIENCE_STATE";
  sourceReferenceId: string;
  bridgeReferenceId: string;
  runtimeStage: GenesisRuntimeStage;
  currentState: GenesisManifestationExperienceState;
  previousState: GenesisManifestationExperienceState | null;
  nextState: GenesisManifestationExperienceState | null;
  copyKey: GenesisManifestationExperienceCopyKey;
  timeDeliveryAccepted: boolean;
  manifestationBridge: GenesisLifeForceManifestationBridge;
  sourceProvenance: "REAL_USER_SESSION";
  boundary: GenesisManifestationExperienceStateBoundary;
}>;

export type GenesisManifestationExperienceStateInput = Readonly<{
  runtimeSession: GenesisProductionRuntimeSession | null;
  lifeForceManifestationBridge: GenesisLifeForceManifestationBridge | null;
}>;

export type GenesisManifestationExperienceAdvanceInput = Readonly<{
  session: GenesisManifestationExperienceStateSession;
  runtimeSession: GenesisProductionRuntimeSession | null;
  lifeForceManifestationBridge: GenesisLifeForceManifestationBridge | null;
  trigger: GenesisManifestationExperienceTrigger;
}>;

export type GenesisManifestationExperienceStateOperation =
  | "INITIALIZE"
  | "ADVANCE";

export type GenesisManifestationExperienceStateBlockedReason =
  | "RUNTIME_SESSION_REQUIRED"
  | "RUNTIME_SESSION_INVALID"
  | "LIFE_FORCE_MANIFESTATION_BRIDGE_REQUIRED"
  | "LIFE_FORCE_MANIFESTATION_BRIDGE_INVALID"
  | "SOURCE_REFERENCE_MISMATCH"
  | "INITIAL_RUNTIME_STAGE_INVALID"
  | "STATE_BOUNDARY_INVALID"
  | "STATE_ORDER_INVALID"
  | "TIME_DELIVERY_REQUIRED"
  | "TIME_DELIVERY_ONLY_AT_TIME_RESONANCE"
  | "INVALID_RUNTIME_STAGE_FOR_STATE"
  | "SEQUENCE_ALREADY_RECOGNIZED";

export type GenesisManifestationExperienceStateResult =
  | Readonly<{
      status: "READY";
      operation: GenesisManifestationExperienceStateOperation;
      source: "genesis_manifestation_experience_state";
      session: GenesisManifestationExperienceStateSession;
      boundary: GenesisManifestationExperienceStateBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      operation: GenesisManifestationExperienceStateOperation;
      source: "genesis_manifestation_experience_state";
      reason: GenesisManifestationExperienceStateBlockedReason;
      session: GenesisManifestationExperienceStateSession | null;
      boundary: GenesisManifestationExperienceStateBoundary;
    }>;
