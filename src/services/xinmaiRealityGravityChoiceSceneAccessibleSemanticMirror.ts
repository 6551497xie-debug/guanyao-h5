import type {
  XinmaiRealityGravityChoiceSceneSemanticProjection,
} from "../types/xinmaiRealityGravityChoiceSceneSemanticPresentation";

export type XinmaiRealityGravityChoiceSceneAccessibleSemanticMirror =
  Readonly<{
    status:
      | "REALITY_APPROACHING"
      | "PRESSURE_RECOGNIZED"
      | "GRAVITY_OBSERVING"
      | "GRAVITY_RECOGNIZED"
      | "CHOICE_READY"
      | "CHOICE_COMMITTED"
      | "SAFE_WITHHELD";
    summary: string;
    transitionAnnouncement: string;
    authorityWriteback: "FORBIDDEN";
  }>;

export function resolveXinmaiRealityGravityChoiceSceneAccessibleSemanticMirror(
  projection: XinmaiRealityGravityChoiceSceneSemanticProjection | null,
): XinmaiRealityGravityChoiceSceneAccessibleSemanticMirror {
  if (projection === null || projection.status === "SAFE_WITHHELD") {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      summary: "当前空间变化暂时无法确认。原有生命与操作仍被保留。",
      transitionAnnouncement: "当前空间变化暂时无法确认。",
      authorityWriteback: "FORBIDDEN" as const,
    });
  }
  switch (projection.semanticStage) {
    case "REALITY_APPROACHING":
      return Object.freeze({
        status: projection.semanticStage,
        summary: "当前还没有选定现实情境。请从可辨认的场景中选择最接近的一幕。",
        transitionAnnouncement: "现实情境选项已经出现。",
        authorityWriteback: "FORBIDDEN" as const,
      });
    case "PRESSURE_RECOGNIZED":
      return Object.freeze({
        status: projection.semanticStage,
        summary: "你已选择这段现实情境。接下来看看自己的回应怎样出现。",
        transitionAnnouncement: "这段现实情境已选择。",
        authorityWriteback: "FORBIDDEN" as const,
      });
    case "GRAVITY_OBSERVING":
      return Object.freeze({
        status: projection.semanticStage,
        summary: "正在观察这条回应怎样保护你，以及它带来的代价。",
        transitionAnnouncement: "可以开始观察这条回应。",
        authorityWriteback: "FORBIDDEN" as const,
      });
    case "GRAVITY_RECOGNIZED":
      return Object.freeze({
        status: projection.semanticStage,
        summary: "这次观察已经确认。保护与代价同时保留。",
        transitionAnnouncement: "这次观察已经确认。",
        authorityWriteback: "FORBIDDEN" as const,
      });
    case "CHOICE_READY":
      return Object.freeze({
        status: projection.semanticStage,
        summary: "可选择的行动空间已经准备好。选择仍由你决定。",
        transitionAnnouncement: "现在可以比较并决定下一步。",
        authorityWriteback: "FORBIDDEN" as const,
      });
    case "CHOICE_COMMITTED":
      return Object.freeze({
        status: projection.semanticStage,
        summary: "这一步已经保存，但真实行动还没有被宣称完成。",
        transitionAnnouncement: "这一步已经保存，接下来发生在真实生活。",
        authorityWriteback: "FORBIDDEN" as const,
      });
  }
}
