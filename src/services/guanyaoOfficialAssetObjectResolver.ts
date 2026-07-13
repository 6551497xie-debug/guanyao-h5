import type { OfficialAssetGenerationCandidate } from "./guanyaoOfficialAssetGenerationCandidateResolver";
import type { PrimaryPetalProtocolDimension } from "../types/primaryPetal";

export type OfficialAssetObjectReadiness = "NOT_READY" | "READY_FOR_ASSET_CARD_RENDER";

export type OfficialAssetObject = {
  status: "OFFICIAL_ASSET_OBJECT";
  sourceGenerationStatus: "OFFICIAL_ASSET_GENERATION_CANDIDATE";
  readiness: OfficialAssetObjectReadiness;
  primaryDimension: PrimaryPetalProtocolDimension;
  assetSource: {
    motherCode?: string;
    trigram?: string;
    fourSymbol?: string;
    pressureSeedId?: string;
    pressureSeedText?: string;
  };
  forceIdentity: {
    forceTheme: string;
    forcePhrase: string;
    shellTheme: string;
    renderTone: string;
  };
  assetNarrative: {
    originTrace: string;
    forceReflection: string;
    completionTrace: string;
  };
  officialAssetObjectReason: string;
  assetCardRenderRequired: true;
  forbiddenLegacyRoute: true;
  commercialPayloadForbidden: true;
};

const officialAssetNarrative = {
  originTrace: "本局现实扰动已被温和记录。",
  forceReflection: "这局原力已经形成可沉淀的对象。",
  completionTrace: "六节点调频完成态已经被保留。",
};

const notReadyOfficialAssetObjectReason = "这局原力还在靠近正式资产对象层。它会先停在数据对象层外，不急着进入卡片呈现。";
const readyOfficialAssetObjectReason = "这局原力已经进入正式资产对象层。它仍不是 UI 卡片，下一步需要由资产卡渲染协议完成呈现。";

export function resolveOfficialAssetObject(input: OfficialAssetGenerationCandidate): OfficialAssetObject {
  const requirements = input.generationRequirements;
  const allRequirementsReady = Object.values(requirements).every(Boolean);
  const readiness: OfficialAssetObjectReadiness =
    input.readiness === "READY_FOR_OFFICIAL_ASSET_OBJECT" &&
    input.officialAssetObjectRequired === true &&
    input.forbiddenLegacyRoute === true &&
    input.commercialPayloadForbidden === true &&
    allRequirementsReady
      ? "READY_FOR_ASSET_CARD_RENDER"
      : "NOT_READY";

  return {
    status: "OFFICIAL_ASSET_OBJECT",
    sourceGenerationStatus: "OFFICIAL_ASSET_GENERATION_CANDIDATE",
    readiness,
    primaryDimension: input.primaryDimension,
    assetSource: {
      motherCode: input.motherCode,
      trigram: input.trigram,
      fourSymbol: input.fourSymbol,
      pressureSeedId: input.pressureSeedId,
      pressureSeedText: input.pressureSeedText,
    },
    forceIdentity: {
      forceTheme: input.forceTheme,
      forcePhrase: input.forcePhrase,
      shellTheme: input.shellTheme,
      renderTone: input.renderTone,
    },
    assetNarrative: officialAssetNarrative,
    officialAssetObjectReason: readiness === "READY_FOR_ASSET_CARD_RENDER" ? readyOfficialAssetObjectReason : notReadyOfficialAssetObjectReason,
    assetCardRenderRequired: true,
    forbiddenLegacyRoute: true,
    commercialPayloadForbidden: true,
  };
}
