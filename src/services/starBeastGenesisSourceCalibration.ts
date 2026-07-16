import type {
  GenesisManifestationSequence,
  StarBeastGenesisSourceCalibrationBlockedReason,
  StarBeastGenesisSourceCalibrationInput,
  StarBeastGenesisSourceCalibrationResult,
  StarBeastGenesisSourceCalibrationUnavailableReason,
  StarBeastGenesisSourceIdentity,
} from "../types/starBeastGenesisSourceIdentity";

export const STAR_BEAST_GENESIS_MANIFESTATION_SEQUENCE: GenesisManifestationSequence =
  Object.freeze([
    "COSMIC_FIELD",
    "MANSION_MANIFESTATION",
    "COORDINATE_RECOGNITION",
    "FOUR_SYMBOL_MANIFESTATION",
    "MOTHER_CODE_INFUSION",
    "STAR_BEAST_REVEAL",
  ]);

const CALIBRATION_BOUNDARY = Object.freeze({
  calibrationOnly: true,
  referenceOnly: true,
  noStarbeastCalculation: true,
  noMotherCodeCalculation: true,
  noIdentitySelection: true,
  noRendererMutation: true,
  noLifeStateMutation: true,
  noRuntimeIntegration: true,
  noStorageWrite: true,
});

const unavailable = (
  input: StarBeastGenesisSourceCalibrationInput,
  reason: StarBeastGenesisSourceCalibrationUnavailableReason,
): StarBeastGenesisSourceCalibrationResult =>
  Object.freeze({
    status: "UNAVAILABLE",
    reason,
    input,
    sourceIdentity: null,
    boundary: CALIBRATION_BOUNDARY,
  });

const blocked = (
  input: StarBeastGenesisSourceCalibrationInput,
  reason: StarBeastGenesisSourceCalibrationBlockedReason,
): StarBeastGenesisSourceCalibrationResult =>
  Object.freeze({
    status: "BLOCKED",
    reason,
    input,
    sourceIdentity: null,
    boundary: CALIBRATION_BOUNDARY,
  });

const formatGregorianBirthDate = (
  input: Readonly<{ year: number; month: number; day: number }>,
): string =>
  `${String(input.year).padStart(4, "0")}-${String(input.month).padStart(2, "0")}-${String(input.day).padStart(2, "0")}`;

const sameLunarBirthDate = (
  left: Readonly<{
    relatedYear: number;
    month: number;
    day: number;
    isLeapMonth: boolean;
  }>,
  right: Readonly<{
    relatedYear: number;
    month: number;
    day: number;
    isLeapMonth: boolean;
  }>,
): boolean =>
  left.relatedYear === right.relatedYear &&
  left.month === right.month &&
  left.day === right.day &&
  left.isLeapMonth === right.isLeapMonth;

const createSourceIdentity = (
  input: StarBeastGenesisSourceCalibrationInput & {
    originCoordinateReference: NonNullable<
      StarBeastGenesisSourceCalibrationInput["originCoordinateReference"]
    >;
    starbeastDerivationResultReference: Extract<
      NonNullable<
        StarBeastGenesisSourceCalibrationInput["starbeastDerivationResultReference"]
      >,
      { status: "READY" }
    >;
    motherCodeLandingResultReference: NonNullable<
      StarBeastGenesisSourceCalibrationInput["motherCodeLandingResultReference"]
    >;
  },
): StarBeastGenesisSourceIdentity => {
  const starbeastResult = input.starbeastDerivationResultReference;
  const motherCodeLanding = input.motherCodeLandingResultReference;

  const mansionResultReference = Object.freeze({
    referenceType: "STAR_BEAST_GENESIS_MANSION_ENGINE_RESULT" as const,
    sourceEngine: "guanyao_starbeast_engine" as const,
    resultReference: starbeastResult,
  });
  const fourSymbolResultReference = Object.freeze({
    referenceType: "STAR_BEAST_GENESIS_FOUR_SYMBOL_ENGINE_RESULT" as const,
    sourceEngine: "guanyao_starbeast_engine" as const,
    resultReference: starbeastResult,
  });
  const motherCodeProfileReference = Object.freeze({
    referenceType: "STAR_BEAST_GENESIS_MOTHER_CODE_PROFILE" as const,
    sourceEngine: "guanyao_lunar_mother_code_landing" as const,
    landingResultReference: motherCodeLanding,
    profileReference: motherCodeLanding.motherCodeProfile,
  });

  return Object.freeze({
    semanticRole: "STAR_BEAST_GENESIS_SOURCE_IDENTITY",
    originCoordinateReference: input.originCoordinateReference,
    mansionResultReference,
    fourSymbolResultReference,
    motherCodeProfileReference,
    starBeastIdentityReference: Object.freeze({
      referenceType: "STAR_BEAST_IDENTITY",
      referenceId: `genesis:${starbeastResult.gregorianBirthDate}:${motherCodeLanding.motherCodeProfile.motherCodeId}`,
      sourceRole: "FOUR_SYMBOL_FORM_AND_MOTHER_CODE_FORCE_CONVERGENCE",
    }),
    manifestationSequence: STAR_BEAST_GENESIS_MANIFESTATION_SEQUENCE,
    sourceBoundary: Object.freeze({
      fourSymbolDeterminesManifestationForm: true,
      motherCodeDeterminesLifeForce: true,
      independentCalculationSources: true,
      convergeAtStarBeastIdentity: true,
      manifestationSequenceOnly: true,
      notCalculationDependency: true,
    }),
  });
};

export function calibrateStarBeastGenesisSource(
  input: StarBeastGenesisSourceCalibrationInput,
): StarBeastGenesisSourceCalibrationResult {
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

  const starbeastResult = input.starbeastDerivationResultReference;
  if (starbeastResult === null) {
    return unavailable(input, "STARBEAST_DERIVATION_RESULT_REQUIRED");
  }
  if (starbeastResult.status !== "READY") {
    return blocked(input, "STARBEAST_DERIVATION_NOT_READY");
  }
  if (
    starbeastResult.protocolVersion !== "GUANYAO_LUNAR_MANSION_V1" ||
    starbeastResult.calculationBasis !==
      "GREGORIAN_TO_LUNAR_MONTH_DAY_MANSION" ||
    starbeastResult.locationIndependent !== true ||
    starbeastResult.birthTimeIndependent !== true
  ) {
    return blocked(input, "STARBEAST_ENGINE_SOURCE_INVALID");
  }

  const motherCodeLanding = input.motherCodeLandingResultReference;
  if (motherCodeLanding === null) {
    return unavailable(input, "MOTHER_CODE_LANDING_RESULT_REQUIRED");
  }
  if (
    motherCodeLanding.protocolVersion !==
      "GUANYAO_LUNAR_TRIGRAM_LANDING_V1" ||
    motherCodeLanding.calculationBasis !==
      "LUNAR_YEAR_MONTH_DAY_PLUS_HOUR_BRANCH_MODULO_8" ||
    motherCodeLanding.trigramSourceScope !== "LUNAR_CHRONO_ONLY" ||
    motherCodeLanding.trigramIndependentOfStarbeast !== true ||
    motherCodeLanding.trigramIndependentOfLocation !== true ||
    motherCodeLanding.motherCodeProfile.lowerTrigram !==
      motherCodeLanding.fieldMapping.trigram ||
    motherCodeLanding.trigramLanding.fieldMapping !==
      motherCodeLanding.fieldMapping ||
    motherCodeLanding.trigramLanding.input !== motherCodeLanding.input
  ) {
    return blocked(input, "MOTHER_CODE_ENGINE_SOURCE_INVALID");
  }

  const motherGregorianDate = formatGregorianBirthDate(
    motherCodeLanding.input,
  );
  if (
    starbeastResult.gregorianBirthDate !== motherGregorianDate ||
    !sameLunarBirthDate(
      starbeastResult.lunarBirthDate,
      motherCodeLanding.calendarResolution.lunarBirthDate,
    )
  ) {
    return blocked(input, "SOURCE_BIRTH_COORDINATE_MISMATCH");
  }

  const calibratedInput = Object.freeze({
    ...input,
    originCoordinateReference: originCoordinate,
    starbeastDerivationResultReference: starbeastResult,
    motherCodeLandingResultReference: motherCodeLanding,
  });

  return Object.freeze({
    status: "AVAILABLE",
    input,
    sourceIdentity: createSourceIdentity(calibratedInput),
    boundary: CALIBRATION_BOUNDARY,
  });
}
