// GUANYAO 2.0 = immutable causal engine with layered perceptual enhancement system that improves user understanding without modifying underlying logic.
// GUANYAO 2.0 = single axis-based interaction grammar system —— all screens share one
//   causal input language with role-based constraints. 本屏角色：axis ignition input only
//   （axis drag：纵=state modulation / 横=causal progression；无 tap）。
//
// Axis System = dual 1px physical instruments converting human interaction into
// temporal frequency lock + inertia generation.
//
// GUANYAO 2.0 SECOND SCREEN —— 十字双轴：
//   · TUNING AXIS（纵向调频天线，置于右侧便于右手滑动）：垂直拨动 → 年/月/日/时调频。
//   · CLUTCH RAIL（横向换挡轨，底部）：右滑卡扣 → 锁止当前维度；两轴相交成十字。
// 文案层：顶部「02 ｜ 生命起点」+ 断言打字机（进入后落位常驻）+ 调频/滑动提示。
// State machine: TYPING → TUNING → ALL_LOCKED → SANDIFY。
// SANDIFY 完成 → emit ORIGIN_LOCKED + onChronoLock()（现实结晶）。
// System = discrete state machine with continuous physical transition layer between states.

import { useEffect, useRef } from "react";
import { axisLineSystem } from "../systems/axisLineSystem";

export type ChronoCoords = { year: number; month: number; day: number; periodIndex: number };

type EngineState = "TYPING" | "TUNING" | "ALL_LOCKED" | "SANDIFY";

type Particle = { x: number; y: number; vx: number; vy: number; alpha: number };

const PERIOD_LABELS = [
  "子时",
  "丑时",
  "寅时",
  "卯时",
  "辰时",
  "巳时",
  "午时",
  "未时",
  "申时",
  "酉时",
  "戌时",
  "亥时",
];

// 用户认得的是出生「时段」（钟点区间）；地支（子时…酉时）由时段反算
const PERIOD_RANGES = [
  "23:00—01:00",
  "01:00—03:00",
  "03:00—05:00",
  "05:00—07:00",
  "07:00—09:00",
  "09:00—11:00",
  "11:00—13:00",
  "13:00—15:00",
  "15:00—17:00",
  "17:00—19:00",
  "19:00—21:00",
  "21:00—23:00",
];

const MIN_YEAR = 1950;
const MAX_YEAR = 2008;
const MONO = "SFMono-Regular, Menlo, Monaco, Consolas, monospace";
const SANS = "-apple-system, system-ui, sans-serif";

const TYPING_LINES = ["有些行为，不是这一刻才出现的。", "它提前藏在你最初诞生的时空代码里。"];
const TYPE_MS_PER_CHAR = 32;
const TYPE_HOLD_MS = 560;

const ROW_H = 52;
const RAIL_SNAP = 0.96;
const COLOR = { gray: "#555555", blue: "#00B8D4", gold: "#C7A96B", bone: "rgba(246,243,236,0.5)", white: "#F6F3EC" };
const GOLD_DENSE = "#D4B777";

const DIMS = ["year", "month", "day", "hour"] as const;
type Dim = (typeof DIMS)[number];

const DIM_LABEL: Record<Dim, string> = { year: "年", month: "月", day: "日", hour: "时" };
const STAGE_ROMAN = ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ"];
const STAGE_NAME: Record<Dim, string> = {
  year: "年份定位",
  month: "月份定位",
  day: "日期定位",
  hour: "时段定位",
};

function pad2(v: number) {
  return String(v).padStart(2, "0");
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}

function smooth(e0: number, e1: number, x: number) {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
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

type EngineModel = {
  state: EngineState;
  stateEnteredAt: number;
  w: number;
  h: number;
  cl: number; // 居中内容框左边界
  cw: number; // 居中内容框宽度
  axisX: number;
  axisTop: number;
  axisBottom: number;
  railY: number;
  railX0: number;
  railX1: number;
  coords: ChronoCoords;
  lockedCount: number;
  dialFloat: number;
  dialVel: number;
  gesture: "tune" | "rail" | null;
  lastY: number;
  railProgress: number;
  clutched: boolean;
  typeChars: number;
  particles: Particle[];
  goldMix: number;
  transitionPulse: number;
  fired: boolean;
};

function dimRange(coords: ChronoCoords, dim: Dim) {
  if (dim === "year") return { min: MIN_YEAR, max: MAX_YEAR };
  if (dim === "month") return { min: 1, max: 12 };
  if (dim === "day") return { min: 1, max: daysInMonth(coords.year, coords.month) };
  return { min: 0, max: PERIOD_LABELS.length - 1 };
}

function dimValue(coords: ChronoCoords, dim: Dim) {
  if (dim === "year") return coords.year;
  if (dim === "month") return coords.month;
  if (dim === "day") return coords.day;
  return coords.periodIndex;
}

function dimText(coords: ChronoCoords, dim: Dim, value: number): string {
  if (dim === "year") return String(value);
  if (dim === "hour") return PERIOD_LABELS[clamp(value, 0, 11)] ?? "午时";
  return String(value).padStart(2, "0");
}

export function ChronoAxisDualEngine({
  initialCoords,
  location = "广州",
  onChronoLock,
}: {
  initialCoords: ChronoCoords;
  // 方位：由手机地理位置捕捉（默认广州；反向地理编码需外部服务，暂以默认值兜底）
  location?: string;
  onChronoLock: (coords: ChronoCoords) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lockRef = useRef(onChronoLock);
  lockRef.current = onChronoLock;
  const initialRef = useRef(initialCoords);
  const locationRef = useRef(location);
  locationRef.current = location;

  const modelRef = useRef<EngineModel>({
    state: "TYPING",
    stateEnteredAt: 0,
    w: 0,
    h: 0,
    cl: 0,
    cw: 0,
    axisX: 0,
    axisTop: 0,
    axisBottom: 0,
    railY: 0,
    railX0: 0,
    railX1: 0,
    coords: { ...initialCoords },
    lockedCount: 0,
    dialFloat: initialCoords.year,
    dialVel: 0,
    gesture: null,
    lastY: 0,
    railProgress: 0,
    clutched: false,
    typeChars: 0,
    particles: [],
    goldMix: 0,
    transitionPulse: 0,
    fired: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const m = modelRef.current;
    m.coords = { ...initialRef.current };
    m.dialFloat = m.coords.year;
    m.stateEnteredAt = performance.now();
    let raf = 0;
    let last = performance.now();

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
      // 居中内容框：整副十字轴收进一屏内的窄列，不铺满边缘
      const cw = Math.min(rect.width, 440);
      const cl = (rect.width - cw) / 2;
      m.cl = cl;
      m.cw = cw;
      // 纵向调频天线：作为「坐标卡尺」内移、靠近文字列、不贴手机边缘（调频在整屏任意处纵滑）。
      // 横向换挡轨在底部；两轴相交成十字，四边留白透气。
      m.axisX = cl + cw * 0.74;
      m.axisTop = rect.height * 0.3;
      m.axisBottom = rect.height * 0.84;
      m.railY = rect.height * 0.78;
      m.railX0 = cl + cw * 0.06;
      m.railX1 = cl + cw * 0.92;
    }

    function activeDim(): Dim {
      return DIMS[Math.min(m.lockedCount, DIMS.length - 1)] ?? "year";
    }

    function commitDial() {
      const dim = activeDim();
      const { min, max } = dimRange(m.coords, dim);
      const v = clamp(Math.round(m.dialFloat), min, max);
      const prev = dimValue(m.coords, dim);
      if (v === prev) return;
      if (dim === "year") {
        m.coords.year = v;
        m.coords.day = clamp(m.coords.day, 1, daysInMonth(v, m.coords.month));
      } else if (dim === "month") {
        m.coords.month = v;
        m.coords.day = clamp(m.coords.day, 1, daysInMonth(m.coords.year, v));
      } else if (dim === "day") {
        m.coords.day = v;
      } else {
        m.coords.periodIndex = v;
      }
      axisLineSystem.emitAxisEvent({ type: "FREQUENCY_TUNING", payload: { step: dim, value: v } });
    }

    function timeLock() {
      if (m.clutched || m.lockedCount >= DIMS.length) return;
      m.clutched = true;
      const dim = activeDim();
      m.dialFloat = dimValue(m.coords, dim);
      commitDial();
      axisLineSystem.emitAxisEvent({ type: "TIME_LOCK", payload: { dimension: dim, value: dimValue(m.coords, dim) } });
      vibrate([0, 22, 16, 30]); // 咔哒 — 机械闷音刚硬短震
      m.lockedCount += 1;
      m.transitionPulse = 1;
      m.gesture = null; // 立刻松开线轨 → 由弹性复归（0.2s）拉回最左端
      if (m.lockedCount >= DIMS.length) {
        m.state = "ALL_LOCKED";
        m.stateEnteredAt = performance.now();
      } else {
        m.dialFloat = dimValue(m.coords, activeDim());
        m.dialVel = 0;
      }
    }

    function emitOriginLocked() {
      const c = m.coords;
      const birthGravityVector = {
        x: (c.year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR),
        y: (c.month - 1) / 11,
        z: (c.day - 1) / 30,
        w: c.periodIndex / 11,
      };
      const temporalSignature = `GY_T_${c.year}${String(c.month).padStart(2, "0")}${String(c.day).padStart(2, "0")}_${c.periodIndex}`;
      axisLineSystem.emitAxisEvent({ type: "ORIGIN_LOCKED", payload: { birthGravityVector, temporalSignature } });
    }

    function spawnSandify() {
      const list: Particle[] = [];
      for (let i = 0; i < 120; i++) {
        const onAxis = i % 2 === 0;
        const x = onAxis ? m.axisX : m.railX0 + Math.random() * (m.railX1 - m.railX0);
        const y = onAxis ? m.axisTop + Math.random() * (m.axisBottom - m.axisTop) : m.railY;
        list.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 60,
          vy: Math.random() * 80 + 20,
          alpha: 0.7 + Math.random() * 0.3,
        });
      }
      m.particles = list;
    }

    function finish() {
      if (m.fired) return;
      m.fired = true;
      lockRef.current({ ...m.coords });
    }

    function update(dt: number, now: number) {
      const targetGold = m.state === "ALL_LOCKED" || m.state === "SANDIFY" ? 1 : 0;
      m.goldMix += (targetGold - m.goldMix) * Math.min(1, dt * 4);
      m.transitionPulse += (0 - m.transitionPulse) * Math.min(1, dt * 5);

      switch (m.state) {
        case "TYPING": {
          const total = TYPING_LINES.join("").length;
          m.typeChars = Math.min(total, Math.floor((now - m.stateEnteredAt) / TYPE_MS_PER_CHAR));
          if (m.typeChars >= total && now - m.stateEnteredAt > total * TYPE_MS_PER_CHAR + TYPE_HOLD_MS) {
            m.state = "TUNING";
            m.stateEnteredAt = now;
            m.dialFloat = dimValue(m.coords, activeDim());
          }
          break;
        }
        case "TUNING": {
          // 弹性复归：线轨滑块以 ~0.2s 曲线弹回最左端
          if (m.gesture !== "rail") m.railProgress += (0 - m.railProgress) * Math.min(1, dt * 12);
          if (m.gesture !== "tune") {
            m.dialFloat += m.dialVel * dt;
            m.dialVel *= Math.pow(0.86, dt * 60);
            const dim = activeDim();
            const { min, max } = dimRange(m.coords, dim);
            m.dialFloat = clamp(m.dialFloat, min, max);
            if (Math.abs(m.dialVel) < 0.6) {
              const target = Math.round(m.dialFloat);
              m.dialFloat += (target - m.dialFloat) * Math.min(1, dt * 12);
              if (Math.abs(m.dialVel) < 0.05) m.dialVel = 0;
            }
            commitDial();
          }
          break;
        }
        case "ALL_LOCKED": {
          if (m.goldMix > 0.85 && now - m.stateEnteredAt > 560) {
            emitOriginLocked();
            spawnSandify();
            m.state = "SANDIFY";
            m.stateEnteredAt = now;
          }
          break;
        }
        case "SANDIFY": {
          for (const p of m.particles) {
            p.vy += 340 * dt;
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.alpha -= dt * 0.5;
          }
          m.particles = m.particles.filter((p) => p.alpha > 0);
          if (now - m.stateEnteredAt > 1150) finish();
          break;
        }
      }
    }

    function dimColor(idx: number) {
      // 已锁=骨灰 / 当前=亮 / 待装填=暗
      if (idx < m.lockedCount) return "#555555";
      if (idx === m.lockedCount) return "rgba(246,243,236,0.95)";
      return "rgba(246,243,236,0.3)";
    }

    function drawReadout(ctx: CanvasRenderingContext2D, startX: number, y: number) {
      const fs = Math.min(17, m.w * 0.038);
      ctx.font = `${fs}px ${MONO}`;
      ctx.textAlign = "left";

      // 第一行：年 / 月 / 日
      const rowA = [
        { text: String(m.coords.year), idx: 0, sep: "" },
        { text: pad2(m.coords.month), idx: 1, sep: " / " },
        { text: pad2(m.coords.day), idx: 2, sep: " / " },
      ];
      let x = startX;
      rowA.forEach((p) => {
        if (p.sep) {
          ctx.fillStyle = "rgba(246,243,236,0.24)";
          ctx.fillText(p.sep, x, y);
          x += ctx.measureText(p.sep).width;
        }
        ctx.fillStyle = dimColor(p.idx);
        ctx.fillText(p.text, x, y);
        x += ctx.measureText(p.text).width;
      });

      // 第二行：时辰 · 方位（缩短行长；地支 + 地理捕捉同列）
      const y2 = y + fs * 1.85;
      x = startX;
      const branch = PERIOD_LABELS[m.coords.periodIndex] ?? "酉时";
      ctx.fillStyle = dimColor(3);
      ctx.fillText(branch, x, y2);
      x += ctx.measureText(branch).width;
      ctx.fillStyle = "rgba(246,243,236,0.24)";
      ctx.fillText(" · ", x, y2);
      x += ctx.measureText(" · ").width;
      ctx.fillStyle = "rgba(0,184,212,0.7)";
      ctx.fillText(locationRef.current, x, y2);
    }

    function draw(ctx: CanvasRenderingContext2D) {
      ctx.clearRect(0, 0, m.w, m.h);
      ctx.lineWidth = 1.0;
      ctx.lineCap = "round";
      ctx.textBaseline = "middle";

      const leftX = m.cl + m.cw * 0.09; // 统一左对齐基线（较换挡轨左端右移一丢丢，整体更聚拢）
      const sandifying = m.state === "SANDIFY";
      const stateAge = performance.now() - m.stateEnteredAt;
      const typingDecay = m.state === "TUNING" ? 1 - smooth(0, 860, stateAge) : 0;
      const tuningRise = m.state === "TUNING" ? smooth(120, 760, stateAge) : m.state === "TYPING" ? 0 : 1;
      const lockConsolidation = m.state === "ALL_LOCKED" ? smooth(0, 760, stateAge) : m.state === "SANDIFY" ? 1 : 0;
      const crystallization = m.state === "SANDIFY" ? smooth(0, 520, stateAge) : 0;
      const tensionScale = 1 + Math.sin(stateAge / 80) * m.transitionPulse * 0.035;
      const dim = activeDim();
      const tuning = (m.state === "TUNING" || m.state === "ALL_LOCKED") && !sandifying;
      const axisColor = m.state === "TYPING" ? COLOR.gray : lerpHex(COLOR.blue, COLOR.gold, m.goldMix);
      const railColor = m.state === "TYPING" ? COLOR.bone : lerpHex(COLOR.blue, COLOR.gold, m.goldMix);

      // 顶部：当前状态标签，帮助用户稳定识别所处阶段。
      if (!sandifying) {
        ctx.globalAlpha = 0.88;
        ctx.fillStyle = COLOR.blue;
        ctx.textAlign = "left";
        ctx.font = `${Math.min(12, m.w * 0.03)}px ${MONO}`;
        ctx.fillText("01 ｜ CHRONO · 入口点火", leftX, m.h * 0.1);
        ctx.globalAlpha = 0.42;
        ctx.fillStyle = COLOR.bone;
        ctx.fillText("轴线正在生成行为起点", leftX, m.h * 0.128);
        ctx.globalAlpha = 1;
      }

      // 断言打字机：进入后落位常驻
      if (m.typeChars > 0 && !sandifying) {
        const landed = m.state !== "TYPING";
        const fontPx = Math.min(18, Math.max(14, m.w * 0.04));
        ctx.font = `${fontPx}px ${SANS}`;
        ctx.textAlign = "left";
        ctx.fillStyle = COLOR.white;
        let remaining = m.typeChars;
        const startY = m.h * (0.19 - typingDecay * 0.012);
        TYPING_LINES.forEach((line, li) => {
          const shown = line.slice(0, Math.max(0, remaining));
          remaining -= line.length;
          const landedAlpha = li === 0 ? 0.5 : 0.34;
          const typingAlpha = li === 0 ? 0.92 : 0.6;
          ctx.globalAlpha = landed ? landedAlpha + typingDecay * (typingAlpha - landedAlpha) : typingAlpha;
          ctx.fillText(shown, leftX, startY + li * (fontPx * 1.7));
        });
        ctx.globalAlpha = 1;
      }

      // 中间：调频读数（十字轴中部）
      if (tuning && m.state === "ALL_LOCKED") {
        // 四阶合一 → 系统冷读 CODE 定格
        ctx.textAlign = "left";
        ctx.fillStyle = "rgba(0,184,212,0.72)";
        ctx.font = `${Math.min(12, m.w * 0.03)}px ${MONO}`;
        ctx.globalAlpha = 0.28 + lockConsolidation * 0.72;
        ctx.fillText("CHRONO LOCKED → REACTION BUFFER", leftX, m.h * 0.34);
        const code = `CODE: ${m.coords.year} // ${pad2(m.coords.month)} // ${pad2(m.coords.day)} // ${PERIOD_LABELS[m.coords.periodIndex] ?? "酉时"} // ${locationRef.current}`;
        let fp = Math.min(22, m.w * 0.052);
        ctx.font = `${fp}px ${MONO}`;
        while (ctx.measureText(code).width > m.w * 0.88 && fp > 10) {
          fp -= 1;
          ctx.font = `${fp}px ${MONO}`;
        }
        ctx.fillStyle = lerpHex(COLOR.white, GOLD_DENSE, Math.min(1, m.goldMix + lockConsolidation * 0.18));
        ctx.fillText(code, leftX, m.h * 0.46);
        ctx.globalAlpha = 1;
      } else if (tuning) {
        // 阶段标签：［ Ⅱ · 月份装填 ］
        ctx.textAlign = "left";
        ctx.fillStyle = "rgba(0,184,212,0.72)";
        ctx.font = `${Math.min(12, m.w * 0.03)}px ${MONO}`;
        ctx.globalAlpha = 0.12 + tuningRise * 0.88;
        ctx.fillText(`［ ${STAGE_ROMAN[m.lockedCount] ?? "Ⅰ"} · ${STAGE_NAME[dim]} ］`, leftX, m.h * 0.34);

        // 巨型调频读数：时辰阶段显示「出生时段」（钟点），地支后台反算
        const giant =
          dim === "hour"
            ? PERIOD_RANGES[clamp(Math.round(m.dialFloat), 0, 11)] ?? "17:00—19:00"
            : dimText(m.coords, dim, Math.round(m.dialFloat));
        const giantFont = dim === "hour" ? Math.min(38, m.w * 0.088) : Math.min(86, m.w * 0.166);
        ctx.fillStyle = lerpHex(COLOR.white, GOLD_DENSE, Math.min(1, m.goldMix + m.transitionPulse * 0.14));
        ctx.font = `${giantFont}px ${MONO}`;
        ctx.fillText(giant, leftX, m.h * 0.46);
        ctx.globalAlpha = 1;

        if (dim === "hour") {
          ctx.fillStyle = "rgba(0,184,212,0.6)";
          ctx.globalAlpha = 0.12 + tuningRise * 0.88;
          ctx.font = `${Math.min(14, m.w * 0.034)}px ${MONO}`;
          ctx.fillText(`→ ${PERIOD_LABELS[clamp(Math.round(m.dialFloat), 0, 11)] ?? "酉时"}`, leftX, m.h * 0.545);
          ctx.globalAlpha = 1;
        }

        ctx.globalAlpha = 0.12 + tuningRise * 0.88;
        drawReadout(ctx, leftX, m.h * 0.6);
        ctx.globalAlpha = 1;

        ctx.fillStyle = "rgba(246,243,236,0.3)";
        ctx.textAlign = "left";
        ctx.font = `${Math.min(12, m.w * 0.03)}px ${MONO}`;
        ctx.globalAlpha = 0.1 + tuningRise * 0.9;
        ctx.fillText("上下滑动 · 锁定当前坐标", leftX, m.h * 0.705);
        ctx.globalAlpha = 1;
      }

      // ---- 十字轴：纵向调频天线（右）----
      ctx.save();
      ctx.strokeStyle = axisColor;
      ctx.lineWidth = 1.45 * tensionScale;
      ctx.shadowColor = m.state === "TYPING" ? "rgba(0,184,212,0.18)" : "rgba(0,184,212,0.48)";
      ctx.shadowBlur = m.state === "TYPING" ? 4 : 8 + m.transitionPulse * 8;
      ctx.globalAlpha = clamp(sandifying ? 0.22 + crystallization * 0.24 : m.state === "TYPING" ? 0.62 : 0.68 + tuningRise * 0.32 + m.transitionPulse * 0.22, 0, 1);
      ctx.beginPath();
      ctx.moveTo(m.axisX, m.axisTop);
      ctx.lineTo(m.axisX, m.axisBottom);
      ctx.stroke();
      ctx.restore();
      ctx.globalAlpha = 1;
      ctx.lineWidth = 1;

      if (tuning) {
        // 卡尺刻度（数理卡尺感，极淡，朝文字一侧）
        ctx.strokeStyle = axisColor;
        ctx.globalAlpha = 0.16;
        const ticks = 8;
        for (let i = 0; i <= ticks; i++) {
          const ty = m.axisTop + (i / ticks) * (m.axisBottom - m.axisTop);
          const len = i % 2 === 0 ? 7 : 4;
          ctx.beginPath();
          ctx.moveTo(m.axisX - len, ty);
          ctx.lineTo(m.axisX, ty);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;

        // 调频滑块节点：当前值在量程中的位置（顶=大值）
        const { min, max } = dimRange(m.coords, dim);
        const frac = max > min ? (Math.round(m.dialFloat) - min) / (max - min) : 0;
        const nodeY = m.axisBottom - frac * (m.axisBottom - m.axisTop);
        ctx.fillStyle = lerpHex(COLOR.blue, GOLD_DENSE, Math.min(1, m.goldMix + m.transitionPulse * 0.16));
        ctx.shadowColor = "rgba(0,184,212,0.5)";
        ctx.shadowBlur = 8 + m.transitionPulse * 8;
        ctx.beginPath();
        ctx.arc(m.axisX, nodeY, 4.8 * tensionScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(m.axisX, nodeY, 9.5 * tensionScale, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // ---- 十字轴：横向换挡轨（底）----
      ctx.save();
      ctx.strokeStyle = railColor;
      ctx.lineWidth = 1.45 * tensionScale;
      ctx.shadowColor = m.state === "TYPING" ? "rgba(0,184,212,0.16)" : "rgba(0,184,212,0.46)";
      ctx.shadowBlur = m.state === "TYPING" ? 4 : 8 + m.transitionPulse * 8;
      ctx.globalAlpha = clamp(sandifying ? 0.22 + crystallization * 0.24 : m.state === "TYPING" ? 0.62 : 0.68 + tuningRise * 0.32 + m.transitionPulse * 0.22, 0, 1);
      ctx.beginPath();
      ctx.moveTo(m.railX0, m.railY);
      ctx.lineTo(m.railX1, m.railY);
      ctx.stroke();
      ctx.restore();
      ctx.globalAlpha = 1;
      ctx.lineWidth = 1;

      if (m.state === "TUNING") {
        const fillX = m.railX0 + (m.railX1 - m.railX0) * m.railProgress;
        ctx.save();
        ctx.strokeStyle = COLOR.blue;
        ctx.lineWidth = 1.3;
        ctx.shadowColor = "rgba(0,184,212,0.42)";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(m.railX0, m.railY);
        ctx.lineTo(fillX, m.railY);
        ctx.stroke();
        ctx.fillStyle = COLOR.blue;
        ctx.beginPath();
        ctx.arc(fillX, m.railY, 4.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        // 提示语：右滑卡扣 + 进度
        ctx.font = `${Math.min(11, m.w * 0.028)}px ${MONO}`;
        ctx.fillStyle = "rgba(246,243,236,0.4)";
        ctx.textAlign = "left";
        ctx.fillText(`右滑卡扣 · 锁定${DIM_LABEL[dim]}`, leftX, m.railY - 16);
        ctx.fillStyle = "rgba(0,184,212,0.7)";
        ctx.textAlign = "right";
        ctx.fillText(`${m.lockedCount}/4`, m.railX1, m.railY - 16);
      }

      // 终局：最底部拉起 1px 暗金锁扣线
      if (m.lockedCount >= 4) {
        ctx.save();
        ctx.strokeStyle = GOLD_DENSE;
        ctx.lineWidth = 1.35;
        ctx.shadowColor = "rgba(212,183,119,0.5)";
        ctx.shadowBlur = 8 + lockConsolidation * 10;
        ctx.globalAlpha = sandifying ? 0.36 + crystallization * 0.34 : 0.24 + lockConsolidation * 0.72;
        ctx.beginPath();
        ctx.moveTo(m.railX0, m.h * 0.87);
        ctx.lineTo(m.railX1, m.h * 0.87);
        ctx.stroke();
        ctx.restore();
        ctx.globalAlpha = 1;
      }

      if (sandifying) {
        ctx.fillStyle = GOLD_DENSE;
        ctx.shadowColor = "rgba(212,183,119,0.36)";
        ctx.shadowBlur = 5;
        for (const p of m.particles) {
          ctx.globalAlpha = Math.min(1, Math.max(0, p.alpha) * (0.34 + crystallization * 1.02));
          ctx.fillRect(p.x - 0.7, p.y - 0.7, 1.9, 1.9);
        }
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    }

    function frame(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      update(dt, now);
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx) draw(ctx);
      raf = requestAnimationFrame(frame);
    }

    function localXY(e: PointerEvent) {
      const r = canvas!.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    function inRailBand(x: number, y: number) {
      return Math.abs(y - m.railY) < 42 && x >= m.railX0 - 10 && x <= m.railX1 + 10;
    }

    function onPointerDown(e: PointerEvent) {
      if (m.state !== "TUNING") return;
      const { x, y } = localXY(e);
      try {
        canvas!.setPointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
      if (inRailBand(x, y)) {
        m.gesture = "rail";
        m.clutched = false;
        m.railProgress = clamp((x - m.railX0) / (m.railX1 - m.railX0), 0, 1);
      } else {
        m.gesture = "tune";
        m.lastY = y;
        m.dialVel = 0;
      }
    }

    function onPointerMove(e: PointerEvent) {
      if (m.gesture === null) return;
      const { x, y } = localXY(e);
      if (m.gesture === "tune") {
        const dy = y - m.lastY;
        m.lastY = y;
        m.dialFloat += -dy / ROW_H;
        const { min, max } = dimRange(m.coords, activeDim());
        m.dialFloat = clamp(m.dialFloat, min, max);
        m.dialVel = (-dy / ROW_H) * 14;
        commitDial();
      } else if (m.gesture === "rail") {
        m.railProgress = clamp((x - m.railX0) / (m.railX1 - m.railX0), 0, 1);
        if (m.railProgress >= RAIL_SNAP) timeLock();
      }
    }

    function onPointerUp(e: PointerEvent) {
      if (m.gesture === "rail") {
        m.clutched = false;
        if (m.railProgress < RAIL_SNAP) m.railProgress = 0;
      }
      m.gesture = null;
      try {
        canvas!.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
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
    <div style={{ position: "fixed", inset: 0, background: "#020303", overflow: "hidden" }}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block", touchAction: "none" }}
      />
    </div>
  );
}
