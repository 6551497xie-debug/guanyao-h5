# GUANYAO Life Journey Stage Trigger Evidence Protocol
# 观爻生命旅程阶段触发证据协议

版本：Evolution Phase 1 / P23

状态：EVIDENCE CANDIDATE BOUNDARY

施工编号：`RC-LIFE-JOURNEY-STAGE-TRIGGER-EVIDENCE-P23`

## 00｜协议定位

P23 为 P22 `LifeJourneyStageTrigger` 增加正式来源与可追溯包装。

它只建立 Evidence Candidate，不判断证据是否成立，不接受证据，也不生成阶段声明。

固定关系为：

```text
Formal Life Journey Evidence Provider
↓ 提供来源引用
LifeJourneyStageTrigger
↓ 只读包装
LifeJourneyStageTriggerEvidenceCandidate
↓ 必须经过 P21 Authority Review
未来的 Authority Declaration
```

本刀不新增 Evidence → Authority Adapter，也不接 P15 Source。

## 01｜Evidence Source

`LifeJourneyStageTriggerEvidenceSource` 必须包含：

- `boundary: formal_life_journey_evidence_provider`；
- `sourceReference: string`。

`sourceReference` 只承担来源追溯，不是 Storage key、页面路由或阶段结果。P23 不解释引用内部结构，也不验证引用指向的业务对象。

在正式 Runtime Evidence Provider 独立施工前，不得把 Gravity、Choice、Crystal、Archive、页面状态或持久化记录直接写成这里的正式来源。

## 02｜Evidence Candidate

`LifeJourneyStageTriggerEvidenceCandidate` 必须保留：

- 完整 `LifeJourneyStageTrigger` 引用；
- 完整 `LifeJourneyStageTriggerEvidenceSource` 引用；
- `semanticRole: LIFE_JOURNEY_STAGE_TRIGGER_EVIDENCE_CANDIDATE`；
- `immutable: true`；
- `traceable: true`；
- `requiresAuthorityReview: true`；
- `notStageDeclaration: true`；
- `notAuthorityDecision: true`；
- `noAutomaticProgression: true`。

Candidate 表达“有一份带来源的事件证据等待审查”，不表达该证据已被接受。

## 03｜三种状态不得混同

```text
Trigger
= 事件属于哪一段生命语义

Evidence Candidate
= 这个事件声明来自哪一个正式来源

Authority Declaration
= 上位 Orchestrator 最终显式声明当前阶段
```

因此不得：

- 用 Trigger 直接替代 Evidence Candidate；
- 用 Candidate 直接替代 Authority Declaration；
- 因为 Candidate 存在就推进 Life Journey Stage；
- 在 Evidence 层判断阶段跳转或完成度。

## 04｜暂不建立 Evidence Acceptance

P23 不定义：

- 哪些 Runtime 对象是合法 Evidence Provider；
- `sourceReference` 如何生成或验证；
- Candidate 的接受、拒绝或冲突状态；
- 多份 Candidate 的排序、聚合与去重；
- Trigger 是否足以证明阶段完成；
- Authority Review 的 Resolver 或结果类型。

这些属于后续 Evidence Provider / Authority Review Protocol，必须独立施工。

## 05｜禁止推断与持久化

P23 不读取或写入：

- `OriginalSelfJourneyPhase`；
- Mother Code、Star Beast、fourSymbol；
- Gravity、Dynamics、六维体验；
- Hexagram、Yao、Crystal、Archive；
- 页面、路由或视觉状态；
- localStorage、sessionStorage 或其他 Persistence；
- AI 输出。

这些对象是否能成为正式 Evidence Provider，必须由各自独立 Adapter 与 gate 明确授权。

## 06｜工程边界

P23 只新增：

- `LifeJourneyStageTriggerEvidenceSource`；
- `LifeJourneyStageTriggerEvidenceCandidate`；
- `LifeJourneyStageTriggerEvidenceBoundary`；
- 本协议与独立 evidence gate；
- 类型出口与 release gate 注册。

P23 不修改：

- P0–P22 Foundation、Life Schema、Authority、Trigger 与 Source；
- Adapter、Resolver、Endpoint；
- Mother Code、Star Beast、Hexagram、Gravity、Yao、Crystal；
- Dynamics、Persistence、Storage、UI、视觉或 AI。

## 07｜验收

1. Evidence Candidate 必须同时保留正式来源引用和完整 Trigger；
2. Candidate 类型为只读，并明确 immutable、traceable；
3. Candidate 必须经过 Authority Review；
4. Candidate 不是阶段声明、Authority Decision 或自动推进命令；
5. Evidence 类型没有 Service、Runtime、Persistence 或 UI 消费者；
6. P15、P20、P21、P22 与 Original Self gates 回归通过；
7. evidence gate、release、build 与 `git diff --check` 通过。
