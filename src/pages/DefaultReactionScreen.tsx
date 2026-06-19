// This screen = a physical collapse system. 编排（承接上屏沙化 → 母码卡沙化进下屏）：
//   ① 金色一字轴入场（承接上一页沙化）
//   ② 一字轴裂开成两条线
//   ③ 认知句出现（裂缝中）
//   ④ 认知句坍缩「落入最上方」并定位
//   ⑤ 两条线「沉积生成」母码卡
//   ⑥ 一字轴下沉至底部，凝成灰色闸门线
//   ⑦ 右滑蓝点，闸门一字轴逐渐变蓝
//   ⑧ 母码卡沙化 → 进入下一屏（仅用户右滑触发）
// 无 UI 卡片/盒子/按钮；信息全部从裂缝/轴线生成。

import { useEffect, useRef } from "react";

const MONO = "SFMono-Regular, Menlo, Monaco, Consolas, monospace";
const SANS = "-apple-system, system-ui, sans-serif";
const BLUE = "#00B8D4";
const GOLD = "#C7A96B";
const GRAY = "#555555";

// 时间轴（秒）
const ENTER_DONE = 0.5; // 金轴入场
const SPLIT_AT = 0.5;
const SPLIT_DONE = 1.1; // 裂成两线
const SENT_AT = 1.2;
const SENT_DONE = 2.0; // 认知句浮现
const TOP_AT = 2.15;
const TOP_DONE = 2.95; // 认知句坍缩落入最上方
const CARD_AT = 3.0;
const LINE_STEP = 0.3; // 母码卡逐行沉积
const DROP_AT = 4.7;
const DROP_DONE = 5.4; // 轴线下沉成灰闸门
const IDLE_AT = 5.5;
const SWIPE_DONE = 0.97;

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
function lerpHex(a: string, b: string, t: number): string {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const k = clamp(t, 0, 1);
  const r = Math.round(((pa >> 16) & 255) + (((pb >> 16) & 255) - ((pa >> 16) & 255)) * k);
  const g = Math.round(((pa >> 8) & 255) + (((pb >> 8) & 255) - ((pa >> 8) & 255)) * k);
  const bl = Math.round((pa & 255) + ((pb & 255) - (pa & 255)) * k);
  return `rgb(${r}, ${g}, ${bl})`;
}

type Particle = { x: number; y: number; vx: number; vy: number; alpha: number };

type Model = {
  w: number;
  h: number;
  cx: number;
  t: number;
  frames: number;
  ready: boolean;
  swipe: number;
  dragging: boolean;
  lastX: number;
  sandifying: boolean;
  sandT: number;
  particles: Particle[];
  advanced: boolean;
};

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
    swipe: 0,
    dragging: false,
    lastX: 0,
    sandifying: false,
    sandT: 0,
    particles: [],
    advanced: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const m = modelRef.current;
    let raf = 0;
    let last = performance.now();
    let droppedBeat = false;

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

    // 母码卡沉积布局（返回每行 baseY 与字段）
    function cardRows() {
      const d = dataRef.current;
      return [
        { label: "母码", value: d.motherCode, head: true },
        { label: "默认反应链", value: d.reactionChain },
        { label: "惯性", value: d.inertiaPattern },
        { label: "防御", value: d.defenseMode },
        { label: "误用", value: d.misusePath },
      ];
    }

    function startSandify() {
      if (m.sandifying) return;
      m.sandifying = true;
      m.sandT = 0;
      const list: Particle[] = [];
      for (let i = 0; i < 120; i++) {
        list.push({
          x: m.w * 0.1 + Math.random() * m.w * 0.8,
          y: m.h * 0.46 + Math.random() * m.h * 0.24,
          vx: (Math.random() - 0.5) * 24,
          vy: Math.random() * 70 + 40,
          alpha: 0.7 + Math.random() * 0.3,
        });
      }
      m.particles = list;
      vibrate([0, 26, 18, 40]);
    }

    function update(dt: number) {
      m.frames += 1;
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
      if (!droppedBeat && m.t > DROP_AT) {
        droppedBeat = true;
        vibrate(16); // 闸门落位
      }
      if (m.t > IDLE_AT && m.frames >= 2) m.ready = true;
      // 右滑回弹
      if (!m.dragging && m.swipe < SWIPE_DONE) m.swipe += (0 - m.swipe) * Math.min(1, dt * 8);
    }

    function draw(ctx: CanvasRenderingContext2D) {
      ctx.clearRect(0, 0, m.w, m.h);
      ctx.textBaseline = "middle";
      const leftX = m.w * 0.1;
      const t = m.t;

      // 深黑宇宙密度场
      const splitY = m.h * 0.34;
      const bg = ctx.createRadialGradient(m.cx, splitY, 0, m.cx, splitY, Math.max(m.w, m.h) * 0.7);
      bg.addColorStop(0, "rgba(0,86,116,0.12)");
      bg.addColorStop(0.55, "rgba(0,36,64,0.05)");
      bg.addColorStop(1, "rgba(2,3,6,0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, m.w, m.h);

      const topY = m.h * 0.13;
      const cardY = m.h * 0.42;
      const gateY = m.h * 0.8;
      const trackX0 = m.w * 0.08;
      const trackX1 = m.w * 0.92;

      const enter = smooth(0, ENTER_DONE, t);
      const split = smooth(SPLIT_AT, SPLIT_DONE, t);
      const drop = smooth(DROP_AT, DROP_DONE, t);
      const lineY = lerp(splitY, gateY, drop);
      const gap = 30 * split * (1 - drop);
      const lineColor = lerpHex(GOLD, GRAY, drop);

      ctx.textAlign = "left";

      // ④ 认知句：浮现 → 坍缩落入最上方
      const sentE = smooth(SENT_AT, SENT_DONE, t);
      const sentTop = smooth(TOP_AT, TOP_DONE, t);
      if (sentE > 0.01 && !m.sandifying) {
        const sy = lerp(splitY, topY, sentTop);
        const fs = Math.min(21, m.w * 0.052) * (1 - 0.14 * sentTop);
        ctx.font = `${fs}px ${SANS}`;
        ctx.fillStyle = "rgba(246,243,236,0.96)";
        const lines = wrap(ctx, dataRef.current.cognition, m.w * 0.8);
        const lh = fs * 1.45;
        let yy = sy - ((lines.length - 1) * lh) / 2;
        lines.forEach((ln) => {
          ctx.globalAlpha = sentE;
          ctx.fillText(ln, leftX, yy);
          yy += lh;
        });
        ctx.globalAlpha = 1;
      }

      // ⑤ 两条线沉积生成母码卡（吸收 sentence 落位后开始）
      if (!m.sandifying) {
        let slot = cardY;
        cardRows().forEach((row, i) => {
          const a = smooth(CARD_AT + i * LINE_STEP, CARD_AT + i * LINE_STEP + 0.6, t);
          if (a <= 0.01) return;
          const baseY = lerp(splitY, slot, a); // 从轴线下沉至沉积位
          ctx.font = `${Math.min(11, m.w * 0.028)}px ${MONO}`;
          ctx.fillStyle = lerpHex(GOLD, BLUE, drop * 0.5);
          ctx.globalAlpha = a * 0.7;
          ctx.fillText(row.label, leftX, baseY);
          const vfs = row.head ? Math.min(18, m.w * 0.046) : Math.min(14, m.w * 0.036);
          ctx.font = row.head ? `${vfs}px ${MONO}` : `${vfs}px ${SANS}`;
          ctx.fillStyle = row.head ? lerpHex(GOLD, "#F6F3EC", 0.2) : "rgba(246,243,236,0.9)";
          ctx.globalAlpha = a * (row.head ? 0.96 : 0.9);
          const vlines = wrap(ctx, row.value || "尚未浮现", m.w * 0.82);
          let vy = baseY + (row.head ? 20 : 16);
          vlines.forEach((ln) => {
            ctx.fillText(ln, leftX, vy);
            vy += vfs * 1.38;
          });
          ctx.globalAlpha = 1;
          slot += (row.head ? 20 : 16) + vlines.length * vfs * 1.38 + (row.head ? 10 : 7);
        });
      }

      // 母码卡沙化粒子
      if (m.sandifying) {
        ctx.fillStyle = GOLD;
        for (const p of m.particles) {
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillRect(p.x - 0.6, p.y - 0.6, 1.6, 1.6);
        }
        ctx.globalAlpha = 1;
      }

      // ①②⑥ 一字轴：金轴入场 → 裂成两线 → 下沉成灰闸门
      ctx.strokeStyle = lineColor;
      ctx.globalAlpha = (m.sandifying ? Math.max(0, 1 - m.sandT) : 0.85) * Math.max(enter, split);
      [lineY - gap, lineY + gap].forEach((sy) => {
        ctx.beginPath();
        ctx.moveTo(trackX0, sy);
        ctx.lineTo(trackX1, sy);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;

      // ⑦ 灰闸门 + 右滑蓝点（drop 完成后）
      if (drop > 0.92 && !m.sandifying) {
        const dotX = trackX0 + (trackX1 - trackX0) * m.swipe;
        // 蓝色填充（随右滑渐变）
        ctx.strokeStyle = BLUE;
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.moveTo(trackX0, gateY);
        ctx.lineTo(dotX, gateY);
        ctx.stroke();
        // 蓝点（呼吸引导）
        const pulse = 0.6 + 0.4 * Math.sin(performance.now() / 360);
        ctx.fillStyle = BLUE;
        ctx.globalAlpha = m.ready ? pulse : 0.5;
        ctx.beginPath();
        ctx.arc(dotX, gateY, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        ctx.arc(dotX, gateY, 12, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
        // 提示
        if (m.ready) {
          ctx.textAlign = "left";
          ctx.fillStyle = "rgba(246,243,236,0.7)";
          ctx.globalAlpha = 0.4 + 0.3 * pulse;
          ctx.font = `${Math.min(12, m.w * 0.03)}px ${MONO}`;
          ctx.fillText(m.swipe > 0.05 ? `认领中 ${Math.round(m.swipe * 100)}%` : "右滑认领母码卡", leftX, gateY + 24);
          ctx.globalAlpha = 1;
        }
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
      m.dragging = true;
      m.lastX = localX(e);
    }

    function onPointerMove(e: PointerEvent) {
      if (!m.dragging) return;
      const x = localX(e);
      const width = (m.w * 0.92 - m.w * 0.08) * 0.85;
      if (width > 0) m.swipe = clamp(m.swipe + (x - m.lastX) / width, 0, 1);
      m.lastX = x;
      if (m.swipe >= SWIPE_DONE) startSandify();
    }

    function onPointerUp() {
      m.dragging = false;
    }

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, background: "#020306", overflow: "hidden" }}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block", touchAction: "none" }}
      />
    </div>
  );
}
