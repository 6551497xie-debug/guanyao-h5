# XINMAI Choice Direct Real-life Departure → Return Intent Provenance Atomic Migration Revalidation P0

> 任务编号：`XINMAI-CHOICE-DIRECT-REAL-LIFE-DEPARTURE-RETURN-INTENT-PROVENANCE-ATOMIC-MIGRATION-REVALIDATION-P0`
>
> 交通灯：RED
>
> 刀型：Migration Audit Revalidation
>
> 决策：NOW — AUDIT ONLY
>
> 远程权威基线：`0095bb5a6e739f7b4cf00a7119fbaf6b1060f784`
>
> 失败候选：`e9326f7b7d0a705299721164cc71569400f3f5a1`（REJECTED DELIVERY / LOCAL EVIDENCE ONLY）
>
> Runtime / Gate / Storage：未修改

---

## 一、最终裁决

```text
Departure Product Semantics：
CLOSED / FROZEN

Returning Provenance Runtime：
NOT ESTABLISHED

Cross-store Atomic Transaction：
NOT AVAILABLE / NOT CLAIMED

Growth Transaction Authority：
唯一 Departure / Return / Resolution Writer

Reality Encounter Intent Controller：
唯一 targetEncounterCycleId Generator

New Database / Object Store：
0

Second Persistence Owner：
0

Legacy Backfill：
0

e9326f7 Delivery：
REJECTED / SELECTIVE REIMPLEMENTATION ONLY

审计出口：
NOW — CORRECTIVE ATOMIC MIGRATION APPLICATION READY

Phase 3：
ACTIVE / NOT PASSED

Visual Runtime：
DEFER

Phase 4：
LOCKED
```

现有两个权威域足以承载修订后的 Saga：

```text
Growth Canonical Transaction Authority
→ Choice / Departure / Return / Resolution / Fact

Reality Encounter Intent Authority
→ Return Intent / target Encounter lifecycle

Cross-store coordination
→ deterministic request identity
  + typed proof snapshot
  + fresh revalidation
  + idempotent retry
  + forward compensation
```

不得把两个 IndexedDB 数据库描述为一个原子事务。产品成功只在各自所需事务完成、跨域证明重新校验且当前步骤满足后成立。

---

## 二、重新冻结的唯一 Saga

### 2.1 Departure：直接进入真实生活

```text
Choice COMMITTED
↓ 用户点击“带着这一步，回到生活”
Growth readwrite transaction：
  重读 Choice
  校验 Identity / Route / Observation / source Encounter
  校验尚无合法 Departure / Fact / 更高 Growth 终局
  写入确定性 Departure Receipt
↓ IDBTransaction complete
DORMANT_DEPARTURE
```

此阶段不允许发生：

```text
New Reality Intent：0
targetEncounterCycleId：不存在
/reality navigation：0
Return Receipt：0
Lived Response Surface：0
```

Departure Receipt 只证明用户明确把同一 Choice 带回真实生活；不证明页面关闭、行动发生、用户回来或新 Reality 成立。

### 2.2 Return：用户明确回来后建立新 Intent

```text
DORMANT_DEPARTURE
↓ 用户点击“我回来了”
读取并校验当前 Identity + Choice + Departure
↓
Reality Intent transaction：
  request / recover deterministic Return Intent Request
  唯一生成或恢复 targetEncounterCycleId
↓ transaction complete
typed Reality lineage proof
↓
Growth readwrite transaction：
  重读 Choice + Departure
  重新校验 Reality proof
  校验同一 returnAttemptRevision 尚无 Receipt
  写入唯一 Return Receipt
↓ transaction complete
READY_FOR_LIVED_RESPONSE
```

用户打开 App、刷新、Back/Forward、等待、通知点击或进入后台都不能替代“我回来了”。

### 2.3 Resolution：现实回应后由 `/reality` 承接

形成正式 Fact 的结果：

```text
READY_FOR_LIVED_RESPONSE
↓ 用户确认实际尝试 / 改变了回应
同一 Growth transaction：
  重读 Return Receipt
  重新校验 Choice / Identity / Route / Observation
  重新校验 Reality proof
  写入或确认唯一 Lived Response Fact
  消费 Return Receipt
  推进 provenance resolution
↓ transaction complete
RESUME_REPORTED
↓
同一 target Encounter 的 /reality Route Admission
↓
Reality Host typed commit
```

不形成 Fact 的结果：

```text
尚未尝试 / 用户拒绝记录
↓
Growth transaction：
  将当前 Return Receipt 标记为 RESOLVED_WITHOUT_FACT
  记录 typed no-fact reason
  保留 Choice + Departure lineage
↓ transaction complete
不进入 /reality
不生成 Fact / Eligibility / Crystal
```

随后对 target Intent 执行幂等终结补偿。补偿失败时 Growth 中的 no-fact resolution 已足以阻止该 Intent 被当作可承接 Reality；系统进入可重试的 `SAFE_WITHHELD`，不得导航。

---

## 三、修订后的逻辑 Schema

### 3.1 Departure Receipt

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
  state:
    | "DORMANT_DEPARTURE"
    | "RETURN_IN_PROGRESS"
    | "RETURNED"
    | "INVALIDATED";
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

Departure Receipt 明确禁止包含：

```text
targetEncounterCycleId
Reality Intent Reference
Reality lineage proof
/reality route success
action completion
Lived Response result
```

确定性 ID：

```text
choice-departure-receipt:
  choiceActionIntentionReferenceId
  + actionRouteReferenceId
  + actionRoutePrototypeVersion
  + gravityObservationReferenceId
  + sourceEncounterCycleId
  + choiceRevisionAtDeparture
```

同一 Choice lineage 最多一个当前有效 Departure Receipt。时间、tab ID、页面 mount、Motion 状态与随机数不得进入 ID。

### 3.2 Return Intent Request

Return Intent Request 是 Reality Intent Controller 的幂等请求身份，不是新的持久化 Owner。

```ts
type XinmaiChoiceReturnIntentRequest = Readonly<{
  returnIntentRequestReferenceId: string;
  departureReceiptReferenceId: string;
  choiceActionIntentionReferenceId: string;
  identityReferences: RealityEncounterIdentityReferences;
  sourceEncounterCycleId: string;
  returnAttemptRevision: number;
  origin: "CHOICE_RETURN";
  qualification: "EXPLICIT_RETURN_TO_CHOICE";
  routeTarget: "/reality";
}>;
```

确定性 ID：

```text
choice-return-intent-request:
  departureReceiptReferenceId
  + returnAttemptRevision
```

`targetEncounterCycleId` 仍由 Reality Encounter Intent Controller 在第一次成功提交该 request 时唯一生成。它不要求确定性字符串，但必须由 `returnIntentRequestReferenceId` 唯一恢复：

```text
同一 requestReferenceId
→ 同一个 Intent
→ 同一个 targetEncounterCycleId
```

只有上一 Return attempt 已正式无 Fact 终结、失效或完成，并且用户再次明确点击“我回来了”，才能递增 `returnAttemptRevision` 并产生新 request。

### 3.3 Return Receipt

```ts
type XinmaiChoiceExplicitReturnReceipt = Readonly<{
  schemaVersion: "XINMAI_CHOICE_RETURN_RECEIPT_V1";
  source: "xinmai_choice_returning_provenance_controller";
  returnReceiptReferenceId: string;
  returnIntentRequestReferenceId: string;
  departureReceiptReferenceId: string;
  choiceActionIntentionReferenceId: string;
  identityReferences: RealityEncounterIdentityReferences;
  actionRouteReferenceId: string;
  gravityObservationReferenceId: string;
  sourceEncounterCycleId: string;
  targetEncounterCycleId: string;
  returnAttemptRevision: number;
  revision: number;
  state:
    | "READY_FOR_LIVED_RESPONSE"
    | "CONSUMED_BY_FACT"
    | "RESOLVED_WITHOUT_FACT"
    | "INVALIDATED";
  consumedLivedResponseReferenceId: string | null;
  noFactReason:
    | "NOT_ATTEMPTED"
    | "USER_REJECTED_RECORD"
    | null;
  realityProof: XinmaiChoiceReturningRealityProof;
  returnedAt: string;
  updatedAt: string;
  provenance: Readonly<{
    userExplicitReturn: true;
    realityIntentCommittedBeforeReceipt: true;
    noRealityActivationClaim: true;
    noActionCompletionClaim: true;
    noCrystalAuthority: true;
  }>;
}>;
```

确定性 ID：

```text
choice-return-receipt:
  departureReceiptReferenceId
  + returnIntentRequestReferenceId
  + targetEncounterCycleId
  + returnAttemptRevision
```

同一 Departure 可保留多个已终结的历史 Return attempts，但任一时刻最多一个 `READY_FOR_LIVED_RESPONSE`；同一 attempt 最多一个 Return Receipt。

### 3.4 Resolution Command 与 Fact

Resolution command 的幂等身份：

```text
lived-response-resolution:
  returnReceiptReferenceId
  + candidateReferenceId
  + userConfirmationRevision
```

形成 Fact 时，现有 Fact ID 继续由 Lived Response Authority 唯一生成，例如：

```text
lived-response:
  choiceActionIntentionReferenceId
  + factRevision
```

Resolution command 不是 Fact；Fact 仍由现有 Fact Authority 生产。`NOT_ATTEMPTED` 与 `USER_REJECTED_RECORD` 不进入新 Fact 生产路径。

### 3.5 Growth Envelope 与物理存储

```text
Physical IndexedDB database：保持
Physical version：保持
Object Store：不新增
Canonical Growth Envelope：逻辑 V1 → V2
Reality Continuity Store：复用现有 Record
New Route Storage：0
```

V1 读取兼容；首次合法 V2 写入只初始化空 Receipt / Resolution 集合，不生成语义事实。

---

## 四、V1、旧 V2 与失败候选边界

### 4.1 远程 V1

```text
既有 Choice / Fact / Eligibility / Formation Receipt / Crystal / Archive：KEEP
Receipt collection：初始化为空
Semantic backfill：0
```

读取到旧 `AWAITING_RETURN`：

```text
不得生成 Departure Receipt
不得生成 Return Receipt
不得生成 Return Intent
不得开放 Lived Response
不得删除既有 Choice
→ TARGET_REALITY_BOUND_UNPROVEN / SAFE_WITHHELD
```

### 4.2 `e9326f7…` 的旧 V2

`e9326f7…` 从未进入远程权威分支。因此：

```text
在线 V2 → 修订 V2 migration：不需要
历史兼容承诺：不建立
整体 cherry-pick：禁止
amend 后冒充原候选：禁止
本地证据保留：是
```

若开发环境检测到其旧 Receipt 结构，只能标记 `REJECTED_CANDIDATE_SCHEMA / SAFE_WITHHELD`；不得将其中 target-bound Departure 解释为真实离场。

### 4.3 No Backfill

以下事实永远不能由迁移推测：

- 用户是否明确离场；
- 用户是否明确回来；
- 用户是否尝试；
- 用户是否拒绝记录；
- 哪个旧 target cycle 属于 Return；
- 用户是否应进入新 `/reality`。

---

## 五、幂等与唯一性

| 资产 | 唯一材料 | 生成者 | 重试语义 |
|---|---|---|---|
| Departure Receipt | Choice + Route/version + Observation + source cycle + choice revision | Growth Authority | exact retry 返回同一 Receipt |
| Return Intent Request | Departure Receipt + return attempt revision | Returning Provenance Controller | exact retry 恢复同一 request |
| Target Encounter Cycle | 已提交的 Return Intent Request | Reality Intent Controller | 同 request 恢复同一 cycle |
| Return Receipt | Departure + request + target cycle + attempt revision | Growth Authority | exact retry 返回同一 Receipt |
| Resolution Command | Return Receipt + candidate + confirmation revision | Lived Response Controller | exact retry 恢复同一 Resolution |
| Lived Response Fact | Choice lineage + fact revision | Fact Authority | 同 Resolution 最多一个 Fact |

并发纪律：

- Departure 双击 / 双标签最终有效 Receipt = 1；
- 同一 `returnAttemptRevision` 的 Return Intent = 1；
- 同一 Return request 的 target cycle = 1；
- 同一 attempt 的 Return Receipt = 1；
- Return Receipt 最多消费一次；
- Fact transaction 失败时 Return Receipt 仍为 `READY_FOR_LIVED_RESPONSE`；
- no-fact resolution 完成后旧标签不得再提交 Fact；
- 已形成 Fact 后旧标签只能恢复同一 Fact；
- 时间、页面锁、按钮禁用、DOM、Web Lock callback 与 Motion 不承担唯一性。

---

## 六、Return 半事务与补偿

### 6.1 Intent 未建立

```text
Reality Intent request abort / blocked / corrupted
→ Growth 不写 Return Receipt
→ Departure 保留 DORMANT
→ SAFE_WITHHELD / retry same explicit Return command
```

### 6.2 Intent 已建立，Return Receipt 写入失败

```text
Reality Intent READY
+ targetEncounterCycleId 已生成
+ Return Receipt = 0
```

正式恢复：

1. 使用同一 `returnIntentRequestReferenceId` 查找 matching Intent；
2. immutable tuple、identity、Choice、Departure 与 lifecycle 全部一致时复用；
3. 复用同一 `targetEncounterCycleId`；
4. 重试 Growth Return Receipt transaction；
5. 不生成第二 request、第二 target 或第二 Receipt；
6. 任何多个 matching Intent 或 tuple 冲突进入 `SAFE_WITHHELD`。

### 6.3 Return Receipt 不得提前形成

Growth Authority 接受 Return Receipt 前必须读取 typed Reality proof，并验证：

```text
requestReferenceId matches
targetEncounterCycleId matches
origin = CHOICE_RETURN
qualification = EXPLICIT_RETURN_TO_CHOICE
identity references match
choice / departure references match
intent state is an allowed committed pre-activation state
canonical revision / fencing token do not regress
```

Intent request 返回临时对象、request success、navigate 调用或页面状态均不构成 proof。

### 6.4 Fact 已提交，`/reality` 导航失败

```text
Fact + consumed Return：保留
target Intent：保留 / recoverable
页面：显示真实已记录状态
后续：只重试同 target 的 Route / Host admission
不得重复 Fact / Return / target creation
```

### 6.5 No-fact Resolution 与 Intent 终结

Growth no-fact transaction 完成后，Reality Intent 执行幂等 terminal compensation：

```text
terminalReason = RETURN_WITHOUT_LIVED_RESPONSE
或 USER_DECLINED_RECORD
```

若 Reality terminalization 失败：

- Growth no-fact resolution 保持权威；
- Admission Resolver 拒绝使用该 target；
- retry 只补偿 terminalization；
- 不恢复 Lived Response 表面；
- 不进入 `/reality`。

---

## 七、四类 Lived Response 产品去向

| 用户结果 | 形成 Fact | 消费当前 Return Receipt | Departure 关系 | `/reality` | Growth |
|---|---:|---|---|---:|---|
| 已尝试 `ATTEMPTED` | 是 | `CONSUMED_BY_FACT` | `RETURNED` | 是，同一 target | Eligibility 由既有 Authority 决定 |
| 改变了回应 `CHANGED_RESPONSE` | 是 | `CONSUMED_BY_FACT` | `RETURNED` | 是，同一 target | 不评价结果，Eligibility 正常解析 |
| 尚未尝试 `NOT_ATTEMPTED` | 否 | `RESOLVED_WITHOUT_FACT` | 回到 / 保留 `DORMANT_DEPARTURE` | 否 | 无 Fact、Eligibility、Crystal；可日后再次明确回来 |
| 拒绝记录 `USER_REJECTED_RECORD` | 否 | `RESOLVED_WITHOUT_FACT` | 保留 Choice 与 Departure；可继续同行 | 否 | 不保存用户描述，不生成隐藏 Fact |

共同规则：

- 不惩罚；
- 不让星兽恶化；
- 不清除已有 Choice；
- 不用 AI 推断实际行动；
- 不用等待时长推断；
- 不生成 Crystal 或奖励预告；
- 用户可离开安全生命空间。

当前失败候选把 `NOT_ATTEMPTED` 作为 Fact outcome 的路径不得进入新生产编排。现有类型可为历史只读兼容保留，但新 Resolution Controller 必须在调用 Fact Authority 前将它路由到 no-fact transaction；Fact Authority 无需被放宽或改写成页面语义。

---

## 八、Admission 状态机

```ts
type XinmaiChoiceDepartureReturningAdmission =
  | "RESUME_COMMITTED"
  | "DEPARTURE_COMMITTING"
  | "DORMANT_DEPARTURE"
  | "RETURN_INTENT_ESTABLISHING"
  | "READY_FOR_LIVED_RESPONSE"
  | "RESOLVING_LIVED_RESPONSE"
  | "RESUME_REPORTED"
  | "TERMINAL_BY_GROWTH"
  | "SAFE_WITHHELD";
```

优先级：

```text
Recovery corrupted / identity mismatch / conflicting proof
→ SAFE_WITHHELD

Eligibility / Formation Receipt / Crystal
→ TERMINAL_BY_GROWTH

Lived Response Fact
→ RESUME_REPORTED

Return Receipt READY
→ READY_FOR_LIVED_RESPONSE

Return Intent request in progress, Receipt absent
→ RETURN_INTENT_ESTABLISHING

Departure Receipt valid
→ DORMANT_DEPARTURE

Choice COMMITTED only
→ RESUME_COMMITTED
```

`Pointer Fix` 只允许在 `READY_FOR_LIVED_RESPONSE` 挂载的 Surface 生效。其余状态不挂载或不可命中 Lived Response 操作面。

Motion 与 Reduced Motion 消费同一个 typed Admission；视觉表现不得改变事实状态。

---

## 九、消费者原子切换

| 消费者 | 当前风险 | 目标责任 | 裁决 |
|---|---|---|---|
| Gravity Choice Continuation | Choice 后混入新 Reality 编排 | 只恢复 COMMITTED 与 Departure CTA | ADAPT |
| Explicit Departure Button | 混合离场与 `/reality` Intent | 只发 Growth Departure command | MIGRATE |
| Dormant Departure Surface | 当前缺正式终态 | 只读 Receipt，展示安静离场 | ADD WITHIN SCOPE |
| Returning Entry | 身份一致或打开 App 可能被误当 Return | 只显示明确“我回来了”动作 | ADAPT |
| Reality Intent Request | 当前在 Departure 前调用 | 仅在 Explicit Return 后调用 | MIGRATE TIMING |
| Reality Intent Controller | CHOICE_CONTINUATION 匹配不足以区分 Return attempt | 支持 typed request reference 与唯一恢复 | ADAPT / KEEP AUTHORITY |
| Reality Proof Adapter | proof 时点过早 | 只为 Return Receipt / Resolution 读取 | MIGRATE TIMING |
| Provenance Admission Resolver | 旧 target-bound Departure | 消费 revised typed receipts / proof | REWRITE DECISION |
| Lived Response Surface | 开放 Growth item 旁路 | 只消费 READY admission | ADAPT |
| Lived Response Authority | `NOT_ATTEMPTED` 可走 Fact | 仅接收 fact-forming outcomes | KEEP CORE / NARROW PRODUCER |
| No-fact Resolution | 当前缺失 | Growth transaction resolve Return without Fact | ADD WITHIN OWNER |
| `/reality` Resolution Handoff | Departure 后过早导航 | 仅在 Resolution 成功后承接同 target | MIGRATE |
| `bindChoiceActionIntentionToRealityEncounter` | 把 target 绑定到 Choice / Departure | 退出 Departure 与成功真源 | DELETE / FORBID |
| 旧 `COMMITTED/AWAITING_RETURN` 入口 | 混淆四类事实 | typed Admission 唯一入口 | DELETE |
| 旧开放 Growth Item 入口 | identity + open item 假入口 | 0 production consumers | DELETE |
| Growth Recovery | 未知 Receipt schema | 派生 typed Summary，不产生事实 | ADAPT |
| Route / Page | 可能自行读 Storage / 导航 | 只消费 typed commands / outcomes | ADAPT |
| Pointer Fix `33ae0ba…` | 技术命中可形成旁路 | 精确重建并受 READY gate | KEEP CORE / GATE |
| Renderer / DOM / Timer / AI | 禁止成为事实生产者 | 只允许展示或辅助整理候选 | REJECT AUTHORITY |

新旧编排必须在同一 Runtime 提交切换。禁止：

```text
新 Departure Growth-only path
+ 旧 Departure → Reality Intent path

新 typed Returning Admission
+ 旧 open Growth item surface

新 Resolution handoff
+ 旧 immediate /reality navigation
```

---

## 十、`e9326f7…` 逐文件复用矩阵

| 文件 | 裁决 | 修订要求 |
|---|---|---|
| `package.json` | REIMPLEMENT | 只注册修订后专属 Gate，不复制错误语义命令 |
| `scripts/check-xinmai-choice-action-intention-boundary.mjs` | ADAPT | 保护 Choice ≠ Departure、Departure 无 target |
| `scripts/check-xinmai-choice-returning-provenance-authority.mjs` | REWRITE SEMANTICS | 新增 Departure 0 Intent、Return request 幂等、Resolution 后导航断言 |
| `scripts/check-xinmai-lived-growth-browser-acceptance-surface.mjs` | ADAPT | 只作验收，不成为生产 Authority |
| `src/components/XinmaiLivedResponseReturnSurface.tsx` | KEEP POINTER CORE / ADAPT | 命中修正只在 READY admission 生效；no-fact 结果不提交 Fact |
| `src/pages/GravityPage.tsx` | REWRITE ORCHESTRATION | 删除 Departure 前 `requestRealityEncounter` 与 immediate navigate；接 Growth-only Departure |
| `src/pages/LaunchLab.tsx` | ADAPT RETURN ENTRY | 明确“我回来了”后才请求 Intent；打开页面不自动 Return |
| `src/pages/XinmaiLivedGrowthAcceptancePage.tsx` | ISOLATE / ADAPT TESTS | 不进入生产包；更新修订 Saga 场景 |
| `src/services/xinmaiChoiceActionIntentionController.ts` | SELECTIVE REUSE | 保留 Choice Authority；删除 target binding / `AWAITING_RETURN` 成功真源 |
| `src/services/xinmaiChoiceReturningProvenanceAdmissionResolver.ts` | REWRITE INPUT ORDER | 五态按 revised Receipt / proof / Growth terminal 优先级派生 |
| `src/services/xinmaiChoiceReturningProvenanceController.ts` | SELECTIVE REIMPLEMENT | 复用事务与 validator 框架；拆成 Growth-only Departure、Return Saga、Resolution |
| `src/services/xinmaiChoiceReturningProvenanceMutationPolicy.ts` | KEEP / EXTEND | 保持 Safe-Withheld，加入 no-fact 与暂停策略 |
| `src/services/xinmaiChoiceReturningProvenanceRecoveryAdapter.ts` | ADAPT | V1 no backfill；旧 candidate schema isolate；typed summary |
| `src/services/xinmaiChoiceReturningRealityProofAdapter.ts` | KEEP CORE / RETIME | 只在 Return 与 Resolution 读取，不参与 Departure |
| `src/services/xinmaiLivedGrowthAcceptancePersistenceAdapter.ts` | ISOLATE | 仅开发验收；不得进入生产 Authority |
| `src/services/xinmaiLivedGrowthRecoveryPersistenceAdapter.ts` | ADAPT | revised logical V2 validator；旧 target-bound Departure 拒绝 |
| `src/services/xinmaiLivedGrowthTransactionalStore.ts` | KEEP TRANSACTION CORE / ADAPT MUTATIONS | 保留唯一 writer；新增 revised Departure / Return / no-fact mutation |
| `src/services/xinmaiLivedResponseAuthorityController.ts` | KEEP FACT CORE / ADAPT CALLER CONTRACT | Fact + Return consumption 同事务；不接受 no-fact outcomes |
| `src/types/index.ts` | REIMPLEMENT EXPORTS | 只导出修订 typed contracts |
| `src/types/xinmaiChoiceReturningProvenance.ts` | REWRITE SCHEMA | Departure 无 target；Return / request / attempt revision 分离 |
| `src/types/xinmaiLivedGrowthRecovery.ts` | ADAPT | V1 兼容、revised V2、无语义 backfill |
| `src/types/xinmaiLivedGrowthTransaction.ts` | ADAPT | typed mutations / outcomes 与暂停策略 |

失败候选未触及但新 Runtime 必须纳入审计边界的文件：

| 文件 | 原因 |
|---|---|
| `src/types/xinmaiRealityEncounterIntent.ts` | 新 `CHOICE_RETURN` origin / qualification / request reference contract |
| `src/services/xinmaiRealityEncounterIntentController.ts` | 同 request 复用同 target；唯一 cycle generator |
| `src/services/xinmaiRealityEncounterIntentRecoveryAdapter.ts` | request reference 恢复、冲突隔离、terminal compensation |
| Reality Route / Host 直接相关消费者 | 只在 Resolution 后承接，不得回到 Departure 导航 |

明确禁止复用：

- Departure 前创建 Reality Intent；
- Departure Receipt 依赖 `targetEncounterCycleId`；
- Departure 后立即导航 `/reality`；
- 同一按钮混合离场、Intent、Receipt 与导航；
- `COMMITTED → AWAITING_RETURN → Lived Response` 的旧捷径。

---

## 十一、Runtime 原子提交边界

未来 Corrective Application 必须从最新远程基线重新实现为一个 Runtime 提交，至少同时包含：

```text
Revised logical V2 Receipt schema
+ deterministic Departure / Return / Resolution IDs
+ Growth-only Departure transaction
+ Dormant Departure typed state
+ Explicit Return entry
+ idempotent Return Intent request / recovery
+ target cycle binds only at Return
+ Return Receipt Growth transaction
+ five-state-plus-transient Admission resolver
+ Fact + Return consumption transaction
+ no-fact Resolution transaction
+ post-Resolution /reality handoff
+ Pointer Fix behind READY admission
+ old bind / AWAITING_RETURN / open-item / immediate-navigation path removal
+ V1 No Backfill / rejected-candidate isolation
+ dedicated Gates and npm registration
```

不得先推送新 Schema、后切消费者；不得先删除旧入口、后补 Return Intent；不得把 `e9326f7…` 整体 cherry-pick 后增量修补。

目标文件范围限于：types、Growth/Reality Intent/Returning Provenance Controllers、Recovery/Proof Adapters、Gravity/Returning pages、Lived Response Surface、直接 Gate 与 Acceptance。Renderer、Crystal Formation、Phase 4、AI、Pressure Seed 内容与视觉均不在范围内。

---

## 十二、Forward `SAFE_WITHHELD` Counter

新 Runtime Candidate 必须同步准备并实际预演独立 forward counter-commit，其结果只能是：

```text
新的 Departure command：PAUSED
新的 Return command：PAUSED
新的 Lived Response Resolution：PAUSED

V2 Envelope：READABLE
Departure / Return Receipts：PRESERVED
Lived Response Facts：PRESERVED
Eligibility / Formation Receipt / Crystal / Archive：PRESERVED
Reality target Intent：PRESERVED / NOT DELETED

old mixed button：NOT RESTORED
COMMITTED → Lived Response shortcut：NOT RESTORED
old open Growth item entry：NOT RESTORED
Pointer Fix independent bypass：0
Schema downgrade：0
Semantic backfill：0
```

Counter 不删除已经建立的 target Intent；它通过只读 Recovery 展示真实安全扣留与稍后重试。不得普通 revert 复活失败架构。

触发条件包括：

- Departure 产生任何新 Reality Intent；
- 同一 Return request 产生第二 target cycle；
- Return Receipt 在 Intent proof 前形成；
- no-fact 结果生成 Fact；
- Fact 成功但 Return 未消费，或 Return 被消费但 Fact 未形成；
- 导航失败导致重复 Fact / Return；
- V1 / 旧候选结构被 backfill；
- 旧混合入口仍有生产消费者；
- Pointer Surface 在非 READY 状态可命中；
- Motion / Reduced Motion 使用不同事实语义。

---

## 十三、Gate 切换清单

未来同一 Runtime 提交至少建立：

1. Choice Commitment Is Not Departure Gate；
2. Departure Growth-only Transaction Gate；
3. Departure Target Encounter Forbidden Gate；
4. Departure Reality Intent / Navigation Forbidden Gate；
5. Dormant Departure Recovery Gate；
6. Explicit Return Required Gate；
7. Return Intent Request Idempotency Gate；
8. Target Encounter Unique Generator Gate；
9. Return Receipt Requires Committed Proof Gate；
10. Intent-complete / Receipt-failed Same-target Recovery Gate；
11. Return Receipt Active-attempt Uniqueness Gate；
12. Fact + Return Consumption Atomic Gate；
13. No-fact Resolution No Fact / No Reality Gate；
14. Reality Handoff After Resolution Gate；
15. Legacy Awaiting Return No Backfill Gate；
16. Rejected Candidate Schema Isolation Gate；
17. Old Mixed Consumer Forbidden Gate；
18. Pointer Ready-only Reachability Gate；
19. Motion / Native Reduced Motion Semantic Parity Gate；
20. Forward Safe-Withheld Preservation Gate。

源码精确文案与页面字符串不得成为产品权威断言。

---

## 十四、真实浏览器验收矩阵

### 14.1 Departure

- Choice COMMITTED 后只显示 Departure CTA；
- 点击前 Departure / Return / target = 0；
- transaction complete 前不显示离场成功；
- complete 后进入 Dormant，不创建 Intent，不导航 `/reality`；
- 双击、双标签最终 Departure = 1；
- 刷新、Back/Forward、关闭重开恢复 Dormant，但不自动 Return；
- transaction abort / blocked / close / quota 无伪成功；
- Motion / 原生 Reduced Motion 事实一致。

### 14.2 Return

- Dormant 中明确点击“我回来了”才发 request；
- 同 request 重试恢复同 target；
- 双击、双标签最终 Intent = 1、target = 1、Return Receipt = 1；
- Intent 完成而 Growth 写入失败，重试不生成第二 target；
- Reality proof mismatch / corrupted / unavailable 进入 Safe-Withheld；
- Direct URL 不生成 Return Receipt；
- 打开 App、刷新与时间经过不生成 Return；
- 旧 `AWAITING_RETURN` 不开放 Surface。

### 14.3 Resolution

- `ATTEMPTED`：Fact = 1，Return consumed = 1，同 target `/reality`；
- `CHANGED_RESPONSE`：Fact = 1，不评分，同 target `/reality`；
- `NOT_ATTEMPTED`：Fact = 0、Eligibility = 0、Crystal = 0、`/reality` = 0；
- `USER_REJECTED_RECORD`：不持久化描述，Fact = 0、`/reality` = 0；
- Fact failure 不消费 Return；
- Return 已消费后旧标签不能形成第二 Fact；
- Fact complete 后导航失败只重试 Handoff；
- target Intent terminal compensation 失败时不导航；
- Identity / Cycle / Choice / Route / Observation mismatch 无伪成功。

### 14.4 Recovery 与资产保护

- V1 用户可读且 Receipt 为空；
- 首次 V2 写入不损坏既有 Fact / Eligibility / Receipt / Crystal / Archive；
- V1/V2 混合标签不 lost write；
- rejected candidate schema 被隔离；
- 已形成 Growth 终局优先于 Returning Surface；
- Pointer 按钮仅在 READY 可命中，透明 Canvas 不覆盖；
- Production Bundle 不包含 Development Acceptance；
- Renderer、AI、Timer、DOM、Phase 4 新消费者 = 0。

### 14.5 工程与远程关闭条件

- TypeScript PASS；
- Production Build PASS；
- 全部 XINMAI Gates PASS；
- 新增失败 0；
- Runtime Candidate 单提交、工作树干净；
- Counter 父提交精确为 Candidate；
- 远程权威基线差异仅含授权范围；
- 远程干净快照可独立复现。

---

## 十五、失败矩阵

| 失败 | 权威结果 | 用户结果 |
|---|---|---|
| Departure proof stale | 无 Receipt | RESUME_COMMITTED / retry |
| Departure tx abort | 无 Receipt | 不显示成功 |
| 页面在 Departure complete 后崩溃 | Receipt 保留 | 下次恢复 Dormant |
| Return Intent request 失败 | Departure 保留 | Safe-Withheld / retry |
| Intent 成功、Return tx 失败 | 同 target 可恢复 | 不开放表单 |
| 多个 matching target | 不选赢家 | Safe-Withheld |
| Return complete、Surface 失败 | Return 保留 | 恢复 READY |
| Candidate 未确认 | 无 Fact、Return 未消费 | 留在 READY |
| Fact tx 失败 | 无新 Fact、Return 未消费 | retry |
| no-fact tx 失败 | Return 仍 READY | 不伪造拒绝/延后完成 |
| Fact complete、Route 失败 | Fact 保留 | 重试同 target Handoff |
| Reality Host 失败 | Intent 不 ACTIVE | 重试承接 |
| legacy / corruption | 不 backfill | Safe-Withheld |

所有失败都不得生成第二 Choice、第二身份、第二 target、隐藏 Fact 或 Crystal。

---

## 十六、架构不变量

```text
Choice ≠ Departure
Departure ≠ Return
Return ≠ Lived Response
Lived Response ≠ Crystal

Departure targetEncounterCycleId：0
Return Intent unique target：1 per attempt
Return Receipt before Intent proof：0
Fact without Return Receipt：0
No-fact outcome Fact：0
/reality before Resolution：0
Second Growth Writer：0
Second Reality Intent Controller：0
New Route / DOM / Timer Authority：0
Semantic Backfill：0
```

---

## 十七、Runtime Application 准入与下一刀

审计确认：

1. 新顺序可以由现有 Growth Authority 与 Reality Intent Authority 通过幂等 Saga 协调；
2. `returnIntentRequestReferenceId` 可以使 Intent-complete / Receipt-failed 安全恢复同一 target；
3. 不需要第二数据库、第二 Object Store 或第二 writer；
4. 四类 Lived Response 已获得一致产品去向；
5. 错误混合按钮、旧 target-bound Departure 与旧 Returning 入口可以在单一回滚单位清除；
6. `e9326f7…` 只允许逐文件、逐契约选择性重建，不能成为新候选父提交。

因此最终出口为：

```text
NOW — CORRECTIVE ATOMIC MIGRATION APPLICATION READY
```

建议下一刀：

```text
XINMAI-CHOICE-DIRECT-REAL-LIFE-DEPARTURE-
RETURN-INTENT-PROVENANCE-
CORRECTIVE-ATOMIC-MIGRATION-P0

交通灯：RED
刀型：Migration Blade / Corrective Atomic Cutover
决策：DEFER — WAITING PRODUCT CONTROL TOWER RUNTIME AUTHORIZATION
```

该下一刀必须从届时最新远程权威基线重新施工，形成全新原子 Runtime SHA，并保持 Push HOLD 直至完整浏览器矩阵与 forward counter 通过。
