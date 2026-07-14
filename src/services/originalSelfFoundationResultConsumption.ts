import type { OriginalSelfState } from "../types/originalSelf";
import type {
  OriginalSelfFoundationNotReady,
  OriginalSelfFoundationReady,
  OriginalSelfFoundationResult,
} from "./originalSelfFoundationResolver";

export type OriginalSelfFoundationAvailable = Readonly<{
  status: "AVAILABLE";
  source: "original_self_foundation_consumption";
  result: OriginalSelfFoundationReady;
  state: OriginalSelfState;
}>;

export type OriginalSelfFoundationUnavailable = Readonly<{
  status: "UNAVAILABLE";
  source: "original_self_foundation_consumption";
  result: OriginalSelfFoundationNotReady;
  reason: OriginalSelfFoundationNotReady["reason"];
}>;

export type OriginalSelfFoundationConsumption =
  | OriginalSelfFoundationAvailable
  | OriginalSelfFoundationUnavailable;

export function consumeOriginalSelfFoundationResult(
  result: OriginalSelfFoundationResult,
): OriginalSelfFoundationConsumption {
  if (result.status !== "READY") {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "original_self_foundation_consumption",
      result,
      reason: result.reason,
    });
  }

  return Object.freeze({
    status: "AVAILABLE",
    source: "original_self_foundation_consumption",
    result,
    state: result.state,
  });
}
