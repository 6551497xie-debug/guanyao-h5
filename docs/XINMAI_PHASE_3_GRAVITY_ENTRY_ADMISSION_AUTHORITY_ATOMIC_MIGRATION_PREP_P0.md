# XINMAI Phase 3 Gravity Entry Admission Authority Atomic Migration Prep P0

## 0. 文档定位

任务：

```text
XINMAI-PHASE-3-GRAVITY-ENTRY-ADMISSION-AUTHORITY-ATOMIC-MIGRATION-PREP-P0
```

项目：

```text
/Users/xieyanjun/Desktop/guanyao-h5
```

刀型：

```text
Major Blade Prep
+
Atomic Migration Delivery Design
```

决策：

```text
NOW — PREP ONLY
```

主 Layer：

```text
Layer 4 — Growth
```

保护 Layer：

```text
Layer 2 — Identity
Layer 3 — Relationship
```

当前阶段：

```text
Phase 2:
CLOSED

Phase 3:
LOCKED
```

本刀权威基线：

```text
bd09bd410e21a423ef16f98d4bf07229b943b7bf
```

远程分支：

```text
codex/genesis-28-mansion-production-continuity
```

上游审计：

```text
XINMAI-PHASE-3-GRAVITY-ENTRY-ADMISSION-AUTHORITY-ATOMIC-MIGRATION-AUDIT-P0
```

本刀不修改：

- Runtime；
- Route；
- Page；
- Host；
- Renderer；
- Controller；
- Recovery Storage；
- Pressure Seed；
- Six Dimension；
- Gravity；
- Choice；
- Crystal；
- 既存门禁。

本刀唯一目标：

> 把已经完成的 Reality V2 → Gravity Migration Audit 转译成一张可独立授权、可在单提交内完成、可整体回滚的 Runtime 施工卡，冻结最终类型、Controller API、Recovery Envelope、Route / Host 输入、真实表面结果、旧入口删除点与失败注入门禁。

本刀达到设计闭合即停止。

---

## 1. Construction State Card

```text
当前版本阶段：
Phase 2 CLOSED
Phase 3 LOCKED

当前主线：
Reality → Gravity 正式入口权威

本刀类型：
Major Blade Prep + Atomic Migration Delivery Design

主影响 Layer：
Layer 4 Growth

保护 Layer：
Layer 2 Identity
Layer 3 Relationship

已有完成资产：
RealityEncounterIntent
Reality V2 Pressure Seed Recognition
Reality typed surface outcome
Reality post-commit admission
Recognized Identity Recovery
LaunchLifeSourceSession
Visual Continuity
/dynamics / GravityPage
Six Dimension
Gravity inertia

本刀消费者：
未来 Runtime Atomic Migration

是否存在协议冲突：
NO

是否需要 Migration Audit：
已完成

Runtime Authorization：
NOT GRANTED

决策：
NOW — PREP ONLY
```

---

## 2. 上游裁决不再重开

以下结论已经冻结：

```text
Current Gravity Surface:
/dynamics / GravityPage

Target Gravity Surface:
/dynamics / GravityPage

Strategy:
RETAIN + ADAPT

Target Entry Authority:
RealityToGravityEntryAdmissionController

Target Cutover Owner:
RealityToGravityCutoverTransaction

Target Route Consumer:
GravityProductionRouteEntry

Target Recovery Boundary:
Single session Recovery Adapter

Recovery TTL:
2 hours maximum

V1 Gravity Consumer:
DORMANT / DO NOT ACTIVATE

Migration:
ATOMIC

Second Gravity Runtime:
REJECT
```

本 PREP 不重新讨论：

- 是否新建 Gravity 页面；
- 是否复活 `RealityProductionGravityConsumer`；
- 是否允许旧 localStorage 继续决定当前 Gravity；
- 是否允许 `/dynamics` 直接 mount 即成功；
- 是否拆成多个提交逐步迁移。

正式方向只有：

```text
保留 GravityPage
↓
建立唯一 Typed Admission
↓
原子切换 Reality → Gravity
↓
切断旧生产旁路
↓
真实 Gravity surface outcome 提交 ACTIVE
```

---

## 3. 既有可复用权威模式审查

### 3.1 Reality Encounter Intent

当前已有：

```text
src/types/xinmaiRealityEncounterIntent.ts
src/services/xinmaiRealityEncounterIntentController.ts
src/services/xinmaiRealityEncounterIntentRecoveryAdapter.ts
```

已经证明可复用的纪律：

- Controller 是唯一状态权威；
- ID 只由 Controller 生成；
- Recovery candidate 不是产品权威；
- Recovery Adapter 是唯一 storage Reader / Writer；
- TTL 从 Controller 接受用户明确请求时开始；
- 刷新与重试不得延长 TTL；
- revision、cycle、三项身份引用共同拒绝旧回调；
- failure 明确进入 `FAILED_RETRYABLE`；
- route 或 page 不直接提交 Active。

Gravity 必须复用这套纪律。

Gravity 不得复用：

- Reality 的 `intentReferenceId` 作为自己的 Admission ID；
- Reality 的 `encounterCycleId` 作为 `gravityCycleId`；
- Reality 的 storage key；
- Reality 的状态对象；
- Reality 的 Route target；
- Reality 的 Controller 当前状态。

结论：

```text
Pattern:
REUSE

Runtime State:
SEPARATE

Second Relationship Runtime:
NO

Second Gravity Runtime:
NO
```

### 3.2 Reality typed surface admission

当前已有：

```text
src/types/xinmaiRealitySurfaceAdmission.ts
src/services/xinmaiRealitySurfaceAdmissionTransaction.ts
RealityLifeUniverseCanvas
RealityPressureSeedPresentation
RealityProductionHost
```

已经证明：

```text
Life Surface Outcome
+
Pressure Surface Outcome
↓
Typed Admission Transaction
↓
Controller commit ACTIVE
```

正确纪律：

- 每个 outcome 携带同一 cycle、revision 与身份引用；
- Host 只汇聚事实；
- Transaction 检查两个 outcome 是否属于同一次 attempt；
- Controller 最终提交；
- Watchdog 只报告失败；
- DOM `data-*` 只用于观测与验收；
- fixed timer 不得制造成功。

Gravity 复用：

- typed attempt；
- typed outcome；
- Host aggregation；
- stale result rejection；
- Motion / Static 双路径；
- failure-only watchdog。

Gravity 不复用：

- Reality Pressure Candidate surface；
- Reality minimum surface 名称；
- Reality admission revision；
- Reality Host 的当前状态。

### 3.3 Reality Route post-commit transaction

当前 `RealityProductionRouteEntry` 已把 Admission、Activation Source 与 Recovery 写入移出 render / `useMemo`，放入明确的 post-commit effect。

可复用纪律：

```text
Render:
纯读取 / 纯推导

Post Commit:
校验 current cycle
建立 Admission
建立 Activation Source
确认 Recovery
发布 Route Host input
```

必须继续保持：

- render 阶段 Controller mutation = 0；
- render 阶段 Recovery write = 0；
- Strict Mode 重复 effect 只产生一次有效推进；
- cleanup 不代表明确离开；
- abandoned render 不推进 revision；
- stale transaction 不发布；
- Route 失败保留同周期重试。

Gravity Route 不得把代码机械移动到 `useEffect` 后就宣称完成。

它必须具有：

- transaction identity；
- idempotency；
- stale cancellation；
- confirmed Recovery；
- rollback / retry 语义。

### 3.4 Recognized Identity Recovery

当前：

```text
recoverRealityRecognizedIdentity()
```

可输出：

```text
sourceReferenceId
starBeastIdentityReferenceId
mansionCoordinateReferenceId
realityEntryContext
lifeSourceSession
visualContinuity
presenceVisualRealization
```

它已经校验：

- 同一生命来源；
- 同一星兽身份；
- 同一二十八宿坐标；
- 同一视觉连续；
- 同一 `LaunchLifeSourceSession`。

Gravity 不新增 Identity Recovery。

正式复用：

```text
Existing Recognized Identity Recovery
```

禁止：

- 用关系名决定身份；
- 用 selected seed 决定身份；
- 用 route state 冒充身份；
- 用 localStorage mother / persona 组合身份；
- 为 Gravity 重建一套 recognized identity。

### 3.5 当前 Gravity 入口事实

当前正式 Reality Route：

```text
terminateRealityEncounter(ENCOUNTER_COMPLETED)
↓
writeSelectedPressureSeedContext()
↓
navigate("/dynamics", route state)
```

当前 `GravityPage`：

```text
useLocation()
↓
resolveDynamicsInputContext()
↓
route state
或
historical localStorage
↓
create Gravity runtime
```

因此当前仍可能出现：

```text
历史 Seed
+
历史 Mother
↓
当前 Gravity READY
```

这正是未来 Atomic Migration 必须一次消除的旧权威。

---

## 4. 最终权威拓扑

正式目标链：

```text
RealityEncounterIntent
ACTIVE_IN_REALITY
        ↓
RealityProductionHost
产生 Typed Gravity Transfer Request
        ↓
RealityProductionRouteEntry
调用唯一 Cutover Transaction
        ↓
RealityToGravityEntryAdmissionController
生成 gravityCycleId 与 TRANSFER_PREPARED
        ↓
RealityToGravityCutoverTransaction
校验 Reality / Identity / Pressure / Body Approach
        ↓
GravityEntryRecoveryAdapter
确认写入 Durable Cutover Envelope
        ↓
Source Reality:
SUPERSEDED_BY_GRAVITY_TRANSFER

Target Gravity:
READY_TO_ENTER_GRAVITY
        ↓
Gravity Route Ticket
        ↓
GravityProductionRouteEntry
post-commit Admission
        ↓
Gravity Production Runtime Input
        ↓
GravityPage
        ↓
Typed Same-Life Surface Outcome
+
Typed First Observation Outcome
        ↓
GravitySurfaceAdmissionTransaction
        ↓
RealityToGravityEntryAdmissionController
ACTIVE_IN_GRAVITY
```

唯一状态权威：

```text
RealityToGravityEntryAdmissionController
```

唯一 durable cutover writer：

```text
XinmaiGravityEntryRecoveryAdapter
```

唯一 target production route：

```text
GravityProductionRouteEntry
```

唯一体验表面：

```text
GravityPage
```

---

## 5. 最终状态机

### 5.1 状态集合

```ts
type GravityEntryAdmissionState =
  | "TRANSFER_PREPARED"
  | "READY_TO_ENTER_GRAVITY"
  | "ACCEPTING_GRAVITY"
  | "FAILED_RETRYABLE"
  | "ACTIVE_IN_GRAVITY"
  | "TERMINAL";
```

`ABSENT` 表示 Controller 当前没有 Admission 对象，不写入 union。

### 5.2 正常链

```text
ABSENT
↓ prepare transfer
TRANSFER_PREPARED
↓ durable cutover envelope CONFIRMED
READY_TO_ENTER_GRAVITY
↓ route post-commit accepts
ACCEPTING_GRAVITY
↓ typed minimum surface transaction
ACTIVE_IN_GRAVITY
↓ explicit leave / completed / new reality / expired / cleared
TERMINAL
```

### 5.3 失败链

```text
TRANSFER_PREPARED
或
READY_TO_ENTER_GRAVITY
或
ACCEPTING_GRAVITY
↓
FAILED_RETRYABLE
↓ same cycle retry
READY_TO_ENTER_GRAVITY
或
ACCEPTING_GRAVITY
```

### 5.4 `TRANSFER_PREPARED`

只代表：

- source Reality 仍为 `ACTIVE_IN_REALITY`；
- 用户明确请求继续靠近当前 Reality 痕迹；
- Pressure Seed 已由用户认出；
- body approach 已成立；
- 三项身份引用已匹配；
- Controller 已生成 target candidate；
- durable cutover 尚未提交。

不得：

- 导航；
- 终结 Reality；
- 写历史 Seed；
- 启动 Six Dimension；
- 声称进入 Gravity；
- 被 Recovery 作为 Ready 恢复。

### 5.5 `READY_TO_ENTER_GRAVITY`

只在 Durable Cutover Envelope read-after-write 确认后成立。

它证明：

- source Reality terminal proof 与 target admission 位于同一个 envelope；
- source 与 target 三项身份一致；
- source Reality cycle 与 Pressure capture provenance 已冻结；
- target route 固定 `/dynamics`；
- 同一 `gravityCycleId` 已成为恢复单位。

它不证明：

- Route 已 mount；
- `GravityPage` 已执行；
- Canvas 已显示；
- Six Dimension 已可交互；
- Gravity 已 Active。

### 5.6 `ACCEPTING_GRAVITY`

只在：

```text
GravityProductionRouteEntry
post-commit transaction
```

成功后成立。

它证明：

- Route 接受同一 Admission；
- Identity Recovery 仍匹配；
- Cutover Recovery 仍匹配；
- Production Runtime Input 已组装；
- 正在等待真实 minimum surface。

### 5.7 `ACTIVE_IN_GRAVITY`

只有以下事实属于同一 transaction 才成立：

```text
同一 admissionReferenceId
+
同一 gravityCycleId
+
同一 admission revision
+
同一三项身份引用
+
同一 source Reality proof
+
同一 selected Pressure Seed
+
同一 body approach proof
+
Same-Life Surface Presented
+
First Gravity Observation Presented
```

以下都不能提交 Active：

- `navigate("/dynamics")`；
- Route mounted；
- Page render；
- route state 存在；
- localStorage Seed 存在；
- localStorage Mother 存在；
- engine snapshot created；
- Canvas DOM 节点存在；
- `data-*` 存在；
- fixed timer 结束；
- Watchdog 结束；
- dormant V1 consumer 返回 READY。

### 5.8 `FAILED_RETRYABLE`

保留：

- 同一 `gravityCycleId`；
- 同一 Admission reference；
- 同一身份；
- 同一 current pressure snapshot；
- 同一 source Reality terminal proof；
- 同一 TTL；
- 同周期重试资格。

不得：

- 生成新 `gravityCycleId`；
- 回退历史 Seed；
- 重新激活 source Reality；
- 从 LaunchLab 旁路进入；
- 自动进入 Choice。

---

## 6. 最终类型契约

新增：

```text
src/types/xinmaiGravityEntryAdmission.ts
```

### 6.1 Schema constants

```ts
export const XINMAI_GRAVITY_ENTRY_ADMISSION_SCHEMA_VERSION =
  "XINMAI_GRAVITY_ENTRY_ADMISSION_V1" as const;

export const XINMAI_REALITY_TO_GRAVITY_CUTOVER_SCHEMA_VERSION =
  "XINMAI_REALITY_TO_GRAVITY_CUTOVER_V1" as const;

export const XINMAI_GRAVITY_ENTRY_RECOVERY_SCHEMA_VERSION =
  "XINMAI_GRAVITY_ENTRY_RECOVERY_V1" as const;

export const XINMAI_GRAVITY_ROUTE_TICKET_SCHEMA_VERSION =
  "XINMAI_GRAVITY_ROUTE_TICKET_V1" as const;
```

### 6.2 Identity references

不得复制一个新身份模型。

直接复用：

```ts
RealityEncounterIdentityReferences
```

字段：

```text
sourceReferenceId
starBeastIdentityReferenceId
mansionCoordinateReferenceId
```

### 6.3 Source Reality proof

```ts
type GravitySourceRealityProof = Readonly<{
  intentReferenceId: string;
  encounterCycleId: string;
  intentRevision: number;
  origin: RealityEncounterOrigin;
  qualification: RealityEncounterQualification;
  sourceState: "ACTIVE_IN_REALITY";
  terminalReason: "ENCOUNTER_COMPLETED";
  cutoverMeaning: "SUPERSEDED_BY_GRAVITY_TRANSFER";
  activeConfirmed: true;
}>;
```

裁决：

- Reality Controller 的既有 terminal reason 保持 `ENCOUNTER_COMPLETED`；
- Cutover Envelope 额外记录 `SUPERSEDED_BY_GRAVITY_TRANSFER`；
- 不为本迁移重写 Reality 产品语义；
- Recovery 时 Envelope 的 supersession 优先于旧 Reality recovery candidate。

### 6.4 Pressure proof

```ts
type GravityCurrentPressureProof = Readonly<{
  pressureSessionSchemaVersion:
    "GUANYAO_REALITY_PRODUCTION_PRESSURE_SEED_SESSION_V2";
  sourceReferenceId: string;
  candidateBundleReferenceId: string;
  selectedPressureSeedId: string;
  captureProvenance: RealityPressureSeedCaptureProvenance;
  gravityReadiness: "READY";
  userRecognitionConfirmed: true;
  selectedPressureSeedContext:
    Readonly<SelectedPressureSeedContext>;
}>;
```

约束：

- snapshot 只属于当前 Admission；
- snapshot 只在 2 小时 session recovery 内存在；
- 不替代 Pressure Seed 数据源；
- 不写入身份；
- 不进入长期 Archive；
- 不包含 Life Whisper 原文；
- 不包含关系名；
- 不包含 AI 推断；
- 不允许由 historical persistence 重新拼装。

### 6.5 Body approach proof

```ts
type GravityBodyApproachProof = Readonly<{
  source: "reality_inner_view_approach";
  innerViewEntry: "CURRENT_LIFE_WEATHER_BODY_APPROACHED";
  bodyApproachConfirmed: true;
  confirmedAt: string;
  sourceReferenceId: string;
  encounterCycleId: string;
}>;
```

当前 `setTimeout(1_200)` 不是 proof。

正式 proof 产生点：

```text
用户真实执行 approachCurrentLifeWeather
↓
Host 状态提交 BODY_APPROACHED
↓
Host 构造 typed proof
```

导航延时不得拥有 proof 权威。

### 6.6 Gravity Entry Admission

```ts
type GravityEntryAdmission = Readonly<{
  schemaVersion:
    typeof XINMAI_GRAVITY_ENTRY_ADMISSION_SCHEMA_VERSION;
  source:
    "reality_to_gravity_entry_admission_controller";
  admissionReferenceId: string;
  gravityCycleId: string;
  revision: number;
  state: GravityEntryAdmissionState;
  routeTarget: "/dynamics";
  identityReferences: RealityEncounterIdentityReferences;
  sourceReality: GravitySourceRealityProof;
  currentPressure: GravityCurrentPressureProof;
  bodyApproach: GravityBodyApproachProof;
  issuedAt: string;
  updatedAt: string;
  expiresAt: string;
  failure: GravityEntryFailure | null;
  terminalReason: GravityEntryTerminalReason | null;
  provenance: Readonly<{
    userExplicitRequest: true;
    identityAuthority: "EXISTING_RECOGNIZED_LIFE";
    realityAuthority: "XINMAI_REALITY_ENCOUNTER_INTENT";
    pressureAuthority: "REALITY_PRESSURE_SEED_SESSION_V2";
    bodyApproachAuthority: "REALITY_INNER_VIEW_APPROACH";
    noIdentityMutation: true;
    noPressureInference: true;
    noAutomaticSelection: true;
    noChoiceExecution: true;
    noCrystalExecution: true;
    noLegacyDynamicsAuthority: true;
  }>;
}>;
```

### 6.7 Failure types

```ts
type GravityEntryFailureStage =
  | "TRANSFER_PREPARE"
  | "CUTOVER_RECOVERY"
  | "SOURCE_SUPERSESSION"
  | "ROUTE_LOAD"
  | "ROUTE_ADMISSION"
  | "RUNTIME_INPUT"
  | "LIFE_SURFACE"
  | "OBSERVATION_SURFACE"
  | "MINIMUM_SURFACE"
  | "RECOVERY";
```

```ts
type GravityEntryFailureReason =
  | "SOURCE_REALITY_NOT_ACTIVE"
  | "IDENTITY_MISMATCH"
  | "PRESSURE_SESSION_NOT_CURRENT"
  | "PRESSURE_NOT_RECOGNIZED"
  | "BODY_APPROACH_NOT_CONFIRMED"
  | "CUTOVER_STORAGE_UNAVAILABLE"
  | "CUTOVER_WRITE_UNCONFIRMED"
  | "SOURCE_SUPERSESSION_STALE"
  | "ROUTE_LOAD_UNAVAILABLE"
  | "ADMISSION_NOT_CURRENT"
  | "ADMISSION_EXPIRED"
  | "RUNTIME_INPUT_UNAVAILABLE"
  | "LIFE_SURFACE_UNAVAILABLE"
  | "OBSERVATION_SURFACE_UNAVAILABLE"
  | "MINIMUM_SURFACE_NOT_PRESENTED"
  | "SURFACE_OUTCOME_MISMATCH"
  | "RECOVERY_CANDIDATE_INVALID"
  | "RECOVERY_AFTER_INCOMPLETE_ACCEPTANCE";
```

### 6.8 Terminal reasons

```ts
type GravityEntryTerminalReason =
  | "EXPLICIT_LEAVE"
  | "GRAVITY_OBSERVATION_COMPLETED"
  | "START_NEW_REALITY_ENCOUNTER"
  | "ADMISSION_EXPIRED"
  | "IDENTITY_MISMATCH"
  | "RECOVERY_CANDIDATE_INVALID"
  | "USER_DATA_CLEARED";
```

本 PREP 不授权何时触发：

```text
GRAVITY_OBSERVATION_COMPLETED
```

该事件属于 Phase 3 内部进展，未来单独审查。

### 6.9 Route ticket

```ts
type GravityRouteTicket = Readonly<{
  schemaVersion:
    typeof XINMAI_GRAVITY_ROUTE_TICKET_SCHEMA_VERSION;
  source: "reality_to_gravity_cutover_transaction";
  admissionReferenceId: string;
  gravityCycleId: string;
  expectedAdmissionRevision: number;
  identityReferences: RealityEncounterIdentityReferences;
  routeTarget: "/dynamics";
  cutoverEnvelopeReferenceId: string;
  issuedAt: string;
  expiresAt: string;
}>;
```

Route ticket：

- 是 transport hint；
- 不是 Authority；
- 不携带原始 Life Whisper；
- 不携带关系名；
- 不携带完整 Mother / Persona；
- 丢失时允许 Recovery Adapter 恢复；
- 不能单独启动 Gravity。

---

## 7. Controller 最终 API

新增：

```text
src/services/xinmaiGravityEntryAdmissionController.ts
```

正式名称：

```text
RealityToGravityEntryAdmissionController
```

### 7.1 Boundary

```ts
export const GRAVITY_ENTRY_ADMISSION_CONTROLLER_BOUNDARY = {
  singleCurrentAdmission: true,
  uniqueGravityCycleIdGenerator: true,
  existingIdentityReferencesOnly: true,
  currentRealityProofRequired: true,
  currentPressureProofRequired: true,
  bodyApproachProofRequired: true,
  recoveryCandidateIsNotAuthority: true,
  routeCannotCommitActive: true,
  hostTypedOutcomeRequired: true,
  noIdentityMutation: true,
  noPressureInference: true,
  noStorageRead: true,
  noStorageWrite: true,
  noNavigation: true,
  noRendererInvocation: true,
  noChoiceExecution: true,
  noCrystalExecution: true,
  noArchiveWrite: true,
} as const;
```

注意：

Controller 的 `noStorageRead / noStorageWrite` 表示它只调用 typed Recovery Adapter API，不直接触碰 `sessionStorage`。

### 7.2 `prepareGravityEntryTransfer`

```ts
prepareGravityEntryTransfer(
  input: GravityEntryTransferRequest,
): GravityEntryTransferPrepareResult
```

职责：

- 校验完整 request；
- 校验 source Reality 当前仍 Active；
- 校验三项身份；
- 校验 Pressure V2 session；
- 校验 user recognition；
- 校验 body approach；
- 若已有同周期 prepared / ready admission，幂等返回；
- 只在第一次合法 request 生成：
  - `admissionReferenceId`；
  - `gravityCycleId`；
- 生成 `TRANSFER_PREPARED`；
- 不写 storage；
- 不终结 Reality；
- 不导航。

### 7.3 `commitPreparedGravityTransfer`

```ts
commitPreparedGravityTransfer(
  proof: ConfirmedRealityToGravityCutoverProof,
): GravityEntryCutoverCommitResult
```

只接受：

- Recovery Adapter read-after-write 确认；
- 同一 envelope reference；
- 同一 prepared revision；
- 同一 source Reality revision；
- 同一三项身份；
- 同一 pressure proof；
- 同一 body approach proof。

结果：

```text
TRANSFER_PREPARED
→
READY_TO_ENTER_GRAVITY
```

### 7.4 `establishGravityRouteAdmission`

```ts
establishGravityRouteAdmission(input: {
  routeTicket: GravityRouteTicket | null;
  identityReferences: RealityEncounterIdentityReferences;
}): GravityRouteAdmissionResult
```

职责：

- 内存有当前 Admission 时先校验；
- 无内存时调用 Recovery Adapter 的 typed result；
- 不直接读取 storage；
- 校验 TTL；
- 校验 route target；
- 校验 identity；
- 校验 source supersession；
- 将 `READY_TO_ENTER_GRAVITY` 推进为 `ACCEPTING_GRAVITY`；
- Recovery 写入必须确认；
- 返回显式 `GravityRouteAdmission`。

### 7.5 `retryGravityEntryAcceptance`

```ts
retryGravityEntryAcceptance(input: {
  admissionReferenceId: string;
  gravityCycleId: string;
  identityReferences: RealityEncounterIdentityReferences;
}): GravityRouteAdmissionResult
```

只允许：

```text
FAILED_RETRYABLE
→
ACCEPTING_GRAVITY
```

不生成新周期。

### 7.6 `commitGravityEntryActive`

```ts
commitGravityEntryActive(
  outcome: GravityHostAcceptanceOutcome,
): GravityEntryCommitResult
```

只接受：

- 当前 state 为 `ACCEPTING_GRAVITY`；
- `admissionReferenceId` 匹配；
- `gravityCycleId` 匹配；
- revision 匹配；
- 三项身份匹配；
- current pressure reference 匹配；
- typed surface transaction 有效；
- TTL 未过期。

结果：

```text
ACTIVE_IN_GRAVITY
```

### 7.7 `failGravityEntryAcceptance`

```ts
failGravityEntryAcceptance(input: {
  admissionReferenceId: string;
  gravityCycleId: string;
  admissionRevision: number;
  stage: GravityEntryFailureStage;
  reason: GravityEntryFailureReason;
}): GravityEntryFailureResult
```

失败必须持久化为：

```text
FAILED_RETRYABLE
```

Watchdog 只能调用这个 API。

### 7.8 `terminateGravityEntry`

```ts
terminateGravityEntry(
  command: GravityEntryTerminationCommand,
): GravityEntryTerminationResult
```

只接受：

- 当前 admission / cycle / revision；
- 同一 identity；
- 明确 terminal reason。

普通：

- unmount；
- refresh；
- background；
- network failure；
- WebGL context loss；

均不得调用。

### 7.9 `recoverGravityEntry`

Controller 不直接读 storage。

API：

```ts
recoverGravityEntry(
  recoveryResult: GravityEntryRecoveryReadResult,
  identityReferences: RealityEncounterIdentityReferences,
): GravityRouteAdmissionResult
```

Recovery result 只作为候选。

Controller 重新确认：

- schema；
- TTL；
- cycle；
- revision；
- identity；
- source Reality supersession；
- route target；
- no terminal conflict。

### 7.10 `readCurrentGravityEntryAdmission`

只读当前内存事实。

不得：

- 触发恢复；
- 触发导航；
- 触发 storage；
- 自动生成周期。

---

## 8. Reality Host Typed Transfer Request

### 8.1 当前错误出口

当前：

```ts
onContinueToGravity(
  selectedPressureSeedContext
)
```

问题：

- 只有 Seed；
- 没有 Pressure V2 session proof；
- 没有 body approach proof；
- 没有当前 Reality proof；
- 没有三项 identity refs；
- Route 被迫自行拼装权威。

### 8.2 目标出口

修改：

```text
src/types/realityProductionRouteEntry.ts
src/components/RealityProductionHost.tsx
```

目标：

```ts
type GravityEntryTransferRequest = Readonly<{
  schemaVersion: "XINMAI_GRAVITY_ENTRY_TRANSFER_REQUEST_V1";
  source: "reality_production_host";
  requestedAt: string;
  userExplicitRequest: true;
  identityReferences: RealityEncounterIdentityReferences;
  sourceReality: Readonly<{
    intentReferenceId: string;
    encounterCycleId: string;
    intentRevision: number;
    state: "ACTIVE_IN_REALITY";
  }>;
  pressureSession: RealityProductionPressureSeedSession;
  bodyApproachProof: GravityBodyApproachProof;
  visualContinuityReference: Readonly<{
    sourceReferenceId: string;
  }>;
}>;
```

Host 可以生产 request。

Host 不可以：

- 生成 Admission；
- 生成 `gravityCycleId`；
- 终结 Reality；
- 写 Recovery；
- 写 selected seed persistence；
- 导航；
- 提交 Gravity Active。

### 8.3 Body approach 计时器处置

当前：

```text
BODY_APPROACHED
↓
setTimeout(1200)
↓
onContinueToGravity
```

未来：

```text
BODY_APPROACHED committed
↓
用户明确继续
或
既有明确靠近动作完成时发出 Typed Request
↓
Route Transaction
```

裁决：

- `setTimeout(1_200)` 成功路径删除；
- 如果保留 1.2 秒视觉留白，它只能控制 presentation；
- presentation timer 不得生产 request；
- request 必须来自可审计用户动作；
- 若产品希望“靠近动作本身即明确继续”，则 typed click handler 同步产生 proof + request，动画只是后续反馈。

本 PREP 冻结：

```text
approachCurrentLifeWeather 用户动作
=
明确 Gravity transfer request
```

不新增第二个“继续”按钮。

---

## 9. Durable Cutover Envelope

新增：

```text
src/services/xinmaiGravityEntryRecoveryAdapter.ts
```

唯一 storage key：

```text
xinmaiRealityToGravityCutoverRecovery
```

### 9.1 Envelope schema

```ts
type RealityToGravityCutoverEnvelope = Readonly<{
  schemaVersion:
    typeof XINMAI_REALITY_TO_GRAVITY_CUTOVER_SCHEMA_VERSION;
  source: "xinmai_gravity_entry_recovery_adapter";
  envelopeReferenceId: string;
  committedAt: string;
  expiresAt: string;
  sourceReality: Readonly<{
    terminalProof: GravitySourceRealityProof;
    identityReferences: RealityEncounterIdentityReferences;
    supersededByGravityTransfer: true;
  }>;
  targetGravity: Readonly<{
    admission: Extract<
      GravityEntryAdmission,
      { state: "READY_TO_ENTER_GRAVITY" }
    >;
    identityReferences: RealityEncounterIdentityReferences;
  }>;
  integrity: Readonly<{
    sourceAndTargetIdentityMatch: true;
    sourceAndTargetCycleBound: true;
    pressureBelongsToSourceReference: true;
    bodyApproachBelongsToEncounter: true;
    singleRouteTarget: "/dynamics";
  }>;
}>;
```

### 9.2 Snapshot wrapper

```ts
type GravityEntryRecoverySnapshot = Readonly<{
  schemaVersion:
    typeof XINMAI_GRAVITY_ENTRY_RECOVERY_SCHEMA_VERSION;
  source: "xinmai_gravity_entry_recovery_adapter";
  envelope: RealityToGravityCutoverEnvelope;
  currentGravityAdmission: GravityEntryAdmission;
  writtenAt: string;
}>;
```

### 9.3 Adapter API

```ts
writeCutoverEnvelope(
  envelope: RealityToGravityCutoverEnvelope
): GravityEntryRecoveryWriteResult

updateGravityAdmission(
  admission: GravityEntryAdmission
): GravityEntryRecoveryWriteResult

readGravityEntryRecoveryCandidate():
  GravityEntryRecoveryReadResult

readRealitySupersessionProof(input: {
  intentReferenceId: string;
  encounterCycleId: string;
  identityReferences: RealityEncounterIdentityReferences;
}): RealitySupersessionReadResult

clearGravityEntryRecovery(
  admissionReferenceId: string
): GravityEntryRecoveryClearResult
```

### 9.4 唯一存储边界

正式冻结：

```text
sessionStorage Reader:
XinmaiGravityEntryRecoveryAdapter only

sessionStorage Writer:
XinmaiGravityEntryRecoveryAdapter only

Controller:
typed adapter result only

Route:
zero direct storage

Page:
zero direct entry storage

Host:
zero storage

Renderer:
zero storage
```

### 9.5 TTL

```text
2 hours maximum
```

生成时机：

> Controller 接受第一次合法 Gravity transfer request 并生成 `TRANSFER_PREPARED` 时。

规则：

- Recovery Envelope 不得把 `expiresAt` 延后；
- write update 不延长；
- retry 不延长；
- refresh 不延长；
- Route reload 不延长；
- Active refresh 不延长；
- 过期不生成新 cycle；
- 过期不清除身份与关系；
- 过期不恢复历史 Seed 为 current Reality。

### 9.6 Supersession 优先级

若同时存在：

```text
旧 Reality Recovery:
ACTIVE_IN_REALITY

Cutover Envelope:
source superseded
+
target ready
```

正式裁决：

```text
Confirmed Cutover Envelope wins
```

Reality recovery 必须先检查 typed supersession proof。

旧 Reality candidate：

- 不是第二真源；
- 不得恢复 Active；
- cleanup 可稍后完成；
- 不影响 target Gravity recovery。

---

## 10. Reality → Gravity Atomic Cutover Transaction

新增：

```text
src/services/realityToGravityCutoverTransaction.ts
```

正式所有者：

```text
RealityToGravityCutoverTransaction
```

### 10.1 输入

```ts
type RealityToGravityCutoverTransactionInput = Readonly<{
  request: GravityEntryTransferRequest;
  currentRealityIntent: RealityEncounterIntent;
  recognizedIdentity:
    Extract<RealityRecognizedIdentityRecoveryResult, { status: "READY" }>;
  now?: string;
}>;
```

`now` 只用于测试注入。

生产调用不传任意业务时间。

### 10.2 事务步骤

```text
Step 1
读取 current Reality Intent

Step 2
校验 ACTIVE_IN_REALITY

Step 3
校验 request 的 intent / cycle / revision

Step 4
校验三项 identity

Step 5
校验 Pressure Session V2 / Recognition / Source refs

Step 6
校验 Body Approach proof

Step 7
Controller prepareGravityEntryTransfer()

Step 8
组装 source terminal proof + target ready admission

Step 9
Recovery Adapter writeCutoverEnvelope()

Step 10
read-after-write 确认 envelope / cycle / revision / identity

=== 唯一 Durable Commit Point ===

Step 11
Reality Controller 接受 confirmed supersession proof

Step 12
Gravity Controller commitPreparedGravityTransfer()

Step 13
旧 Reality recovery best-effort cleanup

Step 14
返回 GravityRouteTicket

Step 15
Route 执行 navigate("/dynamics")
```

### 10.3 Commit point

唯一 commit point：

> 完整 Cutover Envelope 经唯一 Recovery Adapter read-after-write 确认。

提交前：

```text
Reality:
ACTIVE

Gravity:
ABSENT / TRANSFER_PREPARED
```

提交后：

```text
Reality:
ENCOUNTER_COMPLETED
+
SUPERSEDED_BY_GRAVITY_TRANSFER

Gravity:
READY_TO_ENTER_GRAVITY
```

### 10.4 Reality Controller 适配

修改：

```text
src/services/xinmaiRealityEncounterIntentController.ts
```

新增：

```ts
commitRealityEncounterGravitySupersession(
  proof: ConfirmedRealityToGravityCutoverProof
): RealityEncounterTransferTerminationResult
```

该 API：

- 不是普通 `terminateRealityEncounter()`；
- 只接受 confirmed durable envelope；
- 校验 intent / cycle / revision / identity；
- 将内存 Reality 置为 terminal / cleared；
- 不自行写另一个 cutover storage；
- 不自行导航；
- 不自行创建 Gravity Admission；
- 允许旧 Reality recovery cleanup 失败，但 supersession proof 保持权威。

既有 `terminateRealityEncounter()` 继续用于：

- explicit leave；
- 非 transfer 的正式周期结束。

未来 Reality → Gravity 不再先调用普通 termination。

### 10.5 Commit 前失败

任一失败：

```text
durable envelope:
NOT WRITTEN

Reality:
ACTIVE

Gravity:
ABSENT

navigation:
0
```

若 Controller 已产生 `TRANSFER_PREPARED`：

- rollback 到 `ABSENT`；
- 或保留同一 in-memory prepared candidate 供同步重试；
- 不得持久化为 Ready；
- 不得终结 Reality。

本 PREP 选择：

```text
PREPARE failure:
ABSENT

CUTOVER write failure after valid prepare:
FAILED_RETRYABLE in memory
+
Reality remains ACTIVE
```

重试复用同一 `gravityCycleId`。

### 10.6 Commit 后失败

若 commit 后：

- old Reality recovery cleanup 失败；
- navigation 失败；
- route chunk 失败；
- Gravity Runtime Input 失败；
- minimum surface 失败；

则：

```text
source Reality:
仍 superseded

target Gravity:
READY / FAILED_RETRYABLE

gravityCycleId:
保持
```

不得重新激活 source Reality。

用户可：

- 同周期重试；
- 明确离开回到安全生命世界。

### 10.7 Transaction result

```ts
type RealityToGravityCutoverTransactionResult =
  | {
      status: "COMMITTED";
      routeTicket: GravityRouteTicket;
      envelope: RealityToGravityCutoverEnvelope;
      cleanup:
        | "SOURCE_RECOVERY_CLEARED"
        | "SOURCE_RECOVERY_SUPERSEDED_PENDING_CLEANUP";
    }
  | {
      status: "RETRYABLE";
      routeTicket: null;
      gravityAdmission: GravityEntryAdmission | null;
      realityRemainsActive: boolean;
      reason: GravityEntryFailureReason;
    }
  | {
      status: "BLOCKED";
      routeTicket: null;
      gravityAdmission: null;
      realityRemainsActive: true;
      reason: GravityEntryFailureReason;
    };
```

---

## 11. Gravity Route post-commit transaction

新增：

```text
src/pages/GravityProductionRouteEntry.tsx
```

### 11.1 Route input

Route 可以接收：

```text
GravityRouteTicket
```

Route 不信任 ticket。

Route 必须重新获得：

- recognized identity；
- current Gravity Admission / typed recovery；
- matching cutover envelope。

### 11.2 Render boundary

Render 允许：

- 读取 route state ticket；
- 读取已冻结 React state；
- 纯 eligibility 计算；
- 安全 loading / retry / return UI；
- 纯 candidate object assembly。

Render 禁止：

- Controller mutation；
- Recovery read / write；
- admission revision advance；
- source Reality cleanup；
- Runtime input commit；
- navigate；
- Active commit。

### 11.3 Post-commit owner

Route effect 是 target admission post-commit owner。

transaction identity：

```text
admissionReferenceId
gravityCycleId
expectedAdmissionRevision
sourceReferenceId
starBeastIdentityReferenceId
mansionCoordinateReferenceId
routeTarget
attemptVersion
```

### 11.4 Post-commit steps

```text
Route commit
↓
recover recognized identity
↓
read typed Gravity recovery candidate
↓
Controller revalidate / establish admission
↓
build Gravity Production Runtime Input
↓
confirm current admission still accepting
↓
publish Page props
```

### 11.5 Idempotency

必须满足：

- Strict Mode 双 effect 只推进一次 revision；
- 相同 transaction key 幂等返回；
- 同周期重复 mount 不生成新 admission；
- route ticket 丢失时 valid recovery 恢复同一 cycle；
- stale ticket 不覆盖 current recovery；
- effect cleanup 只取消 UI publication；
- cleanup 不清除 Admission；
- quick navigation 后旧 outcome 被拒绝。

### 11.6 Direct URL

```text
/dynamics
+
valid typed recovery
→
recover same cycle
```

```text
/dynamics
+
no valid typed recovery
→
do not mount GravityPage
→
return safe life world
```

禁止：

- localStorage seed fallback；
- localStorage mother fallback；
- identity-only fallback；
- fixture fallback；
- empty default seed。

---

## 12. Gravity Production Runtime Input

新增：

```text
src/services/gravityProductionRuntimeInputAdapter.ts
```

新增或扩展类型：

```text
src/types/gravityRuntimeInput.ts
```

### 12.1 Production input

```ts
type GravityProductionRuntimeInput = Readonly<{
  schemaVersion: "XINMAI_GRAVITY_PRODUCTION_RUNTIME_INPUT_V1";
  source: "gravity_production_runtime_input_adapter";
  admissionReferenceId: string;
  gravityCycleId: string;
  admissionRevision: number;
  identityReferences: RealityEncounterIdentityReferences;
  currentPressure:
    Readonly<SelectedPressureSeedContext>;
  pressureProvenance: GravityCurrentPressureProof;
  lifeSourceSession: LaunchLifeSourceSession;
  visualContinuity: RealityProductionHostProps["visualContinuity"];
  motherProjection: Readonly<{
    motherCodeLandingResult:
      LaunchLifeSourceSession["motherCodeLandingResult"];
    originMotherResult:
      LaunchLifeSourceSession["originMotherResult"];
  }>;
  bodyApproachProof: GravityBodyApproachProof;
  boundary: Readonly<{
    admissionOnly: true;
    recognizedIdentityOnly: true;
    launchLifeSourceOnly: true;
    currentPressureOnly: true;
    noRouteStateAuthority: true;
    noHistoricalStorageAuthority: true;
    noFixtureSource: true;
  }>;
}>;
```

### 12.2 Mother authority

正式来源：

```text
LaunchLifeSourceSession
```

`motherProjection` 只做字段投影，不计算新生命。

禁止：

- `readPersistedMotherCodeProfile()` 作为 current authority；
- `readPersistedOriginMotherContext()` 作为 current authority；
- `readPersistedPersonaOutputSnapshot()` 作为 current authority；
- 三个旧对象互相拼装为当前生命；
- Mother 数据失配时用 default。

### 12.3 Seed authority

正式来源：

```text
GravityEntryAdmission.currentPressure
```

旧：

```text
guanyao:selectedPressureSeedContext
```

只保留：

- 历史兼容；
- Archive memory；
- 迁移前数据；
- 非当前 Reality 事实。

它不得使 Production Runtime Ready。

### 12.4 Adapter result

```ts
type GravityProductionRuntimeInputResult =
  | {
      status: "READY";
      input: GravityProductionRuntimeInput;
      reason: null;
    }
  | {
      status: "BLOCKED";
      input: null;
      reason:
        | "ADMISSION_REQUIRED"
        | "ADMISSION_NOT_ACCEPTING"
        | "IDENTITY_MISMATCH"
        | "PRESSURE_PROOF_INVALID"
        | "LIFE_SOURCE_SESSION_INVALID"
        | "BODY_APPROACH_PROOF_INVALID"
        | "ADMISSION_EXPIRED";
    };
```

Adapter：

- 无 storage；
- 无 navigation；
- 无 Controller；
- 无 Engine；
- 无 default；
- 无 fixture。

---

## 13. GravityPage 最小显式 Props

当前 `GravityPage` 自己读取：

- `useLocation()`；
- route state；
- selected seed persistence；
- mother persistence；
- persona persistence；
- dev query fixture。

生产目标：

```ts
type GravityPageProductionProps = Readonly<{
  mode: "PRODUCTION";
  admission: GravityRouteAdmission;
  runtimeInput: GravityProductionRuntimeInput;
  surfaceAttempt: GravitySurfaceAdmissionAttempt;
  onLifeSurfaceOutcome: (
    outcome: GravityLifeSurfaceOutcome
  ) => void;
  onObservationSurfaceOutcome: (
    outcome: GravityObservationSurfaceOutcome
  ) => void;
  onExplicitLeave: () => void;
}>;
```

`GravityPage` 生产模式不得：

- `useLocation()` 决定 current input；
- 读取 entry localStorage；
- 调用 `resolveDynamicsInputContext()`；
- 生成 Admission；
- 生成 `gravityCycleId`；
- 从 fixture query 建 current seed；
- 从 historical seed 启动；
- 自行提交 Active。

保留：

- 现有 Six Dimension；
- 现有 Gravity inertia；
- 现有 Inner View；
- 现有视觉；
- 现有内部行为；
- 后续 Choice / Crystal 代码，暂不扩张；
- 现有体验表面。

### 13.1 Production / Dev union

`GravityPage` 不同时解释 production 与 fixture。

正式拆分：

```text
GravityProductionRouteEntry
→ GravityPage(mode=PRODUCTION)
```

开发：

```text
GravityDevelopmentFixtureRouteEntry
→ GravityPage(mode=DEVELOPMENT_FIXTURE)
```

`DEVELOPMENT_FIXTURE` 类型不得进入 production props union。

更严格选择：

> 将 fixture resolution 放在独立 dev entry，`GravityPage` 只接收已经显式构造的 props。

---

## 14. Gravity minimum surface typed outcome

新增：

```text
src/types/xinmaiGravitySurfaceAdmission.ts
src/services/xinmaiGravitySurfaceAdmissionTransaction.ts
```

### 14.1 Attempt

```ts
type GravitySurfaceAdmissionAttempt = Readonly<{
  admissionReferenceId: string;
  gravityCycleId: string;
  admissionRevision: number;
  identityReferences: RealityEncounterIdentityReferences;
  selectedPressureSeedId: string;
}>;
```

### 14.2 Same-Life Surface Outcome

```ts
type GravityLifeSurfaceOutcome =
  | Readonly<
      GravitySurfaceAdmissionAttempt & {
        status: "GRAVITY_LIFE_SURFACE_PRESENTED";
        surfaceMode:
          | "WEBGL_SAME_LIFE_SURFACE"
          | "SEMANTIC_STATIC_SAME_LIFE_SURFACE";
        sourceReferenceId: string;
        presentedAt: string;
      }
    >
  | Readonly<
      GravitySurfaceAdmissionAttempt & {
        status: "GRAVITY_LIFE_SURFACE_UNAVAILABLE";
        reason:
          | "SOURCE_NOT_READY"
          | "RENDERER_BLOCKED"
          | "RENDERER_INITIALIZATION_FAILED"
          | "WEBGL_CONTEXT_LOST"
          | "STATIC_SURFACE_NOT_PRESENTED";
        sourceReferenceId: string;
        reportedAt: string;
      }
    >;
```

生产者：

```text
RealityLifeUniverseCanvas
```

适配方式：

- 增加 Gravity typed attempt / callback；
- 复用同一 Canvas 与同一 Renderer 主干；
- 不修改 Renderer 的生命视觉算法；
- Renderer 不读 Page DOM；
- Motion 在真实 frame + settled continuity 后报告；
- Reduced Motion 在同一静态生命表面 post-commit 后报告；
- 不通过 `data-*` 反读。

### 14.3 First Observation Outcome

```ts
type GravityObservationSurfaceOutcome =
  | Readonly<
      GravitySurfaceAdmissionAttempt & {
        status: "GRAVITY_OBSERVATION_SURFACE_PRESENTED";
        surfaceMode:
          | "MOTION_FIRST_GRAVITY_OBSERVATION"
          | "STATIC_FIRST_GRAVITY_OBSERVATION";
        currentRealityTraceVisible: true;
        firstObservationAffordanceAvailable: true;
        presentedAt: string;
      }
    >
  | Readonly<
      GravitySurfaceAdmissionAttempt & {
        status: "GRAVITY_OBSERVATION_SURFACE_UNAVAILABLE";
        reason:
          | "CURRENT_REALITY_TRACE_NOT_PRESENTED"
          | "FIRST_OBSERVATION_NOT_AVAILABLE"
          | "STATIC_OBSERVATION_NOT_PRESENTED";
        reportedAt: string;
      }
    >;
```

生产者：

```text
RealityGravityInertiaField
或
承载第一观察动作的现有组件
```

要求：

- outcome 在 React commit 后产生；
- 生产者知道自己真实呈现；
- Host 不查询 DOM；
- 不以 DOM node existence 为 authority；
- Motion / Static 分别报告；
- 第一观察 affordance 必须真实可用。

### 14.4 Surface transaction

```ts
type GravitySurfaceAdmissionTransaction = Readonly<{
  schemaVersion:
    "XINMAI_GRAVITY_SURFACE_ADMISSION_TRANSACTION_V1";
  source: "xinmai_gravity_surface_admission_transaction";
  admissionReferenceId: string;
  gravityCycleId: string;
  admissionRevision: number;
  identityReferences: RealityEncounterIdentityReferences;
  selectedPressureSeedId: string;
  lifeSurfaceOutcome:
    Extract<GravityLifeSurfaceOutcome, {
      status: "GRAVITY_LIFE_SURFACE_PRESENTED";
    }>;
  observationSurfaceOutcome:
    Extract<GravityObservationSurfaceOutcome, {
      status: "GRAVITY_OBSERVATION_SURFACE_PRESENTED";
    }>;
  minimumSurface:
    | "GRAVITY_SAME_LIFE_AND_FIRST_OBSERVATION"
    | "GRAVITY_STATIC_SAME_LIFE_AND_FIRST_OBSERVATION";
  committedAt: string;
}>;
```

### 14.5 Gravity host

不新增第二个产品页面。

允许新增一个无业务推理的聚合层：

```text
GravityProductionSurfaceHost
```

它只负责：

- 接收 Route admission；
- 创建 attempt；
- 向 `GravityPage` 传显式 props；
- 汇聚两个 typed outcomes；
- 调用 transaction resolver；
- 报告 `GravityHostAcceptanceOutcome`。

它不负责：

- Pressure inference；
- Six Dimension 结论；
- Choice；
- Crystal；
- Renderer；
- navigation；
- storage。

### 14.6 Watchdog

```text
8 seconds
```

只作为失败看门狗：

```text
SURFACE_OUTCOME_WATCHDOG_EXPIRED
→ FAILED_RETRYABLE
```

禁止：

- Watchdog 提交 success；
- 8 秒后自动 Active；
- timer 模拟 Motion outcome；
- timer 模拟 Static outcome。

---

## 15. 旧入口逐项修改

### 15.1 正式 Reality V2

文件：

```text
src/components/RealityProductionHost.tsx
src/pages/RealityProductionRouteEntry.tsx
src/types/realityProductionRouteEntry.ts
```

删除：

```text
selectedPressureSeedContext-only callback
普通 terminate → write seed → navigate success path
1.2 秒 timer 成功路径
```

替换：

```text
Typed GravityEntryTransferRequest
↓
Atomic Cutover Transaction
↓
GravityRouteTicket
↓
navigate("/dynamics")
```

### 15.2 `/dynamics`

文件：

```text
src/App.tsx
```

当前：

```tsx
<Route path="/dynamics" element={<GravityPage />} />
```

目标：

```tsx
<Route
  path="/dynamics"
  element={<GravityProductionRouteEntry />}
/>
```

### 15.3 LaunchLab old Pressure Seed direct handoff

文件：

```text
src/pages/LaunchLab.tsx
```

精确旧点：

```text
commitPressureSeedCapture
↓
setLaunchInteractionState("DYNAMICS_HANDOFF")
↓
navigate(GUANYAO_ROUTES.dynamics, { state })
```

生产目标：

- 该成功路径删除；
- LaunchLab 不生产 Gravity Admission；
- LaunchLab 不生成 `gravityCycleId`；
- LaunchLab 不写 current Gravity recovery；
- 旧 Pressure Axis 只能作为 dev / snapshot / dormant asset；
- 不把旧路径迁移成第二个 typed producer。

### 15.4 Archive / Personality Ring

文件：

```text
src/pages/PersonalityRingPage.tsx
```

当前：

```text
navigate("/dynamics")
```

但语义是：

```text
回到生命星河
```

目标：

```text
回到安全生命世界
```

不得：

- Archive 创建 Admission；
- Crystal memory 激活 current Gravity；
- Archive 作为 Reality producer。

### 15.5 Legacy redirects

文件：

```text
src/App.tsx
src/routes/guanyaoRoutes.ts
```

当前进入 Dynamics 的活跃 redirect：

```text
/pressure-seed
/hexagram-stamp
/breach-scan
/yao-device
/repair-method
/scene
/identity
/gravity
/collapse
```

目标：

- 不再把这些 route redirect 到 `/dynamics`；
- 改到安全生命入口；
- 或显式 legacy unavailable surface；
- 它们不得建立 typed recovery；
- 它们不得带 historical seed 进入 Production Gravity。

### 15.6 Dormant source pages

当前源码中仍有：

- ScenePage；
- MotherCodePage；
- HexagramStampPage；
- ChronoPage；
- 其他未注册页面；

直接导航 Dynamics。

本 Atomic Migration 不为源码清洁大改休眠页面。

必须新增门禁证明：

- 它们不在 active route registry；
- 它们不是 Admission producer；
- 它们不能写 Gravity recovery；
- 它们没有 production caller。

若任一实际仍可达，则必须在同一 migration commit 中移除可达性。

### 15.7 Choice Continuation

现有 Choice：

```text
Choice
→ new Reality
```

保持。

Choice 不得：

- 直接去 `/dynamics`；
- 生成 Gravity Admission；
- 复用旧 Gravity cycle；
- 绕过 current Reality recognition。

---

## 16. Development Fixture 隔离

当前：

```text
/dynamics?fixture=body&__experienceSmoke=body
```

在同一个 `GravityPage` 内解析 dev query。

目标：

```text
Production:
/dynamics
→ GravityProductionRouteEntry

Development:
/__dev/gravity
→ GravityDevelopmentFixtureRouteEntry
```

新增：

```text
src/pages/GravityDevelopmentFixtureRouteEntry.tsx
```

注册要求：

- 仅 `import.meta.env.DEV`；
- production build 不注册；
- 不读 production Recovery；
- 不恢复 recognized identity；
- 不写 Gravity Admission；
- 不生成 production cycle；
- 不写 selected seed / mother production storage；
- props 显式标记 `mode = DEVELOPMENT_FIXTURE`。

现有 smoke checks 迁移到：

```text
/__dev/gravity?fixture=...
```

生产 `/dynamics` 遇到 fixture query：

```text
忽略 query
+
仍要求 typed admission / recovery
```

---

## 17. 生产者与消费者表

| 生产者 | 输出 | 直接消费者 | 权威状态 | 禁止消费者 |
| --- | --- | --- | --- | --- |
| RealityProductionHost | `GravityEntryTransferRequest` | Reality Route cutover transaction | request fact | Pressure Seed inference、Choice、Crystal |
| RealityToGravityEntryAdmissionController | `TRANSFER_PREPARED` | Cutover transaction | target candidate | Route state、Renderer |
| GravityEntryRecoveryAdapter | confirmed cutover envelope | Reality + Gravity Controllers | recovery candidate / durable commit proof | Page、Renderer |
| RealityToGravityCutoverTransaction | `GravityRouteTicket` | GravityProductionRouteEntry | transport | Engine、Archive |
| Recognized Identity Recovery | three identity refs + life source | Route + input adapter | identity authority | relation name、selected seed |
| GravityProductionRuntimeInputAdapter | explicit runtime input | Gravity Route / Page | input contract | localStorage fallback |
| GravityLife Surface producer | typed life outcome | Gravity Surface Host | visual fact | Controller direct without transaction |
| Gravity Observation producer | typed observation outcome | Gravity Surface Host | interaction surface fact | Pressure Seed |
| Gravity Surface Transaction | minimum surface transaction | Gravity Controller | commit proof | Choice、Crystal |
| Gravity Controller | `ACTIVE_IN_GRAVITY` | Phase 3 runtime | entry authority | Phase 4 auto trigger |

禁止提前消费：

```text
AI Reflection
Choice
Crystal
Archive Growth Logic
Life Engine identity
Relationship Naming
Renderer DOM input
Historical Pressure Seed
V1 Gravity Consumer
```

---

## 18. 失败注入矩阵

未来 Runtime migration 必须提供可控 failure port。

生产默认全部关闭。

### 18.1 Failure ports

```ts
type GravityEntryFailureInjection = Readonly<{
  failPrepare?: boolean;
  failCutoverWrite?: boolean;
  failCutoverReadBack?: boolean;
  failSourceSupersession?: boolean;
  failRouteLoad?: boolean;
  failRouteAdmissionWrite?: boolean;
  failRuntimeInput?: boolean;
  failLifeSurface?: boolean;
  failObservationSurface?: boolean;
  suppressLifeOutcome?: boolean;
  suppressObservationOutcome?: boolean;
  forceIdentityMismatch?: boolean;
  forceStaleCycle?: boolean;
  forceStaleRevision?: boolean;
}>;
```

该类型：

- 只在测试 harness；
- 不进入 production component props；
- 不写 storage；
- 不进入 user session。

### 18.2 必测矩阵

| 注入点 | Commit 前后 | 目标状态 | Reality | Gravity | 重试 |
| --- | --- | --- | --- | --- | --- |
| Prepare failure | 前 | no admission | ACTIVE | ABSENT | 可 |
| Cutover write unavailable | 前 | retryable prepared | ACTIVE | not ready | 同 cycle |
| Read-back mismatch | 前 | retryable prepared | ACTIVE | not ready | 同 cycle |
| Source revision stale | 前 | blocked | ACTIVE current | ABSENT | 重取事实 |
| Cleanup failure | 后 | ready | superseded | READY | 可 |
| Route load failure | 后 | failed retryable | superseded | same cycle | 可 |
| Route admission recovery failure | 后 | failed retryable | superseded | same cycle | 可 |
| Runtime input mismatch | 后 | failed retryable | superseded | not active | 可 |
| Life surface unavailable | 后 | failed retryable | superseded | not active | 可 |
| Observation unavailable | 后 | failed retryable | superseded | not active | 可 |
| Watchdog | 后 | failed retryable | superseded | not active | 可 |
| Old cycle outcome | 后 | reject stale | unchanged | current unchanged | 无污染 |
| Old revision outcome | 后 | reject stale | unchanged | current unchanged | 无污染 |
| WebGL context loss | 后 | fallback or retryable | superseded | not fake active | 可 |
| Reduced Motion | 后 | static outcome | superseded | active only after both | 正常 |
| Direct URL no recovery | 无 commit | absent | unaffected | not mounted | 回生命世界 |
| TTL expired | 后 | terminal | superseded | cleared | 新 Reality 后新 cycle |

### 18.3 Failure truth

任何失败不得：

- 伪造进入成功；
- 伪造 same-life surface；
- 自动选择 pressure；
- 使用历史 mother；
- 生成新 identity；
- 串用其他生命 Admission；
- 触发 Choice；
- 触发 Crystal；
- 进入 Dynamics prototype；
- 形成第二条 Recovery。

---

## 19. 正负向门禁

### Gate A｜Typed Transfer Request

证明：

- Host 只输出 typed request；
- request 含 Reality / identity / pressure / body approach；
- selected-context-only callback 为 0；
- 1.2 秒 timer 成功为 0。

### Gate B｜Unique Controller

证明：

```text
gravityCycleId generator:
1

current Gravity admission authority:
1

second Controller:
0
```

### Gate C｜Atomic Cutover

证明：

- durable envelope 只有一个 commit point；
- source terminal + target ready 同一 envelope；
- commit 前 Reality Active；
- commit 后 target Ready；
- 没有双 active；
- cleanup failure 不破坏 supersession。

### Gate D｜Recovery

证明：

- direct storage reader = adapter only；
- direct storage writer = adapter only；
- TTL 2 hours；
- refresh 不延长；
- retry 不延长；
- old Reality candidate 被 supersession proof 阻止。

### Gate E｜Route Admission

证明：

- `/dynamics` 注册 `GravityProductionRouteEntry`；
- direct URL 无 recovery 不 mount Page；
- route state ticket 不是 authority；
- render mutation = 0；
- Strict Mode duplicate revision = 0；
- stale transaction publication = 0。

### Gate F｜Production Input

证明：

- current seed 只来自 Admission；
- mother 只来自 `LaunchLifeSourceSession`；
- `resolveDynamicsInputContext()` 不在 production entry；
- historical localStorage 不能组成 Ready；
- identity refs 完整。

### Gate G｜Typed Surface Outcome

证明：

- Motion life outcome；
- Static life outcome；
- Motion observation outcome；
- Static observation outcome；
- Host transaction requires both；
- Watchdog success = 0；
- DOM inspection success = 0；
- fixed timer success = 0。

### Gate H｜Old Entry Isolation

证明：

- LaunchLab direct handoff = 0；
- Archive direct Dynamics = 0；
- active legacy redirect Dynamics = 0；
- dormant page production caller = 0；
- dev fixture production caller = 0。

### Gate I｜No V1 Gravity

证明：

```text
RealityProductionGravityConsumer production caller:
0

RealityProductionGravityHost production caller:
0
```

既存要求复活 V1 的门禁必须校准为：

```text
DORMANT / NO PRODUCTION CALLER
```

不得用迁移为理由激活 V1。

### Gate J｜No Phase 4 Leak

Admission 或 Active 不得自动：

- confirm Choice；
- generate Crystal；
- write Archive；
- deposit Personality Ring；
- create reward。

---

## 20. 逐文件原子施工卡

未来 Runtime 必须在一个提交内完成以下文件边界。

### 20.1 新增类型

```text
src/types/xinmaiGravityEntryAdmission.ts
```

负责：

- state；
- request；
- source proof；
- pressure proof；
- body approach proof；
- Admission；
- Route ticket；
- failure；
- terminal；
- Recovery Envelope。

```text
src/types/xinmaiGravitySurfaceAdmission.ts
```

负责：

- surface attempt；
- life outcome；
- observation outcome；
- transaction；
- Host outcome。

### 20.2 新增服务

```text
src/services/xinmaiGravityEntryAdmissionController.ts
```

负责：

- unique cycle；
- current state；
- prepare / commit / admit / retry / fail / active / terminate / recover。

```text
src/services/xinmaiGravityEntryRecoveryAdapter.ts
```

负责：

- single storage key；
- schema validation；
- write/read/update/clear；
- supersession proof；
- 2-hour TTL validation。

```text
src/services/realityToGravityCutoverTransaction.ts
```

负责：

- source + target atomic cutover；
- durable commit；
- cleanup outcome；
- route ticket。

```text
src/services/gravityProductionRuntimeInputAdapter.ts
```

负责：

- Admission + recognized life source → explicit production props；
- no fallback。

```text
src/services/xinmaiGravitySurfaceAdmissionTransaction.ts
```

负责：

- two typed outcomes → minimum surface transaction。

### 20.3 修改 Reality authority

```text
src/types/xinmaiRealityEncounterIntent.ts
```

只在确有必要时新增 transfer proof result type。

不修改产品状态机主体。

```text
src/services/xinmaiRealityEncounterIntentController.ts
```

新增 confirmed supersession API。

```text
src/services/xinmaiRealityEncounterIntentRecoveryAdapter.ts
```

恢复前消费 typed supersession read result。

不得直接读取 Gravity storage。

依赖方向必须通过：

```text
typed supersession query port
```

避免双向 Controller import。

### 20.4 修改 Reality production producer

```text
src/types/realityProductionRouteEntry.ts
```

callback 改为 typed request。

```text
src/components/RealityProductionHost.tsx
```

生产 body approach proof 与 transfer request。

```text
src/pages/RealityProductionRouteEntry.tsx
```

删除旧 termination/write/navigate；
接入 cutover transaction；
仅在 committed 后导航。

### 20.5 新增 Gravity target route / host

```text
src/pages/GravityProductionRouteEntry.tsx
src/components/GravityProductionSurfaceHost.tsx
```

负责：

- target post-commit；
- typed recovery；
- input assembly；
- outcome aggregation；
- Controller commit。

### 20.6 修改 target surface

```text
src/pages/GravityPage.tsx
```

移除 production route/storage input ownership；
改为 explicit props；
保持现有 experience。

```text
src/components/RealityLifeUniverseCanvas.tsx
```

增加 Gravity typed surface callback；
不修改 Renderer 算法。

```text
src/components/RealityGravityInertiaField.tsx
```

增加 first observation typed outcome；
不改变 Gravity 语义。

```text
src/types/gravityRuntimeInput.ts
```

增加 production explicit input / props；
旧 compatible types 只供 migration / dev。

### 20.7 Route registry

```text
src/App.tsx
src/routes/guanyaoRoutes.ts
```

负责：

- `/dynamics` → production route entry；
- active legacy redirects → safe life world；
- dev route only in DEV。

### 20.8 旧入口

```text
src/pages/LaunchLab.tsx
src/pages/PersonalityRingPage.tsx
```

负责删除 active direct Dynamics path。

### 20.9 Dev fixture

```text
src/pages/GravityDevelopmentFixtureRouteEntry.tsx
```

负责显式 dev-only input。

### 20.10 Checks

新增：

```text
scripts/check-xinmai-gravity-entry-admission-controller.mjs
scripts/check-xinmai-reality-to-gravity-atomic-cutover.mjs
scripts/check-xinmai-gravity-entry-recovery.mjs
scripts/check-xinmai-gravity-route-post-commit-admission.mjs
scripts/check-xinmai-gravity-surface-outcome-admission.mjs
scripts/check-xinmai-gravity-entry-old-route-isolation.mjs
scripts/check-xinmai-gravity-entry-browser-acceptance.mjs
```

修改：

```text
package.json
```

只增加本迁移 check scripts。

直接相关既存门禁校准：

```text
check-reality-production-gravity-consumer
check-reality-production-gravity-host
check:dynamics-input-context-adapter
check:gravity-change-experience-routing
```

不并入：

```text
check-reality-pressure-seed-presentation-contract
```

该精确文案漂移继续 MAP。

---

## 21. 单提交内部施工顺序

Git 交付仍然只有一个 commit。

实现时建议内部顺序：

```text
1. 新增 types
2. 新增 Controller / Recovery
3. 新增 surface transaction
4. 新增 cutover transaction
5. 新增 runtime input adapter
6. 新增 Gravity target route / host
7. 适配 GravityPage 与 surface producers
8. 适配 Reality Host request
9. 原子替换 Reality Route success path
10. 替换 /dynamics route registration
11. 删除 Launch / Archive / legacy production bypass
12. 隔离 dev fixture
13. 新增与校准 checks
14. 全量验收
15. 单次 stage
16. 单次 commit
17. 干净快照复验
18. push
```

禁止在中途提交：

```text
new Controller only
new Route only
old path deletion only
new Recovery only
```

任何中间工作树即使暂时不 build，也不得成为远程可见提交。

---

## 22. 回滚单位

唯一回滚单位：

```text
完整 Atomic Migration Commit
```

回滚必须同时恢复：

- Reality Host callback；
- Reality Route old handoff；
- `/dynamics` old registration；
- GravityPage old input；
- old Launch path；
- old Archive path；
- old redirects；
- Controller；
- Recovery；
- target route；
- surface outcomes；
- checks。

不得只回滚：

- Controller；
- Recovery；
- Route；
- old entry；
- Page。

否则会形成：

- 新真源 + 旧旁路；
- 新 Route + 无 Recovery；
- 旧 Page + 新 Admission；
- source 已 superseded + target 不可消费。

### 22.1 回滚后的新 Recovery key

旧 Runtime 不读取：

```text
xinmaiRealityToGravityCutoverRecovery
```

因此回滚后：

- 不进入 identity；
- 不进入 current Pressure；
- 不进入 Gravity；
- 不进入 Archive；
- 标签页结束后自然消失。

不要求：

- 删除历史 Seed；
- 删除历史 Mother；
- 修改用户二十八宿；
- 修改关系名；
- 清除 Crystal。

### 22.2 回滚验证

必须证明：

- 反向 diff 是单 commit；
- no partial revert；
- build 回到前一远程基线；
- Reality Intent 仍独立可恢复；
- Phase 2 资产无变化；
- 新 storage key 不被旧 Runtime 消费。

---

## 23. 浏览器验收矩阵

### 23.1 正常 Motion

```text
进入同一 Reality
↓
认出当前 Pressure Seed
↓
靠近身体回应
↓
Atomic Cutover committed
↓
/dynamics typed admission
↓
同一生命 Motion surface
↓
第一 Gravity observation surface
↓
ACTIVE_IN_GRAVITY
```

### 23.2 Reduced Motion

```text
同一 cutover
↓
Static same-life surface
↓
Static first observation
↓
typed static transaction
↓
ACTIVE_IN_GRAVITY
```

源码断言不能替代真实浏览器证据。

### 23.3 Direct URL

无 Recovery：

```text
/dynamics
↓
no GravityPage
↓
safe life world
```

有 Recovery：

```text
/dynamics
↓
same cycle recovered
↓
same identity
↓
same current Pressure
```

### 23.4 Refresh

在：

- READY；
- ACCEPTING；
- ACTIVE；

分别刷新。

必须：

- 同一 cycle；
- TTL 不延长；
- identity 不变；
- historical seed 不冒充；
- old Reality 不恢复 Active。

### 23.5 Failure / Retry

覆盖：

- cutover storage unavailable；
- route load；
- runtime input；
- life surface；
- observation surface；
- watchdog；
- WebGL loss；
- stale callback；
- identity mismatch。

验证：

- 真实失败；
- 不伪成功；
- 同周期重试；
- 不生成第二 Gravity。

### 23.6 Old route isolation

真实浏览器访问：

- old Launch path；
- Archive action；
- legacy URLs；
- `/dynamics?fixture=...` production route；

不得进入 current production Gravity。

### 23.7 Choice continuity

```text
Choice
↓
new Reality
↓
new Pressure recognition
↓
new Gravity cycle
```

Choice 不直接进入 Gravity。

---

## 24. Definition of Done

Atomic Migration 未来只有全部满足才算完成：

1. Host transfer request 生产者为 1；
2. `gravityCycleId` 生成者为 1；
3. current Gravity Controller 为 1；
4. Recovery storage Reader / Writer 各为 1；
5. durable cutover commit point 为 1；
6. source terminal 与 target ready 位于同一 envelope；
7. commit 前 Reality 保持 Active；
8. commit 后 old Reality recovery 被 supersede；
9. `/dynamics` target route consumer 为 1；
10. direct URL 无 recovery 不 mount Gravity；
11. production seed 只来自 current Admission；
12. production mother 只来自 same-life session；
13. `GravityPage` 不拥有 production entry 解释权；
14. Motion typed life outcome PASS；
15. Static typed life outcome PASS；
16. Motion typed observation outcome PASS；
17. Static typed observation outcome PASS；
18. Host 只有两个事实都成立才提交；
19. fixed timer success 为 0；
20. DOM/data success 为 0；
21. Watchdog success 为 0；
22. stale cycle / revision 污染为 0；
23. LaunchLab production bypass 为 0；
24. Archive production bypass 为 0；
25. active legacy redirect bypass 为 0；
26. V1 Gravity Consumer production caller 为 0；
27. dev fixture production caller 为 0；
28. Choice / Crystal / Archive 自动消费为 0；
29. TTL 精确 2 小时；
30. refresh / retry 不延长 TTL；
31. single commit rollback PASS；
32. TypeScript PASS；
33. Production Build PASS；
34. 全量 XINMAI checks PASS 或既存失败清单无新增；
35. browser matrix PASS；
36. remote clean snapshot independent PASS。

完成体验句：

> 我不是被一条旧记录带进分析页；我带着刚刚认出的现实，和同一个生命一起靠近它留下的痕迹。

---

## 25. Runtime 授权申请条件

本 PREP 完成后，Runtime 仍然：

```text
DEFER
```

Product Control Tower 只有确认以下内容后才可授权：

1. 单提交文件边界被接受；
2. `GravityPage` 保留，不新建第二体验；
3. V1 Gravity Consumer 继续 dormant；
4. Cutover Envelope 为唯一 commit point；
5. old Reality Recovery supersession 规则被接受；
6. Mother 权威来自 `LaunchLifeSourceSession`；
7. current seed 不再由 historical localStorage 组成；
8. Motion / Static typed outcomes 被接受；
9. old Launch / Archive / redirect 同提交切断；
10. dev fixture 独立隔离；
11. rollback 为单 commit；
12. Phase 3 仍在迁移交付关闭前保持 Locked。

授权语句必须明确：

```text
XINMAI-PHASE-3-GRAVITY-ENTRY-ADMISSION-AUTHORITY-ATOMIC-MIGRATION-P0

Runtime Authorization:
GRANTED

Decision:
NOW — STRICT ATOMIC SCOPE
```

没有这条授权：

```text
不得实施 Runtime
```

---

## 26. PREP 最终回答

### 26.1 Controller 与 Transaction 最终 API

```text
Controller:
prepare
commitPrepared
establishRouteAdmission
retry
fail
commitActive
terminate
recover
read

Transaction:
executeRealityToGravityCutover
```

### 26.2 唯一 durable schema

```text
RealityToGravityCutoverEnvelope
```

同一对象包含：

- source terminal proof；
- target ready admission；
- identity continuity；
- pressure proof；
- body approach proof。

### 26.3 Reality 如何 supersede

```text
confirmed envelope
↓
commitRealityEncounterGravitySupersession()
```

旧 Recovery 即使未清理，也因 typed supersession proof 不再可恢复 Active。

### 26.4 GravityPage 最小 props

```text
mode
admission
runtimeInput
surfaceAttempt
typed outcome callbacks
explicit leave callback
```

### 26.5 Production / Dev 分离

```text
/dynamics
→ production admission only

/__dev/gravity
→ dev fixture only
```

### 26.6 Launch 精确删除点

```text
LaunchLab
commitPressureSeedCapture
→ DYNAMICS_HANDOFF
→ navigate("/dynamics")
```

生产成功路径删除。

### 26.7 Archive 与 legacy 目标

```text
safe life world
```

不得创建 Gravity Admission。

### 26.8 Motion / Static 生产者

```text
Same-life:
RealityLifeUniverseCanvas

First observation:
RealityGravityInertiaField
```

### 26.9 Failure injection

已经冻结：

- prepare；
- recovery write / read-back；
- supersession；
- route；
- runtime input；
- both surfaces；
- stale identity / cycle / revision。

### 26.10 单提交顺序

已冻结于第 21 节。

### 26.11 回滚

完整 Atomic Migration Commit。

### 26.12 Runtime 申请

```text
IMPLEMENTATION DESIGN:
READY

RUNTIME AUTHORIZATION:
NOT GRANTED
```

---

## 27. 交通灯扫描

### 27.1 绿色

- Reality Controller pattern 可复用；
- Reality typed surface pattern 可复用；
- Recognized Identity Recovery 已足够；
- `LaunchLifeSourceSession` 已具备 Mother authority；
- GravityPage / Six Dimension / Gravity inertia 可保留；
- Choice continuation 已正确回到 Reality。

处理：

```text
PRESERVE
```

### 27.2 黄色

- GravityPage 当前还承载后续 Choice / Crystal；
- 既存 Dynamics checks 冻结旧 input fallback；
- inactive source pages 仍含 direct navigation；
- Pressure Presentation 精确文案门禁仍漂移。

处理：

```text
MAP / GATE CALIBRATION
```

不并入本 PREP，也不得在未来 Migration 中无边界清理。

### 27.3 红色

- source Reality termination 与 target ready 尚未在同一 durable commit；
- `/dynamics` 仍直接 mount；
- historical localStorage 仍能组成 Production Ready；
- LaunchLab / Archive / legacy redirects 仍有旁路；
- Gravity minimum surface 尚无 typed outcome。

处理：

```text
ATOMIC MIGRATION
```

这些是下一刀的正式范围，不是本 PREP 的逃避理由。本 PREP 已完成。

---

## 28. 正式裁决

```text
Current Gravity Surface:
/dynamics / GravityPage

Target Gravity Surface:
/dynamics / GravityPage

Entry Authority:
RealityToGravityEntryAdmissionController

Cutover Owner:
RealityToGravityCutoverTransaction

Durable Commit:
Confirmed RealityToGravityCutoverEnvelope

Recovery:
Single session adapter

TTL:
2 hours maximum

Identity:
Existing recognized life

Current Pressure:
Typed current-cycle Admission snapshot

Mother:
LaunchLifeSourceSession

Minimum Surface:
Same Life + Current Reality Trace + First Observation

V1 Gravity Consumer:
DORMANT / DO NOT ACTIVATE

Second Gravity:
REJECT

Implementation Design:
READY

Runtime Authorization:
NOT GRANTED

Phase 3:
LOCKED
```

---

## 29. 下一刀建议

正式下一刀：

```text
XINMAI-PHASE-3-GRAVITY-ENTRY-ADMISSION-AUTHORITY-ATOMIC-MIGRATION-P0
```

刀型：

```text
Migration / Atomic Cutover
```

当前决策：

```text
DEFER — PENDING PRODUCT CONTROL TOWER RUNTIME AUTHORIZATION
```

授权后唯一目标：

> 在单个可回滚提交中建立唯一 Gravity Entry Admission、durable Reality → Gravity cutover、typed target recovery 与真实 minimum surface outcome，同时删除所有正式旧入口，不改变 Gravity 内部产品体验。

严格范围：

- 不增强视觉；
- 不改 Pressure Seed 内容；
- 不改 Six Dimension 算法；
- 不改 Gravity 哲学；
- 不改 Choice；
- 不改 Crystal；
- 不改商业化；
- 不复活 V1 Consumer；
- 不顺带清理无关债务。

迁移完成后不能自动宣布 Phase 3 解锁。

正确顺序：

```text
Atomic Migration
↓
Independent Delivery Closure Audit
↓
Phase 3 Entry Review
↓
Product Control Tower 决定是否解锁
```

---

## 30. 最终结论

> XINMAI 不需要第二个 Gravity，也不需要复活旧 Consumer。它需要的是一次完整的权威交接：当前 Reality 仍然真实存在时，由用户认出的 Pressure、同一生命身份与身体靠近事实共同提出请求；一个 durable envelope 同时结束 source Reality 并建立 target Gravity；随后只有真实的同体生命表面与第一观察入口都出现，Gravity 才成为 Active。任何历史 Seed、route state、timer、DOM 或旧页面都不能再冒充这次进入。
