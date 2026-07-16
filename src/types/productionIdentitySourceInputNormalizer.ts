import type {
  BirthCalendarResolutionReady,
  ChineseLunarBirthDate,
  GregorianBirthDateInput,
} from "./guanyaoBirthCalendar";
import type { ChronoCoordinate } from "./guanyaoCausalEngine";

export type ProductionIdentitySourceBirthLocationContextInput = Readonly<{
  country?: string | null;
  region?: string | null;
  city?: string | null;
}>;

export type ProductionIdentitySourceInputNormalizerInputShape =
  "GREGORIAN_DATE_TIME_WITH_LOCATION_CONTEXT";

export type ProductionIdentitySourceInputNormalizerInput = Readonly<{
  gregorianBirthDate: GregorianBirthDateInput | null;
  localBirthTime: string | null;
  birthLocationContext?: ProductionIdentitySourceBirthLocationContextInput | null;
}>;

export type ProductionIdentitySourceInputNormalizerUnavailableReason =
  | "DATE_REQUIRED"
  | "TIME_REQUIRED"
  | "CALENDAR_ENGINE_UNAVAILABLE"
  | "HOUR_BRANCH_ENGINE_UNAVAILABLE";

export type ProductionIdentitySourceInputNormalizerBlockedReason =
  | "INVALID_DATE"
  | "INVALID_TIME"
  | "INVALID_LOCATION_CONTEXT";

export type ProductionIdentitySourceBirthLocationContextReference = Readonly<{
  referenceType: "BIRTH_LOCATION_CONTEXT_REFERENCE";
  contextPresent: true;
  excludedFromStarBeastDerivation: true;
  excludedFromMotherCodeDerivation: true;
}>;

export type ProductionIdentitySourceInputNormalizationReference = Readonly<{
  referenceType: "FORMAL_IDENTITY_SOURCE_NORMALIZATION_REFERENCE";
  referenceId: string;
  source: "production_identity_source_input_normalizer";
  gregorianBirthDate: string;
  calendarResolutionReference: BirthCalendarResolutionReady;
  lunarBirthDate: ChineseLunarBirthDate;
  hourBranch: ChronoCoordinate["hourBranch"];
  hourBranchOrdinal: number;
  locationContextReference: ProductionIdentitySourceBirthLocationContextReference | null;
  lunarDateIsCanonicalCalculationInput: true;
  locationExcludedFromStarBeastDerivation: true;
  locationExcludedFromMotherCodeDerivation: true;
  normalized: true;
  referenceOnly: true;
}>;

export type ProductionIdentitySourceInputNormalizerBoundary = Readonly<{
  implementationOnly: true;
  referenceOnly: true;
  noRawUserDataInResult: true;
  noUserInputBinding: true;
  noProductIntegration: true;
  noUiIntegration: true;
  noRendererIntegration: true;
  noStorageWrite: true;
  noIdentityRecalculation: true;
  noStarBeastCreation: true;
}>;

export type ProductionIdentitySourceInputNormalizerReady = Readonly<{
  status: "READY";
  normalizationStatus: "FORMAL_IDENTITY_SOURCE_NORMALIZATION_READY";
  source: "production_identity_source_input_normalizer";
  normalizationReference: ProductionIdentitySourceInputNormalizationReference;
  boundary: ProductionIdentitySourceInputNormalizerBoundary;
}>;

export type ProductionIdentitySourceInputNormalizerUnavailable = Readonly<{
  status: "UNAVAILABLE";
  normalizationStatus: "UNAVAILABLE";
  source: "production_identity_source_input_normalizer";
  reason: ProductionIdentitySourceInputNormalizerUnavailableReason;
  normalizationReference: null;
  boundary: ProductionIdentitySourceInputNormalizerBoundary;
}>;

export type ProductionIdentitySourceInputNormalizerBlocked = Readonly<{
  status: "BLOCKED";
  normalizationStatus: "BLOCKED";
  source: "production_identity_source_input_normalizer";
  reason: ProductionIdentitySourceInputNormalizerBlockedReason;
  normalizationReference: null;
  boundary: ProductionIdentitySourceInputNormalizerBoundary;
}>;

export type ProductionIdentitySourceInputNormalizerResult =
  | ProductionIdentitySourceInputNormalizerReady
  | ProductionIdentitySourceInputNormalizerUnavailable
  | ProductionIdentitySourceInputNormalizerBlocked;
