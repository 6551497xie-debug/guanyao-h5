# XINMAI Phase 3｜Genesis Birth Source Reference Refresh Recovery Single-Owner Atomic Migration Audit P0

```text
Task:
XINMAI-PHASE-3-GENESIS-BIRTH-SOURCE-REFERENCE-
REFRESH-RECOVERY-SINGLE-OWNER-ATOMIC-
MIGRATION-AUDIT-P0

Traffic Light:
RED

Knife:
Migration Audit / Recovery Owner + Persistence Reconciliation Cutover

Decision:
NOW — CORRECTIVE ATOMIC MIGRATION APPLICATION READY

Parent MAP:
2fc8a7e7026d3b6789a46bc58193699e81d393cf

Remote Runtime Baseline:
bb633cd85760bf883ab1072c51e5b5a27501c397

Rejected V2 Candidate:
0ccdcfbb9d08b5777ceeaef827e6ffdce3f27917

Rejected V2 Counter:
dbd65d7e6eac6aef67ea4ad4c08f30a2da53a510

Runtime / Gate / Storage / Schema / Authority / Renderer / CSS / Copy / Asset:
0 changes

Push:
HOLD
```

## 0. 唯一架构裁决

V2 必须从未来最新远程重新组成一个原子 Runtime Candidate：

```text
原 V2 native birth input + Admission cutover
+ 唯一 XinmaiGenesisBirthSourceRecoveryController
+ primary/mirror typed reconciliation
+ active context reference fencing
+ Genesis / Launch / Reality production consumers atomic cutover
+ refresh/direct URL/stale tab gates
```

`0ccdcfbb…` 不得成为新候选祖先，也不得追加 correction 后推送。它和 `dbd65d7e…` 只保留为失败候选与安全策略证据。

唯一 Recovery Owner 冻结为：

```text
XinmaiGenesisBirthSourceRecoveryController
```

它是现有 source session、Origin Mother mirror 与 in-memory visual context 之间的 typed reconciliation Owner，不是 Identity、Mother Code、Starbeast 或 Storage Authority。所有正式页面与 route adapter只能消费它的 union result；不能直接决定恢复、fallback或 context replacement。

## 1. 产品语义冻结

1. 用户明确确认后得到的出生来源在该正式生命中是稳定引用。
2. Motion、Reduced Motion、Refresh、Back/Forward、Direct URL只改变 Presentation/Recovery方式，不得改变来源。
3. 刷新不重新询问、重算或默认替换已经接受的出生来源。
4. 不存在可信持久 proof时，产品进入 `SOURCE_NOT_READY` 或 `SAFE_WITHHELD`，不得自动提交默认值。
5. 两份持久表示冲突时，系统不知道哪一份代表当前用户确认；必须扣留，而不是按读取顺序选择。
6. 只有新的明确确认 intent 才能建立新 source candidate；同一 active life 中不同 source的替换仍需未来独立产品协议，本刀不授权。

## 2. 当前恢复路径与双Owner风险

### 2.1 当前生产调用

| Consumer | 当前调用 | 是否激活 context | 风险 |
|---|---|---:|---|
| `GenesisProductionRouteEntry` | `readRealUserGenesisVisualSourceContext` | 否 | 刷新后没有 recovery。 |
| `LaunchLab` returning initializer | `hasPersistedRecognizedLifeIdentity` + `restorePersisted...` | 是 | 页面决定恢复。 |
| `readPersistedGenesisVisualContinuity` | missing stored continuity时调用 `resolvePersisted...` | 间接是 | 读函数隐藏 mutation。 |
| `PersonalityRingPage` | `readPersistedGenesisVisualContinuity` | 间接可能 | 非Genesis页面可成为 first activator。 |
| `realityRecognizedIdentityRecoveryAdapter` | `restorePersisted...` | 是 | Reality adapter决定恢复。 |
| V2 Admission | direct `activate...` | 是 | 首次确认需要，但无既有source fencing。 |

页面不是 Storage Writer，但“谁先调用 restore/derived read，谁先激活全局 context”形成了恢复Owner漂移。`readPersistedGenesisVisualContinuity` 的名称是 read-only，却可能通过 `resolvePersistedGenesisVisualContinuity → restorePersisted... → activate...`产生 module mutation；该隐式路径必须退出生产。

### 2.2 当前 persistence 表达

| Representation | Key / field | Writer | 当前读取地位 |
|---|---|---|---|
| Primary source session | `guanyao_h5_session.launchLifeSourceSession` | `persistLaunchLifeSourceSession` | `sessionValue`，优先。 |
| Origin mirror | `guanyao:originMotherContext.lifeSourceSession` | `writeOriginMotherContext` | primary null时fallback。 |
| Active visual context | module memory | `activateRealUserGenesisVisualSourceContext` | Route实际准入输入。 |

Primary 与 mirror 不在同一原子事务。读取端没有同时验证，也没有 conflict outcome。

## 3. Canonical persistence 裁决

### 3.1 唯一 canonical record

冻结：

```text
guanyao_h5_session.launchLifeSourceSession
= canonical persisted LaunchLifeSourceSession
```

理由：

- 它由正式 `persistLaunchLifeSourceSession` 写入；
- V2 Admission 已以该 public writer为 durable readback边界；
- `OriginMotherContext` 同时承载其他 Mother handoff facts，内部 `lifeSourceSession` 是 lineage mirror，不应成为第二 canonical source；
- 不需要新增 DB、Object Store、Index、key或schema version。

`OriginMotherContext.lifeSourceSession` 冻结为：

```text
corroborating lineage mirror / legacy compatibility evidence
```

它不能在 primary存在时覆盖 primary，也不能在 mismatch时被忽略。

### 3.2 Typed representation read

在现有 `sessionService` persistence adapter边界内增加一个只读 typed result，机械等价名称允许：

```text
NOT_FOUND
PRIMARY_ONLY
ORIGIN_MIRROR_ONLY
MATCHED
CONFLICT
INVALID_PRIMARY
INVALID_ORIGIN_MIRROR
```

结果必须携带 validated references或null，不暴露 raw user input给页面。

冻结恢复矩阵：

| Persisted state | Genesis refresh | Recognized returning life | Mutation |
|---|---|---|---:|
| none | `SOURCE_NOT_READY` | `SOURCE_NOT_READY` | 0 |
| valid primary only | `RECOVERED_EXACT_SOURCE` | same | 0 |
| valid primary + matching mirror | `RECOVERED_EXACT_SOURCE` | same | 0 |
| mirror only | `SAFE_WITHHELD: PRIMARY_SOURCE_MISSING` | 只有 existing recognized identity/continuity/presence全部同ref时可 `RECOVERED_LEGACY_SOURCE` | 0 / NO BACKFILL |
| primary + different mirror | `SAFE_WITHHELD: PERSISTED_SOURCE_CONFLICT` | same | 0 |
| invalid primary | `SAFE_WITHHELD: PRIMARY_SOURCE_INVALID` | same | 0 |
| invalid mirror + valid primary | `SAFE_WITHHELD: ORIGIN_MIRROR_INVALID` | same | 0 |

对新 V2 `/genesis`，mirror-only不能证明当前 explicit Admission已经完整持久化；不得借历史fallback进入正式Genesis。

### 3.3 No backfill

- Recovery是只读，不能自动“修好”mirror或primary。
- 不批量扫描、不覆盖、不删除历史。
- legacy origin-only 只在已有 recognized proof完全匹配时恢复；不补写 primary。
- mismatch 保持全部资产原样并返回 typed withheld。

## 4. 唯一 Recovery Controller

### 4.1 输入

```text
intent:
  AUTHORIZE_GENESIS_ROUTE
  RESTORE_RETURNING_LIFE
  RESTORE_RECOGNIZED_REALITY

expectedSourceReferenceId?: string | null
recognizedProof?: existing typed identity/continuity/presence references
```

不得输入：

- DOM、`data-*`、CSS class；
- URL source query；
- timer、RAF、animation state；
- Scene/Renderer success；
- provisional draft；
- raw Storage value；
-默认出生值。

### 4.2 输出 union

```text
READY
  outcome:
    ALREADY_ACTIVE
    RECOVERED_EXACT_SOURCE
    RECOVERED_LEGACY_SOURCE
  sourceReferenceId
  context
  proof:
    PRIMARY
    PRIMARY_AND_ORIGIN_MATCHED
    LEGACY_RECOGNIZED_MATCH

SOURCE_NOT_READY
  reason:
    PERSISTED_SOURCE_NOT_FOUND
    PRIMARY_SOURCE_REQUIRED

SAFE_WITHHELD
  reason:
    ACTIVE_SOURCE_REFERENCE_CONFLICT
    PERSISTED_SOURCE_CONFLICT
    PRIMARY_SOURCE_INVALID
    ORIGIN_MIRROR_INVALID
    RECOGNIZED_PROOF_MISMATCH
    VISUAL_SOURCE_RECOVERY_BLOCKED
    STALE_EXPECTED_REFERENCE
```

页面只消费 `READY` 的 exact context或克制的 withheld presentation。技术 reason不得直接显示。

### 4.3 执行顺序

```text
read typed persisted representations once
→ validate primary/mirror matrix
→ select only audit-authorized canonical candidate
→ validate optional expected reference / recognized proof
→ rebuild LaunchLifeSourceSession from persisted exact facts
→ resolve existing visual source
→ activate context through fenced mutation primitive
→ return frozen typed recovery proof
```

Recovery不得调用来源engine重新解释原始出生输入；它只用已存的完整 typed source session重建视觉适配输入。

## 5. Active context fencing

当前 `activateRealUserGenesisVisualSourceContext` 对不同 reference直接替换 `activeContext`。迁移后唯一内部 mutation primitive必须执行：

```text
active = null
  → INITIALIZED(reference)

active.reference = request.reference
  → ALREADY_ACTIVE(same frozen context)

active.reference != request.reference
  → SAFE_WITHHELD(ACTIVE_SOURCE_REFERENCE_CONFLICT)
```

只有现有正式 `clear`/new-life reset协议可以先清空context；刷新、Motion切换、route mount、stale tab或另一个read consumer不能替换。

`revision/fencing` 只保护当前激活请求与 expected reference，不创造新的 Identity revision或Storage Authority。

## 6. Admission durable proof / half-write protocol

### 6.1 新 V2 Admission顺序

```text
validate frozen confirming input
→ derive deterministic sourceReferenceId
→ resolve existing engine facts
→ create validated LaunchLifeSourceSession
→ resolve visual source candidate (pure)
→ write canonical primary through existing writer
→ write Origin Mother context + matching mirror through existing writer
→ fresh typed representation read
→ require PRIMARY_AND_ORIGIN_MATCHED(exact reference)
→ activate through fenced context primitive
→ resolve exact Genesis handoff
→ ACCEPTED
```

成功只在两个现有持久表达 fresh read后完全一致时成立。这里不宣称localStorage跨key原子性；而是使用 deterministic source id + typed read-after-write + retry。

### 6.2 Half-write

| Failure point | Durable state | Product result | Retry |
|---|---|---|---|
| primary write未成立 | none/old primary | SAFE_WITHHELD | 重试同一confirm intent。 |
| primary成立、mirror失败 | primary new + mirror missing/old | SAFE_WITHHELD / conflict | 只重试同一deterministic write sequence。 |
| mirror成立、primary不可见 | mirror new + primary old/missing | SAFE_WITHHELD | 同上；不得以mirror宣称新Genesis ready。 |
| both成立、readback mismatch | both preserved | SAFE_WITHHELD | 不覆盖赢家/不清理；等待明确重试。 |
| persistence成立、activation conflict | durable source preserved | SAFE_WITHHELD stale/active conflict | 不自动替换active context。 |
| activation成立、handoff失败 | exact context + assets preserved | SAFE_WITHHELD retryable | 重试handoff，不新建source。 |

同一 deterministic source确认重试可以收敛；不同 draft/reference的 stale tab请求不得合并。

## 7. Consumer atomic cutover

同一 Runtime提交必须切换：

1. `XinmaiGenesisBirthCoordinateAdmissionController`
   - 使用完整 durable proof；不直接做无fence activation。
2. `GenesisProductionRouteEntry`
   - 在 route authorization前消费 `AUTHORIZE_GENESIS_ROUTE` recovery union。
3. `LaunchLab`
   - returning initializer消费 `RESTORE_RETURNING_LIFE`；删除直接 `restorePersisted...`。
4. `realityRecognizedIdentityRecoveryAdapter`
   - 消费 `RESTORE_RECOGNIZED_REALITY`；保持唯一 typed reader边界。
5. `readPersistedGenesisVisualContinuity` / internal resolver
   - read函数不得再隐式激活context；derive与activation分离。
6. `PersonalityRingPage`及任何 continuity consumer
   - 不得通过一个“read”调用成为恢复mutation Owner。
7. `realUserGenesisVisualSourceContext`
   - 不同 reference replacement路径退出。
8. 相关 gate scripts与package registration。

禁止保留：

- Route内存直读成功路径与Recovery路径并存；
- primary/mirror silent precedence；
- direct page call `restorePersistedRealUserGenesisVisualSourceContext()`；
- continuity read隐式activation；
- active context不同reference直接覆盖；
- refresh engine recompute或default-source fallback。

## 8. Authority / Presentation / Navigation单向图

```text
explicit confirmed native input
  → existing source engines (pure)
  → validated LaunchLifeSourceSession
  → existing primary + Origin mirror writers
  → typed persisted representation proof
  → XinmaiGenesisBirthSourceRecoveryController
  → fenced in-memory visual context
  → existing Genesis route authorization
  → V1 Scene / Genesis Presentation
```

反向禁止：

```text
Scene outcome / Motion mode / DOM / route presence
  -X→ source selection
  -X→ persistence
  -X→ engine invocation
  -X→ Identity write
```

C1/C2、Growth、Crystal、Canonical Body Imprint、Continuous Scene outcomes均不变。

## 9. Recovery / concurrency matrix

| Case | Required outcome |
|---|---|
| immediate confirm/handoff | exact SOURCE_A, matched persistence proof, one handoff。 |
| cold refresh `/genesis` | `RECOVERED_EXACT_SOURCE(A)`；不重算。 |
| Motion→Reduced→Motion refresh | all references A；Presenter only changes。 |
| direct `/genesis`, no records | SOURCE_NOT_READY。 |
| direct `/genesis`, mirror only | PRIMARY_SOURCE_REQUIRED。 |
| recognized legacy mirror only | matching recognized proof才可 legacy recovery；NO BACKFILL。 |
| primary/mirror mismatch | SAFE_WITHHELD；两份保留。 |
| active A + request B | ACTIVE_SOURCE_REFERENCE_CONFLICT。 |
| active A + request A | ALREADY_ACTIVE。 |
| two tabs same confirmation | deterministic same source；writes converge；one logical context。 |
| two tabs different confirmation | one current accepted source；other withheld；不覆盖。 |
| primary write success / mirror fail | no ACCEPTED；same request可重试。 |
| mirror success / primary fail | no ACCEPTED；mirror不成为new Genesis authority。 |
| invalid/corrupt record | SAFE_WITHHELD；no delete/backfill。 |
| refresh/back-forward | exact same reference；不重播确认。 |
| Scene/WebGL failure | Static可接管；source outcome不变。 |
| browser storage unavailable | SAFE_WITHHELD；in-memory不能宣称durable handoff。 |

## 10. Schema / Storage / Authority裁决

```text
New DB:
0

New Object Store / Index:
0

Physical schema version change:
0

New persistent key:
0

New source writer:
0

New Identity / Mother Code / Starbeast Authority:
0

Backfill / deletion:
0
```

新增 Controller是协调与typed recovery Owner，不是持久化Authority。若实施发现必须新增 key/schema、修改 engine含义或建立第二 writer，立即 `ARCHITECTURE RE-AUDIT REQUIRED`。

## 11. 原子 Runtime文件边界

### 11.1 原 V2 patch

未来候选必须机械重组原 `0ccdcfbb…` 相对 `bb633cd…` 的已审计V2差异；不得以旧commit为祖先。

### 11.2 Corrective新增/修改

预计新增：

- `src/types/xinmaiGenesisBirthSourceRecovery.ts`
- `src/services/xinmaiGenesisBirthSourceRecoveryController.ts`
- 4–5个专项gate scripts。

预计修改：

- `src/services/sessionService.ts`
- `src/services/realUserGenesisVisualSourceContext.ts`
- `src/services/xinmaiGenesisBirthCoordinateAdmissionController.ts`
- `src/pages/GenesisProductionRouteEntry.tsx`
- `src/pages/LaunchLab.tsx`
- `src/services/realityRecognizedIdentityRecoveryAdapter.ts`
- `src/pages/PersonalityRingPage.tsx`（仅若其read仍可隐式activation）
- `package.json`（gate registration）。

允许为删除隐式side effect而机械调整 direct callers；禁止修改业务文案、Renderer、C2/Scene outcome、CSS、Navigation target或Identity facts。

若消费者无法在同一提交切换，停止：`RED — RE-AUDIT REQUIRED`。

## 12. Gates

新增并注册：

1. `check-xinmai-genesis-birth-source-recovery-single-owner`
   - production activation/recovery Owner=1；direct page restore caller=0；read side effect=0。
2. `check-xinmai-genesis-birth-source-persistence-reconciliation`
   - canonical primary、mirror match、conflict withheld、NO BACKFILL。
3. `check-xinmai-genesis-birth-source-route-recovery-cutover`
   - Genesis authorization先消费typed recovery；memory-only route success=0。
4. `check-xinmai-genesis-birth-source-active-context-fencing`
   - same ref idempotent；different ref withheld；silent replace=0。
5. `check-xinmai-genesis-birth-source-refresh-recovery`
   - cold refresh/direct URL/back-forward/Motion parity typed cases。
6. 校准现有 V2 Admission gate
   - success proof覆盖primary+mirror fresh match，而非单一即时readback。
7. 校准 Forward Counter gate
   - recovery read保持；新spatial presentation withheld；旧default/Canvas path不复活。

源码token gate只能保护边界；必须另有正式浏览器冷刷新证据。

## 13. Forward SAFE_WITHHELD Counter

新 Counter必须是新 Runtime Candidate直接子提交。仍首选只改：

```text
src/services/xinmaiGenesisBirthCoordinatePresentationPolicy.ts

ENABLED → SAFE_WITHHELD
```

Counter语义：

- 新 Birth spatial enrichment与对应Scene强调暂停；
- typed recovery继续只读运行，已接受source可恢复；
- native input与验证仍可达；
- C1/C2、Identity、Crystal、Body Imprint、Reality、Returning资产可读；
- 不恢复 default auto-confirm、Canvas birth submit、silent persistence precedence、different-reference replacement或page-local recovery Owner。

若 Counter必须修改第二个 Runtime文件才能安全，候选封装失败并停止。

## 14. Runtime Candidate / rollback纪律

```text
NewCandidate parent:
future exact Remote HEAD after approved doc delivery

NewCandidate content:
original V2 patch + this corrective migration

NewCounter parent:
NewCandidate exact SHA

Old rejected candidate/counter:
not ancestors; evidence only
```

一个原子 revert若会恢复旧 Canvas input + broken recovery的组合，不可作为线上fallback；Forward Counter是首选安全暂停。Git历史回滚只在完整回到pre-V2远程且产品控制明确授权时执行。

## 15. 验收矩阵

### 15.1 工程

- TypeScript、Production Build、全部registered XINMAI Gates。
- Baseline/Candidate/Counter gate数量；删除/漏注册/弱化=0。
- 原V2 native input / Host single-owner / accessibility gates PASS。
- new DB/store/index/key/writer/Authority=0。
- Production bundle Fixture/Acceptance/fault injection/Audio/Haptic runtime=0。
- Candidate与Counter干净快照。

### 15.2 Transaction / recovery harness

- 通过正式 public Controller建立source，不直接写成功Storage。
- same-source double confirm、different-source stale tab各3轮。
- primary/mirror partial-write、mismatch、invalid records只在持久化dependency boundary注入；harness不进Production Bundle。
- active context A不能被B替换。
- recovery无写入、无backfill、无engine call。

### 15.3 正式浏览器 / 真机

- hashed Production Bundle；同一正式Origin。
- Native Motion确认A → `/genesis` → refresh仍A。
- Native Reduced Motion确认A → refresh → Motion恢复仍A。
- Direct URL no source真实withheld。
- Refresh、Back/Forward、background/foreground。
- 320×568、360×800、390×844、430×932、200%。
- 无重复native input、Canvas hit target或default source。
- V1 Motion/Static presenter、性能和Android视觉无回归。
- 真机截图与typed public refs同时取证；不输出原始出生信息。

## 16. 直接拒绝条件

- Route仍可仅凭任意active memory context成功。
- primary/mirror mismatch仍选择其一。
- `readPersistedGenesisVisualContinuity`仍可隐式激活context。
- 不同source可无fence替换。
- refresh调用engine或采用default draft。
- Admission在完整durable proof前返回ACCEPTED。
- 新schema/key/writer/Authority。
- Counter停止资产读取或复活旧路径。
- C1/C2/V1事实、Presenter或Navigation Authority被修改。

## 17. 阶段状态

```text
Migration Audit:
CLOSED / PASS

Architecture:
FROZEN

Runtime Application:
READY FOR STRICT ATOMIC RECOMPOSITION

V2 Candidate 0ccdcfbb…:
REJECTED / EVIDENCE ONLY

V2 Runtime Delivery:
OPEN

V1 / C1 / C2:
CLOSED / PASS

V3–V5:
LOCKED

Phase 3:
ACTIVE / NOT PASSED

C3 Haptic:
PAUSED

Audio:
SAFE_WITHHELD / SILENT

Phase 4:
LOCKED
```

## 18. 最终出口

```text
NOW — CORRECTIVE ATOMIC MIGRATION APPLICATION READY
```

下一把 Runtime刀固定为：

```text
XINMAI-PHASE-3-GENESIS-BIRTH-SOURCE-REFERENCE-
REFRESH-RECOVERY-SINGLE-OWNER-CORRECTIVE-
ATOMIC-RECOMPOSITION-P0
```

本 Audit 不实施 Runtime；等待 Product Control Tower精确交付文档链并授权 Runtime基线。

## 19. 文档验证

- 本提交只新增本 Migration Audit文档。
- Runtime / Gate / Storage / Schema / Authority / Renderer / CSS / Copy / Asset差异：`0`。
- `git diff --check`：必须 PASS。
- TypeScript / Production Build：`N/A — doc-only`。
- Push：`HOLD`。
