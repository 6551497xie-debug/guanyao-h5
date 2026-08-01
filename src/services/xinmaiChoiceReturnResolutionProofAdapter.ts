import type { RealityEncounterIntent } from "../types/xinmaiRealityEncounterIntent";
import type { XinmaiChoiceReturnResolutionProofResult } from "../types/xinmaiChoiceReturningProvenance";
import { xinmaiGrowthIdentityMatches } from "./xinmaiLivedGrowthIdentity";
import { readXinmaiChoiceReturningProvenanceRecovery } from "./xinmaiChoiceReturningProvenanceRecoveryAdapter";

export async function readXinmaiChoiceReturnResolutionProof(
  intent: RealityEncounterIntent,
): Promise<XinmaiChoiceReturnResolutionProofResult> {
  if (
    intent.origin !== "CHOICE_RETURN" ||
    intent.qualification !== "EXPLICIT_RETURN_TO_CHOICE" ||
    intent.choiceActionIntentionReferenceId === null ||
    intent.departureReceiptReferenceId === null ||
    intent.returnIntentRequestReferenceId === null ||
    intent.returnAttemptRevision === null
  ) {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      admission: null,
      reason: "REALITY_PROOF_MISMATCH" as const,
    });
  }
  const admissions = await readXinmaiChoiceReturningProvenanceRecovery({
    sourceReferenceId: intent.sourceReferenceId,
    starBeastIdentityReferenceId: intent.starBeastIdentityReferenceId,
    mansionCoordinateReferenceId: intent.mansionCoordinateReferenceId,
  });
  const matches = admissions.filter(
    (
      admission,
    ): admission is Extract<
      (typeof admissions)[number],
      { state: "RESUME_REPORTED" | "TERMINAL_BY_GROWTH" }
    > =>
      (admission.state === "RESUME_REPORTED" ||
        admission.state === "TERMINAL_BY_GROWTH") &&
      admission.intention.choiceActionIntentionReferenceId ===
        intent.choiceActionIntentionReferenceId &&
      admission.returnReceipt?.departureReceiptReferenceId ===
        intent.departureReceiptReferenceId &&
      admission.returnReceipt.returnIntentRequestReferenceId ===
        intent.returnIntentRequestReferenceId &&
      admission.returnReceipt.returnAttemptRevision ===
        intent.returnAttemptRevision &&
      admission.returnReceipt.targetEncounterCycleId ===
        intent.encounterCycleId &&
      admission.returnReceipt.state === "CONSUMED_BY_FACT" &&
      admission.returnReceipt.consumedLivedResponseReferenceId ===
        admission.currentFact.livedResponseReferenceId &&
      xinmaiGrowthIdentityMatches(
        admission.intention.identityReferences,
        {
          sourceReferenceId: intent.sourceReferenceId,
          starBeastIdentityReferenceId:
            intent.starBeastIdentityReferenceId,
          mansionCoordinateReferenceId:
            intent.mansionCoordinateReferenceId,
        },
      ),
  );
  if (matches.length !== 1) {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      admission: null,
      reason:
        admissions.some(
          (admission) => admission.state === "SAFE_WITHHELD",
        )
          ? "RECOVERY_CORRUPTED" as const
          : "LIVED_RESPONSE_NOT_CONFIRMED" as const,
    });
  }
  return Object.freeze({
    status: "READY" as const,
    admission: matches[0],
    reason: null,
  });
}

export const XinmaiChoiceReturnResolutionProofAdapter = Object.freeze({
  read: readXinmaiChoiceReturnResolutionProof,
  canonicalReader: "XINMAI_LIVED_GROWTH_TRANSACTIONAL_STORE" as const,
  readOnly: true as const,
  noRouteStorageRead: true as const,
  noRealityAuthority: true as const,
});
