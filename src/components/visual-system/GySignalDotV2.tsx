/*
 * GySignalDotV2 —— 信号点组件壳（R8-VISUAL-SYSTEM-TOKENS-P1）
 * 红线：不承载点击业务跳转；不读业务数据；不写状态；不触发真实事件。
 */
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

export type GySignalDotV2Variant = "slider" | "tick" | "burst";
export type GySignalDotV2Tone = "base" | "active" | "break";

export type GySignalDotV2Props = {
  variant?: GySignalDotV2Variant;
  tone?: GySignalDotV2Tone;
  active?: boolean;
  /** locked=锁止态（tick + break tone，不发光，方形锁住感）。 */
  locked?: boolean;
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
  locked = false,
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
    if (wasActiveRef.current === active) return;
    wasActiveRef.current = active;
    if (!active) return;
    const timer = window.setTimeout(() => onVisualPulseEnd?.(), 220);
    return () => window.clearTimeout(timer);
  }, [active, onVisualPulseEnd]);

  const diameter = size ?? (variant === "burst" ? 12 : 8);
  const isSlider = variant === "slider";
  const isBurst = variant === "burst";

  // locked 态：方形锁止，不旋转，不发光，冷金边框
  if (locked) {
    return (
      <span
        className={`gy-signal-dot-v2 is-locked${className ? ` ${className}` : ""}`}
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: diameter,
          height: diameter,
          background: "transparent",
          border: `1px solid ${color}`,
          borderRadius: 0,
          opacity: 0.86,
          flexShrink: 0,
          ...style,
        }}
      />
    );
  }

  // burst 破裂态：空心环 + 外层散射光晕
  if (isBurst && active) {
    return (
      <span
        className={`gy-signal-dot-v2 is-burst is-active${className ? ` ${className}` : ""}`}
        aria-hidden="true"
        style={{
          display: "inline-block",
          position: "relative",
          width: diameter + 6,
          height: diameter + 6,
          flexShrink: 0,
          ...style,
        }}
      >
        {/* 外层散射环 */}
        <span style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: `1px solid ${color}`,
          opacity: 0.4,
          boxShadow: "0 0 12px rgba(199,169,107,0.5)",
        }} />
        {/* 内核残留点 */}
        <span style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 3,
          height: 3,
          marginTop: -1.5,
          marginLeft: -1.5,
          background: color,
          borderRadius: "50%",
          boxShadow: "0 0 6px rgba(199,169,107,0.8)",
        }} />
      </span>
    );
  }

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
        flexShrink: 0,
        transform: isSlider
          ? `rotate(45deg) scale(${active ? 1.22 : 1})`
          : `scale(${active ? 1.18 : 1})`,
        boxShadow: showGlow
          ? tone === "break"
            ? "0 0 18px rgba(199,169,107,0.55)"
            : "0 0 14px rgba(0,184,212,0.5)"
          : "none",
        opacity: active ? 1 : 0.62,
        transition: "transform 170ms var(--gy-ease-damp, ease), box-shadow 200ms ease, opacity 200ms ease",
        ...style,
      }}
    />
  );
}
