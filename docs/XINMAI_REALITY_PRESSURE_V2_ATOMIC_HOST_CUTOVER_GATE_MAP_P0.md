# XINMAI Reality Pressure V2 Atomic Host Cutover Gate MAP P0

任务编号：

```text
XINMAI-REALITY-PRESSURE-V2-ATOMIC-HOST-CUTOVER-GATE-MAP-P0
```

项目：

```text
/Users/xieyanjun/Desktop/guanyao-h5
```

刀型：

```text
MAP
```

决策：

```text
NOW — MAP ONLY
```

Runtime 修改：

```text
0
```

Gate 修改：

```text
0
```

---

# 一、Construction State Card

```text
当前 Phase：
Phase 2 CLOSED

RealityEncounterIntent Delivery：
CLOSED

Phase 3：
LOCKED

主 Layer：
Layer 4 | Growth Entry Boundary

保护 Layer：
Layer 3 | Relationship

本刀消费者：
Reality Pressure V2 Atomic Host Cutover Gate

是否改变状态权威：
NO

是否新增消费者：
NO

是否改变 Renderer 输入：
NO

是否修改 Runtime：
NO

施工决定：
NOW — MAP ONLY
```

---

# 二、唯一目标

本刀只裁决：

```text
explicitGravityContinuationCallbackOnly: true
```

在当前 `RealityProductionHostBoundary` 中缺失，究竟属于：

```text
旧门禁未同步
```

还是：

```text
Host 的显式 Gravity Continuation 契约发生未授权漂移
```

本刀不：

- 修改检查；
- 修改 Host；
- 修改 Route；
- 修改 Gravity；
- 修改 Pressure Seed；
- 修改 Phase 边界；
- 恢复旧 callback；
- 提前实施 Phase 3。

---

# 三、黄灯复现

基线：

```text
5cea91e37d70ff6c7064640d2a65f1991b59e7ca
```

执行：

```text
node scripts/check-reality-pressure-v2-atomic-host-cutover.mjs
```

结果：

```text
[REALITY PRESSURE V2 ATOMIC HOST CUTOVER] FAIL
atomic Host boundary missing=explicitGravityContinuationCallbackOnly: true
```

失败前已经通过：

- V2 Pressure Seed Consumer 已接入；
- Pressure Seed Continuation 已接入；
- Pressure Activation Delivery Orchestration 已接入；
- Pressure Seed Recognition 为显式动作；
- 下一组 Reality Seed 为显式动作；
- Host 未执行 V1 Pressure Consumer；
- Host 未执行 Gravity Consumer；
- Host 未执行 Choice Consumer；
- Host 无自动选择；
- Host 无存储；
- Host 无导航；
- `data-gravity-stage="NOT_STARTED"` 仍存在。

因此当前失败收敛为一个边界字段：

```text
explicitGravityContinuationCallbackOnly
```

---

# 四、旧契约语义

旧边界：

```text
explicitGravityContinuationCallbackOnly: true
```

对应的 Runtime 关系是：

```text
RealityProductionHost
↓
onContinueToGravity(selectedPressureSeedContext)
↓
Route 继续进入 Gravity
```

该契约只证明：

1. Host 不直接执行 Gravity；
2. 用户认出 Pressure Seed 后，由 callback 向 Route 提交继续意愿；
3. callback 载荷主要是 `SelectedPressureSeedContext`；
4. Route 与 Gravity 之间尚未建立独立的 typed admission 与 atomic cutover。

它适用于旧的显式继续阶段，但不能表达当前完整的 Reality → Gravity 因果。

---

# 五、当前权威契约

当前 `RealityProductionHostBoundary` 已冻结：

```text
typedGravityTransferRequestOnly: true
noGravityExecution: true
noStorageRead: true
noStorageWrite: true
noNavigationMutation: true
```

当前 `RealityProductionRouteEntryBoundary` 已冻结：

```text
typedGravityTransferRequestOnly: true
gravityCutoverTransactionRequired: true
noGravityExecution: true
```

当前 Props 契约：

```text
onRequestGravityTransfer:
(
  request: GravityEntryTransferRequest
)
=> RealityToGravityCutoverTransactionResult
```

因此旧关系已经升级为：

```text
用户主动靠近当前生命身体
↓
RealityProductionHost 组装 GravityEntryTransferRequest
↓
Route 执行 RealityToGravityCutoverTransaction
↓
Recovery Envelope 先确认
↓
Gravity Admission READY
↓
Reality Intent 原子 supersede
↓
只在 COMMITTED 后导航 /dynamics
```

这不是删除显式继续。

而是把：

```text
普通 callback
```

升级为：

```text
类型化请求
+
原子迁移事务
+
可恢复切换
```

---

# 六、用户主动性是否仍然存在

当前 Host 只有在以下事实全部成立时才提交 Transfer Request：

```text
innerViewApproachState === "AWAITING_BODY_APPROACH"
+
pressureSeedSession.gravityReadiness === "READY"
+
selectedPressureSeedContext !== null
+
captureProvenance !== null
+
Reality Interaction ACTIVE
+
Intent / encounter cycle / revision 一致
+
三项身份引用一致
```

请求继续携带：

```text
userExplicitRequest: true
```

身体靠近证明继续携带：

```text
innerViewEntry:
CURRENT_LIFE_WEATHER_BODY_APPROACHED

bodyApproachConfirmed:
true
```

因此：

```text
Explicit User Continuation：
PRESERVED
```

只是其权威表达不再是旧边界名：

```text
explicitGravityContinuationCallbackOnly
```

而是：

```text
typedGravityTransferRequestOnly
```

---

# 七、Runtime 单一因果链

当前唯一合法链：

```text
Reality Pressure Seed 被用户认出
↓
gravityReadiness = READY
↓
用户主动靠近同一生命身体
↓
Host 产生 GravityEntryTransferRequest
↓
Route 消费 typed request
↓
RealityToGravityCutoverTransaction
↓
Recovery Envelope CONFIRMED
↓
Gravity Admission READY_TO_ENTER_GRAVITY
↓
Reality ACTIVE 被 supersede
↓
COMMITTED
↓
Route Ticket
↓
/dynamics
```

不存在合法旁路：

- `gravityReadiness === READY` 自动导航；
- Pressure Seed 被认出后自动进入 Gravity；
- Host 直接调用 Gravity Consumer；
- Host 直接写 Selected Pressure Seed 存储；
- Host 直接导航；
- 固定计时器提交成功；
- Renderer 提交 Gravity；
- Choice 提交 Gravity；
- identity-only 进入 Gravity。

---

# 八、生产者与消费者表

| 生产者 | 输出 | 直接消费者 | 当前权威 |
|---|---|---|---|
| Pressure Seed Consumer | `gravityReadiness`、已认出的 Pressure Session | Reality Host | Reality 状态事实 |
| 用户身体靠近动作 | `bodyApproachConfirmed` | Reality Host | 用户显式动作 |
| Reality Host | `GravityEntryTransferRequest` | Reality Route callback | Typed Transfer Producer |
| Reality Route | Transfer Request | Atomic Cutover Transaction | Transaction Owner |
| Gravity Admission Controller | Prepared / Ready Admission | Cutover Transaction | Gravity Entry Authority |
| Recovery Adapter | Confirmed Cutover Envelope | Cutover Transaction / Recovery | 唯一持久化边界 |
| Reality Intent Controller | Source Supersession | Cutover Transaction | Reality Source Authority |
| Cutover Transaction | `COMMITTED + GravityRouteTicket` | Route | 唯一切换提交点 |
| Route | `/dynamics` navigation | Gravity Route | 只消费 COMMITTED |

禁止消费者：

```text
Renderer
AI Reflection
Six Dimension
Choice
Crystal
Archive Growth
Relationship Naming
Life Whisper 原始文本
```

---

# 九、历史迁移证据

## 9.1 旧显式 callback 建立

提交：

```text
3c60e7e
feat: reveal gravity as repeated life response
```

将旧 Hold 语义升级为：

```text
explicitGravityContinuationCallbackOnly
```

并建立：

```text
onContinueToGravity(selectedPressureSeedContext)
```

## 9.2 旧门禁同步

提交：

```text
cf24a9c
test(reality): align v2 gravity handoff boundary gate
```

把检查中的：

```text
gravityReadinessHoldOnly
```

更新为：

```text
explicitGravityContinuationCallbackOnly
```

## 9.3 当前 Atomic Authority 建立

提交：

```text
80f2678
feat(xinmai): establish gravity entry admission authority
```

原子替换：

```text
explicitGravityContinuationCallbackOnly
↓
typedGravityTransferRequestOnly
```

同时替换：

```text
onContinueToGravity(selectedPressureSeedContext)
↓
onRequestGravityTransfer(GravityEntryTransferRequest)
```

并建立：

```text
gravityCutoverTransactionRequired
```

但该提交没有同步：

```text
check-reality-pressure-v2-atomic-host-cutover.mjs
```

因此当前黄色失败的直接来源是：

```text
Runtime Atomic Migration
↓
Boundary Authority Upgrade
↓
Historical Gate Not Calibrated
```

---

# 十、邻接证据

当前基线：

```text
check-reality-production-route-entry:
PASS

check-xinmai-reality-to-gravity-atomic-cutover:
PASS

check-xinmai-gravity-entry-admission-controller:
PASS
```

这些门禁共同证明：

- Route 已消费 typed Gravity request；
- 固定计时器成功路径为零；
- Route 只在 atomic cutover `COMMITTED` 后导航；
- Recovery Envelope 先于 source/target commit；
- Gravity Admission 拥有独立 cycle；
- Controller 不拥有导航或存储；
- Reality Host 没有重新获得 Gravity 执行权。

因此目标门禁失败不能解释为 Runtime 回退。

---

# 十一、同源门禁漂移

审计发现：

```text
scripts/check-reality-production-choice-host.mjs
```

也仍然断言：

```text
explicitGravityContinuationCallbackOnly: true
```

并以相同原因失败。

该检查的核心目标是：

> Reality Production Host 不执行 Choice。

当前 Host 的：

```text
noChoiceExecution: true
```

仍然存在。

因此该失败也是同一边界迁移造成的门禁漂移，不是 Choice Runtime 泄漏。

根据施工纪律：

- 本刀记录；
- 本刀不修复；
- 不以该发现绕过当前 MAP；
- 后续由独立绿色小刀校准。

---

# 十二、裁决

```text
explicitGravityContinuationCallbackOnly：
SUPERSEDED BOUNDARY MARKER

当前权威字段：
typedGravityTransferRequestOnly

Route 原子迁移要求：
gravityCutoverTransactionRequired

用户显式继续：
PRESERVED

Host 直接执行 Gravity：
NO

Host 直接导航：
NO

Host 直接存储：
NO

Gravity 第二真源：
NO EVIDENCE

Runtime 契约漂移：
NO

Gate 漂移：
YES

Phase 3：
LOCKED
```

最终结论：

```text
XINMAI Reality Pressure V2 Atomic Host Cutover Gate MAP：
CLOSED / ACCEPTED
```

目标失败分类：

```text
STALE GATE AFTER AUTHORIZED ATOMIC MIGRATION
```

---

# 十三、正确门禁语义

后续校准应验证：

## Host Boundary

```text
typedGravityTransferRequestOnly: true
noGravityExecution: true
noStorageRead: true
noStorageWrite: true
noNavigationMutation: true
```

## Explicit User Proof

```text
userExplicitRequest: true
bodyApproachConfirmed: true
CURRENT_LIFE_WEATHER_BODY_APPROACHED
```

## Route Boundary

```text
gravityCutoverTransactionRequired: true
```

## Atomic Commit

```text
navigate only after COMMITTED
```

禁止重新冻结：

- 用户可见文案；
- `onContinueToGravity`；
- `SelectedPressureSeedContext` 直接 handoff；
- 固定时间延迟；
- DOM `data-*` 作为 Runtime 证据。

---

# 十四、交通灯扫描

## GREEN｜目标门禁窄修正

下一刀：

```text
XINMAI-REALITY-PRESSURE-V2-ATOMIC-HOST-CUTOVER-GATE-CORRECTION-P0
```

刀型：

```text
Refinement / Gate Correction
```

决策：

```text
NOW — STRICT GREEN SCOPE
```

只允许修改：

```text
scripts/check-reality-pressure-v2-atomic-host-cutover.mjs
```

唯一目标：

> 用当前 typed transfer 与 atomic cutover 结构事实替换已经废弃的普通 callback 边界断言。

## GREEN｜同源但独立

后续另开：

```text
XINMAI-REALITY-PRODUCTION-CHOICE-HOST-BOUNDARY-GATE-CORRECTION-P0
```

只校准 Choice Host Isolation Gate 中同一个废弃边界字段。

不得吞入第一张绿色修正。

## YELLOW

Phase 3 Entry Authority Review 继续保持独立。

在所有入口门禁校准完成前：

```text
Phase 3:
LOCKED
```

## RED

当前没有新的 Runtime 双路径。

如果后续试图恢复：

```text
onContinueToGravity
```

并与：

```text
onRequestGravityTransfer
```

并存，则必须：

```text
REJECT
```

若必须更换 typed transfer 或 atomic cutover 真源，则升级为：

```text
Migration Audit
```

不得作为门禁修正处理。
