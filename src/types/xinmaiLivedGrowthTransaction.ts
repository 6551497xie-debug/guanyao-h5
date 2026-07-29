import type { XinmaiLivedGrowthEnvelope } from "./xinmaiLivedGrowthRecovery";
import type { RealityEncounterIdentityReferences } from "./xinmaiRealityEncounterIntent";

export type XinmaiLivedGrowthCommandType =
  | "COMMIT_CHOICE_INTENTION"
  | "BIND_CHOICE_TO_ENCOUNTER"
  | "CLOSE_CHOICE_WITHOUT_RECORD"
  | "CONFIRM_LIVED_RESPONSE"
  | "REVOKE_LIVED_RESPONSE"
  | "RESOLVE_CRYSTAL_ELIGIBILITY"
  | "FORM_CRYSTAL"
  | "UPDATE_CRYSTAL_PROJECTION";

export type XinmaiLivedGrowthCommandMetadata = Readonly<{
  commandReferenceId: string;
  commandType: XinmaiLivedGrowthCommandType;
  identityReferences: RealityEncounterIdentityReferences;
  issuedAt: string;
}>;

export type XinmaiLivedGrowthTransactionSafeWithheldReason =
  | "TRANSACTION_STORAGE_UNAVAILABLE"
  | "TRANSACTION_OPEN_BLOCKED"
  | "TRANSACTION_ABORTED"
  | "TRANSACTION_CONNECTION_CLOSED"
  | "RECOVERY_UNAVAILABLE"
  | "RECOVERY_CORRUPTED"
  | "LEGACY_IMPORT_CONFLICT"
  | "LEGACY_WRITER_DETECTED"
  | "CANONICAL_UNIQUENESS_VIOLATION"
  | "WRITE_UNCONFIRMED";

export type XinmaiLivedGrowthTransactionDecision<TValue, TReason extends string> =
  | Readonly<{
      status: "COMMIT";
      envelope: Omit<XinmaiLivedGrowthEnvelope, "revision" | "updatedAt">;
      value: TValue;
    }>
  | Readonly<{
      status: "ALREADY_COMMITTED";
      value: TValue;
    }>
  | Readonly<{
      status: "REJECTED";
      reason: TReason;
    }>;

export type XinmaiLivedGrowthTransactionOutcome<
  TValue,
  TReason extends string,
> =
  | Readonly<{
      status: "COMMITTED";
      value: TValue;
      envelope: XinmaiLivedGrowthEnvelope;
    }>
  | Readonly<{
      status: "ALREADY_COMMITTED";
      value: TValue;
      envelope: XinmaiLivedGrowthEnvelope;
    }>
  | Readonly<{
      status: "REJECTED";
      value: null;
      envelope: XinmaiLivedGrowthEnvelope;
      reason: TReason;
    }>
  | Readonly<{
      status: "SAFE_WITHHELD";
      value: null;
      envelope: null;
      reason: XinmaiLivedGrowthTransactionSafeWithheldReason;
    }>;

export const commitXinmaiLivedGrowthTransaction = <TValue>(
  envelope: Omit<XinmaiLivedGrowthEnvelope, "revision" | "updatedAt">,
  value: TValue,
): XinmaiLivedGrowthTransactionDecision<TValue, never> =>
  Object.freeze({ status: "COMMIT" as const, envelope, value });

export const preserveXinmaiLivedGrowthTransaction = <TValue>(
  value: TValue,
): XinmaiLivedGrowthTransactionDecision<TValue, never> =>
  Object.freeze({ status: "ALREADY_COMMITTED" as const, value });

export const rejectXinmaiLivedGrowthTransaction = <TReason extends string>(
  reason: TReason,
): XinmaiLivedGrowthTransactionDecision<never, TReason> =>
  Object.freeze({ status: "REJECTED" as const, reason });
