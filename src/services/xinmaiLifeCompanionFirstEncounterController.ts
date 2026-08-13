import {
  XINMAI_LIFE_COMPANION_FIRST_ENCOUNTER_SCHEMA_VERSION,
  XINMAI_LIFE_COMPANION_RELATIONSHIP_PROTOCOL_REVISION,
  type XinmaiFirstEncounterStarBeastResponse,
  type XinmaiFirstEncounterUserInitiation,
  type XinmaiLifeCompanionFirstEncounterCommitResult,
  type XinmaiLifeCompanionFirstEncounterReceipt,
} from "../types/xinmaiLifeCompanionRelationship";
import {
  persistXinmaiLifeCompanionFirstEncounterReceipt,
  readXinmaiLifeCompanionFirstEncounterReceipt,
  resolveRecognizedRelationshipIdentityReferences,
} from "./sessionService";
import { XINMAI_LIFE_COMPANION_RELATIONSHIP_RUNTIME_POLICY } from "./xinmaiLifeCompanionRelationshipRuntimePolicy";

const blocked = (
  reason: Extract<
    XinmaiLifeCompanionFirstEncounterCommitResult,
    { status: "BLOCKED" }
  >["reason"],
  retryability: "RETRYABLE" | "NON_RETRYABLE",
): XinmaiLifeCompanionFirstEncounterCommitResult =>
  Object.freeze({
    status: "BLOCKED",
    reason,
    receipt: null,
    retryability,
  });

const outcomeIsValid = (
  initiation: XinmaiFirstEncounterUserInitiation,
  response: XinmaiFirstEncounterStarBeastResponse,
): boolean =>
  initiation === "SILENCE_CHOSEN"
    ? response === "SILENCE_HELD"
    : response === "MOTION_RESPONSE" ||
      response === "STATIC_RESPONSE" ||
      response === "RESPONSE_UNAVAILABLE_ACCEPTED";

const receiptId = (
  sourceReferenceId: string,
  starBeastIdentityReferenceId: string,
): string =>
  `first-encounter:${encodeURIComponent(sourceReferenceId)}:${encodeURIComponent(
    starBeastIdentityReferenceId,
  )}`;

export function commitXinmaiLifeCompanionFirstEncounter(input: Readonly<{
  sourceReferenceId: string;
  userInitiation: XinmaiFirstEncounterUserInitiation;
  starBeastResponse: XinmaiFirstEncounterStarBeastResponse;
}>): XinmaiLifeCompanionFirstEncounterCommitResult {
  if (XINMAI_LIFE_COMPANION_RELATIONSHIP_RUNTIME_POLICY !== "ENABLED") {
    return blocked("MUTATION_SAFE_WITHHELD", "NON_RETRYABLE");
  }
  if (!outcomeIsValid(input.userInitiation, input.starBeastResponse)) {
    return blocked("ENCOUNTER_OUTCOME_INVALID", "NON_RETRYABLE");
  }
  const identity = resolveRecognizedRelationshipIdentityReferences();
  if (identity === null) {
    return blocked("RECOGNIZED_IDENTITY_REQUIRED", "RETRYABLE");
  }
  if (identity.sourceReferenceId !== input.sourceReferenceId) {
    return blocked("IDENTITY_REFERENCE_MISMATCH", "NON_RETRYABLE");
  }
  const current = readXinmaiLifeCompanionFirstEncounterReceipt();
  if (current.status === "AVAILABLE") {
    return Object.freeze({
      status: "ALREADY_ESTABLISHED",
      receipt: current.receipt,
      retryability: "NON_RETRYABLE",
    });
  }
  if (current.status === "UNAVAILABLE") {
    return blocked(
      current.reason === "IDENTITY_REFERENCE_MISMATCH"
        ? "IDENTITY_REFERENCE_MISMATCH"
        : "RECEIPT_CONFLICT",
      "NON_RETRYABLE",
    );
  }
  const receipt: XinmaiLifeCompanionFirstEncounterReceipt = Object.freeze({
    schemaVersion: XINMAI_LIFE_COMPANION_FIRST_ENCOUNTER_SCHEMA_VERSION,
    protocolRevision: XINMAI_LIFE_COMPANION_RELATIONSHIP_PROTOCOL_REVISION,
    receiptReferenceId: receiptId(
      identity.sourceReferenceId,
      identity.starBeastIdentityReferenceId,
    ),
    sourceReferenceId: identity.sourceReferenceId,
    starBeastIdentityReferenceId: identity.starBeastIdentityReferenceId,
    mansionCoordinateReferenceId: identity.mansionCoordinateReferenceId,
    userInitiation: input.userInitiation,
    starBeastResponse: input.starBeastResponse,
    encounterState: "FIRST_ENCOUNTER_COMPLETED",
    trustState: "FIRST_EXCHANGE_ESTABLISHED",
    companionState: "MET",
    rawWhisperPersisted: false,
    createdAt: new Date().toISOString(),
    revision: 1,
  });
  if (!persistXinmaiLifeCompanionFirstEncounterReceipt(receipt)) {
    return blocked("PERSISTENCE_UNAVAILABLE", "RETRYABLE");
  }
  return Object.freeze({
    status: "READY",
    receipt,
    retryability: "NON_RETRYABLE",
  });
}
