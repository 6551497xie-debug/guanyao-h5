import {
  buildPressureField,
  formCurrentHexagramProfile,
} from "./guanyaoCausalEngineService";
import type { DynamicsInputReadiness } from "./guanyaoDynamicsInputReadinessAdapter";
import type { PressureIntensity, PressureSeed } from "../types/guanyaoCausalEngine";
import type { CurrentHexagramFormationResult } from "../types/currentHexagramFormation";
import type { SelectedPressureSeedContext } from "../types/primaryPetal";

function normalizePressureIntensity(value: unknown): PressureIntensity {
  if (typeof value === "number") {
    if (value >= 88) return "critical";
    if (value >= 72) return "high";
    if (value >= 42) return "medium";
    return "low";
  }

  return "medium";
}

export function resolveDynamicsPressureFieldLabel(value: unknown) {
  const source = String(value ?? "").trim();
  const labels: Record<string, string> = {
    POWER: "权力压力",
    INTEREST: "利益压力",
    RELATION: "关系压力",
    FAMILY: "家庭压力",
    SOCIAL: "社会压力",
    EXISTENCE: "存在压力",
  };

  return labels[source] ?? (source || "现实压力");
}

function resolvePressureNatureLabel(value: unknown) {
  const source = String(value ?? "").trim();
  const labels: Record<string, string> = {
    EVALUATION: "评价威胁",
    RESOURCE: "资源冲突",
    ATTACHMENT: "依恋断裂",
    CONTROL: "控制压迫",
    OBLIGATION: "责任义务",
    BELONGING: "归属压力",
    IDENTITY: "身份压力",
    SURVIVAL: "生存压力",
  };

  return labels[source] ?? (source || "现实触发");
}

function resolveRelationshipRoleLabel(value: unknown) {
  const source = String(value ?? "").trim();
  const labels: Record<string, string> = {
    BOSS: "上级 / 权力关系",
    CLIENT: "客户关系",
    PARTNER_BUSINESS: "合作关系",
    PARTNER_ROMANTIC: "亲密关系",
    PARENT: "父母关系",
    CHILD: "子女关系",
    FRIEND: "朋友关系",
    COLLEAGUE: "同事关系",
    SELF: "自我关系",
    SYSTEM: "外部结构",
  };

  return labels[source] ?? (source || "关系结构");
}

function buildPressureSeed(context: SelectedPressureSeedContext): PressureSeed {
  const runtimeContext = context as SelectedPressureSeedContext & {
    pressureIntensity?: unknown;
    primaryRelation?: unknown;
    core?: { mechanism?: string; engineHint?: string };
    mappingHint?: string;
  };
  const pressureType = resolveDynamicsPressureFieldLabel(context.pressureField ?? context.category);
  const pressureNature = resolvePressureNatureLabel(context.pressureNature ?? context.emotionalTone);
  const relationshipRole = resolveRelationshipRoleLabel(runtimeContext.primaryRelation ?? context.scenarioDomain);
  const locationTags = [
    context.matrixCode,
    context.category,
    context.pressureField,
    context.pressureNature,
    context.scenarioDomain,
    context.emotionalTone,
    runtimeContext.primaryRelation,
    runtimeContext.mappingHint,
    runtimeContext.core?.mechanism,
    runtimeContext.core?.engineHint,
    ...(context.tags ?? []),
    ...(context.semanticTags ?? []),
  ].filter((value): value is string => typeof value === "string" && value.trim().length > 0);

  return {
    seedId: context.selectedPressureSeedId ?? "pressure-seed-runtime",
    sceneText: [context.surface, context.shell].filter(Boolean).join(" "),
    pressureType,
    relationshipRole,
    triggerMoment: context.surface ?? "现实压力正在进入。",
    intensityLevel: normalizePressureIntensity(runtimeContext.pressureIntensity),
    costHint: context.shell ?? runtimeContext.mappingHint ?? "当前压力的影响待补充。",
    fieldBias: `${pressureNature}｜${relationshipRole}`,
    locationTags,
  };
}

export function resolveCurrentHexagramFormation(
  readiness: DynamicsInputReadiness,
): CurrentHexagramFormationResult | null {
  if (readiness.status !== "READY") return null;

  const pressureSeed = buildPressureSeed(readiness.selectedPressureSeedContext);
  const pressureField = buildPressureField(readiness.motherCodeProfile, pressureSeed);
  const currentHexagramProfile = formCurrentHexagramProfile(
    readiness.motherCodeProfile,
    pressureSeed,
    pressureField,
  );

  return {
    source: "dynamics",
    createdAt: new Date().toISOString(),
    motherCodeProfile: readiness.motherCodeProfile,
    selectedPressureSeedContext: readiness.selectedPressureSeedContext,
    pressureSeed,
    pressureField,
    currentHexagramProfile,
  };
}
