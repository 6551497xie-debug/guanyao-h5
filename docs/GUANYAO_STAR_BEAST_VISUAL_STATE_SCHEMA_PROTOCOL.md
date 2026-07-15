# GUANYAO Star Beast Visual State Schema Protocol
# 观爻星兽视觉状态架构协议

版本：Evolution Phase 2 / P39

状态：STAR BEAST VISUAL STATE SCHEMA

施工编号：`RC-STAR-BEAST-VISUAL-STATE-SCHEMA-P39`

## 00｜协议定位

Star Beast 不是图片。Star Beast 是生命状态显化。

固定关系为：

```text
StarBeastLifeState
↓
StarBeastVisualState
↓
Future Renderer
```

Visual State 不是生命状态。它是生命状态的表达映射，只向未来 Renderer 提供稳定视觉参数，不执行渲染、动画或资产生成。

## 01｜视觉输入边界

`StarBeastVisualMappingInput` 只允许：

- `StarBeastLifeStateReference`；
- 可选的未来 Star Beast Memory Reference；
- 可选的 Crystal Reference。

当前没有正式 StarBeast Life Runtime State，因此 P39 建立只读最小引用投影。Life State Reference 只携带：

- Identity Reference；
- Life Archetype Reference；
- Experience Layer Journey State；
- 引用标识。

它不导入或暴露既有包含四象字段的 `StarBeastState`，也不接受用户标签、人格结果、卦名文本或 UI 文案。

## 02｜Visual State

`StarBeastVisualState` 固定表达：

- `identity`：星兽身份引用；
- `archetype`：生命原型引用；
- `journeyState`：当前体验阶段；
- `manifestationDepth`：显化深度；
- `energyFlowState`：能量流动表达；
- `lightState`：生命之光表达；
- `starPatternState`：星纹表达；
- `crystalPresenceState`：Crystal 引用存在状态；
- `presenceState`：在场表达；
- `expression`：纯视觉表达参数。

这些字段是 Renderer 可消费的语义参数，不是对用户生命事实的新判断。

## 03｜Visual Expression

`StarBeastVisualExpression` 只包含：

- intensity；
- particleDensity；
- lightFlowDirection；
- breathingRhythm；
- constellationComplexity。

必须保持：

- `expressionParametersOnly: true`；
- `notLifeFacts: true`。

数值只用于表达层，不得回写或反推 Life State、人格、卦象、Memory 或 Growth。

## 04｜四阶段映射

P39 使用固定映射表，不读取 UI、Runtime 进度或用户标签。

### Origin

基础显影：静置能量、种子之光、基础星纹、缓慢呼吸。

### Pressure

能量受限：受限显化、光流收束、压缩星纹、屏息节奏。

### Awareness

光流恢复：显化浮现、能量恢复、星纹重连、呼吸恢复。

### Crystal

新增生命纹理：显化成印、能量整合、结晶之光、生命纹理星纹。

四阶段映射只改变 Visual State 与 Visual Expression，不改变 Life State。

## 05｜Crystal 与 Memory 预留

Crystal Reference 只决定 `crystalPresenceState`：

- 引用存在 → PRESENT；
- Crystal 阶段但引用缺失 → REFERENCE_PENDING；
- 其他阶段未引用 → NOT_REFERENCED。

Memory 尚未正式创建。Memory Reference 仅作为可选引用被原样保留：

- 不改变任何 Visual Projection；
- 不模拟成长；
- 不创建 Memory；
- 不创建或修改 Growth。

## 06｜纯映射边界

`mapStarBeastLifeStateToVisualState` 只执行：

```text
Life State Reference
→ fixed phase projection
→ immutable Visual State
```

它不得：

- 修改输入引用；
- 修改 StarBeastState、Life Archetype、Journey 或 Crystal；
- 生成 Memory、Growth、Archive 或业务结论；
- 读取用户标签、人格结果、卦名文本或 UI 文案。

## 07｜严格禁止

P39 禁止：

- Canvas、WebGL、Three.js；
- SVG、图片或其他视觉资产生成；
- Renderer、动画时间线或交互实现；
- UI、Launch、Gravity、Crystal 页面接入；
- Runtime、Persistence、Storage、网络或 AI；
- 修改现有 Dynamics Visual State。

## 08｜调用所有权

- P39 Mapping 函数当前没有下游调用者；
- P39 `StarBeastVisualState` 输出类型只允许作为 P40 Renderer Input 来源；
- P40 只建立 Renderer Contract，不实现 Planner 或 Renderer；
- P41 只建立 Render Plan Adapter，不实现 Renderer；
- Renderer 不得反向修改 Visual Mapping Input 或 Life State。

## 09｜施工范围

P39 只新增：

- `starBeastVisualState` Schema；
- `starBeastVisualStateMapping`；
- 本协议与独立 visual state schema gate；
- 类型出口与 release gate 注册。

P39 不修改 P0–P38 Foundation、Authority、Memory Candidate、Dynamics、Crystal、UI 或 Storage 链路。

## 10｜验收

1. Origin / Pressure / Awareness / Crystal 均有固定视觉映射；
2. Visual Expression 明确只是表达参数；
3. Mapping 不读取四象、用户标签、人格结果或卦名文本；
4. Memory Reference 不触发成长或视觉变化；
5. Mapping 不修改 Life State，不创建 Memory，不执行渲染；
6. visual state schema gate、release、build 与 `git diff --check` 通过。

## 11｜P77 Isolated Prototype Extension

P77 只授权 `src/pages/StarbeastLab.tsx` 调用 P39 Mapping，以固定原型引用形成 Visual State 并验证后续 RenderPlan 驱动。P39 仍不接业务资料、产品 UI、Runtime 或 Storage，Visual State 仍只是生命状态的表达映射。
