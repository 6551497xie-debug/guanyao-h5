import type { GuanyaoContentAssetType } from "./guanyaoContentAssetProtocol";

export type GuanyaoTone = "cold" | "surgical" | "instrumental" | "ritual" | "actionable";

export type ContentGenerationRule = {
  ruleId: string;
  assetType: GuanyaoContentAssetType;
  inputVariables: string[];
  templatePattern: string;
  tone: GuanyaoTone;
  forbiddenPatterns: string[];
  outputConstraints: {
    maxLength?: number;
    mustInclude?: string[];
    mustAvoid?: string[];
  };
};

const guanyaoForbiddenPatterns = [
  "建议你",
  "你应该多沟通",
  "放轻松",
  "接纳自己",
  "命运",
  "解卦",
  "算命",
  "心理测试",
];

export const demoContentGenerationRules: ContentGenerationRule[] = [
  {
    ruleId: "rule-pressure-seed-v1",
    assetType: "pressure_seed",
    inputVariables: ["roleContext", "triggerScene", "pressureType", "agePhase"],
    templatePattern: "从一个具体现实场景切入，写出压力如何把用户推回旧反应。",
    tone: "instrumental",
    forbiddenPatterns: guanyaoForbiddenPatterns,
    outputConstraints: {
      maxLength: 88,
      mustInclude: ["现实压力", "触发场景"],
      mustAvoid: ["安慰", "泛泛建议"],
    },
  },
  {
    ruleId: "rule-yao-device-v1",
    assetType: "yao_device",
    inputVariables: ["sourceBreachType", "targetBehaviorPattern", "pressureType"],
    templatePattern: "将切口转译成一个可介入旧反应的行为装置。",
    tone: "surgical",
    forbiddenPatterns: guanyaoForbiddenPatterns,
    outputConstraints: {
      maxLength: 72,
      mustInclude: ["打断", "装置"],
      mustAvoid: ["解释型报告", "心理建议"],
    },
  },
  {
    ruleId: "rule-repair-method-v1",
    assetType: "repair_method",
    inputVariables: ["sourceDeviceId", "sourceBreachId", "targetBehaviorPattern"],
    templatePattern: "输出第一动作、禁止动作、替代动作、复发提醒和完成标准。",
    tone: "actionable",
    forbiddenPatterns: guanyaoForbiddenPatterns,
    outputConstraints: {
      maxLength: 160,
      mustInclude: ["第一动作", "禁止动作", "执行窗口"],
      mustAvoid: ["建议你可以", "也许"],
    },
  },
  {
    ruleId: "rule-defense-90d-v1",
    assetType: "defense_90d",
    inputVariables: ["sourceArchiveId", "repairMethodId", "relapseWarning"],
    templatePattern: "按止血期、复发识别期、行为重写期拆分90天防御资产。",
    tone: "instrumental",
    forbiddenPatterns: guanyaoForbiddenPatterns,
    outputConstraints: {
      maxLength: 260,
      mustInclude: ["止血期", "复发识别期", "行为重写期"],
      mustAvoid: ["恐吓", "倒计时促销", "伪精确概率"],
    },
  },
];
