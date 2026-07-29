import {
  XINMAI_CRYSTAL_ELIGIBILITY_SCHEMA_VERSION,
  type CrystalEligibility,
} from "../types/xinmaiCrystalEligibility";
import type { LivedResponseFact } from "../types/xinmaiLivedResponse";
import {
  commitXinmaiLivedGrowthTransaction,
  preserveXinmaiLivedGrowthTransaction,
  rejectXinmaiLivedGrowthTransaction,
} from "../types/xinmaiLivedGrowthTransaction";
import { xinmaiGrowthIdentityMatches } from "./xinmaiLivedGrowthIdentity";
import { createStableXinmaiGrowthReference } from "./xinmaiLivedGrowthReference";
import { executeXinmaiLivedGrowthTransaction } from "./xinmaiLivedGrowthTransactionAuthority";

export type ResolveCrystalEligibilityResult =
  | Readonly<{
      status: "ELIGIBLE";
      eligibility: CrystalEligibility;
    }>
  | Readonly<{
      status: "WITHHELD";
      eligibility: CrystalEligibility;
    }>
  | Readonly<{
      status: "ALREADY_RESOLVED";
      eligibility: CrystalEligibility;
    }>
  | Readonly<{
      status: "REJECTED" | "SAFE_WITHHELD";
      eligibility: null;
      reason:
        | "FACT_NOT_CURRENT"
        | "IDENTITY_MISMATCH"
        | "STALE_FACT_REVISION"
        | "FORMATION_ALREADY_CONFIRMED"
        | "LEGACY_MULTIPLE_FORMATION_RECEIPTS"
        | "PERSISTENCE_UNAVAILABLE"
        | string;
    }>;

export async function resolveCrystalEligibilityForFact(
  fact: LivedResponseFact,
): Promise<ResolveCrystalEligibilityResult> {
  const eligibilityReferenceId = createStableXinmaiGrowthReference(
    "crystal-eligibility",
    fact.livedResponseReferenceId,
    String(fact.userConfirmationRevision),
  );
  const result = await executeXinmaiLivedGrowthTransaction(
    Object.freeze({
      commandReferenceId: createStableXinmaiGrowthReference(
        "growth-command:resolve-eligibility",
        eligibilityReferenceId,
      ),
      commandType: "RESOLVE_CRYSTAL_ELIGIBILITY" as const,
      identityReferences: fact.identityReferences,
      issuedAt: new Date().toISOString(),
    }),
    (current) => {
      const currentFact = current.livedResponseFacts.find(
        (candidate) =>
          candidate.livedResponseReferenceId ===
          fact.livedResponseReferenceId,
      );
      if (!currentFact || currentFact.state !== "CONFIRMED") {
        return rejectXinmaiLivedGrowthTransaction("FACT_NOT_CURRENT");
      }
      if (
        currentFact.userConfirmationRevision !==
        fact.userConfirmationRevision
      ) {
        return rejectXinmaiLivedGrowthTransaction("STALE_FACT_REVISION");
      }
      if (
        !xinmaiGrowthIdentityMatches(
          currentFact.identityReferences,
          fact.identityReferences,
        )
      ) {
        return rejectXinmaiLivedGrowthTransaction("IDENTITY_MISMATCH");
      }
      const lineageReceipts = current.formationReceipts.filter(
        (receipt) =>
          receipt.choiceActionIntentionReferenceId ===
          fact.choiceActionIntentionReferenceId,
      );
      if (lineageReceipts.length > 1) {
        return rejectXinmaiLivedGrowthTransaction(
          "LEGACY_MULTIPLE_FORMATION_RECEIPTS",
        );
      }
      if (lineageReceipts.length === 1) {
        return rejectXinmaiLivedGrowthTransaction(
          "FORMATION_ALREADY_CONFIRMED",
        );
      }
      const existing = current.crystalEligibilities.find(
        (candidate) =>
          candidate.crystalEligibilityReferenceId ===
          eligibilityReferenceId,
      );
      if (existing) {
        if (
          existing.livedResponseRevision !==
            currentFact.userConfirmationRevision ||
          !xinmaiGrowthIdentityMatches(
            existing.identityReferences,
            currentFact.identityReferences,
          )
        ) {
          return rejectXinmaiLivedGrowthTransaction(
            "STALE_FACT_REVISION",
          );
        }
        return preserveXinmaiLivedGrowthTransaction(existing);
      }
      const isEligible =
        currentFact.responseOutcome === "ATTEMPTED" ||
        currentFact.responseOutcome === "COMPLETED_AS_INTENDED" ||
        currentFact.responseOutcome === "CHANGED_RESPONSE";
      const now = new Date().toISOString();
      const eligibility: CrystalEligibility = Object.freeze({
        schemaVersion: XINMAI_CRYSTAL_ELIGIBILITY_SCHEMA_VERSION,
        source: "xinmai_crystal_eligibility_authority" as const,
        crystalEligibilityReferenceId: eligibilityReferenceId,
        livedResponseReferenceId:
          currentFact.livedResponseReferenceId,
        livedResponseRevision:
          currentFact.userConfirmationRevision,
        choiceActionIntentionReferenceId:
          currentFact.choiceActionIntentionReferenceId,
        identityReferences: currentFact.identityReferences,
        state: isEligible ? "ELIGIBLE" : "WITHHELD",
        withheldReason: isEligible
          ? null
          : currentFact.responseOutcome === "NOT_ATTEMPTED"
            ? "LIVED_RESPONSE_NOT_ATTEMPTED"
            : "LIVED_RESPONSE_UNABLE_TO_CONTINUE",
        eligibilityRevision: 1,
        reservation: null,
        consumedByFormationReferenceId: null,
        resolvedAt: now,
        updatedAt: now,
      });
      return commitXinmaiLivedGrowthTransaction(
        {
          ...current,
          crystalEligibilities: Object.freeze([
            ...current.crystalEligibilities.map((candidate) =>
              candidate.choiceActionIntentionReferenceId ===
                currentFact.choiceActionIntentionReferenceId &&
              candidate.state !== "CONSUMED"
                ? Object.freeze({
                    ...candidate,
                    state: "INVALIDATED" as const,
                    updatedAt: now,
                  })
                : candidate,
            ),
            eligibility,
          ]),
        },
        eligibility,
      );
    },
  );
  if (result.status === "COMMITTED") {
    return Object.freeze({
      status:
        result.value.state === "ELIGIBLE"
          ? "ELIGIBLE" as const
          : "WITHHELD" as const,
      eligibility: result.value,
    });
  }
  if (result.status === "ALREADY_COMMITTED") {
    return Object.freeze({
      status: "ALREADY_RESOLVED" as const,
      eligibility: result.value,
    });
  }
  return Object.freeze({
    status: result.status,
    eligibility: null,
    reason: result.reason,
  });
}
