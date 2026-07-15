# GUANYAO Life Journey Stage Evidence Review Protocol
# 观爻生命旅程阶段证据审查协议

版本：Evolution Phase 1 / P24

状态：AUTHORITY REVIEW CONTRACT

施工编号：`RC-LIFE-JOURNEY-STAGE-EVIDENCE-REVIEW-CONTRACT-P24`

## 00｜协议定位

P24 为 P23 `LifeJourneyStageTriggerEvidenceCandidate` 建立 Authority Review 结果边界。

它只回答：P21 Authority 是否接受这份 Candidate 作为阶段声明的候选依据。

固定关系为：

```text
Evidence Candidate
↓ P21 Authority Review
├─ ACCEPTED
└─ REJECTED + explicit reason

Review Result
≠ Authority Declaration
≠ LifeJourneyStageSourceInput
≠ Stage Progression
```

P24 不新增 Review Resolver，不生成阶段声明，也不接 P15 Source。

## 01｜唯一 Reviewer

Reviewer 类型固定为：

```text
LifeJourneyStageAuthority
= original_self_life_journey_orchestrator
```

页面、Gravity、Dynamics、Foundation、Storage、AI 或任何 Evidence Provider 都没有接受或拒绝 Candidate 的权限。

Review 必须完整保留同一份 `LifeJourneyStageTriggerEvidenceCandidate` 引用，不得复制后改写 Trigger、semanticStage 或 sourceReference。

## 02｜ACCEPTED

`LifeJourneyStageEvidenceAccepted` 必须包含：

- `status: ACCEPTED`；
- P21 `reviewer`；
- 完整 `candidate`；
- `acceptedAsEvidence: true`；
- `notStageDeclaration: true`；
- `noAutomaticProgression: true`。

ACCEPTED 只表示 Candidate 可以作为未来 Authority Declaration 的依据。它不等于当前阶段已改变，也不能直接形成 `LifeJourneyStageSourceInput`。

## 03｜REJECTED

`LifeJourneyStageEvidenceRejected` 必须包含：

- `status: REJECTED`；
- P21 `reviewer`；
- 完整 `candidate`；
- `acceptedAsEvidence: false`；
- 明确 `reason`；
- `notStageDeclaration: true`；
- `noAutomaticProgression: true`。

正式拒绝原因仅包含：

- `EVIDENCE_SOURCE_UNVERIFIED`：正式来源无法确认；
- `TRIGGER_SEMANTIC_MISMATCH`：来源证据与 Trigger 语义不一致；
- `AUTHORITY_CONTEXT_INSUFFICIENT`：Authority 上下文不足，不能接受。

REJECTED 不得降级为无原因的 `null` 或布尔值。

## 04｜与 P23 的边界

P23 的 `noEvidenceAcceptance: true` 表示 Evidence Candidate 层自身不能接受证据。

P24 以独立 Review Contract 承担接受或拒绝语义，但仍不实现 Resolver。因此 P23 Candidate、P22 Trigger、P21 Authority、P15 Source 与 P20 冻结链均保持不变。

## 05｜本刀不建立 Review Runtime

P24 不定义：

- Candidate 如何进入 Reviewer；
- 来源引用如何查询或验证；
- 三种拒绝原因的自动判定算法；
- 多份 Candidate 的排序、聚合或冲突处理；
- ACCEPTED 如何转为 Authority Declaration；
- 阶段跳转、回退、循环或完成度；
- Review 的持久化、UI 或 AI 交互。

这些必须在后续 Resolver、Consumption 与 Adapter 中逐刀建立。

## 06｜工程边界

P24 只新增：

- `LifeJourneyStageEvidenceRejectionReason`；
- `LifeJourneyStageEvidenceAccepted`；
- `LifeJourneyStageEvidenceRejected`；
- `LifeJourneyStageEvidenceReview`；
- `LifeJourneyStageEvidenceReviewBoundary`；
- 本协议与独立 review gate；
- 类型出口与 release gate 注册。

P24 不修改：

- P0–P23 Foundation、Life Schema、Authority、Trigger、Evidence 与 Source；
- Adapter、Resolver、Endpoint；
- Mother Code、Star Beast、Hexagram、Gravity、Yao、Crystal；
- Dynamics、Persistence、Storage、UI、视觉或 AI。

## 07｜验收

1. Review 只允许 ACCEPTED 或 REJECTED；
2. Reviewer 必须是 P21 Authority；
3. 两类结果都完整保留 Candidate；
4. REJECTED 必须保留三类明确原因之一；
5. ACCEPTED 仍不是阶段声明、Stage Source 或自动推进；
6. Review 类型没有 Resolver、Runtime、Persistence 或 UI 消费者；
7. P15、P20–P23 与 Original Self gates 回归通过；
8. review gate、release、build 与 `git diff --check` 通过。
