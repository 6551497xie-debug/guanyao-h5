# XINMAI REALITY ENCOUNTER INTENT AUTHORITY MAJOR BLADE PREP P0

## 文档定位

任务：

```text
XINMAI-REALITY-ENCOUNTER-INTENT-AUTHORITY-MAJOR-BLADE-PREP-P0
```

项目：

```text
/Users/xieyanjun/Desktop/guanyao-h5
```

刀型：

```text
Major Blade Prep
+
Atomic Migration Delivery Design
```

主 Layer：

```text
Layer 3｜Relationship
↓
Reality Entry
```

保护 Layer：

```text
Layer 1｜World
Layer 2｜Identity
```

正式状态：

```text
Phase 2：
CLOSED

RealityEncounterIntent Product Authority：
ACCEPTED AS TARGET AUTHORITY

RealityEncounterIntent Runtime Authority：
NOT ESTABLISHED

PREP：
NOW

Runtime：
DEFER

Phase 3：
LOCKED
```

本刀只冻结未来 Atomic Migration 的施工边界。

本刀不修改代码、不新增类型、不新增服务、不新增持久化、不改变 Runtime。

---

## 一、Construction State Card

```text
当前 Phase：
Phase 2 CLOSED
Phase 3 LOCKED

当前主线：
Relationship
↓
Current Reality Entry Intent
↓
Reality Atomic Acceptance

本刀类型：
Major Blade Prep

主影响 Layer：
Layer 3 Relationship → Reality Entry

保护 Layer：
Layer 1 World
Layer 2 Identity

产品语义权威：
RealityEncounterIntent ACCEPTED

当前 Runtime 权威：
GenesisProductionRealityEntryContext
+
identity-only restoration

本刀消费者：
未来 Atomic Migration 施工卡

是否修改 Runtime：
NO

是否需要独立 Atomic Migration 授权：
YES

决策：
NOW — PREP ONLY
```

---

## 二、产品语义最高冻结

### 2.1 唯一问题

`RealityEncounterIntent` 只回答：

> 用户是否明确选择，在当前这一轮生命相遇中进入现实。

### 2.2 它是什么

它是：

```text
Layer 3 Relationship
↓
Reality Entry
```

之间的过渡权威。

它拥有：

1. 当前 `encounterCycleId`；
2. 用户明确进入当前 Reality 的意愿；
3. 该意愿是否已被 Reality 正式承接；
4. Active 前失败后的同周期重试资格；
5. 当前周期是否已明确终结。

### 2.3 它不是什么

它不是：

- 身份事实；
- 星兽身份；
- 二十八宿结果；
- Life Whisper；
- StarBeast Response；
- Relationship Naming；
- Pressure Seed；
- Reality Event；
- 六维；
- Gravity；
- AI Reflection；
- Choice 结果；
- Crystal；
- Archive；
- 付费资格；
- “准备好成长”的判断。

### 2.4 绝对禁止语义

禁止用 Intent 表达：

```text
这个用户是谁
```

禁止用 Intent 表达：

```text
用户的问题是什么
```

禁止用 Intent 表达：

```text
用户是否做了正确选择
```

禁止用 Intent 表达：

```text
用户是否值得或适合成长
```

冻结：

> Intent 只拥有一次明确进入动作及其承接生命周期，不拥有用户本身。

---

## 三、状态机正式冻结

### 3.1 状态集合

PREP 判断：

```text
需要显式：
ACCEPTING_REALITY
FAILED_RETRYABLE
RECOVERING
```

完整状态：

```text
ABSENT
READY_TO_ENTER_REALITY
ACCEPTING_REALITY
FAILED_RETRYABLE
ACTIVE_IN_REALITY
RECOVERING
TERMINAL
```

`CLEARED` 不是长期 Runtime 状态。

它是：

```text
TERMINAL 已确认
↓
Controller 清除当前内存事实
↓
Recovery Adapter 清除候选
↓
回到 ABSENT
```

### 3.2 为什么不能只用三态

最低三态：

```text
ABSENT
READY
ACTIVE
```

无法真实表达：

- Route 正在承接；
- 部分初始化尚未提交；
- Active 前失败；
- 同周期重试；
- Active 刷新恢复；
- 存储候选尚未成为 Runtime 权威。

因此禁止：

```text
isReady: boolean
isActive: boolean
```

代替状态机。

### 3.3 完整状态图

```text
ABSENT
  │
  │ 用户第一次明确请求进入新的 Reality
  ▼
READY_TO_ENTER_REALITY
  │
  │ Controller 开始原子承接
  ▼
ACCEPTING_REALITY
  │
  ├── Route / Activation / Host / Minimum Surface 失败
  │           ↓
  │     FAILED_RETRYABLE
  │           │
  │           │ 用户同周期重试
  │           └──────────────→ ACCEPTING_REALITY
  │
  └── Reality Host Commit Outcome 成立
              ↓
       ACTIVE_IN_REALITY
              │
              ├── 刷新 / Runtime 重建
              │           ↓
              │       RECOVERING
              │           │
              │           ├── 校验与重新承接成功
              │           │         ↓
              │           │   ACTIVE_IN_REALITY
              │           │
              │           └── 校验失败
              │                     ↓
              │                 TERMINAL
              │
              └── 明确离开 / 正式周期结束
                          ↓
                      TERMINAL
                          ↓
                        ABSENT
```

### 3.4 `ABSENT`

代表：

- 没有当前 Reality Intent；
- 没有当前 encounter cycle；
- 用户尚未明确进入；
- 仅有身份不能改变该状态。

允许来源：

- 首次进入前；
- 上一周期正式终结后；
- Intent 明确清除后；
- 过期或身份失配被安全终结后。

### 3.5 `READY_TO_ENTER_REALITY`

只代表：

- 用户明确表达进入意愿；
- 当前生产者资格已验证；
- Controller 已生成唯一 cycle；
- Reality 尚未完成承接。

不代表：

- 已导航；
- Route 已加载；
- Route Authorization 成立；
- Activation Source 成立；
- Candidate 初始化成功；
- Host 已呈现；
- Reality 可交互。

### 3.6 `ACCEPTING_REALITY`

代表：

```text
Controller 已锁定当前 cycle
↓
Route / Activation / Candidate / Host 正在形成一次原子承接
```

规则：

- 同一时间只能存在一个接受尝试；
- 只能使用当前 cycle；
- 不允许生成第二 Intent；
- 不允许将中间对象发布为 Active；
- 不允许写 SelectedPressureSeedContext；
- 不允许触发 Dynamics、Choice、Crystal。

### 3.7 `FAILED_RETRYABLE`

代表：

- Active 之前承接失败；
- Intent 仍有效；
- cycle 保持；
- 用户可以重试；
- 失败原因真实可见。

必须携带：

```text
failureStage
failureReason
failedAt
retryAllowed: true
```

不得携带：

- 压力推断；
- 人格判断；
- 用户责任；
- “尚未准备好成长”等评价。

### 3.8 `ACTIVE_IN_REALITY`

只在 Atomic Commit Point 成立后进入。

它代表：

```text
同一 cycle
+
同一身份
+
Route Authorization
+
Activation Source
+
Reality Host
+
最低可用 Reality Surface
```

已经共同确认：

> 当前 Reality 正在被同一个生命正式经历。

### 3.9 `RECOVERING`

它是显式临时状态。

来源：

```text
Recovery Adapter 提供候选
↓
Controller 重新取得当前 Runtime 权威
```

它不代表：

- Storage 自己恢复成功；
- Route 可以跳过 Controller；
- 旧 `ACTIVE_IN_REALITY` 字段自动可信；
- Host 已重新承接。

只有重新通过身份、cycle、时效与 Host Commit，才能回到：

```text
ACTIVE_IN_REALITY
```

### 3.10 `TERMINAL`

只由以下事件形成：

- 用户明确选择暂时离开；
- 用户明确关闭当前 encounter；
- 当前 encounter 正式完成；
- 用户明确开始一个新 encounter，且旧周期先被终结；
- 用户主动清除相关数据；
- Intent 过期；
- 身份绑定失配；
- 恢复候选损坏。

它不是：

- 页面刷新；
- 普通卸载；
- 切后台；
- 网络断开；
- Route Chunk 失败；
- WebGL Context 丢失；
- 浏览器崩溃。

---

## 四、状态事件与合法转换

### 4.1 事件集合

未来类型必须使用明确事件：

```text
REQUEST_REALITY_ENCOUNTER
BEGIN_REALITY_ACCEPTANCE
REALITY_MINIMUM_PRESENTED
REALITY_ACCEPTANCE_FAILED
RETRY_SAME_ENCOUNTER
RECOVERY_CANDIDATE_FOUND
RECOVERY_VALIDATED
RECOVERY_REJECTED
EXPLICIT_LEAVE
ENCOUNTER_COMPLETED
START_NEW_ENCOUNTER
INTENT_EXPIRED
IDENTITY_MISMATCH
USER_DATA_CLEARED
```

### 4.2 转换表

| 当前状态 | 事件 | 下一状态 | cycle |
| --- | --- | --- | --- |
| `ABSENT` | `REQUEST_REALITY_ENCOUNTER` | `READY_TO_ENTER_REALITY` | 新建 |
| `READY_TO_ENTER_REALITY` | `BEGIN_REALITY_ACCEPTANCE` | `ACCEPTING_REALITY` | 保持 |
| `ACCEPTING_REALITY` | `REALITY_MINIMUM_PRESENTED` | `ACTIVE_IN_REALITY` | 保持 |
| `ACCEPTING_REALITY` | `REALITY_ACCEPTANCE_FAILED` | `FAILED_RETRYABLE` | 保持 |
| `FAILED_RETRYABLE` | `RETRY_SAME_ENCOUNTER` | `ACCEPTING_REALITY` | 保持 |
| Runtime boot | `RECOVERY_CANDIDATE_FOUND` | `RECOVERING` | 候选 |
| `RECOVERING` | `RECOVERY_VALIDATED` | `ACCEPTING_REALITY` | 保持 |
| `RECOVERING` | `RECOVERY_REJECTED` | `TERMINAL` | 终结 |
| `ACTIVE_IN_REALITY` | `EXPLICIT_LEAVE` | `TERMINAL` | 终结 |
| `ACTIVE_IN_REALITY` | `ENCOUNTER_COMPLETED` | `TERMINAL` | 终结 |
| `READY_TO_ENTER_REALITY / FAILED_RETRYABLE` | `EXPLICIT_LEAVE` | `TERMINAL` | 终结 |
| 非终结周期 | `START_NEW_ENCOUNTER` | 非法 | 不生成 |
| `TERMINAL / ABSENT` | `START_NEW_ENCOUNTER` | `READY_TO_ENTER_REALITY` | 新建 |

### 4.3 非法转换

必须拒绝：

```text
ABSENT → ACTIVE
READY → ACTIVE without Host Outcome
FAILED → READY with new cycle
ACTIVE → READY with same cycle
RECOVERING → ACTIVE without Host re-acceptance
Identity Restore → READY
Route Mounted → ACTIVE
navigate() called → ACTIVE
Storage ACTIVE field → ACTIVE
Choice clicked → ACTIVE
```

---

## 五、`encounterCycleId` 生命周期

### 5.1 唯一生成者

冻结：

```text
RealityEncounterIntentController
```

禁止生成者：

- Genesis Page；
- Launch / Returning Page；
- Gravity / Choice；
- Route；
- Reality Host；
- Renderer；
- Recovery Adapter；
- Storage；
- Pressure Seed；
- Activation Source。

### 5.2 生成时机

只在以下条件全部成立时生成：

```text
生产者资格成立
↓
没有未终结 encounter
↓
用户第一次明确请求进入新的 Reality
↓
Controller 接受 REQUEST_REALITY_ENCOUNTER
```

### 5.3 ID 语义

建议格式：

```text
reality-encounter:{opaque-id}
```

要求：

- 不从出生信息派生；
- 不从 `sourceReferenceId` 派生；
- 不从时间戳单独派生；
- 不从 Whisper response cycle 派生；
- 不从 Choice reference 派生；
- 不携带隐私；
- 同一周期稳定；
- 新周期唯一。

### 5.4 保持规则

以下情况必须保持原 ID：

- Route 失败；
- Activation Source 失败；
- Candidate 初始化失败；
- Host 拒绝；
- Chunk 加载失败；
- 网络中断；
- 同周期重试；
- 硬刷新；
- App 切后台；
- WebGL Context 丢失；
- 浏览器普通卸载；
- 返回上一页但没有明确离开。

### 5.5 新建规则

只有：

```text
旧周期 TERMINAL
+
用户明确请求新的 Reality encounter
```

才生成新 ID。

### 5.6 不得冒充 cycle 的字段

禁止使用：

- `sourceReferenceId`；
- `intentReferenceId`；
- Life Whisper Response Cycle；
- Choice Trace Reference；
- Candidate Bundle Reference；
- Selected Pressure Seed ID；
- route key；
- React mount key。

---

## 六、Intent 数据契约

未来类型最低结构：

```ts
type RealityEncounterIntentState =
  | "READY_TO_ENTER_REALITY"
  | "ACCEPTING_REALITY"
  | "FAILED_RETRYABLE"
  | "ACTIVE_IN_REALITY"
  | "RECOVERING"
  | "TERMINAL";

type RealityEncounterIntent = Readonly<{
  schemaVersion: "XINMAI_REALITY_ENCOUNTER_INTENT_V1";
  source: "xinmai_reality_encounter_intent_controller";

  intentReferenceId: string;
  encounterCycleId: string;

  sourceReferenceId: string;
  starBeastIdentityReferenceId: string;
  mansionCoordinateReferenceId: string;

  origin:
    | "FIRST_ENCOUNTER"
    | "RETURNING_LIFE_WORLD"
    | "CHOICE_CONTINUATION";

  qualification:
    | "WHISPER_RESPONSE_SETTLED"
    | "WHISPER_SKIPPED"
    | "RESPONSE_UNAVAILABLE_EXPLICITLY_CONTINUED"
    | "LIVED_RESPONSE_CONTINUATION";

  state: RealityEncounterIntentState;
  routeTarget: "/reality";

  issuedAt: string;
  updatedAt: string;
  expiresAt: string;
  revision: number;

  failure: RealityEncounterFailure | null;
  terminalReason: RealityEncounterTerminalReason | null;

  provenance: RealityEncounterIntentProvenance;
}>;
```

### 6.1 `intentReferenceId`

用于：

- 导航引用；
- Controller 查找；
- Recovery Candidate 对照；
- 防止错误 Intent 被承接。

它不能替代 `encounterCycleId`。

### 6.2 三项身份绑定

必须验证：

```text
sourceReferenceId
starBeastIdentityReferenceId
mansionCoordinateReferenceId
```

Intent 不拥有这些身份。

它只引用并校验现有权威。

### 6.3 `revision`

每次合法状态转换：

```text
revision + 1
```

用于拒绝：

- 旧异步回调；
- 旧 Host Outcome；
- 旧 Recovery Candidate；
- 同 cycle 的过期尝试。

### 6.4 绝对排除字段

Intent 类型不得出现：

- `lifeWhisperText`；
- `relationshipName`；
- `mansionName` 文案；
- `pressureSeedId`；
- `selectedPressureSeedContext`；
- `sixDimension`；
- `gravityState`；
- `choiceResult`；
- `crystal`；
- `archiveEntry`；
- `payment`；
- `growthReadiness`。

---

## 七、Controller 权威

### 7.1 唯一 Runtime 所有者

未来唯一状态权威：

```text
RealityEncounterIntentController
```

它不是：

- React Page State；
- Router State；
- Storage；
- Host State；
- Renderer State；
- Pressure Seed Engine。

### 7.2 Controller 允许职责

- 校验 producer qualification；
- 生成 `encounterCycleId`；
- 创建 Intent；
- 推进状态机；
- 调用 Recovery Adapter；
- 校验恢复候选；
- 发出 Route Admission Result；
- 接收 Host Acceptance Outcome；
- 记录失败；
- 保持同周期重试；
- 终结与清除。

### 7.3 Controller 禁止职责

- 解释 Life Whisper；
- 判断 StarBeast Response 是否应发生；
- 生成身份；
- 修改关系名；
- 生成 Pressure Seed；
- 选择候选；
- 启动 Gravity；
- 判断 Choice 正确性；
- 生成 Crystal；
- 操作 Renderer。

### 7.4 目标 API

未来 API 建议：

```text
requestEncounter(input)
beginAcceptance(input)
commitActive(outcome)
failAcceptance(failure)
retryCurrentEncounter(input)
recoverCandidate(input)
terminateCurrentEncounter(input)
readCurrentIntent()
```

所有 API 必须：

- 返回不可变 outcome；
- 不返回模糊 boolean；
- 携带拒绝原因；
- 校验 `intentReferenceId`、cycle、revision、三项身份；
- 拒绝旧回调。

---

## 八、三种生产者资格

### 8.1 共同原则

生产者只提供：

```text
资格事实
+
用户明确动作
+
身份引用
```

生产者不能：

- 生成 cycle；
- 修改 Intent state；
- 写 Recovery Storage；
- 宣称 Active；
- 直接授权 Route。

### 8.2 Genesis Producer

必须满足：

```text
Genesis Completion
Recognition confirmed
同一 StarBeast response continuity
Life Whisper qualification resolved
三项身份一致
用户点击 ENTER_REALITY
```

允许 qualification：

- `WHISPER_RESPONSE_SETTLED`；
- `WHISPER_SKIPPED`；
- `RESPONSE_UNAVAILABLE_EXPLICITLY_CONTINUED`。

命名：

```text
OPTIONAL
```

关系名不得成为资格。

### 8.3 Returning Producer

必须满足：

```text
Returning Identity recovered
Returning Visual Continuity ready
三项身份一致
当前返回稳态成立
当前 Life Whisper qualification resolved
用户点击 RETURNING_REALITY_INTENT
```

历史 Reality：

```text
MEMORY_ONLY
```

历史 Crystal：

```text
BODY_IMPRINT
```

二者均不得成为 qualification。

### 8.4 Choice Continuation Producer

必须满足：

```text
上一 encounter 已有正式终结资格
同一生命身份仍一致
已有 Choice Continuation Reference
用户明确请求进入下一次 Reality
```

Choice 只能输出：

```text
LIVED_RESPONSE_CONTINUATION qualification
```

Choice 不得：

- 生成 cycle；
- 使用旧 cycle 作为新 cycle；
- 直接设为 Active；
- 直接导航即视为成功；
- 写 Recovery Adapter；
- 跳过 Controller。

### 8.5 Choice 前置阻断

当前存在门禁漂移：

```text
check-reality-production-choice-consumer.mjs
```

仍要求：

```text
RealityProductionHost
初始化 initializeRealityProductionChoiceConsumer
```

而当前 Host 未持有该调用。

在 Choice Adapter 进入未来 Atomic Migration 前，必须单独校准：

```text
门禁是否过期
或
Runtime 是否缺少既定消费者
```

该校准：

- 不得混入 Atomic Migration；
- 不得由 PREP 猜测结论；
- 不得借 Intent 迁移新增 Choice 玩法。

---

## 九、消费顺序正式冻结

唯一顺序：

```text
Producer Qualification
↓
用户明确 REQUEST
↓
Controller 创建 READY Intent
↓
Recovery Adapter 写入候选
↓
navigate(/reality, intentReferenceId)
↓
Route 请求 Controller BEGIN_ACCEPTANCE
↓
Controller 进入 ACCEPTING
↓
Route Authorization
↓
Activation Source
↓
Candidate Activation
↓
Candidate Request
↓
Delivery / Host Input
↓
Reality Host 接受当前 cycle
↓
Minimum Reality Surface 呈现
↓
Host Acceptance Outcome
↓
Controller 原子提交 ACTIVE
```

禁止顺序：

```text
Storage
↓
Route 自主恢复
↓
ACTIVE
```

禁止顺序：

```text
navigate()
↓
ACTIVE
```

禁止顺序：

```text
Identity restored
↓
Route authorized
```

---

## 十、Route 责任

### 10.1 Route 允许职责

- 接收 `intentReferenceId`；
- 请求 Controller 准备当前 admission；
- 将 Controller 返回的 typed admission 交给 Authorization；
- 建立 Route / Activation / Candidate / Host 输入；
- 将真实失败报告 Controller；
- 将 Host outcome 转交 Controller；
- 显示安全失败与重试入口。

### 10.2 Route 禁止职责

- 生成 cycle；
- 读取或写入 sessionStorage；
- 读取 Recovery Adapter；
- 从身份合成 Intent；
- 从 `returningEntry` 合成 Intent；
- 从 `choiceContinuation` 合成 Intent；
- 自己决定 Active；
- 因 mount 成功而提交 Active；
- 用计时器提交 Active。

### 10.3 Route 与现有身份恢复

Route 可以消费：

```text
已有类型化 Identity Recovery Result
```

但不得：

- 读取原始 storage key；
- 将 `restoredIdentityReady` 当作 current intent；
- 在缺 Intent 时恢复 `REALITY_ENTRY_ELIGIBLE` 成功路径。

### 10.4 `location.state`

未来 route state 只携带：

```text
intentReferenceId
```

以及既有纯展示 memory：

- visual continuity；
- historical memory key；
- Crystal imprint key；
- Choice trace presentation。

`location.state` 不是权威。

它丢失后：

```text
Controller + Recovery Candidate
```

负责恢复。

---

## 十一、Route Authorization 责任

### 11.1 目标输入

```ts
authorizeRealityProductionRoute({
  routeTarget,
  identityEntryContext,
  encounterAdmission
})
```

### 11.2 必须校验

- route 为 `/reality`；
- Intent state 为 `ACCEPTING_REALITY`；
- intent / cycle / revision 为当前；
- 三项身份引用一致；
- Intent 未过期；
- producer origin 合法；
- 用户明确动作已记录；
- identity context 真实；
- 禁止来源不存在。

### 11.3 输出

Authorization 输出必须携带：

```text
intentReferenceId
encounterCycleId
intentRevision
sourceReferenceId
```

不得携带：

- Life Whisper 原文；
- relationship name；
- qualification 解释文本；
- Pressure Seed。

### 11.4 当前隐式依赖删除

未来 Authorization 不得内部调用：

```text
readGenesisProductionRealityEntryContext()
```

所有输入必须显式。

---

## 十二、Activation Source 责任

### 12.1 输入

```text
Route Authorization
Identity Context
Request Date Source
Encounter Admission
```

### 12.2 输出

增加：

```text
intentReferenceId
encounterCycleId
intentRevision
```

用途：

- 保证当前 Activation 属于同一 attempt；
- 拒绝旧周期；
- 拒绝旧 revision；
- 供 Host Outcome 对照。

### 12.3 禁止

Activation Source 不得：

- 读取 Storage；
- 生成 cycle；
- 修改 Controller；
- 判断 Active；
- 生成 Pressure Seed；
- 从身份重建 Intent。

---

## 十三、Candidate 责任

### 13.1 顺序责任

Candidate 只能在：

```text
Route Authorization READY
+
Activation Source AVAILABLE
+
Controller state ACCEPTING
```

后初始化。

### 13.2 Candidate 不是 Intent 消费者

Candidate 只消费：

- 已授权的真实用户来源；
- 当前请求日期；
- catalog routing；
- bundle cursor；
- exclusions。

Candidate 不消费：

- Life Whisper；
- Relationship Name；
- qualification；
- Intent failure；
- Choice 对错。

### 13.3 部分初始化

Active 前创建的：

- activation context；
- candidate request；
- delivery session；
- host input；
- pressure consumer session；

均为：

```text
acceptance-local temporary objects
```

在失败时：

- 不发布为 Active；
- 不写入 SelectedPressureSeedContext；
- 不进入 Dynamics；
- 不成为第二真源；
- 同周期重试时重新构建或幂等复用。

---

## 十四、Reality Host Commit

### 14.1 Host 是提交证明者，不是状态所有者

Host 只报告：

```text
RealityHostAcceptanceOutcome
```

Controller 才能提交：

```text
ACTIVE_IN_REALITY
```

### 14.2 Host 输入

未来 Host 必须显式接收：

```text
intentReferenceId
encounterCycleId
intentRevision
sourceReferenceId
onRealityAcceptanceOutcome
```

### 14.3 最低可用 Reality 条件

冻结为以下全部成立：

```text
同一 encounterCycleId
+
Route Authorization READY
+
Activation Source AVAILABLE
+
Host Input READY
+
Pressure Seed Continuation ACTIVE
+
Pressure Seed Consumer READY
+
当前 Reality 主体与候选观察 Surface 已实际呈现
```

最低可用不要求：

- 用户已选择候选；
- Pressure Seed 已认出；
- Gravity ready；
- AI 开始；
- Choice 开始；
- Crystal 开始。

### 14.4 Host Outcome

成功：

```text
REALITY_MINIMUM_PRESENTED
```

必须携带：

- intentReferenceId；
- encounterCycleId；
- intentRevision；
- sourceReferenceId；
- presented surface；
- committedAt。

失败：

```text
REALITY_HOST_UNAVAILABLE
```

必须携带真实 reason。

### 14.5 禁止提交方式

禁止：

- `navigate()` 返回；
- Page mount；
- Route component render；
- 固定计时器；
- CSS animation end；
- Renderer frame；
- data attribute 出现但主体未呈现；
- Storage 写入成功；
- Pressure Seed 候选对象刚被创建。

---

## 十五、原子提交点

### 15.1 唯一提交

```text
Controller.commitActive(
  Host REALITY_MINIMUM_PRESENTED Outcome
)
```

### 15.2 提交前校验

Controller 必须再次校验：

```text
current state = ACCEPTING_REALITY
intentReferenceId match
encounterCycleId match
intentRevision match
sourceReferenceId match
三项身份 match
not expired
Host Outcome belongs to current attempt
```

### 15.3 提交结果

成功：

```text
ACTIVE_IN_REALITY
revision + 1
Recovery Candidate 更新为 ACTIVE
```

失败：

```text
不改变为 ACTIVE
拒绝旧 outcome
记录明确 reason
```

---

## 十六、失败与重试矩阵

| 失败阶段 | 状态 | cycle | 用户可见 | 重试 |
| --- | --- | --- | --- | --- |
| 请求前资格不足 | `ABSENT` | 无 | 入口未开放 | 等待资格 |
| Recovery 写入失败 | `READY_TO_ENTER_REALITY` | 保持 | 当前导航可继续，刷新不可保证 | 同周期 |
| Route Chunk 失败 | `READY/FAILED` | 保持 | Reality 暂未打开 | 同周期 |
| Route Authorization 失败 | `FAILED_RETRYABLE` | 保持 | 未进入 Reality | 同周期 |
| Activation Source 失败 | `FAILED_RETRYABLE` | 保持 | 生命仍在，现实未承接 | 同周期 |
| Candidate Activation 失败 | `FAILED_RETRYABLE` | 保持 | 候选未出现 | 同周期 |
| Candidate Request 失败 | `FAILED_RETRYABLE` | 保持 | 候选未出现 | 同周期 |
| Delivery / Host Input 失败 | `FAILED_RETRYABLE` | 保持 | Reality 未就绪 | 同周期 |
| Host 未呈现最低 Surface | `FAILED_RETRYABLE` | 保持 | 不声称已进入 | 同周期 |
| Host Outcome 旧 revision | 原状态 | 保持 | 无伪成功 | 拒绝回调 |
| Active 后 WebGL 丢失 | `ACTIVE_IN_REALITY` | 保持 | 视觉降级，不终结 | 恢复视觉 |
| Active 后刷新 | `RECOVERING` | 保持 | 重新承接 | 同周期 |

### 16.1 失败 reason

最低枚举：

```text
ROUTE_LOAD_UNAVAILABLE
INTENT_NOT_CURRENT
IDENTITY_MISMATCH
INTENT_EXPIRED
ROUTE_AUTHORIZATION_REJECTED
ACTIVATION_SOURCE_UNAVAILABLE
CANDIDATE_ACTIVATION_UNAVAILABLE
CANDIDATE_REQUEST_UNAVAILABLE
DELIVERY_UNAVAILABLE
HOST_INPUT_UNAVAILABLE
MINIMUM_SURFACE_NOT_PRESENTED
HOST_OUTCOME_MISMATCH
RECOVERY_CANDIDATE_INVALID
RECOVERY_STORAGE_UNAVAILABLE
```

### 16.2 同周期重试

重试必须：

- 保持 cycle；
- 保持 intent reference；
- revision 增加；
- 清除上一 attempt 的临时对象；
- 拒绝旧 outcome；
- 不使用 identity-only 旁路；
- 不自动选择 Pressure Seed。

---

## 十七、刷新与恢复矩阵

### 17.1 ACTIVE 后刷新

```text
Recovery Adapter read
↓
Recovery Candidate
↓
Controller RECOVERING
↓
三项身份、cycle、revision、TTL 校验
↓
Controller ACCEPTING
↓
Route / Activation / Host 重新承接
↓
同一 cycle ACTIVE
```

### 17.2 Active 前刷新

#### 存储为 READY

恢复：

```text
FAILED_RETRYABLE
```

reason：

```text
RECOVERY_AFTER_INCOMPLETE_ACCEPTANCE
```

保留 cycle，可重试。

#### 存储为 ACCEPTING

不得假定承接成功。

恢复为：

```text
FAILED_RETRYABLE
```

同周期重试。

#### 存储为 FAILED

恢复同一：

```text
FAILED_RETRYABLE
```

### 17.3 直接 URL

```text
Identity only
+
no Recovery Candidate
↓
NOT AUTHORIZED
```

```text
valid current Recovery Candidate
↓
Controller RECOVERING
↓
same-cycle re-acceptance
```

Route 不能自行区分或恢复。

### 17.4 普通生命周期

以下事件不清除：

- `beforeunload`；
- Page hidden；
- App background；
- network offline；
- chunk failure；
- WebGL context lost；
- browser crash。

---

## 十八、明确离开与周期终结

### 18.1 明确离开来源

- “暂时离开”；
- 明确关闭当前 encounter；
- 正式完成并进入下一阶段；
- 用户主动开始新 encounter；
- 用户主动清除数据。

### 18.2 返回上一页

默认：

```text
保留当前 cycle
```

不视为明确离开。

若产品未来新增“放下这一轮”，必须触发：

```text
EXPLICIT_LEAVE
```

### 18.3 正式完成

进入 Dynamics 不一定等于整个生命周期完成，但对当前 Reality Entry Intent：

```text
Reality 已正式承接
且用户已明确认出当前事件
且正式 handoff 成立
```

可以发出：

```text
ENCOUNTER_COMPLETED
```

然后终结该 Entry Intent。

Pressure Seed、Choice、Crystal 不得直接修改 Intent。

只能由正式 handoff adapter 向 Controller 报告：

```text
当前 Reality Entry 周期已结束
```

---

## 十九、Recovery Adapter 唯一边界

### 19.1 唯一 Reader / Writer

冻结：

```text
sessionStorage
↓↑
RealityEncounterIntentRecoveryAdapter
```

唯一允许访问 storage key 的代码：

```text
Recovery Adapter
```

### 19.2 Controller

Controller：

- 调用 Adapter；
- 消费 typed outcome；
- 校验候选；
- 重新建立 Runtime 权威。

Controller 不直接：

- 访问 `window.sessionStorage`；
- 解析 JSON；
- 拼 storage key。

### 19.3 零存储读取

以下均为零存储：

- Route；
- Page；
- Host；
- Renderer；
- Activation Source；
- Candidate；
- Pressure Seed；
- Choice。

它们不得导入 Recovery Adapter。

### 19.4 Adapter API

```text
writeCandidate(snapshot)
readCandidate()
updateCandidate(snapshot)
markTerminal(snapshot)
clearCandidate(intentReferenceId)
```

outcome 必须是：

```text
CONFIRMED
UNAVAILABLE
UNCONFIRMED
CORRUPTED
NOT_FOUND
```

禁止返回模糊 boolean。

### 19.5 Recovery Candidate 不是权威

Storage 只保存：

- schema；
- intent reference；
- cycle；
- revision；
- 三项身份引用；
- origin；
- qualification 枚举；
- last known state；
- issued / updated / expires；
- last failure code；
- terminal marker。

读取后必须经过 Controller。

### 19.6 TTL

冻结未来常量：

```text
2 hours
```

目的：

- 支持一次完整体验与刷新；
- 不形成长期通行证；
- 防止历史 Intent 被误认成当前意愿。

### 19.7 清除真实性

明确终结时：

```text
先写 TERMINAL marker
↓
确认
↓
清除 candidate
```

若清除未确认：

- Controller 当前 Runtime 仍保持 Terminal；
- 不展示“恢复候选已清除”的伪成功；
- Adapter 后续读取必须优先尊重同 revision 或更高 revision 的 Terminal；
- 允许重试清除；
- 不恢复旧 Active snapshot。

---

## 二十、旧路径删除清单

未来 Atomic Migration 同一提交必须移除或降权：

### 20.1 Identity-only success

删除 Route 中：

```text
restoredIdentityReady
↓
restoreGenesisProductionRealityEntryContext
↓
直接获得当前 Reality authorization
```

身份 context 可以恢复，但没有 Intent 必须失败。

### 20.2 Route 自主成功

删除：

- Route 仅凭 Entry Context 判定成功；
- Route mount 即创建新 encounter；
- `entryCycle = NEW_REALITY_ENCOUNTER` 固定周期；
- Route 自己捕获 storage 字段决定恢复；
- Route 自己将 persisted `ACTIVE_IN_REALITY` 视为权威。

### 20.3 Genesis 隐式权威

降权：

```text
GenesisProductionRealityEntryContext
```

只作为身份与 Recognition 证明。

不得单独代表 current Reality Intent。

### 20.4 Route state 伪权威

以下只保留展示或适配作用：

```text
returningEntry
choiceContinuation
visualContinuity
historical memory keys
```

不得作为授权成功真源。

### 20.5 Authorization 隐式读取

删除：

```text
authorizeRealityProductionRoute()
内部读取 module-global Genesis Context
```

改为显式输入。

### 20.6 第二条路径

禁止保留：

```text
typed Intent 路径
+
identity-only fallback
```

---

## 二十一、未来单提交文件边界

以下为 Runtime 申请时的授权候选清单，不是本刀修改范围。

### 21.1 新增类型

```text
src/types/xinmaiRealityEncounterIntent.ts
```

包含：

- Intent；
- State；
- Event；
- Failure；
- Terminal；
- Producer Qualification；
- Admission；
- Host Outcome；
- Recovery Candidate / Outcome。

### 21.2 新增 Controller

```text
src/services/xinmaiRealityEncounterIntentController.ts
```

### 21.3 新增 Recovery Adapter

```text
src/services/xinmaiRealityEncounterIntentRecoveryAdapter.ts
```

### 21.4 修改生产者

```text
src/pages/GenesisProductionExperiencePage.tsx
src/pages/LaunchLab.tsx
src/pages/GravityPage.tsx
```

### 21.5 修改承接链

```text
src/pages/RealityProductionRouteEntry.tsx
src/components/RealityProductionHost.tsx
src/services/realityProductionRouteAuthorization.ts
src/services/realityRouteActivationSourceContext.ts
src/types/realityProductionRouteAuthorization.ts
src/types/realityRouteActivationSourceContext.ts
src/types/realityProductionRouteEntry.ts
```

### 21.6 可能需要的 Identity Assembly

如果 Route 当前直接恢复持久化身份无法满足“Route 零存储”：

```text
必须复用或抽取现有 typed identity recovery result
```

允许新增纯 Adapter：

```text
src/services/realityRecognizedIdentityRecoveryAdapter.ts
```

前提：

- 只包装已有身份资产；
- 不创建身份；
- 不重算二十八宿；
- 不成为 Intent Owner；
- 不扩张持久化；
- 需在 Runtime 申请中明确。

若不需要，不得为了架构完整而新增。

### 21.7 新增或更新门禁

建议新增：

```text
scripts/check-xinmai-reality-encounter-intent-controller.mjs
scripts/check-xinmai-reality-encounter-intent-recovery.mjs
scripts/check-xinmai-reality-encounter-intent-atomic-migration.mjs
```

更新：

```text
scripts/check-reality-production-route-authorization.mjs
scripts/check-reality-production-route-entry.mjs
scripts/check-reality-route-activation-source-context.mjs
scripts/check-xinmai-returning-life-whisper-relation-intent-atomic-migration.mjs
scripts/check-xinmai-first-encounter-recognition-action-reachability-correction.mjs
```

Choice 相关检查必须先独立校准后再列入最终迁移基线。

### 21.8 包清单

```text
package.json
```

只允许注册门禁。

不得新增依赖。

---

## 二十二、单提交原子顺序

未来实施必须在一个 Git commit 中交付以下完整状态：

```text
1. Intent 类型
2. Controller
3. Recovery Adapter
4. Genesis Producer Adapter
5. Returning Producer Adapter
6. Choice Continuation Adapter
7. Route Admission
8. Explicit Authorization Input
9. Activation Source intent continuity
10. Host Acceptance Outcome
11. ACTIVE commit
12. identity-only success 删除
13. Route autonomous success 删除
14. old-cycle rejection
15. storage / recovery gates
16. browser runtime gates
```

禁止拆为：

```text
先建立新权威
↓
以后删除旧权威
```

---

## 二十三、回滚方案

### 23.1 回滚单位

```text
完整 Atomic Migration Commit
```

### 23.2 必须同时回滚

- Controller；
- Recovery Adapter；
- producer adapters；
- Route contract；
- Authorization；
- Activation；
- Host outcome；
- cycle key；
- 删除旧路径的修改；
- 所有门禁。

### 23.3 Storage 遗留

回滚后新 Recovery key：

- 旧 Runtime 不读取；
- 不进入身份资产；
- 不进入 Pressure Seed；
- 标签页关闭后消失；
- 不阻断旧 Runtime。

### 23.4 禁止局部回滚

禁止：

- 只回滚 Route；
- 只回滚 producer；
- 只恢复 identity fallback；
- 只删除 Recovery Adapter；
- 保留两个 Authority。

---

## 二十四、正向门禁

### Gate P1｜Genesis Submitted

```text
SUBMITTED + SETTLED
↓
用户明确 REQUEST
↓
Controller 生成 cycle
↓
READY
↓
Host Outcome
↓
ACTIVE
```

### Gate P2｜Genesis Skipped

```text
SKIPPED
↓
用户明确 REQUEST
↓
READY
```

不伪造 StarBeast Response。

### Gate P3｜Unavailable Continue

保持真实：

```text
UNAVAILABLE
```

用户明确继续后可建立 Intent，但不得宣称回应完成。

### Gate P4｜Returning

恢复同一身份、当前关系资格和用户动作后，生成新 cycle。

### Gate P5｜Choice Continuation

旧 encounter 正式终结后，Choice 只能提交 qualification；Controller 生成新 cycle。

### Gate P6｜Host Commit

只有真实 minimum surface outcome 进入 Active。

### Gate P7｜Same-cycle Retry

所有 Active 前失败：

```text
cycle unchanged
revision increased
```

### Gate P8｜Active Refresh

刷新后：

```text
RECOVERING
↓
same-cycle Host re-acceptance
↓
ACTIVE
```

### Gate P9｜Explicit Leave

形成 Terminal marker 并清除恢复候选。

---

## 二十五、负向门禁

必须证明：

```text
identity-only authorization：
0

Route-generated cycle：
0

Host-generated cycle：
0

Storage-as-authority：
0

navigate-as-commit：
0

timer-as-commit：
0

old outcome contamination：
0

second Reality chain：
0

raw Whisper consumer：
0

relationship name consumer：
0

Pressure Seed side effect before ACTIVE：
0

Choice / Crystal side effect before ACTIVE：
0

DOM → Controller authority channel：
0

Renderer authority：
0
```

### 25.1 禁止消费者扫描

以下不得导入 Controller mutation API：

- Renderer；
- Pressure Seed Candidate Source；
- Six Dimension；
- Gravity consumer；
- AI Reflection；
- Crystal；
- Archive；
- Life Engine。

它们不得推进 Intent state。

---

## 二十六、Runtime 验收矩阵

### 26.1 新用户

1. Submitted + Settled；
2. Skipped；
3. Unavailable + Explicit Continue；
4. 未命名；
5. 已命名。

命名状态不得影响结果。

### 26.2 老用户

1. 同一身份；
2. 同一关系名或未命名；
3. 历史 Reality memory-only；
4. 历史 Crystal body-imprint；
5. 当前 Whisper 新周期；
6. 显式 Reality request。

### 26.3 Choice

1. 旧周期正式结束；
2. 用户明确继续；
3. 新 cycle；
4. 旧 trace 只作 memory；
5. 不直接 Active。

### 26.4 失败

覆盖：

- Route；
- Activation；
- Candidate；
- Delivery；
- Host Input；
- Host Outcome；
- storage write；
- storage read；
- storage clear；
- identity mismatch；
- expired；
- stale revision；
- stale cycle。

### 26.5 生命周期

覆盖：

- same-cycle retry；
- refresh before Active；
- refresh after Active；
- back navigation；
- background；
- WebGL loss；
- explicit leave；
- terminal；
- new encounter。

---

## 二十七、Runtime 申请条件

未来 Runtime 刀只有在以下全部成立后可申请：

1. 本 PREP 文档已提交并成为远程基线；
2. Choice consumer gate drift 已独立校准；
3. Controller 类型契约无歧义；
4. 状态机与非法转换冻结；
5. Host minimum surface 定义冻结；
6. Recovery Adapter 唯一边界冻结；
7. Route 零存储边界可实现；
8. identity-only 删除清单完整；
9. 三类 producer 均可在同一提交接入；
10. 单提交文件边界可控；
11. 全量门禁可在干净快照执行；
12. 回滚单位为一个 commit；
13. Product Control Tower 单独授权：

```text
NOW — ATOMIC MIGRATION
```

未获得该授权：

```text
Runtime DEFER
```

---

## 二十八、Definition of Done

本 PREP 完成条件：

- 产品语义与禁止语义明确；
- 七态状态机明确；
- `encounterCycleId` 唯一生成者明确；
- 三种 producer 资格明确；
- Route / Activation / Candidate / Host 顺序明确；
- Host Commit Point 明确；
- 失败与同周期重试明确；
- 刷新与恢复明确；
- 明确离开与普通生命周期区分明确；
- Recovery Adapter 是唯一 storage boundary；
- identity-only 删除清单明确；
- 单提交文件范围明确；
- 正负向门禁明确；
- Runtime 申请条件明确；
- 未修改 Runtime。

完成句：

> 用户明确进入的这一轮现实，只有在同一个生命、同一个周期和真实可见的 Reality 共同承接后，才算真正开始。

---

## 二十九、施工后交通灯扫描

### 绿色

```text
0
```

当前下一步不能直接实施 Runtime。

### 黄色

发现：

```text
Choice consumer gate authority 尚未校准
```

当前检查期待：

```text
RealityProductionHost
↓
initializeRealityProductionChoiceConsumer
```

当前 Runtime：

```text
不存在该调用
```

在不知道“检查过期”还是“消费者缺失”之前，不允许将 Choice Adapter 写入 Atomic Migration。

裁决：

```text
MAP / Gate Authority Calibration
```

其他黄色项继续保持独立：

- Candidate cursor refresh continuity；
- Choice / Crystal 计时权威；
- timeline 文案门禁；
- `GRAVITY_READY_HOLD` 名称漂移；
- Reality Event 独立语义；
- “不完全是”修正体验。

### 红色

未来 Runtime 实施本身仍是：

```text
Atomic Migration
```

但当前：

```text
DEFER
```

本刀未创建任何双权威。

---

## 三十、下一刀建议

```text
XINMAI-REALITY-CHOICE-CONSUMER-GATE-AUTHORITY-CALIBRATION-P0
```

刀型：

```text
MAP / Gate Calibration
```

主 Layer：

```text
Layer 4｜Growth Continuity
```

保护 Layer：

```text
Layer 3｜Reality Entry
```

决策：

```text
NOW — MAP ONLY
```

唯一目标：

> 判断 `RealityProductionHost` 是否应当拥有 `initializeRealityProductionChoiceConsumer`，还是现有检查已经过期；冻结 Choice Continuation 的真实生产消费者和门禁基线，为未来 Intent Atomic Migration 清除歧义。

下一刀不得：

- 实施 RealityEncounterIntent；
- 修改 Choice 玩法；
- 将 Choice 接入 Host；
- 删除检查；
- 修改 Pressure Seed；
- 借门禁校准修复其他债务。

---

## 三十一、最终冻结

```text
Product Authority：
RealityEncounterIntent ACCEPTED

Runtime Authority：
NOT ESTABLISHED

Controller：
未来唯一 Runtime Owner

Storage：
Recovery Candidate Only

Route：
No Storage / No Authority

Host：
Acceptance Outcome Producer

Atomic Commit：
Host minimum surface
↓
Controller ACTIVE

Runtime：
DEFER

Phase 3：
LOCKED
```

最终原则：

> 身份证明“这是我的生命”；关系证明“我与它同行”；RealityEncounterIntent 只证明“我明确选择让这一轮现实现在开始”。
