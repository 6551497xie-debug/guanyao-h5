import { GUANYAO_BIRTH_CALENDAR_GREGORIAN_RANGE } from "./guanyaoBirthCalendarService";
import { XINMAI_GENESIS_BIRTH_COORDINATE_PRESENTATION_POLICY } from "./xinmaiGenesisBirthCoordinatePresentationPolicy";
import {
  XINMAI_GENESIS_BIRTH_COORDINATE_PRESENTATION_VERSION,
  XINMAI_GENESIS_BIRTH_HOUR_BRANCHES,
  type XinmaiGenesisBirthCoordinateAdmissionFailureReason,
  type XinmaiGenesisBirthCoordinateDraft,
  type XinmaiGenesisBirthCoordinateInputSession,
  type XinmaiGenesisBirthCoordinateInputSessionBoundary,
  type XinmaiGenesisBirthCoordinatePresentationDecision,
  type XinmaiGenesisBirthCoordinatePresentationInput,
  type XinmaiGenesisBirthCoordinateValidation,
} from "../types/xinmaiGenesisBirthCoordinatePresentation";

export const XINMAI_GENESIS_BIRTH_COORDINATE_DEFAULT_DRAFT:
  XinmaiGenesisBirthCoordinateDraft = Object.freeze({
    year: 1995,
    month: 6,
    day: 2,
    hourBranch: "酉时",
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

export function validateXinmaiGenesisBirthCoordinate(
  draft: XinmaiGenesisBirthCoordinateDraft,
): XinmaiGenesisBirthCoordinateValidation {
  if (
    !Number.isInteger(draft.year) ||
    draft.year < GUANYAO_BIRTH_CALENDAR_GREGORIAN_RANGE.minimum ||
    draft.year > GUANYAO_BIRTH_CALENDAR_GREGORIAN_RANGE.maximum
  ) {
    return Object.freeze({
      status: "INVALID" as const,
      reason: "YEAR_OUTSIDE_SUPPORTED_RANGE" as const,
    });
  }
  if (!Number.isInteger(draft.month) || draft.month < 1 || draft.month > 12) {
    return Object.freeze({
      status: "INVALID" as const,
      reason: "MONTH_OUTSIDE_RANGE" as const,
    });
  }
  if (!Number.isInteger(draft.day) || draft.day < 1 || draft.day > 31) {
    return Object.freeze({
      status: "INVALID" as const,
      reason: "DAY_OUTSIDE_RANGE" as const,
    });
  }
  if (!XINMAI_GENESIS_BIRTH_HOUR_BRANCHES.includes(draft.hourBranch)) {
    return Object.freeze({
      status: "INVALID" as const,
      reason: "HOUR_BRANCH_UNRECOGNIZED" as const,
    });
  }

  const date = new Date(0);
  date.setUTCHours(12, 0, 0, 0);
  date.setUTCFullYear(draft.year, draft.month - 1, draft.day);
  if (
    date.getUTCFullYear() !== draft.year ||
    date.getUTCMonth() !== draft.month - 1 ||
    date.getUTCDate() !== draft.day
  ) {
    return Object.freeze({
      status: "INVALID" as const,
      reason: "DATE_DOES_NOT_EXIST" as const,
    });
  }

  return Object.freeze({ status: "VALID" as const, reason: null });
}

const sessionWith = (
  current: XinmaiGenesisBirthCoordinateInputSession,
  patch: Partial<XinmaiGenesisBirthCoordinateInputSession>,
): XinmaiGenesisBirthCoordinateInputSession =>
  Object.freeze({
    ...current,
    ...patch,
    revision: current.revision + 1,
    boundary: XINMAI_GENESIS_BIRTH_COORDINATE_INPUT_SESSION_BOUNDARY,
  });

export function createXinmaiGenesisBirthCoordinateInputSession():
  XinmaiGenesisBirthCoordinateInputSession {
  return Object.freeze({
    schemaVersion: XINMAI_GENESIS_BIRTH_COORDINATE_PRESENTATION_VERSION,
    status: "LIFE_WORLD_BASELINE" as const,
    revision: 0,
    draft: XINMAI_GENESIS_BIRTH_COORDINATE_DEFAULT_DRAFT,
    validation: validateXinmaiGenesisBirthCoordinate(
      XINMAI_GENESIS_BIRTH_COORDINATE_DEFAULT_DRAFT,
    ),
    failureReason: null,
    boundary: XINMAI_GENESIS_BIRTH_COORDINATE_INPUT_SESSION_BOUNDARY,
  });
}

export function beginXinmaiGenesisBirthCoordinateInput(
  current: XinmaiGenesisBirthCoordinateInputSession,
): XinmaiGenesisBirthCoordinateInputSession {
  return sessionWith(current, {
    status:
      current.validation.status === "VALID"
        ? "READY_TO_CONFIRM"
        : "EDITING",
    failureReason: null,
  });
}

export function updateXinmaiGenesisBirthCoordinateInput(
  current: XinmaiGenesisBirthCoordinateInputSession,
  draft: XinmaiGenesisBirthCoordinateDraft,
): XinmaiGenesisBirthCoordinateInputSession {
  const validation = validateXinmaiGenesisBirthCoordinate(draft);
  return sessionWith(current, {
    status:
      validation.status === "VALID" ? "READY_TO_CONFIRM" : "EDITING",
    draft: Object.freeze({ ...draft }),
    validation,
    failureReason: null,
  });
}

export function markXinmaiGenesisBirthCoordinateConfirming(
  current: XinmaiGenesisBirthCoordinateInputSession,
): XinmaiGenesisBirthCoordinateInputSession {
  if (
    current.status !== "READY_TO_CONFIRM" ||
    current.validation.status !== "VALID"
  ) {
    return sessionWith(current, {
      status: "SAFE_WITHHELD",
      failureReason: "INVALID_BIRTH_COORDINATE",
    });
  }
  return sessionWith(current, {
    status: "CONFIRMING",
    failureReason: null,
  });
}

export function markXinmaiGenesisBirthCoordinateAccepted(
  current: XinmaiGenesisBirthCoordinateInputSession,
): XinmaiGenesisBirthCoordinateInputSession {
  return sessionWith(current, {
    status: "ACCEPTED",
    failureReason: null,
  });
}

export function markXinmaiGenesisBirthCoordinateSafeWithheld(
  current: XinmaiGenesisBirthCoordinateInputSession,
  failureReason: XinmaiGenesisBirthCoordinateAdmissionFailureReason,
): XinmaiGenesisBirthCoordinateInputSession {
  return sessionWith(current, {
    status: "SAFE_WITHHELD",
    failureReason,
  });
}

export function resolveXinmaiGenesisBirthCoordinatePresentation(
  input: XinmaiGenesisBirthCoordinatePresentationInput,
): XinmaiGenesisBirthCoordinatePresentationDecision {
  const validation = validateXinmaiGenesisBirthCoordinate(input.draft);
  const spatialEnrichment =
    XINMAI_GENESIS_BIRTH_COORDINATE_PRESENTATION_POLICY === "SAFE_WITHHELD"
      ? "SAFE_WITHHELD" as const
      : null;
  if (input.status === "SAFE_WITHHELD") {
    return Object.freeze({
      state: "SAFE_WITHHELD" as const,
      headline: "生命坐标暂时无法确认",
      support: "现有生命事实不会改变。你可以稍后再回来。",
      primaryAction: "NONE" as const,
      showCoordinateFields: true,
      confirmationEnabled: false,
      validation,
      sceneEnrichment: "SAFE_WITHHELD" as const,
    });
  }

  if (input.status === "LIFE_WORLD_BASELINE") {
    return Object.freeze({
      state: "LIFE_WORLD_BASELINE" as const,
      headline: "先让这片生命世界认识你的时间",
      support: "出生日期与时辰只在你确认后，才会成为这次生命起点。",
      primaryAction: "BEGIN" as const,
      showCoordinateFields: false,
      confirmationEnabled: false,
      validation,
      sceneEnrichment: spatialEnrichment ?? "GENERIC_LIFE_WORLD" as const,
    });
  }

  if (input.status === "ACCEPTED") {
    return Object.freeze({
      state: "BIRTH_SOURCE_ACCEPTED" as const,
      headline: "生命坐标已经确认",
      support: "同一片生命世界会从这个起点继续显现。",
      primaryAction: "NONE" as const,
      showCoordinateFields: false,
      confirmationEnabled: false,
      validation,
      sceneEnrichment:
        spatialEnrichment ?? "CONFIRMED_BIRTH_SOURCE" as const,
    });
  }

  if (input.status === "CONFIRMING") {
    return Object.freeze({
      state: "BIRTH_COORDINATE_READY" as const,
      headline: "正在确认这次生命起点",
      support: "只有正式来源恢复一致后，才会继续进入生命显现。",
      primaryAction: "NONE" as const,
      showCoordinateFields: true,
      confirmationEnabled: false,
      validation,
      sceneEnrichment: spatialEnrichment ?? "GENERIC_LIFE_WORLD" as const,
    });
  }

  return Object.freeze({
    state:
      validation.status === "VALID"
        ? "BIRTH_COORDINATE_READY" as const
        : "BIRTH_COORDINATE_EDITING" as const,
    headline: "确认你的生命起点",
    support:
      validation.status === "VALID"
        ? "核对日期与时辰。确认后，这片世界才会回应它。"
        : "请填写一个有效的出生日期与时辰。",
    primaryAction: "CONFIRM" as const,
    showCoordinateFields: true,
    confirmationEnabled: validation.status === "VALID",
    validation,
    sceneEnrichment: spatialEnrichment ?? "GENERIC_LIFE_WORLD" as const,
  });
}

export const XINMAI_GENESIS_BIRTH_COORDINATE_BASELINE_INPUT:
  XinmaiGenesisBirthCoordinatePresentationInput = Object.freeze({
    schemaVersion: XINMAI_GENESIS_BIRTH_COORDINATE_PRESENTATION_VERSION,
    status: "LIFE_WORLD_BASELINE",
    revision: 0,
    draft: XINMAI_GENESIS_BIRTH_COORDINATE_DEFAULT_DRAFT,
    validation: validateXinmaiGenesisBirthCoordinate(
      XINMAI_GENESIS_BIRTH_COORDINATE_DEFAULT_DRAFT,
    ),
    failureReason: null,
    boundary: XINMAI_GENESIS_BIRTH_COORDINATE_INPUT_SESSION_BOUNDARY,
  });
