import type {
  ChangeExperiencePresentation,
  ChangeExperiencePresentationInput,
  ChangeExperiencePresentationVisual,
} from "../types/changeExperience";

const hasText = (value: string | undefined): value is string => typeof value === "string" && value.trim().length > 0;

export const CHANGE_EXPERIENCE_FIRST_RESPONSE_LABEL = "这一刻首先出现的回应";

const resolveVisual = (
  input: ChangeExperiencePresentationInput,
  fallbackVisual?: ChangeExperiencePresentationVisual,
): ChangeExperiencePresentationVisual => ({
  starbeast: {
    beforeState: hasText(input.personaExperience.starbeast.beforeLine)
      ? input.personaExperience.starbeast.beforeLine
      : fallbackVisual?.starbeast?.beforeState,
    afterState: hasText(input.personaExperience.starbeast.afterLine)
      ? input.personaExperience.starbeast.afterLine
      : fallbackVisual?.starbeast?.afterState,
    cueLine: hasText(input.personaExperience.starbeast.cueLine)
      ? input.personaExperience.starbeast.cueLine
      : fallbackVisual?.starbeast?.cueLine,
  },
  trace: {
    traceLine: hasText(input.personaExperience.trace.crystalLine)
      ? input.personaExperience.trace.crystalLine
      : fallbackVisual?.trace?.traceLine,
    crystalLine: input.changeExperience.meaning.crystalImprint,
  },
});

export const adaptChangeExperiencePresentation = (
  input: ChangeExperiencePresentationInput,
  fallbackVisual?: ChangeExperiencePresentationVisual,
): ChangeExperiencePresentation => ({
  context: {
    pressureContext: input.changeExperience.context.pressureContext,
    currentSituation: input.changeExperience.context.currentSituation,
  },
  recognition: {
    firstResponseLabel: CHANGE_EXPERIENCE_FIRST_RESPONSE_LABEL,
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
  visual: resolveVisual(input, fallbackVisual),
});

export const ChangeExperiencePresentationAdapter = {
  adaptChangeExperiencePresentation,
} as const;
