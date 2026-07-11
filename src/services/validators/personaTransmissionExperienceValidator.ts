import type { PersonaTransmissionExperienceModel } from "../../types/personaTransmission";

export type PersonaTransmissionExperienceValidationStatus = "PASS" | "FAIL";

export type PersonaTransmissionExperienceValidationResult = Readonly<{
  status: PersonaTransmissionExperienceValidationStatus;
  reasons: string[];
}>;

const forbiddenExperienceLanguagePatterns = [
  "检测到",
  "分析显示",
  "模型判断",
  "数据表明",
  "系统读取",
  "计算完成",
  "性格缺陷",
  "升级",
  "等级",
  "经验值",
  "奖励",
  "连续打卡",
  "积分",
  "成就",
  "inertiaSignal",
  "pressureReading",
  "antiInstinctHint",
  "mainCut",
  "cutPotential",
  "interventionPotential",
];

const hasText = (value: string | undefined): boolean => Boolean(value?.trim());

const collectExperienceText = (model: PersonaTransmissionExperienceModel): string =>
  [
    model.orientation.pressureLine,
    model.orientation.currentRoundLine,
    model.recognition.oldModelLine,
    model.recognition.inertiaLine,
    model.recognition.insightLine,
    model.revision.directionLine,
    model.revision.microActionLine,
    model.starbeast.beforeLine,
    model.starbeast.afterLine,
    model.starbeast.cueLine,
    model.trace.crystalLine,
  ].join("\n");

export const validatePersonaTransmissionExperienceModel = (
  model: PersonaTransmissionExperienceModel,
): PersonaTransmissionExperienceValidationResult => {
  const reasons: string[] = [];

  if (model.status !== "READY") {
    reasons.push("EXPERIENCE_MODEL_NOT_READY");
  }

  if (!hasText(model.identity.unitId)) {
    reasons.push("IDENTITY_UNIT_ID_MISSING");
  }

  if (!hasText(model.orientation.pressureLine)) {
    reasons.push("ORIENTATION_PRESSURE_LINE_MISSING");
  }

  if (
    !hasText(model.recognition.oldModelLine) ||
    !hasText(model.recognition.inertiaLine) ||
    !hasText(model.recognition.insightLine)
  ) {
    reasons.push("RECOGNITION_INCOMPLETE");
  }

  if (!hasText(model.revision.directionLine) || !hasText(model.revision.microActionLine)) {
    reasons.push("REVISION_INCOMPLETE");
  }

  if (
    !hasText(model.starbeast.beforeLine) ||
    !hasText(model.starbeast.afterLine) ||
    !hasText(model.starbeast.cueLine)
  ) {
    reasons.push("STARBEAST_CUE_INCOMPLETE");
  }

  if (!hasText(model.trace.crystalLine)) {
    reasons.push("TRACE_CRYSTAL_LINE_MISSING");
  }

  if (!model.trace.depositsToCrystal || !model.trace.depositsToRingLite) {
    reasons.push("TRACE_DEPOSIT_FLAGS_INVALID");
  }

  const experienceText = collectExperienceText(model);
  const hasForbiddenLanguage = forbiddenExperienceLanguagePatterns.some((pattern) =>
    experienceText.includes(pattern),
  );

  if (hasForbiddenLanguage) {
    reasons.push("FORBIDDEN_EXPERIENCE_LANGUAGE");
  }

  return {
    status: reasons.length === 0 ? "PASS" : "FAIL",
    reasons,
  };
};

export const PersonaTransmissionExperienceValidator = {
  validatePersonaTransmissionExperienceModel,
} as const;
