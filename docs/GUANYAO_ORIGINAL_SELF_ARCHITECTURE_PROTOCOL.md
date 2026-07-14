# GUANYAO Original Self Architecture Protocol
# 观爻本我架构协议

版本：Phase 1 / P0

状态：ACTIVE FOUNDATION PROTOCOL

施工编号：`RC-ORIGINAL-SELF-FOUNDATION-P0`

## 00｜协议定位

本协议建立 GUANYAO Evolution Phase 1 的 Original Self Foundation 架构骨架。

它只定义上位数据语义边界，不是新的推导引擎、状态机、页面流程、存储模型或视觉系统。

本刀新增三项基础状态：

- `OriginalSelfState`
- `StarBeastState`
- `JourneyState`

现有 Mother Code、Hexagram、Gravity 与 Crystal Engine 保持原有职责、计算结果和运行边界。

## 01｜最高语义链

Original Self Foundation 锁定以下语义链：

```text
Original Self
↓
Star Beast
↓
Life Archetype
↓
Hexagram
↓
Yao
↓
Crystal
```

这是一条“生命主体如何经历变化并留下印记”的语义链，不是一条替代现有工程因果链的新计算管线。

## 02｜Original Self

Original Self 是观爻中的生命主体根节点。

它不是人格答案、理想自我、系统评分或最终身份。它表达的是：用户在任何标签、判断和外部标准之前，已经作为一个能够感受、经历、选择和创造的生命存在。

`OriginalSelfState` 只负责聚合：

- 本我生命的星兽显化；
- 生命经历当前变化的旅程引用；
- 不得侵入既有引擎的基础 guardrails。

它不生成 Mother Code，不生成卦象，不选择爻，不形成 Crystal，也不写入 Storage。

## 03｜Star Beast

正式定义：

> Star Beast = 本我生命显化。

星兽不是角色、宠物、人格标签。

星兽也不是外部守护者、AI 生成角色、心理分类、命运判词或用户需要照顾的游戏对象。

`StarBeastState` 表达 Original Self 被用户感知时形成的生命形态。它引用既有四象兽结果，不改变出生日期到二十八宿、四象归属的现有推导。

星兽与用户不是两个主体。星兽是“我”以生命形态被看见。

## 04｜Life Archetype

Life Archetype 是星兽显化所携带的生命原型语义。

它与 Star Beast 不是两个角色：

- Star Beast 回答“本我如何显化为可感知的生命形态”；
- Life Archetype 回答“这一生命形态携带怎样的稳定来处与原始姿态”。

生命原型有稳定来处，但不是终身人格定论。`LifeArchetypeState.nonFinalIdentity` 必须保持为 `true`。

## 05｜Hexagram

Hexagram 表达生命原型与当前现实力量相遇时形成的变化结构。

Foundation 只引用既有 `CurrentHexagramProfile`，不计算或修改它。

既有关系保持不变：

```text
Mother Code → 下卦
压力种子分类 → 上卦
下卦 + 上卦 → currentHexagramProfile
```

Mother Code 继续表达原始生命倾向；它没有被 Original Self 取代，也不被星兽重新推导。

## 06｜Yao

Yao 表达变化结构在具体生命界面中的位置与运动。

Foundation 只引用既有 `YaoTransmissionProfile`，不新增 384 爻系统，不改变六爻、六维、触发、切点或 Runtime 推进规则。

爻不是命运判词。它是生命变化在身体、情绪、思想、行动、记忆与动机中的局部轨迹。

## 07｜Crystal

Crystal 表达这一次生命体验留下的星辰印记。

Foundation 只引用既有 `CrystalState`，不改变以下链路：

```text
ChangeExperience Domain Runtime
→ PersonaMigrationImpact
→ CrystalState
→ HexagramCrystalEngineInput
→ HexagramCrystalResult
→ HexagramCrystalResultConsumption
→ currentCrystalEndState
```

Crystal 不是 Original Self 的最终定型。它只记录“这一局”经过体验、觉察与选择之后留下的变化印记。

## 08｜JourneyState 边界

`JourneyState` 是只读语义投影，按固定路径引用现有状态：

```text
ORIGINAL_SELF
→ STAR_BEAST
→ LIFE_ARCHETYPE
→ HEXAGRAM
→ YAO
→ CRYSTAL
```

它可以表达当前走到哪个语义阶段，但不得据此推进 Runtime、制造 readiness、自动确认 Choice 或触发 Crystal。

其中：

- `lifeArchetype` 引用 `LifeArchetypeState`；
- `hexagram` 引用 `CurrentHexagramProfile | null`；
- `yao` 引用 `YaoTransmissionProfile | null`；
- `crystal` 引用 `CrystalState | null`。

`JourneyState.lifeArchetype` 与 `OriginalSelfState.starBeast.lifeArchetype` 必须表达同一生命原型语义，不得在 Journey 中重新推导另一份星兽身份。

`null` 只表示这一阶段尚无既有状态可以引用，不表示用户失败、缺失或价值不足。

## 09｜现有系统保留

本协议不替换、不重命名、不迁移以下系统：

- Mother Code 及其农历年月日、地支时数、卦以八除链路；
- Star Beast 既有出生日期、二十八宿、四象归属链路；
- 64 卦矩阵与 `currentHexagramProfile`；
- Yao Transmission 与六维 Runtime；
- Gravity 现实引力体验；
- ChangeExperience 与 PersonaMigrationImpact；
- Crystal Engine、Result、Consumption 与 currentCrystalEndState。

Original Self Foundation 位于这些系统之上，提供统一语义，不反向夺取它们的工程职责。

## 10｜P0 禁止事项

本刀不得修改：

- UI 与页面；
- 64 卦数据和映射；
- Storage schema、key、读写或兼容逻辑；
- AI prompt、模型调用或生成逻辑；
- 视觉组件、动效、星兽资产或卡面；
- Mother Code、Hexagram、Gravity、Crystal Engine 的业务实现。

P0 不创建：

- 新引擎；
- 新 Runtime；
- 新持久化状态；
- 新路由；
- 新页面；
- 新用户结果。

## 11｜Foundation Guardrails

`OriginalSelfFoundationGuardrails` 必须锁定：

- `noMotherCodeMutation: true`
- `noHexagramGeneration: true`
- `noCrystalEngineMutation: true`
- `noStorageWrite: true`
- `noUIContract: true`
- `noAIDependency: true`

这些字段是架构边界，不是运行时功能开关。

## 12｜验收

Foundation P0 完成的唯一标准是：

1. 三个基础状态类型存在并从类型入口导出；
2. 最高语义链在类型与协议中一致；
3. Star Beast 的本我生命显化定义被锁定；
4. 现有 Hexagram、Yao 与 Crystal 类型只被引用，不被复制或重写；
5. Foundation 不依赖 UI、Storage、AI 或视觉实现；
6. foundation gate、release gate 与 build 通过。

满足以上条件，只代表架构地基完成，不代表任何产品页面已经接入 Original Self。
