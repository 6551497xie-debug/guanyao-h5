# XINMAI Lived Growth Cross-Tab Fencing and Lost Write Migration Audit P0

> 任务编号：`XINMAI-LIVED-GROWTH-CROSS-TAB-FENCING-AND-LOST-WRITE-MIGRATION-AUDIT-P0`
> 交通灯：RED
> 刀型：Migration Audit
> 决策：`NOW — AUDIT ONLY`
> Runtime / Gate：`DEFER`
> 审计基线：`48b48c783e891ff1a3a66f3272cba4c780f0be1b`
> 远程正式基线：`aa779566e2de4cb119c9c9b03a4f0fa808e71860`
> 主 Layer：Layer 4 Growth
> 保护 Layer：World、Identity、Relationship、Reality provenance
> 阶段：Phase 3 `ACTIVE / NOT PASSED`，Phase 4 `LOCKED`

---

## 一、唯一目标

确定 `48b48c7` 不同 lineage 并发形成时发生 lost write 的真实因果，并冻结一个：

- 不产生第二锁权威；
- 不把 revision 冒充 CAS；
- 不删除、重写或补造 V1 Growth 资产；
- 不让两个调用都显示永久形成成功但只保存一颗 Crystal；
- 能在一个新原子提交中完整替换错误候选；
- 能通过 forward `SAFE_WITHHELD` 安全回滚；

的纠正迁移方案。

本刀只新增审计文档，不修改 Runtime、Gate、Storage、页面或数据。

---

## 二、最终裁决

```text
不同 lineage lost write：
REPRODUCED

Web Lock 共享协调域：
CONFIRMED

Web Lock 排他调度：
PASS

完整 callback 锁覆盖：
PASS

第二事务锁内读取最新 Envelope：
FAIL

localStorage revision CAS：
NOT REAL

成功反馈真实性：
FAIL

48b48c7：
REJECT / KEEP LOCAL AS EVIDENCE

唯一推荐方案：
TRANSACTIONAL PERSISTENCE CUTOVER

正式事务提交权威：
IndexedDB readwrite transaction completion

Web Lock：
NON-AUTHORITATIVE / OPTIONAL SCHEDULER ONLY

V1 localStorage：
PRESERVE / READ-ONLY LEGACY SOURCE / NO BACKFILL

最终裁决：
NOW — CORRECTIVE ATOMIC MIGRATION READY
```

该裁决只表示迁移方案具备申请 Runtime 授权的条件，不代表 Runtime 已获授权。

---

## 三、证据边界

### 3.1 审计对象

候选提交：

```text
48b48c783e891ff1a3a66f3272cba4c780f0be1b
feat(growth): establish atomic recovery transaction authority
```

该候选：

- 本地保留；
- 不推送；
- 不 amend 后冒充原交付；
- 只作为源码、竞态与消费者复现基线。

### 3.2 应急资产

已验证的 forward counter-commit：

```text
abc3e30f40adf2a6ada00d82e696ef9864750a0c
```

补丁：

```text
/private/tmp/0001-fix-growth-pause-mutation-authority-safely.patch
```

SHA-256：

```text
cd449b2230a42681043626df89302c1c03f11df4f7c3b1b689429c764d257699
```

它只作为应急 forward rollback 资产：

- 不推送；
- 不覆盖远程；
- 不成为纠正迁移起点；
- 后续需针对新的纠正提交重新生成并验证。

### 3.3 证据等级

本审计同时使用：

- 候选源码结构；
- 精确事务日志；
- 同源双标签真实浏览器行为；
- 独立 Lock / Storage 协调域探针；
- 最终 Recovery、Receipt、Crystal 与 Archive 投影计数。

源码字符串或静态 Gate 不替代真实浏览器竞态。

---

## 四、Lock 与 Storage 隔离范围

### 4.1 实际执行单元

独立协调域探针记录：

```text
Browser binding：
-6e54-422c-9bbf-1f611ed06fdb

Tab A：
767d2e18

Tab B：
aef3e54a

Origin：
http://127.0.0.1:5191
```

实际 Growth Authority 追踪使用：

```text
Tab A：
60

Tab B：
61

Origin：
http://127.0.0.1:5188
```

浏览器控制接口没有暴露底层 Playwright `BrowserContext` 的稳定 ID，因此不能伪造“Context ID 完全相同”的结论。

但以下运行事实成立：

- 两个标签属于同一 in-app browser binding；
- origin 完全一致；
- `localStorage` 数据最终互相可见；
- 同名 Web Lock 严格串行；
- 两个标签运行于同一实际协调域 / storage bucket。

### 4.2 实际 Lock

```text
name：
xinmai-lived-growth-envelope:v1

mode：
exclusive
```

独立探针时间线：

```text
1785349594393  A REQUEST
1785349594393  B REQUEST
1785349594394  A ACQUIRE
1785349595295  A CALLBACK_END
1785349595296  A RELEASED
1785349595298  B ACQUIRE
1785349596200  B CALLBACK_END
1785349596200  B RELEASED
```

结论：

> 两个标签确实共享同一 Lock Manager；排他锁没有并行放行两个 callback。

### 4.3 实际 Storage

Growth key：

```text
xinmai:lived-growth-authority:v1
```

Storage primitive：

```text
window.localStorage
```

独立探针在给 Storage 传播留出约 250ms 后得到：

```text
Tab B：
read revision 0
write revision 1 / lineage B

Tab A：
read revision 1
write revision 2 / lineage A

final：
revision 2
lineage B + lineage A
```

这证明：

- 两个标签不是永久隔离的 localStorage；
- 数据最终共享；
- Web Lock 本身可以串行。

但真实 Growth 事务在毫秒级交接时仍发生陈旧读，因此：

```text
Web Lock 调度域
≠
localStorage 立即一致的事务提交域
```

### 4.4 范围图

```text
同一 storage bucket
│
├─ Web Lock Manager
│  └─ exclusive callback queue
│     ├─ Tab A callback
│     └─ Tab B callback
│
└─ localStorage
   ├─ Tab A 当前可见快照
   ├─ Tab B 当前可见快照
   └─ 异步跨上下文传播 / storage event
```

`storage` event observer 只能通知重新读取：

```text
src/services/xinmaiLivedGrowthRecoveryRevisionObserver.ts
```

它不是事务屏障，不参与写入确认，也不能让一次已经开始的 read-modify-write 自动获得最新快照。

### 4.5 标准边界

[Web Locks](https://www.w3.org/TR/web-locks/) 负责同一 storage bucket 中同名资源的排他调度，锁在 callback 完成后释放。

[Web Storage](https://html.spec.whatwg.org/dev/webstorage.html) 明确警告：两个浏览器窗口同时执行“读取、递增、写回”可能产生相同的“唯一”值并造成灾难性结果。`localStorage` 没有为应用提供原子 compare-and-swap。

因此：

> Web Lock 可以协调脚本执行，但不能把 `localStorage.getItem() + setItem()` 自动升级为具备真实提交隔离的持久化事务。

---

## 五、精确竞态时间线

### 5.1 初始状态

```text
revision：
185

formationReceipts：
22
```

两个不同 lineage 同时请求 Formation：

```text
A：
acceptance-source:trace-race-a-v1

B：
acceptance-source:trace-race-b-v1
```

### 5.2 Formation

| 时间戳 | Lineage | 事件 | 观察 |
|---:|---|---|---|
| 1785349753361 | A | REQUEST | 请求形成 |
| 1785349753361 | B | REQUEST | 请求形成 |
| 1785349753362 | A | ACQUIRE | A 获得排他锁 |
| 1785349753363 | A | READ | `revision=185; receipts=22` |
| 1785349753364 | A | WRITE_START | `185 → 186; receipts=23` |
| 1785349753367 | A | WRITE_RESULT | `CONFIRMED; revision=186` |
| 1785349753368 | A | RELEASED | 返回 `COMMITTED` |
| 1785349753368 | B | ACQUIRE | B 在 A 释放后获得锁 |
| 1785349753369 | B | READ | **仍为 `revision=185; receipts=22`** |
| 1785349753370 | B | WRITE_START | 同样写成 `revision=186; receipts=23` |
| 1785349753373 | B | WRITE_RESULT | 同样返回 `CONFIRMED` |
| 1785349753373 | B | RELEASED | 返回 `COMMITTED` |

关键事实：

```text
A 已确认并释放 revision 186
↓
B 获锁
↓
B 仍读到 revision 185
↓
B 用另一份 lineage 覆盖 revision 186
```

两个事务不是同时持锁。

丢写发生在：

> 排他锁交接完成后，下一标签仍基于陈旧 localStorage 快照执行完整 read-modify-write。

### 5.3 Projection

| 时间戳 | Lineage | 事件 | 结果 |
|---:|---|---|---|
| 1785349753368 | A | projection REQUEST | 请求投影 A |
| 1785349753374 | B | projection REQUEST | 请求投影 B |
| 1785349753375 | A | ACQUIRE | 读取最终 revision 186 |
| 1785349753376 | A | DECISION | `REJECTED`，A Receipt 已被覆盖 |
| 1785349753378 | B | ACQUIRE | 读取 revision 186 |
| 1785349753379 | B | DECISION | `COMMIT` |
| 1785349753382 | B | WRITE_RESULT | `revision=187; receipts=23` |

最终：

```text
Lineage A：
Receipt 0 / Crystal 0

Lineage B：
Receipt 1 / Crystal 1

Total Receipt：
只增加 1

Archive / Personality Ring projection：
只增加 1
```

但 A 的 Formation 调用已经得到 `COMMITTED`，并继续向上返回一份本地 Receipt。

---

## 六、Lost Write 根因

### 6.1 Authority 的 Lock 范围不是缺口

候选 Authority 在 Web Lock callback 内完成：

```text
读取 Recovery
↓
验证 identity / provenance / revision
↓
Domain decision
↓
生成 next Envelope
↓
写入 localStorage
↓
立即回读
↓
返回 COMMITTED
```

文件：

```text
src/services/xinmaiLivedGrowthTransactionAuthority.ts
```

因此：

```text
“把更多代码移动进 Web Lock”
```

不是有效修复。

### 6.2 `expectedPreviousRevision` 不是 CAS

Persistence Adapter 的顺序：

```text
getItem()
↓
比较 expectedPreviousRevision
↓
setItem()
↓
同标签立即 getItem()
↓
比较 revision + updatedAt
```

文件：

```text
src/services/xinmaiLivedGrowthRecoveryPersistenceAdapter.ts
```

问题：

- 比较与写入不是一个浏览器提供的原子操作；
- B 的第一次 `getItem()` 可以读到旧 revision；
- B 的第二次 `getItem()` 可以立即读回自己刚写的值；
- 所以 B 会把一次覆盖误判为 `CONFIRMED`。

结论：

```text
先读 revision
+
setItem
+
自读回确认

≠ CAS
```

### 6.3 `revision` 发生碰撞

A 与 B 都从 `185` 派生：

```text
next revision = 186
```

revision 没有唯一事务生成者，也没有持久化原语保证单调提交。

因此：

- revision 无法拒绝 stale writer；
- `fencingToken = current.revision + 1` 同样可能碰撞；
- fence token 只是数据字段，不是 fence authority。

### 6.4 成功反馈早于永久真实性

Formation Consumer 在主 Formation transaction 返回 `COMMITTED` 后：

```text
await projectReceipt(...)
```

但 `projectReceipt()` 被拒绝时会返回传入的原始 Receipt，而不是把形成结果改为失败。

随后调用方根据主 transaction：

```text
COMMITTED → FORMED
```

所以 A 的真实链是：

```text
页面收到 FORMED + Receipt A
↓
Projection 发现 Receipt A 已不存在
↓
仍返回本地 Receipt A
↓
刷新后 A 消失
```

这是伪成功，不是单纯投影延迟。

### 6.5 Archive / Personality Ring 仍有第二处 read-modify-write

当前 Projection：

```text
readPersonalityRingLite()
↓
追加 entry
↓
writePersistedPersonalityRingLiteState()
↓
readPersonalityRingLite()
```

涉及：

```text
src/services/guanyaoDynamicsPersonalityRingDepositAdapter.ts
src/services/personalityRingLiteService.ts
src/services/guanyaoPersonalityRingLitePersistenceAdapter.ts
```

它同样以 localStorage 全量状态执行 read-modify-write。

即使 Growth Envelope 修复，多个不同 lineage 的 Projection 仍可能互相覆盖。

因此纠正方案必须同时冻结：

```text
Formation Receipt
+
Crystal
+
Personality Ring / Archive projection
```

的事务与投影边界。

---

## 七、五个问题的正式回答

### Q1｜两个执行单元是否真正共享协调域

```text
相同 Browser binding：
YES

相同 origin：
YES

localStorage 最终共享：
YES

navigator.locks 共享：
YES

同名 exclusive lock 串行：
YES

底层 BrowserContext ID：
NOT EXPOSED
```

运行行为足以证明两个标签位于同一个实际 storage bucket / Lock Manager 协调域。

不是因为“两个页面各有一把不同的锁”导致丢写。

### Q2｜排他锁是否覆盖完整提交周期

```text
读取：
IN LOCK

校验：
IN LOCK

mutation：
IN LOCK

write：
IN LOCK

self-confirmation read：
IN LOCK

return：
IN LOCK
```

锁范围完整。

缺口是：

> localStorage 的读取可见性与 Web Lock handoff 没有形成可验证的持久化事务隔离。

### Q3｜成功反馈为什么早于最终真实性

因为：

1. A 对自己写入的 revision 186 执行自读回，得到 `CONFIRMED`；
2. B 后续用另一份 revision 186 覆盖 A；
3. A 的 Projection 被拒绝；
4. `projectReceipt()` 仍返回 A 的本地 Receipt；
5. `formCrystalFromEligibility()` 仍映射为 `FORMED`；
6. UI 将一次已经消失的资产展示为成功。

首个失真资产：

```text
Growth Envelope / Formation Receipt
```

随后失真：

```text
Crystal 恢复
Archive / Personality Ring projection
UI success
```

### Q4｜当前环境能否提供跨标签排他保证

| 环境 | Web Lock | Storage | 当前保证 |
|---|---|---|---|
| 同一标签 | 有 | 同一 JS context | 可串行，但刷新恢复仍非事务 CAS |
| 同一 Browser Context / 同源多标签 | 共享 | 最终共享 | Lock 串行成立；localStorage 立即一致失败 |
| 同源不同 storage bucket / profile | 不共享 | 不共享 | 属于不同本地数据域，不可宣称跨域互斥 |
| 恢复后的旧标签 | 可能共享 | 可能持有陈旧快照 | 不能依赖 revision 自证新鲜 |
| Web Lock 不支持 | 无 | 可用 | 当前必须 `SAFE_WITHHELD` |

结论：

> 当前 Web Lock 可提供脚本调度排他，但不能单独提供 Growth 永久资产的跨标签提交真实性。

### Q5｜如果使用 fencing / CAS，权威在哪里

目标权威必须是：

```text
IndexedDB overlapping-scope readwrite transaction
```

唯一 fence token 生成点：

```text
同一 readwrite transaction 内
读取 canonical revision
↓
生成 next committed revision / fencing token
```

stale writer 拒绝点：

```text
同一 transaction 内
校验 entity revision + identity + provenance + lineage terminal
```

写入成功依据：

```text
IDBTransaction complete event
```

不是：

- request `success`；
- localStorage 自读回；
- Web Lock callback 返回；
- storage event；
- page state；
- DOM；
- timer。

Web Lock 可以作为调度优化，但不得决定：

- committed revision；
- stale / current；
- Crystal 是否形成；
- UI 是否显示永久成功。

---

## 八、目标事务不变量

### 8.1 单一提交权威

```text
Growth Transaction Commit Authority：
1

Authority：
Transactional Growth Store
```

### 8.2 同一 lineage

```text
同一个 choiceActionIntentionReferenceId
→ Formation Receipt ≤ 1
→ Crystal ≤ 1
→ canonical projection ≤ 1
```

### 8.3 不同 lineage

```text
Lineage A commit
+
Lineage B commit
→ A 与 B 均保留
→ revision 单调增加两次
→ 无 last-write-wins 丢失
```

### 8.4 成功

只有：

```text
transaction complete
+
Receipt 可按 deterministic ID 重新读取
+
identity / provenance / lineage 一致
```

才能返回：

```text
FORMED
```

### 8.5 Projection

Primary formation transaction 必须至少原子写入：

```text
Eligibility CONSUMED
Formation Receipt
formed Crystal
canonical projection record / outbox
```

外部 Presentation mirror 失败：

- 不重复 Formation；
- Receipt 保持同一 ID；
- 只重试 deterministic projection；
- 不把 mirror 成功冒充 Formation 成功；
- 不把 mirror 失败改写为 Crystal 消失。

### 8.6 Fence

```text
revision：
单调，事务内生成

fencingToken：
等于或派生自已提交 revision

stale writer：
在事务内拒绝
```

禁止：

```text
Date.now()
random UUID
localStorage revision
Web Lock 排队序号
```

单独成为 fence authority。

---

## 九、方案比较

| 方案 | 跨标签真实性 | 崩溃恢复 | V1 兼容 | 第二权威风险 | 迁移规模 | 用户损失 | 裁决 |
|---|---|---|---|---|---|---|---|
| 扩大当前 Web Lock 范围 | FAIL：范围已完整 | 一般 | 高 | 低 | 小 | 继续伪成功 | REJECT |
| 页面 / SharedWorker 单写者 | 取决于 leader | leader 生命周期复杂 | 中 | 高 | 大 | leader 不可用时阻断 | REJECT AS PRIMARY |
| localStorage lease + fencing | FAIL：无原子 CAS | lease 接管有 split-brain | 高 | 极高 | 中 | 可能双 owner | REJECT |
| 真事务持久化原语 | PASS | 原子 commit / abort | 可只读导入 | 低 | 大 | 一次迁移成本 | **RECOMMEND** |
| 暂时只允许单标签 mutation | 同标签 PASS | 简单 | 高 | 低 | 小 | 多标签不可用 | EMERGENCY ONLY |
| 全面 `SAFE_WITHHELD` | 不发生写入 | 安全 | 完整保留 | 无 | 小 | 新增长暂停 | ROLLBACK ONLY |

### 9.1 为什么不选“修正 Web Lock”

真实日志已经证明：

- callback 严格串行；
- A release 后 B 才 acquire；
- 完整读写都在 callback；
- B 仍读旧 revision。

继续调整 lock name、mode 或 callback 边界不会改变 Storage primitive。

### 9.2 为什么不选 localStorage lease

lease 仍需要：

```text
read lease
↓
compare expiry / token
↓
write lease
```

该链仍由 localStorage 执行非原子 read-modify-write。

两个标签可能：

- 同时认为 lease 过期；
- 生成相同 revision；
- 各自自读回确认；
- 形成 split-brain。

这是把当前问题复制到“锁权威”本身。

### 9.3 为什么选事务型持久化

[IndexedDB](https://www.w3.org/TR/IndexedDB-3/) 的 overlapping-scope `readwrite` transaction：

- 不能同时访问同一 object store；
- 后创建的 transaction 会看到先完成 transaction 的写入；
- commit 原子写入全部 transaction 变更；
- abort 回滚全部变更；
- `complete` event 表示 transaction 已提交。

这正好覆盖当前缺失的：

```text
读取最新
+
条件校验
+
写入多个相关资产
+
原子完成 / 回滚
```

---

## 十、唯一推荐目标架构

### 10.1 Authority

新增：

```text
XinmaiLivedGrowthTransactionalStore
```

唯一写入 primitive：

```text
IndexedDB
```

建议单库、重叠事务范围：

```text
database：
xinmai-lived-growth-authority

object stores：
growth-envelope
growth-projection
migration-meta
```

`growth-envelope` 使用唯一 canonical key。

### 10.2 正式链

```text
Domain typed command
↓
Growth Transaction Authority
↓
IndexedDB readwrite transaction
↓
读取 canonical Envelope
↓
验证 identity / provenance / expected revisions / lineage terminal
↓
生成 mutation
↓
原子写入 Envelope + Receipt + Crystal + projection record
↓
transaction complete
↓
Typed CONFIRMED outcome
↓
UI 才能显示永久形成
```

### 10.3 Web Lock 的目标角色

正式冻结：

```text
Web Lock：
不是 commit authority
不是 CAS
不是 revision generator
不是 fencing authority
```

未来允许二选一：

1. 删除 Mutation correctness path 中的 Web Lock；或
2. 仅保留为排队 / 降低冲突的非权威 scheduler。

无论选择哪项：

```text
没有 Web Lock
≠
可以无事务写
```

最终安全性只来自 IndexedDB transaction。

### 10.4 Revision 与 fencing

同一 transaction 内：

```text
current revision
↓
validate
↓
next revision = current + 1
↓
fencingToken = next committed revision
↓
write
↓
complete
```

旧 transaction：

- 无法与 overlapping readwrite transaction 同时运行；
- 启动后读取当前已提交值；
- expected entity revision 不匹配时返回 typed stale；
- 不产生写入。

### 10.5 Crash / refresh / takeover

```text
transaction 未 complete：
全部 abort / 不显示成功

transaction 已 complete：
按 deterministic references 恢复

tab crash：
不需要 lease timeout

refresh：
重读 canonical store

retry：
相同 command / formation ID
→ ALREADY_COMMITTED 或恢复同一 Receipt
```

不需要第二套 lease owner。

---

## 十一、V1 数据与迁移

### 11.1 必须保留

```text
localStorage key：
xinmai:lived-growth-authority:v1

schema：
XINMAI_LIVED_GROWTH_RECOVERY_V1
```

迁移不得：

- 删除；
- 清空；
- 重写历史实体；
- 补造 Fact；
- 补造 Eligibility；
- 补造 Receipt；
- 根据 `createdAt` 合并；
- 根据“最新页面”选定真相。

### 11.2 目标角色

迁移后 V1 localStorage：

```text
PRESERVED LEGACY SOURCE
READ-ONLY
NO BACKFILL
NOT AUTHORITY
```

Page、Renderer、Crystal Presentation 不得直接读取它作为 mutation authority。

### 11.3 首次导入

IDB `migration-meta` 必须记录：

- V1 schema；
- V1 revision；
- V1 content digest；
- import timestamp；
- import status；
- canonical store generation。

首次 transaction：

```text
IDB canonical 不存在
↓
读取 V1 candidate
↓
严格 schema validation
↓
以原样 Envelope 导入
↓
不生成任何新实体
↓
写入 migration-meta
↓
transaction complete
```

### 11.4 导入冲突

如果另一个标签提交：

```text
相同 revision
+
不同 digest
```

或：

```text
不同 V1 candidate
无法证明严格包含关系
```

必须：

```text
LEGACY_SNAPSHOT_CONFLICT
↓
SAFE_WITHHELD
↓
保留全部 V1 原始数据
↓
禁止自动 merge / pick winner / backfill
```

不得以：

- revision 较大；
- updatedAt 较新；
- Receipt 较多；

单独推断正确 lineage。

### 11.5 旧版本标签

纠正版本切换后：

- 旧版本标签对 V1 key 的晚写不得覆盖 IDB canonical；
- 新 Runtime 发现 V1 digest 在 cutover 后变化，只能报告 `LEGACY_WRITER_DETECTED`；
- 新 mutation 进入 `SAFE_WITHHELD` 或要求刷新；
- 不把旧版本晚写自动导入 canonical；
- 不清除旧标签数据。

旧版本页面无法被新代码追溯性修改，因此远程交付必须把：

```text
旧 writer 禁止门禁
+
新 canonical store
+
cutover generation
```

放在同一提交。

---

## 十二、Formation 与 Projection

### 12.1 Primary formation transaction

同一 IndexedDB transaction 原子写入：

```text
Eligibility：
ELIGIBLE → CONSUMED

Formation Receipt：
PENDING / FORMED canonical fact

Crystal：
deterministic crystalReferenceId

Projection record：
deterministic projectionReferenceId
```

同一 Eligibility：

```text
unique key：
crystalEligibilityReferenceId + eligibilityRevision
```

数据库约束与 Domain guard 共同保证：

```text
最多一份 Formation Receipt
```

### 12.2 Personality Ring / Archive projection

现有：

```text
guanyao:personalityRingLite
```

必须从新的形成成功 Authority 中移出 localStorage read-modify-write 真源。

目标：

- 既有 Ring entries 原样保留；
- 新正式 Crystal 使用 `crystalReferenceId` 作为 deterministic entry ID；
- canonical projection 与 Growth Formation 在同一 transactional store 中提交；
- localStorage Ring 只允许作为兼容镜像；
- 兼容镜像失败不重复 Formation；
- 镜像重试只处理 projection；
- UI 必须区分 `FORMED` 与 `PROJECTION_RETRYABLE`。

### 12.3 不能跨 Storage 假装原子

禁止：

```text
IDB Receipt committed
↓
localStorage Archive write
↓
把两者描述为同一原子 transaction
```

如果兼容镜像仍需保留，正式语义必须是：

```text
IDB canonical formation：
PERMANENT

legacy localStorage mirror：
DERIVED / RETRYABLE
```

### 12.4 UI truth

| Authority outcome | UI |
|---|---|
| Transaction `complete` + Receipt 可恢复 | 可以显示 Crystal 已形成 |
| Transaction `abort` | 不显示成功 |
| IDB unavailable | `SAFE_WITHHELD` |
| import conflict | `SAFE_WITHHELD` |
| Projection mirror failure | Crystal 保留；显示投影稍后恢复 |
| Duplicate command | 恢复同一 Receipt，不生成第二颗 |
| Stale writer | 显示已在另一处更新，重新读取 |

---

## 十三、消费者迁移矩阵

| 消费者 / 资产 | 48b48c7 状态 | 目标裁决 |
|---|---|---|
| `XinmaiLivedGrowthTransactionAuthority` | Web Lock + localStorage | MIGRATE：IDB transaction authority |
| Growth Recovery Adapter | localStorage read/write | MIGRATE：V1 只读 legacy + async canonical adapter |
| Revision Observer | storage event | ADAPT：只通知 canonical 重读 |
| Choice Controller | async command consumer | KEEP contract / ADAPT store |
| Lived Response Authority | async command consumer | KEEP contract / ADAPT store |
| Eligibility Authority | async command consumer | KEEP contract / ADAPT store |
| Formation Consumer | Receipt + Projection | MIGRATE：canonical formation + projection |
| Gravity Page | typed async outcome | KEEP，禁止新增 Storage |
| Returning Surface | typed async outcome | KEEP，禁止新增 Storage |
| LaunchLab | sync Recovery query | ADAPT：async canonical hydration |
| Acceptance Page | 生产 API 验收 | ADAPT：IDB fault / concurrency |
| Browser Harness | 多标签验收 | MIGRATE：真实 transaction matrix |
| Personality Ring Deposit Adapter | localStorage RMW | MIGRATE：derived projection adapter |
| Personality Ring Service | localStorage canonical | ISOLATE：legacy mirror only |
| Personality Ring Persistence | direct localStorage write | RESTRICT：canonical projector only |
| Renderer | 无消费 | REJECT |
| Pressure Seed / Gravity Engine | 无消费 | REJECT |
| AI / Six Dimension / Choice semantics | 无资格生产 | REJECT |
| Phase 4 Sanctuary | 未授权 | REJECT |

### 13.1 读 API

当前同步 Recovery read 不能继续冒充 canonical IDB read。

需要：

- async hydration；
- typed `LOADING / FOUND / NOT_FOUND / UNAVAILABLE / CONFLICT`；
- presentation 可以持有只读 snapshot；
- mutation 必须在 transaction 内重新读取；
- 页面 snapshot 永远不能直接提交。

### 13.2 Observer

允许：

- `BroadcastChannel`；
- IDB transaction complete 后的同进程通知；
- storage mirror event。

但它们都只能：

```text
notify → reread canonical
```

不能：

- 携带业务成功权威；
- 推进 revision；
- 自动形成 Crystal；
- 替代 transaction complete。

---

## 十四、文件迁移清单

### 14.1 基于 48b48c7 必须重新实施

48 的 23 个文件不能直接推送或 amend。

其已验证的 typed consumer 与 Gate 设计可以作为参考，但必须在远程正式基线 / 审计提交之上重新形成一个新的原子 commit。

### 14.2 新增 Runtime

建议新增：

```text
src/services/xinmaiLivedGrowthTransactionalStore.ts
src/services/xinmaiLivedGrowthLegacyV1ImportAdapter.ts
src/types/xinmaiLivedGrowthTransactionalStore.ts
```

如 projection 不能安全放入同一 canonical record，可新增：

```text
src/services/xinmaiLivedGrowthProjectionAdapter.ts
```

它仍必须消费同一 IDB transaction / outbox，不能创建第二 Persistence Authority。

### 14.3 修改 Runtime

```text
src/services/xinmaiLivedGrowthTransactionAuthority.ts
src/services/xinmaiLivedGrowthRecoveryPersistenceAdapter.ts
src/services/xinmaiLivedGrowthRecoveryRevisionObserver.ts
src/services/xinmaiChoiceActionIntentionController.ts
src/services/xinmaiLivedResponseAuthorityController.ts
src/services/xinmaiCrystalEligibilityAuthority.ts
src/services/xinmaiCrystalFormationConsumer.ts

src/services/guanyaoDynamicsPersonalityRingDepositAdapter.ts
src/services/personalityRingLiteService.ts
src/services/guanyaoPersonalityRingLitePersistenceAdapter.ts

src/components/XinmaiLivedResponseReturnSurface.tsx
src/pages/GravityPage.tsx
src/pages/LaunchLab.tsx
src/pages/XinmaiLivedGrowthAcceptancePage.tsx
```

### 14.4 Gate / Harness

在 48 的新 Gate 基础上重新建立：

```text
Transaction Store Authority Gate
Legacy localStorage Writer Forbidden Gate
Transaction Complete Success Gate
Cross-Tab Different-Lineage Preservation Gate
Same-Lineage Duplicate Formation Forbidden Gate
Formation Projection Consistency Gate
V1 No Backfill Gate
Legacy Import Conflict Safe-Withheld Gate
```

修改：

```text
scripts/check-xinmai-lived-growth-transaction-authority.mjs
scripts/check-xinmai-lived-growth-multi-tab-atomicity.mjs
scripts/check-xinmai-lived-growth-post-formation-lineage-terminal.mjs
scripts/check-xinmai-lived-growth-production-browser-acceptance-harness.mjs
scripts/check-xinmai-formation-receipt-atomicity.mjs
scripts/check-xinmai-crystal-formation-consumer.mjs
package.json
```

### 14.5 禁止扩张

不得修改：

- Renderer；
- StarBeast；
- Reality / Gravity Admission；
- Pressure Seed；
- Six Dimension；
- AI；
- Relationship Naming；
- Life Whisper；
- Crystal 视觉；
- Sanctuary；
- 商业化；
- Phase 4 长期 Archive Growth。

---

## 十五、48b48c7 的处置

```text
Delivery：
REJECT

Push：
REJECT

Amend：
REJECT

Cherry-pick as Runtime delivery：
REJECT

Local evidence baseline：
KEEP
```

后续 corrective migration：

- 从远程正式基线与本审计文档提交继续；
- 可以参考 48 的 typed contracts 与消费者改造；
- 必须重新实施为新的原子提交；
- 提交 SHA 必须与 48 不同；
- 不得先推 48，再补事务 Storage；
- 不得保留 `localStorage Authority + IDB Authority` 双真源。

---

## 十六、新原子提交边界

同一个 Runtime commit 必须同时包含：

```text
建立 Transactional Store
+
导入并冻结 V1 read-only 边界
+
建立 canonical revision / fencing
+
迁移 Growth Transaction Authority
+
切换全部 mutation consumers
+
切换 Recovery readers
+
Formation + Receipt + Crystal + projection canonicalization
+
删除 localStorage mutation authority
+
删除 self-confirmation success path
+
建立 transaction-complete typed outcome
+
切换 Gate / Harness
+
建立 legacy import conflict Safe Withheld
```

禁止中间态：

```text
IDB Authority + localStorage Authority
```

也禁止：

```text
localStorage writer 已删
但 Recovery / Projection 尚未切换
```

### 16.1 成功提交点

唯一成功提交点：

```text
IDBTransaction complete
```

### 16.2 原子回滚单位

Runtime commit 可以整体 forward-disable，但不能普通 revert 回错误 Authority。

回滚不得：

- 恢复 48 的 localStorage writer；
- 恢复 direct writer；
- 恢复同步 mutation；
- 恢复页面成功旁路；
- 删除 IDB 已提交资产；
- 删除 V1 数据。

---

## 十七、真实浏览器并发矩阵

### 17.1 必须通过

#### 同一 lineage

- 双标签同时确认 Fact；
- Formation 前另一标签修订；
- 同一 Eligibility 同时形成；
- Formation 后 stale 标签再次确认；
- 同一 Receipt / Crystal / projection 恢复；
- 最终 Receipt = 1。

#### 不同 lineage

- 双标签同时确认；
- 双标签同时 resolve Eligibility；
- 双标签同时 Formation；
- A 与 B 均保留；
- revision 增加两次；
- Receipt A = 1；
- Receipt B = 1；
- Crystal A = 1；
- Crystal B = 1；
- canonical projection A = 1；
- canonical projection B = 1；
- 无 lost write。

#### 事务失败

- transaction abort；
- object store write failure；
- quota / unavailable；
- connection close；
- tab crash；
- transaction complete 前页面卸载；
- stale expected entity revision；
- identity mismatch；
- provenance mismatch；
- import conflict；
- cutover 后 legacy writer；
- projection mirror failure。

#### 恢复

- 刷新；
- 返回；
- 前进 / 后退；
- 同一 command 重试；
- Receipt 已形成但 UI 未呈现；
- projection retry；
- Reduced Motion；
- Storage 清理；
- 多标签 observer 晚到。

### 17.2 浏览器隔离矩阵

必须分别报告：

```text
同标签
同 Browser Context / 同源多标签
同源不同 storage bucket
恢复后的旧标签
IDB 不可用
Web Lock 不可用
```

不得把某一个 Chromium 测试结论写成全部浏览器与全部 profile 的共享本地数据库保证。

不同 storage bucket：

- 本地数据本来就不共享；
- 不属于同一 Growth Envelope 的 lost write；
- 未来跨设备 / 账号同步需独立架构；
- 不得在本刀新增远端 Authority。

### 17.3 UI Truth

每条浏览器路径必须同时记录：

- command；
- transaction ID；
- canonical revision；
- expected entity revision；
- typed outcome；
- persisted Receipt；
- persisted Crystal；
- persisted projection；
- UI 文案；
- 刷新后恢复结果。

Gate 必须失败于：

```text
两个 FORMED outcome
+
最终只保存一个 lineage
```

---

## 十八、SAFE_WITHHELD Forward Rollback

### 18.1 目标

```text
全部新 Growth Mutation：
PAUSED

Transactional Recovery：
READ-ONLY

V1 localStorage：
PRESERVED

既有 Fact / Eligibility / Receipt / Crystal：
PRESERVED

canonical projection：
PRESERVED

旧 writer：
NOT RESTORED
```

### 18.2 触发条件

- 同一 lineage 出现第二个 Receipt；
- 不同 lineage 任一丢失；
- transaction `complete` 前显示成功；
- import conflict 被自动覆盖；
- old V1 writer 重新成为 Authority；
- IDB 与 localStorage 双写同时决定成功；
- projection mirror 失败触发第二次 Formation；
- stale writer 未被拒绝；
- identity / provenance 串写；
- V1 数据被删除或回填；
- 干净远程快照无法复验。

### 18.3 交付前要求

新的 corrective candidate 推送前必须：

1. 生成独立 forward counter-commit；
2. 在候选之上实际预演；
3. 验证只读 Recovery；
4. 验证既有 IDB 与 V1 资产均保留；
5. 验证 localStorage Authority 不复活；
6. 记录 SHA 或可复现 patch 与 SHA-256；
7. 回到 corrective candidate；
8. 再执行干净远程快照门禁。

`abc3e30f` 只能作为策略证据，不能直接应用到新的 Transactional Store。

---

## 十九、风险与资产保护

| 风险 | 级别 | 裁决 |
|---|---|---|
| localStorage stale read | RED | 替换持久化 Authority |
| 两个相同 revision 覆盖 | RED | transaction 内单调 revision |
| UI false success | RED | success 绑定 transaction complete |
| Personality Ring lost projection | RED | canonical transactional projection |
| V1 导入冲突 | RED | preserve + Safe Withheld |
| 旧版本标签晚写 | RED | isolate legacy writer |
| IDB unavailable | YELLOW | Safe Withheld |
| Web Lock unavailable | GREEN after cutover | 不再承担正确性 |
| async Recovery hydration | YELLOW | typed loading / recovery |
| storage bucket 隔离 | YELLOW | 明示本地数据域，不虚报共享 |
| Phase 4 越权 | CLEAR | 只迁移首次形成与既有 projection |

资产保护：

```text
World：
不修改

Identity：
不修改

Relationship：
不修改

Reality provenance：
继续严格校验

V1 Growth：
保留 / 不回填

既有 Crystal：
保留

既有 Personality Ring：
保留

Phase 4：
LOCKED
```

---

## 二十、本刀边界

本刀只新增：

```text
docs/XINMAI_LIVED_GROWTH_CROSS_TAB_FENCING_AND_LOST_WRITE_MIGRATION_AUDIT_P0.md
```

没有：

- 修改 Runtime；
- 修改 Gate；
- 修改 Storage；
- 新建 IndexedDB；
- 迁移数据；
- 形成 Crystal；
- 推送 `48b48c7`；
- 推送 `abc3e30f`；
- 修改远程基线；
- 解锁 Phase 4。

---

## 二十一、刀后交通灯

### GREEN

- lost write 根因已定位；
- Web Lock 范围已证明不是主因；
- V1 保留与 No Backfill 边界明确；
- 48 与 counter-commit 处置明确；
- UI 永久成功提交点明确。

### YELLOW

- 不同 storage bucket 的跨账号 / 跨设备同步不属于本刀；
- legacy import conflict 的用户恢复界面需在 Runtime Prep 中保持最小；
- localStorage Personality Ring 兼容镜像的长期移除应另行 MAP；
- IndexedDB 不可用覆盖率需交付时统计。

### RED

下一 Runtime 必须：

- 新建真实事务持久化 Authority；
- 原子切换全部 Growth mutation 与 Recovery；
- 同提交切断 localStorage Authority；
- 原子形成 Receipt、Crystal 与 canonical projection；
- 建立 V1 legacy import / conflict Safe Withheld；
- 重做多标签 Gate；
- 准备新的 forward counter-commit。

---

## 二十二、下一刀建议

```text
XINMAI-LIVED-GROWTH-TRANSACTIONAL-PERSISTENCE-
AND-CROSS-TAB-FENCING-CORRECTIVE-ATOMIC-MIGRATION-P0

交通灯：
RED

刀型：
Migration Blade / Corrective Atomic Cutover

决策：
DEFER — WAITING FOR PRODUCT CONTROL TOWER RUNTIME AUTHORIZATION

主 Layer：
Layer 4 Growth

保护：
World + Identity + Relationship + Reality provenance

Phase 4：
LOCKED
```

唯一目标：

> 用真实事务型持久化原语原子替换 `48b48c7` 的 Web Lock + localStorage Authority，使同一事务完成事件成为永久形成的唯一成功真源，并保证不同 lineage 并发提交全部保留。

阶段状态：

```text
Phase 3：
ACTIVE / NOT PASSED

Cross-Tab Lost Write Audit：
CLOSED / PASS

Corrective Runtime：
NOT AUTHORIZED

48b48c7：
REJECTED / LOCAL EVIDENCE ONLY

Phase 4：
LOCKED
```
