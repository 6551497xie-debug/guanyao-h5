# R8-ENGINE-FINAL-AUDIT｜Full Pipeline Audit

GUANYAO SANDBOX R8 后端完整因果链最终审计。

本审计不是新增业务功能。

本审计用于锁定 R8 后端完整因果链，确认 P2 → P5 已形成后端闭环。

## 总句

母码定下，现实撞线成上，上下合卦，六爻观变，切口定点，器法成形，资产沉积。

## 完整链路

当前完整链路为：

`MotherCodeProfile`
→ `PressureSeed / PressureField`
→ `UpperCodeFormation`
→ `CurrentHexagramProfile`
→ `YaoTransmissionChain`
→ `DeviceMethodPackage`
→ `PersonalityAssetDeposition`

后续前端只能读取该链路输出，不应重新造一套前端 mock 逻辑。

## 样例 A｜家庭财务压力

输入：

- 母码：兑｜转化者
- 压力：家庭财务压力

预期：

- UpperCodeFormation
  - personalityDynamicsLine = 2
  - systemMechanismLine = 6
  - lifecycleStageLine = 4
  - dominantLine = system
  - externalEnvironmentType = `kun_responsibility_support`
  - upperTrigram = 坤
  - upperCodeReading 包含“责任与承载成为主导压力，上码显影为坤”
- CurrentHexagramProfile
  - lowerTrigram = 兑
  - upperTrigram = 坤
  - hexagramCode = 019
  - hexagramName = 临
  - hexagramTitle = 悬崖边
- YaoTransmissionChain
  - transmissions.length = 6
  - layer order = body → emotion → thought → behavior → memory → motivation
  - mainCut = 4 / behavior
  - secondaryCut = 3 / thought
  - rootCut = 6 / motivation
  - cutCandidates.length >= 6
- DeviceMethodPackage
  - mainDeviceMethod.sourceCut = 4 / behavior
  - mainDeviceMethod.deviceName = 清账定界法
  - firstAction / next72HoursAction / thirtyDayAction 均存在
- PersonalityAssetDeposition
  - assetName = 家庭压力中的清晰沟通资产
  - defensePath90d.phases.length = 3
  - first_72_hours / day_1_to_30 / day_31_to_90 均存在
  - relapseWarning.length >= 3
  - antiInstinctReminder 存在

## 样例 B｜负债压力

输入：

- 母码：兑｜转化者
- 压力：负债压力

预期：

- UpperCodeFormation
  - personalityDynamicsLine = 6
  - systemMechanismLine = 6
  - lifecycleStageLine = 6
  - dominantLine = mixed
  - externalEnvironmentType = `kan_trapped_debt`
  - upperTrigram = 坎
  - upperCodeReading 包含“困局与难以抽离成为主导压力，上码显影为坎”
- CurrentHexagramProfile
  - lowerTrigram = 兑
  - upperTrigram = 坎
  - hexagramCode = 047
  - hexagramName = 困
  - hexagramTitle = 围墙里的沉默者
- YaoTransmissionChain
  - transmissions.length = 6
  - layer order = body → emotion → thought → behavior → memory → motivation
  - mainCut = 4 / behavior
  - secondaryCut = 3 / thought
  - rootCut = 6 / motivation
  - cutCandidates.length >= 6
- DeviceMethodPackage
  - mainDeviceMethod.sourceCut = 4 / behavior
  - mainDeviceMethod.deviceName = 止滚清债法
  - firstAction / next72HoursAction / thirtyDayAction 均存在
- PersonalityAssetDeposition
  - assetName = 债务困局中的止滚重组资产
  - defensePath90d.phases.length = 3
  - first_72_hours / day_1_to_30 / day_31_to_90 均存在
  - relapseWarning.length >= 3
  - antiInstinctReminder 存在

## 禁用词审计

全链路用户提示语中不得出现强商业化、强转化或器法入口化语言。

审计字段：

- `userFacingPausePrompt`
- `userFacingContinuePrompt`
- `userFacingMethodPrompt`
- `assetSummary`
- `archiveSummary`

## 审计入口

`auditGuanyaoFullPipeline()` 一次性验证：

- 母码生成存在。
- 压力种子 / 压力场存在。
- UpperCodeFormation 存在。
- CurrentHexagramProfile 存在。
- YaoTransmissionChain 存在。
- DeviceMethodPackage 存在。
- PersonalityAssetDeposition 存在。
- 样例 A / B 的关键字段稳定输出。
- 用户提示语禁用词检查通过。
