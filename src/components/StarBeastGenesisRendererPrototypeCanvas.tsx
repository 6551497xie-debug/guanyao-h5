import { useEffect, useRef } from "react";
import type { StarBeastCosmicConsciousnessState } from "../types/starBeastCosmicConsciousness";
import type { StarBeastGenesisRendererPrototypeInput } from "../types/starBeastGenesisVisualState";
import type { StarBeastStellarFleshState } from "../types/starBeastStellarFlesh";

type Props = Readonly<{
  input: StarBeastGenesisRendererPrototypeInput;
  consciousnessState: StarBeastCosmicConsciousnessState;
  stellarFleshState: StarBeastStellarFleshState;
}>;

const STAGE_DEPTH = Object.freeze({
  COSMIC_FIELD: 0,
  WESTERN_MANSION_ALIGNMENT: 1,
  WHITE_TIGER_FORMATION: 2,
  GEN_INFUSION: 3,
  WHITE_TIGER_REVEAL: 4,
});

const MANSION_POINTS = Object.freeze([
  [0.18, 0.46],
  [0.29, 0.4],
  [0.4, 0.47],
  [0.53, 0.4],
  [0.68, 0.45],
  [0.61, 0.6],
  [0.35, 0.6],
] as const);

const MANSION_CONNECTIONS = Object.freeze([
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 2],
  [1, 6],
  [2, 5],
] as const);

const STELLAR_FLESH_POINTS = Object.freeze([
  [184, 238],
  [225, 214],
  [271, 192],
  [318, 180],
  [365, 194],
  [412, 177],
  [459, 198],
  [507, 190],
  [552, 211],
  [596, 236],
  [218, 270],
  [267, 252],
  [315, 271],
  [362, 244],
  [409, 267],
  [456, 244],
  [503, 273],
  [551, 256],
  [595, 282],
  [279, 314],
  [367, 319],
  [459, 316],
  [536, 306],
] as const);

function drawGlow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  alpha: number,
) {
  const glow = ctx.createRadialGradient(x, y, 0, x, y, radius);
  glow.addColorStop(0, `rgba(255, 242, 204, ${alpha})`);
  glow.addColorStop(0.22, `rgba(219, 190, 126, ${alpha * 0.45})`);
  glow.addColorStop(1, "rgba(110, 126, 160, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function createTigerBoundary() {
  const boundary = new Path2D();
  boundary.moveTo(184, 276);
  boundary.bezierCurveTo(145, 268, 124, 238, 135, 202);
  boundary.lineTo(119, 164);
  boundary.lineTo(166, 181);
  boundary.lineTo(198, 145);
  boundary.lineTo(214, 190);
  boundary.bezierCurveTo(282, 145, 392, 132, 492, 154);
  boundary.bezierCurveTo(550, 167, 599, 190, 628, 222);
  boundary.bezierCurveTo(684, 194, 724, 142, 700, 103);
  boundary.bezierCurveTo(681, 71, 630, 82, 645, 119);
  boundary.bezierCurveTo(654, 140, 682, 135, 686, 112);
  boundary.bezierCurveTo(733, 176, 695, 252, 633, 273);
  boundary.bezierCurveTo(625, 322, 603, 348, 579, 356);
  boundary.lineTo(568, 452);
  boundary.lineTo(518, 452);
  boundary.lineTo(520, 354);
  boundary.bezierCurveTo(454, 371, 355, 371, 292, 348);
  boundary.lineTo(276, 453);
  boundary.lineTo(226, 453);
  boundary.lineTo(234, 329);
  boundary.bezierCurveTo(208, 317, 189, 302, 184, 276);
  return boundary;
}

function drawTigerPresence(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  pulse: number,
) {
  const scale = Math.min(width / 820, height / 570);
  const offsetX = (width - 820 * scale) / 2;
  const offsetY = (height - 570 * scale) / 2 + height * 0.035;

  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.scale(scale, scale);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  const boundary = createTigerBoundary();

  ctx.shadowColor = "rgba(229, 206, 158, 0.74)";
  ctx.shadowBlur = 22 + pulse * 9;
  ctx.strokeStyle = `rgba(237, 224, 196, ${0.38 + pulse * 0.12})`;
  ctx.lineWidth = 1.25;
  ctx.stroke(boundary);
  ctx.shadowBlur = 5;
  ctx.strokeStyle = "rgba(255, 246, 222, 0.42)";
  ctx.lineWidth = 0.55;
  ctx.stroke(boundary);
  ctx.restore();
}

function drawStellarFleshField(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  seconds: number,
  breath: number,
  stellarFleshState: StarBeastStellarFleshState,
) {
  const scale = Math.min(width / 820, height / 570);
  const offsetX = (width - 820 * scale) / 2;
  const offsetY = (height - 570 * scale) / 2 + height * 0.035;
  const isThin = stellarFleshState.fleshMode === "THIN_FIELD";
  const isSettling = stellarFleshState.fleshMode === "SETTLING_FIELD";
  const densityLimit = isThin ? 11 : isSettling ? 18 : STELLAR_FLESH_POINTS.length;
  const fieldAlpha = isThin ? 0.065 : isSettling ? 0.105 : 0.13;

  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.scale(scale, scale);
  if (stellarFleshState.fleshMode === "STABLE_LIVING_FIELD") {
    ctx.clip(createTigerBoundary());
  } else {
    const latentField = new Path2D();
    latentField.ellipse(408, 247, 265, 126, -0.02, 0, Math.PI * 2);
    ctx.clip(latentField);
  }
  ctx.globalCompositeOperation = "screen";

  const centralField = ctx.createRadialGradient(390, 242, 12, 390, 242, 255);
  centralField.addColorStop(0, `rgba(213, 198, 169, ${fieldAlpha + breath * 0.012})`);
  centralField.addColorStop(0.44, `rgba(125, 132, 151, ${fieldAlpha * 0.52})`);
  centralField.addColorStop(0.76, `rgba(75, 83, 108, ${fieldAlpha * 0.24})`);
  centralField.addColorStop(1, "rgba(34, 38, 55, 0)");
  ctx.fillStyle = centralField;
  ctx.fillRect(105, 80, 620, 390);

  const settledField = ctx.createRadialGradient(470, 284, 8, 470, 284, 190);
  settledField.addColorStop(0, `rgba(205, 178, 121, ${fieldAlpha * 0.62})`);
  settledField.addColorStop(0.56, `rgba(105, 112, 132, ${fieldAlpha * 0.34})`);
  settledField.addColorStop(1, "rgba(38, 42, 59, 0)");
  ctx.fillStyle = settledField;
  ctx.fillRect(220, 105, 450, 330);

  for (let index = 0; index < densityLimit; index += 1) {
    const [baseX, baseY] = STELLAR_FLESH_POINTS[index];
    const drift = Math.sin(seconds * 0.18 + index * 1.73) * (isThin ? 1.2 : 2.2);
    const depth = 0.22 + ((index * 7) % 9) * 0.032;
    ctx.fillStyle = `rgba(232, 222, 201, ${depth * (isThin ? 0.55 : 0.78)})`;
    ctx.beginPath();
    ctx.arc(baseX, baseY + drift, index % 5 === 0 ? 1.35 : 0.72, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.strokeStyle = `rgba(188, 180, 165, ${isThin ? 0.035 : 0.065})`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.ellipse(408, 245, 214, 76, -0.05, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(423, 271, 168, 53, 0.04, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawSparseConsciousnessFlow(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  seconds: number,
) {
  for (let index = 0; index < 9; index += 1) {
    const [from, to] = MANSION_CONNECTIONS[index];
    const [fromX, fromY] = MANSION_POINTS[from];
    const [toX, toY] = MANSION_POINTS[to];
    const progress = (seconds * 0.035 + index * 0.137) % 1;
    const x = (fromX + (toX - fromX) * progress) * width;
    const y = (fromY + (toY - fromY) * progress) * height;
    drawGlow(ctx, x, y, 9, 0.16);
    ctx.fillStyle = "rgba(255, 238, 199, 0.62)";
    ctx.beginPath();
    ctx.arc(x, y, index % 3 === 0 ? 1.25 : 0.72, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawInnerLight(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  breath: number,
) {
  const coreX = width * MANSION_POINTS[2][0];
  const coreY = height * MANSION_POINTS[2][1];
  const radius = Math.min(width, height) * 0.255;
  const light = ctx.createRadialGradient(coreX, coreY, 0, coreX, coreY, radius);
  light.addColorStop(0, `rgba(226, 194, 128, ${0.09 + breath * 0.025})`);
  light.addColorStop(0.5, `rgba(156, 151, 145, ${0.035 + breath * 0.012})`);
  light.addColorStop(1, "rgba(81, 91, 119, 0)");
  ctx.fillStyle = light;
  ctx.beginPath();
  ctx.arc(coreX, coreY, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawCoreBreath(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  breath: number,
  faint: boolean,
) {
  const coreX = width * MANSION_POINTS[2][0];
  const coreY = height * MANSION_POINTS[2][1];
  const baseRadius = Math.min(width, height) * (faint ? 0.075 : 0.12);
  drawGlow(
    ctx,
    coreX,
    coreY,
    baseRadius * (0.96 + breath * 0.05),
    faint ? 0.12 + breath * 0.05 : 0.24 + breath * 0.09,
  );
}

function drawSilentPresenceField(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const presence = ctx.createRadialGradient(
    width * 0.46,
    height * 0.65,
    0,
    width * 0.46,
    height * 0.65,
    Math.min(width, height) * 0.37,
  );
  presence.addColorStop(0, "rgba(212, 190, 143, 0.055)");
  presence.addColorStop(0.46, "rgba(112, 112, 121, 0.025)");
  presence.addColorStop(1, "rgba(5, 5, 11, 0)");
  ctx.fillStyle = presence;
  ctx.fillRect(0, 0, width, height);
}

export function StarBeastGenesisRendererPrototypeCanvas({
  input,
  consciousnessState,
  stellarFleshState,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 1;
    let height = 1;
    let animationFrame = 0;
    const stage = input.visualStateReference.stage;
    const stageDepth = STAGE_DEPTH[stage];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      const seconds = time / 1000;
      const structurePulse = (Math.sin(seconds * 0.8) + 1) / 2;
      const slowBreath = (Math.sin(seconds * 0.55 - Math.PI / 2) + 1) / 2;
      context.clearRect(0, 0, width, height);

      const field = context.createRadialGradient(
        width * 0.5,
        height * 0.46,
        0,
        width * 0.5,
        height * 0.46,
        Math.max(width, height) * 0.72,
      );
      field.addColorStop(0, "rgba(29, 31, 45, 0.98)");
      field.addColorStop(0.48, "rgba(9, 9, 18, 0.99)");
      field.addColorStop(1, "rgba(2, 2, 7, 1)");
      context.fillStyle = field;
      context.fillRect(0, 0, width, height);

      for (let index = 0; index < 72; index += 1) {
        const x = ((index * 97.37) % 997) / 997;
        const baseY = ((index * 53.11) % 991) / 991;
        const y = (baseY + seconds * (0.0015 + (index % 5) * 0.00045)) % 1;
        const alpha = 0.08 + ((index * 7) % 11) / 80;
        context.fillStyle = `rgba(220, 218, 210, ${alpha})`;
        context.beginPath();
        context.arc(x * width, y * height, index % 13 === 0 ? 1.2 : 0.55, 0, Math.PI * 2);
        context.fill();
      }

      drawGlow(context, width * 0.5, height * 0.47, Math.min(width, height) * 0.18, 0.05 + stageDepth * 0.018);

      if (
        consciousnessState.presenceReference.expressionState ===
        "SILENT_PRESENCE"
      ) {
        drawSilentPresenceField(context, width, height);
      }

      if (
        stellarFleshState.innerFieldReference.expressionState !== "ABSENT"
      ) {
        drawStellarFleshField(
          context,
          width,
          height,
          seconds,
          slowBreath,
          stellarFleshState,
        );
      }

      if (stageDepth >= 1) {
        context.save();
        context.lineCap = "round";
        context.strokeStyle = `rgba(213, 190, 137, ${stageDepth === 1 ? 0.28 : 0.47})`;
        context.lineWidth = stageDepth === 1 ? 0.8 : 1.1;
        if (stageDepth >= 1) {
          for (const [from, to] of MANSION_CONNECTIONS) {
            const [fromX, fromY] = MANSION_POINTS[from];
            const [toX, toY] = MANSION_POINTS[to];
            context.beginPath();
            context.moveTo(fromX * width, fromY * height);
            context.lineTo(toX * width, toY * height);
            context.stroke();
          }
        }

        MANSION_POINTS.forEach(([x, y], index) => {
          const radius = index === 2 ? 5.5 + structurePulse * 1.1 : 2.8 + ((index + 1) % 3);
          drawGlow(context, x * width, y * height, radius * 6.5, 0.18 + stageDepth * 0.06);
          context.fillStyle = "rgba(255, 242, 207, 0.96)";
          context.beginPath();
          context.arc(x * width, y * height, radius, 0, Math.PI * 2);
          context.fill();
        });
        context.restore();
      }

      if (stageDepth >= 2) {
        context.save();
        context.strokeStyle = `rgba(146, 159, 183, ${0.13 + stageDepth * 0.035})`;
        context.lineWidth = 0.75;
        context.beginPath();
        context.moveTo(width * 0.21, height * 0.43);
        context.quadraticCurveTo(width * 0.46, height * 0.25, width * 0.68, height * 0.43);
        context.quadraticCurveTo(width * 0.5, height * 0.72, width * 0.21, height * 0.43);
        context.stroke();
        context.restore();
      }

      if (stageDepth >= 3) {
        context.save();
        context.strokeStyle = "rgba(197, 175, 122, 0.12)";
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(width * 0.3, height * 0.67);
        context.lineTo(width * 0.5, height * 0.29);
        context.lineTo(width * 0.72, height * 0.67);
        context.stroke();
        context.restore();
      }

      if (
        consciousnessState.innerLightReference.expressionState ===
        "STABLE_SETTLING_FLOW"
      ) {
        drawInnerLight(context, width, height, slowBreath);
      }

      if (
        consciousnessState.starDustFlowReference.expressionState ===
        "SPARSE_CONTINUOUS_FLOW"
      ) {
        drawSparseConsciousnessFlow(context, width, height, seconds);
      }

      if (
        consciousnessState.coreBreathReference.expressionState !== "DORMANT"
      ) {
        drawCoreBreath(
          context,
          width,
          height,
          slowBreath,
          consciousnessState.coreBreathReference.expressionState ===
            "FAINT_BREATH",
        );
      }

      if (stageDepth >= 4) {
        drawTigerPresence(context, width, height, slowBreath);
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    animationFrame = window.requestAnimationFrame(draw);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, [consciousnessState, input, stellarFleshState]);

  return (
    <canvas
      ref={canvasRef}
      className="gy-genesis-renderer-slice__canvas"
      aria-label={`艮之白虎隔离视觉原型：${input.visualStateReference.stage}`}
      data-consciousness-mode={consciousnessState.consciousnessMode}
      data-stellar-flesh-mode={stellarFleshState.fleshMode}
    />
  );
}
