import type { SixSpaceId } from "../runtime/guanyaoRuntimeEngine";
import type {
  DynamicsVisualDepthState,
  DynamicsVisualState,
} from "../types/dynamicsVisualState";

export type DynamicsVisualStateAdapterInput = Readonly<{
  completedNodeCount: number;
  currentNode: number;
  seedIntensity?: number;
  beastResonance: number;
  beastTone: "calm" | "strain" | "charge" | "sovereign";
  enginePhase: "INIT" | "SEED_ACTIVE" | "NODE_RUNNING" | "COMPLETE";
  uiPhase: "INIT" | "SEED_ACTIVE" | "DIMENSION_LOCKED" | "NODE_RUNNING" | "COMPLETE";
  runtimePrimaryDimension: SixSpaceId;
  sequentialFocalDimension: SixSpaceId;
}>;

const VISUAL_TIMELINE_SYNC = Object.freeze({
  calm: "T0.0 -> calm state",
  blackhole: "T0.95 -> blackhole activation",
  beast: "T2.4 -> beast emergence",
  node: "T3.6 -> node focus collapse",
  completion: "completion -> supernova crystallization",
});

function resolveVisualColorTemperature(
  dimension: SixSpaceId,
  beastTone: DynamicsVisualStateAdapterInput["beastTone"],
) {
  if (beastTone === "sovereign") return "222,196,154";
  if (beastTone === "charge") return "199,169,107";
  if (beastTone === "strain") return "176,210,206";

  const toneByDimension: Record<SixSpaceId, string> = {
    body: "176,210,206",
    emotion: "199,169,107",
    thought: "184,200,224",
    action: "222,196,154",
    memory: "190,178,214",
    goal: "210,190,150",
  };

  return toneByDimension[dimension];
}

export function resolveDynamicsVisualState(
  input: DynamicsVisualStateAdapterInput,
): DynamicsVisualState {
  const nodeProgress = Math.min(1, Math.max(0, input.completedNodeCount / 6));
  const resonance = Math.min(1, Math.max(0, input.beastResonance));
  const pressureIntensity = Math.min(1, input.seedIntensity ?? 0.32);
  const visualDepthState: DynamicsVisualDepthState =
    input.uiPhase === "COMPLETE"
      ? "crystallization"
      : input.uiPhase === "NODE_RUNNING"
        ? "interaction_focus"
        : input.uiPhase === "DIMENSION_LOCKED"
          ? "entity_emergence"
          : input.uiPhase === "SEED_ACTIVE"
            ? "structural_activation"
            : "background_calm";
  const spatialComposition: DynamicsVisualState["spatialComposition"] =
    visualDepthState === "crystallization"
      ? "supernova_crystallization"
      : visualDepthState === "interaction_focus"
        ? "node_focus_collapse"
        : visualDepthState === "entity_emergence"
          ? "beast_emergence"
          : visualDepthState === "structural_activation"
            ? "blackhole_activation"
            : "calm_state";
  const timeline: DynamicsVisualState["timeline"] =
    visualDepthState === "crystallization"
      ? { current: "completion", label: VISUAL_TIMELINE_SYNC.completion }
      : visualDepthState === "interaction_focus"
        ? { current: "T3.6", label: VISUAL_TIMELINE_SYNC.node }
        : visualDepthState === "entity_emergence"
          ? { current: "T2.4", label: VISUAL_TIMELINE_SYNC.beast }
          : visualDepthState === "structural_activation"
            ? { current: "T0.95", label: VISUAL_TIMELINE_SYNC.blackhole }
            : { current: "T0.0", label: VISUAL_TIMELINE_SYNC.calm };

  return Object.freeze({
    nodeIndex: input.currentNode,
    visualDepthState,
    colorTemperature: resolveVisualColorTemperature(input.runtimePrimaryDimension, input.beastTone),
    spatialComposition,
    focalDimension: input.sequentialFocalDimension,
    primitives: {
      BEAST: {
        primitive: "BEAST",
        meaning: "state_container",
        intensity: pressureIntensity,
        coherence: resonance,
        stability:
          input.beastTone === "sovereign"
            ? 1
            : input.beastTone === "charge"
              ? 0.74
              : input.beastTone === "calm"
                ? 0.58
                : 0.32,
      },
      PRESSURE: {
        primitive: "PRESSURE",
        meaning: "tension_metric",
        intensity: pressureIntensity,
        instability:
          input.enginePhase === "COMPLETE"
            ? 0
            : Math.min(1, pressureIntensity * (1 - nodeProgress * 0.42)),
        urgency:
          input.enginePhase === "NODE_RUNNING"
            ? pressureIntensity
            : pressureIntensity * 0.72,
      },
      DIMENSION: {
        primitive: "DIMENSION",
        meaning: "behavioral_structure",
        intensity:
          visualDepthState === "background_calm"
            ? 0.28
            : 0.62 + nodeProgress * 0.28,
        activeDimension: input.sequentialFocalDimension,
        state:
          visualDepthState === "background_calm"
            ? "dormant"
            : pressureIntensity > 0.72 && nodeProgress < 0.34
              ? "destabilized"
              : "active",
      },
      PARTICLE: {
        primitive: "PARTICLE",
        meaning: "execution_feedback",
        intensity: Math.min(1, 0.18 + nodeProgress * 0.54 + resonance * 0.28),
        transitionEnergy:
          visualDepthState === "crystallization"
            ? 1
            : visualDepthState === "interaction_focus"
              ? nodeProgress
              : resonance * 0.42,
        nodeActivity: nodeProgress,
      },
    },
    zDepth: {
      background: 0,
      structural: 1,
      entity: 2,
      interaction: 3,
      narrative: 4,
    },
    timeline,
  } satisfies DynamicsVisualState);
}
