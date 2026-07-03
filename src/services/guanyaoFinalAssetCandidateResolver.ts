import type { AssetRenderCandidate } from "./guanyaoAssetRenderCandidateResolver";
import type { PrimaryPetalProtocolDimension } from "./guanyaoPrimaryPetalResolver";

export type FinalAssetCandidateReadiness = "NOT_READY" | "READY_FOR_OFFICIAL_ASSET_GENERATION";

export type FinalAssetElementsReady = {
  personaSource: boolean;
  pressureTrace: boolean;
  primaryDimension: boolean;
  sixNodeCompletion: boolean;
  starbeastFeedback: boolean;
  forceTranslation: boolean;
  renderBlueprint: boolean;
};

export type FinalAssetCandidate = {
  status: "FINAL_ASSET_CANDIDATE";
  sourceAssetRenderStatus: "ASSET_RENDER_CANDIDATE";
  readiness: FinalAssetCandidateReadiness;
  primaryDimension: PrimaryPetalProtocolDimension;
  motherCode?: string;
  trigram?: string;
  fourSymbol?: string;
  pressureSeedId?: string;
  pressureSeedText?: string;
  forceTheme: string;
  forcePhrase: string;
  shellTheme: string;
  renderTone: string;
  assetElementsReady: FinalAssetElementsReady;
  finalAssetReason: string;
  officialAssetGenerationRequired: true;
  forbiddenLegacyRoute: true;
};

const notReadyFinalAssetReason = "这局原力还在靠近最终资产候选条件。它会先停在候选层外，不急着进入正式资产生成。";
const readyFinalAssetReason = "这局原力已经走到最终资产候选层。它仍不是正式资产卡，下一步需要由官方资产生成协议完成压印。";

export function resolveFinalAssetCandidate(input: AssetRenderCandidate): FinalAssetCandidate {
  const readiness: FinalAssetCandidateReadiness =
    input.readiness === "READY_FOR_FINAL_ASSET_PROTOCOL" ? "READY_FOR_OFFICIAL_ASSET_GENERATION" : "NOT_READY";
  const renderBlocks = input.renderBlocks;

  return {
    status: "FINAL_ASSET_CANDIDATE",
    sourceAssetRenderStatus: "ASSET_RENDER_CANDIDATE",
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
    renderTone: input.renderTone,
    assetElementsReady: {
      personaSource: Boolean(input.motherCode || input.trigram || input.fourSymbol),
      pressureTrace: Boolean(input.pressureSeedId || input.pressureSeedText),
      primaryDimension: Boolean(input.primaryDimension),
      sixNodeCompletion: Boolean(renderBlocks.sixNodeCompletionRenderBlock),
      starbeastFeedback: Boolean(renderBlocks.starbeastRenderBlock),
      forceTranslation: Boolean(input.forceTheme && input.forcePhrase),
      renderBlueprint: Boolean(
        renderBlocks.starbeastRenderBlock &&
          renderBlocks.forceThemeRenderBlock &&
          renderBlocks.pressureSeedTraceRenderBlock &&
          renderBlocks.sixNodeCompletionRenderBlock &&
          renderBlocks.imprintRenderBlock,
      ),
    },
    finalAssetReason: readiness === "READY_FOR_OFFICIAL_ASSET_GENERATION" ? readyFinalAssetReason : notReadyFinalAssetReason,
    officialAssetGenerationRequired: true,
    forbiddenLegacyRoute: true,
  };
}
