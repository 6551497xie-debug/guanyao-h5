import type {
  PersonalStarBeastSceneModelFixture,
  PersonalStarBeastSceneModelFixtureDifference,
  PersonalStarBeastSceneModelFixtureValidationReason,
  PersonalStarBeastSceneModelFixtureValidationResult,
} from "../types/personalStarBeastSceneModelFixture";

const VALIDATION_BOUNDARY = Object.freeze({
  fixtureValidationOnly: true,
  formalReferencesOnly: true,
  noIdentityFactCopy: true,
  noIdentityCalculation: true,
  noSceneModelMutation: true,
  noRenderPlanCreation: true,
  noRendererInvocation: true,
  noWebGLActivation: true,
  noCanvasInvocation: true,
  noProductionIntegration: true,
  noRuntimeIntegration: true,
  noUIIntegration: true,
  noStorageWrite: true,
} as const);

const blocked = (
  fixtures: readonly PersonalStarBeastSceneModelFixture[],
  reason: PersonalStarBeastSceneModelFixtureValidationReason,
  difference: PersonalStarBeastSceneModelFixtureDifference | null = null,
): PersonalStarBeastSceneModelFixtureValidationResult =>
  Object.freeze({
    status: "BLOCKED",
    validation: "BLOCKED",
    reason,
    fixtures,
    difference,
    boundary: VALIDATION_BOUNDARY,
  });

const validateFormalFixture = (
  fixture: PersonalStarBeastSceneModelFixture,
): PersonalStarBeastSceneModelFixtureValidationReason | null => {
  if (fixture.fixtureId.trim().length === 0) return "FIXTURE_ID_REQUIRED";
  if (fixture.validationScope !== "ISOLATED_PROTOTYPE_ONLY") {
    return "ISOLATED_SCOPE_REQUIRED";
  }

  const identitySource = fixture.identitySourceReference;
  if (
    identitySource.semanticRole !== "STAR_BEAST_IDENTITY_SOURCE" ||
    identitySource.boundary.independentSourcesBeforeConvergence !== true ||
    identitySource.boundary.identitySourceOnly !== true ||
    identitySource.boundary.noPersonalStarBeastEntityCreation !== true ||
    identitySource.boundary.noRendererAssetCreation !== true
  ) {
    return "FORMAL_IDENTITY_SOURCE_INVALID";
  }

  const mansionSeed = fixture.mansionSeedReference;
  if (
    mansionSeed !== identitySource.mansionSeed ||
    mansionSeed.semanticRole !== "BIRTH_MANSION_LIFE_SEED" ||
    mansionSeed.sourceMansionResultReference.sourceEngine !==
      "guanyao_starbeast_engine" ||
    mansionSeed.sourceMansionResultReference.resultReference.status !== "READY"
  ) {
    return "FORMAL_MANSION_SOURCE_INVALID";
  }

  const fourSymbolField = fixture.fourSymbolFieldReference;
  if (
    fourSymbolField !== identitySource.fourSymbolField ||
    fourSymbolField.semanticRole !== "FOUR_SYMBOL_MORPHOLOGICAL_FIELD" ||
    fourSymbolField.sourceFourSymbolResultReference.sourceEngine !==
      "guanyao_starbeast_engine" ||
    fourSymbolField.sourceFourSymbolResultReference.resultReference !==
      mansionSeed.sourceMansionResultReference.resultReference ||
    fourSymbolField.noAnimalModelGeneration !== true ||
    fourSymbolField.noMotherCodeInference !== true
  ) {
    return "FORMAL_FOUR_SYMBOL_SOURCE_INVALID";
  }

  const lifeArchetype = fixture.lifeArchetypeReference;
  if (
    lifeArchetype !== identitySource.lifeArchetypeForce ||
    lifeArchetype.semanticRole !== "LIFE_ARCHETYPE_FORCE" ||
    lifeArchetype.sourceMotherCodeProfileReference.sourceEngine !==
      "guanyao_lunar_mother_code_landing" ||
    lifeArchetype.sourceLifeArchetypeProfileReference.source !==
      "mother_code_profile" ||
    lifeArchetype.sourceLifeArchetypeProfileReference.sourceMotherCodeId !==
      lifeArchetype.sourceMotherCodeProfileReference.profileReference
        .motherCodeId ||
    lifeArchetype.noFourSymbolGeneration !== true ||
    lifeArchetype.noMansionSourceMutation !== true
  ) {
    return "FORMAL_LIFE_ARCHETYPE_SOURCE_INVALID";
  }

  const identityReference = identitySource.personalStarBeastReference;
  const sceneModel = fixture.sceneModelReference;
  if (
    sceneModel.sourceIdentityReference !== identityReference ||
    sceneModel.sceneReferences.mansionSeedStructure.sourceIdentityReference !==
      identityReference ||
    sceneModel.sceneReferences.fourSymbolSpatialField
      .sourceIdentityReference !== identityReference ||
    sceneModel.sceneReferences.lifeForceModulation.sourceIdentityReference !==
      identityReference
  ) {
    return "IDENTITY_REFERENCE_MISMATCH";
  }

  if (
    sceneModel.semanticRole !==
      "PERSONAL_STAR_BEAST_RENDERER_NEUTRAL_SCENE_MODEL" ||
    sceneModel.rendererNeutral !== true ||
    sceneModel.referenceOnly !== true ||
    sceneModel.noLifeFactCopy !== true ||
    sceneModel.noIdentityCalculation !== true ||
    sceneModel.noAssetGeneration !== true ||
    sceneModel.noDrawCommands !== true ||
    sceneModel.noRendererInvocation !== true ||
    sceneModel.noRuntimeIntegration !== true ||
    sceneModel.noUIIntegration !== true ||
    sceneModel.noStorageWrite !== true
  ) {
    return "SCENE_MODEL_REFERENCE_INVALID";
  }

  const grammar = sceneModel.sourceManifestationGrammarReference;
  if (grammar.sourceIdentityReference !== identityReference) {
    return "MANIFESTATION_GRAMMAR_SOURCE_MISMATCH";
  }

  return null;
};

const compareFixtures = (
  left: PersonalStarBeastSceneModelFixture,
  right: PersonalStarBeastSceneModelFixture,
): PersonalStarBeastSceneModelFixtureDifference =>
  Object.freeze({
    identityReferenceDifferent:
      left.identitySourceReference.personalStarBeastReference.referenceId !==
      right.identitySourceReference.personalStarBeastReference.referenceId,
    mansionSeedDifferent:
      left.mansionSeedReference.sourceMansionResultReference.resultReference
        .mansion !==
      right.mansionSeedReference.sourceMansionResultReference.resultReference
        .mansion,
    fourSymbolFieldDifferent:
      left.fourSymbolFieldReference.sourceFourSymbolResultReference
        .resultReference.fourSymbol !==
      right.fourSymbolFieldReference.sourceFourSymbolResultReference
        .resultReference.fourSymbol,
    lifeArchetypeForceDifferent:
      left.lifeArchetypeReference.sourceLifeArchetypeProfileReference.code !==
      right.lifeArchetypeReference.sourceLifeArchetypeProfileReference.code,
    sceneModelExpressionReferenceDifferent:
      left.sceneModelReference.sceneReferences.mansionSeedStructure.referenceId !==
        right.sceneModelReference.sceneReferences.mansionSeedStructure
          .referenceId &&
      left.sceneModelReference.sceneReferences.fourSymbolSpatialField
        .referenceId !==
        right.sceneModelReference.sceneReferences.fourSymbolSpatialField
          .referenceId &&
      left.sceneModelReference.sceneReferences.lifeForceModulation.referenceId !==
        right.sceneModelReference.sceneReferences.lifeForceModulation.referenceId,
  });

export function validatePersonalStarBeastSceneModelFixturePair(
  fixtures: readonly PersonalStarBeastSceneModelFixture[],
): PersonalStarBeastSceneModelFixtureValidationResult {
  if (fixtures.length !== 2) {
    return blocked(fixtures, "EXACTLY_TWO_FIXTURES_REQUIRED");
  }

  const [left, right] = fixtures;
  if (left.fixtureId === right.fixtureId) {
    return blocked(fixtures, "FIXTURE_ID_DUPLICATED");
  }

  for (const fixture of fixtures) {
    const reason = validateFormalFixture(fixture);
    if (reason !== null) return blocked(fixtures, reason);
  }

  const leftGrammar =
    left.sceneModelReference.sourceManifestationGrammarReference;
  const rightGrammar =
    right.sceneModelReference.sourceManifestationGrammarReference;
  if (
    leftGrammar.referenceId !== rightGrammar.referenceId ||
    leftGrammar.protocolVersion !== rightGrammar.protocolVersion
  ) {
    return blocked(fixtures, "MANIFESTATION_GRAMMAR_REFERENCE_MISMATCH");
  }

  const difference = compareFixtures(left, right);
  if (!difference.identityReferenceDifferent) {
    return blocked(fixtures, "IDENTITY_REFERENCE_NOT_DISTINCT", difference);
  }
  if (
    !difference.mansionSeedDifferent &&
    !difference.fourSymbolFieldDifferent &&
    !difference.lifeArchetypeForceDifferent
  ) {
    return blocked(fixtures, "LIFE_EXPRESSION_SOURCE_NOT_DISTINCT", difference);
  }
  if (!difference.sceneModelExpressionReferenceDifferent) {
    return blocked(
      fixtures,
      "SCENE_MODEL_EXPRESSION_REFERENCE_NOT_DISTINCT",
      difference,
    );
  }

  const validatedPair = Object.freeze([left, right] as const);
  return Object.freeze({
    status: "VALID",
    validation: "SAME_GRAMMAR_DIFFERENT_LIFE_CONFIRMED",
    fixtures: validatedPair,
    difference,
    boundary: VALIDATION_BOUNDARY,
  });
}
