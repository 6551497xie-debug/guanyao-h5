export const GUANYAO_SESSION_STORAGE_KEY = "guanyao_h5_session";
export const GUANYAO_SESSION_SCHEMA_VERSION = "GUANYAO_SESSION_V2" as const;

export type VersionedSessionState<T extends object> = {
  schemaVersion: typeof GUANYAO_SESSION_SCHEMA_VERSION;
  session: T;
};

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

export function readPersistedSessionState<T extends object>(): T | null {
  if (!canUseStorage()) return null;

  try {
    const raw = window.localStorage.getItem(GUANYAO_SESSION_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as unknown;
    if (!isRecord(parsed)) return null;

    if (parsed.schemaVersion === GUANYAO_SESSION_SCHEMA_VERSION) {
      return isRecord(parsed.session) ? (parsed.session as T) : null;
    }

    if ("schemaVersion" in parsed) return null;
    return parsed as T;
  } catch {
    return null;
  }
}

export function writePersistedSessionState<T extends object>(
  session: T,
): VersionedSessionState<T> {
  const versionedState = Object.freeze({
    schemaVersion: GUANYAO_SESSION_SCHEMA_VERSION,
    session,
  });

  if (canUseStorage()) {
    try {
      window.localStorage.setItem(
        GUANYAO_SESSION_STORAGE_KEY,
        JSON.stringify(versionedState),
      );
    } catch {
      // 保持既有行为：写入失败不改变 sessionService 返回的内存状态。
    }
  }

  return versionedState;
}

export function clearPersistedSessionState(): void {
  if (!canUseStorage()) return;

  try {
    window.localStorage.removeItem(GUANYAO_SESSION_STORAGE_KEY);
  } catch {
    // 保持既有行为：清除失败仍由 sessionService 返回默认状态。
  }
}
