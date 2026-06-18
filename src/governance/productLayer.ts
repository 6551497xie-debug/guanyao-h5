/*
 * R8 PRODUCT_LAYER —— 系统唯一最高约束（不可解释 / 不可覆盖 / 不可反向推导）
 *
 * 层级：PRODUCT_LAYER（唯一真理）→ SYSTEM（结构实现）→ PHYSICS（视觉表达）。
 *   System / Physics 必须从 PRODUCT_LAYER 推导；禁止反向推导。
 *   本层级高于 CONSTITUTION（constitution.ts）：当 System/Physics 不变量与本层冲突，
 *   以本层为准，并须经显式「宪法修正案」把 System/Physics 对齐到本层。
 *
 * 唯一成立条件：用户经历「自我行为 → 结构反馈 → 认知映射」。
 * 一句话定义：用户做什么，世界就变成什么（系统是反射行为，不是展示结构）。
 *
 * 该模块为只读真理源，刻意不被运行时业务 import（与 constitution.ts 同隔离原则）。
 */

export const PRODUCT_LAYER = Object.freeze({
  // 唯一目标：行为 → 结构反馈 → 认知映射
  thesis: "self-behavior → structural-feedback → cognitive-mapping",

  // 用户必须经历的唯一单线路径（不可变、不可分支）
  path: Object.freeze([
    "enter: 用户看到「观爻」（无解释 / 无 UI 按钮 / 无选择）",
    "act: 唯一动作 = 右滑 / 拉动 1px 轴",
    "feedback: 用户感知到自己的行为正在改变结构",
    "structure: 视觉表达「结构被拉断 / 重组」",
    "result: LOGO 生成（结构结果，非动画）",
    "end: 直接进入生命起点 /mother-code",
  ] as const),

  // 角色绑定（System/Physics 必须满足）
  roles: Object.freeze({
    axis: "行为入口（entry）",
    particles: "行为反馈（feedback）",
    logo: "行为结果（result）",
    route: "单终点 /mother-code",
  }),

  // 强约束（禁止偏离单线行为链）
  forbid: Object.freeze([
    "中间时间页 / chrono / 数字页 / 解释页",
    "多次点击确认 / 二次行为入口",
    "UI 流程分支 / 动画过渡页",
    "非行为触发的独立动画 / 自动状态变化",
  ] as const),

  // 物理层可追溯性原则
  physicsRule: "所有视觉变化必须可追溯到用户行为；粒子/LOGO/断裂 = 行为的直接投影",
} as const);

export type ProductLayerSpec = typeof PRODUCT_LAYER;
