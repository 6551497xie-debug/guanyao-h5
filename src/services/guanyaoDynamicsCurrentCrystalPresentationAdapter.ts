import { resolveDynamicsPressureFieldLabel } from "./guanyaoCurrentHexagramFormationAdapter";
import type { DynamicsCurrentCrystalEndState } from "./guanyaoDynamicsCrystalRuntimeAdapter";

export type DynamicsCurrentCrystalPresentationGuardrails = Readonly<{
  isPersonaMigrationExpression: true;
  isInitialHexagram: false;
  isPersonalityLabel: false;
  exposesPressureSurface: false;
}>;

export type DynamicsCurrentCrystalPresentationAdapterInput = Readonly<{
  currentCrystalEndState: DynamicsCurrentCrystalEndState;
}>;

export type DynamicsCurrentCrystalPresentation = Readonly<{
  semanticRole: "CURRENT_CRYSTAL_EXPRESSION";
  hexagramTitle: string;
  motherName: string;
  lowerTrigram: string;
  upperTrigram: string;
  primaryDimensionLabel: string;
  crystalCopy: string;
  cardJourneyCopy: string;
  cardPrivacyCopy: string;
  behaviorReading: readonly string[];
  guardrails: DynamicsCurrentCrystalPresentationGuardrails;
}>;

function resolveCrystalDimensionLabel(value: string | undefined): string {
  const labels: Readonly<Record<string, string>> = {
    body: "身体",
    emotion: "情绪",
    thought: "思想",
    action: "行动",
    behavior: "行动",
    memory: "记忆",
    motivation: "动机",
  };

  return labels[value ?? ""] ?? "六个空间";
}

export function resolveDynamicsCurrentCrystalPresentation(
  input: DynamicsCurrentCrystalPresentationAdapterInput,
): DynamicsCurrentCrystalPresentation {
  const state = input.currentCrystalEndState;
  const motherName = state.mother.motherCodeName || state.mother.lowerTrigram;
  const hexagramTitle =
    state.hexagram.hexagramName ??
    state.hexagram.hexagramTitle ??
    state.hexagram.hexagramCode ??
    "本局定位";
  const primaryDimensionLabel = resolveCrystalDimensionLabel(state.transmission.primaryDimension);
  const pressureField = `这一次压力来自${resolveDynamicsPressureFieldLabel(state.pressure.pressureField)}。`;
  const dimensionLine = state.transmission.primaryDimension
    ? `它优先留在${primaryDimensionLabel}这里。`
    : "它已经穿过六个空间。";

  return {
    semanticRole: "CURRENT_CRYSTAL_EXPRESSION",
    hexagramTitle,
    motherName,
    lowerTrigram: state.hexagram.lowerTrigram,
    upperTrigram: state.hexagram.upperTrigram,
    primaryDimensionLabel,
    crystalCopy: state.crystal.copy,
    cardJourneyCopy: `这段旅程从【${motherName}】进入【${hexagramTitle}】。经过你确认的回应与现实结果，它留下了一道可回看的痕迹。`,
    cardPrivacyCopy: "看看这段旅程留下的记录。它只保留这次变化，不展示具体压力原句。",
    behaviorReading: [
      "这道记录不保留你的压力原句。",
      `它留下的是当时确认的反应，在「${hexagramTitle}」这段旅程中经过现实验证后发生的变化。`,
      `${pressureField}${dimensionLine}`,
      "当外部压力升高时，你的力量会先收束，重新确认边界，再在更精准的坐标上保留下一次行动的可能。",
    ],
    guardrails: {
      isPersonaMigrationExpression: true,
      isInitialHexagram: false,
      isPersonalityLabel: false,
      exposesPressureSurface: false,
    },
  };
}
