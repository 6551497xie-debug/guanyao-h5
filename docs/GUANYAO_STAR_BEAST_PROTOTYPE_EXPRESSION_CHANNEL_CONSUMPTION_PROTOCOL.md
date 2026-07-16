# GUANYAO Star Beast Prototype Expression Channel Consumption Protocol

协议编号：`RC-STAR-BEAST-PROTOTYPE-EXPRESSION-CHANNEL-CONSUMPTION-P82`

## 定义

> 将已具备资格的星兽表达通道转换为未来隔离原型 Renderer 可读取的稳定消费引用。

Consumption 不是 Renderer，不是 Render Execution，也不是 Visual Output。P82 不生成视觉，只建立 READY 表达通道到未来 Prototype Renderer Input Reference 的稳定边界。

## 数据链

```text
P81 Expression Channel Readiness reference
        +
P80 Prototype Adapter reference
        +
Renderer Contract reference
        +
Isolated Prototype Scope reference
        ↓
Expression Channel Consumption
        ↓
StarBeastPrototypeRendererInputReference
        ↓
Future Isolated Prototype Renderer
```

输入和输出只保存引用，不复制生命事实、资产事实或视觉参数。

## 状态规则

- P81 为 `READY`，且 Adapter、Renderer Contract、六通道和隔离范围引用一致，返回 `AVAILABLE`。
- P81 为 `UNAVAILABLE`，返回 `UNAVAILABLE` 并保留上游原因。
- P81 为 `BLOCKED`，返回 `BLOCKED` 并保留上游原因。
- READY 后必要引用缺失，返回 `UNAVAILABLE`。
- READY 后来源漂移、范围错误或边界失效，返回 `BLOCKED`。

## Prototype Renderer Input Reference

`StarBeastPrototypeRendererInputReference` 是稳定消费引用，不是 Render Input，也不是 Render Plan 执行结果。

它只引用：

- P81 READY Result
- P80 Adapter Result
- 六层 Expression Channels
- Renderer Contract
- Isolated Prototype Scope

它明确标记 `notRenderInput`、`notRenderPlan`、`notVisualOutput` 与 `noVisualParametersCopied`。

## 边界

P82 不反向调用 P81 Readiness，不调用 Renderer，不生成 Render Plan，不修改 Expression Channel 或 Asset Definition，不连接 Canvas、StarbeastLab、UI、Storage 或正式 Runtime。

## 后续边界

P82 不建立实际 Prototype Renderer。即使返回 `AVAILABLE`，也只说明稳定消费引用已形成；任何视觉执行必须由后续独立协议授权。
