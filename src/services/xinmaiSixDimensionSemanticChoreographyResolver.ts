import type { SixSpaceId } from "../runtime/guanyaoRuntimeTypes";
import type { XinmaiSixDimensionSemanticGrammar } from "../types/xinmaiSixDimensionSemanticChoreography";
import { XINMAI_VISUAL_SEMANTIC_EXPERIENCE_POLICY } from "./xinmaiVisualSemanticExperiencePolicy";

const GRAMMARS: Readonly<Record<SixSpaceId, XinmaiSixDimensionSemanticGrammar>> =
  Object.freeze({
    body: Object.freeze({
      dimensionId: "body",
      label: "身体",
      question: "这件事靠近时，身体哪里先有反应？",
      responses: Object.freeze([
        Object.freeze({ id: "LOCATED", label: "我能指出一处", mirror: "身体先给了一个清楚的位置或节律信号。", mode: "CONFIRM" }),
        Object.freeze({ id: "UNLOCATED", label: "有反应，但说不清位置", mirror: "身体有了反应；位置还不需要被说清。", mode: "KEEP_OWN_MEANING" }),
        Object.freeze({ id: "PAUSE", label: "先停一下", mirror: "这次身体观察停在这里，尚未保存。", mode: "PAUSE" }),
      ]),
      acknowledgementLabel: "保存这次身体观察",
      spatialMode: "BODY_TRACE",
    }),
    emotion: Object.freeze({
      dimensionId: "emotion", label: "情绪", question: "此刻最靠近的感受，清楚到什么程度？",
      responses: Object.freeze([
        Object.freeze({ id: "CLEAR", label: "很明显", mirror: "这份感受有了可承认的强弱与质地。", mode: "CONFIRM" }),
        Object.freeze({ id: "MIXED", label: "有感觉，但混在一起", mirror: "几种感受可以同时在场，不必马上拆开。", mode: "KEEP_OWN_MEANING" }),
        Object.freeze({ id: "UNCERTAIN", label: "还说不清", mirror: "说不清也是此刻真实的情绪位置。", mode: "KEEP_OWN_MEANING" }),
      ]), acknowledgementLabel: "保存这次情绪观察", spatialMode: "EMOTION_TIDE",
    }),
    thought: Object.freeze({
      dimensionId: "thought", label: "想法", question: "这件事发生时，脑中最先出现哪句话或片段？",
      responses: Object.freeze([
        Object.freeze({ id: "SENTENCE", label: "我能认出一句", mirror: "一段正在解释现实的句子被你看见。", mode: "CONFIRM" }),
        Object.freeze({ id: "FRAGMENT", label: "只有片段或画面", mirror: "片段已经足够；系统不会替你补成结论。", mode: "KEEP_OWN_MEANING" }),
        Object.freeze({ id: "PRIVATE", label: "暂时不说", mirror: "内容仍由你保留；这里只记录你看见了它。", mode: "KEEP_OWN_MEANING" }),
      ]), acknowledgementLabel: "保存这次想法观察", spatialMode: "THOUGHT_LINE",
    }),
    action: Object.freeze({
      dimensionId: "action", label: "行动冲动", question: "你最先想做的是推进、退开，还是先停一下？",
      responses: Object.freeze([
        Object.freeze({ id: "ADVANCE", label: "马上推进", mirror: "推进是第一冲动，选择仍可以稍后发生。", mode: "CONFIRM" }),
        Object.freeze({ id: "WITHDRAW", label: "先退开", mirror: "退开是第一冲动，它不等于已经作出选择。", mode: "CONFIRM" }),
        Object.freeze({ id: "PAUSE", label: "先停一下", mirror: "第一冲动与可以暂停的位置被分开。", mode: "KEEP_OWN_MEANING" }),
      ]), acknowledgementLabel: "保存这次行动冲动观察", spatialMode: "ACTION_VECTOR",
    }),
    memory: Object.freeze({
      dimensionId: "memory", label: "记忆联想", question: "此刻像不像某个熟悉的时刻？",
      responses: Object.freeze([
        Object.freeze({ id: "THEN", label: "像过去的一幕", mirror: "过去的熟悉感被看见，但不替代现在。", mode: "CONFIRM" }),
        Object.freeze({ id: "NOW", label: "更像现在正在发生", mirror: "这次观察留在现在，不需要追溯过去。", mode: "CONFIRM" }),
        Object.freeze({ id: "UNCERTAIN", label: "还分不清", mirror: "过去与现在可以暂时保持未分。", mode: "KEEP_OWN_MEANING" }),
      ]), acknowledgementLabel: "保存这次记忆联想观察", spatialMode: "MEMORY_DEPTH",
    }),
    goal: Object.freeze({
      dimensionId: "goal", label: "需要与方向", question: "这份反应最不想失去的，是什么？",
      responses: Object.freeze([
        Object.freeze({ id: "NEED", label: "我能指出一个重要需要", mirror: "一个被保护的需要被看见，但没有变成人格结论。", mode: "CONFIRM" }),
        Object.freeze({ id: "VALUE", label: "只知道不想失去什么", mirror: "被珍视的部分已经出现，不必马上命名。", mode: "KEEP_OWN_MEANING" }),
        Object.freeze({ id: "UNCERTAIN", label: "暂时说不清", mirror: "说不清不会取消这份观察。", mode: "KEEP_OWN_MEANING" }),
      ]), acknowledgementLabel: "保存这次需要与方向观察", spatialMode: "GOAL_CORE",
    }),
  });

export function resolveXinmaiSixDimensionSemanticChoreography(
  dimensionId: SixSpaceId,
): XinmaiSixDimensionSemanticGrammar & Readonly<{ presentationMode: "MOTION" | "SAFE_STATIC" }> {
  return Object.freeze({
    ...GRAMMARS[dimensionId],
    presentationMode:
      XINMAI_VISUAL_SEMANTIC_EXPERIENCE_POLICY === "ENABLED"
        ? "MOTION"
        : "SAFE_STATIC",
  });
}
