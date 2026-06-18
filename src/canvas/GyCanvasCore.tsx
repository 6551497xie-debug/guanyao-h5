// ═══════════════════════════════════════════════════════════════════
// 观爻 2.0 · Canvas 主渲染层（唯一现实渲染源）
// 只读 EngineSnapshot，不读写业务数据，不触发任何事件
// ═══════════════════════════════════════════════════════════════════

import { useCallback, useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import type { AxisLineState, EngineSnapshot, SignalDotState } from "./types";

// ── 颜色 token（脱离 DOM 可独立运行） ───────────────────────────
const C = {
  void:    "#000000",
  base:    "rgba(228,231,234,0.52)",
  dim:     "rgba(228,231,234,0.18)",
  active:  "#00B8D4",
  gold:    "#C7A96B",
  textDim: "rgba(246,243,236,0.28)",
} as const;

function axisColor(s: AxisLineState): string {
  if (s === "break"  || s === "locked") return C.gold;
  if (s === "tense"  || s === "ignite") return C.active;
  if (s === "rebound") return C.dim;
  return C.base;
}
function dotColor(s: SignalDotState): string {
  if (s === "active")  return C.active;
  if (s === "locked" || s === "broken") return C.gold;
  return C.base;
}

// ── 本地动画追踪（全在 rAF 闭包，不触发 React 重渲染） ──────────
interface LocalAnim {
  breakStartMs:   number | null; // 进入 break 态的时刻
  reboundStartMs: number | null; // 进入 rebound 态的时刻（独立追踪）
}

// ═══════════════════════════════════════════════════════════════════
// drawAxis — 1px 生命线
// ═══════════════════════════════════════════════════════════════════
function drawAxis(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number, totalW: number,
  snap: EngineSnapshot, anim: LocalAnim, now: number
): void {
  const { axis } = snap;
  const half  = totalW / 2;
  const color = axisColor(axis.lineState);

  ctx.save();
  ctx.lineWidth = 1;
  ctx.shadowBlur = 0;

  // ── 崩断 ───────────────────────────────────────────────────────
  if (axis.lineState === "break") {
    const age = anim.breakStartMs !== null ? now - anim.breakStartMs : 999;
    // 前 80ms：结构停顿——线保持完整但极度紧绷，不可逆感建立
    const PAUSE_MS = 80;
    const gapT  = Math.min(1, Math.max(0, (age - PAUSE_MS) / 180));
    const gap   = gapT * 0.18;
    const lEnd   = cx - half + totalW * (0.5 - gap);
    const rStart = cx - half + totalW * (0.5 + gap);

    if (age < PAUSE_MS) {
      // 停顿阶段：线整体极亮 + 高频微振（结构在临界抗拒）
      const pauseT  = age / PAUSE_MS;
      const jitter  = Math.sin(now / 8) * (1 + pauseT) * 0.8;
      ctx.globalAlpha = 0.95;
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur  = 18 + pauseT * 14;
      ctx.beginPath();
      ctx.moveTo(cx - half, cy + jitter);
      ctx.lineTo(cx + half, cy + jitter);
      ctx.stroke();
    } else {
      // 断裂展开阶段
      ctx.globalAlpha = 0.8;
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur  = 6 + gapT * 8;
      ctx.beginPath();
      ctx.moveTo(cx - half, cy - 0.5);
      ctx.lineTo(lEnd, cy - 0.5);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(rStart, cy + 0.5);
      ctx.lineTo(cx + half, cy + 0.5);
      ctx.stroke();
    }

    // 中心爆点（贯穿两阶段）
    ctx.globalAlpha  = age < PAUSE_MS ? 0.4 + (age / PAUSE_MS) * 0.5 : 0.6 + gapT * 0.35;
    ctx.shadowBlur   = 10 + gapT * 14;
    ctx.fillStyle    = color;
    ctx.beginPath();
    ctx.arc(cx, cy, 1.5, 0, Math.PI * 2);
    ctx.fill();

  // ── 复归 ───────────────────────────────────────────────────────
  } else if (axis.lineState === "rebound") {
    const age = anim.reboundStartMs !== null ? now - anim.reboundStartMs : 0;
    const t   = Math.min(1, age / 420);
    // 阻尼振荡：快速收拢 → 轻微过冲（两段微压） → 稳定
    // exp(-4t)*cos(2π*1.3t) 在 t≈0.38 过零点后出现负值（段微压）再归零
    const bounce   = Math.exp(-t * 4) * Math.cos(t * Math.PI * 2.6);
    const openFrac = Math.max(-0.03, bounce * 0.18); // 允许微量过冲(-0.03)产生压迫感
    const lEnd   = cx - half + totalW * (0.5 - openFrac);
    const rStart = cx - half + totalW * (0.5 + openFrac);

    ctx.globalAlpha = Math.max(0.06, (1 - t) * 0.72 + 0.06);
    ctx.strokeStyle = C.gold;
    ctx.shadowColor = C.gold;
    ctx.shadowBlur  = 8 * Math.max(0, 1 - t * 1.4);
    ctx.beginPath();
    ctx.moveTo(cx - half, cy - 0.5);
    ctx.lineTo(lEnd, cy - 0.5);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(rStart, cy + 0.5);
    ctx.lineTo(cx + half, cy + 0.5);
    ctx.stroke();

    // 收拢后的完整线（渐亮，重新找到平衡）
    ctx.globalAlpha = Math.min(0.58, t * 0.65);
    ctx.strokeStyle = C.base;
    ctx.shadowBlur  = 0;
    ctx.beginPath();
    ctx.moveTo(cx - half, cy);
    ctx.lineTo(cx + half, cy);
    ctx.stroke();

  // ── 正常线（idle / ignite / tense / locked）─────────────────
  } else {
    // tense 震颤：临界因子让频率和幅度同时升高（越近 break 越难控制）
    const critFactor = axis.lineState === "tense" && axis.tension > 0.55
      ? (axis.tension - 0.55) / 0.45   // 0.55→1.0 映射到 0→1
      : 0;
    const wobble = axis.lineState === "tense"
      ? Math.sin(now / (32 - critFactor * 18)) * axis.tension * (2.2 + critFactor * 3.5)
      : 0;

    // 底线（骨灰色）
    ctx.globalAlpha = axis.lineState === "idle" ? 0.38 : 0.65;
    ctx.strokeStyle = C.base;
    ctx.beginPath();
    ctx.moveTo(cx - half, cy + wobble);
    ctx.lineTo(cx + half, cy + wobble);
    ctx.stroke();

    // 进度填充（冷蓝 / 冷金）
    if (axis.progress > 0) {
      const fillX  = cx - half + totalW * axis.progress;
      const glow   = axis.lineState === "tense"
        ? 10 + axis.tension * 18    // 紧绷：张力越大辉光越强
        : 5;

      ctx.globalAlpha  = 1;
      ctx.strokeStyle  = color;
      ctx.shadowColor  = color;
      ctx.shadowBlur   = glow;
      ctx.beginPath();
      ctx.moveTo(cx - half, cy + wobble);
      ctx.lineTo(fillX, cy + wobble);
      ctx.stroke();

      // 张力钩：紧绷时进度端渲染竖刺（物理张力体现）
      if (axis.lineState === "tense") {
        const hookH = 2.5 + axis.tension * 4;
        ctx.globalAlpha  = 0.6 + axis.tension * 0.35;
        ctx.shadowBlur   = glow * 0.6;
        ctx.lineWidth    = 1;
        ctx.beginPath();
        ctx.moveTo(fillX, cy + wobble - hookH);
        ctx.lineTo(fillX, cy + wobble + hookH);
        ctx.stroke();
      }
    }
  }

  ctx.restore();
}

// ═══════════════════════════════════════════════════════════════════
// drawDots — 信号点（节点在轴线上，标签在轴线下方）
// ═══════════════════════════════════════════════════════════════════
function drawDots(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number, totalW: number,
  snap: EngineSnapshot, labels: string[], anim: LocalAnim, now: number
): void {
  const { dots } = snap;
  if (dots.length === 0) return;

  const step = totalW / Math.max(1, dots.length - 1);

  dots.forEach((dot, i) => {
    const x     = cx - totalW / 2 + i * step;
    const color = dotColor(dot.dotState);

    ctx.save();
    ctx.fillStyle = color;

    switch (dot.dotState) {
      case "locked": {
        // 方形锁止（冷金边框）
        ctx.globalAlpha = 0.88;
        ctx.strokeStyle = color;
        ctx.lineWidth   = 1;
        ctx.shadowColor = color;
        ctx.shadowBlur  = 4;
        ctx.strokeRect(x - 4, cy - 4, 8, 8);
        break;
      }
      case "broken": {
        // 散射环扩散 + 内核
        const age  = anim.breakStartMs !== null ? now - anim.breakStartMs : 400;
        const bt   = Math.min(1, age / 350);
        const ring = 4 + bt * 8;
        ctx.globalAlpha = 0.35 * (1 - bt * 0.5);
        ctx.strokeStyle = color;
        ctx.lineWidth   = 1;
        ctx.shadowColor = color;
        ctx.shadowBlur  = 12;
        ctx.beginPath();
        ctx.arc(x, cy, ring, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 0.85;
        ctx.shadowBlur  = 8;
        ctx.beginPath();
        ctx.arc(x, cy, 1.5, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case "active": {
        // 菱形滑块 + 呼吸光晕（sin 脉冲，不是 CSS animation）
        const pulse = 0.72 + Math.sin(now / 580) * 0.28;
        ctx.globalAlpha = pulse;
        ctx.shadowColor = color;
        ctx.shadowBlur  = 14 + pulse * 8;
        ctx.save();
        ctx.translate(x, cy);
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(-4.5, -4.5, 9, 9);
        ctx.restore();
        break;
      }
      default: {
        // idle：细点
        ctx.globalAlpha = 0.32;
        ctx.beginPath();
        ctx.arc(x, cy, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 阶段标签（在轴线下方 18px）
    if (labels[i]) {
      const lc =
        dot.dotState === "active" ? C.active :
        dot.dotState === "locked" ? "rgba(199,169,107,0.72)" :
        dot.dotState === "broken" ? "rgba(199,169,107,0.5)" :
        C.textDim;
      ctx.globalAlpha = 1;
      ctx.shadowBlur  = 0;
      ctx.fillStyle   = lc;
      ctx.font        = "11px sans-serif";
      ctx.textAlign   = "center";
      ctx.textBaseline = "top";
      ctx.fillText(labels[i], x, cy + 14);
    }

    ctx.restore();
  });
}

// ═══════════════════════════════════════════════════════════════════
// drawHUD — 状态读数 + 操作提示
// ═══════════════════════════════════════════════════════════════════
function drawHUD(
  ctx: CanvasRenderingContext2D,
  w: number, h: number,
  snap: EngineSnapshot
): void {
  const { axis } = snap;

  // 行为回声语言（不暴露系统状态，只命名用户行为结果）
  const BEHAVIOR_ECHO: Record<AxisLineState, string> = {
    idle:    "",
    ignite:  "你在推进",
    tense:   "你感到阻力",
    locked:  "完成",
    break:   "旧的断了",
    rebound: "正在重组",
  };
  const echo = BEHAVIOR_ECHO[axis.lineState];

  ctx.save();
  ctx.font         = "10px monospace";
  ctx.textBaseline = "top";

  // 左上：行为回声（idle 态留空，不发声）
  if (echo) {
    ctx.globalAlpha = 0.62;
    ctx.fillStyle   = axisColor(axis.lineState);
    ctx.textAlign   = "left";
    ctx.fillText(echo, 18, 18);
  }

  // 左下：操作引导（唯一保留的人类语言层）
  ctx.globalAlpha  = 0.28;
  ctx.fillStyle    = C.textDim;
  ctx.textAlign    = "left";
  ctx.textBaseline = "bottom";
  ctx.fillText("右滑推进  左滑崩断  长按蓄力", 18, h - 18);

  ctx.restore();
}

// ═══════════════════════════════════════════════════════════════════
// drawSemanticOverlay — 语义短语叠加（弱提示，不干扰物理渲染）
// ═══════════════════════════════════════════════════════════════════
function drawSemanticOverlay(
  ctx: CanvasRenderingContext2D,
  w: number, h: number,
  label: string,
  alphaScale: number = 1  // 退出连续性：由 rAF 传入淡出系数
): void {
  if (!label || alphaScale <= 0) return;
  const lines = label.split("\n").filter(Boolean);
  if (lines.length === 0) return;

  ctx.save();
  ctx.globalAlpha  = 0.38 * alphaScale;
  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";

  ctx.font      = "12px sans-serif";
  ctx.fillStyle = "rgba(246,243,236,0.68)";
  ctx.shadowBlur = 0;
  ctx.fillText(lines[0], w / 2, h * 0.78);

  if (lines[1]) {
    ctx.globalAlpha = 0.22 * alphaScale;
    ctx.font        = "10px sans-serif";
    ctx.fillStyle   = "rgba(199,169,107,0.72)";
    ctx.fillText(lines[1], w / 2, h * 0.78 + 18);
  }

  ctx.restore();
}

// ═══════════════════════════════════════════════════════════════════
// GyCanvasCore Props & 组件
// ═══════════════════════════════════════════════════════════════════

export interface GyCanvasCoreProps {
  getSnapshot:       () => EngineSnapshot;
  running?:          boolean;
  axisWidthRatio?:   number;
  dotLabels?:        string[];
  /** 每帧调用，返回语义标签字符串（可含 \n 分两行）。为空则不绘制。 */
  getSemanticLabel?: () => string;
  /** 监控层钩子（可选）：每帧末端调用，传入 performance.now()。纯通知，不影响渲染。 */
  onFrame?:          (now: number) => void;
  className?:        string;
  style?:            CSSProperties;
}

export function GyCanvasCore({
  getSnapshot,
  running          = true,
  axisWidthRatio   = 0.84,
  dotLabels        = [],
  getSemanticLabel,
  onFrame,
  className        = "",
  style,
}: GyCanvasCoreProps) {
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const rafRef         = useRef<number>(0);
  const runningRef     = useRef(running);
  const animRef        = useRef<LocalAnim>({ breakStartMs: null, reboundStartMs: null });
  const prevStateRef   = useRef<AxisLineState>("idle");
  const labelsRef      = useRef(dotLabels);
  const semLabelRef    = useRef(getSemanticLabel);
  const onFrameRef     = useRef(onFrame);
  // ── 体验连续性追踪（全在 rAF 闭包，不触发 React 重渲染） ────────
  const mountTimeRef   = useRef<number | null>(null);   // 进入连续性
  const lastActiveRef  = useRef<number>(0);             // 退出连续性
  const tensionPeakRef = useRef<{ v: number; ts: number }>({ v: 0, ts: 0 }); // 操作连续性

  useEffect(() => { runningRef.current   = running; },          [running]);
  useEffect(() => { labelsRef.current    = dotLabels; },        [dotLabels]);
  useEffect(() => { semLabelRef.current  = getSemanticLabel; }, [getSemanticLabel]);
  useEffect(() => { onFrameRef.current   = onFrame; },          [onFrame]);

  const stableGet = useCallback(getSnapshot, [getSnapshot]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const applyDpr = () => {
      const dpr = window.devicePixelRatio || 1;
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width  = Math.round(width  * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    applyDpr();
    const ro = new ResizeObserver(applyDpr);
    ro.observe(canvas);

    const loop = () => {
      if (!runningRef.current) { rafRef.current = requestAnimationFrame(loop); return; }

      const now  = performance.now();
      const snap = stableGet();
      const cur  = snap.axis.lineState;
      const prev = prevStateRef.current;
      const anim = animRef.current;

      // ── 进入连续性：0→800ms 渐入（接管感） ──────────────────────
      if (mountTimeRef.current === null) mountTimeRef.current = now;
      const entryT = Math.min(1, (now - mountTimeRef.current) / 800);

      // ── 退出连续性：idle 后 600ms 语义淡出（行为结束感） ─────────
      if (cur !== "idle") lastActiveRef.current = now;
      const idleAge  = cur === "idle" ? now - lastActiveRef.current : 0;
      const exitFade = idleAge > 0 ? Math.max(0, 1 - idleAge / 600) : 1;

      // ── 操作连续性：张力峰值余晖（行为演化的记忆） ───────────────
      const tp = tensionPeakRef.current;
      if (snap.axis.tension > tp.v) tensionPeakRef.current = { v: snap.axis.tension, ts: now };
      if (cur === "idle") tensionPeakRef.current = { v: 0, ts: now };
      const peakAge  = now - tensionPeakRef.current.ts;
      // ignite 态退回时（张力曾经升高），显示余晖痕迹
      const peakGlow = (cur === "ignite" && tp.v > 0.2 && peakAge < 700)
        ? Math.max(0, 1 - peakAge / 700) * tp.v * 0.4
        : 0;

      // 追踪 break / rebound 起始时间（分别独立）
      if (cur === "break"   && prev !== "break")   anim.breakStartMs   = now;
      if (cur === "rebound" && prev !== "rebound")  anim.reboundStartMs = now;
      if (cur !== "break"   && cur !== "rebound") { anim.breakStartMs   = null; }
      if (cur !== "rebound") anim.reboundStartMs = null;
      prevStateRef.current = cur;

      const { width: w, height: h } = canvas.getBoundingClientRect();
      if (w === 0 || h === 0) { rafRef.current = requestAnimationFrame(loop); return; }
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = C.void;
      ctx.fillRect(0, 0, w, h);

      const cx    = w / 2;
      const cy    = h / 2 - 20;
      const axisW = w * axisWidthRatio;

      // 进入连续性：物理渲染整体随 entryT 渐显
      ctx.save();
      ctx.globalAlpha = entryT;
      drawAxis(ctx, cx, cy, axisW, snap, anim, now);
      drawDots(ctx, cx, cy, axisW, snap, labelsRef.current, anim, now);
      ctx.restore();

      // 操作连续性：张力演化余晖（峰值位置显示短暂残影）
      if (peakGlow > 0) {
        const peakX = cx - axisW / 2 + axisW * Math.min(1, tp.v);
        ctx.save();
        ctx.globalAlpha = peakGlow * entryT;
        ctx.strokeStyle = C.active;
        ctx.shadowColor = C.active;
        ctx.shadowBlur  = 10;
        ctx.lineWidth   = 1;
        ctx.beginPath();
        ctx.moveTo(peakX, cy - 3.5);
        ctx.lineTo(peakX, cy + 3.5);
        ctx.stroke();
        ctx.restore();
      }

      drawHUD(ctx, w, h, snap);

      // 退出连续性：语义回声随 exitFade 淡出
      const semLabel = semLabelRef.current?.() ?? "";
      drawSemanticOverlay(ctx, w, h, semLabel, exitFade * entryT);

      // 监控层钩子（可选，纯通知，不参与渲染逻辑）
      onFrameRef.current?.(now);

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, [stableGet, axisWidthRatio]);

  return (
    <canvas
      ref={canvasRef}
      className={`gy-canvas-core${className ? ` ${className}` : ""}`}
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "100%", touchAction: "none", ...style }}
    />
  );
}
