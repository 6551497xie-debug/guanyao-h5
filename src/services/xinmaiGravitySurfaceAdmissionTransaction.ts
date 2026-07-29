import type {
  GravityLifeSurfaceOutcome,
  GravityObservationSurfaceOutcome,
  GravitySurfaceAdmissionAttempt,
  GravitySurfaceAdmissionTransaction,
  GravitySurfaceAdmissionTransactionResult,
} from "../types/xinmaiGravitySurfaceAdmission";
import {
  XINMAI_GRAVITY_SURFACE_ADMISSION_TRANSACTION_SCHEMA_VERSION,
} from "../types/xinmaiGravitySurfaceAdmission";

const identityMatches = (
  left: GravitySurfaceAdmissionAttempt["identityReferences"],
  right: GravitySurfaceAdmissionAttempt["identityReferences"],
): boolean =>
  left.sourceReferenceId === right.sourceReferenceId &&
  left.starBeastIdentityReferenceId ===
    right.starBeastIdentityReferenceId &&
  left.mansionCoordinateReferenceId ===
    right.mansionCoordinateReferenceId;

const outcomeMatchesAttempt = (
  outcome: GravityLifeSurfaceOutcome | GravityObservationSurfaceOutcome,
  attempt: GravitySurfaceAdmissionAttempt,
): boolean =>
  outcome.admissionReferenceId === attempt.admissionReferenceId &&
  outcome.gravityCycleId === attempt.gravityCycleId &&
  outcome.admissionRevision === attempt.admissionRevision &&
  outcome.selectedPressureSeedId === attempt.selectedPressureSeedId &&
  outcome.sourceReferenceId ===
    attempt.identityReferences.sourceReferenceId &&
  identityMatches(outcome.identityReferences, attempt.identityReferences);

export function resolveGravitySurfaceAdmissionTransaction(input: Readonly<{
  attempt: GravitySurfaceAdmissionAttempt;
  lifeSurfaceOutcome: GravityLifeSurfaceOutcome | null;
  observationSurfaceOutcome: GravityObservationSurfaceOutcome | null;
}>): GravitySurfaceAdmissionTransactionResult {
  if (input.lifeSurfaceOutcome === null) {
    return Object.freeze({
      status: "PENDING" as const,
      transaction: null,
      reason: "LIFE_SURFACE_OUTCOME_REQUIRED" as const,
    });
  }
  if (input.observationSurfaceOutcome === null) {
    return Object.freeze({
      status: "PENDING" as const,
      transaction: null,
      reason: "OBSERVATION_SURFACE_OUTCOME_REQUIRED" as const,
    });
  }
  if (!outcomeMatchesAttempt(input.lifeSurfaceOutcome, input.attempt)) {
    return Object.freeze({
      status: "REJECTED" as const,
      transaction: null,
      reason: "LIFE_SURFACE_OUTCOME_MISMATCH" as const,
    });
  }
  if (
    !outcomeMatchesAttempt(
      input.observationSurfaceOutcome,
      input.attempt,
    )
  ) {
    return Object.freeze({
      status: "REJECTED" as const,
      transaction: null,
      reason: "OBSERVATION_SURFACE_OUTCOME_MISMATCH" as const,
    });
  }
  if (
    input.lifeSurfaceOutcome.status !==
      "GRAVITY_LIFE_SURFACE_PRESENTED" ||
    !Number.isFinite(Date.parse(input.lifeSurfaceOutcome.presentedAt))
  ) {
    return Object.freeze({
      status: "REJECTED" as const,
      transaction: null,
      reason: "LIFE_SURFACE_NOT_PRESENTED" as const,
    });
  }
  if (
    input.observationSurfaceOutcome.status !==
      "GRAVITY_OBSERVATION_SURFACE_PRESENTED" ||
    !input.observationSurfaceOutcome.currentRealityTraceVisible ||
    !input.observationSurfaceOutcome.firstObservationAffordanceAvailable ||
    !Number.isFinite(
      Date.parse(input.observationSurfaceOutcome.presentedAt),
    )
  ) {
    return Object.freeze({
      status: "REJECTED" as const,
      transaction: null,
      reason: "OBSERVATION_SURFACE_NOT_PRESENTED" as const,
    });
  }
  const staticMode =
    input.lifeSurfaceOutcome.surfaceMode ===
      "SEMANTIC_STATIC_SAME_LIFE_SURFACE" ||
    input.observationSurfaceOutcome.surfaceMode ===
      "STATIC_FIRST_GRAVITY_OBSERVATION";
  const committedAt = new Date(
    Math.max(
      Date.now(),
      Date.parse(input.lifeSurfaceOutcome.presentedAt),
      Date.parse(input.observationSurfaceOutcome.presentedAt),
    ),
  ).toISOString();
  const transaction: GravitySurfaceAdmissionTransaction = Object.freeze({
    schemaVersion:
      XINMAI_GRAVITY_SURFACE_ADMISSION_TRANSACTION_SCHEMA_VERSION,
    source: "xinmai_gravity_surface_admission_transaction" as const,
    ...input.attempt,
    lifeSurfaceOutcome: input.lifeSurfaceOutcome,
    observationSurfaceOutcome: input.observationSurfaceOutcome,
    minimumSurface: staticMode
      ? "GRAVITY_STATIC_SAME_LIFE_AND_FIRST_OBSERVATION"
      : "GRAVITY_SAME_LIFE_AND_FIRST_OBSERVATION",
    committedAt,
  });
  return Object.freeze({
    status: "READY" as const,
    transaction,
    reason: null,
  });
}

export function isGravitySurfaceAdmissionTransactionValid(
  transaction: GravitySurfaceAdmissionTransaction,
  attempt: GravitySurfaceAdmissionAttempt,
): boolean {
  const resolved = resolveGravitySurfaceAdmissionTransaction({
    attempt,
    lifeSurfaceOutcome: transaction.lifeSurfaceOutcome,
    observationSurfaceOutcome: transaction.observationSurfaceOutcome,
  });
  return (
    resolved.status === "READY" &&
    resolved.transaction.minimumSurface === transaction.minimumSurface &&
    transaction.schemaVersion ===
      XINMAI_GRAVITY_SURFACE_ADMISSION_TRANSACTION_SCHEMA_VERSION &&
    transaction.source ===
      "xinmai_gravity_surface_admission_transaction" &&
    Number.isFinite(Date.parse(transaction.committedAt))
  );
}
