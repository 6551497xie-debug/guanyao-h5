import type { ChangeExperiencePresentationInput } from "../../types/changeExperience";
import { adaptChangeExperiencePresentation } from "../changeExperiencePresentationAdapter";
import { actionFiveAwarenessChangeExperienceUnit } from "./changeExperienceFixtures";
import { actionFiveAwarenessExperienceModel } from "./personaTransmissionExperienceFixtures";

export const createChangeExperiencePresentation = (input: ChangeExperiencePresentationInput) =>
  adaptChangeExperiencePresentation(input);

export const actionFiveAwarenessChangeExperiencePresentation = createChangeExperiencePresentation({
  personaExperience: actionFiveAwarenessExperienceModel,
  changeExperience: actionFiveAwarenessChangeExperienceUnit,
});
