# XINMAI Lived Response · Crystal Eligibility Authority Major Blade Prep P0

> 任务编号：`XINMAI-LIVED-RESPONSE-CRYSTAL-ELIGIBILITY-AUTHORITY-MAJOR-BLADE-PREP-P0`
> 刀型：Major Blade Prep
> 决策：`NOW — PREP ONLY`
> Runtime / Gate：`DEFER`
> 主 Layer：Phase 3 Growth
> 保护 Layer：World、Identity、Relationship、Reality provenance
> 边界 Layer：Phase 4 Sanctuary
> 当前阶段：Phase 3 `ACTIVE / NOT PASSED`，Crystal Formation `LOCKED`，Phase 4 `LOCKED`

---

## 一、唯一目标

冻结以下完整因果：

```text
Choice Action Intention
↓
用户离开 XINMAI
↓
现实中发生或未发生回应
↓
用户返回并描述
↓
用户明确确认事实
↓
Lived Response Fact
↓
Crystal Eligibility
↓
Crystal Formation
↓
Formation Receipt
```

并裁决当前页面本地 `livedResponseRecognized` 真源是否需要原子迁移。

本协议不修改 Runtime，不修改 Gate，不生成 Crystal，不解锁 Phase 4。

---

## 二、施工结论

### 2.1 最终裁决

```text
NOW — MIGRATION AUDIT READY
```

原因：

1. 当前页面本地状态正在同时承担“现实事实已发生”和“Crystal 可形成”的混合权威；
2. 当前 Runtime 没有独立的 Lived Response Fact Authority；
3. 当前 Runtime 没有独立的 Crystal Eligibility Authority；
4. Crystal 与 Personality Ring 的防重复主要依赖 `createdAt`，不能证明同一现实事实只形成一次；
5. 建立新权威会改变状态真源、消费者、恢复责任与形成提交点；
6. 因此不能先添加新 Authority、以后再删除页面真源，必须先进行 Migration Audit，再设计单提交原子切换。

### 2.2 产品真相

XINMAI 无法、也不应监控用户的现实生活。

正式权威不是：

```text
系统验证的客观现实真相
```

而是：

```text
用户明确确认的 Lived Response Fact
```

系统可以确认：

- 这项行动来自哪个 Choice；
- 用户回来报告了什么；
- 用户是否明确确认；
- 身份、Reality、Gravity 与 Choice 引用是否完整；
- 当前事实 revision 是否有效；
- Eligibility 是否已被消费。

系统不能确认：

- 用户是否撒谎；
- 行动是否足够优秀；
- 行动是否成功；
- AI 是否认可；
- 用户是否值得获得 Crystal。

### 2.3 Crystal 的产品定义

冻结：

> Crystal 记录被活出来的回应，不奖励任务成功，也不评价用户是否足够好。

因此：

```text
理解 ≠ Lived Response
选择 ≠ Lived Response
点击确认 ≠ Lived Response
AI 推测 ≠ Lived Response

用户明确确认的现实回应事实
+
完整因果引用
+
未被消费的 Eligibility
=
允许进入 Crystal Formation
```

---

## 三、四种资产必须分离

### 3.1 Choice Action Intention

回答：

> 我准备尝试什么。

它是用户对未来行动的明确意愿，不是事实，也不是资格。

### 3.2 Lived Response Candidate

回答：

> 我回来后描述，现实中可能发生了什么。

它可以来自用户短句、结构化选择，或 AI 辅助整理；在用户确认前只是候选。

### 3.3 Lived Response Fact

回答：

> 我明确确认，这就是本次实际发生的事实。

它是用户确认的产品事实，不声称为外部客观真相。

### 3.4 Crystal Eligibility

回答：

> 这个已确认事实是否具备进入 Crystal Formation 的因果资格。

它不是 Crystal，也不拥有 Crystal 的视觉、声音、材质或圣所位置。

### 3.5 禁止压缩

四种资产不得被压缩为：

```ts
livedResponseRecognized: boolean
```

也不得被压缩为：

```text
Choice 已确认
→ Crystal Ready
```

---

## 四、产品状态机

### 4.1 Choice Action Intention

```text
DRAFT
↓ 用户明确确认
COMMITTED
↓ 用户离开并等待现实回应
AWAITING_RETURN
↓ 用户开始报告现实结果
REPORTED
↓ 事实完成或用户明确结束
CLOSED
```

允许支路：

```text
DRAFT / COMMITTED / AWAITING_RETURN
→ WITHDRAWN

任一旧版本
→ SUPERSEDED
```

`COMMITTED` 只表示意愿成立，不允许生成 Eligibility。

### 4.2 Lived Response Candidate

```text
DRAFT
↓
AWAITING_USER_CONFIRMATION
├─ 用户确认 → CONFIRMED → 创建 Lived Response Fact
├─ 用户修改 → 新 Candidate Revision
├─ 用户拒绝 → USER_REJECTED
├─ 用户放弃 → DISCARDED
└─ 新版本替代 → SUPERSEDED
```

`USER_REJECTED_RECORD` 属于 Candidate 生命周期决策，不属于现实行动结果。

### 4.3 Lived Response Fact

```text
CONFIRMED
├─ 用户修正 → SUPERSEDED + 新 Fact Revision
└─ 用户撤回 / 删除 → REVOKED
```

Fact 采用不可变 revision。修改不是原地覆盖。

### 4.4 Crystal Eligibility

```text
Resolver
├─ WITHHELD
└─ ELIGIBLE / UNCONSUMED
          ↓ 原子占用
   FORMATION_PENDING
          ├─ 形成成功 → CONSUMED + Formation Receipt
          └─ 可重试失败 → UNCONSUMED
```

Fact 在形成前被修改、替代或撤回：

```text
旧 Eligibility
→ INVALIDATED
```

不得以单一布尔值表达上述状态。

---

## 五、现实回应结果语义

现实结果与记录生命周期必须分开。

### 5.1 `responseOutcome`

```text
NOT_ATTEMPTED
尚未发生现实尝试

ATTEMPTED
已经实际尝试，但结果不理想、不同于预期或尚未完成

COMPLETED_AS_INTENDED
实际完成了原计划回应

CHANGED_RESPONSE
现实中作出了不同于原计划、但明确真实的新回应

UNABLE_TO_CONTINUE
现实条件使行动无法继续
```

### 5.2 Eligibility 方向

| Lived Response | Eligibility 方向 | 产品说明 |
|---|---|---|
| 只理解、没有现实尝试 | `WITHHELD` | 理解不是现实回应 |
| 只点击“完成”但没有事实确认 | `WITHHELD` | 点击不是事实 |
| `ATTEMPTED` | 可以进入 `ELIGIBLE` | 不要求结果理想 |
| `COMPLETED_AS_INTENDED` | 可以进入 `ELIGIBLE` | 不增加成功奖励 |
| `CHANGED_RESPONSE` | 可以进入 `ELIGIBLE` | 真实改变优先于照做 |
| `NOT_ATTEMPTED` | `WITHHELD` | 不惩罚、不生成 Crystal |
| `UNABLE_TO_CONTINUE` | `WITHHELD` | 不惩罚；若实际发生边界或新行动，应记录为 `CHANGED_RESPONSE` |
| 用户拒绝记录 | 不创建 Fact，不生成 Eligibility | 尊重不记录 |
| AI 推测已经完成 | `REJECT` | AI 无确认权 |

Eligibility 不评价行动大小、结果好坏、道德价值或完成质量。

---

## 六、目标资产 Schema

以下为未来 Migration Audit 的目标契约，不代表本刀创建 Runtime 类型。

### 6.1 Choice Action Intention

```ts
type ChoiceActionIntentionState =
  | "DRAFT"
  | "COMMITTED"
  | "AWAITING_RETURN"
  | "REPORTED"
  | "WITHDRAWN"
  | "SUPERSEDED"
  | "CLOSED";

interface ChoiceActionIntention {
  schemaVersion: 1;
  choiceActionIntentionReferenceId: string;

  sourceReferenceId: string;
  identityReferences: StableLifeIdentityReferences;

  sourceEncounterCycleId: string;
  targetEncounterCycleId: string | null;
  gravityCycleId: string;
  gravityObservationReferenceId: string;

  formationSourceReferenceId: string;
  intentionRevision: number;
  state: ChoiceActionIntentionState;

  userConfirmedIntentionSummary: string;
  committedAt: string | null;
  updatedAt: string;

  provenance: {
    explicitUserCommitment: true;
    grantsCrystalEligibility: false;
    createsCrystal: false;
  };
}
```

说明：

- `sourceEncounterCycleId` 记录 Choice 产生的 Reality；
- `targetEncounterCycleId` 仅在下一轮 Reality 被正式承接时绑定；
- 单一 `encounterCycleId` 会混淆来源与目标，禁止使用；
- 当前 Revision Action 只能成为提议来源，不能自动变成用户意愿。

### 6.2 Crystal Formation Source Snapshot

```ts
interface CrystalFormationSourceSnapshot {
  schemaVersion: 1;
  formationSourceReferenceId: string;
  choiceActionIntentionReferenceId: string;

  sourceReferenceId: string;
  identityReferences: StableLifeIdentityReferences;

  hexagramFormationReference: string;
  migrationImpactReference: string;
  pressureReferenceId: string;
  primaryDimensionReference: string;
  completedNodeReferences: string[];
  revisionActionSnapshot: {
    layerLabel: string;
    yaoName: string;
    actionLine: string;
    sourceReason: string;
    interventionPotential: string;
    userAgency: string;
  };

  capturedAt: string;
}
```

该快照在 Choice commitment 时冻结已有 Engine 输出，避免用户返回后通过“最近一条状态”重新猜测来源。

它不新增推理，不决定 Eligibility。

### 6.3 Lived Response Candidate

```ts
type LivedResponseOutcome =
  | "NOT_ATTEMPTED"
  | "ATTEMPTED"
  | "COMPLETED_AS_INTENDED"
  | "CHANGED_RESPONSE"
  | "UNABLE_TO_CONTINUE";

type LivedResponseCandidateState =
  | "DRAFT"
  | "AWAITING_USER_CONFIRMATION"
  | "CONFIRMED"
  | "USER_REJECTED"
  | "DISCARDED"
  | "SUPERSEDED";

interface LivedResponseCandidate {
  schemaVersion: 1;
  livedResponseCandidateReferenceId: string;
  candidateRevision: number;

  choiceActionIntentionReferenceId: string;
  sourceReferenceId: string;
  identityReferences: StableLifeIdentityReferences;
  targetEncounterCycleId: string;
  gravityCycleId: string;
  gravityObservationReferenceId: string;

  responseOutcome: LivedResponseOutcome;
  userApprovedFactSummary: string | null;
  occurredAt: string | null;
  occurredAtPrecision: "EXACT" | "DAY" | "APPROXIMATE" | "UNKNOWN";

  inputMode:
    | "STRUCTURED_ONLY"
    | "USER_TEXT"
    | "AI_ASSISTED_USER_APPROVED";

  state: LivedResponseCandidateState;
  createdAt: string;
  updatedAt: string;
}
```

原始长文本不属于 Eligibility。默认只在当前交互周期内存在；只有用户确认过的最小事实摘要可以进入持久化候选。

### 6.4 Lived Response Fact

```ts
type LivedResponseFactState =
  | "CONFIRMED"
  | "SUPERSEDED"
  | "REVOKED";

interface LivedResponseFact {
  schemaVersion: 1;
  livedResponseReferenceId: string;
  factRevision: number;
  livedResponseCandidateReferenceId: string;

  sourceReferenceId: string;
  identityReferences: StableLifeIdentityReferences;
  encounterCycleId: string;
  gravityCycleId: string;
  gravityObservationReferenceId: string;
  choiceActionIntentionReferenceId: string;

  responseOutcome: LivedResponseOutcome;
  confirmedFactSummary: string | null;
  userConfirmationRevision: number;
  occurredAt: string | null;
  occurredAtPrecision: "EXACT" | "DAY" | "APPROXIMATE" | "UNKNOWN";
  confirmedAt: string;

  state: LivedResponseFactState;
  supersedesLivedResponseReferenceId: string | null;

  provenance: {
    userExplicitConfirmation: true;
    objectiveTruthClaim: false;
    aiConfirmationAuthority: false;
    identityBindingVerified: true;
    realityBindingVerified: true;
    gravityBindingVerified: true;
    choiceBindingVerified: true;
  };
}
```

不得通过最近一条 Choice、文本相似度、经过时间或“本地只有一条记录”猜测绑定。

### 6.5 Crystal Eligibility

```ts
type CrystalEligibilityDecision = "ELIGIBLE" | "WITHHELD";

type CrystalEligibilityConsumptionState =
  | "NOT_APPLICABLE"
  | "UNCONSUMED"
  | "FORMATION_PENDING"
  | "CONSUMED"
  | "INVALIDATED";

type CrystalWithheldReason =
  | "NO_CONFIRMED_FACT"
  | "NOT_ATTEMPTED"
  | "UNABLE_TO_CONTINUE"
  | "USER_REJECTED_RECORD"
  | "IDENTITY_MISMATCH"
  | "PROVENANCE_INCOMPLETE"
  | "INTENTION_MISMATCH"
  | "ENCOUNTER_CYCLE_MISMATCH"
  | "FACT_SUPERSEDED"
  | "FACT_REVOKED"
  | "STORAGE_UNCONFIRMED"
  | "ALREADY_CONSUMED";

interface CrystalEligibility {
  schemaVersion: 1;
  crystalEligibilityReferenceId: string;
  eligibilityRevision: number;

  sourceReferenceId: string;
  identityReferences: StableLifeIdentityReferences;
  choiceActionIntentionReferenceId: string;
  livedResponseReferenceId: string;
  livedResponseFactRevision: number;
  formationSourceReferenceId: string;

  decision: CrystalEligibilityDecision;
  withheldReason: CrystalWithheldReason | null;
  consumptionState: CrystalEligibilityConsumptionState;

  formationReservationReferenceId: string | null;
  formationReferenceId: string | null;
  resolvedAt: string;
  consumedAt: string | null;

  provenance: {
    basedOnUserConfirmedFact: true;
    aiEligibilityAuthority: false;
    successScoring: false;
    rewardScoring: false;
  };
}
```

### 6.6 Crystal Formation Receipt

```ts
interface CrystalFormationReceipt {
  schemaVersion: 1;
  formationReferenceId: string;
  crystalReferenceId: string;

  crystalEligibilityReferenceId: string;
  eligibilityRevision: number;
  livedResponseReferenceId: string;
  livedResponseFactRevision: number;
  choiceActionIntentionReferenceId: string;
  formationSourceReferenceId: string;
  identityReferences: StableLifeIdentityReferences;

  status: "FORMED";
  formedAt: string;
  archiveProjectionState: "PENDING" | "PROJECTED" | "RETRYABLE";
}
```

Formation Receipt 是 Phase 3 防重复与恢复真源。Personality Ring / Archive 只是它的投影，不得反向证明 Crystal 是否已形成。

---

## 七、唯一权威所有者

### 7.1 Choice Action Intention Controller

拥有：

- 用户意愿 commit；
- intention revision；
- source / target encounter 绑定；
- withdraw、supersede、close。

不拥有：

- Lived Response Fact；
- Crystal Eligibility；
- Crystal。

### 7.2 Lived Response Authority Controller

拥有：

- Candidate → Fact；
- 用户确认 revision；
- 修改、拒绝、撤回与删除；
- provenance 与引用校验；
- 当前 Fact 状态。

不拥有 Crystal。

### 7.3 Crystal Eligibility Authority

拥有：

- `ELIGIBLE / WITHHELD`；
- Withheld 原因；
- eligibility revision；
- 形成资格的原子占用；
- consumed / invalidated 状态。

不拥有：

- Crystal 表现；
- Crystal 声音；
- 圣所轨道；
- Archive 成长。

### 7.4 Crystal Formation Consumer

它是 Crystal Formation 的唯一入口，只能消费：

```text
ELIGIBLE
+
完整有效的 Lived Response Fact
+
对应的 Formation Source Snapshot
+
UNCONSUMED 资格
```

它负责形成调用与 Formation Receipt，不读取页面布尔值或用户原文。

### 7.5 Xinmai Lived Growth Recovery Adapter

作为 Phase 3 growth envelope 的唯一 Storage Reader / Writer：

- Storage 内容只是恢复候选；
- Controller 在当前 Runtime 中重新验证权威；
- Page、Route、Renderer、AI 不直接读写。

### 7.6 Personality Ring Projection Adapter

只把已形成的 Receipt 投影到长期 Archive。

投影失败：

- Receipt 保持已形成；
- 投影进入可重试；
- 不重新形成 Crystal。

---

## 八、用户确认、修改、拒绝与删除

### 8.1 返回入口

目标入口位于现有 Returning Life World：

```text
恢复同一身份
↓
恢复同一星兽与关系
↓
发现待回访的 Choice Action Intention
↓
用户自愿报告 / 暂不记录
↓
继续生命世界
```

原则：

- 不新增独立页面；
- 不把它变成任务结算；
- 不阻断回到安全生命空间；
- 多个待回访意愿必须明确选择，禁止按“最近一条”自动绑定。

### 8.2 用户回答

允许：

- 我做了；
- 我试了一部分；
- 我没有做到；
- 事情发生了变化；
- 我最后选择了另一种回应；
- 我不想记录这次。

没有完成时：

- 不惩罚；
- 不让星兽恶化；
- 不清除 Choice；
- 不制造失败、断签或失去奖励；
- 不伪造 Crystal。

### 8.3 确认是独立动作

用户必须能够在确认前：

- 查看候选；
- 修改候选；
- 拒绝候选；
- 选择不记录。

只有明确确认动作才能产生 Fact。

### 8.4 形成前修改与删除

```text
Fact 修改
→ 新 Fact Revision
→ 旧 Eligibility INVALIDATED
→ Resolver 重新判断
```

```text
Fact 撤回 / 删除
→ 保留最小 tombstone
→ 未形成 Eligibility INVALIDATED
→ 不形成 Crystal
```

### 8.5 形成后修改与删除

已形成 Crystal 后：

- 不默认级联删除 Crystal；
- Fact 修正或撤回在 Receipt 上标记来源已修订 / 已撤回；
- 不允许同一 Intention 再生成第二颗 Crystal；
- 隐私删除可以清除原文与事实摘要，但保留最小去重 tombstone；
- Crystal 本身的删除是未来独立资产删除决策，不由本协议自动授权。

新的、实质不同的现实行动必须来自新的 Choice Action Intention 与新的因果周期。

---

## 九、原始文本与 AI 边界

### 9.1 原始文本

- 用户可以只选结构化结果；
- 可以补充极短事实描述；
- 原始长文本默认只存在于当前交互周期；
- 刷新后丢失未确认 draft 是安全降级；
- 持久化只保存用户确认过的最小事实摘要。

### 9.2 AI

AI 可以：

- 帮助整理 Candidate；
- 提供可编辑的短摘要；
- 询问这个描述是否贴近用户。

AI 不得：

- 判断用户是否真的行动；
- 确认事实；
- 判断行动是否成功；
- 决定 `ELIGIBLE`；
- 直接生成 Crystal。

AI 辅助候选必须标记：

```text
AI_ASSISTED_USER_APPROVED
```

且仍需用户独立确认。

---

## 十、幂等、恢复与防重复

### 10.1 当前风险

当前 Crystal 与 Personality Ring 主要使用 `createdAt` 识别条目。

`createdAt` 不能证明：

- 同一个事实是否已被消费；
- 刷新后形成是否已经提交；
- Archive 投影失败是否应重新形成；
- 两次点击是否来自同一个 Eligibility。

### 10.2 正式形成键

冻结：

```text
crystalEligibilityReferenceId
+
eligibilityRevision
=
唯一形成键
```

不得使用 `createdAt` 作为正式因果去重键。

### 10.3 原子形成

一次权威 growth envelope 提交必须一致记录：

```text
有效 Fact Revision
+
Eligibility FORMATION_PENDING → CONSUMED
+
Crystal Formation Receipt
+
Archive Projection Outbox 状态
```

相同 Eligibility 的重试：

- 返回同一 Formation Receipt；
- 返回同一 `crystalReferenceId`；
- 不创建第二颗 Crystal。

### 10.4 失败语义

| 失败点 | 权威结果 |
|---|---|
| Intention 未持久化 | 可继续现实，但不能声称未来可恢复为 Crystal 因果 |
| Candidate 写入失败 | 不生成 Fact |
| Fact 写入未确认 | 不生成 Eligibility |
| Eligibility 写入未确认 | 不进入 Formation |
| Formation 失败且未提交 | 资格回到可重试 `UNCONSUMED` |
| Formation 已提交、Archive 投影失败 | Receipt 保持，重试投影，不重新形成 |
| Storage 不可用 | 不阻断生命空间；展示真实降级，不伪造持久成长 |

---

## 十一、消费者审计与裁决

| 当前资产 / 消费者 | 当前问题 | 裁决 | 目标责任 |
|---|---|---|---|
| `livedResponseRecognized` | 页面布尔值放行 Crystal | `MIGRATE → DELETE` | 不再拥有 Fact 或 Eligibility；若保留只能是 derived UI mirror |
| `revisionActionConfirmed` | 同时承担 Choice 与沉积触发 | `ADAPT` | 只表达 Choice commitment 的 UI 事实 |
| `GravityPage` | 页面持有本地事实、资格与形成门禁 | `MIGRATE` | 只发 typed commands、消费 typed state |
| Choice 页面本地状态 | 把当前点击当作成长事实 | `MIGRATE` | 产生 Choice Action Intention |
| `choiceExperienceUIRuntime` | Choice 确认即 `CRYSTAL_READY` | `ISOLATE` | 不进入 Production Authority |
| `realityProductionChoiceConsumer` | 同样表达 Choice → Crystal Ready | `ISOLATE` | 继续禁止激活 |
| `RealityChoicePresentation` | 展示“Crystal 已准备好” | `ISOLATE` | 不作为正式产品语义 |
| `RealityEncounterIntent` | `LIVED_RESPONSE_CONTINUATION` 名称暗示已有真实回应 | `ADAPT` | 只携带 opaque `choiceActionIntentionReferenceId`；资格语义应收窄为 Choice intention continuation |
| Reality Encounter Recovery | 尚不拥有成长事实 | `ADAPT` | 恢复 intention reference，不拥有 Fact / Eligibility |
| `GravityEntryAdmission` | 缺少稳定 Observation 引用 | `ADAPT` | 保留 exact action / observation provenance |
| `GravityProductionSurfaceHost` | 尚未投递成长权威引用 | `ADAPT` | 只传 typed references，不拥有状态 |
| Crystal Runtime Adapter | 读取 technical completion + revision action | `MIGRATE` | 只由 Formation Consumer 调用 |
| Hexagram Crystal Engine / Endpoint | 纯形成映射可复用 | `KEEP` | 不判断 Eligibility |
| Current Crystal End State | 页面形成状态聚合 | `ADAPT` | 只展示 Formation Receipt / formed Crystal |
| Personality Ring Deposit Adapter | 按 `createdAt` 防重复 | `MIGRATE` | 按 `crystalReferenceId` 投影 |
| Personality Ring Lite Service | 缺少因果引用 | `MIGRATE` | 兼容添加 receipt / crystal references |
| Personality Ring Persistence | 当前只持久化 Archive v1 | `MIGRATE` | 继续是投影存储，不成为 Formation Authority |
| LaunchLab Returning Life World | 已承载回归身份、关系与历史记忆 | `ADAPT` | 消费 typed return opportunity，发 typed commands |
| Archive / Personality Ring Page | 长期展示 | `KEEP` | 只消费已形成 Crystal |
| Renderer | 不应理解事实或资格 | `KEEP / REJECT CONSUMER` | 只消费视觉事实 |
| AI | 无事实与资格权威 | `REJECT AUTHORITY` | 最多辅助 Candidate 起草 |
| Recovery / Storage | 目前没有独立 growth envelope | `MIGRATE` | Recovery Adapter 唯一读写，内容仍是候选 |
| Phase 4 Sanctuary | 当前未越权 | `KEEP LOCKED` | 只消费已形成 Crystal |

### 11.1 禁止消费者

以下对象不得生产、推进或覆盖 Crystal Eligibility：

```text
Gravity Route
GravityPage
Pressure Seed
AI
Choice Host
Renderer
DOM / data-*
固定计时器
Archive Presentation
Phase 4 Sanctuary
付费状态
```

---

## 十二、Gate 责任拆分

本刀不修改 Gate，只冻结未来边界。

### 12.1 Choice Boundary Gate

保护：

```text
Choice 只能产生 Action Intention
Choice 不产生 Fact
Choice 不产生 Eligibility
Choice 不形成 Crystal
```

### 12.2 Lived Response Authority Gate

保护：

- Candidate 与 Fact 分离；
- 用户明确确认；
- revision / provenance；
- 修改、拒绝、撤回；
- 身份与因果引用完整。

### 12.3 Crystal Eligibility Gate

保护：

- Eligibility 决策表；
- Withheld 原因；
- AI、成功评分与 Phase 4 无权；
- Fact 无效时资格失效。

### 12.4 Crystal Formation Consumer Gate

保护：

- Formation 只消费 typed Eligibility；
- 原子 reservation；
- Formation Receipt；
- 同一资格不重复形成；
- Archive 投影失败不重新形成。

### 12.5 既存 Gate 后续裁决

| Gate | 后续处理方向 |
|---|---|
| `check-gravity-change-experience-routing` | 移除 Choice / Crystal phase boundary 断言，只保护 Gravity routing |
| `check-xinmai-validated-response-crystal-body-sediment` | 保留视觉来源连续与身体沉积；移除 recognition 作为资格权威的断言 |
| 旧 Choice Runtime Gates | 保持隔离，或在申请激活前单独校准 |

精确源码字符串不得成为长期产品权威断言。

---

## 十三、页面本地真源迁移清单

### 13.1 必须移除的正式权威

```text
GravityPage.livedResponseRecognized
→ 不再放行 CurrentCrystalEndState
→ 不再决定 Choice Continue
→ 不再映射 ELIGIBLE_BY_USER_RECOGNITION
```

```text
revisionActionConfirmed
→ 不再被 Crystal Adapter 解释为现实事实
```

```text
Choice confirmed / CRYSTAL_READY
→ 不再成为 Formation 条件
```

### 13.2 必须建立的正式权威

```text
Choice Action Intention Authority
↓
Lived Response Authority
↓
Crystal Eligibility Authority
↓
Crystal Formation Consumer
↓
Formation Receipt
```

### 13.3 不允许分阶段双真源

禁止：

```text
新增 Eligibility Authority
+
保留 livedResponseRecognized 放行
```

禁止：

```text
Formation Receipt 防重复
+
继续按 createdAt 形成
```

未来 Runtime 必须在单一原子迁移中切换消费者并删除旧成功路径。

---

## 十四、Migration Audit 范围

下一张 Migration Audit 必须清点：

1. `GravityPage` 页面本地事实与资格真源；
2. Choice Action Intention 的正式生成与持久化时点；
3. Reality / Gravity provenance 与 Observation reference；
4. Returning Life World 的回访入口；
5. Phase 3 growth envelope 与唯一 Recovery Adapter；
6. Candidate → Fact 的用户确认事务；
7. Eligibility resolver、reservation 与消费状态；
8. Crystal Formation Receipt；
9. Crystal Runtime Consumer 切换；
10. Personality Ring / Archive 投影与稳定引用；
11. legacy Archive 兼容与 No Backfill；
12. Gate 责任迁移；
13. 双路径、重复 Crystal 与旧回调门禁；
14. 单提交文件边界；
15. 完整回滚单位。

### 14.1 迁移等级

```text
交通灯：RED
刀型：Migration Audit
原因：状态权威、持久化责任、消费者与形成提交点同时变化
```

---

## 十五、未来原子实施的建议文件边界

以下只作为 Migration Audit 的候选清单，不代表本刀授权创建。

### 15.1 候选新增

```text
src/types/xinmaiChoiceActionIntention.ts
src/types/xinmaiLivedResponse.ts
src/types/xinmaiCrystalEligibility.ts

src/services/xinmaiChoiceActionIntentionController.ts
src/services/xinmaiLivedResponseAuthorityController.ts
src/services/xinmaiCrystalEligibilityAuthority.ts
src/services/xinmaiLivedGrowthRecoveryAdapter.ts
src/services/xinmaiCrystalFormationConsumer.ts

src/components/XinmaiLivedResponseReturnSurface.tsx

scripts/check-xinmai-choice-action-intention-boundary.mjs
scripts/check-xinmai-lived-response-authority.mjs
scripts/check-xinmai-crystal-eligibility-authority.mjs
scripts/check-xinmai-crystal-formation-consumer.mjs
```

### 15.2 候选修改

```text
src/pages/GravityPage.tsx
src/pages/LaunchLab.tsx

src/types/xinmaiRealityEncounterIntent.ts
src/services/xinmaiRealityEncounterIntentController.ts
src/services/xinmaiRealityEncounterIntentRecoveryAdapter.ts

src/types/xinmaiGravityEntryAdmission.ts
src/services/xinmaiGravityEntryAdmissionController.ts
src/components/GravityProductionSurfaceHost.tsx

src/services/guanyaoDynamicsCrystalRuntimeAdapter.ts
src/services/hexagramCrystalRuntimeEndpointService.ts
src/services/guanyaoDynamicsPersonalityRingDepositAdapter.ts
src/services/personalityRingLiteService.ts
src/services/guanyaoPersonalityRingLitePersistenceAdapter.ts

src/types/index.ts
package.json

scripts/check-gravity-change-experience-routing.mjs
scripts/check-xinmai-validated-response-crystal-body-sediment.mjs
```

根据 Audit 证据，可能还需：

```text
src/pages/RealityProductionRouteEntry.tsx
src/types/realityProductionRouteEntry.ts
src/components/RealityProductionHost.tsx
```

最终文件集合必须由 Migration Audit 冻结，不得以“架构完整”为由扩张。

### 15.3 单提交要求

未来原子迁移提交必须同时完成：

```text
建立四类独立资产
+
建立唯一 Authority / Recovery
+
接入返回确认
+
切换 Crystal Formation Consumer
+
建立 Formation Receipt
+
切换 Archive Projection
+
删除页面本地成功真源
+
删除 Choice → Crystal 旁路
+
建立四类 Gate
```

不得先提交新权威、后续再移除旧权威。

---

## 十六、回滚边界

未来 Runtime 迁移必须可以由一个提交完整回滚。

回滚规则：

- 回滚 Runtime 消费者与新 Authority；
- 新 growth storage key 保持 dormant，不主动删除；
- 回滚后旧版本不得读取 dormant envelope；
- 已投影到 Personality Ring 的兼容字段继续可读；
- 不删除用户身份、关系资产或已经形成的 Crystal；
- 不清理合法 Reality Encounter Intent；
- 不留下新旧双 Eligibility；
- 不要求多个提交共同恢复。

Legacy Personality Ring 条目：

- 不做 Backfill；
- 无新引用时按 legacy 展示；
- 不据此补造 Lived Response Fact 或 Eligibility。

---

## 十七、真实浏览器验收矩阵

未来 Runtime 关闭前必须以真实路径验证：

| # | 场景 | 必须结果 |
|---:|---|---|
| 1 | 用户确认 Choice | 只形成 Action Intention，不形成 Crystal |
| 2 | 离开后以同一身份返回 | 出现对应 return opportunity，不按“最近一条”猜测 |
| 3 | `ATTEMPTED` 且结果不理想 | 用户确认后可进入 Eligibility |
| 4 | `COMPLETED_AS_INTENDED` | 用户确认后可进入 Eligibility |
| 5 | `CHANGED_RESPONSE` | 用户确认后可进入 Eligibility |
| 6 | `NOT_ATTEMPTED` | WITHHELD，无惩罚 |
| 7 | `UNABLE_TO_CONTINUE` | WITHHELD，无惩罚 |
| 8 | 用户拒绝记录 | 不生成 Fact / Eligibility |
| 9 | AI 辅助 Candidate | 可编辑；用户确认前无 Fact |
| 10 | Candidate 修改 | 形成新 Candidate revision |
| 11 | Fact 在形成前修改 | 旧 Eligibility 失效 |
| 12 | Fact 在形成前删除 | Eligibility 失效，不形成 Crystal |
| 13 | 身份 / source / encounter / gravity / action 任一失配 | 拒绝消费 |
| 14 | Storage 不可用 | 不阻断生命空间，不伪造持久事实 |
| 15 | draft / Fact / pending / consumed 各阶段刷新 | 恢复到最后一个权威确认状态 |
| 16 | 双击、重试、旧回调晚到 | 同一 Eligibility 只形成一次 |
| 17 | Formation 已提交、Archive 投影失败 | 重试投影，不重新形成 |
| 18 | 形成后 Fact 修正或撤回 | 不自动删 Crystal，不生成第二颗 |
| 19 | 多个待回访 Intention | 用户明确选择，禁止 latest guessing |
| 20 | Renderer / DOM / AI / Phase 4 | 均不消费或生产 Eligibility |
| 21 | 直接 URL、返回、前进 | 不绕过权威状态机 |
| 22 | Reduced Motion / 无障碍 | 只改变呈现，不改变事实与资格 |
| 23 | 原页面旧本地旁路 | 原子切换后为 0 |
| 24 | 旧 Choice Consumer | 继续隔离，不成为 Production Authority |

还必须执行：

- TypeScript；
- Production Build；
- 全量 XINMAI 门禁；
- 新增四类 Authority / Consumer 门禁；
- 干净远程快照独立复现；
- 新增失败 0。

---

## 十八、Phase 4 边界

Phase 3 负责：

```text
现实行动返回
↓
Lived Response Fact
↓
Crystal Eligibility
↓
首次合法形成
```

Phase 4 只能消费：

```text
已形成 Crystal
↓
Sanctuary Orbit
↓
Life Soundscape
↓
Long-term Archive
```

Phase 4 不得：

- 判断事实是否真实；
- 生产或改写 Eligibility；
- 因付费状态改变 Eligibility；
- 从历史 Choice 补造 Crystal；
- 从 Archive 反向创建 Fact。

本 PREP 未发现 Phase 4 当前越权，但 Phase 4 继续保持 `LOCKED`。

---

## 十九、Definition of Done

本 PREP 在以下结论冻结后完成：

- Choice、Candidate、Fact、Eligibility 四种资产完全分离；
- 用户确认是真实行动事实的唯一成立动作；
- Lived Response Authority 与 Crystal Eligibility Authority 的责任分离；
- Crystal Formation 只消费 typed Eligibility；
- Formation Receipt 成为防重复真源；
- 页面本地 `livedResponseRecognized` 被裁决为待迁移旧真源；
- Returning Life World 是回访承载空间，不新增页面；
- AI、Renderer、DOM、Phase 4 与付费状态均无资格权威；
- 修改、拒绝、删除、恢复与投影失败语义明确；
- 原子迁移、单提交与回滚范围明确；
- Runtime 与 Gate 仍未被本刀修改。

完成体验句：

> 这不是系统奖励我完成了任务，而是我确认自己真的活出过一次不同回应，它因此留在了生命里。

---

## 二十、下一刀建议

```text
XINMAI-LIVED-RESPONSE-CRYSTAL-ELIGIBILITY-AUTHORITY-ATOMIC-MIGRATION-AUDIT-P0

交通灯：
RED

刀型：
Migration Audit

决策：
NOW — AUDIT ONLY

Runtime / Gate：
DEFER
```

该刀只冻结：

- 当前与目标状态真源；
- 全部生产者和消费者；
- growth envelope 与 Recovery 边界；
- 页面本地真源删除点；
- Crystal Formation 与 Archive Projection 切换；
- 单提交文件清单；
- 原子失败与完整回滚；
- 真实浏览器门禁。

Migration Audit 通过前，不申请 Runtime 实施。

---

## 二十一、刀后状态

```text
Phase 3：
ACTIVE / NOT PASSED

Reality Adventure：
进入真实行动与成长资格设计

Lived Response Product Authority：
ACCEPTED AS TARGET AUTHORITY

Lived Response Runtime Authority：
NOT ESTABLISHED

Crystal Eligibility Product Authority：
ACCEPTED AS TARGET AUTHORITY

Crystal Eligibility Runtime Authority：
NOT ESTABLISHED

Crystal Formation：
LOCKED

Phase 4：
LOCKED

本刀裁决：
NOW — MIGRATION AUDIT READY
```
