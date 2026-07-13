export const GUANYAO_SELECTED_PRESSURE_SEED_CONTEXT_STORAGE_KEY =
  "guanyao:selectedPressureSeedContext";
export const GUANYAO_SELECTED_PRESSURE_SEED_CONTEXT_SCHEMA_VERSION =
  "GUANYAO_SELECTED_PRESSURE_SEED_CONTEXT_V2" as const;

export type VersionedSelectedPressureSeedContext<T extends object> = Omit<T, "schemaVersion"> & {
  schemaVersion: typeof GUANYAO_SELECTED_PRESSURE_SEED_CONTEXT_SCHEMA_VERSION;
};

export function readPersistedSelectedPressureSeedContext(): unknown | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(GUANYAO_SELECTED_PRESSURE_SEED_CONTEXT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeSelectedPressureSeedContext<T extends object>(
  context: T,
): VersionedSelectedPressureSeedContext<T> {
  const versionedContext = Object.freeze({
    ...context,
    schemaVersion: GUANYAO_SELECTED_PRESSURE_SEED_CONTEXT_SCHEMA_VERSION,
  }) as VersionedSelectedPressureSeedContext<T>;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(
      GUANYAO_SELECTED_PRESSURE_SEED_CONTEXT_STORAGE_KEY,
      JSON.stringify(versionedContext),
    );
  }

  return versionedContext;
}
