import type { ChoiceActionIntention } from "./xinmaiChoiceActionIntention";
import type { CrystalEligibility, CrystalFormationReceipt } from "./xinmaiCrystalEligibility";
import type { LivedResponseFact } from "./xinmaiLivedResponse";
import type {
  XinmaiChoiceExplicitDepartureReceipt,
  XinmaiChoiceExplicitReturnReceipt,
} from "./xinmaiChoiceReturningProvenance";

export const XINMAI_LIVED_GROWTH_RECOVERY_V1_SCHEMA_VERSION =
  "XINMAI_LIVED_GROWTH_RECOVERY_V1" as const;
export const XINMAI_LIVED_GROWTH_RECOVERY_SCHEMA_VERSION =
  "XINMAI_LIVED_GROWTH_RECOVERY_V2" as const;

type XinmaiLivedGrowthEnvelopeBase = Readonly<{
  source: "xinmai_lived_growth_recovery_adapter";
  revision: number;
  updatedAt: string;
  choiceActionIntentions: readonly ChoiceActionIntention[];
  livedResponseFacts: readonly LivedResponseFact[];
  crystalEligibilities: readonly CrystalEligibility[];
  formationReceipts: readonly CrystalFormationReceipt[];
  noBackfill: true;
}>;

export type XinmaiLivedGrowthEnvelopeV1 =
  XinmaiLivedGrowthEnvelopeBase &
  Readonly<{
    schemaVersion:
      typeof XINMAI_LIVED_GROWTH_RECOVERY_V1_SCHEMA_VERSION;
  }>;

export type XinmaiLivedGrowthEnvelope =
  XinmaiLivedGrowthEnvelopeBase &
  Readonly<{
    schemaVersion: typeof XINMAI_LIVED_GROWTH_RECOVERY_SCHEMA_VERSION;
    choiceExplicitDepartureReceipts:
      readonly XinmaiChoiceExplicitDepartureReceipt[];
    choiceExplicitReturnReceipts:
      readonly XinmaiChoiceExplicitReturnReceipt[];
  }>;
