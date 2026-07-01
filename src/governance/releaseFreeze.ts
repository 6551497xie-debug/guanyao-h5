/*
 * GUANYAO 1.0 RELEASE FREEZE
 *
 * 本模块是观爻 1.0 Release Freeze 的只读治理标记。
 * 它不参与运行时业务逻辑，不被 UI / Engine / Snapshot / Renderer 调用。
 *
 * Release Freeze 含义：
 *   - 架构演进关闭。
 *   - 生成链路、触发链路、快照协议、渲染协议、卡片协议全部锁定。
 *   - 只允许非架构型维护：bug fix / CI / docs / UI cosmetic tweak。
 *
 * 解冻必须经显式 unfreeze 任务，不允许通过普通功能迭代隐式变更。
 */

export const RELEASE_FREEZE_STATE = Object.freeze({
  RELEASE_FREEZE: true,
  ARCHITECTURE_LOCKED: true,
  EVOLUTION_MODE: "OFF",

  lockedScopes: Object.freeze([
    "deterministic engine architecture",
    "trigger system",
    "snapshot system",
    "render system",
    "protocol system",
  ] as const),

  allowedChanges: Object.freeze([
    "bug fixes (non-architectural)",
    "CI updates (non-logic)",
    "documentation updates",
    "UI cosmetic tweaks",
  ] as const),

  forbiddenChanges: Object.freeze([
    "add new engines",
    "modify generation flow",
    "change snapshot schema",
    "introduce new state machines",
    "alter trigger logic",
  ] as const),
} as const);

export type ReleaseFreezeState = typeof RELEASE_FREEZE_STATE;
