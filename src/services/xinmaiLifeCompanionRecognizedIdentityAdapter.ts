import type { GenesisStarBeastPresenceVisualRealization } from "../types/genesisStarBeastPresenceVisualRealization";
import type { GenesisVisualConsumerSourceResult } from "../types/genesisVisualConsumerSource";
import type { XinmaiLifeCompanionIdentityReferences } from "../types/xinmaiLifeCompanionRelationshipCanonical";

export type XinmaiLifeCompanionRecognizedIdentityResult =
  | Readonly<{
      status: "READY";
      identityReferences: XinmaiLifeCompanionIdentityReferences;
      reason: null;
    }>
  | Readonly<{
      status: "BLOCKED";
      identityReferences: null;
      reason:
        | "IDENTITY_SOURCE_NOT_READY"
        | "IDENTITY_REFERENCE_MISMATCH"
        | "IDENTITY_REFERENCE_INVALID";
    }>;

export function resolveXinmaiLifeCompanionRecognizedIdentity(input: Readonly<{
  sourceReferenceId: string;
  consumerSourceResult: GenesisVisualConsumerSourceResult;
  presenceVisualRealization: GenesisStarBeastPresenceVisualRealization;
}>): XinmaiLifeCompanionRecognizedIdentityResult {
  if (input.consumerSourceResult.status !== "READY") {
    return Object.freeze({
      status: "BLOCKED" as const,
      identityReferences: null,
      reason: "IDENTITY_SOURCE_NOT_READY" as const,
    });
  }
  const consumerSource = input.consumerSourceResult.consumerSource;
  if (
    input.sourceReferenceId !== consumerSource.sourceReferenceId ||
    input.sourceReferenceId !== input.presenceVisualRealization.sourceReferenceId
  ) {
    return Object.freeze({
      status: "BLOCKED" as const,
      identityReferences: null,
      reason: "IDENTITY_REFERENCE_MISMATCH" as const,
    });
  }
  const starBeastIdentityReferenceId =
    consumerSource.projectionBundle.personalRevealProjection
      .identityReferenceId;
  const mansionCoordinateReferenceId =
    consumerSource.projectionBundle.twentyEightMansionCoordinateProjection
      .birthMansion.coordinateReferenceId;
  if (
    input.sourceReferenceId.trim().length === 0 ||
    starBeastIdentityReferenceId.trim().length === 0 ||
    mansionCoordinateReferenceId.trim().length === 0
  ) {
    return Object.freeze({
      status: "BLOCKED" as const,
      identityReferences: null,
      reason: "IDENTITY_REFERENCE_INVALID" as const,
    });
  }
  return Object.freeze({
    status: "READY" as const,
    identityReferences: Object.freeze({
      sourceReferenceId: input.sourceReferenceId,
      starBeastIdentityReferenceId,
      mansionCoordinateReferenceId,
    }),
    reason: null,
  });
}

export const XinmaiLifeCompanionRecognizedIdentityAdapter = Object.freeze({
  resolve: resolveXinmaiLifeCompanionRecognizedIdentity,
});
