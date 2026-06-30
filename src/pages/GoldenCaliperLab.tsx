// ─────────────────────────────────────────────────────────────────────────────
// 观爻 2.0 ·「黄金样板屏」隔离原型 —— 卡尺探测屏（核心动词：单指抓线横拖）
//
// 本文件是【隔离调参原型】：
//   · 独立路由 /golden-lab，独立文件；不 import、不修改 MotherField / 主链路 / 内容引擎。
//   · 内耗文案为内置占位（ANCHORS），不接内容引擎。
//   · A–G 物理常量全部集中在下方 CFG（标尺规格的真源雏形），直接改数字即可调手感。
//
// 实现的标尺条目：
//   A 响应地基（≤2帧跟手 / 死区 / 拖拽增益 / 松手回弹棘轮）
//   B 弓弦张力（线被拽弯 + 阻力随张力升 + 临界预紧 + 崩断 sin 衰减回弹）
//   C 因果雷达硬显（命中即满亮、否则不绘制；进/出迟滞；零 opacity 渐隐）
//   D 向心收缩（蓝色引力场半径/浓度随进度收紧 + 中心微移）
//   E 档位锁止 + 三通道反馈（声 + 震 + 准星 180° 翻面，同帧）
//   F 自演示 affordance（静息时光点自拽示范方向；首次推进 >15% 后停止；零文字）
//   G 沙化 / 崩断（主动过拉撕断触发；统一逐帧自由落体 vy=2.0+rand*3.5；命中过的文案本体碎裂；急停+脆响）
//   H 触感降级（vibrate 有则用；声效+屏震+急停为 iOS 兜底）
//   I 性能（固定步长物理 / DPR≤2 / 粒子池复用）
//   J 可逆退出（向下拖线“沉降”重置）
//
// 验收口径：关掉说明文字与振动，陌生人 3s 内自己拖起来、过档“哦”一声、崩断后想再来一次。
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import { GyMobilePreviewFrame } from "../components/visual/GyMobilePreviewFrame";

const MONO = "SFMono-Regular, Menlo, Monaco, Consolas, monospace";
const SANS = "-apple-system, system-ui, sans-serif";

// ── A–G 物理常量真源（直接改这里调手感）──────────────────────────────────────
const CFG = {
  // 版面
  trackXMargin: 0.1, // 轨道左右边距（x0=0.1w, x1=0.9w）
  cyFrac: 0.5, // 生命线纵向位置
  // A 响应
  dragGainFrac: 0.5, // 拖动 0.5×屏宽 = 推满 0→1
  deadZone: 3, // px 死区
  springEase: 10, // 松手回弹缓动速率（越大越快；≈0.18s 量级）
  // B 弓弦
  maxDeflection: 16, // px 满张力时线弓顶挠度
  bendVelBoost: 0.1, // 拖动速度带来的瞬时附加挠度系数
  resistGrow: 1.9, // 阻力随进度增长：resist = 1 + grow·progress²
  preTension: 0.95, // 超过此进度，挠度陡增（崩断蓄势）
  wobbleDecay: 0.86, // 崩断线头 sin 回弹衰减/步
  // C 雷达
  hitEnter: 0.06, // 命中半径（progress 单位）
  hitExit: 0.085, // 离开半径（迟滞）
  // D 向心收缩
  fieldR0: 0.72, // 初始场半径（×max(w,h)）
  contract: 0.42, // 收缩量（progress=1 时半径 ×(1-contract)）
  centerShiftFrac: 0.03, // 中心朝光点微移上限（×h）
  // E 档位
  detents: [0.18, 0.5, 0.82, 1.0], // 身体 / 情绪 / 思维 / 撕裂点
  flipDur: 0.16, // 准星翻面时长
  // F 自演示
  demoPeriod: 2.4,
  demoAmp: 7, // px
  demoStopProgress: 0.15,
  // G 崩断
  tearArm: 0.96, // 进度到此 = 进入张力临界(武装)，线锁死在极限
  tearTravel: 80, // 武装后再向右拉满多少 px 即崩断（统一行程，不靠速度）
  tearRelease: 2.0, // 松手后撕断充能泄掉的速率
  gravity: 0.22, // 逐帧重力
  vyBase: 2.0,
  vyRand: 3.5,
  particleBudget: 400,
  freezeFrames: 2, // 崩断急停帧
  // 屏震
  detentShake: 3,
  breakShake: 16,
  // J 退出
  sinkDist: 80, // 向下拖动多少 px 触发沉降重置
};

const COLOR = {
  bg: "#000000",
  blue: "#00B8D4",
  gold: "#C7A96B",
  white: "#f6f3ec",
  gray: "#555555",
};

// 内置占位内耗文案（非内容引擎）：pos = 在 0..1 轨道上的锚点
const ANCHORS: { pos: number; space: string; text: string }[] = [
  { pos: 0.12, space: "身体", text: "你把疲惫，读成了懒惰" },
  { pos: 0.26, space: "身体", text: "撑住，是你唯一允许的休息" },
  { pos: 0.44, space: "情绪", text: "你把愤怒，改写成了沉默" },
  { pos: 0.58, space: "情绪", text: "道歉，总是你先开口" },
  { pos: 0.74, space: "思维", text: "你用计划，代替了开始" },
  { pos: 0.9, space: "思维", text: "退路，你想得比出路清楚" },
];

function clamp(v: number, a: number, b: number) {
  return Math.min(Math.max(v, a), b);
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function lerpHex(a: string, b: string, t: number) {
  const k = clamp(t, 0, 1);
  const pa = [parseInt(a.slice(1, 3), 16), parseInt(a.slice(3, 5), 16), parseInt(a.slice(5, 7), 16)];
  const pb = [parseInt(b.slice(1, 3), 16), parseInt(b.slice(3, 5), 16), parseInt(b.slice(5, 7), 16)];
  const c = pa.map((v, i) => Math.round(v + ((pb[i] ?? v) - v) * k));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

type Particle = { x: number; y: number; vx: number; vy: number; alpha: number; active: boolean; color: string };

// ── 程序化音效（WebAudio）：咔哒(过档) / 崩裂(撕断)；首次手势解锁 ───────────────
function makeAudio() {
  let ctx: AudioContext | null = null;
  function ensure() {
    if (typeof window === "undefined") return null;
    if (!ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AC) ctx = new AC();
    }
    if (ctx && ctx.state === "suspended") ctx.resume().catch(() => {});
    return ctx;
  }
  function snap() {
    const c = ensure();
    if (!c) return;
    const t = c.currentTime;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "triangle";
    o.frequency.setValueAtTime(1300, t);
    o.frequency.exponentialRampToValueAtTime(640, t + 0.045);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.28, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
    o.connect(g).connect(c.destination);
    o.start(t);
    o.stop(t + 0.07);
  }
  function breakSnap() {
    const c = ensure();
    if (!c) return;
    const t = c.currentTime;
    // 金属脆响：噪声爆 + 下行音
    const buf = c.createBuffer(1, Math.floor(c.sampleRate * 0.18), c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2.2);
    const noise = c.createBufferSource();
    noise.buffer = buf;
    const bp = c.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 2200;
    bp.Q.value = 0.8;
    const ng = c.createGain();
    ng.gain.setValueAtTime(0.5, t);
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
    noise.connect(bp).connect(ng).connect(c.destination);
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(440, t);
    o.frequency.exponentialRampToValueAtTime(70, t + 0.16);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.32, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.17);
    o.connect(g).connect(c.destination);
    noise.start(t);
    o.start(t);
    o.stop(t + 0.18);
  }
  function knot() {
    // 打结/绳勒：低闷噪声爆(低通) + 低频 thud，区别于机械咔哒
    const c = ensure();
    if (!c) return;
    const t = c.currentTime;
    const buf = c.createBuffer(1, Math.floor(c.sampleRate * 0.07), c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 3);
    const n = c.createBufferSource();
    n.buffer = buf;
    const lp = c.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 900;
    const ng = c.createGain();
    ng.gain.setValueAtTime(0.34, t);
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
    n.connect(lp).connect(ng).connect(c.destination);
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(150, t);
    o.frequency.exponentialRampToValueAtTime(88, t + 0.06);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.22, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
    o.connect(g).connect(c.destination);
    n.start(t);
    o.start(t);
    o.stop(t + 0.08);
  }
  return { ensure, snap, knot, breakSnap };
}

export function GoldenCaliperLab() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const audio = makeAudio();

    const m = {
      w: 0,
      h: 0,
      cx: 0,
      cy: 0,
      x0: 0,
      x1: 0,
      // 状态机
      state: "IDLE" as "IDLE" | "ACTIVE" | "BROKEN" | "TRAJECTORY",
      // 进度
      progress: 0,
      progressEver: 0,
      locked: -1, // 已锁定的最高档位 index
      armed: false, // 末端张力临界：线已绷到极限、锁死
      tearCharge: 0, // 撕断充能 0→1
      // 拖拽
      dragging: false,
      lastX: 0,
      lastY: 0,
      dragAxis: null as null | "h" | "v",
      sink: 0,
      lastV: 0, // 上一帧拖动速度（用于弓弦瞬时挠度）
      // 弓弦渲染
      deflection: 0,
      // 准星翻面
      flip: 1, // 1=静止；过档时置 0 重新长到 1
      // 崩断
      brokenT: 0,
      freeze: 0,
      wobbleAmp: 0,
      wobblePhase: 0,
      // 屏震
      shake: 0,
      // 自演示
      demoT: 0,
      demoActive: true,
      // 命中
      hit: ANCHORS.map(() => false),
      revealed: ANCHORS.map(() => false),
      // 打结：每个档位结的收紧计时（-1=未打）
      knotT: CFG.detents.map(() => -1),
      // 演化轨迹：每个空间停留时长 → 形变幅度；撕断后连成原力形变曲线
      dwell: [0, 0, 0] as [number, number, number],
      sampleAmp: [0, 0, 0] as [number, number, number],
      trajT: 0,
      // 粒子池
      particles: [] as Particle[],
      // debug
      debug: false,
      fps: 0,
      fpsAcc: 0,
      fpsN: 0,
    };
    for (let i = 0; i < CFG.particleBudget; i++) m.particles.push({ x: 0, y: 0, vx: 0, vy: 0, alpha: 0, active: false, color: COLOR.gold });

    function vibrate(p: number | number[]) {
      if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") navigator.vibrate(p);
    }

    function resize() {
      const c = canvasRef.current;
      if (!c) return;
      const rect = c.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1); // I: DPR≤2
      c.width = Math.max(1, Math.floor(rect.width * dpr));
      c.height = Math.max(1, Math.floor(rect.height * dpr));
      const ctx = c.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      m.w = rect.width;
      m.h = rect.height;
      m.cx = rect.width / 2;
      m.cy = rect.height * CFG.cyFrac;
      m.x0 = rect.width * CFG.trackXMargin;
      m.x1 = rect.width * (1 - CFG.trackXMargin);
    }

    function resetScreen() {
      m.state = "IDLE";
      m.progress = 0;
      m.progressEver = 0;
      m.locked = -1;
      m.armed = false;
      m.tearCharge = 0;
      m.deflection = 0;
      m.flip = 1;
      m.brokenT = 0;
      m.wobbleAmp = 0;
      m.shake = 0;
      m.demoT = 0;
      m.demoActive = true;
      m.hit = ANCHORS.map(() => false);
      m.revealed = ANCHORS.map(() => false);
      m.knotT = CFG.detents.map(() => -1);
      m.dwell = [0, 0, 0];
      m.sampleAmp = [0, 0, 0];
      m.trajT = 0;
      m.particles.forEach((p) => (p.active = false));
    }

    function fireDetent(i: number) {
      // E: 三通道同帧反馈 ——「打结」：绳勒声 + 振动 + 准星翻面 + 微震 + 在绳上系下持久结节
      audio.knot();
      vibrate(12);
      m.flip = 0; // 准星翻面
      m.shake = Math.max(m.shake, CFG.detentShake);
      if (i >= 0 && i < m.knotT.length) m.knotT[i] = 0; // 触发该结的收紧动画
    }

    function doBreak() {
      // 撕断瞬间结算：三个空间的停留时长 → 形变幅度（停留越久=该空间形变越大），
      // 最长的归一化为满幅，保证轨迹有"形状"。这是用户驱动、可复测的，非固定标签。
      const mx = Math.max(m.dwell[0], m.dwell[1], m.dwell[2], 0.0001);
      m.sampleAmp = [m.dwell[0] / mx, m.dwell[1] / mx, m.dwell[2] / mx];
      m.state = "BROKEN";
      m.brokenT = 0;
      m.freeze = CFG.freezeFrames;
      m.wobbleAmp = 14;
      m.wobblePhase = 0;
      m.shake = CFG.breakShake;
      audio.breakSnap();
      vibrate([0, 40, 30, 60]);
      // G: 命中过的心魔文案本体碎裂
      let pi = 0;
      const fontPx = Math.min(22, m.w * 0.052);
      ANCHORS.forEach((a, idx) => {
        if (!m.hit[idx]) return;
        const textW = Math.min(m.w * 0.82, a.text.length * fontPx * 1.05);
        const tx = m.cx - textW / 2;
        const ty = m.cy - m.h * 0.16;
        const cols = 26;
        const rows = 3;
        for (let r = 0; r < rows; r++) {
          for (let cc = 0; cc < cols; cc++) {
            if (pi >= m.particles.length) break;
            const p = m.particles[pi++];
            p.x = tx + (cc / cols) * textW + (Math.random() - 0.5) * 3;
            p.y = ty + (r / rows) * fontPx * 1.2 + (Math.random() - 0.5) * 3;
            p.vx = (Math.random() - 0.5) * 1.4;
            p.vy = CFG.vyBase + Math.random() * CFG.vyRand; // 统一逐帧自由落体
            p.alpha = 0.85 + Math.random() * 0.15;
            p.color = Math.random() < 0.3 ? COLOR.gold : COLOR.white; // 命中文案为白，临界已转金
            p.active = true;
          }
        }
      });
    }

    // ── 固定步长物理 ──────────────────────────────────────────────────────────
    function step(dt: number) {
      // 演化轨迹：记录每个空间的停留时长（= 形变幅度来源）。排除末端充能，避免"思维"恒定偏大。
      if (m.state === "ACTIVE" && m.dragging && !m.armed) {
        const sp = m.progress < 0.34 ? 0 : m.progress < 0.67 ? 1 : 2;
        m.dwell[sp] = (m.dwell[sp] ?? 0) + dt;
      }
      // 自演示
      if (m.demoActive && m.state === "IDLE") {
        m.demoT += dt;
        if (m.progressEver > CFG.demoStopProgress) m.demoActive = false;
      }
      // 准星翻面回长
      if (m.flip < 1) m.flip = Math.min(1, m.flip + dt / CFG.flipDur);
      // 结的收紧动画计时
      for (let i = 0; i < m.knotT.length; i++) if (m.knotT[i] >= 0) m.knotT[i] += dt;
      // 屏震衰减
      if (m.shake > 0) m.shake = Math.max(0, m.shake - dt * 60);
      // 撕断充能时：全屏渐强颤动（充能越满抖得越凶，给"快断了"的可见信号）
      if (m.armed && m.state !== "BROKEN") m.shake = Math.max(m.shake, m.tearCharge * 7);
      // 松手回弹（棘轮）：未拖动且未断 → 张力泄掉、回到已锁档位
      if (!m.dragging && m.state !== "BROKEN") {
        if (m.tearCharge > 0) {
          m.tearCharge = Math.max(0, m.tearCharge - dt * CFG.tearRelease);
          if (m.tearCharge === 0) m.armed = false; // 充能泄尽 → 解除武装
        }
        const target = m.armed ? 1 : m.locked >= 0 ? CFG.detents[m.locked] ?? 0 : 0;
        m.progress += (target - m.progress) * Math.min(1, dt * CFG.springEase);
      }
      // 弓弦挠度（B）：随进度 + 临界预紧 + 拖动速度瞬时
      let baseDef = CFG.maxDeflection * m.progress;
      if (m.progress > CFG.preTension) baseDef += CFG.maxDeflection * (m.progress - CFG.preTension) * 8;
      baseDef += Math.abs(m.lastV) * CFG.bendVelBoost;
      m.deflection += (baseDef - m.deflection) * Math.min(1, dt * 12);
      m.lastV *= 0.6;
      // 雷达命中（C，迟滞）
      ANCHORS.forEach((a, idx) => {
        const d = Math.abs(m.progress - a.pos);
        if (!m.revealed[idx] && d < CFG.hitEnter) {
          m.revealed[idx] = true;
          m.hit[idx] = true;
        } else if (m.revealed[idx] && d > CFG.hitExit) {
          m.revealed[idx] = false;
        }
      });
      // 崩断粒子（崩断态与轨迹态都继续下落，让标签碎屑飘落与轨迹浮现重叠）
      if (m.state === "BROKEN" || m.state === "TRAJECTORY") {
        m.brokenT += dt;
        if (m.wobbleAmp > 0.2) {
          m.wobblePhase += dt * 40;
          m.wobbleAmp *= CFG.wobbleDecay;
        }
        for (const p of m.particles) {
          if (!p.active) continue;
          p.vy += CFG.gravity * (dt * 60);
          p.x += p.vx * (dt * 60);
          p.y += p.vy * (dt * 60);
          p.alpha -= dt * 0.55;
          if (p.alpha <= 0 || p.y > m.h + 20) p.active = false;
        }
      }
      // 撕断 → 标签碎屑飘落片刻后，原力形变曲线浮现
      if (m.state === "BROKEN" && m.brokenT > 0.7) {
        m.state = "TRAJECTORY";
        m.trajT = 0;
      }
      if (m.state === "TRAJECTORY") m.trajT = Math.min(1, m.trajT + dt / 1.1);
    }

    // ── 渲染 ──────────────────────────────────────────────────────────────────
    function draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      // 屏震
      if (m.shake > 0.1) ctx.translate((Math.random() - 0.5) * m.shake, (Math.random() - 0.5) * m.shake);
      ctx.clearRect(-30, -30, m.w + 60, m.h + 60);
      ctx.fillStyle = COLOR.bg;
      ctx.fillRect(-30, -30, m.w + 60, m.h + 60);

      const overshoot = m.armed ? m.tearCharge * 18 : 0; // 武装后光点随充能向右过冲
      const dotX = m.x0 + (m.x1 - m.x0) * m.progress + overshoot;
      // 颜色：常态 蓝→金随进度；武装后随撕断充能 金→白热（"发烫快断了"的信号）
      const lineColor = m.armed
        ? lerpHex(COLOR.gold, COLOR.white, m.tearCharge)
        : lerpHex(COLOR.blue, COLOR.gold, clamp((m.progress - 0.7) / 0.3, 0, 1));

      // D 向心收缩：蓝场半径/浓度随进度收紧 + 中心微移
      const fieldCX = lerp(m.cx, dotX, 0.18);
      const fieldCY = m.cy - CFG.centerShiftFrac * m.h * m.progress;
      const r = Math.max(m.w, m.h) * CFG.fieldR0 * (1 - CFG.contract * m.progress);
      const coreA = 0.05 + 0.16 * m.progress;
      const bg = ctx.createRadialGradient(fieldCX, fieldCY, 0, fieldCX, fieldCY, Math.max(40, r));
      bg.addColorStop(0, `rgba(0,184,212,${coreA.toFixed(3)})`);
      bg.addColorStop(0.5, `rgba(0,184,212,${(coreA * 0.4).toFixed(3)})`);
      bg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, m.w, m.h);

      // ── TRAJECTORY：撕断标签后浮现「原力形变曲线」——不是定格卡，是一条会变的轨迹 ──
      if (m.state === "TRAJECTORY") {
        const reveal = m.trajT;
        const now = performance.now();
        // 原力基线（未形变的底色力）
        ctx.strokeStyle = "rgba(85,85,85,0.55)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(m.x0, m.cy);
        ctx.lineTo(m.x1, m.cy);
        ctx.stroke();
        ctx.textAlign = "left";
        ctx.fillStyle = "rgba(85,85,85,0.8)";
        ctx.font = `${Math.min(10, m.w * 0.026)}px ${MONO}`;
        ctx.fillText("原力基线", m.x0, m.cy - 8);

        // 标题
        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(0,184,212,0.72)";
        ctx.font = `${Math.min(12, m.w * 0.03)}px ${MONO}`;
        ctx.fillText("原力形变 · 当前压力场", m.cx, m.h * 0.12);

        // 三个采样点（停留时长→幅度），轻微呼吸=活的、非固定
        const spaces = ["身体", "情绪", "思维"];
        const pts = [0, 1, 2].map((i) => {
          const p = CFG.detents[i] ?? 0.2;
          const amp = (m.sampleAmp[i] ?? 0) * 0.16 * m.h + 0.04 * m.h;
          return { x: m.x0 + (m.x1 - m.x0) * p, y: m.cy - amp + Math.sin(now / 900 + i) * 2 };
        });
        const path = [{ x: m.x0, y: m.cy }, ...pts, { x: m.x1, y: m.cy }];

        // 平滑曲线（中点二次贝塞尔），从左向右揭示
        ctx.save();
        ctx.beginPath();
        ctx.rect(m.x0 - 6, 0, (m.x1 - m.x0) * reveal + 12, m.h);
        ctx.clip();
        ctx.strokeStyle = COLOR.gold;
        ctx.lineWidth = 1.8;
        ctx.shadowColor = "rgba(199,169,107,0.45)";
        ctx.shadowBlur = 7;
        ctx.beginPath();
        ctx.moveTo(path[0]!.x, path[0]!.y);
        for (let i = 1; i < path.length - 1; i++) {
          const a = path[i]!;
          const b = path[i + 1]!;
          ctx.quadraticCurveTo(a.x, a.y, (a.x + b.x) / 2, (a.y + b.y) / 2);
        }
        ctx.lineTo(path[path.length - 1]!.x, path[path.length - 1]!.y);
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.restore();

        // 采样节点 + 空间标签（揭示到达后出现）
        pts.forEach((p, i) => {
          if (p.x > m.x0 + (m.x1 - m.x0) * reveal) return;
          ctx.fillStyle = COLOR.gold;
          ctx.shadowColor = "rgba(199,169,107,0.5)";
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.fillStyle = "rgba(246,243,236,0.82)";
          ctx.textAlign = "center";
          ctx.font = `${Math.min(13, m.w * 0.032)}px ${SANS}`;
          ctx.fillText(spaces[i] ?? "", p.x, m.cy + 24);
        });

        // 钩子：揭示完成后出现——强调"会变、可复测"，破除标签固化
        if (reveal > 0.96) {
          ctx.textAlign = "center";
          ctx.fillStyle = "rgba(246,243,236,0.55)";
          ctx.font = `${Math.min(11, m.w * 0.028)}px ${MONO}`;
          ctx.fillText("压力随时移而变 · 这条轨迹也会随之改写", m.cx, m.h * 0.8);
          ctx.fillStyle = "rgba(0,184,212,0.6)";
          ctx.fillText("轻触 · 复测", m.cx, m.h * 0.86);
        }

        // 仍在飘落的标签碎屑（与轨迹浮现重叠）
        m.particles.forEach((p) => {
          if (!p.active) return;
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x - 0.8, p.y - 0.8, 1.8, 1.8);
        });
        ctx.globalAlpha = 1;

        ctx.restore(); // 关闭顶部 ctx.save()（屏震）
        return;
      }

      // C 雷达硬显：命中即满亮，否则不绘制（零渐隐）
      if (m.state !== "BROKEN") {
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ANCHORS.forEach((a, idx) => {
          if (!m.revealed[idx]) return;
          const fontPx = Math.min(22, m.w * 0.052);
          ctx.fillStyle = COLOR.white;
          ctx.globalAlpha = 1;
          ctx.font = `${fontPx}px ${SANS}`;
          ctx.fillText(a.text, m.cx, m.cy - m.h * 0.16);
          // 空间标签（状态读数，非说明）
          ctx.fillStyle = "rgba(0,184,212,0.7)";
          ctx.font = `${Math.min(11, m.w * 0.028)}px ${MONO}`;
          ctx.fillText(`［ ${a.space} ］`, m.cx, m.cy - m.h * 0.16 - fontPx);
        });
        ctx.globalAlpha = 1;
      }

      // B 生命线：弓弦弯曲（quadratic，顶点在光点处上挠）
      ctx.lineCap = "round";
      if (m.state !== "BROKEN") {
        // 底轨（极淡骨灰）
        ctx.strokeStyle = "rgba(85,85,85,0.5)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(m.x0, m.cy);
        ctx.lineTo(m.x1, m.cy);
        ctx.stroke();
        // 弓弦主线
        const apexY = m.cy - m.deflection;
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1.4;
        ctx.shadowColor = "rgba(0,184,212,0.5)";
        ctx.shadowBlur = 6 + m.progress * 8;
        // 控制点 Y = 2·apexY − cy，使曲线中点恰好落在 apexY（弓顶在光点处上挠）
        ctx.beginPath();
        ctx.moveTo(m.x0, m.cy);
        ctx.quadraticCurveTo(dotX, 2 * apexY - m.cy, m.x1, m.cy);
        ctx.stroke();
        ctx.shadowBlur = 0;
      } else {
        // 崩断：两段线头 sin 衰减回弹
        const w = m.wobbleAmp * Math.sin(m.wobblePhase);
        ctx.strokeStyle = lerpHex(COLOR.gold, COLOR.gray, clamp(m.brokenT, 0, 1));
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(m.x0, m.cy + w);
        ctx.lineTo(m.cx - 20, m.cy + w * 0.4);
        ctx.moveTo(m.x1, m.cy - w);
        ctx.lineTo(m.cx + 20, m.cy - w * 0.4);
        ctx.stroke();
      }

      // 进度填充（已滑段提亮）
      if (m.state !== "BROKEN") {
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 2;
        ctx.shadowColor = "rgba(0,184,212,0.55)";
        ctx.shadowBlur = 8;
        ctx.globalAlpha = 0.92;
        const apexY = m.cy - m.deflection;
        ctx.beginPath();
        ctx.moveTo(m.x0, m.cy);
        ctx.quadraticCurveTo((m.x0 + dotX) / 2, lerp(m.cy, apexY, 0.5), dotX, apexY);
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        // 命运绳上的「结」：已锁档位 = 已系下的结，持续可见（结绳记事）。结精确落在弓线上。
        const cpY = 2 * apexY - m.cy;
        const solveLineY = (kx: number) => {
          const a = m.x0 - 2 * dotX + m.x1;
          const b = 2 * dotX - 2 * m.x0;
          const cc = m.x0 - kx;
          let tt: number;
          if (Math.abs(a) < 1e-6) tt = clamp(-cc / b, 0, 1);
          else {
            const disc = Math.max(0, b * b - 4 * a * cc);
            tt = clamp((-b + Math.sqrt(disc)) / (2 * a), 0, 1);
          }
          const o = 1 - tt;
          return o * o * m.cy + 2 * o * tt * cpY + tt * tt * m.cy;
        };
        for (let i = 0; i <= m.locked && i < CFG.detents.length - 1; i++) {
          const dpos = CFG.detents[i];
          if (dpos === undefined) continue;
          const kx = m.x0 + (m.x1 - m.x0) * dpos;
          const ky = solveLineY(kx);
          const kt = m.knotT[i] ?? -1;
          const pop = kt >= 0 ? Math.max(0, 1 - kt / 0.2) : 0; // 打结瞬间收紧鼓起 → 回落
          const rr = 3.2 + pop * 4.5;
          ctx.fillStyle = lineColor;
          ctx.shadowColor = "rgba(0,184,212,0.5)";
          ctx.shadowBlur = 5 + pop * 9;
          ctx.beginPath();
          ctx.arc(kx, ky, rr, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          // 缠绕缝：一道暗线，示意绳结的绞合
          ctx.strokeStyle = "rgba(0,0,0,0.55)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(kx - rr, ky);
          ctx.lineTo(kx + rr, ky);
          ctx.stroke();
        }

        // E 准星：方框 + 圆环，过档 180° 翻面（scaleX 经 0）
        const flipScale = Math.abs(Math.cos((1 - m.flip) * Math.PI));
        ctx.save();
        ctx.translate(dotX, apexY);
        const swell = 1 + (m.armed ? m.tearCharge : 0) * 0.7; // 武装充能时准星胀大
        ctx.scale(flipScale * swell, swell);
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1.6;
        ctx.shadowColor = "rgba(0,184,212,0.6)";
        ctx.shadowBlur = 8 + m.progress * 8;
        ctx.strokeRect(-5, -5, 10, 10);
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.restore();

        // F 自演示：静息时光点旁的牵引余光（零文字）
        if (m.demoActive && m.state === "IDLE") {
          const tug = Math.max(0, Math.sin((m.demoT / CFG.demoPeriod) * Math.PI * 2)) * CFG.demoAmp;
          ctx.globalAlpha = 0.4 + 0.3 * (tug / CFG.demoAmp);
          ctx.fillStyle = COLOR.blue;
          for (let k = 1; k <= 3; k++) {
            ctx.globalAlpha = (0.32 - k * 0.07) * (0.4 + tug / CFG.demoAmp);
            ctx.fillRect(dotX + 12 + k * 7 + tug, apexY - 1, 4, 2);
          }
          ctx.globalAlpha = 1;
        }
      }

      // 档位刻度（极淡）
      if (m.state !== "BROKEN") {
        CFG.detents.forEach((d, i) => {
          if (i >= CFG.detents.length - 1) return; // 末位=撕裂点不画刻度
          const tx = m.x0 + (m.x1 - m.x0) * d;
          ctx.strokeStyle = i <= m.locked ? lineColor : "rgba(85,85,85,0.6)";
          ctx.globalAlpha = i <= m.locked ? 0.8 : 0.4;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(tx, m.cy - 6);
          ctx.lineTo(tx, m.cy + 6);
          ctx.stroke();
          ctx.globalAlpha = 1;
        });
      }

      // G 崩断粒子
      if (m.state === "BROKEN") {
        m.particles.forEach((p) => {
          if (!p.active) return;
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x - 0.8, p.y - 0.8, 1.8, 1.8);
        });
        ctx.globalAlpha = 1;
        // 崩断后再来一次的牵引（粒子落尽后）
        if (m.brokenT > 1.3) {
          ctx.strokeStyle = "rgba(0,184,212,0.5)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(m.x0, m.cy);
          ctx.lineTo(m.x1, m.cy);
          ctx.stroke();
        }
      }

      ctx.restore();

      // debug 叠层（默认关闭；右上角双击切换）
      if (m.debug) {
        ctx.fillStyle = "rgba(0,184,212,0.9)";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.font = `11px ${MONO}`;
        const lines = [
          `state=${m.state} fps=${m.fps.toFixed(0)}`,
          `progress=${m.progress.toFixed(3)} locked=${m.locked} armed=${m.armed} tear=${m.tearCharge.toFixed(2)}`,
          `deflection=${m.deflection.toFixed(1)} demo=${m.demoActive}`,
          `hit=${m.hit.filter(Boolean).length}/${ANCHORS.length}`,
        ];
        lines.forEach((l, i) => ctx.fillText(l, 8, 8 + i * 14));
      }
    }

    // ── 主循环（固定步长 + 渲染）────────────────────────────────────────────────
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const STEP = 1 / 60;
    function frame(now: number) {
      let dt = (now - last) / 1000;
      last = now;
      // fps
      m.fpsAcc += dt;
      m.fpsN += 1;
      if (m.fpsAcc >= 0.5) {
        m.fps = m.fpsN / m.fpsAcc;
        m.fpsAcc = 0;
        m.fpsN = 0;
      }
      dt = Math.min(0.1, dt);
      acc += dt;
      while (acc >= STEP) {
        if (m.freeze > 0) m.freeze -= 1; // G 急停
        else step(STEP);
        acc -= STEP;
      }
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx) draw(ctx);
      raf = requestAnimationFrame(frame);
    }

    // ── 指针 ────────────────────────────────────────────────────────────────
    function localXY(e: PointerEvent) {
      const rct = canvas!.getBoundingClientRect();
      return { x: e.clientX - rct.left, y: e.clientY - rct.top };
    }
    let dz = 0;
    function onDown(e: PointerEvent) {
      audio.ensure(); // 解锁音频
      if (m.state === "BROKEN") {
        return;
      }
      if (m.state === "TRAJECTORY") {
        if (m.trajT > 0.9) resetScreen(); // 轻触复测：曲线会变 → 你不是固定标签
        return;
      }
      const { x, y } = localXY(e);
      m.dragging = true;
      m.lastX = x;
      m.lastY = y;
      m.dragAxis = null;
      dz = 0;
      m.sink = 0;
      if (m.state === "IDLE") m.state = "ACTIVE";
    }
    function onMove(e: PointerEvent) {
      if (!m.dragging || m.state === "BROKEN") return;
      const { x, y } = localXY(e);
      const dx = x - m.lastX;
      const dy = y - m.lastY;
      m.lastX = x;
      m.lastY = y;
      // 死区 + 轴判定
      if (m.dragAxis === null) {
        dz += Math.abs(dx) + Math.abs(dy);
        if (dz < CFG.deadZone) return;
        m.dragAxis = Math.abs(dx) >= Math.abs(dy) ? "h" : "v";
      }
      if (m.dragAxis === "v") {
        // J 向下拖 → 沉降重置
        if (dy > 0) m.sink += dy;
        if (m.sink > CFG.sinkDist) {
          resetScreen();
          m.dragging = false;
        }
        return;
      }
      // H 横拖推进（含阻力随张力升）
      m.lastV = dx;
      const width = CFG.dragGainFrac * m.w;
      const resist = 1 + CFG.resistGrow * m.progress * m.progress;

      // 已武装（线绷到极限并锁死）：左右拖只调撕断充能，progress 恒为 1
      if (m.armed) {
        m.tearCharge = clamp(m.tearCharge + dx / CFG.tearTravel, 0, 1);
        if (m.tearCharge >= 1) {
          doBreak();
          return;
        }
        if (m.tearCharge <= 0) m.armed = false; // 完全回拉泄掉张力 → 解除武装，可继续当普通线推
        return;
      }

      const before = m.progress;
      const next = clamp(m.progress + dx / (width * resist), 0, 1);
      m.progress = next;
      m.progressEver = Math.max(m.progressEver, m.progress);
      // E 过档检测（穿过 detent 即"打结" + 反馈）
      CFG.detents.forEach((d, i) => {
        if (i === CFG.detents.length - 1) return; // 撕裂点不在此触发
        if (before < d && next >= d && i > m.locked) {
          m.locked = i;
          fireDetent(i);
        }
      });
      // 推到张力临界 → 武装：线锁死在极限(progress=1)，此后进入撕断充能
      if (next >= CFG.tearArm) {
        m.armed = true;
        m.progress = 1;
        if (m.locked < CFG.detents.length - 1) m.locked = CFG.detents.length - 1;
      }
    }
    function onUp() {
      m.dragging = false;
      m.dragAxis = null;
    }

    // 右上角双击切 debug
    let lastTap = 0;
    function onDbl(e: PointerEvent) {
      const { x, y } = localXY(e);
      if (x > m.w - 60 && y < 60) {
        const now = performance.now();
        if (now - lastTap < 350) m.debug = !m.debug;
        lastTap = now;
      }
    }

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerdown", onDbl);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerdown", onDbl);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <GyMobilePreviewFrame background="#000000">
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block", touchAction: "none" }} />
    </GyMobilePreviewFrame>
  );
}
