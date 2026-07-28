# XINMAI RETURNING LIFE WHISPER FULL CAUSAL REVALIDATION P0

## 文档定位

- 项目：XINMAI / 星脉之境
- 文档编号：`XINMAI-RETURNING-LIFE-WHISPER-FULL-CAUSAL-REVALIDATION-P0`
- 模式：Returning Life Whisper Full Causal Revalidation
- 刀型：`MAP / Runtime Audit`
- 决策：`NOW — AUDIT ONLY`
- 主 Layer：Layer 3｜Relationship
- 保护 Layer：Layer 1｜World、Layer 2｜Identity
- 边界 Layer：Layer 4｜Growth
- 审计日期：`2026-07-28`
- 工程影响：无

本审计：

- 只复验返回身份、关系名、Life Whisper、StarBeast Response、Reality Intent 的完整因果；
- 区分协议声明、源码结构、自动门禁、真实浏览器行为与干净远程构建；
- 不修改 Runtime；
- 不新增状态、消费者、路由、持久化或数据模型；
- 不实施 Pressure Seed Adapter；
- 不进入 Phase 3；
- 不修复任何既存基线门禁漂移。

---

## 一、Construction State Card

```text
当前 Phase：
Phase 1 → Phase 2

当前 A 主线：
Returning Life Relationship Closure

本刀类型：
MAP / Runtime Audit

主影响 Layer：
Layer 3｜Relationship

保护 Layer：
Layer 1｜World
Layer 2｜Identity

边界 Layer：
Layer 4｜Growth

审计基线：
6df3ce9d0e7603ee2e70bdba58b05b0ba8c987d2

是否修改 Runtime：
NO

是否跨 Phase：
NO

决策：
NOW — AUDIT ONLY
```

---

## 二、审计目标

目标因果：

```text
恢复同一生命身份
↓
恢复同一星兽与可选关系名
↓
进入当前返回稳态
↓
用户表达 / 明确保持沉默
↓
同一生命真实回应 / 正确跳过
↓
回应结果稳定 / 真实不可用
↓
用户主动表达 Reality Intent
↓
进入唯一 /reality V2
```

本审计回答：

1. 返回链是否只有一个 Relationship Runtime；
2. `SETTLED` 是否只来自真实 Motion / Static Visual Outcome；
3. 失败、重试、跳过和继续同行是否保持事实真实性；
4. 当前 Life Whisper 是否与历史表达、压力和 Crystal 隔离；
5. 关系名是否只作为同一身份上的可选关系资产恢复；
6. Reality 是否仍从新的候选认出开始；
7. Phase 3 消费者是否仍被锁定。

---

## 三、证据等级

| 等级 | 含义 | 本审计用途 |
| --- | --- | --- |
| 协议声明 | 产品目标与冻结边界 | 只作为验收依据 |
| 源码结构 | 当前生产者、状态所有者与消费者 | 确认 Runtime 因果 |
| 自动门禁 | 状态矩阵、过期周期、身份失配、禁止消费者 | 覆盖难以手动稳定复现的负向路径 |
| 真实浏览器行为 | 用户动作、可见结果、页面跳转 | 证明路径真实可达 |
| 干净远程构建 | 远程 HEAD 独立 TypeScript、Build 与检查 | 排除本地脏工作树依赖 |

源码字符串不能替代真实路径可达性。

真实浏览器状态也不能替代身份失配、旧周期污染等纯状态门禁。

---

## 四、当前权威因果

### 4.1 返回身份与关系恢复

```text
Persisted Life Source
↓
三项身份引用一致
↓
Returning Visual Continuity
↓
同一 sourceReferenceId
↓
Relationship Naming Asset Read
↓
Returning Life World
```

确认：

- 不重新出生；
- 不重新计算二十八宿；
- 不重新生成 StarBeast Identity；
- 关系名不决定身份；
- 关系名不存在或读取失败时降级为未命名；
- 返回空间仍使用同一生命核心、同一身体与同一星河来源。

### 4.2 当前 Life Whisper 周期

```text
当前组件周期
↓
WHISPER_SUBMITTED
或
WHISPER_SKIPPED
```

提交路径：

```text
WHISPER_SUBMITTED
↓
创建 opaque responseCycleId
↓
RESPONDING
↓
Renderer Visual Outcome
↓
Surface Host 附加 sourceReferenceId
↓
Page 校验身份、周期、事实与阶段
↓
SETTLED / UNAVAILABLE
```

跳过路径：

```text
WHISPER_SKIPPED
↓
SKIPPED
↓
不创建回应周期
↓
不触发 StarBeast Response
↓
Reality Intent READY
```

### 4.3 `SETTLED` 单一真源

```text
Renderer
产生当前周期 Visual Outcome
↓
Surface Host
适配 Motion / Static Outcome
↓
Relationship Controller / Page
校验 sourceReferenceId + responseCycleId + 当前事实
↓
SETTLED
```

确认：

```text
返回页固定计时器成功路径：
0

返回链 SETTLED 真源：
1
```

页面仍保留六秒 watchdog，但它只产生：

```text
UNAVAILABLE
+
OUTCOME_WATCHDOG_EXPIRED
```

watchdog 不产生 `SETTLED`。

### 4.4 Reality Intent

合法门禁：

```text
(WHISPER_SUBMITTED && SETTLED)
||
(WHISPER_SKIPPED && SKIPPED)
||
(WHISPER_SUBMITTED
 && UNAVAILABLE
 && CONTINUE_WITHOUT_CONFIRMED_RESPONSE)
```

失败不会伪造 `SETTLED`。

用户可以明确继续同行，但页面继续保留：

```text
phase = UNAVAILABLE
authority = VISUAL_OUTCOME_UNAVAILABLE
```

---

## 五、消费者矩阵

| 生产者 | 输出 | 当前直接消费者 | 当前/历史 | Runtime 状态 |
| --- | --- | --- | --- | --- |
| Returning Identity Recovery | 稳定生命来源与三项身份引用 | Returning Visual Continuity、关系名读取 | 长期身份 | ✓ |
| Returning Visual Continuity | 同一 `sourceReferenceId`、同一身体视觉来源 | Returning Life Canvas、Reality Handoff | 当前返回 | ✓ |
| Relationship Naming Asset | 可选用户关系名 | First Encounter / Returning Relationship UI | 长期关系资产 | ✓ |
| Returning Life Whisper | `WHISPER_SUBMITTED` / `WHISPER_SKIPPED` | Relationship Controller | 当前周期 | ✓ |
| Relationship Controller | `RESPONDING` + `responseCycleId` | Renderer 显式视觉事实 | 当前周期 | ✓ |
| Renderer | Motion Started / Completed / Unavailable | Surface Host | 当前周期视觉 | ✓ |
| Static Fallback Surface | Static Presented / Unavailable | Surface Host | 当前周期视觉 | ✓ |
| Surface Host | 带身份引用的类型化 Visual Outcome | Relationship Controller / Page | 当前周期 | ✓ |
| Relationship Controller | `SETTLED` / `UNAVAILABLE` | Reality Intent Resolver、关系界面 | 当前周期 | ✓ |
| Returning Reality Intent | READY / AWAITING_RELATIONSHIP | 唯一 `/reality` V2 导航动作 | 当前周期 | ✓ |
| Historical Reality Memory | `historicalRealityMemoryKey` | Life Canvas Memory Geometry | 历史记忆 | ✓ |
| Crystal Memory | body imprint key + source slot | 同一身体纹理 | 历史沉积 | ✓ |
| Reality V2 | 新候选与用户认出 | 当前 Reality Session | 新现实 | ✓ |

### 5.1 合法消费者边界

Renderer 只消费：

- `lifeWhisperFact`；
- `lifeWhisperResponsePhase`；
- `responseCycleId`；
- 已有视觉身份来源；
- Reduced Motion。

Renderer 不消费：

- Life Whisper 原文；
- 用户关系名；
- Pressure Seed；
- 六维；
- Gravity；
- AI Reflection；
- Choice；
- Crystal。

### 5.2 禁止消费者检查

以下系统没有读取返回 Life Whisper 原文、Visual Outcome 或关系名：

```text
Pressure Seed
Reality Candidate Source
AI Reflection
Six Dimension
Gravity
Choice
Crystal
Archive Growth Logic
Life Engine
```

结论：

```text
Forbidden Consumers：
CLEAR
```

---

## 六、真实浏览器因果复验

隔离预览：

```text
http://127.0.0.1:5181
```

返回测试身份：

```text
sourceReferenceId
=
launch:1995-06-02:酉时
```

### 6.1 返回恢复

入口：

```text
/launch-lab?entryUser=old&returnState=complete
```

观察：

```text
returning life world = SAME_RECOGNIZED_LIFE
Life Whisper fact = NONE
response phase = DORMANT
response cycle = NONE
Reality Intent = AWAITING_RELATIONSHIP
raw text persistence = NONE
sourceReferenceId = launch:1995-06-02:酉时
```

结果：`PASS`

### 6.2 Motion 提交路径

用户输入：

```text
今天想慢一点
```

提交后即时状态：

```text
WHISPER_SUBMITTED
↓
RESPONDING
↓
CURRENT_CYCLE
↓
AWAITING_VISUAL_OUTCOME
↓
Reality Intent = AWAITING_RELATIONSHIP
```

真实 Motion Outcome 后：

```text
phase = SETTLED
authority = MOTION_VISUAL_OUTCOME
Reality Intent = READY
```

可见文案：

```text
它听见了。这句话只留在此刻。
```

前后身份：

```text
sourceReferenceId
=
launch:1995-06-02:酉时
```

结果：`PASS`

### 6.3 Reduced Motion Static 路径

静态回应实际挂载后：

```text
static surface = SAME_LIFE_PRESENTED
static source = launch:1995-06-02:酉时
phase = SETTLED
authority = STATIC_VISUAL_OUTCOME
Reality Intent = READY
```

Static Outcome 不是延时伪装。

结果：`PASS`

### 6.4 明确沉默路径

真实动作：

```text
暂时不说
```

结果：

```text
fact = WHISPER_SKIPPED
phase = SKIPPED
response cycle = NONE
未显示“它听见了”
Reality Intent = READY
```

点击后进入唯一 `/reality`，身份来源不变。

结果：`PASS`

### 6.5 Renderer 不可用、重试与继续同行

Renderer 不可用：

```text
phase = UNAVAILABLE
authority = VISUAL_OUTCOME_UNAVAILABLE
reason = SURFACE_BLOCKED
Reality Intent = AWAITING_RELATIONSHIP
```

界面：

- 不显示“它听见了”；
- 显示克制的不可用事实；
- 提供“再靠近一次”；
- 提供“这一次先继续同行”。

重试：

```text
仍未产生伪 SETTLED
仍未解锁 Reality Intent
```

明确继续：

```text
phase 仍为 UNAVAILABLE
authority 仍为 VISUAL_OUTCOME_UNAVAILABLE
continuation = CONTINUE_WITHOUT_CONFIRMED_RESPONSE
Reality Intent = READY
```

用户随后可以进入唯一 `/reality`。

结果：`PASS`

### 6.6 当前周期与恢复隔离

在输入框留下未提交原文后刷新：

```text
textarea = empty
fact = NONE
phase = DORMANT
Reality Intent = AWAITING_RELATIONSHIP
sourceReferenceId 不变
```

确认：

- 原文不持久化；
- 旧提交事实不恢复；
- 旧回应周期不恢复；
- 返回后创建新的 Whisper Cycle；
- 不重复触发 First Encounter。

结果：`PASS`

### 6.7 关系名恢复与删除

通过用户界面创建关系名：

```text
安泉
```

刷新返回：

```text
relationship name state = AVAILABLE
可见关系名 = 安泉
sourceReferenceId = launch:1995-06-02:酉时
Whisper fact = NONE
Whisper phase = DORMANT
```

关系名恢复没有恢复历史 Whisper。

通过用户界面确认删除并再次返回：

```text
relationship name state = UNNAMED
安泉不再出现
Whisper fact = NONE
```

结果：`PASS`

### 6.8 Reality 入口

Motion、Skip 与明确失败降级三条路径均进入：

```text
/reality
```

进入时：

```text
sourceReferenceId = launch:1995-06-02:酉时
当前 Pressure Seed = NONE
Reality V2 等待新的用户认出
```

结果：`PASS`

---

## 七、负向路径复验

| 负向路径 | 保护机制 | 证据 | 结果 |
| --- | --- | --- | --- |
| 旧周期 Outcome 晚到 | `responseCycleId` 必须匹配当前 ref | 自动门禁 | PASS |
| 身份引用不匹配 | `sourceReferenceId` 校验 | 自动门禁 | PASS |
| Motion 只开始未完成 | Started Outcome 只记录，不 settle | 自动门禁 | PASS |
| WebGL Context Lost | 输出 Unavailable，不输出完成 | 源码 + 自动门禁 | PASS |
| Renderer 初始化失败 | Static fallback 或 Unavailable | 浏览器 + 自动门禁 | PASS |
| Static 未实际呈现 | DOM surface 已连接后才能回报 | 源码 + 自动门禁 | PASS |
| Reduced Motion | 真实 Static Outcome | 浏览器 | PASS |
| 页面卸载 | 清理 watchdog、dispose Renderer、失效当前 ref | 源码结构 | PASS |
| 连续重试 | 新 response cycle，旧 Outcome 被拒绝 | 自动门禁 + 浏览器 | PASS |
| 用户跳过 | 无 cycle、无回应、Intent 可用 | 浏览器 | PASS |
| 用户明确继续 | 保留 Unavailable，不伪造 Settled | 浏览器 | PASS |
| Watchdog 超时 | 只进入 Unavailable | 源码 + 自动门禁 | PASS |

```text
旧周期污染：
0

伪 SETTLED：
0

失败阻断：
0
```

---

## 八、历史与当前事实隔离

### 8.1 Historical Reality

旧 Reality 通过：

```text
historicalRealityMemoryKey
```

进入 Life Canvas 的 Memory Geometry。

Reality Host 明确标记：

```text
historical pressure role = MEMORY_ONLY
```

新的 Reality Session 初始化为：

```text
selectedPressureSeedContext = null
current pressure role = AWAITING_NEW_RECOGNITION
```

因此历史压力不会自动恢复为当前压力。

### 8.2 Crystal

Crystal 只通过：

```text
latestCrystalMemoryKey
+
latestCrystalSourceSlot
```

成为同一身体上的历史纹理。

它不触发当前 Reality、Choice 或成长结论。

### 8.3 Life Whisper

当前原文只存在于当前组件输入状态。

提交时立即清空。

刷新、离开或再次返回时不恢复。

历史 Life Whisper 不进入当前输入，也不成为 Pressure Seed。

结论：

```text
历史事实隔离：
PASS
```

---

## 九、资产保护

### Layer 1｜World

- 动态星河保持；
- 黑曜生命空间保持；
- 返回、表达与回应发生在同一空间；
- 未新增聊天页、表单页或过渡路由。

结果：`PASS`

### Layer 2｜Identity

- 生命来源稳定；
- 二十八宿不重算；
- 天地之名不变；
- 同一生命核心与身体保持；
- 同一 `sourceReferenceId` 贯穿返回与 Reality；
- 用户关系名不覆盖天地身份。

结果：`PASS`

### Layer 3｜Relationship

- 用户可以表达或沉默；
- Motion 与 Static 回应都有真实 Outcome；
- 失败不伪造回应；
- 用户可以重试或明确继续；
- 关系名可恢复、可删除；
- Reality Intent 由用户动作成立。

结果：`PASS`

### Layer 4｜Growth

- Pressure Seed 未消费 Whisper；
- 六维未启动；
- Gravity 未启动；
- AI Reflection 未启动；
- Choice 未启动；
- Crystal 未由当前关系动作生成。

结果：`LOCKED / CLEAR`

---

## 十、Runtime 与门禁结果

远程基线：

```text
6df3ce9d0e7603ee2e70bdba58b05b0ba8c987d2
```

验证：

```text
TypeScript：
PASS

Production Build：
PASS

全量 XINMAI Checks：
PASS

Outcome Atomic Migration Gate：
PASS

Returning Relationship Intent Gate：
PASS

Relationship Naming Gates：
PASS

新增失败：
0
```

完整 release 基线仍停在起始提交已存在的：

```text
check:mother-context-persistence-semantics
```

缺失：

```text
writeOriginMotherContext(motherHandoff.originMotherContext)
```

该漂移在本审计基线的父提交中已存在，不属于 Returning Relationship 因果，也不在本刀修复边界内。

---

## 十一、审计裁决

```text
Returning Identity Recovery：
PASS

Returning Relationship Name Recovery：
PASS

Returning Life Whisper：
PASS

Motion Visual Outcome：
PASS

Reduced Motion Static Outcome：
PASS

Unavailable / Retry / Continue：
PASS

Skip：
PASS

Reality Intent：
PASS

Historical / Current Isolation：
PASS

Identity Protection：
PASS

Forbidden Consumers：
CLEAR

Second Relationship Runtime：
NO

Second Reality Runtime：
NO
```

最终判断：

```text
Returning Life Whisper Full Causal Chain：
PASS

Returning Relationship Runtime：
CLOSED FOR PHASE 2 CLOSURE REVIEW

Phase 2：
OPEN

Phase 3：
LOCKED
```

本审计只关闭 Returning Life Whisper 的完整因果复验。

它不代替新用户 First Encounter、命名生命周期和全部失败路径的 Phase 2 总关闭审计。

---

## 十二、下一刀

```text
XINMAI-FIRST-ENCOUNTER-PHASE-2-CLOSURE-AUDIT-P0
```

刀型：

```text
MAP / Phase Closure Audit
```

主 Layer：

```text
Layer 3｜Relationship
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

唯一目标：

> 合并新用户 First Encounter 与老用户 Returning Relationship 的真实证据，裁决 Phase 2 是否可以正式 CLOSED。

在 Phase 2 正式关闭前：

```text
Pressure Seed Adapter：
DEFER

Living Intensity & Reward Curve：
MAP ONLY

Phase 3：
LOCKED
```
