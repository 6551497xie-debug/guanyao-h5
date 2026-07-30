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
import { recordGravityEntryAcceptanceEvidence } from "./xinmaiGravityEntryAcceptanceScenario";

const identityOf = (
  input: Readonly<{
    admissionReferenceId?: string | null;
    gravityCycleId?: string | null;
    admissionRevision?: number | null;
    revision?: number | null;
  }>,
) => ({
  admissionReferenceId: input.admissionReferenceId ?? null,
  gravityCycleId: input.gravityCycleId ?? null,
  admissionRevision:
    input.admissionRevision ?? input.revision ?? null,
});

export function projectGravityLifeSurfaceOutcomes(
  outcome: GravityLifeSurfaceOutcome,
): readonly GravityLifeSurfaceOutcome[] {
  recordGravityEntryAcceptanceEvidence({
    event: `LIFE_SURFACE:${outcome.status}`,
    ...identityOf(outcome),
    detail:
      outcome.status === "GRAVITY_LIFE_SURFACE_PRESENTED"
        ? outcome.surfaceMode
        : outcome.reason,
  });
  return Object.freeze([outcome]);
}

export function projectGravityObservationSurfaceOutcomes(
  outcome: GravityObservationSurfaceOutcome,
): readonly GravityObservationSurfaceOutcome[] {
  recordGravityEntryAcceptanceEvidence({
    event: `OBSERVATION_SURFACE:${outcome.status}`,
    ...identityOf(outcome),
    detail:
      outcome.status ===
      "GRAVITY_OBSERVATION_SURFACE_PRESENTED"
        ? outcome.surfaceMode
        : outcome.reason,
  });
  return Object.freeze([outcome]);
}

export function observeRealityToGravityCutoverResult(
  result: RealityToGravityCutoverTransactionResult,
): void {
  const admission =
    result.status === "COMMITTED"
      ? result.envelope.targetGravity.admission
      : result.gravityAdmission;
  recordGravityEntryAcceptanceEvidence({
    event: `CUTOVER:${result.status}`,
    ...(admission === null ? {} : identityOf(admission)),
    detail: result.reason,
  });
}

export function observeRealityPressureRecognitionOutcome(
  outcome: RealityPressureRecognitionOutcome,
): void {
  recordGravityEntryAcceptanceEvidence({
    event: `PRESSURE_RECOGNITION:${outcome.status}`,
    detail:
      outcome.receipt === null
        ? outcome.reason
        : [
            outcome.receipt.recognitionReceiptReferenceId,
            outcome.receipt.lifecycle,
            String(outcome.canonicalRevision),
          ].join("|"),
  });
}

export function observeRealityEncounterRequestOutcome(
  outcome: RealityEncounterRequestResult,
): void {
  recordGravityEntryAcceptanceEvidence({
    event: `REALITY_INTENT:${outcome.status}`,
    detail: [
      outcome.reason ?? "NONE",
      outcome.intent?.encounterCycleId ?? "NO_ENCOUNTER",
      outcome.persistence ?? "UNCONFIRMED",
    ].join("|"),
  });
}

export function observeGravityRouteGuard(
  reason: "IDENTITY_MISMATCH",
): void {
  recordGravityEntryAcceptanceEvidence({
    event: "ROUTE_GUARD:BLOCKED",
    detail: reason,
  });
}

export function observeGravityRouteAdmissionResult(
  result: GravityRouteAdmissionResult,
): void {
  recordGravityEntryAcceptanceEvidence({
    event: `ROUTE_ADMISSION:${result.status}`,
    ...(result.intent === null
      ? {}
      : identityOf(result.intent)),
    detail: result.reason,
  });
}

export function observeGravityHostAcceptanceOutcome(
  outcome: GravityHostAcceptanceOutcome,
): void {
  recordGravityEntryAcceptanceEvidence({
    event: `HOST_OUTCOME:${outcome.status}`,
    ...identityOf(outcome),
    detail:
      outcome.status === "GRAVITY_MINIMUM_PRESENTED"
        ? outcome.transaction.minimumSurface
        : outcome.reason,
  });
}

export function observeGravityActiveCommit(
  admission: GravityEntryAdmission | null,
): void {
  recordGravityEntryAcceptanceEvidence({
    event:
      admission?.state === "ACTIVE_IN_GRAVITY"
        ? "CONTROLLER_COMMIT:ACTIVE_IN_GRAVITY"
        : "CONTROLLER_COMMIT:REJECTED",
    ...(admission === null ? {} : identityOf(admission)),
    detail: admission?.state ?? "NULL",
  });
}
