# XINMAI Reality Pressure Seed Recognition Host Lifecycle Continuity Major Blade Prep P0

任务编号：

`XINMAI-REALITY-PRESSURE-SEED-RECOGNITION-HOST-LIFECYCLE-CONTINUITY-MAJOR-BLADE-PREP-P0`

审查日期：

`2026-07-30`

审查基线：

```text
b5310487f089bb0809347021ca8c9bcb9f26d087
```

远程分支：

```text
origin/codex/genesis-28-mansion-production-continuity
=
b5310487f089bb0809347021ca8c9bcb9f26d087
```

交通灯：

```text
YELLOW
```

刀型：

```text
Major Blade Prep
```

决策边界：

```text
NOW — PREP ONLY

Runtime：
未修改

Storage：
未修改

Gate：
未修改

Renderer：
未修改

Choice Presentation：
继续 SAFE_WITHHELD
```

---

# 一、Construction State Card

```text
当前 Phase：
Phase 3

当前状态：
ACTIVE / NOT PASSED

当前主线：
Reality Adventure

已关闭：
正式 Motion Reality → Gravity Reachability
首次成长因果 Authority
Transactional Persistence
Gravity Observation Continuity

当前缺口：
Pressure Recognition 只存在于 Host 组件周期

本刀主 Layer：
Layer 4 Growth 的 Reality Recognition Continuity

保护：
Layer 1 World
Layer 2 Identity
Layer 3 Relationship
Reality provenance
Gravity Admission

Visual Runtime：
DEFER

Phase 4：
LOCKED
```

本刀唯一回答：

> 用户明确认出某一 Reality Pressure Candidate 后，如何形成可跨 Refresh、Back / Forward、Host remount 与多标签验证的稳定 Recognition Fact / Typed Receipt，并由同一 Receipt 驱动 Gravity Transfer Readiness。

---

# 二、PREP 最终裁决

```text
NOW — MIGRATION AUDIT READY
```

当前 Host 本地状态本身可以在单提交中退出成功真源。

但满足完整授权目标时，问题不再只是一项 Host 状态修正。

目标链要求：

```text
Recognition Receipt
↓
Gravity Transfer Readiness
↓
Gravity Cutover
↓
Gravity Admission
```

同时必须保证：

- 同一 encounter 多标签只能承认同一 Recognition；
- 同一 Receipt 最多驱动一次有效 Gravity Transfer；
- Transfer 成功与 Gravity Admission 恢复一致；
- Refresh 与 Host remount 不补造 Receipt；
- 旧标签晚到不能覆盖当前状态。

当前三个事实处于不同的运行与持久化域：

```text
Recognition：
RealityProductionHost React state

Reality Intent：
module Controller + sessionStorage

Gravity Cutover / Admission：
module Controller + 独立 sessionStorage
```

`sessionStorage` 不跨标签共享。

若只新增独立 Recognition Receipt：

```text
Receipt 可能已确认
但 Gravity Cutover 未确认
```

或：

```text
标签 A、B 拥有同一 encounterCycleId
↓
两个标签分别消费同一 Receipt 语义
↓
各自在自己的 sessionStorage 形成不同 Gravity Admission
```

因此只建立 Receipt Controller 不能满足原子真实性。

要关闭目标，必须审计并切换：

- Recognition 提交；
- Receipt Recovery；
- Transfer claim / consumption；
- Gravity Cutover；
- Gravity Admission recovery；
- 旧 Host 成功路径；
- sessionStorage 与跨标签事务边界。

这属于成功真源与持久化责任迁移。

故本 PREP 不直接授权黄色 Major Runtime，升级为红色 Migration Audit。

---

# 三、四类资产正式分离

## 3.1 Pressure Candidate

产品语义：

> 系统当前向用户呈现的现实压力候选。

它拥有：

- candidate reference；
- presentation-safe surface / shell；
- bundle membership；
- Pressure Matrix provenance；
- 当前候选集合。

它不拥有：

- 用户是否认出；
- Recognition Fact；
- Gravity readiness；
- Transfer；
- Admission；
- Choice；
- Crystal。

候选出现不得自动推进任何 Authority。

## 3.2 Recognition Fact

产品语义：

> 用户明确确认“这就是我此刻正在面对的现实”。

它只能来自：

```text
当前可消费 Candidate
+
明确用户动作
+
当前 Reality encounter
+
完整 identity / provenance 校验
```

它不是：

- 候选可见；
- 候选获得焦点；
- 页面滚动到候选；
- DOM click 事件本身；
- Host 本地枚举；
- AI 判断；
- Pressure Engine 自动选择。

## 3.3 Typed Recognition Receipt

产品语义：

> Recognition Fact 已完成当前身份、Encounter、Candidate revision 与 provenance 校验，并在正式 Recovery Authority 中可靠提交。

页面只有在 Receipt 的提交事务完成后，才可以展示：

```text
SEED_RECOGNIZED
```

Receipt 是提交真实性，不是第二份 Pressure Seed。

## 3.4 Gravity Transfer Readiness

产品语义：

> 当前有效 Recognition Receipt 已满足进入 Gravity Transfer 的上游资格。

它只消费 Receipt。

它不：

- 创建 Recognition；
- 修改 Candidate；
- 改写 Receipt 内容；
- 自动导航；
- 代表 Gravity Admission 已成立。

目标链：

```text
Recognition Receipt
↓
GRAVITY_READY_TO_CONTINUE
↓
用户明确 Body Approach
↓
Typed Gravity Transfer Request
```

---

# 四、当前状态所有权图

```text
RealityPressureSeedCandidateSource
生产 immutable Candidate Bundle
        ↓
RealityPressureSeedPresentation
显示 Candidate + 提交 onRecognize
        ↓
RealityProductionHost
组装 PRESSURE_SEED_RECOGNIZE command
        ↓
RealityProductionPressureSeedConsumer
验证 session / source / bundle
        ↓
RealityPressureSeedCaptureAdapter
生产 CAPTURED / SEED_RECOGNIZED
        ↓
RealityProductionHost.pressureHostState
当前组件周期唯一持有 recognized session
        ↓
RealityLifeUniverseCanvas
显示生命天气与 Body Approach
        ↓
RealityProductionHost
组装 GravityEntryTransferRequest
        ↓
RealityToGravityCutoverTransaction
        ↓
Gravity Entry Recovery + Admission
```

当前 `SEED_RECOGNIZED` 的语义生产者是：

```text
RealityPressureSeedCaptureAdapter
```

当前 recognized session 的生命周期 Owner 是：

```text
RealityProductionHost.pressureHostState
```

当前没有：

- Recognition Controller；
- Recognition Receipt；
- Recognition Recovery Adapter；
- Recognition transaction；
- Receipt revision；
- Receipt lifecycle；
- Receipt → Transfer consumption proof。

刷新后 Route 恢复同一 Reality Intent，但 Host 重新初始化 Pressure Session：

```text
SEED_RECOGNIZED
→ OBSERVING_CANDIDATES
```

---

# 五、目标状态所有权图

产品语义目标：

```text
Candidate Source
提供 immutable candidate context
        ↓
Host
只提交 typed Recognition Command
        ↓
Reality Pressure Recognition Controller
重读当前 Authority facts
校验 identity / encounter / candidate / provenance
        ↓
Transactional Recovery Adapter
唯一读写 Recognition Fact / Receipt
        ↓ transaction complete
Typed Recognition Outcome
        ↓
Host
只消费 outcome 并显示 SEED_RECOGNIZED
        ↓
Gravity Transfer Readiness Resolver
只读 Receipt
        ↓
Body Approach + Transfer Claim
        ↓
Gravity Cutover / Admission
```

冻结责任：

## Controller

唯一拥有：

- Candidate → Recognition Fact；
- Receipt revision；
- Receipt lifecycle；
- current / stale 校验；
- recovery candidate validation；
- explicit leave / new encounter 终结；
- transfer claim / consumption eligibility。

Controller 不拥有：

- Candidate 生成；
- Candidate 文案；
- Renderer；
- Gravity 视觉；
- Choice；
- Crystal。

## Recovery Adapter

唯一拥有：

- Receipt persistent read；
- Receipt persistent write；
- compare / transact；
- write confirmation；
- corruption / unavailable outcome；
- cross-tab transaction serialization。

Storage 内容只是恢复候选。

Controller 重新校验后才成为当前 Runtime Fact。

## Host

只：

- 提交 command；
- 消费 typed outcome；
- 显示 Presentation；
- 提交 Body Approach intent。

Host 不：

- 先行 `setState(SEED_RECOGNIZED)`；
- 直接读写 Storage；
- 生成 Receipt；
- 恢复 Receipt；
- 决定 stale；
- 直接提交 Gravity Admission。

## Route

只消费：

- typed Reality Intent recovery；
- typed Recognition recovery；
- typed Gravity recovery。

Route 不直接读取 Storage，也不补造 Receipt。

## Renderer / DOM

```text
Authority：
0
```

---

# 六、Recognition Fact Schema

目标 Fact：

```ts
type RealityPressureRecognitionFact = Readonly<{
  schemaVersion:
    "XINMAI_REALITY_PRESSURE_RECOGNITION_FACT_V1";
  source:
    "xinmai_reality_pressure_recognition_controller";

  identityReferences: Readonly<{
    sourceReferenceId: string;
    starBeastIdentityReferenceId: string;
    mansionCoordinateReferenceId: string;
  }>;

  realityIntentReferenceId: string;
  encounterCycleId: string;
  realityActiveRevision: number;

  candidateReferenceId: string;
  candidateBundleReferenceId: string;
  candidateRevisionReferenceId: string;

  pressureProvenance: Readonly<{
    candidateSource: "PRESSURE_SEED_MATRIX_V2";
    recognitionSource: "REAL_USER_SESSION";
    sourceReferenceId: string;
    bundleReferenceId: string;
    candidateReferenceId: string;
  }>;

  userRecognitionAction:
    "EXPLICIT_CANDIDATE_RECOGNITION";
  recognizedAt: string;
}>;
```

Fact 不保存：

- DOM 顺序；
- 候选横向 index；
- pixel / coordinate；
- animation frame；
- Renderer state；
- Candidate 自由文本副本；
- `surface` / `shell` 的重复副本；
- 六维；
- Choice；
- Crystal。

刷新恢复 Selected Pressure Context 时：

```text
Receipt identifiers
+
当前 Candidate Source Context
↓
重新校验 membership 与 revision
↓
从正式 Candidate Record 重建 Pressure Session
```

不得从 Receipt 的文本副本重建。

---

# 七、Typed Recognition Receipt Schema

目标 Receipt：

```ts
type RealityPressureRecognitionReceiptLifecycle =
  | "RECOGNIZED"
  | "TRANSFER_CLAIMED"
  | "CONSUMED_BY_GRAVITY_TRANSFER"
  | "TERMINAL";

type RealityPressureRecognitionReceipt = Readonly<{
  schemaVersion:
    "XINMAI_REALITY_PRESSURE_RECOGNITION_RECEIPT_V1";
  source:
    "xinmai_reality_pressure_recognition_controller";

  recognitionReceiptReferenceId: string;
  revision: number;
  lifecycle: RealityPressureRecognitionReceiptLifecycle;

  fact: RealityPressureRecognitionFact;

  issuedAt: string;
  updatedAt: string;
  expiresAt: string;

  gravityTransferClaimReferenceId: string | null;
  consumedGravityTransferReferenceId: string | null;
  consumedGravityAdmissionReferenceId: string | null;

  terminalReason:
    | null
    | "EXPLICIT_LEAVE"
    | "START_NEW_ENCOUNTER"
    | "INTENT_EXPIRED"
    | "IDENTITY_MISMATCH"
    | "CANDIDATE_REVISION_STALE"
    | "RECOVERY_CORRUPTED"
    | "USER_DATA_CLEARED";

  provenance: Readonly<{
    explicitUserRecognitionRequired: true;
    recoveryWriteConfirmed: true;
    noAutomaticSelection: true;
    noDomAuthority: true;
    noRendererAuthority: true;
    noGrowthAuthority: true;
  }>;
}>;
```

唯一 record identity：

```text
encounterCycleId
```

同一 encounter 最多存在一个 current Recognition Receipt。

同一 Receipt 可以增加 lifecycle revision，但不得生成第二个并行 current receipt。

---

# 八、Candidate Revision 冻结

当前 Candidate contract 没有独立 revision 字段。

当前可用的稳定引用是：

- `sourceReferenceId`；
- `candidateBundleReferenceId`；
- `candidateReferenceId`；
- Candidate Source schema version；
- Pressure Matrix provenance。

不能使用：

- DOM 顺序；
- 舞台 index；
- 文案内容；
- `createdAt`；
- 当前页面渲染次数。

目标必须新增：

```text
candidateRevisionReferenceId
```

它由 Candidate Source 生产，而不是由 Page、Host 或 Receipt 生成。

P0 方向：

```text
Candidate Source Schema Version
+
immutable bundleReferenceId
+
candidateReferenceId
+
正式 Matrix catalog revision
↓
candidateRevisionReferenceId
```

当前 Pressure Matrix 没有公开 catalog revision。

因此 Migration Audit 必须裁决：

1. 是否为 Candidate Source 增加正式 catalog revision；
2. 是否将 bundle membership version 作为 P0 revision；
3. Matrix 内容变化时旧 Receipt 如何进入 `CANDIDATE_REVISION_STALE`；
4. 是否允许同 ID Candidate 在同一 encounter 中更换语义；
5. 新 revision 如何保证不复制 Candidate 原始文本。

在该字段没有权威生产者前，不得让 Host 自行拼接 revision。

---

# 九、Recovery 存储方案比较

## Option A：扩展 Reality Encounter sessionStorage Snapshot

```text
Reality Encounter Intent
+
Recognition Receipt
↓
同一个 sessionStorage snapshot
```

优势：

- 同一标签刷新简单；
- Intent 与 Receipt 可写入同一 JSON；
- TTL 与 explicit leave 可共用。

风险：

- 当前所有 Intent 写入 API 只接受 `RealityEncounterIntent`；
- 任何旧 Controller update 都可能覆盖 Receipt；
- 必须升级既有 Recovery schema；
- 需要迁移 V1 snapshot；
- `sessionStorage` 不跨标签共享；
- 不能解决同 encounter 多标签竞争；
- 不能与独立 Gravity sessionStorage 原子提交。

裁决：

```text
REJECT AS FINAL AUTHORITY
```

可作为 Migration Audit 的兼容读取来源，但不能成为目标跨标签真源。

## Option B：独立 Recognition sessionStorage Record

优势：

- 文件范围最小；
- 不修改 Reality Intent schema；
- 单标签刷新可恢复。

风险：

- 与 Intent、Gravity 分成三个独立 key；
- clear / terminal 存在半状态；
- 多标签各自拥有独立 Receipt；
- 无真实 compare-and-write；
- 无法防止同 encounter 双 Transfer；
- 容易形成“独立 Progress Storage”。

裁决：

```text
REJECT
```

## Option C：localStorage + Web Lock

优势：

- 跨标签可见；
- Web Lock 可做运行期串行调度。

风险：

- Web Storage 本身不提供原子 read-modify-write；
- Web Lock 不可用时不能安全降级；
- crash 后 lock 与 storage truth 分离；
- 不能与 Gravity sessionStorage 同事务；
- 容易出现 Lock、revision、Receipt 三套竞争权威。

裁决：

```text
REJECT AS CANONICAL AUTHORITY
```

Web Lock 最多只能作为性能调度器，不能生产 Receipt success。

## Option D：复用 Lived Growth IndexedDB

优势：

- 已有真实事务能力；
- 已有跨标签与 transaction complete 纪律。

风险：

- Recognition 属于 Reality 入口，不是 Lived Growth；
- 会让 Phase 3 后段 Growth Store 反向拥有上游 Pressure Recognition；
- 扩大 Growth Transaction Authority 的产品责任；
- 破坏 World / Relationship / Reality provenance 边界；
- 容易让 Choice / Crystal Store 成为 Reality 入口依赖。

裁决：

```text
REJECT
```

## Option E：独立 Reality Adventure Transactional Continuity Store

目标范围：

```text
Reality Encounter continuity
Recognition Receipt
Gravity Transfer Claim
Gravity Cutover proof
Gravity Admission reference
```

优势：

- IndexedDB `readwrite` transaction 可跨标签串行；
- 同 encounter 可设置唯一 key / index；
- Receipt 与 Transfer claim 可使用同一 fencing revision；
- transaction complete 后才返回成功；
- 可将 old tab / stale revision 安全拒绝；
- 能提供一个跨 Route / Host 的 typed Recovery Adapter。

风险：

- 需要新增正式持久化 schema；
- 需要决定现有 Reality / Gravity sessionStorage 的兼容与退出；
- Cutover 与 Admission consumer 必须迁移；
- 需要原子删除旧 Host success path；
- 需要 V1 isolation 与 forward rollback；
- 属于红色 Migration。

裁决：

```text
唯一推荐方向
PENDING MIGRATION AUDIT
```

---

# 十、唯一生命周期 Owner

目标语义 Owner：

```text
RealityPressureRecognitionController
```

目标持久化 Owner：

```text
RealityAdventureContinuityTransactionalRecoveryAdapter
```

约束：

- Controller 不直接调用 DOM；
- Adapter 不决定产品语义；
- Route 不直接读 IndexedDB；
- Host 不直接读 IndexedDB；
- Renderer 不读取 Receipt；
- Gravity Admission 只消费 typed claim / receipt proof；
- Growth Store 不读取 Recognition Receipt；
- Pressure Candidate Source 不读取 Receipt。

当前 `RealityEncounterIntentController` 继续拥有 Reality Intent。

但 Migration Audit 必须决定：

```text
Reality Intent 的持久化
是否迁入同一个 transactional envelope
```

原因是当前 Intent 仍在 sessionStorage。

如果 Intent 留在 sessionStorage，则 IDB Receipt 只能作为恢复候选，Controller 每次必须重新验证：

- 当前 Intent 存在；
- current encounter 一致；
- intent 仍 Active；
- identity 一致；
- TTL 未过期。

如果无法在跨标签下证明同一 current Intent，则必须把 Intent persistence 也纳入原子迁移。

---

# 十一、原子提交点

Recognition 的唯一合法提交链：

```text
用户点击当前可消费 Candidate
↓
Host 生成 typed command
↓
Controller 在事务内重读 current record
↓
校验：
identity
intent
encounter
candidate bundle
candidate revision
candidate membership
provenance
current lifecycle
↓
写 Recognition Fact
↓
写 Typed Receipt
↓
IDBTransaction complete
↓
返回 RECOGNIZED outcome
↓
Host 显示 SEED_RECOGNIZED
```

禁止：

- Host 先 `setState(SEED_RECOGNIZED)`；
- request success 作为成功；
- 页面点击回调返回作为成功；
- transaction 尚未 complete 就开放 Gravity；
- Recovery write failure 时保留本地伪成功；
- Refresh 根据页面状态补造 Receipt。

---

# 十二、Recognition → Gravity 原子边界

仅提交 Receipt 不能证明 Gravity Transfer 已被唯一消费。

目标至少需要：

```text
RECOGNIZED
↓
用户明确 Body Approach
↓
事务内：
Receipt revision current
Receipt lifecycle = RECOGNIZED
无既有 Transfer Claim
无既有 Gravity Admission proof
↓
TRANSFER_CLAIMED
↓ transaction complete
唯一 typed claim
↓
Gravity Cutover
↓
同一 canonical record 写入：
consumedGravityTransferReferenceId
consumedGravityAdmissionReferenceId
↓ transaction complete
CONSUMED_BY_GRAVITY_TRANSFER
```

最高风险：

```text
Receipt 已标记 consumed
但 Gravity Admission 未可靠形成
```

以及：

```text
Gravity Admission 已形成
但 Receipt 仍是 RECOGNIZED
↓
旧标签再次 Transfer
```

Migration Audit 必须决定：

- Transfer claim 是否与 Gravity Admission 在同一 IDB transaction；
- current Gravity sessionStorage 是否降级为 derived mirror；
- Admission reference 是否需要预先确定性生成；
- crash 后哪个 record 允许同 claim 重试；
- 何时 source Reality 才能 supersede；
- Route Ticket 如何只从 committed canonical proof 产生。

在该边界没有冻结前，不得实施 Receipt Runtime。

---

# 十三、生命周期矩阵

| 场景 | 目标 Authority 事实 | Host 展示 | Gravity 权限 |
|---|---|---|---|
| 首次候选出现 | 无 Receipt | `OBSERVING_CANDIDATES` | 关闭 |
| 未认出时刷新 | 无 Receipt | 重新展示当前合法候选 | 关闭 |
| 认出后刷新 | 恢复同一有效 Receipt | `SEED_RECOGNIZED` | 可继续 Body Approach |
| Back / Forward | Controller 重新校验 Receipt | 恢复稳定事实，不恢复动画帧 | 依据 Receipt |
| Host remount | Typed recovery | 不重放 Recognition | 依据 Receipt |
| Motion | 同一 Receipt | Motion Presentation | 同一语义 |
| 原生 Reduced Motion | 同一 Receipt | Static Presentation | 同一语义 |
| candidate revision 改变 | Receipt stale | `SAFE_WITHHELD` | 关闭 |
| 候选列表重排 | 通过 reference 恢复 | 不使用 index | 不受 DOM 顺序影响 |
| 同 encounter 多标签 | 同一 canonical record | 第二标签恢复或 stale | 最多一个 Transfer claim |
| 旧标签 outcome 晚到 | revision / fence mismatch | 不显示成功 | 拒绝 |
| Transfer 已创建 | `TRANSFER_CLAIMED` | 显示正在承接或可恢复 | 不生成第二 claim |
| Gravity Admission 已成立 | canonical admission proof | 进入 Gravity continuation | 不回到 Recognition |
| Direct URL | 无当前 Intent / ticket | Guard | 禁止 |
| Recovery write failure | 无 committed Receipt | `SAFE_WITHHELD` | 关闭 |
| corruption | invalid candidate | `SAFE_WITHHELD` | 关闭 |
| identity mismatch | Receipt 不可消费 | 回到安全生命空间 | 关闭 |
| provenance mismatch | Receipt 不可消费 | `SAFE_WITHHELD` | 关闭 |
| Explicit Leave | Receipt `TERMINAL` | 回到生命空间 | 关闭 |
| 新 Reality Encounter | 新 encounter key | 新候选周期 | 旧 Receipt 不可消费 |
| TTL 过期 | Receipt `TERMINAL` / expired | 不补造 | 关闭 |

---

# 十四、恢复优先级

冻结：

```text
已有 canonical Gravity Admission proof
→ Gravity Continuation

否则已有有效 Transfer Claim
→ 恢复同一 Transfer / Retry 状态

否则已有有效 Recognition Receipt
→ SEED_RECOGNIZED

否则
→ OBSERVING_CANDIDATES
```

禁止：

- Gravity Admission 倒推补造 Receipt；
- Gravity Pressure proof 被复制成历史 Recognition Fact；
- sessionStorage 中存在 cutover key 就自动认出；
- Receipt 过期后自动生成新 Receipt；
- 新 encounter 继承旧 candidate；
- Direct URL 根据 Receipt 自行授权 Route。

---

# 十五、TTL、明确离开与新 Encounter

当前 Reality Intent 与 Gravity Entry TTL：

```text
2 hours
```

目标 Recognition Receipt：

```text
expiresAt <= current Reality Intent expiresAt
```

不得：

- Refresh 延长 TTL；
- Retry 延长 TTL；
- Back / Forward 延长 TTL；
- Host remount 延长 TTL；
- Motion / Reduced Motion 改变 TTL。

## Explicit Leave

明确离开必须：

- 终结 Receipt；
- 取消未提交 Transfer claim；
- 不删除身份；
- 不删除关系资产；
- 不清除已有合法 Gravity / Growth 资产；
- 不用普通 unload 代替。

若 terminal write 失败：

```text
SAFE_WITHHELD
```

不得在 UI 声称已经清除。

## New Reality Encounter

只有：

```text
上一 encounter 正式 Terminal
+
用户明确开始新的 Reality
```

才能创建新的 recognition key。

旧 Receipt：

- 不迁入新 encounter；
- 不用于候选默认选择；
- 不成为当前 Pressure；
- 不补造 Gravity；
- 按 TTL / terminal policy 保留或清理。

---

# 十六、多标签与 stale 矩阵

| 场景 | 预期 |
|---|---|
| A、B 同时认出同一 Candidate | 一个 Receipt commit；另一方恢复同一 Receipt |
| A、B 认出不同 Candidate | 第一合法 commit 成为 current；另一方 `STALE / CONFLICT` |
| A commit 后 B 旧 callback 晚到 | fence / revision 拒绝 |
| A claim Transfer，B 再次请求 | B 恢复同一 claim，不生成第二个 |
| A cutover 成功，B 仍显示 Recognition | observer 触发重读，B 进入 Gravity continuation |
| A crash 于 claim 后、cutover 前 | 同 claim retry；不得生成新 claim |
| A cutover storage 成功、canonical proof 失败 | 不得向用户显示成功；进入审计冻结的 recovery |
| A 成功后 B 刷新 | 恢复同一 Admission |
| 新 encounter 替换旧 encounter | 旧标签全部 stale |
| Storage / IDB blocked | `SAFE_WITHHELD`，不回落无锁写入 |

页面按钮禁用、计时器、BroadcastChannel 通知都不能成为 fencing Authority。

Revision observer 只能通知重读。

---

# 十七、Motion / Reduced Motion

两条生产路径必须共享：

- Candidate reference；
- candidate revision；
- Recognition command；
- Controller；
- Receipt schema；
- Recovery Adapter；
- transaction；
- Gravity Transfer claim；
- Gravity Admission。

只允许不同：

- 动画；
-粒子；
- transition；
- typed Surface Outcome mode；
-静态同体呈现。

原生浏览器验收必须分别记录：

```text
Motion：
candidate → receipt → refresh → transfer → /dynamics

Reduced Motion：
candidate → same receipt schema → refresh → same transfer → /dynamics
```

查询参数模拟：

```text
AUXILIARY ONLY
```

不能替代原生 `prefers-reduced-motion`。

---

# 十八、消费者迁移矩阵

| 消费者 | 当前角色 | 裁决 | 目标 |
|---|---|---|---|
| Reality Pressure Candidate Source | Candidate producer | `ADAPT` | 增加正式 candidate revision |
| Pressure Candidate Presentation | command producer | `KEEP` | 只提交 active candidate reference |
| RealityProductionHost | local success owner | `MIGRATE` | 降级为 command / outcome consumer |
| RealityProductionPressureSeedConsumer | session validator | `ADAPT` | 作为 Controller 内纯验证能力 |
| RealityPressureSeedCaptureAdapter | current fact producer | `ADAPT` | 产出候选 Fact candidate，不直接成为 committed success |
| Pressure Continuation Context | Host local session | `MIGRATE` | 从 typed Receipt 重建 |
| Reality Encounter Intent Controller | Reality Authority | `KEEP / ADAPT` | 提供 current intent proof |
| Reality Intent Recovery Adapter | sessionStorage owner | `ISOLATE / MIGRATION REVIEW` | 不直接拥有 Receipt |
| Recognition Controller | 不存在 | `CREATE AFTER AUDIT` | 唯一 Recognition semantic owner |
| Recognition Recovery Adapter | 不存在 | `CREATE AFTER AUDIT` | 唯一 transactional read/write |
| RealityProductionRouteEntry | Host assembler | `ADAPT` | 只消费 typed recovery |
| RealityLifeUniverseCanvas | Presentation / Body Approach | `KEEP` | 不读 Receipt storage |
| Gravity Transfer Request | 消费 Host session | `MIGRATE` | 消费 Receipt / claim proof |
| RealityToGravityCutoverTransaction | separate success domain | `MIGRATE` | 接入 canonical transfer transaction |
| Gravity Entry Admission Controller | separate admission owner | `MIGRATE` | 消费同一 committed claim |
| Gravity Entry Recovery Adapter | sessionStorage | `MIGRATE / DERIVED MIRROR REVIEW` | 不再成为跨标签唯一真源 |
| `/dynamics` Route | Admission consumer | `KEEP / ADAPT` | 只读 typed canonical ticket |
| Browser History | navigation state | `REJECT` | 零 Authority |
| Page | Presentation | `REJECT` | 零 Storage / Receipt ownership |
| Renderer | visual consumer | `REJECT` | 零 Recognition input authority |
| DOM / `data-*` | observation mirror | `REJECT` | 测试证据，不是运行输入 |
| Growth Transaction Store | downstream Growth | `REJECT` | 不拥有 Recognition |
| Pressure Seed / Six Dimension / Choice / Crystal | downstream systems | `REJECT` | 不生产 Receipt |
| Acceptance / Harness | auxiliary evidence | `ISOLATE` | 不成为生产真源 |

---

# 十九、No Backfill

当前没有正式持久化 Recognition Fact。

因此：

```text
NO BACKFILL
```

禁止从以下内容补造 Receipt：

- Host 当前 `SEED_RECOGNIZED` state；
- DOM `data-pressure-seed-capture-state`；
- 历史 Selected Pressure Seed Context；
- Gravity Admission 中的 `userRecognitionConfirmed`；
- 历史 Reality Memory；
- Pressure Seed 文本；
- Candidate 最近一次可见状态；
- sessionStorage 中存在 Gravity key；
- AI 推断；
- 时间经过。

已有合法 Gravity Admission：

```text
继续按 Gravity Recovery 恢复
```

但不得倒推生成历史 Receipt。

旧 V1 Reality / Gravity Recovery：

- 原样保留；
- 只读兼容范围由 Migration Audit 冻结；
- 不自动合并；
- 不按时间选择赢家；
- 不重写 identity / provenance；
- 不删除。

---

# 二十、失败语义

| 失败 | Receipt | UI | Gravity |
|---|---|---|---|
| Candidate 不 current | 不写 | 重读候选 | 关闭 |
| candidate revision mismatch | 不写 / stale | `SAFE_WITHHELD` | 关闭 |
| identity mismatch | 不写 | 安全退出 | 关闭 |
| encounter mismatch | 不写 | 重读 current encounter | 关闭 |
| provenance mismatch | 不写 | `SAFE_WITHHELD` | 关闭 |
| transaction blocked | 不写 | 可重试 | 关闭 |
| transaction abort | 不写 | 不显示 recognized | 关闭 |
| write unconfirmed | 不写成功 | 不伪成功 | 关闭 |
| corruption | 不消费 | `SAFE_WITHHELD` | 关闭 |
| old tab stale | 不推进 | 重读 | 关闭 |
| Transfer claim conflict | 保留 current | 恢复 current claim | 不生成第二 claim |
| Admission failure | Receipt 不伪装 consumed | 真实失败 | 同 claim retry |
| explicit leave write failure | 保留最后确认事实 | 失败可重试 | 关闭 |

---

# 二十一、候选命中与 Accessibility 绿灯分流

上游 Reachability Audit 已确认：

```text
原“点击无效”：
Browser Acceptance Target Error
```

正式浏览器 Gate 未来必须选择：

- 当前 typed active candidate；
- 实际可见；
- 实际可命中；
- reference 与 command 一致。

本 PREP 记录但不吞入 Authority 迁移：

- 被裁切节点是否仍可键盘聚焦；
- 屏幕阅读器是否朗读不可操作候选；
- DOM 顺序与视觉顺序是否一致；
- 横向滚动后 active candidate 是否更新；
- 同名按钮定位是否选择 hit-testable element。

刀后交通灯：

```text
GREEN：
Browser Acceptance Target Correction

YELLOW 条件：
真实用户存在幽灵入口或键盘焦点陷阱
```

该问题不得成为绕过本 PREP 的理由，也不得顺带混入未来红色迁移。

---

# 二十二、Gate 设计

未来 Migration Runtime 至少需要：

1. Recognition Fact Schema Gate；
2. Recognition Receipt Transaction Gate；
3. Candidate Revision Authority Gate；
4. Host Local Success Authority Forbidden Gate；
5. Receipt Recovery Owner Gate；
6. Receipt / Intent Identity Alignment Gate；
7. Receipt / Candidate Provenance Gate；
8. Receipt / Transfer Claim Atomicity Gate；
9. Receipt / Gravity Admission Alignment Gate；
10. Same Encounter Single Receipt Gate；
11. Same Receipt Single Transfer Gate；
12. Old Tab Stale Outcome Forbidden Gate；
13. No Backfill Gate；
14. Direct URL Receipt Bypass Forbidden Gate；
15. Motion / Reduced Motion Semantic Parity Gate；
16. Page / Route / Renderer Storage Read Forbidden Gate；
17. V1 Recovery Isolation Gate；
18. Forward SAFE_WITHHELD Gate。

精确源码字符串不得代替产品不变量。

---

# 二十三、Forward SAFE_WITHHELD 回滚

未来 Runtime 推送前必须准备独立 forward counter-commit。

目标结果：

```text
新 Recognition Mutation：
PAUSED

已有 transactional Receipt：
READ-ONLY / PRESERVED

已有 Gravity Admission：
RECOVERABLE

新 Gravity Transfer：
WITHHELD

旧 Host local success：
NOT RESTORED

旧 sessionStorage direct writer：
NOT RESTORED AS AUTHORITY

Choice Presentation：
继续 SAFE_WITHHELD
```

禁止普通 revert 导致：

```text
Receipt Authority 消失
↓
RealityProductionHost 再次直接 setState(SEED_RECOGNIZED)
↓
Gravity Readiness 重新由组件布尔值决定
```

触发条件：

- 同 encounter 出现两个 current Receipt；
- 同 Receipt 出现第二 Transfer claim；
- Receipt 与 Gravity Admission 无法一致恢复；
- old tab 覆盖新 revision；
- identity / provenance 串写；
- transaction complete 前显示成功；
- IDB 不可用时回落无锁写入；
- 旧 Host success path 仍有生产消费者；
- Remote clean snapshot 无法复验。

---

# 二十四、Migration Audit 范围

下一刀必须精确还原：

```text
当前 Host recognition write
↓
当前 Reality Intent sessionStorage
↓
当前 Gravity Cutover sessionStorage
↓
当前 Gravity Admission module state
↓
Route Ticket
↓
/dynamics Recovery
```

并冻结：

1. canonical transaction store；
2. object stores / indexes / schema version；
3. encounter key 与 fencing revision；
4. Receipt deterministic identity；
5. Transfer claim identity；
6. Gravity Admission reference 生成时点；
7. transaction complete 成功点；
8. Reality source supersession 时点；
9. old sessionStorage Reader / Writer 处置；
10. V1 数据 isolation；
11. new / old consumer atomic cutover；
12. one-commit file boundary；
13. forward rollback；
14. multi-tab browser matrix。

审计必须比较：

- 仅迁移 Recognition；
- Recognition + Transfer claim；
- Recognition + Cutover + Gravity Admission unified envelope；
- single-tab mutation + cross-tab read-only；
- 全面 SAFE_WITHHELD。

最终不得默认选择最大重构。

必须选择满足不变量的最小原子范围。

---

# 二十五、未来原子提交候选文件边界

该清单是 Audit 输入，不是 Runtime 授权。

## 新增候选

```text
src/types/xinmaiRealityPressureRecognition.ts
src/services/xinmaiRealityPressureRecognitionController.ts
src/services/xinmaiRealityAdventureContinuityTransactionalRecoveryAdapter.ts
```

## 必须审计的切换文件

```text
src/components/RealityProductionHost.tsx
src/components/RealityPressureSeedPresentation.tsx
src/pages/RealityProductionRouteEntry.tsx
src/services/realityProductionPressureSeedConsumer.ts
src/services/realityPressureSeedCaptureAdapter.ts
src/services/realityPressureSeedCandidateSource.ts
src/services/realityPressureSeedContinuationContext.ts
src/services/xinmaiRealityEncounterIntentController.ts
src/services/xinmaiRealityEncounterIntentRecoveryAdapter.ts
src/services/realityToGravityCutoverTransaction.ts
src/services/xinmaiGravityEntryAdmissionController.ts
src/services/xinmaiGravityEntryRecoveryAdapter.ts
src/types/realityPressureSeedCaptureContract.ts
src/types/realityProductionPressureSeedConsumer.ts
src/types/xinmaiGravityEntryAdmission.ts
src/types/realityProductionRouteEntry.ts
src/types/index.ts
package.json
```

## Gate 候选

```text
scripts/check-xinmai-reality-pressure-recognition-authority.mjs
scripts/check-xinmai-reality-pressure-recognition-recovery.mjs
scripts/check-xinmai-reality-pressure-recognition-transfer-atomicity.mjs
scripts/check-xinmai-reality-pressure-recognition-browser-contract.mjs
scripts/check-xinmai-reality-pressure-recognition-legacy-authority-forbidden.mjs
```

Audit 必须缩减并冻结最终文件集合。

不得把该候选清单直接当成施工授权。

---

# 二十六、真实浏览器验收矩阵

未来 Runtime 关闭前必须使用正式生产路径验证：

## Motion

- 当前 active candidate；
- Receipt commit；
- UI 在 transaction complete 后显示 recognized；
- Refresh 恢复；
- Body Approach；
- Transfer；
- `/dynamics`；
- Back / Forward。

## 原生 Reduced Motion

- 同 Candidate reference；
- 同 Receipt schema；
- 同 revision；
- 同 Recovery Owner；
- 同 Transfer；
- 同 `/dynamics`；
- 只改变视觉 Outcome。

## Candidate

- current candidate；
- offscreen candidate 不可误提交；
- list reorder；
- bundle replacement；
- candidate revision stale；
- next bundle；
- pause；
- explicit leave。

## Recovery

- Refresh；
- Back / Forward；
- Host remount；
- browser reload；
- storage blocked；
- transaction abort；
- corruption；
- TTL expired；
- Direct URL。

## 多标签

- 同 Candidate 同时 recognition；
- 不同 Candidate 同时 recognition；
- old outcome late；
- one tab claims Transfer；
- second tab retries；
- crash after claim；
- one Admission only；
- source Reality superseded once。

## 负向系统

必须证明没有：

- Pressure 自动选择；
- DOM Authority；
- Renderer Authority；
- AI Recognition；
- Choice；
- Crystal；
- Six Dimension；
- Phase 4；
- Visual Runtime 扩张。

---

# 二十七、刀型判定

黄色 Major Blade 条件：

```text
Host local state 可直接降级
无历史 Receipt 数据
旧 local success 可同提交删除
```

这些条件成立。

但红色条件也成立：

```text
Recognition Receipt 必须跨标签
Transfer 与 Admission 当前在独立 sessionStorage 域
Receipt consumption 与 Gravity success 没有共同原子提交点
需要迁移持久化责任
需要原子切换多个 success consumers
回滚不能复活 Host local success
```

红色条件优先。

最终：

```text
NOW — MIGRATION AUDIT READY
```

---

# 二十八、下一刀

```text
XINMAI-REALITY-PRESSURE-SEED-RECOGNITION-
TRANSFER-ADMISSION-ATOMIC-CONTINUITY-
MIGRATION-AUDIT-P0

交通灯：
RED

刀型：
Migration Audit

决策：
NOW — AUDIT ONLY

Runtime / Storage / Gate / Renderer：
DEFER
```

下一刀唯一目标：

> 冻结 Recognition Receipt、Transfer claim、Gravity Cutover 与 Gravity Admission 的最小共同事务域，证明可以在不产生双 Authority、不回填历史 Recognition、不丢失既有 V1 Reality / Gravity Recovery 的前提下完成原子迁移。

---

# 二十九、刀后状态

```text
b531048 Reachability Audit：
PUSHED / REMOTE VERIFIED

正式 Motion Reality → Gravity：
PASS

Pressure Recognition Runtime：
EXISTS / HOST-LIFECYCLE ONLY

Pressure Recognition Continuity：
OPEN

Recognition Fact / Receipt Product Semantic：
FROZEN

Recognition Receipt Runtime：
NOT ESTABLISHED

Migration Readiness：
READY FOR AUDIT

Choice Presentation：
SAFE_WITHHELD

Visual Runtime：
DEFER

Reality Adventure：
ACTIVE / REACHABILITY PASS / CONTINUITY OPEN

Phase 3：
ACTIVE / NOT PASSED

Phase 4：
LOCKED
```

本 PREP 没有修改 Runtime、Storage、Gate 或 Renderer。
