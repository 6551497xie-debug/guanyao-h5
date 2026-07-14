import type { DynamicsSixSpaceProgress } from "../types/dynamicsSixSpaceProgress";
import type { PrimaryPetalId } from "../types/primaryPetal";

export type DynamicsSixSpaceProgressAdapterInput = Readonly<{
  activeDimensionIndex: number;
  completedDimensionIds: readonly PrimaryPetalId[];
  completedNodeNumbers: readonly number[];
  enginePhase: "INIT" | "SEED_ACTIVE" | "NODE_RUNNING" | "COMPLETE";
  spaceConfigs: readonly Readonly<{
    id: PrimaryPetalId;
    no: number;
  }>[];
  sixDimensionState: Readonly<
    Record<
      PrimaryPetalId,
      Readonly<{
        bloomCount: number;
      }>
    >
  >;
}>;

export const DYNAMICS_SEQUENTIAL_SIX_SPACE_IDS = Object.freeze([
  "body",
  "emotion",
  "thought",
  "action",
  "memory",
  "goal",
] as const satisfies readonly PrimaryPetalId[]);

const SIX_SPACE_PROGRESS_GUARDRAILS = Object.freeze({
  advancesRuntime: false,
  writesStorage: false,
  controlsAnimation: false,
} as const);

export function resolveDynamicsSixSpaceProgress(
  input: DynamicsSixSpaceProgressAdapterInput,
): DynamicsSixSpaceProgress {
  const activeIndex = Math.max(
    0,
    Math.min(DYNAMICS_SEQUENTIAL_SIX_SPACE_IDS.length - 1, input.activeDimensionIndex),
  );
  const currentSpaceId = DYNAMICS_SEQUENTIAL_SIX_SPACE_IDS[activeIndex];
  const completedSpaceSet = new Set(input.completedDimensionIds);

  if (input.enginePhase === "COMPLETE") {
    DYNAMICS_SEQUENTIAL_SIX_SPACE_IDS.forEach((spaceId) => completedSpaceSet.add(spaceId));
  }

  const completedSpaceIds = Object.freeze(
    DYNAMICS_SEQUENTIAL_SIX_SPACE_IDS.filter((spaceId) => completedSpaceSet.has(spaceId)),
  );
  const currentSpaceStep =
    input.spaceConfigs.find((config) => config.id === currentSpaceId)?.no ??
    input.spaceConfigs[0]?.no ??
    activeIndex + 1;
  const petalStates = Object.freeze(
    DYNAMICS_SEQUENTIAL_SIX_SPACE_IDS.reduce<
      Record<PrimaryPetalId, DynamicsSixSpaceProgress["petalStates"][PrimaryPetalId]>
    >(
      (states, spaceId) => {
        states[spaceId] = completedSpaceSet.has(spaceId)
          ? "blooming"
          : spaceId === currentSpaceId
            ? "active"
            : "dormant";
        return states;
      },
      {} as Record<PrimaryPetalId, DynamicsSixSpaceProgress["petalStates"][PrimaryPetalId]>,
    ),
  );
  const pollenBursts = Object.freeze(
    DYNAMICS_SEQUENTIAL_SIX_SPACE_IDS.reduce<Record<PrimaryPetalId, number>>(
      (bursts, spaceId) => {
        bursts[spaceId] = input.sixDimensionState[spaceId].bloomCount;
        return bursts;
      },
      {} as Record<PrimaryPetalId, number>,
    ),
  );

  return Object.freeze({
    semanticRole: "SIX_SPACE_PROGRESS",
    sequentialSpaceIds: DYNAMICS_SEQUENTIAL_SIX_SPACE_IDS,
    currentSpaceId,
    currentSpaceStep,
    completedSpaceIds,
    completedSpaceCount: completedSpaceIds.length,
    completedInnerNodeCount: input.completedNodeNumbers.filter((node) => node >= 1 && node <= 6).length,
    petalStates,
    pollenBursts,
    starbeastFeedbackComplete:
      input.enginePhase === "COMPLETE" && completedSpaceIds.length >= DYNAMICS_SEQUENTIAL_SIX_SPACE_IDS.length,
    guardrails: SIX_SPACE_PROGRESS_GUARDRAILS,
  } satisfies DynamicsSixSpaceProgress);
}
