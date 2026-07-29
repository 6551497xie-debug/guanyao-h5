import {
  XINMAI_LIVED_GROWTH_RECOVERY_SCHEMA_VERSION,
  type XinmaiLivedGrowthEnvelope,
} from "../types/xinmaiLivedGrowthRecovery";

export const XINMAI_LIVED_GROWTH_RECOVERY_STORAGE_KEY =
  "xinmai:lived-growth-authority:v1";

export type XinmaiLivedGrowthRecoveryReadResult =
  | Readonly<{ status: "FOUND"; envelope: XinmaiLivedGrowthEnvelope }>
  | Readonly<{
      status: "NOT_FOUND" | "UNAVAILABLE" | "CORRUPTED";
      envelope: null;
    }>;

export type XinmaiLivedGrowthRecoveryWriteResult =
  | Readonly<{ status: "CONFIRMED"; envelope: XinmaiLivedGrowthEnvelope }>
  | Readonly<{
      status: "UNAVAILABLE" | "CONFLICT" | "UNCONFIRMED";
      envelope: null;
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

const isEnvelope = (value: unknown): value is XinmaiLivedGrowthEnvelope => {
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
    return Object.freeze({ status: "UNAVAILABLE" as const, envelope: null });
  }
  try {
    const raw = window.localStorage.getItem(
      XINMAI_LIVED_GROWTH_RECOVERY_STORAGE_KEY,
    );
    if (raw === null) {
      return Object.freeze({ status: "NOT_FOUND" as const, envelope: null });
    }
    const parsed = JSON.parse(raw) as unknown;
    return isEnvelope(parsed)
      ? Object.freeze({ status: "FOUND" as const, envelope: parsed })
      : Object.freeze({ status: "CORRUPTED" as const, envelope: null });
  } catch {
    return Object.freeze({ status: "CORRUPTED" as const, envelope: null });
  }
}

export function writeXinmaiLivedGrowthRecoveryCandidate(
  envelope: XinmaiLivedGrowthEnvelope,
  expectedPreviousRevision: number,
): XinmaiLivedGrowthRecoveryWriteResult {
  if (!canUseStorage()) {
    return Object.freeze({ status: "UNAVAILABLE" as const, envelope: null });
  }
  const current = readXinmaiLivedGrowthRecoveryCandidate();
  const currentRevision =
    current.status === "FOUND" ? current.envelope.revision : 0;
  if (
    (current.status !== "FOUND" && current.status !== "NOT_FOUND") ||
    currentRevision !== expectedPreviousRevision ||
    envelope.revision !== expectedPreviousRevision + 1 ||
    !isEnvelope(envelope)
  ) {
    return Object.freeze({ status: "CONFLICT" as const, envelope: null });
  }
  try {
    window.localStorage.setItem(
      XINMAI_LIVED_GROWTH_RECOVERY_STORAGE_KEY,
      JSON.stringify(envelope),
    );
    const confirmed = readXinmaiLivedGrowthRecoveryCandidate();
    if (
      confirmed.status !== "FOUND" ||
      confirmed.envelope.revision !== envelope.revision ||
      confirmed.envelope.updatedAt !== envelope.updatedAt
    ) {
      return Object.freeze({ status: "UNCONFIRMED" as const, envelope: null });
    }
    return Object.freeze({
      status: "CONFIRMED" as const,
      envelope: confirmed.envelope,
    });
  } catch {
    return Object.freeze({ status: "UNCONFIRMED" as const, envelope: null });
  }
}

export function transactXinmaiLivedGrowthRecovery(
  transform: (
    current: XinmaiLivedGrowthEnvelope,
  ) => Omit<XinmaiLivedGrowthEnvelope, "revision" | "updatedAt">,
): XinmaiLivedGrowthRecoveryWriteResult {
  const readResult = readXinmaiLivedGrowthRecoveryCandidate();
  if (readResult.status !== "FOUND" && readResult.status !== "NOT_FOUND") {
    return Object.freeze({ status: "UNAVAILABLE" as const, envelope: null });
  }
  const current =
    readResult.status === "FOUND"
      ? readResult.envelope
      : createEmptyXinmaiLivedGrowthEnvelope();
  const next = Object.freeze({
    ...transform(current),
    revision: current.revision + 1,
    updatedAt: new Date().toISOString(),
  }) as XinmaiLivedGrowthEnvelope;
  return writeXinmaiLivedGrowthRecoveryCandidate(next, current.revision);
}

export const XinmaiLivedGrowthRecoveryAdapter = Object.freeze({
  storageKey: XINMAI_LIVED_GROWTH_RECOVERY_STORAGE_KEY,
  read: readXinmaiLivedGrowthRecoveryCandidate,
  write: writeXinmaiLivedGrowthRecoveryCandidate,
  transact: transactXinmaiLivedGrowthRecovery,
  noBackfill: true as const,
});
