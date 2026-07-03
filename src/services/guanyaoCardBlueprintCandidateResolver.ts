import type { AssetShellCandidate } from "./guanyaoAssetShellCandidateResolver";
import type { PrimaryPetalProtocolDimension } from "./guanyaoPrimaryPetalResolver";

export type CardBlueprintCandidateReadiness = "NOT_READY" | "READY_FOR_ASSET_RENDER_PROTOCOL";

export type CardBlueprintSections = {
  starbeastArea: boolean;
  forceThemeArea: boolean;
  pressureSeedTraceArea: boolean;
  sixNodeCompletionArea: boolean;
  imprintArea: boolean;
};

export type CardBlueprintCandidate = {
  status: "CARD_BLUEPRINT";
  sourceAssetShellStatus: "ASSET_SHELL";
  readiness: CardBlueprintCandidateReadiness;
  primaryDimension: PrimaryPetalProtocolDimension;
  motherCode?: string;
  trigram?: string;
  fourSymbol?: string;
  pressureSeedId?: string;
  pressureSeedText?: string;
  forceTheme: string;
  forcePhrase: string;
  shellTheme: string;
  blueprintSections: CardBlueprintSections;
  blueprintReason: string;
  assetRenderProtocolRequired: true;
  forbiddenLegacyRoute: true;
};

const fixedBlueprintSections: CardBlueprintSections = {
  starbeastArea: true,
  forceThemeArea: true,
  pressureSeedTraceArea: true,
  sixNodeCompletionArea: true,
  imprintArea: true,
};

const notReadyBlueprintReason = "这局原力还在靠近卡片蓝图条件。它会先停在蓝图层外，不急着进入正式资产渲染。";
const readyBlueprintReason = "这局原力已经具备进入卡片蓝图的条件。它仍不是正式资产卡，下一步需要进入资产渲染协议。";

export function resolveCardBlueprintCandidate(input: AssetShellCandidate): CardBlueprintCandidate {
  const readiness: CardBlueprintCandidateReadiness =
    input.readiness === "READY_FOR_CARD_BLUEPRINT" ? "READY_FOR_ASSET_RENDER_PROTOCOL" : "NOT_READY";

  return {
    status: "CARD_BLUEPRINT",
    sourceAssetShellStatus: "ASSET_SHELL",
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
    blueprintSections: { ...fixedBlueprintSections },
    blueprintReason: readiness === "READY_FOR_ASSET_RENDER_PROTOCOL" ? readyBlueprintReason : notReadyBlueprintReason,
    assetRenderProtocolRequired: true,
    forbiddenLegacyRoute: true,
  };
}
