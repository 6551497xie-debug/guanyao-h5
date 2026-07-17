# GUANYAO Personal Star Beast Explicit User Binding Authorization Decision Resolution

协议编号：`RC-PERSONAL-STAR-BEAST-EXPLICIT-USER-BINDING-AUTHORIZATION-DECISION-RESOLUTION-P142`

## 1. 定位

P142 位于：

```text
P141 Explicit Authorization Decision Command
↓
P142 Explicit Authorization Decision Resolution
↓
Future User Binding / Product Consumption Review
```

本刀只解析已经提交的 `GRANT` 或 `DECLINE` 命令，不重新猜测主体意愿。

## 2. 结果语义

- `GRANT` → `decisionOutcome = GRANTED`，`authorizationStatus = AUTHORIZED`；
- `DECLINE` → `decisionOutcome = DECLINED`，`authorizationStatus = NOT_AUTHORIZED`。

两种结果都保持：

- `userBinding = NOT_PERFORMED`；
- `productConsumption = NOT_PERFORMED`；
- `futureUserBindingRequired = true`。

授权范围仅是 Personal Star Beast Identity Reference，不是自动创建用户绑定。

## 3. 禁止越权

P142 不执行：

- 用户绑定；
- Personal Star Beast 产品消费；
- Storage 写入；
- 用户画像或 Life State 创建；
- Engine、Renderer、UI 调用。

P142 不提供默认决定，也不把缺失命令解释为 `DECLINE` 或 `GRANT`。

## 4. 状态

- `READY`：显式命令已解析为 `GRANTED` 或 `DECLINED`；
- `UNAVAILABLE`：决定命令缺失或不可用；
- `BLOCKED`：命令边界、决定范围或身份引用不合法。
