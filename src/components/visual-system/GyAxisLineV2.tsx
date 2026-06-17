/*
 * GyAxisLineV2 —— 1px 一字线组件壳（R8-VISUAL-SYSTEM-TOKENS-P1）
 *
 * 职责：渲染横贯约 84% 宽、厚 1px 的生命线，按 props 展示物理状态
 *       （静止/拉伸/紧绷/崩断/回弹）与着色（基础/激活/破局）。
 * 红线：不判断何时该激活/崩断（那是业务）；不读压力/卦码；不写状态机。
 * 数据：不读取任何业务数据。
 * 事件：不触发旧 DOM / 旧事件；仅可选 onStateVisualEnd 纯视觉动画结束回调。
 */
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

export type GyAxisLineV2State = "idle" | "active" | "tense" | "break" | "rebound";
export type GyAxisLineV2Tone = "base" | "active" | "break";

export type GyAxisLineV2Props = {
  state?: GyAxisLineV2State;
  /** 拉伸 / 蓄能进度，0–1。 */
  progress?: number;
  tone?: GyAxisLineV2Tone;
  /** 线宽占比，默认 84。 */
  widthPct?: number;
  /** 纯视觉态切换动画结束回调。 */
  onStateVisualEnd?: (state: GyAxisLineV2State) => void;
  className?: string;
  style?: CSSProperties;
};

const toneColor: Record<GyAxisLineV2Tone, string> = {
  base: "var(--gy-line-base, rgba(228,231,234,0.58))",
  active: "var(--gy-active, #00b8d4)",
  break: "var(--gy-break, #c7a96b)",
};

function resolveTone(state: GyAxisLineV2State, tone?: GyAxisLineV2Tone): GyAxisLineV2Tone {
  if (tone) {
    return tone;
  }
  if (state === "break") {
    return "break";
  }
  if (state === "active" || state === "tense") {
    return "active";
  }
  return "base";
}

export function GyAxisLineV2({
  state = "idle",
  progress = 0,
  tone,
  widthPct = 84,
  onStateVisualEnd,
  className = "",
  style,
}: GyAxisLineV2Props) {
  const clamped = Math.min(1, Math.max(0, progress));
  const resolvedTone = resolveTone(state, tone);
  const color = toneColor[resolvedTone];
  const isBroken = state === "break";
  const fillEndRef = useRef<GyAxisLineV2State>(state);

  useEffect(() => {
    if (fillEndRef.current === state) {
      return;
    }
    fillEndRef.current = state;
    const timer = window.setTimeout(() => {
      onStateVisualEnd?.(state);
    }, 360);
    return () => window.clearTimeout(timer);
  }, [state, onStateVisualEnd]);

  return (
    <div
      className={`gy-axis-line-v2 is-${state}${className ? ` ${className}` : ""}`}
      aria-hidden="true"
      data-state={state}
      style={{
        position: "relative",
        width: `${widthPct}%`,
        height: "var(--gy-axis-track-min, 46px)",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        ...style,
      }}
    >
      {/* 底线 */}
      <span
        style={{
          position: "absolute",
          left: 0,
          right: isBroken ? "52%" : 0,
          top: "50%",
          height: "var(--gy-hairline, 1px)",
          background: color,
          opacity: state === "idle" ? 0.7 : 1,
          transform: state === "tense" ? "translateY(-0.5px)" : "none",
          transition: "right var(--gy-dur-break, 520ms) var(--gy-ease-damp, ease), background 240ms ease, opacity 240ms ease",
        }}
      />
      {isBroken ? (
        <span
          style={{
            position: "absolute",
            left: "52%",
            right: 0,
            top: "50%",
            height: "var(--gy-hairline, 1px)",
            background: color,
            transition: "left var(--gy-dur-break, 520ms) var(--gy-ease-damp, ease)",
          }}
        />
      ) : (
        /* 进度填充 */
        <span
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            width: `${clamped * 100}%`,
            height: "var(--gy-hairline, 1px)",
            background: color,
            boxShadow: clamped > 0 ? "0 0 14px rgba(0,184,212,0.32)" : "none",
            transition: "width 170ms ease",
          }}
        />
      )}
    </div>
  );
}
