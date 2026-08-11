import type { RealityPressureSeedCandidate } from "../types/realityPressureSeedCaptureContract";
import {
  isXinmaiCrystalFreshRealityPresentationEnabled,
  XINMAI_CRYSTAL_FRESH_REALITY_PRESENTATION_POLICY,
} from "./xinmaiCrystalFreshRealityPresentationPolicy";

export type XinmaiFreshRealityVisibleCandidate = Readonly<{
  candidate: RealityPressureSeedCandidate;
  recentlyCompleted: boolean;
}>;

export type XinmaiFreshRealityVisibleNoveltyDecision = Readonly<{
  state: "UNCHANGED" | "FOREGROUNDED_DIFFERENT_SCENE" | "SAFE_WITHHELD";
  candidates: readonly XinmaiFreshRealityVisibleCandidate[];
  historicalMatchReferenceId: string | null;
  writesCatalog: false;
  writesHistory: false;
}>;

export const resolveXinmaiFreshRealityVisibleNoveltyPresentation = (input: Readonly<{
  candidates: readonly RealityPressureSeedCandidate[];
  freshPostOwnershipCycle: boolean;
  historicalRealityMemoryKey: string | null;
}>): XinmaiFreshRealityVisibleNoveltyDecision => {
  const key = input.historicalRealityMemoryKey?.trim() || null;
  const matchedIndex =
    input.freshPostOwnershipCycle && key !== null
      ? input.candidates.findIndex(
          (candidate) =>
            candidate.candidateReferenceId === key ||
            candidate.surface === key,
        )
      : -1;
  const matched = matchedIndex >= 0 ? input.candidates[matchedIndex] : null;
  const enabled = isXinmaiCrystalFreshRealityPresentationEnabled(
    XINMAI_CRYSTAL_FRESH_REALITY_PRESENTATION_POLICY,
  );
  const ordered =
    enabled && matchedIndex === 0 && input.candidates.length > 1
      ? Object.freeze([
          ...input.candidates.slice(1),
          input.candidates[0],
        ])
      : input.candidates;
  return Object.freeze({
    state:
      matched === null
        ? "UNCHANGED"
        : enabled && matchedIndex === 0 && input.candidates.length > 1
          ? "FOREGROUNDED_DIFFERENT_SCENE"
          : enabled
            ? "UNCHANGED"
            : "SAFE_WITHHELD",
    candidates: Object.freeze(
      ordered.map((candidate) =>
        Object.freeze({
          candidate,
          recentlyCompleted:
            matched?.candidateReferenceId === candidate.candidateReferenceId,
        }),
      ),
    ),
    historicalMatchReferenceId: matched?.candidateReferenceId ?? null,
    writesCatalog: false as const,
    writesHistory: false as const,
  });
};

export const XinmaiFreshRealityVisibleNoveltyPresentationResolver = Object.freeze({
  resolve: resolveXinmaiFreshRealityVisibleNoveltyPresentation,
  readsOnly: true as const,
  writesCatalog: false as const,
  writesAuthority: false as const,
});
