import type {
  ChangeExperienceDimension,
  ChangeExperienceType,
  ChangeExperienceUnit,
} from "../../types/changeExperience";

export type ChangeExperienceUnitValidationStatus =
  | "VALID_CHANGE_EXPERIENCE_UNIT"
  | "CHANGE_EXPERIENCE_UNIT_INVALID";

export type ChangeExperienceUnitValidationReason =
  | "DIMENSION_INVALID"
  | "CHANGE_TYPE_INVALID"
  | "CONTEXT_INCOMPLETE"
  | "RECOGNITION_INCOMPLETE"
  | "REVISION_INCOMPLETE"
  | "MEANING_INCOMPLETE"
  | "INVALID_BOUNDARY";

export type ChangeExperienceUnitValidationResult = Readonly<{
  status: ChangeExperienceUnitValidationStatus;
  reasons: readonly ChangeExperienceUnitValidationReason[];
}>;

const allowedDimensions: readonly ChangeExperienceDimension[] = [
  "body",
  "emotion",
  "thought",
  "action",
  "memory",
  "motivation",
];

const allowedChangeTypes: readonly ChangeExperienceType[] = [
  "body_shift",
  "emotion_shift",
  "cognition_shift",
  "behavior_shift",
  "memory_shift",
  "motivation_shift",
];

const forbiddenBoundaryFields = new Set([
  "readiness",
  "status",
  "crystallized",
  "impact",
  "deflectionVector",
  "hexagramCode",
  "currentCrystalEndState",
  "storage",
  "score",
  "level",
]);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const hasText = (value: unknown): value is string => typeof value === "string" && value.trim().length > 0;

const hasForbiddenBoundaryField = (value: unknown): boolean => {
  if (Array.isArray(value)) {
    return value.some(hasForbiddenBoundaryField);
  }

  if (!isRecord(value)) {
    return false;
  }

  return Object.entries(value).some(([key, nestedValue]) => {
    if (forbiddenBoundaryFields.has(key)) {
      return true;
    }

    return hasForbiddenBoundaryField(nestedValue);
  });
};

export const validateChangeExperienceUnit = (unit: unknown): ChangeExperienceUnitValidationResult => {
  const reasons: ChangeExperienceUnitValidationReason[] = [];

  if (!isRecord(unit)) {
    return {
      status: "CHANGE_EXPERIENCE_UNIT_INVALID",
      reasons: [
        "DIMENSION_INVALID",
        "CONTEXT_INCOMPLETE",
        "RECOGNITION_INCOMPLETE",
        "REVISION_INCOMPLETE",
        "MEANING_INCOMPLETE",
      ],
    };
  }

  if (hasForbiddenBoundaryField(unit)) {
    reasons.push("INVALID_BOUNDARY");
  }

  if (!allowedDimensions.includes(unit.dimension as ChangeExperienceDimension)) {
    reasons.push("DIMENSION_INVALID");
  }

  const context = unit.context;
  if (
    !isRecord(context) ||
    !hasText(context.pressureContext) ||
    !hasText(context.currentSituation)
  ) {
    reasons.push("CONTEXT_INCOMPLETE");
  }

  const recognition = unit.recognition;
  if (
    !isRecord(recognition) ||
    !hasText(recognition.oldReaction) ||
    !hasText(recognition.protectionMeaning) ||
    !hasText(recognition.rootProtection) ||
    !hasText(recognition.manifestBehavior)
  ) {
    reasons.push("RECOGNITION_INCOMPLETE");
  }

  const revision = unit.revision;
  if (
    !isRecord(revision) ||
    !hasText(revision.newResponse) ||
    !hasText(revision.transformationMoment) ||
    !allowedChangeTypes.includes(revision.changeType as ChangeExperienceType)
  ) {
    reasons.push("REVISION_INCOMPLETE");
  }

  if (isRecord(revision) && !allowedChangeTypes.includes(revision.changeType as ChangeExperienceType)) {
    reasons.push("CHANGE_TYPE_INVALID");
  }

  const meaning = unit.meaning;
  if (!isRecord(meaning) || !hasText(meaning.growthMeaning) || !hasText(meaning.crystalImprint)) {
    reasons.push("MEANING_INCOMPLETE");
  }

  return {
    status: reasons.length === 0 ? "VALID_CHANGE_EXPERIENCE_UNIT" : "CHANGE_EXPERIENCE_UNIT_INVALID",
    reasons,
  };
};

export const ChangeExperienceUnitValidator = {
  validateChangeExperienceUnit,
} as const;

export type ValidatedChangeExperienceUnit = ChangeExperienceUnit;
