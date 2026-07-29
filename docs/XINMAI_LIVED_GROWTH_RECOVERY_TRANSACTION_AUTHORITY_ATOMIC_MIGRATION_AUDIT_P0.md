# XINMAI Lived Growth Recovery Transaction Authority Atomic Migration Audit P0

> 任务编号：`XINMAI-LIVED-GROWTH-RECOVERY-TRANSACTION-AUTHORITY-ATOMIC-MIGRATION-AUDIT-P0`
> 交通灯：RED
> 刀型：Migration Audit
> 决策：`NOW — AUDIT ONLY`
> Runtime / Gate：`DEFER`
> 审计基线：`ec3c51185fa97c4bc454ac6db4148fccbfc6eed1`
> 主 Layer：Layer 4 Growth
> 保护 Layer：World、Identity、Relationship、Reality provenance
> 阶段：Phase 3 `ACTIVE / NOT PASSED`，Phase 4 `LOCKED`

---

## 一、唯一目标

冻结从当前：

```text
多个 Domain Controller
↓
直接调用 transactXinmaiLivedGrowthRecovery()
↓
无全局跨标签锁地写同一 Envelope
```

原子迁移到：

```text
Domain Controller
↓ typed command
唯一 Growth Transaction Authority
↓ global Web Lock
Existing Recovery Adapter
↓ confirmed outcome
Domain Controller / Surface
```

并证明未来 Runtime 能在单一提交中：

- 建立唯一 Transaction Authority；
- 将全部 Growth mutation 切换到同一排他边界；
- 删除所有生产 direct transact writer；
- 将同步 mutation 消费者原子迁移为异步；
- 阻止 Formation 后 stale Fact 形成第二颗 Crystal；
- 保持 V1 数据、No Backfill 与既有 Crystal；
- 在失败时执行 forward Safe Withheld Rollback；
- 不产生新旧双路径中间态。

本刀只审计，不修改任何 Runtime、Gate、类型、页面或 Storage。

---

## 二、最终裁决

```text
当前写入者清点：
COMPLETE

当前消费者清点：
COMPLETE

同步 → 异步影响：
COMPLETE

V1 数据兼容：
PASS

Storage key 迁移：
NOT REQUIRED

Schema Backfill：
REJECT

单提交切换：
FEASIBLE

双权威可避免：
YES

Safe Withheld Rollback：
FEASIBLE

最终裁决：
NOW — ATOMIC MIGRATION APPLICATION READY
```

该裁决只允许 Product Control Tower 审查 Runtime 申请，不代表 Runtime 已授权。

---

## 三、当前真实写入链

### 3.1 Storage

当前 Growth Envelope：

```text
key：
xinmai:lived-growth-authority:v1

schema：
XINMAI_LIVED_GROWTH_RECOVERY_V1
```

唯一直接 Storage owner：

```text
src/services/xinmaiLivedGrowthRecoveryPersistenceAdapter.ts
```

该 Adapter 提供：

- `readXinmaiLivedGrowthRecoveryCandidate()`；
- `writeXinmaiLivedGrowthRecoveryCandidate()`；
- `transactXinmaiLivedGrowthRecovery()`。

问题不在第二 Storage owner。

问题在：

> 多个领域服务都可以直接调用无跨标签锁的通用 `transact`。

### 3.2 当前 direct mutation callers

| 文件 | mutation | 调用次数 |
|---|---|---:|
| `xinmaiChoiceActionIntentionController.ts` | create、bind、close | 3 |
| `xinmaiLivedResponseAuthorityController.ts` | confirm / supersede、revoke | 2 |
| `xinmaiCrystalEligibilityAuthority.ts` | resolve / replace Eligibility | 1 |
| `xinmaiCrystalFormationConsumer.ts` | projection、reservation、Receipt commit | 3 |

当前 direct transact 生产调用点：

```text
9
```

目标：

```text
生产 direct transact caller：
1

唯一 caller：
Growth Transaction Authority
```

### 3.3 当前读者

读 Recovery 的合法只读调用：

- Choice outstanding query；
- Lived Response 前置校验；
- Eligibility 前置校验；
- Formation 校验与 Receipt replay；
- 开发 Acceptance surface；
- 动态验收 Harness。

迁移后：

- query 可以继续通过只读 Adapter；
- mutation validation 必须移入全局 transaction callback 内；
- Page 不得新增 Storage 读取；
- Renderer、AI、Pressure Seed 与 Phase 4 不得读取 Growth transaction 状态。

---

## 四、当前生产消费者

### 4.1 Choice Action Intention

生产入口：

```text
GravityPage.handleRevisionActionConfirm()
↓
commitChoiceActionIntention()
```

Reality continuation：

```text
GravityPage.handleChoiceContinueToReality()
↓
bindChoiceActionIntentionToRealityEncounter()
↓
requestRealityEncounter()
↓
/reality
```

当前两个 Controller API 均为同步返回。

迁移后获得 Web Lock，必须变为：

```text
Promise<TypedOutcome>
```

因此 `GravityPage` 两个 handler 必须同提交迁移为 async，并保持：

- 不重复提交；
- bind 未确认不导航；
- stale / lock unavailable 有真实反馈；
- 不生成新 encounterCycleId 重试旁路。

### 4.2 Returning Lived Response

生产入口：

```text
LaunchLab
↓ outstanding intentions
XinmaiLivedResponseReturnSurface
```

Surface 当前同步调用：

- `confirmLivedResponseFact()`；
- `resolveCrystalEligibilityForFact()`；
- `closeChoiceActionIntentionWithoutRecord()`；
- `revokeLivedResponseFact()`。

Formation 已是 async。

迁移必须将整条回访动作改为 async typed outcomes，禁止：

- Fact 成功但 Eligibility 仍使用旧 writer；
- busy 解除早于事务确认；
- stale outcome 被折叠成普通失败；
- Surface 用本地 Eligibility 继续形成。

### 4.3 Returning Recovery

`LaunchLab` 通过：

```text
returningGrowthSurfaceRevision
↓
readOutstandingChoiceActionIntentions()
```

重新计算 Returning surface。

迁移需要一个只读 revision notification adapter，使另一个标签提交后：

- 当前标签重新读取；
- stale surface 关闭或更新；
- notification 不成为 Authority；
- Page 不直接读取 Storage event 内容。

### 4.4 Acceptance

开发 Acceptance page 与动态 Harness 都直接调用正式服务。

迁移后必须同步切换为 async，并新增：

- Formation 后 stale tab；
- 同 Choice lineage 第二次确认；
- 不同 lineage 并发 Formation；
- lock unavailable；
- typed stale / terminal outcomes。

Acceptance 仍必须保持 DEV-only，不能进入生产 bundle。

---

## 五、同步 → 异步迁移

### 5.1 必须变为 async 的 API

```text
commitChoiceActionIntention()
bindChoiceActionIntentionToRealityEncounter()
closeChoiceActionIntentionWithoutRecord()
confirmLivedResponseFact()
revokeLivedResponseFact()
resolveCrystalEligibilityForFact()
```

`formCrystalFromEligibility()` 已是 async，但内部 transaction 必须切换。

### 5.2 可以保持同步的 API

```text
readOutstandingChoiceActionIntentions()
createLivedResponseCandidateReference()
xinmaiGrowthIdentityMatches()
```

只读查询不得推进 revision。

### 5.3 原子编译边界

同一提交必须同时修改：

- service 返回类型；
- Gravity handlers；
- Returning Surface handlers；
- Acceptance page；
- 动态 Harness；
- 相关检查脚本。

否则会出现：

- Promise 被当作结果对象；
- bind 未确认即导航；
- UI 提前解除 busy；
- 测试误报旧同步路径通过。

远程不得存在不能构建的中间提交。

---

## 六、依赖方向与中性身份工具

### 6.1 当前依赖

`xinmaiGrowthIdentityMatches()` 当前定义在：

```text
xinmaiChoiceActionIntentionController.ts
```

并被：

- Lived Response Authority；
- Formation Consumer；

跨领域使用。

### 6.2 循环依赖风险

如果 Choice Controller 导入 Transaction Authority，而 Transaction Authority 或其他域又从 Choice Controller 导入 identity helper，将形成：

```text
Choice Controller
↔
Transaction Authority / Formation
```

### 6.3 迁移裁决

必须抽离到中性、无 Storage、无业务 mutation 的文件：

```text
src/services/xinmaiLivedGrowthIdentity.ts
```

只允许：

```text
xinmaiGrowthIdentityMatches()
```

禁止：

- Storage；
- Controller；
- Eligibility；
- Formation；
- UI；
- AI。

该抽离属于原子迁移必要文件，不是无关重构。

---

## 七、目标 Transaction Authority 文件边界

### 7.1 新增类型

```text
src/types/xinmaiLivedGrowthTransaction.ts
```

包含：

- command metadata；
- expected entity revisions；
- transaction success；
- stale / terminal / provenance / recovery outcomes；
- Safe Withheld reasons。

这些是 Runtime contract，不进入持久化 Envelope。

### 7.2 新增 Authority

```text
src/services/xinmaiLivedGrowthTransactionAuthority.ts
```

唯一职责：

- 获取 `xinmai-lived-growth-envelope:v1` 全局锁；
- 在锁内读取当前 Envelope；
- 执行 Domain Controller 提供的 typed validation + transform；
- 推进一次 Envelope revision；
- 调用 Recovery Adapter 写入；
- 写后确认；
- 返回 typed outcome。

不拥有：

- 用户事实语义；
- Eligibility 规则；
- Crystal 表现；
- Archive；
- Phase 4；
- 页面。

### 7.3 新增只读通知 Adapter

```text
src/services/xinmaiLivedGrowthRecoveryRevisionObserver.ts
```

职责：

- 监听同一 Growth key 的 revision 变化；
- 只发布“需要重新读取”；
- 不解析为业务结论；
- 不写 Storage；
- 不提交 command；
- 不自动重试。

可以使用：

- `storage` event；
- 或 BroadcastChannel。

只能选择一个正式实现，禁止双通知真源。

### 7.4 Recovery Adapter 收窄

`xinmaiLivedGrowthRecoveryPersistenceAdapter.ts`：

- 保持唯一 Storage key；
- 保持 V1 validation；
- 保持 read / write confirmation；
- raw write 与 transact 只允许 Authority 使用；
- 生产 Gate 禁止其他 import；
- 不自行解释 Fact、Eligibility 或 Receipt。

---

## 八、Domain Controller 切换

### 8.1 Choice Controller

必须：

- commit / bind / close 通过 Transaction Authority；
- command 携带 expected Intention revision；
- 同 commandReferenceId 幂等；
- Receipt 已存在时 close 不得破坏 lineage；
- readOutstanding 保持只读。

### 8.2 Lived Response Authority

必须把以下检查移入同一锁内：

```text
Intention current
Fact expected revision
Receipt absence
Eligibility non-pending / non-consumed
identity
encounter
gravity provenance
candidate confirmation
```

Formation 后：

```text
FORMATION_ALREADY_CONFIRMED
```

不得创建 revision 2。

### 8.3 Eligibility Authority

必须在同一 transaction 内：

- 验证 Fact 仍为 current CONFIRMED；
- 验证 Fact revision；
- 验证 lineage 尚无 Receipt；
- 替换或写入 Eligibility；
- 拒绝旧 Fact 资格；
- 不由页面直接持有成功权威。

### 8.4 Formation Consumer

必须：

- 进入全局 Growth lock；
- 检查同 lineage Receipt 数量；
- 拒绝历史多 Receipt lineage 的新 mutation；
- current Fact / Eligibility / Choice / identity / provenance 同时校验；
- deterministic Formation；
- consumed + Receipt 单提交；
- projection 在 Receipt 后执行；
- projection update 再进入全局 transaction。

当前 per-Eligibility lock：

- 可以删除；或
- 作为去重优化保留。

但它不得继续承担 Envelope serializability。

Migration 只能选择一种正式锁顺序并用 Gate 固定。

---

## 九、V1 数据兼容

### 9.1 Storage key

保持：

```text
xinmai:lived-growth-authority:v1
```

不创建第二 key。

### 9.2 Schema

保持：

```text
XINMAI_LIVED_GROWTH_RECOVERY_V1
```

原因：

- command / outcome 不需要持久化；
- 现有 entity revisions 足够校验；
- Formation Receipt 已拥有 deterministic references 与 fencing；
- lineage terminal 可以由 Receipt 派生；
- 新建 V2 只会增加迁移与双 key 风险。

### 9.3 正常历史

已有：

- Intention；
- Fact；
- Eligibility；
- Receipt；

按现有引用继续消费，不重写。

### 9.4 历史多 Receipt

如果同一 `choiceActionIntentionReferenceId` 已有多份 Receipt：

```text
KEEP ALL
+
NO BACKFILL
+
NO AUTO DELETE
+
NO AUTO MERGE
+
SAFE_WITHHELD FOR NEW MUTATION
```

不得选择最新或最早一颗作为“正确 Crystal”并删除另一颗。

### 9.5 `FORMATION_PENDING`

迁移读取到 pending reservation：

- exact Fact、Eligibility、Choice、identity 与 reservation 均匹配时允许确定性恢复；
- Receipt 已存在时返回 `ALREADY_COMMITTED`；
- provenance 失配时 `SAFE_WITHHELD`；
- 不生成新 Formation ID；
- 不清除既有 identity 或 relationship。

### 9.6 Archive-only legacy Crystal

保留可读，不补造：

- Fact；
- Eligibility；
- Receipt。

No Backfill 继续有效。

---

## 十、单提交文件清单

### 10.1 新增 Runtime 文件

```text
src/types/xinmaiLivedGrowthTransaction.ts
src/services/xinmaiLivedGrowthTransactionAuthority.ts
src/services/xinmaiLivedGrowthIdentity.ts
src/services/xinmaiLivedGrowthRecoveryRevisionObserver.ts
```

### 10.2 修改 Runtime 文件

```text
src/services/xinmaiLivedGrowthRecoveryPersistenceAdapter.ts
src/services/xinmaiChoiceActionIntentionController.ts
src/services/xinmaiLivedResponseAuthorityController.ts
src/services/xinmaiCrystalEligibilityAuthority.ts
src/services/xinmaiCrystalFormationConsumer.ts

src/components/XinmaiLivedResponseReturnSurface.tsx
src/pages/GravityPage.tsx
src/pages/LaunchLab.tsx
src/pages/XinmaiLivedGrowthAcceptancePage.tsx
```

### 10.3 新增 Gate

```text
scripts/check-xinmai-lived-growth-transaction-authority.mjs
scripts/check-xinmai-lived-growth-post-formation-lineage-terminal.mjs
scripts/check-xinmai-lived-growth-multi-tab-atomicity.mjs
```

### 10.4 修改既有 Gate / Harness

```text
scripts/check-xinmai-choice-action-intention-boundary.mjs
scripts/check-xinmai-lived-response-authority.mjs
scripts/check-xinmai-crystal-eligibility-authority.mjs
scripts/check-xinmai-formation-receipt-atomicity.mjs
scripts/check-xinmai-crystal-formation-consumer.mjs
scripts/check-xinmai-duplicate-crystal-formation-forbidden.mjs
scripts/check-xinmai-lived-growth-production-browser-acceptance-harness.mjs
scripts/check-xinmai-lived-growth-browser-acceptance-surface.mjs
package.json
```

### 10.5 条件文件

以下文件仅在 TypeScript contract 需要导出时允许修改：

```text
src/types/index.ts
```

不得借机修改：

- Renderer；
- Reality / Gravity Admission；
- Pressure Seed；
- Six Dimension；
- AI；
- Phase 4 Sanctuary；
- Crystal 视觉；
- Relationship Naming；
- Life Whisper。

---

## 十一、同一提交内的实施顺序

开发工作可以按顺序进行，但远程只能出现一个原子提交。

内部实施顺序：

```text
1. 新增中性 identity helper
2. 新增 typed transaction contract
3. 新增 Transaction Authority
4. 收窄 Recovery Adapter
5. 迁移 Choice Controller
6. 迁移 Lived Response Authority
7. 迁移 Eligibility Authority
8. 迁移 Formation + Projection
9. 迁移 Gravity async consumers
10. 迁移 Returning Surface async consumers
11. 接入 revision observer
12. 迁移 Acceptance + Harness
13. 建立专属 Gate
14. 删除全部旧 direct transact imports
15. TypeScript / Build / Browser
```

提交前必须证明：

```text
新 Authority：
存在

旧 production direct writer：
0

旧同步 mutation consumer：
0

同一 Choice lineage 第二 Receipt：
0
```

---

## 十二、无双路径证明

未来 Migration Gate 必须扫描：

### 12.1 Writer

允许 import：

```text
xinmaiLivedGrowthTransactionAuthority
→ Recovery Adapter raw write / transact
```

禁止：

```text
Choice Controller → direct transact
Lived Response Authority → direct transact
Eligibility Authority → direct transact
Formation Consumer → direct transact
Page / Component → direct write
```

### 12.2 Formation

唯一合法链：

```text
ELIGIBLE
↓ global transaction
FORMATION_PENDING
↓ deterministic formation
CONSUMED + Receipt
```

禁止：

- 页面 eligibility；
- Fact revision 自动放行；
- Archive existence 放行；
- per-Eligibility lock 单独放行；
- fixed timer；
- DOM；
- AI；
- Phase 4。

### 12.3 Recovery

唯一 Storage writer：

```text
Recovery Adapter
```

唯一 mutation caller：

```text
Transaction Authority
```

Observer 只能通知重新读取。

---

## 十三、Typed outcome 到 UI

### 13.1 Gravity

| Outcome | UI / 导航 |
|---|---|
| `COMMITTED` | 进入既有 transformation moment |
| `ALREADY_COMMITTED` | 恢复同一 Intention |
| `STALE_INTENTION_REVISION` | 重新读取，不导航 |
| `TRANSACTION_LOCK_UNAVAILABLE` | 非阻断反馈，允许重试 |
| `WRITE_UNCONFIRMED` | 不声称保存成功 |

### 13.2 Returning Surface

| Outcome | UI |
|---|---|
| `COMMITTED` | 显示当前 Fact / Eligibility |
| `STALE_FACT_REVISION` | 显示“已在另一处更新”，重新读取 |
| `FORMATION_ALREADY_CONFIRMED` | 恢复已有 Crystal，关闭提交入口 |
| `FORMATION_IN_PROGRESS` | 等待或稍后重试 |
| `IDENTITY_MISMATCH` | 返回安全生命空间 |
| `TRANSACTION_LOCK_UNAVAILABLE` | 保留草稿，不伪造成功 |

### 13.3 Formation

| Outcome | UI |
|---|---|
| `FORMED` | Receipt 确认后展示形成 |
| `ALREADY_FORMED` | 恢复同一 Receipt |
| `SAFE_WITHHELD` | 不宣称永久形成 |
| `LEGACY_MULTIPLE_FORMATION_RECEIPTS` | 保留历史并停止新形成 |

---

## 十四、Gate 切换

### 14.1 新 Gate

#### Transaction Authority Gate

保护：

- 全局 lock name 唯一；
- raw writer caller 唯一；
- mutation API async；
- no direct writer。

#### Post-Formation Lineage Terminal Gate

保护：

- Receipt presence blocks new Fact；
- Receipt presence blocks new Eligibility；
- Receipt per Choice lineage ≤ 1；
- stale surface typed outcome。

#### Multi-Tab Atomicity Gate

保护：

- same Fact concurrent confirmation；
- post-Formation stale confirmation；
- same Eligibility race；
- different lineage race；
- no lost Receipt；
- no false success。

### 14.2 既有 Gate

既有 Gate 不能只搜索旧函数名。

必须校准为：

- typed command presence；
- expected revision；
- global transaction；
- Receipt lineage guard；
- async consumer；
- No Backfill；
- forbidden consumer。

### 14.3 Gate 原子替换

新 Gate 与旧路径删除必须同提交。

禁止：

```text
先删旧 Gate
后补新 Authority Gate
```

也禁止：

```text
新 Gate 只检查源码字符串
但真实双标签路径仍产生 Receipt 2
```

---

## 十五、验收矩阵

### 15.1 静态与构建

```text
TypeScript：
PASS

Production Build：
PASS

全部 XINMAI Gates：
PASS

Persistence Boundaries：
PASS

Production bundle DEV acceptance：
ABSENT

新增失败：
0
```

### 15.2 单标签

- Intention commit；
- bind 后 Reality continuation；
- Fact initial confirmation；
- Formation 前 amendment；
- Formation 前 revoke；
- Eligibility resolve；
- Formation；
- Projection；
- refresh recovery；
- no action；
- user reject；
- changed response；
- Reduced Motion。

### 15.3 多标签

#### A｜同时确认第一份 Fact

```text
最多一份 current Fact
另一个 command = stale / already committed
```

#### B｜Formation 前修订

```text
旧 Fact superseded
旧 Eligibility invalidated
新 Fact current
旧标签不能形成
```

#### C｜Formation 后 stale 表面

```text
第一标签 Receipt 1
第二标签确认
→ FORMATION_ALREADY_CONFIRMED
最终 Receipt 1 / Archive 1
```

#### D｜同一 Eligibility race

```text
FORMED + ALREADY_FORMED
同一 Formation reference
Receipt 1
```

#### E｜不同 lineage race

```text
Receipt A + Receipt B
均可恢复
无覆盖、无丢失
```

### 15.4 失败

- global lock unavailable；
- Storage unavailable；
- corrupted Envelope；
- write unconfirmed；
- stale command；
- identity mismatch；
- encounter mismatch；
- Gravity provenance mismatch；
- Formation engine unavailable；
- projection failure；
- pending reservation recovery；
- history with multiple Receipts。

### 15.5 真实浏览器要求

不得用源码字符串代替：

- post-Formation stale tab；
- different-lineage concurrent Formation；
- same-lineage Receipt count；
- Archive projection count；
- refresh / back-forward；
- stale feedback；
- Reduced Motion。

---

## 十六、干净快照与远程门禁

未来 Delivery 必须：

```text
远程目标提交可获取
↓
建立隔离干净快照
↓
连接声明依赖
↓
TypeScript PASS
↓
Production Build PASS
↓
Authority / Persistence / XINMAI Gates PASS
↓
真实浏览器多标签 PASS
↓
远程 HEAD 与验收提交一致
```

本地主工作树不得作为远程构建证据。

提交文件必须与本审计清单一致；任何新增 Renderer、Phase 4 或 Pressure 文件立即停止。

---

## 十七、Safe Withheld Rollback

### 17.1 回滚单位

Runtime Migration 是一个提交。

但错误权威不能通过普通 revert 恢复。

预备：

```text
forward counter-commit
```

### 17.2 Counter-commit 范围

只允许：

- Transaction Authority 返回全局 `SAFE_WITHHELD`；
- mutation UI 禁用或显示稍后重试；
- 保留只读 Recovery；
- 保留既有 Fact、Eligibility、Receipt、Crystal 与 Archive；
- 保留 V1 key。

不得：

- 恢复 direct transact callers；
- 恢复 sync mutation；
- 恢复 Formation 后 Fact revision；
- 清空 Envelope；
- 删除历史 Crystal；
- 解锁 Phase 4。

### 17.3 触发条件

- direct writer 未清零；
- stale Fact commit；
- post-Formation Receipt 2；
- different-lineage lost Receipt；
- 双 Authority；
- identity / provenance 串写；
- lock unavailable 时仍写入；
- UI false success；
- clean snapshot 不可复现。

---

## 十八、风险裁决

| 风险 | 当前级别 | 迁移控制 |
|---|---|---|
| 同 Choice 第二 Crystal | RED | Receipt lineage terminal guard |
| localStorage 非 CAS | RED | global Web Lock |
| 同步 API 变 async | RED | 全消费者同提交 |
| 循环依赖 | YELLOW | identity helper 抽离 |
| 不同 lineage lost write | RED | global Envelope serialization |
| stale UI | YELLOW | typed outcome + revision observer |
| Web Lock 不可用 | YELLOW | Safe Withheld |
| V1 历史异常 | YELLOW | isolate / no backfill |
| Phase 4 越权 | CLEAR | forbidden consumer Gate |

不存在必须创建第二 Storage、第二 Eligibility Authority 或新 Crystal Engine 的理由。

---

## 十九、Runtime 申请

Migration Audit 已完成：

- 当前写入者；
- 当前消费者；
- async contract；
- neutral dependency；
- 新 Authority 文件；
- 原子提交文件；
- 数据兼容；
- Gate；
- 验收；
- rollback。

最终裁决：

```text
NOW — ATOMIC MIGRATION APPLICATION READY
```

Runtime 仍需 Product Control Tower 独立授权：

```text
XINMAI-LIVED-GROWTH-RECOVERY-TRANSACTION-AUTHORITY-ATOMIC-MIGRATION-P0
```

---

## 二十、本刀边界

本刀只新增 Migration Audit 文档。

没有：

- 修改 Runtime；
- 修改 Gate；
- 新增类型；
- 新增 Service；
- 修改 Storage；
- 修改数据；
- 形成 Crystal；
- 修改 Renderer；
- 接入 AI；
- 修改 Pressure / Gravity；
- 解锁 Phase 4。

---

## 二十一、刀后交通灯

### GREEN

- V1 key / Schema 可保留；
- No Backfill 可保留；
- identity / relationship / Reality provenance 无需迁移；
- Phase 4 越权未发现。

### YELLOW

- 非形成型 Fact Amendment 继续 DEFER；
- 历史多 Receipt 的产品展示需另行 MAP；
- revision notification 实现需在 Runtime 中选择单一路径。

### RED

Runtime 必须 Atomic Migration：

- Transaction Owner 替换；
- 9 个 direct writes 清零；
- 6 个同步 API 异步化；
- 多生产消费者同提交；
- old/new Gate 同提交切换；
- forward rollback。

---

## 二十二、下一刀建议

```text
XINMAI-LIVED-GROWTH-RECOVERY-TRANSACTION-AUTHORITY-ATOMIC-MIGRATION-P0

交通灯：
RED

刀型：
Migration Blade / Atomic Cutover

决策：
DEFER — WAITING FOR PRODUCT CONTROL TOWER AUTHORIZATION

主 Layer：
Layer 4 Growth

Phase 4：
LOCKED
```

授权后唯一目标：

> 在单一提交中建立全局 Growth Transaction Authority，切换全部 mutation 消费者，删除 direct writer，并使 Formation 后 stale 标签只能恢复同一 Crystal，不能形成第二颗。

阶段状态保持：

```text
Phase 3：
ACTIVE / NOT PASSED

Migration Audit：
CLOSED / PASS

Transaction Authority Runtime：
NOT ESTABLISHED

Phase 4：
LOCKED
```
