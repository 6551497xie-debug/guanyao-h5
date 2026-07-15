# GUANYAO Life Journey Stage Evidence Review Resolver Protocol
# 观爻生命旅程阶段证据审查解析协议

版本：Evolution Phase 1 / P25

状态：EXPLICIT AUTHORITY DECISION RESOLVER

施工编号：`RC-LIFE-JOURNEY-STAGE-EVIDENCE-REVIEW-RESOLVER-P25`

## 00｜协议定位

P25 将 P21 Authority 的显式审查决定转换为 P24 `LifeJourneyStageEvidenceReview`。

固定关系为：

```text
Evidence Candidate
+ P21 Authority
+ Explicit Decision
↓
LifeJourneyStageEvidenceReviewResolver
├─ ACCEPT → READY / ACCEPTED
├─ REJECT + reason → READY / REJECTED
└─ 输入不完整或非法 → NOT_READY + explicit reason
```

Resolver 只负责只读成形，不查询 Evidence Provider，不判断证据的业务真伪，也不生成阶段声明。

## 01｜Resolver Input

`LifeJourneyStageEvidenceReviewResolverInput` 包含：

- `candidate`：P23 Evidence Candidate 或 `null`；
- `reviewer`：P21 Authority 或 `null`；
- `decision`：`ACCEPT`、`REJECT` 或 `null`；
- `rejectionReason`：REJECT 时显式提供。

唯一合法 reviewer 为：

```text
original_self_life_journey_orchestrator
```

页面、Runtime、Evidence Provider 或 AI 不能冒充 reviewer。

## 02｜ACCEPT

当 Candidate、Reviewer 与 `ACCEPT` 均合法时，Resolver 返回：

```text
READY
└─ review.status = ACCEPTED
```

结果必须：

- 保留同一份 Input；
- 保留同一份 Candidate 引用；
- `acceptedAsEvidence: true`；
- `notStageDeclaration: true`；
- `noAutomaticProgression: true`；
- 冻结 Review 与 Resolver Result。

Resolver 不读取 Candidate 的 sourceReference，也不自动验证 Evidence Source。

## 03｜REJECT

当 Decision 为 `REJECT` 时，必须提供 P24 三类正式原因之一：

- `EVIDENCE_SOURCE_UNVERIFIED`；
- `TRIGGER_SEMANTIC_MISMATCH`；
- `AUTHORITY_CONTEXT_INSUFFICIENT`。

合法输入返回：

```text
READY
└─ review.status = REJECTED
   └─ reason preserved
```

缺少原因不得降级为 ACCEPTED、无原因布尔值或 `null`。

## 04｜NOT_READY

正式 NOT_READY 原因固定为：

- `EVIDENCE_CANDIDATE_MISSING`；
- `AUTHORITY_REVIEWER_INVALID`；
- `AUTHORITY_DECISION_INVALID`；
- `REJECTION_REASON_MISSING`；
- `REJECTION_REASON_INVALID`。

NOT_READY 必须保留同一份 Input，不补默认 Candidate、Reviewer、Decision 或 Reason。

## 05｜与 P24 的边界

P24 的 `noRuntimeReviewResolver: true` 表示 Review Contract 类型层自身不实现 Resolver。

P25 以独立服务层实现显式决定的只读成形，并成为 P24 Review Contract 当前唯一合法消费者。P23 Candidate、P22 Trigger、P21 Authority、P15 Source 与 P20 冻结链保持不变。

## 06｜严格禁止

P25 不得：

- 查询或验证 sourceReference；
- 从 Gravity、Dynamics、Foundation、Crystal 或页面推断 Decision；
- 自动选择拒绝原因；
- 修改 Candidate、Trigger 或 Evidence Source；
- 生成 `LifeJourneyStageAuthorityDeclaration`；
- 生成 `LifeJourneyStageSourceInput`；
- 推进、回退或完成 Life Journey Stage；
- 读写 Persistence、Storage、UI 或 AI。

## 07｜工程边界

P25 只新增：

- `lifeJourneyStageEvidenceReviewResolver`；
- 本协议与独立 resolver gate；
- P24 gate 的唯一合法消费点校准；
- release gate 注册。

P25 不修改 P0–P24 类型、Foundation、Life Schema、Authority、Trigger、Evidence、Source、Adapter 或 Endpoint。

## 08｜验收

1. ACCEPT 形成冻结的 ACCEPTED Review；
2. 三类正式拒绝原因分别形成冻结的 REJECTED Review；
3. Review 与 Result 保留 Input 和 Candidate 原始引用；
4. 缺少 Candidate、非法 Reviewer、非法 Decision、缺失或非法拒绝原因保持 NOT_READY；
5. 不验证来源，不生成 Declaration 或 Stage Source；
6. Resolver 当前没有 Runtime、Persistence 或 UI 消费者；
7. P15、P20–P24 与 Original Self gates 回归通过；
8. resolver gate、release、build 与 `git diff --check` 通过。
