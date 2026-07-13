// ─────────────────────────────────────────────────────────────────────────────
// 观爻 2.0 ·「母码屏 · 认领母码卡」隔离原型 MOTHER LAB —— /mother-lab
//
// 隔离原型：独立路由/文件；不碰主链路 / 引擎。
//
// 定盘：母码卡 = 收藏级 IP 资产（纯原型）。本屏 = 把它当英雄物件「认领」出来。
//   卡只放原型：正面 卦符/原型主视觉(美术插件工业化生成→此处留几何插槽)、背面 卦义铭牌。
//   卡上禁放：默认反应链/底色/压力结果 → 这些是「屏级读数」，放在卡外（符合卡生产规范）。
//
//   流程：VOID → READ(屏级读数:你的底色 + 默认反应链, 从线压印) → CARD(卡显影·正面;轻触翻面看背面)
//        → 右滑「封存母码」→ 沙化交接下游(压力种子)。
//
//   卡=金(IP 资产)，仪器铬=蓝(链路一致)。美术插槽 = 中央几何主视觉的占位（震卦转译），上线时替换为生成图。
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { drawEntryCardRenderer, getEntryCardRendererRect } from "../components/entry/EntryCardRenderer";
import { GyMobilePreviewFrame } from "../components/visual/GyMobilePreviewFrame";
import { createMotherCardReadonlySnapshot } from "../services/guanyaoPersonaSnapshotCache";

const MONO = "SFMono-Regular, Menlo, Monaco, Consolas, monospace";
const SANS = "-apple-system, system-ui, sans-serif";

const CFG = {
  cardTopFrac: 0.26,
  cardWFrac: 0.72,
  cardWMax: 320,
  cardAspect: 0.64, // w/h
  readMs: 2.2,
  flipDur: 0.5,
  swipeTravelFrac: 0.5,
  voidMs: 0.4,
  gravity: 0.22,
  vyBase: 2.0,
  vyRand: 3.5,
  particleBudget: 200,
};

const COLOR = {
  bg: "#060604",
  gold: "#c2a05a",
  brightGold: "#e6cf95",
  dimGold: "#6e5a30",
  frame: "#8a6f3e",
  white: "#f6f3ec",
  off: "#bdb39b",
  blue: "#00B8D4",
  bone: "#555555",
};

function clamp(v: number, a: number, b: number) {
  return Math.min(Math.max(v, a), b);
}
function smooth(e0: number, e1: number, x: number) {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
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
  function blip(freq: number, dur: number, gain: number, type: OscillatorType = "triangle") {
    const c = ensure();
    if (!c) return;
    const t = c.currentTime;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(c.destination);
    o.start(t);
    o.stop(t + dur + 0.02);
  }
  function flip() {
    blip(520, 0.05, 0.12, "triangle");
  }
  function seal() {
    blip(150, 0.18, 0.3, "sine");
    blip(900, 0.05, 0.14, "square");
  }
  return { ensure, flip, seal };
}

export function MotherLab() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const navigate = useNavigate();
  const navRef = useRef(navigate);
  navRef.current = navigate;
  const snapshotRef = useRef(createMotherCardReadonlySnapshot("CACHE_PENDING"));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const audio = makeAudio();
    const snapshot = snapshotRef.current;
    const readout = {
      base: `四象｜${snapshot.fourSymbol}`,
      chain: `星源｜${snapshot.starOrigin}`,
    };

    const m = {
      w: 0,
      h: 0,
      cx: 0,
      state: "VOID" as "VOID" | "READ" | "CARD" | "SANDIFY",
      voidT: 0,
      pulsed: false,
      readT: 0,
      cardT: 0,
      side: "front" as "front" | "back",
      flipT: CFG.flipDur,
      flipTo: "front" as "front" | "back",
      swipe: 0,
      dragging: false,
      lastX: 0,
      dz: 0,
      sandT: 0,
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
      m.cx = rect.width / 2;
    }

    function cardRect() {
      return getEntryCardRendererRect(m.w, m.h);
    }
    function railY() {
      return m.h * 0.9;
    }

    function startSandify() {
      m.state = "SANDIFY";
      m.sandT = 0;
      audio.seal();
      vibrate([0, 36, 24, 48]);
      m.shake = 12;
      const r = cardRect();
      let pi = 0;
      for (let i = 0; i < 180; i++) {
        if (pi >= m.particles.length) break;
        const p = m.particles[pi++];
        if (!p) break;
        p.x = r.x + Math.random() * r.w;
        p.y = r.y + Math.random() * r.h;
        p.vx = (Math.random() - 0.5) * 20;
        p.vy = CFG.vyBase + Math.random() * CFG.vyRand;
        p.alpha = 0.75 + Math.random() * 0.25;
        p.color = Math.random() < 0.7 ? COLOR.gold : COLOR.brightGold;
        p.active = true;
      }
    }

    function step(dt: number) {
      if (m.shake > 0) m.shake = Math.max(0, m.shake - dt * 60);
      if (m.flipT < CFG.flipDur) {
        const prev = m.flipT;
        m.flipT = Math.min(CFG.flipDur, m.flipT + dt);
        if (prev < CFG.flipDur / 2 && m.flipT >= CFG.flipDur / 2) m.side = m.flipTo;
      }
      switch (m.state) {
        case "VOID": {
          m.voidT += dt;
          if (!m.pulsed && m.voidT > 0.16) {
            m.pulsed = true;
            vibrate([0, 16, 70, 22]);
          }
          if (m.voidT >= CFG.voidMs) {
            m.state = "READ";
            m.readT = 0;
          }
          break;
        }
        case "READ": {
          m.readT += dt;
          if (m.readT >= CFG.readMs) {
            m.state = "CARD";
            m.cardT = 0;
          }
          break;
        }
        case "CARD": {
          m.cardT += dt;
          if (!m.dragging && m.swipe < 0.97) m.swipe += (0 - m.swipe) * Math.min(1, dt * 8);
          break;
        }
        case "SANDIFY": {
          m.sandT += dt;
          if (!m.advanced && m.sandT > 0.9) {
            m.advanced = true;
            navRef.current("/dynamics"); // 封存母码 → 进入新六维花冠主链路
          }
          break;
        }
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

    function draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      if (m.shake > 0.1) ctx.translate((Math.random() - 0.5) * m.shake, (Math.random() - 0.5) * m.shake);
      ctx.clearRect(-30, -30, m.w + 60, m.h + 60);
      ctx.fillStyle = "#000000";
      ctx.fillRect(-30, -30, m.w + 60, m.h + 60);
      ctx.textBaseline = "middle";

      const leftX = m.w * 0.1;

      if (m.state === "VOID") {
        const beat = Math.abs(Math.sin(m.voidT * 16));
        ctx.fillStyle = COLOR.blue;
        ctx.globalAlpha = 0.1 + 0.22 * beat;
        ctx.fillRect(m.cx - 7, m.h * 0.5 - 0.5, 14, 1);
        ctx.globalAlpha = 1;
        ctx.restore();
        return;
      }

      // 眉标
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "rgba(0,184,212,0.75)";
      ctx.font = `${Math.min(11, m.w * 0.028)}px ${MONO}`;
      ctx.fillText("02 ｜ 你的原力", leftX, m.h * 0.085);

      // 屏级读数（卡外）：你的底色 + 默认反应链（READ 压印，CARD 时上移常驻为小字）
      const readRise = m.state === "READ" ? smooth(0, CFG.readMs * 0.6, m.readT) : 1;
      ctx.globalAlpha = readRise;
      ctx.fillStyle = "rgba(0,184,212,0.7)";
      ctx.font = `${Math.min(12, m.w * 0.03)}px ${MONO}`;
      ctx.fillText("你的底色", leftX, m.h * 0.135);
      ctx.fillStyle = COLOR.white;
      ctx.font = `${Math.min(14, m.w * 0.037)}px ${SANS}`;
      // 简单换行
      const maxW = m.w * 0.8;
      const words = readout.base.split("");
      let line = "";
      let yy = m.h * 0.17;
      for (const ch of words) {
        if (ctx.measureText(line + ch).width > maxW) {
          ctx.fillText(line, leftX, yy);
          line = ch;
          yy += Math.min(20, m.w * 0.05);
        } else line += ch;
      }
      if (line) ctx.fillText(line, leftX, yy);
      ctx.fillStyle = "rgba(199,160,90,0.85)";
      ctx.font = `${Math.min(13, m.w * 0.034)}px ${SANS}`;
      ctx.fillText(`默认反应链　${readout.chain}`, leftX, yy + Math.min(30, m.w * 0.075));
      ctx.globalAlpha = 1;

      // 母码卡（CARD/SANDIFY）
      if (m.state === "CARD" || m.state === "SANDIFY") {
        const appear = m.state === "CARD" ? smooth(0, 0.6, m.cardT) : Math.max(0, 1 - m.sandT * 1.6);
        if (appear > 0.01) {
          drawEntryCardRenderer({
            ctx,
            snapshot,
            width: m.w,
            height: m.h,
            alpha: appear,
            side: m.side,
            flipProgress: m.flipT / CFG.flipDur,
          });
        }
      }

      // 沙化粒子
      if (m.state === "SANDIFY") {
        for (const p of m.particles) {
          if (!p.active) continue;
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x - 0.8, p.y - 0.8, 1.7, 1.7);
        }
        ctx.globalAlpha = 1;
      }

      // 底部封存轨 + 翻面提示
      if (m.state === "CARD") {
        const ry = railY();
        const rx0 = m.w * 0.1;
        const rx1 = m.w * 0.9;
        const dotX = rx0 + (rx1 - rx0) * m.swipe;
        ctx.strokeStyle = "rgba(85,85,85,0.6)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(rx0, ry);
        ctx.lineTo(rx1, ry);
        ctx.stroke();
        ctx.strokeStyle = COLOR.gold;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = "rgba(199,160,90,0.5)";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(rx0, ry);
        ctx.lineTo(dotX, ry);
        ctx.stroke();
        ctx.fillStyle = COLOR.brightGold;
        ctx.beginPath();
        ctx.arc(dotX, ry, 5.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = "rgba(246,243,236,0.42)";
        ctx.font = `${Math.min(12, m.w * 0.03)}px ${MONO}`;
        ctx.textAlign = "left";
        ctx.fillText(m.swipe > 0.05 ? `封存母码 · ${Math.round(m.swipe * 100)}%` : "右滑 · 封存母码", rx0, ry - 16);
        ctx.fillStyle = "rgba(199,160,90,0.6)";
        ctx.textAlign = "right";
        ctx.fillText("轻触翻面", rx1, ry - 16);
      }

      ctx.restore();

      if (m.debug) {
        ctx.fillStyle = "rgba(0,184,212,0.9)";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.font = `11px ${MONO}`;
        [`state=${m.state} fps=${m.fps.toFixed(0)}`, `side=${m.side} swipe=${m.swipe.toFixed(2)}`].forEach((l, i) => ctx.fillText(l, 8, 8 + i * 14));
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
      if (m.state !== "CARD") return;
      const r = cardRect();
      const onCard = x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;
      if (onCard) {
        if (m.flipT >= CFG.flipDur) {
          m.flipTo = m.side === "front" ? "back" : "front";
          m.flipT = 0;
          audio.flip();
          vibrate(10);
        }
        return;
      }
      m.dragging = true;
      m.lastX = x;
      m.dz = 0;
    }
    function onMove(e: PointerEvent) {
      if (!m.dragging || m.state !== "CARD") return;
      const { x } = localXY(e);
      const dx = x - m.lastX;
      m.lastX = x;
      m.dz += Math.abs(dx);
      if (m.dz < 3) return;
      const width = CFG.swipeTravelFrac * m.w;
      m.swipe = clamp(m.swipe + dx / width, 0, 1);
      if (m.swipe >= 0.97) {
        m.dragging = false;
        startSandify();
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
