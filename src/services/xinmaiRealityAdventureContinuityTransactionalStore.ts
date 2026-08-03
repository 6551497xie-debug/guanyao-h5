import {
  XINMAI_REALITY_ADVENTURE_CONTINUITY_DATABASE_NAME,
  XINMAI_REALITY_ADVENTURE_CONTINUITY_DATABASE_VERSION,
  XINMAI_REALITY_ADVENTURE_CONTINUITY_MIGRATION_META_ID,
  XINMAI_REALITY_ADVENTURE_CONTINUITY_MIGRATION_META_STORE,
  XINMAI_REALITY_ADVENTURE_CONTINUITY_STORE,
} from "../types/xinmaiRealityAdventureContinuity";
import type {
  RealityAdventureContinuityFailureReason,
  RealityAdventureContinuityMigrationMetaRecord,
  RealityAdventureContinuityMutationDecision,
  RealityAdventureContinuityMutationResult,
  RealityAdventureContinuityReadResult,
  RealityAdventureEncounterContinuityRecord,
  RealityAdventureContinuityUniqueConstraintContext,
} from "../types/xinmaiRealityAdventureContinuity";
import {
  captureRealityAdventureLegacyDigestSnapshot,
  hasRealityAdventureLegacyWriterChanged,
  XINMAI_GRAVITY_ENTRY_LEGACY_STORAGE_KEY,
  XINMAI_REALITY_INTENT_LEGACY_STORAGE_KEY,
} from "./xinmaiRealityAdventureContinuityLegacyAdapter";
import {
  isRealityAdventureContinuityMutationEnabled,
} from "./xinmaiRealityAdventureContinuityMutationPolicy";

type OpenDatabaseResult =
  | Readonly<{ status: "OPEN"; database: IDBDatabase }>
  | Readonly<{
      status: "UNAVAILABLE" | "BLOCKED" | "FAILED";
      database: null;
    }>;

export type RealityAdventureContinuityLookup =
  | Readonly<{ kind: "ENCOUNTER"; value: string }>
  | Readonly<{ kind: "ACTIVE_IDENTITY"; value: string }>
  | Readonly<{ kind: "INTENT"; value: string }>
  | Readonly<{ kind: "ADMISSION"; value: string }>;

const canonicalStoreIndexes = Object.freeze([
  ["activeIdentityKey", "activeIdentityKey"],
  ["intentReferenceId", "realityIntent.intentReferenceId"],
  [
    "recognitionReceiptReferenceId",
    "recognitionReceipt.recognitionReceiptReferenceId",
  ],
  [
    "gravityTransferReferenceId",
    "gravityTransfer.gravityTransferReferenceId",
  ],
  [
    "gravityAdmissionReferenceId",
    "gravityAdmission.admissionReferenceId",
  ],
  ["gravityCycleId", "gravityAdmission.gravityCycleId"],
  [
    "gravityObservationReferenceId",
    "gravityAdmission.gravityObservationReferenceId",
  ],
] as const);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const validText = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const isIdentity = (value: unknown): boolean =>
  isRecord(value) &&
  validText(value.sourceReferenceId) &&
  validText(value.starBeastIdentityReferenceId) &&
  validText(value.mansionCoordinateReferenceId);

const identityMatches = (
  left: Record<string, unknown>,
  right: Record<string, unknown>,
): boolean =>
  left.sourceReferenceId === right.sourceReferenceId &&
  left.starBeastIdentityReferenceId ===
    right.starBeastIdentityReferenceId &&
  left.mansionCoordinateReferenceId ===
    right.mansionCoordinateReferenceId;

const deterministicActiveIdentityKey = (
  identity: Record<string, unknown>,
): string =>
  [
    identity.sourceReferenceId,
    identity.starBeastIdentityReferenceId,
    identity.mansionCoordinateReferenceId,
  ].join("::");

const isDepartureReconciliation = (
  value: unknown,
  record: Record<string, unknown>,
): boolean => {
  if (!isRecord(value) || !isRecord(record.identityReferences)) {
    return false;
  }
  return (
    value.schemaVersion ===
      "XINMAI_REALITY_GRAVITY_DEPARTURE_RECONCILIATION_V1" &&
    validText(value.reconciliationReferenceId) &&
    validText(value.departureReceiptReferenceId) &&
    Number.isInteger(value.departureReceiptRevision) &&
    Number(value.departureReceiptRevision) > 0 &&
    validText(value.choiceActionIntentionReferenceId) &&
    value.sourceEncounterCycleId === record.encounterCycleId &&
    validText(value.gravityCycleId) &&
    validText(value.gravityObservationReferenceId) &&
    isIdentity(value.identityReferences) &&
    identityMatches(
      value.identityReferences as Record<string, unknown>,
      record.identityReferences,
    ) &&
    Number.isInteger(value.observedGrowthEnvelopeRevision) &&
    Number(value.observedGrowthEnvelopeRevision) > 0 &&
    Number.isInteger(value.reconciledCanonicalRevision) &&
    value.reconciledCanonicalRevision === record.canonicalRevision &&
    Number.isInteger(value.reconciledFencingToken) &&
    value.reconciledFencingToken === record.fencingToken &&
    value.state === "EXPLICIT_DEPARTURE_RECONCILED" &&
    validText(value.reconciledAt) &&
    isRecord(value.provenance) &&
    value.provenance.departureAuthority ===
      "XINMAI_LIVED_GROWTH_TRANSACTION_AUTHORITY" &&
    value.provenance.realityAuthority ===
      "XINMAI_REALITY_ADVENTURE_CONTINUITY" &&
    value.provenance.crossStoreAtomicityClaim === false &&
    value.provenance.noActionCompletionClaim === true
  );
};

const isCandidateRevision = (value: unknown): boolean =>
  isRecord(value) &&
  validText(value.catalogRevision) &&
  value.candidateSourceSchemaVersion ===
    "GUANYAO_REALITY_PRESSURE_CANDIDATE_SOURCE_CONTEXT_V1" &&
  value.candidateBundleSchemaVersion ===
    "GUANYAO_REALITY_PRESSURE_CANDIDATE_BUNDLE_V1" &&
  validText(value.sourceReferenceId) &&
  validText(value.candidateBundleReferenceId) &&
  validText(value.candidateBundleRevisionReferenceId) &&
  validText(value.candidateReferenceId) &&
  validText(value.candidateRevisionReferenceId);

const isRecognitionReceipt = (
  value: unknown,
  record: Record<string, unknown>,
): boolean => {
  if (
    !isRecord(value) ||
    value.schemaVersion !==
      "XINMAI_REALITY_PRESSURE_RECOGNITION_RECEIPT_V1" ||
    value.source !==
      "xinmai_reality_pressure_recognition_controller" ||
    !validText(value.recognitionReceiptReferenceId) ||
    !Number.isInteger(value.revision) ||
    Number(value.revision) < 1 ||
    !isRecord(value.fact) ||
    !isIdentity(value.fact.identityReferences) ||
    !identityMatches(
      value.fact.identityReferences as Record<string, unknown>,
      record.identityReferences as Record<string, unknown>,
    ) ||
    value.fact.encounterCycleId !== record.encounterCycleId ||
    !isCandidateRevision(value.fact.candidateRevision) ||
    !validText(value.issuedAt) ||
    !validText(value.updatedAt) ||
    !validText(value.expiresAt)
  ) {
    return false;
  }
  return (
    value.lifecycle === "RECOGNIZED" ||
    value.lifecycle ===
      "CONSUMED_BY_GRAVITY_TRANSFER" ||
    value.lifecycle === "TERMINAL"
  );
};

const isGravityContinuity = (
  transfer: unknown,
  admission: unknown,
  record: Record<string, unknown>,
): boolean => {
  if (!isRecord(transfer) || !isRecord(admission)) return false;
  return (
    transfer.schemaVersion ===
      "XINMAI_REALITY_TO_GRAVITY_TRANSFER_PROOF_V1" &&
    transfer.source ===
      "xinmai_reality_to_gravity_continuity_controller" &&
    validText(transfer.gravityTransferReferenceId) &&
    validText(transfer.recognitionReceiptReferenceId) &&
    transfer.encounterCycleId === record.encounterCycleId &&
    isIdentity(transfer.identityReferences) &&
    identityMatches(
      transfer.identityReferences as Record<string, unknown>,
      record.identityReferences as Record<string, unknown>,
    ) &&
    transfer.routeTarget === "/dynamics" &&
    admission.schemaVersion ===
      "XINMAI_GRAVITY_ENTRY_ADMISSION_V2" &&
    admission.source ===
      "reality_to_gravity_entry_admission_controller" &&
    validText(admission.admissionReferenceId) &&
    validText(admission.gravityCycleId) &&
    validText(admission.gravityObservationReferenceId) &&
    admission.routeTarget === "/dynamics" &&
    isIdentity(admission.identityReferences) &&
    identityMatches(
      admission.identityReferences as Record<string, unknown>,
      record.identityReferences as Record<string, unknown>,
    ) &&
    isRecord(admission.sourceReality) &&
    admission.sourceReality.encounterCycleId ===
      record.encounterCycleId
  );
};

const isCanonicalRecord = (
  value: unknown,
): value is RealityAdventureEncounterContinuityRecord => {
  if (
    !isRecord(value) ||
    (value.schemaVersion !==
      "XINMAI_REALITY_ADVENTURE_ENCOUNTER_CONTINUITY_V1" &&
      value.schemaVersion !==
        "XINMAI_REALITY_ADVENTURE_ENCOUNTER_CONTINUITY_V2") ||
    !validText(value.encounterCycleId) ||
    !Number.isInteger(value.canonicalRevision) ||
    Number(value.canonicalRevision) < 1 ||
    !Number.isInteger(value.fencingToken) ||
    Number(value.fencingToken) < 1 ||
    !isIdentity(value.identityReferences) ||
    !isRecord(value.realityIntent) ||
    !identityMatches(
      value.realityIntent,
      value.identityReferences as Record<string, unknown>,
    ) ||
    value.realityIntent.encounterCycleId !==
      value.encounterCycleId ||
    value.realityIntent.routeTarget !== "/reality" ||
    !validText(value.issuedAt) ||
    !validText(value.updatedAt) ||
    !validText(value.expiresAt) ||
    !isRecord(value.provenance) ||
    value.provenance.noBackfill !== true ||
    value.provenance.noDomAuthority !== true ||
    value.provenance.noRendererAuthority !== true ||
    value.provenance.noGrowthAuthority !== true
  ) {
    return false;
  }
  const expectedActiveIdentityKey = deterministicActiveIdentityKey(
    value.identityReferences as Record<string, unknown>,
  );
  if (
    (value.lifecycle === "TERMINAL" &&
      value.activeIdentityKey !== undefined) ||
    (value.lifecycle !== "TERMINAL" &&
      value.activeIdentityKey !== expectedActiveIdentityKey)
  ) {
    return false;
  }
  if (
    value.schemaVersion ===
      "XINMAI_REALITY_ADVENTURE_ENCOUNTER_CONTINUITY_V2" &&
    value.departureReconciliation !== null
  ) {
    const reconciliation = value.departureReconciliation;
    if (
      !isRecord(reconciliation) ||
      !isDepartureReconciliation(reconciliation, value) ||
      value.lifecycle !== "TERMINAL" ||
      value.terminalReason !== "EXPLICIT_LEAVE" ||
      !isRecord(value.gravityAdmission) ||
      value.gravityAdmission.gravityCycleId !==
        reconciliation.gravityCycleId ||
      value.gravityAdmission.gravityObservationReferenceId !==
        reconciliation.gravityObservationReferenceId
    ) {
      return false;
    }
  }
  if (
    value.candidateRevision !== null &&
    !isCandidateRevision(value.candidateRevision)
  ) {
    return false;
  }
  if (
    value.recognitionReceipt !== null &&
    !isRecognitionReceipt(value.recognitionReceipt, value)
  ) {
    return false;
  }
  const hasGravityContinuity =
    value.gravityTransfer !== null ||
    value.gravityAdmission !== null;
  if (
    hasGravityContinuity &&
    !isGravityContinuity(
      value.gravityTransfer,
      value.gravityAdmission,
      value,
    )
  ) {
    return false;
  }
  if (
    hasGravityContinuity &&
    (!isRecord(value.gravityTransfer) ||
      !isRecord(value.gravityAdmission) ||
      !isRecord(value.recognitionReceipt) ||
      value.gravityTransfer.recognitionReceiptReferenceId !==
        value.recognitionReceipt
          .recognitionReceiptReferenceId ||
      value.recognitionReceipt
        .consumedGravityTransferReferenceId !==
        value.gravityTransfer.gravityTransferReferenceId ||
      value.recognitionReceipt
        .consumedGravityAdmissionReferenceId !==
        value.gravityAdmission.admissionReferenceId)
  ) {
    return false;
  }
  if (
    value.lifecycle === "PRESSURE_RECOGNIZED" &&
    (value.recognitionReceipt === null ||
      !isRecord(value.recognitionReceipt) ||
      value.recognitionReceipt.lifecycle !== "RECOGNIZED" ||
      hasGravityContinuity)
  ) {
    return false;
  }
  if (
    (value.lifecycle === "GRAVITY_ADMITTED" ||
      value.lifecycle === "ACTIVE_IN_GRAVITY") &&
    (!hasGravityContinuity ||
      value.recognitionReceipt === null ||
      !isRecord(value.recognitionReceipt) ||
      value.recognitionReceipt.lifecycle !==
        "CONSUMED_BY_GRAVITY_TRANSFER")
  ) {
    return false;
  }
  return (
    value.lifecycle === "REALITY_PENDING" ||
    value.lifecycle === "REALITY_ACTIVE" ||
    value.lifecycle === "PRESSURE_RECOGNIZED" ||
    value.lifecycle === "GRAVITY_ADMITTED" ||
    value.lifecycle === "ACTIVE_IN_GRAVITY" ||
    value.lifecycle === "TERMINAL"
  );
};

const isMigrationMeta = (
  value: unknown,
): value is RealityAdventureContinuityMigrationMetaRecord =>
  isRecord(value) &&
  value.id ===
    XINMAI_REALITY_ADVENTURE_CONTINUITY_MIGRATION_META_ID &&
  value.schemaVersion ===
    "XINMAI_REALITY_ADVENTURE_CONTINUITY_MIGRATION_META_V1" &&
  value.realityLegacyStorageKey ===
    XINMAI_REALITY_INTENT_LEGACY_STORAGE_KEY &&
  value.gravityLegacyStorageKey ===
    XINMAI_GRAVITY_ENTRY_LEGACY_STORAGE_KEY &&
  validText(value.realityLegacyDigest) &&
  validText(value.gravityLegacyDigest) &&
  Number.isInteger(value.realityLegacyRawLength) &&
  Number.isInteger(value.gravityLegacyRawLength) &&
  value.noBackfill === true &&
  validText(value.cutoverAt) &&
  validText(value.lastCheckedAt) &&
  (value.status === "CUTOVER_READY" ||
    value.status === "LEGACY_WRITER_DETECTED" ||
    value.status === "LEGACY_SOURCE_CORRUPTED");

const freezeCanonicalRecord = (
  record: RealityAdventureEncounterContinuityRecord,
): RealityAdventureEncounterContinuityRecord =>
  Object.freeze({
    ...record,
    identityReferences: Object.freeze({
      ...record.identityReferences,
    }),
    realityIntent: Object.freeze({ ...record.realityIntent }),
    candidateRevision:
      record.candidateRevision === null
        ? null
        : Object.freeze({ ...record.candidateRevision }),
    recognitionReceipt:
      record.recognitionReceipt === null
        ? null
        : Object.freeze({
            ...record.recognitionReceipt,
            fact: Object.freeze({
              ...record.recognitionReceipt.fact,
              identityReferences: Object.freeze({
                ...record.recognitionReceipt.fact.identityReferences,
              }),
              candidateRevision: Object.freeze({
                ...record.recognitionReceipt.fact.candidateRevision,
              }),
              pressureProvenance: Object.freeze({
                ...record.recognitionReceipt.fact.pressureProvenance,
              }),
            }),
          }),
    gravityTransfer:
      record.gravityTransfer === null
        ? null
        : Object.freeze({
            ...record.gravityTransfer,
            identityReferences: Object.freeze({
              ...record.gravityTransfer.identityReferences,
            }),
          }),
    gravityAdmission:
      record.gravityAdmission === null
        ? null
        : Object.freeze({ ...record.gravityAdmission }),
    ...("departureReconciliation" in record
      ? {
          departureReconciliation:
            record.departureReconciliation === null
              ? null
              : Object.freeze({
                  ...record.departureReconciliation,
                  identityReferences: Object.freeze({
                    ...record.departureReconciliation.identityReferences,
                  }),
                  provenance: Object.freeze({
                    ...record.departureReconciliation.provenance,
                  }),
                }),
        }
      : {}),
    provenance: Object.freeze({ ...record.provenance }),
  });

const openDatabase = (): Promise<OpenDatabaseResult> =>
  new Promise((resolve) => {
    if (typeof indexedDB === "undefined") {
      resolve(Object.freeze({ status: "UNAVAILABLE", database: null }));
      return;
    }
    let settled = false;
    let request: IDBOpenDBRequest;
    try {
      request = indexedDB.open(
        XINMAI_REALITY_ADVENTURE_CONTINUITY_DATABASE_NAME,
        XINMAI_REALITY_ADVENTURE_CONTINUITY_DATABASE_VERSION,
      );
    } catch {
      resolve(Object.freeze({ status: "FAILED", database: null }));
      return;
    }
    request.onupgradeneeded = () => {
      const database = request.result;
      if (
        !database.objectStoreNames.contains(
          XINMAI_REALITY_ADVENTURE_CONTINUITY_STORE,
        )
      ) {
        const store = database.createObjectStore(
          XINMAI_REALITY_ADVENTURE_CONTINUITY_STORE,
          { keyPath: "encounterCycleId" },
        );
        for (const [name, keyPath] of canonicalStoreIndexes) {
          store.createIndex(name, keyPath, { unique: true });
        }
      }
      if (
        !database.objectStoreNames.contains(
          XINMAI_REALITY_ADVENTURE_CONTINUITY_MIGRATION_META_STORE,
        )
      ) {
        database.createObjectStore(
          XINMAI_REALITY_ADVENTURE_CONTINUITY_MIGRATION_META_STORE,
          { keyPath: "id" },
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

const openFailureReason = (
  result: Exclude<OpenDatabaseResult, { status: "OPEN" }>,
): RealityAdventureContinuityFailureReason =>
  result.status === "BLOCKED"
    ? "TRANSACTION_OPEN_BLOCKED"
    : "TRANSACTION_STORAGE_UNAVAILABLE";

const createReadwriteTransaction = (
  database: IDBDatabase,
): IDBTransaction => {
  const stores = [
    XINMAI_REALITY_ADVENTURE_CONTINUITY_STORE,
    XINMAI_REALITY_ADVENTURE_CONTINUITY_MIGRATION_META_STORE,
  ];
  try {
    return database.transaction(stores, "readwrite", {
      durability: "strict",
    });
  } catch {
    return database.transaction(stores, "readwrite");
  }
};

const lookupRequest = (
  store: IDBObjectStore,
  lookup: RealityAdventureContinuityLookup,
): IDBRequest =>
  lookup.kind === "ENCOUNTER"
    ? store.get(lookup.value)
    : lookup.kind === "ACTIVE_IDENTITY"
      ? store.index("activeIdentityKey").get(lookup.value)
      : lookup.kind === "INTENT"
        ? store.index("intentReferenceId").get(lookup.value)
        : store
            .index("gravityAdmissionReferenceId")
            .get(lookup.value);

const createMigrationMeta = (
  capturedAt: string,
): RealityAdventureContinuityMigrationMetaRecord | null => {
  const legacy = captureRealityAdventureLegacyDigestSnapshot();
  if (legacy.status !== "AVAILABLE") return null;
  return Object.freeze({
    id: XINMAI_REALITY_ADVENTURE_CONTINUITY_MIGRATION_META_ID,
    schemaVersion:
      "XINMAI_REALITY_ADVENTURE_CONTINUITY_MIGRATION_META_V1" as const,
    realityLegacyStorageKey:
      XINMAI_REALITY_INTENT_LEGACY_STORAGE_KEY,
    gravityLegacyStorageKey:
      XINMAI_GRAVITY_ENTRY_LEGACY_STORAGE_KEY,
    realityLegacyDigest: legacy.realityLegacyDigest,
    gravityLegacyDigest: legacy.gravityLegacyDigest,
    realityLegacyRawLength: legacy.realityLegacyRawLength,
    gravityLegacyRawLength: legacy.gravityLegacyRawLength,
    status: "CUTOVER_READY" as const,
    noBackfill: true as const,
    cutoverAt: capturedAt,
    lastCheckedAt: capturedAt,
  });
};

const legacyMatchesMeta = (
  meta: RealityAdventureContinuityMigrationMetaRecord,
): boolean => {
  const legacy = captureRealityAdventureLegacyDigestSnapshot();
  const realityCompatible =
    legacy.status === "AVAILABLE" &&
    (legacy.realityLegacyRawLength === 0 ||
      (legacy.realityLegacyDigest ===
        meta.realityLegacyDigest &&
        legacy.realityLegacyRawLength ===
          meta.realityLegacyRawLength));
  const gravityCompatible =
    legacy.status === "AVAILABLE" &&
    (legacy.gravityLegacyRawLength === 0 ||
      (legacy.gravityLegacyDigest ===
        meta.gravityLegacyDigest &&
        legacy.gravityLegacyRawLength ===
          meta.gravityLegacyRawLength));
  return (
    !hasRealityAdventureLegacyWriterChanged() &&
    realityCompatible &&
    gravityCompatible
  );
};

const safeRead = (
  database: IDBDatabase,
  lookup: RealityAdventureContinuityLookup,
): Promise<RealityAdventureContinuityReadResult> =>
  new Promise((resolve) => {
    let transaction: IDBTransaction;
    try {
      transaction = database.transaction(
        [
          XINMAI_REALITY_ADVENTURE_CONTINUITY_STORE,
          XINMAI_REALITY_ADVENTURE_CONTINUITY_MIGRATION_META_STORE,
        ],
        "readonly",
      );
    } catch {
      database.close();
      resolve(Object.freeze({
        status: "SAFE_WITHHELD" as const,
        record: null,
        migration: null,
        reason: "TRANSACTION_CONNECTION_CLOSED" as const,
      }));
      return;
    }
    let record: RealityAdventureEncounterContinuityRecord | null = null;
    let migration: RealityAdventureContinuityMigrationMetaRecord | null =
      null;
    let corrupted = false;
    const store = transaction.objectStore(
      XINMAI_REALITY_ADVENTURE_CONTINUITY_STORE,
    );
    const metaStore = transaction.objectStore(
      XINMAI_REALITY_ADVENTURE_CONTINUITY_MIGRATION_META_STORE,
    );
    const metaRequest = metaStore.get(
      XINMAI_REALITY_ADVENTURE_CONTINUITY_MIGRATION_META_ID,
    );
    metaRequest.onerror = () => {
      corrupted = true;
    };
    metaRequest.onsuccess = () => {
      if (metaRequest.result !== undefined) {
        if (!isMigrationMeta(metaRequest.result)) {
          corrupted = true;
        } else {
          migration = Object.freeze({ ...metaRequest.result });
        }
      }
    };
    const request = lookupRequest(store, lookup);
    request.onerror = () => {
      corrupted = true;
    };
    request.onsuccess = () => {
      if (request.result !== undefined) {
        if (!isCanonicalRecord(request.result)) {
          corrupted = true;
        } else {
          record = freezeCanonicalRecord(request.result);
        }
      }
    };
    transaction.onabort = () => {
      database.close();
      resolve(Object.freeze({
        status: "SAFE_WITHHELD" as const,
        record: null,
        migration,
        reason: "TRANSACTION_ABORTED" as const,
      }));
    };
    transaction.onerror = () => undefined;
    transaction.oncomplete = () => {
      database.close();
      if (corrupted) {
        resolve(Object.freeze({
          status: "SAFE_WITHHELD" as const,
          record: null,
          migration,
          reason: "RECOVERY_CORRUPTED" as const,
        }));
        return;
      }
      if (
        migration !== null &&
        (migration.status !== "CUTOVER_READY" ||
          !legacyMatchesMeta(migration))
      ) {
        resolve(Object.freeze({
          status: "SAFE_WITHHELD" as const,
          record: null,
          migration,
          reason:
            migration.status === "LEGACY_SOURCE_CORRUPTED"
              ? "LEGACY_SOURCE_CORRUPTED" as const
              : "LEGACY_WRITER_DETECTED" as const,
        }));
        return;
      }
      if (record !== null && migration === null) {
        resolve(Object.freeze({
          status: "SAFE_WITHHELD" as const,
          record: null,
          migration: null,
          reason: "RECOVERY_CORRUPTED" as const,
        }));
        return;
      }
      if (record === null) {
        resolve(Object.freeze({
          status: "NOT_FOUND" as const,
          record: null,
          migration,
          reason: null,
        }));
        return;
      }
      if (migration === null) {
        resolve(Object.freeze({
          status: "SAFE_WITHHELD" as const,
          record: null,
          migration: null,
          reason: "RECOVERY_CORRUPTED" as const,
        }));
        return;
      }
      resolve(Object.freeze({
        status: "FOUND" as const,
        record,
        migration,
        reason: null,
      }));
    };
  });

export async function readRealityAdventureContinuity(
  lookup: RealityAdventureContinuityLookup,
): Promise<RealityAdventureContinuityReadResult> {
  const opened = await openDatabase();
  if (opened.status !== "OPEN") {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      record: null,
      migration: null,
      reason: openFailureReason(opened),
    });
  }
  return safeRead(opened.database, lookup);
}

export async function transactRealityAdventureContinuity<TValue>(
  input: Readonly<{
    lookup: RealityAdventureContinuityLookup;
    mutate: (
      current: RealityAdventureEncounterContinuityRecord | null,
    ) => RealityAdventureContinuityMutationDecision<TValue>;
  }>,
): Promise<RealityAdventureContinuityMutationResult<TValue>> {
  if (!isRealityAdventureContinuityMutationEnabled()) {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      record: null,
      value: null,
      reason: "MUTATION_PAUSED" as const,
      uniqueConstraint: null,
    });
  }
  const { lookup, mutate: mutation } = input;
  const opened = await openDatabase();
  if (opened.status !== "OPEN") {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      record: null,
      value: null,
      reason: openFailureReason(opened),
      uniqueConstraint: null,
    });
  }
  const database = opened.database;
  return new Promise((resolve) => {
    let transaction: IDBTransaction;
    try {
      transaction = createReadwriteTransaction(database);
    } catch {
      database.close();
      resolve(Object.freeze({
        status: "SAFE_WITHHELD" as const,
        record: null,
        value: null,
        reason: "TRANSACTION_CONNECTION_CLOSED" as const,
        uniqueConstraint: null,
      }));
      return;
    }
    let decision:
      | RealityAdventureContinuityMutationDecision<TValue>
      | null = null;
    let failureReason: RealityAdventureContinuityFailureReason | null =
      null;
    let uniqueConstraint:
      | RealityAdventureContinuityUniqueConstraintContext
      | null = null;
    const store = transaction.objectStore(
      XINMAI_REALITY_ADVENTURE_CONTINUITY_STORE,
    );
    const metaStore = transaction.objectStore(
      XINMAI_REALITY_ADVENTURE_CONTINUITY_MIGRATION_META_STORE,
    );
    const metaRequest = metaStore.get(
      XINMAI_REALITY_ADVENTURE_CONTINUITY_MIGRATION_META_ID,
    );
    metaRequest.onerror = () => {
      failureReason = "RECOVERY_CORRUPTED";
      transaction.abort();
    };
    metaRequest.onsuccess = () => {
      const now = new Date().toISOString();
      let migration: RealityAdventureContinuityMigrationMetaRecord | null;
      if (metaRequest.result === undefined) {
        migration = createMigrationMeta(now);
        if (migration === null) {
          failureReason = "LEGACY_SOURCE_CORRUPTED";
          transaction.abort();
          return;
        }
        metaStore.put(migration);
      } else if (!isMigrationMeta(metaRequest.result)) {
        failureReason = "RECOVERY_CORRUPTED";
        transaction.abort();
        return;
      } else {
        migration = metaRequest.result;
        if (
          migration.status !== "CUTOVER_READY" ||
          !legacyMatchesMeta(migration)
        ) {
          const nextMeta = Object.freeze({
            ...migration,
            status: "LEGACY_WRITER_DETECTED" as const,
            lastCheckedAt: now,
          });
          metaStore.put(nextMeta);
          failureReason = "LEGACY_WRITER_DETECTED";
          decision = null;
          return;
        }
      }

      const request = lookupRequest(store, lookup);
      request.onerror = () => {
        failureReason = "RECOVERY_CORRUPTED";
        transaction.abort();
      };
      request.onsuccess = () => {
        const current =
          request.result === undefined
            ? null
            : isCanonicalRecord(request.result)
              ? freezeCanonicalRecord(request.result)
              : null;
        if (
          request.result !== undefined &&
          current === null
        ) {
          failureReason = "RECOVERY_CORRUPTED";
          transaction.abort();
          return;
        }
        try {
          decision = mutation(current);
        } catch {
          failureReason = "TRANSACTION_ABORTED";
          transaction.abort();
          return;
        }
        if (decision.status === "COMMIT") {
          if (!isCanonicalRecord(decision.record)) {
            failureReason = "RECOVERY_CORRUPTED";
            transaction.abort();
            return;
          }
          for (const retainedRecord of decision.retainedRecords ?? []) {
            if (!isCanonicalRecord(retainedRecord)) {
              failureReason = "RECOVERY_CORRUPTED";
              transaction.abort();
              return;
            }
            const retainedPut = store.put(retainedRecord);
            retainedPut.onerror = () => {
              if (retainedPut.error?.name === "ConstraintError") {
                failureReason = "UNIQUE_CONSTRAINT_REJECTED";
                uniqueConstraint = Object.freeze({
                  operation: "RETAINED_RECORD_PUT" as const,
                  attemptedEncounterCycleId:
                    retainedRecord.encounterCycleId,
                  attemptedActiveIdentityKey:
                    retainedRecord.activeIdentityKey ?? null,
                });
              } else {
                failureReason = "WRITE_UNCONFIRMED";
              }
            };
          }
          const put = store.put(decision.record);
          put.onerror = () => {
            if (put.error?.name === "ConstraintError") {
              failureReason = "UNIQUE_CONSTRAINT_REJECTED";
              uniqueConstraint = Object.freeze({
                operation: "CANONICAL_RECORD_PUT" as const,
                attemptedEncounterCycleId:
                  decision?.status === "COMMIT"
                    ? decision.record.encounterCycleId
                    : null,
                attemptedActiveIdentityKey:
                  decision?.status === "COMMIT"
                    ? decision.record.activeIdentityKey ?? null
                    : null,
              });
            } else {
              failureReason = "WRITE_UNCONFIRMED";
            }
          };
        }
      };
    };
    transaction.onabort = () => {
      database.close();
      resolve(Object.freeze({
        status: "SAFE_WITHHELD" as const,
        record: null,
        value: null,
        reason: failureReason ?? "TRANSACTION_ABORTED",
        uniqueConstraint,
      }));
    };
    transaction.onerror = () => {
      if (transaction.error?.name === "ConstraintError") {
        failureReason = "UNIQUE_CONSTRAINT_REJECTED";
        uniqueConstraint ??= Object.freeze({
          operation: "TRANSACTION_UNKNOWN" as const,
          attemptedEncounterCycleId: null,
          attemptedActiveIdentityKey: null,
        });
      }
    };
    transaction.oncomplete = () => {
      database.close();
      if (failureReason !== null || decision === null) {
        resolve(Object.freeze({
          status: "SAFE_WITHHELD" as const,
          record: null,
          value: null,
          reason: failureReason ?? "WRITE_UNCONFIRMED",
          uniqueConstraint,
        }));
        return;
      }
      resolve(Object.freeze({
        status:
          decision.status === "COMMIT"
            ? "COMMITTED" as const
            : decision.status,
        record:
          decision.record === null
            ? null
            : freezeCanonicalRecord(decision.record),
        value: decision.value,
        reason: null,
      }));
    };
  });
}

export const XinmaiRealityAdventureContinuityTransactionalStore =
  Object.freeze({
    databaseName:
      XINMAI_REALITY_ADVENTURE_CONTINUITY_DATABASE_NAME,
    databaseVersion:
      XINMAI_REALITY_ADVENTURE_CONTINUITY_DATABASE_VERSION,
    canonicalStore:
      XINMAI_REALITY_ADVENTURE_CONTINUITY_STORE,
    migrationMetaStore:
      XINMAI_REALITY_ADVENTURE_CONTINUITY_MIGRATION_META_STORE,
    read: readRealityAdventureContinuity,
    transact: transactRealityAdventureContinuity,
    boundary: Object.freeze({
      indexedDbCanonicalAuthority: true as const,
      transactionCompleteOnlySuccess: true as const,
      overlappingReadwriteTransactionsSerialize: true as const,
      legacySessionStorageReadOnly: true as const,
      noLocalStorageAuthority: true as const,
      noWebLockAuthority: true as const,
      noBackfill: true as const,
      noGrowthAuthority: true as const,
    }),
  });
