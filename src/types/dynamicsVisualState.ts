import type { SixSpaceId } from "../runtime/guanyaoRuntimeEngine";

export type DynamicsVisualDepthState =
  | "background_calm"
  | "structural_activation"
  | "entity_emergence"
  | "interaction_focus"
  | "crystallization";

export type DynamicsVisualPrimitive = "BEAST" | "PRESSURE" | "DIMENSION" | "PARTICLE";

export type DynamicsVisualPrimitiveState = Readonly<{
  primitive: DynamicsVisualPrimitive;
  intensity: number;
  meaning: "state_container" | "tension_metric" | "behavioral_structure" | "execution_feedback";
}>;

export type DynamicsVisualTimeline = Readonly<{
  current: "T0.0" | "T0.95" | "T2.4" | "T3.6" | "completion";
  label: string;
}>;

export type DynamicsVisualState = Readonly<{
  nodeIndex: number;
  visualDepthState: DynamicsVisualDepthState;
  colorTemperature: string;
  spatialComposition:
    | "calm_state"
    | "blackhole_activation"
    | "beast_emergence"
    | "node_focus_collapse"
    | "supernova_crystallization";
  focalDimension: SixSpaceId;
  primitives: Readonly<{
    BEAST: DynamicsVisualPrimitiveState & Readonly<{
      coherence: number;
      stability: number;
    }>;
    PRESSURE: DynamicsVisualPrimitiveState & Readonly<{
      instability: number;
      urgency: number;
    }>;
    DIMENSION: DynamicsVisualPrimitiveState & Readonly<{
      activeDimension: SixSpaceId;
      state: "active" | "dormant" | "destabilized";
    }>;
    PARTICLE: DynamicsVisualPrimitiveState & Readonly<{
      transitionEnergy: number;
      nodeActivity: number;
    }>;
  }>;
  zDepth: Readonly<{
    background: number;
    structural: number;
    entity: number;
    interaction: number;
    narrative: number;
  }>;
  timeline: DynamicsVisualTimeline;
}>;
