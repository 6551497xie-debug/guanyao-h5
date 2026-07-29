# XINMAI Reality Pre-Active Host Surface Causal Circularity Migration Audit P0

## 0. Construction State Card

任务：

```text
XINMAI-REALITY-PRE-ACTIVE-HOST-SURFACE-CAUSAL-CIRCULARITY-MIGRATION-AUDIT-P0
```

刀型：

```text
Migration Audit
```

决策：

```text
NOW — AUDIT ONLY
```

当前阶段：

```text
Phase 2：
CLOSED

RealityEncounterIntent Delivery：
OPEN

Phase 3：
LOCKED
```

主影响 Layer：

```text
Layer 3 Relationship
→
Layer 4 Growth Entry Boundary
```

Runtime 修改：

```text
0
```

审计基线：

```text
Branch：
codex/genesis-28-mansion-production-continuity

Remote HEAD：
2b213a9e426e045fa7741e15c75e454c1c8243f4

Snapshot：
/private/tmp/xinmai-relationship-naming-map-p0

Snapshot State：
CLEAN
```

本刀唯一目标：

> 确认新 Reality encounter 为什么无法从 `ACCEPTING_REALITY` 到达真实 Host Surface，并冻结一个不提前放开 Phase 3、不建立第二 Host、不建立第二 Active 真源的原子迁移方案。

---

## 1. 独立裁决

```text
Pre-Active Host Surface Circularity：
CONFIRMED

Fresh Encounter Runtime Reachability：
BLOCKED

Controller Active Authority：
VALID BUT UNREACHABLE FROM FRESH PRODUCTION PATH

RealityEncounterIntent Delivery：
OPEN

Phase 3：
LOCKED

Runtime Migration Required：
YES

Migration Mode：
ATOMIC
```

当前真实生产因果是：

```text
RealityEncounterIntent ACCEPTING_REALITY
↓
Route 要求 ACTIVE_IN_REALITY
↓
满足后才挂载 RealityProductionHost
↓
Host 挂载后才可能产生 Life Surface Outcome
↓
Host 挂载后才可能产生 Candidate Surface Outcome
↓
Host 组装 REALITY_MINIMUM_PRESENTED
↓
Route 回调调用 Controller
↓
Controller 才能提交 ACTIVE_IN_REALITY
```

这形成不可闭合的循环：

```text
Host 出现需要 Active
+
Active 成立需要 Host Outcome
```

因此，当前新用户真实路径在 `/reality` 停留于：

```text
data-production-reality-status="SOURCE_NOT_READY"
data-guard-reason="ACTIVE_REALITY_INTENT_REQUIRED"
```

该结果来自当前远程 SHA 的真实生产浏览器路径，不是源码字符串推断。

---

## 2. 证据等级

本审计区分五类证据：

|证据|能够证明|不能代替|
|-|-|-|
|产品协议|目标权威和禁止边界|Runtime 可达性|
|源码结构|生产者、消费者、状态条件|真实执行顺序|
|自动门禁|约束存在、单元状态转换|真实页面是否可挂载|
|真实浏览器|用户路径、真实 guard、真实表面|未执行的负向分支|
|远程干净快照|交付可独立复现|产品因果正确性本身|

本刀以以下组合证据作出裁决：

```text
远程干净快照源码
+
Controller 状态机
+
Host Typed Surface Outcome 链
+
真实新用户浏览器路径
```

此前自动门禁能够证明：

- Controller 只有一个 Active Command；
- Host 能组装 Typed Surface Transaction；
- DOM 节点不是成功输入；
- 固定计时器不是成功真源；
- Route Admission 已位于 post-commit。

但这些门禁没有证明：

> Host 在 `ACTIVE_IN_REALITY` 之前是否真的可挂载。

真实浏览器证据优先于“符号存在”和“单元函数可调用”的结论。

---

## 3. 当前生产因果审计

### 3.1 Route 已完成的正确前置事务

`RealityProductionRouteEntry` 已在 post-commit 阶段完成：

```text
Identity Recovery
↓
Reality Encounter Admission
↓
Route Authorization
↓
Activation Source
↓
Candidate Activation
↓
Candidate Request
↓
Delivery Orchestration
↓
Pressure Host Input
↓
Continuation Context
```

这些资产共同形成：

```text
ACCEPTING_REALITY
+
可用于呈现最低 Reality Surface 的合法输入
```

它们尚不等于：

```text
ACTIVE_IN_REALITY
```

### 3.2 Route 的阻断点

在上述输入全部 Ready 后，Route 仍先读取 Controller，并要求：

```text
activeRealityIntent.state === "ACTIVE_IN_REALITY"
```

只有满足该 guard 后才返回：

```text
<RealityProductionHost />
```

因此处于合法 `ACCEPTING_REALITY` 的新周期只能看见 guard，不能挂载 Host。

### 3.3 Host 是最低表面的唯一合法聚合者

`RealityProductionHost` 当前负责：

```text
RealityLifeSurfaceOutcome
+
RealityPressureSurfaceOutcome
↓
RealitySurfaceAdmissionTransaction
↓
RealityHostAcceptanceOutcome
```

Host 只有收到同一个：

- `intentReferenceId`；
- `encounterCycleId`；
- `intentRevision`；
- 三项身份引用；

对应的两个真实 Presented Outcome，才报告：

```text
REALITY_MINIMUM_PRESENTED
```

8 秒 Watchdog 只能报告：

```text
REALITY_HOST_UNAVAILABLE
```

不能提交成功。

### 3.4 Controller 是唯一 Active 权威

`commitRealityEncounterActive()` 只有在当前 Intent 为：

```text
ACCEPTING_REALITY
```

且 Host transaction 的周期、revision、身份与两个表面事实均有效时，才通过 `nextIntent()` 生成：

```text
ACTIVE_IN_REALITY
```

Route 没有资格自行设置 Active；Host 也没有直接写 Controller。

这部分权威边界正确，必须保留。

---

## 4. 三项结构性阻断

### 4.1 阻断 A：Host 挂载因果循环

```text
Route：
ACTIVE required before Host mount

Host：
mounted surfaces required before ACTIVE
```

裁决：

```text
RED
```

这是当前 fresh encounter 无法成立的首要根因。

### 4.2 阻断 B：Admission revision 与 Active revision 混用

Host Surface Outcome 必须绑定：

```text
encounterAdmission.intentRevision
```

Controller 接受该 Outcome 后通过 `nextIntent()` 提交 Active，因此：

```text
activeIntent.revision
=
encounterAdmission.intentRevision + 1
```

但当前 Route 的 Active guard 要求：

```text
activeRealityIntent.revision
===
encounterAdmission.intentRevision
```

当前 Host 的 Gravity transfer guard 也存在同样比较。

这两个 revision 不是同一个事实：

|字段|语义|
|-|-|
|Admission revision|本次 Surface Outcome 所属的接受尝试|
|Active revision|Controller 成功提交 Active 后的新权威版本|

裁决：

```text
RED — MUST MIGRATE IN SAME ATOMIC CUTOVER
```

若只解除 Host 挂载 guard，而不校准 revision，Host 即使成功提交 Active，Route 仍会重新落回 `ACTIVE_REALITY_INTENT_REQUIRED`。

### 4.3 阻断 C：本地 reference 不能充当 Active receipt

Route 当前在 Controller 返回 `ACTIVE` 后写入：

```text
activeIntentReferenceId
```

它只能触发页面重渲染，不能单独证明：

- Active revision；
- encounter cycle；
- 三项身份引用；
- Host transaction；
- Controller 当前权威。

裁决：

```text
YELLOW INSIDE RED MIGRATION BOUNDARY
```

未来可以保留一个纯 UI publication token，但它不得成为第二权威。合法判断必须来自：

```text
Controller Active Intent
+
本次 Admission / Host Commit Receipt 的类型化一致性
```

---

## 5. 唯一目标因果

冻结唯一合法链：

```text
用户明确进入当前 Reality
↓
RealityEncounterIntent READY_TO_ENTER_REALITY
↓
Route post-commit Admission
↓
Controller ACCEPTING_REALITY
↓
Route 挂载同一个 RealityProductionHost
  状态：PRE_ACTIVE_PRESENTATION
↓
同一 Life Surface 真实呈现
+
同一 Candidate Surface 真实呈现
↓
Host 组装 Typed Surface Admission Transaction
↓
Route 校验 cycle / admission revision / identity
↓
Controller 唯一提交 ACTIVE_IN_REALITY
↓
同一个 Host 切换为 ACTIVE_INTERACTION
↓
Reality 用户交互开放
```

必须同时满足：

```text
Pre-Active Surface Host：
1

Active Reality Host：
同一个实例

Controller Active Authority：
1

Route Active Authority：
0

Host Active Authority：
0
```

---

## 6. Pre-Active Presentation 与 Phase 3 边界

解除循环不能等于提前开放 Reality 玩法。

### 6.1 Pre-Active 允许

只允许：

- 同一生命画布呈现；
- Reduced Motion 静态同体表面呈现；
- 第一组非空 Reality Candidate Surface 呈现；
- 两项 Typed Surface Outcome 报告；
- Watchdog 失败报告；
- 明确离开；
- 同周期失败与重试。

### 6.2 Pre-Active 禁止

在 Controller 尚未提交 Active 前，必须禁止：

- Pressure Seed 认出；
- 请求下一组 Seed；
- Pause 写入消费状态；
- Body Approach；
- Gravity transfer；
- Six Dimension；
- AI Reflection；
- Choice；
- Crystal；
- Archive Growth；
- 任何 Phase 3 副作用。

当前 `RealityProductionHost` 初始化 Pressure consumer，并将 Recognition / Next / Pause 回调直接交给 Candidate Surface。未来迁移必须显式建立：

```text
surfacePresentationEnabled：
true

realityInteractionEnabled：
false until Controller ACTIVE
```

不能仅依赖按钮“通常还没人点击”。

### 6.3 同体连续

从 Pre-Active 到 Active：

- 不重新创建星兽；
- 不重新创建生命核心；
- 不重新创建 Candidate bundle；
- 不改变 `sourceReferenceId`；
- 不改变 `encounterCycleId`；
- 不更换 Host；
- 不以 Active revision 作为 React `key` 导致 Host 重挂载。

Admission revision 继续作为本轮 Surface Attempt 的身份；Active revision 作为 Controller 新权威版本。二者通过类型化 commit receipt 连接，不互相覆盖。

---

## 7. 状态、revision 与 receipt 冻结

### 7.1 Admission attempt

```text
intentReferenceId
encounterCycleId
admissionRevision
三项身份引用
```

拥有：

- Pre-Active 表面尝试；
- Life / Candidate Outcome；
- Host transaction；
- Watchdog；
- stale outcome 拒绝。

### 7.2 Active authority

```text
intentReferenceId
encounterCycleId
activeRevision = admissionRevision + 1
三项身份引用
state = ACTIVE_IN_REALITY
```

拥有：

- Reality 交互资格；
- Gravity transfer 来源资格；
- Active 恢复候选。

### 7.3 Active commit receipt

实施刀必须使用类型化结果表达：

```text
admission attempt
↓
Host transaction accepted
↓
Controller Active intent
```

receipt 至少校验：

- 同一 `intentReferenceId`；
- 同一 `encounterCycleId`；
- 同一三项身份引用；
- `activeRevision === admissionRevision + 1`；
- Controller 当前状态仍为 Active。

receipt 不是新状态权威，不持久化为第二资产。

---

## 8. 生命周期与失败矩阵

|场景|合法结果|禁止结果|
|-|-|-|
|Fresh Motion|Pre-Active Host → 两项 Presented → Controller Active → 开放交互|Active 前阻断 Host|
|Reduced Motion|静态同体 Life Surface + Candidate Surface → Active|仅凭 `matchMedia` 成功|
|Life Surface unavailable|Controller `FAILED_RETRYABLE`，同周期重试|伪造 Active|
|Candidate Surface empty / unavailable|Controller `FAILED_RETRYABLE`，同周期重试|仅有 Life Surface 即 Active|
|Watchdog|只报告失败|计时器提交成功|
|旧 cycle outcome 晚到|拒绝|污染当前周期|
|旧 admission revision outcome 晚到|拒绝|覆盖新 retry|
|身份引用失配|拒绝并保持身份|尝试修复身份|
|Strict Mode 重复 effect|同一 attempt 只提交一次|revision 重复推进|
|Host 预激活中卸载|未完成 outcome 失效；Intent 可重试|cleanup 视为明确离开|
|Controller Active 后 Route 重渲染|同一 Host 解锁交互|新 key 重挂载第二 Host|
|刷新恢复|Recovery Adapter → Controller 校验 → 同周期重新承接|Storage 字段直接 Active|
|Direct URL 无 Intent|安全 guard|identity-only 旁路|
|显式离开|正式终止当前周期|普通 unload 清除 Intent|

---

## 9. 生产者与消费者

|生产者|输出|直接消费者|当前状态|禁止消费者|
|-|-|-|-|-|
|Intent Controller|`ACCEPTING_REALITY`|Route post-commit flow|✓|Renderer、Pressure Seed|
|Route Admission|Admission attempt|Authorization、Activation、Host|✓|Growth conclusion|
|Life Surface|Typed Life Outcome|Host transaction|✓，但 Host 不可达|Controller 直连|
|Candidate Surface|Typed Candidate Outcome|Host transaction|✓，但 Host 不可达|Controller 直连|
|RealityProductionHost|Typed minimum surface transaction|Route callback|✓，但 Host 不可达|Storage、Growth consumer|
|Route callback|Host outcome|Intent Controller|✓，但 callback 不可达|自行设置 Active|
|Intent Controller|Active intent|Route / Host interaction gate|✓，fresh path 不可达|Phase 3 结果判断|
|Active commit receipt|Admission 与 Active 版本关系|Route / Host gate|○ 目标能力|Storage、Renderer|

Runtime 证据：

```text
✓ 已存在 Runtime
△ 已存在但生产路径不可达
○ 目标迁移能力
```

---

## 10. 必须删除的旧路径

原子实施提交必须同时删除：

1. `ACTIVE_IN_REALITY` 成立前阻止唯一 Host 挂载的 guard；
2. `activeRevision === admissionRevision` 的错误比较；
3. 仅凭 `activeIntentReferenceId` 作为 Active 呈现资格的判断；
4. Pre-Active 阶段可触发 Pressure Recognition / Next / Pause 的路径；
5. 任何为绕过循环而新增的 Route Active 写入；
6. 任何为绕过循环而新增的假 Surface Outcome；
7. 任何第二个 pre-active Host 或隐藏 Host；
8. 任何以 DOM、固定计时器、candidate object 存在作为成功证据的旁路。

---

## 11. 原子迁移边界

下一刀必须在单提交中完成：

```text
建立 Host PRE_ACTIVE_PRESENTATION / ACTIVE_INTERACTION 契约
+
允许合法 ACCEPTING_REALITY 挂载唯一 Host
+
保持 Typed Life / Candidate Outcome 原链
+
Controller 继续唯一提交 Active
+
建立 admissionRevision → activeRevision receipt
+
Active 后原位解锁 Host 交互
+
移除旧 Active-before-Host guard
+
移除错误 revision 等值判断
+
锁住 Pre-Active 的 Phase 3 用户动作
+
新增真实路径与负向门禁
```

预计直接文件边界：

- `src/pages/RealityProductionRouteEntry.tsx`；
- `src/components/RealityProductionHost.tsx`；
- `src/components/RealityPressureSeedPresentation.tsx`；
- `src/types/realityProductionRouteEntry.ts`；
- 与本次 causal cutover 直接对应的 XINMAI 检查。

如实施中必须改变 Controller 状态机、Recovery Adapter、Genesis、Returning、Choice 或 Pressure Seed 数据模型：

```text
STOP
```

返回 Product Control Tower；不得在该原子修复中扩张。

---

## 12. 回滚单位

回滚单位：

```text
完整原子提交
```

回滚必须同时恢复：

- Host 挂载条件；
- Host phase contract；
- interaction gate；
- revision receipt；
- 对应门禁。

禁止部分回滚造成：

```text
Pre-Active Host 已开放
+
Phase 3 Interaction 未锁
```

或：

```text
新 revision 语义
+
旧 Active guard
```

回滚不得：

- 删除 Controller；
- 删除 Typed Surface Outcome；
- 删除 Recovery Adapter；
- 修改身份与关系资产；
- 修改 Reality candidate 数据；
- 清除合法用户 Intent。

---

## 13. 实施关闭门禁

下一刀至少必须证明：

```text
Fresh Encounter Host Reachability：
PASS

Pre-Active Host Count：
1

Active Host Count：
SAME INSTANCE

Controller Active Authority：
1

Route / Host Active Authority：
0

Admission Revision / Active Revision：
CORRECTLY DISTINCT

Pre-Active Pressure Interaction：
0

Pre-Active Gravity Transfer：
0

Fake Surface Outcome：
0

Fixed Timer Success：
0

DOM Runtime Input：
0

Stale Cycle / Revision Pollution：
0
```

真实浏览器必须覆盖：

- 新用户 Motion；
- 新用户 Reduced Motion；
- Life Surface failure；
- Candidate Surface failure / empty；
- Watchdog；
- 同周期 retry；
- stale outcome；
- 身份失配；
- 刷新恢复；
- Direct URL；
- Controller Active 后 Host 不重挂载；
- Active 前交互不可用、Active 后交互可用；
- Reality → Gravity 仍只从 Active intent 发起。

同时执行：

- TypeScript；
- Production Build；
- 全量 XINMAI 门禁；
- Reality Route / Host / Intent / Recovery 门禁；
- Gravity Entry 生产浏览器 Harness；
- 远程干净快照独立复现。

---

## 14. 资产保护结论

|资产|结论|
|-|-|
|动态星河、黑曜空间|保留|
|同一生命核心与星兽身体|保留|
|三项身份引用|保留|
|Life Whisper 与 Relationship Naming|不消费、不修改|
|RealityEncounterIntent Controller|继续唯一 Active 权威|
|Recovery Adapter|继续唯一 Storage Reader / Writer|
|Route post-commit Admission|保留|
|Typed Life / Candidate Surface Outcome|保留|
|Pressure Seed 内容与候选源|不修改|
|Gravity、Choice、Crystal|不提前消费|

第二套 Relationship Runtime：

```text
0
```

第二套 Reality Active Authority：

```text
0
```

---

## 15. 交通灯扫描

交通灯扫描发生在本刀审计完成后，不改变本刀范围。

### 红灯

```text
Pre-Active Host Surface Causal Circularity
```

处理：

```text
Atomic Migration
```

### 黄灯

```text
既存 Pressure Presentation / Gravity 阶段文案门禁
```

处理：

```text
保持独立 MAP
不得并入本次因果修复
```

### 绿色

```text
没有可在本审计中顺带施工的绿色项
```

---

## 16. 最终状态与下一刀

```text
本 Migration Audit：
CLOSED / ACCEPTED

Reality Pre-Active Host Circularity：
CONFIRMED

RealityEncounterIntent Runtime Authority：
CONTROLLER ESTABLISHED

Fresh Production Causal Closure：
NOT ESTABLISHED

RealityEncounterIntent Delivery：
OPEN

Phase 2：
CLOSED

Phase 3：
LOCKED
```

下一刀：

```text
XINMAI-REALITY-PRE-ACTIVE-HOST-SURFACE-ATOMIC-CORRECTION-P0
```

刀型：

```text
Migration / Atomic Correction
```

决策建议：

```text
NOW — STRICT ATOMIC SCOPE
```

唯一目标：

> 在不建立第二 Host、不建立第二 Active 真源、不提前开放 Pressure / Gravity 交互的前提下，让唯一 `RealityProductionHost` 在合法 `ACCEPTING_REALITY` 阶段呈现真实最低表面，完成 Controller Active 提交，并原位进入可交互 Reality。

该迁移完成后仍不得自动宣布 Delivery 关闭或解锁 Phase 3；必须再独立执行真实浏览器因果关闭复验。
