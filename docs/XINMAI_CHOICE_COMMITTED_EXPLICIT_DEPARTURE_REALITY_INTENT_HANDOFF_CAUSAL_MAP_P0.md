# XINMAI Choice Committed → Explicit Departure → Reality Intent Handoff Causal MAP P0

> 任务编号：`XINMAI-CHOICE-COMMITTED-EXPLICIT-DEPARTURE-REALITY-INTENT-HANDOFF-CAUSAL-MAP-P0`
>
> 交通灯：YELLOW
>
> 刀型：MAP / Host & Recovery Consumer Review
>
> 决策：NOW — MAP ONLY
>
> 远程审计基线：`b448c8bb8a028dd0e5182d5026aa6f4b78541c71`
>
> 失败候选：`e9326f7b7d0a705299721164cc71569400f3f5a1`（本刀只读，禁止推送）
>
> Runtime / Gate / Storage / Candidate：未修改

---

## 一、最终裁决

```text
第一个没有形成合法 Typed Handoff Outcome 的节点：
GravityPage.handleChoiceContinueToReality

具体断裂：
Identity Recovery 与 Reality Intent Request 已各自返回 typed result
↓
Page 以 void handler 直接吞掉非 READY outcome
↓
Host / Presentation 无法知道第一个失败原因
↓
Explicit Departure Controller 没有被证明获得调用资格

产品主分类：
“进入真实生活”与“进入新的应用内 /reality Encounter”被同一按钮混合

刀后出口：
PRODUCT SEMANTIC PREP

Runtime Candidate e9326f7：
OPEN / PUSH REJECTED / KEEP AS FAILURE EVIDENCE

Remote：
SAFE_WITHHELD

Phase 3：
ACTIVE / NOT PASSED

Visual Runtime：
DEFER

Phase 4：
LOCKED
```

本刀不能裁决为绿色窄修正。

原因不是仅缺一条事件连接：当前实现已经把两种不同产品动作写入同一条命令链。

```text
用户可见动作：
“带着这一步进入真实生活”

当前 Runtime 动作：
requestRealityEncounter(CHOICE_CONTINUATION)
→ routeTarget = /reality
→ 写 Explicit Departure Receipt
→ navigate('/reality')
```

`/reality` 是 XINMAI 内部生命空间，不是用户已经离开产品、进入现实生活的证明。

因此在产品语义未重新冻结前，不能只补 Host 条件、重排导航或放宽 Intent。

---

## 二、真实浏览器事实

正式 `/reality → /dynamics` 路径已经取得以下证据：

```text
原生 prefers-reduced-motion: reduce
↓
Observation RECOGNIZED
↓
Action Route READY_TO_PRESENT
↓
用户真实按住生命核心 1.8 秒
↓
Choice 持久化
↓
RESUME_COMMITTED
```

随后真实点击：

```text
“带着这点空间继续面对现实”
```

实际结果：

- 页面保持 `/dynamics`；
- 没有进入 `/reality`；
- 没有出现 Departure 成功反馈；
- 没有出现失败反馈；
- 重复点击结果一致；
- 刷新后仍恢复同一 `RESUME_COMMITTED`；
- 刷新没有被解释为离场或回访；
- 没有可见证据证明 Departure Receipt、Return Receipt 或 Lived Response Admission 成立。

这证明：

```text
Choice Persistence：PASS
Explicit Departure Handoff：FAIL
False Success：0
```

本刀不通过读取或修改浏览器 Storage 补造失败原因。

---

## 三、当前完整链路还原

### 3.1 `RESUME_COMMITTED`

生产者：

```text
Canonical Growth Recovery
→ Growth Terminal Summary
→ Choice Presentation Resolver
→ RESUME_COMMITTED
```

消费者：`GravityPage`。

页面在该状态挂载 `TransformationMomentFocus`，并把 `handleChoiceContinueToReality` 作为唯一继续动作。

裁决：`KEEP`

### 3.2 用户明确点击 Departure

用户动作被 `TransformationMomentFocus` 的按钮消费。

按钮当前同时携带两种语义：

```text
产品文案：
进入真实生活 / 继续面对现实

技术命名：
onContinueToReality / SAME_LIFE_NEW_REALITY
```

裁决：`SEMANTIC CONFLICT`

### 3.3 Identity Recovery

当前调用：

```text
recoverRealityRecognizedIdentity({
  visualContinuity: arrivalVisualContinuity
})
```

正式三项身份引用：

```text
sourceReferenceId
starBeastIdentityReferenceId
mansionCoordinateReferenceId
```

Recovery 还要求：

- Real User Genesis Context；
- Launch Life Source Session；
- Genesis Visual Continuity；
- StarBeast Presence Visual Realization；
- Genesis Production Reality Entry Context；
- 上述资产的 `sourceReferenceId` 一致。

可能的 typed failure：

```text
RECOGNIZED_IDENTITY_NOT_AVAILABLE
VISUAL_CONTINUITY_NOT_AVAILABLE
PRESENCE_CONTINUITY_NOT_AVAILABLE
IDENTITY_REFERENCE_MISMATCH
IDENTITY_REFERENCE_INVALID
REALITY_ENTRY_CONTEXT_NOT_AVAILABLE
```

当前 Page 行为：

```ts
if (identityRecovery.status !== "READY") return;
```

结果：typed reason 被吞掉，Presentation 收不到任何 Outcome。

Choice 内的三项身份引用由正式 Action Route / Choice Authority 保存；目标实现应比较 recovered identity 与 Choice identity，而不是把旧 Session、旧 Activation 或页面内存对象变成新的权威。

裁决：

```text
Identity Recovery Authority：KEEP
Page direct consumption：MIGRATE
Silent return：REJECT
```

### 3.4 当前 Encounter 生命周期

Choice 来源 Reality Encounter 在进入 Gravity 时已经由 `realityToGravityCutoverTransaction` 原子推进：

```text
Reality Intent ACTIVE_IN_REALITY
↓
Gravity Transfer + Admission 同事务成立
↓
source Reality Intent = TERMINAL
terminalReason = ENCOUNTER_COMPLETED
↓
Continuity lifecycle = GRAVITY_ADMITTED
```

因此：

```text
Explicit Departure 前再次终结 source Encounter：
NOT REQUIRED
```

禁止把 Gravity 页面刷新、Back/Forward、卸载或动画结束解释为旧 Encounter 终结或用户离场。

新的 Choice target Encounter 必须是另一个 cycle，不能复用 source Encounter ID。

裁决：`SOURCE ENCOUNTER LIFECYCLE CORRECT / KEEP`

### 3.5 Reality Intent Request

唯一生产者：`RealityEncounterIntentController`。

当前请求：

```text
origin = CHOICE_CONTINUATION
qualification = CHOICE_ACTION_INTENTION_COMMITTED
identity = recovered three references
choiceActionIntentionReferenceId = current Choice
routeTarget = /reality
```

`encounterCycleId` 只由该 Controller 在事务提交时生成。

当前合法处理：

- 同一 identity、同一 Choice、同一 qualification 的未过期 READY Intent：复用；
- 已过期 Intent：先 terminalize，再生成新 cycle；
- 另一个未终结 Intent：`ENCOUNTER_ALREADY_ACTIVE`；
- identity 或 qualification 不合法：BLOCKED；
- Storage 失败：typed retryable / blocked outcome。

当前 Page 行为：

```ts
if (intentResult.status !== "READY") return;
```

因此 Request 的 typed reason 同样被吞掉。

裁决：

```text
Intent Controller：KEEP
Target cycle generator：KEEP / UNIQUE
Page direct request orchestration：MIGRATE
Failure consumption：MISSING
```

### 3.6 Reality lineage proof

`XinmaiChoiceReturningRealityProofAdapter` 只读 Reality Adventure Continuity。

它校验：

- target cycle；
- Choice reference；
- 三项 identity；
- `CHOICE_CONTINUATION`；
- `CHOICE_ACTION_INTENTION_COMMITTED`；
- `/reality` route target；
- canonical revision 与 fencing token；
- 禁止性 terminal reason。

它不写 Growth，也不创建 Departure。

裁决：`KEEP / READ ONLY`

### 3.7 Growth Transaction 写 Departure Receipt

`confirmXinmaiChoiceExplicitDeparture` 在现有 Growth `readwrite` transaction 内：

1. 重新读取 Choice；
2. 校验 V2、identity、revision 与 state；
3. 校验 target cycle 唯一；
4. 校验 Reality proof；
5. 绑定 `targetEncounterCycleId`；
6. 写确定性 Departure Receipt；
7. 事务完成后返回 `DEPARTED / ALREADY_DEPARTED`。

确定性 Receipt ID 材料：

```text
Choice reference
+ targetEncounterCycleId
+ Action Route reference
+ prototype version
+ Choice revision at departure
```

重复点击不应创建第二 Receipt。

当前浏览器没有到达可见的 Departure outcome。由于 Identity 与 Intent 失败在此前被吞掉，不能把该现象归咎于 Growth Transaction。

裁决：`CONTROLLER CONTRACT KEEP / RUNTIME CALL REACHABILITY UNPROVEN`

### 3.8 导航交付

只有 `DEPARTED / ALREADY_DEPARTED` 后，页面才调用：

```text
navigate('/reality', choice continuation state)
```

现有顺序能保证：导航不会成为 Receipt 权威。

如果 Receipt 已确认但导航失败：

- Departure 事实应保留；
- 刷新应恢复 `AWAITING_EXPLICIT_RETURN`；
- 不得重新写 Receipt；
- 用户可重试 Presentation delivery。

但是否应该导航到 `/reality`，属于尚未解决的产品语义，而不是实现细节。

---

## 四、第一个失败条件与权威所有者

### 4.1 可证实的第一个断点

源码与浏览器共同能证明的最早断点不是某个 Storage 函数，而是：

```text
GravityPage.handleChoiceContinueToReality
```

它承担了：

- Identity Recovery；
- Encounter / Intent Request；
- target cycle 获取；
- Departure Transaction；
- Navigation delivery。

但它：

- 返回 `void`；
- 没有 Handoff typed union；
- Identity 非 READY 时静默返回；
- Intent 非 READY 时静默返回；
- 没有 catch 把 thrown failure 适配为 typed retryable outcome；
- 只有进入 Departure Controller 后的显式拒绝才有页面反馈。

因此当浏览器停在 `RESUME_COMMITTED` 时，现有 Runtime 无法区分：

```text
IDENTITY_RECOVERY_BLOCKED
INTENT_REQUEST_BLOCKED
INTENT_RECOVERY_UNAVAILABLE
DEPARTURE_CONTROLLER_THROWN_FAILURE
```

这不是测试证据不够，而是 Host 没有生产可审计的 Handoff Outcome。

### 4.2 目标 Owner 方向

目标方向应由一个 typed Handoff Controller / Coordinator 拥有跨步骤编排：

```text
Choice Departure Command
↓
Identity Result
↓
Intent Result
↓
Reality Proof Result
↓
Departure Result
↓
Navigation Delivery Result
```

它不拥有 Identity、Intent、Growth 或 Route Authority，只负责：

- 顺序调用现有 Owner；
- 保留 typed reason；
- 幂等重试；
- 把已确认事实与 Presentation delivery 分开；
- 向 Host 返回单一 typed Handoff Outcome。

是否建立该 Coordinator，要等待产品语义 PREP 冻结。

---

## 五、产品语义裁决

### 5.1 当前混合

协议冻结的用户动作是：

```text
“带着这一步进入真实生活”
```

其产品含义是：

> 用户结束产品内准备，带着 Choice 进入现实微实验。

当前实现却执行：

```text
创建新的应用内 Reality Encounter
↓
Departure Receipt
↓
导航至 /reality
```

这把以下两件事混为一个动作：

1. 进入 XINMAI 的新 Reality Encounter；
2. 离开产品、进入真实生活。

### 5.2 两种可成立的产品方案

#### Option A｜Choice 后直接离开产品

```text
Choice COMMITTED
↓ 明确“带着这一步进入真实生活”
Departure Receipt
↓
AWAITING_EXPLICIT_RETURN
```

此方案下：

- 不应以新的 `/reality` Intent 作为 Departure 前提；
- Receipt 应绑定当前 Choice、source Reality / Gravity lineage；
- target encounter 应在用户明确返回时再建立，或由独立 return cycle 产生；
- 页面不应导航进另一个产品内 Reality。

优点：语义直接。

代价：改变当前 Reality Proof / target cycle contract，需重新审查 Schema 与 Saga。

#### Option B｜先进入新的 XINMAI Reality，再明确离开生活

```text
Choice COMMITTED
↓ “把这一步带进新的 Reality”
Choice-linked Reality Intent
↓
/reality ACTIVE
↓ 用户再次明确“这一轮先到这里，我去生活”
Departure Receipt
↓
AWAITING_EXPLICIT_RETURN
```

此方案下：

- 当前按钮不能宣称用户已经离开产品；
- `requestRealityEncounter` 与 `/reality` 导航只是准备下一轮 Reality；
- Departure Receipt 必须延后到 Reality 中真正的 explicit leave；
- 通用 `RealityExplicitLeaveTermination` 需要是否携带 Choice lineage 的独立审查。

优点：保留 Reality Encounter 权威。

代价：用户多一段应用内流程，可能违背“Choice 后郑重离场”的体验目标。

### 5.3 当前实现方案

```text
按钮宣称 Option A
Runtime 执行 Option B 的前半段
Receipt 却提前宣称 Option A 已成立
```

裁决：`REJECT AS PRODUCT SEMANTIC AUTHORITY`

不能通过改文案、补导航或放宽 Intent 单独解决。

---

## 六、生产者与消费者裁决

| 对象 | 当前责任 | 裁决 |
|---|---|---|
| Choice Action Intention Authority | `COMMITTED` | KEEP |
| Choice Presentation Resolver | `RESUME_COMMITTED` | KEEP |
| GravityPage | 直接编排五段 Handoff | MIGRATE AFTER PREP |
| Identity Recovery Adapter | 三项身份恢复与校验 | KEEP |
| source Reality → Gravity Cutover | 终结 source Encounter | KEEP |
| Reality Intent Controller | 生成 / 恢复 target cycle | KEEP IF OPTION B |
| Reality Proof Adapter | 只读 lineage proof | KEEP IF OPTION B / REDESIGN IF A |
| Returning Provenance Controller | Departure / Return Receipt | KEEP CONTRACT / INPUT REVIEW |
| Growth Transaction Authority | 唯一 Receipt writer | KEEP |
| Navigation | Presentation delivery | KEEP AS NON-AUTHORITY |
| Route / Page local state | 不得生产 Departure | REJECT AUTHORITY |
| DOM / Canvas / Timer | 不得生产 Identity、Intent、Receipt | REJECT |
| Refresh / unload / time elapsed | 不得证明离场 | REJECT |
| AI | 不得决定 Departure 或 Return | REJECT |

---

## 七、负向保护复验

| 保护项 | 当前证据 | 裁决 |
|---|---|---|
| Choice 保持 `RESUME_COMMITTED` | 点击失败与刷新后仍恢复 | PASS |
| Departure 未显示成功 | 无成功反馈、无导航 | PASS |
| Return 入口未开放 | 未到达 Returning Surface | PASS |
| Lived Response 入口未开放 | 未到达 `READY_FOR_LIVED_RESPONSE` | PASS |
| 刷新不构造 Departure | 刷新只恢复 Choice | PASS |
| 刷新不构造新可见 Cycle | 无新导航或成功态 | PASS AT PRESENTATION LEVEL |
| 多次点击不显示半成功 | 多次点击均保持 Choice | PASS AT PRESENTATION LEVEL |
| 旧周期 / identity 未被放宽 | 无成功旁路 | PASS |
| Direct URL 不补造 Handoff | 既有 Direct URL 阻断证据 | PASS |

未通过直接读取 Storage 断言 Receipt 数量；数量与唯一性仍需未来 Runtime 刀的专属 Gate 和浏览器证据。

---

## 八、静默返回绿色缺口

独立登记：

```text
XINMAI-CHOICE-DEPARTURE-TYPED-FAILURE-
FEEDBACK-REFINEMENT-P0

交通灯：GREEN
刀型：Refinement
状态：DEFER — 等产品语义 PREP
```

最低要求：

- Identity failure 显示克制、可重试的真实反馈；
- Intent failure 保留具体 typed reason；
- thrown failure 进入 `RETRYABLE / SAFE_WITHHELD`；
- 不把失败折叠为成功；
- 不放宽 Identity、Intent 或 Receipt Authority；
- 不独立决定 Option A / B。

它不能先于产品语义 PREP 施工，否则会把错误链包装得更易用。

---

## 九、下一刀

```text
XINMAI-CHOICE-DEPARTURE-
REAL-WORLD-VS-REALITY-ENCOUNTER-
SEMANTIC-MAJOR-BLADE-PREP-P0

交通灯：YELLOW
刀型：Product Semantic Major Blade Prep
决策：NOW — PREP ONLY
```

PREP 必须唯一冻结：

1. Choice 后是直接离开产品，还是先进入新的 `/reality`；
2. Departure Receipt 的真正成立时点；
3. `targetEncounterCycleId` 属于 Departure 前、Return 时还是下一 Reality；
4. 如果保留 `/reality`，谁拥有该 Encounter 的 explicit leave；
5. 按钮文案、typed command 与 Runtime 动作必须一一一致；
6. 当前 Saga、Proof 与 Schema 哪些保留、哪些需要重新迁移；
7. Safe-Withheld forward rollback 单位。

产品语义冻结后，再判断：

```text
只需 Host 漏传 / 条件修正
→ GREEN — NARROW HANDOFF CORRECTION

需要新的 Handoff Coordinator
→ YELLOW — MAJOR BLADE

需要替换 Intent、Receipt 或 Proof 的成立路径
→ RED — MIGRATION AUDIT
```

---

## 十、刀后交通灯扫描

```text
YELLOW：
“真实生活离场”与“应用内 Reality Encounter”产品语义冲突

GREEN：
typed Identity / Intent failure 被 Page 静默吞掉

RED：
本刀未证明已有双 Receipt writer、双 Intent Authority 或伪成功
不提前升级
```

本刀没有修改：

- Runtime；
- Gate；
- Storage；
- `e9326f7…` Candidate；
- Choice Authority；
- Identity Authority；
- Reality / Gravity Authority；
- Renderer；
- Crystal / Archive；
- Phase 4。

---

## 十一、最终状态

```text
Runtime Candidate e9326f7：
OPEN / PUSH REJECTED

Remote：
SAFE_WITHHELD

Choice Persistence：
PASS

source Encounter Lifecycle：
PASS

Explicit Departure Handoff：
OPEN

Product Semantic：
OPEN — OPTION A / B MUST BE FROZEN

Phase 3：
ACTIVE / NOT PASSED

Visual Runtime：
DEFER

Phase 4：
LOCKED
```
