# GUANYAO Star Beast Asset Architecture Protocol

协议编号：`RC-STAR-BEAST-ASSET-ARCHITECTURE-P77`

## 定义

Star Beast Asset Definition 是生命原型与未来渲染计划之间的语义视觉资产层。

```text
StarBeastLifeState
↓
StarBeastVisualState
↓
StarBeastAssetDefinition
↓
RenderPlan
↓
Renderer
```

它不是星座、图标、宠物、动物模型或游戏角色。星兽是生命原力在宇宙中的显化形态，是宇宙生命体的视觉语义定义。

## 六层视觉结构

1. `CORE_BONE`：骨，生命结构骨架，不是动物线稿。
2. `STAR_CORE`：星核，本我生命源点。
3. `STAR_PATTERN`：星纹，生命轨迹。
4. `LIGHT_BOUNDARY`：边界光，生命存在感。
5. `COSMIC_CONSCIOUSNESS`：星尘意识，表达呼吸、流动与意识。
6. `CRYSTAL_IMPRINT`：生命印记，表达经历留下的变化。

三层核心表达固定为：骨承载生命结构；魂由星核与意识显化；忆由 Crystal 与生命纹理留下。

## 概念图使用规则

当前概念图仅作为 Visual Reference，用于指导粒子语言、星核语言、星纹语言与空间层次。它不是像素复刻目标，不是直接资产，也不授权图片、模型或动画生产。

## 来源边界

```text
LifeArchetypeProfile
↓
StarBeastAssetArchitectureMapping
↓
StarBeastAssetDefinition
```

Asset Definition 的唯一语义来源是 `LifeArchetypeProfile`。不得读取或经过 fourSymbol，不得从现有 Canvas 轮廓、星兽图片或 Renderer 反推生命原型。

## 乾星兽 Asset Definition V1

乾定义当前只建立未来 Renderer 可消费的语义资产参数：

- 骨架方向：向上、向外展开。
- 星核位置：主星核位于中轴偏上，升腾星核位于上方。
- 星纹逻辑：由中心向外围上升，轨迹连续。
- 光流方向：径向向上。
- Crystal 位置：围绕主星核下方的生命印记轨道。

这不是完整渲染，也不是乾星兽最终造型。其余七生命原型在正式定义建立前返回 `NOT_AVAILABLE`，不得用乾定义代替。

## 工程边界

Asset Architecture 不生成图片、模型或动画，不创建或修改 Renderer，不修改 Life State、Visual State、RenderPlan、Storage 或 UI。当前 Renderer 只具备未来消费该定义的类型边界，本刀不进行链路接入。
