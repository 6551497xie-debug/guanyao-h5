import type {
  XinmaiLivedGrowthCommandMetadata,
  XinmaiLivedGrowthTransactionDecision,
  XinmaiLivedGrowthTransactionOutcome,
  XinmaiLivedGrowthTransactionSafeWithheldReason,
} from "../types/xinmaiLivedGrowthTransaction";
import type { XinmaiLivedGrowthEnvelope } from "../types/xinmaiLivedGrowthRecovery";
import {
  XINMAI_GRAVITY_OBSERVATION_CONTINUITY_SCHEMA_VERSION,
  XINMAI_GRAVITY_OBSERVATION_CONTINUITY_STORE,
  type GravityObservationContinuityReadResult,
  type GravityObservationContinuityRecord,
  type GravityObservationContinuityTransactionDecision,
  type GravityObservationContinuityTransactionOutcome,
} from "../types/xinmaiGravityObservationContinuity";
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
  readXinmaiLivedGrowthRecoveryCandidate,
} from "./xinmaiLivedGrowthRecoveryPersistenceAdapter";
import { notifyXinmaiLivedGrowthCanonicalRevision } from "./xinmaiLivedGrowthRecoveryRevisionObserver";

const STORE_NAMES: string[] = [
  XINMAI_LIVED_GROWTH_CANONICAL_STORE,
  XINMAI_LIVED_GROWTH_MIGRATION_META_STORE,
  XINMAI_LIVED_GROWTH_ELIGIBILITY_INDEX_STORE,
  XINMAI_LIVED_GROWTH_FORMATION_INDEX_STORE,
  XINMAI_LIVED_GROWTH_CRYSTAL_PROJECTION_STORE,
  XINMAI_GRAVITY_OBSERVATION_CONTINUITY_STORE,
];

const LEGACY_ABSENT_SENTINEL = "XINMAI_LEGACY_V1_ABSENT";

type LegacySnapshot = Readonly<{
  raw: string | null;
  digest: string;
  envelope: XinmaiLivedGrowthEnvelope | null;
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
      const envelope =
        snapshot.status === "FOUND" && snapshot.envelope
          ? snapshot.envelope
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
      reason: initialized.reason,
    });
  }
  const opened = await openCanonicalDatabase();
  if (opened.status !== "OPEN") {
    return Object.freeze({
      status: "UNAVAILABLE" as const,
      envelope: null,
      migration: null,
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
      let transaction: IDBTransaction;
      try {
        transaction = database.transaction(
          [
            XINMAI_LIVED_GROWTH_CANONICAL_STORE,
            XINMAI_LIVED_GROWTH_MIGRATION_META_STORE,
          ],
          "readonly",
        );
      } catch {
        resolve(
          Object.freeze({
            status: "UNAVAILABLE" as const,
            envelope: null,
            migration: null,
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
      canonicalRequest.onsuccess = () => {
        canonicalValue = canonicalRequest.result;
      };
      metaRequest.onsuccess = () => {
        metaValue = metaRequest.result;
      };
      transaction.oncomplete = () => {
        const canonical = canonicalValue as
          | Partial<XinmaiLivedGrowthCanonicalRecord>
          | undefined;
        if (
          canonical?.id !== XINMAI_LIVED_GROWTH_CANONICAL_RECORD_ID ||
          !isXinmaiLivedGrowthEnvelope(canonical.envelope) ||
          !isMigrationMeta(metaValue)
        ) {
          resolve(
            Object.freeze({
              status: "CORRUPTED" as const,
              envelope: null,
              migration: null,
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
          }),
        );
      };
      transaction.onabort = () =>
        resolve(
          Object.freeze({
            status: "SAFE_WITHHELD" as const,
            envelope: null,
            migration: null,
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
    const prepare = () => {
      if (
        !canonicalResolved ||
        !metaResolved ||
        !recordResolved
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
  read: readXinmaiLivedGrowthCanonicalState,
  transact: transactXinmaiLivedGrowthCanonicalState,
  successAuthority: "IDB_TRANSACTION_COMPLETE" as const,
  legacyV1: "READ_ONLY_NO_BACKFILL" as const,
});
