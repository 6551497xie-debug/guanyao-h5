import type {
  ProductionIdentitySourceBirthLocationContextReference,
  ProductionIdentitySourceInputNormalizerBlockedReason,
  ProductionIdentitySourceInputNormalizerBoundary,
  ProductionIdentitySourceInputNormalizerInput,
  ProductionIdentitySourceInputNormalizerResult,
  ProductionIdentitySourceInputNormalizerUnavailableReason,
} from "../types/productionIdentitySourceInputNormalizer";
import type { ChronoCoordinate, HourBranch } from "../types/guanyaoCausalEngine";
import {
  GUANYAO_HOUR_BRANCH_ORDINALS,
} from "./guanyaoLunarTrigramLandingResolver";
import { resolveBirthCalendarFromGregorianDate } from "./guanyaoBirthCalendarService";

const HOUR_BRANCHES: readonly HourBranch[] = [
  "子时",
  "丑时",
  "寅时",
  "卯时",
  "辰时",
  "巳时",
  "午时",
  "未时",
  "申时",
  "酉时",
  "戌时",
  "亥时",
];

const NORMALIZER_BOUNDARY: ProductionIdentitySourceInputNormalizerBoundary =
  Object.freeze({
    implementationOnly: true,
    referenceOnly: true,
    noRawUserDataInResult: true,
    noUserInputBinding: true,
    noProductIntegration: true,
    noUiIntegration: true,
    noRendererIntegration: true,
    noStorageWrite: true,
    noIdentityRecalculation: true,
    noStarBeastCreation: true,
  });

const unavailable = (
  reason: ProductionIdentitySourceInputNormalizerUnavailableReason,
): ProductionIdentitySourceInputNormalizerResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    normalizationStatus: "UNAVAILABLE" as const,
    source: "production_identity_source_input_normalizer" as const,
    reason,
    normalizationReference: null,
    boundary: NORMALIZER_BOUNDARY,
  });

const blocked = (
  reason: ProductionIdentitySourceInputNormalizerBlockedReason,
): ProductionIdentitySourceInputNormalizerResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    normalizationStatus: "BLOCKED" as const,
    source: "production_identity_source_input_normalizer" as const,
    reason,
    normalizationReference: null,
    boundary: NORMALIZER_BOUNDARY,
  });

function resolveHourBranch(localBirthTime: string): HourBranch | null {
  const match = /^(?:[01]\d|2[0-3]):[0-5]\d$/.exec(localBirthTime.trim());
  if (!match) return null;

  const hour = Number(localBirthTime.slice(0, 2));
  const branchIndex = hour === 23 ? 0 : Math.floor((hour + 1) / 2);
  return HOUR_BRANCHES[branchIndex] ?? null;
}

function resolveLocationReference(
  input: ProductionIdentitySourceInputNormalizerInput["birthLocationContext"],
): ProductionIdentitySourceBirthLocationContextReference | null | "INVALID" {
  if (input === undefined || input === null) return null;
  const values = [input.country, input.region, input.city];
  if (
    values.some(
      (value) => value !== null && value !== undefined && typeof value !== "string",
    )
  ) {
    return "INVALID";
  }
  if (values.every((value) => !value || value.trim().length === 0)) {
    return "INVALID";
  }
  return Object.freeze({
    referenceType: "BIRTH_LOCATION_CONTEXT_REFERENCE" as const,
    contextPresent: true as const,
    excludedFromStarBeastDerivation: true as const,
    excludedFromMotherCodeDerivation: true as const,
  });
}

export function normalizeProductionIdentitySourceInput(
  input: ProductionIdentitySourceInputNormalizerInput,
): ProductionIdentitySourceInputNormalizerResult {
  if (input.gregorianBirthDate === null) {
    return unavailable("DATE_REQUIRED");
  }
  if (input.localBirthTime === null || input.localBirthTime.trim().length === 0) {
    return unavailable("TIME_REQUIRED");
  }

  const locationReference = resolveLocationReference(input.birthLocationContext);
  if (locationReference === "INVALID") {
    return blocked("INVALID_LOCATION_CONTEXT");
  }

  const calendarResolution = resolveBirthCalendarFromGregorianDate(
    input.gregorianBirthDate,
  );
  if (calendarResolution.status === "INVALID_DATE") {
    return blocked("INVALID_DATE");
  }
  if (calendarResolution.status === "CALENDAR_UNAVAILABLE") {
    return unavailable("CALENDAR_ENGINE_UNAVAILABLE");
  }

  const hourBranch = resolveHourBranch(input.localBirthTime);
  if (hourBranch === null) {
    return blocked("INVALID_TIME");
  }
  const hourBranchOrdinal = GUANYAO_HOUR_BRANCH_ORDINALS[hourBranch];
  if (!Number.isInteger(hourBranchOrdinal)) {
    return unavailable("HOUR_BRANCH_ENGINE_UNAVAILABLE");
  }

  const normalizedId = `normalized:${calendarResolution.gregorianBirthDate}:${hourBranch}:${locationReference ? "context" : "none"}`;
  return Object.freeze({
    status: "READY" as const,
    normalizationStatus:
      "FORMAL_IDENTITY_SOURCE_NORMALIZATION_READY" as const,
    source: "production_identity_source_input_normalizer" as const,
    normalizationReference: Object.freeze({
      referenceType:
        "FORMAL_IDENTITY_SOURCE_NORMALIZATION_REFERENCE" as const,
      referenceId: normalizedId,
      source: "production_identity_source_input_normalizer" as const,
      gregorianBirthDate: calendarResolution.gregorianBirthDate,
      calendarResolutionReference: calendarResolution,
      lunarBirthDate: calendarResolution.lunarBirthDate,
      hourBranch: hourBranch as ChronoCoordinate["hourBranch"],
      hourBranchOrdinal,
      locationContextReference: locationReference,
      lunarDateIsCanonicalCalculationInput: true as const,
      locationExcludedFromStarBeastDerivation: true as const,
      locationExcludedFromMotherCodeDerivation: true as const,
      normalized: true as const,
      referenceOnly: true as const,
    }),
    boundary: NORMALIZER_BOUNDARY,
  });
}
