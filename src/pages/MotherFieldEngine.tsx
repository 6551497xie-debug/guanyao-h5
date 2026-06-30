// GUANYAO 2.0 = immutable causal engine with layered perceptual enhancement system that improves user understanding without modifying underlying logic.
// Axis System = causal line with discrete semantic markers used for progressive psychological
//   state revelation and final event-driven transition（三标尺点 原力/保护/误用，100% 触发转场）。
// GUANYAO 2.0 = single axis-based interaction grammar system. 本屏角色：axis rupture input only
//   （唯一输入 = axis drag：横向拖动推进三阶 → 100% 推进转场；无 tap、无混合手势）。
//
// GUANYAO 2.0 —— 原力解构场（The Split · 1px 水平生命轴的细胞割裂形变）
//
// 物理本质：1px 水平生命轴在屏幕中部「向上下割裂 1px」拉开一条裂缝视窗（The Split），
//   行为真相从裂缝深渊平滑淡入鐫刻而出。无蓝色方框 / 无点选按钮 / 无容器。
// 交互（物理阻尼滤网）：底部一根横贯全屏的 1px 骨灰色轨道，线上挂冷蓝行为标记准星（圆点）。
//   用户按住圆点向右拖拽 —— 不点按钮。每滑过 33% 发生一次高压「因果切换」：
//     0–33%  【 原力 】   34–66% 【 保护 】（咔哒齿轮微震）   67–100% 【 误用 】
// 点火转场：推到 100% → 马达强震 + 冷金线与文本垂直沙化下坠 → 砸进压力种子。
// 严格用户驱动 + 渲染门控：首帧未稳不可拖拽；单轴拖拽完成即生成种子并转场。
//
// ENTRY EVENT（入场即物理事件，内容必从裂缝浮现）：
//   VOID(黑屏停顿~440ms + 低频马达脉冲) → OPENING(中部 1px 割裂开窗) → 内容从裂缝浮现 → SCRUB。
//   100% 锁止：裂缝「闭合」凝成单条冷金轴（非单纯变色）。
// MotherFieldEngine = isolated rupture scope; content emerges here and does not inherit adjacent screen labels.

import { useEffect, useRef } from "react";
import { GyMobilePreviewFrame } from "../components/visual/GyMobilePreviewFrame";
import { setAxisHandoff, takeAxisHandoff } from "../systems/axisHandoff";

export type MotherField = { tag: string; title: string; body: string };

export type PressureSeedPacket = {
  motherCode: string;
  defaultDefensePattern: string;
  flowState: string;
  protectionState: string;
  collapseState: string;
  inertiaSignature: string;
};

type Phase = "VOID" | "OPENING" | "SCRUB" | "SANDIFY";

type Particle = { x: number; y: number; vx: number; vy: number; alpha: number };

type Model = {
  w: number;
  h: number;
  cx: number;
  cy: number;
  trackY: number;
  trackX0: number;
  trackX1: number;
  phase: Phase;
  voidT: number; // 入场黑屏停顿计时
  openT: number; // 割裂开窗进度 0..1
  splitGap: number; // 裂缝半高
  progress: number; // 滑轨进度 0..1
  stage: number; // 0/1/2
  switchT: number; // 因果切换淡入计时
  dragging: boolean;
  lastX: number;
  goldMix: number; // 锁止后 0→1 转冷金
  lockT: number;
  particles: Particle[];
  fieldReady: boolean; // Render Gate：首帧 draw + rAF 活跃后才置 true
  fired: boolean;
};

const MONO = "SFMono-Regular, Menlo, Monaco, Consolas, monospace";
const SANS = "-apple-system, system-ui, sans-serif";
const BLUE = "#00B8D4";
const GOLD = "#C7A96B";
const BONE = "rgba(246,243,236,0.42)";
const ROMAN = ["Ⅰ", "Ⅱ", "Ⅲ"];
const OPEN_GAP = 74;
const FIELD_DISPLAY_TITLES: Record<string, string> = {
  原力: "你的底色",
  保护: "你的默认保护",
  误用: "你的惯性放弃",
};

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
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

function stageOf(progress: number) {
  return progress < 0.34 ? 0 : progress < 0.67 ? 1 : 2;
}

export function MotherFieldEngine({
  motherCode,
  tagline,
  fields,
  onCausalLock,
}: {
  motherCode: string;
  tagline: string;
  fields: MotherField[];
  onCausalLock: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dataRef = useRef({ motherCode, tagline, fields });
  dataRef.current = { motherCode, tagline, fields };
  const lockRef = useRef(onCausalLock);
  lockRef.current = onCausalLock;

  const modelRef = useRef<Model>({
    w: 0,
    h: 0,
    cx: 0,
    cy: 0,
    trackY: 0,
    trackX0: 0,
    trackX1: 0,
    phase: "VOID",
    voidT: 0,
    openT: 0,
    splitGap: 0,
    progress: 0,
    stage: 0,
    switchT: 1,
    dragging: false,
    lastX: 0,
    goldMix: 0,
    lockT: 0,
    particles: [],
    fieldReady: false,
    fired: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const m = modelRef.current;
    let raf = 0;
    let last = performance.now();

    // 一线贯穿：上一屏沙化粒子入场重凝至本屏裂缝中轴（m.cy）
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
      m.cy = rect.height * 0.45;
      m.trackY = rect.height * 0.78;
      m.trackX0 = rect.width * 0.08;
      m.trackX1 = rect.width * 0.92;
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

    function hashStr(s: string) {
      let h = 0;
      for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
      return (h >>> 0).toString(16).toUpperCase();
    }

    function enterSandify() {
      if (m.fired) return;
      m.fired = true;
      m.phase = "SANDIFY";
      m.lockT = 0;
      // 沙化粒子：冷金文本/线垂直下坠
      const list: Particle[] = [];
      for (let i = 0; i < 130; i++) {
        list.push({
          x: m.trackX0 + Math.random() * (m.trackX1 - m.trackX0),
          y: m.cy + (Math.random() - 0.5) * 120,
          vx: (Math.random() - 0.5) * 20,
          vy: Math.random() * 60 + 40,
          alpha: 0.7 + Math.random() * 0.3,
        });
      }
      m.particles = list;
      // 粒子守恒：把本屏沙化粒子（金+蓝+灰）交给下一屏
      setAxisHandoff(
        list.map((p, i) => ({ fx: p.x / m.w, fy: p.y / m.h, vx: p.vx, vy: p.vy, color: ["#C7A96B", "#00B8D4", "#6b6b6b"][i % 3] ?? "#C7A96B" })),
      );
      // 生成压力种子（单轴完成时固化）
      const d = dataRef.current;
      const packet: PressureSeedPacket = {
        motherCode: d.motherCode,
        defaultDefensePattern: d.fields[1]?.body ?? "",
        flowState: d.fields[0]?.body ?? "",
        protectionState: d.fields[1]?.body ?? "",
        collapseState: d.fields[2]?.body ?? "",
        inertiaSignature: `GY_INERTIA_${hashStr(d.fields.map((f) => f.body).join("|"))}`,
      };
      try {
        window.localStorage.setItem("guanyao:pressureSeedPacket", JSON.stringify(packet));
      } catch {
        /* storage unavailable */
      }
      vibrate(24);
    }

    function update(dt: number, now: number) {
      void now;
      m.switchT = Math.min(1, m.switchT + dt * 5);

      // 入场重凝：上一屏交接粒子汇聚至裂缝中轴
      seedIncoming();
      if (incoming.length) {
        incomingT += dt;
        const k = Math.min(1, dt * 3);
        incoming.forEach((p) => {
          p.x += (m.cx - p.x) * k;
          p.y += (m.cy - p.y) * k;
        });
        if (incomingT > 0.7) incoming = [];
      }

      if (m.phase === "VOID") {
        // 黑屏停顿 + 物理脉冲后，才割裂开窗
        m.voidT += dt;
        if (m.voidT > 0.44) m.phase = "OPENING";
        return;
      }

      if (m.phase === "OPENING") {
        m.openT = Math.min(1, m.openT + dt * 1.8);
        m.splitGap = OPEN_GAP * (0.5 - 0.5 * Math.cos(Math.PI * m.openT)); // 平滑拉开
        if (m.openT >= 1) {
          m.phase = "SCRUB";
          m.splitGap = OPEN_GAP;
        }
        return;
      }

      if (m.phase === "SANDIFY") {
        m.lockT += dt;
        m.goldMix = 1;
        for (const p of m.particles) {
          p.vy += 320 * dt;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.alpha -= dt * 0.85;
        }
        m.particles = m.particles.filter((p) => p.alpha > 0);
        if (m.lockT > 0.95) lockRef.current(); // 单轴完成→沙化完成→砸进压力种子
        return;
      }

      // SCRUB：进度由拖拽驱动；阶段切换
      const st = stageOf(m.progress);
      if (st !== m.stage) {
        m.stage = st;
        m.switchT = 0;
        vibrate(14); // 咔哒 · 齿轮微震
      }
      if (m.progress >= 0.99 && m.phase === "SCRUB") {
        m.dragging = false;
        vibrate([0, 40, 26, 60]); // 机芯死锁
        enterSandify();
      }
    }

    function draw(ctx: CanvasRenderingContext2D) {
      ctx.clearRect(0, 0, m.w, m.h);
      ctx.textBaseline = "middle";
      const leftX = m.w * 0.1;
      const lineColor = lerpHex(BLUE, GOLD, m.goldMix);
      const sandifying = m.phase === "SANDIFY";
      const d = dataRef.current;

      // 入场重凝粒子（来自上一屏沙化，向裂缝中轴汇聚后隐没；贯穿 VOID/OPENING）
      if (incoming.length) {
        const ia = Math.max(0, 1 - incomingT / 0.7);
        incoming.forEach((p) => {
          ctx.globalAlpha = ia;
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x - 0.7, p.y - 0.7, 1.6, 1.6);
        });
        ctx.globalAlpha = 1;
      }

      // VOID：黑屏停顿 + 物理脉冲（裂缝尚未开，禁止任何内容渲染）
      if (m.phase === "VOID") {
        const beat = Math.abs(Math.sin(m.voidT * 14));
        ctx.fillStyle = BLUE;
        ctx.globalAlpha = 0.1 + 0.22 * beat;
        ctx.fillRect(m.cx - 10, m.cy - 0.5, 20, 1); // 中部蓄势的 1px 种子线
        ctx.globalAlpha = 1;
        return;
      }

      // 宇宙蓝密度背光
      const bg = ctx.createRadialGradient(m.cx, m.cy, 0, m.cx, m.cy, Math.max(m.w, m.h) * 0.7);
      bg.addColorStop(0, "rgba(0,90,120,0.16)");
      bg.addColorStop(0.5, "rgba(0,40,70,0.06)");
      bg.addColorStop(1, "rgba(2,3,3,0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, m.w, m.h);

      const contentFade = sandifying ? Math.max(0, 1 - m.lockT / 0.6) : 1;

      // 结构压印：母码名 // 标语（从裂缝鐫刻淡入）
      ctx.textAlign = "left";
      ctx.globalAlpha = 0.86 * m.openT * contentFade;
      ctx.fillStyle = lerpHex(BLUE, GOLD, m.goldMix);
      ctx.font = `${Math.min(12, m.w * 0.03)}px ${MONO}`;
      ctx.fillText("03 ｜ 原力解构", leftX, m.h * 0.12);

      // 母码名（认知句主场已归 Reaction，本屏不复读标语）
      ctx.globalAlpha = 0.9 * m.openT * contentFade;
      ctx.fillStyle = lerpHex(BLUE, GOLD, m.goldMix);
      ctx.font = `${Math.min(17, m.w * 0.044)}px ${MONO}`;
      ctx.fillText(d.motherCode, leftX, m.h * 0.2);
      ctx.globalAlpha = 1;

      // 裂缝视窗：上下 1px 割裂
      const s0 = m.cy - m.splitGap;
      const s1 = m.cy + m.splitGap;
      ctx.strokeStyle = lineColor;
      ctx.globalAlpha = (sandifying ? contentFade : 0.9) * Math.min(1, m.openT * 1.4);
      [s0, s1].forEach((sy) => {
        ctx.beginPath();
        ctx.moveTo(m.w * 0.08, sy);
        ctx.lineTo(m.w * 0.92, sy);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;

      // 裂缝内：当前阶段真相（title + body 从深渊浮现；裂缝闭合时随之淡出）
      if (m.phase === "SCRUB") {
        const field = d.fields[m.stage];
        if (field) {
          const sw = clamp(m.switchT, 0, 1);
          const gapFade = clamp(m.splitGap / OPEN_GAP, 0, 1); // 裂缝闭合 → 文字淡出
          const rise = (1 - sw) * 10;
          ctx.textAlign = "left";
          ctx.font = `${Math.min(18, m.w * 0.046)}px ${MONO}`;
          const titleY = m.cy - 22 + rise;
          const hi = lerpHex(BLUE, GOLD, m.goldMix);
          const displayTitle = FIELD_DISPLAY_TITLES[field.tag] ?? field.title;
          ctx.globalAlpha = sw * gapFade;
          ctx.fillStyle = hi;
          ctx.fillText(displayTitle, leftX, titleY);
          const fs = Math.min(16, m.w * 0.04);
          ctx.font = `${fs}px ${SANS}`;
          ctx.fillStyle = "rgba(246,243,236,0.95)";
          let ty = m.cy + 8 + rise;
          const fieldBody =
            field.tag === "保护"
              ? "压力还没来之前，你会先缓和，再转开，尽量让场面不要僵住。"
              : field.body.replace(/^你的(?:底色|原力流动|默认防御|默认保护|惯性放弃)：?/, "");
          wrap(ctx, fieldBody, m.w * 0.8).forEach((ln) => {
            ctx.globalAlpha = sw * gapFade * 0.95;
            ctx.fillText(ln, leftX, ty);
            ty += fs * 1.5;
          });
          ctx.globalAlpha = 1;
        }
      }

      // 沙化粒子
      if (sandifying) {
        const sandCols = [GOLD, BLUE, "#6b6b6b"]; // 金 + 蓝 + 灰 层次
        m.particles.forEach((p, i) => {
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = sandCols[i % 3] ?? GOLD;
          ctx.fillRect(p.x - 0.6, p.y - 0.6, 1.6, 1.6);
        });
        ctx.globalAlpha = 1;
      }

      if (m.phase === "OPENING" || sandifying) return;

      // 底部 1px 骨灰轨道 + 已解构填充 + 冷蓝准星
      const dotX = m.trackX0 + (m.trackX1 - m.trackX0) * m.progress;
      ctx.strokeStyle = BONE;
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.moveTo(m.trackX0, m.trackY);
      ctx.lineTo(m.trackX1, m.trackY);
      ctx.stroke();
      ctx.strokeStyle = lineColor;
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.moveTo(m.trackX0, m.trackY);
      ctx.lineTo(dotX, m.trackY);
      ctx.stroke();

      // 三个语义标尺点：原力 → 保护 → 误用，权重/强度自左向右递增（无等量强调）
      [1 / 6, 1 / 2, 5 / 6].forEach((f, i) => {
        const mx = m.trackX0 + (m.trackX1 - m.trackX0) * f;
        const active = i === m.stage;
        const heat = i / 2; // 0 / 0.5 / 1 —— 越右越重（色温→金）
        const mc = lerpHex(BLUE, GOLD, clamp(heat * 0.7 + m.goldMix * 0.3, 0, 1));
        const rBase = 2 + i * 1.4; // 半径递增：2.0 / 3.4 / 4.8
        const aBase = 0.3 + i * 0.16; // 透明度递增：0.30 / 0.46 / 0.62
        if (active) {
          const pulse = 0.6 + 0.4 * Math.sin(performance.now() / 360);
          ctx.fillStyle = mc;
          ctx.globalAlpha = Math.min(1, 0.7 + 0.3 * pulse);
          ctx.beginPath();
          ctx.arc(mx, m.trackY, rBase + 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 0.32;
          ctx.strokeStyle = mc;
          ctx.beginPath();
          ctx.arc(mx, m.trackY, rBase + 7, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          ctx.fillStyle = mc;
          ctx.globalAlpha = aBase;
          ctx.beginPath();
          ctx.arc(mx, m.trackY, rBase, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      });

      // 单一蓝色 cursor：只表达交互位置，不承载阶段状态。
      ctx.fillStyle = BLUE;
      ctx.globalAlpha = m.phase === "SCRUB" ? 0.86 : 1;
      ctx.beginPath();
      ctx.arc(dotX, m.trackY, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      // 机械铭牌钢印（贴轴靠左）
      ctx.textAlign = "left";
      ctx.fillStyle = lerpHex(BLUE, GOLD, m.goldMix);
      ctx.globalAlpha = 0.7;
      ctx.font = `${Math.min(11, m.w * 0.028)}px ${MONO}`;
      const tagName = d.fields[m.stage]?.tag ?? "原力";
      ctx.fillText(`［ ${ROMAN[m.stage] ?? "Ⅰ"} · ${tagName}解构 ］`, leftX, m.trackY - 18);
      // 进度
      ctx.textAlign = "right";
      ctx.fillStyle = "rgba(0,184,212,0.6)";
      ctx.fillText(`${Math.round(m.progress * 100)}%`, m.trackX1, m.trackY - 18);
      ctx.globalAlpha = 1;

      if (m.phase === "SCRUB") {
        // 拖拽引导
        ctx.textAlign = "left";
        ctx.globalAlpha = 0.48;
        ctx.fillStyle = "rgba(246,243,236,0.8)";
        ctx.font = `${Math.min(12, m.w * 0.03)}px ${MONO}`;
        ctx.fillText("按住圆点 · 向右压缩为压力种子", leftX, m.trackY + 26);
        ctx.globalAlpha = 1;
      }
    }

    function frame(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      update(dt, now);
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx) {
        draw(ctx);
        m.fieldReady = true;
      }
      raf = requestAnimationFrame(frame);
    }

    function localXY(e: PointerEvent) {
      const r = canvas!.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    function onPointerDown(e: PointerEvent) {
      if (!m.fieldReady) return;
      const { x } = localXY(e);
      try {
        canvas!.setPointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
      if (m.phase === "SCRUB") {
        m.dragging = true;
        m.lastX = x;
      }
    }

    function onPointerMove(e: PointerEvent) {
      if (!m.dragging || m.phase !== "SCRUB") return;
      const { x } = localXY(e);
      const width = m.trackX1 - m.trackX0;
      if (width > 0) m.progress = clamp(m.progress + (x - m.lastX) / width, 0, 1);
      m.lastX = x;
    }

    function onPointerUp(e: PointerEvent) {
      m.dragging = false;
      try {
        canvas!.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
    }

    resize();
    vibrate([0, 18, 90, 26, 70, 34]); // 低频马达脉冲 · 1–2 拍机械搏动（VOID 内）
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
    <GyMobilePreviewFrame background="#020306">
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block", touchAction: "none" }}
      />
    </GyMobilePreviewFrame>
  );
}
