# GUANYAO Star Beast Genesis Experience Schema Protocol

协议编号：`RC-STAR-BEAST-GENESIS-EXPERIENCE-SCHEMA-P86`

## 定义

> Star Beast Genesis Experience Schema 定义星兽第一次被看见时的体验语义结构。星兽不是被系统生成，而是生命既有来源在体验中的显化。

P86 不是 UI、Renderer、Canvas、动画、图片资产或正式用户流程。

## 编号校准

总控草案中的 P83 已被 `RC-STAR-BEAST-PROTOTYPE-RENDERER-INPUT-CONTRACT-P83` 占用。本协议按当前主线顺序正式登记为 P86，不覆盖既有 P83。

## 六阶段体验顺序

```text
COSMIC_ORIGIN
→ ORIGIN_COORDINATE
→ STAR_MANSION_ALIGNMENT
→ FOUR_SYMBOL_FORMATION
→ LIFE_ARCHETYPE_INFUSION
→ STAR_BEAST_REVEAL
```

该顺序只描述用户如何逐层感知星兽显化，是 Presentation Sequence，不是 Causal Derivation Sequence。

## 正式双来源链

```text
Shared Temporal Birth Coordinate
├─ Gregorian birth date
│  → Chinese lunar month/day mansion
│  → Twenty-Eight Mansion
│  → Four Symbol
│  → Star Beast identity reference
│
└─ Chinese lunar year/month/day + hour branch ordinal
   → Mother Code（卦以八除）
   → LifeArchetypeProfile
   → StarBeastAssetDefinition

Four Symbol identity reference
        +
LifeArchetype-sourced Asset reference
        ↓
STAR_BEAST_REVEAL experience state
```

四象与 LifeArchetype 在 Reveal 汇合，但四象不得反推八母码原型。`LifeArchetypeProfile` 的唯一正式来源仍是 `MotherCodeProfile`。

出生地点只保留为生命降临地点上下文，不参与二十八宿、四象、星兽身份或母码推导。星兽链继续保持 `locationIndependent: true`；星宿/四象链也不读取出生时辰。

## 引用契约

`StarBeastGenesisExperienceState` 只保存五类原始对象引用：

1. Origin Coordinate Reference；
2. Mansion Reference，引用既有 `StarbeastDerivationReady`；
3. Four Symbol Reference，必须引用同一个 Mansion Reference；
4. Life Archetype Reference，必须声明 `MOTHER_CODE_PROFILE_ONLY`；
5. Asset Reference，必须引用与该 LifeArchetypeProfile 同源的 `StarBeastAssetDefinition`。

P86 不复制生日、星宿、四象、母码、原型语义或资产事实。

## 状态规则

- `READY`：双来源链引用完整、一致，可进入未来 Genesis Experience Presentation。
- `UNAVAILABLE`：必要来源引用尚未提供，保留当前体验阶段等待补齐。
- `BLOCKED`：来源类型、引用身份或独立性边界错误，禁止显化。

## 固定边界

P86 只做体验结构映射，不调用 Star Beast Engine 或 Mother Code Engine，不生成星兽，不修改 Asset、Life State、Original Self Foundation、Renderer、Canvas、UI、Runtime、Storage。

P86 不接 Launch、Gravity、Dynamics 或正式用户流程。READY 也不授权页面呈现；未来接入必须经过独立 Presentation Readiness。
