import type {
  CanonicalSixDimensionObservationSetRecord,
  CanonicalSixDimensionObservationSetV3,
  CanonicalSixDimensionSemanticSelection,
  SixDimensionCompletionReceiptRecord,
  SixDimensionCompletionReceiptV2,
  SixDimensionFailureCause,
  SixDimensionId,
} from "./xinmaiSixDimensionObservation";

export type SixDimensionSemanticSelectionMapItem = Readonly<{
  dimensionId: SixDimensionId;
  state: "OBSERVED";
  selection: CanonicalSixDimensionSemanticSelection;
}>;

export type SixDimensionSemanticSelectionRecoveryResult =
  | Readonly<{
      status: "EXACT_SUBSET" | "EXACT_COMPLETE";
      observationSet: CanonicalSixDimensionObservationSetV3;
      completionReceipt: SixDimensionCompletionReceiptV2 | null;
      selections: readonly SixDimensionSemanticSelectionMapItem[];
      cause: null;
    }>
  | Readonly<{
      status: "LEGACY_GENERIC_ONLY";
      observationSet: CanonicalSixDimensionObservationSetRecord;
      completionReceipt: SixDimensionCompletionReceiptRecord | null;
      observedDimensionIds: readonly SixDimensionId[];
      selections: null;
      cause: Readonly<{
        owner: "SIX_DIMENSION_AUTHORITY";
        code: "SEMANTIC_SELECTION_NOT_RECORDED";
        retryability: "NOT_RETRYABLE";
        innerCause: null;
      }>;
    }>
  | Readonly<{
      status: "SAFE_WITHHELD";
      observationSet: null;
      completionReceipt: null;
      selections: null;
      cause: SixDimensionFailureCause;
    }>;

export type SixDimensionSemanticSelectionMutationResult = Readonly<{
  status: "SAFE_WITHHELD";
  value: null;
  cause: Readonly<{
    owner: "SIX_DIMENSION_AUTHORITY";
    code: "MUTATION_POLICY_SAFE_WITHHELD";
    retryability: "NOT_RETRYABLE";
    innerCause: null;
  }>;
}>;
