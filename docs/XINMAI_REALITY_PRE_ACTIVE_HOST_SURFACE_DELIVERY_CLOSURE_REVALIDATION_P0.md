# XINMAI Reality Pre-Active Host Surface Delivery Closure Revalidation P0

## 0. Construction State Card

任务：

```text
XINMAI-REALITY-PRE-ACTIVE-HOST-SURFACE-DELIVERY-CLOSURE-REVALIDATION-P0
```

刀型：

```text
MAP / Independent Closure Audit
```

决策：

```text
NOW — MAP ONLY
```

Runtime 修改：

```text
0
```

当前阶段：

```text
Phase 2：
CLOSED

RealityEncounterIntent Runtime Authority：
ESTABLISHED

Phase 3：
LOCKED
```

主 Layer：

```text
Layer 3 Relationship
→
Layer 4 Growth Entry Boundary
```

本刀唯一目标：

> 独立复验远程交付是否已经以一个 Reality Host 闭合 `ACCEPTING_REALITY → Typed Surface Outcome → ACTIVE_IN_REALITY`，并确认任何 Reality / Gravity 交互都不会在 Controller 提交 Active 前发生。

---

## 1. 独立关闭裁决

最终裁决：

```text
Pre-Active Host Surface Delivery：
CLOSED

RealityEncounterIntent Delivery：
CLOSED

Single Host Authority：
PASS

Controller Active Authority：
PASS

Pre-Active Interaction Isolation：
PASS

Motion：
PASS

Reduced Motion：
PASS

Failure / Retry：
PASS

Direct URL Bypass：
REJECTED

Reality → Gravity Continuity：
PASS

Phase 3：
LOCKED
```

已经成立的唯一因果：

```text
用户明确进入 Reality
↓
RealityEncounterIntent READY / ACCEPTING_REALITY
↓
Route Post-commit Admission
↓
同一个 RealityProductionHost
PRE_ACTIVE_PRESENTATION
↓
Typed Life Surface Outcome
+
Typed Candidate Surface Outcome
↓
Host 组装 REALITY_MINIMUM_PRESENTED
↓
Route 将 Outcome 交给 Controller
↓
Controller 唯一提交 ACTIVE_IN_REALITY
↓
同一个 RealityProductionHost
ACTIVE_INTERACTION
↓
Reality 用户交互开放
```

原阻断循环已经消失：

```text
Host 挂载不再要求 Active
+
Active 仍然要求 Host 的真实 Typed Outcome
```

因此不需要：

- 第二个 Host；
- 第二个 Reality 页面；
- Route 自主 Active；
- 固定计时器成功；
- DOM 反向读取；
- 提前开放 Pressure Seed / Gravity 交互。

---

## 2. 审计基线

远程唯一基线：

```text
Branch：
codex/genesis-28-mansion-production-continuity

Remote HEAD：
6918fd1c8e6cf0fa921a61af30f1331b6a275dc1

Commit：
fix(reality): establish pre-active host surface cutover
```

独立快照：

```text
/var/folders/40/4xd0h5k93tj376s_p3rvxq180000gn/T/xinmai-preactive-audit.XXXXXX.4Yc4BWjS2T
```

快照来源：

```text
git archive Remote HEAD
```

审计开始时：

```text
Remote HEAD == Audit Snapshot HEAD：
YES

Runtime 差异：
0

主工作树既存修改：
PROTECTED / NOT CONSUMED
```

审计文档在 Runtime、Build 与浏览器证据完成后新增，不参与被审计运行时。

---

## 3. 证据等级

|证据|本刀用途|不能替代|
|-|-|-|
|产品协议|定义单 Host、单 Active 权威与 Phase 边界|Runtime 可达性|
|源码结构|定位生产者、消费者和门禁|真实用户路径|
|自动门禁|验证确定性状态转换与禁止通道|真实表面呈现|
|Production Build|证明远程提交可独立构建|产品因果正确性|
|真实浏览器|证明预激活、Active、失败和重试真实可达|未执行的任意未来能力|

关闭裁决基于：

```text
远程干净快照
+
源码消费者审计
+
自动门禁
+
Motion 真实浏览器
+
Reduced Motion 真实浏览器
+
失败与重试真实浏览器
+
Direct URL 负向浏览器
```

不是基于源码字符串单独作出。

---

## 4. 单 Host 与 Active 权威复验

### 4.1 Host 数量

`RealityProductionRouteEntry` 中生产 Host 挂载点：

```text
<RealityProductionHost />：
1
```

预激活与激活使用同一 React Host 实例：

```text
Host key：
intentReferenceId
+
encounterCycleId
+
admissionRevision
```

同一次 admission 内从：

```text
PRE_ACTIVE_PRESENTATION
```

切换到：

```text
ACTIVE_INTERACTION
```

不会替换 Host key。

### 4.2 Controller 权威

Active 成立路径：

```text
RealityHostAcceptanceOutcome
↓
RealityProductionRouteEntry
↓
commitRealityEncounterActive(outcome)
↓
Controller
```

确认：

```text
Route Controller Active Caller：
1

Host Controller Active Caller：
0

Renderer Controller Active Caller：
0

Pressure Presentation Active Caller：
0
```

Route 只保存已被 Controller 确认的 typed commit receipt，并再次校验：

- `intentReferenceId`；
- `encounterCycleId`；
- `sourceReferenceId`；
- StarBeast identity reference；
- mansion coordinate reference；
- admission revision；
- active revision。

其中：

```text
activeRevision
=
admissionRevision + 1
```

### 4.3 禁止成功旁路

|旁路|结果|
|-|-|
|身份存在即 Active|未发现|
|Route mount 即 Active|未发现|
|`navigate("/reality")` 即 Active|未发现|
|DOM 节点存在即 Active|未发现|
|Mutation Observer 成功通道|未发现|
|固定计时器成功|未发现|
|Pressure 候选对象创建即 Active|未发现|
|Recovery 字段存在即 Active|未发现|
|旧周期 Outcome 提交当前周期|门禁拒绝|
|页面直接写 Active|未发现|

8 秒 Watchdog 仍然只产生失败：

```text
SURFACE_OUTCOME_WATCHDOG_EXPIRED
```

不产生成功。

---

## 5. Pre-Active 交互隔离

Host 在 `PRE_ACTIVE_PRESENTATION` 可以呈现成立 Active 所需的同体生命表面与候选表面，但不能执行 Phase 3 用户动作。

四类命令均要求：

```text
realityInteractionActive === true
```

包括：

1. `PRESSURE_SEED_RECOGNIZE`；
2. `PRESSURE_SEED_REQUEST_NEXT_BUNDLE`；
3. `PRESSURE_SEED_PAUSE`；
4. 进入 Gravity 的身体靠近。

Presentation 同时接收显式：

```text
interactionEnabled
```

预激活状态：

```text
data-reality-surface-phase：
PRE_ACTIVE_PRESENTATION

data-reality-interaction-enabled：
FALSE

data-reality-active-intent-revision：
NONE

候选交互按钮：
0
```

Active 状态：

```text
data-reality-surface-phase：
ACTIVE_INTERACTION

data-reality-interaction-enabled：
TRUE

候选交互：
AVAILABLE
```

这意味着：

> 候选表面可以作为 Reality 最低可用表面的视觉事实，但 Pressure Seed 的用户选择、Gravity、Choice 与 Crystal 不会提前执行。

---

## 6. 真实浏览器证据

### 6.1 Motion

入口：

```text
真实 Launch
→ 生命钥匙
→ 生命坐标
→ Recognition
→ WHISPER_SKIPPED
→ 进入现实观察
```

预激活事实：

```text
status：
PRE_ACTIVE_REALITY_SURFACE_PRESENTATION

phase：
PRE_ACTIVE_PRESENTATION

authority：
ACCEPTING_REALITY

admissionRevision：
2

activeRevision：
NONE

interaction：
FALSE

hostCount：
1

candidateButtons：
0
```

Active 事实：

```text
status：
AUTHORIZED_PRODUCTION_REALITY_SOURCE

phase：
ACTIVE_INTERACTION

authority：
ACTIVE_IN_REALITY

admissionRevision：
2

activeRevision：
3

interaction：
TRUE

hostCount：
1

candidateButtons：
6
```

同一 admission 的 Host key 前后完全一致。

之后真实执行：

```text
认出 Reality 片段
↓
SEED_RECOGNIZED
↓
Gravity READY
↓
用户靠近生命正在变化的位置
↓
/dynamics
```

Gravity 验收事件：

```text
CUTOVER：COMMITTED
ROUTE_ADMISSION：READY
LIFE_SURFACE：GRAVITY_LIFE_SURFACE_PRESENTED
OBSERVATION_SURFACE：GRAVITY_OBSERVATION_SURFACE_PRESENTED
HOST_OUTCOME：GRAVITY_MINIMUM_PRESENTED
CONTROLLER_COMMIT：ACTIVE_IN_GRAVITY
```

裁决：

```text
Motion：
PASS

Reality → Gravity Continuity：
PASS
```

### 6.2 Reduced Motion

同一 active encounter 通过正式 Recovery 链重新承接，并在开发验收环境启用：

```text
__xinmaiReducedMotion=1
```

Recovery 前后保持同一个：

```text
encounterCycleId
```

Reduced Motion admission 的预激活事实：

```text
admissionRevision：
4

activeRevision：
NONE

phase：
PRE_ACTIVE_PRESENTATION

interaction：
FALSE

hostCount：
1

candidateButtons：
0
```

静态 Typed Surface 成立后：

```text
admissionRevision：
4

activeRevision：
5

phase：
ACTIVE_INTERACTION

interaction：
TRUE

hostCount：
1
```

同一 admission 的 Host key 前后完全一致。

裁决：

```text
Reduced Motion Static Typed Outcome：
PASS

Reduced Motion Active Commit：
PASS
```

### 6.3 Renderer 失败

同一个 encounter cycle 进入 Renderer failure 验收。

失败前：

```text
phase：
PRE_ACTIVE_PRESENTATION

authority：
ACCEPTING_REALITY

interaction：
FALSE
```

Watchdog 后：

```text
status：
SOURCE_NOT_READY

authority：
FAILED_RETRYABLE

guard：
SURFACE_OUTCOME_WATCHDOG_EXPIRED

ACTIVE：
NO
```

UI 提供：

```text
继续这一轮
这一轮先到这里
```

未声称已经进入 Reality。

### 6.4 同周期重试

移除失败注入后，用户选择：

```text
继续这一轮
```

重试保持原：

```text
encounterCycleId
```

新 admission：

```text
admissionRevision：
9

activeRevision：
10
```

同一重试 admission 内 Host key 从预激活到 Active 保持一致。

裁决：

```text
Same-cycle Retry：
PASS

New encounterCycleId：
0

False Active：
0
```

### 6.5 Direct URL

全新浏览器 tab 直接访问：

```text
/reality
```

结果：

```text
status：
SOURCE_NOT_READY

authority：
ABSENT

guard：
RECOVERY_CANDIDATE_NOT_FOUND

Reality Host count：
0
```

裁决：

```text
Direct URL Bypass：
REJECTED
```

---

## 7. 消费者边界

|生产者|输出|直接消费者|预激活权限|Active 后权限|
|-|-|-|-|-|
|Reality Intent Controller|`ACCEPTING_REALITY`|Route|允许挂载单一 Host|等待 Outcome|
|Reality Life Surface|Typed Life Outcome|Host|只报告真实表面|不拥有交互|
|Reality Candidate Surface|Typed Candidate Outcome|Host|只报告真实表面|不拥有 Active|
|Reality Host|`REALITY_MINIMUM_PRESENTED`|Route|可报告|不提交 Controller|
|Route|Host Outcome|Controller|仅转交并校验|保存 typed receipt|
|Controller|`ACTIVE_IN_REALITY`|Route / Host authority adapter|唯一提交者|开放交互资格|
|Pressure Presentation|用户动作|Pressure consumer|禁止|允许|
|Body Approach|Gravity transfer request|Gravity cutover|禁止|用户明确动作后允许|

禁止消费者：

```text
Life Whisper Text：
未消费

Relationship Name：
未消费

AI Reflection：
未触发

Six Dimension：
未触发

Choice：
未触发

Crystal：
未触发

Archive Growth：
未触发

Renderer Relationship State：
未新增
```

历史 Reality 与 Crystal 只保持既有 memory-only / body-imprint 角色，不成为当前 Active 权威。

---

## 8. Build 与门禁

远程干净快照：

```text
TypeScript：
PASS

Production Build：
PASS

Transformed Modules：
301

新增 Build Failure：
0
```

门禁：

```text
Reality Pre-Active Host Surface Atomic Correction：
PASS

Reality Encounter Intent Controller：
PASS

Reality Encounter Intent Recovery：
PASS

Reality Encounter Intent Atomic Migration：
PASS

Reality Route Admission Post-Commit：
PASS

Reality Surface Outcome Admission Transaction：
PASS

Reality Production Route Entry：
PASS

Gravity Production Browser Acceptance Harness：
PASS
```

既存黄灯：

```text
check-reality-pressure-seed-presentation-contract：
FAIL

原因：
门禁仍要求旧字面文案「Gravity 尚未启动」
```

该失败：

- 在本次 Runtime 修改前已经存在；
- 不参与 Host 挂载、Typed Outcome、Controller Active 或交互门禁；
- 不证明本次交付存在双 Host 或 Active 旁路；
- 不应反向阻止本次 Delivery 关闭；
- 必须进入独立语义门禁 MAP，不得在本审计中修改文案或检查。

---

## 9. 资产保护

### World

```text
动态星河：
保持

黑曜生命空间：
保持

同一 Reality 空间：
保持

第二 Reality 页面：
0
```

### Identity

```text
sourceReferenceId：
保持

StarBeast identity reference：
保持

mansion coordinate reference：
保持

重新出生：
0

重新计算二十八宿：
0
```

### Relationship

```text
Recognition：
保持

Life Whisper：
保持

Relationship Naming：
未被消费

Reality Intent：
同一 encounter cycle
```

### Growth Boundary

```text
Pre-Active Pressure Interaction：
0

Pre-Active Gravity Transfer：
0

Pre-Active Choice：
0

Pre-Active Crystal：
0
```

---

## 10. Definition of Done

|关闭条件|结果|
|-|-|
|ACCEPTING 可挂载真实 Host|PASS|
|Host 数量为 1|PASS|
|同一 admission Host 不被替换|PASS|
|Motion Typed Outcome 可提交 Active|PASS|
|Reduced Motion Typed Outcome 可提交 Active|PASS|
|Controller 是唯一 Active 权威|PASS|
|admission / active revision 正确分离|PASS|
|预激活交互为 0|PASS|
|失败不伪造 Active|PASS|
|同周期可重试|PASS|
|直接 URL 不旁路|PASS|
|Reality → Gravity 保持|PASS|
|无新增 DOM Runtime 通道|PASS|
|无第二 Host / 第二身份 / 第二 Reality 链|PASS|
|远程干净快照独立构建|PASS|

因此：

```text
Pre-Active Host Surface Delivery：
CLOSED

RealityEncounterIntent Delivery：
CLOSED
```

达到停止条件。

---

## 11. 交通灯扫描

### 绿色

```text
Host Causal Circularity：
RESOLVED

Single Host Cutover：
STABLE

Controller Active Authority：
STABLE
```

### 黄色

```text
Pressure Presentation / Gravity Stage Semantic Gate：
MAP
```

问题：

> 当前门禁仍把旧字面文案「Gravity 尚未启动」当作实现契约，需要判断它是陈旧字符串断言，还是仍代表未冻结的 Pressure / Gravity 阶段语义。

该问题不回开本次 Delivery。

### 红色

```text
新增双 Host：
0

新增 Active 权威：
0

新增生产路径：
0

Migration Audit Required：
NO
```

---

## 12. 阶段裁决与下一刀

正式状态：

```text
Phase 2：
CLOSED

RealityEncounterIntent Runtime Authority：
ESTABLISHED

RealityEncounterIntent Delivery：
CLOSED

Phase 3：
LOCKED
```

关闭本刀不自动解锁 Phase 3。

下一刀：

```text
XINMAI-PRESSURE-PRESENTATION-GRAVITY-STAGE-SEMANTIC-GATE-MAP-P0
```

刀型：

```text
MAP
```

决策：

```text
NOW — MAP ONLY
```

唯一目标：

> 裁决 Pressure Presentation 的旧字面门禁究竟是陈旧测试，还是尚未解决的 Gravity 阶段语义冲突；只完成归属和后续刀型判断，不修改 Runtime。

该 MAP 完成后，才进入独立：

```text
XINMAI-PHASE-3-ENTRY-REVIEW-P0
```

由 Product Control Tower 决定是否解锁 Phase 3。
