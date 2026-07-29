import type {
  XinmaiLivedGrowthCommandMetadata,
  XinmaiLivedGrowthTransactionDecision,
  XinmaiLivedGrowthTransactionOutcome,
} from "../types/xinmaiLivedGrowthTransaction";
import type { XinmaiLivedGrowthEnvelope } from "../types/xinmaiLivedGrowthRecovery";
import { transactXinmaiLivedGrowthCanonicalState } from "./xinmaiLivedGrowthTransactionalStore";

export async function executeXinmaiLivedGrowthTransaction<
  TValue,
  TReason extends string,
>(
  command: XinmaiLivedGrowthCommandMetadata,
  decide: (
    current: XinmaiLivedGrowthEnvelope,
    command: XinmaiLivedGrowthCommandMetadata,
  ) => XinmaiLivedGrowthTransactionDecision<TValue, TReason>,
): Promise<XinmaiLivedGrowthTransactionOutcome<TValue, TReason>> {
  if (
    !command.commandReferenceId.trim() ||
    Object.values(command.identityReferences).some((value) => !value.trim())
  ) {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      value: null,
      envelope: null,
      reason: "RECOVERY_UNAVAILABLE" as const,
    });
  }
  return transactXinmaiLivedGrowthCanonicalState(command, decide);
}

export const XinmaiLivedGrowthTransactionAuthority = Object.freeze({
  execute: executeXinmaiLivedGrowthTransaction,
  persistence: "INDEXED_DB_CANONICAL_TRANSACTION" as const,
  successAuthority: "IDB_TRANSACTION_COMPLETE" as const,
  localStorageMutationAuthority: false as const,
  webLockAuthority: false as const,
});
