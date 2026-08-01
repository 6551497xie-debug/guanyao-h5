# XINMAI Choice Departure — Real World vs Reality Encounter Semantic Major Blade Prep P0

> 任务编号：`XINMAI-CHOICE-DEPARTURE-REAL-WORLD-VS-REALITY-ENCOUNTER-SEMANTIC-MAJOR-BLADE-PREP-P0`
>
> 交通灯：YELLOW
>
> 刀型：Product Semantic Major Blade Prep
>
> 决策：NOW — PREP ONLY
>
> 远程权威基线：`a40baab647ef8d6ce72450e126f0ad0222a08332`
>
> 失败候选：`e9326f7b7d0a705299721164cc71569400f3f5a1`（REJECTED AS DELIVERY / 只作证据）
>
> Runtime / Gate / Storage：未修改

---

## 一、最终裁决

```text
Choice 后唯一主路径：
COMMITTED
→ EXPLICIT_DEPARTURE_REQUESTED
→ Departure Receipt COMMITTED
→ DORMANT_DEPARTURE

Choice 后创建新 /reality Intent：
REJECT

Explicit Return 后唯一主路径：
AWAITING_EXPLICIT_RETURN
→ USER_EXPLICIT_RETURN
→ New Reality Intent READY
→ targetEncounterCycleId generated
→ Return Receipt COMMITTED
→ READY_FOR_LIVED_RESPONSE

/reality 导航时点：
LIVED RESPONSE RESOLVED 后

Return Receipt：
不等于 Reality 已激活

Departure Product Semantics：
FROZEN / PASS

Runtime Application：
DEFER

刀后出口：
RED — MIGRATION AUDIT REVALIDATION REQUIRED

Phase 3：
ACTIVE / NOT PASSED

Visual Runtime：
DEFER

Phase 4：
LOCKED
```

产品宪法冻结为：

> Choice 只决定用户愿意尝试什么。用户必须先把 Choice 带回真实生活；只有用户明确回来，并对现实回应作出确认后，新的 Reality 才可以被承接。

---

## 二、唯一产品因果

### 2.1 Choice Commitment

```text
Observation RECOGNIZED
↓
用户选择合法 Action Route
↓
Choice COMMITTED
```

只代表：我决定准备尝试什么。

不代表用户已经离场、行动、回来，也不代表新 Reality、Lived Response 或 Crystal Eligibility 已经成立。

### 2.2 Explicit Departure

唯一用户动作：

```text
“带着这一步，回到生活”
```

正式含义：用户明确结束当前产品内准备，把同一 Choice 带入现实微实验。

唯一提交点：

```text
Growth Transaction complete
```

不依赖新 Reality Intent、`targetEncounterCycleId`、`/reality` 导航、Reality Host、页面关闭、时间经过或 AI 判断。

### 2.3 Dormant Departure

Departure Receipt 成立后进入：

```text
DORMANT_DEPARTURE
```

允许保持当前页面的安静终态、返回同一生命空间、关闭或离开产品、日后恢复同一 Choice lineage。

禁止自动创建新 Pressure、Choice、Reality，禁止 Crystal 预告、倒计时、红点或打卡，也禁止把页面关闭解释为行动发生。

### 2.4 Explicit Return

唯一用户动作：

```text
“我回来了”
```

它只代表用户明确请求回到这条 Choice lineage，准备说明现实里发生了什么。

它不代表行动成功、行动已经发生、用户应该获得 Crystal，或新 Reality 已经 Active。

### 2.5 Return Intent

Explicit Return 成立后，才允许请求新的 Reality Encounter Intent。

```text
USER_EXPLICIT_RETURN
↓
Identity + Departure + Choice revalidation
↓
requestRealityEncounter(CHOICE_RETURN)
↓
READY_TO_ENTER_REALITY
↓
targetEncounterCycleId generated
```

这里的 Intent 是未来 Reality 的承接资格，不是已经进入 `/reality`。

### 2.6 Lived Response

Return Receipt 成立后开放 Lived Response Surface。

合法用户方向继续包括：确实尝试、改变回应、现实条件无法继续、尚未尝试、拒绝记录与延后。

只有现有 Lived Response Authority 可以确认 Fact。Return Receipt 不创建 Fact。

### 2.7 New Reality

新 `/reality` 的最早合法承接点：

```text
Return Receipt valid
+ Lived Response Resolution confirmed
+ 同一 target Encounter Intent 仍 READY
↓
/reality Route Admission
```

确认真实尝试、改变回应或其他正式可记录事实，可以承接新的 Reality；尚未尝试、拒绝记录或明确延后，不强迫进入新 Reality，可回到 Dormant / Safe Life Space。

Eligibility 与 Crystal 不承担 `/reality` 入口资格。

正式顺序是：

```text
Departure
→ Real Life
→ Explicit Return
→ Intent READY
→ Lived Response
→ /reality Admission
```

---

## 三、状态机冻结

```ts
type ChoiceDepartureReturningAdmission =
  | "RESUME_COMMITTED"
  | "DEPARTURE_COMMITTING"
  | "DORMANT_DEPARTURE"
  | "RETURN_INTENT_ESTABLISHING"
  | "READY_FOR_LIVED_RESPONSE"
  | "RESUME_REPORTED"
  | "TERMINAL_BY_GROWTH"
  | "SAFE_WITHHELD";
```

### 3.1 `RESUME_COMMITTED`

合法 Choice 存在、没有 Departure Receipt、没有更高 Growth 资产且 lineage 当前。页面只展示唯一 Explicit Departure 入口。

### 3.2 `DEPARTURE_COMMITTING`

短期 Runtime 状态，不持久化为独立资产。事务完成前不显示成功，不创建 Intent，也不导航；abort 后回到 `RESUME_COMMITTED`。

### 3.3 `DORMANT_DEPARTURE`

持久依据是合法 Departure Receipt。

```text
这一步已经被你带回生活。

不必证明它。
也不必现在完成它。

等你愿意回来时，
它会在这里等你。
```

Motion / Static 可以不同，业务语义必须相同。

### 3.4 `RETURN_INTENT_ESTABLISHING`

短期 Runtime 状态。用户点击“我回来了”后，依次恢复 Identity、Choice、Departure，请求或恢复同一 Choice 的 Return Intent，取得 target cycle，再写 Return Receipt。

任一步失败进入 `SAFE_WITHHELD / RETRYABLE`，不得开放表单。

### 3.5 `READY_FOR_LIVED_RESPONSE`

必须同时具备 Departure Receipt、Explicit Return、Reality Intent typed proof、`targetEncounterCycleId`、Return Receipt、完整一致引用、Growth transaction confirmed，且没有更高 Growth 终局。

只有此态允许 Lived Response Surface 命中。

### 3.6 `RESUME_REPORTED`

已有合法 Lived Response Fact。恢复同一 Fact / Eligibility / Formation lineage，不要求重新离场或回访。

### 3.7 `TERMINAL_BY_GROWTH`

已有 Eligibility、Formation Receipt 或 Crystal 时由更高 Growth 资产接管，不重新开放 Departure、Return 或首次 Fact 入口。

### 3.8 `SAFE_WITHHELD`

适用于 Recovery 不可用或损坏、引用失配、多条有效 Receipt、多个 matching Intent、stale tab、事务失败、legacy target 无法证明等情况。

保留既有资产只读恢复，禁止伪成功。

---

## 四、Departure Receipt Schema 修订

```ts
type XinmaiChoiceExplicitDepartureReceipt = Readonly<{
  schemaVersion: "XINMAI_CHOICE_DEPARTURE_RECEIPT_V1";
  source: "xinmai_choice_returning_provenance_controller";
  departureReceiptReferenceId: string;
  choiceActionIntentionReferenceId: string;
  identityReferences: RealityEncounterIdentityReferences;
  actionRouteReferenceId: string;
  actionRoutePrototypeVersion: number;
  gravityObservationReferenceId: string;
  sourceEncounterCycleId: string;
  choiceRevisionAtDeparture: number;
  revision: number;
  state: "DORMANT_DEPARTURE" | "RETURNED" | "INVALIDATED";
  departedAt: string;
  updatedAt: string;
  provenance: Readonly<{
    userExplicitDeparture: true;
    growthTransactionConfirmed: true;
    noTargetEncounterYet: true;
    noActionCompletionClaim: true;
    noLivedResponseAuthority: true;
    noCrystalAuthority: true;
  }>;
}>;
```

Departure Receipt 明确不再包含：

```text
targetEncounterCycleId
Reality Choice Continuation Proof
Reality Intent Reference
/reality route target
Reality lifecycle
```

确定性 ID：

```text
choice-departure-receipt:
choiceActionIntentionReferenceId
+ actionRouteReferenceId
+ prototypeVersion
+ gravityObservationReferenceId
+ sourceEncounterCycleId
+ choiceRevisionAtDeparture
```

禁止加入时间、页面 mount、tab ID、target cycle、DOM、Motion 或 AI 输出。

同一 Choice lineage 最多一个当前有效 Departure Receipt，由 Growth transaction 内最新 Envelope 校验。

---

## 五、Return Receipt Schema 修订

```ts
type XinmaiChoiceExplicitReturnReceipt = Readonly<{
  schemaVersion: "XINMAI_CHOICE_RETURN_RECEIPT_V1";
  source: "xinmai_choice_returning_provenance_controller";
  returnReceiptReferenceId: string;
  departureReceiptReferenceId: string;
  choiceActionIntentionReferenceId: string;
  identityReferences: RealityEncounterIdentityReferences;
  actionRouteReferenceId: string;
  gravityObservationReferenceId: string;
  sourceEncounterCycleId: string;
  targetEncounterCycleId: string;
  revision: number;
  state:
    | "READY_FOR_LIVED_RESPONSE"
    | "CONSUMED_BY_FACT"
    | "DEFERRED_WITHOUT_FACT"
    | "INVALIDATED";
  consumedLivedResponseReferenceId: string | null;
  realityProof: XinmaiChoiceReturningRealityProof;
  returnedAt: string;
  updatedAt: string;
  provenance: Readonly<{
    userExplicitReturn: true;
    realityIntentCommittedBeforeReceipt: true;
    noRealityActivationClaim: true;
    noActionCompletionClaim: true;
    noLivedResponseAuthority: true;
    noCrystalAuthority: true;
  }>;
}>;
```

`targetEncounterCycleId` 唯一生成者继续是 `RealityEncounterIntentController`，唯一生成时点是合法 Departure 存在且用户明确点击“我回来了”之后。

Departure Controller、Page、Launch Route、Lived Response Surface、Growth Recovery、AI、Storage Migration、Timer 与浏览器打开事件均不得生成或补造。

Return ID：

```text
choice-return-receipt:
departureReceiptReferenceId
+ targetEncounterCycleId
+ returnRevision(1)
```

Return Receipt 不等于 Active Reality。它只证明用户明确回来、新 Intent 已持久化、target cycle 已绑定、Lived Response 可以开放。

---

## 六、Choice 资产与 target binding

Departure 时 Choice 保持：

```text
state = COMMITTED
targetEncounterCycleId = null
```

离场事实由 Departure Receipt 表达，不复用 Choice state。

Return Receipt transaction 同时重读 Choice、校验 Departure 与 Reality proof、绑定 `targetEncounterCycleId` 并写 Return Receipt。

Choice 可继续保持 `COMMITTED`，避免 `AWAITING_RETURN` 承担含混产品语义。

Fact transaction 再执行：

```text
revalidate Return Receipt
+ revalidate Reality proof
+ confirm Lived Response Fact
+ consume Return Receipt
+ Choice = REPORTED
```

---

## 七、Departure Transaction

```text
RESUME_COMMITTED
↓ 用户明确点击
Growth readwrite transaction：
  重读 Choice
  校验 V2 Action Route snapshot
  校验 identity / source cycle / Observation
  校验 Choice revision
  校验没有有效 Departure
  校验没有 Fact / Eligibility / Formation
  写确定性 Departure Receipt
↓ transaction complete
DORMANT_DEPARTURE
```

Departure transaction 前后不得调用：

```text
requestRealityEncounter
navigate('/reality')
Reality Host admission
bindChoiceActionIntentionToRealityEncounter
```

失败矩阵：

| 失败点 | Growth 结果 | UI |
|---|---|---|
| Identity mismatch | 无写入 | SAFE_WITHHELD |
| Choice stale | 无写入 | 重读 / Retry |
| Existing Receipt exact retry | ALREADY_DEPARTED | Dormant |
| Existing Receipt conflict | 无写入 | SAFE_WITHHELD |
| DB blocked / abort / close | 无写入 | Retryable |
| 页面在 complete 前关闭 | 不推测成功 | Recovery read |
| complete 后页面崩溃 | Receipt 保留 | 下次 Dormant |

---

## 八、Return Cross-store Saga

```text
DORMANT_DEPARTURE
↓ 用户明确点击“我回来了”
读取并校验 Identity + Choice + Departure
↓
Reality Intent Transaction：
  request / recover matching Return Intent
  origin = CHOICE_RETURN
  qualification = EXPLICIT_RETURN_TO_CHOICE
  choice reference = current Choice
  routeTarget = /reality
↓ transaction complete
typed Reality proof + targetEncounterCycleId
↓
Growth readwrite transaction：
  重读 Choice + Departure
  校验 proof immutable tuple
  校验 target cycle 尚未被其他 lineage 使用
  绑定 Choice target cycle
  写唯一 Return Receipt
↓ transaction complete
READY_FOR_LIVED_RESPONSE
```

Reality Continuity 与 Growth Store 仍是两个事务域。正式纪律是 Proof Snapshot + Fresh Revalidation + Idempotency + Compensation，不得声称跨数据库原子提交。

Intent 成功而 Return Receipt 失败时，matching READY Intent 可以保留；Departure 保留；Lived Response 不开放；重试复用同一 Intent，不生成第二 target cycle。多个 matching Intent 一律 `SAFE_WITHHELD`。

Return Receipt 成功而页面失败时，下次恢复 `READY_FOR_LIVED_RESPONSE`，不重复创建 cycle 或 Receipt，也不提前进入 `/reality`。

---

## 九、`/reality` 承接时点

正式裁决：

```text
/reality：Lived Response Resolution 后进入
```

Return Receipt 成立后，只在同一生命空间开放 Lived Response Surface。

确认事实路径：

```text
READY_FOR_LIVED_RESPONSE
↓ 用户明确确认现实事实
Fact + Return consumption transaction complete
↓ revalidate target Intent READY
↓ navigate('/reality')
↓ Route / Host / Surface typed admission
↓ ACTIVE_IN_REALITY
```

`navigate()` 仍不是 Active 成功点。

尚未尝试、拒绝记录、明确延后、Recovery 不可用或 Fact transaction 失败时，不强迫进入新 Reality，不自动生成 Fact、Pressure、Choice 或 Crystal。

---

## 十、离场后的 Presentation Contract

P0 不新增页面或 Route，复用当前 Gravity 页面安静终态，Presentation State 为：

```text
DEPARTURE_DORMANT
```

必须表达 Choice 已安全保存、接下来发生在现实生活、不要求立即完成、不要求证明、回来入口仍存在。

不得表达新 Reality 已生成、行动已完成、Crystal 正在等待领取或用户欠下一次打卡。

最多保留回到安全生命空间、关闭或离开产品、无障碍说明。不能继续展示新 Action Route、Pressure 或 Choice。

Motion 与 Reduced Motion 只改变退场表现，不改变 Receipt 时点。

---

## 十一、旧资产与失败候选

远程 `a40baab…` 尚未包含 Growth Envelope V2 Receipts、Returning Provenance Controller、Receipt Schema 或 Pointer Fix 最终交付。

因此 `e9326f7…` 中的错误 V2 从未成为远程生产 Schema，不需要 V2 → V3 在线迁移。

`e9326f7…` 裁决：

```text
DELIVERY：REJECT
PUSH：REJECT
AMEND / CHERRY-PICK WHOLE COMMIT：REJECT
LOCAL EVIDENCE：KEEP
```

可以精确复用 Growth V1 → V2 兼容框架、Receipt validator 基础、Growth Transaction 唯一 writer、Admission / Recovery 结构、Pointer Fix core、Fact 与 Return consumption 同事务、Safe-Withheld policy。

不得复用 Departure 前 `requestRealityEncounter`、Departure Receipt 中的 target / proof、Departure 后 `/reality` 导航、`handleChoiceContinueToReality` 页面编排及“新现实还没有接住”的离场语义。

旧 `AWAITING_RETURN`：

```text
state = AWAITING_RETURN
targetEncounterCycleId != null
无新 Departure / Return Receipt
→ TARGET_REALITY_BOUND_UNPROVEN
```

规则：不 backfill Departure / Return，不开放 Lived Response，不复用旧 target 证明返回，不删除 Choice；允许用户重新明确 Departure。旧 target 如何隔离由 Migration Audit 冻结，无法安全校准时 `SAFE_WITHHELD`。

既有合法 Choice、Fact、Eligibility、Formation Receipt、Crystal、Archive 全部保留。Schema 结构升级只初始化空 Receipt 集合：`NO SEMANTIC BACKFILL`。

---

## 十二、消费者切换

| 消费者 | 目标 | 裁决 |
|---|---|---|
| Choice Authority | 继续生产 COMMITTED | KEEP |
| Choice Presentation Resolver | COMMITTED → departure CTA | ADAPT |
| GravityPage | 不再请求 Reality Intent | MIGRATE |
| Departure Controller | Growth-only Receipt transaction | REDESIGN |
| Reality Intent Controller | 从 Return command 调用 | ADAPT ORIGIN / KEEP AUTHORITY |
| Reality Proof Adapter | 只属于 Return / Fact | MIGRATE TIMING |
| Return Controller | Intent proof + Growth Receipt saga | REDESIGN |
| Launch / Returning Life Space | “我回来了”与 Lived Response | ADAPT |
| Lived Response Surface | 只消费 READY admission | KEEP / ADAPT NAV OUTPUT |
| Fact Authority | 消费 Return Receipt | KEEP CORE |
| Reality Route | Response resolved 后承接 | ADAPT CONSUMER |
| Growth Terminal Summary | Receipt-aware recovery | ADAPT |
| Pointer Fix | 只在 READY surface 生效 | KEEP EXACT CORE |
| Renderer / DOM / Timer / AI | 无 Authority | REJECT |

---

## 十三、导航与事实分离

| 情况 | 权威事实 | 页面结果 |
|---|---|---|
| Departure complete，页面不动 | Departure 保留 | 恢复 Dormant |
| 页面关闭，Departure 未 complete | 无 Departure | 恢复 COMMITTED |
| 页面关闭，Departure 已 complete | Departure 保留 | 恢复 Dormant |
| App 再打开 | 只读恢复 | 不自动 Return |
| Return Intent 失败 | Departure 保留 | Retry / Safe Withheld |
| Intent 成功，Return transaction 失败 | READY Intent 可复用 | 不开放表单 |
| Return complete，Surface 失败 | Return 保留 | 刷新恢复 READY |
| Return complete，Fact 失败 | Return 未消费 | 不进入 Reality |
| Fact complete，导航失败 | Fact + consumed Return 保留 | 重试交付 |
| `/reality` 导航成功，Host 未承接 | 不得 ACTIVE | Intent 可恢复 |
| Refresh / Back / Forward | 不生产新事实 | 恢复同一状态 |

---

## 十四、幂等与并发

Departure 双击与双标签必须得到同一 command / Receipt；exact retry 返回 `ALREADY_DEPARTED`，冲突进入 `SAFE_WITHHELD`，最终有效 Departure 为 1。

Return 双击复用 matching READY Intent；不同标签只能绑定一个 target cycle；冲突 target 进入 `SAFE_WITHHELD`，最终有效 Return 为 1。

Return Receipt 最多消费一次；stale tab 不创建第二 Fact；Fact 失败不消费 Return；Fact 成功后旧标签只能恢复同一 lineage。

禁止以时间、tab、页面布尔、按钮禁用、Web Lock callback 或 Motion state 作为幂等权威。

---

## 十五、Gate 设计

未来原子迁移至少需要：

1. Choice Commitment Is Not Departure Gate；
2. Departure Has No Target Encounter Gate；
3. Departure Growth Transaction Complete Gate；
4. Departure Does Not Navigate Reality Gate；
5. Dormant Departure No New Task Gate；
6. Explicit Return Required Gate；
7. Return Intent Unique Generator Gate；
8. Target Cycle Binds At Return Gate；
9. Return Receipt Requires Intent Proof Gate；
10. Return Receipt Is Not Reality Active Gate；
11. Lived Response Admission Receipt Gate；
12. Reality Navigation After Response Gate；
13. Legacy Awaiting Return No Backfill Gate；
14. Page / DOM / Timer Authority Forbidden Gate；
15. Motion / Reduced Motion Semantic Parity Gate；
16. Multi-tab Duplicate Receipt Forbidden Gate；
17. Safe-Withheld Forward Rollback Gate。

精确文案不得成为长期权威断言；Gate 应保护 typed semantics。

---

## 十六、真实浏览器验收矩阵

正向必须覆盖：正式 Choice、明确 Departure、事务前无成功、完成后 Dormant、Departure 后无 `/reality`、刷新恢复 Dormant、重开不自动 Return、同一 Choice 的“我回来了”、Return 后才建立 Intent、target cycle 在 Return 首次出现、Return complete 后才开放表单、Response resolved 后才进入 `/reality`、Motion / 原生 Reduced Motion 同义。

用户方向必须覆盖：尚未尝试、改变回应、无法继续、拒绝记录、延后和明确事实；均不得惩罚或伪造 Growth。

失败必须覆盖：Departure / Return 双击与双标签、事务 abort / close / blocked、页面崩溃、matching Intent 重试、多个 matching Intent、proof unavailable / corrupted / stale、Fact 失败、Fact 后导航失败、Direct URL、Back / Forward、V1 / V2 混合标签、legacy AWAITING_RETURN 及所有引用失配。

---

## 十七、Migration Audit Revalidation 范围

下一刀必须重新审计：

1. Growth Envelope V1 → V2 新 Schema；
2. Departure Receipt 删除 target / proof 后的唯一性；
3. Return Receipt 新增 target / proof 的事务；
4. Choice target binding 从 Departure 移到 Return；
5. Reality Intent 新 origin / qualification；
6. `GravityPage` 删除 Intent / navigate 编排；
7. Dormant Presentation 与恢复；
8. Launch Explicit Return consumer；
9. Lived Response resolved → `/reality` handoff；
10. 旧 `AWAITING_RETURN` 隔离；
11. `e9326f7…` 可复用 diff 的逐文件裁决；
12. Forward Safe-Withheld counter-commit。

由于事务顺序、Schema 字段所有者与 target cycle 时点均改变，不能从 PREP 直接进入 Runtime。

---

## 十八、推荐原子迁移边界

建议类型与服务范围：

```text
src/types/xinmaiChoiceReturningProvenance.ts
src/types/xinmaiChoiceActionIntention.ts
src/types/xinmaiLivedGrowthRecovery.ts
src/types/xinmaiLivedGrowthTransaction.ts
src/types/xinmaiRealityEncounterIntent.ts
src/types/index.ts

src/services/xinmaiChoiceReturningProvenanceController.ts
src/services/xinmaiChoiceReturningProvenanceAdmissionResolver.ts
src/services/xinmaiChoiceReturningProvenanceRecoveryAdapter.ts
src/services/xinmaiChoiceReturningRealityProofAdapter.ts
src/services/xinmaiChoiceReturningProvenanceMutationPolicy.ts
src/services/xinmaiChoiceActionIntentionController.ts
src/services/xinmaiLivedGrowthRecoveryPersistenceAdapter.ts
src/services/xinmaiLivedGrowthTransactionalStore.ts
src/services/xinmaiLivedResponseAuthorityController.ts
src/services/xinmaiRealityEncounterIntentController.ts
```

页面与消费者：

```text
src/pages/GravityPage.tsx
src/pages/LaunchLab.tsx
src/components/XinmaiLivedResponseReturnSurface.tsx
```

并建立直接语义、时点、并发与 No Backfill Gates。

明确禁止 Renderer、Crystal 视觉、Pressure Seed、AI、Phase 4、新页面、新 Route，以及未经审计的新数据库或 Object Store。

---

## 十九、Safe-Withheld Forward Rollback

未来 Counter 必须：

```text
暂停新的 Departure
+ 暂停新的 Return
+ 暂停新的首次 Fact
+ 保留 Growth Envelope V2 只读恢复
+ 保留既有 Choice / Receipt / Fact / Eligibility / Crystal / Archive
+ 不恢复 e9326f7 的 Departure → Intent → /reality
+ 不恢复旧 AWAITING_RETURN 假入口
+ Pointer Fix 不形成独立旁路
```

普通 revert 不能作为安全回滚。

---

## 二十、下一刀

```text
XINMAI-CHOICE-DIRECT-REAL-LIFE-DEPARTURE-
RETURN-INTENT-PROVENANCE-
ATOMIC-MIGRATION-REVALIDATION-P0

交通灯：RED
刀型：Migration Audit Revalidation
决策：NOW — AUDIT ONLY
```

审计出口：现有两事务域可按新顺序落地则 `NOW — CORRECTIVE ATOMIC MIGRATION READY`；需要新持久化域或无法隔离 legacy target 则继续审计；无法保证 Intent 成功、Return 失败后的幂等恢复则 `SAFE_WITHHELD / REJECT APPLICATION`。

---

## 二十一、刀后交通灯与状态

```text
RED：
Saga 顺序、Receipt Schema 与 target cycle 绑定时点必须迁移

GREEN：
Identity / Intent typed failure 的静默反馈缺口继续登记

YELLOW：
Dormant Departure 的最终文案与视觉节奏等待后续体验刀

Choice Persistence：PASS
Departure Product Semantics：FROZEN / DIRECT TO REAL LIFE
Departure Receipt Timing：USER CLICK + GROWTH TRANSACTION COMPLETE
Return Intent Timing：USER EXPLICIT RETURN
targetEncounterCycleId Timing：RETURN STAGE ONLY
/reality Timing：AFTER LIVED RESPONSE RESOLUTION
e9326f7：REJECTED AS DELIVERY / LOCAL EVIDENCE ONLY
Remote：SAFE_WITHHELD
Phase 3：ACTIVE / NOT PASSED
Visual Runtime：DEFER
Phase 4：LOCKED
```

本刀没有修改 Runtime、Gate、Storage、`e9326f7…`、Choice / Fact / Eligibility / Formation Authority、Renderer 或 Phase 4。
