# 观爻 1.0 Release Gate 工程规范

## 1｜系统概述

Release gate 是观爻 1.0 上线前的唯一标准检查入口。

它用于在发布前确认三件事：

1. 系统架构层没有跨层污染。
2. 表达层仍保持 1.0 冻结协议。
3. Mother Code Card 生成结果保持严格确定性。

统一执行命令：

```bash
npm run check:release
```

`check:release` 存在的目的，是把上线前检查从“人工记忆流程”固定为“工程可执行流程”。

从观爻 1.0 起，任何准备进入发布、预发、交付或正式演示的版本，都必须通过该命令。

## 2｜三层检查体系

`check:release` 由三道检查组成。

### Architecture Check

执行：

```bash
npm run check:layers
```

检查目标：

1. Generation / Inference / UI 三层是否保持隔离。
2. 是否存在跨层写入。
3. 是否存在 UI 直接污染生成层或推理层。
4. 是否存在旧链路绕过当前架构约束。

该检查用于保护系统架构不发生隐性回退。

### Expression Check

执行：

```bash
npm run check:expression
```

检查目标：

1. Expression Layer V1 是否保持冻结。
2. 人格行为语言是否仍在允许范围内。
3. 光兽生命体表达是否未被动物化、神兽化或角色化。
4. Mother Card 输出格式是否保持稳定。

该检查用于保护产品表达层不发生语义漂移。

### Determinism Check

执行：

```bash
npm run check:mother-card-determinism
```

检查目标：

1. 固定 Chrono + Geo 输入是否稳定生成同一张 Mother Code Card。
2. `motherCode`、`trigram`、`direction`、`starOrigin` 等核心字段是否完全一致。
3. 是否存在随机数、时间依赖、隐藏状态泄漏或旧引擎回流。

该检查用于保护 Mother Code Card 作为人格 IP 资产的确定性。

## 3｜执行规则

`check:release` 必须整体通过。

允许状态：

```text
PASS
```

禁止状态：

```text
partial pass
partial fail
manual skip
ignored fail
```

规则：

1. 三道检查必须全部通过。
2. 任意一道失败，即视为 release gate 失败。
3. 不允许只执行其中一部分后发布。
4. 不允许用人工判断替代检查结果。
5. 不允许忽略 determinism failure。

## 4｜上线流程

### Local Run

开发本地准备提交或合并前执行：

```bash
npm run check:release
```

用途：

1. 快速确认当前改动没有破坏架构层。
2. 快速确认表达层没有漂移。
3. 快速确认 Mother Code Card 仍是确定性输出。

### CI Run

CI pipeline 中必须执行：

```bash
npm run check:release
```

用途：

1. 阻断未通过 release gate 的提交进入主干。
2. 保证自动化环境与本地检查使用同一入口。
3. 避免多套检查流程产生分叉。

### Pre-release Run

发布候选版本、预发版本、正式演示版本前执行：

```bash
npm run check:release
```

用途：

1. 作为上线前最后一道系统闸门。
2. 确认当前版本满足观爻 1.0 最小稳定态。
3. 确认没有旧链路、旧语义、非确定性输出重新混入。

## 5｜禁止行为

禁止绕过 release gate。

禁止只跑部分检查后发布。

禁止在 determinism check 失败时继续上线。

禁止将单独的 `check:layers`、`check:expression` 或 `check:mother-card-determinism` 当作完整发布依据。

禁止因为本地视觉预览正常而跳过 `check:release`。

禁止因为 build 通过而跳过 `check:release`。

`npm run build` 只证明项目可以构建。

`npm run check:release` 才证明观爻 1.0 当前版本满足上线前系统约束。

## 6｜结论

观爻 1.0 的唯一标准上线前流程是：

```bash
npm run check:release
```

该命令同时服务于：

1. 本地开发检查。
2. CI pipeline pre-check。
3. release preflight validation。
4. 正式上线前人工确认。

任何版本只有在 `check:release` 完整通过后，才允许进入发布流程。
