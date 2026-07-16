# GUANYAO Star Beast Genesis Source And Manifestation Calibration Protocol

协议编号：`RC-STAR-BEAST-GENESIS-SOURCE-AND-MANIFESTATION-CALIBRATION-P88`

## 1. 本刀定位

P88 只校准正式生命计算来源与 Genesis 前台显化顺序。它不是新引擎、Runtime 改造、Renderer 增强、资产生产或 UI 接入。

视觉不能决定生命身份。视觉只能显化正式引擎已经确定的生命身份。

## 2. 正式来源链

正式后台不是一条把四象推到母码的纵向因果链，而是从同一生命降临坐标产生两条独立计算来源：

```text
生命降临坐标
├─ 出生日期 → 星宿计算 → 四象引擎结果 → 星兽形态
└─ 农历年月日 + 地支时数 → MotherCodeProfile → 生命原力

四象形态 + 母码原力
→ Star Beast Identity
```

- 二十八宿与四象必须来自既有 `guanyaoStarbeastEngineService` 的 `StarbeastDerivationReady`。
- 母码必须来自既有 `guanyaoLunarMotherCodeLandingAdapter` 的 `MotherCodeProfile`。
- 四象只决定星兽显化形态。
- 母码只决定星兽生命原力。
- 四象不得反推母码，母码不得改写四象。
- 出生地点只保留为生命降临上下文，不参与星兽推导。

## 3. Genesis 显化链

前台显化顺序固定为：

```text
COSMIC_FIELD
→ MANSION_MANIFESTATION
→ COORDINATE_RECOGNITION
→ FOUR_SYMBOL_MANIFESTATION
→ MOTHER_CODE_INFUSION
→ STAR_BEAST_REVEAL
```

这是用户体验顺序，不是后台计算依赖。前台可以先让星宿显影、再让用户认领生命坐标、随后显出四象形态并注入母码原力；但不得据此改变两套正式引擎的独立来源关系。

## 4. Source Identity Contract

`StarBeastGenesisSourceIdentity` 只保存以下正式对象引用：

1. 生命降临坐标引用；
2. 二十八宿引擎结果引用；
3. 四象引擎结果引用；
4. MotherCodeProfile 引用；
5. 两条来源汇合后的 Star Beast Identity 引用。

Contract 不复制星宿、四象、母码或视觉事实。`starBeastGenesisSourceCalibration` 只检查来源协议、共同出生日期与农历坐标一致性，然后建立引用；它不调用四象计算，不调用母码计算，也不选择青龙、白虎、朱雀、玄武或八母码。

## 5. 艮之白虎隔离资产边界

P84 艮之白虎 Asset、P85 Genesis Renderer、P86 Cosmic Consciousness 与 P87 Stellar Flesh 全部保留，不回滚。

但该隔离原型只有在正式四象引擎返回白虎、正式 MotherCodeProfile 映射为艮时才可消费。预览不得手工构造 `StarbeastDerivationReady` 或 `LifeArchetypeProfile` 来指定白虎与艮。

## 6. 冻结边界

P88 不修改：

- 四象引擎；
- 母码引擎；
- Star Beast Asset / Renderer / Canvas；
- Original Self 与 Life State；
- Gravity、ChangeExperience 与 Crystal；
- Storage、正式 Runtime 与产品 UI。

完成 P88 后，Genesis 仍保持隔离验证状态。后续视觉施工必须先证明消费的是正式来源引用，不得再次以视觉目标反向改写产品架构。
