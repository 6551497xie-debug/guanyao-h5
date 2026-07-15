# GUANYAO Star Beast Render Plan Endpoint Protocol
# 观爻星兽语义渲染计划端点协议

版本：Evolution Phase 2 / P43

状态：STABLE RENDER PLAN ENDPOINT

施工编号：`RC-STAR-BEAST-RENDER-PLAN-ENDPOINT-P43`

## 00｜协议定位

P43 闭合 P40–P42 语义计划链，只提供一个稳定调用入口。

固定关系为：

```text
StarBeastRendererInput
↓
P41 Render Plan Adapter
↓
P42 Render Plan Consumption
↓
StarBeastRenderPlanConsumptionResult
```

P43 不是 Renderer，不生成新的 Visual State、Render Plan、画面、动画或视觉资产。

## 01｜唯一入口

`resolveStarBeastRenderPlanConsumption` 是 P40–P42 链的唯一正式入口。

Endpoint 只接受 P40 `StarBeastRendererInput`，内部固定：

1. 调用 P41 `adaptStarBeastRendererInputToRenderPlan`；
2. 当 P41 为 PLANNED 时，将同一个 Plan 引用交给 P42；
3. 当 P41 为 UNAVAILABLE 时，以 null Plan Reference 交给 P42；
4. 只返回 P42 `StarBeastRenderPlanConsumptionResult`。

Endpoint 不暴露独立的 P41 Renderer Output，也不允许调用者自行拼装 P42 Input。

## 02｜AVAILABLE

当六项 Renderer Capability 完整时：

```text
P41 PLANNED
↓ same Plan reference
P42 AVAILABLE
↓
AVAILABLE_FOR_FUTURE_RENDERER
```

Endpoint 必须保持原始 Renderer Input、Render Request、Visual State 与 Render Plan 引用，不复制五通道，不增加生命事实。

## 03｜UNAVAILABLE

当 P41 Capability 校验失败时：

```text
P41 UNAVAILABLE / RENDERER_CAPABILITY_UNAVAILABLE
↓
P42 UNAVAILABLE / RENDER_PLAN_OUTPUT_UNAVAILABLE
```

P42 的 `sourceUnavailableReason` 必须继续保留 P41 原始原因。Endpoint 不吞掉、不改写、不降级为 null。

## 04｜调用所有权

- P39 Mapping 函数仍没有业务下游调用者；
- P41 Adapter 只允许由 P43 Endpoint 组合调用；
- P42 Consumption 只允许由 P43 Endpoint 对外组合；
- P43 是 P40–P42 链唯一正式入口；
- P43 当前没有 Renderer、UI 或 Runtime 消费者。

Future Renderer 必须消费 P43 Endpoint 的 AVAILABLE 结果，不得直接调用 P41 或自行组装 P42 Input。

## 05｜严格禁止

P43 禁止：

- 调用 P39 Visual Mapping；
- 重算能力、复制或修改 Render Plan；
- 返回裸 P41 Renderer Output；
- Canvas、WebGL、Three.js、shader、材质、几何体或粒子实现；
- 动画时间线、图片、SVG、模型、纹理或资产生成；
- UI、Launch、Gravity、Crystal 页面接入；
- Runtime、Persistence、Storage、网络或 AI；
- 创建或修改 Life State、Memory、Growth、Archive、Journey、Crystal。

## 06｜施工范围

P43 只新增：

- `starBeastRenderPlanEndpoint`；
- 本协议与独立 endpoint gate；
- P41/P42 调用所有权校准；
- release gate 注册。

P43 不修改 P0–P42 类型结构、计算结果、Foundation Runtime、Visual Mapping、Render Plan Adapter、Consumption、Dynamics、Crystal、UI 或 Storage 行为。

## 07｜验收

1. 完整能力输入经 Endpoint 到达 P42 AVAILABLE；
2. 不完整能力输入经 Endpoint 保持 P41 与 P42 双层原因；
3. Endpoint 只把 P41 原始 Plan 引用交给 P42；
4. 外部调用者只能获得 P42 Consumption Result；
5. Endpoint 不调用 P39 Mapping，不实现 Renderer；
6. P43 gate、P42 gate、P41 gate、P40 gate、P39 gate、release、build 与 `git diff --check` 通过。
