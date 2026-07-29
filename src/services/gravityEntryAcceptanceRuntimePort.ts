import type {
  GravityEntryAdmission,
  GravityHostAcceptanceOutcome,
  GravityRouteAdmissionResult,
  RealityToGravityCutoverTransactionResult,
} from "../types/xinmaiGravityEntryAdmission";
import type {
  GravityLifeSurfaceOutcome,
  GravityObservationSurfaceOutcome,
} from "../types/xinmaiGravitySurfaceAdmission";

export function projectGravityLifeSurfaceOutcomes(
  outcome: GravityLifeSurfaceOutcome,
): readonly GravityLifeSurfaceOutcome[] {
  return Object.freeze([outcome]);
}

export function projectGravityObservationSurfaceOutcomes(
  outcome: GravityObservationSurfaceOutcome,
): readonly GravityObservationSurfaceOutcome[] {
  return Object.freeze([outcome]);
}

export function observeRealityToGravityCutoverResult(
  _result: RealityToGravityCutoverTransactionResult,
): void {}

export function observeGravityRouteGuard(
  _reason: "IDENTITY_MISMATCH",
): void {}

export function observeGravityRouteAdmissionResult(
  _result: GravityRouteAdmissionResult,
): void {}

export function observeGravityHostAcceptanceOutcome(
  _outcome: GravityHostAcceptanceOutcome,
): void {}

export function observeGravityActiveCommit(
  _admission: GravityEntryAdmission | null,
): void {}
