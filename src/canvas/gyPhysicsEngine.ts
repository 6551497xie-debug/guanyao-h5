// ═══════════════════════════════════════════════════════════════════
// 观爻 2.0 · 行为物理引擎（Behavioral Physics Engine）
//
// 职责：
//   - 聚合 AxisPhysics + SignalDot 状态机
//   - 将 PhysicsInput 分发给各子系统
//   - 向 Canvas 输出 EngineSnapshot（每帧）
//   - 不读写任何业务数据
//   - 不绑定任何 UI 组件
// ═══════════════════════════════════════════════════════════════════

import { GyAxisPhysics } from "./gyAxisPhysics";
import type {
  DotPhysicsState,
  EngineSnapshot,
  PhysicsConfig,
  PhysicsInput,
  RailMode,
  SignalDotState,
} from "./types";

// ── 信号节点状态机 ────────────────────────────────────────────────
// 每个节点独立持有状态，引擎负责跳变规则

interface DotInternal {
  id: string;
  state: SignalDotState;
}

// 节点跳变规则：axis 进入 locked → 对应节点 locked
//               axis 进入 break  → 激活节点 broken
//               axis 进入 idle   → 所有 idle
function dotNextState(
  current: SignalDotState,
  axisLockedNow: boolean,
  axisJustBroke: boolean,
  isActive: boolean
): SignalDotState {
  if (axisJustBroke && isActive) return "broken";
  if (axisLockedNow && isActive) return "locked";
  if (isActive && !axisLockedNow) return "active";
  return current === "broken" ? "broken" : "idle";
}

// ── 引擎主类 ──────────────────────────────────────────────────────

export class GyPhysicsEngine {
  private axisPhysics: GyAxisPhysics;
  private dots: DotInternal[];
  private railMode: RailMode = "measure";
  private activeDotIndex: number = 0;
  private _prevAxisLocked: boolean = false;
  private _prevAxisBroke: boolean = false;

  constructor(
    dotIds: string[],
    config: Partial<PhysicsConfig> = {}
  ) {
    this.axisPhysics = new GyAxisPhysics(config);
    this.dots = dotIds.map((id) => ({ id, state: "idle" as SignalDotState }));
  }

  // ── 主输入入口 ────────────────────────────────────────────────

  dispatch(input: PhysicsInput): void {
    // 1. 先判定 rail mode
    if (input.kind === "swipe-right") this.railMode = "advance";
    if (input.kind === "swipe-left")  this.railMode = "break";
    if (input.kind === "hold-start")  this.railMode = "measure";

    // 2. 推送给 axis 物理层
    this.axisPhysics.apply(input);

    // 3. 同步 dot 状态
    this._syncDots();
  }

  private _syncDots(): void {
    const axisSnap = this.axisPhysics.snapshot();
    const justLocked = axisSnap.isLocked && !this._prevAxisLocked;
    const justBroke  = axisSnap.lineState === "break" && !this._prevAxisBroke;

    if (justLocked && this.activeDotIndex < this.dots.length) {
      // 推进完成 → 当前激活节点锁止，激活下一个
      const cur = this.dots[this.activeDotIndex];
      if (cur) cur.state = "locked";
      this.activeDotIndex = Math.min(this.activeDotIndex + 1, this.dots.length - 1);
    }

    this.dots = this.dots.map((dot, i) => ({
      ...dot,
      state: dotNextState(
        dot.state,
        axisSnap.isLocked,
        justBroke,
        i === this.activeDotIndex
      ),
    }));

    this._prevAxisLocked = axisSnap.isLocked;
    this._prevAxisBroke  = axisSnap.lineState === "break";
  }

  // ── 快照输出（给 Canvas 每帧读取） ───────────────────────────

  snapshot(): EngineSnapshot {
    return {
      axis: this.axisPhysics.snapshot() as ReturnType<GyAxisPhysics["snapshot"]>,
      dots: this.dots.map((d): DotPhysicsState => ({ id: d.id, dotState: d.state })),
      railMode: this.railMode,
      ts: Date.now(),
    };
  }

  // ── 管理 ─────────────────────────────────────────────────────

  reset(): void {
    this.axisPhysics.reset();
    this.activeDotIndex = 0;
    this._prevAxisLocked = false;
    this._prevAxisBroke = false;
    this.railMode = "measure";
    this.dots = this.dots.map((d) => ({ ...d, state: "idle" }));
  }

  destroy(): void {
    this.axisPhysics.destroy();
  }
}
