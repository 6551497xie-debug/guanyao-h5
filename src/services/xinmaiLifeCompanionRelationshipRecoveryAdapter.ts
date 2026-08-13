import type { XinmaiLifeCompanionRelationshipRecoveryResult } from "../types/xinmaiLifeCompanionRelationship";
import {
  readXinmaiLifeCompanionFirstEncounterReceipt,
} from "./sessionService";

export function recoverXinmaiLifeCompanionRelationship():
  XinmaiLifeCompanionRelationshipRecoveryResult {
  const encounter = readXinmaiLifeCompanionFirstEncounterReceipt();
  if (encounter.status === "NOT_FOUND") {
    return Object.freeze({
      status: "NOT_ESTABLISHED",
      reason: "FIRST_ENCOUNTER_NOT_COMPLETED",
    });
  }
  if (encounter.status === "UNAVAILABLE") {
    return Object.freeze({
      status: "BLOCKED",
      reason: encounter.reason,
    });
  }
  return Object.freeze({
    status: "READY",
    sourceReferenceId: encounter.receipt.sourceReferenceId,
    encounter: encounter.receipt.encounterState,
    trust: encounter.receipt.trustState,
    companionState: encounter.receipt.companionState,
    encounterReceiptReferenceId: encounter.receipt.receiptReferenceId,
  });
}

export const XinmaiLifeCompanionRelationshipRecoveryAdapter = Object.freeze({
  recover: recoverXinmaiLifeCompanionRelationship,
});
