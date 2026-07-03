import type { StarbeastFeedback } from "../services/guanyaoCosmicBotanicsRuntimeEngine";
import {
  derivePrimaryPetal,
  toProtocolPrimaryPetal,
  type SelectedPressureSeedContext,
} from "../services/guanyaoPrimaryPetalResolver";
import {
  ALLOWED_COMMANDS,
  ALLOWED_INTENTS,
  deriveInteractionGraph,
  isAllowedCommand,
  isAllowedIntent,
  resolveGovernedExecutionCommand,
} from "./interactionGraph";
import {
  buildCosmicStateFromExecutionSnapshot,
  deriveGraphAlignmentMap,
  deriveSceneGraph,
  resolveCosmicNarrativePhase,
  resolveSixDimensionStep,
  resolveSnapshotPrimarySpaceId,
} from "./sceneGraph";
import type {
  CoherenceReport,
  ExecutionCommand,
  ExecutionKernel,
  ExecutionSnapshot,
  GraphCoherenceContract,
  InteractionGraph,
  NodeTimingTraceEntry,
  RuntimeProjection,
  RuntimeIntent,
  SceneGraph,
  SystemIntegrityCheck,
} from "./guanyaoRuntimeTypes";
import { sixSpaceConfigs } from "./guanyaoRuntimeTypes";

export type {
  CosmicNarrativePhase,
  ExecutionSnapshot,
  RuntimeIntent,
  RuntimeProjection,
  SixSpaceConfig,
  SixSpaceId,
  SpatialIntent,
  SpatialIntentType,
} from "./guanyaoRuntimeTypes";

function clampRuntimeValue(value: number) {
  return Math.min(1, Math.max(0, value));
}

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

function validateGraphCoherence(
  snapshot: ExecutionSnapshot,
  sceneGraphValue: SceneGraph,
  interactionGraph: InteractionGraph,
): CoherenceReport {
  const alignment = deriveGraphAlignmentMap(snapshot);
  const sceneAligned =
    sceneGraphValue.nodes.activeDimension === alignment.sceneState.activeDimension &&
    sceneGraphValue.nodes.activeNodeIndex === alignment.sceneState.activeNodeIndex &&
    sceneGraphValue.focal.blackholeVortexScene === alignment.sceneState.blackholeVortexScene &&
    sceneGraphValue.actors.starFlowerCoreRepresentation === alignment.sceneState.starFlowerCoreRepresentation;
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
  const driftType: CoherenceReport["driftType"] = [
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

  return {
    sixSpaceConfigs,
    currentPrimarySpaceId,
    sixDimensionStep: resolveSixDimensionStep(currentPrimarySpaceId),
    selectedPressureSeedSurface: snapshot.seed.text,
    cosmicSixDimensionState: buildCosmicStateFromExecutionSnapshot(snapshot),
    cosmicNodeStep: snapshot.node.completed.length,
    cosmicNarrativePhase: resolveCosmicNarrativePhase(snapshot.runtime.uiPhase),
    pressureSeedContext: buildPressureSeedContextFromExecutionSnapshot(snapshot),
    starbeastFeedback: buildStarbeastFeedbackFromExecutionSnapshot(snapshot),
  };
}

const executionKernel: ExecutionKernel = Object.freeze({
  advance: advanceExecutionNode,
  resolve: executeExecutionCommand,
  project: projectExecutionSnapshot,
});

function isRuntimePhaseIntent(intent: RuntimeIntent): intent is Extract<RuntimeIntent, { type: "SET_ENGINE_PHASE" | "SET_UI_PHASE" }> {
  return intent.type === "SET_ENGINE_PHASE" || intent.type === "SET_UI_PHASE";
}

function run(snapshot: ExecutionSnapshot, intent: RuntimeIntent): ExecutionSnapshot {
  if (isRuntimePhaseIntent(intent)) {
    if (intent.type === "SET_ENGINE_PHASE") return setExecutionEnginePhase(snapshot, intent.payload.enginePhase);
    return setExecutionUiPhase(snapshot, intent.payload.uiPhase);
  }

  return executionKernel.resolve(resolveGovernedExecutionCommand(intent, snapshot), snapshot);
}

function validate(snapshot: ExecutionSnapshot): SystemIntegrityCheck {
  const graphContract = createGraphCoherenceContract(snapshot);
  return createSystemIntegrityCheck(
    validateGraphCoherence(graphContract.executionSnapshot, graphContract.sceneGraph, graphContract.interactionGraph),
  );
}

export const GUANYAO_RUNTIME_ENGINE_PACKAGE = "@guanyao/runtime-engine" as const;
export const GUANYAO_RUNTIME_ENGINE_VERSION = "1.0.0" as const;

export const GuanyaoRuntimeEngine = Object.freeze({
  createSnapshot: createExecutionSnapshot,
  run,
  advance: advanceExecutionNode,
  project: projectExecutionSnapshot,
  validate,
});

export type GuanyaoRuntimeEnginePublicApi = typeof GuanyaoRuntimeEngine;

export type EngineInstance = Readonly<{
  id: string;
  engine: GuanyaoRuntimeEnginePublicApi;
  snapshot: ExecutionSnapshot;
}>;

export type GuanyaoPluginContext = Readonly<{
  intent: RuntimeIntent;
  snapshot: ExecutionSnapshot;
  projection?: RuntimeProjection;
  metadata: Readonly<Record<string, unknown>>;
}>;

export type GuanyaoPlugin = Readonly<{
  name: string;
  version: string;
  type: "intent_middleware" | "snapshot_transform" | "projection_extension";
  execute: (context: GuanyaoPluginContext) => GuanyaoPluginContext;
}>;

export type PluginRegistry = Readonly<{
  register: (plugin: GuanyaoPlugin) => PluginRegistry;
  resolve: (context: GuanyaoPluginContext) => GuanyaoPluginContext;
  list: () => readonly GuanyaoPlugin[];
}>;

function cloneExecutionSnapshot(snapshot: ExecutionSnapshot): ExecutionSnapshot {
  return Object.freeze({
    seed: Object.freeze({
      ...snapshot.seed,
    }),
    primaryDimension: snapshot.primaryDimension,
    beast: Object.freeze({
      ...snapshot.beast,
    }),
    node: Object.freeze({
      ...snapshot.node,
      completed: Object.freeze([...snapshot.node.completed]) as number[],
    }),
    runtime: Object.freeze({
      ...snapshot.runtime,
    }),
  }) as ExecutionSnapshot;
}

function hashRuntimeString(input: string) {
  let hash = 2166136261;

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return Math.abs(hash >>> 0);
}

function stableSnapshotKey(snapshot: ExecutionSnapshot) {
  return [
    snapshot.seed.id,
    snapshot.seed.text,
    snapshot.seed.category ?? "",
    snapshot.seed.intensity ?? "",
    snapshot.primaryDimension,
    snapshot.beast.active ? "1" : "0",
    snapshot.beast.resonance,
    snapshot.beast.tone,
    snapshot.node.current,
    snapshot.node.completed.join(","),
    snapshot.node.locked ? "1" : "0",
    snapshot.runtime.isReady ? "1" : "0",
    snapshot.runtime.enginePhase,
    snapshot.runtime.uiPhase,
  ].join("|");
}

function deriveEngineInstanceId(snapshot: ExecutionSnapshot) {
  return `gy-runtime-${hashRuntimeString(stableSnapshotKey(snapshot)).toString(36)}`;
}

export function injectSnapshot(instance: EngineInstance, snapshot: ExecutionSnapshot): EngineInstance {
  return Object.freeze({
    id: instance.id,
    engine: instance.engine,
    snapshot: cloneExecutionSnapshot(snapshot),
  });
}

function executeCycle(instance: EngineInstance, intent: RuntimeIntent): ExecutionSnapshot {
  return instance.engine.run(instance.snapshot, intent);
}

function createPluginContext(intent: RuntimeIntent, snapshot: ExecutionSnapshot): GuanyaoPluginContext {
  return Object.freeze({
    intent,
    snapshot: cloneExecutionSnapshot(snapshot),
    metadata: Object.freeze({}),
  });
}

function sanitizePluginContext(context: GuanyaoPluginContext): GuanyaoPluginContext {
  return Object.freeze({
    intent: context.intent,
    snapshot: cloneExecutionSnapshot(context.snapshot),
    projection: context.projection,
    metadata: Object.freeze({ ...context.metadata }),
  });
}

export function createPluginRegistry(plugins: readonly GuanyaoPlugin[] = []): PluginRegistry {
  const registryPlugins = Object.freeze([...plugins]);

  return Object.freeze({
    register(plugin: GuanyaoPlugin): PluginRegistry {
      return createPluginRegistry([...registryPlugins, plugin]);
    },

    resolve(context: GuanyaoPluginContext): GuanyaoPluginContext {
      return registryPlugins.reduce<GuanyaoPluginContext>((nextContext, plugin) => {
        const resolvedContext = plugin.execute(sanitizePluginContext(nextContext));
        return sanitizePluginContext(resolvedContext);
      }, sanitizePluginContext(context));
    },

    list(): readonly GuanyaoPlugin[] {
      return registryPlugins;
    },
  });
}

export function executePluginCycle(
  instance: EngineInstance,
  intent: RuntimeIntent,
  registry: PluginRegistry = createPluginRegistry(),
): EngineInstance {
  const prePluginContext = registry.resolve(createPluginContext(intent, instance.snapshot));
  const nextSnapshot = instance.engine.run(instance.snapshot, prePluginContext.intent);
  const projection = instance.engine.project(nextSnapshot);
  registry.resolve(
    Object.freeze({
      intent: prePluginContext.intent,
      snapshot: nextSnapshot,
      projection,
      metadata: prePluginContext.metadata,
    }),
  );

  return injectSnapshot(instance, nextSnapshot);
}

export const RuntimeOrchestrator = Object.freeze({
  createInstance(initialSnapshot: ExecutionSnapshot): EngineInstance {
    const snapshot = cloneExecutionSnapshot(initialSnapshot);
    return Object.freeze({
      id: deriveEngineInstanceId(snapshot),
      engine: GuanyaoRuntimeEngine,
      snapshot,
    });
  },

  sendIntent(instance: EngineInstance, intent: RuntimeIntent): EngineInstance {
    return injectSnapshot(instance, executeCycle(instance, intent));
  },

  sendIntentWithPlugins(instance: EngineInstance, intent: RuntimeIntent, registry: PluginRegistry): EngineInstance {
    return executePluginCycle(instance, intent, registry);
  },

  injectSnapshot,

  getSnapshot(instance: EngineInstance): ExecutionSnapshot {
    return cloneExecutionSnapshot(instance.snapshot);
  },

  destroyInstance(_instance: EngineInstance): null {
    return null;
  },
});

export type RuntimeOrchestratorApi = typeof RuntimeOrchestrator;

export function createRuntimeEngine(): RuntimeOrchestratorApi {
  return RuntimeOrchestrator;
}
