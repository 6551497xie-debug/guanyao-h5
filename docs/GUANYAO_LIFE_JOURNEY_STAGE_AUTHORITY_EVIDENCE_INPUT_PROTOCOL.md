# GUANYAO Life Journey Stage Authority Evidence Input Protocol
# 观爻生命旅程阶段权威证据输入协议

版本：Evolution Phase 1 / P30

状态：AUTHORITY EVIDENCE INPUT CONTRACT

施工编号：`RC-LIFE-JOURNEY-STAGE-AUTHORITY-EVIDENCE-INPUT-CONTRACT-P30`

## 00｜协议定位

P30 只定义 ACCEPTED Review 成为阶段权威候选输入时的最小类型契约。

固定语义关系为：

```text
LifeJourneyStageEvidenceAccepted
→ LifeJourneyStageAuthorityEvidenceInput
→ future explicit Authority Declaration
```

P30 只建立输入 Schema，不新增 Adapter、Resolver、Endpoint、Readiness 或 Runtime 调用。

## 01｜正式来源

Authority Evidence Input 的唯一合法来源是 `LifeJourneyStageEvidenceAccepted`。

输入必须保留一份原始 Accepted Review 引用：

```text
review
└─ candidate
   ├─ evidenceSource
   └─ trigger
      └─ semanticStage
```

Candidate、Evidence Source 与 Trigger 不得复制、重建或改写。上位权威只能通过原始 Review 引用读取它们。

`proposedStage` 的类型必须来自：

```text
review.candidate.trigger.semanticStage
```

它表达被接受证据所指向的候选阶段，不是已经声明的阶段。

## 02｜REJECTED 边界

`LifeJourneyStageEvidenceRejected` 不能形成 `LifeJourneyStageAuthorityEvidenceInput`。

REJECTED 仍是有效完成的审查结果，但其含义是该证据未被接受，因此不得进入 Authority Evidence Input。

这不是系统错误，也不改变 P28 中 REJECTED Review Outcome 仍为 READY 的语义。

## 03｜Authority 边界

Authority Evidence Input 必须指向 P21 唯一权威：

```text
original_self_life_journey_orchestrator
```

但 Authority Evidence Input 不是 `LifeJourneyStageAuthorityDeclaration`。

固定要求：

- `requiresExplicitAuthorityDeclaration: true`；
- `notAuthorityDeclaration: true`；
- `notStageSourceInput: true`；
- `noAutomaticProgression: true`；
- `noStageTransition: true`。

即使证据已经 ACCEPTED，阶段权威仍必须在后续独立边界中作出显式声明。

## 04｜工程边界

P30 不新增 Review → Authority Adapter。

P30 不得：

- 从 REJECTED Review 补造 Accepted Input；
- 自动生成 Authority Declaration；
- 自动生成 `LifeJourneyStageSourceInput`；
- 修改 P24–P29 冻结审查链；
- 连接 Foundation、Life Schema、Gravity、Dynamics、Crystal、Runtime、Persistence、Storage、UI 或 AI。

## 05｜P30 施工范围

P30 只新增：

- `LifeJourneyStageAuthorityEvidenceInput`；
- `LifeJourneyStageAuthorityEvidenceInputBoundary`；
- 本协议与独立 contract gate；
- 类型出口与 release gate 注册。

P30 不修改 P0–P29 的语义类型、Adapter、Resolver、Consumption、Endpoint、Readiness、Foundation、Life Schema、Authority、Stage Source 或 Runtime 实现。

## 06｜验收

1. Authority Evidence Input 只能由 Accepted Review 类型构成；
2. 原始 Review 保持单一引用，Candidate 与 Trigger 通过 Review 访问；
3. proposedStage 受 Accepted Trigger semanticStage 类型约束；
4. REJECTED 不进入 Authority Evidence Input；
5. Authority Evidence Input 明确不是 Authority Declaration 或 Stage Source Input；
6. 当前没有 Adapter、Resolver、Runtime、Persistence 或 UI 消费者；
7. P21、P24–P29 gates、release、build 与 `git diff --check` 通过。
