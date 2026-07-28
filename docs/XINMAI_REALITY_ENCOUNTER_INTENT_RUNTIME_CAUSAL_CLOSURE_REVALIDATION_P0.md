# XINMAI Reality Encounter Intent Runtime Causal Closure Revalidation P0

## 0. 审计裁决

```text
交通灯：
GREEN + YELLOW CLOSURE MAP

刀型：
MAP / Readiness Revalidation

决策：
NOW — RUNTIME CORRECTION APPLICATION READY

Runtime：
本刀未修改

Phase 1：
CLOSED

Phase 2：
CLOSED

Atomic Cutover：
PASS

RealityEncounterIntent Runtime Causal Closure：
OPEN

Delivery：
NOT CLOSED

Phase 3：
LOCKED
```

本审计确认：

1. 当前 Runtime 中没有重新出现 `identity-only` 成功路径；
2. `ACTIVE_IN_REALITY` 仍只有 Controller 一个状态权威；
3. 四项已知缺口全部真实存在；
4. TTL 与 Route Boundary 是独立绿色修正；
5. Typed Surface Outcome 与 Controller Commit Transaction 共享同一个 ACTIVE 因果边界，必须作为一张黄色 Major Correction 原子关闭；
6. 当前具备向 Product Control Tower 申请两张独立 Runtime 施工卡的条件，但本刀不自动实施任何修正。

---

## 1. 审计基线与证据等级

唯一审计基线：

```text
Branch:
codex/genesis-28-mansion-production-continuity

Remote HEAD:
676f4a228f2bcc673af735a931dce787fd1c3355
```

审计在与该远程 HEAD 一致的隔离干净快照中完成。主工作树的既存修改没有参与事实判断。

证据等级：

|证据|本刀用途|能证明什么|不能替代什么|
|-|-|-|-|
|冻结协议|确认目标权威|产品语义与禁止语义|当前 Runtime 事实|
|当前源码|核对生产者、消费者、时点|当前实现结构|真实浏览器呈现|
|自动门禁|核对既有正负向边界|已覆盖断言继续通过|尚未编写的关闭门禁|
|Build|核对编译与生产打包|工程可构建|因果正确|
|真实浏览器|未来 Runtime 关闭证据|路径可达与实际呈现|本 MAP 的代码事实扫描|

本刀没有使用 Lab、Preview、Fixture 或 DOM 节点存在作为 Runtime 成功证据。

---

## 2. 当前权威链复验

当前正向链：

```text
Genesis / Returning / Choice
明确请求 Reality
        ↓
RealityEncounterIntent Controller
READY_TO_ENTER_REALITY
        ↓
RealityProductionRouteEntry render
useMemo 调用 establishRealityEncounterAdmission
        ↓
Controller 写入 ACCEPTING_REALITY + Recovery
        ↓
Route Authorization / Activation Source / Candidate / Delivery
        ↓
RealityProductionHost
requestAnimationFrame + DOM querySelector
        ↓
RealityHostAcceptanceOutcome
        ↓
RealityProductionRouteEntry
        ↓
Controller.commitRealityEncounterActive
        ↓
ACTIVE_IN_REALITY
```

当前正确部分：

- `encounterCycleId` 只由 Controller 生成；
- Genesis、Returning、Choice 只申请 Intent，不自行声明 Active；
- Route 必须取得 Controller Admission；
- Authorization 与 Activation Source 都携带 intent、cycle、revision；
- Controller 在提交 Active 前校验 intent、cycle、revision、source 与过期时间；
- 旧 revision outcome 会被拒绝；
- Intent Recovery Storage 只由 Intent Recovery Adapter 直接访问；
- Route 不直接访问 `sessionStorage`；
- Renderer、AI、Pressure Seed 内容生产、六维、Gravity、Crystal 均不是 Intent Controller 消费者。

当前未闭合部分：

- TTL 与 PREP 不一致；
- Host 的成功事实来自 DOM 结构探测，不来自 Surface typed outcome；
- Route Boundary 把“无直接 Storage 读取”写成了模糊的“无 Storage 读取”；
- Route 在 React render / `useMemo` 阶段启动 Admission 并写 Controller 与 Recovery。

因此：

```text
Single ACTIVE Authority:
PASS

ACTIVE Causal Evidence:
PARTIAL

Render Transaction Purity:
FAIL

Recovery Declaration Accuracy:
PARTIAL
```

---

## 3. 缺口一：Recovery TTL

### 3.1 权威目标

权威来源：

- `XINMAI_REALITY_ENCOUNTER_INTENT_AUTHORITY_MAJOR_BLADE_PREP_P0.md`
- `19.6 TTL`

冻结值：

```text
RECOVERY_TTL = 2 hours
```

语义：

- 足以覆盖一次完整体验与刷新；
- 不把历史 Intent 变成长久通行证；
- 只约束当前 encounter 的恢复资格；
- 不代表用户明确离开。

### 3.2 当前实现

唯一 Runtime 常量位于：

```text
src/services/xinmaiRealityEncounterIntentController.ts

const INTENT_TTL_MS = 24 * 60 * 60 * 1_000;
```

当前值：

```text
24 hours
```

扫描结论：

- 生产 Runtime 没有第二个 TTL 常量；
- Recovery Adapter 不提供默认 TTL；
- Route Authorization 只校验 Admission 的 `expiresAt`；
- 当前 recovery 检查脚本使用自建 `expiresAt`，但没有验证 2 小时常量、临界时间或刷新不续期；
- Controller 检查脚本没有冻结时钟，也没有覆盖过期边界。

### 3.3 TTL 从何时开始

当前：

```text
issuedAt
=
RealityEncounterRequestInput.requestedAt
或 Controller 当前时间

expiresAt
=
issuedAt + INTENT_TTL_MS
```

三个生产调用者均未传入 `requestedAt`，因此当前生产路径实际从 Controller 接受用户明确请求的时刻开始。

目标冻结：

> TTL 从 Controller 首次确认本轮明确请求、创建 `READY_TO_ENTER_REALITY` 的权威时点开始。

`requestedAt` 不得成为生产者扩展 TTL 的入口。未来门禁必须证明生产调用者无法用未来时间扩大恢复窗口。

### 3.4 刷新、重试与状态变化

当前 `nextIntent`：

- 更新 `updatedAt`；
- 增加 revision；
- 不修改 `issuedAt`；
- 不修改 `expiresAt`。

因此当前事实为：

|动作|是否延长 TTL|是否生成新 cycle|
|-|-|-|
|刷新恢复|NO|NO|
|同周期重试|NO|NO|
|READY → ACCEPTING|NO|NO|
|ACCEPTING → FAILED_RETRYABLE|NO|NO|
|ACCEPTING → ACTIVE|NO|NO|
|Recovery 写入|NO|NO|

目标继续冻结：

```text
refresh extends TTL:
0

retry extends TTL:
0

state transition extends TTL:
0
```

### 3.5 READY 与 ACTIVE

`READY_TO_ENTER_REALITY` 与 `ACTIVE_IN_REALITY` 当前共享同一个 `expiresAt`。

目标冻结：

- 两者使用同一 recovery TTL；
- TTL 是恢复资格，不是已挂载 Reality 的强制退出计时器；
- 当前页面已 Active 且持续运行时，不因时钟到点自动把用户踢出；
- Active 页面刷新时，若 recovery TTL 已过期，不得恢复旧 encounter 为 Active。

### 3.6 过期语义

过期只处理 Intent：

```text
current Intent
→ TERMINAL / INTENT_EXPIRED
```

过期不得：

- 清除生命身份；
- 清除二十八宿；
- 清除 StarBeast Identity；
- 清除关系名；
- 清除历史 Reality；
- 清除 Crystal；
- 自动生成新 `encounterCycleId`；
- 产生 Pressure Seed、Choice 或 Crystal 副作用。

用户之后再次明确开始新的 encounter 时，Controller 才能创建新 cycle。

### 3.7 测试冻结

未来绿色 TTL 刀必须覆盖：

1. `issuedAt + 2h - 1ms`：可恢复；
2. `issuedAt + 2h`：过期；
3. `issuedAt + 2h + 1ms`：过期；
4. READY 与 ACTIVE 使用相同 `expiresAt`；
5. 刷新不续期；
6. 同周期重试不续期；
7. revision 更新不续期；
8. 过期不生成新 cycle；
9. 过期不清身份与关系资产；
10. 系统时钟向前跳跃：按过期处理；
11. 系统时钟回拨：不得把 snapshot 的有效期扩展到 `issuedAt + 2h` 之外；
12. 非法、反向或超出最大窗口的时间字段：恢复候选无效，不得成为 Active。

测试应使用可控时钟或 fake timers，不应通过生产调用者伪造未来 `requestedAt`。

### 3.8 交通灯

```text
TTL Correction:
GREEN REFINEMENT
```

理由：

- 单一常量与对应门禁修正；
- 不改变状态权威；
- 不新增消费者；
- 不改变 Route、Host、Renderer 契约；
- 可独立回滚；
- 与 Typed Surface Outcome 没有真实因果依赖。

---

## 4. 缺口二：Typed Reality Surface Outcome

### 4.1 当前事实

当前 Host 在一个 `requestAnimationFrame` 回调中：

1. 读取 `minimumSurfaceRef`；
2. `querySelector("canvas")`；
3. `querySelector('[data-pressure-seed-presentation="V2"]')`；
4. 检查节点存在与 `isConnected`；
5. 读取 `matchMedia`；
6. 直接报告 `REALITY_MINIMUM_PRESENTED`。

这只能证明：

- React 已提交对应 DOM 节点；
- 节点仍连接；
- 当前媒体偏好是什么。

它不能证明：

- WebGL 已完成第一帧；
- Reduced Motion 静态生命主体已实际呈现；
- Renderer 没有处于 `BLOCKED`；
- Renderer 没有处于 `FALLBACK_REQUIRED`；
- Pressure Candidate Surface 的当前 bundle 已完成自己的呈现承诺；
- Surface outcome 属于当前 Admission；
- Surface 在 outcome 到达前没有中断。

当前门禁中的“Host reports real minimum surface outcome”只检查成功字符串与 DOM connected 判断，不能关闭该缺口。

### 4.2 目标生产者

目标冻结三层事实：

```text
RealityLifeUniverseCanvas
→ Life Surface typed outcome

RealityPressureSeedPresentation
→ Pressure Surface typed outcome

RealityProductionHost
→ 唯一 Composite Host Acceptance Outcome
```

因此：

- Life Surface 是生命主体呈现事实的唯一生产者；
- Pressure Surface 是候选观察面呈现事实的唯一生产者；
- Host 是组合后的 `RealityHostAcceptanceOutcome` 唯一生产者；
- Controller 仍是 `ACTIVE_IN_REALITY` 唯一权威；
- Renderer 只提供视觉帧事实，不拥有 Intent 或关系状态。

### 4.3 Typed Outcome 最低契约

两类 child outcome 均必须携带：

```text
intentReferenceId
encounterCycleId
sourceReferenceId
starBeastIdentityReferenceId
mansionCoordinateReferenceId
admissionRevision
surfaceOutcome
presentationMode
failureReason
occurredAt
```

最低 outcome：

```text
PRESENTED
PRESENTED_STATIC
UNAVAILABLE
INTERRUPTED
STALE
```

禁止压缩为：

```text
boolean
DOM exists
data-* value
CSS animation finished
fixed timeout elapsed
```

### 4.4 Motion 成立条件

Life Surface `PRESENTED` 只有在以下事实成立后产生：

```text
当前 Admission refs 一致
+
Renderer initialization READY
+
当前 WebGL context 可用
+
当前 controller 完成至少一个真实 renderFrame
+
canvas 仍属于当前 Surface
+
未收到 context lost / interrupted
```

Pressure Surface `PRESENTED` 只有在：

```text
当前 Admission refs 一致
+
当前 V2 session READY
+
当前 candidate bundle 已由该 Surface commit
+
Surface 未卸载
```

Host 只有收到同一 Admission 的两项 `PRESENTED` 才可组合成功。

### 4.5 Reduced Motion 成立条件

Reduced Motion 不等于“跳过呈现”。

`PRESENTED_STATIC` 必须来自：

- Renderer 的真实 reduced-motion 静态帧完成；
- 或明确实现、实际挂载且身份一致的 semantic static life surface；
- 同一 V2 candidate surface 已呈现。

仅 `matchMedia("(prefers-reduced-motion: reduce)")` 为 true 不构成 outcome。

### 4.6 降级呈现

冻结：

|情况|允许 ACTIVE|原因|
|-|-|-|
|WebGL Motion 已真实呈现|YES|`PRESENTED`|
|Reduced Motion 静态同体生命已真实呈现|YES|`PRESENTED_STATIC`|
|WebGL fallback，但没有静态同体生命 Surface|NO|`UNAVAILABLE`|
|Candidate 初始化失败|NO|最低 Reality 不完整|
|Candidate Surface 未呈现|NO|最低 Reality 不完整|
|仅 DOM canvas 存在|NO|不是视觉 outcome|
|仅压力 section 存在|NO|不是组合 outcome|

若未来实现真实的静态降级 Surface，它必须通过同一 typed outcome 契约，而不是由 Host 猜测。

### 4.7 Host 校验

Host 聚合前必须校验：

- `intentReferenceId`；
- `encounterCycleId`；
- 三项身份引用；
- `admissionRevision`；
- outcome 的 surface kind；
- 两项 outcome 均属于当前 admission attempt；
- outcome 未被中断或标记 stale；
- 当前 Host 仍挂载；
- 组合 outcome 尚未报告。

任何不一致：

```text
→ STALE
→ 不调用成功 commit
→ 不改变 ACTIVE
```

Controller 仍需再次校验同一组关键引用，不信任 Host 单独判断。

### 4.8 卸载、中断与失败

Surface 在 Active 前发生：

- 卸载；
- context lost；
- Renderer 初始化失败；
- render frame 中断；
- candidate session 不可用；
- admission 被替换；

必须报告或由 Host归纳为：

```text
UNAVAILABLE / INTERRUPTED / STALE
```

该结果进入：

```text
Controller.failAcceptance
→ FAILED_RETRYABLE
```

Active 之后的普通 Surface 生命周期不反向伪造另一条入口提交；后续 Reality 内部恢复属于独立问题。

### 4.9 DOM 通道删除

未来黄色刀必须完整删除 Host 中作为成功输入的：

```text
minimumSurfaceRef.current
querySelector("canvas")
querySelector('[data-pressure-seed-presentation="V2"]')
```

`data-*` 可以继续存在，但只能作为：

- 观测镜像；
- 自动化定位；
- 验收证据；
- 无权威调试信息。

不得继续作为：

- Surface 成功输入；
- Controller commit 输入；
- Active 判定；
- failure recovery 判定。

### 4.10 交通灯

```text
Typed Surface Outcome:
YELLOW MAJOR CORRECTION
```

理由：

- 新增 typed 输入输出契约；
- 增加 Surface → Host 消费关系；
- 改变 Host 的成功证据来源；
- 直接影响 ACTIVE 因果；
- 必须与 Controller Commit Transaction 一起原子关闭。

---

## 5. 缺口三：Route Recovery Boundary

### 5.1 当前直接 Storage 扫描

对 `RealityProductionRouteEntry.tsx` 的扫描结果：

```text
direct sessionStorage call:
0

direct localStorage call:
0

Intent Recovery Adapter import:
0

persisted identity service direct import:
0
```

因此当前没有恢复因果旁路。

### 5.2 Identity Recovery 边界

Route 唯一消费：

```text
recoverRealityRecognizedIdentity()
```

该 typed adapter：

- 读取既有 recognized identity 来源；
- 读取或恢复 visual continuity；
- 读取 presence realization；
- 恢复 Reality Entry Context；
- 校验 `sourceReferenceId`；
- 提取并校验 StarBeast identity reference；
- 提取并校验 mansion coordinate reference；
- 返回三项身份一致的 typed result。

它是 Route 的唯一 Identity Recovery reader。

它不是身份写者。身份与视觉资产仍由既有 Genesis / Session 资产写者拥有，本刀不迁移这些职责。

### 5.3 Intent Recovery 边界

唯一直接 Reader / Writer：

```text
xinmaiRealityEncounterIntentRecoveryAdapter
```

Route 不导入它。

当前间接链：

```text
Route
→ RealityEncounterIntent Controller
→ Intent Recovery Adapter
→ sessionStorage
```

Controller：

- 读取恢复候选；
- 校验 intent reference；
- 校验三项身份；
- 校验 TTL；
- 校验 state；
- 把候选重新建立为当前 Runtime Admission；
- 通过 Adapter 写入新 revision。

Route 消费的是 Controller 返回的 Admission 权威，不是 Storage 候选。

### 5.4 直接 URL 与刷新

直接 URL：

- Route State 可以没有 intent reference；
- Identity Recovery 必须成功；
- Controller 可以尝试读取 matching recovery candidate；
- 无候选、候选损坏、身份失配或过期时，Route 不获得 Admission；
- 不允许 identity-only authorization。

刷新：

- 保留同一个 recovery candidate；
- Controller 校验后恢复同一个 cycle；
- `ACTIVE_IN_REALITY` candidate 重新经过 RECOVERING、ACCEPTING 与 Host commit；
- 刷新本身不生成新 cycle；
- Storage 字段本身不构成 Active。

### 5.5 失真的边界声明

当前：

```text
inMemoryRealityEntryContextOnly: true
noStorageRead: true
```

问题：

- Identity Adapter 可以恢复 persisted Reality Entry Context，因此 `inMemoryRealityEntryContextOnly` 已不准确；
- Route 没有直接 Storage 读取，但通过 typed adapters 间接恢复，`noStorageRead` 无法表达这一区别。

目标声明：

```text
typedIdentityRecoveryAdapterConsumptionOnly: true
typedIntentRecoveryViaControllerOnly: true
noDirectStorageRead: true
recoveryCandidateIsNotAuthority: true
identityOnlyAuthorizationForbidden: true
```

需要删除或替换：

```text
inMemoryRealityEntryContextOnly
noStorageRead
```

### 5.6 交通灯

```text
Route Recovery Boundary:
GREEN REFINEMENT
```

理由：

- 没有真实恢复旁路；
- 不改变 Runtime 权威；
- 只是使 boundary type、boundary object 与现有事实一致；
- 可与 TTL 作为同一绿色关闭刀交付；
- 不需要进入黄色 Major Correction。

---

## 6. 缺口四：Controller Commit Transaction

### 6.1 当前 render-phase 副作用

`RealityProductionRouteEntry` 当前在 `useMemo` 中调用：

```text
establishRealityEncounterAdmission()
```

该 Controller command 可能：

- 读取 Recovery；
- 写 `currentIntent`；
- READY → ACCEPTING；
- ACTIVE → RECOVERING → ACCEPTING；
- 增加 revision；
- 写 Recovery snapshot。

同一页面另一个 `useMemo` 还会：

```text
clearRealityRouteActivationSourceContext()
activateRealityRouteActivationSourceContext()
```

因此当前 render 不是纯读取与纯计算。

虽然 Controller 对“已经 ACCEPTING 的同一 Intent”会返回现有 Admission，降低了部分重复 revision 风险，但这不能解决：

- React Strict Mode 重复 render；
- speculative render；
- abandoned render；
- 快速 Route 切换；
- 未 commit 的 React tree 已推进 Runtime；
- render 时写 Recovery。

### 6.2 唯一事务发起者

目标冻结：

```text
RealityProductionRouteEntry
=
Admission Transaction Owner
```

它只在组件 commit 后，通过明确 effect / command 发起当前 attempt。

Controller：

- 仍是 Intent 状态权威；
- 仍是 Admission commit authority；
- 不被 render 直接调用 mutation command。

Host：

- 只消费已提交 Admission；
- 不创建 Admission；
- 不增加 revision。

### 6.3 纯 Resolver 与 Commit Command

目标拆分：

```text
Render
→ resolveAdmissionEligibility(...)
→ pure result

Mounted Route Transaction
→ commitRealityEncounterAdmission(...)
→ typed Admission result
→ local committed admission state
```

纯 Resolver 只判断：

- identity recovery 是否 READY；
- requested intent reference 是否可用；
- route target 是否正确；
- 当前 attempt 是否已经拥有 committed admission；
- 是否应发起 ADMIT / RETRY / RECOVER。

它不得：

- 修改 Controller；
- 读取或写入 Recovery；
- 增加 revision；
- 清理 Activation Source；
- 创建 Candidate；
- 声称 Active。

Commit Command 由 Controller 执行：

- 校验当前 intent / cycle / identity；
- 校验状态与 TTL；
- 以幂等键建立 Admission；
- 写 ACCEPTING revision；
- 通过 Recovery Adapter 写入；
- 返回 frozen Admission。

### 6.4 幂等键

最低幂等键：

```text
intentReferenceId
+
encounterCycleId
+
baseIntentRevision
+
operation (ADMIT / RETRY / RECOVER)
```

输出：

```text
admissionRevision
```

同一幂等键重复提交：

- 返回同一个 Admission；
- 不增加 revision；
- 不重复写出不同 Recovery 事实；
- 不创建第二 Activation Source。

新 revision 只有在：

- 上一 attempt 已明确失败；
- 用户执行同周期重试；
- Controller 接受新的 retry transaction；

时产生。

### 6.5 Commit、Cancel 与 Stale

Commit 条件：

- Route 已 commit；
- Identity Recovery READY；
- 当前 intent reference 匹配；
- 当前 cycle 匹配；
- 当前 base revision 匹配；
- TTL 有效；
- transaction 尚未 cancel；
- 当前 Route 仍请求 `/reality`。

Cancel 条件：

- Route 在 Admission commit 前明确离开；
- identity result 被替换；
- intent reference 被替换；
- transaction owner 卸载且尚未提交。

Stale 条件：

- 旧 Admission revision；
- 旧 Surface outcome；
- 旧 Host callback；
- 旧 attempt 在新 retry 后到达；
- identity references 不再一致；
- Route instance 已不再拥有当前 transaction。

普通 effect cleanup 不得在 React Strict Mode 的开发重放中伪造用户离开或终结 encounter。未完成承接的恢复由 Controller 的 incomplete-acceptance 语义处理。

### 6.6 Strict Mode 与 speculative render

未来门禁必须证明：

```text
render count > 1
→ Controller revision advancement = 0

one committed transaction
→ ACCEPTING advancement = 1

Strict Mode effect replay
→ same idempotency key
→ same Admission
→ no duplicate revision
```

废弃 render 不执行 command，因此不能写 Recovery。

### 6.7 快速切换、前进后退与刷新

快速 Route 切换：

- 未提交 transaction 不推进 Controller；
- 已提交但未呈现的 Admission 保持 incomplete；
- 旧 Surface outcome 被 transaction key 拒绝。

后退：

- 不视为明确终结；
- 保留同周期恢复资格；
- 再进入时经 Controller 重建 Admission。

刷新：

- Recovery candidate 只作为候选；
- Controller 恢复同 cycle；
- 新 Route transaction 获得新 admission revision；
- Surface 必须重新 typed-present；
- 不直接恢复为 Active。

前进：

- 只消费当前 Controller admission；
- 浏览器历史 state 不得冒充 Intent authority。

### 6.8 Admission 成功但 Surface 未呈现

```text
Admission ACCEPTING
↓
Surface UNAVAILABLE / INTERRUPTED / timeout watchdog
↓
Controller.failAcceptance
↓
FAILED_RETRYABLE
```

要求：

- cycle 保持；
- identity 保持；
- Recovery 写入失败事实；
- 临时 Activation / Candidate / Delivery 不成为第二真源；
- 不产生 SelectedPressureSeedContext；
- 不进入 Dynamics；
- 不声称已 Active。

### 6.9 Surface Outcome 到达时 Admission 已失效

Host 和 Controller 均校验：

- intent；
- cycle；
- admission revision；
- identity refs。

旧 outcome：

```text
→ STALE / REJECTED
→ current state unchanged
→ no Recovery overwrite
```

### 6.10 Recovery 写入点

允许写入：

- Controller 创建 READY；
- Controller commit Admission 为 ACCEPTING；
- Controller commit failure 为 FAILED_RETRYABLE；
- Controller 接收 typed Host outcome 并 commit ACTIVE；
- Controller 正式 TERMINAL。

禁止写入：

- React render；
- pure resolver；
- Route State 解析；
- Host render；
- Surface render；
- DOM query；
- Renderer；
- Candidate initialization；
- `navigate()`。

### 6.11 是否需要新状态

```text
New Intent State:
NO
```

现有：

- `READY_TO_ENTER_REALITY`；
- `ACCEPTING_REALITY`；
- `FAILED_RETRYABLE`；
- `ACTIVE_IN_REALITY`；
- `RECOVERING`；
- `TERMINAL`；

足以表达目标语义。

需要新增的是 typed transaction / outcome 契约，不是第二套状态机。

### 6.12 交通灯

```text
Controller Commit Transaction:
YELLOW MAJOR CORRECTION
```

它必须与 Typed Surface Outcome 同刀，因为：

- 两者共同决定 ACTIVE 的唯一提交因果；
- 只移动 Controller 调用而保留 DOM 成功输入，闭环仍不真实；
- 只增加 typed outcome 而保留 render-phase Admission，权威仍在 React commit 前推进；
- 分开上线会留下半完成 ACTIVE authority。

---

## 7. 消费者矩阵

|角色|当前行为|目标行为|是否生产权威|是否允许写 Recovery|迁移动作|
|-|-|-|-|-|-|
|Genesis|显式关系资格后请求 Intent，携带 intent ref 导航|保持|只生产用户请求，不生产 Active|NO|无 Runtime 迁移|
|Returning|回归关系周期后请求 Intent，携带 intent ref 导航|保持|只生产用户请求，不生产 Active|NO|无 Runtime 迁移|
|Choice Continuation|用户认出 lived response 后申请新 encounter|保持|只生产新 encounter 请求|NO|无 Runtime 迁移|
|Reality Route|render 中建立 Admission；组装链；接收 Host outcome|commit 后发起幂等 Admission transaction；接收 typed composite outcome|事务发起者，不是 Active 权威|NO|黄色刀迁移 render-phase transaction|
|Activation Source|render 中被 clear / activate；消费 Admission|只在 committed transaction 后建立 cycle/revision scoped context|生产临时 Activation Context|NO|黄色刀纳入 transaction|
|Identity Recovery Adapter|读取既有身份/视觉资产并校验三项引用|保持 typed reader|生产 validated identity recovery result|NO|仅绿色刀校准 Route boundary 声明|
|Intent Recovery Adapter|唯一直接 sessionStorage reader/writer|保持；增加 2h 与异常时钟门禁|只生产 recovery candidate，不生产 Runtime authority|YES，唯一直接写者|绿色 TTL 刀|
|Reality Host|DOM query 推断最低 Surface；报告 Host outcome|聚合两个 child typed outcomes；拒绝 stale；报告唯一 composite outcome|只生产 Host evidence，不生产 Active|NO|黄色刀删除 DOM Runtime 输入|
|Reality Life Surface|渲染 canvas，但不报告入口呈现 outcome|报告 Motion / Static / Unavailable / Interrupted typed outcome|生产 life presentation fact|NO|黄色刀新增 callback contract|
|Reality Pressure Surface|渲染 V2 section，但不报告入口呈现 outcome|报告 candidate surface typed outcome|生产 pressure presentation fact|NO|黄色刀新增 callback contract|
|Candidate Initialization|在 Admission 后组装临时候选与 session|只在 committed Admission transaction 后组装；失败不 Active|生产 acceptance-local temporary objects|NO|黄色刀纳入 transaction 顺序门禁|
|Controller|生成 cycle；推进状态；校验 Host outcome；当前可在 render 中被调用|只响应显式 command；幂等 admission；typed outcome 原子 commit Active|YES，唯一 Intent / Active 权威|YES，仅通过 Adapter|黄色刀修正调用时点；绿色刀修正 TTL|

---

## 8. 负向消费者复验

当前源码 import 扫描显示，Intent 直接 Runtime 消费集中在：

- App Route Load Boundary；
- Genesis；
- Returning；
- Choice Continuation Adapter 所在页面；
- Reality Route；
- Reality Authorization；
- Reality Activation Source；
- Identity Recovery Adapter；
- Intent Controller；
- Intent Recovery Adapter；
- Reality Host types。

以下保持为零：

|禁止消费者|当前结果|未来门禁|
|-|-|-|
|Renderer|CLEAR|不得导入 Intent Controller 或关系状态|
|AI Reflection|CLEAR|不得读取 Intent、关系名或原文|
|Relationship Naming|CLEAR|不得以名称决定 Reality 资格|
|Pressure Seed 内容生产|CLEAR|只能在 Admission 链后消费既有 source；不得拥有 Intent|
|Six Dimension|CLEAR|不得读取 Intent|
|Gravity|CLEAR|不得读取 Intent 作为分析输入|
|Choice 内容|CLEAR|只能产生 continuation request，不得修改 Intent 状态|
|Crystal|CLEAR|不得读取 Intent|
|Identity Engine|CLEAR|不得由 Intent 反向修改身份|
|StarBeast Identity|CLEAR|不得由 Intent 反向修改身份|
|Life Whisper 原文|CLEAR|不进入 Intent、Route、Host、Recovery|

注意：

`GravityPage` 中的 Choice continuation handler 是合法的 encounter 请求生产者，不代表 Gravity 内容消费 Intent。

---

## 9. 施工拆分裁决

选择：

```text
Option A：分刀
```

### Blade A｜绿色关闭刀

建议名称：

```text
XINMAI-REALITY-ENCOUNTER-INTENT-TTL-ROUTE-BOUNDARY-REFINEMENT-P0
```

刀型：

```text
Refinement Blade
GREEN
```

唯一范围：

```text
TTL 24h → 2h
+
Route Recovery Boundary 声明校准
+
对应门禁
```

不得：

- 新增 Surface Outcome；
- 修改 Host；
- 移动 Controller transaction；
- 修改 ACTIVE 提交；
- 进入 Phase 3。

### Blade B｜黄色因果修正刀

建议名称：

```text
XINMAI-REALITY-SURFACE-OUTCOME-ADMISSION-TRANSACTION-MAJOR-CORRECTION-P0
```

刀型：

```text
Major Correction
YELLOW
STRICT ATOMIC SCOPE
```

唯一范围：

```text
Typed Life Surface Outcome
+
Typed Pressure Surface Outcome
+
Host Composite Outcome
+
Route post-commit Admission Transaction
+
Controller idempotent Admission
+
删除 DOM Runtime success input
+
删除 render-phase Controller / Recovery mutation
```

### 不选择 Option B 的原因

TTL 与 Route 声明：

- 不参与 Surface evidence；
- 不参与 Admission transaction；
- 不改变 ACTIVE 提交点；
- 可以独立验证与回滚。

把四项放进一个黄色原子提交只会扩大 blast radius，不增加因果完整性。

---

## 10. 单提交文件边界

### 10.1 绿色 Blade A

预期 Runtime 文件：

```text
src/services/xinmaiRealityEncounterIntentController.ts
src/types/realityProductionRouteEntry.ts
src/pages/RealityProductionRouteEntry.tsx
```

预期门禁文件：

```text
scripts/check-xinmai-reality-encounter-intent-controller.mjs
scripts/check-xinmai-reality-encounter-intent-recovery.mjs
scripts/check-xinmai-reality-encounter-intent-atomic-migration.mjs
```

只允许：

- 2 小时常量；
- TTL 临界、刷新、重试、时钟异常门禁；
- boundary type 与 boundary object 字段校准。

### 10.2 黄色 Blade B

预期类型文件：

```text
src/types/xinmaiRealityEncounterIntent.ts
src/types/realityProductionRouteEntry.ts
src/types/realityPressureSeedPresentation.ts
src/types/index.ts
```

预期 Runtime 文件：

```text
src/pages/RealityProductionRouteEntry.tsx
src/components/RealityProductionHost.tsx
src/components/RealityLifeUniverseCanvas.tsx
src/components/RealityPressureSeedPresentation.tsx
src/services/xinmaiRealityEncounterIntentController.ts
src/services/realityRouteActivationSourceContext.ts
```

只有在实际实现需要独立纯 Resolver 时，允许新增一个无第二状态机的 typed transaction resolver：

```text
src/services/xinmaiRealityEncounterAdmissionTransaction.ts
```

它不得拥有：

- current intent；
- cycle 生成；
- Recovery Storage；
- Active state。

预期门禁：

```text
scripts/check-xinmai-reality-encounter-intent-controller.mjs
scripts/check-xinmai-reality-encounter-intent-atomic-migration.mjs
scripts/check-xinmai-reality-surface-presentation-outcome.mjs
scripts/check-xinmai-reality-admission-transaction.mjs
```

施工前必须逐文件再次核对；若需要超出该清单，按交通灯纪律回报，不顺带吞入。

---

## 11. 完整回滚单位

### 11.1 绿色刀回滚

一个提交完整回滚：

- TTL 恢复原值；
- Route boundary type 与 object 同时恢复；
- 对应门禁同时恢复。

不得只回滚门禁或只回滚常量。

### 11.2 黄色刀回滚

Typed Outcome 与 Admission Transaction 必须作为一个提交完整回滚：

- child surface outcome contract；
- Host aggregation；
- Route transaction；
- Controller idempotent admission；
- Activation Source transaction wiring；
- DOM Runtime 输入删除；
- render-phase mutation 删除；
- 对应门禁；

全部一起回滚。

回滚后必须：

- 保持一个 Controller Active authority；
- 不遗留部分 typed outcome；
- 不遗留孤立 admission 字段；
- 不创建第二 Reality chain；
- 不改变身份、关系名或历史 Reality；
- 不清除当前合法 encounter；
- 不进入 Phase 3。

如果回滚需要两个以上互相依赖的提交，黄色施工卡不得开始。

---

## 12. 未来 Runtime 关闭门禁

### 12.1 静态与结构门禁

```text
Recovery TTL:
2 hours

DOM Runtime Input:
0

Route Direct Storage Read:
0

Route Recovery Adapter Direct Import:
0

Render Phase Controller Mutation:
0

Render Phase Recovery Write:
0

ACTIVE Authority Path:
1

Identity-only Dual Authority:
0

New Phase 3 Consumer:
0
```

### 12.2 Controller 门禁

```text
Old Cycle Outcome Pollution:
0

Strict Mode Duplicate Advancement:
0

Speculative Render Advancement:
0

Abandoned Render Recovery Write:
0

Failed Surface False ACTIVE:
0

Refresh Creates New Cycle:
0

Same Retry Creates New Cycle:
0
```

### 12.3 Surface 门禁

```text
Motion Typed Outcome:
PASS

Reduced Motion Static Typed Outcome:
PASS

Renderer Blocked:
UNAVAILABLE

Context Lost Before ACTIVE:
INTERRUPTED / UNAVAILABLE

Candidate Surface Missing:
UNAVAILABLE

Stale Admission Outcome:
REJECTED

data-* as observation mirror:
ALLOWED

data-* as Runtime success input:
0
```

### 12.4 Recovery 门禁

```text
TTL boundary -1ms:
RECOVERABLE

TTL boundary exact:
EXPIRED

TTL boundary +1ms:
EXPIRED

Refresh extends TTL:
0

Retry extends TTL:
0

Expired snapshot clears identity:
0

Expired snapshot generates cycle:
0

Storage candidate becomes authority directly:
0
```

---

## 13. 真实浏览器验收矩阵

未来黄色刀关闭前必须覆盖：

|路径|必须观察的权威事实|禁止结果|
|-|-|-|
|Motion|实际 WebGL frame outcome → Host → Controller Active|DOM existence 直接 Active|
|Reduced Motion|实际 static outcome → Host → Controller Active|仅 matchMedia 直接 Active|
|Route 加载失败|同 cycle FAILED_RETRYABLE|伪 Active、新 cycle|
|Activation Source 失败|同 cycle FAILED_RETRYABLE|identity-only fallback|
|Candidate 初始化失败|UNAVAILABLE，不 Active|空候选 Surface 也 Active|
|Surface Outcome 不可用|真实失败、可同周期重试|成功文案|
|Surface 中断|旧 transaction stale|晚到 outcome Active|
|同周期重试|cycle 不变，admission revision 更新|新 cycle|
|刷新恢复|Controller 校验并重新 Host commit|Storage 字段直接 Active|
|前进后退|不重复 revision、不伪离开|浏览器历史变权威|
|明确离开|正式 terminal / clear|普通 unload 被当离开|
|TTL 临界与过期|2 小时边界精确|24 小时恢复|
|直接 URL|有合法恢复候选才承接|身份即授权|
|Choice Continuation|新明确请求生成新 cycle|复用旧 cycle|
|旧周期 outcome 晚到|STALE / REJECTED|污染当前状态|
|React Strict Mode|一次 committed transaction|重复推进 revision|

浏览器证据必须记录：

- encounter cycle；
- admission revision；
- identity refs；
- surface outcome；
- Controller state；
- Recovery snapshot；
- 是否触发禁止消费者。

---

## 14. 现有门禁复验

在远程基线的隔离快照中，当前三项既有门禁结果：

```text
check-xinmai-reality-encounter-intent-controller:
PASS

check-xinmai-reality-encounter-intent-recovery:
PASS

check-xinmai-reality-encounter-intent-atomic-migration:
PASS
```

它们证明：

- 当前只有一个 Controller Active authority；
- current cycle / revision 基础校验存在；
- Storage 直接边界正确；
- identity-only cutover 未复发；
- 禁止 payload 未进入 Intent。

它们尚不能证明：

- TTL 为 2 小时；
- render-phase mutation 为零；
- Surface outcome 来自真实呈现；
- Reduced Motion 实际呈现；
- Strict Mode 不重复推进；
- DOM 不再作为 Runtime 输入。

因此现有门禁 PASS 与本审计的四项 OPEN 不冲突。

---

## 15. 新发现交通灯

本刀完成四项关闭矩阵后统一分流：

### GREEN

1. Recovery TTL 常量与时间边界门禁；
2. Route boundary 字段从模糊声明校准为 typed adapter / no direct storage 声明；
3. 既有静态门禁命名“real minimum surface”过度声明，需在对应未来刀中校准为真实能力。

### YELLOW

1. Admission 与 Activation Source 均在 render / `useMemo` 阶段产生模块状态写入，应纳入同一 Route transaction；
2. 当前门禁只扫描成功字符串与 DOM connected，必须增加真实 typed outcome 与 Strict Mode 行为门禁；
3. `requestedAt` 暴露在公开 request input 中，但生产者当前未使用。TTL 刀必须确认它不能成为扩大 TTL 的生产入口。

### RED

```text
NONE
```

没有发现：

- 第二 ACTIVE authority；
- 新旧 Reality 生产路径并存；
- 必须替换 Runtime 真源；
- 必须迁移身份或关系资产；
- 需要跨提交才能回滚的既成事实。

因此不需要重新进行 Atomic Cutover Migration。

---

## 16. Runtime 申请条件

### 绿色刀申请

```text
READY
```

授权卡必须冻结：

- 只改 TTL、Route boundary 与对应门禁；
- 不碰 Host、Surface、Controller transaction；
- 一个提交；
- 独立回滚；
- 关闭后 Runtime Causal Closure 仍保持 OPEN，等待黄色刀。

### 黄色刀申请

```text
READY FOR MAJOR CORRECTION APPLICATION
```

授权卡必须冻结：

- Typed child surface outcome；
- Host composite outcome；
- Route post-commit transaction；
- Controller idempotent admission；
- Activation Source 不在 render 写入；
- DOM Runtime input 删除；
- render-phase Controller / Recovery mutation 删除；
- 一个提交；
- 一个完整回滚单位；
- 不接入任何 Phase 3 新消费者。

两张刀都完成并通过真实浏览器矩阵后，才能执行：

```text
XINMAI-REALITY-ENCOUNTER-INTENT-RUNTIME-CAUSAL-CLOSURE-AUDIT-P0
```

并申请：

```text
RealityEncounterIntent Runtime Causal Closure:
CLOSED
```

---

## 17. 本刀 Build 说明

本刀只新增 MAP 文档，禁止修改 Runtime 与测试门禁。

因此：

- 运行当前三项 RealityEncounterIntent 门禁，用于确认远程基线与当前消费者事实；
- Production Build 可执行，但不能作为四项关闭证据；
- 文档提交前仍需确认只有本文件发生变化；
- 即使 Build 与既有门禁通过，Delivery 仍保持 `NOT CLOSED`。

---

## 18. 最终裁决

```text
Option:
A — SPLIT BLADES

TTL Correction:
GREEN REFINEMENT

Route Recovery Boundary:
GREEN REFINEMENT

Typed Reality Surface Outcome:
YELLOW MAJOR CORRECTION

Controller Commit Transaction:
YELLOW MAJOR CORRECTION

Atomic Cutover:
PASS

Second ACTIVE Authority:
0

Runtime Causal Closure:
OPEN

Runtime Application Condition:
READY FOR SEPARATE AUTHORIZATION

Final Decision:
NOW — RUNTIME CORRECTION APPLICATION READY
```

该裁决不授权本 MAP 直接进入 Runtime 施工。
