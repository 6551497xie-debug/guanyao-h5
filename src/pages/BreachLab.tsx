// ─────────────────────────────────────────────────────────────────────────────
// 观爻 2.0 ·「破口阵列 · 下刀」隔离原型 BREACH LAB —— /breach-lab
//
// 隔离原型：独立路由/文件；不碰主链路 / 引擎。
//
// 定盘（PVD-Charter 后三空间 + 用户视角宪法）：硅基军师在你的困局/生命线上扫出破口、
//   标出最该下刀处；你反本能切开那个破口 → 线在该点崩断、沙化 → 爻器从裂口升起。
//   线已转炽热原力冷金（后三空间）；破口 = 1px 线上的裂口（物理语义：断裂=破口）。
//
//   流程：VOID → SCAN(雷达扫描点亮破口阵列) → MARK(军师标出最优下刀点)
//        → CUT(按住·反本能切开最优破口，蓄力→崩断) → YAOQI(爻器从裂口激活升起) → 下一步(器法)
//
//   破口显影=系统扫描点亮（非用户瞎逼）；下刀=反本能切开（铁律3 物理崩断）。
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GyMobilePreviewFrame } from "../components/visual/GyMobilePreviewFrame";

const MONO = "SFMono-Regular, Menlo, Monaco, Consolas, monospace";
const SANS = "-apple-system, system-ui, sans-serif";

const CFG = {
  x0Frac: 0.1,
  x1Frac: 0.9,
  lineYFrac: 0.46,
  scanMs: 1.7,
  markMs: 1.0,
  cutTravel: 150, // 下刀蓄力行程(px)
  cutRelease: 1.8,
  voidMs: 0.4,
  gravity: 0.22,
  vyBase: 2.0,
  vyRand: 3.5,
  particleBudget: 360,
};

// 破口阵列（用户视角宪法的三类破口）。最后一个=最优下刀点。
const BREACHES = [
  { pos: 0.26, label: "旧反应起点", note: "你最早启动旧反应的位置" },
  { pos: 0.52, label: "受损 · 未认", note: "已受损、还不肯承认的位置" },
  { pos: 0.8, label: "可下刀", note: "你现在真正能下刀的位置", best: true },
];
const YAOQI = { name: "止动盾", line: "爻器已激活 · 反本能制动" };

const COLOR = {
  bg: "#000000",
  gold: "#C7A96B",
  goldDense: "#D4B777",
  white: "#F6F3EC",
  blue: "#00B8D4",
  bone: "#555555",
};

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
function lerpHex(a: string, b: string, t: number) {
  const k = clamp(t, 0, 1);
  const pa = [parseInt(a.slice(1, 3), 16), parseInt(a.slice(3, 5), 16), parseInt(a.slice(5, 7), 16)];
  const pb = [parseInt(b.slice(1, 3), 16), parseInt(b.slice(3, 5), 16), parseInt(b.slice(5, 7), 16)];
  const c = pa.map((v, i) => Math.round(v + ((pb[i] ?? v) - v) * k));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

type Particle = { x: number; y: number; vx: number; vy: number; alpha: number; active: boolean; color: string };

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
  function ping() {
    const c = ensure();
    if (!c) return;
    const t = c.currentTime;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(1400, t);
    o.frequency.exponentialRampToValueAtTime(900, t + 0.08);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.1, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
    o.connect(g).connect(c.destination);
    o.start(t);
    o.stop(t + 0.13);
  }
  function cut() {
    // 金属崩断脆响
    const c = ensure();
    if (!c) return;
    const t = c.currentTime;
    const buf = c.createBuffer(1, Math.floor(c.sampleRate * 0.18), c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2);
    const n = c.createBufferSource();
    n.buffer = buf;
    const bp = c.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 2600;
    const ng = c.createGain();
    ng.gain.setValueAtTime(0.5, t);
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
    n.connect(bp).connect(ng).connect(c.destination);
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(560, t);
    o.frequency.exponentialRampToValueAtTime(110, t + 0.15);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.3, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
    o.connect(g).connect(c.destination);
    n.start(t);
    o.start(t);
    o.stop(t + 0.18);
  }
  function activate() {
    const c = ensure();
    if (!c) return;
    [440, 660, 880].forEach((f, i) => {
      const t = c.currentTime + i * 0.05;
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(f, t);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.1, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
      o.connect(g).connect(c.destination);
      o.start(t);
      o.stop(t + 0.27);
    });
  }
  return { ensure, ping, cut, activate };
}

export function BreachLab() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const navigate = useNavigate();
  const navRef = useRef(navigate);
  navRef.current = navigate;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const audio = makeAudio();

    const bestIdx = BREACHES.findIndex((b) => b.best);
    const m = {
      w: 0,
      h: 0,
      x0: 0,
      x1: 0,
      ly: 0,
      state: "VOID" as "VOID" | "SCAN" | "MARK" | "CUT" | "BREAK" | "YAOQI",
      voidT: 0,
      pulsed: false,
      scanT: 0,
      pinged: BREACHES.map(() => false),
      markT: 0,
      cut: 0,
      dragging: false,
      lastX: 0,
      lastY: 0,
      dz: 0,
      breakT: 0,
      wob: 0,
      wobPh: 0,
      yaoqiT: 0,
      advanced: false,
      shake: 0,
      particles: [] as Particle[],
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
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      c.width = Math.max(1, Math.floor(rect.width * dpr));
      c.height = Math.max(1, Math.floor(rect.height * dpr));
      const ctx = c.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      m.w = rect.width;
      m.h = rect.height;
      m.x0 = rect.width * CFG.x0Frac;
      m.x1 = rect.width * CFG.x1Frac;
      m.ly = rect.height * CFG.lineYFrac;
    }
    function breachX(i: number) {
      const b = BREACHES[i];
      return m.x0 + (b ? b.pos : 0.5) * (m.x1 - m.x0);
    }

    function doBreak() {
      m.state = "BREAK";
      m.breakT = 0;
      m.wob = 16;
      m.wobPh = 0;
      m.shake = 16;
      audio.cut();
      vibrate([0, 40, 28, 60]);
      const bx = breachX(bestIdx);
      let pi = 0;
      for (let k = 0; k < 200; k++) {
        if (pi >= m.particles.length) break;
        const p = m.particles[pi++];
        if (!p) break;
        p.x = bx + (Math.random() - 0.5) * 30;
        p.y = m.ly + (Math.random() - 0.5) * 10;
        p.vx = (Math.random() - 0.5) * 60;
        p.vy = CFG.vyBase + Math.random() * CFG.vyRand;
        p.alpha = 0.8 + Math.random() * 0.2;
        p.color = Math.random() < 0.7 ? COLOR.gold : COLOR.goldDense;
        p.active = true;
      }
    }

    function step(dt: number) {
      if (m.shake > 0) m.shake = Math.max(0, m.shake - dt * 60);
      switch (m.state) {
        case "VOID": {
          m.voidT += dt;
          if (!m.pulsed && m.voidT > 0.16) {
            m.pulsed = true;
            vibrate([0, 14, 70, 20]);
          }
          if (m.voidT >= CFG.voidMs) {
            m.state = "SCAN";
            m.scanT = 0;
          }
          break;
        }
        case "SCAN": {
          m.scanT += dt;
          const sx = lerp(m.x0, m.x1, smooth(0, CFG.scanMs, m.scanT));
          BREACHES.forEach((b, i) => {
            if (!m.pinged[i] && sx >= breachX(i)) {
              m.pinged[i] = true;
              audio.ping();
              vibrate(8);
            }
          });
          if (m.scanT >= CFG.scanMs) {
            m.state = "MARK";
            m.markT = 0;
          }
          break;
        }
        case "MARK": {
          m.markT += dt;
          if (m.markT >= CFG.markMs) m.state = "CUT";
          break;
        }
        case "CUT": {
          if (!m.dragging && m.cut > 0 && m.cut < 1) m.cut = Math.max(0, m.cut - dt * CFG.cutRelease);
          break;
        }
        case "BREAK": {
          m.breakT += dt;
          if (m.wob > 0.3) {
            m.wobPh += dt * 40;
            m.wob *= 0.86;
          }
          if (m.breakT > 0.7) {
            m.state = "YAOQI";
            m.yaoqiT = 0;
            audio.activate();
            vibrate([0, 20, 30, 20]);
          }
          break;
        }
        case "YAOQI": {
          m.yaoqiT += dt;
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

    function draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      if (m.shake > 0.1) ctx.translate((Math.random() - 0.5) * m.shake, (Math.random() - 0.5) * m.shake);
      ctx.clearRect(-30, -30, m.w + 60, m.h + 60);
      ctx.fillStyle = COLOR.bg;
      ctx.fillRect(-30, -30, m.w + 60, m.h + 60);
      ctx.textBaseline = "alphabetic";
      const leftX = m.w * 0.1;

      // 原力冷金背光场
      const fg = ctx.createRadialGradient((m.w / 2), m.ly, 0, (m.w / 2), m.ly, Math.max(m.w, m.h) * 0.6);
      fg.addColorStop(0, "rgba(199,169,107,0.06)");
      fg.addColorStop(0.55, "rgba(199,169,107,0.015)");
      fg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = fg;
      ctx.fillRect(0, 0, m.w, m.h);

      if (m.state === "VOID") {
        const beat = Math.abs(Math.sin(m.voidT * 16));
        ctx.fillStyle = COLOR.gold;
        ctx.globalAlpha = 0.1 + 0.22 * beat;
        ctx.fillRect((m.w / 2) - 7, m.ly - 0.5, 14, 1);
        ctx.globalAlpha = 1;
        ctx.restore();
        return;
      }

      // 眉标
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(199,169,107,0.8)";
      ctx.font = `${Math.min(11, m.w * 0.028)}px ${MONO}`;
      ctx.fillText("04 ｜ 破口阵列 · 下刀", leftX, m.h * 0.1);

      const broken = m.state === "BREAK" || m.state === "YAOQI";

      // 原力生命线（冷金）。崩断后在最优破口断成两段、线头 sin 回弹。
      ctx.lineCap = "round";
      if (!broken) {
        ctx.strokeStyle = COLOR.gold;
        ctx.lineWidth = 1.6;
        ctx.shadowColor = "rgba(199,169,107,0.45)";
        ctx.shadowBlur = 6;
        // 整线，但在已亮破口处留缺口（被选中破口随下刀蓄力加宽）
        let segStart = m.x0;
        const gaps: { x: number; w: number }[] = [];
        BREACHES.forEach((b, i) => {
          if (!m.pinged[i]) return;
          const bx = breachX(i);
          const gw = (i === bestIdx ? 10 + m.cut * 26 : 8);
          gaps.push({ x: bx, w: gw });
        });
        gaps.sort((a, b) => a.x - b.x);
        gaps.forEach((g) => {
          ctx.beginPath();
          ctx.moveTo(segStart, m.ly);
          ctx.lineTo(g.x - g.w / 2, m.ly);
          ctx.stroke();
          segStart = g.x + g.w / 2;
        });
        ctx.beginPath();
        ctx.moveTo(segStart, m.ly);
        ctx.lineTo(m.x1, m.ly);
        ctx.stroke();
        ctx.shadowBlur = 0;
      } else {
        const w = m.wob * Math.sin(m.wobPh);
        const bx = breachX(bestIdx);
        ctx.strokeStyle = lerpHex(COLOR.goldDense, COLOR.bone, clamp(m.breakT, 0, 1));
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(m.x0, m.ly + w);
        ctx.lineTo(bx - 26, m.ly + w * 0.5);
        ctx.moveTo(m.x1, m.ly - w);
        ctx.lineTo(bx + 26, m.ly - w * 0.5);
        ctx.stroke();
      }

      // 扫描线
      if (m.state === "SCAN") {
        const sx = lerp(m.x0, m.x1, smooth(0, CFG.scanMs, m.scanT));
        ctx.strokeStyle = "rgba(0,184,212,0.7)";
        ctx.lineWidth = 1;
        ctx.shadowColor = "rgba(0,184,212,0.6)";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(sx, m.ly - 40);
        ctx.lineTo(sx, m.ly + 40);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // 破口标记（已亮的）
      if (!broken) {
        BREACHES.forEach((b, i) => {
          if (!m.pinged[i]) return;
          const bx = breachX(i);
          const best = i === bestIdx;
          const pulse = best && m.state !== "SCAN" ? 0.5 + 0.5 * Math.sin(performance.now() / 300) : 0;
          const col = best ? COLOR.goldDense : "rgba(199,169,107,0.6)";
          // 缺口两侧端头
          ctx.strokeStyle = col;
          ctx.lineWidth = best ? 1.6 : 1.2;
          ctx.shadowColor = best ? "rgba(212,183,119,0.6)" : "transparent";
          ctx.shadowBlur = best ? 6 + pulse * 8 : 0;
          const gw = best ? 10 + m.cut * 26 : 8;
          [-1, 1].forEach((s) => {
            ctx.beginPath();
            ctx.moveTo(bx + (s * gw) / 2, m.ly - 6);
            ctx.lineTo(bx + (s * gw) / 2, m.ly + 6);
            ctx.stroke();
          });
          ctx.shadowBlur = 0;
          // 标签
          ctx.fillStyle = best ? COLOR.goldDense : "rgba(246,243,236,0.55)";
          ctx.font = `${Math.min(12, m.w * 0.03)}px ${MONO}`;
          ctx.textAlign = "center";
          ctx.fillText(`［ ${b.label} ］`, bx, m.ly - 22);
          if (best && (m.state === "MARK" || m.state === "CUT")) {
            ctx.fillStyle = "rgba(212,183,119,0.9)";
            ctx.font = `${Math.min(11, m.w * 0.028)}px ${MONO}`;
            ctx.fillText("↓ 下刀", bx, m.ly + 30);
          }
        });
      }

      // 军师文案
      ctx.textAlign = "left";
      if (m.state === "SCAN") {
        ctx.fillStyle = "rgba(0,184,212,0.75)";
        ctx.font = `${Math.min(13, m.w * 0.033)}px ${MONO}`;
        ctx.fillText("红外扫描中 · 标定破口…", leftX, m.h * 0.82);
      } else if (m.state === "MARK" || m.state === "CUT") {
        const best = BREACHES[bestIdx];
        ctx.fillStyle = "rgba(246,243,236,0.8)";
        ctx.font = `${Math.min(15, m.w * 0.038)}px ${SANS}`;
        ctx.fillText(`本局 ${BREACHES.length} 处破口 · 此处最优`, leftX, m.h * 0.8);
        ctx.fillStyle = "rgba(246,243,236,0.5)";
        ctx.font = `${Math.min(13, m.w * 0.033)}px ${SANS}`;
        ctx.fillText(best ? best.note : "", leftX, m.h * 0.835);
        if (m.state === "CUT") {
          ctx.fillStyle = "rgba(212,183,119,0.85)";
          ctx.font = `${Math.min(12, m.w * 0.03)}px ${MONO}`;
          ctx.fillText(m.cut > 0.05 ? `下刀 · ${Math.round(m.cut * 100)}%` : "按住最优破口 · 反本能切开", leftX, m.h * 0.875);
        }
      } else if (m.state === "YAOQI") {
        const a = smooth(0, 0.5, m.yaoqiT);
        const bx = breachX(bestIdx);
        // 爻器从裂口升起
        const rise = smooth(0, 0.7, m.yaoqiT);
        const yy = lerp(m.ly, m.ly - 70, rise);
        ctx.globalAlpha = a;
        ctx.strokeStyle = COLOR.goldDense;
        ctx.lineWidth = 1.6;
        ctx.shadowColor = "rgba(212,183,119,0.6)";
        ctx.shadowBlur = 10;
        // 简易爻器印记（盾形几何）
        ctx.beginPath();
        ctx.moveTo(bx, yy - 16);
        ctx.lineTo(bx + 14, yy - 8);
        ctx.lineTo(bx + 14, yy + 8);
        ctx.lineTo(bx, yy + 18);
        ctx.lineTo(bx - 14, yy + 8);
        ctx.lineTo(bx - 14, yy - 8);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(bx - 7, yy);
        ctx.lineTo(bx + 7, yy);
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.textAlign = "center";
        ctx.fillStyle = COLOR.white;
        ctx.font = `600 ${Math.min(20, m.w * 0.05)}px ${SANS}`;
        ctx.fillText(`爻器 · ${YAOQI.name}`, (m.w / 2), m.h * 0.74);
        ctx.fillStyle = "rgba(212,183,119,0.85)";
        ctx.font = `${Math.min(13, m.w * 0.033)}px ${MONO}`;
        ctx.fillText(YAOQI.line, (m.w / 2), m.h * 0.785);
        if (m.yaoqiT > 1.2) {
          ctx.fillStyle = "rgba(199,169,107,0.7)";
          ctx.font = `${Math.min(12, m.w * 0.03)}px ${MONO}`;
          ctx.fillText("轻触 · 转译为器法", (m.w / 2), m.h * 0.84);
        }
        ctx.textAlign = "left";
        ctx.globalAlpha = 1;
      }

      // 粒子
      for (const p of m.particles) {
        if (!p.active) continue;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - 0.8, p.y - 0.8, 1.8, 1.8);
      }
      ctx.globalAlpha = 1;

      ctx.restore();

      if (m.debug) {
        ctx.fillStyle = "rgba(199,169,107,0.9)";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.font = `11px ${MONO}`;
        [`state=${m.state} fps=${m.fps.toFixed(0)}`, `cut=${m.cut.toFixed(2)}`].forEach((l, i) => ctx.fillText(l, 8, 8 + i * 14));
      }
    }
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const STEP = 1 / 60;
    function frame(t: number) {
      let dt = (t - last) / 1000;
      last = t;
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
        const t = performance.now();
        if (t - dbl < 350) m.debug = !m.debug;
        dbl = t;
      }
      if (m.state === "YAOQI") {
        if (m.yaoqiT > 1.0) navRef.current("/dynamics"); // 旧卦码占位隔离，回到新六维花冠主链路
        return;
      }
      if (m.state !== "CUT") return;
      m.dragging = true;
      m.lastX = x;
      m.lastY = y;
      m.dz = 0;
    }
    function onMove(e: PointerEvent) {
      if (!m.dragging || m.state !== "CUT") return;
      const { x, y } = localXY(e);
      const d = Math.abs(x - m.lastX) + Math.abs(y - m.lastY);
      m.lastX = x;
      m.lastY = y;
      m.dz += d;
      if (m.dz < 4) return;
      m.cut = clamp(m.cut + d / CFG.cutTravel, 0, 1);
      if (m.cut >= 0.97) {
        m.dragging = false;
        doBreak();
      }
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
