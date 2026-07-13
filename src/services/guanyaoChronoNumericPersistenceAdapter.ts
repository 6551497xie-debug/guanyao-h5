export const GUANYAO_CHRONO_NUMERIC_STORAGE_KEY = "guanyao:chronoNumeric";
export const GUANYAO_CHRONO_NUMERIC_SCHEMA_VERSION = "GUANYAO_CHRONO_NUMERIC_V2" as const;

export type ChronoNumericCoordinates = {
  year: number;
  month: number;
  day: number;
  periodIndex: number;
};

export type StoredChronoNumericCoordinates = ChronoNumericCoordinates & {
  schemaVersion?: typeof GUANYAO_CHRONO_NUMERIC_SCHEMA_VERSION;
};

export type VersionedChronoNumericCoordinates = ChronoNumericCoordinates & {
  schemaVersion: typeof GUANYAO_CHRONO_NUMERIC_SCHEMA_VERSION;
};

function isStoredChronoNumericCoordinates(value: unknown): value is StoredChronoNumericCoordinates {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<StoredChronoNumericCoordinates>;
  return (
    (candidate.schemaVersion === undefined ||
      candidate.schemaVersion === GUANYAO_CHRONO_NUMERIC_SCHEMA_VERSION) &&
    typeof candidate.year === "number" &&
    typeof candidate.month === "number" &&
    typeof candidate.day === "number" &&
    typeof candidate.periodIndex === "number"
  );
}

export function readPersistedChronoNumericCoordinates(): StoredChronoNumericCoordinates | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(GUANYAO_CHRONO_NUMERIC_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as unknown;
    return isStoredChronoNumericCoordinates(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function writeChronoNumericCoordinates(
  coordinates: ChronoNumericCoordinates,
): VersionedChronoNumericCoordinates {
  const versionedCoordinates = Object.freeze({
    ...coordinates,
    schemaVersion: GUANYAO_CHRONO_NUMERIC_SCHEMA_VERSION,
  });

  if (typeof window !== "undefined") {
    window.localStorage.setItem(
      GUANYAO_CHRONO_NUMERIC_STORAGE_KEY,
      JSON.stringify(versionedCoordinates),
    );
  }

  return versionedCoordinates;
}
