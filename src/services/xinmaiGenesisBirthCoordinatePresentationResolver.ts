import type {
  XinmaiGenesisBirthCoordinateAdmissionFailureReason,
  XinmaiGenesisBirthCoordinateDraft,
  XinmaiGenesisBirthCoordinateInputSession,
  XinmaiGenesisBirthCoordinateInputSessionBoundary,
  XinmaiGenesisBirthCoordinatePresentationDecision,
  XinmaiGenesisBirthCoordinatePresentationInput,
  XinmaiGenesisBirthCoordinateValidation,
} from "../types/xinmaiGenesisBirthCoordinatePresentation";
import type { XinmaiGenesisBirthSourceRawInput } from "../types/xinmaiGenesisBirthSourceDerivation";
import { XINMAI_GENESIS_BIRTH_COORDINATE_PRESENTATION_VERSION } from "../types/xinmaiGenesisBirthCoordinatePresentation";
import { GUANYAO_BIRTH_CALENDAR_GREGORIAN_RANGE } from "./guanyaoBirthCalendarService";
import { deriveXinmaiGenesisBirthSource } from "./xinmaiGenesisBirthSourceDerivationController";
import { XINMAI_GENESIS_BIRTH_COORDINATE_PRESENTATION_POLICY } from "./xinmaiGenesisBirthCoordinatePresentationPolicy";

export const XINMAI_GENESIS_BIRTH_COORDINATE_EMPTY_DRAFT:
  XinmaiGenesisBirthCoordinateDraft = Object.freeze({
    year: null,
    month: null,
    day: null,
    precision: "EXACT",
    exactLocalTime: "",
    approximateRangeStart: "",
    approximateRangeEnd: "",
  });

export const XINMAI_GENESIS_BIRTH_COORDINATE_INPUT_SESSION_BOUNDARY:
  XinmaiGenesisBirthCoordinateInputSessionBoundary = Object.freeze({
    sessionOnly: true,
    noStorage: true,
    noIdentity: true,
    noEngineInvocation: true,
    noAuthorityWriteback: true,
    noAutomaticConfirmation: true,
  });

const toRawInput = (
  draft: XinmaiGenesisBirthCoordinateDraft,
): XinmaiGenesisBirthSourceRawInput | null => {
  if (draft.year === null || draft.month === null || draft.day === null) return null;
  return Object.freeze({
    localCivilGregorianDate: Object.freeze({
      year: draft.year,
      month: draft.month,
      day: draft.day,
    }),
    precision: draft.precision,
    exactLocalTime: draft.precision === "EXACT" ? draft.exactLocalTime : null,
    approximateRangeStart:
      draft.precision === "APPROXIMATE_RANGE"
        ? draft.approximateRangeStart
        : null,
    approximateRangeEnd:
      draft.precision === "APPROXIMATE_RANGE"
        ? draft.approximateRangeEnd
        : null,
    localityPolicy: "LOCAL_CIVIL_TIME_AS_RECORDED_NO_CONVERSION" as const,
  });
};

const validateDateShape = (
  draft: XinmaiGenesisBirthCoordinateDraft,
): XinmaiGenesisBirthCoordinateValidation | null => {
  if (
    draft.year === null ||
    !Number.isInteger(draft.year) ||
    draft.year < GUANYAO_BIRTH_CALENDAR_GREGORIAN_RANGE.minimum ||
    draft.year > GUANYAO_BIRTH_CALENDAR_GREGORIAN_RANGE.maximum
  ) {
    return Object.freeze({ status: "INVALID" as const, reason: "YEAR_OUTSIDE_SUPPORTED_RANGE" as const });
  }
  if (draft.month === null || !Number.isInteger(draft.month) || draft.month < 1 || draft.month > 12) {
    return Object.freeze({ status: "INVALID" as const, reason: "MONTH_OUTSIDE_RANGE" as const });
  }
  if (draft.day === null || !Number.isInteger(draft.day) || draft.day < 1 || draft.day > 31) {
    return Object.freeze({ status: "INVALID" as const, reason: "DAY_OUTSIDE_RANGE" as const });
  }
  const date = new Date(0);
  date.setUTCHours(12, 0, 0, 0);
  date.setUTCFullYear(draft.year, draft.month - 1, draft.day);
  if (
    date.getUTCFullYear() !== draft.year ||
    date.getUTCMonth() !== draft.month - 1 ||
    date.getUTCDate() !== draft.day
  ) {
    return Object.freeze({ status: "INVALID" as const, reason: "DATE_DOES_NOT_EXIST" as const });
  }
  return null;
};

export function validateXinmaiGenesisBirthCoordinate(
  draft: XinmaiGenesisBirthCoordinateDraft,
  revision = 0,
): XinmaiGenesisBirthCoordinateValidation {
  const dateError = validateDateShape(draft);
  if (dateError !== null) return dateError;
  const rawInput = toRawInput(draft);
  if (rawInput === null) {
    return Object.freeze({ status: "INVALID" as const, reason: "DATE_DOES_NOT_EXIST" as const });
  }
  const derivation = deriveXinmaiGenesisBirthSource({ rawInput, inputRevision: revision });
  if (derivation.status === "READY") {
    return Object.freeze({ status: "VALID" as const, reason: null });
  }
  return Object.freeze({
    status: "INVALID" as const,
    reason:
      derivation.reason === "BIRTH_TIME_UNRESOLVED"
        ? "BIRTH_TIME_UNRESOLVED"
        : derivation.reason === "APPROXIMATE_RANGE_CROSSES_HOUR_BRANCH"
          ? "APPROXIMATE_RANGE_CROSSES_HOUR_BRANCH"
          : derivation.reason === "CALENDAR_UNAVAILABLE"
            ? "CALENDAR_UNAVAILABLE"
            : "INVALID_LOCAL_TIME",
  });
}

const deriveDraft = (draft: XinmaiGenesisBirthCoordinateDraft, revision: number) => {
  const rawInput = toRawInput(draft);
  return rawInput === null
    ? Object.freeze({
        status: "SAFE_WITHHELD" as const,
        receipt: null,
        reason: "BIRTH_DATE_REQUIRED" as const,
      })
    : deriveXinmaiGenesisBirthSource({ rawInput, inputRevision: revision });
};

const sessionWith = (
  current: XinmaiGenesisBirthCoordinateInputSession,
  patch: Partial<XinmaiGenesisBirthCoordinateInputSession>,
): XinmaiGenesisBirthCoordinateInputSession => {
  const revision = current.revision + 1;
  const draft = patch.draft ?? current.draft;
  const derivation = deriveDraft(draft, revision);
  return Object.freeze({
    ...current,
    ...patch,
    revision,
    draft,
    validation: validateXinmaiGenesisBirthCoordinate(draft, revision),
    derivation,
    boundary: XINMAI_GENESIS_BIRTH_COORDINATE_INPUT_SESSION_BOUNDARY,
  });
};

export function createXinmaiGenesisBirthCoordinateInputSession(
  recoveredDraft: XinmaiGenesisBirthCoordinateDraft = XINMAI_GENESIS_BIRTH_COORDINATE_EMPTY_DRAFT,
): XinmaiGenesisBirthCoordinateInputSession {
  return Object.freeze({
    schemaVersion: XINMAI_GENESIS_BIRTH_COORDINATE_PRESENTATION_VERSION,
    status: "LIFE_WORLD_BASELINE" as const,
    revision: 0,
    draft: Object.freeze({ ...recoveredDraft }),
    validation: validateXinmaiGenesisBirthCoordinate(recoveredDraft),
    derivation: deriveDraft(recoveredDraft, 0),
    failureReason: null,
    boundary: XINMAI_GENESIS_BIRTH_COORDINATE_INPUT_SESSION_BOUNDARY,
  });
}

export function beginXinmaiGenesisBirthCoordinateInput(
  current: XinmaiGenesisBirthCoordinateInputSession,
): XinmaiGenesisBirthCoordinateInputSession {
  return sessionWith(current, {
    status: current.validation.status === "VALID" ? "READY_TO_CONFIRM" : "EDITING",
    failureReason: null,
  });
}

export function updateXinmaiGenesisBirthCoordinateInput(
  current: XinmaiGenesisBirthCoordinateInputSession,
  draft: XinmaiGenesisBirthCoordinateDraft,
): XinmaiGenesisBirthCoordinateInputSession {
  const validation = validateXinmaiGenesisBirthCoordinate(draft, current.revision + 1);
  return sessionWith(current, {
    status: validation.status === "VALID" ? "READY_TO_CONFIRM" : "EDITING",
    draft: Object.freeze({ ...draft }),
    failureReason: null,
  });
}

export function markXinmaiGenesisBirthCoordinateConfirming(current: XinmaiGenesisBirthCoordinateInputSession): XinmaiGenesisBirthCoordinateInputSession {
  if (current.status !== "READY_TO_CONFIRM" || current.validation.status !== "VALID" || current.derivation.status !== "READY") {
    return sessionWith(current, {
      status: "SAFE_WITHHELD",
      failureReason: current.derivation.status === "BIRTH_TIME_UNRESOLVED" ? "BIRTH_TIME_UNRESOLVED" : "INVALID_BIRTH_COORDINATE",
    });
  }
  return sessionWith(current, { status: "CONFIRMING", failureReason: null });
}

export function markXinmaiGenesisBirthCoordinateAccepted(current: XinmaiGenesisBirthCoordinateInputSession): XinmaiGenesisBirthCoordinateInputSession {
  return sessionWith(current, { status: "ACCEPTED", failureReason: null });
}

export function markXinmaiGenesisBirthCoordinateSafeWithheld(
  current: XinmaiGenesisBirthCoordinateInputSession,
  failureReason: XinmaiGenesisBirthCoordinateAdmissionFailureReason,
): XinmaiGenesisBirthCoordinateInputSession {
  return sessionWith(current, { status: "SAFE_WITHHELD", failureReason });
}

export function resolveXinmaiGenesisBirthCoordinatePresentation(
  input: XinmaiGenesisBirthCoordinatePresentationInput,
): XinmaiGenesisBirthCoordinatePresentationDecision {
  const validation = validateXinmaiGenesisBirthCoordinate(input.draft, input.revision);
  const derivationReceipt = input.derivation.status === "READY" ? input.derivation.receipt : null;
  const spatialEnrichment = XINMAI_GENESIS_BIRTH_COORDINATE_PRESENTATION_POLICY === "SAFE_WITHHELD" ? "SAFE_WITHHELD" as const : null;
  if (input.status === "SAFE_WITHHELD") {
    return Object.freeze({ state: "SAFE_WITHHELD" as const, headline: "生命坐标暂时无法确认", support: "现有生命事实不会改变。请核对出生证明或家人记忆中的当地日期与时间。", primaryAction: "NONE" as const, showCoordinateFields: true, confirmationEnabled: false, validation, derivationReceipt, sceneEnrichment: "SAFE_WITHHELD" as const });
  }
  if (input.status === "LIFE_WORLD_BASELINE") {
    return Object.freeze({ state: "LIFE_WORLD_BASELINE" as const, headline: "先让这片生命世界认识你的时间", support: "请按出生证明或家人记忆中的当地日期与钟表时间填写；农历与时辰由系统确定性推导。", primaryAction: "BEGIN" as const, showCoordinateFields: false, confirmationEnabled: false, validation, derivationReceipt, sceneEnrichment: spatialEnrichment ?? "GENERIC_LIFE_WORLD" as const });
  }
  if (input.status === "ACCEPTED") {
    return Object.freeze({ state: "BIRTH_SOURCE_ACCEPTED" as const, headline: "生命坐标已经确认", support: "同一片生命世界会从这个起点继续显现。", primaryAction: "NONE" as const, showCoordinateFields: false, confirmationEnabled: false, validation, derivationReceipt, sceneEnrichment: spatialEnrichment ?? "CONFIRMED_BIRTH_SOURCE" as const });
  }
  if (input.status === "CONFIRMING") {
    return Object.freeze({ state: "BIRTH_COORDINATE_READY" as const, headline: "正在确认这次生命起点", support: "只有正式来源恢复一致后，才会继续进入生命显现。", primaryAction: "NONE" as const, showCoordinateFields: true, confirmationEnabled: false, validation, derivationReceipt, sceneEnrichment: spatialEnrichment ?? "GENERIC_LIFE_WORLD" as const });
  }
  return Object.freeze({
    state: validation.status === "VALID" ? "BIRTH_COORDINATE_READY" as const : "BIRTH_COORDINATE_EDITING" as const,
    headline: "确认你的生命起点",
    support: input.draft.precision === "UNKNOWN"
      ? "日期可以暂存；出生时间未解决前，不会形成个性化生命身份。"
      : validation.status === "VALID"
        ? "请核对原始公历输入与系统推导的农历、时辰。"
        : "请填写有效的当地民用公历日期与钟表时间。",
    primaryAction: "CONFIRM" as const,
    showCoordinateFields: true,
    confirmationEnabled: validation.status === "VALID",
    validation,
    derivationReceipt,
    sceneEnrichment: spatialEnrichment ?? "GENERIC_LIFE_WORLD" as const,
  });
}

export const XINMAI_GENESIS_BIRTH_COORDINATE_BASELINE_INPUT:
  XinmaiGenesisBirthCoordinatePresentationInput = createXinmaiGenesisBirthCoordinateInputSession();
