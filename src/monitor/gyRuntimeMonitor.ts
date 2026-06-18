// ═══════════════════════════════════════════════════════════════════
// 观爻 2.0 · 运行监控器（非侵入式观察层）
//
// 职责：
//   - 读取 EngineSnapshot + semantic label，计算运行质量指标
//   - 通过 notifyFrame(now) 接收 Canvas rAF 时间戳，估算帧率
//   - 输出 RuntimeMonitorReport，供外部工具消费
//
// 红线：
//   ❌ 不调用任何 engine 方法（只调 getSnapshot / getLabel）
//   ❌ 不修改 canvas 渲染路径
//   ❌ 不影响 semantic 输出
//   ❌ 不写入任何业务数据
//   ✔  只读，只统计，只报告
// ═══════════════════════════════════════════════════════════════════

import type { EngineSnapshot } from "../canvas/types";
import type {
  CanvasHealthState,
  RuntimeForceSnapshot,
  RuntimeHealthState,
  RuntimeMonitorReport,
  SemanticConsistencyState,
} from "./types";

// ── 滑动窗口工具 ──────────────────────────────────────────────────

function rollingAvg(buf: number[]): number {
  if (buf.length === 0) return 0;
  return buf.reduce((a, b) => a + b, 0) / buf.length;
}

function rollingMax(buf: number[]): number {
  if (buf.length === 0) return 0;
  return Math.max(...buf);
}

// ── 内部采样结构 ──────────────────────────────────────────────────

const SAMPLE_WINDOW = 60;      // 保留最近 60 个采样点
const FRAME_WINDOW  = 120;     // 保留最近 120 帧时间
const SAMPLE_MS     = 100;     // 自采样间隔 ms（10Hz）

// ═══════════════════════════════════════════════════════════════════

export interface MonitorOptions {
  /** 读取引擎快照的函数（只读） */
  getSnapshot:  () => EngineSnapshot;
  /** 读取当前语义标签（只读，可选） */
  getLabel?:    () => string;
  /** 报告更新回调（每次采样后触发） */
  onReport?:    (report: RuntimeMonitorReport) => void;
  /** 自采样间隔（ms），默认 100 */
  sampleMs?:    number;
}

export class GyRuntimeMonitor {
  private getSnapshot:  () => EngineSnapshot;
  private getLabel:     () => string;
  private onReport:     (r: RuntimeMonitorReport) => void;
  private sampleMs:     number;

  // Force 采样缓冲
  private tensionBuf:   number[] = [];
  private ruptureCount: number   = 0;
  private reboundTotal: number   = 0;
  private reboundStable: number  = 0;
  private prevLineState: string  = "idle";
  private windowStartMs: number  = performance.now();

  // Canvas 帧缓冲（由 notifyFrame 填充）
  private frameBuf:     number[] = [];  // 帧间距 ms
  private lastFrameMs:  number | null = null;
  private breakTs:      number | null = null;  // break 状态发生时刻
  private syncOffsets:  number[] = [];          // break→首帧响应偏移

  // Semantic 采样缓冲
  private prevLabel:       string  = "";
  private prevSnapState:   string  = "idle";
  private labelChanges:    number  = 0;
  private driftCount:      number  = 0;
  private nullFrames:      number  = 0;
  private semSampleCount:  number  = 0;

  private sampleTimer: ReturnType<typeof setInterval> | null = null;

  constructor(opts: MonitorOptions) {
    this.getSnapshot = opts.getSnapshot;
    this.getLabel    = opts.getLabel   ?? (() => "");
    this.onReport    = opts.onReport   ?? (() => {});
    this.sampleMs    = opts.sampleMs   ?? SAMPLE_MS;
    this._start();
  }

  // ── Canvas rAF 钩子（由 GyCanvasCore 可选调用，每帧末端） ────────
  // 纯只读：只接收时间戳，不写任何引擎/渲染状态

  notifyFrame(now: number): void {
    if (this.lastFrameMs !== null) {
      const delta = now - this.lastFrameMs;
      if (delta > 0 && delta < 1000) {
        // 正常帧范围（防 tab 切换后首帧巨大 delta）
        this.frameBuf.push(delta);
        if (this.frameBuf.length > FRAME_WINDOW) this.frameBuf.shift();
      }
    }
    this.lastFrameMs = now;

    // break 首帧同步偏移
    if (this.breakTs !== null) {
      this.syncOffsets.push(now - this.breakTs);
      if (this.syncOffsets.length > 30) this.syncOffsets.shift();
      this.breakTs = null;
    }
  }

  // ── 自采样循环（Force + Semantic） ──────────────────────────────

  private _start(): void {
    this.windowStartMs = performance.now();
    this.sampleTimer = setInterval(() => this._sample(), this.sampleMs);
  }

  private _sample(): void {
    const snap  = this.getSnapshot();
    const label = this.getLabel();
    const now   = performance.now();
    const { lineState, tension } = snap.axis;

    // ── Force 采样 ──────────────────────────────────────────────
    this.tensionBuf.push(tension);
    if (this.tensionBuf.length > SAMPLE_WINDOW) this.tensionBuf.shift();

    // break 触发计数
    if (lineState === "break" && this.prevLineState !== "break") {
      this.ruptureCount++;
      this.breakTs = now;  // 通知 notifyFrame 计算同步偏移
    }

    // rebound 稳定性：rebound→idle 是正常完成；rebound→任何非 idle 是打断
    if (this.prevLineState === "rebound" && lineState !== "rebound") {
      this.reboundTotal++;
      if (lineState === "idle") this.reboundStable++;
    }

    // ── Semantic 采样 ──────────────────────────────────────────
    this.semSampleCount++;
    if (!label) this.nullFrames++;

    if (label !== this.prevLabel) {
      this.labelChanges++;
      // 漂移检测：lineState 未变化但 label 变化
      if (lineState === this.prevSnapState) {
        this.driftCount++;
      }
    }

    this.prevLabel     = label;
    this.prevSnapState = lineState;
    this.prevLineState = lineState;

    // ── 生成报告 ──────────────────────────────────────────────
    const elapsedMin = Math.max(0.001, (now - this.windowStartMs) / 60000);
    this.onReport(this._buildReport(elapsedMin));
  }

  private _buildReport(elapsedMin: number): RuntimeMonitorReport {
    const force    = this._forceSnapshot(elapsedMin);
    const canvas   = this._canvasHealth();
    const semantic = this._semanticConsistency();
    const health   = this._classify(force, canvas, semantic);
    return { force, canvas, semantic, health, ts: Date.now() };
  }

  private _forceSnapshot(elapsedMin: number): RuntimeForceSnapshot {
    return {
      maxTension:       rollingMax(this.tensionBuf),
      avgTension:       rollingAvg(this.tensionBuf),
      ruptureRate:      this.ruptureCount / elapsedMin,
      reboundStability: this.reboundTotal > 0
        ? this.reboundStable / this.reboundTotal
        : 1,  // 还没发生过 rebound → 默认稳定
      sampleCount:      this.tensionBuf.length,
    };
  }

  private _canvasHealth(): CanvasHealthState {
    const frames      = this.frameBuf;
    const avg         = rollingAvg(frames);
    const dropCount   = frames.filter(f => f > 20).length;
    const fps         = avg > 0 ? Math.round(1000 / avg) : 0;
    const syncAvg     = rollingAvg(this.syncOffsets);
    return {
      fps,
      frameDropRate: frames.length > 0 ? dropCount / frames.length : 0,
      drawLatency:   avg,
      syncOffset:    syncAvg,
    };
  }

  private _semanticConsistency(): SemanticConsistencyState {
    const elapsedSec = (this.tensionBuf.length * this.sampleMs) / 1000;
    return {
      labelVariance:       elapsedSec > 0 ? this.labelChanges / elapsedSec : 0,
      interpretationDrift: this.driftCount,
      nullFallbackRate:    this.semSampleCount > 0
        ? this.nullFrames / this.semSampleCount
        : 0,
    };
  }

  // ── 健康分级（纯计算，不影响任何系统行为） ──────────────────────

  private _classify(
    f: RuntimeForceSnapshot,
    c: CanvasHealthState,
    s: SemanticConsistencyState
  ): RuntimeHealthState {
    // FAILURE：帧率彻底崩溃 或 semantic 严重漂移
    if ((c.fps > 0 && c.fps < 10) || s.interpretationDrift > 20) return "FAILURE";

    // UNSTABLE：帧率低 或 掉帧严重 或 rebound 不稳定
    if (c.fps < 30 || c.frameDropRate > 0.3 || f.reboundStability < 0.5) return "UNSTABLE";

    // DEGRADED：tension 持续在高位 或 掉帧较多 或 有轻微漂移
    if (f.avgTension > 0.8 || c.frameDropRate > 0.1 || s.interpretationDrift > 3) return "DEGRADED";

    return "STABLE";
  }

  // ── 快照读取（外部按需拉取最新报告） ─────────────────────────────

  getReport(): RuntimeMonitorReport {
    const now       = performance.now();
    const elapsedMin = Math.max(0.001, (now - this.windowStartMs) / 60000);
    return this._buildReport(elapsedMin);
  }

  // ── 重置采样窗口 ──────────────────────────────────────────────────

  reset(): void {
    this.tensionBuf    = [];
    this.ruptureCount  = 0;
    this.reboundTotal  = 0;
    this.reboundStable = 0;
    this.frameBuf      = [];
    this.syncOffsets   = [];
    this.lastFrameMs   = null;
    this.breakTs       = null;
    this.labelChanges  = 0;
    this.driftCount    = 0;
    this.nullFrames    = 0;
    this.semSampleCount = 0;
    this.prevLabel     = "";
    this.prevLineState = "idle";
    this.prevSnapState = "idle";
    this.windowStartMs = performance.now();
  }

  destroy(): void {
    if (this.sampleTimer !== null) {
      clearInterval(this.sampleTimer);
      this.sampleTimer = null;
    }
  }
}
