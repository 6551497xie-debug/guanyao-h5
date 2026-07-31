# XINMAI Choice Committed → Returning Lived Response Provenance MAP P0

> 任务编号：`XINMAI-CHOICE-COMMITTED-TO-RETURNING-LIVED-RESPONSE-PROVENANCE-MAP-P0`
>
> 交通灯：YELLOW
>
> 刀型：MAP / Recovery Consumer & Semantic Gate Review
>
> 决策：NOW — MAP ONLY
>
> 远程审计基线：`571758dd7fdb382b63959add1ba9a909e7dbbfc4`
>
> Pointer Candidate：`33ae0ba6cc3fbcd89a511079da46ae1160c83c1f`（HOLD）
>
> Runtime / Gate / Authority / Storage：未修改

---

## 一、最终裁决

```text
主分类：
缺少“明确离场 → Returning Provenance”的正式产品交接

刀后出口：
YELLOW — MAJOR BLADE PREP REQUIRED

Pointer Reachability Core：
CLOSED / PASS

33ae0ba Runtime Delivery：
HOLD / 不独立推送

Lived Response Fact Authority：
KEEP / 不放宽

Phase 3：
ACTIVE / NOT PASSED

Visual Runtime：
DEFER

Phase 4：
LOCKED
```

当前不是单纯的 Consumer 条件写错。

正式代码已经证明：

```text
COMMITTED
≠ AWAITING_RETURN
≠ RETURNING_PROVENANCE
≠ REPORTED
```

但 Returning Surface 当前把三个不同阶段压缩为一个“可以回访”的列表：

```text
COMMITTED
或 AWAITING_RETURN
或 REPORTED
↓
readOpenXinmaiLivedGrowthReturnItems
↓
returningLivedResponseActive = true
↓
直接展示 Lived Response 表单
```

这会产生两种假入口：

1. 只完成 Choice Commitment、尚未进入新 Reality 的用户提前看见回访表单；
2. 已绑定目标 Reality、但没有明确离场与返回证据的用户也可以看见回访表单。

现有 Fact Authority 会拒绝第一种情况，但 UI 已经把错误入口暴露给用户。

---

## 二、四个产品事实

### 2.1 `CHOICE COMMITTED`

产品语义：

> 我选择了准备尝试什么。

当前正式事实：

- 由 `commitChoiceActionIntention` 在 Growth Transaction 内产生；
- 同时消费 `RECOGNIZED` Observation；
- 写入 Choice V2 Route Snapshot；
- `targetEncounterCycleId = null`；
- `state = COMMITTED`；
- 不拥有现实行动、回访或 Crystal 资格。

裁决：`SEMANTICALLY CORRECT / KEEP`

### 2.2 `AWAITING RETURN`

冻结产品语义：

> 我已经明确离开产品，准备去现实中尝试。

当前 Runtime 实际语义：

> Choice 已绑定到一个新建的 Reality Encounter。

当前唯一写入者：

```text
bindChoiceActionIntentionToRealityEncounter
```

它发生在：

```text
requestRealityEncounter(CHOICE_CONTINUATION)
↓
得到 encounterCycleId
↓
Growth Transaction 绑定 targetEncounterCycleId
↓
state = AWAITING_RETURN
↓
navigate('/reality')
```

该提交点早于：

- Reality Host 成功承接；
- 用户明确结束该 Reality Encounter；
- 用户离开产品；
- Returning Life World 成功呈现；
- 用户明确表示“我回来回应这一步”。

因此当前枚举名称与产品语义不一致。

裁决：`RUNTIME FACT EXISTS / PRODUCT SEMANTIC NOT FROZEN`

### 2.3 `RETURNING PROVENANCE`

冻结产品语义：

> 我从该 Choice 对应的行动周期回到了产品。

当前 Runtime：

```text
正式 Authority：NONE
正式 Typed Proof：NONE
Returning Admission：IDENTITY + OPEN GROWTH ITEM ONLY
```

现有 Reality Explicit Leave Delivery 能证明：

- 某个 Reality Encounter 已明确终结；
- 导航请求指向生命世界；
- 同一身份的 Returning Life Surface 已 post-commit 呈现。

但它不能完整证明：

- 终结的 Encounter 属于哪一条 Choice lineage；
- 用户已经进入“现实行动后回访”阶段；
- 普通刷新不是回访；
- 另一个标签页没有抢先打开回访；
- 该 Returning Admission 尚未被消费。

原因：

- Delivery Ticket 不携带 `choiceActionIntentionReferenceId`；
- Delivery Boundary 明确 `noGrowthConsumer: true`；
- Delivery State 是 App 当前生命周期状态，成功后立即回到 `IDLE`；
- Launch 不以 Delivery Ticket 决定 Lived Response Admission；
- 没有独立 Returning Provenance 生命周期。

裁决：`PRODUCT AUTHORITY MISSING`

### 2.4 `LIVED RESPONSE REPORTED`

产品语义：

> 我明确报告了现实中实际发生什么。

当前正式 Authority：

```text
confirmLivedResponseFact
```

它要求：

- 当前 Choice 存在；
- 身份一致；
- `targetEncounterCycleId !== null`；
- Choice 为 `AWAITING_RETURN` 或 `REPORTED`；
- revision 当前；
- 没有 Formation Receipt；
- 用户明确确认 Candidate。

它正确拒绝 `COMMITTED`，也没有把页面可见性当作提交凭证。

但它尚未校验：

- 目标 Reality Encounter 是否真正 `TERMINAL / EXPLICIT_LEAVE`；
- Returning Provenance 是否存在；
- 本次 Returning Admission 是否当前、未消费。

裁决：`CURRENT CORE KEEP / FUTURE INPUT CONTRACT REVIEW REQUIRED`

禁止通过放宽该 Authority 解决页面假入口。

---

## 三、当前真实生产链

### 3.1 Choice 提交

```text
Observation RECOGNIZED
↓
用户选择确定性 Action Route
↓
commitChoiceActionIntention
↓
Choice V2 = COMMITTED
targetEncounterCycleId = null
Observation = CONSUMED_BY_CHOICE
```

事务域：`Canonical Growth Transaction`

裁决：`PASS / KEEP`

### 3.2 Choice Continuation

```text
用户点击“带着这点空间，继续面对现实”
↓
RealityEncounterIntent Controller 生成新 encounterCycleId
origin = CHOICE_CONTINUATION
choiceActionIntentionReferenceId = current Choice
↓
bindChoiceActionIntentionToRealityEncounter
↓
Choice targetEncounterCycleId = 新 encounterCycleId
Choice state = AWAITING_RETURN
↓
navigate('/reality')
```

这里存在两个顺序事务域：

1. Reality Adventure Continuity；
2. Growth Transactional Store。

当前没有把它们误写成一个原子事务。

如果 Reality Intent 创建成功、Choice 绑定失败：

- 新 Intent 可能已经存在；
- Choice 仍为 `COMMITTED`；
- 页面显示“新的现实还没有接住这次回应”；
- 没有 Lived Response 权限。

这不是本刀修复范围，但 PREP 必须决定是否需要补偿与回滚。

### 3.3 Reality Encounter

Choice 绑定成功后，现有 Reality Authority 继续完成：

```text
Route Admission
↓
Typed Surface Outcomes
↓
ACTIVE_IN_REALITY
```

Choice 的 `AWAITING_RETURN` 不等待上述 Active 成立。

因此 `AWAITING_RETURN` 单独不能证明用户真正进入过目标 Reality。

### 3.4 明确离场

当前正式链：

```text
用户明确“这一轮先到这里”
↓
RealityExplicitLeaveRequest
↓
terminateRealityEncounter
↓
Reality Intent = TERMINAL / EXPLICIT_LEAVE
↓
RealityExplicitLeaveNavigationDelivery
↓
/launch-lab
↓
Returning Life World post-commit
↓
LIFE_WORLD_DELIVERED
```

该链正确保护 Reality 离场与同一生命世界交付。

但它明确不消费 Growth，也不推进 Choice 状态。

### 3.5 Returning Surface

当前 Launch 只执行：

```text
恢复同一身份
↓
readOpenXinmaiLivedGrowthReturnItems(identityReferences)
↓
任一 COMMITTED / AWAITING_RETURN / REPORTED
↓
returningLivedResponseActive = true
↓
展示 XinmaiLivedResponseReturnSurface
```

没有消费：

- Reality target Encounter 的 terminal state；
- Choice continuation intent；
- Explicit Leave outcome；
- Life World Delivery ticket；
- Returning Provenance；
- Admission revision。

裁决：`CONSUMER SEMANTIC GAP CONFIRMED`

---

## 四、MAP 必答问题

### Q1：`COMMITTED` 的正式消费位置是什么？

裁决：

```text
COMMITTED
→ Choice Continuation / RESUME_COMMITTED

COMMITTED
→ Lived Response Surface
REJECT
```

合法消费者：

- Gravity Choice Presentation Resolver 的 `RESUME_COMMITTED`；
- 用户明确继续进入 Reality 的入口；
- Growth Terminal Summary；
- 同一 Choice 的只读恢复。

非法消费者：

- Lived Response Candidate；
- Fact Authority Admission；
- Crystal Eligibility；
- Returning Body Imprint。

只从 `readOpen...` 删除 `COMMITTED` 可以关闭假表单，但会让根入口失去“如何继续 Choice”的产品出口，因此不足以作为完整交付。

### Q2：`AWAITING_RETURN` 的唯一生产者是谁？

当前唯一 Runtime 写入者：

```text
bindChoiceActionIntentionToRealityEncounter
```

但它只证明：

```text
Choice 已绑定目标 Encounter
```

不能证明：

```text
用户已经明确离开产品
```

目标产品语义不应由以下对象生产：

- Choice Commit；
- Page；
- Route；
- Timer；
- Browser unload；
- Storage 恢复；
- `navigate('/reality')`；
- Canvas / DOM。

PREP 必须在两种方向中冻结一项：

1. 将当前状态改名或解释为 `BOUND_TO_TARGET_REALITY`，另建正式离场状态；
2. 保留枚举，但增加独立 Typed Departure / Returning Provenance，禁止单独消费 `AWAITING_RETURN`。

### Q3：`targetEncounterCycleId` 在何时生成？

唯一生成者：

```text
RealityEncounterIntent Controller
```

生成时机：

> 已有 `COMMITTED` Choice，用户明确请求继续进入新的 Reality Encounter 时。

绑定事实：

- 同一 Choice reference；
- 同一三项身份引用；
- `origin = CHOICE_CONTINUATION`；
- `qualification = CHOICE_ACTION_INTENTION_COMMITTED`；
- 新 Reality `encounterCycleId`；
- 当前 Intent revision。

禁止由 Page、Returning Surface、Fact Authority 或 Recovery 临时补造。

### Q4：Returning Surface 应消费什么 Typed Provenance？

最低合法方向：

```text
Choice reference / identity
+
targetEncounterCycleId
+
Reality Intent origin = CHOICE_CONTINUATION
+
Reality Intent choice reference = 同一 Choice
+
目标 Encounter 已到达 PREP 冻结的明确离场事实
+
用户明确进入本次回访
↓
Typed Returning Provenance
```

Returning Surface 只能消费 Typed Admission Decision：

```text
RESUME_COMMITTED
AWAITING_REAL_WORLD_RESPONSE
READY_TO_REPORT
REPORTED
SAFE_WITHHELD
```

Page 不得直接联查两个 Storage，也不得自行拼布尔值。

当前没有这样的 Adapter / Controller / Proof。

### Q5：刷新与回访如何区分？

冻结：

```text
Choice 提交后的刷新
→ RESUME_COMMITTED
→ 不展示 Lived Response
```

```text
Choice 已绑定但 Reality 尚未正式承接
→ SAFE_WITHHELD / 继续同一事务
→ 不展示 Lived Response
```

```text
Reality 页面刷新 / Back / Forward
→ 恢复同一 target Encounter
→ 不自动成为 Returning Provenance
```

```text
页面关闭、App 切后台、网络断开、浏览器崩溃
→ 不是明确离场
→ 不是 Returning Provenance
```

系统不能根据时间经过、重新打开或路径位置推断用户已经行动。

### Q6：用户改变、延后或拒绝如何处理？

#### 在 `COMMITTED` 阶段

- 恢复同一 Choice；
- 可继续离场；
- 是否允许改选 Route 需独立协议；
- 不生成 Fact；
- 不生成 Eligibility；
- 不生成 Crystal。

#### 在正式 `AWAITING RETURN` 阶段

- 可以暂时不回访；
- 不惩罚；
- 不关闭同一 lineage；
- 不由系统推测尝试已发生。

#### 在 `READY_TO_REPORT` 阶段

- `NOT_ATTEMPTED`、`CHANGED_RESPONSE`、`UNABLE_TO_CONTINUE` 是合法用户报告方向；
- `USER_REJECTED_RECORD` 关闭或延后记录，但不生成 Fact / Crystal；
- 任何结果都不能由 AI 决定。

当前 `closeChoiceActionIntentionWithoutRecord` 可以安全关闭 lineage，但它不能替代 Returning Provenance。

### Q7：多标签与旧周期如何保护？

最低门禁：

- 同一 Choice 只能绑定一个 `targetEncounterCycleId`；
- Returning Proof 必须携带 Choice、target cycle、identity 与 revision；
- 旧标签的 `COMMITTED` 快照不能打开回访；
- 旧 target encounter terminal outcome 不能授权新 Choice；
- 新 Choice 不得复用旧 Returning Proof；
- 已消费 Returning Admission 不得生成第二 Fact revision；
- Recovery unavailable / corrupted 一律 `SAFE_WITHHELD`；
- 页面不得把 `readOpen...` 返回非空作为 Admission Authority。

现有 Growth Transaction 与 Reality Continuity 各自具备 fencing，但缺少跨域 Typed Provenance Join。

---

## 五、生产者与消费者矩阵

| 生产者 / 消费者 | 当前事实 | 裁决 |
|---|---|---|
| Choice Action Intention Controller | 生产 `COMMITTED` | KEEP |
| Gravity Choice Presentation Resolver | `RESUME_COMMITTED` | KEEP |
| Reality Encounter Intent Controller | 生成 target cycle 与 Choice-linked Intent | KEEP |
| `bindChoiceActionIntentionToRealityEncounter` | 写 target cycle，并过早命名为 `AWAITING_RETURN` | ADAPT / PREP |
| Reality Route / Host | 承接目标 Encounter | KEEP |
| Reality Explicit Leave Termination | 生产 terminal `EXPLICIT_LEAVE` | KEEP |
| Explicit Leave Navigation Delivery | 证明生命世界 post-commit 交付，不消费 Growth | KEEP / INPUT CANDIDATE |
| `readOpenXinmaiLivedGrowthReturnItems` | 同时返回 `COMMITTED / AWAITING_RETURN / REPORTED` | MIGRATE |
| Launch Returning Surface | 身份恢复后直接展示表单 | MIGRATE |
| Lived Response Fact Authority | 拒绝 `COMMITTED`，接收 AWAITING/REPORTED | KEEP CORE / REVIEW PROVENANCE INPUT |
| Crystal Eligibility / Formation | 只消费正式 Fact / Eligibility | KEEP |
| Growth Transactional Store | Choice 与 Fact 长期资产 | KEEP |
| Reality Adventure Continuity Store | Encounter lifecycle | KEEP |
| Page / Route Boolean | 不得成为 Provenance | REJECT |
| DOM / Canvas / Timer | 不得成为 Provenance | REJECT |
| Browser refresh / unload | 不得成为离场事实 | REJECT |
| AI | 不得确认离场或回访 | REJECT |

---

## 六、Gate 缺口

当前 Gate 分别保护：

- Choice Authority；
- Choice Presentation；
- Reality Encounter Intent；
- Explicit Leave Termination；
- Life World Delivery；
- Lived Response Fact；
- Growth Transaction。

但没有门禁保护：

```text
COMMITTED 不得进入 Lived Response Surface
```

也没有门禁保护：

```text
AWAITING_RETURN 单独不足以形成 Returning Provenance
```

未来至少需要：

- Committed Choice Returning False Entry Forbidden Gate；
- Target Encounter / Choice Lineage Match Gate；
- Explicit Departure Required Gate；
- Returning Provenance Admission Gate；
- Refresh Is Not Return Gate；
- Multi-tab Stale Returning Proof Gate；
- Lived Response Authority Provenance Alignment Gate。

本刀不修改 Gate。

---

## 七、方案比较

### Option A｜只从 Returning 列表排除 `COMMITTED`

优点：

- 立即关闭已确认假表单；
- 不改 Authority；
- 变更范围小。

不足：

- 根入口无法告诉 `COMMITTED` 用户如何继续；
- `AWAITING_RETURN` 仍可在未明确离场时打开表单；
- 没有 Returning Provenance；
- 不能关闭 Phase 3 P1。

裁决：`NECESSARY BUT INSUFFICIENT`

### Option B｜Typed Returning Provenance + 分态恢复

目标：

```text
COMMITTED
→ RESUME_COMMITTED

目标 Reality 尚未承接 / 尚未明确离场
→ AWAITING_REAL_WORLD_RESPONSE 或 SAFE_WITHHELD

Choice + target Encounter + explicit departure + current return action
→ READY_TO_REPORT

Fact / Eligibility / Receipt
→ 对应 Growth Terminal 恢复
```

优点：

- 四个产品事实不再混用；
- 可以复用现有 Choice、Intent、Termination 与 Growth Authority；
- Page 只消费 typed decision；
- 不需要放宽 Fact Authority。

待 PREP 冻结：

- 明确离场的产品动作；
- 用户何时明确表示“回来回应”；
- Typed Proof 是否需要最小持久化；
- 两个 Canonical Store 如何由只读 Adapter 联合校验；
- 当前 `AWAITING_RETURN` 是否改名或保留兼容语义；
- Cross-store failure 的补偿边界。

裁决：`RECOMMENDED / MAJOR PREP REQUIRED`

### Option C｜让 `COMMITTED` 直接可确认 Fact

后果：

- Choice 等价于现实行动；
- 刷新等价于回访；
- Crystal Eligibility 可被点击链提前推进；
- 破坏 Phase 3 核心因果。

裁决：`REJECT`

### Option D｜用等待时长、路由或浏览器生命周期推断返回

裁决：`REJECT`

---

## 八、`33ae0ba…` 交付裁决

```text
Pointer 修正本身：
VALID / KEEP

独立 Push：
HOLD
```

原因：

- Pointer 修正没有制造假入口；
- 假入口在修正前已经可见，但因 Canvas 被遮挡而不可操作；
- 推送 Pointer 修正会把现有错误 Consumer 从“可见但不可点”变成“可见且可触发 Authority 拒绝”；
- 用户体验会从静默不可达变成正式失败反馈；
- 在 Consumer Admission 收束前不应独立开放。

未来交付方向：

```text
33ae0ba 的两项最小差异
+
PREP 后获授权的 Returning Admission 修正
↓
形成新的、可独立审查的交付候选
```

禁止：

- 直接 push `33ae0ba`；
- 丢弃其命中修正；
- 普通 revert 恢复 Canvas 遮挡；
- 以 Canvas 遮挡充当假入口门禁；
- 将 Pointer 修正与未冻结的 Authority 迁移混为一笔无边界提交。

---

## 九、为什么当前出口不是 GREEN

若只存在：

```text
合法 Returning Provenance 已经成立
但 Consumer 多包含了 COMMITTED
```

则可以进入绿色 Consumer Refinement。

当前实际情况是：

```text
COMMITTED 有正式 Authority
target Encounter 有正式 Authority
Explicit Leave 有正式 Authority
Life World Delivery 有正式 Authority

但：
RETURNING PROVENANCE 无正式 Authority / Typed Proof
```

并且当前 `AWAITING_RETURN` 的生产时点早于产品冻结的“明确离场”。

因此绿色条件不成立。

---

## 十、为什么当前出口不是直接 RED

本刀未发现两个对象同时拥有同一 Returning Provenance 写权。

当前是：

- Choice Authority 拥有 Choice；
- Reality Intent Authority 拥有 Encounter；
- Explicit Leave Authority 拥有终结；
- Returning Surface 缺少合法联合消费协议。

尚未冻结：

- 是否新增持久化事实；
- 是否改变 Growth 状态机；
- 是否需要跨 Store 原子提交；
- 是否仅需要 typed derived proof。

在产品语义和责任边界冻结前，直接进入 Migration Audit 无法形成可靠原子方案。

因此先进入黄色 Major Blade Prep。

如果 PREP 证明必须：

- 替换 `AWAITING_RETURN` Runtime 真源；
- 在 Growth 与 Reality 两个 Store 间新增原子写入；
- 迁移 Existing Choice 数据；
- 改变 Explicit Leave 的持久化责任；
- 同提交切换多条恢复链；

则下一步必须升级红色 Migration Audit。

---

## 十一、下一刀

```text
XINMAI-CHOICE-DEPARTURE-RETURNING-
PROVENANCE-AUTHORITY-MAJOR-BLADE-PREP-P0

交通灯：
YELLOW

刀型：
Major Blade Prep

决策：
NOW — PREP ONLY

Runtime / Gate / Storage：
DEFER
```

PREP 必须冻结：

1. Choice Continuation 的正式恢复入口；
2. “去真实生活”明确动作；
3. 当前 `AWAITING_RETURN` 是改名、兼容还是迁移；
4. Returning Provenance 的唯一所有者；
5. 用户明确回访动作；
6. Typed Admission 五态；
7. target Encounter terminal proof；
8. 刷新、重开、多标签与旧周期矩阵；
9. 是否需要最小持久化；
10. Consumer 切换与回滚单位；
11. `33ae0ba` 如何进入最终交付；
12. 是否升级 Migration Audit。

---

## 十二、独立黄灯

以下问题继续独立，不混入本 MAP：

```text
Returning Lived Response Reduced Motion typed mirror：
YELLOW / PRESENTATION PARITY MAP
```

以下讨论继续保持：

```text
XINMAI Life Observation Ontology：
DISCUSSION RECORDED / NO RUNTIME ACTION
```

---

## 十三、最终输出

```text
COMMITTED 正式消费者：
Choice Continuation / RESUME_COMMITTED

COMMITTED → Lived Response：
REJECT

当前 AWAITING_RETURN 写入者：
bindChoiceActionIntentionToRealityEncounter

当前 AWAITING_RETURN 产品语义：
NOT SUFFICIENT

targetEncounterCycleId 生成者：
RealityEncounterIntent Controller

Returning Provenance Authority：
MISSING

Returning Surface Admission：
IDENTITY-ONLY + OPEN-ITEM / INSUFFICIENT

Refresh Is Return：
REJECT

Fact Authority：
KEEP / DO NOT LOOSEN

33ae0ba：
VALID / DELIVERY HOLD

最终出口：
YELLOW — MAJOR BLADE PREP REQUIRED

下一刀：
XINMAI-CHOICE-DEPARTURE-RETURNING-
PROVENANCE-AUTHORITY-MAJOR-BLADE-PREP-P0

Phase 3：
ACTIVE / NOT PASSED

Visual Runtime：
DEFER

Phase 4：
LOCKED
```
