# XINMAI Reality Encounter Intent Runtime Causal Closure Audit P0

## 0. 独立关闭裁决

任务：

```text
XINMAI-REALITY-ENCOUNTER-INTENT-RUNTIME-CAUSAL-CLOSURE-AUDIT-P0
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

最终裁决：

```text
RealityEncounterIntent Delivery：
OPEN

Phase 2：
CLOSED

Reality 统一入口：
Runtime 已迁移，但交付关闭条件尚未全部满足

Phase 3：
LOCKED
```

`Delivery` 不能关闭的直接原因有两项：

1. `RealityProductionRouteEntry` 仍在 React render / `useMemo` 阶段调用 `establishRealityEncounterAdmission`，该 Command 会推进 Controller revision，并写入 Recovery Candidate；
2. 关闭卡要求的真实浏览器矩阵尚未完整，尤其没有形成 Reduced Motion 静态同体表面的真实浏览器证据。

Typed Surface Outcome 已经解决 DOM 节点存在与固定页面计时器作为成功真源的问题，但它不能覆盖 render-phase mutation，也不能用源码或自动检查替代缺失的真实浏览器证据。

---

## 1. 审计基线与隔离

唯一审计基线：

```text
Branch：
codex/genesis-28-mansion-production-continuity

Remote HEAD：
3728254a6581e783c741d1ad85311670ba396dd5

Commit：
fix(reality): commit active from typed surface outcomes
```

隔离审计工作树：

```text
/private/tmp/xinmai-relationship-naming-map-p0
```

审计开始时：

```text
isolated HEAD == remote HEAD：
YES

isolated worktree：
CLEAN

主工作树既存修改：
PROTECTED / NOT CONSUMED
```

证据等级严格区分：

|证据|本审计用途|不能替代|
|-|-|-|
|产品协议|确认目标语义与关闭条件|Runtime 事实|
|当前远程源码|确认真实生产者、消费者与写入时点|浏览器可达性|
|可执行门禁|确认类型、状态、负向消费者和边界|真实视觉呈现|
|Production Build|确认远程代码可以构建|因果完整性|
|真实浏览器|确认路径可达与可见结果|源码中未执行的负向分支|

---

## 2. 四项前序阻断重新检查

### 2.1 Recovery TTL

当前唯一 TTL：

```text
src/services/xinmaiRealityEncounterIntentController.ts

const INTENT_TTL_MS = 2 * 60 * 60 * 1_000
```

裁决：

```text
Recovery TTL：
2 hours

24 hours 实现：
0

TTL：
PASS
```

已验证：

|条件|结果|
|-|-|
|`issuedAt + 2h - 1ms`|仍可恢复|
|`issuedAt + 2h`|过期|
|`issuedAt + 2h + 1ms`|过期|
|刷新恢复|不延长 `expiresAt`|
|同周期重试|不延长 `expiresAt`|
|revision 推进|不延长 `expiresAt`|
|ACTIVE 恢复|保留原周期与原截止时间|
|旧 24 小时 Snapshot|不能突破 2 小时上限|
|系统时钟回拨|不能扩大恢复窗口|
|过期|保留原 `encounterCycleId`，不自动创建新周期|

过期只终结 Intent：

```text
current Intent
↓
TERMINAL / INTENT_EXPIRED
```

过期不消费或清除：

- 生命身份；
- 二十八宿；
- StarBeast Identity；
- Relationship Name；
- Life Whisper；
- Pressure Seed；
- Crystal；
- Archive。

过期也不等于用户“明确离开”。只有下一次用户明确请求新的 Reality encounter，Controller 才可创建新周期。

### 2.2 Typed Host Outcome

当前合法链：

```text
RealityLifeUniverseCanvas
↓
RealityLifeSurfaceOutcome

RealityPressureSeedPresentation
↓
RealityPressureSurfaceOutcome

两项同周期 Outcome
↓
RealitySurfaceAdmissionTransaction
↓
RealityHostAcceptanceOutcome
```

裁决：

```text
Typed Host Outcome：
PASS
```

确认事实：

1. `RealityProductionHost` 不再用 `querySelector`、`isConnected` 或 DOM 节点存在判断成功；
2. 没有 `MutationObserver` 形成第二条成功通道；
3. Life Surface 必须满足：
   - 当前 admission refs 一致；
   - Renderer 已执行真实 frame；
   - Reality 到达可见 `SETTLED` 阶段；
   - WebGL context 未丢失；
4. Reduced Motion 必须实际挂载 semantic static same-life surface，才可产生 Static Outcome；
5. Candidate Surface 必须拥有非空候选 bundle，并产生自己的 typed outcome；
6. Host 只有同时收到同一 attempt 的两项 typed outcome，才组装单一事务；
7. Controller 再次校验 intent、cycle、revision、三项身份引用、两项 surface outcome 与 transaction；
8. `data-*` 仍可存在，但只作为观测、测试定位和验收镜像；
9. `data-*` 不再被 Host 或 Controller 读取为成功输入。

8 秒 Watchdog：

```text
作用：
失败看门狗

允许输出：
REALITY_HOST_UNAVAILABLE

允许提交成功：
NO
```

视觉到达节奏仍可使用时间推进动画阶段，但“计时器结束”本身不足以成功。没有真实 frame、真实静态同体表面或 Candidate Surface 时，事务不能成立。

### 2.3 Route Recovery Boundary

扫描结论：

```text
Route Direct sessionStorage Read：
0

Route Direct localStorage Read：
0

Route Direct Intent Recovery Adapter Import：
0

Controller Direct sessionStorage Read：
0

Intent sessionStorage Reader / Writer：
xinmaiRealityEncounterIntentRecoveryAdapter only
```

当前边界声明：

```text
typedIdentityRecoveryAdapterConsumptionOnly
typedIntentRecoveryViaControllerOnly
noDirectStorageRead
recoveryCandidateIsNotAuthority
identityOnlyAuthorizationForbidden
```

旧失真声明：

```text
inMemoryRealityEntryContextOnly
noStorageRead
```

已退出 Runtime 与边界类型。

裁决：

```text
Route Recovery Boundary：
PASS
```

Recovery Snapshot 只是恢复候选。Route 不能因为 Storage 字段存在而自行授权；Controller 必须重新校验身份、周期、状态与 TTL。

### 2.4 Render-phase Mutation

当前生产代码仍存在：

```text
RealityProductionRouteEntry render
↓
useMemo
↓
establishRealityEncounterAdmission(...)
↓
Controller READY → ACCEPTING
↓
revision + 1
↓
Recovery Candidate Write
```

同一 render 还会在另一个 `useMemo` 中：

```text
clearRealityRouteActivationSourceContext()
activateRealityRouteActivationSourceContext(...)
```

因此当前 render 不是纯读取与纯 Resolver。

裁决：

```text
useMemo Admission Command：
FOUND

React render Controller write：
FOUND

React render Recovery write：
FOUND

Admission post-commit transaction point：
NOT ESTABLISHED

Strict Mode speculative render safety：
NOT PROVEN

Abandoned render safety：
FAIL

快速 Route 切换半事务保护：
NOT PROVEN

Render-phase Mutation：
FAIL
```

Controller 对同一 `ACCEPTING_REALITY` 的重复 Admission 具有部分幂等能力，但这不能证明：

- speculative render 不会推进 Runtime；
- abandoned tree 不会留下 Recovery 写入；
- Strict Mode 重复执行始终零 mutation；
- Route 快速切换不会留下半事务；
- React commit 失败时 Admission 能回滚。

本项是 `RealityEncounterIntent Delivery` 保持 `OPEN` 的结构性阻断。

---

## 3. 单一权威链验收

目标链：

```text
用户明确入口意愿
↓
RealityEncounterIntent READY
↓
同一 encounterCycleId 的 Route Admission
↓
真实 Life Surface Outcome
↓
真实 Candidate Surface Outcome
↓
Host 组装 Typed Admission Transaction
↓
Controller 校验周期、身份、revision 与表面事实
↓
ACTIVE_IN_REALITY
```

当前逐段裁决：

|阶段|权威生产者|结果|
|-|-|-|
|明确入口意愿|Genesis / Returning / Choice 的明确用户动作|PASS|
|`READY_TO_ENTER_REALITY`|Intent Controller|PASS|
|`encounterCycleId`|Intent Controller 唯一生成|PASS|
|Route Admission|Intent Controller|PARTIAL：在 render 阶段发起|
|Life Surface Outcome|RealityLifeUniverseCanvas|PASS|
|Candidate Surface Outcome|RealityPressureSeedPresentation|PASS|
|Composite Transaction|RealityProductionHost|PASS|
|Active Commit|Intent Controller|PASS|
|React commit 与 Admission 原子关系|尚未建立|FAIL|

单一 `ACTIVE_IN_REALITY` 状态写者仍是 Controller。

但完整因果不能只检查最终状态写者。Admission 在 render 阶段先行推进，意味着入口事务仍可能在 UI commit 前留下权威中间事实。

因此：

```text
Single ACTIVE Authority：
PASS

Single Admission Transaction：
FAIL

End-to-end Causal Closure：
OPEN
```

---

## 4. 禁止旁路复验

|禁止旁路|当前结果|证据|
|-|-|-|
|identity-only|CLEAR|Authorization 必须携带 typed Admission|
|Route mounted|CLEAR|Route 挂载本身不能提交 Active|
|`navigate("/reality")` 已调用|CLEAR|Navigate 只携带 Intent ref|
|DOM 节点存在|CLEAR|Host 无 DOM 成功读取|
|固定页面计时器结束|CLEAR|Watchdog 只能失败|
|Pressure Candidate 对象已创建|CLEAR|必须有 Candidate Surface typed outcome|
|Recovery 字段存在|CLEAR|Snapshot 只是候选|
|旧周期 Outcome|CLEAR|cycle / revision / identity 校验拒绝|
|页面自行设置 Active|CLEAR|只有 Controller `commitRealityEncounterActive` 可写|
|Renderer 设置关系或 Intent|CLEAR|Renderer 只产生视觉事实|

当前没有第二个 `ACTIVE_IN_REALITY` 写者，也没有 Phase 3 系统提前消费 Intent：

```text
Pressure Seed：
不消费 Intent 状态作为成长结论

Six Dimension：
0

Gravity：
0

AI Reflection：
0

Choice Result：
0

Crystal：
0

Archive Growth：
0

Renderer Intent Read：
0
```

---

## 5. 生产者与消费者表

|生产者|输出|直接消费者|Runtime 状态|禁止消费者|
|-|-|-|-|-|
|Genesis 明确进入动作|Reality request qualification|Intent Controller|✓|Pressure / Growth|
|Returning 明确进入动作|Reality request qualification|Intent Controller|✓|历史 Pressure 自动激活|
|Choice Continuation 明确动作|`LIVED_RESPONSE_CONTINUATION`|Intent Controller|✓|直接 Active / Storage|
|Intent Controller|`READY_TO_ENTER_REALITY`|Route Admission|✓|Renderer / Growth|
|Intent Recovery Adapter|Recovery Candidate|Intent Controller|✓|Route / Page / Renderer|
|Route Admission|`RealityEncounterAdmission`|Authorization / Host|✓，但 render-phase 发起|Pressure 结论|
|Life Surface|typed Life Outcome|Host|✓|Controller 直连|
|Candidate Surface|typed Candidate Outcome|Host|✓|Controller 直连|
|Host|typed Admission Transaction|Route callback|✓|页面直接 Active|
|Route callback|Host Outcome|Intent Controller|✓|Storage|
|Intent Controller|`ACTIVE_IN_REALITY`|Reality 生命周期门禁|✓|Phase 3 结果判断|

没有发现第二套 Reality Intent Controller、第二个 cycle generator 或第二个 Active writer。

---

## 6. 真实浏览器关闭矩阵

真实浏览器基线：

```text
http://127.0.0.1:5178
Remote source:
3728254a6581e783c741d1ad85311670ba396dd5
```

真实浏览器与自动门禁必须分开记录：

|路径|源码/自动门禁|真实浏览器|裁决|
|-|-|-|-|
|Motion|PASS|PASS|画布 `SETTLED` 后出现 3 个 Reality 候选|
|Reduced Motion 静态同体表面|PASS|NOT PROVEN|关闭条件未满足|
|Life Surface 失败|PASS|NOT PROVEN|关闭证据不足|
|Candidate Surface 失败|PASS|NOT PROVEN|关闭证据不足|
|8 秒 Watchdog|PASS：failure-only|NOT PROVEN|关闭证据不足|
|旧周期 Outcome 晚到|PASS|NOT PROVEN|自动门禁有效，浏览器缺失|
|身份引用失配|PASS|NOT PROVEN|自动门禁有效，浏览器缺失|
|空候选|PASS|NOT PROVEN|自动门禁有效，浏览器缺失|
|刷新恢复|PASS|NOT PROVEN|Controller 门禁通过，浏览器证据未闭合|
|直接 URL|PASS|PASS|无 Intent 时显示 `SOURCE_NOT_READY`|
|前进后退|PARTIAL|PARTIAL|保持同一 cycle，但会进入 truthful retry|
|同周期重试|PASS|PASS|同一 cycle，revision 推进，Motion 再次成立|
|Choice Continuation|PASS|NOT PROVEN|Controller 门禁通过，浏览器缺失|
|TTL 过期|PASS|NOT PROVEN|可控时钟门禁通过，浏览器缺失|
|明确离开|PASS|NOT PROVEN|Controller 门禁通过，浏览器缺失|

真实浏览器已记录的 Motion / Retry 事实：

```text
encounterCycleId：
reality-encounter:7698e8ea-db5b-402f-9867-490afe520c55

retry revision：
7

arrival：
SETTLED

canvas：
1

visible candidate actions：
3
```

真实浏览器直接 URL：

```text
Intent unavailable
↓
SOURCE_NOT_READY
↓
不显示 Candidate Surface
↓
不声明 Active
```

Reduced Motion 关闭要求明确规定：

> 必须是真实浏览器中的静态同体表面证据，不能以源码字符串、事务单元测试或 `matchMedia` 逻辑代替。

当前未取得该证据，因此即使 render-phase mutation 不存在，本刀也不能宣告 Delivery `CLOSED`。

---

## 7. 自动检查与 Build

结果：

```text
TypeScript：
PASS

Production Build：
PASS

Modules：
286

新增构建失败：
0

既存提示：
大分包 warning
```

核心门禁：

```text
XINMAI Reality Encounter Intent Controller：
PASS

XINMAI Reality Encounter Intent Recovery：
PASS

XINMAI Reality Encounter Intent Atomic Migration：
PASS

XINMAI Reality Surface Outcome Admission Transaction：
PASS

Reality Production Route Entry：
PASS

Registered XINMAI gates：
32 / 32 PASS
```

门禁覆盖不足：

```text
Atomic Migration gate
没有拒绝：
useMemo → establishRealityEncounterAdmission

Route Entry gate
没有拒绝：
render-phase Controller / Recovery write
```

因此现有门禁全绿不能替代独立关闭裁决。

---

## 8. Pressure Presentation 黄灯归属

既存门禁：

```text
scripts/check-reality-pressure-seed-presentation-contract.mjs
```

当前失败：

```text
missing:
Gravity 尚未启动
```

进一步审计发现，该门禁还禁止：

```text
useEffect
```

但当前 Candidate Surface 作为 Typed Surface Outcome 生产者，合法使用 `useEffect` 在实际挂载后报告表面事实。

因此该门禁同时存在两项历史漂移：

1. 把旧精确文案当作阶段边界；
2. 把所有 `useEffect` 一律视为业务 Runtime，无法区分“表面已呈现事实”与“Gravity 执行”。

当前 Runtime 的真实边界为：

```text
Gravity execution：
0

direct Gravity action：
WITHHELD

Gravity readiness：
只在已有 session READY 后显示内观引导

Candidate Surface：
不执行 Gravity
```

裁决：

```text
Pressure Presentation 黄灯：
STALE GATE / SEMANTIC MAP REQUIRED

未解决阶段权威冲突：
NO EVIDENCE

是否阻断本审计执行：
NO

是否允许本审计顺带修改：
NO
```

后续必须独立输出：

```text
XINMAI-PRESSURE-PRESENTATION-GRAVITY-STAGE-SEMANTIC-GATE-MAP-P0
```

---

## 9. 关闭门禁逐项裁决

|关闭条件|结果|
|-|-|
|2 小时 TTL|PASS|
|24 小时实现为 0|PASS|
|Typed Life Surface Outcome|PASS|
|Typed Candidate Surface Outcome|PASS|
|DOM / Mutation Observer 成功旁路为 0|PASS|
|Watchdog failure-only|PASS|
|Route direct storage read 为 0|PASS|
|Typed Recovery Adapter 唯一 Intent storage 边界|PASS|
|边界声明与真实 recovery 语义一致|PASS|
|render 阶段零 Controller 写入|FAIL|
|render 阶段零 Recovery 写入|FAIL|
|Admission 有 React commit 后的明确提交点|FAIL|
|Strict Mode / abandoned render 幂等|NOT PROVEN|
|Motion 真实浏览器证据|PASS|
|Reduced Motion 真实浏览器证据|FAIL|
|完整失败与恢复浏览器矩阵|PARTIAL|
|远程 Build 与核心门禁|PASS|

最终：

```text
RealityEncounterIntent Delivery：
OPEN
```

---

## 10. 缺口分流

### RED｜必须原子迁移

名称建议：

```text
XINMAI-REALITY-ROUTE-ADMISSION-POST-COMMIT-ATOMIC-MIGRATION-P0
```

刀型：

```text
Migration / Atomic Correction
```

唯一目标：

> 将 Admission Command 与 Activation Source 写入从 React render 移到明确的 post-commit transaction owner，并保证 Strict Mode、abandoned render、快速 Route 切换与恢复重试不留下半事务。

必须同一回滚单位覆盖：

- Route Admission 发起时点；
- Controller / Recovery 写入时点；
- Activation Source 建立与清理；
- stale attempt 取消；
- Strict Mode 幂等键；
- Route 快速切换；
- Admission 未 commit 时的清理；
- 既有 typed surface transaction 消费不变。

禁止拆成：

```text
新 post-commit Admission
+
旧 render-phase Admission
```

### YELLOW｜独立语义 MAP

```text
XINMAI-PRESSURE-PRESENTATION-GRAVITY-STAGE-SEMANTIC-GATE-MAP-P0
```

目标：

- 判断旧精确文案是否仍是产品语义；
- 区分 Surface Outcome `useEffect` 与 Gravity Runtime；
- 重新冻结 presentation gate 的合法职责。

### YELLOW｜独立浏览器关闭复验

Post-commit migration 完成后，必须重新执行完整真实浏览器矩阵，尤其：

- Reduced Motion；
- Life / Candidate failure；
- Watchdog；
- Refresh；
- Choice Continuation；
- TTL expiry；
- Explicit leave。

---

## 11. 阶段控制

正确顺序：

```text
Intent Closure Audit
↓
Route Admission Post-Commit Atomic Migration
↓
Intent Closure Re-Audit
↓
Pressure / Gravity 黄灯归属裁决
↓
Phase 3 Entry Review
↓
Product Control Tower 决定是否解锁
```

本刀没有：

- 修改 Runtime；
- 修改 Pressure 文案；
- 修改门禁；
- 修改 Renderer；
- 修改 TTL；
- 新增消费者；
- 解锁 Phase 3；
- 将视觉生命强度或商业化方向提前进入 Runtime。

正式状态：

```text
Phase 2：
CLOSED

RealityEncounterIntent Product Authority：
ACCEPTED

RealityEncounterIntent Runtime Authority：
ESTABLISHED

RealityEncounterIntent Delivery：
OPEN

Phase 3：
LOCKED

下一刀：
XINMAI-REALITY-ROUTE-ADMISSION-POST-COMMIT-ATOMIC-MIGRATION-P0

决策：
RED / REQUIRES SEPARATE ATOMIC AUTHORIZATION
```
