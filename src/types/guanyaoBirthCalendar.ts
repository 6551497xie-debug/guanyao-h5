export type GregorianBirthDateInput = Readonly<{
  year: number;
  month: number;
  day: number;
}>;

export type ChineseLunarBirthDate = Readonly<{
  relatedYear: number;
  month: number;
  day: number;
  isLeapMonth: boolean;
}>;

export type BirthCalendarResolutionReady = Readonly<{
  status: "READY";
  protocolVersion: "GUANYAO_BIRTH_CALENDAR_V1";
  calendarSystem: "CHINESE_LUNISOLAR";
  calculationTimeZone: "Asia/Shanghai";
  gregorianBirthDate: string;
  lunarBirthDate: ChineseLunarBirthDate;
}>;

export type BirthCalendarResolutionInvalid = Readonly<{
  status: "INVALID_DATE";
  protocolVersion: "GUANYAO_BIRTH_CALENDAR_V1";
  reason: "INVALID_GREGORIAN_BIRTH_DATE" | "OUTSIDE_SUPPORTED_GREGORIAN_RANGE";
}>;

export type BirthCalendarResolutionUnavailable = Readonly<{
  status: "CALENDAR_UNAVAILABLE";
  protocolVersion: "GUANYAO_BIRTH_CALENDAR_V1";
  reason: "CHINESE_CALENDAR_NOT_SUPPORTED";
}>;

export type BirthCalendarResolution =
  | BirthCalendarResolutionReady
  | BirthCalendarResolutionInvalid
  | BirthCalendarResolutionUnavailable;
