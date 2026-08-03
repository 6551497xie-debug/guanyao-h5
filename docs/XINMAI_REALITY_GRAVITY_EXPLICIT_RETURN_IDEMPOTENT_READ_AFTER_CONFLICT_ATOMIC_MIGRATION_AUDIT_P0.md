# XINMAI Reality / Gravity Explicit Return Idempotent Read-after-conflict Atomic Migration Audit P0

## 0. 裁决摘要

```text
任务：
XINMAI-REALITY-GRAVITY-EXPLICIT-RETURN-
IDEMPOTENT-READ-AFTER-CONFLICT-
ATOMIC-MIGRATION-AUDIT-P0

交通灯：RED
刀型：Migration Audit / Concurrency Corrective Cutover Prep
决策：AUDIT ONLY

Remote：
269e6879daaa18fec4026fe3229e3c14bd3ed98c

拒绝候选：
7b60c71806d9c0ffb63fa1fb7383ba2251b6433b
仅保留为Runtime与并发缺陷证据

旧Forward Counter：
39394e10080b4627c33f81f086a10f19523a7ca1
仅保留为旧候选安全暂停证据
```

三轮正式 public Authority 并发证据已经稳定证明：

```text
同Departure：
DEPARTED + ALREADY_DEPARTED
Receipt = 1
PASS

同Return：
RETURNED + SAFE_WITHHELD(UNIQUE_CONSTRAINT_REJECTED)
Target = 1
Return Receipt = 1
Authority Safety = PASS
Recovery Completeness = FAIL
```

最终资产没有重复，但竞争失败调用没有恢复赢家已经提交的同一 Target，而是把底层唯一约束直接暴露为产品失败。`7b60c718…` 因此不得交付。

本审计冻结的唯一安全模型是：

```text
同一确定性 returnIntentRequestReferenceId
→ 两个请求竞争创建 CHOICE_RETURN Target
→ Reality DB 只允许一个 Target 提交
→ 失败调用只对精确 CHOICE_RETURN unique-conflict 分支启动恢复
→ 独立只读事务读取当前 active identity 的 canonical Target
→ 完整 request / identity / source / lifecycle proof 一致
→ 恢复赢家 Target
→ 两个调用继续进入同一 Growth Return Receipt 事务
→ RETURNED / ALREADY_RETURNED
→ 同一 Target、Intent、Receipt
```

底层 `ConstraintError` 永远不是成功 Authority。只有重新读取的 canonical record 和完整 typed proof 能把一次特定冲突提升为幂等恢复。任一字段不一致、赢家不可见、赢家已终结、旧周期、身份失配或非 `CHOICE_RETURN` 冲突，均保持 `SAFE_WITHHELD`。

最终裁决：

```text
NOW — CORRECTIVE ATOMIC MIGRATION APPLICATION READY
```

新 Runtime Candidate 必须从未来交付时的最新 Remote HEAD 重新组成。本次冻结为：从当前 Remote `269e687…` 将原生命周期 reconciliation 修复与本审计的 Return read-after-conflict 修复组成一个单一原子提交。不得在拒绝候选 `7b60c718…` 上追加后直接推送。

---

## 1. 审计边界与证据

### 1.1 只读对象

本审计只读检查了：

- `XinmaiRealityEncounterIntentController`；
- Reality Adventure continuity transactional store 与 types；
- `XinmaiChoiceReturningProvenanceController`；
- Choice Departure reconciliation proof / lifecycle Owner；
- Choice Returning Reality Proof Adapter；
- Returning Admission / Recovery Adapter；
- `XinmaiLivedResponseReturnSurface` 与后续 `/reality` handoff；
- 拒绝候选相对 Remote 的完整 Runtime diff；
- 三轮同 Departure / 同 Return public Authority 并发 Harness 报告；
- 旧 Counter 的 mutation pause 与资产保留结果。

本提交不得包含 Runtime、Gate、Storage、Schema、Renderer、CSS 或页面文案修改。

### 1.2 已确认事实

| 事实 | 裁决 |
|---|---|
| 同 Departure 真实重叠事务 | `PASS`，确定性 Receipt 唯一 |
| 同 Return 真实重叠事务 | `FAIL`，每轮一个调用暴露 `UNIQUE_CONSTRAINT_REJECTED` |
| 最终 Target / Intent / Receipt 数量 | 各自唯一；没有第二 Authority |
| 唯一索引保护 | `PASS`；阻止第二 active Target |
| 失败调用恢复 | `FAIL`；没有 read-after-conflict |
| Candidate Unique | `YES`，该失败位于拒绝候选新增的 Explicit Return / lifecycle 路径 |
| 旧 Counter | `PASS` 作为旧候选暂停证据；不可复用为新候选交付 Counter |

这里的 `Candidate Unique = YES` 指 Return concurrency recovery 缺口属于 `7b60c718…` 所实现的新交付路径；不是说底层 unique index 是新引入的。该 index 是既有正确安全边界。

---

## 2. UNIQUE 冲突的精确来源

### 2.1 数据库与物理约束

```text
Database：xinmai-reality-adventure-continuity
Physical version：1
Object Store：reality-adventure-encounter-continuity
Primary keyPath：encounterCycleId
```

Store 创建的 canonical indexes 全部是 `unique: true`：

```text
activeIdentityKey
intentReferenceId
recognitionReceiptReferenceId
gravityTransferReferenceId
gravityAdmissionReferenceId
gravityCycleId
gravityObservationReferenceId
```

本次同 Return 竞争实际冲突的是：

```text
index：activeIdentityKey
key：
sourceReferenceId
:: starBeastIdentityReferenceId
:: mansionCoordinateReferenceId
```

### 2.2 为什么不是 Target primary key 或 intentReferenceId

`requestRealityEncounter()` 每次创建 Target 时使用新的 opaque ID：

```text
intentReferenceId = reality-intent:<new opaque id>
encounterCycleId  = reality-encounter:<new opaque id>
```

两个并发调用因此具有不同的 Target primary key 与不同的 `intentReferenceId`。它们共享的是：

- 同一 identity；
- 同一 source Encounter；
- 同一 Choice；
- 同一 Departure Receipt；
- 同一确定性 `returnIntentRequestReferenceId`；
- 同一 `returnAttemptRevision`；
- 因此同一 `activeIdentityKey`。

两次 Reality readwrite transaction 都从已 reconciliation 的 source terminal record 构造新 Target。赢家先提交 active Target；输家随后写入不同 Target 时被 `activeIdentityKey` unique index 拒绝。

### 2.3 事务阶段

冲突发生在：

```text
Reality Encounter Intent creation transaction
→ retained source terminal record put
→ new CHOICE_RETURN Target continuity record put
→ activeIdentityKey unique index ConstraintError
→ transaction abort / SAFE_WITHHELD
```

冲突发生在 Growth Return Receipt 事务之前。此时赢家 Reality Target 已经存在，但赢家或输家都可能尚未完成 Growth Return Receipt 写入。

### 2.4 为什么不能把所有 ConstraintError 当作成功

当前 store 把所有 `ConstraintError` 统一映射为：

```text
UNIQUE_CONSTRAINT_REJECTED
```

该 reason 不携带 index 名或业务语义。它也可能来自：

- 随机 ID 极端碰撞；
- 其他 unique index；
- 不同 request 占用同一 identity；
- stale / unrelated active cycle；
- retained record 与新 record 的其他 cross-field 异常。

因此底层 store 不得把该 reason 改写为 `READY`。只有上层 `CHOICE_RETURN` request 分支，在重新读取 canonical active record 并完成全字段 typed validation 后，才允许恢复。原始 `UNIQUE_CONSTRAINT_REJECTED` 仍是最后存储防线，而不是幂等 success code。

---

## 3. 幂等请求身份与不可变真源

### 3.1 两阶段匹配

Return Saga 在两个数据库中分两阶段成立：

```text
R1 — Reality Target commit / recovery
G2 — Growth Return Receipt commit / recovery
```

`returnReceiptReferenceId` 在 R1 时尚未必存在，不能被错误设为恢复 Reality Target 的前置条件。否则合法的“Target 已提交、Growth Receipt 尚未写入”崩溃窗口永远无法恢复。

因此必须冻结为：

```text
R1：校验完整 Return Request Identity
G2：再校验 / 创建确定性 Return Receipt
```

两个阶段合起来覆盖总控要求的全部字段。

### 3.2 R1：Reality Target 恢复匹配

| 字段 | 正式来源 | R1要求 |
|---|---|---|
| `identityKey` | 三个 canonical identity references 确定性派生 | 必须精确相等 |
| `sourceReferenceId` | Choice / Departure / target record identity | 必须精确相等 |
| `starBeastIdentityReferenceId` | 同上 | 必须精确相等 |
| `mansionCoordinateReferenceId` | 同上 | 必须精确相等 |
| `choiceActionIntentionReferenceId` | Choice V2 + Departure + target Intent | 必须精确相等 |
| Choice lineage | source Encounter + Departure reconciliation + gravity observation proof | 必须由 source reconciliation 复验，不从页面补齐 |
| `departureReceiptReferenceId` | Growth Departure Receipt | 必须精确相等 |
| `departureReconciliationReferenceId` | source Reality record V2 | 必须精确相等且 current |
| `returnIntentRequestReferenceId` | Departure Receipt + `returnAttemptRevision` 确定性派生 | 必须精确相等 |
| `returnAttemptRevision` | current Growth envelope | 必须精确相等且大于0 |
| `sourceEncounterCycleId` | Choice / Departure / source reconciliation | 必须精确相等 |
| target purpose | `origin=CHOICE_RETURN` + `qualification=EXPLICIT_RETURN_TO_CHOICE` | 必须精确相等 |
| target Intent / Cycle | canonical winner record | 作为恢复输出；record 与 intent 必须互相一致 |
| target lifecycle | canonical winner record | 只允许本节冻结的可恢复状态 |

`actionRouteReferenceId` 与 `gravityObservationReferenceId` 不是 Target Intent 的直接字段，不能在冲突恢复时由页面或 DOM 拼装。它们由 current Departure Receipt 与 source reconciliation proof 间接复验，并在 G2 Growth transaction 中再次由 canonical Choice / Departure / Reality proof 验证。

### 3.3 R1允许恢复的 lifecycle

同 Return 冲突发生在 Target 新建阶段，合法 winner 必须处于：

```text
record.lifecycle = REALITY_PENDING
intent.state = READY_TO_ENTER_REALITY
record.activeIdentityKey = deterministic identity key
intent.failure = null
intent.terminalReason = null
intent.routeTarget = /reality
```

以下状态均不得作为本次 conflict success：

- source 或 target `TERMINAL`；
- `ACTIVE_IN_REALITY` / `REALITY_ACTIVE`；
- `ACCEPTING_REALITY`；
- `FAILED_RETRYABLE`；
- active key 缺失或指向其他 record；
- 同 request 但 identity、source、Departure 或 reconciliation 任一不一致。

如果目标已经进入后续 lifecycle，Recovery Adapter 应由 Return Receipt / Reality Proof 的正式恢复路径处理；不得借一次新的 unique conflict 猜测成功。

### 3.4 G2：Return Receipt 匹配

R1 得到 canonical Target 后，Growth transaction 必须使用确定性引用：

```text
returnReceiptReferenceId = stable(
  "choice-return",
  departureReceiptReferenceId,
  returnAttemptRevision
)
```

若 Receipt 已存在，必须同时验证：

- `returnReceiptReferenceId`；
- `returnIntentRequestReferenceId`；
- identity；
- Choice；
- Departure Receipt；
- source Encounter；
- target Encounter Cycle；
- `returnAttemptRevision`；
- Reality Proof 中的 target Intent / cycle / fencing / canonical revision；
- state 为当前可恢复的 `READY_FOR_LIVED_RESPONSE`，或由更下游 Admission Resolver 按既有状态恢复。

完整匹配才可 `ALREADY_COMMITTED`。任一不一致必须 `RETURN_RECEIPT_MISMATCH / SAFE_WITHHELD`，不得覆盖赢家 Receipt。

---

## 4. Read-after-conflict协议

### 4.1 唯一Owner

业务恢复必须由 `XinmaiRealityEncounterIntentController` 的 `CHOICE_RETURN` request 分支拥有。Transactional Store 只提供 canonical read/write 与原始 failure reason，不解释产品幂等性。

建议内部唯一 primitive：

```text
recoverExactChoiceReturnTargetAfterUniqueConflict()
```

它只能由 `requestRealityEncounter(origin=CHOICE_RETURN)` 在以下条件全部成立时调用：

```text
transaction.status = SAFE_WITHHELD
transaction.reason = UNIQUE_CONSTRAINT_REJECTED
original request passed CHOICE_RETURN validation
source Departure reconciliation precondition was current
```

普通 `RETURNING_LIFE_WORLD`、`FIRST_ENCOUNTER`、其他 store mutation 和其他 `ConstraintError` 不得调用该 primitive。

### 4.2 正式算法

```text
1. 赢家 Reality readwrite transaction 完成。

2. 输家收到精确 UNIQUE_CONSTRAINT_REJECTED。

3. 关闭失败 transaction；不得复用其 snapshot。

4. 开启新的独立 readonly transaction：
   lookup ACTIVE_IDENTITY by deterministic identityKey。

5. 若读取 FOUND：
   a. 复验 target record / intent 全部R1字段；
   b. 重新读取 source Encounter；
   c. 复验 source TERMINAL / EXPLICIT_LEAVE、active key absent、
      Departure reconciliation current；
   d. 构造 typed Exact Choice Return Recovery proof；
   e. 返回同一 canonical Target Intent / Cycle。

6. 若读取 NOT_FOUND：
   允许最多再执行2次新的readonly transaction。
   每次必须等待前一只读事务complete后再开始。
   不使用setTimeout，不以经过时间宣布成功。

7. 三次总读取后仍不可见，或任一读取/校验失败：
   SAFE_WITHHELD。
```

“有限重读”只是允许观察已经提交的 canonical winner；它不创建事实。每次成功 Authority 仍来自新的 readonly transaction 读到的 record，而不是重试次数、微任务、计时器或页面状态。

### 4.3 Typed recovery proof

可以作为 Controller 内部只读值，不需要持久化新 record：

```ts
type ExactChoiceReturnConflictRecovery = Readonly<{
  status: "RECOVERED_EXACT_CHOICE_RETURN";
  activeIdentityKey: string;
  returnIntentRequestReferenceId: string;
  choiceActionIntentionReferenceId: string;
  departureReceiptReferenceId: string;
  departureReconciliationReferenceId: string;
  sourceEncounterCycleId: string;
  returnAttemptRevision: number;
  intentReferenceId: string;
  targetEncounterCycleId: string;
  canonicalRevision: number;
  fencingToken: number;
  intentRevision: number;
  readOnly: true;
}>;
```

该 proof 不写 Storage，不成为第二 Authority；它只说明当前调用读取并确认了 canonical winner。

### 4.4 明确失败结果

建议将冲突恢复失败映射为 typed、不可成功消费的原因：

```text
RETURN_CONFLICT_WINNER_NOT_VISIBLE
RETURN_CONFLICT_PROOF_MISMATCH
RETURN_CONFLICT_SOURCE_NOT_CURRENT
RETURN_CONFLICT_RECOVERY_UNAVAILABLE
```

底层 `UNIQUE_CONSTRAINT_REJECTED` 可保留在诊断边界，但页面不得显示该技术字样。上述所有失败仍是 `BLOCKED / SAFE_WITHHELD`，Target、Receipt 与既有资产保持原样。

### 4.5 明确禁止

- 冲突后再次生成另一个 Target；
- 用输家原本生成的随机 Target ID 覆盖赢家；
- 删除 active winner 以便输家重试；
- 把任意 unique error 映射为 `READY`；
- 只比对 identity 而不比对 request / source / Departure；
- 用 DOM、`data-*`、路由、页面布尔值或 timer 补齐 proof；
- 在读取不到 winner 时伪造 `ALREADY_RETURNED`；
- 因 Reality 冲突回滚或补造 Growth Receipt。

---

## 5. Growth / Reality 跨库语义

### 5.1 正式顺序

```text
Growth Departure Receipt current
+ source Reality Departure reconciliation current
↓
Reality R1：create / exact recover CHOICE_RETURN Target
↓ Reality transaction complete
Reality Proof Adapter fresh read
↓
Growth G2：create / exact recover Return Receipt
↓ Growth transaction complete
RETURNED / ALREADY_RETURNED
```

两个数据库之间没有原子事务。

### 5.2 半事务矩阵

| 状态 | 正式事实 | Recovery |
|---|---|---|
| Reality winner abort，Target未提交 | 无 Target，无 Return Receipt | 不得恢复成功；下次明确Return重试可重新request |
| Reality winner提交，Growth尚未调用 | Target存在，Receipt不存在 | exact active Target recovery，继续G2 |
| Reality winner提交，Growth事务abort | Target存在，Receipt不存在 | 同一request恢复Target，再重试G2 |
| Reality winner提交，Growth Receipt提交 | Target与Receipt存在 | 恢复同一Target；G2 exact Receipt返回ALREADY_COMMITTED |
| Growth Receipt存在但页面崩溃 | 完整Return事实成立 | Admission Recovery恢复READY_FOR_LIVED_RESPONSE |
| Reality conflict读到不同request | 另一 active Target存在 | SAFE_WITHHELD，不合并、不删除 |
| winner首次读取不可见 | 尚不能证明赢家 | 最多3次readonly观察；仍不可见则SAFE_WITHHELD |

### 5.3 Recovery Owner

- Reality Target conflict recovery：Reality Encounter Intent Controller；
- source Departure reconciliation：Reality Adventure Lifecycle Reconciliation Controller；
- Return Receipt create / exact recover：Growth Transaction Authority；
- persisted Return admission recovery：Choice Returning Provenance Recovery Adapter；
- 页面只消费 typed result，不读两个数据库。

### 5.4 刷新与 stale tab

刷新或 stale tab 只能重新运行同一 public recovery：

```text
same Departure + same attempt revision
→ same returnIntentRequestReferenceId
→ active Target exact recovery
→ same deterministic Return Receipt
```

浏览器关闭、刷新、Back/Forward 和等待时间不得成为成功或终结输入。

---

## 6. Outcome与消费者切换

### 6.1 Reality request typed outcome

`RealityEncounterRequestResult` 的成功分支需要能区分：

```text
CREATED
ALREADY_CURRENT
RECOVERED_EXACT_CHOICE_RETURN
```

可以保持外层 `status = READY`，但必须新增 typed disposition；也可以新增等价正式 union。无论采用哪种 TypeScript 形状，必须满足：

- 只有 canonical Target transaction complete 或 exact canonical recovery 才成功；
- success 携带同一 `intentReferenceId` 与 `encounterCycleId`；
- recovered disposition 不依赖 Runtime-only `currentIntent`；
- failure 不携带可导航 Target。

本审计推荐保持 `status = READY`，新增：

```text
requestDisposition:
  CREATED
  | ALREADY_CURRENT
  | RECOVERED_EXACT_CHOICE_RETURN
```

这样不引入第四产品状态，同时留下可测试的并发恢复事实。

### 6.2 `confirmXinmaiChoiceExplicitReturn`

现有 public union 已有：

```text
RETURNED
ALREADY_RETURNED
REJECTED
SAFE_WITHHELD
```

无需新增新的产品成功状态。映射冻结为：

| Reality disposition | Growth result | public outcome |
|---|---|---|
| `CREATED` | `COMMITTED` | `RETURNED` |
| `CREATED` | `ALREADY_COMMITTED` | `ALREADY_RETURNED` |
| `ALREADY_CURRENT` | `COMMITTED`或`ALREADY_COMMITTED` | `ALREADY_RETURNED` |
| `RECOVERED_EXACT_CHOICE_RETURN` | `COMMITTED`或`ALREADY_COMMITTED` | `ALREADY_RETURNED` |
| 任一Reality recovery mismatch | 不得进入Growth写入 | `SAFE_WITHHELD` |

这里 `RECOVERED_EXACT_CHOICE_RETURN + Growth COMMITTED` 是合法的：赢家已提交 Reality Target，但可能在写 Growth Receipt 前中断；恢复调用完成确定性 Receipt，仍应对外表达“恢复了已有Return目标”，而不是声称创建第二次Return。

所有成功分支必须返回：

- current `ChoiceActionIntention`；
- current Departure Receipt；
- exact Return Receipt；
- Receipt 内与 Reality recovery 完全相同的 Target Cycle / request reference。

### 6.3 正式消费者

```text
confirmXinmaiChoiceExplicitReturn
├─ XinmaiLivedResponseReturnSurface
│  ├─ RETURNED / ALREADY_RETURNED → 刷新typed admission
│  └─ SAFE_WITHHELD → 真实可重试反馈
├─ Choice Returning Admission Resolver
│  └─ 只读persisted Receipt / Fact状态
├─ Choice Returning Recovery Adapter
│  └─ 只读Growth + source reconciliation + Reality proof
└─ /reality Resolution Handoff
   └─ 只消费已确认Fact/Formation与同一Target proof
```

现有 Surface 已把 `RETURNED` 与 `ALREADY_RETURNED` 视为成功，无需新增文案含义。Runtime migration 只需保证 losing caller 不再收到 raw unique failure，并保持失败时的现有克制反馈。

导航必须继续只消费：

```text
Return Receipt current
+ Reality Proof current
+ Fact / Formation既有合法条件
+ same Target
```

`SAFE_WITHHELD`、任意 `ConstraintError`、旧 Intent、页面内存 Intent 或不同 request Target 均不得导航。

---

## 7. 原子迁移边界

### 7.1 候选组成裁决

拒绝候选 `7b60c718…` 包含必须保留的 lifecycle reconciliation 修复，但其 Explicit Return 并发恢复不完整。因此不得：

- 直接推送 `7b60c718…`；
- 在其上追加一个小修后把两个提交依次交付；
- 复用旧 Counter；
- 普通 merge 拒绝候选分支；
- 让旧 unique failure 路径与新 recovery 路径并存。

唯一安全交付单位：

```text
最新Remote HEAD
→ 原7b60生命周期修复的完整Runtime差异
+ 本审计冻结的Return read-after-conflict恢复
+ 全部消费者与Gate切换
→ 一个新原子Runtime Candidate
```

在当前审计时点，父提交应为 `269e687…`。若交付前 Remote 前进，必须再次 current-head recomposition，保持 `NewCandidate^ = then-current Remote HEAD`。

### 7.2 原生命周期修复文件范围

新候选必须机械保留拒绝候选相对 Remote 的以下已审计文件范围：

```text
package.json
scripts/check-xinmai-choice-returning-provenance-authority.mjs
scripts/check-xinmai-reality-explicit-leave-termination.mjs
scripts/check-xinmai-reality-gravity-departure-lifecycle-reconciliation.mjs
src/components/XinmaiLivedResponseReturnSurface.tsx
src/pages/GravityPage.tsx
src/pages/LaunchLab.tsx
src/services/xinmaiChoiceDepartureReconciliationProofAdapter.ts
src/services/xinmaiChoiceReturningProvenanceAdmissionResolver.ts
src/services/xinmaiChoiceReturningProvenanceController.ts
src/services/xinmaiChoiceReturningProvenanceRecoveryAdapter.ts
src/services/xinmaiChoiceReturningRealityProofAdapter.ts
src/services/xinmaiGravityEntryAdmissionController.ts
src/services/xinmaiRealityAdventureContinuityTransactionalStore.ts
src/services/xinmaiRealityAdventureLifecycleReconciliationController.ts
src/services/xinmaiRealityAdventureLifecycleReconciliationMutationPolicy.ts
src/services/xinmaiRealityEncounterIntentController.ts
src/types/index.ts
src/types/xinmaiChoiceReturningProvenance.ts
src/types/xinmaiRealityAdventureContinuity.ts
src/types/xinmaiRealityEncounterIntent.ts
src/types/xinmaiRealityGravityDepartureReconciliation.ts
```

### 7.3 本次并发恢复新增范围

允许在同一原子提交中进一步修改：

```text
src/services/xinmaiRealityEncounterIntentController.ts
  - exact conflict recovery primitive
  - bounded readonly recovery
  - strict source/target proof validation

src/types/xinmaiRealityEncounterIntent.ts
  - typed requestDisposition
  - typed conflict recovery failure reasons

src/services/xinmaiChoiceReturningProvenanceController.ts
  - recovered disposition → ALREADY_RETURNED
  - same Target / Receipt cross-check

scripts/check-xinmai-choice-returning-provenance-authority.mjs
  - consumer and outcome regression

scripts/check-xinmai-choice-return-idempotent-conflict-recovery.mjs
  - dedicated no-arbitrary-Constraint success gate

package.json
  - register the new gate in the complete suite
```

不需要修改物理 DB version、Object Store、Index 或 Schema。现有 `activeIdentityKey` lookup 足以定位 winner；`returnIntentRequestReferenceId` 用于读取后的严格验证，不需要新增 unique index。

### 7.4 不得扩张

- 不修改 Growth Authority 成功定义；
- 不新增第二 Reality Writer 或 Recovery Store；
- 不持久化 conflict recovery proof；
- 不修改 Canonical Body Imprint、C1、C2 或 Renderer；
- 不修改 Identity、Mother Code、Pressure、Observation、Formation；
- 不修改 Prompt Runtime、Research、Monetization 或 Phase 4；
- 不把 Harness 加入 Production Bundle。

---

## 8. Forward SAFE_WITHHELD Counter

新 Counter 必须是新 Runtime Candidate 的直接子提交。旧 `39394e100…` 不得作为交付 Counter。

Counter只允许切换既有 policy：

```text
Lifecycle Reconciliation Mutation = PAUSED
New Departure Saga = SAFE_WITHHELD
New Return / Target creation = SAFE_WITHHELD
Exact Return conflict recovery = 不启动新的成功路径
Generic new Reality while unresolved active = SAFE_WITHHELD
```

Counter必须保留：

- V1 / V2 Reality records；
- active / terminal lifecycle history；
- 已完成 Departure reconciliation proof；
- Choice、Departure、Return、Fact、Eligibility、Formation Receipt、Crystal；
- Canonical Body Imprint、C1 Ownership 与只读 Recovery；
- 已存在 Target 的只读恢复。

Counter禁止：

- 恢复 blind-create；
- 恢复 Receipt-only Return admission；
- 恢复 direct active-key release；
- 删除 winner Target 解决冲突；
- 将 raw unique error 改成成功；
- 复活旧双 Authority 或 Legacy consumer。

普通 `git revert` 不得作为 Forward Counter，因为它会复活拒绝候选之前的 blind-create / lifecycle gap。

---

## 9. 必测矩阵

### 9.1 Authority与并发

| Case | 必须结果 |
|---|---|
| 同 Departure 真并发，至少3轮 | `DEPARTED + ALREADY_DEPARTED`；Receipt=1；proof=1；key释放一次 |
| 同 Return 真并发，至少3轮 | 两个调用均成功收敛；一个可为`RETURNED`、另一个`ALREADY_RETURNED`；Target/Intent/Receipt各1 |
| 同 Return 调用结果 | 两侧返回相同 Target Cycle、Intent proof、Return Receipt |
| 不同 requestReference 并发 | 不得错误合并；非赢家请求 `SAFE_WITHHELD` |
| 不同 identity 并发 | 各自独立，无互相覆盖 |
| stale tab | exact同request恢复；不同revision / source拒绝 |
| refresh / Back / Forward | 恢复同一 Target 与 Receipt，不创建第二Cycle |

### 9.2 Proof mismatch

以下任一字段单独失配，均必须 `SAFE_WITHHELD`，不得进入 Growth Return transaction：

- identityKey / 任一 identity reference；
- Choice reference；
- Choice / source lineage；
- Departure Receipt；
- Departure reconciliation；
- `returnIntentRequestReferenceId`；
- `returnAttemptRevision`；
- source Encounter；
- target origin / qualification；
- target Intent / Cycle cross-reference；
- target lifecycle / active key。

### 9.3 Winner visibility与failure

| Case | 必须结果 |
|---|---|
| winner Reality transaction abort | 无Target；输家不得恢复虚假Target |
| winner已提交、首次read NOT_FOUND | 允许有限新readonly重读；最终只以canonical record为准 |
| 三次read仍不可见 | `SAFE_WITHHELD / RETURN_CONFLICT_WINNER_NOT_VISIBLE` |
| read corrupted / blocked / close | `SAFE_WITHHELD`，不写任何补偿成功 |
| Growth Receipt transaction abort | Target保留；retry恢复同Target后重试Receipt |
| Growth Receipt已提交、Reality request重试 | same Target + `ALREADY_RETURNED` |
| Reality proof mismatch | 不写 / 不覆盖Return Receipt |

### 9.4 原生命周期修复回归

必须继续覆盖：

- Choice commit 不释放 source key；
- Explicit Departure Growth commit 后独立 Reality reconciliation；
- Reality reconciliation abort 时 key 不错误释放；
- reconciliation retry 只完成一次；
- source terminal history保留；
- no-fact target termination 释放 target key；
- attempted / changed response 保持同一 Fact / Formation Authority；
- Direct URL 不补造 Target；
- V1 NO BACKFILL；
- corruption / identity mismatch SAFE_WITHHELD。

### 9.5 Harness纪律

并发与故障 Harness 可以继续位于隔离 evidence 目录，但必须：

- 只调用 public Controller / Authority；
- 通过正式 Authority 建立前置状态；
- 故障只在持久化依赖边界注入；
- 不直接写 Receipt、Target、active key 或完成态；
- 不修改生产导出或新增 Production test hook；
- 不进入 Production Bundle；
- 同 Return 真并发至少重复3次；
- 记录事务重叠顺序与两侧 canonical references。

### 9.6 Gate口径

当前 Remote 完整 XINMAI Gates 为 `85`；拒绝候选为 `86`。新候选增加独立 conflict recovery gate 后，预期：

```text
Remote：85/85
New Candidate：87/87
New Counter：87/87
```

如果实际注册数量不同，Push Gate 必须逐项解释，不能机械宣称通过。要求：

- Gate删除、漏注册、弱化为0；
- `mother-code-profile` 与 Remote 保持同一既存黄灯；
- TypeScript PASS；
- Production Build PASS；
- Production Bundle 中 Harness / Fixture / Acceptance / fault injection = 0；
- Candidate / Counter worktree CLEAN；
- 主工作树既存修改原样保留。

---

## 10. 目标消费关系

```text
Explicit Return
↓
deterministic Return Request Identity
↓
Reality request transaction
├─ COMMITTED
├─ ALREADY_CURRENT
└─ exact UNIQUE conflict
    ↓
    independent canonical readonly recovery
    ├─ exact proof → RECOVERED_EXACT_CHOICE_RETURN
    └─ any mismatch → SAFE_WITHHELD
↓
fresh Reality Proof
↓
Growth Return Receipt transaction
├─ COMMITTED → RETURNED / ALREADY_RETURNED by disposition
├─ ALREADY_COMMITTED → ALREADY_RETURNED
└─ mismatch/failure → SAFE_WITHHELD
↓
Returning Admission
↓
Lived Response
↓
Fact / Formation
↓
same Target /reality
```

禁止消费关系：

```text
ConstraintError → success
DOM/data/timer → recovery
page currentIntent → canonical winner
old Target → new Return
identity-only match → merge
unique failure → delete winner
Growth Receipt → fabricate Reality Target
Reality Target → fabricate Growth Receipt
```

---

## 11. Runtime申请与交付顺序

后续唯一合法刀序：

```text
1. 从最新Remote HEAD建立干净隔离工作树
2. 机械重组7b60生命周期修复
3. 在同一提交加入本审计Return conflict recovery
4. TypeScript / Build / 87 Gates
5. 隔离Harness完成必测矩阵
6. 生成新Candidate直接子Counter
7. Counter TypeScript / Build / 87 Gates
8. Independent Push Gate
9. Exact Remote Delivery
10. Runtime Closure Revalidation
11. 基线Runtime CLOSED后才重新组成C2
```

实现中若发现需要：

- 新 DB / Object Store / Index；
- 第二 Writer；
- 页面直接读 Storage；
- 更改 Growth Authority 成功含义；
- 将不同 request 合并；
- 无法在单提交切换消费者；

则必须停止并重新 RED Audit，不得扩张本协议。

---

## 12. 最终冻结状态

```text
Return Unique Constraint Authority Safety：PASS
Return Read-after-conflict Recovery：PROTOCOL FROZEN
Rejected Candidate 7b60c718：EVIDENCE ONLY / DO NOT PUSH
Old Counter 39394e10：EVIDENCE ONLY / DO NOT REUSE

Runtime Application：
NOW — CORRECTIVE ATOMIC MIGRATION APPLICATION READY

Push：HOLD
Phase 3：ACTIVE / NOT PASSED
C2：WAIT BASELINE RUNTIME CLOSURE AND CURRENT-HEAD RECOMPOSITION
C3：DEFER
Phase 4：LOCKED
```

最高不变量：

> 唯一索引负责阻止第二事实；typed read-after-conflict 负责证明赢家事实。两者缺一不可。系统可以恢复同一个已提交的 Return，但绝不能从一次数据库冲突猜测用户已经回来。
