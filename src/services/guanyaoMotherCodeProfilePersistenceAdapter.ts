export const GUANYAO_MOTHER_CODE_PROFILE_STORAGE_KEY = "guanyao:motherCodeProfile";
export const GUANYAO_MOTHER_CODE_PROFILE_SCHEMA_VERSION =
  "GUANYAO_MOTHER_CODE_PROFILE_V2" as const;

export type VersionedMotherCodeProfile<T extends object> = Omit<T, "schemaVersion"> & {
  schemaVersion: typeof GUANYAO_MOTHER_CODE_PROFILE_SCHEMA_VERSION;
};

export function readPersistedMotherCodeProfile(): unknown | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(GUANYAO_MOTHER_CODE_PROFILE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeMotherCodeProfile<T extends object>(
  profile: T,
): VersionedMotherCodeProfile<T> {
  const versionedProfile = Object.freeze({
    ...profile,
    schemaVersion: GUANYAO_MOTHER_CODE_PROFILE_SCHEMA_VERSION,
  }) as VersionedMotherCodeProfile<T>;

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(
        GUANYAO_MOTHER_CODE_PROFILE_STORAGE_KEY,
        JSON.stringify(versionedProfile),
      );
    } catch {
      // Persistence is optional; the generated mother profile remains available.
    }
  }

  return versionedProfile;
}
