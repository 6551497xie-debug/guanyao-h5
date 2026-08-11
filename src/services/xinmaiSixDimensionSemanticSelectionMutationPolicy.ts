export type XinmaiSixDimensionSemanticSelectionMutationPolicy =
  | "ENABLED"
  | "SAFE_WITHHELD";

export const XINMAI_SIX_DIMENSION_SEMANTIC_SELECTION_NEW_MUTATION:
  XinmaiSixDimensionSemanticSelectionMutationPolicy = "ENABLED";

const isXinmaiSixDimensionSemanticSelectionMutationEnabled = (
  policy: XinmaiSixDimensionSemanticSelectionMutationPolicy,
): boolean => policy === "ENABLED";

export const canMutateXinmaiSixDimensionSemanticSelection = (): boolean =>
  isXinmaiSixDimensionSemanticSelectionMutationEnabled(
    XINMAI_SIX_DIMENSION_SEMANTIC_SELECTION_NEW_MUTATION,
  );

export const XINMAI_SIX_DIMENSION_SEMANTIC_SELECTION_FOUNDATION_POLICY =
  Object.freeze({
    phase: "ATOMIC_ACTIVATION_PHASE_2" as const,
    mutation:
      XINMAI_SIX_DIMENSION_SEMANTIC_SELECTION_NEW_MUTATION,
    transactionWritesAllowed:
      isXinmaiSixDimensionSemanticSelectionMutationEnabled(
        XINMAI_SIX_DIMENSION_SEMANTIC_SELECTION_NEW_MUTATION,
      ),
    receiptV2CreationAllowed:
      isXinmaiSixDimensionSemanticSelectionMutationEnabled(
        XINMAI_SIX_DIMENSION_SEMANTIC_SELECTION_NEW_MUTATION,
      ),
    choiceV4CreationAllowed:
      isXinmaiSixDimensionSemanticSelectionMutationEnabled(
        XINMAI_SIX_DIMENSION_SEMANTIC_SELECTION_NEW_MUTATION,
      ),
  });
