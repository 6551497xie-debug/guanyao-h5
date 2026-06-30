// ─────────────────────────────────────────────────────────────────────────────
// 观爻 2.0 ·「星兽为脊 · 一光贯穿」隔离原型 STARBEAST LAB —— /starbeast-lab
//
// 隔离原型：独立路由/文件；不碰主链路 / 引擎。
//
// 新脊柱验证（星兽系统协议 + 阴阳平衡）：
//   脊柱不再是冷的一字线，而是「同一束星光」——
//     聚为兽（阳·陪你）：七宿光点聚成四象兽（此处青龙｜陪你启动）。
//     张为线（阴·你操作）：要动手时，同一组星把曲线的兽身「张成」一根你握住的线。
//     动完收回成兽（阳）：光收回成兽、亮得暖一点、留下一点光（沉积成光=正反馈）。
//   一种星光、一个在场，线只是它的出手形态 → 不分裂。
//
//   语言只接住/陪行/肯定（星兽语言协议）；声音用暖（非冷咔哒）；负反馈→正反馈。
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GyMobilePreviewFrame } from "../components/visual/GyMobilePreviewFrame";

const SANS = "-apple-system, system-ui, sans-serif";
const MONO = "SFMono-Regular, Menlo, Monaco, Consolas, monospace";

// 青龙七宿（东方·陪你启动）。x=屏宽分数；dy=兽身曲线 y 分数。心宿=本命宿(最亮)。
const DRAGON = [
  { x: 0.16, dy: 0.43 },
  { x: 0.28, dy: 0.52 },
  { x: 0.4, dy: 0.46 },
  { x: 0.52, dy: 0.55 },
  { x: 0.63, dy: 0.47, heart: true },
  { x: 0.75, dy: 0.56 },
  { x: 0.86, dy: 0.49 },
];
const LINE_Y = 0.53; // 张成线时的水平位置（低伏）

const CFG = {
  voidMs: 0.4,
  fieldMs: 0.9,
  gatherMs: 1.6,
  presentMs: 2.6,
  morphMs: 0.8, // 兽↔线 形变时长
  pullTravelFrac: 0.42,
  returnMs: 0.9,
  starfield: 90,
};

const COLOR = {
  bg: "#05050c",
  warm: "#E8C88A",
  warmCore: "#F4ECD8",
  warmBright: "#FFF3D0",
  field: "150,162,200",
  text: "#F4ECD8",
  textDim: "rgba(244,236,216,0.55)",
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

type FieldStar = { x: number; y: number; r: number; ph: number; sp: number };

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
  function warmTone(freq: number, dur: number, gain: number, type: OscillatorType = "sine") {
    const c = ensure();
    if (!c) return;
    const t = c.currentTime;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(c.destination);
    o.start(t);
    o.stop(t + dur + 0.05);
  }
  function gather() {
    // 暖和弦（聚拢）
    [261.6, 329.6, 392.0].forEach((f, i) => warmTone(f, 1.4, 0.07 - i * 0.012, "sine"));
  }
  function present() {
    warmTone(392, 0.9, 0.08, "sine");
    warmTone(523.25, 1.2, 0.05, "sine");
  }
  function settle() {
    // 暖共鸣钟（留下一点光·正反馈）
    warmTone(523.25, 1.6, 0.09, "sine");
    warmTone(784, 1.8, 0.05, "sine");
    warmTone(1046, 1.4, 0.03, "triangle");
  }
  function tick(freq: number) {
    warmTone(freq, 0.18, 0.04, "sine");
  }
  return { ensure, gather, present, settle, tick };
}

export function StarbeastLab() {
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
      state: "VOID" as "VOID" | "GATHER" | "PRESENT" | "OFFER" | "HOLD" | "RETURN",
      t: 0,
      pulsed: false,
      gatherLit: DRAGON.map(() => 0), // 每星点亮进度
      glow: 0.4, // 星兽整体暖亮度（正反馈随之升）
      straighten: 0, // 0=兽 1=线
      pull: 0,
      dragging: false,
      lastX: 0,
      dz: 0,
      retT: 0,
      motes: 1, // 已沉积的光（默认 1，演示）
      heartPulse: 0,
      field: [] as FieldStar[],
      msgPhase: 0,
      debug: false,
      fps: 0,
      fpsAcc: 0,
      fpsN: 0,
    };
    for (let i = 0; i < CFG.starfield; i++) {
      m.field.push({ x: Math.random(), y: Math.random(), r: 0.4 + Math.random() * 1.1, ph: Math.random() * 6.28, sp: 0.5 + Math.random() });
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
    }

    function starXY(i: number) {
      const d = DRAGON[i]!;
      const x = d.x * m.w;
      const y = lerp(d.dy, LINE_Y, m.straighten) * m.h;
      return { x, y };
    }
    function lineX0() {
      return DRAGON[0]!.x * m.w;
    }
    function lineX1() {
      return DRAGON[DRAGON.length - 1]!.x * m.w;
    }

    function step(dt: number) {
      m.t += dt;
      m.heartPulse = 0.5 + 0.5 * Math.sin(performance.now() / 700);
      switch (m.state) {
        case "VOID": {
          if (!m.pulsed && m.t > 0.16) {
            m.pulsed = true;
            vibrate([0, 12, 60]);
          }
          if (m.t >= CFG.voidMs) {
            m.state = "GATHER";
            m.t = 0;
          }
          break;
        }
        case "GATHER": {
          // 七宿逐个点亮 + 连线
          DRAGON.forEach((_, i) => {
            const at = CFG.fieldMs + (i / DRAGON.length) * CFG.gatherMs;
            const target = m.t > at ? 1 : 0;
            if (target && m.gatherLit[i]! < 0.02) audio.tick(330 + i * 40);
            m.gatherLit[i] = clamp((m.gatherLit[i] ?? 0) + dt / 0.4, 0, 1);
            if (m.t <= at) m.gatherLit[i] = clamp((m.gatherLit[i] ?? 0), 0, smooth(at - 0.4, at, m.t));
          });
          if (m.t < 0.05) audio.gather();
          if (m.t >= CFG.fieldMs + CFG.gatherMs + 0.4) {
            m.state = "PRESENT";
            m.t = 0;
            audio.present();
          }
          break;
        }
        case "PRESENT": {
          if (m.t >= CFG.presentMs) {
            m.state = "OFFER";
            m.t = 0;
          }
          break;
        }
        case "OFFER": {
          // 兽身张成线
          m.straighten = smooth(0, CFG.morphMs, m.t);
          if (!m.dragging && m.pull < 1) m.pull = Math.max(0, m.pull - dt * 1.4);
          break;
        }
        case "HOLD": {
          if (!m.dragging && m.pull < 1) m.pull = Math.max(0, m.pull - dt * 1.4);
          break;
        }
        case "RETURN": {
          m.retT += dt;
          m.straighten = 1 - smooth(0, CFG.returnMs, m.retT);
          if (m.retT >= CFG.returnMs + 1.4) {
            // 回到陪伴态，可再走一步
            m.state = "OFFER";
            m.t = 0;
            m.pull = 0;
          }
          break;
        }
      }
    }

    function draw(ctx: CanvasRenderingContext2D) {
      ctx.clearRect(0, 0, m.w, m.h);
      ctx.fillStyle = COLOR.bg;
      ctx.fillRect(0, 0, m.w, m.h);

      // 星河（深蓝微光，缓闪）
      const now = performance.now() / 1000;
      m.field.forEach((s) => {
        const a = 0.12 + 0.18 * (0.5 + 0.5 * Math.sin(now * s.sp + s.ph));
        ctx.fillStyle = `rgba(${COLOR.field},${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x * m.w, s.y * m.h, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      if (m.state === "VOID") {
        const beat = Math.abs(Math.sin(m.t * 14));
        ctx.fillStyle = `rgba(232,200,138,${(0.15 + 0.2 * beat).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(m.w / 2, m.h * 0.5, 2 + beat * 1.5, 0, Math.PI * 2);
        ctx.fill();
        return;
      }

      // 连线（兽身 / 张成的线）——暖光，亮度随 glow
      ctx.lineCap = "round";
      ctx.strokeStyle = `rgba(232,200,138,${(0.25 + m.glow * 0.35).toFixed(3)})`;
      ctx.lineWidth = lerp(1.6, 1.3, m.straighten);
      ctx.shadowColor = "rgba(232,200,138,0.4)";
      ctx.shadowBlur = 6 + m.glow * 6;
      ctx.beginPath();
      for (let i = 0; i < DRAGON.length; i++) {
        const p = starXY(i);
        const lit = m.gatherLit[i] ?? 0;
        if (i === 0) ctx.moveTo(p.x, p.y);
        else if (lit > 0.3) ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 七宿星点
      for (let i = 0; i < DRAGON.length; i++) {
        const p = starXY(i);
        const lit = m.gatherLit[i] ?? 0;
        if (lit < 0.02) continue;
        const heart = DRAGON[i]!.heart;
        const baseR = heart ? 3.4 : 2.4;
        const r = baseR + (heart ? m.heartPulse * 1.4 : 0) + m.glow * 0.8;
        ctx.globalAlpha = lit;
        ctx.fillStyle = COLOR.warmBright;
        ctx.shadowColor = "rgba(255,243,208,0.7)";
        ctx.shadowBlur = heart ? 14 : 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      // 沉积的光（绕心宿）
      const heartP = starXY(4);
      for (let k = 0; k < m.motes; k++) {
        const ang = now * 0.5 + (k / Math.max(1, m.motes)) * Math.PI * 2;
        const rad = 16 + (k % 3) * 5;
        ctx.fillStyle = `rgba(255,243,208,0.7)`;
        ctx.beginPath();
        ctx.arc(heartP.x + Math.cos(ang) * rad, heartP.y + Math.sin(ang) * rad, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // 握点（HOLD/OFFER 时，线上的光点）
      if (m.state === "OFFER" || m.state === "HOLD") {
        const x0 = lineX0();
        const x1 = lineX1();
        const ly = LINE_Y * m.h;
        const dotX = x0 + (x1 - x0) * m.pull;
        const demo = m.pull < 0.02 && m.straighten > 0.9;
        const tug = demo ? Math.max(0, Math.sin(performance.now() / 380)) * 9 : 0;
        // 已走段提亮
        ctx.strokeStyle = COLOR.warmBright;
        ctx.lineWidth = 1.6;
        ctx.shadowColor = "rgba(255,243,208,0.5)";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(x0, ly);
        ctx.lineTo(dotX, ly);
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.fillStyle = COLOR.warmBright;
        ctx.shadowColor = "rgba(255,243,208,0.7)";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(dotX + tug, ly, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 暖语言（只接住/陪行/肯定）
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      const cx = m.w / 2;
      function warmLine(big: string, small: string, alpha: number) {
        ctx.globalAlpha = alpha;
        ctx.fillStyle = COLOR.text;
        ctx.font = `${Math.min(22, m.w * 0.055)}px ${SANS}`;
        ctx.fillText(big, cx, m.h * 0.26);
        if (small) {
          ctx.fillStyle = COLOR.textDim;
          ctx.font = `${Math.min(14, m.w * 0.037)}px ${SANS}`;
          ctx.fillText(small, cx, m.h * 0.31);
        }
        ctx.globalAlpha = 1;
      }
      if (m.state === "PRESENT") {
        warmLine("我在。别怕。", "这里还有一点光。", smooth(0, 0.8, m.t));
      } else if (m.state === "OFFER" || m.state === "HOLD") {
        if (m.pull > 0.04) warmLine("你往前一点，我就亮一点。", "", 1);
        else warmLine("握住我递给你的光，", "走一步。", 1);
      } else if (m.state === "RETURN") {
        const a = smooth(0, 0.6, m.retT);
        warmLine("这一步，你做到了。", "光，留下了。", a);
        ctx.globalAlpha = a;
        ctx.fillStyle = COLOR.textDim;
        ctx.font = `${Math.min(12, m.w * 0.03)}px ${MONO}`;
        ctx.fillText(`已留下 ${m.motes} 点光`, cx, m.h * 0.74);
        ctx.globalAlpha = 1;
      }

      // 眉标（极轻）
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(232,200,138,0.55)";
      ctx.font = `${Math.min(11, m.w * 0.028)}px ${MONO}`;
      ctx.fillText("东方青龙 ｜ 陪你启动", m.w * 0.1, m.h * 0.1);

      if (m.debug) {
        ctx.fillStyle = "rgba(232,200,138,0.9)";
        ctx.textBaseline = "top";
        ctx.font = `11px ${MONO}`;
        [`state=${m.state} fps=${m.fps.toFixed(0)}`, `straighten=${m.straighten.toFixed(2)} pull=${m.pull.toFixed(2)} glow=${m.glow.toFixed(2)} motes=${m.motes}`].forEach((l, i) =>
          ctx.fillText(l, 8, 8 + i * 14),
        );
      }
    }

    function doReturn() {
      m.state = "RETURN";
      m.retT = 0;
      m.glow = Math.min(1, m.glow + 0.18);
      m.motes += 1;
      audio.settle();
      vibrate([0, 24, 40, 24]);
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
      if (m.state !== "OFFER" && m.state !== "HOLD") return;
      if (m.straighten < 0.85) return;
      m.dragging = true;
      m.state = "HOLD";
      m.lastX = x;
      m.dz = 0;
    }
    function onMove(e: PointerEvent) {
      if (!m.dragging || m.state !== "HOLD") return;
      const { x } = localXY(e);
      const dx = x - m.lastX;
      m.lastX = x;
      m.dz += Math.abs(dx);
      if (m.dz < 3) return;
      const width = CFG.pullTravelFrac * m.w;
      const before = m.pull;
      m.pull = clamp(m.pull + dx / width, 0, 1);
      if (Math.floor(m.pull * 6) !== Math.floor(before * 6)) audio.tick(440 + m.pull * 220);
      m.glow = Math.min(1, 0.4 + m.pull * 0.5); // 你往前一点，我就亮一点
      if (m.pull >= 0.97) {
        m.dragging = false;
        doReturn();
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
    <GyMobilePreviewFrame background="#05050c">
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block", touchAction: "none" }} />
    </GyMobilePreviewFrame>
  );
}
