# XINMAI Phase 3 Crystal Formation Production Consumer and Body Imprint Projection Atomic Migration Audit P0

> 任务编号：`XINMAI-PHASE-3-CRYSTAL-FORMATION-PRODUCTION-CONSUMER-AND-BODY-IMPRINT-PROJECTION-ATOMIC-MIGRATION-AUDIT-P0`
> 交通灯：RED
> 刀型：Migration Audit
> 决策：`NOW — AUDIT ONLY`
> Runtime / Renderer / Authority / Gate：只读，禁止修改
> 远程审计基线：`723dd7b02f95fe39250d4f075c173fb9c0bb41e4`
> 主 Layer：Layer 4 Growth / Phase 3 Reality Adventure
> 保护：World、Identity、Relationship、Reality provenance
> Phase 4：`LOCKED`

---

## 一、唯一目标与最终出口

冻结以下正式链的生产编排、恢复、Presentation 与 Body Imprint 消费者迁移边界：

```text
Lived Response Fact
↓
Crystal Eligibility
↓
Production Formation Consumer
↓
Formation Receipt + Crystal Asset
↓
Crystal Formation Presentation
↓
Canonical Body Imprint Read Model
↓
Typed Visual Facts
↓
Host / Renderer
```

最终裁决：

```text
Production Formation Consumer：
现有 Formation Authority 与 Growth Store 足以承载

Canonical Body Reference：
现有 Identity / StarBeast / Mansion references 足以承载

Formation 与 Body Projection：
READY — SPLIT ATOMIC MIGRATIONS

整体 Runtime Application：
NOT READY

最终出口：
RED — EXTENDED CONSUMER MIGRATION AUDIT
```

阻断整体 Application 的事实不是 Formation 事务能力，而是：

```text
PersonalityRingLite 仍被三个正式生产入口
当作 Crystal / Body Imprint 的存在、选择与排序依据：

1. Returning LaunchLab
2. RealityProductionRouteEntry
3. Active 1.0 /archive PersonalityRingPage
```

因此 Formation Blade 可以独立准备，但 Body Imprint Cutover 必须先扩展清点并冻结上述生产消费者与历史 Archive 边界。

---

## 二、四项资产的正式边界

| 资产 | 正式语义 | 唯一成立证据 | 禁止语义 |
|---|---|---|---|
| Eligibility | 当前确认 Fact 允许申请形成 | `CrystalEligibility` canonical record | Crystal 已形成、动画可宣称成功 |
| Formation Receipt | Eligibility 已被 Growth 事务唯一消费 | `CrystalFormationReceipt.status = FORMED` | 用户已经看见、Archive 已投影 |
| Crystal Asset | 本次 Formation 形成的正式成长资产 | Receipt 内 `formedCrystal` + `crystalReferenceId` | 页面文案、奖励、AI 礼物 |
| Body Imprint Projection | 同一 Crystal 在同一生命身体上的只读投影 | Receipt + Crystal + matched Identity / body references | 第二 Crystal 真源、收藏资产、Formation Authority |

冻结：

- Eligibility 不能直接驱动成功动画；
- `PersonalityRingLite` 不能反向证明 Formation 或 Body Imprint；
- Presentation Outcome 不能反向生成 Receipt；
- Renderer、DOM、Timer、Route navigation 都不是成长 Authority。

---

## 三、当前正式生产链

### 3.1 当前实际执行

`XinmaiLivedResponseReturnSurface.confirmFact()` 当前执行：

```text
confirmLivedResponseFact(...)
↓ transaction confirmed
resolveCrystalEligibilityForFact(fact.fact)
↓ result ignored
onRealityHandoff(...)
↓
/reality
```

结果：

```text
Fact：可能为 1
Eligibility：可能为 ELIGIBLE
Formation Receipt：0
Crystal Asset：0
/reality handoff：已经发生
```

### 3.2 Formation capability 与生产消费的差异

`formCrystalFromEligibility(...)` 已具备：

- canonical Growth transaction；
- deterministic formation / crystal / reservation IDs；
- Identity、Fact、Choice、Eligibility 与 lineage 复验；
- 同一 Choice lineage Receipt 唯一性；
- Eligibility `CONSUMED` 与 Formation Receipt 原子写入；
- transaction complete 后才返回 `FORMED / ALREADY_FORMED`；
- transaction 后执行 Archive mirror reconciliation；
- Projection 失败只标记 `RETRYABLE`，不重复 Formation。

但调用拓扑为：

```text
Production caller：0
Development Acceptance caller：1
```

唯一调用位于 DEV-only `XinmaiLivedGrowthAcceptancePage`。正式 `/launch-lab`、`/reality`、`/dynamics` 与 Returning Surface 都没有调用。

### 3.3 当前门禁缺口

既存 Gate 保护了：

- Formation Consumer 服务本身的事务结构；
- Formation Receipt 原子性；
- 页面不能直接调用 `formCrystalFromEligibility`；
- 旧页面布尔 Authority 不得复活；
- `PersonalityRingLite` 是 derived mirror。

但没有门禁保护：

```text
唯一 Production Orchestrator 必须实际消费 Eligibility
```

现有 `check-xinmai-validated-response-crystal-body-sediment` 明确禁止 Return Surface 直接 Formation，这是正确边界；缺少的是 Surface 之外的唯一 post-commit Orchestrator，而不是把 Formation 调用重新塞回页面。

---

## 四、唯一 Production Formation Orchestrator

### 4.1 所有者

目标唯一所有者冻结为：

```text
Xinmai Crystal Formation Production Orchestrator
```

它是唯一生产调用者：

```text
formCrystalFromEligibility(...)
```

Page、Surface、Route、Renderer、Recovery Observer 与 Acceptance Page 都不得成为第二生产调用者。

### 4.2 两个入口、一个编排

Orchestrator 允许被两个事件唤醒，但两者必须调用同一纯编排与同一 Formation Authority：

```text
A. Post-commit wake-up
Fact transaction complete
→ typed Fact Outcome
→ Orchestrator

B. Recovery wake-up
Canonical Growth revision / route recovery
→ 只通知重读
→ Orchestrator
```

Observer 只能通知重读，不能生产 Eligibility、Receipt、Crystal 或成功状态。

### 4.3 正式编排

```text
读取 canonical Growth state
↓
校验当前 Identity / Choice lineage / Fact revision
↓
若 Fact 无 Eligibility：
  resolveCrystalEligibilityForFact(...)
↓
若 Eligibility = WITHHELD：
  返回 WITHHELD，不 Formation
↓
若 Eligibility = ELIGIBLE / FORMATION_PENDING：
  formCrystalFromEligibility(...)
↓
Growth transaction complete
↓
读取 confirmed Formation Receipt
↓
输出 Typed Formation Outcome
```

页面点击只是 Fact 确认动作；它可以唤醒 Orchestrator，但不是 Formation 真源。

### 4.4 崩溃与遗漏恢复

| 中断点 | 恢复规则 |
|---|---|
| Fact committed、Eligibility 尚未建立 | Recovery 重读 confirmed Fact，以同一 deterministic eligibility ID 解析 |
| Eligibility committed、Formation 尚未调用 | Recovery 发现当前未消费 Eligibility，交给同一 Orchestrator |
| Formation transaction 进行中崩溃 | 无 transaction complete 即无成功；重试 deterministic Formation |
| Receipt 已存在、UI 未收到结果 | `formCrystalFromEligibility` 返回 `ALREADY_FORMED`；恢复同一 Receipt |
| Projection mirror 失败 | 只重试 mirror，不重新 Formation |
| 页面/Route 已卸载 | 不删除 Fact / Eligibility；恢复时继续编排 |

### 4.5 多标签与确定性

现有 Formation Authority 已冻结：

```text
formationKey = eligibilityReferenceId + eligibilityRevision
formationReferenceId = deterministic(formationKey)
crystalReferenceId = deterministic(formationKey)
```

重叠 IDB `readwrite` transaction、formation index unique constraints 与 lineage receipt check 共同保证：

```text
同一 Eligibility：Receipt = 1 / Crystal = 1
```

第二标签只能收到同一 `ALREADY_FORMED`，不能形成第二 ID。

### 4.6 Formation 失败

Formation transaction 未完成时：

- Eligibility 保持 `ELIGIBLE` 或可恢复的 `FORMATION_PENDING`；
- 不产生 Receipt / Crystal；
- 不显示 Formation 成功；
- 不显示 Body Imprint；
- 用户获得真实重试或 `SAFE_WITHHELD`；
- 不生成第二 Eligibility revision 来逃避失败。

### 4.7 Acceptance 隔离

`XinmaiLivedGrowthAcceptancePage`：

- 继续保持 DEV-only Route；
- 可以调用低层 Formation Consumer 做验收；
- 不得作为 Product Orchestrator；
- Production Bundle 必须不包含其 Route / Fixture；
- 门禁不得用 Acceptance caller 证明生产消费成立。

---

## 五、Formation Presentation Typed Contract

### 5.1 五类 Presentation 状态

目标 typed state 冻结为：

```text
AWAITING_FORMATION
FORMATION_IN_FLIGHT
FORMED
RECOVERED_FORMED
SAFE_WITHHELD
```

并附加非 Formation 真源的派生状态：

```text
archiveMirrorState:
NOT_REQUIRED | PROJECTED | RETRYABLE
```

语义：

| 状态 | 事实 |
|---|---|
| `AWAITING_FORMATION` | Fact / Eligibility 已确认，尚无 Receipt |
| `FORMATION_IN_FLIGHT` | Orchestrator 正在请求事务；不得说已形成 |
| `FORMED` | 当前 transaction 返回 confirmed Receipt |
| `RECOVERED_FORMED` | Recovery 找到同一 confirmed Receipt |
| `SAFE_WITHHELD` | Storage、Identity、lineage、engine 或 canonical state 不可信 |

### 5.2 成功点

```text
唯一成功点：
Growth transaction complete + confirmed Formation Receipt
```

以下都不是成功：

- Eligibility = ELIGIBLE；
- request success；
- animation start / end；
- fixed timer；
- mirror localStorage 写入；
- `/reality` navigation；
- DOM 节点存在。

### 5.3 Motion / Reduced Motion

```text
Motion：
confirmed Receipt → 完整形成过程

Reduced Motion：
confirmed Receipt → 静态同体形成显影

共同输入：
同一 formationReferenceId
同一 crystalReferenceId
同一 Choice / Fact / Identity references
```

视觉动画可以在 Receipt 后开始；`FORMATION_IN_FLIGHT` 只允许克制等待，不得用“正在结晶”暗示已成功。

### 5.4 Navigation

1.0 首次成长冻结为：

```text
Receipt confirmed
↓
至少一个可用的 Motion / Static Formation Presentation Outcome
↓
用户明确继续，或 Presentation 不可用后明确继续同行
↓
/reality handoff
```

Presentation Outcome 只证明用户看见或无法看见，不成立 Formation。

如果 Formation 失败：

```text
/reality 完整成长 handoff：0
```

若产品允许用户继续进入生命空间，只能明确显示“现实回应已保存，留痕尚未形成”，不得冒充闭环完成。P0 优先采用 Formation 确认后再承接 `/reality`。

---

## 六、Canonical Body Imprint Read Model

### 6.1 Stable Body Reference 已存在

`RealityEncounterIdentityReferences` 已提供：

```text
sourceReferenceId
starBeastIdentityReferenceId
mansionCoordinateReferenceId
```

结合现有 Genesis Visual Continuity，可以稳定确认：

- 同一用户生命来源；
- 同一星兽；
- 同一出生星宿坐标；
- 同一身体视觉源。

因此当前不缺 Body Reference，不需要新 Identity Authority 或新数据库。

### 6.2 Canonical source 已存在

Growth IDB 已有：

```text
Canonical Envelope.formationReceipts
growth-formation-index
growth-crystal-projection
```

`growth-crystal-projection` 与 Receipt 在同一 IDB transaction 中写入，包含：

- formationReferenceId；
- crystalReferenceId；
- choiceActionIntentionReferenceId；
- formedAt；
- formedCrystal。

但其 projection record 不含 Identity references，且当前没有正式 Body Imprint reader。目标 Adapter 必须在 canonical read 中把 projection record 与 Receipt / Identity 一起复验，不能只读 index record 后猜测身体归属。

### 6.3 目标 Read Model

```text
Canonical Formation Receipt
+ Canonical Crystal Projection Record
+ Current Identity / Visual Continuity
↓
Xinmai Canonical Body Imprint Projection Adapter
↓
Typed Body Imprint Visual Facts
```

最低 contract：

```text
semanticRole: XINMAI_CANONICAL_BODY_IMPRINT_VISUAL_FACT
sourceReferenceId
starBeastIdentityReferenceId
mansionCoordinateReferenceId
formationReferenceId
crystalReferenceId
eligibilityReferenceId
livedResponseReferenceId
choiceActionIntentionReferenceId
fencingToken
formedAt
formedCrystal
sourceSlot
deterministicGeometryKey
state: READY | SAFE_WITHHELD
```

### 6.4 稳定选择与多 Crystal

存在多颗 Crystal 时：

- 存在性只由 canonical Receipts 决定；
- 顺序优先使用 `fencingToken`，再用 `formationReferenceId` 稳定 tie-break；
- geometry key 至少包含 Body Reference + crystalReferenceId；
- source slot 由 formed Crystal 的正式 source dimension 派生；
- Page 不能按数组位置、`createdAt` 或 `crystal.copy` 选择；
- Renderer 不生产“最新一颗”语义。

### 6.5 Projection 状态语义冲突

`CrystalFormationReceipt.projection` 当前实际表示：

```text
PersonalityRingLite Archive mirror reconciliation
```

它不表示：

```text
Canonical Body Imprint 已经属于同一星兽
```

未来必须在类型与门禁中明确区分：

```text
Archive Mirror Projection：
PENDING | PROJECTED | RETRYABLE

Canonical Body Imprint Readiness：
READY | SAFE_WITHHELD
```

Body Imprint 可以从 confirmed Receipt 确定性派生，不依赖 localStorage mirror 写入成功。

### 6.6 Identity mismatch

任何以下失配：

- source reference；
- starbeast identity reference；
- mansion coordinate reference；
- visual continuity source；
- receipt lineage；

统一输出 `SAFE_WITHHELD`。不得用最近一条 Crystal 或唯一一条 mirror entry 自动绑定。

---

## 七、PersonalityRingLite 真实来源与生产消费者

### 7.1 来源

```text
Storage key：guanyao:personalityRingLite
Storage：localStorage
Schema：PersonalityRingLite 1.0
```

写入来源：

1. `reconcileCanonicalFormationReceiptsToPersonalityRing(...)`：confirmed Receipts 的 derived mirror；
2. 历史 `savePersonalityRingLiteEntry(...)`：允许写入 `LEGACY_VALID_CRYSTAL`；
3. 注释隔离的旧 Gravity deposit UI：当前无生产执行，但门禁必须继续禁止复活。

### 7.2 正式生产直接读取者

| 消费者 | 当前行为 | 风险 | 裁决 |
|---|---|---|---|
| `LaunchLab` Returning | 直接读取 mirror，按 `createdAt` 选第一条，按 `crystal.copy` 生成 geometry key | mirror 决定 Body Imprint 存在与“最新” | MIGRATE |
| `RealityProductionRouteEntry` | 直接读取 mirror，按 `createdAt` 选最新，生成 primitive memory key / slot | Route 直接决定 Crystal body memory | MIGRATE |
| `PersonalityRingPage` (`/archive`) | 直接读取 mirror，按时间排序、选择、回放；页面声明 active 1.0 | derived mirror 成为正式 Archive / Body Imprint 展示真源 | EXTENDED MIGRATION REQUIRED |
| `XinmaiLivedGrowthAcceptancePage` | DEV 验收读取 | 非生产 | ISOLATE |
| `GravityPage.CurrentCrystalEndStateFocus` | 整段注释隔离 | 旧 Timer / Page deposit 风险 | DELETE / REJECT REUSE |

### 7.3 Page 自行决定的内容

当前 Page / Route 自行决定：

- 是否存在 Crystal；
- 哪一颗是最新；
- 选中哪一条；
- 以 `createdAt` 排序；
- 以 `crystal.copy` 拼接 identity key；
- primary dimension → source slot；
- geometry；
- Body Imprint 是否挂载；
- Archive arrival 与 replay。

其中几何计算可以保留为纯函数，但事实选择、Identity 绑定与 canonical ordering 必须迁出 Page。

### 7.4 Renderer / DOM

`RealityLifeUniverseCanvas` 当前不直接读 Storage，但只接收：

```text
latestCrystalMemoryKey
latestCrystalSourceSlot
```

这两个 primitive 来自上游 Page / Route mirror 选择，不能作为 canonical typed visual facts。

DOM `data-*` 当前主要为观测镜像，不是输入；迁移后继续禁止反向消费。

---

## 八、历史数据与 NO BACKFILL

| 历史资产 | 处理 |
|---|---|
| Canonical Receipt + formed Crystal | 保留；允许确定性派生 Body Imprint Read Model |
| Eligibility 无 Receipt | 不补造 Receipt；由 Production Orchestrator 在当前身份/lineage 复验后正常恢复 Formation |
| Confirmed Fact 无 Eligibility | 不补造历史成功；仅当前合法 lineage 可经同一 Eligibility Authority 重新解析 |
| `FORMAL_FORMATION_RECEIPT` mirror entry | 仅在匹配 canonical Receipt 时作为兼容镜像；Body 不读取它 |
| `LEGACY_VALID_CRYSTAL` mirror entry | 原样保留，不补造 Fact / Eligibility / Receipt / Body Imprint |
| 只有纹理、无 canonical Receipt | 不得显示为“同一星兽记得” |
| 多个历史 Receipt 同 lineage | 隔离并 `SAFE_WITHHELD`，不按时间选赢家 |
| Identity mismatch | `SAFE_WITHHELD` |

V1 / V2 Growth Envelope 都已包含 `formationReceipts`。V1 → V2 只增加 Departure / Return receipt 集合；本次不需要 Growth schema backfill，也不需要新 Object Store。

---

## 九、失败、刷新、并发与导航矩阵

| 场景 | Receipt | Presentation | Body Imprint | `/reality` |
|---|---|---|---|---|
| Fact confirmed，Eligibility 调用前崩溃 | 0 | 等待恢复 | 0 | 不作为完整闭环进入 |
| Eligibility ELIGIBLE，Formation 未调用 | 0 | `AWAITING_FORMATION` | 0 | 不作为完整闭环进入 |
| Formation transaction abort | 0 | `SAFE_WITHHELD / retry` | 0 | 不宣称完成 |
| Formation transaction complete | 1 | `FORMED` | canonical read 可派生 | 形成展示后承接 |
| Receipt 已形成，Presentation 刷新 | 同一 1 | `RECOVERED_FORMED` | 同一 projection | 不重复 Formation |
| Archive mirror write failure | 同一 1 | Formation 仍成立 | canonical Body 不受影响 | 可重试 mirror |
| Canonical visual adapter failure | 同一 1 | Formation 仍成立 | `SAFE_WITHHELD` | 真实表达显化不可用 |
| `/reality` navigation failure | 同一 1 | 恢复 formed | 同一 projection | 只重试导航 |
| 多标签同时 Formation | 最终 1 | 两边恢复同一 Receipt | 同一 Crystal | 无第二 handoff success |
| Direct URL | 不补造 | 不补造 | 不补造 | 仍需合法 Admission |
| Identity mismatch | 不新增 | `SAFE_WITHHELD` | `SAFE_WITHHELD` | 不放行完整闭环 |

---

## 十、原子迁移拆分裁决

### 10.1 不建议一把巨刀

Formation 写入与 Body Projection 读取位于不同职责：

```text
Formation：
Growth mutation transaction

Body Imprint：
canonical read model + presentation consumer cutover
```

它们不需要伪装为同一事务，也不应绑成不可回滚的视觉巨刀。

### 10.2 Blade A — Production Formation Consumer Atomic Migration

同一回滚单位必须包含：

```text
新增唯一 Production Formation Orchestrator
+
Post-commit + Recovery wake-up 接入同一 Orchestrator
+
删除 Fact 后直接 /reality 完整成功路径
+
建立 Formation Presentation typed contract
+
Receipt confirmed 后才允许完整 handoff
+
所有现有非canonical Body Imprint 入口 SAFE_WITHHELD
+
Acceptance 保持 DEV 隔离
+
专属 Gates / browser evidence / forward counter
```

Blade A 可以先落地，但完成后 Body Imprint 必须处于真实 `SAFE_WITHHELD`，不得继续展示 mirror 纹理冒充 canonical Imprint。

Blade A 就绪度：

```text
NOW — ATOMIC MIGRATION APPLICATION READY
```

### 10.3 Blade B — Extended Canonical Body Imprint Consumer Migration

必须覆盖：

```text
新增 canonical Body Imprint read adapter
+
LaunchLab direct mirror read cutover
+
RealityProductionRouteEntry direct mirror read cutover
+
RealityProductionHost typed input
+
RealityLifeUniverseCanvas typed input
+
Active /archive PersonalityRingPage canonical cutover / legacy isolation
+
realLifeVisualSourceAdapter 接入 typed fact
+
删除 primitive latest key / createdAt authority
+
更新所有相关 Gates
```

Blade B 当前不能直接申请 Runtime，因为 `/archive` 的正式产品边界、legacy mirror 可见性与 canonical multi-imprint selection 仍需扩展审计。

Blade B 就绪度：

```text
RED — EXTENDED CONSUMER MIGRATION AUDIT
```

### 10.4 Blade C — Visual Experience

只有 Blade A / B 关闭后才允许：

- Formation Attribution motion/static；
- Body Imprint readability；
- ownership / next-loop motivation。

Blade C 不拥有任何 Growth 或 Projection Authority。

---

## 十一、完整消费者裁决

| 消费者 | 裁决 |
|---|---|
| Lived Response Fact Authority | KEEP |
| Crystal Eligibility Authority | KEEP |
| Growth Transaction Authority | KEEP |
| `formCrystalFromEligibility` | KEEP；只由新 Orchestrator 生产调用 |
| `XinmaiLivedResponseReturnSurface` | ADAPT；不直接 Formation、不提前 handoff |
| Growth revision observer | KEEP；只通知重读 |
| Choice Returning Provenance Admission | KEEP；Receipt 终局优先 |
| `XinmaiLivedGrowthAcceptancePage` | ISOLATE DEV ONLY |
| `PersonalityRingLite` persistence | ISOLATE DERIVED MIRROR |
| Personality Ring reconciliation | KEEP AS MIRROR RETRY ONLY |
| `LaunchLab` direct ring read | MIGRATE |
| `RealityProductionRouteEntry` direct ring read | MIGRATE |
| Active `/archive` PersonalityRingPage | MIGRATE / LEGACY ISOLATION AUDIT |
| `RealityProductionHost` primitive Crystal props | ADAPT |
| `RealityLifeUniverseCanvas` primitive Crystal props | ADAPT |
| `realLifeVisualSourceAdapter.crystalImprint = null` | ADAPT after typed contract |
| `resolveLifeUniverseCrystalImprintGeometry` | KEEP PURE |
| `CurrentCrystalEndStateFocus` | DELETE / REJECT REUSE |
| `CrystalExperienceUIRuntime` Harness contract | ISOLATE / REJECT AS PRODUCTION |
| Renderer DOM / data-* | REJECT AS AUTHORITY |
| Phase 4 Sanctuary / Archive growth | DEFER / LOCKED |

---

## 十二、Gate 切换要求

### Blade A 至少新增

- Production Formation Orchestrator Uniqueness Gate；
- Post-commit / Recovery Same Orchestrator Gate；
- Fact-to-Eligibility-to-Formation Recovery Gate；
- Formation Receipt Before Handoff Gate；
- Acceptance Caller Not Production Evidence Gate；
- Transaction Complete Before Formed Feedback Gate；
- Formation Retry / Multi-tab Determinism Gate；
- Noncanonical Body Imprint Safe-Withheld Gate。

### Blade B 至少新增

- Canonical Body Imprint Reader Uniqueness Gate；
- Identity / StarBeast / Mansion Match Gate；
- Page Direct PersonalityRingLite Read Forbidden Gate；
- `createdAt` / array-order Visual Authority Forbidden Gate；
- Typed Host / Renderer Input Gate；
- Legacy Mirror No Backfill Gate；
- Multi-Crystal Stable Ordering Gate；
- Motion / Reduced Motion Semantic Parity Gate。

必须校准或替换当前明确要求 `readPersonalityRingLite()` 的旧精确字符串门禁；旧 Gate 不能继续把非canonical mirror 读取冻结成正式产品因果。

---

## 十三、真实浏览器验收矩阵

### Formation

- Fact commit 后崩溃，恢复同一 Eligibility / Formation；
- Eligibility 长期未消费，Recovery 正确发现；
- 同一 Eligibility 双标签同时 Formation，Receipt / Crystal 各 1；
- Formation abort / blocked / quota / connection close，无伪成功；
- 已有 Receipt 恢复 `RECOVERED_FORMED`；
- Formation 未确认时 `/reality` 完整 handoff 为 0；
- Acceptance Route 不进入 Production Bundle；
- Motion / 原生 Reduced Motion 使用同一 Receipt。

### Body Imprint

- 单 Receipt 同 Identity 可得唯一 typed Imprint；
- 多 Receipt 使用 fencing + formation reference 稳定排序；
- source / starbeast / mansion 任一失配均 `SAFE_WITHHELD`；
- localStorage mirror 删除不影响 canonical Imprint；
- mirror 写入失败不重复 Formation；
- `LEGACY_VALID_CRYSTAL` 不形成 canonical Body Imprint；
- Refresh / Back / Forward / Returning 恢复同一 geometry key；
- Renderer 不读取 Storage、DOM 或 Page boolean；
- Active `/archive` 不按 `createdAt` 冒充 canonical chronology。

---

## 十四、Forward SAFE_WITHHELD

### Blade A Counter

- 暂停新的 Production Formation 请求；
- 保留 Fact、Eligibility、Receipt、Crystal 与 Archive；
- 已有 Receipt 只读恢复；
- 不恢复 Fact 后直接完整 handoff；
- 不把 Acceptance 变成生产调用者；
- noncanonical Body Imprint 保持关闭。

### Blade B Counter

- Canonical Receipt / Crystal / projection read-only 保留；
- Body Imprint 显示 `SAFE_WITHHELD`；
- 不恢复 Page direct mirror reads；
- 不恢复 `createdAt` / `crystal.copy` 身体绑定；
- legacy mirror 原始数据不删除；
- Phase 4 不解锁。

普通 revert 若会复活 mirror Authority，则禁止使用。

---

## 十五、下一刀

```text
XINMAI-PERSONALITY-RING-LITE-
PRODUCTION-CONSUMERS-TO-CANONICAL-
BODY-IMPRINT-EXTENDED-MIGRATION-AUDIT-P0

交通灯：RED
刀型：Extended Consumer Migration Audit
决策建议：NOW — AUDIT ONLY
```

唯一目标：冻结 `LaunchLab`、`RealityProductionRouteEntry`、active `/archive`、Host、Canvas 与旧精确字符串 Gates 从 `PersonalityRingLite` 向 canonical Body Imprint read model 的完整原子切换，并确定 legacy archive 的只读隔离策略。

在该扩展审计关闭前：

- Blade A 可以单独申请 Formation Runtime，但必须同步安全关闭所有非canonical Body Imprint；
- Blade B 不得申请 Runtime；
- Blade C 视觉施工继续 `DEFER`。

---

## 十六、关闭声明

```text
本 Migration Audit：
CLOSED / PASS

Production Formation Consumer：
NOW — ATOMIC MIGRATION APPLICATION READY

Formation / Body Projection：
READY — SPLIT ATOMIC MIGRATIONS

Canonical Body Reference：
AVAILABLE

PersonalityRingLite Production Consumers：
EXTENDED MIGRATION REQUIRED

Final Exit：
RED — EXTENDED CONSUMER MIGRATION AUDIT

Crystal Formation Capability：
ESTABLISHED

Production Formation Consumer：
MISSING

Canonical Body Imprint：
NOT ESTABLISHED

Phase 3 Causal Closure：
OPEN

Phase 3 Experience Closure：
OPEN

Commercial Value Readiness：
PARTIAL

Visual Runtime：
DEFER

Phase 4：
LOCKED
```

本审计没有把 Eligibility、Archive mirror 或历史纹理解释为 Crystal / Body Imprint 成功。Formation 生产闭环已经具备独立原子施工条件；Body Imprint 必须在完整迁移三个正式 `PersonalityRingLite` 消费者后，才能向用户宣称“同一生命记得”。
