# GUANYAO Life Journey Stage Authority Evidence Input Adapter Protocol
# 观爻生命旅程阶段权威证据输入适配协议

版本：Evolution Phase 1 / P31

状态：AUTHORITY EVIDENCE INPUT PROJECTION

施工编号：`RC-LIFE-JOURNEY-STAGE-AUTHORITY-EVIDENCE-INPUT-ADAPTER-P31`

## 00｜协议定位

P31 是 P29 冻结审查链的第一个正式出口，也是 P30 Authority Evidence Input Contract 的唯一构造边界。

固定链路为：

```text
Review Readiness Input
→ P28 Review Outcome Readiness
→ ACCEPTED / REJECTED / NOT_READY
→ Authority Evidence Input Adapter Result
```

P31 只做结果投影，不生成 Authority Declaration 或 Stage Source。

## 01｜AVAILABLE

只有 P28 返回 READY 且原始 Review 为 ACCEPTED 时，Adapter 才返回 AVAILABLE。

Authority Evidence Input 必须逐项来自原始 Review：

- `authority` ← `review.reviewer`；
- `review` ← 原始 Accepted Review 引用；
- `proposedStage` ← `review.candidate.trigger.semanticStage`。

Candidate、Trigger 与 Evidence Source 不得复制、重建或修改。

AVAILABLE 仍然不是 `LifeJourneyStageAuthorityDeclaration`，并保持 `requiresExplicitAuthorityDeclaration: true`。

## 02｜NOT_APPLICABLE

P28 READY / REJECTED 必须形成：

```text
NOT_APPLICABLE / REVIEW_REJECTED
```

NOT_APPLICABLE 表示审查已经完成，但证据没有资格进入 Authority Evidence Input。它不是系统错误，也不得被改写为 NOT_READY。

Adapter 必须保留原始 Rejected Review 引用与原始 rejection reason。

## 03｜UNAVAILABLE

P28 NOT_READY 必须形成 UNAVAILABLE。

UNAVAILABLE 必须保留：

- 原始 Readiness Result 引用；
- 原始 Readiness Input 引用；
- 原始 NOT_READY reason。

Adapter 不补 Candidate、Reviewer、Decision 或 Rejection Reason。

## 04｜严格禁止

P31 不得：

- 绕过 P28 直接调用 Resolver、Consumption 或 Endpoint；
- 把 REJECTED Review 补造成 Accepted Input；
- 修改 Review、Candidate、Trigger 或 Evidence Source；
- 生成 `LifeJourneyStageAuthorityDeclaration`；
- 生成 `LifeJourneyStageSourceInput`；
- 推进或回退 Life Journey Stage；
- 接入 Foundation、Life Schema、Gravity、Dynamics、Crystal、Runtime、Persistence、Storage、UI 或 AI。

## 05｜调用所有权

正式调用所有权更新为：

```text
Authority Evidence Input Adapter
└─ Review Outcome Readiness
   └─ Review Endpoint
      ├─ Resolver
      └─ Result Consumption
```

- P28 Readiness 只由 P31 Adapter 直接调用；
- P30 Authority Evidence Input 只由 P31 Adapter 构造；
- P31 Adapter 当前没有下游业务消费者。

## 06｜P31 施工范围

P31 只新增：

- `lifeJourneyStageAuthorityEvidenceInputAdapter`；
- 本协议与独立 adapter gate；
- release gate 注册。

同时只校准 P24、P28–P30 的合法拓扑 gate 与 P29 活跃冻结协议，不修改既有语义实现。

P31 不修改 Mother Code、Star Beast、Hexagram、Yao、Crystal、Foundation、Life Schema、Stage Source、Storage、UI 或 AI。

## 07｜验收

1. READY / ACCEPTED 形成冻结的 AVAILABLE 与 P30 Input；
2. READY / REJECTED 形成 NOT_APPLICABLE，并保留拒绝原因；
3. NOT_READY 形成 UNAVAILABLE，并保留原始原因与引用；
4. Adapter 只调用 P28 Readiness；
5. Adapter 不生成 Authority Declaration 或 Stage Source；
6. Adapter 当前没有 Runtime、Persistence、Storage 或 UI 消费者；
7. P21、P24–P30 gates、release、build 与 `git diff --check` 通过。
