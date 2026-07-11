import type {
  ChangeExperiencePresentation,
  ChangeExperiencePresentationInput,
} from "../../types/changeExperience";
import { actionFiveAwarenessChangeExperienceUnit } from "./changeExperienceFixtures";
import { actionFiveAwarenessExperienceModel } from "./personaTransmissionExperienceFixtures";

export const createChangeExperiencePresentation = (
  input: ChangeExperiencePresentationInput,
): ChangeExperiencePresentation => ({
  context: {
    pressureContext: input.changeExperience.context.pressureContext,
    currentSituation: input.changeExperience.context.currentSituation,
  },
  recognition: {
    oldReaction: input.changeExperience.recognition.oldReaction,
    protectionMeaning: input.changeExperience.recognition.protectionMeaning,
  },
  revision: {
    newResponse: input.changeExperience.revision.newResponse,
    transformationMoment: input.changeExperience.revision.transformationMoment,
  },
  meaning: {
    growthMeaning: input.changeExperience.meaning.growthMeaning,
    crystalImprint: input.changeExperience.meaning.crystalImprint,
  },
  visual: {
    starbeast: input.personaExperience.starbeast,
    trace: input.personaExperience.trace,
  },
});

export const actionFiveAwarenessChangeExperiencePresentation = createChangeExperiencePresentation({
  personaExperience: actionFiveAwarenessExperienceModel,
  changeExperience: actionFiveAwarenessChangeExperienceUnit,
});
