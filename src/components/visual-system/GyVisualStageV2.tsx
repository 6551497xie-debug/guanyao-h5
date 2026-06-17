/*
 * GyVisualStageV2 —— Canvas 基础舞台壳（R8-VISUAL-SYSTEM-TOKENS-P1）
 *
 * 职责：提供一块可叠加在旧 DOM 之上的 <canvas> 容器，处理 DPR 缩放、resize、
 *       显隐降级与 pointer-events 穿透策略。仅作承载层。
 * 红线：不读卦码/母码/压力/沙漏/支付/六维空间；不写 LocalStorage；不调路由；
 *       不实现任何具体动画业务；不触发任何真实事件。纯视觉哑壳。
 * 数据：不读取任何业务数据。
 * 事件：仅暴露 onReady / onResize 视觉生命周期回调，不调用旧 DOM / 旧事件。
 */
import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

export type GyVisualStageV2Size = {
  width: number;
  height: number;
  dpr: number;
};

export type GyVisualStageV2Props = {
  /** 是否启用 canvas；false 时整层不渲染 canvas，露出下层 DOM。默认 false（对主链路零影响）。 */
  active?: boolean;
  /** canvas 2d 上下文就绪回调（纯视觉，不接业务）。 */
  onReady?: (ctx: CanvasRenderingContext2D, size: GyVisualStageV2Size) => void;
  /** 尺寸变化回调（已按 DPR 处理）。 */
  onResize?: (size: GyVisualStageV2Size) => void;
  /** 非交互区是否穿透到下层 DOM。默认 true。 */
  pointerThrough?: boolean;
  className?: string;
  style?: CSSProperties;
  /** 叠加在 canvas 之上的视觉层（仍是哑壳内容）。 */
  children?: ReactNode;
};

export function GyVisualStageV2({
  active = false,
  onReady,
  onResize,
  pointerThrough = true,
  className = "",
  style,
  children,
}: GyVisualStageV2Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) {
      return;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const applySize = (notifyReady: boolean) => {
      const rect = container.getBoundingClientRect();
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const size: GyVisualStageV2Size = { width, height, dpr };
      if (notifyReady) {
        onReady?.(ctx, size);
      }
      onResize?.(size);
    };

    applySize(true);

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => applySize(false));
      observer.observe(container);
    }

    return () => {
      observer?.disconnect();
    };
  }, [active, onReady, onResize]);

  return (
    <div
      ref={containerRef}
      className={`gy-visual-stage-v2${className ? ` ${className}` : ""}`}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: pointerThrough ? "none" : "auto",
        ...style,
      }}
    >
      {active ? (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, display: "block", pointerEvents: "none" }}
        />
      ) : null}
      {children}
    </div>
  );
}
