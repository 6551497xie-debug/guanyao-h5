import type {
  SixDimensionSemanticSelectionMutationResult,
} from "../types/xinmaiSixDimensionSemanticSelection";
import {
  XINMAI_SIX_DIMENSION_SEMANTIC_SELECTION_FOUNDATION_POLICY,
  canMutateXinmaiSixDimensionSemanticSelection,
} from "./xinmaiSixDimensionSemanticSelectionMutationPolicy";

export type SixDimensionSemanticSelectionFoundationCommand = Readonly<{
  type: "ACKNOWLEDGE_SEMANTIC_SELECTION_V3";
  commandReferenceId: string;
  observationSetId: string;
  dimensionId: string;
  semanticGrammarRevision: string;
  semanticResponseId: string;
  expectedSetRevision: number;
  expectedItemRevision: number;
  sourceReferenceId: string;
}>;

export async function executeXinmaiSixDimensionSemanticSelectionCommand(
  _command: SixDimensionSemanticSelectionFoundationCommand,
): Promise<SixDimensionSemanticSelectionMutationResult> {
  if (!canMutateXinmaiSixDimensionSemanticSelection()) {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      value: null,
      cause: Object.freeze({
        owner: "SIX_DIMENSION_AUTHORITY" as const,
        code: "MUTATION_POLICY_SAFE_WITHHELD" as const,
        retryability: "NOT_RETRYABLE" as const,
        innerCause: null,
      }),
    });
  }
  return Object.freeze({
    status: "SAFE_WITHHELD" as const,
    value: null,
    cause: Object.freeze({
      owner: "SIX_DIMENSION_AUTHORITY" as const,
      code: "MUTATION_POLICY_SAFE_WITHHELD" as const,
      retryability: "NOT_RETRYABLE" as const,
      innerCause: null,
    }),
  });
}

export const XinmaiSixDimensionSemanticSelectionAuthorityFoundation =
  Object.freeze({
    phase: "AUTHORITY_FOUNDATION_PHASE_1" as const,
    owner: "XINMAI_SIX_DIMENSION_OBSERVATION_AUTHORITY" as const,
    policy:
      XINMAI_SIX_DIMENSION_SEMANTIC_SELECTION_FOUNDATION_POLICY,
    execute: executeXinmaiSixDimensionSemanticSelectionCommand,
    writesTransaction: false as const,
  });
