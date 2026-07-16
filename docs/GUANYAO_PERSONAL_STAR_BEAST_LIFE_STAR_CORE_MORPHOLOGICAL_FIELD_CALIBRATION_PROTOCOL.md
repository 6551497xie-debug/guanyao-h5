# GUANYAO Personal Star Beast Life Star Core & Morphological Field Calibration V1.0

状态：`ISOLATED_WEBGL_PROTOTYPE_ONLY`

## 目的

P102 在 P101 的 Life Presence Projection 之下，校准两个可感知关系：生命星核如何存在，以及形态场如何组织生命结构。它不改变 Identity、Scene Model、RenderPlan 或正式 Runtime。

## 数据边界

```text
PersonalStarBeastRenderPlan
↓
PersonalStarBeastLifePresenceProjection
↓
PersonalStarBeastLifeStarCoreProjection
↓
Isolated WebGL Scene
```

Life Star Core Projection 只消费 Life Presence Projection。它不读取本命星宿、四象、MotherCode、LifeArchetype、Engine 或用户资料，不复制生命事实。

## Life Star Core

### Core Presence

Life Star Core 的 Core Presence 是生命组织的中心关系，不是独立能量点。

### Surface Presence

星核由内部层、表面微变化与半透明大气层共同构成。它不是纯白圆点，也不是月球纹理或星球贴图。

### Core Influence

星核通过结构响应、光流到达和节点呼吸耦合影响周围骨架。核心是生命组织的中心，不是一个与结构分离的能量节点。

### Slow Temporal Rhythm

星核采用缓慢呼吸与低幅度表面变化。禁止闪烁、爆炸与脉冲式特效。

## Morphological Field

形态场通过通用的空间参数影响显化：

- `spatialContraction`：空间收束或扩张；
- `postureBias`：结构姿态与弯曲倾向；
- `nodeDistributionBias`：节点在主脊上的分布倾向；
- `flowDirection` 与 `enclosure`：光流方向与包裹关系。

这些参数不命名、不生成任何动物轮廓。不同正式身份必须在同一 Renderer 下形成不同的 Core 关系、Skeleton 组织和 Field 行为，而不能只改变颜色。

## 保持的边界

- Renderer 仍只消费 `RenderPlan → LifePresenceProjection` 产生的表达参数；
- P102 只增加隔离原型投影契约，不接入 Production、UI、Storage、Gravity、Dynamics 或 Crystal 页面；
- 自动 gate 验证来源、确定性、结构差异与隔离性；第一眼是否进入“生命星核”仍由人工视觉验收决定。
