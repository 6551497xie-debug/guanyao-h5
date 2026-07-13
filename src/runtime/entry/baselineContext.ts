import { readPersistedEntryBaseline } from "./entryBaselinePersistenceAdapter";

export type EntryBaselineContext = {
  exists: boolean;
  source?: "localStorage" | "session" | "server";
  createdAt?: number;
};

export function getBaselineContext(): EntryBaselineContext {
  try {
    const baseline = readPersistedEntryBaseline();
    if (baseline === null) return { exists: false };

    const createdAtValue = (baseline as { createdAt?: unknown }).createdAt;
    const createdAt = typeof createdAtValue === "number" ? createdAtValue : undefined;

    return {
      exists: true,
      source: "localStorage",
      ...(createdAt !== undefined ? { createdAt } : {}),
    };
  } catch {
    return { exists: false };
  }
}
