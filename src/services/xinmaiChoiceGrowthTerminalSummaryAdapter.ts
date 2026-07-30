import type {
  ChoiceGrowthTerminalSummary,
  ChoiceGrowthTerminalSummaryRequest,
} from "../types/xinmaiChoicePresentationReadiness";
import { xinmaiGrowthIdentityMatches } from "./xinmaiLivedGrowthIdentity";
import {
  readXinmaiLivedGrowthCanonicalState,
} from "./xinmaiLivedGrowthTransactionalStore";

const unavailableReasons = new Set([
  "TRANSACTION_STORAGE_UNAVAILABLE",
  "TRANSACTION_OPEN_BLOCKED",
  "TRANSACTION_ABORTED",
  "TRANSACTION_CONNECTION_CLOSED",
  "RECOVERY_UNAVAILABLE",
  "WRITE_UNCONFIRMED",
]);

const failedSummary = (
  request: ChoiceGrowthTerminalSummaryRequest,
  state: "RECOVERY_UNAVAILABLE" | "RECOVERY_CORRUPTED",
  reason: string,
): ChoiceGrowthTerminalSummary =>
  Object.freeze({
    state,
    request,
    canonicalRevision: null,
    resolvedAt: new Date().toISOString(),
    choiceActionIntention: null,
    livedResponseFact: null,
    crystalEligibility: null,
    formationReceipt: null,
    reason,
  });

export async function readChoiceGrowthTerminalSummary(
  request: ChoiceGrowthTerminalSummaryRequest,
): Promise<ChoiceGrowthTerminalSummary> {
  if (
    Object.values(request.identityReferences).some(
      (value) => !value.trim(),
    ) ||
    !request.sourceEncounterCycleId.trim() ||
    !request.gravityCycleId.trim() ||
    !request.gravityObservationReferenceId.trim()
  ) {
    return failedSummary(
      request,
      "RECOVERY_CORRUPTED",
      "INVALID_SUMMARY_REQUEST",
    );
  }
  const recovered = await readXinmaiLivedGrowthCanonicalState();
  if (recovered.status !== "FOUND") {
    return failedSummary(
      request,
      unavailableReasons.has(recovered.reason)
        ? "RECOVERY_UNAVAILABLE"
        : "RECOVERY_CORRUPTED",
      recovered.reason,
    );
  }
  const resolvedAt = new Date().toISOString();
  const matchingChoices =
    recovered.envelope.choiceActionIntentions.filter(
      (candidate) =>
        xinmaiGrowthIdentityMatches(
          candidate.identityReferences,
          request.identityReferences,
        ) &&
        candidate.sourceEncounterCycleId ===
          request.sourceEncounterCycleId &&
        candidate.gravityCycleId === request.gravityCycleId &&
        candidate.gravityObservationReferenceId ===
          request.gravityObservationReferenceId,
    );
  const lineageFacts = recovered.envelope.livedResponseFacts.filter(
    (candidate) =>
      xinmaiGrowthIdentityMatches(
        candidate.identityReferences,
        request.identityReferences,
      ) &&
      candidate.sourceEncounterCycleId ===
        request.sourceEncounterCycleId &&
      candidate.gravityCycleId === request.gravityCycleId &&
      candidate.gravityObservationReferenceId ===
        request.gravityObservationReferenceId,
  );
  if (
    matchingChoices.length > 1 ||
    (matchingChoices.length === 0 && lineageFacts.length > 0)
  ) {
    return failedSummary(
      request,
      "RECOVERY_CORRUPTED",
      "CHOICE_LINEAGE_NOT_UNIQUE",
    );
  }
  const choice = matchingChoices[0] ?? null;
  if (choice === null) {
    return Object.freeze({
      state: "NONE" as const,
      request,
      canonicalRevision: recovered.envelope.revision,
      resolvedAt,
      choiceActionIntention: null,
      livedResponseFact: null,
      crystalEligibility: null,
      formationReceipt: null,
      reason: null,
    });
  }
  const confirmedFacts = lineageFacts.filter(
    (candidate) =>
      candidate.choiceActionIntentionReferenceId ===
        choice.choiceActionIntentionReferenceId &&
      candidate.state === "CONFIRMED",
  );
  if (confirmedFacts.length > 1) {
    return failedSummary(
      request,
      "RECOVERY_CORRUPTED",
      "CURRENT_LIVED_RESPONSE_NOT_UNIQUE",
    );
  }
  const fact = confirmedFacts[0] ?? null;
  const eligibilityCandidates =
    recovered.envelope.crystalEligibilities.filter(
      (candidate) =>
        candidate.choiceActionIntentionReferenceId ===
          choice.choiceActionIntentionReferenceId &&
        candidate.state !== "INVALIDATED",
    );
  const receiptCandidates =
    recovered.envelope.formationReceipts.filter(
      (candidate) =>
        candidate.choiceActionIntentionReferenceId ===
        choice.choiceActionIntentionReferenceId,
    );
  if (
    eligibilityCandidates.length > 1 ||
    receiptCandidates.length > 1 ||
    (fact === null &&
      (eligibilityCandidates.length > 0 ||
        receiptCandidates.length > 0))
  ) {
    return failedSummary(
      request,
      "RECOVERY_CORRUPTED",
      "HIGHER_GROWTH_LINEAGE_NOT_UNIQUE",
    );
  }
  const eligibility = eligibilityCandidates[0] ?? null;
  const receipt = receiptCandidates[0] ?? null;
  if (
    eligibility !== null &&
    (fact === null ||
      eligibility.livedResponseReferenceId !==
        fact.livedResponseReferenceId ||
      eligibility.livedResponseRevision !==
        fact.userConfirmationRevision ||
      !xinmaiGrowthIdentityMatches(
        eligibility.identityReferences,
        request.identityReferences,
      ))
  ) {
    return failedSummary(
      request,
      "RECOVERY_CORRUPTED",
      "ELIGIBILITY_PROVENANCE_MISMATCH",
    );
  }
  if (
    receipt !== null &&
    (fact === null ||
      eligibility === null ||
      receipt.livedResponseReferenceId !==
        fact.livedResponseReferenceId ||
      receipt.crystalEligibilityReferenceId !==
        eligibility.crystalEligibilityReferenceId ||
      receipt.eligibilityRevision !==
        eligibility.eligibilityRevision ||
      !xinmaiGrowthIdentityMatches(
        receipt.identityReferences,
        request.identityReferences,
      ))
  ) {
    return failedSummary(
      request,
      "RECOVERY_CORRUPTED",
      "FORMATION_RECEIPT_PROVENANCE_MISMATCH",
    );
  }
  if (receipt !== null && fact !== null && eligibility !== null) {
    return Object.freeze({
      state: "CRYSTAL_FORMED" as const,
      request,
      canonicalRevision: recovered.envelope.revision,
      resolvedAt,
      choiceActionIntention: choice,
      livedResponseFact: fact,
      crystalEligibility: eligibility,
      formationReceipt: receipt,
      reason: null,
    });
  }
  if (eligibility !== null && fact !== null) {
    return Object.freeze({
      state: "ELIGIBILITY_AVAILABLE" as const,
      request,
      canonicalRevision: recovered.envelope.revision,
      resolvedAt,
      choiceActionIntention: choice,
      livedResponseFact: fact,
      crystalEligibility: eligibility,
      formationReceipt: null,
      reason: null,
    });
  }
  if (fact !== null) {
    return Object.freeze({
      state: "LIVED_RESPONSE_RECORDED" as const,
      request,
      canonicalRevision: recovered.envelope.revision,
      resolvedAt,
      choiceActionIntention: choice,
      livedResponseFact: fact,
      crystalEligibility: null,
      formationReceipt: null,
      reason: null,
    });
  }
  return Object.freeze({
    state: "CHOICE_COMMITTED" as const,
    request,
    canonicalRevision: recovered.envelope.revision,
    resolvedAt,
    choiceActionIntention: choice,
    livedResponseFact: null,
    crystalEligibility: null,
    formationReceipt: null,
    reason: null,
  });
}

export const XinmaiChoiceGrowthTerminalSummaryAdapter =
  Object.freeze({
    read: readChoiceGrowthTerminalSummary,
    source: "INDEXED_DB_CANONICAL_GROWTH_RECOVERY" as const,
    readOnly: true as const,
    noMutation: true as const,
    noBackfill: true as const,
    noPageStorageRead: true as const,
    noHostStorageRead: true as const,
    noRendererStorageRead: true as const,
  });
