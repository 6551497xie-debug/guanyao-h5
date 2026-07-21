import type { GenesisLifeForceManifestationBridge } from "./genesisLifeForceManifestationBridge";
import type { GenesisProductionRuntimeSession } from "./genesisProductionRuntimeConsumer";

export type GenesisStarBeastPresenceVisualState =
  | "DORMANT"
  | "APPROACHING"
  | "PRESENT"
  | "RECOGNIZED";

export type GenesisPresenceRecognitionPhase =
  | "NOT_REACHED"
  | "RECOGNITION_HOLD"
  | "RECOGNIZED";

export type GenesisStarBeastPresenceVisualCopyKey =
  | "LIFE_PRESENCE_DORMANT"
  | "STAR_BEAST_APPROACHING"
  | "STAR_BEAST_PRESENT"
  | "LIFE_PRESENCE_RECOGNIZED";

export type GenesisStarBeastPresenceVisualRealization = Readonly<{
  semanticRole: "GENESIS_STAR_BEAST_PRESENCE_VISUAL_REALIZATION";
  sourceReferenceId: string;
  manifestationSourceReferenceId: string;
  sourcePresenceState: "DORMANT";
  visualPresenceState: GenesisStarBeastPresenceVisualState;
  copyKey: GenesisStarBeastPresenceVisualCopyKey;
  presenceOrigin: "EXISTING_IN_LIFE_COORDINATE";
  appearanceMeaning: "BECOMES_VISIBLE_NOT_GENERATED";
  manifestationBridge: GenesisLifeForceManifestationBridge;
  sourceProvenance: "REAL_USER_SESSION";
  noEntityGeneration: true;
  noAssetGeneration: true;
  noPresenceSourceMutation: true;
  noEngineInvocation: true;
  noRendererParameterMutation: true;
  noTimelineMutation: true;
  noFallback: true;
}>;

export type GenesisStarBeastPresenceVisualRealizationBoundary = Readonly<{
  presenceVisualRealizationOnly: true;
  existingManifestationBridgeOnly: true;
  existingRuntimeSessionOnly: true;
  explicitRecognitionPhaseOnly: true;
  noEntityGeneration: true;
  noAssetGeneration: true;
  noPresenceSourceMutation: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noRendererParameterMutation: true;
  noTimelineMutation: true;
  noVisualAssetMutation: true;
  noFixtureSource: true;
  noFallback: true;
}>;

export type GenesisStarBeastPresenceVisualRealizationInput = Readonly<{
  runtimeSession: GenesisProductionRuntimeSession | null;
  lifeForceManifestationBridge: GenesisLifeForceManifestationBridge | null;
  recognitionPhase: GenesisPresenceRecognitionPhase;
}>;

export type GenesisStarBeastPresenceVisualRealizationBlockedReason =
  | "RUNTIME_SESSION_REQUIRED"
  | "RUNTIME_SESSION_INVALID"
  | "LIFE_FORCE_MANIFESTATION_BRIDGE_REQUIRED"
  | "LIFE_FORCE_MANIFESTATION_BRIDGE_INVALID"
  | "SOURCE_REFERENCE_MISMATCH"
  | "RECOGNITION_PHASE_INVALID"
  | "PRESENCE_STAGE_INVALID";

export type GenesisStarBeastPresenceVisualRealizationResult =
  | Readonly<{
      status: "READY";
      source: "genesis_starbeast_presence_visual_realization";
      realization: GenesisStarBeastPresenceVisualRealization;
      input: GenesisStarBeastPresenceVisualRealizationInput;
      boundary: GenesisStarBeastPresenceVisualRealizationBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      source: "genesis_starbeast_presence_visual_realization";
      reason: GenesisStarBeastPresenceVisualRealizationBlockedReason;
      realization: null;
      input: GenesisStarBeastPresenceVisualRealizationInput;
      boundary: GenesisStarBeastPresenceVisualRealizationBoundary;
    }>;
