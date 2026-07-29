# XINMAI Lived Growth Recovery Transaction Authority Major Blade Prep P0

> 任务编号：`XINMAI-LIVED-GROWTH-RECOVERY-TRANSACTION-AUTHORITY-MAJOR-BLADE-PREP-P0`
> 交通灯：YELLOW
> 刀型：Major Blade Prep
> 决策：`NOW — PREP ONLY`
> Runtime / Gate：`DEFER`
> 审计基线：`2cde3015dea2ddf62bc1497d9277c1c14ceed773`
> 主 Layer：Layer 4 Growth
> 保护 Layer：World、Identity、Relationship、Reality provenance
> 阶段边界：Phase 3 Runtime；Phase 4 继续 `LOCKED`

---

## 一、唯一目标

冻结：

1. Formation 前后 Lived Response Fact 的生命周期；
2. 同一 Choice lineage 的 Crystal 数量边界；
3. Growth Recovery 的唯一 Transaction Authority；
4. 跨标签锁、revision、fencing 与 typed outcome；
5. Returning Surface 的 stale / retry / terminal 体验；
6. 所有生产消费者的原子切换与 Safe Withheld Rollback。

目标链：

```text
用户命令
↓
Domain Controller
↓ typed command
Growth Recovery Transaction Authority
↓ 跨标签排他校验
Recovery Adapter
↓ 写后确认
Typed Transaction Outcome
↓
Domain Controller / Surface
```

本刀不新增 Runtime、类型、Storage、状态、Gate 或页面，不形成 Crystal。

---

## 二、PREP 最终裁决

```text
Formation 后 Fact 语义：
TERMINAL FOR FORMATION

同一 Choice lineage：
最多一份 Formation Receipt

Formation 前 Fact 修订：
允许，但必须显式 expected revision 且原子失效旧 Eligibility

Formation 后事实修正：
P0 不允许改写形成因果

未来非形成 Amendment：
DEFER / 独立协议

Growth Recovery Mutation Authority：
单一 Transaction Authority

Growth Recovery Storage Owner：
现有 Recovery Adapter

跨标签写入：
全局 Growth Envelope Web Lock

Storage Schema：
V1 保持，不做 Backfill

下一步：
NOW — MIGRATION AUDIT READY
```

该裁决表示方案已经具备迁移审计条件，不表示 Runtime 获得修改授权。

---

## 三、产品语义

### 3.1 Choice lineage

一个 Choice lineage 由以下事实共同定义：

```text
choiceActionIntentionReferenceId
+
identityReferences
+
sourceEncounterCycleId
+
targetEncounterCycleId
+
gravityCycleId
+
gravityObservationReferenceId
```

它代表：

> 用户在一次明确的生命与现实因果中，准备尝试的一次回应。

同一 lineage 中可以在 Formation 前修正事实，但不能把事实修订解释为多次现实成长。

### 3.2 Crystal 数量边界

正式冻结：

```text
同一个 Choice lineage
→ 最多一份 Formation Receipt
→ 最多一颗 Crystal
```

不是：

```text
每一个 Fact revision
→ 都可以形成一颗 Crystal
```

Fact revision 用于提高事实准确性，不用于复制成长。

### 3.3 用户确认仍是事实权威

系统只确认：

- 命令来自用户明确动作；
- identity、Reality、Gravity 与 Choice provenance 完整；
- expected revision 与当前事实一致；
- Formation 是否已经发生；
- 当前 Eligibility 是否已消费。

系统不判断：

- 用户是否说了客观真话；
- 行动是否成功；
- 行动是否足够好；
- AI 是否认可；
- 用户是否值得获得 Crystal。

---

## 四、Fact 生命周期冻结

### 4.1 派生状态

P0 不要求立刻扩展持久化枚举。正式生命周期可以从现有资产派生：

```text
NO_FACT
↓ 用户确认第一份事实
CONFIRMED_UNFORMED
↓ 用户在 Formation 前修正
SUPERSEDED → CONFIRMED_UNFORMED
↓ 用户在 Formation 前撤回
REVOKED / LINEAGE_CLOSED
↓ Eligibility 进入 reservation
FORMATION_PENDING
↓ Receipt 写入确认
FORMATION_CONFIRMED_TERMINAL
```

`FORMATION_CONFIRMED_TERMINAL` 的权威证据是：

```text
存在绑定同一 choiceActionIntentionReferenceId
且 provenance 完整的 Formation Receipt
```

不得由页面布尔值或 Fact 自身字符串伪造。

### 4.2 第一份 Fact

第一份 Fact 命令必须携带：

```text
choiceActionIntentionReferenceId
identityReferences
expectedIntentionRevision
expectedCurrentFactRevision = 0 / ABSENT
candidateReferenceId
candidateRevision
userExplicitConfirmation
```

提交时必须在同一事务内确认：

- Intention current；
- target encounter 已绑定；
- identity 与 Gravity provenance 匹配；
- 没有 current CONFIRMED Fact；
- 没有 Formation Receipt；
- Candidate 可确认。

### 4.3 Formation 前修订

允许修订的条件：

```text
current Fact = CONFIRMED
+
expectedCurrentFactRevision 精确匹配
+
同一 Choice lineage 尚无 Formation Receipt
+
Eligibility 不为 FORMATION_PENDING / CONSUMED
```

单一事务必须同时完成：

```text
旧 Fact → SUPERSEDED
+
旧未消费 Eligibility → INVALIDATED
+
新 Fact revision → CONFIRMED
```

Eligibility 重新解析必须是后续显式 Authority command，不得在页面中直接产生。

### 4.4 Formation 前撤回

撤回必须带：

```text
expectedCurrentFactRevision
identityReferences
choiceActionIntentionReferenceId
```

同一事务：

```text
Fact → REVOKED
Eligibility → INVALIDATED
Intention → CLOSED
```

如果 Receipt 或 `FORMATION_PENDING` 已成立，撤回不得伪装为成功。

### 4.5 Formation 后终态

一旦同一 Choice lineage 存在确认 Receipt：

以下命令一律拒绝：

- 再次确认初始 Fact；
- 产生新的可形成 Fact revision；
- 重开 Eligibility；
- 删除形成 provenance；
- 生成第二份 Receipt。

typed outcome：

```text
FORMATION_ALREADY_CONFIRMED
```

Returning Surface 必须恢复并呈现最后一份已确认形成事实，而不是继续展示旧可提交表面。

### 4.6 Formation 后事实修正

P0 选择：

```text
不改写已形成因果
```

如果用户需要说明“我后来想起另一种表达”，未来只能通过独立：

```text
NON_FORMING_FACT_AMENDMENT
```

该资产必须：

- 不 supersede Formation provenance；
- 不产生 Eligibility；
- 不生成 Crystal；
- 不修改 Receipt；
- 不改变 Phase 4 资格。

该能力不在本次迁移范围。

---

## 五、Transaction Authority

### 5.1 权威所有者

目标所有权：

| 责任 | 唯一所有者 |
|---|---|
| 产品命令合法性 | 对应 Domain Controller |
| 跨标签排他执行 | Growth Recovery Transaction Authority |
| Storage 读取与写入 | Existing Recovery Adapter |
| Envelope revision 推进 | Transaction Authority |
| Fact 真相 | Lived Response Authority |
| Eligibility 真相 | Crystal Eligibility Authority |
| Formation 真相 | Formation Receipt |
| 页面展示 | Returning Surface |
| Archive 投影 | Personality Ring Adapter |

Storage Adapter 不是领域权威；Transaction Authority 不决定用户事实或 Eligibility 产品规则。

### 5.2 唯一生产写入路径

未来所有 Growth mutation 必须通过：

```text
executeXinmaiLivedGrowthTransaction(command)
```

当前生产代码不得再直接调用：

```text
transactXinmaiLivedGrowthRecovery()
writeXinmaiLivedGrowthRecoveryCandidate()
```

这些低层能力只允许被 Transaction Authority 使用。

### 5.3 全局锁

P0 冻结一个全局跨标签排他锁：

```text
xinmai-lived-growth-envelope:v1
```

锁覆盖：

- Intention create / bind / close；
- Fact confirm / amend / revoke；
- Eligibility resolve / invalidate；
- Formation reservation；
- Eligibility consumed + Receipt commit；
- Receipt projection 状态更新。

原因：

> 所有这些资产存储在同一个 Envelope 中；不同领域锁不能提供整个 Envelope 的 serializability。

### 5.4 锁不可用

如果 Web Locks 不可用：

```text
Mutation：
SAFE_WITHHELD / TRANSACTION_LOCK_UNAVAILABLE

Read：
允许只读恢复
```

禁止回退到当前无锁乐观写入。

用户仍可：

- 查看既有生命资产；
- 返回安全生命空间；
- 稍后重试。

不得：

- 宣称 Fact 已保存；
- 宣称 Eligibility 已成立；
- 宣称 Crystal 已形成。

### 5.5 Envelope revision

Envelope revision 只由 Transaction Authority 推进。

规则：

- 每个成功 mutation command 增加一次；
- 失败、stale、withheld 不增加；
- Page 不提交或推算 Envelope revision；
- `updatedAt` 不再承担 transaction identity；
- 写后确认必须匹配预期 revision 与 command outcome。

领域命令通过 entity revision 防 stale；全局 revision 只保证 Envelope 提交顺序。

---

## 六、Typed Commands

### 6.1 命令集合

Migration P0 至少需要：

```text
COMMIT_CHOICE_INTENTION
BIND_CHOICE_TO_ENCOUNTER
CLOSE_CHOICE_WITHOUT_RECORD

CONFIRM_INITIAL_LIVED_RESPONSE
AMEND_LIVED_RESPONSE_BEFORE_FORMATION
REVOKE_LIVED_RESPONSE_BEFORE_FORMATION

RESOLVE_CRYSTAL_ELIGIBILITY
INVALIDATE_CRYSTAL_ELIGIBILITY

RESERVE_CRYSTAL_FORMATION
COMMIT_CRYSTAL_FORMATION_RECEIPT
UPDATE_CRYSTAL_PROJECTION
```

### 6.2 通用命令事实

每个命令必须携带：

```text
commandReferenceId
commandType
identityReferences
issuedAt
provenance references
expected entity revisions
```

`commandReferenceId`：

- 由 Domain Controller 在用户明确动作时生成；
- 同一次用户动作重试复用；
- 不由 Page render 生成；
- 不由 Storage、Renderer 或 Archive 生成；
- 不是新的长期成长资产。

### 6.3 Expected revisions

必须按命令精确携带：

| 命令 | 必须校验 |
|---|---|
| bind Intention | Intention revision、target cycle |
| confirm initial Fact | Intention revision、Fact absent、Receipt absent |
| amend Fact | current Fact revision、Eligibility non-pending、Receipt absent |
| revoke Fact | current Fact revision、Receipt absent |
| resolve Eligibility | current Fact revision、Eligibility expected state、Receipt absent |
| reserve Formation | Eligibility revision、Fact revision、Receipt absent |
| commit Receipt | reservation token、Eligibility revision、Fact revision、Receipt absent |
| projection update | exact Formation reference、projection state |

禁止通过“最近一条记录”猜测绑定。

---

## 七、Typed Outcomes

### 7.1 成功

```text
COMMITTED
ALREADY_COMMITTED
```

`ALREADY_COMMITTED` 仅用于：

- 同一 commandReferenceId；
- 同一 deterministic domain reference；
- 已确认结果完全一致。

不得把不同事实内容误判为幂等重试。

### 7.2 业务终态

```text
FORMATION_ALREADY_CONFIRMED
LINEAGE_CLOSED
FACT_ALREADY_CURRENT
ELIGIBILITY_ALREADY_CONSUMED
```

### 7.3 Stale

```text
STALE_INTENTION_REVISION
STALE_FACT_REVISION
STALE_ELIGIBILITY_REVISION
STALE_RESERVATION
STALE_COMMAND
```

### 7.4 Recovery / transaction 失败

```text
TRANSACTION_LOCK_UNAVAILABLE
RECOVERY_UNAVAILABLE
RECOVERY_CORRUPTED
WRITE_UNCONFIRMED
TRANSACTION_CONFLICT_RETRYABLE
```

### 7.5 Provenance 失败

```text
IDENTITY_MISMATCH
ENCOUNTER_MISMATCH
GRAVITY_PROVENANCE_MISMATCH
CHOICE_LINEAGE_MISMATCH
```

Domain Controller 不得再把所有冲突折叠为：

```text
PERSISTENCE_UNAVAILABLE
```

---

## 八、Formation 事务与锁顺序

### 8.1 目标纪律

P0 只需要一个全局 Growth Envelope lock。

当前 per-Eligibility Web Lock 不再是 Storage serializability 真源。Migration 可以：

- 删除它；或
- 保留为 Formation 去重优化。

但所有 Envelope 读写仍必须位于全局锁内。

### 8.2 最小原子 Formation

目标顺序：

```text
获取全局 Growth lock
↓
读取最新 Envelope
↓
校验 Fact / Eligibility / Choice / identity / provenance
↓
检查同一 Choice lineage Receipt = 0
↓
Eligibility → FORMATION_PENDING
↓
确定性形成 Crystal
↓
Eligibility → CONSUMED
+
写入唯一 Formation Receipt
↓
写后确认
↓
释放全局锁
↓
投影 Archive
↓
再次通过全局事务更新 projection
```

当前 Crystal Runtime 是同步确定性消费，可以在全局 lock 内完成。

未来若 Formation 变成真正异步流程，必须另开协议；不得私自缩短锁导致 reservation、Fact revision 与 Receipt 脱离。

### 8.3 不同 Eligibility

两个合法的不同 Choice lineage 可以并发请求 Formation，但 Transaction Authority 必须串行化 Envelope commit：

```text
Lineage A → Receipt A
Lineage B → Receipt B
```

不得出现：

- 两个 UI 都宣称成功、最终只剩一个 Receipt；
- Archive 有 Crystal、Recovery 无 Receipt；
- 相同 Envelope revision 的覆盖写。

### 8.4 Projection

Receipt 是 Formation 权威。

Projection：

- 不参与 Eligibility；
- 不决定 Formation 成功；
- 失败后保持 `RETRYABLE`；
- 重试同一 Receipt；
- 不再次调用 Formation；
- projection 状态写入仍通过全局事务。

---

## 九、Returning Surface 体验

### 9.1 页面只是命令发起者

Returning Surface 可以持有：

- 当前展示快照；
- 用户尚未提交的候选文本；
- busy / feedback；
- expected domain revision。

它不能持有：

- Fact Authority；
- Eligibility Authority；
- Formation terminal truth；
- Envelope revision owner。

### 9.2 跨标签通知

`storage` event 或 `BroadcastChannel` 只作为：

```text
Envelope revision changed
↓
页面重新读取 typed recovery snapshot
↓
关闭或更新 stale surface
```

它不是 CAS，不是 Authority，也不自动重放用户命令。

### 9.3 Stale 反馈

当旧标签提交 stale command：

- 不显示保存成功；
- 不自动覆盖新事实；
- 不自动重试语义不同的候选；
- 重新读取当前 Authority；
- 显示“这次记录已在另一处更新”；
- 允许用户回到最新事实。

### 9.4 Formation terminal 反馈

当旧标签在 Receipt 后确认：

```text
FORMATION_ALREADY_CONFIRMED
```

UI：

- 不创建新 Fact；
- 不创建新 Eligibility；
- 不显示“具备形成条件”；
- 恢复已形成的生命印记；
- 允许继续同行；
- 不阻断用户进入安全生命空间。

---

## 十、历史数据

### 10.1 正常 V1 Envelope

目标 Migration 不要求变更 Storage key 或 V1 Schema。

现有资产继续读取：

- Intention；
- Fact；
- Eligibility；
- Receipt；
- No Backfill。

### 10.2 已存在多 Receipt lineage

如果历史 Envelope 中同一 `choiceActionIntentionReferenceId` 已存在多份 Receipt：

```text
保护全部既有 Crystal
+
停止该 lineage 的新 mutation
+
不得自动删除、合并或选择“正确的一颗”
+
不得补造 Fact / Eligibility
```

运行时派生：

```text
LEGACY_MULTIPLE_FORMATION_RECEIPTS
→ SAFE_WITHHELD
```

该派生异常不要求立即写回 Schema。

### 10.3 只有 Fact、没有 Receipt

按当前状态恢复：

- current CONFIRMED Fact 可继续 Eligibility；
- stale / superseded / revoked Fact 不可恢复；
- Eligibility 必须重新验证 current Fact；
- 不做 Backfill。

### 10.4 只有 Archive Crystal、没有 Receipt

作为历史 Crystal 保留可读，但：

- 不反向生成 Receipt；
- 不反向生成 Eligibility；
- 不反向生成 Fact；
- 不参与当前 Formation 去重猜测；
- 来源不明时保持历史隔离。

---

## 十一、消费者迁移

| 当前消费者 | 目标动作 | 原因 |
|---|---|---|
| Recovery Persistence Adapter | KEEP / NARROW | 保持唯一 Storage owner，原始写入只供 Transaction Authority |
| Choice Intention Controller | ADAPT | 发送 typed command，不直接 transact |
| Lived Response Authority | MIGRATE | 原子校验 expected revisions 与 Receipt absence |
| Crystal Eligibility Authority | MIGRATE | current Fact 验证与写入同事务 |
| Formation Consumer | MIGRATE | 全局锁内执行 lineage-level receipt guard |
| Projection Adapter | ADAPT | projection update 走全局事务 |
| Returning Surface | ADAPT | 消费 typed stale / terminal outcome |
| Launch returning recovery | ADAPT | revision 变化时刷新 surface |
| Acceptance Surface | EXTEND | 增加 post-Formation stale tab 与 different-lineage race |
| Renderer | REJECT | 不消费 transaction 或 Fact 状态 |
| Pressure Seed / Six Dimension / Gravity | REJECT | 不拥有 Growth transaction |
| AI | REJECT | 不确认 Fact、不决定 Eligibility |
| Phase 4 | REJECT | 只消费合法 Crystal，不决定 Formation |

---

## 十二、原子迁移范围

未来 Runtime 必须在单一提交中完成：

```text
建立 typed command / outcome contract
+
建立唯一 Transaction Authority
+
建立全局 Growth Envelope lock
+
切换 Intention Controller
+
切换 Lived Response Authority
+
切换 Eligibility Authority
+
切换 Formation Consumer
+
切换 Projection update
+
切换 Returning Surface
+
移除所有生产 direct transact 调用
+
建立专属 Gate
+
补齐真实多标签验收
```

禁止中间态：

```text
新 Transaction Authority
+
旧 direct transact writer
```

也禁止：

```text
Fact 已切换
但 Eligibility / Formation 仍使用旧 Envelope writer
```

---

## 十三、Gate 责任

未来专属门禁必须保护：

```text
Growth Storage Adapter：
1

Growth Transaction Authority：
1

Production direct transact caller：
1（仅 Transaction Authority）

Global Envelope mutation lock：
1

Stale Fact commit：
0

Post-Formation Fact revision：
0

Post-Formation Eligibility：
0

Receipt per Choice lineage：
最多 1

Different-lineage lost write：
0

Page Authority：
0

Renderer / AI / Phase 4 transaction consumer：
0
```

必须补齐真实浏览器门禁：

1. 两标签同时确认第一份 Fact；
2. Formation 前旧标签修订；
3. Formation 后旧标签确认；
4. 同一 Eligibility 并发 Formation；
5. 两个不同 lineage 并发 Formation；
6. stale expected revision；
7. lock unavailable；
8. Storage unavailable / corrupted / unconfirmed；
9. Projection failure + retry；
10. 刷新恢复；
11. 历史多 Receipt lineage；
12. Reduced Motion 业务语义一致。

---

## 十四、失败矩阵

| 失败 | Authority 结果 | UI | 是否写入 |
|---|---|---|---|
| stale Intention | `STALE_INTENTION_REVISION` | 刷新当前关系 | 否 |
| stale Fact | `STALE_FACT_REVISION` | 显示另一处已更新 | 否 |
| Receipt 已存在 | `FORMATION_ALREADY_CONFIRMED` | 恢复已有印记 | 否 |
| Formation pending | `FORMATION_IN_PROGRESS` | 等待或稍后重试 | 否 |
| lock 不可用 | `TRANSACTION_LOCK_UNAVAILABLE` | 非阻断扣留 | 否 |
| Storage 不可用 | `RECOVERY_UNAVAILABLE` | 保持最后确认事实 | 否 |
| Storage corrupted | `RECOVERY_CORRUPTED` | 隔离、不可形成 | 否 |
| 写后未确认 | `WRITE_UNCONFIRMED` | 不宣称成功 | 不可确认 |
| identity 失配 | `IDENTITY_MISMATCH` | 返回安全生命空间 | 否 |
| Gravity provenance 失配 | `GRAVITY_PROVENANCE_MISMATCH` | 不形成 | 否 |
| Projection 失败 | Receipt `RETRYABLE` | 已形成、投影待恢复 | Receipt 已存在 |
| 历史多 Receipt | `SAFE_WITHHELD` | 保留历史、停止新形成 | 否 |

所有失败：

- 不生成新身份；
- 不删除关系资产；
- 不激活 Phase 4；
- 不复活页面布尔真源；
- 不把“希望成功”显示为已成功。

---

## 十五、Safe Withheld Rollback

未来 Migration 必须预备 forward counter-commit。

如果出现：

- 双 Transaction Authority；
- direct transact writer 未清零；
- stale Fact 仍可提交；
- 同一 Choice lineage 出现第二份 Receipt；
- 不同 lineage 并发丢失 Receipt；
- Archive 与 Receipt 失去一致恢复；
- lock / fencing 无法证明；
- UI 显示伪成功；

执行：

```text
关闭新的 Growth mutation
+
保留既有 Intention / Fact / Eligibility / Receipt 只读
+
保留既有 Crystal / Archive
+
新的 Fact、Eligibility、Formation 全部 SAFE_WITHHELD
```

禁止：

```text
git revert
↓
恢复旧 direct transact
↓
恢复 Formation 后第二颗 Crystal
```

---

## 十六、迁移审计申请条件

以下已冻结：

- 产品终态；
- lineage 数量边界；
- Formation 前修订规则；
- Formation 后 P0 禁止改写；
- 唯一 Transaction Authority；
- 全局锁；
- typed command / outcome；
- 消费者切换；
- 历史数据隔离；
- Gate；
- Safe Withheld Rollback。

因此下一步可以进入 Migration Audit，重点回答：

1. 所有 direct transact 调用的精确删除清单；
2. 新 Authority 的文件边界；
3. 是否保持 V1 Schema；
4. 单提交切换顺序；
5. Gate 同提交替换；
6. 干净快照与浏览器验收方案；
7. forward counter-commit 文件范围。

最终裁决：

```text
NOW — MIGRATION AUDIT READY
```

---

## 十七、本刀边界

本刀只新增协议文档。

没有：

- 修改 Runtime；
- 修改 Gate；
- 新增类型；
- 新增 Engine；
- 新增 Storage；
- 改变现有用户数据；
- 删除历史 Crystal；
- 修改 Renderer；
- 接入 AI；
- 解锁 Phase 4。

---

## 十八、刀后交通灯

### GREEN

- V1 Storage key 与现有资产可保留；
- No Backfill 可继续；
- Identity、Relationship、Reality provenance 无需迁移；
- Phase 4 没有越权。

### YELLOW

- 未来非形成型 Fact Amendment 继续 `DEFER`；
- 历史多 Receipt 的产品展示需要后续独立 MAP。

### RED

Runtime 切换必须经过独立 Migration Audit 与 Atomic Migration：

- Transaction Owner 替换；
- 多消费者同步切换；
- 输入输出契约变化；
- direct writer 清零；
- 回滚不能恢复旧真源。

---

## 十九、下一刀建议

```text
XINMAI-LIVED-GROWTH-RECOVERY-TRANSACTION-AUTHORITY-ATOMIC-MIGRATION-AUDIT-P0

交通灯：
RED

刀型：
Migration Audit

决策：
NOW — AUDIT ONLY

Runtime / Gate：
DEFER

主 Layer：
Layer 4 Growth
```

阶段状态保持：

```text
Phase 3：
ACTIVE / NOT PASSED

Growth Transaction Authority：
PREP CLOSED / RUNTIME NOT ESTABLISHED

Fact lineage terminality：
TARGET SEMANTIC FROZEN

Crystal Formation：
保持当前 Runtime，等待原子迁移

Phase 4：
LOCKED
```
