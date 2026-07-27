# XINMAI LIFE WHISPER PRESSURE SEED CONSUMER MAPPING P0

## 文档定位

- 项目：XINMAI / 星脉之境
- 底层系统：GUANYAO Life Engine / 观爻生命引擎
- 文档编号：`XINMAI-LIFE-WHISPER-PRESSURE-SEED-CONSUMER-MAPPING-P0`
- 模式：Life Whisper → Pressure Seed 消费关系映射审计
- 刀型：`MAP`
- 阶段：Phase 1 → Phase 2，邻接验证 Phase 3
- 状态：`CONSUMER MAPPING COMPLETE`
- 审计日期：`2026-07-28`
- 工程影响：无

本协议只记录现有 Runtime、真实消费者、缺失桥梁与阶段决策。

本协议：

- 只新增审计文档；
- 不修改代码；
- 不新增 Engine；
- 不新增数据模型；
- 不新增 AI Runtime；
- 不改变 Pressure Seed；
- 不改变 Six Dimension；
- 不改变 StarBeast 身份；
- 不改变现有 Runtime；
- 不授权 Life Whisper 实施；
- 不将协议状态描述为已实现状态。

---

## 一、Stage Control Card

```text
【Stage Control Card】

当前 Phase：
Phase 1 → Phase 2

邻接验证：
Phase 3 Reality Adventure

阶段状态：
MAPPED

当前 A 级主线：
First Encounter → Life Companion

阶段目标：
生命身份建立 → 生命关系建立

本刀类型：
MAP

本刀主影响 Layer：
Layer 3 Relationship

本刀次影响 Layer：
Layer 4 Growth

是否跨 Phase：
YES

来源 Phase：
Phase 2 Relationship

目标 Phase：
Phase 3 Reality

输入：
用户向生命留下的一句真实表达

输出：
关系回应 + 可进入既有 Reality 候选确认链的开放上下文

消费者：
StarBeast Response
Pressure Seed Candidate Source
Reality Event
Six Dimension
Gravity

是否需要 Migration Audit：
NO

本刀是否实施：
NO

施工决定：
MAP
```

---

## 二、执行摘要

本次审计得到六项核心结论。

### 2.1 Life Whisper 不需要新 Engine

Life Whisper 的产品职责是：

> 用户向自己的生命留下一句真实表达。

它不是：

- 现实分类器；
- 压力推理器；
- AI 对话系统；
- 尘遮判断器；
- 星兽控制器；
- 人格分析器。

因此不需要：

- Life Whisper Engine；
- Whisper AI；
- 第二套 Pressure Seed；
- 第二套 Reality Event；
- 新的 Six Dimension 模型。

### 2.2 Life Whisper 当前没有生产 Runtime

现有 `src/` 中没有：

- Life Whisper 输入组件；
- Life Whisper 提交事件；
- Life Whisper 会话状态；
- Life Whisper 到 Pressure Seed 的适配器；
- Life Whisper 原声存储；
- Life Whisper 到 StarBeast Response 的绑定；
- Life Whisper 命名输入。

当前状态：

```text
Life Whisper
○ 仅协议
```

### 2.3 Pressure Seed 生产链真实存在

现有 Runtime 已具备：

```text
Pressure Seed Matrix V2
↓
候选来源
↓
三枚跨场候选
↓
连续游标
↓
用户明确认出
↓
SelectedPressureSeedContext
↓
Gravity Readiness
```

但它当前接收的是：

- `sourceReferenceId`；
- 年龄段；
- 目录路由角色；
- 候选游标；
- 已排除候选 ID。

它当前不接收：

- 用户自由文本；
- Life Whisper；
- AI 语义结果；
- 人格推断。

### 2.4 Life Whisper 不能直接成为 Pressure Seed 因果输入

现有 `guanyaoPressureSeedSceneBindingService` 明确冻结：

> Pressure State Input → Pressure Seed Matrix → Pressure Seed Output。

并明确：

> External semantic systems are never causal inputs.

因此当前安全关系不是：

```text
Life Whisper 文本
↓
自动生成 Pressure Seed
```

而是：

```text
Life Whisper
↓
建立关系并触发进入现实的意愿
↓
既有 Pressure Seed 候选开始靠近
↓
用户明确认出
↓
现实理解成立
```

### 2.5 没有第二个 Pressure Seed Engine，但存在第二条消费者路径

审计未发现第二个独立 Pressure Seed Engine。

正式 `/reality` 路由消费：

```text
Matrix V2
↓
Production Candidate Source
↓
Production Pressure Seed Consumer V2
↓
用户认出
↓
StarBeast Body Response
↓
Gravity
```

但当前 `LaunchLab` 仍保留：

```text
Pressure Seed Axis
↓
Deterministic Candidate
↓
buildSelectedPressureSeedContext
↓
writeSelectedPressureSeedContext
↓
直接进入 /dynamics
```

因此准确结论是：

> 当前没有第二套压力引擎，但有一条绕过正式 Reality V2 的旧消费者旁路。

Life Whisper 不得形成第三条路径。

### 2.6 当前决策只能是 MAP

原因：

- Life Whisper Runtime 不存在；
- Life Whisper 到关系回应的绑定不存在；
- Life Whisper 到 Reality 的桥梁不存在；
- Pressure Seed 不支持自由文本输入；
- Phase 2 尚在关系闭环主线；
- Phase 3 当前只允许消费者 MAP；
- LaunchLab 旁路尚未完成迁移决策。

最终决策：

```text
MAP
```

不是：

- NOW；
- Major Blade；
- Implementation。

---

## 三、审计范围

### 3.1 Life Whisper

检查：

- 输入组件；
- 输入状态；
- 提交行为；
- 用户原声；
- 关系回应；
- 命名关系；
- Reality 交接。

### 3.2 Pressure Seed

检查：

- Matrix；
- Scene Binding；
- Candidate Source；
- Candidate Bundle；
- Cursor；
- Capture Adapter；
- Production Consumer；
- Presentation；
- Selected Context；
- Persistence。

### 3.3 Reality Event

检查：

- 现实进入；
- 候选确认；
- 当前事件语义；
- 历史与当前边界；
- Reality 到 Gravity 交接。

### 3.4 Six Dimension

检查：

- Selected Pressure Context 输入；
- 六空间顺序；
- 进度适配；
- Seed-specific Projection；
- fallback 状态。

### 3.5 StarBeast Response

检查：

- 同一核心；
- 同一身体；
- Reality Pressure Projection；
- 生命天气；
- 用户靠近；
- Gravity 入口。

### 3.6 后续链路

检查：

- Gravity；
- AI Reflection；
- Choice；
- Crystal；
- Archive。

### 3.7 重复链路

检查：

- 正式 `/reality`；
- LaunchLab Pressure Seed Axis；
- prototype harness；
- legacy Scene；
- 旧 V1 Pressure Consumer。

---

## 四、审计证据范围

本次主要读取以下现有工程资产。

### Pressure Seed 类型与目录

- `src/types/guanyaoPressureSeed.ts`
- `src/types/realityPressureSeedCaptureContract.ts`
- `src/types/realityProductionPressureSeedConsumer.ts`
- `src/types/primaryPetal.ts`
- `src/data/guanyaoPressureSeedMatrix.ts`
- `src/data/guanyaoPressureSeedSixSpaceProjectionRegistry.ts`

### Pressure Seed 消费链

- `src/services/guanyaoPressureSeedSceneBindingService.ts`
- `src/services/realityPressureSeedCandidateSource.ts`
- `src/services/realityPressureSeedCaptureAdapter.ts`
- `src/services/realityProductionPressureSeedConsumer.ts`
- `src/services/realityPressureCandidateDeliveryOrchestration.ts`
- `src/services/realityPressureSeedContinuationContext.ts`
- `src/services/realityProductionPressureHostInputContract.ts`

### Reality 生产入口

- `src/pages/RealityProductionRouteEntry.tsx`
- `src/components/RealityProductionHost.tsx`
- `src/components/RealityPressureSeedPresentation.tsx`
- `src/components/RealityLifeUniverseCanvas.tsx`

### Gravity 与六维

- `src/pages/GravityPage.tsx`
- `src/services/guanyaoDynamicsInputReadinessAdapter.ts`
- `src/services/guanyaoCurrentHexagramFormationAdapter.ts`
- `src/services/guanyaoDynamicsSixSpaceProgressAdapter.ts`
- `src/services/guanyaoCosmicBotanicsRuntimeEngine.ts`
- `src/runtime/guanyaoRuntimeEngine.ts`

### Reflection、Choice 与 Crystal

- `src/components/XinmaiLifeReflectionGuide.tsx`
- `src/services/choiceExperienceUIRuntime.ts`
- `src/services/crystalExperienceUIRuntime.ts`

### 身份关系与旧路径

- `src/pages/GenesisProductionExperiencePage.tsx`
- `src/services/genesisProductionRecognitionRealityEntry.ts`
- `src/pages/LaunchLab.tsx`
- `src/pages/ScenePage.tsx`
- `src/components/RealityPressurePresentation.tsx`
- `src/services/realityProductionPressureConsumer.ts`
- `src/pages/PersonalStarBeastWebGLPrototypeHarness.tsx`

---

## 五、目标链路与实际链路

### 5.1 产品目标链路

```text
用户表达
↓
Life Whisper
↓
Pressure Seed
↓
Reality Event
↓
Six Dimension
↓
Gravity
↓
Choice
↓
Crystal
```

这条链路是产品因果。

它不能被理解为：

> 用户文本依次写入八个模型。

### 5.2 当前正式生产链

实际存在：

```text
Genesis Recognition
↓
Reality Route Authorization
↓
Pressure Candidate Activation
↓
Pressure Candidate Request
↓
Pressure Seed Matrix V2
↓
Cross-field Candidate Bundle
↓
Reality Pressure Seed Presentation
↓
用户明确认出一枚候选
↓
Reality Pressure Seed Capture Adapter
↓
SelectedPressureSeedContext
↓
StarBeast 同体生命天气回应
↓
用户靠近生命变化位置
↓
写入 Dynamics Handoff
↓
Gravity / Six Space
```

### 5.3 当前缺口

正式链之前缺少：

```text
Life Whisper 输入
↓
第一次关系回应
↓
用户主动进入 Reality
```

正式链内部缺少：

```text
Life Whisper 原声
↓
非权威候选理解
```

但根据现有 Pressure Seed 因果边界，这一缺口不能用“文本自动分类为 Seed”填补。

---

## 六、Life Whisper 定位审计

### 6.1 冻结定义

Life Whisper 是：

> 用户向自己的生命留下一句真实表达。

### 6.2 输入

允许：

#### 事件表达

例如：

> 老板今天批评我。

#### 情绪表达

例如：

> 最近很累。

#### 模糊表达

例如：

> 不知道为什么烦。

### 6.3 输出

Life Whisper 的直接输出只能是：

```text
用户生命原声
```

不是：

- Pressure Seed；
- Reality Event 结论；
- 尘遮；
- Gravity；
- 人格类型；
- AI 建议；
- StarBeast 状态指令。

### 6.4 第一消费者

第一消费者必须是：

```text
StarBeast Relationship Response
```

原因：

Life Whisper 首先发生在 Phase 2。

用户第一感受必须是：

> 它听见了。

而不是：

> 系统理解了我的问题。

### 6.5 第二消费者

第二消费者是：

```text
Reality Entry Intent
```

Life Whisper 可以成为：

- 用户愿意进入现实同行的原因；
- Reality 开始靠近的关系上下文；
- 用户原声的来源证据。

但不能直接成为：

- Reality Event 最终事实；
- Pressure Seed 自动选择；
- Gravity 输入。

### 6.6 Runtime 现状

搜索现有生产代码：

- 没有 Life Whisper 输入；
- 没有自由文本提交；
- 没有 Life Whisper 类型；
- 没有 Life Whisper Session；
- 没有 Life Whisper Consumer；
- 没有 Life Whisper Persistence；
- 没有 Life Whisper → StarBeast 绑定；
- 没有 Life Whisper → Reality Handoff。

状态：

```text
○ 仅协议
```

---

## 七、Pressure Seed 消费审计

### 7.1 Pressure Seed 当前职责

Pressure Seed 回答：

> 哪一幕现实正在靠近这个生命。

它不是：

- Life Whisper 的同义词；
- 用户原声；
- 心理诊断；
- 尘遮；
- Gravity 结论。

### 7.2 当前输入

正式 Candidate Source 输入：

```text
sourceExperienceMode
sourceReferenceId
candidateCursor
excludedCandidateReferenceIds
ageSegment
ageSegmentRole
```

当前没有：

```text
whisperText
userUtterance
semanticIntent
aiInterpretation
```

### 7.3 当前输出

Candidate Source 输出：

```text
RealityPressureSeedCandidateSourceContext
```

其中包含：

- Candidate Bundle；
- 三枚前台候选；
- 内部 Candidate Records；
- Bundle Reference；
- Next Cursor；
- Matrix V2 Provenance；
- User Recognition Required；
- No Automatic Selection。

### 7.4 当前确认

用户必须主动触发：

```text
PRESSURE_SEED_RECOGNIZE
```

系统才允许生成：

```text
SelectedPressureSeedContext
```

并打开：

```text
gravityReadiness = READY
```

### 7.5 当前安全边界

现有 Runtime 已冻结：

- no new Pressure Engine；
- no automatic selection；
- no default candidate；
- source reference continuity；
- bundle reference continuity；
- explicit user recognition；
- no Gravity execution inside consumer；
- no Choice execution；
- no Crystal execution。

### 7.6 目录覆盖限制

当前 Matrix V2 生产目录仅激活：

```text
ESTABLISHING
```

六个 Pressure Field 每个十五枚：

```text
6 × 15 = 90
```

类型系统定义了五个年龄阶段，但当前 `PRESSURE_SEED_AGE_GROUPS` 只包含：

```text
ESTABLISHING
```

非该年龄段不会静默 fallback。

因此：

> Pressure Seed 生产链真实存在，但全年龄产品覆盖并未完成。

### 7.7 Runtime 状态

```text
△ 部分存在
```

拆分：

- Candidate / Capture / Consumer Runtime：`✓`
- Life Whisper 输入消费：`○`
- 全年龄目录覆盖：`△`

---

## 八、Life Whisper 与 Pressure Seed 的正确关系

### 8.1 错误关系 A

```text
用户输入一句话
↓
字符串匹配
↓
自动选中 Pressure Seed
```

问题：

- 用户失去确认权；
- 违反 no automatic selection；
- 违反外部语义非因果输入；
- 模糊表达被误判；
- Life Whisper 变成分析框。

### 8.2 错误关系 B

```text
用户输入一句话
↓
AI 直接命名尘遮
↓
StarBeast 改变
```

问题：

- 跳过 Reality；
- 跳过用户确认；
- 跳过 Six Dimension；
- 跳过 Gravity；
- 直接把候选理解变成生命事实。

### 8.3 错误关系 C

```text
用户输入一句话
↓
新增 Whisper Pressure Engine
↓
生成第二套 Reality Event
```

问题：

- 重复建模；
- 破坏已有 Pressure Seed；
- 新增第三条现实消费路径；
- 当前 A 主线失焦。

### 8.4 正确关系

```text
用户向生命表达
↓
StarBeast 做第一次关系回应
↓
用户决定继续同行
↓
进入既有 Reality
↓
既有 Pressure Seed 候选靠近
↓
用户认出哪一幕贴近自己
↓
现实理解成立
```

### 8.5 “Pressure Seed 消费 Life Whisper”的准确语义

Pressure Seed 不是消费：

> Life Whisper 的文本结论。

Pressure Seed 消费：

> Life Whisper 打开的现实同行意图与用户确认机会。

因此 Life Whisper 是：

```text
Reality 的自然入口
```

而不是：

```text
Pressure Seed 的自动参数
```

---

## 九、Reality Event 关系审计

### 9.1 产品定义

Reality Event 回答：

> 现实中发生了什么。

### 9.2 当前实际承载

现有 Runtime 没有独立的 `RealityEvent` 生产模型。

当前由：

```text
用户认出的 Pressure Seed
↓
SelectedPressureSeedContext
```

承担当前现实上下文。

它包含：

- selectedPressureSeedId；
- surface；
- shell；
- pressureField；
- pressureNature；
- primaryRelation；
- matrixCode；
- tags；
- mappingHint；
- pressureIntensity；
- pressureConfidence。

### 9.3 当前语义偏差

产品期望：

```text
Life Whisper 原声
↓
候选理解
↓
用户确认
↓
Reality Event 成立
```

当前 Runtime：

```text
预置现实片段
↓
用户认出
↓
SelectedPressureSeedContext 成立
```

因此：

- 用户确认真实存在；
- 现实候选真实存在；
- 用户原声缺失；
- Life Whisper 来源缺失；
- “不完全是”后的开放修正尚未进入 Reality。

### 9.4 Runtime 状态

```text
△ 部分存在
```

---

## 十、Six Dimension 消费审计

### 10.1 当前输入

Gravity 的 Input Readiness 要求：

```text
selectedPressureSeedContext
+
motherCodeProfile
```

没有 Pressure Context：

```text
PRESSURE_CONTEXT_MISSING
```

没有 Mother Context：

```text
MOTHER_CONTEXT_MISSING
```

### 10.2 当前转换

Selected Pressure Seed 被转换为：

```text
PressureSeed
↓
PressureField
↓
CurrentHexagramProfile
```

并进入：

- 六空间顺序；
- 当前空间；
- 已完成空间；
- 节点状态；
- StarBeast Feedback；
- Choice / Crystal 后续。

### 10.3 六空间 Runtime

现有顺序：

```text
body
emotion
thought
action
memory
goal
```

产品语义对应：

```text
身体
情绪
思维
行动
记忆
动机
```

### 10.4 Seed-specific Projection 覆盖

当前 `GUANYAO_PRESSURE_SEED_SIX_SPACE_PROJECTION_REGISTRY` 只有一枚显式 Seed Projection。

其他 Seed 使用：

```text
buildFallbackPressureSeedSixSpaceProjection
```

通用 fallback 文案包括：

> 这股压力正在进入当前空间。

> 旧反应正在试图接管。

因此：

- 六空间运行机制存在；
- 顺序与进度存在；
- 具体 Seed 的六维生命痕迹覆盖不足；
- 当前不是完整的“每枚 Seed 六维显影”。

### 10.5 Runtime 状态

```text
△ 部分存在
```

拆分：

- Six Space Progress Runtime：`✓`
- Seed-specific Six Dimension Projection：`△`

---

## 十一、StarBeast Response 消费审计

### 11.1 当前输入

StarBeast 当前现实回应消费：

```text
selectedPressureSeedContext
```

### 11.2 当前转换

```text
SelectedPressureSeedContext
↓
adaptRealLifeVisualSource
↓
Genesis Reality Pressure Projection
↓
RealityLifeUniverseCanvas
```

### 11.3 当前表现

现有 Reality Canvas 已保持：

- 同一 Genesis Visual Source；
- 同一 sourceReferenceId；
- 同一生命核心；
- 同一身体；
- 当前 Reality Pressure Projection；
- 生命天气；
- Reality Fragment 进入身体位置；
- 用户靠近生命变化位置；
- 分析阶段尚未开始。

### 11.4 当前边界

现有表现明确：

- `SAME_CORE_SAME_BODY_SAME_LIFE`；
- `CURRENT_RECOGNIZED_REALITY_ONLY`；
- `FRAGMENT_ENTERING_SAME_LIFE`；
- `NOT_STARTED` analysis；
- no second core；
- no reward burst。

### 11.5 Life Whisper 缺口

StarBeast 已能回应：

```text
被确认的 Pressure Seed
```

但尚不能回应：

```text
Life Whisper 原声
```

因此：

```text
StarBeast Reality Response
✓ 已存在

Life Whisper First Response Binding
○ 仅协议
```

本审计要求的 `StarBeast Response` 综合状态：

```text
✓ 已存在 Runtime
```

前提：

> 此处的 ✓ 指已有 Pressure Seed 驱动的同体回应，不代表 Life Whisper 已接入。

---

## 十二、Relationship Naming 审计

### 12.1 产品定义

Relationship Naming 指：

> 用户为自己的生命伙伴留下可选称呼。

它不是：

- 二十八宿命名；
- 四象名称；
- AI 的“命名保护模式”；
- Reflection 中的 Identify；
- Mother Code userFacingName；
- Crystal assetName。

### 12.2 当前代码证据

现有代码存在大量“命名”语义，但未发现：

- StarBeast 用户命名输入；
- user-given companion name；
- 命名确认；
- 命名持久化；
- 命名恢复；
- 天地之名与用户之名的双重展示。

### 12.3 Runtime 状态

```text
○ 仅协议
```

---

## 十三、Gravity、Reflection、Choice、Crystal 审计

这些能力不属于本刀实施范围，但必须确认上游输出的消费者。

### 13.1 Gravity

现有：

- Dynamics Input Context；
- Pressure Context Readiness；
- Mother Context Readiness；
- Current Hexagram Formation；
- Six Space Progress；
- Inner View；
- 保护方式理解。

状态：

```text
✓ 核心 Runtime 存在
```

边界：

当前不深化。

### 13.2 AI Reflection

现有：

- Mirror；
- Identify；
- Validate；
- Shift；
- 三次靠近；
- Confirm / Self Name / Pause；
- 候选而非结论语言。

但当前组件明确：

```text
data-xinmai-ai-claim="NONE"
```

即：

- Reflection 交互与语言 Runtime 存在；
- 真实 AI 生成 / 记忆 /推理 Runtime 不在本组件中。

状态：

```text
△ 部分存在
```

### 13.3 Choice

现有 Choice UI Runtime：

- response gap；
- alternative response；
- user confirmation；
- no recommended action；
- no best choice；
- no score；
- no Crystal execution inside Choice。

状态：

```text
△ 部分存在
```

原因：

Runtime 存在，但当前阶段为 DEFER，且与 Life Whisper 无直接消费者关系。

### 13.4 Crystal

现有：

- Crystal UI Runtime；
- transformation reference；
- life imprint；
- Crystal presence；
- future carry；
- existing adapters and Archive consumers。

状态：

```text
△ 部分存在
```

原因：

资产存在，但 Life Whisper → Reality → Choice → Crystal 的完整来源链尚未由本次审计验证。

---

## 十四、完整输入—输出—消费者映射

| 生命机制 | 当前输入 | 当前输出 | 直接消费者 | Runtime |
|---|---|---|---|---|
| Life Whisper | 用户自由表达 | 用户生命原声 | 应先给 StarBeast Relationship | `○` |
| First Response | Life Whisper 原声 | 克制生命回应 | Relationship / Reality Intent | `○` 绑定缺失 |
| Pressure Candidate Source | source reference、年龄、cursor、exclude IDs | 三枚候选 Bundle | Pressure Seed Presentation | `✓` |
| Pressure Seed Recognition | 用户明确选择候选 | SelectedPressureSeedContext | StarBeast、Gravity | `✓` |
| Reality Event | 被认出的现实片段 | 当前现实上下文 | Six Dimension / StarBeast | `△` |
| Six Dimension | SelectedPressureSeedContext | 六空间痕迹 | Gravity / Reflection | `△` |
| StarBeast Response | SelectedPressureSeedContext + Visual Source | 同体生命天气回应 | Inner View / User | `✓` |
| Gravity | Pressure Context + Mother Context | 保护方式与惯性空间 | Reflection / Choice | `✓` |
| AI Reflection | Gravity State + User Agency | 候选理解 | Choice | `△` |
| Choice | 觉察空间 + 用户确认 | 新回应 | Crystal | `△` |
| Crystal | 被确认的新回应 | 生命印记 | Archive / Sanctuary | `△` |
| Relationship Naming | 用户可选称呼 | 关系名 | First Encounter / Return | `○` |

---

## 十五、Runtime 证据总表

按本刀指定格式：

```text
✓ 已存在 Runtime
△ 部分存在
○ 仅协议
```

### Life Whisper

```text
○ 仅协议
```

证据：

- 无输入组件；
- 无提交事件；
- 无消费者；
- 无持久化；
- 无星兽绑定。

### Pressure Seed

```text
△ 部分存在
```

证据：

- `✓` Matrix V2；
- `✓` Production Candidate Source；
- `✓` Cursor / exclusion；
- `✓` explicit user recognition；
- `✓` capture adapter；
- `✓` Production Consumer V2；
- `✓` SelectedPressureSeedContext；
- `○` Life Whisper 消费；
- `△` 年龄目录仅 ESTABLISHING。

### Reality Event

```text
△ 部分存在
```

证据：

- `✓` 当前用户认出上下文；
- `✓` Reality Route；
- `✓` Selected Context → Gravity；
- `○` Life Whisper 原声来源；
- `○` 独立 Reality Event 用户确认语义层。

### Six Dimension

```text
△ 部分存在
```

证据：

- `✓` 六空间顺序与进度；
- `✓` Gravity 消费；
- `△` 每枚 Seed 的具体投影覆盖；
- 未覆盖 Seed 使用 generic fallback。

### StarBeast Response

```text
✓ 已存在 Runtime
```

证据：

- Reality Pressure Projection；
- same source reference；
- same core；
- same body；
- current reality life weather；
- body approach；
- dedicated response gate PASS。

限制：

- 只响应已认出的 Pressure Seed；
- 尚未响应 Life Whisper。

### Relationship Naming

```text
○ 仅协议
```

证据：

- 无用户命名输入；
- 无命名确认；
- 无命名持久化；
- 无回归恢复。

---

## 十六、新用户消费路径审计

### 16.1 目标路径

```text
生命坐标
↓
星兽相遇
↓
Life Whisper
↓
星兽第一次回应
↓
关系建立
↓
用户决定同行
↓
Reality
```

### 16.2 当前路径

```text
生命坐标
↓
Genesis StarBeast
↓
用户确认“我认出它了”
↓
用户确认进入 Reality
↓
Pressure Seed 候选
```

### 16.3 当前缺口

- 没有 Life Whisper；
- 没有自由表达；
- 没有表达后的第一次回应；
- 没有可选命名；
- Recognition 到 Reality 已存在，但关系层仍较薄。

### 16.4 阶段结论

新用户 Life Whisper 应留在 Phase 2。

顺序必须是：

```text
表达
↓
生命回应
↓
关系稳定
↓
再进入 Reality
```

禁止：

```text
表达
↓
立即出现三枚 Pressure Seed 候选
```

否则用户第一感受会从：

> 它听见了我。

退化为：

> 系统开始分析我。

---

## 十七、老用户消费路径审计

### 17.1 目标路径

```text
返回生命世界
↓
同一 StarBeast
↓
生命天气
↓
Life Whisper
↓
新的 Reality
↓
生命同行
```

### 17.2 当前路径

Returning Identity 已能：

```text
LaunchLab
↓
恢复同一 Visual Continuity
↓
进入 /reality
↓
开始新的 Pressure Seed 候选
```

### 17.3 当前缺口

- 老用户回归后没有 Life Whisper 输入；
- 用户无法用自己的原声开启新现实；
- 新现实目前从预置候选开始；
- 历史痕迹与当前现实边界已存在。

### 17.4 阶段结论

老用户 Life Whisper 可以作为：

> 新 Reality Encounter 的用户发起动作。

但仍不能：

- 自动恢复旧 Pressure；
- 自动选择 Seed；
- 用旧经历覆盖当前；
- 直接进入 Gravity。

---

## 十八、重复现实理解链审计

### 18.1 正式生产链

活动路由：

```text
/reality
```

消费者：

- `RealityProductionRouteEntry`
- `RealityProductionHost`
- `RealityPressureSeedPresentation`
- `RealityProductionPressureSeedConsumer`
- `RealityPressureSeedCaptureAdapter`

特征：

- V2；
- explicit recognition；
- continuous bundle；
- source continuity；
- StarBeast 同体回应；
- user approach before Gravity。

### 18.2 LaunchLab 旁路

`LaunchLab` 当前仍包含：

- `PRESSURE_SEED_AXIS`；
- deterministic pressure candidates；
- `buildSelectedPressureSeedContext`；
- `writeSelectedPressureSeedContext`；
- 直接导航 `/dynamics`。

该路径：

- 复用同一 Matrix / Scene Binding；
- 不是第二个 Engine；
- 但绕过正式 Reality V2；
- 绕过 Reality StarBeast Response；
- 绕过 Production Capture Session；
- 绕过正式 Candidate Bundle provenance。

状态：

```text
△ 条件性活动旁路
```

### 18.3 Prototype / Legacy 资产

`RealityPressurePresentation` 当前由：

```text
PersonalStarBeastWebGLPrototypeHarness
```

消费。

它不是正式 `/reality` 的活动 UI。

旧 `realityProductionPressureConsumer` 仍存在源码，但正式 Host 明确：

```text
v1PressureConsumerForbidden: true
v2PressureSeedPresentationOnly: true
```

`ScenePage` 仍包含直接 Seed → Dynamics 逻辑，但 `/scene` 当前被重定向。

### 18.4 精确结论

回答：

> 是否存在第二套现实理解链？

答案：

```text
没有第二个活动 Pressure Seed Engine。

存在一条 LaunchLab 直接消费旁路。

存在 prototype / legacy 代码资产，但正式 /reality 已隔离 V1。
```

### 18.5 迁移要求

未来 Life Whisper Major Blade 之前必须先决定：

```text
LaunchLab Pressure Seed Axis
KEEP / ISOLATE / MIGRATE / REMOVE FROM ACTIVE FLOW
```

本 MAP 不做该决定。

但冻结：

> Life Whisper 不得接入 LaunchLab 旁路，也不得创建第三条 Reality 链。

---

## 十九、Stage Fit Check

### 19.1 用户参与

Life Whisper 产品能力是否增强用户参与？

```text
是
```

但 Runtime 是否已经实现？

```text
否
```

### 19.2 世界回应

现有世界是否能在 Pressure Seed 被认出后回应？

```text
是
```

现有世界是否能在 Life Whisper 提交后回应？

```text
否
```

### 19.3 生命关系

Life Whisper 是否服务 Phase 2 关系建立？

```text
是
```

当前是否已经完成该关系回路？

```text
否
```

### 19.4 是否提前进入 Phase 3

如果 Life Whisper 提交后立即显示 Pressure Seed 候选：

```text
是，会提前进入 Phase 3。
```

如果先由 StarBeast 回应，用户再主动进入 Reality：

```text
否，是合法的 Phase 2 → Phase 3 桥梁。
```

### 19.5 是否提前进入 Phase 4

当前 MAP：

```text
否
```

本刀不触发：

- Choice；
- Crystal；
- Archive；
- Growth claim。

---

## 二十、决策结果

### 20.1 本刀决策

```text
MAP
```

### 20.2 Life Whisper 新系统决策

```text
REJECT
```

拒绝：

- Life Whisper Engine；
- Whisper AI；
- 新 Pressure Engine；
- 新 Reality Classifier；
- Life Whisper 直接 StarBeast 状态控制。

### 20.3 现有 Pressure Seed 决策

```text
KEEP
```

保留：

- Matrix V2；
- Candidate Source；
- Cross-field Bundle；
- Cursor；
- explicit recognition；
- Capture Adapter；
- Production Consumer；
- Selected Context；
- Gravity Handoff。

### 20.4 Phase 2 关系回路决策

```text
MAP COMPLETE
IMPLEMENTATION DEFERRED
```

原因：

- 当前 MAP 已确认消费者；
- 但 Stage Control 只允许 Phase 3 MAP；
- Phase 2 关系闭环仍需独立 Major Blade；
- 旁路迁移决策尚未冻结。

### 20.5 后续唯一允许的 Major 方向

未来若 Product Control Tower 给出 NOW，只允许：

```text
Life Whisper Relationship Bridge
```

职责：

```text
用户原声
↓
同一 StarBeast 的第一次关系回应
↓
用户主动继续
↓
正式 /reality V2
```

它必须是：

- bridge；
- adapter；
- relationship handoff。

它不能是：

- Engine；
- classifier；
- AI chat；
- automatic matcher。

---

## 二十一、未来 Major Blade 的输入输出边界

本节只冻结边界，不授权实施。

### 21.1 输入

```text
raw user expression
```

属性：

- 用户所有；
- 不要求结构化；
- 不自动解释；
- 不自动分类；
- 不自动持久化为人格事实。

### 21.2 Phase 2 输出

```text
relationship response
```

包含：

- StarBeast 呼吸变化；
- 星尘变化；
- 身体方向变化；
- 关系状态变化；
- 用户继续同行意图。

### 21.3 Phase 3 桥梁输出

```text
reality encounter intent
```

只证明：

> 用户愿意让现实继续靠近。

不证明：

- 哪个 Pressure Field；
- 哪个 Pressure Nature；
- 哪个 Seed；
- 哪层 Dust；
- 哪个 Gravity。

### 21.4 Pressure Seed 输入保持不变

正式 Pressure Seed 仍通过：

- source reference；
- age segment；
- cursor；
- exclusion history；
- explicit recognition。

Life Whisper 不直接写入 Seed Contract。

### 21.5 用户确认保持不变

现实理解只有在用户认出后成立。

必须继续允许：

- 停在某一幕；
- 继续靠近下一组；
- 暂停；
- 不做结论。

---

## 二十二、为什么当前不做自由文本语义匹配

### 22.1 当前无承载合同

Candidate Request 没有自由文本字段。

### 22.2 当前无语义 Runtime

没有：

- text classifier；
- embedding；
- AI extraction；
- free-text to pressure field adapter；
- user correction loop。

### 22.3 当前协议禁止新增

本刀禁止：

- 新 Engine；
- 新模型；
- 新 AI Runtime。

### 22.4 当前阶段不允许

Phase 3 只允许 MAP。

### 22.5 产品风险

即使技术可做，也可能造成：

- 用户一句模糊表达被系统定性；
- Life Whisper 变成问诊；
- Pressure Seed 变成标签；
- First Encounter 被分析打断；
- 用户失去“认出”的主动权。

因此：

> 本阶段不做自由文本自动匹配，是产品边界，不是技术缺陷。

---

## 二十三、门禁执行证据

本次只读审计执行了现有门禁。

### 23.1 Pressure Seed Candidate Source

执行：

```text
node scripts/check-reality-pressure-seed-candidate-source.mjs
```

结果：

```text
PASS
```

确认：

- Matrix V2；
- 三枚候选；
- cross-field bundle；
- cursor；
- no default；
- no automatic selection；
- no new Pressure Engine。

### 23.2 Production Pressure Seed Consumer

执行：

```text
node scripts/check-reality-production-pressure-seed-consumer.mjs
```

结果：

```text
PASS
```

确认：

- explicit recognition；
- pause；
- next bundle；
- selected context；
- Gravity readiness；
- immutable session；
- V2 Host consumption。

### 23.3 Pressure Seed Capture Adapter

执行：

```text
node scripts/check-reality-pressure-seed-capture-adapter.mjs
```

结果：

```text
PASS
```

确认：

- source continuity；
- bundle continuity；
- candidate membership；
- Matrix provenance；
- real-user recognition provenance；
- no storage；
- no Gravity execution。

### 23.4 Six Space Progress

执行：

```text
node scripts/check-dynamics-six-space-progress-adapter.mjs
```

结果：

```text
PASS
```

确认：

- 六空间顺序；
- 进度；
- completed state；
- starbeast feedback；
- no Runtime advance；
- no storage。

### 23.5 Reality Seed Body Response

执行：

```text
node scripts/check-xinmai-reality-seed-recognition-body-response.mjs
```

结果：

```text
PASS
```

确认：

- recognized reality enters same life；
- same body position；
- no analysis start；
- restrained response；
- reduced motion relation。

### 23.6 Genesis Recognition → Reality

执行：

```text
node scripts/check-genesis-production-recognition-reality-entry.mjs
```

结果：

```text
PASS
```

确认：

- explicit recognition；
- explicit Reality action；
- source continuity；
- production handoff。

### 23.7 Aggregate Route Gate

执行：

```text
node scripts/check-reality-production-route-entry.mjs
```

结果：

```text
FAIL
```

唯一报告：

```text
Dynamics keeps revision choice inside the same life-universe visual event
missing=data-revision-visual-language="SAME_LIFE_STELLAR_DEFLECTION"
```

判断：

- 该失败发生在既存 Choice visual-language 门禁；
- 不属于 Life Whisper / Pressure Seed Candidate / Capture 链；
- 本 MAP 不修改；
- 不能把总路由门禁描述为全绿。

### 23.8 Genesis Reality Pressure Projection Gate

执行：

```text
node scripts/check-genesis-reality-pressure-projection.mjs
```

结果：

```text
FAIL
```

报告：

```text
P108 renderer contract carries pressure
missing=realityPressure: GenesisRealityPressureProjection | null
```

判断：

- 专用 Reality Seed Body Response 门禁已通过；
- 旧 P108 合同门禁与当前 Renderer Contract 不一致；
- 本 MAP 不修复；
- 后续独立归类为既存 gate drift。

---

## 二十四、已发现风险

### Risk 1｜Life Whisper 被做成聊天框

严重度：

`HIGH`

后果：

- 用户面对 AI，不再面对生命；
- Phase 2 被工具化；
- 新系统重复。

### Risk 2｜Life Whisper 自动选择 Seed

严重度：

`HIGH`

后果：

- 用户确认权消失；
- no automatic selection 失效；
- 模糊表达被定性。

### Risk 3｜LaunchLab 旁路继续存在

严重度：

`HIGH`

后果：

- 同一用户可能进入不同 Reality 消费链；
- provenance 不一致；
- StarBeast Response 被绕过；
- Life Whisper 接入位置不唯一。

### Risk 4｜把 Pressure Seed Runtime 误标为完整

严重度：

`MEDIUM`

后果：

- 忽略年龄目录覆盖；
- 非 ESTABLISHING 用户遇到 source not ready；
- 产品阶段被误判通过。

### Risk 5｜Six Dimension fallback 被当成个体显影

严重度：

`MEDIUM`

后果：

- 用户看到通用语言；
- Seed 与生命痕迹关系变弱；
- Gravity 重新像分析模板。

### Risk 6｜聚合门禁漂移

严重度：

`MEDIUM`

后果：

- 单项链路通过但总门禁失败；
- 后续无法准确判断阶段出口。

---

## 二十五、禁止事项

本审计冻结以下禁止项。

### 禁止新增系统

- Life Whisper Engine；
- Whisper AI；
- Reality Understanding Engine V2；
- 第二套 Pressure Seed；
- 第二套 Six Dimension；
- 新 Dust Engine；
- 新 StarBeast Identity。

### 禁止自动结论

- Life Whisper → Pressure Seed 自动选择；
- Life Whisper → Dust；
- Life Whisper → Gravity；
- Life Whisper → Crystal；
- Life Whisper → StarBeast 最终状态。

### 禁止绕过用户

- 默认候选；
- 自动确认；
- AI 替用户认出；
- 用户表达后立即下结论；
- 取消 Pause；
- 取消 Next Bundle。

### 禁止接入旁路

- 不接入 LaunchLab Pressure Seed Axis；
- 不接入 prototype harness；
- 不恢复 legacy Scene；
- 不激活 V1 Pressure Consumer。

### 禁止提前阶段

- 不深化 Phase 3；
- 不触发 Choice；
- 不生成 Crystal；
- 不写 Archive；
- 不扩展 Sanctuary。

---

## 二十六、阶段适配结论

### Phase 1 Identity

影响：

```text
无身份修改
```

要求：

- Life Whisper 不改变二十八宿；
- 不改变 StarBeast；
- 不改变天地之名；
- 不创建新角色。

### Phase 2 Relationship

适配：

```text
强
```

Life Whisper 直接增强：

- 用户参与；
- 生命回应；
- First Encounter；
- Life Companion。

### Phase 3 Reality

适配：

```text
仅桥梁 MAP
```

允许确认：

- Reality 入口；
- existing Pressure Seed consumption；
- explicit recognition；
- StarBeast body response。

不允许实施深层理解。

### Phase 4 Growth

适配：

```text
DEFER
```

本刀不触发：

- Choice；
- Crystal；
- Archive。

---

## 二十七、最终消费关系冻结

冻结新用户关系：

```text
生命坐标
↓
StarBeast 相遇
↓
Life Whisper
↓
StarBeast 第一次关系回应
↓
用户决定同行
↓
正式 /reality
↓
既有 Pressure Seed 候选
↓
用户认出
↓
StarBeast 现实回应
↓
Six Dimension / Gravity
```

冻结老用户关系：

```text
回到同一生命世界
↓
同一 StarBeast
↓
Life Whisper
↓
同一生命回应
↓
新的 /reality
↓
既有 Pressure Seed 候选
↓
用户认出
↓
新的现实同行
```

冻结数据边界：

```text
Life Whisper 原声
≠
Pressure Seed
```

冻结消费者边界：

```text
Life Whisper
先由 Relationship 消费

Pressure Seed
后由 Reality 消费
```

冻结系统边界：

```text
一个 Pressure Seed Engine
一个正式 Reality V2
一个用户确认
一个 SelectedPressureSeedContext
```

---

## 二十八、Definition of Done

本 MAP 完成必须满足：

### 已回答

Life Whisper 是否需要新系统？

```text
NO
```

Pressure Seed 如何被消费？

```text
通过既有候选、明确认出与 SelectedPressureSeedContext 消费。
```

哪些能力已有 Runtime？

```text
Pressure Seed 候选/确认链
StarBeast Reality Response
Gravity
Six Space Progress
```

哪些只是协议？

```text
Life Whisper
Life Whisper First Response Binding
Relationship Naming
```

是否存在第二套现实理解链？

```text
没有第二个 Engine。
存在 LaunchLab 消费旁路。
存在已隔离的 prototype / legacy 资产。
```

### 没有越界

- 未修改代码；
- 未新增类型；
- 未新增服务；
- 未新增 Engine；
- 未修改 Runtime；
- 未修复旁路；
- 未修复既存 gate drift；
- 未启动 Phase 3 实施。

---

## 二十九、最终决策

```text
决策：
MAP

Life Whisper Engine：
REJECT

既有 Pressure Seed：
KEEP

Life Whisper → StarBeast Relationship：
FUTURE MAJOR CANDIDATE

Life Whisper → Pressure Seed 自动语义匹配：
REJECT AT CURRENT PHASE

LaunchLab Pressure Seed Axis：
REQUIRES SEPARATE MIGRATION DECISION

Phase 3 深化：
DEFER

Phase 4：
DEFER
```

本刀唯一结论：

> Life Whisper 是已有生命世界的新关系入口，不是新的现实理解系统。

最终链路：

```text
用户说出生命
↓
同一生命先回应
↓
用户决定继续
↓
已有 Reality 开始靠近
↓
用户亲自认出
```

而不是：

```text
用户输入文本
↓
新增聊天功能
↓
系统替用户下结论
```
