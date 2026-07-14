import type { DynamicsExperienceState } from "../types/dynamicsExperiencePresentation";
import type { DynamicsInputReadiness } from "./guanyaoDynamicsInputReadinessAdapter";
import type { DynamicsMotherPresentationResult } from "./guanyaoDynamicsMotherPresentationAdapter";

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
    return {
      semanticRole: "EXPERIENCE_READINESS_PRESENTATION",
      mode: "SAFE_PREVIEW",
      experienceState: {
        ...experienceState,
        loopLabel: "六个空间预览",
        headline: "这一局还没有开始。",
        supportingCopy: "准备好时，选择此刻最想看清的一件事。",
        pressureCopy: "先不用解释，也不需要立刻得出答案。",
        beastCopy: "你与星兽会从这里一起走进六个空间。",
      },
      pressureContextMarker: "fallback",
      motherReference,
      guardrails,
    };
  }

  if (motherCodeName && experienceState.stage === "PRESSURE") {
    return {
      semanticRole: "EXPERIENCE_READINESS_PRESENTATION",
      mode: "MOTHER_CONNECTED",
      experienceState: {
        ...experienceState,
        headline: "母码已接入。",
        supportingCopy: "这一颗压力正在穿过你的母码。",
        pressureCopy: "母码已接入，压力开始进入六个空间。",
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
