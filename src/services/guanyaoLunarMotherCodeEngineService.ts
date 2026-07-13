import { getEightDivisionFieldMapping } from "../data/guanyaoNumericProtocol";
import {
  getMotherCodeDefinitionByTrigram,
  toMotherCodeProfile,
} from "../data/guanyaoMotherCodeRegistry";
import type { ChronoCoordinate } from "../types/guanyaoCausalEngine";
import type { LunarMotherCodeLandingResult } from "../types/guanyaoLunarMotherCode";
import { resolveBirthCalendarFromGregorianDate } from "./guanyaoBirthCalendarService";

export const GUANYAO_LUNAR_MOTHER_CODE_PROTOCOL_VERSION = "GUANYAO_LUNAR_MOTHER_CODE_V1" as const;

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

export function runMotherCodeLandingEngine(
  input: ChronoCoordinate,
): LunarMotherCodeLandingResult {
  const calendarResolution = resolveBirthCalendarFromGregorianDate({
    year: input.year,
    month: input.month,
    day: input.day,
  });

  if (calendarResolution.status !== "READY") {
    throw new Error(`MOTHER_CODE_CALENDAR_NOT_READY:${calendarResolution.reason}`);
  }

  const { relatedYear, month, day, isLeapMonth } = calendarResolution.lunarBirthDate;
  const hourBranchOrdinal = GUANYAO_HOUR_BRANCH_ORDINALS[input.hourBranch];
  const fieldSeed = relatedYear + month + day + hourBranchOrdinal;
  const fieldMapping = getEightDivisionFieldMapping(fieldSeed);
  const motherCodeDefinition = getMotherCodeDefinitionByTrigram(fieldMapping.trigram);

  if (!motherCodeDefinition) {
    throw new Error(`Missing mother code definition for trigram ${fieldMapping.trigram}`);
  }

  return {
    status: "READY",
    protocolVersion: GUANYAO_LUNAR_MOTHER_CODE_PROTOCOL_VERSION,
    calculationBasis: "LUNAR_YEAR_MONTH_DAY_PLUS_HOUR_BRANCH_MODULO_8",
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
    motherCodeDefinition,
    motherCodeProfile: toMotherCodeProfile(motherCodeDefinition),
    starbeastIndependent: true,
    locationIndependent: true,
    formulaLines: [
      "公历出生日期 → 中国农历年月日",
      `农历时序和：${relatedYear} + ${month} + ${day} + ${hourBranchOrdinal} = ${fieldSeed}`,
      "卦以八除",
      `${fieldSeed} mod 8 = ${fieldMapping.display}`,
      `先天八卦落点：${fieldMapping.trigram}${fieldMapping.trigramSymbol}`,
      "输出 MotherCodeProfile",
    ],
  };
}

export const GuanyaoLunarMotherCodeEngineService = {
  runMotherCodeLandingEngine,
} as const;
