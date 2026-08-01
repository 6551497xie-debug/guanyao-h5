import type {
  XinmaiCrystalFormationProductionInput,
  XinmaiCrystalFormationProductionOutcome,
} from "../types/xinmaiCrystalFormationProduction";
import { formCrystalFromEligibility } from "./xinmaiCrystalFormationConsumer";
import { xinmaiGrowthIdentityMatches } from "./xinmaiLivedGrowthIdentity";
import { readXinmaiLivedGrowthCanonicalState } from "./xinmaiLivedGrowthTransactionalStore";

export const XINMAI_CRYSTAL_FORMATION_PRODUCTION_ORCHESTRATOR_MODE =
  "UNIQUE_PRODUCTION_CALLER" as const;

export const XINMAI_PRODUCTION_CRYSTAL_FORMATION_REQUEST_POLICY:
  | "ENABLED"
  | "PAUSED" = "ENABLED";

const safeWithheld = (
  reason: Extract<
    XinmaiCrystalFormationProductionOutcome,
    { status: "SAFE_WITHHELD" }
  >["reason"],
): XinmaiCrystalFormationProductionOutcome =>
  Object.freeze({
    status: "SAFE_WITHHELD" as const,
    receipt: null,
    reason,
    successAuthority: null,
    bodyImprintAuthority:
      "SAFE_WITHHELD_UNTIL_CANONICAL_CUTOVER" as const,
  });

export async function orchestrateProductionCrystalFormation(
  input: XinmaiCrystalFormationProductionInput,
): Promise<XinmaiCrystalFormationProductionOutcome> {
  const recovered = await readXinmaiLivedGrowthCanonicalState();
  if (recovered.status !== "FOUND") {
    return safeWithheld(
      recovered.reason === "RECOVERY_CORRUPTED"
        ? "RECOVERY_CORRUPTED"
        : "RECOVERY_UNAVAILABLE",
    );
  }

  const currentFact = recovered.envelope.livedResponseFacts.find(
    (candidate) =>
      candidate.livedResponseReferenceId ===
        input.fact.livedResponseReferenceId &&
      candidate.userConfirmationRevision ===
        input.fact.userConfirmationRevision &&
      candidate.state === "CONFIRMED",
  );
  if (currentFact === undefined) {
    return safeWithheld("FACT_NOT_CURRENT");
  }
  if (
    !xinmaiGrowthIdentityMatches(
      currentFact.identityReferences,
      input.identityReferences,
    ) ||
    currentFact.choiceActionIntentionReferenceId !==
      input.fact.choiceActionIntentionReferenceId
  ) {
    return safeWithheld("PROVENANCE_MISMATCH");
  }

  const lineageReceipts = recovered.envelope.formationReceipts.filter(
    (receipt) =>
      receipt.choiceActionIntentionReferenceId ===
      currentFact.choiceActionIntentionReferenceId,
  );
  if (lineageReceipts.length > 1) {
    return safeWithheld("LEGACY_MULTIPLE_FORMATION_RECEIPTS");
  }
  if (lineageReceipts.length === 1) {
    const receipt = lineageReceipts[0];
    if (
      !xinmaiGrowthIdentityMatches(
        receipt.identityReferences,
        input.identityReferences,
      ) ||
      receipt.livedResponseReferenceId !==
        currentFact.livedResponseReferenceId
    ) {
      return safeWithheld("PROVENANCE_MISMATCH");
    }
    return Object.freeze({
      status: "ALREADY_FORMED" as const,
      receipt,
      reason: null,
      successAuthority: "IDB_TRANSACTION_COMPLETE" as const,
      bodyImprintAuthority:
        "SAFE_WITHHELD_UNTIL_CANONICAL_CUTOVER" as const,
    });
  }

  if (XINMAI_PRODUCTION_CRYSTAL_FORMATION_REQUEST_POLICY === "PAUSED") {
    return safeWithheld("PRODUCTION_FORMATION_PAUSED");
  }

  const currentEligibility =
    recovered.envelope.crystalEligibilities.find(
      (candidate) =>
        candidate.crystalEligibilityReferenceId ===
        input.eligibility.crystalEligibilityReferenceId,
    );
  if (currentEligibility === undefined) {
    return safeWithheld("ELIGIBILITY_MISSING");
  }
  if (
    currentEligibility.eligibilityRevision !==
      input.eligibility.eligibilityRevision ||
    currentEligibility.livedResponseReferenceId !==
      currentFact.livedResponseReferenceId ||
    currentEligibility.livedResponseRevision !==
      currentFact.userConfirmationRevision ||
    currentEligibility.choiceActionIntentionReferenceId !==
      currentFact.choiceActionIntentionReferenceId ||
    !xinmaiGrowthIdentityMatches(
      currentEligibility.identityReferences,
      input.identityReferences,
    )
  ) {
    return safeWithheld("PROVENANCE_MISMATCH");
  }
  if (
    currentEligibility.state !== "ELIGIBLE" &&
    currentEligibility.state !== "FORMATION_PENDING"
  ) {
    return safeWithheld("ELIGIBILITY_NOT_CURRENT");
  }

  const result = await formCrystalFromEligibility({
    crystalEligibilityReferenceId:
      currentEligibility.crystalEligibilityReferenceId,
    expectedEligibilityRevision:
      currentEligibility.eligibilityRevision,
    identityReferences: input.identityReferences,
  });
  if (result.status === "SAFE_WITHHELD") {
    return safeWithheld(
      result.reason === "LEGACY_MULTIPLE_FORMATION_RECEIPTS"
        ? "LEGACY_MULTIPLE_FORMATION_RECEIPTS"
        : result.reason === "PROVENANCE_MISMATCH"
          ? "PROVENANCE_MISMATCH"
          : result.reason === "ELIGIBILITY_NOT_CURRENT"
            ? "ELIGIBILITY_NOT_CURRENT"
            : "FORMATION_AUTHORITY_UNAVAILABLE",
    );
  }
  return Object.freeze({
    status: result.status,
    receipt: result.receipt,
    reason: null,
    successAuthority: "IDB_TRANSACTION_COMPLETE" as const,
    bodyImprintAuthority:
      "SAFE_WITHHELD_UNTIL_CANONICAL_CUTOVER" as const,
  });
}

export const recoverProductionCrystalFormation = (
  input: Omit<XinmaiCrystalFormationProductionInput, "trigger">,
): Promise<XinmaiCrystalFormationProductionOutcome> =>
  orchestrateProductionCrystalFormation(
    Object.freeze({
      ...input,
      trigger: "RECOVERY_RETRY" as const,
    }),
  );

export const XinmaiCrystalFormationProductionOrchestrator = Object.freeze({
  orchestrate: orchestrateProductionCrystalFormation,
  recover: recoverProductionCrystalFormation,
  productionCallerCount: 1 as const,
  recoveryCreatesEligibility: false as const,
  successAuthority: "IDB_TRANSACTION_COMPLETE" as const,
  legacyPersonalityRingWrites: 0 as const,
});
