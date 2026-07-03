import type {
  ExecutionCommand,
  ExecutionSnapshot,
  InteractionGraph,
  RawSpatialIntent,
  SpatialIntent,
  SpatialIntentType,
} from "./guanyaoRuntimeTypes";

export const ALLOWED_INTENTS = ["CORE_STAR_BLOOM", "NODE_ADVANCE_REQUEST", "DIMENSION_FOCUS_REQUEST"] as const;
export const ALLOWED_COMMANDS = ["ADVANCE_NODE", "NOOP"] as const;

export function createRawSpatialIntent(type: SpatialIntentType, payload: SpatialIntent["payload"] = {}): RawSpatialIntent {
  return {
    type,
    payload,
  };
}

export function isAllowedIntent(type: string): type is SpatialIntentType {
  return ALLOWED_INTENTS.includes(type as SpatialIntentType);
}

export function isAllowedCommand(type: ExecutionCommand["type"]) {
  return ALLOWED_COMMANDS.includes(type);
}

function clampRuntimeValue(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function normalizeIntent(rawIntent: RawSpatialIntent): SpatialIntent {
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

export function createRejectedIntent(rawIntent: RawSpatialIntent): SpatialIntent {
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

export function reduceIntent(intent: SpatialIntent, snapshot: ExecutionSnapshot): ExecutionCommand {
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

export function validateExecutionCommand(command: ExecutionCommand, snapshot: ExecutionSnapshot): ExecutionCommand {
  const isIntentRegistered = isAllowedIntent(command.intent.type);
  const isCommandAllowed = isAllowedCommand(command.type);
  const isSnapshotConsistent = snapshot.node.current >= 1 && snapshot.node.current <= 6 && Boolean(snapshot.runtime.enginePhase);

  if (!isIntentRegistered) return { type: "NOOP", intent: command.intent, reason: "INTENT_REJECTED" };
  if (!isCommandAllowed) return { type: "NOOP", intent: command.intent, reason: "COMMAND_REJECTED" };
  if (!isSnapshotConsistent) return { type: "NOOP", intent: command.intent, reason: "SNAPSHOT_INCONSISTENT" };

  return command;
}

export function resolveGovernedExecutionCommand(rawIntent: RawSpatialIntent, snapshot: ExecutionSnapshot): ExecutionCommand {
  if (!isAllowedIntent(rawIntent.type)) {
    return { type: "NOOP", intent: createRejectedIntent(rawIntent), reason: "INTENT_REJECTED" };
  }

  return validateExecutionCommand(reduceIntent(normalizeIntent(rawIntent), snapshot), snapshot);
}

export function deriveInteractionGraph(): InteractionGraph {
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

export const intentEngine = Object.freeze({
  createRawSpatialIntent,
  normalizeIntent,
  reduceIntent,
  validateExecutionCommand,
  resolveGovernedExecutionCommand,
});
