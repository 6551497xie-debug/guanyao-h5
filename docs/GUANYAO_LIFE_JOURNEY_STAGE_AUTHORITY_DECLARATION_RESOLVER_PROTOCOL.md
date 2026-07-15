# GUANYAO Life Journey Stage Authority Declaration Resolver Protocol
# 观爻生命旅程阶段权威声明解析协议

版本：Evolution Phase 1 / P34

状态：EXPLICIT AUTHORITY DECLARATION RESOLUTION

施工编号：`RC-LIFE-JOURNEY-STAGE-AUTHORITY-DECLARATION-RESOLVER-P34`

## 00｜协议定位

P34 是 P21 `LifeJourneyStageAuthorityDeclaration` 的唯一正式构造边界。

固定链路为：

```text
P33 AVAILABLE Explicit Declaration Command
+ original_self_life_journey_orchestrator
→ P21 LifeJourneyStageAuthorityDeclaration
```

P34 只把主体已确认的声明意愿转成正式阶段声明。它不生成 Stage Source，不推进 Journey Stage。

## 01｜双重显式边界

Declaration 必须同时满足：

1. P33 Command 已证明 `life_subject + DECLARE`；
2. Resolver 收到唯一正式权威 `original_self_life_journey_orchestrator`。

主体确认不能替代正式权威；正式权威也不能绕过主体确认自行宣布生命阶段。

## 02｜READY

只有 P33 AVAILABLE 且 Authority 与 Command 中的 Authority Evidence Input 完全一致时，P34 才返回：

```text
READY / EXPLICIT_AUTHORITY_DECLARATION_CREATED
```

Declaration 字段固定为：

- `authority` ← 显式 Resolver Authority；
- `lifeJourneyStage` ← `command.targetStage`；
- `sourceBoundary` ← `upper_schema`；
- `semanticRole` ← `EXPLICIT_LIFE_JOURNEY_STAGE_DECLARATION`；
- `explicit` ← `true`。

Resolver 必须保留 P33 Command Result 与 Command 原始引用，不得修改 Command、Evidence Input 或 Review。

## 03｜Authority 拒绝条件

缺少 Authority 时返回：

```text
NOT_READY / DECLARATION_AUTHORITY_REQUIRED
```

Authority 与 Command 证据权威不一致时返回：

```text
NOT_READY / DECLARATION_AUTHORITY_INVALID
```

Resolver 不得补默认 Authority，也不得把页面、AI、Runtime、Star Beast 或主体自身改写为正式声明权威。

## 04｜上游非可用结果

P33 NOT_APPLICABLE：

- 不生成 Declaration；
- 保持 NOT_APPLICABLE；
- 保留原始 rejection reason。

P33 NOT_READY：

- 不生成 Declaration；
- 保持 NOT_READY；
- 保留原始 reason 与 input 引用。

## 05｜声明不等于阶段推进

P34 READY 只表示正式阶段声明已经形成。

它不表示：

- `LifeJourneyStageSourceInput` 已形成；
- Journey Stage 已推进或回退；
- Foundation Runtime 已改变；
- Star Beast Growth 已发生；
- Crystal 或 Archive 已沉淀。

Resolver Result 必须保持：

- `notStageSourceInput: true`；
- `noStageTransition: true`；
- `noAutomaticProgression: true`。

## 06｜严格禁止

P34 不得：

- 绕过 P33 Command 直接消费 P32 READY；
- 从 Review、Candidate、Trigger 或页面状态自动生成 Declaration；
- 生成或调用 `LifeJourneyStageSourceInput`；
- 推进或回退 Journey Stage；
- 修改 Foundation Runtime；
- 接入 Star Beast Growth、Gravity、Dynamics、Crystal、Persistence、Storage、UI 或 AI。

## 07｜调用所有权

正式调用方向更新为：

```text
Authority Declaration Resolver
└─ Explicit Declaration Command
   └─ Explicit Authority Declaration Readiness
      └─ Authority Evidence Input Adapter
```

- P33 Command 只由 P34 Resolver 直接调用；
- P21 Authority Declaration 只由 P34 Resolver 构造；
- P34 Resolver 当前没有下游业务消费者；
- 后续 Declaration Consumption 或 Stage Source Adapter 必须独立授权。

## 08｜P34 施工范围

P34 只新增：

- `lifeJourneyStageAuthorityDeclarationResolver`；
- 本协议与独立 resolver gate；
- release gate 注册。

同时只校准 P21、P29、P33 的合法调用拓扑与活跃协议，不修改 P21 类型、P33 Command、P15 Stage Source 或 Foundation Runtime。

## 09｜验收

1. P33 AVAILABLE + 正式 Authority 才生成 P21 Declaration；
2. 缺少或错误 Authority 不生成 Declaration；
3. P33 NOT_APPLICABLE / NOT_READY 不生成 Declaration；
4. Declaration 的阶段只来自 Command targetStage；
5. Command 与证据引用保持不变；
6. Stage Source、Journey Transition、Foundation Runtime、Star Beast Growth 与 Storage 保持未接入；
7. P21、P24–P33 gates、release、build 与 `git diff --check` 通过。
