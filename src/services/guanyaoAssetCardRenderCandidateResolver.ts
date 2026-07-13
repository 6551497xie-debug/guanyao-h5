import type { OfficialAssetObject } from "./guanyaoOfficialAssetObjectResolver";
import type { PrimaryPetalProtocolDimension } from "../types/primaryPetal";

export type AssetCardRenderCandidateReadiness = "NOT_READY" | "READY_FOR_ASSET_CARD_UI_PROTOCOL";

export type AssetCardRenderCandidate = {
  status: "ASSET_CARD_RENDER_CANDIDATE";
  sourceOfficialAssetObjectStatus: "OFFICIAL_ASSET_OBJECT";
  readiness: AssetCardRenderCandidateReadiness;
  primaryDimension: PrimaryPetalProtocolDimension;
  renderSource: {
    assetSource: OfficialAssetObject["assetSource"];
    forceIdentity: OfficialAssetObject["forceIdentity"];
    assetNarrative: OfficialAssetObject["assetNarrative"];
  };
  renderSlots: {
    starbeastSlot: boolean;
    forceIdentitySlot: boolean;
    pressureTraceSlot: boolean;
    sixNodeTraceSlot: boolean;
    imprintSlot: boolean;
  };
  renderCandidateReason: string;
  assetCardUiProtocolRequired: true;
  forbiddenLegacyRoute: true;
  commercialPayloadForbidden: true;
};

const notReadyRenderCandidateReason = "这局资产对象还在靠近卡片渲染候选层。它会先保持为数据对象，不急着进入 UI。";
const readyRenderCandidateReason =
  "这局资产对象已经具备进入卡片渲染候选的条件。它仍不是正式 UI，下一步需要资产卡 UI 协议确认呈现方式。";

export function resolveAssetCardRenderCandidate(input: OfficialAssetObject): AssetCardRenderCandidate {
  const readiness: AssetCardRenderCandidateReadiness =
    input.readiness === "READY_FOR_ASSET_CARD_RENDER" &&
    input.assetCardRenderRequired === true &&
    input.forbiddenLegacyRoute === true &&
    input.commercialPayloadForbidden === true
      ? "READY_FOR_ASSET_CARD_UI_PROTOCOL"
      : "NOT_READY";

  const assetSource = input.assetSource;
  const forceIdentity = input.forceIdentity;
  const assetNarrative = input.assetNarrative;

  return {
    status: "ASSET_CARD_RENDER_CANDIDATE",
    sourceOfficialAssetObjectStatus: "OFFICIAL_ASSET_OBJECT",
    readiness,
    primaryDimension: input.primaryDimension,
    renderSource: {
      assetSource,
      forceIdentity,
      assetNarrative,
    },
    renderSlots: {
      starbeastSlot: Boolean(assetSource.motherCode || assetSource.trigram || assetSource.fourSymbol),
      forceIdentitySlot: Boolean(forceIdentity.forceTheme && forceIdentity.forcePhrase),
      pressureTraceSlot: Boolean(assetSource.pressureSeedText || assetSource.pressureSeedId),
      sixNodeTraceSlot: Boolean(assetNarrative.completionTrace),
      imprintSlot: true,
    },
    renderCandidateReason: readiness === "READY_FOR_ASSET_CARD_UI_PROTOCOL" ? readyRenderCandidateReason : notReadyRenderCandidateReason,
    assetCardUiProtocolRequired: true,
    forbiddenLegacyRoute: true,
    commercialPayloadForbidden: true,
  };
}
