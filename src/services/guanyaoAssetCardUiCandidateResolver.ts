import type { AssetCardRenderCandidate } from "./guanyaoAssetCardRenderCandidateResolver";
import type { PrimaryPetalProtocolDimension } from "../types/primaryPetal";

export type AssetCardUiCandidateReadiness = "NOT_READY" | "READY_FOR_UI_COMPONENT_PROTOCOL";

export type AssetCardUiCandidate = {
  status: "ASSET_CARD_UI_CANDIDATE";
  sourceAssetCardRenderStatus: "ASSET_CARD_RENDER_CANDIDATE";
  readiness: AssetCardUiCandidateReadiness;
  primaryDimension: PrimaryPetalProtocolDimension;
  uiSections: {
    starbeastSection: boolean;
    forceIdentitySection: boolean;
    pressureTraceSection: boolean;
    sixNodeTraceSection: boolean;
    imprintSection: boolean;
  };
  uiTone: string;
  uiCandidateReason: string;
  uiComponentProtocolRequired: true;
  routeForbidden: true;
  forbiddenLegacyRoute: true;
  commercialPayloadForbidden: true;
};

const uiToneByDimension: Record<PrimaryPetalProtocolDimension, string> = {
  body: "稳定 / 承载 / 回流",
  emotion: "接纳 / 流动 / 共振",
  thought: "看见 / 重构 / 换轨",
  behavior: "微动作 / 对齐 / 校准",
  memory: "回收 / 整合 / 修复",
  motivation: "点火 / 方向 / 重启",
};

const notReadyUiCandidateReason = "这局资产对象还在靠近 UI 候选层。它会先停留为渲染候选，不急着生成页面。";
const readyUiCandidateReason =
  "这局资产对象已经具备进入 UI 候选的条件。它仍不是正式页面，下一步需要 UI 组件协议确认呈现方式。";

export function resolveAssetCardUiCandidate(input: AssetCardRenderCandidate): AssetCardUiCandidate {
  const readiness: AssetCardUiCandidateReadiness =
    input.readiness === "READY_FOR_ASSET_CARD_UI_PROTOCOL" &&
    input.assetCardUiProtocolRequired === true &&
    input.forbiddenLegacyRoute === true &&
    input.commercialPayloadForbidden === true
      ? "READY_FOR_UI_COMPONENT_PROTOCOL"
      : "NOT_READY";

  return {
    status: "ASSET_CARD_UI_CANDIDATE",
    sourceAssetCardRenderStatus: "ASSET_CARD_RENDER_CANDIDATE",
    readiness,
    primaryDimension: input.primaryDimension,
    uiSections: {
      starbeastSection: Boolean(input.renderSlots.starbeastSlot),
      forceIdentitySection: Boolean(input.renderSlots.forceIdentitySlot),
      pressureTraceSection: Boolean(input.renderSlots.pressureTraceSlot),
      sixNodeTraceSection: Boolean(input.renderSlots.sixNodeTraceSlot),
      imprintSection: Boolean(input.renderSlots.imprintSlot),
    },
    uiTone: uiToneByDimension[input.primaryDimension],
    uiCandidateReason: readiness === "READY_FOR_UI_COMPONENT_PROTOCOL" ? readyUiCandidateReason : notReadyUiCandidateReason,
    uiComponentProtocolRequired: true,
    routeForbidden: true,
    forbiddenLegacyRoute: true,
    commercialPayloadForbidden: true,
  };
}
