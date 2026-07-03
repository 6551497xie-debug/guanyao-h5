import type { FinalAssetCandidate } from "./guanyaoFinalAssetCandidateResolver";
import type { PrimaryPetalProtocolDimension } from "./guanyaoPrimaryPetalResolver";

export type OfficialAssetGenerationCandidateReadiness = "NOT_READY" | "READY_FOR_OFFICIAL_ASSET_OBJECT";

export type OfficialAssetGenerationRequirements = {
  personaSource: boolean;
  pressureTrace: boolean;
  primaryDimension: boolean;
  sixNodeCompletion: boolean;
  starbeastFeedback: boolean;
  forceTranslation: boolean;
  renderBlueprint: boolean;
  noLegacyRoute: boolean;
  noCommercialPayload: boolean;
};

export type OfficialAssetGenerationCandidate = {
  status: "OFFICIAL_ASSET_GENERATION_CANDIDATE";
  sourceFinalAssetStatus: "FINAL_ASSET_CANDIDATE";
  readiness: OfficialAssetGenerationCandidateReadiness;
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
  generationRequirements: OfficialAssetGenerationRequirements;
  generationReason: string;
  officialAssetObjectRequired: true;
  forbiddenLegacyRoute: true;
  commercialPayloadForbidden: true;
};

const notReadyGenerationReason = "这局原力还在靠近正式资产对象生成条件。旧路由与商业载荷仍被禁止。";
const readyGenerationReason =
  "这局已经具备进入正式资产对象生成的候选条件。旧路由与商业载荷仍被禁止，下一步需要由官方资产对象协议完成压印。";

export function resolveOfficialAssetGenerationCandidate(input: FinalAssetCandidate): OfficialAssetGenerationCandidate {
  const sourceElements = input.assetElementsReady;
  const generationRequirements: OfficialAssetGenerationRequirements = {
    personaSource: Boolean(sourceElements.personaSource),
    pressureTrace: Boolean(sourceElements.pressureTrace),
    primaryDimension: Boolean(sourceElements.primaryDimension),
    sixNodeCompletion: Boolean(sourceElements.sixNodeCompletion),
    starbeastFeedback: Boolean(sourceElements.starbeastFeedback),
    forceTranslation: Boolean(sourceElements.forceTranslation),
    renderBlueprint: Boolean(sourceElements.renderBlueprint),
    noLegacyRoute: true,
    noCommercialPayload: true,
  };
  const allRequirementsReady = Object.values(generationRequirements).every(Boolean);
  const readiness: OfficialAssetGenerationCandidateReadiness =
    input.readiness === "READY_FOR_OFFICIAL_ASSET_GENERATION" &&
    input.officialAssetGenerationRequired === true &&
    input.forbiddenLegacyRoute === true &&
    allRequirementsReady
      ? "READY_FOR_OFFICIAL_ASSET_OBJECT"
      : "NOT_READY";

  return {
    status: "OFFICIAL_ASSET_GENERATION_CANDIDATE",
    sourceFinalAssetStatus: "FINAL_ASSET_CANDIDATE",
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
    generationRequirements,
    generationReason: readiness === "READY_FOR_OFFICIAL_ASSET_OBJECT" ? readyGenerationReason : notReadyGenerationReason,
    officialAssetObjectRequired: true,
    forbiddenLegacyRoute: true,
    commercialPayloadForbidden: true,
  };
}
