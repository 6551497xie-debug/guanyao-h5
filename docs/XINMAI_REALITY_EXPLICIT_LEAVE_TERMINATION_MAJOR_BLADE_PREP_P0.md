# XINMAI Reality Explicit Leave Termination Major Blade Prep P0

## 0. Construction State Card

任务：

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

Runtime 修改：

```text
0
```

当前状态：

```text
Phase 2：
CLOSED

RealityEncounterIntent Runtime Authority：
ESTABLISHED

RealityEncounterIntent Delivery：
OPEN

Phase 3：
LOCKED
```

本刀唯一目标：

> 冻结用户明确结束当前 Reality Encounter 的唯一原子事务、真实失败语义、UI 接入、门禁、提交边界与回滚单位。

本刀不：

- 新增按钮；
- 修改 Controller；
- 修改 Route；
- 修改 Host；
- 修改 Recovery；
- 修改 Pressure Seed；
- 修改 Dynamics；
- 解锁 Phase 3。

---

## 1. 上游裁决

上游：

```text
XINMAI-REALITY-EXPLICIT-LEAVE-AND-ENCOUNTER-COMPLETION-CONSUMER-BOUNDARY-MAP-P0
```

已冻结：

```text
EXPLICIT_LEAVE 产品语义：
REQUIRED

EXPLICIT_LEAVE Controller 语义：
EXISTS

EXPLICIT_LEAVE Production Consumer：
MISSING

ENCOUNTER_COMPLETED Production Consumer：
EXISTS
```

两种终结不是别名：

```text
EXPLICIT_LEAVE
=
用户结束尚未正式 handoff 的当前 Reality Encounter

ENCOUNTER_COMPLETED
=
当前 Reality 已被认出并正式交给 Dynamics
```

本 Prep 不重新讨论“是否需要离开”，只回答：

> 如何在不制造伪终结、半事务、第二权威或成长副作用的前提下实现它。

---

## 2. 当前 Runtime 事实

### 2.1 已有终结能力

现有 Controller：

```text
terminateRealityEncounter(reason)
```

支持：

```text
EXPLICIT_LEAVE
ENCOUNTER_COMPLETED
```

但当前实现顺序是：

```text
nextIntent(TERMINAL)
↓
尝试清除 Recovery Candidate
↓
忽略 clear outcome
↓
currentIntent = null
↓
返回 TERMINATED
```

当前 `Recovery Adapter` 的真实清除结果有：

```text
CONFIRMED
UNAVAILABLE
UNCONFIRMED
```

因此当前存在真实性缺口：

```text
Recovery 未确认清除
↓
Controller 仍报告 TERMINATED
```

裁决：

```text
当前 termination success：
NOT STRICT ENOUGH
```

### 2.2 Activation Source

现有精确清理：

```text
clearRealityRouteActivationSourceContextForAdmission(admission)
```

当前返回值：

```text
boolean
```

它无法区分：

```text
ALREADY_ABSENT
IDENTITY_OR_CYCLE_MISMATCH
```

两者不能拥有相同产品结果：

- 已不存在：可以继续终结；
- 指向其他 admission：必须拒绝清除并停止事务。

裁决：

```text
Activation clear outcome：
NEEDS TYPED TRUTH
```

### 2.3 当前生产 UI

当前存在：

```text
Reality Route retryable：
继续这一轮

Route Load Boundary：
继续这一轮

SOURCE_NOT_READY 非 retryable：
回到生命世界（仅 navigate）

Candidate Presentation：
暂时停在这里（PRESSURE_SEED_PAUSE）
```

当前不存在：

```text
用户明确请求 EXPLICIT_LEAVE
↓
Route 终结事务
↓
确认成功后返回同一生命世界
```

### 2.4 当前 Formal Completion

当前唯一合法生产者：

```text
RealityProductionRouteEntry.continueToGravity(...)
```

当前顺序：

```text
terminate ENCOUNTER_COMPLETED
↓
write SelectedPressureSeedContext
↓
navigate /dynamics
```

已确认：

- 生产者唯一；
- 产品语义正确；
- 未精确清除 Activation Source；
- SelectedPressureSeedContext writer 对持久化失败采用静默内存 handoff；
- 完成事务与 Explicit Leave 不是同一个下游事务。

本刀对它的裁决：

```text
保留产品语义：
YES

共用严格 Controller termination truth：
YES

把 Dynamics handoff 重做吞入 Explicit Leave：
NO

Activation cleanup / handoff 原子性：
YELLOW — SEPARATE GOVERNANCE
```

该黄灯不阻断本 Prep，也不得顺带进入后续 Explicit Leave 实施提交。

---

## 3. 产品语义冻结

### 3.1 用户动作

正式动作：

```text
这一轮先到这里
```

它表达：

- 用户主动结束本轮 Reality Encounter；
- 本轮没有形成正式 Reality handoff；
- 当前未完成不是失败；
- 用户回到同一生命世界；
- 未来可主动开始新一轮。

它不表达：

- 放弃生命；
- 清除关系；
- 删除历史；
- Reality 已完成；
- Pressure Seed 已确认；
- Choice 已完成；
- Crystal 已生成；
- 用户退出登录。

### 3.2 与“暂时停在这里”的区别

```text
暂时停在这里
=
PRESSURE_SEED_PAUSE
=
仍留在当前 Encounter
```

```text
这一轮先到这里
=
EXPLICIT_LEAVE
=
正式终结当前 Encounter
```

禁止：

- 复用同一个 callback；
- 复用同一个 event；
- 用文案差异掩盖同一行为；
- 把 pause 自动升级为 leave；
- 把 leave 记录为 completed。

---

## 4. 权威所有者

冻结：

```text
用户意图生产者：
真实 Explicit Leave UI Action

Terminal Transaction Owner：
Reality Route Runtime Boundary

Intent State Authority：
RealityEncounterIntent Controller

Recovery Reader / Writer：
RealityEncounterIntent Recovery Adapter

Activation Source Owner：
Reality Route Activation Source Context

Navigation Owner：
Reality Route Runtime Boundary
```

Presentation 与 Host 只能：

```text
向上发出 typed explicit-leave request
```

它们不得：

- 调用 Controller；
- 读写 Recovery；
- 清 Activation Source；
- 导航；
- 设置 `TERMINAL`；
- 推断用户已经离开。

Renderer：

```text
零消费者
```

---

## 5. Typed Explicit Leave Contract

未来实施必须建立一个类型化请求，最小语义为：

```ts
type RealityExplicitLeaveRequest = Readonly<{
  intentReferenceId: string;
  encounterCycleId: string;
  intentRevision: number;
  sourceReferenceId: string;
  routeTarget: "/reality";
  terminalReason: "EXPLICIT_LEAVE";
}>;
```

以上是 transaction identity，不是新的持久化模型。

幂等键：

```text
intentReferenceId
+
encounterCycleId
+
intentRevision
+
terminalReason
```

禁止使用：

- 点击次数；
- DOM 节点；
- route mount 次数；
- `sourceReferenceId` 单独值；
- 当前 URL；
- Pressure Seed reference；
- Relationship Name。

### 5.1 Route-level result

未来 Route transaction 必须至少区分：

```text
TERMINATED_AND_LEFT
TERMINATION_RETRYABLE
STALE_REQUEST_REJECTED
NO_ACTIVE_ENCOUNTER
```

这些结果是 UI 消费事实，不是新 Intent 状态。

### 5.2 Controller command

现有：

```text
terminateRealityEncounter(reason)
```

必须升级为携带预期事实的严格命令：

```text
intentReferenceId
encounterCycleId
expectedIntentRevision
sourceReferenceId
terminalReason
```

Controller 必须拒绝：

- 当前 Intent 不存在；
- cycle 不一致；
- revision 不一致；
- identity 不一致；
- 已由另一 terminal reason 获胜；
- Recovery clear 未确认。

旧页面晚到的点击不得终结新周期。

---

## 6. 严格 Controller Termination Truth

### 6.1 成功定义

`TERMINATED` 只有在以下全部成立时可返回：

```text
当前 Intent 与请求完全匹配
+
Terminal candidate 只在内存中组装
+
Recovery clear outcome = CONFIRMED
+
Controller currentIntent 被清除
```

禁止：

```text
先把 TERMINAL 写成当前权威
↓
清理失败
↓
仍返回成功
```

### 6.2 推荐 Controller 结果

最小结果集合：

```text
TERMINATED
NOT_ACTIVE
REJECTED_STALE
TERMINATION_RETRYABLE
```

推荐原因：

```text
NO_CURRENT_INTENT
INTENT_REFERENCE_MISMATCH
ENCOUNTER_CYCLE_MISMATCH
INTENT_REVISION_MISMATCH
IDENTITY_MISMATCH
TERMINAL_REASON_CONFLICT
RECOVERY_CLEAR_UNAVAILABLE
RECOVERY_CLEAR_UNCONFIRMED
```

### 6.3 清理失败

当 Recovery 返回：

```text
UNAVAILABLE
或
UNCONFIRMED
```

必须：

- 不返回 `TERMINATED`；
- 不把 `currentIntent` 置空；
- 不导航；
- 不生成新 cycle；
- 不清身份；
- 不伪造“已回到生命世界”；
- 保留同周期重试资格。

UI 只展示：

> 这一轮还没有完整停下，可以再试一次；你仍然在同一生命空间里。

不得展示：

- 已退出；
- 已结束；
- 已清除；
- 新一轮已开始。

---

## 7. Typed Activation Clear Outcome

未来精确清理必须返回：

```text
CLEARED
ALREADY_ABSENT
MISMATCH
```

语义：

|Outcome|含义|事务处理|
|-|-|-|
|`CLEARED`|当前 admission 的 Activation 已精确清除|继续|
|`ALREADY_ABSENT`|不存在 Activation Source|继续|
|`MISMATCH`|存在其他 admission/cycle/revision 的 Activation|拒绝，不清除|

禁止：

- blanket clear；
- 把 `false` 同时解释为已不存在和失配；
- 清除其他周期后继续；
- 普通 cleanup 调用该事务；
- Host 或 Presentation 调用该清理。

---

## 8. Explicit Leave 原子事务

### 8.1 唯一合法顺序

冻结：

```text
用户点击“这一轮先到这里”
↓
Route 捕获不可变 transaction identity
↓
重新读取当前 Intent
↓
校验 intent / cycle / revision / identity / route
↓
读取当前 Activation Source
↓
精确清理当前 Activation Source
  ├── CLEARED / ALREADY_ABSENT → 继续
  └── MISMATCH → 停止并展示真实失败
↓
Controller strict terminate(EXPLICIT_LEAVE)
  ├── Recovery CONFIRMED → TERMINATED
  └── Recovery 未确认 → 保持当前 Intent，允许同周期重试
↓
只有 TERMINATED 后
navigate("/launch-lab", { replace: true })
↓
恢复同一身份与同一关系
```

### 8.2 为什么先清 Activation

若先终结 Intent，再发现 Activation 无法清除：

```text
Intent 已终结
+
Activation 仍残留
=
不可安全回滚的半终结
```

因此冻结：

```text
Activation exact clear
↓
strict Controller termination
```

当 Activation 已清而 Recovery clear 未确认时：

- Controller 仍保持当前 Intent；
- 不宣布离开；
- Route 可用同一 cycle / revision 重建 Activation；
- 用户可以重试终结或继续当前周期；
- 不会残留“已终结 Intent + 活跃 Activation”的危险组合。

### 8.3 成功提交点

```text
Controller strict termination = TERMINATED
```

它已经以 Recovery clear confirmed 为前提。

导航不是提交点。

### 8.4 导航失败

若终结已确认但导航失败：

- 不恢复旧 Intent；
- 不生成新 Intent；
- 不伪造 ACTIVE；
- 保留同一安全生命空间表面；
- 提供“回到生命世界”的纯导航重试；
- 导航重试不得再次终结其他 cycle。

此时：

```text
终结事实已成立
导航交付尚未完成
```

---

## 9. 状态覆盖

|当前 Intent|允许 Explicit Leave|要求|
|-|-|-|
|`READY_TO_ENTER_REALITY`|YES|无 Activation 时按 `ALREADY_ABSENT` 继续|
|`ACCEPTING_REALITY`|YES|精确清理 Activation，拒绝晚到 Surface Outcome|
|`RECOVERING`|YES|身份与周期校验通过后终结|
|`FAILED_RETRYABLE`|YES|与 same-cycle retry 并列|
|`ACTIVE_IN_REALITY`|YES|不得写 Selected Pressure，不得进入 Dynamics|
|`TERMINAL`|NO NEW TERMINATION|幂等返回，不影响其他周期|
|`ABSENT`|NO CURRENT INTENT|只允许纯安全导航，不伪造离开成功|

### 9.1 用户连点

第一次请求获得 in-flight transaction。

后续同键请求：

```text
复用 pending / confirmed result
```

不得：

- 再次推进 revision；
- 再次清其他 Activation；
- 生成新 cycle；
- 触发双导航；
- 产生两个 terminal reason。

### 9.2 Leave 与 Active Outcome 竞争

唯一允许：

```text
Controller 当前事实决定一个获胜者
```

若 Leave 先完成：

```text
晚到 Outcome → REJECT
```

若 Active 先完成：

```text
用户仍可从 ACTIVE 明确 Leave
```

不得同时记录：

```text
ACTIVE success
+
另一个周期的 leave success
```

---

## 10. UI 接入冻结

### 10.1 Route Load Error Boundary

必须提供：

```text
继续这一轮
+
这一轮先到这里
```

接入方式：

```text
RealityProductionRouteRuntime
↓ typed callback
RealityRouteLoadBoundary
```

Class Boundary 不直接：

- 读取 Recovery；
- 清 Activation；
- 调 Controller termination；
- 导航；
- 自行声明成功。

### 10.2 Route retryable surface

必须提供：

```text
继续这一轮
+
这一轮先到这里
```

当前仅导航的“回到生命世界”必须分流：

- 有当前合法 Intent：走严格 Explicit Leave transaction；
- 无当前 Intent：只走安全导航，并明确不宣称终结。

### 10.3 Active Candidate surface

允许在克制位置增加：

```text
这一轮先到这里
```

要求：

- 与“暂时停在这里”分开；
- 不遮挡生命主体；
- 不是主按钮；
- 不使用危险/失败视觉；
- pending 时防止重复提交；
- 失败时可重试；
- Reality 其他交互不因一次非终结失败永久锁死。

接入链：

```text
Presentation
↓ onExplicitLeaveRequest
Host
↓ onExplicitLeaveRequest
Route
↓ strict terminal transaction
```

Host 和 Presentation 只传递用户请求。

### 10.4 文案状态

Pending：

```text
正在让这一轮安静下来。
```

Retryable：

```text
这一轮还没有完整停下，可以再试一次。
```

Confirmed：

不展示庆祝，不展示“任务结束”；直接回到同一生命世界。

---

## 11. 失败与降级矩阵

|场景|权威结果|UI|禁止副作用|
|-|-|-|-|
|当前 Intent 不存在|`NO_ACTIVE_ENCOUNTER`|安全返回入口|不伪造 terminal|
|请求来自旧 cycle|`STALE_REQUEST_REJECTED`|保留当前世界，刷新可见事实|不终结新 cycle|
|revision 失配|`STALE_REQUEST_REJECTED`|允许重新取得当前事实|不清 Activation|
|身份引用失配|`STALE_REQUEST_REJECTED`|进入身份安全恢复|不串用其他生命|
|Activation 已不存在|继续|正常终结|不创建 Activation|
|Activation 指向其他 admission|停止|真实失败，可重新加载当前事实|不清他人上下文|
|Recovery clear unavailable|`TERMINATION_RETRYABLE`|保留当前 Intent，可重试|不导航、不宣称结束|
|Recovery clear unconfirmed|`TERMINATION_RETRYABLE`|保留最后确认事实|不导航、不清身份|
|用户连续点击|同键幂等|一个 pending / result|不双终结|
|Host Outcome 晚到|拒绝|保持离开结果|不回到 ACTIVE|
|Route 中途卸载|未确认事务取消；已确认终结保留|按恢复事实呈现|cleanup 不等于离开|
|WebGL 丢失|不是离开事件|失败/降级表面|不自动终结|
|网络或 Chunk 失败|不是离开事件|retry + explicit leave|不自动终结|
|navigate 失败|终结已确认、导航未交付|纯导航重试|不恢复旧 Intent|
|刷新|不是离开|Recovery 按现有权威恢复|不清 Intent|
|浏览器后退|不是离开|不推断用户终结|不写 terminalReason|

---

## 12. 身份、关系与成长保护

Explicit Leave 绝不修改：

- `sourceReferenceId`；
- StarBeast Identity Reference；
- Mansion Coordinate Reference；
- 天地之名；
- Relationship Name；
- Recognized Identity Asset；
- Life Whisper 原文；
- Historical Reality Memory；
- Crystal Memory；
- Archive。

Explicit Leave 绝不生产：

- Pressure Seed；
- SelectedPressureSeedContext；
- Six Dimension；
- Gravity；
- AI Reflection；
- Choice；
- Crystal；
- Dynamics Handoff。

离开后返回：

```text
同一身份
+
同一星兽
+
同一关系名（若有）
+
无当前 Reality
```

未来新 cycle 只能来自：

```text
上一 cycle 已确认终结
+
用户再次明确请求 Reality
```

---

## 13. Encounter Completed 保护边界

本 Major 实施时，严格 Controller termination result 会被现有 `ENCOUNTER_COMPLETED` 消费者共同看见。

最低兼容要求：

```text
只有 TERMINATED
↓
才允许继续 Selected Pressure / Dynamics Handoff
```

这会修复：

```text
Recovery clear 未确认
↓
仍继续 Dynamics
```

但本刀不授权：

- 重做 SelectedPressureSeedContext persistence；
- 改变 Dynamics Handoff；
- 改变 Candidate Recognition；
- 改变 Inner View；
- 把 completion 改成 leave；
- 借 Explicit Leave 重构 Phase 3。

以下单独记录为黄灯：

```text
ENCOUNTER_COMPLETED Activation Source 精确清理
+
Selected Context / Terminal / Navigate 原子关系
```

它必须独立进入：

```text
MAP / Major Blade Prep
```

不能吞入 Explicit Leave 实施。

---

## 14. 实施文件边界

预计允许修改：

```text
src/types/xinmaiRealityEncounterIntent.ts
src/services/xinmaiRealityEncounterIntentController.ts
src/types/realityRouteActivationSourceContext.ts
src/services/realityRouteActivationSourceContext.ts
src/types/realityProductionRouteEntry.ts
src/types/realityPressureSeedPresentation.ts
src/App.tsx
src/pages/RealityProductionRouteEntry.tsx
src/components/RealityProductionHost.tsx
src/components/RealityPressureSeedPresentation.tsx
直接相关检查脚本
直接相关窄样式
```

是否需要新增一个无状态、无存储的 terminal transaction helper：

```text
允许，但非必需
```

若新增，它只能：

- 接收类型化依赖；
- 编排 Route terminal transaction；
- 不成为 Controller；
- 不读 DOM；
- 不读写 Storage；
- 不拥有身份；
- 不生成 cycle；
- 可随单提交完整回滚。

禁止修改：

- Genesis；
- Returning Life Whisper；
- Relationship Naming；
- Renderer；
- Pressure Candidate Source；
- Six Dimension；
- Gravity；
- Choice；
- Crystal；
- Archive；
- TTL；
- Phase 状态。

---

## 15. 单提交与回滚

未来 Major 必须在一个提交中同时完成：

```text
严格 termination command / result
+
Recovery clear truth consumption
+
typed Activation clear
+
Route terminal transaction
+
Error Boundary callback
+
retryable / active UI entry
+
Host / Presentation typed pass-through
+
删除仅 navigate 的伪 leave 路径
+
相关行为门禁
```

禁止中间提交形成：

```text
新 Strict Termination
+
旧 UI 直接导航
```

或：

```text
新 Explicit Leave UI
+
旧 Controller 伪成功
```

回滚单位：

```text
完整 Major commit
```

回滚后必须恢复为：

- 无 Explicit Leave production consumer；
- 原 Controller 合同；
- 原 UI；
- 不残留新 callback；
- 不残留第二 transaction owner；
- 不清理任何真实身份或关系资产。

---

## 16. Runtime 验收

### A｜FAILED_RETRYABLE 离开

```text
真实失败
↓
继续这一轮 / 这一轮先到这里
↓
选择离开
↓
Activation exact clear
↓
Recovery clear confirmed
↓
TERMINATED(EXPLICIT_LEAVE)
↓
返回同一生命世界
```

验证：

- 未写 Selected Pressure；
- 未进入 Dynamics；
- 刷新不恢复旧 Intent；
- 新请求生成新 cycle。

### B｜ACTIVE 离开

```text
Reality Active
↓
Candidate 未 handoff
↓
明确离开
↓
同一身份返回
```

验证：

- 不把离开当作 completed；
- 不生成 Growth 输出；
- `PRESSURE_SEED_PAUSE` 仍保持原语义。

### C｜ACCEPTING 竞态

```text
Surface Outcome 等待中
↓
用户离开
↓
旧 Outcome 晚到
↓
ACTIVE = 0
```

### D｜Recovery clear 未确认

```text
明确离开
↓
Recovery clear = UNCONFIRMED / UNAVAILABLE
↓
TERMINATED = 0
↓
navigate = 0
↓
仍显示最后确认的当前 Intent
↓
可同周期重试
```

### E｜Activation mismatch

```text
当前请求与 Activation 不同
↓
其他 Activation 未被清除
↓
当前 Intent 未被伪终结
↓
显示真实失败
```

### F｜Route Load Error

真实浏览器验证：

```text
Route Load Error
↓
继续这一轮 / 这一轮先到这里
↓
离开走同一 Route transaction
```

### G｜重复、刷新与返回

覆盖：

- 双击；
- 连续重试；
- Strict Mode；
- Route 快速切换；
- 中途卸载；
- 刷新；
- 浏览器前进后退；
- 旧 cycle callback 晚到；
- 导航失败后的纯导航重试。

---

## 17. 关闭门禁

实施刀关闭必须证明：

```text
Explicit Leave Production Consumer：
1

Explicit Leave Transaction Owner：
1

Controller Termination Authority：
1

Recovery Writer：
1

Recovery Clear False Success：
0

Activation Blanket Clear：
0

Old-cycle Termination：
0

Route Cleanup as Explicit Leave：
0

Navigate as Termination Success：
0

Pressure / Growth Side Effects：
0

Renderer Consumer：
0

Second Intent Controller：
0
```

还必须：

- TypeScript PASS；
- Production Build PASS；
- 全量 XINMAI checks PASS；
- 直接相关行为门禁 PASS；
- 真实浏览器成功、失败、重试、竞态路径 PASS；
- 远程干净快照独立复现；
- 新增失败 0；
- 主工作树原样保留。

---

## 18. 停止条件

未来实施出现以下情况才停止并升级：

- 必须新增第二 Intent Controller；
- 必须让 Host 或 Presentation 写 Recovery；
- 必须让 Renderer 消费 leave；
- 必须修改身份模型；
- 必须写 Pressure Seed 才能离开；
- 必须形成新旧两条生产 leave 路径；
- 必须用普通卸载推断用户意图；
- 无法区分 Activation already absent 与 mismatch；
- 无法在 Recovery 未确认时保持最后权威事实；
- 无法与既存工作树安全分离。

发现其他黄灯或红灯：

```text
记录
↓
完成当前已授权刀
↓
刀后交通灯分流
```

不得顺带修复，也不得以此绕过已授权实施。

---

## 19. 交通灯扫描

### 绿色

```text
Explicit Leave 产品语义：
FROZEN

Transaction Owner：
Reality Route Runtime Boundary

Controller Authority：
KEEP

Recovery Adapter：
KEEP AS ONLY STORAGE OWNER

Pressure Seed Pause：
KEEP AS PAUSE
```

### 黄色

```text
Explicit Leave Runtime Consumer：
READY FOR MAJOR

Controller termination truth：
MUST BE NARROWLY HARDENED IN MAJOR

Activation clear outcome：
MUST BECOME TYPED IN MAJOR

ENCOUNTER_COMPLETED terminal / Activation / handoff atomicity：
SEPARATE MAP / PREP
```

### 红色

```text
第二 Exit Runtime：
REJECT

普通生命周期自动离开：
REJECT

Host / Presentation / Renderer 成为终结权威：
REJECT

借本刀迁移 Phase 3：
REJECT
```

本 Prep 未发现需要推翻当前 Intent Authority 的红灯。

---

## 20. Prep 裁决

```text
Explicit Leave Product Meaning：
FROZEN

Explicit Leave Transaction Owner：
REALITY ROUTE RUNTIME BOUNDARY

Controller Termination Truth：
STRICT CONFIRMED CLEAR REQUIRED

Activation Cleanup：
EXACT TYPED OUTCOME REQUIRED

UI Entry：
RETRYABLE + ROUTE ERROR + ACTIVE CANDIDATE

Pressure Seed Pause：
UNCHANGED

Selected Pressure / Dynamics：
FORBIDDEN FOR EXPLICIT LEAVE

Second Runtime：
0

Implementation Knife：
MAJOR

Implementation Decision：
NOW — STRICT SCOPE
```

下一刀建议：

```text
XINMAI-REALITY-EXPLICIT-LEAVE-TERMINATION-MAJOR-BLADE-P0

刀型：
Major

决策：
NOW — STRICT SCOPE
```

下一刀唯一目标：

> 让用户通过真实 UI 明确结束当前 Reality Encounter；只有 Activation 精确清理和 Recovery 清除均获得权威确认后，才终结 Intent 并回到同一生命世界。

下一刀不得吞入：

```text
ENCOUNTER_COMPLETED Handoff Atomicity
Pressure Seed
Gravity
Choice
Crystal
Acceptance Harness 扩张
```
