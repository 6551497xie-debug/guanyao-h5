import type {
  StarbeastDerivationInvalid,
  StarbeastDerivationResult,
  StarbeastDerivationUnavailable,
} from "../types/guanyaoStarbeast";
import type { OriginalSelfFoundationInput, OriginalSelfState } from "../types/originalSelf";
import { adaptOriginalSelfFoundation } from "./originalSelfFoundationAdapter";
import {
  validateOriginalSelfFoundation,
  type OriginalSelfFoundationValidationReason,
} from "./validators/originalSelfFoundationValidator";

export type OriginalSelfFoundationResolverInput = Readonly<
  Omit<OriginalSelfFoundationInput, "starBeast"> & {
    starBeast: StarbeastDerivationResult;
  }
>;

export type OriginalSelfFoundationReady = Readonly<{
  status: "READY";
  source: "original_self_foundation";
  state: OriginalSelfState;
}>;

export type OriginalSelfFoundationInvalidDate = Readonly<{
  status: "NOT_READY";
  source: "original_self_foundation";
  reason: "STAR_BEAST_INVALID_DATE";
  upstreamReason: StarbeastDerivationInvalid["reason"];
}>;

export type OriginalSelfFoundationCalendarUnavailable = Readonly<{
  status: "NOT_READY";
  source: "original_self_foundation";
  reason: "STAR_BEAST_CALENDAR_UNAVAILABLE";
  upstreamReason: StarbeastDerivationUnavailable["reason"];
}>;

export type OriginalSelfFoundationValidationFailed = Readonly<{
  status: "NOT_READY";
  source: "original_self_foundation";
  reason: "FOUNDATION_VALIDATION_FAILED";
  validationReasons: readonly OriginalSelfFoundationValidationReason[];
}>;

export type OriginalSelfFoundationNotReady =
  | OriginalSelfFoundationInvalidDate
  | OriginalSelfFoundationCalendarUnavailable
  | OriginalSelfFoundationValidationFailed;

export type OriginalSelfFoundationResult =
  | OriginalSelfFoundationReady
  | OriginalSelfFoundationNotReady;

export function resolveOriginalSelfFoundation(
  input: OriginalSelfFoundationResolverInput,
): OriginalSelfFoundationResult {
  if (input.starBeast.status === "INVALID_DATE") {
    return Object.freeze({
      status: "NOT_READY",
      source: "original_self_foundation",
      reason: "STAR_BEAST_INVALID_DATE",
      upstreamReason: input.starBeast.reason,
    });
  }

  if (input.starBeast.status === "CALENDAR_UNAVAILABLE") {
    return Object.freeze({
      status: "NOT_READY",
      source: "original_self_foundation",
      reason: "STAR_BEAST_CALENDAR_UNAVAILABLE",
      upstreamReason: input.starBeast.reason,
    });
  }

  const state = adaptOriginalSelfFoundation({
    starBeast: input.starBeast,
    currentPhase: input.currentPhase,
    hexagram: input.hexagram,
    yao: input.yao,
    crystal: input.crystal,
  });
  const validation = validateOriginalSelfFoundation(state);

  if (validation.status !== "VALID_ORIGINAL_SELF_FOUNDATION") {
    return Object.freeze({
      status: "NOT_READY",
      source: "original_self_foundation",
      reason: "FOUNDATION_VALIDATION_FAILED",
      validationReasons: Object.freeze([...validation.reasons]),
    });
  }

  return Object.freeze({
    status: "READY",
    source: "original_self_foundation",
    state,
  });
}
