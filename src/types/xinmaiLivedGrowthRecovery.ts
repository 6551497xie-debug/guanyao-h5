import type { ChoiceActionIntention } from "./xinmaiChoiceActionIntention";
import type { CrystalEligibility, CrystalFormationReceipt } from "./xinmaiCrystalEligibility";
import type { LivedResponseFact } from "./xinmaiLivedResponse";

export const XINMAI_LIVED_GROWTH_RECOVERY_SCHEMA_VERSION =
  "XINMAI_LIVED_GROWTH_RECOVERY_V1" as const;

export type XinmaiLivedGrowthEnvelope = Readonly<{
  schemaVersion: typeof XINMAI_LIVED_GROWTH_RECOVERY_SCHEMA_VERSION;
  source: "xinmai_lived_growth_recovery_adapter";
  revision: number;
  updatedAt: string;
  choiceActionIntentions: readonly ChoiceActionIntention[];
  livedResponseFacts: readonly LivedResponseFact[];
  crystalEligibilities: readonly CrystalEligibility[];
  formationReceipts: readonly CrystalFormationReceipt[];
  noBackfill: true;
}>;
