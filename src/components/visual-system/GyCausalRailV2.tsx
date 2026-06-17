/*
 * GyCausalRailV2 —— 视觉轨道组件壳（R8-VISUAL-SYSTEM-TOKENS-P1）
 *
 * 职责：表现"右滑推进 / 左滑崩断"的物理轨道外观与手势进度反馈。
 *       是方向总纲右滑点火、左滑崩断状态机的视觉外壳。
 * 红线：不直接 navigate；不写 LocalStorage；不读业务真值；不复制交互真值。
 *       真正的推进/破局仍由旧事件链负责。
 * 数据：不读取任何业务数据。
 * 事件：仅暴露 onProgress / onTrigger 视觉回调。本壳自身不调用旧 DOM / 旧事件；
 *       由上层把 onTrigger 桥接到既有 CausalRail.onLeft/onRight 或
 *       GyVisualChain 的 GyCausalRail.onComplete。
 *
 * 命名：本组件采用 V2 后缀，与受保护文件 src/components/visual/GyVisualChain.tsx
 *       已导出的 GyCausalRail 显式区分，互不替代。
 */
import { useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";

export type GyCausalRailV2Mode = "advance" | "break";

export type GyCausalRailV2Props = {
  /** advance=右滑推进（冷蓝）；break=左滑崩断（冷金）。 */
  mode?: GyCausalRailV2Mode;
  disabled?: boolean;
  /** 手势进度回调，0–1（纯视觉）。 */
  onProgress?: (progress: number) => void;
  /** 达到阈值后回调；由调用方桥接到旧事件。本壳不直接触发任何真实事件。 */
  onTrigger?: () => void;
  statusLabel?: string;
  hint?: string;
  className?: string;
  style?: CSSProperties;
};

const COMPLETE_THRESHOLD = 0.72;

export function GyCausalRailV2({
  mode = "advance",
  disabled = false,
  onProgress,
  onTrigger,
  statusLabel,
  hint,
  className = "",
  style,
}: GyCausalRailV2Props) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const [progress, setProgress] = useState(0);

  const isBreak = mode === "break";
  const color = isBreak ? "var(--gy-break, #c7a96b)" : "var(--gy-active, #00b8d4)";

  function readProgress(event: ReactPointerEvent<HTMLDivElement>): number {
    const bounds = railRef.current?.getBoundingClientRect();
    if (!bounds || bounds.width <= 0) {
      return 0;
    }
    const ratio = (event.clientX - bounds.left) / bounds.width;
    // break 模式：从右端向左拖拽，进度随左移增大。
    const raw = isBreak ? 1 - ratio : ratio;
    return Math.min(1, Math.max(0, raw));
  }

  function update(next: number) {
    setProgress(next);
    onProgress?.(next);
  }

  function handleDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (disabled) {
      return;
    }
    draggingRef.current = true;
    railRef.current?.setPointerCapture(event.pointerId);
    update(readProgress(event));
  }

  function handleMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!draggingRef.current || disabled) {
      return;
    }
    update(readProgress(event));
  }

  function handleUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (disabled) {
      return;
    }
    draggingRef.current = false;
    railRef.current?.releasePointerCapture(event.pointerId);
    const next = readProgress(event);
    if (next >= COMPLETE_THRESHOLD) {
      update(1);
      onTrigger?.();
    } else {
      update(0);
    }
  }

  const fillStyle: CSSProperties = isBreak
    ? { right: 0, width: `${progress * 100}%` }
    : { left: 0, width: `${progress * 100}%` };

  return (
    <section
      aria-label={statusLabel ?? hint ?? (isBreak ? "左滑崩断轨道" : "右滑推进轨道")}
      className={`gy-causal-rail-v2 is-${mode}${disabled ? " is-disabled" : ""}${className ? ` ${className}` : ""}`}
      style={{ display: "grid", gap: "var(--gy-gap-sm, 10px)", opacity: disabled ? 0.46 : 1, ...style }}
    >
      {statusLabel ? (
        <p
          style={{
            margin: 0,
            color: "var(--gy-text-dim, rgba(246,243,236,0.46))",
            fontSize: "var(--gy-size-label, 11px)",
            letterSpacing: "var(--gy-tracking, 0.08em)",
            textAlign: "center",
          }}
        >
          {statusLabel}
        </p>
      ) : null}
      <div
        ref={railRef}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onPointerDown={handleDown}
        onPointerMove={handleMove}
        onPointerUp={handleUp}
        onPointerCancel={() => {
          draggingRef.current = false;
          update(0);
        }}
        style={{
          position: "relative",
          minHeight: "var(--gy-axis-track-min, 46px)",
          cursor: disabled ? "default" : "pointer",
          outline: 0,
          userSelect: "none",
          touchAction: "pan-y",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            height: "var(--gy-hairline, 1px)",
            background: "var(--gy-line-base, rgba(228,231,234,0.58))",
          }}
        />
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            height: "var(--gy-hairline, 1px)",
            background: color,
            boxShadow: progress > 0 ? "0 0 14px rgba(0,184,212,0.3)" : "none",
            transition: draggingRef.current ? "none" : "width 170ms var(--gy-ease-damp, ease)",
            ...fillStyle,
          }}
        />
      </div>
      {hint ? (
        <div
          aria-hidden="true"
          style={{
            display: "flex",
            justifyContent: isBreak ? "flex-start" : "flex-end",
            color: "var(--gy-text-dim, rgba(246,243,236,0.46))",
            fontSize: "var(--gy-size-label, 11px)",
            letterSpacing: "var(--gy-tracking, 0.08em)",
          }}
        >
          <span>{hint}</span>
        </div>
      ) : null}
    </section>
  );
}
