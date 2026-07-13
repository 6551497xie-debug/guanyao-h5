// ─────────────────────────────────────────────────────────────────────────────
// 观爻 2.0 ·「二次进入 · 入口坡道」隔离原型 RETURN LAB —— /return-lab
//
// 隔离原型：独立路由/文件；不碰主链路 / 底层代码 / 演算法引擎。
//
// 定盘：二次进入只做两件事 —— 告诉你"你在哪"，然后拉你去"下一局"。续写，不解释。
//   界面 = 进度 + 空槽 + 拉动。无母码/卦码/爻器/器法/结算/"还差X局"（那些在年轮墙，用户主动查看）。
//   结算反馈属于"走完那一局之后"的下游，不在本入口。
//
//   进度（冷宣告）：你已走过 N 局。轨迹仍在长。
//   视觉钩子：轨迹亮出 + 空槽虚线引向它。
//   唯一动作：拉动空槽 → 走今日这一局。
//   底部署名：观爻 · GUANYAO。
//
//   轨迹由版本化持久化边界续写：走一局加一点 → 下次进入轨迹更长。
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GyMobilePreviewFrame } from "../components/visual/GyMobilePreviewFrame";
import {
  GUANYAO_RETURN_TRAJECTORY_MAX_POINTS,
  readPersistedReturnTrajectory,
  writeReturnTrajectory,
} from "../services/guanyaoReturnTrajectoryPersistenceAdapter";

const MONO = "SFMono-Regular, Menlo, Monaco, Consolas, monospace";
const SANS = "-apple-system, system-ui, sans-serif";

const CFG = {
  x0Frac: 0.12,
  x1Frac: 0.84,
  yTopFrac: 0.36,
  yBotFrac: 0.6,
  pullTravelFrac: 0.34, // 拉动空槽多少屏宽 = 出发
  voidMs: 0.35,
  revealMs: 1.1, // 轨迹亮出
  igniteMs: 0.9, // "进入今日这一局…"
  maxPoints: GUANYAO_RETURN_TRAJECTORY_MAX_POINTS,
  particleBudget: 90,
};

const COLOR = {
  bg: "#000000",
  primary: "#F6F3EC",
  blue: "#00B8D4",
  gold: "#C7A96B",
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
type Particle = { x: number; y: number; vx: number; vy: number; alpha: number; active: boolean };

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
  function wake() {
    const c = ensure();
    if (!c) return;
    [440, 660].forEach((f, i) => {
      const t = c.currentTime + i * 0.04;
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(f, t);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.09, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
      o.connect(g).connect(c.destination);
      o.start(t);
      o.stop(t + 0.22);
    });
  }
  function ignite() {
    const c = ensure();
    if (!c) return;
    const t = c.currentTime;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(240, t);
    o.frequency.exponentialRampToValueAtTime(900, t + 0.28);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.16, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.32);
    o.connect(g).connect(c.destination);
    o.start(t);
    o.stop(t + 0.33);
  }
  return { ensure, wake, ignite };
}

export function ReturnLab() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const navigate = useNavigate();
  const navRef = useRef(navigate);
  navRef.current = navigate;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const audio = makeAudio();

    const m = {
      w: 0,
      h: 0,
      x0: 0,
      x1: 0,
      yTop: 0,
      yBot: 0,
      state: "VOID" as "VOID" | "ENTRY" | "IGNITE",
      voidT: 0,
      pulsed: false,
      entryT: 0,
      woken: false,
      history: readPersistedReturnTrajectory(),
      lastVal: 0.5,
      pull: 0,
      dragging: false,
      lastX: 0,
      dz: 0,
      igniteT: 0,
      appended: false,
      shake: 0,
      particles: [] as Particle[],
      debug: false,
      fps: 0,
      fpsAcc: 0,
      fpsN: 0,
    };
    m.lastVal = m.history[m.history.length - 1] ?? 0.5;
    for (let i = 0; i < CFG.particleBudget; i++) m.particles.push({ x: 0, y: 0, vx: 0, vy: 0, alpha: 0, active: false });

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
      m.yTop = rect.height * CFG.yTopFrac;
      m.yBot = rect.height * CFG.yBotFrac;
    }

    function reset() {
      m.history = readPersistedReturnTrajectory();
      m.lastVal = m.history[m.history.length - 1] ?? 0.5;
      m.state = "VOID";
      m.voidT = 0;
      m.pulsed = false;
      m.entryT = 0;
      m.woken = false;
      m.pull = 0;
      m.dragging = false;
      m.igniteT = 0;
      m.appended = false;
      m.shake = 0;
      m.particles.forEach((p) => (p.active = false));
    }

    const total = () => m.history.length + 1; // 含今日空槽
    function pointX(i: number) {
      const t = total();
      return t <= 1 ? (m.x0 + m.x1) / 2 : m.x0 + (i / (t - 1)) * (m.x1 - m.x0);
    }
    function valY(v: number) {
      return m.yBot - clamp(v, 0, 1) * (m.yBot - m.yTop);
    }
    function slotX() {
      return pointX(total() - 1) + m.pull * 14; // 拉动时空槽被往外拽
    }

    function fire() {
      m.state = "IGNITE";
      m.igniteT = 0;
      audio.ignite();
      vibrate([0, 30, 20, 40]);
      m.shake = Math.max(m.shake, 10);
      const px = slotX();
      const py = valY(m.lastVal);
      let pi = 0;
      for (let k = 0; k < 44; k++) {
        if (pi >= m.particles.length) break;
        const p = m.particles[pi++];
        if (!p) break;
        const a = Math.random() * Math.PI * 2;
        const sp = 0.6 + Math.random() * 2;
        p.x = px;
        p.y = py;
        p.vx = Math.cos(a) * sp;
        p.vy = Math.sin(a) * sp;
        p.alpha = 0.7 + Math.random() * 0.3;
        p.active = true;
      }
    }

    function step(dt: number) {
      if (m.shake > 0) m.shake = Math.max(0, m.shake - dt * 60);
      switch (m.state) {
        case "VOID": {
          m.voidT += dt;
          if (!m.pulsed && m.voidT > 0.14) {
            m.pulsed = true;
            vibrate([0, 14, 70, 18]);
          }
          if (m.voidT >= CFG.voidMs) {
            m.state = "ENTRY";
            m.entryT = 0;
          }
          break;
        }
        case "ENTRY": {
          m.entryT += dt;
          if (!m.woken && m.entryT > 0.4) {
            m.woken = true;
            audio.wake();
          }
          if (!m.dragging && m.pull < 1) m.pull = Math.max(0, m.pull - dt * 1.6);
          break;
        }
        case "IGNITE": {
          m.igniteT += dt;
          if (!m.appended && m.igniteT > 0.25) {
            // 模拟"走完一局"的结果落点（生产里=真实那一局产出；本入口不展示结算）
            m.appended = true;
            const nv = clamp(m.lastVal + (Math.random() - 0.5) * 0.3, 0.05, 0.95);
            m.history = [...m.history, nv].slice(-CFG.maxPoints);
            writeReturnTrajectory(m.history);
          }
          if (m.igniteT >= CFG.igniteMs) navRef.current("/dynamics"); // 走今日这一局：进入新六维花冠主链路
          break;
        }
      }
      for (const p of m.particles) {
        if (!p.active) continue;
        p.vy += 0.05 * (dt * 60);
        p.x += p.vx * (dt * 60);
        p.y += p.vy * (dt * 60);
        p.alpha -= dt * 0.8;
        if (p.alpha <= 0) p.active = false;
      }
    }

    function draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      if (m.shake > 0.1) ctx.translate((Math.random() - 0.5) * m.shake, (Math.random() - 0.5) * m.shake);
      ctx.clearRect(-30, -30, m.w + 60, m.h + 60);
      ctx.fillStyle = COLOR.bg;
      ctx.fillRect(-30, -30, m.w + 60, m.h + 60);
      ctx.textBaseline = "middle";

      const midY = (m.yTop + m.yBot) / 2;
      const fg = ctx.createRadialGradient(m.w / 2, midY, 0, m.w / 2, midY, Math.max(m.w, m.h) * 0.6);
      fg.addColorStop(0, `rgba(0,184,212,${m.state === "IGNITE" ? 0.12 : 0.05})`);
      fg.addColorStop(0.55, "rgba(0,184,212,0.015)");
      fg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = fg;
      ctx.fillRect(0, 0, m.w, m.h);

      if (m.state === "VOID") {
        const beat = Math.abs(Math.sin(m.voidT * 16));
        ctx.fillStyle = COLOR.blue;
        ctx.globalAlpha = 0.1 + 0.22 * beat;
        ctx.fillRect(m.w / 2 - 7, midY - 0.5, 14, 1);
        ctx.globalAlpha = 1;
        ctx.restore();
        return;
      }

      const leftX = m.w * 0.12;
      const rev = smooth(0, CFG.revealMs, m.entryT);
      const ready = m.state === "ENTRY" && m.entryT > CFG.revealMs * 0.7;

      // 进度（冷宣告）
      ctx.textAlign = "left";
      ctx.globalAlpha = rev;
      ctx.fillStyle = "rgba(246,243,236,0.9)";
      ctx.font = `${Math.min(22, m.w * 0.055)}px ${SANS}`;
      ctx.fillText(`你已走过 ${m.history.length} 局。`, leftX, m.h * 0.15);
      ctx.fillStyle = "rgba(246,243,236,0.5)";
      ctx.font = `${Math.min(15, m.w * 0.038)}px ${SANS}`;
      ctx.fillText("轨迹仍在长。", leftX, m.h * 0.195);
      ctx.globalAlpha = 1;

      // 轨迹（亮出，左→右揭示）
      const pts = m.history.map((v, i) => ({ x: pointX(i), y: valY(v) }));
      const revealX = m.x0 + (m.x1 - m.x0) * smooth(0, CFG.revealMs, m.entryT);
      ctx.save();
      ctx.beginPath();
      ctx.rect(m.x0 - 6, 0, revealX - m.x0 + 12, m.h);
      ctx.clip();
      if (pts.length >= 2) {
        ctx.strokeStyle = COLOR.bone;
        ctx.lineWidth = 1.4;
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.moveTo(pts[0]!.x, pts[0]!.y);
        for (let i = 1; i < pts.length - 1; i++) {
          const a = pts[i]!;
          const b = pts[i + 1]!;
          ctx.quadraticCurveTo(a.x, a.y, (a.x + b.x) / 2, (a.y + b.y) / 2);
        }
        ctx.lineTo(pts[pts.length - 1]!.x, pts[pts.length - 1]!.y);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
      ctx.restore();
      pts.forEach((p) => {
        if (p.x > revealX) return;
        ctx.fillStyle = "rgba(85,85,85,0.9)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.6, 0, Math.PI * 2);
        ctx.fill();
      });

      // 空槽 + 虚线引向它（视觉钩子）
      const sx = slotX();
      const sy = valY(m.lastVal);
      const lastP = pts[pts.length - 1];
      if (lastP && rev > 0.6) {
        ctx.strokeStyle = `rgba(0,184,212,${(0.3 + 0.3 * m.pull).toFixed(2)})`;
        ctx.setLineDash([2, 4]);
        ctx.beginPath();
        ctx.moveTo(lastP.x, lastP.y);
        ctx.lineTo(sx, sy);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      if (rev > 0.6) {
        const pulse = 0.5 + 0.5 * Math.sin(performance.now() / 360);
        ctx.strokeStyle = `rgba(0,184,212,${(0.45 + 0.4 * Math.max(pulse, m.pull)).toFixed(2)})`;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = "rgba(0,184,212,0.5)";
        ctx.shadowBlur = 6 + m.pull * 10;
        ctx.beginPath();
        ctx.arc(sx, sy, 6.5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.lineWidth = 1;
        if (m.state === "ENTRY") {
          ctx.fillStyle = "rgba(0,184,212,0.7)";
          ctx.font = `${Math.min(12, m.w * 0.03)}px ${MONO}`;
          ctx.textAlign = "center";
          ctx.fillText("今日 ?", sx, m.yBot + 22);
          ctx.textAlign = "left";
        }
      }

      // 唯一动作
      if (m.state === "ENTRY" && ready) {
        ctx.globalAlpha = Math.min(1, (m.entryT - CFG.revealMs * 0.7) * 2);
        ctx.fillStyle = "rgba(246,243,236,0.55)";
        ctx.font = `${Math.min(15, m.w * 0.038)}px ${SANS}`;
        ctx.fillText(m.pull > 0.05 ? `走今日这一局 · ${Math.round(m.pull * 100)}%` : "→ 拉动空槽，走今日这一局", leftX, m.h * 0.72);
        ctx.globalAlpha = 1;
      } else if (m.state === "IGNITE") {
        ctx.fillStyle = "rgba(0,184,212,0.85)";
        ctx.font = `${Math.min(16, m.w * 0.04)}px ${SANS}`;
        ctx.fillText("进入今日这一局…", leftX, m.h * 0.72);
      }

      // 底部署名
      ctx.globalAlpha = rev * 0.6;
      ctx.fillStyle = "rgba(246,243,236,0.4)";
      ctx.font = `${Math.min(12, m.w * 0.03)}px ${MONO}`;
      ctx.textAlign = "center";
      ctx.fillText("观爻 · GUANYAO", m.w / 2, m.h * 0.9);
      ctx.textAlign = "left";
      ctx.globalAlpha = 1;

      // 粒子
      for (const p of m.particles) {
        if (!p.active) continue;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = COLOR.gold;
        ctx.fillRect(p.x - 0.8, p.y - 0.8, 1.8, 1.8);
      }
      ctx.globalAlpha = 1;

      ctx.restore();

      if (m.debug) {
        ctx.fillStyle = "rgba(0,184,212,0.9)";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.font = `11px ${MONO}`;
        [`state=${m.state} fps=${m.fps.toFixed(0)}`, `pull=${m.pull.toFixed(2)} n=${m.history.length}`].forEach((l, i) => ctx.fillText(l, 8, 8 + i * 14));
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
      if (m.state !== "ENTRY" || m.entryT < CFG.revealMs * 0.7) return;
      m.dragging = true;
      m.lastX = x;
      m.dz = 0;
    }
    function onMove(e: PointerEvent) {
      if (!m.dragging || m.state !== "ENTRY") return;
      const { x } = localXY(e);
      const dx = x - m.lastX;
      m.lastX = x;
      m.dz += Math.abs(dx);
      if (m.dz < 3) return;
      const width = CFG.pullTravelFrac * m.w;
      m.pull = clamp(m.pull + dx / width, 0, 1);
      if (m.pull >= 0.97) {
        m.dragging = false;
        fire();
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
