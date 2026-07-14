# GUANYAO Original Self Architecture Protocol
# 观爻本我架构协议

版本：Phase 1 / P11

状态：ACTIVE FOUNDATION PROTOCOL

基础施工编号：`RC-ORIGINAL-SELF-FOUNDATION-P0`

当前边界校准：`RC-LAUNCH-STARBEAST-DERIVATION-HANDOFF-P11`

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

## 12｜Foundation 唯一合法生成路径

Original Self Foundation 的工程生成路径固定为：

```text
既有只读来源
↓
OriginalSelfFoundationSourceInput
↓
adaptOriginalSelfFoundationSource
↓
OriginalSelfFoundationResolverInput
↓
resolveOriginalSelfFoundation
↓
OriginalSelfFoundationResult
```

Foundation 内部唯一合法生成入口是：

```text
resolveOriginalSelfFoundationFromSources
```

该 Entry 只组合 Source Adapter 与 Resolver，不调用 Star Beast、Mother Code、Hexagram、Yao、Gravity 或 Crystal Engine，不推断 `JourneyState.currentPhase`，不写入 Storage，也不触发 UI 或 Runtime。

Foundation 内部职责严格分离：

- Source Adapter 只将既有来源投影为 Resolver Input；
- Adapter 只建立 `OriginalSelfState`；
- Validator 只验证 Foundation 语义和引用边界；
- Resolver 只处理 READY、NOT_READY 与验证结果；
- Entry 只按固定顺序组合 Source Adapter 与 Resolver。

任何层都不得绕过 Entry 直接调用 Foundation Adapter、Validator、Resolver 或 Source Adapter，也不得自行拼装 `OriginalSelfState`。Entry 产生的 `OriginalSelfFoundationResult` 只允许继续进入 Result Consumption，不直接交给 UI、Runtime 或其他外部消费者。

这条路径是 Foundation 的生成边界，不改变任何既有业务引擎的推导职责，也不代表页面或 Runtime 已经接入。

## 13｜Foundation Result Consumption

`OriginalSelfFoundationResult` 进入未来消费者之前，必须经过只读消费边界：

```text
OriginalSelfFoundationResult
↓
consumeOriginalSelfFoundationResult
↓
OriginalSelfFoundationConsumption
├─ AVAILABLE
└─ UNAVAILABLE
```

`AVAILABLE` 只暴露 Result 中已经存在的同一份 `OriginalSelfState` 引用，不重新建立状态，不复制 Journey，也不改变星兽、卦象、爻或 Crystal。

`UNAVAILABLE` 必须保留原始 `OriginalSelfFoundationNotReady` Result。`STAR_BEAST_INVALID_DATE`、`STAR_BEAST_CALENDAR_UNAVAILABLE`、`FOUNDATION_VALIDATION_FAILED` 以及对应的上游原因或 validation reasons 均不得被吞掉、改写或降级为无原因的 `null`。

Result Consumption 不调用 Entry、Source Adapter、Resolver、Validator、Foundation Adapter 或任何业务引擎；不生成 fallback Foundation，不推断阶段，不渲染 UI，不推进 Runtime，也不写入 Storage。

## 14｜Foundation Endpoint

Foundation 对未来外部消费者只开放一个只读 Endpoint：

```text
既有只读来源
↓
resolveOriginalSelfFoundationConsumption
↓
OriginalSelfFoundationConsumption
```

Endpoint 内部固定组合：

```text
resolveOriginalSelfFoundationFromSources
↓
OriginalSelfFoundationResult
↓
consumeOriginalSelfFoundationResult
```

Endpoint 不返回裸露的 READY / NOT_READY 顶层结果，只返回 AVAILABLE / UNAVAILABLE 消费语义。为保证原因不丢失，Consumption 内部仍保留原始 Foundation Result 引用。

未来外部消费者不得分别调用 Entry 或 Result Consumption。Endpoint 不调用 Star Beast、Mother Code、Hexagram、Yao、Gravity、Crystal Engine 或任何 Runtime，不推断 Journey 阶段，不读取或写入 Storage，也不创建 UI contract。

## 15｜Dynamics Original Self Bridge

Dynamics 只能通过只读 Bridge 调用 Foundation Endpoint：

```text
Dynamics 正式来源
↓
resolveDynamicsOriginalSelfFoundation
↓
resolveOriginalSelfFoundationConsumption
↓
OriginalSelfFoundationConsumption
```

Bridge 输入必须是既有正式类型：

- `StarbeastDerivationResult`；
- 显式 `OriginalSelfJourneyPhase`；
- `CurrentHexagramFormationResult | null`；
- `YaoTransmissionProfile | null`；
- `CrystalState | null`。

Bridge 只负责字段命名投影与 Endpoint 委托，不调用 Star Beast Engine、Hexagram Engine、Yao Runtime 或 Crystal Engine，不推断 Journey 阶段，也不创建任何新结果。

持久化快照中的 `fourSymbol` 不能代替完整 `StarbeastDerivationResult`；运行时 `StarbeastFeedback` 不能代替星兽推导结果；`currentCrystalEndState` 不能反向伪造 `CrystalState`。缺少正式来源时，必须保持未接入，而不是用近似字段补齐。

P9 只建立服务层 Bridge。Gravity 页面、Storage、Runtime 与视觉层仍未消费 Original Self Foundation。

## 16｜Dynamics Original Self Readiness

Dynamics 在进入 Bridge 前，必须先经过只读 Readiness：

```text
Dynamics 可选正式来源
↓
resolveDynamicsOriginalSelfFoundationReadiness
↓
NOT_READY + 缺口原因
或
READY_FOR_ORIGINAL_SELF_FOUNDATION
↓
resolveDynamicsOriginalSelfFoundation
```

Readiness 只检查正式来源是否满足当前显式 Journey 阶段，不执行任何推导：

- `StarbeastDerivationResult` 与显式 `OriginalSelfJourneyPhase` 在所有阶段都必须存在；
- `HEXAGRAM`、`YAO`、`CRYSTAL` 阶段必须存在正式 `CurrentHexagramFormationResult`；
- `YAO`、`CRYSTAL` 阶段必须存在正式 `YaoTransmissionProfile`；
- `CRYSTAL` 阶段必须存在正式 `CrystalState`。

未进入某一阶段时，该阶段之后的来源允许保持 `null`。Readiness 不得为了满足检查而提前创建 Hexagram、Yao 或 Crystal。

正式 `StarbeastDerivationResult` 即使表达 INVALID_DATE 或 CALENDAR_UNAVAILABLE，也代表来源已经接入；其业务不可用原因继续由 Foundation Endpoint 原样转换为 UNAVAILABLE，不得在 Readiness 层吞掉或改写。

P10 仍只建立服务层合同。Gravity 页面、Storage、Runtime 与视觉层不读取 Readiness 结果。

## 17｜Launch Starbeast Derivation Source Carrier

Launch 已有星兽推导必须先进入正式 Source Carrier，再供母码链读取：

```text
公历出生日期
↓
resolveLaunchStarbeastDerivationSource
↓
LaunchStarbeastDerivationSourceCarrier
↓
StarbeastDerivationResult
↓
Launch Origin Mother Adapter（仅 READY 时读取 fourSymbol）
```

Source Carrier 必须保留完整 `StarbeastDerivationResult`，不得提前降级成 `fourSymbol`、方位或星兽展示字段。INVALID_DATE 与 CALENDAR_UNAVAILABLE 也必须作为正式结果保留，由既有 Launch 母码边界维持原有失败行为。

Source Carrier 只接收公历年、月、日，不接收出生地点、出生时辰、视觉节点或 Mother Code。它不新增算法，只调用既有 `resolveStarbeastFromBirthDate`，并保持星兽推导与地点、时辰无关。

Launch Origin Mother Adapter 不再直接调用 Star Beast Engine，而是读取 Source Carrier。母码、成卦与卡面结果保持不变。

P11 不把 Source Carrier 写入 Storage，也不修改现有 `GeoChronoMotherFusionResult`、`DynamicsMotherHandoff`、Gravity 或 UI。它只保留正式来源边界，尚未完成 Dynamics 传递。

## 18｜验收

Foundation 当前阶段完成的唯一标准是：

1. 三个基础状态类型存在并从类型入口导出；
2. 最高语义链在类型与协议中一致；
3. Star Beast 的本我生命显化定义被锁定；
4. 现有 Hexagram、Yao 与 Crystal 类型只被引用，不被复制或重写；
5. Foundation 不依赖 UI、Storage、AI 或视觉实现；
6. foundation gate、release gate 与 build 通过。
7. Foundation 内部调用顺序唯一，外部消费者不能绕过 Entry 直接生成 `OriginalSelfState`。
8. Foundation Result 只能被只读转换为 AVAILABLE / UNAVAILABLE，任何 NOT_READY 原因都被完整保留。
9. 外部调用只能经过 Foundation Endpoint，并只获得 `OriginalSelfFoundationConsumption`。
10. Dynamics 只通过正式来源进入 Bridge，不以 `fourSymbol`、星兽反馈或最终展示状态伪造 Foundation 输入。
11. Dynamics 必须先按显式 Journey 阶段完成来源就绪检查，只有 READY 才能进入 Bridge。
12. Launch 星兽推导必须先成为完整 Source Carrier，母码链只能从 Carrier 读取 READY 结果。

满足以上条件，只代表架构地基完成，不代表任何产品页面已经接入 Original Self。
