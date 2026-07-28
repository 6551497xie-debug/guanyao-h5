# XINMAI Reality Explicit Leave Termination Delivery Closure Audit P0

## 0. Audit State Card

任务：

```text
XINMAI-REALITY-EXPLICIT-LEAVE-TERMINATION-DELIVERY-CLOSURE-AUDIT-P0
```

刀型：

```text
MAP / Independent Closure Audit
```

决策：

```text
NOW — MAP ONLY
```

Runtime 修改：

```text
0
```

审计基线：

```text
Branch:
codex/genesis-28-mansion-production-continuity

Commit:
e56a5b44553ae2efb8189f26e5f78cebaf494900

Remote HEAD:
e56a5b44553ae2efb8189f26e5f78cebaf494900
```

当前阶段：

```text
Phase 2:
CLOSED

Phase 3:
LOCKED
```

本刀唯一目标：

> 独立复验“这一轮先到这里”是否形成单一、真实、可恢复的终结因果，并裁决 Explicit Leave Delivery 能否关闭。

---

## 1. 审计依据

上游冻结：

- `XINMAI_REALITY_EXPLICIT_LEAVE_AND_ENCOUNTER_COMPLETION_CONSUMER_BOUNDARY_MAP_P0`
- `XINMAI_REALITY_EXPLICIT_LEAVE_TERMINATION_MAJOR_BLADE_PREP_P0`
- `XINMAI_REALITY_ENCOUNTER_INTENT_AUTHORITY_MAJOR_BLADE_PREP_P0`

交付提交：

```text
feat(reality): add explicit encounter leave transaction
```

证据等级：

```text
✓ 真实浏览器行为
△ 自动 Runtime 门禁
◇ 源码结构
○ 协议声明
```

关闭审计不把协议目标、源码字符串或单条成功路径替代为完整 Runtime 证据。

---

## 2. 产品语义复验

正式语义保持：

```text
暂时停在这里
≠
这一轮先到这里
```

### `PRESSURE_SEED_PAUSE`

表示：

> 当前仍在同一个 Reality Encounter 中，现实暂时停在远处。

它不：

- 终结 Intent；
- 清除 Activation；
- 清除 Recovery；
- 返回生命世界。

### `EXPLICIT_LEAVE`

表示：

> 用户明确选择结束当前 Reality Encounter，并回到同一生命世界。

它不：

- 代表 Encounter Completed；
- 代表成长完成；
- 写入 Pressure Seed；
- 进入 Dynamics；
- 产生 Choice 或 Crystal。

审计结论：

```text
产品语义：
PASS
```

真实浏览器中，两项操作同时存在且行为不同。

---

## 3. 单一权威链复验

当前合法链：

```text
用户点击“这一轮先到这里”
↓
Presentation / Host 只传递 typed callback
↓
Reality Route 捕获不可变 Request
↓
RealityProductionRouteRuntime 成为唯一事务调用者
↓
RealityExplicitLeaveTerminationTransaction
↓
校验 Intent / Cycle / Revision / Identity
↓
精确读取并清理 Activation
↓
Controller strict terminate(EXPLICIT_LEAVE)
↓
Recovery clear CONFIRMED
↓
Controller 返回 TERMINATED
↓
Route Runtime 请求返回 /launch-lab
```

唯一权威：

|责任|当前所有者|审计|
|-|-|-|
|用户终结请求|Reality UI|PASS|
|终结事务调用|RealityProductionRouteRuntime|PASS|
|Activation 精确清理|RealityExplicitLeaveTerminationTransaction|PASS|
|Intent 终结|RealityEncounterIntent Controller|PASS|
|Recovery 存储清理|Recovery Adapter|PASS|
|导航|Route Runtime|PASS|
|Host / Presentation|Callback only|PASS|

源码与行为门禁确认：

```text
Explicit Leave Production Consumer:
1

Explicit Leave Transaction Caller:
1

Controller Termination Authority:
1

Recovery Writer:
1

Host Termination Authority:
0

Presentation Termination Authority:
0

Renderer Consumer:
0
```

审计结论：

```text
单一终结权威：
PASS
```

---

## 4. Strict Termination Truth

Controller 接收严格命令：

```text
intentReferenceId
encounterCycleId
expectedIntentRevision
identityReferences
terminalReason
```

只有全部一致才允许继续。

Recovery clear 结果：

```text
CONFIRMED
→ TERMINATED

UNAVAILABLE / UNCONFIRMED
→ TERMINATION_RETRYABLE
→ 保持当前 Intent
```

不再存在：

```text
Recovery 未确认清除
↓
Controller 仍宣称 TERMINATED
```

证据：

|场景|证据|结果|
|-|-|-|
|Confirmed clear|自动 Runtime 门禁|PASS|
|Recovery unavailable|自动 Runtime 门禁|PASS|
|Recovery unconfirmed|源码同分支语义，缺独立行为样例|PARTIAL|
|旧周期请求|自动 Runtime 门禁|PASS|
|Activation mismatch|自动 Runtime 门禁|PASS|
|重复旧请求|自动 Runtime 门禁|PASS|

审计结论：

```text
Controller termination truth:
PASS

完整负向证据:
PARTIAL
```

---

## 5. Activation Cleanup Truth

Activation clear 已从布尔值升级为：

```text
CLEARED
ALREADY_ABSENT
MISMATCH
```

规则：

```text
CLEARED / ALREADY_ABSENT
→ 可以继续 strict termination

MISMATCH
→ 停止
→ 不清除其他周期 Activation
→ 不终结当前 Intent
```

自动 Runtime 门禁确认：

- 当前 Admission Activation 可精确清除；
- Activation 已不存在可以同周期重试；
- Foreign Activation 返回 mismatch；
- Foreign Activation 不被 blanket clear；
- 当前 Intent 不被伪终结。

审计结论：

```text
Activation typed truth:
PASS

Activation blanket clear:
0
```

---

## 6. 状态覆盖审计

|Intent 状态|入口是否存在|行为证据|审计|
|-|-|-|-|
|`READY_TO_ENTER_REALITY`|源码存在|无独立行为样例|PARTIAL|
|`ACCEPTING_REALITY`|存在|自动 Runtime 门禁|PASS|
|`FAILED_RETRYABLE`|Route retryable surface 存在|无真实浏览器失败样例|PARTIAL|
|`RECOVERING`|通用非 Terminal 合同允许|无独立行为样例|PARTIAL|
|`ACTIVE_IN_REALITY`|Active candidate surface 存在|真实浏览器|PASS|
|`TERMINAL / ABSENT`|不再终结|自动门禁 + 真实浏览器 direct URL|PASS|

当前实现不是只支持 Active，但关闭证据尚未覆盖 Prep 冻结的全部状态矩阵。

---

## 7. UI Consumer Audit

### Route Load Error Boundary

源码已提供：

```text
继续这一轮
+
这一轮先到这里
```

有当前 Intent：

```text
走 strict Explicit Leave transaction
```

无当前 Intent：

```text
只做安全导航
不宣称终结成功
```

审计：

```text
源码结构：
PASS

真实 Route Load Error 浏览器证据：
MISSING
```

### Source Not Ready / Retryable Surface

源码已提供：

```text
继续这一轮
这一轮先到这里
回到生命世界（仅无当前 Intent）
```

审计：

```text
源码结构：
PASS

FAILED_RETRYABLE 浏览器证据：
MISSING
```

### Active Candidate Surface

真实浏览器确认：

```text
暂时停在这里
+
这一轮先到这里
```

点击暂停后：

```text
仍在 /reality
现实暂时停在远处
Explicit Leave 仍可独立触发
```

点击明确离开后：

```text
返回 /launch-lab
```

审计：

```text
PASS
```

---

## 8. 真实浏览器路径

### Path A｜Direct URL without Intent

```text
/reality
↓
SOURCE_NOT_READY
↓
回到生命世界
↓
/launch-lab
```

结果：

- 未展示伪终结成功；
- 未生成当前 Encounter；
- 未进入 Dynamics。

```text
PASS
```

### Path B｜Active Explicit Leave

```text
返回同一生命
↓
Life Whisper 明确暂时不说
↓
进入新的 Reality
↓
候选表面出现
↓
这一轮先到这里
↓
返回同一生命空间
```

```text
PASS
```

### Path C｜Pause Is Not Leave

```text
暂时停在这里
↓
仍在 /reality
↓
现实暂时停在远处
↓
Explicit Leave 仍然独立存在
```

```text
PASS
```

### Path D｜No Old Encounter Resurrection

```text
Explicit Leave
↓
返回生命空间
↓
再次直接进入 /reality
↓
SOURCE_NOT_READY
```

旧 Encounter 未恢复。

```text
PASS
```

### Path E｜Refresh Recovery

```text
ACTIVE Reality
↓
刷新
↓
同一 Reality 恢复
↓
候选表面重新出现
↓
Explicit Leave
↓
返回生命空间
```

```text
PASS
```

### Path F｜Browser Back

终结导航使用 replace。

浏览器后退未恢复已终结 Reality，返回空历史入口。

```text
PASS
```

### 尚缺真实浏览器证据

```text
Recovery UNAVAILABLE / UNCONFIRMED
Activation MISMATCH
旧周期 callback 晚到
Route Load Error
FAILED_RETRYABLE
双击 / 连续点击
终结成功后的导航失败
```

自动门禁不能替代这些被 Prep 明确要求的浏览器证据。

---

## 9. Navigation Delivery Truth

当前代码：

```text
TERMINATED_AND_LEFT
↓
navigate("/launch-lab", { replace: true })
↓
函数返回
```

当前没有单独表达：

```text
TERMINATION_CONFIRMED
+
NAVIGATION_PENDING / NAVIGATION_RETRYABLE
```

若终结已经确认，但目标导航没有实际交付：

- `explicitLeaveInFlightRef` 仍保持占用；
- UI 仍处于 `PENDING`；
- 没有纯导航重试入口；
- 不能在不再次触发终结语义的情况下恢复交付。

这不破坏 Controller 终结事实，但违反 Major Prep 已冻结的导航失败要求：

> 终结事实已成立时，不恢复旧 Intent，只提供“回到生命世界”的纯导航重试。

审计结论：

```text
Termination Commit Truth:
PASS

Post-termination Navigation Delivery Truth:
FAIL
```

这是关闭阻断，不在本审计中修复。

---

## 10. Failure, Retry and Race Matrix

|场景|当前证据|事实性|关闭状态|
|-|-|-|-|
|Recovery unavailable|自动 Runtime|保持 Intent，可同周期重试|PASS|
|Recovery unconfirmed|源码分支|未单独运行|PARTIAL|
|Activation mismatch|自动 Runtime|不清他人、不终结|PASS|
|旧周期请求|自动 Runtime|拒绝旧请求、保持新周期|PASS|
|重复旧请求|自动 Runtime|返回 no active|PASS|
|晚到 Host Outcome|Controller 既有 stale gate|未与 Leave 做浏览器竞态|PARTIAL|
|双击|in-flight guard + disabled UI|无真实行为证据|PARTIAL|
|普通卸载|无 lifecycle termination consumer|不自动离开|PASS|
|刷新|真实浏览器|同一 ACTIVE 恢复|PASS|
|Route Load Error|源码 Error Boundary|无真实浏览器证据|PARTIAL|
|导航失败|无独立 delivery state|无法真实重试|FAIL|

---

## 11. Forbidden Consumer Audit

Explicit Leave Transaction 未消费：

```text
Pressure Seed
SelectedPressureSeedContext
Six Dimension
Gravity
AI Reflection
Choice
Crystal
Archive
Renderer
Dynamics
```

Presentation 与 Host：

```text
Callback only
```

Route Runtime：

```text
终结事务 + 成功后导航
```

源码搜索与自动门禁未发现：

- 第二 Intent Controller；
- 第二 Recovery Writer；
- Renderer 读取关系终结状态；
- DOM `data-*` 作为终结 Runtime 输入；
- 普通 cleanup 被解释为 Explicit Leave；
- `navigate()` 被 Controller 当作终结提交点；
- Explicit Leave 写入 Selected Pressure；
- Explicit Leave 进入 Dynamics。

审计结论：

```text
Forbidden Consumers:
CLEAR
```

---

## 12. Asset Protection

### World

- 黑曜生命空间保持；
- Reality 主体未被独立终结页替换；
- Explicit Leave 为克制次级动作。

```text
PASS
```

### Identity

终结事务不修改：

- `sourceReferenceId`；
- StarBeast Identity Reference；
- Mansion Coordinate Reference；
- 天地之名；
- Life Source Session。

```text
PASS
```

### Relationship

终结后真实浏览器返回：

```text
同一生命空间
同一返回关系入口
```

关系命名资产未被终结事务消费。

```text
PASS
```

### Growth

Explicit Leave 不：

- 写 Pressure；
- 触发 Gravity；
- 进入 Choice；
- 形成 Crystal；
- 写 Archive。

```text
PASS
```

---

## 13. Build and Gate Evidence

审计基线：

```text
Remote Commit:
e56a5b44553ae2efb8189f26e5f78cebaf494900
```

结果：

```text
TypeScript:
PASS

Production Build:
PASS

XINMAI Checks:
34 / 34 PASS

Explicit Leave Runtime Gate:
PASS

New Failures:
0
```

Build 仅保留既存大分包提示。

全量发布门禁仍有一项既存失败：

```text
[MOTHER CONTEXT PERSISTENCE SEMANTICS] FAIL

Launch persists adapter-owned origin context
missing =
writeOriginMotherContext(motherHandoff.originMotherContext)
```

该失败：

- 早于本刀存在；
- 不属于 Reality Explicit Leave；
- 不由本刀修复；
- 不构成本刀新增失败；
- 继续进入独立门禁治理。

---

## 14. Closure Gates

|门禁|结果|
|-|-|
|Explicit Leave Production Consumer = 1|PASS|
|Explicit Leave Transaction Owner = 1|PASS|
|Controller Termination Authority = 1|PASS|
|Recovery Writer = 1|PASS|
|Recovery false success = 0|PASS|
|Activation blanket clear = 0|PASS|
|Old-cycle termination = 0|PASS|
|Route cleanup as Explicit Leave = 0|PASS|
|Navigate as Controller termination success = 0|PASS|
|Pressure / Growth side effects = 0|PASS|
|Renderer consumer = 0|PASS|
|Second Intent Controller = 0|PASS|
|TypeScript|PASS|
|Production Build|PASS|
|XINMAI checks|PASS|
|Active browser success|PASS|
|Refresh and no-resurrection browser paths|PASS|
|Browser failure / retry / race matrix|PARTIAL|
|Post-termination navigation delivery truth|FAIL|
|New failures = 0|PASS|
|Remote baseline reproducible|PASS|

---

## 15. Independent Closure Verdict

正式裁决：

```text
Reality Explicit Leave Product Meaning:
PASS

Reality Explicit Leave Runtime Authority:
ESTABLISHED

Reality Explicit Leave Core Termination Transaction:
PASS

Reality Explicit Leave Delivery:
OPEN
```

不能关闭的原因：

```text
1.
终结成功后的导航交付没有独立权威状态与纯导航重试。

2.
Prep 冻结的浏览器级失败、重试与竞态矩阵尚未形成完整证据。
```

这两个缺口不否定核心终结事务，也不授权回滚已成立能力。

---

## 16. Traffic Light

### Green

```text
补齐 Recovery UNCONFIRMED 独立行为门禁
补齐 identity / revision mismatch 行为门禁
补齐双击幂等行为门禁
```

这些可以进入窄测试刀，但不能替代导航交付缺口。

### Yellow

```text
Post-termination Navigation Delivery Truth
→ MAP / Major Blade Prep

Browser Negative-path Acceptance Harness
→ MAP / Harness Prep

ENCOUNTER_COMPLETED terminal / Activation / Selected Context / navigate atomicity
→ 独立 MAP

Pressure Presentation / Gravity stage semantic gate
→ 独立 MAP
```

### Red

```text
第二 Explicit Leave Runtime:
REJECT

Host / Presentation / Renderer 成为终结权威:
REJECT

借本审计进入 Phase 3:
REJECT
```

本审计未发现需要推翻当前 Intent Controller 的新红灯。

---

## 17. Next Blade Recommendation

下一刀：

```text
XINMAI-REALITY-EXPLICIT-LEAVE-NAVIGATION-DELIVERY-TRUTH-MAJOR-BLADE-PREP-P0
```

刀型：

```text
MAP / Major Blade Prep
```

主 Layer：

```text
Reality Route Terminal Delivery
```

决策：

```text
NOW — PREP ONLY
```

唯一目标：

> 冻结“Controller 已确认终结，但返回生命空间尚未交付”时的权威状态、纯导航重试、失败降级、UI 消费者、提交边界与回滚单位。

禁止：

- 再次终结旧 Intent；
- 恢复已终结 Encounter；
- 新增第二 Controller；
- 修改 Pressure Seed；
- 修改 Dynamics；
- 解锁 Phase 3；
- 顺带实施浏览器 Harness；
- 顺带修复 ENCOUNTER_COMPLETED 原子性。

完成 Prep 后，再申请窄 Major；Major 完成后重新执行本 Closure Audit。

---

## 18. Final State

```text
Phase 2:
CLOSED

RealityEncounterIntent Runtime Authority:
ESTABLISHED

Explicit Leave Core Transaction:
ESTABLISHED

Explicit Leave Delivery:
OPEN

Phase 3:
LOCKED
```

本审计没有修改 Runtime，没有吞入新问题，也没有将成功路径虚报为完整交付关闭。
