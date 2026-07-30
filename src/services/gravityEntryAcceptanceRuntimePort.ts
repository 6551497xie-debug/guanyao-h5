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
import type {
  RealityPressureRecognitionOutcome,
} from "../types/xinmaiRealityAdventureContinuity";
import type {
  RealityEncounterRequestResult,
} from "../types/xinmaiRealityEncounterIntent";

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

export function observeRealityPressureRecognitionOutcome(
  _outcome: RealityPressureRecognitionOutcome,
): void {}

export function observeRealityEncounterRequestOutcome(
  _outcome: RealityEncounterRequestResult,
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
