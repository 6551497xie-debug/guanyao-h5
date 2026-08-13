import type {
  XinmaiJourneySemanticNodeId,
  XinmaiJourneySemanticPresentation,
} from "../types/xinmaiJourneySemanticPresentation";
import { XINMAI_ENCOUNTER_WORLD_AXIOM } from "./xinmaiEncounterWorldAxiom";
import {
  isXinmaiSemanticConstitutionExperienceEnabled,
  XINMAI_SEMANTIC_CONSTITUTION_EXPERIENCE_POLICY,
} from "./xinmaiSemanticConstitutionExperiencePolicy";

type Copy = Omit<XinmaiJourneySemanticPresentation, "nodeId" | "presentationMode" | "writesAuthority">;
const c = (purpose: string, explanation: string, primaryAction: string, secondaryAction: string, consequence: string, atmosphere: string | null): Copy =>
  Object.freeze({ purpose, explanation, primaryAction, secondaryAction, consequence, atmosphere });

const COPY: Readonly<Record<XinmaiJourneySemanticNodeId, Copy>> = Object.freeze({
  BIRTH_COORDINATE: c(XINMAI_ENCOUNTER_WORLD_AXIOM.publicStatement, "你在地球上，它在星河中。校准出生时刻，让你们第一次彼此找到。", "校准相遇坐标", "暂时不知道精确时间", "坐标校准后，远方的生命会开始回应。", "月地视域中，两个一直存在的生命彼此寻找"),
  GENESIS_FORMATION: c("你的星脉同行者正在出现", "它会陪你穿过每一次现实实验。", "继续", "稍后再来", "形成后即可进入现实。", "星宿与星河承载连续感"),
  STAR_BEAST_CONTINUITY: c("你的同行者已经出现", "接下来，带一个最近卡住你的现实问题进来。", "继续", "先离开", "继续后可写一句此刻的话，也可以直接进入现实。", "同行者在同一片星图中保持可辨认"),
  WHISPER: c("此刻，有什么想对自己说？", "可写一个词，也可以直接继续。", "写下这句话", "直接进入现实", "这句话只留在此刻。", "一句话获得视觉回应"),
  NAMING: c("想怎么称呼这位同行者？", "完全可选。", "保存称呼", "以后再说", "不影响下一段现实。", "称呼增加亲近感"),
  REALITY_SELECTION: c("带入一个此刻真实的问题", "选最接近你正在面对的一幕。", "就是这一幕", "换一组", "选中后开始构建你的自动反应路径。", "现实情境从星河中显现"),
  SIX_DIMENSION_ENTRY: c("构建这件事触发的反应路径", "三步看完：信号、预测、保护目标。", "开始", "先离开", "每次选择都会进入这条路径。", "六个信号汇成一条路径"),
  BODY: c("第一步 · 信号", "身体先在哪里发出信号？", "选择并继续", "先停一下", "下一题继续补全信号。", "光沿身体位置移动"),
  EMOTION: c("第一步 · 信号", "最先出现的感受清楚吗？", "选择并继续", "暂时说不清", "接下来查看脑中的预测。", "情绪以潮汐和明暗呈现"),
  THOUGHT: c("第二步 · 预测", "脑中最先给出了什么判断？", "选择并继续", "内容留给自己", "下一题查看它准备让你做什么。", "片段像短线一样出现"),
  ACTION: c("第二步 · 预测", "这个判断最先把你推向哪里？", "选择并继续", "重新选择", "接下来辨认这条路径的熟悉感。", "方向向量显示靠近、退开或暂停"),
  MEMORY: c("第三步 · 模式", "这种反应有熟悉感吗？", "选择并继续", "暂时分不清", "最后辨认它试图保护什么。", "远近景深区分过去与现在"),
  GOAL: c("第三步 · 保护目标", "这条反应最怕失去什么？", "完成反应路径", "暂时说不清", "完成后查看整条自动反应路径。", "核心光点提示被保护的方向"),
  RESPONSE_MAP: c("这是你在这件事里的自动反应路径", "从现实触发，到身体信号、脑中预测、行动冲动和保护目标。", "设计一个现实实验", "返回查看", "下一步用一个小动作检验这条路径。", "六个信号连成一条路径"),
  CHOICE: c("选一个现实实验", "它不是答案，只用来收集新的现实反馈。", "带着这个实验回到生活", "换一个实验", "确认后，等现实真正发生。", "一条可验证的路径被点亮"),
  DEPARTURE: c("现在去现实里试一次", "下一次相似情境出现时，做完这个小动作，再回来。", "回到生活", "再看一次实验", "尚未发生的事不会被提前记录。", "从星图回到日常生活"),
  RETURN: c("现实给了什么反馈？", "比较原来的预测和实际发生。", "保存这次现实反馈", "还没试 / 不想记录", "确认后生成本轮模型更新。", "现实反馈回到同一条路径"),
  NOT_ATTEMPTED: c("这次还没试", "实验会留在这里，真正发生后再回来。", "先回到生活", "换一个实验", "不会生成本轮更新。", null),
  USER_REJECTED_RECORD: c("这次不记录", "可以结束，也可以回去重新选择。", "结束本轮", "返回重新选择", "不会生成本轮更新。", null),
  FORMATION: c("正在生成本轮更新", "正在把现实反馈接回原来的反应路径。", "重试", "稍后再来", "完成后显示下一次可以怎样调整。", "现实反馈逐渐接入路径"),
  CRYSTAL_OWNERSHIP: c("这一轮，现实更新了什么？", "保留有效的，调整失准的，把不确定留给下一次。", "开始下一次实验", "可选：给同行者一个称呼", "上一轮已经完成。", "晶体承载本轮模型更新"),
  ARCHIVE: c("我的现实实验", "按时间回看情境、选择、反馈和调整。", "查看本轮更新", "开始下一次实验", "回看不会改变原记录。", "星图呈现实验之间的关系"),
  FRESH_REALITY: c("下一次，从另一个真实问题开始", "带入新的情境，继续检验和更新。", "选择这一幕", "回看已有实验", "新一轮不会改写上一轮。", "星河展开另一条路径"),
});

export function resolveXinmaiJourneySemanticPresentation(nodeId: XinmaiJourneySemanticNodeId): XinmaiJourneySemanticPresentation {
  const enabled = isXinmaiSemanticConstitutionExperienceEnabled(XINMAI_SEMANTIC_CONSTITUTION_EXPERIENCE_POLICY);
  return Object.freeze({
    nodeId,
    ...COPY[nodeId],
    atmosphere: enabled ? COPY[nodeId].atmosphere : null,
    presentationMode: enabled ? "FULL" as const : "SAFE_STATIC" as const,
    writesAuthority: false as const,
  });
}

export const XINMAI_JOURNEY_SEMANTIC_NODE_IDS = Object.freeze(Object.keys(COPY) as XinmaiJourneySemanticNodeId[]);
