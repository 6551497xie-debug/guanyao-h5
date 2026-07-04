/**
 * EntryCardRenderer
 *
 * Renderer for the launch entry bridge.
 * It renders only the current product model:
 * PRESSURE -> TRANSFORMATION -> ASSET.
 */

const SANS = "-apple-system, system-ui, sans-serif";
const MONO = "SFMono-Regular, Menlo, Monaco, Consolas, monospace";

export type EntryCardSnapshot = {
  chrono?: string;
  direction?: string;
  trigram?: string;
  cacheStatus?: "missing" | "ready" | "hit";
  entryCode?: string;
  entrySource?: string;
};

export type EntryCardSide = "front" | "back";

export type EntryCardRendererOptions = {
  ctx: CanvasRenderingContext2D;
  snapshot: EntryCardSnapshot;
  width: number;
  height: number;
  alpha?: number;
  side?: EntryCardSide;
  flipProgress?: number;
};

export function getEntryCardRendererRect(width: number, height: number) {
  const cardW = Math.min(330, width * 0.76);
  const cardH = Math.min(430, height * 0.54);
  return {
    x: (width - cardW) / 2,
    y: height * 0.23,
    w: cardW,
    h: cardH,
  };
}

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

function drawWrappedText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  let line = "";
  let yy = y;
  for (const ch of text) {
    const test = line + ch;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, yy);
      line = ch;
      yy += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, yy);
}

function drawFrame(ctx: CanvasRenderingContext2D, rect: { x: number; y: number; w: number; h: number }) {
  const fill = ctx.createLinearGradient(rect.x, rect.y, rect.x + rect.w, rect.y + rect.h);
  fill.addColorStop(0, "rgba(5,10,12,0.96)");
  fill.addColorStop(0.56, "rgba(3,4,5,0.98)");
  fill.addColorStop(1, "rgba(12,10,6,0.96)");
  ctx.fillStyle = fill;
  roundedRectPath(ctx, rect.x, rect.y, rect.w, rect.h, 18);
  ctx.fill();

  ctx.strokeStyle = "rgba(232,200,138,0.72)";
  ctx.lineWidth = 1;
  ctx.shadowColor = "rgba(232,200,138,0.26)";
  ctx.shadowBlur = 18;
  roundedRectPath(ctx, rect.x, rect.y, rect.w, rect.h, 18);
  ctx.stroke();
  ctx.shadowBlur = 0;

  ctx.strokeStyle = "rgba(232,200,138,0.22)";
  ctx.lineWidth = 0.5;
  roundedRectPath(ctx, rect.x + 10, rect.y + 10, rect.w - 20, rect.h - 20, 14);
  ctx.stroke();
}

function drawDivider(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, alpha = 0.28) {
  ctx.strokeStyle = `rgba(232,200,138,${alpha})`;
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + w, y);
  ctx.stroke();
}

function drawStatusChip(ctx: CanvasRenderingContext2D, label: string, value: string, x: number, y: number, w: number) {
  roundedRectPath(ctx, x, y, w, 46, 8);
  ctx.fillStyle = "rgba(232,200,138,0.055)";
  ctx.fill();
  ctx.strokeStyle = "rgba(232,200,138,0.16)";
  ctx.lineWidth = 0.5;
  ctx.stroke();

  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillStyle = "rgba(232,200,138,0.58)";
  ctx.font = `650 9px ${MONO}`;
  ctx.fillText(label, x + 12, y + 8);
  ctx.fillStyle = "rgba(255,247,228,0.82)";
  ctx.font = `680 12px ${SANS}`;
  drawWrappedText(ctx, value, x + 12, y + 24, w - 24, 14);
}

function drawTransitionCore(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) {
  const ring = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.62);
  ring.addColorStop(0, "rgba(255,247,228,0.22)");
  ring.addColorStop(0.46, "rgba(232,200,138,0.1)");
  ring.addColorStop(1, "rgba(232,200,138,0)");
  ctx.fillStyle = ring;
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.62, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(232,200,138,0.84)";
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.26, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.42, -Math.PI * 0.18, Math.PI * 1.22);
  ctx.stroke();

  ctx.fillStyle = "rgba(255,247,228,0.94)";
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.055, 0, Math.PI * 2);
  ctx.fill();
}

function drawFront(ctx: CanvasRenderingContext2D, _snapshot: EntryCardSnapshot, rect: { x: number; y: number; w: number; h: number }) {
  const pad = Math.max(22, rect.w * 0.08);
  drawFrame(ctx, rect);

  ctx.textBaseline = "top";
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(232,200,138,0.64)";
  ctx.font = `650 ${Math.min(10, rect.w * 0.032)}px ${MONO}`;
  ctx.fillText("PRESSURE ENTRY", rect.x + pad, rect.y + pad);

  const pressureAura = ctx.createRadialGradient(rect.x + pad + 34, rect.y + pad + 70, 0, rect.x + pad + 34, rect.y + pad + 70, 92);
  pressureAura.addColorStop(0, "rgba(255,247,228,0.12)");
  pressureAura.addColorStop(0.48, "rgba(232,200,138,0.08)");
  pressureAura.addColorStop(1, "rgba(232,200,138,0)");
  ctx.fillStyle = pressureAura;
  ctx.beginPath();
  ctx.arc(rect.x + pad + 34, rect.y + pad + 70, 92, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(255,247,228,0.96)";
  ctx.font = `860 ${Math.min(42, rect.w * 0.13)}px ${SANS}`;
  ctx.fillText("PRESSURE", rect.x + pad, rect.y + pad + 50);

  ctx.fillStyle = "rgba(232,200,138,0.86)";
  ctx.font = `700 ${Math.min(18, rect.w * 0.056)}px ${SANS}`;
  ctx.fillText("状态已进入", rect.x + pad, rect.y + pad + 102);

  drawTransitionCore(ctx, rect.x + rect.w / 2, rect.y + rect.h * 0.43, rect.w * 0.7);

  drawDivider(ctx, rect.x + pad, rect.y + rect.h - 162, rect.w - pad * 2, 0.2);
  drawStatusChip(ctx, "当前阶段", "PRESSURE DETECTION", rect.x + pad, rect.y + rect.h - 146, rect.w - pad * 2);
  drawStatusChip(ctx, "下一步", "SEED GENERATION", rect.x + pad, rect.y + rect.h - 92, rect.w * 0.36);
  drawStatusChip(ctx, "目标", "ASSET", rect.x + rect.w * 0.47, rect.y + rect.h - 92, rect.w * 0.45);

  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(232,200,138,0.46)";
  ctx.font = `650 ${Math.min(11, rect.w * 0.034)}px ${MONO}`;
  ctx.fillText("PRESSURE -> TRANSFORMATION -> ASSET", rect.x + rect.w / 2, rect.y + rect.h - 34);
}

function drawBack(ctx: CanvasRenderingContext2D, _snapshot: EntryCardSnapshot, rect: { x: number; y: number; w: number; h: number }) {
  const pad = Math.max(22, rect.w * 0.08);
  drawFrame(ctx, rect);
  ctx.fillStyle = "rgba(232,200,138,0.035)";
  roundedRectPath(ctx, rect.x + pad, rect.y + pad + 120, rect.w - pad * 2, rect.h - pad * 2 - 150, 10);
  ctx.fill();

  ctx.textBaseline = "top";
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(232,200,138,0.64)";
  ctx.font = `650 ${Math.min(10, rect.w * 0.032)}px ${MONO}`;
  ctx.fillText("TRANSFORMATION INIT", rect.x + pad, rect.y + pad);

  ctx.fillStyle = "rgba(255,247,228,0.96)";
  ctx.font = `840 ${Math.min(30, rect.w * 0.092)}px ${SANS}`;
  ctx.fillText("六步转化", rect.x + pad, rect.y + pad + 48);

  ctx.fillStyle = "rgba(232,200,138,0.86)";
  ctx.font = `700 ${Math.min(15, rect.w * 0.048)}px ${SANS}`;
  ctx.fillText("入口状态", rect.x + pad, rect.y + pad + 96);
  ctx.fillStyle = "rgba(255,247,228,0.78)";
  ctx.font = `650 ${Math.min(14, rect.w * 0.044)}px ${SANS}`;
  ctx.fillText("当前压力正在进入结构化转化。", rect.x + pad, rect.y + pad + 118);

  drawDivider(ctx, rect.x + pad, rect.y + pad + 150, rect.w - pad * 2, 0.28);

  ctx.fillStyle = "rgba(232,200,138,0.64)";
  ctx.font = `650 ${Math.min(10, rect.w * 0.032)}px ${MONO}`;
  ctx.fillText("转化说明", rect.x + pad, rect.y + pad + 174);
  ctx.fillStyle = "rgba(255,247,228,0.84)";
  ctx.font = `680 ${Math.min(16, rect.w * 0.05)}px ${SANS}`;
  drawWrappedText(ctx, "系统只保留当前压力、转化步骤与资产预备，不再展示旧入口信息。", rect.x + pad, rect.y + pad + 200, rect.w - pad * 2, Math.min(27, rect.w * 0.08));

  ctx.fillStyle = "rgba(232,200,138,0.82)";
  ctx.font = `700 ${Math.min(15, rect.w * 0.046)}px ${SANS}`;
  ctx.fillText("压力 / 转化 / 资产", rect.x + pad, rect.y + rect.h - 118);

  ctx.fillStyle = "rgba(255,247,228,0.58)";
  ctx.font = `600 ${Math.min(11, rect.w * 0.034)}px ${SANS}`;
  ctx.fillText("下一步｜进入当前压力", rect.x + pad, rect.y + rect.h - 78);

  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(232,200,138,0.52)";
  ctx.font = `650 ${Math.min(11, rect.w * 0.034)}px ${MONO}`;
  ctx.fillText("PRESSURE -> TRANSFORMATION -> ASSET", rect.x + rect.w / 2, rect.y + rect.h - 34);
}

export function drawEntryCardRenderer({
  ctx,
  snapshot,
  width,
  height,
  alpha = 1,
  side = "front",
  flipProgress = 1,
}: EntryCardRendererOptions) {
  const cx = width / 2;
  const cy = height * 0.47;
  const rect = getEntryCardRendererRect(width, height);
  const flipScale = Math.max(0.06, Math.abs(Math.cos(Math.min(1, Math.max(0, flipProgress)) * Math.PI)));

  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.fillStyle = "rgba(3,4,8,0.94)";
  ctx.fillRect(0, 0, width, height);

  const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 130);
  core.addColorStop(0, "rgba(255,247,228,0.16)");
  core.addColorStop(0.42, "rgba(232,200,138,0.08)");
  core.addColorStop(1, "rgba(232,200,138,0)");
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(cx, cy, 130, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.translate(rect.x + rect.w / 2, rect.y + rect.h / 2);
  ctx.scale(flipScale, 1);
  ctx.translate(-(rect.x + rect.w / 2), -(rect.y + rect.h / 2));
  if (side === "back") drawBack(ctx, snapshot, rect);
  else drawFront(ctx, snapshot, rect);
  ctx.restore();

  ctx.restore();
}
