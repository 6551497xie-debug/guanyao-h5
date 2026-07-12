import type { ChangeExperiencePresentation } from "../../types/changeExperience";

export type ChangeExperiencePresentationValidationStatus =
  | "VALID_CHANGE_EXPERIENCE_PRESENTATION"
  | "CHANGE_EXPERIENCE_PRESENTATION_INVALID";

export type ChangeExperiencePresentationValidationReason =
  | "CONTEXT_INCOMPLETE"
  | "RECOGNITION_INCOMPLETE"
  | "REVISION_INCOMPLETE"
  | "MEANING_INCOMPLETE"
  | "VISUAL_INVALID"
  | "INVALID_PRESENTATION_BOUNDARY";

export type ChangeExperiencePresentationValidationResult = Readonly<{
  status: ChangeExperiencePresentationValidationStatus;
  reasons: readonly ChangeExperiencePresentationValidationReason[];
}>;

const forbiddenPresentationFields = new Set([
  "readiness",
  "status",
  "crystallized",
  "deflectionVector",
  "impact",
  "hexagramCode",
  "currentCrystalEndState",
  "storage",
  "score",
  "level",
]);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const hasText = (value: unknown): value is string => typeof value === "string" && value.trim().length > 0;

const hasForbiddenPresentationField = (value: unknown): boolean => {
  if (Array.isArray(value)) {
    return value.some(hasForbiddenPresentationField);
  }

  if (!isRecord(value)) {
    return false;
  }

  return Object.entries(value).some(([key, nestedValue]) => {
    if (forbiddenPresentationFields.has(key)) {
      return true;
    }

    return hasForbiddenPresentationField(nestedValue);
  });
};

export const validateChangeExperiencePresentation = (
  presentation: unknown,
): ChangeExperiencePresentationValidationResult => {
  const reasons: ChangeExperiencePresentationValidationReason[] = [];

  if (!isRecord(presentation)) {
    return {
      status: "CHANGE_EXPERIENCE_PRESENTATION_INVALID",
      reasons: ["CONTEXT_INCOMPLETE", "RECOGNITION_INCOMPLETE", "REVISION_INCOMPLETE", "MEANING_INCOMPLETE"],
    };
  }

  if (hasForbiddenPresentationField(presentation)) {
    reasons.push("INVALID_PRESENTATION_BOUNDARY");
  }

  const context = presentation.context;
  if (
    !isRecord(context) ||
    !hasText(context.pressureContext) ||
    !hasText(context.currentSituation)
  ) {
    reasons.push("CONTEXT_INCOMPLETE");
  }

  const recognition = presentation.recognition;
  if (!isRecord(recognition) || !hasText(recognition.oldReaction) || !hasText(recognition.protectionMeaning)) {
    reasons.push("RECOGNITION_INCOMPLETE");
  }

  const revision = presentation.revision;
  if (!isRecord(revision) || !hasText(revision.newResponse) || !hasText(revision.transformationMoment)) {
    reasons.push("REVISION_INCOMPLETE");
  }

  const meaning = presentation.meaning;
  if (!isRecord(meaning) || !hasText(meaning.growthMeaning) || !hasText(meaning.crystalImprint)) {
    reasons.push("MEANING_INCOMPLETE");
  }

  const visual = presentation.visual;
  if (!isRecord(visual)) {
    reasons.push("VISUAL_INVALID");
  } else {
    const starbeast = visual.starbeast;
    const trace = visual.trace;
    const hasValidStarbeast =
      starbeast === undefined ||
      (isRecord(starbeast) &&
        (starbeast.beforeState === undefined || hasText(starbeast.beforeState)) &&
        (starbeast.afterState === undefined || hasText(starbeast.afterState)) &&
        (starbeast.cueLine === undefined || hasText(starbeast.cueLine)));
    const hasValidTrace =
      trace === undefined ||
      (isRecord(trace) &&
        (trace.traceLine === undefined || hasText(trace.traceLine)) &&
        (trace.crystalLine === undefined || hasText(trace.crystalLine)));

    if (!hasValidStarbeast || !hasValidTrace) {
      reasons.push("VISUAL_INVALID");
    }
  }

  return {
    status:
      reasons.length === 0 ? "VALID_CHANGE_EXPERIENCE_PRESENTATION" : "CHANGE_EXPERIENCE_PRESENTATION_INVALID",
    reasons,
  };
};

export const ChangeExperiencePresentationValidator = {
  validateChangeExperiencePresentation,
} as const;

export type ValidatedChangeExperiencePresentation = ChangeExperiencePresentation;
