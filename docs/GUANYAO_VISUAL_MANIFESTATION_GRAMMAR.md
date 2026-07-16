# GUANYAO Visual Manifestation Grammar V1.0

协议编号：`RC-GUANYAO-VISUAL-MANIFESTATION-GRAMMAR-FREEZE-P92`

阶段：`GUANYAO Visual Architecture Stabilization`

## 语法地位

本语法是 `VISUAL` 层内部的最高显化规则。它建立在 `GUANYAO Product & Engineering Constitution V1.0` 与 `GUANYAO Life System Constitution V1.0` 的约束之下，并位于 Visual State、Asset、Renderer 与 UI 表达之前。

固定层级保持：

```text
WORLDVIEW
↓
LIFE SYSTEM
↓
ENGINE
↓
EXPERIENCE
↓
VISUAL
↓
UI
↓
IMPLEMENTATION
```

本语法不新增生命来源，不修改正式引擎，不创造生命身份。它只规定已经成立的生命身份如何进入视觉显化。

最高原则：

> 视觉不创造生命。视觉只显化生命。

正式视觉链固定为：

```text
Identity
↓
Manifestation Grammar
↓
Visual State
↓
Renderer
```

Renderer 只能消费 Visual State，不得计算 Identity；Visual Asset 只能承载显化规则，不得反推生命来源。

## 第一章：三层视觉语法

### Layer 1：Life Identity Grammar

生命身份语法回答：“为什么是它。”

正式输入固定为：

```text
本命星宿
+ 四象结果
+ LifeArchetypeProfile
↓
PersonalStarBeastIdentity
↓
Identity Expression Rules
```

三项来源职责保持独立：

- 本命星宿提供个人生命种子；
- 四象结果提供生命形态场；
- `LifeArchetypeProfile` 提供由 MotherCodeProfile 正式桥接而来的生命原力语义。

`Identity Expression Rules` 只描述正式身份中哪些来源可以被下游显化，不重新计算星宿、四象、MotherCode 或 LifeArchetype，不增加第四种身份来源。

禁止：

- Renderer 决定或补全身份；
- Visual Asset 反推身份；
- 四象替代本命星宿；
- MotherCode 生成兽形；
- LifeArchetypeProfile 由视觉层重新解释；
- Crystal 反向参与初始身份生成。

### Layer 2：Manifestation Grammar

生命显化语法回答：“它如何出现。”

#### Mansion Seed Expression

本命星宿负责：

- 核心星点；
- 初始结构；
- 生命骨架；
- 原始轨迹。

这些表达必须来自正式本命星宿结果引用。它们不是 28 个人格标签，不是 28 只宠物，也不是 Renderer 自选的星座图案。

#### Four Symbol Field Expression

四象不是动物模型，也不是 Personal Star Beast 本身。

四象负责：

- 空间形态；
- 动势；
- 边界；
- 气质场。

四象表达可以影响生命显化的方向感、聚合场、边界场与空间关系，但不得直接输出白虎、青龙、朱雀或玄武的独立动物资产，不得反推 MotherCode。

#### Life Force Expression

MotherCode / LifeArchetype 负责：

- 能量方向；
- 呼吸节奏；
- 聚合方式；
- 稳定程度；
- 变化倾向。

正式来源保持：

```text
MotherCodeProfile
↓
resolveLifeArchetypeProfileFromMotherCode
↓
LifeArchetypeProfile
↓
Life Force Expression
```

生命原力只能调制显化的力、节奏、状态与变化倾向，不能生成四象、动物形态或新的生命身份。

冻结：MotherCode 不生成兽形。

#### Crystal Imprint Expression

Crystal 负责：

- 经历留下的生命纹理；
- 变化后的光、星纹或印记；
- 已形成 Crystal 的存在表达。

Crystal 必须发生在 `Reality Pressure → Gravity → Choice → Crystal` 之后。它不是初始身份来源，不改变本命星宿、四象或 MotherCode，只为已经发生的生命变化增加印记表达。

### Layer 3：Visual Style Grammar

视觉风格语法回答：“它以什么感官语言被看见。”

允许调度：

- 色彩；
- 材质；
- 光影；
- 星尘；
- 声音；
- 镜头。

这些都是表达参数，不是生命事实。风格可以改变观看体验，但不能改变生命身份、生命来源、引擎结果或 Journey 事实。

视觉风格不得通过“效果更好”覆盖 Identity Expression Rules，不得让某个视觉参考自动升级为正式资产来源。

## 第二章：资产生成规则

所有未来 Star Beast Asset、Scene、Motion、Shader、音效与 Renderer 输入，在进入 `CANDIDATE` 前必须回答：

### 本命星宿提供什么？

必须说明它提供的生命种子、核心星点、初始结构、生命骨架或原始轨迹，以及对应的正式结果引用。

### 四象提供什么？

必须说明它提供的空间形态、动势、边界或气质场。不得以四象动物模型代替说明。

### MotherCode 提供什么？

必须说明其经 `LifeArchetypeProfile` 提供的能量方向、呼吸节奏、聚合方式、稳定程度或变化倾向。不得生成兽形。

### Crystal 提供什么？

必须说明它表达的既有生命印记，以及该印记的正式 Crystal 引用。没有 Crystal 时不得模拟成长、记忆或生命印记。

禁止单独生产以下对象作为 Personal Star Beast 正式资产：

- 白虎资产；
- 青龙资产；
- 朱雀资产；
- 玄武资产。

未来资产必须生产的是“个人星宿兽显化规则”，而不是“四象动物换皮规则”。资产可以包含结构、场、材质与表达模块，但最终组合只能由正式 Identity 向下驱动。

## 第三章：Personal Star Beast 定义

`Personal Star Beast` 不是：

- 四象动物；
- 神兽模型；
- 人格宠物；
- 星座角色；
- AI 随机生成角色；
- Renderer 视觉结果本身。

正式定义：

> 本命星宿生命种子，在四象生命形态场中，经由生命原力表达后形成的个人生命显化。

因此，Personal Star Beast 必须能够追溯到：

```text
Mansion Seed
+ Four Symbol Field
+ LifeArchetype Force
↓
PersonalStarBeastIdentity
↓
Personal Star Beast Manifestation
```

视觉结果可以随设备能力、视觉风格或 Journey 状态采用不同表达质量，但其正式身份与三源关系必须保持不变。

## 第四章：AI 生成边界

允许 AI 辅助生成或探索：

- 背景宇宙；
- 材质探索；
- 氛围；
- 光影；
- 风格参考；
- 分镜与概念帧。

必须由正式规则驱动：

- 本命星宿来源；
- 四象归属；
- MotherCode / LifeArchetype 表达；
- Crystal 变化。

AI 输出默认属于视觉探索，不得因画面完整或人工偏好自动成为 Identity、Life State、Production Asset 或正式用户结果。AI 不得替代正式 Engine，不得补造缺失生命事实。

## 第五章：Prototype 治理

P84–P87 状态继续冻结为：

`FOUR_SYMBOL_VISUAL_EXPERIMENT`

它们已经验证：

- 四象形态表达能力；
- 生命原力表达能力；
- Cosmic Consciousness 表达能力；
- Stellar Flesh 表达能力。

它们尚未通过：

`PERSONAL_STAR_BEAST_SOURCE_VALIDATION`

因此 P84–P87 禁止作为 Personal Star Beast 正式来源、Production Asset 或正式 Renderer 身份输入。其视觉代码与结果可以作为 Review / Evidence，但不能反向修改 P0、P1、Identity 或正式 Engine。

所有后续视觉实验继续遵循：

```text
EXPERIMENT
↓
CANDIDATE
↓
PRODUCTION
```

Preview 可见、视觉满意或技术可运行均不构成状态升级授权。

## 第六章：施工边界

后续任何视觉施工前必须回答：

1. 正式 Identity 输入引用是什么？
2. 本命星宿、四象、LifeArchetype、Crystal 分别贡献什么？
3. 输出属于 Grammar、Visual State、Asset、Renderer 还是 UI？
4. 是否新增或修改了生命来源？
5. 当前对象是 `EXPERIMENT`、`CANDIDATE` 还是 `PRODUCTION`？

若视觉目标要求 Renderer 计算身份、资产反推生命来源、四象直接成为动物资产、MotherCode 生成兽形或 Prototype 自动进入 Production，必须暂停施工并进行跨层架构评审。

本次冻结不授权 Renderer、WebGL、Canvas、UI、视觉资产、星兽建模或动效施工。下一阶段只能进入 Visual Technical Architecture Review，再决定具体技术路线与 Prototype 授权。
