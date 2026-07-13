import { getEightDivisionFieldMapping } from "../data/guanyaoNumericProtocol";
import type { ChronoCoordinate } from "../types/guanyaoCausalEngine";
import type { LunarTrigramLandingResult } from "../types/guanyaoLunarTrigramLanding";
import { resolveBirthCalendarFromGregorianDate } from "./guanyaoBirthCalendarService";

export const GUANYAO_LUNAR_TRIGRAM_LANDING_PROTOCOL_VERSION =
  "GUANYAO_LUNAR_TRIGRAM_LANDING_V1" as const;

export const GUANYAO_HOUR_BRANCH_ORDINALS: Readonly<Record<ChronoCoordinate["hourBranch"], number>> = {
  子时: 1,
  丑时: 2,
  寅时: 3,
  卯时: 4,
  辰时: 5,
  巳时: 6,
  午时: 7,
  未时: 8,
  申时: 9,
  酉时: 10,
  戌时: 11,
  亥时: 12,
};

export function resolveLunarTrigramLanding(
  input: ChronoCoordinate,
): LunarTrigramLandingResult {
  const calendarResolution = resolveBirthCalendarFromGregorianDate({
    year: input.year,
    month: input.month,
    day: input.day,
  });

  if (calendarResolution.status !== "READY") {
    throw new Error(`LUNAR_TRIGRAM_CALENDAR_NOT_READY:${calendarResolution.reason}`);
  }

  const { relatedYear, month, day, isLeapMonth } = calendarResolution.lunarBirthDate;
  const hourBranchOrdinal = GUANYAO_HOUR_BRANCH_ORDINALS[input.hourBranch];
  const fieldSeed = relatedYear + month + day + hourBranchOrdinal;
  const fieldMapping = getEightDivisionFieldMapping(fieldSeed);

  return {
    status: "READY",
    protocolVersion: GUANYAO_LUNAR_TRIGRAM_LANDING_PROTOCOL_VERSION,
    calculationBasis: "LUNAR_YEAR_MONTH_DAY_PLUS_HOUR_BRANCH_MODULO_8",
    trigramSourceScope: "LUNAR_CHRONO_ONLY",
    input,
    calendarResolution,
    lunarChrono: {
      lunarYear: relatedYear,
      lunarMonth: month,
      lunarDay: day,
      isLeapMonth,
      hourBranch: input.hourBranch,
      hourBranchOrdinal,
    },
    fieldSeed,
    fieldRemainder: fieldMapping.remainder,
    fieldMapping,
    trigramIndependentOfStarbeast: true,
    trigramIndependentOfLocation: true,
    formulaLines: [
      "公历出生日期 → 中国农历年月日",
      `农历时序和：${relatedYear} + ${month} + ${day} + ${hourBranchOrdinal} = ${fieldSeed}`,
      "卦以八除",
      `${fieldSeed} mod 8 = ${fieldMapping.display}`,
      `先天八卦落点：${fieldMapping.trigram}${fieldMapping.trigramSymbol}`,
    ],
  };
}

export const GuanyaoLunarTrigramLandingResolver = {
  resolveLunarTrigramLanding,
} as const;
