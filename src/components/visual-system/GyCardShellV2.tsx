/*
 * GyCardShellV2 —— 卡片壳组件（R8-VISUAL-SYSTEM-TOKENS-P1）
 *
 * 职责：提供单卡双面（A/B 翻面）视觉容器与翻面动效骨架，供母码卡与卦码卡
 *       复用结构。不内置任一类卡的具体内容/数据/卦符规则。
 * 红线：不读卦码卡正式数据；不读母码资产数据；不改既有 hexagram-card/*。
 *       A 面禁卦符、B 面固定六爻卦形等约束由传入的 front/back 节点遵守，
 *       本壳不替内容渲染卦符。
 * 数据：不读取任何业务数据。
 * 事件：不触发旧 DOM / 旧事件；仅可选 onFlip 视觉翻面回调。
 */
import type { CSSProperties, ReactNode } from "react";

export type GyCardShellV2Face = "A" | "B";
export type GyCardShellV2Tone = "void" | "gold";

export type GyCardShellV2Props = {
  face?: GyCardShellV2Face;
  /** A 面内容节点（由内容方保证不含卦符）。 */
  front: ReactNode;
  /** B 面内容节点（由内容方放置固定六爻卦形）。 */
  back: ReactNode;
  /** 纯视觉翻面回调，不接业务。 */
  onFlip?: (nextFace: GyCardShellV2Face) => void;
  aspect?: string;
  tone?: GyCardShellV2Tone;
  /** 边缘 1px 微线（非表格）。 */
  edgeHairline?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function GyCardShellV2({
  face = "A",
  front,
  back,
  onFlip,
  aspect = "3 / 4",
  tone = "void",
  edgeHairline = false,
  className = "",
  style,
}: GyCardShellV2Props) {
  const isBack = face === "B";

  const faceBaseStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    overflow: "hidden",
    border: edgeHairline ? "var(--gy-hairline, 1px) solid var(--gy-card-edge, rgba(199,169,107,0.32))" : "none",
    background: tone === "gold" ? "var(--gy-field-soft, #0b0b0c)" : "var(--gy-void, #000000)",
  };

  return (
    <div
      className={`gy-card-shell-v2 is-face-${face}${className ? ` ${className}` : ""}`}
      data-face={face}
      style={{
        width: "min(100%, 390px)",
        aspectRatio: aspect,
        perspective: 1400,
        ...style,
      }}
    >
      <button
        type="button"
        onClick={() => onFlip?.(isBack ? "A" : "B")}
        aria-label={isBack ? "翻到 A 面" : "翻到 B 面"}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          padding: 0,
          border: "none",
          background: "transparent",
          cursor: onFlip ? "pointer" : "default",
          transformStyle: "preserve-3d",
          transform: isBack ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform var(--gy-dur-break, 520ms) var(--gy-ease-damp, ease)",
        }}
      >
        <div style={{ ...faceBaseStyle, transform: "rotateY(0deg)" }}>{front}</div>
        <div style={{ ...faceBaseStyle, transform: "rotateY(180deg)" }}>{back}</div>
      </button>
    </div>
  );
}
