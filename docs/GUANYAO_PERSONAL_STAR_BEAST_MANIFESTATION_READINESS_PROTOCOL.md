# GUANYAO Personal Star Beast Manifestation Readiness Protocol

协议编号：`RC-PERSONAL-STAR-BEAST-MANIFESTATION-READINESS-P90`

## 1. 定义

> Personal Star Beast Manifestation Readiness 判断 P89 冻结后的正式生命身份来源，是否具备进入未来个人星宿兽显化设计阶段的资格。

Readiness 不等于 Manifestation。`READY` 只回答“正式来源是否完整并一致”，不回答个人星宿兽显化成什么样，也不授权资产生产、Renderer、Canvas、动画、UI 或 Runtime 接入。

## 2. 唯一输入来源

P90 只能消费 P89 `StarMansionLifeTrajectorySource` 已冻结的正式引用：

```text
StarMansionLifeTrajectorySource
├─ OriginCoordinateReference
├─ MansionResultReference
├─ FourSymbolResultReference
├─ MotherCodeProfileReference
├─ LifeArchetypeProfileReference
└─ StarBeastIdentitySource
   ├─ MansionSeed
   ├─ FourSymbolField
   ├─ LifeArchetypeForce
   └─ PersonalStarBeastIdentityReference
```

七个输入字段都必须与同一个 P89 Source 内部保存的对象引用完全一致。字段值看似相同但来自另一对象时，视为来源漂移并返回 `BLOCKED`。

## 3. 资格规则

返回 `READY` 必须同时满足：

1. P89 生命轨迹来源存在并保持 source-freeze / reference-only 边界；
2. 本命星宿结果存在；
3. 四象结果存在；
4. 星宿与四象引用同一次正式 Star Beast Engine 结果；
5. MotherCodeProfile 存在；
6. LifeArchetypeProfile 来自正式 Mother Code 桥接；
7. `LifeArchetypeProfile.sourceMotherCodeId = MotherCodeProfile.motherCodeId`；
8. `StarBeastIdentitySource` 与 P89 Source 中的身份来源为同一引用；
9. `PersonalStarBeastIdentityReference` 明确不是四象动物、不是已生成资产、不是 Life State。

## 4. 状态

- `READY`：正式身份来源完整，可以进入未来 Personal Star Beast Manifestation Design；尚未开始设计或显化。
- `UNAVAILABLE`：一个或多个必要引用缺失，可以等待正式来源补齐。
- `BLOCKED`：来源对象漂移、正式桥接不匹配或 P89 保护边界失效，禁止进入显化设计。

## 5. 严格边界

P90 不创建 `PersonalStarBeast`，不生成兽形、视觉参数或资产，不调用 Renderer / Canvas，不修改 P89 Source、Original Self、StarBeastState、Life State、Journey、Gravity、Choice、Crystal、Storage、UI 或正式 Runtime。

P84–P87 仍保持 `FOUR_SYMBOL_VISUAL_EXPERIMENT` 状态，不能作为 P90 的正式身份来源。即使 P90 返回 `READY`，后续显化设计也必须另立独立协议与 gate。
