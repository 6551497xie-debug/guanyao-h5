import {
  clearRealityEncounterRecoveryCandidate,
  readRealityEncounterRecoveryCandidate,
  writeRealityEncounterRecoveryCandidate,
} from "./xinmaiRealityEncounterIntentRecoveryAdapter";
import type {
  RealityEncounterAdmission,
  RealityEncounterAdmissionRollbackResult,
  RealityEncounterAdmissionResult,
  RealityEncounterCommitResult,
  RealityEncounterFailure,
  RealityEncounterFailureReason,
  RealityEncounterFailureResult,
  RealityEncounterFailureStage,
  RealityEncounterIdentityReferences,
  RealityEncounterIntent,
  RealityEncounterQualification,
  RealityEncounterRequestInput,
  RealityEncounterRequestResult,
  RealityEncounterTerminationCommand,
  RealityEncounterTerminationResult,
  RealityHostAcceptanceOutcome,
} from "../types/xinmaiRealityEncounterIntent";
import {
  XINMAI_REALITY_ENCOUNTER_INTENT_SCHEMA_VERSION,
} from "../types/xinmaiRealityEncounterIntent";
import { isRealitySurfaceAdmissionTransactionValid } from "./xinmaiRealitySurfaceAdmissionTransaction";
import { readRealitySupersessionProof } from "./xinmaiGravityEntryRecoveryAdapter";
import type {
  RealityToGravityCutoverEnvelope,
} from "../types/xinmaiGravityEntryAdmission";

const INTENT_TTL_MS = 2 * 60 * 60 * 1_000;

let currentIntent: RealityEncounterIntent | null = null;

const normalizeIdentityReferences = (
  identity: RealityEncounterIdentityReferences,
): RealityEncounterIdentityReferences | null => {
  const sourceReferenceId = identity.sourceReferenceId.trim();
  const starBeastIdentityReferenceId =
    identity.starBeastIdentityReferenceId.trim();
  const mansionCoordinateReferenceId =
    identity.mansionCoordinateReferenceId.trim();
  if (
    sourceReferenceId.length === 0 ||
    starBeastIdentityReferenceId.length === 0 ||
    mansionCoordinateReferenceId.length === 0
  ) {
    return null;
  }
  return Object.freeze({
    sourceReferenceId,
    starBeastIdentityReferenceId,
    mansionCoordinateReferenceId,
  });
};

const identityMatches = (
  intent: RealityEncounterIntent,
  identity: RealityEncounterIdentityReferences,
): boolean =>
  intent.sourceReferenceId === identity.sourceReferenceId &&
  intent.starBeastIdentityReferenceId ===
    identity.starBeastIdentityReferenceId &&
  intent.mansionCoordinateReferenceId ===
    identity.mansionCoordinateReferenceId;

const qualificationMatchesOrigin = (
  origin: RealityEncounterRequestInput["origin"],
  qualification: RealityEncounterQualification,
): boolean =>
  origin === "CHOICE_CONTINUATION"
    ? qualification === "LIVED_RESPONSE_CONTINUATION"
    : qualification === "WHISPER_RESPONSE_SETTLED" ||
      qualification === "WHISPER_SKIPPED" ||
      qualification === "RESPONSE_UNAVAILABLE_EXPLICITLY_CONTINUED";

const opaqueId = (): string => {
  const randomUuid =
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Math.random().toString(36).slice(2)}-${Math.random()
          .toString(36)
          .slice(2)}`;
  return randomUuid;
};

const persist = (
  intent: RealityEncounterIntent,
): "CONFIRMED" | "CURRENT_RUNTIME_ONLY" => {
  const result = writeRealityEncounterRecoveryCandidate(intent);
  return result.status === "CONFIRMED"
    ? "CONFIRMED"
    : "CURRENT_RUNTIME_ONLY";
};

const nextIntent = (
  intent: RealityEncounterIntent,
  patch: Partial<
    Pick<
      RealityEncounterIntent,
      "state" | "failure" | "terminalReason"
    >
  >,
): RealityEncounterIntent => {
  const updated = Object.freeze({
    ...intent,
    ...patch,
    updatedAt: new Date().toISOString(),
    revision: intent.revision + 1,
  });
  currentIntent = updated;
  persist(updated);
  return updated;
};

const createNextIntent = (
  intent: RealityEncounterIntent,
  patch: Partial<
    Pick<
      RealityEncounterIntent,
      "state" | "failure" | "terminalReason"
    >
  >,
): RealityEncounterIntent =>
  Object.freeze({
    ...intent,
    ...patch,
    updatedAt: new Date().toISOString(),
    revision: intent.revision + 1,
  });

const commitIntentWithConfirmedRecovery = (
  previous: RealityEncounterIntent,
  candidate: RealityEncounterIntent,
): boolean => {
  const writeResult =
    writeRealityEncounterRecoveryCandidate(candidate);
  if (writeResult.status === "CONFIRMED") {
    currentIntent = candidate;
    return true;
  }

  // Admission is not authoritative until its recovery candidate is confirmed.
  // Restore the last confirmed fact best-effort and keep the Runtime on it.
  writeRealityEncounterRecoveryCandidate(previous);
  currentIntent = previous;
  return false;
};

const isExpired = (intent: RealityEncounterIntent): boolean => {
  const now = Date.now();
  const issuedAt = Date.parse(intent.issuedAt);
  const declaredExpiry = Date.parse(intent.expiresAt);
  if (
    !Number.isFinite(issuedAt) ||
    !Number.isFinite(declaredExpiry) ||
    issuedAt > now ||
    declaredExpiry <= issuedAt
  ) {
    return true;
  }
  return Math.min(declaredExpiry, issuedAt + INTENT_TTL_MS) <= now;
};

const createAdmission = (
  intent: RealityEncounterIntent,
): RealityEncounterAdmission =>
  Object.freeze({
    schemaVersion: "XINMAI_REALITY_ENCOUNTER_ADMISSION_V1" as const,
    source: "xinmai_reality_encounter_intent_controller" as const,
    intentReferenceId: intent.intentReferenceId,
    encounterCycleId: intent.encounterCycleId,
    intentRevision: intent.revision,
    state: "ACCEPTING_REALITY" as const,
    routeTarget: "/reality" as const,
    origin: intent.origin,
    qualification: intent.qualification,
    identityReferences: Object.freeze({
      sourceReferenceId: intent.sourceReferenceId,
      starBeastIdentityReferenceId:
        intent.starBeastIdentityReferenceId,
      mansionCoordinateReferenceId:
        intent.mansionCoordinateReferenceId,
    }),
    expiresAt: intent.expiresAt,
  });

const admissionReady = (
  operation: "ADMIT" | "RETRY" | "RECOVER",
  intent: RealityEncounterIntent,
): RealityEncounterAdmissionResult =>
  Object.freeze({
    status: "READY" as const,
    operation,
    admission: createAdmission(intent),
    intent,
    reason: null,
  });

const admissionBlocked = (
  status: "RETRY_REQUIRED" | "BLOCKED",
  operation: "ADMIT" | "RETRY" | "RECOVER",
  reason: Extract<
    RealityEncounterAdmissionResult,
    { status: "RETRY_REQUIRED" | "BLOCKED" }
  >["reason"],
  intent: RealityEncounterIntent | null = currentIntent,
): RealityEncounterAdmissionResult =>
  Object.freeze({
    status,
    operation,
    admission: null,
    intent,
    reason,
  });

const expireCurrentIntent = (
  intent: RealityEncounterIntent,
): RealityEncounterAdmissionResult => {
  const terminal = nextIntent(intent, {
    state: "TERMINAL",
    failure: null,
    terminalReason: "INTENT_EXPIRED",
  });
  return admissionBlocked(
    "BLOCKED",
    "ADMIT",
    "INTENT_EXPIRED",
    terminal,
  );
};

export function requestRealityEncounter(
  input: RealityEncounterRequestInput,
): RealityEncounterRequestResult {
  const identity = normalizeIdentityReferences(input.identityReferences);
  if (identity === null) {
    return Object.freeze({
      status: "BLOCKED" as const,
      operation: "REQUEST" as const,
      intent: currentIntent,
      persistence: null,
      reason: "IDENTITY_REFERENCES_INVALID" as const,
    });
  }
  if (!qualificationMatchesOrigin(input.origin, input.qualification)) {
    return Object.freeze({
      status: "BLOCKED" as const,
      operation: "REQUEST" as const,
      intent: currentIntent,
      persistence: null,
      reason: "QUALIFICATION_NOT_ALLOWED_FOR_ORIGIN" as const,
    });
  }

  if (currentIntent !== null && currentIntent.state !== "TERMINAL") {
    if (!identityMatches(currentIntent, identity)) {
      return Object.freeze({
        status: "BLOCKED" as const,
        operation: "REQUEST" as const,
        intent: currentIntent,
        persistence: null,
        reason: "CURRENT_IDENTITY_MISMATCH" as const,
      });
    }
    if (
      currentIntent.state === "READY_TO_ENTER_REALITY" &&
      currentIntent.origin === input.origin &&
      currentIntent.qualification === input.qualification
    ) {
      return Object.freeze({
        status: "READY" as const,
        operation: "REQUEST" as const,
        intent: currentIntent,
        persistence: persist(currentIntent),
        reason: null,
      });
    }
    if (currentIntent.state === "FAILED_RETRYABLE") {
      const retry = retryRealityEncounterAcceptance({
        intentReferenceId: currentIntent.intentReferenceId,
        identityReferences: identity,
      });
      if (retry.status === "READY") {
        return Object.freeze({
          status: "READY" as const,
          operation: "REQUEST" as const,
          intent: retry.intent,
          persistence: persist(retry.intent),
          reason: null,
        });
      }
    }
    return Object.freeze({
      status: "BLOCKED" as const,
      operation: "REQUEST" as const,
      intent: currentIntent,
      persistence: null,
      reason: "ENCOUNTER_ALREADY_ACTIVE" as const,
    });
  }

  // Recovery lifetime begins when the Controller accepts the explicit request.
  // A producer-provided timestamp must never extend the recovery window.
  const issuedAt = new Date().toISOString();
  const intent: RealityEncounterIntent = Object.freeze({
    schemaVersion: XINMAI_REALITY_ENCOUNTER_INTENT_SCHEMA_VERSION,
    source: "xinmai_reality_encounter_intent_controller" as const,
    intentReferenceId: `reality-intent:${opaqueId()}`,
    encounterCycleId: `reality-encounter:${opaqueId()}`,
    ...identity,
    origin: input.origin,
    qualification: input.qualification,
    state: "READY_TO_ENTER_REALITY" as const,
    routeTarget: "/reality" as const,
    issuedAt,
    updatedAt: issuedAt,
    expiresAt: new Date(
      Date.parse(issuedAt) + INTENT_TTL_MS,
    ).toISOString(),
    revision: 1,
    failure: null,
    terminalReason: null,
    provenance: Object.freeze({
      userExplicitRequest: true as const,
      identityAuthority: "EXISTING_RECOGNIZED_LIFE" as const,
      relationshipAuthority:
        "EXISTING_RELATIONSHIP_RUNTIME" as const,
      noGrowthAuthority: true as const,
    }),
  });
  currentIntent = intent;
  const persistence = persist(intent);
  return Object.freeze({
    status: "READY" as const,
    operation: "REQUEST" as const,
    intent,
    persistence,
    reason: null,
  });
}

const recoverIntent = (
  requestedIntentReferenceId: string | null,
  identity: RealityEncounterIdentityReferences,
): RealityEncounterAdmissionResult => {
  const recovery = readRealityEncounterRecoveryCandidate();
  if (recovery.status !== "FOUND") {
    return admissionBlocked(
      "BLOCKED",
      "RECOVER",
      recovery.status === "CORRUPTED"
        ? "RECOVERY_CANDIDATE_INVALID"
        : "RECOVERY_CANDIDATE_NOT_FOUND",
      null,
    );
  }
  const candidate = recovery.snapshot.intent;
  const supersession = readRealitySupersessionProof({
    intentReferenceId: candidate.intentReferenceId,
    encounterCycleId: candidate.encounterCycleId,
    identityReferences: Object.freeze({
      sourceReferenceId: candidate.sourceReferenceId,
      starBeastIdentityReferenceId:
        candidate.starBeastIdentityReferenceId,
      mansionCoordinateReferenceId:
        candidate.mansionCoordinateReferenceId,
    }),
  });
  if (supersession.status === "SUPERSEDED") {
    clearRealityEncounterRecoveryCandidate(candidate.intentReferenceId);
    currentIntent = null;
    return admissionBlocked(
      "BLOCKED",
      "RECOVER",
      "INTENT_STATE_NOT_ADMISSIBLE",
      null,
    );
  }
  if (
    (requestedIntentReferenceId !== null &&
      candidate.intentReferenceId !== requestedIntentReferenceId) ||
    !identityMatches(candidate, identity)
  ) {
    currentIntent = Object.freeze({
      ...candidate,
      state: "TERMINAL" as const,
      updatedAt: new Date().toISOString(),
      revision: candidate.revision + 1,
      failure: null,
      terminalReason: "IDENTITY_MISMATCH" as const,
    });
    persist(currentIntent);
    return admissionBlocked(
      "BLOCKED",
      "RECOVER",
      "IDENTITY_MISMATCH",
      currentIntent,
    );
  }
  if (isExpired(candidate)) {
    currentIntent = candidate;
    return expireCurrentIntent(candidate);
  }

  if (candidate.state === "ACTIVE_IN_REALITY") {
    const accepting = createNextIntent(candidate, {
      state: "ACCEPTING_REALITY",
      failure: null,
      terminalReason: null,
    });
    if (!commitIntentWithConfirmedRecovery(candidate, accepting)) {
      return admissionBlocked(
        "BLOCKED",
        "RECOVER",
        "RECOVERY_STORAGE_UNAVAILABLE",
        candidate,
      );
    }
    return admissionReady("RECOVER", accepting);
  }

  if (
    candidate.state === "READY_TO_ENTER_REALITY" ||
    candidate.state === "ACCEPTING_REALITY" ||
    candidate.state === "FAILED_RETRYABLE" ||
    candidate.state === "RECOVERING"
  ) {
    const now = new Date().toISOString();
    currentIntent = Object.freeze({
      ...candidate,
      state: "FAILED_RETRYABLE" as const,
      updatedAt: now,
      revision: candidate.revision + 1,
      failure: Object.freeze({
        stage: "RECOVERY" as const,
        reason: "RECOVERY_AFTER_INCOMPLETE_ACCEPTANCE" as const,
        failedAt: now,
        retryAllowed: true as const,
      }),
      terminalReason: null,
    });
    persist(currentIntent);
    return admissionBlocked(
      "RETRY_REQUIRED",
      "RECOVER",
      "RETRY_NOT_AVAILABLE",
      currentIntent,
    );
  }

  currentIntent = candidate;
  return admissionBlocked(
    "BLOCKED",
    "RECOVER",
    "INTENT_STATE_NOT_ADMISSIBLE",
    candidate,
  );
};

export function establishRealityEncounterAdmission(input: Readonly<{
  intentReferenceId: string | null;
  identityReferences: RealityEncounterIdentityReferences;
}>): RealityEncounterAdmissionResult {
  const identity = normalizeIdentityReferences(input.identityReferences);
  if (identity === null) {
    return admissionBlocked(
      "BLOCKED",
      "ADMIT",
      "IDENTITY_MISMATCH",
      currentIntent,
    );
  }
  const requestedIntentReferenceId =
    input.intentReferenceId?.trim() || null;
  if (currentIntent === null) {
    return recoverIntent(requestedIntentReferenceId, identity);
  }
  if (
    requestedIntentReferenceId !== null &&
    currentIntent.intentReferenceId !== requestedIntentReferenceId
  ) {
    return admissionBlocked(
      "BLOCKED",
      "ADMIT",
      "INTENT_NOT_CURRENT",
    );
  }
  if (!identityMatches(currentIntent, identity)) {
    return admissionBlocked(
      "BLOCKED",
      "ADMIT",
      "IDENTITY_MISMATCH",
    );
  }
  if (isExpired(currentIntent)) {
    return expireCurrentIntent(currentIntent);
  }

  if (currentIntent.state === "READY_TO_ENTER_REALITY") {
    const previous = currentIntent;
    const accepting = createNextIntent(previous, {
      state: "ACCEPTING_REALITY",
      failure: null,
      terminalReason: null,
    });
    if (!commitIntentWithConfirmedRecovery(previous, accepting)) {
      return admissionBlocked(
        "BLOCKED",
        "ADMIT",
        "RECOVERY_STORAGE_UNAVAILABLE",
        previous,
      );
    }
    return admissionReady("ADMIT", accepting);
  }
  if (currentIntent.state === "ACCEPTING_REALITY") {
    return admissionReady("ADMIT", currentIntent);
  }
  if (currentIntent.state === "FAILED_RETRYABLE") {
    return admissionBlocked(
      "RETRY_REQUIRED",
      "ADMIT",
      "RETRY_NOT_AVAILABLE",
    );
  }
  if (currentIntent.state === "RECOVERING") {
    const previous = currentIntent;
    const accepting = createNextIntent(previous, {
      state: "ACCEPTING_REALITY",
      failure: null,
      terminalReason: null,
    });
    if (!commitIntentWithConfirmedRecovery(previous, accepting)) {
      return admissionBlocked(
        "BLOCKED",
        "RECOVER",
        "RECOVERY_STORAGE_UNAVAILABLE",
        previous,
      );
    }
    return admissionReady("RECOVER", accepting);
  }
  if (currentIntent.state === "ACTIVE_IN_REALITY") {
    const previous = currentIntent;
    const accepting = createNextIntent(previous, {
      state: "ACCEPTING_REALITY",
      failure: null,
      terminalReason: null,
    });
    if (!commitIntentWithConfirmedRecovery(previous, accepting)) {
      return admissionBlocked(
        "BLOCKED",
        "RECOVER",
        "RECOVERY_STORAGE_UNAVAILABLE",
        previous,
      );
    }
    return admissionReady("RECOVER", accepting);
  }
  return admissionBlocked(
    "BLOCKED",
    "ADMIT",
    "INTENT_STATE_NOT_ADMISSIBLE",
  );
}

export function retryRealityEncounterAcceptance(input: Readonly<{
  intentReferenceId: string;
  identityReferences?: RealityEncounterIdentityReferences;
}>): RealityEncounterAdmissionResult {
  if (
    currentIntent === null ||
    currentIntent.intentReferenceId !== input.intentReferenceId
  ) {
    return admissionBlocked(
      "BLOCKED",
      "RETRY",
      "INTENT_NOT_CURRENT",
    );
  }
  if (
    input.identityReferences &&
    !identityMatches(currentIntent, input.identityReferences)
  ) {
    return admissionBlocked(
      "BLOCKED",
      "RETRY",
      "IDENTITY_MISMATCH",
    );
  }
  if (currentIntent.state !== "FAILED_RETRYABLE") {
    return admissionBlocked(
      "BLOCKED",
      "RETRY",
      "RETRY_NOT_AVAILABLE",
    );
  }
  if (isExpired(currentIntent)) {
    return expireCurrentIntent(currentIntent);
  }
  const previous = currentIntent;
  const accepting = createNextIntent(previous, {
    state: "ACCEPTING_REALITY",
    failure: null,
    terminalReason: null,
  });
  if (!commitIntentWithConfirmedRecovery(previous, accepting)) {
    return admissionBlocked(
      "BLOCKED",
      "RETRY",
      "RECOVERY_STORAGE_UNAVAILABLE",
      previous,
    );
  }
  return admissionReady("RETRY", accepting);
}

export function rollbackRealityEncounterAdmission(input: Readonly<{
  admission: RealityEncounterAdmission;
}>): RealityEncounterAdmissionRollbackResult {
  const admission = input.admission;
  if (
    currentIntent === null ||
    currentIntent.intentReferenceId !== admission.intentReferenceId ||
    currentIntent.encounterCycleId !== admission.encounterCycleId ||
    currentIntent.revision !== admission.intentRevision
  ) {
    return Object.freeze({
      status: "REJECTED" as const,
      operation: "ROLLBACK_ADMISSION" as const,
      intent: currentIntent,
      reason: "INTENT_NOT_CURRENT" as const,
    });
  }
  if (currentIntent.state !== "ACCEPTING_REALITY") {
    return Object.freeze({
      status: "REJECTED" as const,
      operation: "ROLLBACK_ADMISSION" as const,
      intent: currentIntent,
      reason: "INTENT_STATE_NOT_ACCEPTING" as const,
    });
  }

  const accepting = currentIntent;
  const ready = createNextIntent(accepting, {
    state: "READY_TO_ENTER_REALITY",
    failure: null,
    terminalReason: null,
  });
  if (!commitIntentWithConfirmedRecovery(accepting, ready)) {
    return Object.freeze({
      status: "REJECTED" as const,
      operation: "ROLLBACK_ADMISSION" as const,
      intent: currentIntent,
      reason: "RECOVERY_STORAGE_UNAVAILABLE" as const,
    });
  }
  return Object.freeze({
    status: "ROLLED_BACK" as const,
    operation: "ROLLBACK_ADMISSION" as const,
    intent: ready,
    reason: null,
  });
}

export function failRealityEncounterAcceptance(input: Readonly<{
  intentReferenceId: string;
  encounterCycleId: string;
  intentRevision: number;
  stage: RealityEncounterFailureStage;
  reason: RealityEncounterFailureReason;
}>): RealityEncounterFailureResult {
  if (
    currentIntent === null ||
    currentIntent.intentReferenceId !== input.intentReferenceId ||
    currentIntent.encounterCycleId !== input.encounterCycleId ||
    currentIntent.revision !== input.intentRevision
  ) {
    return Object.freeze({
      status: "REJECTED" as const,
      operation: "FAIL_ACCEPTANCE" as const,
      intent: currentIntent,
      reason: "INTENT_NOT_CURRENT" as const,
    });
  }
  if (
    currentIntent.state !== "READY_TO_ENTER_REALITY" &&
    currentIntent.state !== "ACCEPTING_REALITY" &&
    currentIntent.state !== "RECOVERING"
  ) {
    return Object.freeze({
      status: "REJECTED" as const,
      operation: "FAIL_ACCEPTANCE" as const,
      intent: currentIntent,
      reason: "INTENT_STATE_NOT_FAILABLE" as const,
    });
  }
  const failure: RealityEncounterFailure = Object.freeze({
    stage: input.stage,
    reason: input.reason,
    failedAt: new Date().toISOString(),
    retryAllowed: true as const,
  });
  const failed = nextIntent(currentIntent, {
    state: "FAILED_RETRYABLE",
    failure,
    terminalReason: null,
  });
  return Object.freeze({
    status: "FAILED_RETRYABLE" as const,
    operation: "FAIL_ACCEPTANCE" as const,
    intent: failed,
    reason: input.reason,
  });
}

export function commitRealityEncounterActive(
  outcome: RealityHostAcceptanceOutcome,
): RealityEncounterCommitResult {
  if (
    currentIntent === null ||
    currentIntent.intentReferenceId !== outcome.intentReferenceId ||
    currentIntent.encounterCycleId !== outcome.encounterCycleId ||
    currentIntent.revision !== outcome.intentRevision
  ) {
    return Object.freeze({
      status: "REJECTED" as const,
      operation: "COMMIT_ACTIVE" as const,
      intent: currentIntent,
      reason: "HOST_OUTCOME_MISMATCH" as const,
    });
  }
  if (currentIntent.state !== "ACCEPTING_REALITY") {
    return Object.freeze({
      status: "REJECTED" as const,
      operation: "COMMIT_ACTIVE" as const,
      intent: currentIntent,
      reason: "INTENT_STATE_NOT_ACCEPTING" as const,
    });
  }
  if (currentIntent.sourceReferenceId !== outcome.sourceReferenceId) {
    return Object.freeze({
      status: "REJECTED" as const,
      operation: "COMMIT_ACTIVE" as const,
      intent: currentIntent,
      reason: "IDENTITY_MISMATCH" as const,
    });
  }
  if (isExpired(currentIntent)) {
    expireCurrentIntent(currentIntent);
    return Object.freeze({
      status: "REJECTED" as const,
      operation: "COMMIT_ACTIVE" as const,
      intent: currentIntent,
      reason: "INTENT_EXPIRED" as const,
    });
  }
  if (outcome.status !== "REALITY_MINIMUM_PRESENTED") {
    failRealityEncounterAcceptance({
      intentReferenceId: outcome.intentReferenceId,
      encounterCycleId: outcome.encounterCycleId,
      intentRevision: outcome.intentRevision,
      stage: "MINIMUM_SURFACE",
      reason: "MINIMUM_SURFACE_NOT_PRESENTED",
    });
    return Object.freeze({
      status: "REJECTED" as const,
      operation: "COMMIT_ACTIVE" as const,
      intent: currentIntent,
      reason: "HOST_OUTCOME_MISMATCH" as const,
    });
  }
  if (
    outcome.transaction === undefined ||
    outcome.committedAt !== outcome.transaction.committedAt ||
    outcome.presentedSurface !==
      outcome.transaction.minimumSurface ||
    !isRealitySurfaceAdmissionTransactionValid(
      outcome.transaction,
      Object.freeze({
        intentReferenceId: currentIntent.intentReferenceId,
        encounterCycleId: currentIntent.encounterCycleId,
        intentRevision: currentIntent.revision,
        identityReferences: Object.freeze({
          sourceReferenceId: currentIntent.sourceReferenceId,
          starBeastIdentityReferenceId:
            currentIntent.starBeastIdentityReferenceId,
          mansionCoordinateReferenceId:
            currentIntent.mansionCoordinateReferenceId,
        }),
      }),
    )
  ) {
    failRealityEncounterAcceptance({
      intentReferenceId: outcome.intentReferenceId,
      encounterCycleId: outcome.encounterCycleId,
      intentRevision: outcome.intentRevision,
      stage: "MINIMUM_SURFACE",
      reason: "HOST_OUTCOME_MISMATCH",
    });
    return Object.freeze({
      status: "REJECTED" as const,
      operation: "COMMIT_ACTIVE" as const,
      intent: currentIntent,
      reason: "HOST_OUTCOME_MISMATCH" as const,
    });
  }
  const active = nextIntent(currentIntent, {
    state: "ACTIVE_IN_REALITY",
    failure: null,
    terminalReason: null,
  });
  return Object.freeze({
    status: "ACTIVE" as const,
    operation: "COMMIT_ACTIVE" as const,
    intent: active,
    reason: null,
  });
}

export function terminateRealityEncounter(
  command: RealityEncounterTerminationCommand,
): RealityEncounterTerminationResult {
  if (currentIntent === null) {
    return Object.freeze({
      status: "NOT_ACTIVE" as const,
      operation: "TERMINATE" as const,
      intent: null,
      reason: "NO_CURRENT_INTENT" as const,
    });
  }
  if (currentIntent.state === "TERMINAL") {
    return Object.freeze({
      status: "NOT_ACTIVE" as const,
      operation: "TERMINATE" as const,
      intent: currentIntent,
      reason: "INTENT_ALREADY_TERMINAL" as const,
    });
  }
  if (currentIntent.intentReferenceId !== command.intentReferenceId) {
    return Object.freeze({
      status: "REJECTED_STALE" as const,
      operation: "TERMINATE" as const,
      intent: currentIntent,
      reason: "INTENT_REFERENCE_MISMATCH" as const,
    });
  }
  if (currentIntent.encounterCycleId !== command.encounterCycleId) {
    return Object.freeze({
      status: "REJECTED_STALE" as const,
      operation: "TERMINATE" as const,
      intent: currentIntent,
      reason: "ENCOUNTER_CYCLE_MISMATCH" as const,
    });
  }
  if (currentIntent.revision !== command.expectedIntentRevision) {
    return Object.freeze({
      status: "REJECTED_STALE" as const,
      operation: "TERMINATE" as const,
      intent: currentIntent,
      reason: "INTENT_REVISION_MISMATCH" as const,
    });
  }
  if (!identityMatches(currentIntent, command.identityReferences)) {
    return Object.freeze({
      status: "REJECTED_STALE" as const,
      operation: "TERMINATE" as const,
      intent: currentIntent,
      reason: "IDENTITY_MISMATCH" as const,
    });
  }
  if (
    currentIntent.terminalReason !== null &&
    currentIntent.terminalReason !== command.terminalReason
  ) {
    return Object.freeze({
      status: "REJECTED_STALE" as const,
      operation: "TERMINATE" as const,
      intent: currentIntent,
      reason: "TERMINAL_REASON_CONFLICT" as const,
    });
  }

  const previous = currentIntent;
  const terminal = createNextIntent(previous, {
    state: "TERMINAL",
    failure: null,
    terminalReason: command.terminalReason,
  });
  const clearResult = clearRealityEncounterRecoveryCandidate(
    terminal.intentReferenceId,
  );
  if (clearResult.status !== "CONFIRMED") {
    currentIntent = previous;
    return Object.freeze({
      status: "TERMINATION_RETRYABLE" as const,
      operation: "TERMINATE" as const,
      intent: previous,
      reason:
        clearResult.status === "UNAVAILABLE"
          ? "RECOVERY_CLEAR_UNAVAILABLE" as const
          : "RECOVERY_CLEAR_UNCONFIRMED" as const,
    });
  }
  currentIntent = null;
  return Object.freeze({
    status: "TERMINATED" as const,
    operation: "TERMINATE" as const,
    intent: terminal,
    reason: command.terminalReason,
  });
}

export function commitRealityEncounterGravitySupersession(
  envelope: RealityToGravityCutoverEnvelope,
):
  | Readonly<{
      status: "SUPERSEDED";
      terminalIntent: RealityEncounterIntent;
      cleanup:
        | "SOURCE_RECOVERY_CLEARED"
        | "SOURCE_RECOVERY_SUPERSEDED_PENDING_CLEANUP";
      reason: null;
    }>
  | Readonly<{
      status: "REJECTED_STALE";
      terminalIntent: null;
      cleanup: null;
      reason:
        | "NO_CURRENT_INTENT"
        | "INTENT_NOT_ACTIVE"
        | "INTENT_REFERENCE_MISMATCH"
        | "ENCOUNTER_CYCLE_MISMATCH"
        | "INTENT_REVISION_MISMATCH"
        | "IDENTITY_MISMATCH"
        | "CUTOVER_PROOF_MISMATCH";
    }> {
  const proof = envelope.sourceReality.terminalProof;
  if (currentIntent === null) {
    return Object.freeze({
      status: "REJECTED_STALE" as const,
      terminalIntent: null,
      cleanup: null,
      reason: "NO_CURRENT_INTENT" as const,
    });
  }
  if (currentIntent.state !== "ACTIVE_IN_REALITY") {
    return Object.freeze({
      status: "REJECTED_STALE" as const,
      terminalIntent: null,
      cleanup: null,
      reason: "INTENT_NOT_ACTIVE" as const,
    });
  }
  if (currentIntent.intentReferenceId !== proof.intentReferenceId) {
    return Object.freeze({
      status: "REJECTED_STALE" as const,
      terminalIntent: null,
      cleanup: null,
      reason: "INTENT_REFERENCE_MISMATCH" as const,
    });
  }
  if (currentIntent.encounterCycleId !== proof.encounterCycleId) {
    return Object.freeze({
      status: "REJECTED_STALE" as const,
      terminalIntent: null,
      cleanup: null,
      reason: "ENCOUNTER_CYCLE_MISMATCH" as const,
    });
  }
  if (currentIntent.revision !== proof.intentRevision) {
    return Object.freeze({
      status: "REJECTED_STALE" as const,
      terminalIntent: null,
      cleanup: null,
      reason: "INTENT_REVISION_MISMATCH" as const,
    });
  }
  if (
    !identityMatches(
      currentIntent,
      envelope.sourceReality.identityReferences,
    )
  ) {
    return Object.freeze({
      status: "REJECTED_STALE" as const,
      terminalIntent: null,
      cleanup: null,
      reason: "IDENTITY_MISMATCH" as const,
    });
  }
  if (
    proof.sourceState !== "ACTIVE_IN_REALITY" ||
    proof.activeConfirmed !== true ||
    proof.terminalReason !== "ENCOUNTER_COMPLETED" ||
    proof.cutoverMeaning !== "SUPERSEDED_BY_GRAVITY_TRANSFER" ||
    envelope.sourceReality.supersededByGravityTransfer !== true
  ) {
    return Object.freeze({
      status: "REJECTED_STALE" as const,
      terminalIntent: null,
      cleanup: null,
      reason: "CUTOVER_PROOF_MISMATCH" as const,
    });
  }

  const terminalIntent = createNextIntent(currentIntent, {
    state: "TERMINAL",
    failure: null,
    terminalReason: "ENCOUNTER_COMPLETED",
  });
  const clear = clearRealityEncounterRecoveryCandidate(
    currentIntent.intentReferenceId,
  );
  currentIntent = null;
  return Object.freeze({
    status: "SUPERSEDED" as const,
    terminalIntent,
    cleanup:
      clear.status === "CONFIRMED"
        ? "SOURCE_RECOVERY_CLEARED" as const
        : "SOURCE_RECOVERY_SUPERSEDED_PENDING_CLEANUP" as const,
    reason: null,
  });
}

export function readCurrentRealityEncounterIntent():
  RealityEncounterIntent | null {
  return currentIntent;
}

export const XinmaiRealityEncounterIntentController = Object.freeze({
  requestEncounter: requestRealityEncounter,
  establishAdmission: establishRealityEncounterAdmission,
  retryCurrentEncounter: retryRealityEncounterAcceptance,
  rollbackAdmission: rollbackRealityEncounterAdmission,
  commitActive: commitRealityEncounterActive,
  failAcceptance: failRealityEncounterAcceptance,
  terminateCurrentEncounter: terminateRealityEncounter,
  commitGravitySupersession:
    commitRealityEncounterGravitySupersession,
  readCurrentIntent: readCurrentRealityEncounterIntent,
});
