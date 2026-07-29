import {
  XINMAI_LIVED_RESPONSE_FACT_SCHEMA_VERSION,
  type LivedResponseCandidate,
  type LivedResponseFact,
} from "../types/xinmaiLivedResponse";
import type { RealityEncounterIdentityReferences } from "../types/xinmaiRealityEncounterIntent";
import {
  readXinmaiLivedGrowthRecoveryCandidate,
  transactXinmaiLivedGrowthRecovery,
} from "./xinmaiLivedGrowthRecoveryPersistenceAdapter";
import { xinmaiGrowthIdentityMatches } from "./xinmaiChoiceActionIntentionController";
import { createStableXinmaiGrowthReference } from "./xinmaiLivedGrowthReference";

export function confirmLivedResponseFact(input: Readonly<{
  candidate: LivedResponseCandidate;
  intentionReferenceId: string;
}>):
  | Readonly<{ status: "CONFIRMED"; fact: LivedResponseFact }>
  | Readonly<{
      status: "REJECTED";
      fact: null;
      reason:
        | "CANDIDATE_NOT_CONFIRMABLE"
        | "INTENTION_NOT_FOUND"
        | "PROVENANCE_MISMATCH"
        | "PERSISTENCE_UNAVAILABLE";
    }> {
  if (
    input.candidate.source !== "xinmai_lived_response_return_surface" ||
    input.candidate.state !== "AWAITING_USER_CONFIRMATION" ||
    input.candidate.choiceActionIntentionReferenceId !==
      input.intentionReferenceId
  ) {
    return Object.freeze({
      status: "REJECTED" as const,
      fact: null,
      reason: "CANDIDATE_NOT_CONFIRMABLE" as const,
    });
  }
  const recovery = readXinmaiLivedGrowthRecoveryCandidate();
  const intention =
    recovery.status === "FOUND"
      ? recovery.envelope.choiceActionIntentions.find(
          (candidate) =>
            candidate.choiceActionIntentionReferenceId ===
            input.intentionReferenceId,
        )
      : null;
  if (!intention) {
    return Object.freeze({
      status: "REJECTED" as const,
      fact: null,
      reason: "INTENTION_NOT_FOUND" as const,
    });
  }
  if (
    intention.targetEncounterCycleId === null ||
    (intention.state !== "AWAITING_RETURN" &&
      intention.state !== "REPORTED")
  ) {
    return Object.freeze({
      status: "REJECTED" as const,
      fact: null,
      reason: "PROVENANCE_MISMATCH" as const,
    });
  }
  const revision =
    Math.max(
      0,
      ...(recovery.status === "FOUND"
        ? recovery.envelope.livedResponseFacts
            .filter(
              (fact) =>
                fact.choiceActionIntentionReferenceId ===
                input.intentionReferenceId,
            )
            .map((fact) => fact.userConfirmationRevision)
        : []),
    ) + 1;
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
    gravityObservationReferenceId: intention.gravityObservationReferenceId,
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
  const result = transactXinmaiLivedGrowthRecovery((current) => ({
    ...current,
    choiceActionIntentions: Object.freeze(
      current.choiceActionIntentions.map((candidate) =>
        candidate.choiceActionIntentionReferenceId === input.intentionReferenceId
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
          input.intentionReferenceId && candidate.state === "CONFIRMED"
          ? Object.freeze({
              ...candidate,
              state: "SUPERSEDED" as const,
              updatedAt: now,
            })
          : candidate,
      ),
      fact,
    ]),
    crystalEligibilities: Object.freeze(
      current.crystalEligibilities.map((eligibility) =>
        eligibility.choiceActionIntentionReferenceId ===
          input.intentionReferenceId && eligibility.state !== "CONSUMED"
          ? Object.freeze({
              ...eligibility,
              state: "INVALIDATED" as const,
              updatedAt: now,
            })
          : eligibility,
      ),
    ),
  }));
  return result.status === "CONFIRMED"
    ? Object.freeze({ status: "CONFIRMED" as const, fact })
    : Object.freeze({
        status: "REJECTED" as const,
        fact: null,
        reason: "PERSISTENCE_UNAVAILABLE" as const,
      });
}

export function revokeLivedResponseFact(input: Readonly<{
  livedResponseReferenceId: string;
  expectedUserConfirmationRevision: number;
  identityReferences: RealityEncounterIdentityReferences;
}>):
  | Readonly<{ status: "REVOKED"; fact: LivedResponseFact }>
  | Readonly<{
      status: "REJECTED";
      fact: null;
      reason:
        | "FACT_NOT_CURRENT"
        | "IDENTITY_MISMATCH"
        | "FORMATION_ALREADY_CONFIRMED"
        | "PERSISTENCE_UNAVAILABLE";
    }> {
  const recovery = readXinmaiLivedGrowthRecoveryCandidate();
  if (recovery.status !== "FOUND") {
    return Object.freeze({
      status: "REJECTED" as const,
      fact: null,
      reason: "PERSISTENCE_UNAVAILABLE" as const,
    });
  }
  const currentFact = recovery.envelope.livedResponseFacts.find(
    (fact) =>
      fact.livedResponseReferenceId === input.livedResponseReferenceId &&
      fact.userConfirmationRevision ===
        input.expectedUserConfirmationRevision &&
      fact.state === "CONFIRMED",
  );
  if (!currentFact) {
    return Object.freeze({
      status: "REJECTED" as const,
      fact: null,
      reason: "FACT_NOT_CURRENT" as const,
    });
  }
  if (
    !xinmaiGrowthIdentityMatches(
      currentFact.identityReferences,
      input.identityReferences,
    )
  ) {
    return Object.freeze({
      status: "REJECTED" as const,
      fact: null,
      reason: "IDENTITY_MISMATCH" as const,
    });
  }
  if (
    recovery.envelope.formationReceipts.some(
      (receipt) =>
        receipt.livedResponseReferenceId ===
        currentFact.livedResponseReferenceId,
    )
  ) {
    return Object.freeze({
      status: "REJECTED" as const,
      fact: null,
      reason: "FORMATION_ALREADY_CONFIRMED" as const,
    });
  }

  const now = new Date().toISOString();
  let revokedFact: LivedResponseFact | null = null;
  const result = transactXinmaiLivedGrowthRecovery((current) => {
    const formationAlreadyConfirmed = current.formationReceipts.some(
      (receipt) =>
        receipt.livedResponseReferenceId ===
        currentFact.livedResponseReferenceId,
    );
    if (formationAlreadyConfirmed) return current;
    const facts = current.livedResponseFacts.map((fact) => {
      if (
        fact.livedResponseReferenceId !==
          currentFact.livedResponseReferenceId ||
        fact.userConfirmationRevision !==
          currentFact.userConfirmationRevision ||
        fact.state !== "CONFIRMED" ||
        !xinmaiGrowthIdentityMatches(
          fact.identityReferences,
          input.identityReferences,
        )
      ) {
        return fact;
      }
      revokedFact = Object.freeze({
        ...fact,
        state: "REVOKED" as const,
        updatedAt: now,
      });
      return revokedFact;
    });
    if (revokedFact === null) return current;
    return {
      ...current,
      choiceActionIntentions: Object.freeze(
        current.choiceActionIntentions.map((intention) =>
          intention.choiceActionIntentionReferenceId ===
          currentFact.choiceActionIntentionReferenceId
            ? Object.freeze({
                ...intention,
                state: "CLOSED" as const,
                revision: intention.revision + 1,
                updatedAt: now,
              })
            : intention,
        ),
      ),
      livedResponseFacts: Object.freeze(facts),
      crystalEligibilities: Object.freeze(
        current.crystalEligibilities.map((eligibility) =>
          eligibility.livedResponseReferenceId ===
            currentFact.livedResponseReferenceId &&
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
    };
  });
  if (result.status === "CONFIRMED" && revokedFact !== null) {
    return Object.freeze({
      status: "REVOKED" as const,
      fact: revokedFact,
    });
  }
  return Object.freeze({
    status: "REJECTED" as const,
    fact: null,
    reason:
      result.status === "CONFIRMED"
        ? "FORMATION_ALREADY_CONFIRMED" as const
        : "PERSISTENCE_UNAVAILABLE" as const,
  });
}
