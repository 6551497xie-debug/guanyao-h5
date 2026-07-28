# XINMAI REALITY CHOICE CONSUMER GATE AUTHORITY CALIBRATION P0

项目：

`/Users/xieyanjun/Desktop/guanyao-h5`

模式：

Reality Choice 消费权威与门禁校准。

性质：

MAP / Gate Calibration。

本刀：

- 只读审查 Runtime；
- 冻结 Choice 消费权威；
- 识别门禁漂移；
- 不修改代码；
- 不接入 Choice；
- 不实施 `RealityEncounterIntent`；
- 不改变现有生产链。

---

## 一、Construction State Card

```text
当前 Phase：
Phase 2 CLOSED

当前阶段边界：
Phase 3 LOCKED

本刀类型：
MAP / Gate Calibration

主影响 Layer：
Layer 4｜Growth Continuity

保护 Layer：
Layer 3｜Reality Entry

目标：
判断 RealityProductionHost 是否应拥有
initializeRealityProductionChoiceConsumer

既有资产：
Reality V2 Pressure Seed Host
Gravity / Inner View / Choice 现有连续体验
Reality Choice Consumer 历史协议资产
Choice Continuation 视觉连续资产

是否新增消费者：
NO

是否修改输入输出契约：
NO

是否改变 Runtime：
NO

是否实施 Intent：
NO

决策：
NOW — MAP ONLY
```

---

## 二、本刀唯一问题

当前门禁：

```text
check-reality-production-choice-consumer.mjs
```

要求：

```text
RealityProductionHost
↓
initializeRealityProductionChoiceConsumer
↓
advanceRealityProductionChoiceConsumer
```

当前生产 Runtime：

```text
RealityProductionHost
↓
Reality V2 Pressure Seed
↓
用户认出当前现实
↓
显式交给 Gravity
```

并且 Host 边界明确包含：

```text
noGravityExecution: true
noChoiceExecution: true
noCrystalExecution: true
```

本刀必须判断：

```text
A.
当前 Runtime 缺少既定 Choice 消费者

或

B.
当前检查保留了已被正式迁移取代的历史假设
```

---

## 三、最终裁决

正式冻结：

```text
裁决：
B

RealityProductionHost Choice Authority：
REJECT

initializeRealityProductionChoiceConsumer in RealityProductionHost：
FORBIDDEN BY CURRENT PRODUCTION BOUNDARY

当前失败检查：
STALE GATE ASSUMPTION

RealityProductionChoiceConsumer 资产：
KEEP

当前 Production Runtime Direct Consumer：
NONE

当前资产状态：
DORMANT / ISOLATED

choiceContinuation in RealityProductionHost：
PRESENTATION CONTINUITY ONLY

Phase 3 Entry：
LOCKED
```

结论：

> `RealityProductionHost` 不应重新初始化或推进正式 Choice Consumer。失败检查仍在验证 V1 Pressure → Gravity → Choice 同页 Host，而该路径已经被 Reality V2 Pressure Seed 原子切换正式取代。

---

## 四、证据等级

本审查严格区分：

```text
协议声明
源码结构
提交历史
自动检查
真实 Runtime
```

### 4.1 协议声明

已有 `RealityEncounterIntent` PREP 已冻结：

- Choice 只能为未来 Reality 提供 continuation qualification；
- Choice 不得自己生成 encounter cycle；
- Choice 不得直接设置 `ACTIVE_IN_REALITY`；
- Choice 不得以直接导航作为成功；
- Choice Adapter 进入未来 Atomic Migration 前，必须先校准本门禁。

证据等级：

```text
协议目标
```

### 4.2 源码结构

当前 `RealityProductionHost`：

- 只初始化 `initializeRealityProductionPressureSeedConsumer`；
- 只推进 `advanceRealityProductionPressureSeedConsumer`；
- 只呈现 `RealityPressureSeedPresentation`；
- 通过 `onContinueToGravity` 把已认出的现实交给下一阶段；
- 不导入 Choice Consumer；
- 不导入 Choice Presentation；
- 不拥有 Choice Session；
- 不执行 Choice 事件。

证据等级：

```text
当前 Runtime 结构
```

### 4.3 提交历史

历史提交：

```text
32948c0566ee22e233efa8ebb804797dac18663e
feat: activate Reality production Choice presentation
```

当时 `RealityProductionHost` 同时拥有：

```text
Pressure
↓
Gravity
↓
Choice
↓
Crystal Ready Hold
```

随后正式提交：

```text
ad0b8a86bd9146123ee67741d1fed356fe0126d2
feat: cut reality pressure host over to v2
```

原子移除：

- `RealityPressurePresentation`；
- `RealityGravityPresentation`；
- `RealityChoicePresentation`；
- V1 Pressure Consumer；
- Production Gravity Consumer；
- Production Choice Consumer。

并新增强制边界：

```text
V2_PRESSURE_SEED_ONLY
noGravityExecution
noChoiceExecution
```

证据等级：

```text
已提交的生产迁移事实
```

### 4.4 自动检查

当前：

```text
check-reality-production-route-entry.mjs
PASS
```

该门禁明确验证 Host 不包含：

```text
initializeRealityProductionChoiceConsumer
```

当前：

```text
check-reality-production-choice-consumer.mjs
FAIL
```

失败点：

```text
Production Host initializes the authorized Choice consumer
missing=initializeRealityProductionChoiceConsumer
```

当前：

```text
check-reality-production-choice-host.mjs
FAIL
```

失败点：

```text
Production Reality Host consumes Choice session
missing=initializeRealityProductionChoiceConsumer
```

因此不是 Runtime 随机缺失，而是：

```text
当前 Route / V2 Host 门禁
与
历史 Choice Host 门禁
互相冲突
```

### 4.5 真实 Runtime

当前 Choice 体验由 `GravityPage` 中已经存在的生命连续链承担：

```text
现实被认出
↓
六维 / Inner View
↓
保护关系被理解
↓
第三次靠近
↓
回应空间出现
↓
用户通过身体动作参与
↓
新的 Reality continuity 被请求
```

它没有使用：

```text
RealityProductionChoiceConsumer
```

证据等级：

```text
现有生产源码路径
```

本刀不把这一现有链自动认定为未来最终 Choice Authority；只确认它已经取代“Choice 在 Reality Host 内直接执行”的历史入口。

---

## 五、历史拓扑与当前拓扑

### 5.1 已退出生产的历史拓扑

```text
RealityProductionHost
↓
V1 Pressure Consumer
↓
Production Gravity Consumer
↓
Production Choice Consumer
↓
CRYSTAL_READY_HOLD
```

特点：

- 所有 Growth Stage 位于同一 Host；
- Choice Consumer 由 Host 直接初始化；
- Choice Active Response 由 Host 直接推进；
- Host 同时承担 Reality、Gravity 与 Choice。

该拓扑已经被：

```text
Reality Pressure V2 Atomic Host Cutover
```

正式替换。

### 5.2 当前正式拓扑

```text
RealityProductionRouteEntry
↓
RealityProductionHost
↓
V2 Pressure Seed Consumer
↓
用户认出当前 Reality
↓
onContinueToGravity
↓
GravityPage
↓
Inner View / Choice embodied continuity
↓
用户明确继续进入新的 Reality
```

当前 Host 的停止点：

```text
GRAVITY_READY_TO_CONTINUE
```

不是：

```text
CHOICE_RESPONSE_SPACE
```

更不是：

```text
CRYSTAL_READY_HOLD
```

### 5.3 当前 Choice Continuation 回流

`GravityPage` 在用户选择继续时携带：

```text
choiceContinuation:
AWAITING_LIVED_RESPONSE_RECOGNITION
```

以及可选的：

```text
choiceLifeTraceMemoryKey
choiceLifeTraceSourceSlot
```

`RealityProductionRouteEntry` 仅验证并传递这些字段。

`RealityProductionHost` 仅将它们消费为：

- 同一身体的新节律提示；
- 新 Reality 中的观察语义；
- pre-Crystal body memory；
- 不宣称成长；
- 不启动 Choice；
- 不启动 Crystal。

因此：

```text
choiceContinuation
≠
Choice Consumer Session

choiceContinuation
≠
Choice Active Response

choiceContinuation
≠
Reality Entry Authority

choiceContinuation
=
当前过渡性的展示连续事实
```

---

## 六、RealityProductionChoiceConsumer 资产审查

### 6.1 资产有效性

以下资产结构仍然自洽：

```text
src/types/realityProductionChoiceConsumer.ts
src/services/realityProductionChoiceConsumer.ts
```

它要求权威输入：

```text
RealityProductionGravitySession
gravityObservationConfirmed = true
choiceReadiness = READY
同一 sourceReferenceId
```

它允许：

```text
INITIALIZE
↓
ALTERNATIVE_RESPONSE_AWARENESS
↓
CHOICE_ACTIVE_RESPONSE
↓
CRYSTAL_READY
```

它禁止：

- 推荐答案；
- 最佳选择；
- 行为评分；
- 用户评判；
- Gravity 修改；
- Crystal 执行；
- Renderer 调用；
- UI 集成；
- 路由；
- 导航；
- 存储。

裁决：

```text
协议资产本身：
VALID AS ISOLATED DOMAIN ASSET
```

### 6.2 当前消费者

源码审查结果：

```text
src/ 中对
initializeRealityProductionChoiceConsumer
advanceRealityProductionChoiceConsumer
的直接生产调用：
0
```

只有：

- 服务自身；
- 自动检查；
- 历史门禁期待。

当前正式消费者：

```text
NONE
```

### 6.3 当前状态

冻结：

```text
RealityProductionChoiceConsumer：
DORMANT / ISOLATED
```

这不等于：

```text
DEPRECATED
```

也不等于：

```text
DELETE
```

是否未来复用、适配或替换：

```text
需要独立 Phase 3 Choice Authority 审查
```

不属于本刀。

---

## 七、RealityProductionHost 权威边界

### 7.1 Host 当前拥有

```text
已授权 Reality Source
V2 Pressure Seed Candidate
用户对当前 Reality 的认出
候选继续发现
暂停
向 Gravity 的显式交接
Reality 同一身体的展示连续
```

### 7.2 Host 当前不拥有

```text
Gravity Runtime
Choice Runtime
Crystal Runtime
Choice Active Response
Choice Session
Crystal Readiness
RealityEncounterIntent Runtime
```

### 7.3 为什么不能重新接入 Choice Consumer

若现在把 Choice Consumer 重新接入 Host，将产生：

```text
Reality V2 Pressure Seed
↓
Host 内 Choice
```

但 Choice Consumer 的合法输入必须来自：

```text
confirmed RealityProductionGravitySession
```

当前 Host 明确不执行 Gravity，也没有该 Session。

为了在 Host 中初始化 Choice，必须同时：

- 重新接入 Production Gravity Consumer；
- 改变 Host 输入契约；
- 改变 Host 状态权威；
- 改变 `onContinueToGravity` 责任；
- 与 `GravityPage` 现有 Choice 链形成双路径；
- 跨越 Reality、Gravity、Choice 多个阶段；
- 破坏 V2 Pressure Seed 原子切换。

因此：

```text
将 Choice Consumer 接回 Host
不是缺口修复
而是生产拓扑逆迁移
```

当前无授权，也不符合产品因果。

---

## 八、Choice 产品语义校准

### 8.1 Choice 不是 Reality 入口

Choice 回答：

> 用户是否在觉察空间中产生了一个不同于旧惯性的回应。

Reality Encounter Intent 回答：

> 用户是否明确选择进入当前这一轮新的现实相遇。

二者不得合并。

### 8.2 Choice 不在 Reality 刚开始时初始化

正确因果：

```text
Reality
世界发生
↓
Gravity
保护惯性被看见
↓
AI / Inner View
理解发生
↓
Choice
新的回应空间出现
```

如果 `RealityProductionHost` 在当前 Reality 初始 Host 中拥有 Choice：

```text
Reality 开始
↓
Choice 已初始化
```

会使 Choice 抢在：

- Reality 认出；
- Gravity；
- 生命理解；
- 用户主动回应

之前成立。

裁决：

```text
PRODUCT CAUSALITY VIOLATION
```

### 8.3 Choice Continuation 不是 Choice 执行

当前 `choiceContinuation` 表示：

> 上一次用户已经产生过一个新的回应可能；本次 Reality 观察它是否真的进入生活。

所以 Host 可以消费它作为：

```text
视觉连续
节律连续
身体记忆
观察提示
```

但不得消费为：

```text
新 Choice Session
自动确认 Choice
自动 Growth
自动 Crystal
```

---

## 九、权威生产者与消费者表

|生产者|输出|当前直接消费者|当前状态|禁止消费者|
|-|-|-|-|-|
|V2 Pressure Seed Consumer|已认出的当前现实|Reality Host / Gravity handoff|✓ Runtime|Choice Consumer、Crystal|
|Reality Production Gravity Consumer|`choiceReadiness`|无正式页面消费者|△ 隔离资产|Reality Host 直接执行|
|Reality Production Choice Consumer|Choice Session / Crystal readiness only|无生产消费者|○ Dormant|Reality Host、Route、Renderer|
|GravityPage Inner View|关系理解与回应空间|同页 embodied Choice 体验|✓ Runtime|Reality Host Choice Session|
|GravityPage Choice Continue|`choiceContinuation` 与可选 body trace|Reality Route / Host 展示连续|✓ Runtime|Choice Consumer 初始化、Growth 自动确认|
|Reality Route|经校验的展示连续字段|Reality Host|✓ Runtime|Choice 执行、Intent Authority|
|Reality Host|Reality 身体与节律观察|用户与 Gravity handoff|✓ Runtime|Production Choice Consumer|
|未来 RealityEncounterIntent Choice Adapter|进入下一次 Reality 的 qualification|未来 Intent Controller|○ Protocol only|Choice Runtime、Host 直接 Active|

图例：

```text
✓ 已存在 Runtime
△ 部分 / 隔离存在
○ 仅协议或 Dormant
```

---

## 十、门禁冲突裁决

### 10.1 当前有效门禁方向

以下门禁与当前 Runtime 一致：

```text
check-reality-production-route-entry.mjs
```

有效主张：

- Host 是 V2 Pressure Seed Host；
- Host 不启动 Gravity；
- Host 不启动 Choice；
- Host 不启动 Crystal；
- Route 不拥有 Choice；
- Dynamics / Gravity 是显式下一阶段。

以下原子切换门禁方向仍有效：

```text
check-reality-pressure-v2-atomic-host-cutover.mjs
```

有效主张：

- Host 必须排除 V1 Pressure；
- Host 必须排除 Production Gravity Consumer；
- Host 必须排除 Production Choice Consumer；
- Host 必须排除 Choice Presentation。

该脚本自身另有：

```text
GRAVITY_READY_HOLD
```

状态名称漂移，已被此前审计单独记录；不属于本刀。

### 10.2 当前过期门禁

```text
check-reality-production-choice-consumer.mjs
```

其中以下断言过期：

```text
Production Host initializes the authorized Choice consumer
Production Host advances only explicit active response
Production Host stops at Crystal readiness
```

这些断言验证的是切换前 Host。

```text
check-reality-production-choice-host.mjs
```

整体目标同样基于切换前 Host：

```text
RealityProductionHost
owns Pressure + Gravity + Choice presentation
```

它与当前 V2 Host 边界冲突。

### 10.3 不能如何修

禁止通过以下方式让旧门禁变绿：

```text
把 Choice Consumer 接回 Host
```

禁止：

- 为通过检查逆转 Runtime；
- 删除 Choice 资产；
- 把 `choiceContinuation` 强转为 Choice Session；
- 在 Route 中初始化 Choice；
- 在 Renderer 中读取 Choice 关系事实；
- 让 Intent 迁移顺带修复此门禁。

---

## 十一、新门禁基线

后续独立小刀应只校准门禁，不改 Runtime。

### 11.1 Choice Consumer 资产门禁

保留验证：

- 类型契约完整；
- Gravity confirmed 才能初始化；
- `choiceReadiness = READY` 才能初始化；
- source reference 连续；
- 用户主动回应才可推进；
- Crystal 只输出 readiness；
- 无 Engine / UI / Route / Storage；
- 伪造、重复、跨 session 均被阻断。

### 11.2 Production Host 负向门禁

新增或替换为：

```text
RealityProductionHost
DOES NOT import initializeRealityProductionChoiceConsumer

RealityProductionHost
DOES NOT import advanceRealityProductionChoiceConsumer

RealityProductionHost
DOES NOT render RealityChoicePresentation

REALITY_PRODUCTION_HOST_BOUNDARY
noChoiceExecution = true
```

### 11.3 Choice Continuation 展示边界

门禁应证明：

```text
choiceContinuation
只影响观察与视觉连续
```

并且：

```text
data-choice-growth-claim = NONE_UNTIL_USER_RECOGNIZES
data-choice-crystal-stage = NOT_STARTED
data-choice-identity-effect = RESPONSE_ONLY
```

### 11.4 无生产消费者真实性

门禁不得伪称：

```text
RealityProductionChoiceConsumer 已进入 Production Runtime
```

必须如实标记：

```text
Formal Consumer Contract：
PASS

Production Integration：
NOT ACTIVE
```

---

## 十二、未来 Intent 适配边界

未来 `RealityEncounterIntent` Atomic Migration 中，Choice 生产者只能提供：

```text
Choice Continuation Qualification
```

消费者：

```text
RealityEncounterIntent Controller
```

不得变成：

```text
RealityProductionHost
↓
initializeRealityProductionChoiceConsumer
```

未来顺序：

```text
上一 Reality 正式终结
↓
Choice 中用户明确继续
↓
Choice Qualification
↓
Intent Controller 创建新 encounterCycleId
↓
Reality 原子承接
```

`RealityProductionChoiceConsumer` 是否成为该 Choice qualification 的上游正式状态资产：

```text
UNDECIDED
```

需要独立审查：

- 当前 `GravityPage` Choice 状态谁是权威；
- `RealityProductionGravitySession` 是否仍是可达 Runtime；
- formal Choice Consumer 与 embodied Choice 的语义是否一致；
- 是否会形成第二套 Choice Runtime；
- 是否需要保留、适配或退役旧资产。

不得由 Intent Atomic Migration 猜测。

---

## 十三、资产保护

本校准保护：

### World

- 黑曜生命空间；
- 同一 Reality 星河；
- 同一星兽身体；
- Choice 回流后的身体节律。

### Identity

- `sourceReferenceId`；
- 生命坐标；
- 二十八宿；
- 星兽身份；
- visual continuity。

### Relationship

- Phase 2 已关闭事实；
- Life Whisper；
- 星兽回应；
- 可选关系名；
- 返回关系连续。

### Growth

- Reality V2 Pressure Seed；
- Gravity / Inner View；
- 当前 embodied Choice；
- Crystal 边界；
- 历史 trace 只作 body memory。

本刀未把任何 Dormant 资产虚报为生产 Runtime。

---

## 十四、正向与负向消费者冻结

### 14.1 当前允许

```text
GravityPage
↓
choiceContinuation
↓
Reality Route
↓
Reality Host presentation continuity
```

### 14.2 当前禁止

```text
Reality Host
↓
RealityProductionChoiceConsumer
```

```text
Route
↓
RealityProductionChoiceConsumer
```

```text
choiceContinuation
↓
Choice Session
```

```text
choiceContinuation
↓
Crystal Ready
```

```text
Choice
↓
RealityEncounterIntent ACTIVE
```

### 14.3 当前没有新增

- 第二 Choice Runtime；
- 第二 Reality 链；
- 第二身份；
- 第二星兽；
- 新 Renderer 输入；
- 新 DOM Runtime 通道；
- 新存储；
- 新路由；
- 新 Growth 消费者。

---

## 十五、门禁修正边界

后续门禁修正只能：

- 修改 Choice Consumer 检查中的 Host 期待；
- 将 Host 的正向集成断言改为负向隔离断言；
- 校准或隔离历史 `check-reality-production-choice-host.mjs`；
- 保持 Consumer 自身行为测试；
- 保持 Reality Route 的 `noChoiceExecution`；
- 保持 V2 Host 的 `noChoiceExecution`。

不得：

- 修改 Runtime；
- 修改 Choice Consumer；
- 修改 GravityPage；
- 修改 Route；
- 修改 Host；
- 修改 Renderer；
- 实施 Intent；
- 顺带修复 `GRAVITY_READY_HOLD`；
- 顺带处理 timeline 文案；
- 删除全部历史检查而不保留资产门禁。

回滚单位：

```text
单一 gate correction commit
```

---

## 十六、Definition of Done

本 MAP 完成条件：

- 历史 Host 拓扑已确认；
- V2 Atomic Cutover 已确认；
- 当前 Host 责任已确认；
- formal Choice Consumer 资产状态已确认；
- 当前直接消费者已确认；
- `choiceContinuation` 语义已确认；
- 失败门禁的过期断言已定位；
- 新门禁基线已冻结；
- 未来 Intent Adapter 边界已冻结；
- 未修改 Runtime；
- 未修复门禁；
- 未进入 Phase 3。

完成句：

> Choice 可以作为被保留的正式领域资产，但不能为了让历史检查通过，被重新塞回只负责当前 Reality 与 Pressure Seed 的生产 Host。

---

## 十七、最终状态

```text
RealityProductionHost：
V2 PRESSURE SEED HOST

RealityProductionHost Choice Authority：
NO

RealityProductionChoiceConsumer：
VALID DORMANT ASSET

Current Production Direct Consumer：
NONE

Choice Continuation：
PRESENTATION / BODY RHYTHM CONTINUITY

Choice Consumer Gate：
STALE / NEEDS NARROW CORRECTION

RealityEncounterIntent Runtime：
NOT ESTABLISHED

Phase 2：
CLOSED

Phase 3：
LOCKED
```

---

## 十八、施工后交通灯扫描

### 绿色

发现：

```text
Choice Consumer gate expectation
与当前已冻结 Runtime 边界不一致
```

该问题：

- 单一门禁层；
- 不改 Runtime；
- 不新增状态；
- 不新增消费者；
- 不改 Renderer；
- 不跨 Phase；
- 可独立回滚；
- 有明确检查结果。

裁决：

```text
GREEN
```

允许下一张快速小刀。

### 黄色

发现：

```text
RealityProductionChoiceConsumer
当前没有生产消费者
```

它未来是否：

- 适配 embodied Choice；
- 成为 Choice qualification 上游；
- 保持隔离；
- 正式退役

尚未决定。

裁决：

```text
MAP / DEFER
```

不得混入门禁修正。

### 红色

未来：

```text
RealityEncounterIntent Runtime
```

仍涉及：

- 新老用户入口原子切换；
- Choice Producer 接入；
- Route Authority 改变；
- Recovery Responsibility 改变；
- identity-only 路径移除。

裁决：

```text
ATOMIC MIGRATION
DEFER
```

本刀未创建双权威。

---

## 十九、下一刀建议

```text
XINMAI-REALITY-CHOICE-CONSUMER-GATE-DRIFT-CORRECTION-P0
```

刀型：

```text
Refinement / Gate Correction
```

主 Layer：

```text
Engineering Gate
```

保护 Layer：

```text
Layer 3｜Reality Entry
Layer 4｜Growth Continuity
```

决策：

```text
NOW — STRICT SMALL BLADE
```

唯一目标：

> 让 Choice Consumer 门禁如实验证“领域资产有效、Production Host 不消费、当前生产集成未激活”，不修改任何 Runtime。

建议范围：

```text
scripts/check-reality-production-choice-consumer.mjs
scripts/check-reality-production-choice-host.mjs
```

如果第二个历史 Host 检查无法在不改变含义的情况下校准：

```text
必须明确隔离或退役它
```

不得：

- 把 Choice 接回 Host；
- 修改 Choice 体验；
- 修改 Pressure Seed；
- 修改 Reality；
- 修改 GravityPage；
- 修改 Intent；
- 修复其他门禁漂移。
