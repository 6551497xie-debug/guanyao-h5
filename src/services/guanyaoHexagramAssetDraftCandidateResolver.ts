import type { HexagramAssetCandidate } from "./guanyaoHexagramAssetCandidateResolver";
import type { PrimaryPetalProtocolDimension } from "../types/primaryPetal";

export type HexagramAssetDraftCandidateReadiness = "NOT_READY" | "READY_FOR_ASSET_MAPPING";

export type HexagramAssetDraftCandidate = {
  status: "DRAFT";
  sourceCandidateStatus: "PENDING";
  readiness: HexagramAssetDraftCandidateReadiness;
  primaryDimension: PrimaryPetalProtocolDimension;
  motherCode?: string;
  trigram?: string;
  fourSymbol?: string;
  pressureSeedId?: string;
  pressureSeedText?: string;
  possibleHexagramCluster: string;
  draftReason: string;
  forbiddenLegacyRoute: true;
};

const possibleHexagramClusters: Record<PrimaryPetalProtocolDimension, string> = {
  body: "BODY_STABILIZATION_CLUSTER",
  emotion: "EMOTIONAL_RESONANCE_CLUSTER",
  thought: "THOUGHT_REFRAME_CLUSTER",
  behavior: "ACTION_ALIGNMENT_CLUSTER",
  memory: "MEMORY_INTEGRATION_CLUSTER",
  motivation: "MOTIVATION_REORIENTATION_CLUSTER",
};

const notReadyDraftReason = "这一轮光还在回流途中。系统会先保留草稿，不把它压印成正式卦码。";
const readyDraftReason = "这一轮光已经完成回流。系统已形成一枚资产草稿，但还没有压印成正式卦码。";

export function resolveHexagramAssetDraftCandidate(input: HexagramAssetCandidate): HexagramAssetDraftCandidate {
  const readiness: HexagramAssetDraftCandidateReadiness =
    input.completionState === "READY_TO_CRYSTALLIZE" && input.completedNodeCount >= 6
      ? "READY_FOR_ASSET_MAPPING"
      : "NOT_READY";

  return {
    status: "DRAFT",
    sourceCandidateStatus: "PENDING",
    readiness,
    primaryDimension: input.primaryDimension,
    motherCode: input.motherCode,
    trigram: input.trigram,
    fourSymbol: input.fourSymbol,
    pressureSeedId: input.pressureSeedId,
    pressureSeedText: input.pressureSeedText,
    possibleHexagramCluster: possibleHexagramClusters[input.primaryDimension],
    draftReason: readiness === "READY_FOR_ASSET_MAPPING" ? readyDraftReason : notReadyDraftReason,
    forbiddenLegacyRoute: true,
  };
}
