# XINMAI Reality Explicit Leave Navigation Delivery Negative Path Closure Audit P0

## 0. Construction State Card

任务：

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

Runtime 修改：

```text
0
```

审计基线：

```text
578f1351c85afba17f382295290c9c2b0c84a4b9
```

审计开始时，隔离工作区 `HEAD` 与远程分支：

```text
codex/genesis-28-mansion-production-continuity
```

均指向该提交。

当前阶段：

```text
Phase 2:
CLOSED

Phase 3:
LOCKED
```

本刀唯一目标：

> 独立复验 Explicit Leave Navigation Delivery 的正常路径、五条负向路径、刷新与浏览器历史路径，判断该 Delivery 能否正式关闭。

本刀不：

- 修改 Runtime；
- 修改 Acceptance Harness；
- 修改 Intent、身份或关系资产；
- 修改 Renderer；
- 修改 Pressure Seed、Six Dimension、Gravity、Choice、Crystal；
- 修复既存门禁漂移；
- 解锁 Phase 3。

---

## 1. 审计证据等级

本审计区分：

```text
P = Protocol declaration
S = Source structure
A = Automated checks
B = Real browser behavior
R = Clean remote snapshot
```

裁决原则：

- `P` 不能证明 Runtime 已存在；
- `S` 不能替代真实路径可达性；
- `A` 不能替代必须由真实浏览器证明的负向路径；
- 正常路径不能替代失败、重试与旧尝试隔离；
- 当前脏工作树通过不能替代远程干净快照；
- Acceptance Harness 自己报告成功，不能替代产品 Runtime 对 Outcome 的真实消费。

---

## 2. 审计目标链

唯一合法链：

```text
用户明确选择“这一轮先到这里”
↓
Reality Intent Controller 权威终结当前 encounter
↓
TERMINATED_AND_LEFT
↓
App Delivery Coordinator 创建类型化 Delivery Ticket
↓
TERMINATION_CONFIRMED_NAVIGATION_PENDING
↓
Post-commit Navigation Invocation
↓
NAVIGATION_REQUESTED
↓
Launch 恢复同一生命身份与同一生命表面
↓
Launch 报告类型化 Delivery Outcome
↓
LIFE_WORLD_DELIVERED
↓
App 清除当前 Delivery Ticket
```

三个事实继续严格分离：

```text
TERMINATION CONFIRMED
≠
NAVIGATION REQUESTED
≠
LIFE WORLD DELIVERED
```

裁决：

```text
Single Authority Chain:
PASS
```

证据：

```text
P + S + A + B + R
```

---

## 3. 权威与消费者审计

| 生产者 | 输出 | 当前直接消费者 | 权威边界 | 审计 |
|---|---|---|---|---|
| Reality Intent Controller | `TERMINATED_AND_LEFT` | App Delivery Coordinator | 当前 Reality encounter 的权威终结 | PASS |
| App Delivery Coordinator | Delivery Ticket | App post-commit navigation effect | 导航交付周期与 attempt | PASS |
| Navigation Runtime Port | Navigation invocation result | App Delivery Coordinator | 只报告调用成功或失败 | PASS |
| Launch returning surface | Typed Delivery Outcome | App Delivery Coordinator | 同一生命表面是否真实呈现 | PASS |
| 8 秒 Watchdog | retryable failure | App Delivery Coordinator | 只报告失败，不报告成功 | PASS |
| 用户 Retry | next delivery attempt | Navigation Runtime Port | 只重试导航，不重做终结 | PASS |

禁止消费者审计：

```text
Renderer:
CLEAR

Pressure Seed:
CLEAR

Reality Candidate Source:
CLEAR

Six Dimension:
CLEAR

Gravity:
CLEAR

AI Reflection:
CLEAR

Choice:
CLEAR

Crystal:
CLEAR

Archive Growth:
CLEAR

Life Whisper:
CLEAR

Relationship Naming:
CLEAR
```

这些系统没有读取 Delivery Ticket，也没有提交 `LIFE_WORLD_DELIVERED`。

---

## 4. Ticket 与 Attempt 隔离

Delivery Ticket 保持：

- `deliveryReferenceId`；
- `intentReferenceId`；
- `encounterCycleId`；
- 三项身份引用；
- `terminalReason: EXPLICIT_LEAVE`；
- `targetRoute: /launch-lab`；
- `terminationConfirmedAt`；
- `deliveryAttempt`。

重试：

- 保持同一 `deliveryReferenceId`；
- 保持同一 `encounterCycleId`；
- 保持同一身份引用；
- 只增加 `deliveryAttempt`；
- 不重做终结；
- 不生成第二张身份票据；
- 不恢复已终结的 Reality。

旧 attempt Outcome 必须同时匹配：

```text
deliveryReferenceId
+
deliveryAttempt
+
encounterCycleId
+
identity references
```

否则不得改变当前状态。

裁决：

```text
Attempt Isolation:
PASS
```

---

## 5. Production Isolation

显式 Acceptance Mode：

```text
xinmai-acceptance
```

生产构建使用中性 Runtime Port。

Acceptance 构建才替换为：

- Acceptance Entry；
- Scenario Registry；
- Typed Fault Port；
- Evidence Panel。

生产产物确认不包含：

```text
__xinmaiExplicitLeaveAcceptance
NAVIGATION_INVOCATION_FAILS_ONCE
xinmai-explicit-leave-acceptance-evidence
XINMAI_ACCEPTANCE_NAVIGATION_FAILURE
```

Acceptance Scenario：

- 不读取 `localStorage`；
- 不读取 `sessionStorage`；
- 不生成身份；
- 不生成 Intent；
- 不生成 Delivery Ticket；
- 不直接写 Controller；
- 不直接提交成功；
- 不接入 Growth 消费者。

裁决：

```text
Production Isolation:
PASS
```

证据：

```text
S + A + R
```

---

## 6. 正常浏览器交付

真实浏览器链：

```text
Returning Life World
↓
暂时不说
↓
和它一起进入新的现实
↓
Reality 可交互表面
↓
这一轮先到这里
↓
#1 NAVIGATION_INVOKED
↓
#1 OUTCOME_REPORTED:LIFE_WORLD_DELIVERED
↓
回到同一生命世界
```

可见结果：

- URL 到达 `/launch-lab`；
- 同一生命世界可见；
- 同一生命身份仍可恢复；
- Delivery overlay 清除；
- 没有 Retry UI；
- 没有 Pressure Seed、Choice 或 Crystal 副作用。

裁决：

```text
Normal Browser Delivery:
PASS
```

证据：

```text
B
```

---

## 7. 负向路径一：Navigation Invocation Failure

真实浏览器链：

```text
#1 NAVIGATION_INVOKED
↓
#1 NAVIGATION_INVOCATION_FAILED
↓
仍停留 /reality
↓
显示真实 Retry
↓
用户点击“回到生命世界”
↓
#2 NAVIGATION_INVOKED
↓
#2 OUTCOME_REPORTED:LIFE_WORLD_DELIVERED
```

确认：

- 第一次调用失败没有伪装成成功；
- 当前 encounter 已终结事实没有被撤销；
- 重试没有生成新 Delivery；
- 重试没有重新触发 Explicit Leave；
- 第二次真实 typed outcome 才完成交付。

裁决：

```text
Navigation Invocation Failure:
PASS
```

---

## 8. 负向路径二：8 秒 Watchdog

真实浏览器链：

```text
#1 NAVIGATION_INVOKED
↓
#1 FIRST_OUTCOME_SUPPRESSED_FOR_WATCHDOG
↓
Launch 生命表面已经可见
↓
Delivery 仍不提交成功
↓
真实等待 8 秒
↓
显示 Retry
↓
#2 NAVIGATION_INVOKED
↓
#2 OUTCOME_REPORTED:LIFE_WORLD_DELIVERED
```

确认：

- Route 到达不是成功；
- DOM 可见不是成功；
- 生命表面存在但 typed outcome 缺失时不提交成功；
- Watchdog 只报告 retryable failure；
- Watchdog 不生成 `LIFE_WORLD_DELIVERED`；
- 同周期重试保持同一 Delivery。

裁决：

```text
Watchdog Failure Truth:
PASS
```

---

## 9. 负向路径三：Identity Mismatch

真实浏览器链：

```text
#1 NAVIGATION_INVOKED
↓
#1 IDENTITY_MISMATCH_PROJECTED
↓
#1 OUTCOME_REPORTED:LIFE_WORLD_DELIVERY_REJECTED
↓
显示 Retry
↓
#2 NAVIGATION_INVOKED
↓
#2 OUTCOME_REPORTED:LIFE_WORLD_DELIVERED
```

确认：

- Acceptance 只投影错误引用，不修改权威身份；
- 身份失配不会完成 Delivery；
- 不读取其他生命的关系资产；
- Retry 使用原权威身份；
- 第二次匹配后才交付。

裁决：

```text
Identity Protection:
PASS
```

---

## 10. 负向路径四：Returning Surface Unavailable

真实浏览器链：

```text
#1 NAVIGATION_INVOKED
↓
#1 RETURNING_SURFACE_UNAVAILABLE_PROJECTED
↓
#1 OUTCOME_REPORTED:LIFE_WORLD_DELIVERY_UNAVAILABLE
↓
显示 Retry
↓
#2 NAVIGATION_INVOKED
↓
#2 OUTCOME_REPORTED:LIFE_WORLD_DELIVERED
```

确认：

- pathname 正确不能替代生命表面；
- 返回页面挂载不能替代生命表面；
- 表面能力不可用时没有伪成功；
- Retry 不创建新身份或新 encounter；
- 当前表面真实可用后才交付。

裁决：

```text
Returning Surface Failure:
PASS
```

---

## 11. 负向路径五：Stale Attempt Before Current Outcome

真实浏览器链：

```text
#1 NAVIGATION_INVOKED
↓
#1 FIRST_ATTEMPT_MADE_RETRYABLE
↓
#2 NAVIGATION_INVOKED
↓
#1 STALE_ATTEMPT_EMITTED_BEFORE_CURRENT
↓
当前 Delivery 不被旧 attempt 清除
↓
#2 CURRENT_ATTEMPT_EMITTED_AFTER_STALE
↓
当前 Delivery 完成
```

确认：

- 旧 attempt 晚到不能完成当前 attempt；
- 旧 attempt 晚到不能覆盖当前失败或成功状态；
- 当前 attempt typed outcome 是唯一完成证据；
- 没有第二 Delivery Coordinator；
- Strict Mode 下每个 attempt 只有一次有效 navigation invocation。

裁决：

```text
Stale Attempt Pollution:
0
```

```text
Current Attempt Delivery:
PASS
```

---

## 12. Refresh / Direct URL / Browser History

### 12.1 Delivery 完成后刷新

结果：

- 返回同一生命世界；
- 不恢复已完成 Delivery Ticket；
- 不恢复旧 Retry；
- 不显示旧 Delivery overlay；
- 不生成新的 attempt。

裁决：

```text
Refresh After Delivery:
PASS
```

### 12.2 Direct URL `/reality`

在没有 Active encounter 时直接进入：

```text
/reality
```

可见真实安全状态：

```text
这一次现实还没有被完整承接。
你的生命世界还未准备好进入现实。
```

并提供：

```text
回到生命世界
```

确认：

- 不伪造 Active encounter；
- 不伪造 Delivery Ticket；
- 不使用 identity-only 旁路；
- 不进入 Dynamics；
- 不触发 Growth。

裁决：

```text
Direct URL Safety:
PASS
```

### 12.3 Browser Back / Forward

结果：

- Back 与 Forward 都回到可解释的 Launch 生命表面；
- 同一身份仍在；
- 不恢复旧 Delivery Ticket；
- 不恢复旧 Retry；
- 不重新触发 Explicit Leave。

裁决：

```text
Browser History Safety:
PASS
```

---

## 13. Automated Gates

基线提交执行：

```text
npm run build
```

结果：

```text
TypeScript:
PASS

Production Build:
PASS
```

仅保留既存大分包提示。

执行：

```text
npm run build:xinmai-explicit-leave-acceptance
```

结果：

```text
Acceptance Build:
PASS
```

专项门禁：

```text
check-xinmai-reality-explicit-leave-navigation-delivery:
PASS

check-xinmai-reality-explicit-leave-browser-acceptance-harness:
PASS
```

全量：

```text
check-xinmai-*:
36 / 36 PASS
```

新增失败：

```text
0
```

---

## 14. 既存 Release Gate 漂移

完整 `check:release` 在既存门禁停止：

```text
check:mother-context-persistence-semantics
```

缺失的精确源码标记：

```text
writeOriginMotherContext(motherHandoff.originMotherContext)
```

当前源码已经采用对象投影形式写入，门禁仍要求旧精确调用形态。

该漂移：

- 在审计基线中已经存在；
- 与 Explicit Leave Navigation Delivery 无消费者关系；
- 本刀没有修改对应源码或门禁；
- 不反向否定本交付的专项、全量 XINMAI 与浏览器证据；
- 不在本刀顺带修复。

分类：

```text
YELLOW
MAP
```

---

## 15. 远程干净快照

审计开始时：

```text
Local isolated HEAD:
578f1351c85afba17f382295290c9c2b0c84a4b9

Remote branch HEAD:
578f1351c85afba17f382295290c9c2b0c84a4b9
```

该隔离基线：

- 不消费主工作树未提交修改；
- Production Build PASS；
- Acceptance Build PASS；
- 两项 Explicit Leave 专项门禁 PASS；
- 36 项 XINMAI 门禁 PASS；
- 真实浏览器路径由该基线启动。

本审计文档提交后，仍需从新的远程审计提交建立干净快照复验，确保文档交付本身不破坏基线。

---

## 16. 关闭裁决

最终裁决：

```text
Reality Explicit Leave Navigation Delivery:
CLOSED
```

分项：

```text
Normal Browser Delivery:
PASS

Negative Browser Paths:
PASS

Production Isolation:
PASS

Identity Protection:
PASS

Attempt Isolation:
PASS

Forbidden Consumers:
CLEAR

Remote Clean Snapshot:
PASS

New Failures:
0
```

关闭含义：

> “当前 Reality 已权威终结”与“用户已真实回到同一生命世界”已经形成可失败、可重试、可隔离旧 attempt、可由真实 typed surface outcome 完成的单一交付因果。

关闭不表示：

- Phase 3 已解锁；
- Pressure / Gravity 语义已校准；
- Growth 消费者可以读取 Delivery；
- 可以删除 Intent Controller；
- Acceptance Harness 可以进入生产；
- 可以跳过后续 Stage Gate Review。

阶段保持：

```text
Phase 2:
CLOSED

Phase 3:
LOCKED
```

---

## 17. 交通灯扫描

### GREEN

```text
Explicit Leave Navigation Delivery:
CLOSED
```

该交付不需要继续 Runtime 修复。

### YELLOW

```text
Pressure Presentation / Gravity Stage Semantic Gate:
MAP
```

需要独立判断既存“Gravity 尚未启动”门禁究竟是：

- 陈旧文案门禁；
- 当前阶段权威冲突；
- Phase 3 入口前仍需冻结的产品语义。

不得在本审计中顺带修改。

另有独立既存门禁漂移：

```text
Mother Context Persistence Semantic Gate:
MAP BACKLOG
```

它不属于当前产品主线，不吞入下一刀。

### RED

```text
NONE
```

本审计没有发现新旧 Navigation Delivery 双真源、身份替换或 Recovery 责任迁移。

---

## 18. 下一刀建议

名称：

```text
XINMAI-PRESSURE-PRESENTATION-GRAVITY-STAGE-SEMANTIC-GATE-MAP-P0
```

刀型：

```text
MAP / Stage Semantic Gate Review
```

主 Layer：

```text
Layer 4 | Growth Boundary
```

保护 Layer：

```text
Layer 3 | Relationship
```

决策：

```text
NOW — MAP ONLY
```

唯一目标：

> 裁决 Pressure Presentation 与 Gravity “尚未启动”门禁是陈旧检查还是当前阶段权威冲突，为独立的 Phase 3 Entry Review 清除语义歧义。

该刀不得：

- 修改 Runtime；
- 修改文案；
- 解锁 Phase 3；
- 扩张 Pressure Seed；
- 接入 Choice 或 Crystal；
- 顺带修复 Mother Context 门禁漂移。
