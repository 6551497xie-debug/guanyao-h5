import type { SixSpaceId } from "../runtime/guanyaoRuntimeEngine";
import type {
  DynamicsExperiencePrimaryFocus,
  DynamicsExperienceStage,
  DynamicsExperienceState,
} from "../types/dynamicsExperiencePresentation";

export type DynamicsExperienceStateAdapterInput = Readonly<{
  completedNodeCount: number;
  currentNode: number;
  enginePhase: "INIT" | "SEED_ACTIVE" | "NODE_RUNNING" | "COMPLETE";
  uiPhase: "INIT" | "SEED_ACTIVE" | "DIMENSION_LOCKED" | "NODE_RUNNING" | "COMPLETE";
  focalDimension: SixSpaceId;
  timelineCurrent: "T0.0" | "T0.95" | "T2.4" | "T3.6" | "completion";
  loopLabel: string;
}>;

const SIX_DIMENSION_RESPONSE_COPY: Record<SixSpaceId, string> = {
  body: "压力先落在身体里。",
  emotion: "情绪先到了。",
  thought: "解释开始成形。",
  action: "回应的方向露出来了。",
  memory: "旧经验被带到了现在。",
  goal: "守护的核心露出来了。",
};

const SIX_DIMENSION_INSIGHT_COPY: Record<SixSpaceId, string> = {
  body: "身体比意识更早知道压力来了。",
  emotion: "你正在经历的感受，可能让这件事看起来更重。",
  thought: "你看见的不只是事情，还有你给它的意义。",
  action: "结果还不确定时，你会先用行动把局面拉回掌控。",
  memory: "过去正在参与此刻，让现在像曾经的某一幕。",
  goal: "这些反应背后，有一个你不想失去的重要东西。",
};

const SIX_DIMENSION_UNDERSTANDING_COPY: Record<SixSpaceId, string> = {
  body: "先感到它，是身体在帮你准备回应。",
  emotion: "它不是问题，它是在提醒你哪里需要被照看。",
  thought: "这种解释曾帮你抓住确定感。",
  action: "行动力是能力，现在需要先判断再出手。",
  memory: "它曾保护你，这一次可以只作为参考。",
  goal: "动机不是计划，是你正在保护的价值感。",
};

const YAO_SEMANTIC_STAGES: Record<number, DynamicsExperienceState["nodeCopy"]> = {
  1: {
    title: "压力刚开始出现",
    text: "你开始注意到这一层的反应。",
    actionText: "先看见它从哪里开始。",
  },
  2: {
    title: "熟悉的反应正在出现",
    text: "你可能正在回到以前常用的方式。",
    actionText: "你正在回到熟悉的保护方式。",
  },
  3: {
    title: "你开始解释这件事",
    text: "你开始用过去的方式解释现在。",
    actionText: "先看见脑中的那句话。",
  },
  4: {
    title: "这个反应正在变熟悉",
    text: "这个反应逐渐成为习惯。",
    actionText: "它快要变成惯常动作。",
  },
  5: {
    title: "你开始看见自己",
    text: "你开始看见自己熟悉的反应。",
    actionText: "这个反应被你看见了。",
  },
  6: {
    title: "新的回应开始出现",
    text: "新的回应开始出现。",
    actionText: "这一层，可以留下新的走法。",
  },
};

export function resolveDynamicsExperienceState(
  input: DynamicsExperienceStateAdapterInput,
): DynamicsExperienceState {
  const nodeNumber = Math.min(6, Math.max(1, input.currentNode));
  const stage: DynamicsExperienceStage =
    input.enginePhase === "COMPLETE" || input.completedNodeCount >= 6
      ? "CRYSTAL"
      : input.completedNodeCount >= 5
        ? "TRANSFORMATION"
        : input.uiPhase === "NODE_RUNNING"
          ? "ACTION"
          : input.uiPhase === "DIMENSION_LOCKED"
            ? "AWARENESS"
            : "PRESSURE";
  const primaryFocus: DynamicsExperiencePrimaryFocus =
    stage === "CRYSTAL"
      ? "CRYSTALLIZATION"
      : stage === "TRANSFORMATION" || stage === "ACTION"
        ? "DIMENSION_FLOW"
        : stage === "AWARENESS"
          ? "BEAST_AND_DIMENSION"
          : input.timelineCurrent === "T0.95"
            ? "PRESSURE_AND_BEAST"
            : "PRESSURE_FIELD";
  const yaoStageCopy = YAO_SEMANTIC_STAGES[nodeNumber] ?? YAO_SEMANTIC_STAGES[1];
  const dimensionResponse = SIX_DIMENSION_RESPONSE_COPY[input.focalDimension] ?? "这一层，留下了痕迹。";
  const nodeCopy = {
    title: yaoStageCopy.title,
    text: `${yaoStageCopy.text}\n${dimensionResponse}`,
    dimensionInsight: SIX_DIMENSION_INSIGHT_COPY[input.focalDimension],
    dimensionUnderstanding: SIX_DIMENSION_UNDERSTANDING_COPY[input.focalDimension],
    actionText: yaoStageCopy.actionText,
  };

  if (stage === "CRYSTAL") {
    return Object.freeze({
      stage,
      primaryFocus,
      loopLabel: input.loopLabel,
      headline: "六个空间已经走完。",
      supportingCopy: "当你愿意认领一个新的回应，这一局会留下它发生过的变化印记。",
      pressureCopy: "这一颗压力已经被你看过一遍。",
      beastCopy: "你与星兽已经一起走过六个空间，现在可以回望这次变化。",
      nodeCopy: {
        title: "六个空间已经走完",
        text: "你走完了六层。",
        actionText: "准备好时，你可以认领一个新的回应。",
      },
      crystalCopy: "你走完了六层。准备好时，你可以认领一个新的回应，让这一局的变化留下印记。",
    });
  }

  if (stage === "TRANSFORMATION") {
    return Object.freeze({
      stage,
      primaryFocus,
      loopLabel: input.loopLabel,
      headline: "你已经从多个方向看见这件事。",
      supportingCopy: "有些感受开始连在一起，一个不同的回应正在靠近。",
      pressureCopy: "这件事已经被你从几个空间看过。",
      beastCopy: "你与星兽正在一起辨认，这一次愿意往哪里走。",
      nodeCopy,
      crystalCopy: "这一局的变化正在发生，还不需要得出答案。",
    });
  }

  if (stage === "ACTION") {
    return Object.freeze({
      stage,
      primaryFocus,
      loopLabel: input.loopLabel,
      headline: "你正在看见，回应是怎样一层层发生的。",
      supportingCopy: "一次只看一个空间，不需要同时理解全部。",
      pressureCopy: "这件事正在落进当前空间。",
      beastCopy: "你与星兽正在一起辨认这里的感受与回应。",
      nodeCopy,
      crystalCopy: "完成六维后，准备好时，你可以认领一个新的回应。",
    });
  }

  if (stage === "AWARENESS") {
    return Object.freeze({
      stage,
      primaryFocus,
      loopLabel: input.loopLabel,
      headline: "你已经停下来，看见这一刻。",
      supportingCopy: "接下来，看看这件事如何落在身体、情绪、思想、行动、记忆与动机里。",
      pressureCopy: "这件事已经被你放在眼前。",
      beastCopy: "你与星兽会一起走进第一个空间。",
      nodeCopy,
      crystalCopy: "完成六维后，准备好时，你可以认领一个新的回应。",
    });
  }

  return Object.freeze({
    stage,
    primaryFocus,
    loopLabel: input.loopLabel,
    headline: "这一刻，你的感受和回应正在出现。",
    supportingCopy: "先不用改变什么，只看见此刻发生了什么。",
    pressureCopy: "这件事已经来到你面前。",
    beastCopy: "你与星兽会从这里一起看见，回应如何发生。",
    nodeCopy,
    crystalCopy: "这一局刚刚开始，先看见此刻的回应。",
  });
}
