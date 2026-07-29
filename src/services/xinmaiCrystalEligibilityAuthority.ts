import {
  XINMAI_CRYSTAL_ELIGIBILITY_SCHEMA_VERSION,
  type CrystalEligibility,
} from "../types/xinmaiCrystalEligibility";
import type { LivedResponseFact } from "../types/xinmaiLivedResponse";
import {
  readXinmaiLivedGrowthRecoveryCandidate,
  transactXinmaiLivedGrowthRecovery,
} from "./xinmaiLivedGrowthRecoveryPersistenceAdapter";
import { createStableXinmaiGrowthReference } from "./xinmaiLivedGrowthReference";

export function resolveCrystalEligibilityForFact(
  fact: LivedResponseFact,
):
  | Readonly<{
      status: "ELIGIBLE" | "WITHHELD";
      eligibility: CrystalEligibility;
    }>
  | Readonly<{
      status: "REJECTED";
      eligibility: null;
      reason: "FACT_NOT_CURRENT" | "PERSISTENCE_UNAVAILABLE";
    }> {
  const recovery = readXinmaiLivedGrowthRecoveryCandidate();
  if (
    recovery.status !== "FOUND" ||
    fact.state !== "CONFIRMED" ||
    !recovery.envelope.livedResponseFacts.some(
      (candidate) =>
        candidate.livedResponseReferenceId === fact.livedResponseReferenceId &&
        candidate.userConfirmationRevision ===
          fact.userConfirmationRevision &&
        candidate.state === "CONFIRMED",
    )
  ) {
    return Object.freeze({
      status: "REJECTED" as const,
      eligibility: null,
      reason: "FACT_NOT_CURRENT" as const,
    });
  }
  const isEligible =
    fact.responseOutcome === "ATTEMPTED" ||
    fact.responseOutcome === "COMPLETED_AS_INTENDED" ||
    fact.responseOutcome === "CHANGED_RESPONSE";
  const now = new Date().toISOString();
  const eligibility: CrystalEligibility = Object.freeze({
    schemaVersion: XINMAI_CRYSTAL_ELIGIBILITY_SCHEMA_VERSION,
    source: "xinmai_crystal_eligibility_authority" as const,
    crystalEligibilityReferenceId: createStableXinmaiGrowthReference(
      "crystal-eligibility",
      fact.livedResponseReferenceId,
      String(fact.userConfirmationRevision),
    ),
    livedResponseReferenceId: fact.livedResponseReferenceId,
    livedResponseRevision: fact.userConfirmationRevision,
    choiceActionIntentionReferenceId:
      fact.choiceActionIntentionReferenceId,
    identityReferences: fact.identityReferences,
    state: isEligible ? "ELIGIBLE" : "WITHHELD",
    withheldReason: isEligible
      ? null
      : fact.responseOutcome === "NOT_ATTEMPTED"
        ? "LIVED_RESPONSE_NOT_ATTEMPTED"
        : "LIVED_RESPONSE_UNABLE_TO_CONTINUE",
    eligibilityRevision: 1,
    reservation: null,
    consumedByFormationReferenceId: null,
    resolvedAt: now,
    updatedAt: now,
  });
  const result = transactXinmaiLivedGrowthRecovery((current) => ({
    ...current,
    crystalEligibilities: Object.freeze([
      ...current.crystalEligibilities.filter(
        (candidate) =>
          candidate.crystalEligibilityReferenceId !==
          eligibility.crystalEligibilityReferenceId,
      ),
      eligibility,
    ]),
  }));
  return result.status === "CONFIRMED"
    ? Object.freeze({
        status: isEligible ? "ELIGIBLE" as const : "WITHHELD" as const,
        eligibility,
      })
    : Object.freeze({
        status: "REJECTED" as const,
        eligibility: null,
        reason: "PERSISTENCE_UNAVAILABLE" as const,
      });
}
