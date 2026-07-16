import type {
  StarBeastGenesisExperienceInput,
  StarBeastGenesisExperienceState,
  StarBeastGenesisRevealBlockedReason,
  StarBeastGenesisRevealResult,
  StarBeastGenesisRevealUnavailableReason,
  StarBeastGenesisStage,
} from "../types/starBeastGenesisExperience";

const GENESIS_BOUNDARY = Object.freeze({
  experienceSchemaOnly: true,
  referenceOnly: true,
  noFourSymbolToLifeArchetypeInference: true,
  noBirthLocationToStarBeastDerivation: true,
  noStarBeastGeneration: true,
  noAssetMutation: true,
  noLifeStateMutation: true,
  noRendererInvocation: true,
  noCanvasConnection: true,
  noUIIntegration: true,
  noRuntimeIntegration: true,
  noStorageWrite: true,
});

const experienceState = (
  input: StarBeastGenesisExperienceInput,
  currentStage: StarBeastGenesisStage,
): StarBeastGenesisExperienceState =>
  Object.freeze({
    semanticRole: "STAR_BEAST_GENESIS_EXPERIENCE_STATE",
    currentStage,
    originCoordinateReference: input.originCoordinateReference,
    mansionReference: input.mansionReference,
    fourSymbolReference: input.fourSymbolReference,
    lifeArchetypeReference: input.lifeArchetypeReference,
    starBeastAssetReference: input.starBeastAssetReference,
    presentationSequenceOnly: true,
    notCausalDerivationSequence: true,
  });

const unavailable = (
  input: StarBeastGenesisExperienceInput,
  currentStage: StarBeastGenesisStage,
  reason: StarBeastGenesisRevealUnavailableReason,
): StarBeastGenesisRevealResult =>
  Object.freeze({
    status: "UNAVAILABLE",
    revealStatus: "UNAVAILABLE",
    source: "star_beast_genesis_experience_mapping",
    reason,
    input,
    experienceState: experienceState(input, currentStage),
    boundary: GENESIS_BOUNDARY,
  });

const blocked = (
  input: StarBeastGenesisExperienceInput,
  currentStage: StarBeastGenesisStage,
  reason: StarBeastGenesisRevealBlockedReason,
): StarBeastGenesisRevealResult =>
  Object.freeze({
    status: "BLOCKED",
    revealStatus: "BLOCKED",
    source: "star_beast_genesis_experience_mapping",
    reason,
    input,
    experienceState: experienceState(input, currentStage),
    boundary: GENESIS_BOUNDARY,
  });

export function resolveStarBeastGenesisExperience(
  input: StarBeastGenesisExperienceInput,
): StarBeastGenesisRevealResult {
  const origin = input.originCoordinateReference;
  if (origin === null) {
    return unavailable(input, "COSMIC_ORIGIN", "ORIGIN_COORDINATE_REFERENCE_REQUIRED");
  }
  if (
    origin.referenceType !== "STAR_BEAST_GENESIS_ORIGIN_COORDINATE" ||
    origin.referenceId.trim().length === 0 ||
    origin.sourceRole !== "SHARED_TEMPORAL_BIRTH_COORDINATE" ||
    origin.birthLocationContextOnly !== true ||
    origin.birthLocationExcludedFromStarBeastDerivation !== true
  ) {
    return blocked(input, "ORIGIN_COORDINATE", "ORIGIN_COORDINATE_REFERENCE_INVALID");
  }

  const mansion = input.mansionReference;
  if (mansion === null) {
    return unavailable(input, "ORIGIN_COORDINATE", "MANSION_REFERENCE_REQUIRED");
  }
  if (
    mansion.referenceType !== "STAR_BEAST_GENESIS_MANSION" ||
    mansion.referenceId.trim().length === 0 ||
    mansion.sourceStarbeastDerivationReference.status !== "READY" ||
    mansion.sourceStarbeastDerivationReference.locationIndependent !== true ||
    mansion.sourceStarbeastDerivationReference.birthTimeIndependent !== true
  ) {
    return blocked(input, "STAR_MANSION_ALIGNMENT", "MANSION_SOURCE_REFERENCE_INVALID");
  }

  const fourSymbol = input.fourSymbolReference;
  if (fourSymbol === null) {
    return unavailable(input, "STAR_MANSION_ALIGNMENT", "FOUR_SYMBOL_REFERENCE_REQUIRED");
  }
  if (
    fourSymbol.referenceType !== "STAR_BEAST_GENESIS_FOUR_SYMBOL" ||
    fourSymbol.referenceId.trim().length === 0 ||
    fourSymbol.sourceMansionReference !== mansion
  ) {
    return blocked(input, "FOUR_SYMBOL_FORMATION", "FOUR_SYMBOL_SOURCE_REFERENCE_MISMATCH");
  }

  const lifeArchetype = input.lifeArchetypeReference;
  if (lifeArchetype === null) {
    return unavailable(input, "FOUR_SYMBOL_FORMATION", "LIFE_ARCHETYPE_REFERENCE_REQUIRED");
  }
  if (
    lifeArchetype.referenceType !== "STAR_BEAST_GENESIS_LIFE_ARCHETYPE" ||
    lifeArchetype.referenceId.trim().length === 0 ||
    lifeArchetype.sourceRole !== "MOTHER_CODE_PROFILE_ONLY" ||
    lifeArchetype.sourceLifeArchetypeProfileReference.source !==
      "mother_code_profile"
  ) {
    return blocked(input, "LIFE_ARCHETYPE_INFUSION", "LIFE_ARCHETYPE_SOURCE_REFERENCE_INVALID");
  }

  const asset = input.starBeastAssetReference;
  if (asset === null) {
    return unavailable(input, "LIFE_ARCHETYPE_INFUSION", "STAR_BEAST_ASSET_REFERENCE_REQUIRED");
  }
  if (
    asset.referenceType !== "STAR_BEAST_GENESIS_ASSET" ||
    asset.referenceId.trim().length === 0 ||
    asset.sourceAssetDefinitionReference.semanticRole !==
      "STAR_BEAST_ASSET_DEFINITION" ||
    asset.sourceAssetDefinitionReference.noFourSymbolInference !== true ||
    asset.sourceAssetDefinitionReference.noLifeStateMutation !== true
  ) {
    return blocked(input, "STAR_BEAST_REVEAL", "STAR_BEAST_ASSET_SOURCE_REFERENCE_INVALID");
  }
  if (
    asset.sourceAssetDefinitionReference.archetype.sourceProfileReference !==
    lifeArchetype.sourceLifeArchetypeProfileReference
  ) {
    return blocked(input, "STAR_BEAST_REVEAL", "STAR_BEAST_ASSET_ARCHETYPE_REFERENCE_MISMATCH");
  }

  return Object.freeze({
    status: "READY",
    revealStatus: "READY_FOR_FUTURE_GENESIS_EXPERIENCE_PRESENTATION",
    source: "star_beast_genesis_experience_mapping",
    input,
    experienceState: experienceState(input, "STAR_BEAST_REVEAL") as Extract<
      StarBeastGenesisRevealResult,
      { status: "READY" }
    >["experienceState"],
    boundary: GENESIS_BOUNDARY,
  });
}
