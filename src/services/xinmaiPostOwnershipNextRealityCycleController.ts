import type {
  XinmaiPostOwnershipNextRealityCycleCause,
  XinmaiPostOwnershipNextRealityCycleCommand,
  XinmaiPostOwnershipNextRealityCycleResult,
} from "../types/xinmaiPostOwnershipNextRealityCycle";
import { readXinmaiCompletedReturnTargetProof } from "./xinmaiCompletedReturnTargetProofAdapter";
import { reconcileXinmaiCompletedReturnTargetForNextEncounter } from "./xinmaiRealityAdventureLifecycleReconciliationController";
import { requestRealityEncounter } from "./xinmaiRealityEncounterIntentController";
import { isXinmaiPostOwnershipNextRealityCycleMutationEnabled } from "./xinmaiPostOwnershipNextRealityCycleMutationPolicy";

const retryableIntentReasons = new Set([
  "TRANSACTION_STORAGE_UNAVAILABLE",
  "TRANSACTION_OPEN_BLOCKED",
  "TRANSACTION_ABORTED",
  "TRANSACTION_CONNECTION_CLOSED",
  "WRITE_UNCONFIRMED",
  "CONTINUATION_CONFLICT_WINNER_NOT_VISIBLE",
]);

const safeWithheld = (input: Readonly<{
  stage: XinmaiPostOwnershipNextRealityCycleCause["stage"];
  reason: string;
  innerCause?: string | null;
  reconciliationDisposition?:
    | "NOT_STARTED"
    | "RECONCILED"
    | "ALREADY_RECONCILED";
  previousEncounterCycleId?: string | null;
  previousIntentReferenceId?: string | null;
  retryability: "RETRYABLE" | "NON_RETRYABLE";
}>): XinmaiPostOwnershipNextRealityCycleResult =>
  Object.freeze({
    status: "SAFE_WITHHELD" as const,
    operation: "BEGIN_NEXT_REALITY_CYCLE" as const,
    reconciliationDisposition:
      input.reconciliationDisposition ?? "NOT_STARTED",
    requestDisposition: null,
    previousEncounterCycleId:
      input.previousEncounterCycleId ?? null,
    previousIntentReferenceId:
      input.previousIntentReferenceId ?? null,
    freshIntent: null,
    cause: Object.freeze({
      stage: input.stage,
      reason: input.reason,
      innerCause: input.innerCause ?? null,
    }),
    retryability: input.retryability,
  });

export async function beginXinmaiPostOwnershipNextRealityCycle(
  command: XinmaiPostOwnershipNextRealityCycleCommand,
): Promise<XinmaiPostOwnershipNextRealityCycleResult> {
  if (!isXinmaiPostOwnershipNextRealityCycleMutationEnabled()) {
    return safeWithheld({
      stage: "TARGET_RECONCILIATION",
      reason: "MUTATION_PAUSED",
      retryability: "NON_RETRYABLE",
    });
  }
  const proofResult = await readXinmaiCompletedReturnTargetProof(command);
  if (proofResult.status !== "READY") {
    return safeWithheld({
      stage: "COMPLETION_PROOF",
      reason: proofResult.reason,
      innerCause: proofResult.innerCause,
      retryability: proofResult.retryability,
    });
  }
  const proof = proofResult.proof;
  const reconciliation =
    await reconcileXinmaiCompletedReturnTargetForNextEncounter(proof);
  if (reconciliation.status === "SAFE_WITHHELD") {
    return safeWithheld({
      stage: "TARGET_RECONCILIATION",
      reason: reconciliation.reason,
      innerCause: reconciliation.reason,
      previousEncounterCycleId: proof.targetEncounterCycleId,
      previousIntentReferenceId:
        proof.targetRealityIntentReferenceId,
      retryability: reconciliation.retryability,
    });
  }

  const freshRequest = await requestRealityEncounter({
    identityReferences: proof.identityReferences,
    origin: "CHOICE_CONTINUATION",
    qualification: "CHOICE_ACTION_INTENTION_COMMITTED",
    choiceActionIntentionReferenceId:
      proof.choiceActionIntentionReferenceId,
    sourceEncounterCycleId: proof.targetEncounterCycleId,
  });
  if (freshRequest.status !== "READY") {
    return safeWithheld({
      stage: "FRESH_INTENT_REQUEST",
      reason: "FRESH_INTENT_REQUEST_BLOCKED",
      innerCause: freshRequest.reason,
      reconciliationDisposition: reconciliation.status,
      previousEncounterCycleId: proof.targetEncounterCycleId,
      previousIntentReferenceId:
        proof.targetRealityIntentReferenceId,
      retryability: retryableIntentReasons.has(freshRequest.reason)
        ? "RETRYABLE"
        : "NON_RETRYABLE",
    });
  }

  return Object.freeze({
    status: "READY" as const,
    operation: "BEGIN_NEXT_REALITY_CYCLE" as const,
    reconciliationDisposition: reconciliation.status,
    requestDisposition: freshRequest.requestDisposition,
    previousEncounterCycleId: proof.targetEncounterCycleId,
    previousIntentReferenceId: proof.targetRealityIntentReferenceId,
    freshIntent: freshRequest.intent,
    cause: null,
    retryability: "NOT_NEEDED" as const,
  });
}

export const XinmaiPostOwnershipNextRealityCycleController = Object.freeze({
  begin: beginXinmaiPostOwnershipNextRealityCycle,
  proofReader: "XINMAI_COMPLETED_RETURN_TARGET_PROOF_ADAPTER" as const,
  reconciliationOwner:
    "XINMAI_REALITY_ADVENTURE_LIFECYCLE_RECONCILIATION_CONTROLLER" as const,
  freshIntentOwner:
    "XINMAI_REALITY_ENCOUNTER_INTENT_CONTROLLER" as const,
  crossDatabaseAtomicityClaim: false as const,
  resumableSaga: true as const,
});
