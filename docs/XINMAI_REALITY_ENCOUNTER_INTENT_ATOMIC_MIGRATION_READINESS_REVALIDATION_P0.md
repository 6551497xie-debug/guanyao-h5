# XINMAI REALITY ENCOUNTER INTENT ATOMIC MIGRATION READINESS REVALIDATION P0

项目：

`/Users/xieyanjun/Desktop/guanyao-h5`

模式：

Reality Encounter Intent 原子迁移实施就绪复验。

性质：

MAP / Product Control Tower。

本刀：

- 只读审查；
- 复验既有 PREP；
- 校准实施文件边界；
- 判断 Runtime 是否具备单独申请 `NOW — ATOMIC MIGRATION` 的条件；
- 不修改 Runtime；
- 不新增类型；
- 不新增 Controller；
- 不新增 Recovery Adapter；
- 不改变 Route、Host 或生产入口。

---

## 一、Construction State Card

```text
当前 Phase：
Phase 2 CLOSED

Phase 3：
LOCKED

RealityEncounterIntent Product Authority：
ACCEPTED

RealityEncounterIntent Runtime Authority：
NOT ESTABLISHED

本刀类型：
MAP / Readiness Revalidation

主 Layer：
Layer 3 → Layer 4 Entry Boundary

保护 Layer：
Layer 1 World
Layer 2 Identity
Layer 3 Relationship

既有 PREP：
XINMAI_REALITY_ENCOUNTER_INTENT_AUTHORITY_MAJOR_BLADE_PREP_P0

本刀消费者：
Product Control Tower

Runtime 修改：
NO

决策：
NOW — MAP ONLY
```

---

## 二、本刀唯一目标

在以下门禁漂移已经独立关闭后：

```text
Choice Consumer Gate
↓
Choice Host Gate
↓
V2 Host Ready State Gate
↓
V2 Gravity Handoff Boundary Gate
```

重新判断：

```text
RealityEncounterIntent
是否已经具备
单提交、单真源、可回滚
的 Atomic Migration 实施条件
```

本刀不实施迁移。

---

## 三、最终裁决

正式冻结：

```text
Technical Readiness：
PASS

Architecture Readiness：
PASS WITH ATOMIC SCOPE UPDATE

Gate Readiness：
PASS

Single-authority Feasibility：
PASS

Single-commit Feasibility：
PASS

Rollback Feasibility：
PASS

Product Control Runtime Authorization：
NOT GRANTED BY THIS MAP

Current Runtime Decision：
DEFER

Next Runtime Application Status：
READY TO REQUEST

Required Knife：
ATOMIC MIGRATION
```

结论：

> `RealityEncounterIntent` 已满足技术与架构申请条件，但本 MAP 不自动授权 Runtime。下一刀可以提交 `NOW — STRICT ATOMIC SCOPE` 申请；在该授权到达前，Phase 3 继续锁定。

---

## 四、复验基线

本次复验基线：

```text
Remote Branch：
codex/genesis-28-mansion-production-continuity

Baseline Commit：
cf24a9ca5eb69360d31523b0d71ac159ee374831
```

隔离工作树：

```text
/private/tmp/xinmai-relationship-naming-map-p0
```

主工作树既存修改：

```text
PROTECTED / UNTOUCHED
```

---

## 五、PREP 后已关闭的前置漂移

### 5.1 Choice Consumer Gate

已冻结：

```text
RealityProductionChoiceConsumer
=
VALID DORMANT DOMAIN ASSET
```

当前：

```text
RealityProductionHost
不初始化
不推进
不呈现
正式 Choice Consumer
```

门禁：

```text
PASS
```

### 5.2 Choice Host Gate

已冻结：

```text
RealityProductionHost
=
V2 Pressure Seed Host
```

Choice 在当前 Host 中只作为：

```text
presentation / body rhythm continuity
```

门禁：

```text
PASS
```

### 5.3 V2 Host Ready State

已校准：

```text
GRAVITY_READY_TO_CONTINUE
```

旧：

```text
GRAVITY_READY_HOLD
```

已退出门禁。

### 5.4 V2 Gravity Handoff Boundary

已校准：

```text
explicitGravityContinuationCallbackOnly
```

旧：

```text
gravityReadinessHoldOnly
```

已退出门禁。

### 5.5 Atomic Host Cutover

当前：

```text
check-reality-pressure-v2-atomic-host-cutover.mjs
PASS
```

因此 PREP 条件：

```text
Choice consumer gate drift 已独立校准
```

正式满足。

---

## 六、十三项 Runtime 申请条件复验

|编号|申请条件|复验结果|证据 / 约束|
|-|-|-|-|
|1|PREP 已提交为远程基线|PASS|PREP 文档已在目标分支|
|2|Choice consumer gate 已校准|PASS|Choice Consumer / Host 两门禁通过|
|3|Controller 类型契约无歧义|PASS|Intent、State、Event、Failure、Admission、Host Outcome 已冻结|
|4|状态机与非法转换冻结|PASS|七态、转换表、拒绝路径已冻结|
|5|Host minimum surface 冻结|PASS|授权、Activation、Host Input、Continuation、Consumer、实际 Surface 全部成立|
|6|Recovery Adapter 唯一边界冻结|PASS|新 Intent sessionStorage 仅 Adapter 读写|
|7|Route 零 Intent-storage 可实现|PASS WITH REQUIRED ADAPTER|Route 当前身份恢复读取必须移出；需要 Identity Recovery Adapter|
|8|identity-only 删除清单完整|PASS|Route fallback、Authorization 隐式读取、固定 mount cycle 均已定位|
|9|三类 producer 可同提交接入|PASS|Genesis、Returning、Choice 均已有用户明确动作与资格事实|
|10|单提交文件边界可控|PASS WITH APP BOUNDARY ADDED|Route Chunk 失败要求 `App.tsx` 纳入|
|11|全量门禁可在干净快照执行|PASS|现有 XINMAI、Route、Choice、V2 Host、Build 均可执行|
|12|回滚单位为一个 commit|PASS|新真源、消费者切换与旧真源删除可共同回滚|
|13|Product Control Tower 单独授权|NOT YET|本 MAP 只给出申请资格，不自动授权 Runtime|

复验总计：

```text
技术 / 架构条件：
12 / 12 PASS

执行授权：
0 / 1
```

因此：

```text
READY TO REQUEST
≠
RUNTIME NOW
```

---

## 七、当前 Runtime 真相

当前不存在：

```text
RealityEncounterIntent type
RealityEncounterIntent Controller
RealityEncounterIntent Recovery Adapter
encounterCycleId
Intent Admission
Host Acceptance Outcome
ACTIVE_IN_REALITY authority
```

当前仍是：

```text
身份 / 关系资格
↓
页面直接建立 Entry Context
↓
页面直接 navigate(/reality)
↓
Route 自行恢复身份
↓
Authorization 读取 module-global Entry Context
↓
Host 呈现
```

所以：

```text
Product Authority：
已接受

Runtime Authority：
未建立
```

不得把 PREP 或本复验文档描述成 Runtime 已完成。

---

## 八、三类生产入口复验

### 8.1 Genesis Producer

当前已有权威事实：

```text
Genesis Completion
Recognition confirmed
同一 StarBeast visual response settled
Life Whisper relationship fact
WHISPER_SUBMITTED / WHISPER_SKIPPED
SETTLED / SKIPPED / UNAVAILABLE
Explicit unavailable continuation
用户点击 ENTER_REALITY
三项身份可从 visual continuity 派生
```

当前行为：

```text
advanceGenesisProductionRecognitionRealityEntry
↓
activateGenesisProductionRealityEntryContext
↓
activateRealityRouteActivationSourceContext
↓
560ms visual hold
↓
navigate(/reality)
```

问题：

- Page 自己把 Reality Entry 变成 eligible；
- Entry Context 同时承担身份与入口许可；
- 页面计时结束后直接导航；
- 没有 Intent；
- 没有 cycle；
- 没有同周期失败；
- 没有 Host commit。

原子迁移要求：

```text
Life Whisper qualification
+
用户 ENTER_REALITY
+
三项身份引用
↓
Controller.requestEncounter()
↓
READY Intent
↓
可选视觉 hold
↓
navigate(intentReferenceId)
```

560ms hold 可以继续作为：

```text
视觉节奏
```

但不得成为：

```text
进入成功
ACTIVE commit
```

结论：

```text
Genesis Producer：
READY FOR ADAPTER
```

### 8.2 Returning Producer

当前已有权威事实：

```text
returningVisualReady
同一 sourceReferenceId
当前 returning whisper cycle
WHISPER_SUBMITTED / WHISPER_SKIPPED
Motion / Static Visual Outcome
SETTLED / SKIPPED / UNAVAILABLE
Explicit continue without confirmed response
可选关系名恢复
历史 Reality memory-only
历史 Crystal body-imprint
用户点击 RETURNING_REALITY_INTENT
```

当前行为：

```text
returningLifeWhisperRealityIntentReady
↓
enterReturningNewReality()
↓
navigate(/reality, replace)
```

问题：

- “Intent Ready” 当前只是 boolean；
- Page 直接导航；
- 没有 encounter cycle；
- 返回路径与 Genesis 仍依赖 Route identity fallback；
- 历史 memory 与当前入口在 route state 中混合传递，但尚未成为 typed presentation-only contract。

原子迁移要求：

```text
Current Returning Qualification
+
同一三项身份
+
RETURNING_REALITY_INTENT
↓
Controller.requestEncounter()
↓
origin = RETURNING_LIFE_WORLD
```

历史资产继续只作为：

```text
visual memory
```

不得成为资格。

结论：

```text
Returning Producer：
READY FOR ADAPTER
```

### 8.3 Choice Continuation Producer

当前已有事实：

```text
用户产生 embodied Choice
choice response trace
用户明确请求继续进入 Reality
同一 visual continuity
choiceContinuation = AWAITING_LIVED_RESPONSE_RECOGNITION
```

当前行为：

```text
handleChoiceContinueToReality()
↓
navigate(/reality)
```

问题：

- Choice 自己导航；
- `choiceContinuation` 同时像展示状态与入口信号；
- 没有确认上一 Entry Intent 已正式终结；
- 没有新 cycle；
- 没有 Intent qualification。

原子迁移要求：

```text
上一 Reality Entry Intent
在 Reality → Dynamics 正式 handoff 时 TERMINAL
↓
Choice 用户明确继续
↓
LIVED_RESPONSE_CONTINUATION qualification
↓
Controller 创建新的 cycle
```

`choiceContinuation` 继续只作：

```text
presentation continuity
```

不得成为 Route Authority。

结论：

```text
Choice Producer：
READY FOR ADAPTER
```

---

## 九、三项身份引用复验

Intent 必须绑定：

```text
sourceReferenceId
starBeastIdentityReferenceId
mansionCoordinateReferenceId
```

当前这三项不是新模型。

现有 `sessionService` 已从权威 visual continuity 中安全派生：

```text
sourceReferenceId

personalRevealProjection.identityReferenceId
→ starBeastIdentityReferenceId

twentyEightMansionCoordinateProjection
.birthMansion.coordinateReferenceId
→ mansionCoordinateReferenceId
```

同一组合已被：

```text
StarBeast Relationship Naming Asset
```

用于身份一致性校验。

因此：

```text
无需新增身份
无需重新计算二十八宿
无需修改 StarBeast Identity
无需消费关系名
```

### 9.1 当前限制

身份引用解析目前位于 `sessionService` 私有函数：

```text
resolveRecognizedRelationshipIdentityReferences
```

它同时可能读取现有持久化资产。

Route 不能继续自行读取这些资产。

### 9.2 必需适配

未来 Atomic Migration 必须纳入：

```text
src/services/realityRecognizedIdentityRecoveryAdapter.ts
```

它只允许：

- 读取已有生命来源、visual continuity 与 recognized presence；
- 输出 typed identity recovery result；
- 校验三项身份引用；
- 不生成身份；
- 不重算二十八宿；
- 不读取 Intent sessionStorage；
- 不成为 Intent Authority。

该 Adapter：

```text
REQUIRED
```

不再是“可能需要”。

---

## 十、Route 当前权威问题复验

当前 `RealityProductionRouteEntry` 在 mount 时：

```text
clearRealityRouteActivationSourceContext()
↓
entryCycle = NEW_REALITY_ENCOUNTER
↓
读取 route state
↓
读取持久化 visual continuity
↓
读取持久化 life source
↓
读取 persisted presence
↓
restoredIdentityReady
↓
restoreGenesisProductionRealityEntryContext()
↓
capture request date
↓
activate source context
↓
authorize route
```

这证明 PREP 所述：

```text
identity-only success path
真实存在
```

### 10.1 必须删除

未来原子提交必须删除或降权：

- 固定 `"NEW_REALITY_ENCOUNTER"` mount key；
- `restoredIdentityReady → restoreGenesis... → authorization`；
- Route 自行把身份恢复解释为当前意愿；
- `returningEntry` 作为入口资格；
- `choiceContinuation` 作为入口资格；
- 无 Intent 时的直接 URL 成功；
- Route 自行创建 current request date 作为入口意愿替代。

### 10.2 必须保留

- visual continuity 展示；
- returning memory 展示；
- Choice body trace 展示；
- source reference 校验；
- V2 candidate pipeline；
- Pressure Seed Continuation；
- Reality → Gravity 正式 handoff。

### 10.3 Route 目标输入

冻结：

```text
intentReferenceId
+
Controller Admission
+
Typed Recognized Identity Result
+
presentation-only route state
```

Route 不得拥有：

```text
cycle generation
Intent recovery
Storage authority
ACTIVE commit
```

---

## 十一、Authorization 与 Activation Source 复验

### 11.1 Authorization

当前：

```text
authorizeRealityProductionRoute()
内部调用
readGenesisProductionRealityEntryContext()
```

这使 Authorization 存在隐式 module-global 真源。

未来必须改为显式输入：

```text
authorizeRealityProductionRoute({
  routeTarget,
  identityEntryContext,
  encounterAdmission
})
```

输出必须携带：

```text
intentReferenceId
encounterCycleId
intentRevision
sourceReferenceId
```

### 11.2 Activation Source

当前 `RealityRouteActivationSourceContext` 以：

```text
sourceReferenceId
+
asOfDate
```

形成 context reference，并允许同一 source 复用 module-global context。

未来必须增加：

```text
intentReferenceId
encounterCycleId
intentRevision
```

同一生命的新 encounter：

```text
不得复用旧 cycle Activation Context
```

当前 module-global context 必须：

- 按当前 admission 校验；
- 旧 revision 不可复用；
- Terminal 后清除；
- 同周期重试可安全重建。

---

## 十二、Host Minimum Surface 复验

当前 `RealityProductionHost` 已具备最低 Surface 所需事实：

```text
Route Authorization READY
Pressure Host Input READY
Pressure Seed Continuation ACTIVE
Pressure Seed Consumer READY
Reality 主体 main 已呈现
RealityLifeUniverseCanvas 已挂载
RealityPressureSeedPresentation 已挂载
```

因此无需：

- 等待用户认出 Seed；
- 等待 Gravity；
- 等待 Choice；
- 等待 Crystal；
- 等待 WebGL 特效完成。

### 12.1 未来新增 Host 输入

```text
intentReferenceId
encounterCycleId
intentRevision
sourceReferenceId
onRealityAcceptanceOutcome
```

### 12.2 未来 Host 输出

成功：

```text
REALITY_MINIMUM_PRESENTED
```

失败：

```text
REALITY_HOST_UNAVAILABLE
```

### 12.3 成功真实性

禁止：

- Page render；
- `navigate()` 返回；
- 固定计时器；
- CSS animation；
- Renderer frame；
- storage write；
- candidate 对象刚创建。

Host 必须在实际最低 Surface commit 后报告。

Controller 再校验：

```text
intent
cycle
revision
source
identity
```

才能进入：

```text
ACTIVE_IN_REALITY
```

---

## 十三、Route Chunk Failure 新边界

当前 `/reality` 使用：

```text
React.lazy
+
Suspense fallback
```

但没有：

```text
Route load Error Boundary
```

`Suspense` 只处理加载等待，不处理 import rejection。

PREP 已要求：

```text
Route Chunk 失败
↓
真实失败
↓
同 cycle 重试
```

所以未来原子提交必须新增或修改：

```text
src/App.tsx
```

目标：

- 捕获 Reality lazy import failure；
- 将失败报告给 Controller；
- 保留同一 `encounterCycleId`；
- 显示克制、真实的失败；
- 提供同周期重试；
- 不退回 identity-only 路径；
- 不把 fallback 显示当作 Active；
- 不新增依赖。

裁决：

```text
App.tsx：
REQUIRED ATOMIC FILE
```

这是本次复验对原 PREP 文件边界的必要补充。

---

## 十四、Recovery Adapter 复验

### 14.1 唯一新存储

冻结：

```text
sessionStorage
↕
xinmaiRealityEncounterIntentRecoveryAdapter
```

只保存：

- intent reference；
- cycle；
- revision；
- 三项身份引用；
- origin；
- qualification enum；
- last known state；
- TTL；
- failure code；
- terminal marker。

绝不保存：

- Life Whisper 原文；
- 关系名；
- Pressure Seed；
- 六维；
- Choice 内容；
- Crystal。

### 14.2 现有 localStorage 不等于 Intent Authority

当前产品已有：

- 生命身份持久化；
- 关系名资产；
- Selected Pressure Seed handoff；
- Archive。

本迁移不重做这些系统。

新冻结：

```text
Recovery Adapter 唯一边界
仅指 RealityEncounterIntent sessionStorage
```

Existing Growth / Identity persistence：

```text
保持既有职责
不得成为 Intent Authority
```

### 14.3 Route 中现有存储读取

Route 当前直接读取：

- visual continuity；
- life source；
- recognized presence；
- historical Reality；
- latest Crystal。

未来：

- 身份读取迁入 typed Identity Recovery Adapter；
- Returning memory 由 producer 以 presentation-only input 提供；
- 无 presentation memory 时允许显示空记忆；
- refresh recovery 只恢复 Intent 与必要身份，不自动恢复历史 Reality 为当前 Reality。

---

## 十五、Selected Pressure Seed 边界

当前 `Reality → Dynamics` handoff 会调用：

```text
writeSelectedPressureSeedContext
```

这是：

```text
当前 Reality 已经 Active
+
用户已认出当前事件
+
正式进入 Gravity / Dynamics
```

之后的既有 Growth handoff。

它不是：

```text
Intent Recovery Storage
```

本迁移不得：

- 提前写入；
- 在 Active 前写入；
- 因 Route mount 写入；
- 因 Candidate 初始化写入；
- 让其成为 Intent 成功证明。

在正式 handoff 时：

```text
Controller 接收 ENCOUNTER_COMPLETED
↓
当前 Entry Intent TERMINAL
↓
现有 Dynamics handoff 继续
```

该 terminal adapter 可以位于：

```text
RealityProductionRouteEntry
```

无需新增第二个 Growth Runtime。

---

## 十六、状态机复验

完整状态：

```text
ABSENT
READY_TO_ENTER_REALITY
ACCEPTING_REALITY
FAILED_RETRYABLE
ACTIVE_IN_REALITY
RECOVERING
TERMINAL
```

结论：

```text
无歧义
```

### 16.1 关键禁止转换

```text
ABSENT → ACTIVE
Identity Restore → READY
Route Mounted → ACTIVE
navigate called → ACTIVE
Storage field → ACTIVE
Choice clicked → ACTIVE
RECOVERING → ACTIVE without Host Outcome
```

### 16.2 同周期失败

Active 前所有失败：

```text
FAILED_RETRYABLE
```

保持：

```text
intentReferenceId
encounterCycleId
```

增加：

```text
revision
```

旧 callback：

```text
REJECT
```

### 16.3 ACTIVE 后刷新

```text
Recovery Candidate
↓
RECOVERING
↓
重新 Authorization / Activation / Host
↓
同 cycle ACTIVE
```

不得：

```text
storage ACTIVE
↓
直接 ACTIVE
```

---

## 十七、原子提交文件边界

未来 Atomic Migration 必须是一个 commit。

### 17.1 新增类型

```text
src/types/xinmaiRealityEncounterIntent.ts
```

### 17.2 新增服务

```text
src/services/xinmaiRealityEncounterIntentController.ts
src/services/xinmaiRealityEncounterIntentRecoveryAdapter.ts
src/services/realityRecognizedIdentityRecoveryAdapter.ts
```

### 17.3 修改生产者

```text
src/pages/GenesisProductionExperiencePage.tsx
src/pages/LaunchLab.tsx
src/pages/GravityPage.tsx
```

### 17.4 修改 Route 入口与加载失败边界

```text
src/App.tsx
src/pages/RealityProductionRouteEntry.tsx
```

### 17.5 修改承接链

```text
src/components/RealityProductionHost.tsx
src/services/realityProductionRouteAuthorization.ts
src/services/realityRouteActivationSourceContext.ts
src/types/realityProductionRouteAuthorization.ts
src/types/realityRouteActivationSourceContext.ts
src/types/realityProductionRouteEntry.ts
```

### 17.6 可能修改的身份 Context 服务

仅当 typed Identity Recovery Adapter 无法复用现有公开 API 时：

```text
src/services/genesisProductionRecognitionRealityEntry.ts
src/services/genesisRealityPresenceContinuityBridge.ts
```

允许：

- 显式纯输入 assembly；
- identity fact 读取；
- context validation。

禁止：

- 新身份；
- 重算二十八宿；
- 创建 Intent；
- storage authority。

### 17.7 新增门禁

```text
scripts/check-xinmai-reality-encounter-intent-controller.mjs
scripts/check-xinmai-reality-encounter-intent-recovery.mjs
scripts/check-xinmai-reality-encounter-intent-atomic-migration.mjs
```

### 17.8 更新门禁

至少：

```text
scripts/check-reality-production-route-authorization.mjs
scripts/check-reality-production-route-entry.mjs
scripts/check-reality-route-activation-source-context.mjs
scripts/check-xinmai-returning-life-whisper-relation-intent-atomic-migration.mjs
scripts/check-xinmai-first-encounter-recognition-action-reachability-correction.mjs
scripts/check-xinmai-third-approach-choice-response-continuity.mjs
scripts/check-reality-pressure-v2-atomic-host-cutover.mjs
```

### 17.9 包清单

```text
package.json
```

只注册门禁。

禁止新增依赖。

---

## 十八、原子切换顺序

未来单提交内必须形成：

```text
1. Intent contract
2. Controller
3. Recovery Adapter
4. Identity Recovery Adapter
5. Genesis Producer Adapter
6. Returning Producer Adapter
7. Choice Producer Adapter
8. App Route Load Failure Boundary
9. Route Admission
10. Explicit Route Authorization
11. Activation intent continuity
12. Host Acceptance Outcome
13. Controller ACTIVE commit
14. Reality → Dynamics terminal handoff
15. identity-only success 删除
16. Route autonomous success 删除
17. direct producer navigation authority 删除
18. recovery / stale cycle / failure gates
19. browser runtime matrix
```

提交结果中不得出现中间状态：

```text
new Controller
+
old identity-only Authority
```

---

## 十九、双路径防护

未来完成后必须为零：

```text
Genesis direct-authority navigation
Returning direct-authority navigation
Choice direct-authority navigation
Route identity-only fallback
Route-generated cycle
Route autonomous Active
Storage autonomous Active
Host autonomous Active
```

允许继续使用：

```text
navigate(/reality)
```

但仅作为：

```text
携带 intentReferenceId 的交通动作
```

不是：

```text
授权
提交
成功
```

---

## 二十、失败与重试复验

|失败点|Controller 状态|cycle|必须行为|
|-|-|-|-|
|Recovery 写失败|`READY`|保持|当前标签页可继续；刷新不可保证|
|Route Chunk 失败|`FAILED_RETRYABLE`|保持|App 边界显示真实失败并重试|
|Authorization 失败|`FAILED_RETRYABLE`|保持|拒绝 identity fallback|
|Activation 失败|`FAILED_RETRYABLE`|保持|清理当前 attempt 临时对象|
|Candidate 失败|`FAILED_RETRYABLE`|保持|不产生当前 Pressure Seed|
|Delivery 失败|`FAILED_RETRYABLE`|保持|不发布 Host Input|
|Host Input 失败|`FAILED_RETRYABLE`|保持|不声称进入|
|Minimum Surface 失败|`FAILED_RETRYABLE`|保持|可重试或明确离开|
|旧 Host Outcome|原状态|保持|拒绝|
|身份失配|`TERMINAL`|终结|不得借其他身份恢复|
|TTL 过期|`TERMINAL`|终结|不得继续旧 Intent|

所有失败：

- 不生成 Pressure Seed 副作用；
- 不写 Selected Context；
- 不启动 Gravity；
- 不启动 Choice；
- 不启动 Crystal；
- 不阻断回到安全生命空间；
- 不自动生成新身份；
- 不创建第二 Reality 链。

---

## 二十一、Runtime 验收矩阵

### 21.1 Genesis

- Submitted + Motion Settled；
- Submitted + Static Settled；
- Skipped；
- Unavailable + Explicit Continue；
- 未命名；
- 已命名；
- storage unavailable；
- stale outcome；
- 重复点击 request。

### 21.2 Returning

- 同一身份；
- 关系名恢复成功；
- 关系名读取失败；
- 当前 Whisper submitted；
- 当前 Whisper skipped；
- unavailable continue；
- 历史 Reality memory-only；
- 历史 Crystal body-imprint；
- refresh before Active；
- refresh after Active。

### 21.3 Choice

- 旧 Entry Intent 已 terminal；
- Choice continuation qualification；
- 新 encounter cycle；
- trace 只作 presentation memory；
- Choice 不直接 Active；
- Choice 不写 Recovery；
- 重复请求不生成第二 cycle。

### 21.4 Route / Host

- 直接 URL 无 Intent 被拒绝；
- valid admission；
- Route Chunk failure；
- Authorization failure；
- Activation failure；
- Candidate failure；
- Delivery failure；
- Host unavailable；
- minimum surface success；
- old revision outcome；
- old cycle outcome；
- Active refresh recovery；
- explicit leave；
- WebGL context loss 不终结 Active。

---

## 二十二、正向门禁

必须新增：

```text
Producer qualification
↓
Controller READY
↓
same cycle ACCEPTING
↓
Host REALITY_MINIMUM_PRESENTED
↓
Controller ACTIVE
```

验证：

- 三类 producer；
- 三项身份；
- same-cycle retry；
- recovery；
- terminal；
- new cycle。

---

## 二十三、负向门禁

必须为零：

```text
identity-only authorization
Route-generated cycle
Host-generated cycle
Renderer-generated cycle
Storage-as-authority
navigate-as-commit
timer-as-commit
mount-as-commit
old outcome contamination
second Reality chain
raw Whisper consumer
relationship name consumer
Pressure Seed before ACTIVE
Choice before valid Growth stage
Crystal before valid Growth stage
DOM authority channel
```

禁止消费者：

- Renderer；
- Pressure Candidate Source；
- Six Dimension；
- Gravity Consumer；
- AI Reflection；
- Crystal；
- Archive；
- Life Engine。

它们不得推进 Intent。

---

## 二十四、回滚复验

回滚单位：

```text
ONE ATOMIC COMMIT
```

必须同时回滚：

- Controller；
- Recovery Adapter；
- Identity Recovery Adapter；
- 三类 producer；
- App load boundary；
- Route；
- Authorization；
- Activation；
- Host outcome；
- terminal handoff；
- identity-only 删除；
- 门禁。

新 sessionStorage key 回滚后：

- 旧 Runtime 不读取；
- 不进入身份；
- 不进入关系名；
- 不进入 Pressure Seed；
- 标签页关闭后消失；
- 不阻断旧 Runtime。

禁止局部回滚：

- 只恢复 Route fallback；
- 只回滚 producer；
- 只移除 Controller；
- 保留新 Recovery 与旧 Authority；
- 恢复两个真源。

结论：

```text
ROLLBACK FEASIBLE
```

---

## 二十五、单提交可控性判断

该迁移预计涉及：

```text
3 个新核心服务 / 类型资产
3 个 producer page
1 个 App load boundary
1 个 Route
1 个 Host
2 个承接 service
3 个承接 type
若干 gate
package.json
```

规模：

```text
LARGE
```

但因：

- 状态机已冻结；
- 消费顺序已冻结；
- 身份引用已有；
- producer 资格已有；
- V2 Host 已稳定；
- Choice 门禁已校准；
- 旧路径已逐点定位；
- 失败矩阵已定义；
- 回滚单位明确；

所以：

```text
SINGLE COMMIT CONTROLLABLE
```

禁止因规模大而拆出一个可运行的双权威中间提交。

允许在提交前：

- 本地多次编辑；
- 临时未提交状态；
- 测试迭代。

最终远程交付必须：

```text
ONE ATOMIC COMMIT
```

---

## 二十六、Runtime 申请卡最低内容

下一张 Runtime 授权卡必须明确：

```text
任务：
XINMAI-REALITY-ENCOUNTER-INTENT-AUTHORITY-ATOMIC-MIGRATION-P0

刀型：
Migration Blade

决策：
NOW — STRICT ATOMIC SCOPE

主 Layer：
Layer 3 → Layer 4 Entry Boundary

旧权威：
Genesis Entry Context + Route identity-only fallback

新权威：
RealityEncounterIntent Controller

切换方式：
ATOMIC

提交单位：
ONE COMMIT

回滚单位：
ONE COMMIT

Phase 3：
迁移关闭前仍 LOCKED
```

授权卡必须包含：

- 完整文件边界；
- App Route Chunk failure；
- Identity Recovery Adapter；
- 三类 producer；
- Host commit；
- terminal handoff；
- identity-only 删除；
- clean remote snapshot；
- browser runtime matrix；
- 远程独立复现。

---

## 二十七、本刀 Definition of Done

本复验完成条件：

- 13项申请条件逐项判断；
- 三类 producer 已复核；
- 三项身份引用已复核；
- Route identity-only 路径已复核；
- Authorization 隐式真源已复核；
- Activation Context 复用风险已复核；
- Host minimum surface 已复核；
- Recovery 唯一边界已复核；
- Route Chunk failure 文件边界已补充；
- Selected Pressure Seed 边界已澄清；
- 原子文件清单已更新；
- 失败与恢复矩阵已复核；
- 回滚单位已复核；
- Runtime 申请卡最低内容已冻结；
- 未修改 Runtime。

完成句：

> 下一次 Reality 不再由身份、路由或导航暗自成立；只有用户的明确意愿、同一生命、同一周期和真实出现的 Reality 一起完成承接，当前相遇才正式开始。

---

## 二十八、交通灯扫描

### 绿色

```text
0
```

当前下一步不是普通小刀。

### 黄色

仍存在但不阻断 Intent Authority 迁移：

- Reality Event 独立语义；
- “不完全是”的候选修正体验；
- Choice / Crystal 深层状态权威；
- candidate cursor 长期恢复；
- Living Intensity & Reward Curve。

这些问题：

```text
MAP / DEFER
```

不得吞入 Atomic Migration。

### 红色

下一步涉及：

- 新 Runtime Authority；
- 三类 producer 切换；
- Route 输入契约改变；
- Authorization 显式化；
- Recovery 新责任；
- Host outcome；
- identity-only fallback 删除；
- App Route failure boundary；
- 单提交回滚。

裁决：

```text
MIGRATION AUDIT：
已完成

MAJOR BLADE PREP：
已完成

READINESS REVALIDATION：
PASS

RUNTIME：
READY TO REQUEST NOW — ATOMIC MIGRATION
```

---

## 二十九、下一刀建议

```text
XINMAI-REALITY-ENCOUNTER-INTENT-AUTHORITY-ATOMIC-MIGRATION-P0
```

刀型：

```text
Migration Blade
```

决策建议：

```text
NOW — STRICT ATOMIC SCOPE
```

唯一目标：

> 在一个可完整回滚的提交中，建立 `RealityEncounterIntent Controller` 为唯一入口权威，原子接入 Genesis、Returning、Choice、Recovery、Route、Authorization 与 Host Commit，并删除 identity-only 与直接导航成功路径。

禁止：

- 修改 Pressure Seed 产品因果；
- 修改 Gravity 体验；
- 修改 Choice 玩法；
- 修改 Crystal；
- 修改 Renderer 视觉；
- 新增身份；
- 新增关系系统；
- 将历史 Reality 恢复为当前 Reality；
- 拆出双权威中间提交；
- 顺带治理黄色项。

---

## 三十、最终状态

```text
Phase 2：
CLOSED

Phase 3：
LOCKED

RealityEncounterIntent Product Authority：
ACCEPTED

RealityEncounterIntent Runtime Authority：
NOT ESTABLISHED

Migration Audit：
COMPLETE

Major Blade Prep：
COMPLETE

Readiness Revalidation：
PASS

Technical Readiness：
PASS

Product Control Runtime Authorization：
PENDING EXPLICIT NEXT KNIFE

Current Runtime：
DEFER

Next Eligible Decision：
NOW — STRICT ATOMIC SCOPE
```
