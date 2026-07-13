import type { CosmicBotanicsSixDimensionState } from "../services/guanyaoCosmicBotanicsRuntimeEngine";
import type { PrimaryPetalProtocolDimension } from "../types/primaryPetal";
import type {
  CosmicNarrativePhase,
  ExecutionSnapshot,
  GraphAlignmentMap,
  SceneGraph,
  SixSpaceId,
} from "./guanyaoRuntimeTypes";
import { ALLOWED_COMMANDS, ALLOWED_INTENTS } from "./interactionGraph";
import { sixSpaceConfigs } from "./guanyaoRuntimeTypes";

export function resolveSnapshotPrimarySpaceId(primaryDimension: PrimaryPetalProtocolDimension): SixSpaceId {
  if (primaryDimension === "behavior") return "action";
  if (primaryDimension === "motivation") return "goal";
  return primaryDimension;
}

export function buildCosmicStateFromExecutionSnapshot(snapshot: ExecutionSnapshot): CosmicBotanicsSixDimensionState {
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

export function resolveCosmicNarrativePhase(uiPhase: ExecutionSnapshot["runtime"]["uiPhase"]): CosmicNarrativePhase {
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

export function resolveSixDimensionStep(spaceId: SixSpaceId) {
  return sixSpaceConfigs.findIndex((config) => config.id === spaceId) + 1 || 1;
}

export function deriveSceneGraph(snapshot: ExecutionSnapshot): SceneGraph {
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

export function deriveGraphAlignmentMap(snapshot: ExecutionSnapshot): GraphAlignmentMap {
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

export const sceneGraph = Object.freeze({
  derive: deriveSceneGraph,
  deriveAlignment: deriveGraphAlignmentMap,
});
