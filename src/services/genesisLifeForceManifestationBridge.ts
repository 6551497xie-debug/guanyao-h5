import type {
  GenesisLifeForceManifestationBridge,
  GenesisLifeForceManifestationBridgeBlockedReason,
  GenesisLifeForceManifestationBridgeBoundary,
  GenesisLifeForceManifestationBridgeInput,
  GenesisLifeForceManifestationBridgeResult,
} from "../types/genesisLifeForceManifestationBridge";

const BRIDGE_BOUNDARY: GenesisLifeForceManifestationBridgeBoundary =
  Object.freeze({
    bridgeOnly: true,
    sourceOnly: true,
    existingProjectionsOnly: true,
    noEngineInvocation: true,
    noStarBeastGeneration: true,
    noAssetGeneration: true,
    noPresenceTransition: true,
    noRendererInvocation: true,
    noRendererInputMutation: true,
    noTimelineMutation: true,
    noVisualCalibrationMutation: true,
    noUIIntegration: true,
    noRuntimeIntegration: true,
    noStorageWrite: true,
    noFallback: true,
  });

const blocked = (
  input: GenesisLifeForceManifestationBridgeInput,
  reason: GenesisLifeForceManifestationBridgeBlockedReason,
): GenesisLifeForceManifestationBridgeResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    reason,
    bridge: null,
    input,
    boundary: BRIDGE_BOUNDARY,
  });

export function bridgeGenesisLifeForceManifestation(
  input: GenesisLifeForceManifestationBridgeInput,
): GenesisLifeForceManifestationBridgeResult {
  const sourceReferenceId = input.sourceReferenceId.trim();
  if (!sourceReferenceId) {
    return blocked(input, "SOURCE_REFERENCE_ID_REQUIRED");
  }

  const mansion = input.mansionCoordinateProjection;
  if (mansion === null) {
    return blocked(input, "MANSION_COORDINATE_PROJECTION_REQUIRED");
  }
  if (
    mansion.semanticRole !==
      "GENESIS_TWENTY_EIGHT_MANSION_COORDINATE_PROJECTION" ||
    mansion.sourceReferenceId !== sourceReferenceId ||
    mansion.coordinateCount !== 28 ||
    mansion.existingMansionResultOnly !== true ||
    mansion.noFallback !== true
  ) {
    return blocked(
      input,
      mansion.sourceReferenceId !== sourceReferenceId
        ? "SOURCE_REFERENCE_MISMATCH"
        : "MANSION_COORDINATE_REFERENCE_INVALID",
    );
  }

  const direction = input.fourSymbolDirectionProjection;
  if (direction === null) {
    return blocked(input, "FOUR_SYMBOL_DIRECTION_PROJECTION_REQUIRED");
  }
  if (
    direction.semanticRole !==
      "GENESIS_FOUR_SYMBOL_LIFE_DIRECTION_PROJECTION" ||
    direction.sourceReferenceId !== sourceReferenceId ||
    direction.mansionCoordinateReference.referenceId !==
      mansion.birthMansion.coordinateReferenceId ||
    direction.noFallback !== true
  ) {
    return blocked(
      input,
      direction.sourceReferenceId !== sourceReferenceId
        ? "SOURCE_REFERENCE_MISMATCH"
        : "DIRECTION_REFERENCE_INVALID",
    );
  }

  const archetype = input.lifeArchetypeProjection;
  if (archetype === null) {
    return blocked(input, "LIFE_ARCHETYPE_PROJECTION_REQUIRED");
  }
  if (
    archetype.semanticRole !== "GENESIS_LIFE_ARCHETYPE_PROJECTION" ||
    archetype.sourceReferenceId !== sourceReferenceId ||
    archetype.fourSymbolDirectionReference !== direction ||
    archetype.noStarBeastGeneration !== true ||
    archetype.noFallback !== true
  ) {
    return blocked(
      input,
      archetype.sourceReferenceId !== sourceReferenceId
        ? "SOURCE_REFERENCE_MISMATCH"
        : "ARCHETYPE_FORCE_REFERENCE_INVALID",
    );
  }

  const manifestationSource = input.manifestationSource;
  if (manifestationSource === null) {
    return blocked(input, "MANIFESTATION_SOURCE_REQUIRED");
  }
  if (
    manifestationSource.semanticRole !==
      "GENESIS_STAR_BEAST_MANIFESTATION_SOURCE" ||
    manifestationSource.sourceReferenceId !== sourceReferenceId ||
    manifestationSource.mansionCoordinateReference.coordinateReferenceId !==
      mansion.birthMansion.coordinateReferenceId ||
    manifestationSource.fourSymbolDirectionReference !== direction ||
    manifestationSource.lifeArchetypeReference !== archetype ||
    manifestationSource.presenceReference.presenceState !== "DORMANT" ||
    manifestationSource.presenceState !== "DORMANT" ||
    manifestationSource.noStarBeastGeneration !== true ||
    manifestationSource.noFallback !== true
  ) {
    return blocked(
      input,
      manifestationSource.sourceReferenceId !== sourceReferenceId
        ? "SOURCE_REFERENCE_MISMATCH"
        : manifestationSource.presenceState !== "DORMANT" ||
            manifestationSource.presenceReference.presenceState !== "DORMANT"
          ? "PRESENCE_STATE_INVALID"
          : "MANIFESTATION_SOURCE_INVALID",
    );
  }

  const bridge: GenesisLifeForceManifestationBridge = Object.freeze({
    semanticRole: "GENESIS_LIFE_FORCE_MANIFESTATION_BRIDGE",
    sourceReferenceId,
    lifeCoordinateReference: mansion.birthMansion,
    directionReference: direction,
    archetypeForceReference: archetype,
    manifestationSourceReference: manifestationSource,
    presenceState: "DORMANT",
    manifestationPath: [
      "LIFE_COORDINATE",
      "DIRECTION_FIELD",
      "ARCHETYPE_FORCE",
      "MANIFESTATION_SOURCE",
      "PRESENCE",
    ] as const,
    continuity: Object.freeze({
      lifeCoordinateFound: true,
      directionFormed: true,
      archetypeForceFormed: true,
      manifestationSourceReady: true,
      presenceReferenceReady: true,
    }),
    provenance: Object.freeze({
      sourceKind: mansion.sourceKind,
      sourceReferenceId,
      mansionCoordinateReferenceId:
        mansion.birthMansion.coordinateReferenceId,
      fourSymbolDirectionSourceReferenceId: direction.sourceReferenceId,
      lifeArchetypeSourceReferenceId: archetype.sourceReferenceId,
      manifestationSourceReferenceId:
        manifestationSource.manifestationReferenceId,
      presenceReferenceId: manifestationSource.presenceReference.referenceId,
    }),
    sourceOnly: true,
    noEngineInvocation: true,
    noStarBeastGeneration: true,
    noAssetGeneration: true,
    noPresenceTransition: true,
    noRendererParameters: true,
    noTimelineMutation: true,
    noVisualCalibrationMutation: true,
    noFallback: true,
  });

  return Object.freeze({
    status: "AVAILABLE" as const,
    bridge,
    input,
    boundary: BRIDGE_BOUNDARY,
  });
}
