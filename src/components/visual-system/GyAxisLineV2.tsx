/*
 * GyAxisLineV2 —— 1px 一字线组件壳（R8-VISUAL-SYSTEM-TOKENS-P1）
 * 红线：不判断何时该激活/崩断（那是业务）；不读压力/卦码；不写状态机。
 */
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

export type GyAxisLineV2State = "idle" | "active" | "tense" | "break" | "rebound";
export type GyAxisLineV2Tone = "base" | "active" | "break";

export type GyAxisLineV2Props = {
  state?: GyAxisLineV2State;
  progress?: number;
  tone?: GyAxisLineV2Tone;
  widthPct?: number;
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
  if (tone) return tone;
  if (state === "break") return "break";
  if (state === "active" || state === "tense") return "active";
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
  const isTense = state === "tense";
  const isRebound = state === "rebound";
  const fillEndRef = useRef<GyAxisLineV2State>(state);

  useEffect(() => {
    if (fillEndRef.current === state) return;
    fillEndRef.current = state;
    const timer = window.setTimeout(() => onStateVisualEnd?.(state), 560);
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
      {isBroken ? (
        <>
          {/* 崩断：左段收缩至 40%，右段推开至 60%，中间留 20% 死亡间隙 */}
          <span style={{
            position: "absolute",
            left: 0,
            width: "40%",
            top: "50%",
            height: "var(--gy-hairline, 1px)",
            background: color,
            opacity: 0.82,
            transform: "translateY(-1px)",
            transition: "width var(--gy-dur-break, 520ms) var(--gy-ease-damp, ease)",
          }} />
          {/* 崩断中心：残留的冷金爆点 */}
          <span style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 3,
            height: 3,
            marginLeft: -1.5,
            marginTop: -1.5,
            background: color,
            borderRadius: "50%",
            boxShadow: "0 0 8px rgba(199,169,107,0.7), 0 0 20px rgba(199,169,107,0.28)",
            opacity: 0.9,
          }} />
          <span style={{
            position: "absolute",
            right: 0,
            width: "40%",
            top: "50%",
            height: "var(--gy-hairline, 1px)",
            background: color,
            opacity: 0.82,
            transform: "translateY(1px)",
            transition: "width var(--gy-dur-break, 520ms) var(--gy-ease-damp, ease)",
          }} />
        </>
      ) : (
        <>
          {/* 底线 */}
          <span style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            height: "var(--gy-hairline, 1px)",
            background: color,
            opacity: state === "idle" ? 0.52 : isRebound ? 0.9 : 1,
            // tense 态：轻微向上偏移，制造张力感
            transform: isTense ? "scaleY(1) translateY(-0.5px)" : "none",
            boxShadow: isTense ? "0 0 6px rgba(0,184,212,0.22)" : "none",
            transition: "opacity 240ms ease, transform 240ms ease, box-shadow 240ms ease, background 240ms ease",
          }} />
          {/* 进度填充（active / tense / rebound 态） */}
          {(state === "active" || isTense || isRebound) && (
            <span style={{
              position: "absolute",
              left: 0,
              top: "50%",
              width: `${clamped * 100}%`,
              height: "var(--gy-hairline, 1px)",
              background: color,
              boxShadow: isTense
                ? "0 0 12px rgba(0,184,212,0.5), 0 0 28px rgba(0,184,212,0.18)"
                : "0 0 10px rgba(0,184,212,0.3)",
              transition: "width 200ms ease, box-shadow 240ms ease",
            }} />
          )}
          {/* tense 态：在进度前端渲染一个微小张力钩 */}
          {isTense && clamped > 0 && (
            <span style={{
              position: "absolute",
              left: `${clamped * 100}%`,
              top: "50%",
              width: 2,
              height: 5,
              marginTop: -2.5,
              marginLeft: -1,
              background: "var(--gy-active, #00b8d4)",
              opacity: 0.7,
            }} />
          )}
        </>
      )}
    </div>
  );
}
