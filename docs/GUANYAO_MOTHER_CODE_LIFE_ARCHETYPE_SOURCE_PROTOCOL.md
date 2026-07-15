# GUANYAO Mother Code Life Archetype Source Protocol
# 观爻母码生命原型来源协议

版本：Evolution Phase 1 / P13

状态：FORMAL SEMANTIC SOURCE BRIDGE

施工编号：`RC-MOTHER-CODE-LIFE-ARCHETYPE-SOURCE-P13`

## 00｜协议定位

本协议为 P12 `LifeArchetypeProfile` 建立唯一正式来源：既有 `MotherCodeProfile`。

它只桥接语义，不修改 Mother Code 计算、母码结果、Foundation Runtime、Dynamics、Persistence 或 UI。

## 01｜正式来源链

```text
MotherCodeProfile
↓
resolveLifeArchetypeProfileFromMotherCode
↓
LifeArchetypeProfile
```

禁止以下路径：

```text
StarBeast / fourSymbol
↓
反推 LifeArchetypeProfile
```

星兽继续表达本我生命显化；Mother Code 继续表达八种原始生命力量。两者不能互相替代来源。

## 02｜八原型来源

`MotherCodeProfile.lowerTrigram` 与 Profile code 的映射固定为：

| Mother Code Trigram | Life Archetype Code |
| --- | --- |
| 乾 | QIAN |
| 坤 | KUN |
| 震 | ZHEN |
| 巽 | XUN |
| 坎 | KAN |
| 离 | LI |
| 艮 | GEN |
| 兑 | DUI |

该映射只命名既有母码来源，不新增第九种原型，不改变卦以八除或 Mother Code Registry。

## 03｜四项语义保真映射

P13 不创作第二套母码文案。`LifeArchetypeProfile` 的四项语义必须逐字引用既有 `MotherCodeProfile`：

```text
baseForce         → originalForce
personalityAsset  → lifeIntention
shadowInertia     → shadowPattern
unlockPotential   → awakeningDirection
```

这四项分别表达：原始力量、生命意图、阴影惯性与觉醒方向。它们是上位语义命名，不反向修改母码原字段。

## 04｜不完整来源

正式来源缺少 `lowerTrigram` 时返回 `MOTHER_CODE_TRIGRAM_MISSING`。

缺少 `personalityAsset`、`shadowInertia` 或 `unlockPotential` 任一字段时返回 `MOTHER_CODE_LIFE_SEMANTICS_MISSING`。

不得使用 `fourSymbol`、Mother Code 名称、展示文案或默认字符串补造缺失语义。

## 05｜工程边界

P13 不修改：

- Mother Code Engine、Registry、Definition 或 Profile 生成逻辑；
- Star Beast Engine 与四象逻辑；
- Original Self Foundation Adapter、Validator、Resolver、Endpoint；
- Dynamics、Crystal、Persistence、UI 或视觉。

Source Bridge 只读取传入的正式 `MotherCodeProfile`，返回冻结结果，不写入 Storage，不推进 Runtime。

## 06｜验收

1. 八个正式 Mother Code Profile 均得到唯一对应的 `LifeArchetypeProfile`；
2. 四项语义与母码来源逐字段相同；
3. Source Bridge 不读取 `fourSymbol` 或 Star Beast；
4. 不完整来源明确返回 NOT_READY；
5. P12 Schema 与 P0–P11 Foundation Runtime 回归通过；
6. source gate、release gate、build 与 `git diff --check` 通过。
