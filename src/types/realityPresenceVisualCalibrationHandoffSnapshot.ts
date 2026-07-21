import type { GenesisFourSymbolDirectionFieldVisualCalibration } from "./genesisFourSymbolDirectionFieldVisualCalibration";
import type { GenesisLifeArchetypeForceCondensationVisualCalibration } from "./genesisLifeArchetypeForceCondensationVisualCalibration";
import type { GenesisPresenceRecognitionContinuityActivation } from "./genesisPresenceRecognitionContinuityActivation";
import type { GenesisProductionVisualCalibrationBundle } from "./genesisProductionVisualCalibrationBridge";
import type { GenesisStarBeastPresenceVisualRealization } from "./genesisStarBeastPresenceVisualRealization";

export type RealityPresenceVisualCalibrationHandoffSnapshotInput = Readonly<{
  productionVisualCalibrationBundle:
    | GenesisProductionVisualCalibrationBundle
    | null;
  fourSymbolDirectionFieldVisualCalibration:
    | GenesisFourSymbolDirectionFieldVisualCalibration
    | null;
  lifeArchetypeForceCondensationVisualCalibration:
    | GenesisLifeArchetypeForceCondensationVisualCalibration
    | null;
  presenceVisualRealization:
    | GenesisStarBeastPresenceVisualRealization
    | null;
  presenceRecognitionContinuityActivation:
    | GenesisPresenceRecognitionContinuityActivation
    | null;
}>;

export type RealityPresenceVisualCalibrationHandoffSnapshot = Readonly<{
  schemaVersion: "GUANYAO_REALITY_PRESENCE_VISUAL_CALIBRATION_HANDOFF_SNAPSHOT_V1";
  semanticRole: "REALITY_PRESENCE_VISUAL_CALIBRATION_HANDOFF_SNAPSHOT";
  sourceReferenceId: string;
  manifestationSourceReferenceId: string;
  sourceProvenance: "REAL_USER_SESSION";
  runtimeStage: "COMPLETION";
  presenceState: "RECOGNIZED";
  handoffState: "READY_FOR_REALITY_PRESENCE_RENDERER_AUTHORIZATION";
  productionVisualCalibrationBundle: GenesisProductionVisualCalibrationBundle;
  genesisVisualRealization: GenesisProductionVisualCalibrationBundle["genesisVisualRealization"];
  genesisPerspectiveCalibration: GenesisProductionVisualCalibrationBundle["genesisPerspectiveCalibration"];
  genesisPresenceRecognitionCalibration: NonNullable<
    GenesisProductionVisualCalibrationBundle["genesisPresenceRecognitionCalibration"]
  >;
  genesisSpatialDistanceCalibration: GenesisProductionVisualCalibrationBundle["genesisSpatialDistanceCalibration"];
  fourSymbolDirectionFieldVisualCalibration: GenesisFourSymbolDirectionFieldVisualCalibration;
  lifeArchetypeForceCondensationVisualCalibration: GenesisLifeArchetypeForceCondensationVisualCalibration;
  presenceVisualRealization: GenesisStarBeastPresenceVisualRealization;
  presenceRecognitionContinuityActivation: GenesisPresenceRecognitionContinuityActivation;
  existingCalibrationReferencesOnly: true;
  preserveExistingCalibrationObjectIdentity: true;
  noCalibrationCopy: true;
  noCalibrationMutation: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noRendererAuthorization: true;
  noRouteIntegration: true;
  noTimelineMutation: true;
  noSourceMutation: true;
  noFallback: true;
}>;

export type RealityPresenceVisualCalibrationHandoffSnapshotBoundary =
  Readonly<{
    handoffSnapshotOnly: true;
    genesisCompletionCalibrationOnly: true;
    explicitlyRecognizedPresenceOnly: true;
    sourceReferenceContinuityRequired: true;
    manifestationReferenceContinuityRequired: true;
    immutableSnapshotOnly: true;
    existingCalibrationReferencesOnly: true;
    preserveExistingCalibrationObjectIdentity: true;
    noCalibrationCopy: true;
    noCalibrationMutation: true;
    noCalibrationRecalculation: true;
    noEngineInvocation: true;
    noRendererInvocation: true;
    noRendererAuthorization: true;
    noRouteIntegration: true;
    noUiIntegration: true;
    noTimelineMutation: true;
    noSourceMutation: true;
    noPressureMutation: true;
    noGravityMutation: true;
    noChoiceMutation: true;
    noCrystalMutation: true;
    noStorageRead: true;
    noStorageWrite: true;
    noFixtureSource: true;
    noPrototypeSource: true;
    noDefaultSource: true;
    noFallback: true;
  }>;

export type RealityPresenceVisualCalibrationHandoffSnapshotBlockedReason =
  | "PRODUCTION_VISUAL_CALIBRATION_REQUIRED"
  | "DIRECTION_FIELD_CALIBRATION_REQUIRED"
  | "LIFE_ARCHETYPE_CALIBRATION_REQUIRED"
  | "PRESENCE_VISUAL_REALIZATION_REQUIRED"
  | "PRESENCE_RECOGNITION_CONTINUITY_REQUIRED"
  | "GENESIS_COMPLETION_CALIBRATION_INVALID"
  | "PRESENCE_RECOGNITION_INVALID"
  | "SOURCE_REFERENCE_MISMATCH"
  | "MANIFESTATION_SOURCE_REFERENCE_MISMATCH";

export type RealityPresenceVisualCalibrationHandoffSnapshotResult =
  | Readonly<{
      status: "READY";
      source: "reality_presence_visual_calibration_handoff_snapshot";
      snapshot: RealityPresenceVisualCalibrationHandoffSnapshot;
      input: RealityPresenceVisualCalibrationHandoffSnapshotInput;
      boundary: RealityPresenceVisualCalibrationHandoffSnapshotBoundary;
    }>
  | Readonly<{
      status: "SOURCE_NOT_READY" | "BLOCKED";
      source: "reality_presence_visual_calibration_handoff_snapshot";
      reason: RealityPresenceVisualCalibrationHandoffSnapshotBlockedReason;
      snapshot: null;
      input: RealityPresenceVisualCalibrationHandoffSnapshotInput;
      boundary: RealityPresenceVisualCalibrationHandoffSnapshotBoundary;
    }>;
