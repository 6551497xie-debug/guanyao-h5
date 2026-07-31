# XINMAI Choice Departure → Returning Provenance Authority Cross-store Atomic Migration Audit P0

> 任务编号：`XINMAI-CHOICE-DEPARTURE-RETURNING-PROVENANCE-AUTHORITY-CROSS-STORE-ATOMIC-MIGRATION-AUDIT-P0`
>
> 交通灯：RED
>
> 刀型：Migration Audit / Cross-store Saga & Consumer Cutover
>
> 决策：NOW — AUDIT ONLY
>
> 审计基线：`f9630a0893f0c4263c7c2698167d3e5403842279`
>
> Pointer Candidate：`33ae0ba6cc3fbcd89a511079da46ae1160c83c1f`（CORE PASS / DELIVERY HOLD）
>
> Runtime / Gate / Storage / Authority：未修改

---

## 一、最终裁决

```text
Reality Lineage Proof：
STABLE IMMUTABLE TUPLE / MUTABLE VERSIONED LIFECYCLE

Cross-store Atomic Transaction：
NOT AVAILABLE / CLAIM REJECTED

Growth Transaction Authority：
CAN SAFELY OWN DEPARTURE + RETURN + FACT CONSUMPTION

New Database：
NO

Second Writer：
NO

Physical IndexedDB Version Upgrade：
NOT REQUIRED BY RECOMMENDED PLAN

Canonical Growth Envelope Schema Upgrade：
V1 → V2 REQUIRED

Legacy Semantic Backfill：
0

Consumer Cutover：
ATOMIC APPLICATION REQUIRED

审计出口：
NOW — SCHEMA-AWARE MIGRATION APPLICATION READY

Pointer Fix：
KEEP / INCLUDE ONLY BEHIND READY ADMISSION

Phase 3 P1：
OPEN

Visual Runtime：
DEFER

Phase 4：
LOCKED
```

本审计确认，目标可以实现，但实现形式必须是 Saga：

```text
Reality Continuity
→ 只读版本化 Proof

Growth Transaction Authority
→ 唯一 Receipt / Fact 写入

Cross-store Coordination
→ Proof Snapshot
  + Immutable Tuple Validation
  + Monotonic Version Revalidation
  + Idempotency
  + Compensation
```

任何文档、代码、Gate 或用户反馈不得声称两个 IndexedDB 共同形成一个原子事务。

---

## 二、当前存储拓扑

### 2.1 Reality Adventure Continuity

```text
Database：xinmai-reality-adventure-continuity
Version：1
Canonical Store：reality-adventure-encounter-continuity
Key：encounterCycleId
```

正式拥有：

- Reality Intent；
- source/target Encounter lifecycle；
- canonical revision；
- fencing token；
- Pressure Recognition；
- Gravity Transfer / Admission；
- terminal reason。

边界：

```text
noGrowthAuthority = true
```

### 2.2 Lived Growth Canonical

```text
Database：xinmai-lived-growth-canonical
Version：2
Canonical Store：canonical-growth-envelope
Canonical Key：CURRENT
```

正式拥有：

- Choice Action Intention；
- Lived Response Fact；
- Crystal Eligibility；
- Formation Receipt；
- Crystal Projection；
- Gravity Observation Continuity。

成功真源：

```text
IDBTransaction complete
```

### 2.3 当前不可跨越的边界

```text
Reality IDBTransaction
≠
Growth IDBTransaction
```

不存在：

- 跨数据库 transaction；
- 跨数据库原子 compare-and-swap；
- 能同时回滚两侧的 commit；
- 能把 Web Lock 变成 IDB atomicity 的机制。

因此推荐方案不尝试建立“跨库事务层”。

---

## 三、Reality Proof 稳定性审计

### 3.1 当前不可变 Lineage 元组

Reality record 创建后，现有 Controller 的 `nextIntent()` 与 `updateRecordIntent()` 只推进 state、failure、terminal reason、revision、lifecycle、canonical revision 与 fencing token。

以下字段在合法 lifecycle 中保持不变：

```text
record.schemaVersion
record.encounterCycleId
intent.intentReferenceId
intent.sourceReferenceId
intent.starBeastIdentityReferenceId
intent.mansionCoordinateReferenceId
intent.origin
intent.qualification
intent.choiceActionIntentionReferenceId
intent.routeTarget
intent.issuedAt
```

对于 Choice Departure，必须额外满足：

```text
origin = CHOICE_CONTINUATION
qualification = CHOICE_ACTION_INTENTION_COMMITTED
choiceActionIntentionReferenceId = 当前 Choice
routeTarget = /reality
```

这些字段可以形成稳定 Proof tuple。

### 3.2 当前可变字段

```text
intent.state
intent.revision
intent.updatedAt
intent.failure
intent.terminalReason
record.lifecycle
record.canonicalRevision
record.fencingToken
record.activeIdentityKey
record.updatedAt
```

它们反映 lifecycle 进展，不应进入 Receipt 的确定性 ID。

### 3.3 revision 与 fencing token 的正式用途

冻结：

```text
canonicalRevision / fencingToken：
只用于证明“本次读取看到的版本”与检测倒退、替换或异常

不得用于：
跨数据库 CAS
Growth 写锁
Receipt ID
用户行动真实性
```

复验规则：

```text
current immutable tuple = snapshot immutable tuple
AND
current canonicalRevision >= snapshot canonicalRevision
AND
current fencingToken >= snapshot fencingToken
```

revision 正常增长不使 Receipt 失效。

revision 或 token 倒退视为 corrupted / stale source，进入 `SAFE_WITHHELD`。

### 3.4 terminal reason 规则

允许保留 lineage：

- `null`；
- `EXPLICIT_LEAVE`；
- `ENCOUNTER_COMPLETED`；
- `START_NEW_ENCOUNTER`；
- `INTENT_EXPIRED`。

上述状态不能证明现实行动，但也不撤销用户已明确提交的 Departure Receipt。

必须安全扣留：

- `IDENTITY_MISMATCH`；
- `RECOVERY_CANDIDATE_INVALID`；
- `USER_DATA_CLEARED`；
- 不合法 schema 或 immutable tuple 改写。

### 3.5 Typed Proof

下一刀应建立只读：

```ts
type RealityChoiceLineageProof = Readonly<{
  schemaVersion: "XINMAI_REALITY_CHOICE_LINEAGE_PROOF_V1";
  proofReferenceId: string;
  encounterCycleId: string;
  intentReferenceId: string;
  identityReferences: RealityEncounterIdentityReferences;
  origin: "CHOICE_CONTINUATION";
  qualification: "CHOICE_ACTION_INTENTION_COMMITTED";
  choiceActionIntentionReferenceId: string;
  routeTarget: "/reality";
  issuedAt: string;
  observedIntentRevision: number;
  observedCanonicalRevision: number;
  observedFencingToken: number;
  observedLifecycle: RealityAdventureContinuityLifecycle;
  observedTerminalReason: RealityEncounterTerminalReason | null;
  observedAt: string;
}>;
```

`proofReferenceId` 只由 immutable tuple 生成，不包含 observed revision 或时间。

Page、Route 与 Surface 不能自行构造该 Proof。

### 3.6 Proof Reader

唯一方向：

```text
XinmaiChoiceReturningRealityProofAdapter
↓
readRealityAdventureContinuity({ kind: ENCOUNTER })
```

Adapter 只读，不写 Reality 或 Growth。

结果至少区分：

```text
FOUND_VALID
NOT_FOUND
STORAGE_UNAVAILABLE
OPEN_BLOCKED
RECOVERY_CORRUPTED
SCHEMA_UNSUPPORTED
IMMUTABLE_TUPLE_MISMATCH
VERSION_REGRESSION
TERMINAL_SOURCE_INVALID
```

除 `FOUND_VALID` 外均不得推进 Receipt。

---

## 四、Growth 对象边界

### 4.1 Choice

Choice 继续拥有：

- 用户选择的 Action Route snapshot；
- source encounter；
- target encounter binding；
- Gravity Observation；
- action intention revision；
- `COMMITTED / REPORTED / CLOSED` 等意愿生命周期。

Choice 不拥有：

- Departure 事实；
- Return 事实；
- Lived Response 结果。

新正式链不再依赖 Choice `AWAITING_RETURN` 作为 Provenance。

### 4.2 Departure Receipt

新增到 Growth Canonical Envelope：

```text
choiceExplicitDepartureReceipts[]
```

每条 Choice lineage 最多一个当前有效 Receipt。

拥有：

- explicit Departure command；
- Choice / Route / Observation / source/target cycle binding；
- Reality Proof snapshot；
- Receipt lifecycle 与 revision。

不拥有行动结果。

### 4.3 Return Receipt

新增到 Growth Canonical Envelope：

```text
choiceExplicitReturnReceipts[]
```

每条有效 Departure 最多一个当前有效 Return Receipt。

拥有：

- explicit Return command；
- Departure binding；
- Return revision；
- Fact consumption state。

不拥有行动结果。

### 4.4 Fact

Fact Authority 保持唯一。

新第一份 Fact 必须消费：

```text
valid Departure Receipt
+ valid Return Receipt
+ fresh RealityChoiceLineageProof snapshot
```

已有合法 Fact 继续按既有 Authority 恢复，不补造 Receipt。

### 4.5 唯一性不变量

Growth 事务必须验证：

```text
每个 choiceActionIntentionReferenceId
→ 最多 1 个有效 Departure Receipt

每个 departureReceiptReferenceId
→ 最多 1 个有效 Return Receipt

每个 returnReceiptReferenceId
→ 最多被 1 个当前 Fact lineage 消费

每个 targetEncounterCycleId
→ 最多绑定 1 个 Choice lineage
```

所有检查都在 Growth `readwrite` transaction 内基于最新 Envelope 执行。

按钮禁用、页面锁、Web Lock 或本地 React 状态不承担唯一性。

---

## 五、Schema 迁移裁决

### 5.1 必须升级 Canonical Envelope

当前：

```text
XINMAI_LIVED_GROWTH_RECOVERY_V1
```

目标：

```text
XINMAI_LIVED_GROWTH_RECOVERY_V2
```

V2 在保留所有 V1 字段的基础上新增：

```ts
choiceExplicitDepartureReceipts: readonly ChoiceExplicitDepartureReceipt[];
choiceExplicitReturnReceipts: readonly ChoiceExplicitReturnReceipt[];
```

### 5.2 不推荐新增 Object Store

现有 Growth Canonical Envelope 的所有正式 mutation 已在同一个严格 `readwrite` transaction 中串行。

P0 推荐：

- Receipt 进入 Canonical Envelope；
- 在 `hasCanonicalUniquenessConflict()` 等价校验中增加 Receipt 唯一性；
- 继续由单一 canonical store 写入；
- 不新增第三个数据库；
- 不新增 Receipt direct writer；
- 不引入 Web Lock Authority。

因此物理 IndexedDB version 可以保持 `2`。

若实施者希望新增 Receipt index store，则必须升级数据库 version 并重新审查，不属于本推荐最小方案。

### 5.3 V1 → V2 结构迁移

迁移必须发生在现有 Growth `readwrite` transaction 中：

```text
读取 canonical V1
↓
完整验证现有 Choice / Fact / Eligibility / Formation
↓
构造 canonical V2
  原资产逐项原样保留
  Departure Receipts = []
  Return Receipts = []
↓
同事务写 canonical V2
+ Canonical Schema Migration Meta
↓
transaction complete
```

空 Receipt 集合是结构升级，不是语义 backfill。

### 5.4 Migration Meta

建议在现有 migration meta store 增加独立记录：

```text
id = CANONICAL_GROWTH_V1_TO_V2
sourceSchema = XINMAI_LIVED_GROWTH_RECOVERY_V1
targetSchema = XINMAI_LIVED_GROWTH_RECOVERY_V2
sourceCanonicalRevision
targetCanonicalRevision
status = MIGRATED | NOT_REQUIRED | CONFLICT | CORRUPTED
noSemanticBackfill = true
migratedAt
```

不需要新增 object store。

### 5.5 Legacy localStorage

既有 localStorage V1 继续：

```text
READ ONLY
NO BACKFILL
NON-AUTHORITATIVE
```

必须保留专用 V1 validator。

不能直接把全局 schema constant 改成 V2，导致 legacy V1 被误判 corrupted。

首次合法导入 V1 时直接构造 V2，Receipt 集合保持空。

### 5.6 已有合法 Fact

V1 中已存在的合法：

- Fact；
- Eligibility；
- Formation Receipt；
- Crystal；
- Archive projection；

全部原样保留。

不得因为没有新 Departure / Return Receipt：

- 删除；
- 降级；
- 重新形成；
- 补造 Receipt；
- 阻断只读恢复。

已有 Fact 的修正与撤回继续由现有 Fact lineage 管理；不能把一次修正误当作新的首次回访。

---

## 六、确定性 ID 冻结

### 6.1 Reality Proof ID

```text
reality-choice-lineage-proof:
intentReferenceId
+ encounterCycleId
+ choiceActionIntentionReferenceId
+ identityKey
```

### 6.2 Departure Receipt ID

```text
choice-departure-receipt:
choiceActionIntentionReferenceId
+ targetEncounterCycleId
+ actionRouteReferenceId
+ actionRoutePrototypeVersion
+ choiceRevisionAtDeparture
```

同一 explicit command 重试得到同一 ID。

### 6.3 Return Receipt ID

```text
choice-return-receipt:
departureReceiptReferenceId
+ returnRevision(1)
```

P0 同一 Departure 只有一个当前 Return，所以初始 revision 固定为 `1`。

重复点击返回 `ALREADY_RETURNED`，不创建 revision 2。

### 6.4 Growth Command ID

```text
DEPART：
growth-command:choice-explicit-departure:<departureReceiptReferenceId>

RETURN：
growth-command:choice-explicit-return:<returnReceiptReferenceId>

FACT：
沿用现有 candidate-based command id
+ expectedReturnReceiptReferenceId
+ expectedReturnReceiptRevision
```

### 6.5 Fact ID

现有规则：

```text
lived-response:<choiceActionIntentionReferenceId>:<factRevision>
```

可以保持。

Receipt 不进入 Fact ID，但必须进入 Fact provenance 与事务校验。

### 6.6 禁止 ID 材料

- `createdAt`；
- `returnedAt`；
- 页面 mount 次数；
- 当前 tab ID；
- DOM selector；
- Motion / Reduced Motion；
- 等待时长。

---

## 七、Explicit Departure Saga

### 7.1 正式顺序

```text
用户点击 USER_ENTERS_REAL_WORLD_WITH_CHOICE
↓
读取 Growth Choice typed snapshot
↓
请求或恢复 Reality Choice Continuation Intent
↓ Reality transaction complete
得到 RealityChoiceLineageProof
↓
Growth transaction：
  重读最新 Choice
  校验 COMMITTED / identity / route / observation
  校验 target cycle 尚未被其他 Choice 使用
  校验 proof immutable tuple
  绑定 targetEncounterCycleId
  写唯一 Departure Receipt
↓ Growth transaction complete
DEPARTURE_CONFIRMED
↓
Presentation 才显示离场成立
```

### 7.2 Reality Intent 幂等

当前 `requestRealityEncounter()` 已能在以下条件复用 READY intent：

- 同一 active identity；
- 同一 origin；
- 同一 qualification；
- 同一 Choice reference；
- 尚未过期。

新 Saga 必须在请求新 Intent 前优先：

1. 读取 Choice 上已绑定的 target cycle；
2. 按 target cycle 读取现有 Proof；
3. 若未绑定，再查找同一 active identity 的 matching READY Intent；
4. 只有确认不存在可复用 Intent 时才创建新 cycle。

### 7.3 Intent 成功、Growth 失败

结果：

```text
Reality：可能存在 READY target intent
Growth：无 Departure Receipt
用户反馈：不得成功
Admission：RESUME_COMMITTED 或 SAFE_WITHHELD
```

补偿：

- 保留 matching READY Intent 供同一 command 重试；
- 不自动导航；
- 不自动创建 Return；
- 不生成第二 target cycle；
- tab 崩溃后通过 active identity + Choice reference 重获；
- Intent 已过期时，用户重新明确点击后可生成新 cycle；
- 若出现多个 matching Intent，进入 `SAFE_WITHHELD`，不得猜测赢家。

不要求自动删除或回滚 Reality record。

### 7.4 Growth 成功、Presentation 失败

结果：

```text
Departure Receipt：正式成立
UI：可能未展示成功
```

恢复：

- 下次读取进入 `AWAITING_EXPLICIT_RETURN`；
- 不再次写 Departure；
- 不回滚用户明确离场事实；
- 导航失败只影响 Presentation，不影响 Receipt。

### 7.5 同标签重复点击

- 第一次 transaction complete 后按钮进入已确认状态；
- 晚到第二次 command 通过确定性 ID 返回 `ALREADY_DEPARTED`；
- 不增加 Choice revision；
- 不创建新 target cycle。

### 7.6 双标签并发

两个标签可以各自读到同一 COMMITTED Choice。

Growth `readwrite` transaction 串行后：

- 第一个写入唯一 Departure Receipt；
- 第二个重读最新 Envelope；
- exact same ID → `ALREADY_DEPARTED`；
- different target proof → `STALE_TARGET_PROOF / SAFE_WITHHELD`；
- 最终有效 Departure Receipt 数量 = 1。

---

## 八、Explicit Return Saga

### 8.1 正式顺序

```text
Recovery Adapter = AWAITING_EXPLICIT_RETURN
↓
用户点击 USER_EXPLICITLY_RETURNS_TO_CHOICE
↓
读取 Departure Receipt typed snapshot
↓
按 targetEncounterCycleId 重新读取 Reality Proof
↓
校验 immutable tuple + monotonic versions
↓
Growth transaction：
  重读 Choice
  重读 Departure Receipt
  校验仍有效、未关闭、未被另一 Return 消费
  校验 fresh Proof snapshot 与 stored Proof 一致
  写唯一 Return Receipt
  Departure Receipt = RETURNED
↓ Growth transaction complete
READY_FOR_LIVED_RESPONSE
```

### 8.2 App 打开不是 Return

以下只触发 read：

- App 启动；
- Launch mount；
- visibility change；
- refresh；
- Back/Forward；
- push notification；
- 时间经过。

无 explicit command 时，Growth mutation 数量必须为 `0`。

### 8.3 Reality 读取失败

| Reality Read | Growth Mutation | Admission |
|---|---:|---|
| unavailable | 0 | `SAFE_WITHHELD` |
| blocked | 0 | `SAFE_WITHHELD` |
| corrupted | 0 | `SAFE_WITHHELD` |
| schema unsupported | 0 | `SAFE_WITHHELD` |
| immutable tuple mismatch | 0 或显式 invalidation transaction | `SAFE_WITHHELD` |
| version regression | 0 | `SAFE_WITHHELD` |
| valid forward revision | 允许 | 继续校验 |

Temporary unavailable 不得永久 invalidation。

只有确定性 mismatch 才允许在 Growth transaction 中把未消费 Receipt 标记 `INVALIDATED`；仍保留 tombstone。

### 8.4 同标签重试

确定性 Return ID 保证：

- transaction abort → 保持 `AWAITING_EXPLICIT_RETURN`；
- transaction complete → `READY_FOR_LIVED_RESPONSE`；
- 重试 exact ID → `ALREADY_RETURNED`。

### 8.5 双标签并发

- 两个标签都必须重新读取 Proof；
- Growth transaction 串行；
- 只有第一笔创建 Receipt；
- 第二笔返回同一 Receipt 或 stale；
- UI 只在 transaction complete 后显示 READY；
- 最终有效 Return Receipt 数量 = 1。

---

## 九、Lived Response 事务

### 9.1 Cross-store Proof 读取

在提交 Fact 前，Controller 必须先从唯一 Reality Proof Adapter 获取 fresh typed proof。

如果读取失败：

```text
Growth transaction：不开始
Fact：不创建
Return Receipt：不消费
UI：SAFE_WITHHELD
```

### 9.2 Growth 原子事务

```text
fresh typed Reality proof
↓
Growth readwrite transaction：
  重读 Choice
  重读 Departure Receipt
  重读 Return Receipt
  重读当前 Fact / Eligibility / Formation
  校验 immutable proof tuple
  校验 proof observed versions 非倒退
  校验 expected Choice / Receipt / Fact revisions
  写 Lived Response Fact
  Return Receipt = CONSUMED_BY_FACT
  Choice = REPORTED
  使旧 Eligibility 按既有规则失效
↓ transaction complete
CONFIRMED
```

这里的“Proof 复验”是：

- fresh Proof 由 Reality Adapter 在事务前读取；
- Growth 事务内把 fresh Proof 与 Receipt snapshot、Choice immutable refs 比较；
- 不声称 Reality 与 Growth 同时提交；
- Reality forward lifecycle revision 不改变 immutable lineage。

### 9.3 事务失败

任一写入失败：

```text
Fact：0
Receipt consumption：0
Choice state advance：0
UI success：0
```

### 9.4 事务成功、UI 崩溃

Canonical Fact、Consumed Receipt 与 Choice REPORTED 已同事务成立。

刷新后进入 `RESUME_REPORTED`，不得再次提交第一份 Fact。

### 9.5 事务后 Reality 暂时不可读

已经在有效 Proof 下完成的合法 Fact 不回滚、不删除。

临时 Reality unavailable：

- 阻止新的 Provenance mutation；
- 不破坏既有 Fact、Eligibility、Crystal；
- 等待重新验证。

若之后发现 immutable tuple 被非法改写：

- 已有 Fact 与 Growth 资产进入只读隔离；
- 不自动删除；
- 不生成新 Eligibility / Crystal；
- 进入专项数据完整性审查。

### 9.6 已有合法 Legacy Fact

已有 Fact 是此前已关闭 Authority 的合法资产。

迁移后：

- 允许只读恢复；
- 允许既有 Fact lineage 的撤回与合规修正；
- 不补造 Departure / Return Receipt；
- 不重新形成 Crystal；
- 不把它当作新回访入口。

---

## 十、崩溃与补偿矩阵

| 停止点 | 已确认事实 | 恢复动作 | 用户成功反馈 |
|---|---|---|---|
| Reality Proof 读取前 | Choice only | `RESUME_COMMITTED` | 否 |
| Reality request abort | Choice only | retry | 否 |
| Reality intent complete、Growth 未开始 | matching READY Intent | 重获同一 Intent | 否 |
| Growth Departure transaction abort | 无 Receipt | same-command retry | 否 |
| Departure transaction complete、UI crash | Departure Receipt | `AWAITING_EXPLICIT_RETURN` | 下次恢复 |
| Return Proof read fail | Departure Receipt | `SAFE_WITHHELD` | 否 |
| Return transaction abort | Departure Receipt | retry | 否 |
| Return transaction complete、UI crash | Return Receipt | `READY_FOR_LIVED_RESPONSE` | 下次恢复 |
| Fact Proof read fail | Return Receipt | `SAFE_WITHHELD` | 否 |
| Fact transaction abort | Return Receipt 未消费 | retry | 否 |
| Fact transaction complete、UI crash | Fact + consumed Receipt | `RESUME_REPORTED` | 下次恢复 |
| Growth DB blocked | 原资产不变 | `SAFE_WITHHELD` | 否 |
| Reality DB blocked | 原资产不变 | `SAFE_WITHHELD` | 否 |
| Connection close | 原资产不变 | retry/read recovery | 否 |
| Schema conflict | 原资产只读 | `SAFE_WITHHELD` | 否 |
| Multiple matching Reality proofs | 无猜测 | `SAFE_WITHHELD` | 否 |

### 10.1 Compensation 类型冻结

优先级：

```text
1. Idempotent retry
2. Fresh source revalidation
3. Definitive mismatch → invalidated tombstone
4. Unavailable / ambiguous → SAFE_WITHHELD
```

禁止：

- 删除 Reality record；
- 回滚合法 Fact；
- 选择“最后写入者”；
- 用时间挑选赢家；
- 恢复旧页面旁路；
- 普通 git revert 作为产品补偿。

---

## 十一、旧 `AWAITING_RETURN` 处置

冻结：

```text
AWAITING_RETURN without Departure Receipt
→ TARGET_REALITY_BOUND_UNPROVEN
```

它不能进入：

- `AWAITING_EXPLICIT_RETURN`；
- `READY_FOR_LIVED_RESPONSE`；
- Fact Authority；
- Eligibility；
- Crystal。

恢复选择：

1. 若仍能读取同一 Choice + target Reality proof，展示“重新确认带着这一步离场”；
2. 用户明确点击后创建新的正式 Departure Receipt；
3. 不改变 target cycle，除非原 proof 已过期且用户重新发起；
4. 无法明确复验时 `SAFE_WITHHELD`。

禁止自动 backfill。

历史 `REPORTED` + Fact、Receipt / Crystal 继续按更高资产恢复。

---

## 十二、消费者原子切换

### 12.1 必须同一 Runtime 提交完成

```text
Growth Envelope V2 migration
+ Reality Proof Adapter
+ Returning Provenance Controller
+ Five-state Admission Resolver
+ Choice Departure consumer
+ Launch Returning consumer
+ Lived Response Fact receipt consumption
+ legacy AWAITING_RETURN isolation
+ old open-item entry deletion
+ Pointer Fix behind READY
+ Motion / Reduced Motion parity
+ dedicated Gates
```

### 12.2 消费者矩阵

| 消费者 | 当前 | 目标 | 裁决 |
|---|---|---|---|
| Gravity Choice `RESUME_COMMITTED` | 继续 Reality + bind | explicit Departure command | MIGRATE |
| `bindChoiceActionIntentionToRealityEncounter` | 写 `AWAITING_RETURN` | bind + Receipt 同 Growth transaction | MIGRATE |
| Reality Intent Controller | 生成 target cycle | 保持 | KEEP |
| Reality Continuity Store | Runtime Authority | typed read proof | KEEP |
| Explicit Leave Controller | 通用 Reality 离场 | 不参与 Choice Departure | ISOLATE |
| `readOpenXinmaiLivedGrowthReturnItems` | 广义开放列表 | 删除生产 Admission 职责 | DELETE / ADAPT INTERNAL |
| LaunchLab | 非空即表单 | 消费五态 Admission | MIGRATE |
| Returning Surface | raw returnItems | READY Proof only | MIGRATE INPUT |
| `confirmLivedResponseFact` | AWAITING_RETURN 即可 | consume Return Receipt | MIGRATE |
| Choice Growth Terminal Summary | Choice/Fact 优先级 | 加 Receipt-aware summary | ADAPT |
| Growth Recovery revision observer | Growth 重读通知 | 保持，只通知重读 | KEEP |
| Reality revision observer | Reality 重读通知 | 接入 Adapter | ADAPT |
| Route | 可携带 state | 不生产 Receipt | REJECT AUTHORITY |
| Page local state | 控制交互 | 不生产 Admission | REJECT AUTHORITY |
| DOM / Timer | Presentation | 无 Authority | REJECT |
| Motion / Reduced Motion | 可能表现分支 | 同一 Admission | ADAPT PRESENTATION |
| Acceptance Fixture | 辅助测试 | 不进生产 Bundle / Authority | ISOLATE |

### 12.3 禁止双路径

以下任一中间态不得推送：

```text
新 READY Proof + 旧 open-item Surface
```

```text
新 Receipt writer + 旧 AWAITING_RETURN writer
```

```text
新 Fact Receipt 校验 + 旧页面直接 confirm
```

```text
Pointer enabled + Admission 未切换
```

---

## 十三、`33ae0ba…` 合入审计

`33ae0ba…` 仅包含：

```text
XinmaiLivedResponseReturnSurface：pointerEvents = auto
+ 对应 Gate
```

裁决：

```text
Core：KEEP
Original SHA：DO NOT PUSH
Application：REAPPLY EXACT DIFF IN FINAL ATOMIC CANDIDATE
```

最终条件：

```text
Admission = READY_FOR_LIVED_RESPONSE
↓
Surface mounted
↓
Pointer target enabled
```

其他四态不挂载该表面。

Counter-commit 必须可以暂停 READY Surface，而不恢复 Canvas 遮挡作为业务 Gate。

---

## 十四、Application 文件边界

以下是推荐单提交清单，最终由 Runtime Application 在施工前按远程基线再次精确确认。

### 14.1 新增

```text
src/types/xinmaiChoiceReturningProvenance.ts
src/services/xinmaiChoiceReturningProvenanceController.ts
src/services/xinmaiChoiceReturningProvenanceRecoveryAdapter.ts
src/services/xinmaiChoiceReturningRealityProofAdapter.ts
src/services/xinmaiChoiceReturningProvenanceMutationPolicy.ts

scripts/check-xinmai-choice-returning-provenance-schema.mjs
scripts/check-xinmai-choice-explicit-departure-transaction.mjs
scripts/check-xinmai-choice-explicit-return-transaction.mjs
scripts/check-xinmai-lived-response-return-receipt-consumer.mjs
scripts/check-xinmai-choice-returning-cross-store-boundary.mjs
scripts/check-xinmai-choice-returning-legacy-no-backfill.mjs
scripts/check-xinmai-choice-returning-safe-withheld-counter.mjs
```

### 14.2 修改

```text
src/types/xinmaiChoiceActionIntention.ts
src/types/xinmaiLivedGrowthRecovery.ts
src/types/xinmaiLivedGrowthTransaction.ts
src/types/xinmaiLivedGrowthTransactionalStore.ts

src/services/xinmaiLivedGrowthRecoveryPersistenceAdapter.ts
src/services/xinmaiLivedGrowthTransactionalStore.ts
src/services/xinmaiLivedGrowthTransactionAuthority.ts
src/services/xinmaiChoiceActionIntentionController.ts
src/services/xinmaiChoiceGrowthTerminalSummaryAdapter.ts
src/services/xinmaiLivedResponseAuthorityController.ts

src/pages/GravityPage.tsx
src/pages/LaunchLab.tsx
src/components/XinmaiLivedResponseReturnSurface.tsx

scripts/check-xinmai-choice-action-intention-boundary.mjs
scripts/check-xinmai-lived-response-authority.mjs
scripts/check-xinmai-lived-growth-browser-acceptance-surface.mjs
package.json
```

### 14.3 Reality 侧最小修改

推荐只新增 typed read adapter，复用：

```text
readRealityAdventureContinuity({ kind: ENCOUNTER })
```

不修改：

- Reality transaction success semantics；
- Reality schema；
- Intent Controller ownership；
- Route Admission；
- Pressure / Gravity Authority。

如果施工发现必须修改 Reality DB schema、Intent immutable tuple 或增加第二 Writer，立即停止并回到审计。

### 14.4 禁止范围

- Renderer；
- Pressure Seed；
- Action Route 产品语义；
- Gravity Observation Authority；
- Eligibility / Formation 规则；
- Crystal 视觉；
- Body Imprint；
- AI；
- Phase 4；
- 商业化。

---

## 十五、Gate 原子切换

未来必须建立并注册：

1. Growth Envelope V2 Schema Gate；
2. Canonical V1 → V2 No Semantic Backfill Gate；
3. Reality Immutable Lineage Proof Gate；
4. Cross-store Atomic Claim Forbidden Gate；
5. Deterministic Departure Receipt Gate；
6. Deterministic Return Receipt Gate；
7. Single Departure Per Choice Gate；
8. Single Return Per Departure Gate；
9. Explicit User Action Required Gate；
10. Browser Lifecycle Mutation Forbidden Gate；
11. Five-state Admission Gate；
12. Ready-only Surface Mount Gate；
13. Fact + Return Receipt Atomic Consumption Gate；
14. Legacy Awaiting Return No Backfill Gate；
15. Old Open Growth Item Entry Forbidden Gate；
16. Page / Route / DOM / Timer Authority Forbidden Gate；
17. Motion / Reduced Motion Semantic Parity Gate；
18. Pointer Fix Admission Alignment Gate；
19. Cross-tab Duplicate Receipt Forbidden Gate；
20. Forward Safe Withheld Counter Gate。

旧 Gate 只能在新 Gate 同提交建立后校准。

---

## 十六、真实浏览器并发矩阵

### 16.1 Departure

- 单标签正常 Departure；
- 双击；
- 两标签同时 Departure；
- Reality open blocked；
- Reality transaction abort；
- Growth open blocked；
- Growth transaction abort；
- Intent complete 后 tab crash；
- Receipt complete 后 tab crash；
- matching READY Intent 重试；
- Intent expiry 后用户重新明确发起；
- 多个 matching Intent → safe withheld。

### 16.2 Return

- App 打开但不点击；
- Refresh；
- Back/Forward；
- 一天后打开；
- 通知进入；
- 单标签 explicit Return；
- 双标签 explicit Return；
- old tab stale Return；
- Reality unavailable / blocked / corrupted；
- version regression；
- immutable tuple mismatch；
- identity mismatch；
- target cycle mismatch。

### 16.3 Fact

- READY 后 `ATTEMPTED`；
- `CHANGED_RESPONSE`；
- `NOT_ATTEMPTED`；
- `UNABLE_TO_CONTINUE`；
- 拒绝记录；
- Candidate 未确认；
- Fact transaction abort；
- Return Receipt consumption 写入失败；
- UI crash after complete；
- 两标签同时确认；
- stale Fact revision；
- existing Eligibility / Formation；
- legacy Fact read-only recovery。

### 16.4 Presentation

- 五态分别可见；
- 非 READY 命中目标数量 = 0；
- READY 窄视口真实命中；
- Motion 与原生 Reduced Motion 同一 Admission；
- Storage loading 不折叠为 COMMITTED；
- `SAFE_WITHHELD` 不阻断生命空间；
- Production Bundle 不包含 Acceptance authority。

### 16.5 核心计数

```text
同一 Choice：
Departure Receipt = 1

同一 Departure：
Return Receipt = 1

同一 Return：
当前首次 Fact lineage = 1

旧 open-item Surface consumer = 0
Direct Storage Writer outside Growth Authority = 0
Cross-store atomic success claim = 0
```

---

## 十七、Forward Counter-commit

Runtime Candidate 推送前必须实际预演新的 forward counter-commit。

结果必须是：

```text
New Departure Mutation：PAUSED
New Return Mutation：PAUSED
New First Lived Response Mutation：PAUSED

Five-state Recovery：READ ONLY
Existing Choice：PRESERVED
Existing Fact / Eligibility / Formation / Crystal：PRESERVED
Reality Continuity：READ ONLY
Legacy Awaiting Return：NOT REACTIVATED
Old Open-item Surface：NOT RESTORED
Pointer Reachability：可保留，但 READY Surface 不开放
```

Counter-commit 不得：

- 降级 Envelope V2；
- 删除 Receipt；
- 恢复 V1 Writer；
- 恢复 `COMMITTED → Lived Response`；
- 恢复 DOM 或 Timer Authority；
- 普通 revert 整个 Migration。

---

## 十八、Application 原子提交边界

推荐 Runtime Application 必须是一个提交：

```text
Envelope V2 migration
+ Receipt schema and controller
+ Reality Proof Adapter
+ Departure Saga
+ Return Saga
+ Fact Receipt Consumption
+ Five-state Recovery
+ Consumers cutover
+ Legacy isolation
+ Pointer diff
+ Gates
```

成功只表示：

```text
Returning Provenance Runtime Authority：ESTABLISHED
```

不自动表示：

- Phase 3 PASSED；
- Phase 3 P1 CLOSED；
- Visual Runtime 解锁；
- Phase 4 解锁。

完成后必须独立进行远程 Causal Closure Revalidation。

---

## 十九、审计出口判定

### A｜现有 Growth 事务域能否承载 Saga

```text
YES
```

依据：

- 单一 Canonical Envelope；
- IndexedDB `readwrite` 串行；
- transaction complete 成功真源；
- 既有多标签恢复与 revision observer；
- Fact 可与 Return Receipt 在同事务写入。

### B｜是否需要 Schema 升级

```text
YES — Canonical Envelope V1 → V2
```

但推荐方案：

```text
新 Database：NO
新 Object Store：NO
Physical DB Version Upgrade：NO
Second Writer：NO
```

### C｜Reality Proof 是否稳定

```text
YES — IMMUTABLE TUPLE + VERSIONED MUTABLE LIFECYCLE
```

前提是实施建立不可变字段 Gate，并只把 revision/fencing 用于复验，不冒充跨库 CAS。

### D｜半事务是否可补偿

```text
YES — IDEMPOTENT RETRY + REVALIDATION + SAFE_WITHHELD
```

不需要破坏性删除或跨库 rollback。

### E｜最终出口

```text
NOW — SCHEMA-AWARE MIGRATION APPLICATION READY
```

---

## 二十、下一刀

```text
XINMAI-CHOICE-DEPARTURE-RETURNING-
PROVENANCE-AUTHORITY-SCHEMA-AWARE-
CORRECTIVE-ATOMIC-MIGRATION-P0

交通灯：
RED

刀型：
Migration Blade / Schema-aware Saga Cutover

决策：
DEFER — WAITING PRODUCT CONTROL TOWER RUNTIME AUTHORIZATION

Runtime Candidate Push：
HOLD
```

Application 必须从远程 `f9630a0…` 之后的正式审计基线重新施工，不得推送 `33ae0ba…` 原 SHA，也不得把既存脏工作树纳入。

---

## 二十一、最终输出

```text
Reality Proof：
STABLE IMMUTABLE TUPLE

Reality revision / fencing：
MONOTONIC OBSERVATION ONLY
NOT CROSS-STORE CAS

Growth Receipt Owner：
SINGLE EXISTING TRANSACTION AUTHORITY

Departure ID：
DETERMINISTIC

Return ID：
DETERMINISTIC

Fact Consumption：
ATOMIC WITH RETURN RECEIPT IN GROWTH DB

Canonical Schema：
V1 → V2 REQUIRED

Physical DB Version：
KEEP 2 IN RECOMMENDED PLAN

No Backfill：
PASS

Existing Growth Assets：
PRESERVE

Legacy AWAITING_RETURN：
TARGET_REALITY_BOUND_UNPROVEN

Old Open-item Entry：
DELETE AS PRODUCTION ADMISSION

33ae0ba：
REAPPLY EXACT DIFF BEHIND READY

Cross-store Atomic Claim：
REJECT

审计出口：
NOW — SCHEMA-AWARE MIGRATION APPLICATION READY

Phase 3 P1：
OPEN

Visual Runtime：
DEFER

Phase 4：
LOCKED
```
