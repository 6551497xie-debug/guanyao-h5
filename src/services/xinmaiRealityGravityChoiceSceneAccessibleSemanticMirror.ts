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
        summary: "同一生命仍在。现实正在靠近，还没有被认出。",
        transitionAnnouncement: "现实正在靠近同一生命。",
        authorityWriteback: "FORBIDDEN" as const,
      });
    case "PRESSURE_RECOGNIZED":
      return Object.freeze({
        status: projection.semanticStage,
        summary: "你已经认出这条现实。它仍在同一生命中显现。",
        transitionAnnouncement: "这条现实已经被认出。",
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
