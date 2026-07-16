# GUANYAO Personal Star Beast Life Presence Projection Protocol V1.0

状态：`ISOLATED_WEBGL_PROTOTYPE_ONLY`

## 目的

P101 校准的是 RenderPlan 到隔离 WebGL 场景之间的投影关系。它不重新计算生命身份，也不改变 Scene Model、RenderPlan 或正式 Runtime。

投影回答的是：

> 已经确定的视觉语义，如何组织成一个能够被感知为“生命在场”的结构。

## 冻结数据链

```text
PersonalStarBeastIdentityReference
↓
Manifestation Grammar
↓
PersonalStarBeastSceneModel
↓
PersonalStarBeastRenderPlan
↓
PersonalStarBeastLifePresenceProjection
↓
Isolated WebGL Scene
```

Projection 只消费 `PersonalStarBeastRenderPlan`。它不得读取本命星宿、四象、MotherCode、LifeArchetype、用户资料或任何 Engine 结果。

## 三个生命存在层

### Core Presence：生命核心

核心不是一个孤立的发光球，而是结构的聚合中心。它通过影响半径、呼吸幅度、光线到达和聚合强度，联动周围骨架与光场。呼吸是缓慢的存在变化，不是闪烁特效。

### Stellar Skeleton：生命骨架

骨架不再使用闭合多边形星图。它由一条具有方向和弯曲的主脊，以及从主脊生长出的分支和节点组成，表达主次、层级、方向与生长关系。它不是动物轮廓，也不是星座连线。

### Morphological Field：形态场

形态场不指定动物。它以扩张、收束、包裹或稳定等参数影响骨架的空间尺度、弯曲、边界与流向，使不同正式身份产生不同的生命组织方式，而不仅是不同颜色。

## 投影边界

- `renderPlanOnly: true`
- `rendererParametersOnly: true`
- `identityBlind: true`
- `noLifeFactCopy: true`
- `noAnimalGeometry: true`

Renderer 仍只消费投影后的表达参数。P101 不新增 Renderer 技术，不接入 Production、UI、Storage、Gravity、Dynamics 或 Crystal 页面。

## A/B 第一眼验收

继续使用 P96 两个正式身份样本与同一套 Adapter、Grammar、Renderer。验收不以颜色差异为通过条件，必须能观察到：

1. 两个案例的 Core 聚合关系不同；
2. 两个案例的 Skeleton 主脊、分支或层级不同；
3. 两个案例的 Morphological Field 行为不同；
4. 画面不形成动物轮廓、科幻 HUD 或爆炸粒子。

P101 的自动 gate 只验证数据边界与确定性；“第一眼是否被生命存在击中”仍由人工视觉验收决定。
