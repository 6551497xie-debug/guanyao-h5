# 观爻 1.0 Release Freeze

## 1｜冻结状态

观爻 1.0 当前进入 Release Freeze 状态。

系统标记：

```text
RELEASE_FREEZE = TRUE
ARCHITECTURE_LOCKED = TRUE
EVOLUTION_MODE = OFF
```

治理标记源：

```text
src/governance/releaseFreeze.ts
```

该文件是只读治理源，不参与运行时业务逻辑。

## 2｜冻结范围

以下系统能力已锁定：

1. deterministic engine architecture
2. trigger system
3. snapshot system
4. render system
5. protocol system

以上范围不得在普通迭代中继续演进。

## 3｜唯一允许范围

Release Freeze 后仅允许：

1. bug fixes (non-architectural)
2. CI updates (non-logic)
3. documentation updates
4. UI cosmetic tweaks

允许项不得改变生成链路、触发链路、快照结构、协议结构或渲染协议。

## 4｜禁止行为

禁止：

1. add new engines
2. modify generation flow
3. change snapshot schema
4. introduce new state machines
5. alter trigger logic

任何涉及以上行为的任务，必须先显式执行 unfreeze。

## 5｜Release Gate

Release Freeze 检查已接入：

```bash
npm run check:release-freeze
```

观爻 1.0 上线前总闸：

```bash
npm run check:release
```

`check:release` 必须完整通过，才能进入发布流程。

## 6｜结论

观爻 1.0 当前系统状态：

```text
RELEASE_FREEZE = TRUE
ARCHITECTURE_LOCKED = TRUE
EVOLUTION_MODE = OFF
```

从此刻起，系统进入稳定性维护期。

架构变更能力关闭。

CI、文档、非架构 bug fix 与 UI cosmetic tweak 仍可继续。
