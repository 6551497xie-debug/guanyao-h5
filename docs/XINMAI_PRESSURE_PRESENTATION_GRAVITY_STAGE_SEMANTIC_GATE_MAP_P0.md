# XINMAI Pressure Presentation Gravity Stage Semantic Gate Map P0

## 0. Construction State Card

任务：

```text
XINMAI-PRESSURE-PRESENTATION-GRAVITY-STAGE-SEMANTIC-GATE-MAP-P0
```

刀型：

```text
MAP / Stage Semantic Gate Review
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
Phase 2:
CLOSED

Phase 3:
LOCKED
```

审计基线：

```text
4a1daf1d45b6f75a6864debdb84468d8da974e72
```

远程分支：

```text
codex/genesis-28-mansion-production-continuity
```

本刀唯一目标：

> 裁决 Pressure Presentation 与 “Gravity 尚未启动”门禁究竟是陈旧检查，还是仍未解决的阶段权威冲突。

本刀不：

- 修改 Pressure 文案；
- 修改门禁；
- 修改 Runtime；
- 接入 Gravity Consumer；
- 修改 `/reality` 或 `/dynamics`；
- 修改 Selected Pressure Seed Context；
- 扩张 Six Dimension、Choice、Crystal；
- 解锁 Phase 3；
- 顺带修复其他 Release Gate 漂移。

---

## 1. 证据等级

本 MAP 区分：

```text
P = Protocol declaration
S = Source structure
A = Automated gate evidence
B = Real browser behavior
R = Remote clean baseline
```

裁决原则：

- 精确文案存在不能证明阶段边界成立；
- 文案消失不能证明 Gravity 已经执行；
- `gravityReadiness = READY` 不等于 Gravity 已经启动；
- `useEffect` 存在不等于 Presentation 拥有业务 Runtime；
- Service 存在不等于 Production Consumer 已接入；
- Gate 注册不等于 Gate 仍符合当前架构；
- 当前实际 Runtime 不自动等于未来产品目标权威；
- Phase 3 仍锁定时，不以既存兼容链代替 Product Control Tower 的正式授权。

---

## 2. 待裁决门禁

目标门禁：

```text
scripts/check-reality-pressure-seed-presentation-contract.mjs
```

当前失败：

```text
V2 Pressure Seed presentation implementation
missing:
Gravity 尚未启动
```

该门禁还冻结：

```text
useEffect:
FORBIDDEN
```

但当前 Presentation 合法使用 `useEffect`：

```text
React commit
↓
校验当前 Reality admission attempt
↓
校验 sourceReferenceId
↓
校验 Candidate Bundle 非空
↓
报告 Typed Reality Pressure Surface Outcome
```

该 effect：

- 不计算 Pressure；
- 不选择 Candidate；
- 不执行 Gravity；
- 不导航；
- 不写存储；
- 不调用 Engine；
- 不生成 Choice 或 Crystal；
- 只报告已经呈现的 Pressure Surface 事实。

因此门禁包含两个历史假设：

1. 以旧精确文案作为阶段真源；
2. 把所有 `useEffect` 等同于业务 Runtime 副作用。

两项假设均不再符合当前 Typed Surface Outcome 架构。

---

## 3. Pressure Presentation 当前权威边界

当前边界：

```text
REALITY_PRESSURE_SEED_PRESENTATION_BOUNDARY
```

明确冻结：

```text
productionPressureSeedPresentationOnly:
true

statelessPresentationOnly:
true

candidateSurfaceAndShellOnly:
true

explicitRecognitionCallbackOnly:
true

explicitNextBundleCallbackOnly:
true

explicitPauseCallbackOnly:
true

explicitGravityContinuationCallbackOnly:
true

noGravityExecution:
true

noChoiceExecution:
true

noCrystalExecution:
true

noNavigationMutation:
true

noStorageRead:
true

noStorageWrite:
true
```

当前 Presentation 的直接职责：

| 输入 | 可见输出 | 允许回调 | 禁止行为 |
|---|---|---|---|
| Pressure Seed Session | Reality Candidate Surface | Recognize | 不解释人格 |
| Candidate Bundle | 下一组现实片段 | Request Next Bundle | 不自动选择 |
| Capture State | 生命回应文案 | Pause | 不执行 Gravity |
| Explicit Leave State | 当前离开入口 | Explicit Leave | 不直接导航 |
| Admission Attempt | Typed Pressure Surface Outcome | Surface Outcome | 不提交 Active |

当前组件没有调用：

```text
initializeRealityProductionGravityConsumer
advanceRealityProductionGravityConsumer
navigate
GravityPage
GuanyaoRuntimeEngine
```

裁决：

```text
Pressure Presentation Gravity Execution:
0
```

```text
Pressure Presentation Boundary:
PASS
```

证据：

```text
S + A + B
```

---

## 4. Gravity Readiness 与 Gravity Started

必须区分：

```text
Gravity Readiness
≠
Gravity Execution
≠
Gravity Experience Presented
```

当前 Pressure Session 的语义：

### 4.1 Candidate 尚未被认出

```text
captureState:
AWAITING_RECOGNITION

gravityReadiness:
NOT_READY

Gravity execution:
0
```

### 4.2 Candidate 已被用户认出

```text
captureState:
SEED_RECOGNIZED

selectedPressureSeedContext:
PRESENT

gravityReadiness:
READY

Gravity execution:
仍为 0
```

`READY` 只代表：

> 当前用户已经认出一个现实片段，Pressure 结果具备被下游明确承接的资格。

它不代表：

- Gravity 已经开始；
- Gravity Session 已建立；
- Gravity UI 已呈现；
- Six Dimension 已生成结论；
- Choice 已可执行；
- Crystal 已经准备沉积。

### 4.3 Reality Host 中的用户动作

当前用户必须主动：

```text
靠近生命正在变化的位置
```

Host 状态：

```text
AWAITING_BODY_APPROACH
↓
BODY_APPROACHED
```

只有该动作成立后，Host 才通过：

```text
onContinueToGravity(currentReality)
```

把当前被认出的 Reality 交给 Route。

裁决：

```text
Readiness / Execution Separation:
PASS
```

---

## 5. 真实浏览器阶段证据

隔离基线：

```text
http://127.0.0.1:5193
```

真实路径：

```text
Returning Life World
↓
暂时不说
↓
和它一起进入新的现实
↓
Reality Candidate Surface
↓
用户点击“停在这一幕”
```

认出后可见：

```text
生命回应

这一幕，正在经过你们。

先让文字退远一点，看生命身体里哪一处开始回应。

身体里有一处回应正在成形。轻触生命本身，靠近它。
```

同时出现用户动作：

```text
靠近生命正在变化的位置
```

此时：

- URL 仍为 `/reality`；
- Gravity 页面未出现；
- 没有直接 Gravity 按钮；
- 没有自动导航；
- 没有 Choice 或 Crystal；
- 同一生命仍是视觉主体。

用户主动靠近后：

```text
按钮进入 disabled
↓
身体靠近状态成立
↓
Route 接收 continuation
↓
URL 到达 /dynamics
```

`/dynamics` 可见：

```text
刚才回应的地方，开始显出生命的流动。

你认出的现实：
你们躺在一张床上，中间隔着一道墙。

观察入口 · 身体
```

裁决：

```text
Pressure Surface Starts Gravity Automatically:
NO
```

```text
User Body Approach Required:
YES
```

```text
Current Runtime Gravity Handoff:
/dynamics
```

证据：

```text
B
```

---

## 6. 当前生产交接链

当前 Runtime 事实：

```text
RealityPressureSeedPresentation
只展示与收集用户认出
↓
RealityProductionHost
形成 gravityReadiness + Inner View Approach
↓
用户靠近同一生命身体
↓
onContinueToGravity
↓
RealityProductionRouteEntry
校验 ACTIVE_IN_REALITY
↓
terminateRealityEncounter(
  terminalReason: ENCOUNTER_COMPLETED
)
↓
writeSelectedPressureSeedContext
↓
navigate(GUANYAO_ROUTES.dynamics)
↓
GravityPage
```

当前 `RealityProductionRouteEntryBoundary` 已明确声明：

```text
selectedPressureSeedHandoffWriteOnly:
true

explicitDynamicsNavigationOnly:
true

noGravityExecution:
true
```

这表示：

- Route 只拥有 handoff；
- Route 不执行 Gravity；
- 当前 Reality Host 不拥有 Gravity Runtime；
- 当前真正承接 Gravity 体验的页面是 `/dynamics`；
- Selected Pressure Seed Context 是当前交接资产。

---

## 7. Formal Gravity Consumer 审计

已有资产：

```text
realityProductionGravityConsumer.ts
RealityGravityPresentation.tsx
realityProductionChoiceConsumer.ts
```

Service 本身定义了：

```text
confirmedPressureSessionOnly:
true

explicitObservationConfirmationRequired:
true

choiceReadinessOutputOnly:
true

noChoiceExecution:
true

noCrystalExecution:
true
```

但当前 Runtime caller 搜索结果：

```text
initializeRealityProductionGravityConsumer:
0 production caller

advanceRealityProductionGravityConsumer:
0 production caller

RealityGravityPresentation:
0 production caller
```

`RealityGravityPresentation` 仍只被：

```text
PersonalStarBeastWebGLPrototypeHarness
```

消费。

因此：

```text
RealityProductionGravityConsumer:
IMPLEMENTED AS SERVICE
NOT CURRENT PRODUCTION RUNTIME AUTHORITY
```

它不是第二条正在运行的 Gravity 链，但它仍是一个尚未被正式处置的架构资产。

---

## 8. 注册门禁冲突

### 8.1 当前 V2 Atomic Host Gate

```text
check-reality-pressure-v2-atomic-host-cutover
```

结果：

```text
PASS
```

该门禁明确要求 V2 Host 排除：

```text
RealityPressurePresentation
realityProductionPressureConsumer
RealityGravityPresentation
realityProductionGravityConsumer
RealityChoicePresentation
realityProductionChoiceConsumer
GravityPage
guanyaoRuntimeEngine
```

并冻结：

```text
explicitGravityContinuationCallbackOnly:
true

noGravityExecution:
true
```

### 8.2 历史 Production Gravity Host Gate

```text
check-reality-production-gravity-host
```

结果：

```text
FAIL
```

首个缺失：

```text
initializeRealityProductionGravityConsumer
```

该门禁要求同一个 `RealityProductionHost` 必须包含：

- V1 Pressure Consumer；
- Production Gravity Consumer；
- Production Choice Consumer；
- Gravity Presentation；
- Choice Presentation。

这与当前 V2 Atomic Host Gate 的排除要求直接矛盾。

两项门禁不可能同时作为同一 Host 的当前权威。

### 8.3 Production Gravity Consumer Gate

```text
check-reality-production-gravity-consumer
```

Service 级语义测试通过，包括：

- 未确认 Pressure 不得初始化 Gravity；
- `READY` Pressure 可建立 Gravity Session；
- sourceReferenceId 连续；
- fixture 与 cross-session 被拒绝；
- Choice 只得到 readiness；
- Service 不执行 Choice 或 Crystal。

但门禁最终失败于：

```text
Production Host initializes the authorized Gravity consumer
missing:
initializeRealityProductionGravityConsumer
```

因此该 Gate 混合了：

1. 仍有效的 Service Unit Contract；
2. 已被 V2 Cutover 替换的 Host Integration Contract。

### 8.4 Gravity Change Experience Routing Gate

```text
check:gravity-change-experience-routing
```

当前失败：

```text
gravity consumes formal first response label
missing:
presentation?.recognition.firstResponseLabel
?? CHANGE_EXPERIENCE_FIRST_RESPONSE_LABEL
```

这属于当前 `/dynamics` Consumer 的另一项精确源码门禁漂移。

它不证明 Gravity 不可达，但证明：

> 当前实际承接者 `/dynamics` 自身仍有未校准的消费者门禁。

---

## 9. 门禁年代与覆盖关系

历史顺序：

```text
289b3d9
activate Reality production Pressure presentation
↓
db6c1de
activate Reality production Gravity presentation
↓
32948c0
activate Reality production Choice presentation
↓
ad0b8a8
cut Reality Pressure Host over to V2
```

`ad0b8a8` 明确：

- 从 Host 移除 V1 Pressure、Gravity、Choice Consumer；
- 让 V2 Pressure Seed Consumer 成为当前 Host；
- 把 Gravity 保持为 explicit continuation；
- 禁止 Host 执行 downstream；
- 新增 V2 Atomic Host Gate；
- 要求 Host bundle 排除旧 Gravity Consumer 和 Presentation。

后续：

```text
42a1dca
enter inner view through life weather
```

进一步冻结：

```text
Reality recognition
↓
same-body response
↓
user body approach
↓
existing Gravity handoff
```

因此审计确认：

```text
Current Host Authority:
V2 Atomic Host
```

```text
Old Production Gravity Host Gate:
SUPERSEDED INTEGRATION EXPECTATION
```

---

## 10. “Gravity 尚未启动”裁决

精确文案：

```text
Gravity 尚未启动
```

裁决：

```text
STALE UI COPY GATE
```

原因：

1. 它是实现术语，不是当前用户语言；
2. 当前页面已经改为“身体回应正在成形”的生命语义；
3. 当前结构仍然证明 Gravity 未在 Pressure Presentation 执行；
4. 阶段边界应由 typed state、consumer boundary 和真实 handoff 证明；
5. 恢复旧文案会降低产品体验，却不能增加架构安全；
6. 即使恢复文案，该 Gate 仍会因合法 Typed Surface `useEffect` 再次失败。

因此：

```text
Missing Exact Copy:
NOT A RUNTIME DEFECT
```

```text
Pressure Presentation Stage Conflict:
NO
```

```text
Gate Calibration Required:
YES
```

---

## 11. 建议的新语义门禁

后续 Gate 校准不得继续以精确用户文案冻结阶段。

应断言：

### Presentation

```text
noGravityExecution:
true

no direct initializeRealityProductionGravityConsumer

no direct advanceRealityProductionGravityConsumer

no direct navigate

no direct GravityPage

no direct GuanyaoRuntimeEngine
```

### Typed Surface Outcome

允许：

```text
useEffect
```

但只允许报告：

```text
REALITY_PRESSURE_SURFACE_PRESENTED
REALITY_PRESSURE_SURFACE_UNAVAILABLE
```

并必须绑定：

```text
intentReferenceId
encounterCycleId
intentRevision
sourceReferenceId
candidateBundleReferenceId
```

### Readiness

应断言：

```text
gravityReadiness = READY
```

只产生：

```text
Inner View Guidance
```

不得直接产生：

```text
Gravity Session
Choice Readiness
Crystal Readiness
Navigation
```

### User Agency

应断言：

```text
data-direct-gravity-action:
WITHHELD

data-inner-view-entry-action:
USER_APPROACH_REQUIRED
```

---

## 12. 阶段权威裁决

分层结论：

### Pressure Presentation 层

```text
Stage Authority Conflict:
NO
```

当前 Presentation 没有执行 Gravity。

### Reality → Gravity Handoff 层

```text
Current Runtime Fact:
Route → /dynamics → GravityPage
```

### Formal Gravity Consumer 层

```text
Service Exists:
YES

Production Runtime Consumer:
NO
```

### Phase 3 Target Authority

```text
NOT FROZEN
```

需要 Product Control Tower 决定：

1. 当前 `/dynamics` 是否升级为正式 Phase 3 Authority；
2. `RealityProductionGravityConsumer` 是否只保留为协议资产；
3. 是否需要 Adapter 把 V2 Pressure Session 映射给正式 Gravity Consumer；
4. 是否需要迁移当前 Selected Pressure Seed Context；
5. 是否必须替换现有 `/dynamics` consumer；
6. 如何避免出现两条 Gravity Runtime。

因此：

```text
Pressure Presentation Gate:
STALE

Broader Gravity Consumer Authority:
UNRESOLVED

Phase 3:
LOCKED
```

---

## 13. 消费者地图

| 生产者 | 输出 | 当前直接消费者 | Runtime 状态 | Phase 3 目标状态 |
|---|---|---|---|---|
| Reality Pressure Candidate Source | Candidate Bundle | V2 Pressure Host | ACTIVE | 保持 |
| V2 Pressure Host | Recognized Pressure Seed | Life Weather / Inner View | ACTIVE | 保持 |
| Pressure Presentation | Typed Pressure Surface Outcome | Reality Admission Host | ACTIVE | 保持 |
| Inner View Body Approach | Gravity continuation intent | Reality Route | ACTIVE | 待审查 |
| Reality Route | Selected Pressure Seed Handoff | `/dynamics` | ACTIVE | 待审查 |
| GravityPage | Dynamics / Gravity experience | Existing Growth chain | ACTIVE | 目标权威未冻结 |
| RealityProductionGravityConsumer | Gravity Session | 无生产 caller | DORMANT SERVICE | 保留、适配或退出待审查 |
| RealityGravityPresentation | Gravity Session | Prototype Harness | PROTOTYPE ONLY | 待审查 |
| RealityProductionChoiceConsumer | Gravity Session | 无当前 V2 Host caller | DORMANT SERVICE | Phase 4 继续锁定 |

禁止：

```text
V2 Pressure Host
+
RealityProductionGravityConsumer
+
GravityPage

三者长期并行成为生产真源
```

---

## 14. 验证结果

执行：

```text
npm run build
```

结果：

```text
TypeScript:
PASS

Production Build:
PASS
```

仅保留既存大分包提示。

当前权威链相关门禁：

```text
check-reality-pressure-v2-atomic-host-cutover:
PASS

check-reality-production-pressure-consumer:
PASS

check-pressure-recognition-ui-runtime:
PASS

check-reality-production-route-entry:
PASS
```

XINMAI 全量：

```text
check-xinmai-*:
36 / 36 PASS
```

本 MAP 复现的既存失败：

```text
check-reality-pressure-seed-presentation-contract:
FAIL — stale exact-copy / effect prohibition

check-reality-production-gravity-host:
FAIL — superseded V1 Host integration expectation

check-reality-production-gravity-consumer:
FAIL — service unit passes, obsolete Host consumer expectation fails

check:gravity-change-experience-routing:
FAIL — current Dynamics exact source-marker drift
```

这些失败：

- 在本刀开始前已经存在；
- 本刀未修改相关 Runtime 或 Gate；
- 是本 MAP 的审计对象与 Phase 3 输入；
- 不以文档提交伪装为已修复。

新增失败：

```text
0
```

---

## 15. MAP 最终结论

```text
Pressure Presentation / Gravity Stage Semantic Gate MAP:
CLOSED / ACCEPTED
```

正式裁决：

```text
“Gravity 尚未启动”：
STALE EXACT-COPY GATE

Pressure Presentation 是否提前执行 Gravity：
NO

Typed Surface useEffect 是否合法：
YES

当前 Gravity handoff 是否真实存在：
YES

当前 handoff 目标：
/dynamics

Formal RealityProductionGravityConsumer 是否是当前 Runtime 权威：
NO

是否存在运行中的第二条 Gravity 链：
NO EVIDENCE

是否存在待裁决消费者权威：
YES

Phase 3：
LOCKED
```

---

## 16. 交通灯扫描

### GREEN

后续可以独立校准：

```text
check-reality-pressure-seed-presentation-contract
```

校准范围只允许：

- 移除旧精确文案断言；
- 允许 Typed Surface Outcome 专用 `useEffect`；
- 增加 `noGravityExecution` 结构断言；
- 增加 user body approach 与 direct action withheld 断言。

不得在该小刀中改变 Runtime。

### YELLOW

```text
Phase 3 Gravity Consumer Authority:
MAP REQUIRED
```

必须决定：

- `/dynamics`；
- `GravityPage`；
- `RealityProductionGravityConsumer`；
- `RealityGravityPresentation`；
- Selected Pressure Seed Context；
- V2 Pressure Session；

之间的正式权威与迁移边界。

另有：

```text
check:gravity-change-experience-routing
```

精确源码门禁漂移，必须作为 Phase 3 Authority Review 的消费者证据，不在本刀修复。

### RED

当前没有执行 Runtime 迁移。

若后续决定：

```text
/dynamics
↓
替换为 RealityProductionGravityConsumer
```

或迁移：

```text
Selected Pressure Seed Context Authority
```

则必须升级为：

```text
Migration Audit
↓
Atomic Migration
```

不得作为普通 Major 或门禁修正。

---

## 17. 下一刀建议

名称：

```text
XINMAI-PHASE-3-REALITY-TO-GRAVITY-ENTRY-AUTHORITY-REVIEW-P0
```

刀型：

```text
MAP / Phase 3 Entry Authority Review
```

主 Layer：

```text
Layer 4 | Growth
```

保护 Layer：

```text
Layer 3 | Relationship
```

决策：

```text
NOW — MAP ONLY
```

唯一目标：

> 决定 `/dynamics` 既存链与 `RealityProductionGravityConsumer` 中谁有资格成为 Phase 3 Gravity Runtime 权威，并冻结输入、消费者、失败语义、迁移与回滚边界。

必须回答：

1. 当前 `/dynamics` 是目标权威还是兼容路径；
2. Formal Gravity Consumer 是待接入资产还是已废弃集成方案；
3. V2 Pressure Session 如何进入 Gravity；
4. Selected Pressure Seed Context 是否继续是正式 handoff；
5. Gravity Page 是否继续消费既存 Runtime Engine；
6. 是否需要 Route、Host 或持久化责任迁移；
7. 如何保证单一 Gravity Runtime；
8. Phase 3 是否具备进入 Product Control Tower 解锁审查的条件。

该刀不得：

- 修改 Runtime；
- 修改门禁；
- 修改文案；
- 自动解锁 Phase 3；
- 提前实施 Gravity、Choice 或 Crystal；
- 顺带修复 Mother Context 门禁漂移。

---

# 附录 A：当前远程 HEAD 独立复验

复验基线：

```text
7573165ca0e0d1dc38b99845a61ee3ca5653b776
```

复验性质：

```text
MAP REVALIDATION ONLY
```

本附录不替换前述审计，不修改 Runtime，也不校准任何门禁。它只回答：

> 在 RealityEncounterIntent 已完成统一入口交付后，原有 Pressure Presentation / Gravity Stage 裁决是否仍然成立。

## A.1 目标门禁复现

执行当前基线中的：

```text
node scripts/check-reality-pressure-seed-presentation-contract.mjs
```

结果：

```text
FAIL
missing=Gravity 尚未启动
```

其余既有断言在到达该精确文案断言前均已通过。

因此当前失败已经收敛为：

```text
STALE EXACT-COPY ASSERTION
```

不再是旧审计时期包含 `useEffect` 在内的复合失败。

## A.2 当前 Presentation 语义事实

`RealityPressureSeedPresentation` 当前只在以下条件成立时展示内观引导：

```text
interactionEnabled
&&
session.gravityReadiness === "READY"
```

页面同时保留：

```text
data-inner-view-guidance="APPROACH_LIFE_BODY"
data-direct-gravity-action="WITHHELD"
data-reality-analysis-stage="NOT_STARTED"
```

组件边界继续冻结：

```text
noGravityExecution: true
```

并且没有：

- Gravity 导航；
- Gravity 服务调用；
- Pressure Seed 之外的成长执行；
- 存储写入；
- Gravity Active 提交。

当前文案：

```text
身体里有一处回应正在成形。轻触生命本身，靠近它。
```

表达的是 Reality 中的身体靠近邀请，不是 Gravity 已经启动。

## A.3 READY 不等于 ACTIVE

当前 Host 仍明确呈现：

```text
data-gravity-stage="NOT_STARTED"
```

`gravityReadiness === "READY"` 只表示：

> 当前 Reality 已具备由用户主动靠近生命身体、申请进入下一阶段的资格。

它不表示：

- Gravity 已初始化；
- Gravity 已承接；
- Gravity 已呈现；
- 用户已进入 `/dynamics`；
- Gravity Runtime 已经 Active。

真实转移还必须继续满足：

```text
innerViewApproachState === "AWAITING_BODY_APPROACH"
+
gravityReadiness === "READY"
+
selected context 与 provenance 成立
+
Reality interaction ACTIVE
+
当前 Intent / cycle / revision / identity 一致
+
userExplicitRequest === true
+
bodyApproachConfirmed === true
+
CURRENT_LIFE_WEATHER_BODY_APPROACHED
```

随后由 typed cutover transaction 建立 Gravity admission；Gravity 只有在真实 Life Surface 与 Observation Surface Outcome 成立后，才由 Gravity Controller 提交 Active。

因此：

```text
Presentation READY:
TRANSFER ELIGIBILITY

Gravity ACTIVE:
SEPARATE TYPED RUNTIME FACT
```

两者没有混同。

## A.4 历史证据

原始 Pressure Presentation Contract 在提交：

```text
e7cb6012979e1e50929fd7a8bea9ac014e4e1e24
feat: add pressure seed presentation contract
```

同时引入：

```text
Reality Pressure Seed 已完成认领。Gravity 尚未启动。
```

以及对：

```text
Gravity 尚未启动
```

的精确源码断言。

后续提交：

```text
bba8b5f757b57cbc302fafd8498afdea7cd4aa1c
feat: refine reality pressure disturbance
```

有意将用户文案升级为：

```text
你已经看见这股力量，先停在这里。
```

但没有同步校准该精确源码断言。

这证明当前失败来源是：

```text
COPY EVOLUTION
↓
CHECK NOT CALIBRATED
```

而不是：

```text
GRAVITY AUTHORITY LEAK
```

## A.5 邻接门禁证据

当前基线：

```text
check-reality-production-pressure-seed-consumer:
PASS

check-xinmai-reality-to-gravity-atomic-cutover:
PASS
```

说明：

- Pressure Seed Presentation 仍由既有 Reality 消费链承接；
- Reality → Gravity 仍通过原子切换链完成；
- 本精确文案缺失不影响 Runtime 因果真实性。

另有：

```text
check-reality-pressure-v2-atomic-host-cutover:
FAIL
missing=explicitGravityContinuationCallbackOnly: true
```

该失败属于独立的 Host Cutover 门禁漂移：

- 不由目标精确文案断言产生；
- 不改变本 MAP 裁决；
- 不在本刀修复；
- 按施工纪律进入独立黄灯分流。

## A.6 复验裁决

```text
Pressure Presentation / Gravity Stage Semantic Gate:
CLOSED / REVALIDATED

“Gravity 尚未启动”：
STALE EXACT-COPY ASSERTION

Runtime Defect：
NO

Gravity Authority Conflict：
NO

Pressure Presentation 提前执行 Gravity：
NO

Gravity Readiness 与 Gravity Active 混同：
NO

Runtime 修改：
0

Gate 修改：
0

Phase 3：
LOCKED
```

## A.7 刀后交通灯

### GREEN｜下一张快速小刀

```text
XINMAI-PRESSURE-PRESENTATION-GRAVITY-STAGE-SEMANTIC-GATE-CORRECTION-P0
```

刀型：

```text
Refinement / Gate Correction
```

决策：

```text
NOW — STRICT GREEN SCOPE
```

唯一目标：

> 移除已经失真的精确用户文案断言，改为验证 Pressure Presentation 未执行 Gravity、用户身体靠近仍是显式动作、Gravity Stage 仍未启动的结构事实。

只允许修改：

```text
scripts/check-reality-pressure-seed-presentation-contract.mjs
```

建议断言：

- `interactionEnabled && session.gravityReadiness === "READY"`；
- `data-inner-view-guidance="APPROACH_LIFE_BODY"`；
- `data-direct-gravity-action="WITHHELD"`；
- `data-reality-analysis-stage="NOT_STARTED"`；
- Host 的 `data-gravity-stage="NOT_STARTED"`；
- handoff 的 `userExplicitRequest: true`；
- handoff 的 `bodyApproachConfirmed: true`；
- 继续保留禁止 Gravity 服务、导航和存储消费的负向断言。

禁止：

- 冻结新的用户文案；
- 修改 Runtime；
- 修改 Pressure Seed、Gravity 或 Intent；
- 顺带修复其他门禁；
- 解锁 Phase 3。

### YELLOW｜独立记录，不阻断本刀

```text
XINMAI-REALITY-PRESSURE-V2-ATOMIC-HOST-CUTOVER-GATE-MAP-P0
```

用于独立裁决：

```text
explicitGravityContinuationCallbackOnly: true
```

缺失究竟是陈旧源码门禁，还是 Host 继续动作契约发生了结构漂移。

不得并入上述绿色修正刀。
