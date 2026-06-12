# R8-ENGINE-P4｜Device Method Engine

GUANYAO SANDBOX 器法生成引擎 V1。

本阶段只建立后端器法结构，不修改 UI、路由、页面、视觉组件或样式，不接真实支付。

## 总句

切口定点，器法成形。

器法不是泛建议。

器法是针对本局切口生成的反本能处理动作。

## Pipeline Position

P4 接在六爻传导之后：

`MotherCodeProfile`
→ `PressureSeed / PressureField`
→ `UpperCodeFormation`
→ `CurrentHexagramProfile`
→ `YaoTransmissionChain`
→ `DeviceMethodPackage`

器法来自 `CutCandidate`，不从卦名直接泛化生成。

## DeviceMethod

`DeviceMethod` 包含：

- `sourceCut`
- `deviceName`
- `deviceType`
- `methodSummary`
- `antiInstinctAction`
- `firstAction`
- `next72HoursAction`
- `thirtyDayAction`
- `doNotDo`
- `realityCheck`
- `userFacingMethodPrompt`

`deviceType` 包含：

- `stop`
- `clarify`
- `separate`
- `reframe`
- `boundary`
- `rebuild`
- `communicate`

## DeviceMethodPackage

`DeviceMethodPackage` 包含：

- `sourceHexagramCode`
- `sourceHexagramName`
- `sourceHexagramTitle`
- `selectedCut`
- `mainDeviceMethod`
- `secondaryDeviceMethod`
- `rootDeviceMethod`
- `methodPackageSummary`

P4 默认以 `mainCut` 作为 `selectedCut`。

## 生成规则

器法根据 `selectedCut.yaoLayer` 生成不同方向：

- `body`：先稳住身体反应，降低压力对身体的即时接管。
- `emotion`：先区分情绪与事实，避免情绪直接决定后续行为。
- `thought`：替换接管叙事，找到一句新的判断语。
- `behavior`：停止正在放大代价的动作，替换成一个具体反本能动作。
- `memory`：识别旧经验是否正在替当前现实做决定。
- `motivation`：看清真正想保护的东西，并重新选择保护方式。

反本能动作必须现实可执行。

器法输出必须包含：

- 第一步动作
- 72 小时动作
- 30 天动作
- 暂时不要做什么
- 现实检查项

## 样例 A

输入：

- 母码：兑｜转化者
- 压力：家庭财务压力
- 卦码：019｜临｜悬崖边
- mainCut：4 / behavior
- secondaryCut：3 / thought
- rootCut：6 / motivation

期望 mainDeviceMethod：

- sourceCut：4 / behavior
- deviceName：清账定界法
- deviceType：clarify
- methodSummary：把家庭财务压力从模糊焦虑，拆成真实账目、责任边界和下一步顺序。

## 样例 B

输入：

- 母码：兑｜转化者
- 压力：负债压力
- 卦码：047｜困｜围墙里的沉默者
- mainCut：4 / behavior
- secondaryCut：3 / thought
- rootCut：6 / motivation

期望 mainDeviceMethod：

- sourceCut：4 / behavior
- deviceName：止滚清债法
- deviceType：rebuild
- methodSummary：停止用短期周转维持表面缓和，先拆开债务结构，阻止困局继续滚大。

## 文案边界

P4 不做商业化文案。

`userFacingMethodPrompt` 必须保持克制、自然、可执行，不使用强转化语言，不把器法写成购买入口。

## 审计入口

`auditGuanyaoDeviceMethod()` 必须验证：

- 样例 A 生成 `DeviceMethodPackage`。
- 样例 A mainDeviceMethod.sourceCut = 4 / behavior。
- 样例 A deviceName = 清账定界法。
- 样例 A firstAction / next72HoursAction / thirtyDayAction 均存在。
- 样例 B 生成 `DeviceMethodPackage`。
- 样例 B mainDeviceMethod.sourceCut = 4 / behavior。
- 样例 B deviceName = 止滚清债法。
- 样例 B firstAction / next72HoursAction / thirtyDayAction 均存在。
- `userFacingMethodPrompt` 不得包含商业化禁用词。
