import type { SixDimensionId } from "./xinmaiSixDimensionObservation";

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
      actionImpulse: string;
      protectedNeed: string;
      safeWithheldReason: null;
    }>
  | Readonly<{
      state: "LEGACY_GENERIC_ONLY";
      realityTrigger: string;
      items: readonly XinmaiSixDimensionResponseMapItem[];
      actionImpulse: null;
      protectedNeed: null;
      safeWithheldReason: "SEMANTIC_SELECTION_NOT_RECORDED";
    }>
  | Readonly<{
      state: "SAFE_WITHHELD";
      realityTrigger: string;
      items: readonly XinmaiSixDimensionResponseMapItem[];
      actionImpulse: null;
      protectedNeed: null;
      safeWithheldReason: string;
    }>;
