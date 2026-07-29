# XINMAI Lived Response · Crystal Formation Runtime Causal Closure Revalidation P0

> 任务编号：`XINMAI-LIVED-RESPONSE-CRYSTAL-FORMATION-RUNTIME-CAUSAL-CLOSURE-REVALIDATION-P0`
> 刀型：MAP / Independent Closure Revalidation
> 决策：`NOW — MAP ONLY`
> Runtime / Gate：只读，禁止修改
> 审计基线：`96352a7653fc538ca538e8e5079d7376a0822a59`
> 远程分支：`origin/codex/genesis-28-mansion-production-continuity`
> 主 Layer：Layer 4 Growth / Phase 3
> 保护 Layer：World、Identity、Relationship、Reality provenance
> 边界：Phase 4 Sanctuary

---

## 一、唯一目标

独立复验当前远程 Runtime 是否形成完整、唯一、可恢复且不把“选择”伪装成“活出来”的首次成长因果：

```text
Choice Action Intention
↓
用户离开 XINMAI 并回到现实
↓
Returning Life World 恢复同一生命
↓
Lived Response Candidate
↓ 用户明确确认
Lived Response Fact
↓
Crystal Eligibility
↓ 用户明确选择沉积
Deterministic Crystal Formation
↓
Formation Receipt
↓
Canonical Projection
↓
Derived Archive Mirror
↓
同一生命身体上的成长纹理
```

本刀只回答：

> 用户明确确认的现实回应，是否是当前唯一能够允许 Crystal 形成并在返回后被同一生命恢复的因果来源。

本刀不修改 Runtime、Gate、Renderer、Recovery 或 Crystal，不裁决完整 Phase 3 是否通过，不解锁 Phase 4。

---

## 二、独立关闭裁决

```text
Choice Action Intention：
PASS

Returning Life Recovery：
PASS

Lived Response Fact Authority：
PASS

Crystal Eligibility Authority：
PASS

Crystal Formation / Receipt：
PASS

Canonical Recovery：
PASS

User-visible Growth Trace：
PASS

Forbidden Consumers：
CLEAR

Lived Response / Crystal Formation Delivery：
CLOSED

Phase 3：
ACTIVE / NOT PASSED

Phase 4：
LOCKED
```

`CLOSED` 的含义仅限：

- Choice 只产生行动意愿，不直接产生 Crystal；
- 用户返回后必须亲自确认实际发生事实；
- 未行动、无法继续或拒绝记录时不形成 Crystal，也不受惩罚；
- 实际尝试、完成原回应或作出另一种真实回应时，可以形成 Eligibility；
- 同一 lineage 最多形成一颗 Crystal；
- Formation 成功、Receipt、Crystal 与 Canonical Projection 在同一 IndexedDB 正式事务中提交；
- 刷新后恢复的是同一个 Canonical Fact、Eligibility、Receipt 与 Crystal；
- Derived Archive 投影失败不能重新 Formation；
- 用户能看见“这次真实回应已经成为生命纹理”，返回生命世界后同一身体恢复该纹理。

它不代表：

- Reality Adventure 全部体验已完成；
- Phase 3 已通过；
- Crystal 圣所、星轨、声音、长期养成或商业化已授权；
- Phase 4 已解锁。

---

## 三、旧审计语义校准

本文件旧版本记录的是：

```text
31efa38
+
Web Lock
+
localStorage Growth Envelope Authority
```

该方案已被后续 lost-write 审计和 `96352a7` Corrective Runtime 取代，不再是当前生产事实。

当前冻结：

```text
localStorage Growth Mutation Authority：
0

IndexedDB Canonical Transaction Authority：
1

成功提交点：
IDBTransaction complete

V1 localStorage：
READ_ONLY / NO_BACKFILL
```

Web Lock 不再生产 revision、fencing token、Receipt 或成功状态。当前跨标签真实性来自 IndexedDB 重叠 `readwrite` 事务的串行调度与原子提交。

---

## 四、当前唯一产品因果

### 4.1 Choice Action Intention

权威生产者：

```text
GravityPage
↓ 用户明确确认一个不同回应
commitChoiceActionIntention()
```

Choice 记录：

- 三项身份引用；
- 来源 `encounterCycleId`；
- Gravity cycle；
- Gravity observation reference；
- 用户愿意尝试的行动；
- 形成所需的既有来源快照。

Choice 不记录：

- 现实行动已经发生；
- 行动是否成功；
- Crystal Eligibility；
- Crystal Formation。

随后 `bindChoiceActionIntentionToRealityEncounter()` 把同一行动意愿绑定到新的 Reality encounter。绑定失败时不伪造返回事实。

### 4.2 Returning Life Recovery

老用户回到 Launch 返回空间后：

```text
同一身份引用恢复
↓
readOpenXinmaiLivedGrowthReturnItems()
↓
只读取该生命尚未形成 Receipt 的 Choice lineage
↓
XinmaiLivedResponseReturnSurface
```

身份不一致时不会读取其他生命的 Choice、Fact、Eligibility 或 Receipt。

已有 Receipt 的 lineage 被过滤，不会在刷新或回归后重复要求用户形成同一 Crystal。

### 4.3 Lived Response Candidate

Candidate 由返回表面在当前交互周期生成，只表达：

> 用户准备确认“现实中实际发生了什么”。

允许结果：

```text
NOT_ATTEMPTED
ATTEMPTED
COMPLETED_AS_INTENDED
CHANGED_RESPONSE
UNABLE_TO_CONTINUE
```

原始短文本可以为空；文本本身不是 Eligibility。AI 不确认事实，也不判断行动是否足够优秀。

### 4.4 Lived Response Fact

唯一生产者：

```text
用户明确点击“确认这是实际发生的”
↓
confirmLivedResponseFact()
```

Authority 必须校验：

- Candidate 来源是正式 Returning Surface；
- Candidate 状态为 `AWAITING_USER_CONFIRMATION`；
- Choice Intention 存在；
- 身份引用一致；
- source / target encounter 一致；
- Gravity cycle 与 observation reference 一致；
- intention revision 与 fact revision 未过期；
- 当前 lineage 尚未形成 Receipt。

Fact 明确记录：

```text
confirmationAuthority = USER_EXPLICIT_CONFIRMATION
noAiConfirmation = true
noObjectiveRealityClaim = true
```

系统确认的是“用户明确确认了这项事实”，不是对用户现实生活进行客观监控。

### 4.5 Crystal Eligibility

唯一生产者：

```text
CONFIRMED Lived Response Fact
↓
resolveCrystalEligibilityForFact()
```

正式裁决：

| Lived Response | Eligibility |
|---|---|
| `ATTEMPTED` | `ELIGIBLE` |
| `COMPLETED_AS_INTENDED` | `ELIGIBLE` |
| `CHANGED_RESPONSE` | `ELIGIBLE` |
| `NOT_ATTEMPTED` | `WITHHELD` |
| `UNABLE_TO_CONTINUE` | `WITHHELD` |
| Candidate 未确认 | 不产生正式 Eligibility |
| 用户拒绝记录 | 不产生 Fact 或 Eligibility |

因此 Crystal 记录的是被活出来的回应，不奖励任务成功，也不惩罚未完成。

### 4.6 Formation Receipt

唯一消费者：

```text
formCrystalFromEligibility()
```

Formation 必须同时满足：

```text
当前 ELIGIBLE revision
+
当前 CONFIRMED Fact
+
同一 Choice Intention
+
三项身份引用一致
+
Gravity observation 一致
+
目标 encounter 一致
+
该 lineage 尚无 Receipt
```

Formation、Crystal 与 Reservation ID 由：

```text
crystalEligibilityReferenceId
+
eligibilityRevision
```

确定性派生。

若 lineage 已存在 Receipt：

```text
ALREADY_FORMED
```

恢复同一事实，不形成第二颗。

---

## 五、事务真实性与恢复

### 5.1 Canonical Authority

唯一 Growth mutation 入口：

```text
executeXinmaiLivedGrowthTransaction()
↓
transactXinmaiLivedGrowthCanonicalState()
↓
IndexedDB readwrite transaction
```

正式事务内完成：

```text
读取最新 Canonical Envelope
↓
校验 Identity / Provenance / Revision
↓
推进 Canonical revision
↓
Eligibility → CONSUMED
↓
写 Formation Receipt
↓
写 formed Crystal
↓
重建 Eligibility / Formation / Canonical Projection 索引
↓
IDBTransaction complete
↓
返回 COMMITTED
```

以下均不是成功：

- request success；
- 页面按钮已禁用；
- Web Lock callback 已结束；
- localStorage 自读回；
- DOM 节点出现；
- 固定计时器结束；
- Derived Archive 已尝试写入。

### 5.2 V1 数据

V1 localStorage：

```text
保留原始数据
只读
NO BACKFILL
```

首次导入校验原始字符串与 digest，并在同一 IDB 事务记录 Migration Meta。

以下情况进入 `SAFE_WITHHELD`：

- V1 导入期间数据变化；
- V1 冲突；
- cutover 后旧 V1 Writer 再次写入；
- Canonical 唯一性冲突；
- IDB open / blocked / abort / connection failure。

不会删除、重写或根据时间猜测历史赢家。

### 5.3 Projection

Canonical Projection 与 Receipt 在正式 IDB 事务域内形成。

`guanyao:personalityRingLite` 只作为 Derived Mirror：

```text
Receipt 已形成
↓
尝试投影 Archive
```

投影失败：

```text
projection = RETRYABLE
```

它不会：

- 回滚已经形成的 Crystal；
- 再次消费 Eligibility；
- 产生第二 Receipt；
- 让页面把镜像成功当成 Formation Authority。

---

## 六、生产者—消费者矩阵

| 生产者 | 输出 | 直接消费者 | 权威状态 | 禁止消费者 |
|---|---|---|---|---|
| Gravity Choice interaction | `ChoiceActionIntention` | Reality continuation、Returning recovery | ✓ | Crystal、Renderer、AI |
| Returning Life Recovery | Open lineage | Returning Surface | ✓ | Pressure Seed、Gravity Engine |
| Returning Surface | `LivedResponseCandidate` | Lived Response Authority | 临时候选 | Eligibility、Crystal、Archive |
| Lived Response Authority | `LivedResponseFact` | Eligibility Authority | ✓ | Renderer、Pressure Seed、AI |
| Eligibility Authority | `CrystalEligibility` | Formation Consumer | ✓ | Choice、页面布尔值、Phase 4 |
| Formation Consumer | `FormationReceipt + formedCrystal` | Canonical Projection、Derived Archive | ✓ | 页面资格判断、计时器 |
| IDB Canonical Store | Envelope + indexes | Authority readers、Returning recovery | ✓ | Page / Renderer 直接写入 |
| Derived Archive Mirror | Crystal 投影 | Returning body imprint | 非权威投影 | Eligibility、Fact Authority |

禁止消费者复验：

```text
Pressure Seed：
0

Six Dimension：
0

AI Reflection：
0

Choice direct Crystal：
0

Renderer Eligibility Authority：
0

DOM / data-* Authority：
0

Timer Authority：
0

Phase 4 Eligibility Producer：
0
```

Renderer 与返回视觉可以展示已确认投影，但不拥有 Fact、Eligibility、Receipt 或 Formation 状态。

---

## 七、用户参与与获得感

本次闭环不是后台自动生成：

```text
用户曾经选择一个现实回应
↓
用户真实离开并返回
↓
用户选择实际发生的结果
↓
用户明确确认事实
↓
用户再次选择“让这次回应留在生命里”
```

形成后界面只在正式事务完成后显示：

> 这次真实回应，已经成为生命里的一道纹理。

返回同一生命世界后：

- 已形成 lineage 不再重复出现；
- Derived Archive 恢复同一 Crystal；
- Launch 返回空间把最新印记投射回同一生命身体；
- 印记语义是 `LIFE_TEXTURE_NOT_COLLECTIBLE`；
- 历史印记是记忆，不会被误当成当前 Reality。

这构成 Phase 3 最小首次获得感：

> 我在现实里做出的回应，真的让我的生命世界留下了变化。

它不是宝箱、胜利奖励、连续签到或 Phase 4 长期收藏生态。

---

## 八、真实浏览器路径

验收来源：

```text
远程 HEAD：
96352a7653fc538ca538e8e5079d7376a0822a59

隔离开发入口：
/xinmai-lived-growth-acceptance
```

该入口复用正式 Choice、Fact、Eligibility、Formation、IDB Recovery 与 Archive 投影；生产包检查确认开发 Acceptance 不进入 Production Bundle。

### 路径 A：实际尝试

```text
准备真实行动回访
↓
选择“我试着做了”
↓
明确确认
↓
Fact 1 / Eligibility 1 / Receipt 0
↓
选择“让这次回应留在生命里”
↓
Receipt 1 / Archive 1 / Projection PROJECTED
↓ 刷新
Receipt 1 / Archive 1 / Projection PROJECTED
```

结果：`PASS`

### 路径 B：尚未行动

```text
选择“这一次还没有尝试”
↓
明确确认
↓
WITHHELD
↓
Receipt 0
↓
显示“继续同行”
```

没有 Formation 按钮，没有失败、断签、惩罚或星兽恶化。

结果：`PASS`

### 路径 C：拒绝记录

```text
选择“我不想记录这次”
↓
Fact 0
Eligibility 0
Receipt 0
↓
返回表面安全关闭
```

结果：`PASS`

### 路径 D：现实中改变回应

```text
选择“现实里，我用了另一种回应”
↓
明确确认
↓
Eligibility 1 / Receipt 0
↓
正式形成
↓
Receipt 1 / Projection PROJECTED
```

系统没有要求结果必须符合原计划。

结果：`PASS`

### 并发、失败与无障碍矩阵

Transactional Persistence 独立关闭复验已在同一远程 SHA 证明：

- 同一 Fact 双标签确认不会产生第二 Authority；
- 同一 Eligibility 并发形成，最终 Receipt / Crystal / Projection 各 1；
- 不同 lineage 并发均保留，无 lost write；
- Formation 后 stale 标签不能再次确认；
- transaction abort、connection close、quota、open failure 无伪成功；
- Projection failure 只重试投影；
- V1 import conflict 与旧 Writer 进入 `SAFE_WITHHELD`；
- Reduced Motion 不改变业务资格或 Formation 真实性；
- 刷新恢复与 Canonical State 一致。

---

## 九、删除、修改与失败真实性

### Formation 前

- 用户可以撤回已确认 Fact；
- 未消费 Eligibility 失效；
- 不形成 Receipt；
- 不留下 Crystal；
- 写入未确认时 UI 不宣称删除成功。

### Formation 后

- Receipt 是已确认形成事实；
- 删除请求返回 `FORMATION_ALREADY_CONFIRMED`；
- UI 明确说明“没有被伪装成已删除”；
- 已形成 Crystal 不会因 Derived Archive 临时失败而丢失；
- 重试只修复投影。

### 失败时

任何 Authority、存储、身份、provenance 或事务失败都不得：

- 自动生成 Fact；
- 自动生成 Eligibility；
- 自动生成 Crystal；
- 清除身份与关系；
- 阻断用户回到安全生命空间；
- 恢复旧页面 `livedResponseRecognized` 真源。

---

## 十、静态、构建与远程证据

```text
远程 HEAD：
96352a7653fc538ca538e8e5079d7376a0822a59

远程干净快照：
PASS

TypeScript：
PASS

Production Build：
PASS

XINMAI Lived Growth Authority Gates：
PASS

全部 XINMAI Gates：
45 / 45 PASS

Production Bundle Acceptance Isolation：
PASS

新增失败：
0
```

生产构建只有既存 chunk-size warning。

全量历史 `check:release` 仍有基线门禁漂移：

```text
check:mother-code-profile-persistence-semantics
Gravity delegates input resolution
missing = resolveDynamicsInputContext({
```

裁决：

```text
YELLOW / MAP
```

该漂移在 `b78c93b` 已存在，与 Lived Response、Eligibility、IDB Transaction 或 Formation 不属于同一回滚单位；本刀不顺带修复，也不宣称全仓历史门禁零失败。

---

## 十一、关闭门禁

```text
Choice 直接形成 Crystal：
0

页面本地 livedResponseRecognized Authority：
0

正式 Lived Response Fact Authority：
1

正式 Crystal Eligibility Authority：
1

IndexedDB Canonical Mutation Authority：
1

localStorage Growth Mutation Authority：
0

Formation Consumer：
1

Transaction Complete 成功点：
1

同一 lineage 重复 Receipt：
0

不同 lineage lost write：
0

历史 Fact / Eligibility / Receipt Backfill：
0

身份 / Reality / Gravity 猜测绑定：
0

AI Eligibility Authority：
0

Phase 4 Eligibility Authority：
0
```

最终裁决：

```text
Lived Response / Crystal Formation Runtime Causal Delivery：
CLOSED
```

---

## 十二、刀后交通灯扫描

### GREEN

- 旧页面布尔资格真源已经退出可执行 Runtime；
- Formation Receipt 与 Canonical Recovery 真实一致；
- Acceptance 继续保持开发环境隔离；
- Projection failure 不会重复 Formation。

### YELLOW

本刀只关闭首次成长因果，不足以直接宣布 Phase 3 通过。

下一步需要把以下已经分别关闭的资产放进一条真实用户旅程中复验：

```text
Reality Encounter
↓
Pressure Recognition
↓
Gravity Observation
↓
Choice Action Intention
↓
Real-world Return
↓
Lived Response Fact
↓
Crystal Formation
↓
Returning Body Imprint
```

重点不是再次审计存储，而是判断：

- 用户是否在不依赖开发 Acceptance 的生产路径中理解每一步；
- 从 Choice 到现实返回是否存在断裂或过度摩擦；
- Crystal 形成反馈和身体印记是否提供足够但不过度奖励化的获得感；
- Phase 3 是否达到完整 Definition of Done。

### RED

```text
0
```

未发现双 Authority、第二 Growth Recovery Writer、重复 Formation 或 Phase 4 越权。

---

## 十三、下一刀建议

```text
XINMAI-PHASE-3-REALITY-ADVENTURE-END-TO-END-CLOSURE-AUDIT-P0

交通灯：
YELLOW

刀型：
MAP / Phase Closure Audit

决策：
NOW — MAP ONLY

Runtime / Gate：
禁止修改

主 Layer：
Layer 4 Growth

保护：
World + Identity + Relationship

Phase 4：
LOCKED
```

唯一目标：

> 在正式生产路径中端到端复验 Reality → Gravity → Choice → Real-world Return → Crystal → Returning Body Imprint，并裁决 Phase 3 能否从 `ACTIVE / NOT PASSED` 进入 `PASSED`。

当前阶段保持：

```text
Phase 3：
ACTIVE / NOT PASSED

首次成长因果：
CLOSED / PASS

Phase 4：
LOCKED
```
