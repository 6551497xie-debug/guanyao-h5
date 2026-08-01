import type {
  CrystalEligibility,
  CrystalFormationReceipt,
} from "./xinmaiCrystalEligibility";
import type { LivedResponseFact } from "./xinmaiLivedResponse";
import type { RealityEncounterIdentityReferences } from "./xinmaiRealityEncounterIntent";

export type XinmaiCrystalFormationProductionTrigger =
  | "POST_FACT_COMMIT"
  | "RECOVERY_RETRY";

export type XinmaiCrystalFormationProductionInput = Readonly<{
  trigger: XinmaiCrystalFormationProductionTrigger;
  fact: LivedResponseFact;
  eligibility: CrystalEligibility;
  identityReferences: RealityEncounterIdentityReferences;
}>;

export type XinmaiCrystalFormationProductionOutcome =
  | Readonly<{
      status: "FORMED" | "ALREADY_FORMED";
      receipt: CrystalFormationReceipt;
      reason: null;
      successAuthority: "IDB_TRANSACTION_COMPLETE";
      bodyImprintAuthority: "SAFE_WITHHELD_UNTIL_CANONICAL_CUTOVER";
    }>
  | Readonly<{
      status: "SAFE_WITHHELD";
      receipt: null;
      reason:
        | "RECOVERY_UNAVAILABLE"
        | "RECOVERY_CORRUPTED"
        | "FACT_NOT_CURRENT"
        | "ELIGIBILITY_MISSING"
        | "ELIGIBILITY_NOT_CURRENT"
        | "PROVENANCE_MISMATCH"
        | "FORMATION_AUTHORITY_UNAVAILABLE"
        | "PRODUCTION_FORMATION_PAUSED"
        | "LEGACY_MULTIPLE_FORMATION_RECEIPTS";
      successAuthority: null;
      bodyImprintAuthority: "SAFE_WITHHELD_UNTIL_CANONICAL_CUTOVER";
    }>;
