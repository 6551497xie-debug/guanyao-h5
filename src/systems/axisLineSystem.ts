// Axis Line System = 1px causal gravity engine that converts human interaction
// into structured reality output.
// REBOUND ≠ animation end. REBOUND = behavior crystallization point.
//
// V2 CAUSAL CORE —— 纯逻辑层（无 DOM / 无 UI / 无独立视觉对象）。
// 仅承载：事件协议(emitAxisEvent) + 状态机生命周期 hooks(enter/exit/transitionState)
//        + 轻耦合订阅总线(subscribe) + AxisBehaviorAsset 行为结构体生成器。
// 唯一视觉现实层仍是 1px Axis Line（渲染在 AxisLinePage.tsx），本模块不渲染任何东西。

export type AxisState = "IDLE" | "TENSION" | "OVERRIDE" | "BREAK" | "REBOUND";

export type AxisEventType =
  // 首屏 1px 轴线（充能启动轨）
  | "TENSION"
  | "OVERRIDE"
  | "BREAK"
  | "REBOUND_COMPLETE"
  // 二屏双轴（时空变频 + 维度锁止）
  | "FREQUENCY_TUNING"
  | "TIME_LOCK"
  | "ORIGIN_LOCKED";

export type AxisLifecyclePhase = "enterState" | "exitState" | "transitionState";

export type AxisOverrideMode = "LONG_PRESS" | "EXTREME_DRAG" | "DIRECT";

export type AxisEvent = { type: AxisEventType; payload: unknown };

// 统一对外广播消息（语义事件 + 状态机生命周期）
export type AxisMessage =
  | { kind: "AXIS_EVENT"; type: AxisEventType; payload: unknown; timestamp: number }
  | {
      kind: "AXIS_TRANSITION";
      phase: AxisLifecyclePhase;
      from: AxisState | null;
      to: AxisState;
      timestamp: number;
    };

export type AxisSubscriber = (message: AxisMessage) => void;

// ---- 行为采样（AxisBehaviorAsset 生成输入）----
export type AxisTrajectorySample = { t: number; offset: number };

export type AxisRunState = {
  startedAt: number;
  trajectory: AxisTrajectorySample[];
  peakTension: number;
  directionSign: number; // +1 下拉 / -1 上拉 / 0 平
  override: { tMs: number; offset: number; mode: AxisOverrideMode; x: number } | null;
  breakPoint: { tMs: number; gapPx: number; fragments: number } | null;
  reboundStartedAt: number | null;
  endedAt: number | null;
};

// ---- 行为结构体（现实沉积）----
export type AxisBehaviorAsset = {
  behaviorTrajectory: AxisTrajectorySample[];
  inertiaPattern: {
    dominantDirection: "down" | "up" | "flat";
    peakTension: number;
    dwellMs: number;
    samples: number;
  };
  overridePoint: { tMs: number; offset: number; mode: AxisOverrideMode } | null;
  breakSignature: { tMs: number; gapPx: number; fragments: number } | null;
  reboundSignature: { durationMs: number; model: "y = sin(t) * exp(-t)"; finalProgress: number };
};

export function createEmptyRunState(now: number): AxisRunState {
  return {
    startedAt: now,
    trajectory: [],
    peakTension: 0,
    directionSign: 0,
    override: null,
    breakPoint: null,
    reboundStartedAt: null,
    endedAt: null,
  };
}

// 轻耦合订阅总线：subscribe("GRAVITY_ENGINE") / subscribe("SCENE_LAYER") / ...
// 命名通道，一通道一处理器；外部引擎按需读取语义事件与生命周期。
const subscribers = new Map<string, AxisSubscriber>();

function broadcast(message: AxisMessage) {
  subscribers.forEach((handler) => {
    try {
      handler(message);
    } catch {
      // 隔离订阅者异常，不污染因果引擎主流程
    }
  });
}

export const axisLineSystem = {
  subscribe(channel: string, handler: AxisSubscriber): () => void {
    subscribers.set(channel, handler);
    return () => {
      subscribers.delete(channel);
    };
  },

  // 语义事件出口：所有 state 变化必须可被外部订阅
  emitAxisEvent(event: AxisEvent): void {
    broadcast({
      kind: "AXIS_EVENT",
      type: event.type,
      payload: event.payload,
      timestamp: Date.now(),
    });
  },

  // 状态机生命周期 hooks：enterState / exitState / transitionState
  emitTransition(phase: AxisLifecyclePhase, from: AxisState | null, to: AxisState): void {
    broadcast({
      kind: "AXIS_TRANSITION",
      phase,
      from,
      to,
      timestamp: Date.now(),
    });
  },

  // 将 REBOUND 终态结构化为行为资产
  crystallizeAxisBehaviorAsset(axisState: AxisRunState): AxisBehaviorAsset {
    const endedAt = axisState.endedAt ?? Date.now();
    const dwellMs = Math.max(0, endedAt - axisState.startedAt);
    const dominantDirection =
      axisState.directionSign > 0 ? "down" : axisState.directionSign < 0 ? "up" : "flat";
    const reboundDurationMs =
      axisState.reboundStartedAt != null ? Math.max(0, endedAt - axisState.reboundStartedAt) : 0;

    return {
      behaviorTrajectory: axisState.trajectory,
      inertiaPattern: {
        dominantDirection,
        peakTension: axisState.peakTension,
        dwellMs,
        samples: axisState.trajectory.length,
      },
      overridePoint: axisState.override
        ? { tMs: axisState.override.tMs, offset: axisState.override.offset, mode: axisState.override.mode }
        : null,
      breakSignature: axisState.breakPoint,
      reboundSignature: {
        durationMs: reboundDurationMs,
        model: "y = sin(t) * exp(-t)",
        finalProgress: 1,
      },
    };
  },
};
