// Axis Line is the only physical representation of user behavioral gravity.
//
// AXIS LINE SYSTEM V1 — Single Reality Layer.
// 整个界面只有一条 1px 轴线（lineWidth = 1.0）；不存在任何卡片/面板/装饰结构。
// 所有交互、状态、反馈都只作用在这条线上。
// State machine: IDLE → TENSION → OVERRIDE → BREAK → REBOUND.
//
// 输入只能影响：AxisLine state / geometry / color / physics。
// 输出只能是：line state change / canvas animation / physics transition / onAxisEvent。
// 隔离实验路由 /axis-lab —— 不触碰受 CONSTITUTION 锁定的 launch → mother-code 单路径。

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GyMobilePreviewFrame } from "../components/visual/GyMobilePreviewFrame";
import { GUANYAO_ROUTES } from "../routes/guanyaoRoutes";
import {
  axisLineSystem,
  createEmptyRunState,
  type AxisEvent,
  type AxisOverrideMode,
  type AxisRunState,
  type AxisState,
} from "../systems/axisLineSystem";

export type { AxisEvent };

type Particle = { x: number; y: number; vx: number; vy: number; alpha: number };

type AxisModel = {
  state: AxisState;
  // geometry (css px)
  w: number;
  h: number;
  cx: number;
  cy: number;
  x0: number;
  x1: number;
  // Hooke deformation
  offset: number;
  offsetV: number;
  targetOffset: number;
  bumpX: number;
  dragging: boolean;
  // timing
  pointerDownAt: number;
  startX: number;
  stateEnteredAt: number;
  // break / rebound
  halfGap: number;
  wobble: number;
  particles: Particle[];
  reboundT: number;
  // behavioral run capture (causal core input)
  run: AxisRunState;
  // guard
  fired: boolean;
};

type AudioRig = {
  ctx: AudioContext;
  master: GainNode;
  tensionOsc: OscillatorNode;
  tensionGain: GainNode;
};

const COLOR = {
  idle: "#555555",
  tension: "#00B8D4",
  override: "#C7A96B",
};

const LONG_PRESS_MS = 700;
const SWIPE_LEFT_PX = 64;
const BREAK_HOLD_MS = 360;
const REBOUND_FADE_MS = 1500; // gold → cyan crossfade window during REBOUND
const MASTER_GAIN = 0.5;

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function lerpHex(a: string, b: string, t: number): string {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  const k = Math.max(0, Math.min(1, t));
  const r = Math.round(ca[0] + (cb[0] - ca[0]) * k);
  const g = Math.round(ca[1] + (cb[1] - ca[1]) * k);
  const bl = Math.round(ca[2] + (cb[2] - ca[2]) * k);
  return `rgb(${r}, ${g}, ${bl})`;
}

export function AxisLinePage({ onAxisEvent }: { onAxisEvent?: (e: AxisEvent) => void }) {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const onEventRef = useRef<typeof onAxisEvent>(onAxisEvent);
  onEventRef.current = onAxisEvent;

  const modelRef = useRef<AxisModel>({
    state: "IDLE",
    w: 0,
    h: 0,
    cx: 0,
    cy: 0,
    x0: 0,
    x1: 0,
    offset: 0,
    offsetV: 0,
    targetOffset: 0,
    bumpX: 0,
    dragging: false,
    pointerDownAt: 0,
    startX: 0,
    stateEnteredAt: 0,
    halfGap: 0,
    wobble: 0,
    particles: [],
    reboundT: 0,
    run: createEmptyRunState(0),
    fired: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const m = modelRef.current;
    const audioRef: { rig: AudioRig | null } = { rig: null };
    const mutedRef = { value: false };
    let raf = 0;
    let last = performance.now();
    let lastVib = 0;

    // ---- geometry ----
    function resize() {
      const c = canvasRef.current;
      if (!c) return;
      const rect = c.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      c.width = Math.max(1, Math.floor(rect.width * dpr));
      c.height = Math.max(1, Math.floor(rect.height * dpr));
      const ctx = c.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      m.w = rect.width;
      m.h = rect.height;
      m.cx = rect.width / 2;
      m.cy = rect.height / 2;
      const span = rect.width * 0.84;
      m.x0 = (rect.width - span) / 2;
      m.x1 = m.x0 + span;
      if (!m.bumpX) m.bumpX = m.cx;
    }

    // ---- audio (WebAudio, default mutable: press M) ----
    function initAudio() {
      if (audioRef.rig) return;
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return;
      const ctx = new Ctor();
      const master = ctx.createGain();
      master.gain.value = mutedRef.value ? 0 : MASTER_GAIN;
      master.connect(ctx.destination);
      const tensionGain = ctx.createGain();
      tensionGain.gain.value = 0;
      const tensionOsc = ctx.createOscillator();
      tensionOsc.type = "sine";
      tensionOsc.frequency.value = 70;
      tensionOsc.connect(tensionGain);
      tensionGain.connect(master);
      tensionOsc.start();
      audioRef.rig = { ctx, master, tensionOsc, tensionGain };
    }

    function setTensionSound(level: number) {
      const rig = audioRef.rig;
      if (!rig) return;
      const t = rig.ctx.currentTime;
      rig.tensionGain.gain.setTargetAtTime(level * 0.05, t, 0.05);
      rig.tensionOsc.frequency.setTargetAtTime(60 + level * 46, t, 0.05);
    }

    function playSnap() {
      const rig = audioRef.rig;
      if (!rig) return;
      const { ctx, master } = rig;
      const t = ctx.currentTime;
      // sharp mechanical noise burst
      const dur = 0.14;
      const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 3);
      }
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      const hp = ctx.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.value = 1200;
      const g = ctx.createGain();
      g.gain.value = 0.85;
      src.connect(hp);
      hp.connect(g);
      g.connect(master);
      src.start(t);
      // mechanical click blip
      const osc = ctx.createOscillator();
      osc.type = "square";
      osc.frequency.value = 210;
      const og = ctx.createGain();
      og.gain.setValueAtTime(0.28, t);
      og.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      osc.connect(og);
      og.connect(master);
      osc.start(t);
      osc.stop(t + 0.09);
    }

    function vibrate(pattern: number | number[]) {
      if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
        navigator.vibrate(pattern);
      }
    }

    // ---- state transitions (every change emits lifecycle hooks) ----
    function go(to: AxisState, now: number) {
      const from = m.state;
      if (from === to) return;
      axisLineSystem.emitTransition("exitState", from, from);
      axisLineSystem.emitTransition("transitionState", from, to);
      m.state = to;
      m.stateEnteredAt = now;
      axisLineSystem.emitTransition("enterState", from, to);
    }

    function emit(type: AxisEvent["type"], payload: unknown) {
      axisLineSystem.emitAxisEvent({ type, payload });
      // local hook keeps backward-compatible AxisEvent contract
      onEventRef.current?.({ type, payload });
    }

    function startRun(now: number) {
      m.run = createEmptyRunState(now);
    }

    function enterTension(now: number, x: number, y: number) {
      startRun(now);
      go("TENSION", now);
      m.bumpX = x;
      m.targetOffset = y - m.cy;
      emit("TENSION", { offset: m.offset, bumpX: m.bumpX });
    }

    function enterOverride(now: number, mode: AxisOverrideMode) {
      if (m.state !== "TENSION") return;
      m.targetOffset = 0;
      m.startX = m.bumpX; // begin swipe-left tracking from current pointer x
      m.run.override = { tMs: now - m.run.startedAt, offset: m.offset, mode, x: m.bumpX };
      go("OVERRIDE", now);
      emit("OVERRIDE", { mode, offset: m.offset });
      vibrate(18);
    }

    function spawnParticles() {
      const list: Particle[] = [];
      const spread = (m.x1 - m.x0) * 0.5;
      for (let i = 0; i < 52; i++) {
        list.push({
          x: m.cx + (Math.random() - 0.5) * spread,
          y: m.cy + (Math.random() - 0.5) * 4,
          vx: (Math.random() - 0.5) * 42,
          vy: Math.random() * 64 + 18, // fall downward
          alpha: 0.78 + Math.random() * 0.22,
        });
      }
      m.particles = list;
    }

    function enterBreak(now: number) {
      if (m.state !== "OVERRIDE") return;
      m.halfGap = 0.6;
      m.wobble = 0;
      spawnParticles();
      m.run.breakPoint = { tMs: now - m.run.startedAt, gapPx: 4, fragments: m.particles.length };
      go("BREAK", now);
      emit("BREAK", { gapPx: 4, fragments: m.particles.length });
      playSnap();
      vibrate([0, 28, 18, 40]);
    }

    // REBOUND = behavior crystallization point —— 双通道：emit + 现实生成跳转
    function finish(now: number) {
      if (m.fired) return;
      m.fired = true;
      m.run.endedAt = now;
      const timestamp = Date.now();
      const mode: AxisOverrideMode = m.run.override?.mode ?? "DIRECT";
      const payload = { finalProgress: 1, mode, timestamp };
      // ① 系统事件输出
      emit("REBOUND_COMPLETE", payload);
      // 行为结构体固化（现实沉积）
      const axisBehaviorAsset = axisLineSystem.crystallizeAxisBehaviorAsset(m.run);
      try {
        window.localStorage.setItem("guanyao:axisBehaviorAsset", JSON.stringify(axisBehaviorAsset));
      } catch {
        /* storage unavailable — event channel already fired */
      }
      // ② 现实生成跳转
      navigate(GUANYAO_ROUTES.motherCode, {
        state: { source: "axis-rebound", reboundComplete: payload },
      });
    }

    // ---- physics update ----
    function update(dt: number, now: number) {
      const extreme = 0.16 * m.h;

      // deformation: dragging follows pointer; otherwise damped Hooke spring → 0
      if (m.state === "TENSION" && m.dragging) {
        m.offset += (m.targetOffset - m.offset) * Math.min(1, dt * 18);
        m.offsetV = 0;
      } else {
        const k = 140;
        const c = 24;
        m.offsetV += (-k * m.offset - c * m.offsetV) * dt;
        m.offset += m.offsetV * dt;
      }

      switch (m.state) {
        case "IDLE":
          break;
        case "TENSION": {
          const level = Math.min(1, Math.abs(m.offset) / extreme);
          setTensionSound(m.dragging ? level : 0);
          if (m.dragging) {
            // capture behavioral trajectory (causal core input)
            const tMs = now - m.run.startedAt;
            if (m.run.trajectory.length < 240) m.run.trajectory.push({ t: tMs, offset: m.offset });
            const absOffset = Math.abs(m.offset);
            if (absOffset > m.run.peakTension) m.run.peakTension = absOffset;
            if (absOffset > 4) m.run.directionSign = Math.sign(m.offset);
            if (now - m.pointerDownAt > LONG_PRESS_MS) enterOverride(now, "LONG_PRESS");
            else if (absOffset > extreme) enterOverride(now, "EXTREME_DRAG");
          } else if (Math.abs(m.offset) < 0.5 && Math.abs(m.offsetV) < 2) {
            go("IDLE", now);
          }
          break;
        }
        case "OVERRIDE":
          setTensionSound(0);
          break;
        case "BREAK": {
          m.halfGap += (2 - m.halfGap) * Math.min(1, dt * 10);
          for (const p of m.particles) {
            p.vy += 900 * dt;
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.alpha -= dt * 0.9;
          }
          m.particles = m.particles.filter((p) => p.alpha > 0);
          if (now - m.stateEnteredAt > BREAK_HOLD_MS) {
            m.run.reboundStartedAt = now;
            m.reboundT = 0;
            go("REBOUND", now);
          }
          break;
        }
        case "REBOUND": {
          m.reboundT += dt * 1000;
          const t = m.reboundT / 1000;
          const damp = Math.exp(-3 * t); // y = sin(t) * exp(-t)
          const amplitude = 10 * damp; // rebound envelope amplitude
          m.halfGap = Math.max(0, 2 * damp * Math.cos(14 * t));
          m.wobble = amplitude * Math.sin(16 * t);
          for (const p of m.particles) {
            p.x += (m.cx - p.x) * Math.min(1, dt * 4);
            p.y += (m.cy - p.y) * Math.min(1, dt * 4);
            p.alpha -= dt * 0.8;
          }
          m.particles = m.particles.filter((p) => p.alpha > 0);
          // REBOUND ≠ animation end. crystallize when amplitude < 0.1
          if (amplitude < 0.1) finish(now);
          break;
        }
      }
    }

    // ---- render (single 1px line, no UI) ----
    function strokeColor(): string {
      if (m.state === "TENSION") return COLOR.tension;
      if (m.state === "OVERRIDE" || m.state === "BREAK") return COLOR.override;
      if (m.state === "REBOUND") {
        return lerpHex(COLOR.override, COLOR.tension, m.reboundT / REBOUND_FADE_MS);
      }
      return COLOR.idle;
    }

    function draw(ctx: CanvasRenderingContext2D, now: number) {
      ctx.clearRect(0, 0, m.w, m.h);
      ctx.lineWidth = 1.0;
      ctx.lineCap = "round";
      const col = strokeColor();
      ctx.strokeStyle = col;
      ctx.fillStyle = col;

      const broken = m.state === "BREAK" || m.state === "REBOUND";

      if (broken) {
        const gap = Math.max(0, m.halfGap);
        const sigma = (m.x1 - m.x0) * 0.1;
        const yAt = (x: number) =>
          m.cy + m.wobble * Math.exp(-((x - m.cx) ** 2) / (2 * sigma * sigma));
        // left segment
        ctx.beginPath();
        const leftEnd = m.cx - gap;
        for (let x = m.x0; x <= leftEnd; x += 2) {
          if (x === m.x0) ctx.moveTo(x, yAt(x));
          else ctx.lineTo(x, yAt(x));
        }
        ctx.lineTo(leftEnd, yAt(leftEnd));
        ctx.stroke();
        // right segment
        ctx.beginPath();
        const rightStart = m.cx + gap;
        for (let x = rightStart; x <= m.x1; x += 2) {
          if (x === rightStart) ctx.moveTo(x, yAt(x));
          else ctx.lineTo(x, yAt(x));
        }
        ctx.lineTo(m.x1, yAt(m.x1));
        ctx.stroke();
        // pressure fragments
        for (const p of m.particles) {
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillRect(p.x - 0.5, p.y - 0.5, 1, 1);
        }
        ctx.globalAlpha = 1;
      } else {
        // single deformable line (Gaussian bump = Hooke curvature)
        const sigma = (m.x1 - m.x0) * 0.12;
        ctx.beginPath();
        const N = 140;
        for (let i = 0; i <= N; i++) {
          const x = m.x0 + ((m.x1 - m.x0) * i) / N;
          const y = m.cy + m.offset * Math.exp(-((x - m.bumpX) ** 2) / (2 * sigma * sigma));
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        if (m.state === "TENSION" && m.dragging) {
          // grab node on the line apex
          const apexY = m.cy + m.offset;
          ctx.beginPath();
          ctx.arc(m.bumpX, apexY, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        if (m.state === "OVERRIDE") {
          // slider locked to extreme (right end)
          ctx.beginPath();
          ctx.arc(m.x1, m.cy, 3, 0, Math.PI * 2);
          ctx.fill();
          // single instruction, drawn on the reality layer (canvas, not DOM UI)
          const a = Math.min(1, (now - m.stateEnteredAt) / 400);
          ctx.globalAlpha = a * 0.9;
          ctx.font = "11px SFMono-Regular, Menlo, Monaco, Consolas, monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "alphabetic";
          ctx.fillText("Swipe left to break the line", m.cx, m.cy - 26);
          ctx.globalAlpha = 1;
        }
      }
    }

    // ---- loop ----
    function frame(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      update(dt, now);
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx) draw(ctx, now);
      raf = requestAnimationFrame(frame);
    }

    // ---- input (only affects the line) ----
    function xy(e: PointerEvent) {
      const r = canvas!.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    function onPointerDown(e: PointerEvent) {
      initAudio();
      const rig = audioRef.rig;
      if (rig && rig.ctx.state === "suspended") void rig.ctx.resume();
      const now = performance.now();
      const { x, y } = xy(e);
      m.dragging = true;
      m.pointerDownAt = now;
      try {
        canvas!.setPointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
      if (m.state === "IDLE") {
        enterTension(now, x, y);
      } else if (m.state === "OVERRIDE") {
        m.startX = x;
      }
    }

    function onPointerMove(e: PointerEvent) {
      if (!m.dragging) return;
      const { x, y } = xy(e);
      if (m.state === "TENSION") {
        m.bumpX = x;
        m.targetOffset = y - m.cy;
        const now = performance.now();
        if (now - lastVib > 110 && Math.abs(m.offset) > 6) {
          lastVib = now;
          vibrate(5);
        }
      } else if (m.state === "OVERRIDE") {
        if (x - m.startX < -SWIPE_LEFT_PX) enterBreak(performance.now());
      }
    }

    function onPointerUp(e: PointerEvent) {
      m.dragging = false;
      setTensionSound(0);
      if (m.state === "TENSION") m.targetOffset = 0;
      try {
        canvas!.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "m" || e.key === "M") {
        mutedRef.value = !mutedRef.value;
        if (audioRef.rig) audioRef.rig.master.gain.value = mutedRef.value ? 0 : MASTER_GAIN;
      }
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("keydown", onKey);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKey);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      const rig = audioRef.rig;
      if (rig) {
        try {
          rig.tensionOsc.stop();
        } catch {
          /* noop */
        }
        void rig.ctx.close().catch(() => undefined);
      }
      audioRef.rig = null;
    };
  }, [navigate]);

  return (
    <GyMobilePreviewFrame background="#000">
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block", touchAction: "none" }}
      />
    </GyMobilePreviewFrame>
  );
}
