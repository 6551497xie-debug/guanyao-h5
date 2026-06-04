# 三层码制协议

## 核心定义

- 观爻元码｜8 = 人格源代码
- 观爻卦场｜64 = 人格场域
- 观爻爻码｜384 = 人格行为轨迹
- 爻码卡 = 本次人格源代码、人格场域、人格行为轨迹共同压印后的结果卡

核心句：

> 元码是人格源代码，卦场是人格场域，爻码是人格行为轨迹。
> 元码定源，卦场成域，爻码显变。

## 前台命名

- 前台必须使用“卦场 / GuaField”。
- 不再使用“母码”作为前台核心命名。
- `motherCode` / `MotherCode` 仅可作为 legacy alias 暂存，用于兼容旧字段。
- 后续命名清理必须单独发起 refactor 任务，不与功能施工混做。

## 数据链路

稳定链路：

Launch → Chrono → Identity → Force → Scene → GuaField Reveal → Gravity → Choice → Migration → Archive

三层关系：

- Chrono 生成观爻元码｜8。
- Identity 人格映照与 Scene 现实种子对撞，生成观爻卦场｜64。
- Gravity 五爻推进与 Choice 第六爻偏转，在卦场内部形成观爻爻码｜384。
- Migration 展示爻码卡，Archive 沉积本次行为因果链。
