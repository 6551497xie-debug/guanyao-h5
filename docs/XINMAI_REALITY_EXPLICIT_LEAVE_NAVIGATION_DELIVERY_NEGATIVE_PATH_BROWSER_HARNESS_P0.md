# XINMAI Reality Explicit Leave Navigation Delivery Negative Path Browser Harness P0

## 0. Construction State Card

任务：

```text
XINMAI-REALITY-EXPLICIT-LEAVE-NAVIGATION-DELIVERY-NEGATIVE-PATH-BROWSER-HARNESS-P0
```

刀型：

```text
Major / Acceptance Test Infrastructure
```

决策：

```text
NOW — STRICT ACCEPTANCE-ONLY SCOPE
```

当前阶段：

```text
Phase 2:
CLOSED

Explicit Leave Navigation Delivery:
OPEN — PENDING INDEPENDENT CLOSURE AUDIT

Phase 3:
LOCKED
```

唯一目标：

> 为导航调用失败、watchdog、身份失配、返回生命表面不可用、旧 attempt 晚到与纯导航重试建立真实浏览器可触发、可观察、可整体移除的验收基础设施。

本刀不：

- 修改 Intent 状态机；
- 修改身份权威；
- 修改 Explicit Leave 终结权威；
- 修改 Navigation Delivery 状态机；
- 新增生产 Route；
- 新增持久化；
- 修改 Renderer；
- 接入 Pressure Seed、Six Dimension、Gravity、Choice、Crystal；
- 解锁 Phase 3。

---

## 1. Harness Architecture

冻结：

```text
Production Build
↓
中性 Navigation Delivery Runtime Port
↓
现有真实 App / Launch Runtime
```

```text
Explicit Acceptance Mode
↓
Acceptance Entry
↓
Typed Fault Port 替换中性 Runtime Port
↓
同一真实 App / Launch Runtime
↓
浏览器可见 Evidence Panel
```

Acceptance Mode：

```text
xinmai-acceptance
```

Production 与 Acceptance 的切换发生在构建解析阶段。

生产组件不读取：

- Scenario Query；
- Scenario Registry；
- Fault Plan；
- Acceptance Evidence；
- 测试 Storage；
- 测试 Clock。

---

## 2. Production Isolation

普通：

```text
npm run build
```

产物检查结果：

```text
Acceptance Scenario Registry:
0

Acceptance Query Consumer:
0

Acceptance Evidence Event:
0

Acceptance Navigation Failure:
0
```

只有显式：

```text
npm run dev:xinmai-explicit-leave-acceptance
```

或：

```text
npm run build:xinmai-explicit-leave-acceptance
```

才加载：

- Acceptance Entry；
- Scenario Registry；
- Typed Fault Port；
- Evidence Panel。

生产 URL 上追加验收参数不会激活 Fault Port。

---

## 3. Frozen Scenarios

```text
NAVIGATION_INVOCATION_FAILS_ONCE
```

第一 attempt 的导航调用真实抛错；App 只进入 `NAVIGATION_RETRYABLE`。

```text
WATCHDOG_SUPPRESSES_FIRST_OUTCOME
```

第一 attempt 的 typed Launch outcome 不交付给 App；真实 8 秒 watchdog 只进入 `NAVIGATION_RETRYABLE`。

```text
IDENTITY_MISMATCH_ON_FIRST_ATTEMPT
```

第一 attempt 只投影错误的 StarBeast 身份引用副本；Launch 真实拒绝，不修改权威身份。

```text
RETURNING_SURFACE_UNAVAILABLE_ON_FIRST_ATTEMPT
```

第一 attempt 将返回生命表面能力投影为不可用；Launch 报告 typed unavailable。

```text
STALE_ATTEMPT_PRECEDES_CURRENT_OUTCOME
```

第一 attempt 先进入可重试；第二 attempt 先收到旧 attempt outcome，再收到当前 attempt typed outcome。

Scenario：

- 只在当前 acceptance 页面生命周期存在；
- 不写 `localStorage`；
- 不写 `sessionStorage`；
- 不生成 identity；
- 不生成 Intent；
- 不生成 delivery ticket；
- 不直接写 Controller；
- 不直接提交成功。

---

## 4. Real Browser Evidence

验收环境：

```text
Vite xinmai-acceptance
http://127.0.0.1:5193
React Strict Mode
真实 Genesis → Reality → Explicit Leave → Launch 路径
```

### 4.1 Navigation invocation failure

真实可见链：

```text
REALITY_EXPLICIT_LEAVE
↓
#1 NAVIGATION_INVOKED
↓
#1 NAVIGATION_INVOCATION_FAILED
↓
NAVIGATION_RETRYABLE
↓
用户点击“回到生命世界”
↓
#2 NAVIGATION_INVOKED
↓
#2 OUTCOME_REPORTED:LIFE_WORLD_DELIVERED
```

证据：

- 第一次失败没有导航；
- 终结事实没有重复执行；
- `deliveryReferenceId` 保持；
- 只增加 `deliveryAttempt`；
- 同一生命返回。

### 4.2 Watchdog

真实可见链：

```text
#1 NAVIGATION_INVOKED
↓
#1 FIRST_OUTCOME_SUPPRESSED_FOR_WATCHDOG
↓
Launch 已呈现，但 Delivery 仍未成功
↓
真实等待 8 秒
↓
NAVIGATION_RETRYABLE
↓
#2 NAVIGATION_INVOKED
↓
#2 OUTCOME_REPORTED:LIFE_WORLD_DELIVERED
```

证据：

- watchdog 没有提交成功；
- pathname 与返回表面存在都没有绕过 typed outcome；
- retry 没有重新终结 encounter。

### 4.3 Identity mismatch

真实可见链：

```text
#1 IDENTITY_MISMATCH_PROJECTED
↓
#1 OUTCOME_REPORTED:LIFE_WORLD_DELIVERY_REJECTED
↓
NAVIGATION_RETRYABLE
↓
#2 OUTCOME_REPORTED:LIFE_WORLD_DELIVERED
```

证据：

- 错误副本被 Launch 身份校验拒绝；
- 权威二十八宿与 StarBeast 身份未修改；
- 第二 attempt 消费原始权威身份。

### 4.4 Returning surface unavailable

真实可见链：

```text
#1 RETURNING_SURFACE_UNAVAILABLE_PROJECTED
↓
#1 OUTCOME_REPORTED:LIFE_WORLD_DELIVERY_UNAVAILABLE
↓
NAVIGATION_RETRYABLE
↓
#2 OUTCOME_REPORTED:LIFE_WORLD_DELIVERED
```

证据：

- 未提交表面不能成为 delivery success；
- 用户可以同周期纯导航重试；
- 恢复后同一生命表面完成交付。

### 4.5 Old attempt

真实可见链：

```text
#1 FIRST_ATTEMPT_MADE_RETRYABLE
↓
#2 NAVIGATION_INVOKED
↓
#1 STALE_ATTEMPT_EMITTED_BEFORE_CURRENT
↓
#2 CURRENT_ATTEMPT_EMITTED_AFTER_STALE
↓
LIFE_WORLD_DELIVERED
```

证据：

- 旧 attempt 没有关闭当前票据；
- 当前 attempt typed outcome 仍是唯一完成事实；
- React 批处理没有使旧 outcome 污染当前状态。

### 4.6 Refresh / Direct URL / Back / Forward

真实浏览器复验：

- 成功交付后刷新：不恢复旧 Delivery Ticket；
- 已终结 encounter 直接访问 `/reality`：只显示安全失败表面，不创建 Active encounter；
- 从安全失败表面返回生命世界：不伪造 Termination Confirmed；
- 前进 / 后退：不恢复旧票据，不触发重复交付；
- 返回后仍是同一权威身份。

---

## 5. Consumer Boundary

Harness 只投影：

- 导航调用能力；
- Delivery Ticket 的错误身份副本；
- 返回生命表面可用性；
- typed Delivery Outcome 流。

Harness 不消费：

```text
Life Whisper 原文
Relationship Name
Pressure Seed
Reality Candidate
Six Dimension
Gravity
AI Reflection
Choice
Crystal
Archive Growth
Renderer State
```

生产消费者保持：

```text
Termination Authority:
Existing Intent Controller

Delivery Coordinator:
App

Typed Outcome Producer:
LaunchLab

Navigation Retry:
App pure retry
```

---

## 6. Rollback Unit

本刀可由单提交整体回滚：

- 删除 `src/acceptance/`；
- 删除 acceptance mode；
- 删除中性 Runtime Port 接缝；
- App 恢复直接调用现有导航；
- Launch 恢复直接报告现有 typed outcome；
- 删除 Acceptance Runner 与门禁。

回滚不触碰：

- Intent Controller；
- Explicit Leave Termination；
- Navigation Delivery State Machine；
- 身份与关系资产；
- Reality；
- Growth。

---

## 7. Delivery Decision

本刀裁决：

```text
Acceptance Harness:
ESTABLISHED

Production Isolation:
PASS

Negative-path Browser Reachability:
PASS

Explicit Leave Navigation Delivery:
OPEN — PENDING INDEPENDENT CLOSURE AUDIT

Phase 3:
LOCKED
```

Harness 建立不自动关闭 Delivery。

---

## 8. Traffic Light

绿色：

- Acceptance Harness 基础设施完成；
- 五个冻结 Scenario 可独立复跑；
- 后续不改变 Fault Port 契约的单场景补充可作为小刀。

黄色：

```text
XINMAI-REALITY-EXPLICIT-LEAVE-NAVIGATION-DELIVERY-NEGATIVE-PATH-CLOSURE-AUDIT-P0
```

需要独立审计：

- 生产包隔离；
- 正常路径；
- 五条负向路径；
- 刷新 / Direct URL / Back / Forward；
- 远程干净快照。

红色：

```text
Runtime Authority Migration:
NOT DISCOVERED
```

---

## 9. Next Knife

```text
XINMAI-REALITY-EXPLICIT-LEAVE-NAVIGATION-DELIVERY-NEGATIVE-PATH-CLOSURE-AUDIT-P0
```

刀型：

```text
MAP / Independent Closure Audit
```

决策：

```text
NOW — MAP ONLY
```

唯一目标：

> 在不修改 Runtime 的前提下，以 Production Build、Acceptance Build、真实浏览器负向路径和远程干净快照共同裁决 Explicit Leave Navigation Delivery 是否可以正式 CLOSED。
