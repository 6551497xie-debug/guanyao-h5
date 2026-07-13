import type { BirthCalendarResolutionReady } from "./guanyaoBirthCalendar";
import type { ChronoCoordinate, EightDivisionFieldMapping } from "./guanyaoCausalEngine";

export type LunarTrigramChrono = Readonly<{
  lunarYear: number;
  lunarMonth: number;
  lunarDay: number;
  isLeapMonth: boolean;
  hourBranch: ChronoCoordinate["hourBranch"];
  hourBranchOrdinal: number;
}>;

export type LunarTrigramLandingResult = Readonly<{
  status: "READY";
  protocolVersion: "GUANYAO_LUNAR_TRIGRAM_LANDING_V1";
  calculationBasis: "LUNAR_YEAR_MONTH_DAY_PLUS_HOUR_BRANCH_MODULO_8";
  trigramSourceScope: "LUNAR_CHRONO_ONLY";
  input: ChronoCoordinate;
  calendarResolution: BirthCalendarResolutionReady;
  lunarChrono: LunarTrigramChrono;
  fieldSeed: number;
  fieldRemainder: EightDivisionFieldMapping["remainder"];
  fieldMapping: EightDivisionFieldMapping;
  trigramIndependentOfStarbeast: true;
  trigramIndependentOfLocation: true;
  formulaLines: readonly string[];
}>;
