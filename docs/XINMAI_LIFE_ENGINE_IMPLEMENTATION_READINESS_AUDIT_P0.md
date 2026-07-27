# XINMAI Life Engine Implementation Readiness Audit P0

## 文档定位

- 项目：XINMAI / 星脉之境
- 底层系统：GUANYAO Life Engine / 观爻生命引擎
- 文档编号：`XINMAI-LIFE-ENGINE-IMPLEMENTATION-READINESS-AUDIT-P0`
- 模式：总施工协议 → 现有工程消费者就绪度审查
- 性质：只读架构审查
- 审查依据：当前工作区真实代码、当前 1.0 活跃路由与《XINMAI Life Engine Implementation Protocol V1.0》
- 生效日期：`2026-07-27`
- 代码修改：无
- Runtime 修改：无
- 新增 Type / Service / Engine：无

本审查只回答：

> 总施工协议中的生命状态，当前是否已有真实来源、明确消费者与用户可感知结果；下一刀应该校准哪个已有消费者。

本审查不因为存在同名文件、文案、`data-*` 标记或视觉元素，就判定产品语义已经成立。

---

## 一、审查状态定义

| 状态 | 定义 |
| --- | --- |
| 已成立 | 真实来源、活跃消费者、用户动作和可感知结果已经连续 |
| 已成立基础 | 主链已经可运行，但用户语义仍需收束 |
| 部分成立 | 有可靠来源或承载面，但没有完整表达冻结语义 |
| 展示层存在 | 已有文案或视觉说明，但不由真实状态和用户关系驱动 |
| 承载面就绪 | 视觉或运行容器可复用，但不能据此宣称业务语义已实现 |
| 尚无真实来源 | 没有可追溯输入，禁止前台宣称已经识别 |
| 隔离资产 | 文件存在，但不属于当前 1.0 活跃用户路径 |

---

## 二、最高审查结论

### 2.1 当前已经形成一条真实生命主干

当前 1.0 活跃路线是：

```text
/launch-lab
↓
/genesis
↓
/reality
↓
/dynamics
↓
/archive
```

其真实生命链已经可以运行：

```text
出生钥匙
↓
生命坐标与二十八宿
↓
四象力量与星兽显相
↓
用户认出同一生命
↓
同一生命进入Reality
↓
现实压力改变生命状态
↓
六维显影与Gravity惯性
↓
Choice回应空间
↓
用户在现实中认出一次不同
↓
Crystal附着同一身体
↓
人格年轮持久化
↓
老用户回到同一生命世界
```

以下能力已经真实成立：

1. 出生时间、二十八宿、四象与星兽身份来自真实生命来源链，而不是前台重新计算。
2. Genesis 使用同一 WebGL 核心和身体完成生命坐标、力量方向、生命显相与认出。
3. 用户确认认出后，生命身份、显相和视觉连续资产才被持久化。
4. Reality、Dynamics、Archive 能恢复并消费同一个 `sourceReferenceId`。
5. 压力改变状态层，不替换生命身份。
6. Choice 已隔离“确认后直接生成 Crystal”的旧链，要求用户回到现实并认出一次真实不同。
7. Crystal 能从现有生命表面形成印记，并进入同一生命年轮。
8. 老用户入口优先验证身份和视觉连续性，不重新执行出生初始化。

结论：

> 当前工程不需要重建生命身份、星兽、Reality、Choice、Crystal 或 Archive 系统。

### 2.2 完整技术链存在，但完整产品语义链尚未成立

当前技术运行链可以抵达 Archive，但产品协议中的以下语义仍不完整：

```text
Pressure
↓
Reflection
↓
Choice
```

具体原因不是缺少页面，而是：

> Reflection 尚未成为一个真实消费生命状态和用户主动靠近的阶段。

当前 `/dynamics` 中虽然存在：

- 六维生命状态；
- 保护性理解文案；
- `Mirror / Identify / Validate / Shift` 视觉说明；
- Choice 停顿；
- 用户确认；

但它们尚未形成一条：

```text
我发现一处变化
↓
我主动靠近
↓
系统描述我看见的状态
↓
我确认或修正保护方式
↓
我理解它曾经如何保护我
↓
我决定是否尝试新的回应
```

因此当前体验仍可能被用户感知为：

> 系统播放六个观察节点，然后给出一个回应动作。

而不是：

> 我主动看见、理解并回应自己的生命。

### 2.3 当前最大断点

最大断点位于活跃消费者：

```text
GravityPage
+
XinmaiLifeReflectionGuide
```

证据：

1. `XinmaiLifeReflectionGuide` 已展示四步照见，但由 `AppShell` 在 `/dynamics` 全局挂载。
2. 它不消费当前六维状态、Gravity惯性、用户输入或用户靠近动作。
3. 它没有四步交互阶段，也没有用户接受、修正、暂停命名的权利。
4. 它使用 `aria-hidden`，本质是背景语义提示，不是用户正在经历的 Reflection。
5. `GravityPage` 中的保护性理解文案是确定性 Presentation Copy，不是 AI 输出。

结论：

> 当前不能对用户宣称“AI四步照见已经成立”。已经成立的是四步视觉骨架和保护性语言基础。

---

## 三、生命状态机工程映射

| 生命状态 | 现有真实来源 | 活跃消费者 | 就绪状态 | 当前用户感知 | 主要缺口 |
| --- | --- | --- | --- | --- | --- |
| Origin | 出生时间、生命坐标、28宿结果 | `LaunchLab`、Genesis Projection、Renderer | 已成立 | 我的时间打开了天地中的位置 | 首页与出生钥匙仍共处一个大型页面，结构复杂但链路真实 |
| Awakening | 四象、母码力量方式、星兽显相来源 | `GenesisProductionExperiencePage`、`genesisWebGLRendererCore` | 已成立 | 生命力量显现，并被我认出 | 星兽外层原相仍需逐屏精修，但不是协议断点 |
| Reality | 用户认出的 Pressure Seed 候选 | `RealityProductionRouteEntry`、`RealityProductionHost` | 已成立基础 | 新的现实靠近同一个生命 | 仍以候选选择为核心交互，Reality Event 叙事较弱 |
| Pressure | SelectedPressureSeedContext、六维 Runtime、视觉投影 | `RealityLifeUniverseCanvas`、`GravityPage` | 已成立基础 | 现实正在改变生命状态 | 六维顺序推进仍可能像流程或分析 |
| Reflection | 当前没有 AI Reflection 生产来源 | `XinmaiLifeReflectionGuide`、Gravity保护性文案 | 展示层存在 | 可以读到“看见、命名、理解、转化” | 不由用户靠近触发，也不消费真实输入 |
| Choice | Revision Action、回应间隙、用户确认 | `GravityPage` | 已成立基础 | 旧路径存在，但我可以停一下 | 尚未由完整 Reflection 会话自然进入 |
| Crystal | Hexagram、Migration Impact、用户真实回应确认 | `GravityPage`、Crystal Adapter | 已成立基础 | 经历在同一生命中留下印记 | 形成资格仍带有技术完成证据，语义需继续绑定用户理解证据 |
| Archive | PersonalityRingLite 持久化条目 | `PersonalityRingPage` | 已成立基础 | 同一个生命记得变化 | 长期章节叙事仍轻，当前主要是印记回望 |
| Sanctuary | 持久生命身份、最近Reality、最近Crystal | `LaunchLab` 老用户入口 | 部分成立 | 我回到同一个生命世界 | 尚未形成独立生命天气与长期圣所节律 |

---

## 四、Origin 与 Awakening 就绪度

### 4.1 已成立链路

```text
Birth Key
↓
LaunchLifeSourceSession
↓
28宿与四象Projection
↓
Genesis Runtime
↓
同一Renderer
↓
生命坐标
↓
力量方向
↓
星兽显相
↓
Recognition
```

核心消费者：

- `src/pages/LaunchLab.tsx`
- `src/pages/GenesisProductionExperiencePage.tsx`
- `src/components/GenesisProductionRendererCanvasHost.tsx`
- `src/renderers/genesisWebGLRendererCore.ts`
- `src/services/sessionService.ts`

### 4.2 已成立能力

- Genesis 自动消费 Launch 已确认的出生钥匙，不要求重复输入。
- 生命坐标、四象方向、力量节律和星兽显相在同一 Runtime 中连续推进。
- Life Origin 需要用户主动轻触后才完成显化。
- Recognition 需要用户明确点击“我认出它了”。
- Reality 入口需要用户明确点击“与它一起进入现实”。
- 不存在自动跳转到 Reality。

### 4.3 当前缺口性质

当前缺口属于视觉显性和节奏精修，不属于系统缺失：

- 星兽原相的文化识别仍需持续校准；
- Life Origin 与完整星兽身体之间需要保持同源生长；
- 不应为解决视觉问题新增生命身份或星兽模型。

结论：

> Origin 与 Awakening 已具备继续施工的稳定基础，不是下一刀最高优先级。

---

## 五、新用户 / 老用户双路径就绪度

### 5.1 身份持久化已成立

`sessionService` 已持久化并恢复：

- `LaunchLifeSourceSession`；
- Genesis Presence Recognition；
- Genesis Visual Continuity。

`hasPersistedRecognizedLifeIdentity` 要求：

```text
Life Source
+
Visual Continuity
+
Recognized Presence
+
相同sourceReferenceId
```

同时成立后，才把用户视为已有生命身份。

### 5.2 老用户回归消费已成立基础

`LaunchLab` 已区分：

- 新用户生命召唤；
- 老用户回到生命世界。

老用户入口已消费：

- 同一星兽身份；
- 同一视觉连续资产；
- 最近 Reality 痕迹；
- 最近 Crystal 身体印记。

并冻结优先级：

```text
身份
↓
状态
↓
经历
↓
印记
```

### 5.3 当前缺口

- 回归入口已像生命圣所，但尚无正式 Life Weather 消费对象。
- 当前状态来自最近 Reality 与 Crystal 的组合，不是一个独立、持续更新的生命天气。
- 生命圣所尚未拥有月相、季节、声音和长期空间变化的统一节律。

结论：

> 双路径已经成立；Sanctuary 和 Life Weather 应建立在现有回归入口上，而不是新建另一套首页或身份系统。

---

## 六、Reality 就绪度

### 6.1 已成立链路

```text
同一Genesis身份
↓
NEW_REALITY_ENCOUNTER
↓
现实候选靠近
↓
用户明确认出
↓
SelectedPressureSeedContext
↓
Gravity Ready
```

核心消费者：

- `src/pages/RealityProductionRouteEntry.tsx`
- `src/components/RealityProductionHost.tsx`
- `src/components/RealityPressureSeedPresentation.tsx`
- `src/components/RealityLifeUniverseCanvas.tsx`

### 6.2 已成立能力

- 每次进入 Reality 都创建新的现实相遇。
- 历史 Reality 只作为记忆，不自动成为当前事件。
- 压力候选不能自动选择。
- 用户可以认出、暂停或换一组。
- 用户认出后，才允许进入 Gravity。
- Reality 与 Dynamics 继续消费同一视觉身份。

### 6.3 用户语义偏差

当前工程结构仍以：

- Candidate Bundle；
- Pressure Seed；
- Recognize；
- Request Next Bundle；

为主要交互骨架。

这些结构可以安全承载“用户认出当前现实”，但视觉上仍容易像候选选择器。

此外：

- `RealityProductionRouteEntry` 已把外层失败语言改为“你的生命世界还未唤醒”；
- `RealityProductionHost` 的内部保护分支仍直接显示 `SOURCE_NOT_READY`。

结论：

> Reality 的数据链已成立，下一步只应升级现有 Presentation 消费语义，不应新增 Reality Event Engine。

---

## 七、Pressure、六维与 Gravity 就绪度

### 7.1 已成立链路

```text
SelectedPressureSeedContext
↓
GuanyaoRuntimeEngine
↓
六维生命显影
↓
重复回应痕迹
↓
Gravity保护方式
```

核心消费者：

- `src/pages/GravityPage.tsx`
- `src/components/RealityGravityInertiaField.tsx`
- `src/components/RealityLifeUniverseCanvas.tsx`
- 现有 Dynamics Adapter。

### 7.2 已成立能力

- 六维已明确定位为生命状态显影，不是人格分析。
- Gravity 的轨迹表达“过去影响下一次回应”，不是命运锁定。
- 同一生命核心和身体在压力、恢复与惯性阶段持续存在。
- 恢复不是回到初始状态，经历痕迹可以进入下一次回应倾向。
- `data-dynamics-meridian-inference="FORBIDDEN"` 已明确禁止用六维伪装七星经络。

### 7.3 当前语义偏差

- 六维仍按固定顺序逐一完成，容易形成流程关卡或分析步骤。
- 用户主要通过点击核心推进节点，尚未从“我发现哪一处变化”开始。
- Gravity 能表达惯性，但尚不能可靠宣称识别了外尘、情尘、念尘或执尘。

结论：

> Pressure 与 Gravity 有真实消费者；缺口是发现式交互与 Reflection 衔接，不是新的压力算法。

---

## 八、Dust 与七星经络就绪度

### 8.1 Dust 四层

当前没有正式生产来源可以输出：

- 外尘；
- 情尘；
- 念尘；
- 执尘。

现有 Pressure、六维和保护性文案可作为未来解释证据，但不能自动推导尘遮层级。

状态：

> 尚无真实来源。

禁止：

- 把 Pressure Seed 直接改名为外尘；
- 把情绪维度直接改名为情尘；
- 从单次点击推断执尘；
- 在没有用户确认时给出身份级判断。

### 8.2 七星生命经络

当前工程中存在三种容易混淆的“七”：

1. 二十八宿的四组七宿；
2. 星兽身体的结构点；
3. 协议中的七星生命经络。

当前没有：

- 天枢；
- 天璇；
- 天玑；
- 天权；
- 玉衡；
- 开阳；
- 瑶光；

的真实生产状态。

状态：

> 视觉承载面存在，但业务来源尚未成立。

禁止：

- 用七宿骨相冒充内部七星经络；
- 用六维一一映射七星；
- 为内观效果制造七个假的能力值；
- 显示“玉衡冻结”等未经真实来源支持的结论。

---

## 九、Reflection 与 AI 就绪度

### 9.1 已有资产

当前已经存在：

- `XinmaiLifeReflectionGuide` 四步视觉骨架；
- 六维观察文案；
- 保护性理解文案；
- Choice 回应空间；
- 用户明确确认动作。

### 9.2 尚未成立的能力

当前不存在：

- AI Reflection 生产 Runtime；
- 用户输入到 Reflection 的消费链；
- Mirror → Identify → Validate → Shift 的真实阶段状态；
- 用户修正或拒绝命名的交互；
- 用户主动靠近触发 AI 的机制；
- AI Life Memory 消费者。

因此：

```text
四步视觉说明
≠
AI四步照见
```

### 9.3 可以立即复用的现有消费者

下一阶段无需先创建 AI 模块。

可以先在 `GravityPage` 中把已有确定性状态和文案组织为用户主动靠近：

```text
看见当前生命变化
↓
用户愿意继续靠近
↓
呈现保护性理解候选
↓
用户确认“这像我”或暂不接受
↓
Choice才开放
```

这能建立 Reflection 的产品关系，同时保持：

- 不伪装成 AI 生成；
- 不新增诊断；
- 不定义用户；
- 不阻塞未来真实 AI 接入。

---

## 十、Choice 就绪度

### 10.1 已成立能力

当前 `GravityPage` 已经具备：

- 旧路径仍然存在；
- 回应间隙；
- 用户主动确认；
- 不提供唯一答案；
- 可选择继续观察；
- 可带着回应空间回到新的 Reality。

同时：

`LEGACY_DIRECT_CHOICE_TO_CRYSTAL_FLOW_ISOLATED = true`

确保旧的“Choice确认后立即生成 Crystal”链路不再生效。

当前 Crystal 需要：

```text
Choice
↓
继续面对Reality
↓
用户认出一次已经发生的不同
↓
Crystal
```

### 10.2 当前缺口

Choice 的用户主动性已成立基础，但它与 Reflection 的关系还不完整。

用户尚未经历一个明确的：

> 我理解了这个保护方式，所以愿意为新的回应留出空间。

结论：

> Choice 不需要新算法；应等待 Reflection 消费层补齐因果。

---

## 十一、Crystal 与 Archive 就绪度

### 11.1 Crystal 已成立基础

Crystal 当前具备：

- 用户真实回应确认门槛；
- 同一生命来源引用；
- 基于变化来源维度的身体附着位置；
- 克制的声音、光与留白；
- 不使用宝箱、奖励或装备语言；
- 沉积后进入人格年轮。

### 11.2 Archive 已成立基础

活跃 `/archive` 使用 `PersonalityRingPage`，而不是旧 R7 历史列表。

它能够：

- 恢复同一 Genesis 视觉身份；
- 在同一身体中叠加历史印记；
- 按时间和现实压力深度组织痕迹；
- 轻触印记回望生命经历；
- 隐藏原始压力文本，降低隐私暴露；
- 保持“生命记得变化”而不是收藏品语义。

### 11.3 当前缺口

- Crystal 的来源位置目前来自六维 `primaryDimension` 的视觉槽位，不是七星经络。
- PersonalityRingLite 记录的是轻量条目，不是完整生命章节。
- AI Life Memory 尚未消费这些条目。
- Archive 已是生命年轮基础，但还不是完整长期叙事系统。

结论：

> Crystal / Archive 已足够支撑 1.0 主链，不是当前最大断点。

---

## 十二、Life Weather、时间、声音与 Sanctuary 就绪度

### 12.1 Life Weather

当前已有可复用输入：

- 当前 Reality 压力；
- 恢复状态；
- Gravity惯性痕迹；
- 最近 Crystal。

当前已有可复用表现面：

- `RealityLifeUniverseCanvas`；
- `genesisWebGLRendererCore`；
- Launch 老用户生命世界。

但代码中没有正式 Life Weather 消费器。

状态：

> 承载面就绪，产品机制尚未成立。

### 12.2 生命时间

当前 Launch 已消费：

- 公历出生时间；
- 农历映射；
- 月相；
- 时辰。

但尚未形成：

- 节气环境；
- 季节变化；
- 长期生命世界时间。

状态：

> Origin 时间表达已成立，长期天地时间部分成立。

### 12.3 Audio Life Engine

当前存在克制的 Crystal 理解音，但没有统一生命声音消费者。

尚未形成：

- 不同生命状态的声音语法；
- Crystal 声轨；
- 圣所长期声场。

状态：

> 单点声音反馈存在，Audio Life Engine 尚未成立。

### 12.4 Sanctuary

Launch 老用户入口已经承担生命圣所雏形：

```text
同一星河
↓
同一星兽
↓
最近经历
↓
最近印记
↓
进入新的Reality
```

但它还没有：

- 正式 Life Weather；
- 长期时间节律；
- 多次 Crystal 的空间成长；
- 个人生命声场。

状态：

> Sanctuary 入口基础已成立，长期圣所系统属于 P1。

---

## 十三、隔离资产审查

以下资产存在，但不应作为当前 1.0 已完成能力：

- `RealityGravityPresentation`
- `RealityChoicePresentation`
- `choiceExperienceUIRuntime`
- `crystalExperienceUIRuntime`
- `PersonalStarBeastWebGLPrototypeHarness`
- 旧 `ChoicePage`
- 旧 `/gravity`、`/choice`、`/breach-scan`、`/yao-device`、`/repair-method`

这些资产主要属于原型、审查或已重定向链路。

当前施工必须继续落在：

- `/genesis`
- `/reality`
- `/dynamics`
- `/archive`

禁止为了补齐协议重新激活旧页面。

---

## 十四、工程语言泄漏审查

### 已完成收束

- Reality 外层恢复文案已使用“你的生命世界还未唤醒”。
- 老用户入口不显示数据恢复或身份加载语言。
- 活跃主页面主要使用生命关系语言。

### 仍存在的风险

- `RealityProductionHost` 内部保护分支仍可能显示 `SOURCE_NOT_READY`。
- Genesis 的保护分支仍可能显示 `SOURCE_NOT_READY`。
- `RealityChoicePresentation` 等隔离资产仍包含 `Choice Ready`、`Crystal Experience 已准备好` 等工程化文案。

判断：

- 活跃链路中的 `SOURCE_NOT_READY` 属于低频但真实的用户语义风险；
- 隔离资产不应优先修改，只需保持隔离。

---

## 十五、Codex 施工规则审查

当前工程对总协议四个准入问题的回答：

### 1. 修改服务哪个生命状态？

活跃代码已经可以明确区分：

- Origin / Awakening：Genesis；
- Reality：Reality；
- Pressure / Choice / Crystal：Dynamics；
- Archive：Personality Ring；
- Returning / Sanctuary 基础：Launch。

通过。

### 2. 改变哪个用户感知？

多数视觉施工已有明确语义，但 Reflection 仍主要以说明层存在。

部分通过。

### 3. 是否增强生命连续性？

同一 `sourceReferenceId`、同一视觉连续资产、同一身体印记与返回路径已形成强约束。

通过。

### 4. 是否违反“不是工具、不是测试、不是宠物、不是游戏数值”？

- Genesis、Reality生命画布、Crystal、Archive 已基本守住；
- Reality 候选选择仍有轻度测试感；
- Dynamics 六维顺序推进仍有轻度流程感；
- 未发现等级、战力、排行榜或宠物养成进入活跃主链。

基本通过，仍需消费者校准。

---

## 十六、施工优先级

排序依据：

1. 用户无法理解或无法参与；
2. 视觉与产品因果断裂；
3. 长期机制与美术精修。

### P0｜Reflection 主动靠近消费者

目标消费者：

- `GravityPage`
- `XinmaiLifeReflectionGuide`

只解决：

```text
生命状态被看见
↓
用户主动靠近
↓
保护性理解出现
↓
用户拥有确认、修正或暂停权
↓
Choice开放
```

禁止：

- 新 AI Engine；
- 新诊断模型；
- 新 Dust 分类；
- 新七星算法；
- 把确定性文案伪装成 AI 输出。

### P1｜Reality Event 语义消费校准

目标消费者：

- `RealityPressureSeedPresentation`
- `RealityProductionHost`

目标：

- 从候选选择感转为“哪一幕现实刚刚触碰了我”；
- 保持现有 Pressure Seed 来源和明确认出动作；
- 消除活跃保护分支中的工程状态文案。

### P2｜Life Weather 回归消费

目标消费者：

- `LaunchLab` 老用户入口；
- `RealityLifeUniverseCanvas`；
- `genesisWebGLRendererCore`。

目标：

- 把已有 Reality、恢复、惯性与 Crystal 痕迹组织为低频生命天气；
- 不新增身份或第二生命画布；
- 不提前开发完整 Sanctuary 系统。

### P3｜Archive 生命章节

目标消费者：

- `PersonalityRingPage`

目标：

- 从多道身体印记进一步形成生命章节；
- 保持年轮，不退回历史列表；
- 等 Reflection 证据链成立后再扩展。

### P4｜时间、声音与圣所长期成长

属于 P1/P2 产品版本边界，不应抢在 Reflection 之前施工。

---

## 十七、下一刀唯一建议

```text
XINMAI-INNER-VIEW-APPROACH-CONSUMER-P0
```

唯一目标：

> 让用户在 `/dynamics` 中不是被动看完六维说明，而是主动靠近同一个生命的一处状态变化；现有保护性理解只有在用户靠近后出现，并且用户可以确认“这像我”、修正或暂时停下。

只改已有消费者：

- `GravityPage`
- `XinmaiLifeReflectionGuide`
- 必要的现有表现样式

不新增：

- AI Engine；
- Dust Engine；
- 七星状态；
- 新协议；
- 新生命模型。

验收句：

> 不是系统替我分析，而是我主动靠近自己的生命，并第一次愿意理解它为什么这样保护我。

---

## 十八、最终结论

### 当前是否已经形成完整状态链？

工程运行链：

```text
Origin
↓
Awakening
↓
Reality
↓
Pressure
↓
Choice
↓
Crystal
↓
Archive
↓
Returning
```

已经成立。

产品生命链：

```text
Origin
↓
Awakening
↓
Reality
↓
Pressure
↓
Reflection
↓
Choice
↓
Crystal
↓
Archive
↓
Sanctuary
```

尚未完全成立。

### 当前最大断点在哪里？

不是 Renderer，也不是数据来源。

最大断点是：

> `/dynamics` 中的 Reflection 仍是静态说明，没有成为用户主动靠近、理解并确认保护方式的真实消费阶段。

### 下一刀应该改哪个消费者？

优先修改：

```text
GravityPage
+
XinmaiLifeReflectionGuide
```

而不是新增：

- AI 协议；
- Dust 类型；
- Meridian Engine；
- 新页面；
- 新身份模型。

最终判断：

> XINMAI 已经拥有一条真实、连续的生命主干。下一阶段的关键不是增加系统，而是把已经存在的生命状态真正交还给用户参与。
