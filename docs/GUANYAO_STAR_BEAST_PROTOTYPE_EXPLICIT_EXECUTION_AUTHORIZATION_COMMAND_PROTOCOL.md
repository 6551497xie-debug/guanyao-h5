# GUANYAO Star Beast Prototype Explicit Execution Authorization Command Protocol

协议编号：`RC-STAR-BEAST-PROTOTYPE-EXPLICIT-EXECUTION-AUTHORIZATION-COMMAND-P85`

## 定义

> P85 将 P84 READY、隔离原型执行权力引用与主体显式 AUTHORIZE 决定组合为一条授权指令。

Command 只表达主体希望进入未来隔离原型执行授权解析流程。Command 不是正式 Authorization，也不是 Render Execution。

## 数据链

```text
P84 READY_FOR_EXPLICIT_ISOLATED_PROTOTYPE_EXECUTION_AUTHORIZATION
        +
STAR_BEAST_PROTOTYPE_EXECUTION_AUTHORITY reference
        +
AUTHORIZE_ISOLATED_PROTOTYPE_EXECUTION decision
        ↓
P85 Explicit Isolated Prototype Execution Authorization Command
```

系统不得从 P84 READY 自动生成 Command。主体没有显式决定时，结果只能是 `NOT_READY`。

## 生成条件

只有以下条件同时成立时生成 Command：

1. P84 Result 为 `READY`。
2. Authority Reference 有效且范围严格为 `ISOLATED_PROTOTYPE_EXECUTION_ONLY`。
3. Decision 严格为 `AUTHORIZE_ISOLATED_PROTOTYPE_EXECUTION`。

Command 原样保留 P84 的 Input Contract、可撤销 Execution Slice 与 Stop Reference，不复制表达通道、资产事实、视觉参数或生命事实。

## 状态规则

- `AVAILABLE`：显式指令已建立，但尚未形成正式 Authorization。
- `NOT_READY`：主体引用或显式决定缺失/无效。
- `UNAVAILABLE`：P84 缺失或为 UNAVAILABLE。
- `BLOCKED`：P84 为 BLOCKED，阻断原因保持可追溯。

## 与正式 Renderer 治理链的关系

P85 只属于隔离资产原型链。它不替代、不解除、不复用正式 Renderer Execution Protocol Authorization，也不产生 Backend Selection Authority。

## 固定边界

P85 不反向调用 P84，不生成正式 Authorization，不调用 Renderer，不选择 Backend，不生成 RenderPlan、Draw Command、像素参数或视觉输出，不连接 Canvas、StarbeastLab、UI、Runtime、Storage。

下一层如需继续，必须建立独立的 Prototype Execution Authorization Resolver。P85 Command 不得被 Renderer 直接消费。
