export const GUANYAO_TIME_SANDGLASS_STORAGE_KEY = "guanyao_h5_time_sandglass";
export const GUANYAO_TIME_SANDGLASS_SCHEMA_VERSION =
  "GUANYAO_TIME_SANDGLASS_V2" as const;

export type TimeSandglassPersistenceWriteStatus =
  | "STORED"
  | "UNAVAILABLE"
  | "FAILED";

function canUseStorage(): boolean {
  try {
    return typeof window !== "undefined" && Boolean(window.localStorage);
  } catch {
    return false;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function readPersistedTimeSandglassState<T extends object>(): T | null {
  if (!canUseStorage()) return null;

  try {
    const raw = window.localStorage.getItem(GUANYAO_TIME_SANDGLASS_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as unknown;
    if (!isRecord(parsed)) return null;

    if (parsed.schemaVersion === GUANYAO_TIME_SANDGLASS_SCHEMA_VERSION) {
      return isRecord(parsed.state) ? (parsed.state as T) : null;
    }

    if ("schemaVersion" in parsed) return null;
    return parsed as T;
  } catch {
    return null;
  }
}

export function writePersistedTimeSandglassState(
  state: object,
): TimeSandglassPersistenceWriteStatus {
  if (!canUseStorage()) return "UNAVAILABLE";

  const versionedState = {
    schemaVersion: GUANYAO_TIME_SANDGLASS_SCHEMA_VERSION,
    state,
  };

  try {
    window.localStorage.setItem(
      GUANYAO_TIME_SANDGLASS_STORAGE_KEY,
      JSON.stringify(versionedState),
    );
    return "STORED";
  } catch {
    return "FAILED";
  }
}
