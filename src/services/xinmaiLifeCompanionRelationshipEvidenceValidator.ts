import {
  XINMAI_LIFE_COMPANION_COMMAND_FENCE_SCHEMA_VERSION,
  XINMAI_LIFE_COMPANION_FIRST_ENCOUNTER_RECEIPT_SCHEMA_VERSION,
  XINMAI_LIFE_COMPANION_RELATIONSHIP_PROTOCOL_REVISION,
  XINMAI_LIFE_COMPANION_RELATIONSHIP_SCHEMA_VERSION,
  type XinmaiLifeCompanionCommandFence,
  type XinmaiLifeCompanionFirstEncounterReceipt,
  type XinmaiLifeCompanionIdentityReferences,
  type XinmaiLifeCompanionRelationshipAggregate,
} from "../types/xinmaiLifeCompanionRelationshipCanonical";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const validText = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

export const hasExactKeys = (
  value: Record<string, unknown>,
  keys: readonly string[],
): boolean => {
  const actual = Object.keys(value).sort();
  const expected = [...keys].sort();
  return actual.length === expected.length &&
    actual.every((key, index) => key === expected[index]);
};

export const isXinmaiLifeCompanionIdentityReferences = (
  value: unknown,
): value is XinmaiLifeCompanionIdentityReferences =>
  isRecord(value) &&
  hasExactKeys(value, [
    "sourceReferenceId",
    "starBeastIdentityReferenceId",
    "mansionCoordinateReferenceId",
  ]) &&
  validText(value.sourceReferenceId) &&
  validText(value.starBeastIdentityReferenceId) &&
  validText(value.mansionCoordinateReferenceId);

export const createXinmaiLifeCompanionIdentityKey = (
  identity: XinmaiLifeCompanionIdentityReferences,
): string =>
  [
    identity.sourceReferenceId,
    identity.starBeastIdentityReferenceId,
    identity.mansionCoordinateReferenceId,
  ].map(encodeURIComponent).join("::");

export const xinmaiLifeCompanionIdentityMatches = (
  left: XinmaiLifeCompanionIdentityReferences,
  right: XinmaiLifeCompanionIdentityReferences,
): boolean =>
  left.sourceReferenceId === right.sourceReferenceId &&
  left.starBeastIdentityReferenceId ===
    right.starBeastIdentityReferenceId &&
  left.mansionCoordinateReferenceId ===
    right.mansionCoordinateReferenceId;

const stableSerialize = (value: unknown): string => {
  if (Array.isArray(value)) {
    return `[${value.map(stableSerialize).join(",")}]`;
  }
  if (isRecord(value)) {
    return `{${Object.keys(value).sort().map((key) =>
      `${JSON.stringify(key)}:${stableSerialize(value[key])}`
    ).join(",")}}`;
  }
  return JSON.stringify(value);
};

export async function digestXinmaiLifeCompanionEvidence(
  value: unknown,
): Promise<string | null> {
  if (typeof crypto === "undefined" || crypto.subtle === undefined) {
    return null;
  }
  try {
    const bytes = new TextEncoder().encode(stableSerialize(value));
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return [...new Uint8Array(digest)]
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  } catch {
    return null;
  }
}

export const isXinmaiLifeCompanionFirstEncounterReceipt = (
  value: unknown,
): value is XinmaiLifeCompanionFirstEncounterReceipt =>
  isRecord(value) &&
  hasExactKeys(value, [
    "schemaVersion",
    "receiptReferenceId",
    "relationshipId",
    "identityKey",
    "identityReferences",
    "responseCycleReferenceId",
    "visualOutcomeReferenceId",
    "visualOutcome",
    "evidenceDigest",
    "observedAt",
  ]) &&
  value.schemaVersion ===
    XINMAI_LIFE_COMPANION_FIRST_ENCOUNTER_RECEIPT_SCHEMA_VERSION &&
  validText(value.receiptReferenceId) &&
  validText(value.relationshipId) &&
  validText(value.identityKey) &&
  isXinmaiLifeCompanionIdentityReferences(value.identityReferences) &&
  value.identityKey ===
    createXinmaiLifeCompanionIdentityKey(value.identityReferences) &&
  validText(value.responseCycleReferenceId) &&
  validText(value.visualOutcomeReferenceId) &&
  (value.visualOutcome === "MOTION_RESPONSE" ||
    value.visualOutcome === "STATIC_RESPONSE" ||
    value.visualOutcome === "RESPONSE_UNAVAILABLE_ACCEPTED") &&
  validText(value.evidenceDigest) &&
  validText(value.observedAt);

export const isXinmaiLifeCompanionRelationshipAggregate = (
  value: unknown,
): value is XinmaiLifeCompanionRelationshipAggregate => {
  if (
    !isRecord(value) ||
    value.schemaVersion !==
      XINMAI_LIFE_COMPANION_RELATIONSHIP_SCHEMA_VERSION ||
    value.protocolRevision !==
      XINMAI_LIFE_COMPANION_RELATIONSHIP_PROTOCOL_REVISION ||
    !validText(value.relationshipId) ||
    !validText(value.identityKey) ||
    !isXinmaiLifeCompanionIdentityReferences(value.identityReferences) ||
    value.identityKey !==
      createXinmaiLifeCompanionIdentityKey(value.identityReferences) ||
    value.state !== "COMPANIONSHIP_CONFIRMED" ||
    !validText(value.firstEncounterReceiptReferenceId) ||
    !isXinmaiLifeCompanionFirstEncounterReceipt(
      value.firstEncounterReceipt,
    ) ||
    value.firstEncounterReceiptReferenceId !==
      value.firstEncounterReceipt.receiptReferenceId ||
    value.relationshipId !== value.firstEncounterReceipt.relationshipId ||
    value.identityKey !== value.firstEncounterReceipt.identityKey ||
    !validText(value.relationshipDigest) ||
    value.revision !== 1 ||
    !validText(value.createdAt) ||
    !validText(value.updatedAt) ||
    !isRecord(value.provenance)
  ) {
    return false;
  }
  return (
    value.provenance.identityAuthority ===
      "EXISTING_RECOGNIZED_LIFE" &&
    value.provenance.relationshipAuthority ===
      "XINMAI_LIFE_COMPANION_RELATIONSHIP_CONTROLLER" &&
    value.provenance.explicitCompanionshipConfirmationRequired === true &&
    value.provenance.lifeWhisperRequired === false &&
    value.provenance.namingRequired === false &&
    value.provenance.realityRequired === false &&
    value.provenance.noRawWhisperPersistence === true &&
    value.provenance.noPrivateFreeTextPersistence === true &&
    value.provenance.noBackfill === true
  );
};

export const isXinmaiLifeCompanionCommandFence = (
  value: unknown,
): value is XinmaiLifeCompanionCommandFence =>
  isRecord(value) &&
  value.schemaVersion ===
    XINMAI_LIFE_COMPANION_COMMAND_FENCE_SCHEMA_VERSION &&
  validText(value.commandReferenceId) &&
  validText(value.outcomeReferenceId) &&
  validText(value.relationshipId) &&
  validText(value.identityKey) &&
  validText(value.commandDigest) &&
  value.outcome === "COMPANIONSHIP_CONFIRMED" &&
  validText(value.committedAt);

export async function validateXinmaiLifeCompanionRelationshipEvidence(
  relationship: unknown,
): Promise<boolean> {
  if (!isXinmaiLifeCompanionRelationshipAggregate(relationship)) {
    return false;
  }
  const receiptDigest = await digestXinmaiLifeCompanionEvidence({
    relationshipId: relationship.relationshipId,
    identityKey: relationship.identityKey,
    identityReferences: relationship.identityReferences,
    responseCycleReferenceId:
      relationship.firstEncounterReceipt.responseCycleReferenceId,
    visualOutcomeReferenceId:
      relationship.firstEncounterReceipt.visualOutcomeReferenceId,
    visualOutcome: relationship.firstEncounterReceipt.visualOutcome,
  });
  if (
    receiptDigest === null ||
    receiptDigest !== relationship.firstEncounterReceipt.evidenceDigest
  ) {
    return false;
  }
  const relationshipDigest = await digestXinmaiLifeCompanionEvidence({
    schemaVersion: relationship.schemaVersion,
    protocolRevision: relationship.protocolRevision,
    relationshipId: relationship.relationshipId,
    identityKey: relationship.identityKey,
    firstEncounterReceiptReferenceId:
      relationship.firstEncounterReceiptReferenceId,
    firstEncounterEvidenceDigest:
      relationship.firstEncounterReceipt.evidenceDigest,
    state: relationship.state,
    revision: relationship.revision,
  });
  return relationshipDigest !== null &&
    relationshipDigest === relationship.relationshipDigest;
}
