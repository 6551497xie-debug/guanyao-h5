import type { StarBeastIdentitySource } from "../types/starBeastIdentitySource";
import type {
  StarMansionLifeTrajectoryPath,
  StarMansionLifeTrajectorySource,
  StarMansionLifeTrajectorySourceFreezeBlockedReason,
  StarMansionLifeTrajectorySourceFreezeInput,
  StarMansionLifeTrajectorySourceFreezeResult,
  StarMansionLifeTrajectorySourceFreezeUnavailableReason,
} from "../types/starMansionLifeTrajectory";

type ReadyStarMansionLifeTrajectorySourceFreezeInput = {
  readonly [Key in keyof StarMansionLifeTrajectorySourceFreezeInput]: NonNullable<
    StarMansionLifeTrajectorySourceFreezeInput[Key]
  >;
};

export const STAR_MANSION_LIFE_TRAJECTORY_PATH: StarMansionLifeTrajectoryPath =
  Object.freeze([
    "COSMIC_SKY",
    "TWENTY_EIGHT_MANSION_REVEAL",
    "LIFE_ARRIVAL_COORDINATE",
    "TIME_SEQUENCE_ALIGNMENT",
    "BIRTH_MANSION_IGNITION",
    "FOUR_SYMBOL_ALIGNMENT",
    "MOTHER_CODE_INFUSION",
    "PERSONAL_STAR_BEAST_REVEAL",
    "REALITY_PRESSURE",
    "GRAVITY_SIX_SPACE_EXPERIENCE",
    "CHOICE_PERSONA_MIGRATION",
    "CRYSTAL_IMPRINT",
  ]);

const unavailable = (
  input: StarMansionLifeTrajectorySourceFreezeInput,
  reason: StarMansionLifeTrajectorySourceFreezeUnavailableReason,
): StarMansionLifeTrajectorySourceFreezeResult =>
  Object.freeze({ status: "UNAVAILABLE", reason, input, source: null });

const blocked = (
  input: StarMansionLifeTrajectorySourceFreezeInput,
  reason: StarMansionLifeTrajectorySourceFreezeBlockedReason,
): StarMansionLifeTrajectorySourceFreezeResult =>
  Object.freeze({ status: "BLOCKED", reason, input, source: null });

const createIdentitySource = (
  input: ReadyStarMansionLifeTrajectorySourceFreezeInput,
): StarBeastIdentitySource =>
  Object.freeze({
    semanticRole: "STAR_BEAST_IDENTITY_SOURCE",
    mansionSeed: Object.freeze({
      semanticRole: "BIRTH_MANSION_LIFE_SEED",
      sourceMansionResultReference: input.mansionResultReference,
      noFourSymbolSubstitution: true,
      noMotherCodeSubstitution: true,
    }),
    fourSymbolField: Object.freeze({
      semanticRole: "FOUR_SYMBOL_MORPHOLOGICAL_FIELD",
      sourceFourSymbolResultReference: input.fourSymbolResultReference,
      noAnimalModelGeneration: true,
      noMotherCodeInference: true,
    }),
    lifeArchetypeForce: Object.freeze({
      semanticRole: "LIFE_ARCHETYPE_FORCE",
      sourceMotherCodeProfileReference: input.motherCodeProfileReference,
      sourceLifeArchetypeProfileReference:
        input.lifeArchetypeProfileReference,
      noFourSymbolGeneration: true,
      noMansionSourceMutation: true,
    }),
    personalStarBeastReference: Object.freeze({
      referenceType: "PERSONAL_STAR_BEAST_IDENTITY_SOURCE",
      referenceId: `personal-star-beast:${input.originCoordinateReference.referenceId}`,
      semanticRole: "MANSION_SEED_FIELD_FORCE_CONVERGENCE",
      notFourSymbolAnimal: true,
      notGeneratedAsset: true,
      notLifeState: true,
    }),
    boundary: Object.freeze({
      independentSourcesBeforeConvergence: true,
      mansionDoesNotInferFourSymbolField: true,
      fourSymbolDoesNotInferLifeArchetypeForce: true,
      motherCodeDoesNotChangeMansionSource: true,
      identitySourceOnly: true,
      noPersonalStarBeastEntityCreation: true,
      noRendererAssetCreation: true,
    }),
  });

const createSource = (
  input: ReadyStarMansionLifeTrajectorySourceFreezeInput,
): StarMansionLifeTrajectorySource =>
  Object.freeze({
    semanticRole: "STAR_MANSION_LIFE_TRAJECTORY_SOURCE",
    trajectoryPath: STAR_MANSION_LIFE_TRAJECTORY_PATH,
    originCoordinateReference: input.originCoordinateReference,
    mansionResultReference: input.mansionResultReference,
    fourSymbolResultReference: input.fourSymbolResultReference,
    motherCodeProfileReference: input.motherCodeProfileReference,
    lifeArchetypeProfileReference: input.lifeArchetypeProfileReference,
    starBeastIdentitySource: createIdentitySource(input),
    boundary: Object.freeze({
      sourceFreezeOnly: true,
      referenceOnly: true,
      presentationTrajectoryNotCalculationDependency: true,
      noJourneyProgression: true,
      noRealityPressureCreation: true,
      noGravityInvocation: true,
      noChoiceOrMigrationExecution: true,
      noCrystalCreation: true,
      noEngineMutation: true,
      noRendererMutation: true,
      noUIIntegration: true,
      noStorageWrite: true,
    }),
  });

export function freezeStarMansionLifeTrajectorySource(
  input: StarMansionLifeTrajectorySourceFreezeInput,
): StarMansionLifeTrajectorySourceFreezeResult {
  const originCoordinate = input.originCoordinateReference;
  if (originCoordinate === null) {
    return unavailable(input, "ORIGIN_COORDINATE_REFERENCE_REQUIRED");
  }
  if (
    originCoordinate.referenceType !==
      "STAR_BEAST_GENESIS_ORIGIN_COORDINATE" ||
    originCoordinate.referenceId.trim().length === 0 ||
    originCoordinate.sourceRole !== "SHARED_TEMPORAL_BIRTH_COORDINATE" ||
    originCoordinate.birthLocationContextOnly !== true ||
    originCoordinate.birthLocationExcludedFromStarBeastDerivation !== true
  ) {
    return blocked(input, "ORIGIN_COORDINATE_REFERENCE_INVALID");
  }

  const mansion = input.mansionResultReference;
  if (mansion === null) {
    return unavailable(input, "MANSION_RESULT_REFERENCE_REQUIRED");
  }
  if (
    mansion.referenceType !==
      "STAR_BEAST_GENESIS_MANSION_ENGINE_RESULT" ||
    mansion.sourceEngine !== "guanyao_starbeast_engine" ||
    mansion.resultReference.status !== "READY"
  ) {
    return blocked(input, "MANSION_ENGINE_REFERENCE_INVALID");
  }

  const fourSymbol = input.fourSymbolResultReference;
  if (fourSymbol === null) {
    return unavailable(input, "FOUR_SYMBOL_RESULT_REFERENCE_REQUIRED");
  }
  if (
    fourSymbol.referenceType !==
      "STAR_BEAST_GENESIS_FOUR_SYMBOL_ENGINE_RESULT" ||
    fourSymbol.sourceEngine !== "guanyao_starbeast_engine" ||
    fourSymbol.resultReference.status !== "READY"
  ) {
    return blocked(input, "FOUR_SYMBOL_ENGINE_REFERENCE_INVALID");
  }
  if (fourSymbol.resultReference !== mansion.resultReference) {
    return blocked(input, "MANSION_FOUR_SYMBOL_SOURCE_MISMATCH");
  }

  const motherCode = input.motherCodeProfileReference;
  if (motherCode === null) {
    return unavailable(input, "MOTHER_CODE_PROFILE_REFERENCE_REQUIRED");
  }
  if (
    motherCode.referenceType !== "STAR_BEAST_GENESIS_MOTHER_CODE_PROFILE" ||
    motherCode.sourceEngine !== "guanyao_lunar_mother_code_landing" ||
    motherCode.profileReference !==
      motherCode.landingResultReference.motherCodeProfile
  ) {
    return blocked(input, "MOTHER_CODE_PROFILE_REFERENCE_INVALID");
  }

  const lifeArchetype = input.lifeArchetypeProfileReference;
  if (lifeArchetype === null) {
    return unavailable(input, "LIFE_ARCHETYPE_PROFILE_REFERENCE_REQUIRED");
  }
  if (
    lifeArchetype.source !== "mother_code_profile" ||
    lifeArchetype.semanticRole !== "ORIGINAL_LIFE_FORCE" ||
    lifeArchetype.notHexagram !== true ||
    lifeArchetype.notPersonalityLabel !== true
  ) {
    return blocked(input, "LIFE_ARCHETYPE_PROFILE_REFERENCE_INVALID");
  }
  if (
    lifeArchetype.sourceMotherCodeId !==
    motherCode.profileReference.motherCodeId
  ) {
    return blocked(input, "MOTHER_CODE_LIFE_ARCHETYPE_SOURCE_MISMATCH");
  }

  const readyInput: ReadyStarMansionLifeTrajectorySourceFreezeInput =
    Object.freeze({
      originCoordinateReference: originCoordinate,
      mansionResultReference: mansion,
      fourSymbolResultReference: fourSymbol,
      motherCodeProfileReference: motherCode,
      lifeArchetypeProfileReference: lifeArchetype,
    });

  return Object.freeze({
    status: "AVAILABLE",
    input,
    source: createSource(readyInput),
  });
}
