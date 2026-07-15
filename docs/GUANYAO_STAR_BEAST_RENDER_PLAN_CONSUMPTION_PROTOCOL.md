# GUANYAO Star Beast Render Plan Consumption Protocol
# 观爻星兽语义渲染计划消费协议

版本：Evolution Phase 2 / P42

状态：RENDER PLAN CONSUMPTION BOUNDARY

施工编号：`RC-STAR-BEAST-RENDER-PLAN-CONSUMPTION-P42`

## 00｜协议定位

P42 只把 P41 Renderer Output 转换为 Future Renderer 可读取的稳定消费结果。

固定关系为：

```text
StarBeastRendererOutput
↓
Render Plan Reference Validation
↓
StarBeastRenderPlanConsumptionResult
```

Render Plan Consumption 不是 Renderer，不执行绘制、动画、资产生成或 UI 投影。

## 01｜输入边界

`StarBeastRenderPlanConsumptionInput` 只包含：

- P41 Renderer Output 原始引用；
- Render Plan Reference，允许在尚不可用时为 null。

P42 不调用 P41 Adapter，不重新进行能力校验，不重新创建 Render Plan，也不调用 P39 Visual Mapping。

## 02｜AVAILABLE

只有同时满足以下条件才能形成 AVAILABLE：

1. Renderer Output 状态为 `PLANNED`；
2. Render Plan Reference 存在；
3. Render Plan Reference 与 PLANNED Output 中的 Plan 为同一引用。

成功时形成不可变 `StarBeastRenderPlanConsumption`，只保留：

- 原始 Render Plan 引用；
- 原始 PLANNED Renderer Output 引用；
- 原始 Render Request 引用；
- `AVAILABLE_FOR_FUTURE_RENDERER` 消费状态。

Consumption 不复制 Plan 通道，不增加视觉参数或生命事实。

## 03｜UNAVAILABLE

以下状态固定返回 UNAVAILABLE：

- P41 Output 为 UNAVAILABLE → `RENDER_PLAN_OUTPUT_UNAVAILABLE`；
- Plan Reference 缺失 → `RENDER_PLAN_REFERENCE_REQUIRED`；
- Plan Reference 不是 Output 中的原始 Plan → `RENDER_PLAN_REFERENCE_MISMATCH`。

当 P41 Output 不可用时，P42 必须原样保留 P41 的 `sourceUnavailableReason`。UNAVAILABLE 不是渲染错误，只表示 Future Renderer 当前没有合法消费入口。

## 04｜调用所有权

- P39 Mapping 函数仍没有业务下游调用者；
- P41 是具体 Render Plan 的唯一构造边界；
- P42 是 P41 Renderer Output 的唯一正式消费边界；
- P42 Consumption Result 只允许由 P43 Render Plan Endpoint 对外提供；
- P42 当前没有 Renderer 业务消费者。

P43 只闭合 P41 / P42 调用链，不实现 Renderer。Future Renderer 必须消费 P43 Endpoint 的 AVAILABLE 结果，不得绕过 P43 直接调用 P41 或自行组装 P42 Input。

## 05｜严格禁止

P42 禁止：

- 调用 P41 Adapter 或 P39 Mapping；
- 修改、复制或重新生成 Render Plan；
- Canvas、WebGL、Three.js、shader、材质、几何体或粒子实现；
- 动画时间线、图片、SVG、模型、纹理或资产生成；
- UI、Launch、Gravity、Crystal 页面接入；
- Runtime、Persistence、Storage、网络或 AI；
- 创建或修改 Life State、Memory、Growth、Archive、Journey、Crystal。

## 06｜施工范围

P42 只新增：

- `starBeastRenderPlanConsumption` 类型；
- `starBeastRenderPlanConsumptionService`；
- 本协议与独立 consumption gate；
- P41 调用所有权校准；
- 类型出口与 release gate 注册。

P42 不修改 P0–P41 计算结果、Foundation Runtime、Visual Mapping、Render Plan Adapter、Dynamics、Crystal、UI 或 Storage 行为。

## 07｜验收

1. PLANNED 且引用一致时返回 AVAILABLE；
2. P41 UNAVAILABLE 原因被原样保留；
3. Plan Reference 缺失或错配时不形成 Consumption；
4. Consumption 只保存引用，不复制 Plan 通道；
5. Input、Renderer Output 与 Render Plan 均不被修改；
6. P42 不调用 P41 Adapter、P39 Mapping 或任何 Renderer；
7. P42 gate、P41 gate、P40 gate、P39 gate、release、build 与 `git diff --check` 通过。
