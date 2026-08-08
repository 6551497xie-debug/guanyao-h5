# XINMAI Phase 3｜Genesis Birth Source Reference Refresh Recovery Causal MAP P0

```text
Task:
XINMAI-PHASE-3-GENESIS-BIRTH-SOURCE-REFERENCE-
REFRESH-RECOVERY-CAUSAL-MAP-P0

Traffic Light:
YELLOW

Knife:
MAP / Read-only Runtime Causal Review

Decision:
RED MIGRATION AUDIT REQUIRED

Remote / Parent:
bb633cd85760bf883ab1072c51e5b5a27501c397

Rejected V2 Candidate:
0ccdcfbb9d08b5777ceeaef827e6ffdce3f27917

Forward Counter:
dbd65d7e6eac6aef67ea4ad4c08f30a2da53a510

Runtime / Gate / Storage / Schema / Authority / Renderer / CSS / Copy / Asset:
0 changes

Push:
HOLD
```

## 0. 裁决摘要

真机证据已经证明：用户明确确认的出生来源 `SOURCE_A` 在 Reduced Motion 的 `/genesis` 中成立；恢复系统 Motion 并刷新同一路由后，页面仍得到可信 Motion Presenter，却将公开来源引用替换为 `SOURCE_B`。

最早可由代码与证据共同证明的断点是：

```text
GENESIS_ROUTE_RECOVERY_OWNER_MISSING
```

`GenesisProductionRouteEntry` 在路由准入前只读取模块内存中的 `RealUserGenesisVisualSourceContext`。它虽然声明 `sourceNotReadyRecoveryRequired=true`，却没有消费任何 typed Recovery result。刷新后的恢复由其他页面或适配器偶发触发，而非由 App/Route 边界中的唯一 Owner 完成。

同时存在一个放大风险：同一 `LaunchLifeSourceSession` 被保存在主 session 与 `OriginMotherContext.lifeSourceSession` 两处，读取端以 `sessionValue ?? originLifeSourceSession` 静默选取，没有检测“两者同时存在但 reference 不一致”。Admission 只在写入第一份记录后立即读回，随后又单独写第二份记录；这不能证明刷新恢复时仍读取同一来源。

因此主分类为：

```text
RED — consumer cutover / recovery migration incomplete
```

不是 Renderer、Motion、Reduced Motion 或 Continuous Scene Host 缺陷；也没有证据表明来源引擎在刷新时重新计算。V2 Candidate 保持 `REJECTED / EVIDENCE ONLY`，不得追加小修后交付。

## 1. 冻结证据与隐私边界

### 1.1 Evidence source

- 真机 Gate 报告：`v2-genesis-birth-coordinate-push-gate-20260808/V2_GENESIS_BIRTH_COORDINATE_PRODUCTION_EVIDENCE_GATE_P0.md`
- Reduced Motion accepted frame：`05-reduced-motion-native-editing.png`
- Motion refresh mismatch frame：`06-motion-refresh-source-mismatch.png`
- Production bundle：hashed JS/CSS；Vite、Fixture、Acceptance 均为 0。
- 设备动画设置已恢复；Preview、ADB forward/reverse 已清理。

### 1.2 Privacy

本 MAP 仅使用 `SOURCE_A` / `SOURCE_B`，不记录出生日期、时辰或原始 source reference。`SOURCE_A !== SOURCE_B` 是唯一需要的事实。

## 2. 真实时间线

| 顺序 | 可见/typed 事实 | Authority 或 Owner | 结论 |
|---:|---|---|---|
| 1 | 干净 Origin 为 `LIFE_WORLD_BASELINE` | Launch presentation | 尚无已确认出生来源。 |
| 2 | 用户用原生控件编辑并明确确认 | V2 input session + Admission Controller | 用户 intent 明确。 |
| 3 | Admission 形成 source session、visual source 与 in-memory context | 既有 engine/session/context services | `SOURCE_A` 成立。 |
| 4 | Admission 将 source session 写入主 session 并立即读回 | `persistLaunchLifeSourceSession` | 只证明此刻主读取结果为 `SOURCE_A`。 |
| 5 | Admission 单独写 Mother Code / Origin Mother / Persona | 三个既有 persistence adapters | 不构成跨 key 原子提交。 |
| 6 | `/genesis` Reduced Motion 呈现 | Route authorization + Static Presenter | public source=`SOURCE_A`；Static success PASS。 |
| 7 | 系统 Motion 恢复并刷新 | 浏览器 route recovery | JS/route consumer 重新建立。 |
| 8 | `/genesis` Motion 呈现 | Route authorization + Motion Presenter | Presenter PASS，但 public source=`SOURCE_B`。 |

第 6 步已证明 A 在正式 route 中成立；第 8 步证明错误发生在刷新后的 source recovery / route admission 之前。Presenter 只消费已经获得的 reference，不能制造 B。

## 3. Typed chain 清点

```text
confirmed native draft
  → XinmaiGenesisBirthCoordinateAdmissionController
  → LaunchLifeSourceSession(SOURCE_A)
  → RealUserGenesisVisualSourceContext(SOURCE_A, volatile)
  → primary session persistence(SOURCE_A)
  → OriginMotherContext mirror(SOURCE_A, separate write)
  → launch→genesis handoff(SOURCE_A)

refresh
  → GenesisProductionRouteEntry
  → readRealUserGenesisVisualSourceContext() only
  → authorizeGenesisProductionRoute(current in-memory reference)
  → GenesisProductionExperiencePage
  → Continuous Scene presenter
```

缺失的正式节点是：

```text
refresh/direct route
  → ONE typed Genesis source recovery owner
  → compare all persisted representations
  → exact recovered context or SAFE_WITHHELD
  → route admission
```

## 4. Producer / consumer / persistence matrix

| 节点 | Producer | Input | Output | Refresh 责任 | 结果 |
|---|---|---|---|---|---|
| Birth draft | V2 presentation reducer | native form values | immutable confirming session | 不持久 provisional draft | PASS |
| Confirm intent | Admission Controller | confirming session | `ACCEPTED` / `SAFE_WITHHELD` | 只负责首次接受 | PASS |
| Source engine | existing Origin/Mother services | confirmed draft | deterministic source facts | 不应在恢复时重算 | PASS / no refresh caller found |
| Source session | `createLaunchLifeSourceSession` | source facts | validated session | 可用 persisted exact facts重建 | PASS |
| In-memory context | `activateRealUserGenesisVisualSourceContext` | validated session + visual source | active module context | 刷新丢失；不同 reference 可直接替换 | MISSING fencing |
| Primary persistence | `guanyao_h5_session.launchLifeSourceSession` | source session | stored session | 第一读取候选 | FOUND |
| Mirror persistence | `guanyao:originMotherContext.lifeSourceSession` | source session | second stored copy | primary 缺失时 fallback | FOUND / conflict not checked |
| Persistence read | `readPersistedLaunchLifeSourceSession` | both copies | first non-null valid record | 应拒绝 mismatch | DEFECT: silent precedence |
| Recovery adapter | `restorePersistedRealUserGenesisVisualSourceContext` | persisted session | normalized active context | 有能力，但无 route Owner | FOUND / unowned |
| Launch returning | `LaunchLab` lazy initializer | recognized identity | restored context | 只在 Launch route偶发调用 | PAGE-LOCAL consumer |
| Reality recovery | recognized identity adapter | persisted assets | recognized identity | Reality专属 | ROUTE-SPECIFIC consumer |
| Genesis route entry | `GenesisProductionRouteEntry` | active context only | route authorization | 应先恢复 exact source | MISSING |
| Genesis renderer/scene | Genesis page + V1 Host | authorized reference | Motion/Static outcome | 不拥有 recovery | PASS / not causal |

`UNKNOWN=0`：源码中只有 Admission 与 `restorePersistedRealUserGenesisVisualSourceContext` 能激活 Genesis visual context；正式 Route Entry 本身没有调用 recovery。现有证据未记录到底是 primary copy 还是 Origin mirror 提供了 `SOURCE_B`，所以该具体存储来源必须保持 `NOT_OBSERVABLE`，不得用时间或默认值猜测。

## 5. 四类因果分类

### 5.1 页面消费者漂移

`CONFIRMED — secondary manifestation`

Genesis Route 只读 volatile context；Launch returning 和 Reality recovery 各自决定何时调用 recovery。这使恢复成为页面局部副作用，而非应用级 typed prerequisite。

### 5.2 Session / Recovery Owner 缺失

`CONFIRMED — earliest breakpoint`

- Route boundary明确写了 `sourceNotReadyRecoveryRequired`。
- 实现只调用 `readRealUserGenesisVisualSourceContext()`。
- Route 不读取 persisted source，也不消费 typed recovery union。
- AppShell 没有在 route authorization 前建立 exact recovery。

这是 A 可以在刷新边界失去约束的第一个点。

### 5.3 来源引擎重算

`NOT ESTABLISHED / NOT THE FIRST BREAKPOINT`

Route、Context read 与 Continuous Scene Presenter 都没有 engine invocation。刷新链中没有合法 engine recompute Owner。不得以 `SOURCE_B` 看似默认来源为由推断 engine 重算。

### 5.4 持久化协议缺口

`CONFIRMED — co-causal structural gap`

- source session 同时存在于两个 localStorage key。
- 两次写入不原子。
- read 使用 silent precedence，不比较两份 reference。
- Admission 的 readback 发生在 mirror write 之前。
- 写 adapters 吞掉 storage error，Controller 无法证明两份表达一致。

这不能单独证明 B 来自哪一 key，但足以证明当前 recovery contract 不能安全选择 canonical source。

## 6. 为什么现有门禁未捕获

现有 V2 gate 证明：

- Admission 调用了既有 services；
- Controller不直接读 raw Storage；
- 写后立即 `readPersistedLaunchLifeSourceSession()` 与 candidate reference一致；
- native controls为唯一确认入口。

它没有证明：

- 新 JS context/cold refresh 后 Route 会先恢复；
- primary 与 mirror 同时存在时 reference 必须一致；
- direct `/genesis` 不接受漂移 context；
- active context 不能被不同 source 无 fencing 替换；
- refresh/back-forward 恢复 exact accepted request；
- mismatch 会 typed SAFE_WITHHELD。

因此 Gate PASS 不能替代真机 recovery evidence。

## 7. Candidate / baseline 归因

```text
Recovery architecture gap:
INHERITED FROM BASELINE

V2 delivery failure:
CANDIDATE-RELEVANT

Candidate unique engine/renderer defect:
NO
```

V2 Candidate 新增了正式 native admission path，并依赖旧 audit 中“existing persisted session/context recovery”的假设；它没有改变 Route Entry 或 `sessionService`。因此不能把缺陷归罪于 V2 Renderer，但也不能推送一个未满足 refresh invariant 的 V2 交付。

## 8. 修复不得做什么

- 不用 DOM、`data-*`、URL query、timer、RAF 或 Scene outcome选择source。
- 不在 refresh 时重跑出生 engine来“得到同一个结果”。
- 不以 primary 优先或 mirror 优先掩盖 mismatch。
- 不清除 B 或批量改写历史资产以过 Gate。
- 不放宽 route source matching。
- 不把 `SOURCE_NOT_READY` 自动解释为新用户并提交默认出生值。
- 不新增第二 Storage reader、页面级 writer或新的 Identity Authority。
- 不修改 C1/C2、Continuous Scene presenter、Growth、Crystal、Body Imprint或Phase 4。

## 9. 最小迁移边界

这不是 GREEN 单文件修正。安全关闭需要同一提交完成：

1. 建立唯一 `XinmaiGenesisBirthSourceRecoveryController`（名称可机械等价），只消费既有 typed persistence adapters。
2. 定义 typed outcome：`RECOVERED_EXACT_SOURCE`、`SOURCE_NOT_READY`、`SOURCE_REFERENCE_CONFLICT`、`PERSISTENCE_UNAVAILABLE`、`SAFE_WITHHELD`。
3. 让 Genesis Route Entry 在 authorization 前消费 recovery outcome；页面不读 raw Storage。
4. 将 primary + Origin mirror 读取改为 typed reconciliation：两者都有且不同必须 withheld；不得 silent precedence。
5. Admission 成功 proof 必须覆盖将被恢复 Owner读取的完整 persisted representation，而非只覆盖第一次即时 readback。
6. 对 active context 增加 expected reference / revision fencing；不同 source不能无条件替换。
7. Launch returning、Reality recovery、Genesis route 改为消费同一 Recovery Owner；删除页面各自决定恢复的成功路径。
8. 原子新增 Gate：cold refresh、direct route、mismatch、partial write、stale tab、back-forward、Motion/Reduced parity。

这会触及多个消费者与既有 persistence reconciliation语义，必须先进行 RED Migration Audit；不得在 rejected Candidate 上追加绿色 child 后交付。

## 10. Rejected Candidate 与重组纪律

唯一建议：

```text
0ccdcfbb… = REJECTED / EVIDENCE ONLY
dbd65d7e… = OLD COUNTER / EVIDENCE ONLY

未来 Runtime Candidate：
latest remote
+ 原 V2 atomic patch
+ source recovery corrective migration
= one atomic delivery commit
```

理由：V2 admission 与 recovery invariant 是同一用户动作的单一交付因果。先推 V2 再补 recovery 会把不可刷新 source 暂时放进远程。不得 cherry-pick rejected Candidate为祖先、普通 merge或复用旧 Counter。

未来 Forward Counter 必须是新 Candidate直接子提交，只把新 birth admission / recovery presentation切为 SAFE_WITHHELD，同时保留已确认 Identity、C1/C2、Crystal、Body Imprint与可读恢复；不得恢复默认 source、Canvas birth submit或 silent precedence。

## 11. Migration Audit 必须冻结的问题

1. primary session 与 Origin mirror 哪一个是 canonical persisted source；另一个是 proof mirror还是历史兼容资产。
2. 是否可以在不改 schema/DB 的情况下，用现有 key做 deterministic typed reconciliation。
3. Admission 两次 localStorage write 的合法半写顺序、失败补偿和 success proof。
4. unique Recovery Owner 的调用位置：AppShell route precondition还是 Genesis route adapter；只能选择一个。
5. active in-memory context 的 replacement / fencing契约。
6. Launch、Genesis、Reality、Returning、Direct URL 的原子 consumer cutover。
7. V1/no-new-fields、old origin-only、primary-only、both-match、both-mismatch恢复矩阵。
8. 新 Candidate / Counter / rollback单元及真机证据矩阵。

## 12. 复验矩阵

| Case | Required result |
|---|---|
| confirm → immediate handoff | exact accepted source；一次navigation。 |
| cold refresh `/genesis` | exact same source or typed withheld；不得换源。 |
| Motion ↔ Reduced Motion | source invariant；只有Presenter变化。 |
| primary + mirror match | recovered exact source。 |
| primary only / origin only | 按audit冻结的兼容规则恢复或withhold，不猜。 |
| primary + mirror mismatch | `SOURCE_REFERENCE_CONFLICT` / SAFE_WITHHELD。 |
| write 1 succeeds, write 2 fails | 不宣称 durable accepted；资产不删。 |
| stale tab different source | fencing拒绝替换 current accepted source。 |
| direct `/genesis` no source | SOURCE_NOT_READY；不形成默认source。 |
| Back/Forward | same reference；不重放确认。 |
| invalid/corrupt record | SAFE_WITHHELD；不重算engine。 |
| Motion renderer failure | Static可接管，但source不变。 |
| Counter | 新mutation withheld；已有资产可读。 |

## 13. 阶段状态

```text
V2 Candidate 0ccdcfbb…:
REJECTED / EVIDENCE ONLY

V2 Runtime Delivery:
OPEN

V1:
CLOSED / PASS

C1 / C2:
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

## 14. 最终出口

```text
RED MIGRATION AUDIT REQUIRED
```

下一刀固定为：

```text
XINMAI-PHASE-3-GENESIS-BIRTH-SOURCE-REFERENCE-
REFRESH-RECOVERY-SINGLE-OWNER-ATOMIC-MIGRATION-AUDIT-P0
```

本 MAP 未授权 Runtime。

## 15. 文档验证

- 本提交只新增本 MAP 文档。
- Runtime / Gate / Storage / Schema / Authority / Renderer / CSS / Copy / Asset差异：`0`。
- `git diff --check`：必须 PASS。
- TypeScript / Production Build：`N/A — doc-only`。
- Push：`HOLD`。
