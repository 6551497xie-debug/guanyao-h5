# GUANYAO Life Journey Stage Authority Declaration Readiness Protocol
# 观爻生命旅程阶段权威声明就绪协议

版本：Evolution Phase 1 / P32

状态：EXPLICIT AUTHORITY DECLARATION READINESS

施工编号：`RC-LIFE-JOURNEY-STAGE-AUTHORITY-DECLARATION-READINESS-P32`

## 00｜协议定位

P32 在 P31 Authority Evidence Input Adapter 之后建立显式权威声明的前置就绪边界。

固定链路为：

```text
Authority Evidence Input Adapter Result
→ Explicit Authority Declaration Readiness
```

P32 只回答当前结果是否具备进入显式权威声明的资格，不生成 Authority Declaration，也不生成 Stage Source。

## 01｜READY

只有 P31 返回 AVAILABLE 时，P32 才返回：

```text
READY / READY_FOR_EXPLICIT_AUTHORITY_DECLARATION
```

READY 必须保留 P31 Adapter Result 与 Authority Evidence Input 的原始引用。

READY 仍然保持：

- `explicitDeclarationRequired: true`；
- `notAuthorityDeclaration: true`；
- `notStageSourceInput: true`；
- `noAutomaticProgression: true`。

它只允许下一层发起显式权威声明，不代表权威已经声明阶段。

## 02｜NOT_APPLICABLE

P31 NOT_APPLICABLE 必须形成：

```text
NOT_APPLICABLE / NOT_APPLICABLE_FOR_AUTHORITY_DECLARATION
```

该结果表示本次 Review 已完成，但被拒绝的证据不具备进入权威声明的资格。它不是系统错误，也不得被改写为 NOT_READY。

P32 必须保留原始 Rejected Review、rejection reason 与 P31 Adapter Result 引用。

## 03｜NOT_READY

P31 UNAVAILABLE 必须形成 NOT_READY，并原样保留：

- P31 Adapter Result 引用；
- 原始 input 引用；
- 原始 unavailable reason。

P32 不补 Candidate、Reviewer、Decision 或 Rejection Reason。

## 04｜严格禁止

P32 不得：

- 绕过 P31 直接调用 Review Readiness、Endpoint、Resolver 或 Consumption；
- 构造或导入 `LifeJourneyStageAuthorityDeclaration`；
- 构造 `LifeJourneyStageSourceInput`；
- 把 READY 等同于阶段声明；
- 从 REJECTED 推断其他阶段；
- 推进或回退 Life Journey Stage；
- 接入 Foundation、Life Schema、Gravity、Dynamics、Crystal、Runtime、Persistence、Storage、UI 或 AI。

## 05｜调用所有权

正式调用方向更新为：

```text
Explicit Authority Declaration Readiness
└─ Authority Evidence Input Adapter
   └─ Review Outcome Readiness
      └─ Review Endpoint
         ├─ Resolver
         └─ Result Consumption
```

- P31 Adapter 只由 P32 Explicit Authority Readiness 调用；
- P32 Readiness 当前没有下游业务消费者；
- 后续声明 Resolver 必须通过独立协议与 gate 获得授权。

## 06｜P32 施工范围

P32 只新增：

- `lifeJourneyStageExplicitAuthorityReadiness`；
- 本协议与独立 readiness gate；
- release gate 注册。

同时只校准 P29–P31 的合法调用拓扑，不修改 P21 Authority Declaration、P30 Input Contract 或 P31 Adapter 语义。

## 07｜验收

1. AVAILABLE 形成 READY，并保留 Authority Evidence Input 引用；
2. NOT_APPLICABLE 保持独立终止语义与原始拒绝原因；
3. UNAVAILABLE 形成 NOT_READY，并保留原始原因和 input；
4. P32 只调用 P31 Adapter；
5. P32 不生成 Authority Declaration 或 Stage Source；
6. P32 当前没有 Runtime、Persistence、Storage、UI 或 AI 消费者；
7. P21、P24–P31 gates、release、build 与 `git diff --check` 通过。
