import type { ChoiceActionIntention } from "../types/xinmaiChoiceActionIntention";
import {
  XINMAI_CHOICE_ACTION_INTENTION_SCHEMA_VERSION,
  XINMAI_CHOICE_ACTION_INTENTION_V3_SCHEMA_VERSION,
  XINMAI_CHOICE_ACTION_INTENTION_V4_SCHEMA_VERSION,
} from "../types/xinmaiChoiceActionIntention";
import {
  XINMAI_CHOICE_RETURNING_REALITY_PROOF_SCHEMA_VERSION,
  type XinmaiChoiceExplicitDepartureReceipt,
  type XinmaiChoiceReturningRealityProof,
  type XinmaiChoiceReturningRealityProofResult,
} from "../types/xinmaiChoiceReturningProvenance";
import { xinmaiGrowthIdentityMatches } from "./xinmaiLivedGrowthIdentity";
import { readRealityAdventureContinuity } from "./xinmaiRealityAdventureContinuityTransactionalStore";

export type XinmaiChoiceReturnTargetLifecycleReadResult =
  | Readonly<{ status: "ACTIVE" | "TERMINAL"; reason: null }>
  | Readonly<{
      status: "SAFE_WITHHELD";
      reason: "REALITY_PROOF_UNAVAILABLE" | "REALITY_PROOF_MISMATCH";
    }>;

export const validateXinmaiChoiceReturningRealityProof = (
  proof: XinmaiChoiceReturningRealityProof,
  intention: ChoiceActionIntention,
  departure: XinmaiChoiceExplicitDepartureReceipt,
): boolean =>
  proof.schemaVersion ===
    XINMAI_CHOICE_RETURNING_REALITY_PROOF_SCHEMA_VERSION &&
  proof.source === "xinmai_choice_returning_reality_proof_adapter" &&
  proof.choiceActionIntentionReferenceId ===
    intention.choiceActionIntentionReferenceId &&
  proof.departureReceiptReferenceId ===
    departure.departureReceiptReferenceId &&
  proof.sourceEncounterCycleId === intention.sourceEncounterCycleId &&
  proof.returnIntentRequestReferenceId.trim().length > 0 &&
  proof.returnAttemptRevision > 0 &&
  proof.targetEncounterCycleId.trim().length > 0 &&
  xinmaiGrowthIdentityMatches(
    proof.identityReferences,
    intention.identityReferences,
  ) &&
  proof.canonicalRevision > 0 &&
  proof.fencingToken > 0 &&
  proof.realityIntentRevision > 0 &&
  proof.provenance.origin === "CHOICE_RETURN" &&
  proof.provenance.qualification === "EXPLICIT_RETURN_TO_CHOICE" &&
  proof.provenance.routeTarget === "/reality" &&
  proof.provenance.readOnly === true &&
  proof.provenance.noGrowthAuthority === true;

export async function readXinmaiChoiceReturningRealityProof(input: Readonly<{
  intention: ChoiceActionIntention;
  departureReceipt: XinmaiChoiceExplicitDepartureReceipt;
  targetEncounterCycleId: string;
  returnIntentRequestReferenceId: string;
  returnAttemptRevision: number;
}>): Promise<XinmaiChoiceReturningRealityProofResult> {
  if (
    (input.intention.schemaVersion !==
      XINMAI_CHOICE_ACTION_INTENTION_SCHEMA_VERSION &&
      input.intention.schemaVersion !==
        XINMAI_CHOICE_ACTION_INTENTION_V3_SCHEMA_VERSION &&
      input.intention.schemaVersion !==
        XINMAI_CHOICE_ACTION_INTENTION_V4_SCHEMA_VERSION) ||
    !input.targetEncounterCycleId.trim() ||
    !input.returnIntentRequestReferenceId.trim() ||
    input.returnAttemptRevision < 1
  ) {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      proof: null,
      reason: "REALITY_PROOF_MISMATCH" as const,
    });
  }
  const recovered = await readRealityAdventureContinuity({
    kind: "ENCOUNTER",
    value: input.targetEncounterCycleId,
  });
  if (recovered.status !== "FOUND") {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      proof: null,
      reason: "REALITY_PROOF_UNAVAILABLE" as const,
    });
  }
  const record = recovered.record;
  const intent = record.realityIntent;
  const source = await readRealityAdventureContinuity({
    kind: "ENCOUNTER",
    value: input.intention.sourceEncounterCycleId,
  });
  const sourceReconciliation =
    source.status === "FOUND" &&
    "departureReconciliation" in source.record
      ? source.record.departureReconciliation
      : null;
  if (
    record.encounterCycleId !== input.targetEncounterCycleId ||
    !xinmaiGrowthIdentityMatches(
      record.identityReferences,
      input.intention.identityReferences,
    ) ||
    intent.encounterCycleId !== input.targetEncounterCycleId ||
    intent.origin !== "CHOICE_RETURN" ||
    intent.qualification !== "EXPLICIT_RETURN_TO_CHOICE" ||
    intent.departureReconciliationReferenceId === null ||
    intent.departureReconciliationReferenceId === undefined ||
    intent.choiceActionIntentionReferenceId !==
      input.intention.choiceActionIntentionReferenceId ||
    intent.departureReceiptReferenceId !==
      input.departureReceipt.departureReceiptReferenceId ||
    intent.departureReconciliationReferenceId === null ||
    intent.departureReconciliationReferenceId === undefined ||
    sourceReconciliation === null ||
    sourceReconciliation.reconciliationReferenceId !==
      intent.departureReconciliationReferenceId ||
    sourceReconciliation.departureReceiptReferenceId !==
      input.departureReceipt.departureReceiptReferenceId ||
    source.status !== "FOUND" ||
    source.record.lifecycle !== "TERMINAL" ||
    source.record.activeIdentityKey !== undefined ||
    intent.returnIntentRequestReferenceId !==
      input.returnIntentRequestReferenceId ||
    intent.returnAttemptRevision !== input.returnAttemptRevision ||
    intent.sourceEncounterCycleId !== input.intention.sourceEncounterCycleId ||
    intent.routeTarget !== "/reality" ||
    intent.state === "TERMINAL"
  ) {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      proof: null,
      reason: "REALITY_PROOF_MISMATCH" as const,
    });
  }
  const proof: XinmaiChoiceReturningRealityProof = Object.freeze({
    schemaVersion: XINMAI_CHOICE_RETURNING_REALITY_PROOF_SCHEMA_VERSION,
    source: "xinmai_choice_returning_reality_proof_adapter" as const,
    realityIntentReferenceId: intent.intentReferenceId,
    returnIntentRequestReferenceId: input.returnIntentRequestReferenceId,
    departureReceiptReferenceId:
      input.departureReceipt.departureReceiptReferenceId,
    sourceEncounterCycleId: input.intention.sourceEncounterCycleId,
    targetEncounterCycleId: input.targetEncounterCycleId,
    returnAttemptRevision: input.returnAttemptRevision,
    choiceActionIntentionReferenceId:
      input.intention.choiceActionIntentionReferenceId,
    identityReferences: Object.freeze({
      ...input.intention.identityReferences,
    }),
    canonicalRevision: record.canonicalRevision,
    fencingToken: record.fencingToken,
    realityIntentRevision: intent.revision,
    realityLifecycle: record.lifecycle,
    observedAt: new Date().toISOString(),
    provenance: Object.freeze({
      origin: "CHOICE_RETURN" as const,
      qualification: "EXPLICIT_RETURN_TO_CHOICE" as const,
      routeTarget: "/reality" as const,
      readOnly: true as const,
      noGrowthAuthority: true as const,
    }),
  });
  return validateXinmaiChoiceReturningRealityProof(
    proof,
    input.intention,
    input.departureReceipt,
  )
    ? Object.freeze({ status: "READY" as const, proof, reason: null })
    : Object.freeze({
        status: "SAFE_WITHHELD" as const,
        proof: null,
        reason: "REALITY_PROOF_MISMATCH" as const,
      });
}

export async function readXinmaiChoiceReturnTargetLifecycle(input: Readonly<{
  intention: ChoiceActionIntention;
  departureReceipt: XinmaiChoiceExplicitDepartureReceipt;
  returnReceipt: Readonly<{
    targetEncounterCycleId: string;
    returnIntentRequestReferenceId: string;
    returnAttemptRevision: number;
    realityProof: XinmaiChoiceReturningRealityProof;
  }>;
}>): Promise<XinmaiChoiceReturnTargetLifecycleReadResult> {
  const recovered = await readRealityAdventureContinuity({
    kind: "ENCOUNTER",
    value: input.returnReceipt.targetEncounterCycleId,
  });
  if (recovered.status !== "FOUND") {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      reason: "REALITY_PROOF_UNAVAILABLE" as const,
    });
  }
  const record = recovered.record;
  const intent = record.realityIntent;
  const proof = input.returnReceipt.realityProof;
  if (
    record.encounterCycleId !== input.returnReceipt.targetEncounterCycleId ||
    intent.encounterCycleId !== input.returnReceipt.targetEncounterCycleId ||
    intent.intentReferenceId !== proof.realityIntentReferenceId ||
    intent.origin !== "CHOICE_RETURN" ||
    intent.qualification !== "EXPLICIT_RETURN_TO_CHOICE" ||
    intent.choiceActionIntentionReferenceId !==
      input.intention.choiceActionIntentionReferenceId ||
    intent.departureReceiptReferenceId !==
      input.departureReceipt.departureReceiptReferenceId ||
    intent.returnIntentRequestReferenceId !==
      input.returnReceipt.returnIntentRequestReferenceId ||
    intent.returnAttemptRevision !== input.returnReceipt.returnAttemptRevision ||
    proof.targetEncounterCycleId !== input.returnReceipt.targetEncounterCycleId ||
    proof.returnIntentRequestReferenceId !==
      input.returnReceipt.returnIntentRequestReferenceId ||
    !validateXinmaiChoiceReturningRealityProof(
      proof,
      input.intention,
      input.departureReceipt,
    ) ||
    !xinmaiGrowthIdentityMatches(
      record.identityReferences,
      input.intention.identityReferences,
    )
  ) {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      reason: "REALITY_PROOF_MISMATCH" as const,
    });
  }
  const terminal =
    record.lifecycle === "TERMINAL" &&
    intent.state === "TERMINAL" &&
    record.activeIdentityKey === undefined;
  const active =
    record.lifecycle !== "TERMINAL" &&
    intent.state !== "TERMINAL" &&
    record.activeIdentityKey !== undefined;
  if (!terminal && !active) {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      reason: "REALITY_PROOF_MISMATCH" as const,
    });
  }
  return Object.freeze({
    status: terminal ? "TERMINAL" as const : "ACTIVE" as const,
    reason: null,
  });
}

export const XinmaiChoiceReturningRealityProofAdapter = Object.freeze({
  read: readXinmaiChoiceReturningRealityProof,
  readTargetLifecycle: readXinmaiChoiceReturnTargetLifecycle,
  validate: validateXinmaiChoiceReturningRealityProof,
  source: "REALITY_ADVENTURE_CONTINUITY_READ_ONLY" as const,
  readOnly: true as const,
  noStorageWrite: true as const,
  noGrowthAuthority: true as const,
});
