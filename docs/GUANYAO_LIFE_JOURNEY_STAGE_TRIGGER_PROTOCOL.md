# GUANYAO Life Journey Stage Trigger Protocol
# 观爻生命旅程阶段触发语义协议

版本：Evolution Phase 1 / P22

状态：SEMANTIC TRIGGER CONTRACT

施工编号：`RC-LIFE-JOURNEY-STAGE-TRIGGER-CONTRACT-P22`

## 00｜协议定位

P22 固定七类生命事件与七个 `LifeJourneyStage` 的语义归属。

Trigger 是生命事件证据，不是状态机命令。它只回答“这个事件属于哪一段生命叙事”，不能自行声明当前阶段、推进阶段或证明阶段已经完成。

固定关系为：

```text
Life Journey Event
↓ 语义分类
LifeJourneyStageTrigger
↓ 需要 P21 Authority 显式声明
LifeJourneyStageAuthorityDeclaration
```

P22 不新增 Trigger → Authority Adapter，也不接 P15 Source。

## 01｜七类正式触发语义

```text
LIFE_ORIGIN_ESTABLISHED
→ ORIGIN
→ 生命起点建立 / 降临

ORIGINAL_SELF_AWAKENED
→ AWAKENING
→ 本我觉察开启 / 觉醒

REALITY_EXPERIENCE_ENTERED
→ REALITY
→ 进入现实体验 / 入世

REALITY_PRESSURE_ENCOUNTERED
→ PRESSURE
→ 遭遇现实压力 / 现实引力

LIFE_DIRECTION_CHOICE_COMPLETED
→ CHOICE
→ 完成生命方向选择 / 爻变选择

LIFE_IMPRINT_CRYSTALLIZED
→ CRYSTAL
→ 形成生命印记 / 星辰印记

LIFE_IMPRINT_ARCHIVED
→ ARCHIVE
→ 沉淀生命年轮
```

每个 Trigger Code 只对应一个 `semanticStage`。修改映射或新增 Trigger 必须更新本协议与独立 gate。

## 02｜Trigger 不是阶段声明

`LifeJourneyStageTrigger` 必须携带：

- 固定 Trigger Code；
- 唯一 `semanticStage`；
- `semanticRole: LIFE_JOURNEY_STAGE_TRIGGER_EVIDENCE`；
- `explicit: true`；
- `requiresAuthorityDeclaration: true`；
- `noTransitionDecision: true`；
- `noAutomaticProgression: true`。

即使 Trigger 已存在，也不能直接形成 `LifeJourneyStageSourceInput`。只有 P21 的 `original_self_life_journey_orchestrator` 有权结合后续独立规则作出阶段声明。

## 03｜P21 Deferred 边界说明

P21 的 `triggerRulesDeferred: true` 表示 Authority 层自身不拥有、也不内嵌 Trigger 规则。

P22 以独立类型层承接事件词汇，但仍不定义阶段转换规则。因此 P21 Authority、P15 Source 和 P20 冻结链保持不变。

## 04｜本刀不定义 Transition

P22 明确不定义：

- `fromStage` 与 `toStage`；
- 七阶段是否必须顺序发生；
- 是否允许跳过、回退或循环；
- 一个 Trigger 是否足以完成当前阶段；
- 多个 Trigger 如何聚合；
- Trigger 的时间、次数、权重或持久化方式。

这些属于后续 Stage Transition / Evidence Protocol，不得在页面或 Runtime 中临时补造。

## 05｜无推断来源

P22 不从以下对象自动生成 Trigger：

- `OriginalSelfJourneyPhase`；
- Mother Code、Star Beast、fourSymbol；
- Gravity、Dynamics 或六维体验状态；
- Hexagram、Yao、Crystal、Archive readiness；
- 页面、路由、视觉状态；
- localStorage、sessionStorage 或其他 Persistence；
- AI 输出。

这些对象是否能够成为某类 Trigger 的证据，必须由后续独立 Evidence Protocol 审查。

## 06｜工程边界

P22 只新增：

- `LifeJourneyStageTriggerCode`；
- `LifeJourneyStageTrigger`；
- `LifeJourneyStageTriggerBoundary`；
- 本协议与独立 trigger gate；
- 类型出口与 release gate 注册。

P22 不修改：

- P0–P21 Foundation、Life Schema、Authority 与 Source；
- Adapter、Resolver、Endpoint；
- Mother Code、Star Beast、Hexagram、Gravity、Yao、Crystal；
- Dynamics、Persistence、Storage、UI、视觉或 AI。

## 07｜验收

1. 七个 Trigger Code 一一对应七个固定 Stage；
2. Trigger 明确是证据，不是阶段声明或 Transition；
3. 所有 Trigger 都必须经过 P21 Authority；
4. 不建立顺序、跳转、完成度或自动推进；
5. Trigger 类型没有 Service、Runtime、Persistence 或 UI 消费者；
6. P15、P20、P21 与 Original Self gates 回归通过；
7. trigger gate、release、build 与 `git diff --check` 通过。
