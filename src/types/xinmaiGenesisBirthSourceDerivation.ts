import type { BirthCalendarResolutionReady } from "./guanyaoBirthCalendar";
import type { HourBranch } from "./guanyaoCausalEngine";

export const XINMAI_GENESIS_BIRTH_SOURCE_DERIVATION_RECEIPT_VERSION =
  "XINMAI_GENESIS_BIRTH_SOURCE_DERIVATION_RECEIPT_V1" as const;

export type XinmaiGenesisBirthTimePrecision =
  | "EXACT"
  | "APPROXIMATE_RANGE"
  | "UNKNOWN";

export type XinmaiGenesisBirthSourceRawInput = Readonly<{
  localCivilGregorianDate: Readonly<{
    year: number;
    month: number;
    day: number;
  }>;
  precision: XinmaiGenesisBirthTimePrecision;
  exactLocalTime: string | null;
  approximateRangeStart: string | null;
  approximateRangeEnd: string | null;
  localityPolicy: "LOCAL_CIVIL_TIME_AS_RECORDED_NO_CONVERSION";
}>;

export type XinmaiGenesisBirthSourceDerivationReceipt = Readonly<{
  schemaVersion: typeof XINMAI_GENESIS_BIRTH_SOURCE_DERIVATION_RECEIPT_VERSION;
  receiptReferenceId: string;
  inputRevision: number;
  rawInput: XinmaiGenesisBirthSourceRawInput;
  canonicalGregorianBirthDate: string;
  calendarResolution: BirthCalendarResolutionReady;
  derivedHourBranch: HourBranch;
  derivedHourBranchOrdinal: number;
  rules: Readonly<{
    timeDerivation: "XINMAI_LOCAL_CIVIL_HOUR_BRANCH_V1";
    ziHour: "23:00_TO_00:59";
    civilDate: "USER_GREGORIAN_DATE_UNCHANGED";
    calendar: "GUANYAO_BIRTH_CALENDAR_V1";
    noBirthplaceOrTimezoneConversion: true;
  }>;
  authority: Readonly<{
    rawInputUserConfirmed: true;
    branchAndLunarDeterministicallyDerived: true;
    immutableReceipt: true;
    noDirectDerivedValueWrite: true;
  }>;
}>;

export type XinmaiGenesisBirthSourceDerivationFailureReason =
  | "BIRTH_DATE_REQUIRED"
  | "INVALID_BIRTH_DATE"
  | "BIRTH_TIME_UNRESOLVED"
  | "INVALID_LOCAL_TIME"
  | "APPROXIMATE_RANGE_CROSSES_HOUR_BRANCH"
  | "CALENDAR_UNAVAILABLE"
  | "DERIVATION_POLICY_SAFE_WITHHELD";

export type XinmaiGenesisBirthSourceDerivationResult =
  | Readonly<{
      status: "READY";
      receipt: XinmaiGenesisBirthSourceDerivationReceipt;
      reason: null;
    }>
  | Readonly<{
      status: "BIRTH_TIME_UNRESOLVED";
      receipt: null;
      reason:
        | "BIRTH_TIME_UNRESOLVED"
        | "APPROXIMATE_RANGE_CROSSES_HOUR_BRANCH";
    }>
  | Readonly<{
      status: "SAFE_WITHHELD";
      receipt: null;
      reason: Exclude<
        XinmaiGenesisBirthSourceDerivationFailureReason,
        "BIRTH_TIME_UNRESOLVED" | "APPROXIMATE_RANGE_CROSSES_HOUR_BRANCH"
      >;
    }>;

export type XinmaiGenesisBirthInputDraftAsset = Readonly<{
  schemaVersion: "XINMAI_GENESIS_BIRTH_INPUT_DRAFT_V1";
  date: Readonly<{
    year: number | null;
    month: number | null;
    day: number | null;
  }>;
  precision: XinmaiGenesisBirthTimePrecision;
  exactLocalTime: string;
  approximateRangeStart: string;
  approximateRangeEnd: string;
  nonAuthoritativeDraft: true;
  cannotFormIdentity: true;
}>;
