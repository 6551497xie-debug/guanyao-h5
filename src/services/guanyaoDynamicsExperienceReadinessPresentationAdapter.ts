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
        headline: "等待这一局压力被看见。",
        supportingCopy: "当前为安全预览状态，缺少本局上下文。",
        pressureCopy: "等待这一颗压力进入。",
        beastCopy: "六个空间将在当前压力确认后展开。",
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
