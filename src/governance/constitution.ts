/*
 * R8 CONSTITUTION —— OUT-OF-BAND RAW TRUTH SOURCE（不可解释 / 不可覆盖）
 *
 * 本模块是宪法层的「独立引用源」，不是文本片段、不是 ENGINEER 输出的解释版本。
 *
 * 使用规则（R8-PROSECUTOR-CONSTITUTION-ISOLATION-P0）：
 *   - PROSECUTOR 只能「引用」本对象，禁止「继承」ENGINEER 输出语义。
 *   - PROSECUTOR CHECK = PURE CONSTITUTION COMPARISON：
 *       if (systemState !== CONSTITUTION.spec) → FAIL
 *   - 禁止基于 ENGINEER OUTPUT 做合理化判断 / 接受默认解释 / 语义简化。
 *   - 本对象为 RAW TRUTH，不可解释；只能经显式「宪法修正案」任务变更。
 *
 * 该模块为只读引用源，刻意不被任何运行时业务逻辑 import，
 * 以保证 ENGINEER（可变提案系统）与 CONSTITUTION（真理系统）语义层物理隔离。
 */

export const CONSTITUTION = Object.freeze({
  stateMachine: "blackout→typing→axis→gesture→collapse→next",
  geometry: "xMatrixModel (single source of truth)",
  physics: "particle convergence + epsilon lock",
  render: "single rAF loop, multi-layer separation",
  route: "Launch → chrono-axis → mother-code",
} as const);

export type ConstitutionSpec = typeof CONSTITUTION;
