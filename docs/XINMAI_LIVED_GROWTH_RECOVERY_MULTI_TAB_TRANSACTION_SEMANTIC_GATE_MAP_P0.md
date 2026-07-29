# XINMAI Lived Growth Recovery Multi-Tab Transaction Semantic Gate Map P0

> 任务编号：`XINMAI-LIVED-GROWTH-RECOVERY-MULTI-TAB-TRANSACTION-SEMANTIC-GATE-MAP-P0`
> 交通灯：YELLOW
> 刀型：MAP / Recovery Concurrency & Truth Review
> 决策：`NOW — MAP ONLY`
> Runtime / Gate：禁止修改
> 审计基线：`675b1d976e620f05fd8ae5ce56710e01fb557839`
> 主 Layer：Layer 4 Growth
> 保护 Layer：World、Identity、Relationship、Reality provenance
> 阶段：Phase 3 `ACTIVE / NOT PASSED`，Phase 4 `LOCKED`

---

## 一、唯一目标

冻结以下资产共用 Growth Recovery Envelope 时的多标签语义：

```text
Choice Action Intention
+
Lived Response Fact
+
Crystal Eligibility
+
Formation Receipt
```

本刀回答：

1. 当前 Envelope revision 是否能够作为跨标签原子提交权威；
2. 两个已打开的返回表面能否同时推进同一 Fact lineage；
3. Fact revision 在 Formation 前后分别允许什么；
4. 不同 Eligibility 并发 Formation 是否共享同一个存储事务边界；
5. 冲突、失败、重试和恢复时 UI 应呈现哪个已确认事实；
6. 下一刀属于绿色小修、Major Blade Prep 还是 Migration Audit。

本刀不修改 Adapter、Controller、页面、Gate、Storage、Formation 或 Archive。

---

## 二、最终裁决

```text
同一 Eligibility 幂等 Formation：
PASS

同一 Choice Fact lineage 终态：
FAIL / NOT FROZEN

Growth Envelope 跨标签原子提交：
PARTIAL

冲突可观察性：
INSUFFICIENT

第二 Recovery Writer：
未发现

第二 Eligibility Authority：
未发现

主分类：
D｜产品生命周期语义缺口

并存：
C｜消费者与事务责任漂移

当前决策：
YELLOW → MAJOR BLADE PREP REQUIRED
```

该结论不推翻已经证实的：

```text
同一个 crystalEligibilityReferenceId
+
同一个 eligibilityRevision
→ 最多一份 Formation Receipt
```

但它确认当前没有保护更上层的：

```text
同一个 Choice Action Intention
+
同一个 Reality / Gravity provenance
→ Formation 后不得由旧页面再次生成新 Fact revision 与第二份 Crystal
```

Phase 3 因此继续保持：

```text
ACTIVE / NOT PASSED
```

---

## 三、当前 Recovery 结构

### 3.1 唯一存储 Adapter

当前唯一 Growth Storage key：

```text
xinmai:lived-growth-authority:v1
```

唯一直接 Reader / Writer：

```text
xinmaiLivedGrowthRecoveryPersistenceAdapter
```

Envelope：

```text
schemaVersion
source
revision
updatedAt
choiceActionIntentions[]
livedResponseFacts[]
crystalEligibilities[]
formationReceipts[]
noBackfill = true
```

结论：

```text
Storage Ownership：
SINGLE

Data Authority：
仍由各领域 Controller 校验
```

Storage 内容只是恢复候选，不应单独成为产品权威。

### 3.2 当前事务算法

`transactXinmaiLivedGrowthRecovery()` 当前执行：

```text
读取整个 Envelope
↓
在调用方同步 transform
↓
revision + 1
↓
再次读取当前 revision
↓
比较 expectedPreviousRevision
↓
localStorage.setItem()
↓
写后读取确认 revision + updatedAt
```

它具备：

- 单标签同步写的乐观 revision 检查；
- 写后确认；
- corrupted / unavailable / conflict / unconfirmed 结果；
- No Backfill。

它不具备：

- 跨标签原子 compare-and-set；
- 全局 Envelope Web Lock；
- transaction ID；
- actor / tab fencing token；
- storage change invalidation；
- BroadcastChannel 同步；
- stale surface 撤销；
- 领域级 expected revision；
- 冲突后的权威重读与显式重试协议。

---

## 四、读写者矩阵

| 写入者 | 写入资产 | 前置读取 | 当前锁 | 冲突输出 | 当前问题 |
|---|---|---|---|---|---|
| Choice Intention Controller | Intention create / bind / close | Envelope | 无 | collapsed | 不同标签可持有旧 Intention |
| Lived Response Authority | Fact confirm / supersede / revoke | 事务外先读 Fact 与 Intention | 无 | `PERSISTENCE_UNAVAILABLE` | 无 expected Fact revision；形成后仍可 confirm |
| Crystal Eligibility Authority | Eligibility resolve | 事务外先验证 Fact | 无 | `PERSISTENCE_UNAVAILABLE` | 写入时不重新确认 Fact 仍为 current |
| Formation Consumer | reservation / consumed / Receipt | Envelope | 仅当前 Eligibility 的 Web Lock | `SAFE_WITHHELD` | 不同 Eligibility 使用不同锁，但写同一 Envelope |
| Formation Projection | Receipt projection status | Envelope | 无 | 保留旧 Receipt | 可与其他 Growth 写竞争 |

读取者：

| 读取者 | 用途 | 是否拥有权威 |
|---|---|---|
| Returning Life | 找到 outstanding Intention | 否 |
| Lived Response Return Surface | 当前页面展示 | 否 |
| Lived Response Authority | 校验并确认 Fact | 是 |
| Eligibility Authority | 校验 Fact 并产生资格 | 是 |
| Formation Consumer | 校验 Eligibility / Fact / Intention / Receipt | 是 |
| Acceptance Surface | 开发验收镜像 | 否 |

Page、Renderer、Presentation 没有直接 Storage 写入，边界保持正确。

---

## 五、并发窗口

### 5.1 `localStorage` revision 不是跨标签 CAS

两个标签可以同时：

```text
Tab A 读取 revision N
Tab B 读取 revision N
Tab A 检查仍为 N
Tab B 检查仍为 N
Tab A 写入 N+1
Tab B 写入 N+1
```

写后确认只能说明：

> 读取发生的那个瞬间看见了自己刚写入的候选。

它不能证明：

> 该候选之后没有被另一个同 revision 写覆盖。

`updatedAt` 也不是 transaction identity；同毫秒写入或确认后覆盖均不能建立跨标签 fencing。

### 5.2 Fact revision 在事务外计算

`confirmLivedResponseFact()` 当前先读取 Recovery，再计算：

```text
max(userConfirmationRevision) + 1
```

之后才进入通用 transaction。

因此两个标签可能：

- 基于同一旧 Fact 计算相同 revision；
- 各自构造相同稳定 Fact reference、但携带不同 factual summary；
- 或在顺序执行时由第二个标签生成 revision 2 并 supersede revision 1；
- 两个页面分别持有各自认为已确认的本地 Eligibility。

当前没有：

```text
expectedCurrentFactRevision
expectedIntentionRevision
expectedNoFormationReceipt
```

作为同一 Fact confirmation command 的权威前置条件。

### 5.3 Eligibility 写入缺少提交时重新校验

`resolveCrystalEligibilityForFact()` 在事务外确认 Fact current。

如果其他标签随后 supersede 或 revoke 该 Fact，当前调用仍可能进入 transaction 并追加旧 Fact 的 Eligibility，因为 transform 内没有再次校验：

```text
Fact 仍为 CONFIRMED
+
Fact revision 仍为 current
+
当前 Choice 尚无 Formation Receipt
```

这使“验证”与“写入”不属于同一事务。

### 5.4 Formation 锁只覆盖单一 Eligibility

当前 Web Lock key：

```text
xinmai-crystal-formation:
{eligibilityReferenceId}:
{eligibilityRevision}
```

它正确串行化：

```text
同一 Eligibility 的多标签竞争
```

但两个不同 Eligibility：

- 获得不同锁；
- 同时读写同一个 Growth Envelope；
- 仍依赖非原子的通用 revision transaction。

因此当前保证是：

```text
Per-Eligibility Idempotency：
YES

Whole-Envelope Serializability：
NO
```

---

## 六、真实浏览器证据

### 6.1 验收路径

使用开发隔离验收入口，两个真实浏览器标签在同一 scenario、同一 Choice Intention 下操作：

```text
Tab A 与 Tab B
同时打开同一返回表面
↓
Tab A 确认 ATTEMPTED Fact
↓
Tab A 形成第一颗 Crystal
↓
权威镜像：Receipt 1 / Archive 1
↓
Tab B 保持旧返回表面
↓
Tab B 确认 CHANGED_RESPONSE Fact
↓
Tab B 获得新的 Eligibility
↓
Tab B 再次 Formation
↓
权威镜像：Receipt 2 / Archive 2
```

可见证据：

```text
第一形成后：
Receipt：1
Archive：1

第二旧表面提交后：
Receipt：2
Archive：2
```

浏览器验收未读取或修改 Storage，只通过真实用户动作和页面的只读权威镜像观察结果。

### 6.2 结论

当前 Runtime 允许：

```text
一个 Choice Action Intention
+
一个 Gravity Observation
+
一个 Target Encounter
↓
两个 Lived Response Fact revisions
↓
两个 Eligibility references
↓
两个 Formation Receipts
↓
两个 Archive projections
```

这不是同一 Eligibility 被重复消费。

它是：

> Fact lineage 在第一份 Formation Receipt 成立后仍未进入明确终态。

---

## 七、产品语义裁决

### 7.1 Formation 前

Formation 前允许用户：

- 修改候选；
- 拒绝候选；
- 重新确认更准确的事实；
- 撤回未形成的 Fact；
- 让旧 Eligibility 失效。

但任何修改必须显式带入：

```text
expected Fact revision
+
expected Intention revision
+
expected Receipt absence
```

旧标签页不得仅凭本地表面仍存在而获得提交资格。

### 7.2 Formation 后

最低安全语义冻结：

```text
同一 Choice lineage 已存在 Formation Receipt
↓
不得再产生可 Formation 的新 Fact revision
```

这是 Growth 因果终态，不是 UI 状态。

当前 PREP 尚需裁决用户事后修正事实时采用哪种模型：

#### Option A｜Fact 终态锁定

形成后原 Fact 不可修改；新的现实变化必须来自新的 Choice / encounter。

#### Option B｜非形成型 Amendment

允许附加修正说明，但：

- 不 supersede 已形成 Fact 的形成 provenance；
- 不产生新 Eligibility；
- 不产生第二颗 Crystal；
- 不篡改既有 Receipt。

#### Option C｜Receipt-aware Fact Revision

允许产生新 revision，但必须明确：

- 旧 Crystal 是否仍代表当时已确认事实；
- 新 revision 是否只用于叙事修正；
- Eligibility 永久 `WITHHELD_BY_PRIOR_FORMATION`；
- Archive 如何同时展示历史事实与修订。

在 PREP 冻结前，不得直接选择实现。

### 7.3 禁止语义

禁止：

```text
旧标签页仍显示表面
→ 具有确认权

Fact revision 增加
→ 自动获得新 Eligibility

同一 Choice 被重新描述
→ 自动生成第二颗 Crystal

Archive 已投影
→ 可以忽略 Receipt lineage
```

---

## 八、目标事务权威方向

### 8.1 单一 Transaction Owner

未来需要一个明确的 Growth Recovery Transaction Authority，负责：

```text
读取当前 Envelope
↓
校验 command preconditions
↓
在跨标签排他边界中 transform
↓
写入
↓
写后确认 transaction identity
↓
发布 typed outcome
```

Page 只能发送 command，不拥有 revision 推进。

### 8.2 冲突不是持久化不可用

当前多个 Controller 将 `CONFLICT` 与 `UNCONFIRMED` 折叠为：

```text
PERSISTENCE_UNAVAILABLE
```

目标至少需要区分：

```text
STALE_FACT_REVISION
STALE_INTENTION_REVISION
FORMATION_ALREADY_CONFIRMED
TRANSACTION_CONFLICT_RETRYABLE
LOCK_UNAVAILABLE
RECOVERY_UNAVAILABLE
WRITE_UNCONFIRMED
```

UI 必须显示最后一个已确认事实，并允许安全刷新或重试；不得把冲突展示成成功。

### 8.3 页面同步

`storage` event 或 `BroadcastChannel` 可以用于：

- 通知页面重新读取；
- 关闭 stale surface；
- 更新“事实已在另一处处理”的提示。

它们不能成为：

- Authority；
- CAS；
- Formation Receipt；
- Fencing token。

### 8.4 锁与降级

PREP 必须选择：

- 全局 Growth Envelope lock；
- 领域 command lock；
- 确定性 transaction ID；
- 多锁顺序；
- lock 不可用时的 `SAFE_WITHHELD`；
- 不同 Eligibility 并发 Formation 的序列化边界。

不得只在页面禁用按钮，也不得仅依赖时间戳。

---

## 九、消费者裁决

| 消费者 | 当前裁决 | 后续方向 |
|---|---|---|
| Recovery Persistence Adapter | MIGRATE | 成为原子事务唯一入口 |
| Choice Intention Controller | ADAPT | command 携带 expected revision |
| Lived Response Authority | MIGRATE | 校验 receipt absence 与 Fact lineage |
| Crystal Eligibility Authority | MIGRATE | 验证与写入同一事务 |
| Formation Consumer | ADAPT | 与全局 Envelope 事务协调锁顺序 |
| Returning Surface | ADAPT | 消费 typed conflict / terminal outcome |
| Acceptance Surface | KEEP / EXTEND | 增加旧表面与不同 Eligibility 并发门禁 |
| Personality Ring Projection | KEEP | 仍只消费 Receipt |
| Renderer | REJECT | 不消费 transaction 状态 |
| Pressure Seed / Gravity / AI | REJECT | 不参与 Fact 或 Eligibility 决策 |
| Phase 4 Sanctuary | REJECT | 不生产或修订 Eligibility |

---

## 十、Gate 应保护什么

后续专属门禁应保护：

```text
Growth Recovery Writer：
1

跨标签 Transaction Owner：
1

Stale Fact Command Commit：
0

Post-Formation Eligible Revision：
0

同一 Choice lineage Formation：
最多 1

不同 Eligibility 丢失 Receipt：
0

冲突伪成功：
0

Page revision authority：
0

Storage event authority：
0
```

源码字符串不能代替真实并发路径。

真实浏览器至少覆盖：

- 两标签同时确认同一 Fact；
- 第一标签 Formation 前第二标签修改；
- 第一标签 Formation 后第二标签提交；
- 同一 Eligibility 并发 Formation；
- 不同 Eligibility 并发 Formation；
- stale revision 重试；
- lock unavailable；
- 写入 unconfirmed；
- Projection retry；
- 刷新后的 stale surface；
- 多标签关闭与重新打开；
- Reduced Motion 不改变事务语义。

---

## 十一、迁移与回滚判断

当前不适合绿色修正。

原因：

- 需要改变 Fact confirmation 输入契约；
- 需要改变多个 Authority 的提交责任；
- 需要明确 Formation 后的产品终态；
- 需要迁移 Recovery transaction owner；
- 需要协调 Formation lock 与共享 Envelope；
- 需要新增 typed conflict outcome；
- 需要切换页面消费者；
- 不能长期保留新旧 transaction 路径。

因此：

```text
直接 Refinement：
REJECT

直接 Runtime Patch：
REJECT

下一步 Major Blade Prep：
NOW

后续 Atomic Migration：
预计需要，待 PREP 冻结后再审计
```

未来回滚不得恢复：

- 无 expected revision 的 Fact confirmation；
- Formation 后可再次获得 Eligibility 的旧路径；
- 页面本地 stale surface 提交权；
- 非原子 Envelope writer。

若迁移失败，应：

```text
SAFE WITHHELD
↓
暂停新的 Fact / Eligibility / Formation mutation
↓
既有 Receipt 与 Archive 保持可读
```

不得回到可能生成第二份 Crystal 的旧语义。

---

## 十二、本刀边界

本刀完成：

- 全部 Growth Recovery 读写者清点；
- revision 与锁边界审计；
- 真实多标签路径复验；
- Formation 后 Fact lineage 缺口确认；
- 消费者迁移方向；
- Gate 与回滚方向；
- 下一刀分类。

本刀没有：

- 修改 Runtime；
- 修改 Gate；
- 新增类型；
- 新增状态；
- 新增 Storage；
- 修改页面；
- 删除历史数据；
- 修改 Formation；
- 解锁 Phase 4。

---

## 十三、刀后交通灯

### GREEN

- 单一 Storage Adapter 边界保持；
- 同一 Eligibility 的 Web Lock 与确定性 Receipt 继续有效；
- No Backfill 保持；
- Renderer、AI、Pressure Seed 与 Phase 4 没有越权。

### YELLOW

- Formation 后 Fact 修订的产品语义尚需冻结；
- typed conflict 与 stale surface 体验需要设计；
- 不同 Eligibility 的共享 Envelope 锁顺序需要定义。

### RED

一旦 PREP 冻结目标语义，Runtime 实施必须按 Migration / Atomic Cutover 管理，因为：

- Transaction Owner 将发生替换；
- 多个生产消费者需要同提交切换；
- 新旧写入路径不得同时存在；
- 回滚不能恢复旧并发真源。

红灯不阻断本刀完成；它决定 PREP 之后的实施刀型。

---

## 十四、下一刀建议

```text
XINMAI-LIVED-GROWTH-RECOVERY-TRANSACTION-AUTHORITY-MAJOR-BLADE-PREP-P0

交通灯：
YELLOW

刀型：
Major Blade Prep

决策：
NOW — PREP ONLY

Runtime / Gate：
DEFER

主 Layer：
Layer 4 Growth
```

PREP 必须冻结：

1. Formation 后 Fact 的终态或 Amendment 模型；
2. 同一 Choice lineage 的 Crystal 数量边界；
3. command expected revisions；
4. 全局 Envelope transaction owner；
5. Web Lock / fencing / transaction ID；
6. 不同 Eligibility 的锁顺序；
7. typed conflict 与 UI 降级；
8. storage notification 的非权威边界；
9. 单提交消费者切换；
10. Safe Withheld Rollback。

阶段状态保持：

```text
Phase 3：
ACTIVE / NOT PASSED

Formation Authority：
同 Eligibility 幂等 PASS

Fact lineage 终态：
OPEN

Phase 4：
LOCKED
```
