import type {
  XinmaiLivedGrowthCommandMetadata,
  XinmaiLivedGrowthTransactionDecision,
  XinmaiLivedGrowthTransactionOutcome,
  XinmaiLivedGrowthTransactionSafeWithheldReason,
} from "../types/xinmaiLivedGrowthTransaction";
import type {
  XinmaiLivedGrowthEnvelope,
  XinmaiLivedGrowthEnvelopeV1,
} from "../types/xinmaiLivedGrowthRecovery";
import {
  XINMAI_GRAVITY_OBSERVATION_CONTINUITY_SCHEMA_VERSION,
  XINMAI_GRAVITY_OBSERVATION_CONTINUITY_STORE,
  type GravityObservationContinuityReadResult,
  type GravityObservationContinuityRecord,
  type GravityObservationContinuityTransactionDecision,
  type GravityObservationContinuityTransactionOutcome,
} from "../types/xinmaiGravityObservationContinuity";
import {
  XINMAI_SIX_DIMENSION_COMMAND_FENCE_STORE,
  XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_STORE,
  XINMAI_SIX_DIMENSION_OBSERVATION_SET_STORE,
  type CanonicalSixDimensionObservationSetRecord,
  type SixDimensionCompletionReceiptRecord,
  type SixDimensionAuthorityReadResult,
  type SixDimensionObservationMutationTransactionInput,
  type SixDimensionObservationResult,
} from "../types/xinmaiSixDimensionObservation";
import {
  XINMAI_LIVED_GROWTH_CANONICAL_RECORD_ID,
  XINMAI_LIVED_GROWTH_CANONICAL_STORE,
  XINMAI_LIVED_GROWTH_CRYSTAL_PROJECTION_STORE,
  XINMAI_LIVED_GROWTH_DATABASE_NAME,
  XINMAI_LIVED_GROWTH_DATABASE_VERSION,
  XINMAI_LIVED_GROWTH_ELIGIBILITY_INDEX_STORE,
  XINMAI_LIVED_GROWTH_FORMATION_INDEX_STORE,
  XINMAI_LIVED_GROWTH_MIGRATION_META_STORE,
  XINMAI_LIVED_GROWTH_V1_MIGRATION_META_ID,
  type XinmaiLivedGrowthCanonicalReadResult,
  type XinmaiLivedGrowthCanonicalRecord,
  type XinmaiLivedGrowthCanonicalProjectionRecord,
  type XinmaiLivedGrowthEligibilityIndexRecord,
  type XinmaiLivedGrowthFormationIndexRecord,
  type XinmaiLivedGrowthMigrationMetaRecord,
} from "../types/xinmaiLivedGrowthTransactionalStore";
import {
  XINMAI_LIVED_GROWTH_RECOVERY_STORAGE_KEY,
  createEmptyXinmaiLivedGrowthEnvelope,
  isXinmaiLivedGrowthEnvelope,
  isXinmaiLivedGrowthLegacyEnvelopeV1,
  readXinmaiLivedGrowthRecoveryCandidate,
  upgradeXinmaiLivedGrowthEnvelopeV1,
} from "./xinmaiLivedGrowthRecoveryPersistenceAdapter";
import { notifyXinmaiLivedGrowthCanonicalRevision } from "./xinmaiLivedGrowthRecoveryRevisionObserver";
import {
  isSixDimensionCommandFenceRecord,
} from "./xinmaiSixDimensionObservationEvidenceValidator";
import {
  isCanonicalSixDimensionObservationSetRecord,
  isCanonicalSixDimensionObservationSetV3,
  isSixDimensionCompletionReceiptRecord,
  isSixDimensionCompletionReceiptV2,
  validateSixDimensionSemanticSelectionIntegrity,
  validateSixDimensionSetReceiptRecordPair,
} from "./xinmaiSixDimensionSemanticSelectionEvidenceValidator";

const STORE_NAMES: string[] = [
  XINMAI_LIVED_GROWTH_CANONICAL_STORE,
  XINMAI_LIVED_GROWTH_MIGRATION_META_STORE,
  XINMAI_LIVED_GROWTH_ELIGIBILITY_INDEX_STORE,
  XINMAI_LIVED_GROWTH_FORMATION_INDEX_STORE,
  XINMAI_LIVED_GROWTH_CRYSTAL_PROJECTION_STORE,
  XINMAI_GRAVITY_OBSERVATION_CONTINUITY_STORE,
  XINMAI_SIX_DIMENSION_OBSERVATION_SET_STORE,
  XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_STORE,
  XINMAI_SIX_DIMENSION_COMMAND_FENCE_STORE,
];

const LEGACY_ABSENT_SENTINEL = "XINMAI_LEGACY_V1_ABSENT";

type LegacySnapshot = Readonly<{
  raw: string | null;
  digest: string;
  envelope: XinmaiLivedGrowthEnvelopeV1 | null;
  status: "FOUND" | "NOT_FOUND" | "UNAVAILABLE" | "CORRUPTED";
}>;

type OpenDatabaseResult =
  | Readonly<{ status: "OPEN"; database: IDBDatabase }>
  | Readonly<{
      status: "UNAVAILABLE" | "BLOCKED" | "FAILED";
      database: null;
    }>;

type CanonicalInitializationResult =
  | Readonly<{ status: "READY" }>
  | Readonly<{
      status: "SAFE_WITHHELD";
      reason: XinmaiLivedGrowthTransactionSafeWithheldReason;
    }>;

const digestText = async (value: string): Promise<string | null> => {
  try {
    if (
      typeof crypto === "undefined" ||
      !crypto.subtle ||
      typeof TextEncoder === "undefined"
    ) {
      return null;
    }
    const digest = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(value),
    );
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  } catch {
    return null;
  }
};

const captureLegacySnapshot = async (): Promise<LegacySnapshot | null> => {
  const legacy = readXinmaiLivedGrowthRecoveryCandidate();
  const digest = await digestText(legacy.raw ?? LEGACY_ABSENT_SENTINEL);
  if (!digest) return null;
  return Object.freeze({
    raw: legacy.raw,
    digest,
    envelope: legacy.status === "FOUND" ? legacy.envelope : null,
    status: legacy.status,
  });
};

const createMeta = (
  snapshot: LegacySnapshot,
  status: XinmaiLivedGrowthMigrationMetaRecord["status"],
  canonicalRevision: number | null,
): XinmaiLivedGrowthMigrationMetaRecord => {
  const now = new Date().toISOString();
  return Object.freeze({
    id: XINMAI_LIVED_GROWTH_V1_MIGRATION_META_ID,
    sourceSchema: "XINMAI_LIVED_GROWTH_RECOVERY_V1" as const,
    sourceStorageKey: XINMAI_LIVED_GROWTH_RECOVERY_STORAGE_KEY,
    sourceDigest: snapshot.digest,
    sourceRawLength: snapshot.raw?.length ?? 0,
    importedCanonicalRevision: canonicalRevision,
    status,
    noBackfill: true as const,
    importedAt: now,
    lastCheckedAt: now,
  });
};

const hasLegacyUniquenessConflict = (
  envelope: XinmaiLivedGrowthEnvelope,
): boolean => {
  const departureIds = new Set<string>();
  const departureLineages = new Set<string>();
  for (const receipt of envelope.choiceExplicitDepartureReceipts) {
    if (
      departureIds.has(receipt.departureReceiptReferenceId) ||
      departureLineages.has(receipt.choiceActionIntentionReferenceId)
    ) {
      return true;
    }
    departureIds.add(receipt.departureReceiptReferenceId);
    departureLineages.add(receipt.choiceActionIntentionReferenceId);
  }
  const returnIds = new Set<string>();
  const returnAttempts = new Set<string>();
  const activeReturnDepartures = new Set<string>();
  for (const receipt of envelope.choiceExplicitReturnReceipts) {
    const attemptKey = [
      receipt.departureReceiptReferenceId,
      receipt.returnAttemptRevision,
    ].join("::");
    if (
      returnIds.has(receipt.returnReceiptReferenceId) ||
      returnAttempts.has(attemptKey)
    ) {
      return true;
    }
    if (receipt.state === "READY_FOR_LIVED_RESPONSE") {
      if (
        activeReturnDepartures.has(
          receipt.departureReceiptReferenceId,
        )
      ) {
        return true;
      }
      activeReturnDepartures.add(receipt.departureReceiptReferenceId);
    }
    returnIds.add(receipt.returnReceiptReferenceId);
    returnAttempts.add(attemptKey);
  }
  const eligibilityIds = new Set<string>();
  const eligibilityKeys = new Set<string>();
  for (const eligibility of envelope.crystalEligibilities) {
    const eligibilityKey =
      `${eligibility.crystalEligibilityReferenceId}:` +
      eligibility.eligibilityRevision;
    if (
      eligibilityIds.has(eligibility.crystalEligibilityReferenceId) ||
      eligibilityKeys.has(eligibilityKey)
    ) {
      return true;
    }
    eligibilityIds.add(eligibility.crystalEligibilityReferenceId);
    eligibilityKeys.add(eligibilityKey);
  }
  const lineageIds = new Set<string>();
  const formationIds = new Set<string>();
  const crystalIds = new Set<string>();
  const receiptEligibilityKeys = new Set<string>();
  for (const receipt of envelope.formationReceipts) {
    const eligibilityKey =
      `${receipt.crystalEligibilityReferenceId}:` +
      receipt.eligibilityRevision;
    if (
      lineageIds.has(receipt.choiceActionIntentionReferenceId) ||
      formationIds.has(receipt.formationReferenceId) ||
      crystalIds.has(receipt.crystalReferenceId) ||
      receiptEligibilityKeys.has(eligibilityKey)
    ) {
      return true;
    }
    lineageIds.add(receipt.choiceActionIntentionReferenceId);
    formationIds.add(receipt.formationReferenceId);
    crystalIds.add(receipt.crystalReferenceId);
    receiptEligibilityKeys.add(eligibilityKey);
  }
  return false;
};

const openCanonicalDatabase = (): Promise<OpenDatabaseResult> =>
  new Promise((resolve) => {
    if (typeof indexedDB === "undefined") {
      resolve(Object.freeze({ status: "UNAVAILABLE", database: null }));
      return;
    }
    let settled = false;
    let request: IDBOpenDBRequest;
    try {
      request = indexedDB.open(
        XINMAI_LIVED_GROWTH_DATABASE_NAME,
        XINMAI_LIVED_GROWTH_DATABASE_VERSION,
      );
    } catch {
      resolve(Object.freeze({ status: "FAILED", database: null }));
      return;
    }
    request.onupgradeneeded = () => {
      const database = request.result;
      if (
        !database.objectStoreNames.contains(
          XINMAI_LIVED_GROWTH_CANONICAL_STORE,
        )
      ) {
        database.createObjectStore(
          XINMAI_LIVED_GROWTH_CANONICAL_STORE,
          { keyPath: "id" },
        );
      }
      if (
        !database.objectStoreNames.contains(
          XINMAI_LIVED_GROWTH_MIGRATION_META_STORE,
        )
      ) {
        database.createObjectStore(
          XINMAI_LIVED_GROWTH_MIGRATION_META_STORE,
          { keyPath: "id" },
        );
      }
      if (
        !database.objectStoreNames.contains(
          XINMAI_LIVED_GROWTH_ELIGIBILITY_INDEX_STORE,
        )
      ) {
        const eligibilityStore = database.createObjectStore(
          XINMAI_LIVED_GROWTH_ELIGIBILITY_INDEX_STORE,
          { keyPath: "crystalEligibilityReferenceId" },
        );
        eligibilityStore.createIndex(
          "eligibilityKey",
          "eligibilityKey",
          { unique: true },
        );
      }
      if (
        !database.objectStoreNames.contains(
          XINMAI_LIVED_GROWTH_FORMATION_INDEX_STORE,
        )
      ) {
        const formationStore = database.createObjectStore(
          XINMAI_LIVED_GROWTH_FORMATION_INDEX_STORE,
          { keyPath: "choiceActionIntentionReferenceId" },
        );
        formationStore.createIndex(
          "formationReferenceId",
          "formationReferenceId",
          { unique: true },
        );
        formationStore.createIndex(
          "crystalReferenceId",
          "crystalReferenceId",
          { unique: true },
        );
        formationStore.createIndex(
          "eligibilityKey",
          "eligibilityKey",
          { unique: true },
        );
      }
      if (
        !database.objectStoreNames.contains(
          XINMAI_LIVED_GROWTH_CRYSTAL_PROJECTION_STORE,
        )
      ) {
        const projectionStore = database.createObjectStore(
          XINMAI_LIVED_GROWTH_CRYSTAL_PROJECTION_STORE,
          { keyPath: "crystalReferenceId" },
        );
        projectionStore.createIndex(
          "formationReferenceId",
          "formationReferenceId",
          { unique: true },
        );
        projectionStore.createIndex(
          "choiceActionIntentionReferenceId",
          "choiceActionIntentionReferenceId",
          { unique: true },
        );
      }
      if (
        !database.objectStoreNames.contains(
          XINMAI_GRAVITY_OBSERVATION_CONTINUITY_STORE,
        )
      ) {
        const observationStore = database.createObjectStore(
          XINMAI_GRAVITY_OBSERVATION_CONTINUITY_STORE,
          { keyPath: "recordId" },
        );
        observationStore.createIndex(
          "gravityObservationReferenceId",
          "gravityObservationReferenceId",
          { unique: true },
        );
      }
      if (
        !database.objectStoreNames.contains(
          XINMAI_SIX_DIMENSION_OBSERVATION_SET_STORE,
        )
      ) {
        const observationSetStore = database.createObjectStore(
          XINMAI_SIX_DIMENSION_OBSERVATION_SET_STORE,
          { keyPath: "observationSetId" },
        );
        observationSetStore.createIndex(
          "canonicalLineageKey",
          "canonicalLineageKey",
          { unique: true },
        );
        observationSetStore.createIndex(
          "identityKey",
          "identityKey",
          { unique: false },
        );
        observationSetStore.createIndex(
          "encounterCycleId",
          "encounterCycleId",
          { unique: false },
        );
      }
      if (
        !database.objectStoreNames.contains(
          XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_STORE,
        )
      ) {
        const completionReceiptStore = database.createObjectStore(
          XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_STORE,
          { keyPath: "completionReceiptReferenceId" },
        );
        completionReceiptStore.createIndex(
          "observationSetId",
          "observationSetId",
          { unique: true },
        );
        completionReceiptStore.createIndex(
          "evidenceDigest",
          "evidenceDigest",
          { unique: true },
        );
      }
      if (
        !database.objectStoreNames.contains(
          XINMAI_SIX_DIMENSION_COMMAND_FENCE_STORE,
        )
      ) {
        const commandFenceStore = database.createObjectStore(
          XINMAI_SIX_DIMENSION_COMMAND_FENCE_STORE,
          { keyPath: "commandReferenceId" },
        );
        commandFenceStore.createIndex(
          "outcomeReferenceId",
          "outcomeReferenceId",
          { unique: true },
        );
        commandFenceStore.createIndex(
          "observationSetId",
          "observationSetId",
          { unique: false },
        );
      }
    };
    request.onblocked = () => {
      if (settled) return;
      settled = true;
      resolve(Object.freeze({ status: "BLOCKED", database: null }));
    };
    request.onerror = () => {
      if (settled) return;
      settled = true;
      resolve(Object.freeze({ status: "FAILED", database: null }));
    };
    request.onsuccess = () => {
      const database = request.result;
      database.onversionchange = () => database.close();
      if (settled) {
        database.close();
        return;
      }
      settled = true;
      resolve(Object.freeze({ status: "OPEN", database }));
    };
  });

const createStrictReadwriteTransaction = (
  database: IDBDatabase,
): IDBTransaction => {
  try {
    return database.transaction(STORE_NAMES, "readwrite", {
      durability: "strict",
    });
  } catch {
    return database.transaction(STORE_NAMES, "readwrite");
  }
};

const writeEnvelopeIndexes = (
  transaction: IDBTransaction,
  envelope: XinmaiLivedGrowthEnvelope,
): void => {
  const eligibilityStore = transaction.objectStore(
    XINMAI_LIVED_GROWTH_ELIGIBILITY_INDEX_STORE,
  );
  const formationStore = transaction.objectStore(
    XINMAI_LIVED_GROWTH_FORMATION_INDEX_STORE,
  );
  const projectionStore = transaction.objectStore(
    XINMAI_LIVED_GROWTH_CRYSTAL_PROJECTION_STORE,
  );
  eligibilityStore.clear();
  formationStore.clear();
  projectionStore.clear();
  for (const eligibility of envelope.crystalEligibilities) {
    const record: XinmaiLivedGrowthEligibilityIndexRecord = Object.freeze({
      crystalEligibilityReferenceId:
        eligibility.crystalEligibilityReferenceId,
      eligibilityKey:
        `${eligibility.crystalEligibilityReferenceId}:` +
        eligibility.eligibilityRevision,
      livedResponseReferenceId: eligibility.livedResponseReferenceId,
      livedResponseRevision: eligibility.livedResponseRevision,
      choiceActionIntentionReferenceId:
        eligibility.choiceActionIntentionReferenceId,
    });
    eligibilityStore.put(record);
  }
  for (const receipt of envelope.formationReceipts) {
    const record: XinmaiLivedGrowthFormationIndexRecord = Object.freeze({
      choiceActionIntentionReferenceId:
        receipt.choiceActionIntentionReferenceId,
      formationReferenceId: receipt.formationReferenceId,
      crystalReferenceId: receipt.crystalReferenceId,
      eligibilityKey:
        `${receipt.crystalEligibilityReferenceId}:` +
        receipt.eligibilityRevision,
    });
    formationStore.put(record);
    const projection: XinmaiLivedGrowthCanonicalProjectionRecord =
      Object.freeze({
        crystalReferenceId: receipt.crystalReferenceId,
        formationReferenceId: receipt.formationReferenceId,
        choiceActionIntentionReferenceId:
          receipt.choiceActionIntentionReferenceId,
        formedAt: receipt.formedAt,
        formedCrystal: receipt.formedCrystal,
      });
    projectionStore.put(projection);
  }
};

const initializeCanonicalState = async (
  snapshot: LegacySnapshot,
): Promise<CanonicalInitializationResult> => {
  const opened = await openCanonicalDatabase();
  if (opened.status !== "OPEN") {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      reason:
        opened.status === "BLOCKED"
          ? "TRANSACTION_OPEN_BLOCKED" as const
          : "TRANSACTION_STORAGE_UNAVAILABLE" as const,
    });
  }
  const database = opened.database;
  return new Promise((resolve) => {
    let outcome: CanonicalInitializationResult = Object.freeze({
      status: "SAFE_WITHHELD" as const,
      reason: "TRANSACTION_ABORTED" as const,
    });
    let transaction: IDBTransaction;
    try {
      transaction = createStrictReadwriteTransaction(database);
    } catch {
      database.close();
      resolve(
        Object.freeze({
          status: "SAFE_WITHHELD" as const,
          reason: "TRANSACTION_CONNECTION_CLOSED" as const,
        }),
      );
      return;
    }
    const canonicalStore = transaction.objectStore(
      XINMAI_LIVED_GROWTH_CANONICAL_STORE,
    );
    const metaStore = transaction.objectStore(
      XINMAI_LIVED_GROWTH_MIGRATION_META_STORE,
    );
    const canonicalRequest = canonicalStore.get(
      XINMAI_LIVED_GROWTH_CANONICAL_RECORD_ID,
    );
    const metaRequest = metaStore.get(
      XINMAI_LIVED_GROWTH_V1_MIGRATION_META_ID,
    );
    let canonicalResolved = false;
    let metaResolved = false;
    let canonicalValue: unknown;
    let metaValue: unknown;
    const prepare = () => {
      if (!canonicalResolved || !metaResolved) return;
      if (canonicalValue && metaValue) {
        const canonical = canonicalValue as
          | Partial<XinmaiLivedGrowthCanonicalRecord>
          | undefined;
        if (
          canonical?.id !== XINMAI_LIVED_GROWTH_CANONICAL_RECORD_ID ||
          !isMigrationMeta(metaValue)
        ) {
          outcome = Object.freeze({
            status: "SAFE_WITHHELD" as const,
            reason: "RECOVERY_CORRUPTED" as const,
          });
          return;
        }
        if (isXinmaiLivedGrowthEnvelope(canonical.envelope)) {
          outcome = Object.freeze({ status: "READY" as const });
          return;
        }
        if (!isXinmaiLivedGrowthLegacyEnvelopeV1(canonical.envelope)) {
          outcome = Object.freeze({
            status: "SAFE_WITHHELD" as const,
            reason: "RECOVERY_CORRUPTED" as const,
          });
          return;
        }
        const upgraded = upgradeXinmaiLivedGrowthEnvelopeV1(
          canonical.envelope,
        );
        try {
          canonicalStore.put(
            Object.freeze({
              id: XINMAI_LIVED_GROWTH_CANONICAL_RECORD_ID,
              envelope: upgraded,
            }),
          );
          writeEnvelopeIndexes(transaction, upgraded);
        } catch {
          try {
            transaction.abort();
          } catch {
            // The transaction outcome remains authoritative.
          }
          return;
        }
        outcome = Object.freeze({ status: "READY" as const });
        return;
      }
      if (canonicalValue || metaValue) {
        outcome = Object.freeze({
          status: "SAFE_WITHHELD" as const,
          reason: "RECOVERY_CORRUPTED" as const,
        });
        return;
      }
      const currentLegacy = readXinmaiLivedGrowthRecoveryCandidate();
      if (
        currentLegacy.status !== snapshot.status ||
        currentLegacy.raw !== snapshot.raw
      ) {
        metaStore.put(
          createMeta(snapshot, "LEGACY_IMPORT_CONFLICT", null),
        );
        outcome = Object.freeze({
          status: "SAFE_WITHHELD" as const,
          reason: "LEGACY_IMPORT_CONFLICT" as const,
        });
        return;
      }
      if (
        snapshot.status === "UNAVAILABLE" ||
        snapshot.status === "CORRUPTED"
      ) {
        metaStore.put(
          createMeta(
            snapshot,
            snapshot.status === "CORRUPTED"
              ? "LEGACY_SOURCE_CORRUPTED"
              : "LEGACY_IMPORT_CONFLICT",
            null,
          ),
        );
        outcome = Object.freeze({
          status: "SAFE_WITHHELD" as const,
          reason:
            snapshot.status === "CORRUPTED"
              ? "RECOVERY_CORRUPTED" as const
              : "RECOVERY_UNAVAILABLE" as const,
        });
        return;
      }
      const envelope: XinmaiLivedGrowthEnvelope =
        snapshot.status === "FOUND" && snapshot.envelope
          ? upgradeXinmaiLivedGrowthEnvelopeV1(snapshot.envelope)
          : createEmptyXinmaiLivedGrowthEnvelope();
      const legacyConflict = hasLegacyUniquenessConflict(envelope);
      const canonicalRecord: XinmaiLivedGrowthCanonicalRecord =
        Object.freeze({
          id: XINMAI_LIVED_GROWTH_CANONICAL_RECORD_ID,
          envelope,
        });
      try {
        canonicalStore.put(canonicalRecord);
        metaStore.put(
          createMeta(
            snapshot,
            legacyConflict
              ? "LEGACY_IMPORT_CONFLICT"
              : snapshot.status === "FOUND"
                ? "IMPORTED"
                : "NO_LEGACY_SOURCE",
            envelope.revision,
          ),
        );
        if (!legacyConflict) {
          writeEnvelopeIndexes(transaction, envelope);
        }
      } catch {
        try {
          transaction.abort();
        } catch {
          // The abort outcome below remains authoritative.
        }
        return;
      }
      outcome = legacyConflict
        ? Object.freeze({
            status: "SAFE_WITHHELD" as const,
            reason: "LEGACY_IMPORT_CONFLICT" as const,
          })
        : Object.freeze({ status: "READY" as const });
    };
    canonicalRequest.onsuccess = () => {
      canonicalValue = canonicalRequest.result;
      canonicalResolved = true;
      prepare();
    };
    metaRequest.onsuccess = () => {
      metaValue = metaRequest.result;
      metaResolved = true;
      prepare();
    };
    transaction.oncomplete = () => {
      database.close();
      resolve(outcome);
    };
    transaction.onabort = () => {
      database.close();
      resolve(
        Object.freeze({
          status: "SAFE_WITHHELD" as const,
          reason: "TRANSACTION_ABORTED" as const,
        }),
      );
    };
    transaction.onerror = () => undefined;
  });
};

const ensureCanonicalState =
  async (): Promise<CanonicalInitializationResult> => {
    const snapshot = await captureLegacySnapshot();
    if (!snapshot) {
      return Object.freeze({
        status: "SAFE_WITHHELD" as const,
        reason: "TRANSACTION_STORAGE_UNAVAILABLE" as const,
      });
    }
    return initializeCanonicalState(snapshot);
  };

const isMigrationMeta = (
  value: unknown,
): value is XinmaiLivedGrowthMigrationMetaRecord => {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<XinmaiLivedGrowthMigrationMetaRecord>;
  return (
    candidate.id === XINMAI_LIVED_GROWTH_V1_MIGRATION_META_ID &&
    candidate.sourceSchema === "XINMAI_LIVED_GROWTH_RECOVERY_V1" &&
    candidate.sourceStorageKey ===
      XINMAI_LIVED_GROWTH_RECOVERY_STORAGE_KEY &&
    typeof candidate.sourceDigest === "string" &&
    candidate.noBackfill === true
  );
};

const isCanonicalProjectionRecord = (
  value: unknown,
): value is XinmaiLivedGrowthCanonicalProjectionRecord => {
  if (!value || typeof value !== "object") return false;
  const candidate =
    value as Partial<XinmaiLivedGrowthCanonicalProjectionRecord>;
  return (
    typeof candidate.crystalReferenceId === "string" &&
    candidate.crystalReferenceId.trim().length > 0 &&
    typeof candidate.formationReferenceId === "string" &&
    candidate.formationReferenceId.trim().length > 0 &&
    typeof candidate.choiceActionIntentionReferenceId === "string" &&
    candidate.choiceActionIntentionReferenceId.trim().length > 0 &&
    typeof candidate.formedAt === "string" &&
    candidate.formedAt.trim().length > 0 &&
    typeof candidate.formedCrystal === "object" &&
    candidate.formedCrystal !== null
  );
};

const markLegacyWriterDetected = async (
  database: IDBDatabase,
  meta: XinmaiLivedGrowthMigrationMetaRecord,
): Promise<void> =>
  new Promise((resolve) => {
    let transaction: IDBTransaction;
    try {
      transaction = database.transaction(
        XINMAI_LIVED_GROWTH_MIGRATION_META_STORE,
        "readwrite",
      );
    } catch {
      resolve();
      return;
    }
    transaction
      .objectStore(XINMAI_LIVED_GROWTH_MIGRATION_META_STORE)
      .put(
        Object.freeze({
          ...meta,
          status: "LEGACY_WRITER_DETECTED" as const,
          lastCheckedAt: new Date().toISOString(),
        }),
      );
    transaction.oncomplete = () => resolve();
    transaction.onabort = () => resolve();
    transaction.onerror = () => undefined;
  });

export async function readXinmaiLivedGrowthCanonicalState():
Promise<XinmaiLivedGrowthCanonicalReadResult> {
  const initialized = await ensureCanonicalState();
  if (initialized.status !== "READY") {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      envelope: null,
      migration: null,
      canonicalProjections: null,
      reason: initialized.reason,
    });
  }
  const opened = await openCanonicalDatabase();
  if (opened.status !== "OPEN") {
    return Object.freeze({
      status: "UNAVAILABLE" as const,
      envelope: null,
      migration: null,
      canonicalProjections: null,
      reason:
        opened.status === "BLOCKED"
          ? "TRANSACTION_OPEN_BLOCKED" as const
          : "TRANSACTION_STORAGE_UNAVAILABLE" as const,
    });
  }
  const database = opened.database;
  const result = await new Promise<XinmaiLivedGrowthCanonicalReadResult>(
    (resolve) => {
      let canonicalValue: unknown;
      let metaValue: unknown;
      let projectionValues: unknown;
      let transaction: IDBTransaction;
      try {
        transaction = database.transaction(
          [
            XINMAI_LIVED_GROWTH_CANONICAL_STORE,
            XINMAI_LIVED_GROWTH_MIGRATION_META_STORE,
            XINMAI_LIVED_GROWTH_CRYSTAL_PROJECTION_STORE,
          ],
          "readonly",
        );
      } catch {
        resolve(
          Object.freeze({
            status: "UNAVAILABLE" as const,
            envelope: null,
            migration: null,
            canonicalProjections: null,
            reason: "TRANSACTION_CONNECTION_CLOSED" as const,
          }),
        );
        return;
      }
      const canonicalRequest = transaction
        .objectStore(XINMAI_LIVED_GROWTH_CANONICAL_STORE)
        .get(XINMAI_LIVED_GROWTH_CANONICAL_RECORD_ID);
      const metaRequest = transaction
        .objectStore(XINMAI_LIVED_GROWTH_MIGRATION_META_STORE)
        .get(XINMAI_LIVED_GROWTH_V1_MIGRATION_META_ID);
      const projectionRequest = transaction
        .objectStore(XINMAI_LIVED_GROWTH_CRYSTAL_PROJECTION_STORE)
        .getAll();
      canonicalRequest.onsuccess = () => {
        canonicalValue = canonicalRequest.result;
      };
      metaRequest.onsuccess = () => {
        metaValue = metaRequest.result;
      };
      projectionRequest.onsuccess = () => {
        projectionValues = projectionRequest.result;
      };
      transaction.oncomplete = () => {
        const canonical = canonicalValue as
          | Partial<XinmaiLivedGrowthCanonicalRecord>
          | undefined;
        if (
          canonical?.id !== XINMAI_LIVED_GROWTH_CANONICAL_RECORD_ID ||
          !isXinmaiLivedGrowthEnvelope(canonical.envelope) ||
          !isMigrationMeta(metaValue) ||
          !Array.isArray(projectionValues) ||
          !projectionValues.every(isCanonicalProjectionRecord)
        ) {
          resolve(
            Object.freeze({
              status: "CORRUPTED" as const,
              envelope: null,
              migration: null,
              canonicalProjections: null,
              reason: "RECOVERY_CORRUPTED" as const,
            }),
          );
          return;
        }
        resolve(
          Object.freeze({
            status: "FOUND" as const,
            envelope: canonical.envelope,
            migration: metaValue,
            canonicalProjections: Object.freeze(
              [...projectionValues] as XinmaiLivedGrowthCanonicalProjectionRecord[],
            ),
          }),
        );
      };
      transaction.onabort = () =>
        resolve(
          Object.freeze({
            status: "SAFE_WITHHELD" as const,
            envelope: null,
            migration: null,
            canonicalProjections: null,
            reason: "TRANSACTION_ABORTED" as const,
          }),
        );
      transaction.onerror = () => undefined;
    },
  );
  if (result.status !== "FOUND") {
    database.close();
    return result;
  }
  const legacy = await captureLegacySnapshot();
  if (!legacy || legacy.digest !== result.migration.sourceDigest) {
    await markLegacyWriterDetected(database, result.migration);
    database.close();
    return Object.freeze({
      ...result,
      migration: Object.freeze({
        ...result.migration,
        status: "LEGACY_WRITER_DETECTED" as const,
        lastCheckedAt: new Date().toISOString(),
      }),
    });
  }
  database.close();
  return result;
}

const toSafeWithheld = <TValue, TReason extends string>(
  reason: XinmaiLivedGrowthTransactionSafeWithheldReason,
): XinmaiLivedGrowthTransactionOutcome<TValue, TReason> =>
  Object.freeze({
    status: "SAFE_WITHHELD" as const,
    value: null,
    envelope: null,
    reason,
  });

export async function transactXinmaiLivedGrowthCanonicalState<
  TValue,
  TReason extends string,
>(
  command: XinmaiLivedGrowthCommandMetadata,
  decide: (
    current: XinmaiLivedGrowthEnvelope,
    command: XinmaiLivedGrowthCommandMetadata,
  ) => XinmaiLivedGrowthTransactionDecision<TValue, TReason>,
): Promise<XinmaiLivedGrowthTransactionOutcome<TValue, TReason>> {
  const initialized = await ensureCanonicalState();
  if (initialized.status !== "READY") {
    return toSafeWithheld(initialized.reason);
  }
  const legacy = await captureLegacySnapshot();
  if (!legacy) {
    return toSafeWithheld("TRANSACTION_STORAGE_UNAVAILABLE");
  }
  const opened = await openCanonicalDatabase();
  if (opened.status !== "OPEN") {
    return toSafeWithheld(
      opened.status === "BLOCKED"
        ? "TRANSACTION_OPEN_BLOCKED"
        : "TRANSACTION_STORAGE_UNAVAILABLE",
    );
  }
  const database = opened.database;
  const outcome = await new Promise<
    XinmaiLivedGrowthTransactionOutcome<TValue, TReason>
  >((resolve) => {
    let transaction: IDBTransaction;
    try {
      transaction = createStrictReadwriteTransaction(database);
    } catch {
      resolve(toSafeWithheld("TRANSACTION_CONNECTION_CLOSED"));
      return;
    }
    let result: XinmaiLivedGrowthTransactionOutcome<TValue, TReason> =
      toSafeWithheld("TRANSACTION_ABORTED");
    let canonicalResolved = false;
    let metaResolved = false;
    let canonicalValue: unknown;
    let metaValue: unknown;
    let wroteCanonical = false;
    let uniquenessViolation = false;
    const canonicalStore = transaction.objectStore(
      XINMAI_LIVED_GROWTH_CANONICAL_STORE,
    );
    const metaStore = transaction.objectStore(
      XINMAI_LIVED_GROWTH_MIGRATION_META_STORE,
    );
    const canonicalRequest = canonicalStore.get(
      XINMAI_LIVED_GROWTH_CANONICAL_RECORD_ID,
    );
    const metaRequest = metaStore.get(
      XINMAI_LIVED_GROWTH_V1_MIGRATION_META_ID,
    );
    const prepare = () => {
      if (!canonicalResolved || !metaResolved) return;
      const canonical = canonicalValue as
        | Partial<XinmaiLivedGrowthCanonicalRecord>
        | undefined;
      if (
        canonical?.id !== XINMAI_LIVED_GROWTH_CANONICAL_RECORD_ID ||
        !isXinmaiLivedGrowthEnvelope(canonical.envelope) ||
        !isMigrationMeta(metaValue)
      ) {
        result = toSafeWithheld("RECOVERY_CORRUPTED");
        return;
      }
      if (
        metaValue.status !== "IMPORTED" &&
        metaValue.status !== "NO_LEGACY_SOURCE"
      ) {
        result = toSafeWithheld(
          metaValue.status === "LEGACY_WRITER_DETECTED"
            ? "LEGACY_WRITER_DETECTED"
            : "LEGACY_IMPORT_CONFLICT",
        );
        return;
      }
      const currentLegacy = readXinmaiLivedGrowthRecoveryCandidate();
      if (
        currentLegacy.raw !== legacy.raw ||
        metaValue.sourceDigest !== legacy.digest
      ) {
        metaStore.put(
          Object.freeze({
            ...metaValue,
            status: "LEGACY_WRITER_DETECTED" as const,
            lastCheckedAt: new Date().toISOString(),
          }),
        );
        result = toSafeWithheld("LEGACY_WRITER_DETECTED");
        return;
      }
      const decision = decide(canonical.envelope, command);
      if (decision.status === "REJECTED") {
        result = Object.freeze({
          status: "REJECTED" as const,
          value: null,
          envelope: canonical.envelope,
          reason: decision.reason,
        });
        return;
      }
      if (decision.status === "ALREADY_COMMITTED") {
        result = Object.freeze({
          status: "ALREADY_COMMITTED" as const,
          value: decision.value,
          envelope: canonical.envelope,
        });
        return;
      }
      const next: XinmaiLivedGrowthEnvelope = Object.freeze({
        ...decision.envelope,
        revision: canonical.envelope.revision + 1,
        updatedAt: new Date().toISOString(),
      });
      if (
        !isXinmaiLivedGrowthEnvelope(next) ||
        hasLegacyUniquenessConflict(next)
      ) {
        uniquenessViolation = true;
        try {
          transaction.abort();
        } catch {
          // The abort outcome below remains authoritative.
        }
        return;
      }
      try {
        canonicalStore.put(
          Object.freeze({
            id: XINMAI_LIVED_GROWTH_CANONICAL_RECORD_ID,
            envelope: next,
          }),
        );
        writeEnvelopeIndexes(transaction, next);
      } catch {
        try {
          transaction.abort();
        } catch {
          // The abort outcome below remains authoritative.
        }
        return;
      }
      wroteCanonical = true;
      result = Object.freeze({
        status: "COMMITTED" as const,
        value: decision.value,
        envelope: next,
      });
    };
    canonicalRequest.onsuccess = () => {
      canonicalValue = canonicalRequest.result;
      canonicalResolved = true;
      prepare();
    };
    metaRequest.onsuccess = () => {
      metaValue = metaRequest.result;
      metaResolved = true;
      prepare();
    };
    transaction.oncomplete = () => {
      if (wroteCanonical && result.status === "COMMITTED") {
        notifyXinmaiLivedGrowthCanonicalRevision(
          result.envelope.revision,
        );
      }
      resolve(result);
    };
    transaction.onabort = () =>
      resolve(
        toSafeWithheld(
          uniquenessViolation
            ? "CANONICAL_UNIQUENESS_VIOLATION"
            : "TRANSACTION_ABORTED",
        ),
      );
    transaction.onerror = () => {
      if (transaction.error?.name === "ConstraintError") {
        uniquenessViolation = true;
      }
    };
  });
  database.close();
  return outcome;
}

const isGravityObservationContinuityRecord = (
  value: unknown,
): value is GravityObservationContinuityRecord => {
  if (!value || typeof value !== "object") return false;
  const candidate =
    value as Partial<GravityObservationContinuityRecord>;
  const identity = candidate.identityReferences;
  const sourceReality = candidate.sourceReality;
  const gravityAdmission = candidate.gravityAdmission;
  const pressure = candidate.pressureProvenance;
  return (
    candidate.schemaVersion ===
      XINMAI_GRAVITY_OBSERVATION_CONTINUITY_SCHEMA_VERSION &&
    typeof candidate.recordId === "string" &&
    candidate.recordId.startsWith("CURRENT:") &&
    typeof candidate.gravityObservationReferenceId === "string" &&
    candidate.gravityObservationReferenceId.length > 0 &&
    Number.isInteger(candidate.gravityObservationLineageRevision) &&
    Number(candidate.gravityObservationLineageRevision) > 0 &&
    identity !== undefined &&
    typeof identity.sourceReferenceId === "string" &&
    typeof identity.starBeastIdentityReferenceId === "string" &&
    typeof identity.mansionCoordinateReferenceId === "string" &&
    sourceReality !== undefined &&
    typeof sourceReality.intentReferenceId === "string" &&
    typeof sourceReality.encounterCycleId === "string" &&
    gravityAdmission !== undefined &&
    typeof gravityAdmission.admissionReferenceId === "string" &&
    typeof gravityAdmission.gravityCycleId === "string" &&
    pressure !== undefined &&
    typeof pressure.candidateBundleReferenceId === "string" &&
    typeof pressure.selectedPressureSeedId === "string" &&
    typeof pressure.candidateReferenceId === "string" &&
    (candidate.checkpointState === "OBSERVATION_AVAILABLE" ||
      candidate.checkpointState === "OBSERVATION_RECOGNIZED") &&
    Number.isInteger(candidate.checkpointRevision) &&
    Number(candidate.checkpointRevision) > 0 &&
    (candidate.lifecycleState === "CURRENT" ||
      candidate.lifecycleState === "CONSUMED_BY_CHOICE" ||
      candidate.lifecycleState === "TERMINAL") &&
    typeof candidate.createdAt === "string" &&
    Number.isFinite(Date.parse(candidate.createdAt)) &&
    typeof candidate.updatedAt === "string" &&
    Number.isFinite(Date.parse(candidate.updatedAt)) &&
    typeof candidate.expiresAt === "string" &&
    Number.isFinite(Date.parse(candidate.expiresAt))
  );
};

const toObservationSafeWithheld = <TValue>(
  reason: Extract<
    GravityObservationContinuityTransactionOutcome<TValue>,
    { status: "SAFE_WITHHELD" }
  >["reason"],
): GravityObservationContinuityTransactionOutcome<TValue> =>
  Object.freeze({
    status: "SAFE_WITHHELD" as const,
    value: null,
    record: null,
    growthEnvelope: null,
    reason,
  });

export async function readXinmaiGravityObservationContinuityState(
  recordId: string,
): Promise<GravityObservationContinuityReadResult> {
  const initialized = await ensureCanonicalState();
  if (initialized.status !== "READY") {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      record: null,
      growthEnvelope: null,
      reason: initialized.reason,
    });
  }
  const opened = await openCanonicalDatabase();
  if (opened.status !== "OPEN") {
    return Object.freeze({
      status: "UNAVAILABLE" as const,
      record: null,
      growthEnvelope: null,
      reason:
        opened.status === "BLOCKED"
          ? "TRANSACTION_OPEN_BLOCKED" as const
          : "TRANSACTION_STORAGE_UNAVAILABLE" as const,
    });
  }
  const database = opened.database;
  const result = await new Promise<GravityObservationContinuityReadResult>(
    (resolve) => {
      let canonicalValue: unknown;
      let recordValue: unknown;
      let transaction: IDBTransaction;
      try {
        transaction = database.transaction(
          [
            XINMAI_LIVED_GROWTH_CANONICAL_STORE,
            XINMAI_GRAVITY_OBSERVATION_CONTINUITY_STORE,
          ],
          "readonly",
        );
      } catch {
        resolve(
          Object.freeze({
            status: "UNAVAILABLE" as const,
            record: null,
            growthEnvelope: null,
            reason: "TRANSACTION_CONNECTION_CLOSED" as const,
          }),
        );
        return;
      }
      const canonicalRequest = transaction
        .objectStore(XINMAI_LIVED_GROWTH_CANONICAL_STORE)
        .get(XINMAI_LIVED_GROWTH_CANONICAL_RECORD_ID);
      const observationRequest = transaction
        .objectStore(XINMAI_GRAVITY_OBSERVATION_CONTINUITY_STORE)
        .get(recordId);
      canonicalRequest.onsuccess = () => {
        canonicalValue = canonicalRequest.result;
      };
      observationRequest.onsuccess = () => {
        recordValue = observationRequest.result;
      };
      transaction.oncomplete = () => {
        const canonical = canonicalValue as
          | Partial<XinmaiLivedGrowthCanonicalRecord>
          | undefined;
        if (
          canonical?.id !== XINMAI_LIVED_GROWTH_CANONICAL_RECORD_ID ||
          !isXinmaiLivedGrowthEnvelope(canonical.envelope) ||
          (recordValue !== undefined &&
            !isGravityObservationContinuityRecord(recordValue))
        ) {
          resolve(
            Object.freeze({
              status: "CORRUPTED" as const,
              record: null,
              growthEnvelope: null,
              reason: "RECOVERY_CORRUPTED" as const,
            }),
          );
          return;
        }
        resolve(
          Object.freeze({
            status: "FOUND" as const,
            record:
              recordValue === undefined
                ? null
                : recordValue as GravityObservationContinuityRecord,
            growthEnvelope: canonical.envelope,
          }),
        );
      };
      transaction.onabort = () =>
        resolve(
          Object.freeze({
            status: "SAFE_WITHHELD" as const,
            record: null,
            growthEnvelope: null,
            reason: "TRANSACTION_ABORTED" as const,
          }),
        );
      transaction.onerror = () => undefined;
    },
  );
  database.close();
  return result;
}

export async function transactXinmaiGravityObservationContinuity<
  TValue,
>(
  recordId: string,
  decide: (
    currentRecord: GravityObservationContinuityRecord | null,
    currentGrowth: XinmaiLivedGrowthEnvelope,
  ) => GravityObservationContinuityTransactionDecision<TValue>,
  requiredSixDimensionCompletion?: Readonly<{
    observationSetId: string;
    observationSetRevision: number;
    completionReceiptReferenceId: string;
    dimensionProtocolRevision: string;
    contentDigest: string;
    evidenceDigest: string;
    semanticGrammarRevision?: string;
    semanticSelectionAggregateDigest?: string;
  }>,
): Promise<GravityObservationContinuityTransactionOutcome<TValue>> {
  const initialized = await ensureCanonicalState();
  if (initialized.status !== "READY") {
    return toObservationSafeWithheld(initialized.reason);
  }
  const legacy = await captureLegacySnapshot();
  if (!legacy) {
    return toObservationSafeWithheld(
      "TRANSACTION_STORAGE_UNAVAILABLE",
    );
  }
  const opened = await openCanonicalDatabase();
  if (opened.status !== "OPEN") {
    return toObservationSafeWithheld(
      opened.status === "BLOCKED"
        ? "TRANSACTION_OPEN_BLOCKED"
        : "TRANSACTION_STORAGE_UNAVAILABLE",
    );
  }
  const database = opened.database;
  const outcome = await new Promise<
    GravityObservationContinuityTransactionOutcome<TValue>
  >((resolve) => {
    let transaction: IDBTransaction;
    try {
      transaction = createStrictReadwriteTransaction(database);
    } catch {
      resolve(
        toObservationSafeWithheld(
          "TRANSACTION_CONNECTION_CLOSED",
        ),
      );
      return;
    }
    let result =
      toObservationSafeWithheld<TValue>("TRANSACTION_ABORTED");
    let canonicalValue: unknown;
    let metaValue: unknown;
    let recordValue: unknown;
    let canonicalResolved = false;
    let metaResolved = false;
    let recordResolved = false;
    let sixDimensionSetResolved =
      requiredSixDimensionCompletion === undefined;
    let sixDimensionReceiptResolved =
      requiredSixDimensionCompletion === undefined;
    let sixDimensionSetValue: unknown;
    let sixDimensionReceiptValue: unknown;
    let wroteCanonical = false;
    let wroteRecord = false;
    let uniquenessViolation = false;
    const canonicalStore = transaction.objectStore(
      XINMAI_LIVED_GROWTH_CANONICAL_STORE,
    );
    const metaStore = transaction.objectStore(
      XINMAI_LIVED_GROWTH_MIGRATION_META_STORE,
    );
    const observationStore = transaction.objectStore(
      XINMAI_GRAVITY_OBSERVATION_CONTINUITY_STORE,
    );
    const canonicalRequest = canonicalStore.get(
      XINMAI_LIVED_GROWTH_CANONICAL_RECORD_ID,
    );
    const metaRequest = metaStore.get(
      XINMAI_LIVED_GROWTH_V1_MIGRATION_META_ID,
    );
    const observationRequest = observationStore.get(recordId);
    const sixDimensionSetRequest =
      requiredSixDimensionCompletion === undefined
        ? null
        : transaction
            .objectStore(XINMAI_SIX_DIMENSION_OBSERVATION_SET_STORE)
            .get(requiredSixDimensionCompletion.observationSetId);
    const sixDimensionReceiptRequest =
      requiredSixDimensionCompletion === undefined
        ? null
        : transaction
            .objectStore(XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_STORE)
            .get(
              requiredSixDimensionCompletion
                .completionReceiptReferenceId,
            );
    const prepare = () => {
      if (
        !canonicalResolved ||
        !metaResolved ||
        !recordResolved ||
        !sixDimensionSetResolved ||
        !sixDimensionReceiptResolved
      ) return;
      const canonical = canonicalValue as
        | Partial<XinmaiLivedGrowthCanonicalRecord>
        | undefined;
      if (
        canonical?.id !== XINMAI_LIVED_GROWTH_CANONICAL_RECORD_ID ||
        !isXinmaiLivedGrowthEnvelope(canonical.envelope) ||
        !isMigrationMeta(metaValue) ||
        (recordValue !== undefined &&
          !isGravityObservationContinuityRecord(recordValue))
      ) {
        result = toObservationSafeWithheld("RECOVERY_CORRUPTED");
        return;
      }
      if (
        metaValue.status !== "IMPORTED" &&
        metaValue.status !== "NO_LEGACY_SOURCE"
      ) {
        result = toObservationSafeWithheld(
          metaValue.status === "LEGACY_WRITER_DETECTED"
            ? "LEGACY_WRITER_DETECTED"
            : "LEGACY_IMPORT_CONFLICT",
        );
        return;
      }
      const currentLegacy = readXinmaiLivedGrowthRecoveryCandidate();
      if (
        currentLegacy.raw !== legacy.raw ||
        metaValue.sourceDigest !== legacy.digest
      ) {
        metaStore.put(
          Object.freeze({
            ...metaValue,
            status: "LEGACY_WRITER_DETECTED" as const,
            lastCheckedAt: new Date().toISOString(),
          }),
        );
        result = toObservationSafeWithheld(
          "LEGACY_WRITER_DETECTED",
        );
        return;
      }
      const currentRecord =
        recordValue === undefined
          ? null
          : recordValue as GravityObservationContinuityRecord;
      if (requiredSixDimensionCompletion !== undefined) {
        if (
          !isCanonicalSixDimensionObservationSetRecord(
            sixDimensionSetValue,
          ) ||
          !isSixDimensionCompletionReceiptRecord(
            sixDimensionReceiptValue,
          ) ||
          !validateSixDimensionSetReceiptRecordPair(
            sixDimensionSetValue,
            sixDimensionReceiptValue,
          ) ||
          sixDimensionSetValue.lifecycle !== "COMPLETED" ||
          sixDimensionSetValue.observationSetId !==
            requiredSixDimensionCompletion.observationSetId ||
          sixDimensionSetValue.revision !==
            requiredSixDimensionCompletion.observationSetRevision ||
          sixDimensionSetValue.dimensionProtocolRevision !==
            requiredSixDimensionCompletion.dimensionProtocolRevision ||
          sixDimensionSetValue.contentDigest !==
            requiredSixDimensionCompletion.contentDigest ||
          sixDimensionSetValue.evidenceDigest !==
            requiredSixDimensionCompletion.evidenceDigest ||
          sixDimensionReceiptValue.completionReceiptReferenceId !==
            requiredSixDimensionCompletion.completionReceiptReferenceId ||
          sixDimensionReceiptValue.evidenceDigest !==
            requiredSixDimensionCompletion.evidenceDigest ||
          (requiredSixDimensionCompletion.semanticGrammarRevision !==
              undefined &&
            (!("semanticGrammarRevision" in sixDimensionSetValue) ||
              sixDimensionSetValue.semanticGrammarRevision !==
                requiredSixDimensionCompletion.semanticGrammarRevision ||
              !("semanticGrammarRevision" in sixDimensionReceiptValue) ||
              sixDimensionReceiptValue.semanticGrammarRevision !==
                requiredSixDimensionCompletion.semanticGrammarRevision)) ||
          (requiredSixDimensionCompletion
              .semanticSelectionAggregateDigest !== undefined &&
            (!("semanticSelectionAggregateDigest" in
                sixDimensionReceiptValue) ||
              sixDimensionReceiptValue.semanticSelectionAggregateDigest !==
                requiredSixDimensionCompletion
                  .semanticSelectionAggregateDigest)) ||
          currentRecord === null ||
          sixDimensionSetValue.gravityObservationReferenceId !==
            currentRecord.gravityObservationReferenceId ||
          sixDimensionSetValue.encounterCycleId !==
            currentRecord.sourceReality.encounterCycleId ||
          sixDimensionSetValue.gravityCycleId !==
            currentRecord.gravityAdmission.gravityCycleId
        ) {
          result = Object.freeze({
            status: "REJECTED" as const,
            value: null,
            record: currentRecord,
            growthEnvelope: canonical.envelope,
            reason: "OBSERVATION_NOT_RECOGNIZED" as const,
          });
          return;
        }
      }
      const decision = decide(currentRecord, canonical.envelope);
      if (decision.status === "REJECTED") {
        result = Object.freeze({
          status: "REJECTED" as const,
          value: null,
          record: currentRecord,
          growthEnvelope: canonical.envelope,
          reason: decision.reason,
        });
        return;
      }
      if (decision.status === "ALREADY_COMMITTED") {
        result = Object.freeze({
          status: "ALREADY_COMMITTED" as const,
          value: decision.value,
          record: currentRecord,
          growthEnvelope: canonical.envelope,
        });
        return;
      }
      if (
        decision.record.recordId !== recordId ||
        !isGravityObservationContinuityRecord(decision.record)
      ) {
        result = Object.freeze({
          status: "REJECTED" as const,
          value: null,
          record: currentRecord,
          growthEnvelope: canonical.envelope,
          reason: "INVALID_INPUT" as const,
        });
        return;
      }
      let nextGrowth = canonical.envelope;
      if (decision.growthEnvelope !== null) {
        nextGrowth = Object.freeze({
          ...decision.growthEnvelope,
          revision: canonical.envelope.revision + 1,
          updatedAt: new Date().toISOString(),
        });
        if (
          !isXinmaiLivedGrowthEnvelope(nextGrowth) ||
          hasLegacyUniquenessConflict(nextGrowth)
        ) {
          uniquenessViolation = true;
          try {
            transaction.abort();
          } catch {
            // The abort outcome remains authoritative.
          }
          return;
        }
      }
      try {
        observationStore.put(decision.record);
        wroteRecord = true;
        if (decision.growthEnvelope !== null) {
          canonicalStore.put(
            Object.freeze({
              id: XINMAI_LIVED_GROWTH_CANONICAL_RECORD_ID,
              envelope: nextGrowth,
            }),
          );
          writeEnvelopeIndexes(transaction, nextGrowth);
          wroteCanonical = true;
        }
      } catch {
        try {
          transaction.abort();
        } catch {
          // The abort outcome remains authoritative.
        }
        return;
      }
      result = Object.freeze({
        status: "COMMITTED" as const,
        value: decision.value,
        record: decision.record,
        growthEnvelope: nextGrowth,
      });
    };
    canonicalRequest.onsuccess = () => {
      canonicalValue = canonicalRequest.result;
      canonicalResolved = true;
      prepare();
    };
    metaRequest.onsuccess = () => {
      metaValue = metaRequest.result;
      metaResolved = true;
      prepare();
    };
    observationRequest.onsuccess = () => {
      recordValue = observationRequest.result;
      recordResolved = true;
      prepare();
    };
    if (sixDimensionSetRequest !== null) {
      sixDimensionSetRequest.onsuccess = () => {
        sixDimensionSetValue = sixDimensionSetRequest.result;
        sixDimensionSetResolved = true;
        prepare();
      };
    }
    if (sixDimensionReceiptRequest !== null) {
      sixDimensionReceiptRequest.onsuccess = () => {
        sixDimensionReceiptValue =
          sixDimensionReceiptRequest.result;
        sixDimensionReceiptResolved = true;
        prepare();
      };
    }
    transaction.oncomplete = () => {
      if (
        wroteRecord &&
        wroteCanonical &&
        result.status === "COMMITTED"
      ) {
        notifyXinmaiLivedGrowthCanonicalRevision(
          result.growthEnvelope.revision,
        );
      }
      resolve(result);
    };
    transaction.onabort = () =>
      resolve(
        toObservationSafeWithheld(
          uniquenessViolation
            ? "CANONICAL_UNIQUENESS_VIOLATION"
            : "TRANSACTION_ABORTED",
        ),
      );
    transaction.onerror = () => {
      if (transaction.error?.name === "ConstraintError") {
        uniquenessViolation = true;
      }
    };
  });
  database.close();
  return outcome;
}

const sixDimensionStorageCause = (
  code:
    | "TRANSACTION_STORAGE_UNAVAILABLE"
    | "TRANSACTION_OPEN_BLOCKED"
    | "TRANSACTION_ABORTED"
    | "TRANSACTION_CONNECTION_CLOSED"
    | "RECOVERY_CORRUPTED"
    | "CANONICAL_UNIQUENESS_VIOLATION",
  retryability:
    | "RETRY_AFTER_ENVIRONMENT_RECOVERY"
    | "NOT_RETRYABLE",
) =>
  Object.freeze({
    owner: "STORAGE" as const,
    code,
    retryability,
    innerCause: null,
  });

export async function readXinmaiSixDimensionAuthoritySnapshot(): Promise<SixDimensionAuthorityReadResult> {
  const opened = await openCanonicalDatabase();
  if (opened.status !== "OPEN") {
    return Object.freeze({
      status:
        opened.status === "BLOCKED"
          ? "SAFE_WITHHELD" as const
          : "UNAVAILABLE" as const,
      snapshot: null,
      cause:
        opened.status === "BLOCKED"
          ? sixDimensionStorageCause(
              "TRANSACTION_OPEN_BLOCKED",
              "RETRY_AFTER_ENVIRONMENT_RECOVERY",
            )
          : sixDimensionStorageCause(
              "TRANSACTION_STORAGE_UNAVAILABLE",
              "RETRY_AFTER_ENVIRONMENT_RECOVERY",
            ),
    });
  }
  const database = opened.database;
  const result = await new Promise<SixDimensionAuthorityReadResult>(
    (resolve) => {
      let transaction: IDBTransaction;
      try {
        transaction = database.transaction(
          [
            XINMAI_SIX_DIMENSION_OBSERVATION_SET_STORE,
            XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_STORE,
            XINMAI_SIX_DIMENSION_COMMAND_FENCE_STORE,
          ],
          "readonly",
        );
      } catch {
        resolve(
          Object.freeze({
            status: "SAFE_WITHHELD" as const,
            snapshot: null,
            cause: sixDimensionStorageCause(
              "TRANSACTION_CONNECTION_CLOSED",
              "RETRY_AFTER_ENVIRONMENT_RECOVERY",
            ),
          }),
        );
        return;
      }
      let observationSets: unknown = null;
      let completionReceipts: unknown = null;
      let commandFences: unknown = null;
      const observationRequest = transaction
        .objectStore(XINMAI_SIX_DIMENSION_OBSERVATION_SET_STORE)
        .getAll();
      const receiptRequest = transaction
        .objectStore(XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_STORE)
        .getAll();
      const fenceRequest = transaction
        .objectStore(XINMAI_SIX_DIMENSION_COMMAND_FENCE_STORE)
        .getAll();
      observationRequest.onsuccess = () => {
        observationSets = observationRequest.result;
      };
      receiptRequest.onsuccess = () => {
        completionReceipts = receiptRequest.result;
      };
      fenceRequest.onsuccess = () => {
        commandFences = fenceRequest.result;
      };
      transaction.oncomplete = () => {
        if (
          !Array.isArray(observationSets) ||
          !Array.isArray(completionReceipts) ||
          !Array.isArray(commandFences) ||
          !observationSets.every(
            isCanonicalSixDimensionObservationSetRecord,
          ) ||
          !completionReceipts.every(
            isSixDimensionCompletionReceiptRecord,
          ) ||
          !commandFences.every(isSixDimensionCommandFenceRecord)
        ) {
          resolve(
            Object.freeze({
              status: "CORRUPTED" as const,
              snapshot: null,
              cause: sixDimensionStorageCause(
                "RECOVERY_CORRUPTED",
                "NOT_RETRYABLE",
              ),
            }),
          );
          return;
        }
        const receiptBySet = new Map(
          completionReceipts.map((receipt) => [
            receipt.observationSetId,
            receipt,
          ]),
        );
        const setIds = new Set(
          observationSets.map((set) => set.observationSetId),
        );
        const pairMismatch = observationSets.some((set) =>
          !validateSixDimensionSetReceiptRecordPair(
            set,
            receiptBySet.get(set.observationSetId) ?? null,
          )) || completionReceipts.some(
            (receipt) => !setIds.has(receipt.observationSetId),
          ) || commandFences.some(
            (fence) => !setIds.has(fence.observationSetId),
          );
        if (pairMismatch) {
          resolve(
            Object.freeze({
              status: "CORRUPTED" as const,
              snapshot: null,
              cause: sixDimensionStorageCause(
                "CANONICAL_UNIQUENESS_VIOLATION",
                "NOT_RETRYABLE",
              ),
            }),
          );
          return;
        }
        resolve(
          Object.freeze({
            status: "FOUND" as const,
            snapshot: Object.freeze({
              observationSets: Object.freeze([...observationSets]),
              completionReceipts: Object.freeze([
                ...completionReceipts,
              ]),
              commandFences: Object.freeze([...commandFences]),
            }),
            cause: null,
          }),
        );
      };
      transaction.onabort = () =>
        resolve(
          Object.freeze({
            status: "SAFE_WITHHELD" as const,
            snapshot: null,
            cause: sixDimensionStorageCause(
              "TRANSACTION_ABORTED",
              "RETRY_AFTER_ENVIRONMENT_RECOVERY",
            ),
          }),
        );
      transaction.onerror = () => undefined;
    },
  );
  database.close();
  return result;
}

const sixDimensionAuthorityCause = (
  code: string,
  retryability:
    | "RETRY_AFTER_REREAD"
    | "RETRY_AFTER_ENVIRONMENT_RECOVERY"
    | "NOT_RETRYABLE",
  owner: "SIX_DIMENSION_AUTHORITY" | "GRAVITY" | "STORAGE" =
    "SIX_DIMENSION_AUTHORITY",
) =>
  Object.freeze({
    owner,
    code,
    retryability,
    innerCause: null,
  });

export async function transactXinmaiSixDimensionObservation(
  input: SixDimensionObservationMutationTransactionInput,
): Promise<
  SixDimensionObservationResult<CanonicalSixDimensionObservationSetRecord>
> {
  if (
    isCanonicalSixDimensionObservationSetV3(input.observationSet) &&
    !await validateSixDimensionSemanticSelectionIntegrity(
      input.observationSet,
      input.completionReceipt !== null &&
          isSixDimensionCompletionReceiptV2(input.completionReceipt)
        ? input.completionReceipt
        : null,
    )
  ) {
    return Object.freeze({
      status: "REJECTED" as const,
      value: null,
      observationSet: null,
      completionReceipt: null,
      cause: sixDimensionAuthorityCause(
        "SEMANTIC_SELECTION_DIGEST_MISMATCH",
        "NOT_RETRYABLE",
      ),
    });
  }
  const opened = await openCanonicalDatabase();
  if (opened.status !== "OPEN") {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      value: null,
      observationSet: null,
      completionReceipt: null,
      cause: sixDimensionAuthorityCause(
        opened.status === "BLOCKED"
          ? "TRANSACTION_OPEN_BLOCKED"
          : "TRANSACTION_STORAGE_UNAVAILABLE",
        "RETRY_AFTER_ENVIRONMENT_RECOVERY",
        "STORAGE",
      ),
    });
  }
  const database = opened.database;
  const outcome = await new Promise<
    SixDimensionObservationResult<CanonicalSixDimensionObservationSetRecord>
  >((resolve) => {
    let transaction: IDBTransaction;
    try {
      transaction = createStrictReadwriteTransaction(database);
    } catch {
      resolve(
        Object.freeze({
          status: "SAFE_WITHHELD" as const,
          value: null,
          observationSet: null,
          completionReceipt: null,
          cause: sixDimensionAuthorityCause(
            "TRANSACTION_CONNECTION_CLOSED",
            "RETRY_AFTER_ENVIRONMENT_RECOVERY",
            "STORAGE",
          ),
        }),
      );
      return;
    }
    const setStore = transaction.objectStore(
      XINMAI_SIX_DIMENSION_OBSERVATION_SET_STORE,
    );
    const receiptStore = transaction.objectStore(
      XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_STORE,
    );
    const fenceStore = transaction.objectStore(
      XINMAI_SIX_DIMENSION_COMMAND_FENCE_STORE,
    );
    const gravityStore = transaction.objectStore(
      XINMAI_GRAVITY_OBSERVATION_CONTINUITY_STORE,
    );
    let currentSetValue: unknown;
    let currentReceiptValue: unknown;
    let currentFenceValue: unknown;
    let gravityValue: unknown;
    let resolvedCount = 0;
    let result: SixDimensionObservationResult<CanonicalSixDimensionObservationSetRecord> =
      Object.freeze({
        status: "SAFE_WITHHELD" as const,
        value: null,
        observationSet: null,
        completionReceipt: null,
        cause: sixDimensionAuthorityCause(
          "TRANSACTION_ABORTED",
          "RETRY_AFTER_ENVIRONMENT_RECOVERY",
          "STORAGE",
        ),
      });
    let preparedWrite = false;
    let uniquenessViolation = false;
    const prepare = () => {
      resolvedCount += 1;
      if (resolvedCount !== 4) return;
      const currentSet =
        currentSetValue === undefined
          ? null
          : currentSetValue;
      const currentReceipt =
        currentReceiptValue === undefined
          ? null
          : currentReceiptValue;
      const currentFence =
        currentFenceValue === undefined
          ? null
          : currentFenceValue;
      if (
        (currentSet !== null &&
          !isCanonicalSixDimensionObservationSetRecord(currentSet)) ||
        (currentReceipt !== null &&
          !isSixDimensionCompletionReceiptRecord(currentReceipt)) ||
        (currentFence !== null &&
          !isSixDimensionCommandFenceRecord(currentFence)) ||
        !isGravityObservationContinuityRecord(gravityValue)
      ) {
        result = Object.freeze({
          status: "SAFE_WITHHELD" as const,
          value: null,
          observationSet: null,
          completionReceipt: null,
          cause: sixDimensionAuthorityCause(
            "RECOVERY_CORRUPTED",
            "NOT_RETRYABLE",
            "STORAGE",
          ),
        });
        return;
      }
      const gravity = gravityValue;
      if (
        gravity.gravityObservationReferenceId !==
          input.expectedGravityObservationReferenceId ||
        gravity.gravityObservationLineageRevision !==
          input.expectedGravityObservationLineageRevision ||
        gravity.lifecycleState !== "CURRENT" ||
        gravity.checkpointState !== "OBSERVATION_RECOGNIZED" ||
        gravity.sourceReality.encounterCycleId !==
          input.observationSet.encounterCycleId ||
        gravity.gravityAdmission.gravityCycleId !==
          input.observationSet.gravityCycleId ||
        gravity.pressureProvenance.selectedPressureSeedId !==
          input.observationSet.pressure.runtimeSeedId ||
        gravity.pressureProvenance.candidateReferenceId !==
          input.observationSet.pressure.candidateReferenceId
      ) {
        result = Object.freeze({
          status: "REJECTED" as const,
          value: null,
          observationSet:
            currentSet as CanonicalSixDimensionObservationSetRecord | null,
          completionReceipt:
            currentReceipt as SixDimensionCompletionReceiptRecord | null,
          cause: sixDimensionAuthorityCause(
            "GRAVITY_NOT_RECOGNIZED",
            "RETRY_AFTER_REREAD",
            "GRAVITY",
          ),
        });
        return;
      }
      if (currentFence !== null) {
        if (
          currentFence.inputDigest !== input.commandFence.inputDigest ||
          currentFence.observationSetId !==
            input.observationSet.observationSetId ||
          currentSet === null
        ) {
          result = Object.freeze({
            status: "REJECTED" as const,
            value: null,
            observationSet:
              currentSet as CanonicalSixDimensionObservationSetRecord | null,
            completionReceipt:
              currentReceipt as SixDimensionCompletionReceiptRecord | null,
            cause: sixDimensionAuthorityCause(
              "IDEMPOTENCY_CONFLICT",
              "NOT_RETRYABLE",
            ),
          });
          return;
        }
        result = Object.freeze({
          status: "ALREADY_COMMITTED" as const,
          value: currentSet as CanonicalSixDimensionObservationSetRecord,
          observationSet:
            currentSet as CanonicalSixDimensionObservationSetRecord,
          completionReceipt:
            currentReceipt as SixDimensionCompletionReceiptRecord | null,
          cause: null,
        });
        return;
      }
      const actualRevision =
        currentSet === null ? 0 : currentSet.revision;
      if (
        actualRevision !== input.expectedObservationSetRevision ||
        input.observationSet.revision !== actualRevision + 1
      ) {
        result = Object.freeze({
          status: "REJECTED" as const,
          value: null,
          observationSet:
            currentSet as CanonicalSixDimensionObservationSetRecord | null,
          completionReceipt:
            currentReceipt as SixDimensionCompletionReceiptRecord | null,
          cause: sixDimensionAuthorityCause(
            "STALE_REVISION",
            "RETRY_AFTER_REREAD",
          ),
        });
        return;
      }
      if (
        !isCanonicalSixDimensionObservationSetRecord(input.observationSet) ||
        !isSixDimensionCommandFenceRecord(input.commandFence) ||
        (input.completionReceipt !== null &&
          !isSixDimensionCompletionReceiptRecord(input.completionReceipt)) ||
        !validateSixDimensionSetReceiptRecordPair(
          input.observationSet,
          input.completionReceipt,
        ) ||
        (currentReceipt !== null && input.completionReceipt === null)
      ) {
        result = Object.freeze({
          status: "REJECTED" as const,
          value: null,
          observationSet:
            currentSet as CanonicalSixDimensionObservationSetRecord | null,
          completionReceipt:
            currentReceipt as SixDimensionCompletionReceiptRecord | null,
          cause: sixDimensionAuthorityCause(
            "INVALID_COMMAND",
            "NOT_RETRYABLE",
          ),
        });
        return;
      }
      try {
        setStore.put(input.observationSet);
        fenceStore.add(input.commandFence);
        if (input.completionReceipt !== null) {
          receiptStore.add(input.completionReceipt);
        }
        preparedWrite = true;
        result = Object.freeze({
          status: "COMMITTED" as const,
          value: input.observationSet,
          observationSet: input.observationSet,
          completionReceipt: input.completionReceipt,
          cause: null,
        });
      } catch {
        try {
          transaction.abort();
        } catch {
          // Transaction completion remains authoritative.
        }
      }
    };
    const setRequest = setStore.get(input.observationSet.observationSetId);
    const receiptRequest = receiptStore
      .index("observationSetId")
      .get(input.observationSet.observationSetId);
    const fenceRequest = fenceStore.get(
      input.commandFence.commandReferenceId,
    );
    const gravityRequest = gravityStore.get(input.gravityRecordId);
    setRequest.onsuccess = () => {
      currentSetValue = setRequest.result;
      prepare();
    };
    receiptRequest.onsuccess = () => {
      currentReceiptValue = receiptRequest.result;
      prepare();
    };
    fenceRequest.onsuccess = () => {
      currentFenceValue = fenceRequest.result;
      prepare();
    };
    gravityRequest.onsuccess = () => {
      gravityValue = gravityRequest.result;
      prepare();
    };
    transaction.oncomplete = () => resolve(result);
    transaction.onabort = () =>
      resolve(
        Object.freeze({
          status: "SAFE_WITHHELD" as const,
          value: null,
          observationSet: null,
          completionReceipt: null,
          cause: sixDimensionAuthorityCause(
            uniquenessViolation
              ? "CANONICAL_UNIQUENESS_VIOLATION"
              : "TRANSACTION_ABORTED",
            uniquenessViolation
              ? "NOT_RETRYABLE"
              : "RETRY_AFTER_ENVIRONMENT_RECOVERY",
            "STORAGE",
          ),
        }),
      );
    transaction.onerror = () => {
      if (transaction.error?.name === "ConstraintError") {
        uniquenessViolation = true;
      }
      if (!preparedWrite) return;
    };
  });
  database.close();
  return outcome;
}

export const XinmaiLivedGrowthTransactionalStore = Object.freeze({
  databaseName: XINMAI_LIVED_GROWTH_DATABASE_NAME,
  databaseVersion: XINMAI_LIVED_GROWTH_DATABASE_VERSION,
  canonicalStore: XINMAI_LIVED_GROWTH_CANONICAL_STORE,
  migrationMetaStore: XINMAI_LIVED_GROWTH_MIGRATION_META_STORE,
  eligibilityIndexStore: XINMAI_LIVED_GROWTH_ELIGIBILITY_INDEX_STORE,
  formationIndexStore: XINMAI_LIVED_GROWTH_FORMATION_INDEX_STORE,
  canonicalProjectionStore:
    XINMAI_LIVED_GROWTH_CRYSTAL_PROJECTION_STORE,
  gravityObservationContinuityStore:
    XINMAI_GRAVITY_OBSERVATION_CONTINUITY_STORE,
  sixDimensionObservationSetStore:
    XINMAI_SIX_DIMENSION_OBSERVATION_SET_STORE,
  sixDimensionCompletionReceiptStore:
    XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_STORE,
  sixDimensionCommandFenceStore:
    XINMAI_SIX_DIMENSION_COMMAND_FENCE_STORE,
  read: readXinmaiLivedGrowthCanonicalState,
  readSixDimensionAuthority:
    readXinmaiSixDimensionAuthoritySnapshot,
  transactSixDimensionAuthority:
    transactXinmaiSixDimensionObservation,
  transact: transactXinmaiLivedGrowthCanonicalState,
  successAuthority: "IDB_TRANSACTION_COMPLETE" as const,
  legacyV1: "READ_ONLY_NO_BACKFILL" as const,
});
