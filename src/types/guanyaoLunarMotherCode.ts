import type { BirthCalendarResolutionReady } from "./guanyaoBirthCalendar";
import type {
  ChronoCoordinate,
  EightDivisionFieldMapping,
  MotherCodeDefinition,
  MotherCodeProfile,
} from "./guanyaoCausalEngine";

export type LunarMotherCodeChrono = Readonly<{
  lunarYear: number;
  lunarMonth: number;
  lunarDay: number;
  isLeapMonth: boolean;
  hourBranch: ChronoCoordinate["hourBranch"];
  hourBranchOrdinal: number;
}>;

export type LunarMotherCodeLandingResult = Readonly<{
  status: "READY";
  protocolVersion: "GUANYAO_LUNAR_MOTHER_CODE_V1";
  calculationBasis: "LUNAR_YEAR_MONTH_DAY_PLUS_HOUR_BRANCH_MODULO_8";
  input: ChronoCoordinate;
  calendarResolution: BirthCalendarResolutionReady;
  lunarChrono: LunarMotherCodeChrono;
  fieldSeed: number;
  fieldRemainder: EightDivisionFieldMapping["remainder"];
  fieldMapping: EightDivisionFieldMapping;
  motherCodeDefinition: MotherCodeDefinition;
  motherCodeProfile: MotherCodeProfile;
  starbeastIndependent: true;
  locationIndependent: true;
  formulaLines: readonly string[];
}>;
