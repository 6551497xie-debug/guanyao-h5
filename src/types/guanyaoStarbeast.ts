import type {
  ChineseLunarBirthDate,
  GregorianBirthDateInput,
} from "./guanyaoBirthCalendar";

export type TwentyEightMansion =
  | "角"
  | "亢"
  | "氐"
  | "房"
  | "心"
  | "尾"
  | "箕"
  | "斗"
  | "牛"
  | "女"
  | "虚"
  | "危"
  | "室"
  | "壁"
  | "奎"
  | "娄"
  | "胃"
  | "昴"
  | "毕"
  | "觜"
  | "参"
  | "井"
  | "鬼"
  | "柳"
  | "星"
  | "张"
  | "翼"
  | "轸";

export type FourSymbol = "青龙" | "朱雀" | "白虎" | "玄武";

export type FourSymbolDirection = "东" | "南" | "西" | "北";

export type FourSymbolTrigram = "震" | "离" | "兑" | "坎";

export type StarbeastDerivationInput = GregorianBirthDateInput;

export type StarbeastDerivationReady = Readonly<{
  status: "READY";
  protocolVersion: "GUANYAO_LUNAR_MANSION_V1";
  calculationBasis: "GREGORIAN_TO_LUNAR_MONTH_DAY_MANSION";
  gregorianBirthDate: string;
  lunarBirthDate: ChineseLunarBirthDate;
  mansionIndex: number;
  mansion: TwentyEightMansion;
  fourSymbol: FourSymbol;
  direction: FourSymbolDirection;
  symbolicTrigram: FourSymbolTrigram;
  locationIndependent: true;
  birthTimeIndependent: true;
}>;

export type StarbeastDerivationInvalid = Readonly<{
  status: "INVALID_DATE";
  protocolVersion: "GUANYAO_LUNAR_MANSION_V1";
  reason: "INVALID_GREGORIAN_BIRTH_DATE" | "OUTSIDE_SUPPORTED_GREGORIAN_RANGE";
}>;

export type StarbeastDerivationUnavailable = Readonly<{
  status: "CALENDAR_UNAVAILABLE";
  protocolVersion: "GUANYAO_LUNAR_MANSION_V1";
  reason: "CHINESE_CALENDAR_NOT_SUPPORTED";
}>;

export type StarbeastDerivationResult =
  | StarbeastDerivationReady
  | StarbeastDerivationInvalid
  | StarbeastDerivationUnavailable;
