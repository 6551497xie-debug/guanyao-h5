import {
  XINMAI_LIFE_COMPANION_CANONICAL_DATABASE_NAME,
  XINMAI_LIFE_COMPANION_CANONICAL_DATABASE_VERSION,
  XINMAI_LIFE_COMPANION_COMMAND_FENCE_STORE,
  XINMAI_LIFE_COMPANION_RELATIONSHIP_STORE,
  type XinmaiLifeCompanionCanonicalCommitResult,
  type XinmaiLifeCompanionCanonicalReadResult,
  type XinmaiLifeCompanionCommandFence,
  type XinmaiLifeCompanionIdentityReferences,
  type XinmaiLifeCompanionRelationshipAggregate,
} from "../types/xinmaiLifeCompanionRelationshipCanonical";
import {
  createXinmaiLifeCompanionIdentityKey,
  isXinmaiLifeCompanionCommandFence,
  isXinmaiLifeCompanionRelationshipAggregate,
  validateXinmaiLifeCompanionCommandFenceBinding,
  validateXinmaiLifeCompanionRelationshipEvidence,
  xinmaiLifeCompanionIdentityMatches,
} from "./xinmaiLifeCompanionRelationshipEvidenceValidator";

type OpenResult =
  | Readonly<{ status: "OPEN"; database: IDBDatabase }>
  | Readonly<{
      status: "UNAVAILABLE" | "BLOCKED" | "FAILED";
      database: null;
    }>;

const openDatabase = (): Promise<OpenResult> =>
  new Promise((resolve) => {
    if (typeof indexedDB === "undefined") {
      resolve(Object.freeze({ status: "UNAVAILABLE", database: null }));
      return;
    }
    let settled = false;
    let request: IDBOpenDBRequest;
    try {
      request = indexedDB.open(
        XINMAI_LIFE_COMPANION_CANONICAL_DATABASE_NAME,
        XINMAI_LIFE_COMPANION_CANONICAL_DATABASE_VERSION,
      );
    } catch {
      resolve(Object.freeze({ status: "FAILED", database: null }));
      return;
    }
    request.onupgradeneeded = () => {
      const database = request.result;
      if (
        !database.objectStoreNames.contains(
          XINMAI_LIFE_COMPANION_RELATIONSHIP_STORE,
        )
      ) {
        const relationshipStore = database.createObjectStore(
          XINMAI_LIFE_COMPANION_RELATIONSHIP_STORE,
          { keyPath: "relationshipId" },
        );
        relationshipStore.createIndex("identityKey", "identityKey", {
          unique: true,
        });
        relationshipStore.createIndex(
          "firstEncounterReceiptReferenceId",
          "firstEncounterReceiptReferenceId",
          { unique: true },
        );
      }
      if (
        !database.objectStoreNames.contains(
          XINMAI_LIFE_COMPANION_COMMAND_FENCE_STORE,
        )
      ) {
        const fenceStore = database.createObjectStore(
          XINMAI_LIFE_COMPANION_COMMAND_FENCE_STORE,
          { keyPath: "commandReferenceId" },
        );
        fenceStore.createIndex("outcomeReferenceId", "outcomeReferenceId", {
          unique: true,
        });
        fenceStore.createIndex("relationshipId", "relationshipId", {
          unique: false,
        });
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

const readFailure = (
  status: Exclude<OpenResult["status"], "OPEN">,
): XinmaiLifeCompanionCanonicalReadResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    reason:
      status === "UNAVAILABLE"
        ? "STORAGE_UNAVAILABLE" as const
        : status === "BLOCKED"
          ? "STORAGE_BLOCKED" as const
          : "STORAGE_FAILED" as const,
    relationship: null,
  });

export async function readXinmaiLifeCompanionCanonicalRelationship(
  identity: XinmaiLifeCompanionIdentityReferences,
): Promise<XinmaiLifeCompanionCanonicalReadResult> {
  const opened = await openDatabase();
  if (opened.status !== "OPEN") return readFailure(opened.status);
  const database = opened.database;
  const identityKey = createXinmaiLifeCompanionIdentityKey(identity);
  return new Promise((resolve) => {
    let value: unknown = null;
    let requestFailed = false;
    let transaction: IDBTransaction;
    try {
      transaction = database.transaction(
        XINMAI_LIFE_COMPANION_RELATIONSHIP_STORE,
        "readonly",
      );
      const request = transaction
        .objectStore(XINMAI_LIFE_COMPANION_RELATIONSHIP_STORE)
        .index("identityKey")
        .get(identityKey);
      request.onsuccess = () => {
        value = request.result ?? null;
      };
      request.onerror = () => {
        requestFailed = true;
      };
    } catch {
      database.close();
      resolve(readFailure("FAILED"));
      return;
    }
    transaction.onabort = () => {
      database.close();
      resolve(Object.freeze({
        status: "UNAVAILABLE" as const,
        reason: "TRANSACTION_ABORTED" as const,
        relationship: null,
      }));
    };
    transaction.onerror = () => undefined;
    transaction.oncomplete = () => {
      database.close();
      if (requestFailed) {
        resolve(readFailure("FAILED"));
        return;
      }
      if (value === null) {
        resolve(Object.freeze({ status: "NOT_FOUND" as const, relationship: null }));
        return;
      }
      if (!isXinmaiLifeCompanionRelationshipAggregate(value)) {
        resolve(Object.freeze({
          status: "UNAVAILABLE" as const,
          reason: "RELATIONSHIP_CORRUPTED" as const,
          relationship: null,
        }));
        return;
      }
      const relationship = value;
      if (!xinmaiLifeCompanionIdentityMatches(relationship.identityReferences, identity)) {
        resolve(Object.freeze({
          status: "UNAVAILABLE" as const,
          reason: "IDENTITY_REFERENCE_MISMATCH" as const,
          relationship: null,
        }));
        return;
      }
      void validateXinmaiLifeCompanionRelationshipEvidence(relationship).then((valid) => {
        resolve(valid
          ? Object.freeze({ status: "AVAILABLE" as const, relationship })
          : Object.freeze({
              status: "UNAVAILABLE" as const,
              reason: "RELATIONSHIP_CORRUPTED" as const,
              relationship: null,
            }));
      });
    };
  });
}

const commitUnavailable = (
  status: Exclude<OpenResult["status"], "OPEN">,
): XinmaiLifeCompanionCanonicalCommitResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    reason:
      status === "UNAVAILABLE"
        ? "STORAGE_UNAVAILABLE" as const
        : status === "BLOCKED"
          ? "STORAGE_BLOCKED" as const
          : "STORAGE_FAILED" as const,
    relationship: null,
    fence: null,
  });

export async function commitXinmaiLifeCompanionCanonicalRelationship(
  relationship: XinmaiLifeCompanionRelationshipAggregate,
  fence: XinmaiLifeCompanionCommandFence,
): Promise<XinmaiLifeCompanionCanonicalCommitResult> {
  if (
    !isXinmaiLifeCompanionRelationshipAggregate(relationship) ||
    !isXinmaiLifeCompanionCommandFence(fence) ||
    !(await validateXinmaiLifeCompanionRelationshipEvidence(relationship)) ||
    !(await validateXinmaiLifeCompanionCommandFenceBinding(
      relationship,
      fence,
    ))
  ) {
    return Object.freeze({
      status: "CONFLICT" as const,
      reason: "COMMAND_FENCE_CONFLICT" as const,
      relationship: null,
      fence: null,
    });
  }
  const opened = await openDatabase();
  if (opened.status !== "OPEN") return commitUnavailable(opened.status);
  const database = opened.database;
  return new Promise((resolve) => {
    let transaction: IDBTransaction;
    let existingRelationship: unknown = null;
    let existingFence: unknown = null;
    let reads = 0;
    let result: XinmaiLifeCompanionCanonicalCommitResult | null = null;
    let commitPrepared = false;
    const conflict = (reason: "COMMAND_FENCE_CONFLICT" | "IDENTITY_ALREADY_BOUND") => {
      result = Object.freeze({
        status: "CONFLICT" as const,
        reason,
        relationship: null,
        fence: null,
      });
    };
    try {
      transaction = database.transaction(
        [
          XINMAI_LIFE_COMPANION_RELATIONSHIP_STORE,
          XINMAI_LIFE_COMPANION_COMMAND_FENCE_STORE,
        ],
        "readwrite",
      );
      const relationshipStore = transaction.objectStore(
        XINMAI_LIFE_COMPANION_RELATIONSHIP_STORE,
      );
      const fenceStore = transaction.objectStore(
        XINMAI_LIFE_COMPANION_COMMAND_FENCE_STORE,
      );
      const decide = () => {
        reads += 1;
        if (reads !== 2) return;
        if (existingRelationship !== null || existingFence !== null) {
          if (
            isXinmaiLifeCompanionRelationshipAggregate(existingRelationship) &&
            isXinmaiLifeCompanionCommandFence(existingFence) &&
            existingRelationship.relationshipId === relationship.relationshipId &&
            existingRelationship.relationshipDigest === relationship.relationshipDigest &&
            existingFence.commandReferenceId === fence.commandReferenceId &&
            existingFence.outcomeReferenceId === fence.outcomeReferenceId &&
            existingFence.commandDigest === fence.commandDigest &&
            existingFence.relationshipId === fence.relationshipId &&
            existingFence.identityKey === fence.identityKey
          ) {
            result = Object.freeze({
              status: "ALREADY_COMMITTED" as const,
              relationship: existingRelationship,
              fence: existingFence,
            });
            return;
          }
          conflict(existingFence !== null
            ? "COMMAND_FENCE_CONFLICT"
            : "IDENTITY_ALREADY_BOUND");
          return;
        }
        const relationshipAdd = relationshipStore.add(relationship);
        const fenceAdd = fenceStore.add(fence);
        relationshipAdd.onerror = (event) => {
          event.preventDefault();
          if (result !== null) {
            transaction.abort();
            return;
          }
          if (relationshipAdd.error?.name === "QuotaExceededError") {
            result = Object.freeze({
              status: "UNAVAILABLE" as const,
              reason: "STORAGE_QUOTA_EXCEEDED" as const,
              relationship: null,
              fence: null,
            });
          } else {
            conflict("IDENTITY_ALREADY_BOUND");
          }
          transaction.abort();
        };
        fenceAdd.onerror = (event) => {
          event.preventDefault();
          if (result !== null) {
            transaction.abort();
            return;
          }
          if (fenceAdd.error?.name === "QuotaExceededError") {
            result = Object.freeze({
              status: "UNAVAILABLE" as const,
              reason: "STORAGE_QUOTA_EXCEEDED" as const,
              relationship: null,
              fence: null,
            });
          } else {
            conflict("COMMAND_FENCE_CONFLICT");
          }
          transaction.abort();
        };
        commitPrepared = true;
      };
      const existingRelationshipRequest = relationshipStore
        .index("identityKey")
        .get(relationship.identityKey);
      existingRelationshipRequest.onsuccess = () => {
        existingRelationship = existingRelationshipRequest.result ?? null;
        decide();
      };
      existingRelationshipRequest.onerror = () => {
        conflict("IDENTITY_ALREADY_BOUND");
        transaction.abort();
      };
      const existingFenceRequest = fenceStore.get(fence.commandReferenceId);
      existingFenceRequest.onsuccess = () => {
        existingFence = existingFenceRequest.result ?? null;
        decide();
      };
      existingFenceRequest.onerror = () => {
        conflict("COMMAND_FENCE_CONFLICT");
        transaction.abort();
      };
    } catch {
      database.close();
      resolve(commitUnavailable("FAILED"));
      return;
    }
    transaction.onabort = () => {
      database.close();
      resolve(
        result?.status === "CONFLICT" || result?.status === "UNAVAILABLE"
          ? result
          : Object.freeze({
              status: "UNAVAILABLE" as const,
              reason: "TRANSACTION_ABORTED" as const,
              relationship: null,
              fence: null,
            }),
      );
    };
    transaction.onerror = () => undefined;
    transaction.oncomplete = () => {
      database.close();
      if (commitPrepared) {
        resolve(Object.freeze({
          status: "COMMITTED" as const,
          relationship,
          fence,
        }));
        return;
      }
      resolve(result ?? commitUnavailable("FAILED"));
    };
  });
}

export async function inspectXinmaiLifeCompanionCanonicalStoreCounts():
  Promise<Readonly<{
    status: "READY" | "UNAVAILABLE";
    relationships: number;
    fences: number;
  }>> {
  const opened = await openDatabase();
  if (opened.status !== "OPEN") {
    return Object.freeze({ status: "UNAVAILABLE", relationships: 0, fences: 0 });
  }
  const database = opened.database;
  return new Promise((resolve) => {
    let relationships = 0;
    let fences = 0;
    let transaction: IDBTransaction;
    try {
      transaction = database.transaction(
        [XINMAI_LIFE_COMPANION_RELATIONSHIP_STORE, XINMAI_LIFE_COMPANION_COMMAND_FENCE_STORE],
        "readonly",
      );
      const relationshipCount = transaction
        .objectStore(XINMAI_LIFE_COMPANION_RELATIONSHIP_STORE).count();
      relationshipCount.onsuccess = () => {
        relationships = relationshipCount.result;
      };
      const fenceCount = transaction
        .objectStore(XINMAI_LIFE_COMPANION_COMMAND_FENCE_STORE).count();
      fenceCount.onsuccess = () => {
        fences = fenceCount.result;
      };
    } catch {
      database.close();
      resolve(Object.freeze({ status: "UNAVAILABLE", relationships: 0, fences: 0 }));
      return;
    }
    transaction.onabort = () => {
      database.close();
      resolve(Object.freeze({ status: "UNAVAILABLE", relationships: 0, fences: 0 }));
    };
    transaction.onerror = () => undefined;
    transaction.oncomplete = () => {
      database.close();
      resolve(Object.freeze({ status: "READY", relationships, fences }));
    };
  });
}
