# XINMAI / 星脉之境

# XINMAI-INNER-VIEW-CONSUMER-MAPPING-P0

## 文档定位

- 项目：XINMAI / 星脉之境
- 底层系统：GUANYAO Life Engine / 观爻生命引擎
- 文档编号：`XINMAI-INNER-VIEW-CONSUMER-MAPPING-P0`
- 模式：产品协议 → 工程消费者映射
- 性质：只读架构审查
- 审查依据：当前工作区真实代码、当前 1.0 活跃路由与已冻结协议
- 生效日期：`2026-07-27`
- 代码修改：无
- Runtime 修改：无
- 新增 Type / Service / Engine：无

本审查把《XINMAI INNER VIEW REVELATION INTERACTION P0》冻结的生命内观链：

```text
生命天气
↓
用户感知一处不同
↓
主动靠近
↓
七星 / 生命结构显影
↓
三次靠近
↓
AI四步照见
↓
Choice回应
↓
生命重新流动
↓
Crystal原位沉积
↓
生命年轮
```

映射到当前工程已经存在的：

- 数据来源；
- Runtime 与 Adapter；
- 页面；
- WebGL / DOM 视觉消费者；
- 用户交互；
- 持久化资产。

本审查不因为“存在同名文案或视觉元素”就判定协议已经成立。

只有同时具备：

```text
真实来源
↓
明确消费者
↓
用户主动关系
↓
可感知结果
```

才判定为已成立。

---

## 一、审查状态定义

|状态|定义|
|-|-|
|已成立|真实来源、活跃消费者、用户动作与用户感知已经连续|
|部分成立|已有可靠来源或承载面，但还没有完整表达冻结协议|
|视觉承载已就绪|已有同一生命画布与表现能力，但不能据此宣称业务语义已经成立|
|展示层存在|已有文案或静态提示，但没有被真实状态与用户动作驱动|
|尚无真实来源|没有可追溯输入，禁止前台宣称系统已经识别|
|隔离资产|代码仍存在，但不在当前 1.0 活跃用户路径中|

---

## 二、最高审查结论

### 2.1 已经成立的生命连续主干

当前工程已经具备一条可运行的连续生命主干：

```text
Genesis同一生命身份
↓
Reality用户认出新的现实
↓
SelectedPressureSeedContext
↓
RealityLifeUniverseCanvas
↓
genesisWebGLRendererCore
↓
同一核心与身体发生状态变化
↓
Gravity重复回应痕迹
↓
Choice停顿与用户主动确认
↓
Crystal附着同一身体
↓
PersonalityRing同源年轮
```

以下能力已经真实存在：

1. Reality 与 Dynamics 能继续消费同一份 Genesis 视觉连续资产。
2. 现实压力通过已有 Projection 改变同一身体的姿态、密度、节律与流向，不替换星兽身份。
3. Gravity 能把恢复痕迹转化为“过去影响下一次回应”的方向偏向。
4. Choice 已经具备旧路径仍在、生命停顿、用户主动确认、不给唯一答案的交互边界。
5. Crystal 已经能够从既有生命表面产生身体附着几何，并继续进入人格年轮。
6. Archive 活跃路由消费同一生命宇宙，不再以旧式历史列表作为主要体验。

这意味着：

> 内观机制不需要新建生命身份、星兽、压力、Choice、Crystal 或 Archive 系统。

### 2.2 尚未成立的内观核心

当前工程还没有一条真实的：

```text
用户感知异常
↓
主动靠近异常位置
↓
内观逐层显影
↓
三次关系深化
↓
AI被靠近唤醒
```

生产链。

当前最大缺口不是渲染能力，而是：

> “用户主动靠近”尚未成为 Reality / Dynamics 中可追踪的交互阶段。

现有体验仍主要由 Runtime 顺序推进六维空间，用户虽然可以轻触与确认，但系统还没有明确区分：

- 用户观察到了生命天气；
- 用户选择靠近哪一处变化；
- 第一次靠近；
- 第二次靠近；
- 第三次靠近；
- 用户拒绝或暂停某次理解。

### 2.3 七星经络仍无真实状态来源

当前工程中存在三种容易被混淆的“七”：

1. 二十八宿中的四组七宿；
2. 星兽身体的结构节点与星骨；
3. 协议中的七星生命经络。

它们不是同一个对象。

`genesisWebGLRendererCore` 已明确约束：

- 生命来源显化中的七点属于已有七宿星区；
- 这些连线不是内部七星经络；
- 不得为了视觉补充装饰星或假经络。

当前没有以下真实生产状态：

- 天枢；
- 天璇；
- 天玑；
- 天权；
- 玉衡；
- 开阳；
- 瑶光。

因此：

> 现阶段可以让用户靠近“生命状态变化位置”，但不能宣称系统已经识别“玉衡冻结”或某一条七星经络阻滞。

### 2.4 六维不能替代七星经络

当前活跃 Dynamics 已经具备：

- 身体；
- 情绪；
- 思维；
- 行动；
- 记忆；
- 动机 / 目标。

六维的真实作用是：

> 呈现现实经历正在生命哪些表现层留下痕迹。

七星经络的冻结语义是：

> 呈现生命力量在哪里流动或停顿。

当前 `GravityPage` 已显式标记：

```text
data-dynamics-meridian-inference="FORBIDDEN"
```

所以禁止：

```text
身体 = 天枢
情绪 = 天璇
思维 = 天玑
……
```

这种一一重命名。

这会制造不存在的生命来源，并破坏产品可信度。

### 2.5 AI四步当前是展示层，不是生产消费者

`XinmaiLifeReflectionGuide` 已经呈现：

```text
Mirror
↓
Identify
↓
Validate
↓
Shift
```

但当前它：

- 由 `AppShell` 在 `/dynamics` 全局挂载；
- 不由用户靠近触发；
- 没有按四步记录交互阶段；
- 没有消费用户输入；
- 没有 AI Reflection Runtime；
- 没有“接受 / 修改 / 暂不接受命名”的用户权利状态；
- 使用 `aria-hidden`，本质上是视觉语义辅助层。

`GravityPage` 中的六维观察与保护性理解文案是确定性 Presentation Copy，不是 AI 输出。

因此当前只能表述：

> 已有四步照见的展示骨架与保护性语言素材。

不能表述：

> AI 已经根据用户生命状态完成四步照见。

---

## 三、当前活跃路由事实

当前 1.0 活跃生命旅程为：

```text
/genesis
↓
/reality
↓
/dynamics
↓
/archive
```

其中：

|路由|活跃页面|职责|
|-|-|-|
|`/genesis`|`GenesisProductionRouteEntry`|生命来源、显化、认出|
|`/reality`|`RealityProductionRouteEntry` + `RealityProductionHost`|新的现实进入同一生命空间|
|`/dynamics`|`GravityPage`|六维显影、Gravity、Choice、Crystal 的活跃整合面|
|`/archive`|`PersonalityRingPage`|同一生命的 Crystal 沉积与年轮|

以下旧路由已重定向到 `/dynamics`：

- `/gravity`
- `/choice`
- `/breach-scan`
- `/yao-device`
- `/repair-method`
- `/result`

旧 `ChoicePage` 仍包含“人格行为动力引擎”“主要行动点”等工具化、答案化表达，但不属于当前活跃 1.0 路径。

结论：

> 后续内观施工应落在现有 `/reality` 与 `/dynamics` 消费面，不应复活旧 Choice / Breach 页面。

---

## 四、内观机制 → 工程资产总映射

|生命机制|现有真实来源|现有消费者|状态|当前用户感知|核心缺口|
|-|-|-|-|-|-|
|生命天气|Reality Pressure Projection、历史 Reality / Crystal 记忆|`RealityLifeUniverseCanvas`、`genesisWebGLRendererCore`|部分成立|同一生命会被现实影响，并保留痕迹|尚未形成可由用户主动靠近的“不同位置”|
|用户感知异常|压力后的身体姿态、流向、痕迹|Reality 同一生命画布|视觉承载已就绪|能看见生命收束或偏移|异常位置不是可交互目标|
|主动靠近|当前节点轻触、Choice核心轻触|`GravityPage` 局部交互|部分成立|用户能触碰与确认|没有独立的 Inner View 进入阶段与退出权|
|内观镜头|同一 Genesis / Reality 视觉连续资产|WebGL Renderer、Dynamics 全屏生命宇宙|视觉承载已就绪|同一生命可以持续可见|没有靠近镜头与外部星河减速的阶段消费|
|生命裂隙|压力接触方向、恢复痕迹、Crystal沉积位置|Renderer pressure trace、身体粒子、印记几何|视觉承载已就绪|身体可留下受力与恢复痕迹|没有“裂隙”真实语义来源；不得病灶化|
|七星经络|无生产状态来源|当前无正式消费者|尚无真实来源|尚不能感知具体经络流动|禁止用七宿或六维伪装七星经络|
|六维显影|`GuanyaoRuntimeEngine` 六空间状态|`GravityPage`、Dynamics adapters|已成立基础|现实从六个窗口留下反应|当前为顺序浏览，尚未成为用户发现式内观|
|Gravity保护方式|压力上下文、六维 Runtime、恢复痕迹|`RealityGravityInertiaField`、Gravity presentation|部分成立|过去会影响下一次回应|能表现惯性，不能自动得出尘遮或人格结论|
|第一次靠近|六维观察文案、生命状态|`NodeProgressionPanel` 可承载|展示层存在|看见当下反应|Mirror 与 Identify 尚未形成用户触发阶段|
|第二次靠近|保护性理解候选文案|`NodeProgressionPanel` 延迟呈现|展示层存在|理解反应可能曾经保护自己|当前按计时出现，不由用户主动深入|
|第三次靠近|Revision Action、回应间隙|Choice 视觉与交互|部分成立|为新的回应留出空间|与前两次靠近没有同一会话阶段证明|
|AI四步照见|无 AI 生产输入与 Runtime|`XinmaiLifeReflectionGuide`|展示层存在|看见四步语义|不是用户唤醒，也不是 AI 消费结果|
|Choice|Gravity 完成、Revision Action、用户确认|`GravityPage`、Choice production consumer|已成立基础|旧路径仍在，但不再自动接管|仍需接入内观会话而不是独立完成阶段|
|生命重新流动|Choice 状态、Renderer 恢复与沉积进度|同一 WebGL 身体|部分成立|回应后生命恢复，并非回到原帧|尚未与用户靠近的原始变化位置建立严格引用|
|Crystal原位沉积|Hexagram、Migration Impact、六维 primaryDimension、用户确认|Crystal Runtime、Body Imprint Geometry、`PersonalityRingPage`|部分成立|经历成为同一身体纹理并进入年轮|当前位置来自六维槽位，不是七星经络状态|
|生命年轮|PersonalityRingLite 条目、Genesis视觉连续资产|`PersonalityRingPage`|已成立基础|同一个生命记得变化|需继续保持“经历”而非收藏或奖励|

---

## 五、生命天气与 Reality 消费

### 5.1 已有来源

Reality 已有真实来源：

```text
用户明确认出的现实候选
↓
SelectedPressureSeedContext
↓
adaptRealLifeVisualSource
↓
Reality Pressure Projection
```

`RealityLifeUniverseCanvas` 把该 Projection 交给同一个：

```text
createGenesisWebGLRendererCore
```

并继续传入：

- 二十八宿坐标；
- 出生宿；
- 四象方向；
- 生命力量注入；
- Personal Reveal；
- Genesis Presence Recognition；
- Reality Pressure。

因此 Reality 不是重新创建一个受压模型，而是：

> 同一生命身份继续经历新的现实。

### 5.2 已有生命状态表现

Renderer 当前已经能够消费：

- `fieldCompression`；
- `boundaryLoad`；
- `coreResistance`；
- `flowDeflection`；
- `temporalWeight`；
- `structureResponse`；
- `coreResponse`。

这些状态会改变：

- 身体粒子位置；
- 姿态；
- 核心呼吸；
- 结构可见度；
- 压力痕迹；
- 恢复后的残留；
- 下一次回应的方向偏向。

并且已有身份可见度下限：

> 压力可以改变状态，但不能让同一身体与星骨消失。

### 5.3 内观入口缺口

当前 Reality 的用户动作主要是：

- 认出一条现实候选；
- 暂停；
- 更换候选；
- 继续到 Gravity。

还没有：

- 轻触刚刚发生变化的身体位置；
- 停留观察；
- 选择是否进入内观；
- 退回共同空间；
- 稍后再看。

因此 Reality 已经具备生命天气，却还没有生命天气的主动探索入口。

### 5.4 消费建议

后续第一阶段应优先复用：

- `RealityLifeUniverseCanvas`；
- 当前 Pressure Projection；
- 同一 Renderer；
- 已有压力接触方向；
- 已有身体可见度保护。

只新增表现层阶段时，应把用户动作定义为：

```text
我注意到了这里
```

而不是：

```text
扫描异常
```

---

## 六、主动靠近与内观空间

### 6.1 当前可复用交互

`GravityPage` 已有两类可复用交互语法：

1. `NodeProgressionPanel`
   - 单句生命观察；
   - 首次轻触邀请；
   - 保护性理解候选；
   - “先观察，不定义你”的边界。

2. Choice 核心交互
   - 旧路径先启动；
   - 短暂停顿；
   - 用户轻触同一生命核心；
   - 新回应空间出现；
   - 不提供答案。

这些交互证明：

> 当前前端已有克制、非任务化、非答案化的用户参与语言。

### 6.2 当前缺失

尚无明确状态能够回答：

- 用户是否主动进入内观；
- 用户靠近的是哪一处变化；
- 用户处于第几次靠近；
- 用户是否暂停；
- 用户是否回到共同空间；
- 用户是否拒绝候选命名。

这意味着现有点击还只是节点推进或 Choice 确认，尚不是完整的 Inner View 交互。

### 6.3 最小实施边界

第一阶段不应新建 Inner View Engine。

应先在已有消费面验证一个最小关系：

```text
同一生命天气可见
↓
用户轻触该生命区域
↓
外部空间减速
↓
同一身体的已有变化提高可见度
↓
出现第一句候选映照
↓
用户可以继续、暂停或退出
```

这一阶段不推导：

- 经络名称；
- 尘遮层级；
- 人格类型；
- 病灶结论。

---

## 七、七星经络消费边界

### 7.1 当前已有的相关视觉资产

可复用资产包括：

- Genesis 星骨与身体连续轴；
- 四象七宿星区；
- 生命结构节点；
- 身体粒子；
- 核心呼吸；
- 压力接触方向；
- Crystal 身体附着几何。

这些可以成为未来七星经络的视觉母体。

### 7.2 当前不能消费的语义

当前没有生产级：

```text
Meridian State
```

也没有可靠映射：

```text
现实事件
↓
某一星穴
↓
某一经络流速 / 阻滞 / 恢复
```

所以当前不能：

- 点亮“玉衡”并宣称丰盛之轴冻结；
- 把出生宿的七点命名为七星经络；
- 把六维顺序映射成七星；
- 由星兽视觉随机选择一个经络；
- 用前端视觉反推用户的心理状态。

### 7.3 正确过渡语义

在真实七星状态来源建立前，前台只允许说：

- “这里似乎停了一下”；
- “这处流动与刚才不同”；
- “你可以靠近看看”；
- “这可能是一种曾经保护过你的回应”。

不允许说：

- “玉衡冻结”；
- “天权阻塞”；
- “你的丰盛通道受损”；
- “系统检测到经络异常”。

---

## 八、六维显影与 Gravity 消费

### 8.1 已成立能力

当前 Dynamics 已按顺序消费：

```text
body
emotion
thought
action
memory
goal
```

并将它们前台化为：

- 身体先知道压力；
- 情绪先抵达；
- 解释开始形成；
- 行动方向出现；
- 过去参与此刻；
- 想守护的核心显现。

这符合：

> 六维是生命状态的六个观察窗口。

### 8.2 已有保护性语言

当前文案已经采用候选语气：

- “也许”；
- “可能”；
- “曾经帮助你”；
- “先观察，不定义你”。

同时页面标记：

```text
data-dynamics-dust-explanation="PROTECTIVE_RESPONSE_CANDIDATE_ONLY"
data-dynamics-dust-layer="UNRESOLVED"
data-dynamics-user-confirmation="REQUIRED_BEFORE_DUST_MEANING"
```

这说明现有工程已经守住：

> 六维观察可以提出保护方式候选，但不能自行宣布尘遮结论。

### 8.3 Gravity 已成立的视觉因果

`RealityGravityInertiaField` 消费：

- 重复深度；
- 当前观察入口；
- 恢复沉积；
- 方向偏向。

其冻结语义是：

```text
过去的经历
↓
影响下一次回应倾向
↓
但不决定命运
```

这与内观协议兼容。

### 8.4 当前偏差

当前六维仍然主要是：

- 按固定顺序进入；
- Runtime 推进；
- 每个空间完成节点；
- 完成数量参与 Crystal 就绪判断。

所以它更接近一段受控体验流程，还不是：

> 用户从星兽身体中主动发现一处生命变化，并决定靠近。

后续施工应把六维从“六屏必经步骤”降级为：

> 用户靠近后可被照见的观察窗口。

但本审查不授权修改 Runtime 顺序。

---

## 九、三次靠近与 AI 四步照见

### 9.1 可复用内容

当前已有内容可以分别承担：

|靠近阶段|可复用内容|
|-|-|
|第一次：看见 / 命名|六维 `dimensionInsight`、单句生命观察|
|第二次：理解|`dimensionUnderstanding`、保护性候选语言|
|第三次：转化|Choice 回应间隙、用户主动确认|

### 9.2 当前因果断裂

这些内容目前分散在：

- 自动计时出现的文案；
- 六维节点推进；
- Choice 阶段；
- 全局 `XinmaiLifeReflectionGuide`。

它们没有共享一条“靠近会话”。

因此当前无法证明：

```text
用户第一次靠近
↓
用户接受或修正命名
↓
用户第二次靠近
↓
用户理解保护意义
↓
用户第三次靠近
↓
用户愿意尝试不同回应
```

### 9.3 AI输入缺口

未来真实 AI Reflection 至少需要消费：

- 当前 Reality Event 的安全摘要；
- 用户已明确认出的 Pressure Seed；
- 当前六维观察；
- Gravity 重复路径；
- 用户自己的描述；
- 用户是否接受候选命名；
- 用户是否愿意继续靠近；
- 历史 Crystal 中与本次有关的生命记忆。

当前缺少：

- 用户自述输入；
- 候选命名确认；
- 四步阶段记录；
- 拒绝 / 修改 / 暂停状态；
- AI输出来源与边界；
- 同一靠近会话引用。

### 9.4 当前展示层处理建议

`XinmaiLifeReflectionGuide` 可以保留为视觉设计参考，但不应继续承担：

> “AI四步已经发生”

的生产语义。

后续应让它：

- 在用户靠近后再显现；
- 每次只出现当前一步；
- 不遮挡同一生命主体；
- 允许用户暂停；
- 不自动滚完四步；
- 不以 `AI` 身份抢占生命关系。

---

## 十、Choice 消费

### 10.1 已有生产能力

当前工程存在两类 Choice 资产：

1. `realityProductionChoiceConsumer`
   - 要求已确认的 Gravity Session；
   - 要求用户主动回应；
   - 不提供推荐行动；
   - 不判断最佳选择；
   - 只输出 Crystal readiness。

2. 活跃 `GravityPage` 内 Choice 表现
   - 旧路径仍然存在；
   - 记忆影响存在但不命令；
   - 生命产生停顿；
   - 用户触碰同一核心；
   - 新回应只是一点空间；
   - 旧 Choice → Crystal 直达链已隔离，要求先有生活中的回应认出。

### 10.2 与内观协议的匹配

Choice 已经能够回答：

> 我能不能不立即沿旧路径回应？

它不需要新算法。

后续缺少的只是：

> Choice 如何继承用户刚刚靠近并理解的那一处生命变化。

### 10.3 禁止回退

不得复活旧 `ChoicePage` 的：

- 主要行动点；
- 辅助行动点；
- 系统标记；
- 切割；
- 正确行为位置。

Choice 必须继续发生在同一个生命空间，而不是进入答案列表。

---

## 十一、Crystal 原位沉积

### 11.1 已有真实链路

当前 Crystal 生产链消费：

```text
Current Hexagram Formation
+
Migration Impact
+
六维完成状态
+
Primary Dimension
+
用户确认的新回应
↓
Current Crystal End State
↓
Crystal Presentation
↓
同一生命身体印记
↓
Personality Ring Deposit
```

### 11.2 已有身体连续

`CurrentCrystalEndStateFocus` 已明确冻结：

- `SEDIMENT_NOT_REWARD`；
- `SAME_LIFE_IMPRINT`；
- `CHANGED_POSITION_TO_BODY_IMPRINT`；
- `ATTACHED_TO_EXISTING_BODY`；
- `UNDERSTANDING_NOT_CELEBRATION`；
- `ONE_RESTRAINED_TONE`；
- `ONE_POINT`；
- `BODY_IMPRINT_THEN_ARCHIVE`。

这已经满足：

> Crystal 不是旁边生成的收藏品，而是同一生命经历后的纹理。

### 11.3 当前位置来源

当前 `resolveLifeUniverseCrystalSourceSlot` 按六维映射：

|六维|身体槽位|
|-|-|
|body|0|
|emotion|1|
|thought|2|
|action / behavior|3|
|memory|4|
|motivation / goal|5|
|未知|6|

该位置继续结合：

- 出生宿索引；
- 所属七宿星区；
- 身体包络；
- 姿态偏移；
- Crystal identity key。

生成同一生命身体上的印记几何。

### 11.4 必须守住的语义

该槽位代表：

> 六维观察在同一身体上的视觉沉积方向。

它不代表：

- 七星经络编号；
- 玉衡、天权等真实星穴；
- 医学部位；
- 系统诊断出的病灶。

### 11.5 与内观协议的缺口

当前 Crystal 已经有：

- 身体来源；
- 六维来源；
- 同一身份；
- 同一几何；
- Archive 延续。

但尚未有：

- 用户首次靠近位置引用；
- 三次靠近会话引用；
- AI候选理解是否被用户接受；
- 恢复流动位置引用；
- 七星经络状态引用。

所以当前可以说：

> 这次变化优先留在身体 / 情绪 / 思维等生命表现层。

不能说：

> 这颗 Crystal 来自玉衡恢复。

---

## 十二、人格年轮消费

### 12.1 已成立能力

活跃 `/archive` 由 `PersonalityRingPage` 承担。

它能够：

- 读取 `PersonalityRingLite`；
- 继续消费真实 Genesis 视觉连续身份；
- 在同一生命宇宙中显示 Crystal；
- 使用与 Dynamics 相同的身体印记几何；
- 只保存压力字段，不暴露用户原始压力语句；
- 从当前身体纹理进入历史记忆；
- 重放同一核心上的历史印记。

### 12.2 用户感知

当前 Archive 已经能表达：

> 这个生命记得我经历过的变化。

而不是：

> 我收集了多少个奖励。

### 12.3 内观需要补充的连续性

未来每条年轮应能够回溯：

```text
我曾感知到什么
↓
我靠近了什么
↓
我理解了哪种保护方式
↓
我尝试了怎样的新回应
↓
生命哪里重新流动
```

当前条目可以保存最终 Crystal 与部分来源信息，但还没有完整的 Inner View 过程证据。

---

## 十三、“壁水貐 · 玉衡冻结 → 安忍星泉”最小闭环判断

### 13.1 可以真实继承的部分

当前已有资产可以支持：

```text
壁水貐出生宿身份
↓
同一星河与同一生命核心
↓
现实压力进入
↓
星兽身体某一方向收束
↓
Gravity留下回应偏向
↓
Choice出现停顿
↓
用户确认新的回应
↓
Crystal成为同一身体纹理
↓
进入人格年轮
```

### 13.2 当前不能真实宣称的部分

当前不能由真实工程来源证明：

```text
玉衡冻结
↓
玉衡冰层融化
↓
玉衡水流恢复
↓
安忍星泉从玉衡形成
```

原因：

1. 没有生产级玉衡状态；
2. 没有 Pressure Seed → 玉衡 的可信映射；
3. 没有七星经络流速或阻滞来源；
4. 当前 Crystal 位置来自六维槽位，不来自玉衡；
5. 当前 Crystal 名称来自既有 Crystal / Hexagram 结果，不是七星经络转化结果。

### 13.3 正确使用方式

“壁水貐 · 玉衡冻结 → 安忍星泉”目前只适合：

- 隔离视觉概念验证；
- 叙事范例；
- 未来真实来源建立后的验收 fixture。

不得直接进入真实用户生产链并声称系统已经识别。

### 13.4 当前可成立的等价最小范例

在不新增 Engine 的前提下，真实用户链可以先表达为：

```text
壁水貐的同一生命
↓
现实压力使一处水流收束
↓
用户主动靠近
↓
身体 / 情绪 / 思维中的一个观察窗口显影
↓
保护方式以候选语言出现
↓
用户停顿并尝试新的回应
↓
同一位置恢复一点流动
↓
已有Crystal成为身体纹理
```

其中不命名玉衡，也不伪造安忍星泉来源。

---

## 十四、资产处理结论

### 14.1 直接继承

|资产|继承理由|
|-|-|
|`RealityLifeUniverseCanvas`|已经保持 Genesis → Reality → Dynamics → Archive 的同一生命视觉连续|
|`genesisWebGLRendererCore`|已经承载压力、恢复、惯性、Choice停顿与Crystal沉积的同一身体变化|
|`RealityProductionHost`|已有用户认出现实、暂停、更换与继续边界|
|`RealityGravityInertiaField`|已表达过去影响下一次回应，但不是命运|
|Dynamics 六维 adapters|已有生命表现层观察语言，可作为内观内容来源|
|Choice production consumer / 活跃 Choice 表现|已有用户主动回应与无正确答案边界|
|Crystal Runtime 与身体印记几何|已有同一身体来源与沉积能力|
|`PersonalityRingPage`|已有同一生命年轮与视觉连续|

### 14.2 需要语义升级

|资产|升级方向|
|-|-|
|Reality 压力后的身体变化|从“继续 Gravity”增加为可被用户主动靠近的生命天气入口|
|六维顺序体验|从流程节点降级为靠近后出现的观察窗口|
|`NodeProgressionPanel`|从自动计时文案改为用户靠近后逐层出现|
|`XinmaiLifeReflectionGuide`|从全局静态四步展示改为用户触发的当前一步提示|
|Choice|继承同一靠近会话与同一变化位置|
|Crystal|继续使用六维身体槽位，同时明确不宣称七星经络来源|

### 14.3 继续隔离

|资产|隔离原因|
|-|-|
|旧 `ChoicePage`|工具化、行动点答案化，不符合当前生命关系|
|旧 Gravity / Choice 独立路由|当前均已重定向到 `/dynamics`|
|Prototype / Fixture 星兽内观|可以验证视觉，但不能作为真实用户来源|
|任何假定七星状态|当前无生产来源|
|任何 Dust 自动分类|当前无可信四层尘遮来源|

---

## 十五、最小消费拓扑

后续施工必须保持：

```text
Genesis Visual Continuity
│
├── Reality Pressure Projection
│   └── 同一星兽生命天气
│       └── 用户主动靠近
│           └── 已有身体变化提高可见度
│               └── 六维观察候选
│                   └── 保护方式候选
│                       └── Choice回应间隙
│                           └── 已有Crystal Runtime
│                               └── 同一身体印记
│                                   └── Personality Ring
│
└── 身份、核心、出生宿、四象、身体拓扑始终不变
```

当前不得接入的伪链：

```text
六维
≠
七星经络
```

```text
七宿星骨
≠
七星经络状态
```

```text
静态四步文案
≠
AI四步照见
```

```text
Crystal身体槽位
≠
经络诊断结果
```

---

## 十六、下一阶段施工优先级

### P1：用户无法主动靠近

优先级：最高。

建议下一刀：

# XINMAI-INNER-VIEW-FIRST-APPROACH-CONSUMER-P1

唯一目标：

> 让用户在同一生命天气中，主动靠近一处已经由真实压力投影造成的变化。

只消费：

- 现有 Reality Pressure Projection；
- 现有同一生命画布；
- 现有身体变化；
- 现有六维观察候选；
- 现有克制触碰语言。

不新增：

- Inner View Engine；
- 七星状态；
- Dust分类；
- AI服务；
- Crystal算法。

验收：

```text
现实影响生命
↓
用户先看见不同
↓
用户主动靠近
↓
同一生命显出更多
↓
第一句候选映照出现
```

遮住文字后，用户仍应感到：

> 不是系统把我拉进分析，而是我主动靠近了自己的生命。

### P2：三次靠近还没有关系状态

在 P1 成立后，再校准：

- 第一次靠近：看见 / 候选命名；
- 第二次靠近：理解保护；
- 第三次靠近：进入回应空间；
- 暂停、退出与拒绝权。

仍应优先复用已有 Gravity 与 Choice 消费者。

### P3：AI四步缺少真实输入

必须先确认：

- 用户输入来源；
- 安全摘要；
- 候选命名确认；
- 四步边界；
- 历史记忆消费；
- 用户拒绝权。

在此之前不应把展示层文案包装成 AI Reflection。

### P4：七星经络仍缺来源

只有当现有产品资产中出现可追溯、可解释、非诊断化的七星状态来源后，才讨论真实：

- 星穴选择；
- 经络状态；
- 恢复位置；
- Crystal 与经络的严格来源连续。

当前不以新增 Engine 解决该缺口。

---

## 十七、禁止新增与禁止误用

本映射冻结后，后续施工仍禁止：

1. 新建第二套星兽身份。
2. 新建 Inner View Engine。
3. 新建 Dust Engine。
4. 新建七维评分系统。
5. 用六维冒充七星经络。
6. 用七宿连线冒充七星经络。
7. 用前端视觉随机决定用户经络状态。
8. 把生命裂隙做成病灶、伤口或故障。
9. 把 AI 四步做成自动播放的分析报告。
10. 把 Choice 做成正确答案选择。
11. 把 Crystal 做成奖励、掉落、装备或收藏。
12. 复活旧工具化 Choice / Breach 链。
13. 让用户为了完成流程被迫接受系统命名。
14. 让压力、尘遮或 Crystal 覆盖生命身份。

---

## 十八、最终验收回答

### 问题一

当前工程是否已经具备生命内观所需的完整底层主干？

回答：

> 已具备同一生命、Reality压力、Gravity惯性、Choice回应、Crystal沉积与Archive连续主干；不需要重建系统。

### 问题二

当前是否已经实现“用户主动靠近自己的生命”？

回答：

> 尚未。已有触碰与确认，但没有独立、可追踪、可退出的主动靠近阶段。

### 问题三

当前是否已经实现七星经络状态？

回答：

> 尚未。现有七宿、身体节点与六维均不能等同于七星经络。

### 问题四

当前是否已经实现 AI 四步照见？

回答：

> 尚未。已有四步展示层与候选文案，但没有用户靠近触发的 AI 生产消费者。

### 问题五

当前 Crystal 是否与同一生命身体连续？

回答：

> 是。当前已按六维来源槽位附着同一身体并进入人格年轮，但不能宣称来自具体七星经络。

### 问题六

下一刀应修改哪个消费者？

回答：

> 优先修改 Reality / Dynamics 之间的现有视觉消费面，让真实压力造成的同一身体变化成为用户可主动靠近的入口；不是新增协议或 Engine。

---

## 十九、冻结结论

当前 XINMAI 已经拥有：

```text
同一个生命
↓
现实影响
↓
惯性显现
↓
回应空间
↓
身体沉积
↓
年轮记忆
```

但还没有真正拥有：

```text
我先感到不同
↓
我主动靠近
↓
生命向我显出更多
↓
理解才发生
```

因此下一阶段不应新建生命模型。

应当把已有能力重新组织为：

> 用户主动靠近同一个生命，生命才逐层显影。

最终工程边界冻结为：

> 六维提供观察，不冒充经络。

> Gravity 提供惯性，不宣布人格。

> 展示文案提供候选，不冒充 AI 结论。

> Choice 提供回应空间，不提供正确答案。

> Crystal 留在同一身体，不成为奖励。

> 内观的第一动作属于用户，而不是系统。
