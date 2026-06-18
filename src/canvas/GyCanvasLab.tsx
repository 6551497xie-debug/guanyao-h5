// ═══════════════════════════════════════════════════════════════════
// 观爻 2.0 · GyCanvasLab
//
// 全链路：
//   手势 → GestureBridge → PhysicsInput
//   → PhysicsEngine → EngineSnapshot
//   → BehaviorInterpreter → semantic label
//   → GyCanvasCore (唯一渲染源)
//
// 不读写业务数据，不触发路由/事件，不写 LocalStorage。
// ═══════════════════════════════════════════════════════════════════

import { useCallback, useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { GyGestureBridge } from "./gyGestureBridge";
import { GyPhysicsEngine } from "./gyPhysicsEngine";
import { GyCanvasCore }    from "./GyCanvasCore";
import { getSemanticLabel } from "../semantic/behaviorInterpreter";
import type { MotherCodeKey } from "../semantic/motherCodeForceMap";
import type { GyRuntimeMonitor } from "../monitor/gyRuntimeMonitor";

const DOT_IDS    = ["see", "change", "pattern", "break"] as const;
const DOT_LABELS = ["见自己", "观变化", "循规律", "破心结"];

export interface GyCanvasLabProps {
  height?:       number | string;
  /** 母码 key（可选）：仅影响语义短语，不控制物理参数 */
  motherCode?:   MotherCodeKey;
  /** 卦码（可选）：叠加行为轨迹语义 */
  hexagramCode?: string;
  /** 运行监控器（可选）：纯观察，不参与任何运行路径 */
  monitor?:      GyRuntimeMonitor;
  className?:    string;
  style?:        CSSProperties;
}

export function GyCanvasLab({
  height       = 320,
  motherCode,
  hexagramCode,
  monitor,
  className    = "",
  style,
}: GyCanvasLabProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // 引擎单例，始终使用默认 PhysicsConfig（语义层不得影响物理参数）
  const engineRef = useRef<GyPhysicsEngine | null>(null);
  if (engineRef.current === null) {
    engineRef.current = new GyPhysicsEngine([...DOT_IDS]);
  }

  // 母码/卦码变化时记录到 ref（不重建引擎，语义层独立于物理引擎）
  const motherCodeRef  = useRef(motherCode);
  const hexCodeRef     = useRef(hexagramCode);
  useEffect(() => { motherCodeRef.current = motherCode; },   [motherCode]);
  useEffect(() => { hexCodeRef.current    = hexagramCode; }, [hexagramCode]);

  // 手势桥
  const bridgeRef = useRef<GyGestureBridge | null>(null);
  useEffect(() => {
    const container = containerRef.current;
    const engine    = engineRef.current;
    if (!container || !engine) return;
    const bridge = new GyGestureBridge({
      target:  container,
      onInput: (input) => engine.dispatch(input),
    });
    bridgeRef.current = bridge;
    return () => {
      bridge.destroy();
      bridgeRef.current = null;
      engineRef.current?.destroy();
    };
  }, []);

  // 稳定快照函数（每帧被 GyCanvasCore 的 rAF 调用）
  const getSnapshot = useCallback(() => {
    return engineRef.current?.snapshot() ?? {
      axis:     { lineState: "idle" as const, progress: 0, tension: 0, isLocked: false },
      dots:     [],
      railMode: "measure" as const,
      ts:       0,
    };
  }, []);

  // 语义标签函数（每帧被 GyCanvasCore 的 rAF 调用）
  const getLabel = useCallback(() => {
    const snap = engineRef.current?.snapshot();
    if (!snap) return "";
    return getSemanticLabel(snap, motherCodeRef.current, hexCodeRef.current);
  }, []);

  // 监控钩子 ref（monitor 变化时更新，rAF 闭包通过 ref 读取，不重启 rAF）
  const monitorRef = useRef(monitor);
  useEffect(() => { monitorRef.current = monitor; }, [monitor]);
  const onFrame = useCallback((now: number) => {
    monitorRef.current?.notifyFrame(now);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`gy-canvas-lab${className ? ` ${className}` : ""}`}
      style={{
        position:      "relative",
        width:         "100%",
        height,
        cursor:        "grab",
        userSelect:    "none",
        touchAction:   "none",
        ...style,
      }}
    >
      <GyCanvasCore
        getSnapshot={getSnapshot}
        getSemanticLabel={getLabel}
        dotLabels={DOT_LABELS}
        axisWidthRatio={0.82}
        onFrame={monitor ? onFrame : undefined}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
