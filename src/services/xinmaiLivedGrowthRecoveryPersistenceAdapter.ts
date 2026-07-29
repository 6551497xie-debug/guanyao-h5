import {
  XINMAI_LIVED_GROWTH_RECOVERY_SCHEMA_VERSION,
  type XinmaiLivedGrowthEnvelope,
} from "../types/xinmaiLivedGrowthRecovery";

export const XINMAI_LIVED_GROWTH_RECOVERY_STORAGE_KEY =
  "xinmai:lived-growth-authority:v1";

export type XinmaiLivedGrowthRecoveryReadResult =
  | Readonly<{
      status: "FOUND";
      envelope: XinmaiLivedGrowthEnvelope;
      raw: string;
    }>
  | Readonly<{
      status: "NOT_FOUND" | "UNAVAILABLE" | "CORRUPTED";
      envelope: null;
      raw: string | null;
    }>;

const canUseStorage = (): boolean => {
  try {
    return typeof window !== "undefined" && Boolean(window.localStorage);
  } catch {
    return false;
  }
};

export const createEmptyXinmaiLivedGrowthEnvelope =
  (): XinmaiLivedGrowthEnvelope =>
    Object.freeze({
      schemaVersion: XINMAI_LIVED_GROWTH_RECOVERY_SCHEMA_VERSION,
      source: "xinmai_lived_growth_recovery_adapter" as const,
      revision: 0,
      updatedAt: new Date(0).toISOString(),
      choiceActionIntentions: Object.freeze([]),
      livedResponseFacts: Object.freeze([]),
      crystalEligibilities: Object.freeze([]),
      formationReceipts: Object.freeze([]),
      noBackfill: true as const,
    });

export const isXinmaiLivedGrowthEnvelope = (
  value: unknown,
): value is XinmaiLivedGrowthEnvelope => {
  if (value === null || typeof value !== "object") return false;
  const candidate = value as Partial<XinmaiLivedGrowthEnvelope>;
  return (
    candidate.schemaVersion === XINMAI_LIVED_GROWTH_RECOVERY_SCHEMA_VERSION &&
    candidate.source === "xinmai_lived_growth_recovery_adapter" &&
    candidate.noBackfill === true &&
    Number.isInteger(candidate.revision) &&
    (candidate.revision ?? -1) >= 0 &&
    typeof candidate.updatedAt === "string" &&
    Number.isFinite(Date.parse(candidate.updatedAt)) &&
    Array.isArray(candidate.choiceActionIntentions) &&
    Array.isArray(candidate.livedResponseFacts) &&
    Array.isArray(candidate.crystalEligibilities) &&
    Array.isArray(candidate.formationReceipts)
  );
};

export function readXinmaiLivedGrowthRecoveryCandidate():
  XinmaiLivedGrowthRecoveryReadResult {
  if (!canUseStorage()) {
    return Object.freeze({
      status: "UNAVAILABLE" as const,
      envelope: null,
      raw: null,
    });
  }
  try {
    const raw = window.localStorage.getItem(
      XINMAI_LIVED_GROWTH_RECOVERY_STORAGE_KEY,
    );
    if (raw === null) {
      return Object.freeze({
        status: "NOT_FOUND" as const,
        envelope: null,
        raw: null,
      });
    }
    const parsed = JSON.parse(raw) as unknown;
    return isXinmaiLivedGrowthEnvelope(parsed)
      ? Object.freeze({ status: "FOUND" as const, envelope: parsed, raw })
      : Object.freeze({
          status: "CORRUPTED" as const,
          envelope: null,
          raw,
        });
  } catch {
    return Object.freeze({
      status: "CORRUPTED" as const,
      envelope: null,
      raw: null,
    });
  }
}

export const isXinmaiLivedGrowthLegacyStorageEvent = (
  event: StorageEvent,
): boolean => {
  try {
    return (
      typeof window !== "undefined" &&
      event.storageArea === window.localStorage &&
      event.key === XINMAI_LIVED_GROWTH_RECOVERY_STORAGE_KEY
    );
  } catch {
    return false;
  }
};

export const XinmaiLivedGrowthRecoveryAdapter = Object.freeze({
  storageKey: XINMAI_LIVED_GROWTH_RECOVERY_STORAGE_KEY,
  read: readXinmaiLivedGrowthRecoveryCandidate,
  observesLegacyMutation: isXinmaiLivedGrowthLegacyStorageEvent,
  authority: "LEGACY_READ_ONLY_SOURCE" as const,
  noBackfill: true as const,
});
