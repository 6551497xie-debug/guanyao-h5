# R8-ENGINE-P5｜Personality Asset Deposition & 90-Day Defense Path

GUANYAO SANDBOX 人格资产沉积与 90 天行为防御路径 V1。

本阶段只建立后端资产结构，不修改 UI、路由、页面、ArchivePage、视觉组件或样式，不接支付。

## 总句

器法执行，资产沉积。

人格资产不是结果报告。

人格资产是本局反本能器法沉积后的可复盘行为资产。

## Pipeline Position

P5 接在器法生成之后：

`MotherCodeProfile`
→ `PressureSeed / PressureField`
→ `UpperCodeFormation`
→ `CurrentHexagramProfile`
→ `YaoTransmissionChain`
→ `DeviceMethodPackage`
→ `PersonalityAssetDeposition`

后续前端可读取 `personalityAssetDeposition` 进行展示，但 P5 不做页面、不改 ArchivePage。

## DefensePhase

`DefensePhase` 包含：

- `phaseId`
- `phaseName`
- `phaseGoal`
- `keyAction`
- `riskSignal`
- `defenseInstruction`

固定三阶段：

- `first_72_hours`：止损 / 停止旧惯性
- `day_1_to_30`：结构重建 / 新动作稳定
- `day_31_to_90`：复发防御 / 人格资产沉积

## DefensePath90d

`DefensePath90d` 包含：

- `pathName`
- `sourceDeviceMethod`
- `phases`
- `relapseWarning`
- `antiInstinctReminder`

90 天路径不是泛计划，而是围绕本局器法生成的反本能防御路径。

## PersonalityAssetDeposition

`PersonalityAssetDeposition` 包含：

- `assetId`
- `sourceHexagramCode`
- `sourceHexagramName`
- `sourceHexagramTitle`
- `motherCode`
- `upperTrigram`
- `lowerTrigram`
- `sourcePressureLabel`
- `sourceGravityValue`
- `sourceMainCut`
- `sourceDeviceMethod`
- `assetName`
- `assetType`
- `assetSummary`
- `beforePattern`
- `afterCapability`
- `defensePath90d`
- `archiveSummary`
- `migrationTrace`

`assetType` 包含：

- `clarity`
- `boundary`
- `rebuild`
- `communication`
- `risk_control`
- `responsibility`
- `self_regulation`

## 样例 A

输入：

- 母码：兑｜转化者
- 压力：家庭财务压力
- 卦码：019｜临｜悬崖边
- mainDeviceMethod：清账定界法

期望资产：

- assetName：家庭压力中的清晰沟通资产
- assetType：communication 或 responsibility
- assetSummary：把家庭财务压力从模糊焦虑，沉积为清账、定界、分责的沟通能力。
- beforePattern：用缓和、转开和腾挪暂时稳住气氛，但真实财务压力继续模糊。
- afterCapability：能把家庭财务压力拆成真实账目、责任边界和下一步顺序。

## 样例 B

输入：

- 母码：兑｜转化者
- 压力：负债压力
- 卦码：047｜困｜围墙里的沉默者
- mainDeviceMethod：止滚清债法

期望资产：

- assetName：债务困局中的止滚重组资产
- assetType：risk_control 或 rebuild
- assetSummary：把负债压力从反复周转，沉积为止滚、清债、分层重组的风险控制能力。
- beforePattern：用拆东补西、短期周转和延后沟通维持表面缓和，但债务结构继续滚动。
- afterCapability：能先停止债务继续滚大，再拆开债务结构，按风险优先级处理。

## 审计入口

`auditGuanyaoPersonalityAssetDeposition()` 必须验证：

- 样例 A 生成 `PersonalityAssetDeposition`。
- 样例 A assetName = 家庭压力中的清晰沟通资产。
- 样例 A `defensePath90d.phases.length = 3`。
- 样例 A 三个 phaseId 均存在。
- 样例 A relapseWarning 至少 3 条。
- 样例 A antiInstinctReminder 存在。
- 样例 B 生成 `PersonalityAssetDeposition`。
- 样例 B assetName = 债务困局中的止滚重组资产。
- 样例 B `defensePath90d.phases.length = 3`。
- 样例 B 三个 phaseId 均存在。
- 样例 B relapseWarning 至少 3 条。
- 样例 B antiInstinctReminder 存在。

P5 不做 UI，不做支付，不做页面。
