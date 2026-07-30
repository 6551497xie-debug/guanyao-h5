export const XINMAI_REALITY_INTENT_LEGACY_STORAGE_KEY =
  "xinmaiRealityEncounterIntentRecovery" as const;
export const XINMAI_GRAVITY_ENTRY_LEGACY_STORAGE_KEY =
  "xinmaiRealityToGravityCutoverRecovery" as const;

export type RealityAdventureLegacyDigestSnapshot = Readonly<{
  status: "AVAILABLE" | "UNAVAILABLE";
  realityLegacyDigest: string;
  gravityLegacyDigest: string;
  realityLegacyRawLength: number;
  gravityLegacyRawLength: number;
}>;

const digestText = (value: string | null): string => {
  const text = value ?? "XINMAI_LEGACY_ABSENT";
  let hash = 0x811c9dc5;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return `fnv1a32:${(hash >>> 0).toString(16).padStart(8, "0")}`;
};

export function captureRealityAdventureLegacyDigestSnapshot():
  RealityAdventureLegacyDigestSnapshot {
  if (typeof window === "undefined") {
    return Object.freeze({
      status: "AVAILABLE" as const,
      realityLegacyDigest: digestText(null),
      gravityLegacyDigest: digestText(null),
      realityLegacyRawLength: 0,
      gravityLegacyRawLength: 0,
    });
  }
  try {
    const storage = window.sessionStorage;
    const reality = storage.getItem(
      XINMAI_REALITY_INTENT_LEGACY_STORAGE_KEY,
    );
    const gravity = storage.getItem(
      XINMAI_GRAVITY_ENTRY_LEGACY_STORAGE_KEY,
    );
    return Object.freeze({
      status: "AVAILABLE" as const,
      realityLegacyDigest: digestText(reality),
      gravityLegacyDigest: digestText(gravity),
      realityLegacyRawLength: reality?.length ?? 0,
      gravityLegacyRawLength: gravity?.length ?? 0,
    });
  } catch {
    return Object.freeze({
      status: "UNAVAILABLE" as const,
      realityLegacyDigest: "UNAVAILABLE",
      gravityLegacyDigest: "UNAVAILABLE",
      realityLegacyRawLength: 0,
      gravityLegacyRawLength: 0,
    });
  }
}

const legacyDigestAtAdapterInitialization =
  captureRealityAdventureLegacyDigestSnapshot();

export function hasRealityAdventureLegacyWriterChanged(): boolean {
  const current = captureRealityAdventureLegacyDigestSnapshot();
  if (
    current.status !== "AVAILABLE" ||
    legacyDigestAtAdapterInitialization.status !== "AVAILABLE"
  ) {
    return true;
  }
  return (
    current.realityLegacyDigest !==
      legacyDigestAtAdapterInitialization.realityLegacyDigest ||
    current.realityLegacyRawLength !==
      legacyDigestAtAdapterInitialization.realityLegacyRawLength ||
    current.gravityLegacyDigest !==
      legacyDigestAtAdapterInitialization.gravityLegacyDigest ||
    current.gravityLegacyRawLength !==
      legacyDigestAtAdapterInitialization.gravityLegacyRawLength
  );
}

export const XinmaiRealityAdventureContinuityLegacyAdapter =
  Object.freeze({
    realityStorageKey:
      XINMAI_REALITY_INTENT_LEGACY_STORAGE_KEY,
    gravityStorageKey:
      XINMAI_GRAVITY_ENTRY_LEGACY_STORAGE_KEY,
    captureDigest:
      captureRealityAdventureLegacyDigestSnapshot,
    hasChangedSinceInitialization:
      hasRealityAdventureLegacyWriterChanged,
    boundary: Object.freeze({
      readOnlyLegacy: true as const,
      noStorageWrite: true as const,
      noBackfill: true as const,
      noAuthority: true as const,
    }),
  });
