import type { XinmaiLivedGrowthEnvelope } from "./xinmaiLivedGrowthRecovery";
import type { CrystalFormationReceipt } from "./xinmaiCrystalEligibility";

export const XINMAI_LIVED_GROWTH_DATABASE_NAME =
  "xinmai-lived-growth-canonical" as const;
export const XINMAI_LIVED_GROWTH_DATABASE_VERSION = 1 as const;

export const XINMAI_LIVED_GROWTH_CANONICAL_STORE =
  "canonical-growth-envelope" as const;
export const XINMAI_LIVED_GROWTH_MIGRATION_META_STORE =
  "growth-migration-meta" as const;
export const XINMAI_LIVED_GROWTH_ELIGIBILITY_INDEX_STORE =
  "growth-eligibility-index" as const;
export const XINMAI_LIVED_GROWTH_FORMATION_INDEX_STORE =
  "growth-formation-index" as const;
export const XINMAI_LIVED_GROWTH_CRYSTAL_PROJECTION_STORE =
  "growth-crystal-projection" as const;

export const XINMAI_LIVED_GROWTH_CANONICAL_RECORD_ID =
  "CURRENT" as const;
export const XINMAI_LIVED_GROWTH_V1_MIGRATION_META_ID =
  "LOCAL_STORAGE_V1" as const;

export type XinmaiLivedGrowthCanonicalRecord = Readonly<{
  id: typeof XINMAI_LIVED_GROWTH_CANONICAL_RECORD_ID;
  envelope: XinmaiLivedGrowthEnvelope;
}>;

export type XinmaiLivedGrowthLegacyMigrationStatus =
  | "IMPORTED"
  | "NO_LEGACY_SOURCE"
  | "LEGACY_SOURCE_CORRUPTED"
  | "LEGACY_IMPORT_CONFLICT"
  | "LEGACY_WRITER_DETECTED";

export type XinmaiLivedGrowthMigrationMetaRecord = Readonly<{
  id: typeof XINMAI_LIVED_GROWTH_V1_MIGRATION_META_ID;
  sourceSchema: "XINMAI_LIVED_GROWTH_RECOVERY_V1";
  sourceStorageKey: "xinmai:lived-growth-authority:v1";
  sourceDigest: string;
  sourceRawLength: number;
  importedCanonicalRevision: number | null;
  status: XinmaiLivedGrowthLegacyMigrationStatus;
  noBackfill: true;
  importedAt: string;
  lastCheckedAt: string;
}>;

export type XinmaiLivedGrowthEligibilityIndexRecord = Readonly<{
  crystalEligibilityReferenceId: string;
  eligibilityKey: string;
  livedResponseReferenceId: string;
  livedResponseRevision: number;
  choiceActionIntentionReferenceId: string;
}>;

export type XinmaiLivedGrowthFormationIndexRecord = Readonly<{
  choiceActionIntentionReferenceId: string;
  formationReferenceId: string;
  crystalReferenceId: string;
  eligibilityKey: string;
}>;

export type XinmaiLivedGrowthCanonicalProjectionRecord = Readonly<{
  crystalReferenceId: string;
  formationReferenceId: string;
  choiceActionIntentionReferenceId: string;
  formedAt: string;
  formedCrystal: CrystalFormationReceipt["formedCrystal"];
}>;

export type XinmaiLivedGrowthCanonicalReadResult =
  | Readonly<{
      status: "FOUND";
      envelope: XinmaiLivedGrowthEnvelope;
      migration: XinmaiLivedGrowthMigrationMetaRecord;
    }>
  | Readonly<{
      status:
        | "NOT_FOUND"
        | "UNAVAILABLE"
        | "CORRUPTED"
        | "SAFE_WITHHELD";
      envelope: null;
      migration: XinmaiLivedGrowthMigrationMetaRecord | null;
      reason:
        | "TRANSACTION_STORAGE_UNAVAILABLE"
        | "TRANSACTION_OPEN_BLOCKED"
        | "TRANSACTION_ABORTED"
        | "TRANSACTION_CONNECTION_CLOSED"
        | "RECOVERY_UNAVAILABLE"
        | "RECOVERY_CORRUPTED"
        | "LEGACY_IMPORT_CONFLICT"
        | "LEGACY_WRITER_DETECTED"
        | "CANONICAL_UNIQUENESS_VIOLATION"
        | "WRITE_UNCONFIRMED";
    }>;
