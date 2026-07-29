import type {
  GravityEntryAdmission,
  GravityEntryRecoveryClearResult,
  GravityEntryRecoveryReadResult,
  GravityEntryRecoverySnapshot,
  GravityEntryRecoveryWriteResult,
  RealityToGravityCutoverEnvelope,
} from "../types/xinmaiGravityEntryAdmission";
import {
  XINMAI_GRAVITY_ENTRY_ADMISSION_SCHEMA_VERSION,
  XINMAI_GRAVITY_ENTRY_RECOVERY_SCHEMA_VERSION,
  XINMAI_REALITY_TO_GRAVITY_CUTOVER_SCHEMA_VERSION,
} from "../types/xinmaiGravityEntryAdmission";
import type {
  RealityEncounterIdentityReferences,
} from "../types/xinmaiRealityEncounterIntent";

const GRAVITY_ENTRY_RECOVERY_STORAGE_KEY =
  "xinmaiRealityToGravityCutoverRecovery";
const GRAVITY_ENTRY_TTL_MS = 2 * 60 * 60 * 1_000;

const getSessionStorage = (): Storage | null => {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const validText = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const validTimestamp = (value: unknown): value is string =>
  typeof value === "string" && Number.isFinite(Date.parse(value));

const identityMatches = (
  left: RealityEncounterIdentityReferences,
  right: RealityEncounterIdentityReferences,
): boolean =>
  left.sourceReferenceId === right.sourceReferenceId &&
  left.starBeastIdentityReferenceId ===
    right.starBeastIdentityReferenceId &&
  left.mansionCoordinateReferenceId ===
    right.mansionCoordinateReferenceId;

const isIdentityReferences = (
  value: unknown,
): value is RealityEncounterIdentityReferences =>
  isRecord(value) &&
  validText(value.sourceReferenceId) &&
  validText(value.starBeastIdentityReferenceId) &&
  validText(value.mansionCoordinateReferenceId);

const isAdmission = (value: unknown): value is GravityEntryAdmission => {
  if (
    !isRecord(value) ||
    value.schemaVersion !== XINMAI_GRAVITY_ENTRY_ADMISSION_SCHEMA_VERSION ||
    value.source !==
      "reality_to_gravity_entry_admission_controller" ||
    !validText(value.admissionReferenceId) ||
    !validText(value.gravityCycleId) ||
    !Number.isInteger(value.revision) ||
    Number(value.revision) < 1 ||
    value.routeTarget !== "/dynamics" ||
    !isIdentityReferences(value.identityReferences) ||
    !validTimestamp(value.issuedAt) ||
    !validTimestamp(value.updatedAt) ||
    !validTimestamp(value.expiresAt) ||
    !isRecord(value.sourceReality) ||
    !isRecord(value.currentPressure) ||
    !isRecord(value.bodyApproach) ||
    !isRecord(value.provenance)
  ) {
    return false;
  }
  if (
    value.state !== "TRANSFER_PREPARED" &&
    value.state !== "READY_TO_ENTER_GRAVITY" &&
    value.state !== "ACCEPTING_GRAVITY" &&
    value.state !== "FAILED_RETRYABLE" &&
    value.state !== "ACTIVE_IN_GRAVITY" &&
    value.state !== "TERMINAL"
  ) {
    return false;
  }
  const issuedAt = Date.parse(value.issuedAt);
  const expiresAt = Date.parse(value.expiresAt);
  if (
    expiresAt <= issuedAt ||
    expiresAt > issuedAt + GRAVITY_ENTRY_TTL_MS
  ) {
    return false;
  }
  return (
    value.sourceReality.sourceState === "ACTIVE_IN_REALITY" &&
    value.sourceReality.activeConfirmed === true &&
    value.sourceReality.terminalReason === "ENCOUNTER_COMPLETED" &&
    value.sourceReality.cutoverMeaning ===
      "SUPERSEDED_BY_GRAVITY_TRANSFER" &&
    value.currentPressure.gravityReadiness === "READY" &&
    value.currentPressure.userRecognitionConfirmed === true &&
    value.currentPressure.sourceReferenceId ===
      value.identityReferences.sourceReferenceId &&
    value.bodyApproach.bodyApproachConfirmed === true &&
    value.bodyApproach.sourceReferenceId ===
      value.identityReferences.sourceReferenceId &&
    value.bodyApproach.encounterCycleId ===
      value.sourceReality.encounterCycleId &&
    value.provenance.userExplicitRequest === true &&
    value.provenance.noIdentityMutation === true &&
    value.provenance.noLegacyDynamicsAuthority === true &&
    (value.state === "FAILED_RETRYABLE"
      ? value.failure !== null
      : value.failure === null) &&
    (value.state === "TERMINAL"
      ? value.terminalReason !== null
      : value.terminalReason === null)
  );
};

const isEnvelope = (
  value: unknown,
): value is RealityToGravityCutoverEnvelope => {
  if (
    !isRecord(value) ||
    value.schemaVersion !==
      XINMAI_REALITY_TO_GRAVITY_CUTOVER_SCHEMA_VERSION ||
    value.source !== "xinmai_gravity_entry_recovery_adapter" ||
    !validText(value.envelopeReferenceId) ||
    !validTimestamp(value.committedAt) ||
    !validTimestamp(value.expiresAt) ||
    !isRecord(value.sourceReality) ||
    !isRecord(value.targetGravity) ||
    !isRecord(value.integrity) ||
    !isIdentityReferences(value.sourceReality.identityReferences) ||
    !isIdentityReferences(value.targetGravity.identityReferences) ||
    !isRecord(value.sourceReality.terminalProof) ||
    !isAdmission(value.targetGravity.admission)
  ) {
    return false;
  }
  const target = value.targetGravity.admission;
  return (
    value.sourceReality.supersededByGravityTransfer === true &&
    identityMatches(
      value.sourceReality.identityReferences,
      value.targetGravity.identityReferences,
    ) &&
    identityMatches(
      value.targetGravity.identityReferences,
      target.identityReferences,
    ) &&
    value.sourceReality.terminalProof.intentReferenceId ===
      target.sourceReality.intentReferenceId &&
    value.sourceReality.terminalProof.encounterCycleId ===
      target.sourceReality.encounterCycleId &&
    value.integrity.sourceAndTargetIdentityMatch === true &&
    value.integrity.sourceAndTargetCycleBound === true &&
    value.integrity.pressureBelongsToSourceReference === true &&
    value.integrity.bodyApproachBelongsToEncounter === true &&
    value.integrity.singleRouteTarget === "/dynamics" &&
    value.expiresAt === target.expiresAt
  );
};

const isSnapshot = (
  value: unknown,
): value is GravityEntryRecoverySnapshot =>
  isRecord(value) &&
  value.schemaVersion === XINMAI_GRAVITY_ENTRY_RECOVERY_SCHEMA_VERSION &&
  value.source === "xinmai_gravity_entry_recovery_adapter" &&
  isEnvelope(value.envelope) &&
  isAdmission(value.currentGravityAdmission) &&
  value.currentGravityAdmission.admissionReferenceId ===
    value.envelope.targetGravity.admission.admissionReferenceId &&
  value.currentGravityAdmission.gravityCycleId ===
    value.envelope.targetGravity.admission.gravityCycleId &&
  identityMatches(
    value.currentGravityAdmission.identityReferences,
    value.envelope.targetGravity.identityReferences,
  ) &&
  validTimestamp(value.writtenAt);

const freezeSnapshot = (
  snapshot: GravityEntryRecoverySnapshot,
): GravityEntryRecoverySnapshot =>
  Object.freeze({
    ...snapshot,
    envelope: Object.freeze(snapshot.envelope),
    currentGravityAdmission: Object.freeze(
      snapshot.currentGravityAdmission,
    ),
  });

const createSnapshot = (
  envelope: RealityToGravityCutoverEnvelope,
  admission: GravityEntryAdmission,
): GravityEntryRecoverySnapshot =>
  freezeSnapshot({
    schemaVersion: XINMAI_GRAVITY_ENTRY_RECOVERY_SCHEMA_VERSION,
    source: "xinmai_gravity_entry_recovery_adapter",
    envelope,
    currentGravityAdmission: admission,
    writtenAt: new Date().toISOString(),
  });

const writeSnapshot = (
  snapshot: GravityEntryRecoverySnapshot,
): GravityEntryRecoveryWriteResult => {
  const storage = getSessionStorage();
  if (storage === null) {
    return Object.freeze({
      status: "UNAVAILABLE" as const,
      snapshot,
    });
  }
  try {
    storage.setItem(
      GRAVITY_ENTRY_RECOVERY_STORAGE_KEY,
      JSON.stringify(snapshot),
    );
    const stored = storage.getItem(GRAVITY_ENTRY_RECOVERY_STORAGE_KEY);
    if (stored === null) {
      return Object.freeze({
        status: "UNCONFIRMED" as const,
        snapshot,
      });
    }
    const parsed = JSON.parse(stored) as unknown;
    return Object.freeze({
      status:
        isSnapshot(parsed) &&
        parsed.envelope.envelopeReferenceId ===
          snapshot.envelope.envelopeReferenceId &&
        parsed.currentGravityAdmission.admissionReferenceId ===
          snapshot.currentGravityAdmission.admissionReferenceId &&
        parsed.currentGravityAdmission.gravityCycleId ===
          snapshot.currentGravityAdmission.gravityCycleId &&
        parsed.currentGravityAdmission.revision ===
          snapshot.currentGravityAdmission.revision
          ? "CONFIRMED" as const
          : "UNCONFIRMED" as const,
      snapshot,
    });
  } catch {
    return Object.freeze({
      status: "UNAVAILABLE" as const,
      snapshot,
    });
  }
};

export function writeRealityToGravityCutoverEnvelope(
  envelope: RealityToGravityCutoverEnvelope,
): GravityEntryRecoveryWriteResult {
  return writeSnapshot(
    createSnapshot(envelope, envelope.targetGravity.admission),
  );
}

export function updateGravityEntryRecoveryCandidate(
  admission: GravityEntryAdmission,
): GravityEntryRecoveryWriteResult {
  const current = readGravityEntryRecoveryCandidate();
  if (
    current.status !== "FOUND" ||
    current.snapshot.currentGravityAdmission.admissionReferenceId !==
      admission.admissionReferenceId ||
    current.snapshot.currentGravityAdmission.gravityCycleId !==
      admission.gravityCycleId
  ) {
    const unavailableEnvelope = Object.freeze({
      schemaVersion: XINMAI_REALITY_TO_GRAVITY_CUTOVER_SCHEMA_VERSION,
      source: "xinmai_gravity_entry_recovery_adapter" as const,
      envelopeReferenceId: `unavailable:${admission.gravityCycleId}`,
      committedAt: admission.updatedAt,
      expiresAt: admission.expiresAt,
      sourceReality: Object.freeze({
        terminalProof: admission.sourceReality,
        identityReferences: admission.identityReferences,
        supersededByGravityTransfer: true as const,
      }),
      targetGravity: Object.freeze({
        admission,
        identityReferences: admission.identityReferences,
      }),
      integrity: Object.freeze({
        sourceAndTargetIdentityMatch: true as const,
        sourceAndTargetCycleBound: true as const,
        pressureBelongsToSourceReference: true as const,
        bodyApproachBelongsToEncounter: true as const,
        singleRouteTarget: "/dynamics" as const,
      }),
    });
    return Object.freeze({
      status: "UNAVAILABLE" as const,
      snapshot: createSnapshot(unavailableEnvelope, admission),
    });
  }
  return writeSnapshot(
    createSnapshot(current.snapshot.envelope, admission),
  );
}

export function readGravityEntryRecoveryCandidate():
  GravityEntryRecoveryReadResult {
  const storage = getSessionStorage();
  if (storage === null) {
    return Object.freeze({
      status: "UNAVAILABLE" as const,
      snapshot: null,
    });
  }
  try {
    const stored = storage.getItem(GRAVITY_ENTRY_RECOVERY_STORAGE_KEY);
    if (stored === null) {
      return Object.freeze({
        status: "NOT_FOUND" as const,
        snapshot: null,
      });
    }
    const parsed = JSON.parse(stored) as unknown;
    if (!isSnapshot(parsed)) {
      return Object.freeze({
        status: "CORRUPTED" as const,
        snapshot: null,
      });
    }
    return Object.freeze({
      status: "FOUND" as const,
      snapshot: freezeSnapshot(parsed),
    });
  } catch {
    return Object.freeze({
      status: "CORRUPTED" as const,
      snapshot: null,
    });
  }
}

export function readRealitySupersessionProof(input: Readonly<{
  intentReferenceId: string;
  encounterCycleId: string;
  identityReferences: RealityEncounterIdentityReferences;
}>):
  | Readonly<{
      status: "SUPERSEDED";
      envelope: RealityToGravityCutoverEnvelope;
    }>
  | Readonly<{
      status: "NOT_FOUND" | "MISMATCH" | "UNAVAILABLE";
      envelope: null;
    }> {
  const recovery = readGravityEntryRecoveryCandidate();
  if (recovery.status !== "FOUND") {
    return Object.freeze({
      status:
        recovery.status === "UNAVAILABLE"
          ? "UNAVAILABLE" as const
          : "NOT_FOUND" as const,
      envelope: null,
    });
  }
  const source = recovery.snapshot.envelope.sourceReality;
  if (
    source.terminalProof.intentReferenceId !== input.intentReferenceId ||
    source.terminalProof.encounterCycleId !== input.encounterCycleId ||
    !identityMatches(source.identityReferences, input.identityReferences)
  ) {
    return Object.freeze({
      status: "MISMATCH" as const,
      envelope: null,
    });
  }
  return Object.freeze({
    status: "SUPERSEDED" as const,
    envelope: recovery.snapshot.envelope,
  });
}

export function clearGravityEntryRecoveryCandidate(
  admissionReferenceId: string,
): GravityEntryRecoveryClearResult {
  const normalized = admissionReferenceId.trim();
  const storage = getSessionStorage();
  if (storage === null) {
    return Object.freeze({
      status: "UNAVAILABLE" as const,
      admissionReferenceId: normalized,
    });
  }
  try {
    const current = readGravityEntryRecoveryCandidate();
    if (
      current.status === "FOUND" &&
      current.snapshot.currentGravityAdmission.admissionReferenceId !==
        normalized
    ) {
      return Object.freeze({
        status: "UNCONFIRMED" as const,
        admissionReferenceId: normalized,
      });
    }
    storage.removeItem(GRAVITY_ENTRY_RECOVERY_STORAGE_KEY);
    return Object.freeze({
      status:
        storage.getItem(GRAVITY_ENTRY_RECOVERY_STORAGE_KEY) === null
          ? "CONFIRMED" as const
          : "UNCONFIRMED" as const,
      admissionReferenceId: normalized,
    });
  } catch {
    return Object.freeze({
      status: "UNAVAILABLE" as const,
      admissionReferenceId: normalized,
    });
  }
}

export const XinmaiGravityEntryRecoveryAdapter = Object.freeze({
  writeCutover: writeRealityToGravityCutoverEnvelope,
  update: updateGravityEntryRecoveryCandidate,
  read: readGravityEntryRecoveryCandidate,
  readRealitySupersession: readRealitySupersessionProof,
  clear: clearGravityEntryRecoveryCandidate,
});
