// ─────────────────────────────────────────────────────────────────────────────
// 观爻 2.0 ·「确认坐标 · 星轨」隔离原型 CHRONO LAB —— /chrono-lab
//
// 隔离原型：独立路由/文件；不碰主链路 / 内容引擎。
// 方向（星兽暖版）：承首屏——星兽低头看你；你在星河「光轨」上拨动，找到自己出生的
//   那一刻（年/月/日/时）。每定一维，那颗星往上「送回星兽」，点亮它身上一颗坐标星；
//   四维齐 → 星兽认出你（发亮 + 颔首）→ 交出坐标喂母码生成。
// 三色律改 冷白→暖金（与首屏同一种光）；语言＝星兽口吻；收尾＝星点归兽（非沙化）。
// 生辰=算法刚需（喂下游母码生成）。数据契约 onChronoLock({year,month,day,periodIndex}) 不变。
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GyMobilePreviewFrame } from "../components/visual/GyMobilePreviewFrame";
import type { ChronoCoords } from "./ChronoAxisDualEngine";

const MONO = "SFMono-Regular, Menlo, Monaco, Consolas, monospace";
const SANS = "-apple-system, system-ui, sans-serif";

const PERIOD_LABELS = ["子时", "丑时", "寅时", "卯时", "辰时", "巳时", "午时", "未时", "申时", "酉时", "戌时", "亥时"];
const PERIOD_RANGES = [
  "23:00—01:00", "01:00—03:00", "03:00—05:00", "05:00—07:00", "07:00—09:00", "09:00—11:00",
  "11:00—13:00", "13:00—15:00", "15:00—17:00", "17:00—19:00", "19:00—21:00", "21:00—23:00",
];

const INTRO_LINE = "让我看看，你是从哪一刻来的。";
const DIM_PROMPT = ["你是哪一年来的？", "那一年的，哪个月？", "那个月的，哪一天？", "那一天的，哪个时辰？"];
const DIM_LABEL = ["年", "月", "日", "时"];
const RECOGNIZE_LINE = "我认得你了。";

const COLOR = {
  bg: "#070512",
  nebula: "120,70,120",
};
const PAL = {
  coolWhite: [230, 236, 255] as [number, number, number],
  gold: [232, 200, 138] as [number, number, number],
  cream: [255, 243, 208] as [number, number, number],
};
function mixRGB(a: [number, number, number], b: [number, number, number], t: number) {
  return `${Math.round(lerp(a[0], b[0], t))},${Math.round(lerp(a[1], b[1], t))},${Math.round(lerp(a[2], b[2], t))}`;
}

// 星兽头（低头看你）——两耳上扬、吻朝下，约 9 星。最近的 4 颗为「坐标星」(年/月/日/时)。
const HEAD: { x: number; y: number; big?: boolean }[] = [
  { x: 0.0, y: 0.62, big: true }, // 0 吻（朝下看你）
  { x: 0.0, y: 0.28 }, // 1 头顶
  { x: -0.2, y: 0.04 }, // 2 左耳
  { x: 0.2, y: 0.04 }, // 3 右耳
  { x: -0.14, y: 0.44 }, // 4 左颊
  { x: 0.14, y: 0.44 }, // 5 右颊
  { x: -0.1, y: 0.78 }, // 6 颈左
  { x: 0.1, y: 0.78 }, // 7 颈右
  { x: 0.0, y: 0.46 }, // 8 鼻梁（中）
];
const HEDGES: [number, number][] = [
  [1, 2], [1, 3], [2, 4], [3, 5], [1, 8], [8, 0], [4, 0], [5, 0], [4, 6], [5, 7],
];
// 坐标星：四维各点亮一颗（年=左耳/月=右耳/日=左颊/时=右颊）
const MARK = [2, 3, 4, 5];

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
function pad2(v: number) {
  return String(Math.round(v)).padStart(2, "0");
}
function daysInMonth(y: number, mo: number) {
  return new Date(y, mo, 0).getDate();
}

type Dim = { name: string; min: number; max: number; val: number };
type FieldStar = { x: number; y: number; r: number; ph: number; sp: number };
type FlyStar = { x: number; y: number; sx: number; sy: number; tx: number; ty: number; t: number; mark: number };

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
  function tone(freq: number, dur: number, gain: number, type: OscillatorType = "sine") {
    const c = ensure();
    if (!c) return;
    const t = c.currentTime;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.05);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(c.destination);
    o.start(t);
    o.stop(t + dur + 0.04);
  }
  function dial() {
    tone(620 + Math.random() * 80, 0.06, 0.02, "sine");
  }
  function gather() {
    [196, 261.6, 392].forEach((f, i) => tone(f, 1.8, 0.045 - i * 0.008));
  }
  function lock() {
    tone(523.25, 0.5, 0.05);
    tone(784, 0.7, 0.03, "triangle");
  }
  function recognize() {
    [392, 523.25, 659.25, 784].forEach((f, i) => tone(f, 1.6, 0.05 - i * 0.006, i === 3 ? "triangle" : "sine"));
  }
  return { ensure, dial, gather, lock, recognize };
}

export function ChronoLab({ initialCoords, onChronoLock }: { initialCoords?: ChronoCoords; onChronoLock?: (c: ChronoCoords) => void } = {}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const navigate = useNavigate();
  const navRef = useRef(navigate);
  navRef.current = navigate;
  const onLockRef = useRef(onChronoLock);
  onLockRef.current = onChronoLock;
  const seedRef = useRef(initialCoords);
  seedRef.current = initialCoords;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const audio = makeAudio();
    const seed = seedRef.current;

    const m = {
      w: 0,
      h: 0,
      state: "VOID" as "VOID" | "INTRO" | "TUNE" | "RECOGNIZE" | "DONE",
      t: 0,
      voidPulsed: false,
      dims: [
        { name: "年", min: 1950, max: 2008, val: clamp(seed?.year ?? 1995, 1950, 2008) },
        { name: "月", min: 1, max: 12, val: clamp(seed?.month ?? 6, 1, 12) },
        { name: "日", min: 1, max: 28, val: clamp(seed?.day ?? 15, 1, 28) },
        { name: "时", min: 0, max: 11, val: clamp(seed?.periodIndex ?? 6, 0, 11) },
      ] as Dim[],
      cur: 0,
      locked: [] as number[],
      markLit: [false, false, false, false],
      everTuned: false,
      dragging: false,
      axis: null as null | "tune" | "commit",
      lastX: 0,
      lastY: 0,
      dz: 0,
      upAccum: 0,
      committedThisDrag: false,
      vel: 0,
      field: [] as FieldStar[],
      fly: [] as FlyStar[],
      nodT: 0,
      recT: 0,
      advanced: false,
      shake: 0,
      debug: false,
      fps: 0,
      fpsAcc: 0,
      fpsN: 0,
    };
    for (let i = 0; i < 90; i++) m.field.push({ x: Math.random(), y: Math.random(), r: 0.4 + Math.random() * 1.0, ph: Math.random() * 6.28, sp: 0.5 + Math.random() });

    function vibrate(p: number | number[]) {
      if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") navigator.vibrate(p);
    }
    function curDim() {
      return m.dims[m.cur];
    }
    function valOf(i: number) {
      return i < m.locked.length ? (m.locked[i] ?? 0) : Math.round(m.dims[i]?.val ?? 0);
    }
    function clampDay() {
      const d = m.dims[2];
      if (d) {
        d.max = daysInMonth(valOf(0), valOf(1));
        d.val = clamp(d.val, d.min, d.max);
      }
    }
    function giantText(i: number, v: number) {
      const r = Math.round(v);
      if (i === 0) return String(r);
      if (i === 3) return PERIOD_RANGES[clamp(r, 0, 11)] ?? "11:00—13:00";
      return pad2(r);
    }

    // —— 布局 ——
    function beastCenter() {
      return { cx: m.w * 0.5, cy: m.h * 0.2, s: m.w * 0.17 };
    }
    function headPos(i: number) {
      const { cx, cy, s } = beastCenter();
      const n = HEAD[i]!;
      const nod = m.state === "RECOGNIZE" ? Math.sin(m.nodT * 3.0) * (m.nodT < 1.0 ? 0.06 : 0) : 0;
      // 整头随认出轻轻颔首：吻/颊下沉
      const dip = (n.y - 0.4) * nod;
      return { x: cx + n.x * s, y: cy + (n.y + dip) * s };
    }
    function arcX0() {
      return m.w * 0.16;
    }
    function arcX1() {
      return m.w * 0.84;
    }
    function arcY(frac: number) {
      // 轻微上弓的光轨
      const base = m.h * 0.66;
      return base - Math.sin(frac * Math.PI) * m.h * 0.03;
    }
    function starPos() {
      const d = curDim();
      if (!d) return { x: arcX0(), y: arcY(0) };
      const frac = d.max > d.min ? (d.val - d.min) / (d.max - d.min) : 0;
      return { x: lerp(arcX0(), arcX1(), frac), y: arcY(frac) };
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
    }

    function commitCurrent() {
      const d = curDim();
      if (!d) return;
      m.locked.push(Math.round(d.val));
      audio.lock();
      vibrate(16);
      m.shake = Math.max(m.shake, 6);
      m.everTuned = false;
      // 那颗星飞回星兽，点亮坐标星
      const mk = MARK[m.cur] ?? 2;
      const sp = starPos();
      const hp = headPos(mk);
      m.fly.push({ x: sp.x, y: sp.y, sx: sp.x, sy: sp.y, tx: hp.x, ty: hp.y, t: 0, mark: m.cur });
      m.cur += 1;
      if (m.cur >= m.dims.length) {
        m.state = "RECOGNIZE";
        m.recT = 0;
        m.nodT = 0;
        audio.recognize();
        vibrate([0, 30, 40, 30]);
      } else {
        clampDay();
      }
    }

    function step(dt: number) {
      m.t += dt;
      if (m.shake > 0) m.shake = Math.max(0, m.shake - dt * 60);
      // 飞星
      for (const f of m.fly) {
        if (f.t >= 1) continue;
        f.t = Math.min(1, f.t + dt * 1.7);
        const e = smooth(0, 1, f.t);
        const lift = Math.sin(e * Math.PI) * m.h * 0.06;
        f.x = lerp(f.sx, f.tx, e);
        f.y = lerp(f.sy, f.ty, e) - lift;
        if (f.t >= 1) m.markLit[f.mark] = true;
      }
      switch (m.state) {
        case "VOID": {
          if (!m.voidPulsed && m.t > 0.16) {
            m.voidPulsed = true;
            vibrate([0, 12, 60]);
          }
          if (m.t >= 0.5) {
            m.state = "INTRO";
            m.t = 0;
            audio.gather();
          }
          break;
        }
        case "INTRO": {
          if (m.t >= 2.4) {
            m.state = "TUNE";
            m.t = 0;
          }
          break;
        }
        case "TUNE": {
          const d = curDim();
          if (d && !m.dragging) {
            d.val += m.vel * dt;
            m.vel *= Math.pow(0.86, dt * 60);
            d.val = clamp(d.val, d.min, d.max);
            const target = Math.round(d.val);
            d.val += (target - d.val) * Math.min(1, dt * 12);
            if (Math.abs(m.vel) < 0.05) m.vel = 0;
          }
          break;
        }
        case "RECOGNIZE": {
          m.recT += dt;
          m.nodT += dt;
          if (!m.advanced && m.recT > 1.8 && m.fly.every((f) => f.t >= 1)) {
            m.advanced = true;
            m.state = "DONE";
            if (onLockRef.current) onLockRef.current({ year: valOf(0), month: valOf(1), day: valOf(2), periodIndex: valOf(3) });
            else navRef.current("/mother-lab");
          }
          break;
        }
      }
    }

    function draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      if (m.shake > 0.1) ctx.translate((Math.random() - 0.5) * m.shake, (Math.random() - 0.5) * m.shake);
      ctx.clearRect(-30, -30, m.w + 60, m.h + 60);
      ctx.fillStyle = COLOR.bg;
      ctx.fillRect(-30, -30, m.w + 60, m.h + 60);
      const neb = ctx.createRadialGradient(m.w / 2, m.h * 0.32, 0, m.w / 2, m.h * 0.32, Math.max(m.w, m.h) * 0.7);
      neb.addColorStop(0, `rgba(${COLOR.nebula},0.09)`);
      neb.addColorStop(0.5, `rgba(${COLOR.nebula},0.03)`);
      neb.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = neb;
      ctx.fillRect(0, 0, m.w, m.h);
      const now = performance.now() / 1000;
      ctx.textBaseline = "middle";

      // 星河散点
      m.field.forEach((s) => {
        const a = 0.1 + 0.16 * (0.5 + 0.5 * Math.sin(now * s.sp + s.ph));
        ctx.fillStyle = `rgba(230,236,255,${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x * m.w, s.y * m.h, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      if (m.state === "VOID") {
        const beat = Math.abs(Math.sin(m.t * 14));
        ctx.fillStyle = `rgba(232,200,138,${(0.15 + 0.2 * beat).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(m.w / 2, m.h * 0.2, 2 + beat * 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return;
      }

      // —— 星兽头（低头看你）——
      const headA = m.state === "INTRO" ? smooth(0, 1.2, m.t) : 1;
      const recoGlow = m.state === "RECOGNIZE" ? smooth(0, 1.0, m.recT) : 0;
      ctx.lineCap = "round";
      ctx.strokeStyle = `rgba(${mixRGB(PAL.coolWhite, PAL.gold, 0.5 + recoGlow * 0.5)},${(0.5 + recoGlow * 0.4).toFixed(3)})`;
      ctx.lineWidth = 1.2;
      ctx.shadowColor = "rgba(232,200,138,0.3)";
      ctx.shadowBlur = 4 + recoGlow * 6;
      ctx.globalAlpha = headA;
      HEDGES.forEach(([a, b]) => {
        const pa = headPos(a);
        const pb = headPos(b);
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      });
      ctx.shadowBlur = 0;
      HEAD.forEach((n, i) => {
        const p = headPos(i);
        const isMark = MARK.indexOf(i);
        const lit = isMark >= 0 && m.markLit[isMark];
        const warm = lit || recoGlow > 0 ? 1 : 0.2;
        const r = (n.big ? 3.0 : 1.9) * (lit ? 1.35 : 1) * (1 + recoGlow * 0.3);
        ctx.globalAlpha = headA * (lit ? 1 : 0.85);
        ctx.fillStyle = `rgb(${mixRGB(PAL.coolWhite, PAL.cream, warm)})`;
        ctx.shadowColor = `rgba(${mixRGB([255, 255, 255], PAL.gold, warm)},0.8)`;
        ctx.shadowBlur = (n.big ? 11 : 6) * (lit ? 1.4 : 1) + recoGlow * 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      ctx.globalAlpha = 1;

      // —— 文案（星兽口吻）——
      ctx.textAlign = "center";
      const cx = m.w / 2;
      if (m.state === "INTRO") {
        ctx.globalAlpha = smooth(0.2, 1.2, m.t) * (1 - smooth(2.0, 2.4, m.t));
        ctx.fillStyle = "rgba(244,236,216,0.95)";
        ctx.font = `${Math.min(18, m.w * 0.046)}px ${SANS}`;
        ctx.fillText(INTRO_LINE, cx, m.h * 0.42);
        ctx.globalAlpha = 1;
      } else if (m.state === "TUNE") {
        const d = curDim();
        if (d) {
          // 提示句
          ctx.globalAlpha = 0.9;
          ctx.fillStyle = "rgba(244,236,216,0.8)";
          ctx.font = `${Math.min(16, m.w * 0.04)}px ${SANS}`;
          ctx.fillText(DIM_PROMPT[m.cur] ?? "", cx, m.h * 0.4);
          ctx.globalAlpha = 1;
          // 巨型读数
          const giant = giantText(m.cur, d.val);
          const gf = m.cur === 3 ? Math.min(40, m.w * 0.094) : Math.min(76, m.w * 0.156);
          ctx.fillStyle = `rgb(${mixRGB(PAL.cream, PAL.gold, 0.15)})`;
          ctx.font = `${gf}px ${MONO}`;
          ctx.fillText(giant, cx, m.h * 0.5);
          if (m.cur === 3) {
            ctx.fillStyle = "rgba(232,200,138,0.85)";
            ctx.font = `${Math.min(15, m.w * 0.036)}px ${MONO}`;
            ctx.fillText(PERIOD_LABELS[clamp(Math.round(d.val), 0, 11)] ?? "午时", cx, m.h * 0.565);
          }
        }
      } else if (m.state === "RECOGNIZE" || m.state === "DONE") {
        ctx.globalAlpha = smooth(0.4, 1.4, m.recT);
        ctx.fillStyle = "rgba(255,247,228,0.96)";
        ctx.font = `${Math.min(20, m.w * 0.05)}px ${SANS}`;
        ctx.fillText(RECOGNIZE_LINE, cx, m.h * 0.46);
        // 落定坐标摘要（暖）
        ctx.globalAlpha = smooth(0.8, 1.8, m.recT) * 0.7;
        ctx.fillStyle = "rgba(232,200,138,0.7)";
        ctx.font = `${Math.min(13, m.w * 0.032)}px ${MONO}`;
        ctx.fillText(`${valOf(0)} · ${pad2(valOf(1))} · ${pad2(valOf(2))} · ${PERIOD_LABELS[clamp(valOf(3), 0, 11)]}`, cx, m.h * 0.53);
        ctx.globalAlpha = 1;
      }

      // —— 星河光轨（TUNE）——
      if (m.state === "TUNE") {
        const x0 = arcX0();
        const x1 = arcX1();
        // 轨线
        ctx.strokeStyle = "rgba(230,236,255,0.18)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        for (let k = 0; k <= 40; k++) {
          const f = k / 40;
          const x = lerp(x0, x1, f);
          const y = arcY(f);
          if (k === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        // 刻度星（稀疏）
        ctx.fillStyle = "rgba(230,236,255,0.3)";
        for (let k = 0; k <= 8; k++) {
          const f = k / 8;
          ctx.beginPath();
          ctx.arc(lerp(x0, x1, f), arcY(f), 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
        // 已走轨（你拨过的那段，暖）
        const d = curDim();
        const frac = d && d.max > d.min ? (d.val - d.min) / (d.max - d.min) : 0;
        ctx.strokeStyle = `rgba(${mixRGB(PAL.coolWhite, PAL.gold, 0.6)},0.5)`;
        ctx.lineWidth = 1.4;
        ctx.shadowColor = "rgba(232,200,138,0.4)";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        for (let k = 0; k <= 40; k++) {
          const f = (k / 40) * frac;
          const x = lerp(x0, x1, f);
          const y = arcY(f);
          if (k === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
        // 你的坐标星（拨动的光点）
        const sp = starPos();
        const demo = !m.everTuned;
        const tug = demo ? Math.sin(performance.now() / 300) * 5 : 0;
        ctx.fillStyle = `rgb(${mixRGB(PAL.cream, PAL.gold, 0.1)})`;
        ctx.shadowColor = "rgba(255,243,208,0.9)";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(sp.x + tug, sp.y, 5.0, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 0.5;
        ctx.strokeStyle = `rgb(${mixRGB(PAL.cream, PAL.gold, 0.1)})`;
        ctx.beginPath();
        ctx.arc(sp.x + tug, sp.y, 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
        // 手势提示
        ctx.fillStyle = "rgba(232,200,138,0.5)";
        ctx.font = `${Math.min(12, m.w * 0.03)}px ${MONO}`;
        ctx.fillText(m.everTuned ? "↑ 送回星兽" : "← 拨动星河 →", cx, m.h * 0.74);
        // 进度
        ctx.fillStyle = "rgba(232,200,138,0.4)";
        ctx.font = `${Math.min(11, m.w * 0.028)}px ${MONO}`;
        ctx.textAlign = "right";
        ctx.fillText(`${m.cur}/4 · ${DIM_LABEL[m.cur] ?? ""}`, x1, m.h * 0.79);
        ctx.textAlign = "center";
      }

      // —— 飞星（送回星兽）——
      m.fly.forEach((f) => {
        if (f.t >= 1) return;
        const a = 1 - smooth(0.7, 1, f.t) * 0.3;
        ctx.globalAlpha = a;
        ctx.fillStyle = `rgb(${mixRGB(PAL.cream, PAL.gold, f.t)})`;
        ctx.shadowColor = "rgba(255,243,208,0.9)";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(f.x, f.y, 4.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      ctx.restore();

      if (m.debug) {
        ctx.fillStyle = "rgba(232,200,138,0.9)";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.font = `11px ${MONO}`;
        [`state=${m.state} fps=${m.fps.toFixed(0)} cur=${m.cur}`, `val=${curDim()?.val.toFixed(2)} ever=${m.everTuned}`].forEach((l, i) => ctx.fillText(l, 8, 8 + i * 14));
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
      if (m.state !== "TUNE") return;
      m.dragging = true;
      m.axis = null;
      m.lastX = x;
      m.lastY = y;
      m.dz = 0;
      m.upAccum = 0;
      m.vel = 0;
      m.committedThisDrag = false;
    }
    function onMove(e: PointerEvent) {
      if (!m.dragging || m.state !== "TUNE") return;
      const { x, y } = localXY(e);
      const dx = x - m.lastX;
      const dy = y - m.lastY;
      m.lastX = x;
      m.lastY = y;
      if (m.axis === null) {
        m.dz += Math.abs(dx) + Math.abs(dy);
        if (m.dz < 4) return;
        m.axis = Math.abs(dx) >= Math.abs(dy) ? "tune" : "commit";
      }
      if (m.axis === "tune") {
        const d = curDim();
        if (d) {
          const sens = (d.max - d.min) / (arcX1() - arcX0());
          const before = Math.round(d.val);
          d.val = clamp(d.val + dx * sens, d.min, d.max);
          m.vel = dx * sens * 3;
          m.everTuned = true;
          if (Math.round(d.val) !== before) audio.dial();
          if (m.cur <= 1) clampDay();
        }
      } else {
        // commit 轴：上滑「送回星兽」
        if (!m.everTuned || m.committedThisDrag) return;
        if (dy < 0) m.upAccum += -dy;
        else m.upAccum = Math.max(0, m.upAccum + dy * 0.5);
        if (m.upAccum > 56) {
          m.committedThisDrag = true;
          commitCurrent();
        }
      }
    }
    function onUp() {
      m.dragging = false;
      m.axis = null;
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
    <GyMobilePreviewFrame background="#070512">
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block", touchAction: "none" }} />
    </GyMobilePreviewFrame>
  );
}
