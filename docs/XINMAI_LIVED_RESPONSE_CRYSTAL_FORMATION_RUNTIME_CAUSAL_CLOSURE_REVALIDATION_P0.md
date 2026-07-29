# XINMAI Lived Response · Crystal Formation Runtime Causal Closure Revalidation P0

> 任务编号：`XINMAI-LIVED-RESPONSE-CRYSTAL-FORMATION-RUNTIME-CAUSAL-CLOSURE-REVALIDATION-P0`
> 刀型：MAP / Independent Closure Revalidation
> 决策：`NOW — MAP ONLY`
> Runtime / Gate：只读，禁止修改
> 审计基线：`31efa38e68f9690e27310ca92fa1d416bfdf44ff`
> 主 Layer：Layer 4 Growth / Phase 3
> 保护 Layer：World、Identity、Relationship、Reality provenance
> 边界：Phase 4 Sanctuary

---

## 一、唯一目标

独立复验当前远程提交是否已经形成唯一、可恢复、不可重复的首次成长闭环：

```text
Choice Action Intention
↓
Lived Response Candidate
↓ 用户明确确认
Lived Response Fact
↓
Crystal Eligibility
↓
Deterministic Formation
↓
Formation Receipt
↓
Personality Ring / Archive Projection
```

本刀只回答：

> 用户明确确认的现实回应，是否已经成为唯一能够允许 Crystal 形成的因果来源。

本刀不修改 Runtime、Gate、页面、Recovery、Renderer 或 Crystal，不解锁 Phase 4。

---

## 二、关闭裁决

```text
Lived Response Authority：
PASS

Crystal Eligibility Authority：
PASS

Formation Receipt：
PASS

Legacy Local Authority：
REMOVED FROM EXECUTABLE RUNTIME

Forbidden Consumers：
CLEAR

Lived Response / Crystal Formation Delivery：
CLOSED

Phase 3：
ACTIVE / NOT PASSED

Phase 4：
LOCKED
```

关闭含义：

- 当前 Runtime 只有正式 Authority 链可以形成新 Crystal；
- 用户未行动、拒绝记录、候选未确认或来源失配时均不会形成 Crystal；
- 同一 Eligibility 在刷新、重试和多标签竞争下最多形成一个 Crystal；
- 历史 Crystal 保持可读，但不会反向补造 Fact、Eligibility 或 Receipt；
- Formation 成功不等于 Phase 3 全阶段通过，也不授权 Phase 4 圣所、声轨或长期生态。

---

## 三、当前唯一权威链

### 3.1 Choice Action Intention

权威生产者：

```text
GravityPage
↓ 用户明确确认新的回应
commitChoiceActionIntention()
```

权威事实包括：

- 三项身份引用；
- 来源 `encounterCycleId`；
- Gravity cycle 与 observation reference；
- 行动意愿；
- 形成所需的既有 Hexagram / migration snapshot。

它只表达“我准备尝试什么”，不表达现实中已经发生什么，也不拥有 Crystal Eligibility。

### 3.2 Lived Response Fact

权威生产者：

```text
XinmaiLivedResponseReturnSurface
↓ 用户选择现实结果并明确确认
confirmLivedResponseFact()
```

Authority 只接受：

- `source = xinmai_lived_response_return_surface`；
- 状态为 `AWAITING_USER_CONFIRMATION`；
- 与同一 Choice Intention、身份、Gravity observation 和目标 Reality cycle 完整绑定；
- 用户确认 revision 可验证。

AI 候选、用户拒绝候选、来源不明候选均不能成为 Fact。

### 3.3 Crystal Eligibility

权威生产者：

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
| 未确认 / 用户拒绝 | 不产生正式 Eligibility |

该裁决记录真实尝试，不奖励“成功”，也不惩罚未完成。

### 3.4 Formation Receipt

唯一消费者：

```text
formCrystalFromEligibility()
```

Formation 必须同时满足：

```text
当前 ELIGIBLE revision
+
CONFIRMED Fact
+
同一 Choice Intention
+
三项身份引用一致
+
Gravity observation 一致
+
目标 encounter cycle 一致
+
未存在 Formation Receipt
```

Formation ID、Crystal ID 与 Reservation ID 均从：

```text
crystalEligibilityReferenceId
+
eligibilityRevision
```

确定性派生。

---

## 四、消费者矩阵

| 生产者 | 输出 | 当前直接消费者 | Runtime 状态 | 禁止消费者 |
|---|---|---|---|---|
| Gravity Choice interaction | `ChoiceActionIntention` | Reality continuation、Returning recovery | ✓ | Crystal、Renderer、AI |
| Returning surface | `LivedResponseCandidate` | Lived Response Authority | ✓ | Eligibility、Crystal、Archive |
| Lived Response Authority | `LivedResponseFact` | Crystal Eligibility Authority | ✓ | Renderer、Pressure Seed、Gravity Engine |
| Crystal Eligibility Authority | `CrystalEligibility` | Formation Consumer | ✓ | Choice、页面布尔值、Phase 4 |
| Formation Consumer | `FormationReceipt` | Personality Ring projection | ✓ | 页面资格判断、Renderer |
| Personality Ring projection | 已形成 Crystal 投影 | Archive / Returning memory | ✓ | Eligibility、Fact Authority |
| Recovery Adapter | 恢复候选 Envelope | 各 Authority 的校验读取 | ✓ | Page、Renderer、Presentation 直接读写 |

禁止消费者检查结果：

```text
Pressure Seed：0
Six Dimension：0
Gravity Engine：0
AI Reflection：0
Choice direct formation：0
Renderer eligibility input：0
DOM / data-* authority：0
Timer authority：0
Phase 4 eligibility producer：0
```

---

## 五、旧真源关闭

旧路径：

```text
页面本地 livedResponseRecognized
↓
页面直接放行 Crystal
```

当前复验：

- `GravityPage` 可执行代码中不存在 `livedResponseRecognized`；
- 不存在 `setLivedResponseRecognized`、`revisionActionConfirmed` 或 `ELIGIBLE_BY_USER_RECOGNITION` 成功旁路；
- 旧字段只出现在历史审计文档、禁止性检查标记，以及被注释掉的旧页面片段中；
- Gate 在执行检查前移除块注释，确保注释债务不会被误判为 Runtime；
- Acceptance surface 明确禁止 `livedResponseRecognized` 与直接 `localStorage` 权威。

结论：

```text
Executable Legacy Authority：
0

Formal Eligibility Authority：
1
```

注释中的历史页面片段属于非执行代码债务，不是当前生产消费者；本刀不顺带删除。

---

## 六、Recovery 与原子性

### 6.1 唯一存储边界

`xinmaiLivedGrowthRecoveryPersistenceAdapter` 是以下资产的统一 Recovery Reader / Writer：

- Choice Action Intentions；
- Lived Response Facts；
- Crystal Eligibilities；
- Formation Receipts。

Page、Renderer 与 Crystal Presentation 不直接读写 Recovery Storage。

Envelope 固定：

```text
schemaVersion
revision
noBackfill = true
```

写入要求前置 revision 一致，并执行写后读取确认。

### 6.2 Formation 事务

Formation 使用浏览器排他锁：

```text
xinmai-crystal-formation:
{eligibilityReferenceId}:
{eligibilityRevision}
```

锁内顺序：

```text
读取最新 Envelope
↓
先检查既有 Receipt
↓
ELIGIBLE → FORMATION_PENDING reservation
↓
确定性调用 Crystal Runtime
↓
Eligibility CONSUMED + Receipt 写入同一 Envelope
↓
投影 Personality Ring
```

若锁不可用、Reservation 未确认、Receipt 未确认或来源失配：

```text
SAFE_WITHHELD
```

不得宣称 Crystal 已永久形成。

### 6.3 Projection 失败

Formation Receipt 是形成事实；Archive / Personality Ring 是投影。

投影失败时：

- Receipt 保持；
- projection 标记为 `RETRYABLE`；
- 重试复用同一 Formation ID；
- 不再次 Formation；
- Archive 写入失败不能反向生成第二颗 Crystal。

---

## 七、历史数据与删除语义

### 7.1 No Backfill

当前恢复合同固定：

```text
noBackfill = true
```

历史分类：

| 历史资产 | 当前处理 |
|---|---|
| 已有合法 Crystal | 保留可读 |
| 只有旧页面布尔值 | 不补造 Fact |
| 历史 Choice 无现实事实 | 不补造 Eligibility |
| 身份或 provenance 失配 | 隔离 / SAFE_WITHHELD |
| 无法判断来源 | NO BACKFILL |

### 7.2 删除

形成前：

- 用户可撤回 CONFIRMED Fact；
- 对应未消费 Eligibility 失效；
- 不形成 Receipt；
- 不留下 Crystal。

形成后：

- 已确认 Formation Receipt 不被伪装成已删除；
- Authority 返回 `FORMATION_ALREADY_CONFIRMED`；
- UI 保持最后一个权威事实；
- 不通过页面本地状态制造删除成功。

---

## 八、失败与负向路径

| 场景 | 权威结果 | Crystal |
|---|---|---|
| Candidate 未确认 | `CANDIDATE_NOT_CONFIRMABLE` | 不形成 |
| AI 候选 | `CANDIDATE_NOT_CONFIRMABLE` | 不形成 |
| 用户拒绝记录 | Intention 关闭 | 不形成 |
| 未实际尝试 | `WITHHELD` | 不形成、不惩罚 |
| 实际尝试但结果不同 | `ELIGIBLE` | 可形成 |
| 身份引用失配 | `SAFE_WITHHELD / PROVENANCE_MISMATCH` | 不形成 |
| Fact 写入失败 | 无 CONFIRMED Fact | 不形成 |
| Eligibility 写入失败 | 无正式 Eligibility | 不形成 |
| Formation lock 不可用 | `SAFE_WITHHELD` | 不形成 |
| Reservation 写入失败 | `SAFE_WITHHELD` | 不形成 |
| Receipt 写入失败 | `SAFE_WITHHELD` | 不宣称永久形成 |
| Archive 投影失败 | Receipt `RETRYABLE` | 不重复形成 |
| 旧 Eligibility 重放 | `ALREADY_FORMED` 或拒绝 | 不重复形成 |
| 多标签页竞争 | 同一锁、同一 Receipt | 最多一颗 |
| Reduced Motion | 资格语义不变 | 同一 Formation 规则 |

---

## 九、真实浏览器证据

验收入口为开发环境隔离路由：

```text
/xinmai-lived-growth-acceptance
```

该入口复用生产 Authority、Recovery、Formation Consumer 与 Personality Ring 投影；生产构建门禁确认验收入口不进入生产 bundle。

| 路径 | 用户动作 | 可见结果 | 权威结果 |
|---|---|---|---|
| 正常尝试 | 确认实际尝试并形成 | “成为生命里的一道纹理” | Receipt `1`，Archive 增加 `1` |
| 刷新恢复 | 重新加载同一场景 | 不再出现未消费资格 | Receipt 仍为 `1` |
| 未行动 | 选择“还没有尝试” | “不形成印记，也没有关系” | Receipt `0` |
| 拒绝记录 | 选择“不想记录” | 回访表面安全关闭 | Receipt `0` |
| 改变回应 | 确认现实中用了另一种回应 | 允许形成 | Receipt `1` |
| Reduced Motion | `motion=reduce` | 静态表面可理解 | `data-motion-presentation=STATIC`，Receipt `1` |
| 形成前删除 | 先确认 Fact，再删除 | 返回安全关系空间 | Receipt `0` |
| 双标签竞争 | 两个真实标签同时消费同一 Eligibility | 两侧显示同一 `crystal-formation:c3ds44` | 两侧均见 Receipt `1`，Archive 只增加 `1` |

真实浏览器证明：

```text
同一 Eligibility
→ 最多一份 Formation Receipt
→ 最多一个 Archive 投影
```

Storage 写入失败、锁不可用、身份失配、AI 候选、投影重试与形成后撤回等不可安全通过浏览器 UI 注入的路径，由动态生产 Authority Harness 执行，不以源码字符串代替。

---

## 十、静态、动态与构建证据

审计基线：

```text
31efa38e68f9690e27310ca92fa1d416bfdf44ff
```

结果：

```text
TypeScript：
PASS

Production Build：
PASS

XINMAI Lived Growth Authority Gates：
PASS

全部 scripts/check-xinmai-*.mjs：
PASS

Persistence Boundaries：
PASS

新增失败：
0
```

生产构建仅有既存 chunk-size warning，不影响本次因果关闭。

全量 `check:release` 仍在既存门禁失败：

```text
check:mother-code-profile-persistence-semantics
Gravity delegates input resolution
missing = resolveDynamicsInputContext({
```

该失败：

- 在本次审计开始前已存在；
- 不读取 Lived Response、Eligibility 或 Formation Receipt；
- 不由本次迁移引入；
- 本刀不顺带修改。

---

## 十一、关闭门禁

```text
页面本地 Crystal 资格真源：
0

正式 Lived Response Fact Authority：
1

正式 Crystal Eligibility Authority：
1

Formation Consumer：
1

Formation Receipt：
1

同一 Eligibility 重复 Formation：
0

历史数据 Backfill：
0

身份 / Reality / Gravity provenance 猜测绑定：
0

AI Eligibility Authority：
0

Choice direct Crystal：
0

Phase 4 Eligibility Authority：
0
```

关闭裁决：

```text
Lived Response / Crystal Formation Delivery：
CLOSED
```

---

## 十二、刀后交通灯扫描

### GREEN

- 旧页面布尔真源禁止门禁已成立；
- Acceptance surface 保持开发环境隔离；
- 注释中的旧 Crystal 页面片段可以另开清理小刀，但不影响当前 Runtime。

### YELLOW

`xinmaiLivedGrowthRecoveryPersistenceAdapter` 的通用 Envelope 写入使用 revision 校验与写后确认，但除 Formation 的 Web Lock 外，普通 Fact / Eligibility transaction 没有独立的跨标签原子锁。

当前 Formation 不会因此重复：

- Formation 自身有排他锁与 fencing；
- Receipt 是确定性的；
- 多标签真实浏览器竞争已通过。

但该差异值得独立 MAP：

> 两个已打开的返回表面同时确认或修改同一 Fact 时，Recovery 应如何冻结最后权威 revision、冲突提示与重试语义。

本发现不吞入本刀，也不反向否定当前 Formation Delivery 关闭。

### RED

```text
0
```

未发现双 Formation Authority、第二 Recovery Writer 或需要回退到旧页面布尔真源的红灯。

---

## 十三、下一刀建议

```text
XINMAI-LIVED-GROWTH-RECOVERY-MULTI-TAB-TRANSACTION-SEMANTIC-GATE-MAP-P0

交通灯：
YELLOW

刀型：
MAP / Recovery Concurrency & Truth Review

决策：
NOW — MAP ONLY

Runtime / Gate：
禁止修改

主 Layer：
Layer 4 Growth
```

唯一目标：

> 冻结 Fact、Eligibility 与 Receipt 共用 Envelope 在多标签并发修改时的权威 revision、冲突、重试、恢复与安全扣留语义，判断是否需要独立 Atomic Migration。

阶段状态保持：

```text
Phase 3：
ACTIVE / NOT PASSED

首次成长闭环 Authority：
CLOSED / PASS

Phase 4：
LOCKED
```
