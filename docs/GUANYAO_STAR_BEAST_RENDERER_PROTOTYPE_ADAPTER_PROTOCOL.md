# RC-STAR-BEAST-RENDERER-PROTOTYPE-ADAPTER-P77

## PROTOTYPE ADAPTER

P77 建立隔离的 Star Beast Canvas 原型验证边界。它不是正式 Renderer，不选择正式技术后端，也不接入产品页面。

固定数据链：

```text
StarBeastVisualState
↓
StarBeastRendererInput
↓
P43 StarBeastRenderPlan Endpoint
↓
StarBeastRenderPlan
↓
Prototype Renderer Adapter
↓
StarbeastLab Canvas2D
```

## Adapter 输入边界

`adaptStarBeastRenderPlanToPrototype` 只接收一个不可变 `StarBeastRenderPlan` 引用。Adapter 不读取、导入或推导：

- Mother Code；
- Hexagram；
- Life Archetype；
- fourSymbol；
- User Profile；
- Star Beast Life State。

Adapter 不修改 Plan，也不回写 Visual State 或 Life State。

## 五层原型投影

P77 将 Plan 已有语义通道投影为 Canvas2D 可消费的表达参数：

1. `starCore`：星核亮度、半径与呼吸速率；
2. `starPattern`：星纹连线透明度、线重与复杂度；
3. `boundaryLight`：边界光透明度、光晕与流向；
4. `internalStardust`：内部星尘密度与漂移速率；
5. `crystalNodes`：Crystal 节点是否显现、数量与亮度。

这些值只是视觉表达参数，不是生命事实。附带视觉概念图只提供上述语义参考，不构成像素复刻、白虎身份推导或图片资产生产要求。

## 隔离范围

唯一允许的原型消费者是 `src/pages/StarbeastLab.tsx`，现有 `/starbeast-lab` 隔离路由不变。

P77 禁止接入：

- LaunchLab；
- Gravity；
- Dynamics；
- Crystal UI；
- Storage；
- 正式 Renderer Runtime。

P77 不引入 WebGL、Three.js、3D 模型、图片资产或正式渲染后端。Canvas2D 只消费 Adapter 的原型投影；业务主链结果与生命状态保持不变。
