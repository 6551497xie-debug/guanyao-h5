# XINMAI Reality Pressure Seed Recognition to Gravity Production Reachability Audit P0

任务编号：

`XINMAI-REALITY-PRESSURE-SEED-RECOGNITION-TO-GRAVITY-PRODUCTION-REACHABILITY-AUDIT-P0`

审计日期：

`2026-07-30`

审计基线：

```text
45feea031d8b82c83e17953b38c1938d41d76993
```

远程基线：

```text
origin/codex/genesis-28-mansion-production-continuity
=
45feea031d8b82c83e17953b38c1938d41d76993
```

刀型：

```text
MAP / Runtime Reachability Audit
```

决策边界：

```text
NOW — MAP ONLY

Runtime：
未修改

Gate：
未修改

文案：
未修改

Renderer：
未修改

Choice Presentation SAFE_WITHHELD：
保持
```

---

# 一、Construction State Card

```text
当前 Phase：
Phase 3

当前状态：
ACTIVE / NOT PASSED

当前 A1：
恢复正式 Reality → Gravity 可达性

当前生产判断：
Reality Adventure REOPENED — PRODUCTION REACHABILITY BLOCKED

底层已关闭 Authority：
首次成长因果
Transactional Persistence
Gravity Observation Continuity

Choice Presentation Resolver：
IMPLEMENTED / SAFE_WITHHELD

本刀主 Layer：
Layer 4 Growth 的 Reality → Gravity 入口

保护：
World
Identity
Relationship
Reality provenance

Visual Runtime：
DEFER

Phase 4：
LOCKED
```

本刀唯一回答：

> 正式 `/reality` 中可见的 Pressure Candidate，为什么此前没有完成 Recognition 与 Gravity Transfer，以及生产链的第一处真实停点在哪里。

---

# 二、最终裁决

```text
YELLOW — MAJOR BLADE PREP REQUIRED
```

裁决由两个不同层级的事实共同构成。

## 2.1 原“生产不可达”证据被推翻

远程 `45feea0` 的正式生产构建中，连续 Motion 路径真实通过：

```text
/launch
↓
返回同一生命
↓
Life Whisper 明确跳过
↓
和它一起进入新的现实
↓
/reality
↓
点击当前真正可命中的 Pressure Candidate
↓
OBSERVING_CANDIDATES
→ SEED_RECOGNIZED
↓
GRAVITY_READY_TO_CONTINUE
↓
用户轻触“靠近生命正在变化的位置”
↓
Typed Gravity Transfer
↓
Gravity Admission
↓
/dynamics
```

此前“点击候选后无变化”的直接原因是：

```text
浏览器证据 / 测试操作错误
```

同名语义定位器返回三个 `停在这一幕` 按钮。

初始横向候选舞台中：

- 中间候选位于当前交互层，命中测试顶层元素就是该按钮；
- 第一、第三候选仍存在于 DOM 和无障碍树中，但位于横向滚动 / 遮罩裁切区域；
- 旧操作固定选择 `nth(0)`，没有选择当前真正可命中的候选；
- 因而点击没有进入 React Recognition callback；
- Authority 没有拒绝命令，因为命令根本没有产生。

正式浏览器选择当前可命中的中间候选后，Recognition 与 Gravity Transfer 均成立。

因此：

```text
Presentation 可见但不可消费：
FALSE — 当前中心候选可消费

Consumer Wiring 失配：
FALSE — 连续成功路径已通过

Typed Outcome 未提交：
FALSE — 正常命中时已提交

Authority 状态转换缺失：
FALSE — 正常命中时已转换

浏览器证据或测试操作错误：
TRUE — 原阻断根因
```

## 2.2 仍存在 Host 生命周期结构缺口

虽然连续成功路径可达，但 Recognition 事实当前只存在于：

```text
RealityProductionHost
↓
React component lifecycle
↓
pressureHostState
```

浏览器复验：

```text
同一 encounterCycleId
+
同一 intentReferenceId
+
同一 candidateBundleReferenceId

识别前：
OBSERVING_CANDIDATES / INACTIVE

识别后：
SEED_RECOGNIZED / AWAITING_BODY_APPROACH

刷新后：
OBSERVING_CANDIDATES / INACTIVE
```

刷新没有生成第二个 Reality encounter，也没有改变身份。

但它丢失了已经发生的用户 Recognition 与 Body Approach readiness。

当前没有：

- 独立的 Recognition Controller；
- Typed Recognition Commit Receipt；
- Recognition Recovery Adapter；
- 可跨 Host remount 恢复的稳定 Recognition Checkpoint。

这不是第二套 Authority，也没有旧导航旁路，因此不升级红色。

但若要满足刷新、Back / Forward、Host unmount 与 Reduced Motion 的完整连续性，必须先冻结：

- Recognition 是否是 encounter 内稳定生命事实；
- 谁是唯一生命周期 Owner；
- 哪个 typed outcome 才能成为恢复候选；
- Route、Host 与 Recovery 的读取顺序；
- 如何保持 Gravity Transfer 仍只消费同一正式 Pressure Session。

该范围超过绿色 Gate 修正，故最终进入黄色 Major Blade Prep。

---

# 三、审计方法与证据等级

本次严格区分：

```text
协议声明
源码结构
自动 Gate
正式生产浏览器行为
远程干净构建
```

正式浏览器证据只使用：

- `/launch`；
- `/reality`；
- 正式 Pressure Candidate；
- 正式 `RealityProductionHost`；
- 正式 Pressure Seed Consumer；
- 正式 Reality → Gravity Cutover；
- 正式 `/dynamics`。

没有使用：

- Development Fixture；
- Acceptance Page；
- `/starbeast-lab`；
- 人工写入 Storage；
- 直接调用服务；
- Direct URL 绕过；
- DOM 属性伪造状态。

Harness 与源码门禁只作为辅助证据，不作为生产可达结论。

---

# 四、当前真实生产链

## 4.1 Candidate Presentation

```text
Reality Route Authorization
↓
Pressure Candidate Activation
↓
Candidate Request
↓
Delivery Orchestration
↓
RealityPressureSeedCandidateBundle
↓
RealityPressureSeedPresentation
```

正式 Candidate：

```text
sourceExperienceMode：
REAL_USER_EXPERIENCE

selectionMode：
USER_RECOGNITION_REQUIRED

candidateSource：
PRESSURE_SEED_MATRIX_V2

automaticSelection：
禁止
```

Presentation 只消费候选的：

- `candidateReferenceId`；
- `surface`；
- `shell`；
- 是否允许 Recognition。

它不运行：

- Pressure Engine；
- Capture；
- Gravity；
- Choice；
- Crystal；
- Storage；
- Navigation。

## 4.2 User Recognition Intent

用户明确动作：

```text
点击当前候选的“停在这一幕”
```

事件生产者：

```text
RealityPressureSeedCandidatePresentation
```

事件消费者：

```text
RealityProductionHost.recognizePressureSeed(...)
```

正式 typed command：

```text
event：
PRESSURE_SEED_RECOGNIZE

sourceReferenceId：
当前正式生命来源

candidateBundleReferenceId：
当前 immutable bundle

recognizedCandidateReferenceId：
用户命中的候选
```

Recognition 不依赖：

- DOM `data-*`；
- 文案字符串；
- 固定计时器；
- Renderer；
- AI；
- Pressure 自动匹配；
- 默认候选。

## 4.3 Recognition Authority

当前没有独立命名的 Recognition Controller。

当前运行责任由以下链共同承担：

```text
RealityProductionHost
产生 typed command
↓
RealityProductionPressureSeedConsumer
校验当前 session、source 与 bundle
↓
RealityPressureSeedCaptureAdapter
校验候选成员与 provenance
↓
CAPTURED
↓
RealityProductionHost component state
保存本周期 recognized session
```

`SEED_RECOGNIZED` 的唯一正式生产者：

```text
RealityPressureSeedCaptureAdapter
```

成功条件：

- command 为 `PRESSURE_SEED_RECOGNIZE`；
- source reference 一致；
- bundle reference 一致；
- candidate 存在于当前 bundle；
- candidate record 与 presentation candidate 一致；
- 用户明确 Recognition。

成功输出：

- `selectedPressureSeedContext`；
- `captureProvenance`；
- `gravityReadiness = READY`；
- `captureState = SEED_RECOGNIZED`。

当前模型没有独立的 `candidateRevision`。

当前并发身份由不可变的：

```text
candidateBundleReferenceId
+
candidateReferenceId
+
sourceReferenceId
```

共同承担。

这足以完成当前组件周期内的 Recognition，但不足以表达跨 Host 生命周期的提交与恢复 revision。

## 4.4 Gravity Transfer

Recognition 成立后不会自动导航。

正式链路还要求第二个明确用户动作：

```text
SEED_RECOGNIZED
↓
innerViewApproachState = AWAITING_BODY_APPROACH
↓
用户轻触同一生命正在变化的位置
↓
CURRENT_LIFE_WEATHER_BODY_APPROACHED
↓
Typed GravityEntryTransferRequest
```

Transfer Request 携带：

- 当前 Reality Intent；
- 当前 encounter cycle；
- 完整 identity references；
- 当前 recognized Pressure Session；
- Capture provenance；
- Body Approach proof；
- Visual continuity。

## 4.5 Gravity Admission 与 Route

```text
RealityProductionRouteEntry
↓
executeRealityToGravityCutover(...)
↓
prepareGravityEntryTransfer(...)
↓
Recovery Envelope confirmed
↓
commitPreparedGravityTransfer(...)
↓
source Reality superseded
↓
COMMITTED Route Ticket
↓
navigate("/dynamics")
```

Route 只在：

```text
cutover.status === COMMITTED
```

时导航。

正式 Direct URL `/dynamics` 复验结果：

```text
gravityProductionRoute：
BLOCKED

可见反馈：
这次看见还没有被完整承接。
```

因此未发现：

- identity-only 旁路；
- navigate 即成功；
- 旧 callback 旁路；
- Pressure 存在即放行；
- Direct URL 绕过 Admission。

---

# 五、正式浏览器状态时间线

## 5.1 环境

```text
Remote HEAD：
45feea031d8b82c83e17953b38c1938d41d76993

Viewport：
1280 × 720

Motion：
prefers-reduced-motion = false

入口：
/launch → /reality
```

## 5.2 识别前

```text
sourceReferenceId：
launch:1995-06-02:酉时

intentReferenceId：
reality-intent:4f086a87-2154-4baf-8e5e-cdc2e673d086

encounterCycleId：
reality-encounter:6ac73a78-89c3-4b18-ab0a-86f9ebd7f0fc

admission revision：
2

active intent revision：
3

candidateBundleReferenceId：
pressure-seed-bundle:launch:1995-06-02:酉时:
ESTABLISHING:
ESTABLISHING_POWER_01:
ESTABLISHING_RELATION_01:
ESTABLISHING_FAMILY_01

captureState：
OBSERVING_CANDIDATES

gravityReadiness：
NOT_READY

innerViewEntryState：
INACTIVE
```

## 5.3 原失败操作

同名按钮数量：

```text
3
```

旧测试动作：

```text
getByRole("button", { name: "停在这一幕" }).nth(0)
```

该按钮的中心点命中栈中没有按钮自身。

它位于候选横向舞台的遮罩 / 裁切区域。

结果：

```text
Recognition command：
未产生

Controller outcome：
不存在

captureState：
OBSERVING_CANDIDATES
```

这不是 Authority 拒绝。

## 5.4 正确用户动作

当前真正可命中的中间候选：

```text
candidateReferenceId：
ESTABLISHING_RELATION_01

surface：
你们躺在一张床上，中间隔着一道墙。

button hit-test：
PASS
```

点击后：

```text
captureState：
SEED_RECOGNIZED

gravityReadiness：
READY

innerViewEntryState：
AWAITING_BODY_APPROACH

currentPressureRole：
CURRENT_USER_RECOGNIZED

hostState：
GRAVITY_READY_TO_CONTINUE

identity：
保持同一 sourceReferenceId / intent / encounter
```

## 5.5 Gravity Transfer

用户继续明确点击：

```text
靠近生命正在变化的位置
```

结果：

```text
Route：
/dynamics

pressure context：
connected

Gravity Observation Reference：
gravity-observation:180aaa4a-0021-4fec-98e9-3043a9d4ef9c

Choice Presentation：
SAFE_WITHHELD
```

说明：

- Pressure Recognition 已被 Gravity Admission 正式消费；
- 正式 Route Ticket 已承接；
- Counter-commit 仍保持新 Choice Presentation 暂停；
- 本刀没有恢复或绕过 Choice。

---

# 六、Host 生命周期复验

## 6.1 刷新前

```text
encounterCycleId：
reality-encounter:db928408-fad2-49ec-9c31-1a7ab5b40494

captureState：
SEED_RECOGNIZED

innerViewEntryState：
AWAITING_BODY_APPROACH
```

## 6.2 刷新后

```text
encounterCycleId：
保持不变

intentReferenceId：
保持不变

candidateBundleReferenceId：
保持不变

captureState：
OBSERVING_CANDIDATES

innerViewEntryState：
INACTIVE
```

结论：

```text
Reality Encounter Recovery：
PASS

Identity Recovery：
PASS

Pressure Recognition Recovery：
FAIL / RUNTIME MISSING

Body Approach Readiness Recovery：
FAIL / RUNTIME MISSING
```

当前 Host remount 会重新运行：

```text
initializePressureHostState(...)
```

得到新的 `OBSERVING_CANDIDATES` session。

没有稳定事实告诉 Host：

> 用户已经在同一 encounter 中明确认出哪一个 Pressure Candidate。

## 6.3 Back / Forward 与旧 Host

源码所有权证明：

- Recognition session 只存在于 Host state；
- Route 不拥有已识别 session；
- Recovery Adapter 不保存 Recognition；
- Host unmount 不会留下 typed Recognition receipt；
- 返回同一 `/reality` 只能从 Candidate bundle 重新初始化。

因此 Back / Forward 与普通 Host remount 具有同类风险：

```text
不会生成第二身份
不会绕过 Gravity Admission
但会丢失未完成 Transfer 的 Recognition
```

---

# 七、Motion / Reduced Motion

## Motion

正式浏览器：

```text
PASS
```

已完成：

- Candidate 可命中；
- Recognition；
- Body Approach；
- Typed Transfer；
- `/dynamics`。

## Reduced Motion

源码消费者关系：

```text
SAME AUTHORITY / SAME CALLBACK
```

理由：

- Candidate Presentation 不读取 `prefers-reduced-motion`；
- `onRecognize` 完全相同；
- Production Pressure Seed Consumer 完全相同；
- Gravity Transfer Request 完全相同；
- Reduced Motion 只改变 Life Surface 的 Motion / Static typed presentation outcome；
- CSS 只移除动画与 transition，不改变 Recognition event。

但本次正式浏览器环境：

```text
prefers-reduced-motion = false
```

当前 in-app production browser 没有原生 media emulation 接口。

因此：

```text
Reduced Motion 源码语义同权威：
PASS

Reduced Motion 原生生产浏览器点击证据：
MISSING
```

不得用源码声明把该证据缺口写成浏览器 PASS。

---

# 八、生产者—消费者矩阵

| 生产者 / 资产 | 输出 | 当前直接消费者 | Runtime 状态 | 裁决 |
|---|---|---|---|---|
| Reality Pressure Candidate Source | immutable candidate bundle | Delivery / Host | 已存在 | `KEEP` |
| RealityPressureSeedPresentation | explicit candidate click | RealityProductionHost | 已存在 | `KEEP` |
| Candidate DOM / `data-*` | observation mirror | 测试与验收 | 已存在 | `REJECT` 作为 Authority |
| RealityProductionHost | typed recognition command | Pressure Seed Consumer | 已存在 | `ADAPT`，退出唯一生命周期 Owner |
| RealityProductionPressureSeedConsumer | validated session advance | Capture Adapter / Host | 已存在 | `KEEP` |
| RealityPressureSeedCaptureAdapter | `SEED_RECOGNIZED` + provenance | Host continuation | 已存在 | `KEEP` |
| Host `pressureHostState` | current-cycle recognized session | Life Weather / Transfer | 组件周期内存在 | `MIGRATE` 生命周期所有权 |
| Pressure Continuation Context | active Pressure session | Production Host | 已存在 | `ADAPT`，允许消费恢复后的 typed fact |
| Recognition Recovery | stable recognized fact / receipt | 无 | 不存在 | `MAJOR PREP` 决定是否建立 |
| RealityLifeUniverseCanvas | explicit body approach intent | RealityProductionHost | 已存在 | `KEEP` |
| Reality → Gravity Cutover | committed route ticket | `/dynamics` | 已存在 | `KEEP` |
| Gravity Admission Controller | Gravity admission | Dynamics Route | 已存在 | `KEEP` |
| Route | committed navigation | `/dynamics` | 已存在 | `KEEP` |
| Renderer | visual surface | Presentation | 已存在 | `REJECT` 作为 Recognition Authority |
| Acceptance / Harness | auxiliary evidence | 开发验收 | 已存在 | `ISOLATE` |
| Production browser Gate | actionable path evidence | Release review | 不完整 | `ADAPT` |

---

# 九、KEEP / ADAPT / MIGRATE / ISOLATE / DELETE / REJECT

## KEEP

- 正式 Candidate Source；
- Pressure Seed Matrix V2 provenance；
- explicit Recognition command；
- Capture Adapter；
- Production Pressure Seed Consumer；
- Body Approach 明确用户动作；
- Typed Gravity Transfer；
- Atomic Reality → Gravity Cutover；
- Gravity Admission；
- Direct URL guard；
- Choice Presentation SAFE_WITHHELD。

## ADAPT

- 正式浏览器可达性 Gate：
  必须选择当前真正可命中的候选，而不是固定 `nth(0)`；
- RealityProductionHost：
  未来只消费 / 投递稳定 Recognition fact，不独占跨生命周期事实；
- Pressure Continuation：
  未来需要明确如何接收恢复候选；
- Route：
  未来只通过 typed Recovery result 装配 Host，不直接读 Storage。

## MIGRATE

- `pressureHostState` 对已识别事实的跨生命周期唯一所有权；
- Recognition 与 Body Approach readiness 的刷新恢复责任。

## ISOLATE

- 未注册的旧 Pressure Host 检查脚本；
- Acceptance Page；
- Development Harness；
- 纯 DOM string evidence；
- 横向舞台中未命中的 offscreen semantic locator。

## DELETE

本刀未确认需要删除任何正式 Runtime。

后续 Prep 只可把旧页面生命周期 Authority 列入迁移候选，不得在 Prep 中直接删除。

## REJECT

- DOM / `data-*` 作为 Recognition Authority；
- 自动 Recognition；
- 固定计时器提交 Recognition；
- Renderer 提交 Recognition；
- Direct URL 进入 Gravity；
- Pressure Candidate 存在即自动导航；
- identity-only Gravity Admission；
- 恢复旧 callback；
- 普通 revert `45feea0`；
- 在本刀重开 Choice；
- 在本刀开始 Visual Runtime。

---

# 十、Gate 与构建证据

远程干净快照：

```text
TypeScript：
PASS

Production Build：
PASS
```

正式相关 Gate：

```text
check-reality-production-pressure-host：
PASS

check-reality-production-pressure-seed-consumer：
PASS

check-reality-pressure-seed-presentation-contract：
PASS

check-reality-pressure-seed-capture-adapter：
PASS

check-xinmai-reality-seed-recognition-body-response：
PASS

check-xinmai-gravity-entry-browser-acceptance：
PASS

check-xinmai-reality-seed-continuous-discovery：
PASS

check-xinmai-gravity-entry-production-browser-acceptance-harness：
PASS
```

注意：

Gate 证明 typed contract 与静态边界。

真正推翻“生产不可达”的证据仍然是：

```text
正式 /launch
→ 正式 /reality
→ 当前可命中候选
→ SEED_RECOGNIZED
→ 明确 Body Approach
→ 正式 /dynamics
```

---

# 十一、风险分级

## 原阻断

```text
GREEN FACT：
浏览器证据操作错误
```

不需要修改 Runtime 才能恢复连续成功路径。

## 新发现

```text
YELLOW：
Recognition Host Lifecycle Continuity
```

原因：

- Recognition 是稳定用户动作；
- 当前只存在于 Host state；
- refresh / remount 会丢失；
- 未来若直接添加 Storage，容易形成 Route、Host 与 Recovery 双 Authority；
- 必须先冻结产品事实、Owner、typed outcome、恢复与清除语义。

## 未发现红灯

```text
第二 Recognition Authority：
0

旧导航旁路：
0

Direct URL 绕过：
0

自动 Pressure Selection：
0

成功真源替换：
0

新旧 Reality / Gravity 双路径：
0
```

因此不进入 Migration Audit。

---

# 十二、下一刀

```text
XINMAI-REALITY-PRESSURE-SEED-RECOGNITION-
HOST-LIFECYCLE-CONTINUITY-MAJOR-BLADE-PREP-P0

交通灯：
YELLOW

刀型：
Major Blade Prep

决策：
NOW — PREP ONLY

Runtime / Storage / Gate / Renderer：
DEFER
```

下一刀必须冻结：

1. `SEED_RECOGNIZED` 是否属于 encounter 内稳定生命事实；
2. Recognition Fact / Receipt 的最小 typed schema；
3. 唯一生命周期 Owner；
4. Host、Route 与 Recovery Adapter 的责任；
5. candidate bundle、candidate reference 与 revision 绑定；
6. Refresh、Back / Forward、Host remount 的恢复矩阵；
7. Recognition 后、Body Approach 前的中断语义；
8. Body Approach proof 是否独立恢复；
9. Recognition 删除、替换、下一 bundle 与 explicit leave 的清除语义；
10. Motion / Reduced Motion 原生浏览器双路径；
11. 正式浏览器 Gate 如何只操作当前可命中的候选；
12. 是否需要原子迁移，或可以由窄 Major 完成。

后续顺序：

```text
Recognition Host Lifecycle Major Prep
↓
必要时 Migration Audit / Major Application
↓
正式 Reality → Gravity 双模式关闭复验
↓
新的 forward activation commit
解除 Choice Presentation SAFE_WITHHELD
↓
Resolver Closure Revalidation
↓
Visual Major Blade Readiness
```

---

# 十三、刀后状态

```text
Reality → Gravity 连续 Motion 路径：
REACHABLE / PASS

原 Production Reachability Block：
FALSE POSITIVE / BROWSER EVIDENCE OPERATION ERROR

Pressure Recognition Runtime：
EXISTS

Pressure Recognition Lifecycle Continuity：
OPEN

Typed Gravity Transfer：
PASS

Gravity Admission：
PASS

Direct URL Bypass：
0

Choice Presentation Resolver：
IMPLEMENTED / SAFE_WITHHELD

Reality Adventure：
ACTIVE / REACHABILITY PATH RECOVERED
LIFECYCLE CONTINUITY OPEN

Visual Runtime：
DEFER

Phase 3：
ACTIVE / NOT PASSED

Phase 4：
LOCKED
```

本刀不恢复 Choice，不进入视觉施工，不修改任何 Runtime。
