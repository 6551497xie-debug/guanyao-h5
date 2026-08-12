import type { DynamicsExperienceState } from "../types/dynamicsExperiencePresentation";
import type { DynamicsInputReadiness } from "./guanyaoDynamicsInputReadinessAdapter";
import type { DynamicsMotherPresentationResult } from "./guanyaoDynamicsMotherPresentationAdapter";
import { requireXinmaiFormalStatePresentation } from "./xinmaiSemanticConstitutionFormalStateMatrix";

export type DynamicsExperienceReadinessPresentationAdapterInput = Readonly<{
  experienceState: DynamicsExperienceState;
  inputReadiness: DynamicsInputReadiness;
  motherPresentation: DynamicsMotherPresentationResult;
}>;

export type DynamicsExperienceReadinessPresentation = Readonly<{
  semanticRole: "EXPERIENCE_READINESS_PRESENTATION";
  mode: "SAFE_PREVIEW" | "MOTHER_CONNECTED" | "RUNTIME";
  experienceState: DynamicsExperienceState;
  pressureContextMarker: "connected" | "fallback";
  motherReference: Readonly<{
    visible: boolean;
    name: string;
    label: string;
  }>;
  guardrails: Readonly<{
    readOnly: true;
    advancesRuntime: false;
    writesStorage: false;
  }>;
}>;

export function resolveDynamicsExperienceReadinessPresentation(
  input: DynamicsExperienceReadinessPresentationAdapterInput,
): DynamicsExperienceReadinessPresentation {
  const { experienceState, inputReadiness, motherPresentation } = input;
  const motherCodeName = motherPresentation.motherCodeName;
  const motherReference = {
    visible: Boolean(motherCodeName),
    name: motherCodeName,
    label: motherCodeName ? `母码：${motherCodeName}` : "",
  };
  const guardrails = {
    readOnly: true,
    advancesRuntime: false,
    writesStorage: false,
  } as const;

  if (!inputReadiness.hasPressureContext) {
    const formal = requireXinmaiFormalStatePresentation("SIX_DIMENSION", "PREPARING");
    return {
      semanticRole: "EXPERIENCE_READINESS_PRESENTATION",
      mode: "SAFE_PREVIEW",
      experienceState: {
        ...experienceState,
        loopLabel: "六个空间预览",
        headline: formal.currentFact,
        supportingCopy: `你选择的现实情境已经保留；控件就绪后可开始选择。${formal.exitConsequence}`,
        pressureCopy: "先不用解释，也不需要立刻得出答案。",
        beastCopy: "你与星兽会从这里一起走进六个空间。",
      },
      pressureContextMarker: "fallback",
      motherReference,
      guardrails,
    };
  }

  if (motherCodeName && experienceState.stage === "PRESSURE") {
    const formal = requireXinmaiFormalStatePresentation("SIX_DIMENSION", "LOADING");
    return {
      semanticRole: "EXPERIENCE_READINESS_PRESENTATION",
      mode: "MOTHER_CONNECTED",
      experienceState: {
        ...experienceState,
        headline: `正在准备身体观察。${formal.currentFact}`,
        supportingCopy: formal.exitConsequence,
        pressureCopy: "接下来只保存你明确确认的这一维观察。",
      },
      pressureContextMarker: "connected",
      motherReference,
      guardrails,
    };
  }

  return {
    semanticRole: "EXPERIENCE_READINESS_PRESENTATION",
    mode: "RUNTIME",
    experienceState,
    pressureContextMarker: "connected",
    motherReference,
    guardrails,
  };
}
