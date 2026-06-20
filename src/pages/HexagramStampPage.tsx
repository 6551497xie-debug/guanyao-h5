// GUANYAO 2.0 = immutable causal engine with a read-only hexagram stamp layer between pressure seed loading and pressure exposure.
// HexagramStampPage reads the upstream hexagram result only; it does not generate, select, or reinterpret the engine output.
import { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getGuanyaoR8ReadModel } from "../adapters/guanyaoR8ReadModelAdapter";
import { GyMobilePreviewFrame } from "../components/visual/GyMobilePreviewFrame";
import { guanyaoHexagramAssetLibrary } from "../data/guanyaoHexagramAssetLibrary";
import { guanyaoHexagramGlyphs, type HexagramLineKind } from "../data/guanyaoHexagramGlyphs";
import { GUANYAO_ROUTES } from "../routes/guanyaoRoutes";

type StampState = "FORMING" | "CARD_EMERGE" | "CARD_SETTLED" | "CARD_LOCKED" | "AXIS_BREAK" | "SANDIFY";

type StampParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  alpha: number;
  size: number;
  color: string;
};

type StampData = {
  code: string;
  name: string;
  title: string;
  stampLines: string[];
  glyphLines?: HexagramLineKind[];
};

function normalizeCode(code: string | undefined) {
  const digits = (code ?? "").replace(/\D/g, "");
  if (!digits) return "058";
  return digits.padStart(3, "0").slice(-3);
}

function getStampData(): StampData {
  const readModel = getGuanyaoR8ReadModel();
  const hexagram = readModel.hexagramStage;
  const code = normalizeCode(hexagram.displayCode || hexagram.hexagramCode);
  const asset = guanyaoHexagramAssetLibrary[code];
  const displayName = hexagram.displayName || hexagram.hexagramName || "";
  const displayTitle = hexagram.displayTitle || hexagram.hexagramTitle || "";
  const isGenericName = !displayName || displayName.includes("本局") || displayName.includes("读取");
  const isGenericTitle = !displayTitle || displayTitle.includes("本局") || displayTitle.includes("读取");
  const name = isGenericName ? asset?.name || displayName || "本局卦码" : displayName;
  const title = isGenericTitle ? asset?.title || displayTitle || "显影" : displayTitle;

  return {
    code,
    name,
    title,
    stampLines: ["你被架在责任与自我的边界上。"],
    glyphLines: guanyaoHexagramGlyphs[code]?.linesTopToBottom,
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function vibrate(pattern: number | number[]) {
  if ("vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
}

function mixColdWhite(progress: number) {
  const value = clamp(progress, 0, 1);
  const cold = { r: 2, g: 200, b: 223 };
  const white = { r: 248, g: 245, b: 234 };
  const r = Math.round(cold.r + (white.r - cold.r) * value);
  const g = Math.round(cold.g + (white.g - cold.g) * value);
  const b = Math.round(cold.b + (white.b - cold.b) * value);
  return `rgb(${r}, ${g}, ${b})`;
}

function mixColdGold(progress: number) {
  const value = clamp(progress, 0, 1);
  const cold = { r: 2, g: 200, b: 223 };
  const gold = { r: 199, g: 169, b: 107 };
  const r = Math.round(cold.r + (gold.r - cold.r) * value);
  const g = Math.round(cold.g + (gold.g - cold.g) * value);
  const b = Math.round(cold.b + (gold.b - cold.b) * value);
  return `rgb(${r}, ${g}, ${b})`;
}

export function HexagramStampPage() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stampData = useMemo(() => getStampData(), []);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const renderingContext = canvasElement.getContext("2d");
    if (!renderingContext) return;
    const canvas = canvasElement as HTMLCanvasElement;
    const ctx = renderingContext as CanvasRenderingContext2D;

    let width = 0;
    let height = 0;
    let state: StampState = "FORMING";
    let frame = 0;
    let typedCount = 0;
    let emergeFrame = 0;
    let settledFrame = 0;
    let lockFrame = 0;
    let axisBreakFrame = 0;
    let sandifyFrame = 0;
    let animationId = 0;
    let isDraggingAxis = false;
    let isCardTapCandidate = false;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let cardFlipTarget = 0;
    let cardFlipProgress = 0;
    let particles: StampParticle[] = [];
    let entryParticles: StampParticle[] = [];
    const rail = {
      x: 0,
      y: 0,
      w: 0,
      progress: 0,
      currentProgress: 0,
    };

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rail.x = width * 0.08;
      rail.y = height * 0.82;
      rail.w = width * 0.84;
    }

    function text(value: string, x: number, y: number, size: number, color: string, weight = "700", align: CanvasTextAlign = "left") {
      ctx.font = `${weight} ${size}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
      ctx.fillStyle = color;
      ctx.textAlign = align;
      ctx.textBaseline = "alphabetic";
      ctx.fillText(value, x, y);
    }

    function easeOutCubic(value: number) {
      return 1 - Math.pow(1 - clamp(value, 0, 1), 3);
    }

    function makeParticles() {
      particles = [];
      const cx = width * 0.5;
      const cy = height * 0.49;
      for (let i = 0; i < 180; i += 1) {
        particles.push({
          x: cx + (Math.random() - 0.5) * width * 0.42,
          y: cy + (Math.random() - 0.5) * height * 0.24,
          vx: (Math.random() - 0.5) * 0.4,
          vy: 1.2 + Math.random() * 4.2,
          life: 68 + Math.random() * 44,
          alpha: 0.35 + Math.random() * 0.65,
          size: 0.7 + Math.random() * 1.7,
          color: Math.random() > 0.35 ? "#02c8df" : "#f8f5ea",
        });
      }
    }

    function makeEntryParticles() {
      entryParticles = [];
      for (let i = 0; i < 120; i += 1) {
        entryParticles.push({
          x: width * (0.22 + Math.random() * 0.56),
          y: height * (0.9 + Math.random() * 0.16),
          vx: (Math.random() - 0.5) * 0.22,
          vy: -(1.5 + Math.random() * 4.2),
          life: 46 + Math.random() * 58,
          alpha: 0.28 + Math.random() * 0.5,
          size: 0.7 + Math.random() * 1.6,
          color: Math.random() > 0.18 ? "#02c8df" : "#f8f5ea",
        });
      }
    }

    function drawHexagramLine(y: number, kind: HexagramLineKind, cx: number, halfLen: number, color: string, alpha: number, splitProgress = 0) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.lineCap = "square";
      ctx.shadowColor = color;
      ctx.shadowBlur = 5;
      ctx.beginPath();
      const splitGap = splitProgress * width * 0.105;

      if (kind === "yang") {
        ctx.moveTo(cx - halfLen, y);
        ctx.lineTo(cx - splitGap, y);
        ctx.moveTo(cx + splitGap, y);
        ctx.lineTo(cx + halfLen, y);
      } else {
        const gap = 6 + splitGap;
        ctx.moveTo(cx - halfLen, y);
        ctx.lineTo(cx - gap, y);
        ctx.moveTo(cx + gap, y);
        ctx.lineTo(cx + halfLen, y);
      }

      ctx.stroke();
      ctx.restore();
    }

    function drawGlyph(color: string, intensity: number, splitProgress = 0, axisProgress = 0) {
      const cx = width * 0.5;
      const originY = height * 0.47;
      const axisY = rail.y;
      const cy = originY + (axisY - originY) * axisProgress;
      const lines = stampData.glyphLines;

      ctx.save();
      ctx.translate(cx, cy);
      const idleScale = 1 + Math.sin(frame * 0.025) * 0.006;
      const glyphScale = idleScale * (0.82 - axisProgress * 0.7);
      ctx.scale(glyphScale, glyphScale);
      ctx.translate(-cx, -cy);

      if (!lines) {
        text("GLYPH_PENDING", cx, cy, 12, "#4d4d4d", "700", "center");
        ctx.restore();
        return;
      }

      const gap = height * 0.027;
      const groupGap = height * 0.018;
      const baseHalfLen = width * 0.16;
      lines.forEach((line, index) => {
        const localProgress = clamp(intensity * 1.25 - index * 0.08, 0, 1);
        const y = cy + (index - 2.5) * gap + (index >= 3 ? groupGap : -groupGap);
        drawHexagramLine(y, line, cx, baseHalfLen * localProgress, color, (0.35 + localProgress * 0.65) * (1 - axisProgress * 0.75), splitProgress);
      });

      ctx.restore();

      if (axisProgress > 0.01) {
        ctx.save();
        ctx.globalAlpha = axisProgress;
        ctx.strokeStyle = "rgba(2,200,223,0.72)";
        ctx.lineWidth = 1;
        ctx.shadowColor = "#02c8df";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(rail.x, axisY);
        ctx.lineTo(rail.x + rail.w, axisY);
        ctx.stroke();
        ctx.restore();
      }
    }

    function drawCard(progress: number) {
      if (progress <= 0) return;

      const eased = easeOutCubic(progress);
      const cardGold = "#C7A96B";
      const { cardW, cardH, settledY } = getCardMetrics();
      const cx = width * 0.5;
      const y = height * 0.47 + (settledY - height * 0.47) * eased;
      const rotate = (1 - eased) * Math.PI;
      const flipRotate = cardFlipProgress * Math.PI;
      const flipScale = Math.max(0.12, Math.abs(Math.cos(flipRotate)));
      const lockProgress =
        state === "CARD_LOCKED"
          ? easeOutCubic(clamp(lockFrame / 18, 0, 1))
          : state === "AXIS_BREAK" || state === "SANDIFY"
            ? 1
            : 0;
      const isCardLocked = state === "CARD_LOCKED" || state === "AXIS_BREAK" || state === "SANDIFY";
      const lockFlipScale = Math.max(0.1, Math.abs(Math.cos(lockProgress * Math.PI)));
      const lockImpactScale = 1 + Math.sin(lockProgress * Math.PI) * 0.08;
      const preLockSpin = state === "CARD_SETTLED" ? Math.sin(frame * 0.018) * 0.08 : 0;
      const scaleX = Math.max(0.12, Math.abs(Math.cos(rotate))) * (0.72 + eased * 0.28) * flipScale * lockFlipScale * lockImpactScale;
      const scaleY = (0.76 + eased * 0.24) * (1 + lockProgress * 0.035);
      const showBack = cardFlipProgress > 0.5;
      const cardTextColor = isCardLocked ? "#f8f5ea" : "rgba(255,255,255,0.46)";
      const cardTitleColor = isCardLocked ? cardGold : "rgba(199,169,107,0.46)";
      const cardMutedColor = isCardLocked ? "rgba(199,169,107,0.62)" : "rgba(255,255,255,0.22)";

      ctx.save();
      ctx.translate(cx, y - Math.sin(lockProgress * Math.PI) * height * 0.035);
      ctx.rotate(preLockSpin);
      ctx.scale(scaleX, scaleY);
      ctx.globalAlpha = clamp(progress * 1.4, 0, 1);

      ctx.fillStyle = "#050505";
      ctx.strokeStyle = progress > 0.92 ? cardGold : "rgba(199,169,107,0.5)";
      ctx.lineWidth = 1;
      ctx.shadowColor = cardGold;
      ctx.shadowBlur = 14 * eased;
      ctx.beginPath();
      ctx.roundRect(-cardW / 2, -cardH / 2, cardW, cardH, 7);
      ctx.fill();
      ctx.stroke();

      ctx.shadowBlur = 0;
      if (lockProgress > 0.04) {
        text(`CODE: NO.${stampData.code}`, 0, -cardH * 0.48, 10, "rgba(199,169,107,0.78)", "900", "center");
      }
      if (showBack) {
        text(`${stampData.code}｜${stampData.name}`, 0, -cardH * 0.34, 10, cardMutedColor, "800", "center");
        drawMiniCardGlyph(0, -cardH * 0.08, cardW * 0.19, cardGold);
        text("卦码已落位", 0, cardH * 0.2, 13, cardTextColor, "900", "center");
        text("轻点翻回", 0, cardH * 0.33, 8, "rgba(255,255,255,0.24)", "800", "center");
      } else {
        text(`NO.${stampData.code}`, -cardW * 0.36, -cardH * 0.34, 10, cardMutedColor, "800");
        text(stampData.name, 0, -cardH * 0.18, 26, cardTextColor, "900", "center");
        text(`《${stampData.title}》`, 0, -cardH * 0.04, 18, cardTitleColor, "900", "center");
        text("GUANYAO", 0, cardH * 0.36, 9, "rgba(255,255,255,0.26)", "800", "center");
      }
      ctx.restore();
    }

    function drawMiniCardGlyph(cx: number, cy: number, halfLen: number, color: string) {
      const lines = stampData.glyphLines;
      if (!lines) return;

      lines.forEach((line, index) => {
        const y = cy + (index - 2.5) * 8;
        if (line === "yang") {
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(cx - halfLen, y);
          ctx.lineTo(cx + halfLen, y);
          ctx.stroke();
          return;
        }

        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx - halfLen, y);
        ctx.lineTo(cx - 5, y);
        ctx.moveTo(cx + 5, y);
        ctx.lineTo(cx + halfLen, y);
        ctx.stroke();
      });
    }

    function getCardMetrics() {
      const cardW = width * 0.58;
      const cardH = cardW * 1.34;
      const settledY = height * 0.49;
      return { cardW, cardH, settledY };
    }

    function drawAxisRail() {
      const progress = rail.currentProgress;
      const knobX = rail.x + rail.w * progress;
      const isLockedRail = state === "CARD_LOCKED" || state === "AXIS_BREAK" || state === "SANDIFY";
      const railColor = "#02c8df";
      const knobColor = isLockedRail ? "#02c8df" : "rgba(255,255,255,0.34)";
      const breakProgress = state === "AXIS_BREAK" || state === "SANDIFY" ? easeOutCubic(clamp(axisBreakFrame / 30, 0, 1)) : 0;
      const fractureGap = width * 0.028 * breakProgress;
      const fractureLift = height * 0.012 * breakProgress;
      const breakX = rail.x + rail.w * 0.5;

      rail.currentProgress += (rail.progress - rail.currentProgress) * 0.2;

      ctx.save();
      ctx.lineWidth = 1;
      ctx.strokeStyle = isLockedRail ? "rgba(2,200,223,0.32)" : "rgba(255,255,255,0.24)";
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.moveTo(rail.x, rail.y);
      ctx.lineTo(breakX - fractureGap, rail.y - fractureLift);
      ctx.moveTo(breakX + fractureGap, rail.y + fractureLift);
      ctx.lineTo(rail.x + rail.w, rail.y + fractureLift);
      ctx.stroke();

      ctx.strokeStyle = railColor;
      ctx.globalAlpha = isLockedRail ? 0.95 : progress > 0 ? 0.86 : 0;
      ctx.shadowColor = isLockedRail ? "#02c8df" : "transparent";
      ctx.shadowBlur = progress > 0 ? 8 : 0;
      ctx.beginPath();
      ctx.moveTo(rail.x, rail.y);
      ctx.lineTo(Math.min(knobX, breakX - fractureGap), rail.y - fractureLift);
      if (knobX > breakX) {
        ctx.moveTo(breakX + fractureGap, rail.y + fractureLift);
        ctx.lineTo(knobX, rail.y + fractureLift);
      }
      ctx.stroke();

      ctx.fillStyle = knobColor;
      ctx.shadowColor = knobColor;
      ctx.shadowBlur = isLockedRail ? 10 : 0;
      ctx.beginPath();
      ctx.arc(knobX, rail.y + fractureLift, 4.2 * (1 - breakProgress * 0.35), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function drawParticles() {
      particles = particles
        .map((particle) => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vy: particle.vy + 0.045,
          life: particle.life - 1,
          alpha: particle.alpha * 0.985,
        }))
        .filter((particle) => particle.life > 0 && particle.y < height + 40);

      particles.forEach((particle) => {
        ctx.save();
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = particle.color;
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
        ctx.restore();
      });
    }

    function drawLockImpact() {
      if (state !== "CARD_LOCKED" || lockFrame > 18) return;
      const pulse = 1 - clamp(lockFrame / 18, 0, 1);
      ctx.save();
      ctx.globalAlpha = pulse * 0.26;
      ctx.strokeStyle = "#02c8df";
      ctx.lineWidth = 1;
      ctx.shadowColor = "#02c8df";
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.moveTo(width * 0.08, height * 0.5);
      ctx.lineTo(width * 0.92, height * 0.5);
      ctx.moveTo(width * 0.5, height * 0.18);
      ctx.lineTo(width * 0.5, height * 0.82);
      ctx.stroke();
      ctx.restore();
    }

    function drawEntryParticles() {
      entryParticles = entryParticles
        .map((particle) => ({
          ...particle,
          x: particle.x + particle.vx + (width * 0.5 - particle.x) * 0.018,
          y: particle.y + particle.vy + (height * 0.47 - particle.y) * 0.018,
          vy: particle.vy * 0.95,
          life: particle.life - 1,
          alpha: particle.alpha * 0.978,
        }))
        .filter((particle) => particle.life > 0);

      entryParticles.forEach((particle) => {
        const colorProgress = clamp(frame / 84, 0, 1);
        ctx.save();
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = particle.color === "#02c8df" ? mixColdWhite(colorProgress * 0.62) : particle.color;
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
        ctx.restore();
      });
    }

    function draw() {
      frame += 1;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);
      const density = ctx.createLinearGradient(0, height * 0.2, width, height * 0.78);
      density.addColorStop(0, "rgba(2,200,223,0)");
      density.addColorStop(0.5, "rgba(2,200,223,0.035)");
      density.addColorStop(1, "rgba(248,245,234,0)");
      ctx.fillStyle = density;
      ctx.fillRect(0, 0, width, height);

      const cold = "#02c8df";
      const fg = "#f8f5ea";
      const muted = "rgba(255,255,255,0.34)";
      const isCardVisible = state === "CARD_EMERGE" || state === "CARD_LOCKED" || state === "AXIS_BREAK" || state === "SANDIFY";
      const isCardLocked = state === "CARD_LOCKED" || state === "AXIS_BREAK" || state === "SANDIFY";
      const titleColor = isCardVisible ? fg : "rgba(255,255,255,0.24)";
      const subtitleColor = isCardVisible ? cold : "rgba(255,255,255,0.28)";
      cardFlipProgress += (cardFlipTarget - cardFlipProgress) * 0.18;

      if (state === "FORMING" && frame === 1) {
        makeEntryParticles();
      }

      if (state === "FORMING" && frame > 98) {
        state = "CARD_SETTLED";
        typedCount = 0;
        settledFrame = 0;
      }

      if (state === "CARD_EMERGE") {
        emergeFrame += 1;
        if (emergeFrame === 1) {
          vibrate([22, 24, 40]);
        }
        if (emergeFrame > 78) {
          state = "CARD_LOCKED";
          typedCount = 0;
          lockFrame = 0;
          rail.progress = 0;
          rail.currentProgress = 0;
        }
      }

      if (state === "CARD_SETTLED") {
        settledFrame += 1;
      }

      if (state === "CARD_LOCKED") {
        lockFrame += 1;
        if (lockFrame % 4 === 0) {
          typedCount += 1;
          vibrate(5);
        }
      }

      if (state === "AXIS_BREAK") {
        axisBreakFrame += 1;
        if (axisBreakFrame > 70) {
          state = "SANDIFY";
          makeParticles();
        }
      }

      text(`05_STAMP // NO.${stampData.code}`, width * 0.08, height * 0.07, 8, "rgba(255,255,255,0.16)", "700");
      text(`它叫「${stampData.name}」`, width * 0.08, height * 0.15, 18, titleColor, "900");
      text(`《${stampData.title}》`, width * 0.08, height * 0.205, 26, subtitleColor, "900");
      if (!isCardVisible) {
        text("时序、默认保护与压力种子三力对撞，", width * 0.08, height * 0.285, 12, "rgba(255,255,255,0.34)", "800");
        text("在这里压出本局卦符。", width * 0.08, height * 0.325, 12, "rgba(255,255,255,0.28)", "800");
      }

      const openProgress =
        state === "CARD_EMERGE" ? easeOutCubic(clamp(emergeFrame / 44, 0, 1)) : isCardLocked ? 1 : 0;
      const axisProgress =
        state === "CARD_EMERGE" ? easeOutCubic(clamp((emergeFrame - 18) / 58, 0, 1)) : isCardLocked ? 1 : 0;
      const cardProgress =
        state === "CARD_EMERGE" ? easeOutCubic(clamp((emergeFrame - 8) / 66, 0, 1)) : isCardLocked ? 1 : 0;
      const glyphIntensity =
        state === "FORMING" ? clamp(frame / 62, 0, 1) : 1;
      const glyphColor = state === "FORMING" ? mixColdGold(clamp(frame / 88, 0, 0.76)) : "rgba(199,169,107,0.42)";
      if (state === "FORMING") {
        drawEntryParticles();
      }
      drawGlyph(glyphColor, glyphIntensity, openProgress, axisProgress);
      drawCard(cardProgress);
      drawLockImpact();

      if (state === "CARD_SETTLED" || state === "CARD_LOCKED" || state === "AXIS_BREAK" || state === "SANDIFY") {
        drawAxisRail();
        const { cardH, settledY } = getCardMetrics();
        const captionY = settledY + cardH / 2 + height * 0.036;
        if (state !== "CARD_SETTLED") {
          let consumed = 0;
          stampData.stampLines.forEach((line, index) => {
            const shownLength = clamp(typedCount - consumed, 0, line.length);
            consumed += line.length;
            const display = state === "CARD_LOCKED" ? line.slice(0, shownLength) : line;
            text(display, width * 0.5, captionY + index * 20, 14, "rgba(248,245,234,0.9)", "900", "center");
          });
        }
        if (state === "AXIS_BREAK" || state === "SANDIFY") {
          text("卦码资产已沉积", rail.x, rail.y + 30, 11, "rgba(248,245,234,0.68)", "900");
          text("全线突防六维空间深渊第一层 · 身体空间", rail.x, rail.y + 47, 9, "rgba(255,255,255,0.46)", "800");
        } else if (state === "CARD_LOCKED") {
          text("卦码资产已沉积", rail.x, rail.y + 30, 11, "rgba(248,245,234,0.68)", "900");
          text("再次右滑，断裂进入身体空间", rail.x, rail.y + 47, 9, "rgba(255,255,255,0.42)", "800");
        } else {
          text("右滑，裂开卦符并压出卦码卡", rail.x, rail.y + 30, 11, "rgba(255,255,255,0.36)", "800");
        }
      }

      if (state === "SANDIFY") {
        sandifyFrame += 1;
        drawParticles();
        if (sandifyFrame > 78 && particles.length < 12) {
          navigate(GUANYAO_ROUTES.pressureExposure);
          return;
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    function pointerPosition(event: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    }

    function handlePointerDown(event: PointerEvent) {
      if (state !== "CARD_SETTLED" && state !== "CARD_LOCKED") return;
      const { x, y } = pointerPosition(event);
      pointerStartX = x;
      pointerStartY = y;
      const knobX = rail.x + rail.w * rail.progress;
      if (Math.abs(x - knobX) <= 34 && Math.abs(y - rail.y) <= 34) {
        isDraggingAxis = true;
        canvas.setPointerCapture(event.pointerId);
        return;
      }

      const { cardW, cardH, settledY } = getCardMetrics();
      const cardLeft = width * 0.5 - cardW / 2;
      const cardRight = width * 0.5 + cardW / 2;
      const cardTop = settledY - cardH / 2;
      const cardBottom = settledY + cardH / 2;
      if (state === "CARD_LOCKED" && x >= cardLeft && x <= cardRight && y >= cardTop && y <= cardBottom) {
        isCardTapCandidate = true;
        canvas.setPointerCapture(event.pointerId);
      }
    }

    function handlePointerMove(event: PointerEvent) {
      const { x, y } = pointerPosition(event);
      if (isCardTapCandidate && Math.hypot(x - pointerStartX, y - pointerStartY) > 10) {
        isCardTapCandidate = false;
      }
      if (!isDraggingAxis || (state !== "CARD_SETTLED" && state !== "CARD_LOCKED")) return;
      rail.progress = clamp((x - rail.x) / rail.w, 0, 1);
      if (rail.progress >= 0.985) {
        rail.progress = 1;
        rail.currentProgress = 1;
        isDraggingAxis = false;
        if (state === "CARD_SETTLED") {
          state = "CARD_EMERGE";
          emergeFrame = 0;
          typedCount = 0;
          rail.progress = 0;
          rail.currentProgress = 0;
          cardFlipTarget = 0;
          vibrate([18, 28, 36]);
        } else {
          state = "AXIS_BREAK";
          axisBreakFrame = 0;
          vibrate([18, 28, 36]);
        }
      }
    }

    function handlePointerUp(event: PointerEvent) {
      if (isCardTapCandidate) {
        isCardTapCandidate = false;
        cardFlipTarget = cardFlipTarget === 0 ? 1 : 0;
        vibrate(8);
        if (canvas.hasPointerCapture(event.pointerId)) {
          canvas.releasePointerCapture(event.pointerId);
        }
      }
      if (!isDraggingAxis) return;
      isDraggingAxis = false;
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
      if (rail.progress < 0.985) {
        rail.progress = 0;
      }
    }

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointercancel", handlePointerUp);
    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [navigate, stampData]);

  return (
    <GyMobilePreviewFrame background="#000">
      <canvas
        ref={canvasRef}
        aria-label="本局卦码钢印"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          touchAction: "none",
          background: "#000",
        }}
      />
    </GyMobilePreviewFrame>
  );
}
