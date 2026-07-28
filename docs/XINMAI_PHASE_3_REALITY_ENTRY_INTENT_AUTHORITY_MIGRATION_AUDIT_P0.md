# XINMAI PHASE 3 REALITY ENTRY INTENT AUTHORITY MIGRATION AUDIT P0

## 文档定位

任务：

```text
XINMAI-PHASE-3-REALITY-ENTRY-INTENT-AUTHORITY-MIGRATION-AUDIT-P0
```

项目：

```text
/Users/xieyanjun/Desktop/guanyao-h5
```

刀型：

```text
Migration Audit
```

主 Layer：

```text
Layer 3｜Relationship
↓
Layer 4｜Growth Entry
```

保护 Layer：

```text
Layer 1｜World
Layer 2｜Identity
```

决策：

```text
NOW — AUDIT ONLY
```

本刀不修改 Runtime，不新增类型、服务、Engine、路由、持久化字段或消费者。

本刀只回答：

> Phase 2 已成立的生命关系，如何被转换为唯一、类型化、身份绑定、当前周期有效的 Reality Encounter Intent，并原子替换“持久化身份即可进入 Reality”的旧准入权威。

---

## 一、Construction State Card

```text
当前 Phase：
Phase 2 CLOSED
Phase 3 ENTRY LOCKED

当前主线：
Relationship Intent
↓
Reality Adventure

本刀类型：
Migration Audit

主影响 Layer：
Layer 3 Relationship
Layer 4 Growth Entry

保护 Layer：
Layer 1 World
Layer 2 Identity

已有完成资产：
Recognition
Life Whisper
StarBeast Relationship Response
Optional Relationship Naming
Returning Life Recovery
Reality V2
Pressure Seed Matrix V2

当前阻断：
页面级关系意愿不是 Route Authorization 的输入
持久化身份可合成 Reality Eligibility

是否需要迁移审计：
YES

决策：
NOW — AUDIT ONLY
```

---

## 二、Migration Audit 总结

### 2.1 当前状态

当前系统已经存在两类正确但职责不同的事实：

```text
Identity Fact
回答：
“这是不是同一个生命？”
```

```text
Relationship Intent
回答：
“用户是否在当前周期愿意进入新的 Reality？”
```

页面层已经能够判断 Relationship Intent：

```text
(WHISPER_SUBMITTED && SETTLED)
||
WHISPER_SKIPPED
||
(WHISPER_SUBMITTED
 && UNAVAILABLE
 && CONTINUE_WITHOUT_CONFIRMED_RESPONSE)
```

但该判断目前只返回：

```text
boolean
```

它没有形成：

- 类型化事实；
- 身份绑定；
- 当前周期标识；
- 恢复边界；
- 生命周期；
- Route Authorization 输入。

### 2.2 当前实际准入权威

正式 `/reality` 当前消费：

```text
GenesisProductionRealityEntryContext
```

而该 Context 可以通过两种方式出现：

```text
用户显式进入
↓
activateGenesisProductionRealityEntryContext
```

或：

```text
持久化身份恢复
↓
restoreGenesisProductionRealityEntryContext(sourceReferenceId)
↓
合成 REALITY_ENTRY_ELIGIBLE
```

因此当前实际规则是：

```text
已认出的生命身份
≈
当前 Reality 进入意愿
```

该等式不成立。

### 2.3 目标状态

目标规则：

```text
同一生命身份
+
当前周期明确意愿
+
身份引用一致
↓
Reality Route Authorized
```

冻结：

> Identity 是进入 Reality 的必要条件，但永远不是当前 Reality Intent 的充分条件。

### 2.4 迁移结论

```text
是否需要生产迁移：
YES

迁移类型：
Atomic Migration

是否新增 Reality：
NO

是否新增 Pressure Seed：
NO

是否保留 Reality V2：
YES

是否保留 Pressure Seed Matrix V2：
YES
```

---

## 三、证据等级

本审计严格区分：

```text
P｜协议声明
S｜源码结构
G｜自动门禁
B｜真实浏览器行为
C｜干净快照构建
```

### 3.1 基线

```text
Baseline Commit：
c4cb8bc83b9f77e36f10e65dce1d382ef6db3637

Remote：
origin/codex/genesis-28-mansion-production-continuity

Worktree：
隔离干净快照
```

### 3.2 浏览器证据

#### 无身份直接 URL

干净端口、无持久化身份时直接访问：

```text
/reality
```

结果：

```text
SOURCE_NOT_READY
↓
你的生命世界还未唤醒
```

证据等级：

```text
B
```

#### 有持久化身份直接 URL

存在已认出身份时直接访问：

```text
/reality
```

真实结果：

```text
AUTHORIZED_PRODUCTION_REALITY_SOURCE
sourceReferenceId = launch:1995-06-02:酉时
captureState = OBSERVING_CANDIDATES
entryOrigin = GENESIS_CONTINUATION
guard = null
```

该路径没有当前页面级 Relationship Intent。

证据等级：

```text
B + S
```

#### 有持久化身份刷新

硬刷新 `/reality` 后：

```text
AUTHORIZED_PRODUCTION_REALITY_SOURCE
OBSERVING_CANDIDATES
```

当前 Runtime 无法区分：

```text
刷新一个已激活 Reality
```

与：

```text
仅凭身份直接打开 Reality
```

证据等级：

```text
B + S
```

---

## 四、当前准入来源清点

### 4.1 新用户

当前链：

```text
Genesis Completion
↓
Recognition
↓
Life Whisper
↓
StarBeast Response / Skip
↓
resolveFirstEncounterRealityEntryIntent
↓
boolean true
↓
用户点击 ENTER_REALITY
↓
Genesis session 进入 REALITY_ENTRY_ELIGIBLE
↓
activateGenesisProductionRealityEntryContext
↓
activateRealityRouteActivationSourceContext
↓
navigate(/reality)
```

正确部分：

- 用户明确参与；
- Relationship Intent 在页面上真实成立；
- 同一 `sourceReferenceId`；
- 显式点击后才导航；
- 原始 Life Whisper 没有进入 Reality；
- Reality V2 是唯一目标。

缺口：

- `boolean true` 没有成为权威类型；
- 没有 current cycle id；
- 没有进入 Route Authorization；
- 刷新后只剩身份恢复；
- Genesis Eligibility 同时承担身份与意愿。

### 4.2 老用户

当前链：

```text
Returning Identity Recovery
↓
Returning Visual Continuity
↓
Life Whisper
↓
StarBeast Response / Skip
↓
resolveLifeWhisperRealityEntryIntent
↓
boolean true
↓
用户点击 RETURNING_REALITY_INTENT
↓
navigate(/reality, {
  returningEntry: SAME_LIFE_NEW_REALITY
})
```

正确部分：

- 不重新出生；
- 不重新计算二十八宿；
- 同一 StarBeast；
- 历史 Reality 只作为 memory key；
- 历史 Crystal 只作为 imprint；
- 当前 Life Whisper 原文销毁；
- 用户可明确跳过；
- 用户可在回应不可用时明确继续同行。

缺口：

- 返回页没有创建 Route 可验证的 typed intent；
- `returningEntry` 是 route display state，不是授权事实；
- 硬刷新后 `location.state` 消失；
- Route 通过身份恢复重新授权；
- 页面意愿与 Route 权威断开。

### 4.3 刷新

当前链：

```text
location.state 丢失
↓
in-memory entry context 丢失
↓
读取持久化生命身份与视觉资产
↓
restoredIdentityReady
↓
restoreGenesisProductionRealityEntryContext
↓
合成 REALITY_ENTRY_ELIGIBLE
↓
重新授权
```

问题：

```text
刷新恢复
```

与：

```text
未经当前意愿的直接进入
```

使用同一个恢复条件。

### 4.4 直接 URL

当前行为：

| 身份状态 | 结果 |
| --- | --- |
| 无身份 | `SOURCE_NOT_READY` |
| 有已认出身份 | `AUTHORIZED` |

正确目标：

| 身份状态 | 当前 Encounter Intent | 结果 |
| --- | --- | --- |
| 无身份 | 无 | `SOURCE_NOT_READY` |
| 有身份 | 无 | 返回同一生命安全空间 |
| 有身份 | `READY / ACTIVE` 且一致 | 恢复当前 Reality |
| 有身份 | 过期、损坏或失配 | 清除 Intent，返回安全空间 |

### 4.5 既有 Choice Continuation

生产代码还存在：

```text
GravityPage
↓
navigate(/reality, {
  choiceContinuation:
    AWAITING_LIVED_RESPONSE_RECOGNITION
})
```

这不是本刀新增范围，但它是 `/reality` 的真实生产者。

若未来 Route Authorization 改为强制消费 Encounter Intent，而不适配该生产者，将破坏既有循环。

因此 Atomic Migration 必须同时处理：

```text
FIRST_ENCOUNTER
RETURNING_LIFE_WORLD
CHOICE_CONTINUATION
```

这不是扩张 Phase 3 玩法，而是保护已有消费者。

---

## 五、当前权威所有者

### 5.1 Relationship Intent 的当前所有者

当前所有者不是一个服务，而是两个页面：

| 场景 | 当前所有者 | 输出 |
| --- | --- | --- |
| 新用户 | `GenesisProductionExperiencePage` | boolean |
| 老用户 | `LaunchLab` | boolean |

共用 resolver：

```text
resolveLifeWhisperRealityEntryIntent
```

该 resolver 只判断页面可达性。

### 5.2 Route Eligibility 的当前所有者

当前权威：

```text
GenesisProductionRealityEntryContext
```

它由 module-level memory 保存。

### 5.3 恢复权威

当前恢复权威：

```text
persisted identity
↓
restoreGenesisProductionRealityEntryContext
```

### 5.4 当前权威分裂

```text
页面：
知道用户是否愿意进入

Route：
不知道该意愿

Route：
只知道身份是否可恢复
```

结论：

```text
Authority Split = CONFIRMED
```

---

## 六、目标权威：Reality Encounter Intent

### 6.1 最高定义

冻结：

> Reality Encounter Intent 是用户在同一生命关系中，对“让一段新的现实靠近”所作出的当前周期授权事实。

它不是：

- 身份资产；
- Pressure Seed；
- Reality Event；
- Life Whisper 原文；
- AI 理解；
- 关系名；
- 长期成长资产。

### 6.2 权威所有者

目标所有者：

```text
Typed Relationship → Growth Entry Bridge
```

建议工程责任名：

```text
RealityEncounterIntentService
```

它不是 Engine。

它只负责：

- 创建当前周期 intent；
- 校验身份绑定；
- 激活当前周期；
- 为刷新恢复最小 envelope；
- 消费或清除；
- 拒绝过期、损坏、失配和旧周期事实。

页面不再拥有授权真源。

页面只生产：

```text
用户明确动作
```

Route 不再合成意愿。

Route 只消费：

```text
已成立的 typed intent
```

---

## 七、目标类型契约

以下为迁移冻结，不是本刀新增类型。

```ts
type RealityEncounterIntent = Readonly<{
  schemaVersion: "XINMAI_REALITY_ENCOUNTER_INTENT_V1";
  source: "xinmai_reality_encounter_intent";

  intentReferenceId: string;
  encounterCycleId: string;

  sourceReferenceId: string;
  starBeastIdentityReferenceId: string;
  mansionCoordinateReferenceId: string;

  origin:
    | "FIRST_ENCOUNTER"
    | "RETURNING_LIFE_WORLD"
    | "CHOICE_CONTINUATION";

  relationshipResolution:
    | "WHISPER_RESPONSE_SETTLED"
    | "WHISPER_SKIPPED"
    | "RESPONSE_UNAVAILABLE_EXPLICITLY_CONTINUED"
    | "LIVED_RESPONSE_CONTINUATION";

  status:
    | "READY_TO_ENTER_REALITY"
    | "ACTIVE_IN_REALITY";

  routeTarget: "/reality";
  issuedAt: string;
  expiresAt: string;

  provenance: Readonly<{
    explicitUserAction: true;
    identityBound: true;
    currentCycleOnly: true;
    containsRawWhisper: false;
    containsRelationshipName: false;
    containsPressureSeed: false;
    containsSixDimension: false;
    containsGravity: false;
    containsChoiceResult: false;
    containsCrystal: false;
  }>;
}>;
```

### 7.1 三项身份引用

必须绑定：

```text
sourceReferenceId
starBeastIdentityReferenceId
mansionCoordinateReferenceId
```

来源：

```text
已认出的 visualContinuity
```

与现有 Relationship Naming 资产使用同一身份校验语法。

目的：

- 防止跨生命串用；
- 防止 StarBeast 身份漂移；
- 防止二十八宿坐标漂移；
- 不重新计算身份；
- 不复制身份资产。

### 7.2 不得携带的内容

禁止进入 Intent：

- Life Whisper 原文；
- 推断出的语义；
- 关系名；
- 天地之名文案；
- Pressure Seed；
- 历史 Reality；
- 历史 Crystal；
- 六维；
- Gravity；
- AI 输出；
- Choice 结论。

### 7.3 Intent 创建时点

Intent 不在以下时点创建：

```text
Whisper 提交
Response SETTLED
SKIPPED
关系名保存
```

这些事实只建立“可以进入”的资格。

Intent 只在用户明确点击：

```text
进入现实观察
```

或：

```text
和它一起进入新的现实
```

或既有：

```text
继续回到 Reality 的 lived-response 动作
```

时创建。

因此：

```text
关系资格
≠
Reality Intent

用户明确进入动作
=
Reality Intent
```

---

## 八、新老用户统一规则

### 8.1 新用户 Adapter

输入：

```text
Recognition confirmed
Life Whisper relation intent resolved
同一身份三项引用
用户点击 ENTER_REALITY
```

输出：

```text
RealityEncounterIntent {
  origin: FIRST_ENCOUNTER
}
```

### 8.2 老用户 Adapter

输入：

```text
Returning identity restored
Returning visual continuity ready
Life Whisper relation intent resolved
同一身份三项引用
用户点击 RETURNING_REALITY_INTENT
```

输出：

```text
RealityEncounterIntent {
  origin: RETURNING_LIFE_WORLD
}
```

### 8.3 Choice Continuation Adapter

输入：

```text
同一 Reality / Gravity / Choice 已有连续性
同一身份三项引用
用户明确继续
```

输出：

```text
RealityEncounterIntent {
  origin: CHOICE_CONTINUATION
  relationshipResolution: LIVED_RESPONSE_CONTINUATION
}
```

它只用于保护已有生产消费者。

不得借此深化 Phase 4。

### 8.4 统一结果

三个 Adapter 只生产同一类型：

```text
RealityEncounterIntent
```

禁止：

- New User Intent；
- Returning Intent；
- Choice Reality Token；
- 三套 Route Guard。

---

## 九、Route Authorization 目标契约

### 9.1 当前

```text
authorizeRealityProductionRoute({
  routeTarget,
  sourceReferenceId
})
```

服务内部读取：

```text
GenesisProductionRealityEntryContext
```

### 9.2 目标

冻结为显式输入：

```text
authorizeRealityProductionRoute({
  routeTarget,
  identityEntryContext,
  encounterIntent
})
```

Route Authorization 必须验证：

1. routeTarget 为 `/reality`；
2. identity context 为真实用户身份；
3. intent schema 正确；
4. intent status 为 `READY_TO_ENTER_REALITY` 或当前 `ACTIVE_IN_REALITY`；
5. intent 未过期；
6. 三项身份引用一致；
7. encounter cycle 是当前周期；
8. intent origin 合法；
9. intent 来源为用户明确动作；
10. intent 不携带禁止内容。

### 9.3 Genesis Context 的新责任

`GenesisProductionRealityEntryContext` 继续证明：

```text
身份已经完成 Genesis / Recognition
```

但不再独立证明：

```text
当前 Reality Intent
```

`restoreGenesisProductionRealityEntryContext` 可以继续用于恢复身份连续证据，但：

```text
不得再单独形成授权成功路径
```

### 9.4 Route Activation Source Context

目标增加：

```text
encounterIntentReference
```

只包含：

- intentReferenceId；
- encounterCycleId；
- origin；
- sourceReferenceId。

不得向 Pressure Seed 投递 Relationship Resolution 细节。

---

## 十、刷新恢复与短生命周期持久化

### 10.1 是否需要

裁决：

```text
YES
```

原因：

- in-memory context 无法跨硬刷新；
- `location.state` 无法跨硬刷新；
- 长期身份资产不能替代当前意愿；
- 刷新正在进行的 Reality 不应要求重新出生或重新表达；
- 直接 URL 又必须在无当前 intent 时被阻断。

### 10.2 持久化性质

它不是长期资产。

采用：

```text
同标签页
+
当前 Encounter 周期
+
有界过期
```

建议承载：

```text
sessionStorage
```

禁止：

- localStorage 长期保存；
- 写入用户生命身份资产；
- 写入 Archive；
- 写入 Pressure Seed；
- 写入 Life Whisper 原文。

### 10.3 Recovery Envelope

只保存：

```text
schemaVersion
intentReferenceId
encounterCycleId
三项身份引用
origin
relationshipResolution 枚举
status
issuedAt
expiresAt
```

### 10.4 生命周期

```text
用户明确进入
↓
READY_TO_ENTER_REALITY
↓
Route 首次授权
↓
ACTIVE_IN_REALITY
↓
允许同标签页硬刷新恢复同一周期
↓
进入 Dynamics / 明确离开 / 新周期替代 / 过期
↓
CLEAR
```

### 10.5 过期

冻结：

```text
有界 TTL
```

实施刀必须选择并冻结常量，不允许无限有效。

建议上限：

```text
2 hours
```

这足以覆盖一次真实体验与刷新，不会把当前意愿变成长久通行证。

### 10.6 存储不可用

降级：

```text
in-memory intent
+
navigation state
```

结果：

- 当前显式导航仍可进入；
- 硬刷新后无法恢复；
- 安全回到同一生命空间；
- 不得回退到 identity-only authorization；
- 不得阻断身份恢复。

---

## 十一、刷新与直接 URL 的区分

### 11.1 刷新当前 Reality

条件：

```text
ACTIVE_IN_REALITY intent 存在
三项身份一致
cycle 一致
未过期
```

结果：

```text
恢复同一 Encounter
```

Route Host 应使用：

```text
encounterCycleId
```

作为周期 key，而不是每次挂载都无条件生成：

```text
NEW_REALITY_ENCOUNTER
```

### 11.2 直接 URL

条件：

```text
只有持久化身份
没有 READY / ACTIVE intent
```

结果：

```text
不得授权 Pressure Seed candidate
```

安全降级：

```text
回到同一生命世界
```

不是：

```text
重新出生
```

### 11.3 有 Active Intent 的直接访问

若同一标签页当前确有未过期的 `ACTIVE_IN_REALITY`：

```text
允许恢复
```

它本质上是当前周期恢复，不是身份绕过。

---

## 十二、历史事实隔离

### 12.1 历史 Life Whisper

```text
不得保存
不得恢复
不得进入 Intent
```

### 12.2 历史 Pressure Seed

```text
只作为 MEMORY_ONLY
不得生成 Intent
不得成为当前候选
```

### 12.3 历史 Crystal

```text
只作为 BODY_IMPRINT
不得生成 Intent
不得触发当前状态
```

### 12.4 Relationship Name

```text
可以在关系 UI 恢复
不得决定 Intent
不得进入 Route Authorization
```

### 12.5 当前新的 Reality

只有：

```text
当前 typed intent
↓
Reality V2 candidates
↓
用户亲自认出
```

---

## 十三、消费者表

| 生产者 | 输出 | 直接消费者 | 当前/目标 | 状态 |
| --- | --- | --- | --- | --- |
| Recognition | 同一生命被认出 | Life Whisper | 当前 | ✓ |
| Life Whisper Resolver | boolean 关系资格 | Genesis / Launch 页面 | 当前 | ✓ |
| Genesis 页面 | Genesis Entry Context | Route | 当前 | ✓ |
| Launch 返回页 | location state | Route UI | 当前 | △ |
| Persisted Identity | 恢复身份 | Route Entry | 当前 | ✓ |
| `restoreGenesisProductionRealityEntryContext` | 合成 eligibility | Route Authorization | 当前 | ✓／需降权 |
| Gravity Choice Continuation | route state | Reality Route | 当前 | ✓／需适配 |
| Reality Encounter Intent Adapter | typed intent | Intent Service | 目标 | ○ |
| Intent Service | READY / ACTIVE intent | Route Entry | 目标 | ○ |
| Recovery Adapter | 当前周期 envelope | Intent Service | 目标 | ○ |
| Reality Route Entry | identity + intent | Route Authorization | 目标 | ○ |
| Route Authorization | authorized source + cycle | Activation Source | 目标 | ○ |
| Reality V2 Candidate Source | 当前候选 | Reality Host | 保留 | ✓ |
| User Recognition | SelectedPressureSeedContext | Dynamics | 保留 | ✓ |

### 13.1 禁止消费者

以下系统不得消费 Relationship Resolution 或 Intent 内部原因：

```text
Renderer
Pressure Seed Matrix
Reality Candidate Source
Six Dimension
Gravity
AI Reflection
Choice
Crystal
Archive Growth
Life Engine
```

它们最多消费：

```text
Route 已授权
sourceReferenceId
encounterCycleId
```

---

## 十四、边界与门禁漂移

### 14.1 `noStorageRead`

`REALITY_PRODUCTION_ROUTE_ENTRY_BOUNDARY` 当前声明：

```text
noStorageRead: true
```

但 Route Entry 已通过 `sessionService` 读取：

- persisted visual continuity；
- persisted life source；
- persisted presence realization。

因此当前声明与实际责任不一致。

Atomic Migration 不应继续扩张隐式读取。

目标边界应明确为：

```text
typedIdentityRecoveryOnly
typedEncounterIntentRecoveryOnly
noRawStorageAccess
noGrowthAssetRecoveryForAuthorization
```

### 14.2 `inMemoryRealityEntryContextOnly`

当前 Route 同时通过身份资产重建 context。

该声明同样不完全真实。

迁移后应表达：

```text
explicitIdentityContextRequired
typedCurrentEncounterIntentRequired
```

### 14.3 不允许的修复方式

禁止：

- 仅把 boolean 塞进 `location.state`；
- 仅新增一个 URL query；
- 在 Route 中读取 Whisper state；
- 把 `returningEntry` 当授权 token；
- 用关系名证明关系；
- 继续依赖身份合成意愿；
- 长期同时保留新旧授权路径。

---

## 十五、原子迁移计划

### 15.1 切换原则

冻结：

```text
一个提交
一个成功真源
一个回滚单位
```

### 15.2 同一原子提交必须完成

#### Step 1

建立：

```text
RealityEncounterIntent type
```

#### Step 2

建立：

```text
Intent Service
+
短生命周期 Recovery Adapter
```

#### Step 3

适配三个现有生产者：

```text
Genesis
Launch Returning
Gravity Choice Continuation
```

#### Step 4

Reality Route Entry 显式读取：

```text
identity context
+
current encounter intent
```

#### Step 5

Route Authorization 改为显式校验：

```text
identity
+
intent
+
cycle
```

#### Step 6

Activation Source Context 携带 intent reference。

#### Step 7

移除成功路径：

```text
restoredIdentityReady
↓
直接合成当前 Reality 意愿
```

身份 context 可以恢复，但没有 intent 时授权必须失败。

#### Step 8

Host 以 `encounterCycleId` 识别当前周期。

#### Step 9

完成消费与清理：

```text
进入 Dynamics
明确离开
新周期替换
过期
身份失配
```

#### Step 10

更新门禁与浏览器行为检查。

### 15.3 双路径防护

Atomic Migration 完成后必须为：

```text
identity-only authorization success：
0

typed encounter intent authorization success：
1
```

不得长期存在：

```text
新用户走 typed intent
老用户走 identity restore
```

或：

```text
正常导航需要 intent
直接 URL 仍靠 identity
```

---

## 十六、回滚单位

回滚单位：

```text
完整 Atomic Migration Commit
```

必须能够一次回滚：

- 类型契约；
- Service；
- Recovery Adapter；
- 三个生产者 Adapter；
- Route Entry；
- Route Authorization；
- Activation Source；
- Host cycle key；
- 门禁。

### 16.1 遗留 Recovery Envelope

若回滚后 sessionStorage 中仍存在新版本 envelope：

- 旧 Runtime 不读取；
- 不进入身份资产；
- 不进入 Pressure Seed；
- 标签页关闭后消失。

因此可独立回滚。

### 16.2 禁止多提交依赖

禁止：

```text
Commit A 创建新路径
Commit B 删除旧路径
```

因为 A 与 B 之间会出现双真源。

---

## 十七、失败与降级矩阵

| 失败 | 目标结果 |
| --- | --- |
| 无生命身份 | 回到生命入口 |
| 三项身份失配 | 清除 intent，回到安全生命空间 |
| intent 缺失 | 不授权 Reality |
| intent 损坏 | 清除，保持身份 |
| intent 过期 | 清除，保持身份 |
| 旧 cycle 回调晚到 | 拒绝 |
| location state 丢失 | 从 typed recovery 恢复当前 cycle |
| sessionStorage 不可用 | 当前导航可继续，刷新安全降级 |
| route activation 失败 | 不启动候选 |
| Reality Context 创建失败 | 保持生命空间，可重试 |
| Pressure Candidate 初始化失败 | 不把 intent 标记为成长完成 |
| 用户明确离开 | 清除当前 intent |
| 新 intent 创建 | 原子替换旧 intent |

所有失败都不得：

- 新建身份；
- 重算二十八宿；
- 伪造用户意愿；
- 恢复历史压力；
- 进入 Dynamics 旁路；
- 创建第二套 Reality。

---

## 十八、实施门禁

未来 Atomic Migration 必须新增或更新以下行为门禁。

### Gate A｜New User Intent

```text
SUBMITTED + SETTLED
↓
用户明确 ENTER_REALITY
↓
typed intent
↓
Route READY
```

### Gate B｜Skip Intent

```text
WHISPER_SKIPPED
↓
用户明确 ENTER_REALITY
↓
typed intent
↓
Route READY
```

不得把 SKIPPED 伪造成 response settled。

### Gate C｜Unavailable Explicit Continue

```text
UNAVAILABLE
↓
用户明确继续同行
↓
用户明确进入 Reality
↓
typed intent
```

不得宣称视觉回应成功。

### Gate D｜Returning Intent

```text
同一身份恢复
↓
当前关系意愿
↓
用户明确 RETURNING_REALITY_INTENT
↓
同一 typed intent
```

### Gate E｜Direct URL

```text
persisted identity
+
no intent
↓
NOT AUTHORIZED
```

### Gate F｜Refresh

```text
ACTIVE intent
↓
hard refresh
↓
same cycle restored
```

### Gate G｜Expired / Mismatched

过期、三项身份失配、cycle 失配均不得授权。

### Gate H｜Choice Continuation

既有 Choice 回到 Reality 通过同一 typed contract，不形成旁路。

### Gate I｜Raw Text Isolation

Intent、Route、Pressure Seed、Dynamics 都不含 Life Whisper 原文。

### Gate J｜Single Authority

```text
Route SETUP 成功真源：
1

identity-only success：
0
```

---

## 十九、资产保护

### 19.1 World

保持：

- 黑曜空间；
- 动态星河；
- Reality 同一星河；
- 无新增页面。

### 19.2 Identity

保持：

- 生命钥匙；
- 生命坐标；
- 二十八宿；
- 天地之名；
- 同一 StarBeast；
- 三项身份引用；
- 不重新计算。

### 19.3 Relationship

保持：

- Recognition；
- Life Whisper；
- StarBeast Response；
- SKIPPED；
- UNAVAILABLE 真实降级；
- Optional Naming；
- Returning Relationship。

### 19.4 Growth

保持：

- Reality V2；
- Pressure Seed Matrix V2；
- 用户认出候选；
- SelectedPressureSeedContext；
- Dynamics handoff。

不提前实施：

- Six Dimension 新能力；
- Gravity 新能力；
- AI Reflection；
- Choice 扩展；
- Crystal 扩展。

---

## 二十、Runtime 状态

| 能力 | 状态 | 裁决 |
| --- | --- | --- |
| Phase 2 Relationship Intent Resolver | ✓ | 保留 |
| 新用户显式导航 | ✓ | 适配为 typed producer |
| 老用户显式导航 | ✓ | 适配为 typed producer |
| Choice Continuation | ✓ | 保护并适配 |
| Genesis Identity Context | ✓ | 保留身份证明，取消独立意愿权威 |
| Persisted Identity Recovery | ✓ | 保留 |
| Reality V2 | ✓ | 直接复用 |
| Pressure Seed Matrix V2 | ✓ | 直接复用 |
| Typed Reality Encounter Intent | ○ | 未来 Atomic Migration |
| Current-cycle Recovery Envelope | ○ | 未来 Atomic Migration |
| Route Intent Authorization | ○ | 未来 Atomic Migration |

---

## 二十一、正式裁决

```text
当前 Authority Split：
CONFIRMED

目标 Authority：
RealityEncounterIntent

权威所有者：
Typed Relationship → Growth Entry Bridge

是否需要短生命周期恢复：
YES

恢复范围：
同标签页、当前周期、有界 TTL

是否允许 identity-only authorization：
NO

Reality V2：
KEEP / REUSE

Pressure Seed Matrix V2：
KEEP / REUSE

是否新增 Reality：
NO

是否形成第二套链：
NO

迁移方式：
ATOMIC

回滚单位：
ONE COMMIT
```

Phase 状态：

```text
Phase 2：
CLOSED

Phase 3 Entry：
LOCKED

Phase 3 Runtime：
NOT AUTHORIZED FOR IMPLEMENTATION
```

---

## 二十二、施工后交通灯扫描

### 绿色

```text
0
```

当前迁移改变 Route Authorization 输入契约、恢复责任和三个生产入口，不属于小刀。

### 黄色

记录但不并入迁移：

1. `Reality Event` 仍由 `SelectedPressureSeedContext` 承载；
2. “不完全是”的开放修正仍是后续 Reality 体验问题；
3. Choice / Crystal 固定计时权威需独立 MAP；
4. timeline orchestration 文案门禁漂移；
5. `GRAVITY_READY_HOLD` 与 `GRAVITY_READY_TO_CONTINUE` 门禁名称漂移；
6. 当前候选 cursor 在硬刷新后是否恢复，需独立阶段判断；
7. `check-reality-production-choice-consumer.mjs` 仍要求 `RealityProductionHost` 初始化 `initializeRealityProductionChoiceConsumer`，但当前正式 Host 未包含该调用；其余前置断言通过后停在这一既存消费者门禁漂移。

裁决：

```text
MAP / DEFER
```

### 红色

本审计确认：

```text
Route Authorization 输入契约变化
恢复真源变化
新用户、老用户与 Choice 生产者原子切换
identity-only success path 移除
短生命周期 recovery responsibility 新增
```

裁决：

```text
Atomic Migration Prep
```

---

## 二十三、下一刀建议

```text
XINMAI-REALITY-ENCOUNTER-INTENT-ATOMIC-MIGRATION-PREP-P0
```

刀型：

```text
Major Blade Prep
+
Atomic Migration Delivery Design
```

主 Layer：

```text
Layer 3 Relationship
↓
Layer 4 Growth Entry
```

保护 Layer：

```text
Layer 1 World
Layer 2 Identity
```

决策：

```text
NOW — PREP ONLY
```

唯一目标：

> 将本审计冻结的 RealityEncounterIntent 翻译成逐文件施工卡、类型契约、状态迁移表、session recovery 生命周期、门禁矩阵和单提交回滚清单，为 Atomic Migration 实施建立不可歧义的授权边界。

下一刀仍不得：

- 实施代码；
- 接入 Life Whisper 原文；
- 新增 Pressure Seed Adapter；
- 深化 Six Dimension；
- 修改 Gravity 玩法；
- 扩展 Choice；
- 扩展 Crystal；
- 清理 LaunchLab 其他债务。

---

## 二十四、最终链路

迁移后的唯一正确链：

```text
同一生命身份
↓
Phase 2 关系资格成立
↓
用户明确进入动作
↓
RealityEncounterIntent
↓
三项身份 + 当前 cycle 校验
↓
Reality Route Authorization
↓
唯一 Reality V2
↓
候选现实靠近
↓
用户亲自认出
↓
SelectedPressureSeedContext
↓
Phase 3 正式开始
```

最终冻结：

> “我是谁”只证明生命连续；“我现在愿意让现实靠近”才证明本次 Reality 可以开始。
