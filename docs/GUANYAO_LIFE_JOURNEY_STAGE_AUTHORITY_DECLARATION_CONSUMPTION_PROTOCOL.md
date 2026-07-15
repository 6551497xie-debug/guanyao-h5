# GUANYAO Life Journey Stage Authority Declaration Consumption Protocol
# 观爻生命旅程阶段权威声明消费协议

版本：Evolution Phase 1 / P35

状态：AUTHORITY DECLARATION RESULT CONSUMPTION

施工编号：`RC-LIFE-JOURNEY-STAGE-AUTHORITY-DECLARATION-CONSUMPTION-P35`

## 00｜协议定位

P35 是 P34 Authority Declaration Resolver Result 的唯一正式消费边界。

固定输入与输出为：

```text
P34 READY          → P35 AVAILABLE / DECLARED
P34 NOT_APPLICABLE → P35 NOT_APPLICABLE / REVIEW_REJECTED
P34 NOT_READY      → P35 UNAVAILABLE
```

P35 只稳定化 Resolver Result 的消费语义，不重新执行 Resolver，不生成 Stage Source，不推进 Journey Stage。

## 01｜AVAILABLE

P34 READY 表示主体显式声明意愿与正式权威均已成立，P35 返回：

```text
AVAILABLE / DECLARED
```

消费结果必须原样保留：

- P34 Resolver Result；
- `LifeJourneyStageAuthorityDeclaration`；
- P33 Explicit Declaration Command。

AVAILABLE 只表示正式声明可供下一层消费，不表示声明已经转换成 `LifeJourneyStageSourceInput`。

## 02｜NOT_APPLICABLE

P34 NOT_APPLICABLE 来自上游 Authority Review 的显式 REJECT 结论。P35 必须保持：

```text
NOT_APPLICABLE / REVIEW_REJECTED
```

它是一项已经完成的有效审查终止结果，不是系统错误，也不得被折叠成 UNAVAILABLE。原始 reason、rejection reason 与 Resolver Result 引用必须保留。

## 03｜UNAVAILABLE

P34 NOT_READY 表示声明前提尚未满足，P35 返回 UNAVAILABLE，并保留：

- 原始 NOT_READY reason；
- 原始 Resolver input；
- 原始 Resolver Result。

P35 不补默认 Authority、不补主体决定，也不修复任何上游输入。

## 04｜纯消费边界

P35 只接收已经形成的 P34 Resolver Result：

- 不调用 `resolveLifeJourneyStageAuthorityDeclaration`；
- 不调用 P33 Command；
- 不重新审查 Evidence；
- 不改变 Declaration、Command、Review 或 Input；
- 所有消费结果均为只读冻结对象。

## 05｜声明消费不等于阶段推进

三类结果都必须保持：

- `notStageSourceInput: true`；
- `noStageTransition: true`；
- `noAutomaticProgression: true`。

P35 不生成 Stage Source，不推进或回退 Journey Stage，不改变 Foundation Runtime。

## 06｜严格禁止

P35 不得：

- 生成 `LifeJourneyStageSourceInput`；
- 调用 Stage Source Resolver；
- 接入 Star Beast Growth、Gravity、Dynamics、Crystal 或 Archive；
- 接入 Persistence、Storage、UI、视觉或 AI；
- 修改 P0–P34 Foundation 与 Life Schema 链路。

换言之，P35 不修改 P0–P34 Foundation 与 Life Schema 链路，只增加结果消费语义。

## 07｜调用所有权

正式调用方向更新为：

```text
Authority Declaration Result Consumption
└─ Authority Declaration Resolver Result
```

- P34 Resolver 继续是 P21 Declaration 的唯一构造边界；
- P35 Consumption 是 P34 Resolver Result 的唯一正式消费边界；
- P35 当前没有下游业务消费者；
- 后续若组合 Resolver 与 Consumption，必须建立独立 Endpoint，不得在 P35 内反向调用 Resolver。

## 08｜验收

1. READY 映射为 AVAILABLE / DECLARED，并保持 Declaration 与 Command 原始引用；
2. NOT_APPLICABLE 保持 NOT_APPLICABLE / REVIEW_REJECTED，且明确不是系统错误；
3. NOT_READY 映射为 UNAVAILABLE，并保持 reason 与 input 原始引用；
4. P35 不调用 P34 Resolver，不生成 Stage Source，不推进阶段；
5. P21、P24–P34 gates、release、build 与 `git diff --check` 通过。
