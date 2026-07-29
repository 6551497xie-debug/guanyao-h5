# XINMAI Gravity Entry Production Browser Acceptance Harness Major Blade Prep P0

## 0. PREP 裁决

任务：

```text
XINMAI-GRAVITY-ENTRY-PRODUCTION-BROWSER-ACCEPTANCE-HARNESS-MAJOR-BLADE-PREP-P0
```

刀型：

```text
Major Blade Prep / MAP
```

决策：

```text
NOW — PREP ONLY
```

Runtime 修改：

```text
0
```

当前状态：

```text
Phase 2：
CLOSED

Phase 3：
LOCKED

Gravity Entry Product Authority：
ACCEPTED

Gravity Entry Runtime Authority：
ESTABLISHED

Gravity Entry Admission Delivery：
OPEN
```

上游关闭审计：

```text
XINMAI-PHASE-3-GRAVITY-ENTRY-ADMISSION-RUNTIME-CAUSAL-CLOSURE-AUDIT-P0
```

本 PREP 唯一目标：

> 冻结一条只服务验收、不能成为生产真源的真实浏览器 Harness，使合法生产身份、Reality Intent、当前 Pressure Seed Recognition、Body Approach、Atomic Cutover、Motion / Reduced Motion、失败、重试、刷新、TTL 与 `ACTIVE_IN_GRAVITY` 可以在干净远程快照中重复验证。

本刀不实施 Harness，不修改：

- App Runtime；
- Route；
- Page；
- Host；
- Renderer；
- Controller；
- Recovery；
- Pressure Seed；
- Six Dimension；
- Gravity；
- Choice；
- Crystal；
- 既存验收基础设施。

---

## 1. Construction State Card

```text
当前 Phase：
Phase 2 CLOSED
Phase 3 LOCKED

当前主线：
Gravity Entry Admission Delivery Closure

本刀类型：
Major Blade Prep / MAP

主 Layer：
Layer 4 — Growth Delivery Evidence

保护 Layer：
Layer 1 — World
Layer 2 — Identity
Layer 3 — Relationship

已有完成资产：
xinmai-acceptance isolated build
Acceptance Entry
Typed Fault Port precedent
Acceptance Evidence Panel
RealityEncounterIntent
Reality Pressure Seed Session V2
Reality Inner View Approach
Reality → Gravity Atomic Cutover
Gravity Entry Admission Controller
Gravity Recovery Adapter
Gravity Typed Surface Outcomes
Gravity Production Route

当前缺口：
合法生产权威下的完整浏览器证据

是否需要新生产页面：
NO

是否需要新生产 Route：
NO

是否需要新 Controller：
NO

是否需要新 Recovery：
NO

是否需要新产品 Runtime：
NO

是否需要测试基础设施 Major Blade：
YES

决策：
NOW — PREP ONLY
```

---

## 2. 上游关闭缺口

当前已经通过：

```text
Single Gravity Controller：
PASS

Atomic Cutover：
PASS

2h Recovery TTL：
PASS

Typed Life Surface：
PASS

Typed Observation Surface：
PASS

Watchdog Failure-only：
PASS

Direct URL Isolation：
PASS

Legacy Route Isolation：
PASS

TypeScript：
PASS

Production Build：
PASS

XINMAI Checks：
45 / 45 PASS
```

当前未形成真实生产浏览器证据：

- 合法生产 Motion → `ACTIVE_IN_GRAVITY`；
- 合法生产 Reduced Motion → `ACTIVE_IN_GRAVITY`；
- Life Surface Failure；
- Observation Surface Failure；
- Watchdog；
- stale cycle / revision outcome；
- identity mismatch；
- Recovery write unavailable；
- refresh recovery；
- same-cycle retry；
- TTL boundary；
- Choice Continuation。

当前 `/dynamics-dev` 可以证明视觉表面存在，但它明确：

```text
noProductionRecoveryRead
noProductionAdmissionWrite
noProductionActiveCommit
```

所以：

```text
DEV Surface Evidence
≠
Production Admission Evidence
```

当前源码检查：

```text
scripts/check-xinmai-gravity-entry-browser-acceptance.mjs
```

只扫描源码标记，不驱动真实浏览器。

所以：

```text
Source Contract PASS
≠
Browser Causal Closure PASS
```

---

## 3. 已有验收资产审查

### 3.1 `xinmai-acceptance` 隔离构建

当前已经存在：

```text
vite --mode xinmai-acceptance
```

它通过 Vite 独立入口与 alias：

- 保留同一 App；
- 保留同一生产 Route；
- 保留同一生产 Controller；
- 只在显式 acceptance mode 替换中性 Runtime Port；
- 在 Acceptance Entry 中挂载证据面板；
- 从普通 Production Build 排除 Scenario Registry 与 Fault Port。

当前门禁已证明：

```text
ordinary entry remains production default
acceptance mode owns alternate entry
production bundle excludes acceptance scenario markers
production App excludes acceptance query consumer
production Runtime Port excludes fault semantics
```

裁决：

```text
Acceptance Build：
REUSE

第二 Acceptance Mode：
REJECT

第二 Acceptance Entry：
REJECT
```

### 3.2 Explicit Leave Harness

当前已实现：

- acceptance-only Scenario Registry；
- acceptance-only Typed Fault Port；
- production neutral Runtime Port；
- acceptance evidence event；
- browser-visible evidence panel；
- explicit runner；
- Production Bundle isolation gate。

这套模式已经证明：

> 测试可以改变某个边界的返回结果，但不能直接写产品状态。

Gravity Harness 应复用这条纪律。

Gravity Harness 不得复用 Explicit Leave 的：

- Delivery Ticket；
- Delivery Attempt；
- Returning Surface Outcome；
- Navigation Failure；
- Relationship state。

裁决：

```text
Architecture Pattern：
REUSE

Scenario Runtime：
SEPARATE ACCEPTANCE MODULE

Product Authority：
UNCHANGED
```

### 3.3 当前 DEV Flags

已有：

```text
__xinmaiReducedMotion
__xinmaiRendererFailure
```

允许继续作为人工 DEV fallback。

禁止把该模式扩张到：

- identity；
- admission；
- gravity cycle；
- revision；
- Recovery；
- Pressure Seed；
- Body Approach；
- Active。

裁决：

```text
Existing Visual Flags：
KEEP

New Product Authority URL Flags：
REJECT
```

---

## 4. 方案比较

### Option A — 使用 `/dynamics-dev`

优点：

- 快速；
- Motion 与 Reduced Motion 可见；
- 已有 Fixture。

问题：

- 不消费 Production Admission；
- 不读取 Production Recovery；
- 不提交 Production Active；
- 不证明 Atomic Cutover；
- 不证明合法 Identity；
- 不证明当前 Pressure Seed；
- 不证明 Body Approach。

裁决：

```text
REJECT
```

### Option B — 直接写 sessionStorage / localStorage

问题：

- Harness 变成身份生产者；
- Harness 变成 Admission 生产者；
- 绕过 Launch / Genesis / Reality；
- Storage Snapshot 可能成为第二真源；
- 无法证明用户因果。

裁决：

```text
REJECT
```

### Option C — 新建 Gravity Acceptance 页面

问题：

- 不是同一 `/dynamics`；
- 不是同一 Route；
- 不是同一 Host；
- 不是同一恢复链；
- 容易形成第二 Gravity Runtime。

裁决：

```text
REJECT
```

### Option D — 真实 UI 全链 + 既有 Acceptance Build

结构：

```text
Fresh Browser Context
↓
真实 Launch 新用户入口
↓
真实 Birth Key / Life Source Session
↓
真实 Genesis Recognition
↓
真实 Life Whisper / Skip
↓
真实 Relationship Continuity
↓
真实 Reality Intent
↓
真实 Pressure Seed Recognition
↓
真实 Body Approach
↓
真实 Atomic Cutover
↓
真实 /dynamics Production Route
↓
真实 Typed Surface Outcomes
↓
真实 Controller Active
```

Acceptance Build 只提供：

- 只读 Scenario；
- 一次性 Typed Fault；
- Typed Evidence；
- 外部浏览器控制入口。

裁决：

```text
ACCEPT
```

---

## 5. 唯一 Harness 架构

冻结：

```text
Existing xinmai-acceptance Build
        ↓
Existing App + Production Routes
        ↓
Real User UI Journey
        ↓
Neutral Gravity Acceptance Runtime Ports
        ↓
Production：
pass-through / no-op

Acceptance：
typed fault + read-only evidence
        ↓
Same Gravity Controller / Recovery / Host
```

Harness 不得：

- 创建身份；
- 创建 `gravityCycleId`；
- 创建 Admission；
- 写 Controller；
- 写 Recovery；
- 直接提交 `ACTIVE_IN_GRAVITY`；
- 直接导航 `/dynamics`；
- 创建 Pressure Seed；
- 伪造 Body Approach；
- 创建 Fixture StarBeast；
- 调用 Choice / Crystal；
- 修改用户原始输入。

---

## 6. 合法生产身份形成

### 6.1 唯一允许路径

每个独立场景默认从新浏览器上下文开始：

```text
Storage：
EMPTY

Memory：
EMPTY

Controller：
EMPTY
```

然后通过真实 UI：

```text
/launch-lab?entryUser=new
↓
用户完成 Birth Key
↓
Launch 运行既有 Life Engine
↓
createLaunchLifeSourceSession
↓
sourceKind = REAL_ENGINE_RESULT
↓
activateRealUserGenesisVisualSourceContext
↓
persistLaunchLifeSourceSession
↓
resolveLaunchGenesisProductionRouteHandoff
↓
/genesis
```

验收 Runner 只能操作用户可操作控件。

禁止：

- `returnState` 预览；
- Fixture Source；
- Prototype Source；
- Default Source；
- 直接调用 `createLaunchLifeSourceSession`；
- 直接调用 `activateRealUserGenesisVisualSourceContext`；
- 直接写 persisted identity；
- 复制上一场景的 Storage Snapshot。

### 6.2 为什么不复用预制身份

即使预制 Snapshot 最初来自真实用户流程，它在新的场景中仍会变成：

```text
Harness 提供身份
```

这无法证明：

```text
用户进入
↓
同一身份形成
↓
同一身份进入 Reality
```

因此关闭场景必须默认重跑真实身份形成。

如未来为了测试时长引入已签名身份 Snapshot：

```text
YELLOW
↓
Identity Acceptance Asset MAP
```

当前不授权。

---

## 7. 真实用户路径

### 7.1 Launch

Runner 必须：

- 使用真实新用户入口；
- 通过真实 Birth Key 控件；
- 等待 Life Source Session 成立；
- 不读取或写入 Identity Storage；
- 观察生产 Handoff 是否进入 `/genesis`。

### 7.2 Genesis / First Encounter

Runner 必须通过真实交互：

```text
RECOGNITION_CONFIRM
↓
同体回应稳定
↓
WHISPER_SUBMITTED
或
WHISPER_SKIPPED
↓
可选命名或暂不命名
↓
ENTER_REALITY
```

Harness 不读取 Life Whisper 原文。

Evidence 只允许记录：

- submitted / skipped；
- response settled / unavailable；
- naming created / skipped；
- Reality Intent requested。

### 7.3 Reality

Runner 必须等待：

```text
ACTIVE_IN_REALITY
```

然后：

```text
Pressure Candidate Surface
↓
用户点击 PRESSURE_SEED_RECOGNIZE
↓
SEED_RECOGNIZED
↓
用户点击“靠近生命正在变化的位置”
↓
CURRENT_LIFE_WEATHER_BODY_APPROACHED
↓
Typed Gravity Transfer Request
```

禁止：

- 自动选择 Candidate；
- Runner 直接调用 recognize command；
- Runner 直接构造 Pressure Seed；
- Runner 直接调用 Gravity Transfer；
- 用 DOM data 属性写入状态。

### 7.4 Gravity

必须进入：

```text
/dynamics
↓
GravityProductionRouteEntry
↓
GravityProductionSurfaceHost
```

不得进入：

```text
/dynamics-dev
```

最终必须由：

```text
GravityProductionSurfaceHost
↓
GRAVITY_MINIMUM_PRESENTED
↓
RealityToGravityEntryAdmissionController
↓
ACTIVE_IN_GRAVITY
```

提交成功。

---

## 8. Acceptance Scenario Registry

唯一查询参数建议：

```text
__xinmaiGravityEntryAcceptance
```

该字符串只能存在于：

- `src/acceptance/`；
- acceptance runner；
- acceptance checks。

禁止存在于：

- App；
- Production Route；
- Production Host；
- Controller；
- Recovery Adapter；
- Renderer；
- Pressure Seed Consumer；
- GravityPage。

冻结 Scenario：

```text
POSITIVE_MOTION
POSITIVE_REDUCED_MOTION
LIFE_SURFACE_UNAVAILABLE
OBSERVATION_SURFACE_UNAVAILABLE
WATCHDOG_SUPPRESSES_SURFACES
STALE_ATTEMPT_PRECEDES_CURRENT
IDENTITY_MISMATCH_OUTCOME
RECOVERY_WRITE_UNAVAILABLE
REFRESH_RECOVERY
TTL_BEFORE_BOUNDARY
TTL_AT_BOUNDARY
TTL_AFTER_BOUNDARY
DIRECT_URL_WITHOUT_ADMISSION
CHOICE_CONTINUATION
```

禁止：

- 任意 JSON Scenario；
- 任意 identity 输入；
- 任意 cycle / revision 输入；
- 任意 Pressure Seed 文本；
- 任意用户原文；
- 任意 Runtime Command；
- 任意 Storage Snapshot。

Scenario 必须：

```text
编译期枚举
+
当前 acceptance 页面周期局部
+
一次性 Fault
```

---

## 9. Typed Port 设计

### 9.1 Production Neutral Port

建议新增：

```text
gravityEntryAcceptanceRuntimePort
```

Production 默认实现只能：

```text
projectLifeSurfaceOutcomes(outcome)
→ [outcome]

projectObservationSurfaceOutcomes(outcome)
→ [outcome]

observeCutover(result)
→ no-op

observeRouteAdmission(result)
→ no-op

observeActiveCommit(result)
→ no-op
```

Production Port 禁止：

- 读取 URL；
- 读取 Storage；
- 读取 Controller；
- 生成 Outcome；
- 改写 Outcome；
- 延迟 Outcome；
- 抑制 Outcome；
- 产生副作用；
- 记录用户原文。

### 9.2 Acceptance Fault / Observer Port

Acceptance Mode 通过 Vite alias 替换 Neutral Port。

它可以：

- 返回一次性的 unavailable Outcome；
- 抑制本轮 Outcome 以等待真实 Watchdog；
- 在真实 Outcome 前投递一个 stale Typed Copy；
- 在真实 Outcome 前投递一个 identity-mismatch Typed Copy；
- 记录 Cutover、Admission、Surface Transaction 与 Active 结果；
- 记录 ID、revision、状态与失败 reason。

它不能：

- 修改真实 identity；
- 修改真实 Admission；
- 写 Controller；
- 写 Recovery；
- 写 Route State；
- 写 Pressure Seed Session；
- 直接提交 Active。

错误 Outcome 必须只是：

```text
Typed Copy
```

并由现有 Host / Controller 拒绝。

### 9.3 外部平台故障

以下不进入 Typed Fault Port：

#### Reduced Motion

使用浏览器原生：

```text
prefers-reduced-motion: reduce
```

既存 query override 只能作为人工 fallback，不能成为关闭的唯一证据。

#### Recovery Storage Failure

由外部浏览器控制在应用启动前，对唯一 Gravity Recovery Key 的平台写入制造真实失败。

要求：

- Recovery Adapter 仍是唯一 Writer；
- Harness 不读取 Recovery 内容；
- Harness 不写伪造 Snapshot；
- 平台恢复后允许同周期 Retry。

#### TTL

由外部浏览器控制平台时间。

Controller 与 Recovery 不读取 Harness Query，不新增 Test Clock 参数。

---

## 10. Scenario 查询参数生命周期

### SPA 内导航

Acceptance Entry 首次解析 Scenario，并保存在 acceptance-only module memory。

App 内：

```text
Launch
↓
Genesis
↓
Reality
↓
Gravity
```

不要求 Production navigation 保留 query。

### 硬刷新

对于 Refresh / TTL 场景：

- Runner 在刷新前将同一 acceptance query 保留在当前 URL；
- Acceptance Entry 重新读取 Scenario；
- Product Route 不读取 query；
- Product Recovery 只读取自己的 Recovery Candidate；
- Scenario 不写 sessionStorage。

### 页面关闭

页面关闭后：

```text
Scenario：
DESTROYED

Fault Consumption：
DESTROYED

Evidence：
DESTROYED
```

普通 Production 打开同一 URL：

```text
Scenario Consumer：
0
```

---

## 11. Evidence 设计

### 11.1 Evidence Hub

复用：

```text
src/acceptance/main.tsx
```

不新增第二 Entry。

建议把当前单一面板扩展为：

```text
XinmaiAcceptanceEvidenceHub
├── Explicit Leave Evidence
└── Gravity Entry Evidence
```

Gravity Evidence 只显示：

- Scenario；
- sequence；
- current route；
- `sourceReferenceId` 的不透明值；
- `intentReferenceId`；
- `encounterCycleId`；
- `admissionReferenceId`；
- `gravityCycleId`；
- revision；
- Cutover status；
- Route Admission status；
- Life Surface status；
- Observation Surface status；
- Active status；
- failure reason。

禁止显示：

- Birth Key 原始输入；
- Life Whisper 原文；
- Pressure 文案；
- Relationship Name；
- 用户可识别数据。

### 11.2 Evidence 不是权威

Evidence Panel：

```text
pointerEvents：
none

Runtime Command：
0

Storage Write：
0

Controller Write：
0
```

`data-*` 仅用于：

- 浏览器定位；
- 观测；
- 截图；
- 验收断言。

不得作为 Route / Host / Renderer 运行输入。

### 11.3 最小事件序列

成功场景至少记录：

```text
REAL_IDENTITY_RECOVERED
REALITY_INTENT_ACTIVE
PRESSURE_SEED_RECOGNIZED
BODY_APPROACH_CONFIRMED
GRAVITY_TRANSFER_PREPARED
CUTOVER_COMMITTED
GRAVITY_ROUTE_ADMITTED
LIFE_SURFACE_PRESENTED
OBSERVATION_SURFACE_PRESENTED
GRAVITY_ACTIVE_COMMITTED
```

这些 Event 只能在对应 Typed Result 已经由生产权威返回后记录。

---

## 12. 浏览器验收矩阵

### 12.1 Positive Motion

```text
Fresh Context
↓
Real Identity
↓
Real Reality
↓
Seed Recognition
↓
Body Approach
↓
Cutover COMMITTED
↓
Motion Life Surface
+
Motion Observation Surface
↓
ACTIVE_IN_GRAVITY
```

必须证明：

- 同一三项身份引用；
- 同一 `sourceReferenceId`；
- 唯一 `gravityCycleId`；
- Renderer 真实 frame；
- `/dynamics-dev` 未使用。

### 12.2 Positive Reduced Motion

```text
Browser media：
reduce
↓
真实全链
↓
Static Same-life Surface
+
Static First Observation
↓
ACTIVE_IN_GRAVITY
```

必须证明：

- Static Surface 已真实挂载；
- 不使用固定 timer 提交成功；
- 不要求 WebGL frame；
- 身份、压力和 Admission 不变。

### 12.3 Life Surface unavailable

```text
真实 Admission
↓
Life Surface unavailable Typed Outcome
↓
Host unavailable
↓
Controller FAILED_RETRYABLE
↓
ACTIVE：
0
```

### 12.4 Observation Surface unavailable

```text
真实 Admission
↓
Life Surface presented
↓
Observation Surface unavailable
↓
Host unavailable
↓
Controller FAILED_RETRYABLE
↓
ACTIVE：
0
```

### 12.5 Watchdog

```text
真实 Admission
↓
两项 Outcome 被 acceptance port 一次性抑制
↓
真实 8 秒 Watchdog
↓
GRAVITY_HOST_UNAVAILABLE
↓
ACTIVE：
0
```

Harness 不生成 Timeout Outcome。

### 12.6 Stale Attempt

```text
Attempt N 失败
↓
同周期 Retry
↓
Attempt N+1
↓
旧 Outcome N 晚到
↓
被拒绝
↓
当前 Outcome N+1 成功
```

必须证明：

- `gravityCycleId` 不变；
- revision 增加；
- 旧 Outcome 不改变当前状态；
- 新 Outcome 可以 Active。

### 12.7 Identity mismatch

错误 Typed Copy 必须只修改一项身份引用。

结果：

```text
错误 Outcome：
REJECTED

真实 Identity：
UNCHANGED

Active：
0，直到真实 Outcome 到达
```

### 12.8 Recovery unavailable

```text
Cutover / Admission Recovery write fails
↓
COMMITTED：
0

Navigation：
0

ACTIVE：
0

same-cycle Retry：
AVAILABLE
```

平台恢复后：

```text
同一 source Reality
↓
同一 Gravity Admission identity
↓
重新完成 Cutover
↓
ACTIVE
```

### 12.9 Refresh Recovery

分别覆盖：

```text
READY 后刷新
ACCEPTING 后刷新
ACTIVE 后刷新
```

必须证明：

- 不生成新 `gravityCycleId`；
- Snapshot 只是 Recovery Candidate；
- Controller 重新校验；
- Active 后刷新重新进入 `ACCEPTING_GRAVITY`；
- Typed Surface 重新呈现后才恢复 Active。

### 12.10 TTL

覆盖：

```text
2h - 1ms
2h
2h + 1ms
```

必须证明：

- 刷新不延长 TTL；
- Retry 不延长 TTL；
- 过期不生成新周期；
- 过期不清除身份；
- 过期不清除 Relationship Name；
- 过期不恢复历史 Pressure；
- 过期不等于明确离开。

### 12.11 Direct URL

Fresh Context 直接打开：

```text
/dynamics
```

预期：

```text
BLOCKED
ACTIVE：
0
```

### 12.12 Choice Continuation

必须使用真实产品链：

```text
当前 Reality / Gravity 正式结束
↓
用户在 Choice 明确希望继续
↓
新的 Reality encounter
↓
新的 Reality → Gravity transfer
```

Harness 只观察：

- 新 Reality `encounterCycleId`；
- 新 Gravity `gravityCycleId`；
- 身份引用保持；
- Choice 不直接写 Gravity Active。

若当前产品 UI 无法真实到达：

```text
PRODUCT CONSUMER GAP
```

不得由 Harness 直调 Controller 补齐。

---

## 13. Browser Runner

### 13.1 当前依赖边界

仓库当前没有 Playwright / Cypress。

本次建议：

```text
Repository Runner：
负责启动 acceptance build
负责输出 deterministic scenario URL
负责输出人工/外部驱动步骤

Browser Driver：
Codex in-app browser
或
外部已授权浏览器驱动
```

本次 Harness 实施不默认新增浏览器依赖。

如未来需要 CI 自动化：

```text
YELLOW
↓
Test-only Browser Dependency Review
```

禁止把浏览器驱动加入 production dependencies。

### 13.2 Runner 责任

Runner 可以：

- 校验 Scenario 枚举；
- 启动 `xinmai-acceptance`；
- 使用严格端口；
- 输出入口 URL；
- 输出预期事件序列；
- 在进程结束时关闭 Vite。

Runner 不可以：

- 写 Storage；
- 生成 Identity；
- 调用 Controller；
- 生成 Pressure Seed；
- 生成 Admission；
- 直接导航 `/dynamics`。

---

## 14. Production Isolation

未来实施必须增加门禁：

```text
Production Bundle Gravity Scenario Registry：
0

Production Bundle Gravity Fault Port：
0

Production App Gravity Acceptance Query：
0

Production Route Scenario Read：
0

Production Host Scenario Read：
0

Production Controller Scenario Read：
0

Production Recovery Scenario Read：
0

Production Renderer Scenario Read：
0

Fixture Identity：
0

Second Gravity Route：
0

Second Gravity Controller：
0

Second Gravity Recovery Writer：
0

Second ACTIVE_IN_GRAVITY Authority：
0

DOM Runtime Input：
0
```

还必须证明：

- 普通 `npm run dev` 不开启 Gravity Harness；
- 普通 `npm run build` 排除 Gravity acceptance modules；
- 只有 `xinmai-acceptance` 可启用；
- 删除 Gravity Harness 后 Production Runtime 行为不变；
- Existing Explicit Leave Harness 继续通过；
- 两套 acceptance scenario 不互相消费；
- ordinary query 参数不能激活测试行为。

---

## 15. 建议实施文件边界

### 15.1 Acceptance-only

允许：

```text
src/acceptance/
  xinmaiGravityEntryAcceptanceScenario.ts
  xinmaiGravityEntryAcceptanceFaultPort.ts
  XinmaiGravityEntryAcceptanceEvidencePanel.tsx

scripts/
  check-xinmai-gravity-entry-production-browser-acceptance-harness.mjs
  run-xinmai-gravity-entry-production-browser-acceptance.mjs
```

### 15.2 Production-neutral

允许评估：

```text
src/services/gravityEntryAcceptanceRuntimePort.ts
```

可能需要的最小接缝：

- `RealityProductionRouteEntry`：只观察 Cutover typed result；
- `GravityProductionRouteEntry`：只观察 Route Admission 与 Active typed result；
- `RealityLifeUniverseCanvas`：只投递 project 后的 Typed Life Outcomes；
- `RealityGravityInertiaField`：只投递 project 后的 Typed Observation Outcomes。

禁止修改：

- `xinmaiGravityEntryAdmissionController` 状态机；
- `xinmaiGravityEntryRecoveryAdapter` schema；
- `realityToGravityCutoverTransaction` 原子顺序；
- Gravity Route Target；
- GravityPage 产品语义；
- Life Engine；
- Identity；
- Relationship；
- Pressure Seed Catalog；
- Six Dimension；
- Choice；
- Crystal。

### 15.3 Existing Acceptance Shell

允许最小调整：

- `vite.config.ts` 增加 Gravity Neutral Port alias；
- `src/acceptance/main.tsx` 挂载 Evidence Hub；
- `package.json` 增加 Gravity acceptance 命令；
- 保留现有 Explicit Leave 命令兼容。

禁止创建：

- 第二 Vite mode；
- 第二 acceptance entry；
- 第二 App；
- 第二 Router。

---

## 16. 原子实施与回滚

### 16.1 实施提交

未来 Major Blade 必须在单提交中包含：

```text
Gravity Scenario Registry
+
Production Neutral Port
+
Acceptance Fault / Observer Port
+
Existing Acceptance Build Alias
+
Evidence Panel
+
Runner
+
Production Isolation Gate
+
至少 Positive Motion 与 Reduced Motion 两条真实浏览器路径
```

禁止：

- 先接 Fault Port，后补隔离；
- 先暴露 query，后补 Production Bundle Gate；
- 先创建测试身份，后改为真实身份；
- 在多个提交间长期保留双 Port。

### 16.2 回滚单位

单提交完整回滚必须：

- 删除 Gravity Scenario Registry；
- 删除 Gravity Fault / Observer Port；
- 删除 Gravity Evidence Panel；
- 删除 Gravity Runner；
- 移除 Gravity Neutral Port 接缝；
- 恢复 Vite alias；
- 保留 Existing Explicit Leave Harness；
- 保留 Gravity Runtime Authority；
- 保留 Atomic Cutover；
- 保留 Typed Surface Outcomes；
- 保留用户身份、关系与历史资产。

回滚后：

```text
Production Runtime Behavior：
UNCHANGED

Gravity Entry Delivery：
仍为 OPEN
```

---

## 17. 实施分段

Harness 基础设施本身是 Major Blade。

建议：

### Major Base

包含：

- Acceptance Scenario / Port / Panel / Runner；
- Production isolation；
- Positive Motion；
- Positive Reduced Motion；
- Direct URL。

### Green Follow-ups

在 Port 契约不变时，每个场景可作为绿色小刀：

- Life Surface unavailable；
- Observation Surface unavailable；
- Watchdog；
- stale attempt；
- identity mismatch；
- refresh recovery；
- TTL；
- Recovery unavailable。

如果某个场景要求：

- 新 Port；
- 修改 Controller；
- 修改 Recovery Schema；
- 修改产品消费者；
- 新 Route；
- 新 Storage；

则：

```text
YELLOW / RED
↓
重新审查
```

---

## 18. 黄灯处理记录

用户已要求后期处理黄灯。

当前既存黄灯：

```text
XINMAI-GRAVITY-FIRST-RESPONSE-LABEL-BASELINE-GATE-DRIFT
```

本 PREP 裁决：

```text
当前文档刀内修改：
NO

Harness 基础设施内顺带修改：
NO

后期治理：
YES
```

原因：

- Harness 解决浏览器证据；
- First Response Label 解决产品消费者与历史门禁是否一致；
- 两者输入、输出与停止条件不同；
- 把文案消费者校准吞入 Harness 会破坏回滚单位。

执行节奏允许：

```text
Harness Major Base
↓
Gravity Entry Browser Evidence
↓
First Response Label 黄灯窄修正
↓
Closure Revalidation
```

若后续检查确认 First Response Label 只是既有消费者缺失、且不改变产品语义：

```text
GREEN / Narrow Correction
```

若涉及文案语义、Gravity 阶段定位或消费者权威变化：

```text
YELLOW / MAP
```

这满足“后期处理”，但不在当前 PREP 中顺带修改。

---

## 19. 停止条件

未来 Harness 实施出现任一情况必须停止：

- 必须新增生产页面；
- 必须新增生产 Route；
- 必须生成 Fixture Identity；
- 必须写 Identity Storage；
- 必须直接调用 Controller；
- 必须直接生成 Pressure Seed；
- 必须直接生成 Body Approach；
- 必须直接生成 Admission；
- 必须写 Recovery Snapshot；
- 必须直接提交 Active；
- Scenario 可以在 Production Build 激活；
- Product Route / Host / Controller 读取 acceptance query；
- Harness 改变 Gravity 产品语义；
- Harness 接入 Six Dimension / Choice / Crystal；
- Existing Explicit Leave Harness 被破坏；
- 回滚必须跨多个提交；
- 需要长期保留两个 Acceptance Build。

---

## 20. PREP 完成回答

### 1. 如何取得合法生产身份？

```text
Fresh Browser Context
↓
真实 Launch 新用户 UI
↓
真实 Birth Key
↓
现有 Life Engine
↓
REAL_ENGINE_RESULT
```

禁止 Preview State、Fixture 或 Storage Seed。

### 2. 如何进入真实 `ACTIVE_IN_REALITY`？

```text
真实 Genesis Recognition
↓
真实 Phase 2 Relation Intent
↓
Reality Route Admission
↓
Typed Reality Surface
↓
Reality Controller Active
```

### 3. 如何认出当前 Seed？

只通过真实：

```text
PRESSURE_SEED_RECOGNIZE
```

### 4. 如何形成 Body Approach？

只通过用户点击：

```text
靠近生命正在变化的位置
```

### 5. 如何观察而不成为权威？

```text
Production typed result
↓
Neutral no-op observer port
↓
Acceptance alias records evidence
```

Evidence 不写产品状态。

### 6. 如何注入失败？

```text
Typed Surface Fault：
Acceptance Fault Port

Storage Failure：
External Browser Platform Control

TTL：
External Browser Clock

Reduced Motion：
Browser Media Emulation
```

### 7. 如何验证 Reduced Motion？

真实静态同体 Life Surface 与静态 Observation Surface 都呈现后，Controller 才可 Active。

### 8. 如何保证只存在于验收模式？

```text
Existing xinmai-acceptance mode
+
Vite alias
+
Production bundle exclusion gate
```

### 9. 如何保持 `/dynamics-dev` 隔离？

Production closure path 只访问 `/dynamics`；Runner 检测并拒绝 `/dynamics-dev`。

### 10. 如何完整回滚？

单提交移除 Gravity acceptance modules、neutral seams、alias、panel 与 runner；保留全部生产 Gravity Runtime。

### 是否形成第二套 Relationship？

```text
NO
```

### 是否形成第二套 Reality？

```text
NO
```

### 是否形成第二套 Gravity？

```text
NO
```

### 是否需要 Runtime Migration？

```text
NO
```

### 实施刀型？

```text
Major / Test Infrastructure
```

### 实施决策？

```text
NOW — STRICT ACCEPTANCE-ONLY SCOPE
```

---

## 21. 实施关闭门禁

未来 Major Blade 必须证明：

```text
Production Identity：
REAL

Fixture Identity：
0

Production Route：
/dynamics only

Motion Active：
PASS

Reduced Motion Active：
PASS

Direct URL Bypass：
0

Production Scenario Query Consumer：
0

Production Fault Logic：
0

Second Controller：
0

Second Recovery Writer：
0

Second Active Authority：
0

DOM Runtime Input：
0

Production Build：
PASS

Acceptance Build：
PASS

Existing Explicit Leave Harness：
PASS

Remote Clean Snapshot：
PASS
```

实施通过后仍然：

```text
Gravity Entry Admission Delivery：
OPEN — PENDING FULL SCENARIO MATRIX

Phase 3：
LOCKED
```

只有完整场景矩阵与独立 Closure Revalidation 通过，才能关闭 Delivery。

---

## 22. 交通灯扫描

### 绿色

- Positive Motion；
- Positive Reduced Motion；
- Direct URL；
- 在既有 Port 契约内增加单一失败场景。

### 黄色

- First Response Label 历史门禁漂移；
- CI 浏览器依赖；
- 预制身份 Snapshot；
- Choice Continuation 产品路径缺口；
- 需要新 Typed Port 的场景。

### 红色

- 新生产 Route；
- 新 Gravity Controller；
- 新 Recovery Writer；
- Harness 生成身份；
- Harness 写 Admission；
- Harness 提交 Active；
- Production 与 Acceptance 双真源。

---

## 23. 下一刀建议

正式下一刀：

```text
XINMAI-GRAVITY-ENTRY-PRODUCTION-BROWSER-ACCEPTANCE-HARNESS-MAJOR-BLADE-P0
```

刀型：

```text
Major / Test Infrastructure
```

决策：

```text
NOW — STRICT ACCEPTANCE-ONLY SCOPE
```

唯一目标：

> 在复用现有 `xinmai-acceptance` 隔离构建的前提下，建立 Gravity Scenario、Neutral Port、Fault / Observer Port、Evidence Panel 与 Runner，并用真实新用户路径完成 Positive Motion、Positive Reduced Motion 与 Direct URL 三条浏览器证据。

不授权：

- 关闭 Delivery；
- 解锁 Phase 3；
- 实施全部失败场景；
- 修改 Gravity 产品语义；
- 修改 First Response Label；
- 新增生产 Runtime。

冻结：

```text
本 PREP：
CLOSED

Harness Architecture：
FROZEN

Harness Runtime：
NOT IMPLEMENTED

下一刀：
NOW

Gravity Entry Admission Delivery：
OPEN

Phase 3：
LOCKED
```
