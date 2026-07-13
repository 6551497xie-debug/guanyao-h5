import { resolveBirthCalendarFromGregorianDate } from "./guanyaoBirthCalendarService";
import type { ChineseLunarBirthDate } from "../types/guanyaoBirthCalendar";
import type {
  FourSymbol,
  FourSymbolDirection,
  FourSymbolTrigram,
  StarbeastDerivationInput,
  StarbeastDerivationResult,
  TwentyEightMansion,
} from "../types/guanyaoStarbeast";

export const GUANYAO_LUNAR_MANSION_PROTOCOL_VERSION = "GUANYAO_LUNAR_MANSION_V1" as const;

export const GUANYAO_TWENTY_EIGHT_MANSIONS = [
  "角",
  "亢",
  "氐",
  "房",
  "心",
  "尾",
  "箕",
  "斗",
  "牛",
  "女",
  "虚",
  "危",
  "室",
  "壁",
  "奎",
  "娄",
  "胃",
  "昴",
  "毕",
  "觜",
  "参",
  "井",
  "鬼",
  "柳",
  "星",
  "张",
  "翼",
  "轸",
] as const satisfies readonly TwentyEightMansion[];

export const GUANYAO_LUNAR_MONTH_START_MANSIONS = [
  "室",
  "奎",
  "胃",
  "毕",
  "参",
  "鬼",
  "张",
  "角",
  "氐",
  "心",
  "斗",
  "虚",
] as const satisfies readonly TwentyEightMansion[];

type FourSymbolProfile = Readonly<{
  fourSymbol: FourSymbol;
  direction: FourSymbolDirection;
  symbolicTrigram: FourSymbolTrigram;
}>;

const FOUR_SYMBOL_PROFILE_BY_MANSION: Readonly<Record<TwentyEightMansion, FourSymbolProfile>> = {
  角: { fourSymbol: "青龙", direction: "东", symbolicTrigram: "震" },
  亢: { fourSymbol: "青龙", direction: "东", symbolicTrigram: "震" },
  氐: { fourSymbol: "青龙", direction: "东", symbolicTrigram: "震" },
  房: { fourSymbol: "青龙", direction: "东", symbolicTrigram: "震" },
  心: { fourSymbol: "青龙", direction: "东", symbolicTrigram: "震" },
  尾: { fourSymbol: "青龙", direction: "东", symbolicTrigram: "震" },
  箕: { fourSymbol: "青龙", direction: "东", symbolicTrigram: "震" },
  斗: { fourSymbol: "玄武", direction: "北", symbolicTrigram: "坎" },
  牛: { fourSymbol: "玄武", direction: "北", symbolicTrigram: "坎" },
  女: { fourSymbol: "玄武", direction: "北", symbolicTrigram: "坎" },
  虚: { fourSymbol: "玄武", direction: "北", symbolicTrigram: "坎" },
  危: { fourSymbol: "玄武", direction: "北", symbolicTrigram: "坎" },
  室: { fourSymbol: "玄武", direction: "北", symbolicTrigram: "坎" },
  壁: { fourSymbol: "玄武", direction: "北", symbolicTrigram: "坎" },
  奎: { fourSymbol: "白虎", direction: "西", symbolicTrigram: "兑" },
  娄: { fourSymbol: "白虎", direction: "西", symbolicTrigram: "兑" },
  胃: { fourSymbol: "白虎", direction: "西", symbolicTrigram: "兑" },
  昴: { fourSymbol: "白虎", direction: "西", symbolicTrigram: "兑" },
  毕: { fourSymbol: "白虎", direction: "西", symbolicTrigram: "兑" },
  觜: { fourSymbol: "白虎", direction: "西", symbolicTrigram: "兑" },
  参: { fourSymbol: "白虎", direction: "西", symbolicTrigram: "兑" },
  井: { fourSymbol: "朱雀", direction: "南", symbolicTrigram: "离" },
  鬼: { fourSymbol: "朱雀", direction: "南", symbolicTrigram: "离" },
  柳: { fourSymbol: "朱雀", direction: "南", symbolicTrigram: "离" },
  星: { fourSymbol: "朱雀", direction: "南", symbolicTrigram: "离" },
  张: { fourSymbol: "朱雀", direction: "南", symbolicTrigram: "离" },
  翼: { fourSymbol: "朱雀", direction: "南", symbolicTrigram: "离" },
  轸: { fourSymbol: "朱雀", direction: "南", symbolicTrigram: "离" },
};

const positiveModulo = (value: number, modulo: number): number => ((value % modulo) + modulo) % modulo;

function resolveMansionFromLunarBirthDate(lunarBirthDate: ChineseLunarBirthDate): TwentyEightMansion {
  const monthStartMansion = GUANYAO_LUNAR_MONTH_START_MANSIONS[lunarBirthDate.month - 1];
  const monthStartIndex = GUANYAO_TWENTY_EIGHT_MANSIONS.indexOf(monthStartMansion);
  const mansionIndex = positiveModulo(monthStartIndex + lunarBirthDate.day - 1, GUANYAO_TWENTY_EIGHT_MANSIONS.length);
  return GUANYAO_TWENTY_EIGHT_MANSIONS[mansionIndex];
}

export function resolveStarbeastFromBirthDate(
  input: StarbeastDerivationInput,
): StarbeastDerivationResult {
  const calendarResolution = resolveBirthCalendarFromGregorianDate(input);
  if (calendarResolution.status === "INVALID_DATE") {
    return {
      status: "INVALID_DATE",
      protocolVersion: GUANYAO_LUNAR_MANSION_PROTOCOL_VERSION,
      reason: calendarResolution.reason,
    };
  }

  if (calendarResolution.status === "CALENDAR_UNAVAILABLE") {
    return {
      status: "CALENDAR_UNAVAILABLE",
      protocolVersion: GUANYAO_LUNAR_MANSION_PROTOCOL_VERSION,
      reason: calendarResolution.reason,
    };
  }

  const { gregorianBirthDate, lunarBirthDate } = calendarResolution;
  const mansion = resolveMansionFromLunarBirthDate(lunarBirthDate);
  const mansionIndex = GUANYAO_TWENTY_EIGHT_MANSIONS.indexOf(mansion);
  const profile = FOUR_SYMBOL_PROFILE_BY_MANSION[mansion];

  return {
    status: "READY",
    protocolVersion: GUANYAO_LUNAR_MANSION_PROTOCOL_VERSION,
    calculationBasis: "GREGORIAN_TO_LUNAR_MONTH_DAY_MANSION",
    gregorianBirthDate,
    lunarBirthDate,
    mansionIndex,
    mansion,
    fourSymbol: profile.fourSymbol,
    direction: profile.direction,
    symbolicTrigram: profile.symbolicTrigram,
    locationIndependent: true,
    birthTimeIndependent: true,
  };
}

export const GuanyaoStarbeastEngineService = {
  resolveStarbeastFromBirthDate,
} as const;
