export type XinmaiSixDimensionSemanticSelectionMutationPolicy =
  "SAFE_WITHHELD";

export const XINMAI_SIX_DIMENSION_SEMANTIC_SELECTION_NEW_MUTATION:
  XinmaiSixDimensionSemanticSelectionMutationPolicy = "SAFE_WITHHELD";

export const canMutateXinmaiSixDimensionSemanticSelection = (): false =>
  false;

export const XINMAI_SIX_DIMENSION_SEMANTIC_SELECTION_FOUNDATION_POLICY =
  Object.freeze({
    phase: "AUTHORITY_FOUNDATION_PHASE_1" as const,
    mutation:
      XINMAI_SIX_DIMENSION_SEMANTIC_SELECTION_NEW_MUTATION,
    transactionWritesAllowed: false as const,
    receiptV2CreationAllowed: false as const,
    choiceV4CreationAllowed: false as const,
  });
