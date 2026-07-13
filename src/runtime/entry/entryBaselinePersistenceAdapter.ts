export const LEGACY_ENTRY_BASELINE_STORAGE_KEY = "rue_baseline";

function canUseStorage(): boolean {
  try {
    return typeof window !== "undefined" && Boolean(window.localStorage);
  } catch {
    return false;
  }
}

export function readPersistedEntryBaseline(): unknown | null {
  if (!canUseStorage()) return null;

  try {
    const raw = window.localStorage.getItem(LEGACY_ENTRY_BASELINE_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as unknown) : null;
  } catch {
    return null;
  }
}
