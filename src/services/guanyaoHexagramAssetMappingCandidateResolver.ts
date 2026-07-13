import type { HexagramAssetDraftCandidate } from "./guanyaoHexagramAssetDraftCandidateResolver";
import type { PrimaryPetalProtocolDimension } from "../types/primaryPetal";

export type HexagramAssetMappingCandidateReadiness = "NOT_READY" | "READY_FOR_LANGUAGE_TRANSLATION";

export type HexagramAssetMappingCandidate = {
  status: "MAPPING";
  sourceDraftStatus: "DRAFT";
  readiness: HexagramAssetMappingCandidateReadiness;
  primaryDimension: PrimaryPetalProtocolDimension;
  motherCode?: string;
  trigram?: string;
  fourSymbol?: string;
  pressureSeedId?: string;
  pressureSeedText?: string;
  possibleHexagramCluster: string;
  mappingTheme: string;
  mappingReason: string;
  forceTranslationRequired: true;
  forbiddenLegacyRoute: true;
};

const mappingThemes: Record<PrimaryPetalProtocolDimension, string> = {
  body: "BODY_STABILITY_MAPPING",
  emotion: "EMOTIONAL_RESONANCE_MAPPING",
  thought: "THOUGHT_REFRAME_MAPPING",
  behavior: "ACTION_ALIGNMENT_MAPPING",
  memory: "MEMORY_INTEGRATION_MAPPING",
  motivation: "MOTIVATION_REORIENTATION_MAPPING",
};

const notReadyMappingReason = "这枚资产草稿还在安静等待回流完成。它会先停在映射层外，不急着压印成正式卦码。";
const readyMappingReason =
  "这枚资产草稿已经进入映射层。它还不是正式卦码，下一步需要把当前原力回流转译为可读的人格资产语言。";

export function resolveHexagramAssetMappingCandidate(input: HexagramAssetDraftCandidate): HexagramAssetMappingCandidate {
  const readiness: HexagramAssetMappingCandidateReadiness =
    input.readiness === "READY_FOR_ASSET_MAPPING" ? "READY_FOR_LANGUAGE_TRANSLATION" : "NOT_READY";

  return {
    status: "MAPPING",
    sourceDraftStatus: "DRAFT",
    readiness,
    primaryDimension: input.primaryDimension,
    motherCode: input.motherCode,
    trigram: input.trigram,
    fourSymbol: input.fourSymbol,
    pressureSeedId: input.pressureSeedId,
    pressureSeedText: input.pressureSeedText,
    possibleHexagramCluster: input.possibleHexagramCluster,
    mappingTheme: mappingThemes[input.primaryDimension],
    mappingReason: readiness === "READY_FOR_LANGUAGE_TRANSLATION" ? readyMappingReason : notReadyMappingReason,
    forceTranslationRequired: true,
    forbiddenLegacyRoute: true,
  };
}
