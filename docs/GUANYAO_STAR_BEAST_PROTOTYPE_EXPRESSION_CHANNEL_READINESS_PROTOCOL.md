# GUANYAO Star Beast Prototype Expression Channel Consumption Readiness Protocol

协议编号：`RC-STAR-BEAST-PROTOTYPE-EXPRESSION-CHANNEL-CONSUMPTION-READINESS-P81`

## 定义

> Prototype Expression Channel Consumption Readiness 判断 P80 六层表达通道是否具备进入未来隔离原型 Renderer 消费边界的资格。

Readiness 不等于 Consumption，更不等于 Rendering。本协议只回答“是否准备好”，不读取像素、不绘制画面、不启动动画。

## 数据链

```text
P80 StarBeastAssetPrototypeAdapterResult reference
        +
Prototype Expression Channels reference
        +
Renderer Contract reference
        +
Isolated Prototype Scope reference
        ↓
Prototype Expression Channel Readiness
        ↓
READY | UNAVAILABLE | BLOCKED
```

输入只保存引用，不复制表达通道、资产事实、Visual State 或 Renderer Contract。

## READY 条件

必须同时满足：

1. P80 Adapter Result 为 `AVAILABLE`。
2. 六通道引用与 P80 原始输出为同一引用。
3. 通道数量为六，顺序固定且不重复。
4. 每个通道继续引用同一 Asset Definition、Visual State 与对应 P77 子系统。
5. Renderer Contract 引用与 P80 输入一致。
6. 隔离范围明确为 `ISOLATED_PROTOTYPE_ONLY`。
7. P80 的无渲染、无 Canvas、无动画、无写入边界保持完整。

满足后返回：`READY_FOR_ISOLATED_PROTOTYPE_RENDERER_CONSUMPTION`。

## 状态规则

- `READY`：六通道具备进入后续隔离消费契约的资格，但尚未消费。
- `UNAVAILABLE`：P80 尚不可用或必要引用不足，可以等待补齐。
- `BLOCKED`：P80 已阻断、引用错配、通道契约破坏或隔离范围无效，禁止继续。

## 边界

P81 不反向调用 P80 Adapter，不重新创建表达通道，不调用 Renderer，不连接 Canvas 或 StarbeastLab，不修改动画、UI、Storage、Life State、Visual State 与正式 Runtime。

## 后续边界

本协议不建立 Prototype Expression Channel Consumer。即使返回 `READY`，也不得直接进入 Canvas；后续消费必须由独立协议授权。
