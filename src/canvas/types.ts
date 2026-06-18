// ═══════════════════════════════════════════════════════════════════
// 观爻 2.0 · 行为物理引擎类型定义
// 所有状态均为离散跳变态，禁止渐变/easing 语义
// ═══════════════════════════════════════════════════════════════════

// ── 1px 生命线状态 ──────────────────────────────────────────────
export type AxisLineState =
  | "idle"     // 静止：低亮骨灰线，无能量
  | "ignite"   // 点火：冷蓝填充开始延展
  | "tense"    // 紧绷：进度≥张力阈值，线开始震颤
  | "locked"   // 锁止：进度完成，节点被钉住
  | "break"    // 崩断：中段断裂，左右段位移，冷金爆点
  | "rebound"; // 复归：断裂后线从两端向中心收缩复位

// ── 信号节点状态 ─────────────────────────────────────────────────
export type SignalDotState =
  | "idle"    // 未激活：低亮刻度点
  | "active"  // 激活中：冷蓝滑块，发光
  | "locked"  // 锁止：冷金方框，无发光
  | "broken"; // 破裂：空心散射环 + 内核残留点

// ── 因果轨道模式 ─────────────────────────────────────────────────
export type RailMode =
  | "advance" // 右滑推进：冷蓝
  | "break"   // 左滑崩断：冷金
  | "measure";// 测量中：两向可行，进度中性

// ── 手势原语 ────────────────────────────────────────────────────
export type GestureKind =
  | "swipe-right"
  | "swipe-left"
  | "hold-start"
  | "hold-release"
  | "tap";

// ── 物理输入帧（手势桥接层输出） ─────────────────────────────────
export interface PhysicsInput {
  kind: GestureKind;
  /** 归一化进度，0–1，手势位移/轨道宽度 */
  progress: number;
  /** 长按累积时长 ms */
  holdMs: number;
  /** 原始速度 px/ms（用于断裂判定） */
  velocityPxMs: number;
}

// ── 1px 线物理量 ─────────────────────────────────────────────────
export interface AxisPhysicsState {
  lineState: AxisLineState;
  /** 当前填充进度 0–1 */
  progress: number;
  /** 张力系数 0–1（0=无张力，1=即将崩断） */
  tension: number;
  /** 是否已锁定（节点已钉住） */
  isLocked: boolean;
}

// ── 单个信号节点物理量 ──────────────────────────────────────────
export interface DotPhysicsState {
  id: string;
  dotState: SignalDotState;
}

// ── 引擎全局快照（每帧输出给 Canvas） ───────────────────────────
export interface EngineSnapshot {
  axis: AxisPhysicsState;
  dots: DotPhysicsState[];
  railMode: RailMode;
  /** 引擎时间戳 ms */
  ts: number;
}

// ── 物理配置（可调） ─────────────────────────────────────────────
export interface PhysicsConfig {
  /** 张力累积速率，右滑速度倍率 */
  tensionRate: number;
  /** 触发崩断的最小速度 px/ms */
  breakVelocityThreshold: number;
  /** 触发崩断的最小张力系数 */
  breakTensionThreshold: number;
  /** 长按张力累积速率 ms/单位 */
  holdTensionRateMs: number;
  /** 推进完成的进度阈值 */
  advanceCompleteThreshold: number;
  /** 复归动画时长 ms */
  reboundDurationMs: number;
}

export const DEFAULT_PHYSICS_CONFIG: PhysicsConfig = {
  tensionRate: 1.2,
  breakVelocityThreshold: 0.6,
  breakTensionThreshold: 0.68,
  holdTensionRateMs: 1200,
  advanceCompleteThreshold: 0.82,
  reboundDurationMs: 420,
};
