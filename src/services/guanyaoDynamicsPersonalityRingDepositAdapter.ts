import {
  createPersonalityRingLiteEntryFromCrystal,
  readPersonalityRingLite,
  savePersonalityRingLiteEntry,
  type PersonalityRingLiteEntry,
  type PersonalityRingLiteState,
} from "./personalityRingLiteService";
import type { DynamicsCurrentCrystalEndState } from "./guanyaoDynamicsCrystalRuntimeAdapter";

export type DynamicsPersonalityRingDepositAdapterInput = Readonly<{
  currentCrystalEndState: DynamicsCurrentCrystalEndState;
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
    (entry) => entry.createdAt === input.currentCrystalEndState.createdAt,
  );
  if (duplicate) {
    return {
      status: "DUPLICATE",
      state: currentState,
      entry: duplicate,
    };
  }

  const entry = createPersonalityRingLiteEntryFromCrystal(input.currentCrystalEndState);
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
    (candidate) => candidate.createdAt === entry.createdAt,
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
