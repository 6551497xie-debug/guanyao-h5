# GUANYAO Star Beast Renderer Contract Protocol
# 观爻星兽渲染器契约协议

版本：Evolution Phase 2 / P40

状态：FUTURE RENDERER CONTRACT

施工编号：`RC-STAR-BEAST-RENDERER-CONTRACT-P40`

## 00｜协议定位

P40 只定义 Future Renderer 的输入、输出与能力边界。

固定关系为：

```text
StarBeastVisualState
↓
StarBeastRendererInput
↓
StarBeastRenderPlan
↓
Future Renderer Implementation
```

P40 不是 Renderer 实现，不生成画面，不提供绘制命令。

## 01｜Renderer Input

`StarBeastRendererInput` 只包含：

- Render Request Reference；
- P39 `StarBeastVisualState` 原始引用；
- Renderer Capability Declaration。

Renderer Input 不接受 Life State、用户标签、人格结果、卦名文本、四象字段、UI 文案、Storage 或 Runtime 状态。

Visual State 是 Future Renderer 唯一合法的生命表达输入。Renderer 不得绕过 P39 直接读取 Original Self、StarBeastState、Life Archetype、Memory、Crystal Engine 或 Journey Runtime。

## 02｜Renderer Capabilities

P40 只声明六类语义能力：

- MANIFESTATION_LAYER；
- ENERGY_FLOW_CHANNEL；
- LIGHT_FLOW_CHANNEL；
- BREATHING_CHANNEL；
- STAR_FIELD_CHANNEL；
- CRYSTAL_PRESENCE_CHANNEL。

Capability Declaration 表示未来实现可以理解哪些 Visual State 通道，不表示已经存在 Canvas、WebGL、Three.js、动画系统或视觉资产。

Capability 不得反向生成 Life State，不得推断 Memory 或 Growth。

## 03｜Render Plan

`StarBeastRenderPlan` 是 Renderer-neutral 的语义计划，固定拆分为：

- manifestation channel；
- energy channel；
- light channel；
- star field channel；
- crystal channel。

每个 channel 只引用或投影 P39 Visual State 已有表达参数，不增加生命事实与业务判断。

Render Plan 必须明确：

- `rendererNeutral: true`；
- `semanticChannelsOnly: true`；
- `noPixelOutput: true`；
- `noDrawCommands: true`；
- `noAssetGeneration: true`。

## 04｜Renderer Output

Renderer Output 只定义：

- PLANNED：未来 Planner 已形成合法 Render Plan；
- UNAVAILABLE：Visual State 或 Renderer Capability 尚不足。

P40 只定义输出契约，不实现 PLANNED / UNAVAILABLE Resolver，不判断具体设备或渲染环境。

## 05｜职责隔离

P39 负责：

```text
Life State Reference → Visual State
```

P40 负责定义：

```text
Visual State → Renderer Input → Render Plan Contract
```

P41 Render Plan Adapter 负责把 Renderer Input 组装为 Render Plan。Future Renderer Implementation 才负责解释 Render Plan。

Renderer、Planner 与 Render Plan 都不得反向修改 P39 Visual State 或 Life State。

## 06｜严格禁止

P40 禁止：

- 新增 Renderer、Planner、Adapter 或 Resolver 函数；
- Canvas、WebGL、Three.js 实现；
- shader、材质、几何体、粒子系统或动画时间线；
- SVG、图片、模型、纹理或其他资产；
- UI、Launch、Gravity、Crystal 页面接入；
- Runtime、Persistence、Storage、网络或 AI；
- 修改 Dynamics Visual State；
- 创建 Memory、Growth 或 Archive。

## 07｜调用所有权

- P39 Mapping 函数当前仍没有下游调用者；
- P39 Visual State 输出类型只允许作为 P40 Renderer Input 来源；
- P40 Renderer Input / Output Contract 只由 P41 Render Plan Adapter 实现；
- P41 是具体 `StarBeastRenderPlan` 的唯一正式构造边界；
- P41 当前没有 Renderer 业务消费者。

## 08｜施工范围

P40 只新增：

- `starBeastRendererContract` 类型；
- 本协议与独立 renderer contract gate；
- 类型出口与 release gate 注册；
- P39 输出类型调用拓扑校准。

P40 不修改 P0–P39 Foundation、Authority、Memory Candidate、Visual Mapping、Dynamics、Crystal、UI 或 Storage 行为。

## 09｜验收

1. Renderer Input 只读取 P39 Visual State 与能力声明；
2. Render Plan 只有五个 Renderer-neutral 语义通道；
3. Renderer Output 只定义 PLANNED / UNAVAILABLE；
4. Contract 不包含函数、绘制命令、像素输出、资产或动画实现；
5. 不读取四象、标签、人格结果或卦名文本；
6. renderer contract gate、P39 gate、release、build 与 `git diff --check` 通过。
