import type {
  RealityPresenceVisualCalibrationHandoffSnapshot,
  RealityPresenceVisualCalibrationHandoffSnapshotBlockedReason,
  RealityPresenceVisualCalibrationHandoffSnapshotBoundary,
  RealityPresenceVisualCalibrationHandoffSnapshotInput,
  RealityPresenceVisualCalibrationHandoffSnapshotResult,
} from "../types/realityPresenceVisualCalibrationHandoffSnapshot";

export const REALITY_PRESENCE_VISUAL_CALIBRATION_HANDOFF_SNAPSHOT_BOUNDARY: RealityPresenceVisualCalibrationHandoffSnapshotBoundary =
  Object.freeze({
    handoffSnapshotOnly: true,
    genesisCompletionCalibrationOnly: true,
    explicitlyRecognizedPresenceOnly: true,
    sourceReferenceContinuityRequired: true,
    manifestationReferenceContinuityRequired: true,
    immutableSnapshotOnly: true,
    existingCalibrationReferencesOnly: true,
    preserveExistingCalibrationObjectIdentity: true,
    noCalibrationCopy: true,
    noCalibrationMutation: true,
    noCalibrationRecalculation: true,
    noEngineInvocation: true,
    noRendererInvocation: true,
    noRendererAuthorization: true,
    noRouteIntegration: true,
    noUiIntegration: true,
    noTimelineMutation: true,
    noSourceMutation: true,
    noPressureMutation: true,
    noGravityMutation: true,
    noChoiceMutation: true,
    noCrystalMutation: true,
    noStorageRead: true,
    noStorageWrite: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noFallback: true,
  });

const unavailable = (
  input: RealityPresenceVisualCalibrationHandoffSnapshotInput,
  reason: RealityPresenceVisualCalibrationHandoffSnapshotBlockedReason,
): RealityPresenceVisualCalibrationHandoffSnapshotResult =>
  Object.freeze({
    status: "SOURCE_NOT_READY" as const,
    source: "reality_presence_visual_calibration_handoff_snapshot" as const,
    reason,
    snapshot: null,
    input,
    boundary:
      REALITY_PRESENCE_VISUAL_CALIBRATION_HANDOFF_SNAPSHOT_BOUNDARY,
  });

const blocked = (
  input: RealityPresenceVisualCalibrationHandoffSnapshotInput,
  reason: RealityPresenceVisualCalibrationHandoffSnapshotBlockedReason,
): RealityPresenceVisualCalibrationHandoffSnapshotResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    source: "reality_presence_visual_calibration_handoff_snapshot" as const,
    reason,
    snapshot: null,
    input,
    boundary:
      REALITY_PRESENCE_VISUAL_CALIBRATION_HANDOFF_SNAPSHOT_BOUNDARY,
  });

const hasForbiddenReference = (referenceId: string): boolean =>
  ["fixture", "prototype", "default", "referenceonly"].some((marker) =>
    referenceId.toLowerCase().includes(marker),
  );

export function createRealityPresenceVisualCalibrationHandoffSnapshot(
  input: RealityPresenceVisualCalibrationHandoffSnapshotInput,
): RealityPresenceVisualCalibrationHandoffSnapshotResult {
  const production = input.productionVisualCalibrationBundle;
  if (production === null) {
    return unavailable(input, "PRODUCTION_VISUAL_CALIBRATION_REQUIRED");
  }
  const direction = input.fourSymbolDirectionFieldVisualCalibration;
  if (direction === null) {
    return unavailable(input, "DIRECTION_FIELD_CALIBRATION_REQUIRED");
  }
  const force = input.lifeArchetypeForceCondensationVisualCalibration;
  if (force === null) {
    return unavailable(input, "LIFE_ARCHETYPE_CALIBRATION_REQUIRED");
  }
  const presence = input.presenceVisualRealization;
  if (presence === null) {
    return unavailable(input, "PRESENCE_VISUAL_REALIZATION_REQUIRED");
  }
  const recognition = input.presenceRecognitionContinuityActivation;
  if (recognition === null) {
    return unavailable(input, "PRESENCE_RECOGNITION_CONTINUITY_REQUIRED");
  }

  const presenceCalibration = production.genesisPresenceRecognitionCalibration;
  if (
    production.source !== "genesis_production_visual_calibration_bridge" ||
    production.sourceProvenance !== "REAL_USER_SESSION" ||
    production.runtimeStage !== "COMPLETION" ||
    production.genesisVisualRealization.activeVisualLayer !== "COMPLETION" ||
    production.genesisVisualRealization.visualExpressionMode !==
      "RECOGNITION_HOLD" ||
    presenceCalibration === null ||
    direction.semanticRole !==
      "GENESIS_FOUR_SYMBOL_DIRECTION_FIELD_VISUAL_CALIBRATION" ||
    direction.activeVisualLayer !== "COMPLETION" ||
    direction.phase !== "ESTABLISHED" ||
    direction.noFourSymbolCalculation !== true ||
    direction.noSourceMutation !== true ||
    force.semanticRole !==
      "GENESIS_LIFE_ARCHETYPE_FORCE_CONDENSATION_VISUAL_CALIBRATION" ||
    force.activeVisualLayer !== "COMPLETION" ||
    force.phase !== "ESTABLISHED" ||
    force.noLifeArchetypeCalculation !== true ||
    force.noMotherCodeCalculation !== true ||
    force.noSourceMutation !== true ||
    hasForbiddenReference(production.sourceReferenceId)
  ) {
    return blocked(input, "GENESIS_COMPLETION_CALIBRATION_INVALID");
  }

  if (
    presence.semanticRole !==
      "GENESIS_STAR_BEAST_PRESENCE_VISUAL_REALIZATION" ||
    presence.visualPresenceState !== "RECOGNIZED" ||
    presence.sourcePresenceState !== "DORMANT" ||
    presence.presenceOrigin !== "EXISTING_IN_LIFE_COORDINATE" ||
    presence.sourceProvenance !== "REAL_USER_SESSION" ||
    presence.noEntityGeneration !== true ||
    presence.noPresenceSourceMutation !== true ||
    presence.noFallback !== true ||
    recognition.semanticRole !==
      "GENESIS_PRESENCE_RECOGNITION_CONTINUITY_ACTIVATION" ||
    recognition.experienceState !== "PRESENCE_RECOGNIZED" ||
    recognition.visualPresenceState !== "RECOGNIZED" ||
    recognition.recognitionConfirmed !== true ||
    recognition.sourceProvenance !== "REAL_USER_SESSION" ||
    recognition.noAutomaticRecognition !== true ||
    recognition.noFallback !== true
  ) {
    return blocked(input, "PRESENCE_RECOGNITION_INVALID");
  }

  const referenceId = production.sourceReferenceId;
  if (
    referenceId !== direction.sourceReferenceId ||
    referenceId !== force.sourceReferenceId ||
    referenceId !== presence.sourceReferenceId ||
    referenceId !== recognition.sourceReferenceId
  ) {
    return blocked(input, "SOURCE_REFERENCE_MISMATCH");
  }
  if (
    presence.manifestationSourceReferenceId !==
      recognition.manifestationSourceReferenceId ||
    presence.manifestationSourceReferenceId !==
      recognition.bridgeReferenceId
  ) {
    return blocked(input, "MANIFESTATION_SOURCE_REFERENCE_MISMATCH");
  }

  const snapshot: RealityPresenceVisualCalibrationHandoffSnapshot =
    Object.freeze({
      schemaVersion:
        "GUANYAO_REALITY_PRESENCE_VISUAL_CALIBRATION_HANDOFF_SNAPSHOT_V1",
      semanticRole:
        "REALITY_PRESENCE_VISUAL_CALIBRATION_HANDOFF_SNAPSHOT",
      sourceReferenceId: referenceId,
      manifestationSourceReferenceId:
        presence.manifestationSourceReferenceId,
      sourceProvenance: "REAL_USER_SESSION",
      runtimeStage: "COMPLETION",
      presenceState: "RECOGNIZED",
      handoffState:
        "READY_FOR_REALITY_PRESENCE_RENDERER_AUTHORIZATION",
      productionVisualCalibrationBundle: production,
      genesisVisualRealization: production.genesisVisualRealization,
      genesisPerspectiveCalibration: production.genesisPerspectiveCalibration,
      genesisPresenceRecognitionCalibration: presenceCalibration,
      genesisSpatialDistanceCalibration:
        production.genesisSpatialDistanceCalibration,
      fourSymbolDirectionFieldVisualCalibration: direction,
      lifeArchetypeForceCondensationVisualCalibration: force,
      presenceVisualRealization: presence,
      presenceRecognitionContinuityActivation: recognition,
      existingCalibrationReferencesOnly: true,
      preserveExistingCalibrationObjectIdentity: true,
      noCalibrationCopy: true,
      noCalibrationMutation: true,
      noEngineInvocation: true,
      noRendererInvocation: true,
      noRendererAuthorization: true,
      noRouteIntegration: true,
      noTimelineMutation: true,
      noSourceMutation: true,
      noFallback: true,
    });

  return Object.freeze({
    status: "READY" as const,
    source: "reality_presence_visual_calibration_handoff_snapshot" as const,
    snapshot,
    input,
    boundary:
      REALITY_PRESENCE_VISUAL_CALIBRATION_HANDOFF_SNAPSHOT_BOUNDARY,
  });
}
