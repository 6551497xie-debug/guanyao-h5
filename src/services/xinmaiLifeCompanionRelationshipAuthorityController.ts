import type {
  XinmaiLifeCompanionRelationshipCommand,
  XinmaiLifeCompanionRelationshipCommandResult,
} from "../types/xinmaiLifeCompanionRelationshipCanonical";
import { XINMAI_LIFE_COMPANION_CANONICAL_MUTATION_POLICY } from "./xinmaiLifeCompanionCanonicalMutationPolicy";

export async function executeXinmaiLifeCompanionRelationshipCommand(
  _command: XinmaiLifeCompanionRelationshipCommand,
): Promise<XinmaiLifeCompanionRelationshipCommandResult> {
  // Phase 1 installs the canonical contract and read boundary only. It must
  // not open a transaction or write an aggregate/fence in ordinary use.
  void XINMAI_LIFE_COMPANION_CANONICAL_MUTATION_POLICY;
  return Object.freeze({
    status: "SAFE_WITHHELD" as const,
    code: "MUTATION_POLICY_SAFE_WITHHELD" as const,
    retryability: "NOT_RETRYABLE" as const,
    relationship: null,
  });
}

export const XinmaiLifeCompanionRelationshipController =
  Object.freeze({
    execute: executeXinmaiLifeCompanionRelationshipCommand,
  });

export const XinmaiLifeCompanionRelationshipAuthorityController =
  XinmaiLifeCompanionRelationshipController;
