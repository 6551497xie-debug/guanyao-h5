# XINMAI Relationship State Host to Renderer Consumption Mapping P0

项目：

`/Users/xieyanjun/Desktop/guanyao-h5`

模式：

Relationship State → Host → Renderer 消费关系映射审计。

性质：

MAP ONLY。

本刀：

- 只新增产品与工程边界文档；
- 不修改 Runtime；
- 不新增类型；
- 不新增 Engine；
- 不迁移 Renderer；
- 不实施 Relationship Naming；
- 不改变 Genesis、Reality、Pressure Seed、Gravity、Choice 或 Crystal 因果。

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
Layer 2｜Identity
Layer 1｜World
Layer 4｜Growth

已有完成资产：
Genesis Recognition
Life Whisper Entry
StarBeast First Response
Genesis → Reality Continuity
Reality Life Universe Canvas
Shared Genesis WebGL Renderer Core
Relationship Naming Asset Persistence MAP

本刀消费者：
未来 Genesis Renderer Host
未来 Reality Renderer Host / Adapter
共享 Genesis WebGL Renderer Core
Renderer 消费门禁

是否存在协议冲突：
否

是否需要 Migration Audit：
本刀只做 MAP，不实施迁移

决策：
NOW — MAP ONLY
```

---

## 二、唯一结论

当前共享 Renderer 已经通过 DOM 反向读取页面状态。

实际通道为：

```text
React Page / Host 持有关系与现实状态
↓
把状态镜像为 data-*
↓
Renderer 通过 canvas.hasAttribute / getAttribute / closest / querySelector
↓
把 DOM 状态重新解释为视觉行为
```

这个通道短期维持了连续视觉，但存在三个结构问题：

1. Renderer 从视觉执行层反向依赖页面结构；
2. `noUIIntegration: true` 与实际 DOM 状态读取不一致；
3. 新关系能力很容易继续通过新增 `data-*` 偷渡进入 Renderer。

本 MAP 冻结目标关系：

```text
关系状态权威
↓
页面 / Host 解析为明确视觉事实
↓
显式、类型化 Host → Renderer 输入
↓
Renderer 只负责视觉插值与绘制
```

最终裁决：

```text
Relationship State Owner
=
正式关系会话 + 当前页面交互状态

Visual Fact Owner
=
页面对应的 Host / Host Adapter

Renderer
=
视觉事实消费者

DOM data-*
=
观测、CSS 与验收镜像

DOM data-* → Renderer
=
禁止继续扩张，未来分片迁移
```

---

## 三、审查范围与证据基线

本 MAP 以远程干净基线：

```text
cc1b08f77829a1c2e764266275175312d5285d7e
```

为审查对象。

核心证据文件：

| 资产 | 当前职责 |
| --- | --- |
| `src/pages/GenesisProductionExperiencePage.tsx` | Genesis Recognition、Life Whisper 与 Reality Entry 交互状态所有者 |
| `src/components/GenesisProductionRendererCanvasHost.tsx` | Genesis Canvas 生命周期与正式 Renderer Host 调用者 |
| `src/renderers/genesisProductionRendererHost.ts` | Genesis 正式授权、来源校验与 Renderer Core 代理 |
| `src/components/RealityProductionHost.tsx` | Reality 候选、压力、Choice 等页面状态组织者 |
| `src/components/RealityLifeUniverseCanvas.tsx` | Reality 连续生命画布、Reality 局部视觉状态与 Renderer Core 直接消费者 |
| `src/renderers/genesisWebGLRendererCore.ts` | 共享 WebGL 场景、插值与绘制执行 |
| `src/types/genesisWebGLRendererCore.ts` | 当前 Renderer Core 显式输入与边界声明 |
| `src/types/genesisProductionExperiencePage.ts` | Genesis Canvas Host 显式 Props |
| `src/types/realityProductionRouteEntry.ts` | Reality Host 与 `visualContinuity` 输入 |

关联协议：

- `XINMAI_PRODUCT_CONTROL_TOWER_P0`
- `XINMAI_PRODUCT_MIGRATION_AND_CONSTRUCTION_RHYTHM_P0`
- `XINMAI_MIGRATION_ROADMAP_AND_STAGE_CONTROL_P0`
- `XINMAI_LIFE_WHISPER_RELATION_ENTRY_MAJOR_BLADE_PREP_P0`
- `XINMAI_RELATIONSHIP_NAMING_ASSET_PERSISTENCE_MAPPING_P0`
- `XINMAI_BASELINE_GATE_DRIFT_GOVERNANCE_MAP_P0`

---

## 四、Runtime 证据等级

采用：

```text
✓ 已存在 Runtime
△ 部分存在或职责冲突
○ 仅 MAP / 尚未实施
```

| 能力 | 状态 | 证据 |
| --- | --- | --- |
| Genesis Recognition 状态权威 | ✓ | `GenesisProductionRecognitionRealityResult.session` |
| Recognition 回应稳定状态 | ✓ | `recognitionResponseSettled` 页面局部状态 |
| Life Whisper 提交事实 | ✓ | `lifeWhisperFact` 页面局部状态 |
| Life Whisper 回应阶段 | ✓ | `lifeWhisperResponsePhase` 页面局部状态 |
| Reality Arrival / Life Weather 状态 | ✓ | `RealityLifeUniverseCanvas` 局部状态 |
| Pressure / Gravity / Choice / Crystal 页面状态 | ✓ | Reality / Gravity 页面与组件 |
| Host 显式接收身份与视觉校准 | ✓ | Genesis Host 与 Reality Canvas Props |
| Host 显式接收全部动态视觉事实 | ○ | 当前缺失 |
| Renderer 只消费类型化视觉事实 | △ | 静态投影显式，动态状态仍从 DOM 读取 |
| Renderer 不拥有关系状态 | △ | 协议如此，实际通过 DOM 重新解释关系状态 |
| `noUIIntegration: true` 与实现一致 | △ | 当前 Renderer 读取页面 DOM 状态 |
| `data-*` 只用于观测与 CSS | △ | 部分同时作为 Renderer 运行输入 |
| DOM → Renderer 迁移 Runtime | ○ | 本刀不实施 |

---

## 五、当前权威所有者

### 5.1 关系状态不是 Renderer 资产

冻结：

> Renderer 不拥有用户是否认出、是否表达、是否跳过、是否准备同行，也不拥有关系名。

Renderer 不能决定：

- 用户是否已经认出星兽；
- Life Whisper 是否成立；
- 跳过是否有效；
- 关系是否稳定；
- 用户是否可以进入 Reality；
- 用户如何称呼星兽；
- Reality 是否已经成为当前事件；
- Choice 是否成立；
- Crystal 是否形成。

这些都属于产品会话或页面交互层。

### 5.2 Genesis 权威分层

Genesis 当前关系状态由两个层级共同组成。

#### A. 正式关系会话

权威来源：

```text
GenesisProductionRecognitionRealityResult.session
```

它回答：

- Recognition 是否确认；
- 当前 interaction availability；
- 是否进入 `ENTER_REALITY`；
- 同一生命的 Reality Handoff 是否具备条件。

#### B. 当前页面的瞬时交互状态

权威来源：

```text
GenesisProductionExperiencePage
```

包括：

- `recognitionResponseSettled`；
- `lifeOriginDiscoveryPhase`；
- `lifeWhisperFact`；
- `lifeWhisperResponsePhase`。

这些是当前体验周期内的关系与视觉阶段事实。

它们不是：

- 星兽身份；
- 持久化关系名；
- Pressure Seed；
- 用户人格；
- 长期生命资产。

### 5.3 Reality 权威分层

Reality 当前状态由正式 Host 与局部生命画布共同持有。

#### A. RealityProductionHost

负责：

- 当前 Pressure Seed 候选状态；
- 用户是否认出当前现实；
- Pressure Visual State；
- Gravity Continue 边界；
- Choice / Crystal 页面事实的组织。

#### B. RealityLifeUniverseCanvas

负责：

- `arrivalPhase`；
- `lifeWeatherPhase`；
- 当前画布局部的 Inner View approach；
- Renderer 生命周期；
- Reality 视觉记忆几何。

它不应成为：

- 第二个 Reality Engine；
- Pressure Seed 权威；
- Relationship 状态权威；
- 身份计算者。

### 5.4 关系名权威

依据：

`XINMAI_RELATIONSHIP_NAMING_ASSET_PERSISTENCE_MAPPING_P0`

未来关系名权威为独立：

```text
StarBeastRelationshipNamingAsset
```

关系名：

- 不进入 Renderer；
- 不进入 Renderer Visual Facts；
- 不改变颜色、形态、呼吸或节律；
- 只由允许的 React / Host 展示消费者读取。

---

## 六、当前 DOM → Renderer 通道清单

当前 `genesisWebGLRendererCore` 存在以下 UI 状态读取。

| DOM 状态 | 当前提供者 | Renderer 当前用途 | 未来显式事实 |
| --- | --- | --- | --- |
| `data-reality-life-universe-renderer` | `RealityLifeUniverseCanvas` | 判断当前是否 Reality Canvas | `surface: "REALITY"` |
| `data-life-origin-discovery-phase` | `GenesisProductionRendererCanvasHost` | Origin Reveal 阶段 | `origin.discoveryPhase` |
| `data-reality-arrival-phase` | `RealityLifeUniverseCanvas` | Reality 进入节律 | `reality.arrivalPhase` |
| `data-reality-life-weather-phase` | `RealityLifeUniverseCanvas` | 当前生命天气插值 | `reality.lifeWeatherPhase` |
| `data-reality-pressure-visual-state` | `RealityProductionHost` / Gravity 页面 | 压力接近、恢复与稳定 | `reality.pressureVisualState` |
| `data-inertia-path-state` | `RealityGravityInertiaField` | Gravity 记忆是否影响当前回应 | `growth.gravityInertiaState` |
| `data-repetition-depth` | `RealityGravityInertiaField` | Gravity 视觉重复深度 | `growth.gravityRepetitionDepth` |
| `data-choice-response-state` | Reality / Gravity 页面 | 旧回应暂停与新空间 | `growth.choiceResponseState` |
| `data-choice-crystal-stage` | Reality / Gravity 页面 | Crystal 沉积视觉阶段 | `growth.crystalStage` |
| `data-genesis-presence-visual-state` | Genesis Page / Reality Canvas | Recognition 回应触发 | `relationship.recognitionVisualPhase` |
| `data-life-whisper-fact` | Genesis Page | Life Whisper 是否提交 | `relationship.whisperFact` |
| `data-life-whisper-response-phase` | Genesis Page | Life Whisper 回应插值 | `relationship.whisperResponsePhase` |
| `data-reality-entry-eligibility` | Genesis Page | 进入 Reality 的视觉携带 | `relationship.realityEntryTransition` |

当前读取方式不仅包括 Canvas 自身属性，也包括：

```text
canvas.closest(...)
canvas.closest(...).querySelector(...)
ancestor.getAttribute(...)
sibling field data-* lookup
```

因此它不是单纯 Canvas 参数。

它已经使 Renderer 依赖：

- React 页面层级；
- CSS class 名；
- 祖先容器位置；
- 兄弟组件是否存在；
- DOM attribute 的字符串拼写；
- 页面更新与 renderFrame 的隐式时序。

---

## 七、问题一｜Relationship 状态的权威所有者是谁

冻结答案：

```text
产品关系事实
=
正式关系会话 / 当前页面交互状态

视觉事实
=
对应页面 Host 解析后的只读快照

插值时间
=
Renderer 内部临时状态
```

具体所有权：

| 状态 | 权威所有者 | Renderer 权限 |
| --- | --- | --- |
| Recognition Confirmed | `GenesisProductionRecognitionRealityResult.session` | 只读取 Host 投递的视觉阶段 |
| Recognition Response Settled | `GenesisProductionExperiencePage` | 只执行插值 |
| Life Whisper Submitted / Skipped | `GenesisProductionExperiencePage` | 不解释原文，只读取视觉事实 |
| Life Whisper 原始文本 | 当前输入组件生命周期 | 禁止读取 |
| Relationship Name | 未来独立命名资产 | 禁止读取 |
| Reality Entry Eligibility | 正式 Recognition / Handoff 会话 | 只读取 transition visual fact |
| Reality Pressure State | `RealityProductionHost` | 只读取视觉投影与阶段 |
| Gravity / Choice / Crystal 状态 | 对应 Growth 消费者 | 只读取视觉阶段 |
| 动画进度、wave、elapsed | Renderer | 可以持有，但不是产品事实 |

Renderer 可拥有：

- 当前插值起点；
- elapsed time；
- easing progress；
- shader / geometry / material 状态；
- frame-local visual weights。

Renderer 不可拥有：

- 关系是否成立；
- 用户是否确认；
- 产品路径是否可继续；
- 名称或身份；
- 现实解释；
- 成长结论。

---

## 八、问题二｜Host 如何显式向 Renderer 投递视觉事实

### 8.1 冻结方向

未来采用：

```text
Owner State
↓
Surface Host Visual Fact Adapter
↓
Discriminated Visual Facts
↓
Renderer Controller
```

不采用：

```text
Owner State
↓
data-*
↓
Renderer DOM 查询
```

### 8.2 建议概念契约

以下仅为 MAP 中的契约形状，不代表本刀新增代码类型。

```text
LifeUniverseRuntimeVisualFacts

surface:
  GENESIS
  REALITY
  ISOLATED

origin:
  discoveryPhase

relationship:
  recognitionVisualPhase
  whisperFact
  whisperResponsePhase
  realityEntryTransition

reality:
  arrivalPhase
  lifeWeatherPhase
  pressureVisualState

growth:
  gravityInertiaState
  gravityRepetitionDepth
  choiceResponseState
  crystalStage
```

必须使用 discriminated union。

原因：

- Genesis 不应接收 Reality / Growth 全量状态；
- Reality 不应接收 Life Whisper 原始关系输入；
- Isolated Prototype 不应伪造正式用户状态；
- 编译期可以拒绝跨 Surface 非法组合。

### 8.3 Genesis Visual Facts

Genesis Host 允许投递：

```text
surface = GENESIS

origin.discoveryPhase

relationship.recognitionVisualPhase
relationship.whisperFact
relationship.whisperResponsePhase
relationship.realityEntryTransition
```

禁止投递：

- Life Whisper 原文；
- Relationship Name；
- Pressure Seed；
- Six Dimension；
- Gravity；
- Choice；
- Crystal；
- Reality 当前事件。

### 8.4 Reality Visual Facts

Reality Host / Adapter 允许投递：

```text
surface = REALITY

relationship.recognitionVisualPhase = RECOGNIZED

reality.arrivalPhase
reality.lifeWeatherPhase
reality.pressureVisualState

growth.gravityInertiaState
growth.gravityRepetitionDepth
growth.choiceResponseState
growth.crystalStage
```

这些是视觉事实。

它们不能携带：

- 用户输入文本；
- Pressure Seed 标签文案；
- 尘遮名称；
- Relationship Name；
- AI 解释；
- Choice 文案；
- Crystal 资产全文。

### 8.5 动态更新方式

当前 Renderer Core 在初始化后持续拥有 `renderFrame`。

关系与 Reality 状态会在同一个 Controller 生命周期内变化。

因此未来建议：

```text
create renderer
↓
receive initialVisualFacts
↓
Host state changes
↓
controller.updateVisualFacts(nextFacts)
↓
renderFrame consumes latest frozen snapshot
```

不建议：

#### A. 每次状态变化重建 Renderer

原因：

- WebGL context 与 geometry 重建成本高；
- 破坏同一身体连续；
- 容易出现闪帧；
- 容易把关系响应变成重新显化。

#### B. 把状态 getter callback 交给 Renderer

原因：

- Renderer 仍会反向拉取上层状态；
- 所有权不清晰；
- 测试难以冻结某一帧的完整视觉事实。

冻结：

> Host 主动 Push，Renderer 不主动 Pull。

---

## 九、问题三｜Renderer 是否只消费视觉事实

答案：

```text
YES
```

但当前 Runtime：

```text
PARTIAL
```

未来 Renderer 可以消费：

- 已经解析完成的视觉阶段枚举；
- 数值化且有明确上限的视觉强度；
- 当前 Surface；
- 投影与视觉校准；
- Reduced Motion；
- viewport；
- render plan。

Renderer 不得消费：

- 用户原文；
- 用户关系名；
- AI 输出；
- Pressure Seed 业务对象；
- Six Dimension 业务对象；
- 用户确认按钮状态；
- 路由状态；
- Storage；
- DOM 树；
- CSS class；
- 页面组件实例。

Host 的职责不是把所有领域对象直接转交 Renderer。

Host 必须完成：

```text
领域状态
↓
合法性校验
↓
视觉事实解析
↓
最小投递
```

---

## 十、问题四｜如何解决 `noUIIntegration: true` 冲突

### 10.1 当前冲突

`GenesisWebGLRendererCoreBoundary` 声明：

```text
noUIIntegration: true
```

但当前 Core：

- 判断 Canvas 是否具有某个 `data-*`；
- 读取 Canvas 属性；
- 通过 `closest` 查找页面祖先；
- 通过 `querySelector` 查找页面内部组件；
- 读取页面交互状态。

所以：

```text
声明
≠
当前完整实现事实
```

### 10.2 语义校准

未来 `noUIIntegration: true` 应明确解释为：

```text
Renderer 不读取 UI 结构
Renderer 不拥有 UI 交互
Renderer 不决定路由
Renderer 不写存储
Renderer 不解释业务语义
```

它不禁止：

- Host 显式传入视觉事实；
- Renderer 绑定指定 Canvas；
- Renderer 使用 offscreen canvas 创建纹理；
- Renderer 监听 WebGL context lost / restored；
- Renderer 接收 viewport 与 Reduced Motion。

`document.createElement("canvas")` 用于纹理资源生成，不等同于读取页面关系状态。

真正需要移除的是：

```text
hasAttribute(data-state)
getAttribute(data-state)
closest(data-state)
querySelector(data-state)
```

### 10.3 当前裁决

在 DOM 读取迁移完成前：

```text
noUIIntegration 实现一致性
=
△
```

不得把该布尔值本身当作边界已经满足的证据。

迁移完成门禁应同时检查：

- Renderer Core 不出现 `canvas.closest(`；
- Renderer Core 不出现面向产品状态的 `getAttribute("data-...")`；
- Renderer Core 不出现面向产品状态的 `hasAttribute("data-...")`；
- Renderer Core 不查找 Reality / Gravity / Choice DOM；
- 所有正式 Surface 通过显式 Visual Facts 投递。

---

## 十一、问题五｜迁移是否能够独立回滚

答案：

```text
YES
```

但必须按 Consumer Slice 分片。

### 11.1 Migration Slice A｜契约准备

未来允许范围：

- 新增共享视觉事实类型；
- 扩展 Renderer Controller 显式 update 接口；
- 建立纯映射测试；
- 暂不切换正式消费者。

回滚：

```text
删除 Visual Facts 类型
+
删除 Controller Update API
+
删除契约测试
```

不得改变画面。

### 11.2 Migration Slice B｜Genesis Host

未来允许范围：

- Genesis Page 形成明确关系视觉事实；
- `GenesisProductionRendererCanvasHost` 接收视觉事实；
- `genesisProductionRendererHost` 投递给 Core；
- Core 删除 Genesis 专属 DOM 读取。

必须同一提交完成：

```text
显式输入接入
+
Genesis DOM 读取删除
+
Genesis Recognition / Whisper / Entry 回归检查
```

禁止同时保留：

```text
显式事实
+
DOM fallback
```

否则会形成双权威。

回滚单位：

```text
Genesis Visual Fact Props
+
Genesis Host Adapter
+
Core Genesis Fact Consumption
+
Genesis 专属门禁
```

回滚后恢复原 Genesis DOM 通道，不影响 Reality。

### 11.3 Migration Slice C｜Reality Host

未来允许范围：

- Reality Host 形成 Reality / Growth 视觉事实；
- Reality Canvas 显式投递；
- Core 删除 Reality、Gravity、Choice、Crystal DOM 查询。

必须同一提交完成：

```text
Reality Visual Facts
+
Reality Adapter
+
Core Reality Fact Consumption
+
Reality / Gravity / Choice / Crystal 连续回归检查
```

回滚单位只覆盖 Reality Consumer Slice。

不得影响：

- Genesis Identity；
- Life Whisper；
- Relationship Naming；
- Pressure Seed 数据链。

### 11.4 Migration Slice D｜边界收口

仅在 Slice B 与 C 均通过后：

- 删除残余 DOM state reader；
- 收紧 `noUIIntegration` 门禁；
- 冻结 Core Consumer Allowlist；
- 将 `data-*` 明确降级为 observation-only。

### 11.5 回滚原则

任何 Slice：

- 不跨 Identity 与 Growth 数据层；
- 不修改产品状态枚举的业务含义；
- 不修改 StarBeast 身份；
- 不修改 `sourceReferenceId`；
- 不修改路由；
- 不修改存储；
- 不携带 Relationship Naming。

---

## 十二、问题六｜哪些 `data-*` 只保留为观测与验收证据

### 12.1 允许保留

以下属性可在对应 Owner DOM 上继续存在：

#### Source / Identity 观测

- `data-source-provenance`
- `data-source-reference-id`
- `data-genesis-runtime-stage`
- `data-production-renderer-host-state`
- `data-reality-life-universe-renderer`

用途：

- QA；
- 自动验收；
- DevTools 观察；
- CSS surface selector。

不得由 Renderer 读取。

#### Relationship 观测

- `data-genesis-presence-visual-state`
- `data-life-whisper-entry-ready`
- `data-life-whisper-fact`
- `data-life-whisper-response-phase`
- `data-reality-entry-eligibility`

用途：

- 验收用户关系阶段；
- CSS 表现；
- 无障碍或测试证据。

不得作为 Renderer 运行输入。

#### Reality / Growth 观测

- `data-reality-arrival-phase`
- `data-reality-life-weather-phase`
- `data-reality-pressure-visual-state`
- `data-inertia-path-state`
- `data-repetition-depth`
- `data-choice-response-state`
- `data-choice-crystal-stage`

用途：

- 页面样式；
- 验收；
- 可观察性。

不得作为 Renderer 运行输入。

### 12.2 Observation Mirror 原则

DOM 属性只能镜像已经存在的 Owner State。

顺序：

```text
Owner State
├─→ Host Visual Facts → Renderer
└─→ data-* Observation Mirror → CSS / QA
```

禁止：

```text
Owner State
↓
data-*
↓
Renderer
```

### 12.3 属性移除边界

本 MAP 不要求删除现有 `data-*`。

未来若属性仍被：

- CSS；
- Runtime Smoke；
- E2E；
- 无障碍辅助；
- DevTools 验收；

消费，可以保留。

只有确认零消费者后，才允许单独精修删除。

---

## 十三、问题七｜哪些 `data-*` 不得继续作为 Renderer 输入

冻结：

> 所有表达产品状态的 `data-*` 都不得继续作为 Renderer 运行输入。

明确禁止：

```text
data-reality-life-universe-renderer
data-life-origin-discovery-phase
data-reality-arrival-phase
data-reality-life-weather-phase
data-reality-pressure-visual-state
data-inertia-path-state
data-repetition-depth
data-choice-response-state
data-choice-crystal-stage
data-genesis-presence-visual-state
data-life-whisper-fact
data-life-whisper-response-phase
data-reality-entry-eligibility
```

同时禁止未来新增：

- `data-relationship-name` → Renderer；
- `data-naming-state` → Renderer；
- `data-dust-state` → Renderer；
- `data-meridian-state` → Renderer；
- `data-ai-reflection-stage` → Renderer；
- `data-pressure-seed-*` → Renderer；
- 任何 Life Whisper 原文属性；
- 任何用户可识别文本属性。

---

## 十四、Host 职责冻结

### 14.1 GenesisProductionExperiencePage

继续负责：

- 正式关系会话推进；
- Recognition 交互；
- Life Whisper 当前周期事实；
- Reality Entry 请求；
- 将产品状态解析为 Genesis Visual Facts。

不负责：

- WebGL 插值；
- 场景 geometry；
- Shader；
- Pressure Seed；
- Relationship Name 推断。

### 14.2 GenesisProductionRendererCanvasHost

未来负责：

- 接收已经解析的 Genesis Visual Facts；
- 校验 Surface 与 Source 连续；
- 显式投递到 Renderer Host；
- 推送 Visual Facts 更新；
- Renderer 生命周期。

它不重新解释关系。

### 14.3 GenesisProductionRendererHost

未来继续负责：

- 正式授权；
- REAL_USER source 校验；
- `sourceReferenceId` 一致性；
- Render Plan 与 Projection pass-through；
- Visual Facts pass-through；
- Core 代理。

它不读取 DOM。

### 14.4 RealityProductionHost

继续负责：

- Reality 业务状态；
- Pressure Seed 用户认出；
- Pressure / Gravity / Choice / Crystal 页面阶段；
- 形成 Reality Visual Facts。

### 14.5 RealityLifeUniverseCanvas

未来负责：

- 接收 Reality Visual Facts；
- 合并 Canvas 局部 arrival / life weather 事实；
- 调用一个正式 Reality Renderer Host 或受控 Adapter；
- Renderer 生命周期；
- Observation data 属性。

它不应继续让 Core 自己查找 Host DOM。

### 14.6 Renderer Core

只负责：

- scene projection；
- visual facts snapshot；
- interpolation；
- animation state；
- geometry / material；
- render frame；
- resize；
- context loss；
- dispose。

---

## 十五、Surface 契约隔离

### 15.1 Genesis

Genesis Renderer 只能看到：

```text
生命来源显化
Recognition
Life Whisper 回应视觉
Reality Entry 过渡
```

不能看到：

```text
Pressure Seed
Six Dimension
Gravity
Choice
Crystal
Relationship Name
```

### 15.2 Reality

Reality Renderer 只能看到：

```text
同一已认出生命
Arrival
Life Weather
Pressure Visual State
Growth Visual State
```

不能看到：

```text
Life Whisper 原文
Relationship Name
AI 文案
人格结论
身份重新计算
```

### 15.3 Isolated Prototype

Isolated Prototype：

- 不能伪造 `REAL_USER_SESSION`；
- 不能读取正式 DOM；
- 不能接收 Relationship Name；
- 只能使用明确的 isolated visual facts；
- 保持 production forbidden。

---

## 十六、关系名与 Renderer 的永久边界

关系名是：

```text
Relationship Display Asset
```

不是：

```text
Renderer Visual Fact
```

因此未来 Blade 3：

- 可以在 Genesis First Encounter 文案层展示关系名；
- 可以在 Returning Life World 展示关系名；
- 可以在 Reality 同行壳展示关系名；
- 不得把关系名传给 Renderer；
- 不得根据关系名改变视觉；
- 不得新增 `data-relationship-name` 供 Renderer 读取；
- 不得把 Naming State 加入 WebGL Core Input。

这条边界不因 Host → Renderer 迁移而改变。

---

## 十七、资产保护

### 17.1 World

保持：

- 黑曜空间；
- 动态星河；
- 星尘层次；
- WebGL 连续画布；
- Reduced Motion；
- 同一 Renderer Core。

### 17.2 Identity

保持：

- 生命坐标；
- 二十八宿；
- 四象方向；
- StarBeast 身份；
- 同一生命核心；
- `sourceReferenceId`；
- `visualContinuity`。

### 17.3 Relationship

保持：

- Recognition；
- Life Whisper Entry；
- StarBeast First Response；
- 跳过不惩罚；
- Reality Entry 不被命名阻断。

### 17.4 Growth

保持：

- Reality V2；
- Pressure Seed；
- Six Dimension；
- Gravity；
- Choice；
- Crystal。

本 MAP 不改变任何 Growth 因果。

---

## 十八、禁止实施

本刀与后续 MAP 阶段禁止：

1. 直接修改 Renderer；
2. 新增 Host 类型；
3. 新增 Controller API；
4. 删除 `data-*`；
5. 重做 Reality Canvas；
6. 抽取新的 Engine；
7. 改变 Renderer Consumer Allowlist；
8. 实施 Relationship Naming；
9. 将关系名传入 Renderer；
10. 借迁移修改视觉设计；
11. 借迁移修改 Pressure Seed；
12. 借迁移调整 Gravity / Choice / Crystal；
13. 同时保留 DOM 与显式 Visual Facts 双权威；
14. 让 Renderer 接收完整页面 State；
15. 让 Renderer 接收用户原文。

---

## 十九、未来迁移门禁

未来每个 Migration Slice 必须证明：

### 输入门禁

- Visual Facts 由明确 Owner 生成；
- 使用 discriminated surface；
- 不包含用户文本；
- 不包含关系名；
- 不包含业务文案；
- 不包含身份计算。

### Renderer 门禁

- 不通过 DOM 读取产品状态；
- 不使用 `.closest(...)` 获取产品状态；
- 不使用 `.querySelector(...)` 获取产品状态；
- 不使用 `data-*` 判断 Surface；
- 不拥有路由；
- 不写 Storage；
- 不触发 Engine。

### 连续性门禁

- 同一 `sourceReferenceId`；
- 同一 Render Plan；
- 同一二十八宿；
- 同一 StarBeast；
- 同一 Canvas 生命周期；
- 视觉状态变化不重新生成生命。

### 回归门禁

- Genesis Recognition；
- Life Whisper Submit；
- Life Whisper Skip；
- StarBeast First Response；
- Genesis → Reality；
- Reality Pressure；
- Gravity；
- Choice；
- Crystal；
- Reduced Motion；
- Production Build。

---

## 二十、阶段适配

### 用户有没有参与

本 MAP：

```text
不新增参与
```

但保护现有：

```text
Recognition
Life Whisper
Approach
Choice
```

### 世界有没有回应

本 MAP：

```text
不改变回应
```

但明确回应的视觉事实通道。

### 生命有没有变化

本 MAP：

```text
不改变生命状态
```

只冻结谁拥有状态、谁表现状态。

### 用户有没有留下痕迹

本 MAP：

```text
不新增痕迹
```

不触碰 Crystal、Archive 或 Naming Asset。

### 是否提前进入 Phase 3

```text
NO
```

### 是否提前进入 Phase 4

```text
NO
```

---

## 二十一、控制面裁决

### NOW

```text
Relationship State
→
Host
→
Renderer

消费关系 MAP
```

本文件已完成。

### MAP

```text
Genesis Host Migration Slice
Reality Host Migration Slice
Renderer noUIIntegration Gate
```

仅建立后续施工卡，不自动实施。

### DEFER

```text
DOM → Renderer Runtime 迁移
Relationship Naming Blade 3
Reality Renderer Host 抽取
```

### REJECT

```text
新增 data-* 供 Renderer 读取
关系名进入 Renderer
Renderer 读取 Life Whisper 原文
Renderer 读取 Pressure Seed 业务对象
DOM 与显式 Visual Facts 双权威
借迁移改变视觉或产品因果
```

---

## 二十二、Blade 3 解锁关系

Relationship Naming Asset Persistence MAP 已经完成：

- 权威资产；
- `sourceReferenceId` 绑定；
- 双重名称；
- 生命周期；
- 消费者；
- 持久化与回滚。

本 MAP 进一步完成：

- Relationship 状态权威；
- Host Visual Fact 职责；
- Renderer 消费边界；
- `data-*` 观测边界；
- 关系名永久禁止进入 Renderer。

因此：

```text
Blade 3 架构前置 MAP
=
完成
```

但 Blade 3 不自动进入 NOW。

重新申请时必须证明：

1. 不修改 Renderer；
2. 不新增 DOM → Renderer 通道；
3. 关系名只作为独立可选资产；
4. 不修改二十八宿或 StarBeast 身份；
5. 未命名、跳过、清空与存储失败均不阻断同行；
6. 不借 Blade 3 实施 Host → Renderer Runtime 迁移；
7. 提交与回滚单位独立。

---

## 二十三、最终映射表

| 问题 | 冻结答案 |
| --- | --- |
| Relationship 状态权威是谁 | 正式关系会话 + 当前页面交互状态 |
| Visual Fact 谁生成 | 对应 Surface 的 Host / Host Adapter |
| Renderer 拥有什么 | 插值时间、视觉权重、geometry、material、frame state |
| Renderer 不拥有什么 | 关系、身份、命名、路由、现实理解、成长结论 |
| Host 如何投递 | discriminated typed visual facts + 主动 update |
| Renderer 是否读取 DOM | 未来禁止；当前存在技术债 |
| `noUIIntegration` 当前是否完全成立 | 否，当前为 `△` |
| `data-*` 是否删除 | 不要求；可保留为 CSS / QA / observation |
| `data-*` 能否继续作为 Renderer 输入 | 不能 |
| 关系名能否进入 Renderer | 永久禁止 |
| 迁移能否独立回滚 | 能，按 Genesis / Reality Consumer Slice |
| 是否现在实施迁移 | 否，继续 DEFER |
| 是否解锁 Blade 3 | 完成前置 MAP，但仍需独立 NOW 申请 |

---

## 二十四、最终冻结

正确关系：

```text
用户认出 / 表达 / 同行
↓
正式关系状态成立
↓
页面 Host 形成视觉事实
↓
Renderer 接收明确视觉事实
↓
同一生命产生连续回应
```

错误关系：

```text
页面写 data-*
↓
Renderer 搜索 DOM
↓
Renderer 猜测关系状态
```

最终结论：

> Relationship 状态属于关系层，视觉事实属于 Host 边界，Renderer 只负责让事实被看见。`data-*` 可以继续作为观测镜像，但不能继续成为 Renderer 的隐式输入。

本刀完成后建议：

```text
XINMAI-RELATIONSHIP-NAMING-BLADE-3-READINESS-REVIEW-P0
```

刀型：

```text
READINESS / NOW DECISION
```

只判断 Relationship Naming 是否满足独立施工条件。

不得在该 Readiness Review 中：

- 实施命名；
- 迁移 Renderer；
- 修改 Pressure Seed；
- 清理其他架构债务。
