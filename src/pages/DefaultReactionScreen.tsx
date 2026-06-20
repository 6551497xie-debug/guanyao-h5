// GUANYAO 2.0 = immutable causal engine with layered perceptual enhancement system that improves user understanding without modifying underlying logic.
// GUANYAO 2.0 = mother-code card sealing buffer; the engine stays upstream-only, this screen only renders and seals.
// DefaultReactionScreen = isolated buffer scope; it never exports explanatory labels to adjacent states.
//   ① 母码资产卡嵌入
//   ② 点击卡牌翻至背面
//   ③ 再次点击背面封存
//   ④ 卡牌沙化 → 进入 MotherField

import { useEffect, useRef } from "react";
import { GyMobilePreviewFrame } from "../components/visual/GyMobilePreviewFrame";
import { setAxisHandoff, takeAxisHandoff } from "../systems/axisHandoff";

const MONO = "SFMono-Regular, Menlo, Monaco, Consolas, monospace";
const SANS = "-apple-system, system-ui, sans-serif";
const BLUE = "#00B8D4";
const GOLD = "#C7A96B";

// 时间轴（秒）
const ENTER_DONE = 0.5; // 金轴入场
const SENT_AT = 1.2;
const SENT_DONE = 2.0; // 认知句浮现
const TOP_AT = 2.15;
const TOP_DONE = 2.95; // 认知句坍缩落入最上方
const CARD_AT = 3.0;
const IDLE_AT = 5.5;

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
type Particle = { x: number; y: number; vx: number; vy: number; alpha: number };

type Model = {
  w: number;
  h: number;
  cx: number;
  t: number;
  frames: number;
  ready: boolean;
  sandifying: boolean;
  sandT: number;
  particles: Particle[];
  voidT: number; // 进场四拍·第一拍：黑屏停顿
  pulsed: boolean;
  advanced: boolean;
  cardSide: "front" | "back";
  cardPulse: number;
};

const VOID_MS = 0.44; // 进场黑屏停顿时长
const ENTRY_PULSE = [0, 18, 90, 26, 70, 34]; // 统一入场物理脉冲（与 MotherField 一致）

export function DefaultReactionScreen({
  motherCode,
  cognition,
  reactionChain,
  inertiaPattern,
  defenseMode,
  misusePath,
  onContinue,
}: {
  motherCode: string;
  cognition: string;
  reactionChain: string;
  inertiaPattern: string;
  defenseMode: string;
  misusePath: string;
  onContinue: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dataRef = useRef({ motherCode, cognition, reactionChain, inertiaPattern, defenseMode, misusePath });
  dataRef.current = { motherCode, cognition, reactionChain, inertiaPattern, defenseMode, misusePath };
  const continueRef = useRef(onContinue);
  continueRef.current = onContinue;

  const modelRef = useRef<Model>({
    w: 0,
    h: 0,
    cx: 0,
    t: 0,
    frames: 0,
    ready: false,
    sandifying: false,
    sandT: 0,
    particles: [],
    voidT: 0,
    pulsed: false,
    advanced: false,
    cardSide: "front",
    cardPulse: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const m = modelRef.current;
    let raf = 0;
    let last = performance.now();
    // 一线贯穿：取上一屏沙化粒子，入场时重新凝结进本屏入场轴线（splitY）
    const handoff = takeAxisHandoff();
    let incoming: { x: number; y: number; vx: number; vy: number; color: string }[] = [];
    let incomingSeeded = false;
    let incomingT = 0;
    function seedIncoming() {
      if (incomingSeeded || !handoff || m.w <= 0) return;
      incomingSeeded = true;
      incoming = handoff.map((p) => ({ x: p.fx * m.w, y: p.fy * m.h, vx: p.vx, vy: p.vy, color: p.color }));
    }

    function vibrate(p: number | number[]) {
      if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") navigator.vibrate(p);
    }

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
    }

    function wrap(ctx: CanvasRenderingContext2D, text: string, maxW: number): string[] {
      const out: string[] = [];
      text.split("\n").forEach((para) => {
        let line = "";
        for (const ch of para) {
          if (ctx.measureText(line + ch).width > maxW && line) {
            out.push(line);
            line = ch;
          } else {
            line += ch;
          }
        }
        if (line) out.push(line);
      });
      return out;
    }

    function startSandify() {
      if (m.sandifying) return;
      m.sandifying = true;
      m.sandT = 0;
      const list: Particle[] = [];
      const card = getCardRect();
      for (let i = 0; i < 150; i++) {
        list.push({
          x: card.x + Math.random() * card.w,
          y: card.y + Math.random() * card.h,
          vx: (Math.random() - 0.5) * 24,
          vy: Math.random() * 70 + 40,
          alpha: 0.7 + Math.random() * 0.3,
        });
      }
      m.particles = list;
      // 粒子守恒：把本屏沙化粒子（金+蓝+灰）交给下一屏
      setAxisHandoff(
        list.map((p, i) => ({ fx: p.x / m.w, fy: p.y / m.h, vx: p.vx, vy: p.vy, color: ["#C7A96B", "#00B8D4", "#6b6b6b"][i % 3] ?? "#C7A96B" })),
      );
      vibrate([0, 26, 18, 40]);
    }

    function getCardRect() {
      const w = Math.min(m.w * 0.72, 318);
      const h = w / 0.68;
      return {
        x: (m.w - w) / 2,
        y: m.h * 0.38,
        w,
        h,
      };
    }

    function drawWrappedText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxW: number, lh: number) {
      const lines = wrap(ctx, text, maxW);
      lines.forEach((line, index) => ctx.fillText(line, x, y + index * lh));
      return lines.length;
    }

    function drawMotherCard(ctx: CanvasRenderingContext2D, side: "front" | "back", alpha: number) {
      const d = dataRef.current;
      const card = getCardRect();
      const pulse = 1 + Math.sin(m.cardPulse * Math.PI) * 0.018;
      ctx.save();
      ctx.globalAlpha *= alpha;
      ctx.translate(card.x + card.w / 2, card.y + card.h / 2);
      ctx.scale(side === "back" ? 1 : pulse, pulse);
      ctx.translate(-card.w / 2, -card.h / 2);
      ctx.strokeStyle = side === "back" ? "rgba(246,243,236,0.72)" : "rgba(0,184,212,0.76)";
      ctx.fillStyle = side === "back" ? "rgba(1,3,4,0.95)" : "rgba(0,8,10,0.94)";
      ctx.shadowColor = side === "back" ? "rgba(246,243,236,0.12)" : "rgba(0,184,212,0.22)";
      ctx.shadowBlur = 22;
      ctx.beginPath();
      ctx.roundRect(0, 0, card.w, card.h, 14);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      if (side === "front") {
        ctx.textAlign = "left";
        ctx.fillStyle = "rgba(0,184,212,0.74)";
        ctx.font = `${Math.min(10, m.w * 0.026)}px ${MONO}`;
        ctx.fillText("MOTHER_CODE / BUFFER", 20, 28);
        ctx.fillStyle = "rgba(246,243,236,0.94)";
        ctx.font = `700 ${Math.min(27, m.w * 0.067)}px ${SANS}`;
        ctx.fillText(d.motherCode, 20, 74);
        ctx.fillStyle = "rgba(199,169,107,0.78)";
        ctx.font = `${Math.min(12, m.w * 0.032)}px ${MONO}`;
        ctx.fillText("默认反应链", 20, 132);
        ctx.fillStyle = "rgba(246,243,236,0.86)";
        ctx.font = `700 ${Math.min(18, m.w * 0.046)}px ${SANS}`;
        drawWrappedText(ctx, d.reactionChain, 20, 160, card.w - 40, 28);
        ctx.fillStyle = "rgba(0,184,212,0.62)";
        ctx.font = `${Math.min(10, m.w * 0.026)}px ${MONO}`;
        ctx.textAlign = "center";
        ctx.fillText("轻触翻面", card.w / 2, card.h - 34);
      } else {
        ctx.textAlign = "left";
        ctx.fillStyle = "rgba(199,169,107,0.82)";
        ctx.font = `${Math.min(10, m.w * 0.026)}px ${MONO}`;
        ctx.fillText("MOTHER_CODE / SEALED_BACK", 20, 28);
        ctx.fillStyle = "rgba(246,243,236,0.92)";
        ctx.font = `700 ${Math.min(18, m.w * 0.046)}px ${SANS}`;
        ctx.fillText("封存这枚母码", 20, 70);
        ctx.fillStyle = "rgba(0,184,212,0.68)";
        ctx.font = `${Math.min(11, m.w * 0.029)}px ${MONO}`;
        ctx.fillText("惯性", 20, 128);
        ctx.fillStyle = "rgba(246,243,236,0.78)";
        ctx.font = `700 ${Math.min(15, m.w * 0.038)}px ${SANS}`;
        drawWrappedText(ctx, d.inertiaPattern, 20, 156, card.w - 40, 27);
        ctx.fillStyle = "rgba(0,184,212,0.68)";
        ctx.font = `${Math.min(11, m.w * 0.029)}px ${MONO}`;
        ctx.fillText("压力中的误用", 20, 244);
        ctx.fillStyle = "rgba(246,243,236,0.72)";
        ctx.font = `${Math.min(14, m.w * 0.036)}px ${SANS}`;
        drawWrappedText(ctx, d.misusePath || d.defenseMode, 20, 272, card.w - 40, 25);
        ctx.fillStyle = "rgba(199,169,107,0.78)";
        ctx.font = `${Math.min(10, m.w * 0.026)}px ${MONO}`;
        ctx.textAlign = "center";
        ctx.fillText("再次轻触，封存母码并进入惯性场", card.w / 2, card.h - 34);
      }
      ctx.restore();
    }

    function update(dt: number) {
      m.frames += 1;
      // 入场重凝：交接粒子向入场轴线汇聚
      seedIncoming();
      if (incoming.length) {
        incomingT += dt;
        const k = Math.min(1, dt * 3);
        incoming.forEach((p) => {
          p.x += (m.cx - p.x) * k;
          p.y += (m.h * 0.34 - p.y) * k;
        });
        if (incomingT > 0.7) incoming = [];
      }
      // 进场四拍·第一/二拍：黑屏停顿 + 物理脉冲（期间主时间轴不前进）
      if (m.voidT < VOID_MS && !m.sandifying) {
        m.voidT += dt;
        if (!m.pulsed && m.voidT > 0.16) {
          m.pulsed = true;
          vibrate(ENTRY_PULSE);
        }
        return;
      }
      if (m.sandifying) {
        m.sandT += dt;
        for (const p of m.particles) {
          p.vy += 320 * dt;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.alpha -= dt * 0.85;
        }
        m.particles = m.particles.filter((p) => p.alpha > 0);
        if (!m.advanced && m.sandT > 0.9) {
          m.advanced = true;
          continueRef.current();
        }
        return;
      }
      m.t += dt;
      if (m.t > IDLE_AT && m.frames >= 2) m.ready = true;
      if (m.cardPulse > 0) m.cardPulse = Math.max(0, m.cardPulse - dt * 2.8);
    }

    function draw(ctx: CanvasRenderingContext2D) {
      ctx.clearRect(0, 0, m.w, m.h);
      ctx.textBaseline = "middle";
      const leftX = m.w * 0.1;
      const t = m.t;

      // 深黑缓冲密度场：只服务本屏语义，不外溢为全局说明。
      const splitY = m.h * 0.34;
      const bg = ctx.createRadialGradient(m.cx, splitY, 0, m.cx, splitY, Math.max(m.w, m.h) * 0.7);
      bg.addColorStop(0, "rgba(0,80,116,0.075)");
      bg.addColorStop(0.55, "rgba(0,86,116,0.035)");
      bg.addColorStop(1, "rgba(2,3,6,0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, m.w, m.h);

      // 入场重凝粒子（来自上一屏沙化，向入场轴线汇聚后隐没）
      if (incoming.length) {
        const ia = Math.max(0, 1 - incomingT / 0.7);
        incoming.forEach((p) => {
          ctx.globalAlpha = ia;
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x - 0.7, p.y - 0.7, 1.6, 1.6);
        });
        ctx.globalAlpha = 1;
      }

      // VOID：黑屏停顿，仅中部蓄势 1px 种子线（线尚未显影）
      if (m.voidT < VOID_MS) {
        const beat = Math.abs(Math.sin(m.voidT * 16));
        ctx.fillStyle = BLUE;
        ctx.globalAlpha = 0.1 + 0.2 * beat;
        ctx.fillRect(m.cx - 8, m.h * 0.34 - 0.5, 16, 1);
        ctx.globalAlpha = 1;
        return;
      }

      const topY = m.h * 0.13;

      ctx.textAlign = "left";
      if (!m.sandifying) {
        ctx.globalAlpha = 0.66;
        ctx.fillStyle = "rgba(246,243,236,0.58)";
        ctx.font = `${Math.min(10, m.w * 0.026)}px ${MONO}`;
        ctx.fillText("02 ｜ MOTHER CODE · SEALING", leftX, m.h * 0.095);
        ctx.globalAlpha = 1;
      }

      // ④ 认知句：浮现 → 坍缩落入最上方
      const sentE = smooth(SENT_AT, SENT_DONE, t);
      const sentTop = smooth(TOP_AT, TOP_DONE, t);
      if (sentE > 0.01 && !m.sandifying) {
        const sy = lerp(splitY, topY, sentTop);
        const fs = Math.min(21, m.w * 0.052) * (1 - 0.14 * sentTop);
        ctx.font = `${fs}px ${SANS}`;
        ctx.fillStyle = "rgba(246,243,236,0.96)";
        const lines = wrap(ctx, dataRef.current.cognition.replace(/[。.]+$/, ""), m.w * 0.8);
        const lh = fs * 1.45;
        let yy = sy - ((lines.length - 1) * lh) / 2;
        lines.forEach((ln) => {
          ctx.globalAlpha = sentE;
          ctx.fillText(ln, leftX, yy);
          yy += lh;
        });
        ctx.globalAlpha = 1;
      }

      const cardAlpha = m.sandifying ? Math.max(0, 1 - m.sandT * 1.5) : smooth(CARD_AT, CARD_AT + 0.7, t);
      if (cardAlpha > 0.01) drawMotherCard(ctx, m.cardSide, cardAlpha);

      // 缓冲读数沙化粒子（金 + 蓝 + 灰 层次）
      if (m.sandifying) {
        const sandCols = [GOLD, BLUE, "#6b6b6b"];
        m.particles.forEach((p, i) => {
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = sandCols[i % 3] ?? GOLD;
          ctx.fillRect(p.x - 0.6, p.y - 0.6, 1.6, 1.6);
        });
        ctx.globalAlpha = 1;
      }

      if (m.ready && !m.sandifying) {
        ctx.textAlign = "center";
        ctx.fillStyle = m.cardSide === "back" ? "rgba(199,169,107,0.58)" : "rgba(246,243,236,0.36)";
        ctx.font = `${Math.min(10, m.w * 0.026)}px ${MONO}`;
        ctx.fillText(m.cardSide === "back" ? "轻触背面封存" : "轻触母码卡翻面", m.cx, m.h * 0.88);
      }
    }

    function frame(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      update(dt);
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx) draw(ctx);
      raf = requestAnimationFrame(frame);
    }

    function localX(e: PointerEvent) {
      const r = canvas!.getBoundingClientRect();
      return e.clientX - r.left;
    }

    function onPointerDown(e: PointerEvent) {
      if (!m.ready || m.sandifying) return;
      const x = localX(e);
      const y = e.clientY - canvas!.getBoundingClientRect().top;
      const card = getCardRect();
      if (x < card.x || x > card.x + card.w || y < card.y || y > card.y + card.h) return;
      if (m.cardSide === "front") {
        m.cardSide = "back";
        m.cardPulse = 1;
        vibrate(10);
        return;
      }
      startSandify();
    }

    function onPointerUp() {
      return;
    }

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  return (
    <GyMobilePreviewFrame background="#020306">
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block", touchAction: "none" }}
      />
    </GyMobilePreviewFrame>
  );
}
