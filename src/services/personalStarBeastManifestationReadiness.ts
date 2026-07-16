import type {
  PersonalStarBeastManifestationReadinessBlockedReason,
  PersonalStarBeastManifestationReadinessInput,
  PersonalStarBeastManifestationReadinessResult,
  PersonalStarBeastManifestationReadinessUnavailableReason,
} from "../types/personalStarBeastManifestationReadiness";

const READINESS_BOUNDARY = Object.freeze({
  readinessOnly: true,
  referenceOnly: true,
  noPersonalStarBeastCreation: true,
  noManifestationDesign: true,
  noVisualParameterGeneration: true,
  noAssetCreation: true,
  noRendererInvocation: true,
  noCanvasInvocation: true,
  noLifeStateMutation: true,
  noRuntimeIntegration: true,
  noUIIntegration: true,
  noStorageWrite: true,
} as const);

const unavailable = (
  input: PersonalStarBeastManifestationReadinessInput,
  reason: PersonalStarBeastManifestationReadinessUnavailableReason,
): PersonalStarBeastManifestationReadinessResult =>
  Object.freeze({
    status: "UNAVAILABLE",
    readiness: "UNAVAILABLE",
    source: "personal_star_beast_manifestation_readiness",
    reason,
    input,
    personalStarBeastIdentityReference: null,
    boundary: READINESS_BOUNDARY,
  });

const blocked = (
  input: PersonalStarBeastManifestationReadinessInput,
  reason: PersonalStarBeastManifestationReadinessBlockedReason,
): PersonalStarBeastManifestationReadinessResult =>
  Object.freeze({
    status: "BLOCKED",
    readiness: "BLOCKED",
    source: "personal_star_beast_manifestation_readiness",
    reason,
    input,
    personalStarBeastIdentityReference: null,
    boundary: READINESS_BOUNDARY,
  });

export function resolvePersonalStarBeastManifestationReadiness(
  input: PersonalStarBeastManifestationReadinessInput,
): PersonalStarBeastManifestationReadinessResult {
  const trajectory = input.starMansionLifeTrajectorySourceReference;
  if (trajectory === null) {
    return unavailable(input, "STAR_MANSION_LIFE_TRAJECTORY_SOURCE_REQUIRED");
  }

  const identitySource = input.starBeastIdentitySourceReference;
  if (identitySource === null) {
    return unavailable(input, "STAR_BEAST_IDENTITY_SOURCE_REQUIRED");
  }

  const originCoordinate = input.originCoordinateReference;
  if (originCoordinate === null) {
    return unavailable(input, "ORIGIN_COORDINATE_REFERENCE_REQUIRED");
  }

  const mansion = input.mansionResultReference;
  if (mansion === null) {
    return unavailable(input, "MANSION_RESULT_REFERENCE_REQUIRED");
  }

  const fourSymbol = input.fourSymbolResultReference;
  if (fourSymbol === null) {
    return unavailable(input, "FOUR_SYMBOL_RESULT_REFERENCE_REQUIRED");
  }

  const motherCode = input.motherCodeProfileReference;
  if (motherCode === null) {
    return unavailable(input, "MOTHER_CODE_PROFILE_REFERENCE_REQUIRED");
  }

  const lifeArchetype = input.lifeArchetypeProfileReference;
  if (lifeArchetype === null) {
    return unavailable(input, "LIFE_ARCHETYPE_PROFILE_REFERENCE_REQUIRED");
  }

  if (
    trajectory.semanticRole !== "STAR_MANSION_LIFE_TRAJECTORY_SOURCE" ||
    trajectory.boundary.sourceFreezeOnly !== true ||
    trajectory.boundary.referenceOnly !== true ||
    trajectory.boundary.presentationTrajectoryNotCalculationDependency !==
      true ||
    trajectory.boundary.noEngineMutation !== true ||
    trajectory.boundary.noRendererMutation !== true
  ) {
    return blocked(input, "STAR_MANSION_LIFE_TRAJECTORY_SOURCE_INVALID");
  }

  if (
    identitySource.semanticRole !== "STAR_BEAST_IDENTITY_SOURCE" ||
    identitySource.boundary.independentSourcesBeforeConvergence !== true ||
    identitySource.boundary.identitySourceOnly !== true ||
    identitySource.boundary.noPersonalStarBeastEntityCreation !== true ||
    identitySource.boundary.noRendererAssetCreation !== true
  ) {
    return blocked(input, "STAR_BEAST_IDENTITY_SOURCE_INVALID");
  }

  if (identitySource !== trajectory.starBeastIdentitySource) {
    return blocked(input, "STAR_BEAST_IDENTITY_SOURCE_MISMATCH");
  }
  if (originCoordinate !== trajectory.originCoordinateReference) {
    return blocked(input, "ORIGIN_COORDINATE_SOURCE_MISMATCH");
  }
  if (mansion !== trajectory.mansionResultReference) {
    return blocked(input, "MANSION_RESULT_SOURCE_MISMATCH");
  }
  if (fourSymbol !== trajectory.fourSymbolResultReference) {
    return blocked(input, "FOUR_SYMBOL_RESULT_SOURCE_MISMATCH");
  }
  if (motherCode !== trajectory.motherCodeProfileReference) {
    return blocked(input, "MOTHER_CODE_PROFILE_SOURCE_MISMATCH");
  }
  if (lifeArchetype !== trajectory.lifeArchetypeProfileReference) {
    return blocked(input, "LIFE_ARCHETYPE_PROFILE_SOURCE_MISMATCH");
  }

  if (
    identitySource.mansionSeed.sourceMansionResultReference !== mansion ||
    identitySource.fourSymbolField.sourceFourSymbolResultReference !==
      fourSymbol ||
    identitySource.lifeArchetypeForce.sourceMotherCodeProfileReference !==
      motherCode ||
    identitySource.lifeArchetypeForce
      .sourceLifeArchetypeProfileReference !== lifeArchetype
  ) {
    return blocked(input, "STAR_BEAST_IDENTITY_SOURCE_MISMATCH");
  }

  if (mansion.resultReference !== fourSymbol.resultReference) {
    return blocked(input, "MANSION_FOUR_SYMBOL_SOURCE_MISMATCH");
  }
  if (
    lifeArchetype.sourceMotherCodeId !==
    motherCode.profileReference.motherCodeId
  ) {
    return blocked(input, "MOTHER_CODE_LIFE_ARCHETYPE_SOURCE_MISMATCH");
  }

  const personalStarBeastIdentity = identitySource.personalStarBeastReference;
  if (
    personalStarBeastIdentity.referenceType !==
      "PERSONAL_STAR_BEAST_IDENTITY_SOURCE" ||
    personalStarBeastIdentity.referenceId.trim().length === 0 ||
    personalStarBeastIdentity.semanticRole !==
      "MANSION_SEED_FIELD_FORCE_CONVERGENCE" ||
    personalStarBeastIdentity.notFourSymbolAnimal !== true ||
    personalStarBeastIdentity.notGeneratedAsset !== true ||
    personalStarBeastIdentity.notLifeState !== true
  ) {
    return blocked(input, "PERSONAL_STAR_BEAST_IDENTITY_CONVERGENCE_INVALID");
  }

  return Object.freeze({
    status: "READY",
    readiness: "READY_FOR_PERSONAL_STAR_BEAST_MANIFESTATION_DESIGN",
    source: "personal_star_beast_manifestation_readiness",
    input,
    personalStarBeastIdentityReference: personalStarBeastIdentity,
    boundary: READINESS_BOUNDARY,
  });
}
