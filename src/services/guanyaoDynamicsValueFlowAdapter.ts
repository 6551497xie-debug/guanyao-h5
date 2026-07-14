export type DynamicsValueFlowBehaviorSignal =
  | "NODE_PROGRESS"
  | "NODE_STALL"
  | "NODE_BREAKTHROUGH"
  | "COMPLETION_EVENT";

export type DynamicsValueFlowPressureState = "LOW" | "MEDIUM" | "HIGH";
export type DynamicsValueFlowEmotionalState =
  | "CALM"
  | "TENSION"
  | "STRUGGLE"
  | "BREAKTHROUGH"
  | "CRYSTALLIZATION";
export type DynamicsValueFlowAssetTrigger =
  | "NONE"
  | "SEED_ASSET"
  | "EMOTIONAL_PEAK_ASSET"
  | "64_HEXAGRAM_CRYSTAL_ASSET";
export type DynamicsValueFlowMonetizationEvent =
  | "NONE"
  | "UNLOCK_ENHANCEMENT_OFFER"
  | "ASSET_UPGRADE_OFFER"
  | "HOURGLASS_INVERSION_OFFER";

export type DynamicsValueFlowAdapterInput = Readonly<{
  seedIntensity?: number;
  hasSeedCategory: boolean;
  completedNodeCount: number;
  nodeLocked: boolean;
  enginePhase: "INIT" | "SEED_ACTIVE" | "NODE_RUNNING" | "COMPLETE";
}>;

export type DynamicsValueFlowResult = Readonly<{
  behaviorSignals: readonly DynamicsValueFlowBehaviorSignal[];
  pressureState: DynamicsValueFlowPressureState;
  emotionalState: DynamicsValueFlowEmotionalState;
  assetTrigger: DynamicsValueFlowAssetTrigger;
  monetizationEvent: DynamicsValueFlowMonetizationEvent;
  hourglassLoopClosed: true;
  nonInvasive: true;
}>;

function resolveBehaviorSignals(
  input: DynamicsValueFlowAdapterInput,
): readonly DynamicsValueFlowBehaviorSignal[] {
  const signals: DynamicsValueFlowBehaviorSignal[] = [];

  if (input.completedNodeCount > 0) signals.push("NODE_PROGRESS");
  if (input.nodeLocked || (input.enginePhase === "NODE_RUNNING" && input.completedNodeCount === 0)) {
    signals.push("NODE_STALL");
  }
  if (input.enginePhase === "NODE_RUNNING" && input.completedNodeCount > 0 && input.completedNodeCount < 6) {
    signals.push("NODE_BREAKTHROUGH");
  }
  if (input.enginePhase === "COMPLETE" || input.completedNodeCount >= 6) {
    signals.push("COMPLETION_EVENT");
  }

  return Object.freeze(signals);
}

function resolvePressureState(
  input: DynamicsValueFlowAdapterInput,
  behaviorSignals: readonly DynamicsValueFlowBehaviorSignal[],
): DynamicsValueFlowPressureState {
  const seedIntensity = Math.min(1, Math.max(0, input.seedIntensity ?? 0));
  const structuralStallBoost = behaviorSignals.includes("NODE_STALL") ? 0.22 : 0;
  const externalConflictBoost = input.hasSeedCategory ? 0.08 : 0;
  const pressureScore = Math.min(1, seedIntensity + structuralStallBoost + externalConflictBoost);

  if (pressureScore >= 0.72) return "HIGH";
  if (pressureScore >= 0.38) return "MEDIUM";
  return "LOW";
}

function resolveEmotionalState(
  input: DynamicsValueFlowAdapterInput,
  pressureState: DynamicsValueFlowPressureState,
): DynamicsValueFlowEmotionalState {
  if (input.enginePhase === "COMPLETE" || input.completedNodeCount >= 6) return "CRYSTALLIZATION";
  if (input.completedNodeCount >= 5) return "BREAKTHROUGH";
  if (pressureState === "HIGH") return "STRUGGLE";
  if (pressureState === "MEDIUM") return "TENSION";
  return "CALM";
}

function resolveAssetTrigger(
  input: DynamicsValueFlowAdapterInput,
): DynamicsValueFlowAssetTrigger {
  if (input.enginePhase === "COMPLETE" || input.completedNodeCount >= 6) return "64_HEXAGRAM_CRYSTAL_ASSET";
  if (input.completedNodeCount >= 5) return "EMOTIONAL_PEAK_ASSET";
  if (input.completedNodeCount >= 3) return "SEED_ASSET";
  return "NONE";
}

function resolveMonetizationEvent(
  input: DynamicsValueFlowAdapterInput,
  emotionalState: DynamicsValueFlowEmotionalState,
  pressureState: DynamicsValueFlowPressureState,
  behaviorSignals: readonly DynamicsValueFlowBehaviorSignal[],
): DynamicsValueFlowMonetizationEvent {
  if (emotionalState === "BREAKTHROUGH" && input.completedNodeCount === 5) {
    return "UNLOCK_ENHANCEMENT_OFFER";
  }
  if (emotionalState === "CRYSTALLIZATION" && input.completedNodeCount >= 6) {
    return "ASSET_UPGRADE_OFFER";
  }
  if (pressureState === "HIGH" && behaviorSignals.includes("NODE_STALL")) {
    return "HOURGLASS_INVERSION_OFFER";
  }
  return "NONE";
}

export function resolveDynamicsValueFlow(
  input: DynamicsValueFlowAdapterInput,
): DynamicsValueFlowResult {
  const behaviorSignals = resolveBehaviorSignals(input);
  const pressureState = resolvePressureState(input, behaviorSignals);
  const emotionalState = resolveEmotionalState(input, pressureState);

  return Object.freeze({
    behaviorSignals,
    pressureState,
    emotionalState,
    assetTrigger: resolveAssetTrigger(input),
    monetizationEvent: resolveMonetizationEvent(
      input,
      emotionalState,
      pressureState,
      behaviorSignals,
    ),
    hourglassLoopClosed: true,
    nonInvasive: true,
  });
}
