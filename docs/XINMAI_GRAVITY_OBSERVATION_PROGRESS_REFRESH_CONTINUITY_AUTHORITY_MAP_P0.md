# XINMAI Gravity Observation Progress Refresh Continuity Authority Map P0

> 任务编号：`XINMAI-GRAVITY-OBSERVATION-PROGRESS-REFRESH-CONTINUITY-AUTHORITY-MAP-P0`
>
> 交通灯：YELLOW
>
> 刀型：MAP / Recovery Authority Review
>
> 决策：NOW — MAP ONLY
>
> 主 Layer：Layer 4 Growth
>
> 保护：Layer 1 World、Layer 2 Identity、Layer 3 Relationship、Reality Provenance
>
> 审查基线：`27d8378346dd0908dec72d7e0550c455fda2aa89`
>
> 远程分支：`origin/codex/genesis-28-mansion-production-continuity`
>
> Runtime / Storage / Gate / Renderer：未修改
>
> Phase 4：LOCKED

---

## 一、Construction State Card

```text
当前产品阶段：
Phase 3 — ACTIVE / NOT PASSED

当前 A 级主线：
Reality Adventure

当前工程事实：
首次成长因果 CLOSED
Transactional Persistence CLOSED
Reality Adventure FUNCTIONALLY CLOSED / EXPERIENCE OPEN
Visual Experience MAP CLOSED / FROZEN FOR READINESS

本刀类型：
MAP / Recovery Authority Review

主影响 Layer：
Layer 4 Growth Continuity

保护 Layer：
Layer 1 World
Layer 2 Identity
Layer 3 Relationship
Reality Provenance

是否修改 Runtime：
NO

是否修改 Storage：
NO

是否修改 Gate：
NO

是否修改 Renderer：
NO

是否新增权威：
NO — 只审计并冻结目标权威边界

Phase 4：
LOCKED
```

本刀唯一回答：

> Gravity 刷新、返回和前进/后退后，用户应该恢复到哪个稳定的生命事实，以及该事实未来由谁拥有。

---

## 二、最终 MAP 裁决

```text
当前 Gravity Progress Authority：
PAGE-LOCAL / INCOMPLETE

当前 Refresh Continuity：
FAIL

当前 Back / Forward Continuity：
PARTIAL — 路由安全，观察进度丢失

当前 Direct URL：
SAFE BLOCKED

当前 Reduced Motion：
与 Motion 使用同一恢复语义，但同样丢失进度

现有正式事实能否完整派生恢复：
NO

是否需要新增长期 Growth 资产：
NO

是否需要最小 Gravity Observation Checkpoint：
YES — SESSION-SCOPED / ENCOUNTER-BOUND

唯一 Recovery Owner：
TARGET — VERSIONED GRAVITY ENCOUNTER CONTINUITY RECOVERY ADAPTER

页面、Route、Renderer 直接读取 Storage：
FORBIDDEN

最终交通灯：
RED — ATOMIC MIGRATION AUDIT REQUIRED

视觉 Runtime：
DEFER

Phase 3：
ACTIVE / NOT PASSED

Phase 4：
LOCKED
```

红灯不是因为需要保存更多页面状态。

红灯成立的原因是：

1. 当前 Choice 前的观察资格实际由页面本地状态决定；
2. 当前 Gravity Entry Recovery 只能恢复 Admission，不能恢复用户已经确认的观察事实；
3. Refresh 会推进 Admission revision；
4. `gravityObservationReferenceId` 当前包含该可变 revision；
5. Choice lineage 又绑定 `gravityObservationReferenceId`；
6. 因而“刷新后重走观察与 Choice”不仅重复体验，还可能形成第二条 Choice lineage；
7. 修复必须同时切换状态所有权、恢复协议、引用稳定性和 Choice 消费者，不能新增第二条恢复链后再慢慢删除旧真源。

最终裁决：

```text
RED — ATOMIC MIGRATION AUDIT REQUIRED
```

---

## 三、当前真实生产链

### 3.1 生产入口

本次只使用正式生产链完成浏览器审计：

```text
/launch-lab
↓
同一生命恢复
↓
Life Whisper 明确跳过
↓
进入新的 Reality
↓
/reality
↓
用户选择并认出当前 Pressure Candidate
↓
用户触碰同一生命
↓
Reality → Gravity Atomic Cutover
↓
/dynamics
```

没有使用：

- Acceptance Page；
- 开发 Harness；
- `/starbeast-lab`；
- 人工写入 Storage；
- 直接调用 Controller；
- DOM 属性伪造状态。

### 3.2 当前 Gravity 实际链

```text
Gravity Admission
↓
GravityProductionRouteEntry
↓
GravityProductionSurfaceHost
↓
Life Surface Presented
+
Gravity Observation Surface Presented
↓
Controller 提交 ACTIVE_IN_GRAVITY
↓
GravityPage 初始化
↓
executionSnapshot = 新建
activeDimensionIndex = 0
completedDimensionIds = []
committedChoiceActionIntention = null
innerViewRelation = AWAITING
↓
页面内三次靠近
↓
用户确认“这像我”或留下自命名
↓
页面内六维节点推进
↓
Choice Readiness
↓
提交 Choice Action Intention
```

其中：

```text
Gravity Admission：
正式 Runtime Authority

Minimum Surface Outcome：
正式 Typed Surface Fact

用户观察与 Choice 前进度：
页面当前组件周期内的本地事实

Choice Action Intention：
正式 Growth Asset
```

这四种状态当前没有形成完整的恢复桥梁。

---

## 四、刷新为何退回第一步

### 4.1 页面每次挂载重新创建状态

`GravityPage` 在每次挂载时重新初始化：

```text
executionSnapshot
activeDimensionIndex
completedDimensionIds
committedChoiceActionIntention
transformationMomentActive
innerViewRelation
```

`CosmicBotanicsField` 同时重新初始化：

```text
innerViewPhase
innerViewRelationEstablished
innerViewPhaseBeforePauseRef
```

进入节奏的计时器也会重新执行：

```text
seed
beast
node
```

因此刷新不是“恢复失败后退回”，而是：

> 页面根本没有读取任何观察进度恢复事实，只能重新创建第一帧体验。

### 4.2 Entry Recovery 只恢复进入资格

当前 `XinmaiGravityEntryRecoveryAdapter` 通过 `sessionStorage` 恢复：

- Gravity Admission；
- 同一生命身份引用；
- Reality Encounter provenance；
- 当前 Pressure；
- 当前 Body Approach；
- Admission state / revision；
- 2 小时 TTL。

它不恢复：

- 用户是否已经明确认出收紧；
- 必要观察是否完成；
- Choice Readiness；
- Choice 是否已经提交；
- 页面六维进度；
- Inner View phase。

因此：

```text
Entry Recovery：
能证明“同一生命仍可进入这次 Gravity”

不能证明：
“用户在这次 Gravity 中已经走到哪里”
```

### 4.3 Typed Surface Outcome 不是观察完成

当前 `GravityObservationSurfaceOutcome` 只证明：

```text
GRAVITY_OBSERVATION_SURFACE_PRESENTED
currentRealityTraceVisible = true
firstObservationAffordanceAvailable = true
```

它证明观察表面真实可用。

它不证明：

- 用户已经靠近；
- 用户已经认出；
- 用户已经确认；
- 必要观察已经完成；
- Choice 已经开放。

因此不得将它升级解释为：

```text
GRAVITY_OBSERVATION_COMPLETED
```

### 4.4 Choice 之后的正式事实没有回流至 Gravity Page

Choice Action Intention 已经进入 IndexedDB Canonical Growth Authority。

Returning Surface 也能够通过：

```text
readOpenXinmaiLivedGrowthReturnItems()
```

读取：

- Choice Action Intention；
- 当前 Lived Response Fact；
- 当前 Eligibility；
- Formation Receipt。

但 `GravityPage` 挂载时不读取这些正式事实。

因此即使用户已经提交 Choice，刷新 `/dynamics` 后仍可能：

```text
重新进入第一步
↓
重新观察
↓
重新获得 Choice 表面
```

这不是单纯文案或视觉问题，而是恢复消费者缺口。

---

## 五、“第一步”语义裁决

当前用户刷新后看到的“第一步”实际混合了三种不同层级：

| 当前内容 | 真实性质 | 是否应冻结为长期产品模型 |
|---|---|---:|
| 星云、核心与三次靠近节奏 | Presentation / Interaction choreography | 否 |
| `Gravity Observation Surface Presented` | 最低表面可用事实 | 是，但只作为表面事实 |
| “这像我 / 不完全是这样 / 先停在这里” | 用户明确观察动作 | 是，属于稳定体验检查点候选 |
| 六维顺序推进 | 当前页面的旧步骤编排 | 否 |
| `READY_TO_CRYSTALLIZE` 页面组合条件 | 当前 Choice Readiness 计算 | 不能原样持久化 |

正式裁决：

> “第一步”不是一项独立的正式 Gravity 事实，而是最低表面、首次靠近动画与当前六维 UI 顺序的混合呈现。

禁止为了修复刷新而把以下内容冻结为长期 Growth 模型：

```text
activeDimensionIndex
completedDimensionIds
当前六维顺序
当前文案行
当前 innerViewPhase
```

需要冻结的是：

> 用户是否已经形成了一个可被恢复的明确观察事实，以及该事实是否已经足以开放 Choice。

---

## 六、状态三分类

### 6.1 A｜纯展示状态

以下状态只负责如何呈现，不得持久化：

| 状态 | 当前所有者 | 刷新语义 |
|---|---|---|
| 星云进入动画 | Page / Renderer | 可重新播放或压缩 |
| 呼吸节奏 | Renderer | 重新投影 |
| 粒子展开进度 | Renderer | 重新投影 |
| 镜头位置 | Renderer | 重新计算 |
| Pause 动画 | Page Presentation | 不恢复动画帧 |
| Response Gap | Page Presentation | 不恢复计时 |
| Crystal 沉积动画阶段 | Presentation | 从正式 Receipt 重新显化 |
| `innerViewPhase` | Component-local | 不持久化 |
| `cosmicNarrativePhase` | Page projection | 不持久化 |
| `activeDimensionIndex` | Page-local | 不持久化 |
| `completedDimensionIds` | Page-local | 不持久化 |
| `executionSnapshot` | Page-local Runtime snapshot | 不持久化 |
| DOM `data-*` | Observation mirror | 不作为 Runtime 输入 |

原则：

```text
恢复产品事实
≠
恢复动画帧
```

### 6.2 B｜稳定体验检查点

| 稳定事实 | 当前是否存在权威 | 目标恢复语义 |
|---|---:|---|
| 已进入当前 Gravity Encounter | 是，Gravity Admission | 恢复同一 Encounter |
| 最低 Gravity 表面已呈现 | 是，Typed Surface Outcome；当前不跨刷新保留 | 可重新呈现 |
| 用户已明确认出当前收紧 | 否 | 跳过重复三次靠近 |
| 必要观察已经完成 | 否 | 恢复至 Choice 前稳定位置 |
| 已具备进入 Choice 的资格 | 页面组合条件 | 需由最小检查点 + 正式事实派生 |
| Choice 已提交 | 是，Canonical Growth Asset | 直接进入现实等待态 |

### 6.3 C｜正式成长资产

以下资产已有正式 Authority，Gravity Progress 只能读取：

- Choice Action Intention；
- Lived Response Candidate；
- Lived Response Fact；
- Crystal Eligibility；
- Formation Receipt；
- Crystal；
- Canonical Projection。

禁止 Gravity Progress：

- 复制这些资产；
- 覆盖这些资产；
- 根据页面状态补造这些资产；
- 根据刷新重新生成这些资产；
- 将其镜像写入新的 session/local Storage 真源。

---

## 七、浏览器 Runtime 证据

### 7.1 测试基线

```text
生产 URL：
http://127.0.0.1:5215

正式页面：
/launch-lab
/reality
/dynamics

代码基线：
27d8378346dd0908dec72d7e0550c455fda2aa89
```

### 7.2 路径证据

| 路径 | 用户动作 | 权威状态 | 可见结果 | 裁决 |
|---|---|---|---|---|
| 正常 Motion | 从 Reality 进入 Gravity | Admission ACTIVE | 出现“第二次靠近 · 理解” | PASS |
| 明确认出 | 依次靠近并选择“这像我” | 仅 Page-local | 显示“生命回应了你的认出” | 当前周期 PASS |
| 刷新 | 在“生命回应了你的认出”后刷新 | Admission 恢复，观察事实未恢复 | 回到“第二次靠近 · 理解” | FAIL |
| Back | `/dynamics` 返回 `/reality` | 旧 Reality 已被消费 | 显示安全阻断页 | 路由保护 PASS |
| Forward | 再前进至 `/dynamics` | Gravity Admission 恢复 | 再回第一步 | Continuity FAIL |
| Direct URL | 新标签直接打开 `/dynamics` | 无该标签 Route Ticket / Recovery | 显示“这次看见还没有被完整承接” | SAFE BLOCKED |
| Reduced Motion | 同一 Admission 进入 reduced motion | 同一恢复语义 | 同样回到第一步 | Authority 一致；Continuity FAIL |

### 7.3 关键截图式事实记录

刷新前可见：

```text
生命回应了你的认出
这股流动慢慢安定下来，仍然是它自己。
让它继续呼吸
```

刷新后可见：

```text
这一处，先有了回应
第二次靠近 · 理解
```

这证明：

```text
用户明确动作：
已发生

当前页面周期：
已知

恢复 Authority：
未知
```

---

## 八、引用稳定性与第二 Choice 风险

### 8.1 当前引用链

当前 Host 生成：

```text
gravityObservationReferenceId
=
gravity-observation:
  gravityCycleId:
  admissionRevision
```

Admission 从 ACTIVE 恢复时会：

```text
恢复为 ACCEPTING
↓
revision + 1
↓
重新呈现最低表面
↓
重新提交 ACTIVE
```

Choice Action Intention 的稳定引用又绑定：

- `sourceReferenceId`；
- `sourceEncounterCycleId`；
- `gravityCycleId`；
- `gravityObservationReferenceId`。

### 8.2 风险

```text
同一 Gravity Encounter
↓ 刷新
Admission revision 改变
↓
gravityObservationReferenceId 改变
↓
用户重走页面并再次提交 Choice
↓
可能形成第二条 Choice lineage
```

这意味着当前问题不仅是：

> 用户被迫重看。

同时还是：

> 一个 Presentation/Admission revision 可能改变正式 Growth lineage identity。

该风险必须在后续原子迁移中一并切断。

### 8.3 冻结方向

未来必须区分：

```text
Gravity Observation Lineage Reference：
同一 encounter 内稳定

Admission Revision：
仅用于接收与 stale transaction 校验
```

禁止继续让可变 Admission revision 决定 Choice lineage。

具体 Reference 生成算法由下一张 Migration Audit 冻结，本 MAP 不实施。

---

## 九、目标恢复优先级

恢复不是回到同一像素位置，而是继续同一段生命冒险。

正式优先级冻结为：

| 优先级 | 已有事实 | 恢复目标 | 禁止行为 |
|---:|---|---|---|
| 1 | Formation Receipt / Crystal | Returning Body Imprint | 不再进入 Choice |
| 2 | Confirmed Fact / Eligibility | 回访确认或 Formation continuation | 不回到 Gravity 第一步 |
| 3 | Choice Action Intention | “现实中的回应正在等待” | 不重新观察、不生成第二 Choice |
| 4 | Observation Checkpoint = `CHOICE_READY` | 直接恢复至 Choice 表面 | 不重复六维旧步骤 |
| 5 | Observation Checkpoint = `OBSERVATION_RECOGNIZED` | 压缩恢复，继续必要观察 | 不重复三次靠近 |
| 6 | 仅有有效 Gravity Admission | 温和重新进入首次观察 | 不声称用户已认出 |
| 7 | Admission 缺失、过期或身份失配 | 返回安全生命空间 | 不生成新身份、不猜测进度 |

### 9.1 只看过动画、没有确认

```text
允许重新进入或简短回顾
不生成稳定检查点
不声称已经观察
```

### 9.2 已明确认出 Gravity Observation

```text
不得强迫重新完成三次靠近
恢复为同一 Observation Lineage
可压缩重演视觉，不重演用户决定
```

### 9.3 已提交 Choice

```text
不得退回 Gravity
不得重新开放同一 Choice
进入现实等待 / Returning 入口
```

### 9.4 已有 Lived Response Fact

```text
进入回访确认、Eligibility 或 Formation continuation
不得退回 Choice
```

### 9.5 已有 Formation Receipt

```text
进入同一生命的 Body Imprint
不得再次 Formation
不得生成新 Choice
```

---

## 十、是否需要新增持久化资产

### 10.1 结论

```text
新增长期 Growth Asset：
NO

新增独立 Progress Storage：
NO

最小 Gravity Observation Checkpoint：
YES

生命周期：
CURRENT GRAVITY ENCOUNTER / SESSION RECOVERY
```

现有正式事实可以覆盖 Choice 之后的恢复。

现有事实无法区分 Choice 之前：

```text
只是看见最低表面
vs
已经明确认出收紧
vs
已经完成必要观察并可进入 Choice
```

因此需要最小检查点。

### 10.2 最小状态语义

建议冻结为：

```text
OBSERVATION_RECOGNIZED
CHOICE_READY
```

以下状态不应额外持久化：

```text
ENTRY_PRESENTED
```

它可由有效 Admission 与重新呈现的 Typed Surface Outcome得出。

以下状态也不应额外持久化：

```text
SUPERSEDED_BY_CHOICE
```

它必须由 Canonical Choice Action Intention 派生。

### 10.3 最小绑定

Checkpoint 至少绑定：

```text
schemaVersion
sourceReferenceId
identityReferences
sourceEncounterCycleId
selectedPressureSeedReference
gravityCycleId
gravityObservationLineageReferenceId
checkpointState
checkpointRevision
userActionProvenance
confirmedAt
expiresAt
```

其中：

- `gravityObservationLineageReferenceId` 在同一 Gravity encounter 内稳定；
- `checkpointRevision` 只推进稳定事实；
- identity、Reality、Pressure、Gravity 任一引用失配均拒绝恢复；
- Checkpoint 不拥有 Choice；
- TTL 不得超过当前 Gravity Recovery 的有效边界；
- 过期只表示不能恢复该观察检查点，不表示用户明确离开。

### 10.4 明确禁止保存

```text
activeDimensionIndex
completedDimensionIds
executionSnapshot
innerViewPhase
cosmicNarrativePhase
动画计时器
DOM 属性
镜头坐标
粒子百分比
点击次数
文案行
Pause 状态
Response Gap
```

---

## 十一、唯一 Recovery Owner

### 11.1 当前所有权

```text
XinmaiGravityEntryRecoveryAdapter
  └─ sessionStorage 唯一 Gravity Entry Reader / Writer

Gravity Entry Controller
  └─ 校验并拥有当前 Admission

GravityPage
  └─ 拥有当前组件周期的观察进度

Growth Transactional Store
  └─ 拥有 Choice 及后续正式成长资产
```

问题不是当前存在两个 Storage Writer。

问题是：

> Entry Recovery 与 Page-local Progress 没有同一 Typed Continuity Authority。

### 11.2 目标所有权

未来唯一恢复入口冻结为：

```text
Versioned Gravity Encounter Continuity Recovery Adapter
```

职责：

1. 作为 Gravity session recovery envelope 的唯一 Reader / Writer；
2. 原子恢复 Entry Admission 与最小 Observation Checkpoint；
3. 不读取或写入 Renderer、DOM；
4. 通过 Typed Growth Query 只读 Canonical Growth Assets；
5. 将恢复候选交给 Gravity Continuity Controller 校验；
6. 不自行决定页面；
7. 不生产 Choice、Fact、Eligibility 或 Crystal。

未来迁移应当：

```text
扩展 / 替换现有 XinmaiGravityEntryRecoveryAdapter
```

而不是并列新增：

```text
GravityProgressStorage
+
GravityEntryStorage
```

### 11.3 Storage 边界

```text
Session Recovery：
Gravity Encounter Continuity Adapter 唯一读写

Canonical Growth IndexedDB：
Growth Transaction Authority 唯一写
Gravity Continuity 只通过 Typed Query 读取

Route：
零直接 Storage 读取

Page：
零直接 Storage 读取

Host：
零直接 Storage 读取

Renderer：
零 Storage 读取

DOM / data-*：
零 Runtime Authority
```

---

## 十二、恢复决策算法

目标 Controller 应按以下顺序裁决：

```text
读取 Gravity Encounter Recovery Candidate
↓
校验 TTL
↓
校验 identityReferences
↓
校验 source Reality / Pressure provenance
↓
校验 gravityCycleId
↓
只读 Canonical Growth Assets
↓
按 Receipt → Fact/Eligibility → Choice → Checkpoint → Admission 排序
↓
输出 Typed Gravity Resume Decision
↓
Presentation Adapter 投影 UI
```

建议 Typed Decision：

```text
RETURN_TO_BODY_IMPRINT
RETURN_TO_LIVED_RESPONSE
RETURN_TO_REAL_LIFE_WAITING
RESUME_CHOICE_READY
RESUME_OBSERVATION_RECOGNIZED
REENTER_OBSERVATION
SAFE_RETURN_TO_LIFE_WORLD
```

这些是恢复决策，不是新的 Growth 状态机。

Renderer 只消费相应视觉事实，不消费 Recovery Candidate。

---

## 十三、生产者—消费者矩阵

| 生产者 / 资产 | 当前输出 | 当前直接消费者 | 当前裁决 | 目标动作 |
|---|---|---|---|---|
| Reality → Gravity Cutover | Gravity transfer / admission source | Gravity Route / Controller | KEEP | 保持入口权威 |
| Gravity Entry Controller | Admission state | Route / Host | KEEP | 继续拥有 Admission |
| Gravity Entry Recovery Adapter | session recovery envelope | Controller | MIGRATE | 原子升级为 Encounter Continuity 唯一 Adapter |
| Gravity Life Surface | Typed Life Surface Outcome | Host | KEEP | 不作为 progress |
| Gravity Observation Surface | Typed Surface Presented Outcome | Host | KEEP | 保持最低表面事实，不升级为完成事实 |
| Gravity Surface Host | Admission Transaction | Controller | ADAPT | 使用稳定 observation lineage，不拥有 checkpoint |
| `GravityPage` | 页面进度与 Choice readiness | 自身 | MIGRATE | 删除稳定事实权威，仅保留 projection |
| `innerViewPhase` | 靠近/暂停/确认展示 | Component | ISOLATE | 纯展示，不持久化 |
| `executionSnapshot` | 当前六维执行快照 | Page adapters | ISOLATE | 不作为恢复资产 |
| `activeDimensionIndex` | 当前顺序位置 | Page / Presentation | ISOLATE | 不持久化 |
| `completedDimensionIds` | 当前页面完成集合 | Choice readiness adapter | MIGRATE | 不能继续作为唯一稳定资格 |
| `realityProductionGravityConsumer` | `gravityObservationConfirmed` V1 session | 旧 typed consumer / architecture checks | ISOLATE | 不得冒充当前生产恢复权威 |
| Choice Action Intention Controller | Canonical Choice | Growth Store / Returning | KEEP | 作为 post-Choice 恢复权威 |
| Growth Transactional Store | Fact / Eligibility / Receipt / Crystal | Returning / Formation / Projection | KEEP | Gravity 只读 |
| Returning Surface | Open Growth Return Item | 用户返回体验 | KEEP | 优先于 Gravity progress |
| Reality / Pressure provenance | 当前现实来源 | Gravity Admission / Choice | KEEP | 强绑定 checkpoint |
| Browser History | URL navigation entry | Router | REJECT | 不拥有 progress |
| `sessionStorage` | Gravity recovery candidate | Recovery Adapter | KEEP WITH SINGLE OWNER | Page/Route 不得直接读 |
| `localStorage` | 非 Growth 权威镜像或既存资产 | 既存 adapters | REJECT FOR PROGRESS | 不新增 Gravity progress key |
| IndexedDB | Canonical Growth Authority | Growth Transaction Authority | KEEP | Gravity 零写入 |
| Visual Presentation Adapter | 视觉状态 | Page / Host / Renderer | ADAPT | 只消费 Resume Decision |
| Renderer | 视觉事实 | 用户 | REJECT AS AUTHORITY | 不读取 DOM/Storage |
| DOM `data-*` | 可观测镜像 | Test / QA | REJECT AS INPUT | 不反向控制 Renderer |
| Acceptance / Harness | 辅助验收 | 测试 | ISOLATE | 不作为 Phase 3 生产证据 |
| Gravity Gates | 结构 / 行为约束 | CI | ADAPT LATER | 与原子迁移同提交切换 |

---

## 十四、失败与降级矩阵

| 场景 | 目标结果 | 禁止 |
|---|---|---|
| Admission 缺失 | 返回安全生命空间 | 新建身份 |
| Admission 过期 | 检查 Canonical Growth；无资产则安全返回 | 把过期当明确离开 |
| Identity 失配 | 拒绝 checkpoint / Growth 消费 | 串用其他生命 |
| Pressure provenance 失配 | 拒绝 checkpoint | 只凭最近一次 Pressure 猜测 |
| Checkpoint 缺失 | 温和重进观察 | 伪造已认出 |
| Checkpoint 损坏 | 隔离并温和重进 | 使用部分字段 |
| Checkpoint 写入失败 | 保持当前页可继续；刷新后可能重进 | 显示已永久恢复 |
| Choice 已存在 | 进入现实等待态 | 再次开放 Choice |
| Fact 已存在 | 进入回访 / Formation continuation | 回到观察 |
| Receipt 已存在 | Body Imprint | 再次 Formation |
| 旧标签晚到 | 因 cycle / lineage / revision 不匹配拒绝 | 覆盖新状态 |
| Back / Forward | 重新裁决最新正式事实 | 浏览器 History 直接决定阶段 |
| Reduced Motion | 同一语义、静态呈现 | 使用另一套恢复权威 |
| Storage unavailable | 只读 Growth 若可用，否则安全降级 | 页面布尔值接管 |

---

## 十五、旧路径删除与隔离清单

未来迁移必须原子处理：

### 删除 Authority 身份

- `GravityPage` 的本地状态不再是稳定观察事实；
- `completedDimensionIds` 不再单独放行可恢复的 Choice；
- `committedChoiceActionIntention` 页面本地值不再决定刷新后的阶段；
- Admission revision 不再参与 Observation lineage identity。

### 保留为 Presentation

- `activeDimensionIndex`；
- `completedDimensionIds` 的当次动画投影；
- `executionSnapshot`；
- `innerViewPhase`；
- `cosmicNarrativePhase`；
- 当前节点节奏；
- 当前三次靠近视觉。

### 隔离旧链

- `realityProductionGravityConsumer` 中的旧 `gravityObservationConfirmed` 语义不得自动升级为生产 Recovery Authority；
- `GRAVITY_OBSERVATION_COMPLETED` 架构字符串不得作为当前 Runtime 已实现证据；
- Harness 中的布尔确认不得替代生产浏览器路径；
- Browser History state 不得保存或推进 checkpoint。

### 保持不动

- Gravity Admission Authority；
- Reality / Pressure provenance；
- Canonical Growth IndexedDB；
- Choice、Fact、Eligibility、Receipt、Crystal；
- Returning Surface；
- Renderer 主干；
- Visual Experience MAP 已冻结方向。

---

## 十六、后续原子迁移审计范围

下一张 Migration Audit 必须冻结：

1. 最小 Checkpoint schema；
2. Checkpoint 事件生产者；
3. 稳定 Observation Lineage Reference 的唯一生成者；
4. Gravity Entry Recovery V1 → Encounter Continuity 版本迁移；
5. 2 小时 TTL 与 Refresh / Back / Forward 语义；
6. Growth Canonical Store 的只读查询顺序；
7. `GravityPage` 本地真源删除点；
8. Choice Readiness 消费者切换；
9. 已提交 Choice 的 replay 防线；
10. 旧标签 stale checkpoint 拒绝；
11. Motion / Reduced Motion 同义；
12. Gate 原子切换；
13. 单提交文件边界；
14. 无双 Recovery Authority 的回滚方式。

### 16.1 预估 Runtime 文件边界

后续审计至少需要检查：

```text
src/pages/GravityPage.tsx
src/pages/GravityProductionRouteEntry.tsx
src/components/GravityProductionSurfaceHost.tsx
src/components/RealityGravityInertiaField.tsx
src/services/xinmaiGravityEntryAdmissionController.ts
src/services/xinmaiGravityEntryRecoveryAdapter.ts
src/services/xinmaiChoiceActionIntentionController.ts
src/services/guanyaoDynamicsSixSpaceProgressAdapter.ts
src/types/xinmaiGravityEntryAdmission.ts
src/types/xinmaiGravitySurfaceAdmission.ts
相关 typed recovery / checkpoint 新文件
相关专属 Gate
```

这只是审计清单，不是本刀 Runtime 授权。

### 16.2 原子切换要求

未来不可出现可交付中间态：

```text
新 Checkpoint Authority
+
旧 Page-local Choice Readiness Authority
```

也不可出现：

```text
新稳定 Observation Lineage
+
旧 revision-derived Choice lineage
```

必须在同一 Runtime 提交内：

```text
建立唯一 Continuity Recovery Owner
+
接入最小 Checkpoint
+
切换 Choice 恢复消费者
+
稳定 Observation lineage
+
删除 Page-local 稳定真源
+
建立 replay / stale Gate
```

---

## 十七、Gate 目标

后续 Gate 应保护因果，不冻结精确文案。

### 正向 Gate

- 有效 Admission 可以温和重进；
- `OBSERVATION_RECOGNIZED` 可跨 Refresh 恢复；
- `CHOICE_READY` 可跨 Refresh 恢复；
- Choice 存在时恢复至现实等待；
- Fact / Eligibility 存在时恢复至回访 / Formation；
- Receipt 存在时恢复至 Body Imprint；
- Motion 与 Reduced Motion 产出同一 Resume Decision。

### 负向 Gate

```text
Page Direct Storage Read：
0

Route Direct Storage Read：
0

Renderer Direct Storage Read：
0

DOM → Runtime Authority：
0

Per-dimension Persistence：
0

Animation-frame Persistence：
0

Admission revision → Observation lineage：
0

Choice exists → Gravity replay：
0

Growth Store Write by Gravity Recovery：
0

Second Gravity Recovery Adapter：
0
```

### Stale Gate

- 旧 cycle checkpoint 晚到；
- 旧 admission revision 晚到；
- 旧标签重新提交 Choice；
- identity mismatch；
- Reality / Pressure provenance mismatch；
- TTL expired；
- Browser History 恢复旧 URL；
- Reduced Motion 切换；
- Storage write unconfirmed。

以上均不得推进正式状态。

---

## 十八、真实浏览器验收矩阵

未来 Runtime Delivery 至少必须覆盖：

| 编号 | 路径 | 期望 |
|---:|---|---|
| 1 | 只看开场后 Refresh | 温和重进，不伪造认出 |
| 2 | “这像我”后 Refresh | 恢复已认出，不重复三次靠近 |
| 3 | 自命名后 Refresh | 恢复同一确认语义，不恢复原始临时输入 |
| 4 | Choice Ready 前 Refresh | 恢复必要观察，不保存逐维动画 |
| 5 | Choice Ready 后 Refresh | 直接恢复 Choice 表面 |
| 6 | Choice 提交后 Refresh | 进入现实等待，不回 Gravity |
| 7 | Fact 已确认后打开 `/dynamics` | 进入回访 / Formation，不回 Gravity |
| 8 | Receipt 已存在后打开 `/dynamics` | Body Imprint，不再 Choice |
| 9 | Back / Forward | 每次按最新正式事实裁决 |
| 10 | Direct URL 无 Admission | 安全阻断 |
| 11 | Direct URL 有有效 Recovery | 恢复同一 encounter |
| 12 | TTL 过期 | 不伪造进度，不清除身份与 Growth |
| 13 | 身份失配 | 拒绝恢复 |
| 14 | Pressure provenance 失配 | 拒绝恢复 |
| 15 | 旧标签晚到 | stale 拒绝 |
| 16 | 两标签同一 encounter | 不产生第二 Choice lineage |
| 17 | Motion | 正确恢复 |
| 18 | Reduced Motion | 与 Motion 同一业务语义 |
| 19 | sessionStorage 不可用 | 安全降级，不让页面布尔值接管 |
| 20 | IndexedDB 不可用但无 Growth Asset | 安全降级，不猜测 Choice |
| 21 | Checkpoint 写入未确认 | 不宣称可恢复 |
| 22 | 页面卸载 | 不解释为明确离开 |

每条证据必须记录：

- 入口条件；
- 用户动作；
- Authority 变化；
- Resume Decision；
- 可见结果；
- identity / provenance 是否保持；
- 是否触发 Choice replay；
- 是否触发 Growth write；
- Motion 模式；
- 失败降级。

---

## 十九、对 Visual Experience MAP 的影响

Visual Experience MAP 的四个体验高光保持冻结：

1. 真实生活离场；
2. 回访入口；
3. Crystal 形成归因；
4. Returning Body Imprint。

本 MAP 不推翻视觉方向。

它补充了一条前置门禁：

> Presentation State 必须来自 Typed Resume Decision，不能根据页面初始化状态猜测用户正处于哪一段冒险。

### 视觉 Runtime 继续不得开始的原因

若现在先做视觉 Runtime：

- 刷新后可能把已认出用户重新表现为首次靠近；
- 已提交 Choice 的用户可能再次看到 Choice 动效；
- 已有 Receipt 的用户可能再次看到 Formation 动效；
- Motion 与 Reduced Motion 可能在不同页面本地状态上表现；
- Body Imprint 可能被旧 Gravity 页面覆盖。

因此顺序保持：

```text
Gravity Progress Authority MAP
↓
Atomic Migration Audit
↓
Recovery Authority Runtime Cutover
↓
Independent Closure Revalidation
↓
Visual Major Blade Readiness
```

---

## 二十、产品四问

### 1. 用户有没有参与？

当前周期：YES。

刷新恢复：参与事实未被可靠保留。

### 2. 世界有没有回应？

当前周期：YES。

刷新后：世界无法区分用户已经认出，重复从第一步回应。

### 3. 生命有没有变化？

Choice 之后的 Growth 资产：YES，已有正式 Authority。

Choice 之前的观察变化：仅页面可知。

### 4. 用户有没有留下痕迹？

Choice 及之后：YES。

认出 Gravity、但尚未 Choice：NO AUTHORITY。

这正是本 MAP 识别出的最小权威缺口。

---

## 二十一、刀后交通灯扫描

### 红灯

```text
问题：
Gravity Observation Progress Authority 与 Choice lineage continuity

原因：
状态权威变化
Recovery schema 变化
Page / Host / Controller 责任变化
Choice 消费者变化
旧 revision-derived reference 必须替换
存在双 Choice lineage 风险

分流：
Migration Audit
```

### 黄灯

```text
问题：
Visual Runtime readiness

状态：
继续 DEFER

原因：
必须等待 Recovery Authority 关闭
```

### 既存但不并入本刀

- DOM → Renderer 债务仍禁止扩张；
- `mother-code-profile` 基线门禁漂移继续独立 MAP；
- Crystal 与 Body Imprint 正式截图证据仍待后续生产 Runtime；
- 当前旧六维消费者是否最终保留，需要在体验施工前另行裁决。

以上发现不改变本刀 MAP 完成状态，也没有被顺带修改。

---

## 二十二、下一刀建议

```text
XINMAI-GRAVITY-OBSERVATION-PROGRESS-
RECOVERY-AUTHORITY-ATOMIC-MIGRATION-AUDIT-P0

交通灯：
RED

刀型：
Migration Audit

决策：
NOW — AUDIT ONLY

Runtime / Storage / Gate / Renderer：
DEFER

唯一目标：
冻结从 Page-local Gravity progress 与 revision-derived observation reference，
原子迁移至唯一 Gravity Encounter Continuity Recovery Authority 的完整方案，
证明能够在同一提交中建立最小 checkpoint、稳定 observation lineage、
切换 Choice 恢复消费者并删除旧真源。
```

下一刀必须先回答：

1. Observation Checkpoint 的唯一写入事件；
2. 稳定 Observation Lineage Reference 的唯一生成者；
3. Gravity Recovery envelope 的版本迁移；
4. Choice 已存在时如何绝对阻止 Gravity replay；
5. 当前 V1 Admission Recovery 如何兼容；
6. 页面本地真源删除清单；
7. 单提交文件边界；
8. Gate 原子切换；
9. Safe rollback；
10. 真实浏览器并发与恢复矩阵。

---

## 二十三、最终状态

```text
Gravity Progress Authority MAP：
CLOSED / PASS

当前 Refresh Continuity：
FAIL / ROOT CAUSE CONFIRMED

最小 Checkpoint：
REQUIRED / NOT IMPLEMENTED

唯一 Recovery Owner：
TARGET FROZEN

当前运行真源：
PAGE-LOCAL / MUST MIGRATE

最终交通灯：
RED — ATOMIC MIGRATION AUDIT REQUIRED

Visual Runtime：
DEFER

Phase 3：
ACTIVE / NOT PASSED

Phase 4：
LOCKED
```

最终产品判断：

> XINMAI 不应该把用户送回离开前的动画帧，而应该让同一生命记得：这一次收紧，用户究竟只是看见过，已经认出，已经决定回应，还是已经把回应活成了身体留痕。
