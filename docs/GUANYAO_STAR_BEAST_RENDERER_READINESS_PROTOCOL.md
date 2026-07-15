# GUANYAO Star Beast Renderer Readiness Protocol
# 观爻星兽渲染器资格协议

版本：Evolution Phase 2 / P45

状态：RENDERER IMPLEMENTATION READINESS

施工编号：`RC-STAR-BEAST-RENDERER-READINESS-P45`

## 00｜协议定位

P45 只判断 P43 Render Plan Endpoint Result 是否具备进入未来 Renderer Implementation Protocol 的资格。

固定关系为：

```text
P43 StarBeastRenderPlanConsumptionResult
↓
P45 StarBeastRendererReadiness
├─ READY
├─ NOT_READY
└─ UNAVAILABLE
```

Readiness 不是 Renderer，不是 Render Runtime，也不是 Renderer Implementation。

## 01｜唯一输入

P45 Input 只包含：

```text
endpointResult: StarBeastRenderPlanConsumptionResult | null
```

该字段只允许承载 P43 Endpoint 的原始返回引用。

P45 禁止：

- 直接调用 P41 Adapter；
- 直接调用 P42 Consumption；
- 自行构造或重算 Render Plan；
- 从 P39 Visual State 反向推断 readiness；
- 读取设备、浏览器或 UI 状态。

## 02｜READY

当 P43 Endpoint Result 为 AVAILABLE 时，P45 返回：

```text
READY_FOR_RENDERER_IMPLEMENTATION_PROTOCOL
```

READY 只保留以下原始引用：

- P43 Endpoint Result；
- P42 Render Plan Consumption；
- P41 形成的同一份 Render Plan；
- 原始 Render Request。

READY 只表示语义计划链已满足未来独立 Renderer Implementation Protocol 的前置条件。

READY 不表示：

- Renderer 已创建；
- 当前设备可以渲染；
- UI 可以接入；
- 动画或视觉资产已经存在。

## 03｜NOT_READY

当 P43 Endpoint Result 为 UNAVAILABLE 时，P45 返回：

```text
NOT_READY
reason: RENDER_PLAN_CONSUMPTION_NOT_AVAILABLE
```

同时分别保留：

- P42 `sourceConsumptionUnavailableReason`；
- P41 `sourceRendererUnavailableReason`。

P45 不吞掉、不合并、不改写两层上游原因。

NOT_READY 不是渲染失败，只表示 P39–P43 语义计划链当前没有形成可供未来 Renderer 使用的 Consumption。

## 04｜UNAVAILABLE

当 P43 Endpoint Result 缺失时，P45 返回：

```text
UNAVAILABLE
reason: RENDER_PLAN_ENDPOINT_RESULT_REQUIRED
```

UNAVAILABLE 不补默认 Result，不调用 P43，也不从 P41/P42 恢复或伪造结果。

## 05｜冻结链扩展边界

P45 是 P44 Freeze Protocol 授权的唯一 Result Consumer。

调用所有权保持：

```text
P41 Adapter → only composed by P43
P42 Consumption → only composed by P43
P43 Resolver → no direct external caller
P43 Result → only consumed by P45 Readiness
P45 Readiness → no Renderer / UI / Runtime consumer
```

P45 接收由上位调用方提供的 P43 Result，不直接调用 P43 Resolver。因此 P43 仍是 P40–P42 唯一正式入口，P45 也不能绕行冻结链。

## 06｜严格禁止

本刀禁止：

- Canvas、WebGL、Three.js、shader 或 draw command；
- 图片、SVG、模型、纹理、粒子或动画资产；
- UI、Launch、Gravity、Crystal 页面接入；
- Runtime、Persistence、Storage、网络或 AI；
- 创建或修改 Life State、Memory、Growth、Archive、Journey、Crystal；
- 修改 P39–P43 类型、计划计算或现有用户结果。

## 07｜施工范围

P45 只新增：

- `StarBeastRendererReadiness` 类型契约；
- `starBeastRendererReadinessService`；
- 本协议与独立 readiness gate；
- P43/P44 协议及 gate 的授权消费点校准；
- release gate 注册。

## 08｜验收

1. P43 AVAILABLE Result 形成 READY；
2. P43 UNAVAILABLE Result 形成 NOT_READY 并保留原始原因；
3. 缺少 P43 Result 形成 UNAVAILABLE；
4. P45 只保留原始引用，不复制五通道；
5. P45 不调用 P41、P42 或 P43，不实现 Renderer；
6. P44 调用拓扑保持冻结；
7. readiness gate、P39–P44 gates、release、build 与 `git diff --check` 通过。

## 09｜P46 Implementation Candidate

P46 `StarBeastRendererImplementationCandidate` 是 P45 Result 的唯一授权消费者。

P46 只接收由上位调用方提供的 P45 Result、Implementation Request Reference 与 Backend Capability Reference，不直接调用 P45 Resolver，也不选择渲染后端。

P45 Resolver 继续保持无外部直接调用者；P45 Result 只允许流向 P46 Candidate。P46 之后仍没有 Renderer、UI 或 Runtime 消费者。

## 10｜P77 Isolated Reality Slice Extension

P77 不消费或修改 P45 Readiness。它仅在 `/starbeast-lab` 内调用 P39 Mapping 与 P43 Endpoint，取得同一份不可变 RenderPlan 后交给 Prototype Adapter。P45–P76 正式治理链仍无产品 UI、Runtime、Storage 或正式 Renderer 消费者。
