import type { ForceTranslationCandidate } from "./guanyaoForceTranslationCandidateResolver";
import type { PrimaryPetalProtocolDimension } from "../types/primaryPetal";

export type AssetShellCandidateReadiness = "NOT_READY" | "READY_FOR_CARD_BLUEPRINT";

export type AssetShellCandidate = {
  status: "ASSET_SHELL";
  sourceForceTranslationStatus: "FORCE_TRANSLATION";
  readiness: AssetShellCandidateReadiness;
  primaryDimension: PrimaryPetalProtocolDimension;
  motherCode?: string;
  trigram?: string;
  fourSymbol?: string;
  pressureSeedId?: string;
  pressureSeedText?: string;
  mappingTheme: string;
  forceTheme: string;
  forcePhrase: string;
  shellTheme: string;
  shellTone: string;
  shellReason: string;
  cardBlueprintRequired: true;
  forbiddenLegacyRoute: true;
};

const shellByDimension: Record<PrimaryPetalProtocolDimension, { shellTheme: string; shellTone: string }> = {
  body: {
    shellTheme: "身体回流壳",
    shellTone: "稳定 / 承载 / 回流",
  },
  emotion: {
    shellTheme: "情绪共振壳",
    shellTone: "接纳 / 流动 / 共振",
  },
  thought: {
    shellTheme: "认知重构壳",
    shellTone: "看见 / 重构 / 换轨",
  },
  behavior: {
    shellTheme: "行动校准壳",
    shellTone: "微动作 / 对齐 / 校准",
  },
  memory: {
    shellTheme: "旧痕整合壳",
    shellTone: "回收 / 整合 / 修复",
  },
  motivation: {
    shellTheme: "方向重燃壳",
    shellTone: "点火 / 方向 / 重启",
  },
};

const shellByForceTheme: Partial<Record<string, { shellTheme: string; shellTone: string }>> = {
  身体回流: shellByDimension.body,
  情绪共振: shellByDimension.emotion,
  认知换轨: shellByDimension.thought,
  行动校准: shellByDimension.behavior,
  旧痕整合: shellByDimension.memory,
  方向重燃: shellByDimension.motivation,
};

const notReadyShellReason = "这局原力还在靠近卡壳条件。它会先停在资产壳外，不急着进入正式卡片蓝图。";
const readyShellReason = "这局原力已经具备卡壳条件。它还不是正式资产卡，下一步需要进入卡片蓝图。";

export function resolveAssetShellCandidate(input: ForceTranslationCandidate): AssetShellCandidate {
  const readiness: AssetShellCandidateReadiness =
    input.readiness === "READY_FOR_ASSET_SHELL" ? "READY_FOR_CARD_BLUEPRINT" : "NOT_READY";
  const shell = shellByForceTheme[input.forceTheme] ?? shellByDimension[input.primaryDimension];

  return {
    status: "ASSET_SHELL",
    sourceForceTranslationStatus: "FORCE_TRANSLATION",
    readiness,
    primaryDimension: input.primaryDimension,
    motherCode: input.motherCode,
    trigram: input.trigram,
    fourSymbol: input.fourSymbol,
    pressureSeedId: input.pressureSeedId,
    pressureSeedText: input.pressureSeedText,
    mappingTheme: input.mappingTheme,
    forceTheme: input.forceTheme,
    forcePhrase: input.forcePhrase,
    shellTheme: shell.shellTheme,
    shellTone: shell.shellTone,
    shellReason: readiness === "READY_FOR_CARD_BLUEPRINT" ? readyShellReason : notReadyShellReason,
    cardBlueprintRequired: true,
    forbiddenLegacyRoute: true,
  };
}
