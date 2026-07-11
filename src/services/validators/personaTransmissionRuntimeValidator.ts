import type { PersonaTransmissionRuntimeUnit } from "../../types/personaTransmission";

export type PersonaTransmissionRuntimeValidationStatus = "PASS" | "FAIL";

export type PersonaTransmissionRuntimeValidationResult = Readonly<{
  status: PersonaTransmissionRuntimeValidationStatus;
  reasons: string[];
}>;

const forbiddenUserLanguagePatterns = [
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

const collectUserFacingText = (unit: PersonaTransmissionRuntimeUnit): string =>
  [
    unit.oldModel,
    unit.inertiaPattern,
    unit.insight,
    unit.revisionDirection,
    unit.microAction,
    unit.beastCue.before,
    unit.beastCue.after,
    unit.beastCue.cue,
    unit.crystalTrace.traceLine,
  ].join("\n");

export const validatePersonaTransmissionRuntimeUnit = (
  unit: PersonaTransmissionRuntimeUnit,
): PersonaTransmissionRuntimeValidationResult => {
  const reasons: string[] = [];

  if (!hasText(unit.identity.unitId)) {
    reasons.push("IDENTITY_UNIT_ID_MISSING");
  }

  if (!hasText(unit.triggerContext.pressureSeed) && !hasText(unit.triggerContext.pressureField)) {
    reasons.push("TRIGGER_CONTEXT_PRESSURE_MISSING");
  }

  if (!hasText(unit.oldModel)) {
    reasons.push("OLD_MODEL_MISSING");
  }

  if (!hasText(unit.inertiaPattern)) {
    reasons.push("INERTIA_PATTERN_MISSING");
  }

  if (!hasText(unit.insight)) {
    reasons.push("INSIGHT_MISSING");
  }

  if (!hasText(unit.revisionDirection)) {
    reasons.push("REVISION_DIRECTION_MISSING");
  }

  if (!hasText(unit.microAction)) {
    reasons.push("MICRO_ACTION_MISSING");
  }

  if (!hasText(unit.beastCue.before) || !hasText(unit.beastCue.after) || !hasText(unit.beastCue.cue)) {
    reasons.push("BEAST_CUE_INCOMPLETE");
  }

  if (!hasText(unit.crystalTrace.traceLine)) {
    reasons.push("CRYSTAL_TRACE_MISSING");
  }

  if (
    !unit.guardrails.noStorageWrite ||
    !unit.guardrails.noLongTermProfile ||
    !unit.guardrails.noRawEngineLanguage ||
    !unit.guardrails.no384Yao ||
    !unit.guardrails.noArchive
  ) {
    reasons.push("GUARDRAILS_INVALID");
  }

  const userFacingText = collectUserFacingText(unit);
  const hasForbiddenLanguage = forbiddenUserLanguagePatterns.some((pattern) => userFacingText.includes(pattern));

  if (hasForbiddenLanguage) {
    reasons.push("FORBIDDEN_USER_LANGUAGE");
  }

  return {
    status: reasons.length === 0 ? "PASS" : "FAIL",
    reasons,
  };
};

export const PersonaTransmissionRuntimeValidator = {
  validatePersonaTransmissionRuntimeUnit,
} as const;
