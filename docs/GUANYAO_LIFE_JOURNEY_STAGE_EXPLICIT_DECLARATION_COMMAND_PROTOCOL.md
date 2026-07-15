# GUANYAO Life Journey Stage Explicit Declaration Command Protocol
# 观爻生命旅程阶段显式声明指令协议

版本：Evolution Phase 1 / P33

状态：LIFE SUBJECT EXPLICIT DECLARATION COMMAND

施工编号：`RC-LIFE-JOURNEY-STAGE-EXPLICIT-DECLARATION-COMMAND-P33`

## 00｜协议定位

P33 在 P32 Explicit Authority Declaration Readiness 之后建立生命主体的显式阶段声明指令契约。

固定输入为：

```text
P32 READY_FOR_EXPLICIT_AUTHORITY_DECLARATION
+ life_subject
+ explicit DECLARE decision
→ Explicit Authority Declaration Command
```

生命阶段不能被系统自动宣布，必须由主体确认。

Command 只记录声明意愿、声明对象与原始证据引用。它不是 Authority Declaration，也不是 Stage Source。

## 01｜生命主体

P33 将确认主体固定为：

```text
life_subject
```

主体不是页面、AI、Runtime、Star Beast 或算法代理。缺少 `life_subject` 时不得生成 Command，并返回 `LIFE_SUBJECT_REQUIRED`。

## 02｜显式 DECLARE

唯一有效声明决定为：

```text
DECLARE
```

P32 READY 本身不等于主体确认。只有同时收到主体的显式 DECLARE 决定，才可形成 Command。

缺少决定时返回 `EXPLICIT_DECLARE_DECISION_REQUIRED`，不得由系统补全或默认确认。

## 03｜声明对象与证据引用

Command 的声明对象必须来自 P32 READY：

- `targetStage` ← `readiness.authorityEvidenceInput.proposedStage`；
- `authorityEvidenceInput` ← P32 原始引用；
- `evidenceReview` ← `authorityEvidenceInput.review` 原始引用；
- `readiness` ← P32 READY 原始引用。

不得复制、重建、修改或另行推断目标阶段、Accepted Review、Candidate、Trigger 或 Evidence Source。

## 04｜非声明边界

Command 必须保持：

- `notAuthorityDeclaration: true`；
- `notStageSourceInput: true`；
- `noAutomaticProgression: true`；
- `noRuntimeInference: true`。

Command 表达“主体愿意声明这个阶段”，不表达“正式权威声明已经形成”。

## 05｜非 READY 结果

P32 NOT_APPLICABLE：

- 不生成 Command；
- 保持 NOT_APPLICABLE；
- 保留原始 rejection reason；
- 不视为系统错误。

P32 NOT_READY：

- 不生成 Command；
- 保持 NOT_READY；
- 保留原始 reason 与 input 引用。

## 06｜严格禁止

P33 不得：

- 生成或导入 `LifeJourneyStageAuthorityDeclaration`；
- 生成 `LifeJourneyStageSourceInput`；
- 推进或回退 Journey Stage；
- 将 P32 READY 自动转换为 DECLARE；
- 由 AI、Runtime、页面或算法代替主体确认；
- 接入 Foundation Runtime、Star Beast Growth、Gravity、Dynamics、Crystal、Persistence、Storage、UI 或 AI。

## 07｜调用所有权

正式调用方向更新为：

```text
Explicit Declaration Command
└─ Explicit Authority Declaration Readiness
   └─ Authority Evidence Input Adapter
      └─ Review Outcome Readiness
```

- P32 Readiness 只由 P33 Command 直接调用；
- P33 Command 当前没有下游业务消费者；
- 后续 Authority Declaration Resolver 必须通过独立协议与 gate 获得授权。

## 08｜P33 施工范围

P33 只新增：

- `lifeJourneyStageExplicitDeclarationCommand`；
- 本协议与独立 command gate；
- release gate 注册。

同时只校准 P29、P32 的合法调用拓扑，不修改 P21 Authority Declaration、P30 Input、P31 Adapter 或 P32 Readiness 语义。

## 09｜验收

1. READY + life_subject + DECLARE 才形成 Command；
2. READY 但缺少主体或 DECLARE 不形成 Command；
3. NOT_APPLICABLE 与 NOT_READY 不形成 Command；
4. Command 保留 P32、Authority Evidence Input 与 Accepted Review 原始引用；
5. Command 不生成 Authority Declaration、Stage Source 或 Journey Stage 变化；
6. Foundation Runtime、Star Beast Growth、Storage、UI 与 AI 保持未接入；
7. P21、P24–P32 gates、release、build 与 `git diff --check` 通过。
