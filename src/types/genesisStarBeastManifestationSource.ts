import type { GenesisFourSymbolLifeDirectionProjection } from "./genesisFourSymbolLifeDirectionProjection";
import type { GenesisLifeArchetypeProjection } from "./genesisLifeArchetypeProjection";
import type { GenesisTwentyEightMansionCoordinateProjection } from "./genesisTwentyEightMansionCoordinateProjection";
import type { PersonalStarBeastManifestationReadinessReference } from "./personalStarBeastSceneModel";
import type { StarBeastIdentitySource } from "./starBeastIdentitySource";

export type GenesisStarBeastPresenceState =
  | "DORMANT"
  | "APPROACHING"
  | "PRESENT"
  | "RECOGNIZED";

export type GenesisStarBeastPresenceReference = Readonly<{
  referenceType: "GENESIS_STAR_BEAST_PRESENCE_REFERENCE";
  referenceId: string;
  presenceState: "DORMANT";
  sourceIdentityReference: StarBeastIdentitySource["personalStarBeastReference"];
  manifestationReadinessReference: PersonalStarBeastManifestationReadinessReference;
  existingSourceOnly: true;
  noEntityCreation: true;
  noAssetGeneration: true;
  noRendererInvocation: true;
}>;

export type GenesisStarBeastManifestationSourceInput = Readonly<{
  sourceReferenceId: string;
  mansionCoordinateProjection:
    | GenesisTwentyEightMansionCoordinateProjection
    | null;
  fourSymbolDirectionProjection:
    | GenesisFourSymbolLifeDirectionProjection
    | null;
  lifeArchetypeProjection: GenesisLifeArchetypeProjection | null;
  starBeastIdentitySourceReference: StarBeastIdentitySource | null;
}>;

export type GenesisStarBeastManifestationSourceProvenance = Readonly<{
  sourceKind: GenesisTwentyEightMansionCoordinateProjection["sourceKind"];
  sourceReferenceId: string;
  mansionCoordinateReferenceId: string;
  fourSymbolDirectionSourceReferenceId: string;
  lifeArchetypeSourceReferenceId: string;
  starBeastIdentityReferenceId: string;
  manifestationReadinessReferenceId: string;
}>;

export type GenesisStarBeastManifestationSource = Readonly<{
  semanticRole: "GENESIS_STAR_BEAST_MANIFESTATION_SOURCE";
  sourceReferenceId: string;
  mansionCoordinateReference: GenesisTwentyEightMansionCoordinateProjection["birthMansion"];
  fourSymbolDirectionReference: GenesisFourSymbolLifeDirectionProjection;
  lifeArchetypeReference: GenesisLifeArchetypeProjection;
  manifestationReferenceId: string;
  presenceState: GenesisStarBeastPresenceState;
  presenceReference: GenesisStarBeastPresenceReference;
  provenance: GenesisStarBeastManifestationSourceProvenance;
  existingSourceCalibrationOnly: true;
  existingMansionCoordinateProjectionOnly: true;
  existingFourSymbolDirectionProjectionOnly: true;
  existingLifeArchetypeProjectionOnly: true;
  noEngineInvocation: true;
  noStarBeastGeneration: true;
  noAssetGeneration: true;
  noRendererParameters: true;
  noTimelineMutation: true;
  noVisualCalibrationMutation: true;
  noFallback: true;
}>;

export type GenesisStarBeastManifestationSourceBlockedReason =
  | "SOURCE_REFERENCE_ID_REQUIRED"
  | "MANSION_COORDINATE_PROJECTION_REQUIRED"
  | "MANSION_COORDINATE_PROJECTION_INVALID"
  | "FOUR_SYMBOL_DIRECTION_PROJECTION_REQUIRED"
  | "FOUR_SYMBOL_DIRECTION_PROJECTION_INVALID"
  | "LIFE_ARCHETYPE_PROJECTION_REQUIRED"
  | "LIFE_ARCHETYPE_PROJECTION_INVALID"
  | "STAR_BEAST_IDENTITY_SOURCE_REQUIRED"
  | "STAR_BEAST_IDENTITY_SOURCE_INVALID"
  | "SOURCE_REFERENCE_MISMATCH"
  | "STAR_BEAST_SOURCE_CONTINUITY_INVALID"
  | "MANIFESTATION_READINESS_INVALID";

export type GenesisStarBeastManifestationSourceBoundary = Readonly<{
  sourceOnly: true;
  existingSourceCalibrationOnly: true;
  noEngineInvocation: true;
  noStarBeastGeneration: true;
  noAssetGeneration: true;
  noRendererInvocation: true;
  noRendererInputMutation: true;
  noTimelineMutation: true;
  noVisualCalibrationMutation: true;
  noUIIntegration: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
  noFallback: true;
}>;

export type GenesisStarBeastManifestationSourceResult =
  | Readonly<{
      status: "AVAILABLE";
      source: GenesisStarBeastManifestationSource;
      input: GenesisStarBeastManifestationSourceInput;
      boundary: GenesisStarBeastManifestationSourceBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      reason: GenesisStarBeastManifestationSourceBlockedReason;
      source: null;
      input: GenesisStarBeastManifestationSourceInput;
      boundary: GenesisStarBeastManifestationSourceBoundary;
    }>;
