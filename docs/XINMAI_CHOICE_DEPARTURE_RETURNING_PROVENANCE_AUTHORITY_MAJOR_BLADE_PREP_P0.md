# XINMAI Choice Departure → Returning Provenance Authority Major Blade Prep P0

> 任务编号：`XINMAI-CHOICE-DEPARTURE-RETURNING-PROVENANCE-AUTHORITY-MAJOR-BLADE-PREP-P0`
>
> 交通灯：YELLOW
>
> 刀型：Major Blade Prep
>
> 决策：NOW — PREP ONLY
>
> 远程施工基线：`caf95498f72cc9dc9d58663a97df5e5232b890e4`
>
> Pointer Candidate：`33ae0ba6cc3fbcd89a511079da46ae1160c83c1f`（CORE PASS / DELIVERY HOLD）
>
> Runtime / Gate / Storage / Authority：未修改

---

## 一、最终裁决

```text
Returning Provenance Product Protocol：
CLOSED / FROZEN

唯一 Controller：
XinmaiChoiceReturningProvenanceController

唯一持久化 Owner：
Existing Xinmai Lived Growth Transaction Authority

Reality Adventure Continuity：
READ-ONLY LINEAGE PROOF SOURCE

跨数据库原子提交：
NOT AVAILABLE / MUST NOT BE CLAIMED

当前 AWAITING_RETURN：
LEGACY BOUND STATE / NOT A RETURN PROOF

新持久化事实：
REQUIRED

刀后出口：
RED — CROSS-STORE MIGRATION AUDIT REQUIRED

33ae0ba：
VALID / KEEP / DELIVERY HOLD

Phase 3：
ACTIVE / NOT PASSED

Visual Runtime：
DEFER

Phase 4：
LOCKED
```

本 PREP 冻结的核心因果是：

```text
系统知道用户选了什么
≠
系统知道用户明确决定离场
≠
系统知道用户明确回来
≠
系统知道现实中发生了什么
```

四项事实必须由四个不同的明确动作与权威结果支持。

不能继续以 `ChoiceActionIntention.state` 的一个枚举值替代整条返回因果。

---

## 二、当前 Runtime 证据

### 2.1 Choice Commitment

当前 `commitChoiceActionIntention()` 在 Growth IndexedDB 事务中：

```text
Observation RECOGNIZED
↓
用户选择 Action Route
↓
Choice V2 = COMMITTED
targetEncounterCycleId = null
↓
Observation = CONSUMED_BY_CHOICE
```

这一事实只表示：

> 用户选择了准备尝试的行动。

裁决：`KEEP`

### 2.2 当前 Choice Continuation

`GravityPage.handleChoiceContinueToReality()` 当前执行：

```text
requestRealityEncounter(CHOICE_CONTINUATION)
↓
RealityEncounterIntent Controller 生成 target encounterCycleId
↓
bindChoiceActionIntentionToRealityEncounter()
↓
Choice.state = AWAITING_RETURN
↓
navigate('/reality')
```

当前 `AWAITING_RETURN` 只证明：

```text
Choice 已绑定一个目标 Reality Encounter
```

它不证明：

- 用户明确决定离开产品；
- 用户已经在现实生活中尝试；
- 用户现在明确回来；
- Lived Response 已经发生。

裁决：`ADAPT / LEGACY SEMANTIC`

### 2.3 当前 Reality Intent

Reality Adventure Continuity 已持久化：

- `intentReferenceId`；
- `encounterCycleId`；
- Identity 三项引用；
- `origin = CHOICE_CONTINUATION`；
- `choiceActionIntentionReferenceId`；
- Intent revision；
- lifecycle 与 terminal reason；
- canonical revision 与 fencing token。

它是目标 Encounter lineage 的正式来源，但其 provenance 明确：

```text
noGrowthAuthority = true
```

它不得直接创建 Departure、Return、Fact 或 Crystal。

裁决：`KEEP / READ-ONLY SOURCE`

### 2.4 当前 Explicit Leave

现有 `RealityExplicitLeaveTermination` 与 Navigation Delivery 能证明：

```text
当前 Reality Encounter 被用户明确终结
↓
TERMINAL / EXPLICIT_LEAVE
↓
同一生命世界 post-commit 呈现
```

但其 Ticket：

- 不携带 Choice reference；
- 不持久化；
- 明确 `noGrowthConsumer = true`；
- 完成后 App 状态回到 `IDLE`；
- 表达的是退出当前 Reality，不是 Choice 的现实微实验离场。

因此它不能直接成为本协议的 `Explicit Departure Receipt`。

裁决：`KEEP / DO NOT REPURPOSE`

### 2.5 当前 Returning Surface

`LaunchLab` 当前只执行：

```text
恢复身份
↓
readOpenXinmaiLivedGrowthReturnItems(identity)
↓
存在 COMMITTED / AWAITING_RETURN / REPORTED
↓
直接挂载 Lived Response Surface
```

它没有消费 Explicit Departure Receipt 或 Explicit Return Receipt。

裁决：`MIGRATE`

### 2.6 当前 Fact Authority

`confirmLivedResponseFact()` 当前正确地：

- 拒绝 `COMMITTED`；
- 校验身份、Choice revision 与现有 Growth 资产；
- 在 Growth 事务中写入 Fact；
- 不接受 AI、页面或 DOM 作为确认权威。

但它只用 `targetEncounterCycleId + AWAITING_RETURN` 代替 Returning Provenance。

裁决：`KEEP CORE / REQUIRE PROVENANCE RECEIPT`

---

## 三、产品事实冻结

### 3.1 Choice Commitment

```text
用户动作：
选择并确认一条 Action Route

正式事实：
我选择了准备尝试的行动

允许消费者：
Choice Continuation

禁止结论：
已离场 / 已返回 / 已行动 / 可形成 Crystal
```

### 3.2 Explicit Departure

```text
用户动作：
明确点击“带着这一步进入真实生活”

正式事实：
用户决定结束当前产品内的准备阶段，
带着该 Choice 进入现实微实验周期

禁止结论：
已经尝试 / 已经完成 / 已经返回
```

Departure 的权威来自明确 command 与确认写入，不来自：

- `navigate()`；
- pathname；
- 浏览器关闭；
- `beforeunload`；
- App 进入后台；
- 时间经过；
- Reality Host 已挂载；
- 动画完成。

### 3.3 Explicit Return

```text
用户动作：
恢复同一生命后明确点击“我回来了”

正式事实：
用户请求打开该 Choice lineage 的回访

禁止结论：
已经行动 / 行动成功 / 可以形成 Crystal
```

用户可以在任何时间明确回来，包括立即回来。

时间不承担真实性判断；立即回来后用户仍可诚实选择“尚未尝试”。

### 3.4 Lived Response

```text
用户动作：
选择结果、提供最小事实并明确确认

合法事实：
ATTEMPTED
COMPLETED_AS_INTENDED
CHANGED_RESPONSE
NOT_ATTEMPTED
UNABLE_TO_CONTINUE
USER_REJECTED_RECORD
```

只有这一阶段可以进入现有 Fact Authority。

`Explicit Return` 不是 Fact confirmation。

---

## 四、目标产品链

```text
Choice COMMITTED
↓
RESUME_COMMITTED
↓ 用户明确点击“带着这一步进入真实生活”
Reality Intent Controller 生成或恢复唯一 target cycle
↓
Growth Transaction 校验 Choice + typed target proof
↓
Explicit Departure Receipt COMMITTED
↓
AWAITING_EXPLICIT_RETURN
↓ 用户恢复同一生命并点击“我回来了”
Returning Provenance Controller 重新校验两侧来源
↓
Explicit Return Receipt COMMITTED
↓
READY_FOR_LIVED_RESPONSE
↓ 用户报告并确认现实事实
Fact Authority 在同一 Growth Transaction 消费 Return Receipt
↓
Lived Response Fact CONFIRMED
↓
RESUME_REPORTED / Eligibility / Formation
```

页面刷新、路由跳转、浏览器重新打开只能触发 Recovery。

它们不能替代任一用户明确动作。

---

## 五、五态 Admission 冻结

### 5.1 `RESUME_COMMITTED`

成立条件：

- Choice 当前存在；
- Choice 未关闭、未撤回、未形成更高 Growth 资产；
- 没有已确认的 Departure Receipt；
- 身份与 Choice lineage 当前；
- Recovery 可用。

页面行为：

- 恢复同一 Choice；
- 展示明确离场动作；
- 不挂载 Lived Response 表面。

### 5.2 `AWAITING_EXPLICIT_RETURN`

成立条件：

- Departure Receipt 已由 Growth Transaction 确认；
- Choice、Route、Observation、source/target cycle 与身份匹配；
- 没有 Return Receipt；
- 没有 Fact 或更高 Growth 资产。

页面行为：

- 生命空间显示“那一步仍在等你回应”；
- 用户可以点击“我回来了”；
- 可以暂时离开；
- 不挂载 Lived Response 表面。

### 5.3 `READY_FOR_LIVED_RESPONSE`

成立条件：

- Departure Receipt 有效；
- Explicit Return Receipt 有效；
- 两份 Receipt 属于同一 Choice lineage；
- 来源 revision 与不可变引用通过复验；
- Return Receipt 未被 Fact 消费；
- 没有冲突或更高 Growth 资产。

页面行为：

- 只有这一态允许挂载 `XinmaiLivedResponseReturnSurface`；
- `33ae0ba…` 的 Pointer 修正只在这一态具有产品资格。

### 5.4 `RESUME_REPORTED`

成立条件：

- 当前 Choice 已有用户确认的 Lived Response Fact；或
- 已存在 Eligibility、Formation Receipt / Crystal。

页面行为：

- 恢复 Fact、Formation 或 Body Imprint 对应链；
- 不重新开放 Departure、Return 或空白 Lived Response 表面。

### 5.5 `SAFE_WITHHELD`

用于：

- 任一 Storage unavailable / corrupted；
- Identity mismatch；
- Choice、Route、Observation、cycle 或 revision 冲突；
- Departure / Return Receipt 损坏；
- legacy `AWAITING_RETURN` 无 Proof；
- 多标签 stale command；
- 来源无法复验；
- 非法重复 receipt；
- Cross-store partial failure 未补偿。

页面行为：

- 不挂载回访表面；
- 不生成 Fact；
- 不清除既有资产；
- 提供克制重试或继续生命空间。

### 5.6 决策优先级

```text
Recovery / identity / source conflict
→ SAFE_WITHHELD

Fact / Eligibility / Receipt / Crystal
→ RESUME_REPORTED

Valid Return Receipt
→ READY_FOR_LIVED_RESPONSE

Valid Departure Receipt
→ AWAITING_EXPLICIT_RETURN

Choice only
→ RESUME_COMMITTED
```

不得把读取失败折叠为 `RESUME_COMMITTED`。

---

## 六、目标资产 Schema

以下是未来 Migration Audit 的目标契约，不代表本刀已创建类型或字段。

### 6.1 Explicit Departure Receipt

```ts
type ChoiceExplicitDepartureReceipt = Readonly<{
  schemaVersion: "XINMAI_CHOICE_EXPLICIT_DEPARTURE_RECEIPT_V1";
  source: "xinmai_choice_returning_provenance_controller";

  departureReceiptReferenceId: string;
  choiceActionIntentionReferenceId: string;
  choiceRevisionAtDeparture: number;

  identityReferences: RealityEncounterIdentityReferences;
  actionRouteReferenceId: string;
  actionRoutePrototypeId: ChoiceActionRoutePrototypeId;
  actionRoutePrototypeVersion: 1;
  gravityObservationReferenceId: string;
  gravityObservationRevision: number;

  sourceEncounterCycleId: string;
  targetEncounterCycleId: string;
  targetRealityIntentReferenceId: string;
  targetRealityIntentRevisionAtDeparture: number;

  state: "AWAITING_EXPLICIT_RETURN" | "RETURNED" | "INVALIDATED";
  revision: number;
  departedAt: string;
  updatedAt: string;

  provenance: Readonly<{
    explicitUserDeparture: true;
    command: "USER_ENTERS_REAL_WORLD_WITH_CHOICE";
    targetCycleAuthority: "REALITY_ENCOUNTER_INTENT_CONTROLLER";
    persistenceAuthority: "XINMAI_LIVED_GROWTH_TRANSACTION_AUTHORITY";
    noLivedResponseAuthority: true;
    noActionCompletionClaim: true;
    noCrystalEligibilityAuthority: true;
  }>;
}>;
```

ID 生成材料：

```text
choiceActionIntentionReferenceId
+ targetEncounterCycleId
+ actionRouteReferenceId
+ actionRoutePrototypeVersion
+ choiceRevisionAtDeparture
```

时间不得参与权威 ID。

### 6.2 Explicit Return Receipt

```ts
type ChoiceExplicitReturnReceipt = Readonly<{
  schemaVersion: "XINMAI_CHOICE_EXPLICIT_RETURN_RECEIPT_V1";
  source: "xinmai_choice_returning_provenance_controller";

  returnReceiptReferenceId: string;
  departureReceiptReferenceId: string;
  choiceActionIntentionReferenceId: string;
  choiceRevisionAtReturn: number;
  departureReceiptRevision: number;
  returnRevision: number;

  identityReferences: RealityEncounterIdentityReferences;
  actionRouteReferenceId: string;
  gravityObservationReferenceId: string;
  sourceEncounterCycleId: string;
  targetEncounterCycleId: string;
  targetRealityIntentRevisionObservedAtReturn: number;

  state: "READY_FOR_LIVED_RESPONSE" | "CONSUMED_BY_FACT" | "INVALIDATED";
  consumedLivedResponseReferenceId: string | null;
  returnedAt: string;
  updatedAt: string;

  provenance: Readonly<{
    explicitUserReturn: true;
    command: "USER_EXPLICITLY_RETURNS_TO_CHOICE";
    persistenceAuthority: "XINMAI_LIVED_GROWTH_TRANSACTION_AUTHORITY";
    noLivedResponseFact: true;
    noActionCompletionClaim: true;
    noCrystalEligibilityAuthority: true;
  }>;
}>;
```

同一有效 Departure Receipt 最多只有一个当前 Return Receipt。

多标签重复点击必须返回同一 Receipt，不能创建两个 return revision 作为两次独立回访。

Return Receipt ID 由以下稳定材料生成：

```text
departureReceiptReferenceId
+ choiceActionIntentionReferenceId
+ returnRevision
```

`returnedAt` 不参与 ID。

### 6.3 Typed Returning Provenance

`Returning Provenance` 是 Controller 对两份 Receipt 与来源 Proof 的类型化联合结果，不是页面布尔值：

```ts
type ReturningProvenanceProof = Readonly<{
  status: "READY_FOR_LIVED_RESPONSE";
  departureReceipt: ChoiceExplicitDepartureReceipt;
  returnReceipt: ChoiceExplicitReturnReceipt;
  sourceRealityProof: Readonly<{
    sourceEncounterCycleId: string;
    targetEncounterCycleId: string;
    targetRealityIntentReferenceId: string;
    origin: "CHOICE_CONTINUATION";
    choiceActionIntentionReferenceId: string;
    identityReferences: RealityEncounterIdentityReferences;
    canonicalRevisionObserved: number;
  }>;
}>;
```

它不得包含：

- 用户是否完成行动；
- 行动结果；
- AI 判断；
- Crystal Eligibility；
- 页面停留时长；
- 距离离场过去多久。

### 6.4 创建、消费与失效规则

创建：

- Departure Receipt 只能由 explicit Departure command 创建；
- Return Receipt 只能由 explicit Return command 创建；
- 两者都只能在 Growth transaction complete 后成为正式事实；
- 同一 Choice lineage 各自只有一个当前有效 Receipt。

消费：

- Return Receipt 只能由 Lived Response Fact Authority 消费；
- 消费与 Fact 写入必须处于同一 Growth transaction；
- Presentation、Route、AI 与 Renderer 无消费权。

失效：

- Identity reference 失配；
- Choice 被 `CLOSED / WITHDRAWN / SUPERSEDED`；
- Action Route snapshot 损坏或 reference 不一致；
- Observation / source / target lineage 冲突；
- 用户清除数据；
- 同一 Choice 出现无法裁决的重复 Receipt；
- 来源 Recovery corrupted。

以下情况本身不使 Receipt 失效：

- 时间经过；
- target Intent 正常 revision 增长；
- target Intent 到期；
- 浏览器关闭或刷新；
- 用户报告 `NOT_ATTEMPTED`。

---

## 七、唯一所有者与责任边界

### 7.1 唯一 Controller

冻结名称方向：

```text
XinmaiChoiceReturningProvenanceController
```

拥有：

- Explicit Departure command 校验；
- Departure Receipt lifecycle；
- Explicit Return command 校验；
- Return Receipt lifecycle；
- Receipt invalidation；
- Typed Admission Decision；
- Receipt → Fact 的消费资格。

不拥有：

- Choice 内容；
- Action Route 生成；
- Reality Intent；
- 用户现实行动结果；
- Lived Response Fact；
- Eligibility；
- Crystal；
- Presentation。

### 7.2 唯一持久化 Owner

冻结：

```text
XinmaiLivedGrowthTransactionAuthority
↓
xinmai-lived-growth-canonical IndexedDB
```

原因：

- Departure / Return 必须跨刷新和真实离场保留；
- Return Receipt 必须与 Fact 写入原子消费；
- Growth DB 已有多标签串行与 transaction-complete 成功边界；
- 新建第三个数据库会增加第二持久化真源。

Controller 只能提交 typed Growth command。

Page、Route、Surface 不得写 IndexedDB。

### 7.3 Reality Adventure Continuity

冻结：

```text
xinmai-reality-adventure-continuity IndexedDB
→ READ-ONLY LINEAGE PROOF SOURCE
```

它继续独立拥有 Reality Intent 与 Encounter lifecycle。

它不写 Returning Provenance，也不修改 Growth。

### 7.4 不存在跨数据库原子事务

当前正式存储：

```text
Reality Adventure Continuity DB
≠
Lived Growth Canonical DB
```

两个独立 `IDBDatabase` 的 transaction 不能被描述为一个原子提交。

禁止使用以下说法或实现：

- “两边一起提交”；
- “先读两个 revision 再写就是 CAS”；
- “Promise.all 等于原子性”；
- “Web Lock 让两个数据库成为同一事务”；
- “页面等待两个成功回调就是一致状态”。

未来只能采用：

```text
读取 Reality typed source proof
↓
在 Growth transaction 内重读 Choice 与 Receipt
↓
校验 source proof 的不可变 lineage
↓
单点提交 Growth Receipt
↓
消费前再次读取 Reality source 并复验
```

任一来源不可读或冲突均为 `SAFE_WITHHELD`。

---

## 八、Departure 生命周期

### 8.1 唯一用户动作

Departure command 只能来自 Choice Continuation 的明确按钮：

```text
带着这一步进入真实生活
```

按钮文案可以在后续体验刀校准，但 typed command 必须固定为：

```text
USER_ENTERS_REAL_WORLD_WITH_CHOICE
```

### 8.2 target encounterCycleId

唯一生成者保持：

```text
RealityEncounterIntent Controller
```

生成时机：

> 用户在 `RESUME_COMMITTED` 状态第一次明确请求带着该 Choice 离场时。

绑定要求：

- `origin = CHOICE_CONTINUATION`；
- `qualification = CHOICE_ACTION_INTENTION_COMMITTED`；
- 同一 Choice reference；
- 同一 Identity；
- 每条 Choice 只能绑定一个 target cycle；
- 同周期重试不得生成新 cycle。

Page、Route、Storage Adapter 不得生成 ID。

### 8.3 提交顺序

建议目标 Saga：

```text
1. Controller 获取当前 Choice typed snapshot
2. Reality Intent Controller 创建或恢复唯一 target intent
3. Controller 获得 typed Target Intent Proof
4. Growth Transaction 重读 Choice
5. 校验 Choice、Route、Observation、identity 与 target proof
6. 同事务绑定 target cycle + 写 Departure Receipt
7. IDBTransaction complete
8. 返回 DEPARTURE_CONFIRMED
9. Presentation 才可表达“这一步已经带出去了”
```

`navigate()` 可以发生在第 8 步之后，但不承担成功权威。

### 8.4 Partial Failure

若 Reality Intent 创建成功，但 Growth Receipt 写入失败：

- 不显示 Departure 成功；
- Choice 仍按最后确认事实恢复；
- 复用同一 target intent 重试；
- 不生成新 cycle；
- 不开放 Explicit Return；
- 无法复用时进入 `SAFE_WITHHELD`；
- 是否需要终结孤立 Intent，由 Migration Audit 冻结补偿协议。

若 Growth Receipt 成功，但导航失败：

- Departure 事实仍成立；
- 不回滚 Receipt；
- 用户可以从同一生命空间恢复 `AWAITING_EXPLICIT_RETURN`；
- 导航失败不能改写为“没有离场决定”。

### 8.5 Reality Terminal Proof 裁决

本协议不要求浏览器卸载或目标 Reality `TERMINAL` 才承认 Departure。

原因：

- 浏览器关闭不是可审计用户事实；
- target Intent 可能超时，而现实微实验仍然有效；
- Departure 的权威是明确用户 command + Growth Receipt；
- Reality lifecycle 只提供 lineage 与冲突校验。

现有 `TERMINAL / EXPLICIT_LEAVE` 可以作为附加一致性证据，但不能成为唯一 Departure Producer。

---

## 九、Explicit Return 生命周期

### 9.1 Recovery 只展示邀请

当 Departure Receipt 有效但没有 Return Receipt：

```text
Admission = AWAITING_EXPLICIT_RETURN
```

生命空间可以表达：

```text
那一步仍在等你回应
```

但不得直接展示结果表单。

### 9.2 唯一用户动作

```text
用户点击“我回来了”
↓
USER_EXPLICITLY_RETURNS_TO_CHOICE
```

通知点击、刷新、第二天打开、Back/Forward、页面可见均不是该 command。

### 9.3 Return 提交

```text
Recovery Adapter 提供 AWAITING_EXPLICIT_RETURN
↓
用户明确 Return command
↓
Controller 读取 Reality typed lineage proof
↓
Growth Transaction 重读 Choice + Departure Receipt
↓
校验 identity / choice / route / observation / cycles / revisions
↓
写唯一 Return Receipt
↓
IDBTransaction complete
↓
Admission = READY_FOR_LIVED_RESPONSE
```

只有 transaction complete 后，页面才可以挂载回访表面。

### 9.4 Return 不证明行动

即使用户立刻点击“我回来了”：

- 可以进入 Lived Response；
- 可以选择 `NOT_ATTEMPTED`；
- 不惩罚；
- 不生成 Eligibility；
- 不形成 Crystal。

系统不以时间或停留长度判断用户是否诚实。

---

## 十、Recovery Adapter

冻结唯一方向：

```text
XinmaiChoiceReturningProvenanceRecoveryAdapter
```

职责：

1. 通过 Growth typed reader 读取 Choice、Departure、Return 与更高资产；
2. 通过 Reality typed reader 读取 source/target lineage proof；
3. 校验 Identity、Choice、Action Route、Observation 与 cycle；
4. 解析五态 Admission；
5. 返回 typed failure reason；
6. 订阅两侧 revision observer，仅触发重读。

禁止：

- 直接写任一 Storage；
- 自动创建 Receipt；
- 以最新一条记录猜测 Choice；
- 把 unavailable 映射成空状态；
- 在 Page 内拼接两个 Reader；
- 让 Route 或 Surface 读取 IndexedDB。

多条开放 Choice 时，Adapter 返回 typed 列表；用户必须明确选择 lineage。

禁止默认取数组第一项。

---

## 十一、Fact Authority 对齐

目标 `confirmLivedResponseFact()` 必须在同一 Growth transaction 内：

```text
重读 Choice
↓
重读 Departure Receipt
↓
重读 Return Receipt
↓
校验 Return = READY_FOR_LIVED_RESPONSE
↓
校验 expected revisions / identity / lineage
↓
创建或修订 Fact
↓
Return Receipt = CONSUMED_BY_FACT
↓
Choice = REPORTED
↓
transaction complete
```

必须满足：

- Fact 写入失败时 Return Receipt 不被消费；
- Receipt 消费失败时 Fact 不被创建；
- 同一 Return Receipt 最多产生一个当前 Fact revision；
- 多标签重复确认返回同一 Fact 或 stale reject；
- `COMMITTED`、legacy `AWAITING_RETURN` 不能单独通过；
- `33ae0ba` 只改变已获 Admission 表面的命中，不改变 Authority。

---

## 十二、旧状态与数据迁移

### 12.1 当前 `AWAITING_RETURN`

目标裁决：

```text
正式新语义：
不再由 Choice state 单独表达

legacy 语义：
TARGET_REALITY_BOUND_UNPROVEN
```

新 Runtime 不得把旧 `AWAITING_RETURN` 自动升级为 Departure Receipt。

新正式 Choice 生命周期冻结为：

```text
Choice COMMITTED
+ no Departure Receipt
→ RESUME_COMMITTED

Choice COMMITTED
+ valid Departure Receipt
→ AWAITING_EXPLICIT_RETURN

Choice COMMITTED
+ valid Return Receipt
→ READY_FOR_LIVED_RESPONSE

Fact confirmed
→ Choice REPORTED
```

也就是说，Departure 与 Return 不再通过改变 Choice state 冒充；Choice 仍只拥有行动意愿，Receipt 单独拥有离场与回访事实。

### 12.2 No Backfill

```text
历史 COMMITTED：
RESUME_COMMITTED

历史 AWAITING_RETURN 无 Receipt：
SAFE_WITHHELD 或经过明确用户动作重新建立 Departure

历史 REPORTED + 合法 Fact：
RESUME_REPORTED

历史 Receipt / Crystal：
保护并恢复，不补造 Departure / Return Receipt

身份或 lineage 失配：
ISOLATE
```

禁止根据：

- `targetEncounterCycleId` 非空；
- 时间经过；
- 旧 route state；
- 最近一次 Choice；
- 历史 Fact 存在；

补造新 Proof。

### 12.3 Growth Envelope

未来实现需要在现有 Growth Canonical Authority 中加入持久化 Receipt 集合或等价索引。

Migration Audit 必须决定：

- Envelope schema 升级；
- Database version 是否升级；
- Receipt 唯一性索引；
- V1 Envelope 的只读兼容；
- 空集合初始化是否属于结构迁移而非语义 backfill；
- legacy writer detection；
- Counter-commit 的只读恢复。

---

## 十三、消费者迁移矩阵

| 生产者 / 消费者 | 目标裁决 | 说明 |
|---|---|---|
| Choice Action Intention Controller | KEEP | 只拥有 Choice |
| Action Route Authority | KEEP | 不拥有 Departure / Return |
| Gravity Choice Continuation | ADAPT | 生产 explicit departure command |
| Reality Encounter Intent Controller | KEEP | 唯一 target cycle 生成者 |
| `bindChoiceActionIntentionToRealityEncounter` | MIGRATE | 与 Receipt 事务对齐，不能单独写 `AWAITING_RETURN` |
| Reality Adventure Continuity Store | KEEP / READ ONLY | 提供 typed lineage proof |
| Reality Explicit Leave Termination | KEEP / ISOLATE | 不复用为 Choice Departure Authority |
| Navigation Delivery | KEEP / ISOLATE | 不持久化、不消费 Growth |
| Returning Provenance Controller | NEW AUTHORITY | 唯一 Receipt lifecycle owner |
| Growth Transaction Authority | ADAPT | 唯一 Receipt persistence owner |
| Returning Provenance Recovery Adapter | NEW READ ADAPTER | 联合两侧 typed reads |
| `readOpenXinmaiLivedGrowthReturnItems` | MIGRATE | 不再返回可直接挂载表面的开放列表 |
| LaunchLab | MIGRATE | 只消费五态 Admission |
| `XinmaiLivedResponseReturnSurface` | KEEP / GATED | 仅 READY 时挂载 |
| Lived Response Fact Authority | ADAPT INPUT | 事务内消费 Return Receipt |
| Eligibility / Formation / Crystal | KEEP | 只消费正式 Fact 后续 |
| Renderer | REJECT | 不消费 Provenance |
| DOM / Canvas / Timer | REJECT | 不生产 Admission |
| AI | REJECT | 不确认 Departure、Return 或 Fact |
| Phase 4 | REJECT | 不参与资格与 Provenance |

---

## 十四、失败、刷新与多标签矩阵

| 场景 | 目标 Admission / Outcome | 禁止结果 |
|---|---|---|
| Choice committed 后刷新 | `RESUME_COMMITTED` | 自动 Departure |
| 用户点击 Departure，Intent 写入失败 | `SAFE_WITHHELD` / retry | 生成 Receipt |
| Intent 成功、Growth Receipt 失败 | `SAFE_WITHHELD` / same-cycle retry | 声称已离场 |
| Receipt 成功、导航失败 | `AWAITING_EXPLICIT_RETURN` | 回滚用户决定 |
| 浏览器关闭 | 保留最后 Receipt | 自动 Return |
| App 后台 | 无状态推进 | 自动 Return |
| 等待一天 | 无状态推进 | 自动 Return |
| 重新打开 Launch | 恢复 Invitation | 自动挂载表单 |
| 点击“我回来了”写入失败 | 保持 `AWAITING_EXPLICIT_RETURN` | READY 假成功 |
| 两标签同时 Departure | 一个 Receipt；另一个幂等或 stale | 两个 target cycle |
| 两标签同时 Return | 一个 Return Receipt | 两个回访周期 |
| 标签 A Return 后标签 B 打开 | 重读 READY | 再建 Receipt |
| 标签 A Fact 后标签 B 提交 | stale / resume reported | 第二 Fact lineage |
| target Intent lifecycle 进展 | 复验不可变 lineage | 因 revision 增长误判另一 cycle |
| target Intent 到期 | 保留 Departure；不推断行动 | 删除 Choice |
| identity mismatch | `SAFE_WITHHELD` | 串用其他生命 |
| Storage unavailable / corrupted | `SAFE_WITHHELD` | 回退页面布尔值 |
| 用户暂不回来 | 保持等待，不惩罚 | 红点、倒计时、失去奖励 |
| 用户回来但未尝试 | READY 后报告 NOT_ATTEMPTED | Crystal |
| 用户拒绝记录 | 关闭或延后 Candidate | 隐藏 Fact |

### 14.1 Revision 规则

Reality Intent revision 可以随合法 lifecycle 单调增长。

Returning 校验应保护：

- Intent reference 不变；
- target cycle 不变；
- Choice reference 不变；
- Identity 不变；
- origin 不变；
- 当前 revision 不低于 Receipt 记录的 revision。

不得要求 current revision 永远等于 departure 时 revision，否则合法 Active / Terminal 进展会被误判 stale。

以下变化必须失效：

- Identity 改变；
- target cycle 被另一 Choice 占用；
- Intent 被 `USER_DATA_CLEARED`；
- Choice closed / withdrawn / superseded；
- Route snapshot 损坏；
- Receipt lineage 冲突。

---

## 十五、Gate 设计

未来原子迁移至少需要：

1. Choice Commitment Is Not Departure Gate；
2. Explicit Departure Command Required Gate；
3. Navigate Is Not Departure Authority Gate；
4. Browser Lifecycle Is Not Return Gate；
5. Unique Target Encounter Per Choice Gate；
6. Departure Receipt Persistence Gate；
7. Explicit Return Receipt Required Gate；
8. Returning Admission Five-state Gate；
9. Ready-only Surface Mount Gate；
10. Lived Response Fact Consumes Return Receipt Gate；
11. Cross-store Atomic Claim Forbidden Gate；
12. Source Revision Revalidation Gate；
13. Legacy Awaiting Return No Backfill Gate；
14. Multi-tab Duplicate Receipt Forbidden Gate；
15. Page / Route / DOM / Timer Authority Forbidden Gate；
16. Motion / Reduced Motion Semantic Parity Gate；
17. Pointer Fix Admission Alignment Gate。

Gate 不得冻结精确用户文案；它保护 typed command 与因果。

---

## 十六、真实浏览器验收矩阵

未来 Runtime 交付必须从正式生产链验证：

### 正向

1. Choice committed 后只显示 Departure，不显示回访表单；
2. 用户明确 Departure 后恢复 `AWAITING_EXPLICIT_RETURN`；
3. 关闭并重开仍恢复同一 Choice 与同一 Receipt；
4. 用户明确点击 Return 后才挂载回访表面；
5. `33ae0ba` 使 READY 表面真实可命中；
6. 用户报告 `ATTEMPTED` 并确认，Fact 与 Receipt 消费同事务；
7. 用户报告 `CHANGED_RESPONSE`，不作道德评价；
8. 用户报告 `NOT_ATTEMPTED`，不形成 Eligibility；
9. 用户拒绝记录，不生成隐藏 Fact；
10. Fact 后刷新进入 `RESUME_REPORTED`。

### 连续性

11. Choice committed 后 Refresh 仍为 `RESUME_COMMITTED`；
12. Back/Forward 不生成 Departure / Return；
13. 普通关闭、后台、网络断开不生成 Return；
14. 两标签同时 Departure 只形成一个 Receipt 与一个 target cycle；
15. 两标签同时 Return 只形成一个 Return Receipt；
16. 旧标签不能覆盖新 revision；
17. target Intent lifecycle 更新不改变 lineage；
18. Motion 与原生 Reduced Motion 使用同一 Admission；
19. 窄视口 READY 表面命中与可见位置一致。

### 负向

20. `COMMITTED` 直接挂载表面：0；
21. legacy `AWAITING_RETURN` 自动 Admission：0；
22. pathname / timer / unload 自动推进：0；
23. Storage unavailable 时伪成功：0；
24. identity、Choice、Route、Observation 或 cycle mismatch：`SAFE_WITHHELD`；
25. Direct URL 不能绕过 Return Receipt；
26. Fixture / Acceptance 不能成为生产 Proof；
27. Fact Authority 不接受 Presentation Decision 作为凭证；
28. Eligibility、Crystal、Renderer、Phase 4 消费 Returning Provenance：0。

---

## 十七、`33ae0ba…` 交付边界

冻结：

```text
Pointer Reachability Core：
CLOSED / PASS

Delivery：
HOLD
```

最终关系：

```text
READY_FOR_LIVED_RESPONSE
+
Pointer Reachability Fix
↓
真实可操作回访表面
```

非 READY 状态：

- 不挂载表面；或
- 表面必须不可交互且不可被辅助技术误认为可用。

未来迁移候选必须从远程权威基线重新形成清晰 diff。

可以重用 `33ae0ba` 的两项已验收最小差异，但不得：

- 独立推送 `33ae0ba`；
- 把 Canvas 遮挡当 Gate；
- 普通 revert 恢复不可点击；
- 将 Pointer 成功当作 Admission Proof。

---

## 十八、迁移与回滚边界

### 18.1 原子 Runtime Cutover 候选范围

未来实施必须在同一交付单位完成：

```text
Returning Provenance types
+ Departure / Return Receipt persistence
+ Growth Envelope migration
+ Reality typed proof adapter
+ Cross-store orchestration and compensation
+ Five-state Recovery Adapter
+ Choice Continuation cutover
+ Launch consumers cutover
+ Fact Authority receipt consumption
+ legacy AWAITING_RETURN isolation
+ Pointer fix admission alignment
+ new Gates
```

禁止生产中间态：

```text
新 Receipt + 旧 open-item Surface
```

或：

```text
旧 AWAITING_RETURN 被删除
但 Departure / Return Recovery 尚未接入
```

### 18.2 Safe Withheld Forward Rollback

未来必须准备 forward counter-commit：

```text
新 Departure command：PAUSED
新 Explicit Return command：PAUSED
新 Lived Response Admission：SAFE_WITHHELD
既有 Choice / Fact / Eligibility / Receipt / Crystal：READABLE
既有 Reality Continuity：READABLE
legacy AWAITING_RETURN：NOT REACTIVATED
Pointer fix：可保留，但无 READY 表面可触发
```

普通 revert 不得恢复：

- `COMMITTED` 直接表单；
- `AWAITING_RETURN` 直接 Fact 权限；
- 页面布尔值；
- DOM 命中遮挡；
- 第二 Storage writer。

---

## 十九、候选文件边界

以下仅供下一张 Migration Audit 清点，不构成本刀施工授权。

### 19.1 候选新增

```text
src/types/xinmaiChoiceReturningProvenance.ts
src/services/xinmaiChoiceReturningProvenanceController.ts
src/services/xinmaiChoiceReturningProvenanceRecoveryAdapter.ts
src/services/xinmaiChoiceReturningRealityProofAdapter.ts

scripts/check-xinmai-choice-explicit-departure-authority.mjs
scripts/check-xinmai-choice-explicit-return-authority.mjs
scripts/check-xinmai-returning-provenance-admission.mjs
scripts/check-xinmai-returning-provenance-cross-store-boundary.mjs
scripts/check-xinmai-lived-response-return-receipt-consumer.mjs
```

### 19.2 候选修改

```text
src/types/xinmaiChoiceActionIntention.ts
src/types/xinmaiLivedGrowthRecovery.ts
src/types/xinmaiLivedGrowthTransactionalStore.ts

src/services/xinmaiChoiceActionIntentionController.ts
src/services/xinmaiLivedGrowthTransactionalStore.ts
src/services/xinmaiLivedGrowthTransactionAuthority.ts
src/services/xinmaiLivedResponseAuthorityController.ts
src/services/xinmaiRealityAdventureContinuityTransactionalStore.ts

src/pages/GravityPage.tsx
src/pages/LaunchLab.tsx
src/components/XinmaiLivedResponseReturnSurface.tsx

package.json
相关 XINMAI Gate
```

### 19.3 禁止范围

- Renderer；
- Pressure Seed；
- Gravity Observation Authority；
- Action Route 语义；
- Crystal Formation 规则；
- Body Imprint 视觉；
- AI；
- Sanctuary；
- 商业化；
- Phase 4。

---

## 二十、刀后交通灯

### 主灯

```text
RED — CROSS-STORE MIGRATION AUDIT REQUIRED
```

原因：

1. 需要新增持久化 Departure / Return Receipts；
2. 需要升级 Growth Envelope 或等价索引；
3. 需要切换 Choice、Returning 与 Fact 消费者；
4. 需要联合校验两个独立 IndexedDB；
5. 不能提供跨库原子性，只能设计补偿与重新验证；
6. legacy `AWAITING_RETURN` 必须隔离且禁止 backfill；
7. `33ae0ba` 必须与 READY-only Admission 对齐。

### 独立黄灯

```text
Returning Lived Response Reduced Motion typed mirror：
YELLOW / PRESENTATION PARITY MAP
```

它不混入本 PREP，也不改变 Admission 语义。

### 继续记录

```text
XINMAI Life Observation Ontology：
DISCUSSION RECORDED / NO RUNTIME ACTION
```

---

## 二十一、下一刀

```text
XINMAI-CHOICE-DEPARTURE-RETURNING-
PROVENANCE-AUTHORITY-CROSS-STORE-
ATOMIC-MIGRATION-AUDIT-P0

交通灯：
RED

刀型：
Migration Audit / Cross-store Saga & Consumer Cutover

决策：
NOW — AUDIT ONLY

Runtime / Gate / Storage：
DEFER
```

下一刀必须冻结：

1. Reality source proof 的 typed reader；
2. Growth Receipt schema migration；
3. target Intent 成功、Growth 失败的补偿；
4. Growth 成功、Presentation 失败的恢复；
5. 两侧 revision 重新验证规则；
6. 多标签 Receipt 唯一性；
7. legacy `AWAITING_RETURN` 处置；
8. Fact 事务内消费 Return Receipt；
9. Consumer 原子切换；
10. `33ae0ba` 合入方式；
11. Safe Withheld counter-commit；
12. 远程干净快照与浏览器矩阵。

---

## 二十二、最终输出

```text
Choice Commitment：
KEEP / CHOICE CONTINUATION ONLY

Explicit Departure：
NEW PERSISTED RECEIPT REQUIRED

Explicit Return：
NEW PERSISTED RECEIPT REQUIRED

Lived Response Fact：
KEEP AUTHORITY / REQUIRE RETURN RECEIPT

五态 Admission：
FROZEN

唯一 Controller：
XinmaiChoiceReturningProvenanceController

唯一 Persistence Owner：
Existing Growth Transaction Authority

Reality Continuity：
READ-ONLY LINEAGE SOURCE

Cross-database Atomicity：
REJECT CLAIM

legacy AWAITING_RETURN：
NO BACKFILL / NOT A PROOF

33ae0ba：
CORE PASS / DELIVERY HOLD

最终出口：
RED — CROSS-STORE MIGRATION AUDIT REQUIRED

Phase 3：
ACTIVE / NOT PASSED

Visual Runtime：
DEFER

Phase 4：
LOCKED
```
