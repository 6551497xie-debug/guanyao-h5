import type { RealityEncounterIdentityReferences } from "../types/xinmaiRealityEncounterIntent";
import type {
  XinmaiCompletedReturnProofFailureReason,
  XinmaiCompletedReturnProofReadResult,
  XinmaiPostOwnershipNextRealityCycleCommand,
} from "../types/xinmaiPostOwnershipNextRealityCycle";
import { projectXinmaiCanonicalBodyImprints } from "./xinmaiCanonicalBodyImprintProjector";
import { readXinmaiLivedGrowthCanonicalState } from "./xinmaiLivedGrowthTransactionalStore";
import { createStableXinmaiGrowthReference } from "./xinmaiLivedGrowthReference";

const sameIdentity = (
  left: RealityEncounterIdentityReferences,
  right: RealityEncounterIdentityReferences,
): boolean =>
  left.sourceReferenceId === right.sourceReferenceId &&
  left.starBeastIdentityReferenceId ===
    right.starBeastIdentityReferenceId &&
  left.mansionCoordinateReferenceId ===
    right.mansionCoordinateReferenceId;

const validCommand = (
  command: XinmaiPostOwnershipNextRealityCycleCommand,
): boolean =>
  Object.values(command.identityReferences).every(
    (value) => value.trim().length > 0,
  ) &&
  command.choiceActionIntentionReferenceId.trim().length > 0 &&
  command.formationReferenceId.trim().length > 0;

const retryableRecoveryCause = new Set([
  "TRANSACTION_STORAGE_UNAVAILABLE",
  "TRANSACTION_OPEN_BLOCKED",
  "TRANSACTION_ABORTED",
  "TRANSACTION_CONNECTION_CLOSED",
  "RECOVERY_UNAVAILABLE",
  "WRITE_UNCONFIRMED",
]);

const safeWithheld = (
  reason: XinmaiCompletedReturnProofFailureReason,
  innerCause: string = reason,
): XinmaiCompletedReturnProofReadResult =>
  Object.freeze({
    status: "SAFE_WITHHELD" as const,
    proof: null,
    reason,
    innerCause,
    retryability: retryableRecoveryCause.has(innerCause)
      ? "RETRYABLE" as const
      : "NON_RETRYABLE" as const,
  });

const qualifyingOutcomes = new Set([
  "ATTEMPTED",
  "COMPLETED_AS_INTENDED",
  "CHANGED_RESPONSE",
]);

export async function readXinmaiCompletedReturnTargetProof(
  command: XinmaiPostOwnershipNextRealityCycleCommand,
): Promise<XinmaiCompletedReturnProofReadResult> {
  if (!validCommand(command)) {
    return safeWithheld("COMMAND_INVALID");
  }
  const recovered = await readXinmaiLivedGrowthCanonicalState();
  if (recovered.status !== "FOUND") {
    const unavailable =
      recovered.status === "UNAVAILABLE" ||
      recovered.reason === "RECOVERY_UNAVAILABLE" ||
      retryableRecoveryCause.has(recovered.reason);
    return safeWithheld(
      unavailable
        ? "GROWTH_RECOVERY_UNAVAILABLE"
        : "GROWTH_RECOVERY_CORRUPTED",
      recovered.reason,
    );
  }

  const choices = recovered.envelope.choiceActionIntentions.filter(
    (candidate) =>
      candidate.choiceActionIntentionReferenceId ===
        command.choiceActionIntentionReferenceId &&
      sameIdentity(candidate.identityReferences, command.identityReferences),
  );
  if (choices.length !== 1) {
    return safeWithheld("CHOICE_LINEAGE_NOT_UNIQUE");
  }
  const choice = choices[0];
  if (choice.state !== "REPORTED") {
    return safeWithheld("CHOICE_NOT_REPORTED", choice.state);
  }
  if (choice.targetEncounterCycleId === null) {
    return safeWithheld("TARGET_ENCOUNTER_NOT_BOUND");
  }

  const unresolvedNewerChoice =
    recovered.envelope.choiceActionIntentions.some(
      (candidate) =>
        candidate.choiceActionIntentionReferenceId !==
          choice.choiceActionIntentionReferenceId &&
        candidate.targetEncounterCycleId === choice.targetEncounterCycleId &&
        sameIdentity(candidate.identityReferences, command.identityReferences) &&
        (candidate.state === "COMMITTED" ||
          candidate.state === "AWAITING_RETURN" ||
          candidate.state === "REPORTED"),
    );
  if (unresolvedNewerChoice) {
    return safeWithheld("UNRESOLVED_NEWER_CHOICE");
  }

  const formations = recovered.envelope.formationReceipts.filter(
    (candidate) =>
      candidate.formationReferenceId === command.formationReferenceId &&
      candidate.choiceActionIntentionReferenceId ===
        choice.choiceActionIntentionReferenceId &&
      candidate.status === "FORMED" &&
      sameIdentity(candidate.identityReferences, command.identityReferences),
  );
  if (formations.length !== 1) {
    return safeWithheld("FORMATION_LINEAGE_NOT_UNIQUE");
  }
  const formation = formations[0];

  const facts = recovered.envelope.livedResponseFacts.filter(
    (candidate) =>
      candidate.livedResponseReferenceId === formation.livedResponseReferenceId &&
      candidate.choiceActionIntentionReferenceId ===
        choice.choiceActionIntentionReferenceId &&
      candidate.state === "CONFIRMED" &&
      candidate.sourceEncounterCycleId === choice.sourceEncounterCycleId &&
      candidate.targetEncounterCycleId === choice.targetEncounterCycleId &&
      sameIdentity(candidate.identityReferences, command.identityReferences),
  );
  if (facts.length !== 1) {
    return safeWithheld("FACT_LINEAGE_NOT_UNIQUE");
  }
  const fact = facts[0];
  if (!qualifyingOutcomes.has(fact.responseOutcome)) {
    return safeWithheld(
      "LIVED_RESPONSE_NOT_QUALIFYING",
      fact.responseOutcome,
    );
  }

  const eligibilities = recovered.envelope.crystalEligibilities.filter(
    (candidate) =>
      candidate.crystalEligibilityReferenceId ===
        formation.crystalEligibilityReferenceId &&
      candidate.choiceActionIntentionReferenceId ===
        choice.choiceActionIntentionReferenceId &&
      candidate.livedResponseReferenceId === fact.livedResponseReferenceId &&
      sameIdentity(candidate.identityReferences, command.identityReferences),
  );
  if (eligibilities.length !== 1) {
    return safeWithheld("ELIGIBILITY_LINEAGE_NOT_UNIQUE");
  }
  const eligibility = eligibilities[0];
  if (
    eligibility.state !== "CONSUMED" ||
    eligibility.consumedByFormationReferenceId !==
      formation.formationReferenceId
  ) {
    return safeWithheld("ELIGIBILITY_NOT_CONSUMED", eligibility.state);
  }
  if (
    formation.eligibilityRevision !== eligibility.eligibilityRevision ||
    formation.formedCrystal.status !== "CRYSTALLIZED" ||
    formation.formedCrystal.formationReferenceId !==
      formation.formationReferenceId ||
    formation.formedCrystal.crystalReferenceId !== formation.crystalReferenceId ||
    formation.formedCrystal.livedResponseReferenceId !==
      fact.livedResponseReferenceId
  ) {
    return safeWithheld("FORMATION_NOT_CANONICAL");
  }

  const departures =
    recovered.envelope.choiceExplicitDepartureReceipts.filter(
      (candidate) =>
        candidate.choiceActionIntentionReferenceId ===
          choice.choiceActionIntentionReferenceId &&
        candidate.sourceEncounterCycleId === choice.sourceEncounterCycleId &&
        candidate.state === "RETURNED" &&
        sameIdentity(candidate.identityReferences, command.identityReferences),
    );
  if (departures.length !== 1) {
    return safeWithheld("DEPARTURE_LINEAGE_NOT_UNIQUE");
  }
  const departure = departures[0];

  const returns = recovered.envelope.choiceExplicitReturnReceipts.filter(
    (candidate) =>
      candidate.choiceActionIntentionReferenceId ===
        choice.choiceActionIntentionReferenceId &&
      candidate.departureReceiptReferenceId ===
        departure.departureReceiptReferenceId &&
      candidate.sourceEncounterCycleId === choice.sourceEncounterCycleId &&
      candidate.targetEncounterCycleId === choice.targetEncounterCycleId &&
      sameIdentity(candidate.identityReferences, command.identityReferences),
  );
  if (returns.length !== 1) {
    return safeWithheld("RETURN_LINEAGE_NOT_UNIQUE");
  }
  const returnReceipt = returns[0];
  if (
    returnReceipt.state !== "CONSUMED_BY_FACT" ||
    returnReceipt.consumedLivedResponseReferenceId !==
      fact.livedResponseReferenceId
  ) {
    return safeWithheld("RETURN_NOT_CONSUMED_BY_FACT", returnReceipt.state);
  }
  const realityProof = returnReceipt.realityProof;
  if (
    realityProof.realityIntentReferenceId.trim().length === 0 ||
    realityProof.targetEncounterCycleId !== choice.targetEncounterCycleId ||
    realityProof.sourceEncounterCycleId !== choice.sourceEncounterCycleId ||
    realityProof.choiceActionIntentionReferenceId !==
      choice.choiceActionIntentionReferenceId ||
    realityProof.departureReceiptReferenceId !==
      departure.departureReceiptReferenceId ||
    !sameIdentity(realityProof.identityReferences, command.identityReferences)
  ) {
    return safeWithheld("PROOF_MISMATCH", "RETURN_REALITY_PROOF_MISMATCH");
  }

  const projections = recovered.canonicalProjections.filter(
    (candidate) =>
      candidate.formationReferenceId === formation.formationReferenceId &&
      candidate.crystalReferenceId === formation.crystalReferenceId &&
      candidate.choiceActionIntentionReferenceId ===
        choice.choiceActionIntentionReferenceId,
  );
  if (projections.length !== 1) {
    return safeWithheld("CRYSTAL_PROJECTION_NOT_UNIQUE");
  }

  const identityFormations = recovered.envelope.formationReceipts.filter(
    (candidate) =>
      sameIdentity(candidate.identityReferences, command.identityReferences),
  );
  const identityFormationIds = new Set(
    identityFormations.map((candidate) => candidate.formationReferenceId),
  );
  const body = projectXinmaiCanonicalBodyImprints({
    identityReferences: command.identityReferences,
    formationReceipts: identityFormations,
    canonicalCrystals: recovered.canonicalProjections.filter((candidate) =>
      identityFormationIds.has(candidate.formationReferenceId),
    ),
    focusedFormationReferenceId: formation.formationReferenceId,
    focusedChoiceActionIntentionReferenceId:
      choice.choiceActionIntentionReferenceId,
  });
  const bodyImprint =
    body.status === "IMPRINT_AVAILABLE"
      ? body.imprints.find(
          (candidate) =>
            candidate.state === "READY" &&
            candidate.formationReferenceId === formation.formationReferenceId &&
            candidate.crystalReferenceId === formation.crystalReferenceId &&
            candidate.livedResponseReferenceId === fact.livedResponseReferenceId &&
            candidate.choiceActionIntentionReferenceId ===
              choice.choiceActionIntentionReferenceId,
        ) ?? null
      : null;
  if (bodyImprint === null) {
    return safeWithheld(
      "BODY_IMPRINT_NOT_CURRENT",
      body.reason ?? "BODY_IMPRINT_NOT_CURRENT",
    );
  }

  const proofReferenceId = createStableXinmaiGrowthReference(
    "completed-return-target-proof",
    choice.choiceActionIntentionReferenceId,
    returnReceipt.returnReceiptReferenceId,
    formation.formationReferenceId,
    bodyImprint.imprintReferenceId,
  );
  return Object.freeze({
    status: "READY" as const,
    proof: Object.freeze({
      proofReferenceId,
      identityReferences: Object.freeze({ ...command.identityReferences }),
      choiceActionIntentionReferenceId:
        choice.choiceActionIntentionReferenceId,
      sourceEncounterCycleId: choice.sourceEncounterCycleId,
      targetEncounterCycleId: choice.targetEncounterCycleId,
      targetRealityIntentReferenceId:
        realityProof.realityIntentReferenceId,
      targetRealityProofCanonicalRevision: realityProof.canonicalRevision,
      targetRealityProofFencingToken: realityProof.fencingToken,
      departureReceiptReferenceId:
        departure.departureReceiptReferenceId,
      returnReceiptReferenceId: returnReceipt.returnReceiptReferenceId,
      livedResponseReferenceId: fact.livedResponseReferenceId,
      livedResponseOutcome: fact.responseOutcome as
        | "ATTEMPTED"
        | "COMPLETED_AS_INTENDED"
        | "CHANGED_RESPONSE",
      crystalEligibilityReferenceId:
        eligibility.crystalEligibilityReferenceId,
      formationReferenceId: formation.formationReferenceId,
      crystalReferenceId: formation.crystalReferenceId,
      bodyImprintReferenceId: bodyImprint.imprintReferenceId,
      observedGrowthEnvelopeRevision: recovered.envelope.revision,
    }),
    reason: null,
    retryability: "NOT_NEEDED" as const,
  });
}

export const XinmaiCompletedReturnTargetProofAdapter = Object.freeze({
  read: readXinmaiCompletedReturnTargetProof,
  canonicalReader: "XINMAI_LIVED_GROWTH_TRANSACTIONAL_STORE" as const,
  readOnly: true as const,
  noStorageCompensation: true as const,
  noOwnershipAuthority: true as const,
  noArchiveAuthority: true as const,
});
