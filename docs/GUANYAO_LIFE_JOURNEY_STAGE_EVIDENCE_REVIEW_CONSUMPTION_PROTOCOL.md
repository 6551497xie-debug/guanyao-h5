# GUANYAO Life Journey Stage Evidence Review Consumption Protocol
# 观爻生命旅程阶段证据审查消费协议

版本：Evolution Phase 1 / P26

状态：REVIEW RESULT CONSUMPTION

施工编号：`RC-LIFE-JOURNEY-STAGE-EVIDENCE-REVIEW-CONSUMPTION-P26`

## 00｜协议定位

P26 为 P25 `LifeJourneyStageEvidenceReviewResolverResult` 建立单一消费边界。

固定关系为：

```text
Resolver READY / Review ACCEPTED
→ Consumption AVAILABLE / disposition ACCEPTED

Resolver READY / Review REJECTED
→ Consumption AVAILABLE / disposition REJECTED

Resolver NOT_READY
→ Consumption UNAVAILABLE + original reason
```

REJECTED 是一项已经完成的有效审查结论，不是系统错误，也不是 UNAVAILABLE。

## 01｜AVAILABLE

只要 Resolver Result 为 READY，Consumption 就返回 AVAILABLE。

`LifeJourneyStageEvidenceReviewAvailable` 必须保留：

- 原始 Resolver Result 引用；
- 原始 Review 引用；
- `disposition: ACCEPTED | REJECTED`；
- `source: life_journey_stage_evidence_review_consumption`。

Consumption 不得复制或改写 Candidate、Reviewer、Reason、Trigger 或 Evidence Source。

### ACCEPTED

ACCEPTED Review 保持：

```text
AVAILABLE / ACCEPTED
```

它仍不是 Authority Declaration，也不能直接生成 Stage Source。

### REJECTED

REJECTED Review 保持：

```text
AVAILABLE / REJECTED
```

拒绝原因继续保留在原始 Review 中。Consumption 不把 REJECTED 改写为 UNAVAILABLE、NOT_READY、`null` 或异常。

## 02｜UNAVAILABLE

只有 Resolver Result 为 NOT_READY 时，Consumption 才返回 UNAVAILABLE。

`LifeJourneyStageEvidenceReviewUnavailable` 必须保留：

- 原始 NOT_READY Result 引用；
- 原始 Resolver Input 引用；
- 原始 NOT_READY reason。

Consumption 不补默认 Candidate、Reviewer、Decision 或 Rejection Reason，也不重新执行 Resolver。

## 03｜消费层职责

Consumption 只做结果状态翻译：

```text
READY     → AVAILABLE
NOT_READY → UNAVAILABLE
```

它不根据 `review.status` 决定可用性，不参与证据审查，不判断业务真伪。

## 04｜严格禁止

P26 不得：

- 调用 `resolveLifeJourneyStageEvidenceReview`；
- 重新判断 Candidate、Reviewer、Decision 或 Reason；
- 查询或验证 Evidence Source；
- 把 REJECTED 当成错误；
- 生成 `LifeJourneyStageAuthorityDeclaration`；
- 生成 `LifeJourneyStageSourceInput`；
- 推进 Life Journey Stage；
- 读写 Runtime、Persistence、Storage、UI 或 AI。

## 05｜工程边界

P26 只新增：

- `lifeJourneyStageEvidenceReviewResultConsumption`；
- 本协议与独立 consumption gate；
- release gate 注册。

同时，P24 gate 仅将 P26 Consumption 精确登记为合法 Review 消费者，不放宽其他消费者。

P26 不修改 P0–P25 类型、Resolver、Foundation、Life Schema、Authority、Trigger、Evidence、Source、Adapter 或 Endpoint。

## 06｜验收

1. READY / ACCEPTED 形成冻结的 AVAILABLE / ACCEPTED；
2. READY / REJECTED 形成冻结的 AVAILABLE / REJECTED；
3. REJECTED 不被降级为错误或 UNAVAILABLE；
4. NOT_READY 形成 UNAVAILABLE，并保留 Result、Input 与 reason 原始引用；
5. Consumption 不调用 Resolver，不生成 Declaration 或 Stage Source；
6. Consumption 当前没有 Runtime、Persistence 或 UI 消费者；
7. P15、P20–P25 与 Original Self gates 回归通过；
8. consumption gate、release、build 与 `git diff --check` 通过。
