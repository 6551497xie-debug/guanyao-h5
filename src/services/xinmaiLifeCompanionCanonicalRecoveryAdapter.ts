import type {
  XinmaiLifeCompanionIdentityReferences,
  XinmaiLifeCompanionRelationshipRecoveryResult,
} from "../types/xinmaiLifeCompanionRelationshipCanonical";
import { readXinmaiLifeCompanionCanonicalRelationship } from "./xinmaiLifeCompanionRelationshipCanonicalStore";

export const XINMAI_LIFE_COMPANION_RECOVERY_BOUNDARY = Object.freeze({
  noIdentityAsRelationship: true as const,
  noNamingAsRelationship: true as const,
  noLifeWhisperAsRelationship: true as const,
  noRealityIntentAsRelationship: true as const,
  noBackfill: true as const,
  noCurrentProtocolReinterpretation: true as const,
  corruptEvidenceFailsClosed: true as const,
});

export async function recoverXinmaiLifeCompanionCanonicalRelationship(
  identity: XinmaiLifeCompanionIdentityReferences,
): Promise<XinmaiLifeCompanionRelationshipRecoveryResult> {
  const read = await readXinmaiLifeCompanionCanonicalRelationship(identity);
  if (read.status === "AVAILABLE") {
    return Object.freeze({
      status: "READY" as const,
      relationship: read.relationship,
    });
  }
  if (read.status === "NOT_FOUND") {
    return Object.freeze({
      status: "NOT_ESTABLISHED" as const,
      reason: "RELATIONSHIP_NOT_FOUND" as const,
      relationship: null,
    });
  }
  return Object.freeze({
    status: "BLOCKED" as const,
    reason: read.reason,
    relationship: null,
  });
}

export const XinmaiLifeCompanionCanonicalRecoveryAdapter = Object.freeze({
  recover: recoverXinmaiLifeCompanionCanonicalRelationship,
  boundary: XINMAI_LIFE_COMPANION_RECOVERY_BOUNDARY,
});
