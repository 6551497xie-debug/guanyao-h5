import type { SixSpaceId } from "../runtime/guanyaoRuntimeTypes";
import type { XinmaiSixDimensionSemanticGrammar } from "../types/xinmaiSixDimensionSemanticChoreography";
import { XINMAI_VISUAL_SEMANTIC_EXPERIENCE_POLICY } from "./xinmaiVisualSemanticExperiencePolicy";

const GRAMMARS: Readonly<Record<SixSpaceId, XinmaiSixDimensionSemanticGrammar>> =
  Object.freeze({
    body: Object.freeze({
      dimensionId: "body",
      label: "身体",
      question: "刚才那一幕出现时，身体先在哪里发出信号？",
      responses: Object.freeze([
        Object.freeze({ id: "LOCATED", label: "有一个明确位置", mirror: "身体先发出了明确的位置或节律信号。", mode: "CONFIRM" }),
        Object.freeze({ id: "UNLOCATED", label: "有反应，但位置不清楚", mirror: "身体先有了反应，位置还不清楚。", mode: "KEEP_OWN_MEANING" }),
        Object.freeze({ id: "PAUSE", label: "先离开这个问题", mirror: "身体信号暂时没有进入这条路径。", mode: "PAUSE" }),
      ]),
      acknowledgementLabel: "保存这次身体观察",
      spatialMode: "BODY_TRACE",
    }),
    emotion: Object.freeze({
      dimensionId: "emotion", label: "感受", question: "紧接着出现的感受，清楚吗？",
      responses: Object.freeze([
        Object.freeze({ id: "CLEAR", label: "很清楚", mirror: "一个清楚的感受紧接着出现。", mode: "CONFIRM" }),
        Object.freeze({ id: "MIXED", label: "几种感受混在一起", mirror: "几种感受同时出现。", mode: "KEEP_OWN_MEANING" }),
        Object.freeze({ id: "UNCERTAIN", label: "有感觉，但说不清", mirror: "感受已经出现，只是暂时说不清。", mode: "KEEP_OWN_MEANING" }),
      ]), acknowledgementLabel: "保存这次情绪观察", spatialMode: "EMOTION_TIDE",
    }),
    thought: Object.freeze({
      dimensionId: "thought", label: "判断", question: "脑中最先给出了什么判断？",
      responses: Object.freeze([
        Object.freeze({ id: "SENTENCE", label: "是一句明确的话", mirror: "脑中很快给出了一句明确判断。", mode: "CONFIRM" }),
        Object.freeze({ id: "FRAGMENT", label: "是片段或画面", mirror: "脑中先出现了片段或画面。", mode: "KEEP_OWN_MEANING" }),
        Object.freeze({ id: "PRIVATE", label: "我知道，但内容留给自己", mirror: "判断已经被你认出，内容仍由你保留。", mode: "KEEP_OWN_MEANING" }),
      ]), acknowledgementLabel: "保存这次想法观察", spatialMode: "THOUGHT_LINE",
    }),
    action: Object.freeze({
      dimensionId: "action", label: "行动倾向", question: "这个判断最先把你推向哪里？",
      responses: Object.freeze([
        Object.freeze({ id: "ADVANCE", label: "立刻推进或解决", mirror: "自动反应准备立刻推进。", mode: "CONFIRM" }),
        Object.freeze({ id: "WITHDRAW", label: "退开或回避", mirror: "自动反应准备退开。", mode: "CONFIRM" }),
        Object.freeze({ id: "PAUSE", label: "先停住，不马上行动", mirror: "自动反应准备暂停。", mode: "KEEP_OWN_MEANING" }),
      ]), acknowledgementLabel: "保存这次行动冲动观察", spatialMode: "ACTION_VECTOR",
    }),
    memory: Object.freeze({
      dimensionId: "memory", label: "熟悉感", question: "这种反应，过去也出现过吗？",
      responses: Object.freeze([
        Object.freeze({ id: "THEN", label: "很熟悉，过去也有", mirror: "这条反应带着过去的熟悉感。", mode: "CONFIRM" }),
        Object.freeze({ id: "NOW", label: "更像这次才出现", mirror: "这条反应更像由当前情境触发。", mode: "CONFIRM" }),
        Object.freeze({ id: "UNCERTAIN", label: "暂时分不清", mirror: "它是否重复过去，暂时还不确定。", mode: "KEEP_OWN_MEANING" }),
      ]), acknowledgementLabel: "保存这次记忆联想观察", spatialMode: "MEMORY_DEPTH",
    }),
    goal: Object.freeze({
      dimensionId: "goal", label: "保护目标", question: "这条反应最怕失去什么？",
      responses: Object.freeze([
        Object.freeze({ id: "NEED", label: "一个现实需要", mirror: "这条反应正在保护一个现实需要。", mode: "CONFIRM" }),
        Object.freeze({ id: "VALUE", label: "一种重要价值", mirror: "这条反应正在保护一种重要价值。", mode: "KEEP_OWN_MEANING" }),
        Object.freeze({ id: "UNCERTAIN", label: "我还不知道", mirror: "这条反应想保护什么，仍需要现实反馈。", mode: "KEEP_OWN_MEANING" }),
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
