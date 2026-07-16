import type { MotherCodeProfile } from "./guanyaoCausalEngine";
import type { LunarMotherCodeLandingResult } from "./guanyaoLunarMotherCode";
import type {
  StarbeastDerivationReady,
  StarbeastDerivationResult,
} from "./guanyaoStarbeast";
import type { StarBeastGenesisOriginCoordinateReference } from "./starBeastGenesisExperience";

export type GenesisManifestationStage =
  | "COSMIC_FIELD"
  | "MANSION_MANIFESTATION"
  | "COORDINATE_RECOGNITION"
  | "FOUR_SYMBOL_MANIFESTATION"
  | "MOTHER_CODE_INFUSION"
  | "STAR_BEAST_REVEAL";

export type GenesisManifestationSequence = readonly [
  "COSMIC_FIELD",
  "MANSION_MANIFESTATION",
  "COORDINATE_RECOGNITION",
  "FOUR_SYMBOL_MANIFESTATION",
  "MOTHER_CODE_INFUSION",
  "STAR_BEAST_REVEAL",
];

export type StarBeastGenesisMansionResultReference = Readonly<{
  referenceType: "STAR_BEAST_GENESIS_MANSION_ENGINE_RESULT";
  sourceEngine: "guanyao_starbeast_engine";
  resultReference: StarbeastDerivationReady;
}>;

export type StarBeastGenesisFourSymbolResultReference = Readonly<{
  referenceType: "STAR_BEAST_GENESIS_FOUR_SYMBOL_ENGINE_RESULT";
  sourceEngine: "guanyao_starbeast_engine";
  resultReference: StarbeastDerivationReady;
}>;

export type StarBeastGenesisMotherCodeProfileReference = Readonly<{
  referenceType: "STAR_BEAST_GENESIS_MOTHER_CODE_PROFILE";
  sourceEngine: "guanyao_lunar_mother_code_landing";
  landingResultReference: LunarMotherCodeLandingResult;
  profileReference: MotherCodeProfile;
}>;

export type StarBeastGenesisIdentityReference = Readonly<{
  referenceType: "STAR_BEAST_IDENTITY";
  referenceId: string;
  sourceRole: "FOUR_SYMBOL_FORM_AND_MOTHER_CODE_FORCE_CONVERGENCE";
}>;

export type StarBeastGenesisSourceIdentity = Readonly<{
  semanticRole: "STAR_BEAST_GENESIS_SOURCE_IDENTITY";
  originCoordinateReference: StarBeastGenesisOriginCoordinateReference;
  mansionResultReference: StarBeastGenesisMansionResultReference;
  fourSymbolResultReference: StarBeastGenesisFourSymbolResultReference;
  motherCodeProfileReference: StarBeastGenesisMotherCodeProfileReference;
  starBeastIdentityReference: StarBeastGenesisIdentityReference;
  manifestationSequence: GenesisManifestationSequence;
  sourceBoundary: Readonly<{
    fourSymbolDeterminesManifestationForm: true;
    motherCodeDeterminesLifeForce: true;
    independentCalculationSources: true;
    convergeAtStarBeastIdentity: true;
    manifestationSequenceOnly: true;
    notCalculationDependency: true;
  }>;
}>;

export type StarBeastGenesisSourceCalibrationInput = Readonly<{
  originCoordinateReference: StarBeastGenesisOriginCoordinateReference | null;
  starbeastDerivationResultReference: StarbeastDerivationResult | null;
  motherCodeLandingResultReference: LunarMotherCodeLandingResult | null;
}>;

export type StarBeastGenesisSourceCalibrationUnavailableReason =
  | "ORIGIN_COORDINATE_REFERENCE_REQUIRED"
  | "STARBEAST_DERIVATION_RESULT_REQUIRED"
  | "MOTHER_CODE_LANDING_RESULT_REQUIRED";

export type StarBeastGenesisSourceCalibrationBlockedReason =
  | "ORIGIN_COORDINATE_REFERENCE_INVALID"
  | "STARBEAST_DERIVATION_NOT_READY"
  | "STARBEAST_ENGINE_SOURCE_INVALID"
  | "MOTHER_CODE_ENGINE_SOURCE_INVALID"
  | "SOURCE_BIRTH_COORDINATE_MISMATCH";

type StarBeastGenesisSourceCalibrationBoundary = Readonly<{
  calibrationOnly: true;
  referenceOnly: true;
  noStarbeastCalculation: true;
  noMotherCodeCalculation: true;
  noIdentitySelection: true;
  noRendererMutation: true;
  noLifeStateMutation: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
}>;

export type StarBeastGenesisSourceCalibrationResult =
  | Readonly<{
      status: "AVAILABLE";
      input: StarBeastGenesisSourceCalibrationInput;
      sourceIdentity: StarBeastGenesisSourceIdentity;
      boundary: StarBeastGenesisSourceCalibrationBoundary;
    }>
  | Readonly<{
      status: "UNAVAILABLE";
      reason: StarBeastGenesisSourceCalibrationUnavailableReason;
      input: StarBeastGenesisSourceCalibrationInput;
      sourceIdentity: null;
      boundary: StarBeastGenesisSourceCalibrationBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      reason: StarBeastGenesisSourceCalibrationBlockedReason;
      input: StarBeastGenesisSourceCalibrationInput;
      sourceIdentity: null;
      boundary: StarBeastGenesisSourceCalibrationBoundary;
    }>;
