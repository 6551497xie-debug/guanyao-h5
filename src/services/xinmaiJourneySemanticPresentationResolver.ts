import type {
  XinmaiJourneySemanticNodeId,
  XinmaiJourneySemanticPresentation,
} from "../types/xinmaiJourneySemanticPresentation";
import {
  isXinmaiSemanticConstitutionExperienceEnabled,
  XINMAI_SEMANTIC_CONSTITUTION_EXPERIENCE_POLICY,
} from "./xinmaiSemanticConstitutionExperiencePolicy";

type Copy = Omit<XinmaiJourneySemanticPresentation, "nodeId" | "presentationMode" | "writesAuthority">;
const c = (purpose: string, explanation: string, primaryAction: string, secondaryAction: string, consequence: string, atmosphere: string | null): Copy =>
  Object.freeze({ purpose, explanation, primaryAction, secondaryAction, consequence, atmosphere });

const COPY: Readonly<Record<XinmaiJourneySemanticNodeId, Copy>> = Object.freeze({
  BIRTH_COORDINATE: c("确认你的出生时间坐标", "它只用于建立这次体验的时间起点，不判断命运。公历是你的输入，农历与时辰只是文化时间表达。", "确认时间坐标", "暂时不知道精确时间", "确认后进入体验化身的形成；信息不足时系统不会猜测。", "一颗时间坐标在星图中亮起"),
  GENESIS_FORMATION: c("正在形成你的体验化身", "它会作为这段旅程的视觉同行者，帮助你辨认连续体验，不代表对你的定义。", "继续", "稍后再来", "形成完成只表示视觉载体可用，不自动产生任何现实结论。", "星宿与星河只承载等待和连续感"),
  STAR_BEAST_CONTINUITY: c("这是陪你继续观察的化身", "你确认的是愿意以这个形象继续体验，而不是认出一个客观存在的生命。", "继续体验", "先离开", "继续后可选择写一句给此刻的自己，也可以直接进入现实。", "同行者在同一片星图中保持可辨认"),
  WHISPER: c("要不要写一句给此刻的自己？", "完全可选；不会参与分析、不会影响结果，原文也不会进入观察记录。", "写下这句话", "暂时不写，继续", "写或不写都能进入 Reality，已有资产不会受影响。", "一句话可以在此刻获得视觉回应"),
  NAMING: c("想给这位同行者一个称呼吗？", "这是第一轮完成后的可选关系动作，不影响记录或下一段现实。", "保存称呼", "以后再说", "跳过会直接继续；旧称呼只读保留。", "称呼只增加亲近感，不改变身份事实"),
  REALITY_SELECTION: c("此刻，哪一幕最像你正在面对的现实？", "选择最接近的一幕即可；这些是可辨认的压力情境，不是系统对你的判断。", "就是这一幕", "看看其他现实", "选中后进入六个观察窗口；暂停不会形成观察证据。", "场景从星河中显现，但选择始终属于用户"),
  SIX_DIMENSION_ENTRY: c("从六个角度看看反应是怎样出现的", "这不是人格测验。每一步都由你明确确认，不强烈、不确定或暂时保留都可以。", "开始观察", "暂时不做", "只有逐项最终保存才形成观察；进入页面、停留和动画都不算。", "六条路径围绕同一现实展开"),
  BODY: c("身体", "看看现实发生时最先出现的身体位置或节律；这不是健康诊断。", "保存身体观察", "先停一下", "保存后进入情绪；暂停不会结算这一维。", "光沿身体位置移动"),
  EMOTION: c("情绪", "辨认感受是清楚、混合还是暂时说不清；没有正确情绪。", "保存情绪观察", "返回查看选择", "保存后进入想法；不确定同样是有效选择。", "情绪以潮汐和明暗呈现"),
  THOUGHT: c("想法", "看见最先出现的一句话或片段；具体内容可以保留，系统不会保存自由文字。", "保存想法观察", "内容暂时保留", "保存后进入行动冲动；系统不会补写你的想法。", "片段像短线一样出现"),
  ACTION: c("行动冲动", "分辨最先想推进、退开还是暂停；冲动不等于已经行动。", "保存行动观察", "重新选择", "保存后进入记忆联想，真正的 Choice 稍后才形成。", "方向向量显示靠近、退开或暂停"),
  MEMORY: c("记忆联想", "只区分这更像过去还是现在，不要求披露任何经历。", "保存记忆观察", "暂时分不清", "保存后进入需要与方向；具体记忆不会被记录。", "远近景深帮助区分过去与现在"),
  GOAL: c("需要与方向", "看看这份反应试图保护的需要或价值，不把它变成人格结论。", "保存需要与方向观察", "暂时说不清", "第六项保存后只完成观察，仍不会自动形成 Choice 或现实事实。", "核心光点提示被珍视的方向"),
  RESPONSE_MAP: c("刚才这段反应是怎样连起来的", "这里只回看你实际保存的六项选择。三层问题是可修正的理解镜头，不是诊断或结论。", "带着这份理解继续", "返回查看", "继续后才进入微行动选择；三层答案不会被保存。", "六条观察路径汇入同一现实"),
  CHOICE: c("下一次，先试一个足够小的不同回应", "这是低风险、可撤销、回到现实验证的一小步，不是仪式承诺或最佳答案。", "带走这一步", "换一个更小的尝试", "确认后只是形成行动假设，行动尚未发生。", "一条可返回的路径被点亮"),
  DEPARTURE: c("把这一小步带回生活", "产品不会自动追踪现实；真正发生以后，再回来告诉这里结果。", "回到生活", "再看一次这一步", "离开只保存行动意图，不形成事实或生命痕迹。", "从星图回到日常生活"),
  RETURN: c("现实里实际发生了什么？", "只记录发生过的，不评价成功或失败。", "确认这是实际发生的", "还没尝试 / 不想记录", "只有明确确认的真实结果才可能继续形成可回看的痕迹。", "现实回声回到同一段记录"),
  NOT_ATTEMPTED: c("还没有在现实里试过，也没关系。", "这次不会留下成长记录；小行动会被保留，真正试过以后再从返回入口继续。", "先回到生活", "返回重新选择", "两个出口都形成零事实、零结晶。", null),
  USER_REJECTED_RECORD: c("不想留下这次记录，也可以。", "确认后本次不记录，已经形成的其他资产不会改变。", "确认不记录，回到生命世界", "返回重新选择", "两个出口都形成零事实、零结晶，也没有惩罚。", null),
  FORMATION: c("正在保存这次现实结果", "只有你刚才确认的事实会进入记录；视觉变化不代表形成已经完成。", "重新保存", "保留已确认内容并离开", "是否可重试严格由真实状态决定。", "痕迹逐渐清晰，但不承担成功判断"),
  CRYSTAL_OWNERSHIP: c("这次现实留下了一道可回看的痕迹", "它记录这次理解如何被现实修正，不是奖励、人格勋章或占卜结论。", "开始下一段现实", "可选：给同行者一个称呼", "下一段现实会建立新 Intent 与 Encounter；称呼完全可选。", "晶体只是这次模型更新的视觉载体"),
  ARCHIVE: c("你在现实中留下的观察记录", "每一条都来自你确认过的现实结果；这里不汇总人格或命运。", "查看这道痕迹", "开始下一段现实", "查看不会生成新资产；新一轮会建立独立的现实周期。", "星图呈现记录之间的时间与位置"),
  FRESH_REALITY: c("下一段现实，从另一幕开始", "上一段已经保留；这里会建立新的观察，并优先呈现另一条合格情境。", "选择这一幕", "回看已有痕迹", "选择后进入新一轮观察，不重写上一轮。", "星河展开另一条路径"),
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
