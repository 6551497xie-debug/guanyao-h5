# XINMAI FIRST ENCOUNTER STARBEAST RESPONSE OUTCOME MIGRATION PREP P0

## 文档定位

- 项目：XINMAI / 星脉之境
- 文档编号：`XINMAI-FIRST-ENCOUNTER-STARBEAST-RESPONSE-OUTCOME-MIGRATION-PREP-P0`
- 模式：First Encounter StarBeast Response Outcome Migration Prep
- 刀型：`Migration Audit / Major Blade Prep`
- 决策：`NOW — PREP ONLY`
- 主 Layer：Layer 3｜Relationship
- 保护 Layer：Layer 1｜World、Layer 2｜Identity
- 边界 Layer：Layer 4｜Growth
- 审计日期：`2026-07-28`
- 审计基线：`79cc93b3ce37ef878ecafcb8934166dcc91ab717`
- 工程影响：无

本 Prep：

- 只冻结 First Encounter 回应结算的权威、消费者与原子迁移方案；
- 不修改 Runtime；
- 不新增 Engine、路由、持久化或数据模型；
- 不改变 Life Whisper 原文边界；
- 不修改二十八宿、StarBeast Identity 或生命坐标；
- 不修改 Returning Relationship Runtime；
- 不实施 Pressure Seed、六维、Gravity、AI、Choice 或 Crystal；
- 不把 Recognition 可达性问题混入 Outcome 迁移。

---

## 一、Construction State Card

```text
当前 Phase：
Phase 1 → Phase 2

当前 A 主线：
First Encounter → Life Companion

本刀类型：
Migration Audit / Major Blade Prep

主影响 Layer：
Layer 3｜Relationship

保护 Layer：
Layer 1｜World
Layer 2｜Identity

边界 Layer：
Layer 4｜Growth

当前阻断：
First Encounter 的 SETTLED
仍由页面固定计时器产生

是否改变状态权威：
实施时 YES

是否需要 Migration Audit：
YES

是否修改 Runtime：
NO

决策：
NOW — PREP ONLY
```

---

## 二、唯一目标

冻结如何把 First Encounter 从：

```text
用户提交
↓
页面等待固定时间
↓
页面假定星兽已经回应
↓
SETTLED
```

迁移为：

```text
用户提交
↓
创建当前回应周期
↓
同一 StarBeast 开始视觉回应
↓
Renderer / Static Surface 产生真实 Outcome
↓
Genesis Host 适配身份事实
↓
Page 校验身份、周期、关系事实与阶段
↓
SETTLED / UNAVAILABLE
```

本 Prep 只回答：

> First Encounter 如何复用已经成立的 Returning Outcome 契约，并在不产生双轨 Runtime 的情况下完成一次原子权威切换？

---

## 三、Migration Audit

### 3.1 当前系统状态

已存在：

```text
World：
同一 Genesis 星河、核心与 StarBeast 身体

Identity：
生命坐标、二十八宿、天地之名、sourceReferenceId

Relationship：
Recognition
Life Whisper
SUBMITTED / SKIPPED
Optional Naming
Reality Intent

Visual Outcome Infrastructure：
共享 LifeWhisper 类型
Renderer Motion Outcome
Static Outcome 语义
Outcome Transition 校验器
Returning Host Adapter

Growth：
Pressure Seed、六维、Gravity、Choice、Crystal
但尚未消费 Phase 2 关系事实
```

### 3.2 当前 First Encounter 链

```text
WHISPER_SUBMITTED
↓
Page 写入 RESPONDING
↓
固定 1,600ms
Reduced Motion 固定 80ms
↓
Page 直接写入 SETTLED
↓
Relationship Naming Ready
↓
Reality Intent Ready
```

Genesis Host 当前输入：

```text
lifeWhisperFact
lifeWhisperResponsePhase
responseCycleId = null
```

Genesis Host 当前：

- 把视觉事实投递给 Renderer；
- 驱动 Renderer 帧循环；
- 不读取 Renderer 的 Life Whisper Outcome；
- 不向 Page 回传 Motion / Static Outcome；
- Fallback / Blocked 只更新 Host 状态；
- 不确认同一生命的静态回应是否实际呈现。

Renderer Core 已经能够：

- 读取类型化 Relationship Visual Fact；
- 在非空 `responseCycleId` 下跟踪当前周期；
- 产生 `MOTION_RESPONSE_STARTED`；
- 产生 `MOTION_RESPONSE_COMPLETED`；
- 在 Context Lost 时产生 `VISUAL_RESPONSE_UNAVAILABLE`；
- 把 Outcome 放入 Controller Snapshot。

当前断点不是 Renderer 缺少能力，而是：

```text
Page
没有创建 cycle

Genesis Host
没有转发 outcome

Page
仍以 timer 结算
```

### 3.3 目标状态

```text
First Encounter Page
=
Relationship Authority

Genesis Host
=
Surface Outcome Adapter

Renderer Core
=
Visual Execution Authority

Shared Transition Service
=
身份、周期、事实与阶段校验
```

### 3.4 可复用资产

直接复用：

- `LifeWhisperRelationshipFact`；
- `LifeWhisperRelationshipResponsePhase`；
- `LifeWhisperRelationshipVisualFact`；
- `LifeWhisperRendererVisualResponseOutcome`；
- `LifeWhisperSurfaceVisualResponseOutcome`；
- `LifeWhisperUnavailableContinuation`；
- `resolveLifeWhisperVisualOutcomeTransition`；
- Renderer Core 的 Motion Started / Completed / Context Lost Outcome；
- Returning Runtime 已验证的 watchdog、retry、continue 语法；
- Existing First Encounter `SUBMITTED / SKIPPED`；
- Existing Optional Naming；
- Existing Reality Intent；
- Existing Reduced Motion 原则。

明确不复用：

- Returning Identity Recovery；
- Launch 返回空间状态；
- Returning 历史 Reality / Crystal 记忆；
- Returning 文案；
- Returning 页面状态所有权；
- Returning Reality Handoff。

### 3.5 缺失能力

First Encounter 只缺：

1. 当前组件周期内的 opaque `responseCycleId`；
2. Genesis Host 的 Outcome callback；
3. Genesis Host 对 Renderer Snapshot 的 Outcome 转发；
4. Reduced Motion / Renderer Fallback 的真实静态呈现确认；
5. Blocked / Context Lost / Watchdog 的真实不可用状态；
6. Page 对共享 Transition 的消费；
7. retry 与明确继续同行；
8. 固定计时器成功路径的原子删除；
9. 新用户 Outcome 负向门禁。

不缺：

- 新 Renderer；
- 新 StarBeast Response Engine；
- 新 Relationship Runtime；
- 新身份模型；
- 新 AI；
- 新 Reality；
- 新持久化。

---

## 四、权威所有者冻结

### 4.1 Relationship Authority

权威所有者：

```text
GenesisProductionExperiencePage
```

它继续拥有：

- `WHISPER_SUBMITTED`；
- `WHISPER_SKIPPED`；
- 当前 `responseCycleId`；
- `RESPONDING / SETTLED / UNAVAILABLE / SKIPPED`；
- retry；
- 明确继续同行；
- Optional Naming 资格；
- Reality Intent。

Renderer 不拥有 Relationship 状态。

### 4.2 Visual Execution Authority

权威执行者：

```text
Existing Genesis WebGL Renderer Core
```

它只回答：

- 当前周期的 Motion 是否开始；
- 当前周期的 Motion 是否完成；
- Context 是否在回应中丢失。

它不得回答：

- 用户表达是什么意思；
- 用户是否被理解；
- Relationship 是否已经成立；
- 是否生成 Pressure Seed；
- 是否可以进入 Reality；
- 是否形成 Crystal。

### 4.3 Surface Outcome Adapter

权威适配者：

```text
GenesisProductionRendererCanvasHost
```

它负责：

- 从 Renderer Snapshot 读取 Motion Outcome；
- 附加当前稳定 `sourceReferenceId`；
- 去重同一周期、同一 Outcome；
- 把类型化 Outcome 交给 Page；
- 在 Reduced Motion / Fallback 下确认静态回应真实挂载；
- 在 Surface Blocked 时报告不可用。

它不得写入：

- `SETTLED`；
- Relationship Naming；
- Reality Intent；
- 身份资产；
- 持久化。

### 4.4 Settlement Decision

唯一决策者：

```text
GenesisProductionExperiencePage
+
resolveLifeWhisperVisualOutcomeTransition
```

只有校验全部通过后才能写入 `SETTLED`：

```text
sourceReferenceId 一致
responseCycleId 一致
当前事实 = WHISPER_SUBMITTED
当前阶段 = RESPONDING
Outcome = MOTION_RESPONSE_COMPLETED
或
Outcome = STATIC_RESPONSE_PRESENTED
```

---

## 五、回应周期冻结

### 5.1 所有者

当前周期由：

```text
GenesisProductionExperiencePage
```

拥有。

建议最小状态：

```text
lifeWhisperResponseCycleId
lifeWhisperResponseCycleIdRef
lifeWhisperResponseCycleSequenceRef
lifeWhisperResponsePhaseRef
lifeWhisperFactRef
lifeWhisperOutcomeWatchdogRef
lifeWhisperUnavailableContinuation
lifeWhisperUnavailableReason
lifeWhisperSettlementAuthority
```

### 5.2 生命周期

```text
提交
↓
创建 first-encounter-life-whisper-cycle-N
↓
RESPONDING
↓
SETTLED / UNAVAILABLE
↓
进入 Reality、卸载或重试时失效
```

`responseCycleId`：

- 只存在于当前组件周期；
- 不持久化；
- 不进入 URL；
- 不进入 Identity；
- 不进入 Reality Context；
- 不进入 Pressure Seed；
- 不跨刷新恢复；
- 不保存原文；
- 只用于关联与拒绝过期视觉 Outcome。

### 5.3 旧周期防护

以下 Outcome 一律忽略：

- 旧周期迟到；
- 身份引用不一致；
- 当前事实已经变成 `SKIPPED`；
- 当前阶段不再是 `RESPONDING`；
- 当前组件已经卸载；
- 重试后旧 Renderer callback 返回；
- Motion 只有 Started、没有 Completed。

忽略不得：

- 改写 `SETTLED`；
- 改写 `UNAVAILABLE`；
- 解锁 Naming；
- 解锁 Reality；
- 显示“它听见了”。

---

## 六、目标状态机

### 6.1 Motion 路径

```text
用户提交
↓
WHISPER_SUBMITTED
↓
创建 responseCycleId
↓
RESPONDING
↓
Renderer：MOTION_RESPONSE_STARTED
↓
保持 RESPONDING
↓
Renderer：MOTION_RESPONSE_COMPLETED
↓
Host 附加 sourceReferenceId
↓
Transition 校验
↓
SETTLED
↓
Optional Naming
↓
Reality Intent
```

### 6.2 Reduced Motion / Static 路径

```text
用户提交
↓
WHISPER_SUBMITTED + responseCycleId
↓
Genesis Host 呈现同一生命的静态回应
↓
静态 Surface 已连接并实际呈现
↓
STATIC_RESPONSE_PRESENTED
↓
Transition 校验
↓
SETTLED
```

Reduced Motion 不是：

```text
等待 80ms
```

而是：

```text
不依赖运动也能确认同一生命已经回应
```

Static Surface 必须保持：

- 同一 `sourceReferenceId`；
- 同一天地之名；
- 同一二十八宿来源；
- 同一 StarBeast Presence；
- 同一 Genesis 关系空间；
- 一处克制但明确的静态回应差异。

只有 DOM Surface 真实连接并经过呈现帧后，Host 才能输出：

```text
STATIC_RESPONSE_PRESENTED
```

### 6.3 跳过路径

```text
WHISPER_SKIPPED
↓
SKIPPED
↓
responseCycleId = null
↓
不触发 Renderer Response
↓
Optional Naming
↓
Reality Intent
```

跳过不得：

- 产生 Outcome；
- 进入 `SETTLED`；
- 显示“它听见了”；
- 成为失败或惩罚；
- 阻断命名或同行。

### 6.4 不可用路径

触发：

- Renderer 初始化失败；
- WebGL Context Lost；
- Canvas / Surface Blocked；
- Static Surface 未实际呈现；
- Outcome watchdog 到期；
- Motion 被中断且没有完成 Outcome。

目标：

```text
WHISPER_SUBMITTED
↓
UNAVAILABLE
↓
不显示“它听见了”
↓
重试
或
明确继续同行
```

`UNAVAILABLE` 表示：

> 本次视觉回应无法被确认。

它不表示：

- 星兽拒绝用户；
- 用户表达失败；
- 关系降低；
- 系统已经理解；
- Reality 已经成立。

### 6.5 重试

```text
UNAVAILABLE
↓
用户选择重试
↓
创建新的 responseCycleId
↓
旧周期失效
↓
RESPONDING
```

重试不重新提交原文，不恢复原文，也不创建第二个 Relationship Runtime。

### 6.6 明确继续同行

```text
UNAVAILABLE
↓
用户选择“这一次先继续同行”
↓
CONTINUE_WITHOUT_CONFIRMED_RESPONSE
↓
Reality Intent Ready
```

界面仍须保留：

```text
phase = UNAVAILABLE
authority = VISUAL_OUTCOME_UNAVAILABLE
```

不得伪造：

```text
SETTLED
```

失败降级不自动开放 Relationship Naming。

原因：

- Naming 现有权威来源只允许真实 `SETTLED` 或明确 `SKIPPED`；
- 不应把系统视觉失败伪装成回应已经完成；
- 用户仍可进入 Reality，并在返回关系空间后主动命名。

---

## 七、新老用户复用边界

### 7.1 必须复用

| 层 | 复用资产 |
| --- | --- |
| Types | Relationship Fact、Response Phase、Visual Fact、Surface Outcome、Unavailable Continuation |
| Transition | `resolveLifeWhisperVisualOutcomeTransition` |
| Renderer | Motion Started / Completed、Context Lost Outcome |
| Relationship Semantics | `SUBMITTED / SKIPPED / UNAVAILABLE` |
| Reality Intent | Settled、Skipped、Unavailable + Explicit Continue |
| Accessibility | Reduced Motion 必须有真实 Static Outcome |
| Negative Gates | 身份失配、周期失配、旧 Outcome、禁止消费者 |

### 7.2 只适配，不复制

Genesis 与 Returning 拥有不同页面和 Surface Host。

允许：

```text
同一共享契约
+
各自的 Surface Adapter
```

禁止：

```text
复制 Returning Relationship Controller
成为第二套 First Encounter Runtime
```

新用户状态仍由 `GenesisProductionExperiencePage` 持有。

Returning 状态仍由 Returning Page 持有。

两者共享：

- 类型；
- Outcome 语义；
- Transition 校验器；
- Renderer Core。

### 7.3 不得复用

- 返回身份恢复流程；
- 历史 Pressure Seed；
- 历史 Crystal；
- Returning Life Weather；
- Returning 页面计时与布局；
- 返回 Handoff；
- 老用户关系名恢复职责。

---

## 八、Genesis Host 迁移边界

实施时允许给：

```text
GenesisProductionRendererCanvasHostProps
```

增加可选、类型化：

```text
onLifeWhisperVisualResponseOutcome
```

它不是新增消费者业务，而是让既有 Surface Host 输出已有 Renderer 视觉事实。

Genesis Host 只允许：

1. 保存 callback ref；
2. 读取 Renderer Snapshot；
3. 去重当前 Outcome；
4. 附加既有 `sourceReferenceId`；
5. 转发 Motion Outcome；
6. 呈现并确认 Semantic Static Fallback；
7. 在 Blocked 时报告 `VISUAL_RESPONSE_UNAVAILABLE`。

禁止：

- 读取 Life Whisper 原文；
- 决定 Relationship；
- 决定 Naming；
- 决定 Reality；
- 新增 DOM `data-*` 反向读取；
- 修改 Renderer 视觉参数；
- 增强粒子、镜头、声音或星兽动作；
-创建第二个核心或第二只星兽。

Renderer Core 当前已经提供所需 Outcome。

预期不需要修改：

```text
src/renderers/genesisWebGLRendererCore.ts
src/types/xinmaiLifeWhisperRelationship.ts
src/services/xinmaiLifeWhisperVisualOutcomeTransition.ts
```

如果实施时发现必须修改上述契约语义：

```text
STOP
↓
Architecture Review
```

---

## 九、Page 迁移边界

### 9.1 必须移除

在同一原子提交删除：

```text
LIFE_WHISPER_RESPONSE_HOLD_MS
lifeWhisperResponseTimerRef
Reduced Motion 80ms 成功路径
timer callback 中的 SETTLED 写入
```

页面不得保留任何：

```text
setTimeout
↓
SETTLED
```

### 9.2 必须增加

只增加结算所需的最小状态：

- 当前 cycle；
- 当前 phase ref；
- 当前 fact ref；
- Outcome watchdog；
- Unavailable reason；
- Explicit continuation；
- Settlement authority；
- retry；
- typed Outcome handler。

### 9.3 Watchdog

Watchdog 只允许：

```text
RESPONDING
↓
UNAVAILABLE
```

禁止：

```text
RESPONDING
↓
SETTLED
```

它只证明：

> 在可接受窗口内没有获得权威视觉 Outcome。

### 9.4 Reality Intent

First Encounter 应复用：

```text
resolveLifeWhisperRealityEntryIntent
```

合法条件：

```text
(SUBMITTED && SETTLED)
||
(SKIPPED && SKIPPED)
||
(SUBMITTED
 && UNAVAILABLE
 && CONTINUE_WITHOUT_CONFIRMED_RESPONSE)
```

不得新增新的 Reality 入口或跳转目标。

---

## 十、原子切换计划

### 10.1 旧入口责任

```text
Page timer
=
当前 SETTLED 成功真源
```

### 10.2 新入口责任

```text
Renderer / Static Surface Outcome
↓
Genesis Host Adapter
↓
Page Transition Validation
=
唯一 SETTLED 成功真源
```

### 10.3 同一提交边界

实施提交必须同时完成：

1. 创建当前 response cycle；
2. 把非空 cycle 投递给 Genesis Host；
3. Host 转发 Motion Outcome；
4. Host 确认 Static Outcome；
5. Page 消费共享 Transition；
6. Page 提供真实不可用、重试与明确继续；
7. 删除固定计时器成功路径；
8. 保持 `SKIPPED` 原行为；
9. 保持 Naming 与 Reality Handoff；
10. 增加负向行为门禁。

禁止拆成：

```text
提交 A：
先增加新 Outcome
但保留 timer 成功

提交 B：
以后再删 timer
```

因为这会形成两个 `SETTLED` 真源。

### 10.4 双路径防护

实施后必须满足：

```text
First Encounter SETTLED 成功真源：
1

固定计时器成功路径：
0

第二 Relationship Runtime：
0

第二 Reality Runtime：
0
```

不使用长期 Feature Flag 保留双轨。

---

## 十一、建议实施文件边界

允许的最小范围：

| 文件 | 必要关系 |
| --- | --- |
| `src/pages/GenesisProductionExperiencePage.tsx` | cycle、Outcome 校验、失败降级、移除 timer 成功真源 |
| `src/components/GenesisProductionRendererCanvasHost.tsx` | Motion / Static Outcome 适配 |
| `src/types/genesisProductionExperiencePage.ts` | Host callback 类型 |
| `src/services/xinmaiRelationshipNamingPresentationState.ts` | 若 First Encounter 需要显式 unavailable continuation 输入，只扩展既有意图签名 |
| `src/styles/genesis-production-experience.css` | 仅真实不可用与静态回应所需的克制反馈 |
| 新增单一行为门禁脚本 | 验证权威、负向路径与禁止消费者 |
| `package.json` | 只注册上述门禁 |

预期不修改：

- Renderer Core；
- Reality；
- LaunchLab Returning Runtime；
- Pressure Seed；
- Six Dimension；
- Gravity；
- Choice；
- Crystal；
- Archive；
- Identity 服务；
- Relationship Naming Asset；
- Persistence。

如实施范围自然扩张到预期不修改项：

```text
STOP
```

---

## 十二、负向路径门禁

实施必须覆盖：

### Gate A｜Motion Truth

```text
MOTION_RESPONSE_STARTED
↓
仍为 RESPONDING

MOTION_RESPONSE_COMPLETED
↓
SETTLED
↓
authority = MOTION_VISUAL_OUTCOME
```

### Gate B｜Static Truth

```text
Reduced Motion / Fallback
↓
Static Surface 未连接
↓
不得 SETTLED

Static Surface 实际呈现
↓
STATIC_RESPONSE_PRESENTED
↓
SETTLED
↓
authority = STATIC_VISUAL_OUTCOME
```

### Gate C｜Cycle Isolation

覆盖：

- 旧周期 Outcome 晚到；
- 重试创建新周期；
- 页面卸载；
- 身份引用失配；
- 当前事实已经跳过；
- 当前阶段不再响应。

结果：

```text
旧 Outcome 污染：
0
```

### Gate D｜Unavailable Truth

覆盖：

- Renderer 初始化失败；
- WebGL Context Lost；
- Surface Blocked；
- Watchdog 到期；
- Static 未呈现。

结果：

```text
不宣称“它听见了”
不进入 SETTLED
可以重试
可以明确继续
Reality 不永久阻断
```

### Gate E｜Skip Preservation

```text
WHISPER_SKIPPED
↓
SKIPPED
↓
无 response cycle
↓
无 StarBeast Response
↓
Naming 可选
↓
Reality 可进入
```

### Gate F｜Consumer Boundary

必须证明以下系统不读取：

- Life Whisper 原文；
- response cycle；
- Visual Outcome；
- Unavailable reason；
- Settlement authority；

作为业务输入：

```text
Pressure Seed
Reality Candidate Source
AI Reflection
Six Dimension
Gravity
Choice
Crystal
Archive Growth
Life Engine
```

---

## 十三、资产保护

### World

必须保持：

- Genesis 动态星河；
- 黑曜生命空间；
- 同一星河、核心与身体；
- 表达和回应仍发生在同一空间。

禁止新增独立聊天页、回应页或错误页。

### Identity

必须保持：

- `sourceReferenceId`；
- 生命坐标；
- 二十八宿；
- 天地之名；
- StarBeast Identity；
- 同一核心与同一身体；
- Genesis → Reality Continuity。

Outcome 不得携带第二份身份模型。

### Relationship

必须保持：

- Recognition；
- Life Whisper 原文只在当前输入周期；
- `SUBMITTED / SKIPPED`；
- Optional Naming；
- Relationship Name 独立资产；
- Reality Intent 由用户动作成立。

### Growth

必须继续锁定：

- Pressure Seed；
- Six Dimension；
- Gravity；
- AI；
- Choice；
- Crystal。

Outcome 只证明视觉回应，不证明成长发生。

---

## 十四、Recognition 可达性隔离裁决

上一轮关闭审计发现：

```text
Recognition 按钮可见
但 Manifestation 权威状态尚未满足 handler
↓
点击静默无动作
```

该问题属于：

```text
可见资格
与
既有动作资格
对齐
```

它不是：

- Life Whisper Outcome；
- response cycle；
- Renderer 完成事实；
- SETTLED 权威迁移。

因此本迁移禁止顺手修复。

正确顺序：

```text
先以独立绿色窄修正
对齐 Recognition 可见与动作资格
↓
再执行 Outcome Atomic Migration
```

如果窄修正发现必须改变：

- Manifestation 状态推进；
- 状态权威所有者；
- Host / Renderer 输入契约；

则升级为：

```text
STOP
↓
Architecture Review
```

---

## 十五、回滚单位

完整回滚单位：

```text
First Encounter Outcome Atomic Migration 单一提交
```

回滚必须同时恢复：

- 旧 Page 状态；
- 旧 Genesis Host Props；
- 旧 Host 行为；
- 旧 Reality Intent 调用；
- 旧行为门禁。

禁止只回滚：

- Page；
- Host；
- 类型；
- 门禁；

中的一部分。

部分回滚会产生：

- Host 有 Outcome、Page 不消费；
- Page 等待 Outcome、Host 不输出；
- 新旧 `SETTLED` 双真源；
- 用户永久停留 `RESPONDING`。

回滚不涉及：

- Identity；
- Relationship Naming Asset；
- Reality；
- Pressure Seed；
- Returning Runtime；
- Persistence。

---

## 十六、远程交付门禁

实施刀关闭前必须提供：

```text
固定计时器成功路径：
0

First Encounter SETTLED 真源：
1

Motion Visual Outcome：
PASS

Reduced Motion Static Outcome：
PASS

Unavailable / Retry / Continue：
PASS

旧周期污染：
0

身份失配污染：
0

第二 Relationship Runtime：
0

新增 DOM Runtime 通道：
0

Phase 3 消费者：
0
```

还必须验证：

- TypeScript；
- Production Build；
- 全量 XINMAI Checks；
- First Encounter Motion 浏览器路径；
- First Encounter Reduced Motion 浏览器路径；
- Renderer 失败、重试与明确继续浏览器路径；
- Skip 与 Naming 原路径；
- Reality Handoff；
- 远程干净快照独立复现；
- 提交文件严格在冻结范围内；
- 原工作树既存修改保持。

---

## 十七、Prep 裁决

```text
现有共享 Outcome 契约：
REUSE

Existing Renderer Core：
REUSE

Genesis Host：
ADAPT

First Encounter Page：
MIGRATE AUTHORITY

新 Engine：
NO

新 Relationship Runtime：
NO

新 Reality Runtime：
NO

是否需要生产迁移：
YES

迁移方式：
ATOMIC

身份保护：
PASS

历史事实隔离：
PASS

禁止消费者：
CLEAR

实施刀型：
Migration Blade

实施决策：
NOW
```

Phase 状态：

```text
Phase 2：
OPEN

Phase 3：
LOCKED
```

---

## 十八、下一刀建议

立即下一刀：

```text
XINMAI-FIRST-ENCOUNTER-RECOGNITION-ACTION-REACHABILITY-CORRECTION-P0
```

刀型：

```text
Refinement / Green Narrow Correction
```

主 Layer：

```text
Layer 3｜Relationship
```

保护 Layer：

```text
Layer 2｜Identity
```

决策：

```text
NOW — DIRECT
```

唯一目标：

> 让“认出它一直在那里”的可见资格与既有权威动作资格完全一致，消除按钮可见却静默无动作的路径；不改变状态权威，不新增状态或消费者。

达到即停止。

随后进入：

```text
XINMAI-FIRST-ENCOUNTER-STARBEAST-RESPONSE-OUTCOME-ATOMIC-MIGRATION-P0
```

刀型：

```text
Migration Blade
```

决策：

```text
NOW — STRICT ATOMIC SCOPE
```
