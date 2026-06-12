# R8-ENGINE-P0｜观爻因果链引擎锁定协议

GUANYAO CAUSAL ENGINE LOCK V1

⸻

## 0. 阶段定义

R8-ENGINE-P0 不是开发阶段。
R8-ENGINE-P0 是因果链锁定阶段。

本阶段只回答一个问题：

观爻这台行为因果仪器，究竟如何从一个人的初始坐标，一步步生成母码、压力场、本局卦码、行为切口、爻器、器法与人格资产。

P0 不写 service。
P0 不写 mock。
P0 不接 AI。
P0 不接支付。
P0 不改 UI。
P0 不改视觉链。

P0 只锁因果主脊。

⸻

## 1. 最高定义

观爻不是内容报告。
观爻不是心理测试。
观爻不是玄学推演。
观爻不是随机卡片系统。

观爻是一台行为因果仪器。

它的核心不是“解释你是谁”，而是：

在一个现实压力场中，识别用户旧反应如何被触发、如何接管、如何形成代价，并给出一个可执行的反本能修复路径。

一句话定义：

观爻因果链 = 初始坐标 × 现实压力 → 本局行为场 → 行为动力扫描 → 下刀位置 → 修复工具 → 人格资产沉积。

⸻

## 2. 当前 R8 因果主链锁定

R8 当前唯一主链为：

ChronoCoordinate
初始坐标
↓ 映射
MotherCodeProfile
母码画像
↓ 与现实压力相撞
PressureSeed
现实压力种子
↓ 显影
PressureField
压力场
↓ 坍缩
HexagramField
本局卦码场
↓ 扫描
BehaviorEngineScan
人格行为动力引擎扫描
↓ 捕获
BreachPoint
主切口 / 副切口
↓ 工具化
YaoDevice
爻器
↓ 行动化
RepairMethod
器法
↓ 沉积
PersonalityAsset
人格资产

这条链不可跳步。
这条链不可反向生成。
这条链不可由前台视觉状态替代。
这条链不可由随机文案替代。

每一步必须有明确输入、处理、输出。

⸻

## 3. 因果链与内容链的区别

### 3.1 因果链

因果链回答：

为什么是这个结果？
为什么进入下一步？
为什么这个压力会撞出这个行为场？
为什么这个切口对应这个爻器？

因果链负责：

映射
权重
组合
坍缩
扫描
匹配
沉积

### 3.2 内容链

内容链回答：

这一页怎么说？
这一张卡怎么解释？
这一段如何让用户看懂？

内容链负责：

标题
短解读
断言
参数说明
用户可读文本
行动说明
资产摘要

### 3.3 规则

内容链不能伪装成因果链。
文案好听不等于因果成立。
页面高级不等于引擎有效。
视觉震撼不等于产品闭环。

先有因果链，再有内容链。
先有引擎主脊，再有页面表达。

⸻

## 4. 因果节点一：ChronoCoordinate｜初始坐标

### 4.1 定义

ChronoCoordinate 是用户进入观爻沙盒的第一组基础坐标。

它不是生日表单。
它不是星盘。
它不是算命入口。

它是观爻行为引擎的初始权重输入。

### 4.2 输入

year
month
day
hourBranch
locationAnchor 可选
existingUserState 可选

当前最小输入：

1995 / 06 / 02 / 子时

### 4.3 输出

ChronoCoordinate 输出：

chronoKey
chronoWeight
lifeStageWeight
behaviorCycleHint
motherCodeSeedWeight

### 4.4 作用

初始坐标只负责生成母码底层权重。
它不直接生成完整人格报告。
它不直接生成本局卦码。
它不直接决定现实压力。

它的作用是：

给母码提供初始行为底盘。

⸻

## 5. 因果节点二：MotherCodeProfile｜母码画像

### 5.1 定义

MotherCodeProfile 是用户进入本局沙盒前的初始行为底盘。

母码不是性格标签。
母码不是人格赞美。
母码不是命运身份。

母码是：

用户在压力出现之前，默认携带的一组行为惯性底盘。

### 5.2 输入

ChronoCoordinate
chronoWeight
lifeStageWeight
behaviorCycleHint

### 5.3 输出

MotherCodeProfile 输出：

motherCodeId
motherCodeName
baseForce
defaultReactionPattern
pressureSensitiveZones
defenseTendency
behaviorBias

### 5.4 作用

母码回答：

这个人默认会用什么方式回应世界？
他最容易被哪类压力撞开旧反应？
他的惯性防御方式是什么？

### 5.5 禁止

母码不能直接等同于卦码。
母码不能直接等同于最终结果。
母码不能在没有现实压力种子的情况下生成完整本局判断。

母码只是底盘，不是本局结论。

⸻

## 6. 因果节点三：PressureSeed｜现实压力种子

### 6.1 定义

PressureSeed 是本局真正开始的现实撞击点。

它不是用户随便选一个场景。
它不是心理测试题。
它不是情绪标签。

它是：

现实正在用哪一种具体压力，撞击用户的母码底盘。

### 6.2 输入

MotherCodeProfile
lifeStageWeight
relationshipRole
sceneCategory
pressureIntensity
locationAnchor 可选
recentBehaviorContext 可选

### 6.3 输出

PressureSeed 输出：

seedId
sceneText
pressureType
relationshipRole
triggerMoment
intensityLevel
costHint
fieldBias

### 6.4 作用

PressureSeed 回答：

这一局不是泛泛而谈。
这一局是被哪一个现实切片触发的？

### 6.5 重要规则

现实压力种子是变量池，不是三条固定 demo。
前台可以展示“一幕三枚种子”，但后端必须支持大种子池。

PressureSeed 不直接生成修复建议。
PressureSeed 只负责提供现实撞击点。

⸻

## 7. 因果节点四：PressureField｜压力场

### 7.1 定义

PressureField 是 PressureSeed 撞击 MotherCodeProfile 后形成的现实压力场。

它不是单个场景。
它不是一句描述。

它是：

母码底盘在现实压力作用下，被激活出来的本局压力结构。

### 7.2 输入

MotherCodeProfile
PressureSeed
pressureIntensity
fieldBias

### 7.3 输出

PressureField 输出：

fieldId
fieldName
activatedPressureZone
reactionTrigger
costDirection
riskWindow
upperFieldWeight

### 7.4 作用

PressureField 回答：

这枚现实压力种子，到底撞开了用户哪一层行为惯性？

### 7.5 规则

PressureField 是从种子到卦码之间的桥。
不能跳过 PressureField 直接生成 HexagramField。

⸻

## 8. 因果节点五：HexagramField｜本局卦码场

### 8.1 定义

HexagramField 是本局行为场的结构化结果。

它不是传统卦解。
它不是玄学报告。
它不是命运预测。

它是：

母码底盘 × 压力场，在本局沙盒中坍缩出的行为结构。

### 8.2 输入

MotherCodeProfile
PressureField
upperFieldWeight
motherCodeSeedWeight

### 8.3 输出

HexagramField 输出：

hexagramId
hexagramName
behaviorFieldName
currentTrack
inertiaPattern
conflictStructure
costPattern
engineEntrySignal

### 8.4 作用

HexagramField 回答：

这一次，用户到底进入了哪一种行为场？

### 8.5 禁止

HexagramField 不能写成传统易经解释。
不能出现“吉凶断语”。
不能出现“命运必然”。
不能变成国学卦辞页面。

它必须服务行为动力扫描。

⸻

## 9. 因果节点六：BehaviorEngineScan｜人格行为动力引擎扫描

### 9.1 定义

BehaviorEngineScan 是观爻真正开始“下刀”前的扫描阶段。

它不是报告分析。
它不是建议生成。
它不是性格评价。

它是：

对本局行为场进行动力扫描，找出旧反应链条里最值得下刀的位置。

### 9.2 输入

HexagramField
currentTrack
inertiaPattern
conflictStructure
costPattern

### 9.3 输出

BehaviorEngineScan 输出：

scanId
primaryBreachCandidate
secondaryBreachCandidates
oldReactionLoop
hiddenCost
antiInstinctOpportunity

### 9.4 作用

BehaviorEngineScan 回答：

这条旧反应链里，哪里最该被切开？

⸻

## 10. 因果节点七：BreachPoint｜主切口 / 副切口

### 10.1 定义

BreachPoint 是本局行为修复的下刀位置。

它不是选择题。
它不是用户偏好。
它不是心理测评选项。

它是：

行为动力引擎扫描后，给出的可被下刀的旧反应节点。

### 10.2 输入

BehaviorEngineScan
primaryBreachCandidate
secondaryBreachCandidates
oldReactionLoop
hiddenCost

### 10.3 输出

BreachPoint 输出：

breachId
breachType
breachTitle
oldReaction
triggerCondition
costIfUnchanged
antiInstinctDirection

### 10.4 主切口

主切口是本局最核心的下刀点。
主切口必须来自引擎扫描，不可随机生成。

### 10.5 副切口

副切口是辅助下刀点。
副切口可以作为替代路径，但不能抢主切口的因果权重。

### 10.6 规则

用户可以在前台认领或选择切口，但切口池必须由引擎生成。
不能让前台选择反向决定引擎结果。

⸻

## 11. 因果节点八：YaoDevice｜爻器

### 11.1 定义

YaoDevice 是对 BreachPoint 的工具化响应。

爻器不是装饰卡。
爻器不是玄学法器。
爻器不是收藏物。

爻器是：

针对本局切口生成的行为干预工具。

### 11.2 输入

BreachPoint
antiInstinctDirection
triggerCondition
costIfUnchanged

### 11.3 输出

YaoDevice 输出：

deviceId
deviceName
deviceType
deviceFunction
activationContext
counterPattern

### 11.4 作用

YaoDevice 回答：

要切开这个旧反应，需要什么工具？

### 11.5 禁止

爻器不能变成符咒。
不能变成玄学道具。
不能变成虚构装备炫技。

它必须服务现实行为动作。

⸻

## 12. 因果节点九：RepairMethod｜器法

### 12.1 定义

RepairMethod 是 YaoDevice 的行动化输出。

器法不是建议。
器法不是鸡汤。
器法不是“你应该多沟通”。

器法是：

用户在现实中可以执行的一组反本能行为动作。

### 12.2 输入

YaoDevice
BreachPoint
activationContext
counterPattern

### 12.3 输出

RepairMethod 输出：

methodId
firstAction
forbiddenAction
executionWindow
fallbackMove
relapseWarning

### 12.4 作用

RepairMethod 回答：

用户下一次遇到类似压力时，具体要反着做什么？

### 12.5 规则

器法必须可执行。
器法必须短。
器法必须具体。
器法必须对应切口。

禁止泛建议：

建议你冷静
建议你沟通
建议你接纳自己
建议你放轻松

⸻

## 13. 因果节点十：PersonalityAsset｜人格资产

### 13.1 定义

PersonalityAsset 是本局行为因果链的沉积结果。

它不是历史记录。
它不是报告收藏。
它不是普通 Archive。

它是：

用户完成一次行为因果推演后，沉积下来的可复用行为资产。

### 13.2 输入

ChronoCoordinate
MotherCodeProfile
PressureSeed
HexagramField
BreachPoint
YaoDevice
RepairMethod

### 13.3 输出

PersonalityAsset 输出：

assetId
assetTitle
motherCodeSnapshot
pressureSeedSnapshot
hexagramSnapshot
breachSnapshot
deviceSnapshot
methodSnapshot
assetSummary
futureDefenseHint
createdAt

### 13.4 作用

PersonalityAsset 回答：

这一次推演，用户到底留下了什么可复用的行为资产？

### 13.5 规则

Archive 是资产库，不是历史列表。
资产沉积必须来自完整因果链。
不能没有切口、没有爻器、没有器法就生成完整人格资产。

⸻

## 14. 当前 R8 禁止回流的旧逻辑

以下旧逻辑不得回流到 R8 前台主链：

Source
Identity
Force
Gravity
Choice
YaoCode
前五爻自动推进
第六爻反本能选择
旧 choiceHistory 二元点击链
六爻作为前台逐步流程
传统卦辞解释
命运预测式结果
心理测试式人格标签

可以保留为后端隐喻、数据结构参考或历史命名残影，但不得重新成为 R8 前台链路。

⸻

## 15. 六爻在 R8 中的位置

六爻不作为当前前台流程。
六爻不再显示为“前五爻 + 第六爻选择”。

在 R8 中，六爻只能作为：

行为动力引擎内部的切片机制
卦码结构内部的行为层级
内容生成时的底层参考

前台只看到：

本局卦码
行为动力引擎
主切口 / 副切口
爻器
器法
人格资产

⸻

## 16. 视觉链与因果链的关系

视觉链不决定因果链。
视觉链承载因果链。

例如：

一字线
光点
毛玻璃
仪器盒
资产卡

这些是视觉表达，不是引擎逻辑。

视觉链不能替代引擎。
不能因为页面显示了某个轨道，就认为因果已生成。
只有因果链输出了对应节点，视觉链才能承接显示。

⸻

## 17. P1 工程化边界

R8-ENGINE-P1 才开始写代码。

P1 只允许做：

types
mock data
pipeline service
pure functions
unit-like demo flow

P1 不做：

UI 大改
视觉链重构
真实 AI 接口
真实支付
真实用户系统
数据库
云端存储

P1 的目标是跑通：

mockChronoCoordinate
→ resolveMotherCode
→ selectPressureSeed
→ buildPressureField
→ buildHexagramField
→ runBehaviorEngineScan
→ resolveBreachPoints
→ resolveYaoDevice
→ resolveRepairMethod
→ createPersonalityAsset

只要这条 mock pipeline 能稳定输出完整 PersonalityAsset，P1 即可验收。

⸻

## 18. P0 最终锁定句

观爻因果链不是内容堆叠。
观爻因果链不是视觉动效。
观爻因果链不是随机卡片。

观爻因果链是一条不可逆行为主脊：

初始坐标
→ 母码底盘
→ 现实压力
→ 本局卦码
→ 行为扫描
→ 主副切口
→ 爻器
→ 器法
→ 人格资产

因果链决定观爻是否成立。
内容链决定观爻是否锋利。
视觉链决定观爻是否被相信。
