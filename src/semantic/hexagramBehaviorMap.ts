// ═══════════════════════════════════════════════════════════════════
// 观爻 2.0 · 卦码 → 行为轨迹映射层
//
// 职责：只读 guanyaoHexagramCardTemplateData，
//       将卦码（001–010 已定义）映射为行为轨迹 Profile。
//       不控制任何逻辑，只作语义注释层。
// ═══════════════════════════════════════════════════════════════════

import type { Trigram } from "../types/guanyaoCausalEngine";

// ── 行为轨迹类型 ──────────────────────────────────────────────────
export type BehaviorTrajectory =
  | "breakthrough-latency"   // 在阻力里缓慢突破（003 水雷屯）
  | "perception-occlusion"   // 感知受阻，看不清（004 山水蒙）
  | "suspended-readiness"    // 悬停等待，保持准备（005 水天需）
  | "dual-force-confrontation" // 双力对峙（006 天水讼）
  | "distributed-advance"    // 分布式推进（007 地水师）
  | "resonant-approach"      // 共振靠近（008 水地比）
  | "restrained-accumulation"// 克制蓄势（009 风天小畜）
  | "measured-conduct"       // 有序推进（010 天泽履）
  | "pure-ascent"            // 纯粹上升（001 乾为天）
  | "deep-reception"         // 深度承接（002 坤为地）
  | "unknown";               // 未映射的卦码

export interface HexagramBehaviorProfile {
  code: string;
  hexagramName: string;
  upperTrigram: Trigram;
  lowerTrigram: Trigram;
  trajectory: BehaviorTrajectory;
  /** 行为结构描述（一行） */
  behaviorNote: string;
  /** 力学特征描述 */
  forceCharacter: string;
  /** 在物理状态中可叠加的语义短语 */
  overlayPhrase: string;
}

// ── 卦码行为档案（001–010 先行定义） ──────────────────────────────

const HEXAGRAM_BEHAVIOR_PROFILES: HexagramBehaviorProfile[] = [
  {
    code: "001", hexagramName: "乾为天", upperTrigram: "乾", lowerTrigram: "乾",
    trajectory: "pure-ascent",
    behaviorNote: "纯粹上升，单向推进，不找侧路",
    forceCharacter: "单一高强度正向力",
    overlayPhrase: "在高处承重",
  },
  {
    code: "002", hexagramName: "坤为地", upperTrigram: "坤", lowerTrigram: "坤",
    trajectory: "deep-reception",
    behaviorNote: "深度承接，双向吸纳，边界模糊",
    forceCharacter: "全面阻尼吸收",
    overlayPhrase: "装了太多了",
  },
  {
    code: "003", hexagramName: "水雷屯", upperTrigram: "坎", lowerTrigram: "震",
    trajectory: "breakthrough-latency",
    behaviorNote: "初生阻滞，在阻力里顶出第一道缝",
    forceCharacter: "冲动（震）遇不稳定（坎），延迟破局",
    overlayPhrase: "第一步最难",
  },
  {
    code: "004", hexagramName: "山水蒙", upperTrigram: "艮", lowerTrigram: "坎",
    trajectory: "perception-occlusion",
    behaviorNote: "感知受阻，被迷雾遮住，先问对问题",
    forceCharacter: "锁止（艮）叠加深陷（坎），看不到出口",
    overlayPhrase: "你看不清现在在哪",
  },
  {
    code: "005", hexagramName: "水天需", upperTrigram: "坎", lowerTrigram: "乾",
    trajectory: "suspended-readiness",
    behaviorNote: "高位待命，悬停在不确定里",
    forceCharacter: "上升力（乾）被悬停（坎），保持就绪",
    overlayPhrase: "你在等，但你没停",
  },
  {
    code: "006", hexagramName: "天水讼", upperTrigram: "乾", lowerTrigram: "坎",
    trajectory: "dual-force-confrontation",
    behaviorNote: "双力对峙，立场必须说清楚",
    forceCharacter: "上升力（乾）与深陷力（坎）正面撞击",
    overlayPhrase: "两个力在你身体里打架",
  },
  {
    code: "007", hexagramName: "地水师", upperTrigram: "坤", lowerTrigram: "坎",
    trajectory: "distributed-advance",
    behaviorNote: "分散推进，让每份力量找到位置",
    forceCharacter: "承载（坤）+ 深陷（坎），需要组织分配",
    overlayPhrase: "你在给力量找位置",
  },
  {
    code: "008", hexagramName: "水地比", upperTrigram: "坎", lowerTrigram: "坤",
    trajectory: "resonant-approach",
    behaviorNote: "共振靠近，边界清楚后才选择依附",
    forceCharacter: "深陷（坎）+ 承载（坤），需要先辨认才靠近",
    overlayPhrase: "你在靠近，但你没交出自己",
  },
  {
    code: "009", hexagramName: "风天小畜", upperTrigram: "巽", lowerTrigram: "乾",
    trajectory: "restrained-accumulation",
    behaviorNote: "克制蓄势，让力量长到可以落下",
    forceCharacter: "渗透（巽）+ 上升（乾），蓄力而不轻易释放",
    overlayPhrase: "还不是时候",
  },
  {
    code: "010", hexagramName: "天泽履", upperTrigram: "乾", lowerTrigram: "兑",
    trajectory: "measured-conduct",
    behaviorNote: "有序推进，知道自己踩在哪里",
    forceCharacter: "上升（乾）+ 转化释放（兑），节制有序",
    overlayPhrase: "你知道自己踩在哪",
  },
];

// ── 索引 ─────────────────────────────────────────────────────────
const PROFILE_INDEX = new Map<string, HexagramBehaviorProfile>(
  HEXAGRAM_BEHAVIOR_PROFILES.map((p) => [p.code, p])
);

export function getHexagramBehaviorProfile(code: string): HexagramBehaviorProfile | null {
  return PROFILE_INDEX.get(code) ?? null;
}

// 未映射卦码返回 unknown profile
export const UNKNOWN_BEHAVIOR_PROFILE: HexagramBehaviorProfile = {
  code: "???",
  hexagramName: "未知",
  upperTrigram: "乾",
  lowerTrigram: "乾",
  trajectory: "unknown",
  behaviorNote: "尚未建立行为档案",
  forceCharacter: "未知力学特征",
  overlayPhrase: "",
};
