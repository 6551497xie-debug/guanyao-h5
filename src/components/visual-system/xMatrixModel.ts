/*
 * X_MATRIX_MODEL —— 观爻 LOGO 唯一几何真源（R8）
 *
 * 结构（非对称，紧凑）：
 *   上部 = X：长上臂自顶点 (0, TOP_VERTEX_Y) 张到顶部两角；
 *             短下臂自同一顶点向下张开（X 的下半截变短，与顶点相连）。
 *   下部 = ∧：长臂自顶点 (0, BOT_VERTEX_Y) 向下张到底部两角。
 *   顶部 X 与底部 ∧ 贴近，整体读成一个完整图形（中间留极小净空）。
 *
 * 约定：
 *   - center 为唯一基准点；模板坐标以 center 为原点、radius 为竖直半幅；
 *     最终坐标 = center + tmpl·radius（y 向下为正）。
 *   - 每条长臂 segmented（拆 3 段，段间微 gap）；短下臂各 1 段。
 *   - strokeWidth 固定 = 1。Canvas 与 SVG 必须调用本模型取段，两端不一致 → BUG。
 *   - 禁止任何手工坐标 / UI 视觉补偿 / 粒子偏移修正（坐标只存在于本模板）。
 */

export type XMatrixPoint = { x: number; y: number };
export type XMatrixSegment = { x1: number; y1: number; x2: number; y2: number };

export const X_MATRIX_STROKE_WIDTH = 1;

const X_MATRIX_SEG_GAP = 0.16; // 长臂段间微 gap，占单段槽位比例

// 关键 y 位置（归一化；center 原点，y 向下为正）—— 紧凑布局
const TOP_VERTEX_Y = -0.18; // 上 X 顶点（交叉点）
const BOT_VERTEX_Y = 0.12;  // 下 ∧ 顶点（与上 X 短臂端贴近）
const ARM_X = 0.7;          // 长臂水平到达（到角）
const ARM_Y = 0.95;         // 长臂竖直到达（到上/下两角）
const SHORT_DX = 0.17;      // 短下臂水平延伸
const SHORT_DY = 0.17;      // 短下臂竖直延伸（向下）

type TemplateBar = { x1: number; y1: number; x2: number; y2: number; dashes: number };

const X_MATRIX_TEMPLATE: ReadonlyArray<TemplateBar> = [
  // 上 X —— 长上臂（顶点 → 顶部两角）
  { x1: 0, y1: TOP_VERTEX_Y, x2: -ARM_X, y2: -ARM_Y, dashes: 3 },
  { x1: 0, y1: TOP_VERTEX_Y, x2: ARM_X, y2: -ARM_Y, dashes: 3 },
  // 上 X —— 短下臂（顶点 → 向下张开短端，X 的下半截变短）
  { x1: 0, y1: TOP_VERTEX_Y, x2: -SHORT_DX, y2: TOP_VERTEX_Y + SHORT_DY, dashes: 1 },
  { x1: 0, y1: TOP_VERTEX_Y, x2: SHORT_DX, y2: TOP_VERTEX_Y + SHORT_DY, dashes: 1 },
  // 下 ∧ —— 长臂（顶点 → 底部两角）
  { x1: 0, y1: BOT_VERTEX_Y, x2: -ARM_X, y2: ARM_Y, dashes: 3 },
  { x1: 0, y1: BOT_VERTEX_Y, x2: ARM_X, y2: ARM_Y, dashes: 3 },
];

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * 由 center + radius 投影出「上 X / 下 ∧」紧凑结构的线段集合。
 * 输出 = 4 长臂×3 段 + 2 短臂×1 段 = 14 段，顺序固定，Canvas / SVG 一致。
 * 第三参数保留以兼容旧签名，不参与几何。
 */
export function getXMatrixSegments(
  center: XMatrixPoint,
  radius: number,
  _legacy?: number,
): XMatrixSegment[] {
  void _legacy;
  const segments: XMatrixSegment[] = [];

  for (const bar of X_MATRIX_TEMPLATE) {
    const n = bar.dashes;
    const span = 1 / n;
    const gap = X_MATRIX_SEG_GAP * span;
    for (let k = 0; k < n; k++) {
      const t1 = k * span + gap / 2;
      const t2 = (k + 1) * span - gap / 2;
      segments.push({
        x1: center.x + lerp(bar.x1, bar.x2, t1) * radius,
        y1: center.y + lerp(bar.y1, bar.y2, t1) * radius,
        x2: center.x + lerp(bar.x1, bar.x2, t2) * radius,
        y2: center.y + lerp(bar.y1, bar.y2, t2) * radius,
      });
    }
  }

  return segments;
}
