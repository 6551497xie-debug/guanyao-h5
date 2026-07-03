import type { HexagramAssetMappingCandidate } from "./guanyaoHexagramAssetMappingCandidateResolver";
import type { PrimaryPetalProtocolDimension } from "./guanyaoPrimaryPetalResolver";

export type ForceTranslationCandidateReadiness = "NOT_READY" | "READY_FOR_ASSET_SHELL";

export type ForceTranslationCandidate = {
  status: "FORCE_TRANSLATION";
  sourceMappingStatus: "MAPPING";
  readiness: ForceTranslationCandidateReadiness;
  primaryDimension: PrimaryPetalProtocolDimension;
  motherCode?: string;
  trigram?: string;
  fourSymbol?: string;
  pressureSeedId?: string;
  pressureSeedText?: string;
  mappingTheme: string;
  forceTheme: string;
  forcePhrase: string;
  translatedReason: string;
  assetShellRequired: true;
  forbiddenLegacyRoute: true;
};

const forceTranslations: Record<string, { forceTheme: string; forcePhrase: string }> = {
  BODY_STABILITY_MAPPING: {
    forceTheme: "身体回流",
    forcePhrase: "稳定原力",
  },
  EMOTIONAL_RESONANCE_MAPPING: {
    forceTheme: "情绪共振",
    forcePhrase: "接纳原力",
  },
  THOUGHT_REFRAME_MAPPING: {
    forceTheme: "认知换轨",
    forcePhrase: "看见原力",
  },
  ACTION_ALIGNMENT_MAPPING: {
    forceTheme: "行动校准",
    forcePhrase: "微动作原力",
  },
  MEMORY_INTEGRATION_MAPPING: {
    forceTheme: "旧痕整合",
    forcePhrase: "回收原力",
  },
  MOTIVATION_REORIENTATION_MAPPING: {
    forceTheme: "方向重燃",
    forcePhrase: "目标原力",
  },
};

const fallbackForceTranslation = {
  forceTheme: "原力回流",
  forcePhrase: "可读原力",
};

const notReadyTranslatedReason = "这局光还在靠近可读状态。它会先停在原力转译层外，不急着进入资产卡壳。";
const readyTranslatedReason = "这局光已经形成一种可读的原力。它还不是正式卦码，而是在等待被压印成一张人格资产卡。";

export function resolveForceTranslationCandidate(input: HexagramAssetMappingCandidate): ForceTranslationCandidate {
  const readiness: ForceTranslationCandidateReadiness =
    input.readiness === "READY_FOR_LANGUAGE_TRANSLATION" ? "READY_FOR_ASSET_SHELL" : "NOT_READY";
  const forceTranslation = forceTranslations[input.mappingTheme] ?? fallbackForceTranslation;

  return {
    status: "FORCE_TRANSLATION",
    sourceMappingStatus: "MAPPING",
    readiness,
    primaryDimension: input.primaryDimension,
    motherCode: input.motherCode,
    trigram: input.trigram,
    fourSymbol: input.fourSymbol,
    pressureSeedId: input.pressureSeedId,
    pressureSeedText: input.pressureSeedText,
    mappingTheme: input.mappingTheme,
    forceTheme: forceTranslation.forceTheme,
    forcePhrase: forceTranslation.forcePhrase,
    translatedReason: readiness === "READY_FOR_ASSET_SHELL" ? readyTranslatedReason : notReadyTranslatedReason,
    assetShellRequired: true,
    forbiddenLegacyRoute: true,
  };
}
