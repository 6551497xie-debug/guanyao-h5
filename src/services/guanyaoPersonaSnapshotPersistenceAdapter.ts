export const GUANYAO_PERSONA_SNAPSHOT_STORAGE_KEY = "guanyao:personaOutputSnapshot";
export const GUANYAO_PERSONA_SNAPSHOT_SCHEMA_VERSION = "GUANYAO_PERSONA_SNAPSHOT_V2" as const;

export type VersionedPersonaOutputSnapshot<T extends object> = Omit<T, "schemaVersion"> & {
  schemaVersion: typeof GUANYAO_PERSONA_SNAPSHOT_SCHEMA_VERSION;
};

export function readPersistedPersonaOutputSnapshot(): unknown | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(GUANYAO_PERSONA_SNAPSHOT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writePersonaOutputSnapshot<T extends object>(
  snapshot: T,
): VersionedPersonaOutputSnapshot<T> {
  const versionedSnapshot = Object.freeze({
    ...snapshot,
    schemaVersion: GUANYAO_PERSONA_SNAPSHOT_SCHEMA_VERSION,
  }) as VersionedPersonaOutputSnapshot<T>;

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(
        GUANYAO_PERSONA_SNAPSHOT_STORAGE_KEY,
        JSON.stringify(versionedSnapshot),
      );
    } catch {
      // Persistence is optional; the formal persona snapshot remains available.
    }
  }

  return versionedSnapshot;
}
