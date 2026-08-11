import type { RealityEncounterIdentityReferences } from "../types/xinmaiRealityEncounterIntent";
import { readXinmaiGravityObservationContinuityState } from "./xinmaiLivedGrowthTransactionalStore";

export type XinmaiCompletedRealityVisibleHistoryResult =
  | Readonly<{
      status: "READY";
      candidateReferenceId: string;
      selectedPressureSeedId: string;
    }>
  | Readonly<{
      status: "UNAVAILABLE";
      candidateReferenceId: null;
      selectedPressureSeedId: null;
      reason:
        | "CHOICE_REFERENCE_MISSING"
        | "HISTORY_NOT_FOUND"
        | "HISTORY_LINEAGE_MISMATCH"
        | "HISTORY_RECOVERY_UNAVAILABLE";
    }>;

const unavailable = (
  reason: Extract<
    XinmaiCompletedRealityVisibleHistoryResult,
    { status: "UNAVAILABLE" }
  >["reason"],
): XinmaiCompletedRealityVisibleHistoryResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    candidateReferenceId: null,
    selectedPressureSeedId: null,
    reason,
  });

export async function readXinmaiCompletedRealityVisibleHistory(input: Readonly<{
  identityReferences: RealityEncounterIdentityReferences;
  choiceActionIntentionReferenceId: string | null;
}>): Promise<XinmaiCompletedRealityVisibleHistoryResult> {
  const choiceReference = input.choiceActionIntentionReferenceId?.trim();
  if (!choiceReference) return unavailable("CHOICE_REFERENCE_MISSING");

  const recovered = await readXinmaiGravityObservationContinuityState(
    `CURRENT:${input.identityReferences.sourceReferenceId}`,
  );
  if (recovered.status !== "FOUND") {
    return unavailable("HISTORY_RECOVERY_UNAVAILABLE");
  }
  const record = recovered.record;
  if (record === null) return unavailable("HISTORY_NOT_FOUND");
  if (
    record.identityReferences.sourceReferenceId !== input.identityReferences.sourceReferenceId ||
    record.identityReferences.starBeastIdentityReferenceId !== input.identityReferences.starBeastIdentityReferenceId ||
    record.identityReferences.mansionCoordinateReferenceId !== input.identityReferences.mansionCoordinateReferenceId ||
    record.consumedByChoiceActionIntentionReferenceId !== choiceReference
  ) {
    return unavailable("HISTORY_LINEAGE_MISMATCH");
  }

  return Object.freeze({
    status: "READY" as const,
    candidateReferenceId: record.pressureProvenance.candidateReferenceId,
    selectedPressureSeedId: record.pressureProvenance.selectedPressureSeedId,
  });
}
