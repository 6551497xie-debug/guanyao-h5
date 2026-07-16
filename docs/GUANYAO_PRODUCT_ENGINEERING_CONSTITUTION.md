# GUANYAO Product & Engineering Constitution V1.0

协议编号：`RC-GUANYAO-PRODUCT-ENGINEERING-CONSTITUTION-P0`

阶段：`GUANYAO 1.0 Product Stabilization Phase`

## 宪法地位

本宪法是 GUANYAO 后续世界观、产品、生命系统、引擎、体验、视觉、UI 与工程施工的最高约束。任何后续 brief、协议、实验或局部目标与本宪法冲突时，施工必须暂停并重新进行架构评审，不得以“先做效果”为理由绕过。

本宪法不重写既有业务，不替代已经稳定的 Life Genesis、Star Beast、MotherCode、Hexagram、Gravity、Choice / Persona Migration、Crystal 与 Archive 系统。它负责保护这些系统不被下游局部施工反向定义。

## 第一章：系统优先原则

最高原则：

> 先建立系统，再优化局部。

页面、视觉、动效、Asset 与 Renderer 只能表达已经成立的系统结果，不得反向改变世界观、生命模型或计算逻辑。

禁止：

```text
局部效果
↓
重新定义系统
```

当局部目标与稳定系统冲突时，应调整或停止局部方案，而不是修改上游系统使其迁就效果。

## 第二章：生命来源优先原则

任何生命资产进入设计或实现前，必须回答：“它从哪里来？”

正式顺序固定为：

```text
生命对象
↓
来源引擎
↓
显化表达
```

- Identity 必须来自正式生命来源；
- Manifestation 必须消费 Identity；
- Visual State 与 Renderer 只能继续向下表达；
- 禁止视觉创造身份；
- 禁止资产或 Renderer 反推来源引擎。

## 第三章：计算链与体验链分离

后台计算链：

```text
输入数据
↓
正式引擎
↓
生命结果
```

前台体验链：

```text
用户进入
↓
显化过程
↓
生命认知
```

两条链可以采用不同顺序：后台可以并行或先完成正式计算，前台可以按用户理解与心流逐步显化。但体验顺序不得成为新的计算依赖，不得修改正式输入、引擎规则或生命结果。

## 第四章：Prototype 治理原则

所有实验与资产必须明确标记为以下状态之一：

- `EXPERIMENT`：隔离实验，只验证假设；
- `CANDIDATE`：已通过部分资格检查，但尚未成为正式来源；
- `PRODUCTION`：经过正式授权、gate 与来源验证的生产对象。

`EXPERIMENT` 不得修改 Production，不得成为正式生命来源，不得反推系统。`CANDIDATE` 不得被 UI、Renderer 或 Runtime 当作 Production 消费。任何状态升级必须由独立协议、明确授权与独立 gate 完成，禁止因“效果不错”自动升级。

当前 P84–P87 保持 `FOUR_SYMBOL_VISUAL_EXPERIMENT`，不能作为 Personal Star Beast 的正式身份或 Renderer 来源。

## 第五章：视觉系统边界

视觉负责“如何显化”，视觉不负责“是什么”。

正式链固定为：

```text
Identity
↓
Manifestation
↓
Visual State
↓
Renderer
```

Renderer 不得决定身份、来源或生命属性。Visual Asset 不得包含新的生命计算规则。视觉层可以读取经过正式契约输出的上游引用，但不得调用身份来源引擎重新计算，不得修改上游生命状态。

## 第六章：核心生命系统职责边界

### 本命星宿

职责：生命种子。

回答：“这个生命从哪里开始显化。”

### 四象

职责：生命形态场。

回答：“这个生命以什么象显现。”

四象不是 Personal Star Beast 本身，也不直接生成动物模型。

### MotherCode

职责：生命原力。

回答：“这个生命携带什么力量。”

### LifeArchetype

职责：将 MotherCodeProfile 桥接为生命原力语义。它不是 Hexagram，不是人格标签，也不得由四象反推。

### Gravity

职责：现实引力体验。它显化生命进入现实压力后的六维体验，不重写生命来源。

### Choice

职责：人格迁移。主体通过选择形成变化，不由系统或视觉自动宣布。

### Crystal

职责：生命变化沉积。它表达经历与人格迁移之后留下的生命印记，不是初始卦象或初始身份。

## 第七章：工程施工五问

以后每一刀施工前必须回答：

1. 修改属于哪一层：世界观、生命模型、数据、体验、视觉还是工程？
2. 输入来源是什么？
3. 输出结果是什么？
4. 是否改变已有生命规则？
5. 是否需要重新架构评审？

如果无法明确回答输入来源、输出边界或是否改变生命规则，禁止施工。涉及跨层上行、身份来源、计算规则、Production 状态升级时，必须重新架构评审。

## 第八章：禁止越权修改

严格禁止：

```text
Renderer → 修改 Identity
Visual Asset → 修改 Life Model
UI 反馈 → 修改计算规则
Prototype 结果 → 自动升级 Production
```

下游可以提出观测、风险与需求，但只能形成评审输入，不能直接修改上游定义。

## 第九章：施工与提交纪律

- 先审查，再施工，再 gate，再提交；
- 一刀一提交，小范围施工；
- 保护已有未提交改动；
- 禁止 `git add .`、`git clean` 与 `git reset --hard`；
- 每刀只暂存白名单文件；
- Prototype、Preview 与实验资产必须保持隔离；
- gate 失败时不得以跳过检查的方式提交。

宪法自身的修改属于最高层变更，必须明确说明原因、影响范围并独立进行架构评审。
