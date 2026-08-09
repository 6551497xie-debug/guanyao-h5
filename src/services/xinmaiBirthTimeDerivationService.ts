import type { HourBranch } from "../types/guanyaoCausalEngine";

export const XINMAI_LOCAL_CIVIL_HOUR_BRANCHES = Object.freeze([
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
] as const satisfies readonly HourBranch[]);

const LOCAL_TIME_PATTERN = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

export const parseXinmaiLocalCivilTime = (value: string): number | null => {
  const normalized = value.trim();
  if (!LOCAL_TIME_PATTERN.test(normalized)) return null;
  const [hour, minute] = normalized.split(":").map(Number);
  return hour * 60 + minute;
};

export const deriveXinmaiHourBranchFromCivilMinute = (
  minuteOfDay: number,
): HourBranch | null => {
  if (!Number.isInteger(minuteOfDay) || minuteOfDay < 0 || minuteOfDay >= 1440) {
    return null;
  }
  const hour = Math.floor(minuteOfDay / 60);
  const branchIndex = hour === 23 ? 0 : Math.floor((hour + 1) / 2);
  return XINMAI_LOCAL_CIVIL_HOUR_BRANCHES[branchIndex] ?? null;
};

export const deriveXinmaiHourBranchFromExactLocalTime = (
  value: string,
): HourBranch | null => {
  const minute = parseXinmaiLocalCivilTime(value);
  return minute === null ? null : deriveXinmaiHourBranchFromCivilMinute(minute);
};

export const createXinmaiBirthSourceReceiptReferenceId = (input: Readonly<{
  gregorianBirthDate: string;
  precision: "EXACT" | "APPROXIMATE_RANGE";
  inputEvidence: string;
  hourBranch: HourBranch;
}>): string =>
  [
    "birth-source-receipt:v1",
    input.gregorianBirthDate,
    input.precision,
    encodeURIComponent(input.inputEvidence).replace(/%/g, "_"),
    input.hourBranch,
  ].join(":");

export type XinmaiApproximateRangeHourBranchResult =
  | Readonly<{ status: "READY"; hourBranch: HourBranch }>
  | Readonly<{
      status: "UNRESOLVED";
      reason: "INVALID_LOCAL_TIME" | "APPROXIMATE_RANGE_CROSSES_HOUR_BRANCH";
    }>;

export const deriveXinmaiHourBranchFromApproximateRange = (
  start: string,
  end: string,
): XinmaiApproximateRangeHourBranchResult => {
  const startMinute = parseXinmaiLocalCivilTime(start);
  const endMinute = parseXinmaiLocalCivilTime(end);
  if (startMinute === null || endMinute === null) {
    return Object.freeze({
      status: "UNRESOLVED" as const,
      reason: "INVALID_LOCAL_TIME" as const,
    });
  }
  const duration = endMinute >= startMinute
    ? endMinute - startMinute
    : endMinute + 1440 - startMinute;
  const branches = new Set<HourBranch>();
  for (let offset = 0; offset <= duration; offset += 1) {
    const branch = deriveXinmaiHourBranchFromCivilMinute(
      (startMinute + offset) % 1440,
    );
    if (branch !== null) branches.add(branch);
    if (branches.size > 1) break;
  }
  if (branches.size !== 1) {
    return Object.freeze({
      status: "UNRESOLVED" as const,
      reason: "APPROXIMATE_RANGE_CROSSES_HOUR_BRANCH" as const,
    });
  }
  return Object.freeze({
    status: "READY" as const,
    hourBranch: [...branches][0],
  });
};
