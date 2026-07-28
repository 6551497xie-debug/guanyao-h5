# XINMAI RETURNING RELATION CONTINUITY RUNTIME CLOSURE AUDIT P0

## 文档定位

- 项目：XINMAI / 星脉之境
- 文档编号：`XINMAI-RETURNING-RELATION-CONTINUITY-RUNTIME-CLOSURE-AUDIT-P0`
- 模式：Returning Life Relationship Runtime Closure Audit
- 刀型：`MAP`
- 决策：`NOW — MAP ONLY`
- 主 Layer：Layer 3｜Relationship
- 保护 Layer：Layer 1｜World、Layer 2｜Identity
- 边界 Layer：Layer 4｜Growth
- 审计日期：`2026-07-28`
- 工程影响：无

本审计：

- 只读取 Runtime、消费者、门禁和真实浏览器行为；
- 不修改 Runtime；
- 不新增状态、消费者、路由、持久化或数据模型；
- 不修改 Renderer 输入输出契约；
- 不修复审计发现的问题；
- 不进入 Pressure Seed Adapter；
- 不扩大 Phase 3 或 Phase 4。

---

## 一、Construction State Card

```text
当前 Phase：
Phase 1 → Phase 2

当前 A 主线：
First Encounter → Life Companion

本刀类型：
MAP

主影响 Layer：
Layer 3｜Relationship

保护 Layer：
Layer 1｜World
Layer 2｜Identity

边界 Layer：
Layer 4｜Growth

审计对象：
Returning Identity Recovery
Returning Relationship Name Recovery
Returning Life Whisper
StarBeast Relationship Response
Returning Reality Intent
/reality V2

是否修改 Runtime：
NO

是否进入 Phase 3：
NO

决策：
NOW — MAP ONLY
```

---

## 二、审计基线

审计远程分支：

```text
codex/genesis-28-mansion-production-continuity
```

审计起点：

```text
29b260481b522101585be82dc301edd73cc77b07
```

其中 Returning Relationship Runtime 的生产提交为：

```text
1d0f76b74bfafadc528134b2e196a54e3e13d193
```

`29b2604` 只增加三色施工纪律，不改变 Runtime。

审计证据严格区分：

| 证据等级 | 含义 |
| --- | --- |
| 协议声明 | 产品目标或冻结边界 |
| 源码结构 | 当前生产实现与消费者关系 |
| 自动门禁 | 状态矩阵、禁止消费者和构建检查 |
| 真实浏览器行为 | 用户路径实际可达、可见状态与页面跳转 |
| 干净远程构建 | 远程 HEAD 不依赖主工作树未提交修改 |

---

## 三、目标因果

审计目标：

```text
回到同一生命世界
↓
恢复同一生命与同一星兽
↓
恢复可选关系名
↓
进入当前返回稳态
↓
Life Whisper / 明确暂时不说
↓
同一星兽回应或正确跳过
↓
用户主动进入新的 Reality
```

Phase 2 关闭不仅要求页面可点击。

还要求：

- 关系事实真实；
- 身份不变；
- 当前与历史事实隔离；
- Reality 不抢占关系；
- 失败不制造伪成功；
- 不产生第二套 Relationship Runtime；
- 不把经过时间误写成已确认生命回应。

---

## 四、当前 Runtime 因果

当前生产链为：

```text
Persisted Recognized Identity
↓
Returning Visual Continuity
↓
Relationship Naming Asset Read
↓
LaunchLab 当前组件周期
↓
WHISPER_SUBMITTED / WHISPER_SKIPPED
↓
RESPONDING / SKIPPED
↓
本地计时器
↓
SETTLED
↓
Returning Reality Intent
↓
/reality V2
```

当前正式入口只有一个：

```text
/reality
```

旧的老用户触碰星河后自动进入 Reality 责任已经移除。

返回空间中的不可见 Launch Canvas 不再触发旧导航。

结论：

```text
双路径：
NO

第二套 Reality：
NO

第二套 Relationship Runtime：
NO
```

---

## 五、权威状态所有者

| 事实 | 当前权威所有者 | 生命周期 | Renderer 权限 |
| --- | --- | --- | --- |
| 稳定生命来源 | Persisted Life Source + Visual Continuity | 长期资产 | 只消费视觉来源 |
| 三项身份引用 | Recognized Identity References | 长期资产 | 禁止修改 |
| 用户关系名 | `StarBeastRelationshipNamingAsset` | 可选长期关系资产 | 禁止读取 |
| Returning Whisper 原文 | `LaunchLab` 当前输入状态 | 当前组件周期 | 禁止读取 |
| `WHISPER_SUBMITTED` | `LaunchLab` | 当前组件周期 | 只读取显式视觉事实 |
| `WHISPER_SKIPPED` | `LaunchLab` | 当前组件周期 | 不触发回应 |
| `RESPONDING` | `LaunchLab` | 当前组件周期 | 执行视觉插值 |
| `SETTLED` | `LaunchLab` 本地计时器 | 当前组件周期 | 按已稳定事实渲染 |
| Returning Reality Intent | `resolveLifeWhisperRealityEntryIntent` | 当前组件周期 | 禁止决定 |
| 当前 Reality 候选 | Reality V2 Pressure Seed Session | 新 Reality 周期 | 只消费当前确认状态 |
| 历史 Reality | Returning Life Memory | 记忆 | 不成为当前压力 |

重要事实：

> Renderer 当前不是关系状态权威。

Returning Life Whisper 已通过显式类型化输入进入 Renderer：

```text
LifeWhisperRelationshipVisualFact
↓
Host / Canvas Ref Reader
↓
Genesis WebGL Renderer Core
```

本刀未发现新增：

```text
DOM data-*
↓
Renderer 反向读取 Life Whisper
```

既存 `data-reality-entry-eligibility` 反向读取仍属于已记录的 DOM → Renderer 迁移债务，但没有被 Returning Runtime 扩大，也不作为本审计的新增失败。

---

## 六、真实浏览器路径证据

隔离预览：

```text
http://127.0.0.1:5178
```

测试身份：

```text
sourceReferenceId
=
launch:1995-06-02:酉时
```

### 6.1 回归恢复

入口：

```text
/launch-lab?entryUser=old&returnState=complete
```

真实结果：

```text
data-returning-life-world
= SAME_RECOGNIZED_LIFE

data-returning-life-whisper-entry
= READY

data-returning-life-whisper-fact
= NONE

data-returning-life-whisper-response-phase
= DORMANT

data-returning-reality-intent
= AWAITING_RELATIONSHIP
```

身份结果：

```text
sourceReferenceId
= launch:1995-06-02:酉时

life weather identity
= SAME_CORE_SAME_BODY
```

裁决：

`PASS`

### 6.2 提交路径

真实动作：

```text
输入：
今天想慢一点

点击：
留给它
```

即时状态：

```text
WHISPER_SUBMITTED
↓
RESPONDING
↓
Reality Intent = AWAITING_RELATIONSHIP
```

计时完成后：

```text
WHISPER_SUBMITTED
↓
SETTLED
↓
Reality Intent = READY
```

同时确认：

- 关系名状态仍为 `AVAILABLE`；
- `sourceReferenceId` 未改变；
- 当前 Reality Weather 为 `NO_CURRENT_REALITY`；
- 输入框已经卸载，原文未保留；
- 未自动导航。

路径可达性：

`PASS`

关系回应权威性：

`PARTIAL`

原因见第十一章。

### 6.3 明确跳过路径

真实结果：

```text
WHISPER_SKIPPED
↓
SKIPPED
↓
Reality Intent = READY
```

确认：

- 未进入 `RESPONDING`；
- 未伪造 `SETTLED`；
- 已恢复关系名保持可用；
- 用户仍可进入 Reality；
- 跳过没有失败、惩罚或关系降级语义。

裁决：

`PASS`

### 6.4 未提交原文刷新

真实动作：

```text
输入：
这句不应被恢复
↓
未提交
↓
刷新返回入口
```

刷新后：

```text
rawValue = ""
lifeWhisperFact = NONE
responsePhase = DORMANT
```

关系名和 `sourceReferenceId` 正常恢复。

裁决：

`PASS`

### 6.5 Reality 原子入口

提交稳定或明确跳过后，用户主动点击：

```text
和它一起进入新的现实
```

真实结果：

```text
URL
= /reality

data-reality-entry-cycle
= NEW_REALITY_ENCOUNTER

data-reality-entry-origin
= RETURNING_LIFE_WORLD

data-reality-current-pressure-role
= AWAITING_NEW_RECOGNITION

sourceReferenceId
= launch:1995-06-02:酉时
```

裁决：

`PASS`

### 6.6 关系名创建、恢复与删除

真实动作：

```text
创建：
归舟

刷新：
恢复“归舟”

删除：
删除称呼记录

再次刷新：
UNNAMED
```

确认：

- 关系名是附加关系资产；
- 天地身份未变化；
- 删除后不恢复；
- 删除不阻断 Life Whisper 或 Reality。

裁决：

`PASS`

---

## 七、消费者审计

| 生产者 | 输出 | 当前直接消费者 | 当前/历史 | Runtime 状态 |
| --- | --- | --- | --- | --- |
| Returning Identity Recovery | 同一生命来源与三项身份引用 | Launch Returning Entry、关系名读取、Reality Handoff | 当前身份 | ✓ |
| Returning Visual Continuity | 同一核心、身体与视觉来源 | Returning Life Canvas、`/reality` V2 | 当前身份 | ✓ |
| Relationship Naming Asset | 可选关系名或未命名事实 | Returning Relationship UI | 当前关系 | ✓ |
| Returning Life Whisper Input | 当前周期原文 | 提交动作 | 当前瞬时 | ✓ |
| `WHISPER_SUBMITTED` | 已提交事实 | Page Intent Resolver、Renderer Visual Fact | 当前关系 | ✓ |
| `WHISPER_SKIPPED` | 明确沉默事实 | Page Intent Resolver | 当前关系 | ✓ |
| `RESPONDING` | 回应进行中 | Renderer Visual Fact | 当前关系 | ✓ |
| `SETTLED` | 回应已稳定声明 | Reality Intent Resolver、Renderer | 当前关系 | △ |
| Returning Reality Intent | `READY / AWAITING_RELATIONSHIP` | 显式 Reality CTA | 当前关系 | ✓ |
| Historical Reality Memory | 记忆 Key | Returning Canvas、Reality Host | 历史记忆 | ✓ |
| Crystal Memory | Imprint Key / Source Slot | Returning Canvas、Reality Host | 历史记忆 | ✓ |
| `/reality` V2 | 新候选会话 | Reality Production Host | 当前 Reality | ✓ |

`SETTLED` 标记为 `△` 的原因：

它当前由 Page 本地计时器产生，不消费 Renderer 或 Host 的实际回应完成 outcome。

---

## 八、禁止消费者审计

### 8.1 Life Whisper 原文

当前未发现以下消费者读取 Returning Life Whisper 原文：

- AI Reflection；
- Pressure Seed；
- Reality Candidate Source；
- Six Dimension；
- Gravity；
- Choice；
- Crystal；
- Archive；
- Renderer；
- Life Engine。

自动门禁：

`PASS`

### 8.2 关系名

当前未发现以下消费者读取关系名：

- Renderer；
- Pressure Seed；
- Reality Candidate Source；
- AI Reflection；
- Six Dimension；
- Gravity；
- Choice；
- Crystal；
- Archive Growth Logic；
- Life Engine。

自动门禁：

`PASS`

### 8.3 历史 Reality

Returning Canvas 不再把历史 `selectedPressureSeedContext` 放入当前 Reality 输入。

当前关系：

```text
Historical Reality
↓
historicalRealityMemoryKey
↓
MEMORY_ONLY
```

新 Reality：

```text
selectedPressureSeedContext = null
↓
AWAITING_NEW_RECOGNITION
```

源码与专项门禁：

`PASS`

真实浏览器测试身份当前没有历史 Pressure Seed，因此浏览器只确认：

```text
historical = NONE
current = AWAITING_NEW_RECOGNITION
```

历史 `MEMORY_ONLY` 分支的浏览器复现证据：

`NOT PRESENT IN THIS FIXTURE`

这不构成新的 Runtime 缺失，但必须在进入 Phase 3 前补一条带历史 Reality / Crystal 的正式回归夹具。

---

## 九、资产保护

### World

| 资产 | 结果 |
| --- | --- |
| 黑曜生命空间 | PASS |
| 动态星河与同一关系空间 | PASS |
| 无独立聊天页 | PASS |
| 无普通表单页替代生命主体 | PASS |

### Identity

| 资产 | 结果 |
| --- | --- |
| 不重新出生 | PASS |
| 不重新计算二十八宿 | PASS |
| 同一 `sourceReferenceId` | PASS |
| 同一核心与身体 | PASS |
| 关系名不覆盖天地之名 | PASS |
| 三项身份引用校验 | PASS |

### Relationship

| 资产 | 结果 |
| --- | --- |
| 当前周期 Life Whisper | PASS |
| 明确跳过 | PASS |
| 可选关系名 | PASS |
| 关系名恢复 | PASS |
| 用户主动 Reality Intent | PASS |
| 回应稳定权威 | PARTIAL |

### Growth

| 边界 | 结果 |
| --- | --- |
| Pressure Seed 未提前消费原文 | PASS |
| Six Dimension 未提前启动 | PASS |
| Gravity 未提前启动 | PASS |
| AI 未提前启动 | PASS |
| Choice / Crystal 未提前启动 | PASS |
| 新 Reality 等待用户重新认出 | PASS |

---

## 十、失败与降级审计

| 场景 | 当前行为 | 裁决 |
| --- | --- | --- |
| 身份资产缺失 | Returning 路径不成立，回到安全入口 | PASS |
| 三项身份引用失配 | 关系名降级为不可用，不跨生命消费 | PASS |
| 关系名读取失败 | 不阻断 Life Whisper / Reality | PASS |
| 关系名写入失败 | 当前周期可用，不声称已持久化 | PASS |
| `DELETE_UNCONFIRMED` | 保持最后确认名称，允许重试 | PASS |
| 未提交原文刷新 | 原文销毁，新周期从 `NONE` 开始 | PASS |
| `WHISPER_SKIPPED` | 不触发回应，允许同行 | PASS |
| Renderer Static Fallback | 生命主体可保持，但无回应完成 outcome | PARTIAL |
| Reduced Motion | Page 80ms 后自动 `SETTLED`，Renderer wave 为 0 | PARTIAL |
| 回应无法稳定 | 没有失败 outcome 或当前周期退出通道 | FAIL |
| Reality Context 创建失败 | Reality Guard 可回安全生命入口 | PASS |
| 存储不可用 | 身份与 Reality 不因关系名失败被阻断 | PASS |

---

## 十一、阻断发现｜回应完成权威缺口

### 11.1 当前事实

提交后，`LaunchLab` 执行：

```text
WHISPER_SUBMITTED
↓
RESPONDING
↓
setTimeout(1600ms / Reduced Motion 80ms)
↓
SETTLED
```

Renderer 同时消费：

```text
WHISPER_SUBMITTED
+
RESPONDING
```

并自行计算 1.6 秒视觉插值。

但是 Renderer / Host 没有向关系状态所有者返回：

```text
RESPONSE_VISUALLY_SETTLED
```

或：

```text
RESPONSE_FALLBACK_SETTLED
RESPONSE_UNAVAILABLE
```

### 11.2 结果

当前 `SETTLED` 证明：

> Page 计时结束。

它不能完整证明：

> 同一生命已经以可感知方式回应，并稳定完成。

在普通浏览器路径中，两套 1.6 秒节奏能够同步工作，所以用户路径表现为通过。

但以下场景没有权威闭环：

- WebGL 初始化失败；
- Renderer 进入 Static Fallback；
- Reduced Motion 关闭 response wave；
- Renderer 生命周期中断；
- Page 与 Renderer 时序漂移；
- 视觉回应没有真正开始，但 Page 已宣称“它听见了”。

### 11.3 产品风险

这不是动画参数问题。

它关系到：

```text
世界是否真的回应
↓
关系事实是否成立
↓
用户是否可以进入 Reality
```

因此不能作为绿色小刀直接补丁。

### 11.4 三色纪律裁决

该缺口触发黄色条件：

- 需要重新确认 `SETTLED` 状态权威；
- 可能改变 Page、Host、Renderer 的责任；
- 可能改变 Renderer 输出契约；
- 需要定义失败与 Reduced Motion outcome；
- 当前授权卡无法解释新增回应完成事实。

裁决：

```text
YELLOW
↓
STOP
↓
Architecture Review
↓
Product Control Tower
↓
MAP
```

本审计未发现需要新旧路径并行或切换 Runtime 真源的红色条件。

因此当前不是 Migration Audit。

---

## 十二、门禁与构建

### Production Build

```text
TypeScript：
PASS

Vite Production Build：
PASS

Modules：
279 transformed

新增失败：
0
```

仅存在既有大分包提示。

### 自动门禁

| 门禁 | 结果 |
| --- | --- |
| Returning Life Whisper Relation Intent Atomic Migration | PASS |
| Relationship Naming Major Blade 3 | PASS |
| Relationship Naming Delivery Correction | PASS |
| Returning Imprint → New Reality Continuity | PASS |
| Crystal Imprint Returning Life World Continuity | PASS |
| Reality Production Route Entry | PASS |

---

## 十三、Phase 2 关闭门禁

| 关闭条件 | 结果 |
| --- | --- |
| 回归同一生命 | PASS |
| 同一星兽与同一核心 | PASS |
| 关系名可选恢复 | PASS |
| 提交路径可达 | PASS |
| 跳过路径真实 | PASS |
| 原文不持久化 | PASS |
| Reality Intent 用户主动 | PASS |
| 新 Reality 不恢复旧压力 | PASS |
| 无禁止消费者 | PASS |
| 无第二套 Relationship / Reality | PASS |
| Reduced Motion 回应事实可靠 | PARTIAL |
| Renderer Fallback 回应事实可靠 | PARTIAL |
| 回应失败不伪造成功且不困住用户 | FAIL |

只要一项核心关系事实仍为 `FAIL`，Phase 2 不得关闭。

---

## 十四、最终裁决

```text
Phase 2：
OPEN

First Encounter：
PASS

New User Relationship：
PASS

Returning User Relationship：
PARTIAL

Identity Protection：
PASS

Relationship Naming Recovery：
PASS

Current / Historical Isolation：
PASS WITH FIXTURE EVIDENCE GAP

Forbidden Consumers：
CLEAR

Second Relationship Runtime：
NO

Second Reality Runtime：
NO

Phase 3 Entry Gate：
LOCKED
```

Returning Relationship 当前已经具备完整可达路径。

不能关闭的唯一核心原因是：

> `SETTLED` 仍是计时事实，不是被权威确认的生命回应完成事实。

---

## 十五、下一刀建议

名称：

```text
XINMAI-RETURNING-STARBEAST-RESPONSE-SETTLEMENT-AUTHORITY-MAPPING-P0
```

刀型：

`MAP / Architecture Review`

主 Layer：

Layer 3｜Relationship

保护 Layer：

- Layer 1｜World；
- Layer 2｜Identity。

边界：

- Genesis / Reality Surface Host；
- Renderer Visual Fact Input；
- Renderer Result / Fallback Outcome。

决策：

`NOW — MAP ONLY`

必须回答：

1. `RESPONDING` 与 `SETTLED` 的权威所有者是谁；
2. 正常 Renderer 如何确认可感知回应完成；
3. Reduced Motion 如何形成非动画但真实的生命回应；
4. Static Fallback 如何返回真实 outcome；
5. Renderer 是否只返回视觉 outcome，而不拥有关系状态；
6. 回应失败时如何允许重试、明确跳过或安全同行；
7. 如何避免用 elapsed time 伪造世界回应；
8. 是否需要新增 Renderer 输出契约；
9. 如果需要，为什么属于黄色 Architecture Review；
10. 是否可以单提交、独立回滚；
11. 带历史 Reality / Crystal 的回归浏览器夹具如何补齐。

在该 MAP 完成前：

```text
Pressure Seed Adapter：
DEFER

Phase 3：
LOCKED
```
