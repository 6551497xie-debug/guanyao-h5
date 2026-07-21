import type {
  GenesisStarBeastManifestationSource,
  GenesisStarBeastManifestationSourceBlockedReason,
  GenesisStarBeastManifestationSourceBoundary,
  GenesisStarBeastManifestationSourceInput,
  GenesisStarBeastManifestationSourceResult,
} from "../types/genesisStarBeastManifestationSource";

const SOURCE_BOUNDARY: GenesisStarBeastManifestationSourceBoundary =
  Object.freeze({
    sourceOnly: true,
    existingSourceCalibrationOnly: true,
    noEngineInvocation: true,
    noStarBeastGeneration: true,
    noAssetGeneration: true,
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
  input: GenesisStarBeastManifestationSourceInput,
  reason: GenesisStarBeastManifestationSourceBlockedReason,
): GenesisStarBeastManifestationSourceResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    reason,
    source: null,
    input,
    boundary: SOURCE_BOUNDARY,
  });

export function resolveGenesisStarBeastManifestationSource(
  input: GenesisStarBeastManifestationSourceInput,
): GenesisStarBeastManifestationSourceResult {
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
        : "MANSION_COORDINATE_PROJECTION_INVALID",
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
    direction.provenance.sourceReferenceId !== sourceReferenceId ||
    direction.mansionCoordinateReference.referenceId !==
      mansion.birthMansion.coordinateReferenceId ||
    direction.noFallback !== true
  ) {
    return blocked(input, "FOUR_SYMBOL_DIRECTION_PROJECTION_INVALID");
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
    return blocked(input, "LIFE_ARCHETYPE_PROJECTION_INVALID");
  }

  const identitySource = input.starBeastIdentitySourceReference;
  if (identitySource === null) {
    return blocked(input, "STAR_BEAST_IDENTITY_SOURCE_REQUIRED");
  }
  if (
    identitySource.semanticRole !== "STAR_BEAST_IDENTITY_SOURCE" ||
    identitySource.boundary.identitySourceOnly !== true ||
    identitySource.boundary.noPersonalStarBeastEntityCreation !== true ||
    identitySource.boundary.noRendererAssetCreation !== true ||
    identitySource.personalStarBeastReference.referenceType !==
      "PERSONAL_STAR_BEAST_IDENTITY_SOURCE" ||
    identitySource.personalStarBeastReference.referenceId.trim().length === 0 ||
    identitySource.personalStarBeastReference.notGeneratedAsset !== true ||
    identitySource.personalStarBeastReference.notLifeState !== true
  ) {
    return blocked(input, "STAR_BEAST_IDENTITY_SOURCE_INVALID");
  }
  const mansionResult =
    identitySource.mansionSeed.sourceMansionResultReference.resultReference;
  const fourSymbolResult =
    identitySource.fourSymbolField.sourceFourSymbolResultReference.resultReference;
  if (
    mansionResult.status !== "READY" ||
    mansionResult.mansionIndex !== mansion.birthMansion.mansionIndex ||
    mansionResult.mansion !== mansion.birthMansion.mansion ||
    fourSymbolResult !== mansionResult ||
    fourSymbolResult.fourSymbol !== direction.fourSymbol ||
    fourSymbolResult.direction !== direction.direction ||
    identitySource.lifeArchetypeForce.sourceLifeArchetypeProfileReference !==
      archetype.sourceLifeArchetypeProfileReference
  ) {
    return blocked(input, "STAR_BEAST_SOURCE_CONTINUITY_INVALID");
  }

  const readinessReference =
    archetype.starBeastManifestationReadinessReference;
  if (
    readinessReference.referenceType !==
      "PERSONAL_STAR_BEAST_MANIFESTATION_READINESS" ||
    readinessReference.referenceId.trim().length === 0 ||
    readinessReference.readiness !==
      "READY_FOR_PERSONAL_STAR_BEAST_MANIFESTATION_DESIGN"
  ) {
    return blocked(input, "MANIFESTATION_READINESS_INVALID");
  }

  const manifestationReferenceId =
    `genesis:star-beast-manifestation:${sourceReferenceId}`;
  const presenceReference = Object.freeze({
    referenceType: "GENESIS_STAR_BEAST_PRESENCE_REFERENCE" as const,
    referenceId: `${manifestationReferenceId}:presence`,
    presenceState: "DORMANT" as const,
    sourceIdentityReference: identitySource.personalStarBeastReference,
    manifestationReadinessReference: readinessReference,
    existingSourceOnly: true as const,
    noEntityCreation: true as const,
    noAssetGeneration: true as const,
    noRendererInvocation: true as const,
  });
  const manifestationSource: GenesisStarBeastManifestationSource =
    Object.freeze({
      semanticRole: "GENESIS_STAR_BEAST_MANIFESTATION_SOURCE",
      sourceReferenceId,
      mansionCoordinateReference: mansion.birthMansion,
      fourSymbolDirectionReference: direction,
      lifeArchetypeReference: archetype,
      manifestationReferenceId,
      presenceState: "DORMANT",
      presenceReference,
      provenance: Object.freeze({
        sourceKind: mansion.sourceKind,
        sourceReferenceId,
        mansionCoordinateReferenceId:
          mansion.birthMansion.coordinateReferenceId,
        fourSymbolDirectionSourceReferenceId: direction.sourceReferenceId,
        lifeArchetypeSourceReferenceId: archetype.sourceReferenceId,
        starBeastIdentityReferenceId:
          identitySource.personalStarBeastReference.referenceId,
        manifestationReadinessReferenceId: readinessReference.referenceId,
      }),
      existingSourceCalibrationOnly: true,
      existingMansionCoordinateProjectionOnly: true,
      existingFourSymbolDirectionProjectionOnly: true,
      existingLifeArchetypeProjectionOnly: true,
      noEngineInvocation: true,
      noStarBeastGeneration: true,
      noAssetGeneration: true,
      noRendererParameters: true,
      noTimelineMutation: true,
      noVisualCalibrationMutation: true,
      noFallback: true,
    });

  return Object.freeze({
    status: "AVAILABLE" as const,
    source: manifestationSource,
    input,
    boundary: SOURCE_BOUNDARY,
  });
}
