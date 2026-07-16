import type {
  ProductionIdentitySourceAdapterReadinessBlockedReason,
  ProductionIdentitySourceAdapterReadinessBoundary,
  ProductionIdentitySourceAdapterReadinessInput,
  ProductionIdentitySourceAdapterReadinessResult,
  ProductionIdentitySourceAdapterReadinessUnavailableReason,
} from "../types/productionIdentitySourceAdapterReadiness";

const READINESS_BOUNDARY: ProductionIdentitySourceAdapterReadinessBoundary =
  Object.freeze({
    readinessOnly: true,
    referenceOnly: true,
    noIdentityRecalculation: true,
    noUserInputBinding: true,
    noProductIntegration: true,
    noSceneModelCreation: true,
    noRendererInvocation: true,
    noLifeStateMutation: true,
    noStorageWrite: true,
  });

const unavailable = (
  input: ProductionIdentitySourceAdapterReadinessInput,
  reason: ProductionIdentitySourceAdapterReadinessUnavailableReason,
): ProductionIdentitySourceAdapterReadinessResult =>
  Object.freeze({
    status: "UNAVAILABLE",
    readiness: "UNAVAILABLE",
    source: "production_identity_source_adapter_readiness",
    reason,
    input,
    identitySourceEntryReference: null,
    boundary: READINESS_BOUNDARY,
  });

const blocked = (
  input: ProductionIdentitySourceAdapterReadinessInput,
  reason: ProductionIdentitySourceAdapterReadinessBlockedReason,
): ProductionIdentitySourceAdapterReadinessResult =>
  Object.freeze({
    status: "BLOCKED",
    readiness: "BLOCKED",
    source: "production_identity_source_adapter_readiness",
    reason,
    input,
    identitySourceEntryReference: null,
    boundary: READINESS_BOUNDARY,
  });

export function resolveProductionIdentitySourceAdapterReadiness(
  input: ProductionIdentitySourceAdapterReadinessInput,
): ProductionIdentitySourceAdapterReadinessResult {
  const trajectory = input.sourceTrajectoryReference;
  if (trajectory === null) {
    return unavailable(input, "SOURCE_TRAJECTORY_REFERENCE_REQUIRED");
  }

  if (
    trajectory.semanticRole !== "STAR_MANSION_LIFE_TRAJECTORY_SOURCE" ||
    trajectory.boundary.sourceFreezeOnly !== true ||
    trajectory.boundary.referenceOnly !== true ||
    trajectory.boundary.presentationTrajectoryNotCalculationDependency !==
      true ||
    trajectory.boundary.noEngineMutation !== true ||
    trajectory.boundary.noRendererMutation !== true ||
    trajectory.boundary.noUIIntegration !== true ||
    trajectory.boundary.noStorageWrite !== true
  ) {
    return blocked(input, "SOURCE_TRAJECTORY_REFERENCE_INVALID");
  }

  const originCoordinate = trajectory.originCoordinateReference;
  if (
    originCoordinate.referenceType !== "STAR_BEAST_GENESIS_ORIGIN_COORDINATE" ||
    originCoordinate.sourceRole !== "SHARED_TEMPORAL_BIRTH_COORDINATE" ||
    originCoordinate.birthLocationContextOnly !== true ||
    originCoordinate.birthLocationExcludedFromStarBeastDerivation !== true
  ) {
    return blocked(input, "ORIGIN_COORDINATE_REFERENCE_INVALID");
  }

  const mansion = trajectory.mansionResultReference;
  if (
    mansion.referenceType !== "STAR_BEAST_GENESIS_MANSION_ENGINE_RESULT" ||
    mansion.sourceEngine !== "guanyao_starbeast_engine" ||
    mansion.resultReference.status !== "READY" ||
    mansion.resultReference.locationIndependent !== true ||
    mansion.resultReference.birthTimeIndependent !== true
  ) {
    return blocked(input, "MANSION_RESULT_REFERENCE_INVALID");
  }

  const fourSymbol = trajectory.fourSymbolResultReference;
  if (
    fourSymbol.referenceType !==
      "STAR_BEAST_GENESIS_FOUR_SYMBOL_ENGINE_RESULT" ||
    fourSymbol.sourceEngine !== "guanyao_starbeast_engine" ||
    fourSymbol.resultReference.status !== "READY" ||
    fourSymbol.resultReference.locationIndependent !== true ||
    fourSymbol.resultReference.birthTimeIndependent !== true
  ) {
    return blocked(input, "FOUR_SYMBOL_RESULT_REFERENCE_INVALID");
  }

  const motherCode = trajectory.motherCodeProfileReference;
  if (
    motherCode.referenceType !== "STAR_BEAST_GENESIS_MOTHER_CODE_PROFILE" ||
    motherCode.sourceEngine !== "guanyao_lunar_mother_code_landing" ||
    motherCode.profileReference.motherCodeId.trim().length === 0
  ) {
    return blocked(input, "MOTHER_CODE_PROFILE_REFERENCE_INVALID");
  }

  const lifeArchetype = trajectory.lifeArchetypeProfileReference;
  if (
    lifeArchetype.source !== "mother_code_profile" ||
    lifeArchetype.semanticRole !== "ORIGINAL_LIFE_FORCE" ||
    lifeArchetype.nonFinalIdentity !== true ||
    lifeArchetype.notHexagram !== true ||
    lifeArchetype.notPersonalityLabel !== true
  ) {
    return blocked(input, "LIFE_ARCHETYPE_PROFILE_REFERENCE_INVALID");
  }

  const identitySource = trajectory.starBeastIdentitySource;
  if (
    identitySource.semanticRole !== "STAR_BEAST_IDENTITY_SOURCE" ||
    identitySource.boundary.independentSourcesBeforeConvergence !== true ||
    identitySource.boundary.identitySourceOnly !== true ||
    identitySource.boundary.noPersonalStarBeastEntityCreation !== true ||
    identitySource.boundary.noRendererAssetCreation !== true
  ) {
    return blocked(input, "IDENTITY_SOURCE_REFERENCE_INVALID");
  }

  if (
    identitySource.mansionSeed.sourceMansionResultReference !== mansion ||
    identitySource.fourSymbolField.sourceFourSymbolResultReference !==
      fourSymbol ||
    identitySource.lifeArchetypeForce.sourceMotherCodeProfileReference !==
      motherCode ||
    identitySource.lifeArchetypeForce.sourceLifeArchetypeProfileReference !==
      lifeArchetype
  ) {
    return blocked(input, "SOURCE_COMPONENT_REFERENCE_MISMATCH");
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

  const personalIdentity = identitySource.personalStarBeastReference;
  if (
    personalIdentity.referenceType !== "PERSONAL_STAR_BEAST_IDENTITY_SOURCE" ||
    personalIdentity.referenceId.trim().length === 0 ||
    personalIdentity.semanticRole !== "MANSION_SEED_FIELD_FORCE_CONVERGENCE" ||
    personalIdentity.notFourSymbolAnimal !== true ||
    personalIdentity.notGeneratedAsset !== true ||
    personalIdentity.notLifeState !== true
  ) {
    return blocked(input, "PERSONAL_IDENTITY_CONVERGENCE_INVALID");
  }

  return Object.freeze({
    status: "READY",
    readiness: "READY_FOR_FORMAL_IDENTITY_SOURCE_ADAPTER",
    source: "production_identity_source_adapter_readiness",
    input,
    identitySourceEntryReference: Object.freeze({
      referenceType: "PRODUCTION_IDENTITY_SOURCE_ENTRY",
      referenceId: `production-identity-source:${personalIdentity.referenceId}`,
      sourceRole: "FORMAL_LIFE_IDENTITY_ENTRY",
      sourceTrajectoryReference: trajectory,
      originCoordinateReference: trajectory.originCoordinateReference,
      mansionResultReference: mansion,
      fourSymbolResultReference: fourSymbol,
      motherCodeProfileReference: motherCode,
      lifeArchetypeProfileReference: lifeArchetype,
      identitySourceReference: identitySource,
      personalStarBeastIdentityReference: personalIdentity,
      referenceOnly: true,
      noUserInputBinding: true,
      noProductIntegration: true,
      noSceneModelCreation: true,
      noRendererInvocation: true,
      noStorageWrite: true,
    }),
    boundary: READINESS_BOUNDARY,
  });
}
