import {
  toProtocolPrimaryPetal,
  type PrimaryPetalId,
  type PrimaryPetalProtocolDimension,
  type SelectedPressureSeedContext,
} from "./guanyaoPrimaryPetalResolver";

export type HexagramAssetCandidateCompletionState = "INCOMPLETE" | "READY_TO_CRYSTALLIZE";

export type HexagramAssetCandidate = {
  status: "PENDING";
  motherCode?: string;
  trigram?: string;
  fourSymbol?: string;
  pressureSeedId?: string;
  pressureSeedText?: string;
  primaryDimension: PrimaryPetalProtocolDimension;
  completedNodeCount: number;
  completionState: HexagramAssetCandidateCompletionState;
  candidateReason: string;
};

export type HexagramAssetCandidatePersonaSnapshot = {
  motherCode?: string;
  trigram?: string;
  direction?: string;
  fourSymbol?: string;
};

type ResolveHexagramAssetCandidateInput = {
  personaSnapshot?: HexagramAssetCandidatePersonaSnapshot | null;
  selectedPressureSeedContext?: SelectedPressureSeedContext | null;
  currentPrimarySpaceId: PrimaryPetalId;
  completedNodeCount: number;
  starbeastFeedbackComplete?: boolean;
  pressureSeedFallbackText?: string;
};

const incompleteCandidateReason = "这颗现实扰动正在被你轻轻看见。等这一轮光走完，它会开始具备结晶条件。";
const readyCandidateReason = "这颗现实扰动已经被你送回一轮光。它还不是最终卦码，但已经具备结晶条件。";

function normalizeCompletedNodeCount(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(6, Math.floor(value)));
}

export function resolveHexagramAssetCandidate(input: ResolveHexagramAssetCandidateInput): HexagramAssetCandidate {
  const completedNodeCount = normalizeCompletedNodeCount(input.completedNodeCount);
  const completionState: HexagramAssetCandidateCompletionState =
    completedNodeCount >= 6 && input.starbeastFeedbackComplete !== false ? "READY_TO_CRYSTALLIZE" : "INCOMPLETE";
  const pressureSeedText = input.selectedPressureSeedContext?.surface ?? input.pressureSeedFallbackText;

  return {
    status: "PENDING",
    motherCode: input.personaSnapshot?.motherCode,
    trigram: input.personaSnapshot?.trigram,
    fourSymbol: input.personaSnapshot?.fourSymbol ?? input.personaSnapshot?.direction,
    pressureSeedId: input.selectedPressureSeedContext?.selectedPressureSeedId,
    pressureSeedText,
    primaryDimension: toProtocolPrimaryPetal(input.currentPrimarySpaceId),
    completedNodeCount,
    completionState,
    candidateReason: completionState === "READY_TO_CRYSTALLIZE" ? readyCandidateReason : incompleteCandidateReason,
  };
}
