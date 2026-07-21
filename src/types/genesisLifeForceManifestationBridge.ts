import type { GenesisFourSymbolLifeDirectionProjection } from "./genesisFourSymbolLifeDirectionProjection";
import type { GenesisLifeArchetypeProjection } from "./genesisLifeArchetypeProjection";
import type { GenesisStarBeastManifestationSource, GenesisStarBeastPresenceState } from "./genesisStarBeastManifestationSource";
import type { GenesisTwentyEightMansionCoordinateProjection } from "./genesisTwentyEightMansionCoordinateProjection";

export type GenesisLifeForceManifestationBridgePath = readonly [
  "LIFE_COORDINATE",
  "DIRECTION_FIELD",
  "ARCHETYPE_FORCE",
  "MANIFESTATION_SOURCE",
  "PRESENCE",
];

export type GenesisLifeForceManifestationBridgeInput = Readonly<{
  sourceReferenceId: string;
  mansionCoordinateProjection:
    | GenesisTwentyEightMansionCoordinateProjection
    | null;
  fourSymbolDirectionProjection:
    | GenesisFourSymbolLifeDirectionProjection
    | null;
  lifeArchetypeProjection: GenesisLifeArchetypeProjection | null;
  manifestationSource: GenesisStarBeastManifestationSource | null;
}>;

export type GenesisLifeForceManifestationBridgeProvenance = Readonly<{
  sourceKind: GenesisTwentyEightMansionCoordinateProjection["sourceKind"];
  sourceReferenceId: string;
  mansionCoordinateReferenceId: string;
  fourSymbolDirectionSourceReferenceId: string;
  lifeArchetypeSourceReferenceId: string;
  manifestationSourceReferenceId: string;
  presenceReferenceId: string;
}>;

export type GenesisLifeForceManifestationBridge = Readonly<{
  semanticRole: "GENESIS_LIFE_FORCE_MANIFESTATION_BRIDGE";
  sourceReferenceId: string;
  lifeCoordinateReference: GenesisTwentyEightMansionCoordinateProjection["birthMansion"];
  directionReference: GenesisFourSymbolLifeDirectionProjection;
  archetypeForceReference: GenesisLifeArchetypeProjection;
  manifestationSourceReference: GenesisStarBeastManifestationSource;
  presenceState: GenesisStarBeastPresenceState;
  manifestationPath: GenesisLifeForceManifestationBridgePath;
  continuity: Readonly<{
    lifeCoordinateFound: true;
    directionFormed: true;
    archetypeForceFormed: true;
    manifestationSourceReady: true;
    presenceReferenceReady: true;
  }>;
  provenance: GenesisLifeForceManifestationBridgeProvenance;
  sourceOnly: true;
  noEngineInvocation: true;
  noStarBeastGeneration: true;
  noAssetGeneration: true;
  noPresenceTransition: true;
  noRendererParameters: true;
  noTimelineMutation: true;
  noVisualCalibrationMutation: true;
  noFallback: true;
}>;

export type GenesisLifeForceManifestationBridgeBlockedReason =
  | "SOURCE_REFERENCE_ID_REQUIRED"
  | "MANSION_COORDINATE_PROJECTION_REQUIRED"
  | "FOUR_SYMBOL_DIRECTION_PROJECTION_REQUIRED"
  | "LIFE_ARCHETYPE_PROJECTION_REQUIRED"
  | "MANIFESTATION_SOURCE_REQUIRED"
  | "SOURCE_REFERENCE_MISMATCH"
  | "MANSION_COORDINATE_REFERENCE_INVALID"
  | "DIRECTION_REFERENCE_INVALID"
  | "ARCHETYPE_FORCE_REFERENCE_INVALID"
  | "MANIFESTATION_SOURCE_INVALID"
  | "PRESENCE_STATE_INVALID";

export type GenesisLifeForceManifestationBridgeBoundary = Readonly<{
  bridgeOnly: true;
  sourceOnly: true;
  existingProjectionsOnly: true;
  noEngineInvocation: true;
  noStarBeastGeneration: true;
  noAssetGeneration: true;
  noPresenceTransition: true;
  noRendererInvocation: true;
  noRendererInputMutation: true;
  noTimelineMutation: true;
  noVisualCalibrationMutation: true;
  noUIIntegration: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
  noFallback: true;
}>;

export type GenesisLifeForceManifestationBridgeResult =
  | Readonly<{
      status: "AVAILABLE";
      bridge: GenesisLifeForceManifestationBridge;
      input: GenesisLifeForceManifestationBridgeInput;
      boundary: GenesisLifeForceManifestationBridgeBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      reason: GenesisLifeForceManifestationBridgeBlockedReason;
      bridge: null;
      input: GenesisLifeForceManifestationBridgeInput;
      boundary: GenesisLifeForceManifestationBridgeBoundary;
    }>;
