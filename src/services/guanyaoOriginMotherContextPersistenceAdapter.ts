export const GUANYAO_ORIGIN_MOTHER_CONTEXT_STORAGE_KEY = "guanyao:originMotherContext";
export const GUANYAO_ORIGIN_MOTHER_CONTEXT_SCHEMA_VERSION =
  "GUANYAO_ORIGIN_MOTHER_CONTEXT_V2" as const;

export type VersionedOriginMotherContext<T extends object> = Omit<T, "schemaVersion"> & {
  schemaVersion: typeof GUANYAO_ORIGIN_MOTHER_CONTEXT_SCHEMA_VERSION;
};

export function readPersistedOriginMotherContext(): unknown | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(GUANYAO_ORIGIN_MOTHER_CONTEXT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeOriginMotherContext<T extends object>(
  context: T,
): VersionedOriginMotherContext<T> {
  const versionedContext = Object.freeze({
    ...context,
    schemaVersion: GUANYAO_ORIGIN_MOTHER_CONTEXT_SCHEMA_VERSION,
  }) as VersionedOriginMotherContext<T>;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(
      GUANYAO_ORIGIN_MOTHER_CONTEXT_STORAGE_KEY,
      JSON.stringify(versionedContext),
    );
  }

  return versionedContext;
}
