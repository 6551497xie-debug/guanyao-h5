// ═══════════════════════════════════════════════════════════════════
// 观爻 2.0 · 行为语义解释器
//
// 职责：
//   force state → semantic meaning → canvas label
//
// 红线：
//   不修改任何 force engine 行为
//   不控制 canvas 渲染逻辑
//   不读写业务数据（LocalStorage / Codex / 压力种子）
//   只做"解释"，不做"控制"
// ═══════════════════════════════════════════════════════════════════

import type { EngineSnapshot } from "../canvas/types";
import type { MotherCodeKey } from "./motherCodeForceMap";
import { MOTHER_CODE_FORCE_MAP } from "./motherCodeForceMap";
import { getHexagramBehaviorProfile } from "./hexagramBehaviorMap";

// ── 解释输出结构 ──────────────────────────────────────────────────
export interface SemanticInterpretation {
  /** 主语义短语（显示在 Canvas 中央）*/
  primary: string;
  /** 卦码叠加短语（来自 hexagram behavior profile） */
  overlay: string;
  /** 力学语义描述（母码来源，用于 debug/tooltip） */
  forceNote: string;
}

const EMPTY: SemanticInterpretation = { primary: "", overlay: "", forceNote: "" };

// ── 核心解释函数 ──────────────────────────────────────────────────
export function interpretPhysicsState(
  snap: EngineSnapshot,
  motherCode?: MotherCodeKey | null,
  hexagramCode?: string | null
): SemanticInterpretation {
  const { axis } = snap;
  const { lineState, tension } = axis;

  // 母码 phrases
  const mcProfile = motherCode ? MOTHER_CODE_FORCE_MAP[motherCode] : null;

  let primary = "";

  switch (lineState) {
    case "idle":
      // 静止态不显示语义，保持沉默
      primary = "";
      break;

    case "ignite":
      primary = mcProfile?.phrases.ignite ?? "";
      break;

    case "tense":
      primary = tension < 0.4
        ? (mcProfile?.phrases.tense_low  ?? "你在蓄力")
        : (mcProfile?.phrases.tense_high ?? "快到临界了");
      break;

    case "locked":
      primary = mcProfile?.phrases.locked ?? "你停住了";
      break;

    case "break":
      primary = mcProfile?.phrases.break ?? "旧模式被打断";
      break;

    case "rebound":
      primary = mcProfile?.phrases.rebound ?? "你试图恢复旧自己";
      break;

    default:
      primary = "";
  }

  // 卦码叠加短语
  const hexProfile = hexagramCode ? getHexagramBehaviorProfile(hexagramCode) : null;
  const overlay    = hexProfile?.overlayPhrase ?? "";
  const forceNote  = hexProfile?.forceCharacter ?? "";

  return { primary, overlay, forceNote };
}

// ── 便捷函数：只取主短语 ─────────────────────────────────────────
export function getSemanticLabel(
  snap: EngineSnapshot,
  motherCode?: MotherCodeKey | null,
  hexagramCode?: string | null
): string {
  const result = interpretPhysicsState(snap, motherCode, hexagramCode);
  // 两行叠加：primary + overlay（用换行隔开，由 Canvas 处理显示）
  if (result.primary && result.overlay) {
    return `${result.primary}\n${result.overlay}`;
  }
  return result.primary || result.overlay;
}

// ── 工具：从 EngineSnapshot 快速判断"当前行为阶段" ─────────────
export type BehaviorPhase =
  | "dormant"    // idle
  | "building"   // ignite → tense
  | "critical"   // tense high
  | "locked"     // locked
  | "ruptured"   // break
  | "recovering";// rebound

export function getBehaviorPhase(snap: EngineSnapshot): BehaviorPhase {
  const { lineState, tension } = snap.axis;
  if (lineState === "idle")    return "dormant";
  if (lineState === "ignite")  return "building";
  if (lineState === "tense")   return tension >= 0.65 ? "critical" : "building";
  if (lineState === "locked")  return "locked";
  if (lineState === "break")   return "ruptured";
  if (lineState === "rebound") return "recovering";
  return "dormant";
}

export { EMPTY as EMPTY_INTERPRETATION };
