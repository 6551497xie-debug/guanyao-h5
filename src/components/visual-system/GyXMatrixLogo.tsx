/*
 * GyXMatrixLogo —— 观爻 LOGO 的 SVG 投影（R8）
 *
 * 唯一几何来源：xMatrixModel.getXMatrixSegments。
 * 本组件不写任何手工坐标 / path，只把模型线段投影成 <line>。
 * 与 LaunchPage 的 Canvas 投影共用同一模型——两端输出必须一致。
 */
import type { CSSProperties } from "react";
import { getXMatrixSegments, X_MATRIX_STROKE_WIDTH } from "./xMatrixModel";

export type GyXMatrixLogoProps = {
  /** 视口边长（正方形）。 */
  size?: number;
  /** 臂半长 a 占半边长比例（0–1）；radius = ratio · size/2。 */
  radiusRatio?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
};

export function GyXMatrixLogo({
  size = 120,
  radiusRatio = 0.9,
  color = "#FFEEF7",
  strokeWidth = X_MATRIX_STROKE_WIDTH,
  className = "",
  style,
}: GyXMatrixLogoProps) {
  const center = { x: size / 2, y: size / 2 };
  const radius = (size / 2) * radiusRatio;
  const segments = getXMatrixSegments(center, radius);

  return (
    <svg
      className={`gy-x-matrix-logo${className ? ` ${className}` : ""}`}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      style={style}
    >
      {segments.map((seg, i) => (
        <line
          key={i}
          x1={seg.x1}
          y1={seg.y1}
          x2={seg.x2}
          y2={seg.y2}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
        />
      ))}
    </svg>
  );
}
