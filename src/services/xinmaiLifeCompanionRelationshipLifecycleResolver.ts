import type { GenesisVisualConsumerSourceResult } from "../types/genesisVisualConsumerSource";
import type {
  XinmaiLifeCompanionIdentityReferences,
  XinmaiLifeCompanionRelationshipAggregate,
  XinmaiLifeCompanionRelationshipRecoveryResult,
} from "../types/xinmaiLifeCompanionRelationshipCanonical";
import { recoverXinmaiLifeCompanionCanonicalRelationship } from "./xinmaiLifeCompanionCanonicalRecoveryAdapter";
import { XINMAI_LIFE_COMPANION_RELATIONSHIP_FORMAL_RECOVERY_POLICY } from "./xinmaiLifeCompanionRelationshipFormalRecoveryPolicy";

export type XinmaiLifeCompanionRelationshipLifecycleIdentityResult =
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

export type XinmaiLifeCompanionRelationshipLifecycleResult =
  | Readonly<{
      status: "RETURNING_COMPANIONSHIP_CONFIRMED";
      identityReferences: XinmaiLifeCompanionIdentityReferences;
      relationship: XinmaiLifeCompanionRelationshipAggregate;
      reason: null;
      retryability: "NOT_RETRYABLE";
    }>
  | Readonly<{
      status: "FIRST_ENCOUNTER_REQUIRED";
      identityReferences: XinmaiLifeCompanionIdentityReferences;
      relationship: null;
      reason: "RELATIONSHIP_NOT_FOUND";
      retryability: "NOT_RETRYABLE";
    }>
  | Readonly<{
      status: "RETRYABLE_RECOVERY_BLOCKED";
      identityReferences: XinmaiLifeCompanionIdentityReferences;
      relationship: null;
      reason:
        | "STORAGE_UNAVAILABLE"
        | "STORAGE_BLOCKED"
        | "STORAGE_FAILED"
        | "TRANSACTION_ABORTED";
      retryability: "RETRYABLE";
    }>
  | Readonly<{
      status: "PROTECTIVE_STOP";
      identityReferences: XinmaiLifeCompanionIdentityReferences | null;
      relationship: null;
      reason:
        | "IDENTITY_SOURCE_NOT_READY"
        | "IDENTITY_REFERENCE_MISMATCH"
        | "IDENTITY_REFERENCE_INVALID"
        | "RELATIONSHIP_CORRUPTED";
      retryability: "NOT_RETRYABLE";
    }>
  | Readonly<{
      status: "SAFE_WITHHELD";
      identityReferences: XinmaiLifeCompanionIdentityReferences;
      relationship: XinmaiLifeCompanionRelationshipAggregate | null;
      reason: "FORMAL_RECOVERY_CONSUMER_SAFE_WITHHELD";
      retryability: "NOT_RETRYABLE";
    }>;

const RETRYABLE_RECOVERY_REASONS = new Set([
  "STORAGE_UNAVAILABLE",
  "STORAGE_BLOCKED",
  "STORAGE_FAILED",
  "TRANSACTION_ABORTED",
] as const);

export function resolveXinmaiLifeCompanionRelationshipLifecycleIdentity(input: Readonly<{
  sourceReferenceId: string;
  consumerSourceResult: GenesisVisualConsumerSourceResult | null;
}>): XinmaiLifeCompanionRelationshipLifecycleIdentityResult {
  if (input.consumerSourceResult?.status !== "READY") {
    return Object.freeze({
      status: "BLOCKED" as const,
      identityReferences: null,
      reason: "IDENTITY_SOURCE_NOT_READY" as const,
    });
  }
  const consumerSource = input.consumerSourceResult.consumerSource;
  if (
    input.sourceReferenceId.length === 0 ||
    input.sourceReferenceId !== consumerSource.sourceReferenceId
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

export function mapXinmaiLifeCompanionRecoveryToLifecycle(input: Readonly<{
  identityReferences: XinmaiLifeCompanionIdentityReferences;
  recovery: XinmaiLifeCompanionRelationshipRecoveryResult;
  policyState?: "ENABLED" | "SAFE_WITHHELD";
}>): XinmaiLifeCompanionRelationshipLifecycleResult {
  const policyState =
    input.policyState ??
    XINMAI_LIFE_COMPANION_RELATIONSHIP_FORMAL_RECOVERY_POLICY.state;
  if (policyState === "SAFE_WITHHELD") {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      identityReferences: input.identityReferences,
      relationship:
        input.recovery.status === "READY"
          ? input.recovery.relationship
          : null,
      reason: "FORMAL_RECOVERY_CONSUMER_SAFE_WITHHELD" as const,
      retryability: "NOT_RETRYABLE" as const,
    });
  }
  if (input.recovery.status === "READY") {
    return Object.freeze({
      status: "RETURNING_COMPANIONSHIP_CONFIRMED" as const,
      identityReferences: input.identityReferences,
      relationship: input.recovery.relationship,
      reason: null,
      retryability: "NOT_RETRYABLE" as const,
    });
  }
  if (input.recovery.status === "NOT_ESTABLISHED") {
    return Object.freeze({
      status: "FIRST_ENCOUNTER_REQUIRED" as const,
      identityReferences: input.identityReferences,
      relationship: null,
      reason: "RELATIONSHIP_NOT_FOUND" as const,
      retryability: "NOT_RETRYABLE" as const,
    });
  }
  if (RETRYABLE_RECOVERY_REASONS.has(input.recovery.reason as never)) {
    return Object.freeze({
      status: "RETRYABLE_RECOVERY_BLOCKED" as const,
      identityReferences: input.identityReferences,
      relationship: null,
      reason: input.recovery.reason as
        | "STORAGE_UNAVAILABLE"
        | "STORAGE_BLOCKED"
        | "STORAGE_FAILED"
        | "TRANSACTION_ABORTED",
      retryability: "RETRYABLE" as const,
    });
  }
  return Object.freeze({
    status: "PROTECTIVE_STOP" as const,
    identityReferences: input.identityReferences,
    relationship: null,
    reason: input.recovery.reason as
      | "IDENTITY_REFERENCE_MISMATCH"
      | "RELATIONSHIP_CORRUPTED",
    retryability: "NOT_RETRYABLE" as const,
  });
}

export async function resolveXinmaiLifeCompanionRelationshipLifecycle(input: Readonly<{
  identityResult: XinmaiLifeCompanionRelationshipLifecycleIdentityResult;
}>): Promise<XinmaiLifeCompanionRelationshipLifecycleResult> {
  if (input.identityResult.status !== "READY") {
    return Object.freeze({
      status: "PROTECTIVE_STOP" as const,
      identityReferences: null,
      relationship: null,
      reason: input.identityResult.reason,
      retryability: "NOT_RETRYABLE" as const,
    });
  }
  const recovery = await recoverXinmaiLifeCompanionCanonicalRelationship(
    input.identityResult.identityReferences,
  );
  return mapXinmaiLifeCompanionRecoveryToLifecycle({
    identityReferences: input.identityResult.identityReferences,
    recovery,
  });
}

export const XinmaiLifeCompanionRelationshipLifecycleResolver = Object.freeze({
  resolveIdentity:
    resolveXinmaiLifeCompanionRelationshipLifecycleIdentity,
  resolve: resolveXinmaiLifeCompanionRelationshipLifecycle,
  mapRecovery: mapXinmaiLifeCompanionRecoveryToLifecycle,
});
