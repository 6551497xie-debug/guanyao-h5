import type { AssetCardUiCandidate } from "./guanyaoAssetCardUiCandidateResolver";
import type { PrimaryPetalProtocolDimension } from "./guanyaoPrimaryPetalResolver";

export type UiComponentCandidateReadiness = "NOT_READY" | "READY_FOR_COMPONENT_IMPLEMENTATION_PROTOCOL";

export type UiComponentCandidate = {
  status: "UI_COMPONENT_CANDIDATE";
  sourceAssetCardUiStatus: "ASSET_CARD_UI_CANDIDATE";
  readiness: UiComponentCandidateReadiness;
  primaryDimension: PrimaryPetalProtocolDimension;
  componentSections: {
    starbeastComponent: boolean;
    forceIdentityComponent: boolean;
    pressureTraceComponent: boolean;
    sixNodeTraceComponent: boolean;
    imprintComponent: boolean;
  };
  componentTone: string;
  componentCandidateReason: string;
  componentImplementationProtocolRequired: true;
  routeForbidden: true;
  forbiddenLegacyRoute: true;
  commercialPayloadForbidden: true;
};

const notReadyComponentCandidateReason = "这局资产卡 UI 还在靠近组件候选层。它会先停留为 UI 候选，不急着生成组件。";
const readyComponentCandidateReason =
  "这局资产卡 UI 已具备进入组件候选的条件。它仍不是正式组件，下一步需要组件实现协议确认实现边界。";

export function resolveUiComponentCandidate(input: AssetCardUiCandidate): UiComponentCandidate {
  const readiness: UiComponentCandidateReadiness =
    input.readiness === "READY_FOR_UI_COMPONENT_PROTOCOL" &&
    input.uiComponentProtocolRequired === true &&
    input.routeForbidden === true &&
    input.forbiddenLegacyRoute === true &&
    input.commercialPayloadForbidden === true
      ? "READY_FOR_COMPONENT_IMPLEMENTATION_PROTOCOL"
      : "NOT_READY";

  return {
    status: "UI_COMPONENT_CANDIDATE",
    sourceAssetCardUiStatus: "ASSET_CARD_UI_CANDIDATE",
    readiness,
    primaryDimension: input.primaryDimension,
    componentSections: {
      starbeastComponent: Boolean(input.uiSections.starbeastSection),
      forceIdentityComponent: Boolean(input.uiSections.forceIdentitySection),
      pressureTraceComponent: Boolean(input.uiSections.pressureTraceSection),
      sixNodeTraceComponent: Boolean(input.uiSections.sixNodeTraceSection),
      imprintComponent: Boolean(input.uiSections.imprintSection),
    },
    componentTone: input.uiTone,
    componentCandidateReason: readiness === "READY_FOR_COMPONENT_IMPLEMENTATION_PROTOCOL" ? readyComponentCandidateReason : notReadyComponentCandidateReason,
    componentImplementationProtocolRequired: true,
    routeForbidden: true,
    forbiddenLegacyRoute: true,
    commercialPayloadForbidden: true,
  };
}
