import type { SixDimensionId } from "./xinmaiSixDimensionObservation";

export type XinmaiActionSemanticResponseId = "ADVANCE" | "WITHDRAW" | "PAUSE";
export type XinmaiGoalSemanticResponseId = "NEED" | "VALUE" | "UNCERTAIN";

export type XinmaiSixDimensionResponseMapItem = Readonly<{
  dimensionId: SixDimensionId;
  dimensionLabel: string;
  selectedMeaning: string;
}>;

export type XinmaiSixDimensionResponseMapPresentation =
  | Readonly<{
      state: "EXACT";
      realityTrigger: string;
      items: readonly XinmaiSixDimensionResponseMapItem[];
      actionSemanticResponseId: XinmaiActionSemanticResponseId;
      goalSemanticResponseId: XinmaiGoalSemanticResponseId;
      safeWithheldReason: null;
    }>
  | Readonly<{
      state: "LEGACY_GENERIC_ONLY";
      realityTrigger: string;
      items: readonly XinmaiSixDimensionResponseMapItem[];
      actionSemanticResponseId: null;
      goalSemanticResponseId: null;
      safeWithheldReason: "SEMANTIC_SELECTION_NOT_RECORDED";
    }>
  | Readonly<{
      state: "SAFE_WITHHELD";
      realityTrigger: string;
      items: readonly XinmaiSixDimensionResponseMapItem[];
      actionSemanticResponseId: null;
      goalSemanticResponseId: null;
      safeWithheldReason: string;
    }>;
