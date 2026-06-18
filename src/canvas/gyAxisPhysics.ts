// ═══════════════════════════════════════════════════════════════════
// 观爻 2.0 · 1px 生命线物理控制器
// 状态跳变必须突变，不做 easing。不处理 DOM，不读写业务数据。
// ═══════════════════════════════════════════════════════════════════

import type {
  AxisLineState,
  AxisPhysicsState,
  PhysicsConfig,
  PhysicsInput,
} from "./types";
import { DEFAULT_PHYSICS_CONFIG } from "./types";

type TransitionKey = `${AxisLineState}:${PhysicsInput["kind"]}`;

// 合法状态跳变路由（未列出 = 静默忽略）
const VALID_TRANSITIONS = new Set<TransitionKey>([
  "idle:swipe-right",
  "idle:swipe-left",    // 从静止左滑 → 产生短暂张力闪变
  "idle:hold-start",
  "ignite:swipe-right",
  "ignite:swipe-left",
  "ignite:hold-start",
  "ignite:hold-release",
  "tense:swipe-right",
  "tense:swipe-left",
  "tense:hold-start",
  "tense:hold-release",
  "locked:swipe-left",
  "break:hold-release",
  "rebound:tap",
  "rebound:swipe-right",
]);

function isValidTransition(current: AxisLineState, kind: PhysicsInput["kind"]): boolean {
  return VALID_TRANSITIONS.has(`${current}:${kind}`);
}

export class GyAxisPhysics {
  private state: AxisPhysicsState;
  private config: PhysicsConfig;
  private reboundTimer: ReturnType<typeof setTimeout> | null = null;
  private decayTimer:   ReturnType<typeof setTimeout> | null = null;

  constructor(config: Partial<PhysicsConfig> = {}) {
    this.config = { ...DEFAULT_PHYSICS_CONFIG, ...config };
    this.state  = { lineState: "idle", progress: 0, tension: 0, isLocked: false };
  }

  snapshot(): Readonly<AxisPhysicsState> {
    return { ...this.state };
  }

  apply(input: PhysicsInput): void {
    if (!isValidTransition(this.state.lineState, input.kind)) return;
    this._clearDecayTimer();

    switch (input.kind) {
      case "swipe-right":   this._handleSwipeRight(input); break;
      case "swipe-left":    this._handleSwipeLeft(input);  break;
      case "hold-start":    this._handleHoldStart(input);  break;
      case "hold-release":  this._handleHoldRelease();     break;
      case "tap":           this._handleTap();             break;
    }
  }

  // ── 右滑：推进 ────────────────────────────────────────────────

  private _handleSwipeRight(input: PhysicsInput): void {
    const next = Math.min(1, input.progress * this.config.tensionRate);

    if (next >= this.config.advanceCompleteThreshold) {
      this._jump({ lineState: "locked", progress: 1, tension: 0, isLocked: true });
      return;
    }

    // 0.5 以上进入 tense 区；指数曲线模拟压强递增（越接近临界越难推）
    const rawT   = next > 0.5 ? (next - 0.5) * 2 : 0;
    const tension = rawT > 0 ? Math.pow(rawT, 1.55) : 0;
    this._jump({
      lineState: tension > 0.18 ? "tense" : "ignite",
      progress:  next,
      tension,
      isLocked:  false,
    });
  }

  // ── 左滑：张力破坏 ────────────────────────────────────────────

  private _handleSwipeLeft(input: PhysicsInput): void {
    const { lineState, tension } = this.state;

    // 从 idle 快速左滑 → 短暂紧绷闪变后自动衰减
    if (lineState === "idle") {
      this._jump({ lineState: "tense", progress: 0.08, tension: 0.28, isLocked: false });
      this.decayTimer = setTimeout(() => {
        if (this.state.lineState === "tense") {
          this._jump({ lineState: "idle", progress: 0, tension: 0, isLocked: false });
        }
      }, 220);
      return;
    }

    const shouldBreak =
      input.velocityPxMs >= this.config.breakVelocityThreshold ||
      tension >= this.config.breakTensionThreshold;

    if (shouldBreak) {
      this._clearReboundTimer();
      this._jump({ lineState: "break", progress: 0, tension: 1, isLocked: false });
      return;
    }

    // 速度不够 → 进度衰减但不崩断
    const decayed = Math.max(0, this.state.progress - input.progress * 0.5);
    this._jump({
      lineState: decayed > 0.08 ? "ignite" : "idle",
      progress:  decayed,
      tension:   Math.max(0, tension - 0.18),
      isLocked:  false,
    });
  }

  // ── 长按：持续张力累积 ────────────────────────────────────────
  // 每次 hold-start 带入当前累计 holdMs，控制器直接计算绝对张力

  private _handleHoldStart(input: PhysicsInput): void {
    const addedTension = input.holdMs / this.config.holdTensionRateMs;
    const nextTension  = Math.min(1, this.state.tension + addedTension);
    this._jump({
      lineState: nextTension >= 0.5 ? "tense" : "ignite",
      progress:  this.state.progress,
      tension:   nextTension,
      isLocked:  false,
    });
  }

  // ── 松手：根据状态判断后续 ────────────────────────────────────

  private _handleHoldRelease(): void {
    if (this.state.lineState === "break") {
      this._jump({ lineState: "rebound", progress: 0, tension: 0, isLocked: false });
      this._clearReboundTimer();
      this.reboundTimer = setTimeout(() => {
        this._jump({ lineState: "idle", progress: 0, tension: 0, isLocked: false });
      }, this.config.reboundDurationMs);
      return;
    }
    // 进度太低 → 衰减到 idle
    if (this.state.progress < 0.12) {
      this._jump({ lineState: "idle", progress: 0, tension: 0, isLocked: false });
    }
  }

  // ── 复归后 tap → 重新点火 ─────────────────────────────────────

  private _handleTap(): void {
    this._jump({ lineState: "ignite", progress: 0.06, tension: 0, isLocked: false });
  }

  // ── 跳变（突变，无过渡） ─────────────────────────────────────

  private _jump(next: AxisPhysicsState): void {
    this.state = { ...next };
  }

  private _clearReboundTimer(): void {
    if (this.reboundTimer !== null) { clearTimeout(this.reboundTimer); this.reboundTimer = null; }
  }
  private _clearDecayTimer(): void {
    if (this.decayTimer !== null)   { clearTimeout(this.decayTimer);   this.decayTimer   = null; }
  }

  reset(): void {
    this._clearReboundTimer();
    this._clearDecayTimer();
    this._jump({ lineState: "idle", progress: 0, tension: 0, isLocked: false });
  }

  destroy(): void {
    this._clearReboundTimer();
    this._clearDecayTimer();
  }
}
