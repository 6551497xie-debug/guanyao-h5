import type {
  XinmaiGenesisBirthSourceDerivationResult,
  XinmaiGenesisBirthSourceRawInput,
} from "../types/xinmaiGenesisBirthSourceDerivation";
import { XINMAI_GENESIS_BIRTH_SOURCE_DERIVATION_RECEIPT_VERSION } from "../types/xinmaiGenesisBirthSourceDerivation";
import { GUANYAO_HOUR_BRANCH_ORDINALS } from "./guanyaoLunarTrigramLandingResolver";
import { resolveBirthCalendarFromGregorianDate } from "./guanyaoBirthCalendarService";
import {
  deriveXinmaiHourBranchFromApproximateRange,
  deriveXinmaiHourBranchFromExactLocalTime,
  createXinmaiBirthSourceReceiptReferenceId,
} from "./xinmaiBirthTimeDerivationService";
import { XINMAI_GENESIS_BIRTH_SOURCE_DERIVATION_POLICY } from "./xinmaiGenesisBirthSourceDerivationPolicy";

export function deriveXinmaiGenesisBirthSource(input: Readonly<{
  rawInput: XinmaiGenesisBirthSourceRawInput;
  inputRevision: number;
}>): XinmaiGenesisBirthSourceDerivationResult {
  if (XINMAI_GENESIS_BIRTH_SOURCE_DERIVATION_POLICY !== "ENABLED") {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      receipt: null,
      reason: "DERIVATION_POLICY_SAFE_WITHHELD" as const,
    });
  }
  const { localCivilGregorianDate, precision } = input.rawInput;
  const calendar = resolveBirthCalendarFromGregorianDate(localCivilGregorianDate);
  if (calendar.status === "INVALID_DATE") {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      receipt: null,
      reason: "INVALID_BIRTH_DATE" as const,
    });
  }
  if (calendar.status !== "READY") {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      receipt: null,
      reason: "CALENDAR_UNAVAILABLE" as const,
    });
  }
  if (precision === "UNKNOWN") {
    return Object.freeze({
      status: "BIRTH_TIME_UNRESOLVED" as const,
      receipt: null,
      reason: "BIRTH_TIME_UNRESOLVED" as const,
    });
  }
  let hourBranch = null;
  let inputEvidence = "";
  if (precision === "EXACT") {
    hourBranch = deriveXinmaiHourBranchFromExactLocalTime(
      input.rawInput.exactLocalTime ?? "",
    );
    inputEvidence = input.rawInput.exactLocalTime ?? "";
    if (hourBranch === null) {
      return Object.freeze({
        status: "SAFE_WITHHELD" as const,
        receipt: null,
        reason: "INVALID_LOCAL_TIME" as const,
      });
    }
  } else {
    const range = deriveXinmaiHourBranchFromApproximateRange(
      input.rawInput.approximateRangeStart ?? "",
      input.rawInput.approximateRangeEnd ?? "",
    );
    if (range.status !== "READY") {
      return Object.freeze({
        status: range.reason === "APPROXIMATE_RANGE_CROSSES_HOUR_BRANCH"
          ? "BIRTH_TIME_UNRESOLVED" as const
          : "SAFE_WITHHELD" as const,
        receipt: null,
        reason: range.reason,
      } as XinmaiGenesisBirthSourceDerivationResult);
    }
    hourBranch = range.hourBranch;
    inputEvidence = `${input.rawInput.approximateRangeStart}-${input.rawInput.approximateRangeEnd}`;
  }
  const receiptReferenceId = createXinmaiBirthSourceReceiptReferenceId({
    gregorianBirthDate: calendar.gregorianBirthDate,
    precision,
    inputEvidence,
    hourBranch,
  });
  return Object.freeze({
    status: "READY" as const,
    reason: null,
    receipt: Object.freeze({
      schemaVersion: XINMAI_GENESIS_BIRTH_SOURCE_DERIVATION_RECEIPT_VERSION,
      receiptReferenceId,
      inputRevision: input.inputRevision,
      rawInput: Object.freeze({
        ...input.rawInput,
        localCivilGregorianDate: Object.freeze({ ...localCivilGregorianDate }),
      }),
      canonicalGregorianBirthDate: calendar.gregorianBirthDate,
      calendarResolution: calendar,
      derivedHourBranch: hourBranch,
      derivedHourBranchOrdinal: GUANYAO_HOUR_BRANCH_ORDINALS[hourBranch],
      rules: Object.freeze({
        timeDerivation: "XINMAI_LOCAL_CIVIL_HOUR_BRANCH_V1" as const,
        ziHour: "23:00_TO_00:59" as const,
        civilDate: "USER_GREGORIAN_DATE_UNCHANGED" as const,
        calendar: "GUANYAO_BIRTH_CALENDAR_V1" as const,
        noBirthplaceOrTimezoneConversion: true as const,
      }),
      authority: Object.freeze({
        rawInputUserConfirmed: true as const,
        branchAndLunarDeterministicallyDerived: true as const,
        immutableReceipt: true as const,
        noDirectDerivedValueWrite: true as const,
      }),
    }),
  });
}

export const XinmaiGenesisBirthSourceDerivationController = Object.freeze({
  derive: deriveXinmaiGenesisBirthSource,
});
