# XINMAI Reality Pressure Seed Recognition → Transfer → Admission Atomic Continuity Migration Audit P0

任务编号：

`XINMAI-REALITY-PRESSURE-SEED-RECOGNITION-TRANSFER-ADMISSION-ATOMIC-CONTINUITY-MIGRATION-AUDIT-P0`

审计基线：

`d68b8769d94ec5d8e0561625898ab6649bfa7905`

交通灯：

`RED`

刀型：

`Migration Audit`

决策：

`NOW — AUDIT ONLY`

主 Layer：

`Layer 4 Growth / Reality Adventure Entry`

保护：

- Layer 1 World；
- Layer 2 Identity；
- Layer 3 Relationship；
- Reality provenance；
- 已关闭的 Growth Transactional Persistence；
- 已关闭的 Gravity Observation Continuity；
- 当前 Choice Presentation `SAFE_WITHHELD`。

Runtime / Storage / Gate / Renderer：

`DEFER`

---

# 零、Construction State Card

```text
当前 Phase：
Phase 3

当前状态：
ACTIVE / NOT PASSED

当前 A1：
恢复正式 Reality → Gravity 连续性

本刀类型：
Migration Audit

当前问题：
Recognition、Transfer、Admission
分属 Host 内存与两个 sessionStorage 事务域

是否改变产品语义：
NO

是否替换 Runtime 真源：
未来实施需要

是否需要原子迁移：
YES

本刀是否施工 Runtime：
NO

回滚要求：
Forward SAFE_WITHHELD

最终裁决：
NOW — ATOMIC MIGRATION APPLICATION READY
```

---

# 一、执行摘要

本审计确认：

```text
用户明确认出 Pressure Candidate
↓
Host 本地 session 立即变为 SEED_RECOGNIZED
↓
用户靠近当前 Life Weather
↓
Host 临时构造 GravityEntryTransferRequest
↓
Gravity Entry Controller 在当前标签内生成随机 Admission / Cycle / Observation ID
↓
独立 Gravity sessionStorage 写入 Cutover Envelope
↓
目标 Gravity Admission 在模块内存中提交
↓
来源 Reality Intent 在另一 Controller / sessionStorage 中 supersede
↓
Route Ticket 通过 Browser History State 送往 /dynamics
```

当前链路在单标签正常路径中可以运行。

但它没有形成：

```text
Recognition Receipt
+
Transfer
+
Admission

同一跨标签事务真源
```

核心事实：

1. Recognition 目前只存在于 `RealityProductionHost` 当前组件周期；
2. Recognition 成功由同步 `setState` 后的页面 session 表达；
3. `GravityEntryTransferRequest` 没有稳定 `transferReferenceId`；
4. Gravity Admission ID、Gravity Cycle ID 与 Observation ID 在各标签内随机生成；
5. Reality Intent 与 Gravity Cutover 使用两个不同的 `sessionStorage` key；
6. `sessionStorage` 不提供同源多标签共享的 canonical record；
7. 当前 Cutover 先写 Gravity snapshot，再提交目标 Controller，最后提交来源 Reality supersession；
8. 三步不在一个存储事务内；
9. 两个标签可以各自返回成功，但形成不同 Admission；
10. Route Ticket 与 Browser History 只是交付载体，不能修复以上真源分裂。

因此：

```text
仅新增 Recognition Receipt
或
仅扩展任一 sessionStorage
或
给现有流程外包一层 Web Lock
```

均不能关闭问题。

唯一推荐方向：

```text
独立 Reality Adventure Continuity IndexedDB
↓
同一 encounter canonical record
↓
Recognition transaction
↓
Recognition Receipt
↓
Transfer + Gravity Admission atomic transaction
↓
IDBTransaction complete
↓
Typed Outcome
↓
Presentation / Route
```

物理数据库建议：

```text
xinmai-reality-adventure-continuity
```

不复用：

```text
xinmai-lived-growth-canonical
```

原因不是 IndexedDB 能力不足，而是：

- Recognition 属于 Reality Adventure 上游连续性；
- Lived Growth Store 属于 Observation / Choice / Fact / Eligibility / Crystal；
- 两者不需要跨数据库原子写入；
- 复用 Growth DB 会把 Recognition 的版本升级、故障和回滚与已关闭的 Growth 资产耦合；
- 物理复用不能把 Growth Authority 变成 Recognition 产品语义 Owner。

新数据库必须同时容纳：

- current Reality Intent continuity；
- candidate recognition receipt；
- Gravity transfer proof；
- Gravity admission proof。

禁止建立：

```text
Recognition DB
+
Transfer DB
+
Admission DB
```

---

# 二、审计证据边界

## 2.1 本刀使用的证据

```text
协议声明：
Major Blade Prep 已冻结 Recognition 产品语义

源码结构：
正式 /reality 与 /dynamics 生产链

正式 Controller：
Reality Encounter Intent
Gravity Entry Admission

正式 Recovery：
Reality Intent sessionStorage
Gravity Cutover sessionStorage

正式 Host：
RealityProductionHost

正式 Route：
RealityProductionRouteEntry
GravityProductionRouteEntry

现有事务资产：
xinmai-lived-growth-canonical IndexedDB
```

## 2.2 本刀不使用的替代证据

- Acceptance Page；
- Development Fixture；
- `/starbeast-lab`；
- 手工写入 Storage；
- DOM 字符串断言；
- Renderer 状态；
- 页面按钮禁用；
- 计时器；
- Browser History 中存在对象；
- Direct URL 恰好可打开；
- 当前单标签没有复现重复 Admission。

## 2.3 审计性质

本刀只回答：

> 当前真源为何无法提供 Recognition → Transfer → Admission 的跨标签唯一性，以及未来如何一次性迁移。

本刀不：

- 修改现有代码；
- 新建数据库；
- 新增 Gate；
- 激活 Choice；
- 修改视觉；
- 进入 Phase 4。

---

# 三、当前正式生产因果链

## 3.1 Reality 已成立

正式入口先由：

```text
RealityEncounterIntentController
↓
Reality Route post-commit admission
↓
Typed Life Surface + Pressure Surface Outcome
↓
ACTIVE_IN_REALITY
```

建立当前 Reality encounter。

当前 Intent：

- schema：`XINMAI_REALITY_ENCOUNTER_INTENT_V1`；
- key：`xinmaiRealityEncounterIntentRecovery`；
- storage：`sessionStorage`；
- TTL：2 hours；
- semantic owner：`XinmaiRealityEncounterIntentController`；
- persistence owner：`XinmaiRealityEncounterIntentRecoveryAdapter`。

该 Controller 仍是 Reality Intent 的产品语义 Owner。

本审计不改变这一点。

但它的持久化必须纳入新的 continuity transaction domain，否则：

```text
Tab A 的 current Intent
≠
Tab B 的 current Intent
```

Recognition Receipt 无法在跨标签下证明：

> 自己绑定的是全局 current encounter。

---

## 3.2 Candidate Presentation

正式 Candidate 来自：

```text
RealityPressureSeedCandidateSource
↓
Reality Pressure Candidate Bundle
↓
RealityProductionPressureSeedConsumer
↓
RealityPressureSeedPresentation
```

当前稳定引用：

- `sourceReferenceId`；
- `bundleReferenceId`；
- `candidateReferenceId`；
- `GUANYAO_REALITY_PRESSURE_CANDIDATE_BUNDLE_V1`；
- `PRESSURE_SEED_MATRIX_V2` provenance。

当前缺失：

```text
candidateRevisionReferenceId
```

因此 Candidate Source 需要在未来迁移中提供正式 catalog revision，而不是让：

- Page；
- Host；
- Receipt；
- DOM；
- Presentation 文案

自行拼接 revision。

P0 目标：

```text
Candidate Source Schema Version
+
Pressure Matrix Catalog Revision
+
bundleReferenceId
+
candidateReferenceId
↓
candidateRevisionReferenceId
```

Candidate Revision 是 Recognition 的校验输入。

它不是新的 Pressure Engine。

---

## 3.3 当前 Recognition

正式用户动作：

```text
RealityPressureSeedPresentation.onRecognize
↓
RealityProductionHost.recognizePressureSeed
```

Host 当前执行：

```text
advanceRealityProductionPressureSeedConsumer(...)
↓
captureRealityPressureSeed(...)
↓
返回 captureState = SEED_RECOGNIZED
↓
applyConsumerResult(...)
↓
setPressureHostState(...)
↓
setInnerViewApproachState("AWAITING_BODY_APPROACH")
```

当前成功点实际是：

```text
同步纯函数返回 READY
+
React local state 接受结果
```

它没有：

- Recognition Controller；
- Recognition Fact；
- Recognition Receipt；
- canonical revision；
- cross-tab fence；
- confirmed recovery write；
- typed post-transaction outcome。

因此当前：

```text
SEED_RECOGNIZED
```

是 Host 当前组件周期事实。

不是可恢复的生命事实。

---

## 3.4 当前 Gravity Readiness

Pressure Consumer 在 Capture 成功后直接输出：

```text
gravityReadiness = READY
```

页面据此开放：

```text
AWAITING_BODY_APPROACH
```

该 readiness 当前继承 Host session。

刷新或 Host remount：

- 会重新初始化 Consumer；
- Recognition 不恢复；
- `gravityReadiness` 回到 `NOT_READY`；
- 当前页面重新进入 Candidate Observation。

这正是此前生产路径被错误判断“不可达”的原因之一：

一次成功不构成刷新连续性。

---

## 3.5 当前 Transfer Request

用户完成 Body Approach 后，Host 临时构造：

```text
GravityEntryTransferRequest
```

当前 request 包含：

- identity references；
- active Reality intent proof；
- recognized Pressure session；
- body approach proof；
- visual continuity；
- requestedAt。

当前 request 不包含：

- `recognitionReceiptReferenceId`；
- `recognitionReceiptRevision`；
- `candidateRevisionReferenceId`；
- `gravityTransferReferenceId`；
- canonical expected revision；
- shared fencing token。

因此它只能证明：

> 当前标签页的 Host 认为 Recognition 与 Body Approach 已成立。

它不能证明：

> 当前 encounter 的 Receipt 尚未被另一标签消费。

---

## 3.6 当前 Gravity Transfer Preparation

`prepareGravityEntryTransfer()` 当前：

1. 读取模块级 `currentAdmission`；
2. 校验 request 与当前 Reality Intent；
3. 在内存中生成：

```text
gravity-admission:<opaqueId>
gravity-cycle:<opaqueId>
gravity-observation:<opaqueId>
```

4. 将 state 设为 `TRANSFER_PREPARED`；
5. 返回 PREPARED。

不同标签页拥有：

- 不同 JS module instance；
- 不同 `currentAdmission`；
- 不同随机 ID；
- 不同 `sessionStorage`。

所以：

```text
同一 encounter
同一 Candidate
同一用户动作
```

可以在两个标签中形成：

```text
Admission A
+
Admission B
```

当前没有共享唯一约束拒绝第二个。

---

## 3.7 当前 Cutover

`executeRealityToGravityCutover()` 当前顺序：

```text
读取当前 Reality Intent
↓
prepareGravityEntryTransfer()
↓
构造 READY_TO_ENTER_GRAVITY Admission
↓
构造 Cutover Envelope
↓
写 xinmaiRealityToGravityCutoverRecovery
↓
commitPreparedGravityTransfer()
↓
commitRealityEncounterGravitySupersession()
↓
构造 Route Ticket
```

三个关键提交并不属于一个存储事务：

```text
Gravity sessionStorage write

Gravity Admission module state

Reality Intent Controller + Reality sessionStorage
```

可能出现：

```text
Gravity snapshot 已写入
↓
Gravity target Controller 已接受
↓
Reality source supersession 失败
```

返回结果虽是 `RETRYABLE`，但两个 Recovery domain 已经不一致。

这属于：

```text
half transaction
```

不是普通 Presentation failure。

---

## 3.8 当前 Route Ticket 与 Browser History

Cutover COMMITTED 后：

```text
navigate("/dynamics", {
  state: { gravityRouteTicket }
})
```

Route Ticket 包含：

- admissionReferenceId；
- gravityCycleId；
- gravityObservationReferenceId；
- expectedAdmissionRevision；
- identity references；
- cutover envelope reference；
- TTL。

它适合：

- 交付提示；
- 当前导航 payload；
- Route Controller 的 typed input。

它不适合：

- 成为 Transfer Authority；
- 成为 Admission Authority；
- 成为 Direct URL 成功依据；
- 生成新的 IDs；
- 替代 canonical recovery。

Browser History：

```text
ISOLATE
```

只保留为非权威交付载体。

---

## 3.9 当前 Gravity Route Admission

`GravityProductionRouteEntry`：

```text
routeTicket
+
typed identity recovery
↓
establishGravityRouteAdmission()
```

Controller 在没有 module `currentAdmission` 时：

```text
readGravityEntryRecoveryCandidate()
↓
从 sessionStorage 恢复
```

优点：

- Route 没有直接读取 Storage；
- typed Controller 仍负责校验；
- Direct URL 不凭 DOM 或 location alone 成功。

缺口：

- canonical candidate 仍是当前标签的 `sessionStorage`；
- 另一个标签可以拥有另一份同样“有效”的 Admission；
- `sessionStorage` 的成功无法成为跨标签唯一事实。

---

# 四、当前真源与隔离范围图

```text
同一 Origin

Tab A
├─ React Host local recognition
├─ module currentRealityIntent
├─ module currentGravityAdmission
├─ sessionStorage: Reality Intent A
└─ sessionStorage: Gravity Cutover A

Tab B
├─ React Host local recognition
├─ module currentRealityIntent
├─ module currentGravityAdmission
├─ sessionStorage: Reality Intent B
└─ sessionStorage: Gravity Cutover B

共享：
├─ 当前代码与 Pressure Matrix
├─ localStorage（非事务 read-modify-write）
├─ IndexedDB（同 DB / 重叠 store 的事务可串行）
└─ BroadcastChannel（通知，不是 Authority）
```

## 4.1 隔离能力表

| 机制 | 标签内 | 多标签共享 | 原子 read-modify-write | 可作为本链 Authority |
|---|---:|---:|---:|---|
| React state | 是 | 否 | 否 | 否 |
| module state | 是 | 否 | 否 | 否 |
| sessionStorage | 是 | 否 | 否 | 否 |
| Browser History state | 当前 entry | 不可靠 | 否 | 否 |
| localStorage | 是 | 是 | 否 | 否 |
| Web Lock | 调度 | 同协调域可能共享 | 不提供存储事务 | 否 |
| BroadcastChannel | 通知 | 是 | 否 | 否 |
| IndexedDB 同 DB 重叠 readwrite transaction | 是 | 是 | 是 | 是 |

## 4.2 当前两个 sessionStorage key

### Reality Intent

```text
key：
xinmaiRealityEncounterIntentRecovery

schema：
XINMAI_REALITY_ENCOUNTER_RECOVERY_V1

owner：
XinmaiRealityEncounterIntentRecoveryAdapter

当前角色：
Reality Intent recovery truth source
```

### Gravity Cutover / Admission

```text
key：
xinmaiRealityToGravityCutoverRecovery

schema：
XINMAI_GRAVITY_ENTRY_RECOVERY_V2

owner：
XinmaiGravityEntryRecoveryAdapter

当前角色：
Cutover + current Admission recovery truth source
```

两个 key：

- 不共享事务；
- 不共享 revision；
- 不共享 cross-tab fence；
- 可以分别写入成功；
- 可以形成来源与目标不一致。

---

# 五、精确竞态时间线

## 5.1 同一 Candidate 双标签认出

```text
T0  Tab A 与 Tab B 来自同一 encounter 的复制会话
T1  A 点击 Candidate X
T2  B 点击 Candidate X
T3  A Host local session = SEED_RECOGNIZED
T4  B Host local session = SEED_RECOGNIZED
T5  A 生成 Admission A / Cycle A / Observation A
T6  B 生成 Admission B / Cycle B / Observation B
T7  A 写 Gravity sessionStorage A，confirmed
T8  B 写 Gravity sessionStorage B，confirmed
T9  A supersede 自己的 Reality Intent A
T10 B supersede 自己的 Reality Intent B
T11 A 与 B 均可返回 COMMITTED
```

最终：

```text
同一 encounter
→ 两个 Gravity Admission
```

没有共享系统能宣布其中一个 stale。

---

## 5.2 同一 encounter 认出不同 Candidate

```text
Tab A：
Candidate X → local SEED_RECOGNIZED

Tab B：
Candidate Y → local SEED_RECOGNIZED
```

两边都有合法 bundle membership。

当前没有：

- encounter unique Receipt；
- first-committed-wins transaction；
- conflict typed outcome；
- observer 重读。

所以两个 Candidate 都可以继续到不同 Admission。

---

## 5.3 Cutover 半事务

```text
Gravity sessionStorage write：
CONFIRMED
↓
Gravity target memory commit：
READY
↓
Reality Intent supersession：
STALE / STORAGE FAILURE
```

此时：

- target proof 已存在；
- source Reality 仍可能 ACTIVE；
- Cutover 返回 retryable；
- 用户可再次尝试；
- 另一个标签可继续从旧 source 生产第二个 transfer。

---

## 5.4 Navigation failure

当前 COMMITTED 后才导航，这一点正确。

但 navigation failure 后：

- Route Ticket 可能没有进入目标页面；
- canonical proof 只在当前标签的 Gravity sessionStorage；
- 另一个标签不知道该 Transfer；
- 返回 Reality 的 Host local Recognition 可能已经丢失。

目标必须保证：

```text
navigation failure
≠
new Transfer
≠
new Admission
```

---

## 5.5 旧 callback 晚到

当前 Recognition 没有 shared revision。

旧 Host callback 只校验当前组件 session。

若新 encounter 已在另一标签开始：

- 旧 callback 无法读取 shared current encounter；
- 旧 request 可能仍对自己的 sessionStorage current Intent 有效；
- 可能生成旧周期 Admission。

---

# 六、目标不变量

## 6.1 Recognition 唯一性

```text
same identity
+
same encounterCycleId
+
candidateReferenceId
+
candidateRevisionReferenceId
↓
at most one valid Recognition Receipt
```

同一 encounter：

- 只能有一个 current Receipt；
- 同 Candidate 重试恢复同一 Receipt；
- 不同 Candidate 并发时第一笔合法 transaction 成为事实；
- 第二笔返回 `STALE / CONFLICT`；
- 不生成第二 Receipt。

---

## 6.2 Receipt 消费唯一性

```text
one Recognition Receipt
↓
at most one Gravity Transfer
↓
at most one Gravity Admission
```

重试：

- 复用同一 Transfer ID；
- 复用同一 Admission ID；
- 复用同一 gravityCycleId；
- 复用同一 gravityObservationReferenceId；
- 不延长 TTL；
- 不重建 source proof。

---

## 6.3 Admission 连续性

Admission revision 可以随着：

- route acceptance；
- surface outcome；
- retry；
- active commit；
- terminal

推进。

但以下引用必须稳定：

```text
admissionReferenceId
gravityCycleId
gravityObservationReferenceId
sourceReality.intentReferenceId
sourceReality.encounterCycleId
recognitionReceiptReferenceId
gravityTransferReferenceId
identityReferences
pressure provenance
```

---

## 6.4 唯一成功点

```text
IDBTransaction complete
```

才可以产生：

- `RECOGNIZED` typed outcome；
- `SEED_RECOGNIZED` Presentation；
- `GRAVITY_READY_TO_CONTINUE` Presentation；
- `TRANSFER_COMMITTED` typed outcome；
- Route Ticket；
- `READY_TO_ENTER_GRAVITY` recovery。

以下均不是成功：

- request success；
- objectStore.put success；
- Web Lock callback end；
- localStorage 自读回；
- React setState；
- Host callback return；
- DOM 属性变化；
- navigation start；
- Route mounted。

---

# 七、产品语义 Owner 与持久化 Owner

## 7.1 Reality Intent

产品语义 Owner：

```text
RealityEncounterIntentController
```

继续拥有：

- explicit Reality intent；
- encounterCycleId；
- origin / qualification；
- Reality active lifecycle；
- terminal / leave。

它不拥有：

- Candidate selection；
- Recognition Receipt；
- Gravity visual outcome；
- Choice；
- Crystal。

未来仅迁移其 persistence 与 cross-tab current-record 校验。

---

## 7.2 Pressure Recognition

产品语义 Owner：

```text
RealityPressureRecognitionController
```

拥有：

- typed recognition command；
- Candidate membership / revision / provenance 校验；
- Recognition Fact；
- Recognition Receipt lifecycle；
- current Receipt revision；
- typed committed outcome。

它不拥有：

- Pressure Candidate 生成；
- Gravity Admission；
- Renderer；
- Growth。

---

## 7.3 Gravity Transfer

产品语义 Owner：

```text
RealityToGravityContinuityController
```

拥有：

- Receipt consume intent；
- deterministic Transfer；
- Body Approach proof；
- source Reality supersession；
- Transfer / Admission atomic transition；
- Route delivery result。

它不拥有：

- Candidate 内容；
- Gravity surface success；
- Choice / Crystal。

---

## 7.4 Gravity Admission

产品语义 Owner：

```text
RealityToGravityEntryAdmissionController
```

继续拥有：

- Admission lifecycle；
- route admission；
- retry；
- typed surface outcome；
- active / terminal。

它不再直接拥有：

- persistence implementation；
- random creation on each tab；
- sessionStorage truth。

---

## 7.5 Common Transaction Store

持久化 Owner：

```text
RealityAdventureContinuityTransactionalStore
```

它只拥有：

- transactional read / write；
- schema validation；
- unique indexes；
- canonical revision；
- fencing；
- connection lifecycle；
- confirmed commit outcome；
- read-only recovery。

它不决定：

- 用户是否认出了现实；
- Candidate 是否有意义；
- Gravity 是否应当出现；
- 用户是否应该获得 Choice；
- Crystal 是否形成。

---

# 八、方案比较

## Option 1｜扩展 Reality Encounter sessionStorage

方向：

```text
Intent Snapshot
+
Recognition Receipt
```

优点：

- 改动较小；
- 复用现有 TTL 与 Controller。

失败：

- 不跨标签共享；
- 不能与 Gravity sessionStorage 原子提交；
- duplicate tab 可各自产生 Receipt；
- source / target 仍分裂。

裁决：

```text
REJECT
```

---

## Option 2｜Web Lock + sessionStorage

方向：

```text
navigator.locks
↓
两份 sessionStorage 写入
```

问题：

- lock 不改变 sessionStorage 的 tab-scoped 隔离；
- A 在自己的 storage 写入，B 仍看不到；
- 锁释放不等于两个 storage 已形成共同事务；
- 不同 Browser Context / 不支持环境覆盖不足；
- 会形成 Lock 与 storage 两套成功解释。

裁决：

```text
REJECT
```

Web Lock 最多可作为性能调度器。

不得生产：

- Receipt；
- revision；
- fence；
- successful outcome。

---

## Option 3｜localStorage revision / CAS

方向：

```text
read revision
↓
compare in JS
↓
write localStorage
```

问题：

- 这不是原子 compare-and-swap；
- 两标签可同时读取同一 revision；
- 两边都判断可写；
- 最后写入覆盖前者；
- 两边均可能向 UI 返回成功。

这正是已经在 Growth 资产中验证过的 lost write 模式。

裁决：

```text
REJECT
```

---

## Option 4｜BroadcastChannel / Leader

方向：

```text
选 Leader
↓
其他标签转发 command
```

问题：

- BroadcastChannel 只提供通知；
- Leader crash 需要 lease / fencing；
- split-brain 仍需 canonical storage 拒绝；
- 若底层仍是 sessionStorage / localStorage，Leader 只是第二 Authority；
- 消息到达不等于 durable commit。

裁决：

```text
REJECT AS AUTHORITY
KEEP AS OPTIONAL OBSERVER
```

---

## Option 5｜IndexedDB common transaction

方向：

```text
same origin
same database
overlapping readwrite transaction scope
↓
serial commit
```

能力：

- 多标签连接共享 canonical database；
- 重叠 `readwrite` transaction 串行；
- transaction complete 才产生成功；
- unique index 拒绝重复 Receipt / Transfer / Admission；
- abort 不留下部分 record；
- stale writer 在 transaction 内重读后被拒绝。

裁决：

```text
ACCEPT
```

---

## Option 6｜新 Life Adventure Continuity Store

候选 A：

```text
复用 xinmai-lived-growth-canonical
新增 continuity stores
```

收益：

- 可与 Observation / Choice stores 建立跨 store transaction；
- 已有 IDB connection / blocked / versionchange 处理经验。

风险：

- Recognition 故障与 Growth Recovery 故障耦合；
- 数据库版本升级影响已关闭的 Fact / Eligibility / Receipt / Crystal；
- forward rollback 难以只暂停 Recognition；
- pre-Growth Reality continuity 与 post-Choice Growth envelope 混用物理生命周期；
- 未来容易误称 Growth Store 拥有 Recognition。

本链不需要与：

- Lived Response Fact；
- Crystal Eligibility；
- Formation Receipt

在同一事务写入。

因此没有足够收益抵消耦合。

候选 B：

```text
新建 xinmai-reality-adventure-continuity
```

要求：

- Reality Intent continuity；
- Recognition Receipt；
- Gravity Transfer；
- Gravity Admission

全部在同一个新数据库。

不能拆成多个数据库。

裁决：

```text
ACCEPT / UNIQUE RECOMMENDATION
```

---

## Option 7｜全面 SAFE_WITHHELD

方向：

```text
暂停新的 Recognition / Transfer / Admission mutation
```

用途：

- 迁移候选失败；
- 事务能力不可用；
- schema upgrade blocked；
- 多标签不变量失败；
- 发现双 Authority；
- forward rollback。

它保护真实性，但不能完成产品链。

裁决：

```text
MANDATORY ROLLBACK POSTURE
NOT THE TARGET RUNTIME
```

---

# 九、唯一推荐的物理事务方案

## 9.1 Database

```text
name：
xinmai-reality-adventure-continuity

version：
1
```

本数据库属于：

```text
Reality Adventure Continuity persistence
```

不是：

- Pressure Seed Engine；
- Gravity Engine；
- Growth Engine；
- Identity Store；
- Phase 4 Archive。

---

## 9.2 Object Stores

### Canonical Store

```text
store：
reality-adventure-encounter-continuity

keyPath：
encounterCycleId
```

### Migration Meta Store

```text
store：
reality-adventure-continuity-migration-meta

keyPath：
id
```

Migration Meta 只记录：

- schema version；
- cutover version；
- legacy key detection；
- legacy raw digest；
- isolation status；
- no-backfill flag；
- checkedAt。

它不存 Recognition Fact。

---

## 9.3 Canonical Record

```ts
type RealityAdventureEncounterContinuityRecord = Readonly<{
  schemaVersion:
    "XINMAI_REALITY_ADVENTURE_ENCOUNTER_CONTINUITY_V1";

  encounterCycleId: string;
  canonicalRevision: number;
  fencingToken: number;

  activeIdentityKey: string | null;
  identityReferences: RealityEncounterIdentityReferences;

  realityIntent: RealityEncounterIntentContinuityProof;
  candidateRevision: RealityPressureCandidateRevisionProof | null;
  recognitionReceipt: RealityPressureRecognitionReceipt | null;
  gravityTransfer: RealityToGravityTransferProof | null;
  gravityAdmission: GravityEntryAdmission | null;

  lifecycle:
    | "REALITY_ACTIVE"
    | "PRESSURE_RECOGNIZED"
    | "GRAVITY_ADMITTED"
    | "ACTIVE_IN_GRAVITY"
    | "TERMINAL";

  issuedAt: string;
  updatedAt: string;
  expiresAt: string;
  terminalReason: string | null;

  provenance: Readonly<{
    explicitUserIntentRequired: true;
    explicitUserRecognitionRequired: true;
    explicitBodyApproachRequired: true;
    noBackfill: true;
    noDomAuthority: true;
    noRendererAuthority: true;
    noGrowthAuthority: true;
  }>;
}>;
```

禁止把以下内容存入 canonical record：

- Candidate 展示文案副本；
- DOM selector；
- candidate index；
- 动画帧；
- Camera；
- Particle state；
- Six Dimension；
- Choice；
- Crystal；
- Phase 4 资产。

---

## 9.4 Unique Index

Canonical Store 必须建立：

```text
intentReferenceId
UNIQUE

activeIdentityKey
UNIQUE / field absent after terminal

recognitionReceiptReferenceId
UNIQUE / field absent before recognition

gravityTransferReferenceId
UNIQUE / field absent before transfer

gravityAdmissionReferenceId
UNIQUE / field absent before admission

gravityCycleId
UNIQUE / field absent before admission

gravityObservationReferenceId
UNIQUE / field absent before admission
```

唯一约束用于拒绝：

- 第二 current encounter；
- 第二 Receipt；
- 第二 Transfer；
- 第二 Admission；
- 重复 Gravity Cycle；
- 重复 Observation lineage。

---

## 9.5 Deterministic References

目标引用：

```text
recognitionReceiptReferenceId
=
pressure-recognition:
encounterCycleId:
candidateRevisionReferenceId

gravityTransferReferenceId
=
gravity-transfer:
recognitionReceiptReferenceId

gravityAdmissionReferenceId
=
gravity-admission:
gravityTransferReferenceId

gravityCycleId
=
gravity-cycle:
gravityTransferReferenceId

gravityObservationReferenceId
=
gravity-observation:
gravityTransferReferenceId
```

实现可使用 canonical digest 缩短长度。

但必须保证：

- 输入集合冻结；
- retry 可复算；
- 不依赖时间；
- 不依赖随机数；
- 不依赖标签页；
- 不依赖 DOM；
- 不依赖 route entry key。

---

## 9.6 Revision / Fencing

唯一 fencing 规则：

```text
transaction 内读取 current canonicalRevision
↓
校验 expectedRevision
↓
校验 lifecycle / identity / provenance
↓
写 canonicalRevision + 1
↓
transaction complete
↓
返回 committed revision
```

`fencingToken`：

- 与 committed canonical revision 同步单调；
- 只由 store transaction 生成；
- 旧标签只可携带 expected token；
- 旧标签不能自行增加；
- callback 晚到时必须在事务内拒绝。

禁止建立：

```text
Web Lock token
+
lease token
+
localStorage revision
+
IDB revision
```

多套竞争权威。

P0 唯一 fence：

```text
IDB canonical revision / fencing token
```

---

# 十、原子事务边界

## 10.1 T0｜Reality Intent Continuity

新的 Reality encounter 建立时：

```text
用户 explicit Reality intent
↓
Controller 校验 Identity / Relationship qualification
↓
IDB readwrite transaction
↓
写 current Reality Intent continuity record
↓
transaction complete
↓
READY / ACTIVE typed outcome
```

语义仍由：

```text
RealityEncounterIntentController
```

拥有。

Store 只承载。

为什么 Intent 必须进入同一 physical DB：

- Recognition transaction 必须在锁内读取 current Intent；
- sessionStorage Intent 不能提供跨标签 current encounter；
- source Reality supersession 必须与 Transfer / Admission 同事务提交；
- 否则 Receipt 只能是“另一个真源旁边的候选”。

---

## 10.2 T1｜Recognition Transaction

```text
用户点击当前 Candidate
↓
Host 提交 typed Recognition Command
↓
Controller 完成纯 Candidate Source preflight
↓
开启 continuity readwrite transaction
↓
重读 current encounter record
↓
校验：
  identity
  intent ACTIVE
  encounterCycleId
  TTL
  candidate membership
  candidateBundleReferenceId
  candidateRevisionReferenceId
  pressure provenance
  no existing current Receipt
  no Gravity Admission
  expected canonical revision
↓
写 Recognition Fact
↓
写 Recognition Receipt
↓
canonical revision + 1
↓
transaction complete
↓
返回 RECOGNIZED typed outcome
```

同 Candidate retry：

```text
恢复同一 Receipt
```

不同 Candidate 并发：

```text
第一 committed Receipt 保留
第二 transaction → STALE / CONFLICT
```

Host 只有收到 committed outcome 后才能显示：

```text
SEED_RECOGNIZED
GRAVITY_READY_TO_CONTINUE
```

---

## 10.3 T2｜Transfer + Admission Transaction

用户明确 Body Approach 后：

```text
typed Body Approach Command
↓
continuity readwrite transaction
↓
重读 current record
↓
校验：
  current Receipt
  receipt lifecycle = RECOGNIZED
  identity / encounter / candidate revision
  no existing Transfer
  no existing Admission
  Reality Intent ACTIVE
  expected canonical revision
↓
确定性生成：
  Transfer ID
  Admission ID
  Gravity Cycle ID
  Observation Reference ID
↓
同一 record 原子写入：
  Receipt = CONSUMED_BY_GRAVITY_TRANSFER
  Gravity Transfer proof
  Gravity Admission = READY_TO_ENTER_GRAVITY
  source Reality = SUPERSEDED_BY_GRAVITY_TRANSFER
  canonical revision + 1
↓
transaction complete
↓
返回 TRANSFER_COMMITTED typed outcome
↓
派生 Route Ticket
```

冻结：

```text
Transfer claim
+
Admission creation
+
source Reality supersession
```

属于同一个事务。

不保留：

```text
Receipt 已 consumed
但 Admission 不存在
```

也不保留：

```text
Admission 已存在
但 source Reality 仍 Active
```

---

## 10.4 T3｜Gravity Route / Surface Lifecycle

Route：

```text
Route Ticket / Direct URL hint
↓
Route Controller
↓
typed Canonical Recovery Adapter
↓
当前 Admission
```

Admission lifecycle 后续变化：

```text
READY_TO_ENTER_GRAVITY
↓
ACCEPTING_GRAVITY
↓
Typed Motion / Static Surface Outcome
↓
ACTIVE_IN_GRAVITY
```

每次 mutation：

- 事务内重读；
- 保持 IDs；
- 推进 revision；
- transaction complete 后返回；
- late outcome stale reject。

Route：

- 不直接读 DB；
- 不直接提交 ACTIVE；
- 不根据 location state 自行恢复。

---

# 十一、sessionStorage 最终角色

## 11.1 现有 Reality Intent key

```text
xinmaiRealityEncounterIntentRecovery
```

迁移后角色：

```text
READ-ONLY LEGACY
```

规则：

- 只读取 cutover 前已存在、schema 合法的 session；
- 不写入新的 Intent；
- 不更新 revision；
- 不延长 TTL；
- 不决定 Recognition success；
- 不决定 Transfer success；
- 不决定 Direct URL；
- compatibility window 结束后 `DELETE`。

---

## 11.2 现有 Gravity Cutover key

```text
xinmaiRealityToGravityCutoverRecovery
```

迁移后角色：

```text
READ-ONLY LEGACY
```

规则：

- 只用于恢复 cutover 前已合法形成的 Gravity Admission；
- 不倒推 Recognition Receipt；
- 不写入新 Admission；
- 不更新新 Admission revision；
- 不成为 Route Ticket Authority；
- compatibility window 结束后 `DELETE`。

---

## 11.3 是否新增 Route Delivery Cache

P0 裁决：

```text
NOT REQUIRED
```

理由：

- Browser History 可以继续携带 typed Route Ticket；
- Ticket 丢失时 Route Controller 可经 canonical adapter 恢复；
- 新增 cache 会增加第三份可误用状态。

若未来性能证据证明需要 cache，必须是：

```text
ROUTE DELIVERY CACHE
```

并满足：

- 只从 committed canonical outcome 投影；
- 丢失时从 canonical recovery；
- cache 写失败不否定 canonical fact；
- cache 不生成 ID；
- cache 不允许 Direct URL；
- cache 不决定成功。

---

# 十二、NO BACKFILL 与旧数据隔离

## 12.1 默认策略

```text
NO BACKFILL
```

不得从以下事实补造 Recognition Receipt：

- Host local `SEED_RECOGNIZED`；
- DOM `data-reality-seed-recognition-continuity`；
- Candidate 可见；
- Gravity `userRecognitionConfirmed`；
- sessionStorage revision；
- 当前 route 为 `/dynamics`；
- Admission `createdAt / issuedAt`；
- Browser History Ticket；
- Renderer state；
- elapsed time。

---

## 12.2 只有旧 Reality Intent

如果：

```text
legacy Reality Intent 合法
但无 Recognition Receipt
```

则：

- 允许继续显示当前候选；
- 用户新的明确 Recognition action 可在新 canonical transaction 中创建 Receipt；
- 这属于 migration-on-explicit-action；
- 不是自动 backfill；
- 旧 Intent 只作为校验输入；
- transaction 同时建立 canonical Intent continuity proof。

---

## 12.3 Host 曾认出但未 Transfer

刷新后：

```text
Receipt 不存在
→ OBSERVING_CANDIDATES
```

用户需要重新明确认出。

不得声称：

```text
系统记得你已经认出
```

---

## 12.4 已有合法 Gravity Admission

如果 legacy Gravity Recovery 中存在：

- schema 合法；
- identity 一致；
- encounter 一致；
- TTL 有效；
- Admission lifecycle 合法；

则：

```text
ISOLATE AS VALID LEGACY ADMISSION
```

允许：

- typed legacy reader 恢复；
- 继续同一 Gravity Admission；
- 进入 Gravity；
- 保护后续 Observation / Choice / Growth。

禁止：

- 倒推 Receipt；
- 倒推 Transfer；
- 复制到新 record 后声称来自新 transaction；
- 生成第二 Admission；
- 修改原始 legacy snapshot。

---

## 12.5 已有更高 Growth 资产

恢复优先级：

```text
Crystal / Formation Receipt
>
Eligibility
>
Lived Response Fact
>
Choice
>
valid Gravity Admission
>
Transfer
>
Recognition Receipt
>
Candidate Observation
```

已有更高资产：

- 不回到 Recognition；
- 不生成新 Transfer；
- 不形成第二 Gravity Cycle；
- 不修改既有 Growth Store；
- 不把高资产复制进 continuity store。

---

## 12.6 Legacy Conflict

如果：

- Reality legacy 与 Gravity legacy identity 不一致；
- 两个 legacy Admission 同时声称 current；
- schema 损坏；
- current canonical 与 legacy 指向不同 encounter；
- legacy writer 在 cutover 后继续变化；

则：

```text
SAFE_WITHHELD
```

保留原始 legacy 字符串和 digest。

不自动：

- 选更新的时间；
- 选更高 revision；
- 选已经进入 `/dynamics` 的一条；
- 合并；
- 删除。

---

# 十三、Direct URL 与 Route Boundary

正式 Direct URL：

```text
/dynamics
↓
Identity Recovery
↓
Route Controller
↓
Typed Canonical Recovery Adapter
↓
验证：
  current identity
  encounter lifecycle
  unexpired TTL
  legal Transfer
  legal Admission
  canonical revision
↓
Route Admission
```

Route 禁止：

- 直接 `indexedDB.open`；
- 直接读 sessionStorage；
- 仅凭 route ticket；
- 仅凭 Admission ID；
- 仅凭 identity；
- 仅凭历史 Gravity；
- 生成 Transfer；
- 生成 Admission；
- 生成新 cycle。

合法 Direct URL：

```text
canonical legal Admission exists
→ RECOVER
```

非法 Direct URL：

```text
no legal Admission
→ GUARD
```

---

# 十四、完整消费者迁移矩阵

| 生产者 / 消费者 | 当前角色 | 裁决 | 目标 |
|---|---|---|---|
| Reality Pressure Candidate Source | Candidate producer | `ADAPT` | 输出 catalog revision 与 candidateRevisionReferenceId |
| Candidate Bundle | Presentation candidate snapshot | `ADAPT` | 保持 immutable，增加 typed revision proof |
| Reality Pressure Seed Capture Adapter | 同步纯校验 | `KEEP` | 作为 Recognition Controller 的纯 preflight，不再代表 durable success |
| Reality Production Pressure Seed Consumer | Host session producer | `ADAPT` | 只维护 Candidate Presentation；Recognition 成功来自 typed committed outcome |
| RealityPressureSeedPresentation | 用户 action surface | `ADAPT` | 只提交 typed command，不生成事实 |
| RealityProductionHost local Recognition | 当前成功真源 | `DELETE` | 删除 `setState` 成功权威；只消费 outcome |
| `pressureHostState` recognized session | 当前组件状态 | `ISOLATE` | 只做投影，不再拥有 Receipt |
| `innerViewApproachState` | 页面流程状态 | `ADAPT` | 从 committed Receipt 派生开放资格 |
| Reality Encounter Intent Controller | Reality intent owner | `MIGRATE` | 语义不变，persistence 迁入 common DB |
| Reality Intent Recovery Adapter | sessionStorage writer | `ISOLATE` | 旧 key read-only legacy；新写入清零 |
| Reality Route post-commit admission | Reality activation | `KEEP` | 继续形成 ACTIVE Reality；canonical store 接受其 typed outcome |
| Reality Route Activation Source | Reality source proof | `KEEP` | 只作为 current Intent 校验 |
| Recognition Command | 目前为 Capture command | `MIGRATE` | 增加 encounter、identity、candidate revision、expected revision |
| Recognition Fact / Receipt | 当前不存在 | `MIGRATE` | 由专属 Controller + common store 建立 |
| GravityEntryTransferRequest | Host 临时请求 | `MIGRATE` | 绑定 Receipt / revision / deterministic Transfer |
| RealityToGravityCutoverTransaction | 分步 sessionStorage commit | `MIGRATE` | 改为 common IDB atomic transaction |
| Gravity Entry Admission Controller | module + sessionStorage | `MIGRATE` | 语义保留，状态写入 common DB |
| Gravity Entry Recovery Adapter | Gravity sessionStorage owner | `ISOLATE` | 旧 key read-only legacy；新写入清零 |
| Gravity Source Supersession | 最后一步独立 commit | `MIGRATE` | 与 Transfer / Admission 同一 transaction |
| Gravity Route Ticket | History payload | `ADAPT` | 只从 committed record 派生 |
| Browser History | delivery channel | `ISOLATE` | 非权威 hint |
| Gravity Production Route | Admission consumer | `ADAPT` | 只通过 typed Controller recovery |
| Gravity Route Controller | route guard | `KEEP` | 保持唯一 Route decision |
| Gravity Host Typed Surface Outcome | active evidence | `KEEP` | 继续推进 Admission revision |
| Motion Surface | visual outcome | `KEEP` | 与 Static 使用同一 Admission |
| Reduced Motion Static Surface | visual outcome | `KEEP` | 语义相同 |
| Renderer | visual consumer | `REJECT` | 零 Receipt / Transfer / Admission Authority |
| DOM / data-* | observation mirror | `REJECT` | 零 Runtime input |
| Reality Life Universe Canvas | presentation | `KEEP` | 不读 DB |
| BroadcastChannel observer | 当前本链不存在 | `ADAPT` | 可通知重读，不携带 Authority |
| multi-tab stale consumer | 当前无 shared fence | `MIGRATE` | 依据 canonical revision 拒绝 |
| Direct URL guard | Controller-based | `ADAPT` | 改为 common recovery，Route 不读 DB |
| Gravity Observation Continuity | 下游 Authority | `KEEP` | 只消费合法 Admission，不拥有 Recognition |
| Choice Authority | 下游 Authority | `KEEP` | 保持不变 |
| Lived Growth Transaction Store | 下游 Growth | `ISOLATE` | 不读取或写入 Recognition domain |
| Choice Presentation Resolver | 当前 SAFE_WITHHELD | `KEEP` | 迁移关闭后再用 forward activation 解锁 |
| Existing Acceptance Harness | 辅助验收 | `ADAPT` | 增加真实多标签共同 DB 场景 |
| Existing Reality / Gravity Gates | 分散边界 | `ADAPT` | 保留语义并迁入专属 continuity gates |

---

# 十五、生命周期与失败矩阵

| 场景 | Canonical 结果 | 可见结果 | 禁止结果 |
|---|---|---|---|
| Candidate 出现 | 无 Receipt | 继续观察 | 自动认出 |
| 同 Candidate 首次认出 | Receipt committed | `SEED_RECOGNIZED` | transaction complete 前成功 |
| 同 Candidate 重试 | 恢复同 Receipt | 稳定 recognized | 第二 Receipt |
| 不同 Candidate 并发 | 第一 commit；第二 conflict | 第二标签重读 | 两边成功 |
| Recognition transaction abort | 无 Receipt | 克制重试 | 本地伪成功 |
| IDB open blocked | `SAFE_WITHHELD` | 说明暂不可继续 | sessionStorage fallback write |
| versionchange | 旧连接关闭 | 重连 / 重读 | 旧连接继续写 |
| quota / write failure | transaction abort | retryable / withheld | 成功文案 |
| Refresh after Recognition | 同 Receipt | 恢复 recognized | 新 Receipt |
| Back / Forward | 重读 canonical | 恢复稳定事实 | 恢复动画帧 |
| Host remount | 重读 canonical | 不重放 click | local state 补造 |
| Motion | 同 Receipt | Motion 表现 | 不同资格 |
| Reduced Motion | 同 Receipt | Static 表现 | 另一成功路径 |
| candidate revision stale | no mutation | `SAFE_WITHHELD` | 使用旧文本 |
| Body Approach | Transfer + Admission transaction | 承接中 | 单独 claim 成功 |
| Body Approach 双标签 | 一个 atomic commit | 另一标签恢复同 Transfer | 第二 Admission |
| Transfer txn abort | Receipt 仍 RECOGNIZED | 可同周期重试 | consumed 半状态 |
| navigation failure | Admission 保留 | 同 ticket / canonical retry | 新 cycle |
| Route Ticket 丢失 | canonical recovery | Direct URL 可恢复合法 Admission | route 自建 Admission |
| Direct URL 无 Admission | no mutation | Guard | identity-only pass |
| Gravity surface failure | Admission retryable | 真实失败 | ACTIVE |
| old surface outcome | stale reject | 无成功 | 推进 revision |
| 新 encounter | 新 record | 新候选 | 继承旧 Receipt |
| Explicit Leave | terminal transaction | 返回安全空间 | unload 自动清除 |
| 普通 unload / background | no mutation | 可恢复 | terminal |
| TTL expired | expired / terminal | 不补造 | 延长 TTL |
| legacy valid Admission | isolated recovery | 继续 Gravity | 补造 Receipt |
| higher Growth asset | higher asset wins | 对应恢复 | 重开 Choice / Recognition |
| legacy conflict | `SAFE_WITHHELD` | 安全空间 | 自动选赢家 |
| canonical corruption | `SAFE_WITHHELD` | 只读保护 | 覆盖修复 |
| observer message 丢失 | 下次主动重读 | 最终一致 | 依赖消息成功 |

---

# 十六、旧真源删除与隔离清单

未来同一 atomic commit 必须完成：

## 16.1 删除成功权威

- `RealityProductionHost.recognizePressureSeed` 中同步 success → `setPressureHostState`；
- Host 由 `captureState === "SEED_RECOGNIZED"` 自行宣告 durable recognition；
- Host 由 `gravityReadiness === "READY"` 自行宣告 cross-refresh readiness；
- `GravityEntryTransferRequest` 缺少 Receipt proof 的路径；
- Admission 随标签随机生成的路径；
- `writeRealityToGravityCutoverEnvelope()` 作为 canonical commit；
- `commitPreparedGravityTransfer()` 与 source supersession 的分步成功；
- sessionStorage 自读回成功；
- Gravity Route 从 legacy key 创建新 Admission lifecycle；
- Browser History Ticket 作为成功依据。

## 16.2 保留但降级

- Candidate Capture Adapter：纯校验；
- Reality Intent Controller：产品语义；
- Gravity Admission Controller：产品语义；
- Route Ticket：derived delivery；
- Motion / Static Surface Outcome：Active evidence；
- existing legacy snapshots：read-only compatibility。

## 16.3 明确隔离

- 旧 Reality sessionStorage key；
- 旧 Gravity sessionStorage key；
- 旧 Host local recognized state；
- 旧 opaque Admission IDs；
- 旧 Admission 不倒推 Receipt；
- 旧 higher Growth assets 不迁入本 store。

---

# 十七、未来单提交 Runtime 文件边界

以下是目标清单。

具体文件可在实施准备时因现有目录组织作等价调整，但不得跨出语义边界。

## 17.1 新增

```text
src/types/xinmaiRealityAdventureContinuity.ts

src/services/xinmaiRealityAdventureContinuityTransactionalStore.ts

src/services/xinmaiRealityAdventureContinuityLegacyAdapter.ts

src/services/xinmaiRealityAdventureContinuityRevisionObserver.ts

src/services/xinmaiRealityPressureRecognitionController.ts
```

## 17.2 修改

```text
src/types/realityPressureSeedCandidateSource.ts
src/types/realityPressureSeedCaptureContract.ts
src/types/realityProductionPressureSeedConsumer.ts
src/types/xinmaiRealityEncounterIntent.ts
src/types/xinmaiGravityEntryAdmission.ts
src/types/index.ts

src/services/realityPressureSeedCandidateSource.ts
src/services/realityPressureSeedCaptureAdapter.ts
src/services/realityProductionPressureSeedConsumer.ts
src/services/xinmaiRealityEncounterIntentController.ts
src/services/xinmaiRealityEncounterIntentRecoveryAdapter.ts
src/services/realityToGravityCutoverTransaction.ts
src/services/xinmaiGravityEntryAdmissionController.ts
src/services/xinmaiGravityEntryRecoveryAdapter.ts

src/components/RealityProductionHost.tsx
src/pages/RealityProductionRouteEntry.tsx
src/pages/GravityProductionRouteEntry.tsx

package.json
```

## 17.3 Gate / Acceptance

```text
scripts/check-xinmai-reality-adventure-continuity-store.mjs
scripts/check-xinmai-pressure-recognition-receipt-authority.mjs
scripts/check-xinmai-recognition-transfer-admission-atomicity.mjs
scripts/check-xinmai-recognition-cross-tab-fencing.mjs
scripts/check-xinmai-recognition-no-backfill.mjs
scripts/check-xinmai-legacy-session-storage-authority-forbidden.mjs
scripts/check-xinmai-gravity-route-canonical-recovery.mjs
scripts/check-xinmai-reality-adventure-safe-withheld-forward-rollback.mjs
```

需要同步校准的既有门禁：

- Reality production pressure host；
- Pressure Seed consumer；
- Reality Encounter Intent controller / recovery；
- Reality to Gravity atomic cutover；
- Gravity entry recovery；
- Gravity route post-commit admission；
- Gravity browser acceptance；
- Direct URL guard；
- Motion / Reduced Motion semantic parity。

## 17.4 禁止进入提交

- Renderer；
- Particle / Camera / Audio；
- Pressure Seed Engine；
- Six Dimension；
- AI；
- Choice Authority；
- Growth IDB schema；
- Crystal；
- Body Imprint；
- Phase 4；
- commercial state；
- unrelated baseline drift。

---

# 十八、未来 Atomic Cutover 顺序

同一个提交必须同时完成：

```text
建立 Reality Adventure Continuity DB
+
建立 common canonical record
+
迁移 Reality Intent persistence
+
建立 Candidate revision proof
+
建立 Recognition Controller / Receipt
+
迁移 Host consumer
+
迁移 Transfer / Admission transaction
+
迁移 source Reality supersession
+
迁移 Gravity Route recovery
+
旧 sessionStorage writers 清零
+
旧 Host success truth 清零
+
旧 random retry ID path 清零
+
新 Gate / Acceptance 注册
```

禁止可推送中间态：

```text
新 Receipt Authority
+
旧 Host local Authority
```

禁止：

```text
新 Admission Store
+
旧 Gravity sessionStorage writer
```

禁止：

```text
source Reality still sessionStorage authority
+
target Gravity IDB authority
```

---

# 十九、Forward SAFE_WITHHELD Rollback

未来 Runtime 候选必须准备新的 forward counter-commit。

目标结果：

```text
新的 Recognition mutation：
PAUSED / SAFE_WITHHELD

新的 Transfer mutation：
PAUSED / SAFE_WITHHELD

新的 Admission creation：
PAUSED / SAFE_WITHHELD

Canonical Reality Adventure Recovery：
READ-ONLY

既有合法 canonical Recognition / Transfer / Admission：
PRESERVED

既有合法 legacy Admission：
READ-ONLY RECOVERABLE

已有 Choice / Fact / Eligibility / Receipt / Crystal：
PRESERVED

旧 Host local Authority：
NOT RESTORED

旧 sessionStorage writers：
NOT RESTORED
```

Counter-commit 不得：

- 删除 canonical DB；
- 清空 V1 keys；
- 删除既有 Admission；
- 删除 Growth assets；
- 重新启用同步 Capture success；
- 重新启用 random Admission；
- 普通 revert 回旧双 Authority。

触发：

- 同 encounter 出现第二 Receipt；
- 同 Receipt 出现第二 Transfer；
- 同 Transfer 出现第二 Admission；
- source Reality 与 target Admission 半提交；
- transaction complete 前 UI 成功；
- old tab 覆盖 current record；
- legacy writer 在 cutover 后仍写；
- Direct URL 绕过 Controller；
- IDB blocked 后回落旧 writer；
- Remote clean snapshot 无法复现。

---

# 二十、真实浏览器并发验收矩阵

未来 Runtime Delivery 必须用正式：

- `/reality`；
- 正式 Pressure Candidate；
- 正式 Body Approach；
- 正式 `/dynamics`；
- 正式 typed Controller；
- 正式 canonical DB。

Harness 只能辅助。

## 20.1 Recognition

1. 单标签认出 Candidate；
2. transaction complete 前无成功；
3. 刷新恢复同 Receipt；
4. Back / Forward 恢复同 Receipt；
5. Host remount 不重放；
6. Motion / Reduced Motion 同 Receipt；
7. Candidate revision stale；
8. IDB blocked / abort / quota；
9. versionchange 旧连接关闭；
10. old callback late；
11. 同 Candidate 双标签同时认出；
12. 不同 Candidate 双标签竞争；
13. 最终 current Receipt = 1。

## 20.2 Transfer / Admission

1. Body Approach 形成 Transfer + Admission；
2. transaction abort 保留 Receipt 可重试；
3. 同 Receipt 双标签同时 Transfer；
4. 最终 Transfer = 1；
5. 最终 Admission = 1；
6. gravityCycleId = 1；
7. observationReferenceId = 1；
8. navigation failure 后复用同一 Admission；
9. Direct URL 恢复合法 Admission；
10. Direct URL 无 Admission 时 Guard；
11.旧 Route Ticket 晚到；
12. new encounter fences old tab；
13. source Reality supersession 与 Admission 一致；
14. 不存在 half transaction。

## 20.3 Legacy / Higher Assets

1. 只有 legacy Reality Intent；
2. Host local 曾认出但无 Receipt；
3. valid legacy Gravity Admission；
4. corrupted legacy Gravity snapshot；
5. Reality / Gravity legacy mismatch；
6. cutover 后 legacy writer detected；
7. existing Choice；
8. existing Fact；
9. existing Eligibility；
10. existing Formation Receipt / Crystal；
11. No Backfill；
12. legacy raw value preserved。

## 20.4 Presentation Truth

必须确认：

```text
transaction complete 前：
SEED_RECOGNIZED = 0

transaction complete 前：
GRAVITY_READY_TO_CONTINUE = 0

Transfer transaction complete 前：
route navigation = 0

write failure：
success copy = 0

Reduced Motion：
Authority semantics equal Motion
```

---

# 二十一、Gate 责任

未来必须建立：

1. Candidate Revision Authority Gate；
2. Reality Adventure Continuity DB Schema Gate；
3. Reality Intent Common Persistence Gate；
4. Recognition Receipt Unique Gate；
5. Transfer / Admission Atomic Gate；
6. Source Reality Supersession Atomic Gate；
7. Transaction Complete Success Gate；
8. Cross-tab Single Receipt Gate；
9. Cross-tab Single Admission Gate；
10. Old Callback Stale Gate；
11. Legacy Session Writer Forbidden Gate；
12. No Backfill Gate；
13. Direct URL Controller-only Gate；
14. Motion / Reduced Motion Semantic Parity Gate；
15. Forward SAFE_WITHHELD Gate。

门禁保护：

```text
typed semantics
+
transaction invariants
```

不长期冻结：

- 某句文案；
- 某个 DOM selector；
- 某个 data-*；
- 某个组件层级；
- 某段计时。

---

# 二十二、与现有 Growth IndexedDB 的边界

当前：

```text
xinmai-lived-growth-canonical
version 2
```

包含：

- canonical Growth envelope；
- migration meta；
- Eligibility index；
- Formation index；
- Crystal projection；
- Gravity Observation continuity。

它已经关闭：

- Growth transactional persistence；
- Choice atomic boundary；
- Observation continuity。

本迁移不需要与这些资产同事务写入。

因此：

```text
Reality Adventure Continuity DB
↓
产生合法 Gravity Admission
↓
Gravity Observation Continuity
↓
Choice / Growth DB
```

两个 physical DB 的交界只允许：

```text
typed committed Admission proof
```

不得：

- 在两个 DB 间伪装一个原子 transaction；
- Receipt transaction 同时写 Growth；
- Growth Store 回写 Recognition；
- Choice 倒推 Transfer；
- Formation Receipt 决定 Admission。

若未来要求：

```text
Admission 与 Observation 必须同事务产生
```

则属于新的红色 Migration Audit。

当前不需要。

---

# 二十三、对 Choice SAFE_WITHHELD 的影响

当前：

```text
Choice Presentation Resolver：
IMPLEMENTED / SAFE_WITHHELD
```

本审计不解除它。

正确顺序：

```text
Atomic Continuity Runtime
↓
正式 /reality Recognition
↓
同 Receipt Transfer
↓
同 Admission /dynamics
↓
远程干净快照关闭复验
↓
forward activation commit
解除 Choice SAFE_WITHHELD
↓
Choice Presentation Closure Revalidation
```

禁止：

- revert 旧 counter-commit；
- 先开放 Choice 再修入口；
- 用 Direct URL Fixture 证明可达；
- 把本迁移解释为 Choice Authority 变更。

---

# 二十四、Runtime Application 申请条件

进入 Runtime 前必须由 Product Control Tower 单独授权：

```text
XINMAI-REALITY-PRESSURE-SEED-RECOGNITION-
TRANSFER-ADMISSION-ATOMIC-CONTINUITY-
MIGRATION-P0
```

授权卡至少确认：

- Database / version / stores；
- exact schema；
- Candidate catalog revision；
- async Consumer cutover；
- Reality Intent persistence migration；
- legacy read-only adapter；
- Direct URL recovery；
- single commit file list；
- remote base；
- browser multi-tab plan；
- forward counter-commit plan；
- push hold。

---

# 二十五、交通灯扫描

## Green

```text
无
```

不能用窄修补关闭：

- Host local truth；
- sessionStorage cross-tab；
- split cutover。

## Yellow

```text
Candidate Catalog Revision 命名与发布版本治理
```

该项必须纳入未来 Runtime 输入契约。

它不需要独立新 Engine。

## Red

```text
Recognition / Transfer / Admission
必须进入同一 atomic persistence domain
```

这是本审计的主结论。

## 独立基线 Yellow

```text
mother-code-profile
```

继续独立治理。

不并入本迁移。

---

# 二十六、最终裁决

```text
Current Host Recognition Authority：
LEGACY LOCAL / MUST DELETE

Current Reality Intent sessionStorage Authority：
MUST MIGRATE

Current Gravity sessionStorage Authority：
MUST MIGRATE

Recognition Receipt：
RUNTIME MISSING

Transfer Reference：
RUNTIME MISSING

Cross-tab Canonical Authority：
RUNTIME MISSING

Current Cutover Atomicity：
FAIL

SessionStorage Extension：
REJECT

Web Lock + SessionStorage：
REJECT

localStorage CAS：
REJECT

BroadcastChannel Authority：
REJECT

IndexedDB Common Transaction：
ACCEPT

Reuse xinmai-lived-growth-canonical：
REJECT FOR P0

New Reality Adventure Continuity DB：
ACCEPT

NO BACKFILL：
REQUIRED

Forward SAFE_WITHHELD：
REQUIRED

Double Authority Risk：
FOUND / MUST ATOMIC CUTOVER

Atomic Migration Feasibility：
PASS

最终决策：
NOW — ATOMIC MIGRATION APPLICATION READY
```

---

# 二十七、下一刀建议

```text
XINMAI-REALITY-PRESSURE-SEED-RECOGNITION-
TRANSFER-ADMISSION-ATOMIC-CONTINUITY-
MIGRATION-P0

交通灯：
RED

刀型：
Migration Blade / Atomic Cutover

决策：
DEFER — 等待 Product Control Tower Runtime Authorization

主 Layer：
Layer 4 Growth / Reality Adventure Entry

保护：
World
Identity
Relationship
Growth Transactional Persistence
Gravity Observation Continuity

Runtime Push：
HOLD — 候选验收与 forward counter-commit 完成前禁止推送
```

该 Runtime 刀的唯一目标：

```text
Host local Recognition
+
Reality sessionStorage
+
Gravity sessionStorage
↓
一个 Reality Adventure Continuity IndexedDB 真源
↓
一个 Receipt
↓
一个 Transfer
↓
一个 Admission
```

完成后固定进入：

```text
XINMAI-REALITY-PRESSURE-SEED-RECOGNITION-
TRANSFER-ADMISSION-ATOMIC-CONTINUITY-
RUNTIME-CAUSAL-CLOSURE-REVALIDATION-P0
```

在该关闭复验完成前：

```text
Choice Presentation：
SAFE_WITHHELD

Visual Runtime：
DEFER

Phase 3：
ACTIVE / NOT PASSED

Phase 4：
LOCKED
```
