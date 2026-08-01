import {
  XINMAI_LIVED_RESPONSE_FACT_SCHEMA_VERSION,
  type LivedResponseCandidate,
  type LivedResponseFact,
} from "../types/xinmaiLivedResponse";
import type { RealityEncounterIdentityReferences } from "../types/xinmaiRealityEncounterIntent";
import { readXinmaiLivedGrowthCanonicalState } from "./xinmaiLivedGrowthTransactionalStore";
import {
  readXinmaiChoiceReturningRealityProof,
  validateXinmaiChoiceReturningRealityProof,
} from "./xinmaiChoiceReturningRealityProofAdapter";
import { isXinmaiChoiceReturningProvenanceMutationEnabled } from "./xinmaiChoiceReturningProvenanceMutationPolicy";
import {
  commitXinmaiLivedGrowthTransaction,
  preserveXinmaiLivedGrowthTransaction,
  rejectXinmaiLivedGrowthTransaction,
} from "../types/xinmaiLivedGrowthTransaction";
import { xinmaiGrowthIdentityMatches } from "./xinmaiLivedGrowthIdentity";
import { createStableXinmaiGrowthReference } from "./xinmaiLivedGrowthReference";
import { executeXinmaiLivedGrowthTransaction } from "./xinmaiLivedGrowthTransactionAuthority";

type LivedResponseFailureReason =
  | "CANDIDATE_NOT_CONFIRMABLE"
  | "INTENTION_NOT_FOUND"
  | "PROVENANCE_MISMATCH"
  | "IDENTITY_MISMATCH"
  | "STALE_INTENTION_REVISION"
  | "STALE_FACT_REVISION"
  | "FACT_NOT_CURRENT"
  | "FORMATION_ALREADY_CONFIRMED"
  | "LINEAGE_CLOSED"
  | "PERSISTENCE_UNAVAILABLE";

export type ConfirmLivedResponseFactResult =
  | Readonly<{
      status: "CONFIRMED";
      fact: LivedResponseFact;
    }>
  | Readonly<{
      status: "ALREADY_CONFIRMED";
      fact: LivedResponseFact;
    }>
  | Readonly<{
      status: "REJECTED" | "SAFE_WITHHELD";
      fact: null;
      reason: LivedResponseFailureReason | string;
    }>;

export type RevokeLivedResponseFactResult =
  | Readonly<{
      status: "REVOKED";
      fact: LivedResponseFact;
    }>
  | Readonly<{
      status: "ALREADY_REVOKED";
      fact: LivedResponseFact;
    }>
  | Readonly<{
      status: "REJECTED" | "SAFE_WITHHELD";
      fact: null;
      reason: LivedResponseFailureReason | string;
    }>;

export async function confirmLivedResponseFact(
  input: Readonly<{
    candidate: LivedResponseCandidate;
    intentionReferenceId: string;
    expectedIntentionRevision: number;
    expectedCurrentFactRevision: number;
    returnReceiptReferenceId: string;
    identityReferences: RealityEncounterIdentityReferences;
  }>,
): Promise<ConfirmLivedResponseFactResult> {
  if (!isXinmaiChoiceReturningProvenanceMutationEnabled()) {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      fact: null,
      reason: "MUTATION_PAUSED" as const,
    });
  }
  if (
    input.candidate.source !== "xinmai_lived_response_return_surface" ||
    input.candidate.state !== "AWAITING_USER_CONFIRMATION" ||
    input.candidate.choiceActionIntentionReferenceId !==
      input.intentionReferenceId ||
    input.candidate.responseOutcome === "NOT_ATTEMPTED" ||
    input.candidate.responseOutcome === "UNABLE_TO_CONTINUE"
  ) {
    return Object.freeze({
      status: "REJECTED" as const,
      fact: null,
      reason: "CANDIDATE_NOT_CONFIRMABLE" as const,
    });
  }
  const recovered = await readXinmaiLivedGrowthCanonicalState();
  if (recovered.status !== "FOUND") {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      fact: null,
      reason: recovered.reason,
    });
  }
  const recoveredIntention = recovered.envelope.choiceActionIntentions.find(
    (candidate) =>
      candidate.choiceActionIntentionReferenceId === input.intentionReferenceId,
  );
  const recoveredReturn = recovered.envelope.choiceExplicitReturnReceipts.find(
    (candidate) =>
      candidate.returnReceiptReferenceId === input.returnReceiptReferenceId,
  );
  const recoveredDeparture = recoveredReturn
    ? recovered.envelope.choiceExplicitDepartureReceipts.find(
        (candidate) =>
          candidate.departureReceiptReferenceId ===
          recoveredReturn.departureReceiptReferenceId,
      ) ?? null
    : null;
  if (!recoveredIntention || !recoveredReturn || !recoveredDeparture) {
    return Object.freeze({
      status: "REJECTED" as const,
      fact: null,
      reason: "PROVENANCE_MISMATCH" as const,
    });
  }
  const proofResult = await readXinmaiChoiceReturningRealityProof({
    intention: recoveredIntention,
    departureReceipt: recoveredDeparture,
    targetEncounterCycleId: recoveredReturn.targetEncounterCycleId,
    returnIntentRequestReferenceId:
      recoveredReturn.returnIntentRequestReferenceId,
    returnAttemptRevision: recoveredReturn.returnAttemptRevision,
  });
  if (proofResult.status !== "READY") {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      fact: null,
      reason: proofResult.reason,
    });
  }
  const result = await executeXinmaiLivedGrowthTransaction(
    Object.freeze({
      commandReferenceId: createStableXinmaiGrowthReference(
        "growth-command:confirm-lived-response",
        input.intentionReferenceId,
        input.candidate.candidateReferenceId,
        String(input.candidate.candidateRevision),
      ),
      commandType: "CONFIRM_LIVED_RESPONSE" as const,
      identityReferences: input.identityReferences,
      issuedAt: new Date().toISOString(),
    }),
    (current) => {
      const intention = current.choiceActionIntentions.find(
        (candidate) =>
          candidate.choiceActionIntentionReferenceId ===
          input.intentionReferenceId,
      );
      if (!intention) {
        return rejectXinmaiLivedGrowthTransaction("INTENTION_NOT_FOUND");
      }
      const returnReceipt = current.choiceExplicitReturnReceipts.find(
        (candidate) =>
          candidate.returnReceiptReferenceId ===
          input.returnReceiptReferenceId,
      );
      const departureReceipt = returnReceipt
        ? current.choiceExplicitDepartureReceipts.find(
            (candidate) =>
              candidate.departureReceiptReferenceId ===
              returnReceipt.departureReceiptReferenceId,
          ) ?? null
        : null;
      if (!returnReceipt || !departureReceipt) {
        return rejectXinmaiLivedGrowthTransaction("PROVENANCE_MISMATCH");
      }
      if (
        !xinmaiGrowthIdentityMatches(
          intention.identityReferences,
          input.identityReferences,
        )
      ) {
        return rejectXinmaiLivedGrowthTransaction("IDENTITY_MISMATCH");
      }
      const receipts = current.formationReceipts.filter(
        (receipt) =>
          receipt.choiceActionIntentionReferenceId ===
          input.intentionReferenceId,
      );
      if (receipts.length > 0) {
        return rejectXinmaiLivedGrowthTransaction(
          "FORMATION_ALREADY_CONFIRMED",
        );
      }
      const currentFacts = current.livedResponseFacts
        .filter(
          (fact) =>
            fact.choiceActionIntentionReferenceId ===
              input.intentionReferenceId &&
            fact.state === "CONFIRMED",
        )
        .sort(
          (left, right) =>
            right.userConfirmationRevision -
            left.userConfirmationRevision,
        );
      const currentFact = currentFacts[0] ?? null;
      const exactRetry = currentFacts.find(
        (fact) =>
          fact.provenance.candidateReferenceId ===
          input.candidate.candidateReferenceId,
      );
      if (exactRetry) {
        return returnReceipt.state === "CONSUMED_BY_FACT" &&
          returnReceipt.consumedLivedResponseReferenceId ===
            exactRetry.livedResponseReferenceId
          ? preserveXinmaiLivedGrowthTransaction(exactRetry)
          : rejectXinmaiLivedGrowthTransaction("PROVENANCE_MISMATCH");
      }
      if (intention.revision !== input.expectedIntentionRevision) {
        return rejectXinmaiLivedGrowthTransaction(
          "STALE_INTENTION_REVISION",
        );
      }
      if (
        (currentFact?.userConfirmationRevision ?? 0) !==
        input.expectedCurrentFactRevision
      ) {
        return rejectXinmaiLivedGrowthTransaction("STALE_FACT_REVISION");
      }
      if (
        intention.targetEncounterCycleId === null ||
        intention.state !== "COMMITTED" ||
        returnReceipt.state !== "READY_FOR_LIVED_RESPONSE" ||
        returnReceipt.consumedLivedResponseReferenceId !== null ||
        departureReceipt.state !== "RETURN_IN_PROGRESS" ||
        intention.targetEncounterCycleId !==
          returnReceipt.targetEncounterCycleId ||
        !validateXinmaiChoiceReturningRealityProof(
          proofResult.proof,
          intention,
          departureReceipt,
        ) ||
        proofResult.proof.canonicalRevision <
          returnReceipt.realityProof.canonicalRevision ||
        proofResult.proof.fencingToken <
          returnReceipt.realityProof.fencingToken
      ) {
        return rejectXinmaiLivedGrowthTransaction("PROVENANCE_MISMATCH");
      }
      if (
        current.crystalEligibilities.some(
          (eligibility) =>
            eligibility.choiceActionIntentionReferenceId ===
              input.intentionReferenceId &&
            (eligibility.state === "FORMATION_PENDING" ||
              eligibility.state === "CONSUMED"),
        )
      ) {
        return rejectXinmaiLivedGrowthTransaction(
          "FORMATION_ALREADY_CONFIRMED",
        );
      }
      const revision = (currentFact?.userConfirmationRevision ?? 0) + 1;
      const now = new Date().toISOString();
      const fact: LivedResponseFact = Object.freeze({
        schemaVersion: XINMAI_LIVED_RESPONSE_FACT_SCHEMA_VERSION,
        source: "xinmai_lived_response_authority_controller" as const,
        livedResponseReferenceId: createStableXinmaiGrowthReference(
          "lived-response",
          input.intentionReferenceId,
          String(revision),
        ),
        choiceActionIntentionReferenceId: input.intentionReferenceId,
        identityReferences: intention.identityReferences,
        sourceEncounterCycleId: intention.sourceEncounterCycleId,
        targetEncounterCycleId: intention.targetEncounterCycleId,
        gravityCycleId: intention.gravityCycleId,
        gravityObservationReferenceId:
          intention.gravityObservationReferenceId,
        responseOutcome: input.candidate.responseOutcome,
        factualSummary: input.candidate.factualSummary.trim() || null,
        state: "CONFIRMED" as const,
        userConfirmationRevision: revision,
        occurredAt: now,
        confirmedAt: now,
        updatedAt: now,
        provenance: Object.freeze({
          confirmationAuthority: "USER_EXPLICIT_CONFIRMATION" as const,
          candidateReferenceId: input.candidate.candidateReferenceId,
          noAiConfirmation: true as const,
          noObjectiveRealityClaim: true as const,
        }),
      });
      const consumedReturnReceipt = Object.freeze({
        ...returnReceipt,
        state: "CONSUMED_BY_FACT" as const,
        consumedLivedResponseReferenceId: fact.livedResponseReferenceId,
        revision: returnReceipt.revision + 1,
        updatedAt: now,
      });
      const returnedDepartureReceipt = Object.freeze({
        ...departureReceipt,
        state: "RETURNED" as const,
        revision: departureReceipt.revision + 1,
        updatedAt: now,
      });
      return commitXinmaiLivedGrowthTransaction(
        {
          ...current,
          choiceActionIntentions: Object.freeze(
            current.choiceActionIntentions.map((candidate) =>
              candidate.choiceActionIntentionReferenceId ===
              input.intentionReferenceId
                ? Object.freeze({
                    ...candidate,
                    state: "REPORTED" as const,
                    revision: candidate.revision + 1,
                    updatedAt: now,
                  })
                : candidate,
            ),
          ),
          livedResponseFacts: Object.freeze([
            ...current.livedResponseFacts.map((candidate) =>
              candidate.choiceActionIntentionReferenceId ===
                input.intentionReferenceId &&
              candidate.state === "CONFIRMED"
                ? Object.freeze({
                    ...candidate,
                    state: "SUPERSEDED" as const,
                    updatedAt: now,
                  })
                : candidate,
            ),
            fact,
          ]),
          choiceExplicitDepartureReceipts: Object.freeze(
            current.choiceExplicitDepartureReceipts.map((candidate) =>
              candidate.departureReceiptReferenceId ===
              returnedDepartureReceipt.departureReceiptReferenceId
                ? returnedDepartureReceipt
                : candidate,
            ),
          ),
          choiceExplicitReturnReceipts: Object.freeze(
            current.choiceExplicitReturnReceipts.map((candidate) =>
              candidate.returnReceiptReferenceId ===
              consumedReturnReceipt.returnReceiptReferenceId
                ? consumedReturnReceipt
                : candidate,
            ),
          ),
          crystalEligibilities: Object.freeze(
            current.crystalEligibilities.map((eligibility) =>
              eligibility.choiceActionIntentionReferenceId ===
                input.intentionReferenceId &&
              eligibility.state !== "CONSUMED"
                ? Object.freeze({
                    ...eligibility,
                    state: "INVALIDATED" as const,
                    updatedAt: now,
                  })
                : eligibility,
            ),
          ),
        },
        fact,
      );
    },
  );
  if (
    result.status === "COMMITTED" ||
    result.status === "ALREADY_COMMITTED"
  ) {
    return Object.freeze({
      status:
        result.status === "COMMITTED"
          ? "CONFIRMED" as const
          : "ALREADY_CONFIRMED" as const,
      fact: result.value,
    });
  }
  return Object.freeze({
    status: result.status,
    fact: null,
    reason: result.reason,
  });
}

export async function revokeLivedResponseFact(
  input: Readonly<{
    livedResponseReferenceId: string;
    expectedUserConfirmationRevision: number;
    identityReferences: RealityEncounterIdentityReferences;
  }>,
): Promise<RevokeLivedResponseFactResult> {
  if (!isXinmaiChoiceReturningProvenanceMutationEnabled()) {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      fact: null,
      reason: "MUTATION_PAUSED" as const,
    });
  }
  const result = await executeXinmaiLivedGrowthTransaction(
    Object.freeze({
      commandReferenceId: createStableXinmaiGrowthReference(
        "growth-command:revoke-lived-response",
        input.livedResponseReferenceId,
        String(input.expectedUserConfirmationRevision),
      ),
      commandType: "REVOKE_LIVED_RESPONSE" as const,
      identityReferences: input.identityReferences,
      issuedAt: new Date().toISOString(),
    }),
    (current) => {
      const fact = current.livedResponseFacts.find(
        (candidate) =>
          candidate.livedResponseReferenceId ===
          input.livedResponseReferenceId,
      );
      if (!fact) {
        return rejectXinmaiLivedGrowthTransaction("FACT_NOT_CURRENT");
      }
      if (
        !xinmaiGrowthIdentityMatches(
          fact.identityReferences,
          input.identityReferences,
        )
      ) {
        return rejectXinmaiLivedGrowthTransaction("IDENTITY_MISMATCH");
      }
      const lineageReceipts = current.formationReceipts.filter(
        (receipt) =>
          receipt.choiceActionIntentionReferenceId ===
          fact.choiceActionIntentionReferenceId,
      );
      if (lineageReceipts.length > 0) {
        return rejectXinmaiLivedGrowthTransaction(
          "FORMATION_ALREADY_CONFIRMED",
        );
      }
      if (fact.state === "REVOKED") {
        return preserveXinmaiLivedGrowthTransaction(fact);
      }
      if (
        fact.state !== "CONFIRMED" ||
        fact.userConfirmationRevision !==
          input.expectedUserConfirmationRevision
      ) {
        return rejectXinmaiLivedGrowthTransaction("FACT_NOT_CURRENT");
      }
      if (
        current.crystalEligibilities.some(
          (eligibility) =>
            eligibility.livedResponseReferenceId ===
              fact.livedResponseReferenceId &&
            (eligibility.state === "FORMATION_PENDING" ||
              eligibility.state === "CONSUMED"),
        )
      ) {
        return rejectXinmaiLivedGrowthTransaction(
          "FORMATION_ALREADY_CONFIRMED",
        );
      }
      const now = new Date().toISOString();
      const revoked: LivedResponseFact = Object.freeze({
        ...fact,
        state: "REVOKED" as const,
        updatedAt: now,
      });
      return commitXinmaiLivedGrowthTransaction(
        {
          ...current,
          choiceActionIntentions: Object.freeze(
            current.choiceActionIntentions.map((intention) =>
              intention.choiceActionIntentionReferenceId ===
              fact.choiceActionIntentionReferenceId
                ? Object.freeze({
                    ...intention,
                    state: "CLOSED" as const,
                    revision: intention.revision + 1,
                    updatedAt: now,
                  })
                : intention,
            ),
          ),
          livedResponseFacts: Object.freeze(
            current.livedResponseFacts.map((candidate) =>
              candidate.livedResponseReferenceId ===
              fact.livedResponseReferenceId
                ? revoked
                : candidate,
            ),
          ),
          crystalEligibilities: Object.freeze(
            current.crystalEligibilities.map((eligibility) =>
              eligibility.livedResponseReferenceId ===
                fact.livedResponseReferenceId &&
              eligibility.state !== "CONSUMED"
                ? Object.freeze({
                    ...eligibility,
                    state: "INVALIDATED" as const,
                    withheldReason: "FACT_NOT_CONFIRMED" as const,
                    updatedAt: now,
                  })
                : eligibility,
            ),
          ),
        },
        revoked,
      );
    },
  );
  if (
    result.status === "COMMITTED" ||
    result.status === "ALREADY_COMMITTED"
  ) {
    return Object.freeze({
      status:
        result.status === "COMMITTED"
          ? "REVOKED" as const
          : "ALREADY_REVOKED" as const,
      fact: result.value,
    });
  }
  return Object.freeze({
    status: result.status,
    fact: null,
    reason: result.reason,
  });
}
