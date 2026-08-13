import {
  XINMAI_LIFE_COMPANION_COMMAND_FENCE_SCHEMA_VERSION,
  XINMAI_LIFE_COMPANION_FIRST_ENCOUNTER_RECEIPT_SCHEMA_VERSION,
  XINMAI_LIFE_COMPANION_RELATIONSHIP_PROTOCOL_REVISION,
  XINMAI_LIFE_COMPANION_RELATIONSHIP_SCHEMA_VERSION,
  type XinmaiLifeCompanionCanonicalCommitResult,
  type XinmaiLifeCompanionRelationshipAggregate,
  type XinmaiLifeCompanionRelationshipCommand,
  type XinmaiLifeCompanionRelationshipCommandResult,
} from "../types/xinmaiLifeCompanionRelationshipCanonical";
import {
  createXinmaiLifeCompanionCommandReferenceId,
  createXinmaiLifeCompanionFirstEncounterReceiptReferenceId,
  createXinmaiLifeCompanionIdentityKey,
  createXinmaiLifeCompanionOutcomeReferenceId,
  createXinmaiLifeCompanionRelationshipId,
  digestXinmaiLifeCompanionEvidence,
  digestXinmaiLifeCompanionRelationshipCommand,
  isXinmaiLifeCompanionIdentityReferences,
} from "./xinmaiLifeCompanionRelationshipEvidenceValidator";
import { commitXinmaiLifeCompanionCanonicalRelationship } from "./xinmaiLifeCompanionRelationshipCanonicalStore";
import { XINMAI_LIFE_COMPANION_CANONICAL_MUTATION_POLICY } from "./xinmaiLifeCompanionCanonicalMutationPolicy";

const blocked = (
  code: Extract<
    XinmaiLifeCompanionRelationshipCommandResult,
    { status: "BLOCKED" | "SAFE_WITHHELD" }
  >["code"],
  retryability: "RETRYABLE" | "NOT_RETRYABLE",
  status: "BLOCKED" | "SAFE_WITHHELD" = "BLOCKED",
): XinmaiLifeCompanionRelationshipCommandResult => Object.freeze({
  status,
  code,
  retryability,
  relationship: null,
});

const validText = (value: string): boolean => value.trim().length > 0;

const mapCommitResult = (
  result: XinmaiLifeCompanionCanonicalCommitResult,
): XinmaiLifeCompanionRelationshipCommandResult => {
  if (result.status === "COMMITTED" || result.status === "ALREADY_COMMITTED") {
    return Object.freeze({
      status: result.status,
      code: "COMPANIONSHIP_CONFIRMED" as const,
      retryability: "NOT_RETRYABLE" as const,
      relationship: result.relationship,
    });
  }
  if (!("reason" in result)) {
    return blocked("STORAGE_FAILED", "NOT_RETRYABLE");
  }
  return blocked(
    result.reason,
    result.reason === "STORAGE_UNAVAILABLE" ||
      result.reason === "STORAGE_BLOCKED" ||
      result.reason === "STORAGE_FAILED" ||
      result.reason === "TRANSACTION_ABORTED"
      ? "RETRYABLE"
      : "NOT_RETRYABLE",
  );
};

export async function executeXinmaiLifeCompanionRelationshipCommand(
  command: XinmaiLifeCompanionRelationshipCommand,
): Promise<XinmaiLifeCompanionRelationshipCommandResult> {
  if (XINMAI_LIFE_COMPANION_CANONICAL_MUTATION_POLICY.state !== "ENABLED") {
    return blocked(
      "MUTATION_POLICY_SAFE_WITHHELD",
      "NOT_RETRYABLE",
      "SAFE_WITHHELD",
    );
  }
  if (
    command.type !== "CONFIRM_COMPANIONSHIP" ||
    !isXinmaiLifeCompanionIdentityReferences(command.identityReferences) ||
    !validText(command.responseCycleReferenceId) ||
    !validText(command.visualOutcomeReferenceId) ||
    (command.visualOutcome !== "MOTION_RESPONSE" &&
      command.visualOutcome !== "STATIC_RESPONSE" &&
      command.visualOutcome !== "RESPONSE_UNAVAILABLE_ACCEPTED")
  ) {
    return blocked("COMMAND_INVALID", "NOT_RETRYABLE");
  }

  const identityKey = createXinmaiLifeCompanionIdentityKey(
    command.identityReferences,
  );
  const relationshipId = await createXinmaiLifeCompanionRelationshipId(
    command.identityReferences,
  );
  if (relationshipId === null) {
    return blocked("CRYPTOGRAPHIC_EVIDENCE_UNAVAILABLE", "NOT_RETRYABLE");
  }
  const firstEncounterEvidenceDigest =
    await digestXinmaiLifeCompanionEvidence({
      relationshipId,
      identityKey,
      identityReferences: command.identityReferences,
      responseCycleReferenceId: command.responseCycleReferenceId,
      visualOutcomeReferenceId: command.visualOutcomeReferenceId,
      visualOutcome: command.visualOutcome,
    });
  if (firstEncounterEvidenceDigest === null) {
    return blocked("CRYPTOGRAPHIC_EVIDENCE_UNAVAILABLE", "NOT_RETRYABLE");
  }
  const firstEncounterReceiptReferenceId =
    createXinmaiLifeCompanionFirstEncounterReceiptReferenceId(
      firstEncounterEvidenceDigest,
    );
  const relationshipDigest = await digestXinmaiLifeCompanionEvidence({
    schemaVersion: XINMAI_LIFE_COMPANION_RELATIONSHIP_SCHEMA_VERSION,
    protocolRevision: XINMAI_LIFE_COMPANION_RELATIONSHIP_PROTOCOL_REVISION,
    relationshipId,
    identityKey,
    firstEncounterReceiptReferenceId,
    firstEncounterEvidenceDigest,
    state: "COMPANIONSHIP_CONFIRMED",
    revision: 1,
  });
  if (relationshipDigest === null) {
    return blocked("CRYPTOGRAPHIC_EVIDENCE_UNAVAILABLE", "NOT_RETRYABLE");
  }
  const now = new Date().toISOString();
  const relationship: XinmaiLifeCompanionRelationshipAggregate = Object.freeze({
    schemaVersion: XINMAI_LIFE_COMPANION_RELATIONSHIP_SCHEMA_VERSION,
    protocolRevision: XINMAI_LIFE_COMPANION_RELATIONSHIP_PROTOCOL_REVISION,
    relationshipId,
    identityKey,
    identityReferences: command.identityReferences,
    state: "COMPANIONSHIP_CONFIRMED",
    firstEncounterReceiptReferenceId,
    firstEncounterReceipt: Object.freeze({
      schemaVersion:
        XINMAI_LIFE_COMPANION_FIRST_ENCOUNTER_RECEIPT_SCHEMA_VERSION,
      receiptReferenceId: firstEncounterReceiptReferenceId,
      relationshipId,
      identityKey,
      identityReferences: command.identityReferences,
      responseCycleReferenceId: command.responseCycleReferenceId,
      visualOutcomeReferenceId: command.visualOutcomeReferenceId,
      visualOutcome: command.visualOutcome,
      evidenceDigest: firstEncounterEvidenceDigest,
      observedAt: now,
    }),
    relationshipDigest,
    revision: 1,
    createdAt: now,
    updatedAt: now,
    provenance: Object.freeze({
      identityAuthority: "EXISTING_RECOGNIZED_LIFE",
      relationshipAuthority:
        "XINMAI_LIFE_COMPANION_RELATIONSHIP_CONTROLLER",
      explicitCompanionshipConfirmationRequired: true,
      lifeWhisperRequired: false,
      namingRequired: false,
      realityRequired: false,
      noRawWhisperPersistence: true,
      noPrivateFreeTextPersistence: true,
      noBackfill: true,
    }),
  });
  const commandReferenceId =
    createXinmaiLifeCompanionCommandReferenceId(
      firstEncounterEvidenceDigest,
    );
  const commandDigest =
    await digestXinmaiLifeCompanionRelationshipCommand(
      commandReferenceId,
      relationship,
    );
  if (commandDigest === null) {
    return blocked("CRYPTOGRAPHIC_EVIDENCE_UNAVAILABLE", "NOT_RETRYABLE");
  }
  return mapCommitResult(
    await commitXinmaiLifeCompanionCanonicalRelationship(
      relationship,
      Object.freeze({
        schemaVersion: XINMAI_LIFE_COMPANION_COMMAND_FENCE_SCHEMA_VERSION,
        commandReferenceId,
        outcomeReferenceId:
          createXinmaiLifeCompanionOutcomeReferenceId(commandDigest),
        relationshipId,
        identityKey,
        commandDigest,
        outcome: "COMPANIONSHIP_CONFIRMED",
        committedAt: now,
      }),
    ),
  );
}

export const XinmaiLifeCompanionRelationshipController = Object.freeze({
  execute: executeXinmaiLifeCompanionRelationshipCommand,
});

export const XinmaiLifeCompanionRelationshipAuthorityController =
  XinmaiLifeCompanionRelationshipController;
