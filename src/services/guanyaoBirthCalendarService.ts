import type {
  BirthCalendarResolution,
  ChineseLunarBirthDate,
  GregorianBirthDateInput,
} from "../types/guanyaoBirthCalendar";

export const GUANYAO_BIRTH_CALENDAR_PROTOCOL_VERSION = "GUANYAO_BIRTH_CALENDAR_V1" as const;
export const GUANYAO_BIRTH_CALENDAR_TIME_ZONE = "Asia/Shanghai" as const;
export const GUANYAO_BIRTH_CALENDAR_GREGORIAN_RANGE = Object.freeze({ minimum: 1901, maximum: 2100 });

const chineseCalendarLocale = "en-u-ca-chinese";

function toValidatedGregorianDate(input: GregorianBirthDateInput): Date | null {
  if (![input.year, input.month, input.day].every(Number.isInteger)) return null;
  if (input.month < 1 || input.month > 12 || input.day < 1 || input.day > 31) return null;

  const date = new Date(0);
  date.setUTCHours(12, 0, 0, 0);
  date.setUTCFullYear(input.year, input.month - 1, input.day);

  if (
    date.getUTCFullYear() !== input.year ||
    date.getUTCMonth() !== input.month - 1 ||
    date.getUTCDate() !== input.day
  ) {
    return null;
  }

  return date;
}

function resolveChineseCalendarFormatter(): Intl.DateTimeFormat | null {
  try {
    const formatter = new Intl.DateTimeFormat(chineseCalendarLocale, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      timeZone: GUANYAO_BIRTH_CALENDAR_TIME_ZONE,
    });
    return formatter.resolvedOptions().calendar === "chinese" ? formatter : null;
  } catch {
    return null;
  }
}

function convertGregorianToChineseLunarDate(
  date: Date,
  formatter: Intl.DateTimeFormat,
): ChineseLunarBirthDate | null {
  const parts = formatter.formatToParts(date);
  const readPart = (partType: string): string | undefined =>
    parts.find((part) => String(part.type) === partType)?.value;
  const relatedYearPart = readPart("relatedYear");
  const monthPart = readPart("month");
  const dayPart = readPart("day");
  const monthMatch = monthPart?.match(/^(\d+)(bis)?$/);

  if (!relatedYearPart || !monthMatch || !dayPart) return null;

  const lunarDate = {
    relatedYear: Number(relatedYearPart),
    month: Number(monthMatch[1]),
    day: Number(dayPart),
    isLeapMonth: monthMatch[2] === "bis",
  };

  if (
    !Number.isInteger(lunarDate.relatedYear) ||
    lunarDate.month < 1 ||
    lunarDate.month > 12 ||
    lunarDate.day < 1 ||
    lunarDate.day > 30
  ) {
    return null;
  }

  return lunarDate;
}

const padDateUnit = (value: number): string => String(value).padStart(2, "0");

export function resolveBirthCalendarFromGregorianDate(
  input: GregorianBirthDateInput,
): BirthCalendarResolution {
  const gregorianDate = toValidatedGregorianDate(input);
  if (!gregorianDate) {
    return {
      status: "INVALID_DATE",
      protocolVersion: GUANYAO_BIRTH_CALENDAR_PROTOCOL_VERSION,
      reason: "INVALID_GREGORIAN_BIRTH_DATE",
    };
  }

  if (
    input.year < GUANYAO_BIRTH_CALENDAR_GREGORIAN_RANGE.minimum ||
    input.year > GUANYAO_BIRTH_CALENDAR_GREGORIAN_RANGE.maximum
  ) {
    return {
      status: "INVALID_DATE",
      protocolVersion: GUANYAO_BIRTH_CALENDAR_PROTOCOL_VERSION,
      reason: "OUTSIDE_SUPPORTED_GREGORIAN_RANGE",
    };
  }

  const formatter = resolveChineseCalendarFormatter();
  const lunarBirthDate = formatter
    ? convertGregorianToChineseLunarDate(gregorianDate, formatter)
    : null;

  if (!lunarBirthDate) {
    return {
      status: "CALENDAR_UNAVAILABLE",
      protocolVersion: GUANYAO_BIRTH_CALENDAR_PROTOCOL_VERSION,
      reason: "CHINESE_CALENDAR_NOT_SUPPORTED",
    };
  }

  return {
    status: "READY",
    protocolVersion: GUANYAO_BIRTH_CALENDAR_PROTOCOL_VERSION,
    calendarSystem: "CHINESE_LUNISOLAR",
    calculationTimeZone: GUANYAO_BIRTH_CALENDAR_TIME_ZONE,
    gregorianBirthDate: `${input.year}-${padDateUnit(input.month)}-${padDateUnit(input.day)}`,
    lunarBirthDate,
  };
}

export const GuanyaoBirthCalendarService = {
  resolveBirthCalendarFromGregorianDate,
} as const;
