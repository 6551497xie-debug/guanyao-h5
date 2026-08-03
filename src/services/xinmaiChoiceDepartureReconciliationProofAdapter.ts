import {
  XINMAI_CHOICE_ACTION_INTENTION_SCHEMA_VERSION,
  type ChoiceActionIntention,
} from "../types/xinmaiChoiceActionIntention";
import type {
  XinmaiChoiceExplicitDepartureReceipt,
} from "../types/xinmaiChoiceReturningProvenance";
import type { RealityEncounterIdentityReferences } from "../types/xinmaiRealityEncounterIntent";
import {
  XINMAI_REALITY_GRAVITY_DEPARTURE_RECONCILIATION_SCHEMA_VERSION,
  type XinmaiChoiceDepartureReconciliationProof,
  type XinmaiChoiceDepartureReconciliationProofResult,
} from "../types/xinmaiRealityGravityDepartureReconciliation";
import { xinmaiGrowthIdentityMatches } from "./xinmaiLivedGrowthIdentity";
import { createStableXinmaiGrowthReference } from "./xinmaiLivedGrowthReference";
import { readXinmaiLivedGrowthCanonicalState } from "./xinmaiLivedGrowthTransactionalStore";

const validText = (value: string): boolean => value.trim().length > 0;

const safeWithheld = (
  reason: Extract<
    XinmaiChoiceDepartureReconciliationProofResult,
    { status: "SAFE_WITHHELD" }
  >["reason"],
): XinmaiChoiceDepartureReconciliationProofResult =>
  Object.freeze({ status: "SAFE_WITHHELD" as const, proof: null, reason });

export function createXinmaiChoiceDepartureReconciliationProof(input: Readonly<{
  intention: ChoiceActionIntention;
  departureReceipt: XinmaiChoiceExplicitDepartureReceipt;
  observedGrowthEnvelopeRevision: number;
}>): XinmaiChoiceDepartureReconciliationProofResult {
  const { intention, departureReceipt } = input;
  if (
    intention.schemaVersion !== XINMAI_CHOICE_ACTION_INTENTION_SCHEMA_VERSION ||
    !Number.isInteger(input.observedGrowthEnvelopeRevision) ||
    input.observedGrowthEnvelopeRevision < 1 ||
    !validText(intention.gravityCycleId) ||
    !validText(intention.gravityObservationReferenceId)
  ) {
    return safeWithheld("CHOICE_NOT_CURRENT");
  }
  if (
    departureReceipt.choiceActionIntentionReferenceId !==
      intention.choiceActionIntentionReferenceId ||
    departureReceipt.sourceEncounterCycleId !== intention.sourceEncounterCycleId ||
    departureReceipt.gravityObservationReferenceId !==
      intention.gravityObservationReferenceId ||
    departureReceipt.actionRouteReferenceId !==
      intention.actionRouteSnapshot.actionRouteReferenceId ||
    departureReceipt.actionRoutePrototypeVersion !==
      intention.actionRouteSnapshot.prototypeVersion ||
    departureReceipt.choiceRevisionAtDeparture > intention.revision ||
    !xinmaiGrowthIdentityMatches(
      departureReceipt.identityReferences,
      intention.identityReferences,
    )
  ) {
    return safeWithheld("IDENTITY_OR_LINEAGE_MISMATCH");
  }
  const reconciliationReferenceId = createStableXinmaiGrowthReference(
    "reality-gravity-departure-reconciliation",
    departureReceipt.departureReceiptReferenceId,
    intention.choiceActionIntentionReferenceId,
    intention.sourceEncounterCycleId,
    intention.gravityCycleId,
    intention.gravityObservationReferenceId,
    intention.identityReferences.sourceReferenceId,
    intention.identityReferences.starBeastIdentityReferenceId,
    intention.identityReferences.mansionCoordinateReferenceId,
  );
  const proof: XinmaiChoiceDepartureReconciliationProof = Object.freeze({
    schemaVersion:
      XINMAI_REALITY_GRAVITY_DEPARTURE_RECONCILIATION_SCHEMA_VERSION,
    source: "xinmai_choice_departure_reconciliation_proof_adapter" as const,
    reconciliationReferenceId,
    departureReceiptReferenceId:
      departureReceipt.departureReceiptReferenceId,
    departureReceiptRevision: departureReceipt.revision,
    choiceActionIntentionReferenceId:
      intention.choiceActionIntentionReferenceId,
    sourceEncounterCycleId: intention.sourceEncounterCycleId,
    gravityCycleId: intention.gravityCycleId,
    gravityObservationReferenceId: intention.gravityObservationReferenceId,
    identityReferences: Object.freeze({ ...intention.identityReferences }),
    observedGrowthEnvelopeRevision: input.observedGrowthEnvelopeRevision,
    observedAt: new Date().toISOString(),
    provenance: Object.freeze({
      departureAuthority:
        "XINMAI_LIVED_GROWTH_TRANSACTION_AUTHORITY" as const,
      readOnly: true as const,
      crossStoreAtomicityClaim: false as const,
      noActionCompletionClaim: true as const,
    }),
  });
  return Object.freeze({ status: "READY" as const, proof, reason: null });
}

export async function readXinmaiChoiceDepartureReconciliationProof(input: Readonly<{
  choiceActionIntentionReferenceId: string;
  departureReceiptReferenceId: string;
  identityReferences: RealityEncounterIdentityReferences;
}>): Promise<XinmaiChoiceDepartureReconciliationProofResult> {
  const recovered = await readXinmaiLivedGrowthCanonicalState();
  if (recovered.status !== "FOUND") {
    return safeWithheld(
      recovered.reason === "RECOVERY_CORRUPTED"
        ? "GROWTH_RECOVERY_CORRUPTED"
        : "GROWTH_RECOVERY_UNAVAILABLE",
    );
  }
  const intentions = recovered.envelope.choiceActionIntentions.filter(
    (candidate) =>
      candidate.choiceActionIntentionReferenceId ===
      input.choiceActionIntentionReferenceId,
  );
  const departures = recovered.envelope.choiceExplicitDepartureReceipts.filter(
    (candidate) =>
      candidate.departureReceiptReferenceId ===
      input.departureReceiptReferenceId,
  );
  if (intentions.length !== 1 || departures.length !== 1) {
    return safeWithheld(
      intentions.length > 1 || departures.length > 1
        ? "PROVENANCE_NOT_UNIQUE"
        : intentions.length === 0
          ? "CHOICE_NOT_CURRENT"
          : "DEPARTURE_RECEIPT_NOT_CURRENT",
    );
  }
  if (
    !xinmaiGrowthIdentityMatches(
      intentions[0].identityReferences,
      input.identityReferences,
    )
  ) {
    return safeWithheld("IDENTITY_OR_LINEAGE_MISMATCH");
  }
  return createXinmaiChoiceDepartureReconciliationProof({
    intention: intentions[0],
    departureReceipt: departures[0],
    observedGrowthEnvelopeRevision: recovered.envelope.revision,
  });
}

export const XinmaiChoiceDepartureReconciliationProofAdapter = Object.freeze({
  read: readXinmaiChoiceDepartureReconciliationProof,
  createFromRecoveredGrowth: createXinmaiChoiceDepartureReconciliationProof,
  canonicalReader: "XINMAI_LIVED_GROWTH_TRANSACTIONAL_STORE" as const,
  readOnly: true as const,
  crossStoreAtomicityClaim: false as const,
  noBackfill: true as const,
});
