# GUANYAO Star Beast Render Plan Adapter Protocol
# 观爻星兽语义渲染计划适配协议

版本：Evolution Phase 2 / P41

状态：SEMANTIC RENDER PLAN ADAPTER

施工编号：`RC-STAR-BEAST-RENDER-PLAN-ADAPTER-P41`

## 00｜协议定位

P41 只把 P40 `StarBeastRendererInput` 适配为不可变的语义 `StarBeastRenderPlan`。

固定关系为：

```text
StarBeastRendererInput
↓
Renderer Capability Validation
↓
StarBeastRenderPlan
```

P41 不是 Renderer，不生成画面、像素、绘制命令、动画或视觉资产。

## 01｜输入与来源

Adapter 只读取：

- P40 Renderer Input；
- Input 中的 P39 Visual State 原始引用；
- Input 中的 Renderer Capability Declaration。

P41 不调用 P39 `mapStarBeastLifeStateToVisualState`，不重新生成 Visual State，也不读取 Life State、四象、用户标签、人格结果、卦名文本、UI 文案、Runtime 或 Storage。

## 02｜能力校验

形成 Render Plan 前必须同时声明六类语义能力：

- MANIFESTATION_LAYER；
- ENERGY_FLOW_CHANNEL；
- LIGHT_FLOW_CHANNEL；
- BREATHING_CHANNEL；
- STAR_FIELD_CHANNEL；
- CRYSTAL_PRESENCE_CHANNEL。

声明顺序不影响判断。任何一项缺失，输出固定为：

- `status: UNAVAILABLE`；
- `reason: RENDERER_CAPABILITY_UNAVAILABLE`；
- 原样保留 Renderer Input；
- `noRenderPlan: true`。

UNAVAILABLE 不是渲染失败，只表示当前能力声明不足以形成完整语义计划。

## 03｜语义 Render Plan

六项能力完整时输出 `PLANNED`。具体 `StarBeastRenderPlan` 只投影 Visual State 已有参数，固定形成五个通道：

- manifestation；
- energy；
- light；
- star field；
- crystal。

Plan 必须保留同一个 `sourceVisualStateReference`，不得复制、补写或推断生命事实。

Plan、channels 与每个 channel 均为不可变对象，并继续保持：

- `rendererNeutral: true`；
- `semanticChannelsOnly: true`；
- `noPixelOutput: true`；
- `noDrawCommands: true`；
- `noAssetGeneration: true`。

## 04｜调用所有权

- P39 Mapping 函数仍没有业务下游调用者；
- P40 定义 Renderer Input、Output 与 Render Plan 类型；
- P41 是具体 `StarBeastRenderPlan` 的唯一正式构造边界；
- P41 当前没有 Renderer 业务消费者。

Future Renderer 只能在后续独立边界中消费 P41 的稳定结果，不得绕过 P41 直接解释 P39 Visual State。

## 05｜严格禁止

P41 禁止：

- 调用 P39 Mapping 或重新判断 Life State；
- Canvas、WebGL、Three.js、shader、材质、几何体或粒子实现；
- 动画时间线、图片、SVG、模型、纹理或资产生成；
- UI、Launch、Gravity、Crystal 页面接入；
- Runtime、Persistence、Storage、网络或 AI；
- 创建或修改 Memory、Growth、Archive、Journey、Crystal；
- 修改 P39 Visual State 或 P40 Renderer Input。

## 06｜施工范围

P41 只新增：

- `starBeastRenderPlanAdapter`；
- 本协议与独立 render plan adapter gate；
- P39/P40 调用所有权校准；
- release gate 注册。

P41 不修改 P0–P40 类型结构、Foundation Runtime、Visual Mapping、Dynamics、Crystal、UI 或 Storage 行为。

## 07｜验收

1. 六项能力完整时生成 PLANNED Render Plan；
2. 能力顺序不影响结果；
3. 缺失任一能力时返回 UNAVAILABLE，且不生成 Plan；
4. 五个通道只投影同一 Visual State 的已有参数；
5. Output、Plan 与所有 channel 均不可变，输入不被修改；
6. Adapter 不调用 P39 Mapping，不包含 Renderer 实现；
7. P41 gate、P40 gate、P39 gate、release、build 与 `git diff --check` 通过。
