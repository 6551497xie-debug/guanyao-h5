import type { PrimaryPetalId } from "./primaryPetal";

export type DynamicsSixSpacePetalState = "dormant" | "active" | "blooming";

export type DynamicsSixSpaceProgress = Readonly<{
  semanticRole: "SIX_SPACE_PROGRESS";
  sequentialSpaceIds: readonly PrimaryPetalId[];
  currentSpaceId: PrimaryPetalId;
  currentSpaceStep: number;
  completedSpaceIds: readonly PrimaryPetalId[];
  completedSpaceCount: number;
  completedInnerNodeCount: number;
  petalStates: Readonly<Record<PrimaryPetalId, DynamicsSixSpacePetalState>>;
  pollenBursts: Readonly<Record<PrimaryPetalId, number>>;
  starbeastFeedbackComplete: boolean;
  guardrails: Readonly<{
    advancesRuntime: false;
    writesStorage: false;
    controlsAnimation: false;
  }>;
}>;
