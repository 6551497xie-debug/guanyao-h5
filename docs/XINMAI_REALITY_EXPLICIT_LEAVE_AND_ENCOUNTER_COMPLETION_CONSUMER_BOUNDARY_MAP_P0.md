# XINMAI Reality Explicit Leave and Encounter Completion Consumer Boundary Map P0

## 0. MAP 裁决

任务：

```text
XINMAI-REALITY-EXPLICIT-LEAVE-AND-ENCOUNTER-COMPLETION-CONSUMER-BOUNDARY-MAP-P0
```

刀型：

```text
MAP / Product Consumer Boundary Review
```

决策：

```text
NOW — MAP ONLY
```

Runtime 修改：

```text
0
```

最终裁决：

```text
EXPLICIT_LEAVE 产品语义：
REQUIRED

EXPLICIT_LEAVE Controller 能力：
EXISTS

EXPLICIT_LEAVE 生产消费者：
MISSING

ENCOUNTER_COMPLETED 产品语义：
VALID

ENCOUNTER_COMPLETED 生产消费者：
EXISTS

两者关系：
PARALLEL TERMINAL REASONS / NOT ALIASES
```

当前版本需要正式的 `EXPLICIT_LEAVE` 用户动作。

原因：

> 用户必须能够在不选择 Reality Candidate、不完成成长链、不制造失败或惩罚的情况下，明确结束当前 Reality Entry Encounter，并回到同一生命世界。

`ENCOUNTER_COMPLETED` 不能代替它，因为 `ENCOUNTER_COMPLETED` 代表当前 Reality 已被用户认出并完成正式 handoff。

---

## 1. 当前阶段

```text
RealityEncounterIntent Runtime Authority：
ESTABLISHED

RealityEncounterIntent Delivery：
OPEN

Phase 2：
CLOSED

Phase 3：
LOCKED
```

本 MAP 不：

- 解锁 Phase 3；
- 修改 Reality；
- 新增退出按钮；
- 修改 Controller；
- 修改 Host；
- 修改 Pressure Seed；
- 修改 Recovery；
- 实施 Acceptance Harness。

---

## 2. 产品语义

### 2.1 Explicit Leave

回答：

> 用户是否明确选择让当前这一轮 Reality Encounter 到此为止。

它代表：

- 本轮暂时不继续；
- 当前 Intent 可以正式终结；
- 用户仍回到同一生命世界；
- 用户未来可以主动开始新一轮 Reality；
- 当前未完成不是失败。

它不代表：

- 清除身份；
- 清除二十八宿；
- 清除 StarBeast；
- 清除 Relationship Name；
- 删除历史 Crystal；
- Reality 完成；
- Pressure Seed 被认出；
- Choice 已形成；
- 用户放弃成长；
- 用户登出；
- 用户数据清除。

### 2.2 Encounter Completed

回答：

> 当前 Reality Entry 是否已经完成正式承接，并将用户认出的现实交给下一阶段。

它代表：

```text
Reality 已 Active
+
用户认出 Candidate
+
生命身体回应成立
+
正式 Dynamics Handoff 成立
```

它不代表：

- 浏览器页面已打开；
- Candidate 已展示；
- 用户只是暂停；
- 用户只是返回；
- 用户明确离开；
- Choice 已完成；
- 整个生命成长周期已经结束。

### 2.3 两者不可互换

```text
EXPLICIT_LEAVE
=
用户结束未完成的当前 Entry Encounter

ENCOUNTER_COMPLETED
=
当前 Entry Encounter 已完成正式 Handoff
```

禁止：

- 将 Explicit Leave 记为完成；
- 将 Encounter Completed 写成放弃；
- 用同一个含糊按钮同时表达两种结果；
- 用 Route unmount 猜测用户意图。

---

## 3. 当前 Runtime 资产

### 3.1 Controller

现有：

```text
terminateRealityEncounter(reason)
```

支持：

```text
EXPLICIT_LEAVE
ENCOUNTER_COMPLETED
START_NEW_ENCOUNTER
INTENT_EXPIRED
IDENTITY_MISMATCH
RECOVERY_CANDIDATE_INVALID
USER_DATA_CLEARED
```

终结行为：

```text
当前 Intent → TERMINAL
↓
写入 terminalReason
↓
清除 Intent Recovery Candidate
↓
Controller currentIntent → null
```

裁决：

```text
Controller Authority：
SUFFICIENT

新 Controller：
FORBIDDEN

新 Terminal State：
NOT REQUIRED
```

### 3.2 Encounter Completed

当前唯一生产位置：

```text
RealityProductionRouteEntry
continueToGravity(...)
```

当前链：

```text
activeIntentReferenceId 与 Admission 一致
↓
terminateRealityEncounter("ENCOUNTER_COMPLETED")
↓
SelectedPressureSeedContext 正式写入
↓
Dynamics Handoff
```

裁决：

```text
语义：
CORRECT

生产者：
UNIQUE

保留：
YES
```

### 3.3 Explicit Leave

当前：

```text
Controller event：
EXISTS

Production UI producer：
0

Route consumer：
0

Host callback：
0

Browser reachable path：
0
```

裁决：

```text
PRODUCT CONSUMER GAP
```

---

## 4. 当前 UI 动作审查

### 4.1 “暂时停在这里”

位置：

```text
RealityPressureSeedPresentation
```

当前消费者：

```text
RealityProductionHost.pausePressureSeed
```

当前行为：

```text
PRESSURE_SEED_PAUSE
↓
暂停当前候选识别
↓
保留 Reality 页面
↓
保留当前 Intent
```

裁决：

```text
属于 Presentation Pause
不属于 Explicit Leave
```

禁止：

- 直接把该按钮改接 `EXPLICIT_LEAVE`；
- 把暂停候选解释为终结 Encounter；
- 借本刀更改其文案或行为。

### 4.2 “回到生命世界”

位置：

```text
RealityProductionRouteEntry
SOURCE_NOT_READY 非 retryable 分支
```

当前行为：

```text
navigate("/launch-lab")
```

当前不保证：

- 终结当前 Intent；
- 清除同 admission Activation Source；
- 记录明确离开；
- 区分无 Intent 与非 retryable Intent。

裁决：

```text
当前是安全返回导航
不是完整 Explicit Leave Transaction
```

### 4.3 “继续这一轮”

位置：

- `RealityProductionRouteEntry`；
- Reality Route Error Boundary。

当前行为：

```text
FAILED_RETRYABLE
↓
same-cycle retry
```

问题：

> Retryable 状态当前只给继续动作，没有正式“这一轮先到这里”。

用户不应被迫：

- 重试；
- 关闭页面；
- 使用浏览器后退；
- 等待 Intent 过期。

因此 Explicit Leave 在失败路径也是必要能力。

---

## 5. 为什么当前版本需要 Explicit Leave

### 5.1 用户主动权

XINMAI 已冻结：

```text
Choice 不是正确答案
关系不是强制推进
现实不是任务
```

若用户进入 Reality 后只能：

```text
继续
或
关闭页面
```

则产品实际形成隐性强制。

### 5.2 失败恢复

失败可重试不等于必须重试。

正确关系：

```text
失败
├── 继续这一轮
└── 这一轮先到这里
```

两者都不是惩罚。

### 5.3 长期陪伴

明确离开后：

```text
回到同一生命世界
↓
身份与关系保持
↓
未来重新表达
↓
生成新 encounter cycle
```

这比让旧 `FAILED_RETRYABLE` 长期悬挂更符合长期关系。

---

## 6. 冻结用户动作

推荐语义：

```text
这一轮先到这里
```

备选：

```text
先回到生命世界
```

不使用：

- 放弃；
- 退出任务；
- 取消成长；
- 结束分析；
- 关闭 Reality；
- 我失败了。

动作属性：

```text
自愿
次级
克制
可理解
不惩罚
```

无需：

- 成就反馈；
- 失败动画；
- AI 解释；
- 二次确认弹窗；
- 强制填写原因。

若本轮已经形成未持久化的当前输入或局部 UI 状态，可以克制提示：

> 这一轮尚未沉积，回去后不会成为当前 Reality。

不得暗示身份或关系会丢失。

---

## 7. 合法可见位置

### 7.1 FAILED_RETRYABLE

必须提供：

```text
继续这一轮
+
这一轮先到这里
```

原因：

- 用户需要同周期重试；
- 用户也需要明确终结；
- 不能用浏览器生命周期替代产品动作。

### 7.2 Route Load Failure

必须提供：

```text
继续这一轮
+
这一轮先到这里
```

Route Chunk 或组件错误不是用户失败。

### 7.3 ACTIVE / Candidate Awaiting Recognition

允许提供克制的次级动作：

```text
这一轮先到这里
```

它必须与：

```text
暂时停在这里
```

视觉和语义分开。

- “暂时停在这里”：留在本轮，暂停候选靠近；
- “这一轮先到这里”：终结本轮，返回生命世界。

### 7.4 Initial Acceptance Pending

不要求在首帧立即显示退出动作。

若等待超过可理解阈值或进入失败：

```text
必须提供
```

本 MAP 不新增新的等待计时器。

### 7.5 Candidate Recognized / Handoff Pending

若正式 Handoff 尚未提交：

```text
仍允许 Explicit Leave
```

离开不能写入：

- SelectedPressureSeedContext；
- Dynamics Handoff；
- Choice；
- Crystal。

---

## 8. 权威生产者与消费者

### 8.1 用户事件生产者

唯一产品生产者：

```text
用户明确点击
“这一轮先到这里”
```

禁止生产者：

- Route unmount；
- `beforeunload`；
- browser back；
- refresh；
- tab close；
- network offline；
- WebGL context lost；
- Watchdog；
- Pressure Seed pause；
- AI；
- Choice；
- Renderer。

### 8.2 Transaction Owner

冻结：

```text
Reality Route Boundary
```

原因：

- Route 拥有当前 encounter admission；
- Route 拥有 Activation Source 接入；
- Route 拥有返回 `/launch-lab`；
- Host 不应直接拥有 Intent；
- Presentation 不应直接拥有 Controller。

### 8.3 Controller

继续是唯一终结权威：

```text
terminateRealityEncounter("EXPLICIT_LEAVE")
```

UI 不能自行设置：

```text
TERMINAL
ABSENT
```

### 8.4 Recovery Adapter

继续由 Controller 间接消费。

UI、Host、Route 不直接写 Intent Recovery Storage。

### 8.5 Activation Source

Explicit Leave Transaction 必须清除：

```text
仅当前 admission 对应的 Activation Source
```

禁止：

- blanket clear 其他周期；
- 清除其他用户；
- 清除身份；
- cleanup 自动清除；
- 只终结 Intent 而残留当前 Activation Source。

---

## 9. Explicit Leave Transaction

冻结未来合法链：

```text
用户明确离开
↓
Route 校验当前 Intent / cycle / identity / revision
↓
Controller terminate EXPLICIT_LEAVE
↓
Recovery Candidate 由 Controller 清除
↓
精确清除同 admission Activation Source
↓
不创建 Selected Pressure
↓
不创建 Dynamics Handoff
↓
navigate("/launch-lab")
↓
恢复同一身份与关系
```

成功提交点：

```text
Controller 已确认 TERMINATED
+
当前 admission Activation Source 已清除或确认不存在
```

`navigate("/launch-lab")` 不是成功提交点。

---

## 10. Encounter Completed Transaction

冻结当前合法链：

```text
Reality Active
↓
用户认出 Candidate
↓
生命身体回应 / Inner View Entry 成立
↓
Route 校验 activeIntentReferenceId
↓
Controller terminate ENCOUNTER_COMPLETED
↓
Recovery Candidate 清除
↓
精确清除当前 Activation Source
↓
写入 SelectedPressureSeedContext
↓
构建 Dynamics Handoff
↓
navigate("/dynamics")
```

当前已存在：

- Controller termination；
- SelectedPressureSeedContext；
- Dynamics Handoff；
- active intent reference guard。

当前需要后续 PREP 明确复验：

- Encounter Completed 后 Activation Source 的精确清理；
- Handoff 中途失败时终结与 Selected Context 的原子关系；
- Controller 已终结但 navigate 失败时如何恢复安全空间；
- 不出现半完成状态。

这些问题不在本 MAP 中修复。

---

## 11. 两种终结的对照

|维度|Explicit Leave|Encounter Completed|
|-|-|-|
|用户意图|当前这一轮先结束|当前 Reality 已被认出并继续|
|需要 Candidate|NO|YES|
|需要身体回应|NO|YES|
|写 Selected Pressure|NO|YES|
|进入 Dynamics|NO|YES|
|返回生命世界|YES|NO|
|清除当前 Intent Recovery|YES|YES|
|清除当前 Activation Source|YES|YES|
|保留身份与关系|YES|YES|
|生成 Crystal|NO|NO，后续链决定|
|生成新 cycle|NO|NO|

未来新 cycle 只能来自：

```text
旧 cycle 已终结
+
用户再次明确请求 Reality
```

---

## 12. 状态覆盖

### 12.1 READY_TO_ENTER_REALITY

允许：

```text
EXPLICIT_LEAVE → TERMINAL
```

若尚未 Route commit：

- 无 Activation Source；
- 只需终结 Intent；
- 返回生命世界。

### 12.2 ACCEPTING_REALITY

允许：

```text
EXPLICIT_LEAVE → TERMINAL
```

要求：

- 当前 post-commit transaction 失效；
- 晚到 Outcome 被 cycle / revision / state 拒绝；
- 不被 cleanup 误判为第二次离开；
- 不产生 Active。

### 12.3 FAILED_RETRYABLE

允许：

```text
RETRY
或
EXPLICIT_LEAVE
```

两者互斥、都由用户明确触发。

### 12.4 ACTIVE_IN_REALITY

允许：

```text
EXPLICIT_LEAVE
或
ENCOUNTER_COMPLETED
```

两者必须由不同用户因果触发，不得竞争提交。

### 12.5 TERMINAL / ABSENT

重复 Explicit Leave：

```text
幂等 NOT_ACTIVE
```

不得：

- 生成新 cycle；
- 清除身份；
- 报错阻断返回生命世界。

---

## 13. 竞态与失败矩阵

|场景|正确结果|
|-|-|
|用户连续点击离开|一次终结，重复调用幂等|
|离开与 Host Active Outcome 同时发生|Controller 当前状态决定唯一获胜结果，不能双提交|
|离开后旧 Outcome 晚到|拒绝|
|离开时 Route 卸载|已确认终结保留；未确认事务不得伪成功|
|Activation Source 已不存在|终结成功，视为已清除|
|Activation Source 不匹配|不清其他周期，报告真实失败并保持安全 UI|
|Controller 已无 Intent|不伪造终结，仍允许回到安全生命世界|
|navigate 失败|Intent 已终结时留在安全失败状态，可再次返回|
|Storage 不可用|Controller 终结不能伪成功；不得清身份|
|身份引用变化|不得消费旧 Intent；按 identity mismatch 终结边界处理|
|Formal handoff 与 Explicit Leave 竞争|只允许一个 terminalReason 成立|

未来实现必须定义：

```text
Terminal Transaction Idempotency Key
=
intentReferenceId
+
encounterCycleId
+
intentRevision
+
terminalReason
```

不得使用按钮点击次数作为身份。

---

## 14. 身份与关系保护

两种终结均不得修改：

- `sourceReferenceId`；
- StarBeast Identity Reference；
- Mansion Coordinate Reference；
- 天地之名；
- Relationship Name；
- Recognized Identity Asset；
- Life Whisper 历史边界；
- Crystal；
- Archive。

Explicit Leave 后：

```text
Returning Identity Recovery：
PASS REQUIRED

Relationship Name Recovery：
PASS REQUIRED

Historical Pressure as Current Reality：
0

Automatic New Intent：
0
```

---

## 15. 合法消费者

### Explicit Leave

允许：

- Reality Route-level Exit Transaction；
- Route Load Error Boundary 通过类型化 callback 请求同一事务；
- Reality Host 通过类型化 callback 暴露用户动作；
- Returning Life World 作为导航目标。

禁止：

- Pressure Seed Consumer；
- Six Dimension；
- Gravity；
- AI Reflection；
- Choice；
- Crystal；
- Renderer；
- Archive；
- Recovery Storage 直接调用；
- Presentation 直接调用 Controller。

### Encounter Completed

允许：

- Reality Route formal handoff；
- SelectedPressureSeedContext writer；
- Dynamics Handoff。

禁止：

- Pressure Candidate 展示即完成；
- Host mount 即完成；
- Choice 反向完成旧 Entry；
- Crystal 终结 Entry；
- Route navigation 自行推断完成。

---

## 16. 浏览器关闭门禁

### 16.1 Explicit Leave from FAILED_RETRYABLE

```text
真实失败
↓
继续这一轮 / 这一轮先到这里
↓
选择离开
↓
Controller TERMINATED(EXPLICIT_LEAVE)
↓
返回同一生命世界
↓
刷新不恢复旧 Intent
↓
未来明确请求产生新 cycle
```

### 16.2 Explicit Leave from ACTIVE

```text
Reality Active
↓
Candidate 尚未认出
↓
这一轮先到这里
↓
不写 Selected Pressure
↓
不进入 Dynamics
↓
回到同一生命世界
```

### 16.3 Accepting 竞态

```text
Route 正在等待 Surface Outcome
↓
用户明确离开
↓
旧 Outcome 晚到
↓
ACTIVE：
0
```

### 16.4 Encounter Completed

```text
Reality Active
↓
用户认出 Candidate
↓
身体回应
↓
正式 Handoff
↓
TERMINATED(ENCOUNTER_COMPLETED)
↓
Selected Context 与 Dynamics 成立
```

### 16.5 身份保护

两条路径均必须证明：

- 同一身份不变；
- Relationship Name 不变；
- Explicit Leave 不生成 Pressure；
- Encounter Completed 只传递当前用户认出的 Pressure；
- 无第二 cycle；
- 无第二 Controller。

---

## 17. 工程影响判断

未来实现可能影响：

- `RealityProductionRouteEntry`；
- Reality Route Error Boundary；
- `RealityProductionHost`；
- `RealityPressureSeedPresentation` 的 callback / UI 组合；
- Activation Source 精确清理；
- 直接相关类型与门禁。

不应影响：

- Intent 状态模型；
- Recovery schema；
- Genesis；
- Returning Life Whisper；
- Relationship Naming；
- Candidate Source；
- Pressure Seed 内容；
- Six Dimension；
- Gravity；
- Choice；
- Crystal；
- Renderer。

刀型判断：

```text
不是 Refinement

原因：
新增正式用户事件消费者，
并增加 Route-level terminal transaction。

不是 Migration

原因：
不替换现有 Controller，
不替换现有 Route，
不形成新旧双权威。

正确刀型：
Major Blade
```

实施前仍需 Major Blade Prep，冻结：

- callback 契约；
- transaction 顺序；
- terminal race；
- Activation Source 清理；
- navigation failure；
- Route Error Boundary 接入；
- 单提交回滚。

---

## 18. Acceptance Harness 关系

Harness 不再负责伪造 Explicit Leave。

正确顺序：

```text
Explicit Leave Product Boundary MAP
↓
Explicit Leave Major Blade Prep
↓
Runtime 实施与真实 UI
↓
Acceptance Harness Infrastructure
↓
负向浏览器矩阵
↓
Delivery Closure Audit
```

Harness 可以：

- 点击真实“这一轮先到这里”；
- 记录 terminalReason；
- 验证 Recovery 不恢复旧 Intent；
- 验证新周期不同。

Harness 不可以：

- 直接调用 Controller；
- 注入 terminalReason；
- 增加测试专用退出按钮。

---

## 19. 交通灯扫描

### 绿色

```text
ENCOUNTER_COMPLETED 当前唯一生产者：
KEEP

Controller Terminal Reasons：
KEEP

Pressure Seed Pause：
KEEP AS PAUSE
```

### 黄色

```text
Explicit Leave Product Consumer：
Major Blade Prep Required

Encounter Completed Activation Cleanup：
Prep 中复验

Route Error Boundary Exit：
Prep 中冻结
```

### 红色

```text
Controller Migration：
NOT REQUIRED

第二 Exit Runtime：
REJECT

将浏览器生命周期解释为离开：
REJECT
```

---

## 20. 最终状态

```text
Explicit Leave Product Requirement：
ACCEPTED

Explicit Leave Runtime Consumer：
NOT ESTABLISHED

Encounter Completed Runtime Consumer：
ESTABLISHED

Acceptance Harness Implementation：
DEFER

RealityEncounterIntent Delivery：
OPEN

Phase 2：
CLOSED

Phase 3：
LOCKED
```

---

## 21. 下一刀建议

```text
XINMAI-REALITY-EXPLICIT-LEAVE-TERMINATION-MAJOR-BLADE-PREP-P0
```

刀型：

```text
Major Blade Prep
```

决策：

```text
NOW — PREP ONLY
```

唯一目标：

> 冻结一个由 Route 拥有、Controller 唯一终结、精确清理 Activation Source、保留身份与关系、可独立回滚的 Explicit Leave Transaction，并完成 Route Error Boundary 与 Active Reality 的 UI 接入设计。
