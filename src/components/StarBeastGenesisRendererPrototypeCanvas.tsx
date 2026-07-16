import { useEffect, useRef } from "react";
import type { StarBeastGenesisRendererPrototypeInput } from "../types/starBeastGenesisVisualState";

type Props = Readonly<{
  input: StarBeastGenesisRendererPrototypeInput;
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

export function StarBeastGenesisRendererPrototypeCanvas({ input }: Props) {
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
      const pulse = (Math.sin(seconds * 1.3) + 1) / 2;
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
          const radius = index === 2 ? 5.5 + pulse * 1.4 : 2.8 + ((index + 1) % 3);
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
        const coreX = width * 0.43;
        const coreY = height * 0.45;
        drawGlow(context, coreX, coreY, Math.min(width, height) * (0.14 + pulse * 0.018), 0.32);
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

      if (stageDepth >= 4) {
        drawTigerPresence(context, width, height, pulse);
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
  }, [input]);

  return (
    <canvas
      ref={canvasRef}
      className="gy-genesis-renderer-slice__canvas"
      aria-label={`艮之白虎隔离视觉原型：${input.visualStateReference.stage}`}
    />
  );
}
