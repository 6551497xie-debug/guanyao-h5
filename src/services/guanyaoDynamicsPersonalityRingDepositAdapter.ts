import {
  createPersonalityRingLiteEntryFromCrystal,
  readPersonalityRingLite,
  savePersonalityRingLiteEntry,
  type PersonalityRingLiteEntry,
  type PersonalityRingLiteState,
} from "./personalityRingLiteService";
import type { CrystalFormationReceipt } from "../types/xinmaiCrystalEligibility";
import { writePersistedPersonalityRingLiteState } from "./guanyaoPersonalityRingLitePersistenceAdapter";

export type DynamicsPersonalityRingDepositAdapterInput = Readonly<{
  formationReceipt: CrystalFormationReceipt;
}>;

export type DynamicsPersonalityRingDepositResult =
  | Readonly<{
      status: "DEPOSITED";
      state: PersonalityRingLiteState;
      entry: PersonalityRingLiteEntry;
    }>
  | Readonly<{
      status: "DUPLICATE";
      state: PersonalityRingLiteState;
      entry: PersonalityRingLiteEntry;
    }>
  | Readonly<{
      status: "REJECTED";
      state: PersonalityRingLiteState;
      entry: null;
      reason: "CRYSTAL_NOT_ELIGIBLE" | "PERSISTENCE_REJECTED";
    }>;

export function depositDynamicsCurrentCrystalToPersonalityRing(
  input: DynamicsPersonalityRingDepositAdapterInput,
): DynamicsPersonalityRingDepositResult {
  const currentState = readPersonalityRingLite();
  const duplicate = currentState.entries.find(
    (entry) =>
      entry.crystalReferenceId === input.formationReceipt.crystalReferenceId,
  );
  if (duplicate) {
    return {
      status: "DUPLICATE",
      state: currentState,
      entry: duplicate,
    };
  }

  const entry = createPersonalityRingLiteEntryFromCrystal(
    input.formationReceipt.formedCrystal,
  );
  if (!entry) {
    return {
      status: "REJECTED",
      state: currentState,
      entry: null,
      reason: "CRYSTAL_NOT_ELIGIBLE",
    };
  }

  savePersonalityRingLiteEntry(entry);
  const persistedState = readPersonalityRingLite();
  const depositedEntry = persistedState.entries.find(
    (candidate) =>
      candidate.crystalReferenceId === input.formationReceipt.crystalReferenceId,
  );
  if (!depositedEntry) {
    return {
      status: "REJECTED",
      state: persistedState,
      entry: null,
      reason: "PERSISTENCE_REJECTED",
    };
  }

  return {
    status: "DEPOSITED",
    state: persistedState,
    entry: depositedEntry,
  };
}

export type DynamicsPersonalityRingReconciliationResult =
  | Readonly<{
      status: "RECONCILED";
      state: PersonalityRingLiteState;
    }>
  | Readonly<{
      status: "RETRYABLE";
      state: PersonalityRingLiteState;
      reason: "INVALID_CANONICAL_CRYSTAL" | "PERSISTENCE_REJECTED";
    }>;

export function reconcileCanonicalFormationReceiptsToPersonalityRing(
  formationReceipts: readonly CrystalFormationReceipt[],
): DynamicsPersonalityRingReconciliationResult {
  const current = readPersonalityRingLite();
  const canonicalEntries: PersonalityRingLiteEntry[] = [];
  for (const receipt of formationReceipts) {
    const entry = createPersonalityRingLiteEntryFromCrystal(
      receipt.formedCrystal,
    );
    if (!entry) {
      return Object.freeze({
        status: "RETRYABLE" as const,
        state: current,
        reason: "INVALID_CANONICAL_CRYSTAL" as const,
      });
    }
    canonicalEntries.push(entry);
  }
  const canonicalCrystalReferences = new Set(
    canonicalEntries
      .map((entry) => entry.crystalReferenceId)
      .filter((reference): reference is string => Boolean(reference)),
  );
  const next: PersonalityRingLiteState = {
    version: "1.0",
    updatedAt: new Date().toISOString(),
    entries: [
      ...canonicalEntries,
      ...current.entries.filter(
        (entry) =>
          !entry.crystalReferenceId ||
          !canonicalCrystalReferences.has(entry.crystalReferenceId),
      ),
    ],
  };
  if (writePersistedPersonalityRingLiteState(next) !== "STORED") {
    return Object.freeze({
      status: "RETRYABLE" as const,
      state: current,
      reason: "PERSISTENCE_REJECTED" as const,
    });
  }
  const confirmed = readPersonalityRingLite();
  const confirmedReferences = new Set(
    confirmed.entries
      .map((entry) => entry.crystalReferenceId)
      .filter((reference): reference is string => Boolean(reference)),
  );
  if (
    canonicalEntries.some(
      (entry) =>
        !entry.crystalReferenceId ||
        !confirmedReferences.has(entry.crystalReferenceId),
    )
  ) {
    return Object.freeze({
      status: "RETRYABLE" as const,
      state: confirmed,
      reason: "PERSISTENCE_REJECTED" as const,
    });
  }
  return Object.freeze({
    status: "RECONCILED" as const,
    state: confirmed,
  });
}
