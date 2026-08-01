# XINMAI Phase 3 Reality Adventure Experience and Commercial Value Closing MAP P0

> 任务编号：`XINMAI-PHASE-3-REALITY-ADVENTURE-EXPERIENCE-AND-COMMERCIAL-VALUE-CLOSING-MAP-P0`
> 交通灯：YELLOW（刀后发现 RED）
> 刀型：Product Experience Closing MAP / Major Blade Prep
> 决策：`NOW — PREP ONLY`
> Runtime / Renderer / Authority / Gate：只读，禁止修改
> 审计基线：`f95c30dc7d59cc118dcaf02bff9cf97fb2063784`
> 主 Layer：Layer 4 Growth / Phase 3 Reality Adventure
> 保护：World、Identity、Relationship、Reality provenance
> Phase 4：`LOCKED`

---

## 一、唯一目标

冻结第一次成长闭环必须被用户明确感知的三个高光：

```text
1. 我做过什么
2. 它因此形成了什么
3. 同一生命如何记住了这件事
```

本刀不做全面视觉重构，不引入 AI、六维新模型、八卦人格或 Phase 4；只冻结产品因果、Presentation 契约、消费者边界、刀次与商业价值门禁。

---

## 二、最终裁决

```text
体验契约：
FROZEN

消费者清点：
CLOSED

Visual Major Blades：
NOT READY

最终出口：
RED — MIGRATION AUDIT REQUIRED
```

刀前假设需要依据正式生产消费者重新校准：

```text
原假设：
用户确认 Fact
→ 系统已经形成 Crystal
→ 用户只是没有看见形成

正式生产现状：
用户确认 Fact
→ Eligibility 被解析
→ 页面立即 handoff /reality
→ Production Formation Consumer = 0
→ Formation Receipt / Crystal 不由该链形成
```

因此当前主要缺口不是单纯“Formation 动画不够明显”，而是：

1. 正式生产链缺少消费 Eligibility 并形成 Crystal 的消费者；
2. Returning Body Imprint 仍由页面读取 `PersonalityRingLite` 派生镜像后自行选择与组装；
3. 正式成长事实与视觉事实之间尚未形成唯一、类型化、可恢复的投影契约。

继续直接进入视觉 Runtime 会把缺失的生产因果伪装成表现问题，并可能建立第二视觉真源。

---

## 三、只读证据与当前真实因果

### 3.1 Fact → Eligibility → Handoff

正式 `XinmaiLivedResponseReturnSurface` 当前执行：

```text
confirmLivedResponseFact(...)
↓
resolveCrystalEligibilityForFact(fact.fact)
↓
onRealityHandoff(...)
↓
/reality
```

关键事实：

- Eligibility 解析结果没有作为 Formation 输入继续消费；
- 页面不等待 Formation Receipt；
- 页面不消费 typed Formation Outcome；
- “这次真实回应已经被记住”早于任何正式 Crystal Formation；
- `/reality` handoff 因此不能证明 Crystal 已经形成。

### 3.2 Formation Authority 已存在，但生产消费者缺席

`formCrystalFromEligibility(...)` 已具备正式事务能力：

- 事务内复验 Eligibility、Fact、Choice、Identity 与 provenance；
- 确定性生成 Formation、Crystal 与 Reservation 引用；
- 同一 lineage 最多形成一份 Receipt；
- Eligibility 消费、Formation Receipt 与 formed Crystal 位于同一 Growth 事务；
- 事务确认后才执行派生镜像 Projection；
- Projection 失败只进入 `RETRYABLE`，不重复 Formation。

但仓库调用清点为：

```text
Production caller：0
Development Acceptance caller：1
```

唯一调用位于 `XinmaiLivedGrowthAcceptancePage`。开发 Acceptance 不能替代正式产品消费者。

### 3.3 当前 Body Imprint 路径

当前 Returning / Reality 路径使用：

```text
Canonical Formation Receipt
↓
PersonalityRingLite Projection
↓
localStorage derived mirror
↓
LaunchLab / RealityProductionRouteEntry 直接读取
↓
页面选择 latest entry（createdAt）
↓
页面组装 primitive memory key / source slot / SVG geometry
↓
Host / Canvas
```

这条路径存在四个问题：

1. 页面直接读取派生 Recovery Mirror；
2. Page 以 `createdAt` 选择“最新”痕迹，而非消费 canonical receipt ordering / fencing；
3. Renderer 输入是 primitive key / slot，不是正式 `BodyImprintVisualFact`；
4. `realLifeVisualSourceAdapter` 当前明确输出 `crystalImprint: null`。

`PersonalityRingLite` 可以继续作为 Archive 兼容镜像，但不能成为 Phase 3 Body Imprint 的正式视觉真源。

### 3.4 既存但不得复活的旧路径

- `CurrentCrystalEndStateFocus` 已被注释隔离，包含页面计时与旧 deposit surface；不得复活；
- `CrystalExperienceUIRuntime` 只在 Prototype Harness / Acceptance 资产中消费，不是生产 Authority；
- Renderer 的 DOM `data-*` 只可作为测试与观测镜像，不得反向生产成长事实；
- Phase 4 `PersonalityRingPage` 不得提前拥有 Eligibility、Formation 或 Body Imprint 资格。

---

## 四、阶段状态校准

```text
Lived Response Fact Authority：
CLOSED

Crystal Eligibility Authority：
CLOSED

Crystal Formation Transaction Capability：
ESTABLISHED

Crystal Formation Production Consumer：
OPEN / MISSING

Returning Body Imprint Typed Projection：
OPEN

Phase 3 Causal Closure：
REOPENED — PRODUCTION FORMATION CONSUMER MISSING

Phase 3 Experience Closure：
OPEN

Commercial Value Readiness：
PARTIAL

Phase 4：
LOCKED
```

这项校准不推翻已关闭的 Fact、Eligibility、Growth Transaction 或 Returning Provenance Authority；它只纠正正式端到端消费者链的完成度。

---

## 五、目标消费者图

```text
Lived Response Fact
↓
Crystal Eligibility Authority
↓ typed Eligibility Outcome
Production Formation Consumer
↓ Growth transaction complete
Formation Receipt + Crystal
├─ Crystal Formation Presentation Admission
├─ /reality Handoff Admission
└─ Canonical Body Imprint Projection Adapter
     ↓
Typed Body Imprint Visual Facts
     ↓
Host
     ↓
Renderer
```

冻结原则：

- Presentation 只能消费已确认 Authority Outcome；
- Renderer 只能消费 typed visual facts；
- Presentation 完成不能反向成立 Formation；
- Animation、Timer、DOM、页面布尔值与 `createdAt` 都不是 Formation / Imprint Authority；
- `/reality` handoff 不得绕过 Formation Consumer；
- Projection 失败不得触发第二次 Formation。

---

## 六、高光一：Crystal Formation Attribution

### 6.1 四类事实边界

| 资产 | 唯一语义 | 不代表 |
|---|---|---|
| Lived Response Fact | 用户确认本次现实中实际发生了什么 | Crystal 已形成 |
| Crystal Eligibility | 该 Fact 具备进入 Formation 的资格 | 形成成功、视觉完成 |
| Formation Receipt | 同一 Eligibility 已被唯一、正式消费并形成同一 Crystal | Projection 已完成、用户已看见 |
| Projection | 已形成 Crystal 的派生镜像/身体呈现状态 | Formation 真源 |

### 6.2 正式 Presentation Admission

目标链冻结为：

```text
Fact transaction complete
↓
Eligibility = ELIGIBLE
↓
Production Formation Consumer
↓
Formation transaction complete
↓
Receipt.status = FORMED
↓
Crystal Formation Presentation Admission
↓
用户看见并确认拥有
↓
/reality handoff
```

只有 `Formation Receipt.status = FORMED` 可以允许页面表达：

```text
“它已经形成。”
```

以下时点只能表达“正在确认”或真实失败：

- Fact 已保存；
- Eligibility 已解析；
- Formation request success；
- Renderer 开始动画；
- Watchdog 到时；
- Projection mirror 写入开始。

### 6.3 归因内容

形成高光必须同时显示或可读地关联：

- 本次 Choice 的现实微行动；
- 用户确认的结果类别：尝试 / 改变回应；
- 同一 Choice、Observation 与 Encounter lineage；
- 形成的同一 Crystal；
- 不把原始长文本或 AI 判断直接变成资格。

用户必须能够复述：

> 这不是点击奖励，不是痛苦奖励，也不是 AI 送礼；它来自我在现实中真实尝试或改变过一次回应。

### 6.4 Motion / Reduced Motion

| 模式 | 允许表现 | 共同成功事实 |
|---|---|---|
| Motion | 生命核心收束、能量成核、Crystal 形成、身体接纳 | 同一 confirmed Formation Receipt |
| Reduced Motion | 静态同体构图、明确 Crystal 出现、短距离明暗/形态变化 | 同一 confirmed Formation Receipt |

Reduced Motion 不能：

- 跳过归因；
- 直接 handoff；
- 依赖固定计时；
- 使用不同 Eligibility 或 Formation 语义。

### 6.5 刷新、中断与失败

| 情况 | 恢复语义 |
|---|---|
| Receipt 尚不存在 | 不显示已形成；允许安全重试 Formation |
| Receipt 已形成、Presentation 中断 | 恢复同一 Receipt 的静态“已形成”呈现，不再 Formation |
| Receipt 已形成、Projection `RETRYABLE` | 明确 Crystal 已形成，但身体显化暂不可用；只重试 Projection |
| Receipt 已形成、`/reality` handoff 失败 | 保留 Receipt，重试承接，不重复 Formation |
| stale / identity / lineage 失配 | `SAFE_WITHHELD`，不显示形成 |

Watchdog 只能报告失败，不得提交成功。

---

## 七、高光二：Returning Body Imprint

### 7.1 产品语义

Body Imprint 是：

> 同一星兽记住用户曾在现实中做出过回应的身体证据。

它不是：

- 装饰纹理；
- 第二只成长星兽；
- 皮肤、徽章、背包物品；
- AI 文案生成物；
- Phase 4 收藏系统。

### 7.2 唯一数据来源

目标 `BodyImprintVisualFact` 必须由唯一只读 Adapter 从以下正式资产派生：

```text
Canonical Formation Receipt
+ formed Crystal
+ Identity / Starbeast Continuity
↓
Typed Body Imprint Visual Fact
```

最低字段冻结为：

```text
semanticRole: XINMAI_BODY_IMPRINT_VISUAL_FACT
identityReferences
sourceReferenceId
formationReferenceId
crystalReferenceId
eligibilityReferenceId
livedResponseReferenceId
choiceActionIntentionReferenceId
formedAt
fencingToken
projectionState
primaryDimension / sourceSlot
crystalCopy
deterministicGeometryKey
state: AVAILABLE | PROJECTION_RETRYABLE | SAFE_WITHHELD
```

禁止放入：

- 页面状态；
- DOM 属性；
- 原始 Pressure 文本；
- AI 推测；
- 最新页面停留时间；
- `createdAt` 排序作为权威选择。

### 7.3 Returning 首屏层级

首次形成后 Returning 的前三秒认知顺序必须是：

```text
同一星兽
↓
同一生命核心
↓
新的身体留痕被局部聚焦
↓
该留痕与本次 Crystal / 现实回应关联
↓
恢复整体生命空间
```

允许：

- 局部聚焦；
- 形成前后短暂对照；
- 触碰回看来源；
- 声音与触觉作为确认辅助。

禁止：

- 5% 透明度造成无法识别；
- 新建第二星兽；
- 用关系名或文案冒充身体变化；
- 为了冲击破坏同一身体骨相；
- 把 Crystal 数量做成徽章墙。

### 7.4 多颗 Crystal

多颗 Crystal 只允许形成同体累积：

- canonical Receipts 决定存在性与顺序；
- 最新合法 Imprint 获得短暂聚焦；
- 旧 Imprint 退回安静、可回看的身体结构；
- 同一位置冲突由 deterministic geometry / formation reference 解决；
- 不按 mirror `createdAt` 猜测最新资产；
- 长期陈列、轨道与圣所继续属于 Phase 4。

### 7.5 降级

| 情况 | 降级 |
|---|---|
| 高性能 | 局部骨相、能量回流、微镜头与短触觉 |
| 中性能 | 稳定身体结构、局部高亮、有限粒子 |
| 低性能 | 静态 typed imprint、清晰位置与归因文本 |
| Reduced Motion | 静态前后关系、无大幅镜头与脉冲 |
| Projection retryable | 保留 Crystal 已形成事实，明确身体显化稍后恢复 |
| Visual Fact 不可信 | `SAFE_WITHHELD`，不伪造 Imprint |

---

## 八、高光三：First Growth Ownership & Next Loop

### 8.1 短暂拥有时刻

首次成长结束后冻结以下 Presentation 状态：

```text
FORMATION_PRESENTING
↓
FORMATION_FORMED_STATIC
↓
BODY_IMPRINT_REVEALED
↓
OWNERSHIP_ACKNOWLEDGED
↓
CONTINUATION_CHOICE
```

任一输入不可信：

```text
SAFE_WITHHELD
```

`OWNERSHIP_ACKNOWLEDGED` 只证明用户看见本次形成与同体留痕，不是 Growth Authority，也不改变 Crystal。

### 8.2 下一轮动作

拥有时刻完成后只提供：

- 稍后继续同行；
- 回到自己的生命空间；
- 用户主动选择继续探索。

禁止自动投放新的 Pressure、Choice 或商业提示。下一轮动机应来自：

- 想看看同一生命以后会怎样变化；
- 想继续积累真实经历；
- 想回到属于自己的生命世界。

不得来自：

- 连续签到；
- 倒计时焦虑；
- Crystal 数量攀比；
- 星兽衰败惩罚；
- 强制打开下一轮。

---

## 九、生产者—消费者裁决矩阵

| 资产 / 消费者 | 当前角色 | 裁决 | 目标边界 |
|---|---|---|---|
| Lived Response Fact Authority | 正式 Fact 真源 | KEEP | 只生产用户确认事实 |
| Crystal Eligibility Authority | 正式资格真源 | KEEP | 只生产 typed Eligibility |
| `XinmaiLivedResponseReturnSurface` | Fact 后解析 Eligibility 并直接 handoff | MIGRATE | 消费 typed Formation Outcome，禁止提前 handoff |
| `formCrystalFromEligibility` | 正式事务能力，仅 Acceptance 调用 | KEEP + ADAPT | 接入唯一 Production Formation Consumer |
| `CrystalFormationReceipt` | Canonical Formation 真源 | KEEP | Presentation / Imprint 唯一上游事实 |
| Personality Ring deposit adapter | Canonical → derived mirror | KEEP / ISOLATE | 只做兼容 Projection，不做视觉真源 |
| `PersonalityRingLite` localStorage | Archive 兼容镜像 | ISOLATE | 不决定 Phase 3 Formation / Imprint |
| `LaunchLab` direct mirror read | Page 选最新、组装 Imprint | MIGRATE / DELETE AUTHORITY | 只消费 typed Body Imprint Visual Fact |
| `RealityProductionRouteEntry` direct mirror read | Route 选历史 Crystal memory | MIGRATE / DELETE AUTHORITY | 由唯一 Adapter 注入 typed Visual Fact |
| `RealityProductionHost` | 转发 primitive memory | ADAPT | 只转发 typed visual contract |
| `RealityLifeUniverseCanvas` | 消费 key / slot 生成绘制输入 | ADAPT | 消费 typed Body Imprint Visual Fact |
| `lifeUniverseStarField` geometry | 纯确定性几何 | KEEP | 不读取 Storage / DOM，不成为 Authority |
| `realLifeVisualSourceAdapter` | 当前 `crystalImprint: null` | ADAPT | 只读接入 typed visual facts |
| `CurrentCrystalEndStateFocus` | 注释隔离的旧页面 deposit | DELETE / REJECT REUSE | 不复活 Timer 与 Page Authority |
| `CrystalExperienceUIRuntime` | Harness / Acceptance 资产 | ISOLATE | 不进入 Production Authority |
| `PersonalityRingPage` | 历史陈列候选 | DEFER | Phase 4 边界，不能生产 Eligibility |
| Renderer / DOM / data-* | 表现与观测 | REJECT AS AUTHORITY | 单向消费 typed facts |

---

## 十、原子迁移审计边界

下一刀必须审计并冻结一个无双权威的原子切换：

```text
接入 Production Formation Consumer
+
Fact/Eligibility 后不再提前 handoff
+
建立 typed Formation Presentation Admission
+
建立 canonical Body Imprint Visual Fact Adapter
+
切换 LaunchLab / Reality Route / Host / Canvas 消费者
+
移除 Page 对 PersonalityRingLite 的 Phase 3 真源读取
+
隔离 Acceptance / Legacy Formation UI
+
建立专属 Gate 与 forward SAFE_WITHHELD
```

不得形成以下中间态：

```text
Production Formation Consumer + Acceptance-only success path
```

或：

```text
Canonical Visual Fact + Page localStorage mirror authority
```

审计必须确认 Formation Consumer 与 Body Imprint 消费者切换是否需要同一原子 Runtime 提交。默认建议同一回滚单位，因为用户“已形成”与“刷新后同体仍记得”不可拆成两个可远程存在的真相。

### Forward SAFE_WITHHELD 目标

迁移失败时只允许：

- 暂停新的 Formation Presentation / handoff；
- 保留 Fact、Eligibility、Formation Receipt、Crystal 与 Archive；
- 已有 Receipt 可只读恢复；
- Body Imprint 不可信时安全扣留；
- 不恢复 Acceptance caller、旧 Timer、Page mirror authority；
- 不删除已形成 Crystal。

---

## 十一、后续刀次

### 前置红刀

```text
XINMAI-PHASE-3-CRYSTAL-FORMATION-
PRODUCTION-CONSUMER-AND-BODY-IMPRINT-
PROJECTION-ATOMIC-MIGRATION-AUDIT-P0

交通灯：RED
刀型：Migration Audit
决策建议：NOW — AUDIT ONLY
```

只有该审计与后续原子迁移关闭后，才进入三把体验刀：

### Blade A — Crystal Formation Attribution

- Receipt-confirmed Formation Presentation；
- 现实行动归因；
- Motion / Reduced Motion 同义；
- 中断、刷新与 Projection retry；
- 独立视觉回滚不改变 Formation Authority。

### Blade B — Returning Body Imprint Readability

- typed Body Imprint Visual Fact；
- 同一身体局部聚焦；
- 前后变化可读；
- 多 Imprint 同体累积；
- 独立回滚到清晰静态 Imprint。

### Blade C — First Growth Ownership & Next-loop Continuation

- 短暂拥有时刻；
- 稍后同行 / 主动继续；
- 不立即投放 Pressure；
- 独立回滚到克制静态 ownership 页面。

三刀不得合成一个不可回滚的视觉巨刀。

---

## 十二、商业价值边界

### 12.1 免费价值闭环

1.0 免费用户必须完整经历至少一次：

```text
Identity
→ Relationship
→ Reality Adventure
→ Real-world Action
→ Crystal Formation Attribution
→ Returning Body Imprint
```

Crystal 形成前、Body Imprint 可读前不得设置付费墙。

### 12.2 可评估的持续价值

只有免费闭环成立后，才允许评估：

- 更多持续 Encounter；
- 长期生命圣所；
- Crystal 与 Body Imprint 历史回看；
- 更丰富的声音、触觉与生命世界表现；
- 更长期的 Life Companion 连续性。

继续禁止：

- 付费生成 Crystal；
- 购买行动成功；
- 解锁“更好命运”；
- 付费解除星兽痛苦；
- 在用户脆弱时制造限时转化；
- 以稀有度、等级或数量攀比驱动付费。

### 12.3 当前商业裁决

```text
Commercial Value Readiness：
PARTIAL
```

原因：身份与生命连续性具有持续价值基础，但正式生产链尚未把“现实行动 → Crystal → 同体留痕”稳定交付为用户可拥有的体验。此时讨论订阅转化会过早。

---

## 十三、真实用户验收问题与指标

### 13.1 必须由真实用户回答

1. 这颗 Crystal 来自哪一次具体行动？
2. 你认为是“尝试过”还是“成功了”才让它形成？
3. Crystal 是系统奖励、AI 礼物，还是你的现实回应留下的结果？
4. Returning 第一眼能否指出星兽身体哪里发生了变化？
5. 你是否确认这是同一只星兽，而不是新皮肤或第二只星兽？
6. 你为什么愿意再回来一次？
7. 你认为持续使用的价值是连续生命世界，还是一次性 AI 文案？

### 13.2 关闭指标

- Crystal 行动归因正确率；
- “尝试而非成功”理解率；
- Returning Body Imprint 三秒识别率；
- 同一星兽识别率；
- Formation 后主动回访意愿；
- 次日 / 七日主动回访；
- “奖励系统 / 打卡工具”误判率；
- 免费首轮完整价值感；
- 持续生命连续性付费意愿。

任何指标不得通过红点、倒计时或惩罚性提醒提升。

---

## 十四、真实浏览器验收矩阵

| 路径 | 必须证明 |
|---|---|
| Fact confirmed | 不提前宣称 Crystal formed |
| Eligibility withheld | 不启动 Formation Presentation |
| Eligibility eligible | 只由正式 Production Consumer 提交 |
| Formation transaction success | Receipt / Crystal 各一，成功晚于 transaction complete |
| Formation abort | 无伪成功、无 handoff |
| Projection retryable | 不重复 Formation，真实表达显化待恢复 |
| Presentation refresh | 恢复同一 Receipt，不重播为第二次 Formation |
| `/reality` handoff failure | 重试承接，不重复 Fact / Formation |
| Returning | 同一 Identity / Starbeast / Crystal / Imprint |
| Multi-Crystal | 同体累积，不按 mirror `createdAt` 猜测 |
| Multi-tab | 同 Eligibility 最多一个 Receipt / Crystal |
| Motion | 真实 Formation outcome 后呈现 |
| Reduced Motion | 同一 Receipt 的静态同体 outcome |
| Low performance | 静态 Imprint 仍清晰可读 |
| Direct URL / stale identity | 不补造 Formation / Imprint |
| Phase 4 consumers | 不生产或改写 Eligibility / Imprint |

---

## 十五、刀后交通灯扫描

### RED

```text
Production Formation Consumer：0
Page / Route direct derived-mirror reads：存在
Typed canonical Body Imprint projection：缺失
```

处置：进入独立 Migration Audit。该红灯不吞入本 MAP，也不成为绕过本 MAP 的理由。

### YELLOW

- Returning Imprint 当前层级与透明度不可读；
- Formation Attribution、Ownership 与下一轮动机需要独立视觉 Major Blades；
- Commercial Value Readiness 仍为 PARTIAL。

处置：待红色因果迁移关闭后按 Blade A / B / C 分刀。

### GREEN

- `lifeUniverseStarField` 确定性几何可复用；
- 现有 Formation Receipt / formed Crystal typed schema 可复用；
- Projection retryable 语义可复用；
- 既有 Identity、Relationship 与 Returning provenance 无需改造。

---

## 十六、关闭声明

```text
XINMAI-PHASE-3-REALITY-ADVENTURE-
EXPERIENCE-AND-COMMERCIAL-VALUE-
CLOSING-MAP-P0：
CLOSED / PASS

MAP Final Exit：
RED — MIGRATION AUDIT REQUIRED

Phase 3 Causal Closure：
REOPENED — PRODUCTION FORMATION CONSUMER MISSING

Phase 3 Experience Closure：
OPEN

Commercial Value Readiness：
PARTIAL

Visual Runtime：
DEFER

Phase 4：
LOCKED
```

本 MAP 冻结了“我做过什么 → 它形成什么 → 同一生命如何记住”的正式体验契约，但没有用概念图、动画或页面镜像掩盖生产消费者缺口。下一步必须先关闭 Crystal Formation 与 Body Imprint 的单一事实链，再开始视觉表现施工。
