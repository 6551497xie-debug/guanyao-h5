# GUANYAO Life Journey Stage Authority Declaration Endpoint Protocol
# 观爻生命旅程阶段权威声明组合入口协议

版本：Evolution Phase 1 / P36

状态：AUTHORITY DECLARATION ENDPOINT COMPOSITION

施工编号：`RC-LIFE-JOURNEY-STAGE-AUTHORITY-DECLARATION-ENDPOINT-P36`

## 00｜协议定位

P36 是 P34 Authority Declaration Resolver 与 P35 Declaration Result Consumption 的唯一组合入口。

固定调用为：

```text
Authority Declaration Endpoint Input
↓
P34 Authority Declaration Resolver
↓
P35 Declaration Result Consumption
↓
Authority Declaration Consumption
```

P36 只负责组合调用，不增加条件判断、业务状态或结果改写。

## 01｜输入与输出

Endpoint Input 直接复用 P34 `LifeJourneyStageAuthorityDeclarationResolverInput`，不得增加页面、Runtime、Storage 或 Stage Source 字段。

Endpoint Output 直接复用 P35 `LifeJourneyStageAuthorityDeclarationConsumption`：

```text
READY          → AVAILABLE / DECLARED
NOT_APPLICABLE → NOT_APPLICABLE / REVIEW_REJECTED
NOT_READY      → UNAVAILABLE
```

P36 不解释结果，不折叠 NOT_APPLICABLE，也不修改 Declaration、Command、Review 或 Input 引用。

## 02｜组合唯一性

调用所有权固定为：

- P34 Resolver 只由 P36 Endpoint 调用；
- P35 Result Consumption 只由 P36 Endpoint 调用；
- P36 Endpoint 函数当前没有下游业务调用者；
- P36 输出契约只作为 P37 Star Beast Memory Eligibility Input 的类型来源。

P37 不调用 Endpoint 函数，只接收由外部提供的既成 Consumption Result。任何后续 Readiness、Adapter 或 Stage Source 桥接都必须独立授权，不得绕过 Endpoint 分别调用 Resolver 或 Consumption。

## 03｜组合不增加判断

P36 不得包含：

- `if` 或 `switch` 分支；
- Authority 默认值或合法性判断；
- READY、NOT_APPLICABLE、NOT_READY 的重新映射；
- Declaration、Command 或 Evidence 的重新构造；
- 阶段推进、回退或自动推断。

所有决定继续分别属于 P34 Resolver 与 P35 Consumption。

## 04｜Endpoint 不等于 Stage Source

P36 输出仍然保持：

- `notStageSourceInput: true`；
- `noStageTransition: true`；
- `noAutomaticProgression: true`。

AVAILABLE / DECLARED 只表示正式声明已可被上层消费，不表示 `LifeJourneyStageSourceInput` 已形成，也不表示 Journey Stage 已推进。

## 05｜严格禁止

P36 不得：

- 生成或调用 Stage Source；
- 修改 Foundation Runtime；
- 接入 Star Beast Growth、Gravity、Dynamics、Crystal 或 Archive；
- 接入 Persistence、Storage、UI、视觉、网络或 AI；
- 修改 P0–P35 的语义类型和结果规则。

## 06｜施工范围

P36 只新增：

- `lifeJourneyStageAuthorityDeclarationEndpoint`；
- 本组合入口协议；
- 独立 endpoint gate 与 release gate 注册。

同时只校准 P21、P29、P34、P35 的合法调用拓扑，不修改它们的类型或业务语义。

## 07｜验收

1. Endpoint Input 精确复用 P34 Resolver Input；
2. Endpoint 只组合 P34 Resolver 与 P35 Consumption；
3. 三类结果与原始引用保持不变；
4. Endpoint 无条件分支、无 Stage Source、无阶段推进；
5. P21、P24–P35 gates、release、build 与 `git diff --check` 通过。
