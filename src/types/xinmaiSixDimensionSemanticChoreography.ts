import type { SixSpaceId } from "../runtime/guanyaoRuntimeTypes";

export type XinmaiSixDimensionResponseMode =
  | "CONFIRM"
  | "KEEP_OWN_MEANING"
  | "PAUSE";

export type XinmaiSixDimensionSemanticResponse = Readonly<{
  id: string;
  label: string;
  mirror: string;
  mode: XinmaiSixDimensionResponseMode;
}>;

export type XinmaiSixDimensionSemanticGrammar = Readonly<{
  dimensionId: SixSpaceId;
  label: string;
  question: string;
  responses: readonly XinmaiSixDimensionSemanticResponse[];
  acknowledgementLabel: string;
  spatialMode:
    | "BODY_TRACE"
    | "EMOTION_TIDE"
    | "THOUGHT_LINE"
    | "ACTION_VECTOR"
    | "MEMORY_DEPTH"
    | "GOAL_CORE";
}>;
