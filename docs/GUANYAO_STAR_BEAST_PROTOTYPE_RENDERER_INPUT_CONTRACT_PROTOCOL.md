# GUANYAO Star Beast Prototype Renderer Input Contract Protocol

协议编号：`RC-STAR-BEAST-PROTOTYPE-RENDERER-INPUT-CONTRACT-P83`

## 定义

> Prototype Renderer Input Contract 将 P82 的稳定消费引用封装为未来隔离原型 Renderer 可以接收的正式输入契约。

Input Contract 不是 Render Execution，不是 Draw Command，不是 Pixel Parameter，也不是 Render Plan。它只定义未来 Renderer 接收哪些引用，以及这些引用必须满足的边界。

## 数据链

```text
P82 Expression Channel Consumption Result
        +
P82 Prototype Renderer Input Reference
        +
Isolated Prototype Renderer Request Reference
        ↓
Prototype Renderer Input Contract
        ↓
Future Prototype Renderer Execution Readiness
```

## 输入请求

请求引用必须明确：

```text
referenceType = STAR_BEAST_PROTOTYPE_RENDERER_REQUEST
requestPurpose = VALIDATE_ISOLATED_PROTOTYPE_EXPRESSION
```

请求只表达隔离原型验证意图，不授予渲染执行权限。

## 契约内容

正式输入契约只引用：

- P82 AVAILABLE Consumption Result
- P82 Prototype Renderer Input Reference
- 六层 Expression Channels
- Renderer Contract
- Isolated Prototype Scope
- Prototype Renderer Request

不复制生命事实、资产事实、坐标、强度、轨迹或视觉参数。

## 状态规则

- P82 为 `AVAILABLE` 且 Input Reference 与请求合法，返回 `AVAILABLE`。
- P82 为 `UNAVAILABLE`，返回 `UNAVAILABLE` 并保留上游原因。
- P82 为 `BLOCKED`，返回 `BLOCKED` 并保留上游原因。
- 必要引用缺失返回 `UNAVAILABLE`。
- Input Reference 漂移、请求越权或 P82 边界失效返回 `BLOCKED`。

## 边界

P83 不反向调用 P82 Service，不调用 Renderer，不生成 Render Plan、Draw Command 或 Pixel Parameter，不连接 Canvas、StarbeastLab、UI、Storage 或正式 Runtime。

P83 输出只到 `AVAILABLE_FOR_FUTURE_PROTOTYPE_RENDERER_EXECUTION_READINESS`。

## 后续边界

本协议不建立 Renderer Execution Readiness，不创建 Renderer，也不产生视觉输出。任何执行准备与 Canvas 接入必须由后续独立协议授权。
