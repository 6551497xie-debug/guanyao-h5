// ═══════════════════════════════════════════════════════════════════
// 观爻 SANDBOX · 首页行为点火仪式系统
//
// 不是网页 UI，不是动画页面 —— 是"行为触发仪式系统"。
//
// 架构铁律：
//   state    = 唯一驱动源（状态机）
//   rAF      = 唯一渲染管线（单一 render，分层严格隔离）
//   progress = 仅输入变量（手势）
//   LOGO     = 终态结构，不参与过程层
//
// 渲染分层（每帧固定顺序，互不抢层）：
//   LAYER 1 typing  — 仅 entry 阶段（typingActive）
//   LAYER 2 axis    — 常驻交互层（含 gesture）
//   LAYER 3 logo    — 终态唯一层（logoReady）
//
// 状态机（严格顺序）：
//   blackout → typing → stamp → axis → gesture → collapse → next
//
// 三层归位（PRODUCT → SYSTEM → PHYSICS，禁止反向；真源见 governance/productLayer.ts）：
//   PRODUCT：用户拉动 1px 轴 → 「观爻」进入断裂 → 轴裂成短线 → 短线成 LOGO → 直接进入生命起点。
//   SYSTEM（七态职责）：blackout=纯黑｜typing=三行断言｜stamp=显「观爻」｜axis=显 1px 轴+蓝点｜
//                       gesture=只处理拖动｜collapse=轴断裂短线向 LOGO 收敛｜next=只进入 /mother-code。
//   PHYSICS（只表现，全部可追溯到行为）：gesture 前不绘制任何 fragment；fragment 仅由 fractureAxis
//                       在拖动后从 1px 轴裂出（起点在轴上，非全屏散落）；target=xMatrixModel；
//                       LOGO=行为结果。唯一出口 navigate("/mother-code")，无 /chrono-axis 中间屏。
// ═══════════════════════════════════════════════════════════════════

import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GyMobilePreviewFrame } from "../components/visual/GyMobilePreviewFrame";
import { getXMatrixSegments } from "../components/visual-system/xMatrixModel";

// ── 状态 ────────────────────────────────────────────────────────────
type State =
  | "blackout"
  | "typing"
  | "stamp"     // 观爻 瞬时压印（instant，无动画）
  | "axis"
  | "gesture"
  | "collapse"
  | "next";

// ── 仪式节奏语义层（统一呼吸结构）──────────────────────────────────
// 每个仪式事件 = inhale（进入前留白）+ hold（事件停顿）+ exhale（释放/转场）。
// 在 rAF 时间戳状态机里以"可感知留白"实现，而非即时跳变。
type RitualTiming = { inhale: number; hold: number; exhale: number };
const RITUAL: Record<string, RitualTiming> = {
  blackout: { inhale: 0,   hold: 400, exhale: 0   },
  typing:   { inhale: 600, hold: 0,   exhale: 800 }, // hold 由字符节奏内部控制
  stamp:    { inhale: 500, hold: 1400, exhale: 600 }, // 观爻 行为后残留态（≥1.2s 可感知停留）
  axis:     { inhale: 300, hold: 0,   exhale: 400 }, // hold = 交互持续态
  collapse: { inhale: 420, hold: 100, exhale: 300 }, // inhale = 关键悬停
  logo:     { inhale: 0,   hold: 600, exhale: 500 }, // inhale = 收束（收敛过程）
};

// ── 派生时间常量 ────────────────────────────────────────────────────
const BLACKOUT_MS    = RITUAL.blackout.hold;                       // 400
const CHAR_MS        = 114;                                        // 95 +20%（沉入感，"被压出来"）
const LINE_PAUSE     = [500, 500, 650];                            // 行间停顿加深
const TYPING_INHALE  = RITUAL.typing.inhale;                       // 600 黑场后首字前静默
const POST_TYPE_MS   = RITUAL.typing.exhale;                       // 800 末字后留白 → stamp
const STAMP_MS       = RITUAL.stamp.hold;                          // 1400 观爻 残留停留（≥1.2s）
const STAMP_GAP      = RITUAL.stamp.exhale + RITUAL.axis.inhale;   // 600+300 压印后 → 轴展开前
const AXIS_MS        = 520;
const AXIS_SETTLE    = RITUAL.axis.exhale;                         // 400 轴展开后settle → 可交互
const LOGO_HOLD_MS   = 750;                                        // 600→750 LOGO 稳定态加长
const NEXT_MS        = 320;

// ── 顶部工业信息铭牌（唯一结构行，等宽，不换行）─────────────────────
const NAMEPLATE = "GUANYAO SANDBOX  |  SYSTEM: 01_CHRONO  |  观爻";

// ── 断言文本（逐字渲染，固定 X 间距，禁止流式布局）─────────────────
const LINES = [
  ["困", "住", "你", "的"],
  ["不", "是", "现", "实"],
  ["是", "你", "的", "惯", "性", "反", "应"],
];

type CharCell = { ch: string; li: number; ci: number; revealAt: number };

function buildSchedule(): { cells: CharCell[]; lastRevealAt: number } {
  const cells: CharCell[] = [];
  let t = 0;
  let last = 0;
  LINES.forEach((chars, li) => {
    chars.forEach((ch, ci) => {
      cells.push({ ch, li, ci, revealAt: t });
      last = t;
      t += CHAR_MS;
    });
    t += LINE_PAUSE[li];
  });
  return { cells, lastRevealAt: last };
}

// ── LOGO 几何：唯一真源 = xMatrixModel（紧凑 上 X / 下 ∧）────────────
// 不在本文件写手工坐标；线段全部由 getXMatrixSegments(center,radius) 投影，
// 与 GyXMatrixLogo（SVG）共用同一模型。
function buildLogoSegments(
  cx: number,
  cy: number,
  size: number
): Array<[number, number, number, number]> {
  return getXMatrixSegments({ x: cx, y: cy }, size / 2).map(
    (s) => [s.x1, s.y1, s.x2, s.y2] as [number, number, number, number],
  );
}

// ── 视觉空间力场：占用图 + 最大空白检测（确定性，不依赖 DOM 测量）──────
// HUD / TEXT / AXIS 先占位 → 合并禁区 band → LOGO 落在最大空白带中心。
// 纯几何函数：相同输入恒得相同输出，无随机 / 无时间。
type Band = [number, number]; // [top, bottom]（屏幕纵向占用区间）

function largestEmptyBandCenter(h: number, forbidden: Band[]): number {
  const sorted = forbidden
    .filter(([t, b]) => b > t)
    .sort((a, b) => a[0] - b[0]);
  const merged: Band[] = [];
  for (const band of sorted) {
    const last = merged[merged.length - 1];
    if (!last || band[0] > last[1]) merged.push([band[0], band[1]]);
    else last[1] = Math.max(last[1], band[1]);
  }
  let bestTop = 0;
  let bestBot = h;
  let bestH = -1;
  let cursor = 0;
  for (const [t, b] of merged) {
    const gap = Math.max(cursor, t) - cursor;
    if (gap > bestH) { bestH = gap; bestTop = cursor; bestBot = Math.max(cursor, t); }
    cursor = Math.max(cursor, b);
  }
  if (h - cursor > bestH) { bestTop = cursor; bestBot = h; }
  return (bestTop + bestBot) / 2;
}

// ── Soft Variance Layer（仅表现层）────────────────────────────────────
//   渲染期附加的极低幅度「呼吸」偏移；随 coherence→1 衰减到 0 → 终态 LOGO 精确不动。
//   关键：非累加（不写入 p.ox/p.oy / p.x），不影响 epsilon lock / target / geometry，
//   仅让「路径过程」不再绝对刚性。系统 outcome 仍 100% deterministic。
function softBreath(seed: number, now: number, coherence: number): [number, number] {
  const amp = 0.9 * (1 - Math.min(1, Math.max(0, coherence))); // coherence=1（锁定）→ 0
  return [
    Math.sin(now * 0.0013 + seed) * amp,
    Math.cos(now * 0.0011 + seed) * amp,
  ];
}

type LogoParticle = {
  // target：xMatrixModel 的 LOGO 段端点（终态，不可改）
  tx1: number; ty1: number; tx2: number; ty2: number;
  // intact：平铺在 1px 轴上的水平片段端点（初态 = 轴的一截）
  ix1: number; iy1: number; ix2: number; iy2: number;
  t: number;        // 0=平铺在轴上 → 1=LOGO 段（确定性 lerp，epsilon 锁）
  locked: boolean;
};

// fragment 当前端点 = lerp(intact → target, t)
function fragEndpoints(p: LogoParticle): [number, number, number, number] {
  const te = p.t;
  return [
    p.ix1 + (p.tx1 - p.ix1) * te, p.iy1 + (p.ty1 - p.iy1) * te,
    p.ix2 + (p.tx2 - p.ix2) * te, p.iy2 + (p.ty2 - p.iy2) * te,
  ];
}

function cubicOut(t: number): number {
  const u = 1 - Math.min(1, Math.max(0, t));
  return 1 - u * u * u;
}

// ── 统一颜色物理：coherence 0→1 连续收敛 FLOW_BLUE → LOGO_WHITE ──────
// coherence = 收敛度（物理）。粒子 / 收敛过程 / LOGO 共用此唯一颜色函数，
// 不存在 blue→white 跳变；RESIDUE = 中间混合区由 coherence 自然生成。
const FLOW_BLUE  = [0, 184, 212];   // FLOW：未收敛
const LOGO_WHITE = [234, 237, 239]; // LOGO：收敛完成
function flowColor(coherence: number, alpha: number): string {
  const c = Math.min(1, Math.max(0, coherence));
  const r = Math.round(FLOW_BLUE[0] + (LOGO_WHITE[0] - FLOW_BLUE[0]) * c);
  const g = Math.round(FLOW_BLUE[1] + (LOGO_WHITE[1] - FLOW_BLUE[1]) * c);
  const b = Math.round(FLOW_BLUE[2] + (LOGO_WHITE[2] - FLOW_BLUE[2]) * c);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ── LAYER 0：低强度冷蓝宇宙背光场（环境重力场，永远弱于线与 LOGO）──
// 唯一光源 = 中心偏上奇点；极低频呼吸；径向向外衰减至纯黑。
// alpha 钳制在 [0.03, 0.06]，边缘恒为 #000000，绝不全屏蓝化。
// progress 仅允许改变"重心偏移"，不得提升亮度/饱和。
function drawBackgroundField(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  now: number
) {
  // 环境场：极低频呼吸（频率 -20%），alpha 区间 0.03–0.055。
  // 感受到存在，但不被注意。background = 空间，不是光源主体。
  const a = Math.max(0.03, Math.min(0.055, 0.0425 + Math.sin(now * 0.00032) * 0.0125));
  const cx = W * 0.5;
  const cy = H * 0.35;
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.9);
  grad.addColorStop(0,   `rgba(0,184,212,${a * 1.08})`); // 中心权重 +8%
  grad.addColorStop(0.4, `rgba(0,60,90,${a * 0.6})`);
  grad.addColorStop(1,   "rgba(0,0,0,1)");
  ctx.save();
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);
  ctx.restore();
}

// ── Web Audio（逐字爆裂声，静默失败）────────────────────────────────
let _audioCtx: AudioContext | null = null;
function getAudioCtx(): AudioContext | null {
  try {
    if (!_audioCtx) _audioCtx = new AudioContext();
    if (_audioCtx.state === "suspended") void _audioCtx.resume();
    return _audioCtx;
  } catch { return null; }
}
function playPulse(freq: number, durMs: number) {
  const ac = getAudioCtx();
  if (!ac) return;
  try {
    const osc = ac.createOscillator();
    const g   = ac.createGain();
    osc.connect(g); g.connect(ac.destination);
    osc.type = "sine";
    osc.frequency.value = freq;
    const t = ac.currentTime;
    g.gain.setValueAtTime(0.07, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + durMs / 1000);
    osc.start(t); osc.stop(t + durMs / 1000 + 0.01);
  } catch { /* 静默失败 */ }
}
function playLockSound() {
  const ac = getAudioCtx();
  if (!ac) return;
  try {
    const osc = ac.createOscillator();
    const g   = ac.createGain();
    osc.connect(g); g.connect(ac.destination);
    osc.type = "sine";
    osc.frequency.value = 1520;
    const t = ac.currentTime;
    g.gain.setValueAtTime(0.06, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
    osc.start(t); osc.stop(t + 0.15);
  } catch { /* 静默失败 */ }
}

// ═══════════════════════════════════════════════════════════════════
export function LaunchPage() {
  const navigate = useNavigate();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  // 状态机（ref = 唯一驱动源）
  const stateRef = useRef<State>("blackout");
  const [phase, setPhase] = useState<State>("blackout");
  function go(next: State) { stateRef.current = next; setPhase(next); }

  // 相位时间戳
  const blackoutStartRef = useRef<number | null>(null);
  const typingStartRef   = useRef<number | null>(null);
  const stampStartRef    = useRef<number | null>(null);
  const axisStartRef     = useRef<number | null>(null);
  const collapseStartRef = useRef<number | null>(null);
  const logoHoldAtRef    = useRef<number | null>(null);
  const nextStartRef     = useRef<number | null>(null);
  const navigatedRef     = useRef(false);

  // 打字调度
  const scheduleRef      = useRef(buildSchedule());
  const revealedSoundRef = useRef(0);

  // 手势输入
  const progressRef        = useRef(0);   // 手指实际输入
  const progressDisplayRef = useRef(0);   // 阻力/惯性后的显示值（~60ms inertia）
  const startXRef       = useRef<number | null>(null);
  const gestureFiredRef = useRef(false);
  const pointerDownAtRef = useRef<number | null>(null); // 指针按下时刻（时间门控）

  // LOGO 粒子 + 终态门（renderState.logoReady）
  const particlesRef  = useRef<LogoParticle[]>([]);
  const logoReadyRef  = useRef(false);

  // 沙粒
  const sandRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; a: number }>>([]);

  // ── 纯数学确定性收敛（CONSTITUTION: pure deterministic convergence）──
  //   唯一模型：每帧 lerp 向 target（offset→0），固定系数 k=0.22。
  //   无 velocity / 无 acceleration / 无 force / 无 gravity / 无 random / 无时间。
  //   进入 ≤0.2px 即 snap-to-target 强制吸附 → 100% 一致、消除浮点漂移。
  const LERP_K   = 0.22;    // 固定收敛系数（不可变）
  const EPSILON_T = 0.004;  // 终态锁定阈值（t 域；(1−t)<此值 → 精确吸附 LOGO）
  const GESTURE_MIN_TIME = 400;   // 时间门控：按下后最短酝酿时间（ms）
  const AXIS_MID_TRIGGER = 0.98;  // 距离门控：闸门须拉到底（progress≥0.98，100% 死锁点）才断裂

  function convergeParticles() {
    particlesRef.current.forEach(p => {
      if (p.locked) return;
      p.t += (1 - p.t) * LERP_K;          // 确定性 lerp：intact → target
      if (1 - p.t < EPSILON_T) { p.t = 1; p.locked = true; } // 精确吸附终态
    });
  }
  // 收敛阈值达成 = 全部粒子进入锁定态（物理判据，非时间）
  function convergenceThresholdMet(): boolean {
    const ps = particlesRef.current;
    return ps.length > 0 && ps.every(p => p.locked);
  }
  // 物理收敛度 coherence ∈ [0,1]：0=平铺在轴(FLOW蓝)，1=LOGO(白)。= 平均 t。
  function particleCoherence(): number {
    const ps = particlesRef.current;
    if (ps.length === 0) return 0;
    let sum = 0;
    for (const p of ps) sum += p.t;
    return Math.min(1, Math.max(0, sum / ps.length));
  }

  // ── fractureAxis：唯一粒子生成源（轴 = 12 段平铺短线；断裂 = 各段升起成 LOGO）──
  //   intact：每段平铺在 1px 轴上、首尾相接（合起来就是那条轴）；
  //   target：buildLogoSegments（xMatrixModel，锁死不可改）；
  //   收敛：端点 lerp(intact → target, t)，t 由 progress 推进、collapse 锁定。
  function fractureAxis(cx: number, cy: number, size: number, axisY: number) {
    const targets = buildLogoSegments(cx, cy, size); // LOGO target（xMatrixModel）
    const n = targets.length;
    const w = cx * 2;
    const axisHalf = Math.min(w * 0.72, 440) / 2;    // 与轴渲染同宽
    const slotW = (axisHalf * 2) / n;                // 每段在轴上的槽宽
    particlesRef.current = targets.map(([x1, y1, x2, y2], i) => {
      const segLen = Math.hypot(x2 - x1, y2 - y1);
      const slotCx = cx - axisHalf + (i + 0.5) * slotW;        // 该段在轴上的中点
      const flatHalf = Math.min(segLen, slotW * 0.74) / 2;     // 平铺半长（留缝）
      return {
        tx1: x1, ty1: y1, tx2: x2, ty2: y2,
        ix1: slotCx - flatHalf, iy1: axisY,                    // 轴上平铺（水平）
        ix2: slotCx + flatHalf, iy2: axisY,
        t: 0, locked: false,
      };
    });
  }

  // ── 触发 collapse（唯一入口，不可重入）────────────────────────
  // 不重建粒子：gesture 已把它们收敛到接近终点，collapse 仅锁定 → LOGO 直接出现。
  function triggerCollapse(now: number) {
    if (gestureFiredRef.current) return;
    gestureFiredRef.current = true;
    if (particlesRef.current.length === 0) return; // 保险
    collapseStartRef.current = now;
    window.navigator.vibrate?.(18);
    playLockSound();
    go("collapse");
  }

  // ════════════════════════════════════════════════════════════════
  //  rAF 唯一渲染管线
  // ════════════════════════════════════════════════════════════════
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      canvas.width  = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width  = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const loop = (now: number) => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const cx = w / 2;

      // 几何锚点（铭牌顶部 / 断言上部 / 中央压印 / 一字轴下方）
      const fontSize = Math.min(w * 0.076, 27);
      const spacing  = fontSize * 1.16;
      const lineGap  = fontSize * 1.7;
      const nameY    = 28;        // 顶部铭牌基线
      const textTopY = h * 0.19;
      const centerY  = h * 0.46;  // 观爻 压印中心 = LOGO 落位中心（界面空白中心）
      const axisY    = h * 0.68;
      const logoSize = Math.min(w, h) * 0.20;

      // ── 视觉空间力场：先占位（HUD/TEXT/AXIS）→ 取最大空白带中心为 LOGO 锚点 ──
      //   LOGO 不再用固定坐标，只落在「可用空白空间」，从结构上杜绝压字与漂移。
      const forbiddenZones: Band[] = [
        [0, nameY + fontSize * 1.4],                                  // HUD（顶部铭牌）
        [textTopY - lineGap * 0.7, textTopY + 2 * lineGap + lineGap * 0.6], // TEXT（三行断言）
        [axisY - 40, axisY + 40],                                     // AXIS（一字轴）
      ];
      const logoCenterY = largestEmptyBandCenter(h, forbiddenZones);

      // ══════════════════════════════════════════════════════════
      //  DRIVE：状态机推进 + 仿真（不绘制）
      //  各层只读 state，互不调用，禁止跨层污染
      // ══════════════════════════════════════════════════════════

      // blackout → typing
      if (stateRef.current === "blackout") {
        if (blackoutStartRef.current === null) blackoutStartRef.current = now;
        if (now - blackoutStartRef.current >= BLACKOUT_MS) {
          // typing inhale：黑场后留白 600ms 再落首字（首字前的静默）
          typingStartRef.current = now + TYPING_INHALE;
          go("typing");
        }
      }

      // typing：逐字发声 + → axis
      // typingElapsed 在 inhale 期为负 → 无字符显现（黑场静默）
      const typingElapsed = typingStartRef.current !== null ? now - typingStartRef.current : 0;
      if (stateRef.current === "typing") {
        const cells = scheduleRef.current.cells;
        const revealed = typingElapsed < 0 ? 0 : cells.filter(c => c.revealAt <= typingElapsed).length;
        while (revealedSoundRef.current < revealed) {
          const idx = revealedSoundRef.current;
          playPulse(120 + (idx % 7) * 9, 6 + (idx % 3)); // 120–180Hz / 5–8ms
          window.navigator.vibrate?.(5);
          revealedSoundRef.current++;
        }
        // line3 完成后 0.5s → 观爻 瞬时压印
        if (typingElapsed >= scheduleRef.current.lastRevealAt + POST_TYPE_MS) {
          stampStartRef.current = now;
          playLockSound();          // 压印击打声（保留声音，去除震动反馈）
          go("stamp");
        }
      }

      // stamp：观爻 瞬时压印(120ms) → exhale 扩散 + axis inhale 留白 → 轴显影
      if (stateRef.current === "stamp") {
        if (stampStartRef.current !== null && now - stampStartRef.current >= STAMP_MS) {
          // 压印后留白（exhale 600 + inhale 300）：轴从未来时刻起展开，期间黑场
          axisStartRef.current = now + STAMP_GAP;
          go("axis");
        }
      }

      // axis → gesture（轴展开后 settle 400ms 才进入可交互态）
      if (stateRef.current === "axis") {
        if (axisStartRef.current !== null && now - axisStartRef.current >= AXIS_MS + AXIS_SETTLE) {
          // 粒子不在此预建：gesture 前画布上不存在任何短线（事件源待用户拖动触发）
          go("gesture");
        }
      }

      // gesture：一触发即断裂——首次有效滑动即断轴并进入收敛（progress 不再参与触发）
      if (stateRef.current === "gesture") {
        // progress 仅用于视觉表现（拉伸/张力），不控制 collapse
        const resist = 0.30 - 0.10 * particleCoherence();
        progressDisplayRef.current += (progressRef.current - progressDisplayRef.current) * resist;
        // 闸门拉到底：需「酝酿时间 ≥400ms」且「闸门推到底（progress≥0.98，100% 死锁点）」才确认有效手势 →
        // 一旦推满即立即断裂（带压入局充能至死锁）+ 进入 collapse 收敛聚成 LOGO。
        const heldMs = pointerDownAtRef.current !== null ? now - pointerDownAtRef.current : 0;
        if (!gestureFiredRef.current && heldMs >= GESTURE_MIN_TIME && progressRef.current >= AXIS_MID_TRIGGER) {
          fractureAxis(cx, logoCenterY, logoSize, axisY); // 必须先于 triggerCollapse
          triggerCollapse(now);
        }
      }

      // collapse：物理收敛 → 阈值达成即 LOGO 显影（不靠时间，100% 稳定）→ next
      if (stateRef.current === "collapse") {
        convergeParticles();
        // LOGO 显影唯一判据 = 物理收敛阈值达成（全部粒子锁定到精确终点）
        if (convergenceThresholdMet()) {
          logoReadyRef.current = true; // 收敛阈值达成 → LOGO 显影（物理终态门）
          if (logoHoldAtRef.current === null) logoHoldAtRef.current = now;
          if (now - (logoHoldAtRef.current ?? now) >= LOGO_HOLD_MS) {
            const sand: typeof sandRef.current = [];
            for (const p of particlesRef.current) {
              for (let k = 0; k <= 6; k++) {
                const tt = k / 6;
                sand.push({
                  x: p.tx1 + (p.tx2 - p.tx1) * tt,
                  y: p.ty1 + (p.ty2 - p.ty1) * tt,
                  vx: (Math.random() - 0.5) * 2.4,
                  vy: Math.random() * 1.6 - 0.4,
                  a: 0.55 + Math.random() * 0.4,
                });
              }
            }
            sandRef.current = sand;
            nextStartRef.current = now;
            go("next");
          }
        }
      }

      // next：沙粒仿真 + 转场
      if (stateRef.current === "next") {
        for (const p of sandRef.current) {
          p.x += p.vx; p.y += p.vy; p.vy += 0.22; p.a -= 0.016;
        }
        sandRef.current = sandRef.current.filter(p => p.a > 0);
        const t = nextStartRef.current !== null ? (now - nextStartRef.current) / NEXT_MS : 0;
        if (t >= 1 && !navigatedRef.current) {
          navigatedRef.current = true;
          navigate("/mother-code", { state: { source: "logo-collapse" } });
          return;
        }
      }

      // ══════════════════════════════════════════════════════════
      //  RENDER：单一管线，分层固定顺序，严格隔离
      // ══════════════════════════════════════════════════════════
      const st = stateRef.current;

      // renderState 标志（由 state 单向派生）
      const typingActive = st === "typing";
      const assertVisible = st !== "blackout";
      // stamp 残影：压印(120ms 实) + 残留驻留(衰减至 0.18)，跨入 axis 仍可见
      const stampVisible = st === "stamp" || st === "axis";
      const axisVisible  = st === "axis" || st === "gesture" || st === "collapse" || st === "next";
      const logoReady    = st === "collapse" && logoReadyRef.current;
      const nextFade = st === "next" && nextStartRef.current !== null
        ? Math.max(0, 1 - (now - nextStartRef.current) / NEXT_MS) : 1;

      // ── 统一物理量 coherence：粒子/收敛/LOGO 三层同源（FLOW蓝→LOGO白）──
      const coherence = (st === "gesture" || st === "collapse") ? particleCoherence() : 0;

      ctx.clearRect(0, 0, w, h);

      // ── LAYER 0：冷蓝宇宙背光场（静态环境噪声，不参与视觉竞争）──
      drawBackgroundField(ctx, w, h, now);

      // ── LAYER 1a：顶部工业信息铭牌（唯一结构行，等宽 11px #333）────
      if (st !== "blackout") {
        ctx.save();
        ctx.font = `400 11px ui-monospace, "SF Mono", Menlo, monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = "#333333";
        ctx.fillText(NAMEPLATE, cx, nameY);
        ctx.restore();
      }

      // ── LAYER 1b：断言文本 ──────────────────────────────────────
      // typing 相位 = 逐字爆裂显现；其后相位 = 完成态静态常驻（断言不消失）。
      // collapse/next 渐隐，让位于 LOGO 结构终态。
      if (assertVisible) {
        const fade = nextFade;
        const textAlpha = typingActive ? 0.9
          : st === "collapse" ? 0.32
          : st === "next" ? 0.32 * fade
          : 0.9;
        ctx.save();
        ctx.font = `300 ${fontSize}px ui-monospace, "SF Mono", Menlo, monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = `rgba(228, 231, 234, ${textAlpha})`;
        for (const cell of scheduleRef.current.cells) {
          // 仅 typing 相位按时间逐字显现；完成态全部常驻
          if (typingActive && cell.revealAt > typingElapsed) continue;
          const lineLen = LINES[cell.li].length;
          const startX  = cx - ((lineLen - 1) * spacing) / 2;
          ctx.fillText(cell.ch, startX + cell.ci * spacing, textTopY + cell.li * lineGap);
        }
        ctx.restore();
      }

      // ── LAYER 1c：观爻 压印 + 记忆残影（降噪：观爻 = 记忆，不抢中心）──
      // ① 0–120ms：压印 alpha 0.75（降权）
      // ② 120ms 后：缓慢衰减 0.75 → 0，残留约 650ms 后淡去（记忆残像）
      if (stampVisible && stampStartRef.current !== null) {
        const st0 = now - stampStartRef.current;
        const stampAlpha = st0 < STAMP_MS
          ? 0.75
          : Math.max(0.0, 0.75 - ((st0 - STAMP_MS) / 650) * 0.75);
        // 衰减到 0.18 后维持一小段再随轴展开淡去（下限不强制截断，自然衰减至 0）
        if (stampAlpha > 0.01) {
          ctx.save();
          ctx.font = `300 ${Math.min(w * 0.12, 48)}px ui-monospace, "SF Mono", Menlo, monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = `rgba(228, 231, 234, ${stampAlpha})`;
          ctx.fillText("观爻", cx, centerY);
          ctx.restore();
        }
      }

      // ── LAYER 2：axis（常驻交互层，含 gesture）──────────────────
      if (axisVisible) {
        const frac = st === "axis"
          ? cubicOut(axisStartRef.current !== null ? (now - axisStartRef.current) / AXIS_MS : 0)
          : 1;
        // 阻力惯性后的显示值（轴 = 被拉紧的结构骨架，不轻滑）
        const progress = st === "gesture" ? progressDisplayRef.current : 0;
        const baseAlpha = (st === "collapse" ? 0.4 : st === "next" ? 0.4 * nextFade : 0.9);

        // axis = 行为路径；蓝为物理驱动色。固定 1px 线宽。
        // 染色过程：未拖动 = #555 骨灰；拖动 = 逐渐被 #00B8D4 冷蓝覆盖。
        const fullHalf = Math.min(w * 0.72, 440) / 2;
        const half = fullHalf * frac;
        // 轴呼吸：gesture 期间 ±0.3px 的生命阻尼感（纯渲染，不改 axisY 几何/断裂起点）
        const axisBreath = st === "gesture" ? Math.sin(progress * Math.PI) * 0.3 : 0;
        const y = axisY + axisBreath;

        // 染色响应曲线：更柔启动（慢起）+ 80ms 延迟死区（progress<0.04 不染色）
        // 视觉响应被软化（"被拉出来"），但填充长度仍跟手指（直接操控不破坏）。
        const dye = progress < 0.04 ? 0 : Math.pow((progress - 0.04) / 0.96, 1.5);
        // 行为染色：lerp(#555 → #00B8D4, dye)
        const r = Math.round(85 + (0   - 85)  * dye);
        const g = Math.round(85 + (184 - 85)  * dye);
        const b = Math.round(85 + (212 - 85)  * dye);

        // 轴 = t=0 结构快照：fragment 一旦出现（fracture 触发）整条轴立即消失，
        //   不再持续渲染 → 杜绝「粒子从轴上长出」；此后由 fragment（LAYER 2.5/3）接管视觉。
        const fractured = particlesRef.current.length > 0;
        if (!fractured) {
          ctx.save();
          ctx.lineWidth = 1;
          // 轴本体（连续 1px 线）
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${baseAlpha})`;
          ctx.beginPath(); ctx.moveTo(cx - half, y); ctx.lineTo(cx + half, y); ctx.stroke();
          // 充能渗透段（冷蓝，无发光）
          if (progress > 0) {
            ctx.strokeStyle = `rgba(0, 184, 212, ${baseAlpha})`;
            ctx.shadowBlur  = 0;
            const fe = cx - half + half * 2 * progress;
            ctx.beginPath(); ctx.moveTo(cx - half, y); ctx.lineTo(fe, y); ctx.stroke();
          }
          // 蓝点：唯一交互源（无发光，实心结构点）
          if (st === "gesture") {
            const dotX = cx - half + half * 2 * progress;
            ctx.save();
            ctx.translate(dotX, y);
            ctx.rotate(Math.PI / 4);
            ctx.shadowBlur = 0;
            ctx.fillStyle  = "#00B8D4";
            ctx.fillRect(-4, -4, 8, 8);
            ctx.restore();
          }
          ctx.restore();
        }
      }

      // ── HUD 提示：交互期常驻（不随 state 消失）──────────────────
      if (st === "axis" || st === "gesture") {
        ctx.save();
        ctx.font = `400 11px ui-monospace, "SF Mono", Menlo, monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = `rgba(120,130,135,${0.5 * (1 + Math.sin(now * 0.0017) * 0.1)})`; // 存在感呼吸 0.45~0.55
        ctx.fillText("右滑 · 充能", cx, axisY + 32);
        ctx.restore();
      }

      // ── HUD 认知梯度场：四锚点按重力梯度分压（不是平行标签列表）──
      // 见自己=1.0(最重) 观变化=0.85 循规律=0.7 破心结=0.55；整体随 coherence 退隐。
      if (st === "axis" || st === "gesture" || st === "collapse" || st === "next") {
        const gradeFactor = (0.9 - 0.55 * coherence) * nextFade * (1 + Math.sin(now * 0.0015) * 0.06); // 认知层呼吸（±0.06，bounded）
        const anchors: Array<[string, number]> = [
          ["见自己", 1.0], ["观变化", 0.85], ["循规律", 0.7], ["破心结", 0.55],
        ];
        ctx.save();
        ctx.font = `400 11px ui-monospace, "SF Mono", Menlo, monospace`;
        ctx.textBaseline = "middle";
        // 等宽布局：以中心对称排布四锚点 + 分隔点
        const seg = " · ";
        ctx.textAlign = "left";
        const widths = anchors.map(([t]) => ctx.measureText(t).width);
        const sepW = ctx.measureText(seg).width;
        const totalW = widths.reduce((a, b) => a + b, 0) + sepW * 3;
        let x = cx - totalW / 2;
        anchors.forEach(([text, weight], i) => {
          ctx.fillStyle = `rgba(199, 205, 210, ${weight * gradeFactor})`;
          ctx.fillText(text, x, h * 0.88);
          x += widths[i];
          if (i < anchors.length - 1) {
            ctx.fillStyle = `rgba(199, 205, 210, ${0.4 * gradeFactor})`;
            ctx.fillText(seg, x, h * 0.88);
            x += sepW;
          }
        });
        ctx.restore();
      }

      // ── LAYER 2.5：粒子过程层 = LOGO 生成过程（FLOW蓝→RESIDUE混合，coherence 驱动）──
      if (st === "gesture") {
        ctx.save();
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = flowColor(coherence, 0.5); // 统一颜色源：随收敛度蓝→白
        let gi = 0;
        for (const p of particlesRef.current) {
          const [ax, ay, ex, ey] = fragEndpoints(p);          // 轴上平铺 → LOGO 的当前插值
          const [bx, by] = softBreath(gi++, now, coherence);  // 路径过程微扰（非累加）
          ctx.beginPath();
          ctx.moveTo(ax + bx, ay + by);
          ctx.lineTo(ex + bx, ey + by);
          ctx.stroke();
        }
        ctx.restore();
      }

      // ── LAYER 3：logo（终态视觉锚点）= 同一 coherence 颜色源的收敛终点 ──
      // 颜色由 flowColor(coherence) 连续生成：RESIDUE 蓝白混合 → LOGO 白，无跳变。
      if (st === "collapse") {
        ctx.save();
        if (logoReady) {
          // LOGO = 已落位的结构实体（重力压强）：
          //   微弱下沉偏移 + 内阴影（暗色下沉描边）+ opacity 动态稳定 0.92~1.0。
          const sink     = 0.6;                                   // 下沉偏移 px
          const logoAlpha = 0.96 + Math.sin(now * 0.002) * 0.04;  // 0.92~1.0 动态稳定
          ctx.lineWidth = 1.55;
          ctx.shadowBlur = 0;
          // 内阴影：先画暗色下沉描边（位于结构下方，制造"压在场里"的重量）
          ctx.globalAlpha = 0.30 * logoAlpha;
          ctx.strokeStyle = "rgba(0,40,55,1)";
          for (const p of particlesRef.current) {
            ctx.beginPath();
            ctx.moveTo(p.tx1, p.ty1 + sink + 1); ctx.lineTo(p.tx2, p.ty2 + sink + 1); ctx.stroke();
          }
          // 结构本体：骨白，含微弱下沉（终态 = 精确 target，无呼吸）
          ctx.globalAlpha = logoAlpha;
          ctx.strokeStyle = flowColor(coherence, 1);
          for (const p of particlesRef.current) {
            ctx.beginPath();
            ctx.moveTo(p.tx1, p.ty1 + sink); ctx.lineTo(p.tx2, p.ty2 + sink); ctx.stroke();
          }
        } else {
          // RESIDUE：升起过程（intact→target 插值），蓝白混合 + 微呼吸（锁定后归零）。
          ctx.lineWidth = 1.4;
          ctx.globalAlpha = 0.85;
          ctx.strokeStyle = flowColor(coherence, 0.85);
          let ri = 0;
          for (const p of particlesRef.current) {
            const [ax, ay, ex, ey] = fragEndpoints(p);
            const [bx, by] = softBreath(ri++, now, coherence);
            ctx.beginPath();
            ctx.moveTo(ax + bx, ay + by);
            ctx.lineTo(ex + bx, ey + by);
            ctx.stroke();
          }
        }
        ctx.restore();
      }

      // ── next：沙化像素层 ────────────────────────────────────────
      if (st === "next") {
        ctx.save();
        for (const p of sandRef.current) {
          if (p.a > 0) {
            ctx.globalAlpha = p.a;
            ctx.fillStyle   = "#FFFFFF";
            ctx.fillRect(p.x, p.y, 1.5, 1.5);
          }
        }
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []); // rAF 通过 ref 读取最新状态

  // ── 指针：仅 gesture 相位接受输入 ────────────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (stateRef.current !== "gesture") return;
    getAudioCtx();
    startXRef.current = e.clientX;
    pointerDownAtRef.current = performance.now(); // 记录按下时刻（用于时间门控）
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (stateRef.current !== "gesture" || startXRef.current === null) return;
    // 拖动行程 = 一字轴可见长度，滑块跟随手指，到右端即完成充能
    const width = e.currentTarget.getBoundingClientRect().width;
    const lineLen = Math.min(width * 0.72, 440);
    const prog = Math.max(0, Math.min(1, (e.clientX - startXRef.current) / lineLen));
    progressRef.current = prog;
    if (prog > 0.6) window.navigator.vibrate?.(4);
  }, []);

  const onPointerUp = useCallback(() => {
    if (startXRef.current === null) return;
    startXRef.current = null;
    if (stateRef.current === "gesture" && !gestureFiredRef.current) {
      progressRef.current = 0;        // 显示值带惯性回落（阻力感）
      pointerDownAtRef.current = null; // 未达门控即松手 → 重置酝酿计时
    }
  }, []);

  return (
    <GyMobilePreviewFrame background="#000000">
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          touchAction: "none",
          userSelect: "none",
          cursor: phase === "gesture" ? "grab" : "default",
        }}
      >
        <canvas ref={canvasRef} aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
      </div>
    </GyMobilePreviewFrame>
  );
}
