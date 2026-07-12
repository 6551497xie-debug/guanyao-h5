import type {
  ChangeExperiencePresentation,
  ChangeExperiencePresentationInput,
} from "../types/changeExperience";

export const adaptChangeExperiencePresentation = (
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
    starbeast: {
      beforeState: input.personaExperience.starbeast.beforeLine,
      afterState: input.personaExperience.starbeast.afterLine,
      cueLine: input.personaExperience.starbeast.cueLine,
    },
    trace: {
      traceLine: input.personaExperience.trace.crystalLine,
      crystalLine: input.changeExperience.meaning.crystalImprint,
    },
  },
});

export const ChangeExperiencePresentationAdapter = {
  adaptChangeExperiencePresentation,
} as const;
