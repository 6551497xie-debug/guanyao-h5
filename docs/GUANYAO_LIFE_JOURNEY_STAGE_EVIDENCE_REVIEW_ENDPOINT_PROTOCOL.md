# GUANYAO Life Journey Stage Evidence Review Endpoint Protocol
# 观爻生命旅程阶段证据审查端点协议

版本：Evolution Phase 1 / P27

状态：REVIEW ENDPOINT COMPOSITION

施工编号：`RC-LIFE-JOURNEY-STAGE-EVIDENCE-REVIEW-ENDPOINT-P27`

## 00｜协议定位

P27 为 P25 Resolver 与 P26 Result Consumption 建立唯一组合端点。

固定链路为：

```text
LifeJourneyStageEvidenceReviewEndpointInput
→ resolveLifeJourneyStageEvidenceReview
→ consumeLifeJourneyStageEvidenceReviewResult
→ LifeJourneyStageEvidenceReviewConsumption
```

Endpoint Input 直接复用 Resolver Input，不增加默认值、隐式来源或第二套输入语义。

## 01｜输出语义

Endpoint 完整透传 P26 Consumption：

```text
ACCEPT  → AVAILABLE / ACCEPTED
REJECT  → AVAILABLE / REJECTED
无效输入 → UNAVAILABLE / original reason
```

REJECTED 是已经完成的有效审查结论，因此保持 AVAILABLE。Endpoint 不把它转成错误、NOT_READY、UNAVAILABLE、`null` 或异常。

## 02｜编排边界

Endpoint 只允许执行两步：

1. 把原始 Input 交给 P25 Resolver；
2. 把完整 Resolver Result 交给 P26 Consumption。

Endpoint 不得：

- 添加 `if`、`switch` 或 Review Status 分支；
- 修改 Candidate、Reviewer、Decision、Reason 或 Review；
- 跳过 Resolver 或 Consumption；
- 查询或验证 Evidence Source；
- 补默认 Reviewer、Decision 或 Rejection Reason。

## 03｜下游隔离

P27 不生成：

- `LifeJourneyStageAuthorityDeclaration`；
- `LifeJourneyStageSourceInput`；
- Life Journey Stage 推进结果。

P27 不接入 Foundation、Life Schema、Gravity、Dynamics、Crystal、Runtime、Persistence、Storage、UI 或 AI。

Endpoint 当前没有下游业务消费者；它只建立正式组合入口。

## 04｜拓扑治理

P27 将 Endpoint 精确登记为：

- P25 Resolver 的唯一组合消费者；
- P26 Consumption 的唯一组合消费者。

P24–P26 gate 只增加该 Endpoint 到合法引用集合，不放宽其他调用者。

## 05｜工程范围

P27 只新增：

- `lifeJourneyStageEvidenceReviewEndpoint`；
- 本协议与独立 endpoint gate；
- release gate 注册。

P27 不修改 P0–P26 的语义类型、Resolver、Consumption、Foundation、Life Schema、Authority、Trigger、Evidence、Source 或 Adapter 实现。

## 06｜验收

1. Endpoint Input 与 P25 Resolver Input 保持同一类型边界；
2. Endpoint 仅组合 Resolver 与 Consumption；
3. ACCEPT 输出 AVAILABLE / ACCEPTED；
4. REJECT 输出 AVAILABLE / REJECTED；
5. 无效输入输出 UNAVAILABLE，并保留原始 reason 与 input 引用；
6. Endpoint 不增加状态分支、默认值或业务推断；
7. Endpoint 没有 Runtime、Persistence、Storage 或 UI 消费者；
8. P15、P20–P26 与 Original Self gates 回归通过；
9. endpoint gate、release、build 与 `git diff --check` 通过。
