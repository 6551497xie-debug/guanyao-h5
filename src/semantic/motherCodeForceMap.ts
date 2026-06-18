// ═══════════════════════════════════════════════════════════════════
// 观爻 2.0 · 母码 → 力学语义档案（只读注释层）
//
// 边界锁定（R8-ENGINE-SEMANTIC-BOUNDARY-P1）：
//   ❌ 本文件不得控制 Force Engine
//   ❌ 不得输出 PhysicsConfig 或任何 engine 参数
//   ❌ 不得影响物理状态机路径
//   ✔  只作为 BehaviorInterpreter 的语义短语数据源
//   ✔  只描述"发生了什么"，不决定"发生什么"
// ═══════════════════════════════════════════════════════════════════

import type { GuanyaoMotherCodeAsset } from "../data/guanyaoMotherCodeAssetLibrary";

export type MotherCodeKey = GuanyaoMotherCodeAsset["code"];

// ── 母码语义档案（纯注释，不控制任何引擎行为） ───────────────────
export interface MotherCodeForceProfile {
  code: MotherCodeKey;
  /** 力学特征描述（纯注释，不映射到任何 config 参数） */
  baseForceBias: number;
  /** 张力特征描述（纯注释） */
  tensionSensitivity: number;
  /** 断裂特征描述（纯注释） */
  ruptureThreshold: number;
  /** 复归特征描述（纯注释） */
  reboundRate: number;
  /** 力学语义描述（只读，不影响任何逻辑） */
  semanticTone: string;
  /** 各物理状态下的语义短语 */
  phrases: {
    idle:        string;
    ignite:      string;
    tense_low:   string;  // tension < 0.4
    tense_high:  string;  // tension ≥ 0.4
    locked:      string;
    break:       string;
    rebound:     string;
  };
}

// ── 8 母码力学档案定义 ────────────────────────────────────────────

export const MOTHER_CODE_FORCE_MAP: Record<MotherCodeKey, MotherCodeForceProfile> = {
  qian: {
    code: "qian",
    baseForceBias:     1.3,
    tensionSensitivity: 0.8,
    ruptureThreshold:  0.85,
    reboundRate:       0.6,
    semanticTone:      "upward force bias — 向上推进，承重困难断裂",
    phrases: {
      idle:       "",
      ignite:     "力量开始聚集",
      tense_low:  "你还在自己扛",
      tense_high: "快到一个人撑不住的地方了",
      locked:     "你定了方向",
      break:      "旧的承重方式断了",
      rebound:    "你在试着重新分配力量",
    },
  },
  kun: {
    code: "kun",
    baseForceBias:     0.7,
    tensionSensitivity: 0.6,
    ruptureThreshold:  0.90,
    reboundRate:       1.4,
    semanticTone:      "damping / absorption — 深度承载，阻尼吸收",
    phrases: {
      idle:       "",
      ignite:     "你开始接住了",
      tense_low:  "你在吸收压力",
      tense_high: "你装了太多了",
      locked:     "你找到了边界",
      break:      "装不下的终于出来了",
      rebound:    "你在重新确认能承接什么",
    },
  },
  zhen: {
    code: "zhen",
    baseForceBias:     1.6,
    tensionSensitivity: 1.4,
    ruptureThreshold:  0.52,
    reboundRate:       1.2,
    semanticTone:      "impulse amplification — 冲动放大，快速破局",
    phrases: {
      idle:       "",
      ignite:     "你要动了",
      tense_low:  "冲动在积累",
      tense_high: "马上要出去了",
      locked:     "你踩住了",
      break:      "冲出去了",
      rebound:    "你在确认刚才的方向对不对",
    },
  },
  xun: {
    code: "xun",
    baseForceBias:     0.9,
    tensionSensitivity: 0.9,
    ruptureThreshold:  0.72,
    reboundRate:       1.0,
    semanticTone:      "lateral diffusion — 横向渗透，找缝隙进入",
    phrases: {
      idle:       "",
      ignite:     "你在找入口",
      tense_low:  "你在绕开正面",
      tense_high: "退让快到边缘了",
      locked:     "你选了一个位置",
      break:      "正面冲突终于来了",
      rebound:    "你在找新的路径",
    },
  },
  kan: {
    code: "kan",
    baseForceBias:     1.1,
    tensionSensitivity: 1.3,
    ruptureThreshold:  0.58,
    reboundRate:       0.8,
    semanticTone:      "instability / depth pull — 下拉不稳，深处张力",
    phrases: {
      idle:       "",
      ignite:     "你在警觉",
      tense_low:  "你在防备",
      tense_high: "你快被拉进去了",
      locked:     "你锁住了自己",
      break:      "防线破了",
      rebound:    "你在确认真实风险是什么",
    },
  },
  li: {
    code: "li",
    baseForceBias:     1.2,
    tensionSensitivity: 1.1,
    ruptureThreshold:  0.65,
    reboundRate:       0.7,
    semanticTone:      "expansion / flare — 照见扩张，戏剧性爆发",
    phrases: {
      idle:       "",
      ignite:     "你看到了什么",
      tense_low:  "你在判断",
      tense_high: "你看得太清楚了，但动不了",
      locked:     "你命名了它",
      break:      "看到归看到，终于要行动了",
      rebound:    "你在让看见变成做了什么",
    },
  },
  gen: {
    code: "gen",
    baseForceBias:     0.6,
    tensionSensitivity: 0.5,
    ruptureThreshold:  0.95,
    reboundRate:       1.8,
    semanticTone:      "lock / stop force — 锁止稳定，极难崩断",
    phrases: {
      idle:       "",
      ignite:     "你开始蓄力了",
      tense_low:  "你在等",
      tense_high: "你在用力停在原地",
      locked:     "你停住了，这是你的位置",
      break:      "停住的代价来了",
      rebound:    "你在重新稳定",
    },
  },
  dui: {
    code: "dui",
    baseForceBias:     1.0,
    tensionSensitivity: 1.0,
    ruptureThreshold:  0.60,
    reboundRate:       1.5,
    semanticTone:      "transformation / release — 转化释放，快速流动",
    phrases: {
      idle:       "",
      ignite:     "你在释放",
      tense_low:  "你在转化",
      tense_high: "你快要说出来了",
      locked:     "你选了这个出口",
      break:      "说出去了，回不来了",
      rebound:    "你在整理说完之后的感觉",
    },
  },
};

