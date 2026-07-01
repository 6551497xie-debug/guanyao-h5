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
const SERIF = "Songti SC, SimSun, serif";

const CARD_COPY: Record<string, { title: string; structure: string; summary: string; tags: string }> = {
  "乾": { title: "《创世者》", structure: "垂直上升结构", summary: "天行刚健，自强不息。主动开创，统御全局。", tags: "刚健 · 开创 · 统御" },
  "坤": { title: "《承载者》", structure: "水平承托结构", summary: "地势柔顺，厚德载物。包容承托，滋养万物。", tags: "柔顺 · 包容 · 承载" },
  "震": { title: "《行动者》", structure: "斜向冲击结构", summary: "雷震百里，万物始生。破局而出，主动冲击。", tags: "奋动 · 破局 · 冲击" },
  "巽": { title: "《渗透者》", structure: "曲线渗透结构", summary: "风无孔不入，渗透万物。顺势变通，润物无声。", tags: "渗透 · 变通 · 入微" },
  "坎": { title: "《深潜者》", structure: "纵深下探结构", summary: "水行险陷，深不可测。处险不惊，隐伏流动。", tags: "险陷 · 深沉 · 流动" },
  "离": { title: "《照见者》", structure: "中心辐射结构", summary: "火附丽光明，温暖万物。向外发散，明亮照人。", tags: "明亮 · 附着 · 扩散" },
  "艮": { title: "《守望者》", structure: "横向阻断结构", summary: "山为稳固之基，知止而定。守其边界，不动如山。", tags: "稳固 · 止息 · 边界" },
  "兑": { title: "《连接者》", structure: "水平流动结构", summary: "泽水汇聚，滋养喜悦。交流开放，和悦待人。", tags: "喜悦 · 交流 · 开放" },
  CACHE_PENDING: { title: "《母码待定》", structure: "收束结构待显影", summary: "坐标锁定后，你的母码会在这里安静显形。", tags: "静候 · 显影 · 归位" },
};

const TRIGRAM_LINES: Record<string, [boolean, boolean, boolean]> = {
  "乾": [true, true, true],
  "兑": [false, true, true],
  "离": [true, false, true],
  "震": [false, false, true],
  "巽": [true, true, false],
  "坎": [false, true, false],
  "艮": [true, false, false],
  "坤": [false, false, false],
  CACHE_PENDING: [true, false, true],
};

export type MotherCardSide = "front" | "back";

export type MotherCardRendererOptions = {
  ctx: CanvasRenderingContext2D;
  snapshot: MotherCardReadonlySnapshot;
  width: number;
  height: number;
  alpha?: number;
  side?: MotherCardSide;
  flipProgress?: number;
};

export function getMotherCardRendererRect(width: number, height: number) {
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

function normalizeTrigram(trigram: string) {
  const key = trigram?.trim()?.[0] ?? "CACHE_PENDING";
  return key in CARD_COPY ? key : "CACHE_PENDING";
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

function drawTrigram(ctx: CanvasRenderingContext2D, trigram: string, cx: number, cy: number, w: number, color: string) {
  const lines = TRIGRAM_LINES[normalizeTrigram(trigram)] ?? TRIGRAM_LINES.CACHE_PENDING;
  const gap = w * 0.14;
  const half = w / 2;
  const rowGap = w * 0.18;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.2;
  ctx.lineCap = "round";
  ctx.beginPath();
  lines.forEach((solid, i) => {
    const y = cy + (i - 1) * rowGap;
    if (solid) {
      ctx.moveTo(cx - half, y);
      ctx.lineTo(cx + half, y);
    } else {
      ctx.moveTo(cx - half, y);
      ctx.lineTo(cx - gap, y);
      ctx.moveTo(cx + gap, y);
      ctx.lineTo(cx + half, y);
    }
  });
  ctx.stroke();
}

function drawFront(ctx: CanvasRenderingContext2D, snapshot: MotherCardReadonlySnapshot, rect: { x: number; y: number; w: number; h: number }) {
  const trigram = normalizeTrigram(snapshot.trigram);
  const copy = CARD_COPY[trigram] ?? CARD_COPY.CACHE_PENDING;
  const pad = Math.max(22, rect.w * 0.08);
  drawFrame(ctx, rect);

  ctx.textBaseline = "top";
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(232,200,138,0.64)";
  ctx.font = `650 ${Math.min(10, rect.w * 0.032)}px ${MONO}`;
  ctx.fillText("观爻母码", rect.x + pad, rect.y + pad);

  ctx.fillStyle = "rgba(255,247,228,0.96)";
  ctx.font = `820 ${Math.min(32, rect.w * 0.098)}px ${SANS}`;
  ctx.fillText(`${snapshot.motherCode}`, rect.x + pad, rect.y + pad + 50);

  ctx.fillStyle = "rgba(232,200,138,0.86)";
  ctx.font = `700 ${Math.min(18, rect.w * 0.056)}px ${SERIF}`;
  ctx.fillText(copy.title, rect.x + pad, rect.y + pad + 92);

  const glyphY = rect.y + rect.h * 0.46;
  const aura = ctx.createRadialGradient(rect.x + rect.w / 2, glyphY, 0, rect.x + rect.w / 2, glyphY, rect.w * 0.26);
  aura.addColorStop(0, "rgba(232,200,138,0.16)");
  aura.addColorStop(0.55, "rgba(232,200,138,0.06)");
  aura.addColorStop(1, "rgba(232,200,138,0)");
  ctx.fillStyle = aura;
  ctx.beginPath();
  ctx.arc(rect.x + rect.w / 2, glyphY, rect.w * 0.26, 0, Math.PI * 2);
  ctx.fill();
  drawTrigram(ctx, trigram, rect.x + rect.w / 2, glyphY, rect.w * 0.27, "rgba(232,200,138,0.92)");

  ctx.fillStyle = "rgba(232,200,138,0.64)";
  ctx.font = `650 ${Math.min(10, rect.w * 0.032)}px ${MONO}`;
  ctx.fillText("时间铭刻", rect.x + pad, rect.y + rect.h - 142);
  ctx.fillStyle = "rgba(255,247,228,0.78)";
  ctx.font = `650 ${Math.min(12, rect.w * 0.038)}px ${SANS}`;
  ctx.fillText(snapshot.chrono, rect.x + pad, rect.y + rect.h - 122);

  ctx.fillStyle = "rgba(232,200,138,0.64)";
  ctx.font = `650 ${Math.min(10, rect.w * 0.032)}px ${MONO}`;
  ctx.fillText("人格象位", rect.x + pad, rect.y + rect.h - 92);
  ctx.fillStyle = "rgba(255,247,228,0.78)";
  ctx.font = `650 ${Math.min(12, rect.w * 0.038)}px ${SANS}`;
  ctx.fillText(snapshot.direction, rect.x + pad, rect.y + rect.h - 72);

  ctx.fillStyle = "rgba(232,200,138,0.64)";
  ctx.font = `650 ${Math.min(10, rect.w * 0.032)}px ${MONO}`;
  ctx.fillText("星源印记", rect.x + rect.w * 0.52, rect.y + rect.h - 92);
  ctx.fillStyle = "rgba(255,247,228,0.66)";
  ctx.font = `600 ${Math.min(10.5, rect.w * 0.032)}px ${SANS}`;
  drawWrappedText(ctx, snapshot.starOrigin, rect.x + rect.w * 0.52, rect.y + rect.h - 72, rect.w * 0.38, Math.min(15, rect.w * 0.046));

  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(232,200,138,0.46)";
  ctx.font = `650 ${Math.min(11, rect.w * 0.034)}px ${MONO}`;
  ctx.fillText("轻触翻面", rect.x + rect.w / 2, rect.y + rect.h - 34);
}

function drawBack(ctx: CanvasRenderingContext2D, snapshot: MotherCardReadonlySnapshot, rect: { x: number; y: number; w: number; h: number }) {
  const trigram = normalizeTrigram(snapshot.trigram);
  const copy = CARD_COPY[trigram] ?? CARD_COPY.CACHE_PENDING;
  const pad = Math.max(22, rect.w * 0.08);
  drawFrame(ctx, rect);

  ctx.textBaseline = "top";
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(232,200,138,0.64)";
  ctx.font = `650 ${Math.min(10, rect.w * 0.032)}px ${MONO}`;
  ctx.fillText("结构符纹", rect.x + pad, rect.y + pad);

  ctx.fillStyle = "rgba(255,247,228,0.96)";
  ctx.font = `800 ${Math.min(24, rect.w * 0.074)}px ${SANS}`;
  ctx.fillText(`${trigram}｜${snapshot.motherCode}`, rect.x + pad, rect.y + pad + 48);

  ctx.fillStyle = "rgba(232,200,138,0.86)";
  ctx.font = `700 ${Math.min(15, rect.w * 0.048)}px ${SANS}`;
  ctx.fillText(`人格骨相｜${copy.structure}`, rect.x + pad, rect.y + pad + 92);

  ctx.strokeStyle = "rgba(232,200,138,0.32)";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(rect.x + pad, rect.y + pad + 130);
  ctx.lineTo(rect.x + rect.w - pad, rect.y + pad + 130);
  ctx.stroke();

  ctx.fillStyle = "rgba(232,200,138,0.64)";
  ctx.font = `650 ${Math.min(10, rect.w * 0.032)}px ${MONO}`;
  ctx.fillText("人格回声", rect.x + pad, rect.y + pad + 154);
  ctx.fillStyle = "rgba(255,247,228,0.84)";
  ctx.font = `650 ${Math.min(15, rect.w * 0.046)}px ${SERIF}`;
  drawWrappedText(ctx, copy.summary, rect.x + pad, rect.y + pad + 178, rect.w - pad * 2, Math.min(25, rect.w * 0.074));

  ctx.fillStyle = "rgba(232,200,138,0.82)";
  ctx.font = `700 ${Math.min(15, rect.w * 0.046)}px ${SERIF}`;
  ctx.fillText(copy.tags, rect.x + pad, rect.y + rect.h - 126);

  ctx.fillStyle = "rgba(255,247,228,0.58)";
  ctx.font = `600 ${Math.min(11, rect.w * 0.034)}px ${SANS}`;
  ctx.fillText(`出生坐标｜${snapshot.chrono}`, rect.x + pad, rect.y + rect.h - 88);

  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(232,200,138,0.52)";
  ctx.font = `650 ${Math.min(11, rect.w * 0.034)}px ${MONO}`;
  ctx.fillText("观爻 · GUANYAO", rect.x + rect.w / 2, rect.y + rect.h - 34);
}

export function drawMotherCardRenderer({
  ctx,
  snapshot,
  width,
  height,
  alpha = 1,
  side = "front",
  flipProgress = 1,
}: MotherCardRendererOptions) {
  const cx = width / 2;
  const cy = height * 0.47;
  const rect = getMotherCardRendererRect(width, height);
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
