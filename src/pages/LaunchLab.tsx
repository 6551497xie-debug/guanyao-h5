// ─────────────────────────────────────────────────────────────────────────────
// 观爻 2.0 ·「新首屏 · 28 星宿光兽」隔离原型 LAUNCH LAB —— /launch-lab
//
// 星兽 = 人格坐标显影前的结构生命体
// Chrono = 星兽收束后的原始时间坐标层
// 28宿 = 结构路径系统，不是装饰
//
// 定稿方向：星兽 = 28 颗星（= 28 宿 = 四象 × 7）连成的星座生命，奔跑姿态。
//   开场：整片星河由混沌 → 汇聚清晰 → 28 颗星连接起来，星兽显形（未定形、不属任何一象）。
//   定形（青龙/白虎…）留给生辰之后：那时取出用户那一象的 7 颗星，化成四象兽。
//   几何双 X LOGO 退役，星兽 + 观爻字标 = 新品牌标记。语言只接住/陪行；声音用暖。
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GyMobilePreviewFrame } from "../components/visual/GyMobilePreviewFrame";

const SANS = "-apple-system, system-ui, sans-serif";
const MONO = "SFMono-Regular, Menlo, Monaco, Consolas, monospace";

// 28 颗星（3D：x 左右、y 下、z 朝屏内/远）。面朝你的四足兽——头/胸最近，背与髋向深处退，
// 短尾收在身后。前腿近(大)、后腿远(小)＝纵深；从宇宙深处推近、朝你走来。
const NODES: { x: number; y: number; z: number; big?: boolean }[] = [
  { x: 0.0, y: 0.22, z: 0.0, big: true }, // 0 吻（最近，朝你）
  { x: 0.0, y: -0.04, z: 0.1 }, // 1 头顶
  { x: -0.15, y: -0.18, z: 0.14 }, // 2 左耳
  { x: 0.15, y: -0.18, z: 0.14 }, // 3 右耳
  { x: 0.0, y: 0.05, z: 0.26 }, // 4 颈（点头支点）
  { x: 0.0, y: 0.12, z: 0.42 }, // 5 颈2
  { x: 0.0, y: 0.16, z: 0.5, big: true }, // 6 肩/胸
  { x: 0.0, y: 0.0, z: 0.72 }, // 7 背1
  { x: 0.0, y: -0.05, z: 0.98 }, // 8 背2
  { x: 0.0, y: 0.04, z: 1.22, big: true }, // 9 髋
  { x: 0.02, y: -0.06, z: 1.36 }, // 10 尾1
  { x: 0.06, y: -0.22, z: 1.48 }, // 11 尾2
  { x: 0.1, y: -0.42, z: 1.55 }, // 12 尾3
  { x: 0.12, y: -0.62, z: 1.58, big: true }, // 13 尾尖
  { x: -0.2, y: 0.3, z: 0.48 }, // 14 左前·肩
  { x: -0.26, y: 0.6, z: 0.44 }, // 15 左前·膝
  { x: -0.24, y: 0.92, z: 0.4 }, // 16 左前·爪
  { x: 0.2, y: 0.3, z: 0.48 }, // 17 右前·肩
  { x: 0.26, y: 0.6, z: 0.44 }, // 18 右前·膝
  { x: 0.24, y: 0.92, z: 0.4 }, // 19 右前·爪
  { x: -0.17, y: 0.32, z: 1.15 }, // 20 左后·髋
  { x: -0.21, y: 0.6, z: 1.14 }, // 21 左后·膝
  { x: -0.19, y: 0.9, z: 1.12 }, // 22 左后·爪
  { x: 0.17, y: 0.32, z: 1.15 }, // 23 右后·髋
  { x: 0.21, y: 0.6, z: 1.14 }, // 24 右后·膝
  { x: 0.19, y: 0.9, z: 1.12 }, // 25 右后·爪
  { x: 0.0, y: 0.42, z: 0.52 }, // 26 胸口
  { x: 0.0, y: 0.3, z: 0.85 }, // 27 腹
];
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [1, 3], [2, 3], [0, 4], [1, 4],
  [4, 5], [5, 6], [6, 7], [7, 8], [8, 9],
  [9, 10], [10, 11], [11, 12], [12, 13],
  [6, 14], [14, 15], [15, 16],
  [6, 17], [17, 18], [18, 19],
  [9, 20], [20, 21], [21, 22],
  [9, 23], [23, 24], [24, 25],
  [6, 26], [26, 27], [27, 9], [14, 26], [17, 26],
];

const CFG = {
  voidMs: 2.4,
  convergeMs: 6.0,
  cyFrac: 0.46,
  scaleFrac: 0.62,
  starfield: 420,
  focal: 2.4, // 透视焦距（越小纵深越夸张）
  zMid: 2.6, // 汇聚成形时的景深（在宇宙深处）
  zNear: 0.35, // 走到你面前的景深
  yaw: 0.3, // 偏航：正面朝你 + 一点 3/4 立体
};

// 步态：四条腿错峰迈步（对角行走）。索引→{相位, 深度:爪>膝>肩}
const GAIT: Record<number, { ph: number; depth: number }> = {
  14: { ph: 0, depth: 0 }, 15: { ph: 0, depth: 0.5 }, 16: { ph: 0, depth: 1 },
  17: { ph: 0.5, depth: 0 }, 18: { ph: 0.5, depth: 0.5 }, 19: { ph: 0.5, depth: 1 },
  20: { ph: 0.75, depth: 0 }, 21: { ph: 0.75, depth: 0.5 }, 22: { ph: 0.75, depth: 1 },
  23: { ph: 0.25, depth: 0 }, 24: { ph: 0.25, depth: 0.5 }, 25: { ph: 0.25, depth: 1 },
};
const TAILS = new Set([10, 11, 12, 13]);
const BODY = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 26, 27]);

const COLOR = {
  bg: "#070512",
  warm: "#E8C88A",
  warmBright: "#FFF3D0",
  field: "230,236,255", // 星河 = 冷白（阴·散光）
  nebula: "120,70,120",
  text: "#F4ECD8",
};

// 整屏一套光：冷白(星河·阴) → 暖金(星兽·阳) → 暖白(成字)
const PAL = {
  coolWhite: [230, 236, 255] as [number, number, number],
  gold: [232, 200, 138] as [number, number, number],
  cream: [255, 243, 208] as [number, number, number],
};
function mixRGB(a: [number, number, number], b: [number, number, number], t: number) {
  return `${Math.round(lerp(a[0], b[0], t))},${Math.round(lerp(a[1], b[1], t))},${Math.round(lerp(a[2], b[2], t))}`;
}

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

type FieldStar = { x: number; y: number; r: number; ph: number; sp: number; vx: number; vy: number };
type TextStar = { tx: number; ty: number; ox: number; oy: number; ph: number; sp: number; line: number };
type LaunchState =
  | "starfield_idle"
  | "28_lunar_assembly"
  | "beast_formation"
  | "beast_approach"
  | "recognition_ready"
  | "coordinate_entry";

const STATE = {
  STARFIELD_IDLE: "starfield_idle",
  ASSEMBLY: "28_lunar_assembly",
  FORMATION: "beast_formation",
  APPROACH: "beast_approach",
  READY: "recognition_ready",
  ENTER: "coordinate_entry",
} as const;

const TOP_LINES = ["每一个穿过黑夜的人，", "都会留下一点光。"];
const CTA_LINE = "这一局，我来照亮你。";

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
    g.gain.exponentialRampToValueAtTime(gain, t + 0.06);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(c.destination);
    o.start(t);
    o.stop(t + dur + 0.05);
  }
  function gather() {
    [196, 261.6, 392].forEach((f, i) => tone(f, 2.4, 0.05 - i * 0.01));
  }
  function form() {
    tone(392, 1.6, 0.07);
    tone(523.25, 2.0, 0.05);
    tone(784, 1.6, 0.03, "triangle");
  }
  function tick() {
    tone(880 + Math.random() * 220, 0.12, 0.025);
  }
  return { ensure, gather, form, tick };
}

export function LaunchLab() {
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
      state: STATE.STARFIELD_IDLE as LaunchState,
      t: 0,
      pulsed: false,
      chaos: NODES.map(() => ({ ox: (Math.random() - 0.5) * 2.4, oy: (Math.random() - 0.5) * 2.4, oz: (Math.random() - 0.5) * 3.0, ph: Math.random() * 6.28, sp: 0.6 + Math.random() * 0.8 })),
      arrived: NODES.map(() => false),
      presentDone: false,
      gaitPhase: 0,
      walk: 0,
      field: [] as FieldStar[],
      textStars: [] as TextStar[],
      afterForm: 0,
      formed: false,
      entryStarted: false,
      debug: false,
      fps: 0,
      fpsAcc: 0,
      fpsN: 0,
    };
    for (let i = 0; i < CFG.starfield; i++) {
      const isLunarMansion = i < NODES.length;
      m.field.push({
        x: Math.random(),
        y: Math.random(),
        r: isLunarMansion ? 1.35 + Math.random() * 0.65 : 0.45 + Math.random() * 1.0,
        ph: Math.random() * 6.28,
        sp: isLunarMansion ? 0.75 + Math.random() * 0.45 : 0.5 + Math.random(),
        vx: 0,
        vy: 0,
      });
    }

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
      buildTextStars();
    }

    function buildTextStars() {
      if (!m.w || !m.h) return;
      const size = Math.min(18, m.w * 0.046);
      const lines = [
        { text: TOP_LINES[0], y: m.h * 0.18, weight: 600 },
        { text: TOP_LINES[1], y: m.h * 0.23, weight: 600 },
        { text: CTA_LINE, y: m.h * 0.82, weight: 700 },
      ];
      const off = document.createElement("canvas");
      off.width = Math.max(1, Math.floor(m.w));
      off.height = Math.max(1, Math.floor(m.h));
      const o = off.getContext("2d");
      if (!o) return;
      o.textAlign = "center";
      o.textBaseline = "middle";
      const gap = 5;
      const stars: TextStar[] = [];
      lines.forEach((line, li) => {
        o.clearRect(0, 0, off.width, off.height);
        o.fillStyle = "#fff";
        o.font = `${line.weight} ${size}px ${SANS}`;
        o.fillText(line.text, m.w / 2, line.y);
        const data = o.getImageData(0, 0, off.width, off.height).data;
        for (let y = 0; y < off.height; y += gap) {
          for (let x = 0; x < off.width; x += gap) {
            if (data[(y * off.width + x) * 4 + 3]! > 128) {
              const source = m.field[NODES.length + (stars.length % Math.max(1, m.field.length - NODES.length))] ?? m.field[stars.length % m.field.length];
              stars.push({
                tx: x,
                ty: y,
                ox: source ? source.x * m.w : Math.random() * m.w,
                oy: source ? source.y * m.h : Math.random() * m.h,
                ph: Math.random() * 6.28,
                sp: 0.6 + Math.random(),
                line: li,
              });
            }
          }
        }
      });
      m.textStars = stars;
    }

    function nodeConv(i: number) {
      // 每颗星的汇聚进度（错峰）
      const start = (i / NODES.length) * (CFG.convergeMs * 0.55);
      return smooth(start, start + 1.2, m.t);
    }
    function headAngle(tp: number) {
      const settle = smooth(0.6, 2.6, tp) * 0.05; // 缓缓侧头看你
      let nod = 0;
      const nodStart = 1.8;
      if (tp > nodStart) {
        const ph = (tp - nodStart) % 6.5; // 每隔几秒，轻轻点一次头（老朋友打招呼）
        if (ph < 1.0) nod = Math.sin(ph * Math.PI) * 0.18;
      }
      return settle + nod;
    }
    function nodePos(i: number) {
      const formedLike =
        m.state === STATE.FORMATION ||
        m.state === STATE.APPROACH ||
        m.state === STATE.READY ||
        m.state === STATE.ENTER;
      const present =
        m.state === STATE.APPROACH ||
        m.state === STATE.READY ||
        m.state === STATE.ENTER;
      const conv = formedLike ? 1 : nodeConv(i);
      const n = NODES[i]!;
      const t = performance.now() / 1000;
      // 全局景深：宇宙深处(zMid) → 缓缓推近你面前(zNear)
      const approachDepth =
        m.state === STATE.APPROACH || m.state === STATE.READY
          ? smooth(0.3, 4.6, m.t)
          : m.state === STATE.ENTER
            ? 1
            : 0;
      const zApproach = lerp(CFG.zMid, CFG.zNear, approachDepth);
      let X = n.x;
      let Y = n.y;
      let Z = n.z;
      // 点头：头部（吻/头/耳）绕颈(节点4)在 Y-Z 平面俯仰 → 朝你颔首
      if (i <= 3 && present) {
        const ang = headAngle(m.t) * m.walk;
        const pv = NODES[4]!;
        const dy = Y - pv.y;
        const dz = Z - pv.z;
        Y = pv.y + dy * Math.cos(ang) - dz * Math.sin(ang);
        Z = pv.z + dy * Math.sin(ang) + dz * Math.cos(ang);
      }
      // 步态：四腿朝你迈步(Z 前后) + 抬腿(Y)
      const g = GAIT[i];
      if (g && present) {
        const ph = m.gaitPhase + g.ph * Math.PI * 2;
        Z += -Math.cos(ph) * 0.1 * g.depth * m.walk;
        Y += -Math.max(0, Math.sin(ph)) * 0.08 * g.depth * m.walk;
      }
      if (TAILS.has(i) && present) {
        X += Math.sin(m.gaitPhase * 0.7 - i * 0.5) * 0.04 * m.walk;
        Y += -Math.abs(Math.sin(m.gaitPhase * 0.7)) * 0.03 * m.walk;
      }
      if (BODY.has(i) && present) {
        Y += -Math.abs(Math.sin(m.gaitPhase)) * 0.02 * m.walk; // 身子起伏
      }
      // 偏航：正面朝你 + 一点点 3/4 立体 + 缓慢微摆
      const yaw = CFG.yaw + Math.sin(t * 0.25) * 0.04;
      const zc = Z - 0.55;
      const Xr = X * Math.cos(yaw) + zc * Math.sin(yaw);
      const Zr = -X * Math.sin(yaw) + zc * Math.cos(yaw) + 0.55;
      X = Xr;
      Z = Zr;
      // 透视投影
      Z = Math.max(0.05, Z + zApproach);
      const p = CFG.focal / (CFG.focal + Z);
      const scale = m.w * CFG.scaleFrac;
      const cx = m.w / 2;
      const cy = m.h * CFG.cyFrac;
      const breathe = present ? Math.sin(performance.now() / 1100 + i * 0.3) * 0.004 : 0;
      const targetX = cx + X * p * scale;
      const targetY = cy + (Y + breathe) * p * scale;
      const origin = m.field[i];
      if (!formedLike && origin) {
        return {
          x: lerp(origin.x * m.w, targetX, conv),
          y: lerp(origin.y * m.h, targetY, conv),
          conv,
          p,
        };
      }
      return { x: targetX, y: targetY, conv, p };
    }

    function step(dt: number) {
      m.t += dt;
      if (m.state === STATE.FORMATION || m.state === STATE.APPROACH || m.state === STATE.READY) {
        m.afterForm += dt;
      }
      // 步态时钟一直走（慢步 ~0.4Hz）；只在成形后逐渐"起步"
      m.gaitPhase += dt * 2.6;
      const targetWalk = m.state === STATE.APPROACH || m.state === STATE.READY ? 1 : 0;
      m.walk += (targetWalk - m.walk) * Math.min(1, dt * 1.4);
      switch (m.state) {
        case STATE.STARFIELD_IDLE: {
          if (!m.pulsed && m.t > 0.16) {
            m.pulsed = true;
            vibrate([0, 12, 60]);
          }
          if (m.t >= CFG.voidMs) {
            m.state = STATE.ASSEMBLY;
            m.t = 0;
            audio.gather();
          }
          break;
        }
        case STATE.ASSEMBLY: {
          NODES.forEach((_, i) => {
            if (!m.arrived[i] && nodeConv(i) > 0.6) {
              m.arrived[i] = true;
              audio.tick();
            }
          });
          if (m.t >= CFG.convergeMs) {
            m.state = STATE.FORMATION;
            m.t = 0;
            if (!m.formed) {
              m.formed = true;
              audio.form();
              vibrate([0, 22, 40]);
            }
          }
          break;
        }
        case STATE.FORMATION: {
          if (m.t >= 1.4) {
            m.state = STATE.APPROACH;
            m.t = 0;
          }
          break;
        }
        case STATE.APPROACH: {
          if (m.t >= 5.0) {
            m.state = STATE.READY;
            m.t = 0;
            m.presentDone = true;
          }
          break;
        }
        case STATE.READY: {
          break;
        }
        case STATE.ENTER: {
          if (m.t >= 1.45 && !m.entryStarted) {
            m.entryStarted = true;
            navRef.current("/chrono-lab");
          }
          break;
        }
      }
    }

    function draw(ctx: CanvasRenderingContext2D) {
      ctx.clearRect(0, 0, m.w, m.h);
      // 星河底（黑紫 + 极淡星云）
      ctx.fillStyle = COLOR.bg;
      ctx.fillRect(0, 0, m.w, m.h);
      const neb = ctx.createRadialGradient(m.w / 2, m.h * 0.5, 0, m.w / 2, m.h * 0.5, Math.max(m.w, m.h) * 0.7);
      neb.addColorStop(0, `rgba(${COLOR.nebula},0.1)`);
      neb.addColorStop(0.5, `rgba(${COLOR.nebula},0.03)`);
      neb.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = neb;
      ctx.fillRect(0, 0, m.w, m.h);
      const now = performance.now() / 1000;

      // 星河散点先完整铺满；随后其中 28 颗汇聚成星兽，其他星再生成文字。
      const enter = m.state === STATE.ENTER ? smooth(0, 1.2, m.t) : 0;
      const assemblyFade =
        m.state === STATE.ASSEMBLY
          ? 1 - smooth(CFG.convergeMs * 0.2, CFG.convergeMs, m.t) * 0.78
          : m.state === STATE.STARFIELD_IDLE
            ? 1
            : m.state === STATE.FORMATION || m.state === STATE.APPROACH || m.state === STATE.READY
              ? 0.2 * (1 - smooth(0.2, 3.0, m.afterForm)) + 0.035
              : 0.12;
      const fieldA = assemblyFade * (1 - enter * 0.55);
      m.field.forEach((s, i) => {
        const isLunarMansion = i < NODES.length;
        if (isLunarMansion && m.state !== STATE.STARFIELD_IDLE) return;
        if (m.state !== STATE.STARFIELD_IDLE && !isLunarMansion) {
          const thinning = m.state === STATE.ASSEMBLY
            ? smooth(CFG.convergeMs * 0.25, CFG.convergeMs, m.t)
            : smooth(0.2, 3.0, m.afterForm);
          const keepEvery = m.state === STATE.ASSEMBLY ? 1 + Math.floor(thinning * 2) : 4 + Math.floor(thinning * 8);
          if ((i - NODES.length) % keepEvery !== 0) return;
        }
        const blink = Math.pow(0.5 + 0.5 * Math.sin(now * (2.2 + s.sp * 1.8) + s.ph), 2.2);
        const flare = Math.pow(Math.max(0, Math.sin(now * (0.9 + s.sp) + s.ph * 1.7)), 18);
        const base = isLunarMansion ? 0.34 : 0.16;
        const pulse = isLunarMansion ? 0.48 : 0.34;
        const a = Math.min(0.95, base + pulse * blink + flare * 0.38) * fieldA;
        ctx.fillStyle = `rgba(${COLOR.field},${a.toFixed(3)})`;
        ctx.shadowColor = isLunarMansion ? "rgba(255,243,208,0.72)" : "rgba(230,236,255,0.34)";
        ctx.shadowBlur = (isLunarMansion ? 8 : 2.5) + flare * (isLunarMansion ? 12 : 6);
        ctx.beginPath();
        ctx.arc(s.x * m.w, s.y * m.h, s.r * (0.78 + blink * 0.42 + flare * 0.55), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      if (m.state === STATE.STARFIELD_IDLE) {
        return;
      }

      const pos = NODES.map((_, i) => {
        const p = nodePos(i);
        if (m.state !== STATE.ENTER) return p;
        const k = smooth(0, 1.1, m.t);
        const gridX = m.w * (0.22 + (i % 4) * 0.185);
        const gridY = m.h * (0.36 + Math.floor(i / 4) * 0.05);
        return {
          ...p,
          x: lerp(p.x, gridX, k),
          y: lerp(p.y, gridY, k),
          conv: 1,
        };
      });

      // 连线（两端都汇聚到位才显，亮度随汇聚）
      ctx.lineCap = "round";
      ctx.shadowColor = "rgba(232,200,138,0.35)";
      ctx.shadowBlur = 5;
      EDGES.forEach(([a, b]) => {
        const pa = pos[a]!;
        const pb = pos[b]!;
        const la = Math.min(pa.conv, pb.conv);
        if (la < 0.5) return;
        const warm = clamp((la - 0.55) / 0.45, 0, 1) * (m.state === STATE.APPROACH || m.state === STATE.READY ? 1 : 0.6);
        ctx.strokeStyle = `rgba(${mixRGB(PAL.coolWhite, PAL.gold, warm)},${(((la - 0.5) * 0.9) * (1 - enter * 0.25)).toFixed(3)})`;
        ctx.lineWidth = 1.3 * (0.5 + ((pa.p + pb.p) / 2) * 1.2);
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      });
      ctx.shadowBlur = 0;

      // 28 颗星
      pos.forEach((p, i) => {
        const n = NODES[i]!;
        const ch = m.chaos[i]!;
        const tw = 0.7 + 0.3 * Math.sin(now * (1 + ch.sp) + ch.ph);
        const warmth = clamp((p.conv - 0.55) / 0.45, 0, 1) * (m.state === STATE.APPROACH || m.state === STATE.READY ? 1 : 0.55);
        const depth = 0.35 + p.p * 1.5; // 近大远小
        const r = (n.big ? 3.2 : 2.0) * (0.5 + 0.5 * p.conv) * depth;
        ctx.globalAlpha = clamp(p.conv * tw, 0, 1);
        ctx.fillStyle = `rgb(${mixRGB(PAL.coolWhite, PAL.cream, warmth)})`;
        ctx.shadowColor = `rgba(${mixRGB([255, 255, 255], PAL.gold, warmth)},0.75)`;
        ctx.shadowBlur = (n.big ? 12 : 7) * depth;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      if (m.state === STATE.ENTER) {
        const k = smooth(0.55, 1.35, m.t);
        ctx.save();
        ctx.globalAlpha = k;
        ctx.strokeStyle = `rgba(232,200,138,${0.12 + k * 0.34})`;
        ctx.lineWidth = 1;
        for (let i = 0; i < 4; i++) {
          const x = m.w * (0.22 + i * 0.185);
          ctx.beginPath();
          ctx.moveTo(x, m.h * 0.32);
          ctx.lineTo(x, m.h * 0.72);
          ctx.stroke();
        }
        for (let i = 0; i < 7; i++) {
          const y = m.h * (0.36 + i * 0.05);
          ctx.beginPath();
          ctx.moveTo(m.w * 0.16, y);
          ctx.lineTo(m.w * 0.84, y);
          ctx.stroke();
        }
        ctx.restore();
      }

      // 文字也来自满屏星河，但必须在星兽成形之后再生成。
      if (m.state === STATE.FORMATION || m.state === STATE.APPROACH || m.state === STATE.READY) {
        const cx = m.w / 2;
        const lineStarts = [0.2, 0.55, 3.1];
        const gather = 1.35;
        m.textStars.forEach((s, i) => {
          const t0 = lineStarts[s.line]!;
          const stagger = ((i % 19) / 19) * 0.38;
          const e = smooth(t0 + stagger, t0 + gather + stagger, m.afterForm);
          if (e <= 0.001) return;
          const x = lerp(s.ox, s.tx, e);
          const y = lerp(s.oy, s.ty, e);
          const tw = 0.65 + 0.35 * Math.sin(now * s.sp + s.ph);
          const solid = smooth(t0 + gather - 0.1, t0 + gather + 0.8, m.afterForm);
          const a = e * 0.85 * tw * (1 - solid * 0.55) * (1 - enter);
          ctx.fillStyle = `rgba(${mixRGB(PAL.coolWhite, PAL.cream, e)},${a.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(x, y, 1.1, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const textSize = Math.min(18, m.w * 0.046);
        [
          { text: TOP_LINES[0], y: 0.18, start: lineStarts[0]!, weight: 600 },
          { text: TOP_LINES[1], y: 0.23, start: lineStarts[1]!, weight: 600 },
          { text: CTA_LINE, y: 0.82, start: lineStarts[2]!, weight: 700 },
        ].forEach((line) => {
          const solid = smooth(line.start + gather - 0.1, line.start + gather + 0.8, m.afterForm);
          if (solid <= 0.001) return;
          ctx.font = `${line.weight} ${textSize}px ${SANS}`;
          ctx.fillStyle = `rgba(255,247,228,${(solid * 0.95 * (1 - enter)).toFixed(3)})`;
          ctx.fillText(line.text, cx, m.h * line.y);
        });
        const ctaSolid = smooth(lineStarts[2]! + gather - 0.1, lineStarts[2]! + gather + 0.8, m.afterForm);
        if (ctaSolid > 0.001) {
          ctx.font = `${Math.min(13, m.w * 0.033)}px ${MONO}`;
          ctx.fillStyle = `rgba(232,200,138,${(ctaSolid * 0.7 * (1 - enter)).toFixed(3)})`;
          ctx.fillText("轻触 · 开始", cx, m.h * 0.88);
          ctx.font = `${Math.min(11, m.w * 0.028)}px ${MONO}`;
          ctx.fillStyle = `rgba(232,200,138,${(ctaSolid * 0.42 * (1 - enter)).toFixed(3)})`;
          ctx.fillText("观爻 · GUANYAO", cx, m.h * 0.94);
        }
        ctx.textBaseline = "alphabetic";
      }

      if (m.debug) {
        ctx.fillStyle = "rgba(232,200,138,0.9)";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.font = `11px ${MONO}`;
        ctx.fillText(`state=${m.state} fps=${m.fps.toFixed(0)} t=${m.t.toFixed(2)} nodes=${NODES.length}`, 8, 8);
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

    let dbl = 0;
    function onDown(e: PointerEvent) {
      audio.ensure();
      const r = canvas!.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x > m.w - 60 && y < 60) {
        const t = performance.now();
        if (t - dbl < 350) m.debug = !m.debug;
        dbl = t;
      }
      if (m.state === STATE.READY && m.presentDone) {
        m.state = STATE.ENTER;
        m.t = 0;
        m.entryStarted = false;
        audio.form();
        vibrate([0, 18, 28]);
      }
    }

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointerdown", onDown);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <GyMobilePreviewFrame background="#070512">
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block", touchAction: "none" }} />
    </GyMobilePreviewFrame>
  );
}
