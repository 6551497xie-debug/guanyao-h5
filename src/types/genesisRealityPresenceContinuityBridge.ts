import type { GenesisProductionRealityEntryContext } from "./genesisProductionRecognitionRealityEntry";
import type { GenesisStarBeastPresenceVisualRealization } from "./genesisStarBeastPresenceVisualRealization";

export type GenesisRealityPresenceContinuityBridge = Readonly<{
  semanticRole: "GENESIS_REALITY_PRESENCE_CONTINUITY_BRIDGE";
  sourceReferenceId: string;
  manifestationSourceReferenceId: string;
  presenceState: "RECOGNIZED";
  continuityState: "CARRIED_TO_REALITY";
  arrivalState: "REALITY_APPROACHING";
  presenceOrigin: "EXISTING_IN_LIFE_COORDINATE";
  appearanceMeaning: "RECOGNIZED_PRESENCE_CONTINUES";
  sourceProvenance: "REAL_USER_SESSION";
  genesisPresenceReference: "GENESIS_STAR_BEAST_PRESENCE_VISUAL_REALIZATION";
  realityEntryReference: "GENESIS_PRODUCTION_REALITY_ENTRY_CONTEXT";
  noEntityGeneration: true;
  noAssetGeneration: true;
  noPresenceMutation: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noPressureMutation: true;
  noGravityMutation: true;
  noChoiceMutation: true;
  noCrystalMutation: true;
  noStorage: true;
}>;

export type GenesisRealityPresenceContinuityBridgeBoundary = Readonly<{
  productionContinuityBridgeOnly: true;
  recognizedGenesisPresenceOnly: true;
  eligibleRealityEntryContextOnly: true;
  sourceReferenceContinuityRequired: true;
  immutableBridgeOnly: true;
  noEntityGeneration: true;
  noAssetGeneration: true;
  noPresenceMutation: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noPressureMutation: true;
  noGravityMutation: true;
  noChoiceMutation: true;
  noCrystalMutation: true;
  noFixtureSource: true;
  noFallback: true;
  noStorage: true;
}>;

export type GenesisRealityPresenceContinuityBridgeInput = Readonly<{
  presenceRealization: GenesisStarBeastPresenceVisualRealization | null;
  realityEntryContext: GenesisProductionRealityEntryContext | null;
}>;

export type GenesisRealityPresenceContinuityBridgeBlockedReason =
  | "GENESIS_PRESENCE_REQUIRED"
  | "GENESIS_PRESENCE_NOT_RECOGNIZED"
  | "REALITY_ENTRY_CONTEXT_REQUIRED"
  | "REALITY_ENTRY_CONTEXT_INVALID"
  | "SOURCE_REFERENCE_MISMATCH"
  | "PRESENCE_SOURCE_INVALID";

export type GenesisRealityPresenceContinuityBridgeResult =
  | Readonly<{
      status: "READY";
      source: "genesis_reality_presence_continuity_bridge";
      bridge: GenesisRealityPresenceContinuityBridge;
      input: GenesisRealityPresenceContinuityBridgeInput;
      boundary: GenesisRealityPresenceContinuityBridgeBoundary;
    }>
  | Readonly<{
      status: "SOURCE_NOT_READY" | "BLOCKED";
      source: "genesis_reality_presence_continuity_bridge";
      reason: GenesisRealityPresenceContinuityBridgeBlockedReason;
      bridge: null;
      input: GenesisRealityPresenceContinuityBridgeInput;
      boundary: GenesisRealityPresenceContinuityBridgeBoundary;
    }>;

export type GenesisRealityPresenceContinuityContext = Readonly<{
  schemaVersion: "GUANYAO_GENESIS_REALITY_PRESENCE_CONTINUITY_CONTEXT_V1";
  source: "genesis_reality_presence_continuity_context";
  sourceReferenceId: string;
  bridge: GenesisRealityPresenceContinuityBridge;
  realityEntryContext: GenesisProductionRealityEntryContext;
  boundary: GenesisRealityPresenceContinuityBridgeBoundary;
}>;
