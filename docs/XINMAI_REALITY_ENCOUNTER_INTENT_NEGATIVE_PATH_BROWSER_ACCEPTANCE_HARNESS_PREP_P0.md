# XINMAI Reality Encounter Intent Negative-Path Browser Acceptance Harness Prep P0

## 0. PREP 裁决

任务：

```text
XINMAI-REALITY-ENCOUNTER-INTENT-NEGATIVE-PATH-BROWSER-ACCEPTANCE-HARNESS-PREP-P0
```

刀型：

```text
MAP / Major Blade Prep
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
RealityEncounterIntent Runtime Authority：
ESTABLISHED

RealityEncounterIntent Delivery：
OPEN

Phase 2：
CLOSED

Phase 3：
LOCKED
```

本 PREP 冻结：

> 使用“验收构建专用的类型化 Fault Port + 浏览器外部时间 / Storage 控制”补齐负向浏览器证据。

它必须复用：

- 同一 `/reality`；
- 同一 `RealityEncounterIntent Controller`；
- 同一 Recovery Adapter；
- 同一 Route post-commit transaction；
- 同一 Production Host；
- 同一 Typed Surface Outcome；
- 同一 Active Commit。

它不得创建：

- 第二 Controller；
- 第二 Reality Route；
- 第二 Recovery Writer；
- 第二 Active 真源；
- Fixture 身份；
- Fixture StarBeast；
- 生产可见测试入口。

---

## 1. 为什么需要 Harness

上一轮独立关闭复验已经取得：

```text
Motion：
PASS

Reduced Motion Static Surface：
PASS

Life Surface Failure：
PASS

8s Watchdog：
PASS

Same-cycle Retry：
PASS

Refresh Recovery：
PASS

Direct URL：
PASS

Back / Forward：
PASS
```

仍缺真实浏览器证据：

- Candidate Surface unavailable；
- Candidate bundle empty；
- pressure source mismatch；
- stale cycle / revision outcome；
- identity reference mismatch；
- Recovery write unavailable；
- TTL boundary；
- Choice Continuation；
- explicit leave。

这些路径不能通过正常用户输入稳定触发。

若继续依赖人工偶发故障：

```text
不可复现
↓
不可审计
↓
不可成为关闭门禁
```

若直接在生产组件中增加更多查询参数：

```text
URL
↓
Production Component
↓
改变权威事实
```

会形成新的隐式运行输入，不接受。

---

## 2. 当前可复用资产

### 2.1 已有浏览器验收开关

当前存在：

```text
__xinmaiReducedMotion
__xinmaiRendererFailure
```

位置：

- `GenesisProductionRendererCanvasHost`；
- `RealityLifeUniverseCanvas`。

它们满足：

- `import.meta.env.DEV` 限制；
- 不生成身份；
- 不提交 Active；
- 只影响视觉能力 / 失败表现。

它们不适合继续扩张为：

- Candidate 数据控制；
-身份引用改写；
- Controller 时钟；
- Recovery Storage；
- Choice；
- Intent 终结。

裁决：

```text
既存两项：
KEEP

复制该模式到更多权威层：
REJECT
```

### 2.2 自动状态门禁

现有检查已经覆盖：

- TTL 两小时边界；
- 刷新和重试不续期；
- 旧周期 Outcome；
- identity mismatch；
- Candidate bundle empty；
- Recovery write failure；
- Choice 新周期；
- formal completion；
- post-commit rollback。

裁决：

```text
保留为确定性状态证据
```

但：

```text
自动状态证据
≠
真实浏览器证据
```

### 2.3 当前工程限制

当前仓库没有 Playwright / Cypress 等浏览器测试依赖。

已有 “browser walkthrough” 资产是可执行契约检查，不是实际浏览器驱动。

因此未来实施若需要可持续远程复现，应单独引入：

```text
test-only browser runner
```

不得把浏览器驱动加入生产 dependencies。

---

## 3. 方案比较

### Option A：继续增加 DEV URL Flags

示例：

```text
?__xinmaiCandidateEmpty=1
?__xinmaiIdentityMismatch=1
?__xinmaiRecoveryFailure=1
```

问题：

- Route、Host、Controller、Recovery Adapter 会成为 URL 消费者；
- 测试输入会扩张到多个权威层；
- 查询参数可能成为隐式 Runtime；
- 难以证明 Production Build 已完全移除；
- 容易复制现有组件级调试入口。

裁决：

```text
REJECT
```

### Option B：新增 Fixture / Lab 页面

问题：

- 不是同一 `/reality`；
- 不是同一 Route admission；
- 不是同一 Recovery；
- 不能证明生产因果；
- 容易形成第二套 Reality。

裁决：

```text
REJECT
```

### Option C：Acceptance Build + Typed Fault Port + External Browser Control

结构：

```text
Acceptance-only Build
        +
Browser Runner
        ↓
Typed Acceptance Scenario
        ↓
同一生产 Route / Host / Controller
        ↓
真实失败与恢复
```

特点：

- 使用同一用户路径；
- 使用同一 Controller；
- Fault Port 不拥有状态；
- 浏览器 Runner 控制时钟和平台失败；
- Production Build 必须完全排除验收入口；
- 整套资产可以独立移除。

裁决：

```text
ACCEPT
```

---

## 4. 最高边界

Harness 只拥有：

```text
本次验收 Scenario
预期触发点
一次性 Fault 指令
验收观测记录
```

Harness 不拥有：

- Intent；
- encounter cycle；
- identity references；
- Admission；
- revision；
- Recovery Candidate；
- Activation Source；
- Life Surface；
- Candidate Surface；
- Host Transaction；
- Active；
- Pressure Seed；
- Choice；
- Crystal。

Harness 可以要求某个真实生产者：

```text
在当前真实周期中报告失败
```

Harness 不可以直接写：

```text
FAILED_RETRYABLE
ACTIVE_IN_REALITY
TERMINAL
```

所有状态变化继续由当前权威完成。

---

## 5. 选定架构

### 5.1 Acceptance Build

未来允许新增独立运行模式：

```text
vite --mode xinmai-acceptance
```

要求：

- 不是生产默认模式；
- 不是普通 DEV 自动开放；
- 需要显式启动；
- 使用同一 App、同一路由；
- Production Build 中不可出现 Scenario Registry；
- Production Build 中不可出现 Fault Port；
- Production Build 中不可出现验收查询参数。

### 5.2 Scenario Registry

验收模式中只能选择冻结枚举：

```text
NONE
LIFE_SURFACE_UNAVAILABLE
CANDIDATE_SURFACE_UNAVAILABLE
CANDIDATE_BUNDLE_EMPTY
PRESSURE_SOURCE_MISMATCH
STALE_LIFE_OUTCOME
STALE_PRESSURE_OUTCOME
IDENTITY_REFERENCE_MISMATCH
RECOVERY_WRITE_UNAVAILABLE
```

禁止：

- 任意 JSON 注入；
- 任意身份引用输入；
- 任意 revision 输入；
- 任意脚本执行；
- 原始 Life Whisper 输入；
- Pressure Seed 自定义数据；
- 动态修改 StarBeast Identity。

Scenario 必须是：

```text
编译期已知
+
一次性
+
当前浏览器周期局部
```

### 5.3 Typed Fault Port

建议最小只读接口：

```text
RealityEncounterAcceptanceFaultPort
```

它只能回答：

```text
当前验收场景是否要求某个生产边界返回失败
```

它不能：

- 读取 Controller；
- 写 Controller；
- 读取 Storage；
- 写 Storage；
- 生成 cycle；
- 生成 identity；
- 生成 Candidate；
- 提交 Host Outcome。

### 5.4 浏览器外部控制

以下场景不进入 Fault Port：

#### TTL

由浏览器 Runner 在页面启动前控制时钟。

Controller 继续只读取平台时间，不读取 URL 或 Harness Scenario。

#### Recovery Storage unavailable

由浏览器 Runner 在页面启动前，使目标 Recovery key 的写入真实失败。

Recovery Adapter 仍是唯一 Reader / Writer。

Harness 不读取 Storage 内容，也不伪造 Recovery Candidate。

#### Reduced Motion

优先使用浏览器原生 media emulation。

既存 `__xinmaiReducedMotion` 只保留为人工验收 fallback，不作为自动关闭的唯一证据。

---

## 6. 场景注入点

|场景|唯一注入点|真实生产者|预期权威结果|
|-|-|-|-|
|Life Surface unavailable|Life Surface 能力边界|RealityLifeUniverseCanvas|Host failure → Controller retryable|
|Candidate Surface unavailable|Candidate typed outcome adapter|RealityPressureSeedPresentation|Host failure → Controller retryable|
|Candidate bundle empty|Presentation 输入边界|RealityPressureSeedPresentation|`CANDIDATE_BUNDLE_EMPTY`|
|Pressure source mismatch|Candidate typed outcome adapter|RealityPressureSeedPresentation|`PRESSURE_SOURCE_MISMATCH`|
|Stale Life Outcome|Life outcome test projector|RealityLifeUniverseCanvas|Host / Controller reject|
|Stale Pressure Outcome|Pressure outcome test projector|RealityPressureSeedPresentation|Host / Controller reject|
|Identity mismatch|Outcome copy test projector|Host transaction validation|Host / Controller reject|
|Recovery unavailable|平台 Storage failure|Recovery Adapter|READY 保持 / 同周期重试|
|TTL boundary|浏览器外部时钟|Controller|Intent expired / no new cycle|

“test projector” 只允许创建错误的 Outcome 副本。

它不得：

- 修改当前真实 identity；
- 修改当前 admission；
- 修改 Controller；
- 覆盖 Recovery；
- 让错误副本成为新真源。

---

## 7. 场景生命周期

```text
Acceptance Runner 选择 Scenario
↓
页面启动
↓
Scenario 被解析为只读 Fault Plan
↓
用户通过真实 UI 建立 Intent
↓
Fault 在唯一触发点消费一次
↓
真实生产链报告失败
↓
浏览器记录可见结果与同周期事实
↓
页面关闭
↓
Scenario 销毁
```

冻结：

- 每个页面实例只消费一次；
- 普通 Retry 不自动重复 Fault，除非场景明确要求；
- 新 cycle 不继承旧 Scenario 消费状态；
- Scenario 不写入 localStorage；
- Scenario 不写入 sessionStorage；
- Scenario 不进入 Recovery Candidate；
- Scenario 不进入身份资产；
- Scenario 不进入 URL 以外的用户可见分享状态；
- Production Mode 无 Scenario。

---

## 8. 浏览器验收矩阵

### 8.1 Candidate Surface unavailable

```text
真实 Intent READY
↓
真实 Route Admission
↓
真实 Life Surface
↓
Candidate Surface typed unavailable
↓
Host 不组装成功事务
↓
Controller 不 Active
↓
同周期 Retry 可见
```

### 8.2 Candidate bundle empty

必须观察：

```text
candidateCount：
0

Candidate UI：
0

ACTIVE：
0

Retry：
可用
```

### 8.3 Stale Outcome

```text
Cycle A Outcome 延迟
↓
Cycle A 已失败 / 进入新 revision
↓
旧 Outcome 到达
↓
不改变当前状态
↓
当前周期继续可恢复
```

### 8.4 Identity mismatch

必须证明：

- 错误 Outcome 被拒绝；
- 当前身份没有改变；
- 当前 Relation Name 没有改变；
- 其他用户资产没有被读取；
- Reality 不 Active；
- 用户仍能安全回到同周期重试。

### 8.5 Recovery unavailable

```text
READY
↓
Admission Recovery Write 失败
↓
Admission 不成立
↓
Activation Source 不存在
↓
READY 保持
↓
同周期 Retry
```

恢复平台后：

```text
同一 cycle
↓
Post-commit Admission
↓
真实表面
↓
ACTIVE
```

### 8.6 TTL

必须分别覆盖：

```text
2h - 1ms
2h
2h + 1ms
```

并证明：

- 刷新不延长；
- 重试不延长；
- 过期不生成新 cycle；
- 过期不删除身份；
- 过期不删除关系名；
- 过期不等于明确离开。

---

## 9. Choice Continuation

Choice 不应通过 Fault Port 伪造。

必须使用真实链：

```text
当前 Reality 正式完成
↓
Entry Intent ENCOUNTER_COMPLETED
↓
Choice 用户明确继续
↓
Controller 创建新 encounterCycleId
↓
同一身份进入新 Reality
```

Harness 只记录：

- 旧 cycle 已终结；
- 新 cycle 与旧 cycle 不同；
- identity references 保持；
- Choice 没有直接写 Active；
- Reality 重新通过 Host Typed Surface。

若当前真实 UI 无法完成该链：

```text
PRODUCT CONSUMER GAP
```

不得用 Harness 补成假路径。

---

## 10. Explicit Leave 语义缺口

当前 Controller 支持：

```text
EXPLICIT_LEAVE
```

当前生产 Route 已存在：

```text
ENCOUNTER_COMPLETED
```

但当前 Reality 页面没有被确认的用户动作直接消费：

```text
EXPLICIT_LEAVE
```

“暂时停在这里”当前只暂停 Reality Presentation，不终结 Intent。

因此：

```text
Explicit Leave：
不是 Harness 缺口

Explicit Leave：
是产品消费者边界缺口
```

禁止：

- 在 Acceptance Mode 增加假“离开”按钮；
- 让浏览器 Runner 直接调用 Controller；
- 把浏览器后退解释为明确离开；
- 把刷新、卸载或关闭 Tab 解释为明确离开；
- 把“暂时停在这里”未经产品授权改写为终结 Intent。

需要 Product Control Tower 单独裁决：

1. 当前版本是否必须提供明确离开动作；
2. 动作属于 Reality 页面、返回生命世界还是全局导航；
3. 它是否应终结 `READY / FAILED / ACTIVE`；
4. 它与正式 `ENCOUNTER_COMPLETED` 如何并存；
5. Delivery 关闭门禁是否要求二者都具备浏览器证据。

---

## 11. Production Isolation 门禁

未来 Harness 实施必须新增以下门禁：

```text
Production Bundle Acceptance Scenario Registry：
0

Production Bundle Fault Port：
0

Production Route Acceptance Query Consumer：
0

Production Controller Test Clock：
0

Production Recovery Test Storage：
0

Fixture Identity：
0

Second Controller：
0

Second Recovery Writer：
0

Second Active Authority：
0

DOM Runtime Input：
0
```

还必须证明：

- 普通 `npm run dev` 不开启 Harness；
- 普通 `npm run build` 不包含 Harness；
- 只有显式 acceptance mode 可启动；
- Scenario 不可从生产 URL 激活；
- Harness 文件可以整体删除；
- 删除后 Production Build 与现有门禁不变。

---

## 12. 建议文件边界

未来实施允许评估：

```text
src/acceptance/
  xinmaiRealityEncounterAcceptanceScenario.ts
  xinmaiRealityEncounterAcceptanceFaultPort.ts

scripts/
  check-xinmai-reality-encounter-browser-acceptance-harness.mjs
  run-xinmai-reality-encounter-browser-acceptance.mjs

vite acceptance mode configuration
package.json acceptance-only commands
```

可能需要的最小生产文件接缝：

- `RealityProductionRouteEntry`；
- `RealityProductionHost`；
- `RealityLifeUniverseCanvas`；
- `RealityPressureSeedPresentation`。

这些文件只允许接收类型化只读 Fault Port。

禁止修改：

- identity calculation；
- StarBeast identity；
- Pressure Seed catalog；
- Reality candidate selection；
- Intent state machine；
- Recovery schema；
- Choice semantics；
- Crystal；
- Phase 3 consumer。

Recovery failure 与 TTL 优先由浏览器外部能力完成，不要求 Controller / Recovery Adapter 增加测试参数。

---

## 13. 原子提交与回滚

### 13.1 实施提交

未来 Harness 基础设施必须在一个提交中包含：

```text
Acceptance Mode
+
Scenario Registry
+
Typed Fault Port
+
Production Isolation Gates
+
最小浏览器 Runner
+
至少一条负向浏览器路径
```

禁止先把 Fault Port 接入生产组件、后补隔离门禁。

### 13.2 回滚单位

单提交回滚必须：

- 删除全部 Harness；
- 删除全部 acceptance mode；
- 恢复所有 Production Component 接缝；
- 保留当前 post-commit migration；
- 保留 Typed Surface Outcome；
- 保留 Controller；
- 保留 Recovery；
- 保留用户身份与关系资产；
- 不改变远程 Runtime 行为。

### 13.3 后续场景

Harness 基础设施稳定后，每个新增 Scenario 可以作为绿色小刀：

- 单一测试场景；
- 不改变 Fault Port 契约；
- 不增加生产消费者；
- 可独立回滚；
- 有明确浏览器验收。

若新增 Scenario 需要改变 Fault Port 或产品消费者：

```text
YELLOW
↓
重新 MAP
```

---

## 14. 风险与停止条件

出现任一情况停止 Harness 实施：

- Scenario 可以在 Production Build 激活；
- Route 或 Controller 直接读取测试 Query；
- Harness 生成 identity；
- Harness 生成 cycle；
- Harness 写 Recovery；
- Harness 直接写 Controller；
- Harness 直接提交 Active；
- Candidate Fixture 形成第二 Candidate Source；
- Explicit Leave 通过测试按钮伪造；
- Choice 通过 Controller 直调伪造；
- 需要修改两个以上产品 Layer；
- 回滚必须跨多个提交。

---

## 15. PREP 完成回答

### Harness 使用什么方案？

```text
Acceptance Build
+
Typed Fault Port
+
External Browser Time / Storage Control
```

### 是否新增生产页面？

```text
NO
```

### 是否新增生产 Route？

```text
NO
```

### 是否新增 Controller？

```text
NO
```

### 是否新增 Recovery Writer？

```text
NO
```

### 是否修改身份？

```text
NO
```

### 是否形成第二条 Reality？

```text
NO
```

### 是否需要生产迁移？

```text
NO
```

### Harness 实施刀型？

```text
Major / Test Infrastructure
```

### 当前是否可直接实施完整 Harness？

```text
DEFER
```

原因：

```text
Explicit Leave 是产品消费者语义缺口，
必须先独立 MAP，
不能由 Harness 代替。
```

---

## 16. 交通灯扫描

### 绿色

- 既存 Motion；
- Reduced Motion；
- Life Surface Failure；
- Watchdog；
- Retry；
- Refresh；
- Direct URL；
- Back / Forward。

这些路径无需改动。

### 黄色

```text
Acceptance Harness Infrastructure：
Major Blade Authorization Required

Explicit Leave Consumer：
MAP Required
```

### 红色

```text
Production Runtime Authority Migration：
NOT REQUIRED

第二 Reality / Controller / Recovery：
REJECT
```

---

## 17. 最终状态

```text
Harness Architecture：
FROZEN

Harness Runtime：
NOT IMPLEMENTED

RealityEncounterIntent Delivery：
OPEN

Phase 2：
CLOSED

Phase 3：
LOCKED
```

---

## 18. 下一刀建议

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

唯一目标：

> 裁决当前版本的 Explicit Leave 是否需要正式用户动作，冻结它与 `ENCOUNTER_COMPLETED` 的生产者、消费者、UI 语义、终结范围和浏览器关闭门禁。

完成后再决定：

```text
Acceptance Harness Major Blade：
NOW / DEFER / REJECT
```
