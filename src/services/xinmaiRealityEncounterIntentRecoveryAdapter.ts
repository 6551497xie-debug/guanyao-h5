import type {
  RealityEncounterIntent,
  RealityEncounterRecoveryClearResult,
  RealityEncounterRecoveryReadResult,
  RealityEncounterRecoverySnapshot,
  RealityEncounterRecoveryWriteResult,
} from "../types/xinmaiRealityEncounterIntent";
import {
  XINMAI_REALITY_ENCOUNTER_INTENT_SCHEMA_VERSION,
  XINMAI_REALITY_ENCOUNTER_RECOVERY_SCHEMA_VERSION,
} from "../types/xinmaiRealityEncounterIntent";

const RECOVERY_STORAGE_KEY = "xinmaiRealityEncounterIntentRecovery";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const hasOnlyKeys = (
  value: Record<string, unknown>,
  allowedKeys: readonly string[],
): boolean =>
  Object.keys(value).every((key) => allowedKeys.includes(key)) &&
  allowedKeys.every((key) => Object.prototype.hasOwnProperty.call(value, key));

const INTENT_KEYS = Object.freeze([
  "schemaVersion",
  "source",
  "intentReferenceId",
  "encounterCycleId",
  "sourceReferenceId",
  "starBeastIdentityReferenceId",
  "mansionCoordinateReferenceId",
  "origin",
  "qualification",
  "choiceActionIntentionReferenceId",
  "state",
  "routeTarget",
  "issuedAt",
  "updatedAt",
  "expiresAt",
  "revision",
  "failure",
  "terminalReason",
  "provenance",
]);

const FAILURE_STAGES = Object.freeze([
  "RECOVERY",
  "ROUTE_LOAD",
  "ROUTE_AUTHORIZATION",
  "ACTIVATION_SOURCE",
  "CANDIDATE_ACTIVATION",
  "CANDIDATE_REQUEST",
  "DELIVERY",
  "HOST_INPUT",
  "MINIMUM_SURFACE",
]);

const FAILURE_REASONS = Object.freeze([
  "ROUTE_LOAD_UNAVAILABLE",
  "INTENT_NOT_CURRENT",
  "IDENTITY_MISMATCH",
  "INTENT_EXPIRED",
  "ROUTE_AUTHORIZATION_REJECTED",
  "ACTIVATION_SOURCE_UNAVAILABLE",
  "CANDIDATE_ACTIVATION_UNAVAILABLE",
  "CANDIDATE_REQUEST_UNAVAILABLE",
  "DELIVERY_UNAVAILABLE",
  "HOST_INPUT_UNAVAILABLE",
  "MINIMUM_SURFACE_NOT_PRESENTED",
  "HOST_OUTCOME_MISMATCH",
  "RECOVERY_CANDIDATE_INVALID",
  "RECOVERY_STORAGE_UNAVAILABLE",
  "RECOVERY_AFTER_INCOMPLETE_ACCEPTANCE",
]);

const TERMINAL_REASONS = Object.freeze([
  "EXPLICIT_LEAVE",
  "ENCOUNTER_COMPLETED",
  "START_NEW_ENCOUNTER",
  "INTENT_EXPIRED",
  "IDENTITY_MISMATCH",
  "RECOVERY_CANDIDATE_INVALID",
  "USER_DATA_CLEARED",
]);

const getSessionStorage = (): Storage | null => {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
};

const isIntent = (value: unknown): value is RealityEncounterIntent => {
  if (!isRecord(value)) return false;
  const failure = value.failure;
  const failureValid =
    failure === null ||
    (isRecord(failure) &&
      hasOnlyKeys(failure, [
        "stage",
        "reason",
        "failedAt",
        "retryAllowed",
      ]) &&
      typeof failure.stage === "string" &&
      FAILURE_STAGES.includes(failure.stage) &&
      typeof failure.reason === "string" &&
      FAILURE_REASONS.includes(failure.reason) &&
      typeof failure.failedAt === "string" &&
      Number.isFinite(Date.parse(failure.failedAt)) &&
      failure.retryAllowed === true);
  const provenance = value.provenance;
  const provenanceValid =
    isRecord(provenance) &&
    hasOnlyKeys(provenance, [
      "userExplicitRequest",
      "identityAuthority",
      "relationshipAuthority",
      "noGrowthAuthority",
    ]) &&
    provenance.userExplicitRequest === true &&
    provenance.identityAuthority === "EXISTING_RECOGNIZED_LIFE" &&
    provenance.relationshipAuthority ===
      "EXISTING_RELATIONSHIP_RUNTIME" &&
    provenance.noGrowthAuthority === true;
  const terminalReasonValid =
    value.terminalReason === null ||
    (typeof value.terminalReason === "string" &&
      TERMINAL_REASONS.includes(value.terminalReason));
  const failureStateValid =
    value.state === "FAILED_RETRYABLE"
      ? failure !== null
      : failure === null;
  const terminalStateValid =
    value.state === "TERMINAL"
      ? value.terminalReason !== null
      : value.terminalReason === null;
  const qualificationValid =
    value.origin === "CHOICE_CONTINUATION"
      ? value.qualification === "CHOICE_ACTION_INTENTION_COMMITTED" &&
        typeof value.choiceActionIntentionReferenceId === "string" &&
        value.choiceActionIntentionReferenceId.trim().length > 0
      : value.choiceActionIntentionReferenceId === null &&
        (value.qualification === "WHISPER_RESPONSE_SETTLED" ||
          value.qualification === "WHISPER_SKIPPED" ||
          value.qualification ===
            "RESPONSE_UNAVAILABLE_EXPLICITLY_CONTINUED");
  return (
    hasOnlyKeys(value, INTENT_KEYS) &&
    value.schemaVersion ===
      XINMAI_REALITY_ENCOUNTER_INTENT_SCHEMA_VERSION &&
    value.source === "xinmai_reality_encounter_intent_controller" &&
    typeof value.intentReferenceId === "string" &&
    value.intentReferenceId.trim().length > 0 &&
    typeof value.encounterCycleId === "string" &&
    value.encounterCycleId.trim().length > 0 &&
    typeof value.sourceReferenceId === "string" &&
    value.sourceReferenceId.trim().length > 0 &&
    typeof value.starBeastIdentityReferenceId === "string" &&
    value.starBeastIdentityReferenceId.trim().length > 0 &&
    typeof value.mansionCoordinateReferenceId === "string" &&
    value.mansionCoordinateReferenceId.trim().length > 0 &&
    (value.origin === "FIRST_ENCOUNTER" ||
      value.origin === "RETURNING_LIFE_WORLD" ||
      value.origin === "CHOICE_CONTINUATION") &&
    (value.qualification === "WHISPER_RESPONSE_SETTLED" ||
      value.qualification === "WHISPER_SKIPPED" ||
      value.qualification ===
        "RESPONSE_UNAVAILABLE_EXPLICITLY_CONTINUED" ||
      value.qualification === "CHOICE_ACTION_INTENTION_COMMITTED") &&
    (value.choiceActionIntentionReferenceId === null ||
      (typeof value.choiceActionIntentionReferenceId === "string" &&
        value.choiceActionIntentionReferenceId.trim().length > 0)) &&
    (value.state === "READY_TO_ENTER_REALITY" ||
      value.state === "ACCEPTING_REALITY" ||
      value.state === "FAILED_RETRYABLE" ||
      value.state === "ACTIVE_IN_REALITY" ||
      value.state === "RECOVERING" ||
      value.state === "TERMINAL") &&
    value.routeTarget === "/reality" &&
    typeof value.issuedAt === "string" &&
    Number.isFinite(Date.parse(value.issuedAt)) &&
    typeof value.updatedAt === "string" &&
    Number.isFinite(Date.parse(value.updatedAt)) &&
    typeof value.expiresAt === "string" &&
    Number.isFinite(Date.parse(value.expiresAt)) &&
    typeof value.revision === "number" &&
    Number.isInteger(value.revision) &&
    value.revision > 0 &&
    failureValid &&
    provenanceValid &&
    terminalReasonValid &&
    failureStateValid &&
    terminalStateValid &&
    qualificationValid
  );
};

const isSnapshot = (
  value: unknown,
): value is RealityEncounterRecoverySnapshot =>
  isRecord(value) &&
  hasOnlyKeys(value, [
    "schemaVersion",
    "source",
    "intent",
    "writtenAt",
  ]) &&
  value.schemaVersion ===
    XINMAI_REALITY_ENCOUNTER_RECOVERY_SCHEMA_VERSION &&
  value.source === "xinmai_reality_encounter_intent_recovery_adapter" &&
  isIntent(value.intent) &&
  typeof value.writtenAt === "string" &&
  Number.isFinite(Date.parse(value.writtenAt));

const freezeIntent = (
  intent: RealityEncounterIntent,
): RealityEncounterIntent =>
  Object.freeze({
    ...intent,
    failure:
      intent.failure === null
        ? null
        : Object.freeze({ ...intent.failure }),
    provenance: Object.freeze({ ...intent.provenance }),
  });

const createSnapshot = (
  intent: RealityEncounterIntent,
): RealityEncounterRecoverySnapshot =>
  Object.freeze({
    schemaVersion: XINMAI_REALITY_ENCOUNTER_RECOVERY_SCHEMA_VERSION,
    source: "xinmai_reality_encounter_intent_recovery_adapter" as const,
    intent: freezeIntent(intent),
    writtenAt: new Date().toISOString(),
  });

export function writeRealityEncounterRecoveryCandidate(
  intent: RealityEncounterIntent,
): RealityEncounterRecoveryWriteResult {
  const snapshot = createSnapshot(intent);
  const storage = getSessionStorage();
  if (storage === null) {
    return Object.freeze({ status: "UNAVAILABLE" as const, snapshot });
  }
  try {
    storage.setItem(RECOVERY_STORAGE_KEY, JSON.stringify(snapshot));
    const stored = storage.getItem(RECOVERY_STORAGE_KEY);
    if (stored === null) {
      return Object.freeze({ status: "UNCONFIRMED" as const, snapshot });
    }
    const parsed = JSON.parse(stored) as unknown;
    return Object.freeze({
      status:
        isSnapshot(parsed) &&
        parsed.intent.intentReferenceId === intent.intentReferenceId &&
        parsed.intent.encounterCycleId === intent.encounterCycleId &&
        parsed.intent.revision === intent.revision
          ? "CONFIRMED" as const
          : "UNCONFIRMED" as const,
      snapshot,
    });
  } catch {
    return Object.freeze({ status: "UNAVAILABLE" as const, snapshot });
  }
}

export function readRealityEncounterRecoveryCandidate():
  RealityEncounterRecoveryReadResult {
  const storage = getSessionStorage();
  if (storage === null) {
    return Object.freeze({ status: "UNAVAILABLE" as const, snapshot: null });
  }
  try {
    const stored = storage.getItem(RECOVERY_STORAGE_KEY);
    if (stored === null) {
      return Object.freeze({ status: "NOT_FOUND" as const, snapshot: null });
    }
    const parsed = JSON.parse(stored) as unknown;
    if (!isSnapshot(parsed)) {
      return Object.freeze({ status: "CORRUPTED" as const, snapshot: null });
    }
    return Object.freeze({
      status: "FOUND" as const,
      snapshot: Object.freeze({
        ...parsed,
        intent: freezeIntent(parsed.intent),
      }),
    });
  } catch {
    return Object.freeze({ status: "CORRUPTED" as const, snapshot: null });
  }
}

export function clearRealityEncounterRecoveryCandidate(
  intentReferenceId: string,
): RealityEncounterRecoveryClearResult {
  const normalizedReferenceId = intentReferenceId.trim();
  const storage = getSessionStorage();
  if (storage === null) {
    return Object.freeze({
      status: "UNAVAILABLE" as const,
      intentReferenceId: normalizedReferenceId,
    });
  }
  try {
    const current = readRealityEncounterRecoveryCandidate();
    if (
      current.status === "FOUND" &&
      current.snapshot.intent.intentReferenceId !== normalizedReferenceId
    ) {
      return Object.freeze({
        status: "UNCONFIRMED" as const,
        intentReferenceId: normalizedReferenceId,
      });
    }
    storage.removeItem(RECOVERY_STORAGE_KEY);
    return Object.freeze({
      status:
        storage.getItem(RECOVERY_STORAGE_KEY) === null
          ? "CONFIRMED" as const
          : "UNCONFIRMED" as const,
      intentReferenceId: normalizedReferenceId,
    });
  } catch {
    return Object.freeze({
      status: "UNAVAILABLE" as const,
      intentReferenceId: normalizedReferenceId,
    });
  }
}

export const XinmaiRealityEncounterIntentRecoveryAdapter = Object.freeze({
  write: writeRealityEncounterRecoveryCandidate,
  read: readRealityEncounterRecoveryCandidate,
  update: writeRealityEncounterRecoveryCandidate,
  markTerminal: writeRealityEncounterRecoveryCandidate,
  clear: clearRealityEncounterRecoveryCandidate,
});
