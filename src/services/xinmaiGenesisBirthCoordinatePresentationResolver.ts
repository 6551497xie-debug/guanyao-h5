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

const validationSupport = (
  validation: XinmaiGenesisBirthCoordinateValidation,
): string => {
  if (validation.status === "VALID") {
    return "请核对原始公历输入与系统推导的农历、时辰。";
  }
  switch (validation.reason) {
    case "YEAR_OUTSIDE_SUPPORTED_RANGE":
      return "请先选择系统支持范围内的公历出生日期。";
    case "MONTH_OUTSIDE_RANGE":
    case "DAY_OUTSIDE_RANGE":
    case "DATE_DOES_NOT_EXIST":
      return "这个公历日期无法成立，请重新选择日期。";
    case "BIRTH_TIME_UNRESOLVED":
      return "日期可以保留；补充当地时间后，才能形成个性化生命起点。";
    case "APPROXIMATE_RANGE_CROSSES_HOUR_BRANCH":
      return "这个范围跨越了两个时辰。请缩小范围，或改为具体时间。";
    case "CALENDAR_UNAVAILABLE":
      return "农历推导暂时不可用。原始输入会保留，请稍后重试。";
    case "INVALID_LOCAL_TIME":
      return "请补全当地钟表时间，或填写一个有效的时间范围。";
  }
};

const withheldSupport = (
  reason: XinmaiGenesisBirthCoordinateAdmissionFailureReason | null,
): string => {
  switch (reason) {
    case "PERSISTED_SOURCE_CONFLICT":
    case "ACTIVE_SOURCE_REFERENCE_CONFLICT":
      return "已有另一份生命起点仍在使用。现有事实不会被覆盖；请核对后再确认。";
    case "PERSISTENCE_RECOVERY_MISMATCH":
      return "生命起点已保存，但当前恢复结果尚未一致。请保留本页并稍后重试。";
    case "GENESIS_HANDOFF_BLOCKED":
      return "生命起点已经确认，但下一段生命显现尚未准备好。请稍后重试。";
    case "BIRTH_TIME_UNRESOLVED":
    case "INVALID_BIRTH_COORDINATE":
      return "这组日期与时间尚未形成完整生命起点。请按提示调整后重试。";
    case "ENGINE_UNAVAILABLE":
    case "LIFE_SOURCE_SESSION_BLOCKED":
    case "VISUAL_SOURCE_BLOCKED":
    case "VISUAL_CONTEXT_BLOCKED":
    case "DERIVATION_RECEIPT_MISMATCH":
      return "这次确认暂时无法完成。现有生命事实不会改变；你可以核对输入后重试。";
    case null:
      return "这次确认暂时无法完成。现有生命事实不会改变；你可以核对输入后重试。";
  }
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
  if (XINMAI_GENESIS_BIRTH_COORDINATE_PRESENTATION_POLICY !== "ENABLED") {
    return Object.freeze({
      state: "SAFE_WITHHELD" as const,
      headline: "生命起点确认暂时停下",
      support: "既有生命事实仍被保留；新的出生坐标确认与下一段显现暂时不可用。",
      primaryAction: "NONE" as const,
      showCoordinateFields: true,
      confirmationEnabled: false,
      validation,
      derivationReceipt,
      sceneEnrichment: "SAFE_WITHHELD" as const,
    });
  }
  if (input.status === "SAFE_WITHHELD") {
    return Object.freeze({
      state: "SAFE_WITHHELD" as const,
      headline: "生命坐标暂时无法确认",
      support: withheldSupport(input.failureReason),
      primaryAction: "CONFIRM" as const,
      showCoordinateFields: true,
      confirmationEnabled: validation.status === "VALID",
      validation,
      derivationReceipt,
      sceneEnrichment: "SAFE_WITHHELD" as const,
    });
  }
  if (input.status === "LIFE_WORLD_BASELINE") {
    return Object.freeze({ state: "LIFE_WORLD_BASELINE" as const, headline: "先让这片生命世界认识你的时间", support: "请按出生证明或家人记忆中的当地日期与钟表时间填写；农历与时辰由系统确定性推导。", primaryAction: "BEGIN" as const, showCoordinateFields: false, confirmationEnabled: false, validation, derivationReceipt, sceneEnrichment: "GENERIC_LIFE_WORLD" as const });
  }
  if (input.status === "ACCEPTED") {
    return Object.freeze({ state: "BIRTH_SOURCE_ACCEPTED" as const, headline: "生命坐标已经确认", support: "同一片生命世界会从这个起点继续显现。", primaryAction: "NONE" as const, showCoordinateFields: false, confirmationEnabled: false, validation, derivationReceipt, sceneEnrichment: "CONFIRMED_BIRTH_SOURCE" as const });
  }
  if (input.status === "CONFIRMING") {
    return Object.freeze({ state: "BIRTH_COORDINATE_READY" as const, headline: "正在确认这次生命起点", support: "只有正式来源恢复一致后，才会继续进入生命显现。", primaryAction: "NONE" as const, showCoordinateFields: true, confirmationEnabled: false, validation, derivationReceipt, sceneEnrichment: "GENERIC_LIFE_WORLD" as const });
  }
  return Object.freeze({
    state: validation.status === "VALID" ? "BIRTH_COORDINATE_READY" as const : "BIRTH_COORDINATE_EDITING" as const,
    headline: "确认你的生命起点",
    support: validationSupport(validation),
    primaryAction: "CONFIRM" as const,
    showCoordinateFields: true,
    confirmationEnabled: validation.status === "VALID",
    validation,
    derivationReceipt,
    sceneEnrichment: "GENERIC_LIFE_WORLD" as const,
  });
}

export const XINMAI_GENESIS_BIRTH_COORDINATE_BASELINE_INPUT:
  XinmaiGenesisBirthCoordinatePresentationInput = createXinmaiGenesisBirthCoordinateInputSession();
