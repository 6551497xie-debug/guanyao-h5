import type {
  CosmicBotanicsSixDimensionState,
  StarbeastFeedback,
} from "../services/guanyaoCosmicBotanicsRuntimeEngine";
import type {
  PrimaryPetalId,
  PrimaryPetalProtocolDimension,
  SelectedPressureSeedContext,
} from "../services/guanyaoPrimaryPetalResolver";

export type SixSpaceId = PrimaryPetalId;

export type ExecutionSnapshot = {
  seed: {
    id: string;
    text: string;
    category?: string;
    intensity?: number;
  };

  primaryDimension: PrimaryPetalProtocolDimension;

  beast: {
    active: boolean;
    resonance: number;
    tone: "calm" | "strain" | "charge" | "sovereign";
  };

  node: {
    current: 1 | 2 | 3 | 4 | 5 | 6;
    completed: number[];
    locked: boolean;
  };

  runtime: {
    isReady: boolean;
    enginePhase: "INIT" | "SEED_ACTIVE" | "NODE_RUNNING" | "COMPLETE";
    uiPhase: "INIT" | "SEED_ACTIVE" | "DIMENSION_LOCKED" | "NODE_RUNNING" | "COMPLETE";
  };
};

export type NodeTimingTraceEntry = {
  node: number;
  timestamp: number;
  deltaFromPreviousNode: number;
};

export type SixSpaceConfig = {
  id: SixSpaceId;
  no: number;
  code: string;
  name: string;
};

export const sixSpaceConfigs: SixSpaceConfig[] = [
  { id: "body", no: 1, code: "BODY", name: "身体空间" },
  { id: "emotion", no: 2, code: "EMOTION", name: "情绪空间" },
  { id: "thought", no: 3, code: "THOUGHT", name: "思维空间" },
  { id: "action", no: 4, code: "ACTION", name: "行为空间" },
  { id: "memory", no: 5, code: "MEMORY", name: "记忆空间" },
  { id: "goal", no: 6, code: "GOAL", name: "目标空间" },
];

export type CosmicNarrativePhase = "field_intro" | "seed_visible" | "beast_guide" | "node_active" | "node_complete";

export type RuntimeProjection = {
  currentPrimarySpaceId: SixSpaceId;
  sixDimensionStep: number;
  selectedPressureSeedSurface: string;
  cosmicSixDimensionState: CosmicBotanicsSixDimensionState;
  cosmicNodeStep: number;
  cosmicNarrativePhase: CosmicNarrativePhase;
  pressureSeedContext: SelectedPressureSeedContext;
  starbeastFeedback: StarbeastFeedback;
  sceneGraph: SceneGraph;
  interactionGraph: InteractionGraph;
  systemIntegrityCheck: SystemIntegrityCheck;
};

export type SpatialIntentType = "CORE_STAR_BLOOM" | "NODE_ADVANCE_REQUEST" | "DIMENSION_FOCUS_REQUEST";

export type RawSpatialIntent = {
  type: string;
  source?: unknown;
  payload?: Record<string, unknown>;
};

export type RuntimePhaseIntent =
  | {
      type: "SET_ENGINE_PHASE";
      payload: {
        enginePhase: ExecutionSnapshot["runtime"]["enginePhase"];
      };
    }
  | {
      type: "SET_UI_PHASE";
      payload: {
        uiPhase: ExecutionSnapshot["runtime"]["uiPhase"];
      };
    };

export type RuntimeIntent = RawSpatialIntent | RuntimePhaseIntent;

export type SpatialIntent = {
  type: SpatialIntentType;
  source: "UI_INTERACTION";
  payload: {
    nodeIndex?: number;
    dimension?: SixSpaceId;
    context?: "ambient" | "focus" | "inspect";
    triggerStrength?: number;
  };
};

export type ExecutionCommand =
  | { type: "ADVANCE_NODE"; intent: SpatialIntent }
  | {
      type: "NOOP";
      intent: SpatialIntent;
      reason: "COMPLETE" | "FOCUS_DERIVED_ONLY" | "NO_EXECUTION_MAPPING" | "INTENT_REJECTED" | "COMMAND_REJECTED" | "SNAPSHOT_INCONSISTENT";
    };

export type SceneGraph = {
  ambient: {
    cosmicNebulaScene: true;
    ambientStars: true;
  };
  focal: {
    blackholeVortexScene: boolean;
  };
  actors: {
    starFlowerCoreRepresentation: boolean;
    baiHuConstellationLayer: true;
  };
  nodes: {
    sixDimensionWheel: true;
    activeDimension: SixSpaceId;
    activeNodeIndex: number;
  };
};

export type InteractionGraph = {
  nodes: readonly SpatialIntentType[];
  edges: readonly {
    from: SpatialIntentType;
    to: SpatialIntentType | ExecutionCommand["type"];
    rule: "governed-core-star-bloom" | "governed-node-advance" | "derived-focus-only";
  }[];
  resolution: "INTENT_GOVERNANCE_LAYER";
};

export type ExecutionKernel = {
  advance: (snapshot: ExecutionSnapshot) => ExecutionSnapshot;
  resolve: (command: ExecutionCommand, snapshot: ExecutionSnapshot) => ExecutionSnapshot;
  project: (snapshot: ExecutionSnapshot) => RuntimeProjection;
};

export type GraphCoherenceContract = {
  sceneGraph: SceneGraph;
  interactionGraph: InteractionGraph;
  executionKernel: ExecutionKernel;
  executionSnapshot: ExecutionSnapshot;
};

export type DriftType = "SCENE_DRIFT" | "INTENT_DRIFT" | "KERNEL_DRIFT";

export type CoherenceReport = {
  coherence: "PASS" | "FAIL";
  driftDetected: boolean;
  driftType: DriftType[];
  checks: {
    sceneAligned: boolean;
    interactionAligned: boolean;
    kernelAligned: boolean;
  };
};

export type GraphAlignmentMap = {
  sceneState: {
    activeDimension: SixSpaceId;
    activeNodeIndex: number;
    blackholeVortexScene: boolean;
    starFlowerCoreRepresentation: boolean;
  };
  interactionState: {
    allowedIntents: readonly SpatialIntentType[];
    mappedIntents: readonly SpatialIntentType[];
  };
  executionState: {
    enginePhase: ExecutionSnapshot["runtime"]["enginePhase"];
    uiPhase: ExecutionSnapshot["runtime"]["uiPhase"];
    nodeCurrent: ExecutionSnapshot["node"]["current"];
    allowedCommands: readonly ExecutionCommand["type"][];
  };
};

export type SystemIntegrityCheck = {
  coherence: "PASS" | "FAIL";
  driftDetected: boolean;
  driftType: DriftType[];
};

export type RuntimeEngineInput = SelectedPressureSeedContext | null;
export type RuntimeStarbeastFeedback = StarbeastFeedback;
