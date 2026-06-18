// ═══════════════════════════════════════════════════════════════════
// 观爻 2.0 · 运行监控层类型定义
//
// 边界锁定：
//   ✔ 只读 EngineSnapshot / semantic label
//   ❌ 不写 force / canvas / semantic / codex
//   ❌ 不参与任何运行路径决策
// ═══════════════════════════════════════════════════════════════════

/** 系统健康分级 */
export type RuntimeHealthState = "STABLE" | "DEGRADED" | "UNSTABLE" | "FAILURE";

/** Force 层运行快照（rolling window 统计） */
export interface RuntimeForceSnapshot {
  /** 采样窗口内 tension 峰值 */
  maxTension: number;
  /** 采样窗口内 tension 均值 */
  avgTension: number;
  /** 每分钟 break 触发次数 */
  ruptureRate: number;
  /** rebound 稳定性：成功自然归 idle 的比例（0–1） */
  reboundStability: number;
  /** 当前采样窗口样本数 */
  sampleCount: number;
}

/** Canvas 帧健康状态 */
export interface CanvasHealthState {
  /** 当前估算 fps（1s 滑动窗口） */
  fps: number;
  /** 掉帧率：帧间距 >20ms 帧数 / 总帧数 */
  frameDropRate: number;
  /** 平均帧间距（ms） */
  drawLatency: number;
  /** break 状态变化到首帧响应的平均偏移（ms，基于 performance.now） */
  syncOffset: number;
}

/** Semantic 一致性状态 */
export interface SemanticConsistencyState {
  /** 每秒 label 变化次数（稳定态应接近 0） */
  labelVariance: number;
  /** 检测到"无状态变化但 label 变化"的次数（漂移指标） */
  interpretationDrift: number;
  /** 空 label 帧数 / 总采样数 */
  nullFallbackRate: number;
}

/** 完整监控报告 */
export interface RuntimeMonitorReport {
  force:    RuntimeForceSnapshot;
  canvas:   CanvasHealthState;
  semantic: SemanticConsistencyState;
  health:   RuntimeHealthState;
  ts:       number;
}
