# XINMAI Gravity Choice Presentation Readiness Resolver Major Blade Prep P0

任务编号：

`XINMAI-GRAVITY-CHOICE-PRESENTATION-READINESS-RESOLVER-MAJOR-BLADE-PREP-P0`

审查日期：

`2026-07-30`

审查基线：

```text
458e844d9ed8abc1bb18a8dca074228f2970cf40
```

远程分支：

```text
origin/codex/genesis-28-mansion-production-continuity
=
458e844d9ed8abc1bb18a8dca074228f2970cf40
```

交通灯：

```text
YELLOW
```

刀型：

```text
Major Blade Prep
```

决策边界：

```text
NOW — PREP ONLY

Runtime：
未修改

Growth Authority：
未修改

Gate：
未修改

文案：
未修改

视觉：
未修改
```

---

# 一、Construction State Card

```text
当前 Phase：
Phase 3

当前状态：
ACTIVE / NOT PASSED

当前 A 级主线：
Reality Adventure

本刀主 Layer：
Layer 4 Growth 的 Choice Presentation Readiness

保护：
Layer 1 World
Layer 2 Identity
Layer 3 Relationship
Reality / Pressure / Gravity provenance

已关闭 Authority：
Gravity Observation Progress Recovery Authority
Choice Atomic Boundary
Lived Growth Transactional Persistence

当前缺口：
页面展示资格与 Choice Authority 提交前提不一致

Visual Runtime：
DEFER

Phase 4：
LOCKED
```

本刀唯一回答：

> 如何建立一个只读、类型化、不会成为第二提交权威的 Choice Presentation Readiness Resolver。

---

# 二、PREP 最终裁决

```text
NOW — MAJOR BLADE APPLICATION READY
```

目标 Runtime 因果冻结为：

```text
Typed Observation Recognition Proof
+
完整 Action Candidate
+
Change Experience Route
+
Migration Impact
+
Formation Source Snapshot
+
Canonical Growth Terminal Summary
↓
Choice Presentation Readiness Resolver
↓
五态只读 Presentation Decision
↓
Gravity Page / Visual Presentation
```

Resolver 不：

- 创建 Choice；
- 修改 Observation；
- 读写 Storage；
- 推进 Growth Controller；
- 生成 Eligibility；
- 形成 Crystal；
- 充当提交凭证。

Choice Authority 继续在正式 IndexedDB 事务中重新验证：

- 当前 Observation；
- 当前 checkpoint revision；
- identity；
- Reality / Gravity provenance；
- lineage；
- 是否已有 Choice；
- 是否已有更高 Growth 资产；
- 事务提交真实性。

因此目标结构是：

```text
Presentation：
快照级可见性决定

Authority：
提交时最终决定
```

不是：

```text
Presentation Decision
↓
自动授权提交
```

---

# 三、当前缺口与停止位置

当前页面自行拼接：

```text
hexagramAssetCandidate = READY_TO_CRYSTALLIZE
+
singleModelRevisionAction 存在
+
innerViewRelation != AWAITING
+
committedChoiceActionIntention 为空
+
transformationMomentActive = false
↓
isRevisionActionPending
↓
显示可操作 Choice
```

但正式提交还要求：

```text
surfaceAttempt
currentHexagramFormation
crystalMigrationImpact
singleModelRevisionAction
READY_TO_CRYSTALLIZE
```

正式事务进一步要求：

```text
Observation = OBSERVATION_RECOGNIZED
checkpoint revision 匹配
identity / encounter / gravity / observation lineage 匹配
Observation lifecycle = CURRENT
不存在既有 Choice
不存在更高 Growth 资产
IndexedDB transaction complete
```

因此当前可见性条件遗漏：

- typed Observation status；
- checkpoint revision；
- current Admission / surface attempt；
- Change Experience route；
- migration impact；
- Formation Source Snapshot 完整性；
- canonical Growth terminal facts；
- recovery error；
- stale lineage；
- identity / provenance mismatch。

生产浏览器已经在上游 MAP 中复现：

```text
OBSERVATION_RECOGNIZED
+
四爻 Revision Action
+
READY_TO_CRYSTALLIZE
↓
页面展示 Choice
↓
Change Experience route = null
migrationImpact = null
↓
正式提交处理函数不能接受
```

本 PREP 不重复修改或掩盖该事实。

---

# 四、正式五态输出

目标类型：

```ts
type ChoicePresentationReadinessState =
  | "READY_TO_PRESENT"
  | "WITHHELD"
  | "RESUME_COMMITTED"
  | "TERMINAL_BY_GROWTH"
  | "SAFE_WITHHELD";
```

每个输出必须携带：

```text
state
reason
identityReferences
encounterCycleId
gravityCycleId
gravityObservationReferenceId
observationCheckpointRevision
growthCanonicalRevision
resolvedAt
```

其中 `growthCanonicalRevision` 在 Recovery 不可用时允许为 `null`。

## 4.1 READY_TO_PRESENT

必须同时满足：

```text
Observation Decision = OBSERVATION_RECOGNIZED
+
gravityObservationReferenceId 匹配
+
checkpoint revision 当前
+
identity references 当前
+
encounter / gravity / pressure provenance 当前
+
lineage 尚未消费
+
合法 Revision Action Candidate 存在
+
Change Experience route 存在
+
migration impact 存在
+
Formation Source Snapshot 完整
+
Growth Terminal Summary = NONE
+
没有 pending / recovery failure
```

输出可以携带只读：

```text
actionCandidate
route
migrationImpact
formationSourceSnapshot
```

但该输出：

- 不获得 reference ID；
- 不持久化；
- 不可被 Controller 当作授权票据；
- 不可跳过事务内复验；
- 不保证用户点击时输入仍然最新。

## 4.2 WITHHELD

适用于：

- Observation 尚未认出；
- Observation 仍为 `SURFACE_REQUIRED`；
- Observation 仅为 `OBSERVATION_AVAILABLE`；
- Action Candidate 缺失；
- route 缺失；
- migration impact 缺失；
- Formation Source Snapshot 不完整；
- 仅满足旧 `READY_TO_CRYSTALLIZE` 兼容状态；
- 六维计数完成但产品语义不足；
- 当前页面仍在观察；
- 当前候选不是合法生产候选；
- 当前输入完整但尚未达到展示资格。

行为：

```text
不显示可点击 Choice
不显示提交失败补偿入口
继续当前 Gravity Observation
```

`WITHHELD` 不是失败，也不产生惩罚。

## 4.3 RESUME_COMMITTED

成立条件：

```text
Growth Terminal Summary = CHOICE_COMMITTED
```

行为：

- 不显示新的 Choice；
- 恢复同一个 `choiceActionIntentionReferenceId`；
- 进入真实生活等待态；
- 允许正式 Returning / Reality continuation；
- 不重新生成 Observation 或 Choice；
- 不使用页面本地 `transformationMomentActive` 证明已提交。

## 4.4 TERMINAL_BY_GROWTH

成立条件：

```text
Growth Terminal Summary =
LIVED_RESPONSE_RECORDED
或
ELIGIBILITY_AVAILABLE
或
CRYSTAL_FORMED
```

输出同时携带：

```text
terminalTarget：
LIVED_RESPONSE_RETURN
CRYSTAL_FORMATION
RETURNING_BODY_IMPRINT
```

映射：

| Growth 状态 | Presentation target |
|---|---|
| `LIVED_RESPONSE_RECORDED` | `LIVED_RESPONSE_RETURN` |
| `ELIGIBILITY_AVAILABLE` | `CRYSTAL_FORMATION` |
| `CRYSTAL_FORMED` | `RETURNING_BODY_IMPRINT` |

`TERMINAL_BY_GROWTH` 的含义是：

> 当前 Choice 入口已经被更高等级的真实成长事实接管。

它不代表：

- Phase 4 解锁；
- Sanctuary 已建立；
- Crystal 已同步到云端；
- 用户完成了全部成长。

## 4.5 SAFE_WITHHELD

适用于：

- canonical Growth Recovery unavailable；
- canonical Growth Recovery corrupted；
- legacy conflict；
- legacy writer detected；
- identity mismatch；
- Reality / Pressure / Gravity provenance mismatch；
- stale observation lineage；
- Summary 与 Observation 互相冲突；
- Summary 中存在重复或无法唯一归属的高阶资产；
- typed input 缺失到无法安全判断；
- Route 切换导致旧异步结果晚到；
- 当前 summary refresh 尚未完成；
-事务或恢复处于不可确认状态。

行为：

```text
不显示新 Choice
不伪造 RESUME
不清除既有 Growth
允许安全重读
保持正式 Authority 不变
```

禁止降级为旧页面布尔值。

---

# 五、状态优先级

Resolver 必须使用固定优先级：

```text
1. Recovery / identity / provenance / lineage 不可确认
   → SAFE_WITHHELD

2. 已有 Fact / Eligibility / Receipt / Crystal
   → TERMINAL_BY_GROWTH

3. 已有 Choice
   → RESUME_COMMITTED

4. Observation 尚未 RECOGNIZED
   → WITHHELD

5. Candidate / route / impact / snapshot 不完整
   → WITHHELD

6. 全部 typed prerequisites 成立
   → READY_TO_PRESENT
```

该顺序保证：

- 更高 Growth 资产永远优先；
- 已提交 Choice 不会重新开放；
- Recovery 失败不变成可点击入口；
- 页面阶段枚举不能覆盖 canonical facts。

---

# 六、状态机

```text
SURFACE_REQUIRED
↓
WITHHELD

OBSERVATION_AVAILABLE
↓
WITHHELD

OBSERVATION_RECOGNIZED
↓
读取 Growth Terminal Summary
↓
检查 typed candidate prerequisites
↓
READY_TO_PRESENT / WITHHELD / SAFE_WITHHELD

READY_TO_PRESENT
↓ 用户明确提交
Choice Authority 在事务内重新验证
↓
COMMITTED
↓
RESUME_COMMITTED

RESUME_COMMITTED
↓ 用户返回并确认现实事实
LIVED_RESPONSE_RECORDED
↓
TERMINAL_BY_GROWTH

ELIGIBILITY_AVAILABLE
↓
TERMINAL_BY_GROWTH

CRYSTAL_FORMED
↓
TERMINAL_BY_GROWTH
```

并发变化：

```text
READY_TO_PRESENT
↓ 另一标签页先提交
当前标签页点击
↓
Authority 拒绝 stale / already exists
↓
重读 Growth Summary
↓
RESUME_COMMITTED 或 TERMINAL_BY_GROWTH
```

禁止：

```text
READY_TO_PRESENT
↓
页面直接设置 committed
```

---

# 七、typed 输入责任表

| 输入 | 分类 | 权威来源 | Resolver 用途 | 禁止用途 |
|---|---|---|---|---|
| `GravityObservationResumeDecision` | `Authority Fact` | Gravity Encounter Continuity Recovery | 判断 Observation 与已提交 Choice | 不写回 Observation |
| `gravityObservationReferenceId` | `Authority Fact` | Resume Decision / Admission | lineage 对齐 | 不从 Admission revision 重建 |
| `checkpointRevision` | `Authority Fact` | Observation Checkpoint | 快照一致性 | 不作为永久提交凭证 |
| `identityReferences` | `Authority Fact` | Recognized Identity + Admission | 资产归属校验 | 不由页面生成 |
| Reality encounter cycle | `Authority Fact` | Gravity Admission sourceReality | Reality provenance | 不由 Route path 猜测 |
| Gravity cycle | `Authority Fact` | Gravity Admission | Gravity provenance | 不由页面重建 |
| Pressure provenance | `Authority Fact` | Gravity Admission | 候选来源一致性 | 不由 Pressure 文案代替 |
| `displayExperienceState.stage` | `Presentation Hint` | Dynamics Experience Adapter | 决定表现语言 | 不直接放行或扣留 |
| `currentHexagramFormation` | `Candidate` | Current Hexagram Formation Adapter | 形成候选输入 | 不证明 Observation 已认出 |
| `hexagramAssetCandidate` | `Compatibility Field` | Hexagram Asset Candidate Resolver | 兼容旧 Formation Snapshot | 不独立放行 Choice |
| `singleModelRevisionAction` | `Candidate` | Change Experience Runtime | 提供可执行行动候选 | 不代表 Choice 或行动事实 |
| Change Experience route | `Candidate` | Runtime Routing Service | 证明候选有正式消费路径 | 不成为 Growth Authority |
| migration impact | `Candidate` | Migration Impact Adapter | 完整 Formation Snapshot | 不代表真实变化已经发生 |
| Formation Source Snapshot | `Candidate` | 共享 prerequisite validator 输出 | 构造正式提交输入 | 不作为已提交资产 |
| `GrowthTerminalSummary` | `Read-only Authority Projection` | Canonical Growth Recovery Adapter | 决定 NONE / Resume / Terminal | 不创建或修改 Growth |
| choice mutation pending | `Presentation Operational State` | 当前提交周期 | 防止重复 UI 请求 | 不作为事务锁 |
| summary loading/error | `Presentation Operational State` | Route recovery owner | `SAFE_WITHHELD` | 不伪造 `NONE` |
| `innerViewRelation` | `Forbidden Authority` | Page 派生镜像 | 仅旧表现兼容 | 不参与新 Resolver |
| `completedSixDimensionCount` | `Compatibility Field` | Page-local legacy six-space progress | 只进入共享结构校验 | 不独立放行 |
| `transformationMomentActive` | `Presentation Hint` | Page local visual state | 后续视觉表现 | 不证明 Choice 已提交 |
| DOM / `data-*` | `Forbidden Authority` | Observation mirror only | 测试观测 | 不允许 Resolver 读取 |
| Motion / Reduced Motion | `Presentation Mode` | system preference | 表现方式 | 不改变语义状态 |

---

# 八、`AWARENESS` 正式裁决

当前代码中至少存在三种 `AWARENESS`：

```text
1. Dynamics Experience Stage：
页面展示阶段

2. isAwarenessYao：
Change Experience Route 的候选过滤条件

3. AWARENESS_NOT_ADVICE：
文案与产品边界
```

三者不得合并。

## 8.1 是否为必要产品阶段

裁决：

```text
NO — `stage === AWARENESS` 不是 Choice Presentation 的必要 Authority Fact。
```

必要事实是：

```text
Observation 已由用户明确认出
+
正式行动候选完整
```

不是枚举名字。

## 8.2 Awareness 过程中与已经认出

```text
Awareness 过程中：
Observation 可能仍为 AVAILABLE
→ WITHHELD

已经认出：
Observation = RECOGNIZED
→ 继续检查候选与 Growth Summary
```

## 8.3 ACTION 是否可合法恢复

可以，但只能：

- `READY_TO_PRESENT`：typed facts 全部成立；
- `RESUME_COMMITTED`：已有 Choice；
- `TERMINAL_BY_GROWTH`：已有更高资产。

`ACTION` 枚举本身不授权。

## 8.4 非 Awareness formation 当前失败根因

当前已复现根因：

```text
Revision Action 存在
但 route = null
且 migration impact = null
```

因此根因是：

```text
Candidate Contract 不完整
```

而不是：

```text
页面 Stage 名称不是 AWARENESS
```

未来如产品正式提供完整 typed route 与 migration impact，非 Awareness stage 可以进入 `READY_TO_PRESENT`。

该开放必须来自完整候选契约，不能通过放宽枚举判断完成。

## 8.5 CRYSTAL stage

当前 `DynamicsExperienceStage = CRYSTAL` 只表示旧六维运行完成。

它不等于：

- Crystal Eligibility；
- Formation Receipt；
- Crystal 已形成；
- `TERMINAL_BY_GROWTH`。

目标 Resolver 忽略该枚举的权威含义，仅将其作为 Presentation Hint。

---

# 九、Growth Terminal Summary

## 9.1 唯一 Owner

冻结：

```text
Canonical Source：
Xinmai Lived Growth IndexedDB Envelope

唯一只读 Adapter：
XinmaiChoiceGrowthTerminalSummaryAdapter

初始读取 Owner：
GravityProductionRouteEntry

跨标签更新：
Canonical Revision Observer 只通知重读

页面：
只消费 typed summary

Renderer：
零读取
```

Revision Observer：

- 只通知；
- 不携带权威资产；
- 不决定状态；
- 不替代重新读取 Canonical Envelope。

## 9.2 建议状态

```ts
type GrowthTerminalSummaryState =
  | "NONE"
  | "CHOICE_COMMITTED"
  | "LIVED_RESPONSE_RECORDED"
  | "ELIGIBILITY_AVAILABLE"
  | "CRYSTAL_FORMED"
  | "RECOVERY_UNAVAILABLE"
  | "RECOVERY_CORRUPTED";
```

## 9.3 必须携带的引用

成功摘要至少携带：

```text
canonicalRevision
identityReferences
sourceEncounterCycleId
gravityCycleId
gravityObservationReferenceId
choiceActionIntentionReferenceId
livedResponseReferenceId（如有）
crystalEligibilityReferenceId（如有）
formationReferenceId（如有）
crystalReferenceId（如有）
assetRevision / eligibilityRevision（如有）
```

失败摘要至少携带：

```text
state
reason
requested lineage
canonicalRevision = null
```

## 9.4 派生优先级

对同一 lineage：

```text
Formation Receipt
→ CRYSTAL_FORMED

Eligibility
→ ELIGIBILITY_AVAILABLE

Confirmed Lived Response Fact
→ LIVED_RESPONSE_RECORDED

Choice Action Intention
→ CHOICE_COMMITTED

均不存在
→ NONE
```

任一情况出现：

- identity mismatch；
- 同 lineage 多 Receipt；
- provenance 断裂；
- 无法唯一选择当前 Fact revision；
- Recovery corrupted；
- legacy conflict；

输出：

```text
RECOVERY_CORRUPTED
```

不得“选最新的一条”掩盖冲突。

## 9.5 Eligibility 细节

`ELIGIBILITY_AVAILABLE` 可以携带：

```text
WITHHELD
ELIGIBLE
FORMATION_PENDING
CONSUMED
INVALIDATED
```

但只要当前 lineage 已经产生正式 Eligibility 资产，就不得重新展示 Choice。

`INVALIDATED` 如仍是唯一历史资产，Adapter 必须结合当前 Fact 与 Choice 决定：

- 当前 Fact 仍存在：`LIVED_RESPONSE_RECORDED`；
- Fact 已撤回且 Choice 已关闭：终局恢复；
- 引用无法确认：`RECOVERY_CORRUPTED`。

不得简单回落 `NONE` 并重新开放 Choice。

## 9.6 Page 禁止边界

`GravityPage` 不得：

- 调用 `indexedDB.open`；
- 调用 `readXinmaiLivedGrowthCanonicalState`；
- 扫描 Envelope；
- 读取 localStorage V1；
- 订阅 Storage 后自行解析；
- 根据数组是否为空决定展示；
- 将 Summary 缓存为新的长期真源。

---

# 十、避免第二套校验规则

本 PREP 选择：

```text
方案 1：
共享纯函数式 prerequisite validator
```

不选择：

```text
Authority 生成可跨组件流转的 preflight proof
```

理由：

1. Preflight proof 在多标签和异步恢复下会迅速过期；
2. 若 proof 被 Page 当作提交票据，会形成准 Authority；
3. 当前提交事务已经具备最终校验，没必要新增持久化 proof；
4. 当前缺口主要是结构性候选完整性判断重复；
5. 纯函数可以被 Resolver 与 Authority 同源调用，但不改变状态。

## 10.1 共享 validator 的责任

建议职责：

```text
validateChoiceActionIntentionPrerequisites(input)
```

检查：

- identity references 非空；
- encounter / gravity / observation references 非空；
- checkpoint revision 合法；
- Observation snapshot 为 `RECOGNIZED`；
- action summary 非空；
- Current Formation 存在；
- Revision Action Candidate 存在；
- Change Experience route 存在；
- migration impact 存在；
- completedNodeCount 满足现有 Authority 兼容要求；
- asset completion state 满足现有 Authority 兼容要求；
- Formation Source Snapshot 可以完整构造；
- route dimension 与 snapshot primary dimension 一致。

输出：

```text
VALID
+
normalized Formation Source Snapshot
```

或：

```text
INVALID
+
typed reason
```

## 10.2 不属于共享 validator 的责任

以下必须继续只在事务内由 Authority 校验：

- canonical Observation 是否仍当前；
- checkpoint revision 是否已被其他事务推进；
- lifecycle 是否已经 `CONSUMED_BY_CHOICE`；
- 是否已存在 Choice；
- 是否已存在 Fact / Eligibility / Receipt；
- canonical identity / provenance 是否仍匹配；
- IDB transaction 是否完成；
- 并发写入是否胜出。

## 10.3 Resolver 使用方式

```text
Resolver
↓
调用纯 validator
↓
只决定 READY / WITHHELD
```

## 10.4 Authority 使用方式

```text
提交请求
↓
再次调用同一纯 validator
↓
进入 IndexedDB transaction
↓
重新校验 canonical invariants
↓
COMMIT / REJECT / SAFE_WITHHELD
```

## 10.5 明确禁止

- Resolver Decision 进入 Storage；
- Resolver Decision 拥有 token；
- Resolver Decision 被提交函数信任；
- Page 将 `READY_TO_PRESENT` 直接转换为 `COMMITTED`；
- Authority 删除事务内复验；
- validator 读取 Storage 或 Controller。

---

# 十一、Resolver 输入与输出契约

建议输入：

```ts
type ResolveChoicePresentationReadinessInput = Readonly<{
  admissionSnapshot: GravitySurfaceAdmissionAttempt | null;
  observationDecision: GravityObservationResumeDecision;
  experienceStage: DynamicsExperienceStage;
  formation: CurrentHexagramFormationResult | null;
  assetCandidate: HexagramAssetCandidate;
  changeExperience: DynamicsChangeExperienceRuntimeResult;
  growthTerminalSummary: GrowthTerminalSummary;
  operationalState: Readonly<{
    summaryPending: boolean;
    choiceMutationPending: boolean;
    recoveryFailure: string | null;
  }>;
}>;
```

建议输出：

```ts
type ChoicePresentationReadinessDecision =
  | {
      state: "READY_TO_PRESENT";
      actionCandidate: SingleModelRevisionAction;
      route: ChangeExperienceRuntimeRoute;
      migrationImpact: PersonaMigrationImpact;
      formationSourceSnapshot: ChoiceFormationSourceSnapshot;
      lineage: ChoicePresentationLineage;
      reason: "ALL_TYPED_PREREQUISITES_READY";
    }
  | {
      state: "WITHHELD";
      reason: ChoicePresentationWithheldReason;
      lineage: ChoicePresentationLineage | null;
    }
  | {
      state: "RESUME_COMMITTED";
      choiceActionIntention: ChoiceActionIntention;
      lineage: ChoicePresentationLineage;
      reason: "CANONICAL_CHOICE_EXISTS";
    }
  | {
      state: "TERMINAL_BY_GROWTH";
      target:
        | "LIVED_RESPONSE_RETURN"
        | "CRYSTAL_FORMATION"
        | "RETURNING_BODY_IMPRINT";
      growthReferenceId: string;
      lineage: ChoicePresentationLineage;
      reason: "HIGHER_GROWTH_ASSET_EXISTS";
    }
  | {
      state: "SAFE_WITHHELD";
      reason: ChoicePresentationSafeWithheldReason;
      lineage: ChoicePresentationLineage | null;
    };
```

禁止在输出中加入：

- `canCommitWithoutValidation`；
- `authorityAccepted`；
- `choiceCommitted`（除 canonical summary 已证明）；
- `crystalReady`（除 Eligibility 已存在）；
- 页面计时器；
- DOM node；
- Renderer state。

---

# 十二、消费者切换清单

| 消费者 | 当前状态 | 目标动作 | 目标消费 |
|---|---|---|---|
| `GravityPage.isRevisionActionPending` | 页面布尔拼接真源 | `DELETE` | 被 typed decision 完整替换 |
| `SingleModelRevisionActionFocus` | 由旧布尔显示 | `MIGRATE` | 仅消费 `READY_TO_PRESENT` |
| `TransformationMomentFocus` | 页面 local state 驱动 | `MIGRATE` | 仅消费 `RESUME_COMMITTED` 或正式 commit outcome |
| Choice 提交 handler | 有额外前提但与展示漂移 | `ADAPT` | 使用共享 validator 构造输入，Controller 最终复验 |
| Choice mutation feedback | 通用失败反馈 | `ADAPT` | stale 后触发 Summary 重读，不伪造成功 |
| 页面 Footer | 读取旧 candidate / stage | `ADAPT` | 只读 Decision 的非权威 presentation hint |
| `data-model-revision-action` | 旧布尔镜像 | `ADAPT` | 只镜像 typed decision，不供 Runtime 读取 |
| Observation Continuity | 正式 Authority | `KEEP` | 继续产生 Resume Decision |
| Gravity Encounter Recovery Adapter | 唯一观察恢复入口 | `KEEP` | 不承担 Growth Summary |
| Growth Canonical Store | 正式 Authority | `KEEP` | 唯一 Growth 数据源 |
| Growth Terminal Summary Adapter | 当前缺失 | `ADD` | 唯一 read-only lineage summary |
| Canonical Revision Observer | 已存在 | `KEEP` | 只通知 Route 重读 |
| `GravityProductionRouteEntry` | 已拥有 typed recovery assembly | `ADAPT` | 成为 Summary 初始读取与重读 owner |
| `GravityProductionSurfaceHost` | typed prop host | `ADAPT` | 传递 Summary / Decision，不读 Storage |
| Current Hexagram Formation | 候选生产者 | `KEEP` | 候选输入 |
| Hexagram Asset Candidate | 旧兼容完成度 | `ISOLATE` | 只进入 shared validator |
| Change Experience Runtime | 候选路由与 impact | `KEEP` | typed candidate 输入 |
| Revision Action Candidate | 候选 | `KEEP` | 不是 Choice Fact |
| `innerViewRelation` | Page mirror | `DELETE FROM READINESS` | 只保留必要展示兼容 |
| `completedSixDimensionCount` | 旧页面进度 | `ISOLATE` | 只作为现有结构校验输入 |
| `transformationMomentActive` | 视觉状态 | `DELETE FROM READINESS` | 后续仅由 typed decision 派生 |
| Reality continuation | 正式 committed Choice consumer | `KEEP` | 只消费已提交 Choice |
| Renderer | 非法资格消费者 | `REJECT` | 零 Choice readiness 输入 |
| Motion / Reduced Motion | 展示模式 | `ADAPT` | 同一 Decision，不同表现 |
| Acceptance / Harness | 辅助验证 | `ADAPT` | 不替代生产路径 |
| Gate | 当前缺专属门禁 | `ADD / REGISTER` | 保护 typed contract 与无假入口 |

---

# 十三、Route、Host、Page 责任

## 13.1 Route

`GravityProductionRouteEntry`：

- 继续拥有生产 Route assembly；
- 继续通过 typed Adapter 恢复 Observation；
- 新增通过唯一 Adapter 读取 Growth Terminal Summary；
- 用 route epoch / lineage key 拒绝旧异步结果；
- 订阅 canonical revision notification 后重新读取；
- Summary 读取期间不开放 Choice；
- 不直接读取 IndexedDB；
- 不提交 Choice；
- 不提交 ACTIVE Growth 状态。

## 13.2 Surface Host

`GravityProductionSurfaceHost`：

- 接收 Route 已组装的 typed Summary；
- 将 Summary 传给 Page；
- 不读取 Storage；
- 不解析 Growth Envelope；
- 不决定 Choice 是否形成；
- 不修改既有 Gravity minimum surface outcome。

## 13.3 Page

`GravityPage`：

- 组装纯候选输入；
- 调用纯 Resolver；
- 只根据五态决定呈现；
- 点击时仍调用正式 Choice Controller；
- Authority 结果失败时不显示已提交；
- Authority 成功后使用 typed outcome，并等待 canonical summary 对齐；
- 不直接读取 Storage；
- 不自行拼接新的资格布尔值；
- 不向 Renderer 发送 Choice 权威状态。

---

# 十四、Refresh、Back/Forward 与多标签

## 14.1 Refresh

```text
Route 恢复 Admission
↓
恢复 Observation Resume Decision
+
读取 Growth Terminal Summary
↓
Resolver
```

预期：

| Canonical fact | 恢复结果 |
|---|---|
| Observation 未认出 | `WITHHELD` |
| Observation 已认出、候选完整 | `READY_TO_PRESENT` |
| Choice 已提交 | `RESUME_COMMITTED` |
| Fact / Eligibility 已存在 | `TERMINAL_BY_GROWTH` |
| Receipt / Crystal 已存在 | `TERMINAL_BY_GROWTH` → Body Imprint |
| Recovery 不可用 | `SAFE_WITHHELD` |

刷新不得：

- 新建 Observation；
- 新建 Choice；
- 退回旧六维步骤作为资格；
- 使用 Stage 名称重开入口。

## 14.2 Back / Forward

每次 Route 再次成为 active：

- 使用当前 Route ticket 与 Admission；
- 重新读取 Summary；
- 比较 lineage；
- 丢弃旧 route epoch 的结果；
- 不使用 browser history state 作为 Choice Authority。

## 14.3 多标签

```text
标签 A：READY_TO_PRESENT
标签 B：READY_TO_PRESENT
↓
标签 A 先提交
↓
canonical revision notification
↓
标签 B 重读 → RESUME_COMMITTED
```

若标签 B 在收到通知前点击：

```text
Authority 事务复验
↓
CHOICE_ALREADY_EXISTS / stale
↓
标签 B 不显示失败成功
↓
重读 Summary
↓
RESUME_COMMITTED
```

Presentation Resolver 不是并发锁。

## 14.4 旧标签

旧标签的：

- `READY_TO_PRESENT`；
- Formation Snapshot；
- Stage；
- action candidate；

均只是旧快照。

旧标签不能覆盖：

- 新 Choice；
- Fact；
- Eligibility；
- Receipt；
- Crystal。

---

# 十五、失败矩阵

| 场景 | Resolver 输出 | 页面行为 | Authority / 数据 |
|---|---|---|---|
| Observation 未认出 | `WITHHELD` | 继续观察 | 不写 |
| route 缺失 | `WITHHELD` | 不显示 Choice | 不写 |
| migration impact 缺失 | `WITHHELD` | 不显示 Choice | 不写 |
| Formation 缺失 | `WITHHELD` | 不显示 Choice | 不写 |
| Action Candidate 缺失 | `WITHHELD` | 不显示 Choice | 不写 |
| 仅六维完成 | `WITHHELD` | 不把完成当奖励 | 不写 |
| Summary loading | `SAFE_WITHHELD` | 不闪现入口 | 不写 |
| IDB unavailable | `SAFE_WITHHELD` | 克制失败，可重试 | 保持只读失败 |
| Recovery corrupted | `SAFE_WITHHELD` | 不猜测恢复 | 不写 |
| identity mismatch | `SAFE_WITHHELD` | 回到安全生命空间 | 不串资产 |
| provenance mismatch | `SAFE_WITHHELD` | 不展示 | 不写 |
| stale lineage | `SAFE_WITHHELD` | 重读当前 lineage | 不写 |
| 已有 Choice | `RESUME_COMMITTED` | 真实生活等待态 | 不生成第二 Choice |
| 已有 Fact | `TERMINAL_BY_GROWTH` | 回访/确认链 | 不重开 Choice |
| 已有 Eligibility | `TERMINAL_BY_GROWTH` | 形成准备 | 不重开 Choice |
| 已有 Receipt | `TERMINAL_BY_GROWTH` | Body Imprint | 不重复 Formation |
| 点击后 Authority stale reject | 重读后 Resume/Terminal/Withheld | 不显示成功 | Authority 不变 |
| Authority SAFE_WITHHELD | `SAFE_WITHHELD` | 可重试、不伪成功 | 不写 |
| Route 快速切换 | 旧结果丢弃 | 不闪现入口 | 无旧结果提交 |
| Summary 与 Observation 冲突 | `SAFE_WITHHELD` | 不猜测 | 保留 canonical assets |

---

# 十六、Motion / Reduced Motion 语义矩阵

Motion 与 Reduced Motion 必须消费同一个：

```text
ChoicePresentationReadinessDecision
```

| Decision | Motion | Reduced Motion | 业务差异 |
|---|---|---|---|
| `READY_TO_PRESENT` | 可进入后续 Choice 聚焦动效 | 静态空间重排与清晰 Focus | `0` |
| `WITHHELD` | 保持 Observation 流动 | 保持静态 Observation 层级 | `0` |
| `RESUME_COMMITTED` | Choice seed 收存后的稳定状态 | 静态 Choice seed / 等待态 | `0` |
| `TERMINAL_BY_GROWTH` | 进入对应回访/形成/留痕呈现 | 进入同一目标的静态结构变化 | `0` |
| `SAFE_WITHHELD` | 克制失败反馈，无成功动效 | 同一失败语义 | `0` |

禁止：

- Motion 动画结束放行 Choice；
- Reduced Motion 因缺动画提前显示；
- Renderer outcome 决定 Growth readiness；
- Reduced Motion 使用另一套业务布尔值。

---

# 十七、Gate 注册

未来 Runtime 提交必须新增并注册：

## 17.1 Presentation Readiness Input Gate

保护：

- Resolver 只接受 typed input；
- Page 不传 DOM / Storage / Renderer 状态；
- input 分类与本 PREP 一致。

## 17.2 Growth Terminal Summary Authority Gate

保护：

- Summary 只有一个 Adapter；
- Adapter 只读 canonical Growth；
- Page / Renderer 直接读取为零；
- canonical revision observer 只通知重读。

## 17.3 Presentation / Commit Prerequisite Alignment Gate

保护：

```text
READY_TO_PRESENT
→
共享结构 validator 必须通过
```

同时保护：

```text
Authority 仍在事务内复验
```

## 17.4 Non-Awareness False Entry Forbidden Gate

保护：

```text
非 Awareness 候选
+
route = null 或 migrationImpact = null
→
WITHHELD
```

它不冻结：

```text
所有非 Awareness 永久禁止
```

## 17.5 Higher Growth Asset Re-entry Forbidden Gate

保护：

- Choice → `RESUME_COMMITTED`；
- Fact / Eligibility / Receipt → `TERMINAL_BY_GROWTH`；
- 不重新显示 Choice。

## 17.6 Page Boolean Authority Forbidden Gate

保护：

- `isRevisionActionPending` 旧拼接删除；
- `innerViewRelation` 不参与资格；
- `transformationMomentActive` 不参与资格；
- Stage / six-dimension count 不独立放行。

## 17.7 Motion / Reduced Motion Semantic Parity Gate

保护：

- 同一 Decision；
- 相同可见资格；
- 相同失败与恢复语义。

## 17.8 Stale Lineage Safe-Withheld Gate

保护：

- 旧 route epoch；
- 旧 observation reference；
- 旧 checkpoint revision；
- 旧 canonical revision；
- 旧标签晚到结果；

均不能显示或提交为当前 Choice。

## 17.9 Gate 命令注册

必须在 `package.json` 注册正式入口：

```text
check:xinmai-gravity-choice-presentation-readiness
```

该入口至少组合：

- Resolver unit gate；
- Summary authority gate；
- Presentation / Authority alignment gate；
- browser contract gate。

当前缺失的 Choice Boundary npm alias：

```text
GREEN / Gate Registration Correction
```

在未来 Resolver 单提交中一并完成注册。

它不改变 Runtime 语义。

---

# 十八、真实浏览器验收矩阵

未来 Major Blade 关闭必须使用正式：

```text
/reality
→
/dynamics
→
正式 Returning / Launch
```

Acceptance / Harness 只能辅助。

| 场景 | 预期 Decision | 可见结果 | 提交预期 |
|---|---|---|---|
| Observation 未认出 | `WITHHELD` | 无 Choice | 不可提交 |
| Observation 已认出、候选完整 | `READY_TO_PRESENT` | Choice 可见 | Authority 接受或因真实并发拒绝 |
| Pressure stage 但未认出 | `WITHHELD` | 继续观察 | 不可提交 |
| Awareness stage 但未认出 | `WITHHELD` | 不提前展示 | 不可提交 |
| Action stage + typed facts 完整 | `READY_TO_PRESENT` | 可见 | 可进入正式事务 |
| Transformation stage + 无 Choice | 由 typed facts 决定 | 不凭 stage 猜测 | 事务复验 |
| Crystal stage + 无 Growth asset | 不凭 stage terminal | 由 typed facts 决定 | 不倒推资格 |
| 非 Awareness 四爻、route 为空 | `WITHHELD` | 假入口为零 | 不触发失败 |
| Formation 缺失 | `WITHHELD` | 无入口 | 不可提交 |
| Formation 不完整 | `WITHHELD` | 无入口 | 不可提交 |
| Revision Action 缺失 | `WITHHELD` | 无入口 | 不可提交 |
| 已有 Choice | `RESUME_COMMITTED` | 真实生活等待态 | 不重复提交 |
| 已有 Fact | `TERMINAL_BY_GROWTH` | 回访/确认 | 不重开 Choice |
| 已有 Eligibility | `TERMINAL_BY_GROWTH` | 形成准备 | 不重开 Choice |
| 已有 Receipt | `TERMINAL_BY_GROWTH` | Body Imprint | 不重复 Formation |
| Refresh | 与刷新前稳定事实一致 | 不闪现假入口 | 不生成新资产 |
| Back / Forward | 当前 canonical 决定 | 不恢复旧 Ready | 不重复提交 |
| Reduced Motion | 与 Motion 同 Decision | 静态语义完整 | 业务结果一致 |
| stale lineage | `SAFE_WITHHELD` | 无可点入口 | 当前 Authority 不变 |
| Summary unavailable | `SAFE_WITHHELD` | 克制失败 | 不写 |
| 多标签另一页已提交 | `RESUME_COMMITTED` | 当前页收束 | 第二提交被拒绝 |
| Page 显示 Ready 后发生并发 | 重读后转换 | 不伪造成功 | Authority 最终决定 |

核心关闭门禁：

```text
READY_TO_PRESENT
→
同一快照下共享 structural prerequisite validator = VALID

WITHHELD / SAFE_WITHHELD
→
可点击 Choice = 0

已有更高 Growth 资产
→
Choice re-entry = 0
```

---

# 十九、对 Visual Experience MAP 的正式输入

未来视觉层只允许消费：

```text
ChoicePresentationReadinessDecision
```

允许映射：

| Decision | Visual Experience 输入 |
|---|---|
| `READY_TO_PRESENT` | Choice 聚焦准备态 |
| `WITHHELD` | Gravity Observation 延续态 |
| `RESUME_COMMITTED` | Choice seed 已收存 / 真实生活等待态 |
| `TERMINAL_BY_GROWTH` | 回访、形成或 Body Imprint 目标态 |
| `SAFE_WITHHELD` | 安全静默或可重试态 |

视觉不得读取：

- `isRevisionActionPending`；
- `innerViewRelation`；
- `completedSixDimensionCount`；
- `READY_TO_CRYSTALLIZE`；
- DOM `data-*`；
- IndexedDB；
- Growth Envelope；
- Controller 内部状态。

视觉不得生产：

- READY；
- Choice；
- Fact；
- Eligibility；
- Receipt；
- Crystal。

本 PREP 完成后，Visual Runtime 仍然保持 `DEFER`。

必须先完成 Resolver Runtime 并关闭 Presentation / Authority Alignment。

---

# 二十、未来单提交文件边界

建议唯一原子提交：

```text
新增 typed Resolver
+
新增 Growth Terminal Summary Adapter
+
新增共享 prerequisite validator
+
Route 接入 Summary 读取与 revision 重读
+
Host 传递 typed input
+
Page 切换全部 Presentation Consumers
+
删除旧 isRevisionActionPending 拼接真源
+
Controller 复用共享 structural validator
+
建立并注册专属 Gates
```

候选文件：

```text
ADD
src/types/xinmaiChoicePresentationReadiness.ts

ADD
src/services/xinmaiChoiceActionIntentionPrerequisiteValidator.ts

ADD
src/services/xinmaiChoiceGrowthTerminalSummaryAdapter.ts

ADD
src/services/xinmaiChoicePresentationReadinessResolver.ts

ADAPT
src/types/index.ts

ADAPT
src/pages/GravityProductionRouteEntry.tsx

ADAPT
src/components/GravityProductionSurfaceHost.tsx

ADAPT
src/pages/GravityPage.tsx

ADAPT
src/services/xinmaiChoiceActionIntentionController.ts

ADD
scripts/check-xinmai-gravity-choice-presentation-readiness*.mjs

ADAPT
package.json
```

原则上不修改：

- IndexedDB schema；
- Lived Growth Transaction Authority；
- Gravity Observation schema；
- Choice schema；
- Renderer；
- Reality / Pressure；
- Life Whisper；
- Relationship Naming；
- Eligibility；
- Formation；
- Crystal；
- Phase 4。

若实施中必须修改这些范围：

```text
完成已授权刀
↓
刀后交通灯分流
```

不得顺带扩张。

---

# 二十一、单提交与原子边界

未来 Runtime 必须在同一提交完成：

```text
Resolver 建立
+
Summary Adapter 建立
+
全部 Page Presentation Consumers 切换
+
旧布尔展示真源删除
+
shared validator 双端接入
+
新 Gate 注册
```

禁止中间态：

```text
新 Resolver
+
旧 isRevisionActionPending 仍可显示
```

也禁止：

```text
旧入口已删除
+
Summary 尚未接入
↓
所有返回用户都错误 WITHHELD
```

Choice Authority 本身不迁移。

因此未来刀型是：

```text
Major Blade
```

不是：

```text
Migration Blade
```

理由：

- 不替换 Growth Authority；
- 不替换 Storage；
- 不切换 Route 真源；
- 不改变 Choice transaction；
- 只建立并切换 Presentation 消费。

---

# 二十二、Safe Withheld 回滚

普通 `git revert` 可能恢复旧假入口，因此不作为安全回滚方案。

未来 Runtime 推送前必须准备 forward counter-commit：

```text
新 Choice Presentation：
全部 WITHHELD / SAFE_WITHHELD

已提交 Choice：
继续可恢复为 RESUME_COMMITTED

已有 Fact / Eligibility / Receipt：
继续可恢复为 TERMINAL_BY_GROWTH

Canonical Growth Recovery：
保持只读可用

Choice Authority：
保持不变

旧 isRevisionActionPending：
不得复活
```

触发条件：

- Resolver 显示条件与 Authority 大面积不一致；
- Summary 串 lineage；
- Growth terminal asset 被错误映射为 `NONE`；
- 多标签重新显示 Choice；
- Recovery unavailable 时仍出现入口；
- Reduced Motion 使用另一套语义；
- Page 或 Renderer 开始直接读取 Storage；
- 旧布尔真源仍有生产消费者。

回滚不：

- 删除既有 Choice；
- 删除 Fact / Eligibility / Receipt / Crystal；
- 修改 Observation；
- 恢复旧页面权威；
- 修改 Phase 4。

---

# 二十三、Definition of Done

未来 Major Blade 只有全部满足才关闭：

- 五态 Resolver 唯一；
- Resolver 完全纯、只读；
- Growth Terminal Summary Adapter 唯一；
- Page 直接 Storage read 为零；
- Renderer Growth read 为零；
- `isRevisionActionPending` 旧拼接真源删除；
- Presentation Ready 与 shared prerequisite validator 对齐；
- Authority 保留事务内最终复验；
- route / migration impact 缺失时假入口为零；
- 已有 Choice 时新入口为零；
- 已有 Fact / Eligibility / Receipt 时新入口为零；
- stale lineage 安全扣留；
- Refresh / Back / Forward 恢复一致；
- 多标签无重复入口；
- Motion / Reduced Motion 语义一致；
- 新 Gate 全部注册到正式 npm 命令；
- TypeScript 通过；
- Production Build 通过；
- 全部相关 XINMAI Gates 通过；
- 正式浏览器矩阵通过；
- 远程干净快照可独立复现；
- 单提交可独立审查；
- forward Safe Withheld counter-commit 可预演。

完成体验句：

> 只有当这一步真的可以被生命系统接住时，用户才会看见它。

---

# 二十四、刀后交通灯扫描

## 24.1 绿色

```text
Choice Boundary npm alias 缺失
```

分类：

```text
GREEN / Gate Registration Correction
```

处理：

纳入未来 Resolver Runtime 同一 Gate 注册边界。

不单独改变产品语义。

## 24.2 黄色

```text
Growth Terminal Summary 当前缺失
+
多个 Presentation Consumers 需要切换
```

分类：

```text
YELLOW / Major Blade
```

已由本 PREP 完成设计冻结。

## 24.3 独立黄色

```text
mother-code-profile
```

状态：

```text
YELLOW / BASELINE MAP
```

未纳入本刀。

## 24.4 红色

未发现：

- Presentation 反向推进 Authority；
- 第二套 Choice transaction；
- 第二套 Growth Storage；
- Route 自主提交 Choice；
- Renderer 决定 Choice readiness。

因此：

```text
RED：
NO
```

---

# 二十五、下一刀建议

```text
XINMAI-GRAVITY-CHOICE-PRESENTATION-
READINESS-RESOLVER-MAJOR-BLADE-P0

交通灯：
YELLOW

刀型：
Major Blade

决策：
NOW — 等 Product Control Tower 单独授权

Runtime：
待授权

Growth Authority：
保持不变

视觉：
DEFER
```

该刀唯一目标：

> 用五态 typed Resolver 原子替换 `GravityPage` 的分散可见性布尔拼接，关闭假 Choice 入口。

达到即停止。

不得进入：

- Choice 视觉高光；
- 真实生活离场视觉；
- Crystal 归因视觉；
- Body Imprint；
- Renderer 改造；
- Phase 4。

---

# 二十六、最终状态

```text
Choice Presentation Readiness MAP：
CLOSED

Choice Presentation Resolver PREP：
CLOSED / PASS

Resolver Runtime：
NOT ESTABLISHED

Choice Authority：
CLOSED / UNCHANGED

Gravity Observation Lineage：
STABLE / UNCHANGED

Visual Runtime：
DEFER

Phase 3：
ACTIVE / NOT PASSED

Phase 4：
LOCKED

最终裁决：
NOW — MAJOR BLADE APPLICATION READY
```
