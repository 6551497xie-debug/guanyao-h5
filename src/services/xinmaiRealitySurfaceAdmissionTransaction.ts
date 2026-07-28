import type {
  RealityEncounterIdentityReferences,
} from "../types/xinmaiRealityEncounterIntent";
import {
  XINMAI_REALITY_SURFACE_ADMISSION_TRANSACTION_SCHEMA_VERSION,
  type RealityLifeSurfaceOutcome,
  type RealityPressureSurfaceOutcome,
  type RealitySurfaceAdmissionAttempt,
  type RealitySurfaceAdmissionTransaction,
  type RealitySurfaceAdmissionTransactionInput,
  type RealitySurfaceAdmissionTransactionResult,
} from "../types/xinmaiRealitySurfaceAdmission";

const identityMatches = (
  left: RealityEncounterIdentityReferences,
  right: RealityEncounterIdentityReferences,
): boolean =>
  left.sourceReferenceId === right.sourceReferenceId &&
  left.starBeastIdentityReferenceId ===
    right.starBeastIdentityReferenceId &&
  left.mansionCoordinateReferenceId ===
    right.mansionCoordinateReferenceId;

const outcomeMatchesAttempt = (
  outcome: RealityLifeSurfaceOutcome | RealityPressureSurfaceOutcome,
  attempt: RealitySurfaceAdmissionAttempt,
): boolean =>
  outcome.identityReferences !== undefined &&
  outcome.intentReferenceId === attempt.intentReferenceId &&
  outcome.encounterCycleId === attempt.encounterCycleId &&
  outcome.intentRevision === attempt.intentRevision &&
  outcome.sourceReferenceId ===
    attempt.identityReferences.sourceReferenceId &&
  identityMatches(
    outcome.identityReferences,
    attempt.identityReferences,
  );

const validTimestamp = (value: string): boolean =>
  Number.isFinite(Date.parse(value));

export function resolveRealitySurfaceAdmissionTransaction(
  input: RealitySurfaceAdmissionTransactionInput,
): RealitySurfaceAdmissionTransactionResult {
  if (input.lifeSurfaceOutcome === null) {
    return Object.freeze({
      status: "PENDING" as const,
      transaction: null,
      reason: "LIFE_SURFACE_OUTCOME_REQUIRED" as const,
    });
  }
  if (input.pressureSurfaceOutcome === null) {
    return Object.freeze({
      status: "PENDING" as const,
      transaction: null,
      reason: "PRESSURE_SURFACE_OUTCOME_REQUIRED" as const,
    });
  }

  const attempt: RealitySurfaceAdmissionAttempt = Object.freeze({
    intentReferenceId: input.admission.intentReferenceId,
    encounterCycleId: input.admission.encounterCycleId,
    intentRevision: input.admission.intentRevision,
    identityReferences: input.admission.identityReferences,
  });
  if (!outcomeMatchesAttempt(input.lifeSurfaceOutcome, attempt)) {
    return Object.freeze({
      status: "REJECTED" as const,
      transaction: null,
      reason: "LIFE_SURFACE_OUTCOME_MISMATCH" as const,
    });
  }
  if (!outcomeMatchesAttempt(input.pressureSurfaceOutcome, attempt)) {
    return Object.freeze({
      status: "REJECTED" as const,
      transaction: null,
      reason: "PRESSURE_SURFACE_OUTCOME_MISMATCH" as const,
    });
  }
  if (
    input.lifeSurfaceOutcome.status !==
      "REALITY_LIFE_SURFACE_PRESENTED" ||
    !validTimestamp(input.lifeSurfaceOutcome.presentedAt)
  ) {
    return Object.freeze({
      status: "REJECTED" as const,
      transaction: null,
      reason: "LIFE_SURFACE_NOT_PRESENTED" as const,
    });
  }
  if (
    input.pressureSurfaceOutcome.status !==
      "REALITY_PRESSURE_SURFACE_PRESENTED" ||
    !validTimestamp(input.pressureSurfaceOutcome.presentedAt) ||
    !Number.isInteger(
      input.pressureSurfaceOutcome.candidateCount,
    ) ||
    input.pressureSurfaceOutcome.candidateCount <= 0 ||
    input.pressureSurfaceOutcome.candidateBundleReferenceId.trim()
      .length === 0
  ) {
    return Object.freeze({
      status: "REJECTED" as const,
      transaction: null,
      reason: "PRESSURE_SURFACE_NOT_PRESENTED" as const,
    });
  }

  const committedAtMilliseconds = Math.max(
    Date.now(),
    Date.parse(input.lifeSurfaceOutcome.presentedAt),
    Date.parse(input.pressureSurfaceOutcome.presentedAt),
  );
  const minimumSurface =
    input.lifeSurfaceOutcome.surfaceMode ===
    "SEMANTIC_STATIC_LIFE_UNIVERSE"
      ? "REALITY_STATIC_LIFE_UNIVERSE_AND_PRESSURE_CANDIDATES"
      : "REALITY_LIFE_UNIVERSE_AND_PRESSURE_CANDIDATES";
  const transaction: RealitySurfaceAdmissionTransaction =
    Object.freeze({
      schemaVersion:
        XINMAI_REALITY_SURFACE_ADMISSION_TRANSACTION_SCHEMA_VERSION,
      source:
        "xinmai_reality_surface_admission_transaction" as const,
      intentReferenceId: input.admission.intentReferenceId,
      encounterCycleId: input.admission.encounterCycleId,
      intentRevision: input.admission.intentRevision,
      identityReferences: Object.freeze({
        ...input.admission.identityReferences,
      }),
      lifeSurfaceOutcome: input.lifeSurfaceOutcome,
      pressureSurfaceOutcome: input.pressureSurfaceOutcome,
      minimumSurface,
      committedAt: new Date(
        committedAtMilliseconds,
      ).toISOString(),
    });
  return Object.freeze({
    status: "READY" as const,
    transaction,
    reason: null,
  });
}

export function isRealitySurfaceAdmissionTransactionValid(
  transaction: RealitySurfaceAdmissionTransaction,
  attempt: RealitySurfaceAdmissionAttempt,
): boolean {
  if (
    transaction.identityReferences === undefined ||
    transaction.lifeSurfaceOutcome === undefined ||
    transaction.pressureSurfaceOutcome === undefined ||
    transaction.schemaVersion !==
      XINMAI_REALITY_SURFACE_ADMISSION_TRANSACTION_SCHEMA_VERSION ||
    transaction.source !==
      "xinmai_reality_surface_admission_transaction" ||
    transaction.intentReferenceId !== attempt.intentReferenceId ||
    transaction.encounterCycleId !== attempt.encounterCycleId ||
    transaction.intentRevision !== attempt.intentRevision ||
    !identityMatches(
      transaction.identityReferences,
      attempt.identityReferences,
    ) ||
    !outcomeMatchesAttempt(
      transaction.lifeSurfaceOutcome,
      attempt,
    ) ||
    !outcomeMatchesAttempt(
      transaction.pressureSurfaceOutcome,
      attempt,
    ) ||
    transaction.lifeSurfaceOutcome.status !==
      "REALITY_LIFE_SURFACE_PRESENTED" ||
    transaction.pressureSurfaceOutcome.status !==
      "REALITY_PRESSURE_SURFACE_PRESENTED" ||
    !Number.isInteger(
      transaction.pressureSurfaceOutcome.candidateCount,
    ) ||
    transaction.pressureSurfaceOutcome.candidateCount <= 0 ||
    transaction.pressureSurfaceOutcome.candidateBundleReferenceId.trim()
      .length === 0 ||
    !validTimestamp(transaction.lifeSurfaceOutcome.presentedAt) ||
    !validTimestamp(transaction.pressureSurfaceOutcome.presentedAt) ||
    !validTimestamp(transaction.committedAt)
  ) {
    return false;
  }

  const expectedMinimumSurface =
    transaction.lifeSurfaceOutcome.surfaceMode ===
    "SEMANTIC_STATIC_LIFE_UNIVERSE"
      ? "REALITY_STATIC_LIFE_UNIVERSE_AND_PRESSURE_CANDIDATES"
      : "REALITY_LIFE_UNIVERSE_AND_PRESSURE_CANDIDATES";
  return (
    transaction.minimumSurface === expectedMinimumSurface &&
    Date.parse(transaction.committedAt) >=
      Date.parse(transaction.lifeSurfaceOutcome.presentedAt) &&
    Date.parse(transaction.committedAt) >=
      Date.parse(transaction.pressureSurfaceOutcome.presentedAt)
  );
}
