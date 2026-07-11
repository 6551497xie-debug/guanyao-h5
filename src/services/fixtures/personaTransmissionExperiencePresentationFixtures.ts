import type { PersonaTransmissionExperienceModel } from "../../types/personaTransmission";
import { actionFiveAwarenessExperienceModel } from "./personaTransmissionExperienceFixtures";

export type PersonaTransmissionExperiencePresentation = Readonly<{
  identity: Readonly<{
    unitId: string;
    dimension: string;
    yaoStage: string;
  }>;
  orientation: Readonly<{
    question: "发生了什么？";
    line: string;
    supportingLine?: string;
  }>;
  recognition: Readonly<{
    question: "为什么会这样？";
    oldModelLine: string;
    inertiaLine: string;
    insightLine: string;
  }>;
  revision: Readonly<{
    question: "我可以怎么不同？";
    directionLine: string;
    microActionLine: string;
  }>;
  starbeast: Readonly<{
    question: "我的变化如何发生？";
    beforeLine: string;
    afterLine: string;
    cueLine: string;
  }>;
  trace: Readonly<{
    question: "变化在哪里留下？";
    crystalLine: string;
    depositsToCrystal: boolean;
    depositsToRingLite: boolean;
  }>;
}>;

export const createPersonaTransmissionExperiencePresentation = (
  experience: PersonaTransmissionExperienceModel,
): PersonaTransmissionExperiencePresentation => ({
  identity: {
    unitId: experience.identity.unitId,
    dimension: experience.identity.dimension,
    yaoStage: experience.identity.yaoStage,
  },
  orientation: {
    question: "发生了什么？",
    line: experience.orientation.pressureLine,
    supportingLine: experience.orientation.currentRoundLine,
  },
  recognition: {
    question: "为什么会这样？",
    oldModelLine: experience.recognition.oldModelLine,
    inertiaLine: experience.recognition.inertiaLine,
    insightLine: experience.recognition.insightLine,
  },
  revision: {
    question: "我可以怎么不同？",
    directionLine: experience.revision.directionLine,
    microActionLine: experience.revision.microActionLine,
  },
  starbeast: {
    question: "我的变化如何发生？",
    beforeLine: experience.starbeast.beforeLine,
    afterLine: experience.starbeast.afterLine,
    cueLine: experience.starbeast.cueLine,
  },
  trace: {
    question: "变化在哪里留下？",
    crystalLine: experience.trace.crystalLine,
    depositsToCrystal: experience.trace.depositsToCrystal,
    depositsToRingLite: experience.trace.depositsToRingLite,
  },
});

export const actionFiveAwarenessExperiencePresentation =
  createPersonaTransmissionExperiencePresentation(actionFiveAwarenessExperienceModel);
