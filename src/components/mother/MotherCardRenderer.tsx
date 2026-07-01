/**
 * MotherCardRenderer
 *
 * Single Source UI Renderer for Mother Card snapshots.
 *
 * It accepts an already locked guanyao:personaOutputSnapshot-derived object.
 * It does not import engines, does not compute persona data, and does not mutate snapshots.
 */

import type { MotherCardReadonlySnapshot } from "../../services/guanyaoPersonaSnapshotCache";

const SANS = "-apple-system, system-ui, sans-serif";
const MONO = "SFMono-Regular, Menlo, Monaco, Consolas, monospace";

const CORE_POINTS = [
  [0, -0.32, 1.6],
  [-0.18, -0.18, 1.1],
  [0.18, -0.18, 1.1],
  [-0.28, 0.02, 1.0],
  [0, 0, 1.8],
  [0.28, 0.02, 1.0],
  [-0.16, 0.2, 1.0],
  [0.16, 0.2, 1.0],
  [0, 0.34, 1.4],
] as const;

export type MotherCardRendererOptions = {
  ctx: CanvasRenderingContext2D;
  snapshot: MotherCardReadonlySnapshot;
  width: number;
  height: number;
  alpha?: number;
};

function roundedRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
}

export function drawMotherCardRenderer({ ctx, snapshot, width, height, alpha = 1 }: MotherCardRendererOptions) {
  const cx = width / 2;
  const cy = height * 0.45;

  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.fillStyle = "rgba(3,4,8,0.94)";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(255,247,228,0.2)";
  for (const [px, py, radius] of CORE_POINTS) {
    ctx.beginPath();
    ctx.arc(cx + px * width * 0.52, cy + py * height * 0.34, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 74);
  core.addColorStop(0, "rgba(255,247,228,0.34)");
  core.addColorStop(0.34, "rgba(232,200,138,0.16)");
  core.addColorStop(1, "rgba(232,200,138,0)");
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(cx, cy, 74, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(255,247,228,0.96)";
  ctx.beginPath();
  ctx.arc(cx, cy, 4.2, 0, Math.PI * 2);
  ctx.fill();

  const cardW = Math.min(330, width * 0.76);
  const cardH = Math.min(390, height * 0.46);
  const cardX = cx - cardW / 2;
  const cardY = height * 0.29;
  ctx.strokeStyle = "rgba(232,200,138,0.7)";
  ctx.lineWidth = 1;
  ctx.shadowColor = "rgba(232,200,138,0.24)";
  ctx.shadowBlur = 18;
  roundedRectPath(ctx, cardX, cardY, cardW, cardH, 18);
  ctx.stroke();
  ctx.shadowBlur = 0;

  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.font = `650 ${Math.min(11, width * 0.03)}px ${MONO}`;
  ctx.fillStyle = "rgba(232,200,138,0.68)";
  ctx.fillText("MOTHER STATIC SNAPSHOT", cardX + 24, cardY + 24);

  ctx.font = `800 ${Math.min(30, width * 0.075)}px ${SANS}`;
  ctx.fillStyle = "rgba(255,247,228,0.96)";
  ctx.fillText(`${snapshot.trigram}｜${snapshot.motherCode}`, cardX + 24, cardY + 70);

  ctx.font = `650 ${Math.min(15, width * 0.04)}px ${SANS}`;
  ctx.fillStyle = "rgba(232,200,138,0.78)";
  ctx.fillText(`四象｜${snapshot.direction}`, cardX + 24, cardY + 124);

  ctx.fillStyle = "rgba(255,247,228,0.82)";
  ctx.fillText(`坐标｜${snapshot.chrono}`, cardX + 24, cardY + 156);

  ctx.fillStyle = "rgba(255,247,228,0.62)";
  ctx.font = `600 ${Math.min(12, width * 0.033)}px ${SANS}`;
  ctx.fillText(`星源｜${snapshot.starOrigin}`, cardX + 24, cardY + 188);

  ctx.fillStyle = "rgba(255,247,228,0.54)";
  ctx.font = `600 ${Math.min(12, width * 0.033)}px ${SANS}`;
  ctx.fillText("COLLAPSE_COMPLETE", cardX + 24, cardY + cardH - 76);
  ctx.fillText("MOTHER_STATIC_RENDER", cardX + 24, cardY + cardH - 52);
  ctx.fillText(snapshot.cacheStatus === "hit" ? "CACHE_LOCKED" : "CACHE_PENDING", cardX + 24, cardY + cardH - 28);

  ctx.textAlign = "center";
  ctx.font = `650 ${Math.min(13, width * 0.034)}px ${SANS}`;
  ctx.fillStyle = "rgba(255,247,228,0.66)";
  ctx.fillText("结果已固定。", cx, cardY + cardH + 36);
  ctx.restore();
}
