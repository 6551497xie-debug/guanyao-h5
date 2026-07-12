import type {
  ChangeExperiencePresentation,
  ChangeExperiencePresentationInput,
  ChangeExperiencePresentationVisual,
  ChangeExperienceUnit,
} from "../../types/changeExperience";
import type { PersonaTransmissionExperienceModel } from "../../types/personaTransmission";
import { adaptChangeExperiencePresentation } from "../changeExperiencePresentationAdapter";
import {
  actionFiveAwarenessChangeExperienceUnit,
  bodyAwarenessChangeExperienceUnit,
  emotionChangeAwarenessChangeExperienceUnit,
  memoryWisdomChangeExperienceUnit,
  motivationDriveChangeExperienceUnit,
  thoughtChangeCognitionChangeExperienceUnit,
} from "./changeExperienceFixtures";
import { actionFiveAwarenessExperienceModel } from "./personaTransmissionExperienceFixtures";

export const createChangeExperiencePresentation = (input: ChangeExperiencePresentationInput) =>
  adaptChangeExperiencePresentation(input);

const createFallbackPersonaExperienceModel = (
  changeExperience: ChangeExperienceUnit,
): PersonaTransmissionExperienceModel => ({
  status: "READY",
  identity: {
    unitId: `${changeExperience.dimension}-change-experience`,
    dimension: changeExperience.dimension,
    yaoStage: "awareness",
  },
  orientation: {
    pressureLine: "",
    currentRoundLine: "",
  },
  recognition: {
    oldModelLine: "",
    inertiaLine: "",
    insightLine: "",
  },
  revision: {
    directionLine: "",
    microActionLine: "",
  },
  starbeast: {
    beforeLine: "",
    afterLine: "",
    cueLine: "",
  },
  trace: {
    crystalLine: "",
    depositsToCrystal: false,
    depositsToRingLite: false,
  },
});

export const createStaticChangeExperiencePresentation = (
  changeExperience: ChangeExperienceUnit,
  visual: ChangeExperiencePresentationVisual,
): ChangeExperiencePresentation =>
  adaptChangeExperiencePresentation(
    {
      personaExperience: createFallbackPersonaExperienceModel(changeExperience),
      changeExperience,
    },
    visual,
  );

export const actionFiveAwarenessChangeExperiencePresentation = createChangeExperiencePresentation({
  personaExperience: actionFiveAwarenessExperienceModel,
  changeExperience: actionFiveAwarenessChangeExperienceUnit,
});

export const bodyAwarenessChangeExperiencePresentation = createStaticChangeExperiencePresentation(
  bodyAwarenessChangeExperienceUnit,
  {
    starbeast: {
      beforeState: "兽体收紧，呼吸光变短。",
      afterState: "兽体重新稳定，核心光缓慢展开。",
      cueLine: "紧绷开始松开，身体从命令变成提醒。",
    },
    trace: {
      traceLine: "从自动防御，移动到先感知身体。",
      crystalLine: bodyAwarenessChangeExperienceUnit.meaning.crystalImprint,
    },
  },
);

export const emotionChangeAwarenessChangeExperiencePresentation = createStaticChangeExperiencePresentation(
  emotionChangeAwarenessChangeExperienceUnit,
  {
    starbeast: {
      beforeState: "光场震荡，边缘不稳。",
      afterState: "光场边界重新出现，震荡被承接。",
      cueLine: "情绪没有被压下，它开始成为信号。",
    },
    trace: {
      traceLine: "从被情绪推动，移动到能观察情绪。",
      crystalLine: emotionChangeAwarenessChangeExperienceUnit.meaning.crystalImprint,
    },
  },
);

export const thoughtChangeCognitionChangeExperiencePresentation = createStaticChangeExperiencePresentation(
  thoughtChangeCognitionChangeExperienceUnit,
  {
    starbeast: {
      beforeState: "光轨固定在单一路径上。",
      afterState: "光轨出现多个可观察路径。",
      cueLine: "解释不再封住现实，新的理解路径出现。",
    },
    trace: {
      traceLine: "从相信解释，移动到观察解释。",
      crystalLine: thoughtChangeCognitionChangeExperienceUnit.meaning.crystalImprint,
    },
  },
);

export const memoryWisdomChangeExperiencePresentation = createStaticChangeExperiencePresentation(
  memoryWisdomChangeExperienceUnit,
  {
    starbeast: {
      beforeState: "旧光轨重复回到同一路径。",
      afterState: "旧轨迹旁出现新的前进路径。",
      cueLine: "过去没有被否定，它开始成为参考。",
    },
    trace: {
      traceLine: "从过去覆盖现在，移动到经验服务当前。",
      crystalLine: memoryWisdomChangeExperienceUnit.meaning.crystalImprint,
    },
  },
);

export const motivationDriveChangeExperiencePresentation = createStaticChangeExperiencePresentation(
  motivationDriveChangeExperienceUnit,
  {
    starbeast: {
      beforeState: "光线被外部方向拉扯，核心不稳。",
      afterState: "光线向内聚合，核心重新成形。",
      cueLine: "推动你的力量开始被看见，而不是只被外部牵动。",
    },
    trace: {
      traceLine: "从被外部结果牵引，移动到理解内在动力。",
      crystalLine: motivationDriveChangeExperienceUnit.meaning.crystalImprint,
    },
  },
);
