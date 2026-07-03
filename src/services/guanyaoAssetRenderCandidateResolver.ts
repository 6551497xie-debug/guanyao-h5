import type { CardBlueprintCandidate } from "./guanyaoCardBlueprintCandidateResolver";
import type { PrimaryPetalProtocolDimension } from "./guanyaoPrimaryPetalResolver";

export type AssetRenderCandidateReadiness = "NOT_READY" | "READY_FOR_FINAL_ASSET_PROTOCOL";

export type AssetRenderBlocks = {
  starbeastRenderBlock: boolean;
  forceThemeRenderBlock: boolean;
  pressureSeedTraceRenderBlock: boolean;
  sixNodeCompletionRenderBlock: boolean;
  imprintRenderBlock: boolean;
};

export type AssetRenderCandidate = {
  status: "ASSET_RENDER_CANDIDATE";
  sourceCardBlueprintStatus: "CARD_BLUEPRINT";
  readiness: AssetRenderCandidateReadiness;
  primaryDimension: PrimaryPetalProtocolDimension;
  motherCode?: string;
  trigram?: string;
  fourSymbol?: string;
  pressureSeedId?: string;
  pressureSeedText?: string;
  forceTheme: string;
  forcePhrase: string;
  shellTheme: string;
  renderBlocks: AssetRenderBlocks;
  renderTone: string;
  renderReason: string;
  finalAssetProtocolRequired: true;
  forbiddenLegacyRoute: true;
};

const renderToneByDimension: Record<PrimaryPetalProtocolDimension, string> = {
  body: "稳定 / 承载 / 回流",
  emotion: "接纳 / 流动 / 共振",
  thought: "看见 / 重构 / 换轨",
  behavior: "微动作 / 对齐 / 校准",
  memory: "回收 / 整合 / 修复",
  motivation: "点火 / 方向 / 重启",
};

const notReadyRenderReason = "这局原力还在靠近渲染候选条件。它会先停在渲染层外，不急着进入最终资产协议。";
const readyRenderReason = "这局原力已经具备进入渲染候选的条件。它仍不是正式资产卡，下一步需要进入最终资产协议。";

export function resolveAssetRenderCandidate(input: CardBlueprintCandidate): AssetRenderCandidate {
  const readiness: AssetRenderCandidateReadiness =
    input.readiness === "READY_FOR_ASSET_RENDER_PROTOCOL" ? "READY_FOR_FINAL_ASSET_PROTOCOL" : "NOT_READY";

  return {
    status: "ASSET_RENDER_CANDIDATE",
    sourceCardBlueprintStatus: "CARD_BLUEPRINT",
    readiness,
    primaryDimension: input.primaryDimension,
    motherCode: input.motherCode,
    trigram: input.trigram,
    fourSymbol: input.fourSymbol,
    pressureSeedId: input.pressureSeedId,
    pressureSeedText: input.pressureSeedText,
    forceTheme: input.forceTheme,
    forcePhrase: input.forcePhrase,
    shellTheme: input.shellTheme,
    renderBlocks: {
      starbeastRenderBlock: input.blueprintSections.starbeastArea,
      forceThemeRenderBlock: input.blueprintSections.forceThemeArea,
      pressureSeedTraceRenderBlock: input.blueprintSections.pressureSeedTraceArea,
      sixNodeCompletionRenderBlock: input.blueprintSections.sixNodeCompletionArea,
      imprintRenderBlock: input.blueprintSections.imprintArea,
    },
    renderTone: renderToneByDimension[input.primaryDimension],
    renderReason: readiness === "READY_FOR_FINAL_ASSET_PROTOCOL" ? readyRenderReason : notReadyRenderReason,
    finalAssetProtocolRequired: true,
    forbiddenLegacyRoute: true,
  };
}
