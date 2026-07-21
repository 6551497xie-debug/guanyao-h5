// ─────────────────────────────────────────────────────────────────────────────
// 观爻 2.0 ·「创世序幕」隔离原型 GENESIS LAB —— /genesis-lab
//
// 隔离原型：独立路由/文件；不碰生产 LaunchPage / 主链路 / 内容引擎 / X_MATRIX 真源。
//
// 定稿编排（00 创世 · 序幕版）：
//   VOID → 两仪(粗爻条:阳实/阴断, 会呼吸) → 撕断(B:触摸自撕 / 不碰呼吸数拍后自动撕)
//        → 碎成等宽斜短线、按比例收细、45° 拼成上下双 X(暖白 #FFEEF7)
//        → 停拍 → 英文字标紧贴 LOGO 下方成一体(GUANYAO/SANDBOX)
//        → 老打字机·慢节奏·逐字硬出·入口命题与辅助语义
//        → 末行「进入观爻」盖章压印到最下边 → 停顿 → 沙化进入下一页
//
// 无一字轴落位（沙化即切镜；一线贯穿由沙化粒子守恒承接）。可点击跳过。
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GyMobilePreviewFrame } from "../components/visual/GyMobilePreviewFrame";

const MONO = "SFMono-Regular, Menlo, Monaco, Consolas, monospace";
const SANS = "-apple-system, system-ui, sans-serif";

const CFG = {
  logoCYFrac: 0.3, // 双 X / 两仪 中心
  logoScaleXFrac: 0.13, // LOGO 横向尺度 ×w（方框等比）
  logoScaleYFrac: 0.13, // LOGO 纵向尺度 ×w
  barLenFrac: 0.42, // 爻条长 ×w
  barGapV: 15, // 两爻竖直间距(px)
  yinGapFrac: 0.055, // 阴爻断口 ×w
  barThick: 13, // 入场爻条厚度(小宽线)
  logoThick: 5.2, // 成 LOGO 后斜短线厚度（同比例变细，等宽粗杠）
  // 两仪 / 撕断（B）
  breathePeriod: 3.0,
  autoTearDelay: 3.0,
  autoTearRamp: 0.6,
  tearTravel: 130,
  // 折叠 / 停拍
  foldDur: 1.2,
  holdDur: 0.8,
  // 老打字机（更慢、机械）
  charInterval: 0.19, // s/字（再放慢）
  linePause: 0.6, // 段间停顿
  stampDur: 0.26, // 盖章压下时长
  stampHold: 2.9, // 盖完定格停顿（再沙化）
  // 沙化
  gravity: 0.22,
  vyBase: 2.0,
  vyRand: 3.5,
  particleBudget: 360,
  tearShake: 13,
  stampShake: 12,
  voidMs: 0.45,
};

const COLOR = {
  bg: "#000000",
  primary: "#FFEEF7",
  accent: "#00B8D4",
  blue: "#00B8D4",
};

const ENTRANCE_COPY = Object.freeze({
  main: "你来到世界时，已经带着自己的生命坐标。",
  supporting: "先看见它从哪里来，再看见现实如何作用于你。",
  cta: "进入观爻",
});

function clamp(v: number, a: number, b: number) {
  return Math.min(Math.max(v, a), b);
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function smooth(e0: number, e1: number, x: number) {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
}

type Pt = { x: number; y: number };
type Seg = { ax: number; ay: number; bx: number; by: number };
type Particle = { x: number; y: number; vx: number; vy: number; alpha: number; active: boolean; color: string };
type Line = {
  text: string;
  y: number;
  font: string;
  color: string;
  mode: "type" | "stamp";
  startAt: number;
  dur: number;
  track?: number;
  alignRight?: boolean; // 右对齐到参照文本的右缘
  refText?: string;
  refFont?: string;
  refTrack?: number;
};

// LOGO：上 X + 下 ∧ 交叠（品牌「解构爻」，单位方框 [-0.95,0.95]²）。
//   上 X：两斜杠到顶部两角、交叉于上中、下臂伸至中部（阳爻条而来，每杠虚断 4 段 → 8）。
//   下 ∧：尖顶插入 X 下部、两腿展至底部两角（阴爻两半而来，每腿虚断 3 段 → 6）。共 14 段。
function buildLogoUnit(): [Pt, Pt][] {
  const out: [Pt, Pt][] = [];
  const g = 0.07; // 段间断口
  const dash = (p0: Pt, p1: Pt, parts: number) => {
    for (let k = 0; k < parts; k++) {
      const ta = k / parts + g / parts;
      const tb = (k + 1) / parts - g / parts;
      out.push([
        { x: lerp(p0.x, p1.x, ta), y: lerp(p0.y, p1.y, ta) },
        { x: lerp(p0.x, p1.x, tb), y: lerp(p0.y, p1.y, tb) },
      ] as [Pt, Pt]);
    }
  };
  // 全部严格 ±45°，四根杠互相平行。上 X 与下 ∧ 之间留出间隙分开。
  // 上 X：顶角 (∓0.8,-0.95) 交叉于上中，下臂短（到 ±0.25,0.10）。Δx=Δy → 45°。
  dash({ x: -0.8, y: -0.95 }, { x: 0.25, y: 0.1 }, 4);
  dash({ x: 0.8, y: -0.95 }, { x: -0.25, y: 0.1 }, 4);
  // 下 ∧：尖顶 (0,0.15) 与上 X 下臂(0.10)只留 0.05 间隙（更整体）→ 两腿 ±45° 展到 (±0.8,0.95)
  const apex: Pt = { x: 0, y: 0.15 };
  dash(apex, { x: -0.8, y: 0.95 }, 3);
  dash(apex, { x: 0.8, y: 0.95 }, 3);
  return out; // 14
}
const LOGO_UNIT = buildLogoUnit();

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
  function tear() {
    const c = ensure();
    if (!c) return;
    const t = c.currentTime;
    const buf = c.createBuffer(1, Math.floor(c.sampleRate * 0.16), c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 1.8);
    const n = c.createBufferSource();
    n.buffer = buf;
    const bp = c.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 2400;
    bp.Q.value = 0.7;
    const ng = c.createGain();
    ng.gain.setValueAtTime(0.42, t);
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
    n.connect(bp).connect(ng).connect(c.destination);
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(520, t);
    o.frequency.exponentialRampToValueAtTime(120, t + 0.14);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.26, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);
    o.connect(g).connect(c.destination);
    n.start(t);
    o.start(t);
    o.stop(t + 0.16);
  }
  function tick() {
    // 老打字机敲键：硬、短、带一点机械木感
    const c = ensure();
    if (!c) return;
    const t = c.currentTime;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "square";
    o.frequency.setValueAtTime(1400, t);
    o.frequency.exponentialRampToValueAtTime(900, t + 0.02);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.07, t + 0.002);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);
    o.connect(g).connect(c.destination);
    o.start(t);
    o.stop(t + 0.04);
  }
  function stamp() {
    // 盖章压印：低频砰 + 噪声击
    const c = ensure();
    if (!c) return;
    const t = c.currentTime;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(150, t);
    o.frequency.exponentialRampToValueAtTime(48, t + 0.16);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.34, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
    o.connect(g).connect(c.destination);
    const buf = c.createBuffer(1, Math.floor(c.sampleRate * 0.05), c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2.5);
    const n = c.createBufferSource();
    n.buffer = buf;
    const lp = c.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 1400;
    const ng = c.createGain();
    ng.gain.setValueAtTime(0.3, t);
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    n.connect(lp).connect(ng).connect(c.destination);
    o.start(t);
    o.stop(t + 0.21);
    n.start(t);
  }
  return { ensure, tear, tick, stamp };
}

export function GenesisLab({ onComplete, mode = "full" }: { onComplete?: () => void; mode?: "full" | "threshold" }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const navigate = useNavigate();
  const navRef = useRef(navigate);
  navRef.current = navigate;
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const audio = makeAudio();

    const m = {
      w: 0,
      h: 0,
      cx: 0,
      logoCY: 0,
      scaleX: 0,
      scaleY: 0,
      state: (mode === "threshold" ? "PRESENT" : "VOID") as "VOID" | "TWO" | "FOLD" | "HOLD" | "TYPE" | "SANDIFY" | "PRESENT",
      presentT: 0,
      voidT: 0,
      pulsed: false,
      twoT: 0,
      pull: 0,
      touched: false,
      dragging: false,
      lastX: 0,
      dz: 0,
      foldT: 0,
      holdT: 0,
      typeT: 0,
      typedShown: 0,
      stampFired: false,
      sandT: 0,
      advanced: false,
      srcSeg: [] as Seg[],
      dstSeg: [] as Seg[],
      shake: 0,
      particles: [] as Particle[],
      debug: false,
      fps: 0,
      fpsAcc: 0,
      fpsN: 0,
    };
    for (let i = 0; i < CFG.particleBudget; i++) m.particles.push({ x: 0, y: 0, vx: 0, vy: 0, alpha: 0, active: false, color: COLOR.primary });

    const lines: Line[] = [];
    function buildLines() {
      lines.length = 0;
      const logoBottom = m.logoCY + 0.95 * m.scaleY;
      const wmY = logoBottom + Math.min(34, m.w * 0.085); // 英文紧贴 LOGO 成一体
      const sbY = wmY + Math.min(22, m.w * 0.056);
      const wmSize = Math.min(30, m.w * 0.072);
      const wmFont = `600 ${wmSize}px ${SANS}`;
      const wmTrack = Math.max(5, wmSize * 0.22);
      const sbSize = Math.min(13, m.w * 0.032);
      const defs: Omit<Line, "startAt" | "dur">[] = [
        // 字标：白 GUANYAO 居中（宽追踪几何）；蓝 SANDBOX 右对齐到 GUANYAO 右缘
        { text: "GUANYAO", y: wmY, font: wmFont, color: COLOR.primary, mode: "type", track: wmTrack },
        { text: "SANDBOX", y: sbY, font: `${sbSize}px ${MONO}`, color: COLOR.accent, mode: "type", track: Math.max(3, sbSize * 0.35), alignRight: true, refText: "GUANYAO", refFont: wmFont, refTrack: wmTrack },
        { text: ENTRANCE_COPY.main, y: m.h * 0.59, font: `${Math.min(16, m.w * 0.04)}px ${SANS}`, color: COLOR.primary, mode: "type" },
        { text: ENTRANCE_COPY.supporting, y: m.h * 0.69, font: `${Math.min(16, m.w * 0.04)}px ${SANS}`, color: COLOR.primary, mode: "type" },
        // 末行入口邀请盖章压印（压在最下）
        { text: ENTRANCE_COPY.cta, y: m.h * 0.88, font: `${Math.min(14, m.w * 0.035)}px ${MONO}`, color: COLOR.primary, mode: "stamp" },
      ];
      let t = 0;
      for (const d of defs) {
        const dur = d.mode === "type" ? d.text.length * CFG.charInterval : CFG.stampDur;
        lines.push({ ...d, startAt: t, dur });
        t += dur + CFG.linePause;
      }
    }
    const typeEnd = () => {
      const last = lines[lines.length - 1];
      return last ? last.startAt + last.dur : 0;
    };

    function vibrate(p: number | number[]) {
      if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") navigator.vibrate(p);
    }

    function resize() {
      const c = canvasRef.current;
      if (!c) return;
      const rect = c.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      c.width = Math.max(1, Math.floor(rect.width * dpr));
      c.height = Math.max(1, Math.floor(rect.height * dpr));
      const ctx = c.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      m.w = rect.width;
      m.h = rect.height;
      m.cx = rect.width / 2;
      m.logoCY = rect.height * CFG.logoCYFrac;
      m.scaleX = rect.width * CFG.logoScaleXFrac;
      m.scaleY = rect.width * CFG.logoScaleYFrac;
      // 门厅模式：LOGO 已成形，直接备好终态段位
      if (mode === "threshold") {
        m.dstSeg = LOGO_UNIT.map(([p0, p1]) => ({
          ax: m.cx + p0.x * m.scaleX,
          ay: m.logoCY + p0.y * m.scaleY,
          bx: m.cx + p1.x * m.scaleX,
          by: m.logoCY + p1.y * m.scaleY,
        }));
      }
      buildLines();
    }

    function reset() {
      m.state = "VOID";
      m.voidT = 0;
      m.pulsed = false;
      m.twoT = 0;
      m.pull = 0;
      m.touched = false;
      m.dragging = false;
      m.foldT = 0;
      m.holdT = 0;
      m.typeT = 0;
      m.typedShown = 0;
      m.stampFired = false;
      m.sandT = 0;
      m.advanced = false;
      m.shake = 0;
      m.particles.forEach((p) => (p.active = false));
    }

    function barGeom() {
      const half = (m.w * CFG.barLenFrac) / 2;
      const yGap = CFG.yinGapFrac * m.w;
      return { yangY: m.logoCY - CFG.barGapV, yinY: m.logoCY + CFG.barGapV, x0: m.cx - half, x1: m.cx + half, yinGapHalf: yGap / 2 };
    }

    function sliceBar(ax: number, ay: number, bx: number, by: number, n: number): Seg[] {
      const out: Seg[] = [];
      for (let k = 0; k < n; k++) {
        out.push({
          ax: lerp(ax, bx, k / n),
          ay: lerp(ay, by, k / n),
          bx: lerp(ax, bx, (k + 1) / n),
          by: lerp(ay, by, (k + 1) / n),
        });
      }
      return out;
    }

    function beginFold() {
      const g = barGeom();
      const yinGapHalf = g.yinGapHalf * (1 + m.pull * 1.6);
      // 阳条 → 上 X(8 段)；阴左/右两半 → ∧ 两腿(各 3 段)。共 14，对齐 LOGO_UNIT。
      m.srcSeg = [
        ...sliceBar(g.x0, g.yangY, g.x1, g.yangY, 8),
        ...sliceBar(g.x0, g.yinY, m.cx - yinGapHalf, g.yinY, 3),
        ...sliceBar(m.cx + yinGapHalf, g.yinY, g.x1, g.yinY, 3),
      ];
      m.dstSeg = LOGO_UNIT.map(([p0, p1]) => ({
        ax: m.cx + p0.x * m.scaleX,
        ay: m.logoCY + p0.y * m.scaleY,
        bx: m.cx + p1.x * m.scaleX,
        by: m.logoCY + p1.y * m.scaleY,
      }));
      m.state = "FOLD";
      m.foldT = 0;
      m.shake = CFG.tearShake;
      audio.tear();
      vibrate([0, 30, 22, 48]);
    }

    function startSandify() {
      m.state = "SANDIFY";
      m.sandT = 0;
      m.shake = Math.max(m.shake, 8);
      let pi = 0;
      const push = (x: number, y: number) => {
        if (pi >= m.particles.length) return;
        const p = m.particles[pi++];
        if (!p) return;
        p.x = x;
        p.y = y;
        p.vx = (Math.random() - 0.5) * 1.1;
        p.vy = CFG.vyBase + Math.random() * CFG.vyRand;
        p.alpha = 0.7 + Math.random() * 0.3;
        p.color = Math.random() < 0.7 ? COLOR.primary : COLOR.accent;
        p.active = true;
      };
      m.dstSeg.forEach((s) => {
        for (let k = 0; k < 12; k++) push(lerp(s.ax, s.bx, k / 12), lerp(s.ay, s.by, k / 12));
      });
      lines.forEach((l) => {
        if (!l.text) return;
        const w = Math.min(m.w * 0.8, l.text.length * 16);
        for (let k = 0; k < 14; k++) push(m.cx - w / 2 + (k / 14) * w, l.y);
      });
    }

    function step(dt: number) {
      if (m.shake > 0) m.shake = Math.max(0, m.shake - dt * 60);
      switch (m.state) {
        case "PRESENT": {
          // 短门厅：LOGO 已生，只显影 + 一口呼吸 + 署名，~1.9s 后交接续写
          m.presentT += dt;
          if (!m.pulsed && m.presentT > 0.12) {
            m.pulsed = true;
            vibrate([0, 16, 60]);
          }
          if (!m.advanced && m.presentT > 1.9) {
            m.advanced = true;
            if (onCompleteRef.current) onCompleteRef.current();
            else navRef.current("/return-lab");
          }
          break;
        }
        case "VOID": {
          m.voidT += dt;
          if (!m.pulsed && m.voidT > 0.16) {
            m.pulsed = true;
            vibrate([0, 16, 80, 22]);
          }
          if (m.voidT >= CFG.voidMs) m.state = "TWO";
          break;
        }
        case "TWO": {
          m.twoT += dt;
          if (!m.touched && m.twoT > CFG.autoTearDelay) m.pull = Math.min(1, m.pull + dt / CFG.autoTearRamp);
          if (m.pull >= 1) beginFold();
          break;
        }
        case "FOLD": {
          m.foldT = Math.min(1, m.foldT + dt / CFG.foldDur);
          if (m.foldT >= 1) {
            m.state = "HOLD";
            m.holdT = 0;
          }
          break;
        }
        case "HOLD": {
          m.holdT += dt;
          if (m.holdT >= CFG.holdDur) {
            m.state = "TYPE";
            m.typeT = 0;
            m.typedShown = 0;
            m.stampFired = false;
          }
          break;
        }
        case "TYPE": {
          m.typeT += dt;
          // 敲键声：统计已显字增量
          let shown = 0;
          for (const l of lines) if (l.mode === "type") shown += clamp(Math.floor((m.typeT - l.startAt) / CFG.charInterval), 0, l.text.length);
          if (shown > m.typedShown) {
            m.typedShown = shown;
            audio.tick();
          }
          // 末行盖章压印
          const sl = lines.find((l) => l.mode === "stamp");
          if (sl && !m.stampFired && m.typeT >= sl.startAt) {
            m.stampFired = true;
            audio.stamp();
            m.shake = Math.max(m.shake, CFG.stampShake);
            vibrate([0, 42, 28, 44]);
          }
          if (m.typeT > typeEnd() + CFG.stampHold) startSandify();
          break;
        }
        case "SANDIFY": {
          m.sandT += dt;
          if (!m.advanced && m.sandT > 1.0) {
            m.advanced = true;
            // 生产：序幕完成 → 交给上层(进母码生成流程)；lab：自跳第二屏
            if (onCompleteRef.current) onCompleteRef.current();
            else navRef.current("/chrono-lab");
          }
          break;
        }
      }
      for (const p of m.particles) {
        if (!p.active) continue;
        p.vy += CFG.gravity * (dt * 60);
        p.x += p.vx * (dt * 60);
        p.y += p.vy * (dt * 60);
        p.alpha -= dt * 0.5;
        if (p.alpha <= 0 || p.y > m.h + 20) p.active = false;
      }
    }

    function thickBar(ctx: CanvasRenderingContext2D, ax: number, ay: number, bx: number, by: number, thick: number) {
      const dx = bx - ax;
      const dy = by - ay;
      const len = Math.hypot(dx, dy) || 1;
      const nx = (-dy / len) * (thick / 2);
      const ny = (dx / len) * (thick / 2);
      ctx.beginPath();
      ctx.moveTo(ax + nx, ay + ny);
      ctx.lineTo(bx + nx, by + ny);
      ctx.lineTo(bx - nx, by - ny);
      ctx.lineTo(ax - nx, ay - ny);
      ctx.closePath();
      ctx.fill();
    }

    function draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      if (m.shake > 0.1) ctx.translate((Math.random() - 0.5) * m.shake, (Math.random() - 0.5) * m.shake);
      ctx.clearRect(-30, -30, m.w + 60, m.h + 60);
      ctx.fillStyle = COLOR.bg;
      ctx.fillRect(-30, -30, m.w + 60, m.h + 60);

      const breathe = 0.5 + 0.5 * Math.sin((performance.now() / 1000 / CFG.breathePeriod) * Math.PI * 2);
      const r = Math.max(m.w, m.h) * 0.6;
      const fg = ctx.createRadialGradient(m.cx, m.logoCY, 0, m.cx, m.logoCY, r);
      fg.addColorStop(0, `rgba(0,184,212,${(0.05 + breathe * 0.03).toFixed(3)})`);
      fg.addColorStop(0.55, "rgba(0,184,212,0.015)");
      fg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = fg;
      ctx.fillRect(0, 0, m.w, m.h);

      if (m.state === "VOID") {
        const beat = Math.abs(Math.sin(m.voidT * 16));
        ctx.fillStyle = COLOR.blue;
        ctx.globalAlpha = 0.1 + 0.22 * beat;
        ctx.fillRect(m.cx - 7, m.logoCY - 0.5, 14, 1);
        ctx.globalAlpha = 1;
        ctx.restore();
        return;
      }

      // 短门厅：已成形的双 X LOGO 显影 + 呼吸 + 字标（不撕、不打字、不沙化）
      if (m.state === "PRESENT") {
        const appear = smooth(0, 0.7, m.presentT);
        const breath = 1 + 0.012 * Math.sin((performance.now() / 1000 / 2.4) * Math.PI * 2);
        ctx.globalAlpha = appear;
        ctx.fillStyle = COLOR.primary;
        ctx.shadowColor = "rgba(255,238,247,0.3)";
        ctx.shadowBlur = 6;
        m.dstSeg.forEach((s) => {
          thickBar(ctx, m.cx + (s.ax - m.cx) * breath, m.logoCY + (s.ay - m.logoCY) * breath, m.cx + (s.bx - m.cx) * breath, m.logoCY + (s.by - m.logoCY) * breath, CFG.logoThick);
        });
        ctx.shadowBlur = 0;
        // 字标（淡入，不打字）
        const wmAppear = smooth(0.5, 1.4, m.presentT);
        if (wmAppear > 0.01) {
          ctx.globalAlpha = wmAppear;
          [lines[0], lines[1]].forEach((l) => {
            if (!l) return;
            ctx.fillStyle = l.color;
            ctx.font = l.font;
            (ctx as unknown as { letterSpacing: string }).letterSpacing = l.track ? `${l.track}px` : "0px";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            if (l.alignRight && l.refText && l.refFont) {
              ctx.font = l.refFont;
              (ctx as unknown as { letterSpacing: string }).letterSpacing = `${l.refTrack ?? 0}px`;
              const gw = ctx.measureText(l.refText).width;
              ctx.font = l.font;
              (ctx as unknown as { letterSpacing: string }).letterSpacing = l.track ? `${l.track}px` : "0px";
              ctx.textAlign = "right";
              ctx.fillText(l.text, m.cx + gw / 2, l.y);
              ctx.textAlign = "center";
            } else {
              ctx.fillText(l.text, m.cx, l.y);
            }
          });
          (ctx as unknown as { letterSpacing: string }).letterSpacing = "0px";
        }
        ctx.globalAlpha = 1;
        ctx.restore();
        return;
      }

      if (m.state === "TWO") {
        const g = barGeom();
        const grow = 1 + 0.02 * (breathe - 0.5) * 2;
        const half = ((g.x1 - g.x0) / 2) * grow;
        const gapH = g.yinGapHalf * (1 + breathe * 0.18 + m.pull * 1.6);
        const heat = m.pull;
        ctx.fillStyle = COLOR.primary;
        ctx.shadowColor = `rgba(0,184,212,${(0.3 + heat * 0.4).toFixed(2)})`;
        ctx.shadowBlur = 8 + heat * 12;
        thickBar(ctx, m.cx - half, g.yangY, m.cx + half, g.yangY, CFG.barThick);
        thickBar(ctx, m.cx - half, g.yinY, m.cx - gapH, g.yinY, CFG.barThick);
        thickBar(ctx, m.cx + gapH, g.yinY, m.cx + half, g.yinY, CFG.barThick);
        ctx.shadowBlur = 0;
        ctx.restore();
        return;
      }

      // 双 X LOGO
      if (m.state === "FOLD") {
        ctx.fillStyle = COLOR.primary;
        ctx.shadowColor = "rgba(255,238,247,0.35)";
        for (let i = 0; i < m.dstSeg.length; i++) {
          const s0 = m.srcSeg[i];
          const s1 = m.dstSeg[i];
          if (!s0 || !s1) continue;
          const e = smooth(i * 0.015, i * 0.015 + 0.75, m.foldT);
          const thick = lerp(CFG.barThick, CFG.logoThick, e);
          ctx.shadowBlur = 3 + e * 6;
          thickBar(ctx, lerp(s0.ax, s1.ax, e), lerp(s0.ay, s1.ay, e), lerp(s0.bx, s1.bx, e), lerp(s0.by, s1.by, e), thick);
        }
        ctx.shadowBlur = 0;
      } else if (m.state === "HOLD" || m.state === "TYPE") {
        ctx.fillStyle = COLOR.primary;
        ctx.shadowColor = "rgba(255,238,247,0.3)";
        ctx.shadowBlur = 6;
        m.dstSeg.forEach((s) => thickBar(ctx, s.ax, s.ay, s.bx, s.by, CFG.logoThick));
        ctx.shadowBlur = 0;
      }

      // 打字机文本（逐字硬出；末行盖章压印）
      if (m.state === "TYPE") {
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        for (const l of lines) {
          if (m.typeT < l.startAt) continue;
          ctx.fillStyle = l.color;
          ctx.font = l.font;
          (ctx as unknown as { letterSpacing: string }).letterSpacing = l.track ? `${l.track}px` : "0px";
          if (l.mode === "type") {
            const n = clamp(Math.floor((m.typeT - l.startAt) / CFG.charInterval), 0, l.text.length);
            const shown = l.text.slice(0, n);
            if (shown) {
              if (l.alignRight && l.refText && l.refFont) {
                // 量 GUANYAO 宽 → 右缘；SANDBOX 右对齐到此
                ctx.font = l.refFont;
                (ctx as unknown as { letterSpacing: string }).letterSpacing = `${l.refTrack ?? 0}px`;
                const gw = ctx.measureText(l.refText).width;
                const rightX = m.cx + gw / 2;
                ctx.font = l.font;
                (ctx as unknown as { letterSpacing: string }).letterSpacing = l.track ? `${l.track}px` : "0px";
                ctx.textAlign = "right";
                ctx.fillText(shown, rightX, l.y);
                ctx.textAlign = "center";
              } else {
                ctx.fillText(shown, m.cx, l.y);
              }
            }
          } else {
            const st = m.typeT - l.startAt;
            const sc = 1 + Math.max(0, 1 - st / CFG.stampDur) * 0.5; // 压下：大 → 落定
            ctx.save();
            ctx.translate(m.cx, l.y);
            ctx.scale(sc, sc);
            ctx.fillText(l.text, 0, 0);
            ctx.restore();
          }
        }
        (ctx as unknown as { letterSpacing: string }).letterSpacing = "0px";
      }

      for (const p of m.particles) {
        if (!p.active) continue;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - 0.8, p.y - 0.8, 1.8, 1.8);
      }
      ctx.globalAlpha = 1;

      ctx.restore();

      if (m.debug) {
        ctx.fillStyle = "rgba(0,184,212,0.9)";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.font = `11px ${MONO}`;
        [`state=${m.state} fps=${m.fps.toFixed(0)}`, `pull=${m.pull.toFixed(2)} fold=${m.foldT.toFixed(2)} typeT=${m.typeT.toFixed(2)}`].forEach((l, i) =>
          ctx.fillText(l, 8, 8 + i * 14),
        );
      }
    }

    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const STEP = 1 / 60;
    function frame(now: number) {
      let dt = (now - last) / 1000;
      last = now;
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
        step(STEP);
        acc -= STEP;
      }
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx) draw(ctx);
      raf = requestAnimationFrame(frame);
    }

    function localXY(e: PointerEvent) {
      const r = canvas!.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }
    let dbl = 0;
    function onDown(e: PointerEvent) {
      audio.ensure();
      const { x, y } = localXY(e);
      if (x > m.w - 60 && y < 60) {
        const now = performance.now();
        if (now - dbl < 350) m.debug = !m.debug;
        dbl = now;
      }
      if (m.state === "TYPE") {
        // 跳过：直接推进到末行盖章
        const sl = lines.find((l) => l.mode === "stamp");
        if (sl) m.typeT = Math.max(m.typeT, sl.startAt);
        return;
      }
      if (m.state === "SANDIFY") return;
      if (m.state === "TWO") {
        m.touched = true;
        m.dragging = true;
        m.lastX = x;
        m.dz = 0;
      }
    }
    function onMove(e: PointerEvent) {
      if (!m.dragging || m.state !== "TWO") return;
      const { x } = localXY(e);
      const dx = x - m.lastX;
      m.lastX = x;
      m.dz += Math.abs(dx);
      if (m.dz < 3) return;
      m.pull = clamp(m.pull + Math.abs(dx) / CFG.tearTravel, 0, 1);
    }
    function onUp() {
      m.dragging = false;
    }

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onDown);
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
