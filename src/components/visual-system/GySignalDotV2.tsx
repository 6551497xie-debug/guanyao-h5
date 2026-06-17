/*
 * GySignalDotV2 —— 信号点组件壳（R8-VISUAL-SYSTEM-TOKENS-P1）
 *
 * 职责：渲染线端冷蓝滑块、刻度档位点、极光爆点等"点"状视觉单元。
 *       强调"圆点不是按钮"——点的含义由上层决定，本壳只渲染形态与高亮态。
 * 红线：不承载点击业务跳转；不读业务数据；不写状态；不触发真实事件。
 * 数据：不读取任何业务数据。
 * 事件：不触发旧 DOM / 旧事件；仅可选 onVisualPulseEnd 纯视觉脉冲结束回调。
 */
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

export type GySignalDotV2Variant = "slider" | "tick" | "burst";
export type GySignalDotV2Tone = "base" | "active" | "break";

export type GySignalDotV2Props = {
  variant?: GySignalDotV2Variant;
  tone?: GySignalDotV2Tone;
  active?: boolean;
  /** 点直径，默认取 token --gy-dot-size。 */
  size?: number;
  glow?: boolean;
  onVisualPulseEnd?: () => void;
  className?: string;
  style?: CSSProperties;
};

const toneColor: Record<GySignalDotV2Tone, string> = {
  base: "var(--gy-line-base, rgba(228,231,234,0.58))",
  active: "var(--gy-active, #00b8d4)",
  break: "var(--gy-break, #c7a96b)",
};

export function GySignalDotV2({
  variant = "slider",
  tone = "active",
  active = false,
  size,
  glow,
  onVisualPulseEnd,
  className = "",
  style,
}: GySignalDotV2Props) {
  const color = toneColor[tone];
  const showGlow = glow ?? active;
  const wasActiveRef = useRef(active);

  useEffect(() => {
    if (wasActiveRef.current === active) {
      return;
    }
    wasActiveRef.current = active;
    if (!active) {
      return;
    }
    const timer = window.setTimeout(() => onVisualPulseEnd?.(), 220);
    return () => window.clearTimeout(timer);
  }, [active, onVisualPulseEnd]);

  const diameter = size ?? (variant === "burst" ? 12 : 8);
  const isSlider = variant === "slider";
  const isBurst = variant === "burst";

  return (
    <span
      className={`gy-signal-dot-v2 is-${variant}${active ? " is-active" : ""}${className ? ` ${className}` : ""}`}
      aria-hidden="true"
      data-variant={variant}
      style={{
        display: "inline-block",
        width: diameter,
        height: diameter,
        background: color,
        borderRadius: isBurst ? "50%" : 999,
        transform: isSlider ? `rotate(45deg) scale(${active ? 1.18 : 1})` : `scale(${active ? 1.25 : 1})`,
        boxShadow: showGlow
          ? tone === "break"
            ? "var(--gy-dot-glow-break, 0 0 22px rgba(199,169,107,0.5))"
            : "var(--gy-dot-glow, 0 0 16px rgba(0,184,212,0.46))"
          : "none",
        opacity: active ? 1 : 0.72,
        transition: "transform 170ms var(--gy-ease-damp, ease), box-shadow 170ms ease, opacity 170ms ease",
        ...style,
      }}
    />
  );
}
