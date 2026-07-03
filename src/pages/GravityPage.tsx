/**
 * GravityPage = passive UI visualization layer for presenting existing causal state transitions
 * without any influence on engine or data flow.
 */
import { useEffect, useState, type CSSProperties } from "react";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import {
  generateSixDimensionalTuningDialogue,
  type GuanyaoLanguageDimension,
  type GuanyaoStarBeastName,
} from "../expression/guanyaoLanguageSystem";
import {
  runCosmicBotanicsRuntimeEngine,
  type CosmicBotanicsSixDimensionState,
  type CosmicPetalState,
  type StarbeastFeedback,
  type StarFlowerForm,
  type StarFlowerGrowthState,
} from "../services/guanyaoCosmicBotanicsRuntimeEngine";
import { resolveHexagramAssetCandidate } from "../services/guanyaoHexagramAssetCandidateResolver";
import {
  derivePrimaryPetal,
  toProtocolPrimaryPetal,
  type PrimaryPetalId,
  type PrimaryPetalProtocolDimension,
  type SelectedPressureSeedContext,
} from "../services/guanyaoPrimaryPetalResolver";
import { LegacyDynamicsDormant } from "./legacy/LegacyDynamicsDormant";

const USE_COSMIC_BOTANICS_SIX_SPACE = true;
const LEGACY_DYNAMICS_FLOW_ISOLATED = true;
const DEV_PRIMARY_PETAL_FIXTURES: Record<string, SelectedPressureSeedContext> = {
  body: {
    selectedPressureSeedId: "dev-fixture-body",
    surface: "你在这个行业十年了，抬头还是经理。",
    bodySignal: "胸口发闷，肩膀沉重。",
  },
  emotion: {
    selectedPressureSeedId: "dev-fixture-emotion",
    surface: "对方一个眼神，你瞬间被不安接管。",
    emotionalTone: "fear",
  },
  thought: {
    selectedPressureSeedId: "dev-fixture-thought",
    surface: "你还没说完，脑子里已经开始组织下一句解释了。",
    thoughtPattern: "反复解释，用证明换安全。",
  },
  behavior: {
    selectedPressureSeedId: "dev-fixture-behavior",
    surface: "你脑子里想了无数遍，手还在原处。",
    behaviorBlock: "想做，但卡住很久了。",
  },
  memory: {
    selectedPressureSeedId: "dev-fixture-memory",
    surface: "以前也这样过，你还没反应，记忆已经先替你回答了。",
    memoryEcho: "旧经验正在把你拉回过去。",
  },
  motivation: {
    selectedPressureSeedId: "dev-fixture-motivation",
    surface: "你不知道该往哪走，假装不需要，就不怕得不到。",
    motivationLoss: "方向感变得模糊。",
  },
};

type SixSpaceId = PrimaryPetalId;
type ExecutionSnapshot = {
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

/**
 * ============================
 * EXECUTION INVARIANT LOCK
 * ============================
 *
 * enginePhase = ONLY logic layer (node / beast / seed)
 * uiPhase     = ONLY render layer (CosmicBotanicsField)
 *
 * DO NOT CROSS BOUNDARIES
 */
const assertExecutionInvariant = (snapshot: ExecutionSnapshot) => {
  // UI must never directly influence engine
  if ((snapshot as ExecutionSnapshot & { __uiAffectsEnginePhase?: unknown }).__uiAffectsEnginePhase) {
    throw new Error("Invariant violation: UI touched enginePhase");
  }

  // Engine must never directly drive UI logic
  if ((snapshot as ExecutionSnapshot & { __engineAffectsUiPhaseLogic?: unknown }).__engineAffectsUiPhaseLogic) {
    throw new Error("Invariant violation: engine touched uiPhase logic");
  }
};

type NodeTimingTraceEntry = {
  node: number;
  timestamp: number;
  deltaFromPreviousNode: number;
};

function getExecutionTrace(snapshot: Pick<ExecutionSnapshot, "node">): NodeTimingTraceEntry[] {
  return snapshot.node.completed
    .filter((node): node is 1 | 2 | 3 | 4 | 5 | 6 => node >= 1 && node <= 6)
    .sort((a, b) => a - b)
    .map((node, index) => ({
      node,
      timestamp: index + 1,
      deltaFromPreviousNode: index === 0 ? 1 : 1,
    }));
}

function replayNodeTiming(trace: NodeTimingTraceEntry[]) {
  const deltas = trace.map((entry) => entry.deltaFromPreviousNode);
  const avgDelta = deltas.reduce((sum, value) => sum + value, 0) / (deltas.length || 1);
  const variance = deltas.reduce((sum, value) => sum + Math.pow(value - avgDelta, 2), 0) / (deltas.length || 1);

  return {
    avgDelta,
    variance,
    rhythmProfile: trace.map((entry) => ({
      node: entry.node,
      delta: entry.deltaFromPreviousNode,
    })),
    stabilityScore: 1 / (1 + variance),
  };
}

const logExecutionSnapshot = (snapshot: ExecutionSnapshot, phase: string) => {
  const viteEnv = (import.meta as ImportMeta & { env?: { DEV?: boolean } }).env;
  if (!viteEnv?.DEV) return;

  console.log("[ExecutionSnapshot Trace]", {
    phase,
    enginePhase: snapshot.runtime.enginePhase,
    uiPhase: snapshot.runtime.uiPhase,
    node: snapshot.node.current,
    beast: snapshot.beast.tone,
    seed: snapshot.seed.text,
    nodeTimingTrace: getExecutionTrace(snapshot).slice(-5),
  });
  console.log("[Execution Rhythm]", replayNodeTiming(getExecutionTrace(snapshot)));
};

const logRhythmSmokeTest = (snapshot: ExecutionSnapshot, event: string) => {
  const viteEnv = (import.meta as ImportMeta & { env?: { DEV?: boolean } }).env;
  if (!viteEnv?.DEV) return;

  const trace = getExecutionTrace(snapshot);
  const rhythm = replayNodeTiming(trace);
  const latestTiming = trace[trace.length - 1];

  console.log("[Rhythm Smoke Test]", {
    event,
    node: snapshot.node.current,
    enginePhase: snapshot.runtime.enginePhase,
    uiPhase: snapshot.runtime.uiPhase,
    rhythmScore: rhythm.stabilityScore,
    beastTone: snapshot.beast.tone,
    delta: latestTiming?.deltaFromPreviousNode ?? 0,
    stabilityScore: rhythm.stabilityScore,
  });
};

type PersonaStarOrigin = {
  index?: number;
  intensity?: number;
  resonance?: number;
};
type PersonaOutputSnapshotView = {
  motherCode?: string;
  direction?: string;
  starOrigin?: PersonaStarOrigin | string;
  trigram?: string;
};
type RuntimeCoreStar = readonly [number, number, number];
type SixSpaceConfig = {
  id: SixSpaceId;
  no: number;
  code: string;
  name: string;
};

const sixSpaceConfigs: SixSpaceConfig[] = [
  { id: "body", no: 1, code: "BODY", name: "身体空间" },
  { id: "emotion", no: 2, code: "EMOTION", name: "情绪空间" },
  { id: "thought", no: 3, code: "THOUGHT", name: "思维空间" },
  { id: "action", no: 4, code: "ACTION", name: "行为空间" },
  { id: "memory", no: 5, code: "MEMORY", name: "记忆空间" },
  { id: "goal", no: 6, code: "GOAL", name: "目标空间" },
];

function readJsonFromStorage<T>(key: string): T | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;

    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function readDevPrimaryPetalFixture(): SelectedPressureSeedContext | null {
  const viteEnv = (import.meta as ImportMeta & { env?: { DEV?: boolean } }).env;
  if (!viteEnv?.DEV || typeof window === "undefined") return null;

  const fixtureKey = new URLSearchParams(window.location.search).get("fixture");
  if (!fixtureKey) return null;

  return DEV_PRIMARY_PETAL_FIXTURES[fixtureKey] ?? null;
}

function buildSpaceRecord<T>(value: T): Record<SixSpaceId, T> {
  return {
    body: value,
    emotion: value,
    thought: value,
    action: value,
    memory: value,
    goal: value,
  };
}

function clampRuntimeValue(value: number) {
  return Math.min(1, Math.max(0, value));
}

function readPressureSeedIntensity(context: SelectedPressureSeedContext | null, seedText: string) {
  const rawIntensity = (context as (SelectedPressureSeedContext & { intensity?: unknown }) | null)?.intensity;
  if (typeof rawIntensity === "number" && Number.isFinite(rawIntensity)) {
    return clampRuntimeValue(rawIntensity);
  }

  const normalizedLength = Math.min(1, Math.max(0.18, seedText.trim().length / 72));
  const disturbanceHint = ["怕", "不敢", "压", "墙", "替代", "撑", "失去", "沉重"].reduce(
    (sum, keyword) => sum + (seedText.includes(keyword) ? 0.06 : 0),
    0,
  );

  return clampRuntimeValue(normalizedLength + disturbanceHint);
}

function resolveExecutionBeast({
  enginePhase,
  node,
  rhythmScore,
}: {
  enginePhase: ExecutionSnapshot["runtime"]["enginePhase"];
  node: ExecutionSnapshot["node"];
  rhythmScore: number;
}): ExecutionSnapshot["beast"] {
  return {
    active: true,
    resonance: clampRuntimeValue(rhythmScore),
    tone: resolveBeastTone(enginePhase, node, rhythmScore),
  };
}

function resolveBeastTone(
  enginePhase: ExecutionSnapshot["runtime"]["enginePhase"],
  node: ExecutionSnapshot["node"],
  rhythmScore: number,
): ExecutionSnapshot["beast"]["tone"] {
  if (node.current === 6 || enginePhase === "COMPLETE") return "sovereign";
  if (rhythmScore < 0.4) return "strain";
  if (rhythmScore >= 0.4 && rhythmScore < 0.7) return "calm";
  if (rhythmScore >= 0.7) return "charge";

  return "calm";
}

function createExecutionSnapshot(context: SelectedPressureSeedContext | null): ExecutionSnapshot {
  const seedText = context?.surface || "这件事刚刚发生过。";
  const primaryDimension = toProtocolPrimaryPetal(derivePrimaryPetal(context));
  const seedIntensity = readPressureSeedIntensity(context, seedText);
  const currentNode: ExecutionSnapshot["node"]["current"] = 1;
  const enginePhase: ExecutionSnapshot["runtime"]["enginePhase"] = "INIT";
  const uiPhase: ExecutionSnapshot["runtime"]["uiPhase"] = "INIT";
  const node: ExecutionSnapshot["node"] = {
    current: currentNode,
    completed: [],
    locked: false,
  };
  const rhythmScore = replayNodeTiming(getExecutionTrace({ node })).stabilityScore;

  const snapshot: ExecutionSnapshot = {
    seed: {
      id: context?.selectedPressureSeedId ?? "pressure-seed-runtime-fallback",
      text: seedText,
      category: context?.category,
      intensity: seedIntensity,
    },
    primaryDimension,
    beast: resolveExecutionBeast({
      enginePhase,
      node,
      rhythmScore,
    }),
    node,
    runtime: {
      isReady: true,
      enginePhase,
      uiPhase,
    },
  };

  assertExecutionInvariant(snapshot);
  logExecutionSnapshot(snapshot, "createExecutionSnapshot");
  return snapshot;
}

function refreshExecutionSnapshotBeast(snapshot: ExecutionSnapshot): ExecutionSnapshot {
  const rhythm = replayNodeTiming(getExecutionTrace(snapshot));
  const rhythmScore = rhythm.stabilityScore;
  const nextSnapshot: ExecutionSnapshot = {
    ...snapshot,
    beast: resolveExecutionBeast({
      enginePhase: snapshot.runtime.enginePhase,
      node: snapshot.node,
      rhythmScore,
    }),
  };

  assertExecutionInvariant(nextSnapshot);
  logExecutionSnapshot(nextSnapshot, "refreshExecutionSnapshotBeast");
  logRhythmSmokeTest(nextSnapshot, "beastToneUpdate");
  return nextSnapshot;
}

function setExecutionEnginePhase(snapshot: ExecutionSnapshot, enginePhase: ExecutionSnapshot["runtime"]["enginePhase"]): ExecutionSnapshot {
  const nextSnapshot = refreshExecutionSnapshotBeast({
    ...snapshot,
    runtime: {
      ...snapshot.runtime,
      isReady: enginePhase !== "INIT",
      enginePhase,
    },
  });

  assertExecutionInvariant(nextSnapshot);
  logExecutionSnapshot(nextSnapshot, "setExecutionEnginePhase");
  return nextSnapshot;
}

function setExecutionUiPhase(snapshot: ExecutionSnapshot, uiPhase: ExecutionSnapshot["runtime"]["uiPhase"]): ExecutionSnapshot {
  const nextSnapshot: ExecutionSnapshot = {
    ...snapshot,
    runtime: {
      ...snapshot.runtime,
      uiPhase,
    },
  };

  assertExecutionInvariant(nextSnapshot);
  logExecutionSnapshot(nextSnapshot, "setExecutionUiPhase");
  return nextSnapshot;
}

function advanceExecutionNode(snapshot: ExecutionSnapshot): ExecutionSnapshot {
  if (snapshot.node.locked || snapshot.runtime.enginePhase === "COMPLETE") return snapshot;

  const completed = Array.from(new Set([...snapshot.node.completed, snapshot.node.current])).sort((a, b) => a - b);
  const isComplete = completed.length >= 6;
  const nextCurrent = (isComplete ? 6 : Math.min(6, snapshot.node.current + 1)) as ExecutionSnapshot["node"]["current"];

  const nextSnapshot = refreshExecutionSnapshotBeast({
    ...snapshot,
    node: {
      ...snapshot.node,
      current: nextCurrent,
      completed,
    },
    runtime: {
      ...snapshot.runtime,
      isReady: true,
      enginePhase: isComplete ? "COMPLETE" : "NODE_RUNNING",
      uiPhase: isComplete ? "COMPLETE" : "NODE_RUNNING",
    },
  });

  assertExecutionInvariant(nextSnapshot);
  logExecutionSnapshot(nextSnapshot, "advanceExecutionNode");
  logRhythmSmokeTest(nextSnapshot, "advanceExecutionNode");
  return nextSnapshot;
}

type SpatialIntentType = "CORE_STAR_BLOOM" | "NODE_ADVANCE_REQUEST" | "DIMENSION_FOCUS_REQUEST";
const ALLOWED_INTENTS = ["CORE_STAR_BLOOM", "NODE_ADVANCE_REQUEST", "DIMENSION_FOCUS_REQUEST"] as const;
const ALLOWED_COMMANDS = ["ADVANCE_NODE", "NOOP"] as const;

type RawSpatialIntent = {
  type: string;
  source?: unknown;
  payload?: Record<string, unknown>;
};
type SpatialIntent = {
  type: SpatialIntentType;
  source: "UI_INTERACTION";
  payload: {
    nodeIndex?: number;
    dimension?: SixSpaceId;
    context?: "ambient" | "focus" | "inspect";
    triggerStrength?: number;
  };
};
type ExecutionCommand =
  | { type: "ADVANCE_NODE"; intent: SpatialIntent }
  | {
      type: "NOOP";
      intent: SpatialIntent;
      reason: "COMPLETE" | "FOCUS_DERIVED_ONLY" | "NO_EXECUTION_MAPPING" | "INTENT_REJECTED" | "COMMAND_REJECTED" | "SNAPSHOT_INCONSISTENT";
    };

type SceneGraph = {
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

type InteractionGraph = {
  nodes: readonly SpatialIntentType[];
  edges: readonly {
    from: SpatialIntentType;
    to: SpatialIntentType | ExecutionCommand["type"];
    rule: "governed-core-star-bloom" | "governed-node-advance" | "derived-focus-only";
  }[];
  resolution: "INTENT_GOVERNANCE_LAYER";
};

type RuntimeProjection = {
  currentPrimarySpaceId: SixSpaceId;
  sixDimensionStep: number;
  selectedPressureSeedSurface: string;
  cosmicSixDimensionState: CosmicBotanicsSixDimensionState;
  cosmicNodeStep: number;
  cosmicNarrativePhase: CosmicNarrativePhase;
  sceneGraph: SceneGraph;
  interactionGraph: InteractionGraph;
  systemIntegrityCheck: SystemIntegrityCheck;
};

type ExecutionKernel = {
  advance: (snapshot: ExecutionSnapshot) => ExecutionSnapshot;
  resolve: (command: ExecutionCommand, snapshot: ExecutionSnapshot) => ExecutionSnapshot;
  project: (snapshot: ExecutionSnapshot) => RuntimeProjection;
};

type GraphCoherenceContract = {
  sceneGraph: SceneGraph;
  interactionGraph: InteractionGraph;
  executionKernel: ExecutionKernel;
  executionSnapshot: ExecutionSnapshot;
};

type DriftType = "SCENE_DRIFT" | "INTENT_DRIFT" | "KERNEL_DRIFT";
type CoherenceReport = {
  coherence: "PASS" | "FAIL";
  driftDetected: boolean;
  driftType: DriftType[];
  checks: {
    sceneAligned: boolean;
    interactionAligned: boolean;
    kernelAligned: boolean;
  };
};

type GraphAlignmentMap = {
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

type SystemIntegrityCheck = {
  coherence: "PASS" | "FAIL";
  driftDetected: boolean;
  driftType: DriftType[];
};

function createRawSpatialIntent(type: SpatialIntentType, payload: SpatialIntent["payload"] = {}): RawSpatialIntent {
  return {
    type,
    payload,
  };
}

function isAllowedIntent(type: string): type is SpatialIntentType {
  return ALLOWED_INTENTS.includes(type as SpatialIntentType);
}

function isAllowedCommand(type: ExecutionCommand["type"]) {
  return ALLOWED_COMMANDS.includes(type);
}

function normalizeIntent(rawIntent: RawSpatialIntent): SpatialIntent {
  const type = isAllowedIntent(rawIntent.type) ? rawIntent.type : "DIMENSION_FOCUS_REQUEST";
  const payload = rawIntent.payload ?? {};
  const dimension = payload.dimension;
  const context = payload.context;
  const triggerStrength = payload.triggerStrength;
  const nodeIndex = payload.nodeIndex;

  return {
    type,
    source: "UI_INTERACTION",
    payload: {
      ...(typeof nodeIndex === "number" && nodeIndex >= 1 && nodeIndex <= 6 ? { nodeIndex } : {}),
      ...(dimension === "body" || dimension === "emotion" || dimension === "thought" || dimension === "action" || dimension === "memory" || dimension === "goal"
        ? { dimension }
        : {}),
      ...(context === "ambient" || context === "focus" || context === "inspect" ? { context } : {}),
      ...(typeof triggerStrength === "number" && Number.isFinite(triggerStrength)
        ? { triggerStrength: clampRuntimeValue(triggerStrength) }
        : {}),
    },
  };
}

function createRejectedIntent(rawIntent: RawSpatialIntent): SpatialIntent {
  return {
    type: "DIMENSION_FOCUS_REQUEST",
    source: "UI_INTERACTION",
    payload: {
      context: "inspect",
      ...(typeof rawIntent.payload?.triggerStrength === "number"
        ? { triggerStrength: clampRuntimeValue(rawIntent.payload.triggerStrength) }
        : {}),
    },
  };
}

function reduceIntent(intent: SpatialIntent, snapshot: ExecutionSnapshot): ExecutionCommand {
  switch (intent.type) {
    case "CORE_STAR_BLOOM":
      return snapshot.node.current < 6 && snapshot.runtime.enginePhase !== "COMPLETE"
        ? { type: "ADVANCE_NODE", intent: { ...intent, type: "NODE_ADVANCE_REQUEST" } }
        : { type: "NOOP", intent, reason: "COMPLETE" };
    case "NODE_ADVANCE_REQUEST":
      return snapshot.node.current < 6 && snapshot.runtime.enginePhase !== "COMPLETE"
        ? { type: "ADVANCE_NODE", intent }
        : { type: "NOOP", intent, reason: "COMPLETE" };
    case "DIMENSION_FOCUS_REQUEST":
      return { type: "NOOP", intent, reason: "FOCUS_DERIVED_ONLY" };
    default:
      return { type: "NOOP", intent, reason: "NO_EXECUTION_MAPPING" };
  }
}

function validateExecutionCommand(command: ExecutionCommand, snapshot: ExecutionSnapshot): ExecutionCommand {
  const isIntentRegistered = isAllowedIntent(command.intent.type);
  const isCommandAllowed = isAllowedCommand(command.type);
  const isSnapshotConsistent = snapshot.node.current >= 1 && snapshot.node.current <= 6 && Boolean(snapshot.runtime.enginePhase);

  if (!isIntentRegistered) return { type: "NOOP", intent: command.intent, reason: "INTENT_REJECTED" };
  if (!isCommandAllowed) return { type: "NOOP", intent: command.intent, reason: "COMMAND_REJECTED" };
  if (!isSnapshotConsistent) return { type: "NOOP", intent: command.intent, reason: "SNAPSHOT_INCONSISTENT" };

  return command;
}

function resolveGovernedExecutionCommand(rawIntent: RawSpatialIntent, snapshot: ExecutionSnapshot): ExecutionCommand {
  if (!isAllowedIntent(rawIntent.type)) {
    return { type: "NOOP", intent: createRejectedIntent(rawIntent), reason: "INTENT_REJECTED" };
  }

  return validateExecutionCommand(reduceIntent(normalizeIntent(rawIntent), snapshot), snapshot);
}

function executeExecutionCommand(command: ExecutionCommand, snapshot: ExecutionSnapshot): ExecutionSnapshot {
  logRhythmSmokeTest(snapshot, command.intent.type);

  switch (command.type) {
    case "ADVANCE_NODE":
      return advanceExecutionNode(snapshot);
    case "NOOP":
    default:
      return snapshot;
  }
}

function resolveSnapshotPrimarySpaceId(primaryDimension: PrimaryPetalProtocolDimension): SixSpaceId {
  if (primaryDimension === "behavior") return "action";
  if (primaryDimension === "motivation") return "goal";
  return primaryDimension;
}

function buildCosmicStateFromExecutionSnapshot(snapshot: ExecutionSnapshot): CosmicBotanicsSixDimensionState {
  const primarySpaceId = resolveSnapshotPrimarySpaceId(snapshot.primaryDimension);
  const completedNodeCount = snapshot.node.completed.length;

  return sixSpaceConfigs.reduce<CosmicBotanicsSixDimensionState>((acc, config) => {
    const isPrimary = config.id === primarySpaceId;
    const isComplete = snapshot.runtime.enginePhase === "COMPLETE";
    acc[config.id] = {
      petalState: isComplete ? "blooming" : isPrimary && completedNodeCount > 0 ? "active" : "dormant",
      bloomCount: isComplete ? Math.max(1, completedNodeCount) : isPrimary ? completedNodeCount : 0,
    };
    return acc;
  }, {} as CosmicBotanicsSixDimensionState);
}

function resolveCosmicNarrativePhase(uiPhase: ExecutionSnapshot["runtime"]["uiPhase"]): CosmicNarrativePhase {
  switch (uiPhase) {
    case "INIT":
      return "field_intro";
    case "SEED_ACTIVE":
      return "seed_visible";
    case "DIMENSION_LOCKED":
      return "beast_guide";
    case "COMPLETE":
      return "node_complete";
    case "NODE_RUNNING":
    default:
      return "node_active";
  }
}

function buildStarbeastFeedbackFromExecutionSnapshot(snapshot: ExecutionSnapshot): StarbeastFeedback {
  return {
    energyRing: Math.round(74 + snapshot.beast.resonance * 58),
    glowIntensity: Math.min(1, 0.18 + snapshot.beast.resonance * 0.74),
    postureShift:
      snapshot.beast.tone === "sovereign"
        ? "released"
        : snapshot.beast.tone === "charge"
          ? "opening"
          : snapshot.beast.tone === "strain"
            ? "guarding"
            : "leaning",
  };
}

function buildPressureSeedContextFromExecutionSnapshot(snapshot: ExecutionSnapshot): SelectedPressureSeedContext {
  return {
    selectedPressureSeedId: snapshot.seed.id,
    surface: snapshot.seed.text,
    category: snapshot.seed.category,
  };
}

function resolveCosmicStarBeastName(starFlowerForm: StarFlowerForm): GuanyaoStarBeastName {
  const starBeastNameByForm: Record<StarFlowerForm, GuanyaoStarBeastName> = {
    qinglong: "青龙",
    baihu: "白虎",
    zhuque: "朱雀",
    xuanwu: "玄武",
  };

  return starBeastNameByForm[starFlowerForm];
}

function resolveCosmicNarrativeDimension(spaceId: SixSpaceId | undefined): GuanyaoLanguageDimension {
  if (spaceId === "action") return "behavior";
  if (spaceId === "goal") return "motivation";
  return spaceId ?? "body";
}

function resolveSixDimensionStep(spaceId: SixSpaceId) {
  return sixSpaceConfigs.findIndex((config) => config.id === spaceId) + 1 || 1;
}

function deriveSceneGraph(snapshot: ExecutionSnapshot): SceneGraph {
  const currentPrimarySpaceId = resolveSnapshotPrimarySpaceId(snapshot.primaryDimension);
  const cosmicNarrativePhase = resolveCosmicNarrativePhase(snapshot.runtime.uiPhase);

  return {
    ambient: {
      cosmicNebulaScene: true,
      ambientStars: true,
    },
    focal: {
      blackholeVortexScene: cosmicNarrativePhase === "seed_visible" || cosmicNarrativePhase === "beast_guide",
    },
    actors: {
      starFlowerCoreRepresentation: cosmicNarrativePhase === "node_active" || cosmicNarrativePhase === "node_complete",
      baiHuConstellationLayer: true,
    },
    nodes: {
      sixDimensionWheel: true,
      activeDimension: currentPrimarySpaceId,
      activeNodeIndex: snapshot.node.completed.length,
    },
  };
}

function deriveInteractionGraph(): InteractionGraph {
  return {
    nodes: ALLOWED_INTENTS,
    edges: [
      { from: "CORE_STAR_BLOOM", to: "NODE_ADVANCE_REQUEST", rule: "governed-core-star-bloom" },
      { from: "NODE_ADVANCE_REQUEST", to: "ADVANCE_NODE", rule: "governed-node-advance" },
      { from: "DIMENSION_FOCUS_REQUEST", to: "NOOP", rule: "derived-focus-only" },
    ],
    resolution: "INTENT_GOVERNANCE_LAYER",
  };
}

function deriveGraphAlignmentMap(snapshot: ExecutionSnapshot): GraphAlignmentMap {
  const cosmicNarrativePhase = resolveCosmicNarrativePhase(snapshot.runtime.uiPhase);

  return {
    sceneState: {
      activeDimension: resolveSnapshotPrimarySpaceId(snapshot.primaryDimension),
      activeNodeIndex: snapshot.node.completed.length,
      blackholeVortexScene: cosmicNarrativePhase === "seed_visible" || cosmicNarrativePhase === "beast_guide",
      starFlowerCoreRepresentation: cosmicNarrativePhase === "node_active" || cosmicNarrativePhase === "node_complete",
    },
    interactionState: {
      allowedIntents: ALLOWED_INTENTS,
      mappedIntents: ALLOWED_INTENTS,
    },
    executionState: {
      enginePhase: snapshot.runtime.enginePhase,
      uiPhase: snapshot.runtime.uiPhase,
      nodeCurrent: snapshot.node.current,
      allowedCommands: ALLOWED_COMMANDS,
    },
  };
}

function validateGraphCoherence(
  snapshot: ExecutionSnapshot,
  sceneGraph: SceneGraph,
  interactionGraph: InteractionGraph,
): CoherenceReport {
  const alignment = deriveGraphAlignmentMap(snapshot);
  const sceneAligned =
    sceneGraph.nodes.activeDimension === alignment.sceneState.activeDimension &&
    sceneGraph.nodes.activeNodeIndex === alignment.sceneState.activeNodeIndex &&
    sceneGraph.focal.blackholeVortexScene === alignment.sceneState.blackholeVortexScene &&
    sceneGraph.actors.starFlowerCoreRepresentation === alignment.sceneState.starFlowerCoreRepresentation;
  const interactionNodesRegistered = interactionGraph.nodes.every(isAllowedIntent);
  const interactionEdgesRegistered = interactionGraph.edges.every(
    (edge) =>
      isAllowedIntent(edge.from) &&
      (isAllowedIntent(edge.to) || isAllowedCommand(edge.to as ExecutionCommand["type"])),
  );
  const interactionHasNoOrphans = alignment.interactionState.allowedIntents.every((intent) => interactionGraph.nodes.includes(intent));
  const interactionAligned =
    interactionGraph.resolution === "INTENT_GOVERNANCE_LAYER" &&
    interactionNodesRegistered &&
    interactionEdgesRegistered &&
    interactionHasNoOrphans;
  const kernelAligned =
    executionKernel.advance === advanceExecutionNode &&
    executionKernel.resolve === executeExecutionCommand &&
    executionKernel.project === projectExecutionSnapshot &&
    alignment.executionState.nodeCurrent >= 1 &&
    alignment.executionState.nodeCurrent <= 6 &&
    Boolean(alignment.executionState.enginePhase) &&
    Boolean(alignment.executionState.uiPhase);
  const driftType: DriftType[] = [
    ...(sceneAligned ? [] : (["SCENE_DRIFT"] as const)),
    ...(interactionAligned ? [] : (["INTENT_DRIFT"] as const)),
    ...(kernelAligned ? [] : (["KERNEL_DRIFT"] as const)),
  ];

  return {
    coherence: driftType.length === 0 ? "PASS" : "FAIL",
    driftDetected: driftType.length > 0,
    driftType,
    checks: {
      sceneAligned,
      interactionAligned,
      kernelAligned,
    },
  };
}

function createGraphCoherenceContract(snapshot: ExecutionSnapshot): GraphCoherenceContract {
  return {
    sceneGraph: deriveSceneGraph(snapshot),
    interactionGraph: deriveInteractionGraph(),
    executionKernel,
    executionSnapshot: snapshot,
  };
}

function createSystemIntegrityCheck(report: CoherenceReport): SystemIntegrityCheck {
  return {
    coherence: report.coherence,
    driftDetected: report.driftDetected,
    driftType: report.driftType,
  };
}

function projectExecutionSnapshot(snapshot: ExecutionSnapshot): RuntimeProjection {
  const currentPrimarySpaceId = resolveSnapshotPrimarySpaceId(snapshot.primaryDimension);
  const graphContract = createGraphCoherenceContract(snapshot);
  const coherenceReport = validateGraphCoherence(
    graphContract.executionSnapshot,
    graphContract.sceneGraph,
    graphContract.interactionGraph,
  );

  return {
    currentPrimarySpaceId,
    sixDimensionStep: resolveSixDimensionStep(currentPrimarySpaceId),
    selectedPressureSeedSurface: snapshot.seed.text,
    cosmicSixDimensionState: buildCosmicStateFromExecutionSnapshot(snapshot),
    cosmicNodeStep: snapshot.node.completed.length,
    cosmicNarrativePhase: resolveCosmicNarrativePhase(snapshot.runtime.uiPhase),
    sceneGraph: graphContract.sceneGraph,
    interactionGraph: graphContract.interactionGraph,
    systemIntegrityCheck: createSystemIntegrityCheck(coherenceReport),
  };
}

const executionKernel: ExecutionKernel = Object.freeze({
  advance: advanceExecutionNode,
  resolve: executeExecutionCommand,
  project: projectExecutionSnapshot,
});

function hashPersonaStarInput(input: string) {
  let hash = 2166136261;

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return Math.abs(hash >>> 0);
}

function resolveStarOriginSeed(snapshot: PersonaOutputSnapshotView | null) {
  const origin = snapshot?.starOrigin;

  if (origin && typeof origin === "object") {
    return {
      index: origin.index ?? 0,
      intensity: origin.intensity ?? 1,
      resonance: origin.resonance ?? 1,
    };
  }

  const fallbackSeed = hashPersonaStarInput(
    `${snapshot?.motherCode ?? "MOTHER_PENDING"}|${snapshot?.direction ?? "白虎"}|${snapshot?.trigram ?? "兑"}|${origin ?? ""}`,
  );

  return {
    index: fallbackSeed % 28,
    intensity: (fallbackSeed % 7) + 1,
    resonance: (fallbackSeed % 5) + 1,
  };
}

function buildRuntimeBaiHuCoreStars(snapshot: PersonaOutputSnapshotView | null): RuntimeCoreStar[] {
  const starOrigin = resolveStarOriginSeed(snapshot);
  const directionSeed = hashPersonaStarInput(`${snapshot?.direction ?? "白虎"}|${snapshot?.motherCode ?? ""}`);
  const phase = (starOrigin.index % 7) - 3;
  const lift = (starOrigin.resonance - 3) * 0.72;
  const stretch = 1 + (starOrigin.intensity - 4) * 0.012;
  const tailRise = (directionSeed % 4) * 0.8;
  const baseStars: RuntimeCoreStar[] = [
    [20, 42, 6.2],
    [31, 35, 5.2],
    [44, 31, 5.6],
    [58, 28, 6.8],
    [70, 31, 5.4],
    [79, 36, 5.8],
    [86, 42, 5.2],
  ];

  return baseStars.map(([x, y, size], index) => {
    const spineWave = Math.sin((index + phase) * 0.84) * 1.8;
    const tailBias = index >= 5 ? -tailRise * (index - 4) : 0;
    const shoulderBias = index === 1 || index === 2 ? -starOrigin.intensity * 0.16 : 0;

    return [
      50 + (x - 50) * stretch,
      y + spineWave + lift + tailBias + shoulderBias,
      size + (index === starOrigin.index % 7 ? 1.1 : 0),
    ] as RuntimeCoreStar;
  });
}

type CosmicNarrativePhase = "field_intro" | "seed_visible" | "beast_guide" | "node_active" | "node_complete";

function CosmicPageStarField() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5 }}>
      {Array.from({ length: 42 }).map((_, index) => (
        <span
          key={index}
          style={{
            position: "absolute",
            left: `${4 + ((index * 19) % 92)}%`,
            top: `${5 + ((index * 31) % 88)}%`,
            width: index % 9 === 0 ? 3 : 2,
            height: index % 9 === 0 ? 3 : 2,
            borderRadius: 999,
            background: index % 6 === 0 ? "rgba(199,169,107,0.5)" : "rgba(245,245,245,0.32)",
            boxShadow: index % 6 === 0 ? "0 0 12px rgba(199,169,107,0.32)" : "0 0 8px rgba(245,245,245,0.18)",
          }}
        />
      ))}
    </div>
  );
}

function CosmicFieldKeyframes() {
  return (
    <style>{`
      @keyframes gy-nebula-drift {
        0%, 100% { transform: translate3d(-1%, -1%, 0) scale(1); opacity: 0.48; }
        50% { transform: translate3d(1%, 1%, 0) scale(1.04); opacity: 0.68; }
      }
      @keyframes gy-blackhole-spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
      }
      @keyframes gy-stardust-drift {
        0%, 100% { transform: translateX(-2px); opacity: 0.42; }
        50% { transform: translateX(4px); opacity: 0.78; }
      }
      @keyframes gy-petal-bloom {
        0% { transform: translate(-50%, -50%) rotate(var(--petal-rotate)) scale(0.92); opacity: 0.62; }
        45% { transform: translate(-50%, -50%) rotate(var(--petal-rotate)) scale(1.08); opacity: 1; }
        100% { transform: translate(-50%, -50%) rotate(var(--petal-rotate)) scale(1); opacity: 0.88; }
      }
      @keyframes gy-petal-float {
        0%, 100% { transform: translate(-50%, -50%) rotate(var(--petal-rotate)) scale(1); }
        50% { transform: translate(-50%, calc(-50% - 4px)) rotate(var(--petal-rotate)) scale(1.03); }
      }
      @keyframes gy-pollen-rise {
        0% { transform: translate(-50%, -50%) scale(0.2); opacity: 0; }
        25% { opacity: 1; }
        100% { transform: translate(calc(-50% + var(--pollen-x)), calc(-50% + var(--pollen-y))) scale(1); opacity: 0; }
      }
      @keyframes gy-node-pulse {
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.82; }
        50% { transform: translate(-50%, -50%) scale(1.16); opacity: 1; }
      }
      @keyframes gy-starbeast-ignite {
        0% { opacity: 0.18; transform: translate(-50%, -50%) scale(0.72); }
        55% { opacity: 1; transform: translate(-50%, -50%) scale(1.18); }
        100% { opacity: 0.86; transform: translate(-50%, -50%) scale(1); }
      }
      @keyframes gy-starbeast-line {
        0% { stroke-dashoffset: 220; opacity: 0; }
        100% { stroke-dashoffset: 0; opacity: 1; }
      }
      @keyframes gy-starbeast-breathe {
        0%, 100% { transform: translate(-50%, -50%) scale(0.98); opacity: 0.72; }
        50% { transform: translate(-50%, calc(-50% - 3px)) scale(1.03); opacity: 0.92; }
      }
      @keyframes gy-starbeast-ripple {
        0% { transform: translate(-50%, -50%) scale(0.92); opacity: 0.34; }
        100% { transform: translate(-50%, -50%) scale(1.32); opacity: 0; }
      }
      @keyframes gy-starbeast-dust {
        0%, 100% { transform: translate(-50%, -50%) scale(0.82); opacity: 0.36; }
        50% { transform: translate(calc(-50% + 2px), calc(-50% - 2px)) scale(1.08); opacity: 0.86; }
      }
      @keyframes gy-starbeast-inner-breathe {
        0%, 100% { transform: translate(-50%, -50%) scale(0.72); opacity: 0.24; }
        50% { transform: translate(-50%, -50%) scale(1.08); opacity: 0.72; }
      }
      @keyframes gy-copy-fade-in {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  );
}

function CosmicNebulaScene({ toneColor }: { toneColor: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: "-10%",
        background:
          `radial-gradient(circle at 28% 30%, rgba(${toneColor},0.1), transparent 24%), radial-gradient(circle at 74% 62%, rgba(120,92,150,0.12), transparent 28%), radial-gradient(circle at 50% 50%, rgba(176,210,206,0.08), transparent 34%)`,
        filter: "blur(12px)",
        animation: "gy-nebula-drift 8s ease-in-out infinite",
        pointerEvents: "none",
      }}
    />
  );
}

function CosmicAmbientStars() {
  return (
    <div style={{ position: "absolute", inset: 0, opacity: 0.38, pointerEvents: "none" }}>
      {Array.from({ length: 28 }).map((_, index) => {
        const left = 8 + ((index * 17) % 84);
        const top = 10 + ((index * 29) % 78);
        return (
          <span
            key={index}
            style={{
              position: "absolute",
              left: `${left}%`,
              top: `${top}%`,
              width: index % 7 === 0 ? 3 : 2,
              height: index % 7 === 0 ? 3 : 2,
              borderRadius: 999,
              background: "rgba(245,245,245,0.62)",
              boxShadow: "0 0 10px rgba(245,245,245,0.36)",
            }}
          />
        );
      })}
    </div>
  );
}

function BlackholeVortexScene({ toneColor, visible, status }: { toneColor: string; visible: boolean; status: string }) {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "32%",
        width: "78%",
        minHeight: 108,
        transform: "translateX(-50%)",
        display: visible ? "grid" : "none",
        placeItems: "center",
        color: "rgba(245,245,245,0.86)",
        pointerEvents: "none",
        textAlign: "center",
        animation: "gy-copy-fade-in 360ms ease both",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 124,
          height: 124,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(5,6,7,0.92) 0 27%, rgba(40,22,64,0.72) 44%, rgba(199,169,107,0.1) 58%, transparent 72%)",
          boxShadow: "inset 0 0 32px rgba(5,6,7,0.9), 0 0 38px rgba(80,58,120,0.34)",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 148,
          height: 148,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          border: "1px solid rgba(199,169,107,0.12)",
          borderTopColor: "rgba(176,210,206,0.28)",
          animation: "gy-blackhole-spin 12s linear infinite",
        }}
      />
      <span
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          placeItems: "center",
          gap: 6,
          width: "100%",
          maxWidth: 188,
          color: "rgba(245,245,245,0.82)",
          fontSize: 12,
          lineHeight: 1.46,
          fontWeight: 520,
          textShadow: `0 0 16px rgba(${toneColor},0.18)`,
          animation: "gy-stardust-drift 4s ease-in-out infinite",
        }}
      >
        <span>{status}</span>
      </span>
    </div>
  );
}

function NodeProgressionPanel({
  visible,
  toneColor,
  activeNode,
}: {
  visible: boolean;
  toneColor: string;
  activeNode: { title: string; text: string; actionText: string };
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: 22,
        right: 22,
        bottom: 18,
        gap: 6,
        pointerEvents: "none",
        padding: "11px 13px 10px",
        borderRadius: 14,
        background: "linear-gradient(180deg, rgba(5,6,7,0.5), rgba(5,6,7,0.18))",
        border: `1px solid rgba(${toneColor},0.14)`,
        backdropFilter: "blur(4px)",
        display: visible ? "grid" : "none",
        animation: "gy-copy-fade-in 360ms ease both",
      }}
    >
      <GuanyaoText size="eyebrow" tone="gold">
        {activeNode.title}
      </GuanyaoText>
      <p style={{ margin: 0, whiteSpace: "pre-line", color: "rgba(245,245,245,0.76)", fontSize: 12, lineHeight: 1.46 }}>
        {activeNode.text}
      </p>
      <GuanyaoText size="eyebrow" tone="gold">
        {activeNode.actionText}
      </GuanyaoText>
    </div>
  );
}

function StarFlowerCoreRepresentation({
  visible,
  activeNodeIndex,
  nodeCount,
  coreReadiness,
  coreTone,
  coreGlow,
}: {
  visible: boolean;
  activeNodeIndex: number;
  nodeCount: number;
  coreReadiness: number;
  coreTone: string;
  coreGlow: number;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "50%",
        top: "57%",
        width: 104 + coreReadiness * 14,
        height: 104 + coreReadiness * 14,
        transform: `translate(-50%, -50%) scale(${visible ? 1 : 0.9})`,
        pointerEvents: "none",
        opacity: visible ? 0.38 + coreReadiness * 0.24 : 0,
        filter: `drop-shadow(0 0 ${14 + coreReadiness * 12}px rgba(${coreTone},${coreGlow}))`,
        transition: "opacity 360ms ease, width 360ms ease, height 360ms ease, transform 360ms ease, filter 360ms ease",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 18 + coreReadiness * 8,
          height: 18 + coreReadiness * 8,
          borderRadius: 999,
          transform: "translate(-50%, -50%)",
          background: `rgba(${coreTone},${0.32 + coreReadiness * 0.16})`,
          boxShadow: `0 0 ${18 + coreReadiness * 20}px rgba(${coreTone},${coreGlow})`,
          transition: "width 360ms ease, height 360ms ease, background 360ms ease, box-shadow 360ms ease",
        }}
      />
      {Array.from({ length: 6 }).map((_, index) => {
        const angle = -90 + index * 60;
        const isComplete = index < activeNodeIndex;
        const isCurrent = index === Math.min(activeNodeIndex, nodeCount - 1);
        const nodeAlpha = isComplete ? 0.62 : isCurrent ? 0.78 : 0.2;
        const nodeSize = isCurrent ? 9 : isComplete ? 7 : 5;
        return (
          <span
            key={`flower-core-${index}`}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: nodeSize,
              height: 26 + coreReadiness * 13,
              borderRadius: 999,
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(${-28 - coreReadiness * 8}px)`,
              transformOrigin: `50% ${28 + coreReadiness * 8}px`,
              background: `linear-gradient(180deg, rgba(${coreTone},${nodeAlpha}), rgba(${coreTone},0.03))`,
              boxShadow: isComplete || isCurrent ? `0 0 ${12 + coreReadiness * 10}px rgba(${coreTone},${coreGlow})` : "none",
              transition: "width 360ms ease, height 360ms ease, transform 360ms ease, background 360ms ease, box-shadow 360ms ease",
            }}
          />
        );
      })}
    </div>
  );
}

function EnergyReturnFlow({
  visible,
  activeNodeIndex,
  coreReadiness,
  coreTone,
  coreGlow,
}: {
  visible: boolean;
  activeNodeIndex: number;
  coreReadiness: number;
  coreTone: string;
  coreGlow: number;
}) {
  if (!visible || activeNodeIndex <= 0) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "50%",
        top: "45%",
        width: 42,
        height: 104,
        transform: "translateX(-50%)",
        pointerEvents: "none",
        opacity: 0.34 + coreReadiness * 0.18,
      }}
    >
      {Array.from({ length: Math.min(6, activeNodeIndex + 1) }).map((_, index) => (
        <span
          key={`return-flow-${index}`}
          style={{
            "--pollen-x": `${(index % 2 === 0 ? -1 : 1) * (4 + index)}px`,
            "--pollen-y": `${-44 - index * 6}px`,
            position: "absolute",
            left: `${44 + ((index * 7) % 16)}%`,
            top: `${76 - index * 13}%`,
            width: 2 + (index % 2),
            height: 2 + (index % 2),
            borderRadius: 999,
            background: `rgba(${coreTone},${0.34 + coreReadiness * 0.18})`,
            boxShadow: `0 0 10px rgba(${coreTone},${coreGlow})`,
            animation: `gy-pollen-rise ${900 + index * 90}ms ease-out infinite ${index * 120}ms`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}

function SixDimensionWheel({
  configs,
  activeConfig,
  petalStates,
  toneColor,
  shortPetalNames,
}: {
  configs: SixSpaceConfig[];
  activeConfig: SixSpaceConfig;
  petalStates: Record<SixSpaceId, CosmicPetalState>;
  toneColor: string;
  shortPetalNames: string[];
}) {
  return (
    <>
      {configs.map((config, index) => {
        const angle = -90 + index * 60;
        const rad = (angle * Math.PI) / 180;
        const isActive = config.id === activeConfig.id;
        const state = petalStates[config.id];
        const left = 50 + Math.cos(rad) * 32;
        const top = 58 + Math.sin(rad) * 18;

        return (
          <span
            key={config.id}
            style={{
              "--petal-rotate": `${angle + 90}deg`,
              position: "absolute",
              left: `${left}%`,
              top: `${top}%`,
              width: isActive ? 64 : 50,
              height: isActive ? 26 : 20,
              borderRadius: "50%",
              transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`,
              background: `linear-gradient(90deg, rgba(${toneColor},${isActive ? 0.28 : 0.08}), rgba(245,245,245,${state === "blooming" ? 0.16 : 0.04}))`,
              border: `1px solid rgba(${toneColor},${isActive ? 0.42 : 0.14})`,
              boxShadow: isActive ? `0 0 24px rgba(${toneColor},0.22)` : "none",
              opacity: isActive ? 0.96 : 0.54,
              pointerEvents: "none",
              animation: "gy-petal-float 4.6s ease-in-out infinite",
            } as CSSProperties}
          >
            <span
              style={{
                display: "block",
                transform: `rotate(${-angle - 90}deg)`,
                color: isActive ? "rgba(245,245,245,0.72)" : "rgba(245,245,245,0.32)",
                fontSize: 9,
                lineHeight: "26px",
                textAlign: "center",
                letterSpacing: "0.04em",
              }}
            >
              {shortPetalNames[index]}
            </span>
          </span>
        );
      })}
    </>
  );
}

type BaiHuConstellationLayerProps = {
  toneColor: string;
  narrativePhase: CosmicNarrativePhase;
  activeNodeIndex: number;
  onCoreStarClick: () => void;
  coreStars: RuntimeCoreStar[];
};

function CoreStarInteractionLayer({
  coreStars,
  toneColor,
  reveal,
  nodeCharge,
  coreGlow,
  onCoreStarClick,
}: {
  coreStars: RuntimeCoreStar[];
  toneColor: string;
  reveal: number;
  nodeCharge: number;
  coreGlow: number;
  onCoreStarClick: () => void;
}) {
  return (
    <>
      {coreStars.map(([left, top, size], index) => (
        <span
          key={`core-${index}`}
          role="button"
          aria-label="轻触七星，把一点光送回白虎。"
          tabIndex={0}
          onClick={onCoreStarClick}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onCoreStarClick();
            }
          }}
          style={{
            position: "absolute",
            left: `${left}%`,
            top: `${top}%`,
            width: size + nodeCharge * 1.8,
            height: size + nodeCharge * 1.8,
            borderRadius: 999,
            transform: "translate(-50%, -50%)",
            background: `rgba(255,247,220,${0.54 + reveal * 0.36})`,
            boxShadow: `0 0 ${10 + reveal * 14 + nodeCharge * 16}px rgba(${toneColor},${coreGlow})`,
            animation: `gy-starbeast-ignite 760ms ease both ${index * 90}ms`,
            cursor: "pointer",
            pointerEvents: "auto",
          }}
        />
      ))}
    </>
  );
}

function BaiHuConstellationLayer({ toneColor, narrativePhase, activeNodeIndex, onCoreStarClick, coreStars }: BaiHuConstellationLayerProps) {
  const reveal = narrativePhase === "field_intro" ? 0.34 : narrativePhase === "seed_visible" ? 0.66 : 1;
  const bodyAlpha = narrativePhase === "beast_guide" || narrativePhase === "node_active" || narrativePhase === "node_complete" ? 0.82 : 0.2;
  const nodeCharge = Math.min(1, Math.max(0, activeNodeIndex / 6));
  const coreGlow = 0.26 + reveal * 0.24 + nodeCharge * 0.22;
  const coreLineAlpha = 0.04 + reveal * 0.14 + nodeCharge * 0.06;
  const headShape = [
    [7, 44, 1.7], [9, 39, 1.6], [12, 35, 1.7], [15, 32, 1.8], [19, 33, 1.6],
    [22, 36, 1.8], [24, 40, 1.7], [23, 44, 1.5], [20, 48, 1.5], [17, 51, 1.7],
    [13, 52, 1.6], [9, 50, 1.8], [5, 48, 1.4], [4, 43, 1.2], [6, 38, 1.3],
    [10, 34, 1.4], [13, 29, 1.5], [17, 29, 1.4], [21, 31, 1.3], [26, 37, 1.2],
    [6, 53, 1.2], [10, 56, 1.4], [15, 56, 1.5], [20, 53, 1.3], [20, 42, 3.3],
    [12, 41, 1.7], [14, 45, 1.6], [16, 39, 1.4], [18, 36, 1.3],
  ] as const;
  const headDust = headShape.map(([left, top, size], index) => ({
    left,
    top,
    size,
    delay: (index % 8) * 115,
    alpha: index === headShape.length - 1 ? 0.68 : 0.26 + ((index * 5) % 9) / 78,
  }));
  const backDust = Array.from({ length: 38 }).map((_, index) => {
    const t = index / 37;
    return {
      left: 24 + t * 59,
      top: 42 - Math.sin(t * Math.PI) * 16 + Math.sin(t * 14) * 1.2,
      size: 1.4 + (index % 4) * 0.25,
      delay: (index % 10) * 110,
      alpha: 0.2 + ((index * 7) % 8) / 86,
    };
  });
  const bellyDust = Array.from({ length: 18 }).map((_, index) => {
    const t = index / 17;
    return {
      left: 25 + t * 49,
      top: 56 + Math.sin(t * Math.PI) * 5 + Math.cos(t * 13) * 1.8,
      size: 1.2 + (index % 3) * 0.3,
      delay: (index % 9) * 125,
      alpha: 0.15 + ((index * 3) % 8) / 100,
    };
  });
  const legDust = [
    ...Array.from({ length: 9 }).map((_, index) => ({ left: 29 + index * 0.35 + Math.sin(index * 0.8) * 2, top: 56 + index * 3.4, group: 0 })),
    ...Array.from({ length: 8 }).map((_, index) => ({ left: 42 + index * 0.75 - Math.sin(index * 0.7) * 1.7, top: 55 + index * 3.3, group: 1 })),
    ...Array.from({ length: 10 }).map((_, index) => ({ left: 60 + index * 0.45 + Math.sin(index * 0.65) * 2.2, top: 55 + index * 3.6, group: 2 })),
    ...Array.from({ length: 8 }).map((_, index) => ({ left: 75 + index * 0.92 - Math.sin(index * 0.75) * 1.6, top: 53 + index * 3.2, group: 3 })),
  ].map((particle, index) => ({
    left: particle.left,
    top: particle.top,
    size: 1.25 + (particle.group % 2) * 0.34,
    delay: (index % 12) * 95,
    alpha: 0.18 + ((index * 4) % 8) / 96,
  }));
  const tailDust = Array.from({ length: 38 }).map((_, index) => {
    const t = index / 37;
    const angle = t * Math.PI * 1.92;
    return {
      left: 78 + Math.sin(angle) * 13 + t * 12,
      top: 42 - Math.sin(t * Math.PI) * 39 + Math.cos(angle) * 5,
      size: 1.1 + (index % 4) * 0.25,
      delay: (index % 10) * 105,
      alpha: 0.16 + ((index * 6) % 8) / 100,
    };
  });
  const tailTipDust = [
    [95, 21, 2.5],
    [97, 17, 1.7],
    [93, 14, 1.5],
    [90, 18, 1.3],
    [91, 24, 1.4],
  ] as const;
  const tailTipParticles = tailTipDust.map(([left, top, size], index) => ({
    left,
    top,
    size,
    delay: index * 130,
    alpha: index === 0 ? 0.54 : 0.24 + index * 0.04,
  }));
  const silhouetteDust = [...headDust, ...backDust, ...bellyDust, ...legDust, ...tailDust, ...tailTipParticles];
  const innerDust = Array.from({ length: 32 }).map((_, index) => ({
    left: 27 + ((index * 17) % 48),
    top: 39 + ((index * 19) % 19),
    size: 1.2 + (index % 3) * 0.45,
    delay: (index % 9) * 170,
    alpha: 0.08 + nodeCharge * 0.16 + ((index * 5) % 8) / 110,
  }));

  return (
    <div
      role="group"
      aria-label="轻触七星，把一点光送回白虎。"
      style={{
        position: "absolute",
        left: "50%",
        top: "18%",
        width: 242,
        height: 146,
        transform: "translate(-50%, -50%)",
        opacity: 0.62 + reveal * 0.3,
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "visible",
          filter: `drop-shadow(0 0 ${10 + nodeCharge * 14}px rgba(${toneColor},${coreGlow}))`,
        }}
      >
        <path
          d={coreStars.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`).join(" ")}
          fill="none"
          stroke={`rgba(${toneColor},${coreLineAlpha})`}
          strokeWidth="0.42"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            animation:
              narrativePhase === "seed_visible" || narrativePhase === "beast_guide"
                ? "gy-starbeast-line 680ms ease-out both"
                : "none",
            }}
          />
      </svg>

      {silhouetteDust.map((particle, index) => (
        <span
          key={`silhouette-${index}`}
          style={{
            position: "absolute",
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
            borderRadius: 999,
            transform: "translate(-50%, -50%)",
            background: `rgba(255,248,224,${particle.alpha + bodyAlpha * 0.34})`,
            boxShadow: `0 0 ${5 + nodeCharge * 5}px rgba(${toneColor},${0.14 + bodyAlpha * 0.16})`,
            animation: `gy-starbeast-dust 3.4s ease-in-out infinite ${particle.delay}ms`,
          }}
        />
      ))}

      {innerDust.map((particle, index) => (
        <span
          key={`inner-${index}`}
          style={{
            position: "absolute",
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
            borderRadius: 999,
            transform: "translate(-50%, -50%)",
            background: `rgba(${toneColor},${particle.alpha + reveal * 0.08})`,
            boxShadow: `0 0 ${4 + nodeCharge * 8}px rgba(${toneColor},${0.12 + nodeCharge * 0.16})`,
            animation: `gy-starbeast-inner-breathe 4.2s ease-in-out infinite ${particle.delay}ms`,
          }}
        />
      ))}

      <CoreStarInteractionLayer
        coreStars={coreStars}
        toneColor={toneColor}
        reveal={reveal}
        nodeCharge={nodeCharge}
        coreGlow={coreGlow}
        onCoreStarClick={onCoreStarClick}
      />

      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          bottom: -8,
          transform: "translateX(-50%)",
          color: `rgba(255,248,224,${0.28 + reveal * 0.12})`,
          fontSize: 10,
          lineHeight: 1,
          letterSpacing: "0.08em",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          textShadow: `0 0 10px rgba(${toneColor},0.16)`,
        }}
      >
        轻触星点，白虎会接住这一点光。
      </span>

      <span
        style={{
          position: "absolute",
          left: "55%",
          top: "49%",
          width: 116 + nodeCharge * 18,
          height: 58 + nodeCharge * 12,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(ellipse, rgba(${toneColor},${0.08 + bodyAlpha * 0.12}), transparent 68%)`,
          filter: "blur(3px)",
          animation: "gy-starbeast-breathe 4.8s ease-in-out infinite",
        }}
      />

      {narrativePhase === "node_active" || narrativePhase === "node_complete" ? (
        <span
          style={{
            position: "absolute",
            left: "55%",
            top: "50%",
            width: 126 + nodeCharge * 18,
            height: 70 + nodeCharge * 10,
            borderRadius: "50%",
            border: `1px solid rgba(${toneColor},${0.18 + nodeCharge * 0.14})`,
            animation: "gy-starbeast-ripple 1.8s ease-out infinite",
          }}
        />
      ) : null}
    </div>
  );
}

function CosmicBotanicsField({
  configs,
  currentStep,
  pressureSeedSurface,
  petalStates,
  pollenBursts,
  starbeast,
  starFlowerForm,
  starFlowerState,
  hexagramReadiness,
  activeNodeIndex,
  narrativePhase,
  onNodeBloom,
  coreStars,
}: {
  configs: SixSpaceConfig[];
  currentStep: number;
  pressureSeedSurface: string;
  petalStates: Record<SixSpaceId, CosmicPetalState>;
  pollenBursts: Record<SixSpaceId, number>;
  starbeast: StarbeastFeedback;
  starFlowerForm: StarFlowerForm;
  starFlowerState: StarFlowerGrowthState;
  hexagramReadiness: number;
  activeNodeIndex: number;
  narrativePhase: CosmicNarrativePhase;
  onNodeBloom: () => void;
  coreStars: RuntimeCoreStar[];
}) {
  const seedTone = pressureSeedSurface.length % 3;
  const toneColor = seedTone === 0 ? "199,169,107" : seedTone === 1 ? "222,196,154" : "176,210,206";
  const activeConfig = configs[Math.max(0, Math.min(configs.length - 1, currentStep - 1))] ?? configs[0];
  const activePetalState = activeConfig ? petalStates[activeConfig.id] : "active";
  const narrative = generateSixDimensionalTuningDialogue({
    pressureSeedText: pressureSeedSurface,
    starBeastName: resolveCosmicStarBeastName(starFlowerForm),
    dimension: resolveCosmicNarrativeDimension(activeConfig?.id),
  });
  const nodeFlow = narrative.nodes;
  const activeNode = nodeFlow[Math.min(activeNodeIndex, nodeFlow.length - 1)];
  const showBlackholeStatus = narrativePhase === "seed_visible" || narrativePhase === "beast_guide";
  const showPressureText = narrativePhase === "seed_visible" || narrativePhase === "beast_guide";
  const showBeastIntro = narrativePhase === "beast_guide";
  const showNodePanel = narrativePhase === "node_active" || narrativePhase === "node_complete";
  const shortPetalNames = ["身体", "情绪", "思维", "行为", "记忆", "目标"];
  const coreReadiness = Math.max(hexagramReadiness, activeNodeIndex / Math.max(1, nodeFlow.length));
  const coreVisible = narrativePhase === "node_active" || narrativePhase === "node_complete";
  const coreGlow = 0.1 + starbeast.glowIntensity * 0.14 + coreReadiness * 0.12;
  const coreTone = starFlowerState === "blooming" || starFlowerState === "rebirth" ? toneColor : "176,210,206";

  return (
    <section
      aria-label="六维宇宙花冠"
      style={{
        position: "relative",
        minHeight: 536,
        border: "1px solid rgba(199,169,107,0.16)",
        borderRadius: 24,
        overflow: "hidden",
        padding: "18px 16px",
        background:
          `radial-gradient(circle at 52% 24%, rgba(80,58,120,0.2), transparent 28%), radial-gradient(circle at 50% 58%, rgba(${toneColor},0.14), rgba(5,6,7,0.12) 36%, rgba(5,6,7,0.04) 100%)`,
        boxShadow: activePetalState === "blooming" ? `0 0 30px rgba(${toneColor},0.12)` : "none",
      }}
    >
      <CosmicFieldKeyframes />
      <CosmicNebulaScene toneColor={toneColor} />
      <CosmicAmbientStars />

      <BaiHuConstellationLayer
        toneColor={toneColor}
        narrativePhase={narrativePhase}
        activeNodeIndex={activeNodeIndex}
        onCoreStarClick={onNodeBloom}
        coreStars={coreStars}
      />

      <BlackholeVortexScene toneColor={toneColor} visible={showBlackholeStatus} status={narrative.blackholeStatus} />

      <p
        style={{
          position: "absolute",
          left: 28,
          right: 28,
          top: "43%",
          zIndex: 1,
          margin: 0,
          color: "rgba(245,245,245,0.78)",
          fontSize: 13,
          lineHeight: 1.52,
          fontWeight: 560,
          textAlign: "center",
          pointerEvents: "none",
          display: showPressureText ? "block" : "none",
          animation: "gy-copy-fade-in 360ms ease both",
        }}
      >
        {narrative.pressureText}
      </p>

      <NodeProgressionPanel visible={showNodePanel} toneColor={toneColor} activeNode={activeNode} />

      <p
        style={{
          position: "absolute",
          left: 22,
          right: 22,
          top: "47%",
          zIndex: 1,
          margin: 0,
          whiteSpace: "pre-line",
          color: `rgba(${toneColor},0.72)`,
          fontSize: 11,
          lineHeight: 1.5,
          pointerEvents: "none",
          display: showBeastIntro ? "block" : "none",
          animation: "gy-copy-fade-in 360ms ease both",
        }}
      >
        {narrative.beastIntro}
      </p>

      <StarFlowerCoreRepresentation
        visible={coreVisible}
        activeNodeIndex={activeNodeIndex}
        nodeCount={nodeFlow.length}
        coreReadiness={coreReadiness}
        coreTone={coreTone}
        coreGlow={coreGlow}
      />

      <EnergyReturnFlow
        visible={coreVisible}
        activeNodeIndex={activeNodeIndex}
        coreReadiness={coreReadiness}
        coreTone={coreTone}
        coreGlow={coreGlow}
      />

      <SixDimensionWheel
        configs={configs}
        activeConfig={activeConfig}
        petalStates={petalStates}
        toneColor={toneColor}
        shortPetalNames={shortPetalNames}
      />

    </section>
  );
}

function HexagramCodeDeliveryShell() {
  const [executionSnapshot, setExecutionSnapshot] = useState<ExecutionSnapshot>(() =>
    createExecutionSnapshot(readDevPrimaryPetalFixture() ?? readJsonFromStorage<SelectedPressureSeedContext>("guanyao:selectedPressureSeedContext")),
  );
  const [personaOutputSnapshot] = useState(() =>
    readJsonFromStorage<PersonaOutputSnapshotView>("guanyao:personaOutputSnapshot"),
  );
  const runtimeProjection = executionKernel.project(executionSnapshot);
  const {
    currentPrimarySpaceId,
    sixDimensionStep,
    selectedPressureSeedSurface,
    cosmicSixDimensionState,
    cosmicNodeStep,
    cosmicNarrativePhase,
  } = runtimeProjection;
  const cosmicBotanicsRuntime = runCosmicBotanicsRuntimeEngine({
    pressureSeed: selectedPressureSeedSurface,
    sixDimensionState: cosmicSixDimensionState,
  });
  const baiHuRuntimeCoreStars = buildRuntimeBaiHuCoreStars(personaOutputSnapshot);

  const visiblePetalStates = sixSpaceConfigs.reduce<Record<SixSpaceId, CosmicPetalState>>((acc, config, index) => {
    const baseState = cosmicBotanicsRuntime.sixDimensionState[config.id].petalState;
    const isCurrent = sixDimensionStep === index + 1;
    const isCompleted = cosmicNodeStep >= 6;
    acc[config.id] = isCompleted ? "blooming" : isCurrent && baseState === "dormant" ? "active" : baseState;
    return acc;
  }, buildSpaceRecord<CosmicPetalState>("dormant"));
  const cosmicPollenBursts = sixSpaceConfigs.reduce<Record<SixSpaceId, number>>((acc, config) => {
    acc[config.id] = cosmicBotanicsRuntime.sixDimensionState[config.id].bloomCount;
    return acc;
  }, buildSpaceRecord(0));
  const starbeastFeedbackComplete = executionSnapshot.runtime.enginePhase === "COMPLETE" && visiblePetalStates[currentPrimarySpaceId] === "blooming";
  const hexagramAssetCandidate = resolveHexagramAssetCandidate({
    personaSnapshot: personaOutputSnapshot,
    selectedPressureSeedContext: buildPressureSeedContextFromExecutionSnapshot(executionSnapshot),
    currentPrimarySpaceId,
    completedNodeCount: cosmicNodeStep,
    starbeastFeedbackComplete,
    pressureSeedFallbackText: selectedPressureSeedSurface,
  });

  function handleSpatialInteraction(eventType: SpatialIntentType, context: SpatialIntent["payload"] = {}) {
    const rawIntent = createRawSpatialIntent(eventType, context);
    setExecutionSnapshot((current) => executionKernel.resolve(resolveGovernedExecutionCommand(rawIntent, current), current));
  }

  function bloomCosmicNode() {
    handleSpatialInteraction("CORE_STAR_BLOOM", {
      nodeIndex: executionSnapshot.node.current,
      dimension: currentPrimarySpaceId,
      context: "focus",
      triggerStrength: 1,
    });
  }

  useEffect(() => {
    const seedTimer = window.setTimeout(() => {
      setExecutionSnapshot((current) => {
        const nextEngine =
          current.runtime.enginePhase === "INIT" ? setExecutionEnginePhase(current, "SEED_ACTIVE") : current;
        return current.runtime.uiPhase === "INIT" ? setExecutionUiPhase(nextEngine, "SEED_ACTIVE") : nextEngine;
      });
    }, 950);
    const beastTimer = window.setTimeout(() => {
      setExecutionSnapshot((current) =>
        current.runtime.uiPhase === "SEED_ACTIVE" || current.runtime.uiPhase === "INIT"
          ? setExecutionUiPhase(current, "DIMENSION_LOCKED")
          : current,
      );
    }, 2400);
    const nodeTimer = window.setTimeout(() => {
      setExecutionSnapshot((current) => {
        const nextEngine =
          current.runtime.enginePhase === "SEED_ACTIVE" || current.runtime.enginePhase === "INIT"
            ? setExecutionEnginePhase(current, "NODE_RUNNING")
            : current;
        return current.runtime.uiPhase === "DIMENSION_LOCKED" || current.runtime.uiPhase === "SEED_ACTIVE" || current.runtime.uiPhase === "INIT"
          ? setExecutionUiPhase(nextEngine, "NODE_RUNNING")
          : nextEngine;
      });
    }, 3600);

    return () => {
      window.clearTimeout(seedTimer);
      window.clearTimeout(beastTimer);
      window.clearTimeout(nodeTimer);
    };
  }, []);

  if (USE_COSMIC_BOTANICS_SIX_SPACE || LEGACY_DYNAMICS_FLOW_ISOLATED) {
    const activeCosmicConfig = sixSpaceConfigs[Math.max(0, Math.min(sixSpaceConfigs.length - 1, sixDimensionStep - 1))] ?? sixSpaceConfigs[0];
    const cosmicPageCopy = generateSixDimensionalTuningDialogue({
      pressureSeedText: selectedPressureSeedSurface,
      starBeastName: resolveCosmicStarBeastName(cosmicBotanicsRuntime.starFlower.form),
      dimension: resolveCosmicNarrativeDimension(activeCosmicConfig?.id),
    });
    const cosmicTopCopyOpacity =
      cosmicNarrativePhase === "field_intro"
        ? 1
        : cosmicNarrativePhase === "seed_visible"
          ? 0.82
          : cosmicNarrativePhase === "beast_guide"
            ? 0.42
            : 0;

    return (
      <main
        style={{
          minHeight: "100dvh",
          width: "100%",
          boxSizing: "border-box",
          padding: "46px 20px calc(34px + env(safe-area-inset-bottom))",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 22,
          background:
            "radial-gradient(circle at 50% 28%, rgba(199,169,107,0.08), transparent 32%), radial-gradient(circle at 50% 64%, rgba(0,184,212,0.05), transparent 42%), #050607",
          color: "#f5f5f5",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <CosmicPageStarField />

        <section
          style={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gap: 18,
            opacity: cosmicTopCopyOpacity,
            transition: "opacity 360ms ease",
            pointerEvents: cosmicTopCopyOpacity > 0 ? "auto" : "none",
          }}
        >
          <span
            style={{
              color: "rgba(199,169,107,0.76)",
              fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              fontSize: 12,
              letterSpacing: "0.16em",
            }}
          >
            FIELD 04 / 6D ALIGNMENT
          </span>

          <p style={{ margin: 0, maxWidth: 292, color: "rgba(245,245,245,0.64)", fontSize: 15, lineHeight: 1.6 }}>
            {cosmicPageCopy.fieldTitle}
          </p>
        </section>

        <section
          style={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gap: 18,
          }}
        >
          <CosmicBotanicsField
            configs={sixSpaceConfigs}
            currentStep={sixDimensionStep}
            pressureSeedSurface={selectedPressureSeedSurface}
            petalStates={visiblePetalStates}
            pollenBursts={cosmicPollenBursts}
            starbeast={buildStarbeastFeedbackFromExecutionSnapshot(executionSnapshot)}
            starFlowerForm={cosmicBotanicsRuntime.starFlower.form}
            starFlowerState={cosmicBotanicsRuntime.starFlower.growthState}
            hexagramReadiness={cosmicBotanicsRuntime.hexagramCardGeneration.readiness}
            activeNodeIndex={cosmicNodeStep}
            narrativePhase={cosmicNarrativePhase}
            onNodeBloom={bloomCosmicNode}
            coreStars={baiHuRuntimeCoreStars}
          />
        </section>

        <footer
          data-hexagram-asset-candidate-status={hexagramAssetCandidate.status}
          data-hexagram-asset-candidate-state={hexagramAssetCandidate.completionState}
          style={{
            position: "relative",
            zIndex: 1,
            display: "block",
            color: "rgba(245,245,245,0.5)",
            fontSize: 12,
            lineHeight: 1.55,
          }}
        >
          {cosmicNarrativePhase === "node_complete" &&
          hexagramAssetCandidate.completionState === "READY_TO_CRYSTALLIZE"
            ? cosmicPageCopy.completionText
            : ""}
        </footer>
      </main>
    );
  }



  // DEPRECATED / ISOLATED / NOT IN ACTIVE 1.0 FLOW.
  return <LegacyDynamicsDormant branch="six-space-weapon-annular-asset" />;
}

export function GravityPage() {
  return <HexagramCodeDeliveryShell />;
}
