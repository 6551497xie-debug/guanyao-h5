import {
  XINMAI_CHOICE_ACTION_INTENTION_SCHEMA_VERSION,
  XINMAI_CHOICE_ACTION_INTENTION_V3_SCHEMA_VERSION,
  XINMAI_CHOICE_ACTION_INTENTION_V4_SCHEMA_VERSION,
  type ChoiceActionIntention,
} from "../types/xinmaiChoiceActionIntention";
import {
  XINMAI_CHOICE_DEPARTURE_RECEIPT_SCHEMA_VERSION,
  XINMAI_CHOICE_RETURN_RECEIPT_SCHEMA_VERSION,
  type XinmaiChoiceExplicitDepartureReceipt,
  type XinmaiChoiceExplicitReturnReceipt,
  type XinmaiChoiceNoFactResolution,
  type XinmaiChoiceReturningProvenanceAdmission,
} from "../types/xinmaiChoiceReturningProvenance";
import type { RealityEncounterIdentityReferences } from "../types/xinmaiRealityEncounterIntent";
import {
  commitXinmaiLivedGrowthTransaction,
  preserveXinmaiLivedGrowthTransaction,
  rejectXinmaiLivedGrowthTransaction,
} from "../types/xinmaiLivedGrowthTransaction";
import { xinmaiGrowthIdentityMatches } from "./xinmaiLivedGrowthIdentity";
import { createStableXinmaiGrowthReference } from "./xinmaiLivedGrowthReference";
import { executeXinmaiLivedGrowthTransaction } from "./xinmaiLivedGrowthTransactionAuthority";
import { readXinmaiLivedGrowthCanonicalState } from "./xinmaiLivedGrowthTransactionalStore";
import {
  readXinmaiChoiceReturnTargetLifecycle,
  readXinmaiChoiceReturningRealityProof,
  validateXinmaiChoiceReturningRealityProof,
} from "./xinmaiChoiceReturningRealityProofAdapter";
import { isXinmaiChoiceReturningProvenanceMutationEnabled } from "./xinmaiChoiceReturningProvenanceMutationPolicy";
import { resolveXinmaiChoiceReturningProvenanceAdmission } from "./xinmaiChoiceReturningProvenanceAdmissionResolver";
import {
  createXinmaiChoiceDepartureReconciliationProof,
  readXinmaiChoiceDepartureReconciliationProof,
} from "./xinmaiChoiceDepartureReconciliationProofAdapter";
import {
  readXinmaiChoiceDepartureReconciliation,
  reconcileXinmaiChoiceExplicitDeparture,
} from "./xinmaiRealityAdventureLifecycleReconciliationController";
import { isXinmaiRealityAdventureLifecycleReconciliationMutationEnabled } from "./xinmaiRealityAdventureLifecycleReconciliationMutationPolicy";
import {
  requestRealityEncounter,
  terminateRealityEncounter,
} from "./xinmaiRealityEncounterIntentController";

type ProvenanceFailureReason =
  | "MUTATION_PAUSED"
  | "INTENTION_NOT_FOUND"
  | "INTENTION_NOT_V2"
  | "IDENTITY_MISMATCH"
  | "STALE_INTENTION_REVISION"
  | "CHOICE_NOT_COMMITTED"
  | "DEPARTURE_RECEIPT_NOT_FOUND"
  | "DEPARTURE_RECEIPT_MISMATCH"
  | "RETURN_RECEIPT_MISMATCH"
  | "RETURN_RECEIPT_NOT_READY"
  | "REALITY_INTENT_UNAVAILABLE"
  | "REALITY_PROOF_UNAVAILABLE"
  | "REALITY_PROOF_MISMATCH"
  | "DEPARTURE_RECONCILIATION_PENDING"
  | "DEPARTURE_RECONCILIATION_REQUIRED"
  | "DEPARTURE_RECONCILIATION_MISMATCH"
  | "PROVENANCE_NOT_UNIQUE"
  | "PERSISTENCE_UNAVAILABLE";

export type XinmaiChoiceDepartureResult =
  | Readonly<{
      status: "DEPARTED" | "ALREADY_DEPARTED";
      intention: ChoiceActionIntention;
      receipt: XinmaiChoiceExplicitDepartureReceipt;
    }>
  | Readonly<{
      status: "DEPARTURE_RECONCILIATION_PENDING";
      intention: ChoiceActionIntention;
      receipt: XinmaiChoiceExplicitDepartureReceipt;
      reason: ProvenanceFailureReason | string;
    }>
  | Readonly<{
      status: "REJECTED" | "SAFE_WITHHELD";
      intention: null;
      receipt: null;
      reason: ProvenanceFailureReason | string;
    }>;

export type XinmaiChoiceReturnResult =
  | Readonly<{
      status: "RETURNED" | "ALREADY_RETURNED";
      intention: ChoiceActionIntention;
      departureReceipt: XinmaiChoiceExplicitDepartureReceipt;
      returnReceipt: XinmaiChoiceExplicitReturnReceipt;
    }>
  | Readonly<{
      status: "REJECTED" | "SAFE_WITHHELD";
      intention: null;
      departureReceipt: null;
      returnReceipt: null;
      reason: ProvenanceFailureReason | string;
    }>;

export type XinmaiChoiceNoFactResolutionResult =
  | Readonly<{
      status: "RESOLVED" | "ALREADY_RESOLVED";
      intention: ChoiceActionIntention;
      departureReceipt: XinmaiChoiceExplicitDepartureReceipt;
      returnReceipt: XinmaiChoiceExplicitReturnReceipt;
      intentTermination: "TERMINATED" | "RETRYABLE";
    }>
  | Readonly<{
      status: "REJECTED" | "SAFE_WITHHELD";
      intention: null;
      departureReceipt: null;
      returnReceipt: null;
      reason: ProvenanceFailureReason | string;
    }>;

const failedDeparture = (
  status: "REJECTED" | "SAFE_WITHHELD",
  reason: ProvenanceFailureReason | string,
): XinmaiChoiceDepartureResult =>
  Object.freeze({ status, intention: null, receipt: null, reason });

const failedReturn = (
  status: "REJECTED" | "SAFE_WITHHELD",
  reason: ProvenanceFailureReason | string,
): XinmaiChoiceReturnResult =>
  Object.freeze({
    status,
    intention: null,
    departureReceipt: null,
    returnReceipt: null,
    reason,
  });

const failedResolution = (
  status: "REJECTED" | "SAFE_WITHHELD",
  reason: ProvenanceFailureReason | string,
): XinmaiChoiceNoFactResolutionResult =>
  Object.freeze({
    status,
    intention: null,
    departureReceipt: null,
    returnReceipt: null,
    reason,
  });

export async function confirmXinmaiChoiceExplicitDeparture(input: Readonly<{
  intention: ChoiceActionIntention;
  expectedIntentionRevision: number;
  identityReferences: RealityEncounterIdentityReferences;
}>): Promise<XinmaiChoiceDepartureResult> {
  if (
    !isXinmaiChoiceReturningProvenanceMutationEnabled() ||
    !isXinmaiRealityAdventureLifecycleReconciliationMutationEnabled()
  ) {
    return failedDeparture("SAFE_WITHHELD", "MUTATION_PAUSED");
  }
  const result = await executeXinmaiLivedGrowthTransaction(
    Object.freeze({
      commandReferenceId: createStableXinmaiGrowthReference(
        "growth-command:confirm-choice-departure",
        input.intention.choiceActionIntentionReferenceId,
        String(input.expectedIntentionRevision),
      ),
      commandType: "CONFIRM_CHOICE_DEPARTURE" as const,
      identityReferences: input.identityReferences,
      issuedAt: new Date().toISOString(),
    }),
    (current) => {
      const intention = current.choiceActionIntentions.find(
        (candidate) =>
          candidate.choiceActionIntentionReferenceId ===
          input.intention.choiceActionIntentionReferenceId,
      );
      if (!intention) {
        return rejectXinmaiLivedGrowthTransaction("INTENTION_NOT_FOUND");
      }
      if (
        intention.schemaVersion !==
          XINMAI_CHOICE_ACTION_INTENTION_SCHEMA_VERSION &&
        intention.schemaVersion !==
          XINMAI_CHOICE_ACTION_INTENTION_V3_SCHEMA_VERSION &&
        intention.schemaVersion !==
          XINMAI_CHOICE_ACTION_INTENTION_V4_SCHEMA_VERSION
      ) {
        return rejectXinmaiLivedGrowthTransaction("INTENTION_NOT_V2");
      }
      if (!xinmaiGrowthIdentityMatches(intention.identityReferences, input.identityReferences)) {
        return rejectXinmaiLivedGrowthTransaction("IDENTITY_MISMATCH");
      }
      const existing = current.choiceExplicitDepartureReceipts.filter(
        (receipt) =>
          receipt.choiceActionIntentionReferenceId ===
          intention.choiceActionIntentionReferenceId,
      );
      if (existing.length > 1) {
        return rejectXinmaiLivedGrowthTransaction("PROVENANCE_NOT_UNIQUE");
      }
      if (existing.length === 1) {
        const receipt = existing[0];
        if (
          receipt.actionRouteReferenceId !==
            intention.actionRouteSnapshot.actionRouteReferenceId ||
          receipt.gravityObservationReferenceId !==
            intention.gravityObservationReferenceId ||
          receipt.sourceEncounterCycleId !== intention.sourceEncounterCycleId ||
          !xinmaiGrowthIdentityMatches(receipt.identityReferences, intention.identityReferences)
        ) {
          return rejectXinmaiLivedGrowthTransaction("DEPARTURE_RECEIPT_MISMATCH");
        }
        return preserveXinmaiLivedGrowthTransaction(
          Object.freeze({ intention, receipt }),
        );
      }
      if (
        intention.state !== "COMMITTED" ||
        intention.targetEncounterCycleId !== null
      ) {
        return rejectXinmaiLivedGrowthTransaction("CHOICE_NOT_COMMITTED");
      }
      if (intention.revision !== input.expectedIntentionRevision) {
        return rejectXinmaiLivedGrowthTransaction("STALE_INTENTION_REVISION");
      }
      const now = new Date().toISOString();
      const receipt: XinmaiChoiceExplicitDepartureReceipt = Object.freeze({
        schemaVersion: XINMAI_CHOICE_DEPARTURE_RECEIPT_SCHEMA_VERSION,
        source: "xinmai_choice_returning_provenance_controller" as const,
        departureReceiptReferenceId: createStableXinmaiGrowthReference(
          "choice-departure",
          intention.choiceActionIntentionReferenceId,
          intention.actionRouteSnapshot.actionRouteReferenceId,
          String(intention.actionRouteSnapshot.prototypeVersion),
          intention.gravityObservationReferenceId,
          intention.sourceEncounterCycleId,
          String(intention.revision),
        ),
        choiceActionIntentionReferenceId:
          intention.choiceActionIntentionReferenceId,
        identityReferences: Object.freeze({ ...intention.identityReferences }),
        actionRouteReferenceId:
          intention.actionRouteSnapshot.actionRouteReferenceId,
        actionRoutePrototypeVersion:
          intention.actionRouteSnapshot.prototypeVersion,
        gravityObservationReferenceId: intention.gravityObservationReferenceId,
        sourceEncounterCycleId: intention.sourceEncounterCycleId,
        choiceRevisionAtDeparture: intention.revision,
        revision: 1,
        state: "DORMANT_DEPARTURE" as const,
        departedAt: now,
        updatedAt: now,
        provenance: Object.freeze({
          userExplicitDeparture: true as const,
          growthTransactionConfirmed: true as const,
          noTargetEncounterYet: true as const,
          noActionCompletionClaim: true as const,
          noLivedResponseAuthority: true as const,
          noCrystalAuthority: true as const,
        }),
      });
      return commitXinmaiLivedGrowthTransaction(
        {
          ...current,
          choiceExplicitDepartureReceipts: Object.freeze([
            ...current.choiceExplicitDepartureReceipts,
            receipt,
          ]),
        },
        Object.freeze({ intention, receipt }),
      );
    },
  );
  if (result.status === "COMMITTED" || result.status === "ALREADY_COMMITTED") {
    const proofResult = createXinmaiChoiceDepartureReconciliationProof({
      intention: result.value.intention,
      departureReceipt: result.value.receipt,
      observedGrowthEnvelopeRevision: result.envelope.revision,
    });
    if (proofResult.status !== "READY") {
      return Object.freeze({
        status: "DEPARTURE_RECONCILIATION_PENDING" as const,
        intention: result.value.intention,
        receipt: result.value.receipt,
        reason: proofResult.reason,
      });
    }
    const reconciliation =
      await reconcileXinmaiChoiceExplicitDeparture(proofResult.proof);
    if (
      reconciliation.status !== "RECONCILED" &&
      reconciliation.status !== "ALREADY_RECONCILED"
    ) {
      return Object.freeze({
        status: "DEPARTURE_RECONCILIATION_PENDING" as const,
        intention: result.value.intention,
        receipt: result.value.receipt,
        reason:
          reconciliation.reason ?? "DEPARTURE_RECONCILIATION_PENDING",
      });
    }
    return Object.freeze({
      status: result.status === "COMMITTED" ? "DEPARTED" as const : "ALREADY_DEPARTED" as const,
      intention: result.value.intention,
      receipt: result.value.receipt,
    });
  }
  return failedDeparture(result.status, result.reason);
}

export async function confirmXinmaiChoiceExplicitReturn(input: Readonly<{
  admission: Extract<XinmaiChoiceReturningProvenanceAdmission, { state: "DORMANT_DEPARTURE" }>;
}>): Promise<XinmaiChoiceReturnResult> {
  if (
    !isXinmaiChoiceReturningProvenanceMutationEnabled() ||
    !isXinmaiRealityAdventureLifecycleReconciliationMutationEnabled()
  ) {
    return failedReturn("SAFE_WITHHELD", "MUTATION_PAUSED");
  }
  const recovered = await readXinmaiLivedGrowthCanonicalState();
  if (recovered.status !== "FOUND") {
    return failedReturn("SAFE_WITHHELD", recovered.reason);
  }
  const historicReturns = recovered.envelope.choiceExplicitReturnReceipts.filter(
    (receipt) =>
      receipt.departureReceiptReferenceId ===
      input.admission.departureReceipt.departureReceiptReferenceId,
  );
  const ready = historicReturns.filter(
    (receipt) => receipt.state === "READY_FOR_LIVED_RESPONSE",
  );
  if (ready.length > 1) {
    return failedReturn("SAFE_WITHHELD", "PROVENANCE_NOT_UNIQUE");
  }
  const departureProof = await readXinmaiChoiceDepartureReconciliationProof({
    choiceActionIntentionReferenceId:
      input.admission.intention.choiceActionIntentionReferenceId,
    departureReceiptReferenceId:
      input.admission.departureReceipt.departureReceiptReferenceId,
    identityReferences: input.admission.intention.identityReferences,
  });
  if (departureProof.status !== "READY") {
    return failedReturn(
      "SAFE_WITHHELD",
      "DEPARTURE_RECONCILIATION_MISMATCH",
    );
  }
  const sourceReconciliation = await readXinmaiChoiceDepartureReconciliation({
    proof: departureProof.proof,
  });
  if (sourceReconciliation.status !== "CURRENT") {
    return failedReturn(
      "SAFE_WITHHELD",
      sourceReconciliation.status === "PENDING"
        ? "DEPARTURE_RECONCILIATION_REQUIRED"
        : "DEPARTURE_RECONCILIATION_MISMATCH",
    );
  }
  const returnAttemptRevision =
    ready[0]?.returnAttemptRevision ??
    Math.max(0, ...historicReturns.map((receipt) => receipt.returnAttemptRevision)) + 1;
  const returnIntentRequestReferenceId = createStableXinmaiGrowthReference(
    "choice-return-intent-request",
    input.admission.departureReceipt.departureReceiptReferenceId,
    String(returnAttemptRevision),
  );
  const requested = await requestRealityEncounter({
    origin: "CHOICE_RETURN",
    qualification: "EXPLICIT_RETURN_TO_CHOICE",
    choiceActionIntentionReferenceId:
      input.admission.intention.choiceActionIntentionReferenceId,
    departureReceiptReferenceId:
      input.admission.departureReceipt.departureReceiptReferenceId,
    departureReconciliationReferenceId:
      sourceReconciliation.reconciliation.reconciliationReferenceId,
    returnIntentRequestReferenceId,
    returnAttemptRevision,
    sourceEncounterCycleId: input.admission.intention.sourceEncounterCycleId,
    identityReferences: input.admission.intention.identityReferences,
  });
  if (requested.status !== "READY") {
    return failedReturn("SAFE_WITHHELD", requested.reason);
  }
  const proofResult = await readXinmaiChoiceReturningRealityProof({
    intention: input.admission.intention,
    departureReceipt: input.admission.departureReceipt,
    targetEncounterCycleId: requested.intent.encounterCycleId,
    returnIntentRequestReferenceId,
    returnAttemptRevision,
  });
  if (proofResult.status !== "READY") {
    return failedReturn("SAFE_WITHHELD", proofResult.reason);
  }
  const result = await executeXinmaiLivedGrowthTransaction(
    Object.freeze({
      commandReferenceId: createStableXinmaiGrowthReference(
        "growth-command:confirm-choice-return",
        input.admission.departureReceipt.departureReceiptReferenceId,
        String(returnAttemptRevision),
      ),
      commandType: "CONFIRM_CHOICE_RETURN" as const,
      identityReferences: input.admission.intention.identityReferences,
      issuedAt: new Date().toISOString(),
    }),
    (current) => {
      const intention = current.choiceActionIntentions.find(
        (candidate) =>
          candidate.choiceActionIntentionReferenceId ===
          input.admission.intention.choiceActionIntentionReferenceId,
      );
      const departures = current.choiceExplicitDepartureReceipts.filter(
        (receipt) =>
          receipt.choiceActionIntentionReferenceId ===
          input.admission.intention.choiceActionIntentionReferenceId,
      );
      if (!intention) return rejectXinmaiLivedGrowthTransaction("INTENTION_NOT_FOUND");
      if (departures.length !== 1) {
        return rejectXinmaiLivedGrowthTransaction(
          departures.length === 0 ? "DEPARTURE_RECEIPT_NOT_FOUND" : "PROVENANCE_NOT_UNIQUE",
        );
      }
      const departure = departures[0];
      if (
        !xinmaiGrowthIdentityMatches(intention.identityReferences, input.admission.intention.identityReferences) ||
        !xinmaiGrowthIdentityMatches(departure.identityReferences, intention.identityReferences)
      ) {
        return rejectXinmaiLivedGrowthTransaction("IDENTITY_MISMATCH");
      }
      const exact = current.choiceExplicitReturnReceipts.find(
        (receipt) =>
          receipt.returnIntentRequestReferenceId === returnIntentRequestReferenceId,
      );
      if (exact) {
        if (
          exact.targetEncounterCycleId !== requested.intent.encounterCycleId ||
          exact.state !== "READY_FOR_LIVED_RESPONSE" ||
          !validateXinmaiChoiceReturningRealityProof(exact.realityProof, intention, departure)
        ) {
          return rejectXinmaiLivedGrowthTransaction("RETURN_RECEIPT_MISMATCH");
        }
        return preserveXinmaiLivedGrowthTransaction(
          Object.freeze({ intention, departureReceipt: departure, returnReceipt: exact }),
        );
      }
      if (
        departure.state !== "DORMANT_DEPARTURE" ||
        intention.state !== "COMMITTED" ||
        intention.targetEncounterCycleId !== null ||
        current.choiceExplicitReturnReceipts.some(
          (receipt) =>
            receipt.departureReceiptReferenceId === departure.departureReceiptReferenceId &&
            receipt.state === "READY_FOR_LIVED_RESPONSE",
        ) ||
        !validateXinmaiChoiceReturningRealityProof(proofResult.proof, intention, departure)
      ) {
        return rejectXinmaiLivedGrowthTransaction("DEPARTURE_RECEIPT_MISMATCH");
      }
      const now = new Date().toISOString();
      const boundIntention: ChoiceActionIntention = Object.freeze({
        ...intention,
        targetEncounterCycleId: requested.intent.encounterCycleId,
        revision: intention.revision + 1,
        updatedAt: now,
      });
      const returningDeparture: XinmaiChoiceExplicitDepartureReceipt = Object.freeze({
        ...departure,
        state: "RETURN_IN_PROGRESS" as const,
        revision: departure.revision + 1,
        updatedAt: now,
      });
      const returnReceipt: XinmaiChoiceExplicitReturnReceipt = Object.freeze({
        schemaVersion: XINMAI_CHOICE_RETURN_RECEIPT_SCHEMA_VERSION,
        source: "xinmai_choice_returning_provenance_controller" as const,
        returnReceiptReferenceId: createStableXinmaiGrowthReference(
          "choice-return",
          departure.departureReceiptReferenceId,
          String(returnAttemptRevision),
        ),
        returnIntentRequestReferenceId,
        departureReceiptReferenceId: departure.departureReceiptReferenceId,
        choiceActionIntentionReferenceId: intention.choiceActionIntentionReferenceId,
        identityReferences: Object.freeze({ ...intention.identityReferences }),
        actionRouteReferenceId: departure.actionRouteReferenceId,
        gravityObservationReferenceId: departure.gravityObservationReferenceId,
        sourceEncounterCycleId: departure.sourceEncounterCycleId,
        targetEncounterCycleId: requested.intent.encounterCycleId,
        returnAttemptRevision,
        revision: 1,
        state: "READY_FOR_LIVED_RESPONSE" as const,
        consumedLivedResponseReferenceId: null,
        noFactReason: null,
        realityProof: proofResult.proof,
        returnedAt: now,
        updatedAt: now,
        provenance: Object.freeze({
          userExplicitReturn: true as const,
          realityIntentCommittedBeforeReceipt: true as const,
          noRealityActivationClaim: true as const,
          noActionCompletionClaim: true as const,
          noLivedResponseAuthority: true as const,
          noCrystalAuthority: true as const,
        }),
      });
      return commitXinmaiLivedGrowthTransaction(
        {
          ...current,
          choiceActionIntentions: Object.freeze(
            current.choiceActionIntentions.map((candidate) =>
              candidate.choiceActionIntentionReferenceId === boundIntention.choiceActionIntentionReferenceId
                ? boundIntention
                : candidate,
            ),
          ),
          choiceExplicitDepartureReceipts: Object.freeze(
            current.choiceExplicitDepartureReceipts.map((candidate) =>
              candidate.departureReceiptReferenceId === returningDeparture.departureReceiptReferenceId
                ? returningDeparture
                : candidate,
            ),
          ),
          choiceExplicitReturnReceipts: Object.freeze([
            ...current.choiceExplicitReturnReceipts,
            returnReceipt,
          ]),
        },
        Object.freeze({
          intention: boundIntention,
          departureReceipt: returningDeparture,
          returnReceipt,
        }),
      );
    },
  );
  if (result.status === "COMMITTED" || result.status === "ALREADY_COMMITTED") {
    return Object.freeze({
      status:
        result.status === "COMMITTED" &&
        requested.requestDisposition === "CREATED"
          ? "RETURNED" as const
          : "ALREADY_RETURNED" as const,
      intention: result.value.intention,
      departureReceipt: result.value.departureReceipt,
      returnReceipt: result.value.returnReceipt,
    });
  }
  return failedReturn(result.status, result.reason);
}

export async function resolveXinmaiChoiceReturnWithoutFact(input: Readonly<{
  admission: Extract<
    XinmaiChoiceReturningProvenanceAdmission,
    {
      state:
        | "READY_FOR_LIVED_RESPONSE"
        | "NO_FACT_TARGET_TERMINATION_PENDING";
    }
  >;
  resolution: XinmaiChoiceNoFactResolution;
}>): Promise<XinmaiChoiceNoFactResolutionResult> {
  if (
    !isXinmaiChoiceReturningProvenanceMutationEnabled() ||
    !isXinmaiRealityAdventureLifecycleReconciliationMutationEnabled()
  ) {
    return failedResolution("SAFE_WITHHELD", "MUTATION_PAUSED");
  }
  const result = await executeXinmaiLivedGrowthTransaction(
    Object.freeze({
      commandReferenceId: createStableXinmaiGrowthReference(
        "growth-command:resolve-choice-return-without-fact",
        input.admission.returnReceipt.returnReceiptReferenceId,
        input.resolution,
      ),
      commandType: "RESOLVE_CHOICE_RETURN_WITHOUT_FACT" as const,
      identityReferences: input.admission.intention.identityReferences,
      issuedAt: new Date().toISOString(),
    }),
    (current) => {
      const intention = current.choiceActionIntentions.find(
        (candidate) => candidate.choiceActionIntentionReferenceId === input.admission.intention.choiceActionIntentionReferenceId,
      );
      const departure = current.choiceExplicitDepartureReceipts.find(
        (candidate) => candidate.departureReceiptReferenceId === input.admission.departureReceipt.departureReceiptReferenceId,
      );
      const receipt = current.choiceExplicitReturnReceipts.find(
        (candidate) => candidate.returnReceiptReferenceId === input.admission.returnReceipt.returnReceiptReferenceId,
      );
      if (!intention) return rejectXinmaiLivedGrowthTransaction("INTENTION_NOT_FOUND");
      if (!departure) return rejectXinmaiLivedGrowthTransaction("DEPARTURE_RECEIPT_NOT_FOUND");
      if (!receipt) return rejectXinmaiLivedGrowthTransaction("RETURN_RECEIPT_NOT_READY");
      if (receipt.state === "RESOLVED_WITHOUT_FACT" && receipt.noFactReason === input.resolution) {
        return preserveXinmaiLivedGrowthTransaction(
          Object.freeze({ intention, departureReceipt: departure, returnReceipt: receipt }),
        );
      }
      if (
        receipt.state !== "READY_FOR_LIVED_RESPONSE" ||
        receipt.consumedLivedResponseReferenceId !== null ||
        departure.state !== "RETURN_IN_PROGRESS" ||
        intention.targetEncounterCycleId !== receipt.targetEncounterCycleId ||
        current.livedResponseFacts.some((fact) => fact.choiceActionIntentionReferenceId === intention.choiceActionIntentionReferenceId && fact.state === "CONFIRMED")
      ) {
        return rejectXinmaiLivedGrowthTransaction("RETURN_RECEIPT_NOT_READY");
      }
      const now = new Date().toISOString();
      const dormantIntention: ChoiceActionIntention = Object.freeze({
        ...intention,
        targetEncounterCycleId: null,
        state: "COMMITTED" as const,
        revision: intention.revision + 1,
        updatedAt: now,
      });
      const dormantDeparture: XinmaiChoiceExplicitDepartureReceipt = Object.freeze({
        ...departure,
        state: "DORMANT_DEPARTURE" as const,
        revision: departure.revision + 1,
        updatedAt: now,
      });
      const resolvedReceipt: XinmaiChoiceExplicitReturnReceipt = Object.freeze({
        ...receipt,
        state: "RESOLVED_WITHOUT_FACT" as const,
        noFactReason: input.resolution,
        revision: receipt.revision + 1,
        updatedAt: now,
      });
      return commitXinmaiLivedGrowthTransaction(
        {
          ...current,
          choiceActionIntentions: Object.freeze(current.choiceActionIntentions.map((candidate) => candidate.choiceActionIntentionReferenceId === dormantIntention.choiceActionIntentionReferenceId ? dormantIntention : candidate)),
          choiceExplicitDepartureReceipts: Object.freeze(current.choiceExplicitDepartureReceipts.map((candidate) => candidate.departureReceiptReferenceId === dormantDeparture.departureReceiptReferenceId ? dormantDeparture : candidate)),
          choiceExplicitReturnReceipts: Object.freeze(current.choiceExplicitReturnReceipts.map((candidate) => candidate.returnReceiptReferenceId === resolvedReceipt.returnReceiptReferenceId ? resolvedReceipt : candidate)),
        },
        Object.freeze({ intention: dormantIntention, departureReceipt: dormantDeparture, returnReceipt: resolvedReceipt }),
      );
    },
  );
  if (result.status !== "COMMITTED" && result.status !== "ALREADY_COMMITTED") {
    return failedResolution(result.status, result.reason);
  }
  const proof = result.value.returnReceipt.realityProof;
  const terminated = await terminateRealityEncounter({
    intentReferenceId: proof.realityIntentReferenceId,
    encounterCycleId: proof.targetEncounterCycleId,
    expectedIntentRevision: proof.realityIntentRevision,
    identityReferences: proof.identityReferences,
    terminalReason:
      input.resolution === "USER_REJECTED_RECORD"
        ? "USER_DECLINED_RECORD"
        : "RETURN_WITHOUT_LIVED_RESPONSE",
  });
  return Object.freeze({
    status: result.status === "COMMITTED" ? "RESOLVED" as const : "ALREADY_RESOLVED" as const,
    intention: result.value.intention,
    departureReceipt: result.value.departureReceipt,
    returnReceipt: result.value.returnReceipt,
    intentTermination: terminated.status === "TERMINATED" ? "TERMINATED" as const : "RETRYABLE" as const,
  });
}

const safeAdmission = (
  reason: Extract<XinmaiChoiceReturningProvenanceAdmission, { state: "SAFE_WITHHELD" }>["reason"],
  intention: ChoiceActionIntention | null = null,
): XinmaiChoiceReturningProvenanceAdmission =>
  Object.freeze({
    state: "SAFE_WITHHELD" as const,
    intention,
    departureReceipt: null,
    returnReceipt: null,
    currentFact: null,
    currentEligibility: null,
    formationReceipt: null,
    reason,
  });

export async function readXinmaiChoiceReturningProvenanceAdmissions(
  identityReferences: RealityEncounterIdentityReferences,
): Promise<readonly XinmaiChoiceReturningProvenanceAdmission[]> {
  const recovered = await readXinmaiLivedGrowthCanonicalState();
  if (recovered.status !== "FOUND") {
    return Object.freeze([
      safeAdmission(recovered.reason === "RECOVERY_CORRUPTED" ? "RECOVERY_CORRUPTED" : "RECOVERY_UNAVAILABLE"),
    ]);
  }
  const intentions = recovered.envelope.choiceActionIntentions
    .filter((intention) => xinmaiGrowthIdentityMatches(intention.identityReferences, identityReferences) && (intention.state === "COMMITTED" || intention.state === "AWAITING_RETURN" || intention.state === "REPORTED"))
    .sort((left, right) => Date.parse(right.updatedAt) - Date.parse(left.updatedAt));
  const admissions: XinmaiChoiceReturningProvenanceAdmission[] = [];
  for (const intention of intentions) {
    const departures = recovered.envelope.choiceExplicitDepartureReceipts.filter((receipt) => receipt.choiceActionIntentionReferenceId === intention.choiceActionIntentionReferenceId);
    const returns = recovered.envelope.choiceExplicitReturnReceipts.filter((receipt) => receipt.choiceActionIntentionReferenceId === intention.choiceActionIntentionReferenceId);
    const activeReturns = returns.filter((receipt) => receipt.state === "READY_FOR_LIVED_RESPONSE");
    const facts = recovered.envelope.livedResponseFacts.filter((fact) => fact.choiceActionIntentionReferenceId === intention.choiceActionIntentionReferenceId && fact.state === "CONFIRMED").sort((left, right) => right.userConfirmationRevision - left.userConfirmationRevision);
    const currentFact = facts[0] ?? null;
    const currentEligibility = currentFact === null ? null : recovered.envelope.crystalEligibilities.find((eligibility) => eligibility.livedResponseReferenceId === currentFact.livedResponseReferenceId && eligibility.livedResponseRevision === currentFact.userConfirmationRevision && eligibility.state !== "INVALIDATED") ?? null;
    const formationReceipt = recovered.envelope.formationReceipts.find((receipt) => receipt.choiceActionIntentionReferenceId === intention.choiceActionIntentionReferenceId) ?? null;
    if (departures.length > 1 || activeReturns.length > 1 || facts.length > 1) {
      admissions.push(safeAdmission("PROVENANCE_NOT_UNIQUE", intention));
      continue;
    }
    const departureReceipt = departures[0] ?? null;
    const returnReceipt = activeReturns[0] ?? returns.sort((left, right) => right.returnAttemptRevision - left.returnAttemptRevision)[0] ?? null;
    let realityProofState: "NOT_REQUIRED" | "CURRENT" | "UNAVAILABLE" | "MISMATCH" = "NOT_REQUIRED";
    let departureReconciliationState:
      | "NOT_REQUIRED"
      | "CURRENT"
      | "PENDING"
      | "UNAVAILABLE"
      | "MISMATCH" = "NOT_REQUIRED";
    let targetTerminationState:
      | "NOT_REQUIRED"
      | "ACTIVE"
      | "TERMINAL"
      | "UNAVAILABLE"
      | "MISMATCH" = "NOT_REQUIRED";
    if (departureReceipt !== null && currentFact === null) {
      const departureProof = createXinmaiChoiceDepartureReconciliationProof({
        intention,
        departureReceipt,
        observedGrowthEnvelopeRevision: recovered.envelope.revision,
      });
      if (departureProof.status !== "READY") {
        departureReconciliationState = "MISMATCH";
      } else {
        const reconciliation = await readXinmaiChoiceDepartureReconciliation({
          proof: departureProof.proof,
        });
        departureReconciliationState =
          reconciliation.status === "CURRENT"
            ? "CURRENT"
            : reconciliation.status === "PENDING"
              ? "PENDING"
              : reconciliation.reason === "RECOVERY_UNAVAILABLE"
                ? "UNAVAILABLE"
                : "MISMATCH";
      }
    }
    if (departureReceipt !== null && activeReturns[0] !== undefined && currentFact === null) {
      const candidate = activeReturns[0];
      const proof = await readXinmaiChoiceReturningRealityProof({
        intention,
        departureReceipt,
        targetEncounterCycleId: candidate.targetEncounterCycleId,
        returnIntentRequestReferenceId: candidate.returnIntentRequestReferenceId,
        returnAttemptRevision: candidate.returnAttemptRevision,
      });
      realityProofState = proof.status !== "READY" ? (proof.reason === "REALITY_PROOF_UNAVAILABLE" ? "UNAVAILABLE" : "MISMATCH") : (proof.proof.canonicalRevision < candidate.realityProof.canonicalRevision || proof.proof.fencingToken < candidate.realityProof.fencingToken ? "MISMATCH" : "CURRENT");
    }
    if (
      departureReceipt !== null &&
      returnReceipt?.state === "RESOLVED_WITHOUT_FACT" &&
      currentFact === null
    ) {
      const targetLifecycle = await readXinmaiChoiceReturnTargetLifecycle({
        intention,
        departureReceipt,
        returnReceipt,
      });
      targetTerminationState =
        targetLifecycle.status === "ACTIVE"
          ? "ACTIVE"
          : targetLifecycle.status === "TERMINAL"
            ? "TERMINAL"
            : targetLifecycle.reason === "REALITY_PROOF_UNAVAILABLE"
              ? "UNAVAILABLE"
              : "MISMATCH";
    }
    admissions.push(resolveXinmaiChoiceReturningProvenanceAdmission({ intention, departureReceipt, returnReceipt, currentFact, currentEligibility, formationReceipt, realityProofState, departureReconciliationState, targetTerminationState }));
  }
  return Object.freeze(admissions);
}

export const XinmaiChoiceReturningProvenanceController = Object.freeze({
  confirmDeparture: confirmXinmaiChoiceExplicitDeparture,
  confirmReturn: confirmXinmaiChoiceExplicitReturn,
  resolveWithoutFact: resolveXinmaiChoiceReturnWithoutFact,
  readAdmissions: readXinmaiChoiceReturningProvenanceAdmissions,
  growthMutationOwner: "XINMAI_LIVED_GROWTH_TRANSACTION_AUTHORITY" as const,
  crossStoreAtomicityClaim: false as const,
  noBackfill: true as const,
});
